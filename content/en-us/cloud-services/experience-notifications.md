---
title: Experience Notifications
description: Experience Notifications are a way for users to keep up with their favorite experiences through timely, personalized notifications.
---

<Alert severity="success">
This feature is currently in beta and changes/upgrades should be anticipated.
</Alert>

**Experience Notifications** are a way for 13+ users to keep up with their favorite experiences through timely, personalized notifications. As the developer, you can determine what kinds of in‑experience activities are most important to notify your users about, as well as define the notification content. This article contains [best practices](#best-practices), [examples](#example-notifications), instructions for [implementation](#implementation) and [analytics](#analytics), details on the [delivery system](#delivery-system), and an overview of [guidelines](#guidelines).

<Grid container spacing={3}>
<Grid item>
<img src="../assets/open-cloud/experience-notifications/Example-Notification-A.png" width="369" alt="Example notification" />
</Grid>
<Grid item>
<img src="../assets/open-cloud/experience-notifications/Example-Notification-B.png" width="369" alt="Example notification" />
</Grid>
</Grid>

The Experience Notification system features the following:

- **Customizable Notifications with Parameters** &mdash; Full flexibility to customize the [notification message](#creating-a-notification-string) with parameters, for example "Your gold goose egg has hatched!" or "You're 2 quests away from reaching Level&nbsp;6!"
- **Launch Data** &mdash; Include optional [launch data](#including-launch-and-analytics-data) that can be read through `Class.Player:GetJoinData()` when the notification recipient joins. This could involve routing a user to a coordinate location or personalizing their joining experience.
- **Analytics Support** &mdash; Track your reachable audience and the performance of your notifications in the [Creator Dashboard](https://create.roblox.com/dashboard/creations). Available in March&nbsp;2024.

## Experience Eligibility Requirements

In order to use the APIs to send notifications, the experience must meet the following base criteria:

- Minimum 100 visits since launch.
- The experience must not be under moderation.
- You as the developer must have permission to manage the experience.

## User Experience

### Enabling Notifications

Users of age 13+ are eligible to receive Experience Notifications and can enable them through the [Follow](../production/promotion/growing-your-audience.md#followers) button on your experience's details page, which will soon be renamed as **Notifications** and relocated to improve discoverability.

13+ users who already follow your experience will be retained and these users will be automatically eligible to receive Experience Notifications in addition to existing [update notifications](../production/promotion/growing-your-audience.md#announcing-updates).

<figure>
<img src="../assets/open-cloud/experience-notifications/Per-Experience-Enable-Notification.png" width="375" alt="Enable notifications button on an experience's info panel" />
<figcaption>Enable Notifications button (coming soon)</figcaption>
</figure>

### Receiving Notifications

Experience Notifications will be delivered to the Roblox notification stream. Users can join your experience directly via the **Join** button on the notification and spawn according to your [launch data](#including-launch-and-analytics-data).

<img src="../assets/open-cloud/experience-notifications/Notification-Stream.png" width="375" alt="Notifications stream on the Roblox app" />

### Example Notifications

You may use Experience Notifications to notify users of moments and activity that occur in-experience and are highly relevant to them. Here are two categories for inspiration:

<Tabs>
<TabItem label="Async Activity">

<Grid container spacing={3}>
<Grid item>
<img src="../assets/open-cloud/experience-notifications/Example-Notification-A.png" width="369" alt="Example notification" />
</Grid>
<Grid item>
<img src="../assets/open-cloud/experience-notifications/Example-Notification-D.png" width="369" alt="Example notification" />
</Grid>
</Grid>

</TabItem>
<TabItem label="Progress / Achievement">

<Grid container spacing={3}>
<Grid item>
<img src="../assets/open-cloud/experience-notifications/Example-Notification-C.png" width="369" alt="Example notification" />
</Grid>
<Grid item>
<img src="../assets/open-cloud/experience-notifications/Example-Notification-B.png" width="369" alt="Example notification" />
</Grid>
</Grid>

</TabItem>
</Tabs>

### Best Practices

Notifications should be **personalized** to the receiver and should be based on in‑experience activity that's specifically relevant to the user. Inversely, notifications should not be of a generic, advertising nature.

<Alert severity="success">
You're 2 races away from completing the weekly challenge!
</Alert>

<Alert severity="error">
A new line of race cars just dropped in Race Car Craze. Check them out!
</Alert>

Ideally, notifications should also alert users of something they can take **immediate action** on. Avoid purely informational notifications that do not prompt a direct response or action.

<Alert severity="success">
Your base is being attacked, defend your territory!
</Alert>

<Alert severity="error">
It's been a few days since you initiated a battle.
</Alert>

Please also ensure that you are following the [guidelines](#guidelines) before using Experience Notifications.

## Implementation

Implementing Experience Notifications begins with [creating a notification string](#creating-a-notification-string) and including the [package](#including-the-package) in your project. Once these are set up, you can [send notifications](#sending-an-experience-notification) with optional [custom parameters](#customizing-notifications-using-parameters).

Alternatively, you can use the [Open Cloud API](../cloud/open-cloud/experience-notifications.md) to trigger notifications through freeform API requests.

### Creating a Notification String

As with [Player Invite Prompts](../production/promotion/invite-prompts.md), you must create and edit your notification strings in the [Creator Dashboard](https://create.roblox.com/dashboard/creations). **There is no default Experience Notification string, so this step is required.**

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations).
1. Similar to [badges](../production/publishing/badges.md), notification strings are tied to a **specific experience**. Locate that experience's thumbnail and click on it.
1. In the left column, under **Engagement**, click **Notifications**.

   <img src="../assets/creator-dashboard/Experience-Nav-Engagement-Notifications.png" width="330" />

1. In the center region, click the **Create a Notification String** button.
1. Fill in an identifier name (only visible to you) and the custom notification string.

   - Strings have a limit of 99 characters and can include unlimited custom parameters (there are no required parameters).
   - Notifications will automatically use the title of your experience as the notification title, but you can additionally use **\{experienceName\}** to reference your experience in the notification body text.
   - You can **not** reference or mention a user by name in the notification. Attempting to use **\{displayName\}** as with [Player Invite Prompts](../production/promotion/invite-prompts.md) will cause the API request to fail.

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

   <img src="../assets/creator-dashboard/Notifications-Exp-Notif-Copy-Asset-ID.png" width="780" />

1. Use the copied ID for the `messageId` key value in the `payload` table as demonstrated in the [example script](#sending-an-experience-notification) .

### Including the Package

**During the beta period,** you must obtain the Lua package from the [Creator Store](../production/publishing/creator-store.md).

1. Navigate to the [Experience Notifications Beta](https://create.roblox.com/store/asset/16200196026/Experience-Notifications-Beta) item page.
1. Click the **Get Model** button in the upper right.

   <img src="../assets/open-cloud/experience-notifications/Beta-Get-Model.png" width="760" />

1. Once obtained, the button changes to **Try in Studio**. You can also locate the package in the Studio's [Toolbox](../projects/assets/toolbox.md) under **Inventory**&nbsp;&rarr; **My&nbsp;Models**.

   <img src="../assets/open-cloud/experience-notifications/Beta-Try-In-Studio.png" width="760" />

	 <img src="../assets/open-cloud/experience-notifications/Beta-Toolbox-Item.png" width="360" />

1. Click the package to insert it into the [Explorer](../studio/explorer.md) hierarchy, then move the entire **OpenCloud** model into **ServerScriptService**.

   <img src="../assets/open-cloud/experience-notifications/Move-Package.png" width="320" />

### Sending an Experience Notification

Once you've [created a notification string](#creating-a-notification-string) and included the [package](#including-the-package) in your project, you can send notifications from server‑side scripts.

<Alert severity="warning">
During the beta period, notifications can only be sent to users who can manage the experience.
</Alert>

To send a basic notification to a specific user, include the [notification string](#creating-a-notification-string) asset ID in the payload's `messageId` field, then call the [createUserNotification](#createusernotification) function with the recipient's `Class.Player.UserId` and the request data.

```lua title="Send an Experience Notification"
local ServerScriptService = game:GetService("ServerScriptService")

local OCUserNotification = require(ServerScriptService.OpenCloud.V2.UserNotification)
local recipientPlayerID = 505306092

-- In the payload, "messageId" is the value of the notification asset ID
local userNotification = {
	payload = {
		messageId = "5dd7024b-68e3-ac4d-8232-4217f86ca244",
		type = "MOMENT"
	}
}

local result = OCUserNotification.createUserNotification(recipientPlayerID, userNotification)

if result.statusCode ~= 200 then
	print(result.statusCode)
	print(result.error.code)
	print(result.error.message)
end
```

### Customizing Notifications Using Parameters

To customize the notification for each recipient, you can include **parameters** in the [notification string](#creating-a-notification-string), then customize the parameters when calling the API. For example, you can define the notification string as "You won **\{numRaces\}** races this week and unlocked the **\{racetrackName\}** track!", then set the `numRaces` and `racetrackName` parameters.

```lua title="Customize Notification Using Parameters"
local ServerScriptService = game:GetService("ServerScriptService")

local OCUserNotification = require(ServerScriptService.OpenCloud.V2.UserNotification)
local recipientPlayerID = 505306092

local numRacesParam = {int64Value = 5}
local racetrackNameParam = {stringValue = "Galaxy Road"}

-- In the payload, "messageId" is the value of the notification asset ID
-- In this example, the notification string is "You won {numRaces} races this week and unlocked the {racetrackName} track!"
local userNotification = {
	payload = {
		messageId = "ef0e0790-e2e8-4441-9a32-93f3a5783bf1",
		type = "MOMENT",
		parameters = {
			["numRaces"] = numRacesParam,
			["racetrackName"] = racetrackNameParam
		}
	}
}

local result = OCUserNotification.createUserNotification(recipientPlayerID, userNotification)

if result.statusCode ~= 200 then
	print(result.statusCode)
	print(result.error.code)
	print(result.error.message)
end
```

### Including Launch and Analytics Data

To further improve the user experience, you can include **launch data** in the notification, useful for scenarios such as routing users to a coordinate location or personalizing the joining experience. Additionally, you can include [analytics](#analytics) data to segment the performance of different categories of notifications. Please also refer to the [Player Invite Prompts](../production/promotion/invite-prompts.md#including-launch-data) example on how launch data can be set and used.

```lua title="Include Launch Data and Analytics Data"
local ServerScriptService = game:GetService("ServerScriptService")

local OCUserNotification = require(ServerScriptService.OpenCloud.V2.UserNotification)
local recipientPlayerID = 505306092

-- In the payload, "messageId" is the value of the notification asset ID
local userNotification = {
	payload = {
		messageId = "5dd7024b-68e3-ac4d-8232-4217f86ca244",
		type = "MOMENT",
		joinExperience = {
			launchData = "Test_Launch_Data"
		},
		analyticsData = {
			category = "Test_Analytics_Category"
		}
	}
}

local result = OCUserNotification.createUserNotification(recipientPlayerID, userNotification)

if result.statusCode ~= 200 then
	print(result.statusCode)
	print(result.error.code)
	print(result.error.message)
end
```

## Delivery System

A spam prevention system exists to ensure the quality of notifications for users and protect the shared notification channel for all developers. Because of this, delivery of notifications is not guaranteed. This spam prevention system is directly informed by user engagement: the more users engage with your notifications, the more reach they'll receive. You can transparently track engagement metrics in the [analytics](#analytics) dashboard, as explained below.

To start, Experience Notifications are subject to the same static throttle limit of [experience update](../production/promotion/growing-your-audience.md#announcing-updates) notifications. Each user can receive one notification every three days from a given experience and you'll receive transparent feedback when a user's throttle limit is reached. The limit will be relaxed over time.

Additionally, the following list outlines some of the special cases which may result in **non‑delivery** of a notification:

- Experience [eligibility requirements](#experience-eligibility-requirements) are not met.
- Recipient is not opted in to notifications from your experience.
- Recipient's throttle limit for your experience has been reached.
- Recipient's aggregate daily throttle limit has been reached.
- Missing or invalid request parameters.
- Notification string was moderated.

## Analytics

Starting in March, performance of your notifications and notifiable audience are displayed in the **Analytics** tab of the **Notifications** page where you [configure notification strings](#creating-a-notification-string) (simply tab from **Creations** to **Analytics**).

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations).
1. Similar to [badges](../production/publishing/badges.md), notification strings are tied to a **specific experience**. Locate that experience's thumbnail and click on it.
1. In the left column, under **Engagement**, click **Notifications**.

   <img src="../assets/creator-dashboard/Experience-Nav-Engagement-Notifications.png" width="330" />

1. On the target page, click the **Analytics** tab to switch to the analytics dashboard.

   <img src="../assets/open-cloud/experience-notifications/Analytics-Tab.png" width="760" />

### Notifications Summary

The summary section serves as a snapshot of the aggregate performance of your notifications.

<img src="../assets/open-cloud/experience-notifications/Analytics-Summary.png" width="880" />

<table>
<thead>
  <tr>
    <th>Statistic</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Opted-in Users**</td>
    <td>The total number of users that have turned on notifications for your experience. Please note that this does include users under the age of 13 who are only able to receive notification of [experience updates](../production/promotion/growing-your-audience.md#announcing-updates), not personalized Experience Notifications.</td>
  </tr>
  <tr>
    <td>**Impressions**</td>
    <td>The total number of user impressions all of your notifications have received in aggregate.</td>
  </tr>
  <tr>
    <td>**Clicks**</td>
    <td>The total number of clicks all of your notifications have received in aggregate.</td>
  </tr>
  <tr>
    <td>**CTR**</td>
    <td>The rate at which users are clicking on your notifications, calculated as the ratio of clicks to impressions.</td>
  </tr>
	<tr>
    <td>**Turn Off**</td>
    <td>The rate at which users are turning off notifications for your experience directly from your notifications, calculated as the ratio of turn off actions to impressions.</td>
  </tr>
	<tr>
    <td>**Dismiss**</td>
    <td>The rate at which users are dismissing your notifications, calculated as the ratio of dismiss actions to impressions.</td>
  </tr>
</tbody>
</table>

### Itemized Stats

The **Experience Notifications** table displays detailed performance statistics for each notification with at least 100 impressions, ordered by the date of first impression for that notification.

<img src="../assets/open-cloud/experience-notifications/Analytics-Itemized.png" width="880" />

The **Name** column is the key identifier for the notification. By default, the name matches the identifier name you specified when [creating the notification string](#creating-a-notification-string), but you can override it through the `category` field in your API calls, in which case `category` overrides the name. Changing the string name in the [Creator Dashboard](https://create.roblox.com/dashboard/creations) or changing the string your message ID references in the API call will generate a new row in the table.

If you'd like to A/B test the performance of different strings, it's recommended that you create an entirely new notification string with a similar name, for example:

- **EggHatchA** &mdash; "Your gold egg has hatched! Come meet your new pet."
- **EggHatchB** &mdash; "It's hatching time! Come meet your new pet."

## Guidelines

<BaseAccordion>
<AccordionSummary>
<Typography variant="h6">Respect Community Standards</Typography>
</AccordionSummary>
<AccordionDetails>
All notification content and behaviors are subject to Roblox's [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards) and platform‑wide [text filtering](../ui/text-filtering.md), regardless of your experience's [age guidelines](../production/promotion/experience-guidelines.md). This means that if your experience is a 17+ experience, your notifications are still subject to the platform‑wide standards, **not** the [17+&nbsp;Policy Standards](https://en.help.roblox.com/hc/en-us/articles/15869919570708).
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant="h6">Do Not Mention Specific Users</Typography>
</AccordionSummary>
<AccordionDetails>
Do not mention specific users in your notifications by user name, `Class.Player.DisplayName`, or otherwise. Notifications should be relevant to the receiver without the mention of a specific user.

<Alert severity="success">
Your opponent finished their turn in chess. It's your turn!
</Alert>

<Alert severity="error">
@Joe finished their turn in chess. It's your turn!
</Alert>

</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant="h6">Do Not Use Deceptive Nudge Tactics</Typography>
</AccordionSummary>
<AccordionDetails>
Notification content is **not** permitted to incorporate dark patterns or other tactics that manipulate or deceive users into making choices they don't intend, or which may be counter to their best interests. This could include the following:

- **Disguised Ads** &mdash; Notifications that are intentionally disguised as organic content, but are actually advertising.

  <figure>
  <Alert severity="error">
  Click here for important information about your Petz World account.
  </Alert>
  <figcaption>Clicking notification leads to Petz World but no "important information" is displayed</figcaption>
  </figure>

- **Time Pressured Actions** &mdash; Notifications that pressure users into clicking, subscribing, consenting, or purchasing through applying false time pressure.

  <figure>
  <Alert severity="error">
  Make a purchase in Petz World in the next 10 minutes to avoid missing out on important gameplay updates!
  </Alert>
  <figcaption>The information provided about the purchase reward is false/inaccurate</figcaption>
  </figure>

- **Bait-and-Switch with Free Items or Other Rewards** &mdash; Notifications that falsely tell users that they'll receive something for free when it's not.

  <figure>
  <Alert severity="error">
  Play Petz World now and get a free dog bed!
  </Alert>
  <figcaption>Upon clicking the notification, it becomes clear that something further is required to get the gift</figcaption>
  </figure>

- **Tricking Users Into Purchasing** &mdash; Notifications that trick users into making unintended purchases.

  <figure>
  <Alert severity="error">
  Check out our new Petz in Petz World!
  </Alert>
  <figcaption>When clicked, the user is brought directly to a purchase system pre‑loaded with items that the user didn't choose to buy</figcaption>
  </figure>

</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant="h6">Do Not Gate Gameplay</Typography>
</AccordionSummary>
<AccordionDetails>
Experiences should **not** require users to turn on notifications in order to participate or advance in gameplay.
</AccordionDetails>
</BaseAccordion>

## API Reference

### Functions

#### createUserNotification

<figcaption>
createUserNotification(userId: `number`, userNotification: [UserNotification](#usernotification)): [UserNotificationResult](#usernotificationresult)
</figcaption>

Sends a notification from a server‑side script. Requires the recipient's `Class.Player.UserId` and a [UserNotification](#usernotification). Returns a [UserNotificationResult](#usernotificationresult).

```lua title="Send an Experience Notification"
local ServerScriptService = game:GetService("ServerScriptService")

local OCUserNotification = require(ServerScriptService.OpenCloud.V2.UserNotification)
local recipientPlayerID = 505306092

-- In the payload, "messageId" is the value of the notification asset ID
local userNotification = {
	payload = {
		messageId = "5dd7024b-68e3-ac4d-8232-4217f86ca244",
		type = "MOMENT"
	}
}

local result = OCUserNotification.createUserNotification(recipientPlayerID, userNotification)

if result.statusCode ~= 200 then
	print(result.statusCode)
	print(result.error.code)
	print(result.error.message)
end
```

### Types

#### UserNotification

Table containing details on the notification to be sent to the user. Must contain a `payload` table with required `messageId` and `type` strings, and optional `parameters`, `joinExperience`, and `analyticsData` tables.

<table>
<thead>
  <tr>
    <th>Key</th>
		<th>Type</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`messageId`</td>
		<td>string</td>
    <td>An ID that represents a customizable notification message template that you create in the [Creator Dashboard](https://create.roblox.com/dashboard/creations).</td>
  </tr>
  <tr>
    <td>`type`</td>
		<td>string</td>
    <td>The type of notification. Only `"MOMENT"` is currently supported.</td>
  </tr>
	<tr>
    <td>`parameters`</td>
		<td>table</td>
    <td>A table of parameters used to render a notification message template. See [Customizing Notifications Using Parameters](#customizing-notifications-using-parameters) for example usage.</td>
  </tr>
	<tr>
    <td>`joinExperience`</td>
		<td>table</td>
    <td>A call-to-action that represents joining an experience. Currently supports a `launchData` key‑value pair which represents arbitrary data available to an experience when a user joins the experience from the notification; this value is limited to a maximum of 200 bytes. See [Including Launch and Analytics Data](#including-launch-and-analytics-data) for example usage.</td>
  </tr>
	<tr>
    <td>`analyticsData`</td>
		<td>table</td>
    <td>Data for how analytics are reported. Currently supports a `category` key‑value pair which represents the notification category, used to group analytics data. See [Including Launch and Analytics Data](#including-launch-and-analytics-data) for example usage.</td>
  </tr>
</tbody>
</table>

#### UserNotificationResult

A wrapper object that holds the response from a sent notification. Contains the following key‑value pairs:

<table>
<thead>
  <tr>
    <th>Key</th>
		<th>Type</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`statusCode`</td>
		<td>number</td>
    <td>The HTTP status code for the request.</td>
  </tr>
  <tr>
    <td>`error`</td>
		<td>table</td>
    <td>Table containing `code` and `message` keys describing the GRPC error code and the error message, respectively.</td>
  </tr>
	<tr>
    <td>`response`</td>
		<td>table</td>
    <td>Table containing `id` and `path` keys describing a unique UUID and the resource path of the user notification, respectively.</td>
  </tr>
</tbody>
</table>
