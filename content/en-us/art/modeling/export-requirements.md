---
title: Export settings
description: Use the appropriate export settings in Maya and Blender to generate Studio-ready .fbx files.
---

Export your mesh or model as a `.fbx` to take advantage of all of Studio's 3D import features. When rigging or skinning a model, a `.fbx` export contains both the rig and influence data you need to later [import](../../parts/meshes.md#import-meshes) into Studio.

Check that your model meets Roblox's [modeling specifications](../../art/modeling/specifications.md) before exporting to ensure Studio compatibility. Specific types of assets, like characters and accessories, have additional specifications:

<Alert severity = 'warning'>
<AlertTitle>If creating other types of 3D models:</AlertTitle>
<ul>
<li>For rigid accessories, see [accessory specifications](../../art/accessories/specifications.md) and [accessory export settings](../accessories/export-settings.md).</li> <br />
<li>For layered accessories, see [layered accessory specifications](../accessories/clothing-specifications.md) and [layered export settings](../accessories/clothing-export-settings.md).</li> <br />
<li>For avatar characters, see [avatar specifications](../../art/characters/specifications.md) and [avatar export settings](../characters/export-settings.md).</li>
</ul>
</Alert>

## Blender

Before exporting a mesh from Blender, make sure to set the Scene Unit Length to **Centimeters** and, if applicable, set the Unit Scale to **.01** to ensure similar `.fbx` scaling within Studio.

To export the `.fbx` file in Blender:

1. In the topbar, click **File**. A pop-up menu displays.
2. Select **Export**, then **FBX (.fbx)**. The **Blender File View** window displays.
3. On the right-hand side, change the **Path Mode** property to **Copy**, then toggle the **Embed Textures** button.

   <img src="../../assets/modeling/skinned-meshes/Blender-Export-Settings-1.png" width="320" alt="Blender export sidebar showing Path Mode set to Copy and the Embed Textures button enabled."/>

4. If your project doesn't already have .01 scene unit scaling, set the **Transform** > **Scale** to `.01`.

   <img src="../../assets/modeling/skinned-meshes/Blender-Export-Settings-2.png" width="320" />

5. Under the **Armature** section, disable **Add Leaf Bones**.

   <img src="../../assets/modeling/skinned-meshes/Blender-Export-Settings-3.png" width="320" alt="Blender export sidebar showing Transform Scale set to .01"/>

6. Unless exporting content with animation keyframes, such as a walk cycle or a character with [facial animation data](../../art/characters/facial-animation/index.md), disable **Bake Animation**.

   <img src="../../assets/modeling/skinned-meshes/Blender-Export-Settings-4.png" width="320" alt="Blender export sidebar showing Add Leaf Bones as unchecked"/> <br />

7. Click the **Export FBX** button.

## Maya

To export a mesh in Maya as a `.fbx` file:

1. In the topbar, click **File**. A pop-up menu displays.
2. Select **Export All**. The **Export All** window displays.
3. Near the bottom of the window, click the **Files of type** dropdown, then select **FBX export**.
4. On the right-hand side of the window, navigate to the **Options...** section.
5. In the **Geometry** section, enable **Smooth Mesh** and **Referenced Asset Content**.
6. In the **Animation** section, disable **Animation**, unless you need to import an animation to Studio. Some avatar assets require animation.
   1. If you are exporting animation, enable **Bake Animation**.
7. If you need to import textures as a `.png`, in the **Embed Media** section, enable **Embed Media**.
8. In the **Advanced Options** section,
   - Navigate to **Units**, then enable **Automatic**.
   - Navigate to **Axis Conversion**, then set the **Up Axis** property to **Y**.
9. Click the **Export All** button.

   <img src="../../assets/accessories/lc-requirements-maya-settings.png" alt="Maya export sidebar showing Bake Animation as unchecked"  />
