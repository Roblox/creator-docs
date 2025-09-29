---
title: Accessories from an existing model
description: This tutorial covers the basic steps required to publish a custom asset on the Marketplace.
---

In many cases, you may want to convert a premade model from your modeling
software into an accessory on Roblox. If you are looking to create your
accessory from scratch, see [Create accessories](./creating-rigid/index.md).

Using a provided 3D reference file, this tutorial covers each step in the workflow to properly configure and export a 3D model with PBR textures from Blender and generate your own **rigid accessory** in Studio. After you create the accessory, you can upload it to the Marketplace, save it to your toolbox, and use it in your own experiences.

<Alert severity = 'info'>
This tutorial only covers rigid accessories, and does not cover the process of converting more advanced clothing or character body models.
</Alert>

<GridContainer numColumns="2">
<figure>
    <img src="../../assets/art/accessories/creating-rigid/Blender-Mask-Preview.png" />
<figcaption>
  Mask asset as an untextured mesh object in Blender
</figcaption>
</figure>
<figure>
    <img src="../../assets/art/accessories/creating-rigid/Studio-Mask-Preview.png" />
<figcaption>
  Mask asset equipped as an `Class.Accessory` in Studio
</figcaption>
</figure>
</GridContainer>

Using a provided reference 3D asset, this tutorial covers the following rigid accessory workflow:

1. Modeling overview and requirements in Blender.
2. Texturing setup using PBR textures in Blender.
3. Exporting your asset as a `.fbx` from Blender.
4. Importing the asset into Studio.
5. Fitting and converting the imported model to an `Class.Accessory` object.
6. Publishing and validating the accessory for Marketplace upload.

<Alert severity = 'info'>
While this content covers the Blender workflow with a provided reference example, you can apply the same concepts to other third-party modeling applications and custom assets.
</Alert>

## Setup model

Whether you are using an existing shape or creating your own 3D object, it's important to consider [technical requirements](../../art/accessories/specifications.md), such as keeping your geometry within a polycount budget, and [policy requirements](../../marketplace/marketplace-policy.md), such as ensuring your design does not infringe on other creator's IP both within and outside of the Roblox ecosystem.

Correctly setting up your asset in Blender helps reduce importing and rendering issues later in Studio. When importing Roblox-related `.fbx` files, such as the provided [mask asset](../../assets/art/accessories/creating-rigid/Rigid_Mask_Model-Only.fbx), you might discover that your asset imports at a 1/100 scale due to the `.fbx` conversion. In your Blender project, you can quickly reset the scale to make the asset easier to work with in the Blender environment.

<Alert severity = 'info'>
If you are creating your own rigid accessory from scratch, it's important to understand Roblox's [standard avatar sizes](../../art/accessories/body-scale.md), especially for rigid accessories that contour around a body part, such as a hat or bangle.
</Alert>

Using the [Sci Fi Mask](../../assets/art/accessories/creating-rigid/Rigid_Mask_Model-Only.fbx) reference as an example, use the following instructions to import and set up your rigid accessory model in Blender:

1. Open a new Blender project.
2. Press <kbd>A</kbd> to highlight all and <kbd>X</kbd> to delete the default starting cube and cameras.
3. Navigate to **File** > **Import** > **FBX** and select the downloaded reference model.
4. If the object imports at a small scale, **select** the object and navigate to the **Properties** panel > **Object Properties** > **Transform** and adjust the **X**, **Y**, **Z** to `1.000`.

   <img src="../../assets/art/accessories/creating-rigid/Blender-Scale-1.png" />

   <video controls src="../../assets/art/accessories/creating-rigid/Scaling-FBX-Import.mp4" width="100%"></video>

5. If you are sculpting your asset from scratch, orient the object in your workspace. If you are importing, you may not need to make any adjustment.
   1. Make sure your asset is facing **-Y forward**.
   2. Ideally your accessory should be moved to `0`,`0`,`0` in the world to ensure it imports at the center of the camera in Studio.

