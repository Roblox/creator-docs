---
title: Mobile input
description: Explains Roblox support for mobile devices.
---

Over half of all Roblox sessions are played on mobile devices, so it's important to consider cross-platform accessibility when designing an experience for a wide audience. For mobile inputs, design around the [device orientation](#device-orientation) that you intend players to use in your experience, and consider that the player may have other input devices connected such as a bluetooth [mouse/keyboard](../input/mouse-and-keyboard.md) or [gamepad](../input/gamepad.md).

## Device orientation

On phones and tablets, the device orientation considerably affects the player experience and interaction. For example, landscape mode is best operated with two thumbs while portrait mode may lend itself to one-finger interface.

By default, Roblox experiences run in landscape mode, allowing the experience to switch between landscape "left" and landscape "right" as the player's device rotates. However, experiences can be locked to a particular orientation if desired.

### Orientation modes

There are five different orientation modes, including two sensor-based modes and three locked modes.

<table>
<thead>
  <tr>
    <th colspan="2">Sensor modes</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Landscape sensor</td>
    <td>The default Roblox setting in which the experience always appears in landscape mode (no portrait mode) and the device detects its physical orientation to ensure the experience view is always oriented upward.</td>
  </tr>
  <tr>
    <td>Sensor</td>
    <td>The device detects its physical orientation to ensure the experience view is always oriented upward, switching between landscape and portrait mode as needed.</td>
  </tr>
</tbody>
</table>

<table>
<thead>
  <tr>
    <th colspan="2">Locked modes</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Landscape left</td>
    <td>On devices with a physical home button, the home button is to the left of the display. On devices with a virtual home/nav bar, its touch region is at the bottom of the display.</td>
  </tr>
  <tr>
    <td>Landscape right</td>
    <td>On devices with a physical home button, the home button is to the right of the display. On devices with a virtual home/nav bar, its touch region is at the bottom of the display.</td>
  </tr>
  <tr>
    <td>Portrait</td>
    <td>On devices with a physical home button, the home button is below the display. On devices with a virtual home/nav bar, its touch region is at the bottom of the display.</td>
  </tr>
</tbody>
</table>

<Alert severity="warning">
Roblox does not include a "portrait upside-down" mode since many devices do not natively support that orientation.
</Alert>

### Orientation properties

When setting an orientation, you can set the [starting orientation](#starting-orientation), the [in-experience orientation](#in-experience-orientation), and the [current orientation](#current-orientation).

#### Starting orientation

`Class.StarterGui.ScreenOrientation` sets the default orientation for a place. Acceptable values include:

- `Enum.ScreenOrientation|ScreenOrientation.LandscapeSensor`
- `Enum.ScreenOrientation|ScreenOrientation.Sensor`
- `Enum.ScreenOrientation|ScreenOrientation.LandscapeLeft`
- `Enum.ScreenOrientation|ScreenOrientation.LandscapeRight`
- `Enum.ScreenOrientation|ScreenOrientation.Portrait`

Because this property affects all new players who join the experience, you can set its value in `Class.StarterGui.ScreenOrientation` within Studio.

#### In-experience orientation

`Class.PlayerGui.ScreenOrientation` explicitly changes the experience's orientation for a player. When this property is set to one of the `Enum.ScreenOrientation` enums in a `Class.LocalScript`, the experience will immediately orient itself to match the setting. This can be useful when an experience needs to provide a particular experience like locking the view to portrait for a minigame.

The following code sample in a `Class.LocalScript` sets the screen orientation to portrait:

```lua
local Players = game:GetService("Players")
local playerGUI = Players.LocalPlayer:WaitForChild("PlayerGui")

task.wait(2)

playerGUI.ScreenOrientation = Enum.ScreenOrientation.Portrait
```

#### Current orientation

`Class.PlayerGui.CurrentScreenOrientation` gets the current device orientation. Possible values include:

- `Enum.ScreenOrientation|ScreenOrientation.LandscapeLeft`
- `Enum.ScreenOrientation|ScreenOrientation.LandscapeRight`
- `Enum.ScreenOrientation|ScreenOrientation.Portrait`

The following code prints the player's current screen orientation:

```lua
local Players = game:GetService("Players")
local playerGUI = Players.LocalPlayer:WaitForChild("PlayerGui")

print(playerGUI.CurrentScreenOrientation)
```

## Haptic feedback

Most mobile devices have motors built in to provide haptic feedback. Adding rumbles and vibrations can greatly enhance a player's experience and provide subtle feedback beyond visuals or audio.

Roblox supports haptics for haptic-capable devices including most iPhone, Pixel, and Samsung Galaxy devices. Haptic feedback is managed through `Class.HapticEffect` instances which can be set to a specific `Class.HapticEffect.Type|Type` such as `Enum.HapticEffectType|GameplayCollision` or `Enum.HapticEffectType|UIClick`.

Once a `Class.HapticEffect` is in place, you can initiate it through the `Class.HapticEffect:Play()|Play()` method, for instance:

```lua
local Workspace = game:GetService("Workspace")

local effect = Instance.new("HapticEffect")
effect.Type = Enum.HapticEffectType.GameplayExplosion
effect.Parent = Workspace

-- Play the haptic effect
effect:Play()
```

## Detect other devices

In cross-platform experiences, it's important to reference the player's preferred input options by displaying input options for the actively used device. For example, a mobile device can have a [mouse and keyboard](./mouse-and-keyboard.md) or [gamepad](./gamepad.md) connected, or it's possible that a desktop has a touchscreen enabled. If multiple input sources are enabled, you can use `Class.UserInputService:GetLastInputType()|GetLastInputType()` to get the player's last used input device.

As a foundation, you can use the following `Class.ModuleScript`, placed within `Class.ReplicatedStorage` and renamed to **UserInputModule**, to fetch the player's input type, after which you can adapt the UI layout or context to your experience's specific needs.

```lua
local UserInputService = game:GetService("UserInputService")

local UserInput = {}

local inputTypeString
-- If device has active keyboard and mouse, assume those inputs
if UserInputService.KeyboardEnabled and UserInputService.MouseEnabled then
	inputTypeString = "Keyboard/Mouse"
-- Else if device has touch capability but no keyboard and mouse, assume touch input
elseif UserInputService.TouchEnabled then
	inputTypeString = "Touch"
-- Else if device has an active gamepad, assume gamepad input
elseif UserInputService.GamepadEnabled then
	inputTypeString = "Gamepad"
end

function UserInput.getInputType()
	local lastInputEnum = UserInputService:GetLastInputType()

	if lastInputEnum == Enum.UserInputType.Keyboard or string.find(tostring(lastInputEnum.Name), "MouseButton") or lastInputEnum == Enum.UserInputType.MouseWheel then
		inputTypeString = "Keyboard/Mouse"
	elseif lastInputEnum == Enum.UserInputType.Touch then
		inputTypeString = "Touch"
	elseif string.find(tostring(lastInputEnum.Name), "Gamepad") then
		inputTypeString = "Gamepad"
	end
	return inputTypeString, lastInputEnum
end

return UserInput
```

Once the **UserInputModule** script is in place, use the following code sample in a `Class.LocalScript` to get the user's last input type:

```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- Require module
local UserInputModule = require(ReplicatedStorage:WaitForChild("UserInputModule"))

local currentUserInput, inputEnum = UserInputModule.getInputType()
print(currentUserInput, inputEnum)
```
