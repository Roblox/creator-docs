import { IConfig } from './config.js';
import { addToSummaryOfRequirements } from './console.js';
import {
  FileExtension,
  getCommonContentFileNamesWithExtension,
  getFilePathFromRepoRoot,
  readFileSync,
  repositoryRoot,
} from './files.js';
import { createNewPullRequestComment, requiredCheckMessage } from './github.js';
import { Emoji } from './utils.js';

/**
 * Attempts to extract a 1-based line number from a `JSON.parse` SyntaxError
 * message. Node 22+ messages look like:
 *   "Expected ',' or ']' after array element in JSON at position 4197 (line 100 column 5)"
 * Falls back to line 1 when no line information is present (e.g. older runtimes
 * that only report a character position).
 */
const getLineNumberFromSyntaxError = (message: string): number => {
  const match = message.match(/line (\d+)/);
  if (match) {
    const line = parseInt(match[1], 10);
    if (!isNaN(line)) {
      return line;
    }
  }
  return 1;
};

/**
 * Validates that a JSON file parses. A single syntax error (e.g. a missing
 * comma) in a content JSON file such as `content/common/manifest.json` would
 * otherwise merge undetected and break downstream page generation with a
 * misleading error. Reports the failure as a required check so the run exits 1.
 *
 * @returns `true` if the content is valid JSON, `false` otherwise. Callers can
 * use this to skip further JSON checks (e.g. OpenAPI validation) that assume a
 * parseable document.
 */
export const checkJsonIsValid = ({
  config,
  fileContent,
  filePath,
}: {
  config: IConfig;
  fileContent: string;
  filePath: string;
}): boolean => {
  try {
    JSON.parse(fileContent);
    return true;
  } catch (e) {
    const reason = e instanceof Error ? e.message : String(e);
    const line = getLineNumberFromSyntaxError(reason);

    /** Console */
    const consoleMessage = `${Emoji.NoEntry} Requirement: In ${filePath}, invalid JSON: ${reason}`;
    console.log(consoleMessage);
    addToSummaryOfRequirements(consoleMessage);

    /** Pull Request */
    if (config.postPullRequestComments) {
      const body = `This file is not valid JSON and will break page generation:

- ${reason}

Fix the JSON syntax (for example, a missing or extra comma) so the file parses. You can validate locally by running \`npm run check\`.

${requiredCheckMessage}`;
      createNewPullRequestComment({
        body,
        commit_id: config.commitHash,
        line,
        path: filePath,
        pull_number: config.pullRequestNumber,
        repository: config.repository,
      });
    }

    return false;
  }
};

/**
 * Validates that every JSON file under `content/common/` (e.g. `manifest.json`,
 * `localization_manifest.json`) parses. These shared files are not locale
 * files, so the per-file loop's en-us filter would otherwise skip them when
 * `checkLocalizedContent` is false (the CI default) — which is exactly how a
 * malformed `manifest.json` reached page generation. Run this on every check
 * invocation, independent of which files changed, since the set is tiny and
 * these files are load-bearing. `content/common/navigation/` is auto-generated
 * and excluded to match `prefixesToIgnore` in the main check loop.
 */
export const checkCommonContentJson = ({ config }: { config: IConfig }): void => {
  const filePaths = getCommonContentFileNamesWithExtension({
    fileExtension: FileExtension.JSON,
  }).filter((filePath) => !filePath.includes('/navigation/'));
  for (const filePath of filePaths) {
    const filePathFromRepoRoot = getFilePathFromRepoRoot(
      filePath,
      repositoryRoot
    );
    console.log(
      `${Emoji.Mag} Validating shared content JSON`,
      filePathFromRepoRoot
    );
    checkJsonIsValid({
      config,
      fileContent: readFileSync(filePath),
      filePath: filePathFromRepoRoot,
    });
  }
};
