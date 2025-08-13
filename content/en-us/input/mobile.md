---
title: Mobile input
description: Explains Roblox support for mobile devices.
---

The majority of Roblox sessions are played on mobile devices, so it's important to consider the mobile [device orientation](#device-orientation) and other [cross‑platform](../projects/cross-platform.md) factors when designing an experience for a wide audience.

To simplify cross‑platform inputs, including player interaction with virtual buttons, Roblox provides the [Input Action System](../input/input-action-system.md) to define **actions** such as "jump," "sprint," or "shoot" and set up **bindings** for multiple hardware inputs to drive those actions.

Roblox also supports native mobile features like [haptic feedback](#haptic-feedback), touch gestures such as `Class.UserInputService.TouchSwipe|TouchSwipe` and `Class.UserInputService.TouchPinch|TouchPinch`, or accelerometer and gyroscope functionality on `Class.UserInputService.AccelerometerEnabled|AccelerometerEnabled` and `Class.UserInputService.GyroscopeEnabled|GyroscopeEnabled` devices.

## Input type detection

In cross‑platform development, it's important that you determine and respond to the `Class.UserInputService.PreferredInput|PreferredInput` type a player is using, normally to ensure that [UI&nbsp;elements](../ui/index.md#ui-objects) like on-screen buttons and menus work elegantly and support interaction across devices.

For example, a touch-enabled device assumes touch is the default input and that touch-buttons may appear for actions, but a player may choose to connect a bluetooth gamepad. In this case, touch remains a valid input, but you can assume the player wants to switch to the connected gamepad as the **primary** input type and possibly use touch as a backup input for on-screen UI.

See [input type detection](./index.md#input-type-detection) for more information.

## Device orientation

By default, Roblox experiences run in **landscape** mode, allowing the experience to switch between landscape "left" and landscape "right" as the player's device rotates. However, experiences can be locked to a particular orientation if desired.

There are five different orientation modes, including two sensor-based modes and three locked modes.&sup1; Each of these can be set as the **default** orientation through `Class.StarterGui.ScreenOrientation`, accessible through Studio's [Properties](../studio/properties.md) window.

<table>
<thead>
  <tr>
    <th colspan="2">Sensor Modes</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Enum.ScreenOrientation|LandscapeSensor`</td>
    <td>The default Roblox setting in which the experience always appears in landscape mode (no portrait mode) and the device detects its physical orientation to ensure the experience view is always oriented upward.</td>
  </tr>
  <tr>
    <td>`Enum.ScreenOrientation|Sensor`</td>
    <td>The device detects its physical orientation to ensure the experience view is always oriented upward, switching between landscape and portrait mode as needed.</td>
  </tr>
</tbody>
<thead>
  <tr>
    <th colspan="2">Locked Modes</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Enum.ScreenOrientation|LandscapeLeft`</td>
    <td>On devices with a virtual home/nav bar, its touch region is at the bottom of the display. On devices with a physical home button, the home button is to the left of the display.</td>
  </tr>
  <tr>
    <td>`Enum.ScreenOrientation|LandscapeRight`</td>
    <td>On devices with a virtual home/nav bar, its touch region is at the bottom of the display. On devices with a physical home button, the home button is to the right of the display.</td>
  </tr>
  <tr>
    <td>`Enum.ScreenOrientation|Portrait`</td>
    <td>On devices with a virtual home/nav bar, its touch region is at the bottom of the display. On devices with a physical home button, the home button is below the display.</td>
  </tr>
</tbody>
</table>

<figcaption>&sup1; Roblox does not include a "portrait upside-down" mode since many devices do not natively support that orientation</figcaption><br /><br />

Beyond the default `Class.StarterGui.ScreenOrientation` property, you can change orientation during gameplay through `Class.PlayerGui.ScreenOrientation`. This can be useful when an experience needs to enforce an orientation, such as locking the view to `Enum.ScreenOrientation|Portrait` for a minigame.

The following code in a `Class.LocalScript` sets the screen orientation to portrait after a short delay:

```lua title="LocalScript - Change Screen Orientation to Portrait"
local Players = game:GetService("Players")

local player = Players.LocalPlayer
local playerGui = player.PlayerGui

task.wait(5)

playerGui.ScreenOrientation = Enum.ScreenOrientation.Portrait
```

Finally, you can detect changes to screen orientation during gameplay by listening to value changes on the `Class.PlayerGui.CurrentScreenOrientation` property.

```lua title="LocalScript - Detect Screen Orientation Changes"
local Players = game:GetService("Players")

local player = Players.LocalPlayer
local playerGui = player.PlayerGui

local function onOrientationChange()
	print("Orientation changed to", playerGui.ScreenOrientation)
end

playerGui:GetPropertyChangedSignal("ScreenOrientation"):Connect(onOrientationChange)
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
