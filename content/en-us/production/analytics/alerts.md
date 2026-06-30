---
title: Alerts
description: Create alerts to monitor performance metrics for your experience and receive notifications when they cross defined thresholds.
---

<Alert severity="info">
Alerts are currently in beta.
</Alert>

**Alerts** let you proactively monitor critical performance metrics for your experience and receive real-time notifications when they cross your defined thresholds. Instead of manually checking dashboards, you can set up alerts that notify you automatically when metrics like crash rates spike, memory usage becomes excessive, or frame rates drop.

For example, the following workflow is a typical way of using alerts to catch performance regressions:

1. **Create an alert** - Set up an alert for "Client crash rate is above 5%" with a 5-minute duration and critical severity.
2. **Add a webhook** - Connect to your team's PagerDuty or Discord webhook.
3. **Push your update** - Deploy your new version.
4. **Receive the alert** - If crash rate spikes above 5% for 5 consecutive minutes, your team is immediately notified with the metric value and a link to the dashboard.
5. **Investigate and fix** - Click the dashboard link in the webhook payload to view the performance charts and diagnose the issue.

You can create up to 20 alerts per experience. Creating alerts requires the **Create and configure alerts** permission.

## View the alerts page

To access the alerts page, you must either be the experience owner or have **View all analytics** [permissions](#permissions).

1. Select your experience on [Creator Hub](https://create.roblox.com/).
2. Under **Configure**, select **Alerts**.

The **Configuration** tab lets you create and manage alert rules. Use the **Analytics** page to review alert history, active alerts, and events.

## Permissions

Alerts require specific permissions for different actions:

| Action | Required permission |
| :--- | :--- |
| Create, edit, delete, or toggle alerts | Create and configure alerts |
| View the alert analytics page | View all analytics |
| Create experience-level webhooks | List, create, update, and delete webhooks |

## Create alerts

To create an alert, click **Create** on the alerts configuration page.

<img src="../../assets/analytics/alerts/create.png" alt="Existing alerts dashboard with create button." width="800" />

### Alert fields

Each alert has the following configuration options.

| Field | Description |
| ----- | ----- |
| Name | A unique name for the alert that is displayed on notifications, annotations, and dashboards. |
| Description | An optional description to provide additional context. |
| Metric | The target metric to monitor. |
| Time granularity | How often the metric is evaluated (minute, half hour, hourly, or daily). |
| Trigger condition | The condition that fires the alert (e.g. value > 500) |
| Filters | Optional filters to narrow the metric, such as place version, operating system, or platform. All filters available on the dashboard are supported. |
| Breakdown | Optional breakdown to check if the condition is met for each segment separately. |
| Duration | How many times the condition must be consecutively met before the alert fires (1-10). |
| Severity | The severity level (critical, medium, or low). |
| Delivery channel | Where to send alert notifications. See [Webhook delivery](#webhook-delivery). |

### Supported metrics

Alerts support all performance metrics available on the [Performance dashboard](performance.md), including:

- Client frame rate
- Client crash rate
- Client memory usage (GB)
- Client memory usage percentage
- Unexpected out-of-memory exits
- Server CPU time
- Server frame rate
- Server memory usage (GB)
- Concurrent users
- Session time

### Trigger conditions

You can set one of two trigger condition types:

- **Metric value** - Fires when the metric crosses a static numeric threshold. The value uses the same unit as the metric (percentage, milliseconds, MB, etc.).
- **Period over period change** - Fires when the metric's rate of change exceeds a percentage threshold.

  - **Week over week** - Checks the percent change between the same time last week (e.g. 5:00 PM this Friday vs. 5:00 PM last Friday).
  - **Day over day** - Checks the percent change between the same time yesterday (e.g. 9:00 AM today vs. 9:00 AM yesterday).
  - **Hour over hour** - Checks the percent change between most recent hour and the previous hour (e.g. 9:05 AM vs. 8:05 AM).

For example, you can set a metric value condition like "client crash rate is above 5%" or a period over period condition like "hourly change is above 50%."

### Duration

The duration setting controls how long the trigger condition must be continuously met before the alert fires. This helps reduce noise from momentary fluctuations. If you choose 1, the alert fires as soon as one data point meets your condition. If you choose 5, five consecutive data points must meet the condition. For minute-granularity alerts, the minimum duration is 5 minutes to reduce noise.

### Severity levels

Each alert has a severity level that is included in the alert message and displayed with a distinct color.

| Severity | Use case |
| :--- | :--- |
| Critical | Urgent issues requiring immediate action, such as a crash rate spike. |
| Medium | Notable regressions that should be investigated soon. |
| Low | Minor changes worth tracking but not immediately actionable. |

## Webhook delivery

Alerts arrive via experience-level webhooks. When an alert fires or recovers, an HTTP POST request is sent to your configured webhook URL with a JSON payload. The message itself is also JSON, wrapped into the `AlertMessage` field as a single string, like so:

```json
{
  "NotificationId": "11111abc-111a-1a2a-ab1a-abc1a1a111a1",
  "EventType": "AnalyticsAlert",
  "EventTime": "2026-06-15T22:05:10.8590762Z",
  "EventPayload": {
    "TargetType": "Universe",
    "TargetId": "1234567890",
    "AlertMessage": "{\n  \"summary\": \"[♟️] Game has recovered\",\n  \"metric\": \"PeakConcurrentPlayers\",\n  \"universe_id\": \"1234567890\",\n  \"evaluation_time_utc\": \"2026-06-15T22:04:47Z\",\n  \"alert_history\": \"https://create.roblox.com/dashboard/creations/experiences/1234567890/alerts?tab=AlertConfiguration-Analytics&utm_medium=webhook&utm_campaign=alert_resolved\"\n}"
  }
}
```

The `AlertMessage.summary` field includes either the word "fired" when the alert triggers or the word "recovered" when the metric returns to a normal state.

You can use webhooks to integrate with external tools like PagerDuty or Slack for team-wide visibility.

### Set up a webhook

1. Select your experience on [Creator Hub](https://create.roblox.com/).
2. Under **Configure**, select **Webhooks** and click **Add Webhook**.

   The webhook URL comes from your provider. For example, a Slack URL probably looks like this:

   ```text
   https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX
   ```

3. Enter your webhook URL and a name.
4. (Optional) Include a secret, which can help ensure that the requests you receive came from Roblox.
5. (Optional) Use the **Test Response** button to check if your service can receive a sample request.
6. Click **Save Changes**.
7. When creating or editing an alert, select your webhook under the **Delivery channel** field.

Creating experience-level webhooks requires the **List, create, update, and delete webhooks** [permission](#permissions).

## Monitor alerts

The **Analytics** tab on the alerts page provides a centralized view of your alert history and current status:

- **Triggered events** - A graph showing the number of alerts firing over time. You can adjust the time range, search by alert name, and filter by severity.
- **Active alerts** - A table showing currently active (firing) alerts.
- **History** - A chronological log of all alert events within the selected time range.

<img src="../../assets/analytics/alerts/monitor.png" alt="Screenshot of the analytics tab showing a history of triggered events." width="700" />

### Chart annotations

When an alert is actively firing, a ranged annotation appears on the corresponding metric chart on the Performance dashboard. The annotation displays the alert name and spans the duration of the firing period.

Annotations only appear when the chart has the same filters applied as the alert. If your alert has breakdown filters, annotations display for the total line only.

<img src="../../assets/analytics/alerts/annotations.png" alt="Screenshot showing chart annotations." width="600" />

## Experience overview

Active alerts (alerts that have fired and haven't recovered yet) appear in the alert tray on your experience **Overview** page. The tray shows the five most recent active alerts with their timestamp, name, and current metric value. Click **View all** to navigate to the full alerts analytics page.

<img src="../../assets/analytics/alerts/experience-overview.png" alt="Experience overview page with active alerts" />

## Best practices for alerts

These tips can help you get the most out of alerts and prevent your webhook endpoints from being flooded with notifications:

- **Prevent false alarms with duration** - Avoid setting your duration to 1 for highly volatile metrics like session time. A sudden influx of players joining or loading assets simultaneously can cause temporary spikes. Setting a duration of 5 ensures an alert only fires if the issue is sustained.
- **Use segment breakdowns efficiently** - Instead of creating multiple individual alerts for Android, iOS, and PC, you can create a single alert and use the **Breakdown** feature. The alert will evaluate each platform separately and specify where the issue is occurring in the webhook payload.
- **Establish a baseline first** - Before setting your thresholds, review your existing analytics charts over the last 7 to 14 days. If your normal crash rate hovers around 1.2%, consider setting your alert threshold to 2.5% or 3%. Giving your metrics room for natural fluctuations prevents false alarms.
- **Use descriptive, structured names** - Because alert names are injected directly into your webhook payloads and annotations, using a clear formula like `metric - context` (e.g., High client crash rate - mobile) makes it easy for your team to triage issues at a glance.
