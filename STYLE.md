# Roblox Documentation Style Guide

This document contains guidelines for our content. The document is subject to change and **not** comprehensive. If you have suggestions, open an issue or submit a pull request.

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

  - **BAD**: You pressed the button, so the cursor will change soon.
  - **BETTER**: After you press the button, the cursor changes.

- Use active voice whenever possible. Active voice forces you to include the subject, which makes an enormous difference in clarity.

  - **WORSE**: The list of players is returned.
  - **BETTER**: The server returns the list of players.

- The terms "we" and "our" implies Roblox and is usually reserved for recommendations.

  - **BAD**: Now that we're happy with the terrain, we can start placing our models.
  - **BETTER**: When you're satisfied with the terrain, begin placing your models.

- Use second-person to address the reader, but try to avoid saying "you" (and especially "you can") too often.

  - **WORSE**: If you want to build a custom user interface, you can add a container.
  - **BETTER**: Add a container to begin building a custom user interface.

- Use **bold** for key terms and UI elements, **not** italics. Use `monospace` for file paths, code, functions, variables, etc.

  - **BAD**: It's _very important_ that you click the stop button after running **./script.sh**.
  - **BETTER**: Click the **Stop** button after running `./script.sh`.

- Avoid idioms or colloquialisms. They're hard to localize and confuse many readers.

  - **WORSE**: Publishing in Roblox is a piece of cake.
  - **BETTER**: Publishing in Roblox is fast and simple.

- "Can" is for optional actions or permission, "might" for possibility, "must" for requirements, and "should" for recommendations. Avoid "may."

  - **BAD**: You should accept the license agreement before you may make changes. You might also review the coding standards.
  - **BETTER**: You must accept the license agreement before you can make changes. You should also review the coding standards.

- Avoid gender identifiers. Whenever possible, make subjects plural.

  - **BAD**: After clicking, a player can see his or her inventory on his/her screen.
  - **BETTER**: After clicking, players can see their inventories on screen.

- Use "select" for options or objects in an experience. Use "click" for buttons or icons.

  - **BAD**: Click and drag to grab the signpost. Then select the **Color** button.
  - **BETTER**: Select the signpost and click the **Color** button.

- Spell out one (1) through nine (9). Start using numerals at 10. If a number needs a unit (GB, pounds, millimeters, kg, celsius, etc.), always use numerals, even if the number if smaller than 10.

  - **BAD**: 3 people looked for thirteen files on a six GB hard drive.
  - **BETTER**: Three people looked for 13 files on a 6 GB hard drive.

## Links

### External Links

