---
title: Cross-server messaging
description: Cross-server messaging enables you to communicate with other servers or client instances of your experience.
---

Normally, the code within an experience can only affect the server or clients that it's running on, but there may be situations where you want different servers to communicate with each other, including:

- **Global Announcements** &mdash; Send announcements such as "A user found a special item!" to all the experience's servers.
- **Real-Time Server Browser** &mdash; Compile a list of all the experience's servers and who is in them (updated every minute) and display the list on a maximum of 20 servers.

You can support cross-server messaging in your experience using `Class.MessagingService`. You can also use the [Teleportation Playground](https://www.roblox.com/games/3112653247/Teleportation-Playground) sample experience to see how cross‑server messaging works before you implement it. Lastly, see [here](../cloud/guides/usage-messaging.md) to explore cross‑server communication using external tools.

## Cross-server messaging setup

To enable cross-server messaging, you must set up a **topic** which is a customized message channel that's accessible from multiple servers. After you create a topic, you can [subscribe users](#subscribe-users-to-receive-messages) to the topic to receive messages and enable [publishing messages](#publish-messages) to the topic.

### Subscribe users to receive messages

Use `Class.MessagingService:SubscribeAsync()` to subscribe users to a topic and specify a callback function that detects messages publishing to that topic. For example, the following code sample subscribes all users to a **FriendServerEvent** topic that receives messages when any user is teleported to a different server.

```lua
local MessagingService = game:GetService("MessagingService")
local Players = game:GetService("Players")

local MESSAGING_TOPIC = "FriendServerEvent"

Players.PlayerAdded:Connect(function(player)
	-- Subscribe to the topic
	local subscribeSuccess, subscribeConnection = pcall(function()
		return MessagingService:SubscribeAsync(MESSAGING_TOPIC, function(message)
			print(message.Data)
		end)
	end)
	if subscribeSuccess then
		-- Unsubscribe from topic upon player ancestry change
		player.AncestryChanged:Connect(function()
			subscribeConnection:Disconnect()
		end)
	end
end)
```

### Publish messages

Use `Class.MessagingService:PublishAsync()` to match a specific topic and publish a message to it. For example, the following code sample uses `Class.MessagingService:PublishAsync()|PublishAsync()` to notify all users when a user joins a new server, including the `Class.Player.Name` representing the user's display name and the `Class.DataModel.JobId|JobId`, a unique identifier for the running experience server instance.

```lua
local MessagingService = game:GetService("MessagingService")
local Players = game:GetService("Players")

local MESSAGING_TOPIC = "FriendServerEvent"

Players.PlayerAdded:Connect(function(player)
	-- Publish to topic
	local publishSuccess, publishResult = pcall(function()
		local message = player.Name .. " joined server with 'JobId' of " .. game.JobId
		MessagingService:PublishAsync(MESSAGING_TOPIC, message)
	end)
	if not publishSuccess then
		print(publishResult)
	end
end)
```
