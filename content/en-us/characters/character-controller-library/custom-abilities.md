---
title: Custom abilities
description: Custom abilities in the Character Controller Library (CCL) evaluate what a character can do, as well as enable flexible behavior composition such as a character being able to move while also aiming and crouching.
---

import ActionSlots from '../../includes/action-slots.md'

This guide outlines how to add a custom **dash** ability for all player characters, where activating the ability speeds the character forward in the direction it's facing, followed by a short cooldown before players can dash again.

## Ability module

The first step in authoring a custom ability is to create an `AbilityDefinition` inside a `Class.ModuleScript` that can be shared between the server and client.

1.  Create a `Class.ModuleScript` inside `Class.ReplicatedStorage`/`CustomAbilities` (a `Class.Folder`).
2.  Rename it to `Dash` as a unique identity.

    <img src="../../assets/studio/explorer/ReplicatedStorage-CustomAbilities-Dash.png" width="320" />

3.  Paste the following supporting code into the new `Dash` script:

        ```lua
        local AvatarAbilities = require("@rbx/AvatarAbilities")

        local Identifiers = AvatarAbilities.Identifiers
        local Rule = AvatarAbilities.Rule
        local Sensor = Identifiers.Sensor
        local All, Not = Rule.All, Rule.Not
        ```

## Ability definition

The core behavior of any ability is defined through its `AbilityDefinition` (line `8`+), a Luau table that defines its identity, conditions, behavior, and lifecycle.

```lua title="ModuleScript (Dash)"
local AvatarAbilities = require("@rbx/AvatarAbilities")

local Identifiers = AvatarAbilities.Identifiers
local Rule = AvatarAbilities.Rule
local Sensor = Identifiers.Sensor
local All, Not = Rule.All, Rule.Not

local Dash: AvatarAbilities.AbilityDefinition = {
	Name = "Dash",
	Labels = { "Dashing" },
	StartsWhen = All( Sensor.Ground, Not("DashCooldown") ),
	RunsWhile = "DashWindow",
	Input = {
		InputName = "Dash",
		Mode = "Press",
		ActionSlot = 5
	},
	TimedLabels = {
		OnStart = { DashWindow = 0.2 }, -- Seconds the dash stays "active"
		OnStop = { DashCooldown = 1.0 }, -- Seconds until characters can dash again
	},
}

function Dash.OnStart(managerCtx: AvatarAbilities.ManagerContext, _abilityCtx: AvatarAbilities.AbilityContext)
	local rootPart = managerCtx.AbilityOwner.PrimaryPart
	if rootPart then
		rootPart:ApplyImpulse(managerCtx.RootLookVector * 80 * rootPart.AssemblyMass)
	end
end

return Dash
```

The following table outlines every parameter in the dash ability's `AbilityDefinition` table:

