---
title: Export Settings
description: Use the appropriate export settings in Maya and Blender to generate Studio-ready .fbx files.
---

Export your mesh or model as a `.fbx` to take advantage of all of Studio's 3D import features. When rigging or skinning a layerable model, a `.fbx` export contains both the rig and influence data you need to later [import](../../art/modeling/3d-importer.md) into Studio.

Before exporting, check that your model meets Roblox's [accessory specifications](../../art/accessories/specifications.md) to ensure Studio compatibility. Rigid accessories do not require any of the [layered specifications](../../art/accessories/specifications.md#layered-requirements), but still need to adhere to the other requirements. If you have any modifiers to your mesh or project objects, make sure to apply or delete them before export.

- If you are creating an avatar character model, ensure that your model follows [Character Specifications](../../art/characters/specifications.md).
- If you are creating a generic mesh, ensure that your model follows Roblox's [General Specifications](../../art/modeling/specifications.md).

<Tabs>
  <TabItem label="Blender">

Before exporting a mesh from Blender, make sure either your **Scene Properties** > **Unit Scale** to `.01` or your export **Transform** > **Scale** is set to `.01` (step 4) to ensure similar `.fbx` scaling within Studio.

To export the `.fbx` file in Blender:

1. In the topbar, click **File**. A pop-up menu displays.
2. Select **Export**, then **FBX (.fbx)**. The **Blender File View** window displays.
3. On the right-hand side, change the **Path Mode** property to **Copy**, then toggle the **Embed Textures** button.

   <img src="../../assets/modeling/skinned-meshes/Blender-Export-Settings-1.png" width="320" />

4. If your project doesn't already have .01 scene unit scaling, set the **Transform** > **Scale** to `.01`.

   <img src="../../assets/modeling/skinned-meshes/Blender-Export-Settings-2.png" width="320" />

5. Under the **Armature** section, disable **Add Leaf Bones**.

   <img src="../../assets/modeling/skinned-meshes/Blender-Export-Settings-3.png" width="320" />

6. Unless exporting content with animation keyframes, such as a walk cycle or a character with [facial animation data](../../art/characters/facial-animation/index.md), disable **Bake Animation**.

   <img src="../../assets/modeling/skinned-meshes/Blender-Export-Settings-4.png" width="320" /> <br />

7. Click the **Export FBX** button.
8. After exporting, use Studio's [3D Importer](../../art/modeling/3d-importer.md) to import your model and the [Accessory Fitting Tool](../../art/accessories/accessory-fitting-tool.md) to convert the model into an accessory.

</TabItem>
<TabItem label="Maya">
To export a mesh in Maya as a `.fbx` file:

1. In the topbar, click **File**. A pop-up menu displays.
2. Select **Export All**. The **Export All** window displays.
3. Near the bottom of the window, click the **Files of type** dropdown, then select **FBX export**.
4. On the right-hand side of the window, navigate to the **Options...** section.
5. In the **Geometry** section, enable **Smooth Mesh** and **Referenced Asset Content**.
6. In the **Animation** section, disable **Animation**, unless you need to import an animation to Studio.
7. If you need to import textures as a `.png`, in the **Embed Media** section, enable **Embed Media**.
8. In the **Advanced Options** section,
   - Navigate to **Units**, then enable **Automatic**.
   - Navigate to **Axis Conversion**, then set the **Up Axis** property to **Y**.
   - Navigate to **FBX File Format**, then set the **Type** property to **Binary**, and the **Version** property to **FBX 2020**.
9. Click the **Export All** button.
   <img src="../../assets/accessories/lc-requirements-maya-settings.png" />
10. After exporting, use Studio's [3D Importer](../../art/modeling/3d-importer.md) to import your model and the [Accessory Fitting Tool](../../art/accessories/accessory-fitting-tool.md) to convert the model into an accessory.

</TabItem>
</Tabs>
