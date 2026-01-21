---
title: Video frames
description: Video assets used on VideoFrame instances allow for video playback in experiences.
---

import BetaAlert from '../includes/beta-features/beta-alert.md'

Video assets used in `Class.VideoFrame` instances allow for video playback in experiences. You can [upload](#upload-videos) videos that you're certain you have permission to use, such as videos you make yourself, and the [asset privacy](../projects/assets/privacy.md) system automatically ensures that the IDs of your uploaded videos can't be accessed by users without the proper permissions.

## Upload videos

<BetaAlert betaName="Video Uploads" leadIn="To upload video assets, enable the beta feature through " leadOut="." components={props.components} />

If you're a 13+ [ID verified](https://en.help.roblox.com/hc/en-us/articles/4407282410644-Age-ID-Verification) user, you can upload videos through the [Asset Manager](../projects/assets/manager.md), the [Creator Dashboard](https://create.roblox.com/dashboard/creations?activeTab=Video), or the [Open Cloud API](../cloud/guides/usage-assets.md). You can upload a video as long as it meets the following requirements:

- You have the legal rights to use the video asset.
- It adheres to the [Roblox Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410) and [Terms of Use](https://en.help.roblox.com/hc/en-us/articles/115004647846).
- It's 5 minutes or less in either `.mp4` or `.mov` format.
- Its resolution is less than or equal to 4096&times;2160.
- It's less than 3.75 GB.

Videos that don't meet these requirements are rejected. Alpha channels are not supported and will be ignored. When uploading videos, consider the following:

- Each video upload costs 2,000 Robux.
- You can upload a maximum of 20 videos a day.

## Play videos

A `Class.VideoFrame` must be parented to a `Class.ScreenGui`, `Class.SurfaceGui`, or `Class.BillboardGui` in order to be playable. Currently, a maximum of two videos can play simultaneously.

To play a video in your experience without code:

1. Create a `Class.ScreenGui` as outlined in [On-Screen UI Containers](../ui/on-screen-containers.md), or a `Class.SurfaceGui` or `Class.BillboardGui` as outlined in [In-Experience UI Containers](../ui/in-experience-containers.md).
2. Insert a video from the [Toolbox](../projects/assets/toolbox.md) or [Asset Manager](../projects/assets/manager.md). A new `Class.VideoFrame` object is inserted for the video.
3. Parent the `Class.VideoFrame` to the container.

   <img src="../assets/studio/explorer/StarterGui-ScreenGui-VideoFrame.png" width="320" />

4. With the new `Class.VideoFrame` selected, enable its **Looped** and **Playing** properties in the [Properties](../studio/properties.md) window.

   <img src="../assets/studio/properties/VideoFrame-Looped-Playing.png" width="320" />

If you want to play a video in your experience with code, paste the following code into a `Class.Script` within `Class.ServerScriptService` to create a `Class.Part` and play the video on its front surface.

```lua
local Workspace = game:GetService("Workspace")

local screenPart = Instance.new("Part")
screenPart.Size = Vector3.new(16, 9, 1)
screenPart.Position = Vector3.new(0, 8, -20)
screenPart.Orientation = Vector3.new(0, 180, 0)
screenPart.Anchored = true
screenPart.Parent = Workspace

local surfaceGui = Instance.new("SurfaceGui")
surfaceGui.Parent = screenPart

local videoFrame = Instance.new("VideoFrame")
videoFrame.Size = UDim2.new(1, 0, 1, 0)
videoFrame.Parent = surfaceGui

videoFrame.Looped = true
videoFrame.Video = "rbxassetid://5608384572"  -- Replace with your video's asset ID

while not videoFrame.IsLoaded do
	videoFrame.Loaded:Wait()
end

videoFrame:Play()
```
