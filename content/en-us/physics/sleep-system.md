---
title: Sleep system
description: Explore how the sleep system automatically prevents unnecessary simulation of non-moving parts.
---

Each [assembly](../physics/assemblies.md) in the Roblox Engine corresponds to a single **rigid body**. The position and velocity of each rigid body describe where it's located and how fast it's moving, and one of the primary engine tasks is to update the positions and velocities of each assembly.

Assemblies can be connected together with [mechanical constraints](../physics/mechanical-constraints.md) and [mover constraints](../physics/mover-constraints.md) to form mechanisms such as cars or airplanes. As the number of assemblies and constraints in a mechanism increases, the time required to simulate the mechanism also increases. Fortunately, this increase is offset when the **sleep system** determines that the engine can skip simulation of non‑moving assemblies.

## Sleep states

Each assembly can be in one of three states: [awake](#awake), [sleeping](#sleeping), or [sleep‑checking](#sleep-checking).

### Awake

An **awake** assembly is moving or accelerating, and is therefore simulated. Assemblies enter this state from situations outlined in [sleeping](#sleeping) and [sleep‑checking](#sleep-checking), as well as [additional wake situations](#additional-wake-situations).

### Sleeping

A **sleeping** assembly is neither moving nor accelerating, and is therefore not simulated.

An assembly is determined to be non-moving by checking its **linear velocity** and **rotational velocity**. If its linear velocity is less than the [Linear&nbsp;Velocity](#threshold-reference) threshold and its rotational velocity is less than the [Rotational&nbsp;Velocity](#threshold-reference) threshold, the assembly is considered to be non-moving.

In some cases, simply checking for non-movement would cause an assembly to incorrectly enter the sleeping state. For example, if a ball is thrown straight up, its velocity approaches zero as it reaches its maximum height, making it a candidate to sleep and never fall back down. To handle such cases, the engine considers an assembly to be accelerating if its **linear acceleration** or **rotational acceleration** are greater than the [Linear&nbsp;Acceleration](#threshold-reference) and [Rotational&nbsp;Acceleration](#threshold-reference) thresholds, respectively, and will prevent the assembly from falling asleep.

<Alert severity="info">
If an assembly falls asleep when you expect it to remain awake, it's commonly because the assembly is moving too slowly. In addition to automatic checks outlined in [sleep‑checking](#sleep-checking) and [sleeping](#sleeping), you can forcibly wake up an assembly through the conditions outlined in [additional wake situations](#additional-wake-situations).
</Alert>

### Sleep-checking

A non-moving assembly that shares a constraint with at least one [awake](#awake) neighboring assembly is put into the **sleep-checking** state and is not simulated. On each worldstep, a sleep-checking assembly checks whether:

- Its **linear acceleration** is greater than the [Wake&nbsp;Linear&nbsp;Acceleration](#threshold-reference) threshold.
- Its **rotational acceleration** is greater than the [Wake&nbsp;Rotational&nbsp;Acceleration](#threshold-reference) threshold.
- A neighboring assembly's **linear velocity** is greater than the [Neighbor&nbsp;Linear&nbsp;Velocity](#threshold-reference) threshold.
- A neighboring assembly's **rotational velocity** is greater than the [Neighbor&nbsp;Rotational&nbsp;Velocity](#threshold-reference) threshold.

If any of these conditions is true, or under any of the [additional wake situations](#additional-wake-situations), the sleep-checking assembly enters the [awake](#awake) state.

## Threshold reference

The following table provides the various velocity and acceleration thresholds used to determine if an assembly is moving or accelerating.

<table>
<thead>
	<tr>
		<th>Threshold</th>
		<th>Value</th>
		<th>State change</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>Linear Velocity</td>
		<td>0.33 studs/s</td>
		<td>[awake](#awake) &rang; [sleeping](#sleeping)</td>
	</tr>
	<tr>
		<td>Rotational Velocity</td>
		<td>0.42 studs/s</td>
		<td>[awake](#awake) &rang; [sleeping](#sleeping)</td>
	</tr>
	<tr>
		<td>Linear Acceleration</td>
		<td>0.24 studs/s&sup2;</td>
		<td>[awake](#awake) &rang; [sleeping](#sleeping)</td>
	</tr>
	<tr>
		<td>Rotational Acceleration</td>
		<td>0.24 studs/s&sup2;</td>
		<td>[awake](#awake) &rang; [sleeping](#sleeping)</td>
	</tr>
	<tr>
		<td>Neighbor Linear Velocity</td>
		<td>0.48 studs/s</td>
		<td>[sleep-checking](#sleep-checking) &rang; [awake](#awake)</td>
	</tr>
	<tr>
		<td>Neighbor Rotational Velocity</td>
		<td>0.59 studs/s</td>
		<td>[sleep-checking](#sleep-checking) &rang; [awake](#awake)</td>
	</tr>
	<tr>
		<td>Wake Linear Acceleration</td>
		<td>16.9 studs/s&sup2;</td>
		<td>[awake](#awake) &rang; [sleeping](#sleeping)</td>
	</tr>
	<tr>
		<td>Wake Rotational Acceleration</td>
		<td>16.9 studs/s&sup2;</td>
		<td>[awake](#awake) &rang; [sleeping](#sleeping)</td>
	</tr>
</tbody>
</table>

Rotational velocity and acceleration thresholds reflect the velocity and acceleration of a point located on the assembly bounding sphere (a sphere that contains all of the parts in an assembly) that moves rigidly with the assembly.

<Alert severity="info">
For a given angular velocity, the rotational velocity of an assembly is proportional to the assembly bounding sphere radius. This means that larger assemblies can rotate at a lower angular velocity without falling asleep.
</Alert>

## Additional wake situations

In addition to situations outlined in [sleep‑checking](#sleep-checking) and [sleeping](#sleeping), an assembly enters the [awake](#awake) state when:

- It collides with another assembly moving faster than 1 studs/s.
- Any physics-related property of any `Class.BasePart` within the assembly changes, including:

  - `Class.BasePart.Anchored|Anchored`
  - `Class.BasePart.AssemblyLinearVelocity|AssemblyLinearVelocity`/`Class.BasePart.AssemblyAngularVelocity|AssemblyAngularVelocity`
  - `Class.BasePart.CanCollide|CanCollide`/`Class.BasePart.CanTouch|CanTouch`
  - `Class.BasePart.CustomPhysicalProperties|CustomPhysicalProperties`
  - `Class.BasePart.EnableFluidForces|EnableFluidForces`
  - `Class.BasePart.Massless|Massless`
  - `Class.BasePart.RootPriority|RootPriority`

- A non-zero impulse is applied to any `Class.BasePart` within the assembly via `Class.BasePart:ApplyImpulse()|ApplyImpulse()`, `Class.BasePart:ApplyImpulseAtPosition()|ApplyImpulseAtPosition()`, or `Class.BasePart:ApplyAngularImpulse()|ApplyAngularImpulse()`.

- Any physics-related property changes on the `Class.Workspace` that would affect the assembly, including:

  - `Class.Workspace.Gravity|Gravity`
  - `Class.Workspace.FluidForces|FluidForces`
  - `Class.Workspace.GlobalWind|GlobalWind`
  - `Class.Workspace.AirDensity|AirDensity`

- A new `Class.Constraint` is created with an `Class.Attachment` that is parented to a `Class.BasePart` within the assembly.

- Any property changes for a `Class.Constraint` with an `Class.Attachment` that is parented to a `Class.BasePart` within the assembly.

- The `Class.Motor.CurrentAngle|CurrentAngle` property changes for a `Class.Motor` that is connected to a `Class.BasePart` within the assembly.

- The assembly contains a `Class.VehicleSeat` with a seated player character.

- The assembly is within the `Class.Explosion.BlastRadius|BlastRadius` of an `Class.Explosion`.

## Debug visualization

During playtesting, you can visualize assembly sleep states by toggling on **Awake&nbsp;parts** from the [Visualization&nbsp;Options](../studio/ui-overview.md#visualization-options) widget in the upper‑right corner of the 3D viewport.

<img src="../assets/studio/general/Visualization-Options.png" width="780" alt="A close up view of the 3D viewport with the Visualization Options button indicated in the upper-right corner." />

Once enabled, simulated parts will be outlined by their current sleep state, with [awake](#awake) parts outlined in red, [sleep‑checking](#sleep-checking) parts outlined in orange, and [sleeping](#sleeping) parts un‑outlined.

<figure>
  <video src="../assets/physics/assemblies/Sleep-Demo.mp4" controls width="800"></video>
  <figcaption>Simulated parts outlined by the color representing their current sleep state</figcaption>
</figure>
