---
title: Create your first layered accessory
description: This tutorial covers the basic steps required in Blender to create Studio-ready layered accessory assets from scratch.
next: /art/accessories/creating/modeling-setup
---

<iframe width="800" height="450" src="https://www.youtube-nocookie.com/embed/C-DwGRBHvmE" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
<br /><br />

**Layered accessories**, often referred to as **layered clothing**, are 3D objects that stretch and fit on an avatar character's body according to their rigging armature and cage meshes. When users purchase layered accessories on the [Marketplace](https://www.roblox.com/catalog), such as jackets, dresses, and cardigans, they expect it to move with the character's animations and layer appropriately on top of existing clothing the character is wearing.

This tutorial covers the basics of how to create a simple 3D model t-shirt in Blender using downloadable project templates with all [components required for layered accessories](../../../avatar/layered-accessories/index.md#layered-accessory-components), import it into Studio, then convert it into a Marketplace-ready `Class.Accessory` object that you can sell, save to your toolbox, or use within your games as a layered accessory.

<Alert severity = 'warning'>
Creating, building, and sharing on Roblox is free. However, the last step of listing your item on the Marketplace requires a Roblox Plus or Premium account, an upload fee, and a publishing advance. For more information, see [Marketplace policies](../../../marketplace/marketplace-policy.md#creator-requirements).
</Alert>

<GridContainer numColumns="2">
  <figure>
    <img src="../../../assets/art/accessories/creating/Modeling-Mannequin-Start.png" />
    <figcaption>Provided Blender mannequin template</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/art/accessories/creating/Example-Product.png" />
    <figcaption>Final Studio-ready clothing asset</figcaption>
  </figure>
</GridContainer>

This tutorial is intended for creators with moderate Blender experience and uses the following processes to create a clothing item:

1. Modeling basic clothing using an existing mannequin shape.
2. Texturing your mesh to change its surface appearance and color.
3. Caging your clothing mesh using Roblox's template cages.
4. Rigging your clothing mesh using Roblox's armature templates.
5. Exporting your asset from Blender.
6. Importing and converting the model to an accessory in Studio.

<Alert severity ='info'>
While this content and the provided examples cover the Blender workflow and tools, you can apply the same concepts to other third-party modeling applications.
</Alert>
