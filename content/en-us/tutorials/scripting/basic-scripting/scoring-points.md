---
title: Scoring Points
description: The process for creating a scoring system to award and track points for players.
prev: /tutorials/scripting/basic-scripting/fading-trap
---

In previous tutorials, you made a variety of experience features including [fading platforms](../../../tutorials/scripting/basic-scripting/fading-trap.md) and [deadly lava](../../../tutorials/scripting/basic-scripting/deadly-lava.md). This tutorial ties these together into a playable experience where users see who can stay alive the longest. Every second they stay alive, a point will be added to their score.

<video controls loop muted>
	<source src="../../../assets/tutorials/scoring-points/finishedScoringPointsSolo.mp4" />
</video>

## Setting Up

First up, you'll need to set the scene for your experience. Duplicate the [fading platforms](../../../tutorials/scripting/basic-scripting/fading-trap.md) you made in the previous tutorial and let users compete to stay on the board of platforms for as long as possible.

You can also use [deadly lava](../../../tutorials/scripting/basic-scripting/deadly-lava.md) to kill users when they fall off the platforms, or just let them fall to their doom. Make sure you place a **SpawnLocation** somewhere where users can jump onto the platforms to start playing.

![Spawn point above a grid of fading platforms, above a lava floor](../../../assets/tutorials/scoring-points/sceneInPlace.jpg)

## Player Points

Roblox has a built-in **Leaderboard** for showing user stats. When you set player points through the leaderboard, they show up on the right side of the screen in the experience.

<img alt="Leaderboard with username and points shown" src="../../../assets/tutorials/scoring-points/leaderboard.jpg" width="60%" />

You'll learn more customizable ways to display information in later tutorials, but the leaderboard is the simplest way of making a visible scoring system in Roblox.

It's best to put scripts which set up experience state into **ServerScriptService** because they will automatically run when the experience starts. In **ServerScriptService**, create a script called **SetupPoints**.

<img alt="SetupPoints script in place in ServerScriptService in the Explorer window" src="../../../assets/tutorials/scoring-points/setupPointsScript.jpg" width="60%" />

## Listening for Players

In Roblox, a **service** is an object which performs a range of useful functions. The `Class.Players` service has an event called `Class.Players.PlayerAdded|PlayerAdded` that you can use to set up points for each user who joins the experience.

You can access services with the `Class.ServiceProvider:GetService()|GetService` function in the `Class.DataModel|game` object. `Class.DataModel|game` is a variable accessible from anywhere which contains everything in your experience.

1. Create a variable for the Players service using `game:GetService("Players")`.
2. Create a function called `onPlayerAdded` with a parameter for the incoming player.
3. Connect the `onPlayerAdded` function to the PlayerAdded event.

   ```lua
   local Players = game:GetService("Players")

   local function onPlayerAdded(player)

   end

   Players.PlayerAdded:Connect(onPlayerAdded)
   ```

<Alert severity="info">

When declaring a variable to contain a service, it's best to name it with the exact name of the service (`"Players"`), even though this means breaking usual naming conventions for variables.

</Alert>

## Create a Stats Folder

To make a user's points display in the leaderboard, all you need to do is create a new `Class.Folder` in their `Class.Player` object called `"leaderstats"` and put their points in there. New objects can be created from within a script via the `Datatype.Instance.new()` function.

1. Create a new `Folder` object using `Instance.new("Folder")`, storing the result in a new variable called `leaderstats`.

   ```lua
   local function onPlayerAdded(player)
   	local leaderstats = Instance.new("Folder")
   end
   ```

2. Set the Name property of `leaderstats` to `"leaderstats"`.
3. Parent `leaderstats` to `player`.

   ```lua
   local Players = game:GetService("Players")

   local function onPlayerAdded(player)
   	local leaderstats = Instance.new("Folder")
      leaderstats.Name = "leaderstats"
      leaderstats.Parent = player
   end

   Players.PlayerAdded:Connect(onPlayerAdded)
   ```

<Alert severity="warning">

Make sure you name the folder **exactly** as it is shown here (`"leaderstats"`) or it will not work!

</Alert>

## Creating the Points

The leaderboard system reads any values in the `leaderstats` folder and displays whatever it finds.

To add a stat which will track a player's points, a new `IntValue` object can be parented to the `leaderstats` folder. The name of the value object will be displayed alongside its current value.

1. Use a variable named `points` to create a new `IntValue` object using `Datatype.Instance.new()`.
2. Set the `Name` to `"Points"`.
3. Set the `Value` to **0**; this is what the leaderboard will initially display for the player.
4. Parent the `points` object to the `leaderstats` folder.

