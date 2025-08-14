---
title: Export character model
description: Export your character model from Blender using the correct settings and processes.
prev: /art/characters/creating/export-textures
---

<Alert severity = 'warning'>
It's important to test your assets multiple times at every point of the asset creation process, whether it is within Blender or after importing into Studio. See [Test characters](../../../art/characters/testing/index.md) for more information.
</Alert>

Whether you are exporting your character for testing, or are performing a final export out of Blender, you must apply the appropriate export settings to ensure that Blender exports the proper character data.

To export your character:

1. In the topbar, click **File** > **Export** > **FBX (.fbx)**. The Blender file browser window displays.
2. Set **Path Mode** to **Copy** and enable the **Embed Textures** icon.
3. In the Include section, enable **Custom Properties**.
4. Expand the Armature section and uncheck **Add Leaf Bones**.
5. Enable **Bake Animation**.
6. Expand Bake Animation and **uncheck NLA Strips**, **All Actions**, and **Force Start/End Keyframes**.
7. In Bake Animation, set **Simplify** to **0.0**.
8. Click the **Export FBX** button. Save the `.fbx` to the directory of your choice.

<img src="../../../assets/art/avatar/basic-creation/Export-Settings.png" width = "60%" />

<Alert severity = 'warning'>
After exporting your .fbx file, see [Test characters](../../../art/characters/testing/index.md) for steps on importing your character model into a test place and verifying your avatar and related components.
</Alert>

<Alert severity = 'success'>
After importing the `Class.Model` character to Studio, you can now perform the following with this asset:

- [Upload the character](../../../art/accessories/creating-rigid/publishing.md) to the Marketplace.
- Use the humanoid character on an existing experience by applying a [HumanoidDescription](../../../characters/appearance.md#manually-modify-appearance)to the `Class.Model` object.
- Save the asset to your [Toolbox](../../../projects/assets/toolbox.md) to share or use within any of your experiences.

</Alert>
