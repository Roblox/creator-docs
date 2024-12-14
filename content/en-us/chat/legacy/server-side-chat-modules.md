---
title: Server-Side Chat Modules
description: Server-side chat modules allow you to extend and customize the deprecated legacy chat.
comments: |
  1. This guide is intentionally not available in the nav list, but still searchable for users who want to use the legacy chat system.
---

<Alert severity="error">
  This guide covers server-side chat modules of the legacy chat system, which is deprecated and no longer onboarding new users in favor of `Class.TextChatService` with easier and more modern chat settings. If you are using the default chat system powered by `Class.TextChatService` , see <a href="../../chat/in-experience-text-chat.md">In-Experience Text Chat</a>.
</Alert>

You can use the following chat modules to support server-side behaviors of the [Legacy Chat System](../../chat/legacy/legacy-chat-system.md#message-creator-modules) including:

- [ChatService](#chatservice): A singleton that manages all other chat modules.
- [ChatSpeaker](#chatspeaker): An entity that may create messages in a ChatChannel; each `Player` will automatically have a ChatSpeaker and bots may chat by creating ChatSpeakers.
- [ChatMessage](#chatmessage): A container for content a ChatSpeaker sends to a ChatChannel; contains metadata used to format the message or add extra functionality to commands.
- [ChatChannel](#chatchannel): A channel by which ChatSpeakers can exchange ChatMessage; also used for team chat and whisper chat.

## ChatService

**ChatService** is a singleton object that handles the server-side behavior of the Lua Chat System, such as [ChatChannels](#chatchannel) and [ChatSpeakers](#chatspeaker).

All `ModuleScript` s within the **ChatModules** folder should return a function, and that function will be called with the ChatService singleton.

<Alert severity="warning">
ChatService chat module is different from the `Class.Chat` engine service hosting the Lua code responsible for running the Legacy Chat System.
</Alert>

### Methods

#### AddChannel

- **Parameters:** `Library.string`: `channelName`
- **Description:** Creates a ChatChannel object with the given name and returns it.
- **Returns:** [ChatChannel](#chatchannel)

#### RemoveChannel

- **Parameters:** `Library.string`: `channelName`
- **Description:** Remove a channel with the given name
- **Returns:** void

#### GetChannel

- **Parameters:** `Library.string`: `channelName`
- **Description:** Returns the channel with the given name, or nil if it does not exist.
- **Returns:** [ChatChannel](#chatchannel)

#### AddSpeaker

- **Parameters:** `Library.string`: `speakerName`
- **Description:** Create and add a speaker to the chat with the given name, then returns it.
- **Returns:** [ChatSpeaker](#chatspeaker)

#### RemoveSpeaker

- **Parameters:** `Library.string`: `speakerName`
- **Description:** Removes the speaker from the chat with the given name.
- **Returns:** void

#### GetSpeaker

- **Parameters:** `Library.string`: `speakerName`
- **Description:** Returns the speaker with the given name, or nil if it doesn't exist.
- **Returns:** [ChatSpeaker](#chatspeaker)

#### GetChannelList

- **Parameters:** none
- **Description:** Returns a list of the names of all non-private channels in the chat.
- **Returns:** array\<`Library.string`>

#### GetAutoJoinChannelList

- **Parameters:** none
- **Description:** Returns a list of the names of all channels in the chat with AutoJoin set to true.
- **Returns:** array\<`Library.string`>

#### RegisterFilterMessageFunction

- **Parameters:** `Library.string`: `functionId` , [function](../../luau/functions.md): `func`
- **Description:** Registers a filter function to the chat identified by `functionId` . Any changes to the message will persist and be displayed when the message makes it through all of the other filter functions. This function is passed the speaker's name, the message object, and the channel the message originated in.
- **Returns:** void
- **Example:**

```lua
-- Paste this example into a ModuleScript within the ChatModules folder.
-- This example filters a keyword, and if successful, sets the chatColor of the message
local functionId = "greenText"
local keyword = "#green"
local chatColor = Color3.new(0, 1, 0) -- green

local function doFilter(speaker, messageObject, channelName)
	-- Check if the message contains the keyword
	local start, finish = string.find(messageObject.Message, keyword)
	if start and finish then
		-- Remove (filter) the keyword from the message, also setting the ChatColor
		messageObject.Message = string.gsub(messageObject.Message, keyword, "")
		messageObject.ExtraData.ChatColor = chatColor
	end
end

local function runChatModule(ChatService)
	ChatService:RegisterFilterMessageFunction(functionId, doFilter)
end

return runChatModule
```

#### UnregisterFilterMessageFunction

- **Parameters:** `Library.string`: `functionId`
- **Description:** Unregisters a filter function (registered by RegisterFilterMessageFunction) given its identifier, `functionId` .
- **Returns:** void

#### RegisterProcessCommandsFunction

- **Parameters:** `Library.string`: `functionId` , [function](../../luau/functions.md): `func`
- **Description:** Registers a process command function to the chat identified by `functionId` . Before a message is filtered, it will pass through `func` (and other functions registered by this). The function `func` should check whether the message invokes a command. If so, perform the action of the command and return true. Returning true indicates the message was indeed a command and should not be displayed. The function can be unregistered using UnregisterProcessCommandsFunction.
- **Returns:** void
- **Example:**

```lua
-- Paste this example into a ModuleScript within the ChatModules folder.
local functionId = "getPizza"
local command = "/pizza"
local toolId = 22596452 -- Pepperoni pizza slice gear
local function processCommand(speakerName, message, channelName)
	if string.sub(message, 1, command:len()) == command then
		local model = game:GetService("InsertService"):LoadAsset(toolId)
		local tool = model:GetChildren()[1]
		local speaker = ChatService:GetSpeaker(speakerName)
		local player = speaker:GetPlayer()
		tool.Parent = player.Backpack
		return true
	end
	return false
end

local function runChatModule(ChatService)
	ChatService:RegisterProcessCommandsFunction(functionId, processCommand)
end

return runChatModule
```

#### UnregisterProcessCommandsFunction

- **Parameters:** `Library.string`: `functionId`
- **Description:** Unregisters a command processor (registered by [RegisterProcessCommandsFunction](#registerprocesscommandsfunction)) given the identifier, `functionId` .
- **Returns:** void

### Events

#### ChannelAdded

- **Parameters:** `Library.string`: `channelName`
- **Description:** Fires when a channel is added to the chat.

#### ChannelRemoved

- **Parameters:** `Library.string`: `channelName`
- **Description:** Fires when a channel is removed from the chat.

#### SpeakerAdded

- **Parameters:** `Library.string`: `speakerName`
- **Description:** Fires when a speaker is added to the chat.

#### SpeakerRemoved

- **Parameters:** `Library.string`: `speakerName`
- **Description:** Fires when a speaker is removed from the chat.

## ChatSpeaker

A **ChatSpeaker** is the representation of one entity that may speak in a [ChatChannel](#chatchannel). Each `Player` connected to the game automatically has an associated ChatSpeaker. Additional ChatSpeakers may be constructed for non-users (such as announcers or hint messages) using [ChatService:AddSpeaker()](#addspeaker).

### Properties

#### Name

- **Type:** `Library.string`: `Name`
- **Description:** The name of the speaker, used in referencing this speaker while calling many other functions.

### Methods

#### JoinChannel

- **Parameters:** `Library.string`: `channelName`
- **Description:** Adds the speaker to the channel with the given `channelName`
- **Returns:** void

#### LeaveChannel

- **Parameters:** `Library.string`: `channelName`
- **Description:** Removes the speaker from the channel with the given `channelName`
- **Returns:** void

#### GetChannelList

- **Parameters:** None
- **Description:** Returns a list of the names of all the channels the speaker is in.
- **Returns:** array\<`Library.string`>

#### IsInChannel

- **Parameters:** `Library.string`: `channelName`
- **Description:** Returns whether the speaker is in the channel with the given `channelName` .
- **Returns:** [bool](../../luau/booleans.md)

#### SayMessage

- **Parameters:** `Library.string`: `message` , `Library.string`: `channelName` , dictionary\<`Library.string`, Variant> `extraData`
- **Description:** Causes the speaker to say `message` and return the [ChatMessage](#chatmessage) object created in doing so.
- **Returns:** [ChatMessage](#chatmessage)

#### SendMessage

- **Parameters:** `Library.string`: `message` , `Library.string`: `channel` , `Library.string`: `fromSpeaker`
- **Description:** Sends a message to the [ChatSpeaker](#chatspeaker) with the given `fromSpeaker` name. If no such speaker is in the channel, this method creates a warning and the speaker will not see the message.
- **Returns:** void

#### SendSystemMessage

- **Parameters:** `Library.string`: `message` , `Library.string`: `channelName`
- **Description:** Sends a system message to the [ChatChannel](#chatchannel) with the given `channelName` . If the speaker is not in the channel, then this message will create a warning and other speakers in the channel will not see the message.
- **Returns:** void

#### GetPlayer

- **Parameters:** None
- **Description:** Returns the `Player` object associated with the speaker. If the speaker is not for a user (a bot) then this returns `nil` .
- **Returns:** `Player` or `nil`

#### SetExtraData

- **Parameters:** `Library.string`: `key` , Variant `data`
- **Description:** Sets some extra data for the speaker under a specific `key` . Whenever the speaker sends a [ChatMessage](#chatmessage) this extra data is attached to the message if none is explicitly provided with the message. For example, this allows the speaker's chat color to be set.
- **Returns:** void

#### GetExtraData

- **Parameters:** `Library.string`: `key`
- **Description:** Returns the extra data associated with the given `key` , set using SetExtraData.
- **Returns:** Variant

#### SetMainChannel

- **Parameters:** `Library.string`: `channelName`
- **Description:** Sets the speaker to talk in the provided channel. Fires MainChannelSet.
- **Returns:** `nil`

### Events

#### SaidMessage

- **Parameters:** [ChatMessage](#chatmessage) `message` , `Library.string`: `channelName`
- **Description:** Fired when the speaker sends a [ChatMessage](#chatmessage) to the [ChatChannel](#chatchannel)

#### ReceivedMessage

- **Parameters:** [ChatMessage](#chatmessage) `message` , `Library.string`: `channelName`
- **Description:** Fired when the speaker receives a [ChatMessage](#chatmessage) from another speaker on a [ChatChannel](#chatchannel)

#### ReceivedSystemMessage

- **Parameters:** [ChatMessage](#chatmessage) `message` , `Library.string`: `channelName`
- **Description:** Fired when the speaker receives a system [ChatMessage](#chatmessage) from a [ChatChannel](#chatchannel) with the given `channelName` .

#### ChannelJoined

- **Parameters:** `Library.string`: `channelName` , `Library.string`: `channelWelcomeMessage`
- **Description:** Fired when the speaker joins the [ChatChannel](#chatchannel) with the given `channelName` .

#### ChannelLeft

- **Parameters:** `Library.string`: `channelName`
- **Description:** Fired when the speaker leaves a [ChatChannel](#chatchannel) with the given `channelName` .

#### Muted

- **Parameters:** `Library.string`: `channelName` , `Library.string`: `reason = nil` , [int](../../luau/numbers.md#int): `duration` = 0
- **Description:** Fired when the speaker is muted on the [ChatChannel](#chatchannel) with the given `channelName` for the given duration (if provided). There may or may not be a `reason` provided.

#### Unmuted

- **Parameters:** `Library.string`: `channelName`
- **Description:** Fired when the speaker is unmuted on the [ChatChannel](#chatchannel) with the given `channelName` .

#### ExtraDataUpdated

- **Parameters:** `Library.string`: `key` , Variant `data`
- **Description:** Fired when the default value of a key in the speaker's extra data is updated using SetExtraData.

#### MainChannelSet

- **Parameters:** `Library.string`: `channelName`
- **Description:** Fired when the speakers main channel is changed to the [ChatChannel](#chatchannel) with the given `channelName` .

## ChatMessage

A **ChatMessage** is a data structure representing a message sent from a [ChatSpeaker](#chatspeaker). It contains data about the message, including the length of the text, whether the text has been filtered by Roblox, and extra data about the message's appearance.

### Properties

#### ID

- **Type:** [int](../../luau/numbers.md#int)
- **Description:** A unique numerical identifier for the message.

#### FromSpeaker

- **Type:** `Library.string`:
- **Description:** The name of the [ChatSpeaker](#chatspeaker) who sent the message.

#### OriginalChannel

- **Type:** `Library.string`:
- **Description:** The name of the [ChatChannel](#chatchannel) from which the message originated.

#### IsFiltered

- **Type:** [bool](../../luau/booleans.md)
- **Description:** Describes whether the message is filtered by Roblox (if true, Message will be `nil` )

#### MessageLength

- **Type:** [int](../../luau/numbers.md#int)
- **Description:** The length of the message. You can use this to generate a hashed-out string if the message was filtered.

#### Message

- **Type:** `Library.string`: or `nil`
- **Description:** The text of the message. This property will be `nil` if IsFiltered is true.

#### MessageType

- **Type:** `Library.string`:
- **Description:** The type of the message. These types are described in the ChatConstants module:
- **Possible values:** `"Message"` , `"System"` , `"MeCommand"` , `"Welcome"` , `"SetCore"` , `"Whisper"`

#### Time

- **Type:** [int](../../luau/numbers.md#int)
- **Description:** A timestamp; the value of `Library.os.time()` at the time of the message's creation.

#### ExtraData

- **Type:** dictionary\<`Library.string`, Variant>
- **Description:** A dictionary of metadata for this message. This is used to alter the appearance of the message. The following keys may be present:
  - `Datatype.Color3`: `ChatColor`
  - `Library.string`: `NameColor`
  - `Enum.Font`: `Font`
  - [int](../../luau/numbers.md#int): `TextSize`
  - array\<`Library.string`>: `Tags`

## ChatChannel

**ChatChannel** is an object that stores data about a single channel, which is a means by which messages can be exchanged between [ChatSpeakers](#chatspeaker). It also has access permission properties that determine the visibility of messages along with whether users may join or leave the channel manually (using `/join` or `/leave` commands).

By default, each user has a [ChatSpeaker](#chatspeaker) that is automatically added to the "All" and "System" chat channels (although, "System" is read only). If the user is on a `Player.Team`, they will also have access to a channel for only that Team.

### Properties

#### Name

- **Type:** `Library.string`
- **Description:** The name of the channel, used to reference the channel in other functions.

#### WelcomeMessage

- **Type:** `Library.string`
- **Description:** A message to display when a user joins the channel.

#### Joinable

- **Type:** [bool](../../luau/booleans.md)
- **Description:** Determines whether a user may manually join a channel using the `/join` command. A user can still be added to a channel using [ChatSpeaker:JoinChannel()](#joinchannel) or other means even if this property is false.

#### Leavable

- **Type:** [bool](../../luau/booleans.md)
- **Description:** Determines whether a user may manually leave a channel using the `/leave` command. A user can still be removed from a channel using [ChatSpeaker:LeaveChannel()](#leavechannel) or other means even if this property is false.

#### AutoJoin

- **Type:** [bool](../../luau/booleans.md)
- **Description:** Determines whether a player's [ChatSpeaker](#chatspeaker) will automatically join the channel upon joining the game. non-user speakers will not automatically join channels, even when this property is true (You can use [ChatSpeaker:JoinChannel()](#joinchannel) to do this).

#### Private

- **Type:** [bool](../../luau/booleans.md)
- **Description:** Determines whether the channel will be included in the list of channels returned by [ChatService:GetChannelList()](#getchannellist). This for whisper chats and team chats.

### Methods

#### KickSpeaker

- **Parameters:** `Library.string`: `speakerName` , `Library.string`: `reason = nil`
- **Description:** Removes the speaker with the given `speakerName` from the channel, sending a message to both the user and the channel from which the user was kicked. If a `reason` is provided, the reason will be included in the message.
- **Returns:** void

#### MuteSpeaker

- **Parameters:** `Library.string`: `speakerName` , `Library.string`: `reason = nil` , [int](../../luau/numbers.md#int) `duration = 0`
- **Description:** Mutes the speaker with the given `speakerName` in the channel for a duration specified in seconds. If `duration` is nil or 0, the mute is indefinite. If `reason` is provided, then a message will be sent to the channel with the reason included.
- **Returns:** void

#### UnmuteSpeaker

- **Parameters:** `Library.string`: `speakerName`
- **Description:** Unmutes the speaker with the given `speakerName` in the channel.
- **Returns:** void

#### IsSpeakerMuted

- **Parameters:** `Library.string`: `speakerName`
- **Description:** Describes whether the speaker with the given `speakerName` is presently muted in the channel.
- **Returns:** [bool](../../luau/booleans.md)

#### GetSpeakerList

- **Parameters:** None
- **Description:** Returns a list containing all if the names of the [ChatSpeaker](#chatspeaker) currently in the channel.
- **Returns:** array\<`Library.string`>

#### SendSystemMessage

- **Parameters:** `Library.string`: `message`
- **Description:** Sends a message from the "System" [ChatSpeaker](#chatspeaker) to the channel.
- **Returns:** void

#### RegisterFilterMessageFunction

- **Parameters:** `Library.string`: `functionId` , [function](../../luau/functions.md) `func`
- **Description:** Registers a filter function, `func` , identified by `functionId` to the channel. The filter function will be called with the [ChatSpeaker](#chatspeaker), the [ChatMessage](#chatmessage), and the `Library.string`: name of the channel the message originated in. Changes to the message will persist and will be displayed after filtering.
- **Returns:** void
- **Example:**

```lua
-- Paste this example into a ModuleScript within the ChatModules folder.
local functionId = "getPizza"
local command = "/pizza"
local toolId = 22596452 -- Pepperoni pizza slice gear
local function processCommand(speakerName, message, channelName)
	if string.sub(message, 1, command:len()) == command then
		local model = game:GetService("InsertService"):LoadAsset(toolId)
		local tool = model:GetChildren()[1]
		local speaker = ChatService:GetSpeaker(speakerName)
		local player = speaker:GetPlayer()
		tool.Parent = player.Backpack
		return true
	end
	return false
end

local function runChatModule(ChatService)
	ChatService:RegisterProcessCommandsFunction(functionId, processCommand)
end

return runChatModule
```

#### UnregisterFilterMessageFunction

- **Parameters:** `Library.string`: `functionId`
- **Description:** Unregisters a filter function (registered by RegisterFilterMessageFunction) given its identifier, `functionId` .
- **Returns:** void

#### RegisterProcessCommandsFunction

- **Parameters:** `Library.string`: `functionId` , [function](../../luau/functions.md) `func`
- **Description:** Registers a process command function, `func` , identified by `functionId` to the chat. Before a message is filtered, it will pass through `func` (and other functions registered by this). The function `func` should check whether the message invokes a command. If so, perform the action of the command and return true. Returning true indicates the message was indeed a command and should not be displayed. The function can be unregistered using UnregisterProcessCommandsFunction.
- **Returns:** void
- **Example:**

```lua
-- Paste this example into a ModuleScript within the ChatModules folder.
-- This example filters a keyword, and if successful, sets the chatColor of the message
local functionId = "greenText"
local keyword = "#green"
local chatColor = Color3.new(0, 1, 0) -- green

local function doFilter(speaker, messageObject, channelName)
	-- Check if the message contains the keyword
	local start, finish = string.find(messageObject.Message, keyword)
	if start and finish then
		-- Remove (filter) the keyword from the message, also setting the ChatColor
		messageObject.Message = string.gsub(messageObject.Message, keyword, "")
		messageObject.ExtraData.ChatColor = chatColor
	end
end

local function runChatModule(ChatService)
	-- Create a channel and register the filter function
	local testChannel = ChatService:AddChannel("TestChannel")
	testChannel:RegisterFilterMessageFunction(functionId, doFilter)
end

return runChatModule
```

#### UnregisterProcessCommandsFunction

- **Parameters:** `Library.string`: `functionId`
- **Description:** Unregisters a command processor (registered by RegisterProcessCommandsFunction) given the identifier, `functionId` .
- **Returns:** void

### Events

#### MessagePosted

- **Parameters:** [ChatMessage](#chatmessage): `message`
- **Description:** Fires when a message is posted in the channel.

#### SpeakerJoined

- **Parameters:** `Library.string`: `speakerName`
- **Description:** Fires when a [ChatSpeaker](#chatspeaker) joins the channel.

#### SpeakerLeft

- **Parameters:** `Library.string`: `speakerName`
- **Description:** Fires when a [ChatSpeaker](#chatspeaker) leaves the channel.

#### SpeakerMuted

- **Parameters:** `Library.string`: `speakerName` , `Library.string`: `reason` , [int](../../luau/numbers.md#int) `duration = 0`
- **Description:** Fires when a [ChatSpeaker](#chatspeaker) has been muted in the channel.

#### SpeakerUnmuted

- **Parameters:** `Library.string`: `speakerName`
- **Description:** Fires when a [ChatSpeaker](#chatspeaker) is unmuted.
