---
title: Reimport
description: Reimport allows you to update an existing custom mesh and textures without generating a new instance. 
---

<Alert severity = 'info'>
Reimport is currently in beta. Enable the Reimport beta by navigating to **File** > **Beta Features** and enable **Reimport**.

For latest information on updates and limitations, see the [DevForum Announcement](https://devforum.roblox.com/t/studio-beta-reimport-one-click-updates-for-imported-3d-content/4068650).
</Alert>

**Reimport** allows you to update existing custom models and their textures from an external 3D file. Unlike regular [import](./3d-importer.md#import-files), which creates brand new instances, the reimport function updates existing objects non-destructively to help support the iterative nature of 3D development.

<iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/HVUO3Dl7qT0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe> <br />

Along with asset updates, reimport remembers the file and settings used to import the original asset. This means you can easily update an imported asset with a single click or hotkey without going through all the initial import settings. This memory persists across Studio sessions.

## Supported instances

At this time, reimport supports `Class.MeshPart` and `Class.SurfaceAppearance` objects parented within a `Class.Model` container. This is the common object structure of an imported custom model with PBR textures. Reimport also supports [packages](../../projects/assets/packages.md), allowing you to reimport batches of asset instances at once.

- `Class.Model` - The reimport feature scans the container, updating any changed `Class.MeshPart` and `Class.SurfaceAppearance`.
  - `Class.MeshPart` - Reimport replaces meshes based off of mesh names saved in Studio and the external 3D file. For specific behavior, see [MeshPart detection](#meshpart-detection).
  - `Class.SurfaceAppearance` - Reimport replaces images for PBR textures based off of filenames. For specific behavior, see [SurfaceAppearance detection](#surfaceappearance-detection).

<Alert severity = 'info'>
Reimport memory is local to your device. A Reimport ID is stored on the `Class.Model` instance and referenced locally. Keep in mind the following:

- Filepaths are never saved in the place file.
- Reimport supports different reimport paths on different devices for the same instance.
- Reimport supports copy-pasting, saving and loading from rbxm/rbxl, and Asset Manager workflows.
</Alert>

### MeshPart detection

Reimport updates meshes based off of the path and name of the 3D source file, and the path and name of the mesh object in Studio. Reimport only updates the mesh content and transform properties and preserves other Roblox-specific properties.

Reimport relies on matching mesh names between the Studio and the 3D source file:

- If a mesh's `path/name` in the 3D source file **matches** a `Class.MeshPart` `path/name` in Studio, reimport updates the matching `Class.MeshPart`.
- If a mesh's `path/name` in the 3D source file **doesn't exist** as `Class.MeshPart` `path/name` in Studio, reimport creates a new `Class.MeshPart` within the `Class.Model`.
- If a `Class.MeshPart` `path/name` in Studio **doesn't exist** in the 3D source file, reimport does not modify the `Class.MeshPart` in Studio.

#### Known Asset Cache

Studio uses a **Known Asset Cache**, which helps detect duplicate imports in the same Studio session. If an imported or reimported asset is detected, Roblox reuses the existing asset ID instead of creating and uploading a new asset.

If you attempt to reimport a single mesh object, but the 3D file contains a larger number of meshes or textures, Roblox only applies a single asset upload for that object.

#### Duplicates

Reimport detects duplicate meshes, and doesn't reupload matching meshes that are the same in both Studio and the 3D source file.

In the scenario where a mesh in Blender is renamed from "Mesh1" to "Mesh2", reimport creates a new `Class.MeshPart` named "Mesh2" and doesn't apply changes to the original "Mesh1".

#### Pivot points

In cases where you may want to use the pivot point of the `Class.MeshPart` and not the `Class.Model`, right-click any `Class.MeshPart` with reimport information and select **Reimport** > **Reimport relative to this**.

**Reimport relative to this** triggers a reimport for the entire model using the pivot point of right-clicked `Class.MeshPart` as an anchor instead of the `Class.Model` pivot point. You can use this for models that have custom pivots by reimporting relative to a mesh that that has not changed position in the 3D file.

### SurfaceAppearance detection

Reimport can quickly batch update the textures of a model with [PBR textures](./surface-appearance.md) based off of the naming convention of the image files.

Reimport detects a set of known suffixes for color, metalness, normal, and roughness maps. You can find the full list of supported suffixes in the following table:

<table><thead>
  <tr>
    <th>Map Type</th>
    <th>Suffixes</th>
    <th>Example</th>
  </tr></thead>
<tbody>
  <tr>
    <td>Color</td>
    <td>diffuse, diff, albedo, base, col, color, alb</td>
    <td>Tree_**Color**.png</td>
  </tr>
  <tr>
    <td>Metalness</td>
    <td>metallic, metalness, metal, mtl, met</td>
    <td>Tree_**Metal**.png</td>
  </tr>
  <tr>
    <td>Roughness</td>
    <td>roughness, rough, rgh</td>
    <td>Tree_**Normal**.png</td>
  </tr>
  <tr>
    <td>Normal</td>
    <td>normal, nor, nrm, nrml, norm</td>
    <td>Tree_**Rough**.png</td>
  </tr>
</tbody>
</table>

When reimporting an asset with a `Class.SurfaceAppearance` selected, a file dialog displays allowing you to select a new image file to use as a PBR texture. Reimport automatically detects other PBR images in the directory based off of naming and maps them to the `Class.SurfaceAppearance` object.

## Reimport models

To enable reimport for an imported `Class.Model`, first configure your imported asset to save reimport configuration information for the model:

1. Right-click the `Class.Model` of your imported asset and select **Reimport** > **Configure**.
   <img src="../../assets/modeling/meshes/Reimport-menu.png" width="50%" alt="Right-click menu of an imported model, displaying reimport options"/>
2. In the Reimport configuration window, set the correct file path and import presets for future reimport actions.
3. Click **Save & Reimport** to initiate the reimport process.
4. For future reimports, right-click the `Class.Model` and select **Reimport** > **Reimport**.
   1. Alternatively, when selecting the object, use the reimport hotkey <kbd>Shift</kbd><kbd>Alt</kbd><kbd>R</kbd>.
   2. A loading indicator appears after selecting reimport. If there are any issues, a popup displays with any errors or warnings.

<Alert severity = 'warning'>
Since reimport relies on matching mesh paths/names to update a `Class.Model` from a 3D file, it’s important to maintain unique naming of meshes and their paths in your external 3D tools.

In Studio, you should also maintain the naming/tree structure of the `Class.MeshPart` objects within your model in order for reimport to update correctly.
</Alert>
