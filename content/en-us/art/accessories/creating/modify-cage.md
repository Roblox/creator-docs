---
title: Modify outer cage
description: Modify the outer cage to fit tightly over your clothing item.
next: /art/accessories/creating/exporting
prev: /art/accessories/creating/caging-setup
---

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
