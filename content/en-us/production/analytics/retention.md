---
title: Retention
description: Explains how to improve retention metrics for your experience.
---

<iframe width="640" height="360" src="https://www.youtube-nocookie.com/embed/LpAU6TheAZ4?si=_1r_ZtlJ3WsrZMUf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

<br />

**Retention** measures how many users return to your experience after their first visit in 1 day, 7 days, and 30 days.

## View retention metrics

To view your experience's retention analytics:

1. Go to [Creations](https://create.roblox.com/dashboard/creations) and select an experience.
2. In the **Analytics** menu on the left, select **Retention**.

To view analytics for group-owned experiences, you need to have [group permissions for analytics](../../production/analytics/analytics-dashboard.md).

The x-axis of your [retention cohorts](#understand-your-new-user-cohorts) is based on a new user's first play date. This provides a more accurate view of how the changes you make on a specific day affect that new user cohort's retention over time.

For example, the date 06/20 on all three charts shows you the same cohort:

- **D1 retention**: Users who first played the experience on 06/20 and returned to the experience the next day.
- **D7 retention**: Users who first played the experience on 06/20 and returned to the experience after 1 week.
- **D30 retention**: Users who first played the experience on 06/20 and returned to the experience after 1 month.

<Alert severity="info">
   The data for the most recent dates on your D7 and D30 charts might be empty. For a user cohort that first played the experience on 06/20, their D7 retention data appears on 06/27 (after 7 days have passed), while their D30 retention data appears on 07/20 (after 30 days have passed).
</Alert>

In the following example, there is a dip around 05/13 on all retention charts. This indicates that users acquired on 05/13 had lower D1, D7, and D30 retention. This is a typical and temporary outcome following a large influx of new users.

<figure>
    <img src="../../assets/analytics/retention/AnalyticsRetentionChart.png" />
    <figcaption>In this example, there is a dip around 05/13 on all retention charts. This indicates that users acquired on 05/13 had lower D1, D7, and D30 retention. This is a typical and temporary outcome following a large influx of new users.</figcaption>
</figure>

## Understand your new user cohorts

You can find the new user retention cohort table at the bottom of your retention dashboard. You can view both daily and weekly cohorts:

- **Daily cohorts** let you see how many new users were retained over their first 10 days.
- **Weekly cohorts** let you track retention over a 10-week period by grouping users by the week they joined (Monday - Sunday).

Cohorts are useful for tracking the impact of major updates, events, or any marketing campaigns you run. For example, you can measure if new users who started playing your experience during a big event are sticking around longer than users who started playing before the event.

<figure>
    <img src="../../assets/analytics/retention/CohortAnalysis.png" />
</figure>

For each cohort, you can also analyze key down-funnel metrics, including:

- 7D playtime per user (cumulative)
- 7D player conversion rate (cumulative)
- 7D revenue per user (cumulative)
- 30D revenue per user (cumulative)

These metrics allow you to see if the new users who started playing your experience during a big event are monetizing better than other user cohorts.

<figure>
    <img src="../../assets/analytics/retention/CohortAnalysis2.png" />
</figure>

## Improve day 1 retention

Day 1 retention is the percentage of new users who come back to your experience after visiting it for the first time. To improve this metric, focus on your experience's **core loop**, **first-time user experience**, and **performance**.

### Core loop

Core loop is the actions that users repeat in your experience to make progress in a single session.

- For a pet adoption experience, a core loop might include adopting, training, and leveling up pets.
- For a tycoon experience, a core loop might include managing a business, balancing resources, and competing with other users.

The following example is one path to improve your core loop:

1. **Identify the core steps** that users perform in the loop and make them clear and fun.
2. **Balance the challenge** of your core loop to avoid user frustration and boredom.
3. **Reward users** for completing your core loop with feedback, currency, items, and achievements.

<iframe width="640" height="360" src="https://www.youtube-nocookie.com/embed/gkFKF9A-snY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

<br />

To learn more on how to design core loops, see [Core loops](../../production/game-design/core-loops.md).

### First-time user experience

**First-time user experience (FTUE)** is how new users experience your core loop for the first time. To improve your FTUE:

1. **Use a brief tutorial** or contextual info like tooltips to guide users through your core loop. Avoid long tutorials to help users get to the fun as quickly as possible.
2. **Deliver a joyful moment** after users complete your core loop for the first time.
3. **Preview the progress** that users can make if they complete your core loop multiple times.

You can also use analytics to improve your FTUE:

1. **List the steps of your core loop**. For example, for a pet adoption experience, the steps can be:

   - Adopt a pet.
   - Train a pet.
   - Level up a pet.

2. **Track the completion rate of each step**. Use special in-experience items to mark the completion of each step. Track both positive and negative experiences. For example, if the FTUE includes a battle with an NPC, track both whether users win or lose more frequently.

3. **Identify and fix big drop-offs**. For example, if visiting the pet store has the highest drop-off rate, you can reduce friction in this step by making the pet store easier to find.

Avoid a complex or time consuming FTUE, as you want to get users to the fun as quickly as possible, ideally in 5 minutes or less after entering your experience.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/XfxbdKtSbOI" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

<br />

To learn more on how to design your FTUE, see [Onboarding](../../production/game-design/onboarding.md).

### Performance

**Performance** is how well your experience runs on different devices and platforms. To improve your performance:

1. **Test on different devices and platforms** to fix any bugs that might affect performance.
2. **Monitor crash rates, frame rates, and errors** each time you update your experience.
3. **Set up a user community** that can help identify bugs and crashes.

## Improve day 7 retention

Day 7 retention is the percentage of new users who come back to your experience after visiting it for the first time on the 8th day (Day 7). To improve this metric, focus on your experience's **progression system**.

### Progression system

Progression system is how users accomplish goals and gain rewards in your experience, such as leveling up and unlocking new content. To build a healthy progression system:

1. **Set up clear user goals**: Short-term goals can provide instant gratification and feedback, and long-term goals can give users directions to work towards over an extended period of time.
2. **Add content variety**: A variety of content, such as new modes, inventory items, and social features, can prevent users from getting bored.
3. **Balance the difficulty**: If users progress too fast, they might run out of content to explore. If they progress too slow, they might get bored and frustrated and lose the motivation to stay.

You can use analytics to improve your progression system:

1. **Identify your progression system**. For example:

   - Earning in-experience currency for a tycoon experience.
   - Unlocking new items to collect for an item collection experience.
   - Mastering casts or skills for a magic world experience.

2. **Measure user distribution** by tracking the number of users for each progression level to see how long it takes a user to reach the next level by granting each user a special in-experience item once they advance to the next level.

3. **Fix the progression system**. If users level up too quickly or too slowly, evaluate the difficulties of your progression system's tasks and adjust them accordingly to make sure users spend the proper amount of time on each level.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/hD2Ive5RqtE" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

## Improve day 30 retention

Day 30 retention is the percentage of new users who come back to your experience after visiting it for the first time on the 31st day (Day 30). To improve this metric, focus on your experience's ending system.

### Ending system

Ending system is what's available to users after they've completed the main objectives of your experience or reached higher levels. To improve it:

1. **Add more content**: Regular updates can keep users coming back. A common frequency is to release smaller updates on the existing mechanics every 2-4 weeks, and bigger updates of new features every 2-3 months.

2. **Add social mechanics**: Social mechanics can motivate users to stay engaged with your experience and interact with other users while waiting for new content. Common social systems and elements include trading, parties, guilds, and competitive systems such as PvP (player versus player), tournaments and leaderboards.
