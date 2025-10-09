---
title: General specifications
description: Lists the specific technical requirements for custom models created outside of Studio.
---

Roblox supports a wide variety of mesh configurations created from third-party software such as [Blender](https://www.blender.org) or [Maya](https://www.autodesk.com/products/maya/overview).

Check that your model meets the following modeling specifications and guidelines before exporting to ensure Studio compatibility. Specific types of assets, like characters and accessories, have additional specifications:

<Alert severity = 'warning'>
<AlertTitle>If creating other types of 3D models:</AlertTitle>
<ul>
<li>For rigid accessories, see [accessory specifications](../accessories/specifications.md) and [accessory export settings](../accessories/export-settings.md).</li> <br />
<li>For layered accessories, see [layered accessory specifications](../accessories/clothing-specifications.md) and [layered export settings](../accessories/clothing-export-settings.md).</li> <br />
<li>For avatar characters, see [avatar specifications](../characters/specifications.md) and [avatar export settings](../characters/export-settings.md).</li>
</ul>
</Alert>

When ready to export, see the [export settings](../../art/modeling/export-requirements.md) for mesh export settings for Blender and Maya.

<Alert severity='info'>
If you meet certain account requirements, you can sell your custom meshes as accessories on the Marketplace. See [Rigid accessories](../../art/accessories/index.md) for an overview on the creation process for these types of accessories.
</Alert>

## Geometry

See the following specifications for general geometry:

- **Budgets** - Individual meshes can not exceed 20,000 triangles. Avatar items have their own individual budget requirements for [characters](../../art/characters/specifications.md) and [accessories](../../art/accessories/specifications.md).
- **Watertight** - All geometry must be watertight without exposed holes or backfaces.
- **No N-gons** - Meshes must be in quads where possible.
- **Volume** - Meshes cannot be 0 thickness and must have some volume.

## Rigging and skinning

Roblox supports third-party meshes with an internal rig, or skeleton structure that can be used as additional articulation points in your model. See [Character rigs](../../art/characters/specifications.md#rig) for specific standards for an R15 character rig.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/animation/importing-custom-3d-rigs/Rig-Custom-Puffer-Blender.png" alt="A cartoon-ish low polygon model of a puffer fish."/>
    <figcaption>Generic rig model.</figcaption>
  </figure>
  <figure>
    <img src="../../assets/animation/importing-custom-3d-rigs/Rig-Hierarchy-Custom-Blender-Bones.png" width="75%" alt="The Outliner in Blender of the puffer fish model, showing the armature bone structure."/>
    <figcaption>Generic rig bone structure (Blender).</figcaption>
  </figure>
</GridContainer>

See the following requirements for general rigging and skinning:

- **Transformations** - All bones (Blender) or joints (Maya) must be frozen and have scale values set to `1`, `1`, `1` and rotation values set to `0`, `0`, `0`.
- **Symmetry** - When possible, maintain symmetry when applying influences to a rig
- **Root joint** - The root bone or joint should always be set to `0`, `0`, `0`.
- **Max influences** - A vertex can not be influenced by more than 4 bones or joints.
- **No Root influences** - Do not apply influences to the Root bone or joint.

## Textures

- Roblox supports basic color textures and modern [PBR textures](../../art/modeling/surface-appearance.md).
- For instructions on assigning texture images to natively import with your mesh, see [Assign textures in modeling tools](./assign-textures.md).
- For technical requirements and best practices when generating individual texture images, see [Texture specifications](../../art/modeling/texture-specifications.md).

## Animations

An animation can be included on any `.fbx` mesh export. For information on prepping a character animation from a modeling software for export, see [Export animations from Maya](../../art/characters/export-avatar-animations-from-maya.md).

See the following requirements for assets with animation:

- **Single track animation** - Only a single animation track can be exported with a mesh or model. If you want to export multiple animations, you need to create separate exports for each animation you want to import.

## Inner and outer cages

Inner and Outer cages are non-rendered meshes that Roblox uses to define the inner and outer surfaces of a mesh using a `Class.WrapLayer` or `Class.WrapTarget` instance. These cages are most often used with characters and accessories, though you can use cage meshes for any mesh object.

<Alert severity="warning">
Character models must include an outer cage in order to properly equip layered clothing and accessories. See [Character specifications](../../art/characters/specifications.md) for additional information.
</Alert>

For general use, see the following requirements for adding inner and outer cage meshes to your model:

- **Naming conventions** - The inner and outer cage must be named after the primary mesh object with **\_InnerCage** and **\_OuterCage** affixed.

   <img src="../../assets/accessories/lc-blender-selecting-cage-in-outlier.png" alt="The Outliner in Blender showing two mesh objects called Tshirt_InnerCage and Tshirt_OuterCage."/>

- **Outer cage** - Models, such as a playable character, that aren't expected deform but are the target of meshes that will stretch over it, only require an Outer Cage.
  - For more information on applying and implementing cages on non-Humanoid targets, see [layered clothing on non-R15](../../characters/appearance.md#layered-clothing-on-non-r15).
- **Vertices and UV map** - Don't delete vertices or alter the UVs on the Inner or Outer Cages as this can cause errors when importing in Studio or when equipping onto a character.
- **Symmetry and consistency** - Keep each face (the space between vertices) consistently sized and retain symmetry wherever possible. Use symmetry tools in your modeling software whenever possible.
