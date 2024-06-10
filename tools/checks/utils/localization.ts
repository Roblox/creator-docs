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
  if (isLocaleFile(filePath, specificLocale)) {
    return true;
  }
  const localeVersion = getLocaleVersionFilePath(filePath, specificLocale);
  return fs.existsSync(localeVersion);
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

export const checkMdxEquality = async (
  filePath: string,
  fileContent: string
) => {
  console.log('Checking MDX equality with English version');
  const englishVersion = getLocaleVersionFilePath(filePath, Locale.EN_US);
  if (fs.existsSync(englishVersion) === false) {
    console.log('English version does not exist');
    return;
  }
  const englishContent = fs.readFileSync(englishVersion, 'utf8');
  const localizedMdxComponents = await getMdxComponents(fileContent);
  const englishMdxComponents = await getMdxComponents(englishContent);

  // isVFileMessage should be true only if the mdx is not parseable
  if (isVFileMessage(localizedMdxComponents)) {
    const errorMessage = `${Emoji.NoEntry} Requirement (Error): the mdx is not parseable for ${filePath}: ${localizedMdxComponents.message}`;
    console.log(errorMessage);
    addToSummaryOfRequirements(errorMessage);
  }
  if (isVFileMessage(englishMdxComponents)) {
    const errorMessage = `${Emoji.NoEntry} Requirement (Error): The mdx in not parseable for ${englishVersion}: ${englishMdxComponents.message}`;
    console.log(errorMessage);
    addToSummaryOfRequirements(errorMessage);
  }

  if (
    isIComponentDetails(localizedMdxComponents) &&
    isIComponentDetails(englishMdxComponents)
  ) {
    console.log('Localized MDX components:', localizedMdxComponents);
    console.log('English MDX components:', englishMdxComponents);
    const comparisonMessage = `between ${filePath} (${localizedMdxComponents.count}) and ${englishVersion} (${englishMdxComponents.count})`;

    if (
      areEqualComponentDetails(localizedMdxComponents, englishMdxComponents)
    ) {
      console.log(`MDX components match ${comparisonMessage}`);
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
