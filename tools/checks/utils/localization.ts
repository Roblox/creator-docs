import * as fs from 'fs';
import { addToSummaryOfRequirements } from './console.js';
import { Emoji } from './utils.js';
import {
  areEqualComponentDetails,
  getMdxComponents,
  isIComponentDetails,
  isVFileMessage,
} from './unified.js';
import { getNonEditableFilesList } from './files.js';
import { areEqualFileImports, FileImports, getFileImports } from './imports.js';

export enum Locale {
  DE_DE = 'de-de',
  EN_US = 'en-us',
  ES_ES = 'es-es',
  FR_FR = 'fr-fr',
  JA_JP = 'ja-jp',
  KO_KR = 'ko-kr',
  PT_BR = 'pt-br',
  RU_RU = 'ru-ru',
  ZH_CN = 'zh-cn',
  ZH_TW = 'zh-tw',
}

const LOCALE_REGEX = /\/([a-z]{2}-[a-z]{2})\//;

const filePathExistsMap = new Map<string, boolean>();
const filePathToRawContentMap = new Map<string, string>();
const filePathToMdxComponentsMap = new Map<string, unknown>();
const filePathToImportsMap = new Map<string, FileImports>();

export const getLocaleFromFilePath = (filePath: string): string | null => {
  const match = filePath.match(LOCALE_REGEX);
  return match ? match[1] : null;
};

// Function to check if the filePath matches a specific locale
export const isLocaleFile = (filePath: string, specificLocale: Locale) => {
  const extractedLocale = getLocaleFromFilePath(filePath);
  return extractedLocale === specificLocale;
};

export const getLocaleVersionFilePath = (
  filePath: string,
  specificLocale: Locale
) => {
  return filePath.replace(LOCALE_REGEX, `/${specificLocale}/`);
};

const doesLocaleVersionExist = (filePath: string, specificLocale: Locale) => {
  // True for itself
  if (isLocaleFile(filePath, specificLocale)) {
    return true;
  }
  const localeVersion = getLocaleVersionFilePath(filePath, specificLocale);
  if (!filePathExistsMap.has(localeVersion)) {
    filePathExistsMap.set(localeVersion, fs.existsSync(localeVersion));
  }
  const fileExists = filePathExistsMap.get(localeVersion) as boolean;

  if (fileExists) {
    return true;
  } else {
    console.log(
      `${Emoji.NoEntry} ${specificLocale} version does not exist for ${filePath}`
    );
    return false;
  }
};

export const checkEnglishVersionExists = (filePath: string) => {
  if (!doesLocaleVersionExist(filePath, Locale.EN_US)) {
    console.log(
      `${Emoji.NoEntry} English version does not exist for ${filePath}`
    );
    addToSummaryOfRequirements(
      `${Emoji.NoEntry} Requirement: English version does not exist for ${filePath}`
    );
  }
};

const getCachedContentForFilePath = (filePath: string): string => {
  if (!filePathToRawContentMap.has(filePath)) {
    filePathToRawContentMap.set(filePath, fs.readFileSync(filePath, 'utf8'));
  }
  const content = filePathToRawContentMap.get(filePath) as string;
  return content;
};

export const checkFileImportEquality = (
  filePath: string,
  fileContent: string
) => {
  const enUsFilePath = getLocaleVersionFilePath(filePath, Locale.EN_US);
  if (!doesLocaleVersionExist(filePath, Locale.EN_US)) {
    return;
  }

  if (!filePathToImportsMap.has(enUsFilePath)) {
    const englishContent = getCachedContentForFilePath(enUsFilePath);
    // Cache English imports because it will be used multiple times
    filePathToImportsMap.set(enUsFilePath, getFileImports(englishContent));
  }
  const englishImports = filePathToImportsMap.get(enUsFilePath) as FileImports;
  // Localized imports are not cached because they are only used once
  const localizedImports = getFileImports(fileContent);

  if (!areEqualFileImports(englishImports, localizedImports)) {
    console.log(
      `${Emoji.NoEntry} MDX imports do not match between ${filePath} and ${enUsFilePath}`
    );
    addToSummaryOfRequirements(
      `${Emoji.NoEntry} Requirement: MDX imports do not match between ${filePath} and ${enUsFilePath}`
    );
  }
};

export const checkMdxEquality = async (
  filePath: string,
  fileContent: string
) => {
  console.log('Checking MDX equality with English version');
  const enUsFilePath = getLocaleVersionFilePath(filePath, Locale.EN_US);
  if (!doesLocaleVersionExist(filePath, Locale.EN_US)) {
    return;
  }

  if (!filePathToMdxComponentsMap.has(enUsFilePath)) {
    const englishContent = getCachedContentForFilePath(enUsFilePath);
    filePathToMdxComponentsMap.set(
      enUsFilePath,
      await getMdxComponents(englishContent)
    );
  }

  const englishMdxComponents = filePathToMdxComponentsMap.get(enUsFilePath);

  const localizedMdxComponents = await getMdxComponents(fileContent);

  // isVFileMessage should be true only if the mdx is not parseable
  if (isVFileMessage(localizedMdxComponents)) {
    const errorMessage = `${Emoji.NoEntry} Requirement (Error): the mdx is not parseable for ${filePath}: ${localizedMdxComponents.message}`;
    console.log(errorMessage);
    addToSummaryOfRequirements(errorMessage);
  }
  if (isVFileMessage(englishMdxComponents)) {
    const errorMessage = `${Emoji.NoEntry} Requirement (Error): The mdx in not parseable for ${enUsFilePath}: ${englishMdxComponents.message}`;
    console.log(errorMessage);
    addToSummaryOfRequirements(errorMessage);
  }

  if (
    isIComponentDetails(localizedMdxComponents) &&
    isIComponentDetails(englishMdxComponents)
  ) {
    console.log('Localized MDX components:', localizedMdxComponents);
    console.log('English MDX components:', englishMdxComponents);
    const comparisonMessage = `between ${filePath} (${localizedMdxComponents.count}) and ${enUsFilePath} (${englishMdxComponents.count})`;

    if (
      areEqualComponentDetails(localizedMdxComponents, englishMdxComponents)
    ) {
      console.log(
        `${Emoji.WhiteCheckMark} MDX components match ${comparisonMessage}`
      );
    } else {
      const errorMessage = `${Emoji.NoEntry} MDX components do not match ${comparisonMessage}`;
      console.log(errorMessage);
      addToSummaryOfRequirements(errorMessage);
    }
  }
};

export const checkFileIsTranslatable = (filePath: string) => {
  const nonEditableFilesList = getNonEditableFilesList();
  const englishVersion = getLocaleVersionFilePath(filePath, Locale.EN_US);
  if (nonEditableFilesList.includes(englishVersion)) {
    const message = `${Emoji.NoEntry} File should not be translated because its English version is on the "Do not edit" list: ${filePath}`;
    console.log(message);
    addToSummaryOfRequirements(message);
  }
};
