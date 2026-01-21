---
title: Create a health pickup
description: The process for creating a pickup that restores health.
next: /tutorials/use-case-tutorials/scripting/intermediate-scripting/save-data
---

Throughout the Basic Scripting tutorials, you have scripted individual parts to create playable scenes. With the previous method, if you were to duplicate the parts you would then also have duplicate scripts. This would make updating the scripts tedious as changes would have to be done script by script.

In this tutorial, a different pattern will be used to create a number of health pickups, with only a single copy of the script which determines the health pickup behavior. When the pickup is touched, it will restore the player's health, fade slightly and be disabled for a short period of time.

<video controls loop muted>
   <source src="../../../../assets/tutorials/creating-a-health-pickup/finalHealthPickup.mp4" />
</video>

## Set up

First up, you'll need a part or a model to use as a pickup. The [Showdown Town example world](https://www.roblox.com/games/6407123421/Showdown-Town-Health-Pickups) includes plenty of health pickups spread all over the map.

<img src="../../../../assets/tutorials/creating-a-health-pickup/Showdown-Town-Edit-Place.png" width="780" alt="Edit in Studio option from the experience's main page" />

Each health pickup is a Union of two rectangular parts with a green PointLight inside. They're all stored in one folder in the Workspace called **HealthPickups**, which is where the script will look for them. If you add any more to the map, it's essential you ensure that they are also stored in this folder.

<GridContainer numColumns="2">
  <img src="../../../../assets/tutorials/creating-a-health-pickup/healthPickupGame.jpg" />
  <img src="../../../../assets/tutorials/creating-a-health-pickup/healthPickupExplorer.png" width="80%" />
</GridContainer>

## Restore health

To begin with, the script needs to restore a player's health. This pattern should be familiar to you from the [Deadly Lava](../basic-scripting/deadly-lava.md) tutorial.

1. In **ServerScriptService**, add a script called **PickupManager**.
2. In this script, declare a constant called `MAX_HEALTH` with the value **100**.
3. Create a function called `onTouchHealthPickup` with parameters for the other part that touched the pickup and the pickup itself.

   ```lua
   local MAX_HEALTH = 100

   local function onTouchHealthPickup(otherPart, healthPickup)

   end
   ```

4. In the function, get the character model from the parent of `otherPart`. Next, check to see if it has a `Class.Humanoid` using `Class.Instance:FindFirstChildWhichIsA()|FindFirstChildWhichIsA()`.
5. If it has a humanoid, set their **Health** property to `MAX_HEALTH`.

   ```lua
   local MAX_HEALTH = 100

   local function onTouchHealthPickup(otherPart, healthPickup)
   	local character = otherPart.Parent
   	local humanoid = character:FindFirstChildWhichIsA("Humanoid")
   	if humanoid then
   		humanoid.Health = MAX_HEALTH
   	end
   end
   ```

<Alert severity="info">

The code here calls `Class.Instance:FindFirstChildWhichIsA()|FindFirstChildWhichIsA()` – which takes the **type** of the object desired – instead of `Class.Instance:FindFirstChild()|FindFirstChild()` which only takes the name. This is a safer option as it can only ever return a Humanoid instead of something which just happens to be called "Humanoid".

</Alert>

## Get the pickups folder

The folder holding the health pickups may not have loaded into the experience by the time the script runs. `WaitForChild` can be used to pause the script and get the HealthPickups folder when it loads.

When called on a folder, the `GetChildren` function will return an array of the folder's contents.

1. Beneath MAX_HEALTH, declare a variable called `healthPickupsFolder` and use the `WaitForChild` function to get the **HealthPickups** folder from the Workspace.
2. Create a variable named `healthPickups` to store the result of calling the `GetChildren` function on `healthPickupsFolder`.

   ```lua
   local MAX_HEALTH = 100

   local healthPickupsFolder = workspace:WaitForChild("HealthPickups")
   local healthPickups = healthPickupsFolder:GetChildren()

   local function onTouchHealthPickup(otherPart, healthPickup)
   	local character = otherPart.Parent
   	local humanoid = character:FindFirstChildWhichIsA("Humanoid")
   	if humanoid then
   		humanoid.Health = MAX_HEALTH
   	end
   end
   ```

## Loop with ipairs

`onTouchHealthPickup` needs to be called for each health pickup in the array. To do this efficiently, a new kind of loop syntax will be used.

`ipairs` is a function that can be used with a for loop to go through each element of an array. You do not need to specify where the loop begins and ends. A for loop using `ipairs` is defined as follows:

![`for index, value in ipairs(array) do`](../../../../assets/tutorials/creating-a-health-pickup/forLoop.jpg)

- **Index**: this is equivalent to the control variable in a regular for loop.
- **Value**: this will be populated with each element in the array as the loop iterates. It's a good idea to name the value variable after what it will actually contain.
- **Array**: the array you want to iterate over is passed to the ipairs function.

In the following code, you don't need the index for anything, so it can be left blank with `_`. Create a **for** loop using the `ipairs` function, passing `healthPickups`.

```lua
local function onTouchHealthPickup(otherPart, healthPickup)
	local character = otherPart.Parent
	local humanoid = character:FindFirstChildWhichIsA("Humanoid")
	if humanoid then
		humanoid.Health = MAX_HEALTH
	end
end

for _, healthPickup in ipairs(healthPickups) do

end
```

A wrapper function will be needed to pass the health pickup to the `onTouchHealthPickup` function when connecting to the `Touched` event.

1. In the for loop, connect the Touched event to an anonymous function with a parameter called `otherPart`.
2. Call the `onTouchHealthPickups` function, passing both the `otherPart` parameter and the `healthPickup`.

   ```lua
   for _, healthPickup in ipairs(healthPickups) do
   	healthPickup.Touched:Connect(function(otherPart)
   		onTouchHealthPickup(otherPart, healthPickup)
   	end)
   end
   ```

