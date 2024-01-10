---
title: Collisions
description: Explains methods to detect physical collisions, handle collision events, and fine-tune which objects collide with others.
---

A collision occurs when two 3D objects come into contact within the 3D world. For customized collision handling, `Class.BasePart` has a set of [collision events](#collision-events) and [collision filtering](#collision-filtering) techniques, so you can control which physical assemblies collide with others.

## Collision Events

Collision **events** occur when two `Class.BasePart|BaseParts` touch or stop touching in the 3D world. You can detect these collisions through the `Class.BasePart.Touched|Touched` and `Class.BasePart.TouchEnded|TouchEnded` events which occur regardless of either part's `Class.BasePart.CanCollide|CanCollide` property value. When considering collision handling on parts, note the following:

- A part's `Class.BasePart.CanTouch|CanTouch` property determines whether it triggers collision events. If set to `false`, neither `Class.BasePart.Touched|Touched` nor `Class.BasePart.TouchEnded|TouchEnded` will fire.
- A part's `Class.BasePart.CanCollide|CanCollide` property affects whether it will **physically** collide with other parts and cause forces to act upon them. Even if `Class.BasePart.CanCollide|CanCollide` is disabled for a part, you can detect touch and non‑touch through `Class.BasePart.Touched|Touched` and `Class.BasePart.TouchEnded|TouchEnded` events.
- The `Class.BasePart.Touched|Touched` and `Class.BasePart.TouchEnded|TouchEnded` events only fire as a result of **physical** movement, not from a `Class.BasePart.Position|Position` or `Class.BasePart.CFrame|CFrame` changes that cause a part to intersect or stop intersecting another part.
- The top-level `Class.Terrain` class inherits from `Class.BasePart`, so you can assign a [collision group](#collision-groups) to `Class.Terrain` to determine whether other `Class.BasePart|BaseParts` collide with [Terrain](../parts/terrain.md) voxels.

<Alert severity="info">
For performance optimization, set `Class.BasePart.CanTouch|CanTouch` to `false` for objects that don't require collisions.
</Alert>

### Touched

The `Class.BasePart.Touched|Touched` event fires when a `Class.BasePart`
comes in contact with another, or with a [Terrain](../parts/terrain.md) voxel. It only fires as a result of **physical simulation** and will not fire when the part's `Class.BasePart.Position|Position` or `Class.BasePart.CFrame|CFrame` is explicitly set such that it intersects another part or voxel.

The following code pattern shows how the `Class.BasePart.Touched|Touched` event can be connected to a custom `onTouched()` function. Note that the event sends the `otherPart` argument to the function, indicating the other part involved in the collision.

```lua title='Part Collision' highlight='3-5, 7'
local part = workspace.Part

local function onTouched(otherPart)
	print(part.Name .. " collided with " .. otherPart.Name)
end

part.Touched:Connect(onTouched)
```

Note that the `Class.BasePart.Touched|Touched` event can fire multiple times in quick succession based on subtle physical collisions, such as when a moving object "settles" into a resting position or when a collision involves a [multi‑part model](#model-collisions). To avoid triggering more `Class.BasePart.Touched|Touched` events than necessary, you can implement a simple debounce system which enforces a "cooldown" period through an instance [attribute](../studio/properties.md#instance-attributes).

```lua title='Part Collision With Cooldown' highlight='3, 6, 9-12'
local part = workspace.Part

local COOLDOWN_TIME = 1

local function onTouched(otherPart)
	if not part:GetAttribute("Touched") then
		print(part.Name .. " collided with " .. otherPart.Name)

		part:SetAttribute("Touched", true)  -- Set attribute to true
		task.wait(COOLDOWN_TIME)  -- Wait for cooldown duration
		part:SetAttribute("Touched", false)  -- Reset attribute
	end
end

part.Touched:Connect(onTouched)
```

### TouchEnded

The `Class.BasePart.TouchEnded|TouchEnded` event fires when the entire collision bounds of a `Class.BasePart` exits the bounds of another `Class.BasePart` or a filled [Terrain](../parts/terrain.md) voxel. It only fires as a result of **physical simulation** and will not fire when the part's `Class.BasePart.Position|Position` or `Class.BasePart.CFrame|CFrame` is explicitly set such that it stops intersecting another part or voxel.

The following code pattern shows how the `Class.BasePart.TouchEnded|TouchEnded` event can be connected to a custom `onTouchEnded()` function. Like `Class.BasePart.Touched|Touched`, the event sends the `otherPart` argument to the function, indicating the other part involved.

```lua title='Non-Collision Detection' highlight='3-5, 7'
local part = workspace.Part

local function onTouchEnded(otherPart)
	print(part.Name .. " is no longer touching " .. otherPart.Name)
end

part.TouchEnded:Connect(onTouchEnded)
```

## Collision Filtering

Collision **filtering** defines which physical parts collide with others. You can configure filtering for numerous objects through [collision groups](#collision-groups) or you can control collisions on a [part‑to‑part](#part-to-part-filtering) basis with `Class.NoCollisionConstraint` instances.

### Collision Groups

Collision **groups** let you assign `Class.BasePart|BaseParts` to dedicated groups and specify whether or not they collide with those in other groups. Parts within non‑colliding groups pass through each other completely, even if both parts have their `Class.BasePart.CanCollide|CanCollide` property set to `true`.

<figure>
  <video src="../assets/physics/collisions/Collision-Groups.mp4" controls width="100%" alt="Video of spinning objects in different collision groups colliding or not colliding"></video>
  <figcaption>In the video above, the spinning objects are in different collision groups such that they collide with objects of another color but not with objects of their own color</figcaption>
</figure>

You can easily set up collision groups through Studio's **Collision Groups Editor**, accessible by clicking the **Collision&nbsp;Groups** button in the [Model](../studio/model-tab.md) tab.

<img src="../assets/studio/general/Model-Tab-Collision-Groups.png" width="815" alt="Collision Groups tool indicated in Model tab of Studio" />

The editor functions in either **List&nbsp;View** which favors [docking](../studio/customization.md#window-layout) to the left or right side of Studio, or in a wider **Table&nbsp;View**, which favors docking to the top or bottom.

<Tabs>
  <TabItem label="List View">
    <img src="../assets/studio/collision-groups-editor/List-View.png" width="750" height="180" alt="List View example in Collision Groups Editor" />
  </TabItem>
  <TabItem label="Table View">
    <img src="../assets/studio/collision-groups-editor/Table-View.png" width="750" height="180" alt="Table View example in Collision Groups Editor" />
  </TabItem>
</Tabs>

#### Creating Groups

<Tabs>
<TabItem label="Studio Editor">
The editor includes one **Default** collision group which cannot be renamed or deleted. All `Class.BasePart|BaseParts` automatically belong to this default group unless assigned to another group, meaning that they will collide with all other objects in the **Default** group.

To create a new collision group:

1. Click the **Add Group** button along the top of the editor panel, enter a new group name, and press <kbd>Enter</kbd>. The new group appears in both columns of list view, or in both the left column and upper row of table view.

   <Tabs>
   <TabItem label="List View">
   <img src="../assets/studio/collision-groups-editor/New-Group-List-View.png" width="750" height="180" alt="New group added to Collision Groups Editor in List View" />
   </TabItem>
   <TabItem label="Table View">
   <img src="../assets/studio/collision-groups-editor/New-Group-Table-View.png" width="750" height="180" alt="New group added to Collision Groups Editor in Table View" />
   </TabItem>
   </Tabs>

1. Repeat the process if necessary, choosing a unique and descriptive name for each group. Note that you can change a group's name during development by clicking in its field, or by selecting it and clicking the **rename** button.

   <img src="../assets/studio/collision-groups-editor/Rename-Group.png" width="360" alt="Button and field indicated for renaming a group in the Collision Groups Editor" />

</TabItem>
<TabItem label="Scripting">
To create a new collision group through scripting, include the `Class.PhysicsService` service and register the group with `Class.PhysicsService:RegisterCollisionGroup()`. Note that it may be helpful to pre-declare your group names in local variables, as the same strings can be used for [assigning objects](#assigning-objects-to-groups) and [configuring groups](#configuring-group-collisions) within the same script.

```lua title="Collision Group Setup" highlight='1,3,4,7,8'
local PhysicsService = game:GetService("PhysicsService")

local cubes = "Cubes"
local doors = "Doors"

-- Register two collision groups
PhysicsService:RegisterCollisionGroup(cubes)
PhysicsService:RegisterCollisionGroup(doors)
```

</TabItem>
</Tabs>

#### Assigning Objects to Groups

<Tabs>
<TabItem label="Studio Editor">
To assign objects to groups you've [created](#creating-groups) through the Studio editor:

1. Select one or more `Class.BasePart|BaseParts` that qualify as part of a collision group.
1. Assign them to the group by clicking the **&CirclePlus;** button for its row. Objects can belong to only one collision group at a time, so placing them in a new group removes them from their current group.

   <img src="../assets/studio/collision-groups-editor/Add-To-Group.png" width="360" alt="Plus button indicated in Collision Groups Editor for adding selected parts to a group" />

Once assigned, the new group is reflected under the object's **CollisionGroup** property.

<img src="../assets/physics/collisions/BasePart-CollisionGroup.png" width="320" alt="Chosen collision group indicated as the part's CollisionGroup property" />
</TabItem>
<TabItem label="Scripting">
To add a `Class.BasePart` to a collision group through scripting, simply assign the group's **string name**, previously registered through `Class.PhysicsService:RegisterCollisionGroup()|RegisterCollisionGroup()`, to the part's `Class.BasePart.CollisionGroup|CollisionGroup` property.

```lua title="Collision Group Setup" highlight='7,8,11,12'
local PhysicsService = game:GetService("PhysicsService")

local cubes = "Cubes"
local doors = "Doors"

-- Register two collision groups
PhysicsService:RegisterCollisionGroup(cubes)
PhysicsService:RegisterCollisionGroup(doors)

-- Assign an object to each group
workspace.Cube1.CollisionGroup = cubes
workspace.Door1.CollisionGroup = doors
```

</TabItem>
</Tabs>

#### Configuring Group Collisions

<Tabs>
<TabItem label="Studio Editor">
Under default configuration, objects in all groups collide with each other. To prevent objects in one group from colliding with objects in another group, **uncheck** the box in the respective row/column.

In the following example, objects in the **Cubes** group will **not** collide with objects in the **Doors** group.

<Tabs>
  <TabItem label="List View">
    <img src="../assets/studio/collision-groups-editor/Configure-Groups-List-View.png" width="750" height="158" alt="Group configured in List View of Collision Groups Editor" />
  </TabItem>
  <TabItem label="Table View">
    <img src="../assets/studio/collision-groups-editor/Configure-Groups-Table-View.png" width="750" height="158" alt="Group configured in Table View of Collision Groups Editor" />
  </TabItem>
</Tabs>
</TabItem>
<TabItem label="Scripting">
To configure how objects in two collision groups interact, call `Class.PhysicsService:CollisionGroupSetCollidable()|CollisionGroupSetCollidable()`, providing the two collision groups and a boolean `true` (collidable) or `false` (non-collidable). If objects in the same group should or shouldn't collide with each other, use that group name for both the first and second parameters.

```lua title="Collision Group Setup" highlight='15'
local PhysicsService = game:GetService("PhysicsService")

local cubes = "Cubes"
local doors = "Doors"

-- Register two collision groups
PhysicsService:RegisterCollisionGroup(cubes)
PhysicsService:RegisterCollisionGroup(doors)

-- Assign an object to each group
workspace.Cube1.CollisionGroup = cubes
workspace.Door1.CollisionGroup = doors

-- Set cubes to be non-collidable with doors
PhysicsService:CollisionGroupSetCollidable(cubes, doors, false)
```

</TabItem>
</Tabs>

### Part-to-Part Filtering

To prevent collisions between two specific parts without
setting up [collision groups](#collision-groups), such as between a vehicle's wheel and its chassis, consider the
[No&nbsp;Collision](../physics/mechanical-constraints.md#nocollisionconstraint)
constraint. Advantages include:

- Collision groups and/or configuration scripts are not required, so you can easily create and share models with customized collision filtering.
- Connected parts will not collide with each other, but they can still
  collide with other objects.

### Disabling Character Collisions

Roblox player characters collide with each other by default. This can lead to
interesting but unintended gameplay, such as characters jumping on top of each other to reach specific areas. If this behavior is undesirable, you can prevent it through the following `Class.Script` in `Class.ServerScriptService`.

```lua title='Script - Disable Character Collisions'
local PhysicsService = game:GetService("PhysicsService")
local Players = game:GetService("Players")

PhysicsService:RegisterCollisionGroup("Characters")
PhysicsService:CollisionGroupSetCollidable("Characters", "Characters", false)

local function onDescendantAdded(descendant)
	-- Set collision group for any part descendant
	if descendant:IsA("BasePart") then
		descendant.CollisionGroup = "Characters"
	end
end

local function onCharacterAdded(character)
	-- Process existing and new descendants for physics setup
	for _, descendant in character:GetDescendants() do
		onDescendantAdded(descendant)
	end
	character.DescendantAdded:Connect(onDescendantAdded)
end

Players.PlayerAdded:Connect(function(player)
	-- Detect when the player's character is added
	player.CharacterAdded:Connect(onCharacterAdded)
end)
```

## Model Collisions

`Class.Model` objects are containers for parts rather than inheriting from `Class.BasePart`, so they can't directly connect to `Class.BasePart.Touched` or `Class.BasePart.TouchEnded` events. To determine whether a model triggers a collision events, you need to loop through its children and connect the custom `onTouched()` and `onTouchEnded()` functions to each child `Class.BasePart`.

<Alert severity='info'>
For joined parts by [solid modeling](../parts/solid-modeling.md) instead of `Class.Model` objects, see [Mesh and Solid Modeling Collisions](#mesh-and-solid-model-collisions).
</Alert>

The following code sample connects all `Class.BasePart|BaseParts` of a multi‑part model to collision events and tracks the total number of collisions with other parts.

```lua title='Model Collision'
local model = script.Parent

local numTouchingParts = 0

local function onTouched(otherPart)
	-- Ignore instances of the model intersecting with itself
	if otherPart:IsDescendantOf(model) then return end
	-- Increase count of model parts touching
	numTouchingParts += 1

	print(model.Name, "intersected with ", otherPart.Name, "| Model parts touching:", numTouchingParts)
end

local function onTouchEnded(otherPart)
	-- Ignore instances of the model un-intersecting with itself
	if otherPart:IsDescendantOf(model) then return end
	-- Decrease count of model parts touching
	numTouchingParts -= 1

	print(model.Name, "un-intersected from", otherPart.Name, "| Model parts touching:", numTouchingParts)
end

for _, child in model:GetChildren() do
	if child:IsA("BasePart") then
		child.Touched:Connect(onTouched)
		child.TouchEnded:Connect(onTouchEnded)
	end
end
```

## Mesh and Solid Model Collisions

`Class.MeshPart` and `Class.PartOperation` (parts joined by solid modeling) are subclasses of `Class.BasePart`, so meshes and solid modeled parts inherit the same [collision events](#collision-events) and [collision filtering](#collision-filtering) options as regular parts. However, since meshes and solid modeled parts usually have more complex geometries, they have a distinctive `Class.TriangleMeshPart.CollisionFidelity|CollisionFidelity` property which determines how precisely the physical bounds align with the visual representation for collision handling.

The collision fidelity property has the following options, in order of fidelity and performance impact from lowest to highest:

- **Box** — Creates a bounding collision box, ideal for small or non-interactive objects.
- **Hull** — Generates a convex hull, suitable for objects with less pronounced indentations or cavities.
- **Default** — Produces an approximate collision shape that supports concavity, suitable for complex objects with semi-detailed interaction needs.
- **PreciseConvexDecomposition** — Offers the most precise fidelity but still not a 1:1 representation of the visual. This option has the most expensive performance cost and takes longer for the engine to compute.

<Tabs>
  <TabItem label="Original Mesh">
    <img src="../assets/physics/collisions/Collision-Fidelity-MeshPart.jpg" width="600" height="500" alt="Original mesh of castle tower" />
  </TabItem>
	<TabItem label="Default">
    <img src="../assets/physics/collisions/Collision-Fidelity-Default.jpg" width="600" height="500" alt="Collision fidelity of Default shown for mesh" />
  </TabItem>
  <TabItem label="Box">
    <img src="../assets/physics/collisions/Collision-Fidelity-Box.jpg" width="600" height="500" alt="Collision fidelity of Box shown for mesh"/>
  </TabItem>
	<TabItem label="Hull">
    <img src="../assets/physics/collisions/Collision-Fidelity-Hull.jpg" width="600" height="500" alt="Collision fidelity of Hull shown for mesh" />
  </TabItem>
	<TabItem label="Precise">
    <img src="../assets/physics/collisions/Collision-Fidelity-Precise.jpg" width="600" height="500" alt="Collision fidelity of PreciseConvexDecomposition shown for mesh" />
  </TabItem>
</Tabs>

<Alert severity="info">
To visualize collision fidelity in Studio, open **File** > **Studio Settings** > **Studio** > **Visualization**, then enable **Show Decomposition Geometry**.
</Alert>

For more information on the performance impact of collision fidelity options and how to mitigate them, see [Performance Optimization](../projects/performance-optimization/computation.md#physics). For an in-depth walkthrough on how to choose a collision fidelity option that balances your precision needs and performance requirements, see [Set Physics and Rendering Parameters](../tutorials/environmental-art/assemble-an-asset-library.md#collisionfidelity).
