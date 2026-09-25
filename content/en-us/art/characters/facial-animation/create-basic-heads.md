---
title: Create basic dynamic heads
description: The process of creating a basic animatable head in Blender.
---

<Alert severity="warning">
**This tutorial covers advanced topics.** Before you begin, you should have prior knowledge on modeling, UV mapping, rigging, animation, and how to set up a character in [Blender](https://www.blender.org) or [Maya](https://www.autodesk.com/products/maya/overview).
</Alert>

Dynamic heads are character heads that contain components that allow you to:

- Set default custom facial expressions.
- Equip face accessories, such as eyebrows and eyelashes, that deform with your facial expressions.
- Trigger emotes that combine both face and body animations.

<video controls width="90%" src="../../../assets/avatar/dynamic-heads/Blocky_And_Goblin_Dynamic_Heads.mp4">
</video> <br />

You can create or modify an existing model to become a dynamic head in third-party modeling software, such as [Blender](https://www.blender.org) or [Maya](https://www.autodesk.com/products/maya/overview). When creating a dynamic head, your character body model must meet the following requirements:

- The character body must follow Roblox's [modeling requirements](#modeling-requirements) and include appropriate head geometry, such as eyes, a mouth, and teeth.
- The character body's head must include a [rig](#rig-and-skin-the-head), or internal joint structure, to drive the various deformation of vertices to create facial expressions.
- The character body must have their facial poses [saved to the animation timeline](#pose-the-joints) and [mapped to the head mesh](#map-each-pose). Typical dynamic heads include [50 standard base poses](../../../avatar/dynamic-heads/facs-poses-reference.md) that allow for a diverse range of expressions.

To help you meet these requirements, this tutorial covers the processes of adding facial joints, posing them into facial expressions, and mapping 5 basic FACS poses on a Cubie reference character in Blender, as well as how to export the model for import into Studio.

<Alert severity="info">
This tutorial uses <a href="https://www.blender.org/download/releases/5-2/">Blender version 5.2</a>. If you are using another version of Blender, there might be minor differences in UI and settings.
</Alert>

## Reference files

The following dynamic head reference files include all checkpoint references throughout this tutorial:

<Alert severity = 'warning'>
The reference Cubie character model is for educational purposes only. It does not meet the technical avatar [character body specifications](../../../avatar/character-bodies/specifications.md) to be ready for the Marketplace.
</Alert>

<table>
  <thead>
    <tr>
      <th>Reference files</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>[Cubie-Model-Only.blend](../../../assets/avatar/dynamic-heads/creating-dynamic-heads/reference-files/Cubie-Model-Only.blend)</td>
      <td>A Blender project file containing a Cubie character model with a [standard R15 rig](../../../avatar/character-bodies/specifications.md#standard-r15-rigs) without facial data. </td>
    </tr>
    <tr>
      <td>[Cubie-Eye-Bones-Skinned.blend](../../../assets/avatar/dynamic-heads/creating-dynamic-heads/reference-files/Cubie-Eye-Bones-Skinned.blend)</td>
      <td>A Blender project file containing the example Cubie character model with skinned eye joints without posing or mapping data.</td>
    </tr>
    <tr>
      <td>[Cubie-Eye-Poses-Mapped.blend](../../../assets/avatar/dynamic-heads/creating-dynamic-heads/reference-files/Cubie-Eye-Poses-Mapped.blend)</td>
      <td>A Blender project file containing the Cubie character model with the 5 example poses saved and mapped.</td>
    </tr>
    <tr>
      <td>[Cubie-Complete.fbx](../../../assets/avatar/dynamic-heads/creating-dynamic-heads/reference-files/Cubie-Complete.fbx)</td>
      <td>A Cubie character model with a fully rigged face and over 50 poses saved and mapped. You can import this file into Studio or open it in your preferred 3D modeling software.</td>
    </tr>
    <tr>
      <td><a href="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/reference-files/Cubie_Head_ALB.png" download>Cubie-Texture_ALB.png</a></td>
      <td>A Cubie texture image file. After you import the Cubie model into Studio, you can add this file as the head part's `TextureID`.</td>
    </tr>
    <tr>
      <td>[Cubie-Complete.ma](../../../assets/avatar/dynamic-heads/creating-dynamic-heads/reference-files/Cubie-Complete.ma)</td>
      <td>A Cubie Maya project provided as additional reference.</td>
    </tr>
  </tbody>
</table>

## Modeling requirements

Many character body models that include a head with distinct facial features require minor modeling adjustments in order to be compatible as a dynamic head. When modeling your avatar characters, verify that each head mesh meets avatar [character body specifications](../../../avatar/character-bodies/specifications.md) for Studio import, as well as the following requirements:

- **Face parts** - Ensure that you include distinct face features, such as eyes, upper teeth, lower teeth, and a tongue.
- **Lip vertices** - If you want your character to use its mouth, separate the lip vertices so that the mouth can open.
- **Inner components** - If your character has inner mouth components, such as a tongue and teeth, model a mouth bag within the head mesh to contain these features. If your character uses eye sockets, model a similar eye bag to contain these features.
- **No extra data** - Ensure that all children face parts of the `Head_Geo` don't contain history or frozen transformations.
- **Outer cage** - Make sure the character model has an outer cage to support face accessories and layered accessories. For more information, see [Character body specifications - Inner and outer cages](../../../avatar/character-bodies/specifications.md#inner-and-outer-cages).

You can follow along the rest of this head creation process using a rigged Cubie character that meets these modeling requirements. This version doesn't include any facial rigging or pose data so you can use it as starting point for this tutorial.

## Rig and skin the head

**Rigging** is the process of connecting a mesh with an internal rig so that mesh surfaces can rotate and move as joints rotate and move, and **skinning** is the process of assigning which parts of the mesh surface move and rotate with specific joints. Dynamic heads require both processes so that surfaces of the head mesh can move with joints to create facial expressions.

The following instructions focus on rigging and skinning Cubie's eyes and eyelids, but you can apply these techniques to the rest of the character's facial features that require articulation, such as the character's mouth, cheeks, and jaw. After adding joints and applying skinning data, you can then create controls to help make the posing process more efficient.

<Alert severity="info">
The rigging and skinning process depends on the character model and differs between tools and 3D modelers. It's important to plan out the full range of facial poses your character requires to avoid additional adjustments to your head joints later.
</Alert>

### Add joints

Each poseable face feature of your head typically requires at least one joint, but complex features, such as eyes and mouth, might require several joints to make certain poses possible. Unlike the rest of the [character's body](../../../avatar/character-bodies/specifications.md#rigging), Studio doesn't require a specific joint hierarchy for a dynamic head. However, in order for the facial rig to work properly, the rig must include a `RootFaceJoint` joint and additional face joints to drive the bending and deformation of the face geometry.

The specific head joints your character requires depend on the poses you intend for your character. The following examples cover the process for adding 1 joint for each eye and 4 joints for the eyelids to allow for blinking, winking, and gaze direction. When creating a face rig, use less than 50 face joints where possible and keep the joints organized and specific for their associated facial features. In general, high numbers of vertices and joints can impact your game's performance.

<Alert severity="info">
This tutorial provides a [reference Cubie model](../../../assets/avatar/dynamic-heads/creating-dynamic-heads/reference-files/Cubie-Complete.fbx) that contains a complete rig with 30+ facial joints with skinning data. You can use this for a reference for unique joint placements not covered in this tutorial, such as cheeks, lips, and jaws.
</Alert>

#### RootFaceJoint

The `RootFaceJoint` is a joint that is parented under the [R15 rigging armature's](../../../avatar/character-bodies/specifications.md#rigging) head joint. This root joint must parent all other face joints. In Blender, you can quickly add a joint by **extruding** a child joint from the head joint, then mapping the joint name as a property in the `Head_Geo` mesh.

The `RootFaceJoint` object is commonly named `DynamicHead` in the reference templates and examples, but you can use any name as long as you [map the root joint](#map-each-pose) in custom properties. This allows Studio to properly locate that joint and hide all of the children joints within the `Class.FaceControls` instance on import.

To add a `RootFaceJoint` object:

1. In Blender, open the [**rigged Cubie character**](../../../assets/avatar/dynamic-heads/creating-dynamic-heads/reference-files/Cubie-Model-Only.blend) project.

   <img src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/Open-Project.png" width="70%" />

1. Click on any joint to select the armature, then switch to **Edit** mode.
1. In the Outliner, click on the **Head** joint.
1. In the viewport, press <kbd>E</kbd> and drag your mouse up to extrude an additional child joint from the **Head** joint.
1. Back in the Outliner, rename this joint **DynamicHead**. You will reference this joint by name later in the [mapping](#map-each-pose) section.

   <video controls width="80%" src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/1_Adding_RootFaceJoint.mp4"></video>

#### Eyes

Each eye requires one joint each, though you might opt to create a controller joint later that can control both eyes at the same time. To ensure that you position your joints symmetrically, you can enable **X-Axis symmetry** in the top-right of the viewport. This moves joints that share the same name with opposing suffixes along the X-axis.

To add joints to the character eyes:

1. While still in **Edit** mode, navigate to the topbar of the viewport, then click **Add** > **Single Bone**. Do this twice.
1. Rename one joint **LeftEye**, and rename the other **RightEye**.

   <video controls width="80%" src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/3_Adding_Eye_Bones.mp4"></video>

1. Adjust the joints so that they are front-facing, horizontal, and around the iris of the character's eyes:

   1. In the top right corner of the viewport, enable **X-Axis symmetry**.
   1. Using the **Move** tool, position the left or right joint centered at the model's eyes.
   1. Extend the **Item** panel, then with the joints selected:
      1. Copy the **Head Y** location to the **Tail Y** location.
      1. Set **Tail Z** to `0.2` centimeters to set the Tail Z coordinates with a `0.2` centimeters offset from the Head Z coordinates.

   <video controls width="80%" src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/4_Positioning_Eye_Bones.mp4"></video>

1. Parent the new joints to your `RootFaceJoint`.
   1. Hold <kbd>Shift</kbd> and click both **LeftEye** and **RightEye** joints.
   1. While still holding <kbd>Shift</kbd>, click the **DynamicHead** joint.
   1. Right-click in the viewport, then select **Parent** > **Make** > **With Offset** from the contextual menu.

    <video controls width="80%" src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/5_Parenting_Eye_Bones.mp4"></video>

#### Eyelids

When adding joints, you can quickly create joints parented under the `RootFaceJoint` joint by selecting existing facial joints and duplicating them. This automatically creates joints parented under the `RootFaceJoint` joint.

To add joints to the character eyelids:

1. While still in **Edit** mode, hold <kbd>Shift</kbd> and click both **LeftEye** and **RightEye** joints.
1. Hold <kbd>Shift</kbd> + <kbd>D</kbd> and click to duplicate the joints in the same position. Do this four times to create 8 total new joints.
1. With **X-Axis symmetry** still enabled, position each joints at the corners of the eyes.

    <video controls width="80%" src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/6_Adding_And_Positioning_Eyelids.mp4"></video>

1. In the Outliner, rename all joints to reflect their specific position using the following names:

   - `LeftUpperOuterEyelid`
   - `RightUpperOuterEyelid`
   - `LeftLowerOuterEyelid`
   - `RightLowerOuterEyelid`
   - `LeftUpperInnerEyelid`
   - `RightUpperInnerEyelid`
   - `LeftLowerInnerEyelid`
   - `RightLowerInnerEyelid`

    <img src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/Eyelid-Naming.png" width="70%" />

### Skin joints

You can apply skinning data to a character rig using several methods. The following example uses Blender's **Weight Paint** mode to paint which vertices a single joint can control. Skinning is typically a time consuming step for complex characters and a background in skinning and facial posing is recommended.

When applying detailed or shared influences for complex models, it's recommended to enable [Auto Normalize](../../../art/modeling/skin-a-simple-mesh.md#auto-normalize) to prevent influence conflicts between joints.

<Alert severity="info">
When parenting joints to the character using **Automatic Weights**, some of your vertices might already have influences applied. Always test your influences to make sure influence assignments are correct.
</Alert>

#### Eyes

Both eyes in the example project require full influences on the pupil within the eye geometry. Depending on the design of the eyes, you might need to adjust influences to create realistic eye poses.

To add influence to your eye joints:

1. Disable **X-Axis symmetry** so that you are only influecing the **LeftEye** joint.
1. Switch to **Object** mode, click any joint to select the armature, then hold <kbd>Shift</kbd> and click the **Head_Geo** mesh.
1. Switch to **Weight Paint** mode, then in the top right corner of the viewport, enable **Wireframe** mode to better visualize the vertices.
1. Hold <kbd>Shift</kbd> + <kbd>Ctrl</kbd> and click the **LeftEye** joint to select it. The name of the currently selected joint displays on the top left of the viewport.
1. Paint influence on the vertices within the eye. For this example, ensure that the pupils are red, or fully influenced by the selected joint.

    <video controls width="80%" src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/7_Skinning_LeftEye.mp4"></video>

1. Switch to **Object** mode, enable **Viewport Shading** to better visualize the mesh, then click on any joint to select the armature.
1. Switch to **Pose** mode, then test the influences of the eye joint by grabbing the joint and moving it. The mesh follows appropriately.

    <video controls width="80%" src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/8_Testing_LeftEye.mp4">
   </video>

1. Repeat these steps for the **RightEye** joint.

    <video controls width="80%" src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/9_Skinning_and_Testing_RightEye.mp4"></video>

#### Eyelids

Eyelid joints require their own separate influences. While the example poses only manipulate the top eyelids, being able to control the bottom corners of the eyelids is important for other poses, such as `LeftCheekRaiser` and `RightCheekRaiser`.

To add influence to the eyelid joints:

1. Switch to **Object** mode, click any joint to select the armature, then hold <kbd>Shift</kbd> and click the **Head_Geo** mesh.
1. Switch to **Weight Paint** mode, then in the top right corner of the viewport, enable **Wireframe** mode to better visualize the vertices.
1. Hold <kbd>Shift</kbd> + <kbd>Ctrl</kbd> and click the **LeftUpperOuterEyelid** joint to select it.
1. If necessary, paint influences on the closest vertices to the joint.
1. Repeat this process for each eyelid joint.

   <video controls width="80%" src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/10_Skinning_Eyelids.mp4">

   </video>

1. Switch to **Object** mode, enable **Viewport Shading** to better visualize the mesh, then click on any joint to select the armature.
1. Switch to **Pose** mode, then test the influences of the eye joint by grabbing the joint and moving it. The mesh follows appropriately.

    <video controls width="80%" src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/11_Testing_Eyelids.mp4">
   </video>

<Alert severity="info">
The [Cubie-Eye-Bones-Skinned.blend](../../../assets/avatar/dynamic-heads/creating-dynamic-heads/reference-files/Cubie-Eye-Bones-Skinned.blend) project file is available if you want to reference all of the work in the tutorial up to this checkpoint.
</Alert>

### Create controls

Since creating heads requires saving several poses consecutively, while not required, controls can help you pose your joints quickly and effectively. You can create controls by adding external controller joints that influence the internal ones, making it easier to access, pose, or reset joints to a neutral transformation.

You can create controls in many different ways. The following example uses **Bone Constraints** and simple geometrical shapes included in the reference Blender project to quickly set up easy-to-access controller joints for the character's facial joints. For more information on rigging and constraints, see Blender's documentation for details on [character rigging](https://www.youtube.com/watch?v=-gIL6VZ-bkE) and [object constraints](https://www.youtube.com/watch?v=fx33sPEAZEk).

<Alert severity="info">
Some facial features, such as a character's lips, jaws, and tongue, might require a single controller joint that controls several facial joints at once. For an example of this type of implementation, see the [Cubie-Complete.fbx](../../../assets/avatar/dynamic-heads/creating-dynamic-heads/reference-files/Cubie-Complete.fbx) reference file.
</Alert>

To start creating face joint controls:

1. Switch to **Object** mode, then select the armature.
1. Hold <kbd>Shift</kbd> + <kbd>D</kbd> to duplicate the armature, then rename the duplicate to **Controller**.
1. Switch to **Edit** mode, select all non-face joints, then right-click in the viewport and select **Delete Selected Bones** from the contextual menu.
1. Batch rename the joints to include **\_Con** as a suffix to denote them as controller joints:
   1. In the Outliner, hold <kbd>Shift</kbd> and click all the controller joints.
   1. Navigate to **Edit** > **Batch Rename**. The **Batch Rename** dialog displays.
   1. In the dialog:
      1. Click the **Selected** button.
      1. Set the dropdown menu to **Bones**.
      1. Set **Type** to **Set Name**.
      1. Set **Method** to **Suffix**.
      1. Set **Name** to **\_Con**.
      1. Click the **OK** button.

   <video controls width="80%" src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/12_Creating_Controller_Bones.mp4"></video>

1. Set bone constraints for each facial joint that requires a controller.
   1. Switch to **Object** mode, then select the original armature.
   1. Switch to **Pose** mode, click on the **LeftEye** joint, then navigate to the **Bone Constraints** tab in the Properties Editor.
   1. Click the **Bone Constraint** drowdown menu, add **Copy Location** and **Copy Rotation**, then in each constraint:
      1. Set the **Target** to **Controller**.
      1. Set **Bone** to **LeftEye_Con**.
   1. In the **Copy Rotation** constraint:
      1. In **Axis**, disable **X**, **Y**, and **Z**.
      1. In **Inverted Axis**, enable **X**, **Y**, and **Z**.
      1. Set **Mix** to **Offset (Legacy)**.
   1. Repeat this constraint process for each facial joint that requires a controller.

   <video controls width="80%" src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/13_Creating_Bone_Constraints.mp4"></video>

1. <Chip label="OPTIONAL" size="small" variant="outlined" /> Create custom joint shapes for easier control joint access.
   1. Switch to **Object** mode, then select the **Controller** armature object.
   1. Switch to **Pose** mode, then select **LeftEye_Con**.
   1. Navigate to the **Bone Properties** tab in the Properties Editor > **Viewport Display** > **Custom Shape**, then set **Custom Object** to **WDG_Eye.001**. In the reference project, the shape objects share similar names to the face joints.
   1. Set the **X** rotation to **-90**, as well as any additional scaling if required.
   1. Repeat this process for all of your controller joints. You can hide the original face joints at this point.

   <video controls width="80%" src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/14_Assigning_Custom_Shapes.mp4"></video>

1. <Chip label="OPTIONAL" size="small" variant="outlined" /> Apply color themes to your controller joints so that you can more easily visualize facial joints.
   1. Still in **Pose** mode, navigate to the Outliner, then select **LeftEye_Con**.
   1. Navigate to the **Bone Properties** tab in the Properties Editor > **Viewport Display** > **Bone Color**, then select a theme color set.
   1. Repeat this process for each controller joint, using the same color for the following:

      - One for **LeftEye** and **RightEye**.
      - One for **LeftUpperOuterEyelid** and **LeftLowerOuterEyelid**.
      - One for **LeftUpperInnerEyelid** and **LeftLowerInnerEyelid**.
      - One for **RightUpperInnerEyelid** and **RightLowerInnerEyelid**.
      - One for **RightUpperOuterEyelid** and **RightLowerOuterEyelid**.

1. Test your controllers in **Pose** mode.

    <video controls width="80%" src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/16_Testing_Controllers.mp4">
   </video>

## Pose the joints

**Posing** is the process of manipulating the joints of your head mesh into a specific position per animation frame. After the model's head has been rigged, you can begin the process of saving poses to the timeline. This data enables Studio to access each facial movement and animate or blend facial poses to create dynamic expressions.

When posing the joints of your character's head mesh to new positions, follow the [Facial Action Coding System](../../../avatar/dynamic-heads/facs-poses-reference.md) (FACS) as a reference for your facial expression poses. FACS is a comprehensive, anatomically-based system for describing all visually discernible facial movement, and it allows for all facial animations to be shareable between characters. This means that once you create a facial animation, you can reuse it for any character with an [animatable head](../../../avatar/dynamic-heads/index.md) with a `Class.FaceControls` instance.

There are [50 base poses](../../../avatar/dynamic-heads/facs-poses-reference.md) that you can use in Roblox to portray a wide range of face emotions for your characters, but only a **specific** [17 poses](../../../avatar/dynamic-heads/specifications.md#facs-poses) are required to sell a dynamic head on the Marketplace. When you are deciding which poses you need, remember that FACS pose names are always based on the orientation of the character, not the camera. For example, `LeftEyeClosed` closes the character's left eye, which is to the right of the camera view.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LeftEyeClosedA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LeftEyeClosedB.mp4" width="70%"></video>
</GridContainer>

<Alert severity="info">
You might not require every base poses for your character. For example, a simple robot that opens its mouth and blinks can just have `JawDrop`, `LeftEyeClosed`, and `RightEyeClosed`. It's recommended to save the base poses that you intend to use with your head in alphabetical order, then use any frames afterwards for [combination poses](#combination-poses).
</Alert>

Each frame within your modeling software's animation timeline can contain one unique FACS pose, so when you want to create multiple FACS poses, you must save each FACS pose to a different frame. You must also include a frame with your character having a neutral face with the face controllers and joints set to their default values. This ensures that Studio can calculate the joint position differences between your character's neutral expression and each FACS pose.

For this reason, it's important to set Frame 0 as your character's neutral expression, and save FACS poses starting at Frame 1. The following image is an example of Blender's animation timeline with 5 frames. Frame 0 has the character's neutral expression, and frames 1-4 have FACS pose data.

<img src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/Animation-Timeline.png" width="70%" />

The following steps outline the process of posing 5 poses with the facial joints created in our reference, but you can apply these steps for any additional poses for a more expressive head. To pose your face joints in Blender:

1. Ensure that the animation timeline playhead is set to the correct frame.
   1. If you are setting the character's **Neutral pose**, set it to **frame 0**.
   1. If you are posing `EyesLookLeft`, set it to **frame 1**.
   1. If you are posing `EyesLookRight`, set it to **frame 2**.
   1. If you are posing `LeftEyeClosed`, set it to **frame 3.**
   1. If you are posing `RightEyeClosed`, set it to **frame 4**.
1. In **Pose** mode, set the pose to the maximum position you want your pose to realistically use:
   1. If you are setting the character's `Neutral` pose, set the face controllers and joints to their default values,
   1. If you are posing `EyesLookLeft`, select both eye controller joints and drag the eyes to the character's left.
   1. If you are posing `EyesLookRight`, select both eye controller joints and drag the eyes to the character's right.
   1. If you are posing `LeftEyeClosed`, select both eye controller joints and drag the left eyelids down to meet the bottom eyelids.
   1. If you are posing `RightEyeClosed`, select both eye controller joints and drag the right eyelids down to meet the bottom eyelids.
1. In the viewport, press <kbd>A</kbd> to select all joints.
1. Right-click in the viewport and select **Insert Keyframe with Keying Set** > **Location and Rotation**. This ensures that each frame contains the positional and rotational information for all joints.

   <video controls width="80%" src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/17-Posing.mp4">
   </video>

When all the poses are saved in your timeline, set the Start and End of the animation timeline to represent the number of frames with saved poses. Always set **Start** to **0** and, in this specific example, you can set the **End** to **4** if you are only mapping the 4 non-neutral example poses.

<img src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/Animation-Frame-Range.png" width="70%" />

### Combination poses

You can combine 2-3 base FACS poses in a single animation frame to display complex facial expressions. However, when you combine FACS poses that control the **same** facial regions, the facial features might either collide or disfigure the character.

For example, both `LeftEyeClosed` and `LeftCheekRaiser` control movement around the character's left eye: `LeftEyeClosed` closes the eye, and `LeftCheekRaiser` lifts the cheek up and pushes the lower eyelid up, causing a squint-like effect. When you combine both poses with one or more at 100% of their values, the lower eyelid collides with the upper eyelid:

<GridContainer numColumns="3">
  <figure>
    <video controls src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/Combination_Example1.mp4"></video>
    <figcaption>Both FACS poses concurrently ease to 100% of their default values.</figcaption>
  </figure>
  <figure>
    <video controls src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/Combination_Example2.mp4"></video>
    <figcaption>LeftEyeClosed eases to 100% of its default value, and LeftCheekRaiser starts at 100%.</figcaption>
  </figure>
  <figure>
    <video controls src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/Combination_Example3.mp4"></video>
    <figcaption>LeftCheekRaiser eases to 100% of its default value, and LeftEyeClosed starts at 100%.</figcaption>
  </figure>
</GridContainer>

A **combination pose**, or **corrective**, is the combination of 2-3 FACS poses that control the same facial features in a single animation frame with a **corrective difference from 100% of their default values**. By defining and mapping a combination pose to your head, you can correct how you want the two or more FACS poses to combine. For example, if you add a corrective for each of the previous use cases, the lower and upper eyelids make contact with each other without colliding:

<GridContainer numColumns="3">
  <figure>
    <video controls src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/Combination_Example4.mp4"></video>
    <figcaption>Using a corrective pose, both FACS poses concurrently ease to 100% of their default values.</figcaption>
  </figure>
  <figure>
    <video controls src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/Combination_Example5.mp4"></video>
    <figcaption>LeftEyeClosed eases to 100% of its default value, and LeftCheekRaiser starts at 100%.</figcaption>
  </figure>
  <figure>
    <video controls src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/Combination_Example6.mp4"></video>
    <figcaption>LeftCheekRaiser eases to 100% of its default value, and LeftEyeClosed starts at 100%.</figcaption>
  </figure>
</GridContainer>

On import, Studio calculates and stores the corrective difference for combination poses in the head's `Class.FaceControls` instance, and the `Class.FaceControls` instance corrects the base poses values as they combine in the [Animation Editor](../../../animation/editor.md).

## Map each pose

<Alert severity="error">
If you don't map your poses, leave any empty strings, or try to import the head into Studio with multiple frames per FACS pose name, the head will fail the [import process](../../../avatar/dynamic-heads/test.md).
</Alert>

After you finish posing each FACS pose that your character needs, you must map **each animation frame that you pose** to its corresponding FACS base or combination pose name. Mapping stores the joint positions and translations within the head `Class.MeshPart`, and when you begin to animate your head within the **Animation Editor**, the `Class.FaceControls` instance uses this stored data to transform your character's facial features to the applicable FACS pose.

In addition to your facial poses, you need to map the `RootFaceJoint` so that Studio can properly locate it and hide all of the children joints within the `Class.FaceControls` instance on import. Remember, only a **specific** [17 poses](../../../avatar/dynamic-heads/specifications.md#facs-poses) are required to sell a dynamic head on the Marketplace.

To map your saved poses and the `RootFaceJoint`:

1. Switch to **Object** mode, then select **Head_Geo**.
1. In the **Object Properties** tab of the Properties Editor, navigate to the **Custom Properties** section, then click the **New** button. A new custom property displays underneath the **New** button.

   <BaseAccordion>
   <AccordionSummary>
   <Typography variant='buttonLarge'>Using Maya?</Typography>
   </AccordionSummary>
   <AccordionDetails>
   If you are using Maya, you can map the `RootFaceJoint` and facial pose data using the **Extra Attributes** in a similar format as Blender's **Custom Properties**. To add attributes:

   1. Select the `Head_Geo` object and navigate to the Attribute Editor.
   1. Under the **Attributes** dropdown, select **Add Attributes...**.
   </AccordionDetails>
   </BaseAccordion>

   <img src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/Mapping-New-Button.png" width="50%" />

1. To the right of the new custom property, click the **Gear Icon**. The **Edit Property** pop-up displays.
1. In the pop-up:
   1. Click the **Type** dropdown, then select **String**.
   1. In the **Property Name** field:
      - If you are mapping the `RootFaceJoint`, input **RootFaceJoint**.
      - If you are mapping a pose, input the **frame number** you are mapping, **Frame0** for example.
   1. Leave the **Default Value** and **Description** fields empty, then click the **OK** button. The new custom property updates with your new property name.
1. In the field to the right of the custom property name:
   - If you're mapping the `RootFaceJoint`, input **DynamicHead**.
   - If you're mapping a base pose, input the corresponding [FACS base pose](../../../avatar/dynamic-heads/facs-poses-reference.md) or combination pose name exactly as it is spelled.
   - If you're mapping a combination pose, input each base pose you are combining separated by an underscore, such as **Funneler_JawDrop_Pucker**.
1. Press **Enter**.

    <video controls width="80%" src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/18_Mapping.mp4"></video>

    <video controls width="80%" src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/2_Mapping_RootFaceJoint.mp4"></video>

As you repeat this process, every additional custom property you create displays in the **Custom Properties** section of the **Object Properties** tab of the Properties Editor.

<img src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/Custom-Properties-Example.png" width="40%" />

<Alert severity="info">
The [Cubie-Eye-Poses-Mapped.blend](../../../assets/avatar/dynamic-heads/creating-dynamic-heads/reference-files/Cubie-Eye-Poses-Mapped.blend) project file is available if you want to reference all of the work in the tutorial up to this checkpoint. Be sure to set the Animation Offset property to `0` when you import the character so that it includes Frame 0 on the timeline.

<img src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/Animation-Offset-Importing.png" width="40%" />

</Alert>

## Export your character

After you finish posing and mapping your head for your character, you can export the character model as a `.fbx` to import into Studio, allowing you to access the 4 eye poses using the `Class.FaceControls` instance in Studio. You can also reference the fully configured Cubie head `.fbx` to access all 50+ base poses.

To export the basic head model as a `.fbx`:

1. In the Outliner, unhide all objects, make them selectable, then select everything in your project under the **Objects** collection.
1. In the topbar, click **File** > **Export** > **FBX (.fbx)**. The **Blender File View** window displays.
1. In the **Include** section,
   1. Enable **Limit To** > **Selected Objects**. Note that this step is optional if you do not have additional collections in your Blender project.
   1. Enable **Custom Properties**.
1. In the **Armature** section, disable **Add Leaf Bones**.
1. Enable and expand **Animation**, then uncheck **NLA Strips**, **All Actions**, and **Force Start/End Keyframes**.
1. Click the **Export FBX** button and save the `.fbx` to the directory of your choice.

At this point, you can now import the `.fbx` into Studio as a character with a supported animatable head. For model import and usage instructions, see [Test heads in Studio](../../../avatar/dynamic-heads/test.md).

<Alert severity="warning">
When importing Cubie into Studio, make sure to also save the head texture <a href="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/reference-files/Cubie_Head_ALB.png" download>Cubie-Texture_ALB.png</a> which you can apply to the head mesh of the imported character as a TextureID.
</Alert>
