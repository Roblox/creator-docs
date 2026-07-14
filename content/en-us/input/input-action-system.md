---
title: Input Action System
description: The cross-platform Input Action System lets you connect actions and arrange bindings across various hardware inputs at edit time.
---

import BetaAlert from '../includes/beta-features/beta-alert.md'
import DefaultBindings from '../includes/default-bindings.md'

The cross-platform **Input Action System** lets you connect [actions](#input-actions) and arrange [bindings](#input-bindings) across various hardware inputs at edit time. Combined with [contexts](#input-contexts), you can easily configure and edit a modular input system that works on any device in any phase of play. Use cases include:

- A first-person shooter system with actions dynamically swapping in and out depending on if the player is in battle mode or spectator mode.
- A comprehensive driving system equipped with acceleration/deceleration, car boosters, and refuel stations.
- Hotkeys for an abilities system in a fighting game to swap out moves seamlessly without players missing a punch.

## Input contexts

An `Class.InputContext` is a collection of actions which holds related [input actions](#input-actions), for example `PlayContext` for in‑game character controls and `NavContext` for controls to navigate around UI menus. You can [enable/disable contexts](#context-changes) (and their corresponding actions) through their `Class.InputContext.Enabled|Enabled` property, such as to enable the `NavContext` when an inventory menu is open and then change to the `PlayContext` when the player closes the menu and returns to primary gameplay.

Even if a game may not use multiple input contexts initially, it's recommended to create a primary context at the top level of any input system, for example the `PlayContext` instance for input that occurs during gameplay.

1. <Chip label="RECOMMENDED" size="small" variant="outlined" color="success" /> Create a `Class.Folder` named `Inputs` inside `Class.ReplicatedStorage` to hold various input contexts.

   <img src="../assets/studio/explorer/ReplicatedStorage-Folder-Inputs.png" width="320" alt="New Folder inside ReplicatedStorage, renamed to Inputs" />

2. Insert a new `Class.InputContext` into the folder and rename it to `PlayContext`.

   <img src="../assets/studio/explorer/ReplicatedStorage-InputContext.png" width="320" alt="New InputContext instance inside ReplicatedStorage, renamed to PlayContext" />

3. <Chip label="OPTIONAL" size="small" variant="outlined" color="primaryBrand" /> In the [Properties](../studio/properties.md) window, set `Class.InputContext.Priority|Priority` to `2000` and enable `Class.InputContext.Sink|Sink`. A context with `Class.InputContext.Sink|Sink` enabled consumes input events for its bound `Enum.KeyCode|KeyCodes` at its priority level, blocking those inputs from reaching lower-priority contexts. This is practical for use cases like an inventory screen that should suppress specific gameplay inputs while open. In this example, `PlayContext` is given a high enough `Class.InputContext.Priority|Priority` to sink its bound inputs before the default `Class.PlayerScripts` contexts process them.

   <img src="../assets/studio/properties/InputContext-Priority-Sink.png" width="320" alt="InputContext with Priority set to 2000 and Sink enabled" />

## Input actions

An `Class.InputAction` defines a gameplay action mechanic such as "Jump," "Sprint," or "Shoot." These actions are then mapped to hardware inputs using [input bindings](#input-bindings).

An `Class.InputAction` can be of several variations depending on its `Class.InputAction.Type|Type` property (`Enum.InputActionType`). The default is `Enum.InputActionType|Bool`, designed to receive `true`/`false` values from press/release of inputs such as `Enum.KeyCode.ButtonA|ButtonA`, `Enum.KeyCode.E|E`, or `Enum.KeyCode.MouseLeftButton|MouseLeftButton`.

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

<Tabs>
<TabItem label="Character Sprint">
To test an `Class.InputAction` for simple character sprinting:

1. <Chip label="RECOMMENDED" size="small" variant="outlined" color="success" /> Select the top-level `Class.Workspace` object in the [Explorer](../studio/explorer.md) and then, in the [Properties](../studio/properties.md) window, set the `Class.Workspace.PlayerScriptsUseInputActionSystem|PlayerScriptsUseInputActionSystem` property to `Enum.RolloutState|Enabled`.

2. Create a new `Class.InputAction` inside the `PlayContext` context within `Class.ReplicatedStorage`. Rename it to `CharacterSprint` to indicate its dedicated action.

   <img src="../assets/studio/explorer/ReplicatedStorage-InputContext-SprintAction.png" width="320" alt="New InputAction instance inside an InputContext, renamed to CharacterSprint" />

3. In the [Properties](../studio/properties.md) window, notice that the action's `Class.InputAction.Type|Type` is `Enum.InputActionType|Bool` (default). This is a logical type for simple character sprinting as a boolean `true`/`false` action (character is either sprinting or not sprinting).

   <img src="../assets/studio/properties/SprintAction-Type-Bool.png" width="320" alt="Type property of an InputAction set to Bool" />

</TabItem>
<TabItem label="Camera Rotation">
To test an `Class.InputAction` for camera rotation:

1. Create a new `Class.InputAction` inside the `PlayContext` context within `Class.ReplicatedStorage`. Rename it to `CameraRotate` to indicate its dedicated action.

   <img src="../assets/studio/explorer/ReplicatedStorage-InputContext-CameraAction.png" width="320" alt="New InputAction instance inside an InputContext, renamed to CameraRotate" />

2. In the [Properties](../studio/properties.md) window, set the action's `Class.InputAction.Type|Type` to `Enum.InputActionType|Direction2D`. This reflects that camera rotation is a continuous 2D analog input rather than a discrete press/release.

   <img src="../assets/studio/properties/CameraAction-Type-Direction2D.png" width="320" alt="Type property of an InputAction set to Direction2D" />

</TabItem>
</Tabs>

## Input bindings

An `Class.InputBinding` defines which hardware binding should trigger the parent `Class.InputAction`, for example a key press, gamepad button, or tap on a touch‑enabled device. For [cross‑platform](../projects/cross-platform.md) compatibility, each `Class.InputAction` should have an `Class.InputBinding` for **gamepad**, **keyboard/mouse**, and **touch** as illustrated here.

<img src="../assets/studio/explorer/ReplicatedStorage-InputContext-InputBinding-All.png" width="320" />

<BaseAccordion>
<AccordionSummary><Typography variant="subtitle2">Default Bindings</Typography></AccordionSummary>
<AccordionDetails>
<DefaultBindings components={props.components} />
</AccordionDetails>
</BaseAccordion><br />

The `Class.InputAction.Type|Type` assigned to the parent `Class.InputAction` directly affects which general input types (key/button/tap, analog trigger, thumbstick, etc.) are valid for child `Class.InputBinding` instances. In turn, values sent to the parent action's connected events depend on a binding's chosen input type. See [input events](#input-events) for details on the correlation between action types, bindings, and return values.

<Tabs>
<TabItem label="Character Sprint">
To hook up bindings for simple character sprinting:

1. Insert a new `Class.InputBinding` into the `CharacterSprint` action and rename it to `KeyboardBinding`. Then set the binding's `Class.InputBinding.KeyCode|KeyCode` property to `Enum.KeyCode.LeftShift|LeftShift`.

	 <Grid container spacing={2} alignItems="top">
	 <Grid item>
     <img src="../assets/studio/explorer/ReplicatedStorage-InputContext-SprintAction-InputBinding-KeyboardBinding.png" width="320" />
	 </Grid>
	 <Grid item>
     <img src="../assets/studio/properties/InputBinding-KeyCode-LeftShift.png" width="320" />
	 </Grid>
	 </Grid>

2. Insert a second `Class.InputBinding` into the `CharacterSprint` action and rename it to `GamepadBinding`. Then set the binding's `Class.InputBinding.KeyCode|KeyCode` property to `Enum.KeyCode.ButtonY|ButtonY`.

	 <Grid container spacing={2} alignItems="top">
	 <Grid item>
     <img src="../assets/studio/explorer/ReplicatedStorage-InputContext-SprintAction-InputBinding-GamepadBinding.png" width="320" />
	 </Grid>
	 <Grid item>
     <img src="../assets/studio/properties/InputBinding-KeyCode-ButtonY.png" width="320" />
	 </Grid>
	 </Grid>

3. Inside a `Class.ScreenGui` container inside `Class.StarterGui`, create an [on-screen button](../ui/buttons.md), rename it to `SprintButton`, and [position/resize](../ui/position-and-size.md) it as desired.

   <img src="../assets/studio/explorer/StarterGui-ScreenGui-SprintButton.png" width="320" />

	 <img src="../assets/ui/button-text-input/Sprint-Button.png" width="840" />

4. Insert a third `Class.InputBinding` into the `CharacterSprint` action and rename it to `TouchBinding`. Then, in the [Properties](../studio/properties.md) window, link the binding's `Class.InputBinding.UIButton|UIButton` property to the `SprintButton` button you created previously inside `Class.StarterGui`.

	 <Grid container spacing={2} alignItems="top">
	 <Grid item>
     <img src="../assets/studio/explorer/ReplicatedStorage-InputContext-SprintAction-InputBinding-TouchBinding.png" width="320" />
	 </Grid>
	 <Grid item>
     <img src="../assets/studio/properties/InputBinding-UIButton-SprintButton.png" width="320" />
	 </Grid>
	 </Grid>

</TabItem>
<TabItem label="Camera Rotation">
To hook up bindings for camera rotation:

1. Insert a new `Class.InputBinding` into the `CameraRotate` action and rename it to `KeyboardBinding`. Leave `Class.InputBinding.KeyCode|KeyCode` empty and instead set the four composite directional properties&nbsp;— `Class.InputBinding.Left|Left`, `Class.InputBinding.Right|Right`, `Class.InputBinding.Up|Up`, and `Class.InputBinding.Down|Down`&nbsp;— to `Enum.KeyCode.Left|Left`, `Enum.KeyCode.Right|Right`, `Enum.KeyCode.Up|Up`, and `Enum.KeyCode.Down|Down` respectively.

	 <Grid container spacing={2} alignItems="top">
	 <Grid item>
     <img src="../assets/studio/explorer/ReplicatedStorage-InputContext-CameraAction-InputBinding-KeyboardBinding.png" width="320" />
	 </Grid>
	 <Grid item>
     <img src="../assets/studio/properties/InputBinding-Directions-ArrowKeys.png" width="320" />
	 </Grid>
	 </Grid>

2. Insert a second `Class.InputBinding` and rename it to `GamepadBinding`. Then set the binding's `Class.InputBinding.KeyCode|KeyCode` property to `Enum.KeyCode.Thumbstick2|Thumbstick2` (right thumbstick).

	 <Grid container spacing={2} alignItems="top">
	 <Grid item>
     <img src="../assets/studio/explorer/ReplicatedStorage-InputContext-CameraAction-InputBinding-GamepadBinding.png" width="320" />
	 </Grid>
	 <Grid item>
     <img src="../assets/studio/properties/InputBinding-KeyCode-Thumbstick2.png" width="320" />
	 </Grid>
	 </Grid>

3. Insert a third `Class.InputBinding` and rename it to `MouseBinding`. Set the binding's `Class.InputBinding.KeyCode|KeyCode` property to `Enum.KeyCode.MouseDelta|MouseDelta` and its `Class.InputBinding.Scale|Scale` to `0.01`. `Enum.KeyCode.MouseDelta|MouseDelta` reports values in pixels, so the scale converts them to a reasonable rotation range.

	 <Grid container spacing={2} alignItems="top">
	 <Grid item>
     <img src="../assets/studio/explorer/ReplicatedStorage-InputContext-CameraAction-InputBinding-MouseBinding.png" width="320" />
	 </Grid>
	 <Grid item>
     <img src="../assets/studio/properties/InputBinding-KeyCode-MouseDelta.png" width="320" />
	 </Grid>
	 </Grid>

4. Insert a fourth `Class.InputBinding` and rename it to `TouchBinding`. Set the binding's `Class.InputBinding.KeyCode|KeyCode` property to `Enum.KeyCode.TouchDelta|TouchDelta` and its `Class.InputBinding.Scale|Scale` to `0.01`. Like `Enum.KeyCode.MouseDelta|MouseDelta`, `Enum.KeyCode.TouchDelta|TouchDelta` reports values in pixels.

	 <Grid container spacing={2} alignItems="top">
	 <Grid item>
     <img src="../assets/studio/explorer/ReplicatedStorage-InputContext-CameraAction-InputBinding-TouchBinding.png" width="320" />
	 </Grid>
	 <Grid item>
     <img src="../assets/studio/properties/InputBinding-KeyCode-TouchDelta.png" width="320" />
	 </Grid>
	 </Grid>

</TabItem>
</Tabs>

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

<Tabs>
<TabItem label="Character Sprint">
To connect events for simple character sprinting:

1. Insert a new `Class.Script` into the `CharacterSprint` tree, alongside the various input bindings. Then set its `Class.BaseScript.RunContext|RunContext` to `Enum.RunContext.Client|Client` and rename it to `OnActivate`.

   <img src="../assets/studio/explorer/ReplicatedStorage-InputContext-SprintAction-Script.png" width="320" />

2. Paste the following code into the `OnActivate` script. Note the `Class.InputAction.Pressed|Pressed` event connection on lines `13`‑`15` which doubles the character's walk speed when a sprint input binding is pressed, and the corresponding `Class.InputAction.Released|Released` event connection on lines `16`‑`18` which resets the walk speed to default when a sprint input binding is released.

		```lua title="OnActivate (Client Script)"
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

3. Playtest your game and test the character sprint action with the [bindings](#input-bindings) you chose previously: `Enum.KeyCode.LeftShift|LeftShift` for keyboard, `Enum.KeyCode.ButtonY|ButtonY` for gamepad, and the on‑screen `SprintButton` for touch‑enabled devices. Remember that you can use the [Controller Emulator](../studio/testing-modes.md#controller-emulation) to test gamepad inputs directly in Roblox Studio.

   <video controls src="../assets/ui/button-text-input/Sprint-Demo.mp4" width="720"></video>

</TabItem>
<TabItem label="Camera Rotation">
For **continuous analog inputs** like camera rotation, `Class.InputAction.StateChanged|StateChanged` fires **once** when the state changes and does not signal until the next change, so a thumbstick held at a fixed angle only fires the event once. In these cases, poll `Class.InputAction:GetState()|GetState()` each frame and multiply by delta time for frame-rate-independent behavior.

1. Insert a new `Class.Script` into the `CameraRotate` tree, alongside the various input bindings. Then set its `Class.BaseScript.RunContext|RunContext` to `Enum.RunContext.Client|Client` and rename it to `OnInput`.

   <img src="../assets/studio/explorer/ReplicatedStorage-InputContext-CameraAction-Script.png" width="320" />

2. Paste the following code into the `OnInput` script.

	```lua title="OnInput (Client Script)"
	local RunService = game:GetService("RunService")

	local CAMERA_SENSITIVITY = 1.5 -- Radians per second at action state 1

	local inputAction = script.Parent
	local camera = workspace.CurrentCamera
	camera.CameraType = Enum.CameraType.Scriptable

	RunService:BindToRenderStep("CameraRotation", Enum.RenderPriority.Camera.Value, function(dt)
		local state = inputAction:GetState()
		if state.Magnitude > 0 then
			camera.CFrame = camera.CFrame
				* CFrame.Angles(0, -state.X * CAMERA_SENSITIVITY * dt, 0)
				* CFrame.Angles(-state.Y * CAMERA_SENSITIVITY * dt, 0, 0)
		end
	end)
	```

</TabItem>
</Tabs>

## Context changes

Once you have an [input context](#input-contexts) such as `PlayContext`, you can enable/disable it during gameplay through scripting, change its `Class.InputContext.Priority|Priority` to determine which actions take precedence over others, and `Class.InputContext.Sink|Sink` inputs from being processed within contexts of lower priority.

1. To make it easier to switch contexts from other scripts, insert a new `Class.BindableEvent` into your inputs folder within `Class.ReplicatedStorage` and rename it to `ContextEvent`.

   <img src="../assets/studio/explorer/ReplicatedStorage-BindableEvent-ContextEvent.png" width="320" />

2. Create a new `Class.Script` at the same level, set its `Class.BaseScript.RunContext|RunContext` to `Enum.RunContext.Client|Client`, and rename it to `UpdateContext`.

   <img src="../assets/studio/explorer/ReplicatedStorage-Script-UpdateContext.png" width="320" />

3. Inside the `UpdateContext` script, paste the following code:

		```lua title="UpdateContext (Client Script)"
		local ReplicatedStorage = game:GetService("ReplicatedStorage")

		local inputsFolder = ReplicatedStorage:WaitForChild("Inputs")
		local contextEvent = inputsFolder:WaitForChild("ContextEvent")

		-- Connect bindable event
		contextEvent.Event:Connect(function(targetContext, enabled)
			local context = inputsFolder:FindFirstChild(targetContext)
			if context then
				context.Enabled = enabled
				print(context.Name .. ": " .. tostring(context.Enabled))
			else
				warn("InputContext not found!")
			end
		end)
		```

4. With the `UpdateContext` script in place, you can now update a named `Class.InputContext` by firing the bindable event, for example from a `Class.LocalScript` that powers a `Class.GuiButton` inside a `Class.ScreenGui` container.

   <img src="../assets/studio/explorer/StarterGui-ScreenGui-TextButton.png" width="320" style={{marginBottom: 0}} />

		```lua title="Button Script"
		local ReplicatedStorage = game:GetService("ReplicatedStorage")

		local inputsFolder = ReplicatedStorage:WaitForChild("Inputs")
		local contextEvent = inputsFolder:WaitForChild("ContextEvent")

		local button = script.Parent
		button.Activated:Connect(function()
			-- Fire bindable event with target input context and enabled state
			contextEvent:Fire("PlayContext", true)
		end)
		```

## Input Action Manager

<BetaAlert betaName="Input Action Manager" leadIn="This tool is currently in beta. Enable it through " leadOut="." components={props.components} />

The **Input Action Manager** tool is a unified, matrix-style interface to design, audit, and scale your input architecture.

To access it, navigate to the **Window** menu in Studio and select **Input**&nbsp;⟩ **Input&nbsp;Action&nbsp;Manager**. If your game already uses input [contexts](#input-contexts), [actions](#input-actions), or [bindings](#input-bindings), the manager will automatically scan the `Class.DataModel` and extract those existing instances into the editor grid. Any new input‑related instances will automatically populate into an `Inputs` folder within `Class.ReplicatedStorage`.

<img src="../assets/studio/explorer/ReplicatedStorage-Folder-Inputs.png" width="320" alt="Folder inside ReplicatedStorage named Inputs" />

To configure an input setup for **character sprint** as outlined in the sections above:

1. <Chip label="RECOMMENDED" size="small" variant="outlined" color="success" /> Select the top-level `Class.Workspace` object in the [Explorer](../studio/explorer.md) and then, in the [Properties](../studio/properties.md) window, set the `Class.Workspace.PlayerScriptsUseInputActionSystem|PlayerScriptsUseInputActionSystem` property to `Enum.RolloutState|Enabled`.

2. Inside a `Class.ScreenGui` container inside `Class.StarterGui`, create an [on-screen button](../ui/buttons.md), rename it to `SprintButton`, and [position/resize](../ui/position-and-size.md) it as desired.

   <img src="../assets/studio/explorer/StarterGui-ScreenGui-SprintButton.png" width="320" />

3. In the **Input Action Manager**, hover over the **Context** column header and click the **＋** button. Enter an appropriate name for the new context such as `PlayContext` and press <kbd>Enter</kbd>. An `Class.InputContext` of the matching name appears in `Class.ReplicatedStorage`.

	 <Grid container spacing={2} alignItems="top">
	 <Grid item>
     <img src="../assets/studio/input-action-manager/Add-Context.png" width="500" />
	 </Grid>
	 <Grid item>
     <img src="../assets/studio/explorer/ReplicatedStorage-InputContext.png" width="320" alt="New InputContext instance inside ReplicatedStorage named PlayContext" />
	 </Grid>
	 </Grid>

4. Hover over the new context and click the **＋** button. From the popup menu, select `Enum.InputActionType|Bool`, enter `CharacterSprint` for the action's name, and press <kbd>Enter</kbd>. An `Class.InputAction` of the matching name appears under the context.

	 <Grid container spacing={2} alignItems="top">
	 <Grid item>
     <img src="../assets/studio/input-action-manager/Add-Action.png" width="500" />
	 </Grid>
	 <Grid item>
     <img src="../assets/studio/explorer/ReplicatedStorage-InputContext-SprintAction.png" width="320" alt="New InputAction instance inside an InputContext named CharacterSprint" />
	 </Grid>
	 </Grid>

5. In the new `CharacterSprint` row, assign bindings for each input type:

   1. **Keyboard and Mouse** — Click the arrow button and select `Enum.KeyCode|LeftShift` from the picker menu.
   2. **Touch** — Click the cell and then, in the [Explorer](../studio/explorer.md) hierarchy, click the `SprintButton` object that you previously inserted into the `Class.ScreenGui`.
   3. **Gamepad** — Click the arrow button and select `Enum.KeyCode|ButtonY` from the picker menu.

   <img src="../assets/studio/input-action-manager/Add-Bindings-Sprint.png" width="840" />

   <Alert severity='info'>
   As you assign bindings, watch for warning/error icons in the UI. Yellow warnings (<span style={{color:'#ffc633', fontSize:'110%', background:'rgba(0,0,0,0.75)', padding:'0px 2px', borderRadius:'100%'}}><b>&#9888;</b></span>) indicate a **missing** binding for [cross‑platform](../projects/cross-platform.md) compatibility, while red warnings (<span style={{color:'#ff3300', fontSize:'110%', background:'rgba(0,0,0,0.75)', padding:'0px 2px', borderRadius:'100%'}}><b>&#9888;</b></span>) indicate a **duplicate** binding for actions within the same context.
   </Alert>

6. Insert a new `Class.Script` into the `CharacterSprint` tree, alongside the various input bindings. Then set its `Class.BaseScript.RunContext|RunContext` to `Enum.RunContext.Client|Client` and rename it to `OnActivate`.

   <img src="../assets/studio/explorer/ReplicatedStorage-InputContext-SprintAction-Script-IAM.png" width="320" />

7. Paste the following code into the `OnActivate` script. Note the `Class.InputAction.Pressed|Pressed` event connection on lines `13`‑`15` which doubles the character's walk speed when a sprint input binding is pressed, and the corresponding `Class.InputAction.Released|Released` event connection on lines `16`‑`18` which resets the walk speed to default when a sprint input binding is released.

		```lua title="OnActivate (Client Script)"
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
