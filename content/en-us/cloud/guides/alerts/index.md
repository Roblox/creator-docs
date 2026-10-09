---
title: Analytics alerts
description: Use Open Cloud to create and manage alerts that monitor your experience's analytics metrics, and review the incidents those alerts produce.
---

The Analytics Alerts API lets you programmatically manage alerts that monitor your experience's analytics metrics, and review the incidents those alerts produce. This API supports:

- Creating, listing, updating, and deleting alert configurations for an experience.
- Alerting on an absolute threshold, or on the percentage change from a previous period.
- Narrowing an alert with dimension filters, and evaluating it per dimension value with a breakdown.
- Sending notifications to your own webhooks when an alert fires or resolves.
- Querying the incident history of your alerts for the last 30 days.

<Alert severity="info">
To manage alerts with the Creator Hub UI rather than programmatically, see [Alerts](/production/analytics/alerts).
</Alert>

## Authenticate requests

Before using this API, you must [generate an API key](../../auth/api-keys.md) for your experience. When creating the key, add your experience to **Access Permissions** and grant it the following operations:

| Scope                            | Grants access to                                           |
| :------------------------------- | :--------------------------------------------------------- |
| `universe.analytics.alert:read`  | Listing alert configurations and querying alert incidents. |
| `universe.analytics.alert:write` | Creating, updating, and deleting alert configurations.     |

Include the key in the `x-api-key` request header on every request.

