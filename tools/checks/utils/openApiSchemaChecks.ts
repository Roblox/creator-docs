import { Validator } from "@seriousme/openapi-schema-validator";

import { IConfig } from './config.js';
import { addToSummaryOfRequirements } from './console.js';
import { createNewPullRequestComment, requiredCheckMessage } from './github.js';
import { Emoji } from './utils.js';

const validator = new Validator();

export const containsOpenApiSchema = (fileContent: string) => {
  try {
    const obj = JSON.parse(fileContent);
    return obj.openapi && typeof obj.openapi === 'string';
  } catch (error) {
    return false;
  }
}

export const validateOpenApiSchema = async ({
  config,
  filePath,
}: {
  config: IConfig;
  filePath: string;
}) => {
  const res = await validator.validate(filePath);
  if (res.valid) {
    return;
  }

  const errorJson = JSON.stringify(res?.errors, null, 2);

  const message = `${Emoji.NoEntry} Requirement: The OpenAPI schema in file ${filePath} failed validation:\n\n${errorJson}`;
  console.log(message);
  addToSummaryOfRequirements(message);

  if (config.postPullRequestComments) {
    const commentBody = `This OpenAPI schema failed validation:
    
\`\`\`json
${errorJson}
\`\`\`

${requiredCheckMessage}`;

    createNewPullRequestComment({
      body: commentBody,
      commit_id: config.commitHash,
      line: 1,
      path: filePath,
      pull_number: config.pullRequestNumber,
      repository: config.repository,
    });
  }
};