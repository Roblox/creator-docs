---
title: AlignPosition
description: The AlignPosition constraint applies force to move two attachments together, or to move one attachment to a goal position.
---

<Alert severity="info">
For an overview on creating, visualizing, and simulating mover constraints, including `Class.AlignPosition`, see [Mover constraints](../../physics/mover-constraints.md). Also see [Roblox&nbsp;units](../../physics/units.md) to understand how Roblox units compare to metric units.
</Alert>

An `Class.AlignPosition` constraint applies force to move two attachments together, or to move one attachment to a goal position. As indicated by the name, it only affects the **position** of the attachments, not their orientation (to align attachments by **orientation**, see [AlignOrientation](../../physics/constraints/align-orientation.md)).

<video controls src="../../assets/physics/constraints/AlignPosition-Demo.mp4" width="90%" alt="Demo video of AlignPosition constraint"></video>

<Alert severity="warning">
By default, the constraint only applies force to `Class.Constraint.Attachment0|Attachment0`, although this behavior can be controlled through `Class.AlignPosition.ReactionForceEnabled|ReactionForceEnabled`.
</Alert>

## Force location

By default, force is applied to the parent of `Class.Constraint.Attachment0|Attachment0` at that attachment's location, meaning that if the parent's center of mass is not aligned with the direction of the force, torque will be applied as well as force. Alternatively, force can be applied to the parents' center of mass by toggling on `Class.AlignPosition.ApplyAtCenterOfMass|ApplyAtCenterOfMass`.

<GridContainer numColumns="2">
  <figure>
    <video controls src="../../assets/physics/constraints/AlignPosition-ApplyAtCenterOfMass-False.mp4" alt="Video showing ApplyAtCenterOfMass set to false"></video>
    <figcaption>ApplyAtCenterOfMass = **false**</figcaption>
  </figure>
  <figure>
    <video controls src="../../assets/physics/constraints/AlignPosition-ApplyAtCenterOfMass-True.mp4" alt="Video showing ApplyAtCenterOfMass set to true"></video>
    <figcaption>ApplyAtCenterOfMass = **true**</figcaption>
  </figure>
</GridContainer>

## Reactionary force

By default, the constraint only applies force to `Class.Constraint.Attachment0|Attachment0` while `Class.Constraint.Attachment1|Attachment1` remains unaffected. If desired, force can be applied to both attachments in **equal and opposite directions** by enabling `Class.AlignPosition.ReactionForceEnabled|ReactionForceEnabled`.

<GridContainer numColumns="2">
  <figure>
    <video controls src="../../assets/physics/constraints/AlignPosition-ReactionForceEnabled-False.mp4" alt="Video showing ReactionForceEnabled set to false"></video>
    <figcaption>ReactionForceEnabled = **false**</figcaption>
  </figure>
  <figure>
    <video controls src="../../assets/physics/constraints/AlignPosition-ReactionForceEnabled-True.mp4" alt="Video showing ReactionForceEnabled set to true"></video>
    <figcaption>ReactionForceEnabled = **true**</figcaption>
  </figure>
</GridContainer>

## Force magnitude

You can configure the `Class.AlignPosition` constraint to apply the maximum force that constraints allow through the `Class.AlignPosition.RigidityEnabled|RigidityEnabled` property. When true, the physics solver reacts as quickly as possible to complete the alignment. When false, the force is determined by `Class.AlignPosition.MaxForce|MaxForce`, `Class.AlignPosition.MaxVelocity|MaxVelocity`, and `Class.AlignPosition.Responsiveness|Responsiveness`.

## Attachment mode

The `Class.AlignPosition.Mode|Mode` property specifies whether the constraint uses **one** or **two** attachments in calculating its goal. By default, this is `Enum.PositionAlignmentMode|TwoAttachment`, meaning that the constraint disregards `Class.AlignPosition.Position|Position` and attempts to move `Class.Constraint.Attachment0|Attachment0` to the position of `Class.Constraint.Attachment1|Attachment1`. If set to `Enum.PositionAlignmentMode|OneAttachment`, the constraint disregards `Class.Constraint.Attachment1|Attachment1` and attempts to move `Class.Constraint.Attachment0|Attachment0` to `Class.AlignPosition.Position|Position`.
