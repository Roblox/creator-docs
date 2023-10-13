---
title: Caging
description: Covers the process of caging a custom clothing asset in Blender.
next: /art/accessories/creating/exporting
prev: /art/accessories/creating/rigging
---

**Caging** is the process of setting the clothing's interior and exterior surfaces, referred to as the inner and outer cages respectively. This enables your clothing to layer over existing clothing and bodies, and additional clothes to layer on top.

Since the shirt in this tutorial was created using the cage templates as a mannequin, there is no need to adjust the inner cage where your clothing asset already fits over. **Only the outer cage needs to be adjusted** to fit over the new clothing item.

<GridContainer numColumns="2">
  <figure>
    <img src="../../../assets/art/accessories/creating/Texturing-Complete.png" />
    <figcaption>Clothing and cage meshes before caging</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/art/accessories/creating/Caging-Complete.png" />
    <figcaption>Outer cage mesh after caging process</figcaption>
  </figure>
</GridContainer>

The caging process uses the following steps:

1. Set up your project by isolating the outer cage and the clothing mesh in your project.
2. Modify the outer cage to wrap over the clothing mesh using sculpting tools.

## Project Setup

You can quickly set up your project environment to isolate the meshes you intend to edit and prevent accidental changes to other objects. In this caging step, only the outer cage requires adjustment, so hiding and setting other objects as non-selectable can help make the caging process more efficient.

To set up your project:

1. Switch to **Object mode**.
2. In the Outliner:
   1. Hide the Armature.
   2. Unhide your LongSleeve_OuterCage object.
3. In the Outliner, navigate to **Armature** > **Long Sleeve** and toggle the **Disable Selection** icon. This prevents accidental edits to the clothing mesh.
   <img src="../../../assets/art/accessories/creating/Caging-Outliner-Setup.png" />

4. Select the OuterCage object, and navigate to Object Properties and enable **Wireframe**. This helps easily visualize and access the mesh.
   <img src="../../../assets/art/accessories/creating/Caging-Outer-Cage-Properties.png" />

<video controls src="../../../assets/art/accessories/creating/Caging_01.mp4" width="100%"></video>

## Modifying Outer Cage

With your project environment set, you can now adjust your outer cage using sculpting and editing tools. Set your outer cage as close as possible to your clothing mesh to ensure the best deformation and layering effects.

<Alert severity = 'error'>
**Do not delete any vertices or faces of the provided cages.** Destructive modification of the cages can cause import issues and prevent the clothing from importing and displaying as expected.
</Alert>

To modify your outer cage:

1. With the OuterCage mesh selected, switch to **Sculpt Mode**.
2. Enable **X Axis Symmetry**.
3. Switch to **Inflate tool**.
4. Press <kbd>F</kbd> to adjust the radius of the brush.
5. Starting with one side, expand the outer cage to fit precisely over the mesh
6. After expanding the cage mesh over a majority of the mesh, disable **X Axis Symmetry** and address individual spots. Keep the following in mind:
   1. Your outer cage should always cover your clothing mesh.
   2. Your outer cage should be as close to the clothing mesh as possible to ensure accurate layering.
   3. For small angular areas, like the armpit, you may need to switch back to **Edit Mode** and grab the individual vertices to avoid crowding your cage mesh vertices.
      <video controls src="../../../assets/art/accessories/creating/Caging_02.mp4" width="100%"></video>
7. Perform additional passes in **Edit Mode** with wireframe enabled to ensure your outer cage vertices fit as closely as possible. A tight fit ensures that your clothing item layers as accurately as possible.
   <video controls src="../../../assets/art/accessories/creating/Caging_03.mp4" width="100%"></video>

<Alert severity = 'success'>
You've completed the caging section of this tutorial.

If desired, download a [reference sample](../../../assets/art/reference-files/checkpoint/4_LongSleeve-Caging-Complete.blend) of this project for comparison before exporting your project and bringing it into Studio.
</Alert>
