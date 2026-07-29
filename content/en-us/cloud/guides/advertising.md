---
title: Advertising
description: Use Open Cloud to create and manage advertising on Roblox, including experience campaigns through the Ads API and item campaigns through marketplace sponsorship.
---

The Advertising API lets you programmatically create and manage advertising on Roblox. It covers two kinds of advertising:

- **Experience advertising** — engagement campaigns that drive players to your experiences, through the Ads API.
- **Item advertising** — sponsoring Marketplace items to increase their discoverability.

Before using the Ads API, [generate an API key](../auth/api-keys.md) and grant it access to the `ad.campaign:read`, `ad.campaign:write`, and `ad.billing:read` scopes. Include the key in the `x-api-key` request header on every request. All Ads API endpoints are served from `https://apis.roblox.com/ads-management/v1`.

## Key concepts

- **Status vs. delivery status** — every campaign has a lifecycle `status` you control (`ACTIVE`, `PAUSED`, or `CANCELLED`, which is permanent) and a derived, read-only `deliveryStatus` (`IN_REVIEW`, `SERVING`, `NOT_SERVING`, or `REJECTED`). A new campaign has `status` `ACTIVE` and `deliveryStatus` `IN_REVIEW` until ad-policy review completes. When a campaign isn't serving, read `deliveryStatusReasons` for the reason.
- **Money is micro-USD strings** — budget amounts are decimal strings in micro-USD (`"5000000"` = $5.00), sent and returned as strings to preserve precision. Divide by 1,000,000 to convert to dollars.
- **Objective** — only `ENGAGEMENT` (drive visits to your experience) is available in v1.
- **Creatives** — campaigns use Open Cloud **image assets** as creatives. Upload an image through the [Assets API](usage-assets.md), then reference its asset ID in `creativeAssetIds`.
- **Budget changes** — a budget increase applies immediately; a decrease on a running campaign takes effect at the next midnight in the billing account's time zone.
- **Versioning** — the major version is in the path (`/ads-management/v1`). Additive, backward-compatible changes are delivered as minor versions selected with the `X-Roblox-Api-Version` header; the frozen `1.0` baseline is the default.

## Experience advertising

The first step in an experience advertising campaign is to choose the experience to advertise. List the experiences the account can advertise, then fetch the campaign options (objectives, payment types, and targeting dimensions) and eligibility for the one you choose.

1. Copy the API key to the `x-api-key` request header.
1. Send a request to `advertisable-universes` to list the experiences you can advertise.
1. Send a request to `campaign-options`, replacing `${UniverseId}` with the target experience's universe ID, to confirm eligibility and read the valid values.

```bash title="List advertisable experiences"
curl --location 'https://apis.roblox.com/ads-management/v1/advertisable-universes' \
--header 'x-api-key: ${ApiKey}'
```

```bash title="Get campaign options and eligibility"
curl --location 'https://apis.roblox.com/ads-management/v1/campaign-options?universeId=${UniverseId}' \
--header 'x-api-key: ${ApiKey}'
```

