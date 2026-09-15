---
title: Make mesh watertight
description: Seal off your geometry to ensure that there are no angles where the interior backfaces of your object are exposed.
next: /art/accessories/creating/unwrapping
prev: /art/accessories/creating/sculpting
---

With the t-shirt shape finalized, make your mesh **watertight** by "sealing" the holes at the neck, waist, and wrist. A watertight shape ensures that only the top visible surface of the mesh is exposed at any angle. If an asset is not watertight, it may expose backfaces (single-sided faces) that could affect the rendering of your asset and performance when equipped to a character.

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

To make your t-shirt watertight:

1. With **LongSleeve** active, switch to **Edit** mode.
1. Starting with any hole in the mesh, hold <kbd>Alt</kbd> and click the **last edge** on the mesh. The entire edge highlights.
1. Press <kbd>E</kbd> to extrude the mesh, then click after a small extrusion is added.
1. With the new edge still selected, right-click and select **Merge Vertices** > **At Center** from the contextual menu.
1. Press <kbd>G</kbd> to grab the new vertex and reposition it within your t-shirt mesh.
1. Repeat until all the interior-exposing holes of your mesh are closed.

   <video controls src="../../../assets/art/accessories/creating/Modeling_08.mp4" width="100%"></video>

<Alert severity = 'success'>
You've completed the modeling section of this tutorial. If desired, download a [reference project](../../../assets/art/reference-files/checkpoint/1_LongSleeve-Modeling-Complete.blend) of this stage and compare it against your work.

There are a lot of techniques to create clothing. Try experimenting with the following techniques, tools, and processes to create additional unique assets:

- Making asymmetrical clothing.
- Blender's [cloth simulation](https://docs.blender.org/manual/en/latest/physics/cloth/examples.html#using-simulation-to-shape-sculpt-a-mesh) and other sculpting tools.
- Various community sewing and fabric techniques for creating clothing on Blender.

</Alert>
