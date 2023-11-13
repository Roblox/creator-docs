import { VFileMessage } from 'vfile-message';
import {
  RETEXT_INAPPROPRIATE,
  RETEXT_PROFANITIES,
  compileMdx,
  getReTextAnalysis,
  replaceProfanityPatterns,
} from './retext.js';
import {
  RETEXT_EQUALITY_ALLOW_LIST,
  RETEXT_PASSIVE_ALLOW_LIST,
  ALLOWED_PROFANE_WORDS_LIST,
  RETEXT_SIMPLIFY_ALLOW_LIST,
} from './words.js';
import { VFile } from 'vfile';

describe('replaceProfanityPatterns', () => {
  it('should replace ! with i', () => {
    expect(replaceProfanityPatterns('n!ce')).toBe('nice');
  });

  it('should replace @ with a', () => {
    expect(replaceProfanityPatterns('h@te')).toBe('hate');
  });

  it('should replace $ with s', () => {
    expect(replaceProfanityPatterns('ca$h')).toBe('cash');
  });

  it('should replace two $ with two s', () => {
    expect(replaceProfanityPatterns('cla$$')).toBe('class');
  });

  it('should replace 0 with o', () => {
    expect(replaceProfanityPatterns('hell0')).toBe('hello');
  });

  it('should replace 3 with e', () => {
    expect(replaceProfanityPatterns('thre3')).toBe('three');
  });

  it('should replace 5 with s', () => {
    expect(replaceProfanityPatterns('cla5s')).toBe('class');
  });

  it('should replace two 5 with two s', () => {
    expect(replaceProfanityPatterns('cla55')).toBe('class');
  });

  it('should replace 5 and $ with s', () => {
    expect(replaceProfanityPatterns('cla5$')).toBe('class');
  });

  it('should handle mixed replacements', () => {
    expect(replaceProfanityPatterns('h!11$')).toBe('hills');
  });

  it('should handle uppercase characters', () => {
    expect(replaceProfanityPatterns('S!CK')).toBe('sick');
  });

  it('should handle h#llo without replacements (as # has no replacement defined)', () => {
    expect(replaceProfanityPatterns('h#llo')).toBe('h#llo');
  });

  it('should handle h*llo without replacements (as # has no replacement defined)', () => {
    expect(replaceProfanityPatterns('h*llo')).toBe('h*llo');
  });
});

