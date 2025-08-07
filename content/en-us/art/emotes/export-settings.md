---
title: Animation export settings
description: Use the appropriate export settings in Maya and Blender to generate Studio-ready .fbx files.
---

You can export animation data from a third-party software, such as Blender or Maya to use in Studio. Both `.fbx` and `.gLTF` formats support animation data.

Typically, creators will use a third-party modeling tool to animate a character model. Once the animation is complete, you export both the model and the animation data into Roblox Studio.

After exporting, you can [import and configure](./import.md) the animation data into Studio.

## Before exporting

When exporting characters with animation or FACS animation, ensure that your animation timeline **Start** and **End** include the entire range of your animations.

<img src="../../assets/art/avatar/basic-creation/Blender-Animation-Start-End.png" width = "60%" alt="Zoom-in of Blender animation track indicating a Start value of 0 and End value of 308." />

## Blender

Blender allows you to export in `.fbx` or `.gltf` as well as other formats. If you are using `.fbx` export, familiarize yourself with [Blender's FBX scaling](../blender.md#adjust-scale-fbx) to ensure that you successfully import the model into Studio at the correct scale.

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

## Maya

For additional context on exporting animations from Maya, see the [Exporting Characters from Maya](../../art/characters/export-avatar-animations-from-maya.md) tutorial.

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
