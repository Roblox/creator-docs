---
title: User interface
prev: /resources/beyond-the-dark/sound-design
description: Explains the design concepts for user-interface effects in Beyond The Dark.
---

We wanted to add an interactive map UI to let users consume information in the space station that looked and felt like it lived in this world. We decided to build the map inside the 3D space instead of on a screen that overlays the experience. This type of diegetic visualization allows for more immersion with the world as opposed to feeling like it is a completely separate experience.

## Design the map

To design the map:

1. We mocked the UI in an external application and came up with a rough idea of how we wanted it to look.
   <img
   alt="UI Mock"
   src="../../assets/resources/beyond-the-dark/user-interface/UI-Mock.png"
   width="80%" />

2. We exported the individual pieces of the map as `.png` and imported them into Studio.

   <img
   alt="UI Elements Exported"
   src="../../assets/resources/beyond-the-dark/user-interface/UI-Export.png"
   width="80%" />

## Build the map

Building the map inside Studio involved using `Class.Part|Parts` and `Class.SurfaceGui|SurfaceGuis`.

1. For non-interactive elements, all we needed to do is add a `Class.SurfaceGui` object to the part.
2. For interactive elements, the `Class.SurfaceGui` also needs to be inside the `Class.StarterGui` container, with the `Adornee` property linked to the appropriate part in the 3D workspace. Doing so allows you to add button events.

   <video
   controls
   src="../../assets/resources/beyond-the-dark/user-interface/StarterGui-Adornee.mp4"
   width="320"></video>

3. To achieve a parallax effect, we used three separate `Class.ScreenGui` instances assigned to three unique `Parts` with different **X** values.

   <img
   alt="Parallax Example"
   src="../../assets/resources/beyond-the-dark/user-interface/Parallax-Example.png"
   width="80%" />

4. We then added a glow effect with the `Class.SurfaceGui.LightInfluence` property. If you set the property value to anything less than 1, it enables the `Class.SurfaceGui.Brightness` property. By adjusting the brightness, you can increase the glow emitting from the image.

   <video
   controls
   src="../../assets/resources/beyond-the-dark/user-interface/Light-Properties.mp4"
   width="75%"></video>

5. To let users toggle the display of the map, we used a `Class.ProximityPrompt` that we attached to a 3D model. This is an easy way to allow user interaction with world elements.

   <img
   alt="Proximity Prompt in Explorer"
   src="../../assets/resources/beyond-the-dark/user-interface/Proximity-Prompt.png"
   width="320" />

