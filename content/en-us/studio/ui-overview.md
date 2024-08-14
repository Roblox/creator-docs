---
title: Studio Interface
description: User interface overview for Roblox Studio, the essential building tool for Roblox experiences.
---

import BetaAlert from '../includes/beta-features/beta-alert.md'

## Toolbar

The **toolbar** resides at the top of Studio. The buttons and tools visible in the bar change when you click on the [Home](../studio/home-tab.md), [Model](../studio/model-tab.md), [Avatar](../studio/avatar-tab.md), [Test](../studio/test-tab.md), [View](../studio/view-tab.md), and [Plugins](../studio/plugins-tab.md) tabs.

<img src="../assets/studio/general/Toolbar-Tabs-Labeled.png"
   width="800" alt="Studio's toolbar with the Home, Model, Avatar, Test, View, and Plugins tabs highlighted." />

<Grid container spacing={2}>
	<Grid item xs={2} sm={1} md={1} lg={1}><img src="../assets/misc/Box-Label-A.png" width="40" style={{float:"right"}} /></Grid>
	<Grid item xs={10} sm={11} md={11} lg={11} style={{marginTop:"4px"}}>
	The [Home](../studio/home-tab.md) tab contains basic tools for manipulating 3D objects and testing your experience.
	</Grid>
</Grid>
<Grid container spacing={2}>
	<Grid item xs={2} sm={1} md={1} lg={1}><img src="../assets/misc/Box-Label-B.png" width="40" style={{float:"right"}} /></Grid>
	<Grid item xs={10} sm={11} md={11} lg={11} style={{marginTop:"4px"}}>
	The [Model](../studio/model-tab.md) tab contains tools for manipulating 3D objects in the workspace, creating detailed models, working with physical constraints, and adding advanced objects.
	</Grid>
</Grid>
<Grid container spacing={2}>
	<Grid item xs={2} sm={1} md={1} lg={1}><img src="../assets/misc/Box-Label-C.png" width="40" style={{float:"right"}} /></Grid>
	<Grid item xs={10} sm={11} md={11} lg={11} style={{marginTop:"4px"}}>
	The [Avatar](../studio/avatar-tab.md) tab contains specialized tools for creating and fitting accessories, importing custom meshes, building default rigs, and creating animations.
	</Grid>
</Grid>
<Grid container spacing={2}>
	<Grid item xs={2} sm={1} md={1} lg={1}><img src="../assets/misc/Box-Label-D.png" width="40" style={{float:"right"}} /></Grid>
	<Grid item xs={10} sm={11} md={11} lg={11} style={{marginTop:"4px"}}>
	The [Test](../studio/test-tab.md) tab contains tools for testing an experience, simulating multiple clients, and emulating different devices.
	</Grid>
</Grid>
<Grid container spacing={2}>
	<Grid item xs={2} sm={1} md={1} lg={1}><img src="../assets/misc/Box-Label-E.png" width="40" style={{float:"right"}} /></Grid>
	<Grid item xs={10} sm={11} md={11} lg={11} style={{marginTop:"4px"}}>
	The [View](../studio/view-tab.md) tab lets you toggle the various windows of Studio, as well as several display features.
	</Grid>
</Grid>
<Grid container spacing={2}>
	<Grid item xs={2} sm={1} md={1} lg={1}><img src="../assets/misc/Box-Label-F.png" width="40" style={{float:"right"}} /></Grid>
	<Grid item xs={10} sm={11} md={11} lg={11} style={{marginTop:"4px"}}>
	The [Plugins](../studio/plugins-tab.md) tab contains tools for managing [plugins](../studio/plugins.md), configuring localization, and creating animations. Any plugins you install can also add buttons to this tab.
	</Grid>
</Grid>

## 3D Viewport

The 3D viewport represents the `Class.Workspace` of a place. From here, you can move the camera around the virtual world, manipulate objects with the mouse, and playtest an experience without leaving Studio.

<figure>
	<img
		src="../assets/studio/general/Editor-Window.jpg"
		width="100%" alt="An example viewport display of a desert environment with multiple stone pillars. One of the pillars displays movement visual aids from the Move tool." />
	<figcaption>3D viewport in Roblox Studio</figcaption>
</figure>

### Camera Controls

