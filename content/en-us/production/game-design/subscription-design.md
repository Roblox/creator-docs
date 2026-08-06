---
title: Subscription design
description: Learn how to effectively design subscriptions on Roblox.
---

<iframe width="880" height="440" src="https://www.youtube-nocookie.com/embed/kumeLD2TtRM?si=2nsTV0pia-HxwBPa" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

<br />

Subscriptions allow you to offer players recurring benefits for a monthly fee and are a simple way to present compelling content on a regular basis. Done correctly, subscription benefits are something your players look forward to each month, and provide regular income while driving more attention to an experience's shop.

<Alert severity="warning">
For technical information on how to implement subscriptions into your experience, see [Subscriptions](../../production/monetization/subscriptions.md).
</Alert>

A subscription's success hinges on two core principles:

- **Value**: A subscription's value must be clear and obvious to players. Highlight exclusivity, savings, or other unique benefits.
- **Trust**: Consistently delivering high-quality, promised content on-time fosters player trust and is a prerequisite for long subscriber retention.

When considering different ways to implement subscriptions into your experience, consider how subscriptions contribute to your goals and key performance indicators (KPIs):

- **Engagement**: Would offering certain exclusive items through a monthly subscription motivate players to interact more frequently with your [core loop](./core-loops.md) and other features within the experience?
- **Retention**: Is your core loop and other content deep and strategic, so a monthly "trickle" of items can track a typical player's progression from new to veteran status?
- **Monetization**: Is your economy based on just a few items, so that the demand for them is relatively consistent? Or is it based on many items, so that monthly curations could bring awareness to lesser-known, but beneficial items?

To learn more about KPIs, see [Analytics essentials](./analytics-essentials.md).

## Best practices

Players return to experiences for engaging gameplay, fresh content, and social interactions. By continuously improving the player experience and offering valuable content through subscriptions, you ensure players recognize the worth of their purchases, which builds trust and promotes long-term retention. When designing subscriptions for your experience, consider making them:

- **Valuable**: Ensure immediate value recognition upon subscribing, with benefits that continue to resonate alongside new content releases.
- **Informative**: Continue to teach players about different parts of your core loop and expand their playstyle through the subscription content.
- **Diverse**: Provide a mix of items to cater to all player preferences and playstyles.
- **Consistent**: Regularly release promised content to fortify trust and ensure sustained loyalty.
- **Progressive**: Match subscription content with player progression to accommodate every stage of a player's journey, from beginner to veteran.
- **Engaging**: Use subscriptions to showcase exclusive and special content that ties into exciting in-experience events and systems.

## Use cases

The structure of the subscriptions you offer depends on the unique characteristics of your experience. Carefully consider the core elements of the experience and the items offered that could appeal to players month after month. Common subscription use cases include:

- Bundles
- Memberships and VIP benefits
- Season passes

### Bundles

**Bundles** are a collection of individual items sold together as a single purchasable unit. These individual items are divided into three types:

- **Durable**: Permanent items that do not have limited usage.
- **Consumable**: Items that disappear after a certain number of uses.
- **Currency**: In-experience currency that is used to purchase other items or content.

<Alert severity="info">
If your bundle contains any durable items, select **Durable** for the product type.
</Alert>

Consider selling a subscription bundle containing a single type, a combination of two, or a mix of all three. Common subscription bundles include currency packs and item packs.

To learn more about Bundles, see [Monetization Foundations](./monetization-foundations.md).

#### Currency packs

**Currency packs** are bundles that contain a certain amount of in-experience currency. This serves as a baseline amount of currency that a player can depend on each month to fund a portion of their content purchases. Utilizing subscriptions that provide currency packs can be an effective method to increase your experience's monetization potential and provide value to your players.

To calculate a monthly subscription that provides players with an appropriate amount of in-experience currency:

1. Calculate the USD/Robux exchange rate of roughly $1 USD
2. Calculate the estimated amount of Robux a player receives based on the subscription levels available:

   - $2.99
   - $4.99
   - $7.99
   - $14.99

3. Calculate the exchange rate of your in-experience's soft currency (X) to R.

   - X = 1 R

4. Determine an amount of soft currency that accurately reflects the value of the purchase.

To start determining this, think about how much gameplay it would take a user to earn the equivalent of 1 Robux worth of soft currency.

When pricing currency packs, remember to compare the relative value of your in-experience currency to existing single-purchase Robux costs. For example, if you're creating a new subscription currency pack and have an existing pack that sells for 100 Robux, assess the value of the new pack's contents in comparison to the current offering.

To learn more about rewards and currency balancing, see [Balance virtual economies](./balance-virtual-economies.md).

#### Item packs

**Item packs** are collections of varied items. If more than one item product type is included in a bundle, it's called a **variety pack**. Offering these as monthly subscriptions can provide players with both unique event items alongside common ones. If players know that each month they can expect to receive something interesting or exclusive, they are more likely to maintain interest in the experience. This concept is often called the "content cadence."

To learn more about content cadences, see [Content updates](https://create.roblox.com/docs/production/game-design/content-updates).

<figure>
  <img src="../../assets/game-design/subscriptions/subscriptions-1.png" width="70%"/>
  <figcaption>Item pack _Dragon Adventures_</figcaption>
</figure>

Depending on the items you offer, it could be beneficial to mix both durable and consumable items in these packs, but be intentional with the amount of durable items you include. Because durable items don't expire, overrelying on them can force you into a cycle of constantly designing new ones. The key to a successful item pack lies in the perceived value and positive impact on the player's experience. Instead of filling your packs with random items, fill them with intentionally designed items that your players will anticipate and appreciate each month.

### Membership and VIP benefits

**Membership** and **VIP benefit** rewards are another way to merchandise packs of items, currency, and content access. They are conceptually similar to bundles. Subscriptions are the optimal method for providing this reward, as their monthly value is equivalent to a one-time purchase.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/game-design/subscriptions/subscriptions-3.png" width="80%"/>
    <figcaption> VIP pack in _Squishmallows_</figcaption>
  </figure>
  <figure>
    <img src="../../assets/game-design/subscriptions/subscriptions-2.png" width="100%"/>
    <figcaption> VIP benefits in _Adopt Me!_ </figcaption>
  </figure>
</GridContainer>

### Season passes

**Season passes** are quest-based content systems that repeat at regular cadences each month. Because seasons typically last from a week to a month, they're a great candidate to consider when designing subscriptions for your experience.

In a season pass, players complete quests to earn season XP, which allows them to progress through tiers of rewards. In a subscription model, subscribed players unlock access to an exclusive premium track that provides additional rewards.

Because progress is tracked across both the standard and premium pass, players who subscribe partway through a season can claim any premium rewards they've already earned.

<figure>
  <img src="../../assets/game-design/subscriptions/subscriptions-4.png" width="70%"/>
  <figcaption>Season pass in _Dragon Adventures_</figcaption>
</figure>

To learn more about designing season passes, see [Season Pass Design](./season-pass-design.md).
