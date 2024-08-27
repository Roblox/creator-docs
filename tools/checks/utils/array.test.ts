import { areArraysEqual } from './array.js';

describe('areArraysEqual', () => {
  it('should return true if arrays are equal', () => {
    expect(areArraysEqual(['a', 'b', 'c'], ['a', 'b', 'c'])).toBe(true);
  });
  it('should return false if arrays are not equal', () => {
    expect(areArraysEqual(['a', 'b', 'c'], ['a', 'b', 'd'])).toBe(false);
  });
  it('should return false if arrays have different lengths', () => {
    expect(areArraysEqual(['a', 'b', 'c'], ['a', 'b'])).toBe(false);
  });
});
