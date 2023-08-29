import { serializeTuple } from './utils.js';
import { deduplicate } from './utils.js';

describe('serializeTuple', () => {
  it('should serialize numbers into a comma-separated string', () => {
    const result = serializeTuple(1, 2, 3);
    expect(result).toBe('1,2,3');
  });

  it('should serialize strings into a comma-separated string', () => {
    const result = serializeTuple('a', 'b', 'c');
    expect(result).toBe('a,b,c');
  });

  it('should serialize mixed types into a comma-separated string', () => {
    const result = serializeTuple(1, 'a', 2, 'b');
    expect(result).toBe('1,a,2,b');
  });

  it('should serialize mixed types into a comma-separated string', () => {
    const result = serializeTuple('README.md', 1);
    expect(result).toBe('README.md,1');
  });

  it('should handle single arguments', () => {
    const result = serializeTuple('a');
    expect(result).toBe('a');
  });

  it('should handle empty arguments', () => {
    const result = serializeTuple();
    expect(result).toBe('');
  });
});

describe('deduplicate', () => {
  it('should return an empty array for an empty input', () => {
    expect(deduplicate([])).toEqual([]);
  });

  it('should deduplicate a list with repeated elements', () => {
    const input = [1, 2, 2, 3, 4, 4, 4, 5];
    const expected = [1, 2, 3, 4, 5];
    expect(deduplicate(input)).toEqual(expected);
  });

  it('should return the same list if there are no repetitions', () => {
    const input = ['a', 'b', 'c', 'd'];
    expect(deduplicate(input)).toEqual(input);
  });

  it('should handle lists with various data types', () => {
    const input = [1, 'a', 1, 'a', true, true, false];
    const expected = [1, 'a', true, false];
    expect(deduplicate(input)).toEqual(expected);
  });

  it('should not modify the original list', () => {
    const input = [1, 2, 3, 3];
    const original = [...input];
    deduplicate(input);
    expect(input).toEqual(original);
  });
});
