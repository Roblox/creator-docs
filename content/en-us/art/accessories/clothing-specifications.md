---
title: Clothing specifications
description: Layered clothing specifications lists the specific technical requirements for the visible mesh, cages, and proper rigging and skinning data.
---

When creating clothing for Roblox, it's important to meet specific technical requirements to ensure compatibility and optimize for performance and quality. Many of these requirements must be applied when designing and modeling your asset in a third-party modeling application.

Although [rigid accessories](../../art/accessories/specifications.md) and layerable accessories share many technical requirements, layerable clothing accessories must include additional components to ensure the accessories deform and stretch appropriately on different body scales.

If you are intending to publish and sell these assets on the Marketplace, there are additional [Marketplace policy](../../marketplace/marketplace-policy.md) standards that you must follow for any accessory or clothing item.

When ready to export, see [export requirements](../../art/accessories/clothing-export-settings.md) for mesh export settings for Blender and Maya.

<Alert severity = 'warning'>
<AlertTitle>If creating other types of 3D models:</AlertTitle>
<ul>
<li>For generic meshes, see [general mesh specifications](../modeling/specifications.md) and [general export settings](../modeling/export-requirements.md).</li> <br />
<li>For rigid accessories, see [accessory specifications](../accessories/specifications.md) and [accessory export settings](../accessories/export-settings.md).</li> <br />
<li>For avatar characters, see [avatar specifications](../characters/specifications.md) and [avatar export settings](../characters/export-settings.md).</li>
</ul>
</Alert>

## Geometry and Budgets

