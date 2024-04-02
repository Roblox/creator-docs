---
title: include
---

<Tabs>
<TabItem label="Experience Details Screen">

<figure>
<Grid container spacing={2}>
<Grid item>
<img src="../../assets/promotion/misc/Experience-Mobile-Enable-Notifications.png" width="375" alt="Enable notifications button on an experience's details screen (mobile)" />
</Grid>
<Grid item>
<img src="../../assets/promotion/misc/Experience-Page-Enable-Notifications.png" width="480" alt="Enable notifications button on an experience's details screen (web)" />
</Grid>
</Grid>
<figcaption>The **Notify** button is automatically present on every experience's details screen</figcaption>
</figure>

</TabItem>
<TabItem label="In-Experience Modal">

<figure>
<img src="../../assets/promotion/misc/In-Experience-Enable-Notifications.png" width="768" alt="The in-experience permission prompt encourages users to enable notifications" />
<figcaption>The in-experience permission prompt, configured using the [Notification Permission Prompt](#prompting-users-to-enable-notifications) API, encourages users to enable notifications</figcaption>
</figure>

</TabItem>
</Tabs>

Both opt-in flows build off of the old "follow" flow. This means that all users who already followed your experience are retained and those who are 13+ will automatically also be eligible to receive Experience Notifications in addition to existing [update notifications](../../production/promotion/audience-engagement.md#announcing-updates).

Users can also view and manage all the experiences they receive notifications from in the [Notifications](https://www.roblox.com/my/account#!/notifications) settings for their Roblox account.
