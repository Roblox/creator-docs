---
title: Script an upgrade button
description: Explains how to communicate with the Roblox server and handle GUI interactions.
prev: /tutorials/curriculums/core/scripting/create-player-hazards
next: /tutorials/curriculums/core/building/create-basic-visual-effects
---

<iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/MSGrq7f25lg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

<br/>

Players can now collect coins and lose them when they die, but the coins don't do anything, and most of the 3D world is inaccessible without the ability to jump very high. This section of the tutorial teaches you how to finish the logic for your experience by adding an on-screen button that spends coins to increase jumping power.

## Create the upgrade button

2D interfaces in Roblox are typically made up of a collection of GUI components inside of a GUI container. In this case, you only need a `Class.TextButton` component that says Upgrade Jump (5 Coins) inside a `Class.ScreenGui` container.

<Tabs>
<TabItem key = "1" label="Build with Assistant">

```text title="Set up the upgrade GUI"
In ReplicatedStorage, create a folder named Instances.

Inside the Instances folder, create a ScreenGui named JumpPurchaseGui with ResetOnSpawn disabled.

Inside JumpPurchaseGui, create a TextButton named JumpButton with the following properties:
- Text: "Upgrade Jump (5 Coins)"
- TextSize: 25
- AnchorPoint: 1, 1
- Position: {1, 0}, {1, 0}

Also inside the Instances folder, create a RemoteFunction named IncreaseJumpPowerFunction.

Finally, on the StarterPlayer service, enable the CharacterUseJumpPower property.
```

</TabItem>
<TabItem key = "2" label="Build it Yourself">

For the upgrade button, you'll create a folder inside **ReplicatedStorage** to hold the upgrade system, including a **ScreenGui** that contains the button and a **RemoteFunction** that clients use to request upgrades from the server. Storing these objects in **ReplicatedStorage** makes them accessible to both clients and the server.

1. In the **Explorer**, hover over **ReplicatedStorage**, click **&CirclePlus;**, and insert a folder. Rename it **Instances**. This is where you'll keep shared objects that the client and server both need.
2. Insert a **ScreenGui** into the **Instances** folder. In the **Properties** window:

   1. Set **Name** to **JumpPurchaseGui**.
   2. Disable **ResetOnSpawn** so the GUI doesn't get wiped when the player respawns.

3. Insert a **TextButton** inside **JumpPurchaseGui** and rename it **JumpButton**. In the **Properties** window:

   1. Set **Text** to **Upgrade Jump (5 Coins)**.
   2. Set **TextSize** to `25`.
   3. Set **AnchorPoint** to `1, 1`.
   4. Set **Position** to `{1, 0},{1, 0}`.

4. Back in the **Instances** folder, insert a **RemoteFunction** and rename it **IncreaseJumpPowerFunction**. Remote functions need to live in `ReplicatedStorage` so the client and server can both reference them.

   <img src="../../../../assets/tutorials/script-an-upgrade-button/Insert-RemoteFunction.png" alt="Studio's Explorer window with the IncreaseJumpPowerFunction script highlighted under the Instances folder." width="320" />

5. Select **StarterPlayer** in the Explorer, then in the **Properties** window enable **CharacterUseJumpPower**. Without this, jump power values are ignored and every character jumps at a fixed height.
</TabItem>
</Tabs>

## Define jump power data

Currently, only coin count is stored for each player in the **PlayerData** module script. You need to also store and update jump power in the same way. Because the functions in **PlayerData** are non-specific to the data being changed, all that's required to store player jump power is to add a `Jump` key and initialize its initial value in `defaultPlayerData()`.

<Tabs>
<TabItem key = "1" label="Build with Assistant">

````text title="Update PlayerData with jump power"
In ServerStorage, replace the existing PlayerData ModuleScript's code with the following:

```lua
local PlayerData = {}

PlayerData.COIN_KEY_NAME = "Coins"
PlayerData.JUMP_KEY_NAME = "Jump"

local playerData = {
	--[[
		[userId: string] = {
			["Coins"] = coinAmount: number,
			["Jump"] = jumpPower: number
		}
	--]]
}

local function defaultPlayerData()
	return {
		[PlayerData.COIN_KEY_NAME] = 0,
		[PlayerData.JUMP_KEY_NAME] = 0,
	}
end

local function getData(player)
	local data = playerData[tostring(player.UserId)] or defaultPlayerData()
	playerData[tostring(player.UserId)] = data
	return data
end

function PlayerData.getValue(player, key)
	return getData(player)[key]
end

function PlayerData.updateValue(player, key, updateFunction)
	local data = getData(player)
	local oldValue = data[key]
	local newValue = updateFunction(oldValue)

	data[key] = newValue
	return newValue
end

return PlayerData
```
````

