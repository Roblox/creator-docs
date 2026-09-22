---
title: Export
description: Use Blender's FBX export with specific settings when exporting a clothing asset.
prev: /art/accessories/creating/modify-cage
next: /art/accessories/creating/importing
---

It's important to follow the Blender export settings to ensure a Studio-compatible `.fbx` file. Before exporting your file, ensure that you've removed extra objects, such as lights, cameras, or mannequins, and applied or removed any active modifiers.

To export your file from Blender:

1. In the Outliner, unhide all objects, make them selectable, then select everything in your project.

   <img src="../../../assets/modeling/skinned-meshes/Blender-Export-Settings-0.png" width="320" />

1. In the topbar, click **File** > **Export** > **FBX (.fbx)**. The **Blender File View** window displays.
1. On the right-hand side, set **Path Mode** to **Copy**, then toggle the **Embed Textures** button.

   <img src="../../../assets/modeling/skinned-meshes/Blender-Export-Settings-1.png" width="320" />

1. In the **Include** section, enable **Selected Objects**.
1. In the **Transform** section, set **Apply Scalings** to **FBX Unit Scale**. If you run into scaling issues on import, see [Blender FBX scaling](../../../art/blender.md#adjust-scale-fbx) for alternative approaches.

   <img src="../../../assets/modeling/skinned-meshes/Blender-Export-Settings-5.png" width="320" />

1. In the **Armature** section, disable **Add Leaf Bones**.

   <img src="../../../assets/modeling/skinned-meshes/Blender-Export-Settings-3.png" width="320" />

1. Disable **Bake Animation**.

   <img src="../../../assets/modeling/skinned-meshes/Blender-Export-Settings-4.png" width="320" />

1. Click the **Export FBX** button.

<Alert severity ='success'>
You've completed the exporting section of this tutorial. If desired, download a [reference sample](../../../assets/art/accessories/creating/Long_Sleeve_Export.fbx) of this exported file for comparison. You can use this reference in the next importing step.
</Alert>
