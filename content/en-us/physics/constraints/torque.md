---
title: Torque
description: The Torque constraint applies constant torque on an assembly from its center of mass.
---

<Alert severity="info">
For an overview on creating, visualizing, and simulating mover constraints, including `Class.Torque`, see [mover constraints](../../physics/mover-constraints.md). Also see [Roblox&nbsp;units](../../physics/units.md) to understand how Roblox units compare to metric units.
</Alert>

A `Class.Torque` constraint applies constant torque on an assembly from its center of mass.

<video controls src="../../assets/physics/constraints/Torque-Demo.mp4" width="90%" alt="Demo video of Torque constraint"></video>

<Alert severity="warning">
Because the `Class.Torque` constraint applies **constant** torque and angular acceleration, very high speeds may result if no other forces are involved. If you want to maintain a more steady velocity over time, use an [AngularVelocity](../../physics/constraints/angular-velocity.md) constraint. Alternatively, if you only need **initial** velocity, set the `Class.BasePart.AssemblyAngularVelocity|AssemblyAngularVelocity` property directly on the assembly.
</Alert>

## Relativity

By default, torque is applied relative to `Class.Constraint.Attachment0|Attachment0`. If the parent assembly rotates, the torque will change direction to match the adjusted orientation of the attachment.

If `Class.Torque.RelativeTo|RelativeTo` is set to **World**, torque will be applied in world coordinates, independent of the parent or attachment orientations.

If `Class.Torque.RelativeTo|RelativeTo` is set to **Attachment1**, torque will be applied relative to `Class.Constraint.Attachment1|Attachment1` and, if the attachment rotates, change to match its orientation.

<GridContainer numColumns="2">
  <figure>
    <video controls src="../../assets/physics/constraints/Torque-RelativeTo-Attachment0.mp4" alt="Video showing RelativeTo set to Attachment0"></video>
    <figcaption>RelativeTo = **Attachment0**</figcaption>
  </figure>
  <figure>
    <video controls src="../../assets/physics/constraints/Torque-RelativeTo-World.mp4" alt="Video showing RelativeTo set to World"></video>
    <figcaption>RelativeTo = **World**</figcaption>
  </figure>
</GridContainer>
