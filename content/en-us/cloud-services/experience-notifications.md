---
title: Experience Notifications
description: Experience Notifications are a way for users to keep up with their favorite experiences through timely, personalized notifications.
---

import Intro from '../includes/experience-notifications/intro.md'
import Eligibility from '../includes/experience-notifications/eligibility.md'
import UserExperienceEnabling from '../includes/experience-notifications/user-experience-enabling.md'
import UserExperienceReceiving from '../includes/experience-notifications/user-experience-receiving.md'
import UserExperienceExamples from '../includes/experience-notifications/user-experience-examples.md'
import UserExperienceBestPractices from '../includes/experience-notifications/user-experience-best-practices.md'
import ImplementationCreateNotificationString from '../includes/experience-notifications/implementation-create-notification-string.md'
import DeliverySystem from '../includes/experience-notifications/delivery-system.md'
import AnalyticsOverview from '../includes/experience-notifications/analytics-overview.md'
import AnalyticsNotificationsSummary from '../includes/experience-notifications/analytics-notification-summary.md'
import AnalyticsItemizedStats from '../includes/experience-notifications/analytics-itemized-stats.md'
import Guidelines from '../includes/experience-notifications/guidelines.md'

<Intro components={props.components} />

## Experience Eligibility Requirements

<Eligibility components={props.components} />

## User Experience

### Enabling Notifications

Users of age 13+ are eligible to receive Experience Notifications and can enable them by clicking the **Notify** button on your experience's details screen, or through an [in‑experience permission prompt](#prompting-users-to-enable-notifications) within your experience.

<UserExperienceEnabling components={props.components} />

### Receiving Notifications

<UserExperienceReceiving components={props.components} />

### Example Notifications

<UserExperienceExamples components={props.components} />

### Best Practices

<UserExperienceBestPractices components={props.components} />

## Implementation

Implementing Experience Notifications begins with [creating a notification string](#creating-a-notification-string) and including the [package](#including-the-package) in your project. Once these are set up, you can [send notifications](#sending-an-experience-notification) with optional [custom parameters](#customizing-notifications-using-parameters).

Alternatively, you can use the [Open Cloud API](../cloud/open-cloud/experience-notifications.md) to trigger notifications through freeform API requests.

### Creating a Notification String

<ImplementationCreateNotificationString components={props.components} />

### Including the Package

To implement Experience Notifications, you must obtain the Lua package from the [Creator Store](../production/publishing/creator-store.md).

1. From the [View](../studio/view-tab.md) tab, open the [Toolbox](../projects/assets/toolbox.md) and select the **Creator Store** tab.

   <img src="../assets/studio/general/View-Tab-Toolbox.png" width="776" alt="Toolbox toggle button in Studio" />

   <img src="../assets/studio/toolbox/Creator-Store-Tab.png" width="360" />

1. Make sure the **Models** sorting is selected, then click the **See&nbsp;All** button for **Categories**.

   <img src="../assets/studio/toolbox/Creator-Store-Categories-See-All.png" width="360" />

1. Locate and click the **Dev Modules** tile.

   <img src="../assets/studio/toolbox/Creator-Store-Categories-Dev-Modules.png" width="200" />

1. Locate the **Open Cloud** module and click it, or drag‑and‑drop it into the 3D view.

   <img src="../assets/open-cloud/experience-notifications/Toolbox-Package.png" width="143" />

1. In the [Explorer](../studio/explorer.md) window, move the entire **OpenCloud** model into **ServerScriptService**.

   <img src="../assets/open-cloud/experience-notifications/Move-Package.png" width="320" />

### Sending an Experience Notification

Once you've [created a notification string](#creating-a-notification-string) and included the [package](#including-the-package) in your project, you can send notifications from server‑side scripts.

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

### Prompting Users to Enable Notifications

To encourage users to enable notifications for your experience, you can display an in‑experience permission prompt to users age 13+ using the `Class.ExperienceNotificationService:PromptOptIn()` method.

<img src="../assets/promotion/misc/In-Experience-Enable-Notifications.png" width="768" alt="The in-experience permission prompt encourages users to enable notifications" />

You can trigger the prompt in any suitable context within your experience that warrants a future notification. The prompt's text is not customizable and is standardized across all experiences.

The modal will **not** appear if the user:

- Is under the age of 13.
- Has already enabled notifications for your experience.
- Has already seen the permission prompt for your experience in the past 30 days.

To prompt users to enable notifications, you should first determine whether the user is eligible. Once confirmed, you can display the permission prompt to the user.

1. Call `Class.ExperienceNotificationService:CanPromptOptInAsync()`, wrapped in a `Global.LuaGlobals.pcall|pcall()` since it's an asynchronous network call that may occasionally fail.
2. If the user can be prompted, call `Class.ExperienceNotificationService:PromptOptIn()`.

```lua title="LocalScript - Notification Permission Prompt Implementation"
local ExperienceNotificationService = game:GetService("ExperienceNotificationService")

-- Function to check whether the player can be prompted to enable notifications
local function canPromptOptIn()
	local success, canPrompt = pcall(function()
		return ExperienceNotificationService:CanPromptOptInAsync()
	end)
	return success and canPrompt
end

local canPrompt = canPromptOptIn()
if canPrompt then
	local success, errorMessage = pcall(function()
		ExperienceNotificationService:PromptOptIn()
	end)
end

-- Listen to opt-in prompt closed event 
ExperienceNotificationService.OptInPromptClosed:Connect(function()
	print("Opt-in prompt closed")
end)
```

### Including Launch and Analytics Data

To further improve user experience, you can include **launch data** in the notification, useful for scenarios such as routing users to a coordinate location or personalizing the joining experience. Additionally, you can include [analytics](#analytics) data to segment the performance of different categories of notifications. Please also refer to the [Player Invite Prompts](../production/promotion/invite-prompts.md#including-launch-data) example on how launch data can be set and used.

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

<DeliverySystem components={props.components} />

## Analytics

<AnalyticsOverview components={props.components} />

### Notifications Summary

<AnalyticsNotificationsSummary components={props.components} />

### Itemized Stats

<AnalyticsItemizedStats components={props.components} />

## Guidelines

<Guidelines components={props.components} />

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
