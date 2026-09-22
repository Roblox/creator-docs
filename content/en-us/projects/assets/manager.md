---
title: Asset Manager
description: The Asset Manager lets you manage places and bulk import assets into your game.
---

The **Asset Manager**, accessible from Studio's **Window** menu or **Home** tab, lets you manage [places](../../production/publishing/publish-games-and-places.md) and bulk import assets into your game, including [images](../../parts/textures-decals.md), [meshes](../../parts/meshes.md), [packages](../../projects/assets/packages.md), [audio](../../audio/assets.md), and [models](../../parts/models.md).

## Inventory sorting

Assets are sorted by various **inventories** as selected through the collapsible menu on the left side of the window. If you don't see the sorting list, click the expand/collapse button in the lower‑left area of the window.

<img src="../../assets/studio/asset-manager/Inventory-Sorts.png" width="800" alt="A preview of how inventories are sorted in the left navigation of the Asset Manager." />

- **\<Experience Name>** — The open game's inventory, displayed by its name, with assets [shared with the game](../../projects/assets/privacy.md#to-games) listed under **Project**.
- **Places In Experience** — The game's [places](../../production/publishing/publish-games-and-places.md).
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

## Folders

Folders let you organize assets and other folders into a hierarchy within an inventory. You can create folders inside **My&nbsp;Inventory**, inside **Group&nbsp;Inventories** that support folder operations, and inside an open game's inventory under **Project**.

Folders have the following limits:

- Up to **50,000 folders** per account or root inventory.
- Up to **100 child folders** in any single folder or root inventory.
- Up to **20,000 assets** per folder.
- Up to **20 levels** of folder nesting.

<Alert severity="info">
The first time folders are initialized for an account, a brief setup period may apply. If folder operations aren't yet available, the sidebar shows a warning icon next to the affected account; click it to refresh readiness. Setup typically completes within a few minutes.
</Alert>

### Create, rename, and delete

Right-click in the sidebar or main view to access folder actions.

<table size="small">
<thead>
  <tr>
    <th>Action</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Create Folder**</td>
    <td>Creates a new empty folder in the current location. A new entry appears with an inline name field; type a name and press <kbd>Enter</kbd> to confirm or <kbd>Esc</kbd> to cancel.</td>
  </tr>
  <tr>
    <td>**Group&nbsp;Selection&nbsp;as&nbsp;Folder**</td>
    <td>Available when one or more assets are selected. Creates a new folder and moves the selected assets into it.</td>
  </tr>
  <tr>
    <td>**Rename**</td>
    <td>Replaces the folder's name with an inline editable field pre-filled with the current name. Press <kbd>Esc</kbd> to cancel without committing changes.</td>
  </tr>
  <tr>
    <td>**Delete&nbsp;Folder**</td>
    <td>Removes the folder. Folders must be empty before they can be deleted; move or delete the contents first. When multiple empty folders are selected, the menu shows **Delete&nbsp;Folders**.</td>
  </tr>
</tbody>
</table>

Folder names cannot contain `\`, `/`, `:`, `*`, `?`, `"`, `<`, `>`, or `|`, and cannot end with a period. Names beginning with a period (for example, `.hidden`) are allowed.

### Navigate

You can navigate the folder hierarchy from either panel:

- **Sidebar** — Use the expand arrow to reveal subfolders, or single-click a folder to open it.
- **Main view** — Double-click a folder to drill into it. Click the parent entry in the sidebar, or use the back arrow, to return.

### Move items

You can move both assets and folders, but only within the same inventory. Cross-inventory moves (for example, from **My&nbsp;Inventory** into a **group** inventory) aren't supported.

<table size="small">
<thead>
  <tr>
    <th>Method</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Drag and drop**</td>
    <td>Drag selected items onto a destination folder in either the main view or the sidebar tree. Valid drop targets highlight while you hover.</td>
  </tr>
  <tr>
    <td>**Move&nbsp;dialog**</td>
    <td>Right-click a selection and choose **Move** to open a folder picker. Use the drill-in arrow or double-click to enter a folder, **Back** to go up a level, then select a destination and click **Move**. **Refresh** re-fetches the folder list from the server.</td>
  </tr>
