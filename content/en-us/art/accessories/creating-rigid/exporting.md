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

1. In the topbar, click **File**.
2. Select **Export**, then **FBX (.fbx)**.
3. On the right-hand side of the file view window, change the **Path Mode** property to **Copy**, then toggle the **Embed Textures** button.

   <img src="../../../assets/modeling/skinned-meshes/Blender-Export-Settings-1.png" width="320" />

4. Set the **Transform** > **Scale** to `.01`. This is required to maintain scale size for `.fbx` exports.

   <img src="../../../assets/modeling/skinned-meshes/Blender-Export-Settings-2.png" width="320" />

5. Click the **Export FBX** button.

<Alert severity = 'success'>
You've completed the exporting section of this tutorial. If desired, download a [reference sample](../../../assets/art/accessories/creating-rigid/Rigid_Mask_Export.fbx) of this exported file for comparison. You can use this reference in the next importing step.
</Alert>
