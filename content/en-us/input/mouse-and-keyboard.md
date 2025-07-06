---
title: Mouse and keyboard input
description: Explains Roblox support for computer mice and keyboards.
---

A large percentage of Roblox sessions are played on devices with a mouse and keyboard, so it's important to properly support these inputs when designing an experience for a wide audience. Once you're comfortable with mouse and keyboard inputs, make your experience compatible across multiple platforms by setting up [mobile](../input/mobile.md) and [gamepad](./gamepad.md) inputs.

For convenience, Roblox sets the most common mouse and keyboard inputs as [default bindings](#roblox-default-bindings) which, except for the reserved bindings, you can overwrite.

## Generic mouse input

Like all device inputs, you can capture mouse inputs using `Class.UserInputService`. This service provides a scalable way to capture input changes and device input states for multiple devices at once. Roblox also supports legacy mouse input detection with `Class.PlayerMouse` and `Class.ClickDetector|ClickDetectors`.

The following `Class.LocalScript`, when placed in `Class.StarterPlayerScripts`, captures mouse clicks and prints the mouse position to the [Output](../studio/output.md) window:

```lua title="LocalScript - Output Mouse Click and Position"
local UserInputService = game:GetService("UserInputService")

local function onInputEnded(inputObject, processedEvent)
	-- First check if the "processedEvent" is true
	-- This indicates that another script had already processed the input, so this one is ignored
	if processedEvent then return end

	-- Next, check that the input was a mouse event
	if inputObject.UserInputType == Enum.UserInputType.MouseButton1 then
		print("Left Mouse button was pressed:", inputObject.Position)
	elseif inputObject.UserInputType == Enum.UserInputType.MouseButton2 then
		print("Right Mouse button was pressed:", inputObject.Position)
	end
end

UserInputService.InputEnded:Connect(onInputEnded)
```

## Generic keyboard input

To access keyboard events, use the `Class.UserInputService.InputEnded` event to track whenever any keystroke or other input ends. Similar to [mouse](#generic-mouse-input) events, this event only works within a `Class.LocalScript`.

The following `Class.LocalScript`, when placed in `Class.StarterPlayerScripts`, prints the `Enum.KeyCode` of a pressed key to the [Output](../studio/output.md) window:

```lua
local UserInputService = game:GetService("UserInputService")

local function onInputEnded(inputObject, processedEvent)
	-- First check if the "processedEvent" is true
	-- This indicates that another script had already processed the input, so this one is ignored.
	if processedEvent then return end

	-- Next, check that the input was a keyboard event
	if inputObject.UserInputType == Enum.UserInputType.Keyboard then
		print("A key was released: " .. inputObject.KeyCode.Name)
	end
end

UserInputService.InputEnded:Connect(onInputEnded)
```

## Character movement modes

You can set mouse and keyboard movement controls schemes for Roblox experiences by changing the values of `Class.StarterPlayer.DevComputerMovementMode` to one of the following:

<table>
<thead>
  <tr>
    <th>Option</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
	<tr>
    <td>`Enum.DevComputerMovementMode|UserChoice`</td>
    <td>Allows players to choose their desired control scheme from the in-experience menu. This is the default movement mode.</td>
  </tr>
	<tr>
    <td>`Enum.DevComputerMovementMode|KeyboardMouse`</td>
    <td>Player's control their character with the keyboard and mouse using the [default bindings](#roblox-default-bindings).</td>
  </tr>
  <tr>
    <td>`Enum.DevComputerMovementMode|ClickToMove`</td>
    <td>Players can only move through the experience by clicking a target location. The player's character will automatically jump when hitting a surmountable obstacle/gap while moving to the click destination.</td>
  </tr>
  <tr>
    <td>`Enum.DevComputerMovementMode|Scriptable`</td>
    <td>Disables all default controls and allows you to script your own control scheme.</td>
  </tr>
</tbody>
</table>

## Mouse icons

You can customize the appearance and behavior of a player's mouse icon within your experience to create a cohesive style across all of your UI elements. This includes temporarily changing the player's mouse icon in specific circumstances, such as hovering over a button.

### Change the icon

You can change the player's mouse icon in a `Class.LocalScript` by setting the `Class.UserInputService.MouseIcon|MouseIcon` property in `Class.UserInputService` to a custom Roblox asset ID. For example, the following `Class.LocalScript` changes the player's default mouse icon to a circle with a blue dot in the middle:

```lua highlight="3"
local UserInputService = game:GetService("UserInputService")

UserInputService.MouseIcon = "rbxassetid://3400146391"
```

### Hide the icon

You can hide the player's mouse icon by setting the `Class.UserInputService.MouseIconEnabled` to `false` in a `Class.LocalScript`. For example, the following code switches the mouse icon from visible to invisible and back every two seconds:

```lua highlight="5,7"
local UserInputService = game:GetService("UserInputService")

while true do
	task.wait(2)
	UserInputService.MouseIconEnabled = false
	task.wait(2)
	UserInputService.MouseIconEnabled = true
end
```

### Lock the icon

You can lock the mouse icon's position to the screen using `Class.UserInputService.MouseBehavior` with a `Enum.MouseBehavior` value of `Enum.MouseBehavior|LockCurrentPosition` or `Enum.MouseBehavior|LockCenter`, then unlock it again with a value of `Enum.MouseBehavior|Default`.

If a player's mouse icon is locked in a position, `Class.UserInputService.InputChanged` still fires when the player moves the mouse, passing in the distance the mouse has moved. For example, the following code sample locks the player's mouse icon after one second, then Studio prints the mouse delta whenever the player moves their mouse:

```lua highlight="5"
local UserInputService = game:GetService("UserInputService")

task.wait(5)

UserInputService.MouseBehavior = Enum.MouseBehavior.LockCurrentPosition

UserInputService.InputChanged:Connect(function(inputObject)
	if inputObject.UserInputType == Enum.UserInputType.MouseMovement then
		print("Mouse delta is (" .. tostring(inputObject.Delta.X) .. ", " ..  tostring(inputObject.Delta.Y) .. ")")
	end
end)
```

## Roblox default bindings

Roblox provides default key bindings for all experiences. These are the most common inputs used for movement, camera control, and basic environment interaction.

`Enum.CoreGuiType` features, such as the **Backpack** or **Chat**, have a list of additional default inputs. You can't overwrite reserved inputs such as <kbd>Esc</kbd> (Roblox menu) or <kbd>F9</kbd> (Developer Console).

<Tabs>
<TabItem label="Global">
These bindings are Roblox defaults, but you can override them with custom scripts. Most Roblox players are familiar with these controls, so you should only override them in specific cases.

<table size="small">
<thead>
  <tr>
    <th>Inputs</th>
    <th>Action</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><kbd>W</kbd> <kbd>↑</kbd></td>
    <td>Move forward</td>
  </tr>
	<tr>
    <td><kbd>S</kbd> <kbd>↓</kbd></td>
    <td>Move back</td>
  </tr>
	<tr>
    <td><kbd>A</kbd></td>
    <td>Move left</td>
  </tr>
	<tr>
    <td><kbd>D</kbd></td>
    <td>Move right</td>
  </tr>
  <tr>
    <td><kbd>Spacebar</kbd></td>
    <td>Jump</td>
  </tr>
	<tr>
    <td><kbd>←</kbd> <kbd>→</kbd></td>
    <td>Rotate camera left or right</td>
  </tr>
  <tr>
    <td>**Right&nbsp;Mouse&nbsp;Button**</td>
    <td>When pressed, dragging the mouse moves the camera view around</td>
  </tr>
  <tr>
    <td>**Mouse&nbsp;Scroll&nbsp;Wheel**<br /><kbd>I</kbd> <kbd>O</kbd></td>
    <td>Zoom the camera in or out</td>
  </tr>
	<tr>
    <td><kbd>Shift</kbd></td>
    <td>Toggle mouse lock if <code>Class.StarterPlayer.EnableMouseLockOption|EnableMouseLockOption</code> is enabled</td>
  </tr>
</tbody>
</table>
</TabItem>
<TabItem label="Feature-Specific">
Some `Class.CoreGui` features also have default bindings. These inputs are reserved by the features unless you disable the respective feature using `Class.StarterGui:SetCoreGuiEnabled()|SetCoreGuiEnabled()`.

<table size="small">
<thead>
  <tr>
    <th>Inputs</th>
    <th>Action</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><kbd>`</kbd></td>
    <td>Toggle backpack</td>
  </tr>
	<tr>
    <td><kbd>0</kbd>-<kbd>9</kbd></td>
    <td>Equip/unequip tools</td>
  </tr>
  <tr>
    <td>**Left&nbsp;Mouse&nbsp;Button**</td>
    <td>Use equipped tool</td>
  </tr>
	<tr>
    <td><kbd>Backspace</kbd></td>
    <td>Drop equipped tool</td>
  </tr>
	<tr>
    <td><kbd>/</kbd></td>
    <td>Open [text chat](../chat/in-experience-text-chat.md)</td>
  </tr>
	<tr>
    <td><kbd>Tab</kbd></td>
    <td>Show/hide current players list</td>
  </tr>
</tbody>
</table>
</TabItem>
<TabItem label="Reserved">
Roblox reserves system specific keyboard inputs that you can't change, disable, or override.

<table size="small">
<thead>
  <tr>
    <th>Inputs</th>
    <th>Action</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><kbd>Esc</kbd></td>
    <td>Roblox menu</td>
  </tr>
	<tr>
    <td><kbd>F9</kbd></td>
    <td>[Developer Console](../studio/developer-console.md)</td>
  </tr>
  <tr>
    <td><kbd>F11</kbd></td>
    <td>Fullscreen mode (Windows)<br />Show desktop (Mac)</td>
  </tr>
	<tr>
    <td><kbd>F12</kbd></td>
    <td>Record video (Windows only)</td>
  </tr>
	<tr>
    <td><kbd>PrintScreen</kbd></td>
    <td>Take screenshot</td>
  </tr>
</tbody>
</table>
</TabItem>
</Tabs>
