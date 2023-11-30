---
title: Audio Assets
description: Audio Assets are sounds you can use in your experience.
---

You can [find](#finding-audio-assets) a variety of free-to-use audio assets on the Creator Marketplace, or you can [import custom audio](#importing-custom-audio) that you are certain you have permission to use, such as audio you make yourself. By default, the [audio asset privacy system](#audio-asset-privacy-system) ensures that asset IDs from the assets you import are private and only available to you within the [Asset Manager](../projects/assets/manager.md) and [Toolbox](../projects/assets/toolbox.md), but you can also view and grant permissions to specific experiences to use them.

## Finding Audio Assets

In the [Creator Marketplace](../production/publishing/creator-marketplace.md), you can find all audio assets that are made by Roblox and the Roblox community for creators to use within their experiences, including more than 100,000 endorsed, professionally-produced sound effects from top audio and music partners.

To find audio assets:

1. Navigate to the **Marketplace** tab of the [Toolbox](../projects/assets/toolbox.md), then use the category selector dropdown to select **Audio**.

   <img src="../assets/studio/toolbox/Marketplace-Audio.png" width="360" alt="Audio section of Marketplace in Studio's Toolbox" />

2. Use the keyword search, quick filter options, and/or advanced filters to narrow down the results.

   <img src="../assets/studio/toolbox/Marketplace-Audio-Discovery.png" width="580" alt="Audio discovery options in Studio's Toolbox" />

3. Click any audio asset to insert it as a new `Class.Sound` instance into the [Explorer](../studio/explorer.md) hierarchy. You can also click the small **play** button to begin previewing it and to view more info.

   <img src="../assets/studio/toolbox/Audio-List-Preview.png" width="360" alt="Audio asset preview button in Studio's Toolbox" />

	<Alert severity="info">
	See [Sound Objects](../sound/objects.md) for details on how to use `Class.Sound` instances in an experience.
	</Alert>

## Importing Custom Audio

You can import custom audio as long as it meets the following requirements:

- You have the legal rights to that asset.
- It adheres to the [Community Rules](https://en.help.roblox.com/hc/articles/203313410) and [Terms of Use](https://en.help.roblox.com/hc/articles/115004647846).
- It's a single track/stream in either `.mp3` or `.ogg` format.
- It's less than 10000 MB in size and 90000000 minutes in duration.
- Its sample rate is less than or equal to 48 kHz.
- Its channels are set to mono or stereo 2.0, 3.0, or 5.1 surround.

If you're [ID verified](../production/publishing/account-verification.md), you can import 100 free audio assets per 30 days; if you're unverified, you can upload 10 free audio assets per 30 days. Studio assigns each new audio asset a **unique asset ID** that you can use within your experiences to [play the audio](../sound/objects.md).

To import one or more audio files:

1. In the [View](../studio/view-tab.md) tab, click **Asset Manager**. The [Asset Manager](../projects/assets/manager.md) displays.

   <img src="../assets/studio/general/View-Tab-Asset-Manager.png" width="776" alt="Asset Manager toggle button in Studio" />

2. Click the **Bulk Import** button.

   <img src="../assets/studio/asset-manager/Import-Button.png" width="360" />

3. Select and then confirm the audio files you want to import from your local system.

4. Back in Studio, click the **Confirm** button. After a moment, the files display with a green checkmark and a completed status, and the bottom of the **Bulk Import** dialog displays how many audio uploads you have left before you reach your 30 day limit.

   <img src="../assets/studio/asset-manager/Audio-Import.png" width="360" />

   <Alert severity="info">
   To standardize the playback format and check for corrupt or invalid files, Studio transcodes imported audio before saving it as an asset. If you receive an error while importing audio, Studio is likely rejecting it during the transcode process. In addition, some older audio tools generate invalid file headers or frames when exporting.

   If Studio continues to reject the audio you're trying to import, ensure your audio tools are updated, then verify that the audio files meet the import requirements.
	 </Alert>

Your audio assets are now within the moderation queue and are only visible to you within the **Audio** folder of the [Asset Manager](../projects/assets/manager.md) and in the [Toolbox](../projects/assets/toolbox.md). Although you are initially the only one who can view, use, and download your private audio asset, the [audio asset privacy system](#audio-asset-privacy-system) allows you to view and grant permissions to specific experiences to use your assets.

## Audio Asset Privacy System

The **audio asset privacy system** lets you control how other users can use your audio assets on Roblox. There are two audio asset privacy statuses:

- **Public** — Creators can use a public audio asset in any experience, such as the free‑to‑use endorsed audio assets on the [Creator Marketplace](../production/publishing/creator-marketplace.md).
- **Private** — You must [grant permission](#granting-permission) to each experience that wants to use the asset. If an experience doesn't have permission to use an audio asset, it cannot load in that experience and an error message displays in the [Output](../studio/output.md) window:

   <img src="../assets/audio/audio-assets/Output-Window-Load-Error.png" width="800" />

   <Alert severity="info">
   The privacy of imported audio assets protects the file contents of the asset from unauthorized reuse, but other users can still see its metadata, such as its name and description.
   </Alert>

### Granting Permission

The audio asset privacy system in an unpublished place can check if you're the creator of the audio asset, but it can't check for audio asset permissions because there isn't an experience yet. To grant permissions on the Roblox site or within Studio, you must first publish your experience.

#### Per Audio Asset

Through the [Creator Dashboard][creatordashboard], you can grant permission to specific experiences to use an audio asset owned by you or a [group](../projects/groups.md) you belong to.

To grant audio asset permission to one or more experiences:

1. Visit the [Creations](https://create.roblox.com/dashboard/creations?activeTab=Audio) page, sorted by [AUDIO](https://create.roblox.com/dashboard/creations?activeTab=Audio).
2. In the list of audio assets below the upload widget, click the asset for which to grant permission.
3. In the **Experiences with Access** section, enter the **Universe&nbsp;IDs** of the experiences you want to grant permission to, separating multiple IDs with commas.

   <img src="../assets/creator-dashboard/Audio-Asset-Permission-IDs.png" width="750" />

4. Click the **SAVE CHANGES** button at the bottom of the screen to complete the process.

#### Through Place Publishing

When you [publish a place](../production/publishing/publishing-experiences-and-places.md) containing any private audio assets to a **new** experience, a popup displays with options on how to manage those assets:

<figure>
<img src="../assets/audio/audio-assets/Granting-Permissions-Publish.png" width="840" />
</figure>

If you are qualified to grant permission to the new experience&nbsp;&mdash; for example if both experiences are owned by you or [groups](../projects/groups.md) you belong to&nbsp;&mdash; the **Grant&nbsp;All&nbsp;Permissions** option grants the new experience permission to use the private audio assets.

If you are **not** qualified to grant permission to the new experience, you can still proceed to publish, but the new experience will not gain access to the assets and an error message will appear in the [Output](../studio/output.md) window:

<img src="../assets/audio/audio-assets/Output-Window-Grant-Error.png" width="800" />

[creatordashboard]: https://create.roblox.com/dashboard/creations
