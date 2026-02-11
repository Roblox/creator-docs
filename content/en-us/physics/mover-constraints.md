---
title: Mover constraints
description: Mover constraints apply force or torque to move one or more assemblies.
---

import ConstraintVisualization from '../includes/studio/constraint-visualization.md'
import ConstraintSimulation from '../includes/studio/constraint-simulation.md'

The physics engine includes the following `Class.Constraint|Constraints` that apply force or torque to move one or more assemblies. In addition, various [mechanical constraints](../physics/mechanical-constraints.md) are available which behave as conceptual mechanical connections, including hinges, springs, ropes, and more.

<Grid container spacing={4}>

<Grid item XSmall={12} Small={6} Medium={6} Large={6}>
<Card variant="outlined" style={{height: '100%'}}>
<CardContent>
<Button href="../physics/constraints/linear-velocity.md" size="large"  variant="contained" fullWidth>Linear Velocity</Button>
<p></p>
<CardMedia component="video" controls src="../assets/physics/constraints/LinearVelocity-Demo.mp4" />
<p></p>
<figcaption>`Class.LinearVelocity` applies force on an assembly to maintain a constant velocity along a 3D vector, line, or 2D plane</figcaption>
</CardContent>
</Card>
</Grid>

<Grid item XSmall={12} Small={6} Medium={6} Large={6}>
<Card variant="outlined" style={{height: '100%'}}>
<CardContent>
<Button href="../physics/constraints/angular-velocity.md" size="large" variant="contained" fullWidth>Angular Velocity</Button>
<p></p>
<CardMedia component="video" controls src="../assets/physics/constraints/AngularVelocity-Demo.mp4" />
<p></p>
<figcaption>`Class.AngularVelocity` applies torque on an assembly to maintain a constant angular velocity</figcaption>
</CardContent>
</Card>
</Grid>

<Grid item XSmall={12} Small={6} Medium={6} Large={6}>
<Card variant="outlined" style={{height: '100%'}}>
<CardContent>
<Button href="../physics/constraints/align-position.md" size="large" variant="contained" fullWidth>Align Position</Button>
<p></p>
<CardMedia component="video" controls src="../assets/physics/constraints/AlignPosition-Demo.mp4" />
<p></p>
<figcaption>`Class.AlignPosition` applies force to move two attachments together, or to move one attachment to a goal position</figcaption>
</CardContent>
</Card>
</Grid>

<Grid item XSmall={12} Small={6} Medium={6} Large={6}>
<Card variant="outlined" style={{height: '100%'}}>
<CardContent>
<Button href="../physics/constraints/align-orientation.md" size="large" variant="contained" fullWidth>Align Orientation</Button>
<p></p>
<CardMedia component="video" controls src="../assets/physics/constraints/AlignOrientation-Demo.mp4" />
<p></p>
<figcaption>`Class.AlignOrientation` applies torque to align two attachments, or to align one attachment with a goal orientation</figcaption>
</CardContent>
</Card>
</Grid>

<Grid item XSmall={12} Small={6} Medium={6} Large={6}>
<Card variant="outlined" style={{height: '100%'}}>
<CardContent>
<Button href="../physics/constraints/vector-force.md" size="large" variant="contained" fullWidth>Vector Force</Button>
<p></p>
<CardMedia component="video" controls src="../assets/physics/constraints/VectorForce-Demo.mp4" />
<p></p>
<figcaption>`Class.VectorForce` applies constant linear force on an assembly</figcaption>
</CardContent>
</Card>
</Grid>

<Grid item XSmall={12} Small={6} Medium={6} Large={6}>
<Card variant="outlined" style={{height: '100%'}}>
<CardContent>
<Button href="../physics/constraints/torque.md" size="large" variant="contained" fullWidth>Torque</Button>
<p></p>
<CardMedia component="video" controls src="../assets/physics/constraints/Torque-Demo.mp4" />
<p></p>
<figcaption>`Class.Torque` applies constant torque on an assembly from its center of mass</figcaption>
</CardContent>
</Card>
</Grid>

<Grid item XSmall={12} Small={6} Medium={6} Large={6}>
<Card variant="outlined" style={{height: '100%'}}>
<CardContent>
<Button href="../physics/constraints/line-force.md" size="large" variant="contained" fullWidth>Line Force</Button>
<p></p>
<CardMedia component="video" controls src="../assets/physics/constraints/LineForce-Demo.mp4" />
<p></p>
<figcaption>`Class.LineForce` applies force along the theoretical line connecting its two attachments</figcaption>
</CardContent>
</Card>
</Grid>

