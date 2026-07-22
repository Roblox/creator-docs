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

**Rigid accessories** are 3D assets that attach to an avatar according to the attachment points around the character's body, such as props, weapons, and hats. When users purchase rigid accessories on the Marketplace, they can adjust the position and rotation of the item away from the attachment point according to their avatar's body type.

There are two main layers of a rigid accessory that structure how the accessory looks and works on the platform:

- **Mesh & textures** that make up the rigid accessory's visual appearance.
- **Attachments** that determine how the accessory attaches to the character's body.

While you can create the first of these layers manually in third-party modeling tools like [Blender](https://www.blender.org/) or [Maya](https://www.autodesk.com/products/maya/overview), attachments have strict configuration requirements to meet Roblox's technical [rigid accessory specifications](specifications.md) that guarantee your rigid accessories behave consistently from game to game. Before you create your first custom rigid accessory, it's recommended to:

1. Understand the [essential components](#rigid-accessory-components) of a rigid accessory and how they work together.
1. Review all [resources](#resources) that Roblox provides to standardize and expedite the [creation process](#creation-process), such as Blender and Maya project files, Studio tooling, and step-by-step guides.
1. Follow the [basic rigid accessory creation tutorial](../../art/accessories/creating-rigid/index.md) that covers how to convert a simple 3D model into a rigid accessory.

Once you have a custom rigid accessory, you can import it into Studio and use the Avatar Setup tool to process your creation into an avatar asset that's ready to be sold on the [Marketplace](../../marketplace/index.md).

<Alert severity = 'info'>
Unlike rigid accessories that don't deform when they attach to a specific point on the avatar, layered accessories stretch and wrap over a target until it fits over the character's body. For more information, see [Layered accessories](../layered-accessories/index.md).
</Alert>

## Rigid accessory components

All rigid accessories are made up of the same three fundamental components that allow users equip 3D items with consistent behavior according to the character's [body type](specifications.md#body-scale).

### Mesh part

<GridContainer numColumns="2">
<figure><img src="../../assets/art/accessories/Mesh-Bow-Example.png" /><figcaption>Bow rigid accessory mesh object.</figcaption></figure>
<figure><img src="../../assets/art/accessories/Mesh-Hair-Example.png" /><figcaption>Hair rigid accessory mesh object.</figcaption></figure>
</GridContainer>

<Alert severity = 'warning'>
Clothing, such as the t-shirt, require [additional clothing components](../layered-accessories/index.md) to apply the layerable effect to the 3D object.
</Alert>

All accessories require a single mesh object that represents the rigid accessory's geometry. In Studio, this mesh object is represented as a `Class.MeshPart` nested under a single `Class.Model`.

### Textures

<GridContainer numColumns="2">
  <figure><img src="../../assets/art/accessories/Texture-Bow-Example.png" />  <figcaption>2D texture map for the bow rigid accessory.</figcaption></figure>
  <figure><img src="../../assets/art/accessories/Texture-Hair-Example.png" />  <figcaption>2D texture map for the hair rigid accessory.</figcaption></figure>
</GridContainer>

Textures are image files that define the surface appearance of your rigid accessory. You can create textures within a texture painting program or a 3D modeling software.

In Studio, you must import textures as image files and set them to `Class.MeshPart` objects by a child `Class.SurfaceAppearance` object or a `Class.MeshPart.TextureID` property.

### Attachments

<GridContainer numColumns="2">
  <figure><img src="../../assets/art/accessories/Attachment-Bow-Example.png" />  <figcaption>The bow's attachment point enables the bow to connect to a character's back.</figcaption></figure>
  <figure><img src="../../assets/art/accessories/Attachment-Hair-Example.png" />  <figcaption>The hair's attachment point enables the hair to connect to a character's head.</figcaption></figure>
</GridContainer>

Attachment points define where accessories attach to a character's body. These are not rendered on the platform, but they are represented visually as spheres in 3D modeling software when you use Roblox's **R15 Rig and Attachments** [project file](../../avatar/resources.md#project-files).

When you import a rig with these visual representations, the spheres are created as `Class.Attachment` objects using standardized names.

## Creation process

When designing a rigid accessory in [Blender](https://www.blender.org/) or [Maya](https://www.autodesk.com/products/maya/overview), you must export all of the avatar components in a single `.fbx` or `.gltf` for import into Studio. Since 3D creation isn't a linear process and always requires reiteration and testing, the process of creating a rigid accessory can differ between individuals and various creation workflows.

In general, the creation process follows the following workflow:

<figure><figcaption><center>Rigid Accessory Workflow</center></figcaption><center><img src="../../assets/art/accessories/Workflow-Rigid.png" width="50%"/></center></figure>

## Resources

There are a variety of resources available for creators of all backgrounds to get started with rigid accessory creation. Review the following table for specific topics and resources:

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
    <td>[.FBX export settings](../../art/modeling/export-requirements.md)<br /><br />[General mesh specifications](../../art/modeling/specifications.md)<br /><br />[Rigid accessory specifications](../../avatar/rigid-accessories/specifications.md)<br /><br />[Marketplace policy](../../marketplace/marketplace-policy.md)</td>
  </tr>
  <tr>
    <td>Cosmetic creation</td>
    <td>[Rigid accessories overview](../../avatar/rigid-accessories/index.md)<br /><br />[Layered clothing overview](../../avatar/layered-accessories/index.md)<br /><br /><br />[Accessory Fitting Tool](../../avatar/accessory-fitting-tool.md)<br /><br />[Rigid accessory specifications](../../avatar/rigid-accessories/specifications.md)<br /><br />[Marketplace requirements](../../marketplace/marketplace-policy.md)</td>
  </tr>
  <tr>
    <td>Texturing</td>
    <td>[Texturing requirements](../../art/modeling/texture-specifications.md)<br /><br />[PBR textures](../../art/modeling/surface-appearance.md)</td>
  </tr>
  <tr>
    <td>Rigging and skinning</td>
    <td>[Rigging and skinning overview](../../art/modeling/rigging.md)<br /><br />[Humanoid rig requirements](../../avatar/character-bodies/specifications.md#rigging)<br /><br />[Rig facial bones](../../art/characters/facial-animation/create-basic-heads.md#rigging)<br /><br />[Automatic Skin Transfer](../../avatar/automatic-skinning-transfer.md)<br /><br />[Skin facial bones](../../art/characters/facial-animation/create-basic-heads.md#skin-face-bones)</td>
  </tr>
  <tr>
    <td>Publishing and Marketplace</td>
    <td>[Uploading to Marketplace](../../marketplace/publish-to-marketplace.md)<br /><br />[Marketplace Policy](../../marketplace/marketplace-policy.md)<br /><br />[Fees and commissions](../../marketplace/marketplace-fees-and-commissions.md)</td>
  </tr>
</tbody>
</table>
