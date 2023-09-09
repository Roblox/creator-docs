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
    console.log(summaryOfSuggestions);
  }
  if (summaryOfRequirements) {
    console.log(`${Emoji.NoEntry} The checks found some requirements:`);
    console.log(summaryOfRequirements);
    console.log(
      `${Emoji.NoEntry} Please fix the requirements before merging your pull request.`
    );
  }
  if (!summaryOfSuggestions && !summaryOfRequirements) {
    console.log(`${Emoji.WhiteCheckMark} No issues found`);
  }
};
