---
title: Debounce Patterns
description: Debounce patterns are coding techniques that prevent a function from running too many times.
---

A **debounce** pattern is a coding technique that prevents a function from running too many times or an input from triggering multiple times. The following scripting scenarios illustrate debounce as a best practice.

## Detecting Collisions

Suppose you want to create a hazardous trap part that inflicts 10 damage when touched. An initial implementation might use a basic `Class.BasePart.Touched` connection and a `damagePlayer` function like this:

```lua title='Script - Damage Player'
local part = script.Parent

local function damagePlayer(otherPart)
	print(part.Name .. " collided with " .. otherPart.Name)

	local humanoid = otherPart.Parent:FindFirstChildWhichIsA("Humanoid")
	if humanoid then
		humanoid.Health -= 10  -- Reduce player health
	end
end

part.Touched:Connect(damagePlayer)
```

While logical at first glance, testing will show that the `Class.BasePart.Touched|Touched` event fires multiple times in quick succession based on subtle physical collisions.

<img src="../assets/scripting/scripts/Touched-Event-No-Debounce.png" width="780" />

To avoid causing excessive damage on initial contact, you can add a debounce system which enforces a cooldown period on damage through an [instance attribute](../studio/properties.md#instance-attributes).

```lua title='Script - Damage Player Using Debounce' highlight='10, 11, 13, 14'
local part = script.Parent

local RESET_TIME = 1

local function damagePlayer(otherPart)
	print(part.Name .. " collided with " .. otherPart.Name)

	local humanoid = otherPart.Parent:FindFirstChildWhichIsA("Humanoid")
	if humanoid then
		if not part:GetAttribute("Touched") then
			part:SetAttribute("Touched", true)  -- Set attribute to true
			humanoid.Health -= 10  -- Reduce player health
			task.wait(RESET_TIME)  -- Wait for reset duration
			part:SetAttribute("Touched", false)  -- Reset attribute
		end
	end
end

part.Touched:Connect(damagePlayer)
```

## Triggering Sounds

Debounce is also useful when working with sound effects, such as playing a sound when two parts collide (`Class.BasePart.Touched|Touched`), or playing a sound on the `Class.GuiButton.Activated|Activated` event when a user interacts with an on-screen button. In both cases, calling `Class.Sound:Play()` starts playback from the beginning of its track and&nbsp;&mdash; without a debounce system&nbsp;&mdash; the sound may play multiple times in quick succession.

To prevent sound overlap, you can debounce using the `Class.Sound.IsPlaying|IsPlaying` property of the `Class.Sound` object:

```lua title='Script - Play Collision Sound Using Debounce' highlight='5, 7-9'
local projectile = script.Parent

local function playSound()
	-- Find child sound on the part
	local sound = projectile:FindFirstChild("Impact")
	-- Play the sound only if it's not already playing
	if sound and not sound.IsPlaying then
		sound:Play()
	end
end

projectile.Touched:Connect(playSound)
```

```lua title='Script - Play Button Click Using Debounce' highlight='5, 7-9'
local button = script.Parent

local function onButtonActivated()
	-- Find child sound on the button
	local sound = button:FindFirstChild("Click")
	-- Play the sound only if it's not already playing
	if sound and not sound.IsPlaying then
		sound:Play()
	end
end

button.Activated:Connect(onButtonActivated)
```

## Pickup Effects

Experiences often include collectible pickups in the 3D world such as medkits, ammo packs, and more. If you design these pickups to remain in the world for players to grab again and again, a "cooldown" time should be added before the pickup refreshes and reactivates.

Similar to [detecting collisions](#detecting-collisions), you can manage the debounce state with an [instance attribute](../studio/properties.md#instance-attributes), and visualize the cooldown period by changing the part's `Class.BasePart.Transparency|Transparency`.

```lua title='Script - Health Pickup Using Debounce' highlight='10, 11, 13, 15-17'
local part = script.Parent
part.Anchored = true
part.CanCollide = false

local COOLDOWN_TIME = 5

local function healPlayer(otherPart)
	local humanoid = otherPart.Parent:FindFirstChildWhichIsA("Humanoid")
	if humanoid then
		if not part:GetAttribute("CoolingDown") then
			part:SetAttribute("CoolingDown", true)  -- Set attribute to true
			humanoid.Health += 25  -- Increase player health
			part.Transparency = 0.75  -- Make part semi-transparent to indicate cooldown state
			task.wait(COOLDOWN_TIME)  -- Wait for cooldown duration
			part.Transparency = 0  -- Reset part to fully opaque
			part:SetAttribute("CoolingDown", false)  -- Reset attribute
		end
	end
end

part.Touched:Connect(healPlayer)
```

<Alert severity="info">
This cooldown concept can be applied to other scenarios as well, such as creating a "reload" time for a rocket launcher to limit how frequently players can fire rockets.
</Alert>
