---
title: include
---

As with [Player Invite Prompts](../../production/promotion/invite-prompts.md), you must create and edit your notification strings in the [Creator Dashboard](https://create.roblox.com/dashboard/creations). **There is no default experience notification string, so this step is required.**

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations).
1. Similar to [badges](../../production/publishing/badges.md), notification strings are tied to a **specific experience**. Locate that experience's thumbnail and click on it.
1. In the left column, under **Engagement**, click **Notifications**.
1. In the center region, click the **Create a Notification String** button.
1. Fill in an identifier name (only visible to you) and the custom notification string; this is limited to 99 characters and can include unlimited [custom parameters](#customize-notifications-using-parameters). Notifications will automatically use the title of your experience as the notification title, but you can additionally use **\{experienceName\}** to reference your experience in the notification body text.

   Example notification strings:

	 <p><Chip label="You're {numQuests} quests away from completing the weekly challenge!" size="large" color="primary" variant="outlined" /></p>
	 <p><Chip label="Your {eggName} hatched! Come meet your new pet." size="large" color="primary" variant="outlined" /></p>
	 <p><Chip label="You won {numRaces} races this week and unlocked the {racetrackName} track!" size="large" color="primary" variant="outlined" /></p>
	 <p><Chip label="{userId-friend} just beat your record on the Tokyo Tour track! Time for revenge?" size="large" color="primary" variant="outlined" /></p>

   <Alert severity="warning">
   Before writing notification strings, please review the [guidelines](#usage-guidelines) for using the system.
	 </Alert>

1. When ready, click the **Create Notification String** button.
1. On the notifications page, in the table of notifications, click the **&ctdot;** button in the **Actions** column and select **Copy Asset ID**.
1. Use the copied ID for the `messageId` key value in the `payload` table as demonstrated in the [example script](#send-an-experience-notification).
