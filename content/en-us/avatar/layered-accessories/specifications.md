---
title: Layered accessory specifications
description: Layered accessory specifications lists the specific technical requirements necessary for Studio compatibility.
---

Layered accessories require a specific set of components and configuration standards to ensure they are able to stretch and fit on character bodies and include optimizations for performance and quality. Because you must apply many of these requirements as you're designing and modeling the layered accessory in a third-party modeling program like [Blender](https://www.blender.org/) or [Maya](https://www.autodesk.com/products/maya/overview), it's important to review these specifications early and often as you work.

When you're ready to export your layered accessory, reference all [export setting requirements](./export.md) for Blender and Maya.

<Alert severity = 'info'>
<AlertTitle>For other types of 3D models:</AlertTitle>
<ul>
<li>[General mesh](../../art/modeling/specifications.md) specifications.</li>
<li>[Rigid accessory](../rigid-accessories/specifications.md) specifications.</li>
</ul>
</Alert>

## Geometry and budgets

- **Single Mesh** - Layered accessories must be a single mesh.
- **Budgets** - Layered accessories can't exceed **4k** triangles.
- **Watertight** - All geometry must be watertight without exposed holes or backfaces.
- Use **quads** whenever possible. Avoid faces with 5 or more sides.
- **Mesh Size** - Meshes must adhere to the following maximum size requirements (in studs, centered on attachment point) according to the type of layered accessory you're designing.

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
    <td>Eyebrow and Eyelashes</td>
    <td>1.5</td>
    <td>0.5</td>
    <td>0.5</td>
  </tr>
</tbody>
</table>

## Textures

- Layered accessory textures must meet Roblox's general [texture specifications](../../art/modeling/texture-specifications.md). High resolution textures are automatically converted to lower-resolution textures to optimize performance.
- Layered accessory textures for Marketplace assets cannot exceed 2048x2048 resolution.

## Attachment points

`Class.Attachment` objects for layered accessories set which body part the accessory is attached to when the character body ragdolls or dismembers in a game. Whether you are creating [rigid](../rigid-accessories/index.md) or layered accessories, Studio's [Accessory Fitting Tool](../../avatar/accessory-fitting-tool.md) (AFT) automatically adds and configures the appropriate `Class.Attachment` with the following specifications:

- **One attachment** - Each layered accessory requires at least one attachment point to its associated body part.
- **Naming convention** - The `Class.Attachment` name must follow a specific naming convention depending on the `Class.Accessory.AccessoryType`. The AFT automatically generates an appropriate `Class.Attachment` name.

If setting or configuring attachments manually in Studio, use the following names for your `Class.Attachment` object according to the accessory type:

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
  The Importer automatically recognizes mesh objects as attachment points if the objects include the affix `\_Att`. This only applies when importing meshes with caging data, such as layered accessories or character bodies.
  </Alert>

- **Shoulders and Collars** - Even though they are in similar locations, Shoulder and Collar attachment points interact with character rigs differently for rigid accessories.
  - Items using `RightShoulderAttachment` or `LeftShoulderAttachment` move with the character's arm.
  - Items using `RightCollarAttachment` or `LeftCollarAttachment` do not move with the character's arm.

## Face accessories

Face accessories, such as hair, eyebrows, and eyelashes, are unique layered accessories that you can bundle with an avatar body upload. At this time, eyebrows and eyelashes can not be uploaded as standalone accessories and must be bundled with [character bodies](../character-bodies/index.md). For more information on bundling your face accessories with avatar models, see [Publish bodies with eyelashes and eyebrows](../../art/accessories/publish-eyebrows-eyelashes.md).

- **Naming Convention when bundled** - When including these assets with an avatar body upload, the layered accessory objects must use the following name conventions:
  - `EyebrowAccessory`
  - `EyelashAccessory`
  - `HairAccessory`

## Layerable properties

