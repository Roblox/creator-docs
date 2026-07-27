---
title: Advertising concepts
description: Key concepts for the Advertising API - campaign status versus delivery status, micro-USD money, objectives, creatives, and versioning.
---

Read these concepts before using the [Advertising API](index.md).

## Status versus delivery status

Every campaign carries two independent fields:

- **`status`** — the lifecycle state you control through update requests: `ACTIVE`, `PAUSED`, or `CANCELLED`. `CANCELLED` is permanent.
- **`deliveryStatus`** — the serving state the system derives (read-only): `IN_REVIEW`, `SERVING`, `NOT_SERVING`, or `REJECTED`.

A newly created campaign is `ACTIVE` / `IN_REVIEW` until ad-policy review completes. Use `status` for lifecycle actions and `deliveryStatus` to answer "is it serving?" When a campaign is `NOT_SERVING` or `REJECTED`, `deliveryStatusReasons` explains why.

## Money is micro-USD strings

Budget amounts are expressed in **micro-USD as decimal strings** — `"5000000"` equals $5.00. Money is sent and returned as a string so large values keep full precision in every client. Convert to dollars by dividing by 1,000,000.

## Objective

Only the `ENGAGEMENT` objective (drive visits to your experience) is available in v1.

## Creatives

Creatives are Open Cloud **image assets**. Upload an image with the [Assets API](../usage-assets.md), then reference its asset ID in `creativeAssetIds` when creating a campaign. The assets must already exist and be usable by the caller; they are validated and saved to the account's reusable creatives when the campaign is created.

## Budget changes

A budget **increase** applies immediately. A **decrease** on a running campaign is applied at the next midnight in the billing account's time zone; until then the campaign keeps serving on the current (higher) amount. A pending decrease is surfaced as `scheduledAmountMicros` and `scheduledEffectiveTime` on the budget.

## Versioning

The major version is in the path (`/ads-management/v1`). Additive, backward-compatible changes are delivered as minor versions selected with the `X-Roblox-Api-Version` header; the frozen `1.0` baseline is the default, so you opt in to newer minors explicitly.
