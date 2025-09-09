import spectralCore from '@stoplight/spectral-core';
import { DiagnosticSeverity } from '@stoplight/types';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const { Spectral, Document } = spectralCore;
import Parsers from '@stoplight/spectral-parsers';
import spectralRuntime from '@stoplight/spectral-runtime';
const { fetch } = spectralRuntime;
import { bundleAndLoadRuleset } from '@stoplight/spectral-ruleset-bundler/with-loader';

import { IConfig } from '../config.js';
import { addToSummaryOfRequirements } from '../console.js';
import {
  createNewPullRequestComment,
  requiredCheckMessage,
} from '../github.js';
import { Emoji } from '../utils.js';
import { readFileSync } from '../files.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const containsOpenApiSchema = (fileContent: string) => {
  try {
    const obj = JSON.parse(fileContent);
    return !!(obj.openapi && typeof obj.openapi === 'string');
  } catch (error) {
    return false;
  }
};

// Spectral handles all validation through rulesets - no need for manual schema compilation
export const validateOpenApiSchema = async ({
  config,
  filePath,
}: {
  config: IConfig;
  filePath: string;
}) => {
  const apiDocument = new Document(
    readFileSync(filePath),
    Parsers.Json,
    filePath
  );
  const spectral = new Spectral();
  const rulesetFilepath = path.join(__dirname, 'spectral.yml');
  spectral.setRuleset(
    await bundleAndLoadRuleset(rulesetFilepath, { fs, fetch })
  );

  const result = await spectral.run(apiDocument);
  const errors = result.filter(
    (result) => result.severity === DiagnosticSeverity.Error
  );

  const warnings = result.filter(
    (r) => r.severity === DiagnosticSeverity.Warning
  );

  console.log('warnings', warnings);

  if (errors.length === 0) {
    return [];
  }

  const errorJson = JSON.stringify(errors, null, 2);

  const message = `${Emoji.NoEntry} Requirement: The OpenAPI schema in file ${filePath} failed validation:\n\n${errorJson}`;
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
  return errors;
};
