---
title: Global wind
description: The global wind vector sets the direction and strength that wind blows through an experience, affecting terrain grass, dynamic clouds, and particles.
---

The `Class.Workspace.GlobalWind|GlobalWind` vector sets the direction and strength that wind blows through an experience, affecting [terrain grass](../parts/terrain.md#grass-animation) and [dynamic clouds](../environment/clouds.md). You can set it as a [constant vector](#global-wind-vector), or adjust it through [scripting](#scripted-effects) to create cyclical gusts of wind. Additionally, you can influence [particles](#particle-influence) to follow the global wind vector.

<video src="../assets/lighting-and-effects/aero-fluid-dynamics/Global-Wind-Showcase.mp4" controls width="100%" alt="Video of wind blowing clouds and grass across rolling hills in the 3D world"></video>

## Global wind vector

Global wind is controlled through The `Class.Workspace.GlobalWind|GlobalWind` vector is a property of `Class.Workspace` and you can edit it directly in Studio, or set it through [scripting](#scripted-effects).

To set the global wind vector in Studio:

1. In the **Explorer** window, select the top-level `Class.Workspace` service.

   <img src="../assets/studio/explorer/Workspace.png" width="320" alt="Workspace object shown in Explorer window of Studio" />

1. In the **Properties** window, locate the `Class.Workspace.GlobalWind|GlobalWind` property and set an **X**, **Y**, and **Z** value for its direction and strength.

   <img src="../assets/studio/properties/Workspace-GlobalWind.png" width="320" alt="GlobalWind property shown in Properties window of Studio" />

<Alert severity="info">
Note that the speed of [animated grass](../parts/terrain.md#grass-animation) — but not its vector direction&nbsp;— will be reduced if the player has toggled on the **Reduce&nbsp;Motion** [accessibility](../production/publishing/accessibility.md#reduced-motion) setting from the Roblox or in‑experience **Settings** menu.
</Alert>

## Particle Influence

Particles emitted by a `Class.ParticleEmitter` will follow the global wind vector as long as the emitter's `Class.ParticleEmitter.WindAffectsDrag|WindAffectsDrag` property is enabled and its `Class.ParticleEmitter.Drag|Drag` property is greater than `0`. `Class.Fire` and `Class.Smoke` instances follow the wind vector by default.

<img src="../assets/studio/properties/ParticleEmitter-WindAffectsDrag.png" width="320" alt="Drag and WindAffectsDrag properties shown in Properties window of Studio" />

<video src="../assets/lighting-and-effects/aero-fluid-dynamics/Global-Wind-Particles.mp4" controls width="800" alt="Video of wind blowing particles from a ParticleEmitter"></video>

## Wind direction widget

To make it easier to tune global wind, you can use the **Wind Direction** widget, accessible from Studio's **View** menu. The widget lets you visualize how wind is blowing using a wind sock model, and you can dynamically set the wind's **Speed**, **Yaw**, and **Pitch** by clicking the desired aspect name and sliding the slider along the bottom, or you can adjust yaw or pitch by manipulating the green ring and blue arrow on the animated portion. You can also click and drag the widget to reposition it anywhere in the 3D viewport.

<img src="../assets/lighting-and-effects/aero-fluid-dynamics/Wind-Direction-Widget.jpg" width="800" alt="Wind Direction widget showing in 3D viewport of Studio" />

## Scripted effects

Scripting of the `Class.Workspace.GlobalWind|GlobalWind` property opens up a whole range of possibilities. For example, you can use the following code sample to cause cyclical gusts of wind that ease in and out using the `Library.math.sin()` function.

```lua title="Script - Cyclical Wind Gusts"
local gustCycleDelay = 5  -- Max duration between gust cycles in seconds
local gustCycleDuration = 3.5  -- Duration of each gust cycle in seconds

-- During each gust cycle, a portion of "gust" will be added to "baseWind" in a ramped fashion
local baseWind = Vector3.new(5, 0, 2)  -- Base wind speed and direction
local gust = Vector3.new(25, 0, 10)  -- Gust speed and direction
local gustIntervals = 100  -- Number of iterations used to calculate each gust interval
local dg = gustCycleDuration / gustIntervals
local dgf = dg / gustCycleDuration

-- Set global wind to base wind initially
workspace.GlobalWind = baseWind

-- Wait delay amount before starting gusts
task.wait(gustCycleDelay)

while true do
	for i = 1, gustIntervals do
		local f = math.sin(math.pi * dgf * i)  -- Use sin() function to ramp gust
		workspace.GlobalWind = baseWind + f * gust  -- Set global wind to base wind + gust
		task.wait(dg)
	end
	workspace.GlobalWind = baseWind  -- Reset global wind to base wind at end of gust cycle
	task.wait(math.random() * gustCycleDelay)  -- Wait a random fraction of delay before next gust cycle
end
```

<video src="../assets/lighting-and-effects/aero-fluid-dynamics/Global-Wind-Gusts.mp4" controls width="800" alt="Video of wind blowing clouds and grass across rolling hills in the 3D world"></video>
