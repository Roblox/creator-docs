// Existing plugins
import dictionary from 'dictionary-en';
import { Plugin, unified } from 'unified';
import remarkFrontMatter from 'remark-frontmatter';
import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';
import remarkRetext from 'remark-retext';
import retextContractions from 'retext-contractions';
import retextEnglish from 'retext-english';
import retextEquality from 'retext-equality';
import retextIndefiniteArticle from 'retext-indefinite-article';
import retextPassive from 'retext-passive';
import retextProfanities from 'retext-profanities';
import retextQuotes from 'retext-quotes';
import retextReadability from 'retext-readability';
import retextRepeatedWords from 'retext-repeated-words';
import retextSimplify from 'retext-simplify';
import retextSpell from 'retext-spell';
import retextStringify from 'retext-stringify';
import retextSyntaxUrls from 'retext-syntax-urls';
// For creating new plugins
import { visit } from 'unist-util-visit';
import { VFileMessage } from 'vfile-message';

import {
  RETEXT_SPELL_ALLOW_LIST,
  INAPPROPRIATE_WORDS_LIST,
  RETEXT_EQUALITY_ALLOW_LIST,
  RETEXT_PASSIVE_ALLOW_LIST,
  ALLOWED_PROFANE_WORDS_LIST,
  RETEXT_SIMPLIFY_ALLOW_LIST,
  canIgnoreWordInSpellCheck,
} from './words.js';
import { VFile } from 'vfile';

export const MDAST_UTIL_MDX_JSX = 'mdast-util-mdx-jsx';
export const MICROMARK_EXTENSION_MDX_JSX = 'micromark-extension-mdx-jsx';
const RETEXT_CONTRACTIONS = 'retext-contractions';
export const RETEXT_INAPPROPRIATE = 'retext-inappropriate';
const RETEXT_INDEFINITE_ARTICLES = 'retext-indefinite-article';
export const RETEXT_PROFANITIES = 'retext-profanities';
const RETEXT_QUOTES = 'retext-quotes';
const RETEXT_REPEATED_WORDS = 'retext-repeated-words';
export const RETEXT_SPELL = 'retext-spell'; // optional

export const REQUIRED_CHECKS = new Set([
  MDAST_UTIL_MDX_JSX,
  MICROMARK_EXTENSION_MDX_JSX,
  RETEXT_CONTRACTIONS,
  RETEXT_INAPPROPRIATE,
  RETEXT_INDEFINITE_ARTICLES,
  RETEXT_PROFANITIES,
  RETEXT_QUOTES,
  RETEXT_REPEATED_WORDS,
]);

const WORD_NODE = 'WordNode';
const PUNCTUATION_NODE = 'PunctuationNode';
const WORD_PART_NODE_TYPES = ['TextNode', PUNCTUATION_NODE, 'SymbolNode'];
export const REPLACEMENTS: { [key: string]: string } = {
  '!': 'i',
  '@': 'a',
  $: 's',
  '0': 'o',
  '1': 'l',
  '3': 'e',
  '5': 's',
};

/**
 * Replaces specific patterns in a word that are commonly used to obfuscate
 * profanities. This function aims to transform words like "pa$$w0rd" to
 * "password" based on predefined replacement rules.
 *
 * @param word - The word that potentially contains obfuscated profanities.
 * @returns A string where common obfuscation patterns have been replaced with
 * their likely intended characters.
 */
export const replaceProfanityPatterns = (word: string): string => {
  let replaced = word.toLowerCase();
  for (const [original, replacement] of Object.entries(REPLACEMENTS)) {
    const regex = ['!', '@', '$'].includes(original)
      ? new RegExp(`\\${original}`, 'g')
      : new RegExp(original, 'g');
    replaced = replaced.replace(regex, replacement);
  }
  return replaced;
};

/**
 * Determines if a given punctuation character can be skipped or ignored.
 *
 * @param punctuation - The punctuation character to check.
 * @returns {boolean} - Returns `true` if the punctuation can be skipped,
 * otherwise `false`.
 *
 * This is useful in scenarios where certain punctuations don't impact the
 * word's meaning or identification as a profanity and can therefore be skipped
 * when processing the syntax tree.
 */
const canSkipPunctuation = (punctuation: string): boolean => {
  return ['.', ',', ';', ':', '!', '?'].includes(punctuation);
};

/**
 * Constructs a word by concatenating adjacent text, punctuation, and symbol
 * nodes. It moves both backward and forward from the current node to gather all
 * parts of the word.
 *
 * @param node - The current node for processing.
 * @param index - The index of the current node in its parent's children array.
 * @param parent - The parent node containing the current node.
 * @param processedIndices - A set that keeps track of the indices already
 * processed.
 * @returns The concatenated word from the current and adjacent nodes.
 */
const getWordFromCurrentNode = (
  node: any,
  index: number,
  parent: any,
  processedIndices: Set<number>
): string => {
  let word = node.value;
  let currentIndex = index;

  // Concatenate with adjacent nodes backward
  while (typeof currentIndex === 'number' && currentIndex > 0) {
    let prevNode = parent.children[currentIndex - 1];
    if (prevNode.type === WORD_NODE) {
      prevNode = prevNode.children[prevNode.children.length - 1];
      if (!prevNode) break;
    }

    if (WORD_PART_NODE_TYPES.includes(prevNode.type)) {
      word = prevNode.value + word;
      processedIndices.add(currentIndex - 1);
      currentIndex--;
    } else {
      break;
    }
  }

  // Concatenate with adjacent nodes forward
  currentIndex = index;
  while (
    typeof currentIndex === 'number' &&
    currentIndex < parent.children.length - 1
  ) {
    let nextNode = parent.children[currentIndex + 1];

    if (
      nextNode.type === PUNCTUATION_NODE &&
      canSkipPunctuation(nextNode.value)
    ) {
      processedIndices.add(currentIndex + 1);
      currentIndex++;
      continue;
    }

    if (nextNode.type === WORD_NODE) {
      nextNode = nextNode.children[0];
      if (!nextNode) break;
    }

    if (WORD_PART_NODE_TYPES.includes(nextNode.type)) {
      word += nextNode.value;
      processedIndices.add(currentIndex + 1);
      currentIndex++;
    } else {
      break;
    }
  }

  return word;
};

