---
title: Creating a GUI
description: Create a battle royale experience in Roblox Studio. Create and code a GUI that displays a game status during a match.
next: /education/battle-royale-series/ending-matches
prev: /education/battle-royale-series/timers-and-events
---

Right now, much of the game information is currently in the Output Window, invisible to players. So players can be informed of what's happening in the game, you'll create a graphical user interface (GUI) and code it.

## Displaying Information with a GUI

For this game a text label will display the current game status as well as the remaining player count and time.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/education/battle-royale-series/arena_5_showReadyDisplay.jpg" />
    <figcaption>During Intermission</figcaption>
  </figure>
  <figure>
    <img src="../../assets/education/battle-royale-series/arena_5_showTimerDisplay.jpg" />
    <figcaption>During a Match</figcaption>
  </figure>
</GridContainer>

### Setting up the GUI

First, create a **Screen GUI** object to hold the different text elements. When the player moves the camera, the screen GUI stays in the same place on their screen.

To ensure all players see the same display, place the GUI in the **StarterGUI** folder. At game startup, this folder is copied to all players.

1. In the StarterGUI folder, create a new ScreenGUI. Then in ScreenGUI, add a new TextLabel named StatusText.

   <img src="../../assets/education/battle-royale-series/arena_5_showLabelCreated.png" />

2. To move the label, in the Explorer, select StatusText. Then, in the game view, drag the label where you would like it. Your numbers may differ from the video. The label can also be resized using the anchor points on the corners.

   <video controls src="../../assets/education/battle-royale-series/arena_5_showMovingScaleGUI.mp4" width="100%"></video>

## Scripting the GUI

To reflect changes in the game, scripts will need to update the GUI elements. For instance, the game status, whether it's an intermission or active round, will be stored in a StringValue and updated using local scripts.

<Alert severity="info">
Compared to scripts and module scripts which run Roblox servers, local scripts run on a player's device. They're often used for coding GUI elements like the timer or player input, like mouse or keyboard actions.
</Alert>

### Setting up the Script

The StatusDisplay script will be used to update the player's GUI whenever the game state changes.

1. In **ReplicatedStorage**, create a folder named DisplayValues. In that folder, add a StringValue named Status. To test the value later, give it a temporary value, like "Welcome to the Battle!".

   <img src="../../assets/education/battle-royale-series/arena_6_showStatusCreated.png" />

   <Alert severity="info">
   Because local scripts only run on a player's device, they can't be stored in Server folders like ServerStorage. ReplicatedStorage is a folder that's available both to the client (device) and server.
   </Alert>

2. In StarterGUI > ScreenGUI > Status, add a new local script named StatusDisplay. Scripts that affect the GUI are often parented to that GUI element.

   <img src="../../assets/education/battle-royale-series/arena_5_addLocalScript.png" />

3. Open StatusDisplay and define the following variables for the follow:

   - ReplicatedStorage service
   - DisplayValues folder
   - Status StringValue
   - TextLabel - use `script.Parent`.

     ```lua
     local ReplicatedStorage = game:GetService("ReplicatedStorage")
     local displayValues = ReplicatedStorage:WaitForChild("DisplayValues")
     local status = displayValues:WaitForChild("Status")

     local textLabel = script.Parent
     ```

### Changing the Text Label

To change the text in the label, use a Changed event so whenever the Status string is changed by another script, the text label will be updated.

1. Code a new function named `updateText()`. In that function, set the Text property of `textLabel` to `status.Value`.

   ```lua
   local textLabel = script.Parent

   local function updateText()
      textLabel.Text = status.Value
   end
   ```

2. Connect the function to the Changed event.

   ```lua
   local function updateText()
      textLabel.Text = status.Value
   end

   status.Changed:Connect(updateText)
   ```

3. So players see the most up to date status when starting the game, run `updateText()` at the end of the script.

   ```lua
   local function updateText()
      textLabel.Text = status.Value
   end

   status.Changed:Connect(updateText)
   updateText()
   ```

4. Run the game and confirm that you see the temporary value in the display.

   <img src="../../assets/education/battle-royale-series/arena_5_showGUITest.png" />

## Creating the Display Manager

During a game, the text label will need to get information from GameManager, MatchManager, and possibly other scripts. So these different scripts can update the text label when needed, create a module script named DisplayManager.

### Setting up the Script

Because DisplayManager needs to communicate with other scripts, it'll be a module script.

1. In **ServerStorage** > **ModuleScripts**, create a new module script named DisplayManager. Rename the module table to match the script name.

