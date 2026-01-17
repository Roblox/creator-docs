---
title: Customize the chat window
description: Customize the chat window and message UI of your in-experience text chat.
---

The [in-experience text chat](../chat/in-experience-text-chat.md) system, powered by `Class.TextChatService`, allows players to easily communicate and socialize with each other in live experiences. In addition to supporting the default text chat, you can [customize](#chat-window-configuration) the front‑end user interface.

## Chat window configuration

The overall chat window consists of:

- Chat window
- Input bar
- Channel tabs (optional)

<img src="../assets/players/in-experience-text-chat/Chat-Window-Components.jpg" width="800" alt="Core components of the text chat window." />

The channel tabs are disabled by default and each component can be toggled on and off in Studio or through scripting:

<Tabs>
<TabItem label="Studio">
In the [Explorer](../studio/explorer.md) window, expand the `Class.TextChatService` branch and select `Class.ChatWindowConfiguration`, `Class.ChatInputBarConfiguration`, or `Class.ChannelTabsConfiguration`. Then enable or disable the component in the [Properties](../studio/properties.md) window.

<img src="../assets/players/in-experience-text-chat/TextChatService-Configuration-Objects.png" width="760" />
</TabItem>
<TabItem label="Scripting">
From a client script within `Class.StarterPlayerScripts`, enable each component as desired:

```lua title="Client Script"
local TextChatService = game:GetService("TextChatService")

local ChatWindowConfiguration = TextChatService:FindFirstChildOfClass("ChatWindowConfiguration")
local ChatInputBarConfiguration = TextChatService:FindFirstChildOfClass("ChatInputBarConfiguration")
local ChannelTabsConfiguration = TextChatService:FindFirstChildOfClass("ChannelTabsConfiguration")

-- Enable chat window
if ChatWindowConfiguration then
	ChatWindowConfiguration.Enabled = true
end
-- Enable input bar
if ChatInputBarConfiguration then
	ChatInputBarConfiguration.Enabled = true
end
-- Enable channel tabs
if ChannelTabsConfiguration then
	ChannelTabsConfiguration.Enabled = true
end
```

</TabItem>
</Tabs>

When `Class.ChannelTabsConfiguration` is enabled, each default `Class.TextChannel` appears in a tab as outlined in the following table. In addition, each custom `Class.TextChannel` creates a tab corresponding to the channel's `Class.Instance.Name|Name` property.

<table size="small">
	<thead>
		<tr>
			<th>Default channel</th>
			<th>Tab name</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>`RBXGeneral`</td>
			<td>**General**</td>
		</tr>
		<tr>
			<td>`RBXSystem`</td>
			<td>**General** (combined into a single tab with `RBXGeneral`)</td>
		</tr>
		<tr>
			<td>`RBXTeam`</td>
			<td>**Team**</td>
		</tr>
		<tr>
			<td>`RBXWhisper`</td>
			<td>User name of the other player</td>
		</tr>
	</tbody>
</table>

### Window appearance

Appearance of the overall chat window is customizable through `Class.ChatWindowConfiguration`.

<img src="../assets/studio/explorer/TextChatService-ChatWindowConfiguration.png" width="320" height="94" alt="ChatWindowConfiguration instance in Explorer hierarchy." />

<table>
<thead>
	<tr>
		<th>Property</th>
		<th>Description</th>
		<th>Default</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>`Class.ChatWindowConfiguration.BackgroundColor3|BackgroundColor3`</td>
		<td>`Datatype.Color3` background color of the chat window.</td>
		<td>`[25, 27, 29]`</td>
	</tr>
	<tr>
		<td>`Class.ChatWindowConfiguration.BackgroundTransparency|BackgroundTransparency`</td>
		<td>Transparency of the chat window's background.</td>
		<td>`0.3`</td>
	</tr>
	<tr>
		<td>`Class.ChatWindowConfiguration.Enabled|Enabled`</td>
		<td>Whether to show the default chat window. Set to `false` to hide.</td>
		<td>`true`</td>
	</tr>
	<tr>
		<td>`Class.ChatWindowConfiguration.FontFace|FontFace`</td>
		<td>`Datatype.Font` of chat window text.</td>
		<td>`Enum.Font.BuilderSansMedium|BuilderSansMedium`</td>
	</tr>
	<tr>
		<td>`Class.ChatWindowConfiguration.TextColor3|TextColor3`</td>
		<td>`Datatype.Color3` of chat window text.</td>
		<td>`[255, 255, 255]`</td>
	</tr>
	<tr>
		<td>`Class.ChatWindowConfiguration.TextSize|TextSize`</td>
		<td>Size of chat window text.</td>
		<td>`14`</td>
	</tr>
	<tr>
		<td>`Class.ChatWindowConfiguration.TextStrokeColor3|TextStrokeColor3`</td>
		<td>`Datatype.Color3` of the stroke for chat window text.</td>
		<td>`[0, 0, 0]`</td>
	</tr>
	<tr>
		<td>`Class.ChatWindowConfiguration.TextStrokeTransparency|TextStrokeTransparency`</td>
		<td>Transparency of the stroke for chat window text.</td>
		<td>`0.5`</td>
	</tr>
	<tr>
		<td>`Class.ChatWindowConfiguration.HorizontalAlignment|HorizontalAlignment`</td>
		<td>Horizontal alignment of the chat window.</td>
		<td>`Enum.HorizontalAlignment.Left|Left`</td>
	</tr>
	<tr>
		<td>`Class.ChatWindowConfiguration.VerticalAlignment|VerticalAlignment`</td>
		<td>Vertical alignment of the chat window.</td>
		<td>`Enum.VerticalAlignment.Top|Top`</td>
	</tr>
	<tr>
		<td>`Class.ChatWindowConfiguration.HeightScale|HeightScale`</td>
		<td>Height scale of the chat window relative to the screen size.</td>
		<td>`1`</td>
	</tr>
	<tr>
		<td>`Class.ChatWindowConfiguration.WidthScale|WidthScale`</td>
		<td>Width scale of the chat window relative to the screen size.</td>
		<td>`1`</td>
	</tr>
</tbody>
</table>

### Input bar appearance

Appearance of the chat input bar is customizable through `Class.ChatInputBarConfiguration`.

<img src="../assets/studio/explorer/TextChatService-ChatInputBarConfiguration.png" width="320" height="94" alt="ChatInputBarConfiguration instance in Explorer hierarchy." />

<table>
<thead>
	<tr>
		<th>Property</th>
		<th>Description</th>
		<th>Default</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>`Class.ChatInputBarConfiguration.BackgroundColor3|BackgroundColor3`</td>
		<td>`Datatype.Color3` background color of the chat input bar.</td>
		<td>`[25, 27, 29]`</td>
	</tr>
	<tr>
		<td>`Class.ChatInputBarConfiguration.BackgroundTransparency|BackgroundTransparency`</td>
		<td>Transparency of the chat input bar's background.</td>
		<td>`0.2`</td>
	</tr>
	<tr>
		<td>`Class.ChatInputBarConfiguration.FontFace|FontFace`</td>
		<td>`Datatype.Font` of chat input text.</td>
		<td>`Enum.Font.BuilderSansMedium|BuilderSansMedium`</td>
	</tr>
	<tr>
		<td>`Class.ChatInputBarConfiguration.PlaceholderColor3|PlaceholderColor3`</td>
		<td>`Datatype.Color3` of placeholder chat input text.</td>
		<td>`[178, 178, 178]`</td>
	</tr>
	<tr>
		<td>`Class.ChatInputBarConfiguration.TextColor3|TextColor3`</td>
		<td>`Datatype.Color3` of player-entered chat input text.</td>
		<td>`[255, 255, 255]`</td>
	</tr>
	<tr>
		<td>`Class.ChatInputBarConfiguration.TextSize|TextSize`</td>
		<td>Size of chat input text.</td>
		<td>`14`</td>
	</tr>
	<tr>
		<td>`Class.ChatInputBarConfiguration.TextStrokeColor3|TextStrokeColor3`</td>
		<td>`Datatype.Color3` stroke color of chat input text.</td>
		<td>`[0, 0, 0]`</td>
	</tr>
	<tr>
		<td>`Class.ChatInputBarConfiguration.TextStrokeTransparency|TextStrokeTransparency`</td>
		<td>Transparency of the stroke for chat input text.</td>
		<td>`0.5`</td>
	</tr>
	<tr>
		<td>`Class.ChatInputBarConfiguration.AutocompleteEnabled|AutocompleteEnabled`</td>
		<td>Whether the text chat system shows autocomplete options for emojis and [commands](../chat/in-experience-text-chat.md). Emojis are autocompleted by typing `:` followed by non-whitespace characters, while commands are autocompleted by typing `/`.</td>
		<td>`true`</td>
	</tr>
	<tr>
		<td>`Class.ChatInputBarConfiguration.KeyboardKeyCode|KeyboardKeyCode`</td>
		<td>Additional key players can press to trigger focusing on the default chat input bar.</td>
		<td>`Enum.KeyCode.Slash|Slash`</td>
	</tr>
</tbody>
</table>

### Channel tabs appearance

Appearance of the **channel tabs** is customizable through `Class.ChannelTabsConfiguration`.

<img src="../assets/studio/explorer/TextChatService-ChannelTabsConfiguration.png" width="320" height="94" alt="ChannelTabsConfiguration instance in Explorer hierarchy." />

<table>
<thead>
	<tr>
		<th>Property</th>
		<th>Description</th>
		<th>Default</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>`Class.ChannelTabsConfiguration.BackgroundColor3|BackgroundColor3`</td>
		<td>`Datatype.Color3` background color of the channel tabs.</td>
		<td>`[25, 27, 29]`</td>
	</tr>
	<tr>
		<td>`Class.ChannelTabsConfiguration.BackgroundTransparency|BackgroundTransparency`</td>
		<td>Transparency of the channel tabs' background.</td>
		<td>`0`</td>
	</tr>
	<tr>
		<td>`Class.ChannelTabsConfiguration.HoverBackgroundColor3|HoverBackgroundColor3`</td>
		<td>`Datatype.Color3` background color of tabs when hovering over them.</td>
		<td>`[125, 125, 125]`</td>
	</tr>
	<tr>
		<td>`Class.ChannelTabsConfiguration.FontFace|FontFace`</td>
		<td>`Datatype.Font` for the text in channel tabs.</td>
		<td>`Enum.Font.BuilderSansBold|BuilderSansBold`</td>
	</tr>
	<tr>
		<td>`Class.ChannelTabsConfiguration.TextColor3|TextColor3`</td>
		<td>`Datatype.Color3` of text in an unselected tab.</td>
		<td>`[175, 175, 175]`</td>
	</tr>
	<tr>
		<td>`Class.ChannelTabsConfiguration.SelectedTabTextColor3|SelectedTabTextColor3`</td>
		<td>`Datatype.Color3` of text in a selected tab.</td>
		<td>`[255, 255, 255]`</td>
	</tr>
	<tr>
		<td>`Class.ChannelTabsConfiguration.TextSize|TextSize`</td>
		<td>Size of the text in channel tabs.</td>
		<td>`18`</td>
	</tr>
	<tr>
		<td>`Class.ChannelTabsConfiguration.TextStrokeColor3|TextStrokeColor3`</td>
		<td>`Datatype.Color3` stroke color of the text in channel tabs.</td>
		<td>`[0, 0, 0]`</td>
	</tr>
	<tr>
		<td>`Class.ChannelTabsConfiguration.TextStrokeTransparency|TextStrokeTransparency`</td>
		<td>Transparency of the stroke for text in channel tabs.</td>
		<td>`1`</td>
	</tr>
</tbody>
</table>

## Customize messages

You can customize the appearance of chat message bodies and prefixes using `Class.ChatWindowMessageProperties` and `Class.TextChatService.OnChatWindowAdded` callbacks without overriding the existing UI. The customization options let you modify the appearance of chat messages to match your experience's theme, and you can also sort or highlight messages from different user groups by coloring prefixes or adding [chat tags](./examples/group-chat-tags.md).

<Alert severity="info">
`Class.ChatWindowMessageProperties` and `Class.TextChatService.OnChatWindowAdded|OnChatWindowAdded` only affect the appearance of messages in the chat window. To customize chat bubbles, see [Bubble Chat](../chat/bubble-chat.md).
</Alert>

### Color user names

When a user sends a chat message, their `Class.Player.DisplayName|DisplayName` displays as the prefix portion of the message. By default, each user's name is colored according to their `Class.Player.TeamColor` but you can change the colors of chat names using `Class.ChatWindowMessageProperties|ChatWindowMessageProperties` and `Class.TextChatService.OnChatWindowAdded|OnChatWindowAdded`. The following `Class.LocalScript` in `Class.StarterPlayerScripts` assigns a predetermined color to each user, picking randomly from a table of RGB colors.

<img src="../assets/players/in-experience-text-chat/Chat-User-Name-Colored.png" width="780" alt="Colored user name in the chat window." />

```lua title="LocalScript - Random User Name Colors"
local TextChatService = game:GetService("TextChatService")

local chatWindowConfiguration = TextChatService.ChatWindowConfiguration

local nameColors = {
	Color3.fromRGB(255, 0, 0),
	Color3.fromRGB(0, 255, 0),
	Color3.fromRGB(0, 0, 255),
	Color3.fromRGB(255, 255, 0),
}

TextChatService.OnChatWindowAdded = function(message: TextChatMessage)
	local properties = chatWindowConfiguration:DeriveNewMessageProperties()

	local textSource = message.TextSource
	if textSource then
		local index: number = (textSource.UserId % #nameColors) + 1
		local randomColor: Color3 = nameColors[index]

    	properties.PrefixTextProperties = chatWindowConfiguration:DeriveNewMessageProperties()
		properties.PrefixTextProperties.TextColor3 = randomColor
	end

	return properties
end
```

You can also apply color and transparency gradients to color message prefixes using `Class.UIGradient`.

<img src="../assets/players/in-experience-text-chat/Chat-User-Name-Gradient.png" width="780" alt="Gradient user name in the chat window." />

```lua title="Gradient User Name Colors"
local TextChatService = game:GetService("TextChatService")

local chatWindowConfiguration = TextChatService.ChatWindowConfiguration

local gradient = Instance.new("UIGradient")
gradient.Color = ColorSequence.new{
	ColorSequenceKeypoint.new(0, Color3.fromRGB(255, 0, 0)),
	ColorSequenceKeypoint.new(0.5, Color3.fromRGB(255, 255, 0)),
	ColorSequenceKeypoint.new(1, Color3.fromRGB(255, 0, 255))
}

TextChatService.OnChatWindowAdded = function(message: TextChatMessage)
	local properties = chatWindowConfiguration:DeriveNewMessageProperties()

	local textSource = message.TextSource
	if textSource then
    	properties.PrefixTextProperties = chatWindowConfiguration:DeriveNewMessageProperties()
		gradient:Clone().Parent = properties.PrefixTextProperties
	end

	return properties
end
```

### Rich text customization

Rich text [font color tags](../ui/rich-text.md#supported-tags) can be used to format chat messages, helpful if you want to apply formatting to very specific parts of the message. Note that rich text does not support gradients, but the following code sample shows how you can move the user name (stored in `Class.TextChatMessage.PrefixText`) into the message body and then apply rich text tagging to only the name portion.

<img src="../assets/players/in-experience-text-chat/Chat-Rich-Text.png" width="780" alt="Rich text customization of user name in the chat window." />

```lua title="Rich Text Customization"
local TextChatService = game:GetService("TextChatService")
local Players = game:GetService("Players")

local chatWindowConfiguration = TextChatService.ChatWindowConfiguration

local gradient = Instance.new("UIGradient")
gradient.Color = ColorSequence.new{
	ColorSequenceKeypoint.new(0, Color3.fromRGB(255, 0, 0)),
	ColorSequenceKeypoint.new(0.5, Color3.fromRGB(255, 255, 0)),
	ColorSequenceKeypoint.new(1, Color3.fromRGB(255, 0, 255))
}

TextChatService.OnChatWindowAdded = function(message: TextChatMessage)
	local properties = chatWindowConfiguration:DeriveNewMessageProperties()

	if message.TextSource then
		properties.PrefixText = "[VIP]"
		properties.Text = string.format("<font color='#00ffff'>%s</font>", message.PrefixText) .. " " .. message.Text

		properties.PrefixTextProperties = chatWindowConfiguration:DeriveNewMessageProperties()
		gradient:Clone().Parent = properties.PrefixTextProperties
	end

	return properties
end
```

## Messages from non‑player sources

When `Class.TextChatService.CreateDefaultTextChannels` is `true`, one of the default text channels is the `RBXSystem` channel. The default chat scripts automatically display system messages in this channel. You can customize the appearance of these messages using the `Class.TextChannel.OnIncomingMessage` callback.

You might want to customize or alter the system messages that are automatically emitted by the chat system. Since the default system messages are localized for users, you should reference them by `Class.TextChatMessage.Metadata` in your [text chat callbacks](../chat/in-experience-text-chat.md#text-chat-hooks-and-callbacks) if you wish to customize their appearance. For example, you could use `Class.TextChatMessage.Metadata|Metadata` to identify system messages, error messages, or messages from specific systems in your experience.

### System

To deliver a system message to the local player, such as "speech" from a public address system, call `Class.TextChannel:DisplaySystemMessage()|DisplaySystemMessage()` from the default `RBXGeneral` channel with a prefix before the player's display name.

```lua title="Client Script"
local Players = game:GetService("Players")
local TextChatService = game:GetService("TextChatService")

local player = Players.LocalPlayer
local generalChannel: TextChannel = TextChatService:WaitForChild("TextChannels").RBXGeneral

local PREFIX = "[Guide] Welcome "

-- Send "system message" to player with their display name appended
generalChannel:DisplaySystemMessage(PREFIX .. player.DisplayName)
```

<img src="../assets/players/in-experience-text-chat/Chat-System.jpg" width="800" alt="Image showing a basic system message in the chat window." />

### NPC/object

You can also stylize non-player dialogue and add [chat bubbles](../chat/bubble-chat.md) to make it appear like messages are coming from an NPC or object within the 3D world.

```lua title="Client Script"
local TextChatService = game:GetService("TextChatService")
local Workspace = game:GetService("Workspace")

local generalChannel: TextChannel = TextChatService:WaitForChild("TextChannels").RBXGeneral

TextChatService.OnIncomingMessage = function(textChatMessage: TextChatMessage)
	local properties = Instance.new("TextChatMessageProperties")

	-- Check for system messages that contain metadata
	if not textChatMessage.TextSource and textChatMessage.Metadata ~= "" then

		-- Add prefix to make message look like it was sent by a player
		properties.PrefixText = string.format("<font color='#%s'>%s: </font>", "#50C999", textChatMessage.Metadata)

		-- Add bubble chat
		TextChatService:DisplayBubble(Workspace.Statue, textChatMessage.Text)
	end

	return properties
end

local message = "Welcome! I will be your guide."
local speakerName = "Ancient Knight"
generalChannel:DisplaySystemMessage(message, speakerName)
```

<img src="../assets/players/in-experience-text-chat/Chat-NPC.jpg" width="800" alt="Image showing a knight statue NPC broadcasting a chat message to the chat window, along with a chat bubble above its head." />
