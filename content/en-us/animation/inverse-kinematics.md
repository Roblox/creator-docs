---
title: Inverse Kinematics
description: Inverse Kinematics is a technique in computer animation to make characters move and interact with their environment.
---

[Inverse Kinematics](https://en.wikipedia.org/wiki/Inverse_kinematics) (IK) is a common technique in computer animation to efficiently make characters move and interact realistically with their environment. The process of creating a realistic movement for a character often requires many iterations and minor adjustments of the various joints. With IK, you can pose and animate multiple character parts by posing or adjusting a single object.

This animation technique can provide solutions to the following examples:

<GridContainer numColumns="3">
	<figure>
		<video controls src="../assets/animation/inverse-kinematics/IK-Place-Hand.mp4" width="90%"></video>
		<figcaption>Grab and pose a character's hand while automatically adjusting the related limbs, such as the wrist, elbow, and shoulder.</figcaption>
	</figure>
	<figure>
		<video controls src="../assets/animation/inverse-kinematics/IK-Uneven-Surfaces.mp4" width="90%"></video>
		<figcaption>Make a character's feet interact realistically on different surfaces and slopes.</figcaption>
	</figure>
   <figure>
		<video controls src="../assets/animation/inverse-kinematics/IK-Drag-Accessory.mp4" width="90%"></video>
		<figcaption>Grab and move a single target object to quickly create realistic interactions with your character and props.</figcaption>
	</figure>
</GridContainer>

## IKControl

You can use an `Class.IKControl` to procedurally add IK to your character rigs outside of the **Animation Editor**. Studio allows you to programmatically apply IK to all characters, such as R15, Rthro, and custom imported skinned characters, to create realistic movement and interactions in your experience.

When adding an `Class.IKControl`, set the [required properties](#required-properties) correctly to avoid unexpected and unnatural animation results. As with all animation, [test your IKControls](#test-ikcontrols) to ensure that you achieve the desired behavior.

### Required properties

When adding a `Class.IKControl` to your character's `Class.Humanoid` or `Class.AnimationController`, you must set the following required properties to enable IK:

<table>
<thead>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.IKControl.Type|Type`</td>
    <td>Specifies the behavior type of the IK control. See `Enum.IKControlType` for the list of behavior options. Common behavior types are `Position` or `Transform`.</td>
  </tr>
  <tr>
    <td>`Class.IKControl.EndEffector|EndEffector`</td>
    <td>A `Class.BasePart` or `Class.Bone` in your character rig that tracks toward the `Class.IKControl.Target|Target`. For example, you can set a **LeftHand** bone as a `Class.IKControl.EndEffector|EndEffector` to reach a doorknob object set as the `Class.IKControl.Target|Target`.</td>
  </tr>
  <tr>
    <td>`Class.IKControl.Target|Target`</td>
    <td>The object the `Class.IKControl.EndEffector|EndEffector` reaches or points toward. A `Class.IKControl.Target|Target` can be any object with a world position.</td>
  </tr>
  <tr>
    <td>`Class.IKControl.ChainRoot|ChainRoot`</td>
    <td>Defines the chain of `Class.BasePart|BaseParts` or `Class.Bone|Bones` that the `Class.IKControl` affects. All connected parts between the `Class.IKControl.ChainRoot|ChainRoot` and the `Class.IKControl.EndEffector|EndEffector` are affected by the `Class.IKControl` using the behavior type defined. <br /><br /> For example, if your character's **LeftHand** is set as the `Class.IKControl.Target|Target`, you can apply IK to the entire left arm by setting `Class.IKControl.ChainRoot|ChainRoot` to the **LeftUpperArm**. To apply IK just to the parts below the elbow, set `Class.IKControl.ChainRoot|ChainRoot` to the **LeftLowerArm**.</td>
  </tr>
</tbody>
</table>

### Test IKControls

You can add and edit `Class.IKControl` programmatically or directly through the **Explorer**. You can even add and make changes to `Class.IKControl` during a Play test to quickly check how various properties affect a character's movements.

To quickly test your `Class.IKControl` using an `Class.Attachment` as a target:

1. From Studio's mezzanine, [initiate a playtest](../studio/testing-modes.md#playtesting).
2. In the **Explorer**, navigate to **Workspace** → your user's `Class.Model`. This `Class.Model` instance is named as your current Roblox account.
3. Click the **⊕** icon next to your character model's `HumanoidRootPart` and add an **Attachment**.

   <img src="../assets/animation/inverse-kinematics/IK-Add-Attachment.png"
   width="40%" />

4. Select the **Attachment** and use the **Move** tool to position the object in front of your character in the viewport.

   <img src="../assets/animation/inverse-kinematics/IK-Move-Attachment.png"
   width="40%" />

5. In the **Explorer** window, select the **⊕** icon next to your character's `Class.Humanoid` and add an **IKControl**.

   <img src="../assets/animation/inverse-kinematics/IK-Humanoid-Add.png"
   width="40%" />

6. Select the `Class.IKControl` and set the following property values in the **Properties** window:

   1. **Type**: Select `Transform` from the dropdown.
   2. **EndEffector**: Select your model's **LeftHand** `Class.MeshPart` in the **Explorer**.
   3. **Target**: Select the newly created **Attachment** object in the **Explorer**.
   4. **ChainRoot**: Select your model's **LeftUpperArm** `Class.MeshPart` in the **Explorer**.

   <GridContainer numColumns="2">
     <figure>
       <img src="../assets/animation/inverse-kinematics/IK-IKControl-Property.png" width="80%" />
       <figcaption>IKControl Properties</figcaption>
     </figure>
     <figure>
       <img src="../assets/animation/inverse-kinematics/IK-Explorer-Humanoid.png" width="67%" />
       <figcaption>Explorer - Character Model</figcaption>
     </figure>
   </GridContainer>

   Your character's left arm should now reach for the target `Class.Attachment`. You can experiment with moving the `Class.Attachment` or editing the `Class.IKControl` properties to achieve different results.

   <video controls src="../assets/animation/inverse-kinematics/IK-Drag-Hand.mp4" width="40%"></video>

### Add constraints

You can use `Class.Constraint|Constraints` to restrict how joints can move when reaching its target. Constraints can ensure joints like the elbows and knees bend naturally, or to make the mechanical joints rotate in a specific orientation.

<GridContainer numColumns="2">
<figure>
<img src="../assets/animation/inverse-kinematics/elbow-unnatural-pose.png"/>
<figcaption>Elbow bending unnaturally</figcaption>
</figure>

<figure>
<img src="../assets/animation/inverse-kinematics/elbow-natural-pose.png"/>
<figcaption>Elbow bending correctly</figcaption>
</figure>
</GridContainer>

To add constraints to your character using `Class.IKControl`, your `Class.IKControl` and constraint must meet the following conditions:

- The attachments referenced in the constraint's `Class.Constraint.Attachment0|Attachment0`/`Class.Constraint.Attachment1|Attachment1` properties attaches to the same parts as the `Class.Motor6D` `Class.Motor6D.Part0|Part0`/`Class.Motor6D.Part1|Part1`.
- The relative positions of `Class.Constraint.Attachment0|Attachment0`/`Class.Constraint.Attachment1|Attachment1` must equal the corresponding positions of the `Class.Motor6D` `Class.Motor6D.C0|C0`/`Class.Motor6D.C1|C1` CFrames.
- The constraint and the IKControl share the same parent `Class.Model`.

The following instructions describe the process of adding a `Class.HingeConstraint` to restrict the rotation of a character's elbow and adding a `Class.BallSocketConstraint` to the wrist to limit the rotation angle.

#### Elbow

Roblox R15 characters already include attachments in their joints that you can use to apply the elbow constraint. For the elbow, both the LeftUpperArm and the LeftLowerArm include a `LeftElbowRigAttachment`. Along with adding a constraint, you also need to add additional child attachments to each part's `LeftElbowRigAttachment` to specify which axis the elbow can rotate about.

To add the `Class.HingeConstraint` and child attachments:

1. In the **Explorer**, locate your model's **LeftLowerArm** and click the **⊕ button**.
2. Add a **HingeConstraint** with the name `LeftElbowConstraint`.
3. In the **Explorer**, navigate to the **LeftUpperArm.LeftElbowRigAttachment** and add an attachment:

   1. Click the **⊕ button** to add an **Attachment** with the name `LeftElbowConstraintAttachment0`.
   2. In the viewport, select the attachment and use the **Rotate tool** to rotate the attachment so the yellow **PrimaryAxis** is the axis of your elbow's expected rotation.

      <img src="../assets/animation/inverse-kinematics/elbow-primary-axis.png" width = "40%"/>

   3. Set the **LeftElbowConstraint.Attachment0** property to this new attachment.

4. In the **Explorer**, navigate to your model's **LeftLowerArm.LeftElbowRigAttachment** add an attachment:

   1. Click the **⊕ button** and add an **Attachment** with the name `LeftElbowConstraintAttachment1`.
   2. Set the **LeftUpperArm.LeftElbowConstraint.Attachment1** property to this new attachment.
   3. Copy the **LeftElbowConstraintAttachment0.CFrameOrientation** property and paste it as the **LeftElbowConstraint.Attachment1.CFrameOrientation** value.

   <img src="../assets/animation/inverse-kinematics/elbow-natural-pose.png"/>

<Alert severity = 'error'>
If you see a red arrow on the constraint's visualization, that means your attachment orientations are violating the hinge constraint. Go back and make sure the **LeftElbowConstraintAttachment1** has the same orientation as the **LeftElbowConstraintAttachment0**.
</Alert>

Test your IKControl to verify the elbow only rotates about its hinge axis:
<video controls src="../assets/animation/inverse-kinematics/hinge-constraint.mp4" width="100%"></video>

#### Wrists

Even with the elbow constraint, the IKControl can still produce unrealistic poses with the wrists.

<figure>
<img src="../assets/animation/inverse-kinematics/wrist-unnatural-pose.png" width = "40%"/>
<figcaption>The wrist bends unnaturally at certain orientations</figcaption>
</figure>

You can improve this by adding a `Class.BallSocketConstraint` to limit the rotation of the wrist. While this is similar to the process for adding a `Class.HingeConstraint` to the elbow, you can use the `Class.BallSocketConstraint.LimitsEnabled|LimitsEnabled` property on this constraint to further control the range of motion of the wrist.

To add a `Class.BallSocketConstraint` for the wrist:

1. In the **Explorer**, locate your model's **LeftHand** and click the **⊕ button**.
   1. Add a **BallSocketConstraint** with the name `LeftWristConstraint`.
2. Locate your model's **LeftLowerArm.LeftWristRigAttachment** and add an attachment:
   1. Click the **⊕ button** and add an **Attachment** with the name `LeftWristConstraintAttachment0`.
   2. In the viewport, select the attachment and use the **Rotate tool** to rotate the attachment so the yellow PrimaryAxis points toward the model's fingertips.
      <img src="../assets/animation/inverse-kinematics/wrist-primary-axis.png" width = "40%"/>
   3. Set the **LeftWristConstraint.Attachment0** property to the new `LeftWristConstraintAttachment0`.
3. Locate your model's **LeftHand.LeftWristRigAttachment** and add an attachment:
   1. Click the **⊕ button** and add an **Attachment** with the name `LeftWristConstraintAttachment1`.
   2. Copy the **LeftWristConstraintAttachment0.CFrameOrientation** property and paste it as the **LeftWristConstraintAttachment1.CFrameOrientation** property.
   3. Set the **LeftWristConstraint.Attachment1** property to this new **LeftWristConstraintAttachment1**.
4. In the **Explorer**, select the **LeftWristConstraint**.
5. In the **Properties** window, set the following:
   1. Enable **LimitsEnabled**.
   2. Set **UpperAngle** to `80`. This controls how much the constraint's axis can rotate, and 80 degrees is approximately how much the wrist should be able to bend.
6. Depending on your character you may want to tweak the direction the cone is pointing in. You can do this by using the **Rotate tool** to rotate the constraint's **Attachment0**.

When selecting the **LeftWristConstraint**, a green cone appears visualizing the wrist's range of motion.

<img src="../assets/animation/inverse-kinematics/wrist-cone.png" width = "40%"/>

With the constraint set up, test the IKControl with the hand pointing down in front of the character and the wrist should rotate and bend more realistically.

<video controls src="../assets/animation/inverse-kinematics/ball-socket-constraint.mp4" width="100%"></video>
