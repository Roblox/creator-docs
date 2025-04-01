---
title: Custom text chat UI
description: Example of how to create a simple frontend UI powered with TextChatService.
---

This example shows how to use the `Class.TextChatService` class to design your own frontend. It reuses the default text channels from `Class.TextChatService.CreateDefaultTextChannels|CreateDefaultTextChannels` and is very simple compared to the default UI.

1. Disable the default UI that comes with the `Class.TextChatService` by setting the `Class.ChatWindowConfiguration.Enabled` and `Class.ChatInputBarConfiguration.Enabled` properties to `false` in Studio's **Properties** window.
2. Create a replacement for the chat input bar. This is the text box that emits messages when the user presses <kbd>Enter</kbd>.

   1. Create a `Class.ScreenGui` and parent it to `Class.StarterGui`.
   2. Create a `Class.TextBox` and parent it to the new `Class.ScreenGui`, then [reposition](../../ui/position-and-size.md#position) and [resize](../../ui/position-and-size.md#size) it as desired.
   3. Create a `Class.LocalScript` and parent it to the new `Class.TextBox`.
   4. Add the following code to the `Class.LocalScript`:

			```lua title="Client"
			local TextChatService = game:GetService("TextChatService")

			-- RBXGeneral is the default public channel
			local RBXGeneral = TextChatService:FindFirstChild("TextChannels"):WaitForChild("RBXGeneral")

			local textBox = script.Parent
			textBox.FocusLost:Connect(function(enterPressed)
				local text = textBox.Text
				if enterPressed and #text > 0 then
					local success, response = pcall(function()
						return RBXGeneral:SendAsync(textBox.Text)
					end)

					if not success then
						RBXGeneral:DisplaySystemMessage("Failed to send message")
					end

					-- Users expect the input box to be cleared after sending a message
					textBox.Text = ""
				end
			end)
			```

3. Create a replacement for the chat window. This is the `Class.ScrollingFrame` that displays messages as they are received from `Class.TextChatService.MessageReceived`. This step also creates a `Class.UIListLayout` to automatically layout the messages.

   1. Create another new `Class.ScreenGui` and parent it to `Class.StarterGui`.
   2. Create a `Class.ScrollingFrame` and parent it to the `ScreenGui`, then [reposition](../../ui/position-and-size.md#position) and [resize](../../ui/position-and-size.md#size) it as desired.
   3. Create a `Class.UIListLayout` and parent it to the `Class.ScrollingFrame`.
   4. Create a `Class.LocalScript` and parent it to the `Class.ScrollingFrame`.
   5. Add the following code to the `Class.LocalScript`:

		```lua title="Client"
		local TextChatService = game:GetService("TextChatService")

		-- Function to create a new text label for each message received
		local function addMessageGui(textChatMessage: TextChatMessage)
			local isOutgoingMessage = textChatMessage.Status == Enum.TextChatMessageStatus.Sending

			local parent = script.Parent

			local originalLabel = parent:FindFirstChild(textChatMessage.MessageId)
			if originalLabel then
				originalLabel.Text = textChatMessage.Text
				originalLabel.BackgroundTransparency = if isOutgoingMessage then 0.5 else 0
			else
				local textLabel = Instance.new("TextLabel")
				textLabel.BorderSizePixel = 0
				textLabel.Font = Enum.Font.BuilderSans
				textLabel.TextSize = 18
				textLabel.TextXAlignment = Enum.TextXAlignment.Left
				textLabel.BackgroundTransparency = if isOutgoingMessage then 0.5 else 0
				textLabel.BackgroundColor3 = Color3.fromRGB(0, 0, 0)
				textLabel.TextColor3 = Color3.fromRGB(255, 255, 255)
				textLabel.Name = textChatMessage.MessageId
				textLabel.AutomaticSize = Enum.AutomaticSize.XY
				textLabel.Text = textChatMessage.Text
				textLabel.Parent = parent
			end
		end

		-- Start listening for incoming messages
		TextChatService.MessageReceived:Connect(addMessageGui)
		```

		<Alert severity="warning">
		When using the `Class.TextChatService.MessageReceived` event, it's important to check if the message already exists in the chat window. This event is called once when sending and once when the message is received from the server.
		</Alert>
4. Test your experience by sending messages in the chat input bar. You should see the messages appear in the chat window. You can then expand on this example by adding features such as focusing the `Class.TextBox` when a key is pressed or adding [chat tags](./group-chat-tags.md).
