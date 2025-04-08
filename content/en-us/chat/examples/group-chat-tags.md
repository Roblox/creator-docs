---
title: Assign chat tags
description: Example of how to assign chat tags to players based on their membership in a group.
---

This example demonstrates how to assign **chat tags** to players based on their membership in a [group](../../projects/groups.md). Chat tags are a way to visually identify a player in the chat window and useful for indicating a player's role or status.

<img src="../../assets/players/in-experience-text-chat/Chat-Tag-VIP.png" width="780" alt="VIP chat tag appended to user name in the chat window." />

Because [text chat callbacks](../in-experience-text-chat.md#text-chat-hooks-and-callbacks) expect a non-yielding callback, attempting to query the group membership status of a player in the `Class.TextChatService.OnIncomingMessage` callback is not recommended, as it may cause the chat system to hang or become unresponsive.

Instead, set a player [attribute](../../studio/properties.md#instance-attributes) when they join the server. Setting an attribute lets you reuse the player's status in other parts of your experience such as allowing access to particular areas or providing bonus experience.

1. Create a `Class.Script` in `Class.ServerScriptService` and add the following code to it:

		```lua title="Server"
		local Players = game:GetService("Players")

		-- Replace 123456 with the group ID you want to check for
		local groupID = 123456

		Players.PlayerAdded:Connect(function(player)
			local success, isInGroup = pcall(function()
				return player:IsInGroup(groupID)
			end)

			if success and isInGroup then
				player:SetAttribute("IsVIP", true)
			else
				player:SetAttribute("IsVIP", false)
			end
		end)
		```

2. Create a `Class.LocalScript` in `Class.StarterPlayer` ⟩ `Class.StarterCharacterScripts` and add the following code to display a **\[VIP\]** tag in the chat window:

		```lua title="Client"
		local Players = game:GetService("Players")
		local TextChatService = game:GetService("TextChatService")

		TextChatService.OnIncomingMessage = function(message: TextChatMessage)
			local textSource = message.TextSource
			if textSource then
				local player = Players:GetPlayerByUserId(textSource.UserId)
				if player then
					if player:GetAttribute("IsVIP") == true then
						local overrideProperties = Instance.new("TextChatMessageProperties")
						overrideProperties.PrefixText = "[VIP] " .. message.PrefixText
						return overrideProperties
					end
				end
			end

			return nil
		end
		```
