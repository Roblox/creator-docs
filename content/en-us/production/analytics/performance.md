---
title: Performance Dashboard
description: Explains how to improve performance analytics metrics for your experience.
---

The **Performance** dashboard provides up-to-the-minute client and server metrics for your experience. Monitor this page before and after updating your experience to identify performance issues early.

![An overview of the performance dashboard.](../../assets/analytics/performance/perf-dash-overview.png)

## Accessing the Dashboard

To access the Performance page, you must either be the experience owner or have [analytics group permissions](../../production/analytics/analytics-dashboard.md#granting-group-permission).

1. Navigate to the [Creations](https://create.roblox.com/dashboard/creations) page on the **Creator Hub**.
2. Under the **Creator Hub** dropdown, select your account or the group that owns the experience.
3. Select the experience.
4. In the **Monitoring** dropdown, select **Performance**.

## Using the Dashboard

The dashboard begins with the current number of users, the number of servers they are spread across, and a device breakdown. For the dashboard to show client and server **charts** like the ones below, your experience must have at least 100 daily active users (DAU).

The dashboard contains two tabs, **Client** and **Server**, along with menus to adjust date range and time interval. You can also use the **Place** menu to examine individual places rather than the entire experience.

![A marked up view of the performance dashboard UI.](../../assets/analytics/performance/perf-dash-ui.png)

The **Filter By** menu lets you swap between averages or percentile values.

<img src="../../assets/analytics/performance/perf-dash-filter.png" alt="A view of the filters menu." width="300px" />

When reviewing charts or filtering:

- P90 refers to the number of values that fall within the 90th percentile. If P90 server heartbeat is 59, then 90% of servers are running at or below 59 FPS.
- Similarly, P10 refers to the 10th percentile. If P10 server heartbeat is 40, then 10% of servers are running at or below 40 FPS.
- P50 is the median. Half of all values fall above it, half below.

<Alert severity="info">
Percentile values are calculated smallest to largest, so for metrics where lower numbers are better (e.g. server CPU time), P10 represents the "best case" and P90 the "worst case" rather than the other way around.
</Alert>

## Client Charts

The **Client** tab includes the following charts, all of which are broken down by platform or operating system:

<table>
    <thead>
        <tr>
            <th>Chart</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Concurrent users</td>
            <td>Line graph showing the number of users in your experience.</td>
        </tr>
        <tr>
            <td>Session time</td>
            <td>Duration that users spend in your experience.</td>
        </tr>
        <tr>
            <td>Client frame rate</td>
            <td>Line graph showing client frames per second. Persistent low frame rates or large drops may signal issues. For information on investigating client frame rate, see [Client Compute](../../performance-optimization/identifying.md#client-compute).</td>
        </tr>
        <tr>
            <td>Client crash rate</td>
            <td>Line graph showing client crash rate by device type. Spikes in crash rate, particularly following an update to the experience, often indicate an issue.</td>
        </tr>
        <tr>
            <td>Client memory usage</td>
            <td>Line graph showing client memory usage by device type. Continual increases can indicate a memory leak. See [Memory](../../performance-optimization/identifying.md#memory).</td>
        </tr>
        <tr>
            <td>Client memory usage percentage</td>
            <td>Line graph showing percentage of available device memory the client is using. For example, if the Android line approaches 100%, the majority of Android devices running your experience are at risk of running out of memory and crashing.</td>
        </tr>
    </tbody>
</table>

## Server Charts

The **Server** tab includes the following charts:

<table>
    <thead>
        <tr>
            <th>Chart</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Server CPU time</td>
            <td>Stacked area chart showing milliseconds (ms) of processing time per frame. Values over 16.67 ms are highly undesirable; they can cause server frame rates to drop below 60.</td>
        </tr>
        <tr>
            <td>Server memory usage</td>
            <td>Stacked area chart showing server memory usage in MB. Try to keep this value below 3 GB. If this number stays above 3 GB or continually increases over time, investigate ways to [improve memory usage](../../performance-optimization/improving.md#script-memory-usage).</td>
        </tr>
        <tr>
            <td>Server frame rate</td>
            <td>Line graph showing server frame rate in FPS. Ideally, this value is always 60. Server frame rate is capped at 60, and drops can reduce client frame rate and increase latency. See [Script Computation](../../performance-optimization/improving.md#script-computation).</td>
        </tr>
        {/*
        <tr>
            <td>Server memory by age</td>
            <td>Stacked area chart showing time that memory remains allocated before the engine garbage collects it. If one process group ages more than the other process groups over time, investigate a possible memory leak.</td>
        </tr>
        */}
        <tr>
            <td>Cores used per server</td>
            <td>Line graph showing server CPU core count usage. Low core count usage combined with high server CPU time is an indicator that you should investigate [Multithreading](../../scripting/multithreading.md).</td>
        </tr>
        <tr>
            <td>Compute efficiency</td>
            <td>Line graph showing the efficiency of your experience compared to the Roblox average. Values above 100% indicate higher efficiency than the baseline. Contributing factors include maximum number of players per server (higher is more efficient) and server CPU time per frame (lower is more efficient). Higher compute efficiency means lower environmental impact, but this metric is not indicative of a good or bad player experience.</td>
        </tr>
    </tbody>
</table>

The server CPU and memory charts default to the **Overall** view, but have dropdown menus for individual process groups, such as physics, rendering, and scripts. The sum of these categories is **not** comprehensive; the server performs a small—typically insignificant—amount of additional work per frame that isn't included in any category. As such, the overall millisecond and MB values are slightly lower than reality, but close enough to give you a clear understanding of server performance.

If a category is higher than usual or appears to be taking up a disproportionate amount of time, use the dropdown menu to drill down on the group and identify processes that could be causing issues.

<img src="../../assets/analytics/performance/perf-dash-drilldown.png" alt="The server CPU time chart showing the physics dropdown." width="600px" />

<Alert severity="success">
To exclude a group or process from a chart, click its label in the legend.
</Alert>

The categories in the dropdown menu map to the ones in the [MicroProfiler](../../studio/microprofiler/index.md), so you can open the MicroProfiler, select **Detailed** or **Timers** modes, and then use the **Groups** menu to filter by the problematic process group.

For example, if you spot a potential problem with the **assemble** process under the **Physics** group, you can find it under the same name in the MicroProfiler:

<img src="../../assets/analytics/performance/perf-dash-micro.png" alt="The MicroProfiler showing the assemble process within the Physics group." width="500px" />

## Troubleshooting

If you spot a potential problem, use the following steps to remediate and fix it:

1. Check your recent updates and consider rolling them back if the impact to metrics is severe.
2. See the [Identifying Performance Issues](../../performance-optimization/identifying.md) and [Improving Performance](../../performance-optimization/improving.md) for information on troubleshooting problems with server compute, client compute, and memory usage.
3. Use built-in testing tools to further drill down on problems:

   - [Developer Console](../../studio/developer-console.md) for viewing error and log messages and detailed information on memory and networking.
   - [Script Profiler](../../studio/optimization/scriptprofiler.md) for identifying scripts that take up the most resources.
   - The [MicroProfiler](../../studio/microprofiler/using-microprofiler.md) for viewing unoptimized portions of your experience visually.

4. Gather user feedback from your community.
