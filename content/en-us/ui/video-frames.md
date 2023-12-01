---
title: Video Frames
description: Video assets used on VideoFrame instances allow for video playback in experiences.
---

Video assets used in `Class.VideoFrame` instances allow for video playback in experiences. You can [upload](#importing-videos) videos that you're certain you have permission to use, such as videos you make yourself, and the [asset privacy](../projects/assets/privacy.md) system automatically ensures that the IDs of your uploaded videos can't be accessed by users without the proper permissions.

## Importing Videos

<Alert severity="success">
This feature is currently in beta. To upload video assets, go to **File**&nbsp;&rarr; **Beta Features** and enable **Video Uploads**.
</Alert>

### Requirements

To upload video assets, you must be a 13+ [ID verified](https://en.help.roblox.com/hc/en-us/articles/4407282410644-Age-ID-Verification) user. You can upload a video as long as it meets the following requirements:

- You have the legal rights to use the video asset.
- It adheres to the [Roblox Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410) and [Terms of Use](https://en.help.roblox.com/hc/en-us/articles/115004647846).
- It's 30 seconds or less in either `.mp4` or `.mov` format.
- Its resolution is less than or equal to 4096&times;2160.
- It's less than 375 MB.
- It includes only English audio and text (additional languages will be supported at a later date).

Videos that don't meet these requirements are rejected. When uploading videos, consider the following:

- Each video upload costs 2,000 Robux.
- You can upload a maximum of three videos within any 30-day period, starting from the date of your first video upload.

### Uploading

You can upload videos through the [Asset Manager](../projects/assets/manager.md), the [Creator Dashboard](https://create.roblox.com/dashboard/creations?activeTab=Video), or the [Open Cloud API](../cloud/open-cloud/usage-assets.md). To upload through the [Asset Manager](../projects/assets/manager.md):

1. In the [View](../studio/view-tab.md) tab, click **Asset Manager**.

   <img src="../assets/studio/general/View-Tab-Asset-Manager.png" width="776" alt="Asset Manager toggle button in Studio" />

2. Click the **Bulk Import** button.

   <img src="../assets/studio/asset-manager/Import-Button.png" width="360" />

3. Select and then confirm the video files you want to import from your local system.
4. Once you confirm the uploads and the files upload successfully, they display with a green checkmark and a completed status.

    <img src="../assets/studio/asset-manager/Video-Import.png" width="360" />

The video assets are now within the moderation queue and are only visible to you within the **Video** folder of the [Asset Manager](../projects/assets/manager.md) and, after passing moderation, the [Toolbox](../projects/assets/toolbox.md). Although you are initially the only one who can view and use private video assets, the [asset privacy](../projects/assets/privacy.md) system lets you grant usage permissions to specific friends and experiences.

## Playing Videos

A `Class.VideoFrame` must be parented to a `Class.SurfaceGui`, `Class.SurfaceGui`, or `Class.BillboardGui` in order to be playable.

To play a video in your experience without code:

1. Create a `Class.ScreenGui` as outlined in [On-Screen UI Containers](../ui/on-screen-containers.md), or a `Class.SurfaceGui` or `Class.BillboardGui` as outlined in [In-Experience UI Containers](../ui/in-experience-containers.md).
2. Select the new UI container in the [Explorer](../studio/explorer.md) window. Then, in the [Asset Manager](../projects/assets/manager.md), double-click the desired video asset to automatically parent it to the container.

   <img src="../assets/studio/explorer/StarterGui-ScreenGui-VideoFrame.png" width="320" />

3. With the new `Class.VideoFrame` selected, enable its **Looped** and **Playing** properties in the [Properties](../studio/properties.md) window.

   <img src="../assets/studio/properties/VideoFrame-Looped-Playing.png" width="320" />

If you want to play a video in your experience with code, paste the following code into a `Class.Script` within `Class.ServerScriptService` to create a `Class.Part` and play the video on its front surface.

``` lua
local screenPart = Instance.new("Part")
screenPart.Size = Vector3.new(16, 9, 1)
screenPart.Position = Vector3.new(0, 8, -20)
screenPart.Orientation = Vector3.new(0, 180, 0)
screenPart.Anchored = true
screenPart.Parent = workspace

local surfaceGui = Instance.new("SurfaceGui")
surfaceGui.Parent = screenPart

local videoFrame = Instance.new("VideoFrame")
videoFrame.Size = UDim2.new(1, 0, 1, 0)
videoFrame.Parent = surfaceGui

videoFrame.Looped = true
videoFrame.Video = "rbxassetid://5608384572"  -- Replace with your video's asset ID

while not videoFrame.IsLoaded do
	task.wait()
end

videoFrame:Play()
```
