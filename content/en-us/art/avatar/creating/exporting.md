---
title: Exporting
comments:
description: Export your character model from Blender using the correct settings and processes.
previous: /art/avatar/creating/cleanup
---

<Alert severity = 'warning'>
It's important to test your assets multiple times at every point of the asset creation process, whether it is within Blender or after importing into Studio. See [Testing Characters](../../../art/avatar/testing/index.md) for more information.
</Alert>

Whether you are exporting your character for testing, or are performing a final export out of Blender, you must apply the appropriate export settings to ensure that Blender exports the proper character data.

## Exporting Textures

Including the default PBR textures, your template character includes four separate image maps that make up its surface appearance. Depending on your workflow, you can choose to embed the image maps to your export file or export the textures separately as image files. Both methods have advantages:

- [Embedding textures](#embedding-textures) simplifies your export by packing all of your textures within the single `.fbx` file.
- [Exporting texture images](#exporting-textures) directly allows you direct access to the image textures, so you can test and swap them more quickly.

### Embedding Textures

Embedding the texture maps to your `.fbx` export can simplify the Blender export and Studio import process. When embedding your textures with Roblox's template files, you need to make a quick adjustment to custom skin tone shader nodes in the Blender file.

<GridContainer numColumns="2">
  <figure><img src="../../../assets/art/avatar/basic-creation/Cleanup
  -Node-A.png" />  <figcaption>Default node configuration: Mix node connected to Base Color</figcaption></figure>
  <figure><img src="../../../assets/art/avatar/basic-creation/Cleanup-Node-B.png" /><figcaption>Exportable node configuration: Color node connected directly to Base Color</figcaption></figure>
</GridContainer>

To prepare your textures to embed with export:

1. In Object mode, select any part of the character.
2. Navigate to the **Shading** tab.
3. Ensure the **Type of Data** dropdown is set to **Object**.
   <img src="../../../assets/art/avatar/basic-creation/Cleanup-Object-Select.png" width = "60%"/>

4. Find the node that connects to the **Principled BSDF's Base Color**.
   <img src="../../../assets/art/avatar/basic-creation/Cleanup-Mix-Node.png" />
5. Click and drag the line from **Base Color** to disconnect the node.
   <img src="../../../assets/art/avatar/basic-creation/Cleanup-Disconnect-Node.png" />
6. Find the **file26** node with the color texture map and click and drag the **Color** to **Principled BSDF's color** node.
   <img src="../../../assets/art/avatar/basic-creation/Cleanup-Node-B.png" />
   <video controls src="../../../assets/art/avatar/basic-creation/Exporting_01.mp4" width="100%"></video>

### Unpacking Image Files

As an alternative to embedding textures, you can export your texture files as separate `.png` image files, which allows you to quickly access and swap image texture maps.

To export your texture image files:

1. Navigate to **File** > **External Data** > **Unpack Resources**.
2. Select **Use files in current directory** to save in the same directory as your project. Blender exports your image files to a textures directory in your project's parent directory.
   <img src="../../../assets/art/avatar/basic-creation/Exporting-Pack-Resources.png" width = "55%"/>

## Exporting Character Model

When exporting a `.fbx` from Blender, it's important to use specific settings to ensure compatibility with Studio import.

To export this your character:

1. In the topbar, click **File** > **Export** > **FBX (.fbx)**. The Blender file browser window displays.
2. Set **Path Mode** to **Copy** and enable the **Embed Textures** icon.
3. In the Include section, enable **Custom Properties**.
4. Expand the Armature section and uncheck **Add Leaf Bones**.
5. Enable **Bake Animation**.
6. Expand Bake Animation and **uncheck NLA Strips**, **All Actions**, and **Force Start/End Keyframes**.
7. In Bake Animation, set **Simplify** to **0.0**.
8. Click the **Export FBX** button. Save the `.fbx` to the directory of your choice.

<img src="../../../assets/art/avatar/basic-creation/Export-Settings.png" width = "60%" />

<Alert severity = 'success'>
After exporting your .fbx file, see [Testing Characters](../../../art/avatar/testing/index.md) In Studio for steps on importing your character model into a test place and verifying your avatar and related components.
</Alert>
