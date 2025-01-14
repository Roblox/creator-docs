---
title: Export
description: Use Blender's FBX export with specific settings when exporting a clothing asset.
prev: /art/accessories/creating/modify-cage
next: /art/accessories/creating/importing
---

It's important to follow the Blender export settings to ensure a Studio-compatible `.fbx` file. Before exporting your file, ensure that you've removed extra objects, such as lights, cameras, or mannequins, and applied or removed any active modifiers.

To export your file from Blender:

1. In the topbar, click **File**. A pop-up menu displays.
2. Select **Export**, then **FBX (.fbx)**. The **Blender File View** window displays.
3. On the right-hand side, change the **Path Mode** property to **Copy**, then toggle the **Embed Textures** button.

   <img src="../../../assets/modeling/skinned-meshes/Blender-Export-Settings-1.png" width="320" />

4. If your project doesn't have .01 scene unit scaling, set the **Transform** > **Scale** to `.01`.

   <img src="../../../assets/modeling/skinned-meshes/Blender-Export-Settings-2.png" width="320" />

5. Under the **Armature** section, disable **Add Leaf Bones**.

   <img src="../../../assets/modeling/skinned-meshes/Blender-Export-Settings-3.png" width="320" />

6. Disable **Bake Animation**.

   <img src="../../../assets/modeling/skinned-meshes/Blender-Export-Settings-4.png" width="320" /> <br />

7. Click the **Export FBX** button.

<Alert severity ='success'>
You've completed the exporting section of this tutorial. If desired, download a [reference sample](../../../assets/art/accessories/creating/Long_Sleeve_Export.fbx) of this exported file for comparison. You can use this reference in the next importing step.
</Alert>
