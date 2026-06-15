---
title: Discovery
comment: Changes to this article require additional review
description: Explains how players discover games on the Roblox platform.
---

Roblox's [mission](https://devforum.roblox.com/t/discovery-on-roblox-past-present-and-future-vision/2859111) for discovery is to connect every player with the best games and communities that meet their interests. This guide outlines how discovery works and how you can help your games get discovered.

## How recommendation works

Roblox has millions of games and needs a way to figure out which ones to show to a particular user that are personalized to them. On [Home](https://www.roblox.com/home), the **Recommended for You** sort personalizes content and connects users with games that foster deep engagement, social interaction, and repeat play.

The Recommended for You algorithm decides what games to show each user in two stages:

<img src="./assets/analytics/discovery/Retrieval-And-Ranking-Diagram.png" alt="Diagram of how all games are sorted, ranked, and finally displayed on home page." />

<table>
<thead>
 <tr>
   <th width="50%">**Stage 1: Retrieval**</th>
   <th width="50%">**Stage 2: Ranking**</th>
 </tr>
</thead>
<tbody>
 <tr>
   <td width="50%">In the Retrieval stage, the algorithm selects a subset of games that each user might enjoy playing based on key signals like engagement, retention, and monetization.</td>
   <td width="50%">In the Ranking stage, the algorithm takes the input from the Retrieval stage and selects the most relevant games to be ranked in a personalized way and shown to each user.</td>
 </tr>
 <tr>
   <td width="50%">Signals from sponsored ads, curation, search, charts, friends, teleport, notifications, curated games, and other social media sharing can accelerate your consideration for organic discovery from Recommended for You. Games that have even a small number of people playing can signal to the system that the game is worth considering for distribution to more users who might find the game enjoyable through Recommended for You.</td>
   <td width="50%">How far your game goes and how much organic distribution it gets from Recommended For You depends entirely on the engagement and retention of users who come to your game through Recommended for You. Roblox doesn't count the engagement, monetization, or retention of users first acquired from ads, curation, friends, search, social media, or any other source in the ranking stage of Recommended for You.</td>
 </tr>
</tbody>
</table>

There are 4 factors that impact how many home recommendation impressions each game gets:

1. What you do, such as updates to your game or changes to gameplay, influences signals of home recommendations.
1. What Roblox does or how the Discovery algorithm changes.
1. Total users or people visiting the Home page. There are many forms of seasonality, such as:

   - Weekly seasonality which usually peaks on a Saturday and lowers during weekdays
   - Summer/back to school seasonality
   - Holiday seasonality

1. If other games are significantly more successful at engaging players, your game's distribution may decrease, even if your own engagement signals remain steady.

### Key signals

Roblox ranks games in the Recommended for You sort using many signals that work together, each carrying a different amount of influence on where your game ranks. Every signal reflects user behavior after they discover your game.

As the recommendation system evolves, Roblox will continue to add and remove signals while also adjusting their influence. These changes work toward a consistent goal: a recommendation system that promotes games with strong long term retention.

<table>
<thead>
  <tr>
    <th>**Priority**</th>
    <th>**Signals**</th>
    <th width="20%">**Time segments**</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td rowspan="4" valign="middle">**Most important**</td>
    <td>**Play through rate**<br/>The rate at which users play your game after seeing it in the Recommended for You sort.</td>
    <td valign="middle"><center>N/A</center></td>
  </tr>
  <tr>
    <td valign="middle">**First play bounce rate**<br/>The rate at which users leave your game after a short play session. **<u>This is a negative signal</u>**, high bounce rates suggest players aren't finding enough to stay engaged early in their session. </td>
    <td><ul><li>< 60 seconds average rate</li><li>61-180 seconds average rate</li></ul></td>
  </tr>
  <tr>
    <td>**Play days per user**<br/>The average number of unique days users engage with your game.</td>
    <td rowspan="6" valign="middle"><ul><li>Day 8-28 average</li><li>Day 2-7 average</li><li>Day 1 average</li></ul></td>
  </tr>
  <tr>
    <td>**Playtime per user**<br/>The average amount of time users spend in your game. There is a maximum of 60 minutes per user, per game, per day.</td>
  </tr>
  <tr>
    <td rowspan="4" valign="middle">**Important**</td>
    <td>**Intentional co-play days per user**<br/>The average number of unique days that users come back to play your game with friends, including co-play days through join, invites, or private servers.</td>
  </tr>
  <tr>
    <td>**Qualified play sessions per user**<br/>The average number of qualified play sessions per user who clicked and played your game through recommendations on the [Home](https://www.roblox.com/home) page. A "qualified play" refers to a user's meaningful play session with your game, and it filters out accidental clicks or quick bounces.</td>
  </tr>
  <tr>
    <td>**Spend days per user**<br/>The average number of unique days users spend Robux in your game.</td>
  </tr>
  <tr>
    <td>**Robux spent per user**<br/>The average amount of Robux users spend in your game.</td>
  </tr>
  </tbody>
</table>

_Each signal is based on users who **<u>_organically_</u>** joined from the Recommended for You sort on Home. Here is a 2 min [overview video](https://www.youtube.com/watch?v=K7jsk3bzmvE) of the overall algorithm._

Improving your [retention](./production/analytics/retention.md), [engagement](./production/analytics/engagement.md), and [monetization](./production/analytics/monetization.md) directly enhances Roblox's recommendation signals, resulting in better visibility on the Home page.

Roblox's recommendation system uses **explore and expand** phases to understand the key signals. For example, you might see a spike in new users from recommendations (explore) after a content update. If that new user cohort has good engagement and monetization, Roblox is more likely to continue to recommend your game to more such user cohorts (expand).

## Understand your metrics in Creator Analytics

When distribution increases, you settle into a new baseline. As a result of recommendations on the Home page surfacing your game to a wider set of users, some of those users might like your game a lot, but not all of them will be super fans from day one.

You can expect an increase in impressions and plays in the **Home Recommendation** tab of the Creator Analytics dashboard. As the Recommended for You algorithm explores which users might be best suited for your game, you might see some fluctuations in the signals of users acquired from Recommended for You before you settle into a new baseline. This is a result of engagement from users who discover you in the Recommended for You sort only.

<img src="./assets/analytics/discovery/Home-Recommendations-Tab.png" alt="" width="40%" />

The behavior of users you get from ads, recommendations on the Home page, and other sources can vary. It's natural for your play through rate, playtime, and retention to differ by source, and for these to change as you and other games on Roblox grow.

For example:

- Game A is established, acquiring an average of 10 thousand daily players on 25 thousand impressions from recommendations on the Home page.
- By running ads, Game A acquires an additional 5 thousand daily players from Sponsored sort, from 20 thousand impressions.
- Game A is now acquiring an average of 15 thousand daily players to their game. This extends the reach of the game, while also increasing earning potential.
- As long as the behavior of the 10 thousand daily players from Home Recommendations does not change, the game will continue to get around the same traffic from recommendations on the Home page, excluding external factors like seasonality or newly popular games.

## Use Home Recommendations analytics to grow your game

The **Home Recommendations** dashboard helps you monitor these recommendation signals. To access it, go to **Analytics** ⟩ **Acquisition** on the Creator Hub and select the **Home Recommendations** tab.

<img src="./assets/analytics/discovery/Home-Recommendation-Signals.png" alt="" width="100%" />

You can use the Home Recommendation dashboard to:

**1. Analyze your Home Recommendation impressions and plays trends.**

For example, if you notice a dip in Home Recommendation impressions starting on February 5th, you can analyze the corresponding recommendation signal trends.

<img src="./assets/analytics/discovery/UseHome-1.png" alt="" width="100%" />

**2. Analyze recommendation signal trends for optimization.**

Start with the most important signals and understand how the signals changed. Typically, impression drop follows drop in play through rate, play days per user, and playtime per user, and increase in first play bounce rate. These are the most important signals. Consider different time periods of D8-D28, D2-D7 and D1 for play days per user and playtime per user, and these signals are shown in different charts on the Creator Analytics dashboard.

<img src="./assets/analytics/discovery/UseHome-2a.png" alt="" width="100%" />

If your most important signals are stable, then focus on the next set of signals to identify potential changes, such as intentional co-play days, qualified play sessions, spend days, and robux spend in the D8-D28, D2-D7 and D1 time periods.

<img src="./assets/analytics/discovery/UseHome-2b.png" alt="" width="100%" />

In the example above, there is a drop across D2-7, and D8-28 metrics, while D1 continues to be stable. This shows potential issues for impression change.

**3. Understand signals compared to other experiences your users also play.**

It's also important to identify recommendation signals that are below benchmark as areas of opportunity.

Benchmark metrics are based on a set of similar experiences shown at the bottom of your analytics page.  If you believe these experiences might not be the right benchmark for your experience, use the information only as a rough guideline and focus on improving your game's Home recommendation signals.  

Keep in mind that benchmarks and benchmark experiences do not impact the Recommended for You algorithm in any way. They are meant to only provide you with a point of comparison and help you identify signals that are low as areas of opportunity on the Home Recommendations dashboard.

<img src="./assets/analytics/discovery/Similar-Experiences.png" alt="List of similar games on the Home Recommendations page." />

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>Do I have to optimize for every recommendation signal in the Recommended for You algorithm?</Typography>
</AccordionSummary>
<AccordionDetails>
While optimizing for all recommendation signals is beneficial, it's most effective to focus on creating a high-quality, engaging game. Prioritize core gameplay, user retention, and accurate metadata to improve overall user experience.

It's important to note that you may notice a temporary drop in play through rate when your impressions increase, particularly during initial discovery phases. This is a normal occurrence as new users discover your game, and your play through rate should stabilize as traffic patterns normalize.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>Do these recommendation signals favor larger experiences with more players?</Typography>
</AccordionSummary>
<AccordionDetails>
No. These recommendation signals are calculated as averages per user, not total values. This ensures that smaller experiences with highly engaged users are not disadvantaged. Roblox is focused on per user engagement, not total engagement. The Recommended for You algorithm is designed to match users with experiences they are most likely to enjoy. By prioritizing user satisfaction, you'll create experiences that resonate with your audience and foster long-term engagement.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>Why did my daily active users increase or decline?</Typography>
</AccordionSummary>
<AccordionDetails>
If your daily active users increase or decline substantially, consider investigating your [acquisition analytics](./production/analytics/acquisition.md) to understand where new and returning users are coming from by source, such as recommendations, search, sponsored ads, or others. If plays from recommendations contributed the most to your user change, look at your Home recommendation signal charts to identify major movements.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>How do benchmark games impact discovery algorithms and home recommendations?</Typography>
</AccordionSummary>
<AccordionDetails>
Benchmarks and benchmark games do not impact the Recommended for You algorithm in any way. They are meant to provide you with a point of comparison and help you identify signals that are low as areas of opportunity on the Home Recommendations dashboard.
</AccordionDetails>
</BaseAccordion>

## Best practices for discovery

Your content must always adhere to Roblox's [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards). To increase your reach and help your game get discovered, make sure to also follow the best practices for discovery:

- **Be accurate** - Avoid using irrelevant keywords in your metadata and follow the [metadata best practices](./production/publishing/publish-experiences-and-places.md#publish-experiences).
- **Build trust** - You should not rely on promotional monetary rewards to drive engagement. Instead, your metadata should reflect what your game is about.
- **Use unique metadata** - Focus on using original imagery and naming that you or your teammates created to help your game stand out. Avoid publishing content with repetitive titles and images that have been previously published. When using [thumbnail personalization](./production/publishing/thumbnails.md#thumbnail-personalization-for-the-home-page), make sure all thumbnails accurately reflect your game.
- **Add your own spin to existing trends in the title, images, description, and in-game content** - When you follow trends, unique updates add value and differentiate your game from other games following the same trend.

### Issues that limit exposure

The level of exposure your content receives on the homepage and in search is directly influenced by its quality. Certain issues can reduce visibility or prevent your content from being recommended, including:

- **Leading with giveaways** - Metadata that implies any type of monetary reward is not prioritized for recommendations.

  Example: A game titled "Robux! Play now!" receives less exposure because the title leads with monetary implications instead of in-game content.

- **Mismatched metadata and content** - Metadata and content that is highly mismatched is not recommended to users and is less visible in search results.

  Example: A game titled "The Great Dinosaur Quest" that has a thumbnail showing dinosaurs but where the actual gameplay is a generic obstacle course with no dinosaurs or adventure elements.

- **Non-unique games** - Games with metadata and place files that closely resemble existing games on Roblox are no longer prioritized for recommendations and might rank lower in search results.

  Example: A game with the same title and visuals as a previously published game.

### Track and improve content quality

Roblox continually reclassifies content quality with every update, giving all games the opportunity to improve their reach. To be reassessed and improve your reach, make sure to align your game with [best practices](#best-practices-for-discovery) for discovery.

To check if your game is affected by quality issues, go to the **Creator Dashboard**. Games with reduced exposure display a banner that updates daily and provides the latest status about quality and visibility.

If you come across any issues, go to [Support](https://www.roblox.com/support), select **Bug Report**, and provide the Universe ID of your game along with a description of your issue.

## Discovery for other surfaces

Home's **Recommended For You** is not the only discovery surface that Roblox offers. Below is a primer on our other surfaces:

## Other Home sorts

Home is a user's personalized view of Roblox. Outside of the Recommended for You sort, Home also includes **Continue Playing**, **Friends List**, **Sponsored**, **Curated Sorts**, and more. For a deeper dive on some of these sections:

- **Standout Games** has novel games that are hand curated by Roblox that often include unique and in-depth gameplay mechanics, distinctive visual styles, or are in an underrepresented genre on the platform. For more information, see [Standout Games](./creator-programs/standout-games.md).
- **Live Events** has games that are part of a limited time event that you can complete quests for to unlock rewards. You can see past events from Roblox [here](https://www.roblox.com/groups/4111519/Roblox-Presents#!/about).
- **Sponsored** lets you invest directly in getting your games discovered by a specific audience segment. For more information, see [Ads Manager](./production/promotion/ads-manager.md#sponsored-experiences).

### Game details page

The Game Details Page aims to offer users comprehensive insights about the game, enhancing their understanding and aiding in decision-making. This, in turn, drives high-intent users to your games. You can leverage the Game Details Page to improve user onboarding and attract returning users by:

- **Maintaining up-to-date events**: Events are crucial for community engagement. Use [Experience Events](#experience-events) to inform users about upcoming events and drive traffic to your game.
- **Maintaining Roblox Groups**: Roblox Groups offer the best way for creators to connect with and inform their communities.
- **Increasing Monetization**: Boost revenue by adding [passes](./production/monetization/passes.md) and [subscriptions](./production/monetization/subscriptions.md) for your game.

The Game Details Page also provides additional recommendation opportunities by highlighting similar games, helping users discover more relevant content.

#### Experience events

**Experience events** are key to keeping a community engaged. These moments are where all your users can come together and engage for unique events and scenarios. [Experience events](./production/promotion/experience-events.md) are a way for you to tell your users about upcoming events within your game, and for them to opt in and be notified when that event starts. Roblox is continuing to build on that foundation by offering deeper event details customization. You can add up to 5 thumbnails to promote your event with users and include a primary event type.

### Search

**Search** aims to be a companion (easy to find and use), concierge (understands user intent, safe and trustworthy to use), and a rescuer (helps when recommendations aren't quite what the user is looking for).

Historically, search has primarily focused on relevance based on exact search queries and limited metadata such as titles. Roblox is constantly improving search to better understand user intent. For example, you can now use semantic search for all of our officially supported languages to find games through natural language queries, such as "food games" or "avatar editors".

### Discover (top charts and trending sorts)

The [Discover](https://www.roblox.com/discover#/) page is designed to reflect the many constantly changing high-quality games available on the platform and showcasing the best-performing content on Roblox.

Roblox is [committed](https://devforum.roblox.com/t/discovery-on-roblox-past-present-and-future-vision/2859111) to enhance the Discover page to better serve Roblox's community and provide more opportunities to highlight a diverse set of top recommendations for every user. For example, top and trending sorts have been [updated](https://devforum.roblox.com/t/testing-an-enhanced-discover-page-top-charts-and-new-sorts/2954676) to transform the Discover page into a more impactful and dynamic space that delights users.

### Notifications

**Notifications** elevate timely and actionable information to users. Historically, Roblox has focused on building and scaling social notifications, such as friend requests and invitations. This system allows for creators to engage with users directly while they are away. Milestones, high scores, [friend activity](https://devforum.roblox.com/t/user-mentions-in-experience-notifications/2980675), and other key moments can be delivered to users as personalized notifications to the notification stream. For additional information and implementation instructions, see [experience notifications](./cloud/guides/experience-notifications.md).

You can also use [in-experience notification permission prompts](https://devforum.roblox.com/t/introducing-in-experience-notification-permission-prompts/2909125) to upsell notification opt-in within games. Notifications can help resurrect lapsed users or remind users when they need to take an action.
