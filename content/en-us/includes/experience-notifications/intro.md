---
title: include
---

**Experience Notifications** are a way for [opted-in](https://en.help.roblox.com/hc/en-us/articles/24769602332692-Out-of-Experience-Notifications) users age 13+ to keep up with their favorite experiences through timely, personalized notifications. As the developer, you can determine what kinds of in‑experience activities are most important to notify your users about, as well as define the notification content.

<Tabs>
<TabItem label="Async Activity">

<Grid container spacing={3}>
<Grid item>
<img src="../../assets/open-cloud/experience-notifications/Example-Notification-A.png" width="369" height="134" alt="Example notification" />
</Grid>
<Grid item>
<img src="../../assets/open-cloud/experience-notifications/Example-Notification-D.png" width="369" height="134" alt="Example notification" />
</Grid>
</Grid>

</TabItem>
<TabItem label="Progress / Achievement">

<Grid container spacing={3}>
<Grid item>
<img src="../../assets/open-cloud/experience-notifications/Example-Notification-C.png" width="369" height="134" alt="Example notification" />
</Grid>
<Grid item>
<img src="../../assets/open-cloud/experience-notifications/Example-Notification-E.png" width="369" height="134" alt="Example notification" />
</Grid>
</Grid>

</TabItem>
<TabItem label="User Mentions">

<Grid container spacing={3}>
<Grid item>
<img src="../../assets/open-cloud/experience-notifications/Example-Notification-B.png" width="369" height="134" alt="Example notification" />
</Grid>
<Grid item>
<img src="../../assets/open-cloud/experience-notifications/Example-Notification-F.png" width="369" height="134" alt="Example notification" />
</Grid>
</Grid>

</TabItem>
</Tabs><br />

The Experience Notification system features the following:

- **Customizable Notifications with Parameters** &mdash; Full flexibility to customize the [notification message](#creating-a-notification-string) with parameters, for example:

	<p><Chip label="Your gold goose egg has hatched!" size="large" color="primary" variant="outlined" /></p>
	<p><Chip label="Allie @LaterSk8er1 just beat your record on the Tokyo Tour track!" size="large" color="primary" variant="outlined" /></p>

- **Launch Data** &mdash; Include optional [launch data](#including-launch-and-analytics-data) that can be read through `Class.Player:GetJoinData()` when the notification recipient joins. This could involve routing a user to a coordinate location or personalizing their joining experience.

- **Analytics Support** &mdash; Track your reachable audience and the performance of your notifications in the [Creator Dashboard](https://create.roblox.com/dashboard/creations).
