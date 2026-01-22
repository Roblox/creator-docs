---
title: Environmental terrain
description: Explore how to generate and sculpt realistic terrain environments such as mountains, bodies of water, grass-covered hills, or a flat desert.
---

import BetaAlert from '../includes/beta-features/beta-alert.md'

Studio's [Terrain Editor](../studio/terrain-editor.md) lets you generate and sculpt detailed and realistic terrain environments such as mountains, bodies of water, grass-covered hills, or a flat desert. Terrain is made up of grids of **voxels** which are 4&times;4&times;4 stud regions in the 3D world with a set material.

<img src="../assets/studio/general/Toolbar-Terrain-Editor.png" width="800" alt="Terrain Editor indicated in Studio's toolbar" />

<img src="../assets/modeling/terrain/Showcase.jpg" width="100%" alt="Desert terrain with mountains in the distance" />

Using the editor tools, you can easily [generate](#generate-terrain) and edit terrain either at a [voxel](#detailed-editing) or [region](#large-scale-editing) level with the option of importing a [heightmap](#heightmaps-and-colormaps) and [colormap](#heightmaps-and-colormaps). For more precise, dynamic, or procedural terrain editing, you can also [script](#scripting) terrain creation.

## Terrain materials

The following default materials are available for terrain, and you can also apply [custom materials](../parts/materials.md#custom-materials). Materials affect both the shape and appearance of terrain in the world; for example, [animated grass](#grass-animation) renders only on the `Enum.Material.Grass|Grass` material and the `Enum.Material.Water|Water` material [ripples and shimmers](#water-appearance) with a subtle motion.

<GridContainer numColumns="4">
  <figure>
    <img src="../assets/modeling/terrain/Material-Asphalt.jpg" alt="Appearance of Asphalt material" />
    <figcaption>Asphalt</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/terrain/Material-Basalt.jpg" alt="Appearance of Basalt material" />
    <figcaption>Basalt</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/terrain/Material-Brick.jpg" alt="Appearance of Brick material" />
    <figcaption>Brick</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/terrain/Material-Cobblestone.jpg" alt="Appearance of Cobblestone material" />
    <figcaption>Cobblestone</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/terrain/Material-Concrete.jpg" alt="Appearance of Concrete material" />
    <figcaption>Concrete</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/terrain/Material-Cracked-Lava.jpg" alt="Appearance of Cracked Lava material" />
    <figcaption>Cracked Lava</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/terrain/Material-Glacier.jpg" alt="Appearance of Glacier material" />
    <figcaption>Glacier</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/terrain/Material-Grass.jpg" alt="Appearance of Grass material" />
    <figcaption>Grass</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/terrain/Material-Ground.jpg" alt="Appearance of Ground material" />
    <figcaption>Ground</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/terrain/Material-Ice.jpg" alt="Appearance of Ice material" />
    <figcaption>Ice</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/terrain/Material-Leafy-Grass.jpg" alt="Appearance of Leafy Grass material" />
    <figcaption>Leafy Grass</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/terrain/Material-Limestone.jpg" alt="Appearance of Limestone material" />
    <figcaption>Limestone</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/terrain/Material-Mud.jpg" alt="Appearance of Mud material" />
    <figcaption>Mud</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/terrain/Material-Pavement.jpg" alt="Appearance of Pavement material" />
    <figcaption>Pavement</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/terrain/Material-Rock.jpg" alt="Appearance of Rock material" />
    <figcaption>Rock</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/terrain/Material-Salt.jpg" alt="Appearance of Salt material" />
    <figcaption>Salt</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/terrain/Material-Sand.jpg" alt="Appearance of Sand material" />
    <figcaption>Sand</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/terrain/Material-Sandstone.jpg" alt="Appearance of Sandstone material" />
    <figcaption>Sandstone</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/terrain/Material-Slate.jpg" alt="Appearance of Slate material" />
    <figcaption>Slate</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/terrain/Material-Snow.jpg" alt="Appearance of Snow material" />
    <figcaption>Snow</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/terrain/Material-Water.jpg" alt="Appearance of Water material" />
    <figcaption>Water</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/terrain/Material-Wood-Planks.jpg" alt="Appearance of Wood Planks material" />
    <figcaption>Wood Planks</figcaption>
  </figure>
	<figure>
    <img src="../assets/modeling/terrain/Material-Air.png" alt="Air material icon (no visual appearance)" />
    <figcaption>Air</figcaption>
  </figure>
</GridContainer>

### Water appearance

By default, terrain water ripples, oscillates, and shimmers with a subtle motion.

<video src="../assets/modeling/terrain/Water-Appearance.mp4" controls width="800" alt="Terrain water rippling, oscillating, and shimmering with a subtle motion"></video>

To customize the color and motion of water:

1. In the **Explorer** window, navigate to the `Class.Workspace`, then select the `Class.Terrain` object.

   <img src="../assets/studio/explorer/Workspace-Terrain.png" width="320" alt="Terrain object shown in Explorer window of Studio" />

1. In the **Properties** window, customize the appearance of water through the following properties:

   <table>
   <thead>
     <tr>
       <th>Property</th>
       <th>Description</th>
     </tr>
   </thead>
   <tbody>
     <tr>
       <td>`Class.Terrain.WaterColor|WaterColor`</td>
       <td>Adjusts the overall hue of all terrain water in the experience.</td>
     </tr>
     <tr>
       <td>`Class.Terrain.WaterReflectance|WaterReflectance`</td>
       <td>Adjusts how much water surfaces reflect the sky and surrounding objects from a value of 1 (high) to 0 (none).</td>
     </tr>
     <tr>
       <td>`Class.Terrain.WaterTransparency|WaterTransparency`</td>
       <td>Adjusts how transparent water is from a value of 1 (clear) to 0 (opaque).</td>
     </tr>
     <tr>
       <td>`Class.Terrain.WaterWaveSize|WaterWaveSize`</td>
       <td>Adjusts the size of waves from a value of 1 (large) to 0 (none).</td>
     </tr>
     <tr>
       <td>`Class.Terrain.WaterWaveSpeed|WaterWaveSpeed`</td>
       <td>Adjusts the speed of waves from a value of 100 (turbulent) to 0 (still).</td>
     </tr>
   </tbody>
   </table>

<Alert severity="info">
Some water properties are only visible while playtesting. To preview all properties while editing, open [Studio Settings](../studio/setup.md#customization), search for **Editor&nbsp;Quality&nbsp;Level**, and set it to the highest level.
</Alert>

### Grass animation

While most materials are static, you can add animated blades of grass to the `Enum.Material.Grass|Grass` terrain material. By default, grass sways gently in a simulated wind, and you can adjust the direction/strength of its animation through [global wind](../environment/global-wind.md).

<video src="../assets/lighting-and-effects/aero-fluid-dynamics/Global-Wind-Showcase.mp4" controls width="800" alt="Video of wind blowing clouds and grass across rolling hills in the 3D world"></video>

<Alert severity="info">
Note that the speed of animated grass — but not its vector direction&nbsp;— will be reduced if the player has toggled on the **Reduce&nbsp;Motion** [accessibility](../production/publishing/accessibility.md#reduced-motion) setting from the Roblox or in‑experience **Settings** menu.
</Alert>

To add animated grass to the `Enum.Material.Grass|Grass` material:

1. In the **Explorer** window, navigate to the `Class.Workspace`, then select the `Class.Terrain` object.

   <img src="../assets/studio/explorer/Workspace-Terrain.png" width="320" alt="Terrain object shown in Explorer window of Studio" />

2. In the **Properties** window, toggle on the `Class.Terrain.Decoration|Decoration` property.

   <img src="../assets/studio/properties/Terrain-Decoration.png" width="320" alt="Decoration property of Terrain object in Properties window of Studio" />

3. Adjust the grass length by entering a value between `0.1` and `1` for the `Class.Terrain.GrassLength|GrassLength` property.

   <img src="../assets/studio/properties/Terrain-GrassLength.png" width="320" alt="GrassLength property of Terrain object in Properties window of Studio" />

    <img src="../assets/modeling/terrain/Terrain-GrassLength.jpg" width="720" alt="GrassLength comparison depicted on rolling grassland hills." />

4. Adjust the direction and strength of its animation through [global wind](../environment/global-wind.md).

### Custom terrain colors

Each terrain material is assigned a default color, but you can customize any material's color to better fit your experience.

<Tabs>
  <TabItem label="Default">
    <img src="../assets/modeling/terrain/Showcase.jpg" width="800" height="450" alt="Default terrain colors used in desert landscape" />
  </TabItem>
	<TabItem label="Fantasy">
    <img src="../assets/modeling/terrain/Custom-Colors-Fantasy.jpg" width="800" height="450" alt="Custom terrain colors applied for fantasy landscape" />
  </TabItem>
	<TabItem label="Tundra">
    <img src="../assets/modeling/terrain/Custom-Colors-Tundra.jpg" width="800" height="450" alt="Custom terrain colors applied for tundra landscape" />
  </TabItem>
</Tabs>

To customize any material color other than water:

1. In the **Explorer** window, navigate to the `Class.Workspace`, then select the `Class.Terrain` object.

   <img src="../assets/studio/explorer/Workspace-Terrain.png" width="320" alt="Terrain object shown in Explorer window of Studio" />

2. In the **Properties** window, expand `Class.Terrain.MaterialColors|MaterialColors`. All materials display with their RGB code.

   <img src="../assets/studio/properties/Terrain-MaterialColors-Expand.png" width="320" alt="MaterialColors property shown in Properties window of Studio" />

3. For any material, either input a new RGB code or click the color box to open the [colors popup](../parts/index.md#color).

## Generate terrain

Using the following tools and methods, you can generate large
areas of terrain procedurally through tooling or scripting, or automatically based on a heightmap and colormap.

### Generate tool

The **Generate** tool allows you to procedurally generate terrain in seconds. This is useful if you want to create a large map and fine-tune [terrain details](#detailed-editing).

1. In the editor window, navigate to the **Create** tab and select the **Generate** tool.

   <img src="../assets/studio/terrain-editor/Create-Tab-Generate.png" width="360" alt="Generate tool indicated in Create tab of Terrain Editor" />

2. In the 3D viewport, move/resize the **selection region** in which to generate terrain. Alternatively, expand the tool's **Selection&nbsp;Settings** and enter values into the **X**/**Y**/**Z** inputs to set a specific size and position.

3. In the tool's **Biome Settings** section, choose the following biomes to include in the new terrain:

   <Grid container spacing={1}>
   <Grid item>
   <ul>
   <li>Arctic</li>
   <li>Dunes</li>
   <li>Canyons</li>
   </ul>
   </Grid>
   <Grid item>
   <ul>
   <li>Lavascape</li>
   <li>Water</li>
   <li>Mountains</li>
   </ul>
   </Grid>
   <Grid item>
   <ul>
   <li>Hills</li>
   <li>Plains</li>
   <li>Marsh</li>
   </ul>
   </Grid>
   </Grid>

4. Click the **Generate** button.

   <video src="../assets/studio/terrain-editor/Generate-Tool.mp4" controls width="800" alt="Video of terrain generating procedurally via the Generate tool"></video>

### Heightmaps and colormaps

A **heightmap** is a 2D representation of a 3D terrain map, as viewed directly from above. Brighter areas of a heightmap result in higher terrain, like mountains, while darker areas result in lower regions, like valleys.

An optional **colormap**, along with a heightmap, converts colors to terrain materials using a **color key**.

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

1 pixel in a heightmap represents 4 studs in Studio, and Studio supports a maximum of 4096&times;4096 pixels in either `.jpg` or `.png` format.

To import a heightmap and optional colormap:

1. In the editor window, navigate to the **Create** tab and select the **Import** tool.

   <img src="../assets/studio/terrain-editor/Create-Tab-Import.png" width="360" alt="Import tool indicated in Create tab of Terrain Editor" />

2. In the tool's **Map Settings** section, click the import button and choose the image you want to import as a heightmap.
3. In the tool's **Material Settings** section, select a terrain material or, alternatively, upload a colormap.

   <Tabs>
   <TabItem label="Material">
   To apply one consistent material across all of the generated terrain, select the **Material** tab and pick a terrain material.
   </TabItem>
   <TabItem label="Colormap">
    To apply a colormap, click the **Colormap** tab, click its import button, and choose the file to import. Colors on the image should match the following RGB/hex values and use hard edges, since anti‑aliasing or edge smoothing may create pixel colors outside the expected value ranges.

   The following table describes color mapping to a corresponding material. If your colormap contains a color that's not in the table, Studio chooses the closest matching material; for this reason, it is best to download the <a href="../assets/modeling/terrain/RobloxColorMapIndex.png" target="_blank" rel="noopener">`RobloxColorMapIndex`</a> file and directly sample its colors, or type the exact RGB/hex values into the color picker of your image editing application.

   <table size="small">
   <thead>
     <tr>
       <th>Material</th>
       <th>RGB Value</th>
       <th>Hex Value</th>
       <th>Color</th>
     </tr>
   </thead>
   <tbody>
     <tr>
       <td>`Enum.Material.Air|Air`</td>
       <td>`[255, 255, 255]`</td>
       <td>`FFFFFF`</td>
       <td><ColorSwatch value="rgb(255,255,255)" /></td>
     </tr>
     <tr>
       <td>`Enum.Material.Asphalt|Asphalt`</td>
       <td>`[115, 123, 107]`</td>
       <td>`737B6B`</td>
       <td><ColorSwatch value="rgb(115,123,107)" /></td>
     </tr>
     <tr>
       <td>`Enum.Material.Basalt|Basalt`</td>
       <td>`[30, 30, 37]`</td>
       <td>`1E1E25`</td>
       <td><ColorSwatch value="rgb(30,30,37)" /></td>
     </tr>
     <tr>
       <td>`Enum.Material.Brick|Brick`</td>
       <td>`[138, 86, 62]`</td>
       <td>`8A563E`</td>
       <td><ColorSwatch value="rgb(138,86,62)" /></td>
     </tr>
     <tr>
       <td>`Enum.Material.Cobblestone|Cobblestone`</td>
       <td>`[132, 123, 90]`</td>
       <td>`847B5A`</td>
       <td><ColorSwatch value="rgb(132,123,90)" /></td>
     </tr>
     <tr>
       <td>`Enum.Material.Concrete|Concrete`</td>
       <td>`[127, 102, 63]`</td>
       <td>`7F663F`</td>
       <td><ColorSwatch value="rgb(127,102,63)" /></td>
     </tr>
     <tr>
       <td>`Enum.Material.CrackedLava|CrackedLava`</td>
       <td>`[232, 156, 74]`</td>
       <td>`E89C4A`</td>
       <td><ColorSwatch value="rgb(232,156,74)" /></td>
     </tr>
     <tr>
       <td>`Enum.Material.Glacier|Glacier`</td>
       <td>`[101, 176, 234]`</td>
       <td>`65B0EA`</td>
       <td><ColorSwatch value="rgb(101,176,234)" /></td>
     </tr>
     <tr>
       <td>`Enum.Material.Grass|Grass`</td>
       <td>`[106, 127, 63]`</td>
       <td>`6A7F3F`</td>
       <td><ColorSwatch value="rgb(106,127,63)" /></td>
     </tr>
     <tr>
       <td>`Enum.Material.Ground|Ground`</td>
       <td>`[102, 92, 59]`</td>
       <td>`665C3B`</td>
       <td><ColorSwatch value="rgb(102,92,59)" /></td>
     </tr>
     <tr>
       <td>`Enum.Material.Ice|Ice`</td>
       <td>`[129, 194, 224]`</td>
       <td>`81C2E0`</td>
       <td><ColorSwatch value="rgb(129,194,224)" /></td>
     </tr>
     <tr>
       <td>`Enum.Material.LeafyGrass|LeafyGrass`</td>
       <td>`[115, 132, 74]`</td>
       <td>`73844A`</td>
       <td><ColorSwatch value="rgb(115,132,74)" /></td>
     </tr>
     <tr>
       <td>`Enum.Material.Limestone|Limestone`</td>
       <td>`[206, 173, 148]`</td>
       <td>`CEAD94`</td>
       <td><ColorSwatch value="rgb(206,173,148)" /></td>
     </tr>
     <tr>
       <td>`Enum.Material.Mud|Mud`</td>
       <td>`[58, 46, 36]`</td>
       <td>`3A2E24`</td>
       <td><ColorSwatch value="rgb(58,46,36)" /></td>
     </tr>
     <tr>
       <td>`Enum.Material.Pavement|Pavement`</td>
       <td>`[148, 148, 140]`</td>
       <td>`94948C`</td>
       <td><ColorSwatch value="rgb(148,148,140)" /></td>
     </tr>
     <tr>
       <td>`Enum.Material.Rock|Rock`</td>
       <td>`[102, 108, 111]`</td>
       <td>`666C6F`</td>
       <td><ColorSwatch value="rgb(102,108,111)" /></td>
     </tr>
     <tr>
       <td>`Enum.Material.Salt|Salt`</td>
       <td>`[198, 189, 181]`</td>
       <td>`C6BDB5`</td>
       <td><ColorSwatch value="rgb(198,189,181)" /></td>
     </tr>
     <tr>
       <td>`Enum.Material.Sand|Sand`</td>
       <td>`[143, 126, 95]`</td>
       <td>`8F7E5F`</td>
       <td><ColorSwatch value="rgb(143,126,95)" /></td>
     </tr>
     <tr>
       <td>`Enum.Material.Sandstone|Sandstone`</td>
       <td>`[137, 90, 71]`</td>
       <td>`895A47`</td>
       <td><ColorSwatch value="rgb(137,90,71)" /></td>
     </tr>
     <tr>
       <td>`Enum.Material.Slate|Slate`</td>
       <td>`[63, 127, 107]`</td>
       <td>`3F7F6B`</td>
       <td><ColorSwatch value="rgb(63,127,107)" /></td>
     </tr>
     <tr>
       <td>`Enum.Material.Snow|Snow`</td>
       <td>`[195, 199, 218]`</td>
       <td>`C3C7DA`</td>
       <td><ColorSwatch value="rgb(195,199,218)" /></td>
     </tr>
     <tr>
       <td>`Enum.Material.WoodPlanks|WoodPlanks`</td>
       <td>`[139, 109, 79]`</td>
       <td>`8B6D4F`</td>
       <td><ColorSwatch value="rgb(139,109,79)" /></td>
     </tr>
     <tr>
       <td>`Enum.Material.Water|Water`</td>
       <td>`[12, 84, 92]`</td>
       <td>`0C545C`</td>
       <td><ColorSwatch value="rgb(12,84,92)" /></td>
     </tr>
   </tbody>
   </table>

   </TabItem>
   </Tabs>

4. In the 3D viewport, move/resize the **selection region** in which to generate terrain. Alternatively, enter values into the **Select** tool fields to set a more specific position and size.

   <Alert severity="info">
   	Minimum and maximum terrain heights depend on the darkest and lightest areas of the heightmap image in relation to the **Y** size (height) of the selection region. For instance, if you choose a height of 128, pure black areas are 64 studs below the center position and pure white areas are 64 studs above the center position.
   </Alert>

5. Click the **Generate** button.

   <video src="../assets/studio/terrain-editor/Import-Tool.mp4" controls width="800" alt="Video of terrain generating automatically via the Import tool"></video>

### Scripting

You can script terrain generation using the `Class.Terrain` class. For example, to create terrain with grass material that fills a volume, you can use methods such as `Class.Terrain:FillBall()|FillBall()`, `Class.Terrain:FillBlock()|FillBlock()`, `Class.Terrain:FillCylinder()|FillCylinder()`, `Class.Terrain:FillRegion()|FillRegion()`, or `Class.Terrain:FillWedge()|FillWedge()`.

```lua title="Fill Block Volume"
local Workspace = game:GetService("Workspace")

Workspace.Terrain:FillBlock(CFrame.new(0, 0, 0), Vector3.new(4, 4, 4), Enum.Material.Grass)
```

## Large-scale editing

The editor's **Edit** tab contains tools for large-scale editing.

### Select regions

The **Select** tool is the universal tool for selecting rectangular regions of terrain.

<img src="../assets/studio/terrain-editor/Edit-Tab-Select.png" width="360" alt="Select tool indicated in Edit tab of Terrain Editor" />

Select a region by clicking and dragging in the 3D viewport, reposition it with the **move** draggers, and edit its size with the **scale** handles. Alternatively, enter values into the tool's **X**/**Y**/**Z** inputs to set a specific position and size.

<figure>
<img src="../assets/studio/terrain-editor/Select-Region-Labeled.jpg" width="800" alt="Move draggers and scale handles on a selected region" />
<figcaption>Move draggers and scale handles on a selected region</figcaption>
</figure>

Studio also supports the following keyboard and mouse shortcuts, assuming the Select tool is active and nothing is selected in the **Explorer** window.

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
      <td>Paste terrain that has been copied to the clipboard and swap to the Transform tool so that the new terrain can be transformed.</td>
    </tr>
		<tr>
      <td><kbd>Ctrl</kbd><kbd>X</kbd></td>
			<td><kbd>⌘</kbd><kbd>X</kbd></td>
      <td>Cut terrain within the selected region to the clipboard.</td>
    </tr>
		<tr>
      <td><kbd>Ctrl</kbd><kbd>D</kbd></td>
			<td><kbd>⌘</kbd><kbd>D</kbd></td>
      <td>Duplicate terrain within the selected region and swap to the Transform tool so that the new terrain can be transformed.</td>
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

### Transform regions

The **Transform** tool lets you manipulate entire selected regions to a new position, size, or orientation.

To transform a region:

1. Select a region and then activate the **Transform** tool. Note that the tool will be automatically activated if you paste or duplicate terrain.

   <img src="../assets/studio/terrain-editor/Edit-Tab-Transform.png" width="360" alt="Transform tool indicated in Edit tab of Terrain Editor" />

1. In the 3D viewport, transform the region with the **move** draggers, **rotate** rings, and **scale** handles. Alternatively, enter values into the tool's **X**/**Y**/**Z** inputs to set a specific position, size, and rotation.

   <img src="../assets/studio/terrain-editor/Transform-Region-Labeled.jpg" width="780" alt="Move draggers, scale handles, and rotate rings on the Y axis of a selected region" />

   <Alert severity="info">
   Holding <kbd>Shift</kbd> while dragging any **scale** handle scales the region proportionally across all other axes, and holding <kbd>Ctrl</kbd> or <kbd>⌘</kbd> while dragging scales the region equally in both the positive and negative direction along that axis.

    Holding <kbd>Shift</kbd> while dragging any **rotate** ring toggles between rotation snapping or free‑form rotation.
   </Alert>

   <Alert severity="success">
   By default, this tool uses **Live Edit** mode to constantly update terrain as you transform it. To view only a wireframe preview of the terrain as you transform it, disable live edit mode and then, while transforming, press <kbd>Enter</kbd>/<kbd>Return</kbd> or click the **Apply** button to apply the changes.
   </Alert>

### Fill and replace regions

The **Fill** tool lets you fill an entire selected region with a specific material, or replace all material within the region with another material.

1. Select a region, then activate the **Fill** tool.

   <img src="../assets/studio/terrain-editor/Edit-Tab-Fill.png" width="360" alt="Fill tool indicated in Edit tab of Terrain Editor" />

1. In the tool's **Material Settings** section:
   - To fill the region with a specific material, select **Fill** and choose the desired material.
   - To replace all terrain of one material with another material, select **Replace**, then choose a **source** material and **target** material.
1. Click the **Apply** button or press <kbd>Enter</kbd>/<kbd>Return</kbd>.

   <figure>
   <img src="../assets/studio/terrain-editor/Fill-Region.jpg" width="780" alt="Region filled with Salt material" />
    <figcaption>Selected region filled with Salt material</figcaption>
   </figure>

### Set sea level

The **Sea Level** tool lets you create a consistent water level or remove all water within a region.

1. Activate the **Sea Level** tool.

   <img src="../assets/studio/terrain-editor/Edit-Tab-Sea-Level.png" width="360" alt="Sea Level tool indicated in Edit tab of Terrain Editor" />

1. Select the intended region by clicking and dragging the **move** draggers and **scale** handles in the 3D viewport. Alternatively, enter values into the tool's **X**/**Y**/**Z** inputs to set a specific position and size.

1. Click the **Evaporate** button to remove water inside the selected region, or click the **Create** button to fill the selected region with water.

   <video src="../assets/studio/terrain-editor/Sea-Level-Tool.mp4" controls width="800" alt="Video of sea level being created and modified using the Sea Level tool"></video>

## Detailed editing

The **Edit** tab also contains tools for precision editing using a "brush" tool to draw, sculpt, smooth, flatten, or paint terrain.

<img src="../assets/studio/terrain-editor/Edit-Tab-Detail-Tools.png" width="360" alt="Detailed editing tools indicated in Edit tab of Terrain Editor" />

Each tool lets you choose from a **sphere**, **box**, or **cylinder** brush shape and a base size between 1–64 studs.

<img src="../assets/studio/terrain-editor/Brush-Shape-Size.png" width="360" alt="Brush shape and size controls in the Terrain Editor" />

For tools which use the brush, Studio supports the following keyboard and mouse shortcuts.

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
      <td>When held down while using the [Draw](../studio/terrain-editor.md#draw) and [Sculpt](../studio/terrain-editor.md#sculpt) tools, toggles on the alternate brush mode. For example, toggles on "subtract" mode instead of the default "add" mode.</td>
    </tr>
		<tr>
      <td><kbd>Shift</kbd></td>
			<td><kbd>Shift</kbd></td>
      <td>When held down while using the [Draw](../studio/terrain-editor.md#draw) and [Sculpt](../studio/terrain-editor.md#sculpt) tools, temporarily activates the [Smooth](../studio/terrain-editor.md#smooth) tool.</td>
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
      <td>When held down while dragging the mouse or using the scroll wheel, adjusts the brush's **strength**. Only applies when using the [Sculpt](../studio/terrain-editor.md#sculpt), [Smooth](../studio/terrain-editor.md#smooth), or [Flatten](../studio/terrain-editor.md#flatten) tool.</td>
    </tr>
		<tr>
      <td><kbd>Alt</kbd></td>
			<td><kbd>⌥</kbd></td>
      <td>When held down on mouse click, shows the material picker.</td>
    </tr>
	</tbody>
</table>

### Draw

The **Draw** tool **adds** or **subtracts** terrain using the brush. This tool functions in a dual mode where holding down <kbd>Ctrl</kbd> or <kbd>⌘</kbd> toggles on "subtract" mode instead of the default "add" mode. Additionally, holding down <kbd>Shift</kbd> temporarily activates the [Smooth](../studio/terrain-editor.md#smooth) tool.

<video src="../assets/studio/terrain-editor/Draw-Tool.mp4" controls width="800" alt="Video of terrain being added and subtracted using the Draw tool"></video>

### Sculpt

The **Sculpt** tool **adds** or **subtracts** terrain using the brush. Unlike the Draw tool, this tool includes a **strength** slider to allow for more gentle manipulation of terrain.

Similar to the Draw tool, the Sculpt tool functions in a dual mode where holding down <kbd>Ctrl</kbd> or <kbd>⌘</kbd> toggles on "subtract" mode instead of the default "add" mode. Additionally, holding down <kbd>Shift</kbd> temporarily activates the Smooth tool.

<video src="../assets/studio/terrain-editor/Sculpt-Tool.mp4" controls width="800" alt="Video of terrain being added and subtracted using the Sculpt tool"></video>

### Smooth

The **Smooth** tool smoothes out abrupt edges in terrain using the brush. This tool can be used in standalone mode, or you can toggle it on by holding <kbd>Shift</kbd> while using the Draw or Sculpt tools.

<video src="../assets/studio/terrain-editor/Smooth-Tool.mp4" controls width="800" alt="Video of terrain being smoothed using the Smooth tool"></video>

### Flatten

The **Flatten** tool flattens terrain to a consistent level across a visualized plane. By default, the tool lowers terrain above the plane **and** raises terrain below to the plane, but you can opt to selectively lower **or** raise through the tool's **Flatten&nbsp;Mode** option.

<video src="../assets/studio/terrain-editor/Flatten-Tool.mp4" controls width="800" alt="Video of terrain being flattened to a plane using the Flatten tool"></video>

### Paint

The **Paint** tool, using the brush, **paints** a terrain material over an existing material or **replaces** one material with another material.

<video src="../assets/studio/terrain-editor/Paint-Tool.mp4" controls width="800" alt="Video of terrain being painted and replaced using the Paint tool"></video>