describe('getReTextAnalysis', () => {
  /** Profanity */
  it('should detect profanities', async () => {
    const text = 'This test is shit.';
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBeGreaterThan(0);
    expect(result.messages[0].reason).toContain(`Don't use \`shit\``);
  });

  it('should detect profanities with symbols', async () => {
    const testWord = `a$$`;
    const text = `This test is ${testWord}.`;
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBeGreaterThan(0);
    expect(result.messages[0].reason).toContain(`Don't use \`${testWord}\``);
  });

  it('should detect profanities with symbols', async () => {
    const testWord = `@$$`;
    const text = `This test is ${testWord}.`;
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBeGreaterThan(0);
    expect(result.messages[0].reason).toContain(`Don't use \`${testWord}\``);
  });

  it('should detect profanities with number 0', async () => {
    const testWord = `dild0`;
    const text = `This test is ${testWord}.`;
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBeGreaterThan(0);
    expect(result.messages[0].reason).toContain(`Don't use \`${testWord}\``);
  });

  it('should detect profanities with punctuation and number 3', async () => {
    const testWord = `p3n!s`;
    const text = `This test is ${testWord}.`;
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBeGreaterThan(0);
    expect(result.messages[0].reason).toContain(`Don't use \`${testWord}\``);
  });

  it('should detect profanities with number 0 and number 3', async () => {
    const testWord = `wh0r3`;
    const text = `This test is ${testWord}.`;
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBeGreaterThan(0);
    expect(result.messages[0].reason).toContain(`Don't use \`${testWord}\``);
  });

  it('should detect profanities with punctuation and number 5', async () => {
    const testWord = `sh!t5`;
    const text = `This test is ${testWord}.`;
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBeGreaterThan(0);
    expect(result.messages[0].reason).toContain(`Don't use \`${testWord}\``);
  });

  it('should detect singular punctuation profanities', async () => {
    const text = 'This is a sh!t test.';
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBeGreaterThan(0);
    expect(result.messages[0].reason).toContain(`Don't use \`sh!t\``);
  });

  it('should detect plural punctuation profanities', async () => {
    const text = 'This is a sh!ts test.';
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBeGreaterThan(0);
    expect(result.messages[0].reason).toContain(`Don't use \`sh!ts\``);
  });

  it('should detect punctuation profanities in the middle of the sentence', async () => {
    const text = 'This, sh!t, is a test!';
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBeGreaterThan(0);
    expect(result.messages[0].reason).toContain(`Don't use \`sh!t\``);
  });

  it('should detect singular punctuation profanities at the end of the sentence', async () => {
    const text = 'This is a test, sh!t!';
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBeGreaterThan(0);
    expect(result.messages[0].reason).toContain(`Don't use \`sh!t\``);
  });

  it('should detect plural punctuation profanities at the end of the sentence', async () => {
    const text = 'This test is sh!ts!';
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBeGreaterThan(0);
    expect(result.messages[0].reason).toContain(`Don't use \`sh!ts\``);
  });

  it('should not flag non-profanities with symbols', async () => {
    const text = 'This test is @$$et, a$$ert, ass3t, @$$3t, asset, assert.';
    const result = await getReTextAnalysis(text);
    result.messages.forEach((m) => {
      expect(
        m.source !== RETEXT_PROFANITIES && m.source !== RETEXT_INAPPROPRIATE
      );
    });
  });

  it('should not flag non-profanities as profanities', async () => {
    const text = 'This test is ship.';
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBe(0);
  });

  test.each(ALLOWED_PROFANE_WORDS_LIST)(
    'should not flag allowed profanities for %s',
    async (word) => {
      const text = `This test is ${word}`;
      const result = await getReTextAnalysis(text);
      expect(result.messages.length).toBe(0);
    }
  );

  /** Repeated words */
  it('should detect repeated words', async () => {
    const text = 'You should should not repeat repeat words.';
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBeGreaterThan(0);
    expect(result.messages.length).toEqual(2);
    expect(result.messages[0].reason).toContain('Expected `should` once');
    expect(result.messages[1].reason).toContain('Expected `repeat` once');
  });

  it('should not flag non-consecutive repeated words', async () => {
    const text = 'I know you can do this and you know you can too.';
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBe(0);
  });

  /** Quotes */
  it('should detect smart apostrophe or smart closing quote', async () => {
    const text = `Don’t use a smart apostrophe or smart closing quote.`;
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBeGreaterThan(0);
    expect(result.messages[0].reason).toContain(
      "Expected a straight apostrophe: `'`, not `’`"
    );
  });

  it('should detect smart opening quote', async () => {
    const text = `Don‘t use a smart opening quote.`;
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBeGreaterThan(0);
    expect(result.messages[0].reason).toContain('not `‘`');
  });

  it('should detect smart quote', async () => {
    const text = `This is “a“ test.`;
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBeGreaterThan(0);
    expect(result.messages[0].reason).toContain(
      'Expected a straight quote: `"`, not `“`'
    );
  });

  it('should not flag nesting of quote', async () => {
    const text = `This is "a" test.`;
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBe(0);
  });

  it('should not flag nesting of quote', async () => {
    const text = `This is 'a' test.`;
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBe(0);
  });

  /** Contractions */
  it('should detect incorrect contractions', async () => {
    const text = "You do'nt need to be perfect.";
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBeGreaterThan(0);
    expect(result.messages[0].reason).toStrictEqual(
      "Expected the apostrophe in `do'nt` to be like this: `don't`"
    );
  });

  it('should not flag correct contractions', async () => {
    const text = "You don't need to be perfect.";
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBe(0);
  });

  /** Indefinite articles */
  it('should detect incorrect uses of `a`', async () => {
    const text = 'This test is a awesome test.';
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBeGreaterThan(0);
    expect(result.messages[0].reason).toStrictEqual(
      'Use `an` before `awesome`, not `a`'
    );
  });

  it('should detect incorrect uses of `an`', async () => {
    const text = 'This is an test.';
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBeGreaterThan(0);
    expect(result.messages[0].reason).toStrictEqual(
      'Use `a` before `test`, not `an`'
    );
  });

  it('should detect incorrect uses `a` before link', async () => {
    const text = 'This is a [awesome](#section) sentence.';
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBeGreaterThan(0);
    expect(result.messages[0].reason).toStrictEqual(
      'Use `an` before `awesome`, not `a`'
    );
  });

  it('should detect incorrect uses `an` before link', async () => {
    const text = 'This is an [test](#section) sentence.';
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBeGreaterThan(0);
    expect(result.messages[0].reason).toStrictEqual(
      'Use `a` before `test`, not `an`'
    );
  });

  it('should detect incorrect uses `a` before bold', async () => {
    const text = 'This is a **awesome** sentence.';
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBeGreaterThan(0);
    expect(result.messages[0].reason).toStrictEqual(
      'Use `an` before `awesome`, not `a`'
    );
  });

  it('should detect incorrect uses `an` before bold', async () => {
    const text = 'This is an **test** sentence.';
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBeGreaterThan(0);
    expect(result.messages[0].reason).toStrictEqual(
      'Use `a` before `test`, not `an`'
    );
  });

  it('should detect incorrect uses `a` before italics', async () => {
    const text = 'This is a _awesome_ sentence.';
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBeGreaterThan(0);
    expect(result.messages[0].reason).toStrictEqual(
      'Use `an` before `awesome`, not `a`'
    );
  });

  it('should detect incorrect uses `an` before italics', async () => {
    const text = 'This is an _test_ sentence.';
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBeGreaterThan(0);
    expect(result.messages[0].reason).toStrictEqual(
      'Use `a` before `test`, not `an`'
    );
  });

  // Should not flag for usage before `code`
  it("should not flag `a` before code even if it's incorrect", async () => {
    const text = 'This is a `awesome` sentence.';
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBe(0);
  });

  it("should not flag `an` before code even if it's incorrect", async () => {
    const text = 'This is an `test` sentence.';
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBe(0);
  });

  it("should not flag `a` before code in link even if it's incorrect", async () => {
    const text = 'This is a [`awesome`](#section) sentence.';
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBe(0);
  });

  it("should not flag `an` before code in link even if it's incorrect", async () => {
    const text = 'This is an [`test`](#section) sentence.';
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBe(0);
  });

  // Should not flag correct uses
  it('should not flag correct uses of `a` before link', async () => {
    const text = 'This is a [test](#section) sentence.';
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBe(0);
  });

  it('should not flag correct uses of `an` before link', async () => {
    const text = 'This is an [awesome](#section) sentence.';
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBe(0);
  });

  it('should not flag correct uses of `a` before code in link', async () => {
    const text = 'This is a [`test`](#section) sentence.';
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBe(0);
  });

  it('should not flag correct uses of `an` before code in link', async () => {
    const text = 'This is a [`awesome`](#section) sentence.';
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBe(0);
  });

  it('should not flag correct uses of `a` before code', async () => {
    const text = 'This is a `test` sentence.';
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBe(0);
  });

  it('should not flag correct uses of `an` before code', async () => {
    const text = 'This is a `awesome` sentence.';
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBe(0);
  });

  it('should not flag correct uses of `a`', async () => {
    const text = `This is a test.`;
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBe(0);
  });

  it('should not flag correct uses of `an`', async () => {
    const text = `This is an awesome test.`;
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBe(0);
  });

  /** Equality */
  it('should detect biased or unequal phrases', async () => {
    const text = 'He is the smartest.';
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBeGreaterThan(0);
    expect(result.messages[0].reason).toContain('He');
  });

  it('should not flag allowed unequal words', async () => {
    const allowedUnequalWord = RETEXT_EQUALITY_ALLOW_LIST[0];
    const text = `This is an ${allowedUnequalWord} word.`;
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBe(0);
  });

  /** Passive voice */
  it('should detect passive voice', async () => {
    const text = 'The test was run by Jest.';
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBeGreaterThan(0);
    expect(result.messages[0].reason).toContain('passive voice');
  });

  it('should not flag active voice', async () => {
    const text = 'Jest ran the test.';
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBe(0);
  });

  it('should not flag allowed passive voice', async () => {
    const allowedPassive = RETEXT_PASSIVE_ALLOW_LIST[0];
    const text = `This is ${allowedPassive} to work.`;
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBe(0);
  });

  /** Readability */
  it('should detect hard-to-read sentences', async () => {
    const text =
      'The system provides a set of methods, tools, and resources for extending and customizing functionalities for enhanced user immersion, enjoyment, and engagement, such as delivering messages based on customized requirements, adding permissions or moderation to specific users, and creating custom commands to execute specific actions, all of bring you to the cutting edge of technology, simplifying your workflows and reducing costs, and bringing your product to the next generation of possibilities.';
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBeGreaterThan(0);
    expect(result.messages[0].reason).toContain('Hard to read');
  });

  it('should not flag short sentences for readability', async () => {
    const text = 'This is a short sentence.';
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBe(0);
  });

  /** Spell */
  it('should detect misspelled words', async () => {
    const testWord = 'tesxt';
    const text = `This is a ${testWord} sentence.`;
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBeGreaterThan(0);
    expect(result.messages[0].reason).toContain(
      `\`${testWord}\` might be misspelled.`
    );
  });

  it('should not flag correctly spelled words', async () => {
    const text = 'This is a test sentence.';
    const result = await getReTextAnalysis(text);
    expect(result.messages.length).toBe(0);
  });
});

