import { IConfig } from './config.js';
import { Emoji } from './utils.js';

export let summaryOfRequirements: string = '';
export let summaryOfSuggestions: string = '';

export const addToSummaryOfSuggestions = (message: string) => {
  summaryOfSuggestions += message + '\n';
};

export const addToSummaryOfRequirements = (message: string) => {
  summaryOfRequirements += message + '\n';
};
const consoleLogSummaryString = (summaryString: string) => {
  // Only log the first 200 errors to avoid spamming the console
  // Over 250 causes issues with GitHub Actions
  // 200 is a nice round number, enough to indicate serious issues
  const MAXIMUM_NUMBER_ERRORS_TO_LOG = 200;
  let counter = 0;
  const summaryArray = summaryString.split('\n');
  for (const summary of summaryArray) {
    console.log(summary);
    counter++;
    if (counter >= MAXIMUM_NUMBER_ERRORS_TO_LOG) {
      console.log(
        `Too many errors to log... ${
          summaryArray.length - MAXIMUM_NUMBER_ERRORS_TO_LOG
        } more errors not shown`
      );
      break;
    }
  }
};

export const logSummariesToConsole = (config: IConfig) => {
  if (
    (summaryOfSuggestions && !config.onlyRequiredChecks) ||
    summaryOfRequirements
  ) {
    console.log('======================================');
    console.log();
  }
  if (summaryOfSuggestions && !config.onlyRequiredChecks) {
    console.log(`${Emoji.Bulb} The checks found some suggestions:`);
    consoleLogSummaryString(summaryOfSuggestions);
  }
  if (summaryOfRequirements) {
    console.log(`${Emoji.NoEntry} The checks found some unmet requirements:`);
    consoleLogSummaryString(summaryOfRequirements);
    console.log(
      `${Emoji.NoEntry} Please fix the requirements before merging your pull request.`
    );
  }
  if (!summaryOfSuggestions && !summaryOfRequirements) {
    console.log(`${Emoji.WhiteCheckMark} No issues found`);
  }
};
