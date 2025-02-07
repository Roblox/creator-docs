---
title: Cylindrical
description: CylindricalConstraint allows its attachments to slide along one axis and rotate about another axis, with optional assigned angular and/or linear power.
---

<Alert severity="info">
For an overview on creating, visualizing, and simulating mechanical constraints, including `Class.CylindricalConstraint`, see [Mechanical constraints](../../physics/mechanical-constraints.md). Also see [Roblox&nbsp;units](../../physics/units.md) to understand how Roblox units compare to metric units.
</Alert>

A `Class.CylindricalConstraint` allows its attachments to slide along one axis and rotate about another axis. This constraint, along with a
[SpringConstraint](../../physics/constraints/spring.md), is ideal for building vehicle suspensions where the wheel shock can slide up and down while the wheel itself spins. This constraint can also be powered in both an [angular](#angular-power) and [linear](#linear-power) manner.

<video controls src="../../assets/physics/constraints/Cylindrical-Demo.mp4" width="90%" alt="Demo video of CylindricalConstraint"></video>

<Alert severity="info">
Orientation of the attachments affects how the cylindrical aspect will rotate. To ensure rotation occurs around the desired axis, each attachment's `Class.Attachment.Axis|Axis` and `Class.Attachment.SecondaryAxis|SecondaryAxis`, visualized by the yellow and orange arrows, should point in the same direction.
</Alert>

## Angular power

If a cylindrical's `Class.CylindricalConstraint.AngularActuatorType|AngularActuatorType` is set to `Enum.ActuatorType|Motor`, it attempts to rotate the attachments with the goal of reaching its `Class.CylindricalConstraint.AngularVelocity|AngularVelocity`. You can further control this rotation through both `Class.CylindricalConstraint.MotorMaxAngularAcceleration|MotorMaxAngularAcceleration` and `Class.CylindricalConstraint.MotorMaxTorque|MotorMaxTorque`.

If a cylindrical's `Class.CylindricalConstraint.AngularActuatorType|AngularActuatorType` is set to `Enum.ActuatorType|Servo`, it attempts to rotate to an angle specified by `Class.CylindricalConstraint.TargetAngle|TargetAngle`. This rotation is controlled by `Class.CylindricalConstraint.AngularSpeed|AngularSpeed`, `Class.CylindricalConstraint.AngularResponsiveness|AngularResponsiveness`, and `Class.CylindricalConstraint.ServoMaxTorque|ServoMaxTorque`.

## Linear power

If a cylindrical's `Class.CylindricalConstraint|ActuatorType` is set to `Enum.ActuatorType|Motor`, it attempts to translate the attachments with the goal of reaching `Class.CylindricalConstraint|Velocity`. You can further control this translation through both `Class.CylindricalConstraint|MotorMaxAcceleration` and `Class.CylindricalConstraint|MotorMaxForce`.

If a cylindrical's `Class.CylindricalConstraint|ActuatorType` is set to `Enum.ActuatorType|Servo`, it attempts to translate the attachments to a set separation specified by `Class.CylindricalConstraint|TargetPosition`. This translation is controlled by `Class.CylindricalConstraint|Speed`, `Class.CylindricalConstraint|LinearResponsiveness`, and `Class.CylindricalConstraint|ServoMaxForce`.

## Limits

You can set limits to restrict both the **sliding range** and **rotation** of a cylindrical constraint.

Enabling the `Class.CylindricalConstraint|LimitsEnabled` property exposes the `Class.CylindricalConstraint|LowerLimit` and `Class.CylindricalConstraint|UpperLimit` values, as well as `Class.CylindricalConstraint|Restitution` which defines the elasticity of the attachments when they reach either limit.

Enabling the `Class.CylindricalConstraint.AngularLimitsEnabled|AngularLimitsEnabled` property exposes the `Class.CylindricalConstraint.LowerAngle|LowerAngle` and `Class.CylindricalConstraint.UpperAngle|UpperAngle` limits, as well as `Class.CylindricalConstraint.AngularRestitution|AngularRestitution` which defines the elasticity of the attachments when they reach either limit.

<GridContainer numColumns="2">
  <figure>
    <video controls src="../../assets/physics/constraints/Cylindrical-Limits-Linear.mp4" alt="Video showing effect of LimitsEnabled set to true"></video>
    <figcaption>LimitsEnabled = **true**</figcaption>
  </figure>
  <figure>
    <video controls src="../../assets/physics/constraints/Cylindrical-Limits-Angular.mp4" alt="Video showing effect of AngularLimitsEnabled set to true"></video>
    <figcaption>AngularLimitsEnabled = **true**</figcaption>
  </figure>
</GridContainer>

## Inclination angle

`Class.CylindricalConstraint.InclinationAngle|InclinationAngle` defines the direction of the rotation axis as an angle from the **X** axis in the **X**/**Y** plane of `Class.Constraint.Attachment0|Attachment0`, from -180 to 180. This lets you tilt the rotating element without changing the sliding axis.

<GridContainer numColumns="2">
  <figure>
    <video controls src="../../assets/physics/constraints/Cylindrical-InclinationAngle-90.mp4" alt="Video showing InclinationAngle set to 90"></video>
    <figcaption>InclinationAngle = **90**</figcaption>
  </figure>
  <figure>
    <video controls src="../../assets/physics/constraints/Cylindrical-InclinationAngle-30.mp4" alt="Video showing InclinationAngle set to 30"></video>
    <figcaption>InclinationAngle = **30**</figcaption>
  </figure>
</GridContainer>
