---
title: Glow lights with for loops
description: Create glowing lights in Roblox Studio using a for loop. This practical example teaches computer science with Roblox.
next: /tutorials/fundamentals/coding-4/creating-a-timed-bridge
prev: /tutorials/fundamentals/coding-4/intro-to-for-loops
---

To practice for loops, you'll create a lamp that gradually glows brighter and then dims over time. This script can then be applied to any other lights in a project, whether it's a street light or glowing crystal.

<video controls src="../../../assets/education/coding-4/glowing-light-finished.mp4" width="100%"></video>

## Set up the part and script

The lamp will be a part with an attached light and script.

1. To make it easier to see the light, change the 3D world to **night time**. In the **Explorer** ⟩ **Lighting**, change **ClockTime** to `0`.

   <img src="../../../assets/education/coding-4/glowing-lights-setClockTime.png" alt = "image" />

2. Create a new part or model named Lamp.

   <img src="../../../assets/education/coding-4/glowing-lights-lightPart.jpg" width="75%" />

3. Select Lamp, and add a **light**, such as a PointLight or SpotLight. You'll work with the brightness property of the light to create a glowing lamp.

   <img src="../../../assets/education/coding-4/florLoop_lightAdded.png" width="50%" />

4. In Lamp, add a new script named GlowScript. In that script, create variables to store the lamp part and the point light.

   ```lua
   local lightPart = script.Parent
   local light = lightPart.SpotLight
   ```

   <Alert severity="warning">
   The specific path to the light and part might differ based on the model you're using. Be sure to double check in the Explorer.
   </Alert>

5. Next, create a variable to hold how much the light's brightness will change each time the loop runs. Then, add another variable for how many seconds the loops will wait before running again.

   ```lua
   -- How much the light's brightness will change each time
   local brightnessChange = 1
   -- How often in seconds the light will change brightness
   local timeChange = 1
   ```

## Make the lamp glow

The lamp will use two **for loops**, one that counts up to make the lamp brighter, and one that counts down to dim it. Each for loop will have a control variable called currentBrightness. That way, as the for loop's control variable goes up and down, so will the brightness of the light.

### First loop (light increase)

Remember, a for loop starts with keyword `for` followed by a control variable. This script will set the brightness value of the light to value in the control variable.

1. Code the for loop using the following values. Remember to separate the control variable and end values with a comma.

   - **Control variable**: `currentBrightness`
   - **Start value**: 0
   - **End value**: 5
   - **Increment Value**: `brightnessChange`

   ```lua
   local timeChange = 1

   for currentBrightness = 0, 5, brightnessChange do

   end
   ```

2. In scope of the for loop, set the brightness property of the light to the value in the control variable by typing `light.Brightness = currentBrightness`. Now, when the loop runs, the light will become brighter.

   ```lua
   for currentBrightness = 0, 5, brightnessChange do
     light.Brightness = currentBrightness
   end
   ```

3. So the change doesn't happen all at once, add a wait function using the value in `timeChange`.

   ```lua
   for currentBrightness = 0, 5, brightnessChange do
      light.Brightness = currentBrightness
      task.wait(timeChange)
   end
   ```

4. Run the experience to see the light increase in brightness each second.

   <video controls src="../../../assets/education/coding-4/glowing-light-increase.mp4" width="100%"></video>

   <Alert severity="info">
   Depending on the lighting in your project, you make need to adjust the brightness variables, or the environment's lighting.
   </Alert>

If you can't see the brightness change over time in the first loop:

- Make sure that `light.Brightness = currentBrightness` is between the do and end of your for loop.
- Check that `timeChange` is at least 1 or higher. Smaller numbers will make the brightness change faster, but be harder to see over time.
- Make sure that the first line of your for loop has two total commas separating the control variable, end value, and increment value.

### Second loop (light decrease)

To dim the light, use a second for loop. The values of this loop will be reversed so the light starts bright and each second, gets dimmer.

1. Code a second for loop that decreases the brightness over time. The solution is in the code box below. Use the following values:

   - **Control Variable** - `currentBrightness` set to 5, the end of the last loop.
   - **End** - 0, turning off the light.
   - **Increment** - subtract `brightnessChange`.

   ```lua
   -- Second loop dims lamp
   for currentBrightness = 5, 0, -brightnessChange do
      light.Brightness = currentBrightness
      task.wait(timeChange)
   end
   ```

2. Run your experience; you should see the light brighten and then dim.

   <video controls src="../../../assets/education/coding-4/glowing-light-singleLoop.mp4" width="100%"></video>

### Make the light repeat

Right now, the light only turns on and off once. To make the lamp continuously glow on and off, the for loops will be placed inside a repeating while loop.

1. Under the for loops, create a new while loop.

   ```lua
   while true do

   end
   ```

2. Place both for loops inside a while loop. Indent the for loops to make them easier to tell apart from the while loop.

   ```lua
   while true do
      for currentBrightness = 0, 5, brightnessChange do
         light.Brightness = currentBrightness
         task.wait(timeChange)
      end

      for currentBrightness = 5, 0, -brightnessChange do
         light.Brightness = currentBrightness
         task.wait(timeChange)
      end
   end
   ```

3. Run the experience to see the light turn bright and dim continuously.

   <video controls src="../../../assets/education/coding-4/glowing-light-finished.mp4" width="100%"></video>

## Finished light script

A finished version of the script can be referenced below.

```lua
-- Stores the light attached to this lamp
lightPart = script.Parent
light = lightPart.SpotLight

-- How much the light's brightness will change each time
local brightnessChange = 1
-- How often in seconds the light will change brightness
local timeChange = 0.2

while true do
	for count = 0, 5, brightnessChange do
	    light.Brightness = count
	task.wait(timeChange)
	end

	-- Second loop to turn off light
	for count = 5, 0, -brightnessChange do
		light.Brightness = count
		task.wait(timeChange)
	end
end
```

## Summary

To create complex effects in a project, scripts can use multiple loops, and even combinations of different types of loops. To code a glowing light, two loops are nested within a while loop. As coders add in more loops, be sure to check indentation so code can be easy to read.
