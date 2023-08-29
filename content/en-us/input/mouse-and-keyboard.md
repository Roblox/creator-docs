---
title: Mouse and Keyboard
description: Explains Roblox support for computer mice and keyboards.
---

You can create unique experiences and provide users with additional functionality with custom inputs. Mouse and keyboards are the most common input devices, so it is important to test and develop your custom input behavior on these devices first. Once you're comfortable with mouse and keyboard inputs, make your experience compatible with multiple platforms by setting up [mobile](../input/mobile.md) and [gamepad](./gamepad.md) inputs.

For convenience, Roblox sets the most common mouse and keyboard inputs as [default key binds](#roblox-default-bindings). Except for the [reserved bindings](#reserved), you can overwrite these default key binds.

## Mouse Input

You can detect mouse position and button clicks using the `Class.UserInputService` to capture [generic mouse inputs](#generic-mouse-input). Roblox also supports legacy mouse input detection with [PlayerMouse](#playermouse) and [ClickDetectors](#clickdetector).

Mouse inputs also automatically work with [interactive UI elements](../ui/buttons.md#buttons), such as `Class.TextBox|TextBoxes` or `Class.ImageButton|ImageButtons`.

### Generic Mouse Input

Like all device inputs, you can capture mouse inputs using `Class.UserInputService`. This service provides a scalable way to capture input changes and device input states for multiple devices at once.

Additionally, you can use `Class.ContextActionService` to handle multiple actions on a single input depending on context, such as using a tool when near a rock, or opening a door when inside a building. See [Context Dependent Inputs](../input/mobile.md#context-dependent-inputs) for information on setting context specific input actions.

To capture mouse clicks and print the position of the mouse to the output, use the following script in a `Class.LocalScript` in `Class.StarterPlayerScripts`:

```lua
local UserInputService = game:GetService("UserInputService")

local function onInputEnded(inputObject, gameProcessedEvent)
	-- First check if the "gameProcessedEvent" is true
	-- This indicates that another script had already processed the input, so this one is ignored
	if gameProcessedEvent then return end
	-- Next, check that the input was a mouse event
	if inputObject.UserInputType == Enum.UserInputType.MouseButton1 then
		print("Left Mouse button was pressed: ", inputObject.Position)
	elseif inputObject.UserInputType == Enum.UserInputType.MouseButton2 then
		print("Right Mouse button was pressed: ", inputObject.Position)
	end
end

UserInputService.InputEnded:Connect(onInputEnded)

```

### PlayerMouse

You can also use the legacy `Class.Player:GetMouse()` function to return a `Class.PlayerMouse` object that handles general mouse properties and events.

Since `Class.Player:GetMouse()` only works when using a `Class.LocalScript`, access `Class.Players.LocalPlayer` to get a reference to the local player and, in `Class.StarterPlayer|StarterPlayer`, parent the script to `Class.StarterPlayerScripts` so that it later runs when copied to `Class.PlayerScripts`.

Use the following script in a `Class.LocalScript` in `Class.StarterPlayerScripts` to print the mouse coordinates whenever the mouse is clicked:

```lua
local Players = game:GetService("Players")
local player = Players.LocalPlayer
local mouse = player:GetMouse()

local function onMouseClick()
	print(player.Name .. " clicked at position: " .. tostring(mouse.Hit.Position))
	if mouse.Target then
		print("Clicked part: " .. mouse.Target:GetFullName())
	else
		print("No part clicked")
	end
end

mouse.Button1Down:Connect(onMouseClick)
```

### ClickDetector

A `Class.ClickDetector` object is a simple way of detecting mouse events on a specific 3D object in an experience. You can add a `Class.ClickDetector` instance to any existing `Class.Model` or `Class.Part` to begin detecting player clicks.

<video src="../assets/scripting/input/ClickDetector.mp4" controls
width="80%" />

To create a new `Class.ClickDetector` on a part and change the color of its parent when the part is clicked, use the following code sample in a `Class.Script` or `Class.LocalScript`:

```lua
local clickPart = script.Parent
-- Create a ClickDetector and set its parent
local clickDetector = Instance.new("ClickDetector")
clickDetector.Parent = clickPart

local function onPartClick(player)
	-- Output a message and randomly color the clicked part
	print(player.Name .. " clicked me!")
	clickPart.BrickColor = BrickColor.random()
end

clickDetector.MouseClick:Connect(onPartClick)

```

`Class.ClickDetector` also has three other events that you can use to track mouse inputs:

- `Class.ClickDetector.MouseHoverEnter|MouseHoverEnter`: Fires when the mouse pointer hovers over the detector object. If on a mobile device, this only fires when the player initially taps the detector object to "activate" it, and when they drag their finger off and back over the detector during a subsequent touch.
- `Class.ClickDetector.MouseHoverLeave|MouseHoverLeave`: Fires when the mouse pointer hovers off the detector object. If on a mobile device, this only fires when the player initially taps the detector object to "activate" it and then either taps somewhere off the detector, or drags their finger off the detector following a subsequent touch.
- `Class.ClickDetector.RightMouseClick|RightMouseClick`: Fires when the player right-clicks the mouse over the detector object. This event does not function on mobile devices.

## Keyboard Input

Keyboard inputs provide the largest variety of inputs for users. You can listen for generic keyboard inputs, such as a specific key being pressed, or set up a `Class.TextBox` to capture a user's text input.

Roblox has several preset [key bindings](#roblox-default-bindings) which are enabled by default.

### Generic Keyboard Input

To access keyboard events, use the `Class.UserInputService.InputEnded` event to track whenever any keystroke or other input ends. Similar to mouse events, this event only works within a `Class.LocalScript`.

Use the following sample code in a `Class.LocalScript` to print the keycode of a pressed key:

```lua
local UserInputService = game:GetService("UserInputService")

local function onInputEnded(inputObject, gameProcessedEvent)
	-- First check if the "gameProcessedEvent" is true
	-- This indicates that another script had already processed the input, so this one is ignored.
	if gameProcessedEvent then return end
	-- Next, check that the input was a keyboard event
	if inputObject.UserInputType == Enum.UserInputType.Keyboard then
		print("A key was released: " .. inputObject.KeyCode.Name)
	end
end

UserInputService.InputEnded:Connect(onInputEnded)

```

### Text Input

A `Class.TextBox` is a special UI object designed to capture text input, like a text field in a form. Its `Class.TextBox.Text|Text` property is changed as the player types into it, and the `Class.TextBox.FocusLost|FocusLost` event fires after the player is done typing.

For more information on creating a `Class.TextBox` and other clickable UI elements, see [Buttons and Text](../ui/buttons.md#textboxes).

## Roblox Default Bindings

Roblox provides default key bindings for all experiences. These are the most common inputs used for movement, camera control and basic environment interaction.

`Enum.CoreGuiType` features, such as the Backpack, Chat, or Playerlist have a list of additional default inputs. You can't overwrite [reserved inputs](#reserved), such as <kbd>Escape</kbd> (Roblox Menu), or <kbd>F9</kbd> (Developer Console).

### Global

These bindings are Roblox defaults, but you can override them with custom scripts.

<Alert severity="info">
   Most Roblox players are familiar with these controls, so you should only override these inputs in specific cases.
</Alert>

| Key or Event                                                   | Action                                                 |
| -------------------------------------------------------------- | ------------------------------------------------------ |
| <kbd>W</kbd> / Up Arrow                                        | Move forward                                           |
| <kbd>S</kbd> / Down Arrow                                      | Move backward                                          |
| <kbd>A</kbd>                                                   | Move left                                              |
| <kbd>D</kbd>                                                   | Move right                                             |
| <kbd>Space</kbd>                                               | Jump                                                   |
| <kbd>Left</kbd>                                                | Rotate camera left                                     |
| <kbd>Right</kbd>                                               | Rotate camera right                                    |
| <kbd>Mouse.Button2Down</kbd>                                   | Turn camera                                            |
| <kbd>Shift</kbd>                                               | Toggle mouselock (if EnableMouseLockOption is enabled) |
| <kbd>Mouse.WheelForward</kbd> / <kbd>Mouse.WheelBackward</kbd> | Zoom in/out                                            |
| <kbd>I</kbd>                                                   | Zoom in                                                |
| <kbd>O</kbd>                                                   | Zoom out                                               |
| <kbd>Backslash</kbd>                                           | Toggle UI navigation                                   |

### Feature Specific

Some `Class.CoreGui` features also have default bindings. These inputs are reserved by the features unless you disable the respective feature using `Class.StarterGui:SetCoreGuiEnabled()|SetCoreGuiEnabled()`.

| Key or Event                 | Feature    | Action                |
| ---------------------------- | ---------- | --------------------- |
| <kbd>Backquote</kbd>         | Backpack   | Toggle Backpack       |
| Numbers 0-9                  | Backpack   | Equip/unequip tools   |
| <kbd>Mouse.Button1Down</kbd> | Backpack   | Use tool              |
| <kbd>Backspace</kbd>         | Backpack   | Drop tool             |
| <kbd>Slash</kbd>             | Chat       | Chat                  |
| <kbd>Tab</kbd>               | Playerlist | Show/hide player list |

### Reserved

Roblox reserves system specific keyboard inputs that you can't change, disable, or override.

| Key or Event                                                                                                        | Action                            |
| ------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| <kbd>Escape</kbd>                                                                                                   | Roblox Menu                       |
| <kbd>F9</kbd>                                                                                                       | Developer Console                 |
| <kbd>F11</kbd>                                                                                                      | Fullscreen mode                   |
| <kbd>F12</kbd> (Windows)                                                                                            | Record video                      |
| <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>F7</kbd> (Windows) / <kbd>Control</kbd>+<kbd>Alt</kbd>+<kbd>F7</kbd> (Mac) | Performance stats                 |
| <kbd>Control</kbd>+<kbd>F6</kbd>                                                                                    | Show Microprofiler                |
| <kbd>Control</kbd>+<kbd>P</kbd>                                                                                     | Pause Microprofiler, if displayed |
| <kbd>Printscreen</kbd> (Windows) / <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>3</kbd> (Mac)                           | Take Screenshot                   |

### Binding and Unbinding Actions

All supported inputs can have an action bound to them using `Class.ContextActionService`. Excluding reserved bindings, you can use `Class.ContextActionService` to edit the actions of the [Roblox default bindings](#roblox-default-bindings).

While testing an experience, <kbd>F9</kbd> opens up a Developer Console where current bindings and action names are listed under ActionBindings. You can use this to see the current active binds in your experience.

<img src="../assets/scripting/input/Developer-Console-ActionBindings.jpg"
   width="80%" />

To unbind Roblox's default moveForwardAction from the <kbd>W</kbd> key, use the following sample code in a `Class.LocalScript` in `Class.StarterGui`:

```lua
local ContextActionService = game:GetService("ContextActionService")

ContextActionService:UnbindAction("moveForwardAction")
```

To bind the <kbd>W</kbd> key to another function, use the following sample code in a `Class.LocalScript` in StarterGui:

```lua
local ContextActionService = game:GetService("ContextActionService")

local function warnUserPrompt()
	print("No moving forward!")
end

ContextActionService:BindAction("warnUser",warnUserPrompt,false, Enum.KeyCode.W)
```

For more information on implementing using `Class.ContextActionService` to create cross-platform binds and prioritizing multiple bindings to a single input, see [Context Dependent Inputs](../input/mobile.md#context-dependent-inputs).

## Movement Modes

Roblox offers several `Class.StarterPlayer` properties you can set to change how users on desktop devices can move through your experience.

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
    <td>`ClickToMove`</td>
    <td>Users can only move through the experience by right-clicking a target location.</td>
  </tr>
  <tr>
    <td>`KeyboardMouse`</td>
    <td>User can only use default <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> or the arrow keys to move and <kbd>Space</kbd> to jump. This is the default user setting for keyboard and mouse users if `UserChoice` is set.</td>
  </tr>
  <tr>
    <td>`Scriptable`</td>
    <td>Disables all default controls and allows you to [bind your own controls](#binding-and-unbinding-actions).</td>
  </tr>
  <tr>
    <td>`UserChoice`</td>
    <td>Allows users to choose their desired control scheme from the in-experience Settings menu. This option is enabled by default.</td>
  </tr>
</tbody>
</table>
