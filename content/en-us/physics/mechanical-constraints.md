---
title: Mechanical Constraints
description: Mechanical constraints behave as conceptual mechanical connections such as hinges, springs, and motors.
---

The physics engine includes the following `Class.Constraint|Constraints` that behave as conceptual mechanical connections, including hinges, springs, ropes, and more. In addition, various [mover constraints](../physics/mover-constraints.md) are available to exert directional or rotational force upon [assemblies](../physics/assemblies.md).

<GridContainer numColumns="2">

<Card variant="outlined" style={{height: '100%'}}>
<CardContent>
<Button href="../physics/constraints/ball-socket.md" size="large" color="primaryBrand" variant="outlined" fullWidth>Ball Socket</Button>
<p></p>
<CardMedia component="video" controls src="../assets/physics/constraints/BallInSocket-Demo.mp4" />
<p></p>
<figcaption>[BallSocketConstraint](../physics/constraints/ball-socket.md) forces its two attachments into the same position and allows them to freely rotate about all three axes, with optional limits to restrict both tilt and twist</figcaption>
</CardContent>
</Card>

<Card variant="outlined" style={{height: '100%'}}>
<CardContent>
<Button href="../physics/constraints/hinge.md" size="large" color="primaryBrand" variant="outlined" fullWidth>Hinge</Button>
<p></p>
<CardMedia component="video" controls src="../assets/physics/constraints/Hinge-Demo.mp4" />
<p></p>
<figcaption>[HingeConstraint](../physics/constraints/hinge.md) allows its two attachments to rotate about one axis, with optional assigned power for motor or servo behavior</figcaption>
</CardContent>
</Card>

<Card variant="outlined" style={{height: '100%'}}>
<CardContent>
<Button href="../physics/constraints/prismatic.md" size="large" color="primaryBrand" variant="outlined" fullWidth>Prismatic</Button>
<p></p>
<CardMedia component="video" controls src="../assets/physics/constraints/Prismatic-Demo.mp4" />
<p></p>
<figcaption>[PrismaticConstraint](../physics/constraints/prismatic.md) allows two attachments to slide along one axis but not rotate, with optional assigned power for mechanisms like sliding doors and elevator platforms</figcaption>
</CardContent>
</Card>

<Card variant="outlined" style={{height: '100%'}}>
<CardContent>
<Button href="../physics/constraints/cylindrical.md" size="large" color="primaryBrand" variant="outlined" fullWidth>Cylindrical</Button>
<p></p>
<CardMedia component="video" controls src="../assets/physics/constraints/Cylindrical-Demo.mp4" />
<p></p>
<figcaption>[CylindricalConstraint](../physics/constraints/cylindrical.md) allows its attachments to slide along one axis and rotate about another axis, with optional assigned angular and/or linear power</figcaption>
</CardContent>
</Card>

<Card variant="outlined" style={{height: '100%'}}>
<CardContent>
<Button href="../physics/constraints/spring.md" size="large" color="primaryBrand" variant="outlined" fullWidth>Spring</Button>
<p></p>
<CardMedia component="video" controls src="../assets/physics/constraints/Spring-Demo.mp4" />
<p></p>
<figcaption>[SpringConstraint](../physics/constraints/spring.md) applies a force on its attachments based on spring and damper behavior, with an optional minimum/maximum length</figcaption>
</CardContent>
</Card>
  
<Card variant="outlined" style={{height: '100%'}}>
<CardContent>
<Button href="../physics/constraints/torsion-spring.md" size="large" color="primaryBrand" variant="outlined" fullWidth>Torsion Spring</Button>
<p></p>
<CardMedia component="video" controls src="../assets/physics/constraints/TorsionSpring-Demo.mp4" />
<p></p>
<figcaption>[TorsionSpringConstraint](../physics/constraints/torsion-spring.md) applies torque based on a relative angle and relative angular velocity, in an attempt to bring two axes from two parts together</figcaption>
</CardContent>
</Card>
  
