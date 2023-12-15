---
title: Cleanup and Reset
description: Create a battle royale experience in Roblox Studio. Finish coding the scripts.
next: /education/battle-royale-series/finishing-the-project
prev: /education/battle-royale-series/ending-matches
---

Time to code the last phase of the game: cleanup and reset. Code in this phase ensures that the game loops to intermission and that future matches start the same for each player.

## Updating the GUI

Before doing cleanup and reset, inform players how the game ended using the DisplayManager to show the appropriate status.

### Getting the Winner's Name

Start by getting the winning player's name if there was one. Previously, the code checked if the size of the active players table was down to 1. To get the remaining player's name, return the name at the first index of that table.

1. In PlayerManager, start a new module function named `getWinnerName()`.

   ```lua
   function PlayerManager.getWinnerName()
   end

   -- Events
   Players.PlayerAdded:Connect(onPlayerJoin)
   ```

2. Add an if statement that runs if something exists in `activePlayers[1]`. Although the table count was checked before, the player might have disconnected or left the game.

   ```lua
   function PlayerManager.getWinnerName()
     local winningPlayer = activePlayers[1]

     if winningPlayer then
     end
   end
   ```

3. In the if statement:

   - Return the player's name.
   - For the else, return an error string.

   ```lua
   function PlayerManager.getWinnerName()
     local winningPlayer = activePlayers[1]

     if winningPlayer then
       return winningPlayer.Name
     else
       return "Error: No winning player found"
     end
   end
   ```

### Getting the End Status

Use a module function to take information from the correct end state, whether the timer ends or one player is left. Then, send that state variable to DisplayManager to update the status GUI with the appropriate message.

1. In **MatchManager**, code a new module function named `getEndStatus()` with a parameter named `endState`. To store the message that will be sent, add an empty variable named `statusToReturn`.

   ```lua
   function MatchManager.prepareGame()
     playerManager.sendPlayersToMatch()
     matchStart:Fire()
   end

   function MatchManager.getEndStatus(endState)
     local statusToReturn
   end

   matchStart.Event:Connect(startTimer)
   matchEnd.Event:Connect(stopTimer)

   return MatchManager
   ```

2. Set the value of `statusToReturn` using if and elseif statements. Check for the end state variables: `FoundWinner` and `TimerUp`. For error checking, include an else at the end.

   ```lua
   function MatchManager.getEndStatus(endState)
     local statusToReturn

     if endState == gameSettings.endStates.FoundWinner then

     elseif endState == gameSettings.endStates.TimerUp then

     else

     end
   end
   ```

3. Add the following for each condition:

   `FoundWinner`

   - A variable for the winner using p`layerManager.getWinnerName()`.
   - Update `statusToReturn` with a string announcing the winner.

   `TimerUp`

   - Update `statusToReturn` with a string announcing time ran out.

   `Else`

   - Update `statusToReturn` with an error message in case there are issues with getting the end game message.

   ```lua
   function MatchManager.getEndStatus(endState)
     local statusToReturn

     if endState == gameSettings.endStates.FoundWinner then
       local winnerName = playerManager.getWinnerName()
       statusToReturn = "Winner is : " .. winnerName
     elseif endState == gameSettings.endStates.TimerUp then
       statusToReturn = "Time ran out!"
     else
       statusToReturn = "Error found"
     end
   end
   ```

4. Send back the message by typing `return statusToReturn`.

   ```lua
   function MatchManager.getEndStatus(endState)
     local statusToReturn

     if endState == gameSettings.endStates.FoundWinner then
       local winnerName = playerManager.getWinnerName()
       statusToReturn = "Winner is : " .. winnerName
     elseif endState == gameSettings.endStates.TimerUp then
       statusToReturn = "Time ran out!"
     else
       statusToReturn = "Error found"
     end

     return statusToReturn
   end
   ```

### Displaying and Testing

Get the updated announcement in GameManager and display it to the players using the DisplayManager.

1. Open **GameManager**. In the while true do loop, **delete** the last print statement. Then, create a variable named endStatus. Set it equal to calling `matchManager.getEndStatus(endState)`.

   ```lua
   while true do
     displayManager.updateStatus("Waiting for Players")

     repeat
       task.wait(gameSettings.intermissionDuration)
     until #Players:GetPlayers() >= gameSettings.minimumPlayers

     displayManager.updateStatus("Get ready!")
     task.wait(gameSettings.transitionTime)

     matchManager.prepareGame()
     local endState = matchEnd.Event:Wait()

     local endStatus = matchManager.getEndStatus(endState)
   end

   ```

2. To display the returned message in the GUI label, call `displayManager.updateStatus()` and pass in `endStatus`.

   ```lua
   local endStatus = matchManager.getEndStatus(endState)
     displayManager.updateStatus(endStatus)
   ```

