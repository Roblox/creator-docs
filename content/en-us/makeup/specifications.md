---
title: Makeup specifications
description: Makeup is a cosmetic look made up of multiple facial textures and optional eyebrow and eyelashes.
---

<Alert severity ='warning'>
This feature is currently in beta. Enable it through **File** ⟩ **Beta Features** ⟩ **Avatar Makeup**. The information provided is subject to change and is intended to prepare creators for the final release. For the latest news and updates, see the [DevForum announcement](https://devforum.roblox.com/t/studio-beta-introducing-avatar-makeup/3973764).
</Alert>

Makeup is a unique avatar asset that converts a combination of textures into a single `Decal` object that is applied over a character's face. Makeup can also include optional eyebrows and eyelashes, which are MeshPart accessories that include their own textures.

<Alert severity = 'warning'>
<AlertTitle>If creating other types of 3D models:</AlertTitle>
<ul>
<li>For generic meshes, see [general mesh specifications](../art/modeling/specifications.md) and [general export settings](../art/modeling/export-requirements.md).</li> <br />
<li>For layered accessories, see [layered accessory specifications](../art/accessories/clothing-specifications.md) and [layered export settings](../art/accessories/clothing-export-settings.md).</li> <br />
<li>For avatar characters, see [avatar specifications](../art/characters/specifications.md) and [avatar export settings](../art/characters/export-settings.md).</li>
</ul>
</Alert>

## General

If you are following the best practice creation process, ensure that your template file submission includes the following correctly configured and named objects:

<img src="../assets/makeup/Makeup-Blender-Datamodel.png" width="55%" />

- A **head mesh object** and associated **cage mesh object**.
  - These two objects must include the prefix "TransferTarget_" in their name.
- **TransferTexture mesh objects** for each region: `Eyes`, `Face`, `Lips`.
  - These three objects must follow the following naming conventions.
    - `TransferTexture_Eyes_01`
    - `TransferTexture_Lips_01`
    - `TransferTexture_Face_01`
    - Any for multiple regions, increment the affix number: `TransferTexture_Face_02`
- Optional [eyebrows and eyelashes](#optional-eyebrows-and-eyelashes).

<Alert severity = 'warning'>
The [provided Roblox makeup template head](https://github.com/Roblox/avatar/tree/main/Makeup) should already be properly configure with the correct objects and naming convention. To prevent issues with import, avoid renaming or deleting the data model of the template head when creating your own makeup.
</Alert>

## Decals and textures

Textures created for accessories must meet Roblox's [texture specifications](../art/modeling/texture-specifications.md). For additional information on PBR textures, see [PBR textures](../art/modeling/surface-appearance.md).

## (Optional) Eyebrows and eyelashes

Eyebrows and eyelashes are layered accessories, meaning that they must meet [layered clothing accessory requirements](../art/accessories/clothing-specifications.md), notably:

- **Cage data** - Eyebrows and eyelashes each require their own inner and outer cage.
  <img src="../assets/makeup/Makeup-Eye-Accessory-Datamodel.png" width="55%" />

  - Eyebrows and eyelashes can also take advantage of automatic skinning, specifically with [special skinning joints](../art/accessories/automatic-skinning-transfer.md#special-skinning-transfer-joints).

- **Geometry size** - Eye accessories can't exceed [maximum dimensions](../art/accessories/clothing-specifications.md) for their asset type.
- **Budgets** - Eye accessories can't exceed 4k triangles each.
