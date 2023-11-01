import { simpleGit, SimpleGit } from 'simple-git';
import { deduplicate } from './utils.js';
import { FileExtension, filterByExtensions } from './files.js';

const git: SimpleGit = simpleGit();

export const OWNER = 'Roblox';
export const CREATOR_DOCS = 'creator-docs';
export const ORIGIN_MAIN = 'origin/main';
const ORIGIN = 'origin';
const UPSTREAM = 'upstream';
const GIT_URL_SUFFIX = '.git';

/**
 * Extracts the repository name from the given URL
 * For example, https://github.com/OrgName/RepoName.git becomes RepoName.
 * @param url - The repo URL.
 * @returns The repository name or null.
 */
export const extractRepoNameFromUrl = (url: string): string | null => {
  const repoName = url.split('/').pop()?.replace(GIT_URL_SUFFIX, '');
  return repoName || null;
};

/**
 * Get the name of the current repository from `git remote`.
 * @returns The name of the current repository.
 */
export const getRepositoryName = async (): Promise<string> => {
  console.log('::group::📚 Getting repository name');
  try {
    const remotes = await git.getRemotes(true);
    console.log('Remotes:', remotes);
    // Prefer remote first to work better with forks
    const upstreamRemote = remotes.find((remote) => remote.name === UPSTREAM);
    const originRemote = remotes.find((remote) => remote.name === ORIGIN);
    const repoUrl = upstreamRemote?.refs?.push || originRemote?.refs?.push;
    if (!repoUrl) {
      return CREATOR_DOCS;
    }

    const repoName = extractRepoNameFromUrl(repoUrl);
    console.log('Extracted repo name:', repoName);
    return repoName || CREATOR_DOCS;
  } catch (error) {
    console.error('Failed to get repo name:', error);
    return CREATOR_DOCS;
  } finally {
    console.log('::endgroup::');
  }
};

const getCurrentBranch = async (): Promise<string> => {
  const currentBranch = await git.revparse(['--abbrev-ref', 'HEAD']);
  console.log('Current branch:', currentBranch);
  return currentBranch;
};

/**
 * Extracts file paths from the diff that are modified or added.
 * @param diff - The git diff output.
 * @returns An array of modified or added file paths.
 */
const extractModifiedAndAddedFiles = (diff: string): string[] => {
  return diff
    .split('\n')
    .filter((line) => line.startsWith('M') || line.startsWith('A'))
    .map((line) => line.split('\t')[1]);
};

/**
 * Retrieves the files that have been committed on the current branch against
 * the base branch.
 * @param baseBranch - The branch to compare the current branch against.
 * @returns An array of committed file paths.
 */
const getCommittedFiles = async (baseBranch: string): Promise<string[]> => {
  const diff = await git.diff([`${baseBranch}...`, '--name-status']);
  return extractModifiedAndAddedFiles(diff);
};

/**
 * Retrieves the files that have been staged but not yet committed.
 * @returns An array of staged file paths.
 */
const getUncommittedStagedFiles = async (): Promise<string[]> => {
  const diff = await git.diff(['--staged', '--name-status']);
  return extractModifiedAndAddedFiles(diff);
};

/**
 * Retrieves the files that have changes but are not staged.
 * @returns An array of unstaged file paths.
 */
const getUncommittedUnstagedFiles = async (): Promise<string[]> => {
  const diff = await git.diff(['--name-status']);
  return extractModifiedAndAddedFiles(diff);
};

/**
 * Retrieves the files that are not being tracked by git.
 * @returns An array of untracked file paths.
 */
const getUntrackedFiles = async (): Promise<string[]> => {
  const status = await git.status();
  return status.not_added;
};

/**
 * Retrieves the file paths that were modified or added in the last commit.
 * @returns An array of file paths changed in the last commit.
 */
export const getFilesChangedInLastCommit = async (): Promise<string[]> => {
  console.log('Getting files changed in the last commit');
  const diff = await git.diff(['HEAD^', '--name-status']);
  const changedFiles = extractModifiedAndAddedFiles(diff);
  console.log('Files changed in the last commit:', changedFiles);
  return changedFiles;
};

/**
 * Retrieves all file paths that have changes when compared to the base branch,
 * including committed, uncommitted staged, uncommitted unstaged, and untracked
 * files.
 * @param baseBranch - The branch to compare the current branch against.
 * @returns An array of file paths changed against the base branch.
 */
export const getFilesChangedComparedToBase = async (baseBranch: string) => {
  console.log(
    `Getting files changed in ${await getCurrentBranch()} compared to ${baseBranch}`
  );
  const committedFiles = await getCommittedFiles(baseBranch);
  const uncommittedStagedFiles = await getUncommittedStagedFiles();
  const uncommittedUnstagedFiles = await getUncommittedUnstagedFiles();
  const untrackedFiles = await getUntrackedFiles();

  console.log('Committed files:', committedFiles);
  console.log('Uncommitted staged files:', uncommittedStagedFiles);
  console.log('Uncommitted unstaged files:', uncommittedUnstagedFiles);
  console.log('Untracked files:', untrackedFiles);
  const changedFiles = deduplicate([
    ...committedFiles,
    ...uncommittedStagedFiles,
    ...uncommittedUnstagedFiles,
    ...untrackedFiles,
  ]).sort();

  console.log('All changed files, deduplicated:', changedFiles);
  return changedFiles;
};

/**
 * Retrieves the changed files compared to the base branch and filters them by
 * the provided file extension.
 *
 * @param baseBranch - The branch to compare the current branch against.
 * @param extension - The file extension to filter the results (such as '.md').
 * @returns An array of changed file paths that match the provided extension.
 */
export const getFilesChangedComparedToBaseByExtension = async ({
  baseBranch,
  fileExtensions,
}: {
  baseBranch: string;
  fileExtensions: FileExtension[];
}): Promise<string[]> => {
  const changedFilesWithExtension = (
    await getFilesChangedComparedToBase(baseBranch)
  ).filter(filterByExtensions(fileExtensions));
  console.log(
    `Files changed compared to ${baseBranch} with extensions ${fileExtensions}:`,
    changedFilesWithExtension
  );
  return changedFilesWithExtension;
};

export const getFilesChangedInLastCommitByExtensions = async (
  fileExtensions: FileExtension[]
): Promise<string[]> => {
  const changedFilesWithExtension = (
    await getFilesChangedInLastCommit()
  ).filter(filterByExtensions(fileExtensions));
  console.log(
    `Files changed in last commit ending in file extensions ${fileExtensions}:`,
    changedFilesWithExtension
  );
  return changedFilesWithExtension;
};

export const getOldFile = async ({
  branch,
  filePath,
}: {
  branch: string;
  filePath: string;
}) => {
  try {
    return await git.show([`${branch}:${filePath}`]);
  } catch (e) {
    console.error(`Error getting old file: ${e}`);
  }
};
