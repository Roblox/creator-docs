---
title: Terrain Editor
description: The Terrain Editor tools generate and sculpt realistic terrain environments such as mountains, bodies of water, grass-covered hills, or a flat desert.
---

The **Terrain Editor**, accessible from Studio's **Home** tab or **Window**&nbsp;⟩ **3D** menu, lets you generate and manipulate [environmental terrain](../parts/terrain.md) through its [Create](#create-tab) and [Edit](#edit-tab) toolsets.

<img src="../assets/studio/general/Toolbar-Terrain-Editor.png" width="800" alt="Terrain Editor indicated in Studio's toolbar" />

<Alert severity="success">
For detailed instructions on working with terrain, see the [environmental terrain](../parts/terrain.md) guide.
</Alert>

## Create tab

The **Create** tab includes the [Import](#import), [Generate](#generate), and [Clear](#clear) tools.

### Import

The **Import** tool imports a [heightmap](../parts/terrain.md#heightmaps-and-colormaps) and optional [colormap](../parts/terrain.md#heightmaps-and-colormaps) and applies them to a selected region.

<img src="../assets/studio/terrain-editor/Create-Tab-Import.png" width="360" alt="Import tool indicated in Create tab of Terrain Editor" />

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/modeling/terrain/Terrain-Heightmap.png" alt="Example heightmap image" />
    <figcaption>Heightmap</figcaption>
  </figure>
	<figure>
    <img src="../assets/modeling/terrain/Terrain-Colormap.png" alt="Example colormap image" />
    <figcaption>Colormap</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/terrain/Terrain-Colormap-Result.jpg" alt="Terrain generated from the example heightmap and colormap" />
    <figcaption>Generated terrain</figcaption>
  </figure>
</GridContainer>

<video src="../assets/studio/terrain-editor/Import-Tool.mp4" controls width="90%" alt="Video of terrain generating automatically via the Import tool"></video>

<table size="small">
<thead>
	<tr>
    <th colspan="2">Selection settings</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td colspan="2">Size, position, and snapping options as outlined for the [Select](#select) tool.</td>
	</tr>
</tbody>
<thead>
	<tr>
    <th colspan="2">Heightmap settings</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>**Heightmap**</td>
		<td>Imports a heightmap from a local image file.</td>
	</tr>
	<tr>
		<td>**Colormap**</td>
		<td>Imports a colormap from a local image file to use alongside a heightmap.</td>
	</tr>
	<tr>
		<td>**Default Material**</td>
		<td>Specifies one consistent material to apply across all of the generated terrain. This is overridden by materials based on the colormap, if imported.</td>
	</tr>
</tbody>
</table>

### Generate

The **Generate** tool procedurally generates terrain within a selected region. This is useful if you want to create a large map and then fine-tune terrain details using the [Edit](#edit-tab) tab tools.

<img src="../assets/studio/terrain-editor/Create-Tab-Generate.png" width="360" alt="Generate tool indicated in Create tab of Terrain Editor" />

<video src="../assets/studio/terrain-editor/Generate-Tool.mp4" controls width="90%" alt="Video of terrain generating procedurally via the Generate tool"></video>

<table size="small">
<thead>
	<tr>
    <th colspan="2">Selection settings</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td colspan="2">Size, position, and snapping options as outlined for the [Select](#select) tool.</td>
	</tr>
</tbody>
<thead>
	<tr>
    <th colspan="2">Biome settings</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>**Biomes**</td>
		<td>Includes the selected biomes in the generated terrain.</td>
	</tr>
	<tr>
		<td>**Blending**</td>
		<td>Adjusts how the biomes blend into one another, with higher values a bit smoother.</td>
	</tr>
	<tr>
		<td>**Caves**</td>
		<td>Includes caves in the generated terrain.</td>
	</tr>
	<tr>
		<td>**Biome Size**</td>
		<td>Sets the size of the biomes within the overall terrain size.</td>
	</tr>
	<tr>
		<td>**Seed**</td>
		<td>A number that Studio generates to determine the shape of the terrain. When you change this number, Studio generates a new terrain with the same settings.</td>
	</tr>
</tbody>
</table>

### Clear

The **Clear** tool reveals a button that clears all terrain within the entire place.

<img src="../assets/studio/terrain-editor/Create-Tab-Clear.png" width="360" alt="Clear tool indicated in Create tab of Terrain Editor" />

## Edit tab

The **Edit** tab includes the [Select](#select), [Transform](#transform), [Fill](#fill), [Sea&nbsp;Level](#sea-level), [Draw](#draw), [Sculpt](#sculpt), [Smooth](#smooth), [Paint](#paint), and [Flatten](#flatten) tools.

### Select

The **Select** tool is a universal tool for selecting rectangular regions of terrain. With the tool enabled, select a region by clicking and dragging in the 3D viewport, reposition it with the **move** draggers, and edit its size with the **scale** handles. Alternatively, enter values into the tool's **X**/**Y**/**Z** inputs to set a specific position and size.

<img src="../assets/studio/terrain-editor/Edit-Tab-Select.png" width="360" alt="Select tool indicated in Edit tab of Terrain Editor" />

<table size="small">
<thead>
	<tr>
    <th colspan="2">Selection settings</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>**Size**</td>
		<td>Sets specific **X**/**Y**/**Z** values for the selection's size, in studs.</td>
	</tr>
	<tr>
		<td>**Position**</td>
		<td>Sets specific **X**/**Y**/**Z** values for the selection's position.</td>
	</tr>
	<tr>
		<td>**Snap to Voxels**</td>
		<td>Snaps the selection bounds to the nearest voxel.</td>
	</tr>
</tbody>
</table>

<figure>
<img src="../assets/studio/terrain-editor/Select-Region-Labeled.jpg" width="800" alt="Move draggers and scale handles on a selected region" />
<figcaption>Move draggers and scale handles on a selected region</figcaption>
</figure>

Studio also supports the following keyboard and mouse shortcuts, assuming the **Select** tool is active and nothing is selected in the [Explorer](../studio/explorer.md) hierarchy.

<table size="small">
  <thead>
    <tr>
      <th>Windows</th>
			<th>Mac</th>
      <th>Action</th>
    </tr>
	</thead>
	<tbody>
    <tr>
      <td><kbd>Ctrl</kbd><kbd>C</kbd></td>
			<td><kbd>⌘</kbd><kbd>C</kbd></td>
      <td>Copy terrain within the selected region to the clipboard.</td>
    </tr>
    <tr>
      <td><kbd>Ctrl</kbd><kbd>V</kbd></td>
			<td><kbd>⌘</kbd><kbd>V</kbd></td>
      <td>Paste terrain that has been copied to the clipboard and swap to the [Transform](#transform) tool so that the new terrain can be transformed.</td>
    </tr>
		<tr>
      <td><kbd>Ctrl</kbd><kbd>X</kbd></td>
			<td><kbd>⌘</kbd><kbd>X</kbd></td>
      <td>Cut terrain within the selected region to the clipboard.</td>
    </tr>
		<tr>
      <td><kbd>Ctrl</kbd><kbd>D</kbd></td>
			<td><kbd>⌘</kbd><kbd>D</kbd></td>
      <td>Duplicate terrain within the selected region and swap to the [Transform](#transform) tool so that the new terrain can be transformed.</td>
    </tr>
		<tr>
      <td><kbd>Delete</kbd></td>
			<td><kbd>Delete</kbd></td>
      <td>Delete terrain within the selected region.</td>
    </tr>
		<tr>
      <td><kbd>Shift</kbd></td>
			<td><kbd>Shift</kbd></td>
      <td>When held down while dragging any **scale** handle, scales the region proportionally across all other axes.</td>
    </tr>
		<tr>
      <td><kbd>Ctrl</kbd></td>
			<td><kbd>⌘</kbd></td>
      <td>When held down while dragging any **scale** handle, scales the region equally in both the positive and negative direction along that axis.</td>
    </tr>
	</tbody>
</table>

### Transform

The **Transform** tool manipulates entire [selected](#select) regions to a new position, size, or orientation. With the tool enabled, transform a selected region with the **move** draggers, **rotate** rings, and **scale** handles. Alternatively, enter values into the tool's **X**/**Y**/**Z** inputs to set a specific position, size, and rotation.

<img src="../assets/studio/terrain-editor/Edit-Tab-Transform.png" width="360" alt="Transform tool indicated in Edit tab of Terrain Editor" />

<table size="small">
<thead>
	<tr>
    <th colspan="2">Transform settings</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>**Size**</td>
		<td>Sets specific **X**/**Y**/**Z** values for the selection's size in studs.</td>
	</tr>
	<tr>
		<td>**Position**</td>
		<td>Sets specific **X**/**Y**/**Z** values for the selection's position.</td>
	</tr>
	<tr>
		<td>**Rotation**</td>
		<td>Sets specific **X**/**Y**/**Z** values for the selection's rotation in degrees.</td>
	</tr>
	<tr>
		<td>**Merge Empty**</td>
		<td>When enabled, air voxels in the selection will overwrite existing voxels at the destination.</td>
	</tr>
	<tr>
		<td>**Live Edit**</td>
		<td>When enabled, terrain is constantly updated while being transformed. To view only a wireframe preview of the transformation, disable live edit mode and then, while transforming, press <kbd>Enter</kbd>/<kbd>Return</kbd> or click the **Apply** button to apply the changes.</td>
	</tr>
	<tr>
		<td>**Snap to Voxels**</td>
		<td>Snaps the selection bounds to the nearest voxel.</td>
	</tr>
</tbody>
</table>

<figure>
<img src="../assets/studio/terrain-editor/Transform-Region-Labeled.jpg" width="780" alt="Move draggers, rotate rings, and scale handles on a selected region" />
<figcaption>Move draggers, rotate rings, and scale handles on a selected region</figcaption>
</figure>

<Alert severity="warning">
Before rotating a region with the visual **rotate** rings, check the rotation snapping setting in Studio's toolbar. Disable rotation snapping entirely for free-form rotation.
</Alert>

<Alert severity="info">
Similar to [selecting](#select) a region, holding <kbd>Shift</kbd> while dragging any **scale** handle scales the region proportionally across all other axes, and holding <kbd>Ctrl</kbd> or <kbd>⌘</kbd> while dragging scales the region equally in both the positive and negative direction along that axis.
</Alert>

### Fill

The **Fill** tool fills an entire [selected](#select) region with a specific material, or replaces all material within the region with another material.

<img src="../assets/studio/terrain-editor/Edit-Tab-Fill.png" width="360" alt="Fill tool indicated in Edit tab of Terrain Editor" />

<table size="small">
<thead>
	<tr>
    <th colspan="2">Selection settings</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td colspan="2">Size, position, and snapping options as outlined for the [Select](#select) tool.</td>
	</tr>
</tbody>
<thead>
	<tr>
    <th colspan="2">Material settings</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>**Fill Mode**</td>
		<td>Toggles the tool between **Fill** and **Replace** mode.</td>
	</tr>
	<tr>
		<td>**Source Material**</td>
		<td>In **Fill** mode, the desired fill material. In **Replace** mode, the material to replace.</td>
	</tr>
	<tr>
		<td>**Target Material**</td>
		<td>In **Replace** mode, the material to replace the source material with.</td>
	</tr>
</tbody>
</table>

<figure>
<img src="../assets/studio/terrain-editor/Fill-Region.jpg" width="780" alt="Region filled with Salt material" />
<figcaption>Selected region filled with Salt material</figcaption>
</figure>

### Sea Level

The **Sea Level** tool lets you create a consistent water level or remove all water within a region.

<img src="../assets/studio/terrain-editor/Edit-Tab-Sea-Level.png" width="360" alt="Sea Level tool indicated in Edit tab of Terrain Editor" />

<video src="../assets/studio/terrain-editor/Sea-Level-Tool.mp4" controls width="90%" alt="Video of sea level being created and modified using the Sea Level tool"></video>

<table size="small">
<thead>
	<tr>
    <th colspan="2">Sea level settings</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>**Size**</td>
		<td>Sets specific **X**/**Y**/**Z** values for the selection's size in studs.</td>
	</tr>
	<tr>
		<td>**Position**</td>
		<td>Sets specific **X**/**Y**/**Z** values for the selection's position.</td>
	</tr>
	<tr>
		<td>**Snap to Voxels**</td>
		<td>Snaps the selection bounds to the nearest voxel.</td>
	</tr>
</tbody>
</table>

### Draw

The **Draw** tool **adds** or **subtracts** terrain using the brush. This tool functions in a dual mode where holding down <kbd>Ctrl</kbd> or <kbd>⌘</kbd> toggles on "subtract" mode instead of the default "add" mode. Additionally, holding down <kbd>Shift</kbd> temporarily activates the [Smooth](#smooth) tool.

<img src="../assets/studio/terrain-editor/Edit-Tab-Draw.png" width="360" alt="Draw tool indicated in Edit tab of Terrain Editor" />

<video src="../assets/studio/terrain-editor/Draw-Tool.mp4" controls width="90%" alt="Video of terrain being added and subtracted using the Draw tool"></video>

<table size="small">
<thead>
	<tr>
    <th colspan="2">Brush settings</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>**Brush Mode**</td>
		<td>Toggles the tool between **Add** and **Subtract** mode. Also toggled by holding down <kbd>Ctrl</kbd> or <kbd>⌘</kbd>.</td>
	</tr>
	<tr>
		<td>**Brush Shape**</td>
		<td>Sets the brush shape to either a **sphere**, **box**, or **cylinder**.<br /><img src="../assets/studio/terrain-editor/Brush-Shape-Icons.png" width="124" alt="Brush shape icons in the Terrain Editor" /></td>
	</tr>
	<tr>
		<td>**Brush Size**</td>
		<td>Sets the brush size from 1 to 64. If you choose a brush shape of **box** or **cylinder**, a **Height** slider/input also appears to adjust the brush height proportionally or independently of the base size.</td>
	</tr>
	<tr>
		<td>**Pivot Position**</td>
		<td>Sets the vertical pivot point of the brush to either the bottom, center, or top of where the brush connects with existing terrain.</td>
	</tr>
	<tr>
		<td>**Snapping**</td>
		<td>Whether snapping is off or to the nearest voxel.</td>
	</tr>
	<tr>
		<td>**Plane Lock**</td>
		<td>Toggles whether to enable a visual plane which the brush locks to. In **Auto** mode, the plane tilts and rotates with the camera. In **Manual** mode, the **Edit&nbsp;Plane** option appears, letting you set a specific position/orientation through the visual draggers or **X**/**Y**/**Z** inputs.</td>
	</tr>
	<tr>
		<td>**Ignore Water**</td>
		<td>Ignores water when adding or subtracting terrain.</td>
	</tr>
	<tr>
		<td>**Ignore Parts**</td>
		<td>Ignores [parts](../parts/index.md) in regards to brush placement while moving the mouse pointer across part surfaces.</td>
	</tr>
</tbody>
<thead>
	<tr>
    <th colspan="2">Material settings</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>**Auto Material**</td>
		<td>Uses the same terrain material in the brush's vicinity when adding new terrain.</td>
	</tr>
	<tr>
		<td>**Source Material**</td>
		<td>Sets the [material](../parts/terrain.md#terrain-materials) for **Add** mode.</td>
	</tr>
</tbody>
</table>

### Sculpt

The **Sculpt** tool **adds** or **subtracts** terrain using the brush. Unlike the [Draw](#draw) tool, this tool includes a **strength** slider/input to allow for more gentle manipulation of terrain. This tool functions in a dual mode where holding down <kbd>Ctrl</kbd> or <kbd>⌘</kbd> toggles on "subtract" mode instead of the default "add" mode, and holding down <kbd>Shift</kbd> temporarily activates the [Smooth](#smooth) tool.

<img src="../assets/studio/terrain-editor/Edit-Tab-Sculpt.png" width="360" alt="Sculpt tool indicated in Edit tab of Terrain Editor" />

<video src="../assets/studio/terrain-editor/Sculpt-Tool.mp4" controls width="90%" alt="Video of terrain being added and subtracted using the Sculpt tool"></video>

<table size="small">
<thead>
	<tr>
    <th>Option</th>
		<th>Description</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>**Brush Mode**</td>
		<td>Toggles the tool between **Add** and **Subtract** mode. Also toggled by holding down <kbd>Ctrl</kbd> or <kbd>⌘</kbd>.</td>
	</tr>
	<tr>
		<td>**Brush Shape**</td>
		<td>Sets the brush shape to either a **sphere**, **box**, or **cylinder**.<br /><img src="../assets/studio/terrain-editor/Brush-Shape-Icons.png" width="124" alt="Brush shape icons in the Terrain Editor" /></td>
	</tr>
	<tr>
		<td>**Brush Size**</td>
		<td>Sets the brush size from 1 to 64. If you choose a brush shape of **box** or **cylinder**, a **Height** slider/input also appears to adjust the brush height proportionally or independently of the base size.</td>
	</tr>
  <tr>
    <td>**Strength**</td>
    <td>Sets the brush strength from 0.1 to 1.</td>
  </tr>
	<tr>
		<td>**Plane Lock**</td>
		<td>Toggles whether to enable a visual plane which the brush locks to. In **Auto** mode, the plane tilts and rotates with the camera. In **Manual** mode, the **Edit&nbsp;Plane** option appears, letting you set a specific position/orientation through the visual draggers or **X**/**Y**/**Z** inputs.</td>
	</tr>
	<tr>
		<td>**Ignore Water**</td>
		<td>Ignores water when adding or subtracting terrain.</td>
	</tr>
	<tr>
		<td>**Ignore Parts**</td>
		<td>Ignores [parts](../parts/index.md) in regards to brush placement while moving the mouse pointer across part surfaces.</td>
	</tr>
	<tr>
		<td>**Auto Material**</td>
		<td>Uses the same terrain material in the brush's vicinity when adding new terrain.</td>
	</tr>
	<tr>
		<td>**Source Material**</td>
		<td>Sets the [material](../parts/terrain.md#terrain-materials) for **Add** mode.</td>
	</tr>
</tbody>
</table>

### Smooth

The **Smooth** tool smoothes out abrupt edges in terrain using the brush. This tool can be used in standalone mode, or you can toggle it on by holding <kbd>Shift</kbd> while using the [Draw](#draw) or [Sculpt](#sculpt) tools.

<img src="../assets/studio/terrain-editor/Edit-Tab-Smooth.png" width="360" alt="Smooth tool indicated in Edit tab of Terrain Editor" />

<video src="../assets/studio/terrain-editor/Smooth-Tool.mp4" controls width="90%" alt="Video of terrain being smoothed using the Smooth tool"></video>

<table size="small">
<thead>
	<tr>
    <th>Option</th>
		<th>Description</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>**Brush Shape**</td>
		<td>Sets the brush shape to either a **sphere**, **box**, or **cylinder**.<br /><img src="../assets/studio/terrain-editor/Brush-Shape-Icons.png" width="124" alt="Brush shape icons in the Terrain Editor" /></td>
	</tr>
	<tr>
		<td>**Brush Size**</td>
		<td>Sets the brush size from 1 to 64. If you choose a brush shape of **box** or **cylinder**, a **Height** slider/input also appears to adjust the brush height proportionally or independently of the base size.</td>
	</tr>
  <tr>
    <td>**Strength**</td>
    <td>Sets the brush strength from 0.1 to 1.</td>
  </tr>
	<tr>
		<td>**Pivot Position**</td>
		<td>Sets the vertical pivot point of the brush to either the bottom, center, or top of where the brush connects with existing terrain.</td>
	</tr>
	<tr>
		<td>**Snapping**</td>
		<td>Whether snapping is off or to the nearest voxel.</td>
	</tr>
	<tr>
		<td>**Plane Lock**</td>
		<td>Toggles whether to enable a visual plane which the brush locks to. In **Auto** mode, the plane tilts and rotates with the camera. In **Manual** mode, the **Edit&nbsp;Plane** option appears, letting you set a specific position/orientation through the visual draggers or **X**/**Y**/**Z** inputs.</td>
	</tr>
	<tr>
		<td>**Ignore Water**</td>
		<td>Ignores water when smoothing terrain.</td>
	</tr>
	<tr>
		<td>**Ignore Parts**</td>
		<td>Ignores [parts](../parts/index.md) in regards to brush placement while moving the mouse pointer across part surfaces.</td>
	</tr>
</tbody>
</table>

### Paint

The **Paint** tool, using the brush, **paints** a terrain [material](../parts/terrain.md#terrain-materials) over an existing material or **replaces** one material with another material.

<img src="../assets/studio/terrain-editor/Edit-Tab-Paint.png" width="360" alt="Paint tool indicated in Edit tab of Terrain Editor" />

<video src="../assets/studio/terrain-editor/Paint-Tool.mp4" controls width="90%" alt="Video of terrain being painted and replaced using the Paint tool"></video>

<table size="small">
<thead>
	<tr>
    <th>Option</th>
		<th>Description</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>**Brush Shape**</td>
		<td>Sets the brush shape to either a **sphere**, **box**, or **cylinder**.<br /><img src="../assets/studio/terrain-editor/Brush-Shape-Icons.png" width="124" alt="Brush shape icons in the Terrain Editor" /></td>
	</tr>
	<tr>
		<td>**Brush Size**</td>
		<td>Sets the brush size from 1 to 64. If you choose a brush shape of **box** or **cylinder**, a **Height** slider/input also appears to adjust the brush height proportionally or independently of the base size.</td>
	</tr>
	<tr>
		<td>**Pivot Position**</td>
		<td>Sets the vertical pivot point of the brush to either the bottom, center, or top of where the brush connects with existing terrain.</td>
	</tr>
	<tr>
		<td>**Snapping**</td>
		<td>Whether snapping is off or to the nearest voxel.</td>
	</tr>
	<tr>
		<td>**Plane Lock**</td>
		<td>Toggles whether to enable a visual plane which the brush locks to. In **Auto** mode, the plane tilts and rotates with the camera. In **Manual** mode, the **Edit&nbsp;Plane** option appears, letting you set a specific position/orientation through the visual draggers or **X**/**Y**/**Z** inputs.</td>
	</tr>
	<tr>
		<td>**Ignore Water**</td>
		<td>Ignores water when flattening terrain.</td>
	</tr>
	<tr>
		<td>**Ignore Parts**</td>
		<td>Ignores [parts](../parts/index.md) in regards to brush placement while moving the mouse pointer across part surfaces.</td>
	</tr>
  <tr>
		<td>**Material Mode**</td>
		<td>Toggles the tool between **Paint** and **Replace** mode. In **Paint** mode, choose the desired painting material from the tool's picker tiles. In **Replace** mode, choose both the **source** material to replace and the **target** material to replace it with.</td>
	</tr>
</tbody>
</table>

### Flatten

The **Flatten** tool flattens terrain to a consistent level across a visualized plane. By default, the tool lowers terrain above the plane **and** raises terrain below to the plane, but you can opt to selectively lower **or** raise through the tool's **Flatten&nbsp;Mode** option.

<img src="../assets/studio/terrain-editor/Edit-Tab-Flatten.png" width="360" alt="Flatten tool indicated in Edit tab of Terrain Editor" />

<video src="../assets/studio/terrain-editor/Flatten-Tool.mp4" controls width="90%" alt="Video of terrain being flattened to a plane using the Flatten tool"></video>

<table size="small">
<thead>
	<tr>
    <th>Option</th>
		<th>Description</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>**Brush Shape**</td>
		<td>Sets the brush shape to either a **sphere**, **box**, or **cylinder**.<br /><img src="../assets/studio/terrain-editor/Brush-Shape-Icons.png" width="124" alt="Brush shape icons in the Terrain Editor" /></td>
	</tr>
	<tr>
    <td>**Flatten Mode**</td>
    <td>**Erode to Flat**&sup1; flattens terrain above the plane. **Grow&nbsp;to&nbsp;Flat**&sup2; fills in terrain below the plane. **Flatten&nbsp;All**&sup3; removes terrain above the plane and fills in terrain below the plane.<br /><img src="../assets/studio/terrain-editor/Flatten-Mode-Icons.png" width="124" alt="Flatten Mode icons in the Terrain Editor" /></td>
  </tr>
	<tr>
		<td>**Brush Size**</td>
		<td>Sets the brush size from 1 to 64. If you choose a brush shape of **box** or **cylinder**, a **Height** slider/input also appears to adjust the brush height proportionally or independently of the base size.</td>
	</tr>
  <tr>
    <td>**Strength**</td>
    <td>Sets the brush strength from 0.1 to 1.</td>
  </tr>
	<tr>
		<td>**Pivot Position**</td>
		<td>Sets the vertical pivot point of the brush to either the bottom, center, or top of where the brush connects with existing terrain.</td>
	</tr>
	<tr>
		<td>**Snapping**</td>
		<td>Whether snapping is off or to the nearest voxel.</td>
	</tr>
	<tr>
		<td>**Flatten Plane**</td>
		<td>If set to **Fixed**, flattens terrain to a fixed visual plane in **Y** world space.</td>
	</tr>
	<tr>
		<td>**Ignore Water**</td>
		<td>Ignores water when flattening terrain.</td>
	</tr>
	<tr>
		<td>**Ignore Parts**</td>
		<td>Ignores [parts](../parts/index.md) in regards to brush placement while moving the mouse pointer across part surfaces.</td>
	</tr>
</tbody>
</table>

## Studio shortcuts

For tools which use the **brush** ([Draw](#draw), [Sculpt](#sculpt), [Smooth](#smooth), [Flatten](#flatten), [Paint](#paint)), Studio supports the following keyboard and mouse shortcuts.

<table size="small">
  <thead>
    <tr>
      <th>Windows</th>
			<th>Mac</th>
      <th>Action</th>
    </tr>
	</thead>
	<tbody>
		<tr>
      <td><kbd>Ctrl</kbd></td>
			<td><kbd>⌘</kbd></td>
      <td>When held down while using the [Draw](#draw) and [Sculpt](#sculpt) tools, toggles on the alternate brush mode. For example, toggles on "subtract" mode instead of the default "add" mode.</td>
    </tr>
		<tr>
      <td><kbd>Shift</kbd></td>
			<td><kbd>Shift</kbd></td>
      <td>When held down while using the [Draw](#draw) and [Sculpt](#sculpt) tools, temporarily activates the [Smooth](#smooth) tool.</td>
    </tr>
    <tr>
      <td><kbd>B</kbd></td>
			<td><kbd>B</kbd></td>
      <td>When held down while dragging the mouse or using the scroll wheel, adjusts the brush's **base size**.</td>
    </tr>
    <tr>
      <td><kbd>Ctrl</kbd><kbd>B</kbd></td>
			<td><kbd>⌘</kbd><kbd>B</kbd></td>
      <td>When held down while dragging the mouse or using the scroll wheel, adjusts the brush's **height**. Only applies if the brush's shape is set to **box** or **cylinder**.</td>
    </tr>
		<tr>
      <td><kbd>Shift</kbd><kbd>B</kbd></td>
			<td><kbd>Shift</kbd><kbd>B</kbd></td>
      <td>When held down while dragging the mouse or using the scroll wheel, adjusts the brush's **strength**. Only applies when using the [Sculpt](#sculpt), [Smooth](#smooth), or [Flatten](#flatten) tool.</td>
    </tr>
		<tr>
      <td><kbd>Alt</kbd></td>
			<td><kbd>⌥</kbd></td>
      <td>When held down on mouse click, shows the material picker.</td>
    </tr>
	</tbody>
</table>
