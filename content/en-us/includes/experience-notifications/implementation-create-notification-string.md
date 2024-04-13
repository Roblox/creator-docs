---
title: include
---

As with [Player Invite Prompts](../../production/promotion/invite-prompts.md), you must create and edit your notification strings in the [Creator Dashboard](https://create.roblox.com/dashboard/creations). **There is no default Experience Notification string, so this step is required.**

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations).
1. Similar to [badges](../../production/publishing/badges.md), notification strings are tied to a **specific experience**. Locate that experience's thumbnail and click on it.
1. In the left column, under **Engagement**, click **Notifications**.

   <img src="../../assets/creator-dashboard/Experience-Nav-Engagement-Notifications.png" width="330" />

1. In the center region, click the **Create a Notification String** button.
1. Fill in an identifier name (only visible to you) and the custom notification string.

   - Strings have a limit of 99 characters and can include unlimited custom parameters (there are no required parameters).
   - Notifications will automatically use the title of your experience as the notification title, but you can additionally use **\{experienceName\}** to reference your experience in the notification body text.
   - You can **not** reference or mention a user by name in the notification. Attempting to use **\{displayName\}** as with [Player Invite Prompts](../../production/promotion/invite-prompts.md) will cause the API request to fail.

   <Alert severity="success">
   <AlertTitle>Example Notifications</AlertTitle>
	 <ul>
	 <li>You're **\{numQuests\}** quests away from completing the weekly challenge!</li>
	 <li>Your **\{eggName\}** hatched! Come meet your new pet.</li>
	 <li>You won **\{numRaces\}** races this week and unlocked the **\{racetrackName\}** track!</li>
	 </ul>
	 </Alert>

   <Alert severity="warning">
   Before writing notification strings, please review the [guidelines](#guidelines) for using the system.
	 </Alert>

1. When ready, click the **Create Notification String** button.
1. On the notifications page, click the **&ctdot;** button for the notification and select **Copy&nbsp;Asset&nbsp;ID**.

   <img src="../../assets/creator-dashboard/Notifications-Exp-Notif-Copy-Asset-ID.png" width="780" />

1. Use the copied ID for the `messageId` key value in the `payload` table as demonstrated in the [example script](#sending-an-experience-notification).
