---
title: Cross-Platform Design
description: Explains best practices on designing UI that adapts across different screens and devices.
---

Roblox is **inherently cross-platform** as users can discover and join experiences on a PC, then later pick up their phone and continue where they left off. You should design your Roblox experiences to be accessible and enjoyable on **all** platforms that you choose to support, instead of optimizing for one platform and neglecting others.

## UI Layout

Just because a UI fits perfectly on a PC screen doesn't mean it's as functional on smaller mobile screens. For example, the color customization tiles in this UI become small and cramped on a phone:

<Grid container spacing={3} alignItems="flex-end">
<Grid item xs={12} sm={12} md={12} lg={7} xl={7}>
<img src="../assets/ui/cross-platform-design/UI-Layout-A-PC.png" width="440" style={{marginBottom:"0px;"}} />
<Alert severity="success">
Color customization tiles positioned in two rows on bottom of UI modal
</Alert>
</Grid>
<Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
<img src="../assets/ui/cross-platform-design/UI-Layout-A-Phone.png" width="294" style={{marginBottom:"0px;"}} />
<Alert severity="error">
Tiles small and difficult to tap on phones and mini tablets
</Alert>
</Grid>
</Grid>
<br />

In contrast, a slight redesign of the UI menu offers a better user experience on both PC and phone:

<Grid container spacing={3} alignItems="flex-end">
<Grid item xs={12} sm={12} md={12} lg={7} xl={7}>
<img src="../assets/ui/cross-platform-design/UI-Layout-B-PC.png" width="440" style={{marginBottom:"0px;"}} />
<Alert severity="success">
Color customization tiles positioned on right side of UI modal
</Alert>
</Grid>
<Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
<img src="../assets/ui/cross-platform-design/UI-Layout-B-Phone.png" width="294" style={{marginBottom:"0px;"}} />
<Alert severity="success">
Tiles larger and easier to tap on phones and mini tablets
</Alert>
</Grid>
</Grid>

## Reserved Zones

On mobile devices, the default controls occupy a portion of the bottom-left and bottom-right corners of the screen. When you design an experience's UI, avoid placing important info or virtual buttons in these zones.

<img src="../assets/ui/cross-platform-design/Reserved-Zones.jpg" width="90%" />

<Alert severity="warning">
If your experience uses the default control setting of `Enum.DevTouchMovementMode|DevTouchMovementMode.UserChoice`, users on mobile devices will be able to choose their input from **Dynamic&nbsp;Thumbstick**, **Classic&nbsp;Thumbstick**, or **Tap&nbsp;to&nbsp;Move**, causing the on-screen controls and reserved zones to vary slightly. Remember to design your UI around this possibility.
</Alert>

## Thumb Zones

Most mobile users use two thumbs &mdash; one on the virtual thumbstick and one on the jump button. Depending on the physical size of the device and the user's hands, "reaching" too far from the bottom corners becomes uncomfortable or impossible, so you should avoid placing frequently-used buttons outside of easy-to-reach zones.

<Grid container spacing={3} alignItems="flex-end">
<Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
<img src="../assets/ui/cross-platform-design/Thumb-Zones-Safe.png" width="90%" style={{marginBottom:"0px;"}} />
<Alert severity="success">
Button comfortably within reach of user's right thumb
</Alert>
</Grid>
<Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
<img src="../assets/ui/cross-platform-design/Thumb-Zones-Unsafe.png" width="90%" style={{marginBottom:"0px;"}} />
<Alert severity="error">
Button difficult to reach unless user stretches hand or thumb
</Alert>
</Grid>
</Grid>
<br />

Remember that comfortable thumb zones differ between phones and tablets because tablets have a larger screen. A button placed 30% below the screen's top edge is reachable on a phone but almost unreachable on a tablet, so you should consider [relational position](#positioning-in-relation) over percentage-based.

<Grid container spacing={3} alignItems="flex-end">
<Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
<img src="../assets/ui/cross-platform-design/Adaptable-UI-Phone.png" width="90%" style={{marginBottom:"0px;"}} />
<Alert severity="success">
Button 30% from top edge of phone, within reach of user's thumb
</Alert>
</Grid>
<Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
<img src="../assets/ui/cross-platform-design/Adaptable-UI-Tablet.png" width="90%" style={{marginBottom:"0px;"}} />
<Alert severity="error">
Button 30% from top edge of tablet, difficult to reach without stretching
</Alert>
</Grid>
</Grid>

## Context-Based UI

Screen space is limited on mobile devices, so you should show only the most vital information during active gameplay. For example, if your experience includes a special input action to open doors and treasure chests, it doesn't make sense to constantly show an "Open" button on the screen. Instead, use a [proximity prompt](../ui/proximity-prompts.md) or similar method to accept input only when the character approaches a door or chest.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/ui/cross-platform-design/Context-UI-Proximity-Prompt.jpg" width="100%" />
    <figcaption>`Class.ProximityPrompt` that automatically appears when character is near chest</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/cross-platform-design/Context-UI-Custom-Button.jpg" width="100%" />
    <figcaption>Custom button that you display only when character is near chest</figcaption>
  </figure>
</GridContainer>

## Adaptable UI

