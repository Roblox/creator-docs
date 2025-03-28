---
title: Avatar characters
description: All Roblox users are represented by an avatar character which can be customized with body parts, accessories, and clothes from the Marketplace or within experiences.
hideBreadcrumbs: true
---

<iframe width="800" height="450" src="https://www.youtube-nocookie.com/embed/2My8jE47clI" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br /><br />

Every Roblox user is represented by a customizable character called an **avatar**. Avatars are character models with many specialized features that allow users to interact with the world and customize themselves with a wide range of clothing and accessories from the Marketplace.

Custom avatars are first created in 3D modeling programs, such as [Blender](https://www.blender.org/) or [Maya](https://www.autodesk.com/products/maya/overview), before importing into Studio. To create a custom Roblox avatar character for your own experience, it's important to start with the following:

- An advanced background with 3D modeling tools such as [Blender](https://www.blender.org/) or [Maya](https://www.autodesk.com/products/maya/overview).
- An understanding of the [components that make up an avatar character](#components-of-an-avatar).
- An understanding of the general [character creation process](#creation-process).
- Review the [basic character creation tutorial](../characters/creating/index.md) to get started on creating your first avatar character using Roblox's templates.
- [Various tools, resources, and guides](#resources) provided by Roblox to standardize and expedite the creation process.

## Components of an avatar

All avatar character models are made up of several fundamental components that provide users the functionality and flexibility to interact with their world. Many of these components are never made visible to the user, but they enable powerful avatar features that enhance social and environmental interactions. When creating avatar characters, all of these components are typically created first in your modeling software and then converted to their appropriate Roblox Studio instance on import.

Each avatar character is made up of the following rendered and non-rendered components:

<Tabs>
  <TabItem label="Rendered">
<GridContainer numColumns="2">
  <figure><img src="../../assets/art/avatar/Component-Body-Parts.png" />  <figcaption>15 body part meshes make up the physical aspects of the character model</figcaption></figure>

  <figure><img src="../../assets/art/avatar/Component-Texture-Map.png" /><figcaption>Texture image maps apply a surface color and appearance. Transparency allows underlying part colors to be exposed, such as custom skin tones.</figcaption></figure>
  
</GridContainer>
  </TabItem>
  <TabItem label="Non-Rendered">
<GridContainer numColumns="2">
  <figure><img src="../../assets/art/avatar/Component-Rigging.png" />  <figcaption>A rigging armature allows the body parts to properly connect with each other, driving movement, expressions, and animations</figcaption></figure>

  <figure><img src="../../assets/art/avatar/Component-Facial-Animation-Data.png" /> <figcaption>Facial animation data allows avatars to express virtually all types of facial expressions for chatting and socializing</figcaption></figure>
</GridContainer>
<GridContainer numColumns="2">
  <figure><img src="../../assets/art/avatar/Component-Cage-Mesh.png" />  <figcaption>Cage meshes set the outer boundary of the character, defining the surface where clothing and other layerable items can wrap and stretch over.</figcaption></figure>

  <figure><img src="../../assets/art/avatar/Component-Attachments.png" />  <figcaption>Attachment points define where rigid accessories attach to a character</figcaption></figure>

</GridContainer>
  </TabItem>
</Tabs>

### Body parts

<GridContainer numColumns="2">
  <figure><img src="../../assets/art/avatar/Body-Parts-Visual.png" />  <figcaption>Each avatar character is made up of 15 separate mesh objects</figcaption></figure>

  <figure><img src="../../assets/art/avatar/Body-Parts-Data-Model.png" width="80%"/><figcaption>These meshes must follow a standard naming convention</figcaption></figure>
</GridContainer>

Roblox avatar characters are made up of 15 body parts, pieces of geometry that define the shape and contours of your avatar character. In Studio, these geometries are represented as `Class.MeshPart` objects and are nested under a single `Class.Model`.

### Textures

<GridContainer numColumns="2">
  <figure><img src="../../assets/art/avatar/Textures-Brown.png" />  <figcaption>Textures apply color and surface details to your character model.</figcaption></figure>

  <figure><img src="../../assets/art/avatar/Textures-Blue.png" /><figcaption>A texture image map's opacity can combine with the `Class.MeshPart.Color` to apply custom skin tones to characters.</figcaption></figure>
</GridContainer>

Textures are image files that define the surface appearance of your character. You can create textures using a texture painting program or a 3D modeling software. In Studio, you must import textures as image files and access them through the `Class.SurfaceAppearance` instance, or set as a `Class.MeshPart.TextureID` property.

<Alert severity = 'warning'>
When texturing parts of your character model's body, ensure that your character model includes a modesty layer over sensitive regions. See [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410#safety) for more information on Roblox's policies.
</Alert>

### Rigging armature

<GridContainer numColumns="2">
  <figure><img src="../../assets/art/avatar/Rigging-Visual.png" />  <figcaption>The armature is made up of 16 bones, 1 for each body part geometry and a root bone</figcaption></figure>

  <figure><img src="../../assets/art/avatar/Rigging-Data-Model.png" /><figcaption>Bones must follow a specific hierarchy and naming convention</figcaption></figure>  
</GridContainer>

An armature allows each character to articulate its limbs and move naturally through the environment. Often referred to as bones or joints, this rigging character information includes skinning data which allows connected limbs, like the knees or elbows to bend organically. In Studio, each bone of the character armature is represented by `Class.Bone` objects that connect the character `Class.MeshPart` objects together.

### Face animation data

<GridContainer numColumns="2">
  <figure><img src="../../assets/art/avatar/Facial-Rig-Visual.png" />  <figcaption>Each avatar character face is rigged and skinned to create various expressions</figcaption></figure>
  
 <figure><img src="../../assets/art/avatar/Facial-Properties.png" /><figcaption>Each pose is mapped to a pose name within the Custom Properties (Extra Attributes in Maya) of the Head_Geo object</figcaption></figure>
</GridContainer>

<figure><img src="../../assets/art/avatar/Facial-Animation-Timeline.png" /><figcaption>Each required face pose is saved as a keyframe in the animation timeline.</figcaption></figure>
Facial animation data allow each character to use global facial expressions. Each character includes facial bones and skinning, animation timeline data, and mapped pose data that allows it. In Studio, these facial animation elements are represented by a `Class.FaceControls` instance.

### Cage meshes

<GridContainer numColumns="2">
  <figure><img src="../../assets/art/avatar/Cage-Mesh-Visual.png" />  <figcaption>Head and Upper Torso cage mesh objects (wireframe)</figcaption></figure>

  <figure><img src="../../assets/art/avatar/Cage-Mesh-Data-Model.png" width="80%"/><figcaption>Cage objects must exist for each of the 15 body parts</figcaption></figure>
</GridContainer>

This outer cage sets the invisible surface on which layerable accessories, such as clothing, will stretch and fit over the body. These cage meshes allow clothes to fit over models of different shapes and sizes without having to remodel the clothing item. In Studio, outer cage mesh objects are represented by a `Class.WrapTarget` instance.

If you are caging your own non-template character model, it's important to use one of Roblox's body cage [project files](../../avatar/resources.md#mannequin-models) to ensure you are using a Roblox standard cage mesh. Removing or adding vertices from this standard mesh can cause issues with clothing fit and import.

### Attachments

<GridContainer numColumns="2">
  <figure><img src="../../assets/art/avatar/Attachments-Visual.png" />  <figcaption>Each character has common attachment points for equipping rigid cosmetics</figcaption></figure>

  <figure><img src="../../assets/art/avatar/Attachments-Data-Model.png" width="70%"/><figcaption>Each avatar character must include their associated 19 attachment points</figcaption></figure>
</GridContainer>

Attachment points define where rigid 3D accessories and equipables attach to the character's body. These are not rendered to the end-user but are represented as sphere geometries in 3D modeling software and, when imported into Studio, these geometries are created as `Class.Attachment` instances using the standardized names.

When wearing layered clothing, the clothing isn't attached directly to the attachment, but it does reference the associated attachment point during ragdoll and dismemberment animations.

## Creation process

When designing an avatar model, you must export all of the avatar components in a single `.fbx` or `.gltf` for import into Studio. Since 3D creation isn't a linear process and always requires reiteration and testing, the process of creating an avatar character model can differ between individuals and various creation workflows.

In general, the creation process follows these typical workflows:

<GridContainer numColumns="2">
  <figure><figcaption><center>Basic Creation with Templates</center></figcaption><img src="../../assets/art/avatar/Workflow-Bodies-Templates.png"/><figcaption>Customize a Roblox template character that already includes all the necessary components.  See [Create with templates](../characters/creating/index.md) for guides and instructions.</figcaption></figure>

  <figure><figcaption><center>Advanced Creation from Scratch</center></figcaption><img src="../../assets/art/avatar/Workflow-Bodies-Traditional.png"/><figcaption>Create characters from scratch, allowing full customization of the avatar character's components.</figcaption></figure>
</GridContainer>

<Alert severity = 'warning'>
Ensure that all assets you create follow any applicable [Marketplace policies](../../marketplace/marketplace-policy.md) and [Roblox Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards).
</Alert>

## Resources

There are a variety of resources available for creators of all backgrounds to get started with character creation.

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
    <td>[Basic character creation tutorial](../accessories/creating/index.md)</td>
  </tr>
  <tr>
    <td>Reference files</td>
    <td>[Avatar references and project files](../characters/project-files.md)<br /><br />[Example mesh/model objects](../modeling/project-files.md)</td>
  </tr>
  <tr>
    <td>Technical specs</td>
    <td>[.FBX export settings](../characters/export-settings.md)<br /><br />[Avatar specifications](../characters/specifications.md)<br /><br />[General mesh specifications](../modeling/specifications.md)<br /><br />[Accessory specifications](../accessories/specifications.md)<br /><br />[Marketplace policy](../../marketplace/marketplace-policy.md)</td>
  </tr>
  <tr>
    <td>Cosmetic creation</td>
    <td>[Accessories overview](../accessories/index.md)<br /><br />[Creating face accessories](../characters/facial-animation/create-face-accessories.md)<br /><br />[Accessory Fitting Tool](../accessories/accessory-fitting-tool.md)<br /><br />[Accessory specifications](../accessories/specifications.md)<br /><br />[Marketplace requirements](../../marketplace/marketplace-policy.md)</td>
  </tr>
  <tr>
    <td>Texturing</td>
    <td>[Texturing requirements](../modeling/texture-specifications.md)<br /><br />[PBR textures](../modeling/surface-appearance.md)</td>
  </tr>
  <tr>
    <td>Rigging and skinning</td>
    <td>[Rigging and skinning overview](../modeling/rigging.md)<br /><br />[Humanoid rig requirements](../characters/specifications.md#rig)<br /><br />[Rigging facial bones](../characters/facial-animation/create-basic-heads.md#rig)<br /><br />[Automatic Skinning Transfer](../accessories/automatic-skinning-transfer.md)<br /><br />[Skinning facial bones](../characters/facial-animation/create-basic-heads.md#skin-face-bones)</td>
  </tr>

  <tr>
    <td>Facial animation and live heads</td>
    <td>[Basic head creation](../characters/facial-animation/create-basic-heads.md)<br /><br />[Face accessory creation](../characters/facial-animation/create-face-accessories.md)<br /><br />[FACS pose references](../characters/facial-animation/facs-poses-reference.md)</td>
  </tr>
  <tr>
    <td>Testing and validation</td>
    <td>[Calisthenics Tool](../modeling/calisthenics-tool.md)<br /><br />[Clothing Validation Tool](../accessories/validation-tool.md)</td>
  </tr>
  <tr>
    <td>Publishing and Marketplace</td>
    <td>[Uploading to Marketplace](../../marketplace/publish-to-marketplace.md)<br /><br />[Marketplace policy](../../marketplace/marketplace-policy.md)<br /><br />[Fees and commissions](../../marketplace/marketplace-fees-and-commissions.md)</td>
  </tr>
</tbody>
</table>
