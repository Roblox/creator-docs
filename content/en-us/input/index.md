---
title: Input
description: Summary of cross-platform input on Roblox and implementation guidelines.
---

import DefaultBindings from '../includes/default-bindings.md'

Every experience needs to receive user input for players to interact and view their environment. Roblox supports nearly all forms of input, including [mouse/keyboard](../input/mouse-and-keyboard.md), [touch](../input/mobile.md), [gamepads](../input/gamepad.md), and VR.

## Cross-platform input

Roblox is inherently [cross‑platform](../projects/cross-platform.md), as players can discover and join experiences on their phone or tablet, then later continue where they left off on their PC or console. Input is especially important as part of your cross‑platform development plan.

To simplify this process, Roblox provides the [Input Action System](../input/input-action-system.md) to define **actions** such as "jump," "sprint," or "shoot" and set up **bindings** for multiple hardware inputs to drive those actions. This frees you from thinking of all the technical aspects of hardware inputs and allows you to simply define which inputs perform which actions.

<img src="../assets/publishing/cross-platform/Input-Actions-Jump.png" />

## Input type detection

In cross‑platform development, it's important that you determine and respond to the **primary** input type a player is using, normally to ensure that [UI&nbsp;elements](../ui/index.md#ui-objects) like on‑screen buttons and menus work elegantly across devices.

For example, a touch‑enabled device assumes touch is the default input and that touch buttons may appear for actions, but if a player connects an additional bluetooth keyboard/mouse or gamepad, you can assume they want to switch to that as the **primary** input type and possibly use touch as a backup input for on‑screen UI. The read‑only `Class.UserInputService.PreferredInput` property is a convenient way to test for and adapt to multiple input types across multiple device types, based on anticipated player behavior.

<Tabs>
<TabItem label="Behavior">
The value of `Class.UserInputService.PreferredInput|PreferredInput` changes based on built‑in device inputs and the player's most recent interaction with a connected gamepad or keyboard/mouse. Examples include:

<table>
	<thead>
		<tr>
			<th>Real-World Scenario</th>
			<th>`PreferredInput`</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Player is using a phone with no other connected input devices; no possibility of an input type change.</td>
			<td>`Enum.PreferredInput|Touch`</td>
		</tr>
		<tr>
			<td>Player is using a mobile device with a bluetooth keyboard & mouse connected, but no gamepad is connected.</td>
			<td>`Enum.PreferredInput|KeyboardAndMouse`</td>
		</tr>
		<tr>
			<td>Player is using a tablet with a bluetooth gamepad connected, but no keyboard or mouse is connected.</td>
			<td>`Enum.PreferredInput|Gamepad`</td>
		</tr>
		<tr>
			<td>Player is using an Xbox or PlayStation with a bluetooth keyboard & mouse connected and has most recently interacted with the keyboard or mouse.</td>
			<td>`Enum.PreferredInput|KeyboardAndMouse`</td>
		</tr>
		<tr>
			<td>Player is on a Windows or Mac PC with a gamepad connected and has most recently interacted with the gamepad.</td>
			<td>`Enum.PreferredInput|Gamepad`</td>
		</tr>
	</tbody>
</table>
</TabItem>
<TabItem label="Benefits">
Importantly, the `Class.UserInputService.PreferredInput|PreferredInput` property overcomes the following issues related to `Class.UserInputService.TouchEnabled` and `Class.UserInputService:GetLastInputType()`, both traditionally used to detect input types.

- `Class.UserInputService.TouchEnabled|TouchEnabled` is `true` on laptops with touch screens, so it is **not** a proper "is&nbsp;mobile" check.
- UI layouts for gamepad or keyboard/mouse may be more appropriate even if a device has touch capability, for example a mobile device with a bluetooth gamepad connected.
- Multiple `Class.UserInputService:GetLastInputType()|GetLastInputType()` values may represent the same input device, requiring compound `or` logic in scripts. For example, `Enum.UserInputType|MouseWheel`, `Enum.UserInputType|MouseMovement`, and `Enum.UserInputType|MouseButton1` all represent a mouse.
- `Class.UserInputService:GetLastInputType()|GetLastInputType()` frequently thrashes between `Enum.UserInputType|MouseMovement` and `Enum.UserInputType|Keyboard` which may cause code to run more often than expected. Similarly, thrashes between `Enum.UserInputType|Touch` and `Enum.UserInputType|Gamepad[]` may cause on‑screen UI to flicker between layouts.
- `Class.UserInputService:GetLastInputType()|GetLastInputType()` may return confusing values such as `Enum.UserInputType|TextInput`, `Enum.UserInputType|Focus`, and `Enum.UserInputType|InputMethod`.

<Alert severity="info">
For advanced workflows or control schemes that rely on detecting and responding to the player's **specific** most recent UserInputType, you can continue using UserInputService:GetLastInputType() and UserInputService.LastInputTypeChanged.
</Alert>
</TabItem>
</Tabs><br />

The following `Class.LocalScript` is a template for initially detecting the preferred input and responding to changes during gameplay.

```lua title="PreferredInput detection"
local UserInputService = game:GetService("UserInputService")

local function preferredInputChanged()
	local preferredInput = UserInputService.PreferredInput

	if preferredInput == Enum.PreferredInput.Touch then
		-- Player is on touch-enabled device with no other input types available/connected
		print("Touch")
	elseif preferredInput == Enum.PreferredInput.Gamepad then
		-- Player has connected or most recently interacted with a gamepad
		print("Gamepad")
	elseif preferredInput == Enum.PreferredInput.KeyboardAndMouse then
		-- Player has connected or most recently interacted with a keyboard or mouse
		print("KeyboardAndMouse")
	end
end

preferredInputChanged()

UserInputService:GetPropertyChangedSignal("PreferredInput"):Connect(function()
	preferredInputChanged()
end)
```

## Default bindings

<DefaultBindings components={props.components} />
