---
title: Customizing In-Experience Text Chat
description: Customize the chat window and message UI of your in-experience text chat.
---

The [in-experience text chat system](../chat/in-experience-text-chat.md) powered by `Class.TextChatService` allows users to easily communicate and socialize with each other in live experiences. In addition to supporting the default text chat, you can customize the front-end user interface (UI) to improve your user engagement and immersion.

## Chat Window Configuration

You can toggle appearance of the **chat window** and **input bar** in one of two ways:

- Directly in Studio by toggling the **Enabled** property of the service's **ChatWindowConfiguration** and **ChatInputBarConfiguration** children.

   <Grid container spacing={3}>
   <Grid item>
   <img src="../assets/players/in-experience-text-chat/TextChatService-Configuration-Objects.png" width="320" />
   </Grid>
   <Grid item>
   <img src="../assets/players/in-experience-text-chat/ChatWindowConfiguration-Enabled.png" width="400" /><br /><img src="../assets/players/in-experience-text-chat/ChatInputBarConfiguration-Enabled.png" width="400" />
   </Grid>
   </Grid>

- Through scripting, from a `Class.LocalScript` within `Class.StarterPlayerScripts`.

  ```lua title='LocalScript' highlight='3,4,7,10'
  local TextChatService = game:GetService("TextChatService")

  local chatWindowConfiguration = TextChatService:FindFirstChildOfClass("ChatWindowConfiguration")
  local chatInputBarConfiguration = TextChatService:FindFirstChildOfClass("ChatInputBarConfiguration")

  if chatWindowConfiguration then
  	chatWindowConfiguration.Enabled = true
  end
  if chatInputBarConfiguration then
  	chatInputBarConfiguration.Enabled = true
  end
  ```

By default, when enabling both the chat window and the chat bar, the chat bar attaches to the chat window on the UI. You can obtain their read-only properties on their positions and sizes and use them to calculate the total size of the combination:

- `Class.ChatWindowConfiguration.AbsolutePosition`
- `Class.ChatWindowConfiguration.AbsoluteSize`
- `Class.ChatInputBarConfiguration.AbsolutePosition`
- `Class.ChatInputBarConfiguration.AbsoluteSize`

### Chat Window Customization

You can customize the default chat window to match your experience's UI layout, design, and style by using the following properties in Studio:

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
		<td colspan="3">**Appearance**</td>
	</tr>
	<tr>
		<td>`Class.ChatWindowConfiguration.BackgroundColor3|BackgroundColor3`</td>
		<td>Background color of the chat window in `Datatype.Color3`.</td>
		<td>`[25, 27, 29]`</td>
	</tr>
	<tr>
		<td>`Class.ChatWindowConfiguration.BackgroundTransparency|BackgroundTransparency`</td>
		<td>Transparency of the chat window.</td>
		<td>0.3</td>
	</tr>
	<tr>
		<td>`Class.ChatWindowConfiguration.FontFace|FontFace`</td>
		<td>`Datatype.Font` of chat text displayed on the chat window.</td>
		<td>`Enum.Font.GothamMedium`</td>
	</tr>
	<tr>
		<td>`Class.ChatWindowConfiguration.TextColor3|TextColor3`</td>
		<td>Color of chat text displayed on the chat window in `Datatype.Color3`.</td>
		<td>`[255, 255, 255]`</td>
	</tr>
	<tr>
		<td>`Class.ChatWindowConfiguration.TextSize|TextSize`</td>
		<td>Size of chat text displayed on the chat window.</td>
		<td>`14`</td>
	</tr>
	<tr>
		<td>`Class.ChatWindowConfiguration.TextStrokeColor3|TextStrokeColor3`</td>
		<td>Chat text stroke color displayed on the chat window in `Datatype.Color3`.</td>
		<td>`[0, 0, 0]`</td>
	</tr>
	<tr>
		<td>`Class.ChatWindowConfiguration.TextStrokeTransparency|TextStrokeTransparency`</td>
		<td>Transparency of chat text stroke displayed on the chat window.</td>
		<td>0.5</td>
	</tr>
	<tr>
		<td colspan="3">**Behavior**</td>
	</tr>
	<tr>
		<td>`Class.ChatWindowConfiguration.HeightScale|HeightScale`</td>
		<td>Height scale of the chat window relative to the screen size.</td>
		<td>1</td>
	</tr>
	<tr>
		<td>`Class.ChatWindowConfiguration.WidthScale|WidthScale`</td>
		<td>Width scale of the chat window relative to the screen size.</td>
		<td>1</td>
	</tr>
</tbody>
</table>

### Emoji and Command Autocomplete

