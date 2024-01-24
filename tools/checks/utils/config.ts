import dotenv from 'dotenv';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { getRepositoryName } from './git.js';
import { repositoryRoot } from './files.js';
import path from 'path';
import { Emoji } from './utils.js';

dotenv.config({
  path: path.join(repositoryRoot, '/.env.default'),
});
dotenv.config({ override: true });

export enum FileOption {
  All = 'all',
  Changed = 'changed',
  LastCommit = 'last-commit',
}

const isValidFileOption = (value: any): value is FileOption => {
  return Object.values(FileOption).includes(value);
};

/**
 * Interface for configuration options.
 *
 * @property {string} baseBranch - The branch to compare the current branch
 * against.
 * @property {string} commitHash - The unique hash representing a commit.
 * @property {boolean} debug - Flag indicating if debug mode is enabled.
 * @property {boolean} onlyChangedFiles - Flag to check only changed files.
 * @property {boolean} onlyRequiredChecks - Flag to log only required checks.
 * @property {boolean} postPullRequestComments - Flag to determine if comments
 * should be posted on a Pull Request.
 * @property {number} pullRequestNumber - The number of the pull request.
 * @property {string} repository - The name of the repository.
 */
export interface IConfig {
  baseBranch: string;
  commitHash: string;
  checkHttpLinks: boolean;
  checkMarkdownLint: boolean;
  checkProtectedFields: boolean;
  checkRelativeLinks: boolean;
  checkRetextAnalysis: boolean;
  checkUnusedAssets: boolean;
  debug: boolean;
  deleteUnusedAssets: boolean;
  files: FileOption;
  onlyRequiredChecks: boolean;
  postPullRequestComments: boolean;
  pullRequestNumber: number;
  repository: string;
}

enum DataType {
  Boolean = 'boolean',
  Integer = 'number',
  String = 'string',
}

const getEnvVar = (key: string, type: DataType) => {
  const value = process.env[key];
  if (!value) {
    return undefined;
  }

  switch (type) {
    case DataType.Boolean:
      return value.toLowerCase() === 'true';
    case DataType.Integer:
      const num = parseInt(value);
      if (isNaN(num)) {
        return undefined;
      }
      return num;
    case DataType.String:
    default:
      return value;
  }
};

/**
 * Validates an object to ensure it adheres to the IConfig interface's
 * constraints. If the object doesn't meet the criteria, the validation fails
 * with a descriptive message.
 *
 * @param obj - The object to be validated.
 * @returns An object containing a validity flag and a descriptive message.
 */
const validateIConfig = (obj: any): { isValid: boolean; message: string } => {
  const invalidConfigMsg = 'Invalid configuration.';
  if (!isValidFileOption(obj.files)) {
    return {
      isValid: false,
      message: `${invalidConfigMsg} files must be of the following options: ${FileOption.All}, ${FileOption.Changed}, ${FileOption.LastCommit}`,
    };
  }
  // Only need baseBranch if files is 'changed from base'
  if (obj.files === FileOption.Changed) {
    if (typeof obj.baseBranch !== 'string') {
      return {
        isValid: false,
        message: `${invalidConfigMsg} baseBranch must be a string`,
      };
    }
  }
  if (typeof obj.onlyRequiredChecks !== 'boolean') {
    return {
      isValid: false,
      message: `${invalidConfigMsg} onlyRequiredChecks must be a boolean`,
    };
  }
  if (typeof obj.postPullRequestComments !== 'boolean') {
    return {
      isValid: false,
      message: `${invalidConfigMsg} postPullRequestComments must be a boolean`,
    };
  }
  if (obj.postPullRequestComments) {
    // Check missing before type
    let missingFields: string[] = [];
    if (!obj.commitHash) {
      missingFields.push('commitHash');
    }
    if (!obj.pullRequestNumber) {
      missingFields.push('pullRequestNumber');
    }
    if (missingFields.length > 0) {
      return {
        isValid: false,
        message: `${invalidConfigMsg} If postPullRequestComments is true, you must provide: ${missingFields.join(
          ', '
        )}`,
      };
    }
    // If not missing, check type
    if (typeof obj.commitHash !== 'string') {
      return {
        isValid: false,
        message: `${invalidConfigMsg} commitHash must be a string`,
      };
    }
    if (isNaN(obj.pullRequestNumber)) {
      return {
        isValid: false,
        message: `${invalidConfigMsg} pullRequestNumber must be a number`,
      };
    }
    if (typeof obj.repository !== 'string') {
      return {
        isValid: false,
        message: `${invalidConfigMsg} repository must be a string`,
      };
    }
  }

  return { isValid: true, message: 'Valid config' };
};
/**
 * Retrieves and validates the configuration using command line arguments,
 * falling back to environment configurations for default values.
 *
 * Parse the arguments and assign default values, then validate the
 * configuration object against the IConfig interface. If validation fails, log
 * appropriate messages.
 *
 * @returns - A validated configuration object adhering to the IConfig
 * interface.
 */
