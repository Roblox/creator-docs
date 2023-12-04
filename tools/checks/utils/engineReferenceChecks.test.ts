import {
  getEngineApiTypeFromFilePath,
  getEditedProtectedFieldsData,
} from './engineReferenceChecks.js';

describe('getEngineApiTypeFromFilePath', () => {
  it('should return "classes" for classes', () => {
    const filePath = 'content/en-us/reference/engine/classes/Name.yaml';
    const engineApiType = getEngineApiTypeFromFilePath(filePath);
    expect(engineApiType).toBe('classes');
  });
  it('should return "datatypes" for datatypes', () => {
    const filePath = 'content/en-us/reference/engine/datatypes/Name.yaml';
    const engineApiType = getEngineApiTypeFromFilePath(filePath);
    expect(engineApiType).toBe('datatypes');
  });
  it('should return "enums" for enums', () => {
    const filePath = 'content/en-us/reference/engine/enums/Name.yaml';
    const engineApiType = getEngineApiTypeFromFilePath(filePath);
    expect(engineApiType).toBe('enums');
  });
  it('should return "globals" for globals', () => {
    const filePath = 'content/en-us/reference/engine/globals/Name.yaml';
    const engineApiType = getEngineApiTypeFromFilePath(filePath);
    expect(engineApiType).toBe('globals');
  });
  it('should return "libraries" for libraries', () => {
    const filePath = 'content/en-us/reference/engine/libraries/Name.yaml';
    const engineApiType = getEngineApiTypeFromFilePath(filePath);
    expect(engineApiType).toBe('libraries');
  });
});

describe('compareProtectedFields', () => {
  const editableFields = ['summary', 'description', 'deprecation_message'];

  const casesWithoutEditedProtectedFields: any[] = [
    [
      { name: 'ClassName', type: 'class' },
      { name: 'ClassName', type: 'class' },
    ],
    [
      { name: 'ClassName', summary: 'ok' },
      { name: 'ClassName', summary: 'also ok' },
    ],
    [
      { name: 'ClassName', details: { type: 'class', summary: 'ok' } },
      { name: 'ClassName', details: { type: 'class', summary: 'ok' } },
    ],
    [
      {
        name: 'ClassName',
        details: { type: 'class', summary: 'ok', description: 'more ok' },
      },
      {
        name: 'ClassName',
        details: { type: 'class', summary: 'also ok', description: 'more ok!' },
      },
    ],
    [
      {
        name: 'ClassName',
        details: {
          description: 'Hello world once!',
          type: 'class',
          summary: 'ok',
        },
      },
      {
        name: 'ClassName',
        details: {
          description: 'Hello world again!',
          type: 'class',
          summary: 'also ok',
        },
      },
    ],
  ];

  const casesWithEditedProtectedFields: any[] = [
    // Changes to protected fields
    [
      { name: 'ClassName', type: 'class' },
      { name: 'EnumName', type: 'class' },
    ],
    // Additions and removals
    [{ name: 'ClassName' }, { name: 'ClassName', type: 'class' }],
    [{ name: 'ClassName', type: 'class' }, { name: 'ClassName' }],
    // Don't allow removals even of excluded fields
    [{ name: 'ClassName', summary: 'Hello world' }, { name: 'ClassName' }],
    // Content changes and changes to protected fields
    [
      {
        name: 'ClassName',
        details: { description: 'Hello world', type: 'class', summary: 'ok' },
      },
      {
        name: 'ClassName',
        details: {
          description: 'Hello world again!',
          type: 'enum',
          summary: 'also ok',
        },
      },
    ],
  ];

  test.each(casesWithoutEditedProtectedFields)(
    'should return true for identical objects %p and %p',
    (oldContentData, newContentData) => {
      const { hasEditedProtectedFields } = getEditedProtectedFieldsData({
        oldContentData,
        newContentData,
        editableFields,
      });
      expect(hasEditedProtectedFields).toBe(true);
    }
  );

  test.each(casesWithEditedProtectedFields)(
    'should return false for different objects %p and %p',
    (oldContentData, newContentData) => {
      const { hasEditedProtectedFields } = getEditedProtectedFieldsData({
        oldContentData,
        newContentData,
        editableFields,
      });
      expect(hasEditedProtectedFields).toBe(false);
    }
  );
  it('Should return false for multiple edited fields', () => {
    const oldContentData = {
      name: 'ClassName',
      details: { type: 'class', category: 'Avatar', summary: 'ok' },
    };
    const newContentData = {
      name: 'EnumName',
      details: {
        type: 'enum',
        category: 'Physics',
        summary: 'also ok',
      },
    };
    const comparison = getEditedProtectedFieldsData({
      oldContentData,
      newContentData,
      editableFields,
    });
    expect(comparison.hasEditedProtectedFields).toBe(false);
    expect(comparison.editedProtectedFields).toStrictEqual([
      'name',
      'details.type',
      'details.category',
    ]);
  });
});
