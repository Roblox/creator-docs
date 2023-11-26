---
title: Animating Parts
description: Learn how to move parts in Roblox Studio by coding tweens. Rotate, scale, and change the colors of objects.
prev: /education/build-it-play-it-island-of-move/adding-animations
---

Players can get feedback to whether or not their actions are doing anything with animations. This can be a tree shaking when hit, or a pet cheerfully bouncing when fed. In this case, we'll show you how to make a button that moves when the player clicks it.

<video controls src="../../assets/education/build-it-play-it-island-of-move-intermediate/exampleProject_tweeningButtonDoor.mp4" width="100%"></video>

## Tweening with Animations

One way of animating objects is using tweens. A **tween**, short for in-between, is the process of changing a starting value to an ending value over a certain amount of time. Tweens can be used to change properties such as position, color, or rotation.

<video controls src="../../assets/education/build-it-play-it-island-of-move-intermediate/example_allTweens.mp4
" width="100%"></video>

### Project Setup

For this project, a tween will move an object from a starting position to a goal position.

1. Determine what part you'll be animating. In the example below, `1` is the button and `2` is the wall.

   <img src="../../assets/education/build-it-play-it-island-of-move-intermediate/bipi_tier2_extension_partSetup.jpg"/>

2. In the part that will move, add a ClickDetector and a script named TweenMove. Do not rename the ClickDetector.

   <img src="../../assets/education/build-it-play-it-island-of-move-intermediate/bipi-tier2-showButtonSetup.png"/>

   <Alert severity='warning'>
   If you're using a model with many parts, pick one part to move (such as the button in this example), and put the MoveTween script as its child.
   </Alert>

3. Open the TweenMove script. Then, copy and paste the script below.

   ```lua
   -- Tweens a part back and forth based on a chosen axis
   -- The button has an on/off state which moves the part forwards or backwards

   local TweenService = game:GetService("TweenService")
   local button = script.Parent
   local clickDetector = button:FindFirstChildWhichIsA("ClickDetector")
   local buttonState = -1  -- Determines button direction; -1 means it will press in, 1 means it will pop out
   local inTween = false

   -- Customizable variables
   local TWEEN_TIME = 0.15
   local TWEEN_MOVE_DISTANCE = 1.5

   -- Tween variables
   local buttonTweenInfo = TweenInfo.new(
   	TWEEN_TIME,  -- Time
   	Enum.EasingStyle.Quad,  -- EasingStyle
   	Enum.EasingDirection.Out  -- EasingDirection
   )

   local function buttonPress()
   	-- If the button is tweening, prevent it from being used again
   	if inTween == true then
   		return
   	end

   	-- Calculate new CFrame for button position
   	local offsetCFrame = CFrame.new(0, TWEEN_MOVE_DISTANCE * buttonState, 0)
   	local newCFrame = button.CFrame:ToWorldSpace(offsetCFrame)

   	-- Create a tween and play it
   	local tweenButton = TweenService:Create(button, buttonTweenInfo, {CFrame = newCFrame})
   	tweenButton:Play()
   	inTween = true

   	-- On tween completion, make button usable again
   	tweenButton.Completed:Connect(function()
   		inTween = false
   		-- Invert the button state
   		buttonState *= -1
   	end)

   end

   clickDetector.MouseClick:Connect(buttonPress)
   ```

4. Playtest and click the object. While testing, you may notice the object moves the wrong direction or distance. That can be customized in the next section.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/education/build-it-play-it-island-of-move-intermediate/showTweenMove_Wrong.gif" />
    <figcaption>Wrong direction; needs adjustment</figcaption>
  </figure>
  <figure>
    <img src="../../assets/education/build-it-play-it-island-of-move-intermediate/showTweenMove_correct.gif" />
    <figcaption>Moves correctly; no adjustment needed</figcaption>
  </figure>
</GridContainer>

## Adjusting the Move Tween

With the script added, you can customize it to suit the needs of your game. The button can be tweened to move in directions like forward and back, or up and down.

### Changing Position

