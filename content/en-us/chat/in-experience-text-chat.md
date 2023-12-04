---
title: In-Experience Text Chat System
description: The in-experience text chat system allows users to communicate with each other using text-based messages in live sessions.
---

With the **in-experience text chat** system on Roblox, you can allow users to communicate with each other using text-based messages in live sessions. The system provides a set of methods and events for extending and customizing chat functionalities for enhanced user immersion and engagement, such as delivering messages based on customized requirements, adding special permissions or moderation to specific users, and creating custom commands to execute specific actions.

This guide covers the chat workflow and the usage of APIs for extending the functionalities of the in-experience text chat system. For more information on customizing the chat User Interface (UI), see [Customizing In-Experience Text Chat](../chat/customizing-in-experience-text-chat.md).

## Text Chat APIs and Workflow

The in-experience text chat system consists of both mutable APIs that you can extend for customized chat delivery behaviors and immutable data objects representing certain chat elements returned by mutable APIs.

### Mutable Chat APIs

The in-experience text chat system provides the following mutable APIs:

- `Class.TextChatService`: This singleton class is responsible for managing the overall chat system, including handling chat message filtering, moderation, and user permissions. Accessible from the server, it provides a set of methods and events that other text chat APIs or user actions can invoke through the chat delivery workflow.
- `Class.TextChannel`:This server-side class represents a text chat channel and passes user-sent chat messages from the client to the server and displays them to other users based on permissions. You can use it to create, modify, and manage text channels in your experience. Additionally, you can create multiple text channels to group users together for chat purposes, such as allowing users to chat with their group members that are not visible to others.
- `Class.TextChatCommand`: This class enables you to create custom chat commands that allow users to invoke specific actions or behaviors by typing special characters followed by a command name. Chat commands are helpful for adding additional functionality and interactivity to the chat experience. You can also use them to create admin commands to manage and moderate your experience with shortcuts.

### Immutable Chat Objects

The in-experience text chat system includes the following immutable objects with read-only properties that you can't modify:

- `Class.TextChatMessage`: This object represents a single chat message in a text chat channel with basic information such as the sender of the message, the original message, the filtered message, and the creation timestamp.
- `Class.TextSource`: This object represents a message sender in a text chat channel with detailed permissions of a user in the channel. If a user is in multiple text chat channels, they can have multiple text sources as well.

### Text Chat Workflow

Through the chat message sending and delivering process, methods, callbacks, and events of mutable chat classes carrying immutable chat objects take place on three sides of the client-server model:

- The sending client, which is the local device of a user sending a message.
- Receiving clients, which are other users' local devices.
- The server, which is the central processor for receiving the message from the sending client and handles the delivery to receiving clients.

<img
  alt="A flowchart of the in-experience text chat workflow"
  src="../assets/scripting/chat-workflow.png"
  width="100%" />

As the flowchart shows, the in-experience text chat system processes a chat message through the following steps:

1. A user sends a message from their local device, triggering the `Class.TextChannel:SendAsync()` method. This method processes the message and determines whether it's a chat command or a regular chat message.
1. If the user input is a chat command, it fires the `Class.TextChatCommand.Triggered` event to perform the action you have defined for the command.
1. If the user input is a regular chat message, it fires `Class.TextChatService.SendingMessage` to display the original message to the sender on the sending client. At the same time, the `Class.TextChannel:SendAsync()` passes the message to the server.
1. The server fires `Class.TextChannel.ShouldDeliverCallback` to determine whether to deliver the message to other users based on the permissions you set and Roblox community filtering requirements.
1. If `Class.TextChannel.ShouldDeliverCallback` determines that message is eligible to deliver to other users, the server applies any filters and fires `Class.TextChannel.OnIncomingMessage` twice:
   1. The first time on the sending client to signal that the server is processing the message through the `Class.TextChatService.MessageReceived` event. This also replaces the local message on the sending client with the incoming message to the display on receiving clients. The message can be identical if the original message doesn't require filtering.
   1. The second time is on the receiving client to trigger the `Class.TextChatService.MessageReceived` event to display the message to other users.

There are several areas of the chat system workflow that you can extend and customize the behavior, but the steps of how the system operates remain the same.

## Customizing Message Delivering Behaviors

