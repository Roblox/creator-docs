---
title: Video Assets
description: Video assets are video files used on VideoFrame instances to allow video playback in experiences. 
---

<Alert severity="warning">
This feature is currently in beta. To use video assets in your experience, go to **File** > **Beta Features** and enable **Video Uploads**.
</Alert>

_Video assets_ are video files used on `Class.VideoFrame` instances to allow video playback in experiences. You can upload video assets that you are certain you have permission to use, such as videos you make yourself.

## Uploading Videos

To upload video assets, you must be a 13+ [ID verified](https://en.help.roblox.com/hc/en-us/articles/4407282410644-Age-ID-Verification) user. You can upload a video as long as it meets the following requirements:

- You have the legal rights to use that asset.
- It adheres to the [Roblox Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410) and [Terms of Use](https://en.help.roblox.com/hc/en-us/articles/115004647846).
- It's 30 seconds or less in either `.mp4` or `.mov` format.
- Its resolution is less than or equal to 4096x2160.
- It's less than 375 MB.
- It includes only English audio and text.

Videos that don't meet these requirements are rejected. The ability to upload videos in additional languages will be supported at a later date. When uploading videos, consider the following:

- Each video upload costs 2,000 Robux
- You can upload a maximum of three videos within any 30-day period, starting from the date of your first video upload.

To upload video assets through the [Asset Manager](../projects/assets/manager.md):

1. In the **View** tab, click **Asset Manager**.

    <img src="../assets/ui/video-assets/video-assets-1.png" width="100%" />

2. Click the **Bulk Import** button.

   <img src="../assets/ui/video-assets/video-assets-2.png" width="60%" />

3. Select the video files you want to upload from your local machine. Then click the **Open** button.

4. Click the **Confirm** button. After a moment, the file(s) display with a green checkmark and a completed status.

    <img src="../assets/ui/video-assets/video-assets-3.png" width="50%" />

Your video assets are now in the moderation queue. You can only see them in the video folder of the Asset Manager. Once approved, they become visible in the video folder in the Toolbox. Although you are initially the only one who can view and use your private video assets, if you have editing rights for specific experiences, you can view and provide video permissions for them as well.

You can also upload videos through the [Creator Dashboard](https://create.roblox.com/dashboard/creations) and the [Open Cloud API](https://create.roblox.com/docs/cloud/open-cloud/usage-assets).

## Playing Videos

A VideoFrame must be parented to a `Class.SurfaceGui`, `Class.ScreenGui`, or `Class.BillboardGui`, or  in order to be playable. To play videos in your experience without code:

1. In the **Explorer** window, hover over **Workspace** and click the **CirclePlus** icon.
    <img src="../assets/ui/video-assets/video-assets-4.png" width="50%" />

2. From the contextual menu, insert a **SurfaceGui**, **BillboardGui**, or **ScreenGui**  depending on your need:

   - `Class.SurfaceGui|SurfaceGuis` are useful for rendering videos onto the surface of a `Class.Part` in an experience.
   - `Class.ScreenGui|ScreenGuis` are useful for rendering videos that appear on a user's screen, like tutorial videos within the UI.
   - `Class.BillboardGui|BillboardGuis` are useful for rendering videos that appear in the 3D world and always face the camera, like character name tags.

3. Select the `SurfaceGui`, `BillboardGui`, or `ScreenGui` in the Explorer window. Then in the Asset Manager, double-click the desired video asset to automatically parent it to the GUI object.
   <img src="../assets/ui/video-assets/video-assets-6.png" width="50%" />

4.  In the video asset's Properties window, enable the **Looped** and **Playing** properties.

    <img src="../assets/ui/video-assets/video-assets-7.png" width="50%" />

If you want to play videos in your experience with code, the following code sample demonstrates how to create and play a `VideoFrame`:

``` lua
local screenPart = Instance.new("Part")
screenPart.Parent = workspace

local surfaceGui = Instance.new("SurfaceGui")
surfaceGui.Parent = screenPart

local videoFrame = Instance.new("VideoFrame")
videoFrame.Parent = surfaceGui

videoFrame.Looped = true
videoFrame.Video = "rbxassetid://" -- add your video's asset ID

while not videoFrame.IsLoaded do
	task.wait()
end

videoFrame:Play()
```

For more information, see `Class.VideoFrame`.

## Video Asset Privacy System

The video asset privacy system automatically ensures that the IDs of your uploaded videos can't be accessed by users without the proper permissions. These IDs are only accessible to you in the video folder of [Asset Manager](../projects/assets/manager.md), and once approved by moderation, the [Toolbox](../projects/assets/toolbox.md).

The video asset's configure page lists all experiences and their respective owners who have permission to use the asset. If an experience lacks permission to use the selected video asset, the experience won't load it, and an error message appears in the [Output Window](../studio/output.md).

<Alert severity="info">
The privacy of the video assets you upload protects the file contents of the asset from unauthorized reuse, but other users can still see its metadata, such as its name, thumbnail, and description.
</Alert>

### Viewing Permissions

To view permissions on a video asset's configure page:

1. Navigate to the **Creations** page of the [Creator Dashboard](https://create.roblox.com/dashboard/creations?activeTab=Model).
2. In the horizontal navigation, select **Video**.
3. Select the video you want to view permissions for.

### Granting Permissions

The video asset privacy system can't check for video asset permissions in an unpublished experience. To grant permissions on the Roblox website or within Studio, you must first [publish your experience](../production/publishing/publishing-experiences-and-places.md#publishing-a-starting-place).

#### Roblox Website

You can grant video asset permissions to any experience that you can edit. To grant video asset permissions to an experience on the Roblox website:

1. Retrieve the **Universe ID** of any of your experiences that you want to grant permission to use your video asset:

   1. Navigate to the [Creator Dashboard](https://create.roblox.com/creations).
   1. Click the **...** at the top of an experience window.
   1. Select **Copy Universe ID**.

2. Navigate to the video asset's [configure page](#viewing-permissions).

3. In the **Experiences with Asset** section, enter the universe ID.
   <img src="../assets/ui/video-assets/video-assets-8.png" width="100%" />

   If you want to grant access to multiple experiences at a time, delimit multiple universe IDs with commas (for example, `universe1, universe2, universe3`).

4. Click the **ADD TO LIST** button.

#### Studio

Studio receives permission to use a video asset when you:

- [Upload the video asset](#uploading-videos) to the [Asset Manager](../projects/assets/manager.md).
- Insert the video asset from the **Inventory**, **Recent**, or **Creation** tabs of the [Toolbox](../projects/assets/toolbox.md)
- Insert the video asset into a `Class.SurfaceGui`, `Class.BillboardGui`, or `Class.ScreenGui`.

When you [publish a place](../production/publishing/publishing-experiences-and-places.md#publishing-a-starting-place) to a new experience, a pop-up menu displays to let you grant permission to the new experience to use all private video assets within that place **if you are the asset creator**.

<img src="../assets/ui/video-assets/video-assets-9.png" width="100%" />
