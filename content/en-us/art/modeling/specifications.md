---
title: General Specifications
description: Lists the specific technical requirements for custom models created outside of Studio.
---

Roblox supports a wide variety of mesh configurations created from third-party software such as [Blender](https://www.blender.org) or [Maya](https://www.autodesk.com/products/maya/overview).

Check that your model meets the following modeling specifications and guidelines before exporting to ensure Studio compatibility. Specific types of assets, like characters and accessories, have additional specifications:

- If you are creating an avatar character model, ensure that your model follows [Character Specifications](../../art/characters/specifications.md).
- If you are creating an accessory model, ensure that your model follows [Accessory Specifications](../../art/accessories/specifications.md).

When ready to export, see [Export Requirements](../../art/modeling/export-requirements.md) for mesh export settings for Blender and Maya.

<Alert severity='info'>
If you meet certain account requirements, you can sell your custom meshes as accessories on the Marketplace. See [Clothing and Accessories](../../art/accessories/index.md) for an overview on the creation process for these types of accessories.
</Alert>

## Geometry

See the following specifications for general geometry:

- **Budgets** - Individual meshes can not exceed 10,000 triangles. Avatar items have their own individual budget requirements for [characters](../../art/characters/specifications.md) and [accessories](../../art/accessories/specifications.md).
- **Watertight** - All geometry must be watertight without exposed holes or backfaces.
- **No N-gons** - Meshes must be in quads where possible.
- **Volume** - Meshes cannot be 0 thickness and must have some volume.

## Rigging and Skinning

Roblox supports third-party meshes with an internal rig, or skeleton structure that can be used as additional articulation points in your model. See [Character Rigs](../../art/characters/specifications.md#rigging) for specific standards for an R15 character rig.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/animation/importing-custom-3d-rigs/Rig-Custom-Puffer-Blender.png" />
    <figcaption>Generic rig model.</figcaption>
  </figure>
  <figure>
    <img src="../../assets/animation/importing-custom-3d-rigs/Rig-Hierarchy-Custom-Blender-Bones.png" width="75%" />
    <figcaption>Generic rig bone structure (Blender).</figcaption>
  </figure>
</GridContainer>

See the following requirements for general rigging and skinning:

- **Transformations** - All bones (Blender) or joints (Maya) must be frozen and have scale values set to `1`, `1`, `1` and rotation values set to `0`, `0`, `0`.
- **Symmetry** - When possible, maintain symmetry when applying influences to a rig
- **Root Joint** - The root bone or joint should always be set to `0`, `0`, `0`.
- **Max Influences** - A vertex can not be influenced by more than 4 bones or joints.
- **No Root Influences** - Do not apply influences to the Root bone or joint.

## Textures

Roblox supports basic color textures and modern [PBR textures](../../art/modeling/surface-appearance.md). For technical requirements and best practices when generating individual texture images, see [Texture Specifications](../../art/modeling/texture-specifications.md).

## Animations

An animation can be included on any `.fbx` mesh export. For information on prepping a character animation from a modeling software for export, see [Exporting Animations from Maya](../../art/characters/exporting-avatar-animations-from-maya.md).

See the following requirements for assets with animation:

- **Single Track Animation** - Only a single animation track can be exported with a mesh or model. If you want to export multiple animations, you need to create separate exports for each animation you want to import.

## Inner and Outer Cages

Inner and Outer cages are non-rendered meshes that Roblox uses to define the inner and outer surfaces of a mesh using a `Class.WrapLayer` or `Class.WrapTarget` instance. These cages are most often used with characters and accessories, though you can use cage meshes for any mesh object.

<Alert severity="warning">
Character models must include an outer cage in order to properly equip layered clothing and accessories. See [Character Specifications](../../art/characters/specifications.md) for additional information.
</Alert>

For general use, see the following requirements for adding inner and outer cage meshes to your model:

- **Naming Conventions** - The inner and outer cage must be named after the primary mesh object with **\_InnerCage** and **\_OuterCage** affixed.

   <img src="../../assets/accessories/lc-blender-selecting-cage-in-outlier.png" />

- **Outer Cage** - Models, such as a playable character, that aren't expected deform but are the target of meshes that will stretch over it, only require an Outer Cage.
- **Vertices and UV Map** - Don't delete vertices or alter the UVs on the Inner or Outer Cages as this can cause errors when importing in Studio or when equipping onto a character.
- **Symmetry and consistency** - Keep each face (the space between vertices) consistently sized and retain symmetry wherever possible. Use symmetry tools in your modeling software whenever possible.
