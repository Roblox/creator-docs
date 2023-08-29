---
title: Applying Surface Images
description: The process for applying surface images to Parts.
next: /tutorials/building/modeling/sculpting-terrain
prev: /tutorials/building/modeling/building-unique-3d-objects
---

All primitive `Class.Part|Parts` in Roblox (blocks, cylinders, spheres, and wedges) have surfaces and you can use `Class.Texture|Textures` or `Class.Decal|Decals` to apply an image to a chosen surface.

Whether you choose a texture or decal depends on the following:

<table>
    <thead>
        <tr>
            <th>Texture</th>
            <th >Decal</th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <td>A texture <b>repeats both horizontally and vertically</b> across the entire surface. The size of each &ldquo;tile&rdquo; can be modified and even offset.</td>
        <td>A decal <b>stretches across the entire surface</b>, meaning its appearance depends on the surface size.</td>
        </tr>
        <tr>
        <td><img src="../../../assets/tutorials/applying-surface-images/Texture-Transition-Example.png" width="75%" /></td>
        <td><img src="../../../assets/tutorials/applying-surface-images/Decal-Transition-Example.png" width="100%"  /></td>
        </tr>
    </tbody>
</table>

## Creating Textures or Decals

Both textures and decals can be added to a part as follows:

1. Create and select a primitive part such as a **Block**, **Sphere**, or **Cylinder**.
2. In the Explorer, hover over the part, click the **+** button, and select **Texture** or **Decal**.

   <GridContainer numColumns="2">
     <img src="../../../assets/tutorials/applying-surface-images/Part-Insert-Texture.png" />
     <img src="../../../assets/tutorials/applying-surface-images/Part-Insert-Decal.png" />
   </GridContainer>

3. **Hover** over the part and then **click** on a face to apply the decal.

   <img src="../../../assets/tutorials/applying-surface-images/Apply-Front-Surface.jpg" width="80%" />

## Applying the Image

To apply an image to the texture or decal, click on its **Texture** property in the **Properties** window and select an image you've [uploaded to Roblox](../../../production/publishing/publishing-assets.md).

<GridContainer numColumns="2">
  <img src="../../../assets/tutorials/applying-surface-images/Set-Texture-Image.jpg" />
  <img src="../../../assets/tutorials/applying-surface-images/Modify-Texture-Property.png" />
</GridContainer>

<Alert severity="info">
If you can't select an image, make sure that you've published (**File** > **Publish to Roblox**) the game, and have uploaded an image through the Game Explorer.
</Alert>

## Changing the Surface

Once created, a texture or decal can be applied to a specific surface by setting its **Face** property to **Back**, **Bottom**, **Front**, **Left**, **Right**, or **Top**.

<GridContainer numColumns="2">
  <img src="../../../assets/tutorials/applying-surface-images/Set-Texture-Face.jpg" />
  <img src="../../../assets/tutorials/applying-surface-images/Modify-Face-Property.png" />
</GridContainer>

## Sizing and Position

As noted above, the primary difference between textures and decals is how the image is sized and positioned on the surface.

- For `Class.Decal|Decals`, the image will stretch across the entire surface.

    <table>
        <thead>
            <tr>
                <th width="140">Image</th>
                <th colspan="2">Surfaces of 10×6 / 6x6 Studs</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td rowspan="2"><img src="../../../assets/tutorials/applying-surface-images/Decal-Texture-Sample.png" width="100%" /></td>
                <td><img src="../../../assets/tutorials/applying-surface-images/Decal-Sample-1.png" width="100%" /></td>
                <td><img src="../../../assets/tutorials/applying-surface-images/Decal-Sample-2.png" width="100%" /></td>
            </tr>
        </tbody>
    </table>

- For `Class.Texture|Textures`, the image **size** can be controlled via the **StudsPerTileU** and **StudsPerTileV** properties.

    <table>
        <thead>
            <tr>
                <th width="140">Image</th>
                <th colspan="2">Surfaces of 8×6 Studs</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td rowspan="2"><img src="../../../assets/tutorials/applying-surface-images/Decal-Texture-Sample-2.png" width="100%" /></td>
                <td><img src="../../../assets/tutorials/applying-surface-images/Texture-Sample-UV-1.png" width="100%" /></td>
                <td><img src="../../../assets/tutorials/applying-surface-images/Texture-Sample-UV-2.png" width="100%" /></td>
            </tr>
        </tbody>
    </table>

  Additionally, textures can be **offset** with the **OffsetStudsU** and **OffsetStudsV** properties, giving you more control over texture placement and even [animation](../../../parts/textures-decals.md#animating-textures).

    <table>
    <thead>
        <tr>
            <th width="140">Image</th>
            <th colspan="2">Surfaces of 8×6 Studs</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="2"><img src="../../../assets/tutorials/applying-surface-images/Decal-Texture-Sample-2.png" width="100%" /></td>
            <td><img src="../../../assets/tutorials/applying-surface-images/Texture-Sample-Offset-1.png" width="100%" /></td>
            <td><img src="../../../assets/tutorials/applying-surface-images/Texture-Sample-Offset-2.png" width="100%" /></td>
        </tr>
    </tbody>
    </table>

## Tint and Transparency

Both decals and textures support a color tint and transparency setting via their **Color3** and **Transparency** properties respectively.

<table>
    <thead>
        <tr>
            <th width="140">Image</th>
            <th colspan="2">Color Tint 255, 0, 0 / Transparency 0.5</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><img src="../../../assets/tutorials/applying-surface-images/Decal-Texture-Sample-2.png" width="100%" /></td>
            <td><img src="../../../assets/tutorials/applying-surface-images/Texture-Sample-Color.png" width="100%" /></td>
            <td><img src="../../../assets/tutorials/applying-surface-images/Texture-Sample-Transparency.png" width="100%" /></td>
        </tr>
    </tbody>
</table>
