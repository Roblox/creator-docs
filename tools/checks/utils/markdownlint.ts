import markdownlint, { LintError } from 'markdownlint';
import markdownLintConfig from '../../../.markdownlint.json' assert { type: 'json' };
import { createNewPullRequestComment, requiredCheckMessage } from './github.js';
import { IConfig } from './config.js';
import { addToSummaryOfRequirements } from './console.js';
import { Emoji } from './utils.js';

export const getMarkdownLintErrors = ({
  fileContent,
}: {
  fileContent: string;
}) => {
  const options = {
    config: markdownLintConfig,
    strings: {
      fileContent,
    },
    handleRuleFailures: true,
  };

  const {fileContent: fileErrors } = markdownlint.sync(options);
  return fileErrors
};

export const processMarkdownLintError = ({
  config,
  filePath,
  lintError,
}: {
  config: IConfig;
  filePath: string;
  lintError: LintError;
}) => {
  const errorNames = lintError.ruleNames.join('/');
  const column = lintError.errorRange ? `${lintError.errorRange[0]}` : '';

  /** Console */
  const consoleMessage = `${Emoji.NoEntry} Requirement: In ${filePath}, line ${
    lintError.lineNumber
  },${
    column ? `column ${column},` : ''
  } markdownlint detected error ${errorNames}: ${lintError.ruleDescription}. ${
    lintError.errorDetail ? `${lintError.errorDetail}. ` : ''
  }For more info, see ${lintError.ruleInformation}.`;
  console.log(consoleMessage);

  addToSummaryOfRequirements(consoleMessage);

  /** Pull Request */
  if (config.postPullRequestComments) {
    const body = `The content quality library [markdownlint](https://github.com/DavidAnson/markdownlint) says: 

- ${lintError.ruleDescription} (${errorNames})
${lintError.errorDetail ? `- ${lintError.errorDetail}.` : ''}

For more information, see the Markdownlint docs for [${errorNames}](${
      lintError.ruleInformation
    }). ${
      lintError.fixInfo
        ? `You might be able to fix this by using [markdownlint for VS Code](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) or by running \`npm ci && npm run markdownlint\`.`
        : ''
    }

${requiredCheckMessage}`;
    createNewPullRequestComment({
      body,
      commit_id: config.commitHash,
      line: lintError.lineNumber,
      path: filePath,
      pull_number: config.pullRequestNumber,
      repository: config.repository,
    });
  }
};

export const checkMarkdownLint = ({
  config,
  fileContent,
  filePath: filePath,
}: {
  config: IConfig;
  fileContent: string;
  filePath: string;
}) => {
  const lintErrors = getMarkdownLintErrors({ fileContent });
  if (config.debug) {
    console.log(`MarkdownLint errors for ${filePath}:`, lintErrors);
  }
  if (lintErrors.length === 0) {
    console.log('No linting errors found.');
    return;
  }
  for (const error of lintErrors) {
    processMarkdownLintError({ config, filePath, lintError: error });
  }
};