<Alert severity='success'>
You've completed the modeling section of this tutorial. If desired, download a [reference version](../../assets/art/accessories/creating-rigid/Rigid_Mask_Texturing-Completed.blend) of this stage of the project for comparison.

There are many tools and workflows to create your own unique asset. For additional suggestions, try creating different asset types, such as shoulder pads or belts, or importing a reference model into Blender as a mannequin to sculpt and shape your cosmetics from scratch.
</Alert>

## Apply texture

**Texturing** is the process of applying a surface appearance to a 3D object. Blender provides various tools and features to create and connect your own texture maps to your asset, allowing you to preview your model's final appearance and link the texture images to your exported file.

The mask example asset uses [physically-based rendering (PBR) textures](../../art/modeling/surface-appearance.md), which are advanced textures that create realistic surfaces under different lighting environments. PBR textures use multiple image files, or **maps**, to represent the various surface properties of your 3D object.

<GridContainer numColumns="4">
<figure>
   <img src="../../assets/art/accessories/creating-rigid/TXT_Rigid_Mask_ALB.png" />
<figcaption>
Color (Albedo) Map
</figcaption>
</figure>
<figure>
   <img src="../../assets/art/accessories/creating-rigid/TXT_Rigid_Mask_NOR.png" />
<figcaption>
Normal Map
</figcaption>
</figure>
<figure>
   <img src="../../assets/art/accessories/creating-rigid/TXT_Rigid_Mask_RGH.png" />
<figcaption>
Roughness Map
</figcaption>
</figure>
<figure>
   <img src="../../assets/art/accessories/creating-rigid/TXT_Rigid_Mask_MET.png" />
<figcaption>
Metalness Map
</figcaption>
</figure>
</GridContainer>

This tutorial doesn't cover the PBR texture creation process, which typically involves using third-party software such as ZBrush or Substance 3D Painter. Instead, this section goes over the process of bringing premade PBR image files into Blender and properly associating them to your asset on export.

<Alert severity = 'warning'>
While PBR textures are not required for accessories, adding PBR textures can add extra visual flair and realism to elevate your creations. For an example on using Blender to create a basic, non-PBR texture, see [Texture basic clothing](../../art/accessories/creating/unwrapping.md).
</Alert>

To configure and link your PBR textures to your model:

1. Download [Rigid_Mask_Textures.zip](../../assets/art/accessories/creating-rigid/Rigid_Mask_Textures.zip) and unzip the textures images locally in the same directory as your Blender project.
2. In Blender, navigate to the **Shading** tab. Ensure that your object is selected.

   1. If you don't see the **PrincipledBSDF node**, select the **+New** button to create a new material.

      <img src="../../assets/art/accessories/creating-rigid/Blender-New-Material.png" />

      <img src="../../assets/art/accessories/creating-rigid/Blender-Empty-Node.png" />

3. From your file browser, drag and drop your texture `.png` files into the node section. A new image node appears with each file.
4. In the newly created node, click and drag the following image nodes to their appropriate connection on the Principled BSDF main node:

   1. **\_ALB texture**: Connect the **Color** node to **Principled BSDF** > **Base Color**.
      <img src="../../assets/art/accessories/creating-rigid/Albedo-Node.png" />
   2. **\_MTL texture**: Connect the **Color** node to **Principled BSDF** > **Metallic**.
      <img src="../../assets/art/accessories/creating-rigid/Metal-Node.png"/>
   3. **\_RGH texture**: Connect the **Color** node to **Principled BSDF** > **Roughness**.
      <img src="../../assets/art/accessories/creating-rigid/Rough-Node.png"/>
   4. **\_NOR texture**:
      1. Click **Add** > **Vector** > **Normal Map** to generate a NormalMap node. This node is required to convert Normal PBR image maps.
      2. Connect the \_NOR node's **Color** to the NormalMap node's **Color** connection.
      3. Connect the NormalMap's **Normal** to the **Principled BSDF** > **Normal**.
         <img src="../../assets/art/accessories/creating-rigid/Normal-Node.png" />

