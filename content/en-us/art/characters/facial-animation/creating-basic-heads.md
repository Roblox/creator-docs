---
title: Creating Basic Heads
description: The process of creating a basic animatable head in Blender.
---

<Alert severity="warning">
   <b>This guide covers advanced topics.</b> Before you begin, you should have prior knowledge on modeling, UV mapping, rigging, animation, and how to set up a character in [Blender](https://www.blender.org) or [Maya](https://www.autodesk.com/products/maya/overview).
</Alert>

You can create or modify an existing model to support animated heads in a third-party modeling software, such as [Blender](https://www.blender.org) or [Maya](https://www.autodesk.com/products/maya/overview). When creating a head, your character model must meet the following requirements:

- The model follows standard [modeling requirements](#modeling-requirements), and includes head geometry, such as eyes, a mouth, and teeth.
- The model's head must include a [rig](#rigging), or internal bone structure. These bones drive the various deformation of vertices to create facial expressions. You can create a [control system](#adding-controls) to simplify the posing process.
- The model has facial poses [saved to the animation timeline](#posing) and [mapped to the head mesh](#mapping). Typical animatable heads include [50 standard base poses](../../../art/characters/facial-animation/facs-poses-reference.md) that allow for a diverse range of expressions.

To meet these requirements, you can apply the steps in this guide when designing and posing your own head. This guide covers the basic processes of adding facial bones, posing, and mapping 5 basic FACS poses in Blender on a simplified reference character (Cubie), then exporting the model.

<Alert severity="info">
   For reference, this guide uses <a href="https://www.blender.org/download/releases/3-0/">Blender version 3.0</a>. If you are using another version of Blender, there might be minor differences in UI and settings.
</Alert>

## Reference Files

The following are head reference files, including all example files from this guide:

<Alert severity = 'warning'>
The reference character model provided is meant for educational purposes and does not meet the avatar character [technical specifications](../../../art/characters/specifications.md) for general use.
</Alert>

<table>
  <thead>
    <tr>
      <th>Reference Files</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>[Cubie-Model-Only.blend](../../../assets/avatar/dynamic-heads/creating-dynamic-heads/reference-files/Cubie-Model-Only.blend)</td>
      <td>A Blender project file containing a R15 Cubie character model without facial data. </td>
    </tr>
    <tr>
      <td>[Cubie-Eye-Bones-Skinned.blend](../../../assets/avatar/dynamic-heads/creating-dynamic-heads/reference-files/Cubie-Eye-Bones-Skinned.blend)</td>
      <td>A Blender project file containing the example Cubie character model with skinned eye bones without posing or mapping data.</td>
    </tr>
    <tr>
      <td>[Cubie-Eye-Poses-Mapped.blend](../../../assets/avatar/dynamic-heads/creating-dynamic-heads/reference-files/Cubie-Eye-Poses-Mapped.blend)</td>
      <td>A Blender project file containing the Cubie character model with the 5 example poses saved and mapped.</td>
    </tr>
    <tr>
      <td>[Cubie-Complete.fbx](../../../assets/avatar/dynamic-heads/creating-dynamic-heads/reference-files/Cubie-Complete.fbx)</td>
      <td>A Cubie character model with a fully rigged face and over 50 poses saved and mapped. You can import this file into Studio, or open the file in your preferred 3D modeling software.</td>
    </tr>
    <tr>
      <td><a href="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/reference-files/Cubie_Head_ALB.png" download>Cubie-Texture_ALB.png</a></td>
      <td>A Cubie texture image file. After you import the Cubie model into Studio, you can add this file as the head part's <b>TextureID</b>.</td>
    </tr>
    <tr>
      <td>[Cubie-Complete.ma](../../../assets/avatar/dynamic-heads/creating-dynamic-heads/reference-files/Cubie-Complete.ma)</td>
      <td>A Cubie Maya project provided as additional reference. </td>
    </tr>
  </tbody>
</table>

## Modeling Requirements

Many character models already include a head with distinct facial features, but they might require minor modeling adjustments for head compatibility. When modeling a character with a head, ensure the head mesh meets the [Avatar character specifications](../../../art/characters/specifications.md) for Studio import, as well as the following requirements:

- **Face parts** - Ensure that you include distinct face features, such as eyes, upper teeth, lower teeth, and a tongue.
- **Lip vertices** - If you want your character to use its mouth, separate the lip vertices so that the mouth can open.
- **Inner components** - If your character has inner mouth components, such as a tongue and teeth, model a mouth bag within the head mesh to contain these features. If your character uses eye sockets, model a similar eye bag to contain these features.
- **No extra data** - Ensure that all children face parts of the Head_Geo don't contain history or frozen transformations.
- **Outer cage** - Make sure the character model has an outer cage to support face accessories and layered clothing. For more information, see [Cage Mesh Requirements](../../../art/characters/specifications.md#inner-and-outer-cages).

You can follow along the rest of this head creation process using a [rigged Cubie character](../../../assets/avatar/dynamic-heads/creating-dynamic-heads/reference-files/Cubie-Model-Only.blend) that meets these modeling requirements. This version doesn't include any facial rigging or pose data so you can use it as reference in this guide.

## Rigging

Your character must have an internal bone structure to drive the vertices of the face geometry and make facial poses. Unlike [rigging a humanoid model](../../../art/modeling/rigging-a-humanoid-model.md), Studio doesn't require a specific bone hierarchy for a head. However, in order for the facial rig to work properly, the rig must include a [RootFaceJoint](#rootfacejoint) bone and [additional face bones](#face-bones).

### RootFaceJoint

The **RootFaceJoint** is a bone that is parented under the standard R15 head bone. This RootFaceJoint bone does not control any vertices, but it must parent all other face bones. In Blender, you can quickly add a bone by **extruding** a child bone from the head bone and then map the bone name as a property in the Head_Geo mesh.

To add a RootFaceJoint bone:

1. In Blender, open the **Cubie-Model-Only.blend** project.
   <img src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/Open-Project.png" width="70%" />

2. Click on any bones to select the armature, then switch to **Edit Mode**.
3. In the **Outliner**, click on the **Head** bone.
4. In the **Viewport**, press <kbd>E</kbd> and drag your mouse up to extrude an additional child bone from the **Head** bone.
5. In the **Outliner**, rename this bone **Face**.

    <video controls width="80%" src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/1_Adding_RootFaceJoint.mp4">
   </video>

<Alert severity="warning">
   You must <a href="#mapping">map</a> the RootFaceJoint so Studio can properly locate that joint and hide all of the children joints and their bones within the `Class.FaceControls` instance on import.
</Alert>

### Face Bones

Face bones drive the bending and deformation of the face geometry. Each poseable face feature of your head typically requires at least one bone. Complex features, such as eyes and mouth, might require several bones to make certain poses possible.

The rigging and skinning process depends on the character model and differs between tools and modelers. It's important to plan out the full range of facial poses your character requires to avoid additional adjustments to your head bones later.

The following instructions describe a basic process of [adding face bones](#adding-face-bones) and [skinning](#skinning-face-bones), or applying influences, to the reference model's **eyes** and **eyelids**. You can continue to apply this technique to the rest of the facial features that need articulation, such as the character's mouth, cheeks, and jaw. After adding your bones and applying influences, you can create [controls](#adding-controls) that can help make the next posing process more efficient.

<Alert severity="info">
   You can download a [reference Cubie model](../../../assets/avatar/dynamic-heads/creating-dynamic-heads/reference-files/Cubie-Complete.fbx) with a completed rig with 30+ facial bones added and skinned. You can use this for a reference for unique bone placements not covered in this guide, such as cheeks, lips, and jaws.
  
   See [Using Heads in Studio](../../../art/characters/facial-animation/using-heads-in-studio.md) for download links of more complex characters.
</Alert>

#### Adding Face Bones

The specific head bones your character requires depend on the poses you intend for it to use. The following examples cover the process for adding 1 bone for each eye and 4 bones for the eyelids to allow for blinking, winking, and gaze direction.

When creating a face rig, use less than 50 face bones where possible and keep the bones organized and specific for their associated facial features. In general, high numbers of vertices and joints can impact your experience's performance.

##### Eyes

Each eye requires one bone each, though you might opt to create a controller bone later that can control both eyes at the same time. To ensure that you position your bones symmetrically, you can enable **X-Axis Mirror** in the top-right of the Viewport. This moves bones that share the same name with opposing suffixes along the X-axis.

To add bones to the character eyes:

1. In **Object Mode**, select the **armature** and switch to **Edit Mode**.
2. Click **Add**, then **Single Bone**. Do this twice.
3. Rename one bone **LeftEye**, and rename the other **RightEye**.

    <video controls width="80%" src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/3_Adding_Eye_Bones.mp4">
   </video>

4. Enable **X-Axis Mirror**.
5. Position the left or right bone centered at the model's eyes.
6. Adjust the bones horizontally and front-facing. A quick method for setting bones horizontally:

   1. In the top right of the **Viewport**, extend the **Tool Panel** to the **Transform** section.
   2. With the bones selected, copy the **Head Y** location to the **Tail Y** location.
   3. Set the **Tail Z** to **0.2** centimeters. This sets the Tail Z coordinates 0.2 centimeters offset from the Head Z coordinates.

    <video controls width="80%" src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/4_Positioning_Eye_Bones.mp4">
   </video>

7. Hold <kbd>Shift</kbd> and click both **Eye** bones.
8. While still holding <kbd>Shift</kbd>, click the **Face** bone.
9. Right-click in the viewport. A contextual menu displays.
10. Select **Parent**, **Make**, then **With Offset**.

    <video controls width="80%" src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/5_Parenting_Eye_Bones.mp4">
    </video>

##### Eyelids

When adding bones, you can quickly create bones parented under the Face bone by selecting existing facial bones and duplicating them. This automatically creates bones parented under the Face bone.

To add bones to the character eyelids:

1. In **Edit Mode**, hold <kbd>Shift</kbd> and click both **eye bones** to select them.
2. Press <kbd>Shift</kbd><kbd>D</kbd> and click to duplicate the bones in the same position. Do this four times to create 8 total new bones.
3. With **X-Axis mirror enabled**, position each bone at the corners of the eyes.

    <video controls width="80%" src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/6_Adding_And_Positioning_Eyelids.mp4">
   </video>

4. In the **Outliner**, rename all bones to reflect their specific position. Use the following names:

   1. LeftUpperOuterEyelid
   2. RightUpperOuterEyelid
   3. LeftLowerOuterEyelid
   4. RightLowerOuterEyelid
   5. LeftUpperInnerEyelid
   6. RightUpperInnerEyelid
   7. LeftLowerInnerEyelid
   8. RightLowerInnerEyelid

    <img src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/Eyelid-Naming.png" width="70%" />

#### Skinning Face Bones

You can apply [skinning](../../../art/modeling/rigging.md) to a character rig using several methods. The following example uses Blender's **Weight Paint** mode to paint which vertices a single bone can control. Skinning is typically a time consuming step for complex characters and a background in skinning and facial posing is recommended.

When applying detailed or shared influences for complex models, it's recommended to enable [Auto Normalize](../../../art/modeling/skinning-a-simple-mesh.md#auto-normalize) to prevent influence conflicts between bones.

<Alert severity="info">
   When parenting bones to the character using <b>Automatic Weights</b>, some of your vertices might already have influences applied. Always test your influences to make sure influence assignments are correct.
</Alert>

##### Eyes

Both eyes in the example project require full influences on the pupil within the eye geometry. Depending on the design of the eyes, you might need to adjust influences to create realistic eye poses.

To add influence to the LeftEye:

1. In **Object Mode**, click the head mesh, then hold <kbd>Shift</kbd> and click any bone to select the armature.
2. Switch to **Weight Paint Mode**.
3. Toggle to **X-Ray viewing mode** or **Material Preview Mode** to better visualize the vertices.
4. Hold <kbd>Shift</kbd> and click the **LeftEye** bone to select it. The name of the currently selected bone displays on the top left of the Viewport.
5. Paint influence on the vertices within the eye. For this example, ensure that the pupils are red, or fully influenced by the selected bone.

    <video controls width="80%" src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/7_Skinning_LeftEye.mp4">
   </video>

6. Switch to **Object Mode**, then click on any bone to select the armature.
7. Switch to **Pose Mode** with the armature selected.
8. Test the influences of the eye bone by grabbing the bone and moving it. The mesh below should follow.

    <video controls width="80%" src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/8_Testing_LeftEye.mp4">
   </video>

9. Repeat these steps for the right eye.

    <video controls width="80%" src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/9_Skinning_and_Testing_RightEye.mp4">
   </video>

##### Eyelids

Eyelid bones require their own separate influences. While the example poses only manipulate the top eyelids, being able to control the bottom corners of the eyelids is important for other poses, such as `LeftCheekRaiser` and `RightCheekRaiser`.

To add influence to the left eyelid:

1. In **Object Mode**, click the head mesh, then hold <kbd>Shift</kbd> and click any bone.
2. Switch to **Weight Paint Mode**.
3. Switch to **X-Ray viewing mode** or **Material Preview Mode** to better visualize the vertices.
4. Paint influences on the closest vertices to the bone.
5. When complete, hold <kbd>Shift</kbd> and click another bone to begin applying influences to the closest vertices. Perform this step for each eyelid bone.

   <video controls width="80%" src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/10_Skinning_Eyelids.mp4">

   </video>

6. Switch to **Object Mode**, select the character mesh, then switch to **Pose Mode** to test.

    <video controls width="80%" src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/11_Testing_Eyelids.mp4">
   </video>

You can download [a version of this project](../../../assets/avatar/dynamic-heads/creating-dynamic-heads/reference-files/Cubie-Eye-Bones-Skinned.blend) with the bones skinned up to this point as reference.

#### Adding Controls

Since creating heads requires saving several poses consecutively, while not required, controls can help you pose your bones quickly and effectively. You can create controls by adding external controller bones that influence the internal ones, making it easier to access and pose as well as reset to a neutral transformation.

You can create controls in many different ways. The following example uses **Bone Constraints** and simple geometrical shapes included in the reference Blender project to quickly set up easy-to-access controller bones for the character's facial bones. For more information on rigging and constraints, see Blender's documentation for additional details on [character rigging](https://www.youtube.com/watch?v=-gIL6VZ-bkE) and [object constraints](https://www.youtube.com/watch?v=fx33sPEAZEk).

<Alert severity="info">
   Some facial features, such as lips, jaws, and tongue, might require a single controller bone that controls several facial bones at once. See the complete reference file for an example of this type of implementation.
</Alert>

To start creating face bone controls:

1. In **Object Mode**, select the Joints armature and press <kbd>Shift</kbd><kbd>D</kbd> to duplicate the Joints armature object.
2. Rename the new armature to **Controller**.
3. In **Edit Mode**, select all non-face bones, right click and select **Delete Selected Bones**.
4. Rename the bones to include **\_Con**, to denote them as controller bones. You can batch rename them with the following process:
   1. In the **Outliner**, hold <kbd>Shift</kbd> and click all the controller bones.
   2. Navigate to **Edit** > **Batch Rename**. A rename modal displays.
   3. Set to **Selected** and use the dropdown to set to **Bones**.
   4. Set **Type** to **Set Name**.
   5. Set **Method** to **Suffix**.
   6. In **Name**, add **\_Con**.
   7. Click the **OK** button.
      <video controls width="80%" src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/12_Creating_Controller_Bones.mp4">
      </video>
5. Switch to **Object Mode** and select the original **Joints armature** object.
6. Switch to **Pose Mode**.
7. Click on the original joint bones, such as **LeftEye**, then navigate to the **Bone Constraints Property Panel**.
8. Add **Copy Location** and **Copy Rotation**, then set each original bone's constraint to target their corresponding Controller Bone, such as **LeftEye_Con**.
9. In the **Copy Rotation** constraint, set the following properties:
   1. In **Axis**, disable the **X**, **Y**, and **Z**.
   2. In **Inverted Axis**, enable the **X**, **Y**, and **Z**.
   3. Set **Mix** to **Offset** (Legacy).
      <video controls width="80%" src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/13_Creating_Bone_Constraints.mp4">
      </video>
10. Perform steps 7-9 for each facial bone that requires a controller.

To create custom bone shapes for easier control bone access:

1. Switch to **Object Mode** and select the **Controller** armature object.
2. Switch to **Pose Mode**.
3. Select a controller bone, such as **LeftEye_Con**.
4. Switch to the **Bones Properties** panel and expand the **Viewport Display** section.
5. Select one of the custom shapes included in the project. In the reference project, the shape objects share similar names to the face bones.
6. Set the **X** rotation to **-90**. Set any additional scaling if required.

   <video controls width="80%" src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/14_Assigning_Custom_Shapes.mp4">
   </video>

7. Perform steps 3-6 for all your controller bones. You can hide the original face bones at this point.
8. (Optional) Set up **Bone Groups** to assign colors to your controller bones:

   1. Navigate to the **Object Data Properties** panel.
   2. Create a new bone group.
   3. Change **Color Set** to a color theme of your choice.
   4. Click **Assign** to assign the currently selected controller that color. You can perform this step in batches.

      <video controls width="80%" src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/15_Coloring_Control_bones.mp4">
      </video>

9. Test your controllers in **Pose Mode**.

    <video controls width="80%" src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/16_Testing_Controllers.mp4">
   </video>

## Posing

**Posing** is the process of manipulating the bones of your head mesh into a specific position per animation frame. After the model's head has been rigged, you can begin the process of saving poses to the timeline. This data enables Studio to access each facial movement and animate or blend facial poses to create dynamic expressions.

When posing the bones of your character's head mesh to new positions, follow the [Facial Action Coding System](../../../art/characters/facial-animation/facs-poses-reference.md) (FACS) as a reference for your facial expression poses. FACS is a comprehensive, anatomically-based system for describing all visually discernible facial movement, and it allows for all facial animations to be shareable between characters. This means that once you create a facial animation, you can reuse it for any character with an [animatable head](../../../art/characters/facial-animation/using-heads-in-studio.md) with a `Class.FaceControls` instance.

Each frame within your modeling software's animation timeline can contain one unique FACS pose, so when you want to create multiple FACS poses, you must save each FACS pose to a different frame. You must also include a frame with your character having a neutral face with the face controllers and bones set to their default values. This ensures that Studio can calculate the bone position differences between your character's neutral expression and each FACS pose. For this reason, set Frame 0 as your character's neutral expression, and save FACS poses starting at Frame 1.

The following image is an example of Blender's animation timeline with 5 frames. Frame 0 has the character's neutral expression, and frames 1-4 have FACS pose data.
<img src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/Animation-Timeline.png" width="70%" />

There are [50 base poses](./facs-poses-reference.md) that you can use in Roblox to portray a wide range of face emotions for your characters. When you are deciding which poses you need, remember that FACS pose names are always based on the orientation of the character, not the camera. For example, `LeftEyeClosed` closes the character's left eye, which is to the right of the camera view.

<Alert severity = 'warning'>
If you intend to sell your character head to the Marketplace, you must include the minimum 17 base [FACS poses](./facs-poses-reference.md).
</Alert>

You might not require all 50 base poses for your character. For example, a simple robot that opens its mouth and blinks can just have `JawDrop`, `LeftEyeClosed`, and `RightEyeClosed`. Therefore, the more expressive you want your character to be, the more FACS poses you need to include in your animation timeline. It's recommended to save the base poses that you intend to use with your head in alphabetical order, then use any frames afterwards for [combination poses](#combination-poses).

The following steps outline the process of posing 5 poses with the facial bones created in our reference, but you can apply these steps for any additional poses for a more expressive head. To pose your face bones in Blender:

1. Ensure that the animation timeline playhead is set to the correct frame.
   1. If you are setting the character's **Neutral pose**, set it to **frame 0**.
   2. If you are posing `EyesLookLeft`, set it to **frame 1**.
   3. If you are posing `EyesLookRight`, set it to **frame 2**.
   4. If you are posing `LeftEyeClosed`, set it to **frame 3.**
   5. If you are posing `RightEyeClosed`, set it to **frame 4**.
2. In **Pose Mode**, set the pose to the maximum position you want your pose to realistically use:
   1. If you are setting the character's `Neutral` pose, set the face controllers and bones to their default values,
   2. If you are posing `EyesLookLeft`, select both eye controller bones and drag the eyes to the character's left.
   3. If you are posing `EyesLookRight`, select both eye controller bones and drag the eyes to the character's right.
   4. If you are posing `LeftEyeClosed`, select both eye controller bones and drag the left eyelids down to meet the bottom eyelids.
   5. If you are posing `RightEyeClosed`, select both eye controller bones and drag the right eyelids down to meet the bottom eyelids.
3. In the **Viewport**, press <kbd>A</kbd> to select all bones.
4. Right-click and select **Insert Keyframe** > **Location and Rotation**. This ensures that each frame contains the positional and rotational information for all bones.

   <video controls width="80%" src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/17-Posing.mp4">
   </video>

When all the poses are saved in your timeline, set the Start and End of the animation timeline to represent the number of frames with saved poses. Always set **Start** to **0** and, in this specific example, you can set the **End** to **4** if you are only mapping the 4 non-neutral example poses.

<img src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/Animation-Frame-Range.png" width="70%" />

### Combination Poses

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

On import, Studio calculates and stores the corrective difference for combination poses in the head's `Class.FaceControls` instance, and the `Class.FaceControls` instance corrects the base poses values as they combine in the Animation Editor.

## Mapping

After you finish posing each FACS pose that your character needs, you must map, or link, **each animation frame that you pose** to its corresponding FACS base or combination pose name. Mapping stores the bone positions and translations within the head `Class.MeshPart`, and when you begin to animate your head within the [Animation Editor](../../../animation/editor.md), the `Class.FaceControls` instance uses this stored data to transform your character's facial features to the applicable FACS pose.

<Alert severity = 'warning'>
If you intend to sell your character head to the Marketplace, you must include the minimum 17 base [FACS poses](./facs-poses-reference.md).
</Alert>

Aside from mapping each pose to its proper pose name, you also need to map the [RootFaceJoint](#rootfacejoint) so that Studio can properly locate that joint and hide all of the children joints and their bones within the `Class.FaceControls` instance on import.

<Alert severity="info">
   If you are using Maya, you can map the RootFaceJoint and facial pose data using the **Extra Attributes** in a similar format as Blender's Custom Properties. To add attributes:
   1. Select the **Head_Geo** object and navigate to the Attribute Editor.
   2. Under the Attributes dropdown, select **Add Attributes...**.
</Alert>

<Alert severity="error">
   If you leave any empty strings, or try to import the head into Studio with multiple frames per FACS pose name, the head will fail the [import process](../../../art/characters/facial-animation/using-heads-in-studio.md#importing-heads).
</Alert>

To map your saved poses and the RootFaceJoint:

1. Switch to **Object Mode**.
2. Select the **Head_Geo mesh**.
3. In the **Object Properties** tab of the **Properties Editor**, navigate to the **Custom Properties** section, then click the **New** button. A new custom property displays underneath the **New** button.

   <img src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/Mapping-New-Button.png" width="50%" />

4. To the right of the new custom property, click the **Gear Icon**. The **Edit Property** pop-up displays.

   <img src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/Mapping-Popup.png" width="50%" />

5. Click the **Type** dropdown, then select **String**.
6. In the **Property Name** field:
   1. If you are mapping a pose, input the **frame number** you are mapping.
   2. If you are mapping the RootFaceJoint, input **RootFaceJoint**.
7. Leave the **Default Value** and **Description** fields empty.
8. Click the **OK** button. The new custom property updates with your new property name.
9. In the field to the right of the custom property name:
   1. If you're mapping a base pose, input the corresponding [FACS base pose](./facs-poses-reference.md) or combination pose name exactly as it is spelled.
   2. If you're mapping a combination pose, input each base pose you are combining separated by an underscore, such as **Funneler_JawDrop_Pucker**.
   3. If you're mapping the RootFaceJoint, input **Face**.
10. Press **Enter**.

    <video controls width="80%" src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/18_Mapping.mp4"></video>

    <video controls width="80%" src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/videos/2_Mapping_RootFaceJoint.mp4"></video>

As you repeat this process, every additional custom property you create displays in the Custom Properties section of the Object Properties tab within the Properties Editor.

<img src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/Custom-Properties-Example.png" width="40%" />

You can download a [version of this project](../../../assets/avatar/dynamic-heads/creating-dynamic-heads/reference-files/Cubie-Eye-Poses-Mapped.blend) with the poses saved and mapped up to this point as reference. If importing a head `.fbx` with saved animation data into Blender, make sure to set the **Animation Offset** in the .FBX Import window to **0** to include the Frame 0 of the timeline.

<img src="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/Animation-Offset-Importing.png" width="30%" />

## Exporting

After you finish posing and mapping your head for your character, you can export the character model as a `.fbx` to import into Studio, allowing you to access the 4 eye poses using the `Class.FaceControls` instance in Studio. You can also reference the fully configured Cubie head `.fbx` to access all 50+ base poses.

The export settings for animatable heads differ slightly from [standard third-party modeling export settings](../../../art/modeling/export-requirements.md). To export the basic head model as a `.fbx`:

1. In the topbar, click **File**. A pop-up menu displays.
2. Select **Export**, then **FBX (.fbx)**. The **Blender File View** window displays.
3. Expand **Include** and enable **Limit To > Active Collection**. Note that this step is optional if you do not have additional collections in your Blender project.
4. In the **Include** section, enable **Custom Properties**.
5. Expand the **Armature** section and uncheck **Add Leaf Bones**.
6. Enable **Bake Animation**.
7. Expand **Bake Animation** and uncheck **NLA Strips**, **All Actions**, and **Force Start/End Keyframes**.
8. Click the **Export FBX** button. Save the FBX to the directory of your choice.

At this point, you can now import the `.fbx` into Studio as a character with a supported animatable head. For model import and usage instructions, see [Using Heads in Studio](../../../art/characters/facial-animation/using-heads-in-studio.md).

<Alert severity="warning">
   When importing Cubie into Studio, make sure to also save the head texture <a href="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/reference-files/Cubie_Head_ALB.png" download>Cubie-Texture_ALB.png</a> which you can apply to the head mesh of the imported character as a TextureID.
</Alert>
