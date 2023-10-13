---
title: Modeling
description: Covers the guidelines and project setup required for rigid accessories in Blender.
next: /art/accessories/creating-rigid/texturing
prev: /art/accessories/creating-rigid/
---

**Modeling** is the process of creating and shaping the 3D geometry of an object. Whether you are using an existing shape or creating your own 3D object, it's important to consider [technical requirements](../../../art/accessories/specifications.md), such as keeping your geometry within a polycount budget, and [policy requirements](../../../art/marketplace/marketplace-policy.md), such as ensuring your design does not infringe on other creator's IP both within and outside of the Roblox ecosystem.

Using the [reference mask asset](../../../assets/art/accessories/creating-rigid/Rigid_Mask_Model-Only.fbx), this part of the tutorial covers important modeling concepts, such as [body scale](#body-scale), and the steps to correctly import and set up a pre-made 3D model into Blender's workspace. You can apply these concepts and steps to any rigid accessory, whether you are importing a custom model or sculpting your own from scratch.

## Body Scale

Roblox supports three common avatar sizes, known as **Classic**, **Rthro**, and **Rthro Slender**. This standard sizing helps keep avatar characters consistent, allowing developers to create experiences and environments that can fit commonly sized character models.

When modeling some rigid assets, like a helmet that contours around a character's head, it's important to use a mannequin to help ensure your proportions fit. The asset provided in this tutorial example was originally modeled using **Rthro** proportions.

If you are modeling your asset, visit the [References resources](../../../avatar/resources.md#references) to download any of the following mesh mannequin:

<GridContainer numColumns="3">
<figure>
    <img src="../../../assets/art/resources/Body-Scale-Classic.png" />
<figcaption>
Classic blocky body type. <br /><br /> Roughly 4.75 studs tall.
</figcaption>
</figure>
<figure>
    <img src="../../../assets/art/resources/Body-Scale-Rthro-Normal.png" />
<figcaption>
Rthro Normal body type. <br /><br /> Roughly 5.75-6.5 studs tall, with wider shoulders and narrower hips.
</figcaption>
</figure>
<figure>
    <img src="../../../assets/art/resources/Body-Scale-Rthro-Slender.png" />
<figcaption>
Rthro Slender body type. <br /><br /> Roughly 5.25-6.25 studs tall, with narrower shoulders and wider hips.
</figcaption>
</figure>
</GridContainer>

See [Accessory Specifications](../../../art/accessories/specifications.md#geometry-and-budgets) for specific range values and other geometry requirements.

## Blender Setup

Correctly setting up your asset in Blender helps reduce importing and rendering issues later in Studio. When importing Roblox-related `.fbx` files, such as the provided [mask asset](../../../assets/art/accessories/creating-rigid/Rigid_Mask_Model-Only.fbx), you might discover that your asset imports at a 1/100 scale due to the `.fbx` conversion. In your Blender project, you can quickly reset the scale to make the asset easier to work with in the Blender environment.

To import and set up your rigid accessory model in Blender:

1. Open a new Blender project.
2. Press <kbd>A</kbd> to highlight all and <kbd>X</kbd> to delete the default starting cube and cameras.
3. Navigate to **File** > **Import** > **FBX** and select the downloaded reference model. To follow along with this tutorial, use provided [Sci Fi Mask](../../../assets/art/accessories/creating-rigid/Rigid_Mask_Model-Only.fbx) asset.
4. If the object imports at a small scale, **select** the object and navigate to the **Properties panel** > **Object Properties** > **Transform** and adjust the **X**, **Y**, **Z** to `1.000`.

   <img src="../../../assets/art/accessories/creating-rigid/Blender-Scale-1.png" />

5. If you are sculpting your asset from scratch, orient the object in your workspace. If you are importing, you may not need to make any adjustment.
   1. Make sure your asset is facing **-Y forward**.
   2. Ideally your accessory should be moved to `0`,`0`,`0` in the world to ensure it imports at the center of the camera in Studio.

<Alert severity='success'>
You've completed the modeling section of this tutorial. If desired, download a [reference version](../../../assets/art/accessories/creating-rigid/Rigid_Mask_Texturing-Completed.blend) of this stage of the project for comparison.

There are many tools and workflows to create your own unique asset. For additional suggestions, try creating different asset types, such as shoulder pads or belts, or importing a reference model into Blender as a mannequin to test your cosmetics.
</Alert>
