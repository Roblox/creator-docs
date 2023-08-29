# Roblox Documentation Style Guide

This document contains guidelines for our content. The document is subject to change and _not_ comprehensive. If you have suggestions, open an issue or submit a pull request.

## Content Types

Content within our documentation falls into one of four categories:

- Conceptual
- Task-based
- Reference
- Tutorial

It's common to have a page with a conceptual introduction, a few tasks, and some reference material, but try to separate each content category with a Markdown header. This separation makes it easier for readers to scan the page and gives each section a clear intent.

## Style

We follow the [Microsoft Style Guide](https://learn.microsoft.com/en-us/style-guide/welcome/) with some additions and exceptions. The following list isn't exhaustive, but covers common issues:

- Use present tense whenever possible, even for things that happen after something else.

  **Bad**: You pressed the button, so the cursor will change soon.

  **Better**: After you press the button, the cursor changes.

- Use active voice whenever possible. Active voice forces you to include the subject, which makes an enormous difference in clarity.

  **Bad**: The list of players is returned.

  **Better**: The server returns the list of players.

- Use second-person to address the reader, but try to avoid saying "you" (and especially "you can") too often.

  **Bad**: If you want to build a custom user interface, you can add a container.

  **Better**: Add a container to begin building a custom user interface.

- "We" is Roblox and is usually reserved for recommendations.

  **Bad**: Now that we're happy with the terrain, we can start placing our models.

  **Better**: When you're satisfied with the terrain, begin placing your models.

- Use bold for key terms and UI elements. Use monospace for file paths, code, functions, variables, etc. Don't use italics.

  **Bad**: It's _very important_ that you click the stop button after running ./script.sh.

  **Better**: Click the **Stop** button after running `./script.sh`.

- Avoid idioms or colloquialisms. They're hard to localize and confuse many readers.

  **Bad**: Publishing in Roblox is a piece of cake.

  **Better**: Publishing in Roblox is fast and simple.

- "Can" is for optional actions or permission, "might" for possibility, "must" for requirements, and "should" for recommendations. Avoid "may."

  **Bad**: You should accept the license agreement before you may make changes. You might also review the coding standards.

  **Better**: You must accept the license agreement before you can make changes. You should also review the coding standards.

- Avoid gender identifiers. Whenever possible, make subjects plural.

  **Bad**: After clicking, a player can see his or her inventory on his/her screen.

  **Better**: After clicking, players can see their inventories on screen.

- Use "select" for options or objects in an experience. Use "click" for buttons or icons.

  **Bad**: Click and drag to grab the signpost. Then select the **Color** button.

  **Better**: Select the signpost and click the **Color** button.

- Spell out one through nine. Start using numerals at 10. If a number needs a unit (GB, pounds, millimeters, kg, celsius, etc.), use numerals, even if the number if smaller than 10.

  **Bad**: 3 people looked for thirteen files on a six GB hard drive.

  **Better**: Three people looked for 13 files on a 6 GB hard drive.

## Links

For links to other pages or the web, use standard Markdown instead of JSX or HTML. When linking to another page, use relative links to the Markdown file, and include the `.md` extension:

```md
[Meshes](../parts/meshes.md)
```

To link to the Roblox Engine API, use the following syntax. The parser detects these keywords and creates monospaced links to the API page:

- `` `Class.Name` ``
- `` `Class.Name.Property` ``
- `` `Class.Name:Method()` ``
- `` `Datatype.Name` ``
- `` `Datatype.Name.constructor()` ``
- `` `Enum.Name` ``
- `` `Enum.Name.Item` ``
- `` `Global.LuaGlobals.Name` ``
- `` `Global.RobloxGlobals.Name` ``
- `` `Library.Name` ``
- `` `Library.Name.function()` ``

If necessary, override the default link text using a `|` character:

- `` `Class.ClassName.Property|NewLinkText` ``
- `` `Global.LuaGlobals.Name|or even use multiple words` ``

The following table contains some examples and how they render in the documentation.

<table>
  <thead>
    <tr>
      <th>Markdown</th>
      <th>Rendered Result</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>`Class.BasePart`</code></td>
      <td><code><a href="https://create.roblox.com/docs/reference/engine/classes/BasePart">BasePart</a></code></td>
    </tr>
    <tr>
      <td><code>`Class.Fire.Color`</code></td>
      <td><code><a href="https://create.roblox.com/docs/reference/engine/classes/Fire#Color">Fire.Color</a></code></td>
    </tr>
    <tr>
      <td><code>`Class.MarketplaceService:GetProductInfo()`</code></td>
      <td><code><a href="https://create.roblox.com/docs/reference/engine/classes/MarketplaceService#GetProductInfo">MarketplaceService:GetProductInfo()</a></code></td>
    </tr>
    <tr>
      <td><code>`Enum.CameraType`</code></td>
      <td><code><a href="https://create.roblox.com/docs/reference/engine/enums/CameraType">CameraType</a></code></td>
    </tr>
    <tr>
      <td><code>`Global.RobloxGlobals.tick()`</code></td>
      <td><code><a href="https://create.roblox.com/docs/reference/engine/globals/RobloxGlobals#tick">tick()</a></code></td>
    </tr>
    <tr>
      <td><code>`Library.coroutine|coroutines`</code></td>
      <td><code><a href="https://create.roblox.com/docs/reference/engine/libraries/coroutine">coroutines</a></code></td>
    </tr>
  </tbody>
</table>

## Referencing the API

When referencing a term from the API in prose, use [automatic API links](#links) whenever possible. The examples in this section demonstrate the API link syntax.

If you must refer to a term without linking to it, maintain the same capitalization and wrap it in backticks. For example, refer to a `BasePart`, not a "base part."

Never frame API names in the possessive:

**Bad**: A `Class.BasePart`'s color is defined by its `Color` property.

**Better**: The color of a `Class.BasePart` is defined by its `Class.BasePart.Color` property.

If you must make a term plural, include the "s," but make it part of the name itself rather than placing it outside the backticks:

**Bad**: A model can contain several `Class.BasePart`s.

**Better**: A model can contain several `Class.BasePart|BaseParts`.

For words that are both concepts and API terms (for example, a `Touched` event or `Name` property), consider whether you are referring to the concept or the term. Concepts require no special formatting:

- Connect the function to the `Class.BasePart.Touched` event.
- Display text when players touch the part.

## Images

Images are usually great additions to documentation, but overusing them can make pages hard to scan and maintain over time. Each image should serve to clarify something that would be cumbersome to convey through text alone. For example, if a dialog has two buttons, **Cancel** and **OK**, just write, "Click **OK**." Adding a screenshot of the dialog doesn't offer any additional value to the reader and unnecessarily clutters the page.

However, if a complex user interface has numerous tools, labels, and fields, a screenshot of the UI and an arrow pointing to a particular button can be a huge help to the reader. Likewise, images are essential for demonstrating concepts like textures and in-experience UI containers.

We have the following guidelines for images:

- Before creating a new image, check the `content/en-us/assets` folder to see if a suitable one already exists.
- Most images should be JPGs or PNGs:
  - JPGs work well for photos and in-game content.
  - PNGs work well for images that require transparency or contain small text, such as screenshots and heavily annotated images.
- For architecture diagrams and flow charts, use SVGs.
- Try to keep image size under 200 KB, either by reducing dimensions, quality, or both. Some exceptions are unavoidable, though.
- Don't use animated GIFs. They are often huge on disk, and the endless looping can be distracting. We prefer MP4 videos, even if they're only a few seconds long.
- Separate words in filenames with dashes (for example, `Some-New-Image.png`).

## Alerts

Alerts are a great way to call attention to important information or offset blocks of prose, but use them sparingly and keep them short. When everything is an alert, nothing is:

```
<Alert severity="warning">
This is a beta feature and is subject to change in future releases.
</Alert>
```

There are four options for `severity`:

- `error`
- `info`
- `success`
- `warning`
