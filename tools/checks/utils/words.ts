import pluralize from 'pluralize';
import cSpellDictionary from '../../../.vscode/settings.json' with { type: 'json' };
import badWordsListJson from 'bad-words/lib/lang.json' with { type: 'json' };
import { deduplicate } from './utils.js';
import { cuss } from 'cuss';

const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Takes an array of words and returns a new array that includes the original
 * words, their plural and singular forms, and their capitalized counterparts.
 * Utilizes the `pluralize` library to generate plural and singular forms, and
 * a helper function `capitalizeFirstLetter` for capitalization.
 *
 * @param words - An array of words for which plural, singular, and capitalized
 * forms need to be generated.
 * @returns A new deduplicated array containing the original words, their plural
 * forms, singular forms, capitalized words, capitalized plural forms, and
 * capitalized singular forms.
 */
const expandWordVariations = (words: string[]): string[] => {
  const allForms = [
    ...words,
    ...words.map((word) => pluralize(word)),
    ...words.map((word) => pluralize.singular(word)),
    ...words.map(capitalizeFirstLetter),
    ...words.map((word) => capitalizeFirstLetter(pluralize(word))),
    ...words.map((word) => capitalizeFirstLetter(pluralize.singular(word))),
  ];
  return deduplicate(allForms);
};

/**
 * Please write each list in alphabetical order
 */
export const RETEXT_EQUALITY_ALLOW_LIST = [
  'ADD',
  'actor',
  'disabled',
  'host',
  'invalid',
  'just',
  'special',
];

export const RETEXT_PASSIVE_ALLOW_LIST = ['set'];

export const ALLOWED_PROFANE_WORDS_LIST = [
  'breast',
  'breasts',
  'dope',
  'feces',
  'knob',
  'knobs',
  'flange',
  'poop',
  'sex',
  'sexy',
  'vomit'
];
const ALLOWED_PROFANE_WORDS_SET = new Set(ALLOWED_PROFANE_WORDS_LIST);

const BLOCKED_WORDS = ['a$$'];

export const RETEXT_SIMPLIFY_ALLOW_LIST = expandWordVariations([
  'function',
  'parameter',
  'maximum',
]);

export const RETEXT_SPELL_ALLOW_LIST = expandWordVariations([
  ...RETEXT_SIMPLIFY_ALLOW_LIST,
  ...cSpellDictionary['cSpell.words'],
]);

// Helper function to determine if a word is disallowed.
const isDisallowed = (word: string): boolean => {
  return !ALLOWED_PROFANE_WORDS_SET.has(word);
};

// Helper function to filter out words that are not in the allowed set.
const filterDisallowedWords = (wordsList: string[]) => {
  return wordsList.filter(isDisallowed);
};

// Get words from `cuss` with a specific rating.
const getWordsFromCussWithRating = (rating: number) => {
  return Object.keys(cuss).filter(
    (word) => cuss[word] === rating && isDisallowed(word)
  );
};

// Extract words from `cuss` with a value of 2.
const cussWordsWithRating2 = getWordsFromCussWithRating(2);

// Combine the various profane words lists.
export const INAPPROPRIATE_WORDS_LIST = expandWordVariations([
  ...filterDisallowedWords(badWordsListJson.words),
  ...filterDisallowedWords(cussWordsWithRating2),
  ...BLOCKED_WORDS,
]);

export const isAllCaps = (word: string): boolean => {
  const pattern = /^[A-Z0-9-_]+$/;
  return pattern.test(word);
};

export const isCapitalizedAlphanumeric = (word: string): boolean => {
  const pattern = /^[A-Z][a-zA-Z]*\d+$/;
  return pattern.test(word);
};

/**
 * Detects if a word is in camelCase.
 * @param word - The word to check.
 * @returns Boolean indicating if the word is camelCase.
 */
export const isCamelCase = (word: string): boolean => {
  const pattern = /^[a-z]+(?:[A-Z][a-z0-9]*)+$/;
  return pattern.test(word);
};

/**
 * Detects if a word is in PascalCase.
 * Excludes all caps.
 * @param word - The word to check.
 * @returns Boolean indicating if the word is PascalCase.
 */
export const isPascalCase = (word: string): boolean => {
  const pattern = /^[A-Z][a-z0-9-_]+?[A-Z][a-zA-Z0-9-_]*$/;
  return pattern.test(word);
};

const removeTrailingPeriod = (str: string): string => {
  return str.replace(/\.$/, '');
};

/**
 * Reduce spelling errors by skipping these
 * @param word - The word that spell check deemed as misspelled.
 * @returns Whether to ignore the word in spell check.
 */
export const canIgnoreWordInSpellCheck = (word: string) => {
  const wordWithoutPeriod = removeTrailingPeriod(word);
  return (
    isPascalCase(wordWithoutPeriod) ||
    isCamelCase(wordWithoutPeriod) ||
    isAllCaps(wordWithoutPeriod) ||
    isCapitalizedAlphanumeric(wordWithoutPeriod)
  );
};
