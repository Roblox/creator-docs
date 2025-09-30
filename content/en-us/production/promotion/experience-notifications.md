---
title: Experience notifications
description: Send experience notifications within your experience with Luau APIs. Experience notifications are a way for users to keep up with their favorite experiences through timely, personalized notifications.
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

The experience notification system features the following:

- **Customizable notifications with parameters** &mdash; Full flexibility to customize the [notification message](#create-a-notification-string) with parameters, for example:

	<p><Chip label="Your gold goose egg has hatched!" size="large" color="primary" variant="outlined" /></p>
	<p><Chip label="Allie @LaterSk8er1 just beat your record on the Tokyo Tour track!" size="large" color="primary" variant="outlined" /></p>

- **Launch Data** &mdash; Include optional [launch data](#include-launch-and-analytics-data) that can be read through `Class.Player:GetJoinData()` when the notification recipient joins. This could involve routing a user to a coordinate location or personalizing their joining experience.

- **Analytics Support** &mdash; Track your reachable audience and the performance of your notifications in the [Creator Dashboard](https://create.roblox.com/dashboard/creations).

## Eligibility requirements

<Eligibility components={props.components} />

## Usage guidelines

<Guidelines components={props.components} />

## Implementation

Implementing experience notifications begins with [creating a notification string](#create-a-notification-string) and including the [package](#include-the-package) in your project. Once these are set up, you can [send notifications](#send-an-experience-notification) with optional [custom parameters](#customize-notifications-using-parameters).

Alternatively, you can use the [Open Cloud API](../../cloud/guides/experience-notifications.md) to trigger notifications through freeform API requests.

### Create a notification string

<ImplementationCreateNotificationString components={props.components} />

### Include the package

To implement experience notifications, you must obtain the Luau package from the [Creator Store](../../production/creator-store.md).

1. From Studio's **Window** menu or **Home** tab toolbar, open the [Toolbox](../../projects/assets/toolbox.md) and select the **Creator Store** tab.

   <img src="../../assets/studio/toolbox/Creator-Store-Tab.png" width="360" />

1. Make sure the **Models** sorting is selected, then click the **See&nbsp;All** button for **Categories**.

   <img src="../../assets/studio/toolbox/Creator-Store-Categories-See-All.png" width="360" />

1. Locate and click the **Packages** tile.

1. Locate the **Open Cloud** module and click it, or drag‑and‑drop it into the 3D view.

   <img src="../../assets/open-cloud/experience-notifications/Toolbox-Package.png" width="143" />

1. In the [Explorer](../../studio/explorer.md) window, move the entire **OpenCloud** model into **ServerScriptService**.

### Send an experience notification

Once you've [created a notification string](#create-a-notification-string) and included the [package](#include-the-package) in your project, you can send notifications from server‑side scripts. Notifications will be delivered to [opted-in](https://en.help.roblox.com/hc/en-us/articles/24769602332692-Out-of-Experience-Notifications) users age 13+ through their Roblox notification stream, at which point they can join the experience directly via the **Join** button on the notification and spawn according to your [launch data](#include-launch-and-analytics-data).

<img src="../../assets/open-cloud/experience-notifications/Notification-Stream.png" width="393" alt="Notifications stream on the Roblox app" />

To send a basic notification to a specific user, include the [notification string](#create-a-notification-string) asset ID in the payload's `messageId` field, then call the [createUserNotification](#createusernotification) function with the recipient's `Class.Player.UserId` and the request data.

```lua title="Send an experience notification"
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

### Customize notifications using parameters

To customize the notification for each recipient, you can include **parameters** in the [notification string](#create-a-notification-string), then customize the parameters when calling the API. For example, you can define the notification string as:

<p><Chip label="{userId-friend} beat your high score by {points} points! Time to level up?" size="large" color="primary" variant="outlined" /></p>

Then, set the `userId-friend` and `points` parameters in the script:

```lua title="Customize Notification Using Parameters"
local ServerScriptService = game:GetService("ServerScriptService")

local OCUserNotification = require(ServerScriptService.OpenCloud.V2.UserNotification)
local recipientPlayerID = 505306092

local userIdFriendParam = {int64Value = 3702832553}
local pointsParam = {stringValue = "5"}

-- In the payload, "messageId" is the value of the notification asset ID
-- In this example, the notification string is "{userId-friend} beat your high score by {points} points! Time to level up?"
local userNotification = {
	payload = {
		messageId = "ef0e0790-e2e8-4441-9a32-93f3a5783bf1",
		type = "MOMENT",
		parameters = {
			["userId-friend"] = userIdFriendParam,
			["points"] = pointsParam
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

### Prompt users to enable notifications

To encourage users to enable notifications for your experience, you can display an in‑experience permission prompt to users age 13+ using the `Class.ExperienceNotificationService:PromptOptIn()` method.

<img src="../../assets/promotion/misc/In-Experience-Enable-Notifications.png" width="768" alt="The in-experience permission prompt encourages users to enable notifications" />

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

### Include launch and analytics data

To further improve user experience, you can include **launch data** in the notification, useful for scenarios such as routing users to a coordinate location or personalizing the joining experience. Additionally, you can include [analytics](#analytics) data to segment the performance of different categories of notifications. Please also refer to the [Player invite prompts](../../production/promotion/invite-prompts.md#include-launch-data) example on how launch data can be set and used.

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

## Delivery system

<DeliverySystem components={props.components} />

## Analytics

<AnalyticsOverview components={props.components} />

### Notifications summary

<AnalyticsNotificationsSummary components={props.components} />

### Itemized stats

<AnalyticsItemizedStats components={props.components} />

## API reference

### Functions

#### createUserNotification

<Typography variant="body1" color="primary"><b>createUserNotification (</b>userId : [number](../../luau/numbers.md), userNotification : [UserNotification](#usernotification)<b>)</b> : [UserNotificationResult](#usernotificationresult)</Typography><br />

Sends a notification from a server‑side script. Requires the recipient's `Class.Player.UserId` and a [UserNotification](#usernotification). Returns a [UserNotificationResult](#usernotificationresult).

```lua title="Send an experience notification"
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
    <td>A table of parameters used to render a notification message template. See [Customize notifications using parameters](#customize-notifications-using-parameters) for example usage.</td>
  </tr>
	<tr>
    <td>`joinExperience`</td>
		<td>table</td>
    <td>A call-to-action that represents joining an experience. Currently supports a `launchData` key‑value pair which represents arbitrary data available to an experience when a user joins the experience from the notification; this value is limited to a maximum of 200 bytes. See [Include launch and analytics data](#include-launch-and-analytics-data) for example usage.</td>
  </tr>
	<tr>
    <td>`analyticsData`</td>
		<td>table</td>
    <td>Data for how analytics are reported. Currently supports a `category` key‑value pair which represents the notification category, used to group analytics data. See [Include launch and analytics data](#include-launch-and-analytics-data) for example usage.</td>
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
