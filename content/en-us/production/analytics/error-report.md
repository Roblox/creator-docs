---
title: Error Report
description: Explains how error reports can help you improve your experience.
---

**Error Report** lets you view up-to-the-minute Luau system errors and warnings for both server and client. Monitor your error report before and after updating your experience to identify potential issues early.

## View your error report

To view your experience's error report:

- Navigate to your [Creations](https://create.roblox.com/dashboard/creations) page in the **Creator Dashboard** and select your experience.
- Under **Monitoring**, select **Error Report**.

You can view analytics for individual or group-owned experiences. To view the latter, you need to have [group permissions for analytics](../../production/analytics/analytics-dashboard.md).

## Monitor errors and warnings

You can apply the following filters and toggles to your error report:

- **Date range** — Filter to last 1 hour, last 1 day, last 7 days, or last 30 days.
- **Place** — Filter by place.
- **Show version** — Adds place version annotations to the errors and warnings chart.
- **Severity** — Filter to show errors, warnings, or both.
- **Platform** — Filter to show client errors from specific devices.
- **OS** — Filter to show client errors from specific operating systems.
- **New errors since** — Filter to show only new errors and warnings since a certain version.

Below the filters and toggles, a chart displays the numbers of errors and warnings for server, client, and total. Use this chart to look for increases in errors and warnings over time. If you see a large spike in errors and warnings, use the error report table to troubleshoot.

<figure>
    <img src="../../assets/analytics/error-report/error-report-graph.png" width="100%"/>
    <figcaption>Errors and warnings shown over time by category</figcaption>
  </figure>

## Troubleshoot errors and warnings

The **Errors and warnings** table has the following columns:

| Column             | Description                                                                                    |
| ------------------ | ---------------------------------------------------------------------------------------------- |
| Count              | Number of errors or warnings.                                                                  |
| Severity           | Error or warning label.                                                                        |
| Type               | Server or client label.                                                                        |
| Message            | Error or warning message.                                                                      |
| First seen at      | First seen timestamp of the message.                                                           |
| First seen version | Only available when a place is picked. Shows the first version where the message was recorded. |

<figure>
    <img src="../../assets/analytics/error-report/error-report-table.png" width="100%"/>
    <figcaption>The error report table</figcaption>
  </figure>

### View the stack trace for an error or warning

If you see a dropdown on an error or warning, click to expand it and see its corresponding **stack trace**. A stack trace is a list of the calls that your experience was performing when the exception was thrown. This can help you figure out what's going wrong.

## Custom rules

Custom rules let you define regex or exact string patterns to automatically ignore or group errors and warnings. This helps you manage the signal-to-noise ratio of your error reports. You can create up to 100 rules per experience. Rules are evaluated top-to-bottom in priority order. Once an error matches a rule, further processing stops.

### Rule actions

Each rule has one of two actions:

| Action | Behavior                                                                                                                                                |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ignore | Hides matching errors from the chart and table. Use for permanent noise like unavoidable engine sound errors or legacy print statements.                |
| Group  | Consolidates all matching errors under a custom group name (e.g., "Network Issues", "Audio Spam"). The group name appears as a single row in the table. |

### Create a rule

There are two ways to create a rule:

**From the error table (inline):**

1. Click the context menu (three dots) on any error row.
2. Select **Ignore**.

<figure>
    <img src="../../assets/analytics/error-report/create-a-rule.png" width="100%"/>
    <figcaption>Ignoring an error from the error table</figcaption>
  </figure>

**From the rules tab:**

1. Navigate to the **Rules** tab on the Error Reports page.
2. Click **Create Rule**.
3. Enter a pattern (exact string or regex).
4. Select an action: **Ignore** or **Group** → [Group Name].
5. Save the rule.

<figure>
    <img src="../../assets/analytics/error-report/rules-tab.png" width="100%"/>
    <figcaption>The Rules tab showing example rules</figcaption>
  </figure>

### Rule creation fields

| Field   | Description                                                                  |
| ------- | ---------------------------------------------------------------------------- |
| Pattern | The exact string or regular expression to match against error messages.      |
| Action  | Choose **Ignore** (hide the error) or **Group** → enter a custom group name. |

<figure>
    <img src="../../assets/analytics/error-report/rule-creation-fields.png" width="80%"/>
    <figcaption>The Create rule dialog</figcaption>
  </figure>

Rules are evaluated from top to bottom based on the priority order in the Rules tab. Once an error matches a rule, that rule's action is executed and no further rules are evaluated for that error. This prevents conflicts such as an error being grouped by one rule and then ignored by a subsequent rule.

Rules only impacts errors logged after they are saved. An annotation appears on your chart when rules are modified.

### Regular expression basics

A regular expression (regex) is a pattern that matches text:

| Syntax        | Meaning                                          | Example                                                            |
| ------------- | ------------------------------------------------ | ------------------------------------------------------------------ |
| `.`           | Any single character                             | `H.t` matches "Hat", "Hit", "Hot"                                  |
| `*`           | Zero or more of the preceding character          | `go*d` matches "gd", "god", "good"                                 |
| `+`           | One or more of the preceding character           | `go+d` matches "god", "good", but not "gd"                         |
| `.*`          | Any sequence of characters (wildcard)            | `Failed.*load` matches "Failed to load" and "Failed xyz load"      |
| `\d`          | Any digit (0-9)                                  | `v\d+` matches "v1", "v123", "v4488"                               |
| `\w`          | Any word character (letters, digits, underscore) | `\w+` matches "Player123", "my_var"                                |
| `^`           | Start of the string                              | `^HTTP` matches errors starting with "HTTP"                        |
| `\/`          | An escaped forward slash                         | `rbxassetid:\/\/` matches "rbxassetid://"                          |
| `\[` and `\]` | Escaped square brackets (literal match)          | `\[Knit\]` matches "[Knit]"                                        |
| `(a\|b)`      | Match "a" or "b"                                 | `(Error\|Warning):.*` matches both "Error: ..." and "Warning: ..." |

Quick tips:

- Start with an exact match (the full error string) if you only want to catch one specific error.
- Use a regex when you want to catch a family of similar errors (e.g., all sound loading failures regardless of asset ID).
- Test your pattern against a few real error strings before saving to make sure it catches what you expect.

The system enforces two rules on your regex patterns:

- You cannot put a repeater (`+` or `*`) inside a repeating group. For example, `(a+)*` or `(\w+)+` are rejected.
- Must start with anchored text: Patterns cannot start with a wildcard like `.*` or `.+`. Your pattern must begin with a concrete character or anchor (like `^` or a literal string).

### Rule examples to organize your error reports

Instead of seeing dozens of separate error rows, consolidate related errors under one group name:

| Use case            | Example errors                                                    | Pattern                   | Action                       |
| ------------------- | ----------------------------------------------------------------- | ------------------------- | ---------------------------- |
| All network errors  | `HttpError: ConnectFail`, `HttpError: Timedout`                   | `HttpError:.*`            | Group → "Network Issues"     |
| DataStore warnings  | `DataStore request was added to queue`, `DataStoreService: ...`   | `DataStore`               | Group → "DataStore Warnings" |
| Player GUI errors   | `Players.Player1.PlayerGui.Shop:12: attempt to index nil`         | `Players\.\w+\.PlayerGui` | Group → "PlayerGui Errors"   |
| Custom UI framework | `[UIManager] Button render failed`, `[UIManager] Layout overflow` | `\[UIManager\].*`         | Group → "UI System"          |

## Error tracking limits

The system tracks up to 500 unique errors and 500 unique warnings by count and the top 100 new errors per version. These counts reset every 6 hours. To maximize useful error tracking within these limits:

- Remove unique identifiers from error messages, such as user IDs, coordinates, or timestamps. Errors like `Player 12345 failed to load` and `Player 67890 failed to load` count as two separate entries. If you log them as `Player failed to load`, they consolidate into one entry with a higher count.
- Use custom rules to group related errors that differ only by dynamic values.

## Resolve errors and warnings

When investigating errors from the Error Reports page, use the following approaches:

1. **Review stack traces** — Expand error rows to see the call path and identify the exact script and line number where the error occurred.
2. **Check for recent updates** — Monitor new errors since your most recent update.
3. **Use built-in tools**:
   - [Developer Console](../../studio/developer-console.md) (<kbd>F9</kbd> in-experience): View live errors in real time and test fixes.
   - [Script Profiler](../../studio/optimization/scriptprofiler.md): Identify performance-related errors caused by expensive operations.
   - **Output Window in Studio** — Catch errors during development before publishing.
4. **Use breakdowns** — Check if the error is specific to a platform (Desktop, Mobile, Console) or OS (Windows, macOS, iOS, Android).
5. **Gather community feedback** — If you have a community Discord or DevForum post, check whether players are reporting the issue and which devices or regions are affected.
