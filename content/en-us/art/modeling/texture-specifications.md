---
title: Texture Specifications
description: Texture Specifications lists the specific technical requirements and best practices for custom textures created outside of Studio.
---

A texture is a digital image applied to the surface of a 3D object to simulate and enhance its visual appearance. Roblox supports various texture types that you import with a custom 3D object, or upload directly as individual image files. For details on implementing basic textures, see [Textures and Decals](../../parts/textures-decals.md).

Roblox also supports [Physically Based Rendering (PBR) textures](../../art/modeling/surface-appearance.md) which override a mesh's existing `Class.MeshPart.TextureID|TextureID` and can be used to create immersive environments and objects.

See the following requirements when creating your own basic and advanced textures:

- **File Formats** — File formats for textures that are uploaded separately in Studio must be submitted as a `.png`, `.jpg`, `.tga`, or `.bmp`.

- **Resolution** — Roblox supports up to 1024×1024 pixel texture resolutions. To optimize for performance, you may consider using smaller resolutions. Use the following general guidance:
  - For smaller 5×5 stud objects, use 256×256 texture resolutions.
  - For medium 10×10 stud objects, use 512×512 texture resolutions.
  - For larger 20×20 stud objects, use 1024×1024 texture resolutions.
  - See [PBR Texture Budgets](#surfaceappearance) for similar guidances with PBR texture maps.

<Alert severity ='info'>
Roblox default [materials](../../parts/materials.md) follow a similar texel resolution pattern:
- Parts display a 1024×1024 on an 8×8 stud face.
- Terrain displays 512×512 across 8×8 studs.
</Alert>

## SurfaceAppearance

You can add a [Surface Appearance](../../art/modeling/surface-appearance.md) to your mesh in Studio to add PBR texture options. The `Class.SurfaceAppearance` instance uses UV mapping, a form of texture mapping, to accurately map up to four 2D images onto the mesh object.

See the following requirements for `Class.SurfaceAppearance` assets:

- **Texture files** — Ensuring your textures follow consistent conventions optimizes assets for tools like the [3D Importer](../../art/modeling/3d-importer.md) and helps with organization. When possible, texture files should include the appropriate name affix and follow the appropriate image details:

   <table>
  <thead>
    <tr>
      <th>Texture Type</th>
      <th>Texture Schema Suffix</th>
      <th>Texture Image Details</th>
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
      <td>Single Channel Grayscale (8-bit)</td>
    </tr>
    <tr>
      <td>Normal</td>
      <td>_NOR</td>
      <td>RGB (24-bit) - Roblox only supports **OpenGL format - Tangent Space** normal maps.</td>
    </tr>
    <tr>
      <td>Roughness</td>
      <td>_RGH</td>
      <td>Single Channel Grayscale (8-bit)</td>
    </tr>
  </tbody>
  </table>

- **PBR Texture Budget** — Use an appropriate texture map size based on the asset you are texturing to optimize for visual quality and performance. As a general guideline, each asset should have a texture resolution of 256×256 for every 2×2×2 unit space the asset occupies. If larger than a 2×2×2 cube, use the next highest resolution. The following are some baseline texture sizing examples:

   <table>
   <thead>
    <tr>
      <th>Recommended Map Size</th>
      <th>Approximate Asset Size (Unit Cube)</th>
      <th>Example Assets</th>
    </tr>
   </thead>
   <tbody>
    <tr>
      <td>64×64 - 128×128</td>
      <td>1×1×1</td>
      <td>Jewelry, sunglasses, eyebrows, mustaches.</td>
    </tr>
    <tr>
      <td>256×256</td>
      <td>2×2×2</td>
      <td>Hair, shoes, tank tops, t-shirts, shorts, short skirts.</td>
    </tr>
    <tr>
      <td>512×512</td>
      <td>4×4×4</td>
      <td>Jackets, pants, overalls, long-sleeve shirts, long skirts.</td>
    </tr>
    <tr>
      <td>1024×1024 (maximum)</td>
      <td>8×8×8</td>
      <td>Full body clothing (onesies, robes), humanoid characters.</td>
    </tr>
   </tbody>
   </table>

   <Alert severity = 'info'>
   When rendering many textures at the same time, Roblox may downsample textures to optimize for performance.
   </Alert>

## UV Mapping

All textures use UV mapping, a 3D modeling process to project a 3D model's surface to a 2D image, or UV atlas. See the following requirements for UV mapping, especially if you're manually editing or optimizing your UV atlas:

- **Single UV Set** — Use a single UV set for each component, such as a humanoid or accessory. Studio doesn't allow for multiple UV sets.
- **Coordinates** — All UVs must be created within a 0:1 space.
- **Overlaps** — Overlapping UVs are allowed.
- **Maximum Texture Resolution** — Roblox supports up to 1024×1024 pixel spaces for texture maps. See [Optimizations](#optimizations) for more details on efficiently texturing your assets.

### Optimizations

Studio's UV compositor allows you to pack and size your UVs to best suit your needs because it can detect and repackage UVs for performance and storage efficiency. The compositor looks to each component of the model, such as a character (arms, legs, torso, head), and repackages and loads the UVs as needed when in-experience changes occur, such as swapping body parts.

Especially with character models and other advanced models, optimizing your UV layouts can help prevent texture issues, save loading time, and improve performance. Keep in mind the following best practices for optimizing your UV islands for Roblox's UV compositor:

- **Pixel space** — Studio's texture compositor repacks UVs by breaking up the following pixel spaces:

  - **1024×1024** pixel space into **64×64 16 pixel** blocks.
  - **512×512** pixel space into **32×32 16 pixel** blocks.
  - **256×256** pixel space into **16×16 16 pixel** blocks.

  <GridContainer numColumns="3">
    <figure>
      <img src="../../assets/modeling/meshes/mesh-requirements/UV_Grid_1024.png" width = "100%"/>
      <figcaption>1024×1024 UV example</figcaption>
    </figure>
    <figure>
      <img src="../../assets/modeling/meshes/mesh-requirements/UV_Grid_512.png" width = "100%"/>
      <figcaption>512×512 UV example</figcaption>
    </figure>
    <figure>
      <img src="../../assets/modeling/meshes/mesh-requirements/UV_Grid_256.png" width="100%" />
      <figcaption>256×256 UV example</figcaption>
    </figure>
  </GridContainer>

- **Avoid Sharing 16 Pixel Blocks** — To maximize your UV space and the resolution of your model, keep all UV islands within these 16 pixel blocks when possible, and do not let two UV islands share the same 16 pixel block.

  <GridContainer numColumns="2">
    <figure>
      <img src="../../assets/modeling/meshes/mesh-requirements/UV-Layout-Poor.png" width = "100%"/>
      <figcaption>
      <Alert severity='error'>
      <AlertTitle>Inefficient UV Layout</AlertTitle>
      UV islands share blocks in the same 16 pixel grid. The compositor treats this as one large group.
      </Alert>
      </figcaption>
    </figure>
    <figure>
      <img src="../../assets/modeling/meshes/mesh-requirements/UV-Layout-Optimized.png" width="100%" />
      <figcaption>
      <Alert severity='success'>
      <AlertTitle>Optimized UV Layout</AlertTitle>
      UV islands are near each other but do not share any blocks on the 16 pixel grid. The compositor treats these as separate groups.
      </Alert>
      </figcaption>
    </figure>
  </GridContainer>

- **Use Smaller Islands** — When possible, use smaller islands to simplify layout and packing. This can help prevent a UV island for one body part incorrectly applying to another as the compositor can't differentiate the islands.

  <GridContainer numColumns="2">
    <figure>
      <img src="../../assets/modeling/meshes/mesh-requirements/UV-Island-Poor.png" width = "100%"/>
      <figcaption>
      <Alert severity='error'>
      <AlertTitle>Inefficient UV Island</AlertTitle>
      Several UV islands overlap into other island spaces on the 16 pixel grid. The compositor treats them as a single large object and may not optimize efficiently.
    </Alert>
      </figcaption>
    </figure>
    <figure>
      <img src="../../assets/modeling/meshes/mesh-requirements/UV-Island-Optimized.png" width="100%" />
      <figcaption>
      <Alert severity='success'>
      <AlertTitle>Optimized UV Islands</AlertTitle>
      By using smaller islands, none of the UV islands overlap on 16 pixel blocks. The compositor can easily identify them as smaller block groups to repack efficiently.
      </Alert>
      </figcaption>
    </figure>
  </GridContainer>

By optimizing your UV layouts, you can prevent unexpected texture conflicts, save space, and improve performance. The following is an example of how Studio's compositor can process the same character body UV layouts with and without optimizations:

 <figure>
      <img src="../../assets/modeling/meshes/mesh-requirements/Compositor-Example-Poor.png" width = "100%"/>
      <figcaption>
      <Alert severity='error'>
      <AlertTitle>Texture Repacking with Inefficient UV</AlertTitle>The islands share too many of the same 16 pixel blocks and causes the compositor to combine many islands as one. In this example, the compositor incorrectly packs the island for the torso area by including several other islands as well.
      </Alert>
      </figcaption>
  </figure>

  <figure>
      <img src="../../assets/modeling/meshes/mesh-requirements/Compositor-Example-Optimized.png" width="100%" />
      <figcaption>
      <Alert severity='success'>
      <AlertTitle>Texture Repacking with Optimized UV</AlertTitle>The islands do not share any 16 pixel blocks and allows the compositor to correctly identify each island. This ensures that the compositor correctly packs the island specifically for the required part and prevents unnecessary UV space from being saved and repacked.
      </Alert>
      </figcaption>
  </figure>
