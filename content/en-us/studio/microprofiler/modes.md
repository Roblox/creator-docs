---
title: MicroProfiler Modes
description: The MicroProfiler includes several different modes, all of which .
---

The MicroProfiler includes several modes, which can help you visualize your experience's performance characteristics in different ways. After opening the MicroProfiler with <kbd>Ctrl</kbd><kbd>Alt</kbd><kbd>F6</kbd> (<kbd>⌘</kbd><kbd>⌥</kbd><kbd>F6</kbd>), use the **Modes** menu to switch between them.

## Frame Mode

The most basic mode, **frame mode** shows a bar graph of frames flowing from the right (most recent) to the left. The height of each bar indicates the number of milliseconds that it took to complete the frame. Hover over a frame for some basic information around CPU and GPU time.

<img alt="The Microprofiler frame graph, showing blue frames and detailed frame information." src="../../assets/optimization/microprofiler/micro-frame.png" width="440px" />

- Orange bars indicate "standard" frames where the **Jobs** time exceeds the **Render** time.
- Blue bars indicate frames where the **Render** time exceeds the **Jobs** time. Hover over one of these frames, and you can see a positive value for **Waiting for Rendering Thread**.

  Blue frames are common when you run the MicroProfiler inside of Studio, but a large number of these frames in the Roblox client indicates a rendering bottleneck.

  <img alt="The Microprofiler frame graph, showing blue frames and detailed frame information." src="../../assets/optimization/microprofiler/micro-blue.png" width="440px" />

Pausing the MicroProfiler with <kbd>Ctrl</kbd><kbd>P</kbd> (<kbd>⌘</kbd><kbd>P</kbd>) while in frame mode launches **detailed mode**.

## Detailed Mode

In addition to the bar graph from frame mode, detailed mode adds a colorful timeline that shows the different tasks the engine is performing.

- Labels that appear directly below another label indicate tasks that are performed as part of the higher-level task.

  Rather than the parent process, you typically want to troubleshoot the worst-performing child processes; the sum of all child processes defines the length of the parent process.

- Scrolling zooms the timeline in or out. Combined with the millisecond labels at the top of the timeline, you can get a sense of how long a task took in an absolute sense, but also how long it took relative to other tasks.

  <img alt="The Microprofiler detailed view with numerous horizontal labels." src="../../assets/optimization/microprofiler/3MicroProfiler-Timeline.jpeg" width="440px" />

- The green overlay on the bar graph indicates the number of frames currently visible on the timeline—your zoom level. Left-click on a frame bar to jump to that position on the timeline.

  You might have to adjust your zoom level, but hovering over a bar highlights the frame on the timeline. Light grey lines delineate frames.

  <img alt="The MicroProfiler bar graph with green overlay to show zoom level." src="../../assets/optimization/microprofiler/micro-detailed.png" width="440px" />

- Left-click and drag to pan the timeline. On a machine with many CPU cores, you might need to pan up or down quite a bit to find the main thread or the worker thread performing a particular task.

  <img alt="The lefthand side of the Microprofiler detailed view, with rows for threads." src="../../assets/optimization/microprofiler/micro-panning.png" width="440px" />

- Right-click a label to zoom the timeline to exactly the duration of that task.

- Left-click a label to add it to a line graph in the bottom-right. The graph shows the time the task takes each frame. Using this graph, you can test the performance of only certain tasks in your game. When you're done, right-click the graph to hide it.

  <img alt="The graph showing how long tasks take per frame." src="../../assets/optimization/microprofiler/micro-graph.png" width="300px" />

  <Alert severity="info">
  Use the **Options** menu to change the reference line on the graph to a different number of milliseconds.
  </Alert>

- If the amount of information is overwhelming, hover over a label to find its group. Then use the **Groups** menu to filter the timeline to one or more groups, such as **Physics** or **Render**.

  <img alt="The on-hover view for a label, with Group highlighted." src="../../assets/optimization/microprofiler/micro-group.png" width="360px" />

## Timers Mode

**Timers mode** is an alternative way of visualizing the data in the detailed view: as a list of labels with processing times and call counts. Horizontal bar graphs in some columns help you spot the busiest tasks.

<img alt="Timers mode." src="../../assets/optimization/microprofiler/micro-timer.png" width="800px" />

Controls are similar to the detailed view:

- Left-click and hold to pan up and down.
- Left-click a label to add it to the line graph in the lower-right.
- Use the **Groups** menu to filter the list.
- Use the **Timers** menu to customize the columns.

<Alert severity="info">
All of the information in this view is visible when you hover over a label in the detailed view.
</Alert>

## Counters Mode

Counters mode is a lengthy list of categories and statistics, including instance count and memory usage (in bytes) for the various processes.

<img alt="Counters mode with a single graph." src="../../assets/optimization/microprofiler/micro-counter.png" width="800px" />

- Just like the detailed view, left-click and hold to pan up and down.
- Left-click in the Graph column to add a small usage graph with minimum and maximum values. Left-click the graph again to expand it.
- Right-click a graph to close it.
- You can't filter this view, but you can left-click on a category (for example, `memory`) to collapse it.

While counters mode can be useful, the [Developer Console](../../studio/optimization/memory-usage.md) is the recommended way to [identify memory issues](../../performance-optimization/identifying.md#memory). You might also find the [x-ray view](index.md#using-the-web-ui) in the web UI helpful for identifying when problematic memory allocation occurs.

## Hidden Mode

Hidden mode keeps the MicroProfiler menu open, but hides the bar graph. It's useful for reducing visual clutter, [saving frame data](index.md#saving-frame-data), and pausing and unpausing while you observe the line graph.
