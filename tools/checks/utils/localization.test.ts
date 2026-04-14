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
  it('should return the locale for ar-001', () => {
    expect(getLocaleFromFilePath('content/ar-001/foo/bar.md')).toStrictEqual(
      Locale.AR_001
    );
  });
  it('should return null for no locale match', () => {
    expect(getLocaleFromFilePath('content/foo/bar.md')).toBeNull();
  });
});

describe('isLocaleFile', () => {
  it('should return true if the file is the specified locale', () => {
    expect(isLocaleFile('content/en-us/foo/bar.md', Locale.EN_US)).toBe(true);
  });
  it('should return false if the file is not the specified locale', () => {
    expect(isLocaleFile('content/es-es/foo/bar.md', Locale.EN_US)).toBe(false);
  });
  it('should return true for ar-001 locale', () => {
    expect(isLocaleFile('content/ar-001/foo/bar.md', Locale.AR_001)).toBe(true);
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

  it('should return the English version for ar-001', () => {
    expect(
      getLocaleVersionFilePath('content/ar-001/foo/bar.md', Locale.EN_US)
    ).toBe('content/en-us/foo/bar.md');
  });

  it('should return the ar-001 version for English', () => {
    expect(
      getLocaleVersionFilePath('content/en-us/foo/bar.md', Locale.AR_001)
    ).toBe('content/ar-001/foo/bar.md');
  });
});
