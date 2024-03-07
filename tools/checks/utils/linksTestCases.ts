type LinkTestCaseType = {
  text: string;
  matches: (string | undefined)[][];
};

export const PAGE_LINK_TEST_CASES: LinkTestCaseType[] = [
  // standard <a href ="" /> tests

  {
    text: `<a href = "link">display text </a>`,
    matches: [[`href = "link"`, `link`, undefined, undefined]],
  },
  {
    text: `<a href="link">display text </a>`,
    matches: [[`href="link"`, `link`, undefined, undefined]],
  },
  {
    text: `<a href ="link">display text </a>`,
    matches: [[`href ="link"`, `link`, undefined, undefined]],
  },
  {
    text: `<a href= "link">display text </a>`,
    matches: [[`href= "link"`, `link`, undefined, undefined]],
  },
  {
    text: `<a href     =     "link">display text </a>`,
    matches: [[`href     =     "link"`, `link`, undefined, undefined]],
  },
  {
    text: `<a href = 'link'>display text </a>`,
    matches: [[`href = 'link'`, `link`, undefined, undefined]],
  },
  {
    text: `<a href='link'>display text </a>`,
    matches: [[`href='link'`, `link`, undefined, undefined]],
  },
  {
    text: `<a href ='link'>display text </a>`,
    matches: [[`href ='link'`, `link`, undefined, undefined]],
  },
  {
    text: `<a href= 'link'>display text </a>`,
    matches: [[`href= 'link'`, `link`, undefined, undefined]],
  },
  {
    text: `<a href     =     'link'>display text </a>`,
    matches: [[`href     =     'link'`, `link`, undefined, undefined]],
  },
  {
    text: `This is a [test link](link) in a sentence.`,
    matches: [[`[test link](link)`, undefined, `link`, undefined]],
  },
  {
    text: `This is a [test link](https://example.com) in a sentence.`,
    matches: [
      [
        `[test link](https://example.com)`,
        undefined,
        `https://example.com`,
        undefined,
      ],
    ],
  },
  {
    text: `This is a [test link](../example.md) in a sentence.`,
    matches: [
      [`[test link](../example.md)`, undefined, `../example.md`, undefined],
    ],
  },
  {
    text: `This is a [test][link] in a sentence.
  
      [link]: https://example.com
      `,
    matches: [
      [
        `[link]: https://example.com
`,
        undefined,
        undefined,
        `https://example.com`,
      ],
    ],
  },
  {
    text: `This is an ![alt](image), which shouldn't match.`,
    matches: [],
  },
];

