---
title: Analytics
description: An overview of analytics features to track an experience's growth, retention, and other metrics.
---

Roblox offers a variety of analytics features to help you chart your experience's growth, track user behavior and retention, and find opportunities for optimization. You can use analytics to understand what actions you can take to grow your experience.

## Grow your experience with analytics

Consider following this 3-step plan to use analytics to grow your experience:

<h4>Step 1: Optimize retention, engagement, and monetization</h4>

Before driving too many new users to your experience, grow the following metrics to a level that's comparable to or above the [benchmarks for similar experiences](../../production/analytics/analytics-dashboard.md#benchmarking):

      1.  **D1 (day 1) retention** and **average session time** are key metrics to focus on first because they measure if new users are enjoying and coming back to your experience. For more information on improving this metric, see [Retention](../../production/analytics/retention.md) and [Engagement](../../production/analytics/engagement.md).

      2.  **D7 (day 7)** and **D30 (day 30) retention** measure if users are making progress in your experience and returning long-term. For more information on improving this metric, see [Retention](../../production/analytics/retention.md).

      3.  **Payer conversion rate** and **ARPPU (average revenue per paying user)** measure the effectiveness of your user monetization. It's important to be thoughtful about monetization from the start. For more information on improving this metric, see [Monetization](../../production/analytics/monetization.md).

<figure>
    <img src="../../assets/analytics/overview/step1.png" width="80%"/>
    <figcaption>Comparing D1 retention to similar experiences.</figcaption>
  </figure>

<h4>Step 2: Drive new user acquisition </h4>

After you have optimized your retention, engagement, and monetization, use your [Acquisition](../../production/analytics/acquisition.md) page to understand:

1. Where new users are coming from by source.
2. How well home recommendations are converting.

You can use the following chart to track the percent of users who have a qualified play in your experience after viewing it in recommendations. A "qualified play" refers to a user's intentional engagement with your experience, as opposed to accidental clicks or joining an experience and then bouncing quickly. Test different experience icons, titles, and descriptions to see how they impact your qualified play through rate.

<figure>
    <img src="../../assets/analytics/overview/step2.png" width="80%"/>
    <figcaption>Comparing conversion rates.</figcaption>
  </figure>

Roblox experiences are inherently social, and users love trying them out with their connections. Consider using features like [experience events](../../production/promotion/experience-events.md) and [player invite prompts](../../production/promotion/invite-prompts.md) to invite users to bring their connections to your experience.

<h4>Step 3: Monitor metrics after each experience update</h4>

After you update your experience, visit analytics to understand how the update impacted the following metrics:

1. [Retention](../../production/analytics/retention.md): D1 and D7 retention.
2. [Engagement](../../production/analytics/engagement.md): Average session time.
3. [Monetization](../../production/analytics/monetization.md): Payer conversion, ARPPU, and revenue.
4. [Acquisition](../../production/analytics/acquisition.md): New users and qualified play through rate.

You can monitor major weekly changes and benchmark movement on your experience overview page. [Insights](./insights.md) highlights large movements in key metrics such as DAU, new users, and revenue.

<figure>
    <img src="../../assets/analytics/overview/step3.png" width="80%"/>
  </figure>

If you have 100+ DAU, you can compare how your experience is performing against similar experiences using the benchmark scorecards. Your benchmark scorecards help you focus on the right metrics to improve compared to similar experiences

For example, in the scorecard below, engagement (average session time and D1 retention) looks to be the problem. As a result, you may consider using [funnel analytics](../analytics/funnel-events.md) to improve your onboarding funnel.

Your similar experience benchmarks are updated daily. Roblox does not use these benchmarks as a direct signal in the discovery algorithm. Instead, these benchmarks give you a point of comparison as you work on improving your engagement, monetization, and acquisition. For more information on how users find new experiences, see [Discovery](../../discovery.md).

<figure>
    <img src="../../assets/analytics/overview/Benchmarks-Similar.png" width="80%"/>
  </figure>

## Analytics Home

[Analytics Home](https://create.roblox.com/dashboard/analytics) is the highest-level entry point for creator analytics and is located in the left navigation of [Creator Hub](https://create.roblox.com/). Analytics Home enables you to:

- Monitor the analytics of multiple experiences at once
- Track avatar item sales and revenue
- Track user acquisition through off-platform share links

### Monitor experiences

You can monitor the analytics of up to nine Roblox experiences by putting them into a **watchlist**. If you have analytics permissions for the experience, your watchlist provides the following analytics at a glance:

- **Daily Active Users (DAU)**: Number of unique players who joined the experience at least once in the given day.
- **New Users**: Number of DAUs who are first-time users.
- **Session Time**: Total play time divided by number of individual sessions each day.
- **Day 1 Retention**: Percentage of new users who played again after their first session ended.
- **Daily Revenue**: Total amount of Robux earned by the experience in a day.

If you add an experience to your watchlist that you don't have analytics permissions for, the card only populates publicly viewable stats. These include:

- Like Ratio
- CCU
- Updated Date
- Title
- Owner

Watchlists are applied on the account level, are private, and persist when toggling between groups. To add an experience to your watchlist, paste the **Experience URL** or add it from your **Experience Table**, which is a list view of all the experiences owned by your account or selected group.

<figure>
    <img src="../../assets/analytics/overview/watchlist.png" width="80%"/>
    <figcaption>Experience watchlist on Analytics Home.</figcaption>
</figure>

Clicking on an experience you're monitoring takes you to the experience overview page. If applicable, [analytics insights](./insights.md) offer direction on next steps and redirect you to applicable documentation and relevant analytics.

### Track avatar sales and revenue

Avatar items you've sold automatically appear within the **Avatar Items** tab. Here, you can:

- **View top performing items**: See your top selling and grossing avatar items over a selected time period.
- **Analyze overall sales and revenue**: Showcase up to eight top items on a time-series graph.
- **Monitor your catalog**: Examine a table with up to 200 items, filterable by item category and sales types, and sortable by sales and total revenue.

<figure>
    <img src="../../assets/analytics/overview/avatar-sales-and-revenue.png" width="90%"/>
    <figcaption>Avatar Items on Analytics Home.</figcaption>
</figure>

### Track user acquisition

The **Share Links** tab provides information about the **Link Visits** metric, which tracks how many users have arrived on your experience details page by clicking on the share link you created.
