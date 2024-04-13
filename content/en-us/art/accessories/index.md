---
title: Rigid Accessories
description: Rigid accessories are basic 3D cosmetics users can equip and wear on their avatar character.
hideBreadcrumbs: true
---

<img src="../../assets/avatar/character-customization/Avatar-Banner.jpg" />

Rigid accessories are the most basic 3D cosmetic items that users can equip and wear on their avatar character, such props, weapons, chats, and more. Unlike [clothing accessories](../accessories/layered-clothing.md) that stretch and fit over a character body, rigid accessories attach to a specific point on an avatar character and don't deform or wrap over a target.

To create a custom Roblox accessory for your own experience or to sell on the Marketplace, it's important to start with the following:

- A basic background with 3D modeling tools such as [Blender](https://www.blender.org/) or [Maya](https://www.autodesk.com/products/maya/overview).
- An understanding of the [components that make up a rigid accessory](#components-of-a-rigid-accessory).
- An understanding of the general [accessory creation process](#creation-process).
- Review Roblox's official tutorials to create your own accessories:
  - [Rigid accessory creation tutorial](../../art/accessories/creating-rigid/index.md) - covers each process required for converting a 3D model to a rigid accessory and publishing it to the Marketplace.
  - [Clothing creation tutorial](../../art/accessories/creating/index.md) - a step-by-step process of creating your own avatar-ready clothing from scratch in Blender.
- [Additional tools, resources, and guides](#resources) provided by Roblox to standardize and expedite the creation process.

## Components of a Rigid Accessory

All accessory models are made up of the same base components of a [mesh object](#mesh-part), [textures](#textures), and [attachment](#attachments).

When [creating accessories](#creation-process), most of these components are created first in your modeling software, then converted to their appropriate Roblox Studio instance on import.

### Mesh Part

<GridContainer numColumns="2">
<figure><img src="../../assets/art/accessories/Mesh-Bow-Example.png" /><figcaption>Bow rigid accessory mesh object</figcaption></figure>

<figure><img src="../../assets/art/accessories/Mesh-Example.png"/>  <figcaption>T-shirt layered clothing mesh object</figcaption></figure>
</GridContainer>

<Alert severity = 'warning'>
Clothing, such as the t-shirt, require [additional clothing components](../accessories/layered-clothing.md) to apply the layerable effect to the 3D object.
</Alert>

All accessories require a single mesh object that represents the geometry of the accessory object. In Studio, this mesh object is represented as a `Class.MeshPart` nested under a single `Class.Model`.

### Textures

<GridContainer numColumns="2">
  <figure><img src="../../assets/art/accessories/Texture-Example.png" />  <figcaption>2D texture map for the t-shirt model</figcaption></figure>

  <figure><img src="../../assets/art/accessories/Texture-Applied-Example.png" /><figcaption>T-shirt model with texture applied</figcaption></figure>
</GridContainer>

Textures are 2D image files that define the surface appearance of your 3D object. You can create textures within a texture painting program or a 3D modeling software.

In Studio, textures images are imported as image assets and are set to `Class.MeshPart` objects by a child `Class.SurfaceAppearance` object or a `Class.MeshPart.TextureID` property.

### Attachments

<GridContainer numColumns="2">
  <figure><img src="../../assets/art/accessories/Attachment-Example.png" />  <figcaption>Attachment geometry defines where the attachment connects with the character</figcaption></figure>

  <figure><img src="../../assets/art/accessories/Attachment-Data-Model-Example.png" width="80%"/><figcaption>Geometry with the "_Att" suffix automatically convert to `Class.Attachment` objects in Studio</figcaption></figure>
</GridContainer>

Attachment points define where accessories attach to a character's body. In Studio, attachments are represented by `Class.Attachment` objects.

## Creation Process

Custom accessories are first created in 3D modeling programs, such as [Blender](https://www.blender.org/) or [Maya](https://www.autodesk.com/products/maya/overview), before importing the `.fbx` or `.gltf` model into Studio.
To get started creating your first avatar asset, see [Avatar Tutorials](../../avatar/tutorials.md).

Depending on the type of asset you are creating, the creation process follows these high-level workflows:

<GridContainer numColumns="2">

  <figure>  <figcaption><center>Rigid Accessory Workflow</center></figcaption><img src="../../assets/art/accessories/Workflow-Rigid.png" /></figure>

  <figure><figcaption><center>Layered Accessory Workflow</center></figcaption><img src="../../assets/art/accessories/Workflow-Layered.png" /></figure>
</GridContainer>

<Alert severity = 'info'>
Since 3D creation isn't a linear process and always requires reiteration and testing, the process of creating an accessory can differ between individuals and various creation workflows.
</Alert>

## Resources

There are a variety of resources available for creators of all backgrounds to get started with accessory creation.

If you are interested in specific avatar creation topics, use the following table to find guides and resources that best match your needs:

<table>
<thead>
  <tr>
    <th>Topic</th>
    <th>Resources</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Tutorials</td>
    <td>[Rigid Accessory Creation](../../art/accessories/creating-rigid/index.md) <br /><br />[Basic Clothing Creation](../../art/accessories/creating/index.md)</td>
  </tr>
  <tr>
    <td>Reference Files</td>
    <td>[Accessory and Clothing Reference Files](../../art/modeling/project-files.md)</td>
  </tr>
  <tr>
    <td>Technical Specs</td>
    <td>[.FBX Export Settings](../../art/modeling/export-requirements.md)<br /><br />[General Mesh Specifications](../../art/modeling/specifications.md)<br /><br />[Accessory Specifications](../../art/accessories/specifications.md)<br /><br />[Marketplace Policy](../../art/marketplace/marketplace-policy.md)</td>
  </tr>
  <tr>
    <td>Cosmetic Creation</td>
    <td>[Accessories Overview](../../art/accessories/specifications.md)<br /><br />[Layered Clothing Overview](../../art/accessories/layered-clothing.md)<br /><br /><br />[Accessory Fitting Tool](../../art/accessories/accessory-fitting-tool.md)<br /><br />[Accessory Specifications](../../art/accessories/specifications.md)<br /><br />[Marketplace Requirements](../../art/marketplace/marketplace-policy.md)</td>
  </tr>
  <tr>
    <td>Texturing</td>
    <td>[Texturing Requirements](../../art/modeling/texture-specifications.md)<br /><br />[PBR Textures](../../art/modeling/surface-appearance.md)</td>
  </tr>
  <tr>
    <td>Rigging and Skinning</td>
    <td>[Rigging and Skinning Overview](../../art/modeling/rigging.md)<br /><br />[Humanoid Rig Requirements](../../art/characters/specifications.md#rigging)<br /><br />[Rigging Facial Bones](../../art/characters/facial-animation/creating-basic-heads.md#rigging)<br /><br />[Auto Skin Transfer](../../art/accessories/automatic-skinning-transfer.md)<br /><br />[Skinning Facial Bones](../../art/characters/facial-animation/creating-basic-heads.md#skinning-face-bones)</td>
  </tr>
  <tr>
    <td>Publishing and Marketplace</td>
    <td>[Uploading to Marketplace](../../art/marketplace/publishing-to-marketplace.md)<br /><br />[Marketplace Policy](../../art/marketplace/marketplace-policy.md)<br /><br />[Fees and Commissions](../../art/marketplace/marketplace-fees-and-commissions.md)</td>
  </tr>
</tbody>
</table>
