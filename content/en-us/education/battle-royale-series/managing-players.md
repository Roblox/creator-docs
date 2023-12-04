---
title: Managing Players
description: Create a battle royale experience in Roblox Studio. Write scripts that handle player spawning and equipment.
next: /education/battle-royale-series/timers-and-events
prev: /education/battle-royale-series/coding-the-game-loop
---

With the game loop coded, it's time to start adding features into it. During a match, players can come and go. Because of this, code is needed for tasks like sending players into a match and keeping track of active players. To manage these tasks, create a module script named **PlayerManager**.

This script will start a function to send players into the arena with a weapon and be expanded later in the series.

<video controls src="../../assets/education/battle-royale-series/arena_3_showFinalResult.mp4" width="100%"></video>

### Setting Up the Script

Because the player manager includes functions used by other scripts, it'll be a module script.

1. In ServerStorage > ModuleScripts, add a new module script named PlayerManager. Then, rename the module table to match the script name and add comments for local and module functions.

   <img src="../../assets/education/battle-royale-series/arena_createPlayerManager.png" />

   ```lua
   local PlayerManager = {}
   -- Local Functions

   -- Module Functions

   return PlayerManager
   ```

2. Add local variables for the following:

   **Services:**

   - Players - Know what players have joined or left the game.
   - ServerStorage - Storage for player weapons.

   **Map and Player Variables:**

   - Lobby Spawn, Arena Folder, and Arena Spawn Folder - Used to teleport players to different areas.
   - An Array of Active Players - Keeps track of players currently in a game.

   ```lua
   local PlayerManager = {}

   -- Services
   local Players = game:GetService("Players")
   local ServerStorage = game:GetService("ServerStorage")
   -- Map Variables
   local lobbySpawn = workspace.Lobby.StartSpawn
   local arenaMap = workspace.Arena
   local spawnLocations = arenaMap.SpawnLocations
   -- Player Variables
   local activePlayers = {}

   -- Local Functions

   -- Module Functions

   return PlayerManager
   ```

3. Create a module function named `sendPlayersToMatch()` with a test print inside.

   ```lua
   -- Local Functions

   -- Module Functions
   function PlayerManager.sendPlayersToMatch()
     print("Sending players to match")
   end

   return PlayerManager
   ```

### Spawning Players in the Lobby

Right now, there's multiple spawn locations, meaning that players spawn at a random one when joining the game. To ensure players spawn in the lobby, change the player's `RespawnLocation` property.

1. Create a new local function named `onPlayerJoin()` with a parameter of `player`. In that function, set the player's respawn location to the lobby spawn variable made earlier.

   ```lua
   -- Local Functions
   local function onPlayerJoin(player)
     player.RespawnLocation = lobbySpawn
   end
   ```

2. Add an events section beneath your module function. Then, connect `onPlayerJoin()` to Player Service's `PlayerAdded` event.

   ```lua
   -- Module Functions
   function PlayerManager.sendPlayersToMatch()
     print("Sending players to match")
   end

   -- Events
   Players.PlayerAdded:Connect(onPlayerJoin)
   ```

### Connecting and Testing

Now the modules can be connectd and tested. With the PlayerManager created, require it so that the code in that module script can then run and send players to the lobby.

1. Go back to **MatchManager** and create variables for the following:

   - **ServerStorage** service.
   - **ModuleScripts** folder, child of ServerStorage.
   - **PlayerManager** module script, child of moduleScripts.

   ```lua
   local MatchManager = {}

   -- Services
   local ServerStorage = game:GetService("ServerStorage")

   -- Module Scripts
   local moduleScripts = ServerStorage:WaitForChild("ModuleScripts")
   local playerManager = require(moduleScripts:WaitForChild("PlayerManager"))

   function MatchManager.prepareGame()
     playerManager.sendPlayersToMatch()
   end

   return MatchManager
   ```

2. Use a **local server** with at least the minimum players to test. Confirm that you can see the following:

   - All players spawn in the Lobby.
   - The print statement from PlayerManager appears in the Output Window.

   <img src="../../assets/education/battle-royale-series/arena_3_showSendToMatch.png" />

3. Once finished, click Cleanup to shut down the server.

### Troubleshooting Tips

At this point, parts of the script aren't working as intended, try one of the following below.

- Check the name of parts such as the Arena, or the location of Lobby > StartSpawn, especially if you named them differently than instructed in the lesson.
- Make sure that modules are required in each script using the `require()` function and correctly spelled.

