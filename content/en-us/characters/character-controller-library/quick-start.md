---
title: CCL quick start
description: Traditional character abilities (run, climb, jump, swim, etc.) are easily configurable through scripting.
---

import Enable from '../../includes/studio/character-controller.md'

In the [Character Controller Library](./index.md) (CCL), traditional character abilities (run, climb, jump, swim, etc.) are easily configurable through scripting. For custom character mechanics such as dashing, aiming, wall‑jumping, and more, see [custom abilities](./custom-abilities.md).

## Enable CCL

<Enable components={props.components} />

## Configuration

Through a script that runs from `Class.ServerScriptService`, you can experiment with the built‑in ability [attributes](#attributes). You can also modify specific [controllers](#controllers) to adjust the physical simulation of the character and its interaction with the environment, such as the character's base movement speed.

### Attributes

At runtime, CCL exposes each built-in ability as a `Class.Configuration` in the character's `Abilities` folder. This folder usually lives under `AbilityManagerActor`, but it can live directly under the character in setups without an actor. Use `AvatarAbilities.getAbilityConfigurationForCharacter()` to access an ability configuration from either setup.

Each ability contains easy-to-configure [attributes](../../studio/properties.md#instance-attributes) such as those noted in the table below. Some attributes correspond to legacy `Class.Humanoid` properties. This relationship identifies equivalent settings, not bidirectional synchronization. The compatibility layer copies changes from these `Class.Humanoid` properties to the corresponding ability attributes. Jumping attributes initially use the corresponding `Class.StarterPlayer` character properties.

<Grid container spacing={4}>
	<Grid item XSmall={12} Medium={5} Large={5} XLarge={5}><img src="../../assets/studio/explorer/Character-Model-Abilities.png" width="320" /></Grid>
	<Grid item XSmall={12} Medium={7} Large={7} XLarge={7}>
	<Alert severity="warning">
	The abilities in a character's `Abilities` folder may vary, depending on which abilities you [enabled/disabled](#enable-ccl). Confirm available abilities and their valid attributes before you attempt to configure them via scripting.
	</Alert>
	</Grid>
</Grid>

<table>
<thead>
	<tr>
		<th>Ability</th>
		<th>Attributes</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>`Climbing`</td>
		<td>
		- `SpeedMultiplier` — Multiplier to the `Class.ClimbController.MoveSpeedFactor` property when character is climbing.
		</td>
	</tr>
	<tr>
		<td>`Crouching`</td>
		<td>
		- `SpeedMultiplier` — Multiplier to the `Class.GroundController.MoveSpeedFactor` property when character is crouching.
		</td>
	</tr>
	<tr>
		<td>`Dead`</td>
		<td>
		- `BreakJointsOnDeath` — Corresponds to `Class.Humanoid.BreakJointsOnDeath`.
		- `Health` — Corresponds to `Class.Humanoid.Health`.
		- `MaxHealth` — Corresponds to `Class.Humanoid.MaxHealth`.
		- `RequiresNeck` — Corresponds to `Class.Humanoid.RequiresNeck`.
		</td>
	</tr>
	<tr>
		<td>`FallingDown`</td>
		<td></td>
	</tr>
	<tr>
		<td>`Freefall`</td>
		<td>
		- `SpeedMultiplier` — Multiplier to the `Class.AirController.MoveSpeedFactor` property when character is free‑falling. Note that the effect may be subtle when the character free‑falls for a very short duration.
		</td>
	</tr>
	<tr>
		<td>`GettingUp`</td>
		<td></td>
	</tr>
	<tr>
		<td>`Jumping`</td>
		<td>
		- `JumpHeight` — Corresponds to `Class.Humanoid.JumpHeight` and initializes from `Class.StarterPlayer.CharacterJumpHeight`.
		- `JumpPower` — Corresponds to `Class.Humanoid.JumpPower` and initializes from `Class.StarterPlayer.CharacterJumpPower`.
		- `UseJumpPower` — Corresponds to `Class.Humanoid.UseJumpPower` and initializes from `Class.StarterPlayer.CharacterUseJumpPower`.
		</td>
	</tr>
	<tr>
		<td>`NoLocomotion`</td>
		<td></td>
	</tr>
	<tr>
		<td>`Running`</td>
		<td>
		- `SpeedMultiplier` — Multiplier to the `Class.GroundController.MoveSpeedFactor` property when character is running.
		</td>
	</tr>
	<tr>
		<td>`Sitting`</td>
		<td></td>
	</tr>
	<tr>
		<td>`Slipping`</td>
		<td>
		- `MaxSlopeAngle` — Corresponds to `Class.Humanoid.MaxSlopeAngle`.
		</td>
	</tr>
	<tr>
		<td>`Sprinting`</td>
		<td>
		- `SpeedMultiplier` — Multiplier to the `Class.GroundController.MoveSpeedFactor` and `Class.AirController.MoveSpeedFactor` properties when character is sprinting.
		</td>
	</tr>
	<tr>
		<td>`Swimming`</td>
		<td>
		- `EnableFastRise` — Rise to surface more quickly by holding the jump input.
		- `SpeedMultiplier` — Multiplier to the `Class.SwimController.MoveSpeedFactor` property when character is swimming.
		</td>
	</tr>
	<tr>
		<td>`Turning`</td>
		<td>
		- `UseLookDirectionInput` — Uses look-direction input instead of movement input to determine the character's facing direction.
		</td>
	</tr>
</tbody>
</table>

To set ability configurations for all characters through a script:

1.  Create a new server-side `Class.Script` within `Class.ServerScriptService` and rename it to `AbilitiesScript`.
2.  Copy and paste the following code into the new script. This example multiplies the base movement speed for the `Running` ability by `2`. Feel free to adjust other ability attributes such as those described in the table above.

        ```lua title="Script in ServerScriptService"
        local Players = game:GetService("Players")
        local AvatarAbilities = require("@rbx/AvatarAbilities")

        local function waitForAbilityConfiguration(character, abilityName, timeout)
            local deadline = time() + timeout
            while character.Parent and time() < deadline do
                local ability = AvatarAbilities.getAbilityConfigurationForCharacter(character, abilityName)
                if ability then
                    return ability
                end
                task.wait()
            end
            return nil
        end

        local function onCharacterAdded(character)
            local running = waitForAbilityConfiguration(character, "Running", 10)
            if running then
                -- Double base movement speed.
                running:SetAttribute("SpeedMultiplier", 2)
            end
        end

        local function onPlayerAdded(player)
            if player.Character then
                onCharacterAdded(player.Character)
            end
            player.CharacterAdded:Connect(onCharacterAdded)
        end

        Players.PlayerAdded:Connect(onPlayerAdded)
        ```

### Controllers

In the CCL, a core `Class.ControllerManager` instance within the character model, alongside child controllers such as a `Class.GroundController`, handle the physical simulation of the character and its interaction with the environment. Abilities then interact with the `Class.ControllerManager` and its descendants to modify controller behaviors or switch between controllers.

<img src="../../assets/studio/explorer/Character-Model-ControllerManager.png" width="320" />

Properties for the `Class.ControllerManager` and its controller descendants are summarized in the tables below, although these tables are not exhaustive; please consult the API [classes documentation](../../reference/engine/classes.md) for additional property options.

<Tabs>
<TabItem label="ControllerManager">
<table>
<thead>
	<tr>
		<th>Property</th>
		<th>Description</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>`Class.ControllerManager.BaseMoveSpeed|BaseMoveSpeed`</td>
		<td>The **base** linear movement speed used by all controllers. Controllers individually customize movement speed through their `MoveSpeedFactor` property.</td>
	</tr>
	<tr>
		<td>`Class.ControllerManager.BaseTurnSpeed|BaseTurnSpeed`</td>
		<td>The **base** angular turning speed used by all controllers to align the character to face the desired direction. Some controllers individually customize turn speed through their `TurnSpeedFactor` property.</td>
	</tr>
	<tr>
		<td>`Class.ControllerManager.UpDirection|UpDirection`</td>
		<td>`Datatype.Vector3` which indicates the upward-facing vector for the `Class.ControllerManager.RootPart`.</td>
	</tr>
</tbody>
</table>

</TabItem>
<TabItem label="Individual Controllers">
<table>
<thead>
	<tr>
		<th>Controller</th>
		<th>Properties</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>`Class.GroundController`</td>
		<td>
		- `Class.GroundController.MoveSpeedFactor|MoveSpeedFactor` — Multiplier factor for the `Class.ControllerManager.BaseMoveSpeed` property while character is on the ground.
		- `Class.GroundController.AccelerationTime|AccelerationTime` and `Class.GroundController.DecelerationTime|DecelerationTime` — Time in seconds for character to accelerate to full speed and decelerate to full stop, respectively.
		- `Class.GroundController.TurnSpeedFactor|TurnSpeedFactor` — Multiplier factor for the `Class.ControllerManager.BaseTurnSpeed` property (max angular velocity of a turn while character is on the ground).
		</td>
	</tr>
	<tr>
		<td>`Class.AirController`</td>
		<td>
		- `Class.AirController.MoveSpeedFactor|MoveSpeedFactor` — Multiplier factor for the `Class.ControllerManager.BaseMoveSpeed` property while character is in the air.
		- `Class.AirController.MoveMaxForce|MoveMaxForce` and `Class.AirController.TurnMaxTorque|TurnMaxTorque` — How quickly the character can accelerate and change direction in the air.
		- `Class.AirController.TurnSpeedFactor|TurnSpeedFactor` — Multiplier factor for the `Class.ControllerManager.BaseTurnSpeed` property (max angular velocity of a turn while character is in the air).
		</td>
	</tr>
	<tr>
		<td>`Class.ClimbController`</td>
		<td>
		- `Class.ClimbController.MoveSpeedFactor|MoveSpeedFactor` — Multiplier factor for the `Class.ControllerManager.BaseMoveSpeed` property while character is climbing.
		</td>
	</tr>
	<tr>
		<td>`Class.SwimController`</td>
		<td>
		- `Class.SwimController.MoveSpeedFactor|MoveSpeedFactor` — Multiplier factor for the `Class.ControllerManager.BaseMoveSpeed` property while character is swimming.
		- `Class.SwimController.PitchMaxTorque|PitchMaxTorque` — The maximum torque used to rotate on the local **X** axis to the desired pitch orientation.
		- `Class.SwimController.RollMaxTorque|RollMaxTorque` — The maximum torque applied to rotate on the local **Z** axis to the desired roll orientation.
		</td>
	</tr>
</tbody>
</table>

</TabItem>
</Tabs>

To set controller configurations for all characters through a script:

1.  Create a new server-side `Class.Script` within `Class.ServerScriptService` and rename it to `ControllerScript`.
2.  Copy and paste the following code into the new script. This example increases ground‑based moving/turning speed as well adds a slight acceleration and deceleration time. Feel free to adjust other properties such as those described in the tables above or for each class as documented (`Class.ControllerManager`; `Class.GroundController`; `Class.AirController`; `Class.ClimbController`; `Class.SwimController`).

        ```lua title="Script in ServerScriptService"
        local Players = game:GetService("Players")
        local AvatarAbilities = require("@rbx/AvatarAbilities")

        local function waitForAbilityConfiguration(character, abilityName, timeout)
            local deadline = time() + timeout
            while character.Parent and time() < deadline do
                local ability = AvatarAbilities.getAbilityConfigurationForCharacter(character, abilityName)
                if ability then
                    return ability
                end
                task.wait()
            end
            return nil
        end

        local function waitForChildOfClass(parent, className, timeout)
            local deadline = time() + timeout
            local child = parent:FindFirstChildOfClass(className)
            while not child and parent.Parent and time() < deadline do
                task.wait()
                child = parent:FindFirstChildOfClass(className)
            end
            return child
        end

        local function onCharacterAdded(character)
            -- Running provisions the ground controller when it registers.
            if not waitForAbilityConfiguration(character, "Running", 10) then
                return
            end

            local controllerManager = waitForChildOfClass(character, "ControllerManager", 10)
            if controllerManager then
                local groundController = waitForChildOfClass(controllerManager, "GroundController", 10)
                if groundController then
                    -- Double the move and turn speeds
                    groundController.MoveSpeedFactor *= 2
                    groundController.TurnSpeedFactor *= 2
                    -- Add slight acceleration and deceleration
                    groundController.AccelerationTime = 0.2
                    groundController.DecelerationTime = 0.4
                end
            end
        end

        local function onPlayerAdded(player)
            if player.Character then
                onCharacterAdded(player.Character)
            end
            player.CharacterAdded:Connect(onCharacterAdded)
        end

        Players.PlayerAdded:Connect(onPlayerAdded)
        ```