All endpoints use your universe ID, which you can find on the [Creator Dashboard](https://create.roblox.com/dashboard/creations) by selecting your experience and copying the **Universe ID** from the overview page. The experience must also be eligible for analytics alerts; otherwise every request returns `403 PERMISSION_DENIED`.

Alert IDs are 64-bit integers encoded as strings; always treat them as strings in your code.

## Create an alert

To create an alert for your experience:

1. Copy the API key to the `x-api-key` request header.
1. Replace `${UniverseId}` in the URL with your experience's universe ID.
1. Set `metric` to a metric that supports alerts, such as `ClientCrashRate15m`. See [Supported metrics](metrics.md).
1. Set `interval`, `severity`, and `consecutiveOccurrences`. See [Intervals and consecutive occurrences](#intervals-and-consecutive-occurrences).
1. Set `condition` to the threshold that should trigger the alert. See [Conditions](#conditions).
1. Send a POST request.

This sample alert triggers when client crash rate exceeds 2% for 10 consecutive minutes:

```bash
curl --location --request POST 'https://apis.roblox.com/analytics-alert-control-plane/v1/resource/Universe/id/${UniverseId}/alerts' \
--header 'x-api-key: ${ApiKey}' \
--header 'Content-Type: application/json' \
--data '{
    "name": "High client crash rate",
    "description": "Crash rate above 2% across all platforms",
    "metric": "ClientCrashRate15m",
    "severity": "SEV_0",
    "interval": "OneMinute",
    "consecutiveOccurrences": 10,
    "condition": {
        "operator": "Gt",
        "threshold": 2,
        "evaluationMode": "Absolute"
    }
}'
```

A successful request returns `201 Created` with the full alert configuration:

```json
{
  "alertId": "1234567890123",
  "resourceType": "Universe",
  "resourceId": "1234567890",
  "name": "High client crash rate",
  "metric": "ClientCrashRate15m",
  "description": "Crash rate above 2% across all platforms",
  "severity": "SEV_0",
  "interval": "OneMinute",
  "consecutiveOccurrences": 10,
  "filter": [],
  "breakdown": [],
  "condition": {
    "operator": "Gt",
    "threshold": 2,
    "evaluationMode": "Absolute"
  },
  "configState": "Syncing",
  "webhookReceiverConfig": null,
  "firingStatus": "OK",
  "lastFiredAt": null,
  "createdAt": "2026-10-01T18:00:00Z",
  "lastModifiedAt": "2026-10-01T18:00:00Z",
  "lastModifiedBy": "987654321"
}
```

New alerts start in the `Syncing` state while the configuration propagates, and move to `Enabled` shortly afterward. For the response fields and configuration states, see the [API reference documentation](/cloud/reference/features/analytics#post_analytics_alert_control_plane_v1_resource__resourceType__id__resourceId__alerts).

### Request body fields

| Field                    | Type     | Required | Description                                                                                                                                                             |
| :----------------------- | :------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`                   | string   | Yes      | Display name of the alert. Must be unique within the experience. Maximum 50 characters. Subject to Roblox text moderation.                                              |
| `metric`                 | string   | Yes      | The metric to evaluate, such as `ClientCrashRate15m`. Case-sensitive. See [Supported metrics](metrics.md).                                                              |
| `description`            | string   | No       | Free-text description of the alert's purpose. Maximum 200 characters. Subject to Roblox text moderation.                                                                |
| `severity`               | string   | Yes      | `SEV_0` (critical), `SEV_1` (medium), or `SEV_2` (low).                                                                                                                 |
| `interval`               | string   | Yes      | How often the condition is evaluated: `OneMinute`, `HalfHour`, `OneHour`, or `OneDay`.                                                                                  |
| `consecutiveOccurrences` | integer  | Yes      | Number of consecutive evaluations that must breach the condition before the alert fires. The allowed range depends on `interval`.                                       |
| `condition`              | object   | Yes      | The threshold that triggers the alert. All sub-fields except `periodOffsetMultiplier` are required on create. See [Conditions](#conditions).                            |
| `filter`                 | object[] | No       | Dimension filters that narrow the metric. Each entry has `dimension` and `values`. See [Use filters and breakdowns](#use-filters-and-breakdowns).                       |
| `breakdown`              | object[] | No       | Evaluate the metric separately for each value of a dimension. At most one entry with one dimension. See [Use filters and breakdowns](#use-filters-and-breakdowns).      |
| `webhookReceiverConfig`  | object   | No       | Webhooks to notify when the alert fires or resolves. Omit or set to `null` for no webhook notifications. See [Send webhook notifications](#send-webhook-notifications). |

### Conditions

The `condition` object defines when the alert fires.

| Field                    | Type    | Description                                                                                                                                                                                                                                                       |
| :----------------------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `operator`               | string  | `Gt` (greater than), `Gte` (greater than or equal), `Lt` (less than), or `Lte` (less than or equal).                                                                                                                                                              |
| `threshold`              | number  | The value the metric is compared against. Must be a finite number with at most 15 fractional digits. For `PeriodOverPeriod`, this is a percentage change (for example, `20` means 20%).                                                                           |
| `evaluationMode`         | string  | `Absolute` compares the raw metric value with `threshold`. `PeriodOverPeriod` compares the percentage change between the current period and a previous period with `threshold`.                                                                                   |
| `periodOffsetMultiplier` | integer | Only for `PeriodOverPeriod`. How many intervals back the comparison period is. Defaults to 1 (the preceding interval). Must be at least 1, and the offset must stay within the metric's data retention. Sending this field with `Absolute` returns a `400` error. |

### Intervals and consecutive occurrences

The `interval` controls how often the alert is evaluated, and `consecutiveOccurrences` controls how many evaluations in a row must breach the condition before the alert fires. For example, an `interval` of `OneMinute` with `consecutiveOccurrences` of `10` means the condition must hold for 10 consecutive minutes before an incident opens.

| Interval    | Evaluation frequency | Allowed `consecutiveOccurrences` |
| :---------- | :------------------- | :------------------------------- |
| `OneMinute` | Every 1 minute       | 6 – 30                           |
| `HalfHour`  | Every 30 minutes     | 1 – 10                           |
| `OneHour`   | Every hour           | 1 – 10                           |
| `OneDay`    | Every 24 hours       | 1 – 10                           |

Not every metric supports every interval. A request with an unsupported interval for the metric returns a `400` error.

### Configuration limits

- Each experience can have up to 20 alerts. Creating more returns `409 MAX_ALERT_REACHED`.
- Alert names must be unique within an experience. A duplicate name returns `409 ALERT_NAME_EXISTED`.
- `name` can be at most 50 characters and `description` at most 200 characters.
- Each `filter` entry can contain up to 1,000 values, and each value can be at most 128 characters.
- Each dimension can appear in at most one `filter` entry.
- `breakdown` supports at most one entry with exactly one dimension, and that dimension must also appear in `filter`.

## Use filters and breakdowns

Filters narrow the metric to specific dimension values. A data point is included only if its dimension value is in the `values` list. All dimension names and values are case-sensitive.

A breakdown evaluates the metric independently for each value of a dimension, and fires if any value breaches the condition. Because each breakdown series must be bounded, the breakdown dimension must also be listed in `filter`.

```bash title="Alert when the client crash rate on Phone or Tablet exceeds 3%, evaluated per platform"
curl --location --request POST 'https://apis.roblox.com/analytics-alert-control-plane/v1/resource/Universe/id/${UniverseId}/alerts' \
--header 'x-api-key: ${ApiKey}' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Mobile crash rate by platform",
    "metric": "ClientCrashRate15m",
    "severity": "SEV_1",
    "interval": "OneMinute",
    "consecutiveOccurrences": 15,
    "filter": [
        {
            "dimension": "Platform",
            "values": ["Phone", "Tablet"]
        }
    ],
    "breakdown": [
        {
            "dimensions": ["Platform"]
        }
    ],
    "condition": {
        "operator": "Gt",
        "threshold": 3,
        "evaluationMode": "Absolute"
    }
}'
```

| Field                    | Type     | Description                                                                                     |
| :----------------------- | :------- | :---------------------------------------------------------------------------------------------- |
| `filter[].dimension`     | string   | The dimension to filter on, such as `Platform`.                                                 |
| `filter[].values`        | string[] | The allowed values for the dimension. Must contain at least one non-empty value.                |
| `breakdown[].dimensions` | string[] | The dimension to evaluate per value. Exactly one dimension, which must also appear in `filter`. |

Which dimensions can be used as filters or breakdowns depends on the metric. See [Supported metrics](metrics.md).

## Alert on period-over-period change

Use `"evaluationMode": "PeriodOverPeriod"` to alert on the percentage change from a previous period instead of on the raw value. `periodOffsetMultiplier` sets how many intervals back the comparison period is. For example, an `interval` of `OneDay` with a multiplier of `7` compares each day with the same day last week.

```bash title="Alert when peak concurrent players drop by more than 30% compared to the same day last week"
curl --location --request POST 'https://apis.roblox.com/analytics-alert-control-plane/v1/resource/Universe/id/${UniverseId}/alerts' \
--header 'x-api-key: ${ApiKey}' \
--header 'Content-Type: application/json' \
--data '{
    "name": "PCU week-over-week drop",
    "metric": "PeakConcurrentPlayers",
    "severity": "SEV_1",
    "interval": "OneDay",
    "consecutiveOccurrences": 1,
    "condition": {
        "operator": "Lt",
        "threshold": -30,
        "evaluationMode": "PeriodOverPeriod",
        "periodOffsetMultiplier": 7
    }
}'
```

## Send webhook notifications

To receive a notification each time an alert fires or resolves, reference one or more webhooks that you've created for your experience in `webhookReceiverConfig.receivers`. To create a webhook, see [Webhook notifications](../../webhooks/webhook-notifications.md#configure-webhooks-on-creator-dashboard). Each `webhookConfigurationId` must be a valid UUID, must be unique within the list, and must belong to the same experience; otherwise the request returns `400 INVALID_FIELD_VALUE`.

```json title="webhookReceiverConfig example"
"webhookReceiverConfig": {
    "receivers": [
        { "webhookConfigurationId": "3f2b8c1e-5d4a-4f6b-9a7e-1c2d3e4f5a6b" }
    ]
}
```

## List alerts

To list the alert configurations for your experience, send a GET request. All query parameters are optional.

```bash title="List all alerts"
curl --location --request GET 'https://apis.roblox.com/analytics-alert-control-plane/v1/resource/Universe/id/${UniverseId}/alerts' \
--header 'x-api-key: ${ApiKey}'
```

```bash title="List firing SEV_0 and SEV_1 alerts on a specific metric"
curl --location 'https://apis.roblox.com/analytics-alert-control-plane/v1/resource/Universe/id/${UniverseId}/alerts?firingStatus=Firing&severities=SEV_0&severities=SEV_1&metrics=ClientCrashRate15m' \
--header 'x-api-key: ${ApiKey}'
```

The response is `200 OK` with a JSON array of alert configurations, using the same shape as the create response. For query parameters, response fields, and configuration states, see the [API reference documentation](/cloud/reference/features/analytics#get_analytics_alert_control_plane_v1_resource__resourceType__id__resourceId__alerts).

## Update an alert

Updates use PATCH semantics: only the fields you include are changed, and omitted fields keep their current values. Within `condition`, you can also send only the sub-fields you want to change. `filter` and `breakdown` are replaced entirely when provided. Replace `${UniverseId}` with your universe ID and `${AlertId}` with the alert's ID. A successful update returns `200 OK` with the updated alert configuration. See the [API reference documentation](/cloud/reference/features/analytics#patch_analytics_alert_control_plane_v1_resource__resourceType__id__resourceId__alerts__alertId_).

```bash title="Raise the threshold of an existing alert"
curl --location --request PATCH 'https://apis.roblox.com/analytics-alert-control-plane/v1/resource/Universe/id/${UniverseId}/alerts/${AlertId}' \
--header 'x-api-key: ${ApiKey}' \
--header 'Content-Type: application/json' \
--data '{
    "condition": {
        "threshold": 5
    }
}'
```

```bash title="Disable an alert without deleting it"
curl --location --request PATCH 'https://apis.roblox.com/analytics-alert-control-plane/v1/resource/Universe/id/${UniverseId}/alerts/${AlertId}' \
--header 'x-api-key: ${ApiKey}' \
--header 'Content-Type: application/json' \
--data '{
    "configState": "Disabled"
}'
```

```bash title="Remove all webhook notifications from an alert"
curl --location --request PATCH 'https://apis.roblox.com/analytics-alert-control-plane/v1/resource/Universe/id/${UniverseId}/alerts/${AlertId}' \
--header 'x-api-key: ${ApiKey}' \
--header 'Content-Type: application/json' \
--data '{
    "webhookReceiverConfig": { "receivers": [] }
}'
```

Omitting `webhookReceiverConfig` or setting it to `null` leaves the existing webhooks unchanged; send an empty `receivers` list to remove them. The same validation rules as create apply to the merged result — for example, changing `interval` alone is rejected if the existing `consecutiveOccurrences` is out of range for the new interval.

## Delete an alert

Deleting an alert is irreversible. Replace `${UniverseId}` with your universe ID and `${AlertId}` with the alert's ID. A successful request returns `204 No Content`.

```bash title="Delete an alert"
curl --location --request DELETE 'https://apis.roblox.com/analytics-alert-control-plane/v1/resource/Universe/id/${UniverseId}/alerts/${AlertId}' \
--header 'x-api-key: ${ApiKey}'
```

## Query incidents

An incident is opened when an alert fires and resolved when its condition is no longer met. The incidents endpoint returns every incident that was open at any point between `startTime` and `endTime`.

To query incidents for your experience:

1. Copy the API key to the `x-api-key` request header.
1. Replace `${UniverseId}` in the URL with your experience's universe ID.
1. Set `startTime` and `endTime` to RFC&nbsp;3339 UTC timestamps. `startTime` must be within the last 30 days.
1. Optionally filter by `metric`, `alertIds`, or `severities`.
1. Send a GET request.

```bash title="Query SEV_0 incidents from the last week"
curl --location 'https://apis.roblox.com/analytics-alert-control-plane/v1/resource/Universe/id/${UniverseId}/alerts/incidents?startTime=2026-09-24T00:00:00Z&endTime=2026-10-01T00:00:00Z&severities=SEV_0' \
--header 'x-api-key: ${ApiKey}'
```

```json title="Response (200 OK)"
[
  {
    "id": "5555555555",
    "resourceType": "Universe",
    "resourceId": "1234567890",
    "status": "OK",
    "openedAt": "2026-09-28T14:12:00Z",
    "openedWindowStartAt": "2026-09-28T14:02:00Z",
    "resolvedAt": "2026-09-28T14:47:00Z",
    "resolvedWindowStartAt": "2026-09-28T14:46:00Z",
    "firstFiringMetadata": {
      "filter": [{ "dimension": "Platform", "values": ["Phone", "Tablet"] }],
      "breakdown": [{ "dimensions": ["Platform"] }],
      "condition": {
        "operator": "Gt",
        "threshold": 3,
        "evaluationMode": "Absolute"
      },
      "firingCondition": [
        {
          "firingValue": 3.8,
          "firingDimension": { "dimension": "Platform", "value": "Phone" }
        }
      ]
    },
    "latestFiringMetadata": {
      "filter": [{ "dimension": "Platform", "values": ["Phone", "Tablet"] }],
      "breakdown": [{ "dimensions": ["Platform"] }],
      "condition": {
        "operator": "Gt",
        "threshold": 3,
        "evaluationMode": "Absolute"
      },
      "firingCondition": [
        {
          "firingValue": 3.2,
          "firingDimension": { "dimension": "Platform", "value": "Phone" }
        }
      ]
    },
    "alertConfig": {
      "id": "1234567890123",
      "name": "Mobile crash rate by platform",
      "metric": "ClientCrashRate15m",
      "severity": "SEV_1",
      "interval": "OneMinute",
      "filter": [{ "dimension": "Platform", "values": ["Phone", "Tablet"] }],
      "breakdown": [{ "dimensions": ["Platform"] }],
      "condition": {
        "operator": "Gt",
        "threshold": 3,
        "evaluationMode": "Absolute"
      }
    }
  }
]
```

For query parameters and incident fields, see the [API reference documentation](/cloud/reference/features/analytics#get_analytics_alert_control_plane_v1_resource__resourceType__id__resourceId__alerts_incidents).

Incidents are retained for about 35 days; the 30-day query window keeps results reliable.

## Common errors

Errors return a JSON body with a machine-readable `errorCode` and a human-readable `message`. Key your error handling off the HTTP status and `errorCode`; the `message` describes the specific problem.

```json title="Error response"
{
  "errorCode": "INVALID_FIELD_VALUE",
  "message": "consecutiveOccurrences must be at least 6 when interval is OneMinute."
}
```

| Status | Error code                        | Resolution                                                                                                                        |
| :----- | :-------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| 400    | `REQUIRED_FIELD_MISSING`          | Check the [Request body fields](#request-body-fields) table.                                                                      |
| 400    | `INVALID_FIELD_VALUE`             | Read `message` for the specific field, and see [Configuration limits](#configuration-limits) and [Supported metrics](metrics.md). |
| 400    | `TEXT_FILTER_BLOCKED_NAME`        | Choose a different name.                                                                                                          |
| 400    | `TEXT_FILTER_BLOCKED_DESCRIPTION` | Choose a different description.                                                                                                   |
| 401    | `UNAUTHENTICATED`                 | Verify the key on the [Creator Dashboard](https://create.roblox.com/dashboard/credentials).                                       |
| 403    | `PERMISSION_DENIED`               | Confirm the key's Access Permissions include the experience and the required scope.                                               |
| 404    | `ALERT_NOT_FOUND`                 | Verify the alert ID and universe ID.                                                                                              |
| 409    | `ALERT_NAME_EXISTED`              | Use a unique name.                                                                                                                |
| 409    | `MAX_ALERT_REACHED`               | Delete an unused alert before creating a new one.                                                                                 |
| 503    | `SERVICE_UNAVAILABLE`             | Retry the request after a short delay.                                                                                            |
