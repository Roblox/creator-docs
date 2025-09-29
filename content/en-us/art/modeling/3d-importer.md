---
title: 3D Importer
description: 3D Importer imports third-party .fbx, .gltf, and .obj 3D model assets into Studio.
---

The 3D Importer allows you to import `.fbx`, `.gltf`, or `.obj` 3D models into Studio as a custom `Class.Model`. This includes meshes with PBR textures, meshes with rigging, skinning, and animation data, and meshes designed as avatar items.

<Grid container spacing={2} style={{ marginBottom: 24, width: '100%' }}>
<Grid item xs={6} style={{ padding: 16 }}>
<Grid item container wrap="nowrap" direction="column" style={{ gap: 8, flex: 1 }}>

<div
className="container"
style={{ position: "relative", paddingBottom: "56.25%", height: 0, marginBottom: 12 }} >
<iframe
src="https://www.youtube-nocookie.com/embed/ikYZloBgqtE"
title="YouTube video player"
frameBorder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
allowFullScreen
style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} ></iframe>
</div>
<Typography variant="body1">
Import general 3D custom models into Studio.
</Typography>

</Grid>
</Grid>

<Grid item xs={6} style={{ padding: 16 }}>
<Grid item container wrap="nowrap" direction="column" style={{ gap: 8, flex: 1 }}>

<div
className="container"
style={{ position: "relative", paddingBottom: "56.25%", height: 0, marginBottom: 12 }} >
<iframe
src="https://www.youtube-nocookie.com/embed/RCsYZe3LoDM"
title="YouTube video player"
frameBorder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
allowFullScreen
style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} ></iframe>
</div>
<Typography variant="body1">
Use the 3D importer to import assets with avatar item components.
</Typography>
</Grid>
</Grid>
</Grid>

To import a 3D object:

