---
title: Performance
description: Explains how to improve performance analytics metrics for your experience.
---

**Performance** allows you to view up-to-the-minute user, server, and client metrics for your experience. Monitor this page before and after updating your experience to identify performance issues early.

## Viewing Performance Metrics

To view your experience's performance monitoring page:

1. Navigate to your [Creations](https://create.roblox.com/dashboard/creations) page on **Creator Dashboard** and select your experience.
2. Select **Performance**.

You can view analytics for individual or group owned experience. To view the latter, you need to have [group permissions for analytics](../../production/analytics/analytics-dashboard.md#granting-group-permission).

## Monitoring Performance

The dashboard includes the following metrics, with version update annotations in each chart:

<table>
    <thead>
        <tr>
            <th>Metric</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Concurrent users</td>
            <td>Number of users in your experience at any given time.</td>
        </tr>
        <tr>
            <td>Session time</td>
            <td>Length of time users spend in your experience per session.</td>
        </tr>
        <tr>
            <td>Server frame rate</td>
            <td>Frames per second processed by the server.</td>
        </tr>
        <tr>
            <td>Server memory usage</td>
            <td>Memory consumed by the server.</td>
        </tr>
        <tr>
            <td>Client frame rate</td>
            <td>Frames per second processed by each client. Large drops may signal issues.</td>
        </tr>
        <tr>
            <td>Client crash rate</td>
            <td>Sessions that crash as a percent of overall sessions. Large spikes may signal issues.</td>
        </tr>
        <tr>
            <td>Client memory usage</td>
            <td>Memory consumed by each client. Large spikes may signal issues.</td>
        </tr>
        <tr>
            <td>Compute efficiency</td>
            <td>Efficiency of server resource utilization. Above 100% is more efficient.</td>
        </tr>
    </tbody>
</table>

Data in these charts can be difficult to parse for experiences with low user counts, so your experience needs around 100 daily active users or 10 concurrent users to see server and client charts clearly. Consider troubleshooting for performance issues when seeing the following chart behaviors over a short period of time:

1. Drop of concurrent users or session time.
2. Decrease of server frame rate.
3. Spike of server memory usage.

<img src="../../assets/analytics/performance/server-stats.png" width= "120%" alt="An example of server stats with potential performance issue." />

## Identifying Potential Performance Issues

You can use the following filters at the top of the page to help you identify potential performance issues:

| Filter     | Description                                                                                                                                                                                                |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Date       | View metrics for last hour, last day, last 7 days, or last 30 days. If you select **last hour**, the charts auto-update every minute. Otherwise, you can get up to the minute data by refreshing the page. |
| Place      | View metrics for a specific place.                                                                                                                                                                         |
| Percentile | View metrics at 10% to 99% percentile.                                                                                                                                                                     |

<img src="../../assets/analytics/performance/client-performance.png" width= "150%" alt="An example of filtered user stats." />

## Resolving Performance Issues

If you identify a performance issue, use the following steps to debug and fix it:

1. **Check your recent updates** and consider rolling it back if the metrics impact is severe.
2. **Use built-in testing tools** to troubleshoot performance:

   - [Developer Console](../../studio/developer-console.md) for viewing error and log messages and detailed information on memory and networking.
   - [ScriptProfiler](../../studio/optimization/scriptprofiler.md) for identifying scripts that take up the most resources.
   - [MicroProfiler](../../studio/microprofiler/using-microprofiler.md) for viewing unoptimized portions of your experience visually.

3. **Gather user feedback** from your community.

For more information on optimizing performance for different areas of your experience, see [Performance Optimization](../../projects/performance-optimization/index.md).
