---
title: Discovery
comment: Changes to this article require additional review
description: Explains how users discover experiences on the Roblox platform.
---

Roblox's [mission](https://devforum.roblox.com/t/discovery-on-roblox-past-present-and-future-vision/2859111) for discovery is to connect every user with the best creation and community for them. This guide outlines how discovery works and how you can help your experience get discovered.

## How recommendation works

On Home, our **Recommended for You** algorithm decides what experiences to show each user in two stages:

<img src="./assets/analytics/discovery/Retrieval-And-Ranking-Diagram.png" alt="Diagram of how all experiences are sorted, ranked, and finally displayed on home page." />

Recommended for You is designed to personalize content, connecting users with experiences that foster deep engagement, social interaction, and repeat play.

**Retrieval (stage 1)**: Roblox has millions of experiences, and we need a way to figure out which ones to show to a particular user, personalized to them. Our system selects a subset of experiences that each user might enjoy playing based on signals like engagement, retention, monetization, and friend plays.

Engagement signals from sponsored ads, Today's Picks, search, Charts, friends, teleport, notifications, and other social media sharing can accelerate your consideration for organic distribution. Experiences that have even a small number of people playing can signal to our system that the experience is worth distributing to more users who might find the game enjoyable through Recommended for You.

**Ranking (stage 2)**: The ranking stage takes the input from the retrieval stage and selects the most relevant experiences to be ranked in a personalized way and shown to each user. There is also some exploration besides the relevancy ranking to users. How far your game goes and how much organic distribution it gets depends entirely on the engagement of users who come through Recommended for You.

We do not count the engagement or monetization of users first acquired from ads, friends, Today's Picks, search, social media, or any other source in the ranking stage of Recommended for You.

### Key signals

Roblox ranks the selected experiences based on the following 6 key signals of users acquired from Recommended for You:

<table>
<thead>
  <tr>
    <th>**Metric**</th>
    <th>**Definition**</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Qualified play through rate (qPTR)**</td>
    <td>The number of engaging plays divided by the number of impressions from Recommended for You.</td>
  </tr>
  <tr>
    <td>**7 day playtime per user**</td>
    <td>Total playing time per user in your experience within the last 7 days (maximum of 60 minutes per user, per experience, per day).</td>
  </tr>
  <tr>
    <td>**7 day play days per user**</td>
    <td>Total unique days users have engaged with your experience over the last 7 days.</td>
  </tr>
  <tr>
    <td>**7 day spend days per user**</td>
    <td>Total unique days users have spent Robux in your experience over the last 7 days.</td>
  </tr>
  <tr>
    <td>**7 day Robux spent per user**</td>
    <td>Total Robux spent per user in your experience over the last 7 days.</td>
  </tr>
  <tr>
    <td>**7 day intentional co-play days per user**</td>
    <td>Frequency of users intentionally playing with connections over the last 7 days (through join, invite, or private server rather than through matchmaking).</td>
  </tr>
</tbody>
</table>

When all of these signals improve together in an experience, the recommendation algorithm picks it up. Improving your [retention](./production/analytics/retention.md), [engagement](./production/analytics/engagement.md), and [monetization](./production/analytics/monetization.md) directly enhances our recommendation signals, resulting in better Home visibility.

Roblox's recommendation system uses **explore and expand** phases to understand the 6 key signals. For example, you might see a spike in new users from recommendations (explore) after a content update. If that new user cohort has good engagement and monetization, Roblox is more likely to continue to recommend your experience to those user cohorts (expand).

## Understand your metrics in Creator Analytics

When distribution increases, you settle into a new baseline. As a result of Home Recommendations surfacing your experience to a wider set of users, some of those users might like your experience a lot, but not all of them will be super fans from day one.

You can expect an increase in impressions and plays in the Home Recommendation tab of the Creator Analytics dashboard. As the algorithm explores which users might be best suited for your experience, you might see some fluctuations in the six signals of users acquired from Recommended for You before you settle into a new baseline. This is a result of engagement from users who discover you in the Recommended for You sort only.

The behavior of users you get from ads, Home Recommendations, and other sources can vary. It's natural for your play-through rate, playtime, and retention to differ by source, and for these to change as you and other experiences on Roblox grow.

For example:

- Experience A is established, acquiring an average of 10 thousand daily players on 25 thousand impressions from Home Recommendations.
- By running ads, Experience A acquires an additional 5 thousand daily players from Sponsored sort, from 20 thousand impressions.
- Experience A is now acquiring an average of 15 thousand daily players to their experience. This extends the reach of the experience, while also increasing earning potential.
- As long as the behavior of the 10 thousand daily players from Home Recommendations does not change, the experience will continue to get around the same traffic from Home Recommendations (excluding external factors like seasonality or newly popular experiences).

## Use Home Recommendations analytics to grow your experience

The **Home Recommendations** dashboard helps you monitor these recommendation signals. To access it, go to **Analytics** ⟩ **Acquisition** on the Creator Hub and select the **Home Recommendations** tab.

