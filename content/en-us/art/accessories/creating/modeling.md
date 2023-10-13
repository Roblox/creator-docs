---
title: Modeling
description: Covers the process of modeling a custom clothing asset in Blender.
next: /art/accessories/creating/texturing
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

## Setting Up Mesh

To get your project started, download and open Roblox's [Clothing_Cage.blend](../../../assets/modeling/meshes/reference-files/Clothing_Cage_Template.blend) project and begin setting up your basic project objects.

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

1. Download the [Clothing_Cage.blend](../../../assets/modeling/meshes/reference-files/Clothing_Cage_Template.blend) project. This project includes the inner and outer cage mesh that you will use as temporary mannequins.
2. Open this file, click **Save As**, and save the project with a new name. This will be your main Blender project for the clothing accessory.
3. In the Outliner, copy and paste **InnerCage** object to duplicate it.
4. With the duplicated object highlighted, right-click in the viewport and select **Parent** > **Parent and Clear Transformation**.
5. In the Outliner, right-click and delete the extra **Cage.001 data object**.
6. Rename the duplicated object as "LongSleeve".
7. Rename the original cages as "LongSleeve_OuterCage" and "LongSleeve_InnerCage", respectively.
8. **Hide** the original \_OuterCage and \_InnerCage objects. You use these later in the Caging step.

   <video controls src="../../../assets/art/accessories/creating/Modeling_00.mp4" width="100%"></video>

## Clearing Extra Attributes

The cage mesh objects in the template include some helper vertex color properties that need to be removed from your clothing mesh. If left in, the vertex colors may clash with the texture of the object after importing in Studio.

To remove extra attribute data:

1. With the LongSleeve object selected, navigate to the **Properties** panel > **Object Data Properties** > **Color Attributes**.

   <img src="../../../assets/art/accessories/creating/Modeling-Clear-Vertex-Colors.png" />

2. With **colorSet1** selected, remove it by pressing the **–** button.

   <video controls src="../../../assets/art/accessories/creating/Modeling_01.mp4" width="100%"></video>

## Trim Clothing Shapes

Now that you have a clean mesh to work with, cut the basic shape of the type of clothes you intend to create. In this tutorial, you create a long-sleeve shirt shape by removing the leg, arm, and head sections.

<center><figure>
   <img src="../../../assets/art/accessories/creating/Modeling-Wireframe-View.png" width="60%" />
   <figcaption>Long-sleeve trimming of the full-body mesh.</figcaption>
</figure></center>

To trim your clothing shape:

1. Select the **LongSleeve** object.
2. Switch to **Edit Mode**.
3. Enable **X-Ray mode** in the top right corner of the viewport.
4. Click and drag over parts of the mesh that you do not want to include in your shirt.
5. Press <kbd>X</kbd> and select **Vertices** to delete these sections of your mesh.
6. **Repeat step 4** until you reach your desired clothing shape.

   <video controls src="../../../assets/art/accessories/creating/Modeling_02.mp4" width="100%"></video>

## Add and Smooth Vertices

With the basic shape created, subdivide the surface of your clothing mesh to add vertices and smooth out the mesh. This process removes the grid-like surface and allows you to apply more complex sculpting detail later.

<GridContainer numColumns="2">
  <figure>
    <img src="../../../assets/art/accessories/creating/Modeling-No-Modifier.png" />
    <figcaption>Before applying Subdivision modifier and Shade Smooth</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/art/accessories/creating/Modeling-SubDiv-Modifier.png" />
    <figcaption>After applying Subdivision modifier and Shade Smooth</figcaption>
  </figure>
</GridContainer>

To add and smooth your vertices:

1. Switch back to **Object Mode**.
2. With the clothing mesh selected, navigate to the **Modifier Properties** panel.
3. Select **Add Modifier** > **Subdivision Surface Modifier** and click **Apply** with the default settings.
4. In the viewport, right-click the object and select **Shade Smooth** to eliminate the creases on your clothing article.

   <video controls src="../../../assets/art/accessories/creating/Modeling_03.mp4" width="100%"></video>

## Scaling and Positioning

With your base clothing shape created, the next steps are to scale out the mesh and reposition it on top of the mannequin.

<center><figure>
   <img src="../../../assets/art/accessories/creating/Modeling-Positioning-and-Scaling.png" width="60%" />
   <figcaption>Clothing mesh should fit over mannequin after applying a reposition and scale</figcaption>
</figure></center>