</tbody>
</table>

You can move multiple items at once. Moving a folder into itself or into one of its own descendants is blocked, and invalid destinations are not highlighted as drop targets or are grayed out in the **Move** dialog.

### Search and folders

When you type a search query, results include a separate **Folders** section listing matching folders alongside asset results. Double-click a folder result to exit search mode and navigate into that folder.

<Alert severity="info">
Drag-and-drop and the **Move** dialog are disabled while viewing search results. Navigate to a folder or inventory first, then reorganize.
</Alert>

### Unsupported scopes

Folder operations aren't available in the following views:

- **Places&nbsp;In&nbsp;Experience** — Places can't be organized into folders.
- **Recent&nbsp;Uploads** — Read-only for organizational purposes.

## Asset display options

In the main panel, assets for the selected [inventory](#inventory-sorting) are displayed. To toggle the view type, click on the **view&nbsp;type** button and select either **List** or **Grid**. While in grid view, asset tiles can be resized through the slider widget.

<img src="../../assets/studio/asset-manager/Display-Options.png" width="800" alt="Diagram of the view type button and options in the Asset Manager." />

In **List** view, click on a column header to order assets by that detail and resize columns by dragging the separator bar between them.

<img src="../../assets/studio/asset-manager/List-View-Ordering.png" width="800" alt="Diagram of how columns can be ordered and resized in List view within the Asset Manager." />

<Alert severity="info">
Columns can be toggled on or off by right‑clicking in the header bar region. While columns cannot be reordered by dragging, you can toggle any column off and then toggle it back on to add it as the furthest column to the right.
</Alert>

In **Grid** view, ordering is controlled through the **sort** button:

<img src="../../assets/studio/asset-manager/Grid-View-Ordering.png" width="600" alt="Location of the sort button for Grid view within the Asset Manager." />

## Asset type filters

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

## Asset import

The **asset import** button lets you import one or more assets of any asset type. Imported assets enter the moderation queue and, upon approval, are added to the inventory of the user/group that owns the game.

<img src="../../assets/studio/asset-manager/Import-Button.png" width="600" alt="Location of the import button in the Asset Manager." />

For more information on supported file types and other features, see [Importer](../../studio/importer.md).

## Insert and quick actions

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
    <td>**Move**</td>
    <td>Opens the [Move dialog](#move-items) to relocate the asset into a folder within the same inventory. Disabled while viewing search results.</td>
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
    <td>Completely removes the place from the game. Not applicable to the [starting place](../../production/publishing/publish-games-and-places.md#change-start-place).</td>
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

## Search query language

Use the search query language to refine how you find assets in your Asset Manager inventory. You can combine keywords, operators, and tags to filter, prioritize, or exclude results.

<Alert severity="info">
When combining multiple features, search terms are processed in the following order (highest to lowest priority): Exact search → Excluded terms → Optional terms → Asset ID tag → Created before → Created after → Updated before → Updated after → Creator name → Creator ID → Group name → Group ID → Numeric asset ID → Audio type.
</Alert>

<h5 style={{marginTop: '36px'}}>Query features</h5>

The following features can be combined in a single query:

<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Syntax</th>
      <th>How it works</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Exact search</td>
      <td><code>"..."</code></td>
      <td>
        Matches a phrase exactly. Exact matches take the highest priority and bypass other tag processing.<br/><br/>
        Use quotes to search for text that looks like a tag (for example, <code>"asset_id:123"</code>). You can mix quoted phrases with regular terms and include multiple quoted phrases in one query.
      </td>
    </tr>
    <tr>
    <td>Exclude terms</td>
      <td>
        <code>-term</code><br/>
        <code>exclude:term</code>
      </td>
      <td>
        Excludes results containing specific terms.<br/><br/>
        You can use multiple <code>-</code> prefixes and <code>exclude</code> tags in the same query, or mix both syntaxes.
      </td>
    </tr>
    <tr>
      <td>Optional terms</td>
      <td>
        <code>term?</code><br/>
        <code>term!</code><br/>
        <code>optional:term</code>
      </td>
      <td>
        By default, all terms are required. Optional terms boost matching results without excluding results that don't contain them.<br/><br/>
        You can use <code>?</code>, <code>!</code>, or the <code>optional</code> tag, and mix these syntaxes.
      </td>
    </tr>
    <tr>
      <td>Asset ID search</td>
      <td>
        <code>asset_id:123456</code><br/>
        <code>assetId:123456</code><br/>
        <code>123456</code>
      </td>
      <td>
        Pins matching assets to the top of the results.<br/><br/>
        A standalone number is treated as an asset ID if it matches one. Multiple IDs are supported and are merged automatically.
      </td>
    </tr>
    <tr>
      <td>Date filters</td>
      <td>
        <code>created_before</code><br/>
        <code>created_after</code><br/>
        <code>updated_before</code><br/>
        <code>updated_after</code><br/>
      </td>
      <td>
        Filters results by creation or update date.<br/><br/>
        Dates use the US format (MM/DD/YYYY) and must be wrapped in brackets if they include spaces. Natural language dates (for example, "yesterday") are not supported.<br/><br/>
        Each tag also supports a camelCase alternative: <code>createdBefore</code>, <code>createdAfter</code>, <code>updatedBefore</code>, <code>updatedAfter</code>.
      </td>
    </tr>
    <tr>
      <td>Creator filters</td>
      <td>
        <code>creator_name</code><br/>
        <code>creator_id</code><br/>
        <code>group_name</code><br/>
        <code>group_id</code>
      </td>
      <td>
        Filters results by the creator user or creator group based on their name or ID. When multiple creator or group filters are provided, results matching any of them are included.<br/><br/>
        Each tag also supports a camelCase alternative: <code>creatorName</code>, <code>creatorId</code>, <code>groupName</code>, <code>groupId</code>.<br/><br/>
        Names that contain spaces must be wrapped in brackets (for example, <code>group_name:[Group With Space]</code>). If a provided name or ID is invalid, only that specific filter is ignored; other valid creator or group filters in the same query are still applied.
      </td>
    </tr>
    <tr>
      <td>Audio type</td>
      <td>
        <code>music</code><br/>
        <code>sfx</code><br/>
        <code>sound effects</code>
      </td>
      <td>
        Filters audio assets by type. To restrict results to a specific audio type, append the type at the end of your query.<br/><br/>
        To search for the literal word instead of filtering, wrap the word in quotes.
      </td>
    </tr>
  </tbody>
</table>

<h5 style={{marginTop: '36px'}}>Tags</h5>

Tags modify how search works, but they are not treated like search terms themselves. They only filter or rank your results. If a tag has a typo or an invalid date, it's treated as a regular search term instead.

Tags can use the formats `tag:value` or `tag=value`, and are not case-sensitive.

Some tags accept multiple values when you use brackets. For example, `exclude:[rusty, broken]` and `asset_id:[123, 456]`.

<h5 style={{marginTop: '36px'}}>Date formats</h5>

Date filters support the following formats:

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
    <td>With time (requires brackets)</td>
    <td>`[03/10/2026 2:30 PM]`</td>
  </tr>
  </tbody>
</table>

<h5 style={{marginTop: '36px'}}>Example queries</h5>

- `"wooden crate" asset_id:99887766 created_after:2023-06-01 -damaged optional:painted`: Exactly matches "wooden crate", pins a specific asset by ID, filters by date, excludes "damaged", and ranks "painted" results higher.

- `explosion sfx -loop created_before:[December 31, 2023]`: Filters sound effects named "explosion", excludes looping variants, and limits the results by date.

- `125447393891114 sword glowing? -rusty`: Pins a specific asset by ID, searches for "sword", boosts "glowing", and excludes "rusty".

- `tree creator_name:buildmaster group_id:9876543`: Searches for "tree", filtered to assets by creator "buildmaster" or the group with ID 9876543.

- `sword creator_id:1000001,2000002 group_name:[Studio Builders]`: Searches for "sword", filtered to assets by creators with IDs 1000001 or 2000002, or the group "Studio Builders".
