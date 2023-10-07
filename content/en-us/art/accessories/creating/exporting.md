---
title: Exporting
description: Covers the process of exporting a custom clothing asset from Blender.
prev: /art/accessories/creating/caging
---

With your clothing model completed, you can export the file as a `.fbx` and import it into Studio.

This section covers the following processes:

1. Exporting the model from Blender.
2. Importing the file into Studio.
3. Converting the model into an accessory object.

## Exporting From Blender

It's important to follow the Blender export settings to ensure a Studio-compatible `.fbx` file. To export your file from Blender:

1. In the topbar, click **File**. A pop-up menu displays.
2. Select **Export**, then **FBX (.fbx)**. The **Blender File View** window displays.
3. On the right-hand side, change the **Path Mode** property to **Copy**, then toggle the **Embed Textures** button.

   <img src="../../../assets/modeling/skinned-meshes/Blender-Export-Settings-1.png" width="320" />

4. If your project doesn't have .01 scene unit scaling, set the **Transform** > **Scale** to `.01`.

   <img src="../../../assets/modeling/skinned-meshes/Blender-Export-Settings-2.png" width="320" />

5. Under the **Armature** section, disable **Add Leaf Bones**.

   <img src="../../../assets/modeling/skinned-meshes/Blender-Export-Settings-3.png" width="320" />

6. Disable **Bake Animation**.

   <img src="../../../assets/modeling/skinned-meshes/Blender-Export-Settings-4.png" width="320" /> <br />

7. Click the **Export FBX** button.

## Importing into Studio

With the `.fbx` saved locally, you can now import the file into Studio:

1. Open Studio and navigate to the **Avatar** tab.
2. Click the **Import 3D** button. A file browser displays.
3. Select your exported `.fbx` and verify any possible warnings or errors.
   1. Warnings or errors related to the clothing mesh may require returning to Blender to resolve.
4. Select **Import** to add the model to your workspace.
   <img src="../../../assets/art/accessories/creating/Exporting-Clothing-In-Studio.png" />

## Creating an Accessory

You can use the Accessory Fitting Tool to quickly convert your `Class.Model` to a `Class.Accessory` with the correct attachments and accessory-related data.

To generate the accessory object:

1. In the Avatar tab, select the **Accessory Fitting Tool**. The Accessory Fitting Tool panel displays on the left side of the workspace.
2. Select the `Class.Model` of the clothing item in the viewport. The tool's text field populates with the name of the object selected. Alternatively, you can select the object within the Explorer window.
3. Test out various sample characters, clothing, and animations. See [Testing Accessories](../../../art/accessories/accessory-fitting-tool.md#testing-accessories) for additional information.
   - If required, make minor cage adjustments using the editing features. Larger cage changes may require returning to your third-party modeling software and re-exporting the asset.
4. When ready to generate your accessory, click **Generate MeshPart Accessory**. The Accessory object with your model populates in your workspace.
   For additional information and documentation on the tool, see [Accessory Fitting Tool](../../../art/accessories/accessory-fitting-tool.md).

<GridContainer numColumns="2">
  <figure>
    <img src="../../../assets/art/accessories/creating/Exporting-Clothing-in-Studio-Highlight.png" />
    <figcaption>Clothing accessory in Workspace</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/art/accessories/creating/Exporting-Accessory-Explorer.png" />
    <figcaption>Clothing accessory in Explorer</figcaption>
  </figure>
</GridContainer>

<Alert severity = 'success'>
Congratulations, you've completed your clothing tutorial. With this accessory, you can:

- Equip the accessory on an avatar-ready character by drag and dropping the accessory on an existing model, or using [HumanoidDescription](../../../characters/appearance.md#humanoiddescription).
- Save the accessory as an [avatar asset](../../../projects/assets/index.md#for-avatars) for use in an experience later.
- If you meet certain account requirements, you can [upload your asset](../../../art/marketplace/publishing-to-marketplace.md) for moderation and start selling it on the Marketplace.

</Alert>
