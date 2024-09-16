---
title: Accessories from an Existing Model
description: This tutorial covers the basic steps required to publish a custom asset on the Marketplace.
---

In many cases, you may want to convert a premade model from your modeling
software into an accessory on Roblox. If you are looking to create your
accessory from scratch, see [Creating Accessories](./creating-rigid/index.md).

Using a provided 3D reference file, this tutorial covers each step in the workflow to properly configure and export a 3D model with PBR textures from Blender and generate your own rigid accessory in Studio. After you create the accessory, you can upload it to the Marketplace, save it to your toolbox, and use it in your own experiences.

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

## Modeling Setup

Whether you are using an existing shape or creating your own 3D object, it's important to consider [technical requirements](../../art/accessories/specifications.md), such as keeping your geometry within a polycount budget, and [policy requirements](../../marketplace/marketplace-policy.md), such as ensuring your design does not infringe on other creator's IP both within and outside of the Roblox ecosystem.

Correctly setting up your asset in Blender helps reduce importing and rendering issues later in Studio. When importing Roblox-related `.fbx` files, such as the provided [mask asset](../../assets/art/accessories/creating-rigid/Rigid_Mask_Model-Only.fbx), you might discover that your asset imports at a 1/100 scale due to the `.fbx` conversion. In your Blender project, you can quickly reset the scale to make the asset easier to work with in the Blender environment.

<Alert severity = 'info'>
If you are creating your own rigid accessory from scratch, it's important to understand Roblox's [standard avatar sizes](../../art/accessories/body-scale.md), especially for rigid accessories that contour around a body part, such as a hat or bangle.
</Alert>

Using the [Sci Fi Mask](../../assets/art/accessories/creating-rigid/Rigid_Mask_Model-Only.fbx) reference as an example, use the following instructions to import and set up your rigid accessory model in Blender:

1. Open a new Blender project.
2. Press <kbd>A</kbd> to highlight all and <kbd>X</kbd> to delete the default starting cube and cameras.
3. Navigate to **File** > **Import** > **FBX** and select the downloaded reference model.
4. If the object imports at a small scale, **select** the object and navigate to the **Properties panel** > **Object Properties** > **Transform** and adjust the **X**, **Y**, **Z** to `1.000`.

   <img src="../../assets/art/accessories/creating-rigid/Blender-Scale-1.png" />

   <video controls src="../../assets/art/accessories/creating-rigid/Scaling-FBX-Import.mp4" width="100%"></video>

5. If you are sculpting your asset from scratch, orient the object in your workspace. If you are importing, you may not need to make any adjustment.
   1. Make sure your asset is facing **-Y forward**.
   2. Ideally your accessory should be moved to `0`,`0`,`0` in the world to ensure it imports at the center of the camera in Studio.

<Alert severity='success'>
You've completed the modeling section of this tutorial. If desired, download a [reference version](../../assets/art/accessories/creating-rigid/Rigid_Mask_Texturing-Completed.blend) of this stage of the project for comparison.

There are many tools and workflows to create your own unique asset. For additional suggestions, try creating different asset types, such as shoulder pads or belts, or importing a reference model into Blender as a mannequin to sculpt and shape your cosmetics from scratch.
</Alert>

## Texturing

**Texturing** is the process of applying a surface appearance to a 3D object. Blender provides various tools and features to create and connect your own texture maps to your asset, allowing you to preview your model's final appearance and link the texture images to your exported file.

The mask example asset uses [Physically-Based Rendering (PBR) textures](../../art/modeling/surface-appearance.md), which are advanced textures that create realistic surfaces under different lighting environments. PBR textures use multiple image files, or **maps**, to represent the various surface properties of your 3D object.

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
While PBR textures are not required for accessories, adding PBR textures can add extra visual flair and realism to elevate your creations. For an example on using Blender to create a basic, non-PBR texture, see [Texturing Basic Clothing](../../art/accessories/creating/unwrapping.md).
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

If you are creating your own PBR textures, check out [Material References](../../art/modeling/material-reference.md) for various PBR material examples you can apply to your next accessory.
</Alert>

## Clean Up

After modeling and texturing your asset, you can begin the process of **exporting** your Blender project as a `.fbx`. The start of this process includes cleaning up your project, which can involve deleting or removing any extra objects, such as lights, cameras, or mannequin meshes, to ensure you only export the accessory mesh, and applying any modifiers to your mesh object.

An often forgotten cleanup step involves **applying your transformations**, also known as **freezing your transforms**, by setting your orientation, rotation, and scale deltas to zero. Failure to apply any transformations can result in unexpected behavior and orientation when importing the mesh in Studio.

To freeze your transforms:

1. In Object mode, select your mesh object.
2. Navigate to **Object** > **Apply** > **All Transforms**.

   <img src="../../assets/art/accessories/creating-rigid/Blender-Apply-Transforms.png" />

## Exporting

After modeling and texturing your asset, you can begin the process of **exporting** your Blender project as a `.fbx`. The start of this process includes cleaning up your project, which can involve deleting or removing any extra objects, such as lights, cameras, or mannequins, to ensure you only export the accessory mesh, and applying any modifiers to your mesh object.

