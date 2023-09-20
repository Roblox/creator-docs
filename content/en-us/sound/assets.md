---
title: Audio Assets
description: Audio Assets are sounds you can use in your experience.
---

You can [find](#finding-audio-assets) a variety of free-to-use audio assets on the Creator Marketplace, or you can [import custom audio](#importing-custom-audio) that you are certain you have permission to use, such as audio you make yourself. By default, the [audio asset privacy system](#audio-asset-privacy-system) ensures that asset IDs from the assets you import are private and only available to you within the [Asset Manager](../projects/assets/manager.md) and [Toolbox](../projects/assets/toolbox.md), but you can also [view](#viewing-permissions) and [grant permissions](#granting-permissions) to specific experiences to use them.

## Finding Audio Assets

The [Creator Marketplace](../production/publishing/creator-marketplace.md) is where you can find all audio assets that are made by Roblox and the Roblox community for the Roblox community to use within their experiences, including more than 100,000 endorsed, professionally-produced sound effects from top audio and music partners, such as APM, Monstercat, Pro Sound Effects, Nettwerk Music Group, and Position Music.

To find audio assets:

1. Navigate to the **Marketplace** tab of the [Toolbox](../projects/assets/toolbox.md), then use the category selector dropdown to select **Audio**.

   <img src="../assets/studio/toolbox/Marketplace-Audio.png" width="360" />

1. **(Optional)** Use the **advanced filter** popup to sort by endorsed audio.

   1. On the right side of the search bar, click the **advanced filter** button.

      <img src="../assets/studio/toolbox/Marketplace-Advanced-Filter.png" width="360" />

   1. In the **Creator** field, enter **Roblox**, **Monstercat**, or **APM**.

   1. Click the **Apply** button.

1. To sort results by sound effects or music tracks, click either the **Sound&nbsp;Effect** or **Music** button. Then, optionally, filter by sound category or music genre from the dropdown lists.

   <GridContainer numColumns="2">
     <figure>
       <img src="../assets/studio/toolbox/Marketplace-Audio-Sound-Effects-Category.png" width="360" />
       <figcaption>Sound effects by category</figcaption>
     </figure>
     <figure>
       <img src="../assets/studio/toolbox/Marketplace-Audio-Music-Genre.png" width="360" />
       <figcaption>Music tracks by genre</figcaption>
     </figure>
   </GridContainer>

1. In the **Search** field, type keywords for the audio you want to find and select the search icon. Results populate according to your set filters.

1. Right-click the desired audio and select **Copy&nbsp;Asset&nbsp;ID** to get its asset ID for [playing the audio](../sound/objects.md) through a `Class.Sound` object.

## Importing Custom Audio

You can import custom audio as long as it meets the following requirements:

- You have the legal rights to that asset.
- It adheres to the [Community Rules](https://en.help.roblox.com/hc/articles/203313410) and [Terms of Use](https://en.help.roblox.com/hc/articles/115004647846).
- It's a single track/stream in either `.mp3` or `.ogg` format.
- It's less than 20 MB in size and 7 minutes in duration.
- Its sample rate is less than or equal to 48 kHz.
- Its channels are set to mono or stereo 2.0, 3.0, or 5.1 surround.

If you're [ID-verified](https://blog.roblox.com/2021/09/introducing-age-verification/), you can import 100 free audio assets per 30 days; if you're unverified, you can upload 10 free audio assets per 30 days. Studio assigns each new audio asset a **unique asset ID** that you can use within your experiences to [play the audio](../sound/objects.md).

To import one or more audio files:

1. In the **View** tab, click **Asset Manager**. The [Asset Manager](../projects/assets/manager.md) displays.

   <img src="../assets/studio/general/View-Tab-Asset-Manager.png" width="876" alt="Asset Manager toggle button in Studio" />

2. Click the **Bulk Import** button.

   <img src="../assets/studio/asset-manager/Import-Button.png" width="360" />

3. Select the audio files you want to import from your local machine, then click the **Open** button.

4. Click the **Confirm** button. After a moment, the files display with a green checkmark and a
   completed status, and the bottom of the **Bulk Import** dialog displays how many audio uploads you have left before you reach your 30 day limit.

   <img src="../assets/studio/asset-manager/Audio-Import.png" width="360" />

Your audio assets are now within the moderation queue and are only visible to you within the **Audio** folder of the [Asset Manager](../projects/assets/manager.md) and in the [Toolbox](../projects/assets/toolbox.md). Although you are initially the only one who can view, use, and download your private audio asset, the audio asset privacy system allows you to [view](#viewing-permissions) and [grant](#granting-permissions) permissions to specific experiences to use your assets.

### Troubleshooting

To standardize the playback format and check for corrupt or invalid files, Studio transcodes the audio you import before saving it as an asset. If you receive an error while you are importing audio, Studio is likely rejecting it during the transcode process. In addition, some older versions of audio tools generate invalid file headers or frames when exporting audio.

If Studio continues to reject the audio you are trying to import, ensure you're using the latest version of your audio tools, then verify that your audio meets the import requirements.

## Audio Asset Privacy System

The **audio asset privacy system** lets you control how other users can use your audio assets on Roblox. There are two types of asset privacy statuses any asset can have: **public** and **private**. Users can use a public audio asset in any experience, such as the free-to-use endorsed audio assets on the Creator Marketplace, but for private audio assets the creator must [grant](#granting-permissions) permission to each individual experience that wants to use it.

<Alert severity="info">
  The privacy of the audio assets you import protects the file contents of the asset from unauthorized reuse but other users can still see its metadata, such as its name and description.
</Alert>

### Viewing Permissions

An audio asset's configure page displays every experience and their owner that has permission to use the audio asset. If an experience doesn't have permission to use an audio asset, it can't load in that experience and an [error message](#studio) displays.

To view permissions on an audio asset's configure page:

1. Navigate to [Roblox.com/develop](https://www.roblox.com/develop).
2. (Optional) If you want to view a group creation's audio asset configure page, in the horizontal navigation, select **Group Creations**.
3. In the vertical navigation, select **Audio**.
4. To the right of the audio asset you want to view permissions for, click the **Gear** icon. A pop-up menu displays.
5. Select **Configure**. The asset's configure page displays.

### Granting Permissions

The audio asset privacy system in an unpublished place can check if you're the creator of the audio asset, but it can't check for audio asset permissions because there isn't an experience yet. To grant permissions on the [Roblox site](#roblox-site) or within [Studio](#studio), you must first [publish your experience](../production/publishing/publishing-experiences-and-places.md#publishing-a-starting-place).

#### Roblox Site

You can grant audio asset permissions to any experience that you can edit. To grant audio asset permissions to an experience on the Roblox site:

1. Retrieve the **universeID** of any of your experiences that you want to grant permission to use your audio asset.
   1. Navigate to the [Creator Dashboard](https://create.roblox.com/creations). Every experience you have created displays.
   1. Right-click on an experience. A pop-up menu displays.
   1. Select **Copy Universe ID**.
2. Navigate to the [audio asset's configure page](#viewing-permissions).
3. In the **Sharing** section, enter the **universeID** in the **Enter Universe IDs** field.

   <img src="../assets/audio/audio-assets/Granting-Permissions-Roblox-Site.jpg" width="90%" />

4. (Optional) If you want to grant access to multiple experiences at a time, delimit the universeIDs with commas. For example: universeId1, universeId2, universeId3
5. Click the **Provide Access** button.

#### Studio

The experience you're working on in Studio receives permission to use an audio asset when you:

- [Import the audio asset](#importing-custom-audio) to the [Asset Manager](../projects/assets/manager.md).
- Insert the audio asset from the **Inventory**, **Recent**, or **Creation** tabs of the [Toolbox](../projects/assets/toolbox.md).
- [Insert the audio asset](../sound/objects.md) into a `Class.Sound` object.

When you [publish a place](../production/publishing/publishing-experiences-and-places.md#publishing-a-starting-place) to a new experience, a pop-up menu displays to let you grant permission to the new experience to use all private audio assets within that place **if you are the asset creator**.

<img src="../assets/audio/audio-assets/Granting-Permissions-Publish.jpg" width="60%" />

If an audio asset otherwise fails to load for permission reasons, the [Output](../studio/output.md) window displays an error that you can click on to open a pop-up menu that lets you grant permission to your experience to use that audio asset

<img src="../assets/audio/audio-assets/Granting-Permissions-Error.jpg" width="80%" />
