---
title: Mover Constraints
description: Mover constraints apply force or torque to move one or more assemblies.
---

The physics engine includes the following `Class.Constraint|Constraints` that apply force or torque to move one or more assemblies. In addition, various [mechanical constraints](../physics/mechanical-constraints.md) are available which behave as conceptual mechanical connections, including hinges, springs, ropes, and more.

<GridContainer numColumns="2">

<Card variant="outlined" style={{height: '100%'}}>
<CardContent>
<Button href="../physics/constraints/linear-velocity.md" size="large" color="primaryBrand" variant="outlined" fullWidth>Linear Velocity</Button>
<p></p>
<CardMedia component="video" controls src="../assets/physics/constraints/LinearVelocity-Demo.mp4" />
<p></p>
<figcaption>[LinearVelocity](../physics/constraints/linear-velocity.md) applies force on an assembly to maintain a constant velocity along a 3D vector, line, or 2D plane</figcaption>
</CardContent>
</Card>

<Card variant="outlined" style={{height: '100%'}}>
<CardContent>
<Button href="../physics/constraints/angular-velocity.md" size="large" color="primaryBrand" variant="outlined" fullWidth>Angular Velocity</Button>
<p></p>
<CardMedia component="video" controls src="../assets/physics/constraints/AngularVelocity-Demo.mp4" />
<p></p>
<figcaption>[AngularVelocity](../physics/constraints/angular-velocity.md) applies torque on an assembly to maintain a constant angular velocity</figcaption>
</CardContent>
</Card>

<Card variant="outlined" style={{height: '100%'}}>
<CardContent>
<Button href="../physics/constraints/align-position.md" size="large" color="primaryBrand" variant="outlined" fullWidth>Align Position</Button>
<p></p>
<CardMedia component="video" controls src="../assets/physics/constraints/AlignPosition-Demo.mp4" />
<p></p>
<figcaption>[AlignPosition](../physics/constraints/align-position.md) applies force to move two attachments together, or to move one attachment to a goal position</figcaption>
</CardContent>
</Card>

<Card variant="outlined" style={{height: '100%'}}>
<CardContent>
<Button href="../physics/constraints/align-orientation.md" size="large" color="primaryBrand" variant="outlined" fullWidth>Align Orientation</Button>
<p></p>
<CardMedia component="video" controls src="../assets/physics/constraints/AlignOrientation-Demo.mp4" />
<p></p>
<figcaption>[AlignOrientation](../physics/constraints/align-orientation.md) applies torque to align two attachments, or to align one attachment with a goal orientation</figcaption>
</CardContent>
</Card>

<Card variant="outlined" style={{height: '100%'}}>
<CardContent>
<Button href="../physics/constraints/vector-force.md" size="large" color="primaryBrand" variant="outlined" fullWidth>Vector Force</Button>
<p></p>
<CardMedia component="video" controls src="../assets/physics/constraints/VectorForce-Demo.mp4" />
<p></p>
<figcaption>[VectorForce](../physics/constraints/vector-force.md) applies constant linear force on an assembly</figcaption>
</CardContent>
</Card>

<Card variant="outlined" style={{height: '100%'}}>
<CardContent>
<Button href="../physics/constraints/torque.md" size="large" color="primaryBrand" variant="outlined" fullWidth>Torque</Button>
<p></p>
<CardMedia component="video" controls src="../assets/physics/constraints/Torque-Demo.mp4" />
<p></p>
<figcaption>[Torque](../physics/constraints/torque.md) applies constant torque on an assembly from its center of mass</figcaption>
</CardContent>
</Card>

<Card variant="outlined" style={{height: '100%'}}>
<CardContent>
<Button href="../physics/constraints/line-force.md" size="large" color="primaryBrand" variant="outlined" fullWidth>Line Force</Button>
<p></p>
<CardMedia component="video" controls src="../assets/physics/constraints/LineForce-Demo.mp4" />
<p></p>
<figcaption>[LineForce](../physics/constraints/line-force.md) applies force along the theoretical line connecting its two attachments</figcaption>
</CardContent>
</Card>

</GridContainer>

## Constraint Visualization

To accurately visualize constraints in Studio, you can use the following options from the [Model](../studio/model-tab.md) tab:

<img src="../assets/studio/general/Model-Tab-Constraints-Section-Labeled.png" width="754" alt="Constraints tools indicated in Model tab" />

<Grid container spacing={2} alignItems="center">
	<Grid item><img src="../assets/misc/Box-Label-A.png" width="40" /></Grid>
	<Grid item xs={10} sm={11} md={11} lg={11}><p>**Show Welds** &mdash; Show `Class.WeldConstraint|WeldConstraints`, separately from the visualization of other constraints.</p></Grid>
</Grid>
<Grid container spacing={2} alignItems="center">
	<Grid item><img src="../assets/misc/Box-Label-B.png" width="40" /></Grid>
	<Grid item xs={10} sm={11} md={11} lg={11}><p>**Constraint Details** &mdash; Show complete visual details of non-weld constraints.</p></Grid>
