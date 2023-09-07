---
title: General Specifications
description: Mesh Requirements lists the specific technical requirements for custom models created outside of Studio.
---

Roblox supports a wide variety of mesh configurations created from third-party software such as [Blender](https://www.blender.org) or [Maya](https://www.autodesk.com/products/maya/overview).

Check that your model meets the following modeling specifications and guidelines before exporting to ensure Studio compatibility. Specific types of assets, like characters and accessories, have additional specifications:

- If you are creating an avatar character model, ensure that your model follows [Character Specifications](../../art/avatar/specifications.md).
- If you are creating an accessory model, ensure that your model follows [Accessory Specifications](../../art/accessories/specifications.md).

When ready to export, see [Export Requirements](../../art/modeling/export-requirements.md) for mesh export settings for Blender and Maya.

<Alert severity='info'>
If you are part of the UGC program, you can sell your custom meshes as accessories on the Marketplace. See [Clothing and Accessories](../../art/accessories/index.md) for an overview on the creation process for these types of accessories.
</Alert>

## Geometry

See the following specifications for general geometry:

- **Budgets** - Humanoid characters must be within 10k triangles, not including accessories. Less detailed meshes, such as accessories, must be within 4k triangles.
- **Watertight** - All geometry must be watertight without exposed holes or backfaces.
- **No N-gons** - Models must be in quads where possible.
- **Scale** - Your scene units in Maya or Blender should be set to Centimeters to closely match with Studio's scale.

## Rigging and Skinning

Roblox supports third-party meshes with an internal rig, or skeleton structure that can be used as additional articulation points in your model. See [Character Rigs](../../art/avatar/specifications.md#rigging) for specific standards for an R15 character rig.

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

Basic textures can be imported with a `.fbx` file in Studio or imported separately as an image and applied to a mesh as a Texture ID.

You can also use `Class.SurfaceAppearance` for advanced textures. `Class.SurfaceAppearance` will override a mesh's existing TextureID and can be used for additional texturing options, such as Physically Based Rendering (PBR).

See the following requirements for basic textures:

- **File Formats** - File formats for textures that are uploaded separately in Studio must be submitted as a `.png`, `.jpg`, `.tga`, or `.bmp`.

### UV Mapping

Textures use UV mapping, a 3D modeling process to project a 3D model's surface to a 2D image, or UV Atlas. See the following requirements for UV mapping, especially if you're manually editing or optimizing your UV atlas:

- **Single UV Set** - Use a single UV set for each component, such as a humanoid or accessory. Studio doesn't allow for multiple UV sets.
- **Coordinates** - All UVs must be created within a 0:1 space.
- **Overlaps** - Overlapping UVs are allowed.
- **Maximum Texture Resolution** - Roblox supports up to 1024x1024 pixel spaces for texture maps. See [Optimizations](#optimizations) for more details on efficiently texturing your assets.

#### Optimizations

Studio's UV compositor allows you to pack and size your UVs to best suit your needs because it can detect and repackage UVs for performance and storage efficiency. The compositor looks to each component of the model, such as a character (arms, legs, torso, head), and repackages and loads the UVs as needed when in-experience changes occur, such as swapping body parts.

Especially with character models and other advanced models, optimizing your UV layouts can help prevent texture issues, save loading time, and improve performance. Keep in mind the following best practices for optimizing your UV islands for Roblox's UV compositor:

- **Pixel space** - Studio's texture compositor repacks UVs by breaking up the following pixel spaces:

  - **1024x1024** pixel space into **64x64 16 pixel** blocks.
  - **512x512** pixel space into **32x32 16 pixel** blocks.
  - **256x256** pixel space into **16x16 16 pixel** blocks.

  <GridContainer numColumns="3">
    <figure>
      <img src="../../assets/modeling/meshes/mesh-requirements/UV_Grid_1024.png" width = "100%"/>
      <figcaption>1024x1024 UV example</figcaption>
    </figure>
    <figure>
      <img src="../../assets/modeling/meshes/mesh-requirements/UV_Grid_512.png" width = "100%"/>
      <figcaption>512x512 UV example</figcaption>
    </figure>
    <figure>
      <img src="../../assets/modeling/meshes/mesh-requirements/UV_Grid_256.png" width="100%" />
      <figcaption>256x256 UV Example</figcaption>
    </figure>
  </GridContainer>

- **Avoid Sharing 16 Pixel Blocks** - To maximize your UV space and the resolution of your model, keep all UV Islands within these 16 pixel blocks when possible, and do not let two UV islands share the same 16 pixel block.

  <GridContainer numColumns="2">
    <figure>
      <img src="../../assets/modeling/meshes/mesh-requirements/UV-Layout-Poor.png" width = "100%"/>
      <figcaption>
      <Alert severity='error'>
      <AlertTitle>Inefficient UV Layout</AlertTitle>
      UV islands share blocks in the same 16 px grid. The compositor treats this as one large group.
      </Alert>
      </figcaption>
    </figure>
    <figure>
      <img src="../../assets/modeling/meshes/mesh-requirements/UV-Layout-Optimized.png" width="100%" />
      <figcaption>
      <Alert severity='success'>
      <AlertTitle>Optimized UV Layout</AlertTitle>
      UV islands are near each other, but do not share any blocks on the 16 px grid. The compositor treats these as separate groups.
      </Alert>
      </figcaption>
    </figure>
  </GridContainer>

- **Use Smaller Islands** - When possible, use smaller islands to simplify layout and packing. This can help prevent a UV island for one body part incorrectly applying to another as the compositor can't differentiate the islands.

  <GridContainer numColumns="2">
    <figure>
      <img src="../../assets/modeling/meshes/mesh-requirements/UV-Island-Poor.png" width = "100%"/>
      <figcaption>
      <Alert severity='error'>
      <AlertTitle>Inefficient UV Island</AlertTitle>
      Several UV islands overlap into other island spaces on the 16 px grid. The compositor treats them as a single large object and may not optimize efficiently.
    </Alert>
      </figcaption>
    </figure>
    <figure>
      <img src="../../assets/modeling/meshes/mesh-requirements/UV-Island-Optimized.png" width="100%" />
      <figcaption>
      <Alert severity='success'>
      <AlertTitle>Optimized UV Islands</AlertTitle>
      By using smaller islands, none of the UV islands overlap on 16 px blocks. The compositor can easily identify them as smaller block groups to repack efficiently.
      </Alert>
      </figcaption>
    </figure>
  </GridContainer>

By optimizing your UV layouts, you can prevent unexpected texture conflicts, save space, and improve performance. The following is an example of how Studio's compositor can process the same character body UV layouts with and without optimizations:

 <figure>
      <img src="../../assets/modeling/meshes/mesh-requirements/Compositor-Example-Poor.png" width = "100%"/>
      <figcaption>
      <Alert severity='error'>
      <AlertTitle>Texture Repacking with Inefficient UV</AlertTitle>The islands share too many of the same 16 px blocks and causes the compositor to combine many islands as one. In this example, the compositor incorrectly packs the island for the torso area by including several other islands as well.
      </Alert>
      </figcaption>
  </figure>

  <figure>
      <img src="../../assets/modeling/meshes/mesh-requirements/Compositor-Example-Optimized.png" width="100%" />
      <figcaption>
      <Alert severity='success'>
      <AlertTitle>Texture Repacking with Optimized UV</AlertTitle>The islands do not share any 16 px blocks and allows the compositor to correctly identify each island. This ensures that the compositor correctly packs the island specifically for the required part and prevents unnecessary UV space from being saved and repacked.
      </Alert>
      </figcaption>
  </figure>

### SurfaceAppearance

You can add a [Surface Appearance](../../art/modeling/surface-appearance.md) to your mesh in Studio to add advanced texture options, such as PBR, for additional realism or detail. The `Class.SurfaceAppearance` instance uses UV mapping, a form of texture mapping, to accurately map up to 4 2D images onto the mesh object.

See the following requirements for SurfaceAppearance assets:

- **Texture files** - Ensuring your textures follow consistent conventions optimizes assets for tools like the [3D Importer](../../art/modeling/3d-importer.md) and helps with organization. When possible, texture files should include the appropriate name affix and follow the appropriate image details:
   <table>
  <thead>
    <tr>
      <th>Texture Type</th>
      <th>Texture Schema Suffix</th>
      <th>Texture image details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Albedo</td>
      <td>_ALB</td>
      <td>RGB (24-bit)</td>
    </tr>
    <tr>
      <td>Metalness</td>
      <td>_MET</td>
      <td>Single Channel Greyscale  (8-bit)</td>
    </tr>
    <tr>
      <td>Normal</td>
      <td>_NOR</td>
      <td>RGB (24-bit) - Roblox only supports **OpenGL format - Tangent Space** normal maps.</td>
    </tr>
    <tr>
      <td>Roughness</td>
      <td>_RGH</td>
      <td>Single Channel Greyscale (8-bit)</td>
    </tr>
  </tbody>
  </table>

- **PBR Texture Budget** - Use an appropriate texture map size based on the asset you are texturing to optimize for visual quality and performance. As a general guideline, each asset should have a texture resolution of 256x256 for every 2x2x2 unit space the asset occupies. If larger than a 2x2x2 cube, use the next highest resolution. The following are some baseline texture sizing examples:

   <table>
  <thead>
    <tr>
      <th>Recommended Map Size</th>
      <th>Approximate Asset Size (unit cube)</th>
      <th>Example Assets</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>64x64 - 128x128</td>
      <td>1x1x1</td>
      <td>Jewelry, sunglasses, eyebrows, mustaches.</td>
    </tr>
    <tr>
      <td>256x256</td>
      <td>2x2x2</td>
      <td>Hair, shoes, tank tops, t-shirts, shorts, short skirts.</td>
    </tr>
    <tr>
      <td>512x512</td>
      <td>4x4x4</td>
      <td>Jackets, pants, overalls, long-sleeve shirts, long skirts.</td>
    </tr>
    <tr>
      <td>1024x1024 (maximum)</td>
      <td>8x8x8</td>
      <td>Full body clothing (onesies, robes), humanoid characters.</td>
    </tr>
  </tbody>
  </table>

   <Alert severity = 'info'>
   When rendering many textures at the same time, Roblox may down-res textures to optimize for performance.
   </Alert>

- **Substance Painter** - If possible, create your final PBR texture using Substance Painter and ensure that the mesh maps are created without errors.

## Animations

An animation can be included on any `.fbx` mesh export. For information on prepping a character animation from a modeling software for export, see [Exporting Animations from Maya](../../art/avatar/exporting-avatar-animations-from-maya.md).

See the following requirements for assets with animation:

- **Single Track Animation** - Only a single animation track can be exported with a mesh or model. If you want to export multiple animations, you need to create separate exports for each animation you want to import.

## Inner and Outer Cages

Inner and Outer cages are non-rendered meshes that Roblox uses to define the inner and outer surfaces of a mesh using a `Class.WrapLayer` or `Class.WrapTarget` instance. These cages are most often used with characters and accessories, though you can use cage meshes for any mesh object.

<Alert severity="warning">
Character models must include an outer cage in order to properly equip layered clothing and accessories. See [Character Specifications](../../art/avatar/specifications.md) for additional information.
</Alert>

For general use, see the following requirements for adding inner and outer cage meshes to your model:

- **Naming Conventions** - The inner and outer cage must be named after the primary mesh object with **\_InnerCage** and **\_OuterCage** affixed.

   <img src="../../assets/accessories/lc-blender-selecting-cage-in-outlier.png" />

- **Outer Cage** - Models, such as a playable character, that aren't expected deform but are the target of meshes that will stretch over it, only require an Outer Cage.
- **Vertices and UV Map** - Don't delete vertices or alter the UVs on the Inner or Outer Cages as this can cause errors when importing in Studio or when equipping onto a character.
- **Symmetry and consistency** - Keep each face (the space between vertices) consistently sized and retain symmetry wherever possible. Use symmetry tools in your modeling software whenever possible.
