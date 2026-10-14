---
title: Benchmarks
description: Use Open Cloud to compare an experience's metrics against other experiences on Roblox.
---

The Benchmarks API lets you compare an experience's metrics against other experiences on Roblox. For a metric and date range, it returns daily benchmark values at one or more percentiles, so you can see how your results compare to similar experiences. This API supports:

- Comparing against experiences in the same genre, experiences with similar players, or the top experiences on Roblox.
- Choosing which percentiles to return, such as the median (50th percentile) or the 90th percentile.
- Using the same metric names as the [Analytics Query API](index.md).

<Alert severity="info">
The Benchmarks API is **Experimental**. It can change at any time without a migration period.
</Alert>

Before using this API, you must [generate an API key](../../auth/api-keys.md) for your experience. When creating the key, add your experience to **Access Permissions** and grant it access to the `universe.analytics:read` operation within the `universe-analytics` system. This is the same permission the [Analytics Query API](index.md) uses. Include the key in the `x-api-key` request header on every request.

All endpoints use your universe ID, which you can find on the [Creator Dashboard](https://create.roblox.com/dashboard/creations) by selecting your experience and copying the **Universe ID** from the overview page.

## Query a benchmark

To query a benchmark for your experience:

1. Copy the API key to the `x-api-key` request header.
1. Replace `${UniverseId}` in the URL with your experience's universe ID.
1. Set `metric` to the metric you want to benchmark, such as `ForwardD1Retention`.
1. Set `startTime` and `endTime` to the date range you want, using RFC&nbsp;3339 UTC timestamps.
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

The response contains one series for each requested percentile. In this example, the request omits `percentiles`, so the API returns the default percentiles:

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

The values in the response are examples. The API returns real benchmark values in the metric's own units.

### Request body fields

| Field                | Type      | Required | Description                                                                                                                                                                                                                                                                 |
| :------------------- | :-------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `metric`             | string    | Yes      | The metric to benchmark, using the same metric names as the Analytics Query API. For example, `ForwardD1Retention`. See [Supported metrics](metrics.md). Metrics without benchmark data return no values.                                                                   |
| `startTime`          | string    | Yes      | Start of the date range, as an RFC&nbsp;3339 timestamp. Inclusive.                                                                                                                                                                                                          |
| `endTime`            | string    | Yes      | End of the date range, as an RFC&nbsp;3339 timestamp. **Inclusive**, unlike the Analytics Query API, where `endTime` is exclusive. For example, `"2026-01-31T00:00:00Z"` includes data for January 31. Must not be earlier than `startTime`, and at most 400 days after it. |
| `benchmarkType`      | string    | No       | The comparison group to return. See [Benchmark types](#benchmark-types). When omitted, the API picks a default for the metric.                                                                                                                                              |
| `percentiles`        | integer[] | No       | The percentiles to return, each between 0 and 100, with at most 10 values. Defaults to 50 and 90, or 10 and 50 when lower values are favorable for the metric. See [Choose percentiles](#choose-percentiles).                                                               |
| `filter`             | object[]  | No       | Dimension filters, where each entry has `dimension` and `value`. Only applied to `BENCHMARK_TYPE_TOP_EXPERIENCES` benchmarks, and ignored otherwise. Filter values without benchmark data return no values.                                                                 |
| `benchmarkVariantId` | string    | No       | The metric variant to benchmark. The only supported value is `l7_average`, which benchmarks the 7-day rolling average of `metric`. Omit to benchmark `metric` itself.                                                                                                       |

## Benchmark types

The `benchmarkType` field controls which experiences your metric is compared against.

| Type                             | Compares against                                                                                                                                                |
| :------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BENCHMARK_TYPE_GENRE`           | Experiences in the same genre. If your experience's genre has no genre benchmarks, the API compares against all experiences, and `metadata.genre` is `general`. |
| `BENCHMARK_TYPE_SIMILARITY`      | Experiences with similar players.                                                                                                                               |
| `BENCHMARK_TYPE_TOP_EXPERIENCES` | The top experiences on Roblox. This is the only type for overall-success metrics such as `DailyActiveUsers`, `DailyRevenue`, and `Visits`.                      |

When you omit `benchmarkType`, overall-success metrics return `BENCHMARK_TYPE_TOP_EXPERIENCES` benchmarks. Other metrics return genre benchmarks, with similarity benchmarks replacing them on dates where both exist. Each data point's `metadata.benchmarkType` tells you which type it came from.

If the type you request has no data for the metric, the response contains no values and `availableTypes` lists the types that do have data. Use it to retry with a supported type:

```json title="Response when the requested type has no data"
{
  "result": {},
  "availableTypes": ["BENCHMARK_TYPE_TOP_EXPERIENCES"],
  "objective": "BENCHMARK_OBJECTIVE_MAXIMIZE"
}
```

## Choose percentiles

The `percentiles` field sets which percentiles of the comparison group the API returns. Each percentile becomes one series in `result.values`, identified by the `Percentile` dimension in `breakdownValue`.

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
- Percentiles without benchmark data return no values.
- `BENCHMARK_TYPE_TOP_EXPERIENCES` benchmarks ignore `percentiles`. They return a single percentile, chosen from your experience's own value over the last 30 days, or a fixed percentile for some metrics.

## Read the response

The response has three top-level fields:

| Field            | Description                                                                                                                                                                   |
| :--------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `result.values`  | The benchmark series, one per percentile.                                                                                                                                     |
| `availableTypes` | The benchmark types that have data for the metric.                                                                                                                            |
| `objective`      | Which direction is favorable for the metric. `BENCHMARK_OBJECTIVE_MAXIMIZE` means higher values are better, and `BENCHMARK_OBJECTIVE_MINIMIZE` means lower values are better. |

Each entry in `result.values` represents one series and has:

| Field            | Description                                                                                                                                                  |
| :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `breakdownValue` | The dimensions identifying the series. Always includes a `Percentile` dimension. `BENCHMARK_TYPE_TOP_EXPERIENCES` series also include the requested filters. |
| `dataPoints`     | The benchmark values for the series, one per date.                                                                                                           |

Each data point in `dataPoints` has:

| Field                    | Description                                                                                                                            |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `time`                   | UTC timestamp for the date of the benchmark value.                                                                                     |
| `value`                  | The benchmark value, in the metric's units.                                                                                            |
| `metadata.benchmarkType` | The benchmark type the value came from. Use it to tell genre and similarity values apart when you omit `benchmarkType` in the request. |
| `metadata.genre`         | The genre compared against. Set only for `BENCHMARK_TYPE_GENRE` data points. `general` means all experiences.                          |

To compare your experience to a benchmark, query the same metric and date range with the [Analytics Query API](index.md), then compare your values to the benchmark values for each date. Because the Benchmarks API's `endTime` is inclusive and the Analytics Query API's is exclusive, set the Analytics Query API's `endTime` one day later to cover the same dates.

## Common errors

Errors use standard HTTP status codes.

| Status | Cause                                                                                                                                                                                                                                             | Resolution                                                                                                                                            |
| :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| 400    | `startTime` or `endTime` is missing, `endTime` is earlier than `startTime`, the date range is longer than 400 days, more than 10 `percentiles` were requested, a percentile is outside 0 to 100, or `benchmarkVariantId` isn't a supported value. | Check the [Request body fields](#request-body-fields) table and verify all values.                                                                    |
| 403    | The `x-api-key` header is missing, invalid, or revoked, the key doesn't have the `universe.analytics:read` operation for this universe, or the key's creator can't view analytics for the experience.                                             | Verify the key value and confirm the API key has the correct permissions on the [Creator Dashboard](https://create.roblox.com/dashboard/credentials). |
| 429    | You sent too many requests.                                                                                                                                                                                                                       | Wait and retry with a lower request rate.                                                                                                             |
| 500    | An unexpected server error occurred. The response message is `An internal error occurred.`                                                                                                                                                        | Retry the request. If the error persists, create a new DevForum post.                                                                                 |
