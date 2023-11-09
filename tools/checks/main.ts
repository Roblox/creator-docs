const timeMessage = '⏰ The checks finished in';
console.time(timeMessage);
// Load config at the beginning
import { FileOption, getConfig } from './utils/config.js';
const config = await getConfig();

import path from 'path';
import { VFile } from 'vfile';
import { VFileMessage } from 'vfile-message';
import {
  FileExtension,
  getAllContentFileNamesWithExtension,
  getFilePathFromRepoRoot,
  outputDirectory,
  readFileSync,
  repositoryRoot,
  writeListToFile,
} from './utils/files.js';
import {
  getFilesChangedComparedToBaseByExtension,
  getFilesChangedInLastCommitByExtensions,
} from './utils/git.js';
import {
  GitHubLabel,
  addLabelToIssue,
  getNewPullRequestCommentForVFileMessage,
  postPullRequestComments,
  pullRequestReviewComments,
} from './utils/github.js';
import {
  REQUIRED_CHECKS,
  RETEXT_INAPPROPRIATE,
  RETEXT_PROFANITIES,
  RETEXT_SPELL,
  compileMdx,
  getReTextAnalysis,
} from './utils/retext.js';
import { Emoji, Locale } from './utils/utils.js';
import { deduplicate } from './utils/utils.js';
import {
  allowedHttpLinksTextFileFullPath,
  checkContentLinks,
  allNonRobloxHttpLinks,
} from './utils/links.js';
import {
  addToSummaryOfRequirements,
  addToSummaryOfSuggestions,
  logSummariesToConsole,
  summaryOfRequirements,
} from './utils/console.js';
import { checkMarkdownLint } from './utils/markdownlint.js';
import { checkEngineReferenceContent } from './utils/engineReferenceChecks.js';

let filesToCheck: string[] = [];
let labelPullRequestAsInappropriate = false;
let missSpelledWords: string[] = [];

const getFilesToCheck = async () => {
  console.log(`::group::${Emoji.OpenFileFolder} Getting changed files`);
  console.log('Checking only Markdown files...');
  if (config.files === FileOption.All) {
    filesToCheck.push(
      ...getAllContentFileNamesWithExtension({
        locale: Locale.EN_US,
        fileExtension: FileExtension.MARKDOWN,
      }),
      ...getAllContentFileNamesWithExtension({
        locale: Locale.EN_US,
        fileExtension: FileExtension.YAML,
      })
    );
    filesToCheck.push(...['README.md', 'STYLE.md', 'CODE_OF_CONDUCT.md']);
  } else if (config.files === FileOption.Changed) {
    filesToCheck = await getFilesChangedComparedToBaseByExtension({
      baseBranch: config.baseBranch,
      fileExtensions: [FileExtension.MARKDOWN, FileExtension.YAML],
    });
  } else if (config.files === FileOption.LastCommit) {
    filesToCheck = await getFilesChangedInLastCommitByExtensions([
      FileExtension.MARKDOWN,
      FileExtension.YAML,
    ]);
  }
  const prefixesToIgnore = ['.github/', 'content/common/navigation/'];
  filesToCheck = filesToCheck.filter((filePath) => {
    return !prefixesToIgnore.some((prefix) => filePath.startsWith(prefix));
  });
  console.log(`Files to check (${filesToCheck.length}):`, filesToCheck);
  console.log('::endgroup::');
};

const processRetextVFileMessage = ({
  filePathFromRepoRoot,
  message,
}: {
  filePathFromRepoRoot: string;
  message: VFileMessage;
}) => {
  const messageSummary = `In ${filePathFromRepoRoot}, line ${message.line}, column ${message.column}, ${message.reason}`;
  let isRequiredCheck = false;
  if (message.source) {
    if (
      message.source === RETEXT_INAPPROPRIATE ||
      message.source === RETEXT_PROFANITIES
    ) {
      labelPullRequestAsInappropriate = true;
    }

    if (message.source === RETEXT_SPELL && message.actual) {
      missSpelledWords.push(message.actual);
    }

    if (REQUIRED_CHECKS.has(message.source)) {
      isRequiredCheck = true;
      addToSummaryOfRequirements(
        `${Emoji.NoEntry} Requirement: ${messageSummary}`
      );
    } else {
      addToSummaryOfSuggestions(`${Emoji.Bulb} Suggestion: ${messageSummary}`);
    }
  }

  // Always print required messages, suggestions are optional
  if (isRequiredCheck || !config.onlyRequiredChecks) {
    console.log(`${Emoji.EnvelopeWithArrow} Message from check:`);
    console.log(isRequiredCheck ? Emoji.NoEntry : Emoji.Bulb, message);
  }

  // Only comment required checks to avoid too much noise
  if (isRequiredCheck && config.postPullRequestComments) {
    const pullRequestReviewComment = getNewPullRequestCommentForVFileMessage({
      commit_id: config.commitHash,
      isRequiredCheck,
      message,
      path: filePathFromRepoRoot,
      pull_number: config.pullRequestNumber,
      repository: config.repository,
    });
    console.log(`${Emoji.Mailbox} Comment to post:`);
    console.log(pullRequestReviewComment);
    pullRequestReviewComments.push(pullRequestReviewComment);
  }
};

