---
title: Script Editor
description: Roblox's built-in, fully-featured script editor includes modern conveniences like autocomplete, code highlighting, and multi-cursor editing.
---

The **Script Editor** in Studio is the primary tool for scripting on Roblox. It's a self-improving environment that can help you write high-impact code, shorten your development time, and iterate on your experiences. It can improve your scripting experience by:

- Formatting and highlighting syntax in your code.
- Offering ways to [autocomplete](#autocomplete-features) phrases in your code as you type.
- Helping you [navigate code](#code-navigation) by jumping to variable and function declarations.
- Helping you [find and replace](#find-and-replace) code in open scripts or all scripts.
- Providing [real-time feedback](#real-time-feedback) on your code quality and performance.

The Script Editor supports all types of [scripts](../scripting/index.md) and opens automatically when you create a new script or double-click an existing script in the [Explorer](../studio/explorer.md) window.

<Alert severity="success">
You can [customize](#editor-settings) the Script Editor to suit your preferences and workflows, including font family/size, formatting behavior, and colors for syntax highlighting. You can also toggle features such as [autocomplete](#autocomplete-features), and [script analysis](#script-analysis).
</Alert>

## Autocomplete features

The Script Editor's autocomplete features generate code-related information that can improve your programming efficiency, such as:

- **Informed suggestions** on how to complete phrases as you type them that are contextual to the experience's [data model](../projects/data-model.md). For example, if you have a `Class.Model` in `Class.Workspace` called **RocketShip**, autocomplete suggests `RocketShip` when you type `workspace.roc` and indicates that it's a `Class.Model`.

   <img src="../assets/studio/script-editor/Autocomplete-Data-Model.png" width="780" alt="Autocomplete showing suggestions based on the experience's data model" />

   <Alert severity="info">
   Use the <kbd>↑</kbd> and <kbd>↓</kbd> keys to browse the suggestions, then press <kbd>Tab</kbd> or <kbd>Enter</kbd> to accept a suggestion and insert the complete phrase.
   </Alert>

- **Autofill names** for variables and functions that you declare, helping you avoid pesky typos.

   <img src="../assets/studio/script-editor/Autocomplete-Variable.png" width="780" alt="Autocomplete showing suggestions based on a previously declared variable." />

- **Documentation pop-ups with code samples** that are similar to those on the [Engine API Reference](/reference/engine), giving you context on the API's usage.

   <img src="../assets/studio/script-editor/Autocomplete-API.png" width="780" alt="Autocomplete showing suggestions based on a Roblox Engine API." />

- **On-hover tooltips** that you can customize with your own defined documentation.

   <img src="../assets/studio/script-editor/Autocomplete-CustomDocs.png" width="780" alt="Autocomplete showing custom documentation." />

- **On-hover script analysis diagnostics** with information you can use to troubleshoot errors.

   <img src="../assets/studio/script-editor/Autocomplete-Diagnostics.png" width="780" alt="Autocomplete showing diagnostic information." />

- **Function signatures** when you type an argument, providing you a reference for its parameters and return values.

   <img src="../assets/studio/script-editor/Autocomplete-Signature.png" width="780" alt="Autocomplete showing function signature" />

## Code navigation

### Go to declaration

You can jump to the declaration of a function or variable by holding <kbd>Ctrl</kbd> on Windows or <kbd>⌘</kbd> on Mac when clicking the call, or by right-clicking its call and clicking **Go&nbsp;to&nbsp;Declaration**.

<img src="../assets/studio/script-editor/Go-To-Declaration.png" width="800" alt="Go to Declaration workflow on a declared function" />

### Script function filter

The **Script Function Filter** displays a list of all functions declared in a script. To open it, press <kbd>Alt</kbd><kbd>F</kbd> on Windows or <kbd>⌥</kbd><kbd>F</kbd> on Mac. With the list open, you can browse the signatures for each function, filter through them by name, and double-click one to jump to its declaration.

<img src="../assets/studio/script-editor/Script-Functions-Filter.png" width="800" alt="Script Function Filter showing all functions inside a script" />

## Find and replace

The **Find/Replace** widget lets you find and replace code in an open script. The widget supports matching case, matching the whole word, and searching by regular expressions. To open it, press <kbd>Ctrl</kbd><kbd>F</kbd> on Windows or <kbd>⌘</kbd><kbd>F</kbd> on Mac.

<img src="../assets/studio/script-editor/Find-Replace-Widget-Labeled.png" width="760" alt="Find/Replace widget labeled"/>

<Alert severity="info">
For broader searches, the **Find All / Replace All** window lets you find/replace code across multiple scripts in the experience. To open it, press <kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>F</kbd> on Windows or <kbd>⌘</kbd><kbd>Shift</kbd><kbd>F</kbd> on Mac.
</Alert>

## Real-time feedback

### Script Analysis

The **Script Analysis** window, accessible through the **Analysis** button in Studio's **Script** tab toolbar, performs static analysis on your scripts and displays active errors and warnings. For more information on the errors and warnings, see the [Luau linting](https://luau.org/lint) documentation.

<figure>
<img src="../assets/studio/script-editor/Script-Analysis-1.png" width="800" alt="Script with various marked errors" />
<figcaption>Script errors underlined in Script Editor</figcaption>
</figure>
<figure>
<img src="../assets/studio/script-editor/Script-Analysis-2.png" width="800" alt="Script Analysis window with details on marked errors from script" />
<figcaption>Errors explained in Script Analysis window</figcaption>
</figure>

### Output

The [Output](../studio/output.md) window displays errors captured from running scripts, messages from the Roblox engine, messages from calls to `print()`, and errors from calls to `warn()`.

<img src="../assets/studio/general/Output-Window.png" width="800" />

## Code Assist

**Code Assist** is a feature that suggests lines or functions of code as you type, helping you code more efficiently and stay focused. Based on contexts from your comment and code, suggestions will be triggered in two ways:

- **Automatically** when you pause on a line for a few seconds and the AI model has enough context for a suggestion.
- **Manually** with shortcut <kbd>Alt</kbd><kbd>&Backslash;</kbd> on Windows or <kbd>⌥</kbd><kbd>&Backslash;</kbd> on Mac.

Press <kbd>Tab</kbd> to accept a suggestion, or ignore it by continuing to type. Currently, your script needs to contain at least a few lines of code to trigger a suggestion.

<video controls width="800" src="../assets/studio/script-editor/Code-Assist.mp4" alt="Video of Code Assist suggestion tool in Studio's script editor"></video>

<Alert severity="warning">
**Code Assist** helps automate basic coding tasks so you can focus on creative work, but it does not always suggest perfect code (see [Limitations](#limitations)). It's still your responsibility to review, test, and determine if the code suggestion is contextually appropriate.
</Alert>

### Improve suggestions

To get more accurate and relevant suggestions, it's recommended that you follow clean coding practices, regardless of assistance, and:

- Break down your code into smaller functions.
- Use descriptive script names that capture the overall intent of what each script does. For example, name a script **SyncCustomSounds** instead of just **Sounds**.
- Assign descriptive names for parameters, functions, and scripts. For example, name a part **GreenSphere** instead of simply **grs**, or name a function `generateSphere()` instead of `gen()`. Using named functions versus anonymous functions can also produce better hints.
- Consistently include well-written [comments](../luau/comments.md) that describe the task you're implementing and what the inputs/outputs should be.
  - Consider including some sample calls with expected results in comments.
  - Suggest how to solve a problem, for instance `-- Use raycast`.
  - Use the exact function or variable name you defined, for example `-- Create 10 greenSphere objects` instead of `-- Create 10 spheres`.
- If you're a novice scripter, start with basic projects such as "make the player jump when they touch the part" or use the tool to generate small code snippets that you can expand upon as your knowledge grows.

### Limitations

The tool helps automate basic coding tasks but it does not always suggest perfect code. Known limitations include:

- Manual triggering does not **always** force-generate a suggestion.
- Suggestions are machine learned from a corpus of code and can thus reflect some limitations of the code they're trained on. For example, suggestions may not use newer APIs in favor of older APIs, or they may use Lua instead of [Luau](../luau/index.md).
- The tool may generate incorrect or misleading information that is not useful for your purpose.
- Internal filters attempt to block offensive language, but they're not all-encompassing and there's a possibility the tool may generate offensive or biased information.
- The suggestions may be the same, similar, or different among users, even with the same prompts. Your code, however, will never be shared with others.
- The suggestion may be incomplete due to the limited length of output from the learning models.
- There's a daily cap for the number of suggestions and, once the cap is reached, you will get no suggestions until the next day.

### Code privacy

Currently, Roblox does not use any non-public data to train the learning models. The tool only uses a small subset of free marketplace assets for tuning large language models and the subset has passed various checks for quality and safety filters.

Furthermore, all suggestions are generated **by** the AI model and do not transfer from one user to another. Since your code is not used for model training, it won't be suggested to other users of **Code&nbsp;Assist**, with the one exception of code being posted to free marketplace items.

## Multi-cursor

The Script Editor supports usage of multiple cursors to make edits simultaneously. You can add cursors based on your needs with a mouse click or keyboard shortcut. The initial cursor is called the **primary cursor** and additional cursors are called **secondary cursors**.

- Edits that you make at the primary cursor copy to the secondary cursors. Each edit counts as one action, so undo/redo of an edit applies to all cursors.
- Widgets such as [autocomplete](#autocomplete-features) appear on the primary cursor but not the secondary cursors.
- All of the standard [keyboard shortcuts](#keyboard-shortcuts) for script editing work with multi-cursor editing, including code indentation, toggling comments, and deleting lines.

The following table summarizes multi-cursor workflows and their shortcuts.

<table>
  <thead>
    <tr>
      <th>Command</th>
      <th>Windows</th>
      <th>Mac</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>**Add/remove cursor at mouse location**</td>
      <td><kbd>Alt</kbd>&nbsp;+ click</td>
      <td><kbd>⌥</kbd>&nbsp;+ click</td>
    </tr>
    <tr>
      <td>**Remove most recently added cursor**</td>
      <td><kbd>Ctrl</kbd><kbd>U</kbd></td>
      <td><kbd>⌘</kbd><kbd>U</kbd></td>
    </tr>
		<tr>
      <td>**Add/modify cursor on mouse drag**</td>
      <td><kbd>Alt</kbd>&nbsp;+ drag</td>
      <td><kbd>⌥</kbd>&nbsp;+ drag</td>
    </tr>
		<tr>
      <td>**Add cursor above/below**</td>
      <td><kbd>Ctrl</kbd><kbd>Alt</kbd><kbd>↑</kbd>&nbsp;/ <kbd>Ctrl</kbd><kbd>Alt</kbd><kbd>↓</kbd></td>
      <td><kbd>⌘</kbd><kbd>⌥</kbd><kbd>↑</kbd>&nbsp;/ <kbd>⌘</kbd><kbd>⌥</kbd><kbd>↓</kbd></td>
    </tr>
		<tr>
      <td>**Add cursor to next matching selection**</td>
      <td><kbd>Ctrl</kbd><kbd>D</kbd></td>
      <td><kbd>⌘</kbd><kbd>D</kbd></td>
    </tr>
		<tr>
      <td>**Add cursor to every matching selection**</td>
      <td><kbd>Shift</kbd><kbd>Alt</kbd><kbd>L</kbd></td>
      <td><kbd>Shift</kbd><kbd>⌥</kbd><kbd>L</kbd></td>
    </tr>
		<tr>
      <td>**Column/block select**</td>
      <td><kbd>Shift</kbd><kbd>Alt</kbd>&nbsp;+ drag</td>
      <td><kbd>Shift</kbd><kbd>⌥</kbd>&nbsp;+ drag</td>
    </tr>
		<tr>
      <td>**Split selections into lines**</td>
      <td><kbd>Shift</kbd><kbd>Alt</kbd><kbd>I</kbd></td>
      <td><kbd>Shift</kbd><kbd>⌥</kbd><kbd>I</kbd></td>
    </tr>
  </tbody>
</table>

<Alert severity="info">
To remove all secondary cursors, exit multi-cursor editing, and return to the primary cursor, press <kbd>Esc</kbd>.
</Alert>

### Add cursors

You can add cursors with a combination of keyboard shortcuts and mouse maneuvers. Cursors merge if they occupy the same space, such as if you add cursors with arrow keys or delete all the characters between cursors.

#### At mouse location

To add a cursor at your mouse pointer location:

1. Hold <kbd>Alt</kbd> on Windows or <kbd>⌥</kbd> on Mac.
2. Click where you want to add the cursor.

   <video controls width="512" src="../assets/studio/script-editor/AddWithClick.mp4"></video>

#### With mouse drag

You can drag the mouse to add a cursor to a selection, split a multi-line selection into lines, or select columns and blocks of code/whitespace.

<Tabs>
<TabItem label="Drag select">
To add a cursor to a selection of code through dragging:

1. Hold <kbd>Alt</kbd> on Windows or <kbd>⌥</kbd> on Mac.
2. Click and drag your mouse over the selection of code.

   <video controls width="512" src="../assets/studio/script-editor/AddWithDrag.mp4"></video>

</TabItem>
<TabItem label="Split into lines">
To split a multi-line selection into lines and add a cursor at the end of each line, press <kbd>Shift</kbd><kbd>Alt</kbd><kbd>I</kbd> on Windows or <kbd>Shift</kbd><kbd>⌥</kbd><kbd>I</kbd> on Mac.

<video controls width="405" src="../assets/studio/script-editor/SplitSelectionsIntoLines.mp4"></video>

</TabItem>
<TabItem label="Column/block select">
To select columns and blocks of code or whitespace, drag the mouse while holding <kbd>Shift</kbd><kbd>Alt</kbd> on Windows or <kbd>Shift</kbd><kbd>⌥</kbd> on Mac. As you drag, a cursor will be added on each highlighted line.

<video controls width="405" src="../assets/studio/script-editor/ColumnBlockSelect.mp4"></video>

</TabItem>
</Tabs>

#### Above and below primary cursor

To add a cursor directly above or below the primary cursor:

1. Press and hold <kbd>Ctrl</kbd><kbd>Alt</kbd> on Windows or <kbd>⌘</kbd><kbd>⌥</kbd> on Mac.
2. Press the <kbd>↑</kbd> or <kbd>↓</kbd> arrows.

   <video controls width="434" src="../assets/studio/script-editor/AddAboveBelow.mp4"></video>

#### To matching selections

You can add cursors to all matches of a selection or to the next/previous match, and optionally toggle whether matches are case-sensitive and/or match the whole word.

<Tabs>
<TabItem label="All matching">
To add a cursor to all matches of a selected portion:

1. Select the code that you want to search for matches of.
2. Press <kbd>Shift</kbd><kbd>Alt</kbd><kbd>L</kbd> on Windows or <kbd>Shift</kbd><kbd>⌥</kbd><kbd>L</kbd> on Mac.

   <video controls width="454" src="../assets/studio/script-editor/AddToAllMatches.mp4"></video>

</TabItem>
<TabItem label="Next/previous match">
To add a cursor to the **next** matching selection:

1. Select the code that you want to search for matches of.
2. Press <kbd>Ctrl</kbd><kbd>D</kbd> on Windows or <kbd>⌘</kbd><kbd>D</kbd> on Mac.
3. Continue pressing <kbd>Ctrl</kbd><kbd>D</kbd> or <kbd>⌘</kbd><kbd>D</kbd> until you've selected all the next matches that you want.

   <video controls width="454" src="../assets/studio/script-editor/AddToNextPrevMatch.mp4"></video>

There is no default shortcut for adding a cursor to the **previous** matching selection, but you can add your own:

1. Open **File** &rang; **Advanced** &rang; **Customize&nbsp;Shortcuts**.
2. In the shortcuts window, locate **Select previous occurrence**.

   <img src="../assets/studio/script-editor/Shortcut-Edit-Select-Prev.png" width="800" />

3. Double-click the action's **Shortcut** field and enter your own custom key combination, such as <kbd>Shift</kbd><kbd>Ctrl</kbd><kbd>D</kbd> to pair alongside "next" matching's default of <kbd>Ctrl</kbd><kbd>D</kbd>.
4. Confirm your setting by clicking **OK** in the bottom-right corner of the window.

</TabItem>
<TabItem label="Case or whole word match">
For each of the matching-related workflows above, you can match **case** and/or **whole word** as follows:

1. Open the Find/Replace tool (<kbd>Ctrl</kbd><kbd>F</kbd> on Windows or <kbd>⌘</kbd><kbd>F</kbd> on Mac).
2. Use the toggle buttons to choose if a matched selection should be case-sensitive and/or match the whole word only.

   <img src="../assets/studio/script-editor/Find-Match-Case-Whole-Word.png" width="500" />

   <video controls width="349" src="../assets/studio/script-editor/MatchCaseWholeWord1.mp4"></video>

   <video controls width="485" src="../assets/studio/script-editor/MatchCaseWholeWord2.mp4"></video>

</TabItem>
</Tabs>

### Remove cursors

You can remove cursors with the following keyboard shortcuts and mouse maneuvers. Alternatively, you can exit multi-cursor editing by pressing <kbd>Esc</kbd>.

#### At mouse location

To remove a cursor:

1. Press and hold <kbd>Alt</kbd> on Windows or <kbd>⌥</kbd> on Mac.
2. Click the cursor you want to remove.

   <video controls width="485" src="../assets/studio/script-editor/RemoveWithClick.mp4"></video>

#### Most recently added

To remove the most recently added cursor, press <kbd>Ctrl</kbd><kbd>U</kbd> on Windows or <kbd>⌘</kbd><kbd>U</kbd> on Mac.

<video controls width="393" src="../assets/studio/script-editor/UndoRecentCursor.mp4"></video>

### Copy and paste cursors

Copying a selection of code includes the cursors within it. The behavior of the paste depends on the number of cursors at the source and the number of cursors at the destination:

- If the number of cursors are the same, then each copied cursor pastes to each corresponding destination cursor.
- If the number of cursors are different, then each cursor at the destination receives the entire paste with each copied cursor as a new line.

<video controls width="679" src="../assets/studio/script-editor/CopyPaste.mp4"></video>

### On-type formatting

Pressing enter/return will auto-indent each cursor at the new line relative to
the previous line. If the previous line starts with an incomplete block, the formatter will try to complete it.

<video controls width="459" src="../assets/studio/script-editor/OnTypeFormatting.mp4"></video>

## Editor settings

Many customization options are accessible via the **Script Editor** tab of [Studio Settings](../studio/setup.md#customization). Commonly modified options include:

<table>
<thead>
  <tr>
    <th>Option</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Font**</td>
    <td>Font face and size for code in the editor.</td>
  </tr>
  <tr>
    <td>**Tab width**</td>
    <td>Number of spaces representing a <kbd>Tab</kbd> indent.</td>
  </tr>
  <tr>
    <td>**Indent using spaces**</td>
    <td>If enabled, spaces equal to **Tab&nbsp;Width** are inserted with <kbd>Tab</kbd> press.</td>
  </tr>
  <tr>
    <td>**Text wrapping**</td>
    <td>If enabled, longer lines of code wrap to the next line.</td>
  </tr>
  <tr>
    <td>**Script Editor color preset**</td>
    <td>Color preset for code elements, selection colors, and more. After choosing a preset, you can set specific colors for options like **Selection Color** and **Comment Color**.</td>
  </tr>
</tbody>
</table>

## Keyboard shortcuts

The Script Editor has the following keyboard shortcuts.

<Tabs>
<TabItem label="File and display">
<table size="small">
  <thead>
    <tr>
      <th>Command</th>
      <th>Windows</th>
      <th>Mac</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>**Close script**</td>
      <td><kbd>Ctrl</kbd><kbd>W</kbd></td>
      <td><kbd>⌘</kbd><kbd>W</kbd></td>
    </tr>
    <tr>
      <td>**Reopen last closed script**</td>
      <td><kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>T</kbd></td>
      <td><kbd>⌘</kbd><kbd>Shift</kbd><kbd>T</kbd></td>
    </tr>
    <tr>
      <td>**Quick open**</td>
      <td><kbd>Ctrl</kbd><kbd>P</kbd></td>
      <td><kbd>⌘</kbd><kbd>P</kbd></td>
    </tr>
    <tr>
      <td>**Show script in Explorer**</td>
      <td><kbd>Ctrl</kbd><kbd>Alt</kbd><kbd>K</kbd></td>
      <td><kbd>⌘</kbd><kbd>⌥</kbd><kbd>K</kbd></td>
    </tr>
		<tr>
      <td>**Zoom in**</td>
      <td><kbd>Ctrl</kbd><kbd>=</kbd></td>
      <td><kbd>⌘</kbd><kbd>=</kbd></td>
    </tr>
    <tr>
      <td>**Zoom out**</td>
      <td><kbd>Ctrl</kbd><kbd>-</kbd></td>
      <td><kbd>⌘</kbd><kbd>-</kbd></td>
    </tr>
    <tr>
      <td>**Reset script zoom**</td>
      <td><kbd>Ctrl</kbd><kbd>0</kbd></td>
      <td><kbd>⌘</kbd><kbd>0</kbd></td>
    </tr>
  </tbody>
</table>
</TabItem>
<TabItem label="Basic editing">
<table size="small">
  <thead>
    <tr>
      <th>Command</th>
      <th>Windows</th>
      <th>Mac</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>**Cut**</td>
      <td><kbd>Ctrl</kbd><kbd>X</kbd></td>
      <td><kbd>⌘</kbd><kbd>X</kbd></td>
    </tr>
    <tr>
      <td>**Copy**</td>
      <td><kbd>Ctrl</kbd><kbd>C</kbd></td>
      <td><kbd>⌘</kbd><kbd>C</kbd></td>
    </tr>
    <tr>
      <td>**Paste**</td>
      <td><kbd>Ctrl</kbd><kbd>V</kbd></td>
      <td><kbd>⌘</kbd><kbd>V</kbd></td>
    </tr>
		<tr>
      <td>**Undo**</td>
      <td><kbd>Ctrl</kbd><kbd>Z</kbd></td>
      <td><kbd>⌘</kbd><kbd>Z</kbd></td>
    </tr>
    <tr>
      <td>**Redo**</td>
      <td><kbd>Ctrl</kbd><kbd>Y</kbd></td>
      <td><kbd>Shift</kbd><kbd>⌘</kbd><kbd>Z</kbd></td>
    </tr>
    <tr>
      <td>**Select all**</td>
      <td><kbd>Ctrl</kbd><kbd>A</kbd></td>
      <td><kbd>⌘</kbd><kbd>A</kbd></td>
    </tr>
		<tr>
      <td>**Find** / **Replace**</td>
      <td><kbd>Ctrl</kbd><kbd>F</kbd></td>
      <td><kbd>⌘</kbd><kbd>F</kbd></td>
    </tr>
    <tr>
      <td>**Find&nbsp;all** / **replace&nbsp;all**</td>
      <td><kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>F</kbd></td>
      <td><kbd>⌘</kbd><kbd>Shift</kbd><kbd>F</kbd></td>
    </tr>
    <tr>
      <td>**Indent** / **unindent**</td>
      <td><kbd>Ctrl</kbd><kbd>\]</kbd>&nbsp;/ <kbd>Ctrl</kbd><kbd>\[</kbd></td>
      <td><kbd>⌘</kbd><kbd>\]</kbd>&nbsp;/ <kbd>⌘</kbd><kbd>\[</kbd></td>
    </tr>
    <tr>
      <td>**Toggle comment**</td>
      <td><kbd>Ctrl</kbd><kbd>/</kbd></td>
      <td><kbd>⌘</kbd><kbd>/</kbd></td>
    </tr>
    <tr>
      <td>**Expand all folds**</td>
      <td><kbd>Ctrl</kbd><kbd>E</kbd></td>
      <td><kbd>⌘</kbd><kbd>E</kbd></td>
    </tr>
    <tr>
      <td>**Collapse all folds**</td>
      <td><kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>E</kbd></td>
      <td><kbd>⌘</kbd><kbd>Shift</kbd><kbd>E</kbd></td>
    </tr>
    <tr>
      <td>**Delete line**</td>
      <td><kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>K</kbd></td>
      <td><kbd>⌘</kbd><kbd>Shift</kbd><kbd>K</kbd></td>
    </tr>
    <tr>
      <td>**Delete to start of line**</td>
      <td><kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>Backspace</kbd></td>
      <td><kbd>⌘</kbd><kbd>Delete</kbd></td>
    </tr><tr>
      <td>**Move line up/down**</td>
      <td><kbd>Alt</kbd><kbd>↑</kbd>&nbsp;/ <kbd>Alt</kbd><kbd>↓</kbd></td>
      <td><kbd>⌥</kbd><kbd>↑</kbd>&nbsp;/ <kbd>⌥</kbd><kbd>↓</kbd></td>
    </tr>
    <tr>
      <td>**Go to declaration**</td>
      <td><kbd>Ctrl</kbd><kbd>F12</kbd></td>
      <td><kbd>⌘</kbd><kbd>F12</kbd></td>
    </tr>
    <tr>
      <td>**Open script function filter**</td>
      <td><kbd>Alt</kbd><kbd>F</kbd></td>
      <td><kbd>⌥</kbd><kbd>F</kbd></td>
    </tr>
		<tr>
      <td>**Format selection**</td>
      <td><kbd>Alt</kbd><kbd>Shift</kbd><kbd>F</kbd></td>
      <td><kbd>⌥</kbd><kbd>Shift</kbd><kbd>F</kbd></td>
    </tr>
  </tbody>
</table>
</TabItem>
<TabItem label="Multi-Cursor">
<table size="small">
  <thead>
    <tr>
      <th>Command</th>
      <th>Windows</th>
      <th>Mac</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>**Add/remove cursor at mouse location**</td>
      <td><kbd>Alt</kbd>&nbsp;+ click</td>
      <td><kbd>⌥</kbd>&nbsp;+ click</td>
    </tr>
    <tr>
      <td>**Remove most recently added cursor**</td>
      <td><kbd>Ctrl</kbd><kbd>U</kbd></td>
      <td><kbd>⌘</kbd><kbd>U</kbd></td>
    </tr>
		<tr>
      <td>**Add/modify cursor on mouse drag**</td>
      <td><kbd>Alt</kbd>&nbsp;+ drag</td>
      <td><kbd>⌥</kbd>&nbsp;+ drag</td>
    </tr>
		<tr>
      <td>**Add cursor above/below**</td>
      <td><kbd>Ctrl</kbd><kbd>Alt</kbd><kbd>↑</kbd>&nbsp;/ <kbd>Ctrl</kbd><kbd>Alt</kbd><kbd>↓</kbd></td>
      <td><kbd>⌘</kbd><kbd>⌥</kbd><kbd>↑</kbd>&nbsp;/ <kbd>⌘</kbd><kbd>⌥</kbd><kbd>↓</kbd></td>
    </tr>
		<tr>
      <td>**Add cursor to next matching selection**</td>
      <td><kbd>Ctrl</kbd><kbd>D</kbd></td>
      <td><kbd>⌘</kbd><kbd>D</kbd></td>
    </tr>
		<tr>
      <td>**Add cursor to every matching selection**</td>
      <td><kbd>Shift</kbd><kbd>Alt</kbd><kbd>L</kbd></td>
      <td><kbd>Shift</kbd><kbd>⌥</kbd><kbd>L</kbd></td>
    </tr>
		<tr>
      <td>**Column/block select**</td>
      <td><kbd>Shift</kbd><kbd>Alt</kbd>&nbsp;+ drag</td>
      <td><kbd>Shift</kbd><kbd>⌥</kbd>&nbsp;+ drag</td>
    </tr>
		<tr>
      <td>**Split selections into lines**</td>
      <td><kbd>Shift</kbd><kbd>Alt</kbd><kbd>I</kbd></td>
      <td><kbd>Shift</kbd><kbd>⌥</kbd><kbd>I</kbd></td>
    </tr>
  </tbody>
</table>
</TabItem>
</Tabs>
