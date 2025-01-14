---
title: LineForce
description: The LineForce constraint applies force along the theoretical line connecting its two attachments.
---

<Alert severity="info">
For an overview on creating, visualizing, and simulating mover constraints, including `Class.LineForce`, see [Mover constraints](../../physics/mover-constraints.md). Also see [Roblox&nbsp;units](../../physics/units.md) to understand how Roblox units compare to metric units.
</Alert>

The `Class.LineForce` constraint applies force along the theoretical line connecting its two `Class.Attachment|Attachments`. As the end points (attachments) move, the direction of force will change accordingly.

<video controls src="../../assets/physics/constraints/LineForce-Demo.mp4" width="90%" alt="Demo video of LineForce constraint"></video>

## Force location

By default, force is applied to either parent at its attachment location. If desired, force can be focused at each parent's center of mass by toggling on `Class.LineForce.ApplyAtCenterOfMass|ApplyAtCenterOfMass`.

<GridContainer numColumns="2">
  <figure>
    <video controls src="../../assets/physics/constraints/LineForce-ApplyAtCenterOfMass-False.mp4" alt="Video showing ApplyAtCenterOfMass set to false"></video>
    <figcaption>ApplyAtCenterOfMass = **false**</figcaption>
  </figure>
  <figure>
    <video controls src="../../assets/physics/constraints/LineForce-ApplyAtCenterOfMass-True.mp4" alt="Video showing ApplyAtCenterOfMass set to true"></video>
    <figcaption>ApplyAtCenterOfMass = **true**</figcaption>
  </figure>
</GridContainer>

## Inverse square law

When `Class.LineForce.InverseSquareLaw|InverseSquareLaw` is true, the force magnitude is multiplied by the inverse square of the distance, meaning the force will increase exponentially as the two attachments get closer together, like magnets. When using this setting, it's recommended that you set a `Class.LineForce.MaxForce|MaxForce` threshold to prevent infinite force if the attachments align precisely.

<GridContainer numColumns="2">
  <figure>
    <video controls src="../../assets/physics/constraints/LineForce-InverseSquareLaw-False.mp4" alt="Video showing InverseSquareLaw set to false"></video>
    <figcaption>InverseSquareLaw = **false**</figcaption>
  </figure>
  <figure>
    <video controls src="../../assets/physics/constraints/LineForce-InverseSquareLaw-True.mp4" alt="Video showing InverseSquareLaw set to true"></video>
    <figcaption>InverseSquareLaw = **true**</figcaption>
  </figure>
</GridContainer>

## Reactionary force

By default, the constraint only applies force to `Class.Constraint.Attachment0|Attachment0`, while `Class.Constraint.Attachment1|Attachment1` remains unaffected. However, force can be applied to both attachments in **equal and opposite directions** by enabling `Class.LineForce.ReactionForceEnabled|ReactionForceEnabled`.

<GridContainer numColumns="2">
  <figure>
    <video controls src="../../assets/physics/constraints/LineForce-ReactionForceEnabled-False.mp4" alt="Video showing ReactionForceEnabled set to false"></video>
    <figcaption>ReactionForceEnabled = **false**</figcaption>
  </figure>
  <figure>
    <video controls src="../../assets/physics/constraints/LineForce-ReactionForceEnabled-True.mp4" alt="Video showing ReactionForceEnabled set to true"></video>
    <figcaption>ReactionForceEnabled = **true**</figcaption>
  </figure>
</GridContainer>