</TabItem>
<TabItem key = "2" label="Build it Yourself">
1. In the **Explorer**, open the **PlayerData** ModuleScript inside **ServerStorage**.
2. Replace its code with the following code to add a `JUMP_KEY_NAME` constant and initialize `Jump` to `0` so that every new player starts with zero jump power:

```lua
local PlayerData = {}

PlayerData.COIN_KEY_NAME = "Coins"
PlayerData.JUMP_KEY_NAME = "Jump"

local playerData = {
	--[[
		[userId: string] = {
			["Coins"] = coinAmount: number,
			["Jump"] = jumpPower: number
		}
	--]]
}

local function defaultPlayerData()
	return {
		[PlayerData.COIN_KEY_NAME] = 0,
		[PlayerData.JUMP_KEY_NAME] = 0,
	}
end

local function getData(player)
	local data = playerData[tostring(player.UserId)] or defaultPlayerData()
	playerData[tostring(player.UserId)] = data
	return data
end

function PlayerData.getValue(player, key)
	return getData(player)[key]
end

function PlayerData.updateValue(player, key, updateFunction)
	local data = getData(player)
	local oldValue = data[key]
	local newValue = updateFunction(oldValue)

	data[key] = newValue
	return newValue
end

return PlayerData
```

</TabItem>
</Tabs>

## Update jump power data

Now that **PlayerData** is able to track jump power, you need to implement logic on the server to upgrade jump power from a player's client request.

The server and client can communicate through either `Class.RemoteEvent|RemoteEvents` or `Class.RemoteFunction|RemoteFunctions`. Remote events don't yield when they're fired and can be used for one-way communication. Remote functions, on the other hand, yield until they receive a reply, which allows for two-way communication.

For this tutorial, the client needs to know if the server upgraded the player's jump power successfully, so you should use a remote function.

<Tabs>
<TabItem key = "1" label="Build with Assistant">

````text title="Create JumpService"
In ServerScriptService, create a Script named JumpService with the following code:

```lua
-- Services
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local ServerStorage = game:GetService("ServerStorage")
local Players = game:GetService("Players")

-- Modules
local Leaderboard = require(ServerStorage.Leaderboard)
local PlayerData = require(ServerStorage.PlayerData)

-- Events
local IncreaseJumpPowerFunction = ReplicatedStorage.Instances.IncreaseJumpPowerFunction

local JUMP_KEY_NAME = PlayerData.JUMP_KEY_NAME
local COIN_KEY_NAME = PlayerData.COIN_KEY_NAME
local JUMP_POWER_INCREMENT = 30
local JUMP_COIN_COST = 5

local function updateJumpPower(player, updateFunction)
	-- Update the jump power table
	local newJumpPower = PlayerData.updateValue(player, JUMP_KEY_NAME, updateFunction)

	-- Update the players jump power
	local character = player.Character or player.CharacterAdded:Wait()
	local humanoid = character:FindFirstChildWhichIsA("Humanoid")
	if humanoid then
		humanoid.JumpPower = newJumpPower

		-- Update the jump leaderboard
		Leaderboard.setStat(player, JUMP_KEY_NAME, newJumpPower)
	end
end

local function onPurchaseJumpIncrease(player)
	local coinAmount = PlayerData.getValue(player, COIN_KEY_NAME)
	if coinAmount < JUMP_COIN_COST then
		return false
	end

	-- Increase player's jump power
	updateJumpPower(player, function(oldJumpPower)
		oldJumpPower = oldJumpPower or 0
		return oldJumpPower + JUMP_POWER_INCREMENT
	end)
	-- Update the coin table
	local newCoinAmount = PlayerData.updateValue(player, COIN_KEY_NAME, function(oldCoinAmount)
		return oldCoinAmount - JUMP_COIN_COST
	end)
	-- Update the coin leaderboard
	Leaderboard.setStat(player, COIN_KEY_NAME, newCoinAmount)
	return true
end

local function onCharacterAdded(player)
	-- Reset player's jump power when the character is added
	updateJumpPower(player, function(_)
		return 0
	end)
end

-- Initialize any players added before connecting to PlayerAdded event
for _, player in Players:GetPlayers() do
	onCharacterAdded(player)
end

-- Normal initialization of players from PlayerAdded event
local function onPlayerAdded(player)
	player.CharacterAdded:Connect(function()
		onCharacterAdded(player)
	end)
end

local function onPlayerRemoved(player)
	updateJumpPower(player, function(_)
		return nil
	end)
end

IncreaseJumpPowerFunction.OnServerInvoke = onPurchaseJumpIncrease
Players.PlayerAdded:Connect(onPlayerAdded)
Players.PlayerRemoving:Connect(onPlayerRemoved)
```
````

