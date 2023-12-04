/** @type {import('ts-jest').JestConfigWithTsJest} */
import type { JestConfigWithTsJest } from 'ts-jest';
// import { jsWithTsESM } from 'ts-jest/presets';
// https://jestjs.io/docs/ecmascript-modules
// https://kulshekhar.github.io/ts-jest/docs/getting-started/presets
// https://kulshekhar.github.io/ts-jest/docs/guides/esm-support/
// https://stackoverflow.com/questions/66154478/jest-ts-jest-typescript-with-es-modules-import-cannot-find-module

const defaultConfig: JestConfigWithTsJest = {
  extensionsToTreatAsEsm: ['.ts', '.mts'],
  // preset: 'ts-jest/presets/js-with-ts-esm',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[m]?ts$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // resolve .js to .ts
    '^(\\.{1,2}/.*)\\.mjs$': '$1.mts', //resolve .mjs to .mts
  },
  automock: false,
  testPathIgnorePatterns: ['/node_modules/', '.github/'],
};

export default defaultConfig;
