---
title: Journeys configs
description: Use Open Cloud to read and update journey configs programmatically. This guide walks through creating journeys, publishing, verifying changes, and rolling back.
---

Use Open Cloud to read and update [journey](../../production/analytics/journey-events.md) configs programmatically rather than using Creator Hub. This guide covers a typical flow:

- Create or update a draft journey config.
- Publish it.
- Get the latest journey definitions.
- Roll back to a prior definition using version history.

A journey config is the stage map for `Class.AnalyticsService:LogJourneyEvent()`. Each entry key is a journey name. The value lists the stages in that journey and the node names that belong to each stage. Creator Hub uses the published map to draw the journey Sankey chart. Publishing a journey config doesn't push values into the experience through `Class.ConfigService`. Your server scripts still log events with `Class.AnalyticsService:LogJourneyEvent()`. The `journeyName` and `nodeName` arguments in those calls must match the entry key and `node_name` values you publish here.

Before you start, [generate an API key](../auth/api-keys.md) or [configure an OAuth 2.0 app](../auth/oauth2-overview.md). Read operations require the `universe:read` scope. Write operations (drafts, publish, restore) need `universe:write`.

All endpoints use your universe ID, which you can find on the [Creator Dashboard](https://create.roblox.com/dashboard/creations). Click the experience tile overflow menu and **Copy Universe ID**.

This guide uses the same configs API as [experience configs](./configs.md). The only path difference is the repository name: `JourneysConfig`.

## Repositories

Requests use a **repository** in the path and an **entries** object in the request body. For journeys, the repository is `JourneysConfig`. Each entry key is one journey name, and each entry value is one journey object:

```json
PATCH /creator-configs-public-api/v1/configs/universes/<UNIVERSE_ID>/repositories/JourneysConfig/draft
{
  "entries": {
    "onboarding": {
      "stages": [
        {
          "stage_index": 1,
          "nodes": [{ "node_name": "welcome" }]
        }
      ]
    }
  }
}
```

- **Repositories** differ by product. Journey definitions live in `JourneysConfig`. In-experience key-value configs live in `InExperienceConfig` and are a different repository.
- **Entries** are journey name to journey object. The object isn't a flat scalar. Field names are snake_case: `stages`, `stage_index`, `nodes`, and `node_name`.

`JourneysConfig` maps to the internal `JourneysConfiguration` repository and namespace. Callers send `JourneysConfig` in the path; they don't send the internal namespace name.

## Journey entry shape

One published repository holds every journey for the universe. The entry key is the journey name passed to `LogJourneyEvent`. The value is a JSON object:

```json
{
  "stages": [
    {
      "stage_index": 1,
      "nodes": [
        { "node_name": "tutorial_start" },
        { "node_name": "tutorial_done" }
      ]
    },
    {
      "stage_index": 2,
      "nodes": [{ "node_name": "entered_desert" }]
    }
  ]
}
```

- `stage_index` values must be unique whole numbers from 1 to 10 and form a contiguous sequence starting at 1 (1, then 2, then 3, with no gaps). The array can list stages out of numeric order. `stage_index` 0 is reserved for the `__entry__` sentinel used by the analytics pipeline. Don't send it.
- Each stage holds 1 to 10 nodes. `node_name` values must be unique within a stage and at most 50 characters. A name must not start with `__` or contain a comma, a double quote, an apostrophe, a carriage return, a line feed, or a NUL character. The same name can appear in different stages.

A matching server call looks like this:

```lua
local AnalyticsService = game:GetService("AnalyticsService")

-- Stage 1
AnalyticsService:LogJourneyEvent(player, "onboarding", "tutorial_start")
AnalyticsService:LogJourneyEvent(player, "onboarding", "tutorial_done")

-- Stage 2
AnalyticsService:LogJourneyEvent(player, "onboarding", "entered_desert")
```

## Create or update configs

Before going live, config changes are staged as drafts. You can set the entire repository in one operation or change only some journeys:

- **Starting from scratch or replacing everything** — Use the overwrite endpoint so that the payload is the full desired state. Any journey key you omit is treated as removed.
- **Changing only some journeys** — Use the partial update endpoint so only the keys you send are updated. Every other journey stays as-is.
- **Removing one journey** — Send that key with a JSON `null` value on the partial update endpoint. A `null` value is a deletion. It's accepted even when the existing name is longer than the current name limit, so older journeys can still be removed.

This sample creates a journey named `onboarding` with the overwrite endpoint:

<Tabs>
  <TabItem key="1" label="Python">

```python
import requests

API_KEY = "<API_KEY>"
UNIVERSE_ID = "<UNIVERSE_ID>"
BASE = f"https://apis.roblox.com/creator-configs-public-api/v1/configs/universes/{UNIVERSE_ID}/repositories/JourneysConfig"
headers = {"x-api-key": API_KEY, "Content-Type": "application/json"}

# Optional: send draftHash if you have an existing draft and want optimistic concurrency
payload = {
    "entries": {
        "onboarding": {
            "stages": [
                {
                    "stage_index": 1,
                    "nodes": [
                        {"node_name": "tutorial_start"},
                        {"node_name": "tutorial_done"},
                    ],
                },
                {
                    "stage_index": 2,
                    "nodes": [
                        {"node_name": "entered_desert"},
                    ],
                },
            ]
        }
    }
}
r = requests.put(f"{BASE}/draft:overwrite", headers=headers, json=payload)
r.raise_for_status()
draft = r.json()
draft_hash = draft["draftHash"]  # Keep this for publishing
print("Draft staged. draftHash:", draft_hash)
```

  </TabItem>
  <TabItem key="2" label="cURL">

```bash
curl --request PUT \
  "https://apis.roblox.com/creator-configs-public-api/v1/configs/universes/<UNIVERSE_ID>/repositories/JourneysConfig/draft:overwrite" \
  --header "x-api-key: <API_KEY>" \
  --header "Content-Type: application/json" \
  --data '{
    "entries": {
      "onboarding": {
        "stages": [
          {
            "stage_index": 1,
            "nodes": [
              {"node_name": "tutorial_start"},
              {"node_name": "tutorial_done"}
            ]
          },
          {
            "stage_index": 2,
            "nodes": [
              {"node_name": "entered_desert"}
            ]
          }
        ]
      }
    }
  }'
```

  </TabItem>
</Tabs>

The response includes the `draftHash` value. You need this hash in order to publish. To change one journey and leave the others in place, `PATCH /draft` and send only that journey:

<Tabs>
  <TabItem key="1" label="Python">

```python
patch_payload = {
    "entries": {
        "onboarding": {
            "stages": [
                {
                    "stage_index": 1,
                    "nodes": [{"node_name": "welcome"}],
                }
            ]
        }
    }
}
r = requests.patch(f"{BASE}/draft", headers=headers, json=patch_payload)
r.raise_for_status()
draft_hash = r.json()["draftHash"]
```

  </TabItem>
  <TabItem key="2" label="cURL">

```bash
curl --request PATCH \
  "https://apis.roblox.com/creator-configs-public-api/v1/configs/universes/<UNIVERSE_ID>/repositories/JourneysConfig/draft" \
  --header "x-api-key: <API_KEY>" \
  --header "Content-Type: application/json" \
  --data '{"entries":{"onboarding":{"stages":[{"stage_index":1,"nodes":[{"node_name":"welcome"}]}]}}}'
```

  </TabItem>
</Tabs>

To rename a journey in one draft update, set the old key to `null` and write the new key in the same `entries` object.

A journey value that isn't an object, or an object that fails the rules in [Limitations](#limitations), is rejected before the draft is saved. The response is `400 Bad Request`.

### About draft hashes

A **draft hash** is an opaque identifier for the current state of your draft. The API returns it after any read or write operation to a draft (create, update, overwrite, reset, restore).

When updating or publishing drafts, send `draftHash` in the request body. There is no `previousDraftHash` field. If the hash doesn't match the server's current draft (for example, someone else published or edited in the meantime), the request fails with `400 Bad Request`. Re-read the updated draft, take the new hash, and retry or merge changes.

Save the `draftHash` from the last draft response when you want that check. If you omit `draftHash` on publish, the API uses the current draft. Read the current draft with `GET` on the same `/draft` path. The response includes `draftHash`. Each draft entry is an object with `value` and `description`, and the journey object is `value`. Copy `value` into a later update. Sending the whole entry object fails validation.

## Publish your changes

When the draft is ready, publish it. Pass `draftHash` from the draft response, `message` for version history, and `deploymentStrategy` (`GradualRollout` for a 15-minute rollout, or `Immediate`). Creator Hub publishes journey configs with `Immediate`.

<Tabs>
  <TabItem key="1" label="Python">

```python
publish_payload = {
    "draftHash": draft_hash,
    "message": "Add onboarding journey",
    "deploymentStrategy": "Immediate",
}
r = requests.post(f"{BASE}/publish", headers=headers, json=publish_payload)
r.raise_for_status()
result = r.json()
print("Published. configVersion:", result["configVersion"])
```

  </TabItem>
  <TabItem key="2" label="cURL">

```bash
curl --request POST \
  "https://apis.roblox.com/creator-configs-public-api/v1/configs/universes/<UNIVERSE_ID>/repositories/JourneysConfig/publish" \
  --header "x-api-key: <API_KEY>" \
  --header "Content-Type: application/json" \
  --data '{
    "draftHash": "<DRAFT_HASH>",
    "message": "Add onboarding journey",
    "deploymentStrategy": "Immediate"
  }'
```

  </TabItem>
</Tabs>

After a successful publish, the draft is cleared. The response includes the new config version:

```json
{
  "configVersion": 6
}
```

The publish `message` must not start with `_`, `RBX_`, or `ROBLOX_`. `Add RBX onboarding` is accepted.

## Get your published config

Fetch the latest published journeys to confirm the change. Use the values endpoint when you only need journey names and their stage maps. On that endpoint, each entry is the journey object.

Use the full endpoint when you also need per-entry metadata such as `lastModifiedTime`. On `GET /full`, each entry is a wrapper. The journey object is `value`, and `lastModifiedTime` is a field on that wrapper:

```json
{
  "entries": {
    "onboarding": {
      "value": {
        "stages": [
          {
            "stage_index": 1,
            "nodes": [{ "node_name": "welcome" }]
          }
        ]
      },
      "description": null,
      "lastModifiedTime": "2026-11-02T00:00:00Z",
      "lastAccessedTime": "2026-11-02T00:00:00Z",
      "variants": []
    }
  }
}
```

<Tabs>
  <TabItem key="1" label="Python">

```python
r = requests.get(BASE, headers=headers)
r.raise_for_status()
config = r.json()
onboarding = config["entries"].get("onboarding")
print("Published onboarding:", onboarding)

# Full metadata wraps each journey under "value":
# full = requests.get(f"{BASE}/full", headers=headers)
# onboarding = full.json()["entries"]["onboarding"]["value"]
```

  </TabItem>
  <TabItem key="2" label="cURL">

```bash
curl --location \
  "https://apis.roblox.com/creator-configs-public-api/v1/configs/universes/<UNIVERSE_ID>/repositories/JourneysConfig" \
  --header "x-api-key: <API_KEY>"
```

  </TabItem>
</Tabs>

A values response looks like this:

```json
{
  "metadata": {
    "configVersion": 6
  },
  "entries": {
    "onboarding": {
      "stages": [
        {
          "stage_index": 1,
          "nodes": [
            { "node_name": "tutorial_start" },
            { "node_name": "tutorial_done" }
          ]
        },
        {
          "stage_index": 2,
          "nodes": [{ "node_name": "entered_desert" }]
        }
      ]
    }
  }
}
```

There's no get-by-name endpoint. Read the repository and select the journey key you need.

## Remove a journey

Stage a deletion by setting the journey key to `null`, then publish that draft.

<Tabs>
  <TabItem key="1" label="Python">

```python
r = requests.patch(
    f"{BASE}/draft",
    headers=headers,
    json={"entries": {"onboarding": None}},
)
r.raise_for_status()
draft_hash = r.json()["draftHash"]

r = requests.post(
    f"{BASE}/publish",
    headers=headers,
    json={
        "draftHash": draft_hash,
        "message": "Remove onboarding journey",
        "deploymentStrategy": "Immediate",
    },
)
r.raise_for_status()
```

  </TabItem>
  <TabItem key="2" label="cURL">

```bash
curl --request PATCH \
  "https://apis.roblox.com/creator-configs-public-api/v1/configs/universes/<UNIVERSE_ID>/repositories/JourneysConfig/draft" \
  --header "x-api-key: <API_KEY>" \
  --header "Content-Type: application/json" \
  --data '{"entries":{"onboarding":null}}'
```

  </TabItem>
</Tabs>

Publish the returned `draftHash` the same way as any other draft.

## View history and roll back

Every publish creates a revision. List revisions to see who changed what and when, then restore a previous revision to roll back.

Each revision includes `revisionId`, `version`, `time`, `publishedBy`, `message`, and `changes` (the key, the before value, and the after value). Journey changes show the journey object, not a scalar.

<Tabs>
  <TabItem key="1" label="Python">

```python
r = requests.get(f"{BASE}/revisions", headers=headers, params={"MaxPageSize": 10})
r.raise_for_status()
data = r.json()
for rev in data["revisions"]:
    print(rev["version"], rev["time"], rev["message"], "— revisionId:", rev["revisionId"])
```

  </TabItem>
  <TabItem key="2" label="cURL">

```bash
curl --location \
  "https://apis.roblox.com/creator-configs-public-api/v1/configs/universes/<UNIVERSE_ID>/repositories/JourneysConfig/revisions?MaxPageSize=10" \
  --header "x-api-key: <API_KEY>"
```

  </TabItem>
</Tabs>

Restore clears the current draft and stages the selected revision. It doesn't publish. Publish the returned `draftHash` to make the rollback live.

<Tabs>
  <TabItem key="1" label="Python">

```python
REVISION_ID = "1234567890"  # From the list above
r = requests.post(f"{BASE}/revisions/{REVISION_ID}/restore", headers=headers)
r.raise_for_status()
restore_hash = r.json()["draftHash"]

r = requests.post(
    f"{BASE}/publish",
    headers=headers,
    json={
        "draftHash": restore_hash,
        "message": "Rollback to previous journeys",
        "deploymentStrategy": "Immediate",
    },
)
r.raise_for_status()
print("Rollback published. configVersion:", r.json()["configVersion"])
```

  </TabItem>
  <TabItem key="2" label="cURL">

```bash
curl --request POST \
  "https://apis.roblox.com/creator-configs-public-api/v1/configs/universes/<UNIVERSE_ID>/repositories/JourneysConfig/revisions/<REVISION_ID>/restore" \
  --header "x-api-key: <API_KEY>"

curl --request POST \
  "https://apis.roblox.com/creator-configs-public-api/v1/configs/universes/<UNIVERSE_ID>/repositories/JourneysConfig/publish" \
  --header "x-api-key: <API_KEY>" \
  --header "Content-Type: application/json" \
  --data '{"draftHash":"<DRAFT_HASH>","message":"Rollback to previous journeys","deploymentStrategy":"Immediate"}'
```

  </TabItem>
</Tabs>

## Limitations

These limits apply to every journey entry. Requests that break them fail validation and don't update the draft.

### Repository limits

Shared with the [configs API](./configs.md#limitations): entry keys may contain only letters, numbers, `.`, `-`, and `_`. A key can't be empty, whitespace, or start with `_`. The segment `.RBX.` is reserved. Journey names are tighter than the shared key-length cap — see below.

### Journey name

The entry key is the journey name. The engine drops journey events whose name is longer than 50 characters, so a longer key could never receive analytics data. Deleting an already stored name that exceeds 50 characters is still allowed: send that key as `null`.

### Stages

`stage_index` must be a whole number from 1 to 10. The values must be unique and form a contiguous sequence starting at 1. The API accepts a journey with a single stage (`stage_index` 1). The Creator Hub journey editor requires at least 2 stages before it saves. `stage_index` 11 is out of range, so a journey has at most 10 stages.

### Nodes

A stage holds 1 to 10 nodes. `node_name` is at most 50 characters. A single leading underscore is allowed (`_internal`). The name must not start with `__`. It must not contain a comma, a double quote, an apostrophe, a carriage return, a line feed, or a NUL character.

### Validation error paths

When a field is invalid, the error key points at that field. Examples:

- `onboarding.stages` when `stages` is missing or empty
- `onboarding.stages[0].stage_index` when `stage_index` is out of range
- `onboarding.stages[1].nodes[0].node_name` when a node name is invalid

A gap in stage indices (1, 2, 4) fails with key `onboarding` and a message that the indices must be sequential starting from 1. Duplicate `stage_index` values and duplicate `node_name` values inside one stage are reported as duplicate list items. The duplicate key points at the repeated item, such as `onboarding.stages[1]` or `onboarding.stages[0].nodes[1]`.

For full details on all the endpoints in this guide, see the [Cloud API reference](/cloud/reference/features/configs).
