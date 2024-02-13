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
<img src="../../assets/open-cloud/experience-notifications/Example-Notification-A.png" width="369" alt="Example notification" />
</Grid>
<Grid item>
<img src="../../assets/open-cloud/experience-notifications/Example-Notification-B.png" width="369" alt="Example notification" />
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

Users of age 13+ are eligible to receive Experience Notifications and can enable them through the [Follow](../../production/promotion/growing-your-audience.md#followers) button on your experience's details page, which will soon be renamed as **Notifications** and relocated to improve discoverability.

13+ users who already follow your experience will be retained and these users will be automatically eligible to receive Experience Notifications in addition to existing [update notifications](../../production/promotion/growing-your-audience.md#announcing-updates).

<figure>
<img src="../../assets/open-cloud/experience-notifications/Per-Experience-Enable-Notification.png" width="375" alt="Enable notifications button on an experience's info panel" />
<figcaption>Enable Notifications button (coming soon)</figcaption>
</figure>

### Receiving Notifications

Experience Notifications will be delivered to the Roblox notification stream. Users can join your experience directly via the **Join** button on the notification and spawn according to your [launch data](#including-launch-and-analytics-data).

<img src="../../assets/open-cloud/experience-notifications/Notification-Stream.png" width="375" alt="Notifications stream on the Roblox app" />

### Example Notifications

You may use Experience Notifications to notify users of moments and activity that occur in-experience and are highly relevant to them. Here are two categories for inspiration:

<Tabs>
<TabItem label="Async Activity">

<Grid container spacing={3}>
<Grid item>
<img src="../../assets/open-cloud/experience-notifications/Example-Notification-A.png" width="369" alt="Example notification" />
</Grid>
<Grid item>
<img src="../../assets/open-cloud/experience-notifications/Example-Notification-D.png" width="369" alt="Example notification" />
</Grid>
</Grid>

</TabItem>
<TabItem label="Progress / Achievement">

<Grid container spacing={3}>
<Grid item>
<img src="../../assets/open-cloud/experience-notifications/Example-Notification-C.png" width="369" alt="Example notification" />
</Grid>
<Grid item>
<img src="../../assets/open-cloud/experience-notifications/Example-Notification-B.png" width="369" alt="Example notification" />
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

Implementing Experience Notifications begins with [creating a notification string](#creating-a-notification-string). Once a notification string is set up, you can [send notifications](#sending-an-experience-notification) with optional [custom parameters](#customizing-notifications-using-parameters).

Alternatively, you can use the [Engine API](../../cloud-services/experience-notifications.md) to trigger notifications through server-side scripts.

### Creating a Notification String

### Sending an Experience Notification

The [UserNotification](../../cloud/reference/UserNotification) API lets you send Experience Notifications to users. Before using it, you must [generate an API key](../../cloud/open-cloud/api-keys.md) or [configure OAuth 2.0](../../cloud/open-cloud/oauth2-overview.md) for your app. The examples on this page use API keys.

To send an Experience Notification to a user:

1. Copy the API key to the `x-api-key` request header of the [Create User Notification](../../cloud/reference/UserNotification#Create-User-Notification) call.
1. In your request:

   1. Copy the notification string asset ID as the value of the `payload.message_id` property.
   2. Set `payload.type` to `"MOMENT"`.
   3. Set `source.universe` to be the universe resource URL `"universes/${UniverseID}"`.

```bash title="Send an Experience Notification"
curl --location 'https://apis.roblox.com/cloud/v2/users/${UserId}/notifications' \
--header 'x-api-key: ${ApiKey}' \
--header 'Content-Type: application/json' \
--data '{
	"source": {
		"universe": "universes/${UniverseID}"
	},
	"payload": {
		"message_id": "${AssetID}",
		"type": "MOMENT"
	}
}'
```

Example response which returns the notification ID in the `id` field:

```json
{
	"path": "users/505306092/notifications/6ca4d981-36fa-4255-82a1-14d95c116889",
	"id": "6ca4d981-36fa-4255-82a1-14d95c116889"
}
```

### Customizing Notifications Using Parameters

To customize the notification for each recipient, you can include **parameters** in the [notification string](#creating-a-notification-string), then customize the parameters when calling the API. For example, you can define the notification string as "You won **\{numRaces\}** races this week and unlocked the **\{racetrackName\}** track!", then set the `numRaces` and `racetrackName` parameters.

```bash title="Customize Notification Using Parameters"
curl --location 'https://apis.roblox.com/cloud/v2/users/${UserId}/notifications' \
--header 'x-api-key: ${ApiKey}' \
--header 'Content-Type: application/json' \
--data '{
	"source": {
		"universe": "universes/${UniverseID}"
	},
	"payload": {
		"message_id": "${AssetID}",
		"type": "MOMENT",
		"parameters": {
			"numRaces": {"int64_value": 5},
			"racetrackName": {"string_value": "Galaxy Road"}
		}
	}
}'
```

### Including Launch and Analytics Data

To further improve user experience, you can include **launch data** in the notification, useful for scenarios such as routing users to a coordinate location or personalizing the joining experience. Additionally, you can include [analytics](#analytics) data to segment the performance of different categories of notifications.

```bash title="Include Launch Data and Analytics Data"
curl --location 'https://apis.roblox.com/cloud/v2/users/${UserId}/notifications' \
--header 'x-api-key: ${ApiKey}' \
--header 'Content-Type: application/json' \
--data '{
	"source": {
		"universe": "universes/${UniverseID}"
	},
	"payload": {
		"message_id": "${AssetID}",
		"type": "MOMENT"
	},
	"join_experience": {
		"launch_data": "Test_Launch_Data"
	},
	"analytics_data": {
		"category": "Test_Analytics_Category"
	}
}'
```

## Delivery System

A spam prevention system exists to ensure the quality of notifications for users and protect the shared notification channel for all developers. Because of this, delivery of notifications is not guaranteed. This spam prevention system is directly informed by user engagement: the more users engage with your notifications, the more reach they'll receive. You can transparently track engagement metrics in the [analytics](#analytics) dashboard, as explained below.

To start, Experience Notifications are subject to the same static throttle limit of [experience update](../../production/promotion/growing-your-audience.md#announcing-updates) notifications. Each user can receive one notification every three days from a given experience and you'll receive transparent feedback when a user's throttle limit is reached. The limit will be relaxed over time.

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
1. Similar to [badges](../../production/publishing/badges.md), notification strings are tied to a **specific experience**. Locate that experience's thumbnail and click on it.
1. In the left column, under **Engagement**, click **Notifications**.

   <img src="../../assets/creator-dashboard/Experience-Nav-Engagement-Notifications.png" width="330" />

1. On the target page, click the **Analytics** tab to switch to the analytics dashboard.

   <img src="../../assets/open-cloud/experience-notifications/Analytics-Tab.png" width="760" />

### Notifications Summary

The summary section serves as a snapshot of the aggregate performance of your notifications.

<img src="../../assets/open-cloud/experience-notifications/Analytics-Summary.png" width="880" />

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
    <td>The total number of users that have turned on notifications for your experience. Please note that this does include users under the age of 13 who are only able to receive notification of [experience updates](../../production/promotion/growing-your-audience.md#announcing-updates), not personalized Experience Notifications.</td>
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

<img src="../../assets/open-cloud/experience-notifications/Analytics-Itemized.png" width="880" />

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
All notification content and behaviors are subject to Roblox's [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards) and platform‑wide [text filtering](../../ui/text-filtering.md), regardless of your experience's [age guidelines](../../production/promotion/experience-guidelines.md). This means that if your experience is a 17+ experience, your notifications are still subject to the platform‑wide standards, **not** the [17+&nbsp;Policy Standards](https://en.help.roblox.com/hc/en-us/articles/15869919570708).
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
