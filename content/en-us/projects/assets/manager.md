---
title: Asset Manager
description: The Asset Manager lets you manage places and bulk import assets into your experience.
---

import BetaAlert from '../../includes/beta-features/beta-alert.md'

The **Asset Manager**, accessible from Studio's **Window** menu or **Home** tab, lets you manage [places](../../production/publishing/publish-experiences-and-places.md) and bulk import assets into your experience, including [images](../../parts/textures-decals.md), [meshes](../../parts/meshes.md), [packages](../../projects/assets/packages.md), [audio](../../audio/assets.md), and [models](../../parts/models.md).

## Current

<Alert severity="info">
The following sections outline the current Asset Manager. The [V2 Beta](#v2-beta) is documented below.
</Alert>

### Asset folders

Assets are organized within folders based on their type. You can switch between **grid view** and **list view** by clicking the view toggle button.

<img src="../../assets/studio/asset-manager/View-Toggle.png" width="460" alt="The Asset Manager window with the View toggle button highlighted." />

### Importing assets

The **bulk import** tool is ideal for importing up to 50 files in one batch. Imported assets enter the moderation queue and are only visible to you within their respective [folder](#asset-folders) and within the **Inventory** tab of the [Toolbox](../../projects/assets/toolbox.md).

<img src="../../assets/studio/asset-manager/Import-Button-V1.png" alt="The Asset Manager window with the Bulk Import button highlighted." width="360" />

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
    <td>You can import images in `.png`, `.jpg`, `.gif`, `.tga`, or `.bmp` format for use as [textures/decals](../../parts/textures-decals.md) on parts, [image labels](../../ui/labels.md), [mesh textures](../../parts/meshes.md#adding-textures), textures for [custom materials](../../parts/materials.md), textures for [special effects](../../environment/index.md#special-effects), and more.</td>
  </tr>
  <tr>
    <td>**Mesh**</td>
    <td>You can bulk import meshes in either `.fbx` or `.obj` format, although this workflow does not support complex meshes such as those with rigging, skinning, or animation data. For complex meshes, it's recommended that you use the [3D&nbsp;Importer](../../art/modeling/3d-importer.md).</td>
  </tr>
  <tr>
    <td>**Audio**</td>
    <td>You can import audio assets that you are certain you have permission to use in `.ogg`, `.mp3`, `.flac`, or `.wav` format. If you're uncertain whether you have permission to use an audio file, the [Creator Store](../../production/creator-store.md) has a variety of free-to-use audio, including more than 100,000 professionally-produced audio assets. See [Audio Assets](../../audio/assets.md) for details.</td>
  </tr>
</tbody>
</table>

### Insert assets

You can insert assets into the [Explorer](../../studio/explorer.md) window hierarchy by dragging-and-dropping or by right-clicking the asset name/tile and selecting **Insert**.

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
    <td>If hovering over a valid parent object like a `Class.BasePart`, creates a new `Class.Decal` inside that parent with its `Class.Decal.ColorMapContent|ColorMapContent` property preset to the asset ID.</td>
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

### Quick actions

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
    <td>Completely removes the place from the experience. Not applicable to the [starting place](../../production/publishing/publish-experiences-and-places.md#change-start-place).</td>
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
    <td>Renames the image alias in the **Asset Manager**.</td>
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
    <td>Removes the image from the **Asset Manager** but does not remove its instances from the experience.</td>
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
    <td>Renames the mesh alias in the **Asset Manager**.</td>
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
    <td>Removes the mesh from the **Asset Manager** but does not remove its instances from the experience.</td>
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
    <td>Renames the item alias in the **Asset Manager**.</td>
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
    <td>Removes the audio from the **Asset Manager** but does not remove its instances from the experience.</td>
  </tr>
</tbody>
</table>
</TabItem>
</Tabs>

### Asset inspection

You can closely inspect an image, mesh, package, or audio file by hovering over its thumbnail in [grid view](#asset-folders) and clicking the "magnify" icon, or by right-clicking its name in [list view](#asset-folders) and selecting **Asset&nbsp;Preview**.

<img src="../../assets/studio/asset-manager/Asset-Inspect-Icon.png" width="400" alt="A preview view of an asset in the Asset Manager. The Insect Asset icon is highlighted." />

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

<img src="../../assets/studio/general/Preview-Panel-Hierarchy.png" width="560" alt="A preview view of an asset in the Asset Manager, and the full hierarchy of the asset displays underneath the 3D representation. The Asset Composition icon is highlighted." />

## V2 Beta

<BetaAlert betaName="Revamped Asset Manager" leadIn="The revamped Asset Manager is currently in beta. Enable it through " leadOut="." components={props.components} />

### Inventory sorting

Assets are sorted by various **inventories** as selected through the collapsible menu on the left side of the window. If you don't see the sorting list, click the expand/collapse button in the lower‑left area of the window.

<img src="../../assets/studio/asset-manager/Inventory-Sorts.png" width="800" alt="A preview of how inventories are sorted in the left navigation of the Asset Manager." />

- **Shared With Experience** — Assets that are [shared with the open experience](../../projects/assets/privacy.md#to-experiences).
- **Places In Experience** — The experience's current [places](../../production/publishing/publish-experiences-and-places.md).
- **My Inventory** — Assets imported to your own user account, [shared with you](../../projects/assets/privacy.md#to-creators), or acquired from the [Creator Store](../../production/creator-store.md).
- **Group Inventories** — Assets imported into [groups](../../projects/groups.md) you own or groups you belong to (assuming you have sufficient [permissions](../../projects/groups.md#roles-and-permissions) within the group), or assets [shared with the groups](../../projects/assets/privacy.md#to-groups). Right‑clicking over a group reveals a context menu with the following options:

  <table size="small">
  <tbody>
  <tr>
    <td>**Hide Group**</td>
    <td>Hides the group from the sidebar.</td>
  </tr>
  <tr>
    <td>**Customize Groups**</td>
    <td>Allows you to choose the groups which appear in the sidebar and search filter options.</td>
  </tr>
  <tr>
    <td>**Refresh Groups**</td>
    <td>Refreshes the list of groups that you're eligible to show or hide.</td>
  </tr>
  </tbody>
  </table>

### Asset display options

In the main panel, assets for the selected [inventory](#inventory-sorting) are displayed. To toggle the view type, click on the **view&nbsp;type** button and select either **List** or **Grid**. While in grid view, asset tiles can be resized through the slider widget.

<img src="../../assets/studio/asset-manager/Display-Options.png" width="800" alt="Diagram of the view type button and options in the Asset Manager." />

In **List** view, click on a column header to order assets by that detail and resize columns by dragging the separator bar between them.

<img src="../../assets/studio/asset-manager/List-View-Ordering.png" width="800" alt="Diagram of how columns can be ordered and resized in List view within the Asset Manager." />

<Alert severity="info">
Columns can be toggled on or off by right‑clicking in the header bar region. While columns cannot be reordered by dragging, you can toggle any column off and then toggle it back on to add it as the furthest column to the right.
</Alert>

In **Grid** view, ordering is controlled through the **sort** button:

<img src="../../assets/studio/asset-manager/Grid-View-Ordering.png" width="600" alt="Location of the sort button for Grid view within the Asset Manager." />

### Asset type filters

The **filter items** button lets you control which assets are displayed.

<img src="../../assets/studio/asset-manager/Asset-Type-Filters.png" width="600" alt="Location of the filter button in the Asset Manager." />

<table size="small">
  <thead>
	<tr>
	  <th>Filter Type</th>
		<th>Options</th>
  </tr>
	</thead>
  <tbody>
  <tr>
    <td>**Asset Type**</td>
    <td>**Animation**&nbsp;| **Audio**&nbsp;| **Decal**&nbsp;| **FontFamily**&nbsp;| **Image**&nbsp;| **Mesh**&nbsp;| **MeshPart**&nbsp;| **Model**&nbsp;| **Place**&nbsp;| **Plugin**&nbsp;| **Video**</td>
  </tr>
  <tr>
    <td>**Creator**</td>
    <td></td>
  </tr>
  <tr>
    <td>**Source**</td>
    <td>**Creator Store**&nbsp;| **Shared With Me**&nbsp;| **Uploaded**</td>
  </tr>
	<tr>
    <td>**Is Package**</td>
    <td></td>
  </tr>
	<tr>
    <td>**Only&nbsp;Archived**</td>
    <td></td>
  </tr>
  </tbody>
</table>

### Asset import

The **import** button lets you import up to 50 files in one batch. Imported assets enter the moderation queue and, upon approval, are added to the inventory of the user/group that owns the experience.

<img src="../../assets/studio/asset-manager/Import-Button.png" width="600" alt="Location of the import button in the Asset Manager." />

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
    <td>You can import images in `.png`, `.jpg`, `.gif`, `.tga`, or `.bmp` format for use as [textures/decals](../../parts/textures-decals.md) on parts, [image&nbsp;labels](../../ui/labels.md), [mesh&nbsp;textures](../../parts/meshes.md#texture), textures for [custom&nbsp;materials](../../parts/materials.md#custom-materials), textures for [special&nbsp;effects](../../effects/index.md), and more.</td>
  </tr>
  <tr>
    <td>**Mesh**</td>
    <td>You can import meshes in either `.fbx` or `.obj` format, although this workflow does not support complex meshes such as those with rigging, skinning, or animation data. For complex meshes or `.gltf` format, it's recommended that you use the [3D&nbsp;Importer](../../art/modeling/3d-importer.md).</td>
  </tr>
  <tr>
    <td>**Audio**</td>
    <td>You can import audio assets in either `.ogg`, `.mp3`, `.flac`, or `.wav` format. See [Audio Assets](../../audio/assets.md#import-audio) for details.</td>
  </tr>
	<tr>
    <td>**Video**</td>
    <td>You can import video assets in either `.mp4` or `.mov` format if all of the [requirements](../../ui/video-frames.md) are met.</td>
  </tr>
  </tbody>
</table>

### Insert and quick actions

Quick actions are accessible by right‑clicking an asset name/tile and selecting an option from the context menu. Note that places offer unique actions versus other assets.

<Tabs>
<TabItem label="General">

<table>
  <thead>
	<tr>
	  <th>Action</th>
		<th>Description</th>
  </tr>
	</thead>
  <tbody>
  <tr>
    <td>**Insert**</td>
    <td>Lets you select from either **Insert&nbsp;at&nbsp;Camera** or **Insert&nbsp;at&nbsp;Asset&nbsp;Position** for spatial 3D assets (non‑spatial assets like audio are simply inserted into the `Class.Workspace` or the currently selected [Explorer](../../studio/explorer.md) instance). Does not appear for **FontFamily** or **Plugin** assets.</td>
  </tr>
  <tr>
    <td>**Edit Asset**</td>
    <td>Opens the asset configuration window to edit details such as the asset title, description, and more. Does not appear for **FontFamily** or **Plugin** assets.</td>
  </tr>
  <tr>
    <td>**Copy Asset ID**</td>
    <td>Copies the asset ID to the clipboard, convenient for pasting the ID into an object's property value such as `Class.AudioPlayer.AssetId` or `Class.MeshPart.MeshId`.</td>
  </tr>
	<tr>
    <td>**View&nbsp;in&nbsp;Browser**</td>
    <td>Opens your browser to the asset's page.</td>
  </tr>
	<tr>
    <td>**Install**&nbsp;/ **Update**&nbsp;/ **Report**</td>
    <td>Applicable only for **Plugin** assets. Installs, updates, or reports the plugin, respectively.</td>
  </tr>
  </tbody>
</table>

</TabItem>
<TabItem label="Places">

<table>
  <thead>
	<tr>
	  <th>Action</th>
		<th>Description</th>
  </tr>
	</thead>
  <tbody>
  <tr>
    <td>**Open**</td>
    <td>Opens the place in another Studio session if it's not the currently open place.</td>
  </tr>
  <tr>
    <td>**Rename**</td>
    <td>Lets you enter a new name for the place.</td>
  </tr>
  <tr>
    <td>**View History**</td>
    <td>Opens the place version history, letting you view previous commits (publish actions) and their date/time. If desired, you can roll back to a previous version by selecting it and clicking the **Open** button.</td>
  </tr>
	<tr>
    <td>**Remove&nbsp;From Experience**</td>
    <td>Completely removes the place from the experience. Not applicable to the [starting place](../../production/publishing/publish-experiences-and-places.md#change-start-place).</td>
  </tr>
	<tr>
    <td>**Copy Asset ID**</td>
    <td>Copies the place's `Class.DataModel.PlaceId|PlaceId` to the clipboard.</td>
  </tr>
	<tr>
    <td>**View&nbsp;in&nbsp;Browser**</td>
    <td>Opens your browser to the place's page.</td>
  </tr>
  </tbody>
</table>

</TabItem>
</Tabs>

### Search query language

Use search query language to refine how you find assets in your Asset Manager inventory. You can combine keywords, operators, and tags to filter, prioritize, or exclude results.

When combining multiple features, search terms are processed in the following order (highest to lowest priority): Exact search → Excluded terms → Optional terms → Asset ID tag → Created before → Created after → Updated before → Updated after → Numeric asset ID → Audio type.

<h5 style={{marginTop: '36px'}}>Query syntax</h5>

Use the following syntax to control how search terms are interpreted:

<table>
  <thead>
	<tr>
	  <th>Feature</th>
		<th>Syntax</th>
    <th>Description</th>
    <th>Example</th>
  </tr>
	</thead>
  <tbody>
  <tr>
    <td>Exact phrase</td>
    <td>`"exact phrase"`</td>
    <td>Matches the phrase exactly.</td>
    <td>`"explosion sound"`</td>
  </tr>
  <tr>
    <td>Exclude term</td>
    <td>`-term` or `exclude:term`</td>
    <td>Removes results containing the term. You can use multiple `-` prefixes in one query to exclude more than one term.</td>
    <td>`sword -rusty`</td>
  </tr>
  <tr>
    <td>Optional term</td>
    <td>`term!` or `optional:term`</td>
    <td>Boosts results but doesn't require the term.</td>
    <td>`sword glowing!`</td>
  </tr>
	<tr>
    <td>Asset ID</td>
    <td>`1234567890` or `asset_id:123456`</td>
    <td>Pins matching assets to the top of the search results.</td>
    <td>`asset_id:123456`</td>
  </tr>
	<tr>
    <td>Date filter</td>
    <td>`created_after:YYYY-MM-DD`</td>
    <td>Filters by creation or update date.</td>
    <td>`created_after:2024-01-01`</td>
  </tr>
	<tr>
    <td>Audio type</td>
    <td>`music`, `sfx`, `sound effects`</td>
    <td>Filters audio assets by type. You must append the audio type at the **end** of your query.</td>
    <td>`explosion sfx`</td>
  </tr>
  </tbody>
</table>

<h5 style={{marginTop: '36px'}}>Tags</h5>

Tags modify how search works, but aren't treated like search terms themselves. They only filter or rank your results. If a tag has a typo or an invalid date, it's treated as a regular search term instead.

Tags can use the formats `tag:value` or `tag=value`, and are not case-sensitive.

<table>
  <thead>
	<tr>
	  <th>Tag</th>
		<th>Alternative syntax</th>
    <th>Description</th>
    <th>Example</th>
  </tr>
	</thead>
  <tbody>
  <tr>
    <td>`exclude`</td>
    <td>`excluded`</td>
    <td>Excludes one or more terms.</td>
    <td>`exclude:rusty`</td>
  </tr>
  <tr>
    <td>`optional`</td>
    <td>N/A</td>
    <td>Marks terms as optional.</td>
    <td>`optional:glowing`</td>
  </tr>
  <tr>
    <td>`asset_id`</td>
    <td>`assetId`</td>
    <td>Pins assets by ID.</td>
    <td>`asset_id:123456`</td>
  </tr>
	<tr>
    <td>`created_before`</td>
    <td>`createdBefore`</td>
    <td>Created on or before the specified date.</td>
    <td>`created_before:2024-01-01`</td>
  </tr>
	<tr>
    <td>`created_after`</td>
    <td>`createdAfter`</td>
    <td>Created after the specified date.</td>
    <td>`created_after:2024-01-01`</td>
  </tr>
	<tr>
    <td>`updated_before`</td>
    <td>`updatedBefore`</td>
    <td>Updated on or before the specified date.</td>
    <td>`updated_before:2024-01-01`</td>
  </tr>
	<tr>
    <td>`updated_after`</td>
    <td>`updatedAfter`</td>
    <td>Updated after the specified date.</td>
    <td>`updated_after:2024-01-01`</td>
  </tr>
  </tbody>
</table>

<Alert severity="info">
Some tags accept multiple values when you use brackets. For example, `exclude:[rusty, broken]` and `asset_id[123, 456]`.
</Alert>

<h5 style={{marginTop: '36px'}}>Date formats</h5>

Date filters support multiple formats. Make sure to:

- Wrap dates in brackets if they have spaces (for example, `[March 10, 2026]`)
- Use the US format `MM/DD/YYYY`
- **Not** use natural language (for example, `yesterday` or `last week`)

<table>
  <thead>
	<tr>
	  <th>Format</th>
		<th>Example</th>
  </tr>
	</thead>
  <tbody>
  <tr>
    <td>ISO 8601</td>
    <td>`2026-03-10`</td>
  </tr>
  <tr>
    <td>ISO with time</td>
    <td>`2026-03-10T14:30:00Z`</td>
  </tr>
  <tr>
    <td>US format</td>
    <td>`03/10/2026`</td>
  </tr>
  <tr>
    <td>Long form (requires brackets)</td>
    <td>`[March 10, 2026]`</td>
  </tr>
  <tr>
    <td>With time</td>
    <td>`[03/10/2026 2:30 PM]`</td>
  </tr>
  </tbody>
</table>

<h5 style={{marginTop: '36px'}}>Example queries</h5>

- `"wooden crate" asset_id:99887766 created_after:2023-06-01 -damaged optional:painted`: Exactly matches "wooden crate", pins a specific asset by ID, filters by date, excludes "damaged", and ranks "painted" results higher.

- `explosion sfx -loop created_before:[December 31, 2023]`: Filters sound effects named "explosion", excludes looping variants, and limits the results by date.

- `125447393891114 sword glowing! -rusty`: Pins a specific asset by ID, searches for "sword", boosts "glowing", and excludes "rusty".