export const ASSET_LINK_TEST_CASES: LinkTestCaseType[] = [
  // standard <img src="" /> tests
  {
    text: `<img src="../../assets/path/to/file.png" />`,
    matches: [
      [
        `src="../../assets/path/to/file.png"`,
        `../../assets/path/to/file.png`,
        undefined,
        undefined,
      ],
    ],
  },
  {
    text: `<img  src ="../../assets/path/to/file.png" />`,
    matches: [
      [
        `src ="../../assets/path/to/file.png"`,
        '../../assets/path/to/file.png',
        undefined,
        undefined,
      ],
    ],
  },
  {
    text: `<img src= "../../assets/path/to/file.png"/>`,
    matches: [
      [
        `src= "../../assets/path/to/file.png"`,
        `../../assets/path/to/file.png`,
        undefined,
        undefined,
      ],
    ],
  },
  {
    text: `<img src= "../../assets/path/to/file.png" />`,
    matches: [
      [
        `src= "../../assets/path/to/file.png"`,
        `../../assets/path/to/file.png`,
        undefined,
        undefined,
      ],
    ],
  },
  {
    text: `<img src  =   "../../assets/path/to/file.jpg" />`,
    matches: [
      [
        `src  =   "../../assets/path/to/file.jpg"`,
        `../../assets/path/to/file.jpg`,
        undefined,
        undefined,
      ],
    ],
  },
  {
    text: `<img src="bad-link" />`,
    matches: [[`src="bad-link"`, `bad-link`, undefined, undefined]],
  },
  {
    text: `<img src="misspelled-assett/path/to/file-name.png"/>`,
    matches: [
      [
        `src="misspelled-assett/path/to/file-name.png"`,
        `misspelled-assett/path/to/file-name.png`,
        undefined,
        undefined,
      ],
    ],
  },
  {
    text: `<img src="/asset/subfolder-path/to/file.png" />`,
    matches: [
      [
        `src="/asset/subfolder-path/to/file.png"`,
        `/asset/subfolder-path/to/file.png`,
        undefined,
        undefined,
      ],
    ],
  },
  {
    text: `<img src="https://example.com/img.png" />`,
    matches: [
      [
        `src="https://example.com/img.png"`,
        `https://example.com/img.png`,
        undefined,
        undefined,
      ],
    ],
  },
  {
    text: `<video src="/assets/path/to/file.mp4" />`,
    matches: [
      [
        `src="/assets/path/to/file.mp4"`,
        `/assets/path/to/file.mp4`,
        undefined,
        undefined,
      ],
    ],
  },
  // single quote src='' tests
  {
    text: `<img src='../../assets/path/to/file.png' />`,
    matches: [
      [
        `src='../../assets/path/to/file.png'`,
        `../../assets/path/to/file.png`,
        undefined,
        undefined,
      ],
    ],
  },
  {
    text: `<img  src ='../../assets/path/to/file.png' />`,
    matches: [
      [
        `src ='../../assets/path/to/file.png'`,
        '../../assets/path/to/file.png',
        undefined,
        undefined,
      ],
    ],
  },
  {
    text: `<img src= '../../assets/path/to/file.png'/>`,
    matches: [
      [
        `src= '../../assets/path/to/file.png'`,
        `../../assets/path/to/file.png`,
        undefined,
        undefined,
      ],
    ],
  },
  {
    text: `<img src= '../../assets/path/to/file.png' />`,
    matches: [
      [
        `src= '../../assets/path/to/file.png'`,
        `../../assets/path/to/file.png`,
        undefined,
        undefined,
      ],
    ],
  },
  {
    text: `<img src  =   '../../assets/path/to/file.jpg' />`,
    matches: [
      [
        `src  =   '../../assets/path/to/file.jpg'`,
        `../../assets/path/to/file.jpg`,
        undefined,
        undefined,
      ],
    ],
  },
  {
    text: `<img src='bad-link' />`,
    matches: [[`src='bad-link'`, `bad-link`, undefined, undefined]],
  },
  {
    text: `<img src='misspelled-assett/path/to/file-name.png'/>`,
    matches: [
      [
        `src='misspelled-assett/path/to/file-name.png'`,
        `misspelled-assett/path/to/file-name.png`,
        undefined,
        undefined,
      ],
    ],
  },
  {
    text: `<img src="/asset/subfolder-path/to/file.png" />`,
    matches: [
      [
        `src="/asset/subfolder-path/to/file.png"`,
        `/asset/subfolder-path/to/file.png`,
        undefined,
        undefined,
      ],
    ],
  },
  {
    text: `<img src='https://example.com/img.png' />`,
    matches: [
      [
        `src='https://example.com/img.png'`,
        `https://example.com/img.png`,
        undefined,
        undefined,
      ],
    ],
  },
  {
    text: `<video src='/assets/path/to/file.mp4' />`,
    matches: [
      [
        `src='/assets/path/to/file.mp4'`,
        `/assets/path/to/file.mp4`,
        undefined,
        undefined,
      ],
    ],
  },
  // Specific components
  {
    text: `<HomePageNewsCard
        href="../animation/capture.md"
        imageSrc='../assets/landing/home/articleBanner_building_visuals.png'
        imageLabel='Animation'
        description='Use your camera to automatically generate high-quality face and
        body animations.'
        title='Animation Capture'
      />`,
    matches: [
      [
        `Src='../assets/landing/home/articleBanner_building_visuals.png'`,
        `../assets/landing/home/articleBanner_building_visuals.png`,
        undefined,
        undefined,
      ],
    ],
  },
  // Embedded YouTube videos
  {
    text: `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/F6LVFSyytac?si=JPE6z1qAUVtCxNaO&amp;start=189" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>    `,
    matches: [
      [
        `src="https://www.youtube-nocookie.com/embed/F6LVFSyytac?si=JPE6z1qAUVtCxNaO&amp;start=189"`,
        `https://www.youtube-nocookie.com/embed/F6LVFSyytac?si=JPE6z1qAUVtCxNaO&amp;start=189`,
        undefined,
        undefined,
      ],
    ],
  },
  // TwoUp images
  {
    text: `<TwoUpImage firstSrc="/path/to/file1.png" secondSrc="/path/to/file2.png" />`,
    matches: [
      [`Src="/path/to/file1.png"`, `/path/to/file1.png`, undefined, undefined],
      [`Src="/path/to/file2.png"`, `/path/to/file2.png`, undefined, undefined],
    ],
  },
  {
    text: `<TwoUpImage 
      firstSrc="/path/to/file1.png" 
      secondSrc="/path/to/file2.png" />`,
    matches: [
      [`Src="/path/to/file1.png"`, `/path/to/file1.png`, undefined, undefined],
      [`Src="/path/to/file2.png"`, `/path/to/file2.png`, undefined, undefined],
    ],
  },
  // Markdown image shortcut
  {
    text: `![image](../../asset/path/to/file.jpg)`,
    matches: [
      [
        `![image](../../asset/path/to/file.jpg)`,
        undefined,
        `../../asset/path/to/file.jpg`,
        undefined,
      ],
    ],
  },
  // Reference syntax
  {
    text: `![image][ref]
      
      [ref]:../../assets/path/to/file.png
  `,
    matches: [
      [
        `[ref]:../../assets/path/to/file.png
`,
        undefined,
        undefined,
        `../../assets/path/to/file.png`,
      ],
    ],
  },
  {
    text: `![image][ref]
      
    [ref]: ../../assets/path/to/file.png
  `,
    matches: [
      [
        `[ref]: ../../assets/path/to/file.png
`,
        undefined,
        undefined,
        `../../assets/path/to/file.png`,
      ],
    ],
  },
  // Non-examples
  {
    text: `<a href="https://create.roblox.com/docs">`,
    matches: [],
  },
  {
    text: `[link](/path/to/page/)`,
    matches: [],
  },
  {
    text: `[^1]: This is a footnote`,
    matches: [],
  },
  {
    text: `- before \`game:GetService("Selection"):Get()[1]:Next()\` after.`,
    matches: [],
  },
  {
    text: `<span><Chip label='[Protocol]://[String]' color='primary' /></span>`,
    matches: [],
  },
];