In addition to sticking with the default chat message delivery behavior, you can use `Class.TextChannel.ShouldDeliverCallback` to add permissions and specific behaviors to determine whether users can receive a message for customized engagement, such as:

- Supporting group-based chat that only users in the same group or squad can communicate between.
- Supporting proximity-based chat where users can only send messages to those close to them.
- Preventing users with certain attributes from sending messages to others. For example, disallow users with a death status to send messages to alive users.
- Adding the guessing competition feature where correct answers in chat are not visible to other users.

### Supporting Proximity-Based Chat

The following example shows how to implement exclusive chat for users who are close to each other in locations. It extends the callback with a function using `Class.TextSource` to identify the locations of a user who might be a potential message receiver. If this function returns false, it means that the user locates further than the preset valid range from the message sender, so the system doesn't deliver the message to that user.

```lua
-- Get the text chat and players services
local TextChatService = game:GetService("TextChatService")
local Players = game:GetService("Players")

-- Get the chat channel for proximity-based chat.
-- This example uses the general channel. You can replace this with a dedicated channel.
local generalChannel: TextChannel = TextChatService:WaitForChild("TextChannels").RBXGeneral

-- Define a function to get the position of a user's character.
local function getPositionFromUserId(userId: number)
	-- Get the player associated with the given userId.
	local targetPlayer = Players:GetPlayerByUserId(userId)

	-- If the player exists, get their character's position.
	if targetPlayer then
		local targetCharacter = targetPlayer.Character
		if targetCharacter then
			return targetCharacter:GetPivot().Position
		end
	end

	-- Return a default position if the player or character cannot be found.
	return Vector3.zero
end

-- Set the ShouldDeliverCallback for the general channel to control message delivery.
generalChannel.ShouldDeliverCallback = function(textChatMessage: TextChatMessage, targetTextSource: TextSource)
	-- Get the positions of the message sender and target.
	local sourcePos = getPositionFromUserId(textChatMessage.TextSource.UserId)
	local targetPos = getPositionFromUserId(targetTextSource.UserId)

	-- If the distance between the sender and target is less than 50 units, deliver the message.
	return (targetPos - sourcePos).Magnitude < 50
end
```

## Creating Custom Commands

The in-experience text chat system has built-in chat commands for common purposes, such as creating team-based chat channels and playing avatar emote. You can enable them by setting `Class.TextChatService.CreateDefaultCommands` and `Class.TextChatService.CreateDefaultTextChannels` to true through scripting or in Studio settings. You can also add custom commands using `Class.TextChatCommand`. Users sending a defined command in the chat input bar trigger a callback defined by `Class.TextChatCommand.Triggered` to perform your customized actions.

The following example shows how to create a chat command that allows users to increase or decrease their character's size when they input `/super` or `/mini`.

1. Insert a `Class.TextChatCommand` instance inside `Class.TextChatService`.
1. Rename it to **SizeCommand**.

   <img src="../assets/players/in-experience-text-chat/TextChatCommand-SizeCommand.png" width="320" />

1. Set its **PrimaryAlias** property to `/super` and its **SecondaryAlias** to `/mini`.

   <img src="../assets/players/in-experience-text-chat/TextChatCommand-Aliases.png" width="320" />

1. Insert the following `Class.Script` inside `Class.ServerScriptService` to define a callback for the chat command that scales the character's size.

   ```lua title='Script' highlight='4,6'
   local TextChatService = game:GetService("TextChatService")
   local Players = game:GetService("Players")

   local sizeCommand: TextChatCommand = TextChatService:WaitForChild("SizeCommand")

   sizeCommand.Triggered:Connect(function(textSource, message)
   	local scaleMult = 1
   	local messageWords = string.split(message, " ")
   	if messageWords[1] == "/super" then
   		scaleMult = 2
   	elseif messageWords[1] == "/mini" then
   		scaleMult = 0.5
   	end

   	local player = Players:GetPlayerByUserId(textSource.UserId)
   	if player then
   		local character = player.Character
   		if character then
   			local humanoid = character:FindFirstChildOfClass("Humanoid")
   			if humanoid then
   				for _, child in humanoid:GetChildren() do
   					if child:IsA("NumberValue") then
   						child.Value *= scaleMult
   					end
   				end
   			end
   		end
   	end
   end)
   ```

   <video controls src="../assets/players/in-experience-text-chat/Text-Custom-Command.mp4" width="90%"></video>
