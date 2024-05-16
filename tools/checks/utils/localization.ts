import * as fs from 'fs';
import { addToSummaryOfRequirements } from './console.js';
import { Emoji } from './utils.js';

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

const LOCALE_REGEX = /content\/[a-z]{2}-[a-z]{2}\//;
const CONTENT_EN_US = 'content/en-us/';

const doesEnglishVersionExist = (filePath: string) => {
  if (filePath.startsWith(CONTENT_EN_US)) {
    return true;
  }
  const englishVersion = filePath.replace(LOCALE_REGEX, CONTENT_EN_US);
  return fs.existsSync(englishVersion);
};

export const checkEnglishVersionExists = (filePath: string) => {
  if (!doesEnglishVersionExist(filePath)) {
    console.log(
      `${Emoji.NoEntry} English version does not exist for ${filePath}`
    );
    addToSummaryOfRequirements(
      `${Emoji.NoEntry} Requirement: English version does not exist for ${filePath}`
    );
  }
};
