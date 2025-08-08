---
title: Studio interface
description: User interface overview for Roblox Studio, the essential building tool for Roblox experiences.
---

import BetaAlert from '../includes/beta-features/beta-alert.md'

## Toolbar

The **toolbar** resides at the top of Studio. The buttons and tools visible in the bar change when you click on the [Home](../studio/home-tab.md), [Model](../studio/model-tab.md), [Avatar](../studio/avatar-tab.md), [Test](../studio/test-tab.md), [View](../studio/view-tab.md), and [Plugins](../studio/plugins-tab.md) tabs.

<img src="../assets/studio/general/Toolbar-Tabs-Labeled.png"
   width="800" alt="Studio's toolbar with the Home, Model, Avatar, Test, View, and Plugins tabs highlighted." />

<Grid container spacing={2}>
	<Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../assets/misc/Box-Label-A.png" width="40" style={{float:"right"}} /></Grid>
	<Grid item XSmall={10} Medium={11} Large={11} XLarge={11} style={{marginTop:"4px"}}>
	The [Home](../studio/home-tab.md) tab contains basic tools for manipulating 3D objects and testing your experience.
	</Grid>
</Grid>
<Grid container spacing={2}>
	<Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../assets/misc/Box-Label-B.png" width="40" style={{float:"right"}} /></Grid>
	<Grid item XSmall={10} Medium={11} Large={11} XLarge={11} style={{marginTop:"4px"}}>
	The [Model](../studio/model-tab.md) tab contains tools for manipulating 3D objects in the workspace, creating detailed models, working with physical constraints, and adding advanced objects.
	</Grid>
</Grid>
<Grid container spacing={2}>
	<Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../assets/misc/Box-Label-C.png" width="40" style={{float:"right"}} /></Grid>
	<Grid item XSmall={10} Medium={11} Large={11} XLarge={11} style={{marginTop:"4px"}}>
	The [Avatar](../studio/avatar-tab.md) tab contains specialized tools for creating and fitting accessories, importing custom meshes, building default rigs, and creating animations.
	</Grid>
</Grid>
<Grid container spacing={2}>
	<Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../assets/misc/Box-Label-D.png" width="40" style={{float:"right"}} /></Grid>
	<Grid item XSmall={10} Medium={11} Large={11} XLarge={11} style={{marginTop:"4px"}}>
	The [Test](../studio/test-tab.md) tab contains tools for testing an experience, simulating multiple clients, and emulating different devices.
	</Grid>
</Grid>
<Grid container spacing={2}>
	<Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../assets/misc/Box-Label-E.png" width="40" style={{float:"right"}} /></Grid>
	<Grid item XSmall={10} Medium={11} Large={11} XLarge={11} style={{marginTop:"4px"}}>
	The [View](../studio/view-tab.md) tab lets you toggle the various windows of Studio, as well as several display features.
	</Grid>
</Grid>
<Grid container spacing={2}>
	<Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../assets/misc/Box-Label-F.png" width="40" style={{float:"right"}} /></Grid>
	<Grid item XSmall={10} Medium={11} Large={11} XLarge={11} style={{marginTop:"4px"}}>
	The [Plugins](../studio/plugins-tab.md) tab contains tools for managing [plugins](../studio/plugins.md), configuring localization, and creating animations. Any plugins you install can also add buttons to this tab.
	</Grid>
</Grid>

## 3D viewport

The 3D viewport represents the `Class.Workspace` of a place. From here, you can move the camera around the virtual world, manipulate objects with the mouse, and playtest an experience without leaving Studio.

<figure>
	<img
		src="../assets/studio/general/Editor-Window.jpg"
		width="100%" alt="An example viewport display of a desert environment with multiple stone pillars. One of the pillars displays movement visual aids from the Move tool." />
	<figcaption>3D viewport in Roblox Studio</figcaption>
</figure>

### Camera controls

