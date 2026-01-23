---
title: MicroProfiler
description: The MicroProfiler is a Studio and client tool for optimizing your experience.
---

The **MicroProfiler** is a performance optimization and troubleshooting tool in Roblox Studio and the Roblox client. It provides detailed, visual timing information for all the [engine tasks](task-scheduler.md) that run during a frame, like animating characters, updating physics, running scripts, and rendering geometry. You can identify which tasks ran during which frame, how long these tasks took to run, and whether any caused you to miss your frame time goals.<br />

<Grid container spacing={2} style={{ marginBottom: 24, width: '100%' }}>
<Grid item xs={6} style={{ padding: 16 }}>
<Grid item container wrap="nowrap" direction="column" style={{ gap: 8, flex: 1 }}>

<div
className="container"
style={{ position: "relative", paddingBottom: "56.25%", height: 0, marginBottom: 12 }} >
<iframe
src="https://www.youtube-nocookie.com/embed/XLCZfGEm9tU?si=d992GKSU7oveIrhd"
title="YouTube video player"
frameBorder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
allowFullScreen
style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} ></iframe>
</div>
</Grid>
</Grid>

<Grid item xs={6} style={{ padding: 16 }}>
<Grid item container wrap="nowrap" direction="column" style={{ gap: 8, flex: 1 }}>

<div
className="container"
style={{ position: "relative", paddingBottom: "56.25%", height: 0, marginBottom: 12 }} >
<iframe
src="https://www.youtube-nocookie.com/embed/eWf-6Sh-9Os?si=GZYvQw6ZvQiZF1uv"
title="YouTube video player"
frameBorder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
allowFullScreen
style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} ></iframe>
</div>
</Grid>
</Grid>
</Grid>

## Frame times

To use the MicroProfiler, you must understand the relationship between **frame time** and **frame rate**.

- Frame time is how long a frame took to render on screen, generally measured in milliseconds.
- Frame rate is the number of frames rendered on screen, generally measured in frames per second (FPS).

Lower frame times mean higher frame rate. Divide 1,000 milliseconds (1 second) by frame time to get frame rate.

Average frame time | Frames per second
:--- | :---
33.33 ms | 30 FPS
16.67 ms | 60 FPS
8.33 ms | 120 FPS
4.17 ms | 240 FPS

For smooth gameplay, however, it's not enough to have a high frame rate. You need **consistent frame times**. For example, if 59 frames arrive in 10 milliseconds and one frame in 410 milliseconds, players perceive a huge, jarring stutter, even though the experience is running at 60 FPS. If all frames take roughly the same amount of time to render, your experience will feel perceptibly smoother due to that consistency, especially at lower frame rates.

The MicroProfiler focuses **entirely on frame time**. Its purpose is to help you identify frame time spikes and what caused them.

## Open the MicroProfiler

Opening the MicroProfiler varies by platform:

- On the mobile client, open the **Settings** menu and change the MicroProfiler to **On**. Then from a development machine **on the same network**, use your web browser to navigate to the provided IP address and port.

  <img alt="The MicroProfiler UI on mobile." src="../../assets/optimization/microprofiler/micro-mobile.png" width="700px" />

  This screenshot shows an IP address of `172.18.56.105` and a port of `1338`, so you navigate to `172.18.56.105:1338`. Depending on your device's network configuration, you might see multiple IP addresses. If one doesn't work, try the next.

  <Alert severity="info">
  By default, the MicroProfiler web UI shows the 30 most recent frames from your mobile device. For a larger set of frames, add a slash and a number to the URL, such as `172.18.56.105:1338/90`. To get a fresh set of frames, use the **Re-capture** button.
  </Alert>

- On the desktop client, press <kbd>Ctrl</kbd><kbd>F6</kbd> (<kbd>⌘</kbd><kbd>F6</kbd>).
- In Studio, press <kbd>Ctrl</kbd><kbd>F6</kbd> (<kbd>⌘</kbd><kbd>F6</kbd>).

