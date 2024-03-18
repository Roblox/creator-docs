---
title: Player Invite Prompts
description: Invite Prompts are prompts sent to the player of an experience to invite their friends to join them.
---

In addition to common [promotion](../../production/promotion/index.md) methods for increasing your player base, you can implement **invite&nbsp;prompts** directly inside your experience, encouraging players to invite their friends and increase co-experience gameplay.

The invite prompt system features the following:

- **Dynamic Invitees** &mdash; Prompt players to invite multiple friends from a selection list, or invite one specific friend.
- **Launch Data** &mdash; Include optional [launch data](#including-launch-data) that can be read through `Class.Player:GetJoinData()` when the invited friend joins. Example use cases include routing invited friends to a coordinate location or personalizing the joining experience for the invitee.
- **Customizable Text** &mdash; Customize the [invite prompt](#prompting-an-invite) message and the [notification](#setting-notification-options) message. For example, an invite prompt for the player may read "Ask your friends to join the adventure!" and the notification message for the invited friend(s) may read "\{displayName\} wants you to join their adventure in \{experienceName\}!".

   <Tabs>
   <TabItem label="In-Experience Prompt">
     <figure>
     <img src="../../assets/promotion/invite-prompts/Prompt-Multiple-Friends-Custom-Message.png" width="840" height="403" />
   <figcaption><center>Prompt to invite multiple friends</center></figcaption>
     </figure>
     <figure>
     <img src="../../assets/promotion/invite-prompts/Prompt-Specific-Friend-Custom-Message.png" width="840" height="403" />
   <figcaption><center>Prompt to invite a specific friend</center></figcaption>
     </figure>
   </TabItem>
   <TabItem label="Invite Notification">
    <GridContainer numColumns="2">
      <figure>
      <img src="../../assets/promotion/invite-prompts/Notification-Lock-Screen-Custom-Message.png" width="403" height="840" />
    <figcaption><center>Notification on phone lock screen</center></figcaption>
      </figure>
      <figure>
      <img src="../../assets/promotion/invite-prompts/Notification-Roblox-App-Custom-Message.png" width="403" height="840" />
    <figcaption><center>Notification in Roblox app</center></figcaption>
      </figure>
     </GridContainer>
   </TabItem>
   </Tabs>

## Setting Invite Options

By default, an invite prompt for the player shows a menu of their friends with **Invite** buttons. To customize the prompt message, target a specific friend, or include launch data in the invite, you'll need to set up an `Class.ExperienceInviteOptions` object with the desired properties.

<table>
<thead>
  <tr>
    <th>Property</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.ExperienceInviteOptions.PromptMessage|PromptMessage`</td>
    <td>string</td>
    <td>Custom text shown on the invite prompt for the sending player, for example "Ask your friends to join the adventure!" for a multi-friend invite prompt, or "Invite this friend to join the adventure!" for a specific friend invite prompt. Note that if your custom invite prompt message is long enough to overflow the bounds of the UI, it will not be shown.</td>
  </tr>
  <tr>
    <td>`Class.ExperienceInviteOptions.InviteUser|InviteUser`</td>
    <td>number</td>
    <td>Roblox `Class.Player.UserId|UserId` of the specific friend to invite; if not provided, the player will be prompted to pick from a list of friends.</td>
  </tr>
  <tr>
    <td>`Class.ExperienceInviteOptions.InviteMessageId|InviteMessageId`</td>
    <td>string</td>
    <td>Asset ID that maps to a **Notification** asset type. This asset is used to store/localize a custom string for the invite notification that friends receive. See [Setting Notification Options](#setting-notification-options) for details.</td>
  </tr>
  <tr>
    <td>`Class.ExperienceInviteOptions.LaunchData|LaunchData`</td>
    <td>string</td>
    <td>Used to set a parameter in `Class.Player:GetJoinData()` when a friend joins from the invite notification. Maximum of 200 characters. See [Including Launch Data](#including-launch-data) for a usage example.</td>
  </tr>
</tbody>
</table>

<Tabs>
<TabItem label="Multiple Friends">

```lua title='LocalScript - Invite Multiple Friends' highlight='7-8'
local SocialService = game:GetService("SocialService")
local Players = game:GetService("Players")

local player = Players.LocalPlayer

-- Construct invite options with a custom prompt message
local inviteOptions = Instance.new("ExperienceInviteOptions")
inviteOptions.PromptMessage = "Ask your friends to join the adventure!"
```

</TabItem>
<TabItem label="Specific Friend">

```lua title='LocalScript - Invite Specific Friend' highlight='5,8-10'
local SocialService = game:GetService("SocialService")
local Players = game:GetService("Players")

local player = Players.LocalPlayer
local receiverUserID = 505306092

-- Construct invite options with friend's user ID and a custom prompt message
local inviteOptions = Instance.new("ExperienceInviteOptions")
inviteOptions.InviteUser = receiverUserID
inviteOptions.PromptMessage = "Invite this friend to join the adventure!"
```

</TabItem>
</Tabs>

## Setting Notification Options

By default, the invite notification that friends receive contains the sender's `Class.Player.DisplayName|DisplayName`, username, and the experience name. To customize the message, you can create a **Notification** asset on the [Creator Dashboard](https://create.roblox.com/dashboard/creations) and include its asset ID as a parameter of `Class.ExperienceInviteOptions`.

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations).
1. Similar to [badges](../../production/publishing/badges.md), notification strings are tied to a **specific experience**. Locate that experience's thumbnail and click on it.
1. In the left column, under **Engagement**, click **Notifications**.

   <img src="../../assets/creator-dashboard/Experience-Nav-Engagement-Notifications.png" width="330" />

1. In the center region, click the **Create a Notification String** button.
1. Fill in an identifier name (only visible to you) and the custom notification text. Note that you must include **\{experienceName\}** as a placeholder to identify the experience's name for invited friends, and you can optionally include the sender's `Class.Player.DisplayName|DisplayName` through the **\{displayName\}** placeholder.

   <Alert severity="success">
   <AlertTitle>Example Notifications</AlertTitle>
	 <ul>
	 <li>**\{displayName\}** wants you to join their adventure in **\{experienceName\}**!</li>
	 <li>**\{displayName\}** just cleared the sixth stage of **\{experienceName\}**. Can you?</li>
	 </ul>
	 </Alert>

1. When ready, click the **Create Notification String** button.
1. On the notifications page, click the **&ctdot;** button for the notification and select **Copy Asset ID**.

   <img src="../../assets/creator-dashboard/Notifications-Invite-Prompt-Copy-Asset-ID.png" width="780" />

1. In the `Class.ExperienceInviteOptions` object for the invite prompt, paste the asset ID as the value of the `Class.ExperienceInviteOptions.InviteMessageId|InviteMessageId` property.

   ```lua title='LocalScript - Invite Multiple Friends' highlight='7,8'
   local SocialService = game:GetService("SocialService")
   local Players = game:GetService("Players")

   local player = Players.LocalPlayer

   -- Construct invite options with friend's user ID
   local inviteOptions = Instance.new("ExperienceInviteOptions")
   inviteOptions.InviteMessageId = "ef0e0790-e2e8-4441-9a32-93f3a5783bf1"
   ```

## Prompting an Invite

To prompt an invite, you should first determine whether the player **can** send an invite, as the ability may vary depending on the platform or player. Once confirmed, you can display the invitation prompt to the player.

1. Call `Class.SocialService:CanSendGameInviteAsync()`, wrapped in a `Global.LuaGlobals.pcall()` since it's an asynchronous network call that may occasionally fail.
1. If the invite ability is confirmed, call `Class.SocialService:PromptGameInvite()` with the optional [invite options object](#setting-invite-options) as the second argument.

Once prompted, the player will see an on-screen prompt to invite multiple friends, or the specific friend defined in the [invite options object](#setting-invite-options). When the player then clicks the **Invite** button for one or more friends, those friends will receive a notification containing the sender's `Class.Player.DisplayName|DisplayName`, username, and the experience name. Notifications may be further customized as outlined in [Setting Notification Options](#setting-notification-options).

<Tabs>
<TabItem label="Multiple Friends">

```lua title='LocalScript - Invite Multiple Friends' highlight='8-10,16-18'
local SocialService = game:GetService("SocialService")
local Players = game:GetService("Players")

local player = Players.LocalPlayer

-- Function to check whether the player can send an invite
local function canSendGameInvite(sendingPlayer)
	local success, canSend = pcall(function()
		return SocialService:CanSendGameInviteAsync(sendingPlayer)
	end)
	return success and canSend
end

local canInvite = canSendGameInvite(player)
if canInvite then
	local success, errorMessage = pcall(function()
		SocialService:PromptGameInvite(player)
	end)
end
```

</TabItem>
<TabItem label="Specific Friend">

```lua title='LocalScript - Invite Specific Friend' highlight='5,8,9,13-15,21-23'
local SocialService = game:GetService("SocialService")
local Players = game:GetService("Players")

local player = Players.LocalPlayer
local receiverUserID = 505306092

-- Construct invite options with friend's user ID
local inviteOptions = Instance.new("ExperienceInviteOptions")
inviteOptions.InviteUser = receiverUserID

-- Function to check whether the player can send an invite
local function canSendGameInvite(sendingPlayer)
	local success, canSend = pcall(function()
		return SocialService:CanSendGameInviteAsync(sendingPlayer, receiverUserID)
	end)
	return success and canSend
end

local canInvite = canSendGameInvite(player)
if canInvite then
	local success, errorMessage = pcall(function()
		SocialService:PromptGameInvite(player, inviteOptions)
	end)
end
```

</TabItem>
</Tabs>

## Including Launch Data

To further improve in-experience cooperation or to incentivize player invites, you can include **launch&nbsp;data** in an invite prompt, useful for scenarios such as routing invited friends to a coordinate location or personalizing the joining experience for the invitee.

1. When [prompting an invite](#prompting-an-invite), include an `Class.ExperienceInviteOptions` object with relevant data that will be used when the friend joins the experience, for example the sender's `Class.Player.UserId`, the ID of a [badge](../../production/publishing/badges.md) to award to the friend upon joining, or a coordinate location to spawn the friend at. If you need to compile multiple pieces of data, encode the data using `Class.HttpService:JSONEncode()|JSONEncode()`.

   <Tabs>
   <TabItem label="Multiple Friends">

   ```lua title='LocalScript - Invite Multiple Friends' highlight='1,7-11,14-15,27-29'
   local HttpService = game:GetService("HttpService")
   local SocialService = game:GetService("SocialService")
   local Players = game:GetService("Players")

   local player = Players.LocalPlayer

   local data = {
   	senderUserID = player.UserId,
   	spawnLocation = {12, 48, 205.5}
   }

   local launchData = HttpService:JSONEncode(data)

   -- Construct invite options with launch data
   local inviteOptions = Instance.new("ExperienceInviteOptions")
   inviteOptions.LaunchData = launchData

   -- Function to check whether the player can send an invite
   local function canSendGameInvite(sendingPlayer)
   	local success, canSend = pcall(function()
   		return SocialService:CanSendGameInviteAsync(sendingPlayer)
   	end)
   	return success and canSend
   end

   local canInvite = canSendGameInvite(player)
   if canInvite then
   	local success, errorMessage = pcall(function()
   		SocialService:PromptGameInvite(player, inviteOptions)
   	end)
   end
   ```

   </TabItem>
   <TabItem label="Specific Friend">

   ```lua title='LocalScript - Invite Specific Friend' highlight='1,6,8-12,15-17,29-31'
   local HttpService = game:GetService("HttpService")
   local SocialService = game:GetService("SocialService")
   local Players = game:GetService("Players")

   local player = Players.LocalPlayer
   local receiverUserID = 505306092

   local data = {
   	senderUserID = player.UserId,
   	spawnLocation = {12, 48, 205.5}
   }

   local launchData = HttpService:JSONEncode(data)

   -- Construct invite options with friend's user ID and launch data
   local inviteOptions = Instance.new("ExperienceInviteOptions")
   inviteOptions.InviteUser = receiverUserID
   inviteOptions.LaunchData = launchData

   -- Function to check whether the player can send an invite
   local function canSendGameInvite(sendingPlayer)
   	local success, canSend = pcall(function()
   		return SocialService:CanSendGameInviteAsync(sendingPlayer, receiverUserID)
   	end)
   	return success and canSend
   end

   local canInvite = canSendGameInvite(player)
   if canInvite then
   	local success, errorMessage = pcall(function()
   		SocialService:PromptGameInvite(player, inviteOptions)
   	end)
   end
   ```

   </TabItem>
   </Tabs>

   <Alert severity="warning">
   Always remember to include `inviteOptions` containing the launch data (maximum of 200 characters) as the second parameter of `Class.SocialService:PromptGameInvite()|PromptGameInvite()`.
   </Alert>

1. For incoming friends who join via the notification, check for launch data on the server side through `Class.Player:GetJoinData()`. If you encode multiple pieces of data into JSON for the invite prompt, remember to decode it with `Class.HttpService:JSONDecode()|JSONDecode()`.

   ```lua title='Script - Using Invite Launch Data' highlight='1,5-6,8-10'
   local HttpService = game:GetService("HttpService")
   local Players = game:GetService("Players")

   local ATTEMPT_LIMIT = 10
   local RETRY_DELAY = 1

   local function onPlayerAdded(player)
   	local launchData

   	for i = 1, ATTEMPT_LIMIT do
   		task.wait(RETRY_DELAY)
   		local joinData = player:GetJoinData()
   		if joinData.LaunchData ~= "" then
   			launchData = joinData.LaunchData
   			break
   		end
   	end

   	if launchData then
   		local data = HttpService:JSONDecode(launchData)
   		print(data.senderUserID)
   		print(data.spawnLocation)
   	else
   		warn("No launch data received!")
   	end
   end

   Players.PlayerAdded:Connect(onPlayerAdded)
   ```

   <Alert severity="info">
   Launch data can take a few seconds to appear after the friend joins from the invite. As shown in the code sample above, it's recommended that you wait until the launch data arrives before attempting to use it.
   </Alert>

1. If the launch data exists, you can use it for a wide variety of design scenarios, including:

   - Spawn the incoming friend at the beginning of a challenging obstacle course that the sender just completed, based on a coordinate location passed through the launch data.
   - Check if the **sender** is in the place, based on their `Class.Player.UserId` in the launch data, and teleport the friend's character near their character.
