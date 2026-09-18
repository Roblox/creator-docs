---
title: Test poses
description: Test your poses after rigging a clothing item to ensure the clothes bend and deform correctly.
next: /art/accessories/creating/caging-setup
prev: /art/accessories/creating/armature-setup
---

With the clothing mesh parented to an armature, you can now perform quick tests to verify that your t-shirt deforms correctly.

<Alert severity ='warning'>
If you see issues with the deformation of your clothing, you may need to correct the issue with weight-painting, a technique for manually applying skinning data to your meshes.

This tutorial doesn't cover the process of weight-painting. For additional resources on manually weight painting and instructions on updating skinning data on meshes, see the following resources:

- [Skin a simple mesh](../../modeling/skin-a-simple-mesh.md)
- [Skin a humanoid mesh](../../modeling/skin-a-humanoid-model.md)

</Alert>

To test your t-shirt's movement:

1. With your armature active, navigate to the Properties Editor > **Armature Properties** tab.
1. In **Viewport Display** > **Show**, enable **In Front**. The **In Front** property enables you to easily see and access the bones for posing.

   <img src="../../../assets/art/accessories/creating/Rigging-Bones-In-Front.png" />

1. Switch to **Pose** mode, then click on various bones and press <kbd>R</kbd> to rotate and set a pose. After pressing <kbd>R</kbd>:

   1. Click to save the rotation.
   1. Right-click to cancel an unsaved rotation.
   1. If you have saved a rotation, reset your pose in the viewport with right-click and select **Clear User Transforms**.

1. Try various natural poses of your character to ensure that your clothing stretches and fits correctly. When you are done, do **not** delete the armature as it is a vital component for your t-shirt to layer correctly in Studio.

   <video controls src="../../../assets/art/accessories/creating/Rigging_03.mp4" width="100%"></video>

<Alert severity = 'success'>
You've completed the rigging section of this tutorial. If desired, download a [reference sample](../../../assets/art/reference-files/checkpoint/3_LongSleeve-Rigging-Complete.blend) of this project for comparison.
</Alert>
