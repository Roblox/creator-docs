---
title: UI Animations
description: Explains how to animate GuiObjects using the process of tweening.
---

In animation, **tweening** is the process of generating intermediate frames between two key points in a sequence. When designing a [user interface](../ui/index.md), you can use tweening to transition a `Class.GuiObject` smoothly from one state to another, such as:

- Smoothly increasing the size of a button when a user selects it.
- Sliding UI menus in and out from the screen edges.
- Gradually animating a health bar between two widths when a user receives a health boost.

## Single-Property Tweens

### Position

To tween the **position** of a `Class.GuiObject`:

1. Set the `Class.GuiObject.AnchorPoint|AnchorPoint` for the object.
1. Determine `Datatype.UDim2` coordinates for the object's target position, using the **scale** parameters of `Datatype.UDim2` instead of exact pixel values so that the object tweens to the exact center of the screen.
1. Pass a `Datatype.TweenInfo` and the target position to `Class.TweenService:Create()`.
1. Play the tween with `Class.Tween:Play()`.

The following code snippet moves an `Class.ImageLabel` within a `Class.ScreenGui` to the exact center of the screen:

```lua title='UI Tween - Position' highlight='8,10,12,13,15'
local TweenService = game:GetService("TweenService")
local Players = game:GetService("Players")

local PlayerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local ScreenGui = PlayerGui:WaitForChild("ScreenGui")
local object = ScreenGui:WaitForChild("ImageLabel")

object.AnchorPoint = Vector2.new(0.5, 0.5)

local targetPosition = UDim2.new(0.5, 0, 0.5, 0)

local tweenInfo = TweenInfo.new(2)
local tween = TweenService:Create(object, tweenInfo, {Position = targetPosition})

tween:Play()
```

### Size

To tween the **size** of a `Class.GuiObject`:

1. Determine `Datatype.UDim2` coordinates for the object's target size, using the **scale** parameters of `Datatype.UDim2` instead of exact pixel values so that the object tweens to a relative percentage of the screen size.
1. Attach a `Class.UIAspectRatioConstraint` to the object to maintain its designed aspect ratio when tweening.
1. Pass a `Datatype.TweenInfo` and the target size to `Class.TweenService:Create()`.
1. Play the tween with `Class.Tween:Play()`.

The following code snippet scales an `Class.ImageLabel` within a `Class.ScreenGui` to 40% of the screen width or height (whichever is smaller) from the object's center anchor point:

```lua title='UI Tween - Size' highlight='8,10,11,13,16,18'
local TweenService = game:GetService("TweenService")
local Players = game:GetService("Players")

local PlayerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local ScreenGui = PlayerGui:WaitForChild("ScreenGui")
local object = ScreenGui:WaitForChild("ImageLabel")

object.AnchorPoint = Vector2.new(0.5, 0.5)

local aspectRatioConstraint = Instance.new("UIAspectRatioConstraint")
aspectRatioConstraint.Parent = object

local targetSize = UDim2.new(0.4, 0, 0.4, 0)

local tweenInfo = TweenInfo.new(2)
local tween = TweenService:Create(object, tweenInfo, {Size = targetSize})

tween:Play()
```

### Rotation

To tween the **rotation** of a `Class.GuiObject`:

1. Set the `Class.GuiObject.AnchorPoint|AnchorPoint` for the object to rotate around.
1. Determine the target `Class.GuiObject.Rotation|Rotation` for the object.
1. Pass a `Datatype.TweenInfo` and the target rotation to `Class.TweenService:Create()`.
1. Play the tween with `Class.Tween:Play()`.

```lua title='UI Tween - Size' highlight='8,10,13,15'
local TweenService = game:GetService("TweenService")
local Players = game:GetService("Players")

local PlayerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local ScreenGui = PlayerGui:WaitForChild("ScreenGui")
local object = ScreenGui:WaitForChild("ImageLabel")

object.AnchorPoint = Vector2.new(0.5, 0.5)

local targetRotation = 45

local tweenInfo = TweenInfo.new(2)
local tween = TweenService:Create(object, tweenInfo, {Rotation = targetRotation})

tween:Play()
```

### Transparency

