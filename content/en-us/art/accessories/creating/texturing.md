---
title: Basic Clothing Creation
description: This tutorial covers the basic steps required in Blender to Studio-ready clothing assets from scratch.
prev: /art/accessories/creating/modeling
next: /art/accessories/creating/rigging
---

**Texturing** is the process of customizing the color, tone, and shading of your model's surface. Custom meshes and models use a 2D image, known as a texture map, to project various surface appearance elements onto your 3D object. In this tutorial, apply a complete color to your shirt and add a smaller design using Blender's Texture Paint mode.

<Alert severity ='warning'>
This tutorial does not cover [PBR Textures](../../modeling/surface-appearance.md), which are advanced textures that can replicate real-world texture properties, like reflectivity and surface roughness, and are recommended to give your clothing items an extra dimension of creativity and visual pop. PBR textures often require a third-party application such as Substance Painter.
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

## Creating Seams

To begin texturing, you must first generate a **UV map**, or 2D projection, of the surface of your mesh. To set up this UV map, you tell Blender which edges of your mesh to use as seams when creating the projection.

To create seams that naturally separate the front and back of the shirt:

1. With your clothing object selected, switch to **Edit mode**.
2. In the top-left, navigate to the Select modes and select **Edge select**.
3. Hold <kbd>Alt</kbd> and click on the center vertical edges of your shirt. The detected edge highlights.
4. Whenever a complete edge is selected, **right-click** and select **Make Seam**. The edge highlights to indicate the seam in your model.
5. **Repeat steps 3-4** to create a continuous seam across your mesh.
   <video controls src="../../../assets/art/accessories/creating/Texturing_01.mp4" width="100%"></video>

## UV Unwrapping

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

## Creating a Texture Map

Before applying any texture colors or shading, create an image to apply and save your textures to. To create a new texture map image:

1. With the clothing mesh selected, navigate to **Properties Panel** > **Material Preview** tab.
   <img src="../../../assets/art/accessories/creating/Texturing-Add-Image.png" width="40%" />

2. Select the **+ New** button.
3. Next to Base Color, select the **yellow dot** and click **Image Texture**.
   <img src="../../../assets/art/accessories/creating/Texturing-Add-Base.png" width="80%" />
4. Click the **+ New** button.

   1. Name the texture image the same as your clothing mesh with a `_TXT` affix.
   2. Set the color to black, or any base color of your preference.
   3. Keep the rest of the default settings.
   4. Press **OK** when completed.

   <video controls src="../../../assets/art/accessories/creating/Texturing_03.mp4" width="100%"></video>

## Texture Painting

With a new image ready to apply textures to, use Blender's Texture Paint mode to quickly brush texture colors onto your mesh:

1. Navigate to **Texture Paint mode**.
2. On the viewport, select the clothing object.
3. Open up the sidebar tools to access brush settings.
4. Select a color, brush size, and falloff to apply. You might need to adjust settings, depending on the modifications you intend to apply.
5. Draw on either the UV 2D map, or the 3D mesh.
6. Save the `.png` of your texture map by selecting **Image** > **Save**.
   <video controls src="../../../assets/art/accessories/creating/Texturing_04.mp4" width="100%"></video>

<Alert severity = 'success'>
You've completed the texturing section of this tutorial. If desired, download a [reference sample](../../../assets/art/reference-files/checkpoint/2_LongSleeve-Texturing-Complete.blend) of this project and texture image for comparison.

There are a lot of ways to texture and apply a unique appearance to your meshes. For additional suggestions, try utilizing alpha transparencies, unique seams, [PBR textures](../../modeling/surface-appearance.md), or Blender's other texturing tools and techniques.
</Alert>
