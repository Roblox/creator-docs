---
title: Save data
description: The process for creating a basic data store to save, store, and read data back.
---

Experiences often need to store **persistent data** between sessions, such as a player's level, experience points, money, inventory items, location, and more.

This tutorial shows how to create a basic **data store**, save player data, and read the data back into a player session.

## Enable Studio access

By default, experiences tested in Studio cannot access data stores, so you must first enable them:

1. [Publish](../../../../production/publishing/publish-experiences-and-places.md) the experience.
2. Open Studio's **File** ⟩ **Experience Settings** window.
3. In the **Security** section, turn on **Enable Studio Access to API Services** and click **Save**.

## Create a data store

Data stores require a unique **name**. This example creates a data store named **PlayerGold** that saves each player's gold in persistent storage:

1. Create a `Class.Script` within `Class.ServerScriptService` called **GoldManager**.

   <img src="../../../../assets/tutorials/intro-to-saving-data/ServerScriptService-GoldManager.png" width="320" />

2. Data stores are managed by `Class.DataStoreService`, so get the service:

   ```lua
   local DataStoreService = game:GetService("DataStoreService")
   ```

3. Call `Class.DataStoreService:GetDataStore()` with the string `"PlayerGold"`. This method accesses the **PlayerGold** data store if it already exists. If it doesn't exist, the method creates a new data store and names it **PlayerGold**.

   ```lua
   local DataStoreService = game:GetService("DataStoreService")

   local goldStore = DataStoreService:GetDataStore("PlayerGold")
   ```

## Save data

A data store is essentially a dictionary, like a Luau table. Each value in the data store is indexed by a unique **key**, which might be the player's unique `Class.Player.UserId|UserId` or simply a named string.

<Tabs>
<TabItem label="Player Data Example">
<table>
    <thead>
        <tr>
            <th>Key</th>
            <th>Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
    <td>`31250608`</td>
    <td>`50`</td>
    </tr>
    <tr>
    <td>`351675979`</td>
    <td>`20`</td>
    </tr>
    <tr>
    <td>`505306092`</td>
    <td>`78000`</td>
    </tr>
    </tbody>
</table>

</TabItem>
<TabItem label="Promo Examples">
<table>
  <thead>
      <tr>
          <th>Key</th>
          <th>Value</th>
      </tr>
  </thead>
  <tbody>
      <tr>
  <td>`ActiveSpecialEvent`</td>
  <td>`SummerParty2`</td>
  </tr>
  <tr>
  <td>`ActivePromoCode`</td>
  <td>`BONUS123`</td>
  </tr>
  <tr>
  <td>`CanAccessPartyPlace`</td>
  <td>`true`</td>
  </tr>
  </tbody>
</table>

</TabItem>
</Tabs>

To save player data in the data store:

1. Create a variable named `playerUserID` for the data store key. Then, use `playerGold` to store a player's starting gold amount.

   ```lua
   local DataStoreService = game:GetService("DataStoreService")

   local goldStore = DataStoreService:GetDataStore("PlayerGold")

   -- Data store key and value
   local playerUserID = 505306092
   local playerGold = 250
   ```

2. To save data into the `PlayerGold` data store, call `Class.GlobalDataStore:SetAsync()|SetAsync` within a protected call, passing the key and value variables previously created.

   ```lua
   local DataStoreService = game:GetService("DataStoreService")

   local goldStore = DataStoreService:GetDataStore("PlayerGold")

   -- Data store key and value
   local playerUserID = 505306092
   local playerGold = 250

   -- Set data store key
   local success, error = pcall(function()
       goldStore:SetAsync(playerUserID, playerGold)
   end)
   if not success then
       warn(error)
   end
   ```

Functions like `Class.GlobalDataStore:SetAsync()|SetAsync()` are network calls that may occasionally fail. As shown above, `Global.LuaGlobals.pcall()` is used to detect and handle when such failures occur.

In its most basic form, `Global.LuaGlobals.pcall()` accepts a function and returns two values:

- The status, which is `true` if the function executed without errors, or `false` otherwise.
- The return value of the function or an error message.

The sample above checks status on line 13. If `Class.GlobalDataStore:SetAsync()|SetAsync()` fails for any reason, the sample displays the error in the [Output](../../../../studio/output.md) window.

