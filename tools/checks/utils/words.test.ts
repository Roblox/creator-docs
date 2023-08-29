import { isAllCaps, isCamelCase, isPascalCase } from './words.js';

const pascalCaseWords = [
  'MyWord',
  'MyOtherWord',
  'MyOtherWOrd',
  'AnotherLongWord',
  'Curve2Size0',
  'Curve1Size2',
  'FrameAttachment',
  'Head_OuterCage',
  'HingeConstraint',
  'Propeller-HingeConstraint-Method',
  'StudsPerTileU',
  'OffsetStudsV',
  'RelativeYY',
];

const camelCaseWords = [
  'myWord',
  'myOtherWord',
  'myOtherWOrd',
  'anotherLongWord',
  'cFrame',
  'universeId1',
  'universeId3',
];

const allCapsWords = ['WORD', 'HELLO', 'WORLD', 'INSTANCE', 'FRAME', 'XYZ'];
const capitalizedWords = ['Word', 'Hello', 'World', 'Instance', 'Frame', 'Xyz'];
const lowercasedWords = ['word', 'hello', 'world', 'instance', 'frame', 'xyz'];

describe('isAllCaps', () => {
  test.each(camelCaseWords)('should not detect %s as all caps', (word) => {
    expect(isAllCaps(word)).toBe(false);
  });
  test.each(pascalCaseWords)('should detect %s as all caps', (word) => {
    expect(isAllCaps(word)).toBe(false);
  });
  test.each(allCapsWords)('should not detect %s as all caps', (word) => {
    expect(isAllCaps(word)).toBe(true);
  });
  test.each(capitalizedWords)('should not detect %s as all caps', (word) => {
    expect(isAllCaps(word)).toBe(false);
  });
  test.each(lowercasedWords)('should not detect %s as all caps', (word) => {
    expect(isAllCaps(word)).toBe(false);
  });
});

describe('isCamelCase', () => {
  test.each(camelCaseWords)('should not detect %s as camelCase', (word) => {
    expect(isCamelCase(word)).toBe(true);
  });
  test.each(pascalCaseWords)('should detect %s as camelCase', (word) => {
    expect(isCamelCase(word)).toBe(false);
  });
  test.each(allCapsWords)('should not detect %s as camelCase', (word) => {
    expect(isCamelCase(word)).toBe(false);
  });
  test.each(capitalizedWords)('should not detect %s as camelCase', (word) => {
    expect(isCamelCase(word)).toBe(false);
  });
  test.each(lowercasedWords)('should not detect %s as camelCase', (word) => {
    expect(isCamelCase(word)).toBe(false);
  });
});

describe('isPascalCase', () => {
  test.each(pascalCaseWords)('should detect %s as PascalCase', (word) => {
    expect(isPascalCase(word)).toBe(true);
  });
  test.each(camelCaseWords)('should not detect %s as PascalCase', (word) => {
    expect(isPascalCase(word)).toBe(false);
  });
  test.each(allCapsWords)('should not detect %s as PascalCase', (word) => {
    expect(isPascalCase(word)).toBe(false);
  });
  test.each(capitalizedWords)('should not detect %s as PascalCase', (word) => {
    expect(isPascalCase(word)).toBe(false);
  });
  test.each(lowercasedWords)('should not detect %s as PascalCase', (word) => {
    expect(isPascalCase(word)).toBe(false);
  });
});
