---
title: Texture painting
description: Covers the process of associating PBR textures to rigid accessories in Blender.
prev: /art/accessories/creating-rigid/modeling-setup
next: /art/accessories/creating-rigid/exporting
---

<img src="../../../assets/art/accessories/creating-rigid/Texturing-Complete.png" alt="A screenshot of blender showing the final 3d shape and color of a treasure chest in the viewport"/>

**Texturing** is the process of applying a surface appearance to a 3D object. **Texture painting** is a technique that allows you to digitally brush your surface colors onto your 3D object, or onto the 2D image that represents the surface of your object.

This tutorial covers basic texture painting in Blender. Common workflows in the industry utilize additional third-party tools to create textures, especially high-definition PBR textures that mimic realistic lighting and texture properties.

<Alert severity = 'warning'>
While PBR textures are not required for accessories and is not covered in this tutorial, adding PBR textures can add extra visual flair and realism to elevate your creations. This typically requires additional software. <br /> <br /> For more information, see [PBR textures](../../modeling/surface-appearance.md).
</Alert>

## UV projecting

<video controls src="../../../assets/art/accessories/creating-rigid/UV-Projecting.mp4" width="100%"></video>

Use Blender's automatic UV Project feature to "unwrap" your 3D object onto a 2D plane. This allows you to associate a 2D image to the 3D surface of your object.

1. In Edit mode, press <kbd>A</kbd> to select your object.
2. In the top UV menu, select **Smart UV Project**.
3. Set Island Margin to `.02`.

## Add new material

<video controls src="../../../assets/art/accessories/creating-rigid/Adding-New-Material.mp4" width="100%"></video>

Add a new material for Blender to associate this new texture, and assign it to a new blank 2D image.

1. In the bottom right panel, select the red **Materials** tab.
2. Select the **+ New** button. Additional material options display below.
3. In **Base Color**, select the dot. A dropdown appears.
   1. Select **Image Texture**.
4. Under Base Color, select the **+ New** button.
   1. Name the texture image file. Using an affix like "\_TXT" can help organize your files later.
   2. Select the color and pick a color. This tutorial recommends using a metallic color for your metal borders to save time.

## Texture painting

Texture painting allows you to paint directly on the 3D object or the 2D mapping of the surface.

Since Blender automatically mapped the 2D atlas of the texture, it's not easy to tell what parts of the 2D image maps to the 3D object. First mark the sections of the 3D object you want to paint solid before completing your texture by painting the 2D map.

<Alert severity = 'info'>
There are many ways to texture within Blender. To keep this process simple, the tutorial used Blender's [Smart UV Project](https://docs.blender.org/manual/en/2.79/editors/uv_image/uv/editing/unwrapping/mapping_types.html), but there are many ways to manually create your 2D texture islands and organize your mesh and texture.
</Alert>

### Mark 3D object

<video controls src="../../../assets/art/accessories/creating-rigid/Marking-3d-Object.mp4" width="100%"></video>

Switch to Texture Paint mode and use the paintbrush to track the "wood" parts of the treasure chest.

1. In Edit mode, select your object.
2. Switch to **Texture Paint** mode. A side-by-side panel displays with your 2D atlas on the left and the 3D object on the right.
3. Expand the Tool submenu in the top-right of either window.
4. Select your brush settings and mark the wooden areas of your chest.
   1. Use <kbd>Ctrl</kbd><kbd>Z</kbd>/<kbd>⌘</kbd><kbd>Z</kbd> to undo any accidental brushes on the metal border.
   2. Hold <kbd>F</kbd> and drag the mouse to adjust brush size.

### Paint 2D map

<video controls src="../../../assets/art/accessories/creating-rigid/Painting-2d-Map.mp4" width="100%"></video>

With all of the wooden areas of your chest marked, you can now quickly texture your 2D atlas. First adjust your brush settings to have a hard edge and then begin painting the 2D image.

1. On the left window, access to **Tool** menu in the top right of the window.
   1. Set the **Falloff** shape to the flattest icon to ensure the edges are sharp.
   2. Set the color or any other brush settings here.
2. In the left window, begin coloring in each island of your texture. You can quickly preview the changes on your 3D object on the right side.
   1. Use <kbd>Ctrl</kbd><kbd>Z</kbd>/<kbd>⌘</kbd><kbd>Z</kbd> to undo any accidental brushes on the metal border.
   2. Hold <kbd>F</kbd> and drag the mouse to adjust brush size.
3. After completion, navigate to **Image** > **Save** to save your image file.

<Alert severity = 'success'>
You've completed the texturing section of this tutorial. If desired, download a [reference version](../../../assets/art/accessories/creating-rigid/Chest-Texturing-Complete.blend) of this stage of the project for comparison.
</Alert>
