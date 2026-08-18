---
title: Experiments
description: Use Open Cloud to manage experiments on experience configs programmatically. This guide walks through planning, creating, starting, monitoring, and shipping an experiment.
---

The experiments API lets you manage [experiments](../../production/experiments.md) on your experience [configs](../../production/configs.md) programmatically rather than using the **Experiments** page on Creator Hub. This guide covers a typical flow:

1. Create a draft experiment with variants and a goal metric.
1. Start the experiment, or schedule it to start later.
1. Monitor the experiment.
1. Complete the experiment and roll out a winning variant.

Before you start, [generate an API key](../auth/api-keys.md) or [configure an OAuth 2.0 app](../auth/oauth2-overview.md). Read operations (Get, List, stats) require the `universe:read` scope. Write operations (Create, Update, Discard, Start, Schedule, Complete) require `universe:write`.

All endpoints use your universe ID, which you can find on the [Creator Dashboard](https://create.roblox.com/dashboard/creations). Click the experience tile overflow menu and **Copy Universe ID**.

For the full endpoint reference, request and response schemas, and error codes, see the [Cloud API reference](/cloud/reference).

## Async operations

Mutating endpoints (Create, Update, Discard, Start, Schedule, Complete) don't finish their work synchronously. Each returns an `operation` object describing the in-flight work:

```json
{
  "operation": {
    "operationId": "op_abc123",
    "status": "OPERATIONAL_STATUS_CREATING",
    "done": false
  }
}
```

Poll `GET /v1/experimentation/universes/{universeId}/operations/{operationId}` until `done` is `true`. On success the response includes the resulting `experiment`; on failure it includes a structured `error` with an `errorType`, `errorCode`, and human-readable `errorMessage`.

The same pattern applies to `/stats`, which returns an operation that resolves to stats after the analysis pipeline finishes.

## Create an experiment

Create an in-experience experiment that varies a single config key across one baseline and one treatment variant. Exactly one variant must have `isBaseline: true`, and the `productType` discriminator must match the populated configuration block (`inGameConfigExperimentConfiguration` for config experiments, `matchmakingExperimentConfiguration` for matchmaking).

<Tabs>
  <TabItem key="1" label="Python">

```python
import requests
import time

API_KEY = "<API_KEY>"
UNIVERSE_ID = "<UNIVERSE_ID>"
BASE = f"https://apis.roblox.com/creator-configs-public-api/v1/experimentation/universes/{UNIVERSE_ID}"
headers = {"x-api-key": API_KEY, "Content-Type": "application/json"}

create_payload = {
    "name": "LowerBossHealth",
    "description": "Test a lower boss-health value to see if it improves D1 retention.",
    "experimentConfiguration": {
        "productType": "EXPERIMENT_PRODUCT_TYPE_IN_GAME_CONFIGS",
        "inGameConfigExperimentConfiguration": {
            "variants": [
                {
                    "variantMeta": {
                        "label": "Control",
                        "isBaseline": True,
                        "weight": 50
                    },
                    "configEntry": {
                        "key": "bossHealth"
                    }
                },
                {
                    "variantMeta": {
                        "label": "Treatment A",
                        "isBaseline": False,
                        "weight": 50
                    },
                    "configEntry": {
                        "key": "bossHealth",
                        "entryValue": 300
                    }
                }
            ]
        }
    },
    "exposurePercent": 40,
    "durationSeconds": 14 * 24 * 60 * 60,
    "universeGoalMetric": "UNIVERSE_EXPERIMENT_METRIC_DAY_1_RETENTION"
}
r = requests.post(f"{BASE}/experiments", headers=headers, json=create_payload)
r.raise_for_status()
operation_id = r.json()["operation"]["operationId"]

# Poll until the create operation finishes, then grab the experiment id
while True:
    r = requests.get(f"{BASE}/operations/{operation_id}", headers=headers)
    r.raise_for_status()
    op = r.json()["operation"]
    if op["done"]:
        break
    time.sleep(2)

experiment_id = op["experiment"]["id"]
print("Created experiment:", experiment_id)
```

  </TabItem>
  <TabItem key="2" label="cURL">

```bash
curl --request POST \
  "https://apis.roblox.com/creator-configs-public-api/v1/experimentation/universes/<UNIVERSE_ID>/experiments" \
  --header "x-api-key: <API_KEY>" \
  --header "Content-Type: application/json" \
  --data '{
    "name": "LowerBossHealth",
    "description": "Test a lower boss-health value to see if it improves D1 retention.",
    "experimentConfiguration": {
      "productType": "EXPERIMENT_PRODUCT_TYPE_IN_GAME_CONFIGS",
      "inGameConfigExperimentConfiguration": {
        "variants": [
          { "variantMeta": { "label": "Control", "isBaseline": true,  "weight": 50 }, "configEntry": { "key": "bossHealth" } },
          { "variantMeta": { "label": "Treatment A", "isBaseline": false, "weight": 50 }, "configEntry": { "key": "bossHealth", "entryValue": 300 } }
        ]
      }
    },
    "exposurePercent": 40,
    "durationSeconds": 1209600,
    "universeGoalMetric": "UNIVERSE_EXPERIMENT_METRIC_DAY_1_RETENTION"
  }'
```

  </TabItem>
</Tabs>

The new experiment starts in the `EXPERIMENT_STATE_DRAFT` state. While in draft, you can keep iterating with `PATCH /v1/experimentation/universes/{universeId}/experiments/{experimentId}` (full replacement of mutable fields) or remove it with `DELETE`.

## Start or schedule

When you're happy with the draft, transition it to `RUNNING`. You can start it immediately or schedule it for a future UTC time. After you start or schedule an experiment, its configuration becomes immutable (you can still reschedule, but you can't change duration, rollout, or variants).

