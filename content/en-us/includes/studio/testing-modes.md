---
title: include
---

There are three common options for playtesting an experience. Clicking the small arrow below the main button lets you choose from each option, and sets that option as the default.

<img src="../assets/studio/general/Test-Tab-Playtest-Options.png" width="800" alt="Rapid playtest options in Test tab of Studio." />

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
      <td>Starts simulating the experience, inserting your avatar at either a `Class.SpawnLocation` or coordinates of around (0,&nbsp;100,&nbsp;0).</td>
    </tr>
    <tr>
      <td>**Play&nbsp;Here**</td>
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

<img src="../assets/studio/general/Test-Tab-Running-Options.png" width="800" alt="Additional options available during playtesting in Studio." />

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
    <td>During playtesting in a "play solo" mode (**Play** or **Play Here**), toggles between **Client** mode and **Server** mode. See [Client/Server Toggle](../studio/testing-modes.md#clientserver-toggle) for details.</td>
  </tr>
  <tr>
    <td>**Pause&nbsp;Physics** / **Resume&nbsp;Physics**</td>
    <td></td>
    <td>Lets you [pause and resume physics](#pausing--resuming-physics) without disabling rendering.</td>
  </tr>
  <tr>
    <td>**Stop**</td>
    <td><kbd>Shift</kbd><kbd>F5</kbd></td>
    <td>Stops simulation of the experience and resets all objects and instances to how they were before **Play**, **Play Here**, or **Run** was clicked.</td>
  </tr>
</tbody>
</table>