For external links to other websites outside of [https://create.roblox.com](https://create.roblox.com), use standard Markdown instead of JSX or HTML:

- `[Creator Dashboard](https://create.roblox.com/creations)`
- `[Blender](https://www.blender.org/)`

### Documentation Site Links

When linking to another page on the Roblox Documentation site, use **relative** links to the Markdown file, including the `.md` extension. Links to Engine API reference pages are handled separately (see section below).

- `[Meshes](../parts/meshes.md)`
- `[Merch Booth](../resources/modules/merch-booth.md)`

### Engine API Reference Page Links

When referencing a Roblox Engine API member, such as a class, method, enum, data type, global function, or library, use our special [API link syntax](#link-syntax) instead.`.

#### Usage Guidelines

- In prose, you should always link to an API member, but avoid excessive usage through pronouns and contextual references. For example:

  - **BAD**: [`BasePart`](https://create.roblox.com/docs/reference/engine/classes/BasePart) is an abstract base class for in-world objects that render and are physically simulated. [`BaseParts`](https://create.roblox.com/docs/reference/engine/classes/BasePart) can be grouped into simulated rigid assemblies, and [`BaseParts`](https://create.roblox.com/docs/reference/engine/classes/BasePart) can detect collisions with other [`BaseParts`](https://create.roblox.com/docs/reference/engine/classes/BasePart).
  - **BETTER**: [`BasePart`](https://create.roblox.com/docs/reference/engine/classes/BasePart) is an abstract base class for in-world objects that render and are physically simulated. [`BaseParts`](https://create.roblox.com/docs/reference/engine/classes/BasePart) can be grouped into simulated rigid assemblies and they can detect collisions with each other.

- Never frame API names in the possessive; instead, adjust the phrasing to avoid possessive case:

  - **BAD**: A [`BasePart`](https://create.roblox.com/docs/reference/engine/classes/BasePart)'s color is defined by its [`Color`](https://create.roblox.com/docs/reference/engine/classes/BasePart#Color) property.
  - **BETTER**: The color of a [`BasePart`](https://create.roblox.com/docs/reference/engine/classes/BasePart) is defined by its [`Color`](https://create.roblox.com/docs/reference/engine/classes/BasePart#Color) property.

- If a term should be **plural** in prose, append the plural term after a `|` as outlined in [Link Substitution](#link-substitution).

  - **BAD**: A model can contain several [`BasePart`](https://create.roblox.com/docs/reference/engine/classes/BasePart)s.
  - **BETTER**: A model can contain several [`BaseParts`](https://create.roblox.com/docs/reference/engine/classes/BasePart).

- For words that are both **concepts** and API **terms** (for example, a [`Touched`](https://create.roblox.com/docs/reference/engine/classes/BasePart#Touched) event), consider whether you're referring to the concept or the term. Concepts require no special formatting.

  - **API TERM**: Connect the function to the [`Touched`](https://create.roblox.com/docs/reference/engine/classes/BasePart#Touched) event.
  - **CONCEPT**: Display text after a player's character has touched the part.

#### Link Syntax

To link to a page in the Roblox Engine API, use the following syntax patterns. The parser detects these keywords and forms monospaced links to the proper Engine API page in our site.

- **Classes**

  - `` `Class.Name` ``
  - `` `Class.Name.Property` ``
  - `` `Class.Name:Method()` ``
  - `` `Class.Name:Method(argument)` ``
  - `` `Class.Name:Method(arg1, arg2, arg3, ...)` ``
  - `` `Class.Name.Event` ``
  - `` `Class.Name.Callback` ``

- **Data Types**

  - `` `Datatype.Name` ``
  - `` `Datatype.Name:Method()` ``
  - `` `Datatype.Name:Method(argument)` ``
  - `` `Datatype.Name:Method(arg1, arg2, arg3, ...)` ``
  - `` `Datatype.Name.constructor()` ``
  - `` `Datatype.Name.constructor(argument)` ``
  - `` `Datatype.Name.constructor(arg1, arg2, arg3, ...)` ``

- **Enums**

  - `` `Enum.Name` ``

- **Lua/Roblox Globals**

  - `` `Global.LuaGlobals.Function()` ``
  - `` `Global.RobloxGlobals.Function()` ``
  - `` `Global.RobloxGlobals.Property` ``

- **Libraries**

  - `` `Library.Name` ``
  - `` `Library.Name.Function()` ``
  - `` `Library.Name.Function(argument)` ``
  - `` `Library.Name.Function(arg1, arg2, arg3, ...)` ``

The following table contains examples and how they render in the documentation. Note that the default link text will display without the initial type prefix (`Class.`, `Datatype.`, `Enum.`, `Global.`, `Library.`). For example, `` `Class.BasePart` `` renders as simply [`BasePart`](https://create.roblox.com/docs/reference/engine/classes/BasePart).

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
      <td><code>`Class.MarketplaceService:GetProductInfo()|GetProductInfo()`</code></td>
      <td><code><a href="https://create.roblox.com/docs/reference/engine/classes/MarketplaceService#GetProductInfo">GetProductInfo()</a></code></td>
    </tr>
    <tr>
      <td><code>`Datatype.Color3`</code></td>
      <td><code><a href="https://create.roblox.com/docs/reference/engine/datatypes/Color3">Color3</a></code></td>
    </tr>
    <tr>
      <td><code>`Enum.Font`</code></td>
      <td><code><a href="https://create.roblox.com/docs/reference/engine/enums/Font">Font</a></code></td>
    </tr>
    <tr>
      <td><code>`Enum.Font|GothamMedium`</code></td>
      <td><code><a href="https://create.roblox.com/docs/reference/engine/enums/Font">GothamMedium</a></code></td>
    </tr>
    <tr>
      <td><code>`Global.RobloxGlobals.tick()`</code></td>
      <td><code><a href="https://create.roblox.com/docs/reference/engine/globals/RobloxGlobals#tick">tick()</a></code></td>
    </tr>
    <tr>
      <td><code>`Library.coroutine.create()`</code></td>
      <td><code><a href="https://create.roblox.com/docs/reference/engine/libraries/coroutine">coroutine.create()</a></code></td>
    </tr>
   <tr>
      <td><code>`Class.Beam:SetTextureOffset()|myBeam:SetTextureOffset(1)`</code></td>
      <td><code><a href="https://create.roblox.com/docs/reference/engine/classes/Beam#SetTextureOffset">myBeam:SetTextureOffset(1)</a></code></td>
    </tr>
    <tr>
      <td><code>`Datatype.CFrame.new(x, y, z)`</code></td>
      <td><code><a href="https://create.roblox.com/docs/reference/engine/datatypes/CFrame#new">CFrame.new(x, y, z)</a></code></td>
    </tr>
  </tbody>
</table>

#### Link Substitution

If desired, you can override the default link text using a `|` character followed by the desired term:

- `` `Class.Name.Property|PropertyName` ``
- `` `Enum.Name|EnumItemName` ``

This technique should be used to shorten the length of rendered links on the page:

- **BAD**: [`MarketplaceService`](https://create.roblox.com/docs/reference/engine/classes/MarketplaceService) is responsible for in-experience transactions. The most notable methods are [`MarketplaceService:PromptProductPurchase()`](https://create.roblox.com/docs/reference/engine/classes/MarketplaceService#PromptProductPurchase) and [`MarketplaceService:PromptPurchase()`](https://create.roblox.com/docs/reference/engine/classes/MarketplaceService#PromptPurchase), as well as the callback [`MarketplaceService.ProcessReceipt`](https://create.roblox.com/docs/reference/engine/classes/MarketplaceService#ProcessReceipt) which must be defined so that transactions do not fail.
- **BETTER**: [`MarketplaceService`](https://create.roblox.com/docs/reference/engine/classes/MarketplaceService) is responsible for in-experience transactions. The most notable methods are [`PromptProductPurchase()`](https://create.roblox.com/docs/reference/engine/classes/MarketplaceService#PromptProductPurchase) and [`PromptPurchase()`](https://create.roblox.com/docs/reference/engine/classes/MarketplaceService#PromptPurchase), as well as the callback [`ProcessReceipt`](https://create.roblox.com/docs/reference/engine/classes/MarketplaceService#ProcessReceipt) which must be defined so that transactions do not fail.

You should also use link substitution when framing an API term in plural:

- **BAD**: A model can contain several [`BasePart`](https://create.roblox.com/docs/reference/engine/classes/BasePart)s.
- **BETTER**: A model can contain several [`BaseParts`](https://create.roblox.com/docs/reference/engine/classes/BasePart).

#### Monospace Non-Links

To render a term in monospace without any possibility of forming a link, append the term with `|no-link`:

- `` `monospace|no-link` `` &rarr; `monospace`

## Engine Reference YAML Files

The reference documentation in `content/en-us/reference/engine/` uses YAML rather than Markdown. YAML is a structured format that has stricter whitespace requirements than Markdown. Pay attention to the amount of leading whitespace before an element; even a single missing space can result in invalid YAML. If you're not familiar with the format, consider using an online YAML linter to check your work.

The documentation makes heavy use of the `|` character, which allows for multi-line strings. It preserves line breaks and lets you include multiple paragraphs, lists, tables, multi-line code blocks, etc.

The reference documentation files come in five types:

- Classes — core classes such as `BasePart`, `Model`, `Humanoid`, `DataStoreService`, etc.
- Data types — data types such as `Color3`, `CFrame`, `UDim2`, `Vector3`, etc.
- Enums — Enums such as `CameraType`, `FontSize`, `ScreenInsets`, etc.
- Globals — Lua and Roblox globals.
- Libraries — Lua libraries such as `math`, `string`, and `table`.

Internal tooling generates the structure of most files. Don't add new constructors, properties, methods, or events—just fill in the details. In most situations, you should only edit `summary`, `description`, and `deprecation_message`.

<table>
  <thead>
    <tr>
      <th>Key</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>summary</td>
      <td>A short summary of the API. Appears in Studio.</td>
    </tr>
    <tr>
      <td>description</td>
      <td>
        <p>An expanded, longer description of the API. Reusing information from the summary field is fine. Other information you might consider including:</p>
<ul>
  <li>Any comparisons between the API and its alternatives.</li>
  <li>Brief use case summaries. For example, "With MemoryStoreService, you can build a live leaderboard."</li>
  <li>Any "gotchas" or limitations of the API.</li>
  <li>Whether the API is used on the server, client, or both.</li>
  <li>Links to any related classes.</li>
</ul>
<p>Descriptions support HTML tables and most Markdown elements, including Markdown H4s (<code>####</code>), but consider whether you really need headers within a description.</p>
      </td>
    </tr>
    <tr>
      <td>inherits</td>
      <td>Any APIs that this API inherits from—embeds any API members into the current page.</td>
    </tr>
    <tr>
      <td>tags</td>
      <td>Categorizes the API and enables specific functionality depending on the tag.</td>
    </tr>
    <tr>
      <td>deprecation_message</td>
      <td>The message shown for a deprecated API. The API must have the <code>Deprecated</code> tag for this message to appear.</td>
    </tr>
    <tr>
      <td>code_samples</td>
      <td>The list of code samples to display for the API. We've yet to open source code sample files.</td>
    </tr>
    <tr>
      <td>memory_category</td>
      <td>Where the class appears in the <strong>Memory</strong> tab of the developer console (e.g. Instances, PhysicsParts, Animation, etc.).</td>
    </tr>
    <tr>
      <td>properties</td>
      <td>The array of properties for the API. Each must contain name, summary, description, code_samples, type, tags, deprecation_message, security, thread_safety, category, and serialization.</td>
    </tr>
    <tr>
      <td>methods</td>
      <td>The array of methods for the API. Each must contain name, summary, description, code_samples, parameters, returns, tags, deprecation_message, security, and thread_safety.</td>
    </tr>
    <tr>
      <td>events</td>
      <td>The array of events for the API. Each must contain name, summary, description, code_samples, parameters, tags, deprecation_message, security, thread_safety.</td>
    </tr>
    <tr>
      <td>callbacks</td>
      <td>The array of callbacks for the API. Each must contain name, summary, description, code_samples, parameters, returns, tags, deprecation_message, security, and thread_safety.</td>
    </tr>
  </tbody>
</table>

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

```md
<Alert severity="warning">
This is a beta feature and is subject to change in future releases.
</Alert>
```

There are four options for `severity`:

- `error`
- `info`
- `success`
- `warning`
