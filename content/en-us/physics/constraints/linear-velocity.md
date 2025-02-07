---
title: LinearVelocity
description: The LinearVelocity constraint applies force on an assembly to maintain a constant velocity along a 3D vector, line, or 2D plane.
---

<Alert severity="info">
For an overview on creating, visualizing, and simulating mover constraints, including `Class.LinearVelocity`, see [Mover constraints](../../physics/mover-constraints.md). Also see [Roblox&nbsp;units](../../physics/units.md) to understand how Roblox units compare to metric units.
</Alert>

A `Class.LinearVelocity` constraint applies force on an assembly to maintain a constant velocity. It can be set to apply force along a `Datatype.Vector3`, line, or 2D&nbsp;plane.

<video controls src="../../assets/physics/constraints/LinearVelocity-Demo.mp4" width="90%" alt="Demo video of LinearVelocity constraint"></video>

<Alert severity="warning">
The `Class.LinearVelocity` constraint applies a force that attempts to maintain a **constant** linear velocity. If you want to control the amount of force applied, use a [VectorForce](../../physics/constraints/vector-force.md) constraint. Alternatively, if you only need **initial** linear velocity, set the `Class.BasePart.AssemblyLinearVelocity|AssemblyLinearVelocity` property directly on the assembly.
</Alert>

## Relativity

Application of velocity can be controlled through the constraint's `Class.LinearVelocity.RelativeTo|RelativeTo` property. If set to `Enum.ActuatorRelativeTo|World`, force will be applied in world coordinates, independent of the parent or attachment orientations. If set to `Enum.ActuatorRelativeTo|Attachment0` or `Enum.ActuatorRelativeTo|Attachment1`, force will be applied relative to `Class.Constraint.Attachment0|Attachment0` or `Class.Constraint.Attachment1|Attachment1` respectively.

<GridContainer numColumns="2">
  <figure>
    <video controls src="../../assets/physics/constraints/LinearVelocity-RelativeTo-World.mp4" alt="Video showing relative behavior set to world space"></video>
    <figcaption>RelativeTo = **World**</figcaption>
  </figure>
  <figure>
    <video controls src="../../assets/physics/constraints/LinearVelocity-RelativeTo-Attachment0.mp4" alt="Video showing relative behavior set to Attachment0"></video>
    <figcaption>RelativeTo = **Attachment0**</figcaption>
  </figure>
</GridContainer>
