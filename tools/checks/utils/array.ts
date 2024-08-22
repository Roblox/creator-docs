export const areArraysEqual = (arr1: string[], arr2: string[]): boolean => {
  return (
    arr1.length === arr2.length &&
    arr1.every((val, index) => val === arr2[index])
  );
};
