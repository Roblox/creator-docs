---
title: Import clothing accessories
description: Use the 3D Importer to add third-party models to Studio before using the Accessory Fitting Tool to convert the model to an Accessory.
---

Use the following instructions to [import](#import-3d-assets) your `.fbx` or `.gltf` third-party model into Studio and [convert](#convert-layered-accessories) the asset to a clothing `Accessory` object that you can save to use in your experience, share with others, or upload to the Marketplace.

<Alert severity ='info'>
The following asset example and instructions are part of the [Clothing accessory tutorial](../accessories/creating/index.md) which covers the process of converting a model from Blender to publishing the asset to the Marketplace.
</Alert>

## Import 3D assets

Studio's 3D Importer provides a quick and easy way to import third-party 3D assets into your projects. The importer provides object previews and error-checking to ensure that your asset meets Roblox's [general 3D requirements](../modeling/specifications.md).

Keep in mind, your 3D layered accessory must also follow Roblox's [clothing specifications](../accessories/clothing-specifications.md) to eventually use this asset as a layered `Class.Accessory`, or you may experience errors later in the workflow.

To import your asset:

1. From Studio's **File** menu, select **3D Importer**.
2. In the file browser, select the `.fbx` or `.gltf` file saved locally. The 3D Importer loads a preview of the object.

   - If textures don't load for your asset, you can manually import your textures later.
   - See [3D Importer](../../art/modeling/3d-importer.md) for additional information on import settings and troubleshooting.

3. Select **Import**. The asset populates in your workspace as a `Class.Model` with the appropriate textures applied as a `Class.SurfaceAppearance` or `Class.MeshPart.TextureID`.

<BaseAccordion>
<AccordionSummary>Manually add textures</AccordionSummary>
<AccordionDetails>
 If textures didn't load correctly, add them manually. You may need to save and publish your experience in order to access the [Asset Manager](../../projects/assets/manager.md).

1.  In the **Asset Manager**, click the **Import** button.
2.  Upload your image files.
3.  After moderation clears for your image, select the `Class.MeshPart` parented within your imported `Class.Model`.
4.  If you are using a single basic texture, set the `Class.MeshPart.TextureID` property to your uploaded texture image.
5.  If you are using PBR textures:

    1. Add a `Class.SurfaceAppearance` child to your `Class.MeshPart`.

       <img src="../../assets/art/accessories/creating-rigid/Adding-Surface-Appearance.png" />

    2. In the `Class.SurfaceAppearance` properties, click each property value and assign the appropriate texture image from the asset dropdown:

       1. Set the **ColorMap** to the **\_ALB** texture image.
       2. Set the **MetalnessMap** to the **\_MTL** texture image.
       3. Set the **NormalMap** to the **\_NOR** texture image.
       4. Set the **RoughnessMap** to the **\_RGH** texture image.

       <img src="../../assets/art/accessories/creating-rigid/Surface-Appearance-Asset-Dropdown.png" />

</AccordionDetails>
</BaseAccordion>

<Alert severity = 'success'>
After successful import, your model object should populate in your project as a `Class.Model` with the appropriate textures applied. See [3D Importer](../../art/modeling/3d-importer.md) for additional information on import settings and troubleshooting.
</Alert>

## Convert layered accessories

With the `Class.Model` in your project, the last step in the process of clothing creation requires you to use the [Accessory Fitting Tool](../../art/accessories/accessory-fitting-tool.md) (AFT) to convert this object to a standard `Class.Accessory` that avatar characters can equip.

<Alert severity = 'warning'>
For shoes, you must convert the left shoe and the right shoe as separate accessories. Use the following instructions for each shoe before grouping both shoe accessories as a `Class.Model` when [saving to Roblox](../../marketplace/publish-to-marketplace.md#upload-an-asset).
</Alert>

To generate the accessory object:

1. In the toolbar's **Avatar** tab, click **Accessory** to open the AFT.
2. Select the `Class.Model` of the clothing item in the viewport. The tool's text field populates with the name of the object selected. Alternatively, you can select the object within the **Explorer** window.
3. Test out various sample characters, clothing, and animations. See [Test accessories](../../art/accessories/accessory-fitting-tool.md#test-accessories) for additional information.
   - If required, make minor cage adjustments using the editing features. Larger cage changes may require returning to your third-party modeling software and re-exporting the asset.
4. When ready to generate your accessory, click **Generate MeshPart Accessory**. The accessory object with your model populates in your workspace.

      <GridContainer numColumns="2">
      <figure>
         <img src="../../assets/art/accessories/creating/Exporting-Clothing-in-Studio-Highlight.png" />
         <figcaption>Clothing accessory in viewport</figcaption>
      </figure>
      <figure>
         <img src="../../assets/art/accessories/creating/Exporting-Accessory-Explorer.png" />
         <figcaption>Clothing accessory in Explorer</figcaption>
      </figure>
      </GridContainer>

After successful fitting and converting, your 3D model should populate in your project as an `Class.Accessory`. With this `Class.Accessory` you can perform any of the following:

- Begin the process of [uploading and publishing](../../marketplace/publish-to-marketplace.md#upload-an-asset) the clothing accessory to the Marketplace.

- Use the accessory in your current experience by equipping it to character models with [HumanoidDescription](../../characters/appearance.md#manually-modify-appearance), or by dragging and dropping the accessory under the appropriate character `Class.Model` object.

- Save the accessory to your [Toolbox](../../projects/assets/toolbox.md) or make it public on the [Creator Store](../../production/creator-store.md) to share or use within any of your experiences.