Test your code now and you should find that the health pickup restores your health. You will need to damage your player first - try standing on the vent next to the spawn point.

![Steaming vent in example world to the right of the spawn point](../../../../assets/tutorials/creating-a-health-pickup/dangerousVent.jpg)

A health bar should appear in the top right which will disappear when the player is healed.

<video controls loop muted>
   <source src="../../../../assets/tutorials/creating-a-health-pickup/fullHealthPickupEffect.mp4" />
</video>

## Pickup cooldown

Currently, the pickup will indefinitely heal any player who touches it. It would be more effective if it could only be picked up once, with a short cooldown before it can be used again.

First, you need to record whether or not the pickup is in the cooldown period. The pattern below should be familiar from [Fade Trap](../basic-scripting/fading-trap.md) - this time, the debounce will be achieved by setting an attribute on the health pickup.

1. In the for loop, set a new **attribute** called `"Enabled"` to `true`.
2. Wrap the code inside `onTouchHealthPickup` in an if statement with the condition `healthPickup:GetAttribute("Enabled")`.

   ```lua
   local function onTouchHealthPickup(otherPart, healthPickup)
   	if healthPickup:GetAttribute("Enabled") then
   		local character = otherPart.Parent
   		local humanoid = character:FindFirstChildWhichIsA("Humanoid")
   		if humanoid then
   			humanoid.Health = MAX_HEALTH
   		end
   	end
   end

   for _, healthPickup in ipairs(healthPickups) do
   	healthPickup:SetAttribute("Enabled", true)
   	healthPickup.Touched:Connect(function(otherPart)
   		onTouchHealthPickup(otherPart, healthPickup)
   	end)
   end
   ```

## Disable the pickup

The pickup should provide visual feedback that it is disabled - a common way to indicate this is to make it slightly transparent.

1. Declare three constants at the top of the script (feel free to adjust each value to your liking):

   - `ENABLED_TRANSPARENCY = 0.4`
   - `DISABLED_TRANSPARENCY = 0.9`
   - `COOLDOWN = 10`

   ```lua
   local MAX_HEALTH = 100
   local ENABLED_TRANSPARENCY = 0.4
   local DISABLED_TRANSPARENCY = 0.9
   local COOLDOWN = 10

   local healthPickupsFolder = workspace:WaitForChild("HealthPickups")
   ```

2. In the if statement in `onTouchHealthPickup`, set the `Class.BasePart.Transparency|Transparency` of the pickup to `DISABLED_TRANSPARENCY`, and the value of the `Enabled` attribute to false.

   ```lua
   local function onTouchHealthPickup(otherPart, healthPickup)
   	if healthPickup:GetAttribute("Enabled") then
   		local character = otherPart.Parent
   		local humanoid = character:FindFirstChildWhichIsA("Humanoid")
   		if humanoid then
   			humanoid.Health = MAX_HEALTH
   			healthPickup.Transparency = DISABLED_TRANSPARENCY
   			healthPickup:SetAttribute("Enabled", false)
   		end
   	end
   end
   ```

3. Call the `Library.task.wait()` function, passing `COOLDOWN` as the amount to wait.
4. Set `Transparency` back to `ENABLED_TRANSPARENCY` and `Enabled` back to `true`.

   ```lua
   local function onTouchHealthPickup(otherPart, healthPickup)
   	if healthPickup:GetAttribute("Enabled") then
   		local character = otherPart.Parent
   		local humanoid = character:FindFirstChildWhichIsA("Humanoid")
   		if humanoid then
   			humanoid.Health = MAX_HEALTH
   			healthPickup.Transparency = DISABLED_TRANSPARENCY
   			healthPickup:SetAttribute("Enabled", false)
   			task.wait(COOLDOWN)
   			healthPickup.Transparency = ENABLED_TRANSPARENCY
   			healthPickup:SetAttribute("Enabled", true)
   		end
   	end
   end
   ```

Test your pickup again: you should find that when you touch the pickup it restores your health, goes transparent, then comes back ready to be used again.

If you want to make the feedback more impactful for the player when the pickup is collected, try cutting the brightness of the PointLight in the pickup when you change the transparency.

<video controls loop muted>
   <source src="../../../../assets/tutorials/creating-a-health-pickup/finalHealthPickupTest.mp4" />
</video>

Try using these health pickups in your own projects, or change the appearance and effect to give a different kind of power-up to your players.

## Final code

```lua
local MAX_HEALTH = 100
local ENABLED_TRANSPARENCY = 0.4
local DISABLED_TRANSPARENCY = 0.9
local COOLDOWN = 10

local healthPickupsFolder = workspace:WaitForChild("HealthPickups")
local healthPickups = healthPickupsFolder:GetChildren()

local function onTouchHealthPickup(otherPart, healthPickup)
	if healthPickup:GetAttribute("Enabled") then
		local character = otherPart.Parent
		local humanoid = character:FindFirstChildWhichIsA("Humanoid")
		if humanoid then
			humanoid.Health = MAX_HEALTH
			healthPickup.Transparency = DISABLED_TRANSPARENCY
			healthPickup:SetAttribute("Enabled", false)
			task.wait(COOLDOWN)
			healthPickup.Transparency = ENABLED_TRANSPARENCY
			healthPickup:SetAttribute("Enabled", true)
		end
	end
end

for _, healthPickup in ipairs(healthPickups) do
	healthPickup:SetAttribute("Enabled", true)
	healthPickup.Touched:Connect(function(otherPart)
		onTouchHealthPickup(otherPart, healthPickup)
	end)
end
```
