---
title: Text Filtering
description: Text Filtering prevents users from seeing inappropriate language, and blocks personally identifiable information.
---

Applying proper **text filtering** is one of the most important ways to keep your experiences safe and secure. Roblox has a text filtering feature that not only prevents users from seeing inappropriate languages, but also blocks personally identifiable information.

Because filtering is crucial for a safe environment, Roblox actively moderates the content of experiences to make sure they meet [community standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards). If Roblox receives reports or automatically detects that your experience doesn't apply filtering, then the system removes the experience until you add text filtering.

<Alert severity="info">
If you use `Class.TextChatService` to support [in-experience text chat](../chat/customizing-in-experience-text-chat.md), you don't need to filter chat messages manually because `Class.TextChannel:SendAsync()` automatically filters all inappropriate chat messages.
</Alert>

## Types of Text to Filter

You must filter any displayed text that you don't have explicit control over to make sure your experiences are compliant. Examples include:

- **User Input** - Users can display text to others by:

  - **Text Input** - `Class.TextBox` input, custom GUI with character buttons, and interactive keyboard models in the 3D space.

  - **Implicit Input** - Spelling out words with 3D `Class.Part|Parts` and `Class.Model|Models`.

- **Random Words** - If your experience generates words from random characters and displays them to users, there is a chance that it creates inappropriate words.

- **External Sources** - Some experiences connect to external web servers that fetch content to display information in experience. Sometimes you don't have the full control of the content of the external site, and a third party can edit the information.

- **Stored Text** - If your experience stores text such as a chat log or a user's pet name using [data stores](../cloud-services/datastores.md), and the stored text might include inappropriate words, you should filter the text strings when retrieving them. This ensures that you use the most up-to-date version of the text filter.

<Alert severity="warning">
Do not filter text in real-time when users type on the client, such as entering text into a `Class.TextBox`, as it delays the message preview that is only visible to the user typing it. Instead, filter the entered text after the user submits it.
</Alert>

## Filtering Text

`Class.TextService:FilterStringAsync()` filters in-experience text by taking a string of text and the `Class.Player.UserId|UserId` of the user who created the text as input. It returns a `Class.TextFilterResult` object that can differ for each user since `Class.TextService` determines different filtering levels based on age and other details.

```lua
local TextService = game:GetService("TextService")

local filteredText = ""
local success, errorMessage = pcall(function()
	filteredTextResult = TextService:FilterStringAsync(text, fromPlayerId)
end)
if not success then
	warn("Error filtering text:", text, ":", errorMessage)
	-- Put code here to handle filter failure
end
```

<Alert severity="warning">
Note that you should always wrap `Class.TextService:FilterStringAsync()` in `Global.LuaGlobals.pcall()` since it's an asynchronous network call that may occasionally fail. If the `Global.LuaGlobals.pcall()` fails, you should **not** display the text because it's safer to display empty text than unfiltered text.
</Alert>

The `Class.TextFilterResult` object returned by `Class.TextService:FilterStringAsync()` has two methods that you can call in different cases:

- `Class.TextFilterResult:GetNonChatStringForBroadcastAsync()` for filtering text visible to all users in an experience.
- `Class.TextFilterResult:GetNonChatStringForUserAsync()` to display filtered text for one specific user, such as the name of a pet.

The following example sets up a dialog that lets a user write a message on a sign. Since everyone in the server can read the sign, including users who join the experience after the author has left, it's filtered with `Class.TextFilterResult:GetNonChatStringForBroadcastAsync()`.

```lua title='LocalScript'
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")
local screen = playerGui:WaitForChild("MessageScreen")

-- GUI elements for dialog
local frame = screen.Frame
local messageInput = frame.Message
local sendButton = frame.Send

-- RemoteEvent to send text to server for filtering and display
local setSignText = ReplicatedStorage.SetSignText

-- Called when button is clicked
local function onClick()
	local message = messageInput.Text
	if message ~= "" then
		frame.Visible = false
		setSignText:FireServer(message)
	end
end

sendButton.Activated:Connect(onClick)
```

```lua title='Script'
local TextService = game:GetService("TextService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local sign = workspace.Sign
local signTop = sign.Top
local signSurfaceGui = signTop.SurfaceGui
local signLabel = signSurfaceGui.SignLabel

local setSignText = ReplicatedStorage.SetSignText

local function getTextObject(message, fromPlayerId)
	local textObject
	local success, errorMessage = pcall(function()
		textObject = TextService:FilterStringAsync(message, fromPlayerId)
	end)
	if success then
		return textObject
	end
	print("Error generating TextFilterResult: ", errorMessage)
	return false
end

local function getFilteredMessage(textObject)
	local filteredMessage
	local success, errorMessage = pcall(function()
		filteredMessage = textObject:GetNonChatStringForBroadcastAsync()
	end)
	if success then
		return filteredMessage
	end
	print("Error filtering message: ", errorMessage)
	return false
end

-- Fired when client sends a request to write on the sign
local function onSetSignText(player, text)
	if text ~= "" then
		-- Filter the incoming message and send the filtered message
		local messageObject = getTextObject(text, player.UserId)
		local filteredText = ""
		filteredText = getFilteredMessage(messageObject)
		signLabel.Text = filteredText
	end
end

setSignText.OnServerEvent:Connect(onSetSignText)
```
