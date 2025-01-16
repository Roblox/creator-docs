---
title: Toolbox
description: The Toolbox contains a selection of assets made by Roblox or Roblox community members.
id: toolbox
---

The **Toolbox** contains a selection of [models](../../parts/models.md), [images](../../parts/textures-decals.md), [meshes](../../parts/meshes.md), [audio](../../sound/assets.md), [plugins](../../studio/plugins.md), [videos](../../ui/frames.md#videoframe), and fonts made by Roblox or Roblox community members. It also includes all of the creations that you've personally published or those which were published by [groups](../../projects/groups.md) you belong to.

<img src="../../assets/studio/general/View-Tab-Toolbox.png" width="776" alt="Studio's View tab with the Toolbox button highlighted." />

## Sections

The Toolbox contains four distinct sections: Creator Store, Inventory, Recent, and Creations.

### Creator Store

The **Creator Store** section contains models, images, meshes, audio, plugins, videos, and fonts made by Roblox or Roblox community members.

<img src="../../assets/studio/toolbox/Creator-Store-Tab.png" width="360" alt="A close up view of the Toolbox with the Creator Store tab highlighted." />

<Alert severity="warning">
Take caution when inserting models that you didn't create into your experiences, as they may contain malicious scripts that can impact performance or behavior. It's recommended to always [inspect assets](#asset-inspection) and investigate any embedded scripts before bringing them into your place file.
</Alert>

### Inventory

The **Inventory** section contains models, images, meshes, audio, packages, videos, plugins, animations, and fonts that you've personally published, those which were published by [groups](../../projects/groups.md) you belong to, or those taken from the [Creator Store](../../production/creator-store.md).

<img src="../../assets/studio/toolbox/Inventory-Tab.png" width="360" alt="A close up view of the Toolbox with the Inventory tab highlighted." />

### Recent

The **Recent** tab is similar to [Inventory](#inventory) except that filters your recently used models, images, meshes, audio, videos, and animations.

<img src="../../assets/studio/toolbox/Recent-Tab.png" width="360" alt="A close up view of the Toolbox with the Recent tab highlighted." />

### Creations

The **Creations** tab is similar to [Inventory](#inventory), with the important distinction that it filters models, images, meshes, audio, plugins, and animations that you've personally published or those which were published by [groups](../../projects/groups.md) you belong to. You can [configure](#asset-configuration-and-versioning) all assets in this section directly within Studio.

<img src="../../assets/studio/toolbox/Creations-Tab.png" alt="A close up view of the Toolbox with the Creations tab highlighted." width="360" />

## Sort and search

<Tabs>
<TabItem label="Asset category">
Within any of the Toolbox sections, use the **category selector** dropdown to sort assets by category. The options in the dropdown vary by section.

<img src="../../assets/studio/toolbox/Creator-Store-Category-Selector.png" width="360" height="284" alt="The Toolbox window with the Category Selector highlighted" />

</TabItem>
<TabItem label="Creator Store sorting">

Within the [Creator Store](#creator-store) section, click the **advanced filter** button to limit results to [verified creator](../../production/publishing/account-verification.md) status, filter assets by a specific creator, triangle count, visual style, included objects, physically based rendering, holiday theme, and filter by sound length for [audio assets](../../sound/assets.md).

- Triangle count: The sum of the triangle count of all 3D objects in a model, bucketed from ultra high to ultra low. Higher triangle counts aren't necessarily good or bad; they can indicate high fidelity or poor optimization.
- Contains: Use this filter to find models that include at least one of the selected objects.
- Visual style: This filter helps you find models with specific styles, such as anime or realistic, based on their appearances.
- Physically-based rendering: Search for models that feature [physically-based rendering](../../art/modeling/surface-appearance.md).
- Holidays: Similar to the visual style filter, this option helps you find models with holiday themes.

<img src="../../assets/studio/toolbox/Creator-Store-Advanced-Filter.png" width="580" height="110" alt="The Toolbox window with the Advanced Filter highlighted" />
</TabItem>
</Tabs>

## Asset inspection

You can closely inspect a model, image, mesh, plugin, video, or font asset by hovering over its thumbnail and clicking the magnifying glass icon.

<img src="../../assets/studio/toolbox/Asset-Inspect-Icon.png" width="400" alt="A preview view of an asset in the Asset Manager. The Insect Asset icon is highlighted." />

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

<img src="../../assets/studio/general/Preview-Panel-Hierarchy.png" width="560" alt="A preview view of an asset in the Asset Manager, and the full hierarchy of the asset displays underneath the 3D representation. The Asset Composition icon is highlighted." />

## Asset configuration and versioning

Right-clicking an asset and selecting **Edit Asset** opens the **Asset Configuration** window. In this window, you can edit the asset's details or restore it to a previous version.

<Alert severity="warning">
Asset configuration is only possible for assets you've personally published or those which were published by [groups](../../projects/groups.md) you belong to. The [Creations](#creations) tab is particularly useful for filtering assets in this way.
</Alert>