Layered accessories require additional configuration in a 3D modeling software, such as [Blender](https://www.blender.org) or [Maya](https://www.autodesk.com/products/maya/overview). To achieve the layering effect, your layered accessories must meet the following requirements:

- Layered accessories must be [weighted and bound](#rigging-and-skinning) to a [standard](../character-bodies/specifications.md#standard-rigs) or [higher-fidelity](../character-bodies/specifications.md#higher-fidelity-rigs) rigging armature.
- Layered accessories must contain an [inner mesh cage](#inner-cage) and an [outer mesh cage](#outer-cage).
- Layered accessories must continue to follow any applicable [custom mesh requirements](../../avatar/character-bodies/specifications.md), such as best practices on watertightness, textures, and polycount budgets.

See [Create your first layered accessory](../../art/accessories/creating/index.md) for a step-by-step tutorial on applying these requirements to a reference asset in Blender. Once the `.fbx` file is [exported](./export.md), see [Accessory Fitting Tool](../../avatar/accessory-fitting-tool.md) for instructions on converting your model into an `Class.Accessory` object.

### Rigging and skinning

Rigging and skinning layered accessories allows them to move and deform naturally with character bodies as they move in the 3D space. You can rig and skin your layered accessories manually using third-party 3D modeling tooling, or [use automatic skinning transfer](../../avatar/automatic-skinning-transfer.md) to generate an accessory's skinning data at runtime.

When you use third-party 3D modeling tooling to skin your accessories, keep in mind that **Joint Influences** (Maya) or **Bone Assignments** (Blender) per vertex should be limited to **4**.

For more information on basic skinning in a third-party 3D modeling software, such as Blender's [Automatic Weights](https://docs.blender.org/manual/en/latest/animation/armatures/skinning/parenting.html#with-automatic-weights), see the [Skin a simple mesh](../../art/modeling/skin-a-simple-mesh.md) tutorial for instructions on rigging, applying weights, and skinning a basic mesh.

### Cage meshes

**Cage meshes**, or **cages**, are non-rendered meshes that define the inner and outer surfaces of a layered accessory, and they are fundamental to the layerable properties. For a basic overview on caging, see [Create your first layered accessory - Caging setup](../../art/accessories/creating/caging-setup.md) and the relevant section of the tutorial video at [8:32](https://www.youtube.com/watch?v=C-DwGRBHvmE&t=512s):

<iframe width="800" height="450" src="https://www.youtube-nocookie.com/embed/C-DwGRBHvmE" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

<br />

Roblox provides template cages meshes in [layered accessory project files](project-files.md) for you to use as you create your own custom layered accessories. Note that the outer cage is identical to the inner cage by default and must be the only cage adjusted to fit over your custom layered accessory. As a best practice, the shape of the inner and outer cage should match each other before editing the outer cage to completely cover your asset.

<Alert severity="warning">
The vertexes and UVs of the inner and outer cage meshes should not be deleted or removed, as they are used to match coordinates between other cages.
</Alert>

<Alert severity = 'error'>
Layered accessories with invalid cage configurations can fail validation and are subject to moderation. For examples and instructions on how to fix caging issues, see [Caging best practices](./caging-best-practices.md).
</Alert>

#### Inner cage

The inner cage is a mesh that defines the inner surface of your accessory model and how your layered accessory stretches and fits over a character body. The inner cage mesh object must have the same name as the accessory model appended with **\_InnerCage**.

<GridContainer numColumns="2">
  <figure><img src="../../assets/accessories/lc-requirements-innercage.png" /></figure>

  <figure><img src="../../assets/accessories/lc-requirements-innercage-outliner.png" /></figure>
</GridContainer>

#### Outer cage

The outer cage is a mesh that defines the outer surface of your accessory model and how other layered accessories can stretch and fit over your layered accessory. The outer cage mesh object must have the same name as the accessory model appended with **\_OuterCage**.

<GridContainer numColumns="2">
  <figure><img src="../../assets/accessories/lc-requirements-outercage.png" /></figure>

  <figure><img src="../../assets/accessories/lc-requirements-outercage-outliner.png" /></figure>
</GridContainer>

<Alert severity = 'info'>
Avatar [character bodies](../character-bodies/index.md) must include an outer cage in order to be compatible with layered accessories. All character bodies on the [Marketplace](https://www.roblox.com/catalog) include a properly configured outer cage and are compatible with layered accessories.
</Alert>

## Marketplace requirements

Layered accessories must meet the following requirements before you upload them to the Marketplace:

- Ensure that your layered accessories adhere to [Marketplace policies](../../marketplace/marketplace-policy.md).
- Whenever applicable, ensure that your layered accessories adhere to Roblox's [custom mesh specifications](../../art/modeling/specifications.md).
- Object `Class.MeshPart.Material|Material` is set to `Plastic`.
- Object `Class.MeshPart.Transparency|Transparency` is set to 0.
- Object `Class.MeshPart.VertexColor|VertexColor` is the default `1, 1, 1`.
- Your `Class.Accessory` object does not contain extraneous objects, like `Class.Script` or additional `Class.Part` objects.
