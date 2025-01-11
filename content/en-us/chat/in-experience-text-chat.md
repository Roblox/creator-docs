---
title: TextChatService Overview
description: The TextChatService system allows players to communicate with each other using text-based messages in live sessions.
---

Roblox offers text-based messaging between players in live sessions through `Class.TextChatService`. This service has its standard functionality, but also provides a set of methods and events for extending and customizing chat, such as delivering messages based on [customized requirements](#conditionally-delivering-messages), adding special permissions or moderation to specific players, and creating [custom commands](./examples/custom-text-chat-commands.md) to execute specific actions.

<Alert severity="success">
This page includes a high-level overview of how messaging works and instructions on migrating from legacy chat, but the easiest way to get started with customizing your experience's chat system is to [see the examples](examples/simple-custom-frontend-ui.md).
</Alert>

## Text Chat Instances

The following sections summarize the primary classes and instances that you can use to customize the chat system.

### Top-Level Configuration

- `Class.TextChatService` - This singleton class is responsible for managing the overall chat system, including handling chat message filtering, moderation, and user permissions. Use properties like `Class.TextChatService.CreateDefaultTextChannels` and `Class.TextChatService.CreateDefaultCommands` to enable or disable default chat channels and commands.

### Default UI Configuration

`TextChatService` provides a default UI that can be customized to fit your experience's needs. Each of these configurations can be disabled to hide the associated UI element and can be replaced with custom interfaces if desired.

- `Class.ChatWindowConfiguration` - Represents the default chat window UI, including its appearance and behavior. Disable it to hide the chat window.
- `Class.ChatInputBarConfiguration` - Represents the default chat input bar UI, including its appearance and behavior.
- `Class.BubbleChatConfiguration` - Represents the default bubble chat UI, including its appearance and behavior.

### Channels, Messages, and Commands

- `Class.TextChannel` - Represents a text chat channel that passes user-sent chat messages from the client to the server, which then displays them to other users based on permissions. These instances must be parented to `TextChatService` in order to function. If `Class.TextChatService.CreateDefaultTextChannels` is set to true, the service automatically creates two text channels, `RBXGeneral` and `RBXSystem`. You can manually create additional `TextChannel` instances and parent them to `Class.TextChatService`, as well.

  - `Class.TextSource` - Represents a user in a `Class.TextChannel`. These instances are directly parented to the `Class.TextChannel` when `Class.TextChannel:AddUserAsync` is used. Text sources contains detailed permissions of a user in the channel, such as their ability to send messages. A single user can be associated with multiple text sources if they have been added to multiple text channels.

- `Class.TextChatMessage` - Represents a single chat message in a text channel, with basic information such as the sender of the message, the original message, the filtered message, and the creation timestamp.
- `Class.TextChatCommand` - Allows users to invoke specific actions or behaviors by sending messages that match `Class.TextChatCommand.PrimaryAlias` or `Class.TextChatCommand.SecondaryAlias`. These instances must be parented to `TextChatService` in order to function. Chat commands are helpful for adding additional functionality and interactivity to the chat experience. If `Class.TextChatService.CreateDefaultCommands` is set to true, default chat commands will be created automatically. You can manually create additional `TextChatCommand` instances and parent them to `Class.TextChatService`, as well.

## Chat Flowchart

Text chat uses the [client‑server](../projects/client-server.md) model, with a **sending client**, the **server**, and **receiving clients**.

<img
  alt="A flowchart for in-experience text chat."
  src="../assets/players/in-experience-text-chat/Chat-Workflow.png"
  width="100%" />

1. A player sends a message from their local device, triggering the `Class.TextChannel:SendAsync()` method. This method processes the message and determines whether it's a chat command or a regular chat message.

   - If the message is a chat command, it fires the `Class.TextChatCommand.Triggered` event to perform the defined action. No further steps are required.

   - If the message is a regular chat message, it fires the `Class.TextChatService.SendingMessage` event to display the message to the sender on the sending client. At the same time, `Class.TextChannel:SendAsync()` passes the message to the server.

1. The server fires `Class.TextChannel.ShouldDeliverCallback` to determine whether to deliver the message to other players based on permissions and Roblox community filtering requirements.

1. If `Class.TextChannel.ShouldDeliverCallback` determines that message is eligible to deliver to other players, the server applies any filters and fires `Class.TextChannel.OnIncomingMessage` twice:

   1. The first time is on the sending client and signals that the server is processing the message through the `Class.TextChatService.MessageReceived` event. This event replaces the local message on the sending client with the processed message from the server. The message is identical if the original didn't require filtering.

   2. The second time is on the receiving clients, which triggers the `Class.TextChatService.MessageReceived` event to display the message to other players.

### Text Chat Hooks and Callbacks

The `Class.TextChatService` API encourages a clear separation on the appearance and delivery of chat messages. Multiple instances of the text chat system provide hooks and callbacks to format in centralized, clear locations.

<Alert severity='warning'>
All callbacks are expected to be non-yielding functions. Yielding or waiting for a response in a callback blocks the chat system and can cause unexpected behavior.
</Alert>

<img
  alt="A flowchart of the TextChatService callbacks order"
  src="../assets/players/in-experience-text-chat/TextChatService-Callbacks.png"
  width="100%" />

| Callback                                  | Return Value                        |
| ----------------------------------------- | ----------------------------------- |
| `Class.TextChannel.ShouldDeliverCallback` | boolean                             |
| `Class.TextChatService.OnIncomingMessage` | `Class.TextChatMessageProperties`   |
| `Class.TextChannel.OnIncomingMessage`     | `Class.TextChatMessageProperties`   |
| `Class.TextChatService.OnBubbleAdded`     | `Class.BubbleChatMessageProperties` |
| `Class.TextChatService.OnChatWindowAdded` | `Class.ChatWindowMessageProperties` |

#### Conditionally Delivering Messages

- `Class.TextChannel.ShouldDeliverCallback` - This callback should be defined on the server only. The callback is fired for each `Class.TextSource` child of the text channel when a message is sent to determine whether the message should be delivered. This callback can be used to implement custom message delivery logic that may depend on additional gameplay context, such as:

  - [Proximity-based chat](./examples/proximity-chat.md) where users can only send messages to those close to them.
  - Preventing users with certain attributes from sending messages to others.

#### Customizing Message Display

The default `TextChatService` UI relies on [rich text](../ui/rich-text.md) to format and customize how messages are displayed. You can use the following callbacks to format messages before they are displayed to users. You might want to add colors or [chat tags](../chat/chat-window.md#adding-chat-tags) to user's names or format message content.

The following callbacks are called on every `TextChatMessage` that is about to be displayed, which lets you customize chat window appearance based on the `TextChannel`, `TextSource`, or `TextChatMessage` content.

When a client sends a message, these callbacks are called once when the message is sent to the server and the `Class.TextChatMessage.Status` value will be `Enum.TextChatMessageStatus.Sending`. Once the message is received by the server and is being delivered to other users, the sender client receives the message again with an updated `Enum.TextChatMessageStatus` value.

- `Class.TextChatService.OnIncomingMessage` - This callback should be defined on the client only. The callback is fired when a message is received, either from the server or if the local client has just sent a message. The callback is called on every `TextChatMessage` received from all `TextChannel` instances and is the first to process the message before it is displayed to the user.
- `Class.TextChannel.OnIncomingMessage` - This callback should be defined on the client only. The callback is fired when a message is received from the server. The callback is called on every `TextChatMessage` received from the `TextChannel`. Default `TextChannel` instances created from `Class.TextChatService.CreateDefaultTextChannels` have this callback defined and can be overwritten.
- `Class.TextChatService.OnBubbleAdded` - This callback should be defined on the client only. Use it to customize the appearance of chat bubbles independent of the appearance of the message in the chat window UI.
- `Class.TextChatService.OnChatWindowAdded` - This callback should be defined on the client only. Use it to customize the appearance of chat messages in the chat window UI independent of the appearance of the message in chat bubbles.

## Migrating From Legacy Chat

This section assists you in migrating from the [legacy chat system](../chat/legacy/legacy-chat-system.md) by providing alternative methods for implementing common chat functionalities and behaviors using `TextChatService`.

To switch the chat system of an existing experience from the legacy chat system to `TextChatService`:

1. In the [Explorer](../studio/explorer.md) window, select **TextChatService**.
2. In the [Properties](../studio/properties.md) window, find the **ChatVersion** dropdown and select **TextChatService**.

   <img src="../assets/studio/properties/TextChatService-ChatVersion-TextChatService.png" width="320" />

### Basic Functionalities

Though both systems share the same basic chat functionalities, TextChatService implementations are in general more sustainable and easier to iterate on.

<table>
  <thead>
    <tr>
      <th>Functionality</th>
      <th>Legacy Chat</th>
      <th>TextChatService</th>
      <th>Differences</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Send a chat message</td>
      <td>`Class.Players:Chat()`</td>
      <td>`Class.TextChannel:SendAsync()`</td>
      <td>The `Class.TextChatService:SendAsync()` method supports more advanced chat features, such as rich text formatting and message priority. It also includes built-in filtering to help prevent inappropriate messages from being sent.</td>
    </tr>
    <tr>
      <td>Implement messaging callbacks</td>
      <td>`Class.Chat:InvokeChatCallback()`<br />`Class.Chat:RegisterChatCallback()`</td>
      <td>`Class.TextChatService.SendingMessage`<br />`Class.TextChatService.OnIncomingMessage`</td>
      <td>The legacy chat system binds a function to chat system events for delivering messages. The two methods of `TextChatService` offer better flexibility and customization.</td>
    </tr>
    <tr>
      <td>Add custom chat commands</td>
      <td>`ChatService/ChatCommand` module</td>
      <td>`Class.TextChatCommand`</td>
      <td>`TextChatService` has a dedicated class for text commands rather than using a legacy chat module.</td>
    </tr>
    <tr>
      <td>Display a system message</td>
      <td>`Class.StarterGui:SetCore()` using `ChatMakeSystemMessage`</td>
      <td>`Class.TextChannel:DisplaySystemMessage()`</td>
      <td>The `Class.TextChannel.OnIncomingMessage` callback can return a `Class.TextChatMessageProperties` instance to customize the message appearance.</td>
    </tr>
    <tr>
      <td>Disable chat</td>
      <td>[Game Settings](../studio/game-settings.md) in Studio and `ChatWindow/ChatSettings` module for hiding the chat window</td>
      <td>`Class.ChatWindowConfiguration.Enabled`</td>
      <td></td>
    </tr>
  </tbody>
</table>

### Message Filtering

TextChatService automatically filters chat messages based on each player's account information, so you don't need to manually implement text filtering for all kinds of chat messages.

<table>
  <thead>
    <tr>
      <th>Functionality</th>
      <th>Legacy Chat</th>
      <th>TextChatService</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Filter chat message for individual player</td>
      <td>`Class.Chat:FilterStringAsync()`</td>
      <td>Automatic</td>
    </tr>
    <tr>
      <td>Filter broadcasting messages</td>
      <td>`Class.Chat:FilterStringForBroadcast()`</td>
      <td>Automatic</td>
    </tr>
  </tbody>
</table>

### Window and Bubble Chat

Both the [chat window](../chat/chat-window.md) and [bubble chat](../chat/bubble-chat.md) behavior and customization options of `TextChatService` are identical to those of the legacy chat system. As the legacy chat system only allows customization using chat modules or the `Class.Players` container, `TextChatService` provides dedicated classes (`Class.ChatWindowConfiguration` and `Class.BubbleChatConfiguration`) to manage all chat window and bubble chat properties. Additionally, you can easily adjust and preview your bubble chat appearance and behavior properties using Studio settings instead of having to script them all.

<table>
  <thead>
    <tr>
      <th>Functionality</th>
      <th>Legacy Chat</th>
      <th>TextChatService</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Enable Chat Window</td>
      <td>`Class.Chat.LoadDefaultChat`<br />`Class.Players.ClassicChat`</td>
      <td>`Class.ChatWindowConfiguration.Enabled`</td>
    </tr>
    <tr>
      <td>Enable Bubble Chat</td>
      <td>`Class.Chat.BubbleChatEnabled`<br />`Class.Players.BubbleChat`</td>
      <td>`Class.BubbleChatConfiguration.Enabled`</td>
    </tr>
    <tr>
      <td>Set Chat Window Properties</td>
      <td>`Class.Players:SetChatStyle()`</td>
      <td>`Class.ChatWindowConfiguration`</td>
    </tr>
    <tr>
      <td>Set Bubble Chat Properties</td>
      <td>`Class.Chat:SetBubbleChatSettings()`<br />`Class.Chat.BubbleChatSettingsChanged()`<br />`Class.Players.BubbleChat`<br />`Class.Players:SetChatStyle()`</td>
      <td>`Class.BubbleChatConfiguration`</td>
    </tr>
    <tr>
      <td>Enable NPC Bubbles</td>
      <td>`Class.Chat:Chat()`</td>
      <td>`Class.TextChatService:DisplayBubble()`</td>
    </tr>
  </tbody>
</table>

### Migrating Speaker "Extra Data"

The legacy Lua chat system allowed devleopers to use `SetExtraData` on the `Speaker` class. This data was used to format the name color, chat color, or to apply name tags for a given speaker.

```lua title='Legacy Chat System SetExtraData'
-- An example of setting extra data on a speaker in the legacy chat system
ChatService.SpeakerAdded:Connect(function(playerName)
    local speaker = ChatService:GetSpeaker(playerName)
    speaker:SetExtraData("NameColor", Color3.fromRGB(255, 255, 55))
    speaker:SetExtraData("ChatColor", Color3.fromRGB(212, 175, 55))
    speaker:SetExtraData("Tags", {{TagText = "YourTagName", TagColor = Color3.fromRGB(0, 255, 0)}, {TagText = "OtherTagName", TagColor = Color3.fromRGB(255, 0, 0)}})
end)
```

TextChatService does not have a direct equivalent to `SetExtraData`. Instead, use [TextChatService callbacks](#text-chat-hooks-and-callbacks) such as `Class.TextChatService.OnWindowAdded` to customize the appearance of messages using rich text based on the `TextSource` of the message.

The following is an example of emulating legacy Lua chat's "extra data" by access attributes on the TextSource's `Class.Player`:

```lua title='TextChatService SetAttributes'
local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(player)
  player:SetAttribute("NameColor", Color3.fromRGB(255, 255, 55))
  player:SetAttribute("ChatColor", Color3.fromRGB(212, 175, 55))
  player:SetAttribute("isYourTag", true)
  player:SetAttribute("isOtherTag", true)
end)
```

Then you can use the `OnChatWindowAdded` callback to customize the appearance of the chat window based on the attributes set on the player:

```lua title='TextChatService OnChatWindowAdded'
local TextChatService = game:GetService("TextChatService")
local Players = game:GetService("Players")

TextChatService.OnChatWindowAdded = function(textChatMessage)
	local textSource = textChatMessage.TextSource
	if textSource then
		local player = Players:GetPlayerByUserId(textSource.UserId)
		if player then
			local overrideProperties = TextChatService.ChatWindowConfiguration:DeriveNewMessageProperties()
			overrideProperties.PrefixText = textChatMessage.PrefixText
			overrideProperties.Text = textChatMessage.Text

			local nameColor = player:GetAttribute("NameColor")
			if nameColor and typeof(nameColor) == "Color3" then
				overrideProperties.PrefixTextProperties.TextColor3 = nameColor
			end

			local chatColor = player:GetAttribute("ChatColor")
			if chatColor and typeof(chatColor) == "Color3" then
				overrideProperties.TextColor3 = chatColor
			end

			local isYourTag = player:GetAttribute("isYourTag")
			if isYourTag == true then
				overrideProperties.PrefixText = `<font color='rgb(0, 255, 0)'>[YourTag]</font> {overrideProperties.PrefixText}`
			end

			local isOtherTag = player:GetAttribute("isOtherTag")
			if isOtherTag == true then
				overrideProperties.PrefixText = `<font color='rgb(255, 0, 0)'>[OtherTag]</font> {overrideProperties.PrefixText}`
			end

			return overrideProperties
		end
	end

	return nil
end
```
