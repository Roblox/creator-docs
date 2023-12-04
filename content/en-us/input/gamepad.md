---
title: Gamepad Input
description: Explains how to accept input from USB gamepads, such as Xbox and PlayStation controllers.
---

Roblox accepts input from USB gamepads such as Xbox and PlayStation controllers. Since gamepads come in different varieties, you need to follow additional setup to verify that a player's gamepad inputs are usable in your experience.

To set up gamepad inputs, you can use `Class.ContextActionService` or `Class.UserInputService` to [detect connected gamepads](#detecting-gamepads) for a player's device, [verify supported inputs](#verifying-supported-inputs) that are compatible with Roblox, [receive input](#receiving-input), and more.

When binding gamepad inputs, see [common control schemas](#common-control-schemas) to create a consistent gamepad experience for players. After inputs are set, you can enhance the player's experience by including [haptic feedback](#haptic-feedback) on supported controllers.

## Detecting Gamepads

You can detect whether a player's device currently has a gamepad active using the `Class.UserInputService.GamepadEnabled` property.

```lua title='Detecting Gamepad'
local UserInputService = game:GetService("UserInputService")

if UserInputService.GamepadEnabled then
	print("Player has gamepad enabled...")
end
```

You can check for connected gamepads via `Class.UserInputService.GamepadConnected` and `Class.UserInputService.GamepadDisconnected` events. These events fire when a device is connected or disconnected respectively, and both events pass a `Enum.UserInputType` to the connected function indicating which gamepad caused the event. In most cases, the connected gamepad is `Enum.UserInputType|Gamepad1`.

```lua title='Checking Connection and Disconnection'
local UserInputService = game:GetService("UserInputService")

UserInputService.GamepadConnected:Connect(function(gamepad)
	print("User has connected controller: " .. tostring(gamepad))
end)

UserInputService.GamepadDisconnected:Connect(function(gamepad)
	print("User has disconnected controller: " .. tostring(gamepad))
end)
```

You can also query whether a particular controller is connected using the `Class.UserInputService:GetGamepadConnected()` method. This takes a `Enum.UserInputType` as an argument and only accepts values of `Enum.UserInputType|Gamepad1` through `Enum.UserInputType|Gamepad8`.

```lua title='Query Specific Gamepad Connection'
local UserInputService = game:GetService("UserInputService")

if UserInputService:GetGamepadConnected(Enum.UserInputType.Gamepad1) then
	print("Gamepad1 is connected")
elseif UserInputService:GetGamepadConnected(Enum.UserInputType.Gamepad2) then
	print("Gamepad2 is connected")
end
```

## Verifying Supported Inputs

Since gamepads can have different sets of inputs, you should check which inputs are supported with `Class.UserInputService:GetSupportedGamepadKeyCodes()`. This method takes a `Enum.UserInputType` as an argument and returns a table with a list of all available inputs for the specified controller.

```lua title='Verifying Supported Inputs'
local UserInputService = game:GetService("UserInputService")

local availableInputs = UserInputService:GetSupportedGamepadKeyCodes(Enum.UserInputType.Gamepad2)

print("This controller supports the following controls:")
for _, control in availableInputs do
	print(control)
end
```

## Receiving Input

`Class.ContextActionService` is useful for binding controls to both gamepads and other input sources such as [mouse and keyboard](./mouse-and-keyboard.md) inputs or [mobile](../input/mobile.md) touchscreen buttons, or for binding multiple functions to a single button input on any device. For example, the following code sample binds an `OpenSpellBook` action to the gamepad's `Enum.KeyCode.ButtonR2|ButtonR2` button and the keyboard's `Enum.KeyCode.B|B` key.

```lua title='ContextActionService Bind Action'
local ContextActionService = game:GetService("ContextActionService")

local function openSpellBook(actionName, inputState, inputObject)
	if inputState == Enum.UserInputState.Begin then
		-- Open spell book
	end
end

ContextActionService:BindAction("OpenSpellBook", openSpellBook, false, Enum.KeyCode.ButtonR2, Enum.KeyCode.B)
```

<Alert severity="info">
Functions bound to `Class.ContextActionService` will fire on all input states (`Enum.UserInputState|Begin`, `Enum.UserInputState|Change`, and `Enum.UserInputState|End`), so it's recommended that you check the `Class.InputObject.UserInputState|UserInputState` as seen on line 4 to ensure the desired action only happens on the gamepad input state you intend it to.
</Alert>

Alternatively, you can use `Class.UserInputService` to bind controls directly from a gamepad. When detecting gamepad events through this service, use the `Class.UserInputService.InputBegan|InputBegan` event to detect when the button was initially pressed and `Class.UserInputService.InputEnded|InputEnded` to detect when the button is released. In the handling function, the `Class.InputObject.UserInputType` property indicates which gamepad fired the event and `Class.InputObject.KeyCode` indicates the specific button or stick that fired it.

```lua title='UserInputService Button Press Detection'
local UserInputService = game:GetService("UserInputService")

UserInputService.InputBegan:Connect(function(input)
	if input.UserInputType == Enum.UserInputType.Gamepad1 then
		if input.KeyCode == Enum.KeyCode.ButtonA then
			print("Button A pressed on Gamepad1")
		end
	end
end)
```

### Gamepad State

You can detect the current state of all buttons and sticks on a gamepad with the `Class.UserInputService:GetGamepadState()` method. This is useful if you need to check the current gamepad inputs when a distinct event occurs in your experience, such as checking if specific buttons are being pressed when a character touches an object.

```lua title='Checking State of Gamepad Inputs'
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

### Trigger Pressure

You can detect how much pressure is being placed on gamepad triggers by checking the `Class.InputObject.Position|Position.Z` value of the input trigger.

```lua title='Testing Trigger Pressure'
local UserInputService = game:GetService("UserInputService")

UserInputService.InputChanged:Connect(function(input)
	if input.UserInputType == Enum.UserInputType.Gamepad1 then
		if input.KeyCode == Enum.KeyCode.ButtonL1 then
			print("Pressure on left trigger has changed:", input.Position.Z)
		elseif input.KeyCode == Enum.KeyCode.ButtonR1 then
			print("Pressure on right trigger has changed:", input.Position.Z)
		end
	end
end)
```

## Common Control Schemas

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
    <th>Common Use Cases</th>
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

## Haptic Feedback

Many gamepad controllers have motors built in to provide haptic feedback. Adding rumbles and vibrations can greatly enhance a player's experience and provide subtle feedback beyond visuals or audio. You can use the `Class.HapticService` to [verify vibration support](#vibration-support) before [turning on the motors](#activating-motors).

### Vibration Support

Not all controllers have motors so it is important to check for support before attempting to use the haptic motors. To query if a given controller has vibration support, call `Class.HapticService:IsVibrationSupported()`.

```lua title='Check Vibration Support'
local HapticService = game:GetService("HapticService")

local gamepad = Enum.UserInputType.Gamepad1
local isVibrationSupported = HapticService:IsVibrationSupported(gamepad)
```

Some controllers have multiple motors for various scales of vibration. Once you've checked if a gamepad supports vibration, you should also check if it supports the motors you intend to use through `Class.HapticService:IsMotorSupported()`.

```lua title='Check Motors Supported'
local HapticService = game:GetService("HapticService")

local gamepad = Enum.UserInputType.Gamepad1
local isVibrationSupported = HapticService:IsVibrationSupported(gamepad)

if isVibrationSupported then
	local largeMotor = HapticService:IsMotorSupported(gamepad, Enum.VibrationMotor.Large)
	local smallMotor = HapticService:IsMotorSupported(gamepad, Enum.VibrationMotor.Small)
	local leftTriggerMotor = HapticService:IsMotorSupported(gamepad, Enum.VibrationMotor.LeftTrigger)
	local rightTriggerMotor = HapticService:IsMotorSupported(gamepad, Enum.VibrationMotor.RightTrigger)
	local leftHandMotor = HapticService:IsMotorSupported(gamepad, Enum.VibrationMotor.LeftHand)
	local rightHandMotor = HapticService:IsMotorSupported(gamepad, Enum.VibrationMotor.RightHand)
end
```

<table size="small">
  <thead>
    <tr>
      <th>Size or Location</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>`Enum.VibrationMotor.Large|Large`</td>
      <td>Larger motor, useful for generic rumble.</td>
    </tr>
		<tr>
      <td>`Enum.VibrationMotor.Small|Small`</td>
      <td>Smaller motor, useful for more subtle rumbles like tires slipping, electric shock, etc.</td>
    </tr>
		<tr>
      <td>`Enum.VibrationMotor.LeftTrigger|LeftTrigger`</td>
      <td>Underneath the left trigger.</td>
    </tr>
		<tr>
      <td>`Enum.VibrationMotor.RightTrigger|RightTrigger`</td>
      <td>Underneath the right trigger.</td>
    </tr>
		<tr>
      <td>`Enum.VibrationMotor.LeftHand|LeftHand`</td>
      <td>On the left side of the controller.</td>
    </tr>
		<tr>
      <td>`Enum.VibrationMotor.RightHand|RightHand`</td>
      <td>On the right side of the controller.</td>
    </tr>
	</tbody>
</table>

### Activating Motors

Once you've confirmed that a player's gamepad [supports vibration](#vibration-support), you can turn on a specific motor with `Class.HapticService:SetMotor()`. This method takes the gamepad and the amplitude of the vibration as arguments. Amplitude can be any value between 0 and 1.

```lua title='Activating Motor'
local HapticService = game:GetService("HapticService")

local gamepad = Enum.UserInputType.Gamepad1
local isVibrationSupported = HapticService:IsVibrationSupported(gamepad)

if isVibrationSupported then
	local largeMotor = HapticService:IsMotorSupported(gamepad, Enum.VibrationMotor.Large)
	if largeMotor then
		HapticService:SetMotor(gamepad, Enum.VibrationMotor.Large, 0.5)
	end
end
```
