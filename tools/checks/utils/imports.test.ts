import {
  FILE_IMPORT_REGEX,
  getFileImports,
  areEqualFileImports,
} from './imports.js';

const HelloWorld = 'Hello, World!';

const contentWithTestImports = `import Foo from './foo.md';
import Bar from '../bar.md';
import Baz from '../../baz.md'

${HelloWorld}`;

describe('FILE_IMPORT_REGEX', () => {
  it('should match imports', () => {
    expect(contentWithTestImports.match(FILE_IMPORT_REGEX)).toEqual([
      "import Foo from './foo.md'",
      "import Bar from '../bar.md'",
      "import Baz from '../../baz.md'",
    ]);
  });
  it('should not match text without imports', () => {
    const contentWithoutImports = `importar Foo de './foo.md'
    importar Bar de '../bar.md'
    importart Baz de '../../baz.md'
    
    ${HelloWorld}`;
    expect(contentWithoutImports.match(FILE_IMPORT_REGEX)).toBeNull();
  });
  it('should match imports with groups', () => {
    expect(
      Array.from(contentWithTestImports.matchAll(FILE_IMPORT_REGEX)).toString()
    ).toStrictEqual(
      [
        ["import Foo from './foo.md'", 'Foo', './foo.md'],
        ["import Bar from '../bar.md'", 'Bar', '../bar.md'],
        ["import Baz from '../../baz.md'", 'Baz', '../../baz.md'],
      ].toString()
    );
  });
});

describe('getFileImports', () => {
  it('should return an empty object if there are no imports', () => {
    expect(getFileImports(HelloWorld)).toEqual({
      statements: [],
      components: [],
      files: [],
    });
  });

  it('should return an array of imports', () => {
    expect(getFileImports(contentWithTestImports).statements).toEqual([
      "import Foo from './foo.md'",
      "import Bar from '../bar.md'",
      "import Baz from '../../baz.md'",
    ]);
    expect(getFileImports(contentWithTestImports).components).toEqual([
      'Foo',
      'Bar',
      'Baz',
    ]);
    expect(getFileImports(contentWithTestImports).files).toEqual([
      './foo.md',
      '../bar.md',
      '../../baz.md',
    ]);
  });
});

describe('areEqualFileImports', () => {
  it('should return true if imports are equal', () => {
    const fileImports1 = getFileImports(contentWithTestImports);
    const fileImports2 = getFileImports(contentWithTestImports);
    expect(areEqualFileImports(fileImports1, fileImports2)).toBe(true);
  });
  it('should return false if imports are not equal', () => {
    const fileImports1 = getFileImports(contentWithTestImports);
    const fileImports2 = getFileImports(HelloWorld);
    expect(areEqualFileImports(fileImports1, fileImports2)).toBe(false);
  });
});
