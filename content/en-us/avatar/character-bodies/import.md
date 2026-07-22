---
title: Import character bodies
description: Use the Importer to add third-party models to Studio before testing, using, or uploading the character model.
---

Studio's Importer lets you import 3D assets into your projects, such as avatar clothing, accessories, and character bodies. The following instructions detail how to import a character body `.fbx` or `.gltf` file into Studio as a `Model` object that you can use in your games, upload to the Marketplace, or share with other creators.

<Alert severity ='info'>
If your `.fbx` or `.gltf` file is a single mesh, you can use the [Avatar Setup](../../avatar-setup/) tool to automatically partition the mesh into the appropriate 15 body parts necessary for an avatar character body.
</Alert>

While the Importer provides object previews and error-checking to ensure that your creation meets Roblox's [general 3D requirements](../../art/modeling/specifications.md), it's important to ensure that your character model also meets Roblox's [character body specifications](./specifications.md) to use or sell this asset as an avatar-ready character model, otherwise you can encounter errors at different points in the workflow.

To import your asset as a character body model:

1. In the **Home** tab, click the **Import** button to open the 3D Importer. A file browser opens.
1. Select your rigged character's `.fbx` or `.gltf` file. The 3D Importer loads a preview of the character model.

    <img src="../../assets/art/avatar/Avatar-3D-Importer.png" width = "80%"/>

   - If textures don't load for your asset, you can manually import your textures later.
   - For additional information on import settings and troubleshooting, see [Importer](../../studio/importer.md).

1. In the **Rig General** section,
   1. <Chip label="OPTIONAL" size="small" variant="outlined" /> If you are importing a [higher-fidelity rig](./specifications.md#higher-fidelity-rigs), set **Rig Type** to **Custom Humanoid**.
   1. Set **Rig Scale** to the appropriate [Body Scale](./specifications.md#body-scale) of your character.
   1. Set **Constraint Type** to **Joint Upgrade**.

   <img src="../../assets/art/avatar/Rig-General.png" width = "60%"/>

1. Select **Import**. The asset populates in your workspace as a `Class.Model` with the appropriate textures applied as a `Class.SurfaceAppearance` or `Class.MeshPart.TextureID`.

   <GridContainer numColumns="2">
   <figure>
   <img src="../../assets/art/avatar/Avatar-Studio-Example.png" />
   </figure>
   <figure>
   <img src="../../assets/art/avatar/Avatar-Data-Model.png" />
   </figure>
   </GridContainer>

<BaseAccordion>
<AccordionSummary>Textures didn't load correctly?</AccordionSummary>
<AccordionDetails>
If your textures didn't load correctly, you can import them manually using the [Asset Manager](../../projects/assets/manager.md):

1. In the **Asset Manager**, click the **Import** button. If you are unable to access the Asset Manager, save and publish your game first.
1. Upload your image files.
1. After moderation clears your images, select the `Class.MeshPart` parented within your imported `Class.Model`.
1. If you are using a single basic texture, set the `Class.MeshPart.TextureID` property to your uploaded texture image.
1. If you are using PBR textures:

   1. Add a `Class.SurfaceAppearance` child to your `Class.MeshPart`.

      <img src="../../assets/art/avatar/Avatar-Surface-Appearance.png" width = "40%"/>

   1. In the `Class.SurfaceAppearance` properties, click each property value and assign the appropriate texture image from the asset dropdown:

      1. Set the **ColorMap** to the **\_ALB** texture image.
      1. Set the **MetalnessMap** to the **\_MTL** texture image.
      1. Set the **NormalMap** to the **\_NOR** texture image.
      1. Set the **RoughnessMap** to the **\_RGH** texture image.

      <img src="../../assets/art/avatar/Avatar-Roughness-Map.png" width = "50%"/>

</AccordionDetails>
</BaseAccordion>
<br />

With this new character `Class.Model`, you can perform any of the following:

- If your character includes a [higher-fidelity rig](./specifications.md#higher-fidelity-rigs), add a `Class.HumanoidRigDescription` and/or `Class.DigitsRigDescription` objects for Marketplace and animation requirements. You may need to use the [Adaptive Animation](../../characters/adaptive-animation.md) plugin to remap your joints and set a baseline t-pose reference to better support your animations.
- Begin the process of [uploading and publishing](../../marketplace/publish-to-marketplace.md#upload-an-asset) the character model to the Marketplace. This involves some additional validation and moderation steps.
- Use the model in your current game and modify the model's appearance with [HumanoidDescription](../../characters/appearance.md#manually-modify-appearance).

  - Playtest as the character by renaming the `Class.Model` to `StarterCharacter` and moving the `Class.Model` to the `Class.StarterPlayer` folder in the **Explorer** before play testing.

- Save the model to your [Toolbox](../../projects/assets/toolbox.md) or make it public on the [Creator Store](../../production/creator-store.md) to use within any of your games or share with other creators.

<Alert severity = 'warning'>
Character creation is a complex process that requires lots of testing and iteration. For information on importing your character model into a test place and verifying your avatar and related components, see [Test characters](../../art/characters/testing/index.md).
</Alert>