2. Add local variables for the following: Replicated Storage, DisplayValues folder, Status.

   ```lua
   local DisplayManager = {}

   -- Services
   local ReplicatedStorage = game:GetService("ReplicatedStorage")

   -- Display Values used to update Player GUI
   local displayValues = ReplicatedStorage:WaitForChild("DisplayValues")
   local status = displayValues:WaitForChild("Status")

   -- Local Functions

   -- Module Functions

   return DisplayManager
   ```

3. Create a new module function named `updateStatus()` that updates the string in the Status value. Other scripts will be able to call this function.

   ```lua
   -- Local Functions

   -- Module Functions
   function DisplayManager.updateStatus(newStatus)
      status.Value = newStatus
   end
   ```

### Updating the Text Status

With the Display Manager set up, it can be used in other scripts to update the GUI text label. As the first message in the GUI, show the start and end of the intermission through the GameManager script.

1. In **ServerScriptService** > GameManager, create a variable named `displayManager` and require the DisplayManager module in ServerStorage.

   ```lua
   -- Services
   local ReplicatedStorage = game:GetService("ReplicatedStorage")
   local ServerStorage = game:GetService("ServerStorage")
   local Players = game:GetService("Players")

   -- Module Scripts
   local moduleScripts = ServerStorage:WaitForChild("ModuleScripts")
   local roundManager = require(moduleScripts:WaitForChild("RoundManager"))
   local gameSettings = require(moduleScripts:WaitForChild("GameSettings"))
   local displayManager = require(moduleScripts:WaitForChild("DisplayManager"))
   ```

2. As the **first** line after the while true do statement, call displayManager > `updateStatus()` and pass in a message about waiting for players.

   ```lua
   -- Events
   local events = ServerStorage:WaitForChild("Events")
   local matchEnd = events:WaitForChild("MatchEnd")

   while true do
      displayManager.updateStatus("Waiting for Players")

      repeat
         print("Starting intermission")
         task.wait(gameSettings.intermissionDuration)
      until #Players:GetPlayers() >= gameSettings.minimumPlayers

      task.wait(gameSettings.transitionTime)

      matchManager.prepareGame()
      matchEnd.Event:Wait()

   end
   ```

3. After the end of the repeat loop for the intermission, call `updateStatus()` and pass in a string announcing the match is starting. Since you'll be testing with the GUI, delete the two print statements for noting the start and end of the intermission.

   ```lua
   while true do
      displayManager.updateStatus("Waiting for Players")

      repeat
         task.wait(gameSettings.intermissionDuration)
      until #Players:GetPlayers() >= gameSettings.minimumPlayers

      displayManager.updateStatus("Get ready!")
      task.wait(gameSettings.transitionTime)

      matchManager.prepareGame()
      matchEnd.Event:Wait()

   end
   ```

4. Test the game **with** and **without** your minimum players. The message should read the following:

   - Without the minimum players: `"Waiting for Players"`.
   - With the minimum players: `"Get ready"`.

### Troubleshooting Tips

At this point, if the text label doesn't display the first message, or still displays "Label", try one of the following below.

- Make sure in the StatusDisplay local script that `updateText()` is called at the bottom of the script. This ensures that the player gets the most up to date message.
- Check that the Status StringValue is in ReplicatedStorage. Due to the unique nature of client-server relations, if it's in ServerStorage, a local script won't be able to find it.

## Displaying Match Status

During a match, the GUI will display two numbers: remaining player count and time. As these numbers change, the text label will change as well.

## Setting up Values and Functions

IntValues will be used to store the player count and time left.

1. In ReplicatedStorage > DisplayValues, create two IntValues named PlayersLeft and TimeLeft.

   <img src="../../assets/education/battle-royale-series/arena_5_showIntValuesCreated.png" />

2. In DisplayManager, add variables to store the players left and time left values.

   ```lua
   local DisplayManager = {}

   -- Services
   local ReplicatedStorage = game:GetService("ReplicatedStorage")

   -- Display Values used to update Player GUI
   local displayValues = ReplicatedStorage:WaitForChild("DisplayValues")
   local status = displayValues:WaitForChild("Status")
   local playersLeft = displayValues:WaitForChild("PlayersLeft")
   local timeLeft = displayValues:WaitForChild("TimeLeft")
   ```

3. Create a local function named `updateMatchStatus()`. Then, set the value of status to display the number of players left and the remaining time.

   ```lua
   local displayValues = ReplicatedStorage:WaitForChild("DisplayValues")
   local status = displayValues:WaitForChild("Status")
   local playersLeft = displayValues:WaitForChild("PlayersLeft")
   local timeLeft = displayValues:WaitForChild("TimeLeft")

   -- Local Functions
   local function updateRoundStatus()
      status.Value = "Players Left: " .. playersLeft.Value .. " / Time Left: " .. timeLeft.Value
   end
   ```

