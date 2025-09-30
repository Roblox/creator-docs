---
title: Code the game loop
description: Create a battle royale experience in Roblox Studio. Code a round manager for a game.
next: /education/battle-royale-series/managing-players
prev: /education/battle-royale-series/project-setup
---

With the map created, it's time to start building out the scripts. The remainder of this course will heavily focus on scripting all different elements of the game loop.

## Set up the scripts

The battle royale will use a combination of module scripts and normal scripts. Below are the scripts and their functions.

<table>
<tbody>
   <tr>
    <td><b>GameManager </b></td>
    <td>Script. Runs functions from the Match Manager using variables from the Game Settings</td>
   </tr>
   <tr>
    <td><b>MatchManager </b></td>
    <td>Module Script. Runs functions like sending players into an arena or keeping track of time in a match.	</td>
   </tr>
   <tr>
    <td><b>GameSettings </b></td>
    <td>Module Script. Stores commonly used variables used by other scripts.</td>
   </tr>
</tbody>
</table>

### GameSettings script

Create a module script named GameSettings to store variables used by other scripts, like match and intermission duration. These variables will be used by the GameManager script later.

1. In **ServerStorage**, create a folder named **ModuleScripts**. In that folder, create a new module script named **GameSettings**.

   <img src="../../assets/education/battle-royale-series/arena_2_showGameSettingsCreated.png" />

2. Open GameSettings and rename the module table to match the name of the script.

   ```lua
   local GameSettings = {}

   return GameSettings
   ```

3. In the module table, add variables for the following uses. Take your best guess for each value, you can always change it later as you test.

   - **Intermission Duration** - Seconds players wait before a match.
   - **Match Duration** - Length of a match in seconds.
   - **Minimum Players** - Smallest number of players needed to start.
   - **Transition Time** - Time before and after a match in seconds. Makes transitioning between parts of the game loop less sudden.

   ```lua
   local GameSettings = {}

   -- Game Variables
   GameSettings.intermissionDuration = 5
   GameSettings.matchDuration = 10
   GameSettings.minimumPlayers = 2
   GameSettings.transitionTime = 5

   return GameSettings
   ```

### MatchManager script

The second script connected to the GameManager is the MatchManager. This script manages tasks like starting the timer or resetting players once the match ends.

Within MatchManager is a function named `prepareGame()` starts the game by transitioning players into the match.

1. In ServerStorage > ModuleScripts > add a module script named MatchManager. Rename the module table.

   ```lua
   local MatchManager = {}

   return MatchManager
   ```

2. Add a new module function to MatchManager named `prepareGame()`. Include a print statement to test the script later.

   ```lua
   local MatchManager = {}

   function MatchManager.prepareGame()
   	print("Game starting!")
   end

   return MatchManager
   ```

## Code the game loop

The main game loop will be coded in the GameManager script using the variables just created. Remember, there are three phases in the game loop: intermission, competition, and cleanup & reset.

### GameManager script

This script is a normal server script, so put it in ServerScriptService, rather than the module scripts folder. The actual game loop will be in a while true do loop.

1. In **ServerScriptService**, create a new script named **GameManager**.

   <img src="../../assets/education/battle-royale-series/arena_2_showGameManagerCreated.png" />

2. Add a variable for the service "ServerStorage", which is where the Modulescripts are. Then add a variable for the service "Players", which will be needed to check player count during intermissions.

   ```lua
   -- Services
   local ServerStorage = game:GetService("ServerStorage")
   local Players = game:GetService("Players")
   ```

3. To use the previously created modules:

   - Set a variable named `moduleScripts` to the location of the ModuleScripts folder.
   - Add variables named `matchManager` and `gameSettings`. Set each variable to require their respective script.

   ```lua
   -- Services
   local ServerStorage = game:GetService("ServerStorage")
   local Players = game:GetService("Players")

   -- Module Scripts
   local moduleScripts = ServerStorage:WaitForChild("ModuleScripts")
   local matchManager = require(moduleScripts:WaitForChild("MatchManager"))
   local gameSettings = require(moduleScripts:WaitForChild("GameSettings"))
   ```

4. After the variables, add a `while true do` loop. All phases of the game loop will go inside to repeat indefinitely.

   ```lua
   -- Module Scripts
   local moduleScripts = ServerStorage:WaitForChild("ModuleScripts")
   local matchManager = require(moduleScripts:WaitForChild("MatchManager"))
   local gameSettings = require(moduleScripts:WaitForChild("GameSettings"))

   -- Main game loop
   while true do

   end
   ```

### Code the intermission

While the game loop runs indefinitely, the intermission should pause the loop and only continue when there are enough players for a match. To code this pause, include a nested repeat loop for the intermission in the while loop. That nested loop will repeat until there are enough players, pausing the main loop. Once there are enough players, it'll exit and transition players into a match.

With a **repeat loop**, the code in the loop will run at least once. Unlike a while loop, it doesn't check it's condition until the loop ends. This ensures players always go to the lobby before a match.

1. In the `while true do` loop, type `repeat` and press <kbd>Enter</kbd> to autocomplete with the keyword `until`.

   ```lua
   while true do
     repeat

     until
   end
   ```

2. Check if the current number of players `(#Players:GetPlayers())` is greater or equal to the `minimumPlayers` variable created earlier in the GameSettings module.

   ```lua
   while true do
   	repeat

   	until #Players:GetPlayers() >= gameSettings.minimumPlayers
   end
   ```

3. In the repeat loop, add a print statement saying the intermission is starting. Use `Library.task.wait()` to pause for the intermission using `intermissionDuration` from GameSettings.

   ```lua
   while true do
   	repeat
   		print("Starting intermission")
   		task.wait(gameSettings.intermissionDuration)
   	until #Players:GetPlayers() >= gameSettings.minimumPlayers
   end
   ```

