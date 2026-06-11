---
title: Create player hazards
description: Explains how to create player hazards by modifying player behavior and creating a player life cycle.
next: /tutorials/curriculums/core/scripting/script-an-upgrade-button
prev: /tutorials/curriculums/core/scripting/record-and-display-player-data
---

<iframe width="880" height="495"
src="https://www.youtube-nocookie.com/embed/vlzZm3PQGfQ"
title="YouTube video player" frameborder="0" allow="accelerometer; autoplay;
clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
allowFullScreen></iframe>

<br/>

Right now, players can fall off any platform with no consequence. This section walks you through creating a large invisible hazard at the same height as the water in your game. When a player falls into the hazard, their health is reduced to zero and they respawn at the start of the game.

## Create a basic water hazard

<Tabs>
<TabItem key = "1" label="Build with Assistant">

```text title="Create a basic water hazard"
In Workspace > World, create a new folder named Hazards.
Inside the Hazards folder, create a block Part named Hazard with Size 825, 1, 576 and CFrame.Position 174, -6.5, 38 so the part covers the water around the island and platforms.
Set Transparency to 1 so the part is invisible and the actual water appears to be the hazard, disable CanCollide so players fall through it into the water, and enable Anchored so physics doesn't move it.
```

</TabItem>
<TabItem key = "2" label="Build it Yourself">

1. In the **Explorer**, hover over the **World** model, click **&CirclePlus;**, and insert a new **Folder**. Rename it `Hazards`.
2. Inside the `Hazards` folder, insert a **block** part and rename it `Hazard`. Use the **Move** and **Scale** tools to flatten and stretch the part so it covers the water around the island and platforms. The sample uses **Size** = `825, 1, 576` and **CFrame.Position** = `174, -6.5, 38`.

   <img src="../../../../assets/tutorials/create-player-hazards/Hazard-Part-On-Water.jpg" alt="A far out view of all of the cylinder sea stacks and the island. A large block part covers the water where a player could land if they fell from a sea stack." width="600" />

3. With the part still selected, in the **Properties** window:

   1. Set **Transparency** to `1` so the part is invisible — the actual water below is what the player sees as the hazard.
   2. Disable **CanCollide** so players fall through the part and into the water instead of standing on the part.
   3. Enable **Anchored** so physics doesn't push the part around.

</TabItem>
</Tabs>

## Detect when players touch the hazard

The hazard doesn't do anything until you write a script that listens `Touched` and lowers the player's health to zero.

<Tabs>
<TabItem key = "1" label="Build with Assistant">

````text title="Create HazardService"
In ServerScriptService, create a Script named HazardService with the following code:

```lua
local Players = game:GetService("Players")
local Workspace = game:GetService("Workspace")

local hazardsFolder = Workspace.World.Hazards
local hazards = hazardsFolder:GetChildren()

local function onHazardTouched(otherPart)
	local character = otherPart.Parent
	local player = Players:GetPlayerFromCharacter(character)
	if player then
		local humanoid = character:FindFirstChildWhichIsA("Humanoid")
		if humanoid then
			humanoid.Health = 0
		end
	end
end

for _, hazard in hazards do
	hazard.Touched:Connect(onHazardTouched)
end
```
````

</TabItem>
<TabItem key = "2" label="Build it Yourself">

1. In the **Explorer**, hover over **ServerScriptService**, click **&CirclePlus;**, and insert a new **Script**. Rename it `HazardService`. Put it in `ServerScriptService` to keep the code on the server, where players can't read or make changes to it.
1. Replace the default code with the following code to loop through every part in the `Hazards` folder and set the player's health to zero when they touch the hazard:

```lua
local Players = game:GetService("Players")
local Workspace = game:GetService("Workspace")

local hazardsFolder = Workspace.World.Hazards
local hazards = hazardsFolder:GetChildren()

local function onHazardTouched(otherPart)
	local character = otherPart.Parent
	local player = Players:GetPlayerFromCharacter(character)
	if player then
		local humanoid = character:FindFirstChildWhichIsA("Humanoid")
		if humanoid then
			humanoid.Health = 0
		end
	end
end

for _, hazard in hazards do
	hazard.Touched:Connect(onHazardTouched)
end
```

</TabItem>
</Tabs>

<BaseAccordion>
<AccordionSummary>
  <Typography variant="h4">Code explanation</Typography>