</Grid>
<Grid container spacing={2} alignItems="center">
	<Grid item><img src="../assets/misc/Box-Label-C.png" width="40" /></Grid>
	<Grid item xs={10} sm={11} md={11} lg={11}><p>**Scale** &mdash; Relative scale of visualizations.</p></Grid>
</Grid>

<Alert severity="success">
In addition to the above visualization, you can view colored outlines around mechanisms (groups of parts that share simulation step and [network ownership](../physics/network-ownership.md)) by toggling on **Mechanisms** from the [Visualization&nbsp;Options](../studio/ui-overview.md#visualization-options) widget in the upper‑right corner of the 3D viewport.
</Alert>

## Creating Constraints

Mover constraints typically connect one or two `Class.Attachment|Attachments` or `Class.Bone|Bones`. When connected to `Class.Bone|Bones`, the constraint will use their animated position and orientation.

To create a mover constraint, you can use either the **Create** tool or the [Explorer](../studio/explorer.md) window.

<Tabs>
<TabItem label="Create Tool">

1. In the [Model](../studio/model-tab.md) tab, access the **Create** button's picker menu and select the desired constraint type, for example **Angular&nbsp;Velocity**.

   <img src="../assets/studio/general/Model-Tab-Constraints-Create-Menu.png" width="754" alt="Constraint picker indicated in Studio toolbar" />

1. In the 3D viewport, hover over any `Class.Part` or `Class.MeshPart` and click to add a new `Class.Attachment` to the part at the visualized point. Alternatively, hover over and click an existing `Class.Attachment` or `Class.Bone` to use it for the constraint.

1. Some mover constraints utilize or support a **secondary** attachment in their functionality, so the tool might prompt you to repeat the previous step on another `Class.Part`, `Class.MeshPart`, or `Class.Attachment`, or `Class.Bone`.

   <GridContainer numColumns="2">
   <figure>
   <img src="../assets/physics/constraints/Constraint-AngularVelocity-Labeled.jpg" alt="AngularVelocity using one attachment"/>
   <figcaption>[AngularVelocity](../physics/constraints/angular-velocity.md) using one attachment</figcaption>
   </figure>
   <figure>
   <img src="../assets/physics/constraints/Constraint-AlignPosition-Labeled.jpg" alt="AlignPosition using two attachments"/>
   <figcaption>[AlignPosition](../physics/constraints/align-position.md) using two attachments</figcaption>
   </figure>
   </GridContainer>

</TabItem>
<TabItem label="Explorer">

1. In the [Explorer](../studio/explorer.md) hierarchy, hover over the intended parent, click the **&CirclePlus;** button, and insert the desired constraint from the drop‑down menu, such as a [LinearVelocity](../physics/constraints/linear-velocity.md).

   <img src="../assets/physics/constraints/Explorer-New-LinearVelocity.png" width="320" alt="New LinearVelocity in Explorer hierarchy" />

1. With the new constraint selected, locate its currently empty **Attachment0** property in the [Properties](../studio/properties.md) window.

   <img src="../assets/physics/constraints/Properties-LinearVelocity-Attachment0-Unassigned.png" width="320" alt="Constraint's Attachment0 property highlighted in Properties window" />

1. Link the **Attachment0** property to an `Class.Attachment` or `Class.Bone` in two consecutive steps:

   1. In the [Properties](../studio/properties.md) window, click in the **Attachment0** row to reveal the selection cursor.

   2. In the [Explorer](../studio/explorer.md) hierarchy, click on the target `Class.Attachment` or `Class.Bone`.

   <Grid container spacing={3}>
   <Grid item>
   <img src="../assets/physics/constraints/LinearVelocity-Link-Attachment0-1.png" width="320" alt="Mouse pointer hovering over Attachment0 property in Properties window" />
   </Grid>
   <Grid item>
   <img src="../assets/physics/constraints/LinearVelocity-Link-Attachment0-2.png" width="320" alt="Target attachment indicated in Explorer hierarchy" />
   </Grid>
   </Grid>

1. Some mover constraints use or support a **secondary** `Class.Attachment` or `Class.Bone` in their functionality. If necessary, repeat the previous step on the **Attachment1** property in the [Properties](../studio/properties.md) window. For instance:

   - By default, [AlignPosition](../physics/constraints/align-position.md) and [AlignOrientation](../physics/constraints/align-orientation.md) align their primary attachment (**Attachment0**) with a secondary attachment (**Attachment1**).
   - [LineForce](../physics/constraints/line-force.md) **requires** two attachments to apply force along the theoretical line connecting them.

</TabItem>
</Tabs>

## Physical Simulation

To simulate physics while [moving](../parts/index.md#moving) or [rotating](../parts/index.md#rotating) parts, you can switch to **Physical** mode in the [Model](../studio/model-tab.md) tab, effectively forcing parts to obey physical limitations. For example, if you drag one part around the scene and it collides with another part, it will physically push that part out of the way.

<img src="../assets/physics/constraints/Model-Tab-Mode-Physical.png" width="670" />
