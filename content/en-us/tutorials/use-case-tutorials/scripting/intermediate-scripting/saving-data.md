---
title: Saving Data
description: The process for creating a basic data store to save, store, and read data back.
next: /tutorials/scripting/intermediate-scripting/creating-player-tools
prev: /tutorials/scripting/intermediate-scripting/creating-a-health-pickup
---

Games often need to store some amount of **persistent data** between sessions like a player's level, experience points, inventory items, gold/cash, and more.

This tutorial will show you how to create a basic **data store**, save sample data, and read the data back into a game session.

## Enabling Studio Access

By default, games tested in Studio cannot access data stores, so you must first enable them.

1. Make sure your game is **published** (File > Publish to Roblox) to enable Studio access.

2. From the **Home** tab, open the **Game Settings** window.

   <img src="../../../../assets/tutorials/shared/interface/Game-Settings.png" width="300" />

3. In the **Security** section, turn on **Enable Studio Access to API Services**.

   ![alt](../../../../assets/tutorials/intro-to-saving-data/Game-Settings-Security-Enable-API-Services.png)

4. Click **Save** to register your changes.

## Creating a Data Store

Data stores are identified by a unique **name**. In this example, a data store named **PlayerGold** will save each player's gold to persistent storage.

1. Create a new `Class.Script` within `Class.ServerScriptService` called **GoldManager**.

   <img src="../../../../assets/tutorials/intro-to-saving-data/ServerScriptService-GoldManager.png" width="320" />

2. Data stores are managed by `Class.DataStoreService`, so get the service on the first line.

   ```lua
   local DataStoreService = game:GetService("DataStoreService")
   ```

3. Call `Class.DataStoreService:GetDataStore()` with the string `"PlayerGold"`. This will access the **PlayerGold** data store if it already exists, or create it otherwise.

   ```lua
   local DataStoreService = game:GetService("DataStoreService")
   local goldStore = DataStoreService:GetDataStore("PlayerGold")
   ```

## Saving the Data

A data store is essentially a dictionary, like a Lua table. Each value in the data store is indexed by a unique **key**, for instance the player's unique `Class.Player.UserId|UserId` or simply a named string for a game promo.

### Player Data Example

<table>
    <thead>
        <tr>
            <th>Key</th>
            <th>Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
    <td>
        31250608
    </td>
    <td>
        50
    </td>
    </tr>
    <tr>
    <td>
        351675979
    </td>
    <td>
        20
    </td>
    </tr>
    <tr>
    <td>
        505306092
    </td>
    <td>
        78000
    </td>
    </tr>
    </tbody>
</table>

### Promo Examples

<table>
  <thead>
      <tr>
          <th>Key</th>
          <th>Value</th>
      </tr>
  </thead>
  <tbody>
      <tr>
  <td>
      ActiveSpecialEvent
  </td>
  <td>
      SummerParty2
  </td>
  </tr>
  <tr>
  <td>
      ActivePromoCode
  </td>
  <td>
      BONUS123
  </td>
  </tr>
  <tr>
  <td>
      CanAccessPartyPlace
  </td>
  <td>
      true
  </td>
  </tr>
  </tbody>
</table>

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
   local setSuccess, errorMessage = pcall(function()
   	goldStore:SetAsync(playerUserID, playerGold)
   end)
   if not setSuccess then
   	warn(errorMessage)
   end
   ```

Functions like `Class.GlobalDataStore:SetAsync()|SetAsync()` are network calls that may occasionally fail. As shown above, `Global.LuaGlobals.pcall()` is used to detect and handle when such failures occur.

In its most basic form, `Global.LuaGlobals.pcall()` accepts a function and returns two values:

- The status (`boolean`); this will be true if the function executed without errors, or false otherwise.
- The return value of the function or an error message.

In the sample above, the status (`setSuccess`) is tested on line 12 and, if `Class.GlobalDataStore:SetAsync()|SetAsync()` failed for any reason, `errorMessage` is displayed in the Output window.

<Alert severity="warning">

Be careful to not send requests to data stores too often. Requests on a data store key are placed in a queue and, if the queue fills up, additional requests will be [dropped](../../../../cloud-services/data-stores/index.md#error-codes).

A common mistake may be updating a player's gold data every time they collect a gold piece. Instead, store the player's gold in a variable and only update the data store occasionally, such as with a periodic auto-save and/or when the player leaves the game.

</Alert>

## Reading Data

1. To read data from a data store, call `Class.GlobalDataStore:GetAsync()|GetAsync()` with the desired key name.

   ```lua
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

2. To test the script, click **Run** and notice the `currentGold` value printed to the **Output** window. Note that it may take a couple seconds, as the functions must connect to data store servers.

   ![alt](../../../../assets/tutorials/intro-to-saving-data/DataStoreTest-Output.png)

## Sample Project

Now that you understand basic data store usage, test it out in a sample game.

<Grid container spacing={4}>
    <Grid item xs={6}>
        <img src="../../../assets/tutorials/intro-to-saving-data/Sample-Place-Gold-Rush.jpg" />
    </Grid>
    <Grid item xs={6}>
        [Gold Rush](https://www.roblox.com/games/5268331031/Gold-Rush)<br />
        Gather as many gold chunks as you can to set a personal record that will persist between game sessions.
    </Grid>
</Grid>

You can also edit the game in Studio and explore the enhanced **GoldManager** script which includes data auto-saving and more.

<img src="../../../../assets/tutorials/intro-to-saving-data/Gold-Rush-Edit-Place.png" width="780" alt="Edit in Studio option from the experience's main page" />

<img src="../../../../assets/tutorials/intro-to-saving-data/Gold-Rush-GoldManager.png" width="320" />
