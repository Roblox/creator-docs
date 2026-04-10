---
title: Data store right to be forgotten (RTBF)
description: Configure automated deletion of data store keys and stores when you receive a right-to-be-forgotten request, using the Open Cloud Configs API and DataStoresConfig templates.
---

<Alert severity="info">
Roblox plans to add a dedicated Creator Hub UI for managing your data store right-to-be-forgotten (RTBF) configurations. Until that UI is available, set up and publish templates using the [Open Cloud Configs API](/cloud/reference/features/configs), as described in this guide.
</Alert>

**Right to be forgotten (RTBF)** for data stores lets you declare which keys and data stores hold a user's data. When Roblox processes an RTBF request for your experience, the system uses those templates to remove the matching data automatically. This page explains how to generate credentials, define JSON templates (including the `{UserId}` token), and publish them to the **DataStoresConfig** repository through the Configs API.

## 1. Add permissions to an API key

1. In the Creator Dashboard, [create or edit an API key](https://create.roblox.com/dashboard/credentials) to include the **`universe:read`** and **`universe:write`** permissions for every universe where you want to automate RTBF deletion.

For more detail, see [Manage API keys](../../cloud/auth/api-keys.md).

## 2. Define RTBF templates

Templates are stored as a JSON configuration named `user_data_templates`. There are two main types:

- **Key template** — Identifies specific keys. Requires `data_store_type`
  (`STANDARD` or `ORDERED`), `data_store_name`, and `key_pattern`. `scope_pattern`
  is optional but recommended.
- **Data store template** — Identifies an entire data store. Requires `data_store_type` (currently only supports `STANDARD`) and `data_store_pattern`.

For both template kinds, the `{UserId}` token is replaced with the user's ID when an RTBF request is processed.

```json title="Example configuration"
{
  "user_data_templates": [
    {
      "key_template": {
        "data_store_type": "STANDARD",
        "data_store_name": "PlayerInventory",
        "key_pattern": "User_{UserId}",
        "scope_pattern": "Scope_{UserId}"
      }
    },
    {
      "key_template": {
        "data_store_type": "ORDERED",
        "data_store_name": "PlayerLeaderboard",
        "key_pattern": "User_{UserId}",
        "scope_pattern": "global"
      }
    },
    {
      "data_store_template": {
        "data_store_type": "STANDARD",
        "data_store_pattern": "Player_{UserId}_Save"
      }
    }
  ]
}
```

The `{UserId}` token is **case-sensitive**. If `scope_pattern` is omitted or blank, it defaults to `global`.

## 3. Submit via Open Cloud API

The following examples show how to submit templates to the Configs API. Replace `<API_KEY>` and `<UNIVERSE_ID>` in each request. Send all requests to the **DataStoresConfig** repository.

For additional endpoints and behavior, see the [Cloud API reference](/cloud/reference/features/configs) and the [experience configs](../../cloud/guides/configs.md) guide.

The update flow has four stages: draft, verify, publish, and confirm.

### A. Create a draft

This `PUT` request defines your configuration. If a draft already exists, this request overwrites it.

```bash
curl --location --request PUT 'https://apis.roblox.com/creator-configs-public-api/v1/configs/universes/<UNIVERSE_ID>/repositories/DataStoresConfig/draft:overwrite' \
  --header 'x-api-key: <API_KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "entries": {
    "user_data_templates": [
      {
        "key_template": {
          "data_store_type": "STANDARD",
          "data_store_name": "PlayerInventory",
          "key_pattern": "User_{UserId}",
          "scope_pattern": "Scope_{UserId}"
        }
      },
      {
        "key_template": {
          "data_store_type": "ORDERED",
          "data_store_name": "PlayerLeaderboard",
          "key_pattern": "User_{UserId}",
          "scope_pattern": "global"
        }
      },
      {
        "data_store_template": {
          "data_store_type": "STANDARD",
          "data_store_pattern": "Player_{UserId}_Save"
        }
      }
    ]
  }
}'
```

### B. Verify your draft

Use this `GET` request to retrieve and review the draft before it goes live.

```bash
curl --location --request GET 'https://apis.roblox.com/creator-configs-public-api/v1/configs/universes/<UNIVERSE_ID>/repositories/DataStoresConfig/draft' \
  --header 'x-api-key: <API_KEY>'
```

### C. Publish the configuration

After verification, send this `POST` request to publish. The only way to undo this action is to restore a previous version.

```bash
curl --location --request POST 'https://apis.roblox.com/creator-configs-public-api/v1/configs/universes/<UNIVERSE_ID>/repositories/DataStoresConfig/publish' \
  --header 'x-api-key: <API_KEY>' \
  --data-raw '{
  "deploymentStrategy": "Immediate"
}'
```

### D. Verify the change

After publishing, confirm the configuration is live with this `GET` request.

```bash
curl --location --request GET 'https://apis.roblox.com/creator-configs-public-api/v1/configs/universes/<UNIVERSE_ID>/repositories/DataStoresConfig/full' \
  --header 'x-api-key: <API_KEY>'
```

## Best practices

- **Case sensitivity** — Use the exact `{UserId}` token in your patterns. Variants such as `{userId}` are not accepted.
- **Manual verification** — Compare your patterns to your live Luau usage using [Data Stores Manager](./data-stores-manager.md) in the Creator Hub before you publish configuration.
- **Default scopes** — If a data store uses the default scope, set `scope_pattern` to `"global"` in the key template.
- **Test end-to-end flow on a test experience** — For full validation of your templates, consider creating a test experience and dummy account, populating it with dummy data for that account's User ID, requesting RTBF on the dummy account, and ensuring the data is deleted once the account is processed.
- **Confirm deletions** — After onboarding on your live experience, when an RTBF request appears in your Roblox.com inbox, verify that the corresponding data is removed within one week.