Inside the viewport, you can move the camera with the following controls. See also [Studio Shortcuts](../studio/shortcuts.md#camera-controls) for additional key shortcuts.

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
	<tr>
    <td>**Right Mouse Button**&nbsp;& **Mouse Scroll Wheel**</td>
		<td>Pressing the right mouse button and scrolling the mouse wheel **up** increases the camera scroll speed. Conversely, pressing the right mouse button and scrolling the mouse wheel **down** reduces the camera scroll speed.<BetaAlert betaName="New Studio Camera Controls" leadIn="This feature is currently in beta. Enable it through " leadOut="." components={props.components} /><Alert severity="success">Camera scroll speed is also adjustable from the [Visualization Options](#visualization-options) menu in the upper‑right corner of the 3D viewport.</Alert></td>
	</tr>
</tbody>
</table>

### Selecting Objects

As you hover over parts and models in the viewport, they are outlined to indicate their potential selection. You can select an outlined object by clicking it, or you can select multiple objects by holding <kbd>Shift</kbd>, <kbd>Ctrl</kbd>, or <kbd>⌘</kbd> as you hover over and click them.

<img src="../assets/studio/general/Editor-Window-Object-Selection.jpg" width="800" alt="A warehouse environment with the stairs and multiple pallet box objects with a blue highlight to signify that they are selected in the 3D viewport."/>

<h4>Selection Cycling</h4>

In more complex environments or when zoomed in, objects will commonly be hidden from your view by other objects in front. To select hidden objects without moving the camera around, hold <kbd>Alt</kbd> or <kbd>⌥</kbd> and click to perform **selection&nbsp;cycling** to the next further object behind the currently selected object.

<figure>
  <video src="../assets/studio/general/Selection-Cycling.mp4" controls width="800" alt="Video showing selection cycling through a model"></video>
  <figcaption>Selection cycling</figcaption>
</figure>

<h4>Children or Parents</h4>

When one or more objects or [models](../parts/models.md) are selected in the [Explorer](../studio/explorer.md) window, you can select all of their **children** by right-clicking and choosing **Select&nbsp;Children** from the context menu. Similarly, right-clicking and choosing **Select&nbsp;Parent(s)** selects the **direct parents** of those objects.

<h4>Selection Style</h4>

To display **outlines** and/or **bounding boxes** around selected objects, choose an option from the **Selection Style** menu in the [View](../studio/view-tab.md) tab.

<img src="../assets/studio/general/View-Tab-Selection-Style.png" width="670" alt="Studio's View tab with the Selection Style tool highlighted." />

<img src="../assets/studio/general/Selected-Object-Bounding-Box.jpg" width="800" alt="A warehouse environment with rope object's selection outline and bounding box highlighted." />

### Visualization Options

In the upper-right corner of the 3D viewport, you can quickly toggle or set common visualization options related to [on‑screen&nbsp;UI](../ui/on-screen-containers.md) overlays, [light sources](../effects/light-sources.md), physics simulation, character [pathfinding](../characters/pathfinding.md), and more. The menu also contains a control for viewing/setting the camera scroll speed.

<img src="../assets/studio/general/Visualization-Options.png" width="780" alt="A close up view of the 3D viewport with the Visualization Options button indicated in the upper-right corner." />

## Commonly Used Windows

You can toggle on commonly used windows through the [View](../studio/view-tab.md) tab, including the [Explorer](../studio/explorer.md) window, [Properties](../studio/properties.md) window, [Asset&nbsp;Manager](../projects/assets/manager.md), [Toolbox](../projects/assets/toolbox.md), and many others.

<img src="../assets/studio/general/Toolbar-View-Tab.png" width="876" alt="Studio's toolbar and View tab with the tab highlighted." />

### Explorer

The [Explorer](../studio/explorer.md) window, visible by default, shows a hierarchical list of every object and service inside the place, collectively referred to as its **data model**. Frequently used services in the hierarchy include `Class.Workspace` which mirrors the [3D viewport](#3d-viewport), as well as `Class.ReplicatedStorage` and `Class.ServerStorage`.

<img src="../assets/studio/general/View-Tab-Explorer.png" width="876" alt="Studio's View tab with the Explorer button highlighted." />

<img src="../assets/studio/explorer/Location-In-Studio.png" width="800" alt="A close up view of the Explorer window next to a portion of the 3D viewport." />

### Properties

The [Properties](../studio/properties.md) window lets you adjust properties of a selected object to change how it looks and behaves. Object properties are divided into sections; for example, a `Class.MeshPart` includes sections like **Appearance** which allows you to change its color, material, transparency, and more.

<img src="../assets/studio/general/View-Tab-Properties.png" width="876" alt="Studio's View tab with the Properties button highlighted." />

<img src="../assets/studio/properties/Location-In-Studio.png" width="800" alt="A close up view of the Properties window next to a portion of the 3D viewport." />

At the bottom of the window, you can define custom [attributes](../studio/properties.md#instance-attributes) for an object, similar to its default properties. Attributes and their values are saved with your place/assets and they're an ideal way for team members to experiment with different values during runtime, even if they don't understand the underlying code.

<img src="../assets/studio/properties/Attributes-Example-B.png" alt="A close up view of the Attributes section of the Properties window." width="320" />

### Asset Manager

The [Asset Manager](../projects/assets/manager.md) lets you manage places, images, meshes, packages, audio, and models in your experience. It also provides a mechanism to bulk import large groups of assets.

<img src="../assets/studio/general/View-Tab-Asset-Manager.png" width="776" alt="Studio's View tab with the Asset Manager button highlighted." />

<img src="../assets/studio/asset-manager/Grid-View.png" width="360" alt="The Asset Manager window." />

### Toolbox

The [Toolbox](../projects/assets/toolbox.md) contains a selection of models, images, meshes, audio, plugins, videos, and fonts made by Roblox or Roblox community members. It also includes all of the creations that you've personally [distributed on the Creator Store](../production/creator-store.md) or those which were distributed by [groups](../projects/groups.md) you belong to.

<img src="../assets/studio/general/View-Tab-Toolbox.png" width="776" alt="Studio's View tab with the Toolbox button highlighted." />

<img src="../assets/studio/toolbox/Model-Search-Example.png" width="360" alt="The Toolbox window." />

### Output Window

The **Output** window, accessible from the [View](../studio/view-tab.md) tab, displays errors captured from running scripts, messages from Roblox engine, messages from calls to `print()`, and errors from calls to `warn()`. See [Output Window](../studio/output.md) for further details.

<img src="../assets/studio/general/View-Tab-Output.png" width="768" alt="Studio's View tab with the Output button highlighted." />

### Command Bar

The **Command Bar**, accessible from the [View](../studio/view-tab.md) tab, lets you execute Luau code outside of scripts. Similar to a terminal, pressing <kbd>↑</kbd> or <kbd>↓</kbd> while using the command bar navigates up and down among previously-executed commands. Clicking the small arrow on the right side similarly reveals a list of previously-executed commands.

<img src="../assets/studio/general/View-Tab-Command-Bar.png" width="768" alt="Studio's View tab with the Command Bar button highlighted." />

## Customizing the Layout

Studio's drag-and-drop interface lets you easily customize window layout to best suit your workflows.

### Repositioning Windows

You can reposition any window by click-dragging its **header bar**. As you begin dragging the window, the interface reveals **empty docking area** regions. If you drag the mouse pointer into any empty region, a floating **position selector** appears in that region. Dragging the pointer over the "center" of the floating selector targets the empty region as the dragged window's destination, indicated by the region darkening and becoming outlined.

<figure>
<img src="../assets/studio/general/Docking-Position-Selector-Empty.jpg" width="880" alt="Mouse pointer hovering over the 'center' icon of the position selector in an empty docking area, showing that region as the dragged window's destination." />
<figcaption>Mouse pointer hovering over the "center" icon of the position selector in an empty docking area</figcaption>
</figure>

If you drag the mouse pointer into a **populated** region such as the 3D viewport, a floating position selector appears with multiple options for the window's destination. For example, dragging the pointer over the "left" icon will position the window on the region's left side.

<Tabs>
  <TabItem label="Viewport Left">
	<img src="../assets/studio/general/Docking-Position-Selector-Left.jpg" width="880" height="520" alt="Mouse pointer hovering over the 'left half' icon of the position selector in a populated region, showing the left side of the region as the dragged window's destination." />
  </TabItem>
  <TabItem label="Viewport Right">
    <img src="../assets/studio/general/Docking-Position-Selector-Right.jpg" width="880" height="520" alt="Mouse pointer hovering over the 'right half' icon of the position selector in a populated region, showing the right side of the region as the dragged window's destination." />
  </TabItem>
</Tabs>

### Grouping Windows

If you drag a window into a **populated** region and choose the "center" icon of the [position selector](#repositioning-windows), the dragged window will group into that region as a tab. This allows you to set up tab groups of commonly used windows.

<figure>
  <img src="../assets/studio/general/Docking-Grouped-Tabs.png" width="320" alt="An example of an Explorer window if you choose the center icon of the position selection. It includes three tabs at the bottom of the window: the Explorer window, the Properties window, and the Terrain Editor window." />
  <figcaption>Three windows grouped together as tabs</figcaption>
</figure>

### Pinning Windows

To maximize screen space for the 3D viewport, you can **pin** windows (or&nbsp;an entire [group](#grouping-windows) of windows) to the edges of the overall Studio window. Once pinned, you can temporarily open any window by clicking its tab&nbsp;&mdash; this does not disturb other windows, and the expanded window will automatically collapse when you click in another window or click its tab again.

<figure>
  <img src="../assets/studio/general/Docking-Pinned-Tabs.jpg" width="800" alt="An example 3D viewport where the Explorer, Properties, and Terrain Editor windows are pinned to the right of the Studio window." />
  <figcaption>Three windows pinned to the right side of the Studio window</figcaption>
</figure>

To pin a window or an entire [group](#grouping-windows) of windows, click the "collapse" button. Alternatively, to un‑pin a pinned window/group, open it by clicking its tab, then click the "expand" button.

<img src="../assets/studio/general/Docking-Expand-Collapse.png" width="320" alt="A close up view of the Explorer window with the Collapse button highlighted." />

### Floating Windows

To float a window freely of other windows, simply drag‑and‑drop it without selecting any icon from the floating [position selector](#repositioning-windows).

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

   <img src="../assets/studio/general/Test-Tab-Playtest-Options.png" width="800" alt="Studio's Test tab with the Playtest button and it Mode Picker button highlighted." />

- **Multi-client simulation** for comparing how each client "sees" other clients within the experience.
- **Device emulation** that provides insight on how controls operate on a mobile device or how on-screen UI displays on different screens and aspect ratios.
- **Collaborative playtesting** with members of your [team group](../projects/setting-up-a-team.md).

See [Studio Testing Modes](../studio/testing-modes.md) for more information on each testing option.
