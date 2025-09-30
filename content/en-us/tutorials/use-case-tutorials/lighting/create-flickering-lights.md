---
title: Create flickering lights
description: Explains the process of creating flickering local light sources in your experience.
---

**Flickering lights** is a powerful force in influencing an environment's tone. For example, a home with lighting of a consistent brightness can feel warm and inviting, but if you add flickering lights to that same home's hallway, it becomes haunting and might hint at possible danger ahead. By strategically modeling and scripting different light sources within your experience, you can add a whole new level to your environmental storytelling.

<video controls src="../../../assets/tutorials/creating-flickering-lights/Overview.mp4" width="50%"></video>

As with all 3D creation, there are many ways to achieve any particular goal. In this guide, you can quickly create a flickering light animation using tools and methods available only within Studio with only a few basic assets, including a `.rbxm` file for the banker's lamp model that contains child `Class.MeshParts` you can customize to fit the aesthetic of your own experiences.

In the following method to create flickering lights, follow each section to learn how to create:

- A brightness `Datatype.NumberSequence` to influence the lamp's brightness over time.
- A loop duration attribute to determine the amount of time each flickering loop must take.
- A `Class.Script` that configures how the two attributes work with the model's child `Class.MeshPart|MeshParts` to flicker the lamp's light.

<Alert severity="info">
   You can create your own assets in third-party modeling tools and follow along with your own design. For information on exporting models for use in Studio, see [Exporting Requirements](../../../art/modeling/export-requirements.md).
</Alert>

## Import the sample lamp

This guide uses a downloadable `.rbxm` file of a high-quality, customizable banker's lamp model to demonstrate a flickering light technique. You can use this model to understand the basic principles, then apply them to your own models you create within Studio or other third-party modeling software.

To import the [BankersLamp](../../../assets/tutorials/creating-flickering-lights/BankersLamp.rbxm) `.rbxm`:

1. In the **Explorer** window, right-click **Workspace**. A contextual menu displays.
1. Select **Insert From File…** A file browser displays.
1. Select the **BankersLamp** `.rbxm`, then click the **Open** button. The model displays within the viewport.

   <img width="50%" img src="../../../assets/tutorials/creating-flickering-lights/Importing-Sample-Lamp.jpg" />

## Create a brightness NumberSequence

A `Datatype.NumberSequence` is a data type that represents a series of number values from 0 to 1 over an instance's lifetime. This type of data type is useful for creating flickering lights because you can specify how you want the lamp light's brightness to change over its lifetime, and when you change brightness from full intensity to no light at all in short succession, you can achieve a flickering effect.

The X axis of a `Datatype.NumberSequence` represents time, and the Y axis represents relative brightness. Each square at the start and end of the number sequence is a **keypoint** that determines the value of the property at that point of the light brightness's lifetime. When you first create a `Datatype.NumberSequence`, the graph is a straight line and the light remains the same brightness intensity throughout its lifetime, but by adding and moving keypoints around, you can create curves within the sequence and change the lamp's brightness over time.

<img width="100%" img src="../../../assets/tutorials/creating-flickering-lights/BrightnessCurve-Default.jpg" />

While the lamp doesn't have a brightness `Datatype.NumberSequence` by default, you can create a brightness attribute, set it to a `Datatype.NumberSequence` type, then experiment by adding keypoints with different values until the light flickers at your set cadence.

To create a brightness `Datatype.NumberSequence`:

1. Add a new NumberSequence attribute to the lamp model.

   1. In the **Explorer** window, select the lamp model.
   1. In the **Properties** window, navigate to the **Attributes** section and click on the **Add Attribute** button. The **Add Attribute** dialog displays.

   1. In the **Add Attribute** dialog,

      1. In the **Name** field, input **BrightnessCurve**.
      1. Click the **Type** dropdown menu, then select **NumberSequence**.
      1. Click the **Save** button. The new attribute displays in the **Attributes** section of the **Properties** window.

         <img width="60%" img src="../../../assets/tutorials/creating-flickering-lights/BrightnessCurve-Attribute.jpg" />

1. Select the new **BrightnessCurve** property, then click the **…** button. A number sequence pop-up displays.

   <img width="40%" img src="../../../assets/tutorials/creating-flickering-lights/BrightnessCurve-Menu.jpg" />

1. Perform one of the following actions:

   - To change the brightness at a point, click on a keypoint and either drag it up or down, or enter a value in the **Value** field.
   - To insert new keypoints, click on any point in the graph.
   - To delete a keypoint, select the keypoint, then the **Delete** button.
   - To add a random range for brightness, click on any keypoint and drag the envelope lines up or down. At that time, the light generates at a random brightness between the pink envelope.

For example, the following graph makes the light flicker to full brightness for the first flicker, 50% brightness for the second flicker, then 75% brightness for the third flicker.

