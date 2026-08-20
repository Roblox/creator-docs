import { checkJsonIsValid } from './json.js';
import * as console from './console.js';
import { IConfig } from './config.js';

const config = {
  postPullRequestComments: false,
} as IConfig;

describe('checkJsonIsValid', () => {
  it('returns true for valid JSON and reports no requirement', () => {
    // `summaryOfRequirements` is a live ESM binding that accumulates across the
    // suite, so compare before/after rather than expecting an absolute value.
    const before = console.summaryOfRequirements;
    const result = checkJsonIsValid({
      config,
      fileContent: '{ "hiddenPages": ["/a.md", "/b.md"] }',
      filePath: 'content/common/valid.json',
    });
    expect(result).toBe(true);
    expect(console.summaryOfRequirements).toBe(before);
  });

  it('returns false for JSON with a missing comma (the manifest failure mode)', () => {
    // Mirrors the real manifest bug: two array entries with no comma between.
    const brokenManifest = `{
  "hiddenPages": [
    "/art/modeling/calisthenics-tool.md"
    "/art/characters/head-comparison.md"
  ]
}`;
    const result = checkJsonIsValid({
      config,
      fileContent: brokenManifest,
      filePath: 'content/common/manifest.json',
    });
    expect(result).toBe(false);
  });

  it('names the offending file in the requirements summary', () => {
    checkJsonIsValid({
      config,
      fileContent: '{ "a": 1, }',
      filePath: 'content/common/trailing-comma.json',
    });
    expect(console.summaryOfRequirements).toContain(
      'content/common/trailing-comma.json'
    );
  });
});
