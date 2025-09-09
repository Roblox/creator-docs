const timeMessage = '⏰ The checks finished in';
console.time(timeMessage);
// Load config at the beginning
import { FileOption, getConfig } from './utils/config.js';
const config = await getConfig();

import fs from 'fs';
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
} from './utils/unified.js';
import {
  Locale,
  checkEnglishVersionExists,
  checkFileIsTranslatable,
  checkFileImportEquality,
  checkMdxEquality,
  isLocaleFile,
  outdatedTranslationFiles,
  checkVoidTagsHaveNoChildren,
} from './utils/localization.js';
import { Emoji } from './utils/utils.js';
import { deduplicate } from './utils/utils.js';
import {
  allowedHttpLinksTextFileFullPath,
  checkContentLinks,
  allNonRobloxHttpLinks,
  checkUnusedAssets,
} from './utils/links.js';
import {
  addToSummaryOfRequirements,
  addToSummaryOfSuggestions,
  logSummariesToConsole,
  summaryOfRequirements,
} from './utils/console.js';
import { checkMarkdownLint } from './utils/markdownlint.js';
import { checkEngineReferenceContent } from './utils/engineReferenceChecks.js';
import {
  containsOpenApiSchema,
  validateOpenApiSchema,
} from './utils/openapi/index.js';

let filesToCheck: string[] = [];
let labelPullRequestAsInappropriate = false;
let missSpelledWords: string[] = [];

const getFilesToCheck = async () => {
  console.log(`::group::${Emoji.OpenFileFolder} Getting changed files`);
  if (config.files === FileOption.All) {
    if (config.checkLocalizedContent === true) {
      for (const locale of Object.values(Locale)) {
        filesToCheck.push(
          ...getAllContentFileNamesWithExtension({
            locale,
            fileExtension: FileExtension.MARKDOWN,
          }),
          ...getAllContentFileNamesWithExtension({
            locale,
            fileExtension: FileExtension.YAML,
          }),
          ...getAllContentFileNamesWithExtension({
            locale,
            fileExtension: FileExtension.JSON,
          })
        );
      }
    } else {
      filesToCheck.push(
        ...getAllContentFileNamesWithExtension({
          locale: Locale.EN_US,
          fileExtension: FileExtension.MARKDOWN,
        }),
        ...getAllContentFileNamesWithExtension({
          locale: Locale.EN_US,
          fileExtension: FileExtension.YAML,
        }),
        ...getAllContentFileNamesWithExtension({
          locale: Locale.EN_US,
          fileExtension: FileExtension.JSON,
        })
      );
    }
    filesToCheck.push(...['README.md', 'STYLE.md', 'CODE_OF_CONDUCT.md']);
  } else if (config.files === FileOption.Changed) {
    filesToCheck = await getFilesChangedComparedToBaseByExtension({
      baseBranch: config.baseBranch,
      fileExtensions: [
        FileExtension.MARKDOWN,
        FileExtension.YAML,
        FileExtension.JSON,
      ],
    });
  } else if (config.files === FileOption.LastCommit) {
    filesToCheck = await getFilesChangedInLastCommitByExtensions([
      FileExtension.MARKDOWN,
      FileExtension.YAML,
      FileExtension.JSON,
    ]);
  }
  if (!config.checkLocalizedContent) {
    filesToCheck = filesToCheck.filter((filePath) => {
      return isLocaleFile(filePath, Locale.EN_US);
    });
  }
  const prefixesToIgnore = [
    '.github/',
    'content/common/navigation/',
    'tools/',
    'content/en-us/reference/engine/code_samples/',
  ];
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
    const isJsonFile = filePath.endsWith(FileExtension.JSON);
    console.log(`::group::${Emoji.Mag} Checking`, filePathFromRepoRoot);
    if (!fs.existsSync(filePath)) {
      console.log(
        `${Emoji.NoEntry} File does not exist: ${filePathFromRepoRoot}`
      );
      console.log('::endgroup::');
      continue;
    }
    const fileContent = readFileSync(filePath);

    if (isJsonFile) {
      if (containsOpenApiSchema(fileContent)) {
        await validateOpenApiSchema({
          config,
          filePath: filePathFromRepoRoot,
        });
      }

      // The remaining checks are not applicable to JSON files
      console.log('::endgroup::');
      continue;
    }

    if (
      config.checkLocalizedContent &&
      !isLocaleFile(filePathFromRepoRoot, Locale.EN_US) // skip for English
    ) {
      checkVoidTagsHaveNoChildren(filePathFromRepoRoot);
      checkEnglishVersionExists(filePathFromRepoRoot);
      await checkMdxEquality(filePathFromRepoRoot, fileContent);
      checkFileImportEquality(filePathFromRepoRoot, fileContent);
      checkFileIsTranslatable(filePathFromRepoRoot);
    }
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
      checkVoidTagsHaveNoChildren(filePathFromRepoRoot);
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
  if (config.checkUnusedAssets) {
    checkUnusedAssets({ config });
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
  if (config.checkLocalizedContent && outdatedTranslationFiles.length > 0) {
    const outdatedTranslationFilesPath = path.join(
      outputDirectory,
      'outdated-translation-files.txt'
    );
    writeListToFile(
      outdatedTranslationFilesPath,
      outdatedTranslationFiles,
      'utf-8'
    );
  }
  if (config.postPullRequestComments && pullRequestReviewComments.length > 0) {
    await postCommentsToGitHub();
  }
  logSummariesToConsole(config);
} catch (e) {
  console.error(`${Emoji.NoEntry} Error running the check, exiting 911`, e);
  process.exit(911);
  console.log('Exit code 911'); // This should never output
}

console.timeEnd(timeMessage);
if (summaryOfRequirements) {
  console.log("::error::There are required checks that didn't pass. Exiting 1");
  process.exit(1);
  console.log('Exit code 1'); // This should never output
}
