---
title: Rigid Accessory Creation
description: This tutorial covers the basic steps required to publish a custom asset on the Marketplace.
next: /art/accessories/creating-rigid/modeling
---

Rigid accessories are 3D objects that users can equip to their avatar characters in an experience or through Roblox's [Marketplace](https://www.roblox.com/catalog) and [Avatar Editor](https://www.roblox.com/my/avatar). Unlike [clothing accessories](../../../art/accessories/creating/index.md) or [bodies](../../../art/characters/creating/index.md) that require caging, rigging, and skinning in a third-party modeling application, rigid accessories attach directly to an avatar character and do not bend or deform to the character's body. Since they do not require additional configuration in a third-party application beyond modeling and texturing, rigid accessories are usually the most basic type of 3D avatar item to create.

Using a provided 3D reference file, this tutorial covers each step in the workflow to properly configure and export a 3D model from Blender and generate your own rigid accessory in Studio. After you create the accessory, you can upload it to the Marketplace, save it to your toolbox, and use it in your own experiences.

<GridContainer numColumns="2">
<figure>
    <img src="../../../assets/art/accessories/creating-rigid/Blender-Mask-Preview.png" />
<figcaption>
  Mask asset as an untextured mesh object in Blender
</figcaption>
</figure>
<figure>
    <img src="../../../assets/art/accessories/creating-rigid/Studio-Mask-Preview.png" />
<figcaption>
  Mask asset equipped as an `Class.Accessory` in Studio
</figcaption>
</figure>
</GridContainer>

Using a provided reference 3D asset, this tutorial covers the following rigid accessory workflow:

1. Modeling overview and requirements in Blender.
2. Texturing setup using PBR textures in Blender.
3. Exporting your asset as a `.fbx` from Blender.
4. Importing the asset into Studio.
5. Fitting and converting the imported model to an `Class.Accessory` object.
6. Publishing and validating the accessory for Marketplace upload.

<Alert severity = 'info'>
While this content covers the Blender workflow with a provided reference example, you can apply the same concepts to other third-party modeling applications and custom assets.
</Alert>
