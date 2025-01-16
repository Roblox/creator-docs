---
title: Custom text chat system messages
description: Learn how to display and format system messages in the chat window.
---

To display a system message in the chat window, use the `Class.TextChatService:DisplaySystemMessage` method. This method allows you to display any message in the chat window, with the option to customize the message's appearance.

Similar to other UI elements in your experience, these messages are intended to be experience-driven and are not subject to automatic text filtering or attributed to a user for moderation unlike messages sent by players through `Class.TextChannel:SendAsync`.

<Alert severity="info">
  You can only call `Class.TextChatService:DisplaySystemMessage` from client scripts.
</Alert>

`Class.TextChatService:DisplaySystemMessage` takes two arguments:

- `message` (string): The message to display in the chat window.
- `metadata` (string): The metadata to apply to the message. This is not shown to the user, but can be used to identify or categorize messages unique to your project.

First, create a `LocalScript` in **StartCharacterScripts**, and add the following code to it:

```lua title='Client'
local Players = game:GetService("Players")

local TextChatService = game:GetService("TextChatService")
local TextChannel = TextChatService:WaitForChild("TextChannels").RBXSystem

TextChannel:DisplaySystemMessage("Hello " .. Players.LocalPlayer.Name, "WelcomeMessage")
```

To customize the appearance of the message, use the `TextChannel.OnIncomingMessage` callback and identify the message with the `TextChatMessage.Metadata` property.

When `TextChannel.OnIncomingMessage` returns a `TextChatMessageProperties` instance, it's used to override the default message properties. This allows us to customize the appearance of our message.

In the same Script as before, add the following code. We will set the `TextColor` property of the `TextChatMessageProperties` Instance to red. This will change the color of the message to red when the message's metadata is "WelcomeMessage".

```lua title='Client'
TextChannel.OnIncomingMessage = function(message: TextChatMessage)
  if message.Metadata == "WelcomeMessage" then
    local overrideProperties = Instance.new("TextChatMessageProperties")
    overrideProperties.TextColor = Color3.fromRGB(255, 0, 0)
    return overrideProperties
  end

  return nil
end
```

## Use metadata to categorize messages

Use metadata however you see fit to categorize messages and apply different styles to different types of messages.

For example, you could use metadata to identify system messages, error messages, or messages from specific systems in your experience. We can use this method to group similar messages together and apply the same style to all messages in that group.

```lua title='Client'
TextChannel:DisplaySystemMessage("This is an error!", "Game.Error.Generic")
TextChannel:DisplaySystemMessage("Could not find save data!", "Game.Error.SaveDataNotFound")

TextChannel:DisplaySystemMessage("You won the game!", "Game.Info.Win")
TextChannel:DisplaySystemMessage("You lost the game!", "Game.Info.Lose")

TextChannel.OnIncomingMessage = function(message: TextChatMessage)
  if string.find(message.Metadata, "Error") then
    local overrideProperties = Instance.new("TextChatMessageProperties")
    overrideProperties.TextColor = Color3.fromRGB(255, 0, 0)
    return overrideProperties
  elseif string.find(message.Metadata, "Info") then
    local overrideProperties = Instance.new("TextChatMessageProperties")
    overrideProperties.TextColor = Color3.fromRGB(0, 255, 150)
    return overrideProperties
  end

  return nil
end
```
