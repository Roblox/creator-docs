---
title: Server crashes chart
description: Explains how to identify the root cause of server crashes using the Crashes chart and server memory snapshots.
---

The **server crashes chart** and **server out-of-memory snapshots** can help you identify the root cause of server crashes and improve your experience's stability.

When a server detects it is running out of memory, the engine automatically captures a compact `JSON` summary of the data model before the server shuts down. If you see a spike in your server out-of-memory crashes, you can use the chart and memory snapshots to diagnose the issue:

- **Select a snapshot**: Use the server out-of-memory snapshot list to find a crash, then examine memory usage by the latest timestamp, place ID, place version, server version, or server uptime to either find long-term memory leaks or line up the crash with reports from players or your own testing window.
- **Visualize the memory usage**: Click on a snapshot to open the treemap viewer that shows nodes weighted by memory usage. You can drill into nodes to see which services, folders, or assets dominated memory at crash time.
- **Investigate in Studio**: Use the breadcrumbs at the top of the viewer to highlight parent containers that hold potentially bloated assets. With this context, you can jump into Studio to investigate and fix the specific script or asset causing the issue.

<img src="../../assets/analytics/crashes/crashes-chart.png" alt="A view of the server crashes chart." width="100%" />

## Access the chart

To access the server crashes chart, you must either be the experience owner or have [analytics group permissions](../../production/analytics/analytics-dashboard.md#grant-group-permission).

1. Navigate to the [Creations](https://create.roblox.com/dashboard/creations) page on the **Creator Hub**.
2. Under the **Creator Hub** dropdown, select your account or the group that owns the experience.
3. Select the experience.
4. In the **Monitoring** dropdown, select **Crashes**.

## Use the chart

The server crashes chart provides a deep-dive visibility into potential causes for server crashes. Crashes are broken down by crash reason:

- **Out-of-memory crashes** - Servers are crashing due to high memory usage that you can take direct action to fix.
- **Platform crashes** - Servers are crashing due to engine-level errors or corrupted memory when they enter an unrecoverable state. Roblox monitors and takes direct action to fix these crashes.

<Alert severity="info">
If you see a significant uptick in platform crashes, [file a bug report](https://devforum.roblox.com/t/how-to-post-a-bug-report/24388).
</Alert>

You can use the chart's menus to adjust date range, time interval, and annotations, and the **Place** menu to examine individual places rather than the entire experience.

<img src="../../assets/analytics/crashes/crashes-chart-filters.png" alt="A close-up view of the server crashes chart's filters." width="100%" />

Directly below the chart is a list of server out-of-memory snapshots that you can examine either by timestamp, server version, server uptime, place ID, or place version. When you select any of these snapshots, the treemap view displays with nodes weighted by memory usage.

<img src="../../assets/analytics/crashes/memory-snapshot.png" alt="A close-up view of an example snapshot list and open memory snapshot." width="100%" />

To demonstrate how you can use the chart and server out-of-memory snapshots to dianose a memory leak:

1. Review the chart to identify any spikes.
2. Use the **Place** menu to filter by place version so that you can confirm the location of your memory leak.
3. Scroll down to the memory snapshots and examine the list by **Server uptime** to review servers that ran for several hours before hitting the memory limit. This provides evidence of a memory leak.
4. Open the snapshot in the treemap view to highlight the largest nodes.
5. Investigate these nodes in Studio to see where you can add cleanup logic.

<Alert severity="info">
You can also download the raw CSV summary of the memory snapshots for your own analysis, including feeding the data into your favorite LLM or writing your own parsing script.
</Alert>