You can use the Home Recommendation dashboard to:

**1. Analyze your Home Recommendation impressions and plays trends.**

For example, if you notice a dip in Home Recommendation impressions starting on March 3rd, you can analyze the corresponding recommendation signal trends.

<img src="./assets/analytics/discovery/Home-Recommendation-Impressions.png" alt="A graph of users with home recommendation impressions." />

**2. Analyze recommendation signal trends for optimization.**

Keep in mind that changes to your recommendation signals usually show up in impression changes a few days later. So, if you noticed that your qualified play-through rate dipped on February 28th, that is likely what led to the impression drop on March 3rd.

<img src="./assets/analytics/discovery/Qualified-Play-Through-Impressions.png" alt="A graph of qualified play through rate impressions." />

It's also important to identify recommendation signals that are below benchmark as areas of opportunity. Benchmarks **do not** impact the recommendation algorithm, but are meant to provide you with a point of comparison.

Benchmark metrics come from experiences that are shown on the dashboard below these charts. If you believe these experiences might not be the right benchmark for your experience, use the information only as a rough guideline.

In the following charts, the 7 day playtime and 7 day play days are both below benchmark. In this case, you might want to consider improving your [onboarding funnel](./production/analytics/funnel-events.md) to encourage users to visit your experience more often.

<img src="./assets/analytics/discovery/Below-Benchmark-Charts.png" alt="A graph of 7-day playtime per user and 7-day play days per user impressions." />

**3. Discover other experiences your users also enjoy.**

You can find a list of similar experiences based on relevant benchmarks at the bottom of the Home Recommendations page. This list is meant to show you other experiences your users enjoy.

<img src="./assets/analytics/discovery/Similar-Experiences.png" alt="List of similar experiences on the Home Recommendations page." />

<br />
<h5>Frequently asked questions</h5>
<br />
**Do I have to optimize for every recommendation signal in the Recommended for You algorithm?**

While optimizing for all recommendation signals is beneficial, it's most effective to focus on creating a high-quality, engaging experience. Prioritize core gameplay, user retention, and accurate metadata to improve overall user experience. To improve QPTR, focusing on your [thumbnail personalization](./production/publishing/thumbnails.md#thumbnail-personalization-for-the-home-page) strategy is key. This includes showcasing new content or gameplay, keeping multiple variations active, avoiding overly similar thumbnails, and monitoring QPTR over time, especially after surges in Home recommendations.

It's important to note that you may notice a temporary drop in QPTR when your impressions increase, particularly during initial discovery phases. This is a normal occurrence as new users discover your experience, and QPTR should stabilize as traffic patterns normalize.

**Do these recommendation signals favor larger experiences with more players?**

No. These recommendation signals are calculated as averages per user, not total values. This ensures that smaller experiences with highly engaged users are not disadvantaged. We are focused on per user engagement, not total engagement. The Recommended for You algorithm is designed to match users with experiences they are most likely to enjoy. By prioritizing user satisfaction, you'll create experiences that resonate with your audience and foster long-term engagement.

**Why did my daily active users increase or decline?**

If your daily active users increases or declines substantially, consider investigating your [acquisition analytics](./production/analytics/acquisition.md) to understand where new and returning users are coming from by source, such as recommendations, search, sponsored, or others. If plays from recommendations contributed the most to your user change, look at your Home recommendation signal charts to identify major movements.

## Best practices for discovery

Your content must always adhere to our [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards). To increase your reach and help your experience get discovered, make sure to also follow the best practices for discovery:

