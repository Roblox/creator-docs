---
title: Benchmarks
description: Use Open Cloud to compare an experience's metrics against other experiences on Roblox.
---

The Benchmarks API compares an experience's metrics against other experiences on Roblox. For a metric and date range, the API returns daily benchmark values at one or more percentiles, which show how your results compare to other experiences. This API supports:

- Comparing against experiences in the same genre, experiences with similar players, or the top experiences on Roblox.
- Choosing which percentiles to return, such as the median (50th percentile) or the 90th percentile.
- Using the same metric names as the [Analytics Query API](index.md).

<Alert severity="info">
The Benchmarks API is **Experimental** and might change at any time without a migration period.
</Alert>

Before using this API, you must [generate an API key](../../auth/api-keys.md) for your experience. When creating the key, add your experience to **Access Permissions** and grant it access to the `universe.analytics:read` operation within the `universe-analytics` system. This is the same permission that the [Analytics Query API](index.md) uses. Include the key in the `x-api-key` request header on every request.

The endpoint uses your universe ID. To find it, select your experience on the [Creator Dashboard](https://create.roblox.com/dashboard/creations) and copy the **Universe ID** from the overview page.

## Query a benchmark

To query a benchmark for your experience:

1. Copy the API key to the `x-api-key` request header.
1. Replace `${UniverseId}` in the URL with your experience's universe ID.
1. Set `metric` to the metric you want to benchmark, such as `ForwardD1Retention`.
1. Set `startTime` and `endTime` to the date range you want, using RFC&nbsp;3339 timestamps at midnight UTC.
1. Send the request.

```bash title="Query day 1 retention benchmarks"
curl --location 'https://apis.roblox.com/analytics-benchmark/v1/universes/${UniverseId}/benchmarks' \
--header 'x-api-key: ${ApiKey}' \
--header 'Content-Type: application/json' \
--data '{
    "metric": "ForwardD1Retention",
    "startTime": "2026-01-01T00:00:00Z",
    "endTime": "2026-01-31T00:00:00Z"
}'
```

The response contains one series for each requested percentile. This example omits `percentiles`, so the API returns the default percentiles:

```json title="Response (200 OK)"
{
  "result": {
    "values": [
      {
        "breakdownValue": [{ "dimension": "Percentile", "value": "50" }],
        "dataPoints": [
          {
            "time": "2026-01-01T00:00:00Z",
            "value": 0.3,
            "metadata": {
              "benchmarkType": "BENCHMARK_TYPE_GENRE",
              "genre": "general"
            }
          }
        ]
      },
      {
        "breakdownValue": [{ "dimension": "Percentile", "value": "90" }],
        "dataPoints": [
          {
            "time": "2026-01-01T00:00:00Z",
            "value": 0.45,
            "metadata": {
              "benchmarkType": "BENCHMARK_TYPE_GENRE",
              "genre": "general"
            }
          }
        ]
      }
    ]
  },
  "availableTypes": ["BENCHMARK_TYPE_GENRE", "BENCHMARK_TYPE_SIMILARITY"],
  "objective": "BENCHMARK_OBJECTIVE_MAXIMIZE"
}
```

The values in this response are examples. Real responses contain benchmark values in the units of the metric.

### Request body fields

| Field                | Type      | Required | Description                                                                                                                                                                                                                                                                     |
| :------------------- | :-------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `metric`             | string    | Yes      | The metric to benchmark, using the same metric names as the Analytics Query API, such as `ForwardD1Retention`. See [Supported metrics](metrics.md). Metrics without benchmark data return no data points.                                                                       |
| `startTime`          | string    | Yes      | Start of the date range, as an RFC&nbsp;3339 timestamp. Inclusive. Each benchmark value has a midnight UTC date, so a start time later in the day excludes that day.                                                                                                            |
| `endTime`            | string    | Yes      | End of the date range, as an RFC&nbsp;3339 timestamp. Inclusive, unlike the Analytics Query API, where `endTime` is exclusive. For example, `"2026-01-31T00:00:00Z"` includes data for January 31. Must not be earlier than `startTime`, and must be at most 400 days after it. |
| `benchmarkType`      | string    | No       | The comparison group. See [Benchmark types](#benchmark-types). If you omit this field, the API chooses a default for the metric.                                                                                                                                                |
| `percentiles`        | integer[] | No       | The percentiles to return, each from 0 to 100, with at most 10 values. Defaults to 50 and 90, or to 10 and 50 for metrics where lower values are better. See [Choose percentiles](#choose-percentiles).                                                                         |
| `filter`             | object[]  | No       | Dimension filters, where each entry has `dimension` and `value`. The API applies filters only to `BENCHMARK_TYPE_TOP_EXPERIENCES` benchmarks and ignores them otherwise. Filter values without benchmark data return no data points.                                            |
| `benchmarkVariantId` | string    | No       | The metric variant to benchmark. The only supported value is `l7_average`, which benchmarks the 7-day rolling average of `metric`. Not every metric has this variant, and the API returns `400` for metrics that don't. Omit this field to benchmark `metric` itself.           |

## Benchmark types

The `benchmarkType` field controls which experiences the API compares your metric against.

| Type                             | Compares against                                                                                                                                                                                                         |
| :------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BENCHMARK_TYPE_GENRE`           | Experiences in the same genre. If your experience has no genre, or its genre doesn't qualify for genre benchmarks, the API compares against all experiences and sets `metadata.genre` to `general`.                      |
| `BENCHMARK_TYPE_SIMILARITY`      | Experiences with similar players.                                                                                                                                                                                        |
| `BENCHMARK_TYPE_TOP_EXPERIENCES` | The top experiences on Roblox. This is the only type for `DailyActiveUsers`, `DailyRevenue`, `MonthlyActiveUsers`, `PayingUsers`, `TotalPlayTimeHours`, `UniqueAbuseReportSubmittersPer1000PlaytimeHours`, and `Visits`. |

If you omit `benchmarkType`, the API returns `BENCHMARK_TYPE_TOP_EXPERIENCES` benchmarks for the metrics in the preceding table and genre benchmarks for all other metrics. On dates that also have a similarity benchmark, the similarity value replaces the genre value. The `metadata.benchmarkType` field of each data point shows which type the value came from. If a metric has similarity benchmarks but no genre benchmarks, the series contain no data points, so request `BENCHMARK_TYPE_SIMILARITY` explicitly.

If the requested type has no data for the metric, the response contains no series, and `availableTypes` lists the types that have data. For example, requesting `BENCHMARK_TYPE_GENRE` for `DailyActiveUsers` returns the following response:

```json title="Response when the requested type has no data"
{
  "result": {},
  "availableTypes": ["BENCHMARK_TYPE_TOP_EXPERIENCES"],
  "objective": "BENCHMARK_OBJECTIVE_MAXIMIZE"
}
```

Use `availableTypes` to retry the request with a supported type.

## Choose percentiles

The `percentiles` field sets which percentiles of the comparison group the API returns. The response contains one series per percentile, and the `Percentile` dimension in `breakdownValue` identifies each series.

```bash title="Query the 25th, 50th, and 75th percentiles"
curl --location 'https://apis.roblox.com/analytics-benchmark/v1/universes/${UniverseId}/benchmarks' \
--header 'x-api-key: ${ApiKey}' \
--header 'Content-Type: application/json' \
--data '{
    "metric": "ForwardD1Retention",
    "startTime": "2026-01-01T00:00:00Z",
    "endTime": "2026-01-31T00:00:00Z",
    "benchmarkType": "BENCHMARK_TYPE_GENRE",
    "percentiles": [25, 50, 75]
}'
```

Keep the following in mind:

- Percentiles must be integers from 0 to 100, with at most 10 values per request.
- Percentiles without benchmark data return no data points.
- `BENCHMARK_TYPE_TOP_EXPERIENCES` benchmarks ignore `percentiles` and return a single percentile. The API chooses that percentile from the average value of your experience over the last 30 days, or uses a fixed percentile for some metrics.

## Read the response

The response has three top-level fields:

| Field            | Description                                                                                                                                                                      |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `result.values`  | The benchmark series, one per percentile.                                                                                                                                        |
| `availableTypes` | The benchmark types that have data for the metric.                                                                                                                               |
| `objective`      | The direction that is favorable for the metric. `BENCHMARK_OBJECTIVE_MAXIMIZE` means higher values are better, and `BENCHMARK_OBJECTIVE_MINIMIZE` means lower values are better. |

Each entry in `result.values` represents one series and has the following fields:

| Field            | Description                                                                                                                                                          |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `breakdownValue` | The dimensions that identify the series. Always includes a `Percentile` dimension. For `BENCHMARK_TYPE_TOP_EXPERIENCES` series, also includes the requested filters. |
| `dataPoints`     | The benchmark values for the series, one per date.                                                                                                                   |

Each data point in `dataPoints` has the following fields:

| Field                    | Description                                                                                                                                   |
| :----------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| `time`                   | The UTC date of the benchmark value.                                                                                                          |
| `value`                  | The benchmark value, in the units of the metric.                                                                                              |
| `metadata.benchmarkType` | The benchmark type that the value came from. Use this field to tell genre and similarity values apart when the request omits `benchmarkType`. |
| `metadata.genre`         | The genre that the API compared against. The API sets this field only on `BENCHMARK_TYPE_GENRE` data points. `general` means all experiences. |

To compare your experience to a benchmark, query the same metric and date range with the [Analytics Query API](index.md), then compare your values to the benchmark values for each date. The Benchmarks API treats `endTime` as inclusive and the Analytics Query API treats it as exclusive, so set the Analytics Query API `endTime` one day later to cover the same dates.

## Common errors

Errors use standard HTTP status codes.

| Status | Cause                                                                                                                                                                                                                                                                                                             | Resolution                                                                                                                                                 |
| :----- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 400    | The request is missing `startTime` or `endTime`, `endTime` is earlier than `startTime`, the date range is longer than 400 days, the request includes more than 10 percentiles or a percentile outside 0 to 100, `benchmarkVariantId` isn't supported for the metric, or the universe ID isn't a positive integer. | Check the [Request body fields](#request-body-fields) table and verify all values.                                                                         |
| 403    | The `x-api-key` header is missing, invalid, or revoked, the key doesn't have the `universe.analytics:read` operation for this universe, or the creator of the key can't view analytics for the experience.                                                                                                        | Verify the key value and confirm that the API key has the correct permissions on the [Creator Dashboard](https://create.roblox.com/dashboard/credentials). |
| 429    | Your requests exceed the rate limit.                                                                                                                                                                                                                                                                              | Wait, then retry at a lower request rate.                                                                                                                  |
| 500    | An unexpected server error prevents the request from completing. The response message is `An internal error occurred.`                                                                                                                                                                                            | Retry the request. If the error persists, create a new DevForum post.                                                                                      |
