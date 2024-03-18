import * as fs from 'fs';
import * as path from 'path';
import globPkg from 'glob';
const { glob } = globPkg;
import {
  FileExtension,
  getAllContentFileNamesWithExtension,
  readFileSync,
  readListFromFile,
  repositoryRoot,
} from './files.js';
import { Emoji, Locale } from './utils.js';
import { addToSummaryOfRequirements } from './console.js';
import { createNewPullRequestComment, requiredCheckMessage } from './github.js';
import { IConfig } from './config.js';
// Double escape the regular expressions to combine them

/** Page Links */
// href="link.page"
// href\s*=\s*["'](.*?)["']
const HREF_ESCAPED_REGEX = `href\\s*=\\s*["'](.*?)["']`;
// [text](link)
// (?<!!)\[.*?\]\((.*?)\)
const URL_SHORTCUT_ESCAPED_REGEX = `(?<!!)\\[.*?\\]\\((.*?)\\)`;

// For both Page links and Asset links
// [ref]: ../../path/to/file.png
// (?<!\S)\[(?:[A-Za-z0-9-_]*)\]:\s*(.*?)\n
const REF_ESCAPED_REGEX = `(?<!\\S)\\[(?:[A-Za-z0-9-_]*)\\]:\\s*(.*?)\\n`;

// https://regex101.com/r/tX9xy1
// href\s*=\s*["'](.*?)["']|(?<!!)\[.*?\]\((.*?)\)|(?<!\S)\[(?:[A-Za-z0-9-_]*)\]:\s*(.*?)\n
const PAGE_LINKS_ESCAPED_REGEX = `${HREF_ESCAPED_REGEX}|${URL_SHORTCUT_ESCAPED_REGEX}|${REF_ESCAPED_REGEX}`;

/** Assets Links */
// src="path/to/file.png"
// src\s*=\s*["'](.*?)["']
const SRC_ESCAPED_REGEX = `src\\s*=\\s*["'](.*?)["']`;
// ![alt](path/to/file.png)
// !\[.*?\]\((.*?)\)
const ASSET_SHORTCUT_ESCAPED_REGEX = `!\\[.*?\\]\\((.*?)\\)`;

// https://regex101.com/r/WoJi2v
// src\s*=\s*["'](.*?)["']|!\[.*?\]\((.*?)\)|(?<!\S)\[(?:[A-Za-z0-9-_]*)\]:\s*(.*?)\n
const ASSETS_ESCAPED_REGEX = `${SRC_ESCAPED_REGEX}|${ASSET_SHORTCUT_ESCAPED_REGEX}|${REF_ESCAPED_REGEX}`;

export const PAGE_LINK_REGEX = new RegExp(PAGE_LINKS_ESCAPED_REGEX, 'gim');
export const ASSET_LINK_REGEX = new RegExp(ASSETS_ESCAPED_REGEX, 'gim');

export const ASSET_FOLDER_REGEX =
  /([\.\.\/]+assets[\/A-Za-z0-9-]*\/[\.A-Za-z0-9-_()]+)/;
export const ANCHOR_LINK_REGEX = /(#.*)$/;
/** End of RegEx */

export const allowedHttpLinksTextFileFullPath = path.join(
  repositoryRoot,
  'tools',
  'checks',
  'utils',
  'allowedHttpLinks.txt'
);
const allowedHttpLinksList = readListFromFile(
  allowedHttpLinksTextFileFullPath
) as string[];

export const allowedHttpLinksSet: Set<string> = new Set(allowedHttpLinksList);

export const enum LinkType {
  Asset = 1,
  Page = 2,
}

/**
 * Trim the starting '../..' from assetsPath
 * @param assetsPath
 * @returns trimmed assetsPath
 */
export const trimStartRelativeAssetPath = (assetsPath: string) => {
  const assetsPathMatch = assetsPath.match(
    /^(?:(?:\.\.\/)+|\.?\/?)(assets\/.*)/i
  );
  if (assetsPathMatch) {
    return assetsPathMatch[1];
  }
  return null;
};

export interface LinkInfo {
  lineNumber: number;
  ref: string;
}

/**
 * Find all links from a content string
 *
 * @param fileName - The name of the file being processed
 * @param text - Content string, typically Markdown
 * @param linkType - The type of link to look for (Asset or Page)
 *
 * @returns An array of objects containing the link and its line number
 */
export const getLinksOfTypeFromContentString = (
  text: string,
  linkType: LinkType
): LinkInfo[] => {
  // Initialize an array to store the starting index of each line
  // Line 1 starts at index 0
  const newLineIndexes: number[] = [0];
  let lineNumber = 1;

  // Loop through the text to find each newline character
  // When you find a newline, store the starting index of the next line
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '\n') {
      newLineIndexes[lineNumber] = i + 1;
      lineNumber++;
    }
  }

  const regex =
    linkType === LinkType.Asset ? ASSET_LINK_REGEX : PAGE_LINK_REGEX;
  const matches = Array.from(text.matchAll(regex));

  // Map through each match to create an array of LinkInfo objects
  // For each match, find its line number and populate the object accordingly
  const links: LinkInfo[] = matches.map((match) => {
    // -1 represents "not found"
    const index = match.index ?? -1;
    let lineNumber = -1;
    if (index !== -1) {
      // Find the line number where the index of the match exists
      lineNumber = newLineIndexes.findIndex((startIdx) => startIdx > index);
    }
    return {
      ref: match[1] || match[2] || match[3],
      lineNumber,
    };
  });

  return links;
};

