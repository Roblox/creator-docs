---
title: Player invite prompts
description: Invite prompts are prompts sent to the player of an experience to invite their connections to join them.
---

In addition to common [promotion](../../production/promotion/index.md) methods for increasing your player base, you can implement **invite prompts** directly inside your experience, encouraging players to invite their connections and increase co-experience gameplay.

The invite prompt system features the following:

- **Dynamic Invitees** &mdash; Prompt players to invite multiple connections from a selection list, or invite one specific connection.
- **Launch Data** &mdash; Include optional [launch data](#include-launch-data) that can be read through `Class.Player:GetJoinData()` when the invited connection joins. Example use cases include routing invited connections to a coordinate location or personalizing the joining experience for the invitee.
- **Customizable Text** &mdash; Customize the [invite prompt](#prompt-an-invite) message and the [notification](#set-notification-options) message. For example, an invite prompt for the player may read "Ask your connections to join the adventure!" and the notification message for the invited connection(s) may read "\{displayName\} wants you to join their adventure in \{experienceName\}!".

You can also track and reward inviters and invitees using the [Connection Invite Reward System](./referral-system.md).

   <Tabs>
   <TabItem label="In-experience prompt">
     <figure>
     <img src="../../assets/promotion/invite-prompts/Invite-From-Experience.png" width="840" height="403" />
     </figure>
   </TabItem>
   <TabItem label="Invite notification">
    <GridContainer numColumns="2">
      <figure>
      <img src="../../assets/promotion/invite-prompts/Invite-App-Notification-Stream.png" width="403" height="403" />
    <figcaption><center>Notification in Roblox app</center></figcaption>
      </figure>
			<figure>
      <img src="../../assets/promotion/invite-prompts/Invite-Phone-Lock-Screen.png" width="403" height="403" />
    <figcaption><center>Notification on phone lock screen</center></figcaption>
      </figure>
     </GridContainer>
   </TabItem>
   </Tabs>

## Set invite options

By default, an invite prompt for the player shows a menu of their connections with **Invite** buttons. To customize the prompt message, target a specific connection, or include launch data in the invite, you'll need to set up an `Class.ExperienceInviteOptions` object with the desired properties.

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
    <td>Custom text shown on the invite prompt for the sending player, for example "Ask your connections to join the adventure!" for a multi-connection invite prompt, or "Invite this connection to join the adventure!" for a specific connection invite prompt. Note that if your custom invite prompt message is long enough to overflow the bounds of the UI, it will not be shown.</td>
  </tr>
  <tr>
    <td>`Class.ExperienceInviteOptions.InviteUser|InviteUser`</td>
    <td>number</td>
    <td>Roblox `Class.Player.UserId|UserId` of the specific connection to invite; if not provided, the player will be prompted to pick from a list of connections.</td>
  </tr>
  <tr>
    <td>`Class.ExperienceInviteOptions.InviteMessageId|InviteMessageId`</td>
    <td>string</td>
    <td>Asset ID that maps to a **Notification** asset type. This asset is used to store/localize a custom string for the invite notification that connections receive. See [Setting Notification Options](#set-notification-options) for details.</td>
  </tr>
  <tr>
    <td>`Class.ExperienceInviteOptions.LaunchData|LaunchData`</td>
    <td>string</td>
    <td>Used to set a parameter in `Class.Player:GetJoinData()` when a connection joins from the invite notification. Maximum of 200 characters. See [Include launch data](#include-launch-data) for a usage example.</td>
  </tr>
</tbody>
</table>

<Tabs>
<TabItem label="Multiple connections">

```lua title="LocalScript - Invite Multiple Connections" highlight="7-8"
local SocialService = game:GetService("SocialService")
local Players = game:GetService("Players")

local player = Players.LocalPlayer

-- Construct invite options with a custom prompt message
local inviteOptions = Instance.new("ExperienceInviteOptions")
inviteOptions.PromptMessage = "Ask your connections to join the adventure!"
```

</TabItem>
<TabItem label="Specific connection">

```lua title="LocalScript - Invite Specific Connection" highlight="5,8-10"
local SocialService = game:GetService("SocialService")
local Players = game:GetService("Players")

local player = Players.LocalPlayer
local receiverUserID = 505306092

-- Construct invite options with connection's user ID and a custom prompt message
local inviteOptions = Instance.new("ExperienceInviteOptions")
inviteOptions.InviteUser = receiverUserID
inviteOptions.PromptMessage = "Invite this connection to join the adventure!"
```

</TabItem>
</Tabs>

## Set notification options

By default, the invite notification that connections receive contains the sender's `Class.Player.DisplayName|DisplayName`, username, and the experience name. To customize the message, you can create a **Notification** asset on the [Creator Dashboard](https://create.roblox.com/dashboard/creations) and include its asset ID as a parameter of `Class.ExperienceInviteOptions`.

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations).
1. Similar to [badges](../../production/publishing/badges.md), notification strings are tied to a **specific experience**. Locate that experience's thumbnail and click on it.
1. In the left column, under **Engagement**, click **Notifications**.
1. In the center region, click the **Create a Notification String** button.
1. Fill in an identifier name (only visible to you) and the custom notification text. Note that you must include **\{experienceName\}** as a placeholder to identify the experience's name for invited connections, and you can optionally include the sender's `Class.Player.DisplayName|DisplayName` through the **\{displayName\}** placeholder.

   Example notification strings:

   - <Typography variant="subtitle2" color="primary">\{displayName\} wants you to join their adventure in \{experienceName\}!</Typography>
   - <Typography variant="subtitle2" color="primary">\{displayName\} just cleared the sixth stage of \{experienceName\}. Can you?</Typography>

1. When ready, click the **Create Notification String** button.
1. On the notifications page, in the table of notifications, click the **&ctdot;** button in the **Actions** column and select **Copy Asset ID**.
1. In the `Class.ExperienceInviteOptions` object for the invite prompt, paste the asset ID as the value of the `Class.ExperienceInviteOptions.InviteMessageId|InviteMessageId` property.

   ```lua title="LocalScript - Invite Multiple Connections" highlight="7,8"
   local SocialService = game:GetService("SocialService")
   local Players = game:GetService("Players")

   local player = Players.LocalPlayer

   -- Construct invite options with connection's user ID
   local inviteOptions = Instance.new("ExperienceInviteOptions")
   inviteOptions.InviteMessageId = "ef0e0790-e2e8-4441-9a32-93f3a5783bf1"
   ```

## Prompt an invite

To prompt an invite, you should first determine whether the player **can** send an invite, as the ability may vary depending on the platform or player. Once confirmed, you can display the invitation prompt to the player.

1. Call `Class.SocialService:CanSendGameInviteAsync()`, wrapped in a `Global.LuaGlobals.pcall()` since it's an asynchronous network call that may occasionally fail.
1. If the invite ability is confirmed, call `Class.SocialService:PromptGameInvite()` with the optional [invite options object](#set-invite-options) as the second argument.

Once prompted, the player will see an on-screen prompt to invite multiple connections, or the specific connection defined in the [invite options object](#set-invite-options). When the player then clicks the **Invite** button for one or more connections, those connections will receive a notification containing the sender's `Class.Player.DisplayName|DisplayName`, username, and the experience name. Notifications may be further customized as outlined in [Set notification options](#set-notification-options).

<Tabs>
<TabItem label="Multiple Connections">

```lua title="LocalScript - Invite Multiple Connections" highlight="8-10,16-18"
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
	SocialService:PromptGameInvite(player)
end
```

</TabItem>
<TabItem label="Specific Connection">

```lua title="LocalScript - Invite Specific Connection" highlight="5,8,9,13-15,21-23"
local SocialService = game:GetService("SocialService")
local Players = game:GetService("Players")

local player = Players.LocalPlayer
local receiverUserID = 505306092

-- Construct invite options with connection's user ID
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
	SocialService:PromptGameInvite(player, inviteOptions)
end
```

</TabItem>
</Tabs>

## Include launch data

To further improve in-experience cooperation or to incentivize player invites, you can include **launch data** in an invite prompt, useful for scenarios such as routing invited connections to a coordinate location or personalizing the joining experience for the invitee.

1. When [prompting an invite](#prompt-an-invite), include an `Class.ExperienceInviteOptions` object with relevant data that will be used when the connection joins the experience, for example the sender's `Class.Player.UserId`, the ID of a [badge](../../production/publishing/badges.md) to award to the connection upon joining, or a coordinate location to spawn the connection at. If you need to compile multiple pieces of data, encode the data using `Class.HttpService:JSONEncode()|JSONEncode()`.

   <Tabs>
   <TabItem label="Multiple Connections">

   ```lua title="LocalScript - Invite Multiple Connections" highlight="1,7-11,14-15,27-29"
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
   	SocialService:PromptGameInvite(player, inviteOptions)
   end
   ```

   </TabItem>
   <TabItem label="Specific Connection">

   ```lua title="LocalScript - Invite Specific Connection" highlight="1,6,8-12,15-17,29-31"
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

   -- Construct invite options with connection's user ID and launch data
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
   	SocialService:PromptGameInvite(player, inviteOptions)
   end
   ```

   </TabItem>
   </Tabs>

   <Alert severity="warning">
   Always remember to include `inviteOptions` containing the launch data (maximum of 200 characters) as the second parameter of `Class.SocialService:PromptGameInvite()|PromptGameInvite()`.
   </Alert>

1. For incoming connections who join via the notification, check for launch data on the server side through `Class.Player:GetJoinData()`. If you encode multiple pieces of data into JSON for the invite prompt, remember to decode it with `Class.HttpService:JSONDecode()|JSONDecode()`.

   ```lua title="Script - Using Invite Launch Data" highlight="1,5-6,8-10"
   local HttpService = game:GetService("HttpService")
   local Players = game:GetService("Players")

   local ATTEMPT_LIMIT = 10
   local RETRY_DELAY = 1

   local function onPlayerAdded(player)
   	local launchData

   	for _ = 1, ATTEMPT_LIMIT do
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
   Launch data can take a few seconds to appear after the connection joins from the invite. As shown in the code sample above, it's recommended that you wait until the launch data arrives before attempting to use it.
   </Alert>

1. If the launch data exists, you can use it for a wide variety of design scenarios, including:

   - Spawn the incoming connection at the beginning of a challenging obstacle course that the sender just completed, based on a coordinate location passed through the launch data.
   - Check if the **sender** is in the place, based on their `Class.Player.UserId` in the launch data, and teleport the connection's character near their character.
