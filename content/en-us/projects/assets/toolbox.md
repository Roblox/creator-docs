---
title: Toolbox
description: The Toolbox contains a selection of assets made by Roblox or Roblox community members.
id: toolbox
---

import ToolboxFindUse from '../../includes/studio/toolbox-find-use.md'

The **Toolbox**, accessible from Studio's **Window** menu or **Home** tab toolbar, contains a selection of [models](../../parts/models.md), [images](../../parts/textures-decals.md), [meshes](../../parts/meshes.md), [audio](../../audio/assets.md), [plugins](../../studio/plugins.md), [videos](../../ui/video-frames.md), and fonts made by Roblox or Roblox community members. It also includes all of the creations that you've personally published or those which were published by [groups](../../projects/groups.md) you belong to.

<img src="../../assets/studio/general/Toolbar-Toolbox.png" width="800" alt="Toolbox highlighted in Studio's toolbar." />

The toolbox contains four distinct sections:

<Tabs>
<TabItem label="Creator Store">
<figure>
<img src="../../assets/studio/toolbox/Creator-Store-Tab.png" width="360" height="121" alt="A close up view of the Toolbox with the Creator Store tab highlighted." />

The **Creator Store** section contains models, decals, meshes, audio, plugins, videos, and fonts made by Roblox or Roblox community members. See [Creator Store](../../production/creator-store.md) for more information.
</figure>
</TabItem>
<TabItem label="Inventory">
<figure>
<img src="../../assets/studio/toolbox/Inventory-Tab.png" width="360" height="121" alt="A close up view of the Toolbox with the Inventory tab highlighted." />

The **Inventory** section contains models, decals, meshes, audio, packages, videos, plugins, animations, and fonts that you've personally published, those which were published by [groups](../../projects/groups.md) you belong to, or those taken from the [Creator Store](../../production/creator-store.md).
</figure>
</TabItem>
<TabItem label="Recent">
<figure>
<img src="../../assets/studio/toolbox/Recent-Tab.png" width="360" height="121" alt="A close up view of the Toolbox with the Recent tab highlighted." />

The **Recent** tab is similar to **Inventory** except that filters your recently used models, decals, meshes, audio, videos, and animations.
</figure>
</TabItem>
<TabItem label="Creations">
<figure>
<img src="../../assets/studio/toolbox/Creations-Tab.png" width="360" height="121" alt="A close up view of the Toolbox with the Creations tab highlighted." />

The **Creations** tab is similar to **Inventory**, with the important distinction that it filters models, decals, meshes, audio, plugins, and animations that you've personally published or those which were published by [groups](../../projects/groups.md) you belong to. You can [configure](#asset-configuration) all assets in this section directly within Studio.
</figure>
</TabItem>
</Tabs>

## Find and use assets

With millions of assets available, it's helpful to narrow the search results to find exactly what you are looking for. To browse and use assets:

<ToolboxFindUse components={props.components} />

## Asset configuration

Right-clicking an asset and selecting **Edit Asset** opens the **Asset Configuration** window. In this window, you can edit the asset's details or restore it to a previous version.

<Alert severity="info">
Asset configuration is only possible for assets you've personally published or those which were published by [groups](../../projects/groups.md) you belong to. The **Creations** tab is particularly useful for filtering assets in this way.
</Alert>

## Troubleshooting

The toolbox runs through a web view. If you're experiencing any of the following issues, run the associated troubleshooting steps.

<BaseAccordion>
<AccordionSummary><Typography variant="subtitle2">General Issues</Typography></AccordionSummary>
<AccordionDetails>
<Alert severity="warning">
Make sure there are no active instances of Roblox Studio running before running these steps.
</Alert>
<table>
<thead>
<tr>
<th>Windows</th>
</tr>
</thead>
<tbody>
<tr>
<td>
1. [Reinstall](https://developer.microsoft.com/en-us/microsoft-edge/webview2/) your Windows WebView2 installation.
2. Delete the WebView2 data folder found at `%LOCALAPPDATA%\Roblox\RobloxStudio\WebView2`. Studio will automatically recreate this folder when it opens.
</td>
</tr>
</tbody>
<thead>
<tr>
<th>Mac</th>
</tr>
</thead>
<tbody>
<tr>
<td>Delete the WebKit data folders found at `~/Library/WebKit/com.Roblox.RobloxStudio` and `~/Library/Caches/com.Roblox.RobloxStudio/WebKit`. Studio will automatically recreate these folders when it opens.</td>
</tr>
</tbody>
</table>
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary><Typography variant="subtitle2">Audio Not Working</Typography></AccordionSummary>
<AccordionDetails>
<table>
<thead>
<tr>
<th>Windows</th>
</tr>
</thead>
<tbody>
<tr>
<td>
1. Right click the speaker icon in the taskbar.
2. Click **Open Volume Mixer**.
3. Make sure that **Microsoft Edge WebView2** is not muted.
</td>
</tr>
</tbody>
</table>
</AccordionDetails>
</BaseAccordion>
