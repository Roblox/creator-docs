---
title: Identifying Performance Issues
description: Explains how to use Roblox tools to identify performance issues.
---

Identifying performance issues generally means drilling down on one of three categories: frame rate (compute), memory, or load time.

Roblox has a number of tools for identifying performance issues, some of which are available in the Roblox client (and therefore Studio) and some of which are only available in Studio. Whereas you can observe client behavior directly, you must use tools to diagnose server issues.

## Diagnostic Tools

<table>
  <tr>
    <th>Tool</th>
    <th>Description</th>
    <td>Location</td>
    <th>Keyboard shortcut</th>
    <th>Environment</th>
  </tr>
  <tr>
    <td>[Developer Console](../studio/developer-console.md)</td>
    <td>A console with real-time log messages, errors, and detailed information on memory, networking, and script performance. It's useful for viewing memory consumption, key server health stats, script performance stats, and to launch the client or server MicroProfiler.</td>
    <td>Studio</td>
    <td><kbd>F9</kbd></td>
    <td>Live sessions, Studio testing</td>
  </tr>
  <tr>
    <td>[MicroProfiler](../studio/microprofiler/index.md)</td>
    <td>A debugging tool that breaks down how much computational time is spent on tasks each frame. It can generate dumps for analysis showing a precise breakdown of individual frames, making it helpful for identifying the specific task causing performance issues. You can run the profiler on either the client or the server, depending on which side has an issue.</td>
    <td>In-experience</td>
    <td><kbd><kbd>Ctrl</kbd><kbd>Alt</kbd><kbd>F6</kbd> (<kbd>⌘</kbd><kbd>⌥</kbd><kbd>F6</kbd>)</kbd></td>
    <td>Live sessions, Studio testing</td>
  </tr>
  <tr>
    <td>Performance Stats Bar</td>
    <td>A toolbar with basic performance statistics, including memory consumption, CPU, GPU, network data sent and received, and ping time.</td>
    <td>In-experience</td>
    <td><kbd>Ctrl</kbd><kbd>Alt</kbd><kbd>F7</kbd> (<kbd>⌘</kbd><kbd>⌥</kbd><kbd>F7</kbd>)</td>
    <td>Live sessions, Studio testing</td>
  </tr>
  <tr>
    <td>Debug Stats</td>
    <td>Overlays with detailed information around graphics, physics, network traffic, and FPS.</td>
    <td>In-experience</td>
    <td><kbd>Shift</kbd><kbd>F1</kbd>, <kbd>Shift</kbd><kbd>F2</kbd>, <kbd>Shift</kbd><kbd>F3</kbd>, <kbd>Shift</kbd><kbd>F4</kbd>, <kbd>Shift</kbd><kbd>F5</kbd></td>
    <td>Live sessions, Studio testing</td>
  </tr>
  <tr>
    <td>[Performance Dashboard](../production/analytics/performance.md)</td>
    <td>A dashboard with aggregate charts for client and server memory usage, client frame rate, server heartbeat, and crash rates in real-time. It's helpful for analyzing performance patterns over time. See [Monitoring Performance](monitoring.md).</td>
    <td>Creator Dashboard</td>
    <td>N/A</td>
    <td>Live sessions</td>
  </tr>
</table>

## Server Compute

Server heartbeat is capped at 60 FPS for all experiences, so lower values might indicate a performance issue. To check server heartbeat:

- With the [Developer Console](../studio/developer-console.md) - In the **Server Jobs** tab, expand the **Heartbeat** row and check the **Steps Per Sec** value, which represents the heartbeat of your experience.

- With the server [MicroProfiler](../studio/microprofiler/index.md) - Look at the length of each frame to see if some are taking longer than 16.67 ms.

  <Alert severity="info">
  The MicroProfiler is particularly useful for identifying "spikes" in performance, where some frames take significantly longer than others to process.
  </Alert>

Another symptom of degraded server heartbeat is increased latency (commonly known as ping). The longer the server takes to finish computing its tasks each frame, the longer it takes to process network data sent and received from clients. To check average ping for all players connected to a server, go to the **Server Stats** tab in the [Developer Console](../studio/developer-console.md).

## Client Compute

The default client frame rate cap is 60 FPS. However, users can raise their frame rate cap up to 240 FPS.

Frame rate differs wildly between devices. For example, a high-end PC might be able to "brute force" a computational issue and only experience an imperceptible frame rate dip. If you test on lower-end devices, problems tend to be more severe and thus easier to notice.

To check the frame rate of your experience:

- In the client, press <kbd>Shift</kbd><kbd>F5</kbd> to show the debug stats summary.
- In the Studio **View** tab, select **Stats** > **Summary** to enable debug stats.

  <Alert severity="warning">
  Performance stats in Studio are skewed by the Studio application, so you should view the frame rate on the client if you have a production experience.
  </Alert>

- With the [MicroProfiler](../studio/microprofiler/index.md), you can check the graph to see if the frame takes longer than 16.67 ms.

<Alert severity="info">
When evaluating frame rate, it can help to set the graphics quality to its maximum value to remove the effect of the frame rate manager. In the client, open the menu, click **Settings**, change  **Graphics Mode** to manual, and raise graphics quality.
</Alert>

## Memory

There are several ways to check memory usage for an experience:

1. Open the [Developer Console](../studio/developer-console.md) and switch to the **Memory** tab. This tab gives a breakdown of how memory is being allocated. Use the client rather than Studio to get the most accurate readouts.
2. Enable the **Performance Stats** view from the settings menu in the client to see an overlay with total client memory usage.

High memory usage is not necessarily indicative of a problem, but some indications that you may need to investigate more are:

- A significant percentage of client crashes showing in the **Performance Dashboard**, particularly a sudden uptick that coincides with an update. Some number of crashes are expected, but you should investigate if your crash rates increase above 2-3%.
- A crash occurs while testing on a device that you want your experience to support.
- Your server memory usage exceeds 3 GB.

A significant portion of an experience's memory consumption on the client are from assets, such as images and meshes, loaded into graphics memory so they can be rendered. In the **Developer console**, you can view the graphics memory consumed by assets under the following labels:

- **GraphicsMeshParts** - Graphics memory consumed by meshes.
- **GraphicsTexture** - Graphics memory consumed by textures.

## Load Times

There are no built-in tools for checking load times, but because they don't require millisecond-level precision, a stopwatch is usually all you need to understand your current baseline and check whether you made a substantive improvement. You can use a client script in `Class.ReplicatedFirst` to get some sense of how your changes impact load times, but this script doesn't provide a complete, end-to-end measurement:

```lua
local startTime = os.clock()

game.Loaded:Connect(function()
  local loadTime = os.clock() - startTime
  local roundedLoadTime = math.round(loadTime * 10000) / 10000 -- four decimal places
  print("Game loaded in " .. roundedLoadTime .. " seconds.")
  print("Number of instances loaded: " .. #game.Workspace:GetDescendants())
end)
```

For additional insight, enable **Studio Settings** > **Network** > **Print Join Size Breakdown**, which prints the top 20 instances by size and a percentage breakdown by instance type when you start the experience in Studio.