</TabItem>
<TabItem key = "2" label="Build it Yourself">
1. In the **Explorer**, insert a new **Script** into **ServerScriptService** and rename it **JumpService**. This script holds the server-side logic for the jump upgrade: it receives the request, charges coins, and updates the character's **JumpPower**.
2. Replace the default code with the following:

```lua
-- Services
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local ServerStorage = game:GetService("ServerStorage")
local Players = game:GetService("Players")

-- Modules
local Leaderboard = require(ServerStorage.Leaderboard)
local PlayerData = require(ServerStorage.PlayerData)

-- Events
local IncreaseJumpPowerFunction = ReplicatedStorage.Instances.IncreaseJumpPowerFunction

local JUMP_KEY_NAME = PlayerData.JUMP_KEY_NAME
local COIN_KEY_NAME = PlayerData.COIN_KEY_NAME
local JUMP_POWER_INCREMENT = 30
local JUMP_COIN_COST = 5

local function updateJumpPower(player, updateFunction)
	-- Update the jump power table
	local newJumpPower = PlayerData.updateValue(player, JUMP_KEY_NAME, updateFunction)

	-- Update the players jump power
	local character = player.Character or player.CharacterAdded:Wait()
	local humanoid = character:FindFirstChildWhichIsA("Humanoid")
	if humanoid then
		humanoid.JumpPower = newJumpPower

		-- Update the jump leaderboard
		Leaderboard.setStat(player, JUMP_KEY_NAME, newJumpPower)
	end
end

local function onPurchaseJumpIncrease(player)
	local coinAmount = PlayerData.getValue(player, COIN_KEY_NAME)
	if coinAmount < JUMP_COIN_COST then
		return false
	end

	-- Increase player's jump power
	updateJumpPower(player, function(oldJumpPower)
		oldJumpPower = oldJumpPower or 0
		return oldJumpPower + JUMP_POWER_INCREMENT
	end)
	-- Update the coin table
	local newCoinAmount = PlayerData.updateValue(player, COIN_KEY_NAME, function(oldCoinAmount)
		return oldCoinAmount - JUMP_COIN_COST
	end)
	-- Update the coin leaderboard
	Leaderboard.setStat(player, COIN_KEY_NAME, newCoinAmount)
	return true
end

local function onCharacterAdded(player)
	-- Reset player's jump power when the character is added
	updateJumpPower(player, function(_)
		return 0
	end)
end

-- Initialize any players added before connecting to PlayerAdded event
for _, player in Players:GetPlayers() do
	onCharacterAdded(player)
end

-- Normal initialization of players from PlayerAdded event
local function onPlayerAdded(player)
	player.CharacterAdded:Connect(function()
		onCharacterAdded(player)
	end)
end

local function onPlayerRemoved(player)
	updateJumpPower(player, function(_)
		return nil
	end)
end

IncreaseJumpPowerFunction.OnServerInvoke = onPurchaseJumpIncrease
Players.PlayerAdded:Connect(onPlayerAdded)
Players.PlayerRemoving:Connect(onPlayerRemoved)
```

</TabItem>
</Tabs>

<BaseAccordion>
<AccordionSummary>
   <Typography variant="h4">Code explanation</Typography>
</AccordionSummary>
<AccordionDetails>

The following sections describe the code in more detail.

- **Update the jump power data** - `updateJumpPower()` updates the jump power of the player and the leaderboard to
  provide visual feedback. This function resembles the code that damages players
  in [Create player hazards](./create-player-hazards.md). Provided a
  `Class.Player.Character|Character` model and `Class.Humanoid` exist for the
  player being upgraded, the function updates the
  `Class.Humanoid.JumpPower|JumpPower` property to the new value stored by
  **PlayerData**, increasing it by 30. If you want your game to last slightly
  longer, you can decrease this number.