Remember, tweens transition from a starting value to a goal value. This script uses [CFrames](../../workspace/cframes.md) to move the button in a direction relative to its current position. That direction is controlled in **Line 28** of the script.

On that line, a new CFrame is created using X, Y, and Z coordinates. In this example, the button moves relative to its Y axis.

```lua
-- Calculate new CFrame for button position
local offsetCFrame = CFrame.new(0, TWEEN_MOVE_DISTANCE * buttonState, 0)
local newCFrame = button.CFrame:ToWorldSpace(offsetCFrame)
```

To have the button move in a **different** direction, simply replace one of the desired coordinates with the line: `TWEEN_MOVE_DISTANCE * buttonState`. Set all other coordinates to 0.

For example, this line will move it relative to its X axis instead.

```lua
-- Calculate new CFrame for button position
local offsetCFrame = CFrame.new( TWEEN_MOVE_DISTANCE * buttonState, 0, 0)
local newCFrame = button.CFrame:ToWorldSpace(offsetCFrame)
```

### Tweening Time and Distance

The script includes the following variables that affect the tween's movement. Capitalized names like `TWEEN_TIME` are written specifically for this script to be modified.

Try changing the value of one variable below:

- Line 11 - `TWEEN_TIME`: The time in seconds it takes for a tween to happen.
- Line 12 - `TWEEN_MOVE_DISTANCE`: The distance the button moves in studs.

## Tweening Other Properties

Most properties with a numerical data type can be tweened. This section includes some common properties, like rotation, that can be used to bring more player feedback into your game. Keep in mind, you can also tween multiple properties at once.

For a full list of properties, see the `Class.TweenService` API page.

### Rotating

For rotation, combine tweening and CFrames instead of just using Vector3. Rotation tweens can be used to make creatures wiggle when pet, or coins twirl as they're picked up.

In the next script example, the creature's position and rotation are both tweened when clicked to show how happy it is when being pet.

<video controls src="../../assets/education/build-it-play-it-island-of-move-intermediate/exampleProject_tweeningPetRotate.mp4" width="100%"></video>

The code below will rotate an object based off the number of degrees in `TWEEN_ROT_ANGLES`.

```lua
-- Uses tween to make object rotate up and bounce
local TweenService = game:GetService("TweenService")
local partToTween = script.Parent
local clickDetector = partToTween:FindFirstChildWhichIsA("ClickDetector")
local inTween = false

-- Customizable variables
local TWEEN_TIME = 0.25
local TWEEN_ROT_ANGLES = -45
local TWEEN_MOVE_DISTANCE = 3

-- Tween variables
local tweenInfo = TweenInfo.new(
	TWEEN_TIME,  -- Time
	Enum.EasingStyle.Quad,  -- EasingStyle
	Enum.EasingDirection.Out,  -- EasingDirection
	1,  -- RepeatCount (when less than zero the tween will loop indefinitely)
	true  -- Reverses (tween will reverse once reaching its goal)
)

local function activateAction()
	-- If the object is tweening, prevent it from being tweened again
	if inTween == true then
		return
	end

	-- Calculate new CFrame for object position and rotation
	local offsetCFrame = CFrame.new(0, TWEEN_MOVE_DISTANCE, 0)
	local rotatedCFrame = CFrame.Angles(math.rad(TWEEN_ROT_ANGLES), 0, 0)
	offsetCFrame = offsetCFrame:ToWorldSpace(rotatedCFrame)
	local newCFrame = partToTween.CFrame:ToWorldSpace(offsetCFrame)

	-- Create a tween and play it
	local tweenObject = TweenService:Create(partToTween, tweenInfo, {CFrame = newCFrame})
	tweenObject:Play()
	inTween = true

	-- On tween completion, make object clickable again
	tweenObject.Completed:Connect(function()
		inTween = false
	end)
end

clickDetector.MouseClick:Connect(activateAction)
```

### Scaling

Changing the size of in-game objects can also show that a player interacted with them. For instance, pickups like health packs or gemstones can shrink when touched. To scale parts, change the tween goal to a new Vector3 of the desired size.

