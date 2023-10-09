---
title: Test Tab
description: The Test tab contains tools for testing, simulating multiple clients, and other emulations.
---

The **Test** tab contains tools for testing an experience, simulating multiple clients, and emulating different devices or users with regional content policies.

<img src="../assets/studio/general/Toolbar-Test-Tab.png" width="800" alt="Test tab indicated in Studio toolbar" />

## Playtest Options

There are three common options for playtesting an experience. Clicking the small arrow below the main button lets you choose from each option, and sets that option as the default.

<img src="../assets/studio/general/Test-Tab-Playtest-Options.png" width="800" alt="Rapid playtest options in Test tab of Studio" />

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
    <td>During playtesting in a "play solo" mode (**Play** or **Play Here**), toggles between **Client** mode and **Server** mode. See [Studio Testing Modes](../studio/testing-modes.md#clientserver-toggle) for details.</td>
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

## Clients and Servers

Using the **Clients and Servers** options, you can launch multiple sessions of Studio, one acting as the server and each other acting as a client. See [Multi-Client Simulation](../studio/testing-modes.md#multi-client-simulation) for details.

<img src="../assets/studio/general/Test-Tab-Clients-Servers.png" width="800" alt="Clients and Servers options indicated in Test tab" />

## Device Emulation

The **Device** emulator lets you emulate various devices directly in Studio, providing insight on how controls operate on a mobile device or how [on-screen UI](../ui/on-screen-containers.md) displays on different screens and aspect ratios.

<img src="../assets/studio/general/Test-Tab-Emulation-Device.png" width="800" alt="Device button indicated in Test tab" />

In emulation mode, you can select devices from the **Device Selector** dropdown menu above the 3D viewport to emulate less powerful devices and test [streaming-enabled](../workspace/streaming.md) experiences where 3D content dynamically loads/unloads based on available memory. You can also adjust the **view&nbsp;size** and change the **device orientation** between landscape and portrait modes.

<img src="../assets/studio/general/Editor-Window-Emulation-Options.jpg" width="800" alt="Emulation options above the 3D viewport" />

## Player Emulator

The **Player** emulator lets you test various [localization](../production/localization/index.md) and content policies. See [Player Emulation](../studio/testing-modes.md#player-emulation) for details.

<img src="../assets/studio/general/Test-Tab-Emulation-Player.png" width="800" alt="Player emulator button indicated in Test tab" />

## Audio Mute

The **Mute** button allows you to mute in-experience sounds and music.

<img src="../assets/studio/general/Test-Tab-Mute.png" width="800" alt="Mute button indicated in Test tab" />