describe('compileMdx', () => {
  it('should detect missing full closing tags', async () => {
    const text = `
<Grid
    alignItems="stretch"
    container
    direction="row">

<Grid item md={7} xs={12}
    direction="column"  >

<div class="container"
style={{position: "relative", paddingBottom: "56.25%", height: 0}}>
<iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/zi0hIuPDyWc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style={{position: "absolute", top: 0, left: 0, width: "95%", height: "95%"}}></iframe>
</div>

<Grid item md={5} xs={12} direction='column'>

Hello World

Hello

World.
</Grid>

</Grid>`;
    const result = (await compileMdx(text)) as VFileMessage;
    expect(result.message).toBe(
      'Expected a closing tag for `</Grid>` (2:1-5:21)'
    );
    expect(result.source).toBe('mdast-util-mdx-jsx');
  });

  it('should detect missing closing tag characters', async () => {
    const text = `
Learn how to create Roblox experiences with a full suite of structured learning
that walks you through how to build, script, and polish your experiences with
amazing art and visuals.

<br /> <br

Hello

<br />

World`;
    const result = (await compileMdx(text)) as VFileMessage;
    expect(result.message).toBe(
      'Unexpected character `<` (U+003C) after attribute name, expected a character that can start an attribute name, such as a letter, `$`, or `_`; `=` to initialize a value; or the end of the tag'
    );
    expect(result.source).toBe('micromark-extension-mdx-jsx');
  });
  it('should not flag good MDX tables', async () => {
    const text = `## Moving the Camera

With the new place open in Studio, click inside the 3D viewport and use the following keyboard/mouse controls to look around.

<table>
<thead>
  <tr>
    <th>Key/Shortcut</th>
    <th>Action</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd></td>
    <td>Moves the camera forward, left, back, or right</td>
  </tr>
  <tr>
    <td><kbd>Q</kbd> <kbd>E</kbd></td>
    <td>Moves the camera down or up</td>
  </tr>
  <tr>
    <td><kbd>Shift</kbd></td>
    <td>In combination with any movement key, changes the camera speed</td>
  </tr>
  <tr>
    <td><kbd>F</kbd></td>
    <td>Focuses the camera on a selected part</td>
  </tr>
  <tr>
    <td>**Right Mouse Button**</td>
    <td>When pressed, dragging the mouse moves the camera view around</td>
  </tr>
  <tr>
    <td>**Mouse Scroll Wheel**</td>
    <td>Zooms the camera in or out</td>
  </tr>
  <tr>
    <td>**Middle Mouse Button**</td>
    <td>When pressed, dragging the mouse pans the camera</td>
  </tr>
</tbody>
</table>

## Building Your Experience

When you're comfortable navigating the viewport with the camera, you can begin building your experience by adding platforms of different shapes and colors for players to jump between.
`;
    const result = await compileMdx(text);
    expect(result).toStrictEqual(undefined);
  });
});
