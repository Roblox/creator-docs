---
title: Experience configs
description: Use Open Cloud to read and update experience configs programmatically. This guide walks through creating configs, publishing, verifying changes, and rolling back.
---

The configs API lets you manage [experience configs](../../production/configs.md) programmatically rather than using Creator Hub or Studio. This guide covers a typical flow:

- Create or update a draft config.
- Publish it.
- Get the latest config values.
- Roll back to a prior value using version history.

Values you publish are available in your experience right away. In server scripts, use `Class.ConfigService` to read configs and react to real-time updates. `Class.ConfigService:GetConfigAsync()` and `Class.ConfigSnapshot:GetValue()` let you read values, and `Class.ConfigSnapshot.UpdateAvailable` with `Class.ConfigSnapshot:Refresh()` or `Class.ConfigSnapshot:GetValueChangedSignal()` lets you respond when values change. For Luau code samples and further details, see [Add configs to your code](../../production/configs.md#add-configs-to-your-code) and [Refresh snapshots](../../production/configs.md#refresh-snapshots) in the experience configs guide.

Before you start, [generate an API key](../auth/api-keys.md) or [configure an OAuth 2.0 app](../auth/oauth2-overview.md). Read operations require the `universe:read` scope. Write operations (drafts, publish, restore) need `universe:write`.

All endpoints use your universe ID, which you can find on the [Creator Dashboard](https://create.roblox.com/dashboard/creations). Click the experience tile overflow menu and **Copy Universe ID**.

<Alert severity="info">
For in-experience configs, use `UniverseConfiguration` as the repository type and `UniverseConfigurations` as the namespace in your request payloads. Other repository types are currently unsupported.
</Alert>

For the full endpoint reference, request and response schemas, and error codes, see the [Cloud API reference](/cloud/reference).

## Create or update configs

Before going live, config changes are staged as drafts. You can either set the entire config in one operation or apply partial updates until you're happy with it:

- **Starting from scratch or replacing everything** — Use the overwrite endpoint so that the payload is the full desired state. Any key you omit is treated as removed.
- **Changing only some keys** — Use the partial update endpoint so only the keys you send are updated; everything else stays as-is.

This sample code sets `bossHealth` to `100` in the `UniverseConfigurations` namespace and uses the overwrite endpoint:

<Tabs>
  <TabItem key="1" label="Python">

```python
import requests

API_KEY = "<API_KEY>"
UNIVERSE_ID = "<UNIVERSE_ID>"
BASE = f"https://apis.roblox.com/creator-configs-public-api/v1/configs/universes/{UNIVERSE_ID}/repositories/UniverseConfiguration"
headers = {"x-api-key": API_KEY, "Content-Type": "application/json"}

# Optional: send previousDraftHash if you have an existing draft and want optimistic concurrency
payload = {
    "namespaces": {
        "UniverseConfigurations": {
            "bossHealth": 100
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
  "https://apis.roblox.com/creator-configs-public-api/v1/configs/universes/<UNIVERSE_ID>/repositories/UniverseConfiguration/draft:overwrite" \
  --header "x-api-key: <API_KEY>" \
  --header "Content-Type: application/json" \
  --data '{"namespaces":{"UniverseConfigurations":{"bossHealth":100}}}'
```

  </TabItem>
</Tabs>

The response includes the `draftHash` value. You need this hash in order to publish. If you prefer to only tweak a few keys in your draft, use the PATCH method on the `/draft` endpoint and only send the namespaces and keys you want to change.

### About draft hashes

A **draft hash** is an opaque identifier for the current state of your draft. The API returns it after any read or write operation to a draft (create, update, overwrite, reset, restore).

When updating or publishing drafts, you can send `previousDraftHash` in the request body. If the hash doesn't match the server's current draft (e.g. someone else published or edited in the meantime), the request fails. You can then re-read the updated draft, get the new hash, and retry or merge changes.

Always save the `draftHash` from the last draft response before calling publish or before making another draft change if you use `previousDraftHash`.

## Publish your changes

When you're happy with the draft, publish it so the new values go live. Pass `draftHash` from the draft response, `message` for version history purposes, and `deploymentStrategy` (either `GradualRollout` for a 15-minute rollout or `Immediate`). The following sample code deploys the config immediately:

<Tabs>
  <TabItem key="1" label="Python">

```python
publish_payload = {
    "draftHash": draft_hash,
    "message": "Set boss health to 100",
    "deploymentStrategy": "Immediate"
}
r = requests.post(f"{BASE}/publish", headers=headers, json=publish_payload)
r.raise_for_status()
result = r.json()
print("Published. configVersion:", result["configVersion"])
```

  </TabItem>
  <TabItem key="2" label="cURL">

```bash
# Use the draftHash from the previous step
curl --request POST \
  "https://apis.roblox.com/creator-configs-public-api/v1/configs/universes/<UNIVERSE_ID>/repositories/UniverseConfiguration/publish" \
  --header "x-api-key: <API_KEY>" \
  --header "Content-Type: application/json" \
  --data '{
    "draftHash": "<DRAFT_HASH>",
    "message": "Set boss health to 100",
    "deploymentStrategy": "Immediate"
  }'
```

  </TabItem>
</Tabs>

After a successful publish, the draft is cleared, and your experience receives the new config according to the deployment strategy. The response includes the new config version:

```json
{
  "configVersion": 6
}
```

## Get your published config

To confirm the change went through, fetch the latest published config. Use the values-only endpoint when you only need keys and values; use the full endpoint when you also need metadata (descriptions, last-accessed time, etc.). This sample code uses the values-only endpoint, with the full endpoint commented out:

<Tabs>
  <TabItem key="1" label="Python">

```python
# Values only (same shape RCC and your game see)
r = requests.get(BASE, headers=headers)
r.raise_for_status()
config = r.json()
boss_health = config["namespaces"]["UniverseConfigurations"].get("bossHealth")
print("Published bossHealth:", boss_health)  # Should be 100

# Or with full metadata:
# r = requests.get(f"{BASE}/full", headers=headers)
```

  </TabItem>
  <TabItem key="2" label="cURL">

```bash
curl --location \
  "https://apis.roblox.com/creator-configs-public-api/v1/configs/universes/<UNIVERSE_ID>/repositories/UniverseConfiguration" \
  --header "x-api-key: <API_KEY>"
```

  </TabItem>
</Tabs>

Verify that `namespaces.UniverseConfigurations.bossHealth` (or your key) matches what you published.

## View history and roll back

Every publish creates a revision, just like a version control system. You can list revisions to see who changed what and when, then restore to a previous revision if you need to roll back.

This sample code calls the revisions endpoint and prints the results. Each revision includes `revisionId`, `version`, `time`, `publishedBy`, `message`, and `changes` (the key, the "before" value, and the "after" value).

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
  "https://apis.roblox.com/creator-configs-public-api/v1/configs/universes/<UNIVERSE_ID>/repositories/UniverseConfiguration/revisions?MaxPageSize=10" \
  --header "x-api-key: <API_KEY>"
```

  </TabItem>
</Tabs>

To roll back, call the restore endpoint with the **revisionId** you want to revert to. That clears the current draft and stages a revert commit; it does **not** publish. To publish, you must call `publish` with the returned `draftHash`, just like publishing a new change.

<Tabs>
  <TabItem key="1" label="Python">

```python
REVISION_ID = "1234567890"  # From the list above
r = requests.post(f"{BASE}/revisions/{REVISION_ID}/restore", headers=headers)
r.raise_for_status()
restore_draft = r.json()
restore_hash = restore_draft["draftHash"]

# Publish the revert
publish_payload = {
    "draftHash": restore_hash,
    "message": "Rollback to previous config",
    "deploymentStrategy": "Immediate"
}
r = requests.post(f"{BASE}/publish", headers=headers, json=publish_payload)
r.raise_for_status()
print("Rollback published. configVersion:", r.json()["configVersion"])
```

  </TabItem>
  <TabItem key="2" label="cURL">

```bash
# 1) Restore (returns a new draftHash)
curl --request POST \
  "https://apis.roblox.com/creator-configs-public-api/v1/configs/universes/<UNIVERSE_ID>/repositories/UniverseConfiguration/revisions/<REVISION_ID>/restore" \
  --header "x-api-key: <API_KEY>"

# 2) Publish the reverted draft using the draftHash from the response
curl --request POST \
  "https://apis.roblox.com/creator-configs-public-api/v1/configs/universes/<UNIVERSE_ID>/repositories/UniverseConfiguration/publish" \
  --header "x-api-key: <API_KEY>" \
  --header "Content-Type: application/json" \
  --data '{"draftHash":"<DRAFT_HASH>","message":"Rollback","deploymentStrategy":"Immediate"}'
```

  </TabItem>
</Tabs>

## Limitations

| Limit                   | Maximum        |
| ----------------------- | -------------- |
| **Keys per repository** | 100            |
| **Key length**          | 250 characters |

Requests that exceed these limits will fail. For type-specific value limits (e.g. string vs JSON) in your experience, see [Limits](../../production/configs.md#limits) in the experience configs guide.

For full details on all the endpoints in this guide, see the [Cloud API reference](/cloud/reference).
