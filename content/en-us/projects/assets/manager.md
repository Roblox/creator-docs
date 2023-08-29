---
title: Asset Manager
description: The Asset Manager lets you manage places and bulk inport assets into your experience.
---

The **Asset Manager** lets you manage [places](../../production/publishing/publishing-experiences-and-places.md) and bulk import assets into your experience, including [images](../../parts/textures-decals.md), [meshes](../../parts/meshes.md), [packages](../../projects/assets/packages.md), [audio](../../sound/assets.md), and [models](../../parts/models.md).

<img src="../../assets/studio/general/View-Tab-Asset-Manager.png" width="876" alt="Asset Manager toggle button in Studio" />

## Asset Folders

Assets are organized within folders based on their type. You can switch between **grid view** and **list view** by clicking the view toggle button.

<img src="../../assets/studio/asset-manager/View-Toggle.png" width="360" />

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/studio/asset-manager/Grid-View.png" />
    <figcaption>Folders in "grid" view</figcaption>
  </figure>
  <figure>
    <img src="../../assets/studio/asset-manager/List-View.png" />
    <figcaption>Folders in "list" view</figcaption>
  </figure>
</GridContainer>

## Importing Assets

The **bulk import** tool is ideal for importing up to 50 files in one batch.

<img src="../../assets/studio/asset-manager/Import-Button.png" width="360" />

