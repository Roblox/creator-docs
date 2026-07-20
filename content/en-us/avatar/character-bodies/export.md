---
title: Export character bodies
description: Use the appropriate export settings in Maya and Blender to generate Studio-ready .fbx files.
---

<Alert severity = 'warning'>
It's important to test your assets multiple times at every point of the asset creation process, whether it is within your modeling application or after importing into Studio. See [Test characters](../../art/characters/testing/index.md) for more information.
</Alert>

When you are ready to export a character body model that meets Roblox's [avatar character specifications](../../avatar/character-bodies/specifications.md), it's important to review the following prerequisite information and step-by-step instructions for the `.fbx` or `.gltf` export files so that your creation takes advantage of all of Studio's [Importer](../../studio/importer.md) features.

This is particularly important for character body models because they contain all the mesh and texture data, including the rig and influence data, that's essential for characters to move and animate properly across the platform.

<Alert severity = 'info'>
<AlertTitle>If creating other types of 3D models:</AlertTitle>
<ul>
<li>For generic meshes, see [general mesh specifications](../../art/modeling/specifications.md) and [general export settings](../../art/modeling/export-requirements.md).</li> <br />
<li>For rigid accessories, see [accessory specifications](../rigid-accessories/specifications.md) and [accessory export settings](../rigid-accessories/export.md).</li> <br />
<li>For layered accessories, see [layered accessory specifications](../layered-accessories/specifications.md) and [layered export settings](../layered-accessories/export.md).</li> <br />
</ul>
</Alert>

<Alert severity = 'error'>
If you are using Roblox's avatar template files, you must perform the [cleanup steps](../../art/characters/creating/combine-head-geometry.md) in order for the assets to properly validate.
</Alert>

## Prerequisites

Before you export your custom character body:

- Ensure that you are only exporting the Roblox-supported objects related to your model. If you have any modifiers to your mesh or project objects, make sure to apply or delete them before export.

- While your mesh objects must be parented within an armature object, you can also parent your outer cage objects to a single empty object to simplify your workspace.

  <img src="../../assets/art/avatar/Character-Data-Model-Collapsed.png" width = "60%" alt="Screenshot of a Blender project Outliner with parent objects collapsed." />

- In the cage parent object, ensure you have an [outer cage](./specifications.md#outer-cages) for each of your 15 body parts with appropriate naming affix.

  <img src="../../assets/art/avatar/Character-Data-Model-Cages.png" width = "60%" alt="Screenshot of the 15 outer cage meshes that you must include with a character export."/>

- In the armature object, ensure that you include the all [15 mesh objects](./specifications.md#body-parts) and [19 attachments](./specifications.md#attachments) with the appropriate naming affix.

  <img src="../../assets/art/avatar/Character-Data-Model-Joints.png" width = "60%" alt="Screenshot of 15 child objects parented within an Armature object."/>

<Alert severity = 'info'>
For more information on supported modeling objects and proper configuration, see [Character specifications](./specifications.md).
</Alert>

- When exporting character bodies with animation or FACS animation, ensure that your animation timeline **Start** and **End** include the entire range of your animations.

<img src="../../assets/art/avatar/basic-creation/Blender-Animation-Start-End.png" width = "60%" alt="Zoom-in of Blender animation track indicating a Start value of 0 and End value of 308." />

## Blender export settings

Blender allows you to export your character body as either a `.fbx` or `.gltf` file. If you are exporting it as a `.fbx` file, familiarize yourself with [Blender's FBX scaling](../../art/blender.md#adjust-scale-fbx) to ensure that you successfully import the model into Studio at the correct scale.

To export a mesh in Blender as a `.fbx` file:

1. In the topbar, click **File** > **Export** > **FBX (.fbx)**. The Blender file browser window displays.
1. Set **Path Mode** to **Copy** and enable the **Embed Textures** icon.
1. In the **Include** section, enable **Custom Properties**.
1. In the **Transform** section, set **Apply Scalings** to **FBX Unit Scale**. If you run into scaling issues on import, see [Blender FBX scaling](../../art/blender.md#adjust-scale-fbx) for alternative approaches.
1. In the **Armature** section, uncheck **Add Leaf Bones**.
1. Enable and expand **Animation**, then:

   1. Uncheck **NLA Strips**, **All Actions**, and **Force Start/End Keyframes**.

      <Alert severity = 'info'>
      Ensure your project animation timeline has the correct **Start** and **End** range of all your keyframes.
      </Alert>
   1. Set **Simplify** to `0.0`.

1. Click the **Export FBX** button and save the `.fbx` to the directory of your choice.

<img src="../../assets/art/avatar/basic-creation/Export-Settings.png" width = "30%" alt="Screenshot of Blender export settings" />

<Alert severity = 'success'>
You now have a `.fbx` file that you can [import into Studio](import.md) as a `Class.Model` character. Once the character body is in Studio, you can:

- [Test your character](../../art/characters/testing/index.md) using various Studio tooling and workflows.
- [Upload the character](../../art/accessories/creating-rigid/publishing.md) to the Marketplace.
- Use the character in an existing game project by applying a [HumanoidDescription](../../characters/appearance.md#manually-modify-appearance) to the `Class.Model` object.
- [Save the character](../../projects/assets/toolbox.md) to your **Toolbox** to use within any of your games or share with other creators.

</Alert>

## Maya export settings

To export a mesh in Maya as a `.fbx` file:

1. In the topbar, click **File** > **Export All**. The **Export All** window displays.
1. Near the bottom of the window, click the **Files of type** dropdown, then select **FBX export**.
1. On the right-hand side of the window, navigate to the **Options...** section.
1. In the **Geometry** section, enable **Smooth Mesh** and **Referenced Asset Content**.
1. In the **Animation** section, enable **Animation**. Avatar characters with [dynamic heads](../../avatar/dynamic-heads/index.md) require animation data.
1. Enable **Bake Animation**.
1. If you need to import textures as a `.png`, in the **Embed Media** section, enable **Embed Media**.
1. In the **Advanced Options** section,
   - Navigate to **Units**, then enable **Automatic**.
   - Navigate to **Axis Conversion**, then set the **Up Axis** property to **Y**.
1. Click the **Export All** button and save the `.fbx` to the directory of your choice.

    <img src="../../assets/accessories/lc-requirements-maya-settings-with-animation.png" width = "50%" alt = "Screenshot of Maya export settings for exports with animation."/>

<Alert severity = 'success'>
You now have a `.fbx` file that you can [import into Studio](import.md) as a `Class.Model` character. Once the character body is in Studio, you can:

- [Test your character](../../art/characters/testing/index.md) using various Studio tooling and workflows.
- [Upload the character](../../art/accessories/creating-rigid/publishing.md) to the Marketplace.
- Use the character in an existing game project by applying a [HumanoidDescription](../../characters/appearance.md#manually-modify-appearance) to the `Class.Model` object.
- [Save the character](../../projects/assets/toolbox.md) to your **Toolbox** to use within any of your games or share with other creators.

</Alert>