export const getConfig = async (): Promise<IConfig> => {
  const config = yargs(hideBin(process.argv))
    .option('baseBranch', {
      type: 'string',
      description: 'The base branch to compare changes with',
      default: process.env.BASE_BRANCH,
    })
    .option('checkHttpLinks', {
      type: 'boolean',
      description: 'Whether to check HTTP links',
      default: getEnvVar('CHECK_HTTP_LINKS', DataType.Boolean),
    })
    .option('checkMarkdownLint', {
      type: 'boolean',
      description: 'Whether to check markdownlint',
      default: getEnvVar('CHECK_MARKDOWN_LINT', DataType.Boolean),
    })
    .option('checkProtectedFields', {
      type: 'boolean',
      description: 'Whether to check protected fields in YAML',
      default: getEnvVar('CHECK_PROTECTED_FIELDS', DataType.Boolean),
    })
    .option('checkRelativeLinks', {
      type: 'boolean',
      description: 'Whether to check relative links',
      default: getEnvVar('CHECK_RELATIVE_LINKS', DataType.Boolean),
    })
    .option('checkRetextAnalysis', {
      type: 'boolean',
      description: 'Whether to check retext analysis',
      default: getEnvVar('CHECK_RETEXT_ANALYSIS', DataType.Boolean),
    })
    .option('checkUnusedAssets', {
      type: 'boolean',
      description: 'Whether to check for unused assets',
      default: getEnvVar('CHECK_UNUSED_ASSETS', DataType.Boolean),
    })
    .option('commitHash', {
      type: 'string',
      description: 'The commit hash to post a pull request comment on',
      default: process.env.COMMIT_HASH,
    })
    .option('deleteUnusedAssets', {
      type: 'boolean',
      description: 'Whether to delete unused assets',
      default: getEnvVar('DELETE_UNUSED_ASSETS', DataType.Boolean),
    })
    .option('debug', {
      type: 'boolean',
      description: 'Whether to enable debug mode',
      default: getEnvVar('DEBUG', DataType.Boolean),
    })
    .option('files', {
      type: 'string',
      choices: [FileOption.All, FileOption.Changed, FileOption.LastCommit],
      describe: 'Specify which files to process',
      default: process.env.FILES,
    })
    .option('onlyRequiredChecks', {
      type: 'boolean',
      description: 'Whether to log and comment only required checks',
      default: getEnvVar('ONLY_REQUIRED_CHECKS', DataType.Boolean),
    })
    .option('postPullRequestComments', {
      type: 'boolean',
      description: 'Whether to post a pull request or not',
      default: getEnvVar('POST_PULL_REQUEST_COMMENTS', DataType.Boolean),
    })
    .option('pullRequestNumber', {
      type: 'number',
      description: 'The number of the pull request to post on',
      default: getEnvVar('PULL_REQUEST_NUMBER', DataType.Integer),
    })
    .option('repository', {
      type: 'string',
      description: 'The repository you are working in',
      default: process.env.REPOSITORY || (await getRepositoryName()),
    })
    .check((argv) => {
      console.log(`::group::${Emoji.HammerAndWrench} Getting configuration`);
      console.log('Received:', argv);
      console.log('::endgroup::');
      const validationResult = validateIConfig(argv);
      if (validationResult.isValid) {
        return true;
      } else {
        console.log(validationResult.message);
        return false;
      }
    })
    .help() // Enables the automatic help text
    .strict() // Ensures that only the defined options are allowed
    .parse() as IConfig; // Explicitly parse the arguments
  return config;
};