<Grid item XSmall={12} Small={6} Medium={6} Large={6}>
<Card variant="outlined" style={{height: '100%'}}>
<CardContent>
<Button href="../physics/constraints/animation.md" size="large" variant="contained" fullWidth>Animation Constraint</Button>
<p></p>
<CardMedia component="video" controls src="../assets/physics/constraints/AnimationConstraint-Demo.mp4" />
<p></p>
<figcaption>`Class.AnimationConstraint` constrains its `Class.Attachment|Attachments` by an offset transform `Datatype.CFrame`.</figcaption>
</CardContent>
</Card>
</Grid>

</Grid>

## Constraint visualization

<ConstraintVisualization components={props.components} />

## Create constraints

Mover constraints typically connect one or two `Class.Attachment|Attachments` or `Class.Bone|Bones`. When connected to `Class.Bone|Bones`, the constraint will use their animated position and orientation.

To create a mechanical constraint, you can either insert one from the **Constraint** picker/button or through the [Explorer](../studio/explorer.md) window.

<Tabs>
<TabItem label="Constraint Picker">

1. In Studio's **Model** tab toolbar, click‑hold over the small corner arrow on a constraint button to open its picker menu, then select the desired constraint.

   <img src="../assets/studio/general/Toolbar-Constraint-Pickers.png" width="800" alt="Constraint pickers indicated in Studio's toolbar" />

2. In the 3D viewport, hover over any `Class.Part` or `Class.MeshPart` and click to add a new `Class.Attachment` to the part at the visualized point. Alternatively, hover over and click an existing `Class.Attachment` or `Class.Bone` to use it for the constraint.

3. Some mover constraints utilize or support a **secondary** attachment in their functionality, so the tool might prompt you to repeat the previous step on another `Class.Part`, `Class.MeshPart`, or `Class.Attachment`, or `Class.Bone`.

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

1. In the [Explorer](../studio/explorer.md) hierarchy, hover over the intended parent, click the **&CirclePlus;** button, and insert the desired constraint from the dropdown menu, such as a [LinearVelocity](../physics/constraints/linear-velocity.md) constraint.

   <img src="../assets/studio/explorer/LinearVelocity.png" width="320" alt="New LinearVelocity in Explorer window." />

1. With the new constraint selected, locate its currently empty **Attachment0** property in the [Properties](../studio/properties.md) window.

   <img src="../assets/studio/properties/LinearVelocity-Attachment0-Unassigned.png" width="320" alt="Constraint's Attachment0 property highlighted in Properties window." />

1. Link the **Attachment0** property to an `Class.Attachment` or `Class.Bone` in two consecutive steps:

   1. In the [Properties](../studio/properties.md) window, click in the **Attachment0** row to reveal the selection cursor.

   2. In the [Explorer](../studio/explorer.md) hierarchy, click on the target `Class.Attachment` or `Class.Bone`.

   <Grid container spacing={3}>
   <Grid item>
   <img src="../assets/physics/constraints/LinearVelocity-Link-Attachment0-1.png" width="320" alt="Mouse pointer hovering over Attachment0 property in Properties window." />
   </Grid>
   <Grid item>
   <img src="../assets/physics/constraints/LinearVelocity-Link-Attachment0-2.png" width="320" alt="Target attachment indicated in Explorer window." />
   </Grid>
   </Grid>

1. Some mover constraints use or support a **secondary** `Class.Attachment` or `Class.Bone` in their functionality. If necessary, repeat the previous step on the **Attachment1** property in the **Properties** window. For instance:

   - By default, [AlignPosition](../physics/constraints/align-position.md) and [AlignOrientation](../physics/constraints/align-orientation.md) align their primary attachment (**Attachment0**) with a secondary attachment (**Attachment1**).
   - [LineForce](../physics/constraints/line-force.md) **requires** two attachments to apply force along the theoretical line connecting them.

</TabItem>
</Tabs>

## Physical simulation

<ConstraintSimulation components={props.components} />

## Legacy mover conversion

If your experience relies on legacy `Class.BodyMover`‑based constraints, review the following notes when converting to modern mover constraints.

<BaseAccordion>
<AccordionSummary>`BodyPosition` &nbsp;⟩&nbsp; `AlignPosition`</AccordionSummary>
<AccordionDetails>
`Class.AlignPosition` satisfies the majority of use cases covered by the deprecated `Class.BodyPosition` mover. To sync with how the legacy mover treated each component independently and allowed a different force along each dimension, the `Class.AlignPosition.ForceLimitMode|ForceLimitMode` property of `Class.AlignPosition` allows the constraint to operate in `Enum.ForceLimitMode|Magnitude` mode or `Enum.ForceLimitMode|PerAxis` mode:

