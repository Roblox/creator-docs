---
title: Modeling setup
description: Setup your Blender environment with the correct files and templates to model efficiently.
next: /art/accessories/creating/trimming
prev: /art/accessories/creating/
---

Modeling, sometimes known as **sculpting**, is the process of creating and shaping the 3D geometry of an object. In this tutorial, you will use one of Roblox's template files to create the initial shape of a t-shirt, then add unique and clothing-specific modifications to its geometry for your own design. You can further apply the techniques and processes in this tutorial to create any other type of clothing, such as pants, skirts, and shoes.

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

The next four modeling sections cover the following processes:

1. Setting up your project and creating your base mesh.
1. Clearing the duplicated mesh of extra attributes.
1. Trimming the shape to match the desired clothing type.
1. Adding and smoothing the vertices of your clothing shape.
1. Scaling and positioning the clothes onto the mannequin.
1. Sculpting fabric and other details onto the mesh object.
1. Closing the holes in your mesh, making it watertight.

## Set up mesh

To get your project started, download and open Roblox's `Clothing_Cage.blend` project and begin setting up your basic project objects.

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

1. Download and open the [Clothing_Cage.blend](../../../assets/modeling/meshes/reference-files/Clothing_Cage_Templates.zip) project that includes the inner and outer cage mesh that you will use as temporary mannequins.
1. Navigate to **File** > **Save As**, then save the project with a new name. This will be your main Blender project for your layered accessory.
1. In the Outliner, copy and paste **InnerCage** object to duplicate it.
1. With the duplicated object active, right-click in the viewport, then select **Parent** > **Clear and Keep Transformation** from the contextual menu.
1. Back in the Outliner,
   1. Right-click and delete the extra **Clothing Cages.001** object.
   1. Rename the duplicated object as **LongSleeve**.
   1. Rename the original cages as **LongSleeve_OuterCage** and **LongSleeve_InnerCage**, respectively, then hide them for now.

   <video controls src="../../../assets/art/accessories/creating/Modeling_00.mp4" width="100%"></video>

## Clear extra attributes

The cage mesh objects in the template include some helper vertex color properties that need to be removed from your clothing mesh. If left in, the vertex colors may clash with the texture of the object after importing in Studio.

To remove extra attribute data:

1. With **LongSleeve** active, navigate to the Properties Editor > **Object Data Properties** tab > **Color Attributes**.

   <img src="../../../assets/art/accessories/creating/Modeling-Clear-Vertex-Colors.png" />

2. With **colorSet1** selected, remove it by pressing the **–** button.

   <video controls src="../../../assets/art/accessories/creating/Modeling_01.mp4" width="100%"></video>
