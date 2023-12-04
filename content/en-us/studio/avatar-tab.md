---
title: Avatar Tab
description: The Avatar tab contains specialized tools for working with avatars and accessories.
---

The **Avatar** tab contains the standard [transform tools](../studio/model-tab.md#transform-tools) as well as specialized tools for creating and fitting accessories, importing custom meshes, building default rigs, and creating animations.

<img src="../assets/studio/general/Toolbar-Avatar-Tab.png" width="868" alt="Avatar tab indicated in Studio toolbar" />

## Accessory Tools

The **Accessory** section contains tools for creating layered or rigid [accessories](../art/accessories/index.md) from imported custom meshes.

<img src="../assets/studio/general/Avatar-Tab-Accessory-Tools.png" width="868" />

<table>
<thead>
  <tr>
    <th>Tool</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Accessory Fitting Tool**</td>
    <td>Test and fit meshes on multiple reference characters and animations before converting them to an `Class.Accessory`. The tool automatically adds the correct attachment points and `Enum.AssetType` to the created accessory.</td>
  </tr>
  <tr>
    <td>**Create Accessory**</td>
    <td>Quickly converts the selected `Class.MeshPart` into an `Class.Accessory` object. See the [Output](../studio/output.md) window for any messages regarding the asset.</td>
  </tr>
  <tr>
    <td>**Bulk Create Accessories**</td>
    <td>Quickly converts multiple selected `Class.MeshPart` into an `Class.Accessory` object. See the [Output](../studio/output.md) window for any messages regarding the asset.</td>
  </tr>
</tbody>
</table>

## Import 3D

The **Import 3D** tool allows you to import nearly any type of `.fbx` or `.obj` and associated texture files into Studio. See [3D&nbsp;Importer](../art/modeling/3d-importer.md) for more information.

<img src="../assets/studio/general/Avatar-Tab-Import-3D.png" width="760" alt="Import 3D button indicated in Avatar tab" />

## Rig Builder

The **Rig Builder** tool lets you insert pre-built rigs, typically for animation purposes. For more information, see [Rig Builder](../studio/rig-builder.md).

<img src="../assets/studio/general/Avatar-Tab-Rig-Builder.png" width="760" alt="Rig Builder button indicated in Avatar tab" />

## Avatar Setup

The **Avatar Setup** tool lets you easily preview animations, clothing, accessories, and body constructs on avatar models, directly in Studio. Avatar item creators can upload and validate assets for the Marketplace from this tool. See [Avatar Setup](../art/modeling/avatar-setup.md) for usage details.

<img src="../assets/studio/general/Avatar-Tab-Avatar-Setup.png" width="760" alt="Avatar Preview button indicated in Avatar tab" />

<Alert severity="success">
This feature is currently in beta and changes/upgrades should be anticipated. To use it, go to **Beta Features** and enable **UGC Bodies & Heads**.
</Alert>

## Animation Editor

The **Animation Editor** allows you to design and publish custom animations on rigs. For more information, see [Animation Editor](../animation/editor.md).

<img src="../assets/studio/general/Avatar-Tab-Animation-Editor.png" width="760" alt="Animation Editor button indicated in Avatar tab" />