```lua
local Players = game:GetService("Players")

local function onPlayerAdded(player)
  local leaderstats = Instance.new("Folder")
  leaderstats.Name = "leaderstats"
  leaderstats.Parent = player

  local points = Instance.new("IntValue")
  points.Name = "Points"
  points.Value = 0
  points.Parent = leaderstats
end

Players.PlayerAdded:Connect(onPlayerAdded)
```

Test your experience and you should see the leaderboard appear in the top right with the names of your users and a points score next to them.

## Counting Time

Each user should earn a point for each second they are alive. A `while` loop and the `Library.task.wait()` function can be used to update the value of points every second.

1. At the end of the script, create a `while` loop with `true` as the condition.
2. In the loop, `Library.task.wait()` for 1 second.

```lua
Players.PlayerAdded:Connect(onPlayerAdded)

while true do
  task.wait(1)
end
```

## Player List

To run code for every user in the experience, you need to iterate through the **array** of users returned by the `Class.Players:GetPlayers()|GetPlayers` function.

An array is a list of items stored in order. Each item can be accessed by its **index** position, starting from `1`. You can get the length of an array by prefixing it with `#`.

1. Store the result of `Class.Players:GetPlayers()` in a `playerList` variable.
2. Create a **for** loop with a starting value of 1 and an end value of `#playerList`, so that you get one iteration of the loop per player.

```lua
while true do
  task.wait(1)
  local playerList = Players:GetPlayers()
  for currentPlayer = 1, #playerList do
    -- Add your logic here for each player in the playerList
  end
end
```

## Awarding Points

To award a point to each user in the for loop, you'll need to get the user out of the array and add 1 to the **Points** object stored in their `leaderstats` folder.

Objects stored in an array are accessed using **square brackets** - for instance, the first item in the `playerList` array can be accessed with `playerList[1]`. If you write `playerList[currentPlayer]` in the for loop, you can move through each user in the list with every iteration of the loop.

1. Store the user at `playerList[currentPlayer]` in a variable called `player`.
2. Store the user's **Points** object in a variable called `points`.
3. Set the `Class.IntValue.Value|Value` property of `points` to `points.Value + 1`.

```lua
while true do
  task.wait(1)
  local playerList = Players:GetPlayers()
  for currentPlayer = 1, #playerList do
    local player = playerList[currentPlayer]
    local points = player.leaderstats.Points
    points.Value += 1
  end
end
```

Test your experience and you should find that the leaderboard shows your player's score counting up by 1 every second.

<video controls loop muted>
	<source src="../../../assets/tutorials/scoring-points/leaderboardCounting.mp4" />
</video>

## Listening for Characters

The goal of the experience is to see who can stay alive the longest, so users who die will need to have their points reset to 0.

You'll need to get the **Character** model for the user in order to detect when they have died. This model is only added to the experience _after_ the `Class.Player` object has been loaded and you can use the `Class.Player.CharacterAdded|CharacterAdded` event to listen for when the character is ready to use. Create a function called `onCharacterAdded` with two parameters: one for the character, one for the player.

```lua
local Players = game:GetService("Players")

local function onCharacterAdded(character, player)

end

local function onPlayerAdded(player)
  local leaderstats = Instance.new("Folder")
```

Although you included user in the `onCharacterAdded` function's parameters, the actual `Class.Player.CharacterAdded|CharacterAdded` event only returns the character, not the associated user. To pass the `player` object as well, use an [anonymous function](../../../luau/functions.md#anonymous-functions) for the event connection.

```lua
local function onPlayerAdded(player)
  local leaderstats = Instance.new("Folder")
  leaderstats.Name = "leaderstats"
  leaderstats.Parent = player

  local points = Instance.new("IntValue")
  points.Name = "Points"
  points.Value = 0
  points.Parent = leaderstats

  player.CharacterAdded:Connect(function(character)
    onCharacterAdded(character, player)
  end)
end
```

## Resetting Points

When a user dies, their `Class.Humanoid` automatically fires a `Class.Humanoid.Died|Died` event. You can use this event to find out when to reset their points.

The Humanoid is found inside the Character model, but the contents of that model are only assembled as the user spawns. To make your code safely wait for the Humanoid object to load, use the `Class.Instance:WaitForChild()|WaitForChild()` function. You can call it on any parent object, passing the string name of the child you're waiting for. Create a variable to wait for the Humanoid using `character:WaitForChild("Humanoid")`.

```lua
local Players = game:GetService("Players")

local function onCharacterAdded(character, player)
  local humanoid = character:WaitForChild("Humanoid")
end
```

