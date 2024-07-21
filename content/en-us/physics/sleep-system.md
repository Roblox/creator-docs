---
title: Sleep System
description: Explore how the sleep system automatically prevents unnecessary simulation of non-moving parts.
---

Each [assembly](../physics/assemblies.md) in the Roblox engine corresponds to a single **rigid body**. The position and velocity of each rigid body describe where it's located and how fast it's moving, and one of the primary engine tasks is to update the positions and velocities of each assembly.

Assemblies can be connected together with [mechanical constraints](../physics/mechanical-constraints.md) and [mover constraints](../physics/mover-constraints.md) to form mechanisms such as cars or airplanes. As the number of assemblies and constraints in a mechanism increases, the time required to simulate the mechanism also increases. Fortunately, this increase is offset when the **sleep system** determines that the engine can skip simulation of non‑moving assemblies.

## Sleep States

Each assembly can be in one of three states: [awake](#awake), [sleep‑checking](#sleep-checking), or [sleeping](#sleeping).

### Awake

An **awake** assembly is moving or accelerating, and is therefore simulated. Assemblies enter this state from situations outlined in [sleep‑checking](#sleep-checking) and [sleeping](#sleeping), as well as [additional wake situations](#additional-wake-situations).

### Sleep-Checking

A non-moving assembly that shares a constraint with at least one [awake](#awake) neighboring assembly is put into the **sleep-checking** state and is not simulated. On each worldstep, a sleep-checking assembly checks whether:

- The **position deviation** of a neighboring assembly is greater than the [Neighbor&nbsp;Displacement](#threshold-reference) threshold.
- The product of a neighboring assembly's **acceleration** and current timestep size is greater than the [Neighbor&nbsp;Angular&nbsp;Velocity](#threshold-reference) and/or [Neighbor&nbsp;Linear&nbsp;Velocity](#threshold-reference) threshold.

If either of these conditions is true, or under any of the [additional wake situations](#additional-wake-situations), the sleep-checking assembly enters the [awake](#awake) state.

### Sleeping

A **sleeping** assembly is neither moving nor accelerating, and is therefore not simulated.

An assembly is determined to be non-moving by checking its **position deviation**, calculated as the maximum deviation from the average position of the point furthest from its center of mass over the most recent set of worldsteps. If this deviation is greater than the [Displacement](#threshold-reference) threshold, the assembly enters the [awake](#awake) state.

In some cases, simply checking for non-movement would cause an assembly to incorrectly enter the sleeping state. For example, if a ball is thrown straight up, its position barely changes for a number of worldsteps as it approaches its maximum height, making it a candidate to sleep and never fall back down. To handle such cases, the engine monitors whether the product of the assembly's acceleration and current timestep size exceeds the [Linear&nbsp;Velocity](#threshold-reference) and/or [Angular&nbsp;Velocity](#threshold-reference) threshold.

<Alert severity="info">
If an assembly falls asleep when you expect it to remain awake, it's commonly because the assembly is moving too slowly. In addition to automatic checks outlined in [sleep‑checking](#sleep-checking) and [sleeping](#sleeping), you can forcibly wake up an assembly through the conditions outlined in [additional wake situations](#additional-wake-situations).
</Alert>

## Threshold Reference

The following table provides the various displacement and velocity thresholds used to determine if an assembly is moving or accelerating.

<table>
<thead>
	<tr>
		<th>Threshold</th>
		<th>Value</th>
		<th>State Change</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>Neighbor Displacement</td>
		<td>0.01 studs</td>
		<td>[sleep-checking](#sleep-checking) &rang; [awake](#awake)</td>
	</tr>
	<tr>
		<td>Neighbor Linear Velocity</td>
		<td>0.2 studs/s</td>
		<td>[sleep-checking](#sleep-checking) &rang; [awake](#awake)</td>
	</tr>
	<tr>
		<td>Neighbor Angular Velocity</td>
		<td>0.2 radians/s</td>
		<td>[sleep-checking](#sleep-checking) &rang; [awake](#awake)</td>
	</tr>
	<tr>
		<td>Displacement</td>
		<td>0.001 studs</td>
		<td>[sleeping](#sleeping) &rang; [awake](#awake)</td>
	</tr>
	<tr>
		<td>Linear Velocity</td>
		<td>0.1 studs/s</td>
		<td>[sleeping](#sleeping) &rang; [awake](#awake)</td>
	</tr>
	<tr>
		<td>Angular Velocity</td>
		<td>0.1 radians/s</td>
		<td>[sleeping](#sleeping) &rang; [awake](#awake)</td>
	</tr>
</tbody>
</table>

## Additional Wake Situations

In addition to situations outlined in [sleep‑checking](#sleep-checking) and [sleeping](#sleeping), an assembly enters the [awake](#awake) state when:

- It collides with another assembly.
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

## Debugging Visualization

During playtesting, you can visualize assembly sleep states. To enable this option:

1. Open the settings window through **File** &rang; **Studio Settings**.
2. From the **Physics** tab, enable **Allow Sleep**.

   <img src="../assets/studio/general/Studio-Settings-Physics-Allow-Sleep.png" width="760" alt="Studio Settings window showing the Physics tab selected and the Allow Sleep option toggled on." />

3. Also from the **Physics** tab, enable **Are Awake Parts Highlighted**.

   <img src="../assets/studio/general/Studio-Settings-Physics-Are-Awake-Parts-Highlighted.png" width="760" alt="Studio Settings window showing the Physics tab selected and the Are Awake Parts Highlighted option toggled on." />

Once enabled, simulated parts will be outlined by their current sleep state, with [awake](#awake) parts outlined in red, [sleep‑checking](#sleep-checking) parts outlined in orange, and [sleeping](#sleeping) parts un‑outlined.

<figure>
  <video src="../assets/physics/assemblies/Sleep-Demo.mp4" controls width="800"></video>
  <figcaption>Simulated parts outlined by the color representing their current sleep state</figcaption>
</figure>
