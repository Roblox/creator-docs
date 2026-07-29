---
title: Layered accessories
description: Layered accessories are 3D assets that stretch, fit, and layer over any character body type.
---

<Grid container spacing={2} style={{ marginBottom: 24, width: '100%' }}>
<Grid item xs={6} style={{ padding: 16 }}>
<Grid item container wrap="nowrap" direction="column" style={{ gap: 8, flex: 1 }}>

<div
className="container"
style={{ position: "relative", paddingBottom: "56.25%", height: 0, marginBottom: 12 }} >
<iframe
src="https://www.youtube-nocookie.com/embed/gXXukd6yOSs"
title="YouTube video player"
frameBorder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
allowFullScreen
style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} ></iframe>
</div>
<Typography variant="body1">
A high-level overview of layered accessories on Roblox.
</Typography>

</Grid>
</Grid>

<Grid item xs={6} style={{ padding: 16 }}>
<Grid item container wrap="nowrap" direction="column" style={{ gap: 8, flex: 1 }}>

<div
className="container"
style={{ position: "relative", paddingBottom: "56.25%", height: 0, marginBottom: 12 }} >
<iframe
src="https://www.youtube-nocookie.com/embed/C-DwGRBHvmE"
title="YouTube video player"
frameBorder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
allowFullScreen
style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} ></iframe>
</div>
<Typography variant="body1">
Create and sell your first basic layered accessory.
</Typography>
</Grid>
</Grid>
</Grid>

**Layered accessories**, often referred to as **layered clothing**, are 3D assets that stretch and fit on an avatar's body according to their rigging armature and cage meshes. When users purchase layered accessories on the Marketplace, such as jackets, dresses, and cardigans, they expect it to move with the character's animations and layer appropriately on top of existing clothing the character is wearing.

There are three main layers of a layered accessory that structure how the accessory looks and works on the platform:

- **Mesh & textures** that make up the layered accessory's visual appearance.
- **Rigging armature** that determines how the character moves and animates with the layered accessory.
- **Cage meshes & attachments** that determine how the layered accessory stretches, fits, and layers over the character's body.

