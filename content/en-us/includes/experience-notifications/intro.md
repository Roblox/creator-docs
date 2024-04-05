---
title: include
---

**Experience Notifications** are a way for 13+ users to keep up with their favorite experiences through timely, personalized notifications. As the developer, you can determine what kinds of in‑experience activities are most important to notify your users about, as well as define the notification content. This article contains [best practices](#best-practices), [examples](#example-notifications), instructions for [implementation](#implementation) and [analytics](#analytics), details on the [delivery system](#delivery-system), and an overview of [guidelines](#guidelines).

<Grid container spacing={3}>
<Grid item>
<img src="../../assets/open-cloud/experience-notifications/Example-Notification-A.png" width="369" alt="Example notification" />
</Grid>
<Grid item>
<img src="../../assets/open-cloud/experience-notifications/Example-Notification-B.png" width="369" alt="Example notification" />
</Grid>
</Grid>

The Experience Notification system features the following:

- **Customizable Notifications with Parameters** &mdash; Full flexibility to customize the [notification message](#creating-a-notification-string) with parameters, for example "Your gold goose egg has hatched!" or "You're 2 quests away from reaching Level&nbsp;6!"
- **Launch Data** &mdash; Include optional [launch data](#including-launch-and-analytics-data) that can be read through `Class.Player:GetJoinData()` when the notification recipient joins. This could involve routing a user to a coordinate location or personalizing their joining experience.
- **Analytics Support** &mdash; Track your reachable audience and the performance of your notifications in the [Creator Dashboard](https://create.roblox.com/dashboard/creations).
