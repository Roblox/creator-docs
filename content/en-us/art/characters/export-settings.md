---
title: Character body export settings
description: Use the appropriate export settings in Maya and Blender to generate Studio-ready .fbx files.
---

<Alert severity = 'warning'>
It's important to test your assets multiple times at every point of the asset creation process, whether it is within your modeling application or after importing into Studio. See [Test characters](../../art/characters/testing/index.md) for more information.
</Alert>

Export your model as a `.fbx` or `.gltf` to take advantage of all of Studio's 3D import features. When rigging or skinning a layerable model, these file types contains all the mesh and texture data, including the rig and influence data, you need to later [import](../../art/modeling/3d-importer.md) into Studio.

Check that your model meets Roblox's [avatar character specifications](../../art/characters/specifications.md) before exporting to ensure Studio compatibility.

- If you are creating a layered clothing accessory, ensure that your model follows [layered clothing specifications](../../art/accessories/clothing-specifications.md) and use the [layered clothing export settings](../../art/accessories/clothing-export-settings.md).
- If you are creating a rigid accessory, ensure that your model follows [rigid accessory specifications](../../art/accessories/specifications.md) and use the [rigid export settings](../../art/accessories/export-settings.md).
- If you are creating a generic mesh, ensure that your model follows Roblox's [general specifications](../../art/modeling/specifications.md) and use the [general export settings](../../art/modeling/export-requirements.md).

<Alert severity = 'error'>
If you are using Roblox's avatar template files, you must perform the [cleanup steps](../../art/characters/creating/combine-head-geometry.md) in order for the assets to properly validate.
</Alert>

## Before exporting

Before exporting, ensure that you are only exporting the Roblox supported objects related to your model. If you have any modifiers to your mesh or project objects, make sure to apply or delete them before export.

Use the following guidance before exporting:

- While your mesh objects must be parented within an armature object, you can also parent your outer cage objects to a single empty object to simplify your workspace.

  <img src="../../assets/art/avatar/Character-Data-Model-Collapsed.png" width = "60%" />

- In the cage parent object, ensure you have an [outer cage](../characters/specifications.md#outer-cages) for each of your 15 body parts with appropriate naming affix.

  <img src="../../assets/art/avatar/Character-Data-Model-Cages.png" width = "60%" />

- In the armature object, ensure that you include the all [15 mesh objects](../characters/specifications.md#body-parts) and [19 attachments](../characters/specifications.md#attachments) with the appropriate naming affix.

  <img src="../../assets/art/avatar/Character-Data-Model-Joints.png" width = "60%" />

<Alert severity = 'info'>
For more information on supported modeling objects and proper configuration, see [Character specifications](../characters/specifications.md).
</Alert>

## Software specific export settings

Whether you are exporting your character for testing, or are performing a final export out of Blender, you must apply the appropriate export settings to ensure that Blender exports the proper character data.

<Tabs>
  <TabItem label="Blender">

Before exporting a mesh from Blender, make sure either your **Scene Properties** > **Unit Scale** to `.01` or your export settings **Transform** > **Scale** is set to `.01` to ensure similar `.fbx` scaling within Studio.

1. In the topbar, click **File** > **Export** > **FBX (.fbx)**. The Blender file browser window displays.
2. Set **Path Mode** to **Copy** and enable the **Embed Textures** icon.
3. In the Include section, enable **Custom Properties**.
4. Expand the Armature section and uncheck **Add Leaf Bones**.
5. Enable **Bake Animation**.
6. Expand Bake Animation and **uncheck NLA Strips**, **All Actions**, and **Force Start/End Keyframes**.
7. In Bake Animation, set **Simplify** to **0.0**.
8. Click the **Export FBX** button. Save the `.fbx` to the directory of your choice.

<img src="../../assets/art/avatar/basic-creation/Export-Settings.png" width = "60%" />

</TabItem>
<TabItem label="Maya">
To export a mesh in Maya as a `.fbx` file:

1. In the topbar, click **File**. A pop-up menu displays.
2. Select **Export All**. The **Export All** window displays.
3. Near the bottom of the window, click the **Files of type** dropdown, then select **FBX export**.
4. On the right-hand side of the window, navigate to the **Options...** section.
5. In the **Geometry** section, enable **Smooth Mesh** and **Referenced Asset Content**.
6. In the **Animation** section, enable **Animation**. Avatar characters with [facial animation data](../../art/characters/facial-animation/index.md) require animation data.
7. If you need to import textures as a `.png`, in the **Embed Media** section, enable **Embed Media**.
8. In the **Advanced Options** section,
   - Navigate to **Units**, then enable **Automatic**.
   - Navigate to **Axis Conversion**, then set the **Up Axis** property to **Y**.
   - If you have issues importing your model, navigate to **FBX File Format**, then set the **Type** property to **Binary**, and the **Version** property to **FBX 2020**.
9. Click the **Export All** button.
   <img src="../../assets/accessories/lc-requirements-maya-settings.png" />
10. After exporting, use Studio's [3D importer](../../art/modeling/3d-importer.md) to import your model. See [Test characters in Studio](../../art/characters/testing/studio.md) for additional importing and testing information.

</TabItem>
</Tabs>

<Alert severity = 'success'>
After importing the `Class.Model` character to Studio, you can now perform the following with this asset:

- [Test your character model](../../art/characters/testing/index.md) in Studio using various tools and workflows.
- [Upload the character](../../art/accessories/creating-rigid/publishing.md) to the Marketplace.
- Use the humanoid character on an existing experience by applying a [HumanoidDescription](../../characters/appearance.md#humanoiddescription)to the `Class.Model` object.
- Save the asset to your [Toolbox](../../projects/assets/toolbox.md) to share or use within any of your experiences.

</Alert>
