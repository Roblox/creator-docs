import * as path from 'path';
import { readListFromFile, repositoryRoot } from './files.js';
import { Emoji } from './utils.js';
import { addToSummaryOfRequirements } from './console.js';
import { createNewPullRequestComment } from './github.js';
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
 * Checks if url starts with http
 * @param url url to check
 * @returns
 */
export const isHttpLink = (url: string): boolean => {
  return url.startsWith('http');
};

export const isRobloxUrl = (url: string): boolean => {
  try {
    // check the end of hostnames
    const urlHost = new URL(url).hostname.toLowerCase();
    const isRobloxLink =
      urlHost.endsWith('.roblox.com') ||
      urlHost === 'luau-lang.org' ||
      urlHost === 'roblox.com';
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
  if (isRobloxUrl(sanitizedUrl)) {
    return true;
  } else {
    return allowedHttpLinksSet.has(sanitizedUrl);
  }
};

export const allNonRobloxHttpLinks: string[] = [];

export const getNonRobloxLinks = (content: string) => {
  const httpLinks: LinkInfo[] = [];
  const assetLinks = getLinksOfTypeFromContentString(content, LinkType.Asset);
  const pageLinks = getLinksOfTypeFromContentString(content, LinkType.Page);
  assetLinks.forEach((link) => {
    if (link.ref && isHttpLink(link.ref) && !isRobloxUrl(link.ref)) {
      httpLinks.push(link);
    }
  });
  pageLinks.forEach((link) => {
    if (link.ref && isHttpLink(link.ref) && !isRobloxUrl(link.ref)) {
      httpLinks.push(link);
    }
  });
  return httpLinks;
};

export const checkHttpLinks = ({
  content,
  fileName,
  config,
}: {
  content: string;
  fileName: string;
  config: IConfig;
}) => {
  const httpLinks = getNonRobloxLinks(content);
  httpLinks.forEach((link) => {
    const urlNoHash = removeUrlHash(link.ref);
    if (config.debug) {
      allNonRobloxHttpLinks.push(urlNoHash);
    }
    if (!isAllowedHttpLink(urlNoHash)) {
      // Create messages
      const shortIntro = `${Emoji.NoEntry} In line ${link.lineNumber}, the `;
      const fullIntro = `${Emoji.NoEntry} In ${fileName}, line ${link.lineNumber}, the `;
      const allowedListFilePath =
        allowedHttpLinksTextFileFullPath.split(repositoryRoot)[1];
      const message = `link ${link.ref} isn't in the list of allowed HTTP links. Please explain why you are using it and add it to ${allowedListFilePath}.`;

      // Log messages
      console.log(shortIntro + message);
      addToSummaryOfRequirements(fullIntro + message);

      // Post messages
      if (config.postPullRequestComments) {
        const body = `${Emoji.NoEntry} The link ${
          link.ref
        } isn't in the list of allowed HTTP links. Please explain why you are using it and add it to [${allowedListFilePath}](https://github.com/Roblox/${
          config.repository
        }/blob/${config.baseBranch.replace(
          'origin/',
          ''
        )}/${allowedListFilePath}).`;
        createNewPullRequestComment({
          body,
          commit_id: config.commitHash,
          line: link.lineNumber,
          path: fileName,
          pull_number: config.pullRequestNumber,
          repository: config.repository,
        });
      }
    }
  });
};
