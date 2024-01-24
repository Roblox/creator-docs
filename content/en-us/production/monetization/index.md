---
title: Monetization
description: Monetization is a part of Roblox's overall structure to provide value to creators.
---

Monetization is a part of Roblox's overall structure to provide value to creators. There are several different approaches to monetize your content, including utilizing [subscriptions](#subscriptions), charging an [access fee](#paid-access), providing [items or abilities that users can purchase](#developer-products), and offering [private servers](#private-servers) for users to play just with friends.

If you choose to offer purchasable content, Roblox doesn't automatically record product or purchase information. To prevent data loss, you must carefully store this data using `Class.DataStoreService` or another data storage service hosted outside of Roblox.

<br />

<Alert severity="info">
For an in-depth look at designing optimal monetization strategies for your experience, see [Monetization Foundations](../../production/game-design/monetization-foundations.md).
</Alert>

## Monetization Strategies

Be mindful of the monetization methods you introduce into your experience as our users are likely to **downvote** your experience if they do not approve of your strategies. Also, all developers need to be transparent with any [chance-based monetization](../../production/monetization/randomized-virtual-items-policy.md) and use these mechanics responsibly.

Some popular monetization strategies for free-to-play experiences on other platforms are not recommended for Roblox. For instance, appointment mechanics and timers which can be removed or brought forward may work well on other platforms, but these mechanics are unpopular with Roblox users who take issue with their fun coming to a premature end.

The following best practice suggestions are popular among top developers for tailoring monetization strategies to the Roblox platform and audience.

<Alert severity="warning">
Please note that by applying these techniques and considerations, you are not guaranteed to be able to effectively monetize your experience. Remember that you don't need to have any financial goals to have fun creating a Roblox experience.
</Alert>

### Tourists and Locals

It can be helpful to think of Roblox users in two categories:

- **Tourists** typically hop from one experience to another, prioritizing variety over depth. They prefer items with immediate effects, either through making gameplay more fun or through making them stand out, inviting other users to question how and where they got the item.
- **Locals** are more likely to focus on a particular experience or smaller set of experiences. They engage more deeply, and typically form almost all an experience's engaged user base. They are more interested in items with long term benefits, such as a '[battle pass](../../production/game-design/season-pass-design.md)'.

To learn more about how to design your experience with Roblox users in mind, see: [Designing for Roblox](../../production/game-design/designing-for-roblox.md).

### Social Features

Roblox users tend to enjoy experiences which emphasize social interaction. For instance, having items or events that are only available for a **limited time** can create excitement around that content. A **trading** system encourages users to interact. While both systems can be successful on their own, they are particularly effective when combined.

### Live Ops

Post-launch support is in many ways easier on Roblox than on other platforms as you can quickly ship updates to improve your experience.

**Frequent** content updates can be helpful if you want to maintain engagement with your experience over time. Roblox users are used to being engaged by regular updates, and it can be much harder to regain a user's interest than it can be to maintain active ones. A **weekly cadence** for updates is ideal. At the bare minimum, aim for monthly updates. For a discussion on content cadence, see the Level Up [Content Cadence workshop](../../production/game-design/content-updates.md).

When designing updates, keep them focused on a particular **theme**. This makes it easier for users to understand the new update and tell what content is new when they join. It also helps you coordinate your content and promotional assets. For example, if you're adding a new Zoo to your roleplaying experience, make sure all new content has some connection to the Zoo theme.

Don't be afraid to make users earn their **access** to new content. New users will flock to play new updates, but if they don't feel like they've **achieved** something in the experience, they may check out soon after. You can create a sense of earning an update either through monetizing the update content or creating pre-requisite conditions for playing the new content.

To learn more about how to design effective post-launch support for your experience, see [Live Ops Essentials](../../production/game-design/liveops-essentials.md).

## Products

### Immersive Ads

The [Immersive Ads](../../production/monetization/immersive-ads.md) system allows you to insert ad units into your experience that permit Roblox to programmatically serve ad content from advertisers to your active users.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/monetization/immersive-ads/Overview-ImageAd.jpg" />
    <figcaption>Image Ad Format</figcaption>
  </figure>
  <figure>
    <video controls src="../../assets/monetization/immersive-ads/Overview-PortalAd.mp4" width="90%"></video>
    <figcaption>Portal Ad Format</figcaption>
  </figure>
</GridContainer>

### Subscriptions

[Subscriptions](../../production/monetization/subscriptions.md) within experiences let you offer users recurring benefits for a monthly fee.

<figure>
  <img src="../../assets/monetization/subscriptions/Example-Subscriptions.png" width="600" />
  <figcaption>Examples of experience subscriptions</figcaption>
</figure>

### Developer Products

A [Developer Product](../../production/monetization/developer-products.md) is an item or ability that a user can purchase more than once, such as in-experience currency, ammo, or potions. You can prompt purchases, record them, and get product information through scripting.

<img src="../../assets/monetization/developer-products/Buy-Product-Example.jpg" width="800" />

### Passes

A [Pass](../../production/monetization/game-passes.md) allows you to charge a **one-time Robux fee** in order for users to access special privileges within an experience, such as entry to a restricted area, an in-experience avatar item, or a permanent power-up.

<img src="../../assets/monetization/game-passes/passes-sample.png" width="800" />

### Paid Access

[Paid Access](../../production/monetization/paid-access.md) allows you to charge a **one-time Robux fee** in order for users to access your experience. Some developers temporarily use this feature to create a closed beta where their most engaged users can have early access to an experience and help with testing and feedback.

<img src="../../assets/monetization/paid-access/Buy-Access-Example.png" width="400" />

### Engagement-Based Payouts

<img src="../../assets/monetization/engagement-based-payouts/Premium-Banner.jpg" />

[Engagement-Based Payouts](../../production/monetization/engagement-based-payouts.md) allow you to automatically earn Robux based on the share of time that [Premium](https://www.roblox.com/premium/membership) subscribers engage in your experiences.

### Private Servers

A [private server](../../production/monetization/private-servers.md) is a subscription-based feature that allows a user to decide who can play an experience with them. While private servers can be free, you can also use private servers as a method of monetization by charging users who want to access private servers a **monthly Robux fee**. Private servers are often purchased for:

- Playing experiences just with friends.

- Holding gatherings such as classes, meetings, or parties.

- Recording and/or streaming without other users.

- Gathering in-experience resources.

<img src="../../assets/monetization/private-servers/Example-Purchase-Dialog.png" width="400" />

### Catalog Fees and Commissions

You can create and sell accessories and clothes on the Marketplace. After you pay the upload fee and submit a new asset for approval, the moderation team reviews your asset and, if approved, adds your asset to the catalog.

You'll receive a [commission](../../art/marketplace/marketplace-fees-and-commissions.md) every time users purchase your catalog item. If users purchase your catalog item within an experience using the [Avatar Inspect Menu](../../players/avatar-inspect-menu.md) or the [Avatar Editor Service](../../players/avatar-editor.md), the experience owner also receives a commission.

### Plugins

A [Plugin](../../studio/plugins.md) is an extension that adds additional features or functionality to Studio. You can sell plugins to other creators on the [Creator Store](../../production/publishing/creator-store.md) for Robux, or offer them for free. For more information, see [Publishing Plugins](../../studio/plugins.md#publishing-plugins).

<Alert severity="warning">
   There is a 30 day escrow hold for each purchase. Roblox holds the commission from your items and your Robux share of the sale for 30 days, starting from the date of sale.
</Alert>
