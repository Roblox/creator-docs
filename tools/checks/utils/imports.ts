import { areArraysEqual } from './array.js';

export const FILE_IMPORT_REGEX = /import (.*) from '(.*)'/gm;
export interface FileImports {
  statements: string[];
  components: string[];
  files: string[];
}

export const getFileImports = (fileContent: string): FileImports => {
  const imports = Array.from(fileContent.matchAll(FILE_IMPORT_REGEX));
  /**
   * Example item in array:
      [
        "import Foo from './foo.md'",
        'Foo',
        './foo.md',
        index: 0,
        input: "import Foo from './foo.md';\n" +
          "import Bar from '../bar.md';\n" +
          "import Baz from '../../baz.md';",
        groups: undefined
      ],
   */

  const fileImports: FileImports = {
    statements: imports.map((fileImport) => fileImport[0]),
    components: imports.map((fileImport) => fileImport[1]),
    files: imports.map((fileImport) => fileImport[2]),
  };

  return fileImports;
};

export const areEqualFileImports = (
  imports1: FileImports,
  imports2: FileImports
): boolean => {
  return (
    areArraysEqual(imports1.statements, imports2.statements) &&
    areArraysEqual(imports1.components, imports2.components) &&
    areArraysEqual(imports1.files, imports2.files)
  );
};
