---
title: BallSocket
description: BallSocketConstraint forces its two attachments into the same position and allows them to freely rotate about all three axes, with optional limits to restrict both tilt and twist.
---

<Alert severity="info">
For an overview on creating, visualizing, and simulating mechanical constraints, including `Class.BallSocketConstraint`, see [Mechanical constraints](../../physics/mechanical-constraints.md). Also see [Roblox&nbsp;units](../../physics/units.md) to understand how Roblox units compare to metric units.
</Alert>

A `Class.BallSocketConstraint` forces its two attachments into the same position and allows them to freely rotate about all three axes. However, you can enable limits to restrict both tilt and twist.

<video controls src="../../assets/physics/constraints/BallInSocket-Demo.mp4" width="90%" alt="Demo video of BallSocketConstraint"></video>

## Limits

You can set limits to restrict both **tilt** and **twist** of a ball socket, similar to how a human's head can tilt and turn within a limited axial range. Enabling the `Class.BallSocketConstraint.LimitsEnabled|LimitsEnabled` property exposes the `Class.BallSocketConstraint.UpperAngle|UpperAngle` value to restrict **tilt** within a cone; it also exposes the `Class.BallSocketConstraint.TwistLimitsEnabled|TwistLimitsEnabled` property which, when enabled, lets you restrict **twist** rotation through the `Class.BallSocketConstraint.TwistLowerAngle|TwistLowerAngle` and `Class.BallSocketConstraint.TwistUpperAngle|TwistUpperAngle` limits.

<GridContainer numColumns="2">
  <figure>
    <video controls src="../../assets/physics/constraints/BallInSocket-Limits-Tilt.mp4" alt="Video showing limits when UpperAngle is set to 30 degrees"></video>
    <figcaption>UpperAngle = **30**</figcaption>
  </figure>
  <figure>
    <video controls src="../../assets/physics/constraints/BallInSocket-Limits-Twist.mp4" alt="Video showing limits when TwistLimitsEnabled is set to true"></video>
    <figcaption>TwistLimitsEnabled = **true**</figcaption>
  </figure>
</GridContainer>

Enabling `Class.BallSocketConstraint.LimitsEnabled|LimitsEnabled` also exposes the `Class.BallSocketConstraint.Restitution|Restitution` value which defines the elasticity of the attachments at their tilt and/or twist limits.

<Alert severity="info">
When `Class.BallSocketConstraint.LimitsEnabled|LimitsEnabled` is enabled, orientation of a ball socket's attachments affects how it rotates. To ensure rotation occurs around the desired axis, each attachment's `Class.Attachment.Axis|Axis`, visualized by the yellow arrow, should point in the same direction.
</Alert>