4. For **both** IntValue variables, connect `updateRoundStatus()` to the Changed event.

   ```lua
   -- Module Functions
   function DisplayManager.updateStatus(newStatus)
      status.Value = newStatus
   end

   playersLeft.Changed:Connect(updateRoundStatus)
   timeLeft.Changed:Connect(updateRoundStatus)

   return DisplayManager
   ```

   <Alert severity="warning">
   Don't test yet. Nothing has updated the PlayersLeft or TimeLeft values, so the status won't be changed once a round starts.
   </Alert>

### Displaying Players

Next, add the code for displaying the number of players at the start of a game. Later lessons will update the PlayersLeft value as players are eliminated from the game.

1. In PlayerManager, add local variables for ReplicatedStorage service, DisplayValues folder and PlayersLeft IntValue.

   ```lua
   local PlayerManager = {}

   -- Services
   local Players = game:GetService("Players")
   local ServerStorage = game:GetService("ServerStorage")
   local ReplicatedStorage = game:GetService("ReplicatedStorage")

   -- Map Variables
   local lobbySpawn = workspace.Lobby.StartSpawn
   local arenaMap = workspace.Arena
   local spawnLocations = arenaMap.SpawnLocations

   -- Values
   local displayValues = ReplicatedStorage:WaitForChild("DisplayValues")
   local playersLeft = displayValues:WaitForChild("PlayersLeft")

   ```

2. Show the starting player count by setting the value of `playersLeft` to the size of the active players array.

   Then, in `sendPlayersToMatch()`, under the for loop, type: `playersLeft.Value = #activePlayers`

   ```lua
   function PlayerManager.sendPlayersToMatch()
      local availableSpawnPoints = spawnLocations:GetChildren()

      for playerKey, whichPlayer in Players:GetPlayers() do
         table.insert(activePlayers,whichPlayer)

         local spawnLocation = availableSpawnPoints[1]
         table.remove(availableSpawnPoints, 1)
         preparePlayer(whichPlayer, spawnLocation)
      end

      playersLeft.Value = #activePlayers
   end
   ```

### Displaying the Timer

Remember that module scripts are used to centralize similar code. Since the timer is tracked in MatchManager, update the TimeLeft value using functions from the Timer script. The display manager will listen for changes to the TimeLeft, and update to match the new value.

1. In MatchManager, create variables to store the **ReplicatedStorage** service, DisplayValues folder and TimeLeft value.

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

   -- Values
   local displayValues = ReplicatedStorage:WaitForChild("DisplayValues")
   local timeLeft = displayValues:WaitForChild("TimeLeft")

   local myTimer = timer.new()
   ```

2. Find the `startTimer()` function. **After** the timer's `Finished` event, copy and paste the whole, highlighted while loop below. The code runs a loop to update the `timeLeft` value as long as the timer is still active.

   ```lua
   while myTimer:isRunning() do
         -- Adding +1 makes sure the timer display ends at 1 instead of 0.
         timeLeft.Value = (math.floor(myTimer:getTimeLeft() + 1))
         -- By not setting the time for wait, it offers more accurate looping
         task.wait()
      end
   ```

   When added in, the code should look like the sample below.

   ```lua
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
   ```

3. Run the game with the minimum players. Check that the status text displays:

   - The correct amount of starting players. Remember, this number won't change until additional code is added in a future lesson.
   - Time decreases each second until it stops at 1.

   <video controls src="../../assets/education/battle-royale-series/arena_5_showFinalizedGameLoop.mp4" width="100%"></video>

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
	matchEnd.Event:Wait()
end
```

### DisplayManager Script

```lua
local DisplayManager = {}

-- Services
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- Display Values used to update Player GUI
local displayValues = ReplicatedStorage:WaitForChild("DisplayValues")
local status = displayValues:WaitForChild("Status")
local playersLeft = displayValues:WaitForChild("PlayersLeft")
local timeLeft = displayValues:WaitForChild("TimeLeft")

-- Local Functions
local function updateRoundStatus()
	status.Value = "Players Left: " .. playersLeft.Value .. " / Time Left: " .. timeLeft.Value
end

-- Module Functions
function DisplayManager.updateStatus(newStatus)
	status.Value = newStatus
end

playersLeft.Changed:Connect(updateRoundStatus)
timeLeft.Changed:Connect(updateRoundStatus)

return DisplayManager
```

### MatchManager Script

```lua
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

local myTimer = timer.new()

-- Local Functions
local function timeUp()
	print("Time is up!")
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

return MatchManager
```

### StatusDisplay Script

```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local displayValues = ReplicatedStorage:WaitForChild("DisplayValues")
local status = displayValues:WaitForChild("Status")

local textLabel = script.Parent

local function updateText()
	textLabel.Text = status.Value
end

status.Changed:Connect(updateText)
updateText()
```