<table>
<thead>
	<tr>
		<th>Field</th>
		<th>Description</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>`Name`</td>
		<td>The ability name that other abilities can reference in conditions and conflicts. Multiple ability definitions can use the same name. The `Class.ModuleScript` name, not this field, determines the unique `Class.Configuration` key under the character.</td>
	</tr>
	<tr>
		<td>`Labels`</td>
		<td>A [label](./index.md#labels) is a named bit in a shared world mask which acts as the coordination bus between abilities. Essentially, an active ability broadcasts its `Labels` to the world mask, while ability [conditions](./index.md#conditions) (`StartsWhen` or `RunsWhile`) test the world mask and react. Abilities never call each other; they merely broadcast labels and react to labels.</td>
	</tr>
	<tr>
<td>`StartsWhen`</td>
<td>
One or more [conditions](./index.md#conditions) which are checked every frame while the ability is **inactive**; when they're all `true`, the ability can start. The notation `All()` means that **all** of the nested conditions must be `true`, specifically:

- `Sensor.Ground` — The character is standing on the ground (no air-dashing).
- `Not("DashCooldown")` — The `DashCooldown` label is absent (`Not()` takes exactly one label, not a group).

</td>
	</tr>
	<tr>
		<td>`RunsWhile`</td>
		<td>One or more [conditions](./index.md#conditions) which are checked every frame while the ability is **active**; the moment they stop being `true`, the ability stops. The sole condition <Typography noWrap>`RunsWhile = "DashWindow"`</Typography> means the ability keeps running while the `DashWindow` label exists. Defining `RunsWhile` replaces the generated input condition, so releasing the input doesn't cancel this dash. For a `Hold` or `Toggle` ability that must stop when its input becomes inactive, include the `Rule.Input` sentinel in the custom condition.</td>
	</tr>
	<tr>
<td>`Input`</td>
<td>
The [input](./index.md#inputs) which triggers the ability. The CCL always adds it to `StartsWhen`.

- `InputName = "Dash"` specifies the input the ability listens to.
- `Mode = "Press"` tells the ability to activate when the input is pressed.
- `ActionSlot` defines the input's [action slot](#input-definition).

</td>
	</tr>
	<tr>
		<td>`TimedLabels`</td>
		<td>Timed labels appear for a fixed number of seconds and expire on their own, independent of whether the ability is still running. `OnStart`/`OnStop` broadcast their [labels](./index.md#labels) when the ability starts/stops, respectively. When the associated duration ends, the label(s) expire.</td>
	</tr>
</tbody>
</table>

Collectively, `StartsWhen`, `RunsWhile`, and `TimedLabels` form the dash ability's entire loop:

1. `StartsWhen = All( Sensor.Ground, Not("DashCooldown") )` — Assuming the character is on the ground and not in a dash cooldown period, `TimedLabels.OnStart` broadcasts the `DashWindow` label for `0.2` seconds.
2. `RunsWhile = "DashWindow"` keeps the dash running.
3. After `0.2` seconds, the `DashWindow` label expires, so <Typography noWrap>`RunsWhile = "DashWindow"`</Typography> becomes `false` and the ability stops (no need to include an `OnStop` [callback](./index.md#callbacks) function).
4. `TimedLabels.OnStop` broadcasts the `DashCooldown` label for `1.0` seconds, and because `StartsWhen` contains a `Not("DashCooldown")` condition, players cannot dash again during this cooldown.
5. Once the `DashCooldown` label expires, everything resets automatically and players can attempt another dash.

Following the `AbilityDefinition` table, the `OnStart` [callback](./index.md#callbacks) function runs **once** at the moment the ability activates. This is where the actual dash happens. The function's first parameter, `managerCtx`, is a `ManagerContext` object with multiple properties, including:

- `managerCtx.AbilityOwner` — The character `Class.Model`, such that `managerCtx.AbilityOwner.PrimaryPart` is the root part.
- `managerCtx.RootLookVector` — The direction the character is facing.

Dash only needs this one callback, as the impulse is applied in a single instant and the timed labels handle the rest. See [callbacks](./index.md#callbacks) for info on `OnUpdate`, `OnStop`, `OnSetup`, and `OnTeardown`.

## Ability registration

Registration of custom abilities for each player character must occur on the server:

1. Place a new `Class.Script` inside `Class.ServerScriptService`.
2. Rename it to `RegisterCustomAbilities` (this script can be used to register multiple abilities in a loop).
3. Paste the following code into the script. Note that abilities are added per-character by passing the [ability module](#ability-module) as the second parameter of `addAbilityForCharacter()`, not by calling `Global.LuaGlobals.require()` on the module.

```lua title="Script in ServerScriptService"
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local AvatarAbilities = require("@rbx/AvatarAbilities")

local CUSTOM_ABILITIES = {
	ReplicatedStorage.CustomAbilities.Dash,
	-- ...
}

local function onCharacterAdded(character: Model)
	local actor = character:WaitForChild("AbilityManagerActor", 10)
	if not actor then return end
	while not actor:IsDescendantOf(game) do actor.AncestryChanged:Wait() end

	for _, abilityModule in CUSTOM_ABILITIES do
		AvatarAbilities.addAbilityForCharacter(character, abilityModule)
	end
end

local function onPlayer(player: Player)
	player.CharacterAdded:Connect(onCharacterAdded)
	if player.Character then task.spawn(onCharacterAdded, player.Character) end
end
Players.PlayerAdded:Connect(onPlayer)
for _, player in Players:GetPlayers() do onPlayer(player) end
```

Although registration occurs on the server, ability callbacks run in both the predicted client simulation and the authoritative server simulation. Keep callback behavior deterministic so both simulations produce the same result.

## Input definition

As noted in [ability definition](#ability-definition), the `Input` definition specifies how the ability is activated. Its `ActionSlot` field defines an **action slot** which is associated with a list of `Class.InputAction|InputActions` and `Class.InputBinding|InputBindings`.

The CCL always adds the generated input sensor to `StartsWhen`. If you omit `RunsWhile`, it also uses that sensor as the continuation condition. Defining `RunsWhile` replaces the default, so include the `Rule.Input` value directly when a `Hold` or `Toggle` ability must stop with its input. For an example, see [inputs](./index.md#inputs).

<ActionSlots components={props.components} />
