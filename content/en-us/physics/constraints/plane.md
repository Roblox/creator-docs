---
title: Plane
description: PlaneConstraint moves two attachments into a position/orientation along a plane, and both attachments remain free to translate and rotate unless otherwise constrained.
---

<Alert severity="info">
For an overview on creating, visualizing, and simulating mechanical constraints, including `Class.PlaneConstraint`, see [Mechanical constraints](../../physics/mechanical-constraints.md). Also see [Roblox&nbsp;units](../../physics/units.md) to understand how Roblox units compare to metric units.
</Alert>

A `Class.PlaneConstraint` moves its `Class.Constraint.Attachment0|Attachment0` and `Class.Constraint.Attachment1|Attachment1` into a position/orientation along a plane whose normal vector is the primary axis of `Class.Constraint.Attachment0|Attachment0`. Both parent assemblies remain free to translate and rotate unless otherwise constrained.

<video controls src="../../assets/physics/constraints/Plane-Demo.mp4" width="90%" alt="Demo video of PlaneConstraint"></video>

Compare the following examples for how the orientation of `Class.Constraint.Attachment0|Attachment0` defines the plane, while the orientation of `Class.Constraint.Attachment1|Attachment1` has no bearing.

<Tabs>
  <TabItem label="Orientation = (0, 0, 90)">
    <img src="../../assets/physics/constraints/Plane-Attachment0-1.jpg" width="672" height="378" alt="Attachment0 oriented to (0, 0, 90)" />
  </TabItem>
  <TabItem label="Orientation = (-45, 0, 90)">
    <img src="../../assets/physics/constraints/Plane-Attachment0-2.jpg" width="672" height="378" alt="Attachment0 oriented to (-45, 0, 90)" />
  </TabItem>
</Tabs>
