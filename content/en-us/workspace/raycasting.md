---
title: Raycasting
description: Raycasting allows you to detect collisions and determine the position of objects.
---

At its most basic level, **raycasting** is the act of sending out an invisible ray from a `Datatype.Vector3` point in a specific direction with a defined length. Once cast, you can detect if the ray hits a `Class.BasePart` or `Class.Terrain` cell.

<figure>
  <video controls src="../assets/workspace/raycasting/Laser-Maze.mp4" width="100%"></video>
  <figcaption>Lasers are fired by floating orbs, and raycasting determines whether a laser hits a platform. Platforms touched by the lasers are temporarily destroyed.</figcaption>
</figure>

You can cast a ray with the `Class.WorldRoot:Raycast()` method (`Class.Workspace:Raycast()`) from a `Datatype.Vector3` origin in a `Datatype.Vector3` direction.

```lua title="Basic Raycast" highlight="4"
local Workspace = game:GetService("Workspace")

local rayOrigin = Vector3.new(0, 0, 0)
local rayDirection = Vector3.new(0, -100, 0)

local raycastResult = Workspace:Raycast(rayOrigin, rayDirection)
```

<Alert severity="warning">
When casting a ray, the direction parameter should encompass the desired length of the ray. For instance, if the magnitude of the direction is 10, the resulting ray will also be of length 10. The maximum length is 15,000 studs.
</Alert>

When applicable, you can calculate an unknown directional vector (`rayDirection`) using a known **origin** and **destination**. This is useful when casting a ray between two points that can change, such as from one player character to another.

1. The origin plus a directional vector indicate the ray's destination:

   $\text{rayOrigin} + \text{rayDirection} = \text{rayDestination}$

2. Subtract $\text{rayOrigin}$ from both sides of the equation:

   $\text{rayOrigin} + \text{rayDirection} - \text{rayOrigin} = \text{rayDestination} - \text{rayOrigin}$

3. The ray's direction equals the destination minus the origin:

   $\text{rayDirection} = \text{rayDestination} - \text{rayOrigin}$

```lua highlight="4"
local Workspace = game:GetService("Workspace")

local rayOrigin = Workspace.TestOrigin.Position
local rayDestination = Workspace.TestDestination.Position

local rayDirection = rayDestination - rayOrigin

local raycastResult = Workspace:Raycast(rayOrigin, rayDirection)
```

## Filter options

`Class.WorldRoot:Raycast()` accepts an optional `Datatype.RaycastParams` object which tells the raycast to selectively include or exclude certain `Class.BasePart|BaseParts`, ignore the **Water** material for `Class.Terrain`, or use a [collision group](../workspace/collisions.md#collision-filtering).

<table>
<thead>
   <tr>
     <th>Key</th>
	 <th>Description</th>
   </tr>
</thead>
<tbody>
   <tr>
     <td>`FilterDescendantsInstances`</td>
     <td>`Array` of objects whose descendants are used in filtering raycasting candidates.</td>
   </tr>
   <tr>
     <td>`FilterType`</td>
     <td>`Enum.RaycastFilterType` enum which determines how the `FilterDescendantsInstances` array is used in the raycast operation.<ul><li>`Enum.RaycastFilterType|Exclude` &mdash; Every `Class.BasePart` is considered **except** those that are descendants of objects in the array.</li><li>`Enum.RaycastFilterType|Include` &mdash; Only `Class.BasePart|BaseParts` that are descendants of objects in the array are considered.</li></ul></td>
   </tr>
   <tr>
     <td>`IgnoreWater`</td>
     <td>Boolean which determines whether the **Water** material is considered when raycasting against `Class.Terrain`.</td>
   </tr>
   <tr>
     <td>`CollisionGroup`</td>
     <td>String name of the [collision group](../workspace/collisions.md#collision-filtering) used for the raycasting operation.</td>
   </tr>
</tbody>
</table>

```lua title="Raycast Filtering" highlight="4-7,9"
local Workspace = game:GetService("Workspace")

local rayOrigin = Vector3.zero
local rayDirection = Vector3.new(0, -100, 0)

local raycastParams = RaycastParams.new()
raycastParams.FilterDescendantsInstances = {script.Parent}
raycastParams.FilterType = Enum.RaycastFilterType.Exclude
raycastParams.IgnoreWater = true

local raycastResult = Workspace:Raycast(rayOrigin, rayDirection, raycastParams)
```

## Hit detection

If the raycasting operation hits an eligible `Class.BasePart` or `Class.Terrain` cell, a `Datatype.RaycastResult` object is returned containing the results. To test for a hit, confirm that the result is not `nil` and utilize the following properties as needed.

<table>
<thead>
   <tr>
     <th>Property</th>
	 <th>Description</th>
   </tr>
</thead>
<tbody>
   <tr>
     <td>`Class.Instance`</td>
     <td>The `Class.BasePart` or `Class.Terrain` cell that the ray intersected.</td>
   </tr>
   <tr>
     <td>`Position`</td>
     <td>`Datatype.Vector3` position of the intersection between the ray and the `Class.Instance`.</td>
   </tr>
   <tr>
     <td>`Distance`</td>
     <td>Distance between the ray origin and intersection point.</td>
   </tr>
   <tr>
     <td>`Material`</td>
     <td>The `Enum.Material` of the `Class.BasePart` or `Class.Terrain` at the intersection point.</td>
   </tr>
   <tr>
     <td>`Normal`</td>
     <td>`Datatype.Vector3` of the normal vector of the intersected face.</td>
   </tr>
</tbody>
</table>

<Alert severity="warning">
When used in a place with instance [streaming](../workspace/streaming.md) enabled, a client may not have streamed in distant `Class.BasePart|BaseParts`, so a raycast may not detect a hit. Additionally, low-detail "imposter" `Class.Terrain` and `Class.Model|Models` generated by the streaming system are purely visual and are not eligible raycast targets.
</Alert>

<Alert severity="info">
You can exempt any `Class.BasePart` from hit detection by setting its `Class.BasePart.CanQuery` property to `false`.
</Alert>

```lua title="Raycast Hit Detection" highlight="7-11"
local Workspace = game:GetService("Workspace")

local rayOrigin = Vector3.zero
local rayDirection = Vector3.new(0, -100, 0)

local raycastResult = Workspace:Raycast(rayOrigin, rayDirection)

if raycastResult then
	print("Instance:", raycastResult.Instance)
	print("Position:", raycastResult.Position)
	print("Distance:", raycastResult.Distance)
	print("Material:", raycastResult.Material)
	print("Normal:", raycastResult.Normal)
else
	warn("No raycast result!")
end
```
