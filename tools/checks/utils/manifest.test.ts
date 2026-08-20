import { findMissingHiddenPageReferences } from './manifest.js';

describe('findMissingHiddenPageReferences', () => {
  it('returns entries with no corresponding file (the hypershot case)', () => {
    const existing = new Set([
      'production/ad-placements/adoptme.md',
      'production/ad-placements/brookhaven.md',
    ]);
    const hiddenPages = [
      '/production/ad-placements/adoptme.md',
      '/production/ad-placements/hypershot.md', // removed without removing the reference
      '/production/ad-placements/brookhaven.md',
    ];
    const missing = findMissingHiddenPageReferences(hiddenPages, (rel) =>
      existing.has(rel)
    );
    expect(missing).toEqual(['/production/ad-placements/hypershot.md']);
  });

  it('returns [] when every reference resolves', () => {
    const hiddenPages = ['/a.md', '/nested/b.md'];
    const missing = findMissingHiddenPageReferences(hiddenPages, () => true);
    expect(missing).toEqual([]);
  });

  it('strips the leading slash before checking existence', () => {
    const seen: string[] = [];
    findMissingHiddenPageReferences(['/art/tool.md'], (rel) => {
      seen.push(rel);
      return true;
    });
    expect(seen).toEqual(['art/tool.md']);
  });

  it('ignores non-string and non-array input', () => {
    expect(findMissingHiddenPageReferences(undefined, () => false)).toEqual([]);
    expect(
      findMissingHiddenPageReferences([1, null, '/real.md'], (rel) =>
        rel === 'real.md' ? true : false
      )
    ).toEqual([]);
  });
});
