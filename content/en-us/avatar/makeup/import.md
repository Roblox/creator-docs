---
title: Import into Studio
description: Makeup is a cosmetic look made up of multiple facial textures and optional eyebrow and eyelashes.
---

Studio's Importer lets you import 3D assets into your projects, such as avatar clothing, accessories, and Roblox's [template heads](./index.md#template-heads) for makeup. The following instructions detail how to import a `.fbx` or `.gltf` template file from the best practice [creation process](./index.md#creation-process) into Studio as a `Model` object that you can use in your games, upload to the Marketplace, or share with other creators.

<Alert severity = 'info'>
These instructions apply specifically to the [Makeup test place](https://github.com/Roblox/avatar/tree/main/Makeup) that uses a script to programmatically apply a decal to the face of the associated character.
</Alert>

To import your asset as a makeup model:

1. Before you begin, it's important to ensure that your template file includes the following objects that are correctly configured to meet Roblox's [makeup specifications](./specifications.md), otherwise you can encounter errors in later steps:

   - Target head mesh
   - Target head cage mesh
   - If modified, `Lips` mesh and associated textures.
   - If modified, `Face` mesh and associated textures.
   - If modified, `Eyes` mesh and associated textures.

1. In Studio, open up the [Makeup test place](https://github.com/Roblox/avatar/tree/main/Makeup).
1. In the topbar, click **File** > **Import**, then select your 3D makeup asset. The **Importer** window displays.
1. Verify there are no errors with the imported components, then click **Import** to add the file into Studio. A new `Model` populates in the workspace.
1. In the **Explorer** window, expand the new `Model` and verify that `Decal` child objects have populated, each with their own `WrapTextureTransfer` child object.

    <GridContainer numColumns="2">
      <figure><img src="../../assets/makeup/Imported-DataModel.png" width = "100%"/><figcaption>On import, makeup decals appear within the Model. </figcaption></figure>
      <figure><img src="../../assets/makeup/Makeup-Studio-Datamodel.png" width = "100%" /><figcaption>Each decal parents a WrapTextureTransfer object</figcaption></figure>
   </GridContainer>

1. Copy your new `Decal` objects into a character model's `Makeup` folder.
1. <Chip label="OPTIONAL" size="small" variant="outlined" /> If you want to apply eyebrows or eyelashes, move those `Class.MeshPart` objects into the character's **Accessories** folder. For this place file, you do not need to convert eyelashes and eyebrows into Accessories first.

   <img src="../../assets/makeup/Makeup-Character-Folders.png" />

1. Press **Play** to playtest and verify that the character has the new makeup applied.

## Test with Avatar Setup

<iframe width="800" height="450" src="https://www.youtube-nocookie.com/embed/BezI4tL4E5k" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
<br />

You can also use the Avatar Setup tool to preview makeup assets without playtesting.

1. Open the Avatar Setup tool by navigating to **Avatar** > **Setup**.
1. Select the model you would like to preview your assets on.
1. For makeup **decals**, such as eyes, face, and lips:
   1. In the **Explorer** window, select any makeup decal assets you want to add into the Avatar Setup preview. The preview only supports valid makeup decals with a child `Class.WrapTextureTransfer`.
   1. In the Avatar Setup panel, click the **+** symbol to add the assets to the Avatar Setup tool.
   1. In the new prompt, specify the makeup asset type (eyes, face, lips), for each decal selected.
1. For makeup **meshes**, such as eyebrows and eyelashes:
   1. In the **Explorer** window, move the `Class.MeshPart` objects as children within the avatar model.
   1. In the Avatar Setup panel, click the **+** symbol to add the assets to the Avatar Setup tool.
1. In the Avatar Setup panel, navigate to the **Face** > **Makeup** tab, then validate that your assets were properly imported into the tool.
1. Click on assets to equip them in your preview.
   1. Change the order of the assets by dragging their icons on the right side of the preview box.
   1. Click **X** to remove them from your avatar preview.
1. To see how makeup animates, navigate to the **Animations** tab, then test various sequences to see what your avatar looks like with the makeup applied.

For the best results, use the avatars provided from Roblox in the test place. You may also bring in any other avatar, but the quality of the makeup fit depends on the head's underlying cage, which may result in varied appearance if not properly aligned.
