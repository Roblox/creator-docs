---
title: Physics
description: Overview of Roblox's rigid body physics engine, assemblies, and constraints.
---

Roblox uses a rigid body physics engine. Parts are subject to physical forces as long as they are not `Class.BasePart.Anchored|anchored`. You can create physical [assemblies](#assemblies) using attachments and constraints, and you can detect and control [collisions](#collisions) between objects using events and collision filtering.

## Assemblies

An [assembly](../physics/assemblies.md) is one or more `Class.BasePart|BaseParts` connected by rigid constraints or motors (animated rigid joints). Assemblies can be set to an initial linear or angular velocity, or their behavior can be affected through [constraints](#constraints).

<Grid container spacing={0}>
  <Grid item XSmall={6} XLarge={3}>
    <img src="../assets/physics/assemblies/Assembly-Example-Block.png" alt="A light blue cube against a dark blue background that represents an assembly of 1 part." width="100%" />
    <figcaption>1&nbsp;assembly; 1&nbsp;part</figcaption>
  </Grid>
  <Grid item XSmall={6} XLarge={3}>
    <img src="../assets/physics/assemblies/Assembly-Example-Avatar.png" alt="A humanoid character model against a dark blue background that represents an assembly of 18 parts." width="100%" />
    <figcaption>1&nbsp;assembly; 18&nbsp;parts</figcaption>
  </Grid>
  <Grid item XSmall={12} XLarge={6}>
    <img src="../assets/physics/assemblies/Assembly-Example-Ship.png" alt="A pirate that represents an assemble of 179 parts." width="100%" />
    <figcaption>1&nbsp;assembly; 179&nbsp;parts</figcaption>
  </Grid>
</Grid>

## Constraints

Non-anchored assemblies react to force from gravity and collisions, but physical force can also be applied through **mechanical constraints** or **mover constraints**.

### Mechanical constraints

Mechanical constraints include familiar objects like hinges, springs, and ropes which can be used to build mechanisms. Each is covered in [Mechanical&nbsp;constraints](../physics/mechanical-constraints.md).

<video src="../assets/physics/constraints/Spring-Demo.mp4" controls width="100%"></video>

### Mover constraints

Mover constraints apply force or torque to move one or more assemblies. Each is outlined in [Mover&nbsp;constraints](../physics/mover-constraints.md).

<video src="../assets/physics/constraints/Torque-RelativeTo-Attachment0.mp4" controls width="100%"></video>

## Collisions

Collision events automatically occur when two `Class.BasePart|BaseParts` touch or stop touching in the 3D world. You can [detect](../workspace/collisions.md) these collisions through the `Class.BasePart.Touched|Touched` and `Class.BasePart.TouchEnded|TouchEnded` events which occur regardless of either part's `Class.BasePart.CanCollide|CanCollide` property value.

Through [collision filtering](../workspace/collisions.md#collision-filtering) techniques such as collision groups or part‑to‑part filtering, you can control which physical assemblies collide with others.

See [Collisions](../workspace/collisions.md) for more details on detecting and filtering collisions.

## Network ownership

In order to support complex physical mechanisms while also aiming for a smooth and responsive experience for players, the Roblox physics engine utilizes a **distributed physics** system in which computations are distributed between the server and all connected clients. Within this system, the engine assigns **network ownership** of physically simulated `Class.BasePart|BaseParts` to either a client or server to divide the work of calculating physics. See [Network ownership](../physics/network-ownership.md) for further details.

## Adaptive timestepping

The engine emphasizes best performance by automatically assigning assemblies to one of three simulation rates. For scenarios featuring complex mechanisms like tanks, you can improve stability by setting a fixed timestep. See [Adaptive timestepping](../physics/adaptive-timestepping.md) for more information.

## Sleep system

When an assembly is not moving or accelerating, the Roblox physics engine improves performance by automatically stops simulating the assembly. See [Sleep system](../physics/sleep-system.md) for a detailed description of the sleep system.
