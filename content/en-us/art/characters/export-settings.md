---
title: Character body export settings
description: Use the appropriate export settings in Maya and Blender to generate Studio-ready .fbx files.
---

<Alert severity = 'warning'>
It's important to test your assets multiple times at every point of the asset creation process, whether it is within your modeling application or after importing into Studio. See [Test characters](../../art/characters/testing/index.md) for more information.
</Alert>

Export your model as a `.fbx` or `.gltf` to take advantage of all of Studio's 3D import features. When rigging or skinning a layerable model, these file types contains all the mesh and texture data, including the rig and influence data, you need to later [import](../../art/modeling/3d-importer.md) into Studio.

Check that your model meets Roblox's [avatar character specifications](../../art/characters/specifications.md) before exporting to ensure Studio compatibility.

<Alert severity = 'warning'>
<AlertTitle>If creating other types of 3D models:</AlertTitle>
<ul>
<li>For generic meshes, see [general mesh specifications](../modeling/specifications.md) and [general export settings](../modeling/export-requirements.md).</li> <br />
<li>For rigid accessories, see [accessory specifications](../accessories/specifications.md) and [accessory export settings](../accessories/export-settings.md).</li> <br />
<li>For layered accessories, see [layered accessory specifications](../accessories/clothing-specifications.md) and [layered export settings](../accessories/clothing-export-settings.md).</li> <br />
</ul>
</Alert>

<Alert severity = 'error'>
If you are using Roblox's avatar template files, you must perform the [cleanup steps](../../art/characters/creating/combine-head-geometry.md) in order for the assets to properly validate.
</Alert>

## Before exporting

Before exporting, ensure that you are only exporting the Roblox supported objects related to your model. If you have any modifiers to your mesh or project objects, make sure to apply or delete them before export.

Use the following guidance before exporting:

- While your mesh objects must be parented within an armature object, you can also parent your outer cage objects to a single empty object to simplify your workspace.

  <img src="../../assets/art/avatar/Character-Data-Model-Collapsed.png" width = "60%" alt="Screenshot of a Blender project Outliner with parent objects collapsed." />

- In the cage parent object, ensure you have an [outer cage](../characters/specifications.md#outer-cages) for each of your 15 body parts with appropriate naming affix.

  <img src="../../assets/art/avatar/Character-Data-Model-Cages.png" width = "60%" alt="Screenshot of the 15 outer cage meshes that you must include with a character export."/>

- In the armature object, ensure that you include the all [15 mesh objects](../characters/specifications.md#body-parts) and [19 attachments](../characters/specifications.md#attachments) with the appropriate naming affix.

  <img src="../../assets/art/avatar/Character-Data-Model-Joints.png" width = "60%" alt="Screenshot of 15 child objects parented within an Armature object."/>

<Alert severity = 'info'>
For more information on supported modeling objects and proper configuration, see [Character specifications](../characters/specifications.md).
</Alert>

- When exporting characters with animation or FACS animation, ensure that your animation timeline **Start** and **End** include the entire range of your animations.

<img src="../../assets/art/avatar/basic-creation/Blender-Animation-Start-End.png" width = "60%" alt="Zoom-in of Blender animation track indicating a Start value of 0 and End value of 308." />

## Blender

Blender allows you to export in `.fbx` or `.gltf` as well as other formats. If you are using `.fbx` export, familiarize yourself with [Blender's FBX scaling](../blender.md#adjust-scale-fbx) to ensure that you successfully import the model into Studio at the correct scale.

### Export settings

1. In the topbar, click **File** > **Export** > **FBX (.fbx)**. The Blender file browser window displays.
2. Set **Path Mode** to **Copy** and enable the **Embed Textures** icon.
3. In the Include section, enable **Custom Properties**.
4. If your project doesn't already have `.01` scene unit scaling, set the **Transform** > **Apply Scalings** to `FBX Unit Scale`. For more details, see [Blender FBX scaling](../blender.md#adjust-scale-fbx).
5. Expand the Armature section and uncheck **Add Leaf Bones**.
6. Enable **Bake Animation**.
7. Expand Bake Animation and **uncheck NLA Strips**, **All Actions**, and **Force Start/End Keyframes**.
   1. Ensure your project animation timeline has the correct **Start** and **End** range of all your keyframes.
8. In Bake Animation, set **Simplify** to **0.0**.
9. Click the **Export FBX** button. Save the `.fbx` to the directory of your choice.

<img src="../../assets/art/avatar/basic-creation/Export-Settings.png" width = "50%" alt="Screenshot of Blender export settings" />

## Maya export settings

To export a mesh in Maya as a `.fbx` file:

1. In the topbar, click **File**. A pop-up menu displays.
2. Select **Export All**. The **Export All** window displays.
3. Near the bottom of the window, click the **Files of type** dropdown, then select **FBX export**.
4. On the right-hand side of the window, navigate to the **Options...** section.
5. In the **Geometry** section, enable **Smooth Mesh** and **Referenced Asset Content**.
6. In the **Animation** section, enable **Animation**. Avatar characters with [facial animation data](../../art/characters/facial-animation/index.md) require animation data.
7. Enable **Bake Animation**.
8. If you need to import textures as a `.png`, in the **Embed Media** section, enable **Embed Media**.
9. In the **Advanced Options** section,
   - Navigate to **Units**, then enable **Automatic**.
   - Navigate to **Axis Conversion**, then set the **Up Axis** property to **Y**.
10. Click the **Export All** button.

    <img src="../../assets/accessories/lc-requirements-maya-settings-with-animation.png" alt = "Screenshot of Maya export settings for exports with animation."/>

11. After exporting, use Studio's [3D importer](../../art/modeling/3d-importer.md) to import your model. See [Test characters in Studio](../../art/characters/testing/studio.md) for additional importing and testing information.

<Alert severity = 'success'>
After importing the `Class.Model` character to Studio, you can now perform the following with this asset:

- [Test your character model](../../art/characters/testing/index.md) in Studio using various tools and workflows.
- [Upload the character](../../art/accessories/creating-rigid/publishing.md) to the Marketplace.
- Use the humanoid character on an existing experience by applying a [HumanoidDescription](../../characters/appearance.md#manually-modify-appearance)to the `Class.Model` object.
- Save the asset to your [Toolbox](../../projects/assets/toolbox.md) to share or use within any of your experiences.

</Alert>
