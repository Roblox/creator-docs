---
title: Import into Studio
description: Makeup is a cosmetic look made up of multiple facial textures and optional eyebrow and eyelashes.
hideBreadcrumbs: true
---

<Alert severity ='warning'>
Makeup is currently in beta and is not yet available for sale or implementation in-experience. The information provided is subject to change and is intended to prepare creators for the final release. For the latest news and updates, see the [DevForum announcement](https://devforum.roblox.com/t/studio-beta-introducing-avatar-makeup/3973764).
</Alert>

If you are following the [common practice](./index.md#creation-process) of authoring makeup changes in a third-party tool, use the following import instructions to get your custom makeup textures into Roblox Studio:

<Alert severity = 'info'>
These instructions apply specifically to the Makeup test place, available in the [Makeup Beta downloadable resource](https://github.com/Roblox/avatar/tree/main/Makeup), which uses a script to programmatically apply a Decal to the face of the associated character
</Alert>

1. Before importing into Studio, ensure that your `.fbx` or `.gltf` template file is [correctly configured](specifications.md).
   1. Primarily, ensure that your model includes:
      - Target head mesh
      - Target head cage mesh
      - `Lips` mesh and associated textures.
      - `Face` mesh and associated textures.
      - `Eyes` mesh and associated textures.
2. In Studio, open up the Makeup test place.
3. Click **File** > **Import 3D** and select your 3D makeup asset. Verify there are no errors with the imported components.
4. Click **Import** to add the file into Studio. A new `Model` populates in the workspace.
5. In the Explorer, expand the new `Model`. Verify that `Decal` child objects have populated, each with their own `WrapTextureTransfer` child object.

    <img src="../assets/makeup/Makeup-Studio-Datamodel.png" width="25%" />
6. In the test place, copy your new `Decal` objects into a character model's `Makeup` folder.
   1. If you want to apply eyebrows or eyelashes, move those `MeshParts` into the character's `Accessories` folder. For this place file, you do not need to convert eyelashes and eyebrows into Accessories first.
7. Press **Play** to playtest and verify that the character has the new makeup applied.
