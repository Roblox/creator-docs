---
title: AlignOrientation
description: The AlignOrientation constraint applies torque to align two attachments, or to align one attachment with a goal orientation.
---

<Alert severity="info">
For an overview on creating, visualizing, and simulating mover constraints, including `Class.AlignOrientation`, see [Mover Constraints](../../physics/mover-constraints.md). Also see [Roblox&nbsp;Units](../../physics/units.md) to understand how Roblox units compare to metric units.
</Alert>

The `Class.AlignOrientation` constraint applies torque to align two attachments, or to align one attachment with a goal orientation. As indicated by the name, it only affects the **orientation** of the attachments, not their position (to align attachments **positionally**, see [AlignPosition](../../physics/constraints/align-position.md)).

<video controls src="../../assets/physics/constraints/AlignOrientation-Demo.mp4" width="90%" alt="Demo video of AlignOrientation constraint"></video>

<Alert severity="warning">
By default, the constraint only applies torque to `Class.Constraint.Attachment0|Attachment0`, although this behavior can be controlled through `Class.AlignOrientation.ReactionTorqueEnabled|ReactionTorqueEnabled`.
</Alert>

## Affected Axes

The axes affected by torque are controlled through the constraint's `Class.AlignOrientation.AlignType|AlignType` property. When set to `Enum.AlignType|PrimaryAxisParallel`, `Enum.AlignType|PrimaryAxisPerpendicular` or `Enum.AlignType|PrimaryAxisLookAt`, torque will only occur when the primary axes become misaligned. Otherwise, the constraint will apply torque about all 3 axes to achieve alignment.

<GridContainer numColumns="2">
  <figure>
    <video controls src="../../assets/physics/constraints/AlignOrientation-AlignType-AllAxes.mp4" alt="Video showing AlignType set to AllAxes"></video>
    <figcaption>AlignType = **AllAxes**</figcaption>
  </figure>
  <figure>
    <video controls src="../../assets/physics/constraints/AlignOrientation-AlignType-PrimaryAxisParallel.mp4" alt="Video showing AlignType set to PrimaryAxisParallel"></video>
    <figcaption>AlignType = **PrimaryAxisParallel**</figcaption>
  </figure>
</GridContainer>

## Reactionary Torque

By default, the constraint only applies torque to `Class.Constraint.Attachment0|Attachment0` while `Class.Constraint.Attachment1|Attachment1` remains unaffected. If desired, torque can be applied to both attachments in **equal and opposite directions** by enabling `Class.AlignOrientation.ReactionTorqueEnabled|ReactionTorqueEnabled`.

<GridContainer numColumns="2">
  <figure>
    <video controls src="../../assets/physics/constraints/AlignOrientation-ReactionTorqueEnabled-False.mp4" alt="Video showing ReactionTorqueEnabled set to false"></video>
    <figcaption>ReactionTorqueEnabled = **false**</figcaption>
  </figure>
  <figure>
    <video controls src="../../assets/physics/constraints/AlignOrientation-ReactionTorqueEnabled-True.mp4" alt="Video showing ReactionTorqueEnabled set to true"></video>
    <figcaption>ReactionTorqueEnabled = **true**</figcaption>
  </figure>
</GridContainer>

## Torque Magnitude

You can configure the `Class.AlignOrientation` constraint to apply the maximum torque that constraints allow through the `Class.AlignOrientation.RigidityEnabled|RigidityEnabled` property. When true, the physics solver reacts as quickly as possible to complete the alignment. When false, the torque is determined by `Class.AlignOrientation.MaxTorque|MaxTorque`, `Class.AlignOrientation.MaxAngularVelocity|MaxAngularVelocity`, and `Class.AlignOrientation.Responsiveness|Responsiveness`.

## Attachment Mode

The `Class.AlignOrientation.Mode|Mode` property specifies whether the constraint uses **one** or **two** attachments in calculating its goal. By default, this is **TwoAttachment**, meaning that the constraint attempts to match the orientation of `Class.Constraint.Attachment0|Attachment0` with the orientation of `Class.Constraint.Attachment1|Attachment1`, disregarding `Class.AlignOrientation.CFrame|CFrame`, `Class.AlignOrientation.PrimaryAxis|PrimaryAxis`, and `Class.AlignOrientation.SecondaryAxis|SecondaryAxis`.

If set to **OneAttachment**, the constraint disregards `Class.Constraint.Attachment1|Attachment1` and attempts to match the orientation of `Class.Constraint.Attachment0|Attachment0` with the orientation of `Class.AlignOrientation.CFrame|CFrame`, or match the attachment's `Class.Attachment.Axis|Axis` and `Class.Attachment.SecondaryAxis|SecondaryAxis` with the constraint's `Class.AlignOrientation.PrimaryAxis|PrimaryAxis` and `Class.AlignOrientation.SecondaryAxis|SecondaryAxis` properties respectively.
