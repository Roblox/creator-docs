---
title: Dynamic heads
description: Facial animations enable avatars to create dynamic facial expressions.
---

<center><video controls width="90%" src="../../assets/avatar/dynamic-heads/Blocky_And_Goblin_Dynamic_Heads.mp4">
</video></center>

**Dynamic heads** are rigged avatar character heads that support facial animations and custom expressions. When users purchase dynamic heads on the [Marketplace](https://www.roblox.com/catalog), they can trigger emotes that combine both facial and body animations.

There are four main layers of a dynamic head that structure how the head looks and works on the platform:

- **Mesh & textures** that make up the head's visual appearance.
- **Facial animation data** that determine how the character's face moves and expresses the character's personality and emotions.
- **Cage meshes** that determine how the character's head equips facial accessories that deform with facial expressions, such as facial hair that moves accordingly when the character changes facial expressions.
- **Attachments** that determine how the character's head attaches accessories like hair and hats.

While you can create each of these layers manually in third-party modeling tools like [Blender](https://www.blender.org/) or [Maya](https://www.autodesk.com/products/maya/overview), some have strict configuration requirements to meet Roblox's technical [dynamic head specifications](specifications.md) that guarantee your dynamic head animates consistently from game to game. Before you create your first custom dynamic head, it's recommended to:

1. Understand the [essential components](#dynamic-head-components) of a dynamic head and how they work together.
1. Review all [resources](#resources) that Roblox provides to standardize and expedite the [creation process](#creation-process), such as Blender and Maya project files, Studio tooling, and step-by-step guides.
1. Follow the [basic dynamic head creation tutorial](../../art/characters/facial-animation/create-basic-heads.md) that covers how to add facial joints, apply skinning data, pose joints into expressions, and map poses on a head model in Blender.

Once you have a custom dynamic head, you can import it with a character body into Studio and use the Avatar Setup tool to process your creation into an avatar asset that's ready to be sold on the [Marketplace](../../marketplace/index.md).

## Dynamic head components

All dynamic heads are made up of the same fundamental components that allow users to equip facial accessories that stretch, fit, and layer over a target character's head with consistent behavior.

### Mesh part

<GridContainer numColumns="2">
  <figure><img src="../../assets/art/avatar/Character-Head-Geo.png" />  <figcaption>Masculine dynamic head mesh object.</figcaption></figure>
  <figure><img src="../../assets/art/avatar/Character-Head-Geo-2.png" />  <figcaption>Feminine dynamic head mesh object.</figcaption></figure>
</GridContainer>

All dynamic heads require a single mesh object that represents the head's geometry. In Studio, this mesh object is represented as a `Class.MeshPart` object nested under a single `Class.Model`.

### Textures

<GridContainer numColumns="2">
  <figure><img src="../../assets/art/avatar/Textures-Brown.png" />  <figcaption>Textures apply color and surface details to your character model.</figcaption></figure>

  <figure><img src="../../assets/art/avatar/Textures-Blue.png" /><figcaption>A texture image map's opacity can combine with the `Class.MeshPart.Color` to apply custom skin tones to characters.</figcaption></figure>
</GridContainer>

Textures are image files that define the surface appearance of your character's head. You can create textures using a texture painting program or 3D modeling software. In Studio, you must import textures as image files and set them to `Class.MeshPart` objects by a child `Class.SurfaceAppearance` object or the mesh's `Class.MeshPart.TextureID|TextureID` property.

### Face animation data

<GridContainer numColumns="2">
  <figure><img src="../../assets/art/avatar/Facial-Rig-Visual.png" />  <figcaption>Each avatar character face is rigged and skinned to create various expressions</figcaption></figure>
 <figure><img src="../../assets/art/avatar/Facial-Properties.png" /><figcaption>Each pose is mapped to a pose name within the Custom Properties (Extra Attributes in Maya) of the Head_Geo object</figcaption></figure>
</GridContainer>

<figure><img src="../../assets/art/avatar/Facial-Animation-Timeline.png" /><figcaption>Each required face pose is saved as a keyframe in the animation timeline.</figcaption></figure>

Facial animation data from the character's facial joints allow avatars to express emotions with their eyes, mouth, and teeth. Each character includes facial joints, skinning data, animation timeline data, and mapped pose data that allows these expressions. In Studio, these facial animation elements are represented by a `Class.FaceControls` instance.

### Cage meshes

<GridContainer numColumns="2">
  <figure><img src="../../assets/art/avatar/Cage-Mesh-Visual-DH.png" />  <figcaption>Head geometry and cage mesh objects (wireframe)</figcaption></figure>

  <figure><img src="../../assets/art/avatar/Cage-Mesh-Data-Model-2.png" width="100%"/><figcaption>Cage objects must exist for each of the 15 body parts, including the dynamic head</figcaption></figure>
</GridContainer>

Cage meshes set the invisible outer boundary for facial accessories to stretch and fit over the character's head, allowing facial accessories to deform as the head animates and emotes. In Studio, outer cage mesh objects are represented by a `Class.WrapTarget` instance.

If you are caging your own non-template character model, it's important to use one of Roblox's body cage [project files](../../avatar/resources.md#mannequin-models) to ensure you are using a Roblox standard cage mesh. Removing or adding vertices from this standard mesh can cause issues with how facial accessories deform and import.

### Attachments

<GridContainer numColumns="2">
  <figure><img src="../../assets/art/avatar/DH-Attachments-Visual.png" />  <figcaption>Each character has common attachment points for equipping rigid cosmetics</figcaption></figure>
  <figure><img src="../../assets/art/avatar/Attachments-Data-Model-2.png" width="100%"/><figcaption>Each avatar character must include their associated 19 attachment points, including those on the dynamic head</figcaption></figure>
</GridContainer>

Attachment points set the specific points where rigid accessories and in-game equippable objects attach to the character's head. These are not rendered on the platform, but they are represented visually as spheres in 3D modeling software when you use Roblox's **R15 Rig and Attachments** [project file](../../avatar/resources.md#project-files).

When you import a rig with these visual representations, the spheres are created as `Class.Attachment` objects using standardized names.

<Alert severity = 'info'>
When users wear a layered accessory, the layered accessory isn't attached directly to the attachment, but it does reference the associated attachment point during ragdoll and dismemberment animations.
</Alert>

## Creation process

When designing a dynamic head in [Blender](https://www.blender.org/) or [Maya](https://www.autodesk.com/products/maya/overview), you must export all of the avatar components in a single `.fbx` or `.gltf` for import into Studio. Since 3D creation isn't a linear process and always requires reiteration and testing, the process of creating a dynamic head can differ between individuals and various creation workflows. Some choose to modify a rigged character model to meet Roblox's [dynamic head specifications](./specifications.md), while others prefer to create one from scratch.

In general, the creation process follows the following workflow:

<figure><figcaption><center>Dynamic Head Workflow</center></figcaption><center><img src="../../assets/art/accessories/Workflow-DH.png" width="50%"/></center></figure>

<Alert severity = 'warning'>
Ensure that all assets you create follow Roblox's [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards) and any applicable [Marketplace policies](../../marketplace/marketplace-policy.md).
</Alert>

## Resources

There are a variety of resources available for creators of all backgrounds to get started with dynamic head creation. Review the following table for specific topics and resources:

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
    <td>[Basic dynamic head creation tutorial](../../art/characters/facial-animation/create-basic-heads.md)<br /><br />[Basic facial accessory creation tutorial](../../art/characters/facial-animation/create-face-accessories.md)</td>
  </tr>
  <tr>
    <td>Reference files</td>
    <td>[Avatar references and project files](../character-bodies/project-files.md)<br /><br />[Example mesh/model objects](../../art/modeling/project-files.md)<br /><br />[Dynamic head caging best practices](../dynamic-heads/caging-best-practices.md)<br /><br />[FACS pose references](../dynamic-heads/facs-poses-reference.md)</td>
  </tr>
  <tr>
    <td>Technical specs</td>
    <td>[Dynamic head specifications](./specifications.md)<br /><br />[General mesh specifications](../../art/modeling/specifications.md)<br /><br />[Marketplace policy](../../marketplace/marketplace-policy.md)</td>
  </tr>
  <tr>
    <td>Cosmetic creation</td>
    <td>[Accessories overview](../rigid-accessories/index.md)<br /><br />[Creating face accessories](../../art/characters/facial-animation/create-face-accessories.md)<br /><br />[Accessory Fitting Tool](../accessory-fitting-tool.md)<br /><br />[Accessory specifications](../rigid-accessories/specifications.md)<br /><br />[Marketplace requirements](../../marketplace/marketplace-policy.md)</td>
  </tr>
  <tr>
    <td>Texturing</td>
    <td>[PBR textures](../../art/modeling/surface-appearance.md)</td>
  </tr>
  <tr>
    <td>Rigging and skinning</td>
    <td>[Rigging and skinning overview](../../art/modeling/rigging.md)<br /><br />[Humanoid rig requirements](../character-bodies/specifications.md#rigging)<br /><br />[Rigging facial bones](../../art/characters/facial-animation/create-basic-heads.md#rig-and-skin-the-head)<br /><br />[Skinning facial bones](../../art/characters/facial-animation/create-basic-heads.md#skin-joints)<br /><br />[Automatic Skinning Transfer](../automatic-skinning-transfer.md)</td>
  </tr>
  <tr>
    <td>Animation</td>
    <td>[Animate dynamic heads](../../art/characters/facial-animation/animate-heads.md)</td>
  </tr>
  <tr>
    <td>Testing and validation</td>
    <td>[Test dynamic heads](./test.md)<br /><br />[Validation process](./validate.md)</td>
  </tr>
  <tr>
    <td>Publishing and Marketplace</td>
    <td>[Uploading to Marketplace](../../marketplace/publish-to-marketplace.md)<br /><br />[Marketplace policy](../../marketplace/marketplace-policy.md)<br /><br />[Fees and commissions](../../marketplace/marketplace-fees-and-commissions.md)</td>
  </tr>
</tbody>
</table>
