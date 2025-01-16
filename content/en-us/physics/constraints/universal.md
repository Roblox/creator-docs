---
title: Universal
description: UniversalConstraint ensures two axes on two assemblies remain perpendicular, useful for applications such as vehicle power transmission to rear drive shafts, robotics, and more.
---

<Alert severity="info">
For an overview on creating, visualizing, and simulating mechanical constraints, including `Class.UniversalConstraint`, see [Mechanical constraints](../../physics/mechanical-constraints.md). Also see [Roblox&nbsp;units](../../physics/units.md) to understand how Roblox units compare to metric units.
</Alert>

A `Class.UniversalConstraint` ensures two axes on two assemblies remain perpendicular. Example applications include vehicle power transmission to the rear drive shafts, robotics, and more.

<video controls src="../../assets/physics/constraints/Universal-Demo.mp4" width="90%" alt="Demo video of UniversalConstraint"></video>

## Orientations

Orientation of a universal's two attachments affects how it will move. To ensure it behaves correctly, the `Class.Attachment.SecondaryAxis|SecondaryAxis` of the attachments, visualized by the orange arrows, should be **perpendicular** to each other. Note that a green L-shaped indicator appears when the axes are properly oriented.

<Tabs>
  <TabItem label="Axes Perpendicular">
    <img src="../../assets/physics/constraints/Universal-Attachments-Correct.jpg" width="672" height="378" alt="Secondary axes perpendicular for correct behavior" />
  </TabItem>
  <TabItem label="Axes Misoriented">
    <img src="../../assets/physics/constraints/Universal-Attachments-Incorrect.jpg" width="672" height="378" alt="Secondary axes misoriented" />
  </TabItem>
</Tabs>

## Limits

Enabling the `Class.UniversalConstraint.LimitsEnabled|LimitsEnabled` property exposes the `Class.UniversalConstraint.MaxAngle|MaxAngle` limit to restrict tilt within a cone, as well as `Class.UniversalConstraint.Restitution|Restitution` which defines the elasticity of the attachments when they reach the limit.