While you can create most of these layers manually in third-party modeling tools like [Blender](https://www.blender.org/) or [Maya](https://www.autodesk.com/products/maya/overview), cage meshes and attachments have strict configuration requirements to meet Roblox's technical [layered accessory specifications](specifications.md) that guarantee your layered accessories behave consistently from game to game. Before you create your first custom layered accessory, it's recommended to:

1. Understand the [essential components](#layered-accessory-components) of a layered accessory and how they work together.
1. Review all [resources](#resources) that Roblox provides to standardize and expedite the [creation process](#creation-process), such as Blender and Maya project files, Studio tooling, and step-by-step guides.
1. Follow the [basic layered accessory creation tutorial](../../art/accessories/creating/index.md) that covers how to create your own avatar-ready sweater from scratch in Blender.

Once you have a custom layered accessory, you can import it into Studio and use the Avatar Setup tool to process your creation into an avatar asset that's ready to be sold on the [Marketplace](../../marketplace/index.md).

<Alert severity = 'info'>
Unlike layered accessories that stretch and wrap over a target until it fits over the character's body, rigid accessories don't deform and only attach to a specific point on the avatar. For more information, see [Rigid accessories](../rigid-accessories/index.md).
</Alert>

<Alert severity = 'warning'>
If you are a game developer and are looking for information on manually equipping or configuring layered accessories within a game, such as implementing layered accessories on a non-standard character model, see [Character appearance](../../characters/appearance.md).
</Alert>

## Layered accessory components

All layered accessories are made up of the same fundamental components that allow users to equip 3D items that stretch, fit, and layer over a target character and existing clothing items with consistent behavior **regardless** of the character's [body type](../character-bodies/specifications.md#body-scale).

### Mesh part

<GridContainer numColumns="2">

<figure><img src="../../assets/art/accessories/Mesh-Jumpsuit-Example.png"/>  <figcaption>Jumpsuit layered accessory mesh object.</figcaption></figure>

<figure><img src="../../assets/art/accessories/Mesh-ShoulderPads-Example.png" /><figcaption>Shoulder pads layered accessory mesh object.</figcaption></figure>
</GridContainer>

All layered accessories require a single mesh object that represents the accessory's geometry. In Studio, this mesh object is represented as a `Class.MeshPart` nested under a single `Class.Model`.

### Textures

<GridContainer numColumns="2">
  <figure><img src="../../assets/art/accessories/Texture-Jumpsuit-Example.png" />  <figcaption>2D texture map for the jumpsuit layered accessory.</figcaption></figure>

  <figure><img src="../../assets/art/accessories/Texture-ShoulderPads-Example.png" /><figcaption>2D texture map for the shoulder pads layered accessory.</figcaption></figure>
</GridContainer>

Textures are image files that define the surface appearance of your layered accessory. You can create textures within a texture painting program or 3D modeling software.

In Studio, you must import textures as image files and set them to `Class.MeshPart` objects by a child `Class.SurfaceAppearance` object or the mesh's `Class.MeshPart.TextureID|TextureID` property.

### Rigging armature

<GridContainer numColumns="2">
  <figure><img src="../../assets/art/accessories/Rigging-Example.png" />  <figcaption>To ensure the layered accessory can deform with the character's body, it must be weighted to a rigging armature.</figcaption></figure>

  <figure><img src="../../assets/art/accessories/Rigging-Pose-Example.png" /><figcaption>When the rigging armature is properly set up, the layered accessory moves and bends as the character moves in the 3D space.</figcaption></figure>
</GridContainer>

Inside of the avatar's physical body is a non-rendered rigging armature that allows the character to articulate its limbs. Often referred to as joints or bones, a rigging armature includes skinning data that allows connections between limbs to bend organically, such as the character's knees and elbows. In Studio, this rigging and skinning data is saved to the mesh geometry.

The rigging armature also defines how layered accessories move and deform as the character moves in the 3D space. Using rigging and skinning techniques, you can configure areas of your layered accessories to move naturally with the character's joints, such as a shirt sleeve following the natural movement of the character's elbow and shoulder during a walk cycle.

### Cage meshes

<GridContainer numColumns="2">
  <figure><img src="../../assets/art/accessories/Inner-Cage-Example.png" />  <figcaption>The inner cage defines the inner surface of the clothing item where the clothes wrap over.</figcaption></figure>

  <figure><img src="../../assets/art/accessories/Outer-Cage-Example.png" /><figcaption>The outer cage defines the outer surface of the clothing item where any additional clothes can wrap and layer over.</figcaption></figure>
</GridContainer>

Cage meshes set the inner and outer surfaces of a layered accessory. For example, the inner cage of a t-shirt defines how a layered accessory t-shirt stretches and fits over a character body, and the outer cage defines how other layered accessories can stretch and fit over the t-shirt itself.

In Studio, these cages are represented by `Class.WrapLayer` objects.

### Attachments

<GridContainer numColumns="2">
  <figure><img src="../../assets/art/accessories/Attachment-Jumpsuit-Example.png" />  <figcaption>The jumpsuit layered accessory's attachment point.</figcaption></figure>

  <figure><img src="../../assets/art/accessories/Attachment-ShoulderPads-Example.png" /><figcaption>The shoulder pads layered accessory's attachment point.</figcaption></figure>
</GridContainer>

Attachment points for layered accessories set which body part the accessory is attached to when the character body ragdolls or dismembers in a game. In Studio, attachment points are represented by `Class.Attachment` objects.

<Alert severity = 'info'>
You can automatically generate attachment points for your layered accessories using the [Accessory Fitting Tool](../../avatar/accessory-fitting-tool.md).
</Alert>

## Creation process

When designing a layered accessory in [Blender](https://www.blender.org/) or [Maya](https://www.autodesk.com/products/maya/overview), you must export all of the avatar components in a single `.fbx` or `.gltf` for import into Studio. Since 3D creation isn't a linear process and always requires reiteration and testing, the process of creating a layered accessory can differ between individuals and various creation workflows.

In general, the creation process follows the following workflow:

<figure><figcaption><center>Layered Accessory Workflow</center></figcaption><center><img src="../../assets/art/accessories/Workflow-Layered.png" width="50%"/></center></figure>

## Resources

There are a variety of resources available for creators of all backgrounds to get started with layered accessory creation. Review the following table for specific topics and resources:

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
    <td>[Create your first layered accessory](../../art/accessories/creating/index.md)</td>
  </tr>
  <tr>
    <td>Reference files</td>
    <td>[Accessory and clothing reference files](../../art/modeling/project-files.md)</td>
  </tr>
  <tr>
    <td>Technical specs</td>
    <td>[.FBX export settings](../../art/modeling/export-requirements.md)<br /><br />[General mesh specifications](../../art/modeling/specifications.md)<br /><br />[Accessory specifications](../../avatar/rigid-accessories/specifications.md)<br /><br />[Marketplace policy](../../marketplace/marketplace-policy.md)</td>
  </tr>
  <tr>
    <td>Cosmetic creation</td>
    <td>[Accessories overview](../rigid-accessories/index.md)<br /><br />[Layered clothing overview](../layered-accessories/index.md)<br /><br />[Create face accessories](../../art/characters/facial-animation/create-face-accessories.md)<br /><br />[Accessory Fitting Tool](../accessory-fitting-tool.md)<br /><br />[Accessory specifications](../rigid-accessories/specifications.md)<br /><br />[Marketplace requirements](../../marketplace/marketplace-policy.md)</td>
  </tr>
  <tr>
    <td>Texturing</td>
    <td>[Texturing requirements](../../art/modeling/texture-specifications.md)<br /><br />[PBR textures](../../art/modeling/surface-appearance.md)</td>
  </tr>
  <tr>
    <td>Rigging and skinning</td>
    <td>[Rigging and skinning overview](../../art/modeling/rigging.md)<br /><br />[Humanoid rigging requirements](../../avatar/character-bodies/specifications.md#rigging)<br /><br />[Rigging facial bones](../../art/characters/facial-animation/create-basic-heads.md#rigging)<br /><br />[Auto skin transfer](../../avatar/automatic-skinning-transfer.md)<br /><br />[Skin facial bones](../../art/characters/facial-animation/create-basic-heads.md#skin-face-bones)</td>
  </tr>
  <tr>
    <td>Testing and validation</td>
    <td>[Calisthenics tool](../../art/modeling/calisthenics-tool.md)<br /><br />[Clothing validation tool](../../art/accessories/validation-tool.md)</td>
  </tr>
  <tr>
    <td>Publishing and Marketplace</td>
    <td>[Upload to Marketplace](../../marketplace/publish-to-marketplace.md)<br /><br />[Marketplace policy](../../marketplace/marketplace-policy.md)<br /><br />[Fees and commissions](../../marketplace/marketplace-fees-and-commissions.md)</td>
  </tr>
</tbody>
</table>