If the experience isn't eligible, `campaign-options` returns an eligibility reason such as `NO_PERMISSION` (the account can't advertise the experience) or `BLOCKED` (the experience isn't eligible for advertising).

### Create a campaign

Send a `POST` to `campaigns` with the experience, creative asset IDs, budget, and schedule.

1. Upload your creative image through the [Assets API](usage-assets.md) and note its asset ID.
1. Set the `x-idempotency-key` header to a UUID. Replaying the same key with an identical body within 24 hours returns the original campaign instead of creating a duplicate.
1. Set `targetUniverseId`, `creativeAssetIds`, `budget`, and `schedule` in the request body.
1. Send the request.

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

On success the campaign is returned with `status` `ACTIVE` and `deliveryStatus` `IN_REVIEW`. At this point, it is queued for ad-policy review and is not yet serving:

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

#### Request body fields

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `name` | string | Yes | The campaign's display name. |
| `objective` | string | Yes | The advertising goal. Only `ENGAGEMENT` is supported in v1. |
| `paymentType` | string | Yes | How the campaign is paid for: `CREDIT_CARD`, `ADS_CREDIT`, or `INVOICE`, subject to what the billing account supports. Fixed after creation. |
| `targetUniverseId` | string | Yes | The identifier of the experience to advertise. |
| `creativeAssetIds` | string[] | Yes | The Open Cloud image asset IDs to advertise, as decimal strings. The assets must already exist and be usable by the caller. |
| `budget` | object | Yes | `type` is `DAILY` or `LIFETIME` (fixed after creation); `amountMicros` is the amount in micro-USD as a decimal string. Must meet the minimum. |
| `schedule` | object | Yes | `startTime` is an RFC&nbsp;3339 UTC timestamp that must not be in the past; `durationInDays` is how long the campaign runs (max `3650`). |
| `targeting` | object | No | Optional audience targeting. Omit it, or send an empty object, to reach all audiences. See [Targeting](#targeting). |
| `bid` | object | No | Optional bidding strategy. Only `AUTOMATED` is accepted in v1; may be omitted. |

<Alert severity="info">
Sending an `endTime` in `schedule` is not supported in v1 and returns a `400` error. Use `durationInDays` to set when the campaign ends.
</Alert>

#### Targeting

`targeting` is optional; omit it or send an empty object to reach all audiences. Each dimension is an array. An empty array means "all" for that dimension.

| Field | Type | Description |
| :--- | :--- | :--- |
| `ageGroups` | string[] | Age brackets to deliver to: `AGE_13_17`, `AGE_18_24`, or `AGE_25_PLUS`. |
| `countries` | string[] | ISO&nbsp;3166-1 alpha-2 country codes to deliver to, such as `US`. |
| `devices` | string[] | Device types to deliver to: `PHONE`, `TABLET`, `DESKTOP`, or `CONSOLE`. |

### Check whether a campaign is serving

After creating a campaign, poll its delivery status until it settles on `SERVING`, `NOT_SERVING`, or `REJECTED`. Use `campaigns:batchGetStatus` to check up to 100 campaigns per call.

```bash title="Batch get campaign status"
curl --location 'https://apis.roblox.com/ads-management/v1/campaigns:batchGetStatus' \
--header 'x-api-key: ${ApiKey}' \
--header 'Content-Type: application/json' \
--data '{ "campaignIds": ["1122334455"] }'
```

```json title="Response (200 OK)"
{
  "statuses": [
    { "id": "1122334455", "status": "ACTIVE", "deliveryStatus": "SERVING" }
  ]
}
```

Any ID that isn't found or isn't owned by the caller is returned in a `failures` array with reason `NOT_FOUND`.

| `deliveryStatus` | Meaning |
| :--- | :--- |
| `IN_REVIEW` | Queued for ad-policy review; not yet serving. |
| `SERVING` | Actively serving. `deliveryStatusReasons` may include `LEARNING` while the campaign ramps. |
| `NOT_SERVING` | Not currently serving. Check `deliveryStatusReasons` (for example, `PAUSED` or `COMPLETED`). |
| `REJECTED` | Rejected in review. Check `deliveryStatusReasons` (for example, `MODERATED`). |

### Manage a campaign

Use `PATCH /campaigns/{id}` to pause, resume, rename, or change the budget. Send only the fields you're changing.

```bash title="Pause a campaign"
curl --location --request PATCH 'https://apis.roblox.com/ads-management/v1/campaigns/1122334455' \
--header 'x-api-key: ${ApiKey}' \
--header 'Content-Type: application/json' \
--data '{ "status": "PAUSED" }'
```

- **Resume:** send `{ "status": "ACTIVE" }`.
- **Cancel:** send `{ "status": "CANCELLED" }`. Cancellation is permanent.
- **Change budget:** send a new `budget.amountMicros`. An increase applies immediately; a decrease on a running campaign takes effect at the next midnight in the billing account's time zone, surfaced as `budget.scheduledAmountMicros` and `budget.scheduledEffectiveTime` until then.

### Report on performance

Campaign performance metrics—spend, impressions, plays, and more—are reported through the [Analytics API](./analytics/index.md), the home for advertising and experience metrics.

### Common errors

Errors return an envelope with an HTTP `status`, a short `title`, a human-readable `detail`, and an `errors` array in which each entry has a stable, machine-readable `code` and a `message`.

| Status | Code | Cause | Resolution |
| :--- | :--- | :--- | :--- |
| 400 | `INVALID_ARGUMENT` | A required field is missing or invalid, an `endTime` was sent, a creative asset is invalid, or the budget is below the minimum. | Check the [Request body fields](#request-body-fields). The minimum budget is stated in the error message. |
| 403 | `PERMISSION_DENIED` | The caller can't manage the billing account, the experience isn't advertisable, or the caller lacks permission to use a creative. | Confirm the account and that the experience is advertisable using `campaign-options`. |
| 409 | — | The `x-idempotency-key` was reused with a different request body, or a concurrent write conflicted. | Use a fresh UUID for a new campaign, or retry the request. |
| 429 | `RATE_LIMITED` | Too many requests in a short period. | Back off and retry after a short delay. |
| 500 | — | An unexpected server error occurred. | Retry the request. If the error persists, create a new DevForum post. |

## Item advertising

Sponsor Marketplace items like avatar items, bundles, and passes to increase their discoverability across Roblox. You can create and manage item sponsorships in the [Sponsored Items Manager](https://www.roblox.com/sponsorships/list) or programmatically through the sponsored campaigns endpoints on `adconfiguration.roblox.com`, listed under **Advertising** in the API reference. For more information, see [Sponsored items](../../marketplace/sponsor-items.md).
