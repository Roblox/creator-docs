import {
  ASSET_LINK_REGEX,
  PAGE_LINK_REGEX,
  LinkInfo,
  LinkType,
  getLinksOfTypeFromContentString,
  isAllowedWebsite,
  trimStartRelativeAssetPath,
} from './links.js';
import {
  ASSET_LINK_TEST_CASES,
  PAGE_LINK_TEST_CASES,
  SAMPLE_TEXT_MATCHES_COUNT,
  SAMPLE_TEXT_WITH_ASSET_LINK_MATCHES,
  SAMPLE_TEXT_NO_ASSET_LINK_MATCHES,
} from './linksTestCases.js';

describe('Test link regex', () => {
  test.each(PAGE_LINK_TEST_CASES)(
    'Page link regex matches groups',
    (testCase) => {
      const matches = [...testCase.text.matchAll(PAGE_LINK_REGEX)];
      expect(matches.toString()).toStrictEqual(testCase.matches.toString());
    }
  );
  test.each(ASSET_LINK_TEST_CASES)(
    'Asset link regex matches groups',
    (testCase) => {
      const matches = [...testCase.text.matchAll(ASSET_LINK_REGEX)];
      expect(matches.toString()).toStrictEqual(testCase.matches.toString());
    }
  );

  test('Asset reference regex should match example test cases', () => {
    const matches = SAMPLE_TEXT_WITH_ASSET_LINK_MATCHES.match(ASSET_LINK_REGEX);
    expect(matches?.length).toBe(SAMPLE_TEXT_MATCHES_COUNT);
  });

  test("Asset reference regex shouldn't match non-example test cases", () => {
    const matches = SAMPLE_TEXT_NO_ASSET_LINK_MATCHES.match(ASSET_LINK_REGEX);
    expect(matches?.length).toBe(undefined);
  });

  test('trimStartRelativeAssetPath tests', () => {
    expect(trimStartRelativeAssetPath('./assets/a/b/c')).toBe('assets/a/b/c');
    expect(trimStartRelativeAssetPath('/assets/a/b/c')).toBe('assets/a/b/c');
    expect(trimStartRelativeAssetPath('assets/a/b/c')).toBe('assets/a/b/c');
    expect(trimStartRelativeAssetPath('../assets/a/b/c')).toBe('assets/a/b/c');
    expect(trimStartRelativeAssetPath('../../assets/a/b/c')).toBe(
      'assets/a/b/c'
    );
    expect(trimStartRelativeAssetPath('../../../assets/a/b/c')).toBe(
      'assets/a/b/c'
    );
    expect(trimStartRelativeAssetPath('/asset/a/b/c')).toBe(null);
    expect(trimStartRelativeAssetPath('a/b/c')).toBe(null);
  });
});

describe('isRobloxUrl', () => {
  test.each([
    ['https://roblox.com', true],
    ['https://www.roblox.com', true],
    ['https://www.roblox.com/page', true],
    ['https://corp.roblox.com', true],
    ['https://corp.roblox.com/page', true],
    ['http://devforum.roblox.com', true],
    ['https://devforum.roblox.com/t/open-sourcing-creator-docs/2569346', true], // 🎉
    ['https://luau-lang.org', true],
    ['https://luau-lang.org/news/', true],
    ['https://www.lua.org', true],
    ['https://www.lua.org/pil/2.4.html', true],
    ['https://create.roblox.com/landing', true],
    ['https://create.roblox.com/dashboard/creations', true],
    ['https://create.roblox.com/talent', true],
    ['http://roblox', false],
    ['https://www.google.com', false],
    ['roblox.com', false], // Invalid URL format
    ['https://roblox.co', false],
    ['https://roblox.com.somewhereelse.com', false],
    ['https://ROBLOX.COM', true], // Case-insensitive test
    ['ftp://roblox.com', true], // Different scheme
    ['', false], // Empty string
  ])('should return %p for URL %p', (url, expected) => {
    expect(isAllowedWebsite(url)).toBe(expected);
  });
});

describe('getLinksOfTypeFromContentString', () => {
  const fileText = `---
title: Great Title
description: One sentence description of the page.
---

<img src="../../assets/real-cool-image.jpg" />

There's a lot of cool stuff on the [Marketplace](https://www.roblox.com/catalog). Update your [Avatar](https://www.roblox.com/my/avatar) and have fun!

Roblox also supports [classic clothing](#classic-clothing) and other great things. Check out this video:

<video src="../assets/real-cool-video.mp4" controls width="100%"></video>

and this <a href="https://create.roblox.com/docs/">link</a>!

Hope you have fun!

[link_developer_exchange]: https://create.roblox.com/dashboard/devex

`;
  test.each([
    // Test data: [Text Content, LinkType]
    [
      fileText,
      LinkType.Asset,
      [
        {
          ref: '../../assets/real-cool-image.jpg',
          lineNumber: 6,
        },
        {
          ref: '../assets/real-cool-video.mp4',
          lineNumber: 12,
        },
        {
          lineNumber: 18,
          ref: 'https://create.roblox.com/dashboard/devex',
        },
      ],
    ],
    [
      fileText,
      LinkType.Page,
      [
        {
          lineNumber: 8,
          ref: 'https://www.roblox.com/catalog',
        },
        {
          lineNumber: 8,
          ref: 'https://www.roblox.com/my/avatar',
        },
        {
          lineNumber: 10,
          ref: '#classic-clothing',
        },
        {
          lineNumber: 14,
          ref: 'https://create.roblox.com/docs/',
        },
        {
          lineNumber: 18,
          ref: 'https://create.roblox.com/dashboard/devex',
        },
      ],
    ],
  ])(
    'should find correct links and their line numbers',
    (text: string, linkType: LinkType, expectedResult: LinkInfo[]) => {
      const result = getLinksOfTypeFromContentString(text, linkType);
      expect(result).toEqual(expectedResult);
    }
  );
});
