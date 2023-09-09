export enum Emoji {
  AlarmClock = '⏰',
  Bulb = '💡',
  EnvelopeWithArrow = '📩',
  HammerAndWrench = '🛠️',
  Label = '🏷️',
  NoEntry = '⛔️',
  Mag = '🔍',
  Mailbox = '📫',
  OpenFileFolder = '📂',
  WhiteCheckMark = '✅',
}

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

export type Tuple = Array<string | number>;

/**
 * Serialize a tuple into a string to use as a key in a Map
 * @param tuple - elements of string or numbers
 * @returns string
 */
export const serializeTuple = (...tuple: Tuple): string => {
  return tuple.join(',');
};

/**
 * Deduplicates a list by removing repeated items.
 * @param list - An array of items to deduplicate.
 * @returns A new array containing unique items from the given list.
 */
export const deduplicate = <T>(list: T[]): T[] => [...new Set(list)];
