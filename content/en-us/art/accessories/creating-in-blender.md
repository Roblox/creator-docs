---
title: Creating Layered Models In Blender
description: Convert a 3D model into a layered 3D model in Blender before importing and converting the model into Studio as an Accessory.
---

You can use a third party modeling tool, such as [Blender](https://www.blender.org) or [Maya](https://www.autodesk.com/products/maya/overview), to create the layered 3D model that you can [import and convert](../../art/accessories/accessory-fitting-tool.md) into Studio as an `Class.Accessory`. To create a layered model, you must **parent** (Blender) or **bind** (Maya) a 3D model to a mannequin armature and then modify two additional meshes to fit around the inner and outer surface of the accessory model.

This guide covers the basic workflow for converting a 3D model into a layerable model in Blender using the following steps:

1. [**Importing**](#importing) a 3D asset into a template Blender project file.
2. [**Parenting**](#parenting-and-weighting) the imported mesh object to the project file's armature rig with Blender's Automatic Weights feature. You can skip this step if you're using Roblox's [automatic skinning transfer](../../art/accessories/automatic-skinning-transfer.md).
3. [**Editing**](#editing-inner-and-outer-cage-meshes) the Inner and Outer Cage meshes to represent the inner and outer surface of the model.

A full list of asset requirements for a layered model can be found in [Layered Model Specifications](../../art/accessories/specifications.md).

<Alert severity="info">
This guide uses <a href="https://www.blender.org/download/releases/3-0/">Blender version 3.0</a>. If you are
using another version of Blender, there may be minor differences in UI and
settings.
</Alert>

## Importing

Set up the project by opening the [rig template project](../../assets/modeling/meshes/reference-files/Rig_and_Attachments_Template.blend) and importing the [sample accessory model](../../assets/accessories/reference-files/Tshirt-model.fbx).

To import and parent the accessory model:

1. In Blender, open the [rig template project](../../assets/modeling/meshes/reference-files/Rig_and_Attachments_Template.blend). This file contains the default armature required for layered accessories.

   <img
   alt="Blender Mannequin Template Project"
   src="../../assets/accessories/lc-blender-template-opened.png"
   width="80%" />

2. In the Outliner, toggle the Hide icon to visually remove any non-armature objects in your workspace, such as Attachments.

   <video controls width="80%" src="../../assets/accessories/1_lc-blender-unhide-cages.mp4">
   </video>

3. In the File Menu, select **Import** and click **FBX (.fbx)**. Select the accessory model file you intend to fit onto the mannequin. The accessory populates in the workspace and, depending on how the asset was modeled, may need resizing or adjustment to fit on the mannequin.

   <video controls width="80%" src="../../assets/accessories/2_lc-blender-import-tshirt.mp4">
   </video>

## Parenting and Weighting

For this basic accessory, parent the imported mesh to the template mannequin armature using Blender's [Automatic Weights](https://docs.blender.org/manual/en/latest/animation/armatures/skinning/parenting.html#with-automatic-weights) feature. Parenting the accessory model mesh to the armature enables the 3D model to move and deform with the character in Studio. This step is optional if you're using [automatic skinning transfer](../../art/accessories/automatic-skinning-transfer.md).

<Alert severity="warning">
Complex clothing and accessory items with moving parts may require more precise skinning with Blender's <a href="https://docs.blender.org/manual/en/3.5/grease_pencil/modes/weight_paint/introduction.html#weight-paint">Weight Painting</a> or other skinning tools.
</Alert>

To parent the mesh object with the mannequin armature:

1. In the Outliner, temporarily hide both of the Cage objects to expose the Armature by toggling the Hide icon.

2. In the Workspace, click the mesh object, then hold <kbd>Shift</kbd> and **click** the mannequin's armature.

3. Right click, or use <kbd>Ctrl</kbd><kbd>P</kbd> (<kbd>⌘</kbd><kbd>P</kbd>) to parent the accessory to the armature by selecting **Automatic Weights**.

   <video controls width="80%" src="../../assets/accessories/3_lc-blender-parenting-a-mesh.mp4">
   </video>

4. Reduce visual clutter by hiding all objects except the **cages** and **model**. Click on the <img src="../../assets/accessories/lc-blender-hide-symbol.png" /> symbol next to the object in the Outliner panel.

   <video controls width="80%" src="../../assets/accessories/4_lc-blender-outliner-cleanup.mp4">
   </video>

## Editing Inner and Outer Cage Meshes

After parenting and weighting your clothing item, you can start adding the cage meshes to your clothing to indicate the inner and outer surfaces of your clothing.

When setting up the cages, the accessory model needs to fit on top of the inner cage and then the outer cage must be adjusted to fit tightly over the model object.

You can quickly add these two full-body meshes from the [Clothing_Cage_Template.blend](../../assets/modeling/meshes/reference-files/Clothing_Cage_Template.blend) into your existing project.

<Alert severity="error">
Don't delete vertices or alter the UVs on the Inner or Outer Cages as this can cause errors when importing in Studio or when equipping onto a character.
</Alert>

To quickly add clothing cages to your project:

1. Download the [Clothing_Cage_Template.blend](../../assets/modeling/meshes/reference-files/Clothing_Cage_Template.blend) project.
2. In your current Blender project, switch to Object Mode and navigate to **File** > **Append**. A file browser displays.

   <img src="../../assets/accessories/lc-blender-append.png" width = "40%"/>

3. Click on the Clothing_Cage_Template.blend file and navigate to the **Object** folder.

   <img src="../../assets/accessories/lc-blender-append-cages.png"  width = "60%"/>

4. In the Object folder, hold <kbd>Shift</kbd> and select both `YourClothingName_InnerCage` and `YourClothingName_OuterCage` and click **Append**. The two cage mesh objects populate in your project.

   <img src="../../assets/accessories/lc-blender-workspace-cages.png" />

To modify cages for your accessory model:

1. In the Outliner panel, rename the **\_InnerCage** and **\_OuterCage** meshes to match the imported mesh object (ex. Tshirt_InnerCage, Tshirt_OuterCage). Make sure this exactly matches the mesh name that you imported.

   <img src="../../assets/accessories/lc-blender-selecting-cage-in-outlier.png"/>

2. In the Outliner window, select the \_OuterCage mesh and switch to **Edit Mode** <kbd>Tab</kbd>.

3. In the Viewport, enable **X-Ray** view and **Materials View** to improve visibility and access to the vertices of the outer cage mesh.

   <video controls width="80%" src="../../assets/accessories/5_lc-blender-adjusting-viewport-settings.mp4">
   </video>

4. While in Edit Mode, adjust the vertices with the Edit Mode tools so that the Outer Cage completely covers the top of the accessory.

   <Alert severity="info">
   When manipulating vertices, try to keep each face (the space between vertices) consistently sized and retain symmetry wherever possible. Use the symmetry toggles on the top right of the Viewport when applicable.
   </Alert>

   <video controls width="80%" src="../../assets/accessories/6_lc-blender-adjusting-outer-cage-vertices.mp4">
   </video>

A finished outer cage should completely cover the accessory with minimal extra space. For comparison, you can download a completed caged version of the Tshirt model [here](../../assets/accessories/reference-files/Tshirt-caged.fbx).

<video controls width="80%" src="../../assets/accessories/8_lc-blender-finished-outer-cage.mp4"></video>

When finished with the caging and modeling of your asset, see [Exporting Requirements](../../art/modeling/export-requirements.md#blender) for details on exporting the model from Blender.

After exporting, see [Accessory Fitting Tool](../../art/accessories/accessory-fitting-tool.md) for instructions on importing and converting the model into a usable accessory.

## Tips for Editing Cages

The following tips may be helpful when manipulating your cage vertices:

- On the top-right of the Viewport, toggle different [Viewport Shading](https://docs.blender.org/manual/en/latest/editors/3dview/display/shading.html) options, such as **Material Preview** and **X-Ray**, when necessary to better access vertices and view your caging progress.
- You can hide vertices you're currently not adjusting by using **Hide** (<kbd>H</kbd>) and **Unhide** (<kbd>Alt</kbd><kbd>H</kbd>; <kbd>⌥</kbd><kbd>H</kbd>).
- Multiple vertices can be selected and adjusted at the same time. Use **Move**, **Scale**, or any other Blender tools to make adjustments to multiple vertices at once.

  <video controls width="80%" src="../../assets/accessories/7_lc-adjusting-multiple-vertices.mp4">
  </video>