3. So the game pauses to let players see the message, add a wait using `transitionTime`.

   ```lua
   local endStatus = matchManager.getEndStatus(endState)
   displayManager.updateStatus(endStatus)

   task.wait(gameSettings.transitionTime)
   ```

4. Start a **test server** and check that players see the following messages for the time up and winning player conditions.

   <GridContainer numColumns="2">
     <figure>
       <img src="../../assets/education/battle-royale-series/arena_7_showDifferentGUI_timeOut.jpg" />
       <figcaption>Time is up condition</figcaption>
     </figure>
     <figure>
       <img src="../../assets/education/battle-royale-series/arena_7_showDifferentGUI_foundWinner.jpg" />
       <figcaption>Winning player condition</figcaption>
     </figure>
   </GridContainer>

### Troubleshooting Tips

At this point, you're unable to see the messages, try one of the following below.

- If your end status message is "Error Found", none of the conditions were successful. Check the code in `MatchManager.getEndStatus()` against the code samples.
- If the end status doesn't display, check that `task.wait(gameSettings.transitionTime)` is after sending the message to displayManager.

## Starting New Matches

Before starting a new match, there will be a brief transition. This gives players time to see the end status and makes being teleported to the lobby feel less sudden.

At the end of the transition, remaining players will be removed from the arena, and all of the code will reset. This ensures that players will start the next match with a clean version of the game.

### Handling Transitions

When players move into the transition state, remove their weapons.

1. In PlayerManager, find the local functions. Copy and paste the highlighted code for `removePlayerWeapon()` below. The code will remove an individual player's weapon if it's actively equipt or in the player's backpack.

   ```lua
   local function removePlayerWeapon(whichPlayer)
     -- Check to see if a player exist in case they disconnected or left.
     if whichPlayer then
       local character = whichPlayer.Character

       -- If the player has it currently on their character
       local weapon = character:FindFirstChild("Weapon")

       if weapon then
         weapon:Destroy()
       end

       -- If the player has the weapon in their backpack
       local backpackWeapon = whichPlayer.Backpack:FindFirstChild("Weapon") 

       if backpackWeapon then
         backpackWeapon:Destroy()
       end
     else
       print("No player to remove weapon")
     end
   end
   ```

2. Start a new module function named `removeAllWeapons()`.

   ```lua
   function PlayerManager.removeAllWeapons()

   end

   -- Events
   Players.PlayerAdded:Connect(onPlayerJoin)

   return PlayerManager
   ```

3. In that function, use a for loop to go through the active players table. In the loop, call `removePlayerWeapon()` and pass in the player found.

   ```lua
   function PlayerManager.removeAllWeapons()
     for playerKey, whichPlayer in activePlayers do
       removePlayerWeapon(whichPlayer)
     end
   end
   ```

### Cleaning Between Matches

Cleanup will be its own function in MatchManager. For now, cleanup will just use that previously created function to remove player weapons. As you expand the game, more can be added, such as functions to reset a map that changed during a match.

1. Open MatchManager. Add a new module function named `cleanupMatch()`. In that function, call `playerManager.removeAllWeapons()`.

   ```lua
   function MatchManager.cleanupMatch()
     playerManager.removeAllWeapons()
   end

   matchStart.Event:Connect(startTimer)
   matchEnd.Event:Connect(stopTimer)

   return MatchManager

   ```

2. Next, call the cleanup function. Open **GameManager** and find the while true do loop. So players have weapons removed during the ending intermission, call `matchManager.cleanupMatch()` before the last `Library.task.wait()`.

   ```lua
   while true do
     displayManager.updateStatus("Waiting for Players")

     repeat
       task.wait(gameSettings.intermissionDuration)
     until #Players:GetPlayers() >= gameSettings.minimumPlayers
     
     displayManager.updateStatus("Get ready!")
     task.wait(gameSettings.transitionTime)

     matchManager.prepareGame()
     local endState = matchEnd.Event:Wait()

     local endStatus = matchManager.getEndStatus(endState)
     displayManager.updateStatus(endStatus)

     matchManager.cleanupMatch()
     task.wait(gameSettings.transitionTime)
   end
   ```

3. Start a test server and run a match. Wait for the timer to run out and confirm that the player's weapon is removed during the end game intermission.

   <GridContainer numColumns="2">
     <figure>
       <img src="../../assets/education/battle-royale-series/arena_7_showPlayerWeapons_withWeapon.jpg" />
       <figcaption>During a match</figcaption>
     </figure>
     <figure>
       <img src="../../assets/education/battle-royale-series/arena_7_showPlayerWeapons_withoutWeapon.jpg" />
       <figcaption>After the match</figcaption>
     </figure>
   </GridContainer>

### Resetting Matches

