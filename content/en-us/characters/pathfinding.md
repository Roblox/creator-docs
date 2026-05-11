---
title: Pathfinding
description: Pathfinding is the process of moving a character or object (agent) along a logical path to reach a destination.
---

**Pathfinding** is the process of moving a character or object (agent) along a
logical path around obstacles to reach a destination, optionally avoiding
hazardous materials or defined regions.

<video controls src="../assets/avatar/pathfinding/Showcase.mp4" width="100%" alt="Video showcase of character pathfinding across a series of bridges"></video>

## Navigation visualization

To assist with pathfinding layout and debugging, Studio can render a navigation mesh and [modifier](#pathfinding-modifiers) labels. To enable them, toggle on **Navigation&nbsp;mesh** and **Pathfinding&nbsp;modifiers** from the [Visualization&nbsp;Options](../studio/ui-overview.md#visualization-options) widget in the upper‑right corner of the 3D viewport.

<img src="../assets/studio/general/Visualization-Options.png" width="780" alt="A close up view of the 3D viewport with the Visualization Options button indicated in the upper-right corner." />

<Tabs>
<TabItem label="Navigation Mesh">
With **Navigation mesh** enabled, colored areas show where a character might walk or swim. Small arrows indicate areas that a character will attempt to reach by jumping.

<img src="../assets/avatar/pathfinding/Navigation-Mesh.jpg" width="800" height="400" alt="Navigation mesh showing in Studio" />
</TabItem>
<TabItem label="Pathfinding Modifiers">
With **Pathfinding modifiers** enabled, text labels indicate specific materials and regions that are taken into consideration when using [pathfinding modifiers](#pathfinding-modifiers).

<img src="../assets/avatar/pathfinding/Navigation-Labels.jpg" width="800" height="400" alt="Navigation labels showing on navigation mesh" />
</TabItem>
</Tabs>

## Implementation

Although pathfinding can be implemented in various ways through `Class.PathfindingService` and its associated methods such as `Class.PathfindingService:CreatePath()|CreatePath()`, this section uses the following pathfinding script for the player's character.

To test while reading:

1. Copy the following code into a `Class.LocalScript` within `Class.StarterCharacterScripts`, or [get this package](https://create.roblox.com/store/asset/95888831676289/Player-Path-Following-Script) and drop it into `Class.StarterCharacterScripts`.

		```lua title="PlayerPathFollow (LocalScript in StarterCharacterScripts)"
		local PathfindingService = game:GetService("PathfindingService")
		local Players = game:GetService("Players")
		local RunService = game:GetService("RunService")

		local localPlayer = Players.LocalPlayer
		local controls = require(localPlayer.PlayerScripts.PlayerModule):GetControls()
		controls:Disable()

		local DESTINATION = Vector3.new(20, 0.5, 20)
		local GROUND_WAIT = 0.01
		local VELOCITY_MULTIPLIER = 0.0625

		local path = PathfindingService:CreatePath({
			AgentCanClimb = true,
			Costs = {
				Water = 20
			}
		})

		local character = script.Parent
		local humanoid = character:WaitForChild("Humanoid")
		local waypoints
		local nextWaypointIndex
		local blockedConnection
		local currentWaypointReachedConnection
		local currentWaypointPlaneNormal = Vector3.zero
		local currentWaypointPlaneDistance = 0
		local pathfinderWorking = false

		local function disconnectCurrentWaypointReachedConnection()
			if not currentWaypointReachedConnection then return end
			currentWaypointReachedConnection:Disconnect()
			currentWaypointReachedConnection = nil
		end

		local function isCurrentWaypointReached()
			if humanoid.FloorMaterial == Enum.Material.Air then
				return false
			end

			local reached = false
			if currentWaypointPlaneNormal ~= Vector3.zero then
				-- Compute the distance from humanoid to destination plane
				local dist = currentWaypointPlaneNormal:Dot(humanoid.RootPart.Position) - currentWaypointPlaneDistance
				-- Compute the component of the humanoid velocity that is towards the plane
				local velocity = -currentWaypointPlaneNormal:Dot(humanoid.RootPart.Velocity)
				-- Compute the threshold from the destination plane based on humanoid velocity
				local threshold = math.max(1.0, VELOCITY_MULTIPLIER * velocity)
				-- Consider waypoint reached if less then threshold in front of the plane
				reached = dist < threshold
			else
				reached = true
			end

			if reached then
				currentWaypointPlaneNormal = Vector3.zero
				currentWaypointPlaneDistance = 0
				moveToNextWaypoint()
			end
		end

		local function calculateNextWaypointApproach()
			nextWaypointIndex += 1
			if nextWaypointIndex > #waypoints then
				return false
			end
			local currentWaypoint = waypoints[nextWaypointIndex - 1]
			local nextWaypoint = waypoints[nextWaypointIndex]
			-- Build destination plane from next waypoint towards current one
			currentWaypointPlaneNormal = currentWaypoint.Position - nextWaypoint.Position
			-- Set normal perpendicular to Y plane when not climbing up
			if nextWaypoint.Label ~= "Climb" then
				currentWaypointPlaneNormal = Vector3.new(currentWaypointPlaneNormal.X, 0, currentWaypointPlaneNormal.Z)
			end
			if currentWaypointPlaneNormal.Magnitude > 0.000001 then
				currentWaypointPlaneNormal	= currentWaypointPlaneNormal.Unit
				currentWaypointPlaneDistance = currentWaypointPlaneNormal:Dot(nextWaypoint.Position)
			end

			return true
		end

		local function resetWaypointData()
			humanoid:Move(Vector3.zero)
			currentWaypointPlaneNormal	= Vector3.zero
			currentWaypointPlaneDistance = 0
			disconnectCurrentWaypointReachedConnection()
			pathfinderWorking = false
		end

		local function waitForGround()
			while humanoid.FloorMaterial == Enum.Material.Air do
				task.wait(GROUND_WAIT)
			end
		end

		function moveToNextWaypoint()
			if calculateNextWaypointApproach() then
				disconnectCurrentWaypointReachedConnection()
				currentWaypointReachedConnection = RunService.Heartbeat:Connect(isCurrentWaypointReached)
				local nextWaypointPosition = waypoints[nextWaypointIndex].Position
				local nextWaypointAction = waypoints[nextWaypointIndex].Action
				humanoid:Move(nextWaypointPosition - humanoid.RootPart.Position)
				if waypoints[nextWaypointIndex + 1] and waypoints[nextWaypointIndex + 1].Label == "UseBoat" then
					nextWaypointIndex += 1
					-- Call your own customized function to make agent use the boat

				elseif nextWaypointAction == Enum.PathWaypointAction.Jump then
					humanoid:ChangeState(Enum.HumanoidStateType.Jumping)
					while humanoid.FloorMaterial ~= Enum.Material.Air do
						task.wait(GROUND_WAIT)
					end
					humanoid:Move(nextWaypointPosition - humanoid.RootPart.Position)
				end
			else
				resetWaypointData()
			end
		end

		local function findStartingPoint(waypoints)
			nextWaypointIndex = 1
			while nextWaypointIndex + 1 <= #waypoints do
				local dist = waypoints[nextWaypointIndex + 1].Position - humanoid.RootPart.Position
				dist = Vector3.new(dist.X, 0, dist.Z)
				if dist.magnitude >= 2 then
					return
				end
				nextWaypointIndex += 1
			end
		end

		local function followPath()
			-- Compute the path
			pathfinderWorking = true
			waitForGround()

			local success, errorMessage = pcall(function()
				path:ComputeAsync(character.PrimaryPart.Position, DESTINATION)
			end)
			if not success or path.Status ~= Enum.PathStatus.Success then
				warn("Path not computed!", errorMessage)
				return
			end

			-- Get the path waypoints
			waypoints = path:GetWaypoints()

			-- Detect if path becomes blocked
			blockedConnection = path.Blocked:Connect(function(blockedWaypointIndex)
				-- Check if the obstacle is further down the path
				if blockedWaypointIndex >= nextWaypointIndex then
					-- Stop detecting path blockage until path is re-computed
					blockedConnection:Disconnect()
					resetWaypointData()
					-- Call function to re-compute new path
					followPath()
				end
			end)

			findStartingPoint(waypoints)
			moveToNextWaypoint()
		end

		followPath()
		```

2. Edit the `DESTINATION` variable (<Chip label="LINE 9" size="small" variant="outlined" color="success" />) to a `Datatype.Vector3` destination within the 3D world that the player character can reach.
3. Proceed through the following sections to learn about path computation and character movement.

### Path creation

Pathfinding is initiated through `Class.PathfindingService` and its `Class.PathfindingService:CreatePath()|CreatePath()` method (<Chip label="LINES 13–18" size="small" variant="outlined" color="success" />). This method accepts an optional table of parameters which fine tune how the character (agent) moves along the path.

<table>
<thead>
   <tr>
     <th>Key</th>
     <th>Description</th>
     <th>Type</th>
     <th>Default</th>
   </tr>
</thead>
<tbody>
   <tr>
     <td>`AgentRadius`</td>
     <td>Agent radius, in studs. Useful for determining the minimum separation from obstacles.</td>
     <td>integer</td>
     <td>`2`</td>
   </tr>
   <tr>
     <td>`AgentHeight`</td>
     <td>Agent height, in studs. Empty space smaller than this value, like the space under stairs, will be marked as non-traversable.</td>
     <td>integer</td>
     <td>`5`</td>
   </tr>
   <tr>
     <td>`AgentCanJump`</td>
     <td>Determines whether jumping during pathfinding is allowed.</td>
     <td>boolean</td>
     <td>`true`</td>
   </tr>
	 <tr>
     <td>`AgentCanClimb`</td>
     <td>Determines whether climbing `Class.TrussPart|TrussParts` during pathfinding is allowed. A climbable path has a `Datatype.PathWaypoint.Label|Label` named `Climb` and the [cost](#material-costs) for a climbable path is `1` by default.</td>
     <td>boolean</td>
     <td>`false`</td>
   </tr>
   <tr>
     <td>`WaypointSpacing`</td>
     <td>Spacing between intermediate waypoints in path. If set to `Library.math.huge`, there will be no intermediate waypoints.</td>
     <td>number</td>
     <td>`4`</td>
   </tr>
   <tr>
     <td>`Costs`</td>
     <td>Table of materials or defined `Class.PathfindingModifier|PathfindingModifiers` and their cost for traversal. Useful for making the agent prefer certain materials/regions over others. See [modifiers](#pathfinding-modifiers) for details.</td>
     <td>table</td>
     <td>`nil`</td>
   </tr>
</tbody>
</table>

### Path computation

After you've created a valid path with `Class.PathfindingService:CreatePath()|CreatePath()`, it must be **computed** by calling `Class.Path:ComputeAsync()` with a `Datatype.Vector3` for both the starting point and destination (<Chip label="LINES 137–143" size="small" variant="outlined" color="success" />).

<figure>
<img src="../assets/avatar/pathfinding/Path-Start-End.jpg" width="800" alt="Path start/end marked across two bridges" />
</figure>

Once the `Class.Path` is computed, it will contain a series of **waypoints** that trace the path from start to end. These points can be gathered with the `Class.Path:GetWaypoints()` method (<Chip label="LINE 146" size="small" variant="outlined" color="success" />). The returned array is arranged in order of waypoints from path start to path end.

<figure>
<img src="../assets/avatar/pathfinding/Waypoints.jpg" width="800" alt="Waypoints indicated across computed path" />
<figcaption>Waypoints indicated across computed path</figcaption>
</figure>

<Alert severity="warning">
The pathfinding engine includes specific limitations, and pathfinding computations can fail for various reasons. If your implementation does not behave as expected, see [limitations and failure factors](#limitations-and-failure-factors) for possible causes.
</Alert>

### Path movement

Each `Datatype.PathWaypoint` consists of both a `Datatype.PathWaypoint.Position|Position` (`Datatype.Vector3`) and `Datatype.PathWaypoint.Action|Action` (`Enum.PathWaypointAction|PathWaypointAction`). To move a character containing a `Class.Humanoid`, like a typical Roblox character, the best way is to call `Class.Humanoid:Move()` from waypoint to waypoint and use the script's `isCurrentWaypointReached()` callback (<Chip label="LINES 36–60" size="small" variant="outlined" color="success" />) to detect when the character reaches each waypoint.

<Alert severity="warning">
Note that the script waits for the humanoid to be touching the ground before calling the pathfinder. If the path is computed while the character is falling through the air, the pathfinder will try to determine an appropriate start position for the path.
</Alert>

<video controls src="../assets/avatar/pathfinding/Simple-Path.mp4" width="800" alt="Video of character following a path across islands and bridges"></video>

### Blocked paths

Many Roblox worlds are dynamic; parts might move or fall and floors may collapse. This can block a computed path and prevent the character from reaching its destination. To handle this, you can connect the `Class.Path.Blocked` event and re-compute the path around whatever blocked it (<Chip label="LINES 149–158" size="small" variant="outlined" color="success" />).

<Alert severity="warning">
Paths may also become blocked somewhere **behind** the agent, such as a pile of rubble falling on a path as the agent runs away, but that doesn't mean the agent should stop moving. The <Typography noWrap>`if blockedWaypointIndex >= nextWaypointIndex`</Typography> check makes sure that the path is re-computed only if the blocked waypoint is **ahead** of the current waypoint.
</Alert>

## Pathfinding modifiers

By default, `Class.Path:ComputeAsync()` returns the **shortest** path between the starting point and destination, with the exception that it attempts to avoid jumps. This looks unnatural in some situations; for instance, a path may go through swamp water rather than around it simply because the path through the water is geometrically shorter.

<figure>
<img src="../assets/avatar/pathfinding/Paths-Shortest-Best.jpg" width="800" alt="Two paths indicated with the shorter path not necessarily more logical" />
</figure>

To optimize pathfinding even further, you can implement **pathfinding modifiers** to compute smarter paths across various [materials](#material-costs), around defined [regions](#configure-regions), or to [ignore obstacles](#ignore-obstacles).

### Material costs

When working with `Class.Terrain` and `Class.BasePart` materials, you can include a `Costs` table within `Class.PathfindingService:CreatePath()|CreatePath()` to make certain materials more traversable than others. All materials have a default cost of `1` and any material can be defined as non‑traversable by setting its value to `Library.math.huge`.

Keys in the `Costs` table should be **string** names representing `Enum.Material` names, for example `Water` for `Enum.Material.Water` or `CrackedLava` for `Enum.Material.CrackedLava`.

```lua title="PlayerPathFollow (LocalScript)"
local PathfindingService = game:GetService("PathfindingService")
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")

local localPlayer = Players.LocalPlayer
local controls = require(localPlayer.PlayerScripts.PlayerModule):GetControls()
controls:Disable()

local DESTINATION = Vector3.new(20, 0.5, 20)
local GROUND_WAIT = 0.01
local VELOCITY_MULTIPLIER = 0.0625

local path = PathfindingService:CreatePath({
	AgentCanClimb = true,
	Costs = {
		Water = 20, CrackedLava = 100, Slate = 20
	}
})
```

<Alert severity="info">
To set a material such as `CrackedLava` as a "last option," assign it a high but finite material cost like `100` or `1000`. Since there's no engine‑enforced upper cap below `Library.math.huge`, the pathfinder will only route through the material if every alternative is more expensive.
</Alert>

### Configure regions

In some cases, [material preference](#material-costs) is not enough. For example, you might want characters to avoid a defined **region**, regardless of the materials underfoot. This can be achieved by adding a `Class.PathfindingModifier` object to a part.

1. Create an `Class.BasePart.Anchored|Anchored` part around the region and set its `Class.BasePart.CanCollide|CanCollide` property to `false`.

   <img src="../assets/avatar/pathfinding/GeyserBlocker-Block.jpg" width="750" alt="Anchored part defining a region to apply a pathfinding modifier to." />

2. Insert a `Class.PathfindingModifier` instance onto the part, locate its `Class.PathfindingModifier.Label|Label` property, and assign a meaningful name like `DangerZone`.

   <img src="../assets/studio/properties/PathfindingModifier-Label.png" width="320" alt="PathfindingModifier instance with Label property set to DangerZone." />

3. Include a matching `DangerZone` key and associated numeric value within the `Costs` table of `Class.PathfindingService:CreatePath()|CreatePath()`. A modifier can be defined as non‑traversable by setting its value to `Library.math.huge`.

		```lua title="PlayerPathFollow (LocalScript)"
		local PathfindingService = game:GetService("PathfindingService")
		local Players = game:GetService("Players")
		local RunService = game:GetService("RunService")

		local localPlayer = Players.LocalPlayer
		local controls = require(localPlayer.PlayerScripts.PlayerModule):GetControls()
		controls:Disable()

		local DESTINATION = Vector3.new(20, 0.5, 20)
		local GROUND_WAIT = 0.01
		local VELOCITY_MULTIPLIER = 0.0625

		local path = PathfindingService:CreatePath({
			AgentCanClimb = true,
			Costs = {
				DangerZone = math.huge, Water = 20, CrackedLava = 20, Slate = 20
			}
		})
		```

   <video controls src="../assets/avatar/pathfinding/GeyserBlocker-Path.mp4" width="800"></video>

### Ignore obstacles

In some cases, it's useful to pathfind through solid obstacles as if they didn't exist. This lets you compute a path through specific physical blockers, versus the computation failing outright.

1. Create an `Class.BasePart.Anchored|Anchored` part around the object and set its `Class.BasePart.CanCollide|CanCollide` property to `false`.

   <img src="../assets/avatar/pathfinding/DoorPassThrough-Block.jpg" width="750" alt="Anchored part defining a region to apply a pathfinding modifier to." />

2. Insert a `Class.PathfindingModifier` instance onto the part and enable its `Class.PathfindingModifier.PassThrough|PassThrough` property.

   <img src="../assets/studio/properties/PathfindingModifier-PassThrough.png" width="320" alt="PathfindingModifier instance with PassThrough property enabled." />

   Now, when a path is computed from the zombie NPC to the player character, the path extends beyond the door and you can prompt the zombie to traverse it. Even if the zombie is unable to open the door, it reacts as if it "hears" the character behind the door.

   <img src="../assets/avatar/pathfinding/Zombie-Full-Path.jpg" width="750" alt="Zombie NPC path passing through the previously blocking door." />

## Pathfinding links

Sometimes it's necessary to find a path across a space that cannot be normally traversed, such as across a chasm, and perform a custom action to reach the next waypoint. This can be achieved through the `Class.PathfindingLink` object.

Using the example from above, you can make the agent use a boat.

<img src="../assets/avatar/pathfinding/PathfindingLink-Path.jpg" width="800" alt="PathfindingLink showing how an agent can use a boat." />

To create a `Class.PathfindingLink` using this example:

1. <Chip label="OPTIONAL" size="small" variant="outlined" /> Toggle on **Pathfinding&nbsp;links** from the [Visualization&nbsp;Options](../studio/ui-overview.md#visualization-options) widget in the upper‑right corner of the 3D viewport. This helps with visualization and debugging when implementing pathfinding links.
2. Create two `Class.Attachment|Attachments`, one on the boat's seat and one near the boat's landing point.

   <img src="../assets/avatar/pathfinding/PathfindingLink-Attachments.jpg" width="750" alt="Attachments created for pathfinding link's start and end." />

3. Create a `Class.PathfindingLink` object in the workspace, then assign its `Class.PathfindingLink.Attachment0|Attachment0` and `Class.PathfindingLink.Attachment1|Attachment1` properties to the starting and ending attachments respectively.

   <img src="../assets/studio/properties/PathfindingLink-Attachments.png" width="320" alt="Attachment0/Attachment1 properties of a PathfindingLink." />

   <img src="../assets/avatar/pathfinding/PathfindingLink-In-World.jpg" width="750" alt="PathfindingLink visualized in the 3D world." />

4. Assign a meaningful name like `UseBoat` to its `Class.PathfindingLink.Label|Label` property. This name is used as a flag in the pathfinding script to trigger a custom action when the agent reaches the starting link point.

   <img src="../assets/studio/properties/PathfindingLink-Label.png" width="320" alt="Label property specified for PathfindingLink." />

5. Include a `Costs` table within `Class.PathfindingService:CreatePath()|CreatePath()` containing both a `Water` key and a custom key matching the `Class.PathfindingLink.Label|Label` property name. Assign the custom key a value **lower** than that of `Water`.

		```lua title="PlayerPathFollow (LocalScript)"
		local PathfindingService = game:GetService("PathfindingService")
		local Players = game:GetService("Players")
		local RunService = game:GetService("RunService")

		local localPlayer = Players.LocalPlayer
		local controls = require(localPlayer.PlayerScripts.PlayerModule):GetControls()
		controls:Disable()

		local DESTINATION = Vector3.new(20, 0.5, 20)
		local GROUND_WAIT = 0.01
		local VELOCITY_MULTIPLIER = 0.0625

		local path = PathfindingService:CreatePath({
			AgentCanClimb = true,
			Costs = {
				UseBoat = 2, Water = 20
			}
		})
		```

6. In the `moveToNextWaypoint()` function (<Chip label="LINES 97–118" size="small" variant="outlined" color="success" />), a custom check for the `Class.PathfindingLink.Label|Label` modifier name can be used to take a different action than `Class.Humanoid:Move()`; in this case, you might call a function to seat the agent in the boat, move the boat across the water, unseat the agent at the boat's landing point, and then continue the agent's path to its final destination.

   <video controls src="../assets/avatar/pathfinding/Boat-Path.mp4" width="800" alt="Video showing character using the PathfindingLink to traverse the water using the boat"></video>

## Streaming compatibility

In-experience [instance streaming](../workspace/streaming/index.md) is a powerful feature that dynamically loads and unloads 3D content as a player's character moves around the world. As they explore the 3D space, new subsets of the space stream to their device and some of the existing subsets might stream out.

Consider the following best practices for using `Class.PathfindingService` in streaming-enabled experiences:

- Streaming can block or unblock a given path as a character moves along it. For example, while a character runs through a forest, a tree might stream in somewhere ahead of them and obstruct the path. To make pathfinding work seamlessly with streaming, it's highly recommended that you use the [handling blocked paths](#blocked-paths) technique and re-compute the path when necessary.

- A common approach in pathfinding is to use the coordinates of existing objects for [computation](#path-computation), such as setting a path destination to the position of an existing `TreasureChest` model in the world. This approach is fully compatible with server-side `Class.Script|Scripts` since the server has full view of the world at all times, but `Class.LocalScript|LocalScripts` and `Class.ModuleScript|ModuleScripts` that run on the client may fail if they attempt to compute a path to an object that's not streamed in.

  To address this issue, consider setting the destination to the position of a `Class.BasePart` within a [persistent](../workspace/streaming/index.md#model-streaming-controls) model. Persistent models load soon after the player joins and they never stream out, so a client-side script can connect to the `Class.Workspace.PersistentLoaded|PersistentLoaded` event and safely access the model for creating waypoints after the event fires.

## Limitations and failure factors

The pathfinding engine includes specific limitations to ensure efficient processing and optimal performance. Additionally, pathfinding [computations](#path-computation) can fail for various reasons as outlined below.

<Alert severity="warning" variant="outlined">
**Path request too long** — The direct line‑of‑sight distance for pathfinding from the start to the finish point must not exceed 3,000 studs.
</Alert>

<Alert severity="warning" variant="outlined">
**Node budget exhausted** — A pathfinding computation may exceed 20,000 nodes well before reaching the distance cap of 3,000 studs, especially when pathfinding in a vast open world or through complex mazes.
</Alert>

<Alert severity="warning" variant="outlined">
**Incompatible agent parameters** — A pathfinding computation will fail if the [creation parameters](#path-creation) cannot resolve. For example, if the destination can **only** be reached by the agent jumping but `AgentCanJump` is `false`, or `AgentHeight` is greater than the height of any traversable path.
</Alert>

<Alert severity="warning" variant="outlined">
**Vertical waypoint limits** — Pathfinding calculations only consider paths within a set vertical boundary. Potential waypoints with a bottom global **Y** coordinate less than `-65,536` studs or greater than `65,536` studs are ignored.
</Alert>
