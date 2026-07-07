---
title: Create a coin collection mechanic
description: Explains how to implement event-driven logic in a game.
next: /tutorials/curriculums/core/scripting/record-and-display-player-data
prev: /tutorials/curriculums/core/building/greybox-a-playable-area
---

<iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/pg6nWVARoDM?si=93UpoO1ll2dZDhzO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

<br/>

Now that you have a 3D world, it's time to add your first script. In this section, you'll create a coin collection mechanic that lets players collect coins and temporarily disables coins after they've been collected.

## Create the coins

Before you can script anything, you need to have placeholder objects in the world to use as your coins. Like the sea stack platforms you made in the previous section, the coins can be simple `Class.Part` objects.

<Tabs>
<TabItem key = "1" label="Build with Assistant">

```text title="Create the coins"
In Workspace > World, create a new folder named Coins. 
Inside the Coins folder, create a cylinder Part named Coin with BrickColor set to Gold, Material set to Metal, Size 0.6, 8, 4, and Orientation 90, 0, 0. 
Disable CanCollide and enable Anchored. 
Then duplicate the Coin part several times and scatter the duplicates around the island and on the platforms so they're reachable from the sea stack levels. 
Keep each duplicate named Coin.
```

</TabItem>
<TabItem key = "2" label="Build it Yourself">

1. In the **Explorer**, insert a new folder inside the existing **World** folder and rename it **Coins**. Grouping all coins in a single folder makes it easier for scripts to find and manage them.
2. Inside the **Coins** folder, insert a **cylinder** part and rename it **Coin**. With the part selected, configure the following properties in the **Properties** window:

   1. Set **BrickColor** to `Gold`.
   2. Set **Material** to `Metal`.
   3. Set **Size** to `0.6, 8, 4`.
   4. Set **Orientation** to `90, 0, 0` so the coin lies flat like a disc.
   5. Disable **CanCollide** so players can walk through the coin to collect it.
   6. Enable **Anchored** so physics doesn't push the coin around.

   <img src="../../../../assets/tutorials/script-game-behavior/Single-Coin-In-Viewport.jpg" alt="A close up view of a gold coin next to two gray cylinder sea stacks on the island." width="600" />

3. Duplicate the coin a few times and scatter the copies around the island and on the platforms so you have somewhere to test pickups. Make sure each duplicate is also named `Coin`.

   <img src="../../../../assets/tutorials/script-game-behavior/Multiple-Coins-In-Level.jpg" alt="A view of multiple coins on the island and two gray cylinder sea stacks." />

</TabItem>
</Tabs>

## Create the script

Next, you'll make the coins respond to players. The Roblox engine can detect when something touches a coin, but you need to use a script to define how the coin should react.

<Tabs>
<TabItem key = "1" label="Build with Assistant">

````text title="Create CoinService"
In ServerScriptService, create a Script named CoinService with the following code:

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
````

</TabItem>
<TabItem key = "2" label="Build it Yourself">

1. In the **Explorer**, insert a new **Script** inside **ServerScriptService** and rename it **CoinService**. Placing the script in **ServerScriptService** ensures it runs on the server and can't be accessed by clients.
2. Replace the default code with the following script, which retrieves every coin in the **Coins** folder, connects a `Touched` handler to each one, and uses an `Enabled` attribute to track whether a coin can currently be collected:

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

</TabItem>
</Tabs>

Now, whenever a player touches a coin, the coin disappears for 10 seconds, and the output log prints `Player collected coin`.

<BaseAccordion>
<AccordionSummary>

<Typography variant="h4">Code explanation</Typography>
</AccordionSummary>
<AccordionDetails>

The following sections describe how the script works in more detail.

<h4>Initialize services and variables</h4>

Like with a lot of the code you've probably written in other languages, you define variables that you need later at the top of the script. Our code does the following:

- **Obtain service instances** - Roblox services provide built-in functionality for common features. The script first obtains instances of the `Class.Workspace` service, which contains every object in the 3D world, and the `Class.Player` service, which manages and contains all players connected to your game.
- **Obtain references to all coins** - The script then queries the 3D workspace for all references to coin objects with the `Class.Instance:GetChildren()|GetChildren()` method. This method returns an array containing everything parented to the object it's associated with, which in this case is the `Workspace.World.Coins` folder you created previously.
- **Defines a global variable** - The `COOLDOWN` variable is used later to define how long to disable a coin after it's collected.

```lua title="Initializing Services and Variables"
   local Workspace = game:GetService("Workspace")
   local Players = game:GetService("Players")

   local coinsFolder = Workspace.World.Coins
   local coins = coinsFolder:GetChildren()

   local COOLDOWN = 10
   ...
```

<h4>Define the event handler</h4>

The Roblox Engine physically simulates the 3D world and handles a lot of the logic to handle events related to rendering, physics, and networking. When you're interested in scripting your own logic during some of these events, you can listen for and handle them, while letting the engine do the rest. In this case, you listen for and handle events related to coins being touched. The script defines the logic for handling this event in the `onCoinTouched()` method, which does the following:

- **Detects whether the coin is enabled** - Every `Class.Instance` has an `Enabled` boolean attribute that defines whether or not the object exists in the 3D world. You can get instance attributes with the `Class.Instance:GetAttribute()|GetAttribute()` method.
- **Detects whether a player touched the coin** - If a coin is enabled, the method uses the player service to check if the object that touched the coin was indeed a player. When a touch event occurs, the Roblox Engine passes the object that touched the coin as an `otherPart` parameter. The script checks to see if the parent of `otherPart` belongs to a player.
- **Disables the coin if a player touched it, and re-enables it after 10 seconds** - Finally, if a player touched the coin, the method disables the coin, waits for 10 seconds, and then re-enables the coin for collection. `Library.task.wait()` is used instead of `wait()` because it provides better performance by not pausing code execution entirely, allowing tasks in other threads to run concurrently.

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

<h4>Connect the event handler</h4>

All simulated 3D objects inherit from `Class.BasePart` and therefore have a `Class.BasePart.Touched|Touched()` event. The following loop connects the `onTouchedEvent()` handler to every coin's touch event by doing the following:

- **Loop through all the coins** - Loop through each of the coins using general iteration.
- **Connect the handler to the event** - In each iteration of the loop, the coin is enabled by default, so it's visible in the 3D world during the initial start of the game. The `onCoinTouched()` handler method is also connected to the `Touched` event of the coin so that it runs every time the event occurs. When the engine detects a touch, it also passes in the object that touched the object, `otherPart`.

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

## Playtest the mechanic

Select **Test** from the dropdown and click **Play**. Move your character to touch a coin. If everything is working, the coin disappears, the [Output](../../../../studio/output.md) window prints `Player collected coin`, and the coin reappears 10 seconds later.

<img src="../../../../assets/tutorials/script-game-behavior/Output-Collect-Coin.png" alt="Studio's Output window that displays confirmation that the player collected a coin." width="700" />

<video controls loop muted>
<source src="../../../../assets/tutorials/script-game-behavior/script-game-behavior-coin-collection.mp4" />
</video>
