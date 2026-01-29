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

Beyond the default tool tabs, you can add **custom tabs** for your specific needs, either through Studio's interface or by editing local `.json` files.

<Alert severity="info">
The tab configuration system is intended for customizing the Studio toolbar using existing controls/widgets and plugins. It's not meant to replace Studio [plugins](./plugins.md) or interactive [widgets](./build-studio-widgets.md).
</Alert>

<Tabs>
<TabItem label="Studio">
The easiest way to create custom tabs is through Studio's workflow.

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

</TabItem>
<TabItem label="JSON">

Custom tab configurations are saved **locally** on each machine in `.json` format, allowing you to build customized tabs and share them with your team or the community.

1. Open the custom tabs folder which is stored in a location unaffected by Studio updates.

   - **Windows** — `%LOCALAPPDATA%\Roblox\<userID>\CustomRibbonTabs`
   - **Mac** — `~/Documents/Roblox/<userID>/CustomRibbonTabs`

2. In the `CustomRibbonTabs` directory are `.json` files which define the toolbar's structure:

   - The `RibbonLayout.json` file controls the overall ordering and visibility of tabs.

		```json title="RibbonLayout.json"
		{
			"TabLayout": [
				{
					"Identifier": {
						"Type": "BuiltIn",
						"Filename": "HomeTab"
					},
					"Visible": true
				},
		{
		```

   - Other `.json` files represent individual tabs and can be named whatever you prefer. Each file's `Name` represents the tab's name as it will appear in Studio.

		```json title="CustomTab.json"
		{
			"Name": "Custom",
			"Controls": [

			]
		}
		```

3. In the `Controls` array for a tab file, insert various buttons, submenus, and more. Each control's `Id` value must be **unique** within the file.

   The following examples illustrate common elements in a custom tab:

	<Tabs>
	<TabItem label="IconButton">
	`IconButton` inserts a button with an optional text label.

	```json title="CustomTab.json"
	{
		"Name": "Custom",
		"Controls": [
			{
				"Id": "Select",
				"Type": "IconButton",
				"Action": {
					"Category": "Actions",
					"DataModel": "Standalone",
					"ItemId": "Select",
					"PluginId": "BuilderTools"
				}
			},
		]
	}
	```

	</TabItem>
	<TabItem label="Separator">
	`Separator` inserts a non-interactable separation line. `Size` options are `Large`, `Medium`, or `Small`.

	```json title="CustomTab.json"
	{
		"Name": "Custom",
		"Controls": [
			{
				"Type": "Separator",
				"Size": "Large"
			},
		]
	}
	```

	</TabItem>
	<TabItem label="SplitButton">
	`SplitButton` inserts a button which reveals a dropdown menu when the small triangle to the right of its icon is pressed.

	```json title="CustomTab.json"
	{
		"Name": "Custom",
		"Controls": [
			{
				"Id": "SimpleSplit",
				"Type": "SplitButton",
				"Action": {
					"Category": "Actions",
					"DataModel": "Standalone",
					"ItemId": "Select",
					"PluginId": "BuilderTools"
				},
				"Children": [
					{
						"Type": "Column",
						"Children": [
							{
								"Id": "Move",
								"Type": "Option",
								"Action": {
									"Category": "Actions",
									"DataModel": "Standalone",
									"ItemId": "Move",
									"PluginId": "BuilderTools"
								}
							},
							{
								"Id": "Scale",
								"Type": "Option",
								"Action": {
									"Category": "Actions",
									"DataModel": "Standalone",
									"ItemId": "Scale",
									"PluginId": "BuilderTools"
								}
							},
							{
								"Id": "Rotate",
								"Type": "Option",
								"Action": {
									"Category": "Actions",
									"DataModel": "Standalone",
									"ItemId": "Rotate",
									"PluginId": "BuilderTools"
								}
							},
						]
					}
				]
			}
		]
	}
	```

	</TabItem>
	<TabItem label="IconButton (Plugin)">
	`IconButton` can be used to insert a button which links to a [plugin](./plugins.md) through its ID, assuming the plugin, such as [Tailor Swiftly](https://create.roblox.com/store/asset/130172194397869/Tailor-Swiftly), is installed in your version of Studio.

	```json title="CustomTab.json"
	{
		"Name": "Custom",
		"Controls": [
			{
				"Id": "PrinceTybalt_Tailor Swiftly",
				"Type": "IconButton",
				"Action": {
					"Category": "Actions",
					"DataModel": "Edit",
					"ItemId": "PrinceTybalt_Tailor Swiftly",
					"PluginId": "130172194397869",
					"PluginType": "Cloud"
				}
			}
		]
	}
	```

	</TabItem>
	<TabItem label="Text">
	`Text` inserts a basic text label, useful to label groups of other controls in submenus.

	```json title="CustomTab.json"
	{
		"Name": "Custom",
		"Controls": [
			{
				"Id": "CustomHeader",
				"Type": "Text",
				"Title": "Insert UI"
			},
		]
	}
	```

	</TabItem>
	</Tabs>

	<Alert severity="success">
	Beyond the above examples, you can right-click any default tab and select **Duplicate&nbsp;tab**. This will create a new custom tab and corresponding `.json` file in your local `CustomRibbonTabs` directory which you can inspect to explore how various default tools and menus are constructed.
	</Alert>

4. Save the `.json` file and then reload Studio's plugins:

   1. Right-click anywhere in the toolbar or mezzanine and select **Manage&nbsp;tabs**.
   2. Access the options menu from the popup's upper‑right corner and select **Reload&nbsp;custom&nbsp;tabs**.

      <img src="../assets/studio/general/Manage-Tabs-Popup-Options.png" width="300" alt="Options menu in the Manage Tabs popup." />

</TabItem>
</Tabs>

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