- In `Enum.ForceLimitMode|Magnitude` mode, the existing behavior is preserved and `Class.AlignPosition.MaxForce|MaxForce` is interpreted as a magnitude.

- In `Enum.ForceLimitMode|PerAxis` mode, the force along each axis can be specified independently. Because the maximum force is specified as a vector, the reference frame of the force can also be specified through the `Class.AlignPosition.ForceRelativeTo|ForceRelativeTo` property with `Enum.ActuatorRelativeTo|World`, `Enum.ActuatorRelativeTo|Attachment0`, and `Enum.ActuatorRelativeTo|Attachment1` options. Additionally, the formulation for the internal controller is modified to match that of `Class.BodyPosition`.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>`BodyGyro` &nbsp;⟩&nbsp; `AlignOrientation`</AccordionSummary>
<AccordionDetails>
`Class.AlignOrientation` satisfies the majority of use cases covered by the deprecated `Class.BodyGyro` mover. The `Class.AlignOrientation.AlignType|AlignType` modes of `Class.AlignOrientation`  provide sufficient freedom for most applications and the combination of multiple constraints can replicate the vector torque limit. Additionally, the `Enum.AlignType|PrimaryAxisLookAt` mode forces the primary axis of the constraint's first attachment (`Class.AlignOrientation.Attachment0|Attachment0`) to always point towards the second attachment (`Class.AlignOrientation.Attachment1|Attachment1`), making it a lot easier to add things such as motion tracking security cameras or guided missiles.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>`BodyVelocity` &nbsp;⟩&nbsp; `LinearVelocity`</AccordionSummary>
<AccordionDetails>
`Class.LinearVelocity` satisfies the majority of use cases covered by the deprecated `Class.BodyVelocity` mover. Although the legacy mover allows for a `Class.BodyVelocity.MaxForce|MaxForce` vector, the typical application of that vector force was to zero a particular component, allowing the constraint to be disabled along that dimension. `Class.LinearVelocity` achieves a similar effect by operating in distinct `Class.LinearVelocity.VelocityConstraintMode|VelocityConstraintMode` modes that corresponded to one (`Enum.VelocityConstraintMode|Line`), two (`Enum.VelocityConstraintMode|Plane`), and three (`Enum.VelocityConstraintMode|Vector`) dimensions.

Additionally, the `Class.LinearVelocity.ForceLimitMode|ForceLimitMode` property with the option of `Enum.ForceLimitMode|PerAxis` accommodates any applications of the vector force with all non‑zero components, such as an increase in the force along a single axis to counteract gravity.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>`BodyAngularVelocity` &nbsp;⟩&nbsp; `AngularVelocity`</AccordionSummary>
<AccordionDetails>
Although `Class.AngularVelocity` has some discrepancies with the deprecated `Class.BodyAngularVelocity` mover, specific cases related to those discrepancies have not been highlighted by the community, nor internally.

As a separate improvement, `Class.AngularVelocity` works with `Class.Attachment|Attachments` and the `Class.AngularVelocity.RelativeTo|RelativeTo` property lets you specify the `Datatype.CFrame` in which the force is specified, for example `Enum.ActuatorRelativeTo|World` or `Enum.ActuatorRelativeTo|Attachment1`.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>`BodyForce`/`BodyThrust` &nbsp;⟩&nbsp; `VectorForce`</AccordionSummary>
<AccordionDetails>
`Class.VectorForce` satisfies all use cases offered by the deprecated `Class.BodyForce` and `Class.BodyThrust` movers. The modern constraint works with `Class.Attachment|Attachments` and its `Class.VectorForce.RelativeTo|RelativeTo` property lets you apply force to a relative offset from center, similar to how `Class.BodyThrust.Location` worked.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>`RocketPropulsion` &nbsp;⟩&nbsp; `LineForce`/`AlignOrientation`</AccordionSummary>
<AccordionDetails>
A combination of `Class.LineForce` and `Class.AlignOrientation` satisfies the majority of use cases covered by the deprecated `Class.RocketPropulsion` mover. In the example of a guided missile, `Class.LineForce` can be used to control the "follow&nbsp;target" behavior of `Class.RocketPropulsion` while `Class.AlignOrientation` and its `Class.AlignOrientation.LookAtPosition|LookAtPosition` property can be used to control the "face&nbsp;target" behavior.
</AccordionDetails>
</BaseAccordion>
