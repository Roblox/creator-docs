---
title: Studio interface
description: User interface overview for Roblox Studio, the essential building tool for Roblox experiences.
---

import BetaAlert from '../includes/beta-features/beta-alert.md'
import StudioCameraControls from '../includes/studio/camera-controls.md'

## Toolbar and mezzanine

The **toolbar** and **mezzanine** reside at the top of Studio.

<figure>
<img src="../assets/studio/general/Toolbar-Mezzanine.png" width="960" alt="Mezzanine and toolbar indicated in Studio." />
</figure>

<figure>
The left side of the mezzanine contains easily-accessible [testing controls](../studio/testing-modes.md#playtest-options).

<img src="../assets/studio/general/Mezzanine-Testing-Controls.png" width="800" alt="Testing controls indicated in Studio's mezzanine." />
</figure>

<figure>
The right side of the mezzanine contains buttons/menus for [collaboration](../projects/collaboration.md), sharing, [Assistant](../assistant/guide.md), creator notifications, and account options.

<img src="../assets/studio/general/Mezzanine-Right.png" width="800" alt="Other options indicated in Studio's mezzanine." />
</figure>

<figure>
In the center of the mezzanine are the default tool tabs of **Home**, **Model**, **Avatar**, **UI**, **Script**, and **Plugins**. You can also add [custom&nbsp;tabs](#custom-tabs) for your specific needs.

<img src="../assets/studio/general/Mezzanine-Default-Tabs.png" width="800" alt="Default tabs indicated in Studio's mezzanine." />

<Tabs>
<TabItem label="Home">
The **Home** tab contains the core [transform](../parts/index.md#transform-parts) tools, [part inserter](../parts/index.md#insert-parts), the [color](../parts/index.md#color) and [material](../parts/index.md#material) widgets, the [group](../parts/index.md#group) and [lock](../parts/index.md#lock) tools, and [anchor](../parts/index.md#anchor) toggle. Also contains the [Terrain Editor](./terrain-editor.md).
</TabItem>
<TabItem label="Model">
The **Model** tab contains the core [transform](../parts/index.md#transform-parts) tools, the [pivot](../studio/pivot-tools.md) and [align](../studio/align-tool.md) tools, insertion widgets for [effects](../effects/index.md) and [constraints](../physics/index.md#constraints), and [solidâ€‘modeling](../parts/solid-modeling.md) tools.
</TabItem>
<TabItem label="Avatar">
The **Avatar** tab contains the core [transform](../parts/index.md#transform-parts) tools, as well as specialized tools for building default rigs, configuring [avatars](../avatar-setup/index.md), working with [animations](../animation/index.md), and [creating/fitting accessories](../art/accessories/accessory-fitting-tool.md).
</TabItem>
<TabItem label="UI">
The **UI** tab contains insertion widgets for [UI objects](../ui/index.md#ui-objects) and lets you access the [Style&nbsp;Editor](../ui/styling/editor.md), a comprehensive tool that allows you to create, manage, and apply UI styles.
</TabItem>
<TabItem label="Script">
The **Script** tab contains tools for writing and testing scripts, including [debugging](../studio/debugging.md) tools.
</TabItem>
<TabItem label="Plugins">
The **Plugins** tab contains [plugins](./plugins.md) created by the community or plugins you've created yourself to use across your experiences.
</TabItem>
</Tabs>
</figure>

### Appearance

You can customize the appearance of the toolbar by right-clicking in an empty area within the mezzanine/toolbar and selecting from the following options:

- **Manage&nbsp;tabs** â€” Reveals a popup window with the following options:

	<figure>
	<Grid container spacing={3}>
	<Grid item Medium={12} Large={5} XLarge={5}>
	<img src="../assets/studio/general/Manage-Tabs-Popup.png" width="300" alt="The Manage Tabs popup in Studio." />
	</Grid>
	<Grid item Medium={12} Large={7} XLarge={7}>
	<ol style={{listStyleType: 'upper-alpha'}}>
	<li>Show or hide the tab.</li>
	<li>With a tab selected, reorder it relative to the other tabs.</li>
	<li>Delete a selected [custom tab](#custom-tabs).</li>
	<li>Choose between tabs **Center** alignment or **Left** alignment (next to the [testing controls](../studio/testing-modes.md#playtest-options)).</li>
	</ol>
	</Grid>
	</Grid>
	</figure>

- **Collapse toolbar** â€” Maximizes space by hiding the toolbar while keeping the mezzanine visible. Hovering over a tab in the mezzanine temporarily reveals the toolbar.
- **Compact toolbar** â€” Makes the toolbar considerably more compact through smaller icons and labels, ideal for laptops or smaller monitors.
- **Show labels** â€” Toggles the text labels below tools on or off.

### Custom tabs

Beyond the default tool tabs, you can add **custom tabs** for your specific needs:

1. Click the <kbd>+</kbd> button to the right of the default tabs, then type in a name for the new tab and press <kbd>Enter</kbd>.

   <img src="../assets/studio/general/Toolbar-Add-Custom-Tab.png" width="800" alt="Button to add custom tab indicated in Studio's mezzanine." />

   <Alert severity="success">
   Alternatively to creating a new, empty tab, you can duplicate any existing tab by rightâ€‘clicking it and selecting **Duplicate&nbsp;tab**. Unlike default tabs, tools within duplicated tabs can be freely modified.
   </Alert>

2. Click the button or rightâ€‘click in an empty region of the toolbar and select **Add&nbsp;tools**.

   <img src="../assets/studio/general/Toolbar-Custom-Tab-Add-Tool.png" width="800" alt="Button to add new tool to a custom tab in Studio's toolbar." />

3. In the popup window, search for a tool and toggle its checkbox to add. New tools appear to the right of other tools, but you can rightâ€‘click any tool and select **Move&nbsp;left** or **Move&nbsp;right** to reorder it relative to other tools. You can also insert a divider by rightâ€‘clicking in an empty region of the toolbar and selecting **Add&nbsp;divider**.

   <img src="../assets/studio/general/Toolbar-Custom-Tab-Filled.png" width="800" alt="Custom tab populated with tools." />

   <Alert severity="info">
   If you need to remove a tool from a custom tab, rightâ€‘click it and select **Remove&nbsp;tool**.
   </Alert>

## 3D viewport

The 3D viewport represents the `Class.Workspace` of a place. From here, you can move the camera around the virtual world, manipulate objects with the mouse, and playtest an experience without leaving Studio.

<figure>
	<img
		src="../assets/studio/general/Editor-Window.jpg"
		width="100%" alt="An example viewport display of a desert environment with multiple stone pillars. One of the pillars displays movement visual aids from the Move tool." />
	<figcaption>3D viewport in Roblox Studio</figcaption>
</figure>

### Camera controls

Inside the viewport, you can move the camera with the following controls.

<StudioCameraControls components={props.components} />

### Object selection

As you hover over parts and models in the viewport, they are outlined to indicate their potential selection. You can select an outlined object by clicking it, or you can select multiple objects by holding <kbd>Shift</kbd>, <kbd>Ctrl</kbd>, or <kbd>âŒک</kbd> as you hover over and click them.

<img src="../assets/studio/general/Editor-Window-Object-Selection.jpg" width="800" alt="A warehouse environment with the stairs and multiple pallet box objects with a blue highlight to signify that they are selected in the 3D viewport."/>

In more complex environments or when zoomed in, objects will commonly be hidden from your view by other objects in front. To select hidden objects without moving the camera around, hold <kbd>Alt</kbd> or <kbd>âŒ¥</kbd> and click to perform **selection&nbsp;cycling** to the next further object behind the currently selected object.

<video src="../assets/studio/general/Selection-Cycling.mp4" controls width="800" alt="Video showing selection cycling through a model"></video>

<Alert severity="info">
When one or more objects or [models](../parts/models.md) are selected in the [Explorer](../studio/explorer.md) window, you can select all of their **children** by right-clicking and choosing **Hierarchy**&nbsp;âں©&nbsp;**Select&nbsp;Children** from the context menu. Similarly, choosing **Select&nbsp;Parent(s)** selects the **direct parents** of those objects.
</Alert>

To customize the appearance of selection lines and boxes around objects, set your desired options in the **Selection Visualization** section within the **Selection** panel of Studio's settings.

<img src="../assets/studio/general/Selected-Object-Bounding-Box.jpg" width="800" alt="A warehouse environment with rope object's selection outline and bounding box highlighted." />

### Visualization options

In the upper-right corner of the 3D viewport, you can quickly toggle or set common visualization options related to [onâ€‘screen&nbsp;UI](../ui/on-screen-containers.md) overlays, [light sources](../effects/light-sources.md), physics simulation, character [pathfinding](../characters/pathfinding.md), and more. The menu also contains a control for viewing/setting the camera scroll speed.

<img src="../assets/studio/general/Visualization-Options.png" width="780" alt="A close up view of the 3D viewport with the Visualization Options button indicated in the upper-right corner." />

## Frequently-used tools

Commonly used windows include the [Explorer](../studio/explorer.md), the [Properties](../studio/properties.md) window, [Asset Manager](../projects/assets/manager.md), [Toolbox](../projects/assets/toolbox.md), and others.

### Explorer

The [Explorer](../studio/explorer.md) window, visible by default and accessible from Studio's **Window** menu or **Home** tab, shows a hierarchical list of every object and service inside the place, collectively referred to as its **data model**. Frequently used services in the hierarchy include `Class.Workspace` which mirrors the [3D viewport](#3d-viewport), as well as `Class.ReplicatedStorage` and `Class.ServerStorage`.

<img src="../assets/studio/explorer/Parent-Child-Hierarchy.png" width="320" alt="Explorer hierarchy showing Camera, Terrain, and SignModel as children of Workspace; Board and Post as children of SignModel" />

### Properties

The [Properties](../studio/properties.md) window, visible by default and accessible from Studio's **Window** menu or **Home** tab, lets you adjust properties of a selected object to change how it looks and behaves. Object properties are divided into sections; for example, a `Class.MeshPart` includes sections like **Appearance** which allows you to change its color, material, transparency, and more.

<img src="../assets/studio/properties/Sections-Example.png" width="320" />

At the bottom of the window, you can define custom [attributes](../studio/properties.md#instance-attributes) for an object, similar to its default properties. Attributes and their values are saved with your place/assets and they're an ideal way for team members to experiment with different values during runtime, even if they don't understand the underlying code.

<img src="../assets/studio/properties/Attributes-Example.png" alt="A close up view of the Attributes section of the Properties window." width="320" />

### Asset Manager

The [Asset Manager](../projects/assets/manager.md), accessible from Studio's **Window** menu or **Home** tab, lets you manage places, images, meshes, audio, and more. It also provides a mechanism to bulk import large groups of assets.

### Toolbox

The [Toolbox](../projects/assets/toolbox.md), accessible from Studio's **Window** menu or **Home** tab, contains a selection of models, images, meshes, audio, plugins, videos, and fonts made by Roblox or Roblox community members. It also includes all of the creations that you've personally [distributed on the Creator Store](../production/creator-store.md) or those which were distributed by [groups](../projects/groups.md) you belong to.

<img src="../assets/studio/toolbox/Model-Search-Example.png" width="360" alt="The Toolbox window." />

### Output

The [Output](../studio/output.md) window, accessible from Studio's **Window** menu or **Script** tab, displays errors captured from running scripts, messages from Roblox Engine, messages from calls to `Global.LuaGlobals.print()`, and errors from calls to `Global.RobloxGlobals.warn()`.

### Command Bar

The **Command Bar**, accessible from Studio's **Script** tab toolbar or the **Window**&nbsp;âں© **Script** menu, lets you execute Luau code outside of scripts. To quickly jump to the command bar at any time, press <kbd>Ctrl</kbd><kbd>9</kbd> (Windows) or <kbd>âŒک</kbd><kbd>9</kbd> (Mac).

<BetaAlert betaName="Multi-line Command Bar" leadIn="Most of the features outlined below are in beta and must be enabled through " leadOut="." components={props.components} />

<img src="../assets/studio/general/Command-Bar.png" width="840" />

Features include:

- **Multiline editing** â€” Press <kbd>Enter</kbd> to insert new lines while typing. The bar starts with 2 lines, grows up to 10 lines as new lines are inserted, and shrinks as lines are deleted. When you're ready to run/execute the contents of the bar, click the **Run** button or use the shortcut <kbd>Ctrl</kbd><kbd>Enter</kbd> (<kbd>âŒک</kbd><kbd>Enter</kbd>).

- **Command history** â€” The last 10 executed commands are visible by clicking the **History** button and navigating to the **Recent** tab. Clicking on a command in the list loads it into the bar, or you can navigate the list with <kbd>â†‘</kbd>/<kbd>â†“</kbd> and insert the highlighted command with <kbd>Enter</kbd>. Alternatively, you can scrub through commands with <Typography noWrap><kbd>Ctrl</kbd>/<kbd>âŒک</kbd> + <kbd>â†‘</kbd>/<kbd>â†“</kbd></Typography> when the command bar is selected.

- **Saved commands** â€” You can explicitly save commands with the **Save** button or the default shortcut <kbd>Ctrl</kbd><kbd>B</kbd> (<kbd>âŒک</kbd><kbd>B</kbd>). Saved commands can be accessed through the **Saved** tab in the popup list, and the mechanics of loading saved commands from the list are the same as those in the command history.

- **Script Editor integration** â€” The command bar is an embedded script editor and supports a wide subset of Studio's [Script Editor](./script-editor.md) features, including [autocomplete](./script-editor.md#autocomplete-features), Luau [linting](https://luau.org/lint), [go&nbsp;to declaration](./script-editor.md#go-to-declaration), [function filter](./script-editor.md#script-function-filter), [Code Assist](./script-editor.md#code-assist), and [multiâ€‘cursor](./script-editor.md#multi-cursor).

## Layout customization

Studio's drag-and-drop interface lets you easily customize window layout to best suit your workflows.

### Reposition windows

You can reposition any window by click-dragging its **header bar**. As you begin dragging the window, the interface reveals **empty docking area** regions. If you drag the mouse pointer into any empty region, a floating **position selector** appears in that region. Dragging the pointer over the "center" of the floating selector targets the empty region as the dragged window's destination, indicated by the region darkening and becoming outlined.

<figure>
<img src="../assets/studio/general/Docking-Position-Selector-Empty.png" width="880" alt="Mouse pointer hovering over the 'center' icon of the position selector in an empty docking area, showing that region as the dragged window's destination." />
<figcaption>Mouse pointer hovering over the "center" icon of the position selector in an empty docking area</figcaption>
</figure>

If you drag the mouse pointer into a **populated** region such as the 3D viewport, a floating position selector appears with multiple options for the window's destination. For example, dragging the pointer over the "left" icon will position the window on the region's left side.

<Tabs>
  <TabItem label="Viewport left">
	<img src="../assets/studio/general/Docking-Position-Selector-Left.png" width="880" height="520" alt="Mouse pointer hovering over the 'left half' icon of the position selector in a populated region, showing the left side of the region as the dragged window's destination." />
  </TabItem>
  <TabItem label="Viewport right">
    <img src="../assets/studio/general/Docking-Position-Selector-Right.png" width="880" height="520" alt="Mouse pointer hovering over the 'right half' icon of the position selector in a populated region, showing the right side of the region as the dragged window's destination." />
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
  <img src="../assets/studio/general/Docking-Pinned-Tabs.png" width="800" alt="An example 3D viewport where the Explorer, Properties, and Terrain Editor windows are pinned to the right of the Studio window." />
  <figcaption>Three windows pinned to the right side of the Studio window</figcaption>
</figure>

To pin a window or an entire [group](#group-windows) of windows, click the "collapse" button. Alternatively, to unâ€‘pin a pinned window/group, open it by clicking its tab, then click the "expand" button.

<img src="../assets/studio/general/Docking-Expand-Collapse.png" width="320" alt="A close up view of the Explorer window with the Collapse button highlighted." />

### Float windows

To float a window freely of other windows, simply dragâ€‘andâ€‘drop it without selecting any icon from the floating [position selector](#reposition-windows).

## Next-gen toolbar mapping

<BetaAlert betaName="Next Gen Studio Preview" leadIn="The following remapping reference applies to the next-gen Studio toolbar beta, currently enabled by default through " leadOut="." components={props.components} />

The **next-gen Studio toolbar** introduces a wide array of improvements and optimizations, including cleaner appearance, customizable tabs with your own tool collections, and the ability to show/hide tabs as desired. The following tables map the previous Studio toolbar workflows to nextâ€‘gen equivalents.

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
			<td>Windows: **File** menu&nbsp;âں© **Studio Settings**<br />macOS: Application's main menu&nbsp;âں© **Studio Settings**</td>
		</tr>
		<tr>
			<td>Beta Features</td>
			<td>**File** menu</td>
			<td>Application's **File** menu&nbsp;âں© **Beta&nbsp;Features**</td>
		</tr>
		<tr>
			<td>Save to Roblox&nbsp;/&nbsp;Asâ€¦</td>
			<td>**File** menu</td>
			<td>Application's **File** menu&nbsp;âں© **Save&nbsp;to&nbsp;Roblox**&nbsp;/&nbsp;**Asâ€¦**</td>
		</tr>
		<tr>
			<td>Publish to Roblox&nbsp;/&nbsp;Asâ€¦</td>
			<td>**File** menu</td>
			<td>Application's **File** menu&nbsp;âں© **Publish&nbsp;to&nbsp;Roblox**&nbsp;/&nbsp;**Asâ€¦**</td>
		</tr>
				<tr>
			<td>[Explorer](./explorer.md)</td>
			<td>**View** tab</td>
			<td>ًں„گ **Home** tab&nbsp;âں© **Explorer**<br />ًں„‘ Application's **Window** menu&nbsp;âں© **Explorer**</td>
		</tr>
		<tr>
			<td>[Properties](./properties.md)</td>
			<td>**View** tab</td>
			<td>ًں„گ **Home** tab&nbsp;âں© **Properties**<br />ًں„‘ Application's **Window** menu&nbsp;âں© **Properties**</td>
		</tr>
		<tr>
			<td>[Asset Manager](../projects/assets/manager.md)</td>
			<td>**View** tab</td>
			<td>ًں„گ **Home** tab&nbsp;âں© **Asset&nbsp;Manager**<br />ًں„‘ Application's **Window** menu&nbsp;âں© **Asset&nbsp;Manager**</td>
		</tr>
		<tr>
			<td>[Toolbox](../projects/assets/toolbox.md)</td>
			<td>**View** tab</td>
			<td>ًں„گ **Home** tab&nbsp;âں© **Toolbox**<br />ًں„‘ Application's **Window** menu&nbsp;âں© **Toolbox**</td>
		</tr>
		<tr>
			<td>[Terrain Editor](./terrain-editor.md)</td>
			<td>**Home** or **View** tab</td>
			<td>Application's **Window** menu&nbsp;âں© **3D**&nbsp;âں© **Terrain**</td>
		</tr>
		<tr>
			<td>[Output](./output.md)</td>
			<td>**View** tab</td>
			<td>ًں„گ Application's **Window** menu&nbsp;âں© **Output**<br />ًں„‘ **Script** tab&nbsp;âں© **Output**</td>
		</tr>
		<tr>
			<td>[Game Settings](./game-settings.md)</td>
			<td>**File** menu or **Home** tab</td>
			<td>Application's **File** menu&nbsp;âں© **Game&nbsp;Settings**</td>
		</tr>
		<tr>
			<td>[Avatar Settings](./avatar-settings.md)</td>
			<td>**File** menu or **Avatar** tab</td>
			<td>ًں„گ **Avatar** tab&nbsp;âں© **Avatar Settings**<br />ًں„‘ Application's **File** menu&nbsp;âں© **Avatar&nbsp;Settings**</td>
		</tr>
		<tr>
			<td>[Command Bar](#command-bar)</td>
			<td>**View** tab</td>
			<td>ًں„گ Application's **Window** menu&nbsp;âں© **Script**&nbsp;âں© **Command&nbsp;Bar**<br />ًں„‘ **Script** tab&nbsp;âں© **Command**</td>
		</tr>
		<tr>
			<td>Manage Plugins</td>
			<td>**Plugins** tab</td>
			<td>Application's **Plugins** menu&nbsp;âں© **Manage&nbsp;Plugins**</td>
		</tr>
		<tr>
			<td>Plugins Folder</td>
			<td>**Plugins** tab</td>
			<td>Application's **Plugins** menu&nbsp;âں© **Plugins&nbsp;Folder**</td>
		</tr>
		<tr>
			<td>Tools (Localization)</td>
			<td>**Plugins** tab</td>
			<td>Application's **Window** menu&nbsp;âں© **Localization**&nbsp;âں© **Localization&nbsp;Tool**</td>
		</tr>
		<tr>
			<td>Object Browser</td>
			<td>**View** tab</td>
			<td>Application's **Window** menu&nbsp;âں© **Script**&nbsp;âں© **Object&nbsp;Browser**</td>
		</tr>
		<tr>
			<td>Tag Editor</td>
			<td>**View** tab</td>
			<td>Application's **Window** menu&nbsp;âں© **Script**&nbsp;âں© **Tag&nbsp;Editor**</td>
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
			<td>**Home**, **Model**, or **Avatar** tab&nbsp;âں© Mode picker&nbsp;âں© Options in popup menu</td>
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
			<td>**Home** or **Model** tab&nbsp;âں© Material picker dropdown&nbsp;âں© **Material&nbsp;Manager**</td>
			<td>Application's **Window** menu&nbsp;âں© **3D**&nbsp;âں© **Material**</td>
		</tr>
		<tr>
			<td>Group</td>
			<td>**Home** or **Model** tab</td>
			<td>ًں„گ **Home** or **Model** tab&nbsp;âں© **Group**<br />ًں„‘ Application's **Edit** menu&nbsp;âں© **Group**</td>
		</tr>
		<tr>
			<td>Lock</td>
			<td>**Home** or **Model** tab</td>
			<td>ًں„گ **Home** or **Model** tab&nbsp;âں© **Lock**<br />ًں„‘ Application's **Edit** menu&nbsp;âں© **Lock**</td>
		</tr>
		<tr>
			<td>Anchor</td>
			<td>**Home** or **Model** tab</td>
			<td>ًں„گ **Home** or **Model** tab&nbsp;âں© **Anchor**<br />ًں„‘ Application's **Edit** menu&nbsp;âں© **Anchor**</td>
		</tr>
				<tr>
			<td>[Import 3D](../art/modeling/3d-importer.md)</td>
			<td>**Home** or **Avatar** tab</td>
			<td>ًں„گ **Home** tab&nbsp;âں© **Import&nbsp;3D**<br />ًں„‘ Application's **File** menu&nbsp;âں© **Import&nbsp;3D**</td>
		</tr>
		<tr>
			<td>[Animation Editor](../animation/editor.md)</td>
			<td>**Avatar** or **View** tab</td>
			<td>ًں„گ **Avatar** tab&nbsp;âں© **Animation**<br />ًں„‘ Application's **Window** menu&nbsp;âں© **Avatar**&nbsp;âں© **Animation**</td>
		</tr>
		<tr>
			<td>[Accessory Fitting Tool](../art/accessories/accessory-fitting-tool.md)</td>
			<td>**Avatar** tab</td>
			<td>ًں„گ **Avatar** tab&nbsp;âں© **Accessory**<br />ًں„‘ Application's **Window** menu&nbsp;âں© **Avatar**&nbsp;âں© **Accessory**</td>
		</tr>
		<tr>
			<td>[Rig Builder](./rig-builder.md)</td>
			<td>**Avatar** tab</td>
			<td>**Home** or **Avatar** tab&nbsp;âں© **Character**</td>
		</tr>
		<tr>
			<td>[Avatar Setup](../avatar-setup/index.md)</td>
			<td>**Avatar** tab</td>
			<td>ًں„گ **Avatar** tab&nbsp;âں© **Setup**<br />ًں„‘ Application's **Window** menu&nbsp;âں© **Avatar**&nbsp;âں© **Setup**</td>
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
			<td>ًں„گ **Model** tab&nbsp;âں© **Align**<br />ًں„‘ Application's **Window** menu&nbsp;âں© **3D**&nbsp;âں© **Align**</td>
		</tr>
		<tr>
			<td>[Material Generator](./material-generator.md)</td>
			<td>**Home** or **Model** tab&nbsp;âں© Material picker dropdown&nbsp;âں© **Generate**</td>
			<td>Application's **Window** menu&nbsp;âں© **3D**&nbsp;âں© **Material&nbsp;Generator**</td>
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
			<td>Application's **View** menu&nbsp;âں© **Show&nbsp;Welds**</td>
		</tr>
		<tr>
			<td>Show Constraint Details toggle</td>
			<td>**Model** tab</td>
			<td>Application's **View** menu&nbsp;âں© **Show&nbsp;Constraint&nbsp;Details**</td>
		</tr>
		<tr>
			<td>[Effect pick/insert](../effects/index.md)</td>
			<td>**Model** tab</td>
			<td><Chip label="no change" size="small" color="success" variant="outlined" /></td>
		</tr>
		<tr>
			<td>Spawn inserter</td>
			<td>**Model** tab</td>
			<td><Chip label="removed" size="small" color="error" variant="outlined" /> â€” Use standard insertion methods to insert a `Class.SpawnLocation`</td>
		</tr>
		<tr>
			<td>Advanced&nbsp;âں© Insert Object</td>
			<td>**Model** tab</td>
			<td>Application's **Window** menu&nbsp;âں© **Insert Object**</td>
		</tr>
		<tr>
			<td>Advanced&nbsp;âں© Model</td>
			<td>**Model** tab</td>
			<td><Chip label="removed" size="small" color="error" variant="outlined" /> â€” Use **File** menu&nbsp;âں© **Import&nbsp;3D**</td>
		</tr>
		<tr>
			<td>Advanced&nbsp;âں© Service</td>
			<td>**Model** tab</td>
			<td>Rightâ€‘click in the [Explorer](./explorer.md) and select **Show&nbsp;Servicesâ€¦** from the context menu</td>
		</tr>
		<tr>
			<td>Advanced&nbsp;âں© Collision Groups</td>
			<td>**Model** tab</td>
			<td>Application's **Window** menu&nbsp;âں© **3D**&nbsp;âں© **Collision&nbsp;Groups**</td>
		</tr>
		<tr>
			<td>Advanced&nbsp;âں© Run Script</td>
			<td>**Model** tab</td>
			<td>Application's **Window** menu&nbsp;âں© **Script**&nbsp;âں© **Run&nbsp;Script**</td>
		</tr>
		<tr>
			<td>Advanced&nbsp;âں© Script, Local&nbsp;Script, Module&nbsp;Script</td>
			<td>**Model** tab</td>
			<td>**Home** or **Script** tab&nbsp;âں© **Script** pick/insert</td>
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
			<td>ًں„گ Right side of mezzanine bar<br />ًں„‘ Application's **Window** menu&nbsp;âں© **Collaboration**&nbsp;âں© **Invite**/**Manage** **Collaborators**</td>
		</tr>
		<tr>
			<td>[Live Collaborators](../projects/collaboration.md#view-collaborators) window</td>
			<td>Right side of mezzanine bar</td>
			<td>ًں„گ Right side of mezzanine bar<br />ًں„‘ Application's **Window** menu&nbsp;âں© **Collaboration**&nbsp;âں© **Live&nbsp;Collaborators**</td>
		</tr>
		<tr>
			<td>[Comments](../projects/collaboration.md#comments) window</td>
			<td>**View** tab</td>
			<td>Application's **Window** menu&nbsp;âں© **Collaboration**&nbsp;âں© **Comments**</td>
		</tr>
		<tr>
			<td>Create [comment](../projects/collaboration.md#create-comments)</td>
			<td>Right side of mezzanine bar</td>
			<td><Chip label="no change" size="small" color="success" variant="outlined" /></td>
		</tr>
		<tr>
			<td>[Activity History](../projects/activity-history.md)</td>
			<td>**View** tab</td>
			<td>Application's **Window** menu&nbsp;âں© **Activity&nbsp;History**</td>
		</tr>
		<tr>
			<td>Team Create</td>
			<td>**View** tab</td>
			<td>Application's **Window** menu&nbsp;âں© **Collaboration**&nbsp;âں© **Team&nbsp;Create**</td>
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
			<td>ًں„گ Left side of mezzanine bar&nbsp;âں© Mode picker<br />ًں„‘ Options in application's **Test** menu</td>
		</tr>
		<tr>
			<td>Playtest buttons</td>
			<td>**Home** or **Test** tab, or left side of mezzanine bar</td>
			<td>ًں„گ Left side of mezzanine bar<br />ًں„‘ Options in application's **Test** menu</td>
		</tr>
		<tr>
			<td>[Client/server toggle](./testing-modes.md#toggle-clientserver)</td>
			<td>**Home** or **Test** tab</td>
			<td>ًں„گ Left side of mezzanine bar<br />ًں„‘ Application's **Test** menu&nbsp;âں© **Client/Server**</td>
		</tr>
		<tr>
			<td>[Pause/resume physics](./testing-modes.md#pause-and-resume-physics)</td>
			<td>**Test** tab</td>
			<td>Options appear contextually on the left side of mezzanine bar or within application's **Test** menu while playtesting</td>
		</tr>
		<tr>
			<td>[Multi-client simulation](./testing-modes.md#multi-client-simulation)</td>
			<td>**Test** tab</td>
			<td>ًں„گ Left side of mezzanine bar&nbsp;âں© Mode picker&nbsp;âں© **Server&nbsp;&&nbsp;Clients**<br />ًں„‘ Application's **Test** menu&nbsp;âں© **Start Test Session**&nbsp;âں© **Server and Clients**</td>
		</tr>
		<tr>
			<td>[Device Emulator](./testing-modes.md#device-emulation)</td>
			<td>**Test** tab</td>
			<td>Application's **Test** menu&nbsp;âں© **Device&nbsp;Emulator**</td>
		</tr>
		<tr>
			<td>[Controller Emulator](./testing-modes.md#controller-emulation)</td>
			<td>**Test** tab</td>
			<td>Application's **Test** menu&nbsp;âں© **Controller&nbsp;Emulator**</td>
		</tr>
		<tr>
			<td>[Player Emulator](./testing-modes.md#player-emulation)</td>
			<td>**Test** tab</td>
			<td>Application's **Test** menu&nbsp;âں© **Player&nbsp;Emulator**</td>
		</tr>
		<tr>
			<td>View Selector</td>
			<td>**View** tab</td>
			<td>Application's **View** menu&nbsp;âں© **Show&nbsp;View&nbsp;Selector**</td>
		</tr>
		<tr>
			<td>Grid visualization</td>
			<td>**View** tab</td>
			<td>Application's **View** menu&nbsp;âں© **Show&nbsp;Grid** & **Show&nbsp;Grid&nbsp;Material**</td>
		</tr>
		<tr>
			<td>Wireframe Rendering</td>
			<td>**View** tab</td>
			<td>Application's **View** menu&nbsp;âں© **Show&nbsp;Wireframe&nbsp;Rendering**</td>
		</tr>
		<tr>
			<td>UI Visibility</td>
			<td>**View** tab</td>
			<td>Application's **View** menu&nbsp;âں© **Show&nbsp;UI**</td>
		</tr>
		<tr>
			<td>[Wind Direction](../environment/global-wind.md#wind-direction-widget)</td>
			<td>**View** tab</td>
			<td>Application's **View** menu&nbsp;âں© **Show&nbsp;Wind&nbsp;Direction**</td>
		</tr>
		<tr>
			<td>[Selection Style](./ui-overview.md#object-selection)</td>
			<td>**View** tab</td>
			<td>Options in the **View** section of the [Visualization&nbsp;Options](#visualization-options) widget</td>
		</tr>
		<tr>
			<td>Team Test</td>
			<td>**Home** tab</td>
			<td>Application's **Test** menu&nbsp;âں© **Start Test Session**&nbsp;âں© **Team Test**</td>
		</tr>
		<tr>
			<td>Mute</td>
			<td>**Test** tab</td>
			<td>Application's **View** menu&nbsp;âں© **Mute**</td>
		</tr>
		<tr>
			<td>Screen Shot</td>
			<td>**View** tab</td>
			<td>Application's **View** menu&nbsp;âں© **Screenshot**</td>
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
			<td>**Script** tab&nbsp;âں© **Find** button popup&nbsp;âں© **Findâ€¦**</td>
		</tr>
		<tr>
			<td>Find/Replace (advanced)</td>
			<td>**Script** tab</td>
			<td>ًں„گ **Script** tab&nbsp;âں© **Find** button popup&nbsp;âں© **Find&nbsp;All**<br />ًں„‘ Application's **Window** menu&nbsp;âں© **Script**&nbsp;âں© **Find&nbsp;All&nbsp;/&nbsp;Replace&nbsp;All**</td>
		</tr>
		<tr>
		<td>Go to Line</td>
			<td>**Script** tab</td>
			<td><Chip label="no change" size="small" color="success" variant="outlined" /></td>
		</tr>
		<tr>
			<td>Replace</td>
			<td>**Script** tab</td>
			<td><Chip label="removed by default" size="small" color="warning" variant="outlined" /> â€” Can be reâ€‘added to a custom tab through **Add&nbsp;Tools**&nbsp;âں© **Replace**</td>
		</tr>
		<tr>
			<td>Select</td>
			<td>**Script** tab</td>
			<td><Chip label="removed" size="small" color="error" variant="outlined" /> â€” Tasks can be achieved through rightâ€‘click&nbsp;âں© **Select&nbsp;All** <Typography noWrap>(<kbd>Ctrl</kbd><kbd>A</kbd>/<kbd>âŒک</kbd><kbd>A</kbd>)</Typography></td>
		</tr>
		<tr>
			<td>Format Selection</td>
			<td>**Script** tab</td>
			<td>**Script** tab&nbsp;âں© **Format**</td>
		</tr>
		<tr>
			<td>Step Into, Step&nbsp;Over, Step&nbsp;Out</td>
			<td>**Script** tab</td>
			<td>Buttons appear contextually on the left side of mezzanine bar or the application's **Test** menu when a breakpoint is hit</td>
		</tr>
		<tr>
			<td>Error handling and other scripting actions</td>
			<td>**Script** tab</td>
			<td>Application's **Test** menu&nbsp;âں© **Debug&nbsp;Error**</td>
		</tr>
		<tr>
			<td>Script Analysis</td>
			<td>**View** tab</td>
			<td>ًں„گ Application's **Window** menu&nbsp;âں© **Script**&nbsp;âں© **Analysis**<br />ًں„‘ **Script** tab&nbsp;âں© **Analysis**</td>
		</tr>
		<tr>
			<td>Performance</td>
			<td>**View** tab</td>
			<td>Application's **Window** menu&nbsp;âں© **Performance**&nbsp;âں© **Performance**</td>
		</tr>
		<tr>
			<td>Task Scheduler</td>
			<td>**View** tab</td>
			<td>Application's **Window** menu&nbsp;âں© **Script**&nbsp;âں© **Task&nbsp;Scheduler**</td>
		</tr>
		<tr>
			<td>Script Performance</td>
			<td>**View** tab</td>
			<td>ًں„گ Application's **Window** menu&nbsp;âں© **Script**&nbsp;âں© **Performance**<br />ًں„‘ **Script** tab&nbsp;âں© **Performance**</td>
		</tr>
		<tr>
			<td>Call Stack</td>
			<td>**View** tab</td>
			<td>ًں„گ Application's **Window** menu&nbsp;âں© **Debug**&nbsp;âں© **Call&nbsp;Stack**<br />ًں„‘ **Script** tab&nbsp;âں© **Call&nbsp;Stack**</td>
		</tr>
		<tr>
			<td>Breakpoints</td>
			<td>**View** tab</td>
			<td>ًں„گ Application's **Window** menu&nbsp;âں© **Debug**&nbsp;âں© **Breakpoints**<br />ًں„‘ **Script** tab&nbsp;âں© **Breakpoints**</td>
		</tr>
		<tr>
			<td>Watch</td>
			<td>**View** tab</td>
			<td>ًں„گ Application's **Window** menu&nbsp;âں© **Debug**&nbsp;âں© **Watch**<br />ًں„‘ **Script** tab&nbsp;âں© **Watch**</td>
		</tr>
		<tr>
			<td>Stats, Render, Physics, Network, Summary</td>
			<td>**View** tab</td>
			<td>Application's **Window** menu&nbsp;âں© **Performance**</td>
		</tr>
	</tbody>
</table>

</TabItem>
</Tabs>
---
title: Studio interface
description: User interface overview for Roblox Studio, the essential building tool for Roblox experiences.
---

import BetaAlert from '../includes/beta-features/beta-alert.md'
import StudioCameraControls from '../includes/studio/camera-controls.md'

## Toolbar and mezzanine

The **toolbar** and **mezzanine** reside at the top of Studio.

<figure>
<img src="../assets/studio/general/Toolbar-Mezzanine.png" width="960" alt="Mezzanine and toolbar indicated in Studio." />
</figure>

<figure>
The left side of the mezzanine contains easily-accessible [testing controls](../studio/testing-modes.md#playtest-options).

<img src="../assets/studio/general/Mezzanine-Testing-Controls.png" width="800" alt="Testing controls indicated in Studio's mezzanine." />
</figure>

<figure>
The right side of the mezzanine contains buttons/menus for [collaboration](../projects/collaboration.md), sharing, [Assistant](../assistant/guide.md), creator notifications, and account options.

<img src="../assets/studio/general/Mezzanine-Right.png" width="800" alt="Other options indicated in Studio's mezzanine." />
</figure>

<figure>
In the center of the mezzanine are the default tool tabs of **Home**, **Model**, **Avatar**, **UI**, **Script**, and **Plugins**. You can also add [custom&nbsp;tabs](#custom-tabs) for your specific needs.

<img src="../assets/studio/general/Mezzanine-Default-Tabs.png" width="800" alt="Default tabs indicated in Studio's mezzanine." />

<Tabs>
<TabItem label="Home">
The **Home** tab contains the core [transform](../parts/index.md#transform-parts) tools, [part inserter](../parts/index.md#insert-parts), the [color](../parts/index.md#color) and [material](../parts/index.md#material) widgets, the [group](../parts/index.md#group) and [lock](../parts/index.md#lock) tools, and [anchor](../parts/index.md#anchor) toggle. Also contains the [Terrain Editor](./terrain-editor.md).
</TabItem>
<TabItem label="Model">
The **Model** tab contains the core [transform](../parts/index.md#transform-parts) tools, the [pivot](../studio/pivot-tools.md) and [align](../studio/align-tool.md) tools, insertion widgets for [effects](../effects/index.md) and [constraints](../physics/index.md#constraints), and [solid‑modeling](../parts/solid-modeling.md) tools.
</TabItem>
<TabItem label="Avatar">
The **Avatar** tab contains the core [transform](../parts/index.md#transform-parts) tools, as well as specialized tools for building default rigs, configuring [avatars](../avatar-setup/index.md), working with [animations](../animation/index.md), and [creating/fitting accessories](../art/accessories/accessory-fitting-tool.md).
</TabItem>
<TabItem label="UI">
The **UI** tab contains insertion widgets for [UI objects](../ui/index.md#ui-objects) and lets you access the [Style&nbsp;Editor](../ui/styling/editor.md), a comprehensive tool that allows you to create, manage, and apply UI styles.
</TabItem>
<TabItem label="Script">
The **Script** tab contains tools for writing and testing scripts, including [debugging](../studio/debugging.md) tools.
</TabItem>
<TabItem label="Plugins">
The **Plugins** tab contains [plugins](./plugins.md) created by the community or plugins you've created yourself to use across your experiences.
</TabItem>
</Tabs>
</figure>

### Appearance

You can customize the appearance of the toolbar by right-clicking in an empty area within the mezzanine/toolbar and selecting from the following options:

- **Manage&nbsp;tabs** — Reveals a popup window with the following options:

	<figure>
	<Grid container spacing={3}>
	<Grid item Medium={12} Large={5} XLarge={5}>
	<img src="../assets/studio/general/Manage-Tabs-Popup.png" width="300" alt="The Manage Tabs popup in Studio." />
	</Grid>
	<Grid item Medium={12} Large={7} XLarge={7}>
	<ol style={{listStyleType: 'upper-alpha'}}>
	<li>Show or hide the tab.</li>
	<li>With a tab selected, reorder it relative to the other tabs.</li>
	<li>Delete a selected [custom tab](#custom-tabs).</li>
	<li>Choose between tabs **Center** alignment or **Left** alignment (next to the [testing controls](../studio/testing-modes.md#playtest-options)).</li>
	</ol>
	</Grid>
	</Grid>
	</figure>

- **Collapse toolbar** — Maximizes space by hiding the toolbar while keeping the mezzanine visible. Hovering over a tab in the mezzanine temporarily reveals the toolbar.
- **Compact toolbar** — Makes the toolbar considerably more compact through smaller icons and labels, ideal for laptops or smaller monitors.
- **Show labels** — Toggles the text labels below tools on or off.

### Custom tabs

Beyond the default tool tabs, you can add **custom tabs** for your specific needs:

1. Click the <kbd>+</kbd> button to the right of the default tabs, then type in a name for the new tab and press <kbd>Enter</kbd>.

   <img src="../assets/studio/general/Toolbar-Add-Custom-Tab.png" width="800" alt="Button to add custom tab indicated in Studio's mezzanine." />

   <Alert severity="success">
   Alternatively to creating a new, empty tab, you can duplicate any existing tab by right‑clicking it and selecting **Duplicate&nbsp;tab**. Unlike default tabs, tools within duplicated tabs can be freely modified.
   </Alert>

2. Click the button or right‑click in an empty region of the toolbar and select **Add&nbsp;tools**.

   <img src="../assets/studio/general/Toolbar-Custom-Tab-Add-Tool.png" width="800" alt="Button to add new tool to a custom tab in Studio's toolbar." />

3. In the popup window, search for a tool and toggle its checkbox to add. New tools appear to the right of other tools, but you can right‑click any tool and select **Move&nbsp;left** or **Move&nbsp;right** to reorder it relative to other tools. You can also insert a divider by right‑clicking in an empty region of the toolbar and selecting **Add&nbsp;divider**.

   <img src="../assets/studio/general/Toolbar-Custom-Tab-Filled.png" width="800" alt="Custom tab populated with tools." />

   <Alert severity="info">
   If you need to remove a tool from a custom tab, right‑click it and select **Remove&nbsp;tool**.
   </Alert>

## 3D viewport

The 3D viewport represents the `Class.Workspace` of a place. From here, you can move the camera around the virtual world, manipulate objects with the mouse, and playtest an experience without leaving Studio.

<figure>
	<img
		src="../assets/studio/general/Editor-Window.jpg"
		width="100%" alt="An example viewport display of a desert environment with multiple stone pillars. One of the pillars displays movement visual aids from the Move tool." />
	<figcaption>3D viewport in Roblox Studio</figcaption>
</figure>

### Camera controls

Inside the viewport, you can move the camera with the following controls.

<StudioCameraControls components={props.components} />

### Object selection

As you hover over parts and models in the viewport, they are outlined to indicate their potential selection. You can select an outlined object by clicking it, or you can select multiple objects by holding <kbd>Shift</kbd>, <kbd>Ctrl</kbd>, or <kbd>⌘</kbd> as you hover over and click them.

<img src="../assets/studio/general/Editor-Window-Object-Selection.jpg" width="800" alt="A warehouse environment with the stairs and multiple pallet box objects with a blue highlight to signify that they are selected in the 3D viewport."/>

In more complex environments or when zoomed in, objects will commonly be hidden from your view by other objects in front. To select hidden objects without moving the camera around, hold <kbd>Alt</kbd> or <kbd>⌥</kbd> and click to perform **selection&nbsp;cycling** to the next further object behind the currently selected object.

<video src="../assets/studio/general/Selection-Cycling.mp4" controls width="800" alt="Video showing selection cycling through a model"></video>

<Alert severity="info">
When one or more objects or [models](../parts/models.md) are selected in the [Explorer](../studio/explorer.md) window, you can select all of their **children** by right-clicking and choosing **Hierarchy**&nbsp;⟩&nbsp;**Select&nbsp;Children** from the context menu. Similarly, choosing **Select&nbsp;Parent(s)** selects the **direct parents** of those objects.
</Alert>

To customize the appearance of selection lines and boxes around objects, set your desired options in the **Selection Visualization** section within the **Selection** panel of Studio's settings.

<img src="../assets/studio/general/Selected-Object-Bounding-Box.jpg" width="800" alt="A warehouse environment with rope object's selection outline and bounding box highlighted." />

### Visualization options

In the upper-right corner of the 3D viewport, you can quickly toggle or set common visualization options related to [on‑screen&nbsp;UI](../ui/on-screen-containers.md) overlays, [light sources](../effects/light-sources.md), physics simulation, character [pathfinding](../characters/pathfinding.md), and more. The menu also contains a control for viewing/setting the camera scroll speed.

<img src="../assets/studio/general/Visualization-Options.png" width="780" alt="A close up view of the 3D viewport with the Visualization Options button indicated in the upper-right corner." />

## Frequently-used tools

Commonly used windows include the [Explorer](../studio/explorer.md), the [Properties](../studio/properties.md) window, [Asset Manager](../projects/assets/manager.md), [Toolbox](../projects/assets/toolbox.md), and others.

### Explorer

The [Explorer](../studio/explorer.md) window, visible by default and accessible from Studio's **Window** menu or **Home** tab, shows a hierarchical list of every object and service inside the place, collectively referred to as its **data model**. Frequently used services in the hierarchy include `Class.Workspace` which mirrors the [3D viewport](#3d-viewport), as well as `Class.ReplicatedStorage` and `Class.ServerStorage`.

<img src="../assets/studio/explorer/Parent-Child-Hierarchy.png" width="320" alt="Explorer hierarchy showing Camera, Terrain, and SignModel as children of Workspace; Board and Post as children of SignModel" />

### Properties

The [Properties](../studio/properties.md) window, visible by default and accessible from Studio's **Window** menu or **Home** tab, lets you adjust properties of a selected object to change how it looks and behaves. Object properties are divided into sections; for example, a `Class.MeshPart` includes sections like **Appearance** which allows you to change its color, material, transparency, and more.

<img src="../assets/studio/properties/Sections-Example.png" width="320" />

At the bottom of the window, you can define custom [attributes](../studio/properties.md#instance-attributes) for an object, similar to its default properties. Attributes and their values are saved with your place/assets and they're an ideal way for team members to experiment with different values during runtime, even if they don't understand the underlying code.

<img src="../assets/studio/properties/Attributes-Example.png" alt="A close up view of the Attributes section of the Properties window." width="320" />

### Asset Manager

The [Asset Manager](../projects/assets/manager.md), accessible from Studio's **Window** menu or **Home** tab, lets you manage places, images, meshes, audio, and more. It also provides a mechanism to bulk import large groups of assets.

### Toolbox

The [Toolbox](../projects/assets/toolbox.md), accessible from Studio's **Window** menu or **Home** tab, contains a selection of models, images, meshes, audio, plugins, videos, and fonts made by Roblox or Roblox community members. It also includes all of the creations that you've personally [distributed on the Creator Store](../production/creator-store.md) or those which were distributed by [groups](../projects/groups.md) you belong to.

<img src="../assets/studio/toolbox/Model-Search-Example.png" width="360" alt="The Toolbox window." />

### Output

The [Output](../studio/output.md) window, accessible from Studio's **Window** menu or **Script** tab, displays errors captured from running scripts, messages from Roblox Engine, messages from calls to `Global.LuaGlobals.print()`, and errors from calls to `Global.RobloxGlobals.warn()`.

### Command Bar

The **Command Bar**, accessible from Studio's **Script** tab toolbar or the **Window**&nbsp;⟩ **Script** menu, lets you execute Luau code outside of scripts. To quickly jump to the command bar at any time, press <kbd>Ctrl</kbd><kbd>9</kbd> (Windows) or <kbd>⌘</kbd><kbd>9</kbd> (Mac).

<BetaAlert betaName="Multi-line Command Bar" leadIn="Most of the features outlined below are in beta and must be enabled through " leadOut="." components={props.components} />

<img src="../assets/studio/general/Command-Bar.png" width="840" />

Features include:

- **Multiline editing** — Press <kbd>Enter</kbd> to insert new lines while typing. The bar starts with 2 lines, grows up to 10 lines as new lines are inserted, and shrinks as lines are deleted. When you're ready to run/execute the contents of the bar, click the **Run** button or use the shortcut <kbd>Ctrl</kbd><kbd>Enter</kbd> (<kbd>⌘</kbd><kbd>Enter</kbd>).

- **Command history** — The last 10 executed commands are visible by clicking the **History** button and navigating to the **Recent** tab. Clicking on a command in the list loads it into the bar, or you can navigate the list with <kbd>↑</kbd>/<kbd>↓</kbd> and insert the highlighted command with <kbd>Enter</kbd>. Alternatively, you can scrub through commands with <Typography noWrap><kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>↑</kbd>/<kbd>↓</kbd></Typography> when the command bar is selected.

- **Saved commands** — You can explicitly save commands with the **Save** button or the default shortcut <kbd>Ctrl</kbd><kbd>B</kbd> (<kbd>⌘</kbd><kbd>B</kbd>). Saved commands can be accessed through the **Saved** tab in the popup list, and the mechanics of loading saved commands from the list are the same as those in the command history.

- **Script Editor integration** — The command bar is an embedded script editor and supports a wide subset of Studio's [Script Editor](./script-editor.md) features, including [autocomplete](./script-editor.md#autocomplete-features), Luau [linting](https://luau.org/lint), [go&nbsp;to declaration](./script-editor.md#go-to-declaration), [function filter](./script-editor.md#script-function-filter), [Code Assist](./script-editor.md#code-assist), and [multi‑cursor](./script-editor.md#multi-cursor).

## Layout customization

Studio's drag-and-drop interface lets you easily customize window layout to best suit your workflows.

### Reposition windows

You can reposition any window by click-dragging its **header bar**. As you begin dragging the window, the interface reveals **empty docking area** regions. If you drag the mouse pointer into any empty region, a floating **position selector** appears in that region. Dragging the pointer over the "center" of the floating selector targets the empty region as the dragged window's destination, indicated by the region darkening and becoming outlined.

<figure>
<img src="../assets/studio/general/Docking-Position-Selector-Empty.png" width="880" alt="Mouse pointer hovering over the 'center' icon of the position selector in an empty docking area, showing that region as the dragged window's destination." />
<figcaption>Mouse pointer hovering over the "center" icon of the position selector in an empty docking area</figcaption>
</figure>

If you drag the mouse pointer into a **populated** region such as the 3D viewport, a floating position selector appears with multiple options for the window's destination. For example, dragging the pointer over the "left" icon will position the window on the region's left side.

<Tabs>
  <TabItem label="Viewport left">
	<img src="../assets/studio/general/Docking-Position-Selector-Left.png" width="880" height="520" alt="Mouse pointer hovering over the 'left half' icon of the position selector in a populated region, showing the left side of the region as the dragged window's destination." />
  </TabItem>
  <TabItem label="Viewport right">
    <img src="../assets/studio/general/Docking-Position-Selector-Right.png" width="880" height="520" alt="Mouse pointer hovering over the 'right half' icon of the position selector in a populated region, showing the right side of the region as the dragged window's destination." />
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
  <img src="../assets/studio/general/Docking-Pinned-Tabs.png" width="800" alt="An example 3D viewport where the Explorer, Properties, and Terrain Editor windows are pinned to the right of the Studio window." />
  <figcaption>Three windows pinned to the right side of the Studio window</figcaption>
</figure>

To pin a window or an entire [group](#group-windows) of windows, click the "collapse" button. Alternatively, to un‑pin a pinned window/group, open it by clicking its tab, then click the "expand" button.

<img src="../assets/studio/general/Docking-Expand-Collapse.png" width="320" alt="A close up view of the Explorer window with the Collapse button highlighted." />

### Float windows

To float a window freely of other windows, simply drag‑and‑drop it without selecting any icon from the floating [position selector](#reposition-windows).

## Next-gen toolbar mapping

<BetaAlert betaName="Next Gen Studio Preview" leadIn="The following remapping reference applies to the next-gen Studio toolbar beta, currently enabled by default through " leadOut="." components={props.components} />

The **next-gen Studio toolbar** introduces a wide array of improvements and optimizations, including cleaner appearance, customizable tabs with your own tool collections, and the ability to show/hide tabs as desired. The following tables map the previous Studio toolbar workflows to next‑gen equivalents.

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
			<td>🄐 **Home** tab&nbsp;⟩ **Asset&nbsp;Manager**<br />🄑 Application's **Window** menu&nbsp;⟩ **Asset&nbsp;Manager**</td>
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
			<td>Manage Plugins</td>
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
			<td>Right‑click in the [Explorer](./explorer.md) and select **Show&nbsp;Services…** from the context menu</td>
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
