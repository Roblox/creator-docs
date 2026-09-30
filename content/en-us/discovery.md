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
    <td rowspan="4" style={{ verticalAlign: 'middle' }}>**Most important**</td>
    <td>**Play through rate**<br/>The rate at which users play your game after seeing it in the Recommended for You sort.</td>
    <td style={{ verticalAlign: 'middle' }}><center>N/A</center></td>
  </tr>
  <tr>
    <td style={{ verticalAlign: 'middle' }}>**First play bounce rate**<br/>The rate at which users leave your game after a short play session. **<u>This is a negative signal</u>**, high bounce rates suggest players aren't finding enough to stay engaged early in their session. </td>
    <td><ul><li>< 60 seconds average rate</li><li>61-180 seconds average rate</li></ul></td>
  </tr>
  <tr>
    <td>**Play days per user**<br/>The average number of unique days users engage with your game.</td>
    <td rowspan="6" style={{ verticalAlign: 'middle' }}><ul><li>Day 8-28 average</li><li>Day 2-7 average</li><li>Day 1 average</li></ul></td>
  </tr>
  <tr>
    <td>**Playtime per user**<br/>The average amount of time users spend in your game. There is a maximum of 60 minutes per user, per game, per day.</td>
  </tr>
  <tr>
    <td rowspan="4" style={{ verticalAlign: 'middle' }}>**Important**</td>
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

**3. Understand signals compared to other games your users also play.**

It's also important to identify recommendation signals that are below benchmark as areas of opportunity.

Benchmark metrics are based on a set of similar games shown at the bottom of your analytics page. If you believe these games might not be the right benchmark for your game, use the information only as a rough guideline and focus on improving your game's Home recommendation signals.  

Keep in mind that benchmarks and benchmark games do not impact the Recommended for You algorithm in any way. They are meant to only provide you with a point of comparison and help you identify signals that are low as areas of opportunity on the Home Recommendations dashboard.

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
<Typography variant='buttonLarge'>Do these recommendation signals favor larger games with more players?</Typography>
</AccordionSummary>
<AccordionDetails>
No. These recommendation signals are calculated as averages per user, not total values. This ensures that smaller games with highly engaged users are not disadvantaged. Roblox is focused on per user engagement, not total engagement. The Recommended for You algorithm is designed to match users with games they are most likely to enjoy. By prioritizing user satisfaction, you'll create games that resonate with your audience and foster long-term engagement.
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

