---
title: Loops practice - create a timed bridge
description: Make a bridge that disappears to add challenge to a Roblox experience. Combine for loops and while loops in this computer science practice.
next: /tutorials/fundamentals/coding-4/nested-loops
prev: /tutorials/fundamentals/coding-4/glow-lights-with-for-loops
---

This project is another example of using for loops in a practical way. For this bridge, players will touch a button to make a bridge walkable for a limited time before it disappears. To create a timer and show the remaining time to a player, you'll use for loops.

<video controls src="../../../assets/education/coding-4/timedBridgePresentation.mp4" width="100%"></video>

## Set up the project

This bridge can be included in any Roblox project with movement-based challenges, like an obby.

### Create parts

1. Find a place to build a bridge, like a river or a large gap in an obby. Create three **anchored** parts like below.

   - TimerDisplay
   - Bridge
   - ButtonBridge

   <img src="../../../assets/education/coding-4/forLoopBridge_bridgeSetup.png" width="100%" />

2. When inactive, the bridge will be semi-transparent. To do so, select the **Bridge** and change it's properties.

   - **Transparency** = 0.8
   - **CanCollide** = False

### Create the timer display

When crossing the bridge, players will need to see how many seconds are left before the bridge disappears. One way to display images or text is by adding an object called a Surface GUI to a part. **Surface GUIs** can also be used to create in-game signs, custom health bars, and inventory systems. This tutorial will go through this quickly, but more information can be found in the [Tutorials](../../../tutorials/index.md) section.

1. Select TimerDisplay and add a **SurfaceGui**. Then, parented to the Surface Gui, add a **TextLabel**.

   <img src="../../../assets/education/coding-4/forLoopBridge_addTextLabel.png" />

2. Select the Surface GUI. In the Properties, make the following changes:

   - Change the **Face** so you can see the text label on the front of the timer where the player is looking.

3. Select the TextLabel. In the Properties, make the following changes:
   - Set **Size** to `{1, 0},{1, 0}`.
   - Set **TextScaled** to true.
   - Set **Text** to be blank. Text will be updated using the script.

### Set up the script

Now that the timer is in place, create a script to control the bridge and display the countdown number to players.

1. In the Bridge part, add a new script named TimedBridge. In that script, create the following variables.

   ```lua
   local bridge = script.Parent
   local button = workspace.ButtonBridge
   local timerText = workspace.TimerDisplay.SurfaceGui.TextLabel

   -- How long the bridge will stay solid
   local timerDuration = 5
   ```

## Code the touch interaction

To use the bridge, you'll need to create two functions. One function will make the bridge walkable and display the timer. The other function will listen for if a player touches the button that activates the bridge.

1. Create a new function named `startTimer()` with a print statement inside. You'll use the print statement to test your code.

   ```lua
   local timerDuration = 5

   local function startTimer()
       print("Countdown started")
   end
   ```

2. Code a function named `buttonPressed()` to check if a humanoid touches the button. The function should accept a parameter of `partTouched`, and then have an empty if statement if a humanoid is detected in that part.

   ```lua
   local function startTimer()
      print("Countdown started")
   end

   local function buttonPressed(partTouched)
      local character = partTouched.Parent
      local humanoid = character:FindFirstChildWhichIsA("Humanoid")

      if humanoid then

      end
   end
   ```

3. To start the timer, in the `if` statement, call the `startTimer()` function.

   ```lua
   local function buttonPressed(otherPart)
      local character = otherPart.Parent
      local humanoid = character:FindFirstChildWhichIsA("Humanoid")
      if humanoid then
         startTimer()
      end
   end
   ```

4. Under the end of `buttonPressed()`, connect the `buttonPressed()` function to the button's `Touched` event.

   ```lua
   local function buttonPressed(otherPart)
      local character = otherPart.Parent
      local humanoid = character:FindFirstChildWhichIsA("Humanoid")
      if humanoid then
         startTimer()
      end

   end

   button.Touched:Connect(buttonPressed)
   ```

5. Run the project. Touch the part and check in the Output window to see the print statement.

### Troubleshooting tips

At this point, if the bridge doesn't work as intended, try one of the following below.

**Issue**: Error message saying: `"... is not a valid member of workspace"`.

- In the TimedBridge script, check that all parts are spelled exactly as they're seen in the Explorer.

**Issue**: Can't see the parts.

- Make sure all three parts are Anchored.
- Check the Transparency property for the bridge.

## Create the timer

Whenever players step on the bridge, `startTimer()` will make the bridge walkable and start the timer. Once the timer reaches 0, the bridge will become unwalkable, causing anyone who's not fast enough to fall.

### Make the bridge walkable

To start, the script will need to make the bridge solid, or collidable and then start a timer until it becomes unwalkable.

1. To make the bridge walkable, in `startTimer()`, change the bridge's Transparency property to 0 (opaque) and the CanCollide property to true.

   ```lua
   local function startTimer()
      -- Make the bridge visible and walkable
      bridge.Transparency = 0
      bridge.CanCollide = true
   end
   ```

