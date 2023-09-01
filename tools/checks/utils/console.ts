export let summaryOfRequirements: string = '';
export let summaryOfSuggestions: string = '';

export const addToSummaryOfSuggestions = (message: string) => {
  summaryOfSuggestions += message + '\n';
};

export const addToSummaryOfRequirements = (message: string) => {
  summaryOfRequirements += message + '\n';
};