const processRetextVFileMessages = ({
  filePathFromRepoRoot,
  retextVFile,
}: {
  filePathFromRepoRoot: string;
  retextVFile: VFile;
}) => {
  if (retextVFile.messages.length > 0) {
    retextVFile.messages.forEach((message) => {
      processRetextVFileMessage({ filePathFromRepoRoot, message });
    });
  } else {
    console.log(`${Emoji.WhiteCheckMark} No messages from checks`);
  }
};

const postCommentsToGitHub = async () => {
  await postPullRequestComments({
    pullRequestReviewComments,
    pull_number: config.pullRequestNumber,
    repository: config.repository,
  });
  const labelsForPullRequest = [
    GitHubLabel.ChangesRequested,
    ...(labelPullRequestAsInappropriate ? [GitHubLabel.Inappropriate] : []),
  ];
  console.log(`::group::${Emoji.Label} Labeling pull request`);
  const labelResponse = await addLabelToIssue({
    labels: labelsForPullRequest,
    issue_number: config.pullRequestNumber,
    repository: config.repository,
  });
  console.log(labelResponse);
  console.log('::endgroup::');
};

try {
  await getFilesToCheck();
  for (const filePath of filesToCheck) {
    const filePathFromRepoRoot = getFilePathFromRepoRoot(
      filePath,
      repositoryRoot
    );
    const isMarkdownFile = filePath.endsWith(FileExtension.MARKDOWN);
    const isYamlFile = filePath.endsWith(FileExtension.YAML);
    console.log(`::group::${Emoji.Mag} Checking`, filePathFromRepoRoot);
    const fileContent = readFileSync(filePath);
    if (config.checkRetextAnalysis) {
      const retextVFile = (await getReTextAnalysis(
        fileContent
      )) as unknown as VFile;
      if (config.debug) {
        console.log(retextVFile);
      }
      processRetextVFileMessages({ retextVFile, filePathFromRepoRoot });
    }
    if (isMarkdownFile) {
      const mdxVFileMessage = (await compileMdx(fileContent)) as VFileMessage;
      if (mdxVFileMessage) {
        processRetextVFileMessage({
          message: mdxVFileMessage,
          filePathFromRepoRoot,
        });
      }
    }
    if (config.checkHttpLinks || config.checkRelativeLinks) {
      checkContentLinks({
        config,
        fileContent,
        filePath: filePathFromRepoRoot,
      });
    }
    if (isMarkdownFile && config.checkMarkdownLint) {
      checkMarkdownLint({
        config,
        fileContent,
        filePath: filePathFromRepoRoot,
      });
    }
    if (isYamlFile) {
      await checkEngineReferenceContent({
        config,
        fileContent,
        filePath: filePathFromRepoRoot,
      });
    }
    console.log('::endgroup::');
  }
  if (config.debug) {
    writeListToFile(
      path.join(outputDirectory, 'misspelled-words.txt'),
      deduplicate(missSpelledWords).sort(),
      'utf-8'
    );
    writeListToFile(
      allowedHttpLinksTextFileFullPath,
      deduplicate(allNonRobloxHttpLinks).sort(),
      'utf-8'
    );
  }
  if (config.postPullRequestComments && pullRequestReviewComments.length > 0) {
    await postCommentsToGitHub();
  }
  logSummariesToConsole(config);
} catch (e) {
  console.error(`${Emoji.NoEntry} Error running the check`, e);
  process.exit(1);
  console.log('Exit code 1'); // This should never output
}

console.timeEnd(timeMessage);
if (summaryOfRequirements) {
  process.exit(1);
  console.log('Exit code 1'); // This should never output
}
