---
title: Skinned Meshes
description: Skinning is the process of adding weights to a model to create natural looking joints and deformation.
---

A **skinned mesh** is a [rigged](./rigging.md) mesh that bends naturally when the bones are posed or rotated. This creates a natural looking stretch and flexibility when models are animated or repositioned. You can skin a rigged model by applying multiple bone influences to a single part of a mesh in a third-party 3D modeling tool such as [Blender](https://www.blender.org) or [Maya](https://www.autodesk.com/products/maya/overview).

<GridContainer numColumns="2">
  <figure>
    <video controls src="../../assets/modeling/skinned-meshes/Head-Rigid-Example.mp4"></video>
    <figcaption>A rigid model uses 15 rigid meshes that are completely influenced by the rotation of a single bone.</figcaption>
  </figure>
  <figure>
    <video controls src="../../assets/modeling/skinned-meshes/Head-Skinned-Example.mp4"></video>
    <figcaption>A skinned model uses 15 skinned meshes that bend naturally since the meshes are influenced by two or more bones.</figcaption>
  </figure>
</GridContainer>

See [Types of Skinned Meshes](#types-of-skinned-meshes) for common types of skinned meshes, their naming conventions, and links to various resources on creating skinned meshes in Blender.

Once a mesh is skinned, you can [export](../../art/modeling/export-requirements.md) the rigged mesh for use in Studio.

## Types of Skinned Meshes

A skinned mesh can be created from any mesh, including humanoid characters, [accessories](../../art/accessories/index.md), entire buildings, or even a body of water.

<Alert severity ='info'>
You can skip the process of skinning a layered accessory by using [automatic skinning transfer](../../art/accessories/automatic-skinning-transfer.md) to transfer or derive skinning data from a character model.
</Alert>

Skinned models use a naming convention starting with "S" and ending with the number of individual meshes that make up the model. This is used to quickly identify the type and number of meshes that a model has. Although S1 and S15 models are common, a model can be of varying sizes and can have any number of individual meshes, such as a S5, S20, or S200.

- **S1** refers to a single mesh that is skinned, or associated with an internal rig. Many organic models, such as a tree or fabric accessory items, are good candidates to be made into an S1 model. You can even design humanoid characters, such as NPCs, as S1 models but they will not be able to take full advantage of the animation and humanoid options available for S15 characters.

  For instructions on turning a basic mesh into an S1 model in Blender, see [Skinning a Simple Mesh](../../art/modeling/skinning-a-simple-mesh.md).

- **S15 models** typically refer to R15 humanoid models that have been skinned. Like an R15 character, an S15 model is made up of 15 meshes that are parented to a single rig. A R15 character model does not have weighted influences specified on its joints and, when the joints are rotated or animated, the meshes will not stretch or deform.

  For instructions on skinning a rigged humanoid model, see [Skinning a Humanoid Model](../../art/modeling/skinning-a-humanoid-model.md).

## Skinned Mesh References

The following reference `.fbx` files are available for download as examples and are ready to import into Studio:

<table>
<thead>
  <tr>
    <th>Filename</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><a href="../../assets/modeling/skinned-meshes/MapleLeafTree.fbx" download>MapleLeafTree</a></td>
    <td>S1</td>
    <td>A single mesh tree model created from the <a href="../../art/modeling/skinning-a-simple-mesh.md">Skinning a Simple Mesh</a> guide.</td>
  </tr>
  <tr>
    <td><a href="../../assets/modeling/skinned-meshes/MapleLeafTree_S3.zip" download>MapleLeafTree_S3</a></td>
    <td>S3</td>
    <td>An advanced version of the tree model with the soil, branches, and leaves as separate meshes bound to a single armature. This is packaged as a <b>.zip</b> to include UV textures that can be applied with `Class.SurfaceAppearance`.</td>
  </tr>
  <tr>
    <td><a href="../../assets/modeling/skinned-meshes/CreatureModel.fbx" download>Creature</a></td>
    <td>S11</td>
    <td>Creature model from the <a href="https://www.roblox.com/games/7208091524/Beyond-the-Dark-Vistech-Showcase">Beyond The Dark</a> showcase. This model is made up of 11 meshes and over 50 bones.</td>
  </tr>
  <tr>
    <td><a href="../../assets/modeling/skinned-meshes/Lola.fbx" download>Lola</a></td>
    <td>S15</td>
    <td>
      A skinned R15 character created from the <a href="../../art/modeling/skinning-a-humanoid-model.md">Skinning a Humanoid Model</a> guide. Since this reference model doesn't yet have [inner and outer cage mesh data](../../art/avatar/specifications.md#inner-and-outer-cages), it's incompatible with layered clothing or accessories.
    </td>
  </tr>
</tbody>
</table>
