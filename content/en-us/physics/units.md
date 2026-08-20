---
title: Roblox units
description: Explore the physical units used in Roblox and how they convert to metric units.
---

This article outlines Roblox physical units and how they convert to metric units. Understanding units is useful whenever you work with physics, as in the following examples:

- Tuning linear/angular velocities, forces, torques, stiffness, and damping of [mechanical constraints](../physics/mechanical-constraints.md) and [mover constraints](../physics/mover-constraints.md).
- Adjusting the density of [custom materials](../parts/materials.md#custom-materials).

## Unit conversions

<Tabs>
<TabItem label="Primary Units">

In general, you can use the conversions in the following table to relate Roblox's primary units for time, length, and mass to their metric counterparts.
<table>
<thead>
	<tr>
		<th>Unit</th>
		<th>Roblox</th>
		<th>Metric</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>Time</td>
		<td>$\text{1 second}$</td>
		<td>$\text{1 second}$</td>
	</tr>
	<tr>
		<td>Length</td>
		<td>$\text{1 stud}$</td>
		<td>$\text{28 cm}$</td>
	</tr>
	<tr>
		<td>Mass</td>
		<td>$\text{1 RMU}$*</td>
		<td>$\text{21.952 kg}$</td>
	</tr>
</tbody>
</table>
<figcaption>\* RMU = Roblox Mass Unit</figcaption>
</TabItem>
<TabItem label="Derived Units">

The primary units are used to generate conversions for **derived** units such as water density and air pressure at standard conditions. The following physical properties are expressed in metric units and Roblox units, with primary unit equivalents provided in brackets. All conversions have been rounded to three significant figures.

<table>
<thead>
	<tr>
		<th>Unit</th>
		<th>Metric</th>
		<th>Roblox</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>Water density</td>
		<td>$\text{1 g/cm³}$</td>
		<td>$\text{1 RMU/stud³}$</td>
	</tr>
	<tr>
		<td>Air density (sea&nbsp;level)</td>
		<td>$\text{0.00129 g/cm³}$</td>
		<td>$\text{0.00129 RMU/stud³}$</td>
	</tr>
	<tr>
		<td>1 atmosphere</td>
		<td>$\text{101,325 Pa [kg/(m s²)]}$</td>
		<td>$\text{1290 RMU/(stud s²)}$</td>
	</tr>
	<tr>
		<td>Spring stiffness</td>
		<td>$\text{1 N/m [kg/s²]}$</td>
		<td>$\text{0.0456 RMU/s²}$</td>
	</tr>
	<tr>
		<td>Spring damping</td>
		<td>$\text{1 N s/m [kg/s]}$</td>
		<td>$\text{0.0456 RMU/s}$</td>
	</tr>
	<tr>
		<td>Velocity</td>
		<td>$\text{1 m/s}$</td>
		<td>$\text{3.57 studs/s}$</td>
	</tr>
	<tr>
		<td>Force</td>
		<td>$\text{1 N [kg m/s²]}$</td>
		<td>$\text{0.163 Rowtons [RMU stud/s²]}$</td>
	</tr>
	<tr>
		<td>Torque</td>
		<td>$\text{1 N-m [kg m²/s²]}$</td>
		<td>$\text{0.581 Rowton-studs [RMU stud²/s²]}$</td>
	</tr>
</tbody>
</table>
</TabItem>
<TabItem label="Gravity">

The following table illustrates gravitational acceleration in Roblox units and metric units.

<table>
<thead>
	<tr>
		<th>Behavior</th>
		<th>Roblox</th>
		<th>Metric</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>Roblox default</td>
		<td>$\text{196.2 studs/s²}$</td>
		<td>$\text{54.936 m/s²}$</td>
	</tr>
	<tr>
		<td>Realistic (real-world)</td>
		<td>$\text{35 studs/s²}$</td>
		<td>$\text{9.8 m/s²}$</td>
	</tr>
</tbody>
</table>
</TabItem>
<TabItem label="Physical Limits">

Roblox places limits on certain physical properties, as outlined in the following table. Details on these properties is located in the `Datatype.PhysicalProperties` documentation.

<table>
<thead>
	<tr>
		<th>Property</th>
		<th>Minimum</th>
		<th>Maximum</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>Density ($\text{RMU/stud³}$)</td>
		<td>$\text{0.0001}$</td>
		<td>$\text{100}$</td>
	</tr>
	<tr>
		<td>Friction</td>
		<td>$\text{0.0}$</td>
		<td>$\text{2.0}$</td>
	</tr>
	<tr>
		<td>Friction weight</td>
		<td>$\text{0.0}$</td>
		<td>$\text{100}$</td>
	</tr>
	<tr>
		<td>Elasticity</td>
		<td>$\text{0.0}$</td>
		<td>$\text{1.0}$</td>
	</tr>
	<tr>
		<td>Elasticity weight</td>
		<td>$\text{0.0}$</td>
		<td>$\text{100}$</td>
	</tr>
</tbody>
</table>
</TabItem>
</Tabs>

## Unit consistency

Internally, the Roblox physics engine does not use unit conversions. You're free to define your own unit interpretations for studs (length) and RMUs (mass), but these should be used in a consistent manner throughout the game. For example, if you decide that one stud equals one foot (30.483&nbsp;cm), the unit density of water implies an RMU is equal to 62.4&nbsp;lbs (28.3&nbsp;kg):

<blockquote>

$\text{1 (g/cm³)} × \text{(30.48³ cm³/ft³)} =$<br />
$\text{28,317 (g/ft³)} × \text{(0.00220462 lbs/g)} =$<br />
$\text{62.4 (lbs/ft³)} =$<br />
$\text{1 (RMU/stud³)}$

</blockquote>

Overall, it's recommended that you use standard Roblox units because it makes a game work as expected in all scenarios, such as compatibility with VR controls.