Along with deleting your extra objects and mannequins, an often forgotten cleanup step involves **applying your transformations**, also known as **freezing your transforms**, by setting your orientation, rotation, and scale deltas to zero. Failure to apply any transformations can result in unexpected behavior and orientation when importing the mesh in Studio.

To freeze your transforms:

1. In Object mode, select your mesh object.
2. Navigate to **Object** > **Apply** > **All Transforms**.

   <img src="../../assets/art/accessories/creating-rigid/Blender-Apply-Transforms.png" />

To export your model as a `.fbx`:

1. In the topbar, click **File**.
2. Select **Export**, then **FBX (.fbx)**.
3. On the right-hand side of the file view window, change the **Path Mode** property to **Copy**, then toggle the **Embed Textures** button.

   <img src="../../assets/modeling/skinned-meshes/Blender-Export-Settings-1.png" width="320" />

4. Set the **Transform** > **Scale** to `.01`. This is required to maintain scale size for `.fbx` exports.

   <img src="../../assets/modeling/skinned-meshes/Blender-Export-Settings-2.png" width="320" />

5. Click the **Export FBX** button.

<Alert severity = 'success'>
You've completed the exporting section of this tutorial. If desired, download a [reference sample](../../assets/art/accessories/creating-rigid/Rigid_Mask_Export.fbx) of this exported file for comparison. You can use this reference in the next importing step.
</Alert>

## Importing

Studio's 3D Importer provides a quick and easy way to import third-party 3D assets into your projects. The importer provides object previews and error-checking to ensure that your asset meets Studio's general 3D requirements.

To import your asset:

1. In Studio, navigate to the **Avatar tab** and select the **3D Importer**.
2. In the file browser, select the `.fbx` file saved locally. The 3D Importer loads a preview of the object.

      <img src="../../assets/art/accessories/creating-rigid/3D-Importer.png" />

   1. If textures don't load for your asset, you can manually import your textures in Step 4.

3. Select **Import**. The asset populates in your workspace as a `Class.Model` with the appropriate textures applied as a `Class.SurfaceAppearance`.

   1. If textures didn't load correctly, add them manually. You may need to save and publish your experience in order to access the Asset Manager.

      1. Open the Asset Manager. You may need to save and publish your experience before accessing your assets.
      2. In the Asset Manager, select the **Bulk Import** button.

         <img src="../../assets/studio/asset-manager/Import-Button.png" width = "60%"/>

      3. Upload your image files.
      4. After moderation clears for your image, select the `Class.MeshPart` parented within your imported `Class.Model`.
      5. Add a `Class.SurfaceAppearance` child to your `Class.MeshPart`.

         <img src="../../assets/art/accessories/creating-rigid/Adding-Surface-Appearance.png" />

      6. In the `Class.SurfaceAppearance` properties, click each property value and assign the appropriate texture image from the asset dropdown:

         1. Set the **ColorMap** to the **\_ALB** texture image.
         2. Set the **MetalnessMap** to the **\_MTL** texture image.
         3. Set the **NormalMap** to the **\_NOR** texture image.
         4. Set the **RoughnessMap** to the **\_RGH** texture image.

            <img src="../../assets/art/accessories/creating-rigid/Surface-Appearance-Asset-Dropdown.png" />

<Alert severity = 'success'>
After successful import, your model object should populate in your project as a `Class.Model` with the appropriate textures applied. See [3D Importer](../../art/modeling/3d-importer.md) for additional information on import settings and troubleshooting.
</Alert>

## Converting

After importing your asset into Studio, you can begin **fitting** your imported object to a mannequin and **converting** the `Class.Model` object into a `Class.Accessory`. When fitting and converting your accessory it's important to use the **Accessory Fitting Tool (AFT)** to correctly preview the placement and apply the correct configurations to your accessory.

To fit and generate your accessory:

1. In the **Avatar** tab, open the **Accessory Fitting Tool (AFT)**.
2. In the new AFT panel, select the **Part** field and, in the workspace, select the accessory `Class.MeshPart` object in the workspace and press **Next**.

   <img src="../../assets/art/accessories/creating-rigid/AFT-Select-Mesh.png" />

3. On the Asset Type page, select the **type** of asset and the expected **body scale**. Press **Next** when complete.

   1. This tutorial uses a **Hat** asset with an **Proportions Normal** scale.
   2. Body scale is typically set based on the original sculpting and sizing of the asset. See [Body Scale](../../art/accessories/body-scale.md) for additional information on rigid accessory scaling.

      <img src="../../assets/art/accessories/creating-rigid/AFT-Select-Type.png" />

4. On the preview screen, select one of the humanoid characters as a mannequin:

   1. In the Avatars section, select a humanoid base body character.
   2. In the preview panel, deselect the previous selection. Only the humanoid body displays in the preview window.

      <img src="../../assets/art/accessories/creating-rigid/AFT-Add-Avatar-Panel.png" />

