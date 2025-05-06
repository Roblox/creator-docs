---
title: Custom text chat commands
description: Learn how to create custom chat commands.
---

`Class.TextChatService` has built-in chat commands for common purposes, such as muting other players and using avatar emotes. You can enable them by setting `Class.TextChatService.CreateDefaultCommands|CreateDefaultCommands` to `true` in Studio's **Properties** window.

You can also add custom commands using `Class.TextChatCommand`. Users sending a defined command in the chat input bar trigger a callback defined by `Class.TextChatCommand.Triggered` to perform your customized actions.

The following example shows how to create a chat command that allows players to increase or decrease their character's size when they input `/super` or `/mini`.

1. Add a `Class.TextChatCommand` instance inside `Class.TextChatService`.
2. Rename it to **SizeCommand**.

   <img src="../../assets/studio/explorer/TextChatService-TextChatCommand.png" width="320" />

3. Set its `Class.TextChatCommand.PrimaryAlias|PrimaryAlias` property to `/super` and its `Class.TextChatCommand.SecondaryAlias|SecondaryAlias` to `/mini`.

   <img src="../../assets/players/in-experience-text-chat/TextChatCommand-Aliases.png" width="320" />

4. Insert the following `Class.Script` inside `Class.ServerScriptService` to define a callback for the chat command that scales the character's size:

		```lua title="Script" highlight="4,6"
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
					local humanoid = character:FindFirstChildWhichIsA("Humanoid")
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

   <video controls src="../../assets/players/in-experience-text-chat/Text-Custom-Command.mp4" width="90%"></video>
