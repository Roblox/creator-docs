---
title: Solid modeling
description: Solid modeling is the process of joining parts together to form complex shapes.
---

import BetaAlert from '../includes/beta-features/beta-alert.md'

**Solid modeling** is the process of joining [parts](../parts/index.md)
together in unique ways to form more complex shapes. This includes the boolean operations **union**, **subtraction**, and **intersection**, which are commonly known as Constructive Solid Geometry (CSG). You can perform solid modeling everywhere: in Studio, plugins, even [in-experience](#in-experience-solid-modeling) on both the server and client.

In addition to boolean CSG, solid modeling also supports meshes, as long as they are [watertight](#watertight-geometry), and operations like **sweep** and **fragment** that let you and your players slice, cut, and shatter geometry for unique gameplay interactions.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/modeling/solid-modeling/SweepPart-Crinkle.png" width="80%" alt="" />
    <figcaption>A mesh object created with `Class.GeometryService:SweepPartAsync()|SweepPartAsync()`</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/solid-modeling/Fragment-Bridge.png" alt="" />
    <figcaption>A mesh object broken with `Class.GeometryService:FragmentAsync()|FragmentAsync()`</figcaption>
  </figure>
</GridContainer>

<BetaAlert betaName="Solid Modeling On Meshes" leadIn="Performing CSG on meshes and using the sweep and fragment operations are only available by enabling the beta feature through " leadOut="." components={props.components} />

<Alert severity="info">
In this guide, the term "part" refers to an instance of `Class.Part`, `Class.PartOperation`, or `Class.MeshPart`, which are all children of `Class.BasePart`.
</Alert>

## Watertight geometry

<BaseAccordion>
<AccordionSummary>
<Typography variant="subtitle2">Basic elements of meshes</Typography>
</AccordionSummary>
<AccordionDetails>

There are three basic elements of meshes:

- **Vertex** - A single point on the mesh.
- **Edge** - A line that connects two vertices.
- **Face** - A surface area between three or more vertices.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/art/3p-software/blender/Vertex.png" alt="A single active vertex on a cube mesh." />
    <figcaption>Vertex</figcaption>
  </figure>
  <figure>
    <img src="../assets/art/3p-software/blender/Edge.png"alt="A single active edge on a cube mesh."/>
    <figcaption>Edge</figcaption>
  </figure>
	<figure>
    <img src="../assets/art/3p-software/blender/Face.png" alt="A single active face on a cube mesh." />
    <figcaption>Face</figcaption>
  </figure>
</GridContainer>

</AccordionDetails>
</BaseAccordion>

Solid modeling operations can only work with **watertight** geometry; in fact, "solid" and "watertight" are synonymous. In technical terms, a mesh being watertight means that it's closed, manifold, and non-self-intersecting. These terms have strict definitions, but here are some simple rules:

- Each face must have an 'inside' side and an 'outside' side. These are determined by the face's winding order, which is the order of its three vertices.
- Each edge must be shared by exactly two triangles. This means there cannot be any holes in the mesh because the edges around the rim of a hole would only have one triangle.
- Faces cannot pass through other faces.
- Adjacent triangles must agree on which side is the 'outside' side.
- Each vertex must have exactly one fan of adjacent triangles.

<img src="../assets/modeling/solid-modeling/Not-Watertight-Examples.png" alt="Examples of non-watertight goemetry" width="70%" />

<BaseAccordion>
<AccordionSummary>
<Typography variant="subtitle2">Repairing non-watertight meshes</Typography>
</AccordionSummary>
<AccordionDetails>

The solid modeling system is able to automatically repair specific small issues with a mesh, but in general, API calls will fail if the mesh is not watertight. There's no one-size-fits-all way to repair an existing non-watertight mesh, but there are several Blender plugins which can help, such as [3D Print Toolbox](https://extensions.blender.org/add-ons/print3d-toolbox) and [Mesh Repair Tools](https://extensions.blender.org/add-ons/mesh-repair-tools). As another option, [Meshlab](https://www.meshlab.net) also has very useful tools built-in to try and make the mesh manifold, which is the main requirement for a mesh being watertight.

One way to see that a mesh will be extremely difficult to make watertight is to look at it in Studio from all angles, then try enabling and disabling the mesh's `Class.MeshPart.DoubleSided` property. If you can see any difference, then the mesh is just a shell and the tools mentioned above won't work because they cannot guess what space is inside versus outside the mesh. However, if all you want is a thin mesh and it isn't important to keep the mesh's dimensions exactly the same, you can use Blender's [Solidify modifier](https://docs.blender.org/manual/en/latest/modeling/modifiers/generate/solidify.html) to sightly thicken the shell into a watertight mesh.

<figure>
    <img src="../assets/modeling/solid-modeling/DoubleSided-Diff.png" alt="Example of a mesh which looks different when DoubleSided is enabled." width="800" />
    <figcaption>This is a shell mesh and automatic repair methods won't work for it.</figcaption>
</figure>

</AccordionDetails>
</BaseAccordion>

## Solid modeling in Studio

You can perform three basic boolean operations using four tools within the **Model** tab toolbar.

<img src="../assets/studio/general/Toolbar-Solid-Modeling.png" alt="Solid modeling tools highlighted in Studio's toolbar." width="800" />

<table>
  <thead>
    <tr>
      <th>Tool</th>
	    <th>Shortcut</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>[Union](#union-parts)</td>
	    <td><kbd>Shift</kbd><kbd>Ctrl</kbd><kbd>G</kbd>&nbsp;(Windows)<br /><kbd>Shift</kbd><kbd>⌘</kbd><kbd>G</kbd> (Mac)</td>
      <td>Join two or more parts together to form a single solid union.</td>
    </tr>
	<tr>
      <td>[Intersect](#intersect-parts)</td>
	    <td><kbd>Shift</kbd><kbd>Ctrl</kbd><kbd>I</kbd>&nbsp;(Windows)<br /><kbd>Shift</kbd><kbd>⌘</kbd><kbd>I</kbd> (Mac)</td>
      <td>Intersect overlapping parts into a single solid intersection.</td>
    </tr>
    <tr>
      <td>[Negate](#negate-parts)</td>
	    <td><kbd>Shift</kbd><kbd>Ctrl</kbd><kbd>N</kbd>&nbsp;(Windows)<br /><kbd>Shift</kbd><kbd>⌘</kbd><kbd>N</kbd> (Mac)</td>
      <td>Negate parts, useful for making holes and indentations.</td>
    </tr>
    <tr>
      <td>[Separate](#separate-unions-or-intersections)</td>
	    <td><kbd>Shift</kbd><kbd>Ctrl</kbd><kbd>U</kbd>&nbsp;(Windows)<br /><kbd>Shift</kbd><kbd>⌘</kbd><kbd>U</kbd> (Mac)</td>
      <td>Separate the union or intersection back into its individual parts.</td>
    </tr>
  </tbody>
</table>

### Union parts

The **Union** tool joins two or more parts together to form a single solid `Class.UnionOperation`.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/modeling/solid-modeling/Union-Before.png" alt="A block and a cylinder." />
    <figcaption>Individual Parts</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/solid-modeling/Union-After.png" alt="A block and a cylinder combined into one object." />
    <figcaption>Union result</figcaption>
  </figure>
</GridContainer>

To combine parts together into a union:

1. Select all parts that you want to join together.
2. Click the **Union** button. All of the parts combine into one solid `Class.UnionOperation` with the name **Union**.

### Intersect parts

The **Intersect** tool intersects overlapping parts into a single solid `Class.IntersectOperation`.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/modeling/solid-modeling/Intersect-Before.png" alt="A block and a cylinder." />
    <figcaption>Individual Parts</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/solid-modeling/Intersect-After.png" alt="A block and a cylinder combined into one object." />
    <figcaption>Intersect result</figcaption>
  </figure>
</GridContainer>

To intersect overlapping parts together:

1. Select all parts that you want to intersect.
2. Click the **Intersect** button. All of the parts combine into one solid `Class.IntersectOperation` with the name **Intersection**.

### Negate parts

The **Negate** tool negates a part so that when it's [unioned with another part](#union-parts), the shape of the negated part is **subtracted** from the other part.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/modeling/solid-modeling/Subtract-Before.png" alt="A block and a cylinder." />
    <figcaption>Block and negated cylinder</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/solid-modeling/Subtract-After.png" alt="A block and a cylinder combined into one object." />
    <figcaption>Subtract result</figcaption>
  </figure>
</GridContainer>

To subtract a part from other overlapping parts:

1. Select the part you want to negate from other parts.
1. Click **Negate**. The part becomes tagged as a negated part and a negated symbol appears in the Explorer. The part becomes translucent with a reddish tint to indicate its state.
1. Select both the negated part and the parts you want to subtract it from.
1. Click **Union**. The negated part is cut out from the included overlapping parts.

The tag is exposed for scripting, so you can also negate parts by adding the tag `rbxNegate` from a script or plugin. `Class.NegateOperation` is no longer used.

### Separate unions or intersections

The **Separate** tool separates a `Class.UnionOperation` back into its individual parts, essentially serving as an "undo" tool for unions and intersections.

To separate a union or intersection back into individual parts:

1. Select the union or intersection.
1. Click **Separate**. The parts separate back into their original form.

## In-experience solid modeling

You can also perform solid modeling operations while an experience is running by using `Class.GeometryService` functions.

### UnionAsync(), IntersectAsync(), and SubtractAsync()

Similar to Studio's built-in basic boolean operation tools, you can use `Class.GeometryService` functions like `Class.GeometryService:UnionAsync()|UnionAsync()`, `Class.GeometryService:IntersectAsync()|IntersectAsync()`, and `Class.GeometryService:SubtractAsync()|SubtractAsync()`to perform basic boolean operations while an experience is running. For example, the following script uses `Class.GeometryService:SubtractAsync()|SubtractAsync()`to subtract the volume of one part from another.

```lua highlight="6"
local GeometryService = game:GetService("GeometryService")

local mainPart = Instance.new("Part")
local otherPart = Instance.new("Part")
otherPart.Position = Vector3.new(1, 0.5, 1)

local success, newParts = pcall(function()
	return GeometryService:SubtractAsync(mainPart, {otherPart})
end)
if success and newParts then
	for _, newPart in pairs(newParts) do
		newPart.Parent = workspace
	end
end
```

<img src="../assets/modeling/solid-modeling/Subtract-Simple-Block.png" alt="A block subtracted from another block."  width="300" />

<Alert severity="warning">
In-experience solid modeling operations are asynchronous, meaning they can impact performance. For best results, you should not perform a large series of `Async` calls such as `Class.GeometryService:UnionAsync()|UnionAsync()` in quick succession.
</Alert>

To further demonstrate, the next code sample combines the geometry of `mainPart` and the parts in the `otherParts` array, then it destroys the original parts involved in the operation. You can replace the call to `Class.GeometryService:UnionAsync()|UnionAsync()` with `Class.GeometryService:IntersectAsync()|IntersectAsync()` or `Class.GeometryService:SubtractAsync()|SubtractAsync()` to perform the other boolean operations.

```lua highlight="6"
local GeometryService = game:GetService("GeometryService")

local mainPart = workspace.BlueBlock
local otherParts = { workspace.PurpleCylinder }

local options = {
	CollisionFidelity = Enum.CollisionFidelity.Default,
	RenderFidelity = Enum.RenderFidelity.Automatic,
	SplitApart = false,
}

-- Perform union operation in pcall() since it's asynchronous
local success, newParts = pcall(function()
	return GeometryService:UnionAsync(mainPart, otherParts, options)
end)

if success and newParts then
	-- Loop through resulting parts to reparent/reposition
	for _, newPart in pairs(newParts) do
		newPart.Parent = mainPart.Parent
		newPart.CFrame = mainPart.CFrame
		newPart.Anchored = mainPart.Anchored
	end

	-- Destroy original parts
	mainPart.Parent = nil
	mainPart:Destroy()
	for _, otherPart in pairs(otherParts) do
		otherPart.Parent = nil
		otherPart:Destroy()
	end
end
```

As long as all the inputs are composed of primitive parts rather than `Class.MeshPart|MeshParts`, the union, interact, and subtract boolean operations will produce a `Class.PartOperation` with two pieces of stored data: a tree of CSG operations known as a CSGTree, and a mesh for rendering.

<BaseAccordion>
<AccordionSummary>
<Typography variant="subtitle2">Migrating from BasePart CSG APIs</Typography>
</AccordionSummary>
<AccordionDetails>

Compared to `Class.BasePart:UnionAsync()`/`Class.BasePart:IntersectAsync()`/`Class.BasePart:SubtractAsync()`, the `Class.GeometryService` boolean functions differ as follows:

- The output is an array of instances rather than a single instance.
- The input parts do not need to be parented to the scene, allowing for background operations.
- When the `SplitApart` option is set to `true` (default), each distinct body will be returned in its own `Class.PartOperation`/`Class.MeshPart`.
- All the returned parts are in the coordinate space of the main part, so their `Class.PVInstance.Origin` positions are the same as the main part's. This keeps the vertices of the mesh in the same position relative to the object as before the operation, but it does also mean the `(0, 0, 0)` of a returned part is not necessarily at the center of its body.

</AccordionDetails>
</BaseAccordion>

### SweepPartAsync()

<BetaAlert betaName="Solid Modeling On Meshes" leadIn="This API is only available by enabling the beta feature through " leadOut="." components={props.components} />

The `Class.GeometryService:SweepPartAsync()` function creates a `Class.MeshPart` which has the shape of the input part dragged through a given set of `CFrame` positions. This function can be very useful for performing slicing and cutting interactions.

The input can be a `Class.Part`, `Class.PartOperation`, or `Class.MeshPart`. The result's shape is defined as the union of the convex hulls of each adjacent pair of `CFrames`; if only a single `CFrame` is provided, the result will be a convex hull of the input part.

To demonstrate how this function works, the following code sample sweeps a ball through a set of `CFrame` positions to create a spiral:

```lua highlight="6"
local GeometryService = game:GetService("GeometryService")

local inputPart = Instance.new("Part")
inputPart.Shape = Enum.PartType.Ball

local cframeList = {}
for i = 1, 50 do
	local rotation = CFrame.Angles(0, i * 0.5, 0)
	local position = Vector3.new(0, i * 0.1, -1)
	table.insert(cframeList, rotation * CFrame.new(position))
end

local success, sweptPart = pcall( function()
	return GeometryService:SweepPartAsync(inputPart, cframeList)
end)
if success and sweptPart then
	sweptPart.Parent = workspace
end
```

<img src="../assets/modeling/solid-modeling/SweepPart-Spring.png" alt="A spiral shape created by sweeping a sphere."  width="300" />

**Example**

<BaseAccordion>
<AccordionSummary>
<Typography variant="subtitle2">Slicing gameplay using sweep</Typography>
</AccordionSummary>
<AccordionDetails>

<img src="../assets/modeling/solid-modeling/SweepPart-Slice.png" alt="A translucent curved shape subtracted from a block."  width="500" />

This examples uses `Class.GeometryService:SweepPartAsync()` to achieve a sword or laser gun slice gameplay feature, where the movement of the sword is based on the player's mouse position. The user's mouse movement is recorded as a list of `CFrames`, `Class.GeometryService:SweepPartAsync()|SweepPartAsync()` builds a slice mesh from this data, then the slice mesh is subtracted from the part which was hit.

To get this example running in Studio:

1. Create the following `Script` in `ServerScriptService` to perform all of the solid modeling operations.

   ```lua highlight="6"
   local ReplicatedStorage = game:GetService("ReplicatedStorage")
   local GeometryService = game:GetService("GeometryService")
   local DrawCurveEvent = ReplicatedStorage:WaitForChild("DrawCurveEvent")

   DrawCurveEvent.OnServerEvent:Connect(function(player, cframeList, hitInstance)
	   local blade = Instance.new("Part")
	   blade.Size = Vector3.new(0.2, 0.2, 15.0)

	   local success, sweptPart = pcall( function()
		   return GeometryService:SweepPartAsync(blade, cframeList)
	   end)

	   if success and sweptPart then
		   -- Visualize the sweep
		   sweptPart.Parent = workspace
		   sweptPart.Transparency = 0.5
		   sweptPart.Anchored = true
		   sweptPart.CanQuery = false
		
		   -- Subtract the sweep from the hit instance
		   local subtractSuccess, newParts = pcall( function()
			   return GeometryService:SubtractAsync(hitInstance, {sweptPart})
		   end)
		   if subtractSuccess and newParts then
			   for _, newPart in pairs(newParts) do
				   newPart.Parent = hitInstance.Parent
				   newPart.Anchored = true
			   end
			   hitInstance:Destroy()
		   end
	   end
   end)
   ```

1. Create the following `LocalScript` in `StarterPlayerScripts` to handle user input.

   ```lua highlight="6"
   local ReplicatedStorage = game:GetService("ReplicatedStorage")
   local GeometryService = game:GetService("GeometryService")
   local DrawCurveEvent = ReplicatedStorage:WaitForChild("DrawCurveEvent")

   DrawCurveEvent.OnServerEvent:Connect(function(player, cframeList, hitInstance)
	   local blade = Instance.new("Part")
	   blade.Size = Vector3.new(0.2, 0.2, 15.0)

	   local success, sweptPart = pcall( function()
		   return GeometryService:SweepPartAsync(blade, cframeList)
	   end)

	   if success and sweptPart then
		   -- Visualize the sweep
		   sweptPart.Parent = workspace
		   sweptPart.Transparency = 0.5
		   sweptPart.Anchored = true
		   sweptPart.CanQuery = false
		
		   -- Subtract the sweep from the hit instance
		   local subtractSuccess, newParts = pcall( function()
			  r eturn GeometryService:SubtractAsync(hitInstance, {sweptPart})
		   end)
		   if subtractSuccess and newParts then
			   for _, newPart in pairs(newParts) do
				   newPart.Parent = hitInstance.Parent
				   newPart.Anchored = true
			   end
			   hitInstance:Destroy()
		   end
	   end
   end)
   ```

1. Create a `RemoteEvent` in `ReplicatedStorage` named **DrawCurveEvent**.

</AccordionDetails>
</BaseAccordion>

### FragmentAsync()

<BetaAlert betaName="Solid Modeling On Meshes" leadIn="This API is only available by enabling the beta feature through " leadOut="." components={props.components} />

The `Class.GeometryService:FragmentAsync()` and `Class.GeometryService:GenerateFragmentSites()` functions let you shatter a part into pieces with natural-looking shapes. `Class.GeometryService:FragmentAsync()` uses [voronoi](https://en.wikipedia.org/wiki/Voronoi_diagram) decomposition to divide a single part into multiple `Class.MeshPart` instances according to the pattern of points passed in, while `Class.GeometryService:GenerateFragmentSites()` is a helper function which generates points known as voronoi sites to pass into `Class.GeometryService:FragmentAsync()|FragmentAsync()`.

To demonstrate how these functions work together, the following code sample generates voronoi sites to fragment a block part:

```lua highlight="6"
local GeometryService = game:GetService("GeometryService")

local inputPart = Instance.new("Part")
inputPart.Position = Vector3.new(0, 0.7, 20)

local sites = GeometryService:GenerateFragmentSites(inputPart)

local success, fragments = pcall( function()
	return GeometryService:FragmentAsync(inputPart, sites)
end)
if success and fragments then
  for _, item in fragments do
		local instance = item.Instance
		instance.Parent = workspace
	end
end
```

<img src="../assets/modeling/solid-modeling/Fragment-Simple-Block.png" alt="A block smashed into pieces."  width="300" />

<Alert severity="warning">
Keep in mind that the number of small pieces created can be massive. If you give users the freedom to fragment objects, you need a system in place for cleaning up the pieces, such as removing them after some amount of time using the `Class.Debris` service.

In addition, you can create your own lists of sites manually rather than using `Class.GeometryService:GenerateFragmentSites()|GenerateFragmentSites()`, but it can take 50+ lines of Lua to generate well-behaved points.
</Alert>

**Examples**

<BaseAccordion>
<AccordionSummary>
<Typography variant="subtitle2">Localized fragment at a given position</Typography>
</AccordionSummary>
<AccordionDetails>

<img src="../assets/modeling/solid-modeling/Fragment-Localized.png" alt="A block with the corner fragmented in pieces."  width="500" />

The following script fragments an area of a part, given by a position and radius. The position might commonly come from a physical collision or a raycast from a player.

```lua highlight="6"
local GeometryService = game:GetService("GeometryService")

function fragmentAtPosition(player, part, contactPoint, radius)
	local allSites = GeometryService:GenerateFragmentSites(part, {Origin = contactPoint, Radius = radius})

	local success, fragments = pcall( function()
		return GeometryService:FragmentAsync(part, allSites)
	end)
	if not success then
		warn("Failed to Fracture:"..tostring(fragments))
		return
	end

	local decals = {}
	for _,child in pairs(part:GetChildren()) do
		if child:IsA("Decal") or child:IsA("SurfaceAppearance") then
			table.insert(decals,child)
		end
	end
	
	for i = 1, #fragments do
		local fragment = fragments[i].Instance
		if fragment == nil then
			continue
		end
		
		for _,d in pairs(decals) do
			local d2 = d:Clone()
			d2.Parent = fragment
		end

		fragment.Anchored = false
		fragment.Parent = part.Parent
		fragment:SetNetworkOwner(player)
	end

	if #fragments ~= 0  then
		part:Destroy()
	end
	
	return fragments
end
```

</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant="subtitle2">Fragment within an area defined by another part</Typography>
</AccordionSummary>
<AccordionDetails>
The following script breaks fragments off the first part within a shape defined by using a second part as a stencil. Only voronoi sites within the second part will result in separate pieces. All other sites will have their cells combined into a single part.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/modeling/solid-modeling/Fragment-Stencil-Before.png" alt="Stencil in the shape of the Roblox Studio logo" />
    <figcaption>Part (dark grey) and stencil part</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/solid-modeling/Fragment-Stencil-After.png" alt="Results of a fragment in the shape of a stencil" />
    <figcaption>Fragment script result</figcaption>
  </figure>
</GridContainer>

```lua highlight="6"
local GeometryService = game:GetService("GeometryService")

function fragmentWithinStencil(player, part)
	local overlapParams = OverlapParams.new()
	overlapParams.FilterType = Enum.RaycastFilterType.Include
	overlapParams.FilterDescendantsInstances = {workspace.Stencil}
	overlapParams.RespectCanCollide = false
	
	local sensor = Instance.new("Part")
	sensor.Size = Vector3.new(0.01, 0.01, 0.01)
	
	local allSites = GeometryService:GenerateFragmentSites(part, {SiteSpacing = 0.9})

	local fragmentSites = {}
	local mainPartSites = {}
	for _, site in ipairs(allSites) do
		sensor.CFrame = CFrame.new(site)
		local partsFound = workspace:GetPartsInPart(sensor, overlapParams)

		if #partsFound > 0 then
			table.insert(fragmentSites, site)
		else
			table.insert(mainPartSites, site)
		end
	end

	local sortedSites = fragmentSites
	table.insert(sortedSites, mainPartSites)

	workspace.Stencil:Destroy()

	local success, fragments = pcall( function()
		return GeometryService:FragmentAsync(part, sortedSites, {SplitApart = false})
	end)
	if not success then
		warn("Failed to Fracture:"..tostring(fragments))
		return
	end
	
	local decals = {}
	for _,child in pairs(part:GetChildren()) do
		if child:IsA("Decal") or child:IsA("SurfaceAppearance") then
			table.insert(decals,child)
		end
	end
	
	for i = 1, #fragments do
		local fragment = fragments[i].Instance
		if fragment == nil then
			continue
		end
		
		for _,d in pairs(decals) do
			local d2 = d:Clone()
			d2.Parent = fragment
		end

		fragment.Anchored = false
		fragment.Parent = part.Parent
		fragment:SetNetworkOwner(player)
	end

	if #fragments ~= 0  then
		part:Destroy()
	end
	
	return fragments
end
```

</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant="subtitle2">Fragment multiple parts and hide the original part boundaries</Typography>
</AccordionSummary>
<AccordionDetails>
The following script is a much more niche use case, but it demonstrates the power of the index data which is returned from `Class.GeometryService:FragmentAsync()`.

For example, many places contain buildings formed from multiple non-unioned block parts. If a grenade, cannonball, or sledgehammer were to damage it, you would want all of the wall parts to be fragmented. This script fragments all of the nearby parts, then unions the fragments of different parts together to completely hide the seams.

This involves multiple `Async` operations, so it may not be suitable for use in-experience as an instant response to user input, such as a sledgehammer tool.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/modeling/solid-modeling/Fragment-Multiple-Before.png" alt="A row of blocks" />
    <figcaption>A row of blocks</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/solid-modeling/Fragment-Multiple-After.png" alt="A row of blocks fragmented" />
    <figcaption>Each piece may originate from multiple input parts</figcaption>
  </figure>
</GridContainer>

```lua highlight="6"
local GeometryService = game:GetService("GeometryService")

function fragmentCrossPart(player, part, contactPoint, radius)
	local allSites = GeometryService:GenerateFragmentSites(part, {Origin = contactPoint, Radius = radius})

	local fragmentsSorted = {}
	for i = 1, #allSites do
		fragmentsSorted[i] = {}
	end
	
	local partsFound = workspace:GetPartBoundsInRadius(contactPoint, radius)
	for i, part in ipairs(partsFound) do

		local success, fragments = pcall( function()
			return GeometryService:FragmentAsync(part, allSites)
		end)
		if not success then
			warn("Failed to Fracture:"..tostring(fragments))
			return
		end
		
		for i = 1, #fragments do
			local fragment = fragments[i].Instance
			local siteIndex = fragments[i].Index
			if fragment == nil or siteIndex == nil then
				continue
			end
			
			table.insert(fragmentsSorted[siteIndex], fragment)
		end
	end
	
	for i = 1, #fragmentsSorted do
		local fragmentList = fragmentsSorted[i]
		if #fragmentList == 0 then
			continue
		end
		
		if #fragmentList == 1 then
			local fragment = fragmentList[1]
			fragment.Anchored = false
			fragment.Parent = part.Parent
			fragment:SetNetworkOwner(player)
			continue
		end
		
		if i == #allSites then
			for j = 1, #fragmentList do
				local fragment = fragmentList[j]
				fragment.Parent = part.Parent
				fragment.Anchored = true
			end
			continue
		end
		
		local mainPart = fragmentList[1]
		local otherParts = {}
		for j = 2, #fragmentList do
			table.insert(otherParts, fragmentList[j])
		end
		
		local success, results = pcall( function()
			return GeometryService:UnionAsync(mainPart, otherParts)
		end)
		if not success then
			warn("Failed to Union:"..tostring(results))
			return
		end
		
		for j = 1, #results do
			results[j].Parent = part.Parent
			results[j].Anchored = false
			results[j]:SetNetworkOwner(player)
		end
	end
	
	for i, part in ipairs(partsFound) do
		part:Destroy()
	end
end
```

</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant="subtitle2">Customizable Luau GenerateFragmentSites()</Typography>
</AccordionSummary>
<AccordionDetails>
The following script is a nearly identical Luau replacement for `Class.GeometryService:GenerateFragmentSites()`. If you want similar behavior to `Class.GeometryService:GenerateFragmentSites()` but want to make slight changes, you can use this as a starting point.

It uses a jittered grid of points, and guarantees that the fragmented area is well behaved, unlike fully random points.

```lua highlight="6"
local function generateFragmentSites(part: BasePart, siteSpacing: number?, origin: Vector3?, radius: number?): {Vector3}
	local RANDOMNESS_MULTIPLIER = 1.0 -- Use this to adjust the amount of jitter
	
	if (origin and not radius) or (radius and not origin) then
		warn("Either both origin and radius should be provided, or neither.")
		return {}
	end
	
	local isLocalized = (radius ~= nil) -- isLocalized means don't fracture the whole part, just a section.
	local partCFrame = part.ExtentsCFrame
	local gridDimensions: Vector3
	local localGridCenter: Vector3
	
	local spacing
	if siteSpacing then
		spacing = siteSpacing
	elseif isLocalized then
		spacing = radius * 0.5
	else
		local partSize = part.Size
		local volume = partSize.X * partSize.Y * partSize.Z
		spacing = (volume / 5) ^ (1/3)
	end
	
	if isLocalized then
		local localOrigin = partCFrame:PointToObjectSpace(origin)
		local gridSize = math.ceil(radius * 2 / spacing) + 3
		gridDimensions = Vector3.new(gridSize, gridSize, gridSize)
		localGridCenter = localOrigin
	else
		local partSize: Vector3 = part.Size
		local xCount = math.ceil(partSize.X / spacing)
		local yCount = math.ceil(partSize.Y / spacing)
		local zCount = math.ceil(partSize.Z / spacing)

		gridDimensions = Vector3.new(xCount, yCount, zCount)
		localGridCenter = Vector3.zero
	end
	
	local totalGridSize = gridDimensions * spacing
	local halfCell = Vector3.new(spacing, spacing, spacing) * 0.5
	local localStartOffset = localGridCenter - (totalGridSize * 0.5) + halfCell
	
	local innerJitter = spacing * 0.5 * RANDOMNESS_MULTIPLIER
	local outerJitter = math.min(spacing * 0.5 * 0.866, innerJitter)

	local sitesFlatList = {}

	for x = 0, gridDimensions.X - 1 do
		for y = 0, gridDimensions.Y - 1 do
			for z = 0, gridDimensions.Z - 1 do

				local isOuterShell =
					x == 0 or x == gridDimensions.X - 1 or
					y == 0 or y == gridDimensions.Y - 1 or
					z == 0 or z == gridDimensions.Z - 1
				local jitterAmount = if (isOuterShell and isLocalized) then outerJitter else innerJitter
				
				local jitterOffset = Vector3.new(
					(math.random() - 0.5) * 2 * jitterAmount,
					(math.random() - 0.5) * 2 * jitterAmount,
					(math.random() - 0.5) * 2 * jitterAmount
				)

				local offsetInGrid = Vector3.new(x, y, z) * spacing

				table.insert(sitesFlatList, localStartOffset + offsetInGrid + jitterOffset)
			end
		end
	end

	local sitesListFinal = {}
	
	if isLocalized then
		local mainPartSites = {}

		for _, localSite in ipairs(sitesFlatList) do
			local worldSite = partCFrame * localSite
			local distance = (worldSite - origin).Magnitude
			if distance < radius then
				table.insert(sitesListFinal, worldSite)
			else
				table.insert(mainPartSites, worldSite)
			end
		end

		table.insert(sitesListFinal, mainPartSites)
	else
		for _, localSite in ipairs(sitesFlatList) do
			local worldSite = partCFrame * localSite
			table.insert(sitesListFinal, worldSite)
		end
	end
	
	return sitesListFinal
end
```

</AccordionDetails>
</BaseAccordion>

### Preserve constraints

If an input part has constraints or attachments that you want to preserve, you can transfer them over to the resulting parts. It can be tedious to figure out which output part a constraint should be attatched to, so it's recommended to use `Class.GeometryService:CalculateConstraintsToPreserve()` to generate a table of recommendations which you can loop over and apply.

To demonstrate, the following code sample performs a subtract operation, loops through the resulting parts to reparent and reposition the resulting parts, then calculates a table of constraints and attachments to either preserve or drop before destroying all original parts.

```lua highlight="6"
local GeometryService = game:GetService("GeometryService")

local mainPart = workspace.PurpleBlock
local otherParts = { workspace.BlueBlock }

local options = {
	CollisionFidelity = Enum.CollisionFidelity.Default,
	RenderFidelity = Enum.RenderFidelity.Automatic,
	SplitApart = true,
}

local constraintOptions = {
	tolerance = 0.1,
	weldConstraintPreserve = Enum.WeldConstraintPreserve.All,
	dropAttachmentsWithoutConstraints = false,
}

-- Perform subtract operation in pcall() since it's asynchronous
local success, newParts = pcall(function()
	return GeometryService:SubtractAsync(mainPart, otherParts, options)
end)

if success and newParts then
	-- Loop through resulting parts to reparent/reposition
	for _, newPart in pairs(newParts) do
		newPart.Parent = mainPart.Parent
		newPart.CFrame = mainPart.CFrame
		newPart.Anchored = mainPart.Anchored
	end

	-- Calculate constraints/attachments to either preserve or drop
	local recommendedTable = GeometryService:CalculateConstraintsToPreserve(mainPart, newParts, constraintOptions)

	-- Preserve constraints/attachments based on recommended table
	for _, item in pairs(recommendedTable) do
		if item.Attachment then
			item.Attachment.Parent = item.AttachmentParent
			if item.Constraint then
				item.Constraint.Parent = item.ConstraintParent
			end
		elseif item.NoCollisionConstraint then
			local newNoCollision = Instance.new("NoCollisionConstraint")
			newNoCollision.Part0 = item.NoCollisionPart0
			newNoCollision.Part1 = item.NoCollisionPart1
			newNoCollision.Parent = item.NoCollisionParent
		elseif item.WeldConstraint then
			local newWeldConstraint = Instance.new("WeldConstraint")
			newWeldConstraint.Part0 = item.WeldConstraintPart0
			newWeldConstraint.Part1 = item.WeldConstraintPart1
			newWeldConstraint.Parent = item.WeldConstraintParent
		end
	end

	-- Destroy original parts
	mainPart.Parent = nil
	mainPart:Destroy()
	for _, otherPart in pairs(otherParts) do
		otherPart.Parent = nil
		otherPart:Destroy()
	end
end
```

### Behavior details

<Alert severity="info">
In this section, the term "main part" refers to either the first part you select while solid modeling in Studio, or the first argument while solid modeling in-experience.
</Alert>

- The original parts remain intact following a successful operation, and the returned parts have no set `Class.Instance.Parent|Parent`. In most cases, it's recommended to parent the returned part(s) to the same place as the main part, then `Class.Instance.Destroy|Destroy()` the original parts.

- If the main part is moving during the calculation of the operation, you can set the resulting parts to the updated `Datatype.CFrame` of the main part, since the returned parts are in the same coordinate space as the main part.

- There are functions to swap out the mesh data of an instance, making it easier to utilize the geometry of the operation while maintaining properties, attributes, tags, and children of the main part, such as `Class.Attachment|Attachments`, `Class.Constraint|Constraints`, `Class.ParticleEmitter|ParticleEmitters`, light objects, and decals. This approach also circumvents the potential "flicker" of completely replacing the original `Class.PartOperation` with another.

  - If using this method with a `Class.PartOperation` as the main part and none of the other parts are `Class.MeshPart|MeshParts`, you can substitute in the geometry of another `Class.PartOperation` via `Class.PartOperation:SubstituteGeometry()|SubstituteGeometry()`.
  - If the main part is a `Class.MeshPart`, you can use `Class.MeshPart:ApplyMesh()`.

- It's possible to call these functions on the client, but with some limitations. First, it must be done with objects **created** on the client. Secondly, there is no replication available from client to the server.

- The following properties from the main part are applied to the
resulting `Class.PartOperation|PartOperations` or `Class.MeshPart|MeshParts`:

  - Appearance: `Class.BasePart.Color|Color`, `Class.BasePart.Material`, `Class.BasePart.MaterialVariant`, `Class.BasePart.Reflectance`,  `Class.BasePart.Transparency`
  - Collision: `Class.BasePart.AudioCanCollide`, `Class.BasePart.CanCollide`
  - Part: `Class.BasePart.Anchored`, `Class.BasePart.CurrentPhysicalProperties`/`Class.BasePart.CustomPhysicalProperties`

## Solid modeling results considerations

### Colors and UVs

The colors of the resulting part(s) after solid modeling come from two places: the face colors and the part's `Class.BasePart.Color|Color`.

- If the result is a `Class.PartOperation`, it will have the `Class.BasePart.Color|Color` of the first part you selected in Studio, but Studio uses the face colors by default to keep each face the same color as it was before the operation. You can enable its `Class.PartOperation.UsePartColor|UsePartColor` property in Studio to override this behavior and make the entire result a single color.
- If the result is a `Class.MeshPart`, its `Class.BasePart.Color|Color` will be white, and the face colors will always show through. You can adjust the tint of the resulting part(s) by changing their `Class.BasePart.Color|Color`, but it will be mixed (multiplied) with the face colors. This tints the result rather than overriding the face colors completely. If you want complete control over the color of the output, it's best to make the inputs white first.

UVs are also handled differently depending of the type of result:

- `Class.PartOperation|PartOperations` always have boxmapped UVs, which means each face will have the material/texture/decal from one direction (one of -x, +x, -y, +y, -z, +z) applied to it. This can stretch textures.
- `Class.MeshPart|MeshParts` are not boxmapped. The UVs of the main part's mesh are used. Since Roblox does not currently have multi-material support, the UVs of faces originating from the other parts are given UVs of (0, 0). For best results, ensure pixel (0, 0) of your texture has a reasonable color.

### Smoothing angle

A solid modeled part's `Class.PartOperation.SmoothingAngle|SmoothingAngle` property smooths angles between adjacent surfaces of the same color. A higher value produces a smoother appearance while a lower value produces a rougher appearance with more sharp edges.

While a value between 30 and 70 degrees usually produces a good result, values between 90 and 180 are not recommended as they may cause a "shadowing" effect on unions and intersections with sharp edges.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/modeling/solid-modeling/SmoothingAngle-0.png" alt="Solid modeled part with SmoothingAngle of 0" />
    <figcaption>`Class.PartOperation.SmoothingAngle|SmoothingAngle` = 0</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/solid-modeling/SmoothingAngle-45.png" alt="Solid modeled part with SmoothingAngle of 45" />
    <figcaption>`Class.PartOperation.SmoothingAngle|SmoothingAngle` = 45</figcaption>
  </figure>
</GridContainer>

<Alert severity="warning">
You can only adjust a solid modeled part's `Class.PartOperation.SmoothingAngle|SmoothingAngle` property in Studio, and it isn't currently possible to adjust the smoothing angle of a `Class.MeshPart`.
</Alert>

### Part simplification

If a solid modeling operation would result in any parts with more than 20,000 triangles, they will be simplified to 20,000. If that cannot be done, usually in a case with thousands of non-overlapping components, the operation results in an error.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/modeling/solid-modeling/Simplification-Before.png" alt="A MeshPart in good condition" />
    <figcaption>Before simplication</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/solid-modeling/Simplification-After.png" alt="A MeshPart with obvious reduction in mesh quality" />
    <figcaption>After simplication</figcaption>
  </figure>
</GridContainer>
