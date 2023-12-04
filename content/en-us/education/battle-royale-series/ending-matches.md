---
title: Ending Matches
description: Create a battle royale experience in Roblox Studio. Write scripts that handle victory conditions or time running out.
next: /education/battle-royale-series/cleanup-and-reset
prev: /education/battle-royale-series/creating-a-gui
---

Matches can end in a few conditions including timers running out or a single player being left.

## Managing Defeated Players

Right now, defeated players respawn in the arena. Instead, send them back to the lobby to wait for the next match.

1. In PlayerManager, create a local function named `respawnPlayerInLobby()`. In that function, do the following:

- Set the player's RespawnLocation property to the lobbySpawn.
- Reload the character with `Class.Player:LoadCharacter()`. Remember, `Class.Player:LoadCharacter()|LoadCharacter()` recreates the player at their spawn, removing any tools they had.

## Using Anonymous Functions

Anonymous functions are commonly used in advanced scripts under specific situations. Before defining them, it's important to understand a situation your script may encounter.

Consider this: To teleport defeated players to the lobby, the respawn function will have to be connected to the player's Died event. There is a problem though. If you connect the event as we have in the past, there's no way to get the name of the player from the Died event. The script needs that name to remove a defeated player from the table tracking active players.

To get the name of the player that triggered the Died event, use an anonymous function. **Anonymous functions** don't have names, and can be created directly within `Connect()` rather than separately.

A sample anonymous function is below that shows the syntax.

```lua
myPlayer.Died:Connect(function()
  print(player)
end)
```

### Coding the Died Event

For this function, whenever a player's character dies, they'll trigger the function that respawns them.

1. To get access to the player's Died event, in PlayerManager > `preparePlayer()`, add a variable for the player's humanoid.

   ```lua
   local function preparePlayer(player, whichSpawn)
     player.RespawnLocation = whichSpawn
     player:LoadCharacter()

     local character = player.Character or player.CharacterAdded:Wait()
     local sword = playerWeapon:Clone()
     sword.Parent = character

     local humanoid = character:WaitForChild("Humanoid")
   end
   ```

2. Create an anonymous function that connects to the Died event. Start by typing `humanoid.Died:Connect()`. Then, **inside** `Connect()`, type `function()`, press <kbd>Enter</kbd> to autocomplete `end`, and delete the extra parenthesis.

   ```lua
   local humanoid = character:WaitForChild("Humanoid")

   humanoid.Died:Connect(function()

   end)
   ```

3. In the anonymous function, call `respawnPlayerInLobby()`. Pass in `player`, a variable storing the player getting ready to enter a match.

   ```lua
   local humanoid = character:WaitForChild("Humanoid")

     humanoid.Died:Connect(function()
       respawnPlayerInLobby(player)
     end)
   ```

4. Start a **server** and play a match. Test that when a player dies, they respawn in the lobby. To defeat players, walk up to them and use your weapon until you can confirm they've respawned in the lobby.

   <GridContainer numColumns="2">
     <figure>
       <img src="../../assets/education/battle-royale-series/arena_6_showPlayersDefeated_showPlayerAttacked.jpg" />
       <figcaption>Attacking Player2</figcaption>
     </figure>
     <figure>
       <img src="../../assets/education/battle-royale-series/arena_6_showPlayersDefeated_inLobby.jpg" />
       <figcaption>Player2 in Lobby after respawning</figcaption>
     </figure>
   </GridContainer>

Note, there are also some different ways of testing if desired.

- To kill a player, in the Server > Output Window > Command Bar, copy and paste: `workspace.Player1.Humanoid.Health = 0`. Press <kbd>Enter</kbd> to run the command. To remove other players, use Player2, Player3, etc.
- Setting GameSettings > `matchDuration` to a longer time can give you more time to find and take out all players.
- To have quicker tests, change GameSettings > `minimumPlayers` to smaller number, like 2.

## Ending the Game

Now that defeated players respawn, start working on ending the game. Remember creating the MatchEnd event? It'll be fired when either the timer runs out or a winner is found.

To tell other scripts which condition ended the game, create a table with variables for `TimerUp` and `FoundWinner`. When the match end event fires, it'll pass in a variable so other scripts can respond.

1. In GameSettings, create an empty module table named `endStates`.

   ```lua
   local GameSettings = {}

   -- Game Variables
   GameSettings.intermissionDuration = 5
   GameSettings.matchDuration = 10
   GameSettings.minimumPlayers = 2
   GameSettings.transitionTime = 5

   -- Possible ways that the game can end.
   GameSettings.endStates = {
   }

   return GameSettings
   ```