- **Be accurate.** Avoid using irrelevant keywords in your metadata and follow the [metadata best practices](./production/publishing/publish-experiences-and-places.md#publish-experiences).
- **Build trust.** You should not rely on promotional monetary rewards to drive engagement. Instead, your metadata should reflect what your experience is about.
- **Use unique metadata.** Focus on using original imagery and naming that you or your teammates created to help your experience stand out. Avoid publishing content with repetitive titles and images that have been previously published. When using [thumbnail personalization](./production/publishing/thumbnails.md#thumbnail-personalization-for-the-home-page), make sure all thumbnails accurately reflect your experience.
- **Add your own spin to existing trends** in the title, images, description, and in-experience content when you follow trends. Unique updates add value and differentiate your experience from other experiences following the same trend.

### Issues that limit exposure

The level of exposure your content receives on the homepage and in search is directly influenced by its quality. Certain issues can reduce visibility or prevent your content from being recommended, including:

- **Leading with giveaways**: Metadata that implies any type of monetary reward is not prioritized for recommendations.

  Example: An experience titled "Robux! Play now!" receives less exposure because the title leads with monetary implications instead of in-experience content.

- **Mismatched metadata and content**: Metadata and content that is highly mismatched is not recommended to users and is less visible in search results.

  Example: An experience titled "The Great Dinosaur Quest" that has a thumbnail showing dinosaurs but where the actual gameplay is a generic obstacle course with no dinosaurs or adventure elements.

- **Non-unique experiences**: Experiences with metadata and place files that closely resemble existing experiences on Roblox are no longer prioritized for recommendations and might rank lower in search results.

  Example: An experience with the same title and visuals as a previously published experience.

### Track and improve content quality

Roblox continually reclassifies content quality with every update, giving all experiences the opportunity to improve their reach. To be reassessed and improve your reach, make sure to align your experience with our [best practices](#best-practices-for-discovery).

To check if your experience is affected by quality issues, go to the **Creator Dashboard**. Experiences with reduced exposure display a banner that updates daily and provides the latest status about quality and visibility.

If you come across any issues, go to [Support](https://www.roblox.com/support), select **Bug Report**, and provide the Universe ID of your experience along with a description of your issue.

## Discovery for other surfaces

Home's **Recommended For You** is not the only discovery surface that Roblox offers. Below is a primer on our other surfaces:

## Other Home sorts

Home is a user's personalized view of Roblox. Outside of Recommended for You, Home also includes **Continue Playing**, **Connections List**, **Sponsored**, **Curated Sorts**, and more. For a deeper dive on some of these sections:

- **Curated** (e.g., Today's Picks) has experiences that are hand curated by Roblox and include up-and-coming creations, updated experiences, new genres, and more. Learn more in this [post](https://devforum.roblox.com/t/introducing-today%E2%80%99s-picks-a-new-curated-sort-on-home-pilot/2910867).
- **Live Events** has experiences that are part of a limited time event that you can complete quests for to unlock rewards. You can see past events from Roblox [here](https://www.roblox.com/groups/4111519/Roblox-Presents#!/about).
- **Sponsored** lets you invest directly in getting your experiences discovered by a specific audience segment. For more information, see [Ads Manager](./production/promotion/ads-manager.md#sponsored-experiences).

### Experience details page

The Experience Details Page aims to offer users comprehensive insights about the experience, enhancing their understanding and aiding in decision-making. This, in turn, drives high-intent users to your experiences. You can leverage the Experience Details Page to improve user onboarding and attract returning users by:

- **Maintaining up-to-date events**: Events are crucial for community engagement. Use [Experience Events](#experience-events) to inform users about upcoming events and drive traffic to your experience.
- **Maintaining Roblox Groups and Guilded Channels**: Roblox Groups and Guilded offers the best way for creators to connect with and inform their communities. You can now view [Guilded announcements](https://devforum.roblox.com/t/introducing-announcements-for-roblox-groups/2907426) on Roblox groups, which strengthens community bonds.
- **Increasing Monetization**: Boost revenue by adding [passes](./production/monetization/passes.md) and [subscriptions](./production/monetization/subscriptions.md) for your experience.

The Experience Details Page also provides additional recommendation opportunities by highlighting similar experiences, helping users discover more relevant content.

#### Experience events

**Experience events** are key to keeping a community engaged. These moments are where all your users can come together and engage for unique events and scenarios. [Experience events](./production/promotion/experience-events.md) are a way for you to tell your users about upcoming events within your experience, and for them to opt in and be notified when that event starts. We are continuing to build on that foundation offering deeper event details customization. You can add up to 5 thumbnails to promote your event with users and include a primary event type. This additional metadata will also give you a chance to be featured in **Today's Picks**.

### Search

**Search** aims to be a companion (easy to find and use), concierge (understands user intent, safe and trustworthy to use), and a rescuer (helps when recommendations aren't quite what the user is looking for).

Historically, Search has primarily focused on relevance based on exact search queries and limited metadata such as titles. Roblox is constantly improving Search to better understand user intent. For example, you can now use semantic search for all of our officially supported languages to find experiences through natural language queries, such as "food games" or "avatar editors".

### Discover (top charts and trending sorts)

The [Discover](https://www.roblox.com/discover#/) page is designed to reflect the many constantly changing high-quality experiences available on the platform and showcasing the best-performing content on Roblox.

Roblox is [committed](https://devforum.roblox.com/t/discovery-on-roblox-past-present-and-future-vision/2859111) to enhance the Discover page to better serve our community and provide more opportunities to highlight a diverse set of top recommendations for our users. For example, top and trending sorts have been [updated](https://devforum.roblox.com/t/testing-an-enhanced-discover-page-top-charts-and-new-sorts/2954676) to transform the Discover page into a more impactful and dynamic space that delights users.

### Notifications

**Notifications** elevate timely and actionable information to users. Historically, we have focused on building and scaling social notifications, such as connection requests and invitations. This system allows for creators to engage with users directly while they are away. Milestones, high scores, [connection activity](https://devforum.roblox.com/t/user-mentions-in-experience-notifications/2980675), and other key moments can be delivered to users as personalized notifications to the notification stream. For additional information and implementation instructions, see [experience notifications](./cloud/guides/experience-notifications.md).

You can also use our [in-experience notification permission prompts](https://devforum.roblox.com/t/introducing-in-experience-notification-permission-prompts/2909125) to upsell notification opt-in within experiences. Notifications can help resurrect lapsed users or remind users when they need to take an action.