1. From Studio's **File** menu, select **Import 3D**.
2. In the file browser, select the supported `.fbx`, `.gltf` or `.obj` files you intend to import.
   1. If selecting one object, the [import preview](#import-preview) window screen appears for that object.
   2. If selecting multiple objects, the files are added to the [import queue](#import-queue).
3. Configure your import settings and verify any [warning or error messages](#warnings-and-errors).
4. Click **Import**.

<Alert severity ='info'>
To directly import 3D assets using HTTP requests, see the [Open Cloud usage guide for assets](../../cloud/guides/usage-assets.md).
</Alert>

## Supported file types

Before importing a 3D object, ensure that the `.fbx`, `.gltf` or `.obj` meets Studio's [mesh requirements](../../art/characters/specifications.md) to reduce errors or unexpected behavior.

<table><thead>
  <tr>
    <th style={{width:"20%"}}>**File type**</th>
    <th style={{width:"40%"}}>**Studio compatibility**</th>
    <th>**Best for**</th>
  </tr></thead>
<tbody>
  <tr>
    <td>OBJ (`.obj`)</td>
    <td>— Basic single mesh objects</td>
    <td>Simple mesh geometry use-cases.</td>
  </tr>
  <tr>
    <td>FBX (`.fbx`)</td>
    <td>— Multiple mesh objects and hierarchies<br/>—  Textures, including basic and [PBR textures](../../art/modeling/surface-appearance.md).<br/>— Cage mesh objects<br/>— [Rigging and armature data](../../art/modeling/rigging.md)<br/>— Additional components for [avatar](../../avatar/index.md) items<br/>— Animation data<br/>— [Vertex colors](../blender.md#vertex-painting)</td>
    <td>Any type of 3D import, including but not limited to [game assets](../../assets.md) or [avatar items](../../avatar).</td>
  </tr>
  <tr>
    <td>gLTF (`.gltf`)</td>
    <td>— Multiple mesh objects and hierarchies<br/>— Textures, including basic and [PBR textures](../../art/modeling/surface-appearance.md).<br/>— Cage mesh objects<br/>— [Rigging and armature data](../../art/modeling/rigging.md)<br/>— Additional components for [avatar](../../avatar/index.md) items<br/>— Animation data<br/>— [Vertex colors](../blender.md#vertex-painting)</td>
    <td>Any type of 3D import, including but not limited to [game assets](../../assets.md) or [avatar items](../../avatar).</td>
  </tr>
</tbody></table>

## Import queue

If you selected multiple files with the 3D Importer, you can use the import queue to bulk manage your various imports.

<img src="../../assets/modeling/meshes/3d-Import-Queue.png" width="80%" alt="The 3D importer interface, showing a preview of the mesh in the top left, a list of 3D objects on the bottom left, and a list of toggle-able properties on the right side."/>

<Grid container spacing={2}>
  <Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../../assets/misc/Box-Label-A.png" width="40" style={{float:"right"}} /></Grid>
  <Grid item XSmall={10} Medium={11} Large={11} XLarge={11} style={{marginTop:"4px"}}>
  The **top bar** allows you to add new files, clear the queue, search and filter, and import all enabled models.
  </Grid>
</Grid>
<Grid container spacing={2}>
  <Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../../assets/misc/Box-Label-B.png" width="40" style={{float:"right"}} /></Grid>
  <Grid item XSmall={10} Medium={11} Large={11} XLarge={11} style={{marginTop:"4px"}}>
  The **import queue** lists all added files, with quick access dropdowns to change creator, presets, and file paths.
  </Grid>
</Grid>

### Add files to queue

To open a file browser and add additional files to the import queue, you can:

- Click the **Add file** button in the top bar of the import queue window.
- From Studio's **File** menu, select **Import 3D**.

### Remove files from queue

To remove all files from the queue, click the **Clear queue** button with the broom icon. To remove an individual file from the queue, right-click an item in the queue and select **Delete from queue**.

### Apply preset settings

Use the **Import Preset** column to select a preset configuration to apply to your model. For more information, see [Presets](#presets).

You can also apply the settings of one item to all items by right-clicking an item with the desired settings and selecting **Apply settings to all**.

### Access individual preview and settings

Click the individual **Asset** name of an unimported model to access the import preview for that item. Use the import preview to view and check your model, as well as set any individual [import settings](#import-settings).

### Import files

Ensure that each item you want to import has a checkbox enabled in the first column. By default, all items are selected if they are importable.

Press the **Import** button to start the import process.

## Import preview

The import preview window appears if you are importing a single file, or if you selected an individual item from the import queue. This preview window provides individual controls for the various objects in your model.

The preview window is divided into multiple sections:

<img src="../../assets/modeling/meshes/3d-Importer-Panels.png" width="80%" alt="The 3D importer interface, showing a preview of the mesh in the top left, a list of 3D objects on the bottom left, and a list of toggle-able properties on the right side."/>

<Grid container spacing={2}>
  <Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../../assets/misc/Box-Label-A.png" width="40" style={{float:"right"}} /></Grid>
  <Grid item XSmall={10} Medium={11} Large={11} XLarge={11} style={{marginTop:"4px"}}>
  The **file path** of your model file. Click **Browse** to edit.
  </Grid>
</Grid>
<Grid container spacing={2}>
  <Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../../assets/misc/Box-Label-B.png" width="40" style={{float:"right"}} /></Grid>
  <Grid item XSmall={10} Medium={11} Large={11} XLarge={11} style={{marginTop:"4px"}}>
  The **preset** applied to your import. Use the dropdown to select multiple presets, or the hamburger menu to set a new preset.
  </Grid>
</Grid>
<Grid container spacing={2}>
  <Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../../assets/misc/Box-Label-C.png" width="40" style={{float:"right"}} /></Grid>
  <Grid item XSmall={10} Medium={11} Large={11} XLarge={11} style={{marginTop:"4px"}}>
  The **3D preview** of your model. Use mouse buttons and top-right icons for various camera options and views.
  </Grid>
</Grid>
<Grid container spacing={2}>
  <Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../../assets/misc/Box-Label-D.png" width="40" style={{float:"right"}} /></Grid>
  <Grid item XSmall={10} Medium={11} Large={11} XLarge={11} style={{marginTop:"4px"}}>
  The **object hierarchy** of the imported object. Includes mesh objects and other supported components.
  </Grid>
</Grid>
<Grid container spacing={2}>
  <Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../../assets/misc/Box-Label-E.png" width="40" style={{float:"right"}} /></Grid>
  <Grid item XSmall={10} Medium={11} Large={11} XLarge={11} style={{marginTop:"4px"}}>
  The **import settings** for your import. For a complete list of settings, see [Import settings](#import-settings).
  </Grid>
</Grid>

### Import settings

Depending on the object selected in the hierarchy panel, the inspector panel displays the following groups of settings:

- **File General**: Affects the entire imported file.
- **Rig General**: Affects the selected mesh object if rigging data is present.
- **File Transform**: Affects the transform properties of the imported file.
- **File Geometry**: Affects the geometry properties of the imported file.
- **Object General**: Affects the selected child object.
- **Object Geometry**: Affects the geometry of the selected child object.

#### File general

The 3D Importer provides the following settings for all meshes:

<table>
<thead>
  <tr>
    <th>Setting</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Name</td>
    <td>Sets the name of the imported asset as it will appear in your project.</td>
  </tr>
  <tr>
    <td>Import Only As Model</td>
    <td>If enabled, the 3D Importer imports the model as a single asset even if the model contains multiple children. By default, this is **enabled**. <br /><br />If disabled, the 3D Importer imports the model and all descendants, such as the multiple meshes, as individual assets.</td>
  </tr>
  <tr>
    <td>Add Model To Inventory</td>
    <td>If enabled, the 3D Importer adds the model to your **Toolbox** and **Asset Manager** inventory as a new asset. By default, this is **enabled**. <br /><br />If disabled, the 3D Importer does not add the asset to your inventory.</td>
  </tr>
  <tr>
    <td>Insert In Workspace</td>
    <td>If enabled, the 3D Importer inserts the model into the `Class.Workspace` as well as your **Toolbox** and **Asset Manager** inventory. If importing from a saved or published experience, this setting also grants permission to the experience to use the restricted asset. By default, this is **enabled**. <br /><br />If disabled, this setting only adds the model to your inventory and does **not** grant the experience permission to use the asset.</td>
  </tr>
  <tr>
    <td>Insert Using Scene Position</td>
    <td>If enabled, the 3D Importer uses the current scene position when inserting the model into the workspace. By default, this is **disabled**.</td>
  </tr>
  <tr>
    <td>Set Pivot to Scene Origin</td>
    <td>If enabled, the 3D Importer sets the pivot point of the entire model to the scene origin. By default, this is **enabled**.</td>
  </tr>
  <tr>
    <td>Anchored</td>
    <td>If enabled, the 3D Importer sets the `Class.BasePart.Anchored|Anchored` property to `true` on all the imported `Class.MeshPart|MeshParts`. This is disabled for meshes with rig data / avatars. By default, this is **disabled**.</td>
  </tr>
  <tr>
    <td>Uses Cage</td>
    <td>If enabled, the 3D Importer finds cage meshes in the model and converts them to `WrapInstance` objects, such as `Class.WrapLayer` or `Class.WrapTarget`. If disabled, the Importer treats them as regular meshes. If the 3D Importer initially detects cage meshes in the model, this is **enabled** by default.</td>
  </tr>
</tbody>
</table>

#### Rig general

The 3D Importer provides the following settings for meshes with rigging data, typically character bodies or clothing accessories:

<table>
<thead>
  <tr>
    <th>Setting</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Rig Type</td>
    <td>Sets the type of rig the mesh should be associated with. The options are:<br />- **R15**<br />- **Custom**<br />- **No Rig**<br /><br />By default, the 3D importer attempts to select the most appropriate setting based on the detected rigging and skinning data of the mesh. </td>
  </tr>
  <tr>
    <td>Validate UGC Body</td>
    <td>After importing, Studio opens the assets in the [Avatar Setup](../../avatar-setup/index.md) tool, allowing you to quickly begin testing and uploading avatar assets to the Marketplace.</td>
  </tr>
  <tr>
    <td>Rig Scale</td>
    <td>If Rig Type is set to R15, the importer provides additional options to specify [body type scaling](../../art/characters/specifications.md#body-scale). The options are:<br />- **Default**<br />- **Rthro**<br />- **Rthro Narrow**</td>
  </tr>
</tbody>
</table>

#### File transform

The 3D Importer provides the following settings for all meshes:

<table>
<thead>
  <tr>
    <th>Setting</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>World Forward</td>
    <td>Sets the forward facing axis of the object. By default, this is set to **Front**.</td>
  </tr>
  <tr>
    <td>World Up</td>
    <td>Sets the upward facing axis of the object. By default, this is set to **Top**.</td>
  </tr>
</tbody>
</table>

#### File geometry

File geometry includes information on the file dimensions and polycount of the entire model. You can edit the following settings for all meshes:

<table>
<thead>
  <tr>
    <th>Setting</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Scale Unit</td>
    <td>Sets what units the file was modeled in so that it's sized appropriately when imported. By default, this is set to **Studs**.</td>
  </tr>
  <tr>
    <td>Merge Meshes</td>
    <td>If enabled, merges all MeshParts in the model into a single MeshPart and creates one MeshPart rather than a Model. By default, this is **disabled**.</td>
  </tr>
  <tr>
    <td>Invert Negative Faces</td>
    <td>Inverts the orientation of negative faces in the mesh. By default, this is **disabled**.</td>
  </tr>
</tbody>
</table>

#### Object general

When selecting a specific child object of your mesh, the 3D Importer populates Object General settings. You can edit the following settings for the selected child objects:

<table>
<thead>
  <tr>
    <th>Setting</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Name</td>
    <td>Sets the name of the selected child object within the model.</td>
  </tr>
  <tr>
    <td>Anchored</td>
    <td>If enabled, sets the `Class.BasePart.Anchored|Anchored` property to `true` on the selected child object. By default, this is **disabled**.</td>
  </tr>
  <tr>
    <td>Use Imported Pivot</td>
    <td>If enabled, imports the object using the pivot point set within the child object. By default, this is **enabled**.</td>
  </tr>
</tbody>
</table>

#### Object geometry

Object Geometry includes information on the dimensions and polycount of the selected child object of the model. You can edit the following settings for the selected child objects:

<table>
<thead>
  <tr>
    <th>Setting</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Make Double Sided</td>
    <td>If disabled, sets the vertices as one-sided. One-sided vertices means that you can see through them from one side. <br /><br />If enabled, sets the vertices as double-sided. Vertices that are double sided visually render on both sides. Double-sided is more performance intensive.<br /><br />By default, this is **disabled**. </td>
  </tr>
  <tr>
    <td>Ignore Vertex Colors</td>
    <td>If enabled, ignores the vertex color data in the child object. By default, this is **disabled**. </td>
  </tr>
</tbody>
</table>

## Presets

You can save presets of various import settings to quickly apply later within the [import preview](#import-preview) or [import queue](#import-queue).

By default, you can select between two presets:

- **Studio Default**: The default import behavior.
- **Last Imported**: Uses the settings applied to the most recent import.

You can use the **&ctdot;** menu next to the Presets dropdown for additional options:

- **Reset all**: Removes any changes to the current configuration, putting settings back in the default state for the current preset.
- **Save selection**: Allows you to save any new changes to the importer settings into the currently selected preset.
- **Save as new**: Sets the current settings as a new preset. A dialogue box displays allowing you to set a name.
- **Set as default**: Sets the current preset as the default for all imports moving forward.
- **Rename**: Renames the current preset.
- **Delete**: Deletes the current preset. Resets to `Studio Default` preset.

## Warnings and errors

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/UEHEsmCslBU" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<br />

If Studio detects any issues with your model, a small indicator displays in the hierarchy panel or the settings panel.

If you see a warning icon in the hierarchy, expand the hierarchy until you reach the specific child object to see more information about the issue. Warning and error messages display in the settings panel or as a tooltip.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/modeling/meshes/Warning-Settings-Panel.png" alt="A warning message in orange stating an error about cages mismatching."/>
    <figcaption>Warning and error messages display in the appropriate section in the inspector panel.</figcaption>
  </figure>
  <figure>
    <img src="../../assets/modeling/meshes/Warning-Mouse-Over.png" alt="An error message in red with a pop-up message about missing textures."/>
    <figcaption>Some errors display a tooltip when hovering over the error icon.</figcaption>
  </figure>
</GridContainer>