<Tabs>
  <TabItem key="1" label="Start now">

```bash
curl --request POST \
  "https://apis.roblox.com/creator-configs-public-api/v1/experimentation/universes/<UNIVERSE_ID>/experiments/<EXPERIMENT_ID>:start" \
  --header "x-api-key: <API_KEY>"
```

  </TabItem>
  <TabItem key="2" label="Schedule">

```bash
curl --request POST \
  "https://apis.roblox.com/creator-configs-public-api/v1/experimentation/universes/<UNIVERSE_ID>/experiments/<EXPERIMENT_ID>:schedule" \
  --header "x-api-key: <API_KEY>" \
  --header "Content-Type: application/json" \
  --data '{ "scheduledStartTime": "2026-06-01T15:00:00Z" }'
```

  </TabItem>
</Tabs>

Both endpoints return an operation. Poll it the same way as `create` until `done` is `true`; on success the experiment will be in `EXPERIMENT_STATE_RUNNING` (start) or `EXPERIMENT_STATE_SCHEDULED` (schedule).

## Monitor

After an experiment has been running for at least 24 hours, you can pull diagnostic stats. The endpoint returns an async operation; poll the `operationId` field until it resolves.

A `/stats` request and response look like this:

```bash
curl --location \
  "https://apis.roblox.com/creator-configs-public-api/v1/experimentation/universes/<UNIVERSE_ID>/experiments/<EXPERIMENT_ID>/stats" \
  --header "x-api-key: <API_KEY>"
```

```json
{
  "operation": {
    "done": true,
    "experimentStats": {
      "isSrmDetected": false
    }
  }
}
```

## Complete the experiment

When you're ready to stop the experiment, call `:complete`. Pass the `variantId` of the variant you want to roll out as the new config value. Omit `variantId` to stop the experiment without choosing a winner; the config falls back to its previous value.

You can find the per-variant `variantId` on the returned experiment object (each `variantMeta.variantId` is assigned after the experiment starts running).

