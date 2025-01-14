---
title: AngularVelocity
description: The AngularVelocity constraint applies torque on an assembly to maintain a constant angular velocity.
---

<Alert severity="info">
For an overview on creating, visualizing, and simulating mover constraints, including `Class.AngularVelocity`, see [Mover constraints](../../physics/mover-constraints.md). Also see [Roblox&nbsp;units](../../physics/units.md) to understand how Roblox units compare to metric units.
</Alert>

An `Class.AngularVelocity` constraint applies torque on an assembly to maintain a constant angular velocity.

<video controls src="../../assets/physics/constraints/AngularVelocity-Demo.mp4" width="90%" alt="Demo video of AngularVelocity constraint"></video>

<Alert severity="warning">
The `Class.AngularVelocity` constraint applies torque that attempts to maintain a **constant** angular velocity. If you want to control the amount of torque applied, use a [Torque](../../physics/constraints/torque.md) constraint. Alternatively, if you only need **initial** angular velocity, set the `Class.BasePart.AssemblyAngularVelocity|AssemblyAngularVelocity` method directly on the assembly.
</Alert>

## Relativity

Application of velocity can be controlled through the constraint's `Class.AngularVelocity.RelativeTo|RelativeTo` property. If set to `Enum.ActuatorRelativeTo|World`, the angular velocity vector is used as is. If set to `Enum.ActuatorRelativeTo|Attachment1` and the constraint's `Class.Constraint.Attachment1|Attachment1` property is set to another attachment, the angular velocity will be affected by that of the other attachment as seen by how the upper-left red part's velocity affects the attached blue part's velocity.

<GridContainer numColumns="2">
  <figure>
    <video controls src="../../assets/physics/constraints/AngularVelocity-RelativeTo-World.mp4" alt="Video showing relative behavior set to world space"></video>
    <figcaption>RelativeTo = **World**</figcaption>
  </figure>
  <figure>
    <video controls src="../../assets/physics/constraints/AngularVelocity-RelativeTo-Attachment1.mp4" alt="Video showing relative behavior set to Attachment1"></video>
    <figcaption>RelativeTo = **Attachment1**</figcaption>
  </figure>
</GridContainer>

<Alert severity="info">
Setting `Class.AngularVelocity.RelativeTo|RelativeTo` to `Enum.ActuatorRelativeTo|Attachment1` also exposes the `Class.AngularVelocity.ReactionTorqueEnabled|ReactionTorqueEnabled` property.
</Alert>
