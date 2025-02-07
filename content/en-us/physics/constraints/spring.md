---
title: Spring
description: SpringConstraint applies a force on its attachments based on spring and damper behavior, with an optional minimum/maximum length.
---

<Alert severity="info">
For an overview on creating, visualizing, and simulating mechanical constraints, including `Class.SpringConstraint`, see [Mechanical constraints](../../physics/mechanical-constraints.md). Also see [Roblox&nbsp;units](../../physics/units.md) to understand how Roblox units compare to metric units.
</Alert>

A `Class.SpringConstraint` applies a force on its attachments based on spring and damper behavior. You can customize a spring's [damping](#damping) and [stiffness](#stiffness), as well as set minimum and maximum [limits](#limits) on the spring's length.

<video controls src="../../assets/physics/constraints/Spring-Demo.mp4" width="90%" alt="Demo video of SpringConstraint"></video>

## Free length

`Class.SpringConstraint.FreeLength|FreeLength` defines the natural resting length of the spring. If the attachments are further apart than the free length, they are forced together; if the attachments are closer together than the free length, they are forced apart.

## Damping

The `Class.SpringConstraint.Damping|Damping` value controls how fast the spring's oscillation dies down. A value of 0 allows the spring to oscillate endlessly, while higher values bring the spring to a rest more quickly.

## Stiffness

`Class.SpringConstraint.Stiffness|Stiffness` sets the strength of the spring. Higher values create a spring that responds with more force when its attachments are closer together or further apart than `Class.SpringConstraint.FreeLength|FreeLength`.

<GridContainer numColumns="2">
  <figure>
    <video controls src="../../assets/physics/constraints/Spring-Stiffness-25.mp4" alt="Video showing Stiffness set to 25"></video>
    <figcaption>Stiffness = **25**</figcaption>
  </figure>
  <figure>
    <video controls src="../../assets/physics/constraints/Spring-Stiffness-500.mp4" alt="Video showing Stiffness set to 500"></video>
    <figcaption>Stiffness = **500**</figcaption>
  </figure>
</GridContainer>

## Limits

Enabling the `Class.SpringConstraint.LimitsEnabled|LimitsEnabled` property exposes the `Class.SpringConstraint.MinLength|MinLength` and `Class.SpringConstraint.MaxLength|MaxLength` values for setting the minimum and maximum length of the spring. If the spring's attachments reach these limits, they stop moving apart from one another without restitution.