5. Test your textures by changing the viewport viewing mode to **Viewport Shading > Material Preview Mode**.
   <video controls src="../../assets/art/accessories/creating-rigid/Adding-PBR.mp4" width="100%"></video>

<Alert severity = 'success'>
You've completed the texturing section of this tutorial. If desired, download a [reference sample](../../assets/art/accessories/creating-rigid/Rigid_Mask_Texturing-Completed.blend) of this stage of the project for comparison.

If you are creating your own PBR textures, check out [Material references](../../art/modeling/material-reference.md) for various PBR material examples you can apply to your next accessory.
</Alert>

## Clean up

After modeling and texturing your asset, you can begin the process of **exporting** your Blender project as a `.fbx`. The start of this process includes cleaning up your project, which can involve deleting or removing any extra objects, such as lights, cameras, or mannequin meshes, to ensure you only export the accessory mesh, and applying any modifiers to your mesh object.

An often forgotten cleanup step involves **applying your transformations**, also known as **freezing your transforms**, by setting your orientation, rotation, and scale deltas to zero. Failure to apply any transformations can result in unexpected behavior and orientation when importing the mesh in Studio.

To freeze your transforms:

1. In Object mode, select your mesh object.
2. Navigate to **Object** > **Apply** > **All Transforms**.

   <img src="../../assets/art/accessories/creating-rigid/Blender-Apply-Transforms.png" />

## Export from modeling tool

After modeling and texturing your asset, you can begin the process of **exporting** your Blender project as a `.fbx`. The start of this process includes cleaning up your project, which can involve deleting or removing any extra objects, such as lights, cameras, or mannequins, to ensure you only export the accessory mesh, and applying any modifiers to your mesh object.

For the latest export settings for Blender, see [rigid accessory export settings](./export-settings.md).

<Alert severity = 'success'>
You've completed the exporting section of this tutorial. If desired, download a [reference sample](../../assets/art/accessories/creating-rigid/Rigid_Mask_Export.fbx) of this exported file for comparison. You can use this reference in the next importing step.
</Alert>

## Import to Studio

Studio's 3D Importer provides a quick and easy way to import third-party 3D assets into your projects. The importer provides object previews and error-checking to ensure that your asset meets Studio's general 3D requirements.

To import your asset, check out the latest information on [importing rigid accessories](./importing.md).

## Convert

After importing your asset into Studio, you can begin **fitting** your imported object to a mannequin and **converting** the `Class.Model` object into a `Class.Accessory`. When fitting and converting your accessory it's important to use the [Accessory Fitting Tool](../../art/accessories/accessory-fitting-tool.md) (AFT) to correctly preview the placement and apply the correct configurations to your accessory.

To convert your asset into a `Class.Accessory`, check out the latest information on [converting rigid accessories](./importing.md#convert-rigid-accessories).

## Upload and publish

After generating your `Class.Accessory` item, you can now begin the process of **publishing** the asset to the Marketplace. This step is optional and only applicable for creators who intend to sell their asset.

For additional information and instructions on this process, see [uploading and publishing instructions](../../marketplace/publish-to-marketplace.md).

<iframe width="800" height="450" src="https://www.youtube-nocookie.com/embed/swQW2VS9ZMA" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<br />

You now have your accessory added to the Marketplace catalog! Use the item's Marketplace link to view your listing at any time, or to send to your connections and followers for additional engagement.

<img src="../../assets/art/accessories/creating-rigid/Marketplace-Listing.png" />

<Alert severity = 'info'>
See the following resources for additional Marketplace policy and related information:

- [Marketplace policy](../../marketplace/marketplace-policy.md)
- [Fees and commissions](../../marketplace/marketplace-fees-and-commissions.md)
- [Intellectual property](../../marketplace/intellectual-property.md)
- [Moderation](../../marketplace/moderation.md)

</Alert>
