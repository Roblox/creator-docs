---
title: Record and Display Player Data
description: Explains how to store and retrieve individual player data in an experience and display it visually through a leaderboard.
next: /tutorials/core/scripting/create-player-hazards
prev: /tutorials/core/scripting/script-game-behavior
---

<iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/bfWTFFFcLXY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<br/>

Now that you can detect when a player has collected a coin, this section of the tutorial
teaches you how to count how many coins players have collected, and make that amount visible
on a leaderboard.

## Create a Module Script to Record Coin Collection

To handle the storage and management of each player's coin collection data,
you need to create a `Class.ModuleScript` object to contain a data structure and
functions that access coin collection data for every player. Module scripts are
reusable code that other scripts can require. In this case, the
`CoinService` requires this module script so that it can update coin collection data
when players touch coins.

To create a module script:

1. In the **Explorer** window, hover over **ServerStorage** and click the
   **&CirclePlus;** button. A contextual menu displays.
1. From the contextual menu, select **ModuleScript**. A new module script displays under **ServerStorage**.
   You are placing a module script into **ServerStorage** because you want to manage the coin collection
   logic on the server.

   <img src="../../../assets/tutorials/record-and-display-player-data/Insert-ModuleScript.png" width="320" />

1. Rename the module script to **PlayerData**.

   <img src="../../../assets/tutorials/record-and-display-player-data/ModuleScript-Renamed-PlayerData.png" width="320" />