Inside the viewport, you can move the camera with the following controls. See also [Studio shortcuts](../studio/shortcuts.md#camera-controls) for additional key shortcuts.

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
    <td>In combination with any movement key, changes the camera speed. If desired, you can [customize](../studio/setup.md#customization) the camera speed within Studio's settings.</td>
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
		<td>Pressing the right mouse button and scrolling the mouse wheel **up** increases the camera scroll speed. Conversely, pressing the right mouse button and scrolling the mouse wheel **down** reduces the camera scroll speed.<BetaAlert betaName="New Studio Camera Controls" leadIn="This feature is currently in beta. Enable it through " leadOut="." components={props.components} /><Alert severity="success">Camera scroll speed is also adjustable from the [visualization options](#visualization-options) menu in the upper‑right corner of the 3D viewport.</Alert></td>
	</tr>
</tbody>
</table>

### Object selection

As you hover over parts and models in the viewport, they are outlined to indicate their potential selection. You can select an outlined object by clicking it, or you can select multiple objects by holding <kbd>Shift</kbd>, <kbd>Ctrl</kbd>, or <kbd>⌘</kbd> as you hover over and click them.

<img src="../assets/studio/general/Editor-Window-Object-Selection.jpg" width="800" alt="A warehouse environment with the stairs and multiple pallet box objects with a blue highlight to signify that they are selected in the 3D viewport."/>

<h4>Selection cycling</h4>

In more complex environments or when zoomed in, objects will commonly be hidden from your view by other objects in front. To select hidden objects without moving the camera around, hold <kbd>Alt</kbd> or <kbd>⌥</kbd> and click to perform **selection&nbsp;cycling** to the next further object behind the currently selected object.

<figure>
  <video src="../assets/studio/general/Selection-Cycling.mp4" controls width="800" alt="Video showing selection cycling through a model"></video>
  <figcaption>Selection cycling</figcaption>
</figure>

<h4>Children or parents</h4>

When one or more objects or [models](../parts/models.md) are selected in the [Explorer](../studio/explorer.md) window, you can select all of their **children** by right-clicking and choosing **Select&nbsp;Children** from the context menu. Similarly, right-clicking and choosing **Select&nbsp;Parent(s)** selects the **direct parents** of those objects.

<h4>Selection style</h4>

To display **outlines** and/or **bounding boxes** around selected objects, choose an option from the **Selection Style** menu in the [View](../studio/view-tab.md) tab.

<img src="../assets/studio/general/View-Tab-Selection-Style.png" width="670" alt="Studio's View tab with the Selection Style tool highlighted." />

<img src="../assets/studio/general/Selected-Object-Bounding-Box.jpg" width="800" alt="A warehouse environment with rope object's selection outline and bounding box highlighted." />

### Visualization options

In the upper-right corner of the 3D viewport, you can quickly toggle or set common visualization options related to [on‑screen&nbsp;UI](../ui/on-screen-containers.md) overlays, [light sources](../effects/light-sources.md), physics simulation, character [pathfinding](../characters/pathfinding.md), and more. The menu also contains a control for viewing/setting the camera scroll speed.

<img src="../assets/studio/general/Visualization-Options.png" width="780" alt="A close up view of the 3D viewport with the Visualization Options button indicated in the upper-right corner." />

## Common windows

You can toggle on commonly used windows through the [View](../studio/view-tab.md) tab, including the [Explorer](../studio/explorer.md) window, [Properties](../studio/properties.md) window, [Asset Manager](../projects/assets/manager.md), [Toolbox](../projects/assets/toolbox.md), and many others.

<img src="../assets/studio/general/Toolbar-View-Tab.png" width="876" alt="Studio's toolbar and View tab with the tab highlighted." />

### Explorer

The [Explorer](../studio/explorer.md) window, visible by default, shows a hierarchical list of every object and service inside the place, collectively referred to as its **data model**. Frequently used services in the hierarchy include `Class.Workspace` which mirrors the [3D viewport](#3d-viewport), as well as `Class.ReplicatedStorage` and `Class.ServerStorage`.

<img src="../assets/studio/general/View-Tab-Explorer.png" width="876" alt="Studio's View tab with the Explorer button highlighted." />

<img src="../assets/studio/explorer/Parent-Child-Hierarchy.png" width="320" alt="Explorer hierarchy showing Camera, Terrain, and SignModel as children of Workspace; Board and Post as children of SignModel" />

### Properties

The [Properties](../studio/properties.md) window lets you adjust properties of a selected object to change how it looks and behaves. Object properties are divided into sections; for example, a `Class.MeshPart` includes sections like **Appearance** which allows you to change its color, material, transparency, and more.

<img src="../assets/studio/general/View-Tab-Properties.png" width="876" alt="Studio's View tab with the Properties button highlighted." />

<img src="../assets/studio/properties/Sections-Example.png" width="320" />

At the bottom of the window, you can define custom [attributes](../studio/properties.md#instance-attributes) for an object, similar to its default properties. Attributes and their values are saved with your place/assets and they're an ideal way for team members to experiment with different values during runtime, even if they don't understand the underlying code.

<img src="../assets/studio/properties/Attributes-Example-B.png" alt="A close up view of the Attributes section of the Properties window." width="320" />

### Asset Manager

The [Asset Manager](../projects/assets/manager.md) lets you manage places, images, meshes, audio, and more. It also provides a mechanism to bulk import large groups of assets.

<img src="../assets/studio/general/View-Tab-Asset-Manager.png" width="776" alt="Studio's View tab with the Asset Manager button highlighted." />

### Toolbox

The [Toolbox](../projects/assets/toolbox.md) contains a selection of models, images, meshes, audio, plugins, videos, and fonts made by Roblox or Roblox community members. It also includes all of the creations that you've personally [distributed on the Creator Store](../production/creator-store.md) or those which were distributed by [groups](../projects/groups.md) you belong to.

<img src="../assets/studio/general/View-Tab-Toolbox.png" width="776" alt="Studio's View tab with the Toolbox button highlighted." />

<img src="../assets/studio/toolbox/Model-Search-Example.png" width="360" alt="The Toolbox window." />

### Output

The [Output](../studio/output.md) window, accessible from the [View](../studio/view-tab.md) tab, displays errors captured from running scripts, messages from Roblox Engine, messages from calls to `print()`, and errors from calls to `warn()`.

<img src="../assets/studio/general/View-Tab-Output.png" width="768" alt="Studio's View tab with the Output button highlighted." />

### Command Bar

The **Command Bar**, accessible from the [View](../studio/view-tab.md) tab, lets you execute Luau code outside of scripts. Similar to a terminal, pressing <kbd>↑</kbd> or <kbd>↓</kbd> while using the command bar navigates up and down among previously-executed commands. Clicking the small arrow on the right side similarly reveals a list of previously-executed commands.

<img src="../assets/studio/general/View-Tab-Command-Bar.png" width="768" alt="Studio's View tab with the Command Bar button highlighted." />

## Layout customization

Studio's drag-and-drop interface lets you easily customize window layout to best suit your workflows.

### Reposition windows

You can reposition any window by click-dragging its **header bar**. As you begin dragging the window, the interface reveals **empty docking area** regions. If you drag the mouse pointer into any empty region, a floating **position selector** appears in that region. Dragging the pointer over the "center" of the floating selector targets the empty region as the dragged window's destination, indicated by the region darkening and becoming outlined.

<figure>
<img src="../assets/studio/general/Docking-Position-Selector-Empty.jpg" width="880" alt="Mouse pointer hovering over the 'center' icon of the position selector in an empty docking area, showing that region as the dragged window's destination." />
<figcaption>Mouse pointer hovering over the "center" icon of the position selector in an empty docking area</figcaption>
</figure>

If you drag the mouse pointer into a **populated** region such as the 3D viewport, a floating position selector appears with multiple options for the window's destination. For example, dragging the pointer over the "left" icon will position the window on the region's left side.

<Tabs>
  <TabItem label="Viewport left">
	<img src="../assets/studio/general/Docking-Position-Selector-Left.jpg" width="880" height="520" alt="Mouse pointer hovering over the 'left half' icon of the position selector in a populated region, showing the left side of the region as the dragged window's destination." />
  </TabItem>
  <TabItem label="Viewport right">
    <img src="../assets/studio/general/Docking-Position-Selector-Right.jpg" width="880" height="520" alt="Mouse pointer hovering over the 'right half' icon of the position selector in a populated region, showing the right side of the region as the dragged window's destination." />
  </TabItem>
</Tabs>

### Group windows

If you drag a window into a **populated** region and choose the "center" icon of the [position selector](#reposition-windows), the dragged window will group into that region as a tab. This allows you to set up tab groups of commonly used windows.

<figure>
  <img src="../assets/studio/general/Docking-Grouped-Tabs.png" width="320" alt="An example of an Explorer window if you choose the center icon of the position selection. It includes three tabs at the bottom of the window: the Explorer window, the Properties window, and the Terrain Editor window." />
  <figcaption>Three windows grouped together as tabs</figcaption>
</figure>

### Pin windows

To maximize screen space for the 3D viewport, you can **pin** windows (or&nbsp;an entire [group](#group-windows) of windows) to the edges of the overall Studio window. Once pinned, you can temporarily open any window by clicking its tab&nbsp;&mdash; this does not disturb other windows, and the expanded window will automatically collapse when you click in another window or click its tab again.

<figure>
  <img src="../assets/studio/general/Docking-Pinned-Tabs.jpg" width="800" alt="An example 3D viewport where the Explorer, Properties, and Terrain Editor windows are pinned to the right of the Studio window." />
  <figcaption>Three windows pinned to the right side of the Studio window</figcaption>
</figure>

To pin a window or an entire [group](#group-windows) of windows, click the "collapse" button. Alternatively, to un‑pin a pinned window/group, open it by clicking its tab, then click the "expand" button.

<img src="../assets/studio/general/Docking-Expand-Collapse.png" width="320" alt="A close up view of the Explorer window with the Collapse button highlighted." />

### Float windows

To float a window freely of other windows, simply drag‑and‑drop it without selecting any icon from the floating [position selector](#reposition-windows).

## In-Studio testing

Studio offers a suite of options for testing an experience before [releasing it to the public](../production/publishing/publish-experiences-and-places.md#release-to-the-public). All of the testing options are accessible from the [Test](../studio/test-tab.md) tab.

- [Rapid paytesting](../studio/testing-modes.md#playtest-options) &mdash; Provides a close simulation of the experience running on the Roblox application.
- [Multi-client simulation](../studio/testing-modes.md#multi-client-simulation) &mdash; Compares how each client "sees" other clients within the experience.
- [Device emulation](../studio/testing-modes.md#device-emulation) &mdash; Provides insight on how controls operate on a mobile device or how on-screen UI displays on different screens and aspect ratios.
- [Controller emulation](../studio/testing-modes.md#controller-emulation) &mdash; Accurately emulates [gamepad input](../input/gamepad.md) directly in Studio.

See [Studio testing modes](../studio/testing-modes.md) for more information on each testing option.

## Next-gen toolbar mapping

<BetaAlert betaName="Next Gen Studio Preview" leadIn="The following remapping reference applies to the next-gen Studio toolbar beta, enabled through " leadOut="." components={props.components} />

The [next-gen Studio toolbar](https://devforum.roblox.com/t/next-gen-studio-preparing-for-takeoff-beta/3634123) introduces a wide array of improvements and optimizations, including cleaner appearance, customizable tabs with your own tool collections, and the ability to show/hide tabs as desired. The following tables map the previous Studio toolbar workflows to next‑gen equivalents.

<Tabs>
<TabItem label="General">
<table size="small">
	<thead>
		<tr>
			<th width="20%">Action/Tool</th>
			<th width="40%">Legacy Workflow(s)</th>
			<th width="40%">New Workflow(s)</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Notifications</td>
			<td>Right side of mezzanine bar</td>
			<td><Chip label="no change" size="small" color="success" variant="outlined" /></td>
		</tr>
		<tr>
			<td>Online Help</td>
			<td>Right side of mezzanine bar or **File** menu</td>
			<td>Application's **Help** menu</td>
		</tr>
		<tr>
			<td>Share</td>
			<td>Right side of mezzanine bar</td>
			<td><Chip label="no change" size="small" color="success" variant="outlined" /></td>
		</tr>
		<tr>
			<td>[Assistant](../assistant/guide.md)</td>
			<td>Right side of mezzanine bar or **View** tab</td>
			<td>Right side of mezzanine bar</td>
		</tr>
		<tr>
			<td>Account Menu</td>
			<td>Right side of mezzanine bar</td>
			<td><Chip label="no change" size="small" color="success" variant="outlined" /></td>
		</tr>
		<tr>
			<td>[Studio Settings](./setup.md#customization)</td>
			<td>**File** menu</td>
			<td>Windows: **File** menu&nbsp;⟩ **Studio Settings**<br />macOS: Application's main menu&nbsp;⟩ **Studio Settings**</td>
		</tr>
		<tr>
			<td>Beta Features</td>
			<td>**File** menu</td>
			<td>Application's **File** menu&nbsp;⟩ **Beta&nbsp;Features**</td>
		</tr>
		<tr>
			<td>Save to Roblox&nbsp;/&nbsp;As…</td>
			<td>**File** menu</td>
			<td>Application's **File** menu&nbsp;⟩ **Save&nbsp;to&nbsp;Roblox**&nbsp;/&nbsp;**As…**</td>
		</tr>
		<tr>
			<td>Publish to Roblox&nbsp;/&nbsp;As…</td>
			<td>**File** menu</td>
			<td>Application's **File** menu&nbsp;⟩ **Publish&nbsp;to&nbsp;Roblox**&nbsp;/&nbsp;**As…**</td>
		</tr>
				<tr>
			<td>[Explorer](./explorer.md)</td>
			<td>**View** tab</td>
			<td>🄐 **Home** tab&nbsp;⟩ **Explorer**<br />🄑 Application's **Window** menu&nbsp;⟩ **Explorer**</td>
		</tr>
		<tr>
			<td>[Properties](./properties.md)</td>
			<td>**View** tab</td>
			<td>🄐 **Home** tab&nbsp;⟩ **Properties**<br />🄑 Application's **Window** menu&nbsp;⟩ **Properties**</td>
		</tr>
		<tr>
			<td>[Asset Manager](../projects/assets/manager.md)</td>
			<td>**View** tab</td>
			<td>Application's **Window** menu&nbsp;⟩ **Asset&nbsp;Manager**</td>
		</tr>
		<tr>
			<td>[Toolbox](../projects/assets/toolbox.md)</td>
			<td>**View** tab</td>
			<td>🄐 **Home** tab&nbsp;⟩ **Toolbox**<br />🄑 Application's **Window** menu&nbsp;⟩ **Toolbox**</td>
		</tr>
		<tr>
			<td>[Terrain Editor](./terrain-editor.md)</td>
			<td>**Home** or **View** tab</td>
			<td>Application's **Window** menu&nbsp;⟩ **3D**&nbsp;⟩ **Terrain**</td>
		</tr>
		<tr>
			<td>[Output](./output.md)</td>
			<td>**View** tab</td>
			<td>🄐 Application's **Window** menu&nbsp;⟩ **Output**<br />🄑 **Script** tab&nbsp;⟩ **Output**</td>
		</tr>
		<tr>
			<td>[Game Settings](./game-settings.md)</td>
			<td>**File** menu or **Home** tab</td>
			<td>Application's **File** menu&nbsp;⟩ **Game&nbsp;Settings**</td>
		</tr>
		<tr>
			<td>[Avatar Settings](./avatar-settings.md)</td>
			<td>**File** menu or **Avatar** tab</td>
			<td>🄐 **Avatar** tab&nbsp;⟩ **Avatar Settings**<br />🄑 Application's **File** menu&nbsp;⟩ **Avatar&nbsp;Settings**</td>
		</tr>
		<tr>
			<td>[Command Bar](#command-bar)</td>
			<td>**View** tab</td>
			<td>🄐 Application's **Window** menu&nbsp;⟩ **Script**&nbsp;⟩ **Command&nbsp;Bar**<br />🄑 **Script** tab&nbsp;⟩ **Command**</td>
		</tr>
		<tr>
			<td>[Manage Plugins](./plugins-tab.md#manage-plugins)</td>
			<td>**Plugins** tab</td>
			<td>Application's **Plugins** menu&nbsp;⟩ **Manage&nbsp;Plugins**</td>
		</tr>
		<tr>
			<td>Plugins Folder</td>
			<td>**Plugins** tab</td>
			<td>Application's **Plugins** menu&nbsp;⟩ **Plugins&nbsp;Folder**</td>
		</tr>
		<tr>
			<td>Tools (Localization)</td>
			<td>**Plugins** tab</td>
			<td>Application's **Window** menu&nbsp;⟩ **Localization**&nbsp;⟩ **Localization&nbsp;Tool**</td>
		</tr>
		<tr>
			<td>Object Browser</td>
			<td>**View** tab</td>
			<td>Application's **Window** menu&nbsp;⟩ **Script**&nbsp;⟩ **Object&nbsp;Browser**</td>
		</tr>
		<tr>
			<td>Tag Editor</td>
			<td>**View** tab</td>
			<td>Application's **Window** menu&nbsp;⟩ **Script**&nbsp;⟩ **Tag&nbsp;Editor**</td>
		</tr>
	</tbody>
</table>

</TabItem>
<TabItem label="Editing/Modeling">
<table size="small">
	<thead>
		<tr>
			<th width="20%">Action/Tool</th>
			<th width="40%">Legacy Workflow(s)</th>
			<th width="40%">New Workflow(s)</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Copy, Cut, Paste, Duplicate</td>
			<td>**Home** tab</td>
			<td>Application's **Edit** menu</td>
		</tr>
		<tr>
			<td>Select, Move, Scale, Rotate, Transform</td>
			<td>**Home**, **Model**, or **Avatar** tab</td>
			<td><Chip label="no change" size="small" color="success" variant="outlined" /></td>
		</tr>
		<tr>
			<td>Mode picker (geometric vs. physical)</td>
			<td>**Home**, **Model**, or **Avatar** tab</td>
			<td><Chip label="no change" size="small" color="success" variant="outlined" /></td>
		</tr>
		<tr>
			<td>Collisions & Join Surfaces toggles</td>
			<td>**Home**, **Model**, or **Avatar** tab</td>
			<td>**Home**, **Model**, or **Avatar** tab&nbsp;⟩ Mode picker&nbsp;⟩ Options in popup menu</td>
		</tr>
		<tr>
			<td>Rotate/Move snapping and increments</td>
			<td>**Model** or **Avatar** tab</td>
			<td>**Home**, **Model**, or **Avatar** tab</td>
		</tr>
		<tr>
			<td>[Part pick/insert](../parts/index.md#insert-parts)</td>
			<td>**Home** or **Model** tab</td>
			<td><Chip label="no change" size="small" color="success" variant="outlined" /></td>
		</tr>
		<tr>
			<td>[Color pick/apply](../parts/index.md#hexagon-map)</td>
			<td>**Home** or **Model** tab</td>
			<td><Chip label="no change" size="small" color="success" variant="outlined" /></td>
		</tr>
		<tr>
			<td>[Material pick/apply](../parts/materials.md#material-widget)</td>
			<td>**Home** or **Model** tab</td>
			<td><Chip label="no change" size="small" color="success" variant="outlined" /></td>
		</tr>
		<tr>
			<td>[Material Manager](../parts/materials.md#material-manager)</td>
			<td>**Home** or **Model** tab&nbsp;⟩ Material picker dropdown&nbsp;⟩ **Material&nbsp;Manager**</td>
			<td>Application's **Window** menu&nbsp;⟩ **3D**&nbsp;⟩ **Material**</td>
		</tr>
		<tr>
			<td>Group</td>
			<td>**Home** or **Model** tab</td>
			<td>🄐 **Home** or **Model** tab&nbsp;⟩ **Group**<br />🄑 Application's **Edit** menu&nbsp;⟩ **Group**</td>
		</tr>
		<tr>
			<td>Lock</td>
			<td>**Home** or **Model** tab</td>
			<td>🄐 **Home** or **Model** tab&nbsp;⟩ **Lock**<br />🄑 Application's **Edit** menu&nbsp;⟩ **Lock**</td>
		</tr>
		<tr>
			<td>Anchor</td>
			<td>**Home** or **Model** tab</td>
			<td>🄐 **Home** or **Model** tab&nbsp;⟩ **Anchor**<br />🄑 Application's **Edit** menu&nbsp;⟩ **Anchor**</td>
		</tr>
				<tr>
			<td>[Import 3D](../art/modeling/3d-importer.md)</td>
			<td>**Home** or **Avatar** tab</td>
			<td>🄐 **Home** tab&nbsp;⟩ **Import&nbsp;3D**<br />🄑 Application's **File** menu&nbsp;⟩ **Import&nbsp;3D**</td>
		</tr>
		<tr>
			<td>[Animation Editor](../animation/editor.md)</td>
			<td>**Avatar** or **View** tab</td>
			<td>🄐 **Avatar** tab&nbsp;⟩ **Animation**<br />🄑 Application's **Window** menu&nbsp;⟩ **Avatar**&nbsp;⟩ **Animation**</td>
		</tr>
		<tr>
			<td>[Accessory Fitting Tool](../art/accessories/accessory-fitting-tool.md)</td>
			<td>**Avatar** tab</td>
			<td>🄐 **Avatar** tab&nbsp;⟩ **Accessory**<br />🄑 Application's **Window** menu&nbsp;⟩ **Avatar**&nbsp;⟩ **Accessory**</td>
		</tr>
		<tr>
			<td>[Rig Builder](./rig-builder.md)</td>
			<td>**Avatar** tab</td>
			<td>**Home** or **Avatar** tab&nbsp;⟩ **Character**</td>
		</tr>
		<tr>
			<td>[Avatar Setup](../avatar-setup/index.md)</td>
			<td>**Avatar** tab</td>
			<td>🄐 **Avatar** tab&nbsp;⟩ **Setup**<br />🄑 Application's **Window** menu&nbsp;⟩ **Avatar**&nbsp;⟩ **Setup**</td>
		</tr>
		<tr>
			<td>Show UI tools</td>
			<td>**Home** tab</td>
			<td>**UI** tab always present by default</td>
		</tr>
		<tr>
			<td>[Pivot tools](./pivot-tools.md)</td>
			<td>**Model** tab</td>
			<td><Chip label="no change" size="small" color="success" variant="outlined" /></td>
		</tr>
		<tr>
			<td>[Align tool](./align-tool.md)</td>
			<td>**Model** tab</td>
			<td>🄐 **Model** tab&nbsp;⟩ **Align**<br />🄑 Application's **Window** menu&nbsp;⟩ **3D**&nbsp;⟩ **Align**</td>
		</tr>
		<tr>
			<td>[Material Generator](./material-generator.md)</td>
			<td>**Home** or **Model** tab&nbsp;⟩ Material picker dropdown&nbsp;⟩ **Generate**</td>
			<td>Application's **Window** menu&nbsp;⟩ **3D**&nbsp;⟩ **Material&nbsp;Generator**</td>
		</tr>
		<tr>
			<td>[Solid modeling tools](../parts/solid-modeling.md)</td>
			<td>**Model** tab</td>
			<td><Chip label="no change" size="small" color="success" variant="outlined" /></td>
		</tr>
		<tr>
			<td>[Constraint pick/insert](../physics/index.md#constraints)</td>
			<td>**Model** tab</td>
			<td>Three separate buttons in the **Model** tab for inserting an `Class.Attachment`, [mechanical](../physics/mover-constraints.md) or [mover](../physics/mechanical-constraints.md) constraint, `Class.WeldConstraint`, or `Class.NoCollisionConstraint`</td>
		</tr>
		<tr>
			<td>Show Welds toggle</td>
			<td>**Model** tab</td>
			<td>Application's **View** menu&nbsp;⟩ **Show&nbsp;Welds**</td>
		</tr>
		<tr>
			<td>Show Constraint Details toggle</td>
			<td>**Model** tab</td>
			<td>Application's **View** menu&nbsp;⟩ **Show&nbsp;Constraint&nbsp;Details**</td>
		</tr>
		<tr>
			<td>[Effect pick/insert](../effects/index.md)</td>
			<td>**Model** tab</td>
			<td><Chip label="no change" size="small" color="success" variant="outlined" /></td>
		</tr>
		<tr>
			<td>Spawn inserter</td>
			<td>**Model** tab</td>
			<td><Chip label="removed" size="small" color="error" variant="outlined" /> — Use standard insertion methods to insert a `Class.SpawnLocation`</td>
		</tr>
		<tr>
			<td>Advanced&nbsp;⟩ Insert Object</td>
			<td>**Model** tab</td>
			<td>Application's **Window** menu&nbsp;⟩ **Insert Object**</td>
		</tr>
		<tr>
			<td>Advanced&nbsp;⟩ Model</td>
			<td>**Model** tab</td>
			<td><Chip label="removed" size="small" color="error" variant="outlined" /> — Use **File** menu&nbsp;⟩ **Import&nbsp;3D**</td>
		</tr>
		<tr>
			<td>Advanced&nbsp;⟩ Service</td>
			<td>**Model** tab</td>
			<td>Right‑click over any visible service in the [Explorer](./explorer.md) and select **Show&nbsp;Services…** from the context menu</td>
		</tr>
		<tr>
			<td>Advanced&nbsp;⟩ Collision Groups</td>
			<td>**Model** tab</td>
			<td>Application's **Window** menu&nbsp;⟩ **3D**&nbsp;⟩ **Collision&nbsp;Groups**</td>
		</tr>
		<tr>
			<td>Advanced&nbsp;⟩ Run Script</td>
			<td>**Model** tab</td>
			<td>Application's **Window** menu&nbsp;⟩ **Script**&nbsp;⟩ **Run&nbsp;Script**</td>
		</tr>
		<tr>
			<td>Advanced&nbsp;⟩ Script, Local&nbsp;Script, Module&nbsp;Script</td>
			<td>**Model** tab</td>
			<td>**Home** or **Script** tab&nbsp;⟩ **Script** pick/insert</td>
		</tr>
	</tbody>
</table>

</TabItem>
<TabItem label="Collaboration">
<table size="small">
	<thead>
		<tr>
			<th width="20%">Action/Tool</th>
			<th width="40%">Legacy Workflow(s)</th>
			<th width="40%">New Workflow(s)</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>[Collaborate](../projects/collaboration.md) button</td>
			<td>Right side of mezzanine bar</td>
			<td><Chip label="no change" size="small" color="success" variant="outlined" /></td>
		</tr>
		<tr>
		<td>[Manage Collaborators](../projects/collaboration.md#manage-collaborators)</td>
			<td>Right side of mezzanine bar</td>
			<td>🄐 Right side of mezzanine bar<br />🄑 Application's **Window** menu&nbsp;⟩ **Collaboration**&nbsp;⟩ **Invite**/**Manage** **Collaborators**</td>
		</tr>
		<tr>
			<td>[Live Collaborators](../projects/collaboration.md#view-collaborators) window</td>
			<td>Right side of mezzanine bar</td>
			<td>🄐 Right side of mezzanine bar<br />🄑 Application's **Window** menu&nbsp;⟩ **Collaboration**&nbsp;⟩ **Live&nbsp;Collaborators**</td>
		</tr>
		<tr>
			<td>[Comments](../projects/collaboration.md#comments) window</td>
			<td>**View** tab</td>
			<td>Application's **Window** menu&nbsp;⟩ **Collaboration**&nbsp;⟩ **Comments**</td>
		</tr>
		<tr>
			<td>Create [comment](../projects/collaboration.md#create-comments)</td>
			<td>Right side of mezzanine bar</td>
			<td><Chip label="no change" size="small" color="success" variant="outlined" /></td>
		</tr>
		<tr>
			<td>[Activity History](../projects/activity-history.md)</td>
			<td>**View** tab</td>
			<td>Application's **Window** menu&nbsp;⟩ **Activity&nbsp;History**</td>
		</tr>
		<tr>
			<td>Team Create</td>
			<td>**View** tab</td>
			<td>Application's **Window** menu&nbsp;⟩ **Collaboration**&nbsp;⟩ **Team&nbsp;Create**</td>
		</tr>
	</tbody>
</table>

</TabItem>
<TabItem label="Testing/Visualization">
<table size="small">
		<thead>
		<tr>
			<th width="20%">Action/Tool</th>
			<th width="40%">Legacy Workflow(s)</th>
			<th width="40%">New Workflow(s)</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Playtest mode</td>
			<td>**Home** or **Test** tab</td>
			<td>🄐 Left side of mezzanine bar&nbsp;⟩ Mode picker<br />🄑 Options in application's **Test** menu</td>
		</tr>
		<tr>
			<td>Playtest buttons</td>
			<td>**Home** or **Test** tab, or left side of mezzanine bar</td>
			<td>🄐 Left side of mezzanine bar<br />🄑 Options in application's **Test** menu</td>
		</tr>
		<tr>
			<td>[Client/server toggle](./testing-modes.md#toggle-clientserver)</td>
			<td>**Home** or **Test** tab</td>
			<td>🄐 Left side of mezzanine bar<br />🄑 Application's **Test** menu&nbsp;⟩ **Client/Server**</td>
		</tr>
		<tr>
			<td>[Pause/resume physics](./testing-modes.md#pause-and-resume-physics)</td>
			<td>**Test** tab</td>
			<td>Options appear contextually on the left side of mezzanine bar or within application's **Test** menu while playtesting</td>
		</tr>
		<tr>
			<td>[Multi-client simulation](./testing-modes.md#multi-client-simulation)</td>
			<td>**Test** tab</td>
			<td>🄐 Left side of mezzanine bar&nbsp;⟩ Mode picker&nbsp;⟩ **Server&nbsp;&&nbsp;Clients**<br />🄑 Application's **Test** menu&nbsp;⟩ **Start Test Session**&nbsp;⟩ **Server and Clients**</td>
		</tr>
		<tr>
			<td>[Device Emulator](./testing-modes.md#device-emulation)</td>
			<td>**Test** tab</td>
			<td>Application's **Test** menu&nbsp;⟩ **Device&nbsp;Emulator**</td>
		</tr>
		<tr>
			<td>[Controller Emulator](./testing-modes.md#controller-emulation)</td>
			<td>**Test** tab</td>
			<td>Application's **Test** menu&nbsp;⟩ **Controller&nbsp;Emulator**</td>
		</tr>
		<tr>
			<td>[Player Emulator](./testing-modes.md#player-emulation)</td>
			<td>**Test** tab</td>
			<td>Application's **Test** menu&nbsp;⟩ **Player&nbsp;Emulator**</td>
		</tr>
		<tr>
			<td>View Selector</td>
			<td>**View** tab</td>
			<td>Application's **View** menu&nbsp;⟩ **Show&nbsp;View&nbsp;Selector**</td>
		</tr>
		<tr>
			<td>Grid visualization</td>
			<td>**View** tab</td>
			<td>Application's **View** menu&nbsp;⟩ **Show&nbsp;Grid** & **Show&nbsp;Grid&nbsp;Material**</td>
		</tr>
		<tr>
			<td>Wireframe Rendering</td>
			<td>**View** tab</td>
			<td>Application's **View** menu&nbsp;⟩ **Show&nbsp;Wireframe&nbsp;Rendering**</td>
		</tr>
		<tr>
			<td>UI Visibility</td>
			<td>**View** tab</td>
			<td>Application's **View** menu&nbsp;⟩ **Show&nbsp;UI**</td>
		</tr>
		<tr>
			<td>[Wind Direction](../environment/global-wind.md#wind-direction-widget)</td>
			<td>**View** tab</td>
			<td>Application's **View** menu&nbsp;⟩ **Show&nbsp;Wind&nbsp;Direction**</td>
		</tr>
		<tr>
			<td>[Selection Style](./ui-overview.md#object-selection)</td>
			<td>**View** tab</td>
			<td>Options in the **View** section of the [Visualization&nbsp;Options](#visualization-options) widget</td>
		</tr>
		<tr>
			<td>Team Test</td>
			<td>**Home** tab</td>
			<td>Application's **Test** menu&nbsp;⟩ **Start Test Session**&nbsp;⟩ **Team Test**</td>
		</tr>
		<tr>
			<td>Mute</td>
			<td>**Test** tab</td>
			<td>Application's **View** menu&nbsp;⟩ **Mute**</td>
		</tr>
		<tr>
			<td>Screen Shot</td>
			<td>**View** tab</td>
			<td>Application's **View** menu&nbsp;⟩ **Screenshot**</td>
		</tr>
	</tbody>
</table>

</TabItem>
<TabItem label="Scripting/Debugging">
<table size="small">
	<thead>
		<tr>
			<th width="20%">Action/Tool</th>
			<th width="40%">Legacy Workflow(s)</th>
			<th width="40%">New Workflow(s)</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Back, Fwd</td>
			<td>**Script** tab</td>
			<td><Chip label="no change" size="small" color="success" variant="outlined" /></td>
		</tr>
		<tr>
		<td>Find/Replace (basic)</td>
			<td>**Script** tab</td>
			<td>**Script** tab&nbsp;⟩ **Find** button popup&nbsp;⟩ **Find…**</td>
		</tr>
		<tr>
			<td>Find/Replace (advanced)</td>
			<td>**Script** tab</td>
			<td>🄐 **Script** tab&nbsp;⟩ **Find** button popup&nbsp;⟩ **Find&nbsp;All**<br />🄑 Application's **Window** menu&nbsp;⟩ **Script**&nbsp;⟩ **Find&nbsp;All&nbsp;/&nbsp;Replace&nbsp;All**</td>
		</tr>
		<tr>
		<td>Go to Line</td>
			<td>**Script** tab</td>
			<td><Chip label="no change" size="small" color="success" variant="outlined" /></td>
		</tr>
		<tr>
			<td>Replace</td>
			<td>**Script** tab</td>
			<td><Chip label="removed by default" size="small" color="warning" variant="outlined" /> — Can be re‑added to a custom tab through **Add&nbsp;Tools**&nbsp;⟩ **Replace**</td>
		</tr>
		<tr>
			<td>Select</td>
			<td>**Script** tab</td>
			<td><Chip label="removed" size="small" color="error" variant="outlined" /> — Tasks can be achieved through right‑click&nbsp;⟩ **Select&nbsp;All** <Typography noWrap>(<kbd>Ctrl</kbd><kbd>A</kbd>/<kbd>⌘</kbd><kbd>A</kbd>)</Typography></td>
		</tr>
		<tr>
			<td>Format Selection</td>
			<td>**Script** tab</td>
			<td>**Script** tab&nbsp;⟩ **Format**</td>
		</tr>
		<tr>
			<td>Step Into, Step&nbsp;Over, Step&nbsp;Out</td>
			<td>**Script** tab</td>
			<td>Buttons appear contextually on the left side of mezzanine bar or the application's **Test** menu when a breakpoint is hit</td>
		</tr>
		<tr>
			<td>Error handling and other scripting actions</td>
			<td>**Script** tab</td>
			<td>Application's **Test** menu&nbsp;⟩ **Debug&nbsp;Error**</td>
		</tr>
		<tr>
			<td>Script Analysis</td>
			<td>**View** tab</td>
			<td>🄐 Application's **Window** menu&nbsp;⟩ **Script**&nbsp;⟩ **Analysis**<br />🄑 **Script** tab&nbsp;⟩ **Analysis**</td>
		</tr>
		<tr>
			<td>Performance</td>
			<td>**View** tab</td>
			<td>Application's **Window** menu&nbsp;⟩ **Performance**&nbsp;⟩ **Performance**</td>
		</tr>
		<tr>
			<td>Task Scheduler</td>
			<td>**View** tab</td>
			<td>Application's **Window** menu&nbsp;⟩ **Script**&nbsp;⟩ **Task&nbsp;Scheduler**</td>
		</tr>
		<tr>
			<td>Script Performance</td>
			<td>**View** tab</td>
			<td>🄐 Application's **Window** menu&nbsp;⟩ **Script**&nbsp;⟩ **Performance**<br />🄑 **Script** tab&nbsp;⟩ **Performance**</td>
		</tr>
		<tr>
			<td>Call Stack</td>
			<td>**View** tab</td>
			<td>🄐 Application's **Window** menu&nbsp;⟩ **Debug**&nbsp;⟩ **Call&nbsp;Stack**<br />🄑 **Script** tab&nbsp;⟩ **Call&nbsp;Stack**</td>
		</tr>
		<tr>
			<td>Breakpoints</td>
			<td>**View** tab</td>
			<td>🄐 Application's **Window** menu&nbsp;⟩ **Debug**&nbsp;⟩ **Breakpoints**<br />🄑 **Script** tab&nbsp;⟩ **Breakpoints**</td>
		</tr>
		<tr>
			<td>Watch</td>
			<td>**View** tab</td>
			<td>🄐 Application's **Window** menu&nbsp;⟩ **Debug**&nbsp;⟩ **Watch**<br />🄑 **Script** tab&nbsp;⟩ **Watch**</td>
		</tr>
		<tr>
			<td>Stats, Render, Physics, Network, Summary</td>
			<td>**View** tab</td>
			<td>Application's **Window** menu&nbsp;⟩ **Performance**</td>
		</tr>
	</tbody>
</table>

</TabItem>
</Tabs>
