---
title: Script an upgrade button
description: Explains how to communicate with the Roblox server and handle GUI interactions.
prev: /tutorials/curriculums/core/scripting/create-player-hazards
next: /tutorials/curriculums/core/building/create-basic-visual-effects
---

<iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/MSGrq7f25lg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<br/>

Players can now collect coins and lose them when they die, but the coins don't
do anything, and most of the 3D world is inaccessible without the ability to
jump very high. This section of the tutorial teaches you how to finish the logic
for your experience by adding an on-screen button that spends coins to increase jumping power.

## Create the upgrade button

2D interfaces in Roblox are typically made up of a collection of GUI components
inside of a GUI container. In this case, you only need a `Class.TextButton`
component that says **Upgrade Jump (5 Coins)** inside a `Class.ScreenGui` container.

To create the GUI:

1. In the **Explorer** window, add a new folder into **ReplicatedStorage**, then rename the folder to **Instances**.
   Any object in **ReplicatedStorage** is accessible to each player's Roblox client, which is where GUIs
   are displayed.
1. Add a **ScreenGui** object into the **Instances** folder.
1. Select the **ScreenGui** object, then in the **Properties** window,
   1. Set **Name** to **JumpPurchaseGui**.
   1. Disable **ResetOnSpawn** to ensure the GUI stays parented to the player when they
      respawn.
1. In the **Explorer** window, insert a **TextButton** into the **JumpPurchaseGui** container, then rename the text
   button to **JumpButton**.
1. **(Optional)** Customize the button's appearance and position by configuring its properties. Simple suggestions include:
   - Set the **Text** property to **Upgrade Jump (5 Coins)**.
   - Set the **TextSize** property to `25`.
   - Set **AnchorPoint** to `1, 1` and **Position** to `{1, 0},{1, 0}` to move the button to the bottom right corner.

You'll add the button to the player's GUI later in this tutorial, but before you
do, you need to define all the logic and data that is required for the button to
work.

## Define jump power data

Currently, only coin count is stored for each player in the **PlayerData**
module script. You need to also store and update jump power in the same
way. Because the functions in **PlayerData** are non-specific to the data being
changed, all that's required to store player jump power is to add a `Jump` key
and initialize its initial value in `DEFAULT_PLAYER_DATA`.

To update the **PlayerData** module script to store jumping power:

1. In the **Explorer** window, open the **PlayerData** module script in
   **ServerStorage**.
2. Replace the code in the script with the following sample, which initializes a
   `Jump` value for each player alongside their existing `Coins` value:

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

   local DEFAULT_PLAYER_DATA = {
   	[PlayerData.COIN_KEY_NAME] = 0,
   	[PlayerData.JUMP_KEY_NAME] = 0,
   }

   local function getData(player)
   	local data = playerData[tostring(player.UserId)] or DEFAULT_PLAYER_DATA
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

## Update jump power data

Now that **PlayerData** is able to track jump power, you need to implement logic
on the server to upgrade jump power from a player's client request.

The server and client can communicate through either
[Remote events](../../../../scripting/events/remote.md#remote-events) or
[Remote functions](../../../../scripting/events/remote.md#remote-callbacks).
Remote events do not yield when they are fired and are appropriate for one-way
communication. Remote functions yield until they receive a reply, which allows
for two-way communication. In this case, the client needs to know if the server
upgraded the player's jump power successfully, so a remote function is
ideal.

To implement the jump upgrade:

1. In the **Explorer** window, open the **Instances** folder in
   **ReplicatedStorage**.
1. Insert a **RemoteFunction** into the **Instances** folder, then rename the remote
   function to **IncreaseJumpPowerFunction**. You always create remote functions in
   **ReplicatedStorage** because both the client and server must be able to
   access them.

   <img src="../../../../assets/tutorials/script-an-upgrade-button/Insert-RemoteFunction.png" alt="Studio's Explorer window with the IncreaseJumpPowerFunction script highlighted under the Instances folder." width="320" />

1. In the **Explorer** window, select **StarterPlayer**.
1. In the **Properties** window, enable the **CharacterUseJumpPower** property.
   By default, a character's jump power value does not define the amount that a
   character jumps, so this needs to be enabled.
1. In the **Explorer** window, insert a new script into **ServerScriptService**, then
   rename the script to **JumpService**. This script will contain the logic for jump upgrades.
1. Replace the default code with the following code:

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
     **PlayerData**, increasing it by 30. If you want your experience to last slightly
     longer, you can decrease this number.

   - **Validate server requests** - `onPurchaseJumpIncrease()` first checks that the
     player actually has the number of coins required to purchase the upgrade. **All
     requests** from clients to the server should be **validated** to prevent bad
     actors submitting false requests and exploiting your experience.

   </AccordionDetails>
   </BaseAccordion>

## Add the button to the player GUI

A `Class.ScreenGui` object only shows on-screen if it is parented to a player's
`Class.PlayerGui` object. By default, this contains the
system GUI such as the chat window. You now need to create a
script in **ReplicatedStorage** to copy the upgrade button into each
player's GUI and implement behavior for when it's pressed.

To add the button to the player's GUI when they join:

1. In the **Explorer** window, create a **Script** in **ReplicatedStorage**.
1. Select the script, then in the **Properties** window,
   1. Set **Name** to **JumpButtonClickHandler**.
   1. Set **RunContext** to **Client**. This tells the engine to run always run this script
      on the client to optimize network communication.
1. In the open script, replace the default code with the following code:

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

You should now be able to purchase jump upgrades for coins using the upgrade button. To test out the project:

1. Choose **Test** from the dropdown menu and click the **Play** button to its right to begin the playtest.

   <img src="../../../../assets/studio/general/Mezzanine-Testing-Mode-Test.png" width="800" alt="Test option in the testing modes dropdown of Studio's mezzanine." />

1. If your scripts are working correctly, a button for purchasing jumping power appears on-screen. Try clicking the button before you collect any coins to check that it doesn't award you additional jumping power, then try collecting some coins and see if the upgrade works when you click again.

   <video controls loop muted>
   <source src="../../../../assets/tutorials/script-an-upgrade-button/script-an-upgrade-button-example.mp4" />
   </video>

Now that the code is complete, try balancing the experience through the quantity and positions of the coins. Add more coins if the pace feels too slow, or subtract coins and put them in challenging places if it feels too fast and easy.
