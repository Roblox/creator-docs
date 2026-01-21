---
title: Input Action System
description: The cross-platform Input Action System lets you connect actions and arrange bindings across various hardware inputs at edit time.
---

import DefaultBindings from '../includes/default-bindings.md'

The cross-platform **Input Action System** lets you connect [actions](#input-actions) and arrange [bindings](#input-bindings) across various hardware inputs at edit time. Combined with [contexts](#input-contexts), you can easily configure and edit a modular input system that works on any device in any phase of play. Use cases include:

- A first-person shooter system with actions dynamically swapping in and out depending on if the player is in battle mode or spectator mode.
- A comprehensive driving system equipped with acceleration/deceleration, car boosters, and refuel stations.
- Hotkeys for an abilities system in a fighting game to swap out moves seamlessly without players missing a punch.

## Input contexts

An `Class.InputContext` is a collection of actions which holds related [input actions](#input-actions), for example `PlayContext` for in‑experience character controls and `NavContext` for controls to navigate around UI menus. You can enable or disable contexts (and their corresponding actions) through their `Class.InputContext.Enabled|Enabled` property, such as to enable the `NavContext` when an inventory menu is open and then change to the `PlayContext` when the player closes the menu and returns to primary gameplay.

Even if an experience may not use multiple input contexts initially, best practice is to create a primary context at the top level of any input system, for example the `PlayContext` instance for input that occurs during gameplay.

1. Insert a new `Class.InputContext` into `Class.StarterGui`.
2. Rename it to `PlayContext`.

   <img src="../assets/studio/explorer/StarterGui-InputContext.png" width="320" alt="New InputContext instance inside StarterGui, renamed to PlayContext" />

## Input actions

An `Class.InputAction` defines a gameplay action mechanic such as "Jump," "Sprint," or "Shoot." These actions are then mapped to hardware inputs using [input bindings](#input-bindings).

An `Class.InputAction` can be of several variations depending on its `Class.InputAction.Type|Type` property (`Enum.InputActionType`). The default is `Enum.InputActionType|Bool`, designed to receive `true`/`false` values from press/release of inputs such as `Enum.KeyCode.ButtonA|ButtonA`, `Enum.KeyCode.E|E`, or `Enum.KeyCode.MouseLeftButton|MouseLeftButton`. The `Enum.InputActionType|Bool` type also exposes the `Class.InputBinding.UIButton|UIButton` property on child bindings, allowing you to easily hook up press/release of a specific `Class.GuiButton` for the action.

<table>
	<thead>
		<tr>
			<th>Input&nbsp;Action&nbsp;Type</th>
			<th>Example Usage</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>`Enum.InputActionType|Bool`</td>
			<td>Triggered actions such as jump, shoot, sprint, etc. with support for pressed/released thresholds on analog inputs.</td>
		</tr>
		<tr>
			<td>`Enum.InputActionType|Direction1D`</td>
			<td>Variable zero-to-full actions such as a car's accelerator pedal or a view scope's zoom level.</td>
		</tr>
		<tr>
			<td>`Enum.InputActionType|Direction2D`</td>
			<td>2D directional movement such as camera rotation, or the standard Roblox character movement.</td>
		</tr>
		<tr>
			<td>`Enum.InputActionType|Direction3D`</td>
			<td>3D directional movement like an airborne vehicle that can levitate up/down, accelerate/decelerate, and drift left/right.</td>
		</tr>
		<tr>
			<td>`Enum.InputActionType|ViewportPosition`</td>
			<td>2D viewport coordinates like mouse input, such as for custom cursors or raycasting to select world objects.</td>
		</tr>
	</tbody>
</table>

To test an `Class.InputAction` for simple character sprinting:

1. Create a new `Class.InputAction`  inside the `PlayContext` context within `Class.StarterGui`. Rename it to `CharacterSprint` to indicate its dedicated action.

   <img src="../assets/studio/explorer/StarterGui-InputContext-InputAction.png" width="320" alt="New InputAction instance inside an InputContext, renamed to CharacterSprint" />

2. In the [Properties](../studio/properties.md) window, notice that the action's `Class.InputAction.Type|Type` is `Enum.InputActionType|Bool` (default). This is a logical type for simple character sprinting as a boolean `true`/`false` action (character is either sprinting or not sprinting).

   <img src="../assets/studio/properties/InputAction-Type-Bool.png" width="320" alt="Type property of an InputAction set to Bool" />

## Input bindings

An `Class.InputBinding` defines which hardware binding should trigger the parent `Class.InputAction`, for example a key press, gamepad button, or tap on a touch‑enabled device. For [cross‑platform](../projects/cross-platform.md) compatibility, each `Class.InputAction` should have an `Class.InputBinding` for **gamepad**, **keyboard/mouse**, and **touch** as illustrated here.

<img src="../assets/studio/explorer/StarterGui-InputContext-InputAction-InputBinding-All.png" width="320" />

The `Class.InputAction.Type|Type` assigned to the parent `Class.InputAction` directly affects which general input types (key/button/tap, analog trigger, thumbstick, etc.) are valid for child `Class.InputBinding` instances. In turn, values sent to the parent action's connected events depend on a binding's chosen input type. See [input events](#input-events) for details on the correlation between action types, bindings, and return values.

To hook up bindings for simple character sprinting:

1. Insert a new `Class.InputBinding` into the `CharacterSprint` action and rename it to `KeyboardBinding`. Then set the binding's `Class.InputBinding.KeyCode|KeyCode` property to `Enum.KeyCode.LeftShift|LeftShift`.

	 <Grid container spacing={2} alignItems="top">
	 <Grid item>
     <img src="../assets/studio/explorer/StarterGui-InputContext-InputAction-InputBinding-KeyboardBinding.png" width="320" />
	 </Grid>
	 <Grid item>
     <img src="../assets/studio/properties/InputBinding-KeyCode-LeftShift.png" width="320" />
	 </Grid>
	 </Grid>

2. To ensure mouse <kbd>Shift</kbd>-lock does not interfere with the key binding, select `Class.StarterPlayer` in the [Explorer](../studio/explorer.md) and disable its `Class.StarterPlayer.EnableMouseLockOption|EnableMouseLockOption` in the [Properties](../studio/properties.md) window.

	 <Grid container spacing={2} alignItems="top">
	 <Grid item>
     <img src="../assets/studio/explorer/StarterPlayer.png" width="320" />
	 </Grid>
	 <Grid item>
     <img src="../assets/studio/properties/StarterPlayer-EnableMouseLockOption-Off.png" width="320" />
	 </Grid>
	 </Grid>

3. Insert another `Class.InputBinding` into the `CharacterSprint` action and rename it to `GamepadBinding`. Then set the binding's `Class.InputBinding.KeyCode|KeyCode` property to `Enum.KeyCode.ButtonY|ButtonY`.

	 <Grid container spacing={2} alignItems="top">
	 <Grid item>
     <img src="../assets/studio/explorer/StarterGui-InputContext-InputAction-InputBinding-GamepadBinding.png" width="320" />
	 </Grid>
	 <Grid item>
     <img src="../assets/studio/properties/InputBinding-KeyCode-ButtonY.png" width="320" />
	 </Grid>
	 </Grid>

4. Inside a `Class.ScreenGui` container inside `Class.StarterGui`, create an [on-screen button](../ui/buttons.md), rename it to `SprintButton`, and [position/resize](../ui/position-and-size.md) it as desired.

   <img src="../assets/studio/explorer/StarterGui-ScreenGui-SprintButton.png" width="320" />

	 <img src="../assets/ui/button-text-input/Sprint-Button.png" width="840" />

5. Insert another `Class.InputBinding` into the `CharacterSprint` action and rename it to `TouchBinding`. Then, in the [Properties](../studio/properties.md) window, link the binding's `Class.InputBinding.UIButton|UIButton` property to the `SprintButton` button you created previously inside `Class.StarterGui`.

	 <Grid container spacing={2} alignItems="top">
	 <Grid item>
     <img src="../assets/studio/explorer/StarterGui-InputContext-InputAction-InputBinding-TouchBinding.png" width="320" />
	 </Grid>
	 <Grid item>
     <img src="../assets/studio/properties/InputBinding-UIButton-SprintButton.png" width="320" />
	 </Grid>
	 </Grid>

## Input events

The `Class.InputAction` instance has three built-in **events** to handle player input coming from `Class.InputBinding|InputBindings`.

- `Class.InputAction.Pressed|Pressed` — This event fires only when the input action's `Class.InputAction.Type|Type` is set to `Enum.InputActionType|Bool`, and only when the state transitions from `false` to `true`.
- `Class.InputAction.Released|Released` — This event fires only when the input action's `Class.InputAction.Type|Type` is set to `Enum.InputActionType|Bool`, and only when the state transitions from `true` to `false`.
- `Class.InputAction.StateChanged|StateChanged` — This event fires for all input action types whenever the state changes, except if the state attempts to transition to the same state.

Depending on the input action's `Class.InputAction.Type|Type` (`Enum.InputActionType|Bool`, `Enum.InputActionType|Direction1D`, `Enum.InputActionType|Direction2D`, `Enum.InputActionType|Direction3D`, or `Enum.InputActionType|ViewportPosition`) and the general input type coming from a child `Class.InputBinding` (key/button/tap, analog trigger, thumbstick, etc.), different values are returned to the `Class.InputAction.Pressed|Pressed`, `Class.InputAction.Released|Released`, and `Class.InputAction.StateChanged|StateChanged` event handlers. Examine the following tables to better understand the correlation.

<Tabs>
<TabItem label="Bool">
The `Enum.InputActionType|Bool` type is best for triggered actions such as jump, shoot, sprint, etc. with support for pressed/released thresholds on analog inputs.

<table>
<thead>
	<tr>
		<th>Valid Input Types on `Class.InputBinding|InputBindings`</th>
		<th>Returned to the `Class.InputAction` Event(s)</th>
	</tr>
</thead>
<tbody>
<tr>
<td width="40%">Boolean inputs from keyboard keys or basic mouse/gamepad buttons through the binding's `Class.InputBinding.KeyCode|KeyCode` property, or a `Class.GuiButton` press/release through the binding's `Class.InputBinding.UIButton|UIButton` property.</td>
<td><ul style={{marginBottom: -16}}><li>`Class.InputAction.Pressed|Pressed` event:<ul><li>`true` when pressed</li></ul></li><li>`Class.InputAction.Released|Released` event:<ul><li>`true` when released</li></ul></li><li>`Class.InputAction.StateChanged|StateChanged` event:<ul><li>`true` (pressed) or `false` (released)</li></ul></li></ul></td>
</tr>
<tr>
<td>Variable input amounts from analog inputs like gamepad triggers (`Enum.KeyCode.ButtonL2|ButtonL2`/`Enum.KeyCode.ButtonR2|ButtonR2`) through the binding's `Class.InputBinding.KeyCode|KeyCode` property.</td>
<td><ul style={{marginBottom: -16}}><li>`Class.InputAction.Pressed|Pressed` event:<ul><li>`true` when trigger press is `>=` `Class.InputBinding.PressedThreshold|PressedThreshold`</li></ul></li><li>`Class.InputAction.Released|Released` event:<ul><li>`true` when trigger press is `<=` `Class.InputBinding.ReleasedThreshold|ReleasedThreshold`</li></ul></li><li>`Class.InputAction.StateChanged|StateChanged` event:<ul><li style={{marginBottom: -16}}>`true` when trigger press is `>=` `Class.InputBinding.PressedThreshold|PressedThreshold`</li><li>`false` when trigger press is `<=` `Class.InputBinding.ReleasedThreshold|ReleasedThreshold`</li></ul></li></ul></td>
</tr>
</tbody>
</table>

</TabItem>
<TabItem label="Direction1D">
The `Enum.InputActionType|Direction1D` type is best for variable zero‑to‑full actions such as a car's accelerator pedal or a view scope's zoom level.

<table>
<thead>
	<tr>
		<th>Valid Input Types on `Class.InputBinding|InputBindings`</th>
		<th>Returned to the `Class.InputAction` Event(s)</th>
	</tr>
</thead>
<tbody>
<tr>
<td width="40%">Variable input amounts from analog inputs like gamepad triggers (`Enum.KeyCode.ButtonL2|ButtonL2`/`Enum.KeyCode.ButtonR2|ButtonR2`) through the binding's `Class.InputBinding.KeyCode|KeyCode`, `Class.InputBinding.Up|Up`, and `Class.InputBinding.Down|Down` properties.</td>
<td><ul style={{marginBottom: -16}}><li>`Class.InputAction.StateChanged|StateChanged` event:<ul><li style={{marginBottom: -16}}>`0` to `1` (fully released to fully pressed) through the `Class.InputBinding.KeyCode|KeyCode` or `Class.InputBinding.Up|Up` properties</li><li>`0` to `-1` (fully released to fully pressed) through the `Class.InputBinding.Down|Down` property</li></ul></li></ul></td>
</tr>
<tr>
<td>Boolean inputs from keyboard keys or basic mouse/gamepad buttons through the binding's `Class.InputBinding.KeyCode|KeyCode`, `Class.InputBinding.Up|Up`, and `Class.InputBinding.Down|Down` properties.</td>
<td><ul style={{marginBottom: -16}}><li>`Class.InputAction.StateChanged|StateChanged` event:<ul><li style={{marginBottom: -16}}>`1` (pressed) or `0` (released) through the `Class.InputBinding.KeyCode|KeyCode` or `Class.InputBinding.Up|Up` properties</li><li>`-1` (pressed) or `0` (released) through the `Class.InputBinding.Down|Down` property</li></ul></li></ul></td>
</tr>
</tbody>
</table>

</TabItem>
<TabItem label="Direction2D">
The `Enum.InputActionType|Direction2D` type is best for 2D directional movement such as camera rotation, or the standard Roblox character movement.

<table>
<thead>
	<tr>
		<th>Valid Input Types on `Class.InputBinding|InputBindings`</th>
		<th>Returned to the `Class.InputAction` Event(s)</th>
	</tr>
</thead>
<tbody>
<tr>
<td width="40%">Variable input amounts from 2D analog inputs like gamepad thumbsticks (`Enum.KeyCode.Thumbstick1|Thumbstick1`/`Enum.KeyCode.Thumbstick2|Thumbstick2`) through the binding's `Class.InputBinding.KeyCode|KeyCode` property.</td>
<td><ul style={{marginBottom: -16}}><li>`Class.InputAction.StateChanged|StateChanged` event:<ul><li>`Datatype.Vector2` between <Typography noWrap>`(-1, -1)`</Typography> and <Typography noWrap>`(1, 1)`</Typography></li></ul></li></ul></td>
</tr>
<tr>
<td>Variable input amounts from analog inputs like gamepad triggers (`Enum.KeyCode.ButtonL2|ButtonL2`/`Enum.KeyCode.ButtonR2|ButtonR2`) through the binding's `Class.InputBinding.Up|Up`, `Class.InputBinding.Down|Down`, `Class.InputBinding.Left|Left`, and `Class.InputBinding.Right|Right` properties.</td>
<td><ul style={{marginBottom: -16}}><li>`Class.InputAction.StateChanged|StateChanged` event:<ul><li style={{marginBottom: -16}}>`Datatype.Vector2` with `Datatype.Vector2.Y|Y` component between `0` and `1` (fully released to fully pressed) through the `Class.InputBinding.Up|Up` property</li><li style={{marginBottom: -16}}>`Datatype.Vector2` with `Datatype.Vector2.Y|Y` component between `0` and `-1` (fully released to fully pressed) through the `Class.InputBinding.Down|Down` property</li><li style={{marginBottom: -16}}>`Datatype.Vector2` with `Datatype.Vector2.X|X` component between `0` and `-1` (fully released to fully pressed) through the `Class.InputBinding.Left|Left` property</li><li>`Datatype.Vector2` with `Datatype.Vector2.X|X` component between `0` and `1` (fully released to fully pressed) through the `Class.InputBinding.Right|Right` property</li></ul></li></ul></td>
</tr>
<tr>
<td>Boolean inputs from keyboard keys or basic mouse/gamepad buttons through the binding's `Class.InputBinding.Up|Up`, `Class.InputBinding.Down|Down`, `Class.InputBinding.Left|Left`, and `Class.InputBinding.Right|Right` properties.</td>
<td><ul style={{marginBottom: -16}}><li>`Class.InputAction.StateChanged|StateChanged` event:<ul><li style={{marginBottom: -16}}>`Datatype.Vector2` of <Typography noWrap>`(0, 1)`</Typography> (pressed) or
<Typography noWrap>`(0, 0)`</Typography> (released) through the `Class.InputBinding.Up|Up` property</li><li style={{marginBottom: -16}}>`Datatype.Vector2` of <Typography noWrap>`(0, -1)`</Typography> (pressed) or
<Typography noWrap>`(0, 0)`</Typography> (released) through the `Class.InputBinding.Down|Down` property</li><li style={{marginBottom: -16}}>`Datatype.Vector2` of <Typography noWrap>`(-1, 0)`</Typography> (pressed) or
<Typography noWrap>`(0, 0)`</Typography> (released) through the `Class.InputBinding.Left|Left` property</li><li>`Datatype.Vector2` of <Typography noWrap>`(1, 0)`</Typography> (pressed) or
<Typography noWrap>`(0, 0)`</Typography> (released) through the `Class.InputBinding.Right|Right` property</li></ul></li></ul></td>
</tr>
</tbody>
</table>

</TabItem>
<TabItem label="Direction3D">
The `Enum.InputActionType|Direction3D` type is best for 3D directional movement like an airborne vehicle that can levitate up/down, accelerate/decelerate, and drift left/right.

<table>
<thead>
	<tr>
		<th>Valid Input Types on `Class.InputBinding|InputBindings`</th>
		<th>Returned to the `Class.InputAction` Event(s)</th>
	</tr>
</thead>
<tbody>
<tr>
<td width="40%">Variable input amounts from analog inputs like gamepad triggers (`Enum.KeyCode.ButtonL2|ButtonL2`/`Enum.KeyCode.ButtonR2|ButtonR2`) through the binding's `Class.InputBinding.Up|Up`, `Class.InputBinding.Down|Down`, `Class.InputBinding.Left|Left`, `Class.InputBinding.Right|Right`, `Class.InputBinding.Forward|Forward`, and `Class.InputBinding.Backward|Backward` properties.</td>
<td><ul style={{marginBottom: -16}}><li>`Class.InputAction.StateChanged|StateChanged` event:<ul><li style={{marginBottom: -16}}>`Datatype.Vector3` with `Datatype.Vector3.Y|Y` component between `0` and `1` (fully released to fully pressed) through the `Class.InputBinding.Up|Up` property</li><li style={{marginBottom: -16}}>`Datatype.Vector3` with `Datatype.Vector3.Y|Y` component between `0` and `-1` (fully released to fully pressed) through the `Class.InputBinding.Down|Down` property</li><li style={{marginBottom: -16}}>`Datatype.Vector3` with `Datatype.Vector3.X|X` component between `0` and `-1` (fully released to fully pressed) through the `Class.InputBinding.Left|Left` property</li><li style={{marginBottom: -16}}>`Datatype.Vector3` with `Datatype.Vector3.X|X` component between `0` and `1` (fully released to fully pressed) through the `Class.InputBinding.Right|Right` property</li><li style={{marginBottom: -16}}>`Datatype.Vector3` with `Datatype.Vector3.Z|Z` component between `0` and `-1` (fully released to fully pressed) through the `Class.InputBinding.Forward|Forward` property</li><li>`Datatype.Vector3` with `Datatype.Vector3.Z|Z` component between `0` and `1` (fully released to fully pressed) through the `Class.InputBinding.Backward|Backward` property</li></ul></li></ul></td>
</tr>
<tr>
<td>Boolean inputs from keyboard keys or basic mouse/gamepad buttons through the binding's `Class.InputBinding.Up|Up`, `Class.InputBinding.Down|Down`, `Class.InputBinding.Left|Left`, `Class.InputBinding.Right|Right`, `Class.InputBinding.Forward|Forward`, and `Class.InputBinding.Backward|Backward` properties.</td>
<td><ul style={{marginBottom: -16}}><li>`Class.InputAction.StateChanged|StateChanged` event:<ul><li style={{marginBottom: -16}}>`Datatype.Vector3` of <Typography noWrap>`(0, 1, 0)`</Typography> (pressed) or <Typography noWrap>`(0, 0, 0)`</Typography> (released) through the `Class.InputBinding.Up|Up` property</li><li style={{marginBottom: -16}}>`Datatype.Vector3` of <Typography noWrap>`(0, -1, 0)`</Typography> (pressed) or <Typography noWrap>`(0, 0, 0)`</Typography> (released) through the `Class.InputBinding.Down|Down` property</li><li style={{marginBottom: -16}}>`Datatype.Vector3` of <Typography noWrap>`(-1, 0, 0)`</Typography> (pressed) or <Typography noWrap>`(0, 0, 0)`</Typography> (released) through the `Class.InputBinding.Left|Left` property</li><li style={{marginBottom: -16}}>`Datatype.Vector3` of <Typography noWrap>`(1, 0, 0)`</Typography> (pressed) or <Typography noWrap>`(0, 0, 0)`</Typography> (released) through the `Class.InputBinding.Right|Right` property</li><li style={{marginBottom: -16}}>`Datatype.Vector3` of <Typography noWrap>`(0, 0, -1)`</Typography> (pressed) or <Typography noWrap>`(0, 0, 0)`</Typography> (released) through the `Class.InputBinding.Forward|Forward` property</li><li>`Datatype.Vector3` of <Typography noWrap>`(0, 0, 1)`</Typography> (pressed) or <Typography noWrap>`(0, 0, 0)`</Typography> (released) through the `Class.InputBinding.Backward|Backward` property</li></ul></li></ul></td>
</tr>
</tbody>
</table>

</TabItem>
<TabItem label="ViewportPosition">
The `Enum.InputActionType|ViewportPosition` type is best for absolute 2D viewport coordinates of an input such as a mouse pointer or touch, which can be used for features like custom cursors or selecting objects.

<table>
<thead>
	<tr>
		<th>Valid Input Types on `Class.InputBinding|InputBindings`</th>
		<th>Returned to the `Class.InputAction` Event(s)</th>
	</tr>
</thead>
<tbody>
<tr>
<td width="40%">Variable input amounts from positional inputs such as a mouse pointer (`Enum.KeyCode.MousePosition|MousePosition`) or touch (`Enum.KeyCode.Touch|Touch`).</td>
<td><ul style={{marginBottom: -16}}><li>`Class.InputAction.StateChanged|StateChanged` event:<ul><li>`Datatype.Vector2` between <Typography noWrap>`(0, 0)`</Typography> and the maximum absolute <Typography noWrap>`(X, Y)`</Typography> pixel size in the viewport.</li></ul></li></ul></td>
</tr>
</tbody>
</table>

</TabItem>
</Tabs>

<Alert severity="info">
Note that returned `Datatype.Vector2`/`Datatype.Vector3` values for 2D/3D inputs will be normalized such that the magnitude is never greater than `1` (unless scaling is applied). For example, a 45° up+right press on a gamepad thumbstick will return a normalized `Datatype.Vector2` of <Typography noWrap>`(0.7071, 0.7071)`</Typography> instead of <Typography noWrap>`(1, 1)`</Typography>. In practical terms of character movement, this ensures that diagonal presses do not allow players to move faster diagonally than they would in a cardinal direction.
</Alert><br />

To connect events for simple character sprinting:

1. Insert a new `Class.LocalScript` into the `CharacterSprint` tree, alongside the various input bindings.

   <img src="../assets/studio/explorer/StarterGui-InputContext-InputAction-LocalScript.png" width="320" />

2. Paste the following code into the script. Note the `Class.InputAction.Pressed|Pressed` event connection on lines `13`‑`15` which doubles the character's walk speed when a sprint input binding is pressed, and the corresponding `Class.InputAction.Released|Released` event connection on lines `16`‑`18` which resets the walk speed to default when a sprint input binding is released.

		```lua
		local Players = game:GetService("Players")

		local player = Players.LocalPlayer
		local character = player.Character
		if not character or character.Parent == nil then
			character = player.CharacterAdded:Wait()
		end
		local humanoid = character:WaitForChild("Humanoid")
		local defaultWalkSpeed = humanoid.WalkSpeed

		local inputAction = script.Parent

		inputAction.Pressed:Connect(function()
			humanoid.WalkSpeed = defaultWalkSpeed * 2
		end)
		inputAction.Released:Connect(function()
			humanoid.WalkSpeed = defaultWalkSpeed
		end)
		```

3. Playtest your experience and test the character sprint action with the [bindings](#input-bindings) you chose previously: `Enum.KeyCode.LeftShift|LeftShift` for keyboard, `Enum.KeyCode.ButtonY|ButtonY` for gamepad, and the on‑screen `SprintButton` for touch‑enabled devices. Remember that you can use the [Controller Emulator](../studio/testing-modes.md#controller-emulation) to test gamepad inputs directly in Roblox Studio.

   <video controls src="../assets/ui/button-text-input/Sprint-Demo.mp4" width="720"></video>

## Context changes

Once you have an [input context](#input-contexts) such as `PlayContext`, you can enable/disable it during gameplay through scripting, change its `Class.InputContext.Priority|Priority` to determine which actions take precedence over others, and `Class.InputContext.Sink|Sink` inputs from being processed within contexts of lower priority.

1. To make it easier to switch contexts from other scripts, insert a new `Class.BindableEvent` into `Class.StarterGui` and rename it to `ContextEvent`.

   <img src="../assets/studio/explorer/StarterGui-BindableEvent-ContextEvent.png" width="320" />

2. Create a new `Class.LocalScript` inside `Class.StarterGui` and rename it to `UpdateContext`.

   <img src="../assets/studio/explorer/StarterGui-LocalScript-UpdateContext.png" width="320" />

3. Inside the `UpdateContext` script, paste the following code:

		```lua
		local Players = game:GetService("Players")

		local player = Players.LocalPlayer
		local playerGui = player.PlayerGui

		local contextEvent = playerGui:FindFirstChild("ContextEvent")

		-- Connect bindable event
		contextEvent.Event:Connect(function(targetContext, enabled)
			local context = playerGui:FindFirstChild(targetContext)
			if context then
				context.Enabled = enabled
				print(context.Name .. ": " .. tostring(context.Enabled))
			else
				warn("InputContext not found!")
			end
		end)
		```

4. With the `UpdateContext` script in place, you can now update a named `Class.InputContext` by firing the bindable event, for example from another `Class.LocalScript` that powers a `Class.GuiButton` inside the `Class.ScreenGui` container.

   <img src="../assets/studio/explorer/StarterGui-ScreenGui-TextButton.png" width="320" style={{marginBottom: 0}} />

		```lua
		local Players = game:GetService("Players")

		local player = Players.LocalPlayer
		local playerGui = player.PlayerGui

		local contextEvent = playerGui:FindFirstChild("ContextEvent")

		local button = script.Parent
		button.Activated:Connect(function()
			-- Fire bindable event with target input context and enabled state
			contextEvent:Fire("PlayContext", true)
		end)
		```

## Default bindings

<DefaultBindings components={props.components} />
