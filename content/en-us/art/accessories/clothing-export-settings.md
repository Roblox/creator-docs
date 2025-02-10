---
title: Layered clothing export settings
description: Use the appropriate export settings in Maya and Blender to generate Studio-ready .fbx files.
---

Export your mesh or model as a `.fbx` or `.gltf` to take advantage of all of Studio's 3D import features. When rigging or skinning a layerable model, these file types contains all the mesh and texture data, including the rig and influence data, you need to later [import](../../art/modeling/3d-importer.md) into Studio.

- If you are creating a rigid accessory, ensure that your model follows [rigid accessory specifications](../../art/accessories/specifications.md) and use the [rigid export settings](../../art/accessories/export-settings.md).
- If you are creating an avatar character model, ensure that your model follows [character specifications](../../art/characters/specifications.md) and use the [character body export settings](../../art/characters/export-settings.md).
- If you are creating a generic mesh, ensure that your model follows Roblox's [general specifications](../../art/modeling/specifications.md) and use the [general export settings](../../art/modeling/export-requirements.md).

<Alert severity = 'warning'>
If you have any modifiers to your mesh or project objects, make sure to apply
or delete them before export.
</Alert>

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

6. Click the **Export FBX** button.
7. After exporting, use Studio's [3D Importer](../../art/modeling/3d-importer.md) to import your model and the [Accessory Fitting Tool](../../art/accessories/accessory-fitting-tool.md) to convert the model into an accessory.

</TabItem>
<TabItem label="Maya">
To export a mesh in Maya as a `.fbx` file:

1. In the topbar, click **File**. A pop-up menu displays.
2. Select **Export All**. The **Export All** window displays.
3. Near the bottom of the window, click the **Files of type** dropdown, then select **FBX export**.
4. On the right-hand side of the window, navigate to the **Options...** section.
5. In the **Geometry** section, enable **Smooth Mesh** and **Referenced Asset Content**.
6. If you need to import textures as a `.png`, in the **Embed Media** section, enable **Embed Media**.
7. In the **Advanced Options** section,
   - Navigate to **Units**, then enable **Automatic**.
   - Navigate to **Axis Conversion**, then set the **Up Axis** property to **Y**.
   - Navigate to **FBX File Format**, then set the **Type** property to **Binary**, and the **Version** property to **FBX 2020**.
8. Click the **Export All** button.
   <img src="../../assets/accessories/lc-requirements-maya-settings.png" />
9. After exporting, use Studio's [3D Importer](../../art/modeling/3d-importer.md) to import your model and the [Accessory Fitting Tool](../../art/accessories/accessory-fitting-tool.md) to convert the model into an accessory.

</TabItem>
</Tabs>
