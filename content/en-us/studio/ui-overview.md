---
title: Studio Interface
description: User interface overview for Roblox Studio, the essential building tool for Roblox experiences.
---

## Toolbar

The **toolbar** resides at the top of Studio. The buttons and tools visible in the bar change when you click on the [Home](../studio/home-tab.md), [Model](../studio/model-tab.md), [Avatar](../studio/avatar-tab.md), [Test](../studio/test-tab.md), [View](../studio/view-tab.md), and [Plugins](../studio/plugins-tab.md) tabs.

<img src="../assets/studio/general/Toolbar-Tabs-Labeled.png"
   width="800" alt="Primary tabs in Studio toolbar" />

<Grid container spacing={2} alignItems="center">
	<Grid item><img src="../assets/misc/Box-Label-A.png" width="40" /></Grid>
	<Grid item xs={10} sm={11} md={11} lg={11}><p>The [Home](../studio/home-tab.md) tab contains basic tools for manipulating 3D objects and testing your experience.</p></Grid>
</Grid>
<Grid container spacing={2} alignItems="center">
	<Grid item><img src="../assets/misc/Box-Label-B.png" width="40" /></Grid>
	<Grid item xs={10} sm={11} md={11} lg={11}><p>The [Model](../studio/model-tab.md) tab contains tools for manipulating 3D objects in the workspace, creating detailed models, working with physical constraints, and adding advanced objects.</p></Grid>
</Grid>
<Grid container spacing={2} alignItems="center">
	<Grid item><img src="../assets/misc/Box-Label-C.png" width="40" /></Grid>
	<Grid item xs={10} sm={11} md={11} lg={11}><p>The [Avatar](../studio/avatar-tab.md) tab contains specialized tools for creating and fitting accessories, importing custom meshes, building default rigs, and creating animations.</p></Grid>
</Grid>
<Grid container spacing={2} alignItems="center">
	<Grid item><img src="../assets/misc/Box-Label-D.png" width="40" /></Grid>
	<Grid item xs={10} sm={11} md={11} lg={11}><p>The [Test](../studio/test-tab.md) tab contains tools for testing an experience, simulating multiple clients, and emulating different devices.</p></Grid>
</Grid>
<Grid container spacing={2} alignItems="center">
	<Grid item><img src="../assets/misc/Box-Label-E.png" width="40" /></Grid>
	<Grid item xs={10} sm={11} md={11} lg={11}><p>The [View](../studio/view-tab.md) tab lets you toggle the various windows of Studio, as well as several display features.</p></Grid>
</Grid>
<Grid container spacing={2} alignItems="center">
	<Grid item><img src="../assets/misc/Box-Label-F.png" width="40" /></Grid>
	<Grid item xs={10} sm={11} md={11} lg={11}><p>The [Plugins](../studio/plugins-tab.md) tab contains tools for managing [plugins](../studio/plugins.md), configuring localization, and creating animations. Any plugins you install can also add buttons to this tab.</p></Grid>
</Grid>

## 3D Viewport

The 3D viewport represents the `Class.Workspace` of a place. From here, you can move the camera around the virtual world, manipulate objects with the mouse, and playtest an experience without leaving Studio.

<figure>
	<img
		src="../assets/studio/general/Editor-Window.jpg"
		width="100%" alt="3D viewport in Roblox Studio" />
	<figcaption>3D viewport in Roblox Studio</figcaption>
</figure>

### Camera Controls

Inside the viewport, you can move the camera with the following controls:

