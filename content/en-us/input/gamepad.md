---
title: Gamepad Input
description: Explains how to accept input from USB gamepads, such as Xbox and PlayStation controllers.
---

Roblox accepts input from USB gamepads such as Xbox and PlayStation controllers. Since gamepads can come in different varieties, you need to follow additional setup to verify that a user's gamepad inputs are usable in your experience.

To set up gamepad inputs, you can use `Class.UserInputService` to perform the following:

- [Detect connected gamepads](#detecting-gamepads) to get information on currently connected or disconnected devices.
- [Verify valid inputs](#verifying-supported-inputs) that are compatible with Roblox.
- [Receive input](#receiving-input) and [poll current state](#gamepad-input-state) of a connected gamepad.

When binding gamepad inputs, see [common control schemas](#common-control-schemas) to create a consistent gamepad experience between experiences.

After your inputs are set, you can additionally customize your gamepads by including vibration feedback on supported controllers. See [Haptic Feedback](#haptic-feedback) for instructions on verifying and activating vibrations.

## Detecting Gamepads

You can detect whether a user's device currently has a gamepad active using the `Class.UserInputService.GamepadEnabled` property.

Use the following sample code to print out a console message if the `Class.UserInputService.GamepadEnabled|GamepadEnabled` property is true:

```lua
local UserInputService = game:GetService("UserInputService")

if UserInputService.GamepadEnabled then
	print("Player has gamepad enabled...")
end
```

You can connect up to eight local gamepads to a client at once. You can check for connected gamepads with `Class.UserInputService.GamepadConnected|GamepadConnected` and `Class.UserInputService.GamepadDisconnected|GamepadDisconnected` events. These events will fire when a device is connected or disconnected respectively. Both events will pass a `Enum.UserInputType` to the connected function indicating which gamepad caused the event. In most cases, the connected gamepad is `Enum.UserInputType|UserInputType.Gamepad1`.

Use the following code sample to print out the specific gamepad that is connected and disconnected:

```lua
local UserInputService = game:GetService("UserInputService")

UserInputService.GamepadConnected:Connect(function(gamepad)
	print("User has connected controller: " .. tostring(gamepad))
end)

UserInputService.GamepadDisconnected:Connect(function(gamepad)
	print("User has disconnected controller: " .. tostring(gamepad))
end)
```

You can also query whether a particular controller is connected using the `Class.UserInputService:GetGamepadConnected()` function. This takes a `Enum.UserInputType` as an argument and only accepts values of `Enum.UserInputType|UserInputType.Gamepad1` through `Enum.UserInputType|UserInputType.Gamepad8`.

Use the following code sample to check for a specific gamepad and print a message if it is connected:

```lua
local UserInputService = game:GetService("UserInputService")
if UserInputService:GetGamepadConnected(Enum.UserInputType.Gamepad1) then
	print("Gamepad1 is connected")
elseif UserInputService:GetGamepadConnected(Enum.UserInputType.Gamepad2) then
	print("Gamepad2 is connected")
end
```

## Verifying Supported Inputs

Since gamepads can have different sets of inputs, check which inputs are supported with `Class.UserInputService:GetSupportedGamepadKeyCodes()`. This function takes a `Enum.UserInputType` as an argument and returns a table with a list of all available inputs for the specified controller.

Use the following code sample to print out a list of available inputs detected from Gamepad 2:

```lua
local UserInputService = game:GetService("UserInputService")

local availableInputs = UserInputService:GetSupportedGamepadKeyCodes(Enum.UserInputType.Gamepad2)
print("This controller supports the following controls:")
for _, control in pairs(availableInputs) do
	print(control)
end
```

## Receiving Input

There are three ways to receive input from a gamepad:

- Use `Class.ContextActionService` if you plan to bind custom game controls to both gamepads and other input sources like [mouse and keyboard inputs](./mouse-and-keyboard.md) or [mobile](../input/mobile.md) touch controls.
- Use `Class.UserInputService.InputBegan`, `Class.UserInputService.InputChanged` and `Class.UserInputService.InputEnded` events to listen for inputs and filter for gamepad events directly.
- Use `Class.UserInputService:GetGamepadState()` to query all the current input states of gamepad.

### ContextActionService

You can use `Class.ContextActionService` for binding controls to both gamepads and other input sources such as [mobile touchscreen buttons](../input/mobile.md) or binding multiple functions to a single button input on any device. For example, use `Class.ContextActionService` to bind an OpenSpellBook action to the right trigger (R2) on a gamepad and the B key on a keyboard in one function.

Use the following code sample to bind an OpenSpellBook action to the gamepad's R2 button and the B key on the keyboard:

```lua
local ContextActionService = game:GetService("ContextActionService")

local function openSpellBook(actionName, inputState, inputObject)
	if inputState == Enum.UserInputState.Begin then
		-- Open spell book
	end
end

ContextActionService:BindAction("OpenSpellBook", openSpellBook, false, Enum.KeyCode.ButtonR2, Enum.KeyCode.B)
```

<Alert severity="info">
Functions bound to `Class.ContextActionService` will fire on all input states (Begin, Change, and End), so it's recommended that you check the `Class.InputObject.UserInputState|UserInputState` as seen on line 4 to ensure the desired action only happens on the gamepad input state you intend it to.
</Alert>

### UserInputService

You can use `Class.UserInputService` to bind controls directly from a gamepad. When detecting gamepad events with `Class.UserInputService`, use `Class.UserInputService.InputBegan` to detect when the button was initially pressed and `Class.UserInputService.InputEnded` to detect when the button is released.

In the handling function, the `Class.InputObject.UserInputType` property indicates which gamepad fired the event and `Class.InputObject.KeyCode` indicates the specific button or stick that fired it.

Use the following sample code to listen for an `Class.UserInputService.InputBegan` event where the A button is pressed on Gamepad1:

```lua
local UserInputService = game:GetService("UserInputService")

UserInputService.InputBegan:Connect(function(input)
	if input.UserInputType == Enum.UserInputType.Gamepad1 then
		if input.KeyCode == Enum.KeyCode.ButtonA then
			print("Button A pressed on Gamepad1")
		end
	end
end)
```

### Gamepad Input State

You can detect the current state of all buttons and sticks on a gamepad with the `Class.UserInputService:GetGamepadState()` function. This is useful if you need to check the current gamepad inputs when a distinct event occurs in your experience. For example, you may want to check if specific buttons are being pressed when a character touches an object.

Use the following code sample to detect if the Gamepad1 R2 button is being held when the player character's left foot comes contacts a surface:

```lua
local Players = game:GetService("Players")
local UserInputService = game:GetService("UserInputService")

local player = Players.LocalPlayer
local character = player.Character
if not character or not character.Parent then
	character = player.CharacterAdded:Wait()
end

local leftFoot = character:WaitForChild("LeftFoot")

-- When leftFoot comes into contact with something, check the gamepad input state
leftFoot.Touched:Connect(function(hit)
	local state = UserInputService:GetGamepadState(Enum.UserInputType.Gamepad1)
	for _, input in pairs(state) do

		-- If the ButtonR2 is currently held then print out a message
		if input.KeyCode == Enum.KeyCode.ButtonR2 and input.UserInputState == Enum.UserInputState.Begin then
			print("Character's left foot touched something while holding right trigger")
		end
	end
end)
```

## Common Control Schemas

Gamepads come in a variety of shapes and sizes. As with any method of user input, it's best to create some consistency across different games and applications.

The following are common input binds that will help users immediately feel familiar and comfortable with the gamepad controls:

<table>
<thead>
  <tr>
    <th>Input</th>
    <th>Common Use-cases</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>A button</td>
    <td>Accepts user prompts or GUI selections. Alternatively used for primary actions in an experience, such as jumping.</td>
  </tr>
  <tr>
    <td>B button</td>
    <td>Cancels user prompts or GUI selections. Alternatively used for secondary actions in an experience, such as a dodge, roll, or sprint.</td>
  </tr>
  <tr>
    <td>Left Thumbstick</td>
    <td>Generally associated with character movement.</td>
  </tr>
  <tr>
    <td>Right Thumbstick</td>
    <td>Generally associated with camera movement.</td>
  </tr>
  <tr>
    <td>Right Trigger</td>
    <td>Generally used for primary actions, such as shooting. </td>
  </tr>
  <tr>
    <td>R1, L1 and X and Y buttons</td>
    <td>Secondary actions such as reloading, targeting or accessing an inventory or minimap.</td>
  </tr>
</tbody>
</table>

## Haptic Feedback

Many gamepad controllers, such as Xbox One controllers, have motors built in to provide haptic feedback. Adding rumbles and vibrations can greatly enhance a user's experience and provide subtle feedback beyond visuals or audio. You can use the HapticService to [verify vibration support](#checking-for-vibration-support) before [turning on the controller motors](#turning-on-motors).

### Checking for Vibration Support

Not all controllers support vibration so it is important to check if the plugged-in controllers have support before attempting to use the controller motors. To check if a given controller has rumble support at all, you can call `Class.HapticService:IsVibrationSupported()`.

Use the following sample code to verify if vibration is supported on gamepad 1:

```lua
local HapticService = game:GetService("HapticService")
local isVibrationSupported = HapticService:IsVibrationSupported(Enum.UserInputType.Gamepad1)
```

Some controllers have multiple motors for various scales of vibration. Once you have checked if a gamepad supports vibration, you should also check if it supports the motors you intend to use. The Xbox One controller has 4 motors:

- **Large:** in the left side of the controller. Good for generic rumble.
- **Small:** in the right side of the controller. Good for more subtle rumbles(tire slipping, electric shock, etc.).
- **Left Trigger:** underneath the left trigger. Good for braking, gun reloading, etc.
- **Right Trigger:** underneath the right trigger. Good for recoil, acceleration, etc.

The user might not have a controller that supports all of these motors. Many only support the Large and Small motors (no triggers). You can use `Class.HapticService:IsMotorSupported()` to see if the user's controller supports the motor you want to use.

Use the following sample code to verify if large vibration motors are supported on gamepad 1:

```lua
local HapticService = game:GetService("HapticService")
local isVibrationSupported = HapticService:IsVibrationSupported(Enum.UserInputType.Gamepad1)
local largeSupported = false
if isVibrationSupported then
	largeSupported = HapticService:IsMotorSupported(Enum.UserInputType.Gamepad1, Enum.VibrationMotor.Large)
end
```

### Turning on Motors

Once you have confirmed that a user's gamepad supports vibration you can start using the gamepad motors. You can use `Class.HapticService:SetMotor()` to turn on a specific motor on a gamepad. This function takes the gamepad and the amplitude of the vibration as arguments. The amplitude can be any value between `0` and `1`.

The following sample code sets the amplitude for gamepad 1's large motor to `.5`:

```lua
local HapticService = game:GetService("HapticService")
HapticService:SetMotor(Enum.UserInputType.Gamepad1, Enum.VibrationMotor.Large, .5)
```

You can also use `Class.HapticService:GetMotor()` to get the current vibration amplitude of a given motor. Use the following code sample to print the current amplitude for gamepad 1's large motor:

```lua
local HapticService = game:GetService("HapticService")
print(HapticService:GetMotor(Enum.UserInputType.Gamepad1, Enum.VibrationMotor.Large)
```

The following code is a sample implementation of vibration when a user character gets into a vehicle, where the vibration is based on the throttle of the vehicle:

```lua
-- Services
local HapticService = game:GetService("HapticService")
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")

-- Make sure you are running in a LocalScript.
local player = Players.LocalPlayer
assert(player,"This should be running in a LocalScript!")

-- Setup Haptic Feedback Listener
local function updateHapticFeedback()
	-- Check if you currently have a character.
	local character = player.Character
	if character then
		-- Do you have a Humanoid?
		local humanoid = character:FindFirstChildOfClass("Humanoid")
		if humanoid then
			-- Are you in a vehicle seat?
			local seatPart = humanoid.SeatPart
			if seatPart and seatPart:IsA("VehicleSeat") then
				-- Measure the current speed of the vehicle by taking the magnitude of the seat's velocity.
				local speed = seatPart.Velocity.Magnitude

				-- Measure the current throttle from the user.
				local throttle = math.abs(seatPart.ThrottleFloat)

				-- Compute how much the controller should be vibrating.
				local vibrationScale = math.min(1, (speed * throttle) / seatPart.MaxSpeed)

				-- Apply the vibration.
				HapticService:SetMotor(Enum.UserInputType.Gamepad1, Enum.VibrationMotor.Small, vibrationScale)

				-- Return so the motor doesn't get reset.
				return
			end
		end
	end

	-- If nothing is happening, turn off the motor.
	HapticService:SetMotor(Enum.UserInputType.Gamepad1, Enum.VibrationMotor.Small, 0)
end

-- Connect the haptic feedback listener to be updated 60 times a second.
RunService.Heartbeat:Connect(updateHapticFeedback)
```
