---
title: In-Experience Leaderboards
description: In-experience Leaderboards let you display user information to all users in the experience, such as top scores.
---

Roblox has a built-in **leaderboard system** that lets you display user information like scores, currency, or the fastest time in a race.

<img alt="Leaderboard Screen" src="../assets/ui/leaderboard/Leaderboard-Screen-1.jpeg" width="80%" />

## Setting up the Leaderboard

To set up the leaderboard and add players when they enter the experience:

1. Create a new `Class.Script` within `Class.ServerScriptService`.

   <img alt="Leaderboard Insert Script" src="../assets/ui/leaderboard/Leaderboards-Insert-Script.png" width="80%" />

2. In the script, connect a function to the `Class.Players.PlayerAdded|PlayerAdded` event.

   ```lua
   local Players = game:GetService("Players")

   local function leaderboardSetup(player)

   end

   -- Connect the "leaderboardSetup()" function to the "PlayerAdded" event
   Players.PlayerAdded:Connect(leaderboardSetup)
   ```

3. Inside the connected function, create a new `Class.Folder` instance, name it `leaderstats`, and parent it to the player.

   ```lua
   local Players = game:GetService("Players")

   local function leaderboardSetup(player)
   	local leaderstats = Instance.new("Folder")
   	leaderstats.Name = "leaderstats"
   	leaderstats.Parent = player
   end

   -- Connect the "leaderboardSetup()" function to the "PlayerAdded" event
   Players.PlayerAdded:Connect(leaderboardSetup)
   ```

<Alert severity="warning">
	It's essential that the folder is named `leaderstats` with all lowercase letters. Roblox doesn't add the player to the leaderboard if you name it any other way.
</Alert>

## Adding Stats

Leaderboards use **value type objects** to store and display player stats. This script will show a player's gold using an `Class.IntValue`, a placeholder for an integer.

In the `leaderboardSetup()` function, add lines 8 through 11:

```lua
local Players = game:GetService("Players")

local function leaderboardSetup(player)
	local leaderstats = Instance.new("Folder")
	leaderstats.Name = "leaderstats"
	leaderstats.Parent = player

	local gold = Instance.new("IntValue")
	gold.Name = "Gold"
	gold.Value = 0
	gold.Parent = leaderstats
end

-- Connect the "leaderboardSetup()" function to the "PlayerAdded" event
Players.PlayerAdded:Connect(leaderboardSetup)
```

These lines accomplish the following:

1. An `Class.IntValue` instance is created.

2. The instance's `Class.Instance.Name|Name` is set to **Gold**. This is exactly how the stat will appear on the in-game leaderboard.

   <img alt="Leaderboards Name Column" src="../assets/ui/leaderboard/Leaderboards-Name-Column.png" width="80%" />

3. The stat's initial `Class.IntValue.Value|Name` is set to **0**. This can be set to any value you wish, including a value stored in a [data store](../cloud-services/datastores.md) if you're implementing persistent leaderboards.

   <Alert severity="info">
     	Value type objects such as `Class.IntValue`, `Class.NumberValue`, and `Class.StringValue` must be set through their `Value` property, as in `gold.Value = 0`, not by direct declaration, as in `gold = 0`.
    </Alert>

4. The instance is parented to the **leaderstats** folder which adds it to the leaderboard. When players enter the game, their names appear on the board.

   <img alt="Leaderboards Multiple Players" src="../assets/ui/leaderboard/Leaderboards-Multiple-Players.png" width="80%" />

## Updating Stats

To update a player's leaderboard stat, change the `Value` property of that stat within their `leaderstats` folder. For example, you can attach the following `Class.Script` to any pickup object to increase the **Gold** stat of the player collects it.

```lua
local Players = game:GetService("Players")

local goldChunk = script.Parent

local function onPartTouch(otherPart)
	local partParent = otherPart.Parent
	local humanoid = partParent:FindFirstChildWhichIsA("Humanoid")
	if humanoid then
		-- Destroy the pickup
		goldChunk:Destroy()
		-- Update the player's leaderboard stat
		local player = Players:GetPlayerFromCharacter(partParent)
		local leaderstats = player.leaderstats
		local goldStat = leaderstats and leaderstats:FindFirstChild("Gold")
		if goldStat then
			goldStat.Value += 10
		end
	end
end
goldChunk.Touched:Connect(onPartTouch)
```

## Ordering Stats

There are three ways to control the order of stats in a leaderboard:

- Add the stats in the order that you want them to appear.
- Add a child `Class.BoolValue` named `IsPrimary` to the stat. Set its value to true to place the stat first in the leaderboard.
- Add a child `Class.NumberValue` named `Priority` to the stat. Set its value to an integer. Higher priority values appear earlier in the leaderboard. Stats without a priority have a default priority of 0.

This code sample shows how to add `IsPrimary` and `Priority` values to a stat:

```lua
local Players = game:GetService("Players")

local function leaderboardSetup(player)
	local leaderstats = Instance.new("Folder")
	leaderstats.Name = "leaderstats"
	leaderstats.Parent = player

	local gold = Instance.new("IntValue")
	gold.Name = "Gold"
	gold.Value = 0
	gold.Parent = leaderstats
	local priorityGold = Instance.new("NumberValue")
	priorityGold.Name = "Priority"
	priorityGold.Value = 1
	priorityGold.Parent = gold
	local isPrimary = Instance.new("BoolValue")
	isPrimary.Name = "IsPrimary"
	isPrimary.Value = true
	isPrimary.Parent = gold
end
Players.PlayerAdded:Connect(leaderboardSetup)
```

<Alert severity="info">
`IsPrimary` takes precedence over any `Priority` values. If multiple stats have `IsPrimary` values set to true, their `Priority` values determine the leaderboard order.
</Alert>

## Hiding the Leaderboard

To hide the leaderboard, such as on a menu screen or during a cutscene, place a `Class.LocalScript` within `Class.StarterGui` or `Class.StarterPlayerScripts` containing a call to `Class.StarterGui:SetCoreGuiEnabled()|StarterGui`.

```lua
local StarterGui = game:GetService("StarterGui")

StarterGui:SetCoreGuiEnabled(Enum.CoreGuiType.PlayerList, false)
```
