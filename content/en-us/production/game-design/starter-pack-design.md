---
title: Starter pack design
description: Teaches you about best practice guidance on designing starter packs.
---

Starter packs are a type of item bundle offered to new players in an experience. By enticing players with useful items at a deeply discounted price, starter packs can increase [conversion](../game-design/analytics-essentials.md#monetization-metrics), a vital monetization metric that tracks the number of players spending money in an experience.

According to industry benchmarks, experiences that implement a starter pack may see an **increase in revenue of 2-10% on average**. However, the revenue impact could be even higher, depending on how well an experience monetizes already and the details of its starter pack's implementation.

The tips below are based on industry best practices and the Developer Excellence team's experience. Feel free to follow our suggestions, or design the starter pack that best suits your own experience.

<Alert severity="info">
For out-of-the-box functionality to sell collections of items to players at a discount, see the [Bundles](../../resources/feature-packages/bundles.md) feature package.
</Alert>

## Availability

Because the starter pack is a monetization feature, it's recommended to make the pack available as soon as new players spawn for the first time. Gating access to the pack behind completion of a tutorial or first match, time spent in the experience, or other restrictions, unnecessarily reduces the number of players who will see and ultimately purchase it.

Because they are priced at a significant discount, starter packs are single-time purchases; after a player purchases the bundle, it is no longer available to them. Players who spend once are more likely to spend again, though, which is why conversion is so important for an experience's monetization.

In addition to being single-time purchases, starter packs are often offered to players for a limited time – from minutes or hours to several days – after which the pack is no longer available. The purpose of the timer is twofold: it creates additional incentive for players to make the purchase, and it ensures that the bundle doesn't outlive its usefulness.

Starter packs are designed to help new players jumpstart their experience, but they do not necessarily remain relevant past a certain point of progression; for example, 500 coins might be a significant amount of currency to a Level 1 player, but a trivial amount to a Level 10 player.

The [Bundles feature package](../../resources/feature-packages/bundles.md) allows you to define the timer that's best for your experience. In general, it is preferable to give players time to make the decision to purchase rather than aggressively limiting its availability; we recommend between 24 hours and 3 days for most experiences.

## Surfacing

Surfacing refers to the discoverability of features in an experience, or how easily players can find and access them. Some common and effective ways to surface a starter pack include:

- A dedicated button on the HUD that also displays the countdown timer, visible throughout the duration of the bundle's availability.
- Prominent featuring of the starter pack in the store, with the timer and discount clearly communicated.
- A popup modal dialog advertising the bundle. Some players feel that popups are aggressive, however, so use sparingly. Potential popup opportunities include when the player spawns into the experience the last day the offer is available to them, when they level up, or when they lose a match in which the starter pack's items might have been helpful.

## Content

The content of each starter pack is different, depending on the items available in an experience. In general, they should be items that enhance a new player's experience by giving them a head start. Common items include:

- In-game currency
- Resources
- Experience (XP) or other form of progress boost
- Powerups
- Exclusive cosmetic items like avatar clothing or auras/trails that can only be obtained in the starter pack

Try to choose 2-5 items that help players jump into the fun quickly and allow them to feel smart and special because they made the purchase.

## Pricing

The starter pack should be one of the best offers in the experience, with **outsized and obvious value** to catch players' attention. Common price points include 99 R, 199 R, and 299 R – but anything less than 399 R ($5) would be a reasonable price targeting new players. The amount will depend on the contents and quantity of items in your bundle.

Whatever price you choose, **we recommend a discount of around 90%** to make value abundantly clear. For items like XP that aren't directly monetized, consider how much time it takes players to earn them and work backward to assign a value.

Beyond your starter pack, make sure that your experience has sufficient **spend depth**, or a variety of purchasable content and price points, to appeal to spenders of all levels. Along with frequent content updates, this will help encourage any new payers converted by the starter pack to continue spending in your experience. You can use the [Bundles package](../../resources/feature-packages/bundles.md) to create item offers for this purpose, from permanent content packs to limited-time event bundles.

For more information on monetizing your experience, check out [Monetization foundation](monetization-foundations.md).
