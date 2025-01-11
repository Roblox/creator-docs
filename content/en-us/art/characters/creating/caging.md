---
title: Caging character head
description: Cage your avatar characters in Blender to support layerable accessories and clothing.
next: /art/characters/creating/combine-head-geometry
prev: /art/characters/creating/texturing-pbr
---

**Caging** is the process of updating the [cage mesh component](../../../art/characters/index.md#cage-meshes) of your avatar character. To allow your character to correctly wear layered clothing and accessories, you must update the default template cage mesh object to match the sculpting changes you made to your custom character.

Since this tutorial only applies modeling changes to the head, the caging instructions below only apply to the **Head_OuterCage** object. If you make geometry changes to other parts of the character, you must also adjust those specific **\_OuterCage** objects to match your sculpting changes.

<Alert severity ='error'>
Do not delete any vertices or faces of the provided cages. Destructive modification of the cages can cause import issues and prevent the character model from equipping clothing and cosmetics.
</Alert>

<GridContainer numColumns="2">
  <figure><img src="../../../assets/art/avatar/basic-creation/Pre-Caging.png" />  <figcaption>Default head cage mesh no longer fits over sculpted head</figcaption></figure>

  <figure><img src="../../../assets/art/avatar/basic-creation/Post-Caging.png" /><figcaption>Head cage mesh after adjustment</figcaption></figure>
</GridContainer>

<Alert severity = 'info'>
If your character body shape incorporates many changes with different body parts, it may be more efficient to use the [Blender Cage Template](../../../assets/modeling/meshes/reference-files/Body_Cage_Templates.zip). This Blender project file includes a helper full-body `std_cage_deformable` mesh to automatically apply vertex changes to the individual body-part cages at the same time.
</Alert>

To begin caging your character:

1. Starting from the Layout Tab, hide everything in the Outliner except the **Head_OuterCage** and the **Head_Geo** objects.

   <img src="../../../assets/art/avatar/basic-creation/Caging-Outer-Cage-Objects.png" />
   <video controls src="../../../assets/art/avatar/basic-creation/Caging_01.mp4" width="100%"></video>

2. With the **Head_OuterCage** selected, navigate to **Object Properties** > **Viewport Display** and set the **Display As** to **Wire**. Toggle this setting back to **Solid** when you are finished.
   <video controls src="../../../assets/art/avatar/basic-creation/Caging_02.mp4" width="100%"></video>
3. Click on the **Head_OuterCage** object and switch to **Edit Mode**.
4. Enable **X-Axis symmetry** and **Topology Mirror** to ensure you are making symmetrical vertex changes to your cage.

   <img src="../../../assets/art/avatar/basic-creation/Caging-Symmetry-Settings.png" />

5. Switch to **Edit Mode**.
6. Using the **Grab tool** (<kbd>G</kbd>), click and grab parts of the cage mesh and align it to fit tightly over the goblin head mesh. Keep the following in mind:

   1. **Never delete any of the cage vertices.** Missing vertices can cause errors and issues with equipping clothing accessories.
   2. If editing the base of your head cage, ensure that the base of the Head cage aligns with the top of the UpperTorso cage.
   3. In different Select modes, hold <kbd>Shift</kbd> and click multiple vertices/edges/faces to select and edit the geometry.
   4. You can verify a tight fit by grabbing vertices and moving them into the Head_Geo mesh to check where the meshes intersect and moving the cage vertices until the cage mesh just covers the head mesh.

      <video controls src="../../../assets/art/avatar/basic-creation/Caging_03.mp4" width="100%"></video>

   5. Toggle visibility on your different mesh objects to improve visibility and access to vertices.
   6. After the wireframe is tightly fitted over the head mesh, set the **Display As** back to **Solid** and spot check and fix any intersecting vertices.
      <video controls src="../../../assets/art/avatar/basic-creation/Caging_04.mp4" width="100%"></video>

Your final product should feature a cage mesh that sits directly over the head mesh without any of the Head_Geo geometry intersecting through the solid sections of the cage.

<img src="../../../assets/art/avatar/basic-creation/Post-Caging.png" />

<Alert severity = 'success'>
For a comparison reference, you can download [this version of the tutorial project with caging completed](../../../assets/art/reference-files/checkpoint/3_Goblin-caged.blend).
</Alert>