/**
 * Checks if link starts with http
 * @param link link to check
 * @returns
 */
export const isHttpLink = (link: string): boolean => {
  return link.startsWith('http');
};

export const isRelativeLink = (link: string): boolean => {
  return link.startsWith('./') || link.startsWith('../');
};

export const isAllowedWebsite = (url: string): boolean => {
  try {
    // check the end of hostnames
    const urlHost = new URL(url).hostname.toLowerCase();
    const isRobloxLink =
      urlHost.endsWith('.roblox.com') ||
      urlHost === 'roblox.com' ||
      urlHost === 'luau-lang.org' ||
      urlHost === 'www.lua.org';
    return isRobloxLink;
  } catch {
    return false;
  }
};

/**
 * Utility function to remove hash from a URL
 * @param url
 * @returns
 */
const removeUrlHash = (url: string): string => {
  try {
    const parsedUrl = new URL(url);
    parsedUrl.hash = ''; // Remove the hash part
    return parsedUrl.toString();
  } catch (error) {
    // If it's not a valid URL, return the original string
    return url;
  }
};

export const isAllowedHttpLink = (link: string) => {
  const sanitizedUrl = removeUrlHash(link);
  if (isAllowedWebsite(sanitizedUrl)) {
    return true;
  } else {
    let isAllowedHttpLink = allowedHttpLinksSet.has(sanitizedUrl);
    if (!isAllowedHttpLink) {
      // Test if pathname includes `(` to support some links that end with `)`
      if (sanitizedUrl.includes(`(`)) {
        isAllowedHttpLink = allowedHttpLinksSet.has(sanitizedUrl + `)`);
      }
    }
    return isAllowedHttpLink;
  }
};

export const allNonRobloxHttpLinks: string[] = [];

export const getNonRobloxLinks = (content: string) => {
  const httpLinks: LinkInfo[] = [];
  const relativeLinks: LinkInfo[] = [];
  const assetLinks = getLinksOfTypeFromContentString(content, LinkType.Asset);
  const pageLinks = getLinksOfTypeFromContentString(content, LinkType.Page);
  assetLinks.forEach((link) => {
    if (link.ref && isHttpLink(link.ref) && !isAllowedWebsite(link.ref)) {
      httpLinks.push(link);
    }
    if (link.ref && isRelativeLink(link.ref)) {
      relativeLinks.push(link);
    }
  });
  pageLinks.forEach((link) => {
    if (link.ref && isHttpLink(link.ref) && !isAllowedWebsite(link.ref)) {
      httpLinks.push(link);
    }
    if (link.ref && isRelativeLink(link.ref)) {
      relativeLinks.push(link);
    }
  });
  return { httpLinks, relativeLinks };
};

const processHttpLink = ({
  filePath,
  config,
  link,
}: {
  config: IConfig;
  filePath: string;
  link: LinkInfo;
}) => {
  const urlNoHash = removeUrlHash(link.ref);
  if (config.debug) {
    allNonRobloxHttpLinks.push(urlNoHash);
  }
  // Don't need do anything else if the link is allowed
  if (isAllowedHttpLink(urlNoHash)) {
    return;
  }

  // Create messages
  const shortIntro = `${Emoji.NoEntry} Requirement: In line ${link.lineNumber}, the `;
  const fullIntro = `${Emoji.NoEntry} Requirement: In ${filePath}, line ${link.lineNumber}, the `;
  const allowedListFilePath =
    allowedHttpLinksTextFileFullPath.split(repositoryRoot)[1];
  const message = `page ${urlNoHash} isn't in the list of allowed HTTP links. Please explain why you are using it and add it to ${allowedListFilePath}.`;

  // Log messages
  console.log(shortIntro + message);
  addToSummaryOfRequirements(fullIntro + message);

  // Post messages
  if (config.postPullRequestComments) {
    const body = `The page ${urlNoHash} isn't in the list of allowed HTTP links. Please explain why you are using it and add it to [${allowedListFilePath}](https://github.com/Roblox/${
      config.repository
    }/blob/${config.baseBranch.replace('origin/', '')}/${allowedListFilePath}).
    
${requiredCheckMessage}`;
    createNewPullRequestComment({
      body,
      commit_id: config.commitHash,
      line: link.lineNumber,
      path: filePath,
      pull_number: config.pullRequestNumber,
      repository: config.repository,
    });
  }
};

const closedSourceDirectories = ['content/en-us/reference/cloud/'];