2. Create two variables named `TimerUp` and `FoundWinner`. Set each to a string matching their name. These strings will be used to test the code.

```lua
GameSettings.endStates = {
	TimerUp = "TimerUp",
	FoundWinner = "FoundWinner"
}
```

### Ending with a Timer

When the timer ends, fire the Match End event and send the matching end state variable. That way, other scripts listening for that event can respond accordingly. Remember that while events fire signals, that can also send data that's received by listening scripts, like `TimerUp` or `FoundWinner`.

1. In **GameManager**, in the while true do loop, find the line `matchEnd.Event:Wait()`. At the start of the line, add `local endState =`.

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
   end
   ```

2. To confirm that the correct state was received, add a print statement including `endState`.

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
     print("Game ended with: " .. endState)
   end
   ```

3. In MatchManager, find `timeUp()` and **remove** the print statement. Then, to fire the match end event, type `matchEnd:Fire()` and pass in `gameSettings.endStates.TimerUp`.

   ```lua
   -- Values
   local displayValues = ReplicatedStorage:WaitForChild("DisplayValues")
   local timeLeft = displayValues:WaitForChild("TimeLeft")

   -- Creates a new timer object to be used to keep track of match time.
   local myTimer = timer.new()

   -- Local Functions
   local function timeUp()
     matchEnd:Fire(gameSettings.endStates.TimerUp)
   end
   ```

4. Test a match. Once the timer runs out, check that the print statement includes the string stored in the `TimerUp` variable.

   <img src="../../assets/education/battle-royale-series/arena_6_showEndGame.png" />

### Troubleshooting Tips

At this point, the message wasn't displayed, try one of the following below.

- Check that wherever the end state variables are called, that they're written exactly, like here: `gameSettings.endStates.TimerUp`.
- Make sure to use : (colon operator) with the `Class.Fire|Fire()` **instead** of the dot operator, like in `matchEnd:Fire()`.

## Coding a Winning Match

Next, the script needs to identify winning players, remove losing players, and run cleanup such as stopping the timer. Matches will also end if one player is left. To see if the `FoundWinner` condition is met, you'll need a function that checks the number left in the table tracking players in a match.

### Checking Player Count

Matches will end if there's only one player left. To check this, the script needs to track the players in a round. Once one player is left, a winner can be assigned.

1. In PlayerManager, define the following variables:

   - ModuleScripts folder
   - GameSettings module - Used to access end state variables
   - Events folder and the MatchEnd event - Fires event

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
   ```

2. Above `respawnPlayerInLobby()`, add a new local function named `checkPlayerCount()`.

   ```lua
   -- Player Variables
   local activePlayers = {}
   local playerWeapon = ServerStorage.Weapon

   local function checkPlayerCount()

   end

   local function respawnPlayerInLobby(player)
   ```

   <Alert severity="warning">
   Remember, to be in scope, this function needs to come **before** the functions that will use it later in the script.
   </Alert>

3. Within that function, use an if then statement to check for a winner. In that statement:

   - Check if the size of the `activePlayers` table is 1.
   - If so, fire `matchEnd` and pass in `gameSettings.endStates.FoundWinner`.

   ```lua
   local function checkPlayerCount()
     if #activePlayers == 1 then
       matchEnd:Fire(gameSettings.endStates.FoundWinner)
     end
   end
   ```

### Removing a Player

An accurate count can't be kept unless players are removed. When a player is defeated, keep an accurate player count by removing them from the player table. Then, check the size of the active player table to see if there's a winner.

1. Under `checkPlayerCount()`, create a new local function named `removeActivePlayer()` with a parameter named `player`.

   ```lua
   local function checkPlayerCount()
     if #activePlayers == 1 then
       matchEnd:Fire(gameSettings.endStates.FoundWinner)
     end
   end

   local function removeActivePlayer(player)

   end
   ```

2. To find the player in the `activePlayers` table, iterate through it using a `for` loop. Then, add an `if` statement that runs if a player matching the name passed into the function is found.

   ```lua
   local function removeActivePlayer(player)
     for playerKey, whichPlayer in activePlayers do
       if whichPlayer == player then

       end
     end
   end
   ```

   <Alert severity="warning">
   Keep similar variable names **different**. As you code, may sure you don't have overlapping variable names, like the above function which includes two versions of player: `player` and `whichPlayer`.

   For instance, adding which to a variable name in an iterating table is a good convention to avoid confusion, such as `whichPlayer` or `whichPart`.
   </Alert>

3. To remove the player, in the if statement:

   - Call `Library.table.remove()`. Inside the parentheses, pass in `activePlayers`, the table to look in, and `playerKey` - the player to remove from the table.
   - Set the value of the `playersLeft` object to `#activePlayers`.
   - Check for a winning player by running `checkPlayerCount()`.

   ```lua
   local function removeActivePlayer(player)
     for playerKey, whichPlayer in activePlayers do
       if whichPlayer == player then
         table.remove(activePlayers, playerKey)
         playersLeft.Value = #activePlayers
         checkPlayerCount()
       end
     end
   end
   ```

