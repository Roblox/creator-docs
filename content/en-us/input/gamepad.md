---
title: Gamepad input
description: Explains how to accept input from USB gamepads, such as Xbox and PlayStation controllers.
---

import ControllerEmulator from '../includes/studio/controller-emulator.md'
import BetaAlert from '../includes/beta-features/beta-alert.md'

Roblox accepts input from USB gamepads such as Xbox and PlayStation controllers. Since gamepads come in different varieties, you need to follow additional setup to verify that a player's gamepad inputs are usable in your experience.

To set up gamepad inputs, you can use `Class.UserInputService` to [detect connected gamepads](#detect-gamepads) for a player's device, [verify supported inputs](#verify-supported-inputs) that are compatible with Roblox, [receive input](#receive-input), and more.

When binding gamepad inputs, see [common control schemas](#common-control-schemas) to create a consistent gamepad experience for players. After inputs are set, you can enhance the player's experience by including [haptic feedback](#haptic-feedback) on supported controllers.

## Detect gamepads

You can detect whether a player's device currently has a gamepad active using the `Class.UserInputService.GamepadEnabled` property.

```lua title="Detecting Gamepad"
local UserInputService = game:GetService("UserInputService")

if UserInputService.GamepadEnabled then
	print("Player has gamepad enabled...")
end
```

You can check for connected gamepads via `Class.UserInputService.GamepadConnected` and `Class.UserInputService.GamepadDisconnected` events. These events fire when a device is connected or disconnected respectively, and both events pass a `Enum.UserInputType` to the connected function indicating which gamepad caused the event. In most cases, the connected gamepad is `Enum.UserInputType|Gamepad1`.

```lua title="Checking Connection and Disconnection"
local UserInputService = game:GetService("UserInputService")

UserInputService.GamepadConnected:Connect(function(gamepad)
	print("User has connected controller: " .. tostring(gamepad))
end)

UserInputService.GamepadDisconnected:Connect(function(gamepad)
	print("User has disconnected controller: " .. tostring(gamepad))
end)
```

You can also query whether a particular controller is connected using the `Class.UserInputService:GetGamepadConnected()` method. This takes a `Enum.UserInputType` as an argument and only accepts values of `Enum.UserInputType|Gamepad1` through `Enum.UserInputType|Gamepad8`.

```lua title="Query Specific Gamepad Connection"
local UserInputService = game:GetService("UserInputService")

if UserInputService:GetGamepadConnected(Enum.UserInputType.Gamepad1) then
	print("Gamepad1 is connected")
elseif UserInputService:GetGamepadConnected(Enum.UserInputType.Gamepad2) then
	print("Gamepad2 is connected")
end
```

## Verify supported inputs

Since gamepads can have different sets of inputs, you should check which inputs are supported with `Class.UserInputService:GetSupportedGamepadKeyCodes()`. This method takes a `Enum.UserInputType` as an argument and returns a table with a list of all available inputs for the specified controller.

```lua title="Verifying Supported Inputs"
local UserInputService = game:GetService("UserInputService")

local availableInputs = UserInputService:GetSupportedGamepadKeyCodes(Enum.UserInputType.Gamepad2)

print("This controller supports the following controls:")
for _, control in availableInputs do
	print(control)
end
```

## Receive input

You can use `Class.UserInputService` to bind controls directly from a gamepad. When detecting gamepad events through this service, use the `Class.UserInputService.InputBegan|InputBegan` event to detect when the button was initially pressed and `Class.UserInputService.InputEnded|InputEnded` to detect when the button is released. In the handling function, the `Class.InputObject.UserInputType` property indicates which gamepad fired the event and `Class.InputObject.KeyCode` indicates the specific button or stick that fired it.

```lua title="UserInputService Button Press Detection"
local UserInputService = game:GetService("UserInputService")

UserInputService.InputBegan:Connect(function(input)
	if input.UserInputType == Enum.UserInputType.Gamepad1 then
		if input.KeyCode == Enum.KeyCode.ButtonA then
			print("Button A pressed on Gamepad1")
		end
	end
end)
```

### Gamepad state

You can detect the current state of all buttons and sticks on a gamepad with the `Class.UserInputService:GetGamepadState()` method. This is useful if you need to check the current gamepad inputs when a distinct event occurs in your experience, such as checking if specific buttons are being pressed when a character touches an object.

```lua title="Checking State of Gamepad Inputs"
local Players = game:GetService("Players")
local UserInputService = game:GetService("UserInputService")

local player = Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait()
local leftFoot = character:WaitForChild("LeftFoot")

-- When left foot comes into contact with something, check the gamepad input state
leftFoot.Touched:Connect(function(hit)
	local state = UserInputService:GetGamepadState(Enum.UserInputType.Gamepad1)
	for _, input in state do

		-- If the ButtonR2 is currently held, print out a message
		if input.KeyCode == Enum.KeyCode.ButtonR2 and input.UserInputState == Enum.UserInputState.Begin then
			print("Character's left foot touched something while holding right trigger")
		end
	end
end)
```

### Trigger pressure

You can detect how much pressure is being placed on gamepad triggers by checking the `Class.InputObject.Position|Position.Z` value of the input trigger.

```lua title="Testing Trigger Pressure"
local UserInputService = game:GetService("UserInputService")

UserInputService.InputChanged:Connect(function(input)
	if input.UserInputType == Enum.UserInputType.Gamepad1 then
		if input.KeyCode == Enum.KeyCode.ButtonL2 then
			print("Pressure on left trigger has changed:", input.Position.Z)
		elseif input.KeyCode == Enum.KeyCode.ButtonR2 then
			print("Pressure on right trigger has changed:", input.Position.Z)
		end
	end
end)
```

## Common control schemas

Gamepads come in a variety of shapes and sizes. As with any method of player input, it's best to create some consistency across different games and experiences.

<Tabs>
  <TabItem label="Xbox">
    <img src="../assets/scripting/input/Gamepad-Inputs-Xbox.png" width="860" height="510" />
  </TabItem>
  <TabItem label="PlayStation">
    <img src="../assets/scripting/input/Gamepad-Inputs-PS.png" width="860" height="510" />
  </TabItem>
</Tabs>

The following are common input binds that will help players immediately feel familiar and comfortable with the gamepad controls:

<table>
<thead>
  <tr>
    <th>Input</th>
    <th>Common use cases</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Enum.KeyCode|ButtonA`</td>
    <td>Accepts player prompts or GUI selections. Alternatively used for primary actions such as jumping.</td>
  </tr>
  <tr>
    <td>`Enum.KeyCode|ButtonB`</td>
    <td>Cancels player prompts or GUI selections. Alternatively used for secondary actions such as a dodge, roll, or sprint.</td>
  </tr>
  <tr>
    <td>`Enum.KeyCode|Thumbstick1`</td>
    <td>Generally associated with character movement.</td>
  </tr>
  <tr>
    <td>`Enum.KeyCode|Thumbstick2`</td>
    <td>Generally associated with camera movement.</td>
  </tr>
  <tr>
    <td>`Enum.KeyCode|ButtonL2`, `Enum.KeyCode|ButtonR2`</td>
    <td>Generally used for primary actions, such as shooting. </td>
  </tr>
  <tr>
    <td>`Enum.KeyCode|ButtonL1`, `Enum.KeyCode|ButtonR1`, `Enum.KeyCode|ButtonX`, `Enum.KeyCode|ButtonY`</td>
    <td>Secondary actions such as reloading, targeting, or accessing an inventory or minimap.</td>
  </tr>
</tbody>
</table>

## Haptic feedback

Many gamepad controllers have motors built in to provide haptic feedback. Adding rumbles and vibrations can greatly enhance a player's experience and provide subtle feedback beyond visuals or audio.

Roblox supports haptics for PlayStation gamepads, Xbox gamepads, and the Quest Touch controller. Haptic feedback is managed through `Class.HapticEffect` instances which can be set to a specific `Class.HapticEffect.Type|Type` such as `Enum.HapticEffectType|GameplayCollision` or `Enum.HapticEffectType|UIClick`.

Once a `Class.HapticEffect` is in place, you can initiate it through the `Class.HapticEffect:Play()|Play()` method, for instance:

```lua
local Workspace = game:GetService("Workspace")

local effect = Instance.new("HapticEffect")
effect.Type = Enum.HapticEffectType.GameplayExplosion
effect.Parent = Workspace

-- Play the haptic effect
effect:Play()
```

## Controller emulation

<ControllerEmulator components={props.components} />
