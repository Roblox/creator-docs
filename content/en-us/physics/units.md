---
title: Roblox units
description: Explore the physical units used in Roblox and how they convert to metric units.
---

This article outlines Roblox physical units and how they convert to metric units. Understanding units is useful whenever you work with physics, as in the following examples:

- Customizing your experience's gravity, jump height/power, and walk speed in the **World** tab of Studio's **File**&nbsp;⟩ **Experience Settings** window.
- Tuning linear/angular velocities, forces, torques, stiffness, and damping of [mechanical constraints](../physics/mechanical-constraints.md) and [mover constraints](../physics/mover-constraints.md).
- Adjusting the density of [custom materials](../parts/materials.md#custom-materials).

## Unit conversions

<Tabs>
<TabItem label="Primary Units">

In general, you can use the conversions in the following table to relate Roblox's primary units for time, length, and mass to their metric counterparts.
<table size="small">
<thead>
	<tr>
		<th>Unit</th>
		<th>Roblox</th>
		<th>Metric</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>**Time**</td>
		<td>1 second</td>
		<td>1 second</td>
	</tr>
	<tr>
		<td>**Length**</td>
		<td>1 stud</td>
		<td>28 cm</td>
	</tr>
	<tr>
		<td>**Mass**</td>
		<td>1 RMU*</td>
		<td>21.952 kg</td>
	</tr>
</tbody>
</table>
<figcaption>\* RMU = Roblox Mass Unit</figcaption>
</TabItem>
<TabItem label="Derived units">

The primary units are used to generate conversions for **derived** units such as water density and air pressure at standard conditions. The following physical properties are expressed in metric units and Roblox units, with primary unit equivalents provided in brackets. All conversions have been rounded to three significant figures.

<table size="small">
<thead>
	<tr>
		<th>Unit</th>
		<th>Metric</th>
		<th>Roblox</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>**Water Density**</td>
		<td>1 g/cm&sup3;</td>
		<td>1 RMU/stud&sup3;</td>
	</tr>
	<tr>
		<td>**Air Density** (sea&nbsp;level)</td>
		<td>0.00129 g/cm&sup3;</td>
		<td>0.00129 RMU/stud&sup3;</td>
	</tr>
	<tr>
		<td>**1 atmosphere**</td>
		<td>101,325 Pa *[kg/(m s&sup2;)]*</td>
		<td>1290 RMU/(stud s&sup2;)</td>
	</tr>
	<tr>
		<td>**Spring Stiffness**</td>
		<td>1 N/m *[kg/s&sup2;]*</td>
		<td>0.0456 RMU/s&sup2;</td>
	</tr>
	<tr>
		<td>**Spring Damping**</td>
		<td>1 N s/m *[kg/s]*</td>
		<td>0.0456 RMU/s</td>
	</tr>
	<tr>
		<td>**Velocity**</td>
		<td>1 m/s</td>
		<td>3.57 studs/s</td>
	</tr>
	<tr>
		<td>**Force**</td>
		<td>1 N *[kg m/s&sup2;]*</td>
		<td>0.163 Rowtons *[RMU stud/s&sup2;]*</td>
	</tr>
	<tr>
		<td>**Torque**</td>
		<td>1 N-m *[kg m&sup2;/s&sup2;]*</td>
		<td>0.581 Rowton-studs *[RMU stud&sup2;/s&sup2;]*</td>
	</tr>
</tbody>
</table>
</TabItem>
<TabItem label="Gravity">

The following table illustrates gravitational acceleration in Roblox units and metric units for presets in the **World** tab of Studio's **File**&nbsp;⟩ **Experience Settings** window.

<table size="small">
<thead>
	<tr>
		<th>Preset</th>
		<th>Roblox</th>
		<th>Metric</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>**Classic** (default)</td>
		<td>196.2 studs/s&sup2;</td>
		<td>54.963 m/s&sup2;</td>
	</tr>
	<tr>
		<td>**Realistic** (real-world)</td>
		<td>35 studs/s&sup2;</td>
		<td>9.8 m/s&sup2;</td>
	</tr>
	<tr>
		<td>**Action**</td>
		<td>75 studs/s&sup2;</td>
		<td>21 m/s&sup2;</td>
	</tr>
</tbody>
</table>
</TabItem>
<TabItem label="Physical limits">

Roblox places limits on certain physical properties, as outlined in the following table. Details on these properties is located in the `Datatype.PhysicalProperties` documentation.

<table size="small">
<thead>
	<tr>
		<th>Property</th>
		<th>Minimum</th>
		<th>Maximum</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>**Density** (RMU/stud&sup3;)</td>
		<td>0.0001</td>
		<td>100</td>
	</tr>
	<tr>
		<td>**Friction**</td>
		<td>0.0</td>
		<td>2.0</td>
	</tr>
	<tr>
		<td>**Friction Weight**</td>
		<td>0.0</td>
		<td>100</td>
	</tr>
	<tr>
		<td>**Elasticity**</td>
		<td>0.0</td>
		<td>1.0</td>
	</tr>
	<tr>
		<td>**Elasticity Weight**</td>
		<td>0.0</td>
		<td>100</td>
	</tr>
</tbody>
</table>
</TabItem>
</Tabs>

## Importance of unit consistency

Internally, the Roblox physics engine does not use unit conversions. You're free to define your own unit interpretations for studs (length) and RMUs (mass), but these should be used in a consistent manner throughout the experience. For example, if you decide that one stud equals one foot (30.483&nbsp;cm), the unit density of water implies an RMU is equal to 62.4&nbsp;lbs (28.3&nbsp;kg):

<blockquote>
1 (g/cm&sup3;)&nbsp;×&nbsp;(30.48&sup3;&nbsp;cm&sup3;/ft&sup3;)&nbsp;= 28,317&nbsp;(g/ft&sup3;)&nbsp;×&nbsp;(0.00220462&nbsp;lbs/g)&nbsp;= 62.4&nbsp;(lbs/ft&sup3;)&nbsp;= 1&nbsp;(RMU/stud&sup3;)
</blockquote>

Overall, it's recommended that you use standard Roblox units because it makes an experience work as expected in all scenarios, such as compatibility with VR controls.