## Sending Players to the Arena

Now that players spawn in the lobby, teleport them into a match once the intermission is over. Change the player's `RespawnLocation` to a spawn location in the arena using a function in the Player object called `ReloadCharacter()`.

1. Go to the **PlayerManager** script, below `onPlayerJoin()`, add a new local function named `preparePlayer()`. Include two parameters: `player` and `whichSpawn`, the spawn location to send them to.

   ```lua
   local activePlayers = {}

   -- Local Functions
   local function onPlayerJoin(player)
      player.RespawnLocation = lobbySpawn
   end

   local function preparePlayer(player, whichSpawn)

   end

   -- Module Functions
   function PlayerManager.sendPlayersToMatch()
      print("Sending players to match")
   end
   ```

2. Set the player's respawn location to `whichSpawn`.

   ```lua
   local function preparePlayer(player, whichSpawn)
      player.RespawnLocation = whichSpawn
   end
   ```

3. Force the character to reload, using `LoadCharacter()`, and the player will respawn using their newly assigned location.

   ```lua
   local function preparePlayer(player, whichSpawn)
      player.RespawnLocation = whichSpawn
      player:LoadCharacter()
   end
   ```

  <Alert severity="info">
  Reloading a character ensures that players only start with tools provided at the start of a round. For instance, if you further developed this game and added tools with ammo and pickup weapons, it may be possible for a character to bring those tools in, giving them an unfair advantage.
  </Alert>

### Sending Players to Spawn

Make sure each player gets teleported to a different spawn location in the arena by using a `for` loop to iterate through the active players array. Using a `for` loop allows you to go through every value in the players array, allowing the script to adapt to a variety of player numbers.

1. In the `sendPlayersToMatch()` function, use a variable to create an array of all the arena spawn locations by getting the children of the Arena > SpawnLocations folder.

   ```lua
   --Module Functions
   function PlayerManager.sendPlayersToMatch()
      local arenaSpawns = spawnLocations:GetChildren()
   end
   ```

2. Add the `for` loop below to get an array of all players and then iterate through each of them. To get players, type: `Players:GetPlayers()`.

   ```lua
   function PlayerManager.sendPlayersToMatch()
      local arenaSpawns = spawnLocations:GetChildren()

      for playerKey, whichPlayer in Players:GetPlayers() do

      end
   end
   ```

### Tracking and Spawning

When the game runs, it needs to identify which users are playing so they can be spawned in the arena. At the start of a round, every player will be tracked in an array of active players. That array will be used for different functions, such as teleporting or assigning weapons, ensuring that players still in the lobby during a round aren't affected.

1. In the for loop, use `Library.table.insert()`, using the two parameters for the `activePlayers` array and the player to add.

   ```lua
   function PlayerManager.sendPlayersToMatch()
      local arenaSpawns = spawnLocations:GetChildren()

      for playerKey, whichPlayer in Players:GetPlayers() do
         table.insert(activePlayers,whichPlayer)
      end
   end
   ```

2. To get a spawn location from the arena, create a variable named `spawnLocation` and set it to the **first** index in the `arenaSpawns` table.

   ```lua
   for playerKey, whichPlayer in Players:GetPlayers() do
      table.insert(activePlayers,whichPlayer)
      local spawnLocation = arenaSpawns[1]
   end
   ```

3. Call `preparePlayer()` and pass in `whichPlayer` and `spawnLocation`. Then, since that spawn location was used, **remove** it from the table so the next player will get a different spawn.

   ```lua
   for playerKey, whichPlayer in Players:GetPlayers() do
      table.insert(activePlayers,whichPlayer)
      local spawnLocation = arenaSpawns[1]
      preparePlayer(whichPlayer, spawnLocation)
      table.remove(arenaSpawns, 1)
   end
   ```

4. Test on a **local** server that players are sent to the arena. The players will continue to respawn at the same location because the code to send them back to the lobby isn't yet in place.

   <video controls src="../../assets/education/battle-royale-series/arena_3_showRepeatArena.mp4" width="100%"></video>

### Troubleshooting Tips

At this point, you didn't see the intended results, try one of the following below.

- In `GetPlayers()`, make sure there are **two** closing parentheses, such as `Class.Players.GetPlayers(|Players:GetPlayers())` in the statement.
- Check the series of function calls in the module scripts. For example, `matchManager.prepareGame()` should call `playerManager.sendPlayersToMatch()`.

## Giving Players Weapons

