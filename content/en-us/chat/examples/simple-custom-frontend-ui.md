---
title: Custom text chat UI
description: Example of how to create a simple frontend UI powered with TextChatService.
---

This example shows how to use the `Class.TextChatService` API to design your own frontend. It reuses the default text channels from `TextChatService.CreateDefaultTextChannels` and is very simple compared to the default UI.

1. First, disable the default UI that comes with the `TextChatService` by setting the `ChatWindowConfiguration.Enabled` and `ChatInputBarConfiguration.Enabled` properties to `false` in the Studio properties window.

   ![Explorer and Properties windows showing how to disable the default UI.](../../assets/players/in-experience-text-chat/TextChat-Example1.png)

2. Create a replacement for the chat input bar. This is the text box that emits messages when the user presses <kbd>Enter</kbd>.

   1. Create a `ScreenGui` and parent it to the `StarterGui`.
   2. Create a `TextBox` and parent it to the `ScreenGui`. To position the text box at the bottom-center of the screen, set the `TextBox.AnchorPoint` to `Vector2.new(0.5, 1)` and the `TextBox.Position` to `UDim2.new(0.5, 0, 1, 0)`.
   3. Create a `LocalScript` and parent it to the `TextBox`.
   4. Add the following code to the `LocalScript`:

      ```lua title='Client'
      --!strict
      local TextChatService = game:GetService("TextChatService")

      -- RBXGeneral is the default public channel created by TextChatService.CreateDefaultTextChannels
      local RBXGeneral = TextChatService:FindFirstChild("TextChannels"):WaitForChild("RBXGeneral")

      local TextBox = script.Parent
      TextBox.FocusLost:Connect(function(enterPressed)
        local text = TextBox.Text
        if enterPressed and #text > 0 then
          local success, response = pcall(function()
            return RBXGeneral:SendAsync(TextBox.Text)
          end)

          if not success then
            RBXGeneral:DisplaySystemMessage("Failed to send message")
          end

          -- Users expect the TextBox to be cleared after sending a message
          TextBox.Text = ""
        end
      end)
      ```

3. Create a replacement for the chat window. This is the `ScrollingFrame` that displays messages as they are received from `TextChatService.MessageReceived`. This step also creates a `UIListLayout` to automatically layout the messages.

   1. Create a `ScreenGui` and parent it to the `StarterGui`.
   2. Create a `ScrollingFrame` and parent it to the `ScreenGui`.
   3. Create a `UIListLayout` and parent it to the `ScrollingFrame`.
   4. Create a `LocalScript` and parent it to the `ScrollingFrame`.
   5. Add the following code to the `LocalScript`:

      ```lua title='Client'
      --!strict
      local TextChatService = game:GetService("TextChatService")

      -- addMessageGui will create a new TextLabel for each message received
      local function addMessageGui(textChatMessage: TextChatMessage)
        local isOutgoingMessage = textChatMessage.Status == Enum.TextChatMessageStatus.Sending

        local parent = script.Parent

        -- First check if the message already exists in the chat window.
        -- TextChatService.MessageReceived will be called once when sending and once when the message is received from the server.
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

The final view in the Explorer should look like this:

![A view of the Explorer window after configuring the custom chat UI as specified.](../../assets/players/in-experience-text-chat/TextChat-Example2.png)

When using the `TextChatService.MessageReceived` event, it is important to check if the message already exists in the chat window. This event is called once when sending and once when the message is received from the server.

Test your experience by sending messages in the chat input bar. You should see the messages appear in the chat window. You can expand on this example by adding features such as focusing the TextBox when a key is pressed or adding chat tags.
