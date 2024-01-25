---
title: Accessory Requirements
description: Layered Modeling Requirements lists the specific technical requirements for the visible mesh, cages, and proper rigging and skinning techniques.
---

When creating accessories and clothing for Roblox, it's important to meet specific technical requirements to ensure compatibility and optimize for performance and quality.

Although rigid accessories and layerable accessories share many technical requirements, layerable accessories must include additional components to ensure the accessories deform and stretch appropriately on different body scales. If you are intending to publish and sell these assets on the Marketplace, there are additional [Marketplace Policy](../../art/marketplace/marketplace-policy.md) standards that you must follow for any accessory or clothing item.

When ready to export, see [Export Requirements](../../art/accessories/export-settings.md) for mesh export settings for Blender and Maya.

## Geometry and Budgets

- **Single Mesh** - Accessories must be a single mesh.
- **Budgets** - Accessories can't exceed **4k** triangles.
- **Watertight** - All geometry must be watertight without exposed holes or backfaces.
- Use **quads** whenever possible. Avoid faces with 5 or more sides.
- **Mesh Size** - Depending on the type of accessory asset, meshes must follow a standard size (in studs, centered on attachment point) depending on the [body scale](#body-scale) it is designed for.

### Body Scale

Roblox supports 3 types of body scales: `Classic`, `Normal`, and `Slender`. When designing your accessory, the size of your accessory cannot exceed the following sizes based on body scale and accessory asset type.

See [Body Scale](../accessories/body-scale.md) for more information on the different types of body proportions Roblox supports.

<Alert severity = 'info'>
You can use tools like the [Accessory Fitting Tool](../../art/accessories/accessory-fitting-tool.md) to help visualize and adjust the scale of your mesh on a mannequin within a visualized boundary before uploading and publishing the asset.
</Alert>

#### Classic

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
    <td>Hat</td>
    <td>3</td>
    <td>4</td>
    <td>3</td>
  </tr>
  <tr>
    <td>Hair</td>
    <td>3</td>
    <td>5* <br /> (Not centered: 2 up, 3 down)</td>
    <td>3.5* <br /> (Not centered: 1.5 front, 2 behind)</td>
  </tr>
  <tr>
    <td>Face</td>
    <td>3</td>
    <td>2</td>
    <td>2</td>
  </tr>
  <tr>
    <td>Eyebrow and Eyelashes</td>
    <td>1.5</td>
    <td>0.5</td>
    <td>0.5</td>
  </tr>
  <tr>
    <td>Neck</td>
    <td>3</td>
    <td>3</td>
    <td>2</td>
  </tr>
  <tr>
    <td>Shoulder (attached to NeckAttachment)</td>
    <td>7</td>
    <td>3</td>
    <td>3</td>
  </tr>
  <tr>
    <td>Shoulder (other)</td>
    <td>3</td>
    <td>3</td>
    <td>3</td>
  </tr>
  <tr>
    <td>Front</td>
    <td>3</td>
    <td>3</td>
    <td>3</td>
  </tr>
  <tr>
    <td>Back</td>
    <td>10</td>
    <td>7</td>
    <td>4.5* <br /> (Not centered: 1.5 front, 3 behind)</td>
  </tr>
  <tr>
    <td>Waist</td>
    <td>4</td>
    <td>3.5* <br /> (Not centered: 1.5 up, 2 down)</td>
    <td>7</td>
  </tr>
</tbody>
</table>

#### Normal

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
    <td>Hat</td>
    <td>1.87</td>
    <td>2.5</td>
    <td>1.87</td>
  </tr>
  <tr>
    <td>Hair</td>
    <td>1.87</td>
    <td>3.12* <br /> (Not centered: 1.25 up, 1.875 down)</td>
    <td>2.18* <br /> (Not centered: 0.9375 front, 1.25 behind)</td>
  </tr>
  <tr>
    <td>Face</td>
    <td>1.87</td>
    <td>1.25</td>
    <td>1.25</td>
  </tr>
  <tr>
    <td>Eyebrow and Eyelashes</td>
    <td>1.5</td>
    <td>0.5</td>
    <td>0.5</td>
  </tr>
  <tr>
    <td>Neck</td>
    <td>2.95</td>
    <td>3.68</td>
    <td>2.16</td>
  </tr>
  <tr>
    <td>Shoulder (attached to NeckAttachment)</td>
    <td>6.90</td>
    <td>3.68</td>
    <td>3.24</td>
  </tr>
  <tr>
    <td>Shoulder (attached to RightCollarAttachment, LeftCollarAttachment)</td>
    <td>2.95</td>
    <td>3.68</td>
    <td>3.24</td>
  </tr>
    <tr>
    <td>Shoulder (attached to RightShoulderAttachment, LeftShoulderAttachment)</td>
    <td>2.67</td>
    <td>4.40</td>
    <td>3.09</td>
  </tr>
  <tr>
    <td>Front</td>
    <td>2.95</td>
    <td>3.68</td>
    <td>3.24</td>
  </tr>
  <tr>
    <td>Back</td>
    <td>9.86</td>
    <td>8.59</td>
    <td>4.87* <br /> (Not centered: 1.623 front, 3.246 behind)</td>
  </tr>
  <tr>
    <td>Waist</td>
    <td>3.94</td>
    <td>4.29* <br /> (Not centered: 1.842 up, 2.457 down)</td>
    <td>7.57</td>
  </tr>
</tbody>
</table>

#### Slender

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
    <td>Hat</td>
    <td>1.78</td>
    <td>2.5</td>
    <td>1.78</td>
  </tr>
  <tr>
    <td>Hair</td>
    <td>1.78</td>
    <td>3.12* <br /> (Not centered: 1.25 up, 1.875 down)</td>
    <td>2.08* <br /> (Not centered: 10.892 front, 1.189 behind)</td>
  </tr>
  <tr>
    <td>Face</td>
    <td>1.78</td>
    <td>1.25</td>
    <td>1.18</td>
  </tr>
  <tr>
    <td>Eyebrow and Eyelashes</td>
    <td>1.5</td>
    <td>0.5</td>
    <td>0.5</td>
  </tr>
  <tr>
    <td>Neck</td>
    <td>2.59</td>
    <td>3.39</td>
    <td>1.92</td>
  </tr>
  <tr>
    <td>Shoulder (attached to NeckAttachment)</td>
    <td>6.05</td>
    <td>3.39</td>
    <td>2.88</td>
  </tr>
  <tr>
    <td>Shoulder (attached to RightCollarAttachment, LeftCollarAttachment)</td>
    <td>2.59</td>
    <td>3.39</td>
    <td>2.88</td>
  </tr>
    <tr>
    <td>Shoulder (attached to RightShoulderAttachment, LeftShoulderAttachment)</td>
    <td>2.37</td>
    <td>3.96</td>
    <td>2.75</td>
  </tr>
  <tr>
    <td>Front</td>
    <td>2.59</td>
    <td>3.39</td>
    <td>2.88</td>
  </tr>
  <tr>
    <td>Back</td>
    <td>8.64</td>
    <td>7.91</td>
    <td>4.32* <br /> (Not centered: 1.443 front, 2.886 behind)</td>
  </tr>
  <tr>
    <td>Waist</td>
    <td>3.76</td>
    <td>3.29* <br /> (Not centered: 1.414 up, 1.885 down)</td>
    <td>6.73</td>
  </tr>
</tbody>
</table>

### Attachment Points

Attachments are points on the accessory model that connect to another attachment of the same name on a character model. When creating rigid accessories, accessory points are automatically created when using the Accessory Fitting Tool. Studio only recognizes third-party attachment objects when importing meshes with caging data, such as clothing or bodies.

See the following specifications for attachments:

- **One attachment** - Each accessory, including layered accessories, require at least one attachment point to its associated body part.
- **Naming Convention** - The `Class.Attachment` name must follow a specific naming convention depending on the `Class.Accessory.AccessoryType`. The Accessory Fitting Tool generates an appropriate `Class.Attachment` name automatically.

  If setting attachment names manually, use the following `Class.Attachment` name for each accessory type:

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

- **Shoulders and Collars** - Even though they are in similar locations, Shoulder and Collar attachment points interact with character rigs differently for rigid accessories.
  - Items using `RightShoulderAttachment` or `LeftShoulderAttachment` move with the character's arm.
  - Items using `RightCollarAttachment` or `LeftCollarAttachment` do not move with the character's arm.

### Face Accessories

Face accessories, such as hair, eyebrows, and eyelashes are unique accessories that you can bundle with an avatar body upload. At this time, eyebrows and eyelashes can not be uploaded as standalone accessories and must be bundled with avatar bodies. For more information on bundling your face accessories with avatar models, see [Publishing Bodies with Eyelashes and Eyebrows](../accessories/publishing-eyebrows-eyelashes.md).

- **Naming Convention when bundled** - When including these assets with an avatar body upload, the accessory objects must use the following name conventions:
  - `EyebrowAccessory`
  - `EyelashAccessory`
  - `HairAccessory`

## Textures

Textures created for accessories must meet Roblox's [texture specifications](../../art/modeling/texture-specifications.md). Keep in mind that smaller assets, such as accessories, can use smaller texture map sizes, such as **256&times;256px**, to optimize performance with virtually no loss in detail.

## Layered Requirements

Clothing and accessories that deform and fit around any characters and existing clothing items require additional configuration in a 3D modeling software such as [Blender](https://www.blender.org) or [Maya](https://www.autodesk.com/products/maya/overview).

To achieve the layering effect, your clothing must meet the following requirements:

- Asset must be [weighted and bound](#rigging-and-skinning) to an R15 skeleton (Maya) or armature (Blender).
- Asset must contain an [inner mesh cage](#inner-cage) and an [outer mesh cage](#outer-cage).
- Asset must continue to follow any applicable [custom mesh requirements](../../art/characters/specifications.md), such as best practices on watertightness, textures, and polycount budgets.

See [Creating Layered Models](../../art/accessories/creating/index.md) for a basic guide on applying these requirements on a reference asset in Blender. Once the `.fbx` file is [exported](../../art/accessories/export-settings.md), see [Accessory Fitting Tool](../../art/accessories/accessory-fitting-tool.md) for instructions on creating an accessory from your model.

<Alert severity='info'>
If you meet certain account requirements, you can sell your layered accessories on the Marketplace. See [Selling 3D Accessories](../../art/accessories/index.md#selling-3d-accessories) for an overview of the uploading and selling process.
</Alert>

### Rigging and Skinning

Rigging and skinning a layered accessory allows the accessory to move naturally with a character body. You can perform this manually through a modeling tool, or [use automatic skinning transfer](../../art/accessories/automatic-skinning-transfer.md) to generate an accessory's skinning data at run time.

If using modeling software to skin your accessories, keep in mind that **Joint Influences** (Maya) or **Bone Assignments** (Blender) per vertex should be limited to **4**.

For more information on basic skinning in third-party modeling software, such as Blender's [Automatic Weights](https://docs.blender.org/manual/en/latest/animation/armatures/skinning/parenting.html#with-automatic-weights), see [Skinning a Simple Mesh](../../art/modeling/skinning-a-simple-mesh.md) for instructions on rigging, applying weights, and skinning a basic mesh.

### Cage Meshes

**Cage meshes**, or **cages**, are invisible meshes that define the inner and outer surfaces of your asset. Similar to collision boxes, these surfaces prevent other accessories or bodies from clipping or breaking and allow other accessory items with cages to layer on top of the previous object.

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
The vertexes and UVs of the inner and outer cage meshes should not be altered, as they are used to match coordinates between other cages.
You can complete the UV texturing of the actual accessory mesh layer (not the \_InnerCage or \_OuterCage objects) at your discretion.
</Alert>

## Marketplace Requirements

Your items must meet the following requirements before you upload them to the Marketplace to sell:

- Ensure that your items adhere to the [Marketplace Program Guidelines](../../art/marketplace/marketplace-policy.md).
- Whenever possible, ensure that your items adhere to the following modeling requirements:
  - [Custom mesh specifications](../../art/modeling/specifications.md).
  - Any applicable [accessory specifications](../../art/accessories/project-files.md).
- Object `Class.MeshPart.Material|Material` is set to `Plastic`.
- Object `Class.MeshPart.Transparency|Transparency` is set to 0.
- Object `Class.MeshPart.VertexColor|VertexColor` is the default `1, 1, 1`.
- Your `Class.Accessory` instance does not contain extraneous objects, like `Class.Script` or additional `Class.Part` instances.
