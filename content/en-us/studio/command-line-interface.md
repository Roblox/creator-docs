---
title: Studio command-line interface
description: Roblox Studio supports command-line arguments that let you start Studio in a variety of ways and access special Studio functionality.
---

Roblox Studio supports command-line arguments that let you launch it with special functionality, such as opening a specific place or script when Studio starts. The Roblox Studio executable is typically installed in the following locations:

<table>
  <thead>
    <tr>
      <th>OS</th>
      <th>Location</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Windows</td>
      <td>`C:\Users\[YourUsername]\AppData\Local\Roblox.exe`</td>
    </tr>
    <tr>
      <td>Mac</td>
      <td>`/Applications/RobloxStudio.app/Contents/MacOS/RobloxStudio`</td>
    </tr>
  </tbody>
</table>

## Open a place

To open a place, specify the place ID, universe ID, and a task. These arguments are required.

### Required arguments

<table>
  <thead>
    <tr>
      <th>Argument</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>-placeId &lt;placeId&gt;</code></td>
      <td>The numeric ID of the place to open.</td>
    </tr>
    <tr>
      <td><code>-universeId &lt;universeId&gt;</code></td>
      <td>The universe that owns the place.</td>
    </tr>
    <tr>
      <td><code>-task &lt;taskName&gt;</code></td>
      <td>Specifies how Studio opens the place based on the given task. See the <a href="#supported-tasks">Supported tasks</a> table for more information.</td>
    </tr>
  </tbody>
</table>

### Supported tasks

<table>
  <thead>
    <tr>
      <th>Argument</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>EditPlace</code></td>
      <td>Opens the latest version of the place.</td>
    </tr>
    <tr>
      <td><code>EditPlaceRevision</code></td>
      <td>Opens a specific previous version of the place. This task requires you specify the place version with <code>-placeVersion &lt;versionNumber&gt;</code>.</td>
    </tr>
  </tbody>
</table>

### Examples

```shell
Roblox.exe -placeId 101570895440344 -universeId 9808504031 -task EditPlace

Roblox.exe -placeId 101570895440344 -universeId 9808504031 -task EditPlaceRevision -placeVersion 2
```

## Open a script

To open a script, specify the place ID, universe ID, and task as described in the [Open a place](#open-a-place) section. Then provide one of the following arguments depending on how you want to open the script.

<table>
  <thead>
    <tr>
      <th>Argument</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>-openScriptPath &lt;path&gt;</code></td>
      <td><p>The path to the script. Must use `/` as separators and follow absolute `Global.LuaGlobals.require()|require-by-string` semantics. For example: </p>
      ```-openScriptPath Workspace/MyFolder/MyScript```</td>
    </tr>
    <tr>
      <td><code>-openScriptFromId &lt;uniquedId&gt;</code></td>
      <td><p>The ID of the script to open. For example:</p>
      ```-openScriptFromId 604a6aa2-04cc-c820-09b3-a1dc0000537f```</td>
    </tr>
  </tbody>
</table>

### Optional highlighting

Optionally, you can highlight specific lines or a character range when opening the script with the following arguments.

<table>
  <thead>
    <tr>
      <th>Arguments</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
      `-startLine <line>`<br/>
      `-endLine <line>`
      </td>
      <td>Highlight entire lines</td>
    </tr>
    <tr>
      <td>
          `-startLine <line>`<br/>
          `-endLine <line>`<br/>
          `-startCharacter <char>`<br/>
          `-endCharacter <char>`
      </td>
      <td>Highlight a character range</td>
    </tr>
  </tbody>
</table>

The following indexing rules apply to each argument:

- Line numbers and character positions are 1-based.
- The start position is inclusive, and the end position is exclusive.
- Negative values are not supported.

For example, given the following string:

```shell
print("Hello World")
```

You can highlight `print` using the following arguments and values:

```shell
-startLine 1 -endLine 1 -startCharacter 1 -endCharacter 6
```
