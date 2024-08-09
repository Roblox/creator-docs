---
title: Discovery
comment: Changes to this article require additional review
description: Explains how users discover experiences on the Roblox platform.
---

Roblox's [mission](https://devforum.roblox.com/t/discovery-on-roblox-past-present-and-future-vision/2859111) for discovery is to connect every user with the best creation and community for them. This guide outlines how discovery works and how you can help your experience get discovered.

## How Recommendation Works

On Home, our **Recommended for You** algorithm decides what experiences to show each user in two stages:

<img src="/assets/analytics/discovery/Retrieval-And-Ranking-Diagram.png" alt="Diagram of how all experiences are sorted, ranked, and finally displayed on home page." />

**Retrieval (stage 1)**: Roblox selects a subset of experiences that each user might enjoy playing based on signals like engagement, retention, monetization, friend plays, similar experiences, and variety.

**Ranking (stage 2)**: Roblox ranks the selected experiences based on 3 main signals:

1. **Engagement (playtime)** tracks how users engage in your experience. Metrics that contribute to playtime include [session time](./production/analytics/engagement.md#improving-average-session-time), sessions, [retention](./production/analytics/retention.md), and [qualified play through rate](./production/analytics/acquisition.md#improving-acquisition). This is the main signal that we optimize for.
2. **Monetization (revenue)** tracks how users invest in your experience. Metrics that contribute to revenue include [payer conversion](./production/analytics/monetization.md#improving-payer-conversion-rate) and [average revenue per paying user](./production/analytics/monetization.md#improving-average-revenue-per-paying-user-arppu).
3. **Ecosystem health** ensures that Roblox continues building a vibrant platform. We want to reward creations that bring new users to Roblox and that creators continue to invest in with updates, events, and more.

Roblox's recommendation system uses **explore and expand** phases to understand the signals above. For example, you might see a spike in new users from recommendations (explore) after a content update. If that new user cohort has good engagement and monetization, Roblox is more likely to continue to recommend your experience to those user cohorts (expand).

When ranking experiences for recommendations, Roblox only considers engagement, monetization, and ecosystem health signals from **users who join through recommendations**. Users who join from other sources, such as [sponsored ads](./production/promotion/ads-manager.md#sponsored-experiences), can help the system start exploring your experience but don't impact recommendation rankings.

<img src="/assets/analytics/discovery/Explore-And-Expand-Graph.png" alt="An analytic Plays Per Source graph indicating new and returning users." />

For a detailed overview, please see our [discovery vision post](https://devforum.roblox.com/t/discovery-on-roblox-past-present-and-future-vision/2859111) and [RDC talk](https://www.youtube-nocookie.com/embed/V1uFFUUCLpo).

## How You Can Get Discovered via Recommendations

The best way to get discovered via recommendations is to continue to invest in engagement, monetization, and ecosystem health for your experience:

1. **Engagement (playtime)**: [Session time](./production/analytics/engagement.md#improving-average-session-time), [retention](./production/analytics/retention.md), and [qualified play through rate](./production/analytics/acquisition.md#improving-acquisition)
2. **Monetization (revenue)**: [Payer conversion](./production/analytics/monetization.md#improving-payer-conversion-rate), [revenue per paying user](./production/analytics/monetization.md#improving-average-revenue-per-paying-user-arppu)
3. **Ecosystem health**: Continue to invest in regular content and events updates

On your experience overview page, use the **Daily Benchmarks** section to compare your experience metrics with similar games that your users also play:

<img src="/assets/analytics/discovery/Daily-Benchmark-Graphs.png" alt="A series of graphs helping compare benchmarks with other experiences." />

Your similar experience benchmarks are updated daily. Roblox does not use these benchmarks as a direct signal in the discovery algorithm. These benchmarks are designed to give you a point of comparison as you work on improving your engagement, monetization, and acquisition.

<br />
<h5>Frequently Asked Questions</h5>
<br />
**What metric should I focus on to get discovered via recommendations?**

You should focus on metrics that are below benchmark in your Daily Benchmark section and related graphs. For example, the experience in the image above is below benchmark on **average session time** and **D1 retention**. To address this, consider focusing on:

1. Tracking and improving your [onboarding funnel](./production/analytics/funnel-events.md).
2. Optimizing your onboarding funnel will likely improve [session time](./production/analytics/engagement.md#improving-average-session-time) and [retention](./production/analytics/retention.md), which both contribute to your experience's engagement (playtime).

**Why did my daily active users increase or decline?**

If your daily active users increases or declines substantially, consider investigating the following:

View [acquisition analytics](./production/analytics/acquisition.md) to understand where new and returning users are coming from by source, such as recommendations, search, sponsored, or others.
If plays from recommendations contributed the most to your user change, look for key metric drops in your Daily Benchmarks and related charts, such as qualified play through rate, during the same time period.

New metric change insights are being actively tested on your **Experience Overview** page to make the above easier for you to investigate:

<img src="/assets/analytics/discovery/Experience-Overview-Graph.png" alt="A weekly Daily Active User Change graph indicating a drop in key metrics." />
<br />
**How can I attract an initial audience to my new experience?**

If you have a brand new experience, you may not have enough users for recommendations to understand how your engagement and monetization metrics compare with other experiences.

Consider driving new users to your experience with [social links](/production/promotion/audience-engagement.md#linking-to-social-media), [sponsored ads](./production/promotion/ads-manager.md#sponsored-experiences), and other channels so that recommendations can get enough signal. Roblox continues to add recommendations improvements to be better at discovering new experiences.

## Discovery for Other Surfaces

Home's **Recommended For You** is not the only discovery surface that Roblox offers. Below is a primer on our other surfaces:

## Other Home Sorts

Home is a user's personalized view of Roblox. Outside of Recommended for You, Home also includes **Continue Playing**, **Friends List**, **Sponsored**, **Curated Sorts**, and more. For a deeper dive on some of these sections:

- **Curated** (e.g., Today's Picks) has experiences that are hand curated by Roblox and include up-and-coming creations, updated experiences, new genres, and more. Learn more in this [post](https://devforum.roblox.com/t/introducing-today%E2%80%99s-picks-a-new-curated-sort-on-home-pilot/2910867).
- **Live Events** has experiences that are part of a limited time event that you can complete quests for to unlock rewards. You can see past events from Roblox [here](https://www.roblox.com/groups/4111519/Roblox-Presents#!/about).
- **Sponsored** lets you invest directly in getting your experiences discovered by a specific audience segment. For more information, see [Ads Manager](./production/promotion/ads-manager.md#sponsored-experiences).

### Experience Details Page

The Experience Details Page aims to offer users comprehensive insights about the experience, enhancing their understanding and aiding in decision-making. This, in turn, drives high-intent users to your experiences. You can leverage the Experience Details Page to improve user onboarding and attract returning users by:

- **Maintaining up-to-date events**: Events are crucial for community engagement. Use [Experience Events](#experience-events) to inform users about upcoming events and drive traffic to your experience.
- **Maintaining Roblox Groups and Guilded Channels**: Roblox Groups and Guilded offers the best way for creators to connect with and inform their communities. You can now view [Guilded announcements](https://devforum.roblox.com/t/introducing-announcements-for-roblox-groups/2907426) on Roblox groups, which strengthens community bonds.
- **Increasing Monetization**: Boost revenue by adding [passes](./production/monetization/game-passes.md) and [subscriptions](./production/monetization/subscriptions.md) for your experience.

The Experience Details Page also provides additional recommendation opportunities by highlighting similar experiences, helping users discover more relevant content.

#### Experience Events

**Experience events** are key to keeping a community engaged. These moments are where all your users can come together and engage for unique events and scenarios. [Experience events](./production/promotion/experience-events.md) are a way for you to tell your users about upcoming events within your experience, and for them to opt in and be notified when that event starts. We are continuing to build on that foundation offering deeper event details customization. You can add up to 5 thumbnails to promote your event with users and include a primary event type. This additional metadata will also give you a chance to be featured in **Today's Picks**.

### Search

**Search** aims to be a companion (easy to find and use), concierge (understands user intent, safe and trustworthy to use), and a rescuer (helps when recommendations aren't quite what the user is looking for).

Historically, Search has primarily focused on relevance based on exact search queries and limited metadata such as titles. Roblox is constantly improving Search to better understand user intent. For example, you can now use semantic search for all of our officially supported languages to find experiences through natural language queries, such as "food games" or "avatar editors".

### Discover (Top Charts and Trending Sorts)

The [Discover](https://www.roblox.com/discover#/) page is designed to reflect the many constantly changing high-quality experiences available on the platform and showcasing the best-performing content on Roblox.

Roblox is [committed](https://devforum.roblox.com/t/discovery-on-roblox-past-present-and-future-vision/2859111) to enhance the Discover page to better serve our community and provide more opportunities to highlight a diverse set of top recommendations for our users. For example, top and trending sorts have been [updated](https://devforum.roblox.com/t/testing-an-enhanced-discover-page-top-charts-and-new-sorts/2954676) to transform the Discover page into a more impactful and dynamic space that delights users.

### Notifications

**Notifications** elevate timely and actionable information to users. Historically, we have focused on building and scaling social notifications, such as friend requests and invitations. This system allows for creators to engage with users directly while they are away. Milestones, high scores, [friend activity](https://devforum.roblox.com/t/user-mentions-in-experience-notifications/2980675), and other key moments can be delivered to users as personalized notifications to the notification stream. For additional information and implementation instructions, see [Experience Notifications](./cloud/open-cloud/experience-notifications.md).

You can also use our [in-experience notification permission prompts](https://devforum.roblox.com/t/introducing-in-experience-notification-permission-prompts/2909125) to upsell notification opt-in within experiences. Notifications can help resurrect lapsed users or remind users when they need to take an action.