<video controls src="../../assets/education/build-it-play-it-island-of-move-intermediate/showScaleTween.mp4" width="100%"></video>

```lua
-- Tween the scale of a part when it's touched, then destroy it
local TweenService = game:GetService("TweenService")
local partToScale = script.Parent
local inTween = false

-- Customizable variables
local TWEEN_TIME = 1
local TWEEN_SCALE = Vector3.zero

-- Tween variables
local tweenInfo = TweenInfo.new(
	TWEEN_TIME,  -- Time
	Enum.EasingStyle.Exponential,  -- EasingStyle
	Enum.EasingDirection.Out  -- EasingDirection
)

local function onPartTouch(otherPart)
	-- If the object is tweening, prevent it from being tweened again
	if inTween == true then
		return
    end

	local partParent = otherPart.Parent
    local humanoid = partParent:FindFirstChildWhichIsA("Humanoid")

	if humanoid then
		-- Prevent further collisions on object since it has been picked up
        partToScale.CanCollide = false

		-- Create a tween and play it
		local tweenObject = TweenService:Create(partToScale, tweenInfo, {Size = TWEEN_SCALE})
		tweenObject:Play()
        inTween = true

		-- On tween completion, destroy object
		tweenObject.Completed:Connect(function()
			partToScale:Destroy()
		end)
	end
end

partToScale.Touched:Connect(onPartTouch)
```

### Color Changing

Parts can transition colors by tweening with Color3 values. For instance, enemies or destructible objects can flash colors to give feedback that they've been hit or clicked.

<video controls src="../../assets/education/build-it-play-it-island-of-move-intermediate/showScaleTween.mp4" width="100%"></video>

```lua
-- Tween an object's color upon click and destroy it after 3 clicks
local TweenService = game:GetService("TweenService")
local partToTween = script.Parent
local clickDetector = partToTween:FindFirstChildWhichIsA("ClickDetector")
local inTween = false

-- Customizeable variables
local TWEEN_TIME = 0.2
local COLOR_ON_HIT = Color3.fromRGB(255, 0, 50)
local hitCount = 0

-- Tween variables
local tweenInfo = TweenInfo.new(
	TWEEN_TIME,  -- Time
	Enum.EasingStyle.Exponential,  -- EasingStyle
	Enum.EasingDirection.InOut,  -- EasingDirection
	0,  -- RepeatCount (when less than zero the tween will loop indefinitely)
	true  -- Reverses (tween will reverse once reaching its goal)
)

local function activateAction()
	-- If the object is tweening, prevent it from being tweened again
	if inTween == true then
		return
	end

	-- Create a tween and play it
	local tweenObject = TweenService:Create(partToTween, tweenInfo, {Color = COLOR_ON_HIT})
	tweenObject:Play()
	inTween = true

	-- On tween completion, make object clickable again
	tweenObject.Completed:Connect(function()
		inTween = false
		-- Increment hit count
		hitCount += 1
		-- After 3 hits, destroy the object
		if hitCount == 3 then
			partToTween:Destroy()
		end
	end)
end

clickDetector.MouseClick:Connect(activateAction)
```

While this script uses a normal Part to change color, it's also possible to use this on MeshParts with an applied texture. MeshParts are often imported 3D models, rather than parts build directly in Roblox Studio.

If you are working with a fully textured MeshPart, we advise the following:

1. Use a SpecialMesh instead of a MeshPart. This is because a MeshPart's texture overrides the color being tinted by the script.

2. Change the script to modify the VertexColor of the SpecialMesh instead of the Color property.

## Project Sample

View all the script examples in this non-copylocked place. Get all the scripts to modify as well.

<table>

<tbody>
<tr>
<td><img src="../../assets/education/build-it-play-it-island-of-move-intermediate/bipi_tier2_extension_gameThubmanil.jpg"/></td>

<td>
Includes scripts for rotation, scaling, and color change tweens.
<a href="https://www.roblox.com/games/5598816550/Tween-Animation-Showcase">
<Button variant="contained">View</Button>
</a>
</td>

</tr>

</tbody>
</table>
