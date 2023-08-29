import { getFilePathFromRepoRoot } from './files.js';

describe('getFilePathFromRepoRoot', () => {
  const mockRepositoryRoot = '/Users/username/repo-name/';

  it('should return the file path relative to repo root when absolute path is provided', () => {
    const filePath = '/Users/username/repo-name/content/docs/path/to/file.md';
    const result = getFilePathFromRepoRoot(filePath, mockRepositoryRoot);
    expect(result).toBe('content/docs/path/to/file.md');
  });

  it('should return the original file name when it does not include the repo root', () => {
    const filePath = 'content/docs/path/to/file.md';
    const result = getFilePathFromRepoRoot(filePath, mockRepositoryRoot);
    expect(result).toBe(filePath);
  });

  it('should handle cases where the repositoryRoot is not at the start of the string', () => {
    const filePath =
      '/some/random/path/Users/username/repo-name/content/docs/path/to/file.md';
    const result = getFilePathFromRepoRoot(filePath, mockRepositoryRoot);
    expect(result).toBe('content/docs/path/to/file.md');
  });
});
