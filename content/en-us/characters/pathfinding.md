---
title: Character Pathfinding
description: Pathfinding is the process of moving a character along a logical path to reach a destination.
---

**Pathfinding** is the process of moving a character along a logical path to reach a destination, avoiding obstacles and (optionally) hazardous materials or defined regions.

<video controls src="../assets/avatar/pathfinding/Showcase.mp4" width="100%" alt="Video showcase of character pathfinding across a series of bridges"></video>

## Navigation Visualization

To assist with pathfinding layout and debugging, Studio can render a **navigation mesh**. Colored areas show where a character might walk or swim, while non-colored areas are blocked. The small arrows indicate areas that a character will attempt to reach by jumping.

<img src="../assets/avatar/pathfinding/Navigation-Mesh.jpg"
    width="800" alt="Navigation mesh showing in Studio" />

In addition, Studio can render **navigation labels** that indicate specific materials and region labels that are taken into consideration when using [pathfinding modifiers](#pathfinding-modifiers), as well as link point labels assigned to [pathfinding links](#pathfinding-links).

<img src="../assets/avatar/pathfinding/Navigation-Labels.jpg"
    width="800" alt="Navigation labels showing on navigation mesh" />

To enable navigation visualization:

1. Open **File** &rarr; **Studio Settings**.
1. In the **Studio** tab, within the **Visualization** section, enable **Show&nbsp;Navigation&nbsp;Mesh** and, optionally, **Show&nbsp;Navigation&nbsp;Labels**.

## Creating Paths

Pathfinding is initiated through `Class.PathfindingService` and its `Class.PathfindingService:CreatePath()|CreatePath()` function.

```lua title='LocalScript' highlight='1, 3'
local PathfindingService = game:GetService("PathfindingService")

local path = PathfindingService:CreatePath()
```

`Class.PathfindingService:CreatePath()|CreatePath()` accepts an optional table of parameters which fine tune how the character (agent) moves along the path.

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
     <td>**AgentRadius**</td>
     <td>Agent radius, in studs. Useful for determining the minimum separation from obstacles.</td>
     <td>integer</td>
     <td>`2`</td>
   </tr>
   <tr>
     <td>**AgentHeight**</td>
     <td>Agent height, in studs. Empty space smaller than this value, like the space under stairs, will be marked as non-traversable.</td>
     <td>integer</td>
     <td>`5`</td>
   </tr>
   <tr>
     <td>**AgentCanJump**</td>
     <td>Determines whether jumping during pathfinding is allowed.</td>
     <td>boolean</td>
     <td>`true`</td>
   </tr>
	 <tr>
     <td>**AgentCanClimb**</td>
     <td>Determines whether climbing `Class.TrussPart|TrussParts` during pathfinding is allowed.</td>
     <td>boolean</td>
     <td>`false`</td>
   </tr>
   <tr>
     <td>**WaypointSpacing**</td>
     <td>Spacing between intermediate waypoints in path. If set to `Library.math.huge`, there will be no intermediate waypoints.</td>
     <td>number</td>
     <td>`4`</td>
   </tr>
   <tr>
     <td>**Costs**</td>
     <td>Table of materials or defined `Class.PathfindingModifier|PathfindingModifiers` and their cost for traversal. Useful for making the agent prefer certain materials/regions over others. See [modifiers](#pathfinding-modifiers) for details.</td>
     <td>table</td>
     <td>`nil`</td>
   </tr>
</tbody>
</table>

```lua title='LocalScript' highlight='3-10'
local PathfindingService = game:GetService("PathfindingService")

local path = PathfindingService:CreatePath({
	AgentRadius = 3,
	AgentHeight = 6,
	AgentCanJump = false,
	Costs = {
		Water = 20
	}
})
```

Note that the agent can climb `Class.TrussPart|TrussParts` during pathfinding assuming you set `AgentCanClimb` to `true` when [creating the path](#creating-paths) and nothing blocks the agent from the truss climbing path. A climbable path has the **Climb** label and the [cost](#setting-material-costs) for a climbable path is **1** by default.

<img src="../assets/avatar/pathfinding/Path-TrussPart.jpg" width="800" alt="Path going up a climbable TrussPart ladder" />

```lua title='LocalScript - Truss Climbing Path' highlight='6,8'
local PathfindingService = game:GetService("PathfindingService")

local path = PathfindingService:CreatePath({
	AgentCanClimb = true,
	Costs = {
		Climb = 2  -- Cost of the climbing path; default is 1
	}
})
```

## Moving Along Paths

This section uses the following pathfinding script for the player's character. To test while reading:

1. Copy the code into a `Class.LocalScript` within `Class.StarterCharacterScripts`.
1. Edit line 11 to a `Datatype.Vector3` destination that the player character can reach.
1. Proceed through the following sections to learn about path computation and character movement.

```lua title='LocalScript - Character Pathfinding' highlight='11'
local PathfindingService = game:GetService("PathfindingService")
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")

local path = PathfindingService:CreatePath()

local player = Players.LocalPlayer
local character = player.Character
local humanoid = character:WaitForChild("Humanoid")

local TEST_DESTINATION = Vector3.new(100, 0, 100)

local waypoints
local nextWaypointIndex
local reachedConnection
local blockedConnection

local function followPath(destination)
	-- Compute the path
	local success, errorMessage = pcall(function()
		path:ComputeAsync(character.PrimaryPart.Position, destination)
	end)

	if success and path.Status == Enum.PathStatus.Success then
		-- Get the path waypoints
		waypoints = path:GetWaypoints()

		-- Detect if path becomes blocked
		blockedConnection = path.Blocked:Connect(function(blockedWaypointIndex)
			-- Check if the obstacle is further down the path
			if blockedWaypointIndex >= nextWaypointIndex then
				-- Stop detecting path blockage until path is re-computed
				blockedConnection:Disconnect()
				-- Call function to re-compute new path
				followPath(destination)
			end
		end)

		-- Detect when movement to next waypoint is complete
		if not reachedConnection then
			reachedConnection = humanoid.MoveToFinished:Connect(function(reached)
				if reached and nextWaypointIndex < #waypoints then
					-- Increase waypoint index and move to next waypoint
					nextWaypointIndex += 1
					humanoid:MoveTo(waypoints[nextWaypointIndex].Position)
				else
					reachedConnection:Disconnect()
					blockedConnection:Disconnect()
				end
			end)
		end

		-- Initially move to second waypoint (first waypoint is path start; skip it)
		nextWaypointIndex = 2
		humanoid:MoveTo(waypoints[nextWaypointIndex].Position)
	else
		warn("Path not computed!", errorMessage)
	end
end

followPath(TEST_DESTINATION)
```

### Computing the Path

After you've created a valid path with `Class.PathfindingService:CreatePath()|CreatePath()`, it must be **computed** by calling `Class.Path:ComputeAsync()` with a `Datatype.Vector3` for both the starting point and destination.

```lua title='LocalScript - Character Pathfinding' highlight='5, 21'
local PathfindingService = game:GetService("PathfindingService")
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")

local path = PathfindingService:CreatePath()

local player = Players.LocalPlayer
local character = player.Character
local humanoid = character:WaitForChild("Humanoid")

local TEST_DESTINATION = Vector3.new(100, 0, 100)

local waypoints
local nextWaypointIndex
local reachedConnection
local blockedConnection

local function followPath(destination)
	-- Compute the path
	local success, errorMessage = pcall(function()
		path:ComputeAsync(character.PrimaryPart.Position, destination)
	end)
end
```

<img src="../assets/avatar/pathfinding/Path-Start-End.jpg" width="800" alt="Path start/end marked on series of islands and bridges" />

### Getting Waypoints

Once the `Class.Path` is computed, it will contain a series of **waypoints** that trace the path from start to end. These points can be gathered with the `Class.Path:GetWaypoints()` function.

```lua title='LocalScript - Character Pathfinding' highlight='13, 24, 26'
local PathfindingService = game:GetService("PathfindingService")
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")

local path = PathfindingService:CreatePath()

local player = Players.LocalPlayer
local character = player.Character
local humanoid = character:WaitForChild("Humanoid")

local TEST_DESTINATION = Vector3.new(100, 0, 100)

local waypoints
local nextWaypointIndex
local reachedConnection
local blockedConnection

local function followPath(destination)
	-- Compute the path
	local success, errorMessage = pcall(function()
		path:ComputeAsync(character.PrimaryPart.Position, destination)
	end)

	if success and path.Status == Enum.PathStatus.Success then
		-- Get the path waypoints
		waypoints = path:GetWaypoints()
	end
end
```

<figure>
<img src="../assets/avatar/pathfinding/Waypoints.jpg"
    width="800" alt="Waypoints indicated across computed path" />
<figcaption>Waypoints indicated across computed path</figcaption>
</figure>

### Path Movement

Each waypoint consists of both a **position** (`Datatype.Vector3`) and **action** (`Enum.PathWaypointAction|PathWaypointAction`). To move a character containing a `Class.Humanoid`, like a typical Roblox character, the easiest way is to call `Class.Humanoid:MoveTo()` from waypoint to waypoint, using the `Class.Humanoid.MoveToFinished|MoveToFinished` event to detect when the character reaches each waypoint.

```lua title='LocalScript - Character Pathfinding' highlight='40-51, 54-55'
local PathfindingService = game:GetService("PathfindingService")
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")

local path = PathfindingService:CreatePath()

local player = Players.LocalPlayer
local character = player.Character
local humanoid = character:WaitForChild("Humanoid")

local TEST_DESTINATION = Vector3.new(100, 0, 100)

local waypoints
local nextWaypointIndex
local reachedConnection
local blockedConnection

local function followPath(destination)
	-- Compute the path
	local success, errorMessage = pcall(function()
		path:ComputeAsync(character.PrimaryPart.Position, destination)
	end)

	if success and path.Status == Enum.PathStatus.Success then
		-- Get the path waypoints
		waypoints = path:GetWaypoints()

		-- Detect if path becomes blocked
		blockedConnection = path.Blocked:Connect(function(blockedWaypointIndex)
			-- Check if the obstacle is further down the path
			if blockedWaypointIndex >= nextWaypointIndex then
				-- Stop detecting path blockage until path is re-computed
				blockedConnection:Disconnect()
				-- Call function to re-compute new path
				followPath(destination)
			end
		end)

		-- Detect when movement to next waypoint is complete
		if not reachedConnection then
			reachedConnection = humanoid.MoveToFinished:Connect(function(reached)
				if reached and nextWaypointIndex < #waypoints then
					-- Increase waypoint index and move to next waypoint
					nextWaypointIndex += 1
					humanoid:MoveTo(waypoints[nextWaypointIndex].Position)
				else
					reachedConnection:Disconnect()
					blockedConnection:Disconnect()
				end
			end)
		end

		-- Initially move to second waypoint (first waypoint is path start; skip it)
		nextWaypointIndex = 2
		humanoid:MoveTo(waypoints[nextWaypointIndex].Position)
	else
		warn("Path not computed!", errorMessage)
	end
end
```

<video controls src="../assets/avatar/pathfinding/Simple-Path.mp4" width="800" alt="Video of character following simple path across islands and bridges"></video>

### Handling Blocked Paths

Many Roblox worlds are dynamic; parts might move or fall and floors may collapse. This can block a computed path and prevent the character from reaching its destination. To handle this, you can connect the `Class.Path.Blocked` event and re-compute the path around whatever blocked it.

<Alert severity="warning">
Paths may also become blocked somewhere **behind** the agent, such as a pile of rubble falling on a path as the agent runs away, but that doesn't mean the agent should stop moving. The conditional statement on line&nbsp;31 makes sure that the path is re-computed only if the blocked waypoint is **ahead** of the current waypoint.
</Alert>

```lua title='LocalScript - Character Pathfinding' highlight='16, 29-37'
local PathfindingService = game:GetService("PathfindingService")
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")

local path = PathfindingService:CreatePath()

local player = Players.LocalPlayer
local character = player.Character
local humanoid = character:WaitForChild("Humanoid")

local TEST_DESTINATION = Vector3.new(100, 0, 100)

local waypoints
local nextWaypointIndex
local reachedConnection
local blockedConnection

local function followPath(destination)
	-- Compute the path
	local success, errorMessage = pcall(function()
		path:ComputeAsync(character.PrimaryPart.Position, destination)
	end)

	if success and path.Status == Enum.PathStatus.Success then
		-- Get the path waypoints
		waypoints = path:GetWaypoints()

		-- Detect if path becomes blocked
		blockedConnection = path.Blocked:Connect(function(blockedWaypointIndex)
			-- Check if the obstacle is further down the path
			if blockedWaypointIndex >= nextWaypointIndex then
				-- Stop detecting path blockage until path is re-computed
				blockedConnection:Disconnect()
				-- Call function to re-compute new path
				followPath(destination)
			end
		end)
	end
end
```

<Alert severity="error">
Currently, `Class.Model|Models` containing a `Class.Humanoid` instance, including typical player characters, will **not** be considered for path [computation](#computing-the-path) or path blockage, although the agent may still be blocked by those models physically.
</Alert>

## Pathfinding Modifiers

By default, `Class.Path:ComputeAsync()` returns the **shortest** path between the starting point and destination, with the exception that it attempts to avoid jumps. This looks unnatural in some situations&nbsp;&mdash; for instance, a path may go through water rather than over a nearby bridge simply because the path through water is geometrically shorter.

<img src="../assets/avatar/pathfinding/Paths-Shortest-Best.jpg" width="800" alt="Two paths indicated with the shorter path not necessarily more logical" />

To optimize pathfinding even further, you can implement **pathfinding modifiers** to compute smarter paths across various [materials](#setting-material-costs), around defined [regions](#working-with-regions), or through [obstacles](#ignoring-obstacles).

### Setting Material Costs

When working with `Class.Terrain` and `Class.BasePart` materials, you can include a `Costs` table within `Class.PathfindingService:CreatePath()|CreatePath()` to make certain materials more traversable than others. All materials have a default cost of **1** and any material can be defined as non-traversable by setting its value to `Library.math.huge`.

Keys in the `Costs` table should be string names representing `Enum.Material` names, for example `Water` for `Enum.Material.Water`.

```lua title='LocalScript - Character Pathfinding' highlight='6-10'
local PathfindingService = game:GetService("PathfindingService")
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")

local path = PathfindingService:CreatePath({
	Costs = {
		Water = 20,
		Mud = 5,
		Neon = math.huge
	}
})
```

<video controls src="../assets/avatar/pathfinding/Bridge-Path.mp4" width="800" alt="Video showing how material costs determine preference of non-water traversal"></video>

### Working With Regions

In some cases, [material preference](#setting-material-costs) is not enough. For example, you might want characters to avoid a **defined region**, regardless of the materials underfoot. This can be achieved by adding a `Class.PathfindingModifier` object to a part.

1. Create an `Class.BasePart.Anchored|Anchored` part around the dangerous region and set its `Class.BasePart.CanCollide|CanCollide` property to **false**.

   <img src="../assets/avatar/pathfinding/GeyserBlocker-Block.jpg" width="750" alt="Anchored part defining a region to apply a pathfinding modifier to" />

1. Insert a `Class.PathfindingModifier` instance onto the part, locate its `Class.PathfindingModifier.Label|Label` property, and assign a meaningful name like **DangerZone**.

   <img src="../assets/avatar/pathfinding/GeyserBlocker-PathfindingModifier-Label.png" width="320" alt="PathfindingModifier instance with Label property set to DangerZone" />

1. Include a `Costs` table within `Class.PathfindingService:CreatePath()|CreatePath()` containing a matching key and associated numeric value. A modifier can be defined as non-traversable by setting its value to `Library.math.huge`.

   ```lua title='LocalScript - Character Pathfinding' highlight='6-8'
   local PathfindingService = game:GetService("PathfindingService")
   local Players = game:GetService("Players")
   local RunService = game:GetService("RunService")

   local path = PathfindingService:CreatePath({
   	Costs = {
   		DangerZone = math.huge
   	}
   })
   ```

   <video controls src="../assets/avatar/pathfinding/GeyserBlocker-Path.mp4" width="800"></video>

### Ignoring Obstacles

In some cases, it's useful to pathfind through solid obstacles as if they didn't exist. This lets you compute a path through specific physical blockers, versus the computation failing outright.

1. Create an `Class.BasePart.Anchored|Anchored` part around the object and set its `Class.BasePart.CanCollide|CanCollide` property to **false**.

   <img src="../assets/avatar/pathfinding/DoorPassThrough-Block.jpg" width="750" alt="Anchored part defining a region to apply a pathfinding modifier to" />

1. Insert a `Class.PathfindingModifier` instance onto the part and enable its `Class.PathfindingModifier.PassThrough|PassThrough` property.

   <img src="../assets/avatar/pathfinding/DoorPassThrough-PathfindingModifier-PassThrough.png" width="320" alt="PathfindingModifier instance with PassThrough property enabled" />

   Now, when a path is computed from the zombie NPC to the player character, the path extends beyond the door and you can prompt the zombie to traverse it. Even if the zombie is unable to open the door, it reacts as if it "hears" the character behind the door.

   <img src="../assets/avatar/pathfinding/Zombie-Full-Path.jpg" width="750" alt="Zombie NPC path passing through the previously blocking door" />

## Pathfinding Links

Sometimes it's necessary to find a path across a space that cannot be normally traversed, such as across a chasm, and perform a custom action to reach the next waypoint. This can be achieved through the `Class.PathfindingLink` object.

Using the island example from above, you can make the agent use a boat instead of walking across all of the bridges.

<img src="../assets/avatar/pathfinding/PathfindingLink-Path.jpg" width="800" alt="PathfindingLink showing how an agent can use a boat instead of walking across all of the bridges" />

To create a `Class.PathfindingLink` using this example:

1. Create two `Class.Attachment|Attachments`, one on the boat's seat and one near the boat's landing point.

   <img src="../assets/avatar/pathfinding/PathfindingLink-Attachments.jpg" width="750" alt="Attachments created for pathfinding link's start and end" />

1. Create a `Class.PathfindingLink` object in the workspace, then assign its **Attachment0** and **Attachment1** properties to the starting and ending attachments respectively.

   <img src="../assets/avatar/pathfinding/PathfindingLink-Attachments-Properties.png" width="320" alt="Attachment0/Attachment1 properties of a PathfindingLink" />

   <img src="../assets/avatar/pathfinding/PathfindingLink-In-World.jpg" width="750" alt="PathfindingLink visualized in the 3D world" />

1. Assign a meaningful name like **UseBoat** to its `Class.PathfindingLink.Label|Label` property. This name is used as a flag in the pathfinding script to trigger a custom action when the agent reaches the starting link point.

   <img src="../assets/avatar/pathfinding/PathfindingLink-Label.png" width="320" alt="Label property specified for PathfindingLink" />

1. Include a `Costs` table within `Class.PathfindingService:CreatePath()|CreatePath()` containing both a `Water` key and a custom key matching the `Class.PathfindingLink.Label|Label` property name. Assign the custom key a lower value than `Water`.

   ```lua title='LocalScript - Character Pathfinding' highlight='6-9'
   local PathfindingService = game:GetService("PathfindingService")
   local Players = game:GetService("Players")
   local RunService = game:GetService("RunService")

   local path = PathfindingService:CreatePath({
   	Costs = {
   		Water = 20,
   		UseBoat = 1
   	}
   })
   ```

1. In the event which fires when a waypoint is reached, add a custom check for the `Class.PathfindingLink.Label|Label` modifier name and take a different action than `Class.Humanoid:MoveTo()`&nbsp;&mdash; in this case, calling a function to seat the agent in the boat, move the boat across the water, and continue the agent's path upon arrival at the destination island.

   ```lua title='LocalScript - Character Pathfinding' highlight='52-56, 72'
   local PathfindingService = game:GetService("PathfindingService")
   local Players = game:GetService("Players")
   local RunService = game:GetService("RunService")

   local path = PathfindingService:CreatePath({
   	Costs = {
   		Water = 20,
   		UseBoat = 1
   	}
   })

   local player = Players.LocalPlayer
   local character = player.Character
   local humanoid = character:WaitForChild("Humanoid")

   local TEST_DESTINATION = Vector3.new(228.9, 17.8, 292.5)

   local waypoints
   local nextWaypointIndex
   local reachedConnection
   local blockedConnection

   local function followPath(destination)
   	-- Compute the path
   	local success, errorMessage = pcall(function()
   		path:ComputeAsync(character.PrimaryPart.Position, destination)
   	end)

   	if success and path.Status == Enum.PathStatus.Success then
   		-- Get the path waypoints
   		waypoints = path:GetWaypoints()

   		-- Detect if path becomes blocked
   		blockedConnection = path.Blocked:Connect(function(blockedWaypointIndex)
   			-- Check if the obstacle is further down the path
   			if blockedWaypointIndex >= nextWaypointIndex then
   				-- Stop detecting path blockage until path is re-computed
   				blockedConnection:Disconnect()
   				-- Call function to re-compute new path
   				followPath(destination)
   			end
   		end)

   		-- Detect when movement to next waypoint is complete
   		if not reachedConnection then
   			reachedConnection = humanoid.MoveToFinished:Connect(function(reached)
   				if reached and nextWaypointIndex < #waypoints then
   					-- Increase waypoint index and move to next waypoint
   					nextWaypointIndex += 1

   					-- Use boat if waypoint label is "UseBoat"; otherwise move to next waypoint
   					if waypoints[nextWaypointIndex].Label == "UseBoat" then
   						useBoat()
   					else
   						humanoid:MoveTo(waypoints[nextWaypointIndex].Position)
   					end
   				else
   					reachedConnection:Disconnect()
   					blockedConnection:Disconnect()
   				end
   			end)
   		end

   		-- Initially move to second waypoint (first waypoint is path start; skip it)
   		nextWaypointIndex = 2
   		humanoid:MoveTo(waypoints[nextWaypointIndex].Position)
   	else
   		warn("Path not computed!", errorMessage)
   	end
   end

   function useBoat()
   	local boat = workspace.BoatModel

   	humanoid.Seated:Connect(function()
   		-- Start boat moving if agent is seated
   		if humanoid.Sit then
   			task.wait(1)
   			boat.CylindricalConstraint.Velocity = 5
   		end
   		-- Detect constraint position in relation to island
   		local boatPositionConnection
   		boatPositionConnection = RunService.PostSimulation:Connect(function()
   			-- Stop boat when next to island
   			if boat.CylindricalConstraint.CurrentPosition >= 94 then
   				boatPositionConnection:Disconnect()
   				boat.CylindricalConstraint.Velocity = 0
   				task.wait(1)
   				-- Unseat agent and continue to destination
   				humanoid.Sit = false
   				humanoid:MoveTo(waypoints[nextWaypointIndex].Position)
   			end
   		end)
   	end)
   end

   followPath(TEST_DESTINATION)
   ```

   <video controls src="../assets/avatar/pathfinding/Boat-Path.mp4" width="800" alt="Video showing character using the PathfindingLink to traverse the water using the boat" ></video>

## Streaming Compatibility

In-experience [instance streaming](../workspace/streaming.md) is a powerful feature that dynamically loads and unloads 3D content as a player's character moves around the world. As they explore the 3D space, new subsets of the space stream to their device and some of the existing subsets might stream out.

Consider the following best practices for using `Class.PathfindingService` in streaming-enabled experiences:

- Streaming can block or unblock a given path as a character moves along it. For example, while a character runs through a forest, a tree might stream in somewhere ahead of them and obstruct the path. To make pathfinding work seamlessly with streaming, it's highly recommended that you use the [Handling Blocked Paths](#handling-blocked-paths) technique and re-compute the path when necessary.

- A common approach in pathfinding is to use the coordinates of existing objects for [computation](#computing-the-path), such as setting a path destination to the position of an existing **TreasureChest** model in the world. This approach is fully compatible with server-side `Class.Script|Scripts` since the server has full view of the world at all times, but `Class.LocalScript|LocalScripts` and `Class.ModuleScript|ModuleScripts` that run on the client may fail if they attempt to compute a path to an object that's not streamed in.

  To address this issue, consider setting the destination to the position of a `Class.BasePart` within a [persistent](../workspace/streaming.md#model-streaming-controls) model. Persistent models load soon after the player joins and they never stream out, so a client-side script can connect to the `Class.Workspace.PersistentLoaded|PersistentLoaded` event and safely access the model for creating waypoints after the event fires.
