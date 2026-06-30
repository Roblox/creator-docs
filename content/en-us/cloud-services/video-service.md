---
title: Video playback
description: Use VideoFrame objects to play video assets in your game, and monitor video usage to improve performance.
---

You can use `Class.VideoFrame` to play video assets in your game, either on a `Class.SurfaceGui` in the 3D world or on a `Class.ScreenGui` interface. Because every video asset must be downloaded to each player's device before it can play, the way your game preloads and plays video has a direct impact on data usage and performance. Monitoring how often video is downloaded versus actually viewed helps you reduce unnecessary data transfer and deliver a smoother experience, especially on lower-end devices.

## Observability

The **Video Service** dashboard provides insights and analytics for monitoring and optimizing how your game downloads and plays video assets. You can find it in the **Monitoring** section of the [Creator Dashboard](https://create.roblox.com/dashboard/creations). The dashboard features two primary charts: **Playback breakdown**, which shows the proportion of efficient versus inefficient video usage, and **Playback hours**, which tracks total video playback hours over the selected period so you can see how new videos, updates, and changes to your playback logic affect usage over time.

You can scope both charts using the following filters:

<table>
  <thead>
    <tr>
      <th>Filter</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Date range</td>
      <td>The time window for the displayed data, such as the last 28 days.</td>
    </tr>
    <tr>
      <td>Place</td>
      <td>The specific place within your game to analyze.</td>
    </tr>
    <tr>
      <td>Time interval</td>
      <td>The granularity of the data points, such as days.</td>
    </tr>
  </tbody>
</table>

## Video usage categories

Both charts categorize video usage into the following dimensions. Efficient usage is video that is preloaded, played, and actually viewed by your players.

<table>
  <thead>
  <tr>
    <th>Status</th>
    <th>Description</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>Played, viewed</td>
    <td>Video that was played and was actually viewed by your players. This represents efficient video usage.</td>
  </tr>
  <tr>
    <td>Preloaded, never played</td>
    <td>Video that was downloaded (the <code>Class.VideoFrame.Video|Video</code> or <code>Class.VideoFrame.VideoContent|VideoContent</code> property was set) but never played. This data was downloaded unnecessarily.</td>
  </tr>
  <tr>
    <td>Played, never viewed</td>
    <td>Video that was played but never actually viewed by players, for example because no player was nearby or the relevant UI was not visible. This playback still consumed data and memory without providing any benefit to players.<br/><br/>If you decode a video only to play its audio, it's not counted as viewed because the visual content is never displayed. If you only need the audio, extract it and play it as a separate audio asset instead of using a video asset. This is more efficient and reduces unnecessary data and memory usage.</td>
  </tr>
  </tbody>
</table>

## Improving video efficiency

To improve video efficiency, only set the `Class.VideoFrame.Video|Video` or `Class.VideoFrame.VideoContent|VideoContent` property and call `Class.VideoFrame:Play()` when a player has a high chance of seeing or hearing the `Class.VideoFrame`, and clear the property (for example, set it to `""`) once the video is no longer visible or playing and no players are nearby.

Preloading and setting the video content ahead of time is still recommended when you are confident the video will be seen or heard, such as a mandatory cutscene later in the game or a video displayed in a central area like a home hub. In these cases, preloading helps the video play back smoothly without a loading delay when the player reaches it.
