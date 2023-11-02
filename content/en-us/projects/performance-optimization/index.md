---
title: Performance Optimization
description: Explains performance issues and how to identify them using Roblox tools.
---

Performance issues can generally be categorized into the following categories:

- [Computation](../performance-optimization/computation.md) - Expensive
  computational operations can lead to lower frame rates.
  - On the server, low frame rate (also known as heartbeat), slows down how
    quick replication and physics. This causes degraded performance and latency
    for users.
  - On the client, low and fluctuating frame rates reduce the smoothness and
    responsiveness of your experience.
- [Memory](../performance-optimization/memory.md) - Excessive memory usage and
  memory leaks can lead to crashes:
  - On the server, crashes can occur and disconnect all the clients from the
    experience.
  - On the client, crashes can occur, particularly on lower end devices.
- [Load Times](../performance-optimization/load-times.md) - Excessive experience
  load times can lead to poor user retention as users have to wait for longer to
  start playing your experience.

## Diagnostic Tools

In general, you can identify client issues by observing client device behavior,
but you need the following diagnostic tools to diagnose server issues.

<table>
  <tr>
    <th>Tool</th>
    <th>Description</th>
    <th>Location</th>
    <th>Environment</th>
  </tr>
  <tr>
    <td><a href="../../production/analytics/performance.md">Performance Dashboard</a></td>
    <td>A dashboard with aggregate charts for client and server memory usage, client frame rate, server heartbeat, and crash rates in real-time. It's helpful for analyzing patterns and over-time behaviors of your performance to identify issues.</td>
    <td>Creator Dashboard</td>
    <td>Live sessions</td>
  </tr>
  <tr>
    <td><a href="../../studio/developer-console.md">Developer Console</a></td>
    <td>A console provides real-time log messages, errors and detailed information on memory, networking, and script performance. It's useful to view memory consumption, key server health stats, script performance stats, and to launch the client or server MicroProfiler.</td>
    <td>Studio</td>
    <td>Live sessions Studio testing</td>
  </tr>
  <tr>
    <td><a href="../../studio/microprofiler/index.md">MicroProfiler</a></td>
    <td>A debugging tool that breaks down how much computational time is spent on tasks each frame. It can generate dumps for analysis showing a precise breakdown of individual frames, making it helpful for identifying the specific task causing performance issues. You can run the profiler on either the client or the server, depending on which side you identify that there's an issue.</td>
    <td>In-Experience Settings</td>
    <td>Live sessions and Studio testing</td>
  </tr>
  <tr>
    <td>**Performance Stats Bar**</td>
    <td>A toolbar with quick and basic performance statistics, including memory consumption, CPU, GPU, network data sent and received, and ping time.</td>
    <td>In-Experience Settings</td>
    <td>Live sessions and Studio testing</td>
  </tr>
</table>