</AccordionSummary>
<AccordionDetails>
  The **HazardService** has many similarities to **CoinService**. However,
  instead of collecting a coin, the player has their **health set to 0**
  when they touch a hazard.

Feel free to modify, add, or remove hazard objects in your game to
create unique obstacles. As long as they are contained in the **Hazards**
folder, the code loop connects the event handler to all of your hazards.
</AccordionDetails>
</BaseAccordion>

## Connect to the player lifecycle

The player lifecycle represents events that occur when players interact in your game, such as joining, leaving, or respawning. You need to connect handlers to these events to execute logic for each major lifecycle event.

<Tabs>
<TabItem key = "1" label="Build with Assistant">

````text title="Add lifecycle handlers to CoinService"
In ServerScriptService, append the following code to the bottom of the existing CoinService Script (don't replace any of the existing code — add this after it):

```lua
local function onPlayerAdded(player)
	-- Reset player coins to 0
	updatePlayerCoins(player, function(_)
		return 0
	end)

	player.CharacterAdded:Connect(function(character)
		-- WaitForChild would stop the player loop, so below should be done in a separate thread
		task.spawn(function()
			-- When a player dies
			character:WaitForChild("Humanoid").Died:Connect(function()
				-- Reset player coins to 0
				updatePlayerCoins(player, function(_)
					return 0
				end)
			end)
		end)
	end)
end

-- Initialize any players added before connecting to PlayerAdded event
for _, player in Players:GetPlayers() do
	onPlayerAdded(player)
end

local function onPlayerRemoved(player)
	updatePlayerCoins(player, function(_)
		return nil
	end)
end

Players.PlayerAdded:Connect(onPlayerAdded)
Players.PlayerRemoving:Connect(onPlayerRemoved)
```
````

</TabItem>
<TabItem key = "2" label="Build it Yourself">
1. In the **Explorer**, open the `CoinService` script inside **ServerScriptService**.
1. Scroll to the bottom of the file (don't replace the existing coin-collection code) and add the following lifecycle handlers to reset a player's coin count when they join the game and when they die:

```lua
local function onPlayerAdded(player)
	-- Reset player coins to 0
	updatePlayerCoins(player, function(_)
		return 0
	end)

	player.CharacterAdded:Connect(function(character)
		-- WaitForChild would stop the player loop, so below should be done in a separate thread
		task.spawn(function()
			-- When a player dies
			character:WaitForChild("Humanoid").Died:Connect(function()
				-- Reset player coins to 0
				updatePlayerCoins(player, function(_)
					return 0
				end)
			end)
		end)
	end)
end

-- Initialize any players added before connecting to PlayerAdded event
for _, player in Players:GetPlayers() do
	onPlayerAdded(player)
end

local function onPlayerRemoved(player)
	updatePlayerCoins(player, function(_)
		return nil
	end)
end

Players.PlayerAdded:Connect(onPlayerAdded)
Players.PlayerRemoving:Connect(onPlayerRemoved)
```

</TabItem>
</Tabs>

<BaseAccordion>
<AccordionSummary>
  <Typography variant="h4">Code explanation</Typography>
</AccordionSummary>
<AccordionDetails>

The code defines functions to reset coin counts during the appropriate
lifecycle events:

- `Class.Players.PlayerAdded` fires when a player joins the game, and sets
  the coin count to `0`.
- `Class.Player.CharacterAdded` fires when a player's character model is added
  to the world. It occurs after `Class.Players.PlayerAdded|PlayerAdded` and
  whenever the player respawns.
- `Class.Humanoid.Died` fires when a player dies, and sets
  the coin count to `0`. `Library.task.spawn()` creates
  a separate thread for handling this, so other aspects of the player life cycle
  can execute.
- `Class.Player.PlayerRemoved` fires when a player leaves the game to
  clean up player state.
- This code contains a potential issue where players could collect coins before the `Players.PlayerAdded` event executes and then have their coin counts reset to zero. To mitigate this issue, consider solutions such as code scheduling or freezing the player's character until initialization finishes. However, these solutions involve more complex scripting concepts that are beyond the scope of this tutorial.

</AccordionDetails>
</BaseAccordion>

## Playtest

Select **Test** from the dropdown and click **Play**. Collect a few coins, then jump into the water. You character should die and respawn at the start, with their coin count reset to `0`.

<video controls loop muted>
<source src="../../../../assets/tutorials/create-player-hazards/player-hazards-example.mp4" />
</video>
