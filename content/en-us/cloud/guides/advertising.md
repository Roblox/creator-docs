---
title: Advertising
description: Use Open Cloud to create and manage advertising on Roblox, including experience campaigns through the Ads API and item campaigns through marketplace sponsorship.
---

The Advertising API lets you programmatically create and manage advertising on Roblox. It covers two kinds of advertising:

- **Experience advertising** — sponsored campaigns that bring players to your experiences, through the Ads API.
- **Item advertising** — sponsorships that make Marketplace items easier to discover.

This guide shows the common Ads API flows from start to finish, and the details that are easy to miss. For every field, parameter, and response code, see the [Advertising API reference](/cloud/reference/features/advertising).

The Ads API uses existing image assets. It does not generate AI images or rename creative assets. For those requests, explain the limitation and ask the user to prepare the image outside the Ads API. Image upload is a separate Assets API flow.

## Before you start

All Ads API endpoints are served from `https://apis.roblox.com/ads-management/v1`. [Generate an API key](../auth/api-keys.md) and send it in the `x-api-key` header of every request. An API key or an OAuth token acts as its user. Scopes limit which operations an application can call, and the API also checks that user's account, group, and experience permissions.

Grant the key the scopes for the flows you use:

| Scope                       | Operations                                                                                                                                                                                                            |
| :-------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ad.campaign:read`          | `advertisable-universes`, `campaign-options`, list and get campaigns, `campaigns:batchGetStatus`, list and get ads, list and get creatives, `performance-estimates`, `campaign-recommendations`, `audience-estimates` |
| `ad.campaign:write`         | Create and update campaigns, `campaigns:validate`, update ads, add and update creatives                                                                                                                               |
| `ad.billing:read`           | List and get billing accounts, `payment-activities`, `ad-credit-conversions:preview`                                                                                                                                  |
| `universe:read`             | Read experience names and owners from the [Universe API](/cloud/reference/features/universes)                                                                                                                         |
| `asset:read`, `asset:write` | Upload creative images through the [Assets API](usage-assets.md)                                                                                                                                                      |

The `campaigns:validate` dry run needs `ad.campaign:write`, but it doesn't change anything.

Onboarding, payment methods, and ad credit purchases are available only in Ads Manager. The API reads the result of that setup, but it can't do the setup.

## Trace an agent run

Send the optional `X-Agent-Session-Id` header with one value, 1–128 characters from `A-Z`, `a-z`, `0-9`, `.`, `_`, `:`, and `-`, on every request in an agent run, and give that value to support when you report a problem. Invalid or repeated values are ignored and don't change authentication, permissions, or idempotency.

## Key concepts

- **Billing accounts.** A billing account owns and pays for campaigns. Every user who advertises has a personal account. A group that advertises has its own account. On list endpoints and on creatives requests (`POST /creatives`, `GET /creatives/{id}`, and `PATCH /creatives/{id}`), the `groupId` query parameter selects the group's account. Without `groupId`, the request uses your personal account.
- **Status and delivery status.** `status` is the lifecycle state that you control: `ACTIVE`, `PAUSED`, or `CANCELLED`, which is permanent. `deliveryStatus` is read-only and tells you whether the campaign is serving. See [Track review and delivery](#track-review-and-delivery).
- **Campaigns, ads, and creatives.** A creative is a Roblox image asset that is registered in a billing account. A campaign advertises one experience with one or more creatives. The campaign has one ad for each creative, and you can pause each ad separately.
- **Objectives.** A campaign has one objective: `PLAYS`, `ENGAGEMENT`, or `ROBUX_SPEND`. Not every objective is available for every experience, and `ENGAGEMENT` doesn't accept targeting. Always read the objectives that `campaign-options` returns for the experience.
- **IDs and money.** Campaign and billing account IDs are UUIDs. Roblox IDs (experience, asset, and group IDs) and money amounts are decimal strings. Money is in micro-USD, in fields that end in `Micros`: `"5000000"` is $5.00. Performance estimate fields end in `MicroUsd` instead. Send amounts and IDs as JSON strings. A JSON number returns `400`.
- **Times.** Times are RFC 3339 UTC strings. Budget days and campaign end times use the billing account's time zone, in `timeZone`.
- **Forward compatibility.** Responses can get new fields and new enum values. Ignore the values that your client doesn't know.

## Plan a campaign

### Find an experience to advertise

1. Send a request to `advertisable-universes` to list the experiences you can advertise. Add `groupId` to list only the experiences that a group owns.
1. For each universe ID, get the name from `GET /cloud/v2/universes/{universeId}` in the [Universe API](/cloud/reference/features/universes). The same response shows if a user or a group owns the experience. If a group owns it, the campaign can use the group's billing account.

```bash title="List advertisable experiences"
curl --location 'https://apis.roblox.com/ads-management/v1/advertisable-universes' \
--header 'x-api-key: ${ApiKey}'
```

`advertisable-universes` returns only IDs, in one response without pagination.

### Get the campaign options

Call `campaign-options` with `universeId` before you create a campaign. The response tells you what a campaign for that experience can use.

```bash title="Get campaign options for an experience"
curl --location 'https://apis.roblox.com/ads-management/v1/campaign-options?universeId=${UniverseId}' \
--header 'x-api-key: ${ApiKey}'
```

Read these fields:

| Field                                                      | What to do with it                                                                                                                                                             |
| :--------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `eligibility`                                              | If `eligible` is `false`, you can't advertise the experience now. `reasons` is `NO_PERMISSION` or `BLOCKED`, and `details` has the remediation.                                |
| `objectiveOptions`                                         | Use only an objective with `available: true`. `unavailableReasons` explains the others. `supportsTargeting` and `audienceTypes` tell you what targeting the objective accepts. |
| `billingAccounts`                                          | The accounts that can pay for this experience's campaign, each with its `paymentTypes`. Pass one as `billingAccountId` when you create the campaign.                           |
| `paymentTypes`                                             | The payment types that at least one of `billingAccounts` can use. An empty list means that no account can pay for a campaign yet.                                              |
| `budgetConstraints`                                        | The minimum budget for each budget type, and the longest schedule. For `LIFETIME`, the minimum is per day of the schedule.                                                     |
| `creativeRequirements`, `adFormats`, `targetingDimensions` | The creative count and asset types, the image sizes in pixels, and the values that you can use in `targeting`.                                                                 |
| `video`                                                    | The accepted `video.source` values, and `previewVideo` for the experience. This field is absent when sponsored video isn't available. See [Add a video](#add-a-video).         |
| `mutableFields`                                            | The campaign fields that you can change later with `PATCH`.                                                                                                                    |

**Important:** Don't pick an objective or a payment type yourself. Use one that `campaign-options` returns for the experience. If a user doesn't say which objective or payment type to use, show them the available values and let them choose. If only one value is available, use it.

If you don't have permission to advertise the experience, `campaign-options` returns `403` with reason `UNIVERSE_NOT_ADVERTISABLE`. Explain the missing permission and stop planning a campaign for that experience. Calling `campaign-options` without `universeId` does not establish permission for it. Other experience or billing-account reads cannot override this denial.

### Check that the billing account can pay

If the payment type the user asked for is unavailable, give the user `paymentSetupUrl` or the payment error's `actionUrl`. Stop campaign creation until they complete setup or choose another payment type. Do not switch payment types without asking, even when the account is `READY` with ad credit. Resolve this payment choice before checking or registering creatives.

A campaign needs one payment type that can fund it: a verified card, or enough ad credit for the first day's budget. For a group's account, see [Advertise a group's experience](#advertise-a-groups-experience). Payment methods that the account doesn't have are optional. They don't block a campaign.

Before you create a campaign, call `campaign-options` with `universeId`, or get the billing account:

```bash title="Get a billing account"
curl --location 'https://apis.roblox.com/ads-management/v1/billing-accounts/${BillingAccountId}' \
--header 'x-api-key: ${ApiKey}'
```

For the selected account, read `supportedPaymentTypes` (`paymentTypes` in `campaign-options`), `paymentStatus`, `paymentStatusReason`, and `paymentSetupUrl`. Choose a payment type from `supportedPaymentTypes`. If the user doesn't name a payment type and only one is listed, use it. If several are listed, show them to the user and let the user choose.

| `paymentStatus`   | `paymentStatusReason`  | Meaning                                                                                                                            | User action in Ads Manager                                                                      |
| ----------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `READY`           | Absent                 | At least one payment type in `supportedPaymentTypes` can fund a campaign.                                                          | None required. `paymentSetupUrl`, when present, offers an optional payment method or ad credit. |
| `ACTION_REQUIRED` | `NO_PAYMENT_METHOD`    | No payment type can fund a campaign: no usable card and no usable ad credit.                                                       | Add a card or buy ad credit using `paymentSetupUrl`.                                            |
| `ACTION_REQUIRED` | `PROFILE_NOT_VERIFIED` | No usable ad credit, and the card on file needs verification, including a pending challenge.                                       | Complete card verification using `paymentSetupUrl`.                                             |
| `PAST_DUE`        | `TRANSACTION_FAILURE`  | A card payment failed or a failed charge remains unpaid. A failed card payment removes `CREDIT_CARD` from `supportedPaymentTypes`. | Resolve the payment in Payment Settings using `paymentSetupUrl`.                                |
| `DISABLED`        | `ACCOUNT_DISABLED`     | The account is disabled or archived. `supportedPaymentTypes` is empty.                                                             | Payment setup can't fix this state, and no setup link is returned.                              |

Create can succeed only with a payment type listed in `supportedPaymentTypes`: always for `READY`, sometimes for `PAST_DUE`, and never for `ACTION_REQUIRED` or `DISABLED`. Other campaign checks still apply.

Budget limits for each payment type:

- `ADS_CREDIT` is listed when ad credit is activated and the balance is at least the minimum daily budget. Create and `campaigns:validate` also check that the balance, after unbilled spend, covers the daily budget. For a `LIFETIME` budget, the daily budget is the amount divided by the number of campaign days.
- For `CREDIT_CARD`, the daily budget can't be more than `billingAccounts[].maximumDailyBudgetMicros` from `campaign-options`. `CREDIT_CARD` is listed only when that limit is at least the minimum daily budget. A verified card with a lower limit still returns the limit, but adding a card doesn't help. Use ad credit instead.

#### Payment errors

Create and `campaigns:validate` return these payment errors. `campaigns:validate` returns them in `errors[]` with `valid: false`.

| Request                                                         | `reason`                  | `field`               |
| --------------------------------------------------------------- | ------------------------- | --------------------- |
| `CREDIT_CARD` without a verified card, or with a failed payment | `PAYMENT_ACTION_REQUIRED` | `billingAccountId`    |
| `ADS_CREDIT` with a balance below the daily budget              | `INSUFFICIENT_AD_CREDIT`  | `budget.amountMicros` |
| `ADS_CREDIT` without activated ad credit                        | `PAYMENT_ACTION_REQUIRED` | `paymentType`         |

Each error has an `actionUrl`. When one of these errors occurs, first check if another payment type in `supportedPaymentTypes` can fund the campaign, or if a lower budget fits the balance. Offer those options to the user together with the link.

#### Send the user to Ads Manager

Send the user to Ads Manager only in these cases:

- The user asks for a payment method that the account doesn't have.
- `paymentStatus` is `ACTION_REQUIRED`, so no payment type can fund a campaign.
- Create or `campaigns:validate` returns a payment error, and the user wants to fix it in Ads Manager.

Then:

1. Show `paymentSetupUrl`, or the error's `actionUrl`, to the user.
1. Ask the user to open Ads Manager and complete the payment action in the browser.
1. Wait for the user to reply that they are done.
1. Check `GET /billing-accounts/{id}` or `campaigns:validate` again.
1. Continue when the selected payment type is in `supportedPaymentTypes`.

The browser doesn't tell the agent when setup is complete. Don't retry payment setup again and again while you wait for the user's reply. Never collect card numbers or other payment details through the API or in chat.

Cards are available only for personal accounts, and only for users who are 18 or older. Group ad credit links include `groupId`.

To see how much ad credit an amount of Robux buys, use `ad-credit-conversions:preview`. Send `robuxAmount` or `adCreditAmountMicros`, and the preview calculates the other amount. The preview doesn't convert anything. If the account can't afford the amount, the response is `200` with `valid: false` and a `reason`, and it still shows both amounts. Use them to tell the user how much they need.

### Estimate results (optional)

These operations are non-binding and don't create anything:

- `campaign-recommendations` suggests a daily budget and a duration.
- `performance-estimates` estimates the results of a budget, or the budget for a target result. It supports only `PLAYS`.
- `audience-estimates` estimates how many users your targeting can reach.

`audience-estimates` accepts the same `targeting` as campaign creation, with the same rules. `campaign-recommendations` accepts only `targeting.audienceType`: `RETENTION` and `REACTIVATION` get a budget for that audience. Other targeting fields in a recommendation request return `400`.

## Prepare creatives

Each creative is an image asset that you own or can use.

### Use an existing image

If the user provides image asset IDs that are already uploaded and fully processed,
pass them in `creativeAssetIds` when you create the campaign. Creating a campaign
registers its assets in the billing account's library, so you don't need to upload
the images again or call `POST /creatives` first.

Call `POST /creatives` only when the user asks to add an image to the library without
creating a campaign. Add `groupId` for a group's account. Registration does not upload an image.

```bash title="Add an asset to the creative library"
curl --location 'https://apis.roblox.com/ads-management/v1/creatives' \
--header 'x-api-key: ${ApiKey}' \
--header 'Content-Type: application/json' \
--data '{ "assetId": "${AssetId}", "universeId": "${UniverseId}" }'
```

To check moderation, get the creative with `GET /creatives/{id}` and read
`moderationStatus`. It is `PENDING_REVIEW` until review is complete.

### Upload a new image

If the user needs a new image asset:

1. Upload the image through the [Assets API](usage-assets.md) with `assetType` `Image`. Use a size from `adFormats` in `campaign-options`.
1. Poll the upload operation until it is done, and record the `assetId`.
1. Pass the asset ID in `creativeAssetIds` when you create the campaign.

The API reads `width` and `height` from the image when it registers the creative. If it can't read them, for example because the upload is still processing, the creative has no `width` or `height`.

Creatives have two IDs:

- `assetId` is the Roblox asset ID. Use it in `creativeAssetIds`, and in the `GET /creatives/{id}` and `PATCH /creatives/{id}` paths.
- `id` is the UUID of the registration in the library. No path uses it.

For example, a library entry with `id: "a672e5b4-790b-4fa8-90de-6e7d2d60c83b"` and `assetId: "1234567890"` uses `GET /creatives/1234567890`. Sending the UUID returns `404`.

If the asset is already active in the same account, `POST /creatives` returns `409` `ALREADY_EXISTS`. If the asset is archived in that account, `POST /creatives` restores it. You can register the same asset in your personal account and in group accounts.

`GET /creatives` lists the library of one account. Add `universeId` to list only the creatives of one experience. With `groupId` and `universeId` together, you need permission to advertise for the group and for the experience. For an asset that doesn't exist, or an account that you can't access, `GET /creatives/{id}` returns the same `404`.

## Create a campaign

### Validate the request (optional)

`campaigns:validate` runs every check that creation runs, but doesn't create anything. It returns all the problems in one response, and the billing account that the request resolves to. Use it to check a campaign before the user is ready to launch it.

Send a JSON request body with the campaign fields, just as for creation. A POST without a body returns `400` with "Request body is required." Read the endpoint documentation to discover its fields; do not probe it with an empty POST.

```bash title="Validate a campaign"
curl --location 'https://apis.roblox.com/ads-management/v1/campaigns:validate' \
--header 'x-api-key: ${ApiKey}' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Summer promo",
    "objective": "PLAYS",
    "paymentType": "ADS_CREDIT",
    "targetUniverseId": "${UniverseId}",
    "creativeAssetIds": ["${AssetId}"],
    "budget": { "type": "DAILY", "amountMicros": "20000000" },
    "schedule": { "startTime": "2026-12-01T00:00:00Z", "durationInDays": 7 }
}'
```

A `200` response means only that validation ran. Read `valid`, `errors`, `warnings`, and `resolvedBillingAccountId`. The `errors` are the same errors that creation would return.

### Send the create request

1. Make a new UUID and send it in the `x-idempotency-key` header.
1. Set the objective and payment type from `campaign-options`.
1. Set `targetUniverseId`, `creativeAssetIds`, `budget`, and `schedule`.
1. For a group's account, set `billingAccountId`. See [Advertise a group's experience](#advertise-a-groups-experience).
1. Send the request.

```bash title="Create a campaign"
curl --location 'https://apis.roblox.com/ads-management/v1/campaigns' \
--header 'x-api-key: ${ApiKey}' \
--header 'x-idempotency-key: ${UUID}' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Summer promo",
    "objective": "PLAYS",
    "paymentType": "ADS_CREDIT",
    "targetUniverseId": "${UniverseId}",
    "creativeAssetIds": ["${AssetId}"],
    "budget": { "type": "DAILY", "amountMicros": "20000000" },
    "schedule": { "startTime": "2026-12-01T00:00:00Z", "durationInDays": 7 },
    "targeting": { "ageGroups": ["AGE_18_24", "AGE_25_PLUS"], "devices": ["PHONE", "TABLET"] }
}'
```

```json title="Response (200 OK, excerpt)"
{
  "id": "7225a97c-4f1e-4b8a-9c3d-2e5f6a7b8c9d",
  "status": "ACTIVE",
  "deliveryStatus": "NOT_SERVING",
  "deliveryStatusReasons": ["SCHEDULED"]
}
```

Remember these rules for the request:

- **Budget.** `amountMicros` must be at least the minimum in `budgetConstraints`. `budget.type` is `DAILY` or `LIFETIME`, and you can't change it later.
- **Schedule.** `startTime` must not be in the past. Set the length with `durationInDays`, up to `3650`. `endTime` is read-only, and a request that contains it returns `400`. The campaign ends one second before midnight, in the account's time zone, at the end of the last day.
- **Targeting.** Omit `targeting`, or send an empty object, to reach all audiences. An empty array in a dimension means all values. Use only the values in `targetingDimensions`. For `ENGAGEMENT`, omit `targeting` or set only `audienceType` to `ALL_PLAYERS`.
- **Regions and countries.** Use `targeting.countries` for single countries, and `targeting.regions` for aggregate regions, such as `WESTERN_EUROPE` or `ROW`. Don't combine the region `ALL` with countries, and don't list a country together with the region that contains it.

### Use a new idempotency key for each new request body

`POST /campaigns` requires an `x-idempotency-key` header that contains a UUID. Make a new UUID for each new campaign, and each time that you change the request body, also for a change to the name. Use the same key only to retry the same body, for example after a timeout.

For 24 hours, the key of a completed request returns the original campaign with `200`. If you change the body and use the same key again, the API returns the original campaign and doesn't apply your changes. The API doesn't return `409` for this case, so a `200` response doesn't confirm your changes. If the first request is still in progress, a retry returns `429`. To change a campaign that exists, use `PATCH /campaigns/{id}`.

### Add a video

A sponsored tile can show the experience's preview video in place of the image. The video is always the experience's preview video. You can't upload a video for a campaign.

1. Call `campaign-options` with `universeId`.
1. If `video.sources` contains `PREVIEW_VIDEO`, video is available. If `video` is absent, use an image-only campaign.
1. Read `video.previewVideo`. If `available` is `false`, the experience has no preview video now, and the tile shows the image.
1. Add `"video": { "source": "PREVIEW_VIDEO" }` to the create request. Keep `creativeAssetIds`: the images are still required.

Video availability depends on the billing account. `campaign-options` shows `video` when at least one of your billing accounts allows it. If the campaign's billing account doesn't allow video, create and update return `400`. The campaign response shows the video in `video.source` and `video.previewVideoAssetId`.

### Advertise a group's experience

A campaign for a group's experience can use your personal account or the group's account. If you omit `billingAccountId`, the API uses your personal account, also for a group's experience. To pay with the group's ad credit:

1. Call `campaign-options` with the experience's `universeId`.
1. Find the group's account in `billingAccounts`.
1. Set `billingAccountId` to that account's `id`, and `paymentType` to `ADS_CREDIT`.

A group's account accepts only `ADS_CREDIT`, and only for experiences that the group owns. Permission to advertise for the group is enough to create a campaign with it. Buying group ad credit, or setting `autoReloadAdCreditEnabled` to `true` on a campaign that the group's account pays for, needs the `spendGroupFunds` permission.

Group members who can advertise the experience can read and update the group's campaigns without `groupId`, and they can increase the budget of a campaign that the group's account pays for. For a campaign that a personal account pays for, only the owner of that account can increase its spend.

## Track review and delivery

A new campaign goes through ad-policy review. If `startTime` is in the future, `deliveryStatus` is `NOT_SERVING` with reason `SCHEDULED` until the campaign starts, as in the create example above. If the campaign starts now, `deliveryStatus` is `IN_REVIEW` until review is complete.

Poll up to 100 campaigns in one call with `campaigns:batchGetStatus`:

```bash title="Batch get campaign status"
curl --location 'https://apis.roblox.com/ads-management/v1/campaigns:batchGetStatus' \
--header 'x-api-key: ${ApiKey}' \
--header 'Content-Type: application/json' \
--data '{ "campaignIds": ["7225a97c-4f1e-4b8a-9c3d-2e5f6a7b8c9d"] }'
```

The response has one entry in `statuses` for each campaign, with `status`, `deliveryStatus`, and `deliveryStatusReasons`. IDs that don't exist, or that you can't manage, are in a `failures` array with reason `NOT_FOUND`.

| `deliveryStatus` | Meaning                                         | Common `deliveryStatusReasons`                                                                                      |
| :--------------- | :---------------------------------------------- | :------------------------------------------------------------------------------------------------------------------ |
| `IN_REVIEW`      | Ad-policy review or setup isn't complete.       | —                                                                                                                   |
| `SERVING`        | The campaign is serving.                        | `LEARNING` while delivery ramps up                                                                                  |
| `NOT_SERVING`    | The campaign isn't serving now.                 | `SCHEDULED`, `PAUSED`, `INSUFFICIENT_AD_CREDIT`, `QPP_AUTO_PAUSED`, `COMPLETED`, `EXPIRED`, `CANCELLED`, `INACTIVE` |
| `REJECTED`       | Review rejected the campaign or its experience. | `MODERATED`, `CLICK_BAIT`, `GAME_FILTERED`, `PRIVATE`, `PLACE_JOIN_RESTRICTED`                                      |

To see the review result for each creative, list the campaign's ads with `GET /campaigns/{campaignId}/ads`. Each ad has a `reviewStatus`, a `deliveryStatus`, and `reviewIssues` when review finds a problem.

## Manage a campaign

Use `PATCH /campaigns/{id}` and send only the fields that you change.

```bash title="Pause a campaign"
curl --location --request PATCH 'https://apis.roblox.com/ads-management/v1/campaigns/7225a97c-4f1e-4b8a-9c3d-2e5f6a7b8c9d' \
--header 'x-api-key: ${ApiKey}' \
--header 'Content-Type: application/json' \
--data '{ "status": "PAUSED" }'
```

| Change          | Body                                                           | Notes                                                                                                                                                                                                                                |
| :-------------- | :------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pause           | `{ "status": "PAUSED" }`                                       |                                                                                                                                                                                                                                      |
| Resume          | `{ "status": "ACTIVE" }`                                       |                                                                                                                                                                                                                                      |
| Cancel          | `{ "status": "CANCELLED" }`                                    | Permanent. Another cancel request returns the campaign unchanged.                                                                                                                                                                    |
| Rename          | `{ "name": "..." }`                                            |                                                                                                                                                                                                                                      |
| Change budget   | `{ "budget": { "amountMicros": "..." } }`                      | An increase applies immediately. A decrease on a running campaign applies at the next midnight in the account's time zone. Until then, `budget.scheduledAmountMicros` and `budget.scheduledEffectiveTime` show the pending decrease. |
| Change schedule | `{ "schedule": { "startTime": "...", "durationInDays": 14 } }` | Only before the campaign starts.                                                                                                                                                                                                     |
| Add creatives   | `{ "creativeAssetIds": ["..."] }`                              | The API adds new IDs and ignores IDs that the campaign already has.                                                                                                                                                                  |
| Change video    | `{ "video": { "source": "IMAGE_ONLY" } }`                      | Applies to every ad. Only when `mutableFields` in `campaign-options` lists `video`.                                                                                                                                                  |

`PATCH` can't remove a creative from a campaign. To change a field that `mutableFields` doesn't list, create a new campaign. To stop one creative, pause its ad:

```bash title="Pause one ad"
curl --location --request PATCH 'https://apis.roblox.com/ads-management/v1/campaigns/7225a97c-4f1e-4b8a-9c3d-2e5f6a7b8c9d/ads/${AdId}' \
--header 'x-api-key: ${ApiKey}' \
--header 'Content-Type: application/json' \
--data '{ "status": "PAUSED" }'
```

To archive a creative with `PATCH /creatives/{id}`, send `isArchived: true` as the only field. If an enabled ad uses the creative, the request returns `409` `FAILED_PRECONDITION`. Pause the ad first. For other failed edits, see [Handle errors](#handle-errors).

## List resources

List endpoints use cursor pagination with `maxPageSize` and `pageToken`.

**Important:** A page can be short or empty while more results remain. Continue until the response has no `nextPageToken`. Don't stop at the first empty page.

- `GET /campaigns` lists your personal account's campaigns. Add `groupId` for a group's account.
- To list the campaigns of specific experiences across all accounts, use `targetUniverseIds` instead of `groupId`. Repeat the parameter for each ID, up to 10: `targetUniverseIds=1&targetUniverseIds=2`. A comma-separated list returns `400`.
- Keep the same filters on every page of a list.

## Report on performance

Query Sponsored Ads performance for an experience through the [Analytics Query API](./analytics/index.md). Use `SponsoredAdsClicks`, `SponsoredAdsImpressions`, and `SponsoredAdsSpendUsd` with `OneHour`, `OneDay`, or `None` granularity. `SponsoredAdsSpendUsd` returns spend in dollars.

The ad `id` from `GET /campaigns/{campaignId}/ads` matches the `AdId` dimension in analytics results. See [Supported metrics and dimensions](./analytics/metrics.md) for more Analytics Query API metrics.

## Handle errors

The Ads API returns errors in this envelope:

```json title="Error response (400)"
{
  "status": 400,
  "title": "Bad Request",
  "detail": "budget.amountMicros must be at least 5000000 (minimum campaign budget).",
  "errors": [
    {
      "code": "INVALID_ARGUMENT",
      "reason": "BELOW_MINIMUM",
      "field": "budget.amountMicros",
      "message": "budget.amountMicros must be at least 5000000 (minimum campaign budget).",
      "remediation": "Use campaign-options budgetConstraints for the current minimum."
    }
  ]
}
```

When several fields are not valid, each field has its own entry in `errors`. Use `code` and `reason` in your code, `field` to find the problem, and `remediation` to tell the user what to do. If `retryable` is `true`, you can send the request again.

| Status        | `code`                                               | Common causes                                                                                                                                                                |
| :------------ | :--------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 400           | `INVALID_ARGUMENT`                                   | A field is missing or not valid. Read `reason`, for example `BELOW_MINIMUM`, `UNSUPPORTED_VALUE`, `UNKNOWN_FIELD`, `IMMUTABLE_FIELD`, or a [payment error](#payment-errors). |
| 400           | `FAILED_PRECONDITION`                                | The campaign or ad is in a state that doesn't allow the change, for example cancelled, ended, or removed.                                                                    |
| 403           | `PERMISSION_DENIED`                                  | You can't use the account, experience, or creative. Reasons include `UNIVERSE_NOT_ADVERTISABLE` and `BILLING_ACCOUNT_REQUIRED`.                                              |
| 404           | `NOT_FOUND`                                          | The resource doesn't exist, or you can't access it. The API returns the same response for both.                                                                              |
| 409           | `ALREADY_EXISTS`                                     | The creative is already in the account's library.                                                                                                                            |
| 409           | `FAILED_PRECONDITION`                                | The creative is used by an enabled ad. Pause or archive the ad, then archive the creative.                                                                                   |
| 409           | `ABORTED`                                            | Another write changed the resource. Get it again and retry.                                                                                                                  |
| 429           | `RESOURCE_EXHAUSTED`                                 | Too many requests, or a retry of a create request that is still in progress. Wait, then retry with backoff.                                                                  |
| 500, 503, 504 | `INTERNAL_ERROR`, `UNAVAILABLE`, `DEADLINE_EXCEEDED` | A server or dependency failure. Retry with backoff.                                                                                                                          |

The API gateway checks the API key and scopes before the request gets to the Ads API. These errors don't use the envelope. For example, an API key that isn't valid returns `401` with this body:

```json
{ "errors": [{ "code": 0, "message": "Invalid API Key" }] }
```

A request without credentials returns `403` with the message `Invalid authentication data provided`.

## Item advertising

Sponsor Marketplace items like avatar items, bundles, and passes to make them easier to discover across Roblox. You can create and manage item sponsorships in the [Sponsored Items Manager](https://www.roblox.com/sponsorships/list), or through the sponsored campaigns endpoints on `adconfiguration.roblox.com`, listed under **Advertising** in the API reference. For more information, see [Sponsored items](../../marketplace/sponsor-items.md).
