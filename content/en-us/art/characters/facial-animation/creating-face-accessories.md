---
title: Creating Face Accessories
description: Face accessories are 3D accessories that move and animate with a live head.
---

<Alert severity="warning">
   <b>This guide covers advanced topics.</b> Before you begin, you should have prior knowledge on modeling, UV mapping, rigging, animation, and how to set up a character in [Blender](https://www.blender.org) or [Maya](https://www.autodesk.com/products/maya/overview).
</Alert>

A face accessory is a cosmetic `Class.Accessory` that attaches to the head and can include items such as hair, eyebrows, glasses, and facial hair. To create a face accessory that is compatible with animatable heads, you use a similar design process as [layered accessories](../../../art/accessories#creation-process) to allow your accessory model to deform and stretch on a head when the head is posed or animated.

To create a face accessory, use a third-party modeling tool, such as [Blender](https://www.blender.org) or [Maya](https://www.autodesk.com/products/maya/overview), to create a 3D model with the following requirements:

- The accessory model must meet Studio's [mesh requirements](../../../art/characters/specifications.md).
- The model must be parented (Blender) or bound (Maya) to an R15 character rig.
- The model must include an inner and outer cage.

This guide covers the basic process in Blender for applying rigging and cage data to a basic reference model using the Cubie model referenced in [Creating Basic Heads](../../../art/characters/facial-animation/creating-basic-heads.md).

<Alert severity="info">
   This guide uses <a href="https://www.blender.org/download/releases/3-0/">Blender version 3.0</a>. If you are using another version of Blender, there might be minor differences in UI and settings.
</Alert>

## Reference Files

The following are face accessory reference files, including all example files from this guide:

<Alert severity = 'warning'>
The reference character model provided is meant for educational purposes and does not meet the avatar character [technical specifications](../../../art/characters/specifications.md) for general use.
</Alert>

<table>
<thead>
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><a href="../../../assets/avatar/dynamic-heads/creating-dynamic-heads/reference-files/Cubie-Complete.fbx">Cubie-Complete.fbx</a></td>
    <td>The complete Cubie reference character, from <a href="../../../art/characters/facial-animation/creating-basic-heads.md">Creating Basic Heads</a>. This file is ready for import into Studio.</td>
  </tr>
  <tr>
    <td><a href="../../../assets/avatar/dynamic-heads/creating-face-accessories/reference-files/Cubie-Cage-Only.fbx">Cubie-Cage-Only.fbx</a></td>
    <td>The full body <a href="../../../art/accessories/project-files.md#cage-meshes">cage mesh</a> of the Cubie reference character. This includes the inner and outer cage meshes.</td>
  </tr>
  <tr>
    <td><a href="../../../assets/avatar/dynamic-heads/creating-face-accessories/reference-files/CubieEyebrow_Geo.fbx">Cubie-Eyebrow-Geo.fbx</a></td>
    <td>A standalone eyebrow model, designed for the Cubie model.</td>
  </tr>
  <tr>
    <td><a href="../../../assets/avatar/dynamic-heads/creating-face-accessories/reference-files/Cubie-Eyebrow-Rigged-And-Caged.fbx">Cubie-Eyebrow-Rigged-And-Caged.fbx</a></td>
    <td>The Cubie eyebrow model, correctly rigged and caged following the instructions in this guide. This file is ready for import into Studio.</td>
  </tr>
  <tr>
    <td><a href="../../../assets/avatar/dynamic-heads/creating-face-accessories/reference-files/CubieHawkHair_Geo.fbx">Cubie-Hawk-Hair.fbx</a></td>
    <td>A hair model reference, designed for the Cubie model.</td>
  </tr>
  <tr>
    <td><a href="../../../assets/avatar/dynamic-heads/creating-face-accessories/reference-files/Creating-Face-Accessories-Reference-Files.zip">Creating-Face-Accessories-Reference-Files.zip</a></td>
    <td>A collection of all the provided reference files.</td>
  </tr>
</tbody>
</table>

## Modeling

This guide uses a simple eyebrow reference as a demonstration for creating a face accessory. If rigging and caging a different model, ensure that your model meets the [character specifications](../../../art/characters/specifications.md) for Studio import.

<img src="../../../assets/avatar/dynamic-heads/creating-face-accessories/Importing-Eyebrows.png" width="70%" />

If creating your own model, consider the following guidelines:

- Model your accessory with your character model for best results and fit.
- When possible, try to match up the edges of your model geometry with the edges/vertices of the underlying head topology. This improves the deformation of the accessory with the underlying head model.
- Some accessories, like eyebrows, can extrude or slightly intersect the character model mesh to achieve a certain cosmetic look.
- When working with an accessory with multiple pieces, such as eyebrows, combine the meshes to a single mesh once the modeling and fitting is completed.
- Face accessory meshes do not require a **\_Geo** naming convention.

## Rigging

You must [rig](../../../art/modeling/rigging.md) your accessory to the character's bone structure so the accessory can bend and deform along with your character's facial poses. After rigging, you can skin your model in your modeling tool, or you can transfer skinning data from your character to the accessory at runtime by using [Automatic Skinning Transfer](../../../art/accessories/automatic-skinning-transfer.md).

### Project Setup

As an example in this guide, we are using the completed [basic Head model](../../../assets/avatar/dynamic-heads/creating-dynamic-heads/reference-files/Cubie-Complete.fbx) from [Creating a Basic Head](../../../art/characters/facial-animation/creating-basic-heads.md) and a [simple eyebrow model](../../../assets/avatar/dynamic-heads/creating-face-accessories/reference-files/CubieEyebrow_Geo.fbx) in a new Blender project.

To set up your Blender project:

1. Open a new **General** project in Blender.
2. Select the default shape, camera, and lights, then press <kbd>Delete</kbd>.
3. In the left-hand navigation of the **Properties Editor**, navigate to **Scene Properties**.

   <img src="../../../assets/modeling/skinned-meshes/Blender-Scene-Units-Icon.png" width="40%" />

4. In the Units section, change the **Unit Scale** to `0.01` and the **Length** to **Centimeters**.

   <img src="../../../assets/modeling/skinned-meshes/Blender-Scene-Units-Settings.png" width="40%" />

5. Import the character rig you intend to parent the accessory to, in this example: [Cubie-Complete.fbx](../../../assets/avatar/dynamic-heads/creating-dynamic-heads/reference-files/Cubie-Complete.fbx).

   <img src="../../../assets/avatar/dynamic-heads/creating-face-accessories/Importing-Cubie.png" width="80%" />

6. To simplify the workspace, you can delete the R15 inner and outer cage mesh objects since you will later import a full-body cage in the [Caging](#caging) step.

   <video controls width="80%" src="../../../assets/avatar/dynamic-heads/creating-face-accessories/videos/Removing-Character-Cage.mp4">
   </video>

7. Import your accessory model, in this example: [CubieEyebrow_Geo.fbx](../../../assets/avatar/dynamic-heads/creating-face-accessories/reference-files/CubieEyebrow_Geo.fbx).

   1. If required, reposition the accessory model on the face.
   2. You can hide the armature temporarily to verify model placement.

   <img src="../../../assets/avatar/dynamic-heads/creating-face-accessories/Importing-Eyebrows.png" width="70%" />

### Parenting Armature

Connect the mesh object to the character's armature by parenting the armature to the mesh object. To parent the armature:

1. In Object Mode, hold <kbd>Shift</kbd> and **click** the accessory model and then any of the character bones.
2. Right click and select **Parent**, then select **With Automatic Weights**.
   <video controls width="80%" src="../../../assets/avatar/dynamic-heads/creating-face-accessories/videos/Parent-Armature.mp4">
   </video>

<Alert severity="warning">
Parenting with Automatic Weights automatically applies some influences to your model which can save some time during the [optional skinning](#optional-skinning) step. You can alternatively **Parent** with **Empty Weights** to not apply any skinning influence to your accessory mesh. See Blender's documentation on [Automatic Weights](https://docs.blender.org/manual/en/latest/animation/armatures/skinning/parenting.html#with-automatic-weights) for more information.
</Alert>

### Optional Skinning

In many cases, you can skip the [skinning](../../../art/modeling/rigging.md) process for your accessory and use Roblox's [automatic skinning transfer](../../../art/accessories/automatic-skinning-transfer.md) instead. You can still apply manual skinning through a modeling software and opt to use automatic skinning transfer later.

If you do not intend to apply skinning manually, continue directly to [Caging](#caging).

<Alert severity="info">
If you are skinning your accessory in your modeling software on a character model with a fully posed head, you can test the accessory on various FACS poses saved to the timeline within your modeling software before importing into Studio.
</Alert>

## Caging

The caging process for face accessories is similar to caging layered clothing accessories and shares the same modeling and caging requirements. After rigging, import a full-body inner and outer cage to your project, rename the cages, then stretch the vertices of the Outer Cage to cover the accessory model with minimal space.

To cage the eyebrow accessory:

1. With Blender's .fbx importer, import [`Cubie-Cage-Only.fbx`](../../../assets/avatar/dynamic-heads/creating-face-accessories/reference-files/Cubie-Cage-Only.fbx). This includes a single full-body inner and outer cage mesh for the Cubie model.
   <img src="../../../assets/avatar/dynamic-heads/creating-face-accessories/Importing-Cage.png" width="80%" />
2. Rename cages to begin with "CubieEyebrow" before the **\_InnerCage** and **\_OuterCage** affix.
3. In Edit mode, extend the outer cage to fit over the accessory with minimal space. Use various material and viewing options to easily manipulate the correct vertices on the outer cage.

   <video controls width="80%" src="../../../assets/avatar/dynamic-heads/creating-face-accessories/videos/Editing-Outer-Cage.mp4">
   </video>

If you are using automatic skinning transfer, you can ensure that automatic skinning transfer only applies to specific parts of the accessory by removing unnecessary sections of the cage. For more information, see [Modifying Character Cages](../../../art/accessories/automatic-skinning-transfer.md#modifying-character-cages).

## Exporting

Export your model when ready to test your accessory model in Studio or when setting up for final export. When exporting face accessories, keep in mind the following guidelines:

- Ensure that the final accessory model follows [Studio's Modeling Requirements](../../../art/characters/specifications.md), including properly named mesh and cage objects.
- Do not export any unnecessary data, such as animation data, or light and camera objects.
- If exporting PBR textures, follow [texture modeling requirements](../../../art/characters/specifications.md#surfaceappearance) when exporting texture images from your texture software.

To export:

1. Ensure only the **accessory mesh**, **armature object** and **cages meshes** are exported. Delete all other objects in the workspace.

   1. You can quickly filter out **Geo** and **Att** named objects in your workspace to quickly delete them.

      <video controls width="70%" src="../../../assets/avatar/dynamic-heads/creating-face-accessories/videos/Removing-Extra-Objects.mp4">
      </video>

2. Follow Studio's [Export Requirements for Blender](../../../art/accessories/export-settings.md) and save the file to your preferred location. The final export of the eyebrow `.fbx` is available for reference.

## Testing in Studio

To use your exported model into Studio as an `Class.Accessory`, use the [Accessory Fitting Tool](../../../art/accessories/accessory-fitting-tool.md) to test and generate the accessory object. At this point, you can equip the accessory to a humanoid character. If you intend to transfer skinning data from your character to the accessory model at runtime, you can enable [automatic skinning transfer](../../../art/accessories/automatic-skinning-transfer.md) for your accessory.

<Alert severity="info">
If following the references provided by this guide, only **EnabledOverride** applies the skinning transfer in Studio, since some skinning data will have been applied to the model during the [parenting](#parenting-armature) process.
</Alert>
