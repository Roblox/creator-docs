---
title: Modeling setup
description: Setup your Blender environment with the correct files and templates to model efficiently.
next: /art/accessories/creating/trimming
prev: /art/accessories/creating/
---

Modeling, sometimes known as **sculpting**, is the process of shaping 3D geometry. In this tutorial, use one of Roblox's template files to create the initial shape of the clothing and add unique and clothing-specific modifications to its geometry. You can further apply the techniques and processes in this tutorial to create any other type of clothing, such as pants, skirts, shoes, and more.

<GridContainer numColumns="2">
  <figure>
    <img src="../../../assets/art/accessories/creating/Modeling-Mannequin-Start.png" />
    <figcaption>Base Mannequin using Roblox provided cage meshes</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/art/accessories/creating/Modeling-Complete-2.png" />
    <figcaption>Sculpted clothing mesh for a long sleeve shirt</figcaption>
  </figure>
</GridContainer>

This modeling tutorial covers the following processes:

1. Setting up your project and creating your base mesh.
2. Clearing the duplicated mesh of extra attributes.
3. Trimming the shape to match the desired clothing type.
4. Adding and smoothing the vertices of your clothing shape.
5. Scaling and positioning the clothes onto the mannequin.
6. Sculpting fabric and other details onto the mesh object.
7. Closing the holes in your mesh, making it watertight.

## Set up mesh

To get your project started, download and open Roblox's [Clothing_Cage.blend](../../../assets/modeling/meshes/reference-files/Clothing_Cage_Templates.zip) project and begin setting up your basic project objects.

<GridContainer numColumns="2">
  <figure>
    <img src="../../../assets/art/accessories/creating/Modeling-Cages-Selected.png" />
    <figcaption>3D viewport - duplicated cage mesh object</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/art/accessories/creating/Modeling-Cage-Copied.png" width = "80%"/>
    <figcaption>Outliner - duplicated object named "LongSleeve"</figcaption>
  </figure>
</GridContainer>

To set up your project and your initial mesh object:

1. Download the [Clothing_Cage.blend](../../../assets/modeling/meshes/reference-files/Clothing_Cage_Templates.zip) project. This project includes the inner and outer cage mesh that you will use as temporary mannequins.
2. Open this file, click **Save As**, and save the project with a new name. This will be your main Blender project for the clothing accessory.
3. In the Outliner, copy and paste **InnerCage** object to duplicate it.
4. With the duplicated object highlighted, right-click in the viewport and select **Parent** > **Parent and Keep Transformation**.
5. In the Outliner, right-click and delete the extra **Cage.001 data object**.
6. Rename the duplicated object as "LongSleeve".
7. Rename the original cages as "LongSleeve_OuterCage" and "LongSleeve_InnerCage", respectively.
8. **Hide** the original \_OuterCage and \_InnerCage objects. You use these later in the Caging step.

   <video controls src="../../../assets/art/accessories/creating/Modeling_00.mp4" width="100%"></video>

## Clear extra attributes

The cage mesh objects in the template include some helper vertex color properties that need to be removed from your clothing mesh. If left in, the vertex colors may clash with the texture of the object after importing in Studio.

To remove extra attribute data:

1. With the LongSleeve object selected, navigate to the **Properties** panel > **Object Data Properties** > **Color Attributes**.

   <img src="../../../assets/art/accessories/creating/Modeling-Clear-Vertex-Colors.png" />

2. With **colorSet1** selected, remove it by pressing the **–** button.

   <video controls src="../../../assets/art/accessories/creating/Modeling_01.mp4" width="100%"></video>