<Alert severity="warning">
Be careful to not send requests to data stores too often. Requests on a data store key are placed in a queue and, if the queue fills up, additional requests are [dropped](../../../../cloud-services/data-stores/index.md#error-codes).

A common mistake may be updating a player's gold data every time they collect a gold piece. Instead, store the player's gold in a variable and only update the data store occasionally, such as with a periodic auto-save and/or when the player leaves the experience.
</Alert>

## Read data

To read data from a data store, call `Class.GlobalDataStore:GetAsync()|GetAsync()` with the desired key name.

```lua
local DataStoreService = game:GetService("DataStoreService")

local goldStore = DataStoreService:GetDataStore("PlayerGold")

-- Data store key and value
local playerUserID = 505306092
local playerGold = 250

-- Set data store key
local setSuccess, errorMessage = pcall(function()
	goldStore:SetAsync(playerUserID, playerGold)
end)
if not setSuccess then
	warn(errorMessage)
end

-- Read data store key
local getSuccess, currentGold = pcall(function()
	return goldStore:GetAsync(playerUserID)
end)
if getSuccess then
	print(currentGold)
end
```

To test the script, [initiate a playtest](../../../../studio/testing-modes.md#playtesting) and notice the `currentGold` value printed to the [Output](../../../../studio/output.md) window. Note that it may take a couple seconds, as the functions must connect to data store servers.

## Read and save automatically

The previous script works, but has a fundamental problem: it includes hard-coded values for `playerUserID` and `playerGold`, so it doesn't support multiple players with different amounts of gold. A more realistic solution reads the gold value when the player connects to the experience and then saves it when the player leaves. This approach means connecting the data store calls to [events](../../../../scripting/events/index.md) from the `Class.Players` service.

```lua
local DataStoreService = game:GetService("DataStoreService")
local Players = game:GetService("Players")

local goldStore = DataStoreService:GetDataStore("PlayerGold")

-- Add gold values for each player to a local table to avoid hitting the data
-- store repeatedly.
local playerGold = {}

local function incrementGold(player, amount)
    playerGold[player.UserId] += amount
end

local function onPlayerAdded(player)
    -- Read data store key
    local success, storedGold = pcall(function()
        return goldStore:GetAsync(player.UserId)
    end)
    if success then
        local currentGold
        if storedGold then
            currentGold = storedGold
        else
            currentGold = 0
        end
        playerGold[player.UserId] = currentGold
        print(currentGold)
    end

    -- Test incrementing gold
    incrementGold(player, 5)
end

local function onPlayerRemoving(player)
    -- Set data store key
    local success, err = pcall(function()
        goldStore:SetAsync(player.UserId, playerGold[player.UserId])
    end)
    if not success then
        warn(err)
    end
    -- Clean up entry so that the table doesn't grow for the lifespan of the server
    playerGold[player.UserId] = nil
end

Players.PlayerAdded:Connect(onPlayerAdded)
Players.PlayerRemoving:Connect(onPlayerRemoving)
```

## Read and save character position

To save player position, you work with the `Class.Player.Character|Character` rather than the `Class.Player`, but the principle is similar. This time, create a `Class.Script` within `Class.ServerScriptService` called **PositionManager**:

```lua
local Players = game:GetService("Players")
local DataStoreService = game:GetService("DataStoreService")
local Workspace = game:GetService("Workspace")

local playerPositionStore = DataStoreService:GetDataStore("PlayerPositionStore")

local function positionHandler(player)

    -- Load position on character add
    player.CharacterAdded:Connect(function(character)
        local success, coords = pcall(function()
            return playerPositionStore:GetAsync(player.UserId)
        end)
        local position = Vector3.new(coords[1], coords[2], coords[3])
        if success and position then
            character:PivotTo(CFrame.new(position))
            print("Loaded player position!")
        else
            warn("Failed to load position for player " .. player.Name .. ". Placing in default position.")
        end

        -- Handle player respawn on death
        local humanoid = character:FindFirstChildOfClass("Humanoid")
        humanoid.Died:Connect(function()
            local spawnLocation = Workspace:FindFirstChild("SpawnLocation")
            character:PivotTo(spawnLocation.CFrame)
        end)
    end)

    -- Save position on character removal
    player.CharacterRemoving:Connect(function(character)
        local position = character:GetPivot().Position
        local success, err = pcall(function()
            playerPositionStore:SetAsync(player.UserId, {position.X, position.Y, position.Z})
            print("Saved player position!")
        end)
        if not success then
            warn("Failed to save position for player " .. player.Name .. ": " .. err)
        end
    end)
end

Players.PlayerAdded:Connect(positionHandler)
```

This script adds a new data store, `playerPositionStore`. Because data stores only store basic types rather than objects, you have to store X, Y, and Z coordinates as individual numbers rather than a single `Datatype.Vector3` or `Datatype.CFrame` value. As you test your experience, move your character around. Note how your character returns to the same position the next time you test your experience.

## Sample project

Now that you understand basic data store usage, test it out in the [Gold Rush](https://www.roblox.com/games/5268331031/Gold-Rush) sample experience. You can also edit the experience in Studio and explore the enhanced **GoldManager** script, which displays gold as part of the UI and includes auto-saving.

<UseStudioButton variant="" buttonTextTranslationKey="Action.EditInStudio" placeId="5268331031" universeId="1845192636" />