Generally, the mobile client is the best place to profile your experience. Most players on Roblox use phones and tablets, and these devices have severe thermal and power constraints that limit their performance. If your experience runs well on a midrange Android tablet, it almost certainly performs much, much better on a gaming desktop.

<Alert severity="success">
Powerful devices like gaming desktops can actually obscure performance problems, especially if you have a frame rate cap in place. For example, if you cap FPS to 60 on the client, you might not notice the difference between a frame time of 4 milliseconds and 16 milliseconds, even though the latter is four times as long, because they all arrive in under 16.67 milliseconds. On a mobile device that is struggling to stay at 30 FPS, a frame that takes four times as long (133 ms) is hard to miss.
</Alert>

## MicroProfiler basics

The MicroProfiler has two key components: the **frame time bar graph** and the **detailed task timeline**.

- The frame time graph runs along the top of the interface and shows how long each frame took to render. Taller bars mean longer frame times.
- The timeline shows all of the individual tasks that ran during the frame. Wider bars represent tasks that took longer to run.

A typical workflow in the MicroProfiler is to use the frame time graph to identify a spike (a taller bar) and then use the timeline to identify which tasks caused the spike. Then you can check the [Tag reference](tag-table.md) for information on the task and how to improve its performance.

<img alt="Example of a frame time spike." src="../../assets/optimization/microprofiler/micro-spike.png" width="600px" />

### Frame time graph

The height of each bar indicates the number of milliseconds that it took to complete the frame. More recent frames are on the right. Hover over a frame for some basic information around CPU and GPU usage.

<img alt="The Microprofiler frame graph, showing blue frames and detailed frame information." src="../../assets/optimization/microprofiler/micro-frames.png" width="500px" />

