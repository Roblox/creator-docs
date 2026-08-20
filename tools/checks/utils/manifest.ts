import * as fs from 'fs';
import * as path from 'path';
import { IConfig } from './config.js';
import { addToSummaryOfRequirements } from './console.js';
import { readFileSync, repositoryRoot } from './files.js';
import { createNewPullRequestComment, requiredCheckMessage } from './github.js';
import { Emoji } from './utils.js';

const MANIFEST_PATH = 'content/common/manifest.json';
/**
 * `hiddenPages` entries are locale-independent page paths (e.g.
 * `/production/ad-placements/hypershot.md`); en-us is the source of truth, so a
 * referenced page must exist there.
 */
const EN_US_CONTENT_DIR = 'content/en-us';

/**
 * Returns the `hiddenPages` entries that do not resolve to an existing file.
 * Pure and dependency-injected (`fileExistsUnderEnUs`) so it can be unit tested
 * without touching the filesystem. Non-string entries are ignored.
 *
 * @param hiddenPages - The manifest's `hiddenPages` value (untrusted shape).
 * @param fileExistsUnderEnUs - Predicate: does `content/en-us/<relativePath>`
 * exist? `relativePath` has no leading slash.
 */
export const findMissingHiddenPageReferences = (
  hiddenPages: unknown,
  fileExistsUnderEnUs: (relativePath: string) => boolean
): string[] => {
  if (!Array.isArray(hiddenPages)) {
    return [];
  }
  const missing: string[] = [];
  for (const hiddenPage of hiddenPages) {
    if (typeof hiddenPage !== 'string') {
      continue;
    }
    const relativePath = hiddenPage.replace(/^\//, '');
    if (!fileExistsUnderEnUs(relativePath)) {
      missing.push(hiddenPage);
    }
  }
  return missing;
};

/** Finds the 1-based line of the first line containing `text`, else 1. */
const getLineNumberForText = (fileContent: string, text: string): number => {
  const lines = fileContent.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(text)) {
      return i + 1;
    }
  }
  return 1;
};

/**
 * Validates that every page referenced by `content/common/manifest.json`
 * actually exists. A reference to a deleted file (e.g. `hypershot.md` removed
 * without removing its `hiddenPages` entry) breaks page generation with a
 * misleading "Can't load file" error rather than pointing at the manifest.
 * Reports each dangling reference as a required check so the run exits 1.
 *
 * JSON syntax is validated separately by `checkJsonIsValid`; if the manifest
 * does not parse, this check is skipped (the syntax error is already reported).
 */
export const checkManifestReferences = ({
  config,
}: {
  config: IConfig;
}): void => {
  const manifestFullPath = path.join(repositoryRoot, MANIFEST_PATH);
  if (!fs.existsSync(manifestFullPath)) {
    return;
  }
  const fileContent = readFileSync(manifestFullPath);
  let manifest: { hiddenPages?: unknown };
  try {
    manifest = JSON.parse(fileContent);
  } catch {
    return;
  }

  const missing = findMissingHiddenPageReferences(
    manifest.hiddenPages,
    (relativePath) =>
      fs.existsSync(path.join(repositoryRoot, EN_US_CONTENT_DIR, relativePath))
  );

  for (const hiddenPage of missing) {
    const expectedPath = `${EN_US_CONTENT_DIR}${hiddenPage}`;
    const consoleMessage = `${Emoji.NoEntry} Requirement: In ${MANIFEST_PATH}, hiddenPages references "${hiddenPage}" but no such file exists at ${expectedPath}. Remove the reference or restore the file.`;
    console.log(consoleMessage);
    addToSummaryOfRequirements(consoleMessage);

    if (config.postPullRequestComments) {
      const body = `\`manifest.json\` references a page that does not exist:

- \`${hiddenPage}\` (expected \`${expectedPath}\`)

A missing referenced file breaks page generation with a misleading "Can't load file" error. Remove this entry from \`hiddenPages\`, or restore the file if it was deleted by mistake.

${requiredCheckMessage}`;
      createNewPullRequestComment({
        body,
        commit_id: config.commitHash,
        line: getLineNumberForText(fileContent, `"${hiddenPage}"`),
        path: MANIFEST_PATH,
        pull_number: config.pullRequestNumber,
        repository: config.repository,
      });
    }
  }
};
