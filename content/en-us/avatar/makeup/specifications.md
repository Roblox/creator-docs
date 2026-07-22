---
title: Makeup specifications
description: Makeup is a cosmetic look made up of multiple facial textures and optional eyebrow and eyelashes.
---

Makeup requires a specific set of components and configuration standards to ensure it displays properly on avatar faces of all shapes and sizes. Before you start the export process, verify that your makeup meets the following specifications and guidelines for proper Studio compatibility.

When you're ready to export your makeup, reference all [export setting requirements](./reassign-textures.md) for Blender and Maya.

<Alert severity = 'info'>
<AlertTitle>For other types of 3D models:</AlertTitle>
<ul>
<li>[General mesh](../../art/modeling/specifications.md) specifications.</li>
<li>[Rigid accessory](../rigid-accessories/specifications.md) specifications.</li>
<li>[Layered accessory](../layered-accessories/specifications.md) specifications.</li>
</ul>
</Alert>

## General

If you are following the best practice [creation process](./index.md#creation-process), ensure that your template file submission includes the following objects that are correctly configured and named in their respective third-party modeling software:

<img src="../../assets/makeup/Makeup-Blender-Datamodel.png" width="55%" />

- A **head mesh object** and associated **cage mesh object**.
  - These two objects must include the prefix "TransferTarget_" in their name.
- **TransferTexture mesh objects** for each region: `Eyes`, `Face`, `Lips`.
  - These three objects must follow the following naming conventions.
    - `TransferTexture_Eyes_01`
    - `TransferTexture_Lips_01`
    - `TransferTexture_Face_01`
    - Any for multiple regions, increment the affix number: `TransferTexture_Face_02`
- Optional [eyebrows and eyelashes](#eyebrows-and-eyelashes).

<Alert severity = 'warning'>
The [provided Roblox makeup template head](https://github.com/Roblox/avatar/tree/main/Makeup) should already be properly configured with the correct objects and naming conventions. To prevent issues with import, avoid renaming or deleting the data model of the template head when creating your own makeup.
</Alert>

## Decals and textures

All accessory textures must meet Roblox's [texture specifications](../../art/modeling/texture-specifications.md), but makeup textures include two additional considerations:

- There is a 4K texture limit for [in-game](../../avatar/in-experience-creation.md) makeup creation.
- There is a 1K texture limit for makeup that you upload to the [Marketplace](https://www.roblox.com/catalog).

For additional information on PBR textures, see [PBR textures](../../art/modeling/surface-appearance.md).

## Eyebrows and eyelashes

Eyebrows and eyelashes are optional layered accessories for makeup looks. If you choose to include them in your creations, they must meet all [layered accessory requirements](../../avatar/layered-accessories/specifications.md), notably:

- **Cage data** - Eyebrows and eyelashes each require their own inner and outer cage.

  <img src="../../assets/makeup/Makeup-Eye-Accessory-Datamodel.png" width="55%" />

  - Eyebrows and eyelashes can also take advantage of automatic skinning, specifically with [special skinning joints](../../avatar/automatic-skinning-transfer.md#special-skinning-transfer-joints).

- **Geometry size** - Eye accessories can't exceed the [maximum dimensions](../../avatar/layered-accessories/specifications.md) for their asset type.
- **Budgets** - Eye accessories can't exceed 4k triangles each.
