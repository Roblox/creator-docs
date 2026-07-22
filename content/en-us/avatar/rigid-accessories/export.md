---
title: Export rigid accessories
description: Use the appropriate export settings in Maya and Blender to generate Studio-ready .fbx files.
---

When you are ready to export a rigid accessory model that meets Roblox's [rigid accessory specifications](./specifications.md), it's important to review the following prerequisite information and step-by-step instructions for the `.fbx` or `.gltf` export files so that your creation takes advantage of all of Studio's [Importer](../../studio/importer.md) features.

This is particularly important for rigid accessory models because they contain all the mesh, texture, and attachment data that's essential for rigid accessories to attach to character bodies correctly.

<Alert severity = 'warning'>
If you have any modifiers to your mesh or project objects, make sure to apply
or delete them before export.
</Alert>

<Alert severity = 'info'>
<AlertTitle>For other types of 3D models:</AlertTitle>
<ul>
<li>[General mesh](../../art/modeling/export-requirements.md) export settings.</li>
<li>[Layered accessory](../layered-accessories/export.md) export settings.</li>
</ul>
</Alert>

## Blender export settings

Blender allows you to export your rigid accessory as either a `.fbx` or `.gltf` file. If you are exporting it as a `.fbx` file, familiarize yourself with [Blender's FBX scaling](../../art/blender.md#adjust-scale-fbx) to ensure that you successfully import the model into Studio at the correct scale.

To export the `.fbx` file in Blender:

1. In the topbar, click **File** > **Export** > **FBX (.fbx)**. The **Blender File View** window displays.
1. On the right-hand side, set **Path Mode** to **Copy**, then toggle the **Embed Textures** button.
1. In the **Transform** section, set **Apply Scalings** to **FBX Unit Scale**. If you run into scaling issues on import, see [Blender FBX scaling](../../art/blender.md#adjust-scale-fbx) for alternative approaches.
1. Click the **Export FBX** button and save the `.fbx` to the directory of your choice.

   <img src="../../assets/accessories/rigid-accessory-blender.png" width = "30%" alt="Screenshot of Blender export settings" />

<Alert severity = 'success'>
You now have a `.fbx` file that you can [import into Studio](import.md) as a `Class.Model` rigid accessory. Once the rigid accessory is in Studio, you can use the [Accessory Fitting Tool](../../avatar/accessory-fitting-tool.md) to convert the model into an accessory.
</Alert>

## Maya export settings

To export a mesh in Maya as a `.fbx` file:

1. In the topbar, click **File** > **Export All**. The **Export All** window displays.
1. Near the bottom of the window, click the **Files of type** dropdown, then select **FBX export**.
1. On the right-hand side of the window, navigate to the **Options...** section.
1. In the **Geometry** section, enable **Smooth Mesh** and **Referenced Asset Content**.
1. In the **Animation** section, disable **Animation**.
1. If you need to import textures as a `.png`, in the **Embed Media** section, enable **Embed Media**.
1. In the **Advanced Options** section,
   - Navigate to **Units**, then enable **Automatic**.
   - Navigate to **Axis Conversion**, then set the **Up Axis** property to **Y**.
1. Click the **Export All** button and save the `.fbx` to the directory of your choice.

   <img src="../../assets/accessories/lc-requirements-maya-settings.png" width = "50%" alt = "Screenshot of Maya export settings"/>

<Alert severity = 'success'>
You now have a `.fbx` file that you can [import into Studio](import.md) as a `Class.Model` rigid accessory. Once the rigid accessory is in Studio, you can use the [Accessory Fitting Tool](../../avatar/accessory-fitting-tool.md) to convert the model into an accessory.
</Alert>