- **Be accurate** - Avoid using irrelevant keywords in your metadata and follow the [metadata best practices](./production/publishing/publish-games-and-places.md#publish-games).
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

You can also use [in-game notification permission prompts](https://devforum.roblox.com/t/introducing-in-experience-notification-permission-prompts/2909125) to upsell notification opt-in within games. Notifications can help resurrect lapsed users or remind users when they need to take an action.

## Frequently asked questions

We've collected answers to some of the most frequently asked questions about Discovery and the Recommended for You (RFY) algorithm.

### Algorithm questions

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>What signals are the most important for Discovery?</Typography>
</AccordionSummary>
<AccordionDetails>
Discovery's goal is to help connect users with games that create lasting value. We break this value down into two components: long-term retention and long-term monetization. This means we care about whether users keep coming back over time, and whether they find enough value to spend over time.

As part of our continuing commitment to transparency, we share the [key signals](#key-signals) and their relative priority for the Recommended for You (RFY) algorithm. Each signal is based on users who organically joined from the RFY sort on Home. The most important signals are:

- Play through rate (PTR)
- First play bounce rate
- Play days per user
- Playtime per user

Other signals are also important to your RFY ranking including:

- Intentional co-play days per user
- Qualified play sessions per user
- Spend days per user
- Robux spent per user

There is no single signal that determines ranking. RFY uses many signals that work together, each carrying a different amount of influence on where your game ranks. Every signal reflects user behavior after they discover your game.

For your specific game, visit **Creator Analytics** > **Overview**, and **Creator Analytics** > **Acquisition** > **Home Recommendations** to see where your game is strong and where to focus next.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>Do I have to optimize for every recommendation signal in the RFY algorithm?</Typography>
</AccordionSummary>
<AccordionDetails>
While optimizing for all recommendation signals is beneficial, it's most effective to focus on creating a high-quality, engaging game. Prioritize core gameplay, user retention, and accurate metadata to improve overall user experience. If retention is low, focus on core gameplay first. Once retention is strong, improving monetization can help you increase your Home impressions.

It's important to note that you may notice a temporary drop in play through rate when your impressions increase, particularly during initial discovery phases. This is a normal occurrence as new users discover your game, and your play through rate should stabilize as traffic patterns normalize.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>What factors influence Home recommendation impressions?</Typography>
</AccordionSummary>
<AccordionDetails>
There are 4 factors that impact how many Home recommendation impressions each game gets:

1. What you do, such as updates to your game or changes to gameplay, influences signals of Home recommendations.
2. What Roblox does or how the Discovery algorithm changes.
3. Total users or people visiting the Home page. There are many forms of seasonality, such as:
   - Weekly seasonality which usually peaks on a Saturday and lowers during weekdays
   - Summer/back to school seasonality
   - Holiday seasonality
4. If other games are significantly more successful at engaging players, your game's distribution may decrease, even if your own engagement signals remain steady.

For example, you update your game and drive your signals up 50%. However, competitors of your game also make updates and improve their signals more than 50%. This may result in seeing minimal growth in impressions.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>Why did my daily active users increase or decline?</Typography>
</AccordionSummary>
<AccordionDetails>
If your daily active users increase or decline substantially, consider investigating your [acquisition analytics](./production/analytics/acquisition.md) to understand where new and returning users are coming from by source, such as recommendations, search, sponsored ads, or others. If plays from recommendations contributed the most to your user change, look at your Home recommendation signal charts to identify major movements.

Other factors can also impact how many Home recommendation impressions each game gets:

- What you do, such as updates to your game or changes to gameplay, influences signals of Home recommendations.
- What Roblox does or how the Discovery algorithm changes.
- Total users or people visiting the Home page.
- If other games are significantly more successful at engaging players, your game's distribution may decrease, even if your own engagement signals remain steady.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>My game is only strong on retention or monetization. Will I still receive Home recommendation impressions?</Typography>
</AccordionSummary>
<AccordionDetails>
Yes. Games that are strong in only one area, either retention or monetization, will continue to receive Home recommendation impressions.

However, games that perform well in both retention and monetization may receive broader distribution. As a result, games that are strong in only one area may see some changes to their Home recommendation distribution.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>Do PTR and first play bounce rate measure only new users acquired through Home recommendations, or do they also include returning users?</Typography>
</AccordionSummary>
<AccordionDetails>
PTR and first play bounce only measure users acquired organically from Home recommendations in their first session. RFY is a lever for surfacing new games to users. Returning-user traffic comes through other sorts such as Continue, and does not count towards your RFY impressions.

However, longer-horizon metrics such as Day 2–7 and Day 8–28 measure the subsequent behavior of users who were initially acquired through RFY. Those users may return to the game through other surfaces, including the Continue sort, and that later engagement is reflected in the longer-term metrics.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>How is Day 2-7 calculated for playtime and play days?</Typography>
</AccordionSummary>
<AccordionDetails>
Both are calculated by the average across all users who came to your game through RFY. More specifically:

- **Playtime**: Total playtime across those users divided by the number of users.
- **Play days**: Out of the 6 days in the 2–7 window, how many days on average did those users play (for example, 4 days, 3 days, etc.).

The two metrics capture different things: frequency (play days) and depth of engagement (playtime).
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>How does the system decide whether to give a game more impressions after its initial test?</Typography>
</AccordionSummary>
<AccordionDetails>
There is no penalty for games that did not perform well at first. The signals use a moving window. If your game underperforms initially, you can fix onboarding or mechanics, and the algorithm will continue testing your game with new users on an ongoing basis. If those users don't retain, the algorithm recalibrates and tries showing the game to different users.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>Do these recommendation signals favor larger games with more players?</Typography>
</AccordionSummary>
<AccordionDetails>
No. These recommendation signals are calculated as averages per user, not total values. This ensures that smaller games with highly engaged users are not disadvantaged. Roblox is focused on per user engagement, not total engagement. The RFY algorithm is designed to match users with games they are most likely to enjoy. By prioritizing user satisfaction, you'll create games that resonate with your audience and foster long-term engagement.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>Is it possible for an old game to start growing again?</Typography>
</AccordionSummary>
<AccordionDetails>
Yes. The retrieval stage requires only a very low minimum number of plays from any source. Once those plays come in, the ranking stage tests the game with a small set of users and continuously monitors retention. The algorithm tests your game daily, and if it sees improving performance, it increases impressions.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>Are the Day 1, Day 2-7, and Day 8-28 charts considered separately or combined for the algorithm?</Typography>
</AccordionSummary>
<AccordionDetails>
They're considered both separately and combined together to decide impression volume. It's very unlikely a game has a strong Day 8–28 signal if Day 1 and Day 2–7 are poor. Focus individually first, especially playthrough rate, bounce rate, playtime, and play days, and then look at them collectively.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>Some genres of games have lower Day 8-28 retention. Will they be penalized?</Typography>
</AccordionSummary>
<AccordionDetails>
Story-driven and finite games are not penalized simply because their genre tends to have lower long-term retention. Roblox wants all kinds of games to be successful on the platform. The algorithm personalizes to each user's preferences: some users want casual games, some want deep RPGs, and even the same user may want different games at different times.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>Does the algorithm compare games by genre or gameplay type?</Typography>
</AccordionSummary>
<AccordionDetails>
Genre and gameplay type are not explicit ranking factors. The algorithm learns implicitly through user behavior. For example, it figures out that users who like shooter games tend to retain on other shooter games, without being told the genre. Changing your genre tag does not change the underlying behavioral signals the algorithm uses.

You should use accurate genre and category tags because users read them before deciding to play. Inaccurate descriptions lead to bounces, which hurts your signals. An accurate gameplay video on your game details page also helps set the right expectations.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>How do benchmark games impact RFY and Home recommendations?</Typography>
</AccordionSummary>
<AccordionDetails>
Benchmarks and benchmark games do not impact the recommendation algorithm. They are meant to provide you with a point of comparison on the Creator Analytics dashboard. Benchmarks help you to identify signals that are low as areas of opportunity.

As your game scale changes, you should expect your benchmark group to change as well.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>Of the millions of games retrieved, how large is the pre-ranking list?</Typography>
</AccordionSummary>
<AccordionDetails>
The pre-ranking list is per individual user. The algorithm starts with all eligible games and narrows down to roughly 100 games shown on a user's Home page, with each stage personalizing by value to that specific user. The system also continuously explores by trying to introduce new games to new users and evaluate performance from there.
</AccordionDetails>
</BaseAccordion>

### New games questions

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>How are new games evaluated by the algorithm? Will it take 28 days until Home recommendation signals are available?</Typography>
</AccordionSummary>
<AccordionDetails>
No. New games do not have to wait 28 days before Home can recommend them. Signals are broken into stages:

- Playthrough rate and bounce rate capture the first session
- Then Day 1 signals (playtime, play days, Robux spend, co-play)
- Then Day 2–7
- Then Day 8–28

Early signals kick in immediately. As more data accumulates, the algorithm gets more accurate about who the best users are for your game, leading to even greater distribution over time — it doesn't hurt you early on.
</AccordionDetails>
</BaseAccordion>

### Ads questions

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>Are my games competing with sponsored games in RFY?</Typography>
</AccordionSummary>
<AccordionDetails>
No. Your RFY ranking is separate from sponsored games, and ads do not penalize your RFY ranking. Sponsored games are served through the ads system and not ranked as RFY candidates.

Engagement, retention, and monetization from users acquired through ads are excluded from RFY ranking signals. RFY depends on the organic engagement of users who discover your game through Home Recommendations.

However, sponsored games can still compete for Home surface space. Sponsored games are blended throughout RFY and are clearly labeled.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>How are users that are originally acquired through ads treated when they subsequently return through Home recommendations?</Typography>
</AccordionSummary>
<AccordionDetails>
For a user whose first play came from an ad:

- Roblox treats them as already acquired, so the game generally will not be shown to that user again in RFY. It can instead appear in other sorts like Continue.
- Their later play, retention, and spend do not become RFY ranking signals, even if they return through Home. RFY signals are based on users organically acquired through Home Recommendations.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>After running an ad, why did my Home recommendation impressions drop?</Typography>
</AccordionSummary>
<AccordionDetails>
RFY is the organic distribution of your game and depends entirely on the engagement of users who discover your game through Home Recommendations.

When a user is acquired through an ad, Roblox considers that user already acquired. This means the user acquired through an ad will generally not subsequently see your game in RFY. This can mean RFY impressions dip even while total acquisition increases. Ads attract incremental new users to your game and increase retention of your existing users to drive incremental engagement and revenue outcomes above Home Recommendations.

A drop in RFY impressions after advertising is not an ad penalty. Seasonality, platform-wide demand, stronger competing games, and ranking-signal changes can also affect impressions.
</AccordionDetails>
</BaseAccordion>

### General questions

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>Does Roblox ever reduce a game's reach?</Typography>
</AccordionSummary>
<AccordionDetails>
There is no hidden penalty for reducing a game's reach. However, Roblox can limit a game's reach through documented reduced-exposure or discoverability restrictions.

Possible reasons for reduced exposure can be:

- Leading with giveaways
- Misleading or mismatched metadata and content
- Non-unique games
- Violating safety policies, moderation, or community standards
- Impressions can fall because of normal ranking fluctuations such as algorithm changes, seasonality, platform demand, or other games performing better

To check if your game is affected by quality issues, go to the **Creator Dashboard**. Games with reduced exposure display a banner that updates daily and provides the latest status about quality and visibility. You can also check your eligibility status to publish public games in your account settings.

If you come across any issues, go to [Support](https://www.roblox.com/support), select **Bug Report**, and provide the Universe ID of your game along with a description of your issue.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>Why do I see low quality games ranked high on my Home page?</Typography>
</AccordionSummary>
<AccordionDetails>
The team is constantly working on improving user experience by reducing exposure of low quality content. Proactive moderation is ongoing, but it is possible for low quality games to experience short-lived spikes in visibility before enforcement catches up. A notice is given in Creator Analytics for games that are given a low quality status rating with steps to help improve your game content.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>How does Roblox identify low quality games that should have reduced visibility?</Typography>
</AccordionSummary>
<AccordionDetails>
Roblox prioritizes multiple objective measures via models and human reviews and reduces the visibility of games that don't adhere to the outlined [best practices](#best-practices-for-discovery). This approach helps ensure a level playing field where high-quality content isn't competing with noise.

If you see a message on your Creator Dashboard, you can always change your discoverability status by following the [best practices](#best-practices-for-discovery). If you encounter any issues, please submit a [bug report](https://www.roblox.com/support).
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>How do I know if my thumbnail or title is too similar and will face reduced discoverability?</Typography>
</AccordionSummary>
<AccordionDetails>
If you're unsure whether your game is affected by quality issues, visit your **Creator Dashboard**. A banner will display if your game has reduced exposure. This banner updates daily, providing the latest status of your game's quality and visibility.

A handy rule of thumb is to consider this from a user's perspective: if you, as a user, search for a game and are inundated with multiple options that have the same visuals and titles, making them virtually indistinguishable, it's neither a good experience for you nor fair to the creator who originally built a quality game. Games like that will have reduced discoverability.

Additionally, your game must always adhere to Roblox's [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards). We also recommend checking [discovery best practices](#best-practices-for-discovery) and [thumbnail best practices](./production/publishing/thumbnails.md) to help your game get discovered.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>Can I reuse my own thumbnails or will that impact my game's discoverability?</Typography>
</AccordionSummary>
<AccordionDetails>
Yes, you can switch back and forth between old and new icons and thumbnails within your game or games from the same network of groups and accounts. Your discoverability will not be impacted negatively.
</AccordionDetails>
</BaseAccordion>
