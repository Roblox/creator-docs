---
title: Armature setup
description: Transfer and parent an armature template to your custom clothing Blender project.
next: /art/accessories/creating/test-poses
prev: /art/accessories/creating/texture-painting
---

**Rigging** is the process that enables the clothing object to move and deform with a Roblox character's R15 rig. In this tutorial, you'll parent the clothing item to Roblox's provided R15 armature and verify the Automatic Skinning Transfer data. After rigging, be sure to test out some basic poses to ensure that your clothes move and stretch correctly with any character body.

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

## Transfer armature

Roblox provides an R15 base armature that you can import into your own project. While it is possible to create your own R15 armature rig, importing a premade rig saves you time and reduces the potential for error.

To import the R15 character armature into your file:

1. Download Roblox's [Rig_and_Attachments_Template.blend](../../../assets/modeling/meshes/reference-files/Rig_and_Attachments_Templates.zip). Do not open this project.
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

## Parent armature

With the armature rig in place, you can use Blender's **Parent with Automatic Weights** functionality to quickly set your clothing mesh as a child of the armature. This feature also applies vertex weighting, or **skinning**, automatically to your mesh, which can save you significant time over skinning your clothing manually.

To parent the clothing to the rig:

1. Select the clothing mesh object.
2. Hold shift and click the **Armature** object. Ensure that the armature object is the last object selected.
3. Right-click and select **Parent** > **With Automatic Weights**.

<img src="../../../assets/art/accessories/creating/Rigging-Auto-Weights.png" />

<video controls src="../../../assets/art/accessories/creating/Rigging_02.mp4" width="100%"></video>