To set up and scale your clothing to your mannequin:

1. Return to **Object Mode**.
2. **Unhide** one of your original cage meshes.
3. In the filter dropdown, enable **Selectable** toggles, and set your body mesh to unselectable. Disabling the **Selectable** toggle prevents accidental edits to your mannequin.
4. Select your shirt mesh and lightly **scale** and **position** your asset to rest over the mannequin.
5. Press <kbd>S</kbd> and use your mouse to scale. In most cases, the scaling should be a small change.
6. Press <kbd>G</kbd> and click to grab your shirt, make sure the shirt rests loosely over the mannequin. The shirt does not need to fit perfectly at this point.

   <video controls src="../../../assets/art/accessories/creating/Modeling_04.mp4" width="100%"></video>

## Sculpting Detail

After scaling and positioning your clothing mesh, begin applying sculpting detail to add cloth and fabric detail to your mesh. While there are many ways to sculpt an object in Blender, this tutorial primarily uses the **Elastic Deform**, **Inflate**, and **Clothing** tools to make your mesh look more like realistic clothing.

<center>
  <figure>
    <img src="../../../assets/art/accessories/creating/Modeling-Complete-2.png" width="60%" />
    <figcaption>Clothing mesh after sculpting details</figcaption>
  </figure>
</center>

To add clothing details:

1. With the shirt highlighted, switch to **Sculpt Mode**.
2. Disable **X-Ray mode**, if required.
3. Enable **X Mirror** to perform symmetrical edits.
4. Select the **Elastic Deform** tool at `.5` strength to stretch parts of vertices to completely cover the mannequin.

   1. Use <kbd>F</kbd> to change the radius of the brush.
   2. You can hide the mannequin to access hard-to-reach areas.

      <video controls src="../../../assets/art/accessories/creating/Modeling_05.mp4" width="100%"></video>

5. Select the **Cloth** tool.
6. Disable **X Mirror**. The cloth tool can produce unexpected results with symmetry enabled.
7. Using the Cloth tool, click and drag on your mesh to add a cloth-like surface to your mesh. Adjust the settings to change the strength of the deformations.

   <video controls src="../../../assets/art/accessories/creating/Modeling_06.mp4" width="100%"></video>

8. Using the **Elastic Deform**, **Inflate**, and **Cloth** tools, make the final adjustments to your mesh so that it sits on top of the mannequin with the final desired shape.

   <video controls src="../../../assets/art/accessories/creating/Modeling_07.mp4" width="100%"></video>

## Making Mesh Watertight

With the shirt shape finalized, make your mesh **watertight** by "sealing" the holes at the neck, waist, and wrist. A watertight shape ensures that only the top visible surface of the mesh is exposed at any angle. If an asset is not watertight, it may expose backfaces, or single sided faces, that could affect the rendering of your asset and performance when equipped.

<GridContainer numColumns="2">
  <figure>
    <img src="../../../assets/art/accessories/creating/Watertight-Top.png" />
    <figcaption>Watertight top view</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/art/accessories/creating/Watertight-Bottom.png" />
    <figcaption>Watertight bottom view</figcaption>
  </figure>
</GridContainer>

To make your mesh watertight:

1. Select your mesh and switch to **Edit Mode**.
2. Starting with any hole in the mesh, hold <kbd>Alt</kbd> and click the **last edge** on the mesh. The entire edge highlights.
3. Press <kbd>E</kbd> to extrude the mesh and click after a small length is added.
4. With the new edge still selected, right-click and select **Merge Vertices** > **At Center**.
5. Press <kbd>G</kbd> to grab the new vertex and reposition it within your clothing mesh.
6. **Repeat steps 2-5** until all the interior-exposing holes of your mesh are closed.

   <video controls src="../../../assets/art/accessories/creating/Modeling_08.mp4" width="100%"></video>

<Alert severity = 'success'>
You've completed the modeling section of this tutorial. If desired, download a [reference project](../../../assets/art/reference-files/checkpoint/1_LongSleeve-Modeling-Complete.blend) of this stage and compare it against your work.

There are a lot of techniques to create clothing. Try experimenting with the following techniques, tools, and processes to create additional unique assets:

- Making asymmetrical clothing.
- Blender's [cloth simulation](https://docs.blender.org/manual/en/latest/physics/cloth/examples.html#using-simulation-to-shape-sculpt-a-mesh) and other sculpting tools.
- Various community sewing and fabric techniques for creating clothing on Blender.

</Alert>