You may have noticed a few other things in the game, like players still being in the arena after a match ends. With the match cleaned up, next reset the game. This includes sending players in the arena back into the lobby and clearing the active players table. With a reset in place, a game loop can run indefinitely.

First, start a function to send players back to the lobby.

1. In PlayerManager:

   - Create a module function named `resetPlayers()`.
   - Add a for loop to iterate through activePlayers.
   - In the loop, call `respawnPlayerInLobby()` and pass in the player as the parameter.

   ```lua
   function PlayerManager.resetPlayers()
   	for playerKey, whichPlayer in activePlayers do
   		respawnPlayerInLobby(whichPlayer)
   	end
   end

   -- Events
   Players.PlayerAdded:Connect(onPlayerJoin)

   return PlayerManager
   ```

2. Make sure the `activePlayers` table is empty for the next match by setting it equal to `{}`, which is a quick way of resetting to an empty table.

   ```lua
   function PlayerManager.resetPlayers()
   	for playerKey, whichPlayer in activePlayers do
   		respawnPlayerInLobby(whichPlayer)
   	end

   	activePlayers = {}
   end

   ```

3. Open MatchManager. Code a new module function named `resetMatch()` and call `playerManager.resetPlayers()`.

   ```lua
   function MatchManager.resetMatch()
   	playerManager.resetPlayers()
   end

   matchStart.Event:Connect(startTimer)
   matchEnd.Event:Connect(stopTimer)

   return MatchManager
   ```

4. Go back to **GameManager**. At the end of the while true do loop, call `matchManager.resetMatch()`.

   ```lua
   while true do
   	displayManager.updateStatus("Waiting for Players")

   	repeat
   		task.wait(gameSettings.intermissionDuration)
   	until #Players:GetPlayers() >= gameSettings.minimumPlayers

		displayManager.updateStatus("Get ready!")
		task.wait(gameSettings.transitionTime)

		matchManager.prepareGame()
		local endState = matchEnd.Event:Wait()

		local endStatus = matchManager.getEndStatus(endState)
		displayManager.updateStatus(endStatus)

		matchManager.cleanupMatch()
		task.wait(gameSettings.transitionTime)

		matchManager.resetMatch()
   end
   ```

5. Start a test server and run a match. Confirm that you can at least go through two game loops without any errors.

## Completed Scripts

Below are completed scripts to double check your work.

### GameManager Script

```lua
-- Services
local ServerStorage = game:GetService("ServerStorage")
local Players = game:GetService("Players")

-- Module Scripts
local moduleScripts = ServerStorage:WaitForChild("ModuleScripts")
local matchManager = require(moduleScripts:WaitForChild("MatchManager"))
local gameSettings = require(moduleScripts:WaitForChild("GameSettings"))
local displayManager = require(moduleScripts:WaitForChild("DisplayManager"))

-- Events
local events = ServerStorage:WaitForChild("Events")
local matchEnd = events:WaitForChild("MatchEnd")

while true do
	displayManager.updateStatus("Waiting for Players")

	repeat
		task.wait(gameSettings.intermissionDuration)
	until #Players:GetPlayers() >= gameSettings.minimumPlayers

	displayManager.updateStatus("Get ready!")
	task.wait(gameSettings.transitionTime)

	matchManager.prepareGame()
	local endState = matchEnd.Event:Wait()

	local endStatus = matchManager.getEndStatus(endState)
	displayManager.updateStatus(endStatus)

	matchManager.cleanupMatch()
	task.wait(gameSettings.transitionTime)

	matchManager.resetMatch()
end

```

### MatchManager Script

```lua
local MatchManager = {}

-- Services
local ServerStorage = game:GetService("ServerStorage")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- Module Scripts
local moduleScripts = ServerStorage:WaitForChild("ModuleScripts")
local playerManager = require(moduleScripts:WaitForChild("PlayerManager"))
local gameSettings = require(moduleScripts:WaitForChild("GameSettings"))
local displayManager = require(moduleScripts:WaitForChild("DisplayManager"))
local timer = require(moduleScripts:WaitForChild("Timer"))

-- Events
local events = ServerStorage:WaitForChild("Events")
local matchStart = events:WaitForChild("MatchStart")
local matchEnd = events:WaitForChild("MatchEnd")

-- Values
local displayValues = ReplicatedStorage:WaitForChild("DisplayValues")
local timeLeft = displayValues:WaitForChild("TimeLeft")

-- Creates a new timer object to be used to keep track of match time.
local myTimer = timer.new()

-- Local Functions
local function stopTimer()
	myTimer:stop()
end

local function timeUp()
	matchEnd:Fire(gameSettings.endStates.TimerUp)
end

local function startTimer()
	myTimer:start(gameSettings.matchDuration)
	myTimer.finished:Connect(timeUp)

	while myTimer:isRunning() do
		-- Adding +1 makes sure the timer display ends at 1 instead of 0.
		timeLeft.Value = (math.floor(myTimer:getTimeLeft() + 1))
		-- By not setting the time for wait, it offers more accurate looping
		task.wait()
	end
end

-- Module Functions
function MatchManager.prepareGame()
	playerManager.sendPlayersToMatch()
	matchStart:Fire()
end

function MatchManager.getEndStatus(endState)
	local messageToReturn

	if endState == gameSettings.endStates.FoundWinner then
		local winnerName = playerManager.getWinnerName()
		messageToReturn = "Winner is : " .. winnerName
	elseif endState == gameSettings.endStates.TimerUp then
		messageToReturn = "Time ran out!"
	else
		messageToReturn = "Error found"
	end

	return messageToReturn
end

function MatchManager.cleanupMatch()
	playerManager.removeAllWeapons()
end

function MatchManager.resetMatch()
	playerManager.resetPlayers()
end

matchStart.Event:Connect(startTimer)
matchEnd.Event:Connect(stopTimer)

return MatchManager

```