A cross-platform UI layout should be **adaptable** across all devices, not just between PC, mobile, and console but also between phones and tablets. You can achieve this through [relational positioning](#positioning-in-relation) and [input type detection](#adjusting-by-input-type).

### Positioning in Relation

A reliable approach for adaptable UI on both phones and tablets is to position custom buttons near frequently-used controls like the default jump button, placing them within easy reach of the user's right thumb.

<img src="../assets/ui/cross-platform-design/Custom-Buttons-Near-Jump.jpg" width="90%" />

The following code, placed in a `Class.LocalScript` within `Class.StarterPlayerScripts`, fetches the position of the jump button and creates a placeholder `Class.ImageButton` above it.

```lua title='LocalScript - Custom Button Above Jump Button'
local Players = game:GetService("Players")

-- Get reference to player's jump button
local player = Players.LocalPlayer
local PlayerGui = player:WaitForChild("PlayerGui")
local ScreenGui = PlayerGui:WaitForChild("ScreenGui")
local TouchGui = PlayerGui:WaitForChild("TouchGui")
local TouchControlFrame = TouchGui:WaitForChild("TouchControlFrame")
local JumpButton = TouchControlFrame:WaitForChild("JumpButton")

-- Get absolute size and position of button
local absSizeX, absSizeY = JumpButton.AbsoluteSize.X, JumpButton.AbsoluteSize.Y
local absPositionX, absPositionY = JumpButton.AbsolutePosition.X, JumpButton.AbsolutePosition.Y

-- Create new button above jump button
local customButton = Instance.new("ImageButton")
customButton.Parent = ScreenGui
customButton.AnchorPoint = Vector2.new(0.5, 1)
customButton.Size = UDim2.new(0, absSizeX * 0.8, 0, absSizeY * 0.8)
customButton.Position = UDim2.new(0, absPositionX + (absSizeX / 2), 0, absPositionY - 20)
```

### Adjusting by Input Type

Another approach for adaptable UI is to adjust your layout based on which **input type** the user is using, for example keyboard/mouse, touch, or gamepad.

The following `Class.ModuleScript` determines the user's input type on join and detects changes to input type during gameplay. From a `Class.LocalScript` that requires the module, you can detect the user's input type at any time and/or connect to the module's `Class.BindableEvent` to detect input type changes. Upon detection, you can reposition UI elements to better accommodate the current input.

```lua title='ModuleScript - Input Type Detection' highlight='54,57'
local UserInputService = game:GetService("UserInputService")

local PlayerInput = {}

PlayerInput.InputTypes = {
	KEYBOARD_MOUSE = "keyboard/mouse",
	TOUCH = "touch",
	GAMEPAD = "gamepad"
}

PlayerInput.CurrentInput = nil
PlayerInput.InputTypeChanged = Instance.new("BindableEvent")

local InputTypes = {
	[Enum.UserInputType.None] = nil,
	[Enum.UserInputType.TextInput] = nil,
	[Enum.UserInputType.InputMethod] = nil,

	[Enum.UserInputType.MouseButton1] = PlayerInput.InputTypes.KEYBOARD_MOUSE,
	[Enum.UserInputType.MouseButton2] = PlayerInput.InputTypes.KEYBOARD_MOUSE,
	[Enum.UserInputType.MouseButton3] = PlayerInput.InputTypes.KEYBOARD_MOUSE,
	[Enum.UserInputType.MouseWheel] = PlayerInput.InputTypes.KEYBOARD_MOUSE,
	[Enum.UserInputType.MouseMovement] = PlayerInput.InputTypes.KEYBOARD_MOUSE,
	[Enum.UserInputType.Keyboard] = PlayerInput.InputTypes.KEYBOARD_MOUSE,

	[Enum.UserInputType.Touch] = PlayerInput.InputTypes.TOUCH,
	[Enum.UserInputType.Accelerometer] = PlayerInput.InputTypes.TOUCH,
	[Enum.UserInputType.Gyro] = PlayerInput.InputTypes.TOUCH,

	[Enum.UserInputType.Gamepad1] = PlayerInput.InputTypes.GAMEPAD,
	[Enum.UserInputType.Gamepad2] = PlayerInput.InputTypes.GAMEPAD,
	[Enum.UserInputType.Gamepad3] = PlayerInput.InputTypes.GAMEPAD,
	[Enum.UserInputType.Gamepad4] = PlayerInput.InputTypes.GAMEPAD,
	[Enum.UserInputType.Gamepad5] = PlayerInput.InputTypes.GAMEPAD,
	[Enum.UserInputType.Gamepad6] = PlayerInput.InputTypes.GAMEPAD,
	[Enum.UserInputType.Gamepad7] = PlayerInput.InputTypes.GAMEPAD,
	[Enum.UserInputType.Gamepad8] = PlayerInput.InputTypes.GAMEPAD,
}

local function setPlayerInputType(userInputType)
	local playerInputType = InputTypes[userInputType]

	if playerInputType and playerInputType ~= PlayerInput.CurrentInput then
		PlayerInput.CurrentInput = playerInputType
		PlayerInput.InputTypeChanged:Fire(playerInputType)
	end
end

-- Initially set the player's input type
setPlayerInputType(UserInputService:GetLastInputType())

-- Update current input type based on last input type received
UserInputService.LastInputTypeChanged:Connect(setPlayerInputType)

return PlayerInput
```

```lua title='LocalScript - Check/Detect Current Input Type'
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local PlayerInput = require(ReplicatedStorage:WaitForChild("PlayerInput"))

-- Check the player's input type at any time by reading PlayerInput.CurrentInput
print("Player is using", PlayerInput.CurrentInput)

-- Listen for input type changes with PlayerInput.InputTypeChanged event
PlayerInput.InputTypeChanged.Event:Connect(function(newInputType)
	print("Input changed to", newInputType)
end)
```

<Alert severity="warning">
Since a user may use a different input or controller than the device's expected default, your UI should respect the **active** input type. The example `Class.ModuleScript` handles this through `Class.UserInputService:GetLastInputType()` and `Class.UserInputService.LastInputTypeChanged` instead of simply checking whether the device has input "capability" like touch. For additional information on verifying mobile input types, see [Mobile Input](../input/mobile.md).
</Alert>