5. Using both the AFT preview window and the workspace, adjust the position, scale, and rotation of the accessory.

   1. Use the AFT preview window and your mannequin as an accurate preview of how your asset fits on the character. The clothing mannequin in the workspace does not accurately portray how rigid accessories attach.
   2. In the workspace, use the **Move**, **Scale**, and **Rotate** tools in the workspace to adjust the positioning of your rigid accessory.
   3. If you accidentally select something else, click back into the AFT panel to reselect the accessory and resume your adjustments using the transformation tools.

      <video controls src="../../assets/art/accessories/creating-rigid/Fitting-Mask.mp4" width="100%"></video>

6. After previewing and fitting your asset, select the **dropdown** next to **Generate** button to select **Generate Legacy Accessory** to create the Accessory and add it to your explorer.

   - For rigid accessories that you intend to sell on the Marketplace you must use the [Generate Legacy Accessory](./accessory-fitting-tool.md#generate-legacy-accessory) option when creating your Marketplace accessories.
   - PBR textures automatically convert to basic textures for these legacy accessories.

   <img src="../../assets/accessories/accessory-fitting-tool/Generate-Legacy-Accessory.png" width = "30%" alt="A dropdown appears above the GenerateMeshPartAccessory when expanded, displaying a Generate Legacy Accessory option."/>

<Alert severity = 'success'>
After successful fitting and converting, your 3D model should populate in your project as a `Class.Accessory`. With this `Class.Accessory` you can perform any of the following:

- [Upload the accessory](../../art/accessories/creating-rigid/publishing.md) to the Marketplace.- [Upload the accessory](../../art/accessories/creating-rigid/publishing.md) to the Marketplace.
- Use the accessory in your current experience by equipping it to character models with [HumanoidDescription](../../characters/appearance.md#humanoiddescription), or by dragging and dropping the accessory under the appropriate character `Class.Model` object.
- Save the accessory to your [Toolbox](../../projects/assets/toolbox.md) to share or use within any of your experiences.

</Alert>

## Validation

After generating your `Class.Accessory` item, you can now begin the process of **publishing** the asset to the Marketplace. This step is optional and only applicable for creators who intend to sell their asset.

The publishing process involves three major steps:

1. **Validation** - Validation occurs locally at the start of the upload process. This ensures that the accessory meets all of the technical requirements before uploading.
2. **Moderation** - After uploading, Studio sends the asset to the Moderation queue. Moderation typically completes within 24 hours.
3. **Ready-for-sale** - Once the asset clears moderation, you can set your marketplace settings and enable the asset for sale.

If you intend to sell the asset on the Marketplace, use the following steps to begin the validation and upload process:

1. In the Explorer, right-click your accessory object and **Save to Roblox**.

   <img src="../../assets/art/accessories/creating-rigid/Outliner-Save-To-Roblox.png" />

2. In the Asset Configuration Window, set the **Content Type** to **Avatar Item**.
3. Complete the following fields (you can adjust them later):

   1. **Title**: The name of your accessory.
   2. **Description**: A short description of your asset.
   3. **Asset Category**: The type of accessory. This should match the Accessory Type selected during the [Fitting and Conversion](../../art/accessories/creating-rigid/converting.md) process.
   4. **Creator**: Use the dropdown to select if you'd like to publish this asset as an individual or as part of an associated group.

      <img src="../../assets/art/accessories/creating-rigid/Validation-Successful.png" />

4. After you select the **Asset Category**, Studio begins validating the asset to ensure that it matches Roblox's accessory technical requirements.
   1. If set up correctly, the window displays a green Validation Successful confirmation.
   2. If you see an error `Could not find a Part called Handle...`, you may have published your accessory as a MeshPart instead of a legacy accessory. See [Using the Accessory Fitting Tool](#converting) step 6 for more information.
   3. If other errors appear, see the error messages for specific details. Some errors may require going back to the modeling software and adjusting the asset.
5. If the validation is successful, you can submit the asset to the upload and moderation queue for a fee. See [Fees and Commissions](../../marketplace/marketplace-fees-and-commissions.md) for current fee information.

## Publishing

After uploading your asset for moderation, you can check your asset's current moderation status on your [Creator Dashboard > Avatar Items](https://create.roblox.com/dashboard/creations). Moderation can take up to 24 hours during which a placeholder icon is used on the creation page.

After moderation completes, your item's publishing details become available to edit and enable for sale. See the following for an overview on the various sale options available:

<iframe width="800" height="450" src="https://www.youtube-nocookie.com/embed/swQW2VS9ZMA" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<br />

You now have your accessory added to the Marketplace catalog! Use the item's Marketplace link to view your listing at any time, or to send to your friends and followers for additional engagement.

<img src="../../assets/art/accessories/creating-rigid/Marketplace-Listing.png" />

<Alert severity = 'info'>
See the following resources for additional Marketplace policy and related information:

- [Marketplace policy](../../marketplace/marketplace-policy.md)
- [Fees and Commissions](../../marketplace/marketplace-fees-and-commissions.md)
- [Intellectual Property](../../marketplace/intellectual-property.md)
- [Moderation](../../marketplace/moderation.md)

</Alert>
