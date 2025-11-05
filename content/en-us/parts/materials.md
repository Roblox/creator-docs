---
title: Materials
description: Materials determine objects' visual appearance and physical properties.
---

import BetaAlert from '../includes/beta-features/beta-alert.md'

Roblox's materials are unlike materials on other platforms, in that their visual appearance **and** their [physical properties](#physical-properties) reflect those of materials in the real world. For example, concrete is heavier than plastic and sinks faster in water. When you set the material of a part or terrain, Roblox simulates its physical material properties to make this behavior just work.

The Roblox Engine offers a range of [base materials](#base-materials) suitable to build many experiences, including various categories of metal, rock, and organic materials.

You can also create your own [custom materials](#custom-materials) and apply them to parts or [terrain](../parts/terrain.md). Custom materials have an additional [adaptive materials](#adaptive-materials) behavior that lets you adapt any model to use your art style and custom materials, even if someone else created the model.

## Apply materials

You can quickly apply materials to [parts](../parts/index.md) through the [Material](#material-widget) widget. The [Material Manager](#material-manager) offers the same functionality and an additional "paint&nbsp;tool" application mode.

### Material widget

The **Material** widget is accessible from the **Home** or **Model** tab toolbars. Click‑holding over the small corner arrow on the button reveals a material picker. See [Parts](../parts/index.md#material) for more information.

<img src="../assets/studio/general/Toolbar-Material-Picker.png" width="800" alt="Material widget's picker highlighted." />

### Material Manager

The **Material Manager** is accessible through **Window**&nbsp;⟩ **3D**&nbsp;⟩ **Material** or from the **Material** widget's picker popup. From the manager window, you can apply materials to [parts](../parts/index.md) through the following workflows.

<Tabs>
<TabItem label="Apply to Selected">
The default `Enum.Material` property for new `Class.Part` instances is **Plastic**. To apply a different material to parts:

1. In the 3D viewport or [Explorer](../studio/explorer.md), select one or more parts.
2. In the **Material Manager** palette, hover your mouse over the desired material (you don't need to select it) and click the **Apply to Selected Parts** button.

   <img src="../assets/studio/material-manager/Apply-To-Selected-Parts.png" width="700" alt="Apply to Selected Parts button indicated in Material Manager" />

</TabItem>
<TabItem label="Paint Tool">
You can also use a material as a painting tool that applies to parts:

1. In the **Material Manager**, select the material you want to apply.
1. In the top-left corner, click the **Paint Parts With Selected Material** button to enable the material as a painting tool.

   <img src="../assets/studio/material-manager/Paint-Parts-With-Selected-Material.png" width="700" alt="Paint Parts With Selected Material button indicated in Material Manager" />

1. In the 3D viewport, hover over and click the parts that you want to apply the material to.
1. When you're done painting, click the button again to disable the tool.

</TabItem>
</Tabs>

## Custom materials

The [Material Manager](#material-manager) provides a user interface to interact with various aspects of `Class.MaterialService`, including creating new custom materials and applying them to parts and [terrain](../parts/terrain.md). Custom materials are represented by `Class.MaterialVariant` instances within `Class.MaterialService`.

<img src="../assets/modeling/materials/Explorer-MaterialVariant-Instances.png" width="320" alt="Explorer window showing two MaterialVariant instances within MaterialService" />

You can apply custom materials per-part or globally to both parts and terrain, and you can fine-tune how custom materials apply to faces of terrain with `Class.TerrainDetail` instances.

<Alert severity="info">
`Class.MaterialVariant` and `Class.SurfaceAppearance` instances both use [PBR](../art/modeling/surface-appearance.md) textures to customize the appearance of objects. The difference is that `Class.MaterialVariant` is for customizing the appearance of reusable tileable material, whereas `Class.SurfaceAppearance` is for customizing the visual appearance of a specific mesh with UV mapping. `Class.MaterialVariant` instances also have [physical properties](#physical-properties) that `Class.SurfaceAppearance` instances don't.
</Alert>

### Create custom materials

You can edit all properties of a custom material in the [Material Manager](#material-manager) or through the properties of a `Class.MaterialVariant` instance. You can also generate custom materials through the prompt‑based [Material Generator](../studio/material-generator.md).

To create a custom material in the [Material Manager](#material-manager):

1. Click the **base material** from which your custom material will inherit [physical properties](#physical-properties). If you skip this step, the base material will be **Plastic**, but you can change it later.

   <img src="../assets/studio/material-manager/Base-Material-Selected.png" width="700" alt="A Base material of Asphalt that's selected in the Material Manager." />

2. In the top-left corner, click **Create Material Variant**.

   <img src="../assets/studio/material-manager/Create-Material-Variant.png" width="700" alt="Create Material Variant button indicated in Material Manager." />

   A new variant appears in the palette with an icon in the bottom-right corner, indicating it's a custom material.

   <img src="../assets/studio/material-manager/Custom-Material-Icon.png" width="700" alt="New MaterialVariant tile in Material Manager with icon to indicate a custom material." />

3. In the inspector, rename your custom material to describe its purpose. You can change the name later, but if you do so **after** applying the material to parts, you'll need to re-apply it to those parts.
4. For each **texture map** option such as **Color** or **Normal**, paste an asset&nbsp;ID or import a new texture from your computer. Square textures work best. If you don't specify an asset for a texture map, that texture remains blank.
5. If desired, adjust the **Studs Per Tile** and **Pattern** values to change how the material looks.

<Alert severity="info">
If necessary, you can delete a custom material from the [Material Manager](#material-manager) by selecting it and clicking the **Delete** button below its preview globe. Alternatively, you can delete its associated `Class.MaterialVariant` instance within **MaterialService** of the [Explorer](../studio/explorer.md).
</Alert>

### Apply custom materials

For [parts](../parts/index.md), you can use a custom material just like any other material, applying it to selected parts through the [Material](#apply-materials) widget or the [Material Manager](#material-manager).&sup1;

You can also apply the new material to a part by setting its **MaterialVariant** property in the [Properties](../studio/properties.md) window. In this case, Studio automatically sets its **Material** property to the base material you chose when creating the material.

<img src="../assets/modeling/materials/Properties-Material-And-MaterialVariant.png" width="320" alt="Material and MaterialVariant properties set in the Properties window." />

<Alert severity="warning">
Note that if you rename a custom material **after** applying it to parts, those parts will not automatically use the custom material with the new name. This behavior allows for [Adaptive Materials](#adaptive-materials). If you want parts to continue using a custom material after you rename it, you'll need to re-apply the custom material.
</Alert>

<figcaption>&sup1; Unlike on parts, you cannot **directly** apply custom materials to [terrain](../parts/terrain.md), although you can set a custom material as a [material override](#material-overrides) to an existing base material for all terrain using that material.</figcaption>

### Material overrides

You can set a custom material as a **material override** to make its base material serve as a reference to the custom material. When you do so, Studio will use the custom material for both the textures and [physical properties](#physical-properties) of any part or [terrain](../parts/terrain.md) that uses the custom material.

<Alert severity="info">
Material overrides are the only way to apply custom materials to terrain. Note also that the materials for terrain are global per place, so you can't apply multiple variants of the same base material to the terrain in a single place.
</Alert>

#### Set overrides

To set a custom material as a material override in the [Material Manager](#material-manager):

1. Click the custom material that you want to set as an override.
1. In the inspector, scroll down to **Overrides** and enable **Set as Override**.

   <img src="../assets/studio/material-manager/Set-Override-Enabled.png" width="320" alt="." />

   The new override appears as a property of **MaterialService** in the [Properties](../studio/properties.md) window.

   <img src="../assets/modeling/materials/Properties-View-Override.png" alt="" width="320" />

#### Terrain details

By default, applying a custom material to parts or as an override applies that custom material as tiles across each face. For terrain, you can optionally configure `Class.TerrainDetail` instances to customize the **top**, **side**, and **bottom** of terrain voxels using that custom material.

To customize the faces of terrain using a custom material:

1. In the palette of the [Material Manager](#material-manager), click the custom material.
1. In the inspector, confirm that its **Set as Override** toggle is enabled.

   <img src="../assets/studio/material-manager/Set-Override-Enabled.png" alt="" width="320" />

1. In the **Terrain Details** section, click **Create** for each face you want to customize.

   <img src="../assets/studio/material-manager/Terrain-Details-Create-Buttons.png" width="320" alt="" />

1. For each face you enable, expand the arrow to access and edit details such as its name, texture maps, studs per tile, and pattern.

   <img src="../assets/studio/material-manager/Terrain-Details-Edit.png" width="320" alt="" />

#### Disable overrides

You can disable an entire material override and all base materials that it's currently overriding, or you can disable the override for a specific base material.

<Tabs>
<TabItem label="Disable Entire Override">
1. In the palette of the [Material Manager](#material-manager), click a **custom material** that's being used as an override.
1. In the inspector, scroll down to **Overrides** and disable **Set as Override**.

   <img src="../assets/studio/material-manager/Set-Override-Disabled.png" width="320" alt="" />
</TabItem>
<TabItem label="Disable Override for Specific Material">
1. In the palette of the [Material Manager](#material-manager), click a **base material** which is being overridden by a custom material.
2. In the inspector, scroll down to **Material Override** and select **None** from the menu.

   <img src="../assets/studio/material-manager/Disable-Material-Override-Specific.png" width="320" alt="" />
</TabItem>
</Tabs>

## Physical properties

All materials have built-in **physical properties** such as density, elasticity, and friction. Through the application of [custom materials](#custom-materials) with unique physical properties, you can affect global material behavior for all parts and [terrain](../parts/terrain.md) which use the custom material, such as creating an extremely slippery variant of the **Ice** material.

When factoring physical properties, the engine prioritizes more granular per-part settings over material behaviors to determine the effective physical properties of a surface:

<Grid container spacing={2} alignItems="center">
	<Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../assets/misc/Arrow-Highest.png" width="50" style={{float:"right"}} /></Grid>
	<Grid item XSmall={10} Medium={11} Large={11} XLarge={11}>
	Custom physical properties of the specific part.
	</Grid>
</Grid>
<Grid container spacing={2} alignItems="center">
	<Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../assets/misc/Arrow-Higher.png" width="50" style={{float:"right"}} /></Grid>
	<Grid item XSmall={10} Medium={11} Large={11} XLarge={11}>
	Custom physical properties of the part's custom material.
	</Grid>
</Grid>
<Grid container spacing={2} alignItems="center">
	<Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../assets/misc/Arrow-High.png" width="50" style={{float:"right"}} /></Grid>
	<Grid item XSmall={10} Medium={11} Large={11} XLarge={11}>
	Custom physical properties of the [material override](#set-overrides) of the part's material.
	</Grid>
</Grid>
<Grid container spacing={2} alignItems="center">
	<Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../assets/misc/Arrow-Neutral.png" width="50" style={{float:"right"}} /></Grid>
	<Grid item XSmall={10} Medium={11} Large={11} XLarge={11}>
	The [default physical properties](#default-physical-properties) of the part's material.
	</Grid>
</Grid>

<Tabs>
<TabItem label="Applying to Custom Materials">
To set unique physical properties for any [custom material](#custom-materials) and automatically apply them to all parts and [terrain](../parts/terrain.md) which use the material:

1. In the palette of the [Material Manager](#material-manager), click the custom material.
2. In the inspector, scroll down to the **Physics** section and set custom physical properties as detailed in the `Datatype.PhysicalProperties` reference.

   <img src="../assets/studio/material-manager/Physical-Properties.png" width="320" alt="Custom physical properties in Material Manager inspector pane" />

   For any part that uses the custom material and does **not** have [part-specific](#physical-properties) overrides, the **CurrentPhysicalProperties** branch in the [Properties](../studio/properties.md) window reveals that its default physical properties are overridden by the custom material's properties.

   <img src="../assets/modeling/materials/Properties-Physical-Overridden.png" width="320" alt="Properties window showing physical properties overridden by those of custom material" />

</TabItem>
<TabItem label="Per-Part Overrides">
If you need to override a part's custom material properties and set physical properties for that specific part, you can use its **CustomPhysicalProperties** toggle.

1. With the part selected, enable **CustomPhysicalProperties** in the [Properties](../studio/properties.md) window.

   <img src="../assets/modeling/materials/Properties-Part-CustomPhysicalProperties.png" width="320" alt="CustomPhysicalProperties enabled in a part's properties" />

2. Set custom physical properties as detailed in the `Datatype.PhysicalProperties` reference.

</TabItem>
</Tabs>

## Adaptive materials

When you apply a custom material to a part, the part's `Class.Part.MaterialVariant` property becomes the name of its `Class.MaterialVariant` rather than its specific instance. This means that when you reuse the part in the same or a different place, as in a model or package, it's easier for you to adapt different custom materials to adjust the part's look. The adaptive behavior of custom materials has the following effects:

- If you create collections of custom materials with the same name but different textures, then you can quickly change the style of a place by changing which collection is a child of `Class.MaterialService`.
- If you insert a model with parts that use a custom material, then you can modify its look by creating an instance of `Class.MaterialVariant` in `Class.MaterialService` and renaming it to the same name as the previous custom material, rather than applying the new material to the parts in the model.

When you reuse custom materials in models and packages, each `MaterialVariant` instance must be in `Class.MaterialService` for it to work.

- If you distribute a model to the Creator Store with a custom material, include the `Class.MaterialVariant` instance in the model. For more information about distributing models to the Creator Store, see [Distributing Assets](../production/creator-store.md).
- If you insert a model from the Creator Store, look for any `Class.MaterialVariant` instances and copy them to `Class.MaterialService`. For more information about importing models from the Creator Store, see [Creator Store](../production/creator-store.md).
- If you want to use custom materials with packages, put the package in `Class.MaterialService`. For more information on packages, see [Packages](../projects/assets/packages.md).

The [Creator Store](../production/creator-store.md) has a category called Materials for "material packs", models that contain only `Class.MaterialVariant`, `Class.TerrainDetail`, `Class.Folder`, and `Class.Model` instances. The Materials category is a way to promote and discover custom materials by other creators.

<Alert severity="success">
To make the most of adaptive materials, use a consistent naming convention for your `Class.MaterialVariant` instances. For example, you can use `PascalCase` with the base material of the custom material as the first word, as in `GrassWet`, `GrassDry`, and `GrassBurned`.
</Alert>

## Asset and property reference

### Base materials

Shaders generate the look and feel of materials. The base material shaders work differently than the shader which `Class.MaterialVariant` instances use, so you can't create custom materials that look exactly like base materials, but you can still create custom materials that use their textures. The following tables list the asset&nbsp;IDs for material details such as `Class.SurfaceAppearance.ColorMap|ColorMap` and `Class.SurfaceAppearance.RoughnessMap|RoughnessMap`.

<Tabs>
<TabItem label="Current Base">

<table size="small">
<thead>
    <tr>
        <th>Material</th>
        <th>ColorMap</th>
        <th>Normal</th>
        <th>Metalness</th>
        <th>Roughness</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>`Enum.Material.Asphalt|Asphalt`</td>
        <td>`9930003046`</td>
        <td>`9429449876`</td>
        <td></td>
        <td>`9429450346`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Basalt|Basalt`</td>
        <td>`9920482056`</td>
        <td>`9438412214`</td>
        <td></td>
        <td>`9438412457`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Brick|Brick`</td>
        <td>`9920482813`</td>
        <td>`9438453152`</td>
        <td></td>
        <td>`9438453413`</td>
    </tr>
		<tr>
        <td>`Enum.Material.Cardboard|Cardboard`</td>
        <td>`14108651729`</td>
        <td>`14108654002`</td>
        <td></td>
        <td>`14108654299`</td>
    </tr>
		<tr>
        <td>`Enum.Material.Carpet|Carpet`</td>
        <td>`14108662587`</td>
        <td>`14108663154`</td>
        <td></td>
        <td>`14108663726`</td>
    </tr>
		<tr>
        <td>`Enum.Material.CeramicTiles|CeramicTiles`</td>
        <td>`17429425079`</td>
        <td>`17429425915`</td>
        <td>`17429426100`</td>
        <td>`17429426861`</td>
    </tr>
		<tr>
        <td>`Enum.Material.ClayRoofTiles|ClayRoofTiles`</td>
        <td>`18147681935`</td>
        <td>`18147683410`</td>
        <td></td>
        <td>`18147684855`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Cobblestone|Cobblestone`</td>
        <td>`9919718991`</td>
        <td>`9438457162`</td>
        <td></td>
        <td>`9438457470`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Concrete|Concrete`</td>
        <td>`9920484153`</td>
        <td>`9466554006`</td>
        <td></td>
        <td>`9466554186`</td>
    </tr>
    <tr>
        <td>`Enum.Material.CorrodedMetal|CorrodedMetal`</td>
        <td>`9920589327`</td>
        <td>`9439548484`</td>
        <td>`9439548749`</td>
        <td>`9439556441`</td>
    </tr>
    <tr>
        <td>`Enum.Material.CrackedLava|CrackedLava`</td>
        <td>`9920484943`</td>
        <td>`9438508790`</td>
        <td></td>
        <td>`9438509046`</td>
    </tr>
    <tr>
        <td>`Enum.Material.DiamondPlate|DiamondPlate`</td>
        <td>`10237720195`</td>
        <td>`9438583222`</td>
        <td>`9438583347`</td>
        <td>`9438583558`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Fabric|Fabric`</td>
        <td>`9920517696`</td>
        <td>`9873280412`</td>
        <td></td>
        <td>`9873282563`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Foil|Foil`</td>
        <td>`9466552117`</td>
        <td>`9424786192`</td>
        <td>`9424786272`</td>
        <td>`9424786620`</td>
    </tr>
		<tr>
        <td>`Enum.Material.ForceField|ForceField`&sup2;</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>`Enum.Material.Glacier|Glacier`</td>
        <td>`9920518732`</td>
        <td>`9438812958`</td>
        <td></td>
        <td>`9438851286`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Glass|Glass`&sup3;</td>
        <td>`9438868521`</td>
        <td>`7547304785`</td>
        <td></td>
        <td>`7547304892`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Granite|Granite`</td>
        <td>`9920550238`</td>
        <td>`9438882935`</td>
        <td></td>
        <td>`9438883109`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Grass|Grass`</td>
        <td>`9920551868`</td>
        <td>`9438955773`</td>
        <td></td>
        <td>`9438955997`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Ground|Ground`</td>
        <td>`9920554482`</td>
        <td>`9439043558`</td>
        <td></td>
        <td>`9439043765`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Ice|Ice`</td>
        <td>`9920555943`</td>
        <td>`9467301039`</td>
        <td></td>
        <td>`9467301203`</td>
    </tr>
    <tr>
        <td>`Enum.Material.LeafyGrass|LeafyGrass`</td>
        <td>`9920557906`</td>
        <td>`9439080781`</td>
        <td></td>
        <td>`9439080950`</td>
    </tr>
		<tr>
        <td>`Enum.Material.Leather|Leather`</td>
        <td>`14108670073`</td>
        <td>`14108670486`</td>
        <td></td>
        <td>`14108670748`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Limestone|Limestone`</td>
        <td>`9920561437`</td>
        <td>`9439415191`</td>
        <td></td>
        <td>`9439415495`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Marble|Marble`</td>
        <td>`9439430596`</td>
        <td>`9439431240`</td>
        <td></td>
        <td>`9439431383`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Metal|Metal`</td>
        <td>`9920574687`</td>
        <td>`9873295432`</td>
        <td>`9873318201`</td>
        <td>`9873318890`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Mud|Mud`</td>
        <td>`9920578473`</td>
        <td>`9439509827`</td>
        <td></td>
        <td>`9439510012`</td>
    </tr>
		<tr>
        <td>`Enum.Material.Neon|Neon`&sup2;</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>`Enum.Material.Pavement|Pavement`</td>
        <td>`9920579943`</td>
        <td>`9439519281`</td>
        <td></td>
        <td>`9439519532`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Pebble|Pebble`</td>
        <td>`9920581082`</td>
        <td>`9439528644`</td>
        <td></td>
        <td>`9439537267`</td>
    </tr>
		<tr>
        <td>`Enum.Material.Plaster|Plaster`</td>
        <td>`14108671255`</td>
        <td>`14108671870`</td>
        <td></td>
        <td>`14108672378`</td>
    </tr>
		<tr>
        <td>`Enum.Material.Plastic|Plastic`&sup2;</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>`Enum.Material.Rock|Rock`</td>
        <td>`9920587470`</td>
        <td>`9439538417`</td>
        <td></td>
        <td>`9439545859`</td>
    </tr>
		<tr>
        <td>`Enum.Material.RoofShingles|RoofShingles`</td>
        <td>`119722544879522`</td>
        <td>`77534750680073`</td>
        <td></td>
        <td>`129397260312247`</td>
    </tr>
		<tr>
        <td>`Enum.Material.Rubber|Rubber`</td>
        <td>`14108673018`</td>
        <td>`14108674698`</td>
        <td>`14108674894`</td>
        <td>`14108675142`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Salt|Salt`</td>
        <td>`9920590225`</td>
        <td>`9439565809`</td>
        <td></td>
        <td>9439566688</td>
    </tr>
    <tr>
        <td>`Enum.Material.Sand|Sand`</td>
        <td>`9920591683`</td>
        <td>`9439577084`</td>
        <td></td>
        <td>`9439577327`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Sandstone|Sandstone`</td>
        <td>`9920596120`</td>
        <td>`9439596530`</td>
        <td></td>
        <td>`9439596711`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Slate|Slate`</td>
        <td>`9920599782`</td>
        <td>`9439612514`</td>
        <td></td>
        <td>`9439612733`</td>
    </tr>
		<tr>
        <td>`Enum.Material.SmoothPlastic|SmoothPlastic`&sup2;</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>`Enum.Material.Snow|Snow`</td>
        <td>`9920620284`</td>
        <td>`9439632006`</td>
        <td></td>
        <td>`9439632145`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Wood|Wood`</td>
        <td>`9920625290`</td>
        <td>`9439641376`</td>
        <td></td>
        <td>`9439648605`</td>
    </tr>
    <tr>
        <td>`Enum.Material.WoodPlanks|WoodPlanks`</td>
        <td>`9920626778`</td>
        <td>`9439650689`</td>
        <td></td>
        <td>`9439658127`</td>
    </tr>
</tbody>
</table>
<figcaption>&sup2; Material is unique and/or its texture assets are bundled with Studio instead of being accessible as a typical asset ID.</figcaption><br />
<figcaption>&sup3; Refraction of light through the glass material is not supported on mobile devices due to computational limitations.</figcaption><br />

</TabItem>
<TabItem label="Pre-2022 Base">
<table size="small">
<thead>
    <tr>
        <th>Material</th>
        <th>Color</th>
        <th>Normal</th>
        <th>Metalness</th>
        <th>Roughness</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>`Enum.Material.Brick|Brick`</td>
        <td>`7546648254`</td>
        <td>`7546649654`</td>
        <td></td>
        <td>`7546650017`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Cobblestone|Cobblestone`</td>
        <td>`7546651802`</td>
        <td>`7546652689`</td>
        <td></td>
        <td>`7546652892`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Concrete|Concrete`</td>
        <td>`7546653328`</td>
        <td>`7546653707`</td>
        <td></td>
        <td>`7546653868`</td>
    </tr>
    <tr>
        <td>`Enum.Material.CorrodedMetal|CorrodedMetal`</td>
        <td>`7547183598`</td>
        <td>`7547181182`</td>
        <td>`7547184321`</td>
        <td>`7547184588`</td>
    </tr>
    <tr>
        <td>`Enum.Material.DiamondPlate|DiamondPlate`</td>
        <td>`7546654401`</td>
        <td>`7546654536`</td>
        <td>`7547162002`</td>
        <td>`7547162137`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Fabric|Fabric`</td>
        <td>`7547100606`</td>
        <td>`7547100915`</td>
        <td></td>
        <td>`7547101072`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Foil|Foil`</td>
        <td>`7546644642`</td>
        <td>`7546644903`</td>
        <td>`7546644642`</td>
        <td>`7546644963`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Glass|Glass`</td>
        <td>`7547304577`</td>
        <td>`7547304785`</td>
        <td></td>
        <td>`7547304892`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Granite|Granite`</td>
        <td>`7547164400`</td>
        <td>`7546654648`</td>
        <td></td>
        <td>`7547164660`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Grass|Grass`</td>
        <td>`7547167347`</td>
        <td>`7547168653`</td>
        <td></td>
        <td>`7547169207`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Ice|Ice`</td>
        <td>`7546644642`</td>
        <td>`7547171198`</td>
        <td></td>
        <td>`7547171276`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Marble|Marble`</td>
        <td>`7547174345`</td>
        <td>`7547176060`</td>
        <td></td>
        <td>`7547177213`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Metal|Metal`</td>
        <td>`7547178395`</td>
        <td>`7547287997`</td>
        <td>`7547288112`</td>
        <td>`7547179082`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Pebble|Pebble`</td>
        <td>`7547291174`</td>
        <td>`7546645052`</td>
        <td></td>
        <td>`7547291306`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Sand|Sand`</td>
        <td>`7547294684`</td>
        <td>`7547294810`</td>
        <td></td>
        <td>`7547295087`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Slate|Slate`</td>
        <td>`7547297050`</td>
        <td>`7547297808`</td>
        <td></td>
        <td>`7547298051`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Wood|Wood`</td>
        <td>`7547190453`</td>
        <td>`7547190548`</td>
        <td>`7547190619`</td>
        <td>`7547303147`</td>
    </tr>
    <tr>
        <td>`Enum.Material.WoodPlanks|WoodPlanks`</td>
        <td>`7547301709`</td>
        <td>`7547188159`</td>
        <td>`7547188891`</td>
        <td>`7547332869`</td>
    </tr>
</tbody>
</table>
</TabItem>
<TabItem label="Current Terrain">
<table size="small">
<thead>
    <tr>
        <th>Material</th>
        <th>Terrain Face</th>
        <th>Color</th>
        <th>Normal</th>
        <th>Roughness</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td rowspan="2">`Enum.Material.Asphalt|Asphalt`</td>
        <td>Top</td>
        <td>`9930003046`</td>
        <td>`9429449876`</td>
        <td>`9429450346`</td>
    </tr>
    <tr>
        <td>Side</td>
        <td>`9930005689`</td>
        <td>`9429465046`</td>
        <td>`9429466226`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Basalt|Basalt`</td>
        <td>(all)</td>
        <td>`9920482056`</td>
        <td>`9438412214`</td>
        <td>`9438412457`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Brick|Brick`</td>
        <td>(all)</td>
        <td>`9920482813`</td>
        <td>`9438453152`</td>
        <td>`9438453413`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Cobblestone|Cobblestone`</td>
        <td>(all)</td>
        <td>`9919718991`</td>
        <td>`9438457162`</td>
        <td>`9438457470`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Concrete|Concrete`</td>
        <td>(all)</td>
        <td>`9920484153`</td>
        <td>`9466554006`</td>
        <td>`9466554186`</td>
    </tr>
    <tr>
        <td>`Enum.Material.CrackedLava|CrackedLava`</td>
        <td>(all)</td>
        <td>`9920484943`</td>
        <td>`9438508790`</td>
        <td>`9438509046`</td>
    </tr>
    <tr>
        <td rowspan="3">`Enum.Material.Glacier|Glacier`</td>
        <td>Top</td>
        <td>`9920518732`</td>
        <td>`9438812958`</td>
        <td>`9438851286`</td>
    </tr>
    <tr>
        <td>Side</td>
        <td>`9920520269`</td>
        <td>`9438853412`</td>
        <td>`9438853585`</td>
    </tr>
    <tr>
        <td>Bottom</td>
        <td>`9920521000`</td>
        <td>`9438867267`</td>
        <td>`9438867465`</td>
    </tr>
    <tr>
        <td rowspan="3">`Enum.Material.Grass|Grass`</td>
        <td>Top</td>
        <td>`9920551868`</td>
        <td>`9438955773`</td>
        <td>`9438955997`</td>
    </tr>
    <tr>
        <td>Side</td>
        <td>`9932815307`</td>
        <td>`9438958337`</td>
        <td>`9439010060`</td>
    </tr>
    <tr>
        <td>Bottom</td>
        <td>`9932815307`</td>
        <td>`9439011893`</td>
        <td>`9439012136`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Ground|Ground`</td>
        <td>(all)</td>
        <td>`9920554482`</td>
        <td>`9439043558`</td>
        <td>`9439043765`</td>
    </tr>
    <tr>
        <td rowspan="2">`Enum.Material.Ice|Ice`</td>
        <td>Top</td>
        <td>`9920555943`</td>
        <td>`9467301039`</td>
        <td>`9467301203`</td>
    </tr>
    <tr>
        <td>Side</td>
        <td>`9920556722`</td>
        <td>`9439071195`</td>
        <td>`9439071371`</td>
    </tr>
    <tr>
        <td rowspan="3">`Enum.Material.LeafyGrass|LeafyGrass`</td>
        <td>Top</td>
        <td>`9920557906`</td>
        <td>`9439080781`</td>
        <td>`9439080950`</td>
    </tr>
    <tr>
        <td>Side</td>
        <td>`9932815307`</td>
        <td>`9439151713`</td>
        <td>`9439151929`</td>
    </tr>
    <tr>
        <td>Bottom</td>
        <td>`9932815307`</td>
        <td>`9439151713`</td>
        <td>`9439151929`</td>
    </tr>
    <tr>
        <td rowspan="2">`Enum.Material.Limestone|Limestone`</td>
        <td>Top</td>
        <td>`9920561437`</td>
        <td>`9439415191`</td>
        <td>`9439415495`</td>
    </tr>
    <tr>
        <td>Side</td>
        <td>`9920562675`</td>
        <td>`9439417923`</td>
        <td>`9439418334`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Mud|Mud`</td>
        <td>(all)</td>
        <td>`9920578473`</td>
        <td>`9439509827`</td>
        <td>`9439510012`</td>
    </tr>
    <tr>
        <td rowspan="2">`Enum.Material.Pavement|Pavement`</td>
        <td>Top</td>
        <td>`9920579943`</td>
        <td>`9439519281`</td>
        <td>`9439519532`</td>
    </tr>
    <tr>
        <td>Side</td>
        <td>`9920580293`</td>
        <td>`9439527387`</td>
        <td>`9439527572`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Rock|Rock`</td>
        <td>(all)</td>
        <td>`9920587470`</td>
        <td>`9439538417`</td>
        <td>`9439545859`</td>
    </tr>
    <tr>
        <td rowspan="2">`Enum.Material.Salt|Salt`</td>
        <td>Top</td>
        <td>`9920590225`</td>
        <td>`9439565809`</td>
        <td>`9439566688`</td>
    </tr>
    <tr>
        <td>Side</td>
        <td>`9920590689`</td>
        <td>`9439568299`</td>
        <td>`9439575868`</td>
    </tr>
    <tr>
        <td rowspan="2">`Enum.Material.Sand|Sand`</td>
        <td>Top</td>
        <td>`9920591683`</td>
        <td>`9439577084`</td>
        <td>`9439577327`</td>
    </tr>
    <tr>
        <td>Side</td>
        <td>`9920592270`</td>
        <td>`9439586304`</td>
        <td>`9439593887`</td>
    </tr>
    <tr>
        <td rowspan="2">`Enum.Material.Sandstone|Sandstone`</td>
        <td>Top</td>
        <td>`9920596120`</td>
        <td>`9439596530`</td>
        <td>`9439596711`</td>
    </tr>
    <tr>
        <td>Side</td>
        <td>`9920628274`</td>
        <td>`9439605275`</td>
        <td>`9439605506`</td>
    </tr>
    <tr>
        <td rowspan="2">`Enum.Material.Slate|Slate`</td>
        <td>Top</td>
        <td>`9920599782`</td>
        <td>`9439612514`</td>
        <td>`9439612733`</td>
    </tr>
    <tr>
        <td>Side</td>
        <td>`9920614158`</td>
        <td>`9439615040`</td>
        <td>`9439621979`</td>
    </tr>
    <tr>
        <td rowspan="2">`Enum.Material.Snow|Snow`</td>
        <td>Top</td>
        <td>`9920620284`</td>
        <td>`9439632006`</td>
        <td>`9439632145`</td>
    </tr>
    <tr>
        <td>Side</td>
        <td>`9920620898`</td>
        <td>`9439639648`</td>
        <td>`9439640077`</td>
    </tr>
    <tr>
        <td>`Enum.Material.WoodPlanks|WoodPlanks`</td>
        <td>(all)</td>
        <td>`9920626778`</td>
        <td>`9439650689`</td>
        <td>`9439658127`</td>
    </tr>
</tbody>
</table>
</TabItem>
<TabItem label="Pre-2022 Terrain">
<table size="small">
<thead>
    <tr>
        <th>Material</th>
        <th>Terrain Face</th>
        <th>Color</th>
        <th>Normal</th>
        <th>Roughness</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td rowspan="2">`Enum.Material.Asphalt|Asphalt`</td>
        <td>Top</td>
        <td>`7547349715`</td>
        <td>`7547350415`</td>
        <td>`7551984908`</td>
    </tr>
    <tr>
        <td>Side</td>
        <td>`7551989667`</td>
        <td>`7547322693`</td>
        <td>`7547350597`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Basalt|Basalt`</td>
        <td>(all)</td>
        <td>`7551975939`</td>
        <td>`7547348152`</td>
        <td>`7551977581`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Brick|Brick`</td>
        <td>(all)</td>
        <td>`7547631333`</td>
        <td>`7547633037`</td>
        <td>`7546657679`</td>
    </tr>
    <tr>
        <td rowspan="2">`Enum.Material.Cobblestone|Cobblestone`</td>
        <td>Top</td>
        <td>`7551992689`</td>
        <td>`7547351364`</td>
        <td>`7547351553`</td>
    </tr>
    <tr>
        <td>Side</td>
        <td>`7547648825`</td>
        <td>`7547352096`</td>
        <td>`7547649793`</td>
    </tr>
    <tr>
        <td rowspan="2">`Enum.Material.Concrete|Concrete`</td>
        <td>Top</td>
        <td>`7547196561`</td>
        <td>`7547337919`</td>
        <td>`7547197958`</td>
    </tr>
    <tr>
        <td>Side</td>
        <td>`7547628584`</td>
        <td>`7547199386`</td>
        <td>`7547310473`</td>
    </tr>
    <tr>
        <td>`Enum.Material.CrackedLava|CrackedLava`</td>
        <td>(all)</td>
        <td>`7551980711`</td>
        <td>`7547320674`</td>
        <td>`7551982079`</td>
    </tr>
    <tr>
        <td rowspan="3">`Enum.Material.Glacier|Glacier`</td>
        <td>Top</td>
        <td>`7547646888`</td>
        <td>`7551930815`</td>
        <td>`7551932698`</td>
    </tr>
    <tr>
        <td>Side</td>
        <td>`7551937696`</td>
        <td>`7551940030`</td>
        <td>`7551941712`</td>
    </tr>
    <tr>
        <td>Bottom</td>
        <td>`7551946144`</td>
        <td>`7551948150`</td>
        <td>`7551932698`</td>
    </tr>
    <tr>
        <td rowspan="3">`Enum.Material.Grass|Grass`</td>
        <td>Top</td>
        <td>`7547307376`</td>
        <td>`7547336606`</td>
        <td>`7547308019`</td>
    </tr>
    <tr>
        <td>Side</td>
        <td>`7547621556`</td>
        <td>`7547191705`</td>
        <td>`7547622691`</td>
    </tr>
    <tr>
        <td>Bottom</td>
        <td>`7551927733`</td>
        <td>`7547193357`</td>
        <td>`7547625590`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Ground|Ground`</td>
        <td>(all)</td>
        <td>`7547348623`</td>
        <td>`7547348887`</td>
        <td>`7547349016`</td>
    </tr>
    <tr>
        <td rowspan="2">`Enum.Material.Ice|Ice`</td>
        <td>Top</td>
        <td>`7547352634`</td>
        <td>`7547651999`</td>
        <td>`7547652934`</td>
    </tr>
    <tr>
        <td>Side</td>
        <td>`7547656350`</td>
        <td>`7547657495`</td>
        <td>`7546663210`</td>
    </tr>
    <tr>
        <td rowspan="2">`Enum.Material.LeafyGrass|LeafyGrass`</td>
        <td>Top</td>
        <td>`7546663659`</td>
        <td>`7546664288`</td>
        <td>`7546664614`</td>
    </tr>
    <tr>
        <td>Side</td>
        <td>`7546665232`</td>
        <td>`7546666003`</td>
        <td>`7546666120`</td>
    </tr>
    <tr>
        <td rowspan="2">`Enum.Material.Limestone|Limestone`</td>
        <td>Top</td>
        <td>`7547206319`</td>
        <td>`7547670319`</td>
        <td>`7547671387`</td>
    </tr>
    <tr>
        <td>Side</td>
        <td>`7547206579`</td>
        <td>`7547674533`</td>
        <td>`7547206799`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Mud|Mud`</td>
        <td>(all)</td>
        <td>`7551972606`</td>
        <td>`7552022188`</td>
        <td>`7552023936`</td>
    </tr>
    <tr>
        <td rowspan="2">`Enum.Material.Pavement|Pavement`</td>
        <td>Top</td>
        <td>`7547678151`</td>
        <td>`7547207799`</td>
        <td>`7547207869`</td>
    </tr>
    <tr>
        <td>Side</td>
        <td>`7547680765`</td>
        <td>`7547208846`</td>
        <td>`7547682025`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Rock|Rock`</td>
        <td>(all)</td>
        <td>`7546659890`</td>
        <td>`7546660701`</td>
        <td>`7547643804`</td>
    </tr>
    <tr>
        <td rowspan="2">`Enum.Material.Salt|Salt`</td>
        <td>Top</td>
        <td>`7546666647`</td>
        <td>`7547660879`</td>
        <td>`7547661939`</td>
    </tr>
    <tr>
        <td>Side</td>
        <td>`7547665222`</td>
        <td>`7547667170`</td>
        <td>`7547668252`</td>
    </tr>
    <tr>
        <td rowspan="2">`Enum.Material.Sand|Sand`</td>
        <td>Top</td>
        <td>`7547635114`</td>
        <td>`7547311493`</td>
        <td>`7546658153`</td>
    </tr>
    <tr>
        <td>Side</td>
        <td>`7546658461`</td>
        <td>`7546659003`</td>
        <td>`7546659187`</td>
    </tr>
    <tr>
        <td rowspan="3">`Enum.Material.Sandstone|Sandstone`</td>
        <td>Top</td>
        <td>`7547202858`</td>
        <td>`7547204511`</td>
        <td>`7551954003`</td>
    </tr>
    <tr>
        <td>Side</td>
        <td>`7551958805`</td>
        <td>`7551960790`</td>
        <td>`7551962377`</td>
    </tr>
    <tr>
        <td>Bottom</td>
        <td>`7551967204`</td>
        <td>`7551968869`</td>
        <td>`7551970693`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Slate|Slate`</td>
        <td>(all)</td>
        <td>`7547309616`</td>
        <td>`7546656859`</td>
        <td>`7547626537`</td>
    </tr>
    <tr>
        <td>`Enum.Material.Snow|Snow`</td>
        <td>(all)</td>
        <td>`7547315875`</td>
        <td>`7547201338`</td>
        <td>`7547316776`</td>
    </tr>
    <tr>
        <td>`Enum.Material.WoodPlanks|WoodPlanks`</td>
        <td>(all)</td>
        <td>`7547637836`</td>
        <td>`7547639230`</td>
        <td>`7547640511`</td>
    </tr>
</tbody>
</table>
</TabItem>
</Tabs>

### Default colors

The following table lists the default RGB values for each base material. For information on how to color parts and terrain, see [Parts](../parts/index.md#color) and [Environmental Terrain](../parts/terrain.md#custom-terrain-colors).

<table size="small">
<thead>
    <tr>
        <th>Material</th>
        <th>RGB Value</th>
        <th>Color</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>`Enum.Material.Asphalt|Asphalt`</td>
        <td>`[80, 84, 84]`</td>
        <td><ColorSwatch value="rgb(80,84,84)" /></td>
    </tr>
    <tr>
        <td>`Enum.Material.Basalt|Basalt`</td>
        <td>`[75, 74, 74]`</td>
        <td><ColorSwatch value="rgb(75,74,74)" /></td>
    </tr>
    <tr>
        <td>`Enum.Material.Brick|Brick`</td>
        <td>`[138, 97, 73]`</td>
        <td><ColorSwatch value="rgb(138,97,73)" /></td>
    </tr>
		<tr>
        <td>`Enum.Material.Cardboard|Cardboard`</td>
        <td>`[255, 206, 152]`</td>
        <td><ColorSwatch value="rgb(255,206,152)" /></td>
    </tr>
		<tr>
        <td>`Enum.Material.Carpet|Carpet`</td>
        <td>`[163, 162, 165]`</td>
        <td><ColorSwatch value="rgb(163,162,165)" /></td>
    </tr>
		<tr>
        <td>`Enum.Material.CeramicTiles|CeramicTiles`</td>
        <td>`[181, 173, 156]`</td>
        <td><ColorSwatch value="rgb(181,173,156)" /></td>
    </tr>
		<tr>
        <td>`Enum.Material.ClayRoofTiles|ClayRoofTiles`</td>
        <td>`[255, 142, 87]`</td>
        <td><ColorSwatch value="rgb(255,142,87)" /></td>
    </tr>
    <tr>
        <td>`Enum.Material.Cobblestone|Cobblestone`</td>
        <td>`[134, 134, 118]`</td>
        <td><ColorSwatch value="rgb(134,134,118)" /></td>
    </tr>
    <tr>
        <td>`Enum.Material.Concrete|Concrete`</td>
        <td>`[152, 152, 152]`</td>
        <td><ColorSwatch value="rgb(152,152,152)" /></td>
    </tr>
    <tr>
        <td>`Enum.Material.CorrodedMetal|CorrodedMetal`</td>
        <td>`[104, 140, 173]`</td>
        <td><ColorSwatch value="rgb(104,140,173)" /></td>
    </tr>
    <tr>
        <td>`Enum.Material.CrackedLava|CrackedLava`</td>
        <td>`[255, 24, 67]`</td>
        <td><ColorSwatch value="rgb(255,24,67)" /></td>
    </tr>
    <tr>
        <td>`Enum.Material.DiamondPlate|DiamondPlate`</td>
        <td>`[168, 175, 176]`</td>
        <td><ColorSwatch value="rgb(168,175,176)" /></td>
    </tr>
    <tr>
        <td>`Enum.Material.Fabric|Fabric`</td>
        <td>`[194, 193, 168]`</td>
        <td><ColorSwatch value="rgb(194,193,168)" /></td>
    </tr>
    <tr>
        <td>`Enum.Material.Foil|Foil`</td>
        <td>`[168, 175, 176]`</td>
        <td><ColorSwatch value="rgb(168,175,176)" /></td>
    </tr>
		<tr>
        <td>`Enum.Material.ForceField|ForceField`</td>
        <td>`[163, 162, 165]`</td>
        <td><ColorSwatch value="rgb(163,162,165)" /></td>
    </tr>
    <tr>
        <td>`Enum.Material.Glacier|Glacier`</td>
        <td>`[221, 228, 229]`</td>
        <td><ColorSwatch value="rgb(221,228,229)" /></td>
    </tr>
    <tr>
        <td>`Enum.Material.Glass|Glass`</td>
        <td>`[138, 167, 168]`</td>
        <td><ColorSwatch value="rgb(138,167,168)" /></td>
    </tr>
    <tr>
        <td>`Enum.Material.Granite|Granite`</td>
        <td>`[149, 146, 139]`</td>
        <td><ColorSwatch value="rgb(149,146,139)" /></td>
    </tr>
    <tr>
        <td>`Enum.Material.Grass|Grass`</td>
        <td>`[111, 126, 62]`</td>
        <td><ColorSwatch value="rgb(111,126,62)" /></td>
    </tr>
    <tr>
        <td>`Enum.Material.Ground|Ground`</td>
        <td>`[140, 130, 104]`</td>
        <td><ColorSwatch value="rgb(140,130,104)" /></td>
    </tr>
    <tr>
        <td>`Enum.Material.Ice|Ice`</td>
        <td>`[204, 210, 223]`</td>
        <td><ColorSwatch value="rgb(204,210,223)" /></td>
    </tr>
    <tr>
        <td>`Enum.Material.LeafyGrass|LeafyGrass`</td>
        <td>`[106, 134, 64]`</td>
        <td><ColorSwatch value="rgb(106,134,64)" /></td>
    </tr>
		<tr>
        <td>`Enum.Material.Leather|Leather`</td>
        <td>`[110, 73, 53]`</td>
        <td><ColorSwatch value="rgb(110,73,53)" /></td>
    </tr>
    <tr>
        <td>`Enum.Material.Limestone|Limestone`</td>
        <td>`[255, 243, 192]`</td>
        <td><ColorSwatch value="rgb(255,243,192)" /></td>
    </tr>
    <tr>
        <td>`Enum.Material.Marble|Marble`</td>
        <td>`[122, 122, 122]`</td>
        <td><ColorSwatch value="rgb(122,122,122)" /></td>
    </tr>
    <tr>
        <td>`Enum.Material.Metal|Metal`</td>
        <td>`[168, 175, 176]`</td>
        <td><ColorSwatch value="rgb(168,175,176)" /></td>
    </tr>
    <tr>
        <td>`Enum.Material.Mud|Mud`</td>
        <td>`[121, 112, 98]`</td>
        <td><ColorSwatch value="rgb(121,112,98)" /></td>
    </tr>
		<tr>
        <td>`Enum.Material.Neon|Neon`</td>
        <td>`[163, 162, 165]`</td>
        <td><ColorSwatch value="rgb(163,162,165)" /></td>
    </tr>
    <tr>
        <td>`Enum.Material.Pavement|Pavement`</td>
        <td>`[143, 144, 135]`</td>
        <td><ColorSwatch value="rgb(143, 144, 135)" /></td>
    </tr>
    <tr>
        <td>`Enum.Material.Pebble|Pebble`</td>
        <td>`[122, 122, 118]`</td>
        <td><ColorSwatch value="rgb(122,122,118)" /></td>
    </tr>
		<tr>
        <td>`Enum.Material.Plaster|Plaster`</td>
        <td>`[204, 142, 105]`</td>
        <td><ColorSwatch value="rgb(204,142,105)" /></td>
    </tr>
		<tr>
        <td>`Enum.Material.Plastic|Plastic`</td>
        <td>`[163, 162, 165]`</td>
        <td><ColorSwatch value="rgb(163,162,165)" /></td>
    </tr>
    <tr>
        <td>`Enum.Material.Rock|Rock`</td>
        <td>`[99, 100, 102]`</td>
        <td><ColorSwatch value="rgb(99,100,102)" /></td>
    </tr>
		<tr>
        <td>`Enum.Material.RoofShingles|RoofShingles`</td>
        <td>`[66, 66, 66]`</td>
        <td><ColorSwatch value="rgb(66,66,66)" /></td>
    </tr>
		<tr>
        <td>`Enum.Material.Rubber|Rubber`</td>
        <td>`[32, 32, 32]`</td>
        <td><ColorSwatch value="rgb(32,32,32)" /></td>
    </tr>
    <tr>
        <td>`Enum.Material.Salt|Salt`</td>
        <td>`[255, 255, 254]`</td>
        <td><ColorSwatch value="rgb(255,255,254)" /></td>
    </tr>
    <tr>
        <td>`Enum.Material.Sand|Sand`</td>
        <td>`[207, 203, 167]`</td>
        <td><ColorSwatch value="rgb(207,203,167)" /></td>
    </tr>
    <tr>
        <td>`Enum.Material.Sandstone|Sandstone`</td>
        <td>`[148, 124, 95]`</td>
        <td><ColorSwatch value="rgb(148,124,95)" /></td>
    </tr>
    <tr>
        <td>`Enum.Material.Slate|Slate`</td>
        <td>`[88, 89, 86]`</td>
        <td><ColorSwatch value="rgb(88,89,86)" /></td>
    </tr>
		<tr>
        <td>`Enum.Material.SmoothPlastic|SmoothPlastic`</td>
        <td>`[163, 162, 165]`</td>
        <td><ColorSwatch value="rgb(163,162,165)" /></td>
    </tr>
    <tr>
        <td>`Enum.Material.Snow|Snow`</td>
        <td>`[235, 253, 255]`</td>
        <td><ColorSwatch value="rgb(235,253,255)" /></td>
    </tr>
    <tr>
        <td>`Enum.Material.Wood|Wood`</td>
        <td>`[172, 148, 108]`</td>
        <td><ColorSwatch value="rgb(172,148,108)" /></td>
    </tr>
    <tr>
        <td>`Enum.Material.WoodPlanks|WoodPlanks`</td>
        <td>`[172, 148, 108]`</td>
        <td><ColorSwatch value="rgb(172,148,108)" /></td>
    </tr>
</tbody>
</table>

### Default physical properties

The following table lists each material's default physical properties as detailed in the `Datatype.PhysicalProperties` reference. For information on customizing physical properties, see [physical properties](#physical-properties).

<table size="small">
  <thead>
    <tr>
      <th>Material</th>
      <th>Density</th>
      <th>Elasticity</th>
      <th>ElasticityWeight</th>
      <th>Friction</th>
      <th>FrictionWeight</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>`Enum.Material.Asphalt|Asphalt`</td>
      <td>`2.36`</td>
      <td>`0.2`</td>
      <td>`1`</td>
      <td>`0.8`</td>
      <td>`0.3`</td>
    </tr>
    <tr>
      <td>`Enum.Material.Basalt|Basalt`</td>
      <td>`2.691`</td>
      <td>`0.15`</td>
      <td>`1`</td>
      <td>`0.7`</td>
      <td>`0.3`</td>
    </tr>
    <tr>
      <td>`Enum.Material.Brick|Brick`</td>
      <td>`1.922`</td>
      <td>`0.15`</td>
      <td>`1`</td>
      <td>`0.8`</td>
      <td>`0.3`</td>
    </tr>
		<tr>
      <td>`Enum.Material.Cardboard|Cardboard`</td>
      <td>`0.7`</td>
      <td>`0.05`</td>
      <td>`2`</td>
      <td>`0.5`</td>
      <td>`1`</td>
    </tr>
		<tr>
      <td>`Enum.Material.Carpet|Carpet`</td>
      <td>`1.1`</td>
      <td>`0.25`</td>
      <td>`2`</td>
      <td>`0.4`</td>
      <td>`1`</td>
    </tr>
		<tr>
      <td>`Enum.Material.CeramicTiles|CeramicTiles`</td>
      <td>`2.4`</td>
      <td>`0.2`</td>
      <td>`1`</td>
      <td>`0.51`</td>
      <td>`1`</td>
    </tr>
		<tr>
      <td>`Enum.Material.ClayRoofTiles|ClayRoofTiles`</td>
      <td>`2`</td>
      <td>`0.2`</td>
      <td>`1`</td>
      <td>`0.51`</td>
      <td>`1`</td>
    </tr>
    <tr>
      <td>`Enum.Material.Cobblestone|Cobblestone`</td>
      <td>`2.691`</td>
      <td>`0.17`</td>
      <td>`1`</td>
      <td>`0.5`</td>
      <td>`1`</td>
    </tr>
    <tr>
      <td>`Enum.Material.Concrete|Concrete`</td>
      <td>`2.403`</td>
      <td>`0.2`</td>
      <td>`1`</td>
      <td>`0.7`</td>
      <td>`0.3`</td>
    </tr>
    <tr>
      <td>`Enum.Material.CorrodedMetal|CorrodedMetal`</td>
      <td>`7.85`</td>
      <td>`0.2`</td>
      <td>`1`</td>
      <td>`0.7`</td>
      <td>`1`</td>
    </tr>
    <tr>
      <td>`Enum.Material.CrackedLava|CrackedLava`</td>
      <td>`2.691`</td>
      <td>`0.15`</td>
      <td>`1`</td>
      <td>`0.65`</td>
      <td>`1`</td>
    </tr>
    <tr>
      <td>`Enum.Material.DiamondPlate|DiamondPlate`</td>
      <td>`7.85`</td>
      <td>`0.25`</td>
      <td>`1`</td>
      <td>`0.35`</td>
      <td>`1`</td>
    </tr>
    <tr>
      <td>`Enum.Material.Fabric|Fabric`</td>
      <td>`0.7`</td>
      <td>`0.05`</td>
      <td>`1`</td>
      <td>`0.35`</td>
      <td>`1`</td>
    </tr>
    <tr>
      <td>`Enum.Material.Foil|Foil`</td>
      <td>`2.7`</td>
      <td>`0.25`</td>
      <td>`1`</td>
      <td>`0.4`</td>
      <td>`1`</td>
    </tr>
    <tr>
      <td>`Enum.Material.ForceField|ForceField`</td>
      <td>`2.403`</td>
      <td>`0.2`</td>
      <td>`1`</td>
      <td>`0.25`</td>
      <td>`1`</td>
    </tr>
    <tr>
      <td>`Enum.Material.Glacier|Glacier`</td>
      <td>`0.919`</td>
      <td>`0.15`</td>
      <td>`1`</td>
      <td>`0.05`</td>
      <td>`2`</td>
    </tr>
    <tr>
      <td>`Enum.Material.Glass|Glass`</td>
      <td>`2.403`</td>
      <td>`0.2`</td>
      <td>`1`</td>
      <td>`0.25`</td>
      <td>`1`</td>
    </tr>
    <tr>
      <td>`Enum.Material.Granite|Granite`</td>
      <td>`2.691`</td>
      <td>`0.2`</td>
      <td>`1`</td>
      <td>`0.4`</td>
      <td>`1`</td>
    </tr>
    <tr>
      <td>`Enum.Material.Grass|Grass`</td>
      <td>`0.9`</td>
      <td>`0.1`</td>
      <td>`1.5`</td>
      <td>`0.4`</td>
      <td>`1`</td>
    </tr>
    <tr>
      <td>`Enum.Material.Ground|Ground`</td>
      <td>`0.9`</td>
      <td>`0.1`</td>
      <td>`1`</td>
      <td>`0.45`</td>
      <td>`1`</td>
    </tr>
    <tr>
      <td>`Enum.Material.Ice|Ice`</td>
      <td>`0.919`</td>
      <td>`0.15`</td>
      <td>`1`</td>
      <td>`0.02`</td>
      <td>`3`</td>
    </tr>
    <tr>
      <td>`Enum.Material.LeafyGrass|LeafyGrass`</td>
      <td>`0.9`</td>
      <td>`0.1`</td>
      <td>`2`</td>
      <td>`0.4`</td>
      <td>`2`</td>
    </tr>
		<tr>
      <td>`Enum.Material.Leather|Leather`</td>
      <td>`0.86`</td>
      <td>`0.25`</td>
      <td>`1`</td>
      <td>`0.35`</td>
      <td>`1`</td>
    </tr>
    <tr>
      <td>`Enum.Material.Limestone|Limestone`</td>
      <td>`2.691`</td>
      <td>`0.15`</td>
      <td>`1`</td>
      <td>`0.5`</td>
      <td>`1`</td>
    </tr>
    <tr>
      <td>`Enum.Material.Marble|Marble`</td>
      <td>`2.563`</td>
      <td>`0.17`</td>
      <td>`1`</td>
      <td>`0.2`</td>
      <td>`1`</td>
    </tr>
    <tr>
      <td>`Enum.Material.Metal|Metal`</td>
      <td>`7.85`</td>
      <td>`0.25`</td>
      <td>`1`</td>
      <td>`0.4`</td>
      <td>`1`</td>
    </tr>
    <tr>
      <td>`Enum.Material.Mud|Mud`</td>
      <td>`0.9`</td>
      <td>`0.07`</td>
      <td>`4`</td>
      <td>`0.3`</td>
      <td>`3`</td>
    </tr>
    <tr>
      <td>`Enum.Material.Neon|Neon`</td>
      <td>`0.7`</td>
      <td>`0.2`</td>
      <td>`1`</td>
      <td>`0.3`</td>
      <td>`1`</td>
    </tr>
    <tr>
      <td>`Enum.Material.Pavement|Pavement`</td>
      <td>`2.691`</td>
      <td>`0.17`</td>
      <td>`1`</td>
      <td>`0.5`</td>
      <td>`0.3`</td>
    </tr>
    <tr>
      <td>`Enum.Material.Pebble|Pebble`</td>
      <td>`2.403`</td>
      <td>`0.17`</td>
      <td>`1.5`</td>
      <td>`0.4`</td>
      <td>`1`</td>
    </tr>
		<tr>
      <td>`Enum.Material.Plaster|Plaster`</td>
      <td>`0.75`</td>
      <td>`0.2`</td>
      <td>`1`</td>
      <td>`0.6`</td>
      <td>`0.3`</td>
    </tr>
    <tr>
      <td>`Enum.Material.Plastic|Plastic`</td>
      <td>`0.7`</td>
      <td>`0.5`</td>
      <td>`1`</td>
      <td>`0.3`</td>
      <td>`1`</td>
    </tr>
    <tr>
      <td>`Enum.Material.Rock|Rock`</td>
      <td>`2.691`</td>
      <td>`0.17`</td>
      <td>`1`</td>
      <td>`0.5`</td>
      <td>`1`</td>
    </tr>
		<tr>
      <td>`Enum.Material.RoofShingles|RoofShingles`</td>
      <td>`2.36`</td>
      <td>`0.2`</td>
      <td>`1`</td>
      <td>`0.8`</td>
      <td>`0.3`</td>
    </tr>
		<tr>
      <td>`Enum.Material.Rubber|Rubber`</td>
      <td>`1.3`</td>
      <td>`0.95`</td>
      <td>`2`</td>
      <td>`1.5`</td>
      <td>`3`</td>
    </tr>
    <tr>
      <td>`Enum.Material.Salt|Salt`</td>
      <td>`2.165`</td>
      <td>`0.05`</td>
      <td>`1`</td>
      <td>`0.5`</td>
      <td>`1`</td>
    </tr>
    <tr>
      <td>`Enum.Material.Sand|Sand`</td>
      <td>`1.602`</td>
      <td>`0.05`</td>
      <td>`2.5`</td>
      <td>`0.5`</td>
      <td>`5`</td>
    </tr>
    <tr>
      <td>`Enum.Material.Sandstone|Sandstone`</td>
      <td>`2.691`</td>
      <td>`0.15`</td>
      <td>`1`</td>
      <td>`0.5`</td>
      <td>`5`</td>
    </tr>
    <tr>
      <td>`Enum.Material.SmoothPlastic|SmoothPlastic`</td>
      <td>`0.7`</td>
      <td>`0.5`</td>
      <td>`1`</td>
      <td>`0.2`</td>
      <td>`1`</td>
    </tr>
    <tr>
      <td>`Enum.Material.Slate|Slate`</td>
      <td>`2.691`</td>
      <td>`0.2`</td>
      <td>`1`</td>
      <td>`0.4`</td>
      <td>`1`</td>
    </tr>
    <tr>
      <td>`Enum.Material.Snow|Snow`</td>
      <td>`0.9`</td>
      <td>`0.03`</td>
      <td>`4`</td>
      <td>`0.3`</td>
      <td>`3`</td>
    </tr>
    <tr>
      <td>`Enum.Material.Wood|Wood`</td>
      <td>`0.35`</td>
      <td>`0.2`</td>
      <td>`1`</td>
      <td>`0.48`</td>
      <td>`1`</td>
    </tr>
    <tr>
      <td>`Enum.Material.WoodPlanks|WoodPlanks`</td>
      <td>`0.35`</td>
      <td>`0.2`</td>
      <td>`1`</td>
      <td>`0.48`</td>
      <td>`1`</td>
    </tr>
  </tbody>
</table>
