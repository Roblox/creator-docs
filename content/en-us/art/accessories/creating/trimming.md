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

Create the general shape of your clothing type by trimming sections of your duplicated mannequin mesh.

To trim your clothing shape:

1. Select the **LongSleeve** object.
2. Switch to **Edit Mode**.
3. Enable **X-Ray mode** in the top right corner of the viewport.
4. Click and drag over parts of the mesh that you do not want to include in your shirt.
5. Press <kbd>X</kbd> and select **Vertices** to delete these sections of your mesh.
6. **Repeat step 4** until you reach your desired clothing shape.

   <video controls src="../../../assets/art/accessories/creating/Modeling_02.mp4" width="100%"></video>

## Add and smooth vertices

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

## Scale and position

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
