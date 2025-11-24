---
title: Rigid accessories
description: Rigid accessories are basic 3D cosmetics users can equip and wear on their avatar character.
---

<Grid container spacing={2} style={{ marginBottom: 24, width: '100%' }}>
<Grid item xs={6} style={{ padding: 16 }}>
<Grid item container wrap="nowrap" direction="column" style={{ gap: 8, flex: 1 }}>

<div
className="container"
style={{ position: "relative", paddingBottom: "56.25%", height: 0, marginBottom: 12 }} >
<iframe
src="https://www.youtube-nocookie.com/embed/tzPn6QvU8Bo"
title="YouTube video player"
frameBorder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
allowFullScreen
style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} ></iframe>
</div>
<Typography variant="body1">
A high-level overview of accessories on Roblox.
</Typography>

</Grid>
</Grid>

<Grid item xs={6} style={{ padding: 16 }}>
<Grid item container wrap="nowrap" direction="column" style={{ gap: 8, flex: 1 }}>

<div
className="container"
style={{ position: "relative", paddingBottom: "56.25%", height: 0, marginBottom: 12 }} >
<iframe
src="https://www.youtube-nocookie.com/embed/Eed29gV0hLA"
title="YouTube video player"
frameBorder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
allowFullScreen
style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} ></iframe>
</div>
<Typography variant="body1">
Create and sell your first basic accessory.
</Typography>
</Grid>
</Grid>
</Grid>

Rigid accessories are the most basic 3D cosmetic items that users can equip and wear on their avatar character, such props, weapons, hats, and more. Unlike [clothing accessories](../accessories/layered-clothing.md) that stretch and fit over a character body, rigid accessories attach to a specific point on an avatar character and don't deform or wrap over a target.

To create a custom Roblox accessory for your own experience or to sell on the Marketplace, it's important to start with the following:

- A basic background with 3D modeling tools such as [Blender](https://www.blender.org/) or [Maya](https://www.autodesk.com/products/maya/overview).
- An understanding of the [components that make up a rigid accessory](#components-of-a-rigid-accessory).
- An understanding of the general [accessory creation process](#creation-process).
- Review Roblox's official tutorials to create your own accessories:
  - [Rigid accessory creation tutorial](../../art/accessories/creating-rigid/index.md) - covers each process required for converting a 3D model to a rigid accessory and publishing it to the Marketplace.
  - [Clothing creation tutorial](../../art/accessories/creating/index.md) - a step-by-step process of creating your own avatar-ready clothing from scratch in Blender.
- [Additional tools, resources, and guides](#resources) provided by Roblox to standardize and expedite the creation process.

## Components of a rigid accessory

All accessory models are made up of the same base components of a [mesh object](#mesh-part), [textures](#textures), and [attachment](#attachments).

When [creating accessories](#creation-process), most of these components are created first in your modeling software, then converted to their appropriate Roblox Studio instance on import.

### Mesh part

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

## Creation process

Custom accessories are first created in 3D modeling programs, such as [Blender](https://www.blender.org/) or [Maya](https://www.autodesk.com/products/maya/overview), before importing the `.fbx` or `.gltf` model into Studio.
To get started creating your first avatar asset, see the [avatar tutorials](../../avatar/tutorials.md).

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
    <td>[Rigid accessory creation](../../art/accessories/creating-rigid/index.md) <br /><br />[Basic clothing creation](../../art/accessories/creating/index.md)</td>
  </tr>
  <tr>
    <td>Reference files</td>
    <td>[Accessory and clothing reference files](../../art/modeling/project-files.md)</td>
  </tr>
  <tr>
    <td>Technical specs</td>
    <td>[.FBX export settings](../../art/modeling/export-requirements.md)<br /><br />[General mesh specifications](../../art/modeling/specifications.md)<br /><br />[Accessory specifications](../../art/accessories/specifications.md)<br /><br />[Marketplace policy](../../marketplace/marketplace-policy.md)</td>
  </tr>
  <tr>
    <td>Cosmetic creation</td>
    <td>[Accessories overview](../../art/accessories/specifications.md)<br /><br />[Layered clothing overview](../../art/accessories/layered-clothing.md)<br /><br /><br />[Accessory Fitting Tool](../../art/accessories/accessory-fitting-tool.md)<br /><br />[Accessory specifications](../../art/accessories/specifications.md)<br /><br />[Marketplace requirements](../../marketplace/marketplace-policy.md)</td>
  </tr>
  <tr>
    <td>Texturing</td>
    <td>[Texturing requirements](../../art/modeling/texture-specifications.md)<br /><br />[PBR textures](../../art/modeling/surface-appearance.md)</td>
  </tr>
  <tr>
    <td>Rigging and skinning</td>
    <td>[Rigging and skinning overview](../../art/modeling/rigging.md)<br /><br />[Humanoid rig requirements](../../art/characters/specifications.md#rigging)<br /><br />[Rig facial bones](../../art/characters/facial-animation/create-basic-heads.md#rigging)<br /><br />[Automatic Skin Transfer](../../art/accessories/automatic-skinning-transfer.md)<br /><br />[Skin facial bones](../../art/characters/facial-animation/create-basic-heads.md#skin-face-bones)</td>
  </tr>
  <tr>
    <td>Publishing and Marketplace</td>
    <td>[Uploading to Marketplace](../../marketplace/publish-to-marketplace.md)<br /><br />[Marketplace Policy](../../marketplace/marketplace-policy.md)<br /><br />[Fees and commissions](../../marketplace/marketplace-fees-and-commissions.md)</td>
  </tr>
</tbody>
</table>
