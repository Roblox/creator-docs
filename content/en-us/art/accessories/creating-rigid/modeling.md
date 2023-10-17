---
title: Modeling
description: Covers the guidelines and project setup required for rigid accessories in Blender.
next: /art/accessories/creating-rigid/texturing
prev: /art/accessories/creating-rigid/
---

**Modeling** is the process of creating and shaping the 3D geometry of an object. Whether you are using an existing shape or creating your own 3D object, it's important to consider [technical requirements](../../../art/accessories/specifications.md), such as keeping your geometry as a single mesh within a polycount budget, and [policy requirements](../../../art/marketplace/marketplace-policy.md), such as ensuring your design does not infringe on other creator's IP both within and outside of the Roblox ecosystem.

Using the [reference mask asset](../../../assets/art/accessories/creating-rigid/Rigid_Mask_Model-Only.fbx), this part of the tutorial covers the steps to correctly import and set up a pre-made 3D model into Blender's workspace. You can apply these steps to any rigid accessory, whether you are importing a custom model or sculpting your own from scratch.

<Alert severity = 'warning'>
If you are creating your rigid accessory from scratch, it's important to understand Roblox's various standard [body sizes and proportions](../../../art/accessories/body-scale.md), as well as ensure that your design follows [Roblox's policy ](../../../art/marketplace/marketplace-policy.md)and [technical](../../../art/accessories/specifications.md) requirements.
</Alert>

## Blender Setup

Correctly setting up your asset in Blender helps reduce importing and rendering issues later in Studio. When importing Roblox-related `.fbx` files, such as the provided [mask asset](../../../assets/art/accessories/creating-rigid/Rigid_Mask_Model-Only.fbx), you might discover that your asset imports at a 1/100 scale due to the `.fbx` conversion. In your Blender project, you can quickly reset the scale to make the asset easier to work with in the Blender environment.

To import and set up your rigid accessory model in Blender:

1. Open a new Blender project.
2. Press <kbd>A</kbd> to highlight all and <kbd>X</kbd> to delete the default starting cube and cameras.
3. Navigate to **File** > **Import** > **FBX** and select the downloaded reference model. To follow along with this tutorial, use provided [Sci Fi Mask](../../../assets/art/accessories/creating-rigid/Rigid_Mask_Model-Only.fbx) asset.
4. If the object imports at a small scale, **select** the object and navigate to the **Properties panel** > **Object Properties** > **Transform** and adjust the **X**, **Y**, **Z** to `1.000`.

   <img src="../../../assets/art/accessories/creating-rigid/Blender-Scale-1.png" />

   <video controls src="../../../assets/art/accessories/creating-rigid/Scaling-FBX-Import.mp4" width="100%"></video>

5. If you are sculpting your asset from scratch, orient the object in your workspace. If you are importing, you may not need to make any adjustment.
   1. Make sure your asset is facing **-Y forward**.
   2. Ideally your accessory should be moved to `0`,`0`,`0` in the world to ensure it imports at the center of the camera in Studio.

<Alert severity='success'>
You've completed the modeling section of this tutorial. If desired, download a [reference version](../../../assets/art/accessories/creating-rigid/Rigid_Mask_Modeling-Completed.blend) of this stage of the project for comparison.

There are many tools and workflows to create your own unique asset. For additional suggestions, try creating different asset types, such as shoulder pads or belts, or importing a reference model into Blender as a mannequin to test your cosmetics.
</Alert>