<img width="100%" img src="../../../assets/tutorials/creating-flickering-lights/BrightnessCurve-Example.jpg" />

## Create a loop duration

Now that you have a `Datatype.NumberSequence` to determine how the lamp light's brightness changes over its lifetime, you must determine how long you want the flickering loop to take. In other words, this loop duration essentially controls how often the `Datatype.NumberSequence` repeats, in seconds.

To create a loop duration:

1. Add a new loop duration attribute to the lamp model.

   1. In the **Explorer** window, select the lamp model.
   1. In the **Properties** window, navigate to the **Attributes** section and click on the **Add Attribute** button. The **Add Attribute** dialog displays.
   1. In the **Add Attribute** dialog,

      1. In the **Name** field, input **LoopDuration**.
      1. Click the **Type** dropdown menu, then select **Number**.
      1. Click the **Save** button. The new attribute displays in the **Attributes** section of the **Properties** window.

         <img width="60%" img src="../../../assets/tutorials/creating-flickering-lights/LoopDuration-Attribute.jpg" />

1. Set the new **LoopDuration** attribute to **1**. This tells the `Datatype.NumberSequence` to repeat after one second.

## Script the light flicker

Now that you have all of the elements to control the brightness of your lamp over its lifetime, it's time to create a `Class.Script` that will get everything to work together and flicker the light.

To script the light flicker:

1. In the **Explorer** window, hover over the lamp model and click the ⊕ button. A contextual menu displays.
1. From the menu, insert a **Script**.
1. In the new script, enter the following:

```lua
local RunService = game:GetService("RunService")

-- Gets the attribute values set on the model.
local brightnessCurve = script.Parent:GetAttribute("BrightnessCurve")
local loopDuration = script.Parent:GetAttribute("LoopDuration")

-- Stores references to the model's instances that will change.
local light = script.Parent.lamp_hood.SpotLight
local bulb = script.Parent.lightbulb
local beam = script.Parent.lamp_hood.Beam

-- Stores properties' original values that will change.
local origLightBrightness = light.Brightness
local origBeamBrightness = beam.Brightness
local origBulbColor = bulb.Color

-- Gets the value of the NumberSequence (ns) at a specific time (nsTime)
function evaluateNumberSequence(ns: NumberSequence, nsTime: number)
	-- If we are at 0 or 1, returns the first or last keypoint's value, respectively.
	if nsTime == 0 then
		return ns.Keypoints[1].Value
	end
	if nsTime == 1 then
		return ns.Keypoints[#ns.Keypoints].Value
	end

	-- Otherwise, steps through each sequential pair of keypoints.
	for i = 1, #ns.Keypoints - 1 do
		-- Gets the current and next keypoint.
		local currKp = ns.Keypoints[i]
		local nextKp = ns.Keypoints[i + 1]

		-- If nsTime is between the keypoints' times,
		if nsTime >= currKp.Time and nsTime < nextKp.Time then
			-- Calculates where nsTime lies between the keypoints' times, calls this alpha.
			local alpha = (nsTime - currKp.Time) / (nextKp.Time - currKp.Time)
			-- Returns the value between the points for nsTime using alpha.
			return currKp.Value + (nextKp.Value - currKp.Value) * alpha
		end
	end
end

RunService.Heartbeat:Connect(function()
	-- Solves for the NumberSequence's time (between 0 and 1).
	local t = time() / loopDuration
	local numberSequenceTime = t - (t // 1)

	-- Gets the NumberSequence's value at this time.
	local brightnessValue = evaluateNumberSequence(brightnessCurve, numberSequenceTime)

	-- Adjusts brightness and color properties based on this value.
	light.Brightness = origLightBrightness * brightnessValue
	beam.Brightness = origBeamBrightness * brightnessValue
	bulb.Color = Color3.new(
		origBulbColor.r * brightnessValue,
		origBulbColor.g * brightnessValue,
		origBulbColor.b * brightnessValue
	)
end)
```

When you [playtest your experience](../../../studio/testing-modes.md#playtesting), the `Class.RunService.Heartbeat|Heartbeat` event connection executes the following every frame:

1. Solves for a time (`numberSequenceTime`) within the `brightnessCurve` `Datatype.NumberSequence` based on the current time.
   - The time is between 0 and 1 as these represent the beginning and end of the NumberSequence, respectively.
1. Solves for the value (`brightnessValue`) of the `brightnessCurve` `Datatype.NumberSequence` at time `numberSequenceTime`.
   - `evaluateNumberSequence()` computes the value associated with the time for any `NumberSequence`.
   - This value serves as a relative brightness value to apply to the properties that change over time.
1. Changes the lamps' properties by multiplying `brightnessValue` by the light's brightness, beam's brightness, and bulb's color.

The changes to these properties over time result in the flickering effect below.

<video controls src="../../../assets/tutorials/creating-flickering-lights/Scripting-Light-Flicker.mp4" width="80%"></video>
