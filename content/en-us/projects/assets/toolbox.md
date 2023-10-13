---
title: Toolbox
description: The Toolbox contains a selection of assets made by Roblox or Roblox community members.
id: toolbox
---

The **Toolbox** contains a selection of [models](../../parts/models.md), [images](../../parts/textures-decals.md), [meshes](../../parts/meshes.md), [audio](../../sound/assets.md), [plugins](../../studio/plugins.md), [videos](../../ui/frames.md#videoframe), and fonts made by Roblox or Roblox community members. It also includes all of the creations that you've personally published or those which were published by [groups](../../projects/groups.md) you belong to.

<img src="../../assets/studio/general/View-Tab-Toolbox.png" width="760" alt="Toolbox toggle button in Studio" />

## Sections

The toolbox is organized into distinct sections of [Marketplace](#marketplace), [Inventory](#inventory), and [Recent](#recent).

### Marketplace

The **Marketplace** section contains [models](../../parts/models.md), [images](../../parts/textures-decals.md), [meshes](../../parts/meshes.md), [audio](../../sound/assets.md), [plugins](../../studio/plugins.md), [videos](../../ui/frames.md#videoframe), and fonts made by Roblox or Roblox community members.

<img src="../../assets/studio/toolbox/Marketplace-Tab.png" width="360" />

### Inventory

The **Inventory** section contains [models](../../parts/models.md), [images](../../parts/textures-decals.md), [meshes](../../parts/meshes.md), [audio](../../sound/assets.md), [packages](../../projects/assets/packages.md), [videos](../../ui/frames.md#videoframe), [plugins](../../studio/plugins.md), [animations](../../animation/editor.md), and fonts that you've personally published or taken from the [Creator Marketplace](../../production/publishing/creator-marketplace.md).

<img src="../../assets/studio/toolbox/Inventory-Tab.png" width="360" />

### Recent

The **Recent** tab is similar to [Inventory](#inventory) except that it is filtered by recently used [models](../../parts/models.md), [images](../../parts/textures-decals.md), [meshes](../../parts/meshes.md), [audio](../../sound/assets.md), [videos](../../ui/frames.md#videoframe), and [animations](../../animation/editor.md).

<img src="../../assets/studio/toolbox/Recent-Tab.png" width="360" />

## Sorting and Searching

<Tabs>
<TabItem label="Asset Category">
Within any of the toolbox sections, use the **category selector** dropdown to sort assets by category. The options in the dropdown vary by section.

<img src="../../assets/studio/toolbox/Marketplace-Category-Selector.png" width="360" />
</TabItem>
<TabItem label="Marketplace Sorting">
Within the [Marketplace](#marketplace) section, click the **advanced filter** button to limit results to [verified creator](../../production/publishing/account-verification.md) status, filter assets by a specific **Creator** username, and filter by **Sound&nbsp;Length** for audio assets.

<img src="../../assets/studio/toolbox/Marketplace-Advanced-Filter.png" width="360" />

You can also filter **Audio** by either **Sound&nbsp;Effect** or **Music**, and further refine your search by sound effect category or by music genre.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/studio/toolbox/Marketplace-Audio-Sound-Effects-Category.png" width="360" />
  </figure>
  <figure>
    <img src="../../assets/studio/toolbox/Marketplace-Audio-Music-Genre.png" width="360" />
  </figure>
</GridContainer>
</TabItem>
<TabItem label="Inventory Sorting">
Within the [Inventory](#inventory) section, click the **advanced filter** button to limit results to [verified creator](../../production/publishing/account-verification.md) status, filter by **My&nbsp;Assets**, and sort by other criteria.

<img src="../../assets/studio/toolbox/Inventory-Advanced-Filter.png" width="360" />

<Alert severity="success">
Checking **My Assets** is particularly useful for filtering by assets that you've personally published or those which were published by [groups](../../projects/groups.md) you belong to. All assets with this criteria can be [configured](#asset-configuration-and-versioning) directly within Studio.
</Alert>
</TabItem>
</Tabs>

## Asset Inspection

You can closely inspect a model, image, mesh, plugin, video, or font asset by hovering over its thumbnail and clicking the "magnify" icon.

<img src="../../assets/studio/toolbox/Asset-Inspect-Icon.png" width="400" />

From the popup that appears, the following inspection options are available:

<Tabs>
<TabItem label="Preview">
For 3D assets like meshes, you can move the virtual camera around to get a better view from all angles. For videos, you can preview the entire video in the popup.

<video src="../../assets/studio/toolbox/3D-Asset-Preview.mp4" controls width="315"></video>

<table size="small">
<thead>
  <tr>
    <th>Action</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Hold left mouse button and drag</td>
    <td>Rotate around the object.</td>
  </tr>
  <tr>
    <td>Hold right mouse button and drag</td>
    <td>Pan left, right, up, or down.</td>
  </tr>
  <tr>
    <td>Mouse scroll wheel</td>
    <td>Zoom in or out.</td>
  </tr>
</tbody>
</table>
</TabItem>
<TabItem label="Composition">
In the lower-right corner of the preview frame, the **composition** button reveals the full hierarchy of the asset including `Class.MeshPart|MeshParts`, `Class.Script|Scripts`, `Class.Animation|Animations`, and more.

<img src="../../assets/studio/toolbox/Preview-Panel-Hierarchy.png" width="600" />
</TabItem>
<TabItem label="Info / Actions">
Below the preview frame is additional info and context actions for the asset:

<GridContainer numColumns="2">
<figure>
<img src="../../assets/studio/toolbox/Preview-Panel-Options.png" width="315" />
</figure>
<figure>
<Grid container spacing={2} alignItems="center">
	<Grid item><img src="../../assets/misc/Box-Label-A.png" width="40" /></Grid>
	<Grid item xs={10} sm={8} md={8} lg={8}><p>Vote on the asset.</p></Grid>
</Grid>
<Grid container spacing={2} alignItems="center">
	<Grid item><img src="../../assets/misc/Box-Label-B.png" width="40" /></Grid>
	<Grid item xs={10} sm={8} md={8} lg={8}><p>Mark the asset as one of your favorites.</p></Grid>
</Grid>
<Grid container spacing={2} alignItems="center">
	<Grid item><img src="../../assets/misc/Box-Label-C.png" width="40" /></Grid>
	<Grid item xs={10} sm={8} md={8} lg={8}><p>Copy the asset's ID, view it in your browser, or [configure](#asset-configuration-and-versioning) it.</p></Grid>
</Grid>
<Grid container spacing={2} alignItems="center">
	<Grid item><img src="../../assets/misc/Box-Label-D.png" width="40" /></Grid>
	<Grid item xs={10} sm={8} md={8} lg={8}><p>Insert the asset into the current place.</p></Grid>
</Grid>
</figure>
</GridContainer>
</TabItem>
</Tabs>

<Alert severity="warning">
Take caution when inserting packages that you didn't create into your experiences, as they may contain malicious scripts that can impact your experience's performance. Malicious packages can be difficult to troubleshoot without reverting to an older version of your experience, so it's recommended to always save your experience and investigate any scripts within unfamiliar packages before bringing them into your place file.
</Alert>

## Asset Configuration and Versioning

Right-clicking an asset and selecting **Edit Asset** opens the **Asset Configuration** window. In this window, you can edit the asset's details or restore it to a previous version.

<Alert severity="warning">
Asset configuration is only possible for assets you've personally published or those which were published by [groups](../../projects/groups.md) you belong to. See [Inventory Sorting](#sorting-and-searching) on how to filter assets by these criteria.
</Alert>