When a round starts, each player in the arena will be provided a weapon to use.

### Adding a Tool

Player weapons will be a tool. While any tool in Roblox can be used, we've provided a sample sword to start.

1. Import the weapon from the Toolbox, or create your own (see `Class.Tool|Tools`).

   <a href="https://www.roblox.com/library/10202913115/Battle-Royale-Weapon" target="_blank" rel="noopener">
   <Button variant="contained">Get Tool</Button>
   </a>

2. Place the weapon into ServerStorage. If you're creating your own tool, make sure the tool is named Weapon, since that'll be used in later scripts.

   <img src="../../assets/education/battle-royale-series/arena_showWeapon.png" />

### Giving Tools to Players

Now that the tool is in storage, work on a script to go through the active player array and provide each user that tool.

1. In PlayerManager, add a variable named `playerWeapon` for the Weapon in ServerStorage.

   ```lua
   -- Map Variables
   local lobbySpawn = workspace.Lobby.StartSpawn
   local arenaMap = workspace.Arena
   local spawnLocations = arenaMap.SpawnLocations

   -- Player Variables
   local activePlayers = {}
   local playerWeapon = ServerStorage.Weapon
   ```

2. In `preparePlayer()`, paste the following code to get the player's character.

   ```lua
   local function preparePlayer(player, whichSpawn)
      player.RespawnLocation = whichSpawn
      player:LoadCharacter()

      local character = player.Character or player.CharacterAdded:Wait()
   end
   ```

   <Alert severity="info">
   It's possible that a player's character isn't loaded when the game starts. Adding the extra wait ensures that if a character isn't immediately available, the script will wait and not cause an error.
   </Alert>

3. Create a new variable named sword and use the `Clone()` function to create a copy of the weapon in ServerStorage. Then, parent the sword to the player's character.

   ```lua
   local function preparePlayer(player, whichSpawn)
      player.RespawnLocation = whichSpawn
      player:LoadCharacter()

      local character = player.Character or player.CharacterAdded:Wait()
      local sword = playerWeapon:Clone()
      sword.Parent = character
   end
   ```

4. Test on a **local server** to confirm that every player gets a tool when sent to the arena. Keep in mind, if you continue testing, the intermission will keep restarting and so players will respawn every few seconds. This will be resolved in the next lesson.

   <video controls src="../../assets/education/battle-royale-series/show-weapon-spawned.mp4" width="100%"></video>

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

while true do
	repeat
		task.wait(gameSettings.intermissionDuration)
		print("Restarting intermission")
	until #Players:GetPlayers() >= gameSettings.minimumPlayers

	print("Intermission over")
	task.wait(gameSettings.transitionTime)

	matchManager.prepareGame()
end
```

### MatchManager Script

```lua
local MatchManager = {}

-- Services
local ServerStorage = game:GetService("ServerStorage")

-- Module Scripts
local moduleScripts = ServerStorage:WaitForChild("ModuleScripts")
local playerManager = require(moduleScripts:WaitForChild("PlayerManager"))

function MatchManager.prepareGame()
	playerManager.sendPlayersToMatch()
end

return MatchManager
```

### PlayerManager Module Script

```lua
local PlayerManager = {}
-- Services
local Players = game:GetService("Players")
local ServerStorage = game:GetService("ServerStorage")

-- Map Variables
local lobbySpawn = workspace.Lobby.StartSpawn
local arenaMap = workspace.Arena
local spawnLocations = arenaMap.SpawnLocations

-- Player Variables
local activePlayers = {}
local playerWeapon = ServerStorage.Weapon

-- Local Functions
local function onPlayerJoin(player)
	player.RespawnLocation = lobbySpawn

end

local function preparePlayer(player, whichSpawn)
	player.RespawnLocation = whichSpawn
	player:LoadCharacter()
	local character = player.Character or player.CharacterAdded:Wait()
	local sword = playerWeapon:Clone()
	sword.Parent = character
end

-- Module Functions
function PlayerManager.sendPlayersToMatch()
	print("Sending players to match")

local arenaSpawns = spawnLocations:GetChildren()

	for playerKey, whichPlayer in Players:GetPlayers() do
		table.insert(activePlayers,whichPlayer)
		local spawnLocation = arenaSpawns[1]
		preparePlayer(whichPlayer, spawnLocation)
		table.remove(arenaSpawns, 1)
	end
end

--events
Players.PlayerAdded:Connect(onPlayerJoin)

return PlayerManager
```
