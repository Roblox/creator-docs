---
title: Audio assets
description: Explore how to find and import audio assets for use in your experiences.
---

You can [find](#find-audio) a wide variety of free‑to‑use audio assets in the Creator Store, or you can [import](#import-audio) audio assets that you're certain you have permission to use, such as audio that you make yourself. The [asset privacy](../projects/assets/privacy.md) system automatically ensures that the IDs of your imported audio can't be accessed by users without proper permissions.

## Find audio

The [Creator Store](../production/creator-store.md) tab of the [Toolbox](../projects/assets/toolbox.md) contains a wide variety of free-to-use audio assets made by Roblox and the Roblox community for creators to use within their experiences, including more than 100,000 professionally-produced sound effects and music tracks from top audio and music partners.

To find audio assets on the Creator Store:

1. In the **Toolbox**, navigate to the **Creator Store** tab, then use the category selector dropdown to select **Audio**.

   <img src="../assets/studio/toolbox/Creator-Store-Audio.png" width="360" alt="Audio section of Creator Store in Studio's Toolbox" />

2. Use the keyword search, quick filter options, and/or advanced filters to narrow down the results.

   <img src="../assets/studio/toolbox/Creator-Store-Audio-Discovery.png" width="580" alt="Audio discovery options in Studio's Toolbox" />

3. Right-click any audio asset, then select **Copy Asset ID** to copy the asset ID to your clipboard. You can now paste this asset ID into a `Class.AudioPlayer` object to [play the audio](../audio/objects.md).

<Alert severity="warning">
  If you click any audio asset, Studio inserts it as a new `Class.Sound` instance into the **Explorer** window. However, `Class.Sound` objects don't have the same dynamic functionality as `Class.AudioPlayer` objects.
</Alert>

## Import audio

You can import custom audio through the [Asset Manager](../projects/assets/manager.md), Creator Dashboard, and Open Cloud API as long as your audio meets the following requirements:

- You have the legal rights to that audio asset.
- It adheres to the [Community Rules](https://en.help.roblox.com/hc/articles/203313410) and [Terms of Use](https://en.help.roblox.com/hc/articles/115004647846).
- It's a single track/stream in either `.mp3`, `.ogg`, `.wav` or `.flac` format.
- It's less than 20 MB in size and 7 minutes in duration.
- Its sample rate is less than or equal to 48 kHz.
- Its channels are set to mono or stereo 2.0, 3.0, or 5.1 surround.

If you're [ID verified](../production/publishing/account-verification.md), you can import 100 free audio assets per 30 days; if you're unverified, you can import 10 free audio assets per 30 days. Studio assigns each new audio asset a **unique asset ID** that you can use within your experiences to [play the audio](../audio/objects.md).

<Tabs>
  <TabItem key = "1" label="Asset Manager">

To import audio through the **Asset Manager**:

1. Click the **Import** button.
2. Select and then confirm the audio files you want to import from your local system.
3. Once you confirm the imports and the files import successfully, they display with a green checkmark and a completed status.

   <Alert severity="info">
   To standardize the playback format and check for corrupt or invalid files, Studio transcodes imported audio before saving it as an asset. If you receive an error while importing audio, Studio is likely rejecting it during the transcode process. In addition, some older audio tools generate invalid file headers or frames when exporting.

   If Studio continues to reject the audio you're trying to import, ensure your audio tools are updated, then verify that the audio files meet the import requirements.
   </Alert>

  </TabItem>
  <TabItem key = "2" label="Creator Dashboard">

To import audio through the [Creator Dashboard](https://create.roblox.com/dashboard/creations):

1. In the horizontal navigation, select **Development Items**. All assets you have previously imported display within their respective category.
2. In the sub-horizontal navigation, select **Audio**.
3. Click the **Upload Asset** button. The **Upload Asset** page displays.
4. In the **Upload Asset** page,
   1. Click the **Upload** button, then select and then confirm the audio file you want to import from your local system.
   1. Fill out the **Name** and **Description** fields with the audio file's relevant information.
   1. At the bottom of the page, click the **Upload** button.

Your audio assets are now within the moderation queue and are only visible to you within the **Audio** tab of the Creator Dashboard's **Development Items** page.

  </TabItem>
  <TabItem key = "3" label="Open Cloud API">

To import audio through an HTTP request:

1. Copy the API key to the `x-api-key` request header of the [Create Asset](../reference/cloud/assets/v1.json#POST-v1-assets) endpoint.
1. In your request:

   1. Specify that the target asset type is **Audio**.
   1. Add your audio asset's name and description.
   1. Add the creator information.
      - If you want to create the audio asset **on your own behalf**, add your user ID. You can find your user ID on the URL of your Roblox profile. For example, for `https://www.roblox.com/users/1234567/profile`, your user ID is `1234567`.
      - If you want to create the audio asset **as a group asset**, add the group ID of your group. You can find the group ID on the URL of your group's page. For example, for `https://www.roblox.com/groups/7654321/example-group#!/`, the group ID is `7654321`.
   1. Add the file path and content type of your asset.

   ```bash title ="Example Request for Create Audio Asset"
   curl --location 'https://apis.roblox.com/assets/v1/assets' \
   --header 'x-api-key: ${ApiKey}' \
   --form 'request="{
     \"assetType\": \"Audio\",
     \"displayName\": \"Name\",
     \"description\": \"This is a description\",
     \"creationContext\": {
       \"creator\": {
         \"userId\": \"${userId}\" # Use groupId for creating a group asset
       }
     }
   }"' \
   --form 'fileContent=@"/filepath/audio.mp3";type=audio/mpeg'

   ```

  </TabItem>
</Tabs>

After the audio assets pass moderation, you can reuse them in any project on the platform. Although you are initially the only one who can view and use private audio assets, the [asset privacy](../projects/assets/privacy.md) system lets you grant usage permissions to specific connections and experiences.