export const SAMPLE_TEXT_MATCHES_COUNT = 19;
export const SAMPLE_TEXT_WITH_ASSET_LINK_MATCHES = `
    src="../../assets/path/to/file.png"
    src ="../../assets/path/to/file.png"
    src= "../../assets/path/to/file.png"
    src  =   "../../assets/path/to/file.jpg"
    src="/assets/path/to/file.mp4"
    src='/assets/path/to/file.mp4'
  
    src="bad-link"
    src="misspelled-assett/path/to/file-name.png"
    src="/asset/subfolder-path/to/file.png"
    src='/asset/subfolder-path/to/file.png'
    src="https://example.com/img.png"
    src="https://www.youtube-nocookie.com/embed/F6LVFSyytac?si=JPE6z1qAUVtCxNaO&amp;start=189" 
    
    secondSrc="../../assets/path/to/file.png"
    firstSrc="/path/to/file.png" secondSrc="/path/to/file.png"
    imageSrc='../assets/landing/home/articleBanner_building_visuals.png'
    [ref]:../../assets/path/to/file.png
    [ref]: ../../assets/path/to/file.png
    ![image](../../asset/path/to/file.jpg)
  `;

export const SAMPLE_TEXT_NO_ASSET_LINK_MATCHES = `
    href="https://example.com"
    href='https://example.com'
    [link](/path/to/page/)
    [^1]: This is a footnote
    - before \`game:GetService("Selection"):Get()[1]:Next()\` after.
    <span><Chip label='[Protocol]://[String]' color='primary' /></span>
  `;
