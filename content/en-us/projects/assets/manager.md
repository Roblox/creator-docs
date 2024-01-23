---
title: Asset Manager
description: The Asset Manager lets you manage places and bulk import assets into your experience.
---

The **Asset Manager** lets you manage [places](../../production/publishing/publishing-experiences-and-places.md) and bulk import assets into your experience, including [images](../../parts/textures-decals.md), [meshes](../../parts/meshes.md), [packages](../../projects/assets/packages.md), [audio](../../sound/assets.md), and [models](../../parts/models.md).

<img src="../../assets/studio/general/View-Tab-Asset-Manager.png" width="776" alt="Asset Manager toggle button in Studio" />

## Asset Folders

Assets are organized within folders based on their type. You can switch between **grid view** and **list view** by clicking the view toggle button.

<img src="../../assets/studio/asset-manager/View-Toggle.png" width="460" alt="Toggle button for grid and list view indicated in Asset Manager" />

## Importing Assets

The **bulk import** tool is ideal for importing up to 50 files in one batch. Imported assets enter the moderation queue and are only visible to you within their respective [folder](#asset-folders) and within the **Inventory** tab of the [Toolbox](../../projects/assets/toolbox.md).

<img src="../../assets/studio/asset-manager/Import-Button.png" width="360" />

<table>
<thead>
  <tr>
    <th>Asset&nbsp;Type</th>
    <th>Details</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Image**</td>
    <td>You can import images in `.png`, `.jpg`, `.tga`, or `.bmp` format for use as [textures/decals](../../parts/textures-decals.md) on parts, [UI](../../ui/index.md) elements, [mesh textures](../../parts/meshes.md#adding-textures), textures for [custom materials](../../parts/materials.md), textures for [special effects](../../environment/index.md#special-effects), and more.</td>
  </tr>
  <tr>
    <td>**Mesh**</td>
    <td>You can bulk import meshes in either `.fbx` or `.obj` format, although this workflow does not support complex meshes such as those with rigging, skinning, or animation data. For complex meshes, it's recommended that you use the [3D&nbsp;Importer](../../art/modeling/3d-importer.md).</td>
  </tr>
  <tr>
    <td>**Audio**</td>
    <td>You can import audio assets that you are certain you have permission to use in either `.mp3` or `.ogg` format. If you're uncertain whether you have permission to use an audio file, the [Creator Store](../../production/publishing/creator-store.md) has a variety of free-to-use audio, including more than 100,000 professionally-produced sound effects. See [Audio Assets](../../sound/assets.md) for details.</td>
  </tr>
</tbody>
</table>

## Inserting Assets

You can insert assets into the [Explorer](../../studio/explorer.md) hierarchy by dragging-and-dropping or by right-clicking the asset name/tile and selecting **Insert**.

Behavior of dragging-and-dropping into the 3D viewport varies by asset type:

<table>
<thead>
  <tr>
    <th>Asset&nbsp;Type</th>
    <th>Drag-and-Drop Behavior</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Image**</td>
    <td>If hovering over a valid parent object like a `Class.BasePart`, creates a new `Class.Decal` inside that parent with its `Class.Decal.Texture|Texture` property preset to the asset ID.</td>
  </tr>
  <tr>
    <td>**Mesh**</td>
    <td>Inserts the asset as a new `Class.MeshPart` in the workspace with its `Class.MeshPart.MeshId|MeshId` property preset to the asset ID.</td>
  </tr>
  <tr>
    <td>**Audio**</td>
    <td>Creates a new `Class.Sound` object in the workspace with its `Class.Sound.SoundId|SoundId` property preset to the asset ID.</td>
  </tr>
	<tr>
    <td>**Package**</td>
    <td>Inserts a copy of the package into the workspace.</td>
  </tr>
</tbody>
</table>

## Quick Actions

Quick actions are accessible by right-clicking an asset name/tile and selecting a context option.

<Tabs>
<TabItem label="Places">
<table>
<thead>
  <tr>
    <th>Quick Action</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Rename**</td>
    <td>Lets you enter a new name for the place.</td>
  </tr>
  <tr>
    <td>**Copy&nbsp;ID&nbsp;to&nbsp;Clipboard**</td>
    <td>Copies the place ID to the clipboard.</td>
  </tr>
  <tr>
    <td>**View History**</td>
    <td>Opens the place version history, letting you view previous commits (publish actions) and their date/time. If desired, you can roll back to a previous version by selecting it and clicking the <b>Open</b> button.</td>
  </tr>
  <tr>
    <td>**Remove From Game**</td>
    <td>Completely removes the place from the experience. Not applicable to the [starting place](../../production/publishing/publishing-experiences-and-places.md#publishing-a-starting-place).</td>
  </tr>
</tbody>
</table>
</TabItem>
<TabItem label="Images">
<table>
<thead>
  <tr>
    <th>Quick Action</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Edit Asset**</td>
    <td>Lets you edit general details such as the image title and description.</td>
  </tr>
  <tr>
    <td>**Rename Alias**</td>
    <td>Renames the image alias in the Asset Manager.</td>
  </tr>
  <tr>
    <td>**Insert**</td>
    <td>Inserts the image into the selected instance (or the workspace).</td>
  </tr>
  <tr>
    <td>**Copy&nbsp;ID&nbsp;to&nbsp;Clipboard**</td>
    <td>Copies the image ID to the clipboard.</td>
  </tr>
  <tr>
    <td>**Remove From Game**</td>
    <td>Removes the image from the Asset Manager but does not remove its instances from the experience.</td>
  </tr>
</tbody>
</table>
</TabItem>
<TabItem label="Meshes">
<table>
<thead>
  <tr>
    <th>Quick Action</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Edit Asset**</td>
    <td>Lets you edit general details such as the mesh title and description.</td>
  </tr>
  <tr>
    <td>**Rename Alias**</td>
    <td>Renames the mesh alias in the Asset Manager.</td>
  </tr>
  <tr>
    <td>**Insert**</td>
    <td>Inserts the mesh into the workspace.</td>
  </tr>
  <tr>
    <td>**Insert With Location**</td>
    <td>Inserts the mesh into the workspace, retaining location data stored during the mesh import process.</td>
  </tr>
  <tr>
    <td>**Copy ID to Clipboard**</td>
    <td>Copies the mesh ID to the clipboard.</td>
  </tr>
  <tr>
    <td>**Copy&nbsp;Mesh&nbsp;ID&nbsp;to&nbsp;Clipboard**</td>
    <td>Copies the mesh `Class.MeshPart.TextureID` to the clipboard.</td>
  </tr>
  <tr>
    <td>**Remove From Game**</td>
    <td>Removes the mesh from the Asset Manager but does not remove its instances from the experience.</td>
  </tr>
</tbody>
</table>
</TabItem>
<TabItem label="Packages">
<table>
<thead>
  <tr>
    <th>Quick Action</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Insert**</td>
    <td>Inserts a copy of the package into the workspace.</td>
  </tr>
  <tr>
    <td>**View on Website**</td>
    <td>Opens up your browser to the package asset page.</td>
  </tr>
  <tr>
    <td>**Copy&nbsp;ID&nbsp;to&nbsp;Clipboard**</td>
    <td>Copies the package ID to the clipboard.</td>
  </tr>
  <tr>
    <td>**Package Details**</td>
    <td>Lets you manage basic package details, access permissions, and package versions.</td>
  </tr>
</tbody>
</table>
</TabItem>
<TabItem label="Audio">
<table>
<thead>
  <tr>
    <th>Quick Action</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Edit Asset**</td>
    <td>Lets you edit general details such as the audio title and description.</td>
  </tr>
  <tr>
    <td>**Rename Alias**</td>
    <td>Renames the item alias in the Asset Manager.</td>
  </tr>
  <tr>
    <td>**Insert**</td>
    <td>Inserts the audio as a `Class.Sound` object into the selected instance (or the workspace).</td>
  </tr>
  <tr>
    <td>**Copy&nbsp;ID&nbsp;to&nbsp;Clipboard**</td>
    <td>Copies the audio file ID to the clipboard.</td>
  </tr>
  <tr>
    <td>**Remove From Game**</td>
    <td>Removes the audio from the Asset Manager but does not remove its instances from the experience.</td>
  </tr>
</tbody>
</table>
</TabItem>
</Tabs>

## Asset Inspection

You can closely inspect an image, mesh, package, or audio file by hovering over its thumbnail in [grid view](#asset-folders) and clicking the "magnify" icon, or by right-clicking its name in [list view](#asset-folders) and selecting **Asset&nbsp;Preview**.

<img src="../../assets/studio/asset-manager/Asset-Inspect-Icon.png" width="400" alt="Asset inspection button indicated for an asset in the Asset Manager" />

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

In the lower-right corner of the preview frame, the **composition** button reveals the full hierarchy of the asset including `Class.Script|Scripts`, `Class.MeshPart|MeshParts`, `Class.Animation|Animations`, and more.

<img src="../../assets/studio/general/Preview-Panel-Hierarchy.png" width="560" alt="Asset composition hierarchy shown below the preview of an asset" />
