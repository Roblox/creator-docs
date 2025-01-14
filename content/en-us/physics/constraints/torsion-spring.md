---
title: TorsionSpring
description: TorsionSpringConstraint applies torque based on a relative angle and relative angular velocity, in an attempt to bring two axes from two parts together.
---

<Alert severity="info">
For an overview on creating, visualizing, and simulating mechanical constraints, including `Class.TorsionSpringConstraint`, see [Mechanical constraints](../../physics/mechanical-constraints.md). Also see [Roblox&nbsp;units](../../physics/units.md) to understand how Roblox units compare to metric units.
</Alert>

A `Class.TorsionSpringConstraint` applies torque based on a relative angle and relative angular velocity. It attempts to bring two axes from two parts together and is useful for [hinged](../../physics/constraints/hinge.md) swinging doors with a spring-back effect.

<video controls src="../../assets/physics/constraints/TorsionSpring-Demo.mp4" width="90%" alt="Demo video of TorsionSpringConstraint"></video>

<Alert severity="info">
Correct orientation of a torsion spring's attachments is important. The constraint will attempt to bring the `Class.Attachment.SecondaryAxis|SecondaryAxis` of each attachment, visualized by the orange arrows, into alignment. When building mechanisms like swinging doors, ensure that the secondary axes are **perpendicular** to the intended axis of rotation.
</Alert>

## Damping

The `Class.TorsionSpringConstraint.Damping|Damping` value controls how fast the spring's oscillation dies down. A value of 0 allows the spring to oscillate endlessly, while higher values bring the spring to a rest more quickly.

<GridContainer numColumns="2">
  <figure>
    <video controls src="../../assets/physics/constraints/TorsionSpring-Damping-0.mp4" alt="Video showing Damping set to 0"></video>
    <figcaption>Damping = **0**</figcaption>
  </figure>
  <figure>
    <video controls src="../../assets/physics/constraints/TorsionSpring-Damping-50.mp4" alt="Video showing Damping set to 50"></video>
    <figcaption>Damping = **50**</figcaption>
  </figure>
</GridContainer>

## Stiffness

`Class.TorsionSpringConstraint.Stiffness|Stiffness` sets the torsional strength of the spring. Higher values create a spring that responds with more force.

## Limits

Enabling the `Class.TorsionSpringConstraint.LimitsEnabled|LimitsEnabled` property exposes the `Class.TorsionSpringConstraint.MaxAngle|MaxAngle` value to restrict the spring's range within a cone; it also exposes the `Class.TorsionSpringConstraint.Restitution|Restitution` value which defines the elasticity of the attachments when they reach their limit.
