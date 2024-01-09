---
title: Installation and Setup
description: Explains the installation and setup details for the Battle Royale game kit.
prev: /resources/battle-royale
next: /resources/battle-royale/running-the-game
---

To setup the Battle Royale experience, you must download [Studio](../../studio/setting-up-roblox-studio.md) and the project [reference files](#reference-files).

Additional configuration of the [place IDs](#copy-and-paste-place-ids), [server](#adjust-server-fill), and [publishing](#publish-additional-places) settings are also required before continuing on to [running the game](../../resources/battle-royale/running-the-game.md).

## Reference Files

[RobloxBattleRoyale.zip](../../assets/resources/battle-royale/installation-and-setup/RobloxBattleRoyale.zip) consists of easily accessible `.rbxl` files which you can open in Roblox Studio and experiment with immediately.

<table>
<thead>
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Lobby.rbxl</td>
    <td>Entrance lobby where players choose the game mode.</td>
  </tr>
  <tr>
    <td>Gameplay.rbxl</td>
    <td>Where the battle match takes place.</td>
  </tr>
  <tr>
    <td>Queue.rbxl</td>
    <td>Queue place where players gather before being teleported to battle map.</td>
  </tr>
</tbody>
</table>

## Create a New Game

Roblox Battle Royale must be structured as a game with six unique places. To begin:

1. Open `Lobby.rbxl` in Roblox Studio.

   <img
   alt="Lobby View."
   src="../../assets/resources/battle-royale/installation-and-setup/Battle-Royale-Lobby-View.jpeg"
   width="80%" />

2. Select **File** → **Publish As…** to open the publishing window.
3. Near the bottom of the window, click **Create new game…**.

   <img
   alt="Publish Window - Create New."
   src="../../assets/resources/battle-royale/installation-and-setup/Publish-Window-Create-New-Game.png"
   width="80%" />

4. Type in **Lobby** for the place name.

   <img
   alt="Set Lobby Name"
   src="../../assets/resources/battle-royale/installation-and-setup/Battle-Royale-Lobby-Set-Name.png"
   width="80%" />

5. For the **Creator** field, select "Me" to publish the place to your personal account, or select a group.
6. When ready, click the **Create** button.

## Add Additional Places

Once the lobby place is published, you'll need to add **five additional places** to the game:

1. If it's not already visible, open the **Asset Manager** window (View → Asset Manager).

   <img
   alt="Toggle Game Explorer"
   src="../../assets/resources/battle-royale/installation-and-setup/Toggle-Game-Explorer.png"
   width="80%" />

2. Double-click the **Places** folder.

   <img
   alt="Select Places"
   src="../../assets/resources/battle-royale/installation-and-setup/Battle-Royale-AM-Select-Places-1.png"
   width="80%" />

3. Right-click in any empty region of the window (not over a place name/tile) and select **Add New Place**. Repeat this a total of five times so that you have six places.
4. Right-click each of the **new** places, select **Rename**, and name them as follows:

   <img
   alt="Battle royale Place Names"
   src="../../assets/resources/battle-royale/installation-and-setup/Battle-Royale-Place-Names.png"
   width="80%" />

5. Publish the game again (File → Publish to Roblox).

## Copy and Paste Place IDs

Each place must be cross-associated so that players can teleport from the lobby to various play mode queues and vice-versa. To achieve this, you'll need to gather the place IDs of the places you created above.

1. In the Asset Manager window, right-click **Lobby** and select **Copy ID to Clipboard**.

   <img
   alt="Copy Lobby ID"
   src="../../assets/resources/battle-royale/installation-and-setup/Battle-Royale-Lobby-Copy-ID.png"
   width="80%" />

2. If it's not already visible, open the **Explorer** window (**View** → **Explorer**).
3. Open the **MainConfiguration** script within **ReplicatedFirst** → **Configurations**.

   <img
   alt="MainConfiguration Script"
   src="../../assets/resources/battle-royale/installation-and-setup/Battle-Royale-Place-MainConfiguration.png"
   width="80%" />

4. Locate the `_places` table and paste the copied ID from step #1 as the value of the `lobby` key.

   ```lua title='Lobby-MainConfiguration'
   local ReplicatedStorage = game:GetService("ReplicatedStorage")
   local RunService = game:GetService("RunService")
   local Players = game:GetService("Players")


   local isServer = RunService:IsServer()
   local ConfigEvent = nil

   local _placeOverrides = {}
   local _overrides = {}

   ---

   -- List of named places in the game
   local _places = {
    lobby = 0123456789,
    gameplay_development = 0,
    queue_default = 0,
    queue_deathmatch = 0,
    queue_teamDeathmatch = 0,
    queue_freePlay = 0
   }

   ---
   ```

5. Repeat the **Copy ID to Clipboard** process for the other five places and paste them into the associated `_places` table key value.

    <table>
   <thead>
     <tr>
       <th>Place</th>
       <th>Table Key</th>
     </tr>
   </thead>
   <tbody>
     <tr>
       <td>Lobby</td>
       <td>lobby</td>
     </tr>
     <tr>
       <td>Gameplay</td>
       <td>gameplay_development</td>
     </tr>
     <tr>
       <td>Queue (Default)</td>
       <td>queue_default</td>
     </tr>
     <tr>
       <td>Queue (Deathmatch)</td>
       <td>queue_deathmatch</td>
     </tr>
     <tr>
       <td>Queue (Team Deathmatch)</td>
       <td>queue_teamDeathmatch</td>
     </tr>
     <tr>
       <td>Queue (Free Play)</td>
       <td>queue_freePlay</td>
     </tr>
   </tbody>
   </table>

   ```lua
   -- List of named places in the game
   local _places = {
    lobby = 0123456789,
    gameplay_development = 0987654321,
    queue_default = 0123459876,
    queue_deathmatch = 0987651234,
    queue_teamDeathmatch = 0132457689,
    queue_freePlay = 0678912345
   }
   ```

6. Publish the game again (**File** → **Publish to Roblox**).

## Adjust Server Fill

By default, Roblox balances players/servers for an optimal social gameplay experience, but a battle royale should allow for bigger and more intense battles. To achieve this:

1. Click on the **Game Settings** button from the **Home** tab.

   <img
   alt="Game Settings"
   src="../../assets/resources/battle-royale/installation-and-setup/Game-Settings.png"
   width="80%" />

2. Select the **Places** tab.
3. For each of the six places, click the button and select **Edit**.

   <img
   alt="Edit Place Settings"
   src="../../assets/resources/battle-royale/installation-and-setup/Battle-Royale-Edit-Place.png"
   width="80%" />

4. For **Server Fill**, select **Maximum**.

   <img
   alt="Set Server Fill to Maximum."
   src="../../assets/resources/battle-royale/installation-and-setup/Place-Server-Fill-Maximum.png"
   width="80%" />

5. Click **Save** at the bottom of the window.

## Publish Additional Places

Now you'll need to open the remaining `.rbxl` files from the downloaded bundle, modify their `_places` tables, and publish them.

### Copy Places Table

1. Refer to the `_places` table in the lobby's **MainConfiguration** script:

```lua
--------------------------------------
-- List of named places in the game
local _places = {
	lobby = 0123456789,
	gameplay_development = 0987654321,
	queue_default = 0123459876,
	queue_deathmatch = 0987651234,
	queue_teamDeathmatch = 0132457689,
	queue_freePlay = 0678912345
}
--------------------------------------
```

1. Select the **entire table** and copy it to the clipboard with <kbd>Ctrl</kbd><kbd>C</kbd> (<kbd>⌘</kbd><kbd>C</kbd> on Mac).
2. Close the lobby place by clicking the X in its tab.

   <img
   alt="Close Lobby Tab."
   src="../../assets/resources/battle-royale/installation-and-setup/Battle-Royale-Lobby-Close.png"
   width="80%" />

### Replace Tables

1. Open the `Gameplay.rbxl` file.
2. Open its **MainConfiguration** script within **ReplicatedFirst** → **Configurations**.

   <img
   alt="MainConfiguration Script"
   src="../../assets/resources/battle-royale/installation-and-setup//Battle-Royale-Place-MainConfiguration.png"
   width="80%" />

3. Paste the `_places` table you copied above over the existing `_places` table (<kbd>Ctrl</kbd><kbd>V</kbd>; <kbd>⌘</kbd><kbd>V</kbd>) so that each place's tables are identical.

   ```lua
   --------------------------------------
   -- List of named places in the game
   local _places = {
    lobby = 0123456789,
    gameplay_development = 0987654321,
    queue_default = 0123459876,
    queue_deathmatch = 0987651234,
    queue_teamDeathmatch = 0132457689,
    queue_freePlay = 0678912345
   }
   --------------------------------------
   ```

4. Select **File** → **Publish As…** to open the publishing window.
5. Near the bottom of the window, click **Update existing game…**.

   <img
   alt="Update Existing Game."
   src="../../assets/resources/battle-royale/installation-and-setup/Publish-Update-Existing.png"
   width="80%" />

6. Locate and click the **Lobby** place that you published earlier.
7. On the next screen, you should see a list of the places you added earlier. From the list, select the **Gameplay** place and click the **Overwrite** button.

   <img
   alt="Overwrite Existing Place"
   src="../../assets/resources/battle-royale/installation-and-setup/Battle-Royale-Place-Overwrite.png"
   width="80%" />

8. Once the place is published, close it by clicking the X in its tab.

   <img
   alt="Close the place tab."
   src="../../assets/resources/battle-royale/installation-and-setup/Battle-Royale-Gameplay-Close.png"
   width="80%" />

9. Open the `Queue.rbxl` file and repeat this process, using **File** → **Publish As…** to publish it to all four queue places. Essentially, `Queue.rbxl` should be published to the **Queue (Default)**, **Queue (Deathmatch)**, **Queue (Team Deathmatch)**, and **Queue (Free Play)** slots.

   <table>
   <thead>
   <tr>
     <th>File</th>
     <th>Publish Slot</th>
   </tr>
   </thead>
   <tbody>
   <tr>
     <td>Lobby.rbxl</td>
     <td>Lobby</td>
   </tr>
   <tr>
     <td>Gameplay.rbxl</td>
     <td>Gameplay</td>
   </tr>
   <tr>
     <td>Queue.rbxl</td>
     <td>Queue (Default)</td>
   </tr>
   <tr>
     <td>Queue.rbxl</td>
     <td>Queue (Deathmatch)</td>
   </tr>
   <tr>
     <td>Queue.rbxl</td>
     <td>Queue (Team Deathmatch)</td>
   </tr>
   <tr>
     <td>Queue.rbxl</td>
     <td>Queue (Free Play)</td>
   </tr>
   </tbody>
   </table>
