---
title: Create seams and unwrap
description: Use Blender's seams and unwrapping functionality to project your 3D surface on a 2D texture plane.
prev: /art/accessories/creating/watertight
next: /art/accessories/creating/texture-map
---

**Texturing** is the process of customizing the color, tone, and shading of your model's surface. Custom meshes and models use a 2D image, known as a texture map, to project various surface appearance elements onto your 3D object. In this tutorial, apply a complete color to your shirt and add a smaller design using Blender's Texture Paint mode.

<Alert severity ='warning'>
This tutorial does not cover [PBR textures](../../modeling/surface-appearance.md), which are advanced textures that can replicate real-world texture properties, like reflectivity and surface roughness, and are recommended to give your clothing items an extra dimension of creativity and visual pop. PBR textures often require a third-party application such as Substance Painter.
</Alert>

<GridContainer numColumns="2">
  <figure>
    <img src="../../../assets/art/accessories/creating/Texturing-Start.png" />
    <figcaption>Clothing mesh after sculpting</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/art/accessories/creating/Texturing-Complete-3.png" />
    <figcaption>Clothing mesh after texturing</figcaption>
  </figure>
</GridContainer>

The texturing process requires the following steps:

1. Create seams in your mesh to define how Blender unwraps your 3D object.
2. Unwrap the UV of your model, creating a distinct front and back 2D surface to apply textures on based on your seams.
3. Create a new texture image to save as your 2D map.
4. Paint a custom texture using Blender's Texture Paint tools.

## Create seams

To begin texturing, you must first generate a **UV map**, or 2D projection, of the surface of your mesh. To set up this UV map, you tell Blender which edges of your mesh to use as seams when creating the projection.

To create seams that naturally separate the front and back of the shirt:

1. With your clothing object selected, switch to **Edit mode**.
2. In the top-left, navigate to the Select modes and select **Edge select**.
3. Hold <kbd>Alt</kbd> and click on the center vertical edges of your shirt. The detected edge highlights.
4. Whenever a complete edge is selected, **right-click** and select **Make Seam**. The edge highlights to indicate the seam in your model.
5. **Repeat steps 3-4** to create a continuous seam across your mesh.
   <video controls src="../../../assets/art/accessories/creating/Texturing_01.mp4" width="100%"></video>

## UV unwrap

After applying the seams, Blender now knows how to "unwrap" the mesh surface onto a 2D plane as a front and back surface.

<center><figure>
   <img src="../../../assets/art/accessories/creating/Texturing-UV-Maps.png" width="60%" />

   <figcaption>UV-mapping of your 3D clothing mesh.</figcaption>
</figure></center>

To UV Unwrap your object by your selected seams:

1. While in Edit mode, press <kbd>A</kbd> to highlight all vertices.
2. At the top of the viewport, select **UV** > **Unwrap**.
3. Switch to **Texture Paint** mode, your UVs display on the left window when your object is selected.

   <video controls src="../../../assets/art/accessories/creating/Texturing_02.mp4" width="100%"></video>