6. Finally, using a UITweenModule ModuleScript inside ReplicatedStorage, we animated hiding and showing the UI with TweenService and a bit of logic for determining the state. By tracking what the user clicked, we could hide and show elements by tweening various properties like alpha, position, and size.

   <img
   alt="PUI Tween Module in Explorer"
   src="../../assets/resources/beyond-the-dark/user-interface/UITweenModule.png"
   width="320" />

   ```lua title="UITweenModule ModuleScript"
   local TweenService = game:GetService("TweenService")
   local UITween = {}

   -- for fading images
   function UITween.fadePart(object, amount, time, delay)

   	local tweenAlpha = TweenInfo.new(
   		time, --Time
   		Enum.EasingStyle.Quad, --EasingStyle
   		Enum.EasingDirection.Out, --EasingDirection
   		0, --Repeat count
   		false, --Reverses if true
   		delay --Delay time
   	)

   	local tween = TweenService:Create(object, tweenAlpha, {Transparency = amount})
   	tween:Play()
   end

   function UITween.fade(object, amount, time, delay)

   	local tweenAlpha = TweenInfo.new(
   		time, --Time
   		Enum.EasingStyle.Quad, --EasingStyle
   		Enum.EasingDirection.Out, --EasingDirection
   		0, --Repeat count
   		false, --Reverses if true
   		delay --Delay time
   	)

   	local tween = TweenService:Create(object, tweenAlpha, {ImageTransparency = amount})
   	tween:Play()
   end

   -- for fading images
   function UITween.fadeBackground(object, amount, time, delay)

   	local tweenAlpha = TweenInfo.new(
   		time, --Time
   		Enum.EasingStyle.Quad, --EasingStyle
   		Enum.EasingDirection.Out, --EasingDirection
   		0, --Repeat count
   		false, --Reverses if true
   		delay --Delay time
   	)

   	local tween = TweenService:Create(object, tweenAlpha, {BackgroundTransparency = amount})
   	tween:Play()
   end

   -- for fading text
   function UITween.fadeText(object, amount, time, delay)

   	local tweenAlpha = TweenInfo.new(
   		time, --Time
   		Enum.EasingStyle.Quad, --EasingStyle
   		Enum.EasingDirection.Out, --EasingDirection
   		0, --Repeat count
   		false, --Reverses if true
   		delay --Delay time
   	)

   	local tween1 = TweenService:Create(object, tweenAlpha, {TextTransparency = amount})
   	tween1:Play()
   end

   -- for moving text and images
   function UITween.move(object, position, time, delay)

   	task.wait(delay)
   	object:TweenPosition(position, Enum.EasingDirection.Out, Enum.EasingStyle.Quint, time)
   end

   -- for changing size
   function UITween.size(object, size, time, delay, override, callback)

   	local tweenSize = TweenInfo.new(
   		time, --Time
   		Enum.EasingStyle.Quint, --EasingStyle
   		Enum.EasingDirection.Out, --EasingDirection
   		0, --Repeat count
   		false, --Reverses if true
   		delay, --Delay time
   		override,
   		callback
   	)

   	local tween = TweenService:Create(object, tweenSize, {Size = size})
   	tween:Play()
   end

   function UITween.rotate(object, rotation, time, delay, override, callback)

   	local tweenSize = TweenInfo.new(
   		time, --Time
   		Enum.EasingStyle.Quint, --EasingStyle
   		Enum.EasingDirection.Out, --EasingDirection
   		0, --Repeat count
   		false, --Reverses if true
   		delay, --Delay time
   		override,
   		callback
   	)

   	local tween = TweenService:Create(object, tweenSize, {Rotation = rotation})
   	tween:Play()
   end

   -- for blurring the game camera
   function UITween.blur(object, amount, time)

   	local tweenInfo = TweenInfo.new(time, Enum.EasingStyle.Linear, Enum.EasingDirection.Out, 0, false, 0)
   	local tween = TweenService:Create(object, tweenInfo, {Size = amount})
   	tween:Play()
   end

   -- for blurring the game camera
   function UITween.turnOn(object, amount, time)

   	local tweenInfo = TweenInfo.new(time, Enum.EasingStyle.Linear, Enum.EasingDirection.Out, 0, false, 0)
   	local tween = TweenService:Create(object, tweenInfo, {Brightness = amount})
   	tween:Play()
   end

   return UITween
   ```

   ```lua title="Applying UI Tween to Objects"
   local ReplicatedStorage = game:GetService("ReplicatedStorage")

   -- Add UITween Module
   local UITween = require(ReplicatedStorage.UITweenModule)

   -- Find player Guis and UI objects
   local playerGui = game:GetService('Players').LocalPlayer:WaitForChild('PlayerGui')
   local screenGuiMapUIFrame = playerGui:WaitForChild("ScreenGuiMapUIFrame").SurfaceGui
   local mapUIFrameStroke = screenGuiMapUIFrame.FrameStroke
   local mapUIFrameFill = screenGuiMapUIFrame.FrameFill

   -- Sizes used for tweening
   local frameSizeStart = UDim2.new(0, 0, 0, 0)
   local frameSizeMid = UDim2.new(1, 0, 0.05, 0)
   local frameSizeEnd = UDim2.new(1, 0, 1, 0)

   -- Example Tweening
   UITween.fade(mapUIFrameStroke, 0, 2, 0)
   UITween.size(mapUIFrameStroke, frameSizeMid, 0.4, 0)
   UITween.fade(mapUIFrameFill, 0, 2, 0.5)
   UITween.size(mapUIFrameFill, frameSizeEnd, 0.4, 0.25)
   task.wait(0.25)
   UITween.size(mapUIFrameStroke, frameSizeMid, 0.4, 0)
   UITween.size(mapUIFrameFill, frameSizeMid, 0.4, 0.25)
   task.wait(0.25)
   UITween.size(mapUIFrameStroke, frameSizeEnd, 0.4, 0)
   UITween.size(mapUIFrameFill, frameSizeEnd, 0.4, 0.25)
   ```

Here's the final result of the interactive map:

<video
  controls
  src="../../assets/resources/beyond-the-dark/user-interface/Final-UI.mp4"
  width="75%"></video>