<Tabs>
  <TabItem key="1" label="Python">

```python
complete_payload = {
    "variantId": "<WINNING_VARIANT_ID>"  # omit to stop without rolling out a winner
}
r = requests.post(
    f"{BASE}/experiments/{experiment_id}:complete",
    headers=headers,
    json=complete_payload,
)
r.raise_for_status()
print("Complete operation:", r.json()["operation"]["operationId"])
```

  </TabItem>
  <TabItem key="2" label="cURL">

```bash
curl --request POST \
  "https://apis.roblox.com/creator-configs-public-api/v1/experimentation/universes/<UNIVERSE_ID>/experiments/<EXPERIMENT_ID>:complete" \
  --header "x-api-key: <API_KEY>" \
  --header "Content-Type: application/json" \
  --data '{ "variantId": "<WINNING_VARIANT_ID>" }'
```

  </TabItem>
</Tabs>

After the operation finishes, the experiment moves to `EXPERIMENT_STATE_COMPLETED`. If you chose a winner, the winning variant's value becomes the new published config value, just like calling the [configs publish endpoint](configs.md#publish-your-changes) directly.

## List and inspect experiments

Use the list endpoint to page through experiments for a universe. The response includes lightweight `ExperimentSummary` rows (id, name, state, timestamps, product type, etc.) plus a `total` count of experiments matching the filters across all pages.

```bash
curl --location \
  "https://apis.roblox.com/creator-configs-public-api/v1/experimentation/universes/<UNIVERSE_ID>/experiments?maxPageSize=20&skip=0&sortKey=LIST_EXPERIMENT_SORT_KEY_RELEVANCE&sortOrder=SORT_ORDER_DESCENDING" \
  --header "x-api-key: <API_KEY>"
```

To get the full `ProductExperiment` (including variants and configuration) for a single experiment, call:

```bash
curl --location \
  "https://apis.roblox.com/creator-configs-public-api/v1/experimentation/universes/<UNIVERSE_ID>/experiments/<EXPERIMENT_ID>" \
  --header "x-api-key: <API_KEY>"
```

## Goal metrics

The `universeGoalMetric` field accepts one of the following values:

| Metric                                                       | Description                                                 |
| ------------------------------------------------------------ | ----------------------------------------------------------- |
| `UNIVERSE_EXPERIMENT_METRIC_AVERAGE_SESSION_TIME`            | Average session time, in minutes.                           |
| `UNIVERSE_EXPERIMENT_METRIC_PLAYTIME_PER_USER`               | Total playtime per user, in minutes.                        |
| `UNIVERSE_EXPERIMENT_METRIC_DAY_1_RETENTION`                 | Day-1 retention rate.                                       |
| `UNIVERSE_EXPERIMENT_METRIC_DAY_7_RETENTION`                 | Day-7 retention rate.                                       |
| `UNIVERSE_EXPERIMENT_METRIC_PAYER_CONVERSION_RATE`           | Percent of players who made an experience-related purchase. |
| `UNIVERSE_EXPERIMENT_METRIC_AVERAGE_REVENUE_PER_USER`        | Average revenue per user (ARPU).                            |
| `UNIVERSE_EXPERIMENT_METRIC_AVERAGE_REVENUE_PER_PAYING_USER` | Average revenue per paying user (ARPPU).                    |

For full descriptions of how each metric is computed, see [Metrics](../../production/experiments.md#metrics) in the experiments guide.

## Limitations

| Limit                                     | Maximum                                       |
| ----------------------------------------- | --------------------------------------------- |
| **Experiment duration**                   | 14–60 days                                    |
| **Variants per in-experience experiment** | 1 baseline + up to 2 treatment variants       |
| **Concurrent matchmaking experiments**    | 1 running matchmaking experiment per universe |

For full details on all the endpoints in this guide, see the [Cloud API reference](/cloud/reference).
