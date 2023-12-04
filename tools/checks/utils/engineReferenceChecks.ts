import Ajv from 'ajv';
import { readFileSync } from 'fs';
import { parse, YAMLParseError } from 'yaml';

import { IConfig } from './config.js';
import { addToSummaryOfRequirements } from './console.js';
import { repositoryRoot } from './files.js';
import { getOldFile } from './git.js';
import { createNewPullRequestComment, requiredCheckMessage } from './github.js';
import { capitalizeFirstLetter, Emoji } from './utils.js';

const ajv = new Ajv.default({ strict: false });

const schemaPathMap: Record<string, string> = {
  classes: `${repositoryRoot}/tools/schemas/engine/classes.json`,
  datatypes: `${repositoryRoot}/tools/schemas/engine/datatypes.json`,
  enums: `${repositoryRoot}/tools/schemas/engine/enums.json`,
  globals: `${repositoryRoot}/tools/schemas/engine/globals.json`,
  libraries: `${repositoryRoot}/tools/schemas/engine/libraries.json`,
};
const regex = /reference\/engine\/([^\/]+)\/[^\/]+\.yaml/;

export const getEngineApiTypeFromFilePath = (
  filePath: string
): string | undefined => {
  const match = filePath.match(regex);
  return match && match[1] ? match[1] : undefined;
};

// Load a schema from a file and compile it with AJV
const getValidator = (schemaPath: string) => {
  const schema = JSON.parse(readFileSync(schemaPath, 'utf-8'));
  return ajv.compile(schema);
};

const handleYamlParseError = ({
  config,
  filePath,
  e,
}: {
  config: IConfig;
  filePath: string;
  e: any;
}) => {
  const message = `${Emoji.NoEntry} Requirement: In ${filePath}, error parsing YAML: ${e.message}`;
  console.error(message);
  addToSummaryOfRequirements(message);
  if (e instanceof YAMLParseError && config.postPullRequestComments) {
    const commentBody = `Error parsing YAML: ${e.message}

${requiredCheckMessage}`;
    const line = e.linePos ? e.linePos[0].line : 1;
    // const column = e.linePos ? e.linePos[0].col : 1;
    createNewPullRequestComment({
      body: commentBody,
      commit_id: config.commitHash,
      line,
      path: filePath,
      pull_number: config.pullRequestNumber,
      repository: config.repository,
    });
  }
  return;
};

export const validateContentDataAgainstSchema = ({
  engineApiType,
  config,
  contentData,
  filePath,
}: {
  engineApiType: string;
  config: IConfig;
  contentData: any;
  filePath: string;
}) => {
  const schemaPath = schemaPathMap[engineApiType];
  if (!schemaPath) {
    console.log(
      `No validator found for file ${filePath} and Engine API type ${engineApiType}`
    );
    return;
  }

  const validator = getValidator(schemaPath);
  if (validator(contentData)) {
    return;
  }
  const validationErrors = JSON.stringify(validator.errors, null, 2);
  const message = `${
    Emoji.NoEntry
  } Requirement: In ${filePath}, error validating YAML against schema ${
    schemaPath.split(repositoryRoot + '/')[1]
  }:
${validationErrors}`;
  console.log(message);
  addToSummaryOfRequirements(message);

  if (config.postPullRequestComments) {
    const commentBody = `Error validating YAML against schema \`${
      schemaPath.split(repositoryRoot + '/')[1]
    }\`:
\`\`\`json
${validationErrors}
\`\`\`
  
${requiredCheckMessage}`;

    createNewPullRequestComment({
      body: commentBody,
      commit_id: config.commitHash,
      line: 1,
      path: filePath,
      pull_number: config.pullRequestNumber,
      repository: config.repository,
      subject_type: 'file',
    });
  }
};