<table>
<thead>
  <tr>
    <th>Keys/Shortcuts</th>
    <th>Action</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd></td>
    <td>Moves the camera forward/left/back/right.</td>
  </tr>
  <tr>
    <td><kbd>Q</kbd> <kbd>E</kbd></td>
    <td>Moves the camera down/up.</td>
  </tr>
  <tr>
    <td><kbd>Shift</kbd></td>
    <td>In combination with any movement key, changes the camera speed. If desired, you can [customize](../studio/setting-up-roblox-studio.md#customizing-studio) the camera speed within Studio's settings.</td>
  </tr>
  <tr>
    <td><kbd>F</kbd></td>
    <td>Focuses the camera on a selected part.</td>
  </tr>
  <tr>
    <td>**Right Mouse Button**</td>
    <td>When pressed, dragging the mouse moves the camera view around.</td>
  </tr>
  <tr>
    <td>**Mouse Scroll Wheel**</td>
    <td>Zooms the camera in or out.</td>
  </tr>
  <tr>
    <td>**Middle Mouse Button**</td>
    <td>When pressed, dragging the mouse pans the camera.</td>
  </tr>
</tbody>
</table>

### Selecting Objects

As you hover over parts and models in the viewport, they are outlined to indicate their potential selection. You can select an outlined object by clicking it, or you can select multiple objects by holding <kbd>Shift</kbd>, <kbd>Ctrl</kbd>, or <kbd>⌘</kbd> as you hover over and click them.

<img src="../assets/studio/general/Editor-Window-Object-Selection.jpg" width="800" alt="Multiple models selected in 3D viewport"/>

#### Selection Cycling

In more complex environments or when zoomed in, objects will commonly be hidden from your view by other objects in front. To select hidden objects without moving the camera around, hold <kbd>Alt</kbd> or <kbd>⌥</kbd> and click to perform **selection&nbsp;cycling** to the next further object behind the currently selected object.

<figure>
  <video src="../assets/studio/general/Selection-Cycling.mp4" controls width="80%" alt="Video showing selection cycling through a model"></video>
  <figcaption>Selection cycling</figcaption>
</figure>

#### Children or Parents

When one or more objects or [models](../parts/models.md) are selected in the [Explorer](../studio/explorer.md) window, you can select all of their **children** by right-clicking and choosing **Select&nbsp;Children** from the context menu. Similarly, right-clicking and choosing **Select&nbsp;Parent(s)** selects the **direct parents** of those objects.

#### Selection Style

To display **outlines** and/or **bounding boxes** around selected objects, choose an option from the **Selection Style** menu in the [View](../studio/view-tab.md) tab.

<img src="../assets/studio/general/View-Tab-Selection-Style.png" width="670" alt="Selection Style menu indicated in View tab of Studio" />

<img src="../assets/studio/general/Selected-Object-Bounding-Box.jpg" width="800" alt="Selected part showing both its selection outline and a bounding box" />

## Common Windows

You can toggle on commonly used windows through the [View](../studio/view-tab.md) tab, including the [Explorer](../studio/explorer.md) window, [Properties](../studio/properties.md) window, [Asset&nbsp;Manager](../projects/assets/manager.md), [Toolbox](../projects/assets/toolbox.md), and many others.

<img src="../assets/studio/general/Toolbar-View-Tab.png" width="876" alt="View tab indicated in Studio toolbar" />

### Explorer

The [Explorer](../studio/explorer.md) window, visible by default, shows a hierarchical list of every object and service inside the place, collectively referred to as its **data model**. Frequently used services in the hierarchy include `Class.Workspace` which mirrors the [3D viewport](#3d-viewport), as well as `Class.ReplicatedStorage` and `Class.ServerStorage`.

<img src="../assets/studio/general/View-Tab-Explorer.png" width="876" alt="Explorer toggle button in Studio" />

<img src="../assets/studio/explorer/Location-In-Studio.png" width="800" alt="Explorer window in Studio" />

### Properties

The [Properties](../studio/properties.md) window lets you adjust properties of a selected object to change how it looks and behaves. Object properties are divided into sections; for example, a `Class.MeshPart` includes sections like **Appearance** which allows you to change its color, material, transparency, and more.

<img src="../assets/studio/general/View-Tab-Properties.png" width="876" alt="Properties toggle button in Studio" />

<img src="../assets/studio/properties/Location-In-Studio.png" width="800" alt="Properties window in Studio" />

At the bottom of the window, you can define custom [attributes](../studio/properties.md#instance-attributes) for an object, similar to its default properties. Attributes and their values are saved with your place/assets and they're an ideal way for team members to experiment with different values during runtime, even if they don't understand the underlying code.

<img src="../assets/studio/properties/Attributes-Example-B.png" width="320" />

### Asset Manager

The [Asset Manager](../projects/assets/manager.md) lets you manage places, images, meshes, packages, audio, and models in your experience. It also provides a mechanism to bulk import large groups of assets.

<img src="../assets/studio/general/View-Tab-Asset-Manager.png" width="776" alt="Asset Manager toggle button in Studio" />

<img src="../assets/studio/asset-manager/Grid-View.png" width="360" alt="Asset Manager window in Studio" />

### Toolbox

The [Toolbox](../projects/assets/toolbox.md) contains a selection of models, images, meshes, audio, plugins, videos, and fonts made by Roblox or Roblox community members. It also includes all of the creations that you've personally [published](../production/publishing/publishing-assets.md) or those which were published by [groups](../projects/groups.md) you belong to.

<img src="../assets/studio/general/View-Tab-Toolbox.png" width="776" alt="Toolbox toggle button in Studio" />

<img src="../assets/studio/toolbox/Model-Search-Example.png" width="360" alt="Toolbox window in Studio" />

### Output Window

The **Output** window, accessible from the [View](../studio/view-tab.md) tab, displays errors captured from running scripts, messages from Roblox engine, messages from calls to `print()`, and errors from calls to `warn()`. See [Output Window](../studio/output.md) for further details.

<img src="../assets/studio/general/View-Tab-Output.png" width="876" alt="Output button indicated in View tab of Studio" />

### Command Bar

The **Command Bar**, accessible from the [View](../studio/view-tab.md) tab, lets you execute Luau code outside of scripts. Similar to a terminal, pressing <kbd>↑</kbd> or <kbd>↓</kbd> while using the command bar navigates up and down among previously-executed commands. Clicking the small arrow on the right side similarly reveals a list of previously-executed commands.

<img src="../assets/studio/general/View-Tab-Command-Bar.png" width="876" alt="Command Bar button indicated in View tab of Studio" />

## Saving & Publishing

Options to save and [publish](../production/publishing/publishing-experiences-and-places.md) can be found in the **File** menu in the top left of Studio.

<table>
<thead>
  <tr>
    <th>Option</th>
    <th>Action</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Save to File**</td>
    <td>Save the experience locally to your computer in **.rbxl** format.</td>
  </tr>
  <tr>
    <td>**Save to Roblox**</td>
    <td>Save the experience to Roblox's cloud storage. Unlike <b>Publish to Roblox</b>, this does **not** update the current live version of the experience.</td>
  </tr>
  <tr>
    <td>**Publish&nbsp;to&nbsp;Roblox**</td>
    <td>Save and publish the experience to Roblox so other users can play. For more information, see [Publishing Experiences and Places](../production/publishing/publishing-experiences-and-places.md).</td>
  </tr>
</tbody>
</table>

## In-Studio Testing

Studio offers a suite of options for testing an experience before [releasing it to the public](../production/publishing/publishing-experiences-and-places.md#releasing-to-the-public). All of the testing options are accessible from the [Test](../studio/test-tab.md) tab.

- **Rapid playtesting** that provides a close simulation of the experience running on the Roblox application.

   <img src="../assets/studio/general/Test-Tab-Playtest-Options.png" width="800" alt="Rapid playtest options in Test tab of Studio" />

- **Multi-client simulation** for comparing how each client "sees" other clients within the experience.
- **Device emulation** that provides insight on how controls operate on a mobile device or how on-screen UI displays on different screens and aspect ratios.
- **Collaborative playtesting** with members of your [team group](../projects/setting-up-a-team.md).

See [Studio Testing Modes](../studio/testing-modes.md) for more information on each testing option.
