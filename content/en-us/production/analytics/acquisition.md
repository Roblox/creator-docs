---
title: Acquisition
description: Explains how to interpret and improve acquisition metrics for your experience.
---

**Acquisition** measures where new and returning users are coming from and how well they convert.

When acquiring users to your experience, such as announcing an in-game event or creating ad campaigns, make sure your experience has good [retention](./retention.md) and [engagement](./engagement.md) to ensure a healthy user population and game experience.

## Viewing Acquisition Metrics

To view your experience's acquisition analytics:

1. Navigate to your [Creations](https://create.roblox.com/dashboard/creations) page on **Creator Dashboard** and select your experience.
1. In the **Analytics** menu on the left, select **Acquisition**.

You can view analytics for individual or group owned experience. To view the latter, you need to have [group permissions for analytics](../../production/analytics/analytics-dashboard.md#granting-group-permission).

## Acquisition Sources

On the acquisition dashboard, you'll see the following charts and tables:

- New users with play per source
- New users with impressions per source
- Returning users with plays per source
- Returning users with impressions per source
- Qualified play through rate
- Cumulative new users funnel

Here's a list of all the available acquisition sources:

<table>
  <tr>
    <th>Source</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>Home Recommendations</td>
    <td>**Recommended Experiences** section on **Home**</td>
  </tr>
  <tr>
    <td>Home Other</td>
    <td>**Continue Play** and **Favorites** on **Home**</td>
  </tr>
  <tr>
    <td>Friends</td>
    <td>**Friend Activity** section on **Home**</td>
  </tr>
  <tr>
    <td>Search</td>
    <td>Organic traffic from **Search** results and **Recommended Experiences** on **Discover**</td>
  </tr>
  <tr>
    <td>Sponsored Ads</td>
    <td>Combined acquisition from [Sponsored Experiences](../promotion/ads-manager.md#sponsored-experiences) on **Home** and [Search Ads](../promotion/search-ads.md).</td>
  </tr>
  <tr>
    <td>Teleport</td>
    <td>Traffic coming from another experience through [teleporting](../../projects/teleporting.md)</td>
  </tr>
  <tr>
    <td>Other</td>
    <td>All other traffic with unknown sources or can't be attributed, including the traffic from external sources</td>
  </tr>
</table>

<img src="../../assets/analytics/acquisition/qualified-playthrough-rate.png" width= "78%" alt="Chart indicating qualified playthrough rate through home recommendations."/>

## Acquisition Attribution

The dashboard categorizes results for each acquisition source as follows:

<table>
  <tr>
    <th>Attribution</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>Users with Plays</td>
    <td>Unique new users with plays on the experience.</td>
  </tr>
  <tr>
    <td>Users with Qualified Plays</td>
    <td>Unique new users who engaged with your experience.</td>
  </tr>
  <tr>
    <td>Qualified Play Through Rate</td>
    <td>Percent of new users who engaged with your experience after viewing an impression.</td>
  </tr>
  <tr>
    <td>D7 Retention</td>
    <td>Percentage of new players acquired in the date range who played again on the 8th day (D8) after their first session ended.</td>
  </tr>
  <tr>
    <td>7D Playtime per User (Cumulative)</td>
    <td>Cumulative playtime for new players acquired in the date range in their first 7 days divided by the number of new players acquired in the date range.</td>
  </tr>
  <tr>
    <td>30D Payer Conversion (Cumulative)</td>
    <td>Number of paying users from new players acquired in the date range in their first 30 days divided by the number of new players acquired in the date range.</td>
  </tr>
  <tr>
    <td>30D Revenue per User (Cumulative)</td>
    <td>Cumulative revenue, excluding subscriptions, engagement payouts, and immersive ads, for new players acquired in the date range in their first 30 days divided by the number of new players acquired in the date range.</td>
  </tr>
</table>

## Improving Acquisition

To improve acquisition, you can run an acquisition funnel to identify sources that might drive more traffic or convert better, such as:

- The sources driving **the most number of new users** to your experience.
- The sources with the best **end-to-end conversion rate**.

### Improving Acquisition from Roblox Sources

Among all Roblox sources, **Home** is usually where the vast majority of users find experiences. To improve your experience's discovery on Home:

1. **Improve engagement and retention.** Get your [session time](../../production/analytics/engagement.md#improving-average-session-time) and [Day 1 retention](../../production/analytics/retention.md#improving-day-1-retention) to be comparable or above your similar experience benchmarks. The algorithm cares about these metrics because they signal how engaging and satisfying your experience is for users.
2. **Optimize monetization.** Get your [payer conversion](../../production/analytics/monetization.md#improving-payer-conversion-rate) rate and [ARPPU](../../production/analytics/monetization.md#improving-average-revenue-per-paying-user-arppu) (average revenue per paying user) to be comparable or above your similar experience benchmarks. The algorithm cares about these metrics because they measure how invested users are in your experience.

<img src="../../assets/analytics/acquisition/traffic-sources.png" width= "78%" alt="An example shows the statistics by acquisition sources." />

You can adopt the following strategies to improve the number of users visiting your experience from Roblox sources, including **Home**, **Discover**, and **Search**:

1. **Improve your retention**: Day 1 retention signals how engaging and satisfying your experience is for users. Experiences with high Day 1 retention are more likely to be featured in **Recommended Experiences**. For more information on improving Day 1 retention, see [Day 1 Retention](../../production/analytics/retention.md#improving-day-1-retention).

2. **Grow your engagement**. Average session time measures how much time users spend in your experience and signals how much users enjoy your content. Experiences with high average session time are more likely to be featured in **Recommended Experiences**.

For more information on Roblox sources and best practices on improving the discovery of your experience, see [Discovery](../../discovery.md).

### Improving Conversion Rate from Roblox Sources

You can get more users to convert by making your experience metadata engaging and accurate:

1. **Use a title, description, and icon** that's true and unique to your experience.
2. **Add images and videos** to your experience detail page to engage users.

<img src="../../assets/analytics/acquisition/conversion.png" width= "75%" alt="An example shows the statistics of Home and Search Conversion." />

## Improving Acquisition from External Sources

Here are some tips to get users to visit your experience from external sources:

1. **Create social accounts and post regularly**: Add social accounts such as Twitter, YouTube, and Instagram to your Roblox Experience Detail Page. Share regular updates, teasers, and screenshots to build buzz for your experience. Reply to other large social accounts to grow your following.
2. **Create a user community**: Users in your community can share feedback, suggestions, bug reports, fan art, and more. Engage with your community regularly by hosting events and replying to comments and suggestions.
3. **Partner with other creators and influencers**: You can partner with other creators who make similar experiences to grow together. You can also reach out to influencers who have large followings on platforms like YouTube or Twitch to see if they're willing to use or review your experience.
