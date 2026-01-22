---
title: Import into Studio
description: Makeup is a cosmetic look made up of multiple facial textures and optional eyebrow and eyelashes.
---

<Alert severity ='warning'>
This feature is currently in beta. Enable it through **File** ⟩ **Beta Features** ⟩ **Avatar Makeup**. The information provided is subject to change and is intended to prepare creators for the final release. For the latest news and updates, see the [DevForum announcement](https://devforum.roblox.com/t/studio-beta-introducing-avatar-makeup/3973764).
</Alert>

## Import into Studio

If you are following the [common practice](./index.md#creation-process) of authoring makeup changes in a third-party tool, use the following import instructions to get your custom makeup textures into Roblox Studio:

<Alert severity = 'info'>
These instructions apply specifically to the Makeup test place, available in the [Makeup Beta downloadable resource](https://github.com/Roblox/avatar/tree/main/Makeup), which uses a script to programmatically apply a Decal to the face of the associated character
</Alert>

1. Before importing into Studio, ensure that your `.fbx` or `.gltf` template file is [correctly configured](specifications.md).
   1. Primarily, ensure that your model includes:
      - Target head mesh
      - Target head cage mesh
      - If modified, `Lips` mesh and associated textures.
      - If modified, `Face` mesh and associated textures.
      - If modified, `Eyes` mesh and associated textures.
2. In Studio, open up the Makeup test place.
3. Click **File** > **Import 3D** and select your 3D makeup asset. Verify there are no errors with the imported components.
4. Click **Import** to add the file into Studio. A new `Model` populates in the workspace.
5. In the Explorer, expand the new `Model`. Verify that `Decal` child objects have populated, each with their own `WrapTextureTransfer` child object.

    <GridContainer numColumns="2">
      <figure><img src="../assets/makeup/Imported-DataModel.png" width = "80%"/><figcaption>On import, makeup decals appear within the Model. </figcaption></figure>
      <figure><img src="../assets/makeup/Makeup-Studio-Datamodel.png" width = "60%" /><figcaption>Each decal parents a WrapTextureTransfer object</figcaption></figure>
   </GridContainer>

6. In the test place, copy your new `Decal` objects into a character model's `Makeup` folder.
   1. If you want to apply eyebrows or eyelashes, move those `MeshParts` into the character's `Accessories` folder. For this place file, you do not need to convert eyelashes and eyebrows into Accessories first.

   <img src="../assets/makeup/Makeup-Character-Folders.png" />

7. Press **Play** to playtest and verify that the character has the new makeup applied.

## Test with Avatar Setup

<iframe width="800" height="450" src="https://www.youtube-nocookie.com/embed/rHkHXl4Qkpg" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<br />

You can also use the Avatar Setup tool to preview makeup assets without playtesting.

1. Open the Avatar Setup tool by navigating to **Avatar** > **Setup**.
2. Select the model you would like to preview your assets on.
3. **For makeup decals,** such as eyes, face, and lips:
   1. In the Explorer, select any makeup decal assets you want to add into the Avatar Setup preview.
      1. The preview only supports valid makeup decals with a child `Class.WrapTextureTransfer`.
   2. In the Avatar Setup panel, click the **+** symbol to add the assets to the Avatar Setup tool.
   3. In the new prompt, specify the makeup asset type (eyes, face, lips), for each decal selected.
4. **For makeup meshes**, such as eyebrows and eyelashes:
   1. In the Explorer, move the `Class.MeshPart` objects as children within the avatar model in the Explorer, and then clicking the **+** button to add them to Avatar Setup.
5. In the Avatar Setup panel, navigate to the **Face** > **Makeup** tab and validate that your assets were properly imported into the tool.
6. Click on assets to equip them in your preview.
   1. Change the order of the assets by dragging their icons on the right side of the preview box.
   2. Click **X** to remove them from your avatar preview.
7. To see how makeup animates, navigate to the **Animations** tab, and test various sequences to see what your avatar looks like with the makeup applied.

For the best results during this beta period, use the avatars provided from Roblox in the test place. You may also bring in any other avatar, but the quality of the makeup fit depends on the head's underlying cage, which may result in varied appearance if not properly aligned.