By default, the text chat system shows autocomplete options for emojis and [commands](../chat/in-experience-text-chat.md#creating-custom-commands):

- Emojis are autocompleted by typing `:` followed by non-whitespace characters.
- Commands are autocompleted by typing `/`.

If you want to disable the autocomplete behavior, set the **AutocompleteEnabled** property to false through Studio UI or scripting.

## Customizing Message Appearance

You can customize the appearance of chat message bodies and prefixes using [rich text](../ui/rich-text.md) tags and `Class.TextChatService.OnIncomingMessage` callbacks without overriding the existing UI. The customization options let you modify the appearance of chat messages to match your experience's theme, and you can also sort or highlight messages from different user groups by [adding chat tags](#adding-chat-tags) and [coloring usernames](#coloring-usernames).

<Alert severity="warning">
  You should only define `Class.TextChatService.OnIncomingMessage` once in the source code. Multiple bindings might override one another in an unpredictable manner.
</Alert>

### Adding Chat Tags

If your experience has users with special [attributes](../studio/properties.md#instance-attributes) like VIP status, you can attach chat tags wrapped in brackets to the front of user messages to highlight their chat messages. The following `Class.LocalScript` in `Class.StarterPlayerScripts` examines all `Class.Player` instances representing users in your experience and appends VIP chat tags for those with the `IsVIP` attribute.

```lua title='LocalScript' highlight='4,5,9-11'
local TextChatService = game:GetService("TextChatService")
local Players = game:GetService("Players")

TextChatService.OnIncomingMessage = function(message: TextChatMessage)
	local properties = Instance.new("TextChatMessageProperties")

	if message.TextSource then
		local player = Players:GetPlayerByUserId(message.TextSource.UserId)
		if player:GetAttribute("IsVIP") then
			properties.PrefixText = "<font color='#F5CD30'>[VIP]</font> " .. message.PrefixText
		end
	end

	return properties
end
```

<img
  alt="VIP users' chat tags"
  src="../assets/players/in-experience-text-chat/Chat-Tag-VIP.jpg"
  width="90%" />

### Coloring Usernames

When a user sends a chat message, their username displays as the prefix portion of the message. By default, each user's name is colored according to their `Class.Team.TeamColor|TeamColor` but you can change the colors of chat usernames using `Class.TextChatService.OnIncomingMessage` and [font color tags](../ui/rich-text.md#supported-tags). The following `Class.LocalScript` in `Class.StarterPlayerScripts` assigns a predetermined color to each user, picking randomly from a table of RGB colors.

```lua title='LocalScript' hightlight='10,11,17'
local TextChatService = game:GetService("TextChatService")

local nameColors = {
	Color3.fromRGB(255, 0, 0),
	Color3.fromRGB(0, 255, 0),
	Color3.fromRGB(0, 0, 255),
	Color3.fromRGB(255, 255, 0),
}

TextChatService.OnIncomingMessage = function(textChatMessage: TextChatMessage)
	local properties = Instance.new("TextChatMessageProperties")

	local textSource = textChatMessage.TextSource
	if textSource then
		local index: number = (textSource.UserId % #nameColors) + 1
		local randomColor: Color3 = nameColors[index]
		properties.PrefixText = string.format("<font color='#%s'>%s</font>", randomColor:ToHex(), textChatMessage.PrefixText)
	end

	return properties
end
```

### Customizing Translated Messages

By default, Roblox [automatically translates](../production/localization/automatic-translations.md) text chat messages based on users' language settings. To apply message customizations to translated messages, use the `Class.TextChatMessage.Translation` property. The following example, a `Class.Script` in `Class.ReplicatedStorage` with its `Enum.RunContext` property as `Client`, sets the font color of translated messages to the same color as untranslated messages.

```lua title='Script'
local TextChatService = game:GetService("TextChatService")

local FONT_COLOR = "#FF007F"
local FORMAT_STRING = `<font color='{FONT_COLOR}'>%s</font>`

local function onIncomingChatMessage(textChatMessage: TextChatMessage)
	local properties = Instance.new("TextChatMessageProperties")

	properties.Text = string.format(FORMAT_STRING, textChatMessage.Text)

	if textChatMessage.Translation then
		properties.Translation = string.format(FORMAT_STRING, textChatMessage.Translation)
	end

	return properties
end

TextChatService.OnIncomingMessage = onIncomingChatMessage
```

## Adding Chat Bubbles

In addition to displaying messages on the chat window, you can add and customize chat bubbles above user avatars and NPC characters for immersive engagement. For more information, see [Bubble Chat](../chat/bubble-chat.md).
