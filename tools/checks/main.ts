const timeMessage = '⏰ The checks finished in';
console.time(timeMessage);
// Load config at the beginning
import { FileOption, getConfig } from './utils/config.js';
console.log('::group::🛠️ Getting configuration');
const config = await getConfig();
console.log('::endgroup::');

import fs from 'fs';
import path from 'path';
import {
  FileExtension,
  getAllContentFileNamesWithExtension,
  getFilePathFromRepoRoot,
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
  PullRequestComment,
  addLabelToIssue,
  getNewPullRequestCommentForVFileMessage,
  postPullRequestComments,
} from './utils/github.js';
import {
  REQUIRED_CHECKS,
  RETEXT_INAPPROPRIATE,
  RETEXT_PROFANITIES,
  RETEXT_SPELL,
  getReTextAnalysis,
} from './utils/retext.js';
import { Locale } from './utils/utils.js';
import { deduplicate } from './utils/utils.js';

let filesToCheck: string[] = [];
let labelPullRequestAsInappropriate = false;
let pullRequestReviewComments: PullRequestComment[] = [];
let summaryOfRequirements: string = '';
let summaryOfSuggestions: string = '';
let missSpelledWords: string[] = [];

const getFilesToCheck = async () => {
  console.log('::group::📂 Getting changed files');
  console.log('Checking only Markdown files...');
  if (config.files === FileOption.All) {
    filesToCheck = getAllContentFileNamesWithExtension({
      locale: Locale.EN_US,
      fileExtension: FileExtension.MARKDOWN,
    });
  } else if (config.files === FileOption.Changed) {
    filesToCheck = await getFilesChangedComparedToBaseByExtension({
      baseBranch: config.baseBranch,
      fileExtensions: [FileExtension.MARKDOWN],
    });
  } else if (config.files === FileOption.LastCommit) {
    filesToCheck = await getFilesChangedInLastCommitByExtensions([
      FileExtension.MARKDOWN,
    ]);
  }
  console.log(`Files to check (${filesToCheck.length}):`, filesToCheck);
  console.log('::endgroup::');
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
  console.log('::group::🏷️ Labeling pull request');
  const labelResponse = await addLabelToIssue({
    labels: labelsForPullRequest,
    issue_number: config.pullRequestNumber,
    repository: config.repository,
  });
  console.log(labelResponse);
  console.log('::endgroup::');
};

const logSummariesToConsole = () => {
  if (
    (summaryOfSuggestions && !config.onlyRequiredChecks) ||
    summaryOfRequirements
  ) {
    console.log('======================================');
    console.log();
  }
  if (summaryOfSuggestions && !config.onlyRequiredChecks) {
    console.log('💡 The checks found some suggestions:');
    console.log(summaryOfSuggestions);
  }
  if (summaryOfRequirements) {
    console.log('⛔️ The checks found some requirements:');
    console.log(summaryOfRequirements);
    console.log(
      '⛔️ Please fix the requirements before merging your pull request.'
    );
  }
  if (!summaryOfSuggestions && !summaryOfRequirements) {
    console.log('✅ No issues found');
  }
};

try {
  await getFilesToCheck();
  for (const filePath of filesToCheck) {
    const filePathFromRepoRoot = getFilePathFromRepoRoot(
      filePath,
      repositoryRoot
    );
    console.log('::group::🔍 Checking', filePathFromRepoRoot);
    const content = readFileSync(filePath);
    const retextVFile = await getReTextAnalysis(content);
    if (config.debug) {
      console.log(retextVFile);
    }
    if (retextVFile.messages.length > 0) {
      retextVFile.messages.forEach((message) => {
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
            summaryOfRequirements += `⛔️ Requirement: ${messageSummary}\n`;
          } else {
            summaryOfSuggestions += `💡 Suggestion: ${messageSummary}\n`;
          }
        }
        // Always print required messages, suggestions are optional
        if (isRequiredCheck || !config.onlyRequiredChecks) {
          console.log('📩 Message from check:');
          console.log(isRequiredCheck ? `⛔️` : `💡`, message);
        }
        // Only comment required checks to avoid too much noise
        if (config.postPullRequestComments && isRequiredCheck) {
          const pullRequestReviewComment =
            getNewPullRequestCommentForVFileMessage({
              commit_id: config.commitHash,
              isRequiredCheck,
              /**
               * Ignore this error:
               * Type 'VFileMessage' is missing the following properties
               * from type 'VFileMessage': ancestors, place ts(2739)
               */ //@ts-ignore
              message,
              path: filePathFromRepoRoot,
              pull_number: config.pullRequestNumber,
              repository: config.repository,
            });
          console.log(`📫 Comment to post:`);
          console.log(pullRequestReviewComment);
          pullRequestReviewComments.push(pullRequestReviewComment);
        }
      });
    } else {
      console.log('✅ No messages from checks');
    }
    console.log('::endgroup::');
  }
  writeListToFile('misspelled-words.txt', deduplicate(missSpelledWords).sort());
  if (config.postPullRequestComments && pullRequestReviewComments.length > 0) {
    await postCommentsToGitHub();
  }
  logSummariesToConsole();
} catch (e) {
  console.error('❌ Error running the check', e);
  process.exit(1);
  console.log('Exit code 1'); // This should never output
}

console.timeEnd(timeMessage);
if (summaryOfRequirements) {
  process.exit(1);
  console.log('Exit code 1'); // This should never output
}
