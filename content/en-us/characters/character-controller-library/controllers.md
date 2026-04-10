---
title: Controllers
description: Controllers in the Character Controller Library (CCL) handle the physical simulation of the character and its interaction with the environment.
---

import Enable from '../../includes/studio/character-controller.md'

In the [Character Controller Library](./index.md) (CCL), a core `Class.ControllerManager` instance handles the physical simulation of the character and its interaction with the environment. This includes several intentional changes in movement/feel designed to resolve legacy `Class.Humanoid` inconsistencies, as well as physical improvements like ground friction, linear acceleration curves, and realistic conservation of linear and angular momentum when jumping.

## Enable CCL

<Enable components={props.components} />

## Structure

Under the core `Class.ControllerManager` instance within the character model, individual controllers such as a `Class.GroundController` and `Class.AirController` define how movement is applied to the character. Abilities then interact with the `Class.ControllerManager` and its descendants to modify controller behaviors or switch between controllers.

<img src="../../assets/studio/explorer/Character-Model-ControllerManager.png" width="320" />

## Configuration

While your game is running (or through a script that runs from `Class.ServerScriptService`), you can experiment with the core `Class.ControllerManager` and built‑in controllers.

### Runtime

To experiment with controller configurations at runtime:

1. Begin a playtest.
2. In the [Explorer](../../studio/explorer.md), locate the character model in the `Class.Workspace` and then expand the `Class.ControllerManager` tree:

   <img src="../../assets/studio/explorer/Character-Model-ControllerManager.png" width="320" />

3. Select either the `Class.ControllerManager` or one of its controller descendants and, in the [Properties](../../studio/properties.md) window, customize properties such as those summarized in the tables below (note that these tables are not exhaustive; please consult the API [classes documentation](../../reference/engine/classes.md) for additional property options).

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

### Scripted

To set controller configurations for all characters through a script:

1. Create a new server-side `Class.Script` within `Class.ServerScriptService` and rename it to `ControllerScript`.
2. Copy and paste the following code into the new script. This example increases ground‑based moving/turning speed as well adds a slight acceleration and deceleration time. Feel free to adjust other properties such as those described in the [tables above](#configuration) or for each class as documented (`Class.ControllerManager`; `Class.GroundController`; `Class.AirController`; `Class.ClimbController`; `Class.SwimController`).

		```lua title="Script in ServerScriptService"
		local Players = game:GetService("Players")

		local function onCharacterAdded(character)
			local ControllerManager = character:FindFirstChildWhichIsA("ControllerManager")

			if ControllerManager then
				local GroundController = ControllerManager:FindFirstChild("GroundController")
				if GroundController then
					-- Double the move and turn speeds
					GroundController.MoveSpeedFactor *= 2
					GroundController.TurnSpeedFactor *= 2
					-- Add slight acceleration and deceleration
					GroundController.AccelerationTime = 0.2
					GroundController.DecelerationTime = 0.4
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