2. To create a timer that counts down, create a for loop with the following values.

   - **Control Variable**: named `count`, set to `timerDuration`.
   - **End**: 0
   - **Increment**: -1

   ```lua
   local function startTimer()
      -- Make the bridge visible and walkable
      bridge.Transparency = 0
      bridge.CanCollide = true

      for count = timerDuration, 0, -1 do

      end

   end
   ```

3. To show the timer to players, change the text in `timerText` to display count by typing `timerText.Text = count`. Each time the for loop goes through an iteration, it'll show players the next number in the timer.

   ```lua
   for count = timerDuration, 0, -1 do
      timerText.Text = count
   end
   ```

4. Use a task.wait function to make the for loop run only once a second.

   ```lua
   for count = timerDuration, 0, -1 do
      timerText.Text = count
      task.wait(1)
   end
   ```

5. Run the experience. When you touch the button, the bridge should appear and the timer will start, then complete.

   <video controls src="../../../assets/education/coding-4/forLoopBridge-finishedCountdown.mp4" width="100%"></video>

## Keep the bridge from restarting

Notice though, if you move around on the button, the timer will keep restarting.

<video controls src="../../../assets/education/coding-4/forLoop_outputError.mp4" width="100%"></video>

This is because the for loop is being called each time you touch the button and starting the for loop from the beginning. To keep the timer from constantly restarting, you'll need to add a boolean, a type of variable, that will control whether or not `startTimer()` is allowed to be called again.

**Booleans** are written the same way as other variables, but instead of using numbers or strings, they can only be set to true or false. In this situation, the script will use a boolean to check if the timer is currently running before starting it.

1. At the top of your script, under your variables, create a variable named `timerActive` and set it to `false` since nobody has pressed the button yet.

   ```lua
   local timerDuration = 5
   local timerActive = false

   local function startTimer()
   ```

2. To makes sure the timer only starts when the `timerActive` boolean is false, add a second condition to the if statement in `buttonPressed()`.

   ```lua
   local function buttonPressed(otherPart)
      local character = otherPart.Parent
      local humanoid = character:FindFirstChildWhichIsA("Humanoid")
      if humanoid and timerActive == false then
         startTimer()
      end

   end
   ```

3. To keep `startTimer()` from running again before the timer runs out, set the boolean `timerActive` to true.

   ```lua
   local function startTimer()
      timerActive = true
      bridge.Transparency = 0
      bridge.CanCollide = true
   ```

4. In the `startTimer()` function, **after** the for loop, set the bridge back to its original properties by changing the bridge's transparency to 0.8 and CanCollide to false.

   ```lua
   local function startTimer()
      timerActive = true
      bridge.Transparency = 0
      bridge.CanCollide = true

      -- For loop that counts down from timerDuration
      for count = timerDuration, 0, -1 do
         timerText.Text = count
         task.wait(1)
      end

      -- Make the bridge not walkable
      bridge.Transparency = 0.8
      bridge.CanCollide = false
   end
   ```

5. One last thing to reset the bridge is to change the `timerText` to an empty string like how it was originally. Then, set the `timerActive` boolean to false.

   ```lua
   bridge.Transparency = 0.8
   bridge.CanCollide = false
   timerText.Text = ""
   timerActive = false
   ```

6. Playtest and check to make sure the bridge can be used multiple times.

   <video controls src="../../../assets/education/coding-4/timedBridgePresentation.mp4" width="100%"></video>

## Complete timed bridge script

```lua
local bridge = script.Parent
-- Gets the button as it's typed in the Explorer
local button = workspace.ButtonBridge

-- Gets the part for the display
local timerPart = workspace.TimerDisplay
-- Gets the Text that will display the timer
local timerText = timerPart.SurfaceGui.TextLabel

-- How long players have to cross the bridge
local timerDuration = 5
local timerActive = false

local function startTimer()
    print("Countdown started")
	timerActive = true
	bridge.Transparency = 0
	bridge.CanCollide = true

	-- For loop that counts down from timerDuration
	for count = timerDuration, 0, -1 do
		timerText.Text = count
		task.wait(1)
	end

	-- Make the bridge not walkable
	bridge.Transparency = 0.8
	bridge.CanCollide = false
	timerText.Text = ""
	timerActive = false

end

local function buttonPressed(partTouched)
	local character = partTouched.Parent
	local humanoid = character:FindFirstChildWhichIsA("Humanoid")
	print("part touched")

	if humanoid and timerActive == false then
		print("starting timer")
		startTimer()
	end
end

button.Touched:Connect(buttonPressed)
```

## Summary

Loops can be combined with different means of interaction to create fun gameplay moments. In this tutorial, a timed bridge is created using a for loop that functions as a countdown. During the countdown, players are given a limited time to get across.