Imported assets enter the moderation queue and are only visible to you within their respective [folder](#asset-folders) and within the **Creations** tab of the [Toolbox](../../projects/assets/toolbox.md#creations). Assets pending moderation display a yellow clock icon, while assets that fail moderation display a red exclamation icon.

<figure>
  <img src="../../assets/studio/asset-manager/Moderation-Icons.png" width="360" />
  <figcaption>Pending (left) &nbsp;&middot;&nbsp; Failed (right)</figcaption>
</figure>

### Images

You can import images in `.png`, `.jpg`, `.tga`, or `.bmp` format for use as [textures/decals](../../parts/textures-decals.md) on parts, [UI](../../ui/index.md) elements, [mesh textures](../../parts/meshes.md#adding-textures), textures for [custom materials](../../parts/materials.md), textures for [special effects](../../environment/index.md#special-effects), and more.

### Meshes

You can bulk import meshes in either `.fbx` or `.obj` format, although this workflow does not support complex meshes such as those with rigging, skinning, or animation data. For complex meshes, it's recommended that you use the [3D&nbsp;Importer](../../art/modeling/3d-importer.md), located in the [Home](../../studio/home-tab.md) tab.

<img src="../../assets/studio/general/Home-Tab-Import-3D.png" width="715" />

### Audio

You can import audio assets that you are certain you have permission to use in either `.mp3` or `.ogg` format. If you're uncertain whether you have permission to use an audio file, the [Creator Marketplace](../../production/publishing/creator-marketplace.md) has a variety of free-to-use audio, including more than 100,000 professionally-produced sound effects. See [Audio Assets](../../sound/assets.md) for details.

## Filtering Assets

The top bar contains an input field that lets you filter assets in the current folder. When you type in a filter query, the view updates to show matching assets.

<img src="../../assets/studio/asset-manager/Assets-Filtered.png" width="360" />

## Inserting Assets

You can insert assets into the 3D view by dragging-and-dropping or by right-clicking the asset name/tile and selecting **Insert**.

## Quick Actions

Quick actions are accessible by right-clicking an asset thumbnail and selecting a context option.

<img src="../../assets/modeling/meshes/Asset-Manager-Mesh-Options.png" width="360" />

### Places

<table>
<thead>
  <tr>
    <th>Quick Action</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><b>Rename</b></td>
    <td>Lets you enter a new name for the place.</td>
  </tr>
  <tr>
    <td><b>Copy&nbsp;ID&nbsp;to&nbsp;Clipboard</b></td>
    <td>Copies the place ID to the clipboard.</td>
  </tr>
  <tr>
    <td><b>View History</b></td>
    <td>Opens the place version history, letting you view previous commits (publish actions) and their date/time. If desired, you can roll back to a previous version by selecting it and clicking the <b>Open</b> button.</td>
  </tr>
  <tr>
    <td><b>Remove From Game</b></td>
    <td>Completely removes the place from the experience. Not applicable to the [starting place](../../production/publishing/publishing-experiences-and-places.md#publishing-a-starting-place).</td>
  </tr>
</tbody>
</table>

### Images

<table>
<thead>
  <tr>
    <th>Quick Action</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><b>Edit Asset</b></td>
    <td>Lets you edit general details such as the image title and description.</td>
  </tr>
  <tr>
    <td><b>Rename Alias</b></td>
    <td>Renames the image alias in the Asset Manager.</td>
  </tr>
  <tr>
    <td><b>Insert</b></td>
    <td>Inserts the image into the selected instance (or the workspace).</td>
  </tr>
  <tr>
    <td><b>Copy&nbsp;ID&nbsp;to&nbsp;Clipboard</b></td>
    <td>Copies the image ID to the clipboard.</td>
  </tr>
  <tr>
    <td><b>Remove From Game</b></td>
    <td>Removes the image from the Asset Manager but does not remove its instances from the experience.</td>
  </tr>
</tbody>
</table>

### Meshes

<table>
<thead>
  <tr>
    <th>Quick Action</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><b>Edit Asset</b></td>
    <td>Lets you edit general details such as the mesh title and description.</td>
  </tr>
  <tr>
    <td><b>Rename Alias</b></td>
    <td>Renames the mesh alias in the Asset Manager.</td>
  </tr>
  <tr>
    <td><b>Insert</b></td>
    <td>Inserts the mesh into the workspace.</td>
  </tr>
  <tr>
    <td><b>Insert With Location</b></td>
    <td>Inserts the mesh into the workspace, retaining location data stored during the mesh import process.</td>
  </tr>
  <tr>
    <td><b>Copy ID to Clipboard</b></td>
    <td>Copies the mesh ID to the clipboard.</td>
  </tr>
  <tr>
    <td><b>Copy&nbsp;Mesh&nbsp;ID&nbsp;to&nbsp;Clipboard</b></td>
    <td>Copies the mesh `Class.MeshPart.TextureID` to the clipboard.</td>
  </tr>
  <tr>
    <td><b>Remove From Game</b></td>
    <td>Removes the mesh from the Asset Manager but does not remove its instances from the experience.</td>
  </tr>
</tbody>
</table>

### Packages

<table>
<thead>
  <tr>
    <th>Quick Action</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><b>Insert</b></td>
    <td>Inserts a copy of the package into the workspace.</td>
  </tr>
  <tr>
    <td><b>View on Website</b></td>
    <td>Opens up your browser to the package asset page.</td>
  </tr>
  <tr>
    <td><b>Copy&nbsp;ID&nbsp;to&nbsp;Clipboard</b></td>
    <td>Copies the package ID to the clipboard.</td>
  </tr>
  <tr>
    <td><b>Package Details</b></td>
    <td>Lets you manage basic package details, access permissions, and package versions.</td>
  </tr>
</tbody>
</table>

### Audio

<table>
<thead>
  <tr>
    <th>Quick Action</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><b>Edit Asset</b></td>
    <td>Lets you edit general details such as the audio title and description.</td>
  </tr>
  <tr>
    <td><b>Rename Alias</b></td>
    <td>Renames the item alias in the Asset Manager.</td>
  </tr>
  <tr>
    <td><b>Insert</b></td>
    <td>Inserts the audio as a `Class.Sound` object into the selected instance (or the workspace).</td>
  </tr>
  <tr>
    <td><b>Copy&nbsp;ID&nbsp;to&nbsp;Clipboard</b></td>
    <td>Copies the audio file ID to the clipboard.</td>
  </tr>
  <tr>
    <td><b>Remove From Game</b></td>
    <td>Removes the audio from the Asset Manager but does not remove its instances from the experience.</td>
  </tr>
</tbody>
</table>

## Asset Inspection

You can closely inspect an image, mesh, package, or audio file by hovering over its grid view thumbnail and clicking the "magnify" icon, or by right-clicking its list view name and selecting **Asset&nbsp;Preview**.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/studio/asset-manager/Asset-Inspect-Grid.png" />
    <figcaption>Click icon in "grid" view</figcaption>
  </figure>
  <figure>
    <img src="../../assets/studio/asset-manager/Asset-Inspect-List.png" />
    <figcaption>Right-click asset in "list" view</figcaption>
  </figure>
</GridContainer>

### Preview

For 3D assets like meshes, you can move the virtual camera around to get a better view from all angles.

<video src="../../assets/studio/toolbox/3D-Asset-Preview.mp4" controls width="40%"></video>

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

**A** &ndash; Mark the asset as one of your favorites.

**B** &ndash; Vote on the asset.

**C** &ndash; Copy the asset's ID, view it in your browser, or configure it.

**D** &ndash; Insert the asset into the current place.