const closedSourceFiles = [
  'content/en-us/index/index.md',
  'content/en-us/production/promotion/advertising-on-roblox.md',
  'content/en-us/production/promotion/complying-with-advertising-standards.md',
  'content/en-us/production/promotion/discovery.md',
  'content/en-us/production/promotion/sponsoring-items.md',
  'content/en-us/samples/index.md',
];

const closedSourceFilesSet = new Set(closedSourceFiles);

const processRelativeLink = ({
  filePath,
  config,
  link,
}: {
  config: IConfig;
  filePath: string;
  link: LinkInfo;
}) => {
  // Remove ../../path/to/page.md#section-1
  const urlNoHash = link.ref.split('#')[0];
  const fileDir = path.dirname(filePath);
  const newFilePathFromRoot = path.join(fileDir, urlNoHash);
  const newFilePathFull = path.join(repositoryRoot, fileDir, urlNoHash);
  const doesFileExist = fs.existsSync(newFilePathFull);
  let isClosedSourceFile = false;
  if (!doesFileExist) {
    isClosedSourceFile = closedSourceFilesSet.has(newFilePathFromRoot);
    closedSourceDirectories.forEach((dir) => {
      if (newFilePathFromRoot.startsWith(dir)) {
        isClosedSourceFile = true;
      }
    });
  }
  // Don't need to do anything else if the file exists or is closed source
  if (doesFileExist || isClosedSourceFile) {
    return;
  }

  // Create messages
  const shortIntro = `${Emoji.NoEntry} Requirement: In line ${link.lineNumber}, the `;
  const fullIntro = `${Emoji.NoEntry} Requirement: In ${filePath}, line ${link.lineNumber}, the `;
  const message = `check for relative links couldn't find the file \`${urlNoHash}\`. Please double-check and fix the link to this file. Relative links are case-sensitive.`;

  // Log messages
  console.log(shortIntro + message);
  addToSummaryOfRequirements(fullIntro + message);

  // Post messages
  if (config.postPullRequestComments) {
    const body = `The ${message}
    
${requiredCheckMessage}`;
    createNewPullRequestComment({
      body,
      commit_id: config.commitHash,
      line: link.lineNumber,
      path: filePath,
      pull_number: config.pullRequestNumber,
      repository: config.repository,
    });
  }
};

export const checkContentLinks = ({
  fileContent,
  filePath,
  config,
}: {
  fileContent: string;
  filePath: string;
  config: IConfig;
}) => {
  const { httpLinks, relativeLinks } = getNonRobloxLinks(fileContent);
  if (config.checkHttpLinks) {
    httpLinks.forEach((link) => {
      processHttpLink({ config, filePath, link });
    });
  }
  if (config.checkRelativeLinks) {
    relativeLinks.forEach((link) => {
      processRelativeLink({ config, filePath, link });
    });
  }
};

export const checkUnusedAssets = ({ config }: { config: IConfig }) => {
  console.log(`${Emoji.Mag} Checking for unused assets...`);
  // Get all files to check
  const allFiles = [
    ...getAllContentFileNamesWithExtension({
      locale: Locale.EN_US,
      fileExtension: FileExtension.MARKDOWN,
    }),
    ...getAllContentFileNamesWithExtension({
      locale: Locale.EN_US,
      fileExtension: FileExtension.YAML,
    }),
  ];

  // Get all asset links from content files
  const allAssetLinksFullPath: string[] = [];
  for (const filePath of allFiles) {
    const fileContent = readFileSync(filePath);
    const { relativeLinks } = getNonRobloxLinks(fileContent);

    const fullPathAssetLinks = relativeLinks.map((link) => {
      const fileDir = path.dirname(filePath);
      const fullPath = path.join(fileDir, link.ref);
      return fullPath;
    });
    allAssetLinksFullPath.push(...fullPathAssetLinks);
  }
  const allAssetLinksSet = new Set(allAssetLinksFullPath);

  // Get all asset paths from file system
  const assetsFolder = path.join(repositoryRoot, 'content/en-us/assets/');
  const filesInAssetsFolder = glob.sync(`${assetsFolder}**/*`, { nodir: true });
  // Asset names are unique, so you don't need a set

  // Compare the list of assets with set of links
  // Don't do anything if they're the same size
  if (filesInAssetsFolder.length === allAssetLinksSet.size) {
    console.log(`${Emoji.WhiteCheckMark} All assets are used`);
    return;
  }

  const unusedAssets = filesInAssetsFolder.filter((filePath) => {
    const isAssetUsed = allAssetLinksSet.has(filePath);
    if (!isAssetUsed) {
      console.log(`${Emoji.Link} Unused asset: ${filePath}`);
      // Return true to keep it after the filter
      return true;
    }
    if (config.debug) {
      console.log(`${Emoji.WhiteCheckMark} Used asset: ${filePath}`);
    }
    return false;
  });
  console.log(`${Emoji.Bulb} Total unused assets: ${unusedAssets.length}`);

  if (config.deleteUnusedAssets) {
    unusedAssets.forEach((filePath) => {
      console.log(
        `${Emoji.WasteBasket}  Deleting ${filePath.split(repositoryRoot)[1]}`
      );
      fs.unlinkSync(filePath);
    });
  }
};