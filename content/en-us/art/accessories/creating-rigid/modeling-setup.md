---
title: Blender Setup
description: Set up your Blender project and import a reference 3D accessory to begin the accessory tutorial.
next: /art/accessories/creating-rigid/texturing
prev: /art/accessories/creating-rigid/
---

**Modeling** is the process of creating and shaping the 3D geometry of an object. Whether you are using an existing shape or creating your own 3D object, it's important to consider [technical requirements](../../../art/accessories/specifications.md), such as keeping your geometry within a polycount budget, and [policy requirements](../../../art/marketplace/marketplace-policy.md), such as ensuring your design does not infringe on other creator's IP both within and outside of the Roblox ecosystem.

Correctly setting up your asset in Blender helps reduce importing and rendering issues later in Studio. When importing Roblox-related `.fbx` files, such as the provided [mask asset](../../../assets/art/accessories/creating-rigid/Rigid_Mask_Model-Only.fbx), you might discover that your asset imports at a 1/100 scale due to the `.fbx` conversion. In your Blender project, you can quickly reset the scale to make the asset easier to work with in the Blender environment.

<Alert severity = 'info'>
If you are creating your own rigid accessory from scratch, it's important to understand Roblox's [standard avatar sizes](../../../art/accessories/body-scale.md), especially for rigid accessories that contour around a body part, such as a hat or bangle.
</Alert>

Using the [Sci Fi Mask](../../../assets/art/accessories/creating-rigid/Rigid_Mask_Model-Only.fbx) reference as an example, use the following instructions to import and set up your rigid accessory model in Blender:

1. Open a new Blender project.
2. Press <kbd>A</kbd> to highlight all and <kbd>X</kbd> to delete the default starting cube and cameras.
3. Navigate to **File** > **Import** > **FBX** and select the downloaded reference model.
4. If the object imports at a small scale, **select** the object and navigate to the **Properties panel** > **Object Properties** > **Transform** and adjust the **X**, **Y**, **Z** to `1.000`.

   <img src="../../../assets/art/accessories/creating-rigid/Blender-Scale-1.png" />

   <video controls src="../../../assets/art/accessories/creating-rigid/Scaling-FBX-Import.mp4" width="100%"></video>

5. If you are sculpting your asset from scratch, orient the object in your workspace. If you are importing, you may not need to make any adjustment.
   1. Make sure your asset is facing **-Y forward**.
   2. Ideally your accessory should be moved to `0`,`0`,`0` in the world to ensure it imports at the center of the camera in Studio.

<Alert severity='success'>
You've completed the modeling section of this tutorial. If desired, download a [reference version](../../../assets/art/accessories/creating-rigid/Rigid_Mask_Texturing-Completed.blend) of this stage of the project for comparison.

There are many tools and workflows to create your own unique asset. For additional suggestions, try creating different asset types, such as shoulder pads or belts, or importing a reference model into Blender as a mannequin to sculpt and shape your cosmetics from scratch.
</Alert>