export const getEditedProtectedFieldsData = ({
  oldContentData,
  newContentData,
  editableFields,
  editedFields = [] as string[],
  parentPath = '',
}: {
  oldContentData: any;
  newContentData: any;
  editableFields: string[];
  editedFields?: string[];
  parentPath?: string;
}): { editedProtectedFields: string[]; hasEditedProtectedFields: boolean } => {
  // Get the union of keys from both old and new objects
  const allFields = new Set([
    ...Object.keys(oldContentData),
    ...Object.keys(newContentData),
  ]);

  for (const field of allFields) {
    const fullPath = parentPath ? `${parentPath}.${field}` : field;
    const oldValue = oldContentData[field];
    const newValue = newContentData[field];

    // If one value is undefined and the other isn't, they are different
    // Don't allow additions or removals
    if (
      oldValue !== newValue &&
      (typeof oldValue === 'undefined' || typeof newValue === 'undefined')
    ) {
      editedFields.push(fullPath);
    }

    // Skip excluded fields at any level
    if (editableFields.includes(field)) {
      continue;
    }

    // Check for nested objects
    if (
      typeof oldValue === 'object' &&
      typeof newValue === 'object' &&
      oldValue !== null &&
      newValue !== null
    ) {
      getEditedProtectedFieldsData({
        oldContentData: oldValue,
        newContentData: newValue,
        editableFields,
        parentPath: fullPath,
        editedFields,
      });
    } else if (oldValue !== newValue) {
      editedFields.push(fullPath);
    }
  }

  if (editedFields.length > 0) {
    return {
      hasEditedProtectedFields: false,
      editedProtectedFields: editedFields,
    };
  }
  return {
    hasEditedProtectedFields: true,
    editedProtectedFields: editedFields,
  };
};

export const checkProtectedFields = async ({
  config,
  contentData,
  filePath,
}: {
  config: IConfig;
  contentData: any;
  filePath: string;
}) => {
  const oldContentStr = await getOldFile({
    branch: config.baseBranch,
    filePath,
  });
  let oldContentData;
  if (oldContentStr) {
    try {
      oldContentData = parse(oldContentStr);
    } catch (e: any) {
      handleYamlParseError({ config, filePath, e });
      return;
    }
  }

  const editableFields = ['summary', 'description', 'deprecation_message'];
  const comparison = getEditedProtectedFieldsData({
    oldContentData,
    newContentData: contentData,
    editableFields,
  });
  if (comparison.hasEditedProtectedFields) {
    return;
  }

  const formattedExcludedFields = editableFields
    .map((field) => `\`${field}\``)
    .join(', ');
  const editedFieldsOneLine = comparison.editedProtectedFields
    .map((field) => `\`${field}\``)
    .join(', ');
  const newLineListMarker = `\n- `;
  const editedFieldsList =
    newLineListMarker +
    comparison.editedProtectedFields
      .map((field) => `\`${field}\``)
      .join(newLineListMarker);

  const message = `only the following fields are editable: ${formattedExcludedFields}. Other fields are automatically overwritten if edited. Please undo changes to the following fields:`;

  const consoleMessage = `${Emoji.NoEntry} Requirement: In ${filePath}, ${message} ${editedFieldsOneLine}.`;
  console.log(consoleMessage);
  addToSummaryOfRequirements(consoleMessage);

  if (config.postPullRequestComments) {
    const commentBody = `${capitalizeFirstLetter(message)}

${editedFieldsList}

${requiredCheckMessage}`;

    createNewPullRequestComment({
      body: commentBody,
      commit_id: config.commitHash,
      line: 1,
      path: filePath,
      pull_number: config.pullRequestNumber,
      repository: config.repository,
      subject_type: 'file',
    });
  }

  return;
};

export const checkEngineReferenceContent = async ({
  config,
  fileContent,
  filePath,
}: {
  config: IConfig;
  fileContent: string;
  filePath: string;
}) => {
  let contentData;
  // Parse the YAML
  try {
    contentData = parse(fileContent);
  } catch (e: any) {
    handleYamlParseError({ config, filePath, e });
    return;
  }

  const engineApiType = getEngineApiTypeFromFilePath(filePath);
  if (!engineApiType) {
    console.log(`No Engine API type found for ${filePath}`);
    return;
  }

  validateContentDataAgainstSchema({
    engineApiType,
    config,
    filePath,
    contentData,
  });

  if (config.checkProtectedFields) {
    if (engineApiType === 'classes' || engineApiType === 'enums') {
      console.log(`Checking protected fields for ${filePath}`);
      await checkProtectedFields({
        config,
        contentData,
        filePath,
      });
    } else {
      console.log(
        `Skipping protected fields check for Engine API type ${engineApiType}`
      );
    }
  }
};
