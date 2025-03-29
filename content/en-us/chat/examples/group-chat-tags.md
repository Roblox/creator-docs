---
title: Assign chat tags by group membership
description: Example of how to assign chat tags to players based on their membership of a group.
---

This example demonstrates how to assign chat tags to players based on their membership of a group. Chat tags are a way to visually identify a player in the chat window and useful for indicating a player's role, status, or group membership.

First, create a script in ServerScriptService, and add the following code to it:

```lua title="Server"
local Players = game:GetService("Players")

-- Replace 123456 with the Group ID you want to check for
local groupId = 123456

Players.PlayerAdded:Connect(function(player)
  local success, isInGroup = pcall(function()
    return player:IsInGroup(groupId)
  end)

  if success and isInGroup then
    player:SetAttribute("isFanClubMember", true)
  else
    player:SetAttribute("isFanClubMember", false)
  end
end)
```

Because [Text Chat callbacks](../in-experience-text-chat.md#text-chat-hooks-and-callbacks) expect a non-yielding callback, attempting to query the group membership status of a player in the `TextChatService.OnIncomingMessage` callback is not recommended, as it may cause the chat system to hang or become unresponsive.

Instead, set a player attribute when they join the server. Setting an attribute lets you reuse this information in other parts of your experience. For example, in addition to setting chat tag, you might use it to allow access to particular areas or provide bonus experience.

Then create a `LocalScript` in **StartCharacterScripts**, and add the following code to it to display a **\[Fan\]** tag in the chat window:

```lua title="Client"
local Players = game:GetService("Players")
local TextChatService = game:GetService("TextChatService")


TextChatService.OnIncomingMessage = function(message: TextChatMessage)
  local textSource = message.TextSource
  if textSource then
    local player = Players:GetPlayerByUserId(textSource.UserId)
    if player then
      local isFanClubMember = player:GetAttribute("isFanClubMember")
      if isFanClubMember == true then
        local overrideProperties = Instance.new("TextChatMessageProperties")
        overrideProperties.PrefixText = `[Fan] {message.PrefixText}`
        return overrideProperties
      end
    end
  end

  return nil
end
```

![Chat window showing the Fan tag.](../../assets/players/in-experience-text-chat/TextChat-Group-Tag.png)
