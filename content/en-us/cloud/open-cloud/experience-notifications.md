---
title: Experience Notifications
description: Experience Notifications are a way for users to keep up with their favorite experiences through timely, personalized notifications.
---

import Intro from '../../includes/experience-notifications/intro.md'
import Eligibility from '../../includes/experience-notifications/eligibility.md'
import ImplementationCreateNotificationString from '../../includes/experience-notifications/implementation-create-notification-string.md'
import DeliverySystem from '../../includes/experience-notifications/delivery-system.md'
import AnalyticsOverview from '../../includes/experience-notifications/analytics-overview.md'
import AnalyticsNotificationsSummary from '../../includes/experience-notifications/analytics-notification-summary.md'
import AnalyticsItemizedStats from '../../includes/experience-notifications/analytics-itemized-stats.md'
import Guidelines from '../../includes/experience-notifications/guidelines.md'

<Intro components={props.components} />

## Eligibility Requirements

<Eligibility components={props.components} />

## Usage Guidelines

<Guidelines components={props.components} />

## Implementation

Implementing Experience Notifications begins with [creating a notification string](#creating-a-notification-string). Once a notification string is set up, you can [send notifications](#sending-an-experience-notification) with optional [custom parameters](#customizing-notifications-using-parameters).

Alternatively, you can use the [Engine API](../../production/promotion/experience-notifications.md) to trigger notifications through server-side scripts.

### Creating a Notification String

<ImplementationCreateNotificationString components={props.components} />

### Sending an Experience Notification

The [UserNotification](../../cloud/reference/UserNotification) API lets you send Experience Notifications to users. Before using it, you must [generate an API key](../../cloud/open-cloud/api-keys.md) or [configure OAuth 2.0](../../cloud/open-cloud/oauth2-overview.md) for your app. The examples on this page use API keys.

Notifications will be delivered to [opted-in](https://en.help.roblox.com/hc/en-us/articles/24769602332692-Out-of-Experience-Notifications) users age 13+ through their Roblox notification stream, at which point they can join the experience directly via the **Join** button on the notification and spawn according to your [launch data](#including-launch-and-analytics-data).

<img src="../../assets/open-cloud/experience-notifications/Notification-Stream.png" width="393" alt="Notifications stream on the Roblox app" />

To send an Experience Notification to a user:

1. Copy the API key to the `x-api-key` request header of the [Create User Notification](../../cloud/reference/UserNotification#Create-User-Notification) call.
2. In your request:

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

To customize the notification for each recipient, you can include **parameters** in the [notification string](#creating-a-notification-string), then customize the parameters when calling the API. For example, you can define the notification string as:

<p><Chip label="{userId-friend} beat your high score by {points} points! Time to level up?" size="large" color="primary" variant="outlined" /></p>

Then, set the `userId-friend` and `points` parameters in the script:

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
			"userId-friend": {"int64_value": 3702832553},
			"points": {"string_value": "5"}
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

<DeliverySystem components={props.components} />

## Analytics

<AnalyticsOverview components={props.components} />

### Notifications Summary

<AnalyticsNotificationsSummary components={props.components} />

### Itemized Stats

<AnalyticsItemizedStats components={props.components} />
