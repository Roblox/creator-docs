---
title: Input
description: Summary of cross-platform input on Roblox and implementation guidelines.
---

import DefaultBindings from '../includes/default-bindings.md'

Every experience needs to receive user input for players to interact and view their environment. Roblox supports nearly all forms of input, including [mouse/keyboard](../input/mouse-and-keyboard.md), [touch](../input/mobile.md), [gamepads](../input/gamepad.md), and VR.

## Cross-platform input

Roblox is inherently **cross‑platform**, as players can discover and join experiences on their phone or tablet, then later continue where they left off on their PC or console. Input is especially important as part of your cross‑platform development plan.

To simplify this process, Roblox provides the [Input Action System](../input/input-action-system.md) to define **actions** such as "jump," "sprint," or "shoot" and set up **bindings** for multiple hardware inputs to drive those actions. This frees you from thinking of all the technical aspects of hardware inputs and allows you to simply define which inputs perform which actions.

<img src="../assets/publishing/cross-platform/Input-Actions-Jump.png" />

## Input type detection

In cross‑platform development, it's important that you determine and respond to the **primary** input type a player is using, normally to ensure that [UI&nbsp;elements](../ui/index.md#ui-objects) like on‑screen buttons and menus work elegantly across devices.

For example, a touch‑enabled device assumes touch is the default input and that touch buttons may appear for actions, but if a player connects an additional bluetooth keyboard/mouse or gamepad, you can assume they want to switch to that as the **primary** input type and possibly use touch as a backup input for on‑screen UI. The read‑only `Class.UserInputService.PreferredInput` property is a convenient way to test for and adapt to multiple input types across multiple device types, based on anticipated player behavior.

<Tabs>
<TabItem label="Behavior">
The behavior of `Class.UserInputService.PreferredInput|PreferredInput` is summarized in the following table. Its value changes based on the value of legacy `Class.UserInputService` properties such as `Class.UserInputService.KeyboardEnabled|KeyboardEnabled`, `Class.UserInputService.GamepadEnabled|GamepadEnabled`, and `Class.UserInputService.TouchEnabled|TouchEnabled`, as well as the player's most recent interaction with a connected gamepad or keyboard/mouse.

<table>
	<thead>
		<tr>
			<th>`Class.UserInputService.KeyboardEnabled|KeyboardEnabled`;<br />`Class.UserInputService.GamepadEnabled|GamepadEnabled`;<br />`Class.UserInputService.TouchEnabled|TouchEnabled`</th>
			<th>Most Recent Interaction</th>
			<th>`PreferredInput`</th>
			<th>Example</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>`false`;&nbsp; `false`;&nbsp; `true`</td>
			<td>(don't&nbsp;care)</td>
			<td>`Enum.PreferredInput|Touch`</td>
			<td>⒜</td>
		</tr>
		<tr>
			<td>`true`;&nbsp; `false`;&nbsp; (don't&nbsp;care)</td>
			<td>(don't&nbsp;care)</td>
			<td>`Enum.PreferredInput|KeyboardAndMouse`</td>
			<td>⒝</td>
		</tr>
		<tr>
			<td>`false`;&nbsp; `true`;&nbsp; (don't&nbsp;care)</td>
			<td>(don't&nbsp;care)</td>
			<td>`Enum.PreferredInput|Gamepad`</td>
			<td>⒞</td>
		</tr>
		<tr>
			<td>`true`;&nbsp; `true`;&nbsp; (don't&nbsp;care)</td>
			<td>Keyboard or Mouse</td>
			<td>`Enum.PreferredInput|KeyboardAndMouse`</td>
			<td>⒟</td>
		</tr>
		<tr>
			<td>`true`;&nbsp; `true`;&nbsp; (don't&nbsp;care)</td>
			<td>Gamepad</td>
			<td>`Enum.PreferredInput|Gamepad`</td>
			<td>⒠</td>
		</tr>
	</tbody>
</table>

<figcaption>⒜ Phone with no other connected input devices; no possibility of an input type change</figcaption>
<figcaption>⒝ Mobile device with bluetooth keyboard and mouse connected, but no connected gamepad</figcaption>
<figcaption>⒞ Tablet with a gamepad connected, but no connected mouse/keyboard</figcaption>
<figcaption>⒟ Xbox or PlayStation with a bluetooth keyboard/mouse connected, and keyboard or mouse most recently interacted with</figcaption>
<figcaption>⒠ Windows or Mac with a gamepad connected, and gamepad most recently interacted with</figcaption><br />
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
