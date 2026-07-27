---
title: Advertising
description: Use Open Cloud to create and manage advertising campaigns that drive engagement to your experiences.
---

The Advertising API lets you programmatically create and manage advertising campaigns that drive players to your experiences. This API supports:

- Creating engagement campaigns that promote an experience across Roblox ad surfaces.
- Managing the campaign lifecycle: pause, resume, adjust budget, and cancel.
- Monitoring the review and serving state of a campaign as it is approved and delivered.

<Alert severity="info">
This API advertises **experiences**. To sponsor **Marketplace items or assets**, see [Sponsored campaigns](/docs/cloud/reference/features/sponsored-campaigns).
</Alert>

Before using this API, [generate an API key](../../auth/api-keys.md) and grant it the advertising operations `ad.campaign:read`, `ad.campaign:write`, and `ad.billing:read`. Include the key in the `x-api-key` request header on every request. All endpoints are served from `https://apis.roblox.com/ads-management/v1`.

Campaigns carry two independent states (a lifecycle `status` and a derived `deliveryStatus`), use micro-USD money, and expose a single objective in v1. Read [Advertising concepts](concepts.md) before you start.

## Find an experience to advertise

List the experiences the account can advertise, then fetch the valid campaign options (objectives, payment types, ad formats, and targeting dimensions) for the one you choose.

```bash title="List advertisable experiences"
curl --location 'https://apis.roblox.com/ads-management/v1/advertisable-universes' \
--header 'x-api-key: ${ApiKey}'
```

```bash title="Get campaign options"
curl --location 'https://apis.roblox.com/ads-management/v1/campaign-options?universeId=${UniverseId}' \
--header 'x-api-key: ${ApiKey}'
```

The response confirms whether the experience is eligible and returns the values you can use when creating a campaign.

## Prepare a creative

Campaigns advertise Open Cloud **image assets**. Upload your image with the [Assets API](../../features/assets.md), then reference the returned asset ID in `creativeAssetIds`. To list creatives already in the account's library:

```bash title="List creatives"
curl --location 'https://apis.roblox.com/ads-management/v1/creatives' \
--header 'x-api-key: ${ApiKey}'
```

## Create a campaign

Send a `POST` to `/campaigns` with the experience, creative asset IDs, budget, and schedule. The `x-idempotency-key` header is required and must be a UUID; replaying the same key with an identical body within 24 hours returns the original campaign.

```bash title="Create an engagement campaign"
curl --location 'https://apis.roblox.com/ads-management/v1/campaigns' \
--header 'x-api-key: ${ApiKey}' \
--header 'x-idempotency-key: ${UUID}' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Summer promo",
    "objective": "ENGAGEMENT",
    "paymentType": "CREDIT_CARD",
    "targetUniverseId": "${UniverseId}",
    "creativeAssetIds": ["${AssetId}"],
    "budget": { "type": "DAILY", "amountMicros": "5000000" },
    "schedule": { "startTime": "2026-08-01T00:00:00Z", "durationInDays": 7 }
}'
```

`budget.amountMicros` is micro-USD as a decimal string (`"5000000"` = $5.00). On success the campaign is returned with `deliveryStatus` `IN_REVIEW` — it is queued for ad-policy review and is not yet serving:

```json title="Response (200 OK)"
{
  "id": "1122334455",
  "name": "Summer promo",
  "objective": "ENGAGEMENT",
  "paymentType": "CREDIT_CARD",
  "targetUniverseId": "1234567890",
  "creativeAssetIds": ["9876543210"],
  "budget": { "type": "DAILY", "amountMicros": "5000000" },
  "schedule": { "startTime": "2026-08-01T00:00:00Z", "durationInDays": 7 },
  "status": "ACTIVE",
  "deliveryStatus": "IN_REVIEW",
  "createTime": "2026-07-27T00:00:00Z",
  "updateTime": "2026-07-27T00:00:00Z"
}
```

## Check whether a campaign is serving

Poll delivery status until it settles (`SERVING`, `NOT_SERVING`, or `REJECTED`). Look up as many as 100 campaigns per call:

```bash title="Batch get campaign status"
curl --location 'https://apis.roblox.com/ads-management/v1/campaigns:batchGetStatus' \
--header 'x-api-key: ${ApiKey}' \
--header 'Content-Type: application/json' \
--data '{ "campaignIds": ["1122334455"] }'
```

```json title="Response (200 OK)"
{
  "statuses": [
    {
      "id": "1122334455",
      "status": "ACTIVE",
      "deliveryStatus": "SERVING"
    }
  ]
}
```

When `deliveryStatus` is `NOT_SERVING` or `REJECTED`, read `deliveryStatusReasons` for the actionable detail.

## Manage a campaign

Use `PATCH /campaigns/{id}` to pause, resume, rename, or change the budget. Only send the fields you are changing.

```bash title="Pause a campaign"
curl --location --request PATCH 'https://apis.roblox.com/ads-management/v1/campaigns/1122334455' \
--header 'x-api-key: ${ApiKey}' \
--header 'Content-Type: application/json' \
--data '{ "status": "PAUSED" }'
```

Resume with `"status": "ACTIVE"`; cancel (permanent) with `"status": "CANCELLED"`. A budget increase applies immediately; a decrease on a running campaign takes effect at the next midnight in the account's time zone.

## Report on performance

Campaign performance reporting is moving to the [Analytics API](../analytics/index.md), which will support filtering metrics by campaign. Use the Analytics API for spend, impressions, and other performance metrics.