The function you need to connect to the Died event is very short and will only ever be needed here, so you can use an anonymous function again.

1. Connect a new anonymous function to the Humanoid's **Died** event.
2. In the anonymous function, create a variable called `points` for the player's **Points** object.
3. Set the `Class.IntValue.Value|Value` property of `points` to **0**.

```lua
local Players = game:GetService("Players")

local function onCharacterAdded(character, player)
  local humanoid = character:WaitForChild("Humanoid")

  humanoid.Died:Connect(function()
    local points = player.leaderstats.Points
    points.Value = 0
  end)
end
```

Test this out and you'll see the user's score resets when they die.

## Checking the Player

If users keep earning points even when dead, it's hardly in the spirit of the experience, so the code needs to check if users are alive before awarding a point.

You need to start by defining an **attribute** in the `onPlayerAdded` function which can be used to check whether the user is alive. At this point, the user is not yet alive and spawned, as their character model still needs to be added.

Attributes allow you to customize objects in Roblox with your own data. An attribute consists of a name and a value. You can create one on any object using the `Class.Instance:SetAttribute()|SetAttribute` function. Call `Class.Instance:SetAttribute()|SetAttribute` on `player` to create a new **attribute** called `"IsAlive"` with the value `false`.

```lua
local function onPlayerAdded(player)
  local leaderstats = Instance.new("Folder")
  leaderstats.Name = "leaderstats"
  leaderstats.Parent = player

  local points = Instance.new("IntValue")
  points.Name = "Points"
  points.Value = 0
  points.Parent = leaderstats

  player:SetAttribute("IsAlive", false)

  player.CharacterAdded:Connect(function(character)
    onCharacterAdded(character, player)
  end)
end
```

Once the user's character model respawns, the value of `IsAlive` needs to be changed to `true` so that the user can start earning points again.

1. In `onCharacterAdded`, set the `IsAlive` attribute of `player` to **true**.
2. In `onCharacterDied`, set the `IsAlive` attribute of `player` to **false**.

```lua
local Players = game:GetService("Players")

local function onCharacterAdded(character, player)
  player:SetAttribute("IsAlive", true)

  local humanoid = character:WaitForChild("Humanoid")

  humanoid.Died:Connect(function()
    local points = player.leaderstats.Points
    points.Value = 0
    player:SetAttribute("IsAlive", false)
  end)
end
```

Finally, `IsAlive` should be **checked** before any point is awarded in the `while` loop at the end of the script. The `Class.Instance:GetAttribute()|GetAttribute` function takes the name of an attribute and returns the value. In the `while` loop, wrap the code to award a point in an `if` statement with the condition `player:GetAttribute("IsAlive")`.

```lua
while true do
  task.wait(1)
  local playerList = Players:GetPlayers()

  for currentPlayer = 1, #playerList do
    local player = playerList[currentPlayer]

    if player:GetAttribute("IsAlive") then
      local points = player.leaderstats.Points
      points.Value += 1
    end
  end
end
```

Test your experience out now and you should find the user earns points every second they are alive, and stays at 0 when not alive. Have your friends play with you and see who can get the highest score.

This is just the start: you can continue improving your experience for your users. Here are some tips:

- Place the code for all of the platforms into a single script, making it much easier to update.
- Create a lobby area where users wait to be teleported to the experience area, allowing users to start simultaneously.
- Announce the winners of each round.

## Final Code

```lua
local Players = game:GetService("Players")

local function onCharacterAdded(character, player)
  player:SetAttribute("IsAlive", true)
  local humanoid = character:WaitForChild("Humanoid")

  humanoid.Died:Connect(function()
    local points = player.leaderstats.Points
    points.Value = 0
    player:SetAttribute("IsAlive", false)
  end)
end

local function onPlayerAdded(player)
  local leaderstats = Instance.new("Folder")
  leaderstats.Name = "leaderstats"
  leaderstats.Parent = player

  local points = Instance.new("IntValue")
  points.Name = "Points"
  points.Value = 0
  points.Parent = leaderstats

  player:SetAttribute("IsAlive", false)

  player.CharacterAdded:Connect(function(character)
    onCharacterAdded(character, player)
  end)
end

Players.PlayerAdded:Connect(onPlayerAdded)

while true do
  task.wait(1)
  local playerList = Players:GetPlayers()
  for i = 1, #playerList do
    local player = playerList[i]
    if player:GetAttribute("IsAlive") then
      local points = player.leaderstats.Points
      points.Value += 1
    end
  end
end
```
