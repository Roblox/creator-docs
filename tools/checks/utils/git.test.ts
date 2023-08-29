import { extractRepoNameFromUrl } from './git.js';

describe('extractRepoNameFromUrl', () => {
  it('should extract the repository name from the provided URL', () => {
    const testUrl = 'https://github.com/OrgName/RepoName.git';
    const repoName = extractRepoNameFromUrl(testUrl);
    expect(repoName).toBe('RepoName');
  });

  it('should return null if the URL does not have a valid repo name format', () => {
    const testUrl = 'https://github.com/OrgName/';
    const repoName = extractRepoNameFromUrl(testUrl);
    expect(repoName).toBeNull();
  });
});
