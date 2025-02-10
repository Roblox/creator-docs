---
title: Rod
description: RodConstraint keeps two attachments separated by a defined length, with optional limits on rotational tilt.
---

<Alert severity="info">
For an overview on creating, visualizing, and simulating mechanical constraints, including `Class.RodConstraint`, see [Mechanical constraints](../../physics/mechanical-constraints.md). Also see [Roblox&nbsp;units](../../physics/units.md) to understand how Roblox units compare to metric units.
</Alert>

A `Class.RodConstraint` keeps two attachments separated by its defined `Class.RodConstraint.Length|Length`. By default, both attachments can rotate freely, although you can enable limits to restrict rotational tilt.

<video controls src="../../assets/physics/constraints/Rod-Demo.mp4" width="90%" alt="Demo video of RodConstraint"></video>

## Limits

You can limit rotation of the attachments within a cone, independently of each other, by enabling the `Class.RodConstraint.LimitsEnabled|LimitsEnabled` property and setting `Class.RodConstraint.LimitAngle0|LimitAngle0` and `Class.RodConstraint.LimitAngle1|LimitAngle1` respectively.
