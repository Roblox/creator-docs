---
title: Analytics
description: Use Open Cloud to query aggregated experience metrics, such as daily active users, over a date range.
---

The Analytics Query API lets you query aggregated experience metrics over a date range. This API supports:

- Querying daily active users (DAU), revenue, retention, and other metrics for your experience.
- Filtering and grouping results by dimensions such as platform, country, and age group.
- Automatically handling slow queries as long-running operations you can poll for results.

Before using this API, you must [generate an API key](../../auth/api-keys.md) for your experience. When creating the key, add your experience to **Access Permissions** and grant it access to the `universe.analytics:read` operation within the `universe-analytics` system. Include the key in the `x-api-key` request header on every request.

All endpoints use your universe ID, which you can find on the [Creator Dashboard](https://create.roblox.com/dashboard/creations) by selecting your experience and copying the **Universe ID** from the overview page.

## Query a metric

To query a metric for your experience:

1. Copy the API key to the `x-api-key` request header.
1. Replace `${UniverseId}` in the URL with your experience's universe ID.
1. Set `metric` to the metric you want to query, such as `DailyActiveUsers`.
1. Set `granularity` to a supported time bucket size, such as `OneDay`. See [Granularity options](#granularity-options).
1. Set `startTime` and `endTime` to the date range you want, using RFC&nbsp;3339 UTC timestamps.
1. Send the request.

```bash title="Query daily active users"
curl --location 'https://apis.roblox.com/analytics-query-api/v1/universes/${UniverseId}/metrics' \
--header 'x-api-key: ${ApiKey}' \
--header 'Content-Type: application/json' \
--data '{
    "metric": "DailyActiveUsers",
    "granularity": "OneDay",
    "startTime": "2026-01-01T00:00:00Z",
    "endTime": "2026-02-01T00:00:00Z"
}'
```

Most queries complete immediately and return `200 OK`:

```json title="Response (200 OK)"
{
  "path": "v1/universes/1234567890/operations/metrics/abc123",
  "done": true,
  "metadata": {
    "createdTime": "2026-01-15T00:00:00Z"
  },
  "response": {
    "values": [
      {
        "breakdowns": [],
        "dataPoints": [
          { "time": "2026-01-01T00:00:00Z", "value": 10000 },
          { "time": "2026-01-02T00:00:00Z", "value": 10500 }
        ]
      }
    ]
  }
}
```

For large date ranges the API may return `202 Accepted` with `"done": false`. See [Long-running operations](#long-running-operations).

### Request body fields

| Field         | Type     | Required | Description                                                                                                                                                                                                                                   |
| :------------ | :------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `metric`      | string   | Yes      | The metric to query. For example, `DailyActiveUsers`. For the full list, see [Supported metrics](metrics.md).                                                                                                                                 |
| `granularity` | string   | Yes      | The time bucket size for each data point. See [Granularity options](#granularity-options).                                                                                                                                                    |
| `startTime`   | string   | Yes      | Start of the query window, as an RFC&nbsp;3339 timestamp. Inclusive. Any UTC offset is accepted; results are always bucketed in UTC.                                                                                                          |
| `endTime`     | string   | Yes      | End of the query window, as an RFC&nbsp;3339 timestamp. Exclusive. For example, `"2026-02-01T00:00:00Z"` includes data through January 31.                                                                                                    |
| `breakdown`   | string[] | No       | Dimensions to group results by. Each entry is a single dimension name, such as `"Platform"`. Omit for no breakdown. See [Use breakdowns](#use-breakdowns).                                                                                    |
| `filter`      | object[] | No       | Filters to narrow results to specific dimension values. Each entry has `dimension`, `values`, and `operation`. Omit for no filtering. See [Filter results](#filter-results).                                                                  |
| `limit`       | integer  | No       | Maximum number of breakdown series to return, ranked by total metric value descending. Only supported when `granularity` is `"None"` and `breakdown` is set. Omitting this field or setting it to `0` applies a metric-dependent default cap. |

The earliest `startTime` you can use depends on the metric type:

- **Standard metrics** (engagement, monetization, acquisition, retention): up to 4 years of history.
- **Performance metrics** (crash rate, frame rate, etc.): up to 28 days of history.

Querying beyond the retention period returns a `400` error with code `2001`.

## Long-running operations

Most queries complete immediately and return `200 OK` with `"done": true`. For queries with large date ranges or many breakdown series, the API returns `202 Accepted` with `"done": false` and a `path` to poll.

**Pending (202):**

```json
{
  "path": "path/to/poll",
  "done": false,
  "metadata": {
    "createdTime": "2026-01-15T00:00:00Z"
  }
}
```

When `done` is `false`, send a GET request to `https://apis.roblox.com/analytics-query-api/{path}` — replacing `{path}` with the `path` value from the response — using the same `x-api-key` header. Repeat until `done` is `true`.

**Completed (200):**

```json
{
  "path": "path/to/poll",
  "done": true,
  "metadata": {
    "createdTime": "2026-01-15T00:00:00Z"
  },
  "response": {
    "values": [
      {
        "breakdowns": [],
        "dataPoints": [
          {
            "time": "2026-01-01T00:00:00Z",
            "value": 10000
          }
        ]
      }
    ]
  }
}
```

An empty `breakdowns` array indicates no breakdown was requested. When a breakdown is used, each entry in `response.values` corresponds to one dimension value. See [Use breakdowns](#use-breakdowns).

When the operation fails, the body contains `error` instead of `response`:

```json
{
  "path": "path/to/poll",
  "done": true,
  "metadata": {
    "createdTime": "2026-01-15T00:00:00Z"
  },
  "error": {
    "code": 2001,
    "message": "The requested granularity is not supported for this metric."
  }
}
```

| Field                  | Type    | Description                                                              |
| :--------------------- | :------ | :----------------------------------------------------------------------- |
| `path`                 | string  | The operation path, matching the value returned in the initial response. |
| `done`                 | boolean | Always `true` when an error is present.                                  |
| `metadata.createdTime` | string  | RFC&nbsp;3339 timestamp of when the operation was created.               |
| `error.code`           | integer | Numeric error code. See [Common errors](#common-errors).                 |
| `error.message`        | string  | Human-readable description of the error.                                 |

Each entry in `response.values` represents one series, one per dimension value when a breakdown is used, or a single entry with `breakdowns: []` when no breakdown is requested. Each data point in `dataPoints` has:

| Field          | Description                                                                                                                                          |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| `time`         | UTC timestamp for the start of the time bucket.                                                                                                      |
| `value`        | The numeric metric value.                                                                                                                            |
| `stringValues` | Text values for the data point, as an array of strings. Only present for text-valued metrics. See [Text-valued metrics](#text-valued-metrics) below. |
| `status`       | Status indicator for the data point. Omitted when no status applies for the series. See [Data point status](#data-point-status) below.               |

### Text-valued metrics

Most metrics are numeric and report their result in `value`. A few metrics instead describe each data point with text rather than a number. For these, the data is returned in a `stringValues` array and `value` is not meaningful. The `stringValues` field is omitted entirely for numeric metrics.

For example, `ThumbnailWinningSegments` reports the winning thumbnail segments for each time bucket as a list of strings:

```json
{
  "time": "2026-01-01T00:00:00Z",
  "value": 0,
  "stringValues": ["TopEngagement", "HighCTR"]
}
```

### Data point status

| Status                        | Description                                                  | Example                                                                                     |
| :---------------------------- | :----------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| `Valid`                       | The data point is complete and covers the full time bucket.  | Finalized Creator Rewards payout.                                                           |
| `Projected`                   | The value is an estimate and may change.                     | Estimated Creator Rewards payout for a period that hasn't been finalized yet.               |
| `NotStatisticallySignificant` | The sample size is insufficient to produce a reliable value. | Crash rate for a small country where a noisy value could be mistaken for a real regression. |

## Granularity options

The `granularity` field controls the size of each time bucket in the response. Bucket boundaries are aligned to UTC. For example, `OneDay` buckets run from UTC midnight to UTC midnight, so any UTC offset in `startTime` or `endTime` is normalized to UTC before bucketing.

Not every metric supports every granularity. See [Supported metrics](metrics.md) for details.

| Granularity | Description                            | Notes                                                                       |
| :---------- | :------------------------------------- | :-------------------------------------------------------------------------- |
| `OneMinute` | 1-minute buckets                       | Performance metrics only.                                                   |
| `HalfHour`  | 30-minute buckets                      | Performance metrics only.                                                   |
| `OneHour`   | 1-hour buckets                         | Performance metrics, plus some monetization and recommended-events metrics. |
| `OneDay`    | 1-day buckets                          | Supported by all metrics.                                                   |
| `OneWeek`   | 1-week buckets                         | Most engagement, monetization, and acquisition metrics.                     |
| `OneMonth`  | 1-month buckets                        | Most engagement, monetization, and acquisition metrics.                     |
| `None`      | Single data point for the entire range | Most engagement, monetization, and acquisition metrics.                     |

<Alert severity="warning">
Date ranges longer than two years only support `OneWeek`, `OneMonth`, or `None`.
</Alert>

## Use breakdowns

Not every metric supports every breakdown. See [Supported metrics](metrics.md) for which breakdowns are available for each metric.

Breakdowns group metric results by a dimension, returning one series per unique dimension value. Add a `breakdown` array with one or more dimension names to your request.

```bash title="Query revenue broken down by platform"
curl --location 'https://apis.roblox.com/analytics-query-api/v1/universes/${UniverseId}/metrics' \
--header 'x-api-key: ${ApiKey}' \
--header 'Content-Type: application/json' \
--data '{
    "metric": "DailyRevenue",
    "granularity": "OneDay",
    "breakdown": ["Platform"],
    "startTime": "2026-01-01T00:00:00Z",
    "endTime": "2026-02-01T00:00:00Z"
}'
```

Each entry in `response.values` includes a `breakdowns` array identifying the dimension value for that series:

```json
{
  "response": {
    "values": [
      {
        "breakdowns": [{ "dimension": "Platform", "value": "Computer" }],
        "dataPoints": [{ "time": "2026-01-01T00:00:00Z", "value": 8200 }]
      },
      {
        "breakdowns": [{ "dimension": "Platform", "value": "Phone" }],
        "dataPoints": [{ "time": "2026-01-01T00:00:00Z", "value": 3400 }]
      }
    ]
  }
}
```

Each object in `breakdowns` has:

| Field          | Description                                                                                                                                                         |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `dimension`    | The dimension name, matching the entry in the `breakdown` request field.                                                                                            |
| `value`        | The raw dimension value. Use this when constructing `filter` queries.                                                                                               |
| `displayValue` | A human-readable label for the dimension value. Omitted when no display label exists. May differ from `value` for dimensions like product IDs or funnel step names. |

## Filter results

Filters narrow query results to specific dimension values. Add a `filter` array to your request, where each entry specifies a `dimension`, the `values` to match, and the `operation` to apply.

```bash title="Query DAU for mobile devices only"
curl --location 'https://apis.roblox.com/analytics-query-api/v1/universes/${UniverseId}/metrics' \
--header 'x-api-key: ${ApiKey}' \
--header 'Content-Type: application/json' \
--data '{
    "metric": "DailyActiveUsers",
    "granularity": "OneDay",
    "filter": [
        {
            "dimension": "Platform",
            "values": ["Phone", "Tablet"],
            "operation": "In"
        }
    ],
    "startTime": "2026-01-01T00:00:00Z",
    "endTime": "2026-02-01T00:00:00Z"
}'
```

### Filter operations

| Operation            | Description                                                                                       |
| :------------------- | :------------------------------------------------------------------------------------------------ |
| `In`                 | Include results where the dimension value is in the provided set.                                 |
| `NotIn`              | Exclude results where the dimension value is in the provided set.                                 |
| `GreaterThan`        | Include results where the numeric dimension value is greater than the provided value.             |
| `GreaterThanOrEqual` | Include results where the numeric dimension value is greater than or equal to the provided value. |
| `LessThan`           | Include results where the numeric dimension value is less than the provided value.                |
| `LessThanOrEqual`    | Include results where the numeric dimension value is less than or equal to the provided value.    |
| `Match`              | Include results where the dimension value matches the provided string pattern.                    |

You can combine filters with breakdowns in the same request.

## Discover dimension values

The dimension values endpoint lists the available values for one or more dimensions of a metric over a date range, without computing the metric itself. Use it to discover valid values for `filter` and `breakdown` queries — for example, countries, product IDs, or funnel step IDs.

To query dimension values for your experience:

1. Copy the API key to the `x-api-key` request header.
1. Replace `${UniverseId}` in the URL with your experience's universe ID.
1. Set `metric` to the metric that provides context for the dimensions.
1. Set `dimensions` to the dimension names you want values for.
1. Set `startTime` and `endTime` to the date range you want, using RFC&nbsp;3339 UTC timestamps.
1. Send the request.

```bash title="Discover country values for DAU"
curl --location 'https://apis.roblox.com/analytics-query-api/v1/universes/${UniverseId}/dimension-values' \
--header 'x-api-key: ${ApiKey}' \
--header 'Content-Type: application/json' \
--data '{
    "metric": "DailyActiveUsers",
    "dimensions": ["Country"],
    "startTime": "2026-01-01T00:00:00Z",
    "endTime": "2026-02-01T00:00:00Z"
}'
```

### Request body fields

| Field         | Type     | Required | Description                                                                                                                                                                                                                           |
| :------------ | :------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `metric`      | string   | Yes      | The metric whose dimensions to resolve. Provides namespace context for dimension lookup.                                                                                                                                              |
| `dimensions`  | string[] | Yes      | The dimension names to retrieve values for. Each entry is a single dimension name, such as `"Country"`.                                                                                                                               |
| `startTime`   | string   | Yes      | Start of the query window, as an RFC&nbsp;3339 timestamp. Inclusive. Any UTC offset is accepted; results are always bucketed in UTC.                                                                                                  |
| `endTime`     | string   | Yes      | End of the query window, as an RFC&nbsp;3339 timestamp. Exclusive. For example, `"2026-02-01T00:00:00Z"` includes data through January 31.                                                                                            |
| `filter`      | object[] | No       | Filters to narrow results to specific dimension values. Each entry has `dimension`, `values`, and `operation`. Omit for no filtering. See [Filter results](#filter-results).                                                          |
| `granularity` | string   | No       | The time bucket size. Unlike the metrics endpoint, this field is optional. See [Granularity options](#granularity-options).                                                                                                           |
| `limit`       | integer  | No       | Maximum number of values to return per dimension, ranked by total metric value descending. Only supported when `granularity` is omitted or `"None"`. Omitting this field or setting it to `0` applies a metric-dependent default cap. |

Most queries complete immediately and return `200 OK` with `"done": true`. For queries with large date ranges, the API returns `202 Accepted` with `"done": false` and a `path` to poll. See [Long-running operations](#long-running-operations) for the polling flow. When polling, use the `path` value from the response — it points to `v1/universes/{universeId}/operations/dimension-values/{operationId}`, distinct from the metrics poll path.

**Completed (200):**

```json
{
  "path": "path/to/poll",
  "done": true,
  "metadata": {
    "createdTime": "2026-01-15T00:00:00Z"
  },
  "response": {
    "values": [
      {
        "dimension": "Country",
        "values": [{ "value": "US" }, { "value": "GB" }]
      }
    ]
  }
}
```

Each entry in `response.values` represents one requested dimension. Each object in `values` has:

| Field          | Description                                                                                                                                                                                                                              |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`        | The raw dimension value. Use this when constructing `filter` queries.                                                                                                                                                                    |
| `displayValue` | A human-readable label for the dimension value. Only present for ID-like dimensions such as product IDs. Omitted for most dimensions, including `Country`. May differ from `value` for dimensions like product IDs or funnel step names. |

Errors use the same `done: true` and `error` envelope as the metrics endpoint. An unsupported dimension for the specified metric returns `400` with code `2001`. See [Common errors](#common-errors).

## Common queries

The following examples show common queries, including metrics available on the [Creator Dashboard](https://create.roblox.com/dashboard/creations) analytics pages.

### Revenue

```bash title="Query daily revenue in Robux"
curl --location 'https://apis.roblox.com/analytics-query-api/v1/universes/${UniverseId}/metrics' \
--header 'x-api-key: ${ApiKey}' \
--header 'Content-Type: application/json' \
--data '{
    "metric": "DailyRevenue",
    "granularity": "OneDay",
    "startTime": "2026-01-01T00:00:00Z",
    "endTime": "2026-02-01T00:00:00Z"
}'
```

### D1 retention

```bash title="Query D1 retention"
curl --location 'https://apis.roblox.com/analytics-query-api/v1/universes/${UniverseId}/metrics' \
--header 'x-api-key: ${ApiKey}' \
--header 'Content-Type: application/json' \
--data '{
    "metric": "ForwardD1Retention",
    "granularity": "OneDay",
    "startTime": "2026-01-01T00:00:00Z",
    "endTime": "2026-02-01T00:00:00Z"
}'
```

### New users vs. returning users

```bash title="Query DAU broken down by new vs. returning"
curl --location 'https://apis.roblox.com/analytics-query-api/v1/universes/${UniverseId}/metrics' \
--header 'x-api-key: ${ApiKey}' \
--header 'Content-Type: application/json' \
--data '{
    "metric": "DailyActiveUsers",
    "granularity": "OneDay",
    "breakdown": ["IsNewUser"],
    "startTime": "2026-01-01T00:00:00Z",
    "endTime": "2026-02-01T00:00:00Z"
}'
```

### Weekly aggregation

Use a coarser granularity for a longer-range view with fewer data points. At `OneWeek` granularity, each bucket counts distinct users across the full seven-day period — not a sum of daily values.

```bash title="Query for DAU at weekly granularity"
curl --location 'https://apis.roblox.com/analytics-query-api/v1/universes/${UniverseId}/metrics' \
--header 'x-api-key: ${ApiKey}' \
--header 'Content-Type: application/json' \
--data '{
    "metric": "DailyActiveUsers",
    "granularity": "OneWeek",
    "startTime": "2026-01-01T00:00:00Z",
    "endTime": "2026-04-01T00:00:00Z"
}'
```

### Top-N breakdown

To rank by one metric and display another for the same set of values, use two requests. For example, to see paying-user conversion for the top 5 countries by DAU:

**Step 1:** Discover the top N dimension values. Use `granularity: "None"` for a single aggregated result and `limit` to cap the number of series returned:

```bash title="Discover top 5 countries by DAU"
curl --location 'https://apis.roblox.com/analytics-query-api/v1/universes/${UniverseId}/metrics' \
--header 'x-api-key: ${ApiKey}' \
--header 'Content-Type: application/json' \
--data '{
    "metric": "DailyActiveUsers",
    "granularity": "None",
    "breakdown": ["Country"],
    "startTime": "2026-01-01T00:00:00Z",
    "endTime": "2026-02-01T00:00:00Z",
    "limit": 5
}'
```

**Step 2:** Query the display metric, filtered to the values returned in step 1:

```bash title="Paying-user conversion for the top 5 countries"
curl --location 'https://apis.roblox.com/analytics-query-api/v1/universes/${UniverseId}/metrics' \
--header 'x-api-key: ${ApiKey}' \
--header 'Content-Type: application/json' \
--data '{
    "metric": "PayingUsersCVR",
    "granularity": "OneDay",
    "breakdown": ["Country"],
    "filter": [
        {
            "dimension": "Country",
            "values": ["US", "GB", "PH", "VN", "DE"],
            "operation": "In"
        }
    ],
    "startTime": "2026-01-01T00:00:00Z",
    "endTime": "2026-02-01T00:00:00Z"
}'
```

### Funnel steps

Funnels show how users progress through a defined sequence of steps in your experience. Querying funnel metrics requires two requests, because the step IDs are dynamic.

**Step 1:** Discover the funnel steps. A funnel step only appears in results for days when at least one user reached that step. Using a longer lookback (90 days is a safe default) ensures infrequently-reached steps still appear in the discovery response. Use `granularity: "None"` to get a single aggregated result per step:

```bash title="Discover funnel steps for the Levels funnel"
curl --location 'https://apis.roblox.com/analytics-query-api/v1/universes/${UniverseId}/metrics' \
--header 'x-api-key: ${ApiKey}' \
--header 'Content-Type: application/json' \
--data '{
    "metric": "FunnelUserTotalCount",
    "granularity": "None",
    "breakdown": ["FunnelStep"],
    "filter": [
        {
            "dimension": "FunnelName",
            "values": ["Levels"],
            "operation": "In"
        }
    ],
    "startTime": "2025-11-01T00:00:00Z",
    "endTime": "2026-02-01T00:00:00Z"
}'
```

**Step 2:** Query the funnel metric for each step, filtering to the step IDs returned in step 1:

```bash title="User churn rate per step for the Levels funnel"
curl --location 'https://apis.roblox.com/analytics-query-api/v1/universes/${UniverseId}/metrics' \
--header 'x-api-key: ${ApiKey}' \
--header 'Content-Type: application/json' \
--data '{
    "metric": "FunnelUserChurnRate",
    "granularity": "None",
    "breakdown": ["FunnelStep"],
    "filter": [
        {
            "dimension": "FunnelStep",
            "values": ["1", "2", "3", "4", "5"],
            "operation": "In"
        },
        {
            "dimension": "FunnelName",
            "values": ["Levels"],
            "operation": "In"
        }
    ],
    "startTime": "2026-01-01T00:00:00Z",
    "endTime": "2026-02-01T00:00:00Z"
}'
```

## Common errors

Most errors are returned as query-operation failures: the response body includes `"done": true` and an `error` object with a numeric `code` and `message` string. Authentication and resource errors (401, 404) are plain HTTP responses with no body envelope, which is why the table below shows `—` for their error codes.

| Status | Code | Cause                                                                                                                                 | Resolution                                                                                                                                            |
| :----- | :--- | :------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| 400    | 2001 | A required field is missing or a field value is invalid (for example, an unrecognized `metric` or `granularity`).                     | Check the [Request body fields](#request-body-fields) table and verify all values are spelled correctly.                                              |
| 400    | 2001 | The requested granularity is not supported for the specified metric or date range.                                                    | See [Granularity options](#granularity-options). For date ranges over two years, use `OneWeek`, `OneMonth`, or `None`.                                |
| 400    | 2001 | A dimension in `filter` or `breakdown` is not supported for the specified metric.                                                     | See [Supported metrics](metrics.md).                                                                                                                  |
| 400    | 2001 | The `startTime` exceeds the data retention period for the metric.                                                                     | Standard metrics retain data for up to four years. Performance metrics retain data for 28 days.                                                       |
| 401    | —    | The `x-api-key` header is missing, invalid, or revoked, or the key does not have the universe analytics permission for this universe. | Verify the key value and confirm the API key has the correct permissions on the [Creator Dashboard](https://create.roblox.com/dashboard/credentials). |
| 404    | —    | The operation ID does not exist.                                                                                                      | Confirm the operation ID returned in the initial response, and verify the universe ID is correct.                                                     |
| 429    | 3000 | The query exceeded the data point budget.                                                                                             | Reduce the date range, use a coarser granularity, or reduce the number of breakdown series using `limit`.                                             |
| 500    | 2000 | An unexpected server error occurred.                                                                                                  | Retry the request. If the error persists, create a new DevForum post.                                                                                 |
| 503    | 2002 | A transient failure occurred.                                                                                                         | Retry the request after a short delay.                                                                                                                |
| 504    | 1000 | The query timed out after the maximum number of retries.                                                                              | Try a shorter date range, fewer breakdowns, or a coarser granularity.                                                                                 |
