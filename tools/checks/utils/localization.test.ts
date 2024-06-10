import {
  Locale,
  getLocaleFromFilePath,
  isLocaleFile,
  getLocaleVersionFilePath,
} from './localization.js';

describe('getLocaleFromFilePath', () => {
  it('should return the locale for en-us', () => {
    expect(getLocaleFromFilePath('content/en-us/foo/bar.md')).toStrictEqual(
      Locale.EN_US
    );
  });
  it('should return the locale for es-es', () => {
    expect(getLocaleFromFilePath('content/es-es/foo/bar.md')).toStrictEqual(
      Locale.ES_ES
    );
  });
});

describe('isLocaleFile', () => {
  it('should return true if the file is the specified locale', () => {
    expect(isLocaleFile('content/en-us/foo/bar.md', Locale.EN_US)).toBe(true);
  });
  it('should return false if the file is not the specified locale', () => {
    expect(isLocaleFile('content/es-es/foo/bar.md', Locale.EN_US)).toBe(false);
  });
});

describe('getLocaleVersionFilePath', () => {
  it('should return the English version for English file', () => {
    expect(
      getLocaleVersionFilePath('content/en-us/foo/bar.md', Locale.EN_US)
    ).toBe('content/en-us/foo/bar.md');
  });

  it('should return the English version for non-English', () => {
    expect(
      getLocaleVersionFilePath('content/es-es/foo/bar.md', Locale.EN_US)
    ).toBe('content/en-us/foo/bar.md');
  });
});