### PlayerManager Script

```lua
local PlayerManager = {}

-- Services
local Players = game:GetService("Players")
local ServerStorage = game:GetService("ServerStorage")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- Modules
local moduleScripts = ServerStorage:WaitForChild("ModuleScripts")
local gameSettings = require(moduleScripts:WaitForChild("GameSettings"))

-- Events
local events = ServerStorage:WaitForChild("Events")
local matchEnd = events:WaitForChild("MatchEnd")

-- Map Variables
local lobbySpawn = workspace.Lobby.StartSpawn
local arenaMap = workspace.Arena
local spawnLocations = arenaMap.SpawnLocations

-- Values
local displayValues = ReplicatedStorage:WaitForChild("DisplayValues")
local playersLeft = displayValues:WaitForChild("PlayersLeft")

-- Player Variables
local activePlayers = {}
local playerWeapon = ServerStorage.Weapon

local function checkPlayerCount()
	if #activePlayers == 1 then
		matchEnd:Fire(gameSettings.endStates.FoundWinner)
		print("Found winner")
	end
end

local function removeActivePlayer(player)
	print("removing player")
	for playerKey, whichPlayer in activePlayers do
		if whichPlayer == player then
			table.remove(activePlayers, playerKey)
			playersLeft.Value = #activePlayers
			checkPlayerCount()
		end
	end
end

local function respawnPlayerInLobby(player)
	player.RespawnLocation = lobbySpawn
	player:LoadCharacter()
end

local function preparePlayer(player, whichSpawn)
	player.RespawnLocation = whichSpawn
	player:LoadCharacter()

	local character = player.Character or player.CharacterAdded:Wait()

	-- Give the player a tool
	local sword = playerWeapon:Clone()
	sword.Parent = character

	local humanoid = character:WaitForChild("Humanoid")

	humanoid.Died:Connect(function()
		respawnPlayerInLobby(player)
		removeActivePlayer(player)
	end)
end

local function onPlayerJoin(player)
	player.RespawnLocation = lobbySpawn
end

local function removePlayerWeapon(whichPlayer)
	-- Check to see if a player exist in case they disconnected or left.
	if whichPlayer then
		local character = whichPlayer.Character

		-- If the player has it currently on their character
		local weapon = character:FindFirstChild("Weapon")

		if weapon then
			weapon:Destroy()
		end

		-- If the player has the weapon in their backpack
		local backpackWeapon = whichPlayer.Backpack:FindFirstChild("Weapon") 

		if backpackWeapon then
			backpackWeapon:Destroy()
		end
	else
		print("No player to remove weapon")
	end
end


function PlayerManager.sendPlayersToMatch()
	local availableSpawnPoints = spawnLocations:GetChildren()

	for playerKey, whichPlayer in Players:GetPlayers() do
		table.insert(activePlayers,whichPlayer)

		-- Gets a spawn location and then removes it from the table so the next player gets the next spawn
		local spawnLocation = availableSpawnPoints[1]
		table.remove(availableSpawnPoints, 1)
		preparePlayer(whichPlayer, spawnLocation)
	end

	playersLeft.Value = #activePlayers
end

function PlayerManager.getWinnerName()
  local winningPlayer = activePlayers[1]

	if winningPlayer then
		return winningPlayer.Name
	else
		return "Error: No player found"
	end
end

function PlayerManager.removeAllWeapons()
	for playerKey, whichPlayer in activePlayers do
		removePlayerWeapon(whichPlayer)
	end
end

function PlayerManager.resetPlayers()
	for playerKey, whichPlayer in activePlayers do
		respawnPlayerInLobby(whichPlayer)
	end

	activePlayers = {}
end

-- Events
Players.PlayerAdded:Connect(onPlayerJoin)

return PlayerManager
```