- Orange bars are frames where the **Jobs Wall Time** exceeds the **Render Wall Time**. In these frames, at least one of the [worker threads](#threads), which do things like run scripts, calculate physics, and play animations, took longer to run than the [main render thread](#threads).

  If the experience is not reaching your frame time goals and has a large number of orange frames, common causes are scripts, physics, and animations. See [Improve performance](../../performance-optimization/improve.md#script-computation).

- Blue bars are frames where the **Render Wall Time** exceeds the **Jobs Wall Time**. In these frames, the main render thread took more time than any of the worker threads.

  If the experience is not reaching your frame time goals and has a large number of blue frames, that indicates a rendering bottleneck. Common causes are excessive object density, object movement, and lighting. See [Improve performance](../../performance-optimization/improve.md#rendering).

- Red bars are frames where two conditions are true:

  - **Render Wall Time** exceeds **Jobs Wall Time**
  - **GPU Wait Time** is greater than 2.5 milliseconds

  Red bars are less common than orange and blue and often the result of excessive object complexity, texture size, and visual effects. Optimization is similar to blue bars. See [Improve performance](../../performance-optimization/improve.md#rendering).

Tiny tasks at the end of a frame can sometimes throw off the **Jobs Wall Time** and **Render Wall Time**, which is a good reason to focus more on frame time than frame color. There's no "good" color to strive for. A mixture of orange, blue, and red isn't problematic as long as you're reaching your frame time goals. If you **aren't** reaching your frame time goals, the colors can indicate where to optimize.

### Timeline

- Left-click and drag to pan the timeline. On a machine with many CPU cores, you might need to pan up or down quite a bit to find the [thread](#threads) performing a particular task.

  <img alt="The lefthand side of the Microprofiler detailed view, with rows for threads." src="../../assets/optimization/microprofiler/micro-panning.png" width="700px" />

- Scrolling zooms the timeline in and out. Combined with the millisecond labels at the top of the timeline, you can get a sense of how long a task took in an absolute sense, but also how long it took relative to other tasks.

  <img alt="The Microprofiler detailed view with numerous horizontal labels." src="../../assets/optimization/microprofiler/micro-timeline.png" width="500px" />

- The green overlay on the bar graph indicates the number of frames currently visible on the timeline—your zoom level. Left-click on a frame bar to jump to that position on the timeline.

  You might have to adjust your zoom level, but hovering over a bar highlights the frame on the timeline. Light grey lines delineate frames.

  <img alt="The MicroProfiler bar graph with green overlay to show zoom level." src="../../assets/optimization/microprofiler/micro-detailed.png" width="600px" />

- Labels that appear directly below another label indicate tasks that are performed as part of the higher-level task.

  Rather than the parent task, you typically want to troubleshoot the worst-performing child tasks; a parent task can't be shorter than the sum of its child tasks.

- Right-click a label to zoom the timeline to exactly the duration of that task.

- If the amount of information is overwhelming, use the **Groups** or **Threads** menu to filter the timeline. For example, you might only want to see **Render** tasks in the main thread.

  <img alt="The on-hover view for a label, with Group highlighted." src="../../assets/optimization/microprofiler/micro-group.png" width="500px" />

- Use <kbd>Ctrl</kbd><kbd>F</kbd> (<kbd>⌘</kbd><kbd>F</kbd>) to jump to the occurrence of a task that takes up the most time in the dump. For example, `computeLightingPerform` runs in every client frame. If you search for it in a dump with 128 frames, you can jump to the frame where it took the longest to complete.

## Threads

Like many programs, Roblox uses multiple threads to perform sequences of tasks at the same time. The MicroProfiler displays the thread name on the lefthand side of the timeline.

<img alt="The lefthand side of the Microprofiler detailed view, with rows for threads." src="../../assets/optimization/microprofiler/micro-panning.png" width="600px" />

There are three important thread types:

- **Main** ("RBX Main"): Handles CPU-based rendering tasks. Processes input, `Class.Humanoid|Humanoids`, animations/tweening, physics ownership, sound, and waiting script resumes. Also updates Studio interfaces and coordinates the other threads.

- **Worker** ("RBX Worker"): Helps the main thread with networking, physics, and pathfinding. Due to the number of cores in modern CPUs, you likely have many worker threads, most of which are in a sleep state at any given time.

- **Render** ("GPU"): Follows a "prepare, perform, present" logic. Communicates with the graphics processing unit (GPU) of the device.

  - Prepare: Information from the main thread is used to update rendering models.
  - Perform: Issue rendering commands, including 2D interfaces.
  - Present: Synchronizes with the GPU.

## Custom script profiles

If your scripts are running complicated tasks, you can profile critical portions of the code to ensure that they're not taking too long. Wrap code with `Library.debug.profilebegin()` and `Library.debug.profileend()` to time everything done between those function calls and create a label on the MicroProfiler timeline.

```lua
local RunService = game:GetService("RunService")

local function onPreSimulation()
  debug.profilebegin("Hard Work")
  -- Example hard work: swap two variables 200,000 times
  local a, b = 0, 1
  for _ = 1, 200000 do
    a, b = b, a
  end
  debug.profileend()
end
RunService.PreSimulation:Connect(onPreSimulation)
```

<img alt="Many labels on the MicroProfiler, with a custom label taking up the majority of the processing time." src="../../assets/optimization/microprofiler/custom-profile.png" width="500px" />

From its duration on the timeline, you can tell that the function is using a lot of processing time compared to other tasks.

## Save frame data

If you want to save a set of frame data for later review (or to share with someone else), use the **Save to file** button. The MicroProfiler saves frame data to a standalone HTML file named `microprofile-<date>-<time>.html`.

<img alt="The save to file button in the web UI." src="../../assets/optimization/microprofiler/micro-save-to-file.png" width="700px" />

On the desktop client or in Studio, use the **Dump** menu. In both cases, the MicroProfiler automatically saves the file to the Roblox logs directory:

- On Windows, check `%LOCALAPPDATA%\Roblox\logs`.

  If you use the Universal Windows Platform (UWP) app, check `\Users\<username>\AppData\Local\Packages\ROBLOXCORPORATION.ROBLOX_<hash>\LocalState\logs\`.

- On macOS, check `~/Library/Logs/Roblox`.

<Alert severity="info">
Dumps only contain data for the selected number of frames, **not** the entire duration that the experience has been running. The exception is [counters mode](modes.md#counters-mode), which includes data from when Studio or the client started running to the time of the dump.
</Alert>

## Profile the server

In addition to profiling the client, you can capture brief dumps of server activity:

1. On the desktop client, join an experience that you have edit permissions for.
1. Open the Developer Console with <kbd>Ctrl</kbd><kbd>F9</kbd> (<kbd>⌘</kbd><kbd>F9</kbd>).
1. In the dropdown menu, select **MicroProfiler**.
1. In the **Server** tab, specify the number of frames to capture (maximum 60) and the number of seconds to delay before starting the capture (maximum 4).
1. Click **Begin server recording**.

   <img alt="The Developer Console MicroProfiler screen." src="../../assets/optimization/microprofiler/micro-server.png" />

   After a few seconds, the Developer Console provides the path to the file, which is the same path as a [standard dump](#save-frame-data).

## Web-only features

The MicroProfiler has two user interfaces: the web UI (mobile and dumps) and the desktop UI (client and Studio). We recommend using the web UI whenever possible. In general, the two work similarly, but the web UI has a few extra features:

- Use the **X-Ray** menu to enable or disable color coding for memory allocation.

  <img alt="The MicroProfiler web view with x-ray enabled." src="../../assets/optimization/microprofiler/micro-xray.png" width="600px" />

  - Lighter frames within the main bar graph indicate higher memory allocation.
  - Lighter portions of the preview bar and lighter labels on the timeline indicate portions of the frame with higher memory allocation.
  - In X-ray mode, press <kbd>C</kbd> to show the total size of the memory allocations rather than the number of allocations.

- Use the **Export** menu to export a CPU or memory flame graph, a specialized visualization that aggregates all of the call stacks included in the dump, maintains the parent-child hierarchy, and sizes them based on duration. Flame graphs are especially useful for identifying tasks that don't cause you to miss your frame time goals (and are therefore hard to notice), but run so often that their processing time becomes significant.

  <img alt="The MicroProfiler flame graph in the web UI." src="../../assets/optimization/microprofiler/micro-flame.png" />

  You can also create flame graphs in Studio, although only for scripts (execution time and memory allocations). Compared to the web-based flame graphs, the ones in Studio are top-down rather than bottom-up and support dramatically longer capture times.

  <img alt="The MicroProfiler flame graph in Studio." src="../../assets/optimization/microprofiler/micro-studio-flame.png" />

- Drag and drop a second dump file into the web UI to generate a diff flame graph, which can help you identify improvements or regressions to your experience's performance over time. Click **Combine & Compare** to export a new HTML file.

  <img alt="The MicroProfiler diff flame graph builder showing the left and right sides." src="../../assets/optimization/microprofiler/micro-flame-diff.png" />

  <Alert severity="success">
  You can combine several dump files—for example, four on each side, from before and after a major update—to get a more aggregated comparison. Comparing data between different places can be useful, too, but don't **combine** data from different places!
  </Alert>

  The diff flame graph highlights the dump (left or right) that consumes more CPU or memory, with brighter colors indicating a larger difference.

  <img alt="The MicroProfiler diff flame graph." src="../../assets/optimization/microprofiler/micro-flame-diff2.png" />

## Desktop-only features

On the desktop timeline, left-click a label to add it to a line graph in the bottom-right. The graph shows the time the task takes each frame. Using this graph, you can test the performance of only certain tasks in your experience. When you're done, right-click the graph to hide it.

<img alt="The graph showing how long tasks take per frame." src="../../assets/optimization/microprofiler/micro-graph.png" width="300px" />

This graph is synchronized with the main profiler bars. The currently selected frame range is highlighted in green on the graph. You can also click anywhere on this graph to re-center the main profiler view to that specific frame, which is helpful for finding spikes in the detailed view.

<Alert severity="info">
Use the **Options** menu to change the reference line on the graph to a different number of milliseconds.
</Alert>