- **Validate server requests** - `onPurchaseJumpIncrease()` first checks that the
  player actually has the number of coins required to purchase the upgrade. **All
  requests** from clients to the server should be **validated** to prevent bad
  actors submitting false requests and exploiting your game.

</AccordionDetails>
</BaseAccordion>

## Add the button to the player GUI

A `Class.ScreenGui` object only shows on-screen if it is parented to a player's `Class.PlayerGui` object. By default, this contains the system GUI such as the chat window. You now need to create a script in **ReplicatedStorage** to copy the upgrade button into each player's GUI and implement behavior for when the button is pressed.

<Tabs>
<TabItem key = "1" label="Build with Assistant">

````text title="Create JumpButtonClickHandler"
In ReplicatedStorage, create a Script named JumpButtonClickHandler with RunContext set to Client and the following code:

```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")

local player = Players.LocalPlayer
local playerGui = player.PlayerGui

local IncreaseJumpPowerFunction = ReplicatedStorage.Instances.IncreaseJumpPowerFunction
local jumpPurchaseGui = ReplicatedStorage.Instances.JumpPurchaseGui
local jumpButton = jumpPurchaseGui.JumpButton

local function onButtonClicked()
	local success, purchased = pcall(IncreaseJumpPowerFunction.InvokeServer, IncreaseJumpPowerFunction)
	if not success then
		-- purchased will be the error message if success is false
		error(purchased)
	elseif success and not purchased then
		warn("Not enough coins!")
	end
end

jumpButton.Activated:Connect(onButtonClicked)

-- Add the JumpPurchaseGui to the player's Gui
jumpPurchaseGui.Parent = playerGui
```
````

</TabItem>
<TabItem key = "2" label="Build it Yourself">

1. In the **Explorer**, insert a new **Script** into **ReplicatedStorage**.
2. With the script selected, in the **Properties** window:

   1. Set **Name** to **JumpButtonClickHandler**.
   2. Set **RunContext** to **Client**. This tells the engine to run always run this script on the client to optimize network communication.

3. Replace the default code with the following:

```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")

local player = Players.LocalPlayer
local playerGui = player.PlayerGui

local IncreaseJumpPowerFunction = ReplicatedStorage.Instances.IncreaseJumpPowerFunction
local jumpPurchaseGui = ReplicatedStorage.Instances.JumpPurchaseGui
local jumpButton = jumpPurchaseGui.JumpButton

local function onButtonClicked()
	local success, purchased = pcall(IncreaseJumpPowerFunction.InvokeServer, IncreaseJumpPowerFunction)
	if not success then
		-- purchased will be the error message if success is false
		error(purchased)
	elseif success and not purchased then
		warn("Not enough coins!")
	end
end

jumpButton.Activated:Connect(onButtonClicked)

-- Add the JumpPurchaseGui to the player's Gui
jumpPurchaseGui.Parent = playerGui
```

</TabItem>
</Tabs>

<BaseAccordion>
<AccordionSummary>
  <Typography variant="h4">Code explanation</Typography>
</AccordionSummary>
<AccordionDetails>
   The following sections describe the code in more detail.
   - **Obtain references to the GUI and server function** - The variables
   `IncreaseJumpPowerFunction`, `jumpPurchaseGui`, and `jumpButton` contain
   references to the function and GUI that calls the function that you'll
   need later.
   - **Define the event handler** - `onButtonClicked()` defines logic for
   when users click the upgrade button. It uses `Global.LuaGlobals.pcall|pcall()` (protected call) to invoke the `Class.RemoteFunction`. Any client-server communication like this requires `Global.LuaGlobals.pcall|pcall()` to handle errors or connection issues.
   - **Connect the handler to the button** - The `Class.GuiButton.Activated|Activated` event is compatible on all platforms, including mouse, touchscreen, or gamepad contexts. It triggers when a **click**, **touch**, or **gamepad button** is released.
</AccordionDetails>
</BaseAccordion>

## Playtest

Select **Test** from the dropdown and click **Play**. The **Upgrade Jump** button shows up in the bottom-right corner.

Try clicking the button before you collect any coins to check that it doesn't award you additional jumping power, then try collecting some coins and see if the upgrade works when you click again.

<video controls loop muted>
<source src="../../../../assets/tutorials/script-an-upgrade-button/script-an-upgrade-button-example.mp4" />
</video>

With the code complete, try tuning the difficulty: add coins if the pace feels slow, or remove a few and tuck them in trickier spots if upgrades come too easily.
