---
title: Export from Blender
description: Use Blender's .fbx exporter with the correct settings to create a Studio-ready asset.
prev: /art/accessories/creating-rigid/texturing
next: /art/accessories/creating-rigid/importing
---

<video controls src="../../../assets/art/accessories/creating-rigid/Exporting.mp4" width="100%"></video>

After modeling and texturing your asset, you can begin the process of **exporting** your Blender project as a `.fbx` or `.gltf`. For up-to-date settings, see [Export settings](../../modeling/export-requirements.md).

<Alert severity ='warning'>
If you are creating your own accessory object, it's important to clean up your project, which can involve deleting or removing any extra objects, such as lights, cameras, or mannequins, to ensure you only export the accessory mesh, and applying any modifiers to your mesh object.
</Alert>

To export your model as a `.fbx`:

1. In the topbar, click **File** > **Export** > **FBX (.fbx)**. The **Blender File View** window displays.
1. On the right-hand side, set **Path Mode** to **Copy**, then toggle the **Embed Textures** button.

   <img src="../../../assets/modeling/skinned-meshes/Blender-Export-Settings-1.png" width="320" />

1. In the **Transform** section, set **Apply Scalings** to **FBX Unit Scale**. If you run into scaling issues on import, see [Blender FBX scaling](../../../art/blender.md#adjust-scale-fbx) for alternative approaches.

   <img src="../../../assets/modeling/skinned-meshes/Blender-Export-Settings-5.png" width="320" />

1. Click the **Export FBX** button.

<Alert severity = 'success'>
You've completed the exporting section of this tutorial. If desired, download a [reference sample](../../../assets/art/accessories/creating-rigid/Chest-Texturing-Complete.fbx) of this exported file for comparison. You can use this reference in the next importing step.
</Alert>