1. Replace the default code with the following code:

   ```lua
   local PlayerData = {}
   PlayerData.COIN_KEY_NAME = "Coins"

   local playerData = {
     --[[
       [userId: string] = {
         ["Coins"] = coinAmount: number
       }
     ]]
   }

   local DEFAULT_PLAYER_DATA = {
     [PlayerData.COIN_KEY_NAME] = 0
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

   <BaseAccordion>
   <AccordionSummary>

   <Typography variant="h4">Code Explanation</Typography>
   </AccordionSummary>
   <AccordionDetails>

   The module script defines a `PlayerData` table that contains zero or many
   `playerData` tables, which represent coin collection data for a player. Every
   script that requires this module script receives the same copy of the
   `PlayerData` table, allowing multiple scripts to modify and share coin
   collection data.

   <h4>Declaring the Data Structures</h4>

   The module script begins with a declaration of an empty table, `PlayerData`,
   which is returned at the end of the script. It also contains
   accessor methods to get and set values in the table.

   The `playerData` table contains comments that describe the structure of the
   table, which makes the code easier to understand. In this case, a
   `playerData` table contains a `userId` and a corresponding field named
   `Coins` that represents the amount of collected coins for that player.

   ```lua
   local PlayerData = {}
   PlayerData.COIN_KEY_NAME = "Coins"

   local playerData = {
     --[[
       [userId: string] = {
           ["Coins"] = coinAmount: number
       }
     ]]
   }

   ...

   return PlayerData
   ```

   <h4>Defining a local data accessor</h4>

   `getData()` is a local function that retrieves data for a specific
   `playerData` table. If a player hasn't collected a coin, it returns a
   `DEFAULT_PLAYER_DATA` table to ensure that every player has some data
   associated with them. A common convention is to create simple,
   public-facing functions that offload logic to locally-scoped functions that
   do the heavy lifting.

   ```lua
   local DEFAULT_PLAYER_DATA = {
    [PlayerData.COIN_KEY_NAME] = 0
   }

   local function getData(player)
     local data = playerData[tostring(player.UserId)] or DEFAULT_PLAYER_DATA
     playerData[tostring(player.UserId)] = data
     return data
   end
   ```

   <h4>Defining public data accessors</h4>

   `getValue()` and `updateValue()` are public-facing functions that other
   scripts that require this module script can call. In our case, the
   **CoinService** uses these functions to update a player's coin collection
   data whenever that player touches a coin.

   ```lua
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
   ```

   </AccordionDetails>
   </BaseAccordion>

## Implement a Leaderboard

You can represent the coin collection data visually with an on-screen
leaderboard. Roblox includes a built-in system that automatically generates a
leaderboard using a default UI.

To create the leaderboard:

1. In the **Explorer** window, create a **ModuleScript** in **ServerStorage**, then
rename the module script to **Leaderboard**.

   <img src="../../../assets/tutorials/record-and-display-player-data/ModuleScript-Renamed-Leaderboard.png" width="320" />

1. Replace the default code with the following code:

   ```lua
   local Leaderboard = {}

   -- Creating a new leaderboard
   local function setupLeaderboard(player)
     local leaderstats = Instance.new("Folder")
     -- 'leaderstats' is a reserved name Roblox recognizes for creating a leaderboard
     leaderstats.Name = "leaderstats"
     leaderstats.Parent = player
     return leaderstats
   end

   -- Creating a new leaderboard stat value
   local function setupStat(leaderstats, statName)
     local stat = Instance.new("IntValue")
     stat.Name = statName
     stat.Value = 0
     stat.Parent = leaderstats
     return stat
   end

   -- Updating a player's stat value
   function Leaderboard.setStat(player, statName, value)
     local leaderstats = player:FindFirstChild("leaderstats")
     if not leaderstats then
       leaderstats = setupLeaderboard(player)
     end

     local stat = leaderstats:FindFirstChild(statName)
     if not stat then
       stat = setupStat(leaderstats, statName)
     end

     stat.Value = value
   end

   return Leaderboard
   ```

   <BaseAccordion>
   <AccordionSummary>

   <Typography variant="h4">Code Explanation</Typography>
   </AccordionSummary>
   <AccordionDetails>
   The following sections describe how the leaderboard works in more detail.

    <h4>Creating a Leaderboard</h4>

   The `setupLeaderboard()` function creates a new folder instance named
   `leaderstats` and sets it as a child of the specified player. Roblox
   automatically recognizes a folder named `leaderstats` as a container of
   stats and creates a UI element to display the stats. It requires the values
   in `leaderstats` to be stored as "value" objects (such as
   `Class.StringValue`, `Class.IntValue` or `Class.NumberValue`).

   ```lua
   -- Creating a new leaderboard
   local function setupLeaderboard(player)
     local leaderstats = Instance.new("Folder")
     -- 'leaderstats' is a reserved name Roblox recognizes for creating a leaderboard
     leaderstats.Name = "leaderstats"
     leaderstats.Parent = player
     return leaderstats
   end

   -- Creating a new leaderboard stat value
   local function setupStat(leaderstats, statName)
     local stat = Instance.new("IntValue")
     stat.Name = statName
     stat.Value = 0
     stat.Parent = leaderstats
     return stat
   end
   ```

   <h4>Updating Player Stats</h4>

   `setStat()` is the only public function in the **Leaderboard** module. It
   creates stat values for a specified player or the leaderboard itself if it
   doesn't already exist.

   `Class.Instance:FindFirstChild()|FindFirstChild()` takes the name of an object
   and returns the object if it exists, or `nil` if it doesn't. It's a common,
   safe method of finding out if an object exists before you use it.

   ```lua
   -- Updating a player's stat value
   function Leaderboard.setStat(player, statName, value)
     local leaderstats = player:FindFirstChild("leaderstats")
     if not leaderstats then
       leaderstats = setupLeaderboard(player)
     end

     local stat = leaderstats:FindFirstChild(statName)
     if not stat then
       stat = setupStat(leaderstats, statName)
     end

     stat.Value = value
   end
   ```

   </AccordionDetails>
   </BaseAccordion>

## Integrate the Module Scripts

With both the **PlayerData** and **Leaderboard** module scripts complete,
require them in the **CoinService** script to manage and display player coin
data. To update **CoinService**:

1.  In the **Explorer** window, open the **CoinService** script.
2.  Replace the existing code with the following code:

    ```lua
    -- Initializing services and variables
    local Workspace = game:GetService("Workspace")
    local Players = game:GetService("Players")
    local ServerStorage = game:GetService("ServerStorage")

    -- Modules
    local Leaderboard = require(ServerStorage.Leaderboard)
    local PlayerData = require(ServerStorage.PlayerData)

    local coinsFolder = Workspace.World.Coins
    local coins = coinsFolder:GetChildren()

    local COIN_KEY_NAME = PlayerData.COIN_KEY_NAME
    local COOLDOWN = 10
    local COIN_AMOUNT_TO_ADD = 1

    local function updatePlayerCoins(player, updateFunction)
      -- Update the coin table
      local newCoinAmount = PlayerData.updateValue(player, COIN_KEY_NAME, updateFunction)

      -- Update the coin leaderboard
      Leaderboard.setStat(player, COIN_KEY_NAME, newCoinAmount)
    end

    -- Defining the event handler
    local function onCoinTouched(otherPart, coin)
      if coin:GetAttribute("Enabled") then
        local character = otherPart.Parent
        local player = Players:GetPlayerFromCharacter(character)
        if player then
          -- Player touched a coin
          coin.Transparency = 1
          coin:SetAttribute("Enabled", false)
          updatePlayerCoins(player, function(oldCoinAmount)
            oldCoinAmount = oldCoinAmount or 0
            return oldCoinAmount + COIN_AMOUNT_TO_ADD
          end)

          task.wait(COOLDOWN)
          coin.Transparency = 0
          coin:SetAttribute("Enabled", true)
        end
      end
    end

    -- Setting up event listeners
    for _, coin in coins do
      coin:SetAttribute("Enabled", true)
      coin.Touched:Connect(function(otherPart)
        onCoinTouched(otherPart, coin)
      end)
    end
    ```

    <BaseAccordion>
    <AccordionSummary>
      <Typography variant="h4">Code Explanation</Typography>
    </AccordionSummary>
    <AccordionDetails>
      The changes to the original **CoinService** script include:

    - Importing the **PlayerData** and **Leaderboard** modules with the
      `Global.RobloxGlobals.require()` function.
    - Declaring `COIN_AMOUNT_TO_ADD` as the number of
      coins to add when a player collects a coin, and `COIN_KEY_NAME` as the key
      name defined in **PlayerData**.
    - Creating the helper function
      `updatePlayerCoins()` to update the player's coin count and associated
      leaderboard stat.
    - Replacing the placeholder `print()` statement in
      `onCoinTouched()` with a call to `updatePlayerCoins()`.

    </AccordionDetails>
    </BaseAccordion>

## Playtest

It's time to see if the coin collection is working as intended. When you touch
and collect a coin in the game, you should be able to see the amount of coins
you've collected on the leaderboard UI. To playtest your experience:

1. In the menu bar, click the **Play** button. Studio enters playtest mode.

   <img src="../../../assets/studio/general/Quick-Access-Toolbar-Play.png"
   width="800" />

1. Move your character to touch a coin. If your scripts are working correctly, the
leaderboard UI displays and increase your coin count as you collect more coins.
<video controls loop muted>
   <source src="../../../assets/tutorials/record-and-display-player-data/record-and-display-player-data-example.mp4" />
   </video>
