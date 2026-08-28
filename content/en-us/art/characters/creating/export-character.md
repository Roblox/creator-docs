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

1. In the topbar, navigate to **File** > **Export** > **FBX (.fbx)**. The Blender file browser window displays.
1. Set **Path Mode** to **Copy** and enable the **Embed Textures** icon.
1. In the **Include** section, enable **Custom Properties**.
1. Expand the **Armature** section and disable **Add Leaf Bones**.
1. Enable **Bake Animation**, expand the section, then:

   1. Disable **NLA Strips**, **All Actions**, and **Force Start/End Keyframes**.
   1. Set **Simplify** to **0.0**.

1. Click the **Export FBX** button and save the `.fbx` to the directory of your choice.

<img src="../../../assets/art/avatar/basic-creation/Export-Settings.png" width = "60%" />

<Alert severity = 'warning'>
After exporting your .fbx file, see [Test characters](../../../art/characters/testing/index.md) for steps on importing your character model into a test place and verifying your avatar and related components.
</Alert>

<Alert severity = 'success'>
After importing the `Class.Model` character to Studio, you can now perform the following with this asset:

- [Upload the character](../../../marketplace/publish-to-marketplace.md) to the Marketplace.
- Use the humanoid character on an existing game by applying a [HumanoidDescription](../../../characters/appearance.md#manually-modify-appearance)to the `Class.Model` object.
- Save the asset to your [Toolbox](../../../projects/assets/toolbox.md) to share or use within any of your games.

</Alert>