### Connecting Events and Testing

To use the function just created, call it from within the anonymous function connected to the player's `Died` event.

1. Find `preparePlayer()`. In the anonymous function with the Died event connection, call `removeActivePlayer()`. Then, pass in the player as the parameter.

   ```lua
   humanoid.Died:Connect(function()
       respawnPlayerInLobby(player)
       removeActivePlayer(player)
     end)
   ```

2. To see if a winning player is found, start a **test server**. When there is only one player left you should see FoundWinner in the output window.

   <img src="../../assets/education/battle-royale-series/arena_6_showGameEndFoundWinner.png" />

3. Continue testing and let the match end. Notice as a new match starts, an error appears in the Output Window:

   <img src="../../assets/education/battle-royale-series/arena_6_showGameTimerError.png" />

This error is because the timer wasn't stopped, which will be fixed in the next section.

### Stopping the Timer

Whenever a match ends with a winning player, the timer should stop as well. To halt the timer before time is up, have the timer stop whenever the match end event fires. This is one of the benefits of creating events. They can be reused in multiple situations to script cause and effect relationships.

1. In MatchManager, create a new local function named `stopTimer()`. Inside, type `myTimer:stop()` to halt the timer.

   ```lua
   -- Creates a new timer object to be used to keep track of match time.
   local myTimer = timer.new()

   -- Local Functions
   local function stopTimer()
     myTimer:stop()
   end

   local function timeUp()
     matchEnd:Fire(gameSettings.endStates.TimerUp)
   end
   ```

2. To stop the timer when the match ends, connect the matchEnd event to `stopTimer()`.

   ```lua
   -- Module Functions
   function MatchManager.prepareGame()
     playerManager.sendPlayersToMatch()
     matchStart:Fire()
   end

   matchStart.Event:Connect(startTimer)
   matchEnd.Event:Connect(stopTimer)

   return MatchManager
   ```

3. **Test** that the previous error no longer appears by starting a **server**. Eliminate all but one player and then wait a few seconds once the match ends.

## Next Steps

While the two win conditions are finished, there are still some tasks left to finish the game loop. For instance, the winning player isn't ever teleported to the lobby. In the next lesson, you'll display how the match ended to players and reset the game, finally completing the whole loop.

## Completed Scripts

Below are completed scripts to double check your work.

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

-- Local Functions
local function checkPlayerCount()
	if #activePlayers == 1 then
		matchEnd:Fire(gameSettings.endStates.FoundWinner)
	end
end

local function removeActivePlayer(player)
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


local function onPlayerJoin(player)
	player.RespawnLocation = lobbySpawn
end

local function preparePlayer(player, whichSpawn)
	player.RespawnLocation = whichSpawn
	player:LoadCharacter()

	local character = player.Character or player.CharacterAdded:Wait()
	local sword = playerWeapon:Clone()
	sword.Parent = character

	local humanoid = character:WaitForChild("Humanoid")

	humanoid.Died:Connect(function()
		respawnPlayerInLobby(player)
		removeActivePlayer(player)
	end)

end

-- Module Functions
function PlayerManager.sendPlayersToMatch()
	local arenaSpawns = spawnLocations:GetChildren()

	for playerKey, whichPlayer in Players:GetPlayers() do
		table.insert(activePlayers,whichPlayer)
		local spawnLocation = arenaSpawns[1]
		preparePlayer(whichPlayer, spawnLocation)
		table.remove(arenaSpawns, 1)
	end

	playersLeft.Value = #activePlayers
end

-- Events
Players.PlayerAdded:Connect(onPlayerJoin)

return PlayerManager
```

### GameSettings Script

```lua
local GameSettings = {}

-- Game Variables
GameSettings.intermissionDuration = 5
GameSettings.matchDuration = 10
GameSettings.minimumPlayers = 2
GameSettings.transitionTime = 5

-- Possible ways that the game can end.
GameSettings.endStates = {
	TimerUp = "TimerUp",
	FoundWinner = "FoundWinner"
}

return GameSettings
```

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
	print("Game ended with: " .. endState)
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
	print("Timer started")
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

matchStart.Event:Connect(startTimer)
matchEnd.Event:Connect(stopTimer)

return MatchManager
```
