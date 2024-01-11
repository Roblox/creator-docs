---
title: Script Tab
description: The Script tab contains tools for writing, testing, and debugging scripts.
---

The **Script** tab contains tools for writing and testing scripts. You can only access this tab when you're viewing or editing a script.

<img src="../assets/studio/general/Toolbar-Script-Tab.png" width="888" alt="Script tab indicated in Studio toolbar" />

## Clipboard

The first section from left contains tools to copy, cut, and paste instances or lines of code.

## Navigate

The **Navigate** section lets you quickly jump between any open script.

<table>
<thead>
  <tr>
    <th>Action</th>
	<th>Shortcut</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Back**</td>
	<td><kbd>Shift</kbd><kbd>Ctrl</kbd><kbd>-</kbd>&nbsp;(Windows)<br /><kbd>Shift</kbd><kbd>⌘</kbd><kbd>-</kbd>&nbsp;(Mac)</td>
    <td>Navigates to the previous open script.</td>
  </tr>
  <tr>
    <td>**Fwd**</td>
	<td><kbd>Shift</kbd><kbd>Ctrl</kbd><kbd>=</kbd>&nbsp;(Windows)<br /><kbd>Shift</kbd><kbd>⌘</kbd><kbd>=</kbd>&nbsp;(Mac)</td>
    <td>Navigates to the next open script.</td>
  </tr>
</tbody>
</table>

## Edit

