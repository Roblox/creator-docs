---
title: Managed pricing
description: Managed pricing brings regional pricing and price optimization into one unified system in Creator Hub.
---

<Alert severity='info'>
For timelines, latest updates, and roadmap details, see the [DevForum announcement](#).
</Alert>

**Managed pricing** is a unified system in Creator Hub that combines [price optimization](./price-optimization.md) and [regional pricing](./regional-pricing.md) under a single opt-in. Price optimization helps you find the right price points for your passes and developer products. Regional pricing helps you offer accessible prices to users across different economic regions.

From the **Managed Pricing** tab, you can:

- [Opt in](#opt-in-and-enroll-items) through a one-time flow for existing experiences.
- Review eligible items and choose what to include for Managed Pricing.
- Opt specific items in or out of automation.
- Use bulk actions to enable or disable multiple items at once.
- View past tests, upcoming tests, and revenue impact in one view. You can also reschedule tests.

## Opt in and enroll items

<Alert severity='info'>
After initial opt-in, **Managed Pricing** replaces the **Price Optimization** tab in your Creator Dashboard.
</Alert>

Managed pricing lives in the **Managed Pricing** tab under **Monetization** in Creator Hub.

To enroll an experience:

1. Go to [Creations](https://create.roblox.com/dashboard/creations) and select an experience.
2. Go to **Monetization** ⟩ **Managed Pricing**.
3. Complete the one-time opt-in flow. If managed pricing detects hard-coded prices in your experience, you're prompted to fix them first.
4. Review eligible items and choose what to include. Use bulk actions to enable or disable multiple items at once, and opt specific items in or out of automation at any time.

After opt-in, the **Managed Pricing** tab shows past tests, upcoming tests, and reports for completed tests.

### Item eligibility and defaults

<Alert severity='warning'>
If you are already using regional pricing, your existing regional pricing items transition to managed pricing automatically.
</Alert>

- **New experiences and newly-created items** are enrolled in Managed pricing by default. Item-level opt-out is available at any time.
- **Subscriptions, Private Servers, and Developer Servers** are regionalized automatically and don't require opt-in. Subscriptions are not included in price optimization tests.

## Price optimization

Managed pricing uses [price optimization](./price-optimization.md) to identify better prices for passes and developer products based on signals from your own experience, including demand, conversion, spend, and your experience's spender penetration in specific countries. Items below the experiment-eligibility threshold for price optimization tests are unaffected.

For details on [how tests work](./price-optimization.md#how-tests-work), the dynamic price check tool, the price review period, and the metric glossary, see [price optimization](./price-optimization.md).

## Regional pricing

Managed pricing uses [regional pricing](./regional-pricing.md) to adjust prices by a user's economic location, using signals like purchasing power, currency exchange rates, and local spending behavior. Regional prices are bound between 30% and 100% of the default price.

For details on how economic location is determined, displaying regional prices in your experience, and protecting in-experience trades and gifts with `Class.MarketplaceService.GetUsersPriceLevelsAsync|GetUsersPriceLevelsAsync`, see [regional pricing](./regional-pricing.md).
