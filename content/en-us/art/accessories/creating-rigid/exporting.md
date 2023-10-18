---
title: Exporting FBX
description: Use Blender's .fbx exporter with the correct settings to create a Studio-ready asset.
prev: /art/accessories/creating-rigid/clean-up
next: /art/accessories/creating-rigid/importing
---

After modeling and texturing your asset, you can begin the process of **exporting** your Blender project as a `.fbx`. The start of this process includes cleaning up your project, which can involve deleting or removing any extra objects, such as lights, cameras, or mannequins, to ensure you only export the accessory mesh, and applying any modifiers to your mesh object.

Along with deleting your extra objects and mannequins, an often forgotten cleanup step involves **applying your transformations**, also known as **freezing your transforms**, by setting your orientation, rotation, and scale deltas to zero. Failure to apply any transformations can result in unexpected behavior and orientation when importing the mesh in Studio.

To freeze your transforms:

1. In Object mode, select your mesh object.
2. Navigate to **Object** > **Apply** > **All Transforms**.

   <img src="../../../assets/art/accessories/creating-rigid/Blender-Apply-Transforms.png" />

To export your model as a `.fbx`:

1. In the topbar, click **File**.
2. Select **Export**, then **FBX (.fbx)**.
3. On the right-hand side of the file view window, change the **Path Mode** property to **Copy**, then toggle the **Embed Textures** button.

   <img src="../../../assets/modeling/skinned-meshes/Blender-Export-Settings-1.png" width="320" />

4. Set the **Transform** > **Scale** to `.01`. This is required to maintain scale size for `.fbx` exports.

   <img src="../../../assets/modeling/skinned-meshes/Blender-Export-Settings-2.png" width="320" />

5. Click the **Export FBX** button.

<Alert severity = 'success'>
You've completed the texturing section of this tutorial. If desired, download a [reference sample](../../../assets/art/accessories/creating-rigid/Rigid_Mask_Export.fbx) of this exported file for comparison. You can use this reference in the next importing step.
</Alert>
