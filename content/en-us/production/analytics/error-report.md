---
title: Error report
description: Explains how error reports can help you improve your experience.
---

**Error report** lets you view up-to-the-minute Luau system errors and warnings for both server and client. Monitor your error report before and after updating your experience to identify potential issues early.

## View your error report

To view your experience's error report:

- Navigate to your [Creations](https://create.roblox.com/dashboard/creations) page in the **Creator Dashboard** and select your experience.
- Select **Error Report**.

You can view analytics for individual or group owned experience. To view the latter, you need to have [group permissions for analytics](../../production/analytics/analytics-dashboard.md).

## Monitor errors and warnings

You can apply the following filters and toggles to your error report:

- **Date range:** Filter to last 1 hour, last 1 day, last 7 days, or last 30 days.
- **Place:** Filter by place.
- **Show version:** Adds place version annotations to the errors and warnings chart. Use this to search for errors and warnings by keyword.
- **Severity:** Filter to show errors, warnings, or both.

Below the filters and toggles, a chart displays the numbers of errors and warnings for server, client, and total. Use this chart to look for increases in errors and warnings over time. If you see a large spike in errors and warnings, use the error report table to troubleshoot.

<figure>
    <img src="../../assets/analytics/error-report/error-report-graph.png" width="100%"/>
    <figcaption>Errors and warnings shown over time by category.</figcaption>
  </figure>

## Troubleshoot errors and warnings

The Errors and Warnings table has the following columns:

| Column   | Description                   |
| -------- | ----------------------------- |
| Count    | Number of errors or warnings. |
| Severity | Error or warning label.       |
| Type     | Server or client label.       |
| Message  | Error or warning message.     |

<figure>
    <img src="../../assets/analytics/error-report/error-report-table.png" width="100%"/>
    <figcaption>The error report table.</figcaption>
  </figure>

<h4>View the stack trace for an error or warning</h4>

If you see a dropdown on an error or warning, click to expand it and see its corresponding _stack trace_. A stack trace is a list of the calls that your experience was performing when the exception was thrown. This can help you figure out what's going wrong.

 <h4>Error and warning limits</h4>

The error report can report up to 500 unique errors and 500 unique warnings at a time. The report drops any unique warnings after this limit and resets every 6 hours. To maximize the number of errors and warnings you can log, consider removing unique identifiers such as:

- User IDs
- X, Y, Z location coordinates
- Asset IDs

## Resolve errors and warnings

To resolve errors and warnings, consider the following debugging steps:

- **Review the stack trace** - Review the stack trace for the error or warning if it exists.
- **Check recent updates** - Check if there's been a recent update and consider rolling it back if the metrics impact is severe.
- **Use built-in testing tools to troubleshoot**
  - [Developer Console](../../studio/developer-console.md) for viewing error and log messages and detailed information on memory and networking.
  - [Script Profiler](../../studio/optimization/scriptprofiler.md) for identifying scripts that take up the most resources.
  - [MicroProfiler](../../performance-optimization/microprofiler/index.md) for viewing unoptimized portions of your experience visually.
- Gather user feedback from your community.
