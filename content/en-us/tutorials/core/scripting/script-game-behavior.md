---
title: Create a Coin Collection Mechanic
description: Explains how to implement event-driven logic in an experience.
next: /tutorials/core/scripting/record-and-display-player-data
prev: /tutorials/core/building/greybox-a-playable-area
---

<iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/pg6nWVARoDM?si=93UpoO1ll2dZDhzO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<br/>

Now that you have a 3D world, this section of the tutorial teaches you how to add your
first script to define a coin collecting mechanic. This mechanic allows players to collect
coins, and disables the collection of a coin if it's been recently collected.

## Create the Coins

Before you can script anything, you need to have placeholder objects in the world to use as
your coins. Like the sea stack platforms you made in the previous section, the coins can be
simple `Class.Part` objects.

To create the coins:

1. In the **Explorer** window, add a new folder into the **World** folder, then rename it **Coins**.
1. Insert a **cylinder** part into the **Coins** folder, then rename the part to **Coin**.

   <img src="../../../assets/tutorials/script-game-behavior/New-Single-Coin.png" width="320"  />

1. Select the part, then in the **Properties** window,

   - Set **BrickColor** to **Gold**.
   - Set **Material** to **Metal**.
   - Set **Size** to **0.6, 8, 4**.
   - Disable **CanCollide**. This tells the engine that other parts can pass through the coin, meaning players
     can walk through the coins in order to collect them.
   - Enable **Anchored**. This tells the engine to never change the position of the coin due to any physics-related
     simulation, meaning players can touch the coin without affecting its location.

   <img src="../../../assets/tutorials/script-game-behavior/Single-Coin-In-Viewport.jpg" width="600" />

1. Duplicate a few more coins and position them around the map for testing purposes.

   <img src="../../../assets/tutorials/script-game-behavior/Duplicated-Coins.png" width="320" />

   <img
   src="../../../assets/tutorials/script-game-behavior/Multiple-Coins-In-Level.jpg"
   />

Your cylinder parts now look like coins and prevent physics simulation, but you need to add
logic to the coins so players can collect them.

## Create the Script

To have the coins be collectable, you want to react to players touching them.
The Roblox engine can notify you when something touches a coin, but you need to
declare that in a script. To create a script:

1. In the **Explorer** window, hover over **ServerScriptService** and click the
   **&CirclePlus;** button. A contextual menu displays.
1. From the contextual menu, select **Script**. A new script displays under **ServerScriptService**,
which tells the engine to run the script on the server, and prevents clients from accessing the code.

   <img src="../../../assets/tutorials/script-game-behavior/Insert-Script.png" width="320" />

1. Rename the script to **CoinService**.

   <img src="../../../assets/tutorials/script-game-behavior/Rename-New-Script.png" width="320" />