- **Single Mesh** - Accessories must be a single mesh.
- **Budgets** - Accessories can't exceed **4k** triangles.
- **Watertight** - All geometry must be watertight without exposed holes or backfaces.
- Use **quads** whenever possible. Avoid faces with 5 or more sides.
- **Mesh Size** - Depending on the type of accessory asset, meshes must follow a standard size (in studs, centered on attachment point) depending on the [body scale](#size-requirements) it is designed for.

### Size Requirements

Depending on the type of layerable asset, the size requirements can't exceed the following maximum width, height, and depth (in studs).

<table>
<thead>
  <tr>
    <th>Asset Type</th>
    <th>Width (X)</th>
    <th>Height (Y)</th>
    <th>Depth (Z)</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>T-Shirt, Shirt, Sweater, Jacket, Pants, Shorts, Dress &amp; Skirt</td>
    <td>8</td>
    <td>8</td>
    <td>8</td>
  </tr>
  <tr>
    <td>Hair</td>
    <td>3</td>
    <td>5* <br /> (Not centered: 2 up, 3 down)</td>
    <td>3.5* <br /> (Not centered: 1.5 front, 2 behind)</td>
  </tr>
  <tr>
    <td>Eyebrow and Eyelashes</td>
    <td>1.5</td>
    <td>0.5</td>
    <td>0.5</td>
  </tr>
</tbody>
</table>

### Attachment Points

`Class.Attachment` objects indicate where an accessory model attaches to a point on a character body. Whether you are creating rigid or [layered](./layered-clothing.md) accessories, Studio's [Accessory Fitting Tool](../../art/accessories/accessory-fitting-tool.md) (AFT) automatically adds and configures the appropriate `Class.Attachment` with the following specifications:

- **One attachment** - Each accessory, including layered clothing, require at least one attachment point to its associated body part.
- **Naming Convention** - The `Class.Attachment` name must follow a specific naming convention depending on the `Class.Accessory.AccessoryType`. The AFT generates an appropriate `Class.Attachment` name automatically.

If setting attachment names manually in Studio, use the following `Class.Attachment` name for each accessory type:

  <table>
  <thead>
    <tr>
      <th>Accessory Type</th>
      <th>Attachment Name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Hat</td>
      <td>`HatAttachment`</td>
    </tr>
    <tr>
      <td>Hair</td>
      <td>`HairAttachment`</td>
    </tr>
    <tr>
      <td>Back</td>
      <td>`BodyBackAttachment`</td>
    </tr>
    <tr>
      <td>Waist</td>
      <td>`WaistFrontAttachment`, `WaistCenterAttachment`, `WaistBackAttachment`</td>
    </tr>
    <tr>
      <td>Shoulder</td>
      <td>`RightShoulderAttachment`, `RightCollarAttachment`, `NeckAttachment`, `LeftCollarAttachment`, `LeftShoulderAttachment`</td>
    </tr>
    <tr>
      <td>Face, Eyelash, Eyebrow</td>
      <td>`FaceFrontAttachment`, `FaceCenterAttachment`</td>
    </tr>
    <tr>
      <td>Neck</td>
      <td>`NeckAttachment`</td>
    </tr>
    <tr>
      <td>Front</td>
      <td>`BodyFrontAttachment`</td>
    </tr>
    <tr>
      <td>Layered tops (Shirt, TShirt, Sweater, Jacket)</td>
      <td>`BodyFrontAttachment`</td>
    </tr>
    <tr>
      <td>Layered bottoms (Pants, Shorts, DressSkirt)</td>
      <td>`WaistCenterAttachment`</td>
    </tr>
  </tbody>
  </table>

  <Alert severity = 'info'>
  The 3D Importer automatically recognizes mesh objects as attachment points if the objects include the affix `\_Att`. This only applies when importing meshes with caging data, such as clothing or bodies.
  </Alert>

- **Shoulders and Collars** - Even though they are in similar locations, Shoulder and Collar attachment points interact with character rigs differently for rigid accessories.
  - Items using `RightShoulderAttachment` or `LeftShoulderAttachment` move with the character's arm.
  - Items using `RightCollarAttachment` or `LeftCollarAttachment` do not move with the character's arm.

### Face Accessories

Face accessories, such as hair, eyebrows, and eyelashes are unique accessories that you can bundle with an avatar body upload. At this time, eyebrows and eyelashes can not be uploaded as standalone accessories and must be bundled with avatar bodies. For more information on bundling your face accessories with avatar models, see [Publishing bodies with eyelashes and eyebrows](../accessories/publish-eyebrows-eyelashes.md).

- **Naming Convention when bundled** - When including these assets with an avatar body upload, the accessory objects must use the following name conventions:
  - `EyebrowAccessory`
  - `EyelashAccessory`
  - `HairAccessory`

## Textures

Textures created for accessories must meet Roblox's [texture specifications](../../art/modeling/texture-specifications.md). Keep in mind that smaller assets, such as accessories, can use smaller texture map sizes, such as **256&times;256px**, to optimize performance with virtually no loss in detail.

## Layerable Properties

Clothing and accessories that deform and fit around any characters and existing clothing items require additional configuration in a 3D modeling software such as [Blender](https://www.blender.org) or [Maya](https://www.autodesk.com/products/maya/overview).

To achieve the layering effect, your clothing must meet the following requirements:

- Asset must be [weighted and bound](#rigging-and-skinning) to an R15 skeleton (Maya) or armature (Blender).
- Asset must contain an [inner mesh cage](#inner-cage) and an [outer mesh cage](#outer-cage).
- Asset must continue to follow any applicable [custom mesh requirements](../../art/characters/specifications.md), such as best practices on watertightness, textures, and polycount budgets.

See [Creating Layered Models](../../art/accessories/creating/index.md) for a basic guide on applying these requirements on a reference asset in Blender. Once the `.fbx` file is [exported](../../art/accessories/export-settings.md), see [Accessory Fitting Tool](../../art/accessories/accessory-fitting-tool.md) for instructions on creating an accessory from your model.

### Rigging and Skinning

Rigging and skinning a layered accessory allows the accessory to move naturally with a character body. You can perform this manually through a modeling tool, or [use automatic skinning transfer](../../art/accessories/automatic-skinning-transfer.md) to generate an accessory's skinning data at run time.

If using modeling software to skin your accessories, keep in mind that **Joint Influences** (Maya) or **Bone Assignments** (Blender) per vertex should be limited to **4**.

For more information on basic skinning in third-party modeling software, such as Blender's [Automatic Weights](https://docs.blender.org/manual/en/latest/animation/armatures/skinning/parenting.html#with-automatic-weights), see [Skinning a Simple Mesh](../../art/modeling/skin-a-simple-mesh.md) for instructions on rigging, applying weights, and skinning a basic mesh.

### Cage Meshes

**Cage meshes**, or **cages**, are invisible meshes that define the inner and outer surfaces of your asset and are fundamental to the layerable properties of clothing items. The inner cage determines the inside surface of a clothing item while the outer cage determines the outside surface of a clothing item.

<Alert severity = 'error'>
Assets with invalid cage configurations may fail validation and are subject to moderation. See [Caging best practices](./caging-best-practices.md) for examples and instructions.
</Alert>

For a basic overview on caging, see the [Basic Clothing Tutorial](../accessories/creating/caging-setup.md) and the relevant section of the tutorial video at [8:32](https://www.youtube.com/watch?v=C-DwGRBHvmE&t=512s):

<iframe width="800" height="450" src="https://www.youtube-nocookie.com/embed/C-DwGRBHvmE" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

#### Inner Cage

The inner cage is the inner surface of your model and defines how the layered asset fits over another layered model. As a best practice, the shape of the inner and outer cage should match each other before editing the outer cage to completely cover your asset.

The inner cage mesh object must have the same name as the accessory model appended with **\_InnerCage**.

<img src="../../assets/accessories/lc-requirements-innercage.png" width="60%" />

<img src="../../assets/accessories/lc-requirements-innercage-outliner.png" width="60%" />

#### Outer Cage

The outer cage defines the external surface that another item's inner cage would layer on top of. Avatar character models must have an outer cage included with its model in order to be compatible with layered clothing. All avatar models available on the [Marketplace](https://www.roblox.com/catalog) include a properly configured outer cage and are compatible with layered assets.

The outer cage of a layered clothing asset is a mesh that precisely covers the clothing item. The outer cage included in the template files is identical to the inner cage by default and must be the only cage adjusted to fit over an accessory.

The outer cage mesh object must have the same name as the accessory model appended with **\_OuterCage**.

<img src="../../assets/accessories/lc-requirements-outercage.png" width="60%" />

<img src="../../assets/accessories/lc-requirements-outercage-outliner.png" width="60%" />

<Alert severity="warning">
The vertexes and UVs of the inner and outer cage meshes should not be deleted or removed, as they are used to match coordinates between other cages.
</Alert>

## Marketplace Requirements

Your items must meet the following requirements before you upload them to the Marketplace to sell:

- Ensure that your items adhere to the [Marketplace Program Guidelines](../../marketplace/marketplace-policy.md).
- Whenever applicable, ensure that your items adhere to Roblox's [custom mesh specifications](../../art/modeling/specifications.md) and [rigid accessory specifications](../../art/accessories/specifications.md).
- Object `Class.MeshPart.Material|Material` is set to `Plastic`.
- Object `Class.MeshPart.Transparency|Transparency` is set to 0.
- Object `Class.MeshPart.VertexColor|VertexColor` is the default `1, 1, 1`.
- Your `Class.Accessory` instance does not contain extraneous objects, like `Class.Script` or additional `Class.Part` instances.
