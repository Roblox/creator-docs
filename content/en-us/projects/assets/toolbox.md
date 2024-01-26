---
title: Toolbox
description: The Toolbox contains a selection of assets made by Roblox or Roblox community members.
id: toolbox
---

The **Toolbox** contains a selection of [models](../../parts/models.md), [images](../../parts/textures-decals.md), [meshes](../../parts/meshes.md), [audio](../../sound/assets.md), [plugins](../../studio/plugins.md), [videos](../../ui/frames.md#videoframe), and fonts made by Roblox or Roblox community members. It also includes all of the creations that you've personally published or those which were published by [groups](../../projects/groups.md) you belong to.

<img src="../../assets/studio/general/View-Tab-Toolbox.png" width="776" alt="Toolbox toggle button in Studio" />

## Sections

The toolbox is organized into distinct sections of [Creator Store](#creator-store), [Inventory](#inventory), and [Recent](#recent).

### Creator Store

The **Creator Store** section contains [models](../../parts/models.md), [images](../../parts/textures-decals.md), [meshes](../../parts/meshes.md), [audio](../../sound/assets.md), [plugins](../../studio/plugins.md), [videos](../../ui/frames.md#videoframe), and fonts made by Roblox or Roblox community members.

<img src="../../assets/studio/toolbox/Creator-Store-Tab.png" width="360" alt="Creator Store tab indicated in Studio's Toolbox" />

<Alert severity="warning">
Take caution when inserting models that you didn't create into your experiences, as they may contain malicious scripts that can impact performance or behavior. It's recommended to always [inspect assets](#asset-inspection) and investigate any embedded scripts before bringing them into your place file.
</Alert>

### Inventory

The **Inventory** section contains [models](../../parts/models.md), [images](../../parts/textures-decals.md), [meshes](../../parts/meshes.md), [audio](../../sound/assets.md), [packages](../../projects/assets/packages.md), [videos](../../ui/frames.md#videoframe), [plugins](../../studio/plugins.md), [animations](../../animation/editor.md), and fonts that you've personally published, those which were published by [groups](../../projects/groups.md) you belong to, or those taken from the [Creator Store](../../production/publishing/creator-store.md).

<img src="../../assets/studio/toolbox/Inventory-Tab.png" width="360" alt="Inventory tab indicated in Studio's Toolbox" />

### Recent

The **Recent** tab is similar to [Inventory](#inventory) except that it is filtered by recently used [models](../../parts/models.md), [images](../../parts/textures-decals.md), [meshes](../../parts/meshes.md), [audio](../../sound/assets.md), [videos](../../ui/frames.md#videoframe), and [animations](../../animation/editor.md).

<img src="../../assets/studio/toolbox/Recent-Tab.png" width="360" alt="Recent tab indicated in Studio's Toolbox" />

## Sorting and Searching

<Tabs>
<TabItem label="Asset Category">
Within any of the toolbox sections, use the **category selector** dropdown to sort assets by category. The options in the dropdown vary by section.

<img src="../../assets/studio/toolbox/Creator-Store-Category-Selector.png" width="360" height="284" alt="Category selector in the Creator Store tab of Studio's Toolbox" />
</TabItem>
<TabItem label="Creator Store Sorting">
Within the [Creator Store](#creator-store) section, click the **advanced filter** button to limit results to [verified creator](../../production/publishing/account-verification.md) status, filter assets by a specific creator, and filter by sound length for [audio assets](../../sound/assets.md).

<img src="../../assets/studio/toolbox/Creator-Store-Advanced-Filter.png" width="580" height="110" alt="Advanced filter button indicated in the Creator Store tab of Studio's Toolbox" />
</TabItem>
<TabItem label="Inventory Sorting">
Within the [Inventory](#inventory) section, click the **advanced filter** button to limit results to [verified creator](../../production/publishing/account-verification.md) status, filter by **My&nbsp;Assets**, and sort by other criteria.

<img src="../../assets/studio/toolbox/Inventory-Advanced-Filter.png" width="580" height="110" alt="Advanced filter button indicated in the Inventory tab of Studio's Toolbox" />

<Alert severity="success">
Checking **My Assets** is particularly useful for filtering by assets that you've personally published or those which were published by [groups](../../projects/groups.md) you belong to. All assets with this criteria can be [configured](#asset-configuration-and-versioning) directly within Studio.
</Alert>
</TabItem>
</Tabs>

## Asset Inspection

You can closely inspect a model, image, mesh, plugin, video, or font asset by hovering over its thumbnail and clicking the "magnify" icon.

<img src="../../assets/studio/toolbox/Asset-Inspect-Icon.png" width="400" alt="Asset inspection button indicated for an asset in the Toolbox" />

When previewing 3D assets like meshes, you can move the virtual camera around to get a better view from all angles. For videos, you can preview the entire video in the popup.

<Grid container spacing={3}>
<Grid item>
<video src="../../assets/studio/general/3D-Asset-Preview.mp4" controls width="315"></video>
</Grid>
<Grid item>
<table size="small">
<thead>
  <tr>
    <th>Action</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Left mouse button&nbsp;+ drag</td>
    <td>Rotate around the object.</td>
  </tr>
  <tr>
    <td>Right mouse button&nbsp;+ drag</td>
    <td>Pan left, right, up, or down.</td>
  </tr>
  <tr>
    <td>Mouse scroll wheel</td>
    <td>Zoom in or out.</td>
  </tr>
</tbody>
</table>
</Grid>
</Grid>

In the lower-right corner of the preview frame, the **composition** button reveals the full hierarchy of the asset including `Class.Script|Scripts`, `Class.MeshPart|MeshParts`, `Class.Animation|Animations`, and more. It's recommended to always inspect embedded scripts before bringing a model into your place file, as scripts that you didn't write may contain malicious code that can impact performance or behavior.

<img src="../../assets/studio/general/Preview-Panel-Hierarchy.png" width="560" alt="Asset composition hierarchy shown below the preview of an asset" />

## Asset Configuration and Versioning

Right-clicking an asset and selecting **Edit Asset** opens the **Asset Configuration** window. In this window, you can edit the asset's details or restore it to a previous version.

<Alert severity="warning">
Asset configuration is only possible for assets you've personally published or those which were published by [groups](../../projects/groups.md) you belong to. See [Inventory Sorting](#sorting-and-searching) on how to filter assets by these criteria.
</Alert>
