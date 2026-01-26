---
title: Parameters practice - buttons
description: Practice connecting functions to events by creating a button that activates a bridge.
next: /tutorials/fundamentals/coding-2/multiple-parameters-and-arguments
prev: /tutorials/fundamentals/coding-2/use-parameters-and-events
---

Buttons can be used by players to unlock new areas, give points, and reveal treasure. Whenever a player touches a button, it should give some feedback to let players know it's being interacted with, like change colors or make sounds.

In this example, the button will be used to activate a bridge. When the button has been pressed, it'll turn green and players will be able to use the bridge. If the player hasn't pressed the button, they'll fall through the bridge when they try to walk on it.

## Make a bridge

Start off by setting up the bridge.

1. Create an area in your environment where players will need a bridge.
2. Create a part for the bridge and rename it Bridge.
3. Select the bridge, in the Properties window:

   - Change **Transparency** to .5. For Transparency, 0 is visible, 1 is invisible.
   - Check **Anchor**.
   - Uncheck **CanCollide**.

4. When you test the experience, the bridge should be misty looking and people shouldn't be able to walk on it yet.
   <img src="../../../assets/education/coding-2/transparent-bridge.jpg" width="80%" />

## Create the button

Now that the bridge is set up, create the button.

1. Create a new part named _Button_.
2. Change the button color to red.
3. **Anchor** the button.
4. Move the button so it's slightly floating and not touching anything. This is so to make sure the `Touched` event doesn't accidentally fire.
   <img src="../../../assets/education/coding-2/red-button.jpg" width="80%" />

## Make the button interactive

This time, instead of using the `Class.BasePart.Touched|Touched` event to create a trap, you'll use it to create a button that makes the bridge usable. To make the bridge collidable, use the code `bridge.CanCollide = true` within a custom function that runs when a player touches the button. You know everything else you need to complete the following steps.

Try to figure it out yourself before looking at the code solution.

1. Insert a new **script** into the button named _ActivateBridge_.
2. Delete `Hello World`.
3. Create variables for the bridge and for the button.
4. Create a **local function** that does the following the button is touched:
   - Prints `"button touched"`.
   - Changes button's color from red to green when touched.
   - Changes bridge's transparency to 0 to make it visible.
   - Makes the bridge usable by using the code `bridge.CanCollide = true`
5. Connect the function to the button's `Touched` event.
6. Test the script and make sure the bridge appears when the button is touched.

Code Solution
Below is one possible code solution

```lua
-- Insert this script into button
-- Turns the button green when something touches the button.

local button = script.Parent
local bridge = workspace.Bridge

local function buttonPressed()
	print("button touched")
	button.Color = Color3.fromRGB(0, 170, 0)
	bridge.Transparency = 0
	bridge.CanCollide = true
end

button.Touched:Connect(buttonPressed)
```

### Troubleshoot your code

**Issue: The bridge is already solid when the experience starts.**
Make sure that the parts are Anchored and not touching anything. The parts might touch something, like terrain or another part, and cause the buttonPressed() function to fire accidentally.

**Issue: You get an error in the Output window saying: "Bridge is not a valid member of Workspace"**
Check the following:

- The naming of your bridge. The bridge in your script must be named exactly like in the Explorer.
- That `part.Touched:Connect(buttonPressed)` is outside the `buttonPressed()` function.

### Optional code challenge

The script in this lesson can also be used to keep doors that keep players out of specific areas. Practice your coding skills and do the following:

- Create a door part.
- Create a button further away from the door.
- Change the script in this lesson so it makes the door change transparency and so the player can't collide with it.

Your version might look something like this:

```lua
local button = script.Parent
-- Reminder: Replace the name of the part, Gate, with the one in your project
local gate = workspace.Gate

local function buttonPressed()
	print("button touched")
	-- Changes button to red to give player feedback
	button.BrickColor = BrickColor.Red() -- CHANGE THIS
	-- Make the gate invisible
	gate.Transparency = 1
	-- Makes it so the player can walk through the gate
	gate.CanCollide = false
end

button.Touched:Connect(buttonPressed)
```
