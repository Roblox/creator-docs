---
title: Rigging
description: Covers the process of rigging a custom clothing asset in Blender.
next: /art/accessories/creating/caging
prev: /art/accessories/creating/texturing
---

**Rigging** is the process that enables the clothing object to move and deform with a Roblox character's R15 rig. In this tutorial, you'll parent the clothing item to Roblox's provided R15 armature and verify the automatic skinning data. After rigging, be sure to test out some basic poses to ensure that your clothes move and stretch correctly with any character body.

<GridContainer numColumns="2">
  <figure>
    <img src="../../../assets/art/accessories/creating/Texturing-Complete.png" />
    <figcaption>Clothing mesh with no rigging data</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/art/accessories/creating/Rigging-Pose-Tests.png" />
    <figcaption>Clothing mesh with rigging data performing pose tests</figcaption>
  </figure>
</GridContainer>

The rigging process requires the following:

1. Download and append an R15 armature to your project.
2. Parent the rig with Blender's automatic weights.
3. Test poses.

## Transferring Armature

Roblox provides an R15 base armature that you can import into your own project. While it is possible to create your own R15 armature rig, importing a premade rig saves you time and reduces the potential for error.

To import the R15 character armature into your file:

1. Download Roblox's [Rig_and_Attachments_Template.blend](../../../assets/modeling/meshes/reference-files/Rig_and_Attachments_Template.blend). Do not open this project.
2. In your current clothing project, return to **Object Mode**.
3. Navigate to **File** > **Append**, and select the saved **Rig_And_Attachment.blend** file. An additional folder structure appears.

   <img src="../../../assets/art/accessories/creating/Rigging-Append-Browser.png" />

4. Select **Armature** > **Armature** and press **Append**. An armature object is added to your workspace.

   <img src="../../../assets/art/accessories/creating/Rigging-Armature-Appended.png" />

5. The armature may need reorientation with the following steps:

   1. With the armature selected, open the **Item tool** sidebar.
   2. Adjust the rotation so the armature is correctly aligned with your mesh.
   3. After alignment, navigate to **Object** > **Apply** > **All Transforms** to freeze your new rotation values.

      <img src="../../../assets/art/accessories/creating/Rigging-Freeze-Transforms.png" />

<video controls src="../../../assets/art/accessories/creating/Rigging_01.mp4" width="100%"></video>

## Parenting Armature

With the armature rig in place, you can use Blender's **Parent with Automatic Weights** functionality to quickly set your clothing mesh as a child of the armature. This feature also applies vertex weighting, or **skinning**, automatically to your mesh, which can save you significant time over skinning your clothing manually.

To parent the clothing to the rig:

1. Select the clothing mesh object.
2. Hold shift and click the **Armature** object. Ensure that the armature object is the last object selected.
3. Right-click and select **Parent** > **With Automatic Weights**.

<img src="../../../assets/art/accessories/creating/Rigging-Auto-Weights.png" />

<video controls src="../../../assets/art/accessories/creating/Rigging_02.mp4" width="100%"></video>

## Testing Poses

With the clothing mesh parented to an armature, you can now perform quick tests to verify that your clothing deforms correctly.

<Alert severity ='warning'>
If you see issues with the deformation of your clothing, you may need to correct the issue with weight-painting, a technique for manually applying skinning data to your meshes.

This tutorial doesn't cover the process of weight-painting. For additional resources on manually weight painting and instructions on updating skinning data on meshes, see the following resources:

- [Skinning a Simple Mesh](../../modeling/skinning-a-simple-mesh.md)
- [Skinning a Humanoid Mesh](../../modeling/skinning-a-humanoid-model.md)

</Alert>

To test your clothing's movement:

1. With your armature selected, navigate to the **Properties panel** > **Armature properties**.
2. In **Viewport Display** > **Show**, enable **In Front**. The **In Front** property enables you to easily see and access the bones for posing.

   <img src="../../../assets/art/accessories/creating/Rigging-Bones-In-Front.png" />

3. In the viewport, select your armature and navigate to **Pose** mode.
4. Click on various bones and press <kbd>R</kbd> to rotate and set a pose. After pressing <kbd>R</kbd>:

   1. Click to save the rotation.
   2. Right-click to cancel an unsaved rotation.
   3. If you have saved a rotation, reset your pose in the viewport with right-click and select **Clear User Transforms**.

5. Try various natural poses of your character to ensure that your clothing stretches and fits correctly.

   <video controls src="../../../assets/art/accessories/creating/Rigging_03.mp4" width="100%"></video>

<Alert severity = 'success'>
You've completed the rigging section of this tutorial. If desired, download a [reference sample](../../../assets/art/reference-files/checkpoint/3_LongSleeve-Rigging-Complete.blend) of this project for comparison.
</Alert>
