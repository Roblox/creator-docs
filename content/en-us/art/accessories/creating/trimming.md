---
title: Trim clothing shape
description: Create the general shape of your clothing item by removing unnecessary sections of your duplicated mesh.
next: /art/accessories/creating/sculpting
prev: /art/accessories/creating/modeling-setup
---

With a clean mesh object to work with, cut the basic shape of the type of clothing item you intend to create and prepare the mesh for additional sculpting detail. In this tutorial, you create a long-sleeve shirt shape by removing the leg, arm, and head sections, smoothing out the mesh to create a flat canvas, and repositioning the mesh onto your temporary mannequin.

<center><figure>
   <img src="../../../assets/art/accessories/creating/Modeling-Wireframe-View.png" width="60%" />
   <figcaption>Long-sleeve trimming of the full-body mesh.</figcaption>
</figure></center>

## Trim clothing shape

Create the general shape of your t-shirt by trimming sections of your duplicated mannequin mesh.

To trim your clothing shape:

1. Select **LongSleeve**, then switch to **Edit** mode.
1. In the top right corner of the viewport, enable **Wireframe** mode.
1. Click and drag over parts of the mesh that you do not want to include in your shirt, then press <kbd>X</kbd> and select **Vertices** from the contextual menu to delete these sections of your mesh.
1. Repeat until you reach your desired clothing shape.

   <video controls src="../../../assets/art/accessories/creating/Modeling_02.mp4" width="100%"></video>

## Add and smooth vertices

With the basic shape created, subdivide the surface of your t-shirt to add vertices and smooth out the mesh. This process removes the grid-like surface and allows you to apply more complex sculpting detail later.

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

1. Switch to **Object** mode.
1. With **LongSleeve** active, navigate to the **Modifier Properties** tab in the Properties Editor.
1. Select **Add Modifier** > **Subdivision Surface**, then click the **Apply** button with the default settings.
1. In the viewport, right-click the object and select **Shade Smooth** from the contextual menu to eliminate the creases on your t-shirt.

   <video controls src="../../../assets/art/accessories/creating/Modeling_03.mp4" width="100%"></video>

## Scale and position

With your base clothing shape created, the next steps are to scale out the t-shirt and reposition it on top of the mannequin.

<center><figure>
   <img src="../../../assets/art/accessories/creating/Modeling-Positioning-and-Scaling.png" width="60%" />
   <figcaption>Clothing mesh should fit over mannequin after applying a reposition and scale</figcaption>
</figure></center>

To set up and scale your clothing to your mannequin:

1. Switch to **Object** mode, then unhide one of your cage meshes.
1. Using the filter dropdown, enable the **Selectable** toggle, then set your body mesh to unselectable to prevent accidental edits to your mannequin.
1. With **LongSleeve** active, lightly scale and position your asset to rest over the mannequin.
   1. Press <kbd>S</kbd> and use your mouse to scale. In most cases, the scaling should be a small change.
   1. Press <kbd>G</kbd> and click to grab your shirt. Make sure the shirt rests loosely over the mannequin; it does not need to fit perfectly at this point.

   <video controls src="../../../assets/art/accessories/creating/Modeling_04.mp4" width="100%"></video>