The **Edit** section lets you search and edit any part of the script, as well as select instances within the [Explorer](../studio/explorer.md) window for bulk actions. See [Studio Shortcuts](../studio/shortcuts.md#script-editor) for default shortcuts tied to these actions.

<img src="../assets/studio/general/Script-Tab-Edit-Tools.png" width="888" alt="Edit tools indicated in Script tab" />

<table>
<thead>
  <tr>
    <th>Action</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Find**</td>
    <td>
	Opens a pop-up menu with the following tools:
	<ul>
    <li><b>Find</b> — Locates all instances of your input in the script.</li>
    <li><b>Find Next</b> — Locates the next match found in the "Find" widget.</li>
    <li><b>Find Previous</b> — Locates the previous match found in the "Find" widget.</li>
    <li><b>Find All</b> — Locates all instances of your input within a place, even outside of the currently selected script.</li>
    <li><b>Go to Line</b> — Navigates to a specific line within the script.</li>
    <li><b>Quick Open</b> — Searches all instances in the [Explorer](../studio/explorer.md) window.</li>
    <li><b>Quick Open Actions</b> — Searches all Studio actions.</li>
    <li><b>Open Script Function Filter</b> — Searches all functions within the active script and its required module scripts.</li>
	</ul>
	</td>
  </tr>
  <tr>
    <td>**Replace**</td>
    <td>Lets you replace one (or all) matches in a script with a new string.</td>
  </tr>
  <tr>
    <td>**Select**</td>
    <td>
	Opens a pop-up menu with the following tools:
	<ul>
    <li><b>Select All</b> — Selects all contents of a script.</li>
    <li><b>Select Children</b> — Selects all descendants of a selected instance in the Explorer window.</li>
	</ul>
	</td>
  </tr>
</tbody>
</table>

## Format

The **Format** section lets you format sections or the entirety of the script for readability. The dropdown lets you select either **Format Selection** or **Format Document**.

<img src="../assets/studio/general/Script-Tab-Format-Options.png" width="888" alt="Format options indicated in Script tab" />

<table>
<thead>
  <tr>
    <th>Action</th>
	<th>Shortcut</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Format Selection**</td>
	<td><kbd>Alt</kbd><kbd>Shift</kbd><kbd>F</kbd>&nbsp;(Windows)<br /><kbd>⌥</kbd><kbd>Shift</kbd><kbd>F</kbd>&nbsp;(Mac)</td>
    <td>Formats the currently selected portion of the script with proper layout and indentation.</td>
  </tr>
  <tr>
    <td>**Format Document**</td>
	<td></td>
    <td>Formats the entire script regardless of the current selection.</td>
  </tr>
</tbody>
</table>

## Playtest Options

There are three common options for playtesting an experience. Click the button to start a playtest of that type, or click the small arrow below the button to choose another option.

<img alt="Script tab playtest options" src="../assets/studio/general/Script-Tab-Playtest-Options.png" width="772" alt="Playtest options in Script tab" />

<table>
  <thead>
    <tr>
      <th>Action</th>
	  <th>Shortcut</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>**Play**</td>
	  <td><kbd>F5</kbd></td>
      <td>Starts simulating the experience, inserting your avatar at either a `Class.SpawnLocation` or coordinates of around (0, 100, 0).</td>
    </tr>
    <tr>
      <td>**Play Here**</td>
	  <td></td>
      <td>Starts simulating the experience, inserting your avatar in front of the camera's current position.</td>
    </tr>
	<tr>
      <td>**Run**</td>
	  <td><kbd>F8</kbd></td>
      <td>Starts simulating the experience but does not insert your avatar. The simulation begins at the current camera position and you can navigate around using the Studio camera controls.</td>
    </tr>
  </tbody>
</table>

Once a playtest is running, the following options become available:

<table>
<thead>
  <tr>
    <th>Action</th>
    <th>Shortcut</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Client** / **Server**</td>
    <td></td>
    <td>During playtesting in a "play solo" mode (**Play** or **Play Here**), toggles between **client mode** and **server mode**.</td>
  </tr>
  <tr>
    <td>**Pause** / **Resume**</td>
    <td><kbd>F5</kbd></td>
    <td>Pauses or resumes the playtest.</td>
  </tr>
  <tr>
    <td>**Stop**</td>
    <td><kbd>Shift</kbd><kbd>F5</kbd></td>
    <td>Stops simulation of the experience and resets all objects and instances to how they were before **Play**, **Play Here**, or **Run** was clicked.</td>
  </tr>
</tbody>
</table>

## Debugging Tools

The **Debugger** section lets you control the [debugger](../studio/debugging.md).

<img src="../assets/studio/general/Script-Tab-Debugging-Tools.png" width="888" alt="Debugging tools indicated in Script tab"/>

<table>
<thead>
  <tr>
    <th>Action</th>
    <th>Shortcut</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Step Into**</td>
    <td><kbd>F11</kbd></td>
    <td>Moves the debugger into the function on the current line. If there is no function on the current line, the debugger moves to the next line.</td>
  </tr>
  <tr>
    <td>**Step Over**</td>
    <td><kbd>F10</kbd></td>
    <td>Moves the debugger to the next line of code, not moving into functions.</td>
  </tr>
  <tr>
    <td>**Step Out**</td>
    <td><kbd>Shift</kbd><kbd>F11</kbd></td>
    <td>Moves the debugger out of the current function and to the next line of code after the function was initially called. If the current line is not inside a function, the debugger moves to the next line.</td>
  </tr>
</tbody>
</table>

In the neighboring **Debug Errors** section, you can opt to treat script errors as impromptu breakpoints.

<table>
<thead>
  <tr>
    <th>Action</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Never**</td>
    <td>Disables impromptu script debugging.</td>
  </tr>
  <tr>
    <td>**On All Exceptions**</td>
    <td>Flags all errors, even those occurring within pcall.</td>
  </tr>
  <tr>
    <td>**On Unhandled Exceptions**</td>
    <td>Only flags errors that occur in unprotected mode; the debugger ignores errors occurring within pcall .</td>
  </tr>
</tbody>
</table>

## Other Actions

The **Actions** section at the furthest right contains miscellaneous script actions.

<table>
<thead>
  <tr>
    <th>Action</th>
	<th>Shortcut</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Go to Script Error**</td>
	<td></td>
    <td>Navigates the cursor to the first instance of an error within your script.</td>
  </tr>
  <tr>
    <td>**Reload Script**</td>
	<td><kbd>Ctrl</kbd><kbd>R</kbd>&nbsp;(Windows)<br /><kbd>⌘</kbd><kbd>R</kbd>&nbsp;(Mac)</td>
    <td>Applies any changes that have been made to a script to the active playtest. The changes are not saved to the script outside of the playtest unless your Studio settings are set to auto-save runtime script changes or you confirm to save the changes upon stopping the playtest. This action is only available while playtesting.</td>
  </tr>
  <tr>
    <td>**Commit**</td>
	<td></td>
    <td>Commits any changes to the script so the updated script is available to other developers within your team. This action is only available during <a href="../projects/collaboration.md">Team Create</a> sessions.</td>
  </tr>
  <tr>
    <td>**Toggle Comment**</td>
	<td><kbd>Ctrl</kbd><kbd>/</kbd>&nbsp;(Windows)<br /><kbd>⌘</kbd><kbd>/</kbd>&nbsp;(Mac)</td>
    <td>Toggles whether a line of script is a comment or not.</td>
  </tr>
  <tr>
    <td>**Expand All Folds**</td>
	<td><kbd>Ctrl</kbd><kbd>E</kbd>&nbsp;(Windows)<br /><kbd>⌘</kbd><kbd>E</kbd>&nbsp;(Mac)</td>
    <td>Expands all collapsed folds in the script.</td>
  </tr>
  <tr>
    <td>**Collapse All Folds**</td>
	<td><kbd>Shift</kbd><kbd>Ctrl</kbd><kbd>E</kbd>&nbsp;(Windows)<br /><kbd>Shift</kbd><kbd>⌘</kbd><kbd>E</kbd>&nbsp;(Mac)</td>
    <td>Collapses all foldable sections of the script.</td>
  </tr>
</tbody>
</table>
