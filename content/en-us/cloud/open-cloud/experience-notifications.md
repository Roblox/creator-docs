---
title: Experience Notifications
description: Experience Notifications are a way for users to keep up with their favorite experiences through timely, personalized notifications.
---

import Intro from '../../includes/experience-notifications/intro.md'
import Eligibility from '../../includes/experience-notifications/eligibility.md'
import UserExperienceEnabling from '../../includes/experience-notifications/user-experience-enabling.md'
import UserExperienceReceiving from '../../includes/experience-notifications/user-experience-receiving.md'
import UserExperienceExamples from '../../includes/experience-notifications/user-experience-examples.md'
import UserExperienceBestPractices from '../../includes/experience-notifications/user-experience-best-practices.md'
import ImplementationCreateNotificationString from '../../includes/experience-notifications/implementation-create-notification-string.md'
import DeliverySystem from '../../includes/experience-notifications/delivery-system.md'
import AnalyticsOverview from '../../includes/experience-notifications/analytics-overview.md'
import AnalyticsNotificationsSummary from '../../includes/experience-notifications/analytics-notification-summary.md'
import AnalyticsItemizedStats from '../../includes/experience-notifications/analytics-itemized-stats.md'
import Guidelines from '../../includes/experience-notifications/guidelines.md'

<Intro components={props.components} />

## Experience Eligibility Requirements

<Eligibility components={props.components} />

## User Experience

### Enabling Notifications

Users of age 13+ are eligible to receive Experience Notifications and can enable them by clicking the **Notify** button on your experience's details screen, or through an [in‑experience permission prompt](../../cloud-services/experience-notifications.md#prompting-users-to-enable-notifications) within your experience.

<UserExperienceEnabling components={props.components} />

### Receiving Notifications

<UserExperienceReceiving components={props.components} />

### Example Notifications

<UserExperienceExamples components={props.components} />

### Best Practices

<UserExperienceBestPractices components={props.components} />

## Implementation

Implementing Experience Notifications begins with [creating a notification string](#creating-a-notification-string). Once a notification string is set up, you can [send notifications](#sending-an-experience-notification) with optional [custom parameters](#customizing-notifications-using-parameters).

Alternatively, you can use the [Engine API](../../cloud-services/experience-notifications.md) to trigger notifications through server-side scripts.

### Creating a Notification String

<ImplementationCreateNotificationString components={props.components} />

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

<DeliverySystem components={props.components} />

## Analytics

<AnalyticsOverview components={props.components} />

### Notifications Summary

<AnalyticsNotificationsSummary components={props.components} />

### Itemized Stats

<AnalyticsItemizedStats components={props.components} />

## Guidelines

<Guidelines components={props.components} />
