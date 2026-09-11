---
title: Character Controller Library
description: The Character Controller Library (CCL) is a modular framework for building character movement and behaviors through attributes and Luau scripts.
---

import ActionSlots from '../../includes/action-slots.md'

The **Character Controller Library** (CCL) is a modular framework for building character movement and behaviors through attributes and Luau scripts. This architecture replaces rigid `Class.Humanoid` state machines with a flexible, extensible system for character mechanics.

<Alert severity="success">
The CCL is **opt-in** through the [Avatar Settings](../../studio/avatar-settings.md#movement) window and games can continue using the legacy movement system.
</Alert>

## Abilities

Abilities evaluate what a character can do, such as the ability to run, jump, climb, and swim. Instead of relying on a fixed set of engine‑defined character states like those in `Enum.HumanoidStateType`, CCL abilities dynamically determine what a character can do and how it should respond to player input.

Structurally, an ability is a self-contained Luau table that primarily specifies the following:

<table>
<thead>
  <tr>
    <th>Table Fields</th>
    <th>Purpose</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Name`</td>
    <td>Name that is allocated a [label](#labels) bit, so [conditions](#conditions) and [conflicts](#conflicts) can reference the ability. Multiple ability definitions can use the same name. The `Class.ModuleScript` name determines the unique configuration key.</td>
  </tr>
  <tr>
    <td>`Labels`, `TimedLabels`</td>
    <td>Named bits in a shared 64-bit mask which acts as the coordination bus between abilities; see [labels](#labels).</td>
  </tr>
  <tr>
    <td>`StartsWhen`, `RunsWhile`</td>
    <td>Conditions which define when to start the ability and when to keep it running, respectively; see [conditions](#conditions).</td>
  </tr>
  <tr>
    <td>`Blocks`, `Stops`, `Suspends`, `ExclusiveGroup`</td>
    <td>How to handle [conflicts](#conflicts) between abilities that can't be active at once.</td>
  </tr>
  <tr>
    <td>`Input`</td>
    <td>The input which triggers the ability. The CCL injects it into `StartsWhen` and, when you omit `RunsWhile`, uses it as the default continuation condition; see [inputs](#inputs).</td>
  </tr>
  <tr>
    <td>`Config`, `State`</td>
    <td>Default configuration values and replicated state for each ability registration. Callbacks read configuration from `abilityCtx.Config` and read or write replicated state through `abilityCtx.State`.</td>
  </tr>
  <tr>
    <td>`OnSetup`, `OnStart`, `OnStop`, `OnUpdate`, `OnTeardown`</td>
    <td>Lifecycle callbacks where the ability's actual behavior is scripted; see [callbacks](#callbacks).</td>
  </tr>
</tbody>
</table>

### Labels

A **label** is a named bit in a shared 64-bit mask which acts as the coordination bus between abilities. Essentially:

- An active ability **broadcasts** its `Labels` and `TimedLabels` to the world mask.
- Ability [conditions](#conditions) (`StartsWhen`, `RunsWhile`) **test** the world mask and react.
- Ability [conflicts](#conflicts) define which **other** abilities are blocked, stopped, or suspended upon activation.

In the following setup, the `"CanFallDown"` label is broadcast to the world mask when `Running` is active. The `FallingDown` ability with its [condition](#conditions) of <Typography noWrap>`StartsWhen = All( "CanFallDown", "Stunned" )`</Typography> automatically becomes a candidate, but `"Stunned"` must also be broadcast to the world mask before `FallingDown` occurs.

```lua title="Running Ability"
local AvatarAbilities = require("@rbx/AvatarAbilities")

local Identifiers = AvatarAbilities.Identifiers
local Ability = Identifiers.Ability
local Rule = AvatarAbilities.Rule
local Sensor = Identifiers.Sensor
local All, Not = Rule.All, Rule.Not

local Running: AvatarAbilities.AbilityDefinition = {
	Name = Ability.Running,
	Labels = { "CanFallDown" }, -- Labels broadcast when ability is active
	StartsWhen = Sensor.Ground,
	RunsWhile = Sensor.Ground,
}
```

```lua title="FallingDown Ability"
local AvatarAbilities = require("@rbx/AvatarAbilities")

local Identifiers = AvatarAbilities.Identifiers
local Ability = Identifiers.Ability
local Rule = AvatarAbilities.Rule
local Sensor = Identifiers.Sensor
local All, Not = Rule.All, Rule.Not

local FallingDown: AvatarAbilities.AbilityDefinition = {
	Name = Ability.FallingDown,
	StartsWhen = All( "CanFallDown", "Stunned" ), -- Labels necessary for ability to start
	Blocks = { Ability.Running }
}
```

<br />

Labels can also be broadcast or consumed in a **timed** manner using the `TimedLabels` dictionary.

<table>
<thead>
  <tr>
    <th>Key</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`TimedLabels.OnStart`</td>
    <td>Dictionary containing labels (keys) and associated durations. Label(s) are broadcast when the ability starts and automatically expire when their duration ends. For example, <Typography noWrap>`OnStart = { Dashing = 1 }`</Typography> broadcasts the `Dashing` label for 1 second when the ability starts.</td>
  </tr>
  <tr>
    <td>`TimedLabels.OnStop`</td>
    <td>Dictionary containing labels (keys) and associated durations. Label(s) are broadcast when the ability stops and automatically expire when their duration ends. For example, <Typography noWrap>`OnStop = { DashCooldown = 2 }`</Typography> broadcasts the `DashCooldown` label for 2 seconds when the ability stops.</td>
  </tr>
  <tr>
    <td>`TimedLabels.Consumes`</td>
    <td>List of labels to remove (consume) when the ability activates. For example, if a fighting game allows players to counter‑attack after blocking an opponent's attack, the `CounterAttack` ability may contain both <Typography noWrap>`StartsWhen = "AfterBlock"`</Typography> and <Typography noWrap>`TimedLabels = { Consumes = { "AfterBlock" } }`</Typography> to prevent double‑triggering of the `CounterAttack` ability.</td>
  </tr>
</tbody>
</table>

```lua title="Timed Labels"
local AvatarAbilities = require("@rbx/AvatarAbilities")

local Identifiers = AvatarAbilities.Identifiers
local Rule = AvatarAbilities.Rule
local Sensor = Identifiers.Sensor
local All, Not = Rule.All, Rule.Not

local Dash: AvatarAbilities.AbilityDefinition = {
	Name = "Dash",
	StartsWhen = All( Sensor.Ground, Not("DashCooldown") ),
	RunsWhile = "Dashing",
	TimedLabels = {
		OnStart = { Dashing = 1 },
		OnStop = { DashCooldown = 2 },
	},
}
```

### Conditions

A **condition** is one or more [labels](#labels), [sensors](#sensors), or an input reference, used by `StartsWhen` and `RunsWhile`. Conditions compile to bitmask operations at runtime and evaluation is integer math&nbsp;— no table walks and no string comparisons.

<table>
<thead>
  <tr>
    <th>Goal</th>
    <th>Syntax</th>
		<th>Example</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>One required condition.</td>
		<td></td>
		<td>`StartsWhen = Sensor.Ground`</td>
  </tr>
  <tr>
    <td>`AND` logic for when **all** of the labels exist in the world mask and **all** of the sensors are active.</td>
		<td>`All()`</td>
		<td>`StartsWhen = All( "CanFallDown", "Stunned" )`</td>
  </tr>
  <tr>
    <td>`OR` logic for when **any** of the labels exist in the world mask or **any** of the sensors are active.</td>
		<td>`Any()`</td>
		<td><Typography noWrap>`StartsWhen = Any( "WallClimbing", "Climbing" )`</Typography></td>
  </tr>
  <tr>
    <td>Negation such that the labels can **not** exist in the world mask and the sensors can **not** be active.</td>
		<td>`Not()`</td>
		<td><Typography noWrap>`RunsWhile = Not("Stunned")`</Typography></td>
  </tr>
</tbody>
</table>

<Alert severity="info">
`Not()` takes exactly **one** label/sensor, not a group. To negate multiple, use <Typography noWrap>`All( Not(), Not() )`</Typography>.
</Alert>

Conditional evaluation can be combined for more complex logic, such as `All()` chaining plus `Not()` to indicate that a sensor must be active while a label must be nonexistent:

```lua
local AvatarAbilities = require("@rbx/AvatarAbilities")

local Identifiers = AvatarAbilities.Identifiers
local Rule = AvatarAbilities.Rule
local Sensor = Identifiers.Sensor
local All, Not = Rule.All, Rule.Not

local Dive: AvatarAbilities.AbilityDefinition = {
	Name = "Dive",
	StartsWhen = All( Sensor.WaterSurface, Not("Recovering") ),
}
```

### Conflicts

Some abilities cannot be active when another ability is; for example, characters can't jump while swimming, and they can't run while falling. The engine resolves these conflicts declaratively inside an ability's definition:

<table>
<thead>
  <tr>
    <th>Conflict Key</th>
    <th>Purpose</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Blocks`</td>
    <td>While the owning ability is active, the listed other abilities cannot start. For example, a `ScopeAim` ability might contain <Typography noWrap>`Blocks = { Ability.Running, Ability.Jumping }`</Typography> to prevent characters from running or jumping while carefully aiming through their weapon's scope.</td>
  </tr>
  <tr>
    <td>`Stops`</td>
    <td>When the owning ability starts, the listed other abilities **force‑stop** and must re‑trigger. For instance, a `Hover` ability might contain <Typography noWrap>`Stops = { Ability.Running }`</Typography> to immediately stop a character's running motion when they start hovering.</td>
  </tr>
  <tr>
    <td>`Suspends`</td>
    <td>When the owning ability starts, the listed other abilities **pause** and then **auto-resume** when the owning ability stops. For example, a custom sprint ability might contain <Typography noWrap>`Suspends = { Ability.Running }`</Typography> so that running 🄐 pauses on sprint start, 🄑 is blocked mid‑sprint, and 🄒 resumes on sprint stop.</td>
  </tr>
</tbody>
</table>

Another unique conflict key is `ExclusiveGroup` which places multiple abilities into a group, each with a `Priority` value. Only one ability per group can be active and higher priority wins. However, if a challenger declares `Stops` targeting the holder's name/label, it wins regardless of priority.

In the following setup, three abilities (`Sprinting`, `Crouching`, `Stagger`) are added to a `Locomotion` exclusive group. `Sprinting` has the highest priority (`200`) so it wins over `Crouching` (`100`) and the two never run at the same time. However, `Stagger` forcibly stops sprinting (<Typography noWrap>`Stops = { Ability.Sprinting }`</Typography>), so it can interrupt and supersede `Sprinting` even though its priority (`150`) is lower.

```lua
local AvatarAbilities = require("@rbx/AvatarAbilities")

local Identifiers = AvatarAbilities.Identifiers
local Ability = Identifiers.Ability
local Rule = AvatarAbilities.Rule
local Sensor = Identifiers.Sensor
local All, Not = Rule.All, Rule.Not

local Sprinting: AvatarAbilities.AbilityDefinition = {
	Name = Ability.Sprinting,
	ExclusiveGroup = { Name = "Locomotion", Priority = 200 },
}
local Crouching: AvatarAbilities.AbilityDefinition = {
	Name = Ability.Crouching,
	ExclusiveGroup = { Name = "Locomotion", Priority = 100 },
}
-- A lower-priority ability can override a higher-priority ability by stopping it
local Stagger: AvatarAbilities.AbilityDefinition = {
	Name = "Stagger",
	ExclusiveGroup = { Name = "Locomotion", Priority = 150 },
	Stops = { Ability.Sprinting },
}
```

### Inputs

An ability's `Input` definition specifies the input used to attempt to activate the ability. It takes key-value pairs that configure the input behavior, action slot, and optional touch button icons.

```lua
local AvatarAbilities = require("@rbx/AvatarAbilities")

local Identifiers = AvatarAbilities.Identifiers
local Rule = AvatarAbilities.Rule
local Sensor = Identifiers.Sensor
local All, Not = Rule.All, Rule.Not

local Dash: AvatarAbilities.AbilityDefinition = {
	Name = "Dash",
	Input = { InputName = "Dash", Mode = "Press", ActionSlot = 5 }
}
```

- `InputName` is a logical name, not a key. The CCL generates an input sensor and always adds it to `StartsWhen`. Don't add `Rule.Input` to `StartsWhen` yourself.

- `Mode` defines how this input will be interpreted:

  <table>
  <thead>
  <tr>
    <th>Mode</th>
    <th>Behavior</th>
    <th>Use Cases</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>`Press`</td>
    <td>Ability activation is attempted when the input is pressed. Automatically injected into the `StartsWhen` condition.</td>
    <td>Discrete actions like dash, attack, and throw.</td>
  </tr>
  <tr>
    <td>`Hold`</td>
    <td>Ability runs while the input is held; releasing stops it when the generated input sensor is the `RunsWhile` condition.</td>
    <td>Sustained actions like sprint, aim, and block.</td>
  </tr>
  <tr>
    <td>`Toggle`</td>
    <td>Each press flips the ability on or off when the generated input sensor is the `RunsWhile` condition.</td>
    <td>Toggled stances or motions like crouch or levitate.</td>
  </tr>
  <tr>
    <td>`Repeat`</td>
    <td>Like `Hold`, but re-triggers each cycle.</td>
    <td>Actions that self‑stop and can re‑fire while held.</td>
  </tr>
  </tbody>
  </table>

- `ActionSlot` defines an **action slot** which is associated with a list of `Class.InputAction|InputActions` and `Class.InputBinding|InputBindings` within the [Input Action System](../../input/input-action-system.md).

  <ActionSlots components={props.components} />

- `CustomIcon`, `CustomIconActive`, and `CustomIconInvalid` specify Roblox asset IDs for the touch button when the ability is idle, active, or unavailable, respectively.

When you omit `RunsWhile`, the CCL uses the generated input sensor as the continuation condition. When you define `RunsWhile`, it replaces that default. For a `Hold` or `Toggle` ability that must stop when its input becomes inactive, include the `Rule.Input` sentinel directly in the custom condition. `Rule.Input` is a value, not a function:

```lua
local AvatarAbilities = require("@rbx/AvatarAbilities")

local Rule = AvatarAbilities.Rule
local Sensor = AvatarAbilities.Identifiers.Sensor
local All, Input, Not = Rule.All, Rule.Input, Rule.Not

local Glide: AvatarAbilities.AbilityDefinition = {
	Name = "Glide",
	Input = { InputName = "Glide", Mode = "Hold", ActionSlot = 6 },
	StartsWhen = Not(Sensor.Ground),
	RunsWhile = All(Not(Sensor.Ground), Input),
}
```

### Sensors

A **sensor** is a named value about the world that the engine reads for you. You'll typically read sensors rather than write them. For convenience, several sensors are pre-registered:

<table size="small">
<thead>
  <tr>
    <th>Sensor</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Sensor.Ground`</td>
    <td>Standing on a surface</td>
  </tr>
  <tr>
    <td>`Sensor.IsMoving`</td>
    <td>Movement input is being applied</td>
  </tr>
  <tr>
    <td>`Sensor.MoveInput`</td>
    <td>The movement vector itself</td>
  </tr>
  <tr>
    <td>`Sensor.Ceiling`</td>
    <td>Something is directly overhead</td>
  </tr>
  <tr>
    <td>`Sensor.Climb`</td>
    <td>A climbable surface is in range</td>
  </tr>
  <tr>
    <td>`Sensor.Water` / `Sensor.WaterSurface`</td>
    <td>In water / at the surface</td>
  </tr>
  <tr>
    <td>`Sensor.Sit`</td>
    <td>Seated</td>
  </tr>
  <tr>
    <td>`Sensor.Tipped`</td>
    <td>Fallen over</td>
  </tr>
  <tr>
    <td>`Sensor.Tool`</td>
    <td>Holding a `Class.Tool`</td>
  </tr>
  <tr>
    <td>`Sensor.LookDirectionInput`</td>
    <td>The commanded look direction</td>
  </tr>
  <tr>
    <td>`Sensor.RotateToLookDirectionInput`</td>
    <td>Whether the character should rotate to the commanded look direction</td>
  </tr>
</tbody>
</table>

### Callbacks

Ability **callback functions** let you script specific behavior:

Although you register custom abilities on the server, their callbacks run in both the predicted client simulation and the authoritative server simulation. Keep callback behavior deterministic so both simulations produce the same result.

<table>
<thead>
  <tr>
    <th>Callback</th>
    <th>Runs</th>
    <th>Use Cases</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><Typography noWrap>`OnSetup(managerCtx, abilityCtx)`</Typography></td>
    <td>Once, when the ability is registered.</td>
    <td>Cache references, initialize state, etc.</td>
  </tr>
  <tr>
    <td><Typography noWrap>`OnStart(managerCtx, abilityCtx, hadLabel)`</Typography></td>
    <td>Each time the ability is activated.</td>
    <td>Apply an effect such as an impulse. The `hadLabel()` function reports whether a specified label was present when activation began, before conflict resolution.</td>
  </tr>
  <tr>
    <td><Typography noWrap>`OnUpdate(managerCtx, abilityCtx)`</Typography></td>
    <td>Each active frame.</td>
    <td>Continuous work such as timers or per‑frame forces.</td>
  </tr>
  <tr>
    <td><Typography noWrap>`OnStop(managerCtx, abilityCtx)`</Typography></td>
    <td>Each deactivation, voluntary or forced.</td>
    <td>Undo what `OnStart()` did.</td>
  </tr>
  <tr>
    <td><Typography noWrap>`OnTeardown(managerCtx, abilityCtx)`</Typography></td>
    <td>On ability removal.</td>
    <td>Disconnect connections, destroy instances, etc.</td>
  </tr>
</tbody>
</table>

Each callback function's first parameter, `managerCtx`, is a `ManagerContext` object with shared character and manager properties, including:

- `managerCtx.AbilityOwner` — The character `Class.Model` such that `managerCtx.AbilityOwner.PrimaryPart` is the root part.
- `managerCtx.AbilityManager` — A cut-down view of the manager so that an ability can add, remove and query abilities from inside its own callbacks.
- `managerCtx.BodyParts` — The character's body parts, with helpers for turning collision on and off per limb.
- `managerCtx.ControllerManager` — The character's `Class.ControllerManager` for physics control. It can be `nil` when no registered ability requires physics.
- `managerCtx.RootCFrame` — The root part's `Datatype.CFrame`, snapshotted once at the start of the frame so callbacks don't each go and fetch it themselves.
- `managerCtx.RootLookVector` — Direction the character's root part is facing.
- `managerCtx.RootUpVectorY` — The **Y** component of the root part's up vector.
- `managerCtx.TaskSynchronize()` — Synchronizes a callback before DataModel access when parallel callback support is enabled. Currently, `OnUpdate` doesn't run in a parallel context, so this function has no effect. Full Parallel Luau support is planned for a future update.

The second parameter, `abilityCtx`, is an `AbilityContext` object with engine-managed tables for the current ability registration:

- `abilityCtx.Config` — Read-only configuration values for this ability registration.
- `abilityCtx.State` — Mutable state that replicates through the DataModel. [Server Authority](../../projects/server-authority/index.md) restores these values during rollback and resimulation.
- `abilityCtx.Local` — Mutable scratch state that doesn't replicate or participate in rollback.

Store custom callback data in `abilityCtx.State` or `abilityCtx.Local`. Writing custom fields directly to `abilityCtx` is an error.

<Alert severity="warning">
Callbacks must **never** yield as they run inside the engine's synchronous step and yielding breaks the frame. Do **not** include any yielding functions such as `Library.task.wait()` or `Class.Instance:WaitForChild()|WaitForChild()`. Simulation callbacks also restrict some DataModel operations, including `Class.Instance:Destroy()|Destroy()`. You can set attributes and update physics in a callback. For instance lifecycle or other restricted work, set an attribute in the callback and respond to it from a regular script.
</Alert>