/**
 * Reports a word as inappropriate if it matches any pattern from the
 * `INAPPROPRIATE_WORDS_LIST` after replacing common profanity patterns.
 *
 * @param word - The word to check for inappropriateness.
 * @param node - The node from which the word originates.
 * @param file - The file being processed, where messages is attached.
 */
const reportInappropriateWord = (word: string, node: any, file: any) => {
  const replacedWord = replaceProfanityPatterns(word);
  if (INAPPROPRIATE_WORDS_LIST.includes(replacedWord)) {
    Object.assign(
      file.message(`Don't use \`${word}\` because it's inappropriate`, node),
      {
        source: RETEXT_INAPPROPRIATE,
        ruleId: replacedWord,
      }
    );
  }
};

/**
 * A retext plugin that checks the text nodes of a tree for inappropriate words.
 * Words are checked after applying common profanity pattern replacements.
 * Reports detected inappropriate words to the provided VFile.
 */
const retextInappropriate: Plugin = () => {
  return (tree: any, file: any) => {
    const processedIndices = new Set<number>();

    visit(tree, (node, index, parent) => {
      if (
        index !== undefined &&
        !processedIndices.has(index) &&
        WORD_PART_NODE_TYPES.includes(node.type)
      ) {
        const word = getWordFromCurrentNode(
          node,
          index,
          parent,
          processedIndices
        );
        reportInappropriateWord(word, node, file);
      }
    });
  };
};

const replaceRetextSpellMessageReason = (message: any) => {
  if (message.reason.includes('misspelt')) {
    message.reason =
      message.reason.split(' is misspelt')[0] +
      ` might be misspelled. Please double-check it.`;
  }
  return message;
};

/** Ignore errors:
 * Expected `'` to be used at this level of nesting, not `"`
 * Expected `""` to be used at this level of nesting, not `'`
 */
// Check if a given message is a nesting quotes issue
const isNestingQuotesIssue = (message: VFileMessage): boolean => {
  return (
    message.source === RETEXT_QUOTES &&
    message.reason.includes('this level of nesting')
  );
};

/**
Filter function that filters out stuff like this:
  - name: type
    type: UserCFrame
 */
export const filterRepeatedWords = (message: VFileMessage) => {
  if (message.source === RETEXT_REPEATED_WORDS) {
    const actualText = message.actual;
    if (actualText === 'type\ntype') {
      return false;
    }
  }
  return true;
};

// Filter function that filters out messages which are nesting quotes issues
const filterRetextQuotes = (message: VFileMessage) => {
  return !isNestingQuotesIssue(message);
};

// Filter function that filters out skippable words
export const filterRetextSpell = (message: VFileMessage) => {
  if (message.source === RETEXT_SPELL) {
    const word = message.actual;
    if (word && canIgnoreWordInSpellCheck(word)) {
      return false;
    }
    return true;
  }
  return true;
};

/** Compiles MDX using remarkMdx and returns error if compilation fails
 * Only used for linting
 */
export const compileMdx = async (text: string) => {
  try {
    const file = await unified()
      .use(remarkParse)
      .use(remarkMdx)
      .use(retextStringify)
      .process(text);
    return;
  } catch (e) {
    if (e?.constructor.name === 'VFileMessage') {
      const error = e as VFileMessage;
      return error;
    }
  }
};

/**
 * Analyzes a given text using various ReText plugins to detect and report
 * linguistic issues like profanities, passive voice, readability, and more The
 * function uses a priority-based list of plugins, with the most important
 * plugins listed first.
 *
 * @param text - The input text to be analyzed.
 * @returns A `unified` processor file object containing the results of the
 * analysis, including detected issues, messages, and positions.
 */
export const getReTextAnalysis = async (text: string) => {
  const file = await unified()
    .use(remarkParse)
    .use(remarkFrontMatter)
    .use(
      remarkRetext,
      unified()
        .use(retextEnglish)
        // List plugins by order of priority, with higher on top
        .use(retextInappropriate)
        .use(retextProfanities, {
          sureness: 2,
          ignore: ALLOWED_PROFANE_WORDS_LIST,
        })
        .use(retextRepeatedWords)
        .use(retextQuotes, { preferred: 'straight' })
        .use(retextContractions, { straight: true })
        .use(retextIndefiniteArticle)
        .use(retextEquality, { ignore: RETEXT_EQUALITY_ALLOW_LIST })
        .use(retextPassive, { ignore: RETEXT_PASSIVE_ALLOW_LIST })
        .use(retextSyntaxUrls)
        .use(retextReadability, { threshold: 6 / 7 })
        .use(retextSpell, {
          dictionary,
          ignore: RETEXT_SPELL_ALLOW_LIST,
          max: 0,
        })
      // .use(retextSimplify, { ignore: RETEXT_SIMPLIFY_ALLOWED_WORDS }) // TODO: enable this
    )
    .use(retextStringify)
    .process(text);

  file.messages = file.messages
    .map(replaceRetextSpellMessageReason)
    .filter(filterRetextQuotes)
    .filter(filterRetextSpell)
    .filter(filterRepeatedWords);
  return file;
};