<Card variant="outlined" style={{height: '100%'}}>
<CardContent>
<Button href="../physics/constraints/universal.md" size="large" color="primaryBrand" variant="outlined" fullWidth>Universal</Button>
<p></p>
<CardMedia component="video" controls src="../assets/physics/constraints/Universal-Demo.mp4" />
<p></p>
<figcaption>[UniversalConstraint](../physics/constraints/universal.md) ensures two axes on two assemblies remain perpendicular, useful for applications such as vehicle power transmission to rear drive shafts, robotics, and more</figcaption>
</CardContent>
</Card>

<Card variant="outlined" style={{height: '100%'}}>
<CardContent>
<Button href="../physics/constraints/rope.md" size="large" color="primaryBrand" variant="outlined" fullWidth>Rope</Button>
<p></p>
<CardMedia component="video" controls src="../assets/physics/constraints/Rope-Demo.mp4" />
<p></p>
<figcaption>[RopeConstraint](../physics/constraints/rope.md) prevents two attachments from separating further than a defined length, with optional behavior as an extending or contracting winch</figcaption>
</CardContent>
</Card>

<Card variant="outlined" style={{height: '100%'}}>
<CardContent>
<Button href="../physics/constraints/rod.md" size="large" color="primaryBrand" variant="outlined" fullWidth>Rod</Button>
<p></p>
<CardMedia component="video" controls src="../assets/physics/constraints/Rod-Demo.mp4" />
<p></p>
<figcaption>[RodConstraint](../physics/constraints/rod.md) keeps two attachments separated by a defined length, with optional limits on rotational tilt</figcaption>
</CardContent>
</Card>

<Card variant="outlined" style={{height: '100%'}}>
<CardContent>
<Button href="../physics/constraints/plane.md" size="large" color="primaryBrand" variant="outlined" fullWidth>Plane</Button>
<p></p>
<CardMedia component="video" controls src="../assets/physics/constraints/Plane-Demo.mp4" />
<p></p>
<figcaption>[PlaneConstraint](../physics/constraints/plane.md) moves two attachments into a position/orientation along a plane, and both attachments remain free to translate and rotate unless otherwise constrained</figcaption>
</CardContent>
</Card>

<Card variant="outlined" style={{height: '100%'}}>
<CardContent>
<Button href="../physics/constraints/weld.md" size="large" color="primaryBrand" variant="outlined" fullWidth>Weld</Button>
<p></p>
<figcaption>[WeldConstraint](../physics/constraints/weld.md) connects two `Class.BasePart|BaseParts` and ensures they stay in the same relative position and orientation to each other, even if they are not touching</figcaption>
</CardContent>
</Card>

<Card variant="outlined" style={{height: '100%'}}>
<CardContent>
<Button href="../physics/constraints/rigid.md" size="large" color="primaryBrand" variant="outlined" fullWidth>Rigid</Button>
<p></p>
<figcaption>[RigidConstraint](../physics/constraints/rigid.md) connects two `Class.Attachment|Attachments` or `Class.Bone|Bones` and ensures they stay in the same relative position/orientation to each other, even if they are not touching</figcaption>
</CardContent>
</Card>

<Card variant="outlined" style={{height: '100%'}}>
<CardContent>
<Button href="../physics/constraints/no-collision.md" size="large" color="primaryBrand" variant="outlined" fullWidth>No Collision</Button>
<p></p>
<figcaption>[NoCollisionConstraint](../physics/constraints/no-collision.md) prevents collisions between two specific parts, but those parts may still register collisions with the rest of the world</figcaption>
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

All mechanical constraints must connect one or two `Class.Attachment|Attachments` or `Class.Bone|Bones`, except for [WeldConstraint](../physics/constraints/weld.md) and [NoCollisionConstraint](../physics/constraints/no-collision.md). When connected to `Class.Bone|Bones`, the constraint will use their animated position and orientation.

To create a mechanical constraint, you can use either the **Create** tool or the [Explorer](../studio/explorer.md) window.

