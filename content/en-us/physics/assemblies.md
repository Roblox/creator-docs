---
title: Assemblies
description: Explains physical assemblies and how they behave in Roblox's rigid body physics engine.
---

An **assembly** is one or more [parts](../parts/index.md) welded by a rigid `Class.WeldConstraint|WeldConstraint` or connected through moveable joints, like `Class.Motor6D|Motor6Ds`. You can group an assembly of parts in a [Model](../parts/models.md) container to quickly organize the parts and related objects as a single asset.

<Grid container spacing={0}>
  <Grid item xs={6} lg={3}>
    <img src="../assets/physics/assemblies/Assembly-Example-Block.png" width="100%" />
    <figcaption>1&nbsp;assembly; 1&nbsp;part</figcaption>
  </Grid>
  <Grid item xs={6} lg={3}>
    <img src="../assets/physics/assemblies/Assembly-Example-Avatar.png" width="100%" />
    <figcaption>1&nbsp;assembly; 18&nbsp;parts</figcaption>
  </Grid>
  <Grid item xs={12} lg={6}>
    <img src="../assets/physics/assemblies/Assembly-Example-Ship.png" width="100%" />
    <figcaption>1&nbsp;assembly; 179&nbsp;parts</figcaption>
  </Grid>
</Grid>
<br />

From a physics perspective, an assembly is considered a single **rigid&nbsp;body**, meaning no force can push or pull the connected parts from each other, and they will move as a single unit. All forces applied to a specific `Class.BasePart` are applied to its assembly&nbsp;&mdash; for instance, `Class.BasePart:ApplyImpulse()` applies impulse to the assembly at `Class.BasePart.AssemblyCenterOfMass`.

<figcaption>&sup1; The joints that combine multiple parts into assemblies are only active in the `Class.Workspace` or another `Class.WorldModel` instance. If the parts are stored elsewhere, all of the welds/connections that combine parts into assemblies will be non-functional.</figcaption>

## Assembly Properties

The following `Class.BasePart` properties show data regarding its assembly. Their values will be the same for any part in the same assembly, so it doesn't matter which part you use.

<table>
<thead>
	<tr>
		<th>Property</th>
		<th>Description</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>`Class.BasePart.AssemblyLinearVelocity`</td>
		<td>The linear velocity vector of the part's assembly. Setting the velocity directly may lead to unrealistic motion, so usage of a `Class.VectorForce` or `Class.LinearVelocity` constraint is preferred, or `Class.BasePart:ApplyImpulse()` for an instantaneous change in linear velocity.</td>
	</tr>
	<tr>
		<td>`Class.BasePart.AssemblyAngularVelocity`</td>
		<td>The angular velocity vector of the part's assembly. Setting the velocity directly may lead to unrealistic motion, so usage of a `Class.Torque` or `Class.AngularVelocity` constraint is preferred, or `Class.BasePart:ApplyAngularImpulse()` for an instantaneous change in angular velocity.</td>
	</tr>
	<tr>
		<td>`Class.BasePart.AssemblyCenterOfMass`</td>
		<td>A read-only position calculated via the mass and position of all the parts in the assembly. A force applied to the center of mass will not cause angular acceleration, only linear.</td>
	</tr>
	<tr>
		<td>`Class.BasePart.AssemblyMass`</td>
		<td>The sum of the `Class.BasePart.Mass` of all parts in the assembly. If the assembly has an anchored part, the assembly's mass is considered infinite.</td>
	</tr>
	<tr>
		<td>`Class.BasePart.AssemblyRootPart`</td>
		<td>The part automatically chosen to represent the assembly's [root&nbsp;part](#assembly-root-part).</td>
	</tr>
</tbody>
</table>

## Assembly Root Part

Every assembly has a **root&nbsp;part** indicated by its `Class.BasePart.AssemblyRootPart|AssemblyRootPart` property. This is the part that doesn't move when `Class.Motor6D` transforms are updated, as well as the part used to keep consistent physics replication and network ownership.

You cannot explicitly set the root part, but the following factors affect probability from highest to lowest:

<br />
<Grid container spacing={0} alignItems="center">
	<Grid item xs={1}>
		<center><img src="../assets/misc/Arrow-Higher.png" width="40" /></center>
	</Grid>
	<Grid item xs={11}>
		<p>An `Class.BasePart.Anchored|Anchored` part will always be assigned as the root part.</p>
	</Grid>
	<Grid item xs={1}>
		<center><img src="../assets/misc/Arrow-High.png" width="40" /></center>
	</Grid>
	<Grid item xs={11}>
		<p>Parts with `Class.BasePart.Massless|Massless` set to **false** (default) take precedence.</p>
	</Grid>
	<Grid item xs={1}>
		<center><img src="../assets/misc/Arrow-Low.png" width="40" /></center>
	</Grid>
	<Grid item xs={11}>
		<p>Higher `Class.BasePart.RootPriority|RootPriority` values take precedence.</p>
	</Grid>
	<Grid item xs={1}>
		<center><img src="../assets/misc/Arrow-Lower.png" width="40" /></center>
	</Grid>
	<Grid item xs={11}>
		<p>Precedence based on the part's size, with multipliers for parts with specific names.</p>
	</Grid>
</Grid>

## Anchoring Behavior

When one of an assembly's parts is anchored, that part becomes the root part and all of the other parts become implicitly anchored with it. The following sequence illustrates this behavior.

1. Below, four parts are welded together with `Class.WeldConstraint|WeldConstraints` (green&nbsp;bars) to form a single assembly, as indicated by the matching colored outlines.&sup2;

   <figure>
     <img src="../assets/physics/assemblies/Assembly-Anchor-Diagram-1.png" width="720" />
     <figcaption>Four parts welded to become a single assembly</figcaption>
   </figure>

   <figcaption>&sup2; To enable this visualization, go to **Studio&nbsp;Settings**&nbsp;&rarr; **Physics** and enable **Are&nbsp;Assemblies&nbsp;Shown**.</figcaption>

2. If just **one** part in the assembly is anchored, the assembly will not change, other than the root part potentially changing (the&nbsp;anchored part always has the highest [priority](#assembly-root-part) for becoming the root&nbsp;part).

   <figure>
     <img src="../assets/physics/assemblies/Assembly-Anchor-Diagram-2.png" width="720" />
     <figcaption>Anchored part (left) becomes the new root part</figcaption>
   </figure>

3. If more than one part is anchored, the assembly will **split**. Below, both the left and top parts are anchored, so the original assembly splits into two assemblies as shown by the colored outlines. Also, the `Class.WeldConstraint` between the two assemblies deactivates, since you cannot have an active weld between two anchored assemblies.

   <figure>
     <img src="../assets/physics/assemblies/Assembly-Anchor-Diagram-3.png" width="720" />
     <figcaption>Two assemblies with anchored parts as their respective root parts</figcaption>
   </figure>

   <Alert severity="warning">
   If you want to anchor all parts in an assembly, you only need to anchor the assembly's root part. Anchoring all parts is actually less performant, as it creates more assemblies.
   </Alert>
