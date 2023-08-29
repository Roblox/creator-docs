---
title: Toolbox
description: The Toolbox contains a selection of assets made by Roblox or Roblox community members.
id: toolbox
---

The **Toolbox** contains a selection of [models](../../parts/models.md), [images](../../parts/textures-decals.md), [meshes](../../parts/meshes.md), [audio](../../sound/assets.md), [plugins](../../studio/plugins.md), [videos](../../ui/frames.md#videoframe), and [fonts](../../production/publishing/creator-marketplace.md#adding-assets-to-experiences) made by Roblox or Roblox community members. It also includes all of the [creations](#creations) that you've personally published or those which were published by [groups](../../projects/groups.md) you belong to.

<img src="../../assets/studio/general/View-Tab-Toolbox.png" width="876" alt="Toolbox toggle button in Studio" />

## Sections

The toolbox is organized into distinct sections of [Marketplace](#marketplace), [Inventory](#inventory), [Recent](#recent), and [Creations](#creations).

### Marketplace

The **Marketplace** section contains [models](../../parts/models.md), [images](../../parts/textures-decals.md), [meshes](../../parts/meshes.md), [audio](../../sound/assets.md), [plugins](../../studio/plugins.md), [videos](../../ui/frames.md#videoframe), and [fonts](../../production/publishing/creator-marketplace.md#adding-assets-to-experiences) made by Roblox or Roblox community members.

<img src="../../assets/studio/toolbox/Marketplace-Tab.png" width="360" />

### Inventory

The **Inventory** section contains [models](../../parts/models.md), [images](../../parts/textures-decals.md), [meshes](../../parts/meshes.md), [audio](../../sound/assets.md), [packages](../../projects/assets/packages.md), [videos](../../ui/frames.md#videoframe), [plugins](../../studio/plugins.md), and [animations](../../animation/editor.md) that you've personally published or taken from the [Creator Marketplace](../../production/publishing/creator-marketplace.md).

<img src="../../assets/studio/toolbox/Inventory-Tab.png" width="360" />

### Recent

The **Recent** tab is similar to [Inventory](#inventory) except that it is filtered by recently used [models](../../parts/models.md), [images](../../parts/textures-decals.md), [meshes](../../parts/meshes.md), [audio](../../sound/assets.md), [videos](../../ui/frames.md#videoframe), and [animations](../../animation/editor.md).

<img src="../../assets/studio/toolbox/Recent-Tab.png" width="360" />

### Creations

The **Creations** tab is similar to [Inventory](#inventory), with the important distinction that it is filtered by [models](../../parts/models.md), [images](../../parts/textures-decals.md), [meshes](../../parts/meshes.md), [audio](../../sound/assets.md), [plugins](../../studio/plugins.md), and [animations](../../animation/editor.md) that you've personally published or those which were published by [groups](../../projects/groups.md) you belong to. All assets in this section can be [configured](#asset-configuration-and-versioning) directly within Studio.

<img src="../../assets/studio/toolbox/Creations-Tab.png" width="360" />

## Sorting and Searching

### Asset Category

Within any of the toolbox [sections](#sections), you can sort assets by category. The options in the dropdown vary by section.

<img src="../../assets/studio/toolbox/Category-Sort.png" width="360" />

### Marketplace Sorting

Within the [Marketplace](#marketplace) section, you can:

- Filter search results by [verified creator](../../production/publishing/account-verification.md) status, a specific **Creator** username, and **Sound&nbsp;Length** for audio assets.

   <img src="../../assets/studio/toolbox/Marketplace-Advanced-Sort.png" width="360" />

- Sort **Models** by **category** or **trending** status.

   <img src="../../assets/studio/toolbox/Marketplace-Models-Categories.png" width="360" />

- Filter **Audio** by either **Sound Effect** or **Music**, and further refine your search by sound effect category or by music genre.

  <GridContainer numColumns="2">
    <figure>
      <img src="../../assets/studio/toolbox/Marketplace-Audio-Sound-Effects-Category.png" />
      <figcaption>Sound effects by category</figcaption>
    </figure>
    <figure>
      <img src="../../assets/studio/toolbox/Marketplace-Audio-Music-Genre.png" />
      <figcaption>Music tracks by genre</figcaption>
    </figure>
  </GridContainer>

## Asset Inspection

You can closely inspect a model, image, or mesh asset by hovering over its thumbnail and clicking the "magnify" icon.

<img src="../../assets/studio/toolbox/Asset-Inspect-Icon.png" width="182" />

### Preview

For 3D assets like meshes, you can move the virtual camera around to get a better view from all angles.

<video src="../../assets/studio/toolbox/3D-Asset-Preview.mp4" controls width="316"></video>

<table>
<thead>
  <tr>
    <th>Action</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Hold and drag <b>left</b> mouse button</td>
    <td>Rotate around the object.</td>
  </tr>
  <tr>
    <td>Hold and drag <b>right</b> mouse button</td>
    <td>Pan left, right, up, or down.</td>
  </tr>
  <tr>
    <td>Mouse scroll wheel</td>
    <td>Zoom in or out.</td>
  </tr>
</tbody>
</table>

### Composition

In the lower-right corner of the preview frame, the composition button reveals the full object hierarchy of the item including meshes, scripts, animations, and more.

<img src="../../assets/studio/toolbox/Preview-Panel-Hierarchy.png" width="316" />

### Info and Actions

Below the preview frame is additional info and context actions for the asset:

<img src="../../assets/studio/toolbox/Preview-Panel-Options.png" width="316" />

<Grid container spacing={2} alignItems="center">
	<Grid item><img src="../../assets/misc/Box-Label-A.png" width="40" /></Grid>
	<Grid item xs={10} sm={11} md={11} lg={11}><p>Mark the asset as one of your favorites.</p></Grid>
</Grid>
<Grid container spacing={2} alignItems="center">
	<Grid item><img src="../../assets/misc/Box-Label-B.png" width="40" /></Grid>
	<Grid item xs={10} sm={11} md={11} lg={11}><p>Vote on the asset.</p></Grid>
</Grid>
<Grid container spacing={2} alignItems="center">
	<Grid item><img src="../../assets/misc/Box-Label-C.png" width="40" /></Grid>
	<Grid item xs={10} sm={11} md={11} lg={11}><p>Copy the asset's ID, view it in your browser, or <a href="#asset-configuration">configure</a> it.</p></Grid>
</Grid>
<Grid container spacing={2} alignItems="center">
	<Grid item><img src="../../assets/misc/Box-Label-D.png" width="40" /></Grid>
	<Grid item xs={10} sm={11} md={11} lg={11}><p>Insert the asset into the current place.</p></Grid>
</Grid>

## Asset Configuration and Versioning

Right-clicking an asset and selecting **Edit Asset** opens the **Asset Configuration** window. In this window, you can edit the asset's details or restore it to a previous version.

<Alert severity="info">
  Asset configuration is only possible for assets you've personally published or those which were published by <a href="../../projects/groups.md">groups</a> you belong to. The <a href="#creations">Creations</a> tab is a useful way to filter assets by these criteria.
</Alert>