Multiple properties control UI transparency, depending on the object type. You can tween each of these properties individually or combined through a [multi-property tween](#multi-property-tweens). Alternatively, you can tween an object's overall transparency by placing it inside a `Class.CanvasGroup` and tweening the group's `Class.CanvasGroup.GroupTransparency|GroupTransparency`.

<table>
    <thead>
        <tr>
            <th>UI Object</th>
            <th>Properties</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>`Class.Frame`</td>
            <td>`Class.GuiObject.BackgroundTransparency|BackgroundTransparency`</td>
        </tr>
		<tr>
            <td>`Class.TextLabel`</td>
            <td>`Class.GuiObject.BackgroundTransparency|BackgroundTransparency`, `Class.TextLabel.TextTransparency|TextTransparency`, `Class.TextLabel.TextStrokeTransparency|TextStrokeTransparency`</td>
        </tr>
		<tr>
            <td>`Class.TextButton`</td>
            <td>`Class.GuiObject.BackgroundTransparency|BackgroundTransparency`, `Class.TextButton.TextTransparency|TextTransparency`, `Class.TextButton.TextStrokeTransparency|TextStrokeTransparency`</td>
        </tr>
		<tr>
            <td>`Class.ImageLabel`</td>
            <td>`Class.GuiObject.BackgroundTransparency|BackgroundTransparency`, `Class.ImageLabel.ImageTransparency|ImageTransparency`</td>
        </tr>
		<tr>
            <td>`Class.ImageButton`</td>
            <td>`Class.GuiObject.BackgroundTransparency|BackgroundTransparency`, `Class.ImageButton.ImageTransparency|ImageTransparency`</td>
        </tr>
    </tbody>
</table>

<Alert severity="info">
As a modern alternative to `Class.TextLabel.TextStrokeTransparency` and `Class.TextButton.TextStrokeTransparency`, you can tween stroke transparency on a `Class.UIStroke` object as outlined in [Stroke](#stroke).
</Alert>

```lua title='UI Tween - Image Transparency' highlight='8,11,13'
local TweenService = game:GetService("TweenService")
local Players = game:GetService("Players")

local PlayerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local ScreenGui = PlayerGui:WaitForChild("ScreenGui")
local object = ScreenGui:WaitForChild("ImageLabel")

local targetTransparency = 0.8

local tweenInfo = TweenInfo.new(2)
local tween = TweenService:Create(object, tweenInfo, {ImageTransparency = targetTransparency})

tween:Play()
```

```lua title='UI Tween - Canvas Group Transparency' highlight='8,11,13'
local TweenService = game:GetService("TweenService")
local Players = game:GetService("Players")

local PlayerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local ScreenGui = PlayerGui:WaitForChild("ScreenGui")
local canvasGroup = ScreenGui:WaitForChild("CanvasGroup")

local targetTransparency = 0.8

local tweenInfo = TweenInfo.new(2)
local tween = TweenService:Create(canvasGroup, tweenInfo, {GroupTransparency = targetTransparency})

tween:Play()
```

### Color

Multiple properties control UI color, depending on the object type. You can tween each of these properties individually or combined through a [multi-property tween](#multi-property-tweens). Alternatively, you can tween an object's overall color by placing it inside a `Class.CanvasGroup` and tweening the group's `Class.CanvasGroup.GroupColor3|GroupColor3`.

<table>
    <thead>
        <tr>
            <th>UI Object</th>
            <th>Properties</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>`Class.Frame`</td>
            <td>`Class.GuiObject.BackgroundColor3|BackgroundColor3`, `Class.GuiObject.BorderColor3|BorderColor3`</td>
        </tr>
		<tr>
            <td>`Class.TextLabel`</td>
            <td>`Class.GuiObject.BackgroundColor3|BackgroundColor3`, `Class.GuiObject.BorderColor3|BorderColor3`, `Class.TextLabel.TextColor3|TextColor3`, `Class.TextLabel.TextStrokeColor3|TextStrokeColor3`</td>
        </tr>
		<tr>
            <td>`Class.TextButton`</td>
            <td>`Class.GuiObject.BackgroundColor3|BackgroundColor3`, `Class.GuiObject.BorderColor3|BorderColor3`, `Class.TextButton.TextColor3|TextColor3`, `Class.TextButton.TextStrokeColor3|TextStrokeColor3`</td>
        </tr>
		<tr>
            <td>`Class.ImageLabel`</td>
            <td>`Class.GuiObject.BackgroundColor3|BackgroundColor3`, `Class.GuiObject.BorderColor3|BorderColor3`, `Class.ImageLabel.ImageColor3|ImageColor3`</td>
        </tr>
		<tr>
            <td>`Class.ImageButton`</td>
            <td>`Class.GuiObject.BackgroundColor3|BackgroundColor3`, `Class.GuiObject.BorderColor3|BorderColor3`, `Class.ImageButton.ImageColor3|ImageColor3`</td>
        </tr>
    </tbody>
</table>

<Alert severity="info">
As a modern alternative to `Class.GuiObject.BorderColor3`, `Class.TextLabel.TextStrokeColor3`, and `Class.TextButton.TextStrokeColor3`, you can tween stroke color on a `Class.UIStroke` object as outlined in [Stroke](#stroke).
</Alert>

```lua title='UI Tween - Image Color' highlight='8,11,13'
local TweenService = game:GetService("TweenService")
local Players = game:GetService("Players")

local PlayerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local ScreenGui = PlayerGui:WaitForChild("ScreenGui")
local object = ScreenGui:WaitForChild("ImageLabel")

local targetColor = Color3.fromRGB(255, 0, 0)

local tweenInfo = TweenInfo.new(2)
local tween = TweenService:Create(object, tweenInfo, {ImageColor3 = targetColor})

tween:Play()
```

```lua title='UI Tween - Canvas Group Color' highlight='8,11,13'
local TweenService = game:GetService("TweenService")
local Players = game:GetService("Players")

local PlayerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local ScreenGui = PlayerGui:WaitForChild("ScreenGui")
local canvasGroup = ScreenGui:WaitForChild("CanvasGroup")

local targetColor = Color3.fromRGB(255, 0, 0)

local tweenInfo = TweenInfo.new(2)
local tween = TweenService:Create(canvasGroup, tweenInfo, {GroupColor3 = targetColor})

tween:Play()
```

### Stroke

Multiple properties control UI borders, depending on the object type.

<table>
    <thead>
        <tr>
            <th>UI Object</th>
            <th>Properties</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>`Class.Frame`</td>
            <td>`Class.GuiObject.BorderSizePixel|BorderSizePixel`, `Class.GuiObject.BorderColor3|BorderColor3`</td>
        </tr>
		<tr>
            <td>`Class.TextLabel`</td>
            <td>`Class.GuiObject.BorderSizePixel|BorderSizePixel`, `Class.GuiObject.BorderColor3|BorderColor3`, `Class.TextLabel.TextStrokeColor3|TextStrokeColor3`, `Class.TextLabel.TextStrokeTransparency|TextStrokeTransparency`</td>
        </tr>
		<tr>
            <td>`Class.TextButton`</td>
            <td>`Class.GuiObject.BorderSizePixel|BorderSizePixel`, `Class.GuiObject.BorderColor3|BorderColor3`, `Class.TextButton.TextStrokeColor3|TextStrokeColor3`, `Class.TextButton.TextStrokeTransparency|TextStrokeTransparency`</td>
        </tr>
		<tr>
            <td>`Class.ImageLabel`</td>
            <td>`Class.GuiObject.BorderSizePixel|BorderSizePixel`, `Class.GuiObject.BorderColor3|BorderColor3`</td>
        </tr>
		<tr>
            <td>`Class.ImageButton`</td>
            <td>`Class.GuiObject.BorderSizePixel|BorderSizePixel`, `Class.GuiObject.BorderColor3|BorderColor3`</td>
        </tr>
    </tbody>
</table>

Alternatively, you can apply a [UIStroke](../ui/layout-and-appearance.md#uistroke) child and tween its thickness, color, and/or transparency.

<table>
    <thead>
        <tr>
            <th>UI Object</th>
            <th>Properties</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>`Class.UIStroke`</td>
            <td>`Class.UIStroke.Color|Color`, `Class.UIStroke.Thickness|Thickness`, `Class.UIStroke.Transparency|Transparency`</td>
        </tr>
	</tbody>
</table>

```lua title='UI Tween - UIStroke Color & Thickness' highlight='8-11,13,14,17,19'
local TweenService = game:GetService("TweenService")
local Players = game:GetService("Players")

local PlayerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local ScreenGui = PlayerGui:WaitForChild("ScreenGui")
local object = ScreenGui:WaitForChild("TextLabel")

local stroke = Instance.new("UIStroke")
stroke.Color = Color3.fromRGB(255, 255, 255)
stroke.Thickness = 5
stroke.Parent = object

local targetColor = Color3.fromRGB(255, 0, 0)
local targetThickness = 10

local tweenInfo = TweenInfo.new(2)
local tween = TweenService:Create(stroke, tweenInfo, {Color = targetColor, Thickness = targetThickness})

tween:Play()
```

## Multi-Property Tweens

You can combine any of the [single-property tweens](#single-property-tweens) into more complex tweens by passing multiple target properties to `Class.TweenService:Create()`, for example **position&nbsp;+&nbsp;rotation** or **size&nbsp;+&nbsp;transparency**.

```lua title='UI Tween - Position & Rotation' highlight='8,10,11,14,16'
local TweenService = game:GetService("TweenService")
local Players = game:GetService("Players")

local PlayerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local ScreenGui = PlayerGui:WaitForChild("ScreenGui")
local object = ScreenGui:WaitForChild("ImageLabel")

object.AnchorPoint = Vector2.new(0.5, 0.5)

local targetPosition = UDim2.new(0.5, 0, 0.5, 0)
local targetRotation = 45

local tweenInfo = TweenInfo.new(2)
local tween = TweenService:Create(object, tweenInfo, {Position = targetPosition, Rotation = targetRotation})

tween:Play()
```

```lua title='UI Tween - Size & Transparency' highlight='13,14,17,19'
local TweenService = game:GetService("TweenService")
local Players = game:GetService("Players")

local PlayerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local ScreenGui = PlayerGui:WaitForChild("ScreenGui")
local object = ScreenGui:WaitForChild("ImageLabel")

object.AnchorPoint = Vector2.new(0.5, 0.5)

local aspectRatioConstraint = Instance.new("UIAspectRatioConstraint")
aspectRatioConstraint.Parent = object

local targetSize = UDim2.new(0.4, 0, 0.4, 0)
local targetTransparency = 0.8

local tweenInfo = TweenInfo.new(2)
local tween = TweenService:Create(object, tweenInfo, {Size = targetSize, ImageTransparency = targetTransparency})

tween:Play()
```

## Tween Sequences

You can chain UI animations to occur one after another by playing subsequent tweens upon the previous tween's `Class.TweenBase.Completed|Completed` event. For example, the following script moves an object to the center of the screen, then rotates it by 45&deg;.

```lua title='UI Tween Sequence' highlight='10,11,14,15,18,21-23'
local TweenService = game:GetService("TweenService")
local Players = game:GetService("Players")

local PlayerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local ScreenGui = PlayerGui:WaitForChild("ScreenGui")
local object = ScreenGui:WaitForChild("ImageLabel")

object.AnchorPoint = Vector2.new(0.5, 0.5)

local targetPosition = UDim2.new(0.5, 0, 0.5, 0)
local targetRotation = 45

local tweenInfo = TweenInfo.new(2)
local positionTween = TweenService:Create(object, tweenInfo, {Position = targetPosition})
local rotationTween = TweenService:Create(object, tweenInfo, {Rotation = targetRotation})

-- Initially play position tween
positionTween:Play()

-- Play rotation tween upon completion of position tween
positionTween.Completed:Connect(function()
	rotationTween:Play()
end)
```

## Easing Options

Using the easing options of `Datatype.TweenInfo`, you can control the easing **style** and **direction** of UI animations.

### Style

`Enum.EasingStyle` sets the rate of interpolation from start to end. By default, easing style is set to **Quad**.

<table>
<thead>
  <tr>
    <th>Style</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><b>Linear</b></td>
    <td>Moves at a constant speed.</td>
  </tr>
  <tr>
    <td><b>Sine</b></td>
    <td>Speed is determined by a sine wave.</td>
  </tr>
  <tr>
    <td><b>Quad</b></td>
    <td>Speed is determined by quadratic interpolation.</td>
  </tr>
  <tr>
    <td><b>Cubic</b></td>
    <td>Similar to **Quad**, but starts at a lower speed.</td>
  </tr>
  <tr>
    <td><b>Quart</b></td>
    <td>Similar to **Quad**, but starts at a higher speed.</td>
  </tr>
  <tr>
    <td><b>Quint</b></td>
    <td>Similar to **Quart**, but starts at a higher speed.</td>
  </tr>
  <tr>
    <td><b>Exponential</b></td>
    <td>Speed reduces very quickly as tween approaches the target.</td>
  </tr>
  <tr>
    <td><b>Circular</b></td>
    <td>Follows a circular arc, slowing down as tween approaches the target.</td>
  </tr>
  <tr>
    <td><b>Back</b></td>
    <td>Slightly overshoots the target, then backs into place.</td>
  </tr>
  <tr>
    <td><b>Bounce</b></td>
    <td>Bounces backwards multiple times after reaching the target, before eventually settling.</td>
  </tr>
  <tr>
    <td><b>Elastic</b></td>
    <td>Moves as if attached to a rubber band, overshooting the target several times.</td>
  </tr>
</tbody>
</table>

<video src="../assets/ui/ui-animation/Easing-Style.mp4" controls width="100%"></video>

```lua title='Easing Style - Cubic' highlight='1'
local tweenInfo = TweenInfo.new(2, Enum.EasingStyle.Cubic)
local tween = TweenService:Create(object, tweenInfo, {Rotation = 45})
```

### Direction

`Enum.EasingDirection` defines how the [easing style](#style) interpolation applies to an object, with a default of **Out**. Note that a tween with **Linear** easing style is not affected, as linear interpolation is constant from start to end.

<table>
<thead>
  <tr>
    <th>Direction</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><b>In</b></td>
    <td>The easing style applies in a forward direction.</td>
  </tr>
  <tr>
    <td><b>Out</b></td>
    <td>The easing style applies in a reverse direction.</td>
  </tr>
  <tr>
    <td><b>InOut</b></td>
    <td>The easing style applies forward for the first half and in reverse for the second half.</td>
  </tr>
</tbody>
</table>

<video src="../assets/ui/ui-animation/Easing-Direction.mp4" controls width="100%"></video>

```lua title='Easing Direction - InOut' highlight='1'
local tweenInfo = TweenInfo.new(2, Enum.EasingStyle.Cubic, Enum.EasingDirection.InOut)
local tween = TweenService:Create(object, tweenInfo, {Rotation = 45})
```

## Animating Text

You can easily enhance text-based UI, such as cutscene banners, player instructions, and prompts, with animated effects.

### Typewriter Effect

The "typewriter" effect is ideal for `Class.TextLabel|TextLabels` that tell a story, output NPC conversations, etc.

<video src="../assets/ui/ui-animation/Text-Typewriter.mp4" controls width="80%"></video>

1. Create a new `Class.ModuleScript` within **ReplicatedStorage**.
1. Rename the new script **AnimateUI**.

   <img src="../assets/ui/ui-animation/ModuleScript-AnimateUI.png" width="320" />

1. Paste the following code into the script:

   ```lua title='ModuleScript - AnimateUI'
   local LocalizationService = game:GetService("LocalizationService")
   local Players = game:GetService("Players")

   local SOURCE_LOCALE = "en"
   local translator = nil

   local AnimateUI = {}

   function AnimateUI.loadTranslator()
   	pcall(function()
   		translator = LocalizationService:GetTranslatorForPlayerAsync(Players.LocalPlayer)
   	end)
   	if not translator then
   		pcall(function()
   			translator = LocalizationService:GetTranslatorForLocaleAsync(SOURCE_LOCALE)
   		end)
   	end
   end

   function AnimateUI.typeWrite(guiObject, text, delayBetweenChars)
   	guiObject.Visible = true
   	guiObject.AutoLocalize = false
   	local displayText = text

   	-- Translate text if possible
   	if translator then
   		displayText = translator:Translate(guiObject, text)
   	end

   	-- Replace line break tags so grapheme loop will not miss those characters
   	displayText = displayText:gsub("<br%s*/>", "\n")
    	-- Remove RichText tags since char-by-char animation will break the tags
   	displayText = displayText:gsub("<[^<>]->", "")

   	-- Set translated/modified text on parent
   	guiObject.Text = displayText

   	local index = 0
   	for first, last in utf8.graphemes(displayText) do
   		index += 1
   		guiObject.MaxVisibleGraphemes = index
   		task.wait(delayBetweenChars)
   	end
   end

   return AnimateUI
   ```

   <Alert severity="info">
   If your experience's **source language** is not English (`"en"`), change the locale code for `SOURCE_LOCALE` to match the source language in [localization settings](../production/localization/index.md#localization-settings).
   </Alert>

1. Create a `Class.TextLabel` in a suitable location, such as within a `Class.ScreenGui` parented to `Class.StarterGui`.
1. Insert a new `Class.LocalScript` as a direct child of the label and paste in the following code. Note that each message is output by calling `AnimateUI.typeWrite()` with parameters for the parent object, the string to output, and the delay between characters.

   ```lua title='LocalScript' highlight='3,5,10,11,15,16'
   local ReplicatedStorage = game:GetService("ReplicatedStorage")

   local AnimateUI = require(ReplicatedStorage:WaitForChild("AnimateUI"))

   local label = script.Parent

   -- Load translator if game is localized
   --AnimateUI.loadTranslator()

   local message1 = [[Beyond this door is the<br /><font size="46" color="rgb(255,50,25)">Great Zorgoth...</font> <font size="40">🗡</font>]]
   AnimateUI.typeWrite(label, message1, 0.05)

   task.wait(1)

   local message2 = [[...who rules this dungeon <font color="rgb(255,200,50)">unchallenged!</font> <font size="30">😈</font>]]
   AnimateUI.typeWrite(label, message2, 0.05)
   ```
