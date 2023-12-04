---
title: Raycasting
description: Raycasting allows you to detect collisions and determine the position of objects.
---

At its most basic level, **raycasting** is the act of sending out an invisible ray from a `Datatype.Vector3` point in a specific direction with a defined length. Once cast, you can detect if the ray hits a `Class.BasePart` or `Class.Terrain` cell.

<figure>
  <video controls src="../assets/workspace/raycasting/Laser-Maze.mp4" width="100%"></video>
  <figcaption>Lasers are fired by floating orbs, and raycasting determines whether a laser hits a platform. Platforms touched by the lasers are temporarily destroyed.</figcaption>
</figure>

## Casting a Ray

You can cast a ray with the `Class.WorldRoot:Raycast()` method (`Class.WorldRoot:Raycast()|workspace:Raycast()`) from a `Datatype.Vector3` origin in a `Datatype.Vector3` direction.

```lua title='Basic Raycast' highlight='4'
local rayOrigin = Vector3.new(0, 0, 0)
local rayDirection = Vector3.new(0, -100, 0)

local raycastResult = workspace:Raycast(rayOrigin, rayDirection)
```

<Alert severity="warning">
When casting a ray, the distance between the origin and directional `Datatype.Vector3` is the **functional length** (magnitude) of the ray. The maximum length is 15,000 studs.
</Alert>

### Filtering

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

```lua title='Raycast Filtering' highlight='4-7,9'
local rayOrigin = Vector3.zero
local rayDirection = Vector3.new(0, -100, 0)

local raycastParams = RaycastParams.new()
raycastParams.FilterDescendantsInstances = {script.Parent}
raycastParams.FilterType = Enum.RaycastFilterType.Exclude
raycastParams.IgnoreWater = true

local raycastResult = workspace:Raycast(rayOrigin, rayDirection, raycastParams)
```

### Calculating Direction

When applicable, you can calculate an unknown directional vector (`rayDirection`) using a known **origin** and **destination**. This is useful when casting a ray between two points that can change, such as from one player character to another.

1. The origin plus a directional vector indicate the ray's destination:

   <i>rayOrigin</i> + <i>rayDirection</i> = <i>rayDestination</i>

2. Subtract <i>rayOrigin</i> from both sides of the equation:

   <i>rayOrigin</i> + <i>rayDirection</i> &minus; <i>rayOrigin</i> = <i>rayDestination</i> &minus; <i>rayOrigin</i>

3. The ray's direction equals the destination minus the origin:

   <i>rayDirection</i> = <i>rayDestination</i> &minus; <i>rayOrigin</i>

```lua highlight='4'
local rayOrigin = workspace.TestOrigin.Position
local rayDestination = workspace.TestDestination.Position

local rayDirection = rayDestination - rayOrigin

local raycastResult = workspace:Raycast(rayOrigin, rayDirection)
```

## Detecting Hits

If the [raycasting operation](#casting-a-ray) hits an eligible `Class.BasePart` or `Class.Terrain` cell, a `Datatype.RaycastResult` object is returned containing the results. To test for a hit, confirm that the result is not `nil` and utilize the following properties as needed.

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

```lua title='Raycast Hit Detection' highlight='7-11'
local rayOrigin = Vector3.zero
local rayDirection = Vector3.new(0, -100, 0)

local raycastResult = workspace:Raycast(rayOrigin, rayDirection)

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