1. Replace the default code with the following code:

   ```lua
   -- Initializing services and variables
   local Workspace = game:GetService("Workspace")
   local Players = game:GetService("Players")

   local coinsFolder = Workspace.World.Coins
   local coins = coinsFolder:GetChildren()

   local COOLDOWN = 10

     -- Defining the event handler
   local function onCoinTouched(otherPart, coin)
   	if coin:GetAttribute("Enabled") then
   		local character = otherPart.Parent
   		local player = Players:GetPlayerFromCharacter(character)
   		if player then
   			-- Player touched a coin
   			coin.Transparency = 1
   			coin:SetAttribute("Enabled", false)
   			print("Player collected coin")
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

   Now, whenever a player touches a coin, the coin disappears for 10 seconds,
   and the output log prints `Player collected coin`.

   <BaseAccordion>
   <AccordionSummary>

   <Typography variant="h4">Code Explanation</Typography>
   </AccordionSummary>
   <AccordionDetails>

   The following sections describe how the script works in more detail.

   <h4>Initializing Services and Variables</h4>

   Like with a lot of the code you've probably written in other languages, you
   define variables that you need later at the top of the script. Our code does
   the following:

   - **Obtain service instances** - Roblox services provide built-in
     functionality for common features. The script first obtains instances of the
     `Class.Workspace` service, which contains every object in the 3D world, and
     the `Class.Player` service, which manages and contains all players connected
     to your experience.
   - **Obtain references to all coins** - The script then queries the 3D
     workspace for all references to coin objects with the
     `Class.Instance:GetChildren()|GetChildren()` method. This method returns an
     array containing everything parented to the object it's associated with,
     which in this case is the `Workspace.World.Coins` folder you created
     previously.
   - **Defines a global variable** - The `COOLDOWN` variable is used later to
     define how long to disable a coin after it's collected.

     ```lua title="Initializing Services and Variables"
     local Workspace = game:GetService("Workspace")
     local Players = game:GetService("Players")

     local coinsFolder = Workspace.World.Coins
     local coins = coinsFolder:GetChildren()

     local COOLDOWN = 10
     ...
     ```

   <h4>Defining the Event Handler</h4>

   The Roblox engine physically simulates the 3D world and handles a lot of the
   logic to handle events related to rendering, physics, and networking. When
   you're interested in scripting your own logic during some of these events,
   you can listen for and handle them, while letting the engine do the rest. In
   this case, you listen for and handle events related to coins being touched.
   The script defines the logic for handling this event in the `onCoinTouched()`
   method, which does the following:

   - **Detects whether the coin is enabled** - Every `Class.Instance` has an
     `Enabled` boolean attribute that defines whether or not the object exists in
     the 3D world. You can get instance attributes with the
     `Class.Instance:GetAttribute()|GetAttribute()` method.
   - **Detects whether a player touched the coin** - If a coin is enabled, the
     method uses the player service to check if the object that touched the coin
     was indeed a player. When a touch event occurs, the Roblox engine passes the
     object that touched the coin as an `otherPart` parameter. The script checks to
     see if the parent of `otherPart` belongs to a player.
   - **Disables the coin if a player touched it, and re-enables it after 10
     seconds** - Finally, if a player touched the coin, the method disables the
     coin, waits for 10 seconds, and then re-enables the coin for collection.
     `Library.task.wait()` is used instead of `wait()` because it provides better
     performance by not pausing code execution entirely, allowing tasks in other
     threads to run concurrently.

     ```lua title="Defining the Event Handler"
     local function onCoinTouched(otherPart, coin)
        if coin:GetAttribute("Enabled") then
           local character = otherPart.Parent
           local player = Players:GetPlayerFromCharacter(character)
           if player then
              -- Player touched a coin
              coin.Transparency = 1
              coin:SetAttribute("Enabled", false)
              print("Player collected coin")
              task.wait(COOLDOWN)
              coin.Transparency = 0
              coin:SetAttribute("Enabled", true)
           end
        end
     end
     ```

   <h4>Connecting the Event Handler</h4>

   All simulated 3D objects inherit from `Class.BasePart` and therefore have a
   `Class.BasePart.Touched|Touched()` event. The following loop connects the
   `onTouchedEvent()` handler to every coin's touch event by doing the
   following:

   - **Loop through all the coins** - Loop through each of the coins using general iteration.
   - **Connect the handler to the event** - In each iteration of the loop, the
     coin is enabled by default, so it's visible in the 3D world during the
     initial start of the experience. The `onCoinTouched()` handler method is also
     connected to the `Touched` event of the coin so that it runs every time the
     event occurs. When the engine detects a touch, it also passes in the
     object that touched the object, `otherPart`.

     ```lua title="Connecting the Event Handler"
     for _, coin in coins do
        coin:SetAttribute("Enabled", true)
        coin.Touched:Connect(function(otherPart)
           onCoinTouched(otherPart, coin)
        end)
     end
     ```

   </AccordionDetails>
   </BaseAccordion>

## Playtest the Mechanic

It's time to see if the coin collection mechanic works as intended. To playtest
your experience:

1. In the menu bar, click the **Play** button. Studio enters playtest mode.

   <img src="../../../assets/studio/general/Quick-Access-Toolbar-Play.png"
   width="800" />

1. Move your character to touch a coin. If your scripts are working correctly, the
   **Output** window displays `Player collected coin`, and the coin disappears for 10 seconds
   before re-appearing.

   <img src="../../../assets/tutorials/script-game-behavior/Output-Collect-Coin.png" width="700" />

   <Alert severity="info"> If you can't see the **Output** window, navigate to the **View** tab, then
   select **Output**. </Alert>

   <video controls loop muted>
   <source src="../../../assets/tutorials/script-game-behavior/script-game-behavior-coin-collection.mp4" />
   </video>