4. Playtest and check that the print statement `"Starting intermission"` is shown at least twice. Seeing the message twice proves the repeat loop didn't find enough players and ran again. You'll have to wait the length of intermission before seeing the message a second time.

### Troubleshooting tips

At this point, if you're not spawning as intended, try one of the following below.

- `Library.task.wait()` should be inside the repeat loop. Without the wait, the script will run too many times in a second, overloading Roblox Studio and causing an error.
- In the Game Settings module, the variable `intermissionDuration` should be greater than 1. If lower, the script can repeat too often, causing slow down issues.

### End the intermission

Once there are enough players, have them wait a short transition time. Then, send them into the match by calling the `prepareGame()` function in MatchManager. Remember, that function just prints a line, but you'll add more code later.

1. At the end of the repeat loop, add a print statement saying the intermission is over to test your code. Then, follow it with a `Library.task.wait()` using GameSetting's `transitionTime` variable.

   ```lua
   while true do
   	repeat
   		print("Starting intermission")
   		task.wait(gameSettings.intermissionDuration)
   	until #Players:GetPlayers() >= gameSettings.minimumPlayers
   	print("Intermission over")
   	task.wait(gameSettings.transitionTime)
   end
   ```

   <Alert severity="warning">
   Keep the code within the scope of the while loop (between `do` and `end`). If code is outside, parts of your game loop might not repeat and players will just be stuck in the intermission phase.
   </Alert>

2. After the wait, call the `prepareGame()` from the MatchManager module. When the code runs, this will just print text to the Output window. Wait until the next section to test this code.

   ```lua
   while true do
   	repeat
   		print("Starting intermission")
   		task.wait(gameSettings.intermissionDuration)
   	until #Players:GetPlayers() >= gameSettings.minimumPlayers

   	print("Intermission over")
   	task.wait(gameSettings.transitionTime)
   	matchManager.prepareGame()
   end
   ```

   <Alert severity="warning">
   If you add onto the script after this project, keep in mind code below the while true do loop **won't** run. Keep relevant code inside the while loop or call module functions from the main loop.
   </Alert>

## Test multiplayer games

Right now, to have the code run `prepareGame()`, it needs to exit the repeat loop. But, to do that, there needs to be more than one player. This means if you use the playtest button, the function will never run because you're the only player in the game (unless your minimum players is one). To test this out, you'll need to simulate a multiplayer game.

### Start a local server

To test code requiring more than one player, create a local server. While published games are normally on Roblox servers, a **local server** simulates a multiplayer game on your computer with simulated players.

1. To start a local server, navigate to the **Test** menu's **Start Test Session** ⟩ **Server and Clients**. This lesson uses 2 players.

2. Wait a few seconds for the server to set up. Multiple windows will open in addition to your original Studio window. You may need to allow access to Roblox Studio from firewalls or other online security software.

### Troubleshooting tips

At this point, you're unable to see the test servers, try one of the following below.

- If you have any issues with the server starting, double check the article <a href="https://en.help.roblox.com/hc/en-us/articles/203312840-Firewall-and-Router-Issues">Firewall and Router Issues</a>.
- Set the number of players to a small amount, like 2 or 3.
- If the issue doesn't resolve, try restarting Studio or restarting your computer.

### Test in the local server

You'll see multiple windows when the server starts. Each one represents a different part of the server/client relationship.

- **Server** (green border) runs the game.
- **Client** (blue borders) simulates a player's experience.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/education/battle-royale-series/arena_2_showClientServerWindows_server.png" />
    <figcaption>Server with green border</figcaption>
  </figure>
  <figure>
    <img src="../../assets/education/battle-royale-series/arena_2_showClientServerWindows_client.png" />
    <figcaption>Client with blue border</figcaption>
  </figure>
</GridContainer>

With the server up, you can check if the code worked.

1. Find the **Server** window with the green border. Check for the print statement called from the MatchManager script. Because there is a repeat loop, you'll see the same print statements repeating.

   <img src="../../assets/education/battle-royale-series/arena_2_showFinishedOutput.png" />

2. Once you're done testing, click the **End Session** button in any window to close all server and client windows and return to your normal Studio window.

### Troubleshooting tips

At this point, if the intended print statements didn't appear, try one of the following below.

- Check that functions like `prepareGame()` are in scope of the while true do loop.
- If the print from MatchManager didn't work, check some common troubleshooting with module scripts, like making sure that the MatchManager script is required in GameManager or that `prepareGame()` is added to that module's table.

## Completed scripts

Below are completed scripts to double check your work.

### GameManager script

```lua
-- Services
local ServerStorage = game:GetService("ServerStorage")
local Players = game:GetService("Players")

-- Module Scripts
local moduleScripts = ServerStorage:WaitForChild("ModuleScripts")
local matchManager = require(moduleScripts:WaitForChild("MatchManager"))
local gameSettings = require(moduleScripts:WaitForChild("GameSettings"))

-- Main game loop
while true do
	repeat
		print("Starting intermission")
		task.wait(gameSettings.intermissionDuration)
	until #Players:GetPlayers() >= gameSettings.minimumPlayers

	print("Intermission over")
	task.wait(gameSettings.transitionTime)

	matchManager.prepareGame()
end
```

### MatchManager script

```lua
local MatchManager = {}

function MatchManager.prepareGame()
	print("Game starting!")
end

return MatchManager
```

### GameSettings script

```lua
local GameSettings = {}

-- Game Variables
GameSettings.intermissionDuration = 5
GameSettings.roundDuration = 10
GameSettings.minimumPlayers = 2
GameSettings.transitionTime = 5

return GameSettings
```
