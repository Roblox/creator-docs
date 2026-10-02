---
title: Discovery FAQ
comment: Changes to this article require additional review
description: Answers to frequently asked questions about Discovery and the Recommended for You algorithm.
---

We've collected answers to some of the most frequently asked questions about Discovery and the Recommended for You (RFY) algorithm. For an overview of how discovery works, see [Discovery](./discovery.md).

## Algorithm questions

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>What signals are the most important for Discovery?</Typography>
</AccordionSummary>
<AccordionDetails>
[Discovery](./discovery.md)'s goal is to help connect users with games that create lasting value. We break this value down into two components: long-term retention and long-term monetization. This means we care about whether users keep coming back over time, and whether they find enough value to spend over time.

As part of our continuing commitment to transparency, we share the [key signals](./discovery.md#key-signals) and their relative priority for the Recommended for You (RFY) algorithm. Each signal is based on users who organically joined from the RFY sort on Home. The most important signals are:

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

It's important to note that you might notice a temporary drop in play through rate when your impressions increase, particularly during initial discovery phases. This is a normal occurrence as new users discover your game, and your play through rate should stabilize as traffic patterns normalize.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>What factors influence Home recommendation impressions?</Typography>
</AccordionSummary>
<AccordionDetails>
There are [4 factors](./discovery.md#how-recommendation-works) that impact how many Home recommendation impressions each game gets:

1. What you do, such as updates to your game or changes to gameplay, influences signals of Home recommendations.
2. What Roblox does or how the Discovery algorithm changes.
3. Total users or people visiting the Home page. There are many forms of seasonality, such as:
   - Weekly seasonality which usually peaks on a Saturday and lowers during weekdays
   - Summer/back to school seasonality
   - Holiday seasonality
4. If other games are significantly more successful at engaging players, your game's distribution might decrease, even if your own engagement signals remain steady.

For example, you update your game and drive your signals up 50%. However, competitors of your game also make updates and improve their signals more than 50%. This might result in seeing minimal growth in impressions.
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
- If other games are significantly more successful at engaging players, your game's distribution might decrease, even if your own engagement signals remain steady.

</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>My game is only strong on retention or monetization. Will I still receive Home recommendation impressions?</Typography>
</AccordionSummary>
<AccordionDetails>
Yes. Games that are strong in only one area, either [retention](./production/analytics/retention.md) or [monetization](./production/analytics/monetization.md), will continue to receive Home recommendation impressions.

However, games that perform well in both retention and monetization might receive broader distribution. As a result, games that are strong in only one area might see some changes to their Home recommendation distribution.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>Do PTR and first play bounce rate measure only new users acquired through Home recommendations, or do they also include returning users?</Typography>
</AccordionSummary>
<AccordionDetails>
PTR and first play bounce only measure users acquired organically from Home recommendations in their first session. RFY is a lever for surfacing new games to users. Returning-user traffic comes through other sorts such as Continue, and does not count towards your RFY impressions.

However, longer-horizon metrics such as Day 2–7 and Day 8–28 measure the subsequent behavior of users who were initially acquired through RFY. Those users might return to the game through other surfaces, including the Continue sort, and that later engagement is reflected in the longer-term metrics.
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
No. Today, these recommendation signals are calculated as averages per user, not total values. This ensures that smaller games with highly engaged users are not disadvantaged. Roblox is focused on per user engagement, not total engagement. The RFY algorithm is designed to match users with games they are most likely to enjoy. By prioritizing user satisfaction, you'll create games that resonate with your audience and foster long-term engagement.
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
<Typography variant='buttonLarge'>There are three different charts (Day 1, Day 2-7, Day 8-28) for each metric. Are they considered separately or combined for the algorithm? Is the breakdown just to help developers understand where to improve?</Typography>
</AccordionSummary>
<AccordionDetails>
They're considered both separately and combined together to decide impression volume. It's very unlikely a game has a strong Day 8–28 signal if Day 1 and Day 2–7 are poor. Focus individually first, especially playthrough rate, bounce rate, playtime, and play days, and then look at them collectively.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>Some genres of games have a lower Day 8-28 retention. Will they be penalized?</Typography>
</AccordionSummary>
<AccordionDetails>
Story-driven and finite games are not penalized simply because their genre tends to have lower long-term retention. Roblox wants all kinds of games to be successful on the platform. The algorithm personalizes to each user's preferences: some users want casual games, some want deep RPGs, and even the same user might want different games at different times.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>Does the algorithm compare games by genre or gameplay type, or do all games compete against the same signals and benchmarks?</Typography>
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
Benchmarks and benchmark games do not impact the recommendation algorithm. They are meant to provide you with a point of comparison on the [Creator Analytics dashboard](https://create.roblox.com/dashboard). Benchmarks help you to identify signals that are low as areas of opportunity.

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

## New games questions

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>How are new games going to be evaluated by the algorithm? Will it take 28 days until Home recommendation signals are available?</Typography>
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

## Ads questions

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>Do ads hurt my RFY ranking?</Typography>
</AccordionSummary>
<AccordionDetails>
No. Today, your RFY ranking is separate from ads, and sponsored tiles are served through the ads system and not ranked as RFY candidates.

Engagement, retention, and monetization from users acquired through ads are excluded from RFY ranking signals. RFY depends on the organic engagement of users who discover your game through Home Recommendations.

However, sponsored games can still compete for Home surface space. Sponsored games are blended throughout RFY and are clearly labeled.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>How are users that are originally acquired through ads treated when they subsequently return through Home recommendations?</Typography>
</AccordionSummary>
<AccordionDetails>
For a user whose first play came from an ad, their later play, retention, and spend do not become RFY ranking signals, even if they return through Home. RFY signals are based on users organically acquired through Home Recommendations.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>After running an ad, why did my Home recommendation impressions drop?</Typography>
</AccordionSummary>
<AccordionDetails>
RFY is the organic distribution of your game and depends entirely on the engagement of users who discover your game through Home Recommendations.

When a user is acquired through an ad, Roblox considers that user already acquired. This means the user acquired through an ad will generally not subsequently see your game in RFY. This can mean RFY impressions dip even while total acquisition increases.

Ads do not penalize or downrank your game in RFY. Ads attract incremental new users to your game and increase retention of your existing users to drive incremental engagement and revenue outcomes above Home Recommendations.

A drop in RFY impressions after advertising is not an ad penalty. Seasonality, platform-wide demand, stronger competing games, and ranking-signal changes can also affect impressions.
</AccordionDetails>
</BaseAccordion>

## General questions

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>Does Roblox ever reduce a game's reach?</Typography>
</AccordionSummary>
<AccordionDetails>
Roblox can limit a game's reach through documented [reduced-exposure or discoverability restrictions](./discovery.md#issues-that-limit-exposure).

Possible reasons for reduced exposure can be:

- Leading with giveaways
- Misleading or mismatched metadata and content
- Non-unique games
- Violating [safety policies, moderation, or community standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards)
- Impressions can fall because of normal ranking fluctuations such as algorithm changes, seasonality, platform demand, or other games performing better

To check if your game is affected by quality issues, go to the [Creator Dashboard](https://create.roblox.com/dashboard). Games with reduced exposure display a banner that updates daily and provides the latest status about quality and visibility. You can also check your eligibility status to publish public games in your [account settings](https://create.roblox.com/settings/eligibility/publishing-permissions).

If you come across any issues, go to [Support](https://www.roblox.com/support), select **Bug Report**, and provide the Universe ID of your game along with a description of your issue.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>Why do I see low quality games ranked high on my Home page?</Typography>
</AccordionSummary>
<AccordionDetails>
The team is constantly working on improving user experience by [reducing exposure of low quality content](https://devforum.roblox.com/t/improving-user-experience-by-reducing-exposure-of-low-quality-content/3299107). Proactive moderation is ongoing, though some games might experience brief upticks in visibility while enforcement takes effect. A notice is given in Creator Analytics for games that are given a low quality status rating with steps to help improve your game content.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>How does Roblox identify low quality games that should have reduced visibility?</Typography>
</AccordionSummary>
<AccordionDetails>
Roblox prioritizes multiple objective measures via models and human reviews and reduces the visibility of games that don't adhere to the outlined [best practices](./discovery.md#best-practices-for-discovery). This approach helps ensure a level playing field where high-quality content isn't competing with noise.

It is worth noting that if we're looking at, for example, 10 games that appear indistinguishable, we're not prioritizing discoverability based on which game was first created. Rather we're making sure we highlight the game that first added the unique metadata and/or placefile.

If you see a message on your [Creator Dashboard](https://create.roblox.com/dashboard), you can always change your discoverability status by following our [best practices](./discovery.md#best-practices-for-discovery). Finally, if you encounter any issues, please submit a [bug report](https://www.roblox.com/support).
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>How do I know if my thumbnail or title or gameplay is too similar and will face reduced discoverability as a result?</Typography>
</AccordionSummary>
<AccordionDetails>
If you're unsure whether your game is affected by quality issues, visit your [Creator Dashboard](https://create.roblox.com/dashboard). A banner will display if your game has reduced exposure. This banner updates daily, providing the latest status of your experience's quality and visibility.

A handy rule of thumb is to consider this from a user's perspective: if you, as a user, search for a game and are inundated with multiple options that have the same visuals and titles, making them virtually indistinguishable, it's neither a good experience for you nor fair to the creator who originally built a quality game. Games like that will have reduced discoverability.

Additionally, your game must always adhere to Roblox's [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards). We also recommend checking [discovery best practices](./discovery.md#best-practices-for-discovery) and [thumbnail best practices](./production/publishing/thumbnails.md#best-practices) to help your game get discovered.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>Can I reuse my own thumbnails or will that impact my game's discoverability?</Typography>
</AccordionSummary>
<AccordionDetails>
Yes, you can switch back and forth between old and new icons and thumbnails within your game or games from the same network of groups and accounts. Reusing an existing thumbnail alone shouldn't negatively affect discoverability.
</AccordionDetails>
</BaseAccordion>