<Tabs>
<TabItem label="Create Tool">

1. In the [Model](../studio/model-tab.md) tab, access the **Create** button's picker menu and select the desired constraint type, for example **Spring**.

   <img src="../assets/studio/general/Model-Tab-Constraints-Create-Menu.png" width="754" alt="Constraint picker indicated in Studio toolbar" />

2. In the 3D viewport, hover over any `Class.Part` or `Class.MeshPart` and click to add a new `Class.Attachment` to the part at the visualized point. Alternatively, hover over and click an existing `Class.Attachment` or `Class.Bone` to use it for the constraint.

3. Most mechanical constraints require a **secondary** attachment in their functionality, so the tool will typically prompt you to repeat the previous step on another `Class.Part`, `Class.MeshPart`, `Class.Attachment`, or `Class.Bone`.

   <figure>
   <img src="../assets/physics/constraints/Creation-Diagram.jpg" width="600" alt="SpringConstraint connecting two attachments" />
   <figcaption>Completed [SpringConstraint](../physics/constraints/spring.md) connecting two attachments</figcaption>
   </figure>

</TabItem>
<TabItem label="Explorer">
<Alert severity="info">
Note that [WeldConstraint](../physics/constraints/weld.md) and [NoCollisionConstraint](../physics/constraints/no-collision.md) do not utilize `Class.Attachment|Attachments` or `Class.Bone|Bones`, so their linking properties in the following steps are **Part0**/**Part1**, not **Attachment0**/**Attachment1**. Similarly, you'll need to select a `Class.Part` or `Class.MeshPart` to complete the link, not an `Class.Attachment` or `Class.Bone`.
</Alert>

1. In the [Explorer](../studio/explorer.md) hierarchy, hover over the intended parent, click the **&CirclePlus;** button, and insert the desired constraint from the drop‑down menu, such as a [SpringConstraint](../physics/constraints/spring.md).

   <img src="../assets/physics/constraints/Explorer-New-SpringConstraint.png" width="320" alt="New SpringConstraint in Explorer hierarchy" />

1. With the new constraint selected, locate its currently empty **Attachment0** property in the [Properties](../studio/properties.md) window.

   <img src="../assets/physics/constraints/Properties-SpringConstraint-Attachment0-Unassigned.png" width="320" alt="Constraint's Attachment0 property highlighted in Properties window" />

1. Link the **Attachment0** property to an `Class.Attachment` or `Class.Bone` in two consecutive steps:

   1. In the [Properties](../studio/properties.md) window, click in the **Attachment0** row to reveal the selection cursor.

   2. In the [Explorer](../studio/explorer.md) hierarchy, click on the target `Class.Attachment` or `Class.Bone`.

   <Grid container spacing={3}>
   <Grid item>
   <img src="../assets/physics/constraints/SpringConstraint-Link-Attachment0-1.png" width="320" alt="Mouse pointer hovering over Attachment0 property in Properties window" />
   </Grid>
   <Grid item>
   <img src="../assets/physics/constraints/SpringConstraint-Link-Attachment0-2.png" width="320" alt="Target attachment indicated in Explorer hierarchy" />
   </Grid>
   </Grid>

1. Most mechanical constraints require a **secondary** `Class.Attachment` or `Class.Bone` in their functionality. If necessary, repeat the previous step on the **Attachment1** property in the [Properties](../studio/properties.md) window.

</TabItem>
</Tabs>

## Physical Simulation

To simulate physics while [moving](../parts/index.md#moving) or [rotating](../parts/index.md#rotating) parts, you can switch to **Physical** mode in
the [Model](../studio/model-tab.md) tab, effectively forcing parts to obey physical limitations. For example, if two parts are attached by a [RopeConstraint](../physics/constraints/rope.md) and you drag one part around the scene, the other part will follow as the rope becomes taut.

<img src="../assets/physics/constraints/Model-Tab-Mode-Physical.png" width="670" />
