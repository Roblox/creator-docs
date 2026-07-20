---
title: Character bodies
description: All Roblox users are represented by an avatar character which can be customized with body parts, accessories, and clothes from the Marketplace or within games.
---

<iframe width="800" height="450" src="https://www.youtube-nocookie.com/embed/2My8jE47clI" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

<br /><br />
**Character bodies** for avatars are models with technical components that work together to create a character that can interact with objects in the 3D space and wear cosmetics, clothing, and accessories. There are four main layers of the avatar body that structure how the character looks and moves on the platform:

- **Body parts & textures** that make up the character's visual appearance.
- **Rigging armature** that determines how the character moves.
- **Facial animation data** in the character's head that expresses the character's personality and emotions.
- **Cage meshes & attachments** that determine how the character attaches accessories and wears clothing.

While you can create each of these layers manually in third-party modeling tools like [Blender](https://www.blender.org/) or [Maya](https://www.autodesk.com/products/maya/overview), some have strict configuration requirements to meet Roblox's technical [character specifications](specifications.md) that guarantee your avatar behaves consistently from game to game. Before you create your first custom character body, it's recommended to:

1. Understand the [essential components](#character-body-components) of an avatar's character body and how they work together on the platform.
1. Review all [resources](#resources) that Roblox provides to standardize and expedite the [creation process](#creation-process), such as Blender and Maya project files, Studio tooling, and step-by-step guides.
1. Follow the [basic character creation tutorial](../../art/characters/creating/index.md) that uses Roblox templates in collaboration with common Blender modeling and texturing tools.

Once you have a character body model, you can import it into Studio and use the Avatar Setup tool to process your creation into an avatar asset that's ready to be sold on the [Marketplace](../../marketplace/index.md).

## Character body components

All character bodies for avatars are made up of several fundamental components that provide users the functionality and flexibility to interact with their world. Many of these components are never made visible to the user, but they enable powerful avatar features that enhance social and environmental interactions. When creating avatar characters, all of these components are typically created first in your modeling software and then converted to their appropriate Roblox Studio instance on import.

Each avatar character is made up of the following rendered and non-rendered components:

<Tabs>
  <TabItem label="Rendered">
<GridContainer numColumns="2">
  <figure><img src="../../assets/art/avatar/Component-Body-Parts.png" />  <figcaption>15 separate body part meshes make up the shape and contours of the character.</figcaption></figure>

  <figure><img src="../../assets/art/avatar/Component-Texture-Map.png" /><figcaption>Texture image maps apply a surface color and appearance to the character's skin.</figcaption></figure>
  
</GridContainer>
  </TabItem>
  <TabItem label="Non-Rendered">
<GridContainer numColumns="2">
  <figure><img src="../../assets/art/avatar/Component-Rigging.png" />  <figcaption>A rigging armature allows the body parts to properly connect with each other, driving movement, expressions, and animations.</figcaption></figure>

  <figure><img src="../../assets/art/avatar/Component-Facial-Animation-Data.png" /> <figcaption>Facial animation data allows avatars to express virtually all types of facial expressions for chatting and socializing.</figcaption></figure>
</GridContainer>
<GridContainer numColumns="2">
  <figure><img src="../../assets/art/avatar/Component-Cage-Mesh.png" />  <figcaption>Cage meshes define the surface where layered accessories can wrap and stretch over.</figcaption></figure>

  <figure><img src="../../assets/art/avatar/Component-Attachments.png" />  <figcaption>Attachment points define where rigid accessories attach to a character.</figcaption></figure>

</GridContainer>
  </TabItem>
</Tabs>

### Body parts

<GridContainer numColumns="2">
  <figure><img src="../../assets/art/avatar/Body-Parts-Visual.png" />  <figcaption>Each avatar character is made up of 15 separate mesh objects</figcaption></figure>

  <figure><img src="../../assets/art/avatar/Body-Parts-Data-Model.png" width="100%"/><figcaption>These meshes must follow a standard naming convention</figcaption></figure>
</GridContainer>

An avatar's physical body geometry is made up of 15 separate mesh body parts that define the shape and contours of the character:

- Head
- Upper and lower torso
- Left upper arm, lower arm, and hand
- Right upper arm, lower arm, and hand
- Left upper leg, lower leg, and foot
- Right upper leg, lower leg, and foot

In Studio, these geometries are represented as `Class.MeshPart` objects and are nested under a single `Class.Model`.

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
  <figure><img src="../../assets/art/avatar/Rigging-Visual.png" />  <figcaption>The rigging armature includes at least 16 bones, 1 for each body part and a root bone. Higher-fidelity rigs can include up to 37 additional bones.</figcaption></figure>

  <figure><img src="../../assets/avatar/specifications/High-Fidelity-LeftHand.png" /><figcaption>Bones must follow a specific hierarchy and naming convention</figcaption></figure>  
</GridContainer>

Inside of the avatar's physical body is a non-rendered rigging armature that allows the character to articulate its limbs. Often referred to as joints or bones, a rigging armature includes skinning data that allows connections between limbs to bend organically, such as the character's knees and elbows.

[Standard character rigs](./specifications.md#standard-rigs), often referred to as **R15** rigs, require 15 poseable joints to articulate the character's 15 body parts. However, if you want to create [higher-fidelity](./specifications.md#higher-fidelity-rigs) rigs with a greater level of realism, there are up to 37 additional optional joints you can create for articulated hands, shoulders, and spine movements.

In Studio, each joint of the rigging armature is represented by `Class.Bone` objects that connect the character's body part `Class.MeshPart` objects together. `Class.Bone` objects must follow a specific hierarchy and naming convention for the avatar to function properly in Studio and on the Marketplace. For more information, see [Rigging](./specifications.md#rigging).

### Face animation data

<GridContainer numColumns="2">
  <figure><img src="../../assets/art/avatar/Facial-Rig-Visual.png" />  <figcaption>Each avatar character face is rigged and skinned to create various expressions</figcaption></figure>
  
 <figure><img src="../../assets/art/avatar/Facial-Properties.png" /><figcaption>Each pose is mapped to a pose name within the Custom Properties (Extra Attributes in Maya) of the Head_Geo object</figcaption></figure>
</GridContainer>

<figure><img src="../../assets/art/avatar/Facial-Animation-Timeline.png" /><figcaption>Each required face pose is saved as a keyframe in the animation timeline.</figcaption></figure>
Facial animation data from either the character's rigging armature or facial joints allow avatars to express emotions with their eyes, mouth, and teeth. Each character includes facial joints, skinning data, animation timeline data, and mapped pose data that allows it. In Studio, these facial animation elements are represented by a `Class.FaceControls` instance.

### Cage meshes

<GridContainer numColumns="2">
  <figure><img src="../../assets/art/avatar/Cage-Mesh-Visual.png" />  <figcaption>Head and Upper Torso cage mesh objects (wireframe)</figcaption></figure>

  <figure><img src="../../assets/art/avatar/Cage-Mesh-Data-Model.png" width="100%"/><figcaption>Cage objects must exist for each of the 15 body parts</figcaption></figure>
</GridContainer>

Cage meshes set the invisible outer boundary for layered accessories to stretch and fit over body parts, allowing clothes to fit over models of different shapes and sizes without you having to remodel the clothing item each time. In Studio, outer cage mesh objects are represented by a `Class.WrapTarget` instance.

If you are caging your own non-template character model, it's important to use one of Roblox's body cage [project files](../../avatar/resources.md#mannequin-models) to ensure you are using a Roblox standard cage mesh. Removing or adding vertices from this standard mesh can cause issues with clothing fit and import.

### Attachments

<GridContainer numColumns="2">
  <figure><img src="../../assets/art/avatar/Attachments-Visual.png" />  <figcaption>Each character has common attachment points for equipping rigid cosmetics</figcaption></figure>

  <figure><img src="../../assets/art/avatar/Attachments-Data-Model.png" width="100%"/><figcaption>Each avatar character must include their associated 19 attachment points</figcaption></figure>
</GridContainer>

Attachment points set the specific points where rigid accessories and in-game equipable objects attach to the character's body. These are not rendered on the platform, but they are represented visually as spheres in 3D modeling software when you use Roblox's **R15 Rig and Attachments** [project file](../../avatar/resources.md#project-files).

When you import a rig with these visual representations, the spheres are created as `Class.Attachment` instances using the standardized names.

<Alert severity = 'info'>
When users wear layered clothing, the clothing isn't attached directly to the attachment, but it does reference the associated attachment point during ragdoll and dismemberment animations.
</Alert>

## Creation process

When designing an avatar model, you must export all of the avatar components in a single `.fbx` or `.gltf` for import into Studio. Since 3D creation isn't a linear process and always requires reiteration and testing, the process of creating an avatar character model can differ between individuals and various creation workflows.

In general, the creation process follows these typical workflows:

<GridContainer numColumns="2">
  <figure><center>**Basic Creation with Templates**</center><br />Customize a [character body template ](../../art/characters/creating/index.md) that already includes all the necessary components.<img src="../../assets/art/avatar/Workflow-Bodies-Templates.png"/></figure>

  <figure><center>**Advanced Creation from Scratch**</center><br />Create characters from scratch, allowing full customization of the avatar character's components.<img src="../../assets/art/avatar/Workflow-Bodies-Traditional.png"/></figure>
</GridContainer>

<Alert severity = 'warning'>
Ensure that all assets you create follow Roblox's [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards) and any applicable [Marketplace policies](../../marketplace/marketplace-policy.md).
</Alert>

## Resources

There are a variety of resources available for creators of all backgrounds to get started with character creation. Review the following table for specific topics and resources:

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
    <td>[Basic character creation tutorial](../../art/characters/creating/index.md)</td>
  </tr>
  <tr>
    <td>Reference files</td>
    <td>[Avatar references and project files](./project-files.md)<br /><br />[Example mesh/model objects](../../art/modeling/project-files.md)</td>
  </tr>
  <tr>
    <td>Technical specs</td>
    <td>[.FBX export settings](./export.md)<br /><br />[Avatar specifications](./specifications.md)<br /><br />[General mesh specifications](../../art/modeling/specifications.md)<br /><br />[Accessory specifications](../rigid-accessories/specifications.md)<br /><br />[Marketplace policy](../../marketplace/marketplace-policy.md)</td>
  </tr>
  <tr>
    <td>Cosmetic creation</td>
    <td>[Accessories overview](../rigid-accessories/index.md)<br /><br />[Creating face accessories](../../art/characters/facial-animation/create-face-accessories.md)<br /><br />[Accessory Fitting Tool](../accessory-fitting-tool.md)<br /><br />[Accessory specifications](../rigid-accessories/specifications.md)<br /><br />[Marketplace requirements](../../marketplace/marketplace-policy.md)</td>
  </tr>
  <tr>
    <td>Texturing</td>
    <td>[Texturing requirements](../../art/modeling/texture-specifications.md)<br /><br />[PBR textures](../../art/modeling/surface-appearance.md)</td>
  </tr>
  <tr>
    <td>Rigging and skinning</td>
    <td>[Rigging and skinning overview](../../art/modeling/rigging.md)<br /><br />[Humanoid rig requirements](./specifications.md#rig)<br /><br />[Rigging facial bones](../../art/characters/facial-animation/create-basic-heads.md#rigging)<br /><br />[Automatic Skinning Transfer](../automatic-skinning-transfer.md)<br /><br />[Skinning facial bones](../../art/characters/facial-animation/create-basic-heads.md#skin-face-bones)</td>
  </tr>

  <tr>
    <td>Facial animation and live heads</td>
    <td>[Basic head creation](../../art/characters/facial-animation/create-basic-heads.md)<br /><br />[Face accessory creation](../../art/characters/facial-animation/create-face-accessories.md)<br /><br />[FACS pose references](../dynamic-heads/facs-poses-reference.md)</td>
  </tr>
  <tr>
    <td>Testing and validation</td>
    <td>[Calisthenics Tool](../../art/modeling/calisthenics-tool.md)<br /><br />[Clothing Validation Tool](../../art/accessories/validation-tool.md)</td>
  </tr>
  <tr>
    <td>Publishing and Marketplace</td>
    <td>[Uploading to Marketplace](../../marketplace/publish-to-marketplace.md)<br /><br />[Marketplace policy](../../marketplace/marketplace-policy.md)<br /><br />[Fees and commissions](../../marketplace/marketplace-fees-and-commissions.md)</td>
  </tr>
</tbody>
</table>
