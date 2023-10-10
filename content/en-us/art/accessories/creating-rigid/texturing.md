---
title: Texturing
description: Covers the process of associating PBR textures to rigid accessories in Blender.
prev: /art/accessories/creating-rigid/modeling
next: /art/accessories/creating-rigid/exporting
---

**Texturing** is the process of applying a surface appearance to a 3D object. Blender provides various tools and features to create and connect your own texture maps to your asset, allowing you to preview your model's final appearance and link the texture images to your exported file.

The mask example asset uses [Physically-Based Rendering (PBR) textures](../../../art/modeling/surface-appearance.md), which are advanced textures that create realistic surfaces under different lighting environments. PBR textures use multiple image files, or **maps**, to represent the various surface properties of your 3D object.

<GridContainer numColumns="4">
<figure>
   <img src="../../../assets/art/accessories/creating-rigid/TXT_Rigid_Mask_ALB.png" />
<figcaption>
Color (Albedo) Map
</figcaption>
</figure>
<figure>
   <img src="../../../assets/art/accessories/creating-rigid/TXT_Rigid_Mask_NOR.png" />
<figcaption>
Normal Map
</figcaption>
</figure>
<figure>
   <img src="../../../assets/art/accessories/creating-rigid/TXT_Rigid_Mask_RGH.png" />
<figcaption>
Roughness Map
</figcaption>
</figure>
<figure>
   <img src="../../../assets/art/accessories/creating-rigid/TXT_Rigid_Mask_MET.png" />
<figcaption>
Metalness Map
</figcaption>
</figure>
</GridContainer>

This tutorial doesn't cover the PBR texture creation process, which typically involves using third-party software such as ZBrush or Substance 3D Painter. Instead, this section goes over the process of bringing premade PBR image files into Blender and properly associating them to your asset on export.

<Alert severity = 'warning'>
While PBR textures are not required for accessories, adding PBR textures can add extra visual flair and realism to elevate your creations. For an example on using Blender to create a basic, non-PBR texture, see [Texturing Basic Clothing](../../../art/accessories/creating/texturing.md).
</Alert>

To configure and link your PBR textures to your model:

1. Download [Rigid_Mask_Textures.zip](../../../assets/art/accessories/creating-rigid/Rigid_Mask_Textures.zip) and unzip the textures images locally.
2. In Blender, navigate to the **Shading** tab. Ensure that your object is selected.

   1. If you don't see the **PrincipledBSDF node**, select the **+New** button to create a new material.

      <img src="../../../assets/art/accessories/creating-rigid/Blender-New-Material.png" />

      <img src="../../../assets/art/accessories/creating-rigid/Blender-Empty-Node.png" />

3. From your file browser, drag and drop your texture `.png` files into the node section. A new image node appears with each file.
4. In the newly created node, click and drag the following image nodes to their appropriate connection on the Principled BSDF main node:

   1. **\_ALB texture**: Connect the **Color** node to **Principled BSDF** > **Base Color**.
      <img src="../../../assets/art/accessories/creating-rigid/Albedo-Node.png" />
   2. **\_MTL texture**: Connect the **Color** node to **Principled BSDF** > **Metallic**.
      <img src="../../../assets/art/accessories/creating-rigid/Metal-Node.png"/>
   3. **\_RGH texture**: Connect the **Color** node to **Principled BSDF** > **Roughness**.
      <img src="../../../assets/art/accessories/creating-rigid/Rough-Node.png"/>
   4. **\_NOR texture**:
      1. Click **Add** > **Vector** > **Normal Map** to generate a NormalMap node. This node is required to convert Normal PBR image maps.
      2. Connect the \_NOR node's **Color** to the NormalMap node's **Color** connection.
      3. Connect the NormalMap's **Normal** to the **Principled BSDF** > **Normal**.
         <img src="../../../assets/art/accessories/creating-rigid/Normal-Node.png" />

5. Test your textures by changing the viewport viewing mode to **Viewport Shading**.
   <video controls src="../../../assets/art/accessories/creating-rigid/Adding-PBR.mp4" width="100%"></video>

<Alert severity = 'success'>
You've completed the texturing section of this tutorial. If desired, download a [reference sample](../../../assets/art/accessories/creating-rigid/Rigid_Mask_Texturing-Completed.blend) of this stage of the project for comparison.

If you are creating your own PBR textures, check out [Material References](../../../art/modeling/material-reference.md) for various PBR material examples you can apply to your next accessory.
</Alert>
