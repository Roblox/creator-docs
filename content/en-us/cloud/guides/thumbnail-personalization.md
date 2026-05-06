---
title: Thumbnail personalization
description: Use Open Cloud to upload homepage thumbnails and manage thumbnail personalization configs for an experience.
---

Thumbnail personalization lets you upload homepage thumbnails for an experience and group them into personalization configs. Roblox can use these configs to serve different thumbnails where thumbnail personalization is supported.

Before you start, [generate an API key](../auth/api-keys.md) or [configure an OAuth 2.0 app](../auth/oauth2-overview.md). Read operations require the `universe:read` scope. Write operations require the `universe:write` scope. The key or OAuth authorization must be scoped to the target universe, and the caller must have permission to view or edit the experience.

All endpoints use your universe ID, which you can find on the [Creator Dashboard](https://create.roblox.com/dashboard/creations). Click the experience tile overflow menu and **Copy Universe ID**.

For the full endpoint reference, request and response schemas, and error codes, see the [Cloud API reference](/cloud/reference/features/thumbnail-personalization).

## Upload homepage thumbnails

Upload thumbnail image files with a multipart form request. Use the form field name `files`. You can upload up to 5 files in one request. Each file must be 3 MB or smaller. Supported formats are BMP, JPEG, PNG, and WebP.

```bash
curl --request POST \
  "https://apis.roblox.com/thumbnail-personalization-api/v1/universes/<UNIVERSE_ID>/thumbnails/uploads" \
  --header "x-api-key: <API_KEY>" \
  --form "files=@thumbnail-1.png" \
  --form "files=@thumbnail-2.png"
```

The response maps each file name to an operation ID:

```json
{
  "fileToOperationIdDict": {
    "thumbnail-1.png": "<OPERATION_ID_1>",
    "thumbnail-2.png": "<OPERATION_ID_2>"
  }
}
```

Save the operation IDs. You need them to check upload status.

## Check upload status

Use the upload status endpoint to check whether each upload has finished. You can pass multiple `operationIds` query parameters.

```bash
curl --request GET \
  "https://apis.roblox.com/thumbnail-personalization-api/v1/universes/<UNIVERSE_ID>/thumbnails/uploads/status?operationIds=<OPERATION_ID_1>&operationIds=<OPERATION_ID_2>" \
  --header "x-api-key: <API_KEY>"
```

When upload processing is done, the response includes a homepage thumbnail ID for each operation:

```json
{
  "uploadStatus": "Finished",
  "uploadThumbnailStatusDict": {
    "<OPERATION_ID_1>": {
      "homepageThumbnailId": "<HOMEPAGE_THUMBNAIL_ID_1>",
      "assetId": 1234567890,
      "moderationStatus": "Reviewing"
    }
  }
}
```

A new thumbnail can stay in `Reviewing` until moderation completes.

## List homepage thumbnails

List uploaded homepage thumbnails for an experience. Use `limit` to control page size and `nextCursor` to fetch the next page.

```bash
curl --request GET \
  "https://apis.roblox.com/thumbnail-personalization-api/v1/universes/<UNIVERSE_ID>/thumbnails?limit=10" \
  --header "x-api-key: <API_KEY>"
```

Example response:

```json
{
  "homepageThumbnails": [
    {
      "homepageThumbnailId": "<HOMEPAGE_THUMBNAIL_ID>",
      "assetId": 1234567890,
      "moderationStatus": "Approved",
      "personalizedConfigStatus": "Inactive",
      "homepageThumbnailStatus": "Active"
    }
  ],
  "nextCursor": ""
}
```

## Create a personalization config

Create a personalization config from one or more homepage thumbnail IDs. A config can include up to 5 thumbnails.

```bash
curl --request POST \
  "https://apis.roblox.com/thumbnail-personalization-api/v1/universes/<UNIVERSE_ID>/personalization/create" \
  --header "x-api-key: <API_KEY>" \
  --header "Content-Type: application/json" \
  --data '{
    "homepageThumbnailIds": [
      "<HOMEPAGE_THUMBNAIL_ID_1>",
      "<HOMEPAGE_THUMBNAIL_ID_2>"
    ]
  }'
```

The response is the personalization config ID:

```json
"<PERSONALIZATION_CONFIG_ID>"
```

## List personalization configs

Use the personalization list endpoint to see active or inactive configs. The `status` query parameter must be `Active` or `Inactive`.

```bash
curl --request GET \
  "https://apis.roblox.com/thumbnail-personalization-api/v1/universes/<UNIVERSE_ID>/personalization?status=Active&limit=10&cursor=" \
  --header "x-api-key: <API_KEY>"
```

Example response:

```json
{
  "personalizedConfigs": [
    {
      "id": "<PERSONALIZATION_CONFIG_ID>",
      "personalizedConfigStatus": "Active",
      "createdUtc": "2026-05-01T00:00:00Z",
      "thumbnails": [
        {
          "homepageThumbnailId": "<HOMEPAGE_THUMBNAIL_ID>",
          "assetId": 1234567890,
          "personalizedThumbnailStatus": "Active",
          "homepageThumbnailStatus": "Active"
        }
      ],
      "lastServedUtc": null
    }
  ],
  "nextCursor": ""
}
```

## Update a personalization config

Update a config by sending its `id` and the full list of homepage thumbnail IDs that should remain in the config.

```bash
curl --request POST \
  "https://apis.roblox.com/thumbnail-personalization-api/v1/universes/<UNIVERSE_ID>/personalization/update" \
  --header "x-api-key: <API_KEY>" \
  --header "Content-Type: application/json" \
  --data '{
    "id": "<PERSONALIZATION_CONFIG_ID>",
    "homepageThumbnailIds": [
      "<HOMEPAGE_THUMBNAIL_ID_1>",
      "<HOMEPAGE_THUMBNAIL_ID_3>"
    ]
  }'
```

The response is the updated personalization config ID:

```json
"<PERSONALIZATION_CONFIG_ID>"
```

## Delete homepage thumbnails

Delete thumbnails that are no longer needed. If a deleted thumbnail is part of an active personalization config, the service removes it from that config. If no thumbnails remain in the config, the config becomes inactive.

```bash
curl --request DELETE \
  "https://apis.roblox.com/thumbnail-personalization-api/v1/universes/<UNIVERSE_ID>/thumbnails?homepageThumbnailIds=<HOMEPAGE_THUMBNAIL_ID_1>&homepageThumbnailIds=<HOMEPAGE_THUMBNAIL_ID_2>" \
  --header "x-api-key: <API_KEY>"
```

The response maps each thumbnail ID to whether it was deleted:

```json
{
  "<HOMEPAGE_THUMBNAIL_ID_1>": true,
  "<HOMEPAGE_THUMBNAIL_ID_2>": true
}
```
