---
title: Import character bodies
description: Use the 3D Importer to add third-party models to Studio before testing, using, or uploading the character model.
---

Use the following instructions to import a full character body model into Studio as a `Model` object that you can save to use in your experience, share with others, or upload to the Marketplace.

<Alert severity ='info'>
If you are using a single-mesh character body for the Roblox Auto-Setup tool, see [Avatar auto-setup](../../avatar-setup/).
</Alert>

Studio's 3D Importer provides a quick and easy way to import third-party 3D assets into your projects. The importer provides object previews and error-checking to ensure that your asset meets Roblox's [general 3D requirements](../modeling/specifications.md).

Keep in mind, your character model must also follow Roblox's [avatar character specifications](../characters/specifications.md) to use or sell this asset as an avatar-ready character model, or you may experience errors later in the workflow.

To import your asset:

1. From Studio's **File** menu, select **3D Importer**.
2. In the file browser, select the `.fbx` or `.gltf` file saved locally. The 3D Importer loads a preview of the object.

    <img src="../../assets/art/avatar/Avatar-3D-Importer.png" width = "60%"/>

   - If textures don't load for your asset, you can manually import your textures later.
   - See [3D importer](../../art/modeling/3d-importer.md) for additional information on import settings and troubleshooting.

3. To begin body validation after import, enable **Validate UGC Body**. This can save you time if you intend on uploading your body to the Marketplace.
4. Set the **Rig Scale** to the appropriate [Body Scale](../characters/specifications.md#body-scale) of your character.
   <img src="../../assets/art/avatar/Avatar-Rig-Scale.png" width = "60%"/>

5. Select **Import**. The asset populates in your workspace as a `Class.Model` with the appropriate textures applied as a `Class.SurfaceAppearance` or `Class.MeshPart.TextureID`.

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

       <img src="../../assets/art/avatar/Avatar-Surface-Appearance.png" />

    2. In the `Class.SurfaceAppearance` properties, click each property value and assign the appropriate texture image from the asset dropdown:

       1. Set the **ColorMap** to the **\_ALB** texture image.
       2. Set the **MetalnessMap** to the **\_MTL** texture image.
       3. Set the **NormalMap** to the **\_NOR** texture image.
       4. Set the **RoughnessMap** to the **\_RGH** texture image.

       <img src="../../assets/art/avatar/Avatar-Roughness-Map.png" />

</AccordionDetails>
</BaseAccordion>

<Alert severity = 'success'>
After successful import, your model object should populate in your project as a `Class.Model` with the appropriate textures applied.
</Alert>

After successful fitting and converting, your 3D model should populate in your project as an `Class.Model`.

      <GridContainer numColumns="2">
      <figure>
         <img src="../../assets/art/avatar/Avatar-Studio-Example.png" />
         <figcaption>Avatar-ready character model in Workspace</figcaption>
      </figure>
      <figure>
         <img src="../../assets/art/avatar/Avatar-Data-Model.png" />
         <figcaption>Avatar-ready character model in Explorer</figcaption>
      </figure>
      </GridContainer>

<Alert severity = 'warning'>
Character creation is a complex process that requires lots of testing and iteration. See [Test characters](../../art/characters/testing/index.md) for steps on importing your character model into a test place and verifying your avatar and related components.
</Alert>

With this new character `Class.Model`, you can perform any of the following:

- Begin the process of [uploading and publishing](../../marketplace/publish-to-marketplace.md#upload-an-asset) the character model to the Marketplace. This involves some additional validation and moderation steps.

- Use the model in your current experience and modify the model's appearance with [HumanoidDescription](../../characters/appearance.md#manually-modify-appearance).

  - Playtest as the character by renaming the `Class.Model` to `StarterCharacter` and moving the `Class.Model` to the `Class.StarterPlayer` folder in the **Explorer** before play testing.

- Save the model to your [Toolbox](../../projects/assets/toolbox.md) or make it public on the [Creator Store](../../production/creator-store.md) to share or use within any of your experiences.
