---
title: Rigid accessory export settings
description: Use the appropriate export settings in Maya and Blender to generate Studio-ready .fbx files.
---

Export your rigid accessory model as a `.fbx` or `.gltf` file to take advantage of all of Studio's 3D import features. These file types contains mesh and texture data you need to later [import](../../art/modeling/3d-importer.md) into Studio.

<Alert severity = 'warning'>
<AlertTitle>If creating other types of 3D models:</AlertTitle>
<ul>
<li>For generic meshes, see [general mesh specifications](../modeling/specifications.md) and [general export settings](../modeling/export-requirements.md).</li> <br />
<li>For layered accessories, see [layered accessory specifications](../accessories/clothing-specifications.md) and [layered export settings](../accessories/clothing-export-settings.md).</li> <br />
<li>For avatar characters, see [avatar specifications](../../art/characters/specifications.md) and [avatar export settings](../characters/export-settings.md).</li>
</ul>
</Alert>

<Alert severity = 'warning'>
If you have any modifiers to your mesh or project objects, make sure to apply
or delete them before export.
</Alert>

## Blender

Blender allows you to export in `.fbx` or `.gltf` as well as other formats. If you are using `.fbx` export, familiarize yourself with [Blender's FBX scaling](../blender.md#adjust-scale-fbx) to ensure that you successfully import the model into Studio at the correct scale.

### Export settings

To export the `.fbx` file in Blender:

1. In the topbar, click **File**. A pop-up menu displays.
2. Select **Export**, then **FBX (.fbx)**. The **Blender File View** window displays.
3. On the right-hand side, change the **Path Mode** property to **Copy**, then toggle the **Embed Textures** button.
   <img src="../../assets/modeling/skinned-meshes/Blender-Export-Settings-1.png" width="320" />
4. Set **Transform** > **Apply Scalings** to **Unit Scale**. For more information, see [scaling and scene units](../blender.md#adjust-scale-fbx).
   <img src="../../assets/modeling/skinned-meshes/Blender-Export-Settings-5.png" width="320" />
5. Click the **Export FBX** button.
6. After exporting, use Studio's [3D Importer](../../art/modeling/3d-importer.md) to import your model and the [Accessory Fitting Tool](../../art/accessories/accessory-fitting-tool.md) to convert the model into an accessory.

## Maya export settings

To export a mesh in Maya as a `.fbx` file:

1. In the topbar, click **File**. A pop-up menu displays.
2. Select **Export All**. The **Export All** window displays.
3. Near the bottom of the window, click the **Files of type** dropdown, then select **FBX export**.
4. On the right-hand side of the window, navigate to the **Options...** section.
5. In the **Geometry** section, enable **Smooth Mesh** and **Referenced Asset Content**.
6. In the **Animation** section, disable **Animation**.
7. If you need to import textures as a `.png`, in the **Embed Media** section, enable **Embed Media**.
8. In the **Advanced Options** section,
   - Navigate to **Units**, then enable **Automatic**.
   - Navigate to **Axis Conversion**, then set the **Up Axis** property to **Y**.
9. Click the **Export All** button.

   <img src="../../assets/accessories/lc-requirements-maya-settings.png" />

10. After exporting, use Studio's [3D Importer](../../art/modeling/3d-importer.md) to import your model and the [Accessory Fitting Tool](../../art/accessories/accessory-fitting-tool.md) to convert the model into an accessory.
