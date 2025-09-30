---
title: Meshes
description: Meshes are a collection of vertices, edges, and faces that make up 3D objects.
---

`Class.MeshPart` objects are descendants of the `Class.BasePart` class. They represent **meshes**, which are collections of vertices, edges, and faces that make up a 3D object. Unlike parts, which you can directly create in Studio, you need to use a third-party modeling application like Blender or Maya to create meshes, then import them into Studio as `Class.MeshPart` objects.

After importing a mesh into Studio, you can customize its rendering properties, such as textures, level of detail, and collision fidelity. In addition to importing your own meshes, you can also browse and select from user-uploaded meshes using the [Creator Store](../production/creator-store.md).

Roblox supports many types of meshes, as long as they adhere to the [general mesh specifications](../art/modeling/specifications.md). A basic mesh consists of at least one mesh object and one texture:

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/art/Basic-Mesh-Example.png" alt="A tree mesh object without a texture." />
    <figcaption>A mesh object sets the shape and geometry of the 3D object</figcaption>
  </figure>
  <figure>
    <img src="../assets/art/Basic-Texture-Example.png" alt="The texture image map for the leaves of the tree in the previous image." />
    <figcaption>A texture image map applies a surface appearance and color</figcaption>
  </figure>
  <figure>
    <img src="../assets/art/Basic-Mesh-Combined-Example.png" alt="A tree mesh object with the leaves texture applied." />
    <figcaption>The mesh and texture combine to make a unique custom 3D object</figcaption>
  </figure>
</GridContainer>

Studio also supports meshes with components for creating avatar character models or accessories, such as [rigging and skinning](#rigging-and-skinning) data.

<Alert severity='info'>
You can sell `Class.MeshPart` assets as avatar bodies, accessories, and clothing on the Marketplace. See [Avatar](../avatar/index.md) for more information.
</Alert>

## Import meshes

You can import meshes into Studio using the [3D Importer](../art/modeling/3d-importer.md). With this tool, you can preview and examine meshes before importing them into your workspace or **Toolbox**, such as verifying texture, rigging, skinning, and animation data. It also flags issues and rejects meshes with error.

If the mesh file you are importing contains objects using specific naming conventions or contains facial animation data, the 3D Importer automatically detects and converts them into the following objects instead of `Class.MeshPart`:

- `Class.Attachment` — Objects with `_Att` at the end of their names.
- `Class.WrapTarget` — Objects with `_OuterCage` at the end of their names.
- `Class.WrapLayer` — Objects with both `_InnerCage` `_OuterCage` at the end of their names.
- `Class.FaceControls` — Objects containing avatar character heads and the appropriate facial animation data.

If you want to bulk-import meshes along with non-3D assets, such as images and audio, you can use the [Asset Manager](../projects/assets/manager.md); note, however, that it doesn't support importing meshes with rigging, skinning, and animation data, accessories, or characters with facial animations.

## Customize meshes

Unlike basic parts, meshes have more customization options that you can adjust for advanced rendering fidelity.

### Texture

**Textures** contribute to the visual appearance of meshes by adding 2D details such as color and patterns. Studio allows you to either apply one texture using the `Class.MeshPart.TextureID` property, or apply up to four physically-based rendering (PBR) textures within a `Class.SurfaceAppearance` child object of the mesh or made with a `Class.MaterialVariant` and set in the mesh's `Class.MeshPart.MaterialVariant` property. PBR textures allow you to represent realistic shading and lighting by using multiple types of texture images, or maps, on a single object.

<Tabs>
<TabItem label="PBR Textures">
Studio supports four PBR texture maps, each corresponding to a visual characteristic of an object's surface appearance. Combining multiple texture maps can more accurately simulate color, roughness, and reflectivity in any lighting environment, and enhance the visual elements of your assets and environment. For more information on PBR textures and the texture maps, see [PBR Textures](../art/modeling/surface-appearance.md).

<GridContainer numColumns="2">
  <img src="../assets/modeling/surface-appearance/SurfaceAppearance-Example-1.jpg" alt="Example of SurfaceAppearance applied to a Bush Mesh" />
  <img src="../assets/modeling/surface-appearance/SurfaceAppearance-Example-3.jpg" alt="Example of SurfaceApperance applied to a Rock Mesh" />
</GridContainer>

You can apply PBR textures using one of the following objects:

- `Class.SurfaceAppearance` — Applies PBR textures to the mesh surface and doesn't affect its geometry.
- `Class.MaterialVariant` — Represents a custom material that not only applies PBR textures to the mesh surface but also adds physical properties.

To add PBR textures to a mesh:

<Tabs>
<TabItem label="SurfaceAppearance">
1. In the [Explorer](../studio/explorer.md) window, hover over the `Class.MeshPart` object. Click the **⊕** button and select `Class.SurfaceAppearance`.
2. In the [Properties](../studio/properties.md) window, edit the properties corresponding to the PBR texture maps.
</TabItem>
<TabItem label="MaterialVariant">
1. In the [Explorer](../studio/explorer.md) window, hover over the `Class.MaterialService`. Click the **⊕** button and select `Class.MaterialVariant`.
2. In the [Properties](../studio/properties.md) window, edit the properties corresponding to the PBR texture maps.
3. Name the new `Class.MaterialVariant` to a name of your choice.
4. Select the `Class.MeshPart` and, in the [Properties](../studio/properties.md) window, set the `Class.MaterialVariant` to the one you just created.
</TabItem>
</Tabs>

<Alert severity="info">
If you both add `Class.SurfaceAppearance` as a child object and set the `Class.MaterialVariant` in the mesh's properties, Studio only applies the texture map settings of the `Class.SurfaceAppearance` object to the mesh. The mesh still has all other settings of the `Class.MaterialVariant` object, such as custom physical properties.
</Alert>

</TabItem>
<TabItem label="Single Texture">
If the mesh you import to Studio doesn't come with texture data, or you want to change the existing texture, use the following steps to add a single texture:

1. [Import the texture file](../projects/assets/manager.md#asset-import). The file must follow the [texture specifications](../art/modeling/texture-specifications.md). Upon completion, Studio automatically assigns and prompts an asset ID.
2. Copy the asset ID.
3. In the **Explorer** window, select the **MeshPart** object.
4. In the **Properties** window, select the **TextureID** field and paste the asset ID of the texture.

<Alert severity="warning">
If your mesh has existing PBR textures, setting a Texture ID can't override the PBR textures.
</Alert>

</TabItem>
</Tabs>

### Level of detail

You can dynamically control a mesh's level of detail using its `Enum.RenderFidelity` property. The default value is `Enum.RenderFidelity.Automatic|Automatic`, meaning the mesh's detail is based on its distance from the camera as outlined in the following table.

<table>
<thead>
  <tr>
    <th>Distance&nbsp;from&nbsp;camera</th>
    <th>Render fidelity</th>
    <th>Example</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Less than 250 studs</td>
    <td>Highest</td>
    <td><img src="../assets/modeling/meshes/Render-Fidelity-High.jpg" alt="A potion mesh object that is rendered in the highest level of detail." width="200" /></td>
  </tr>
  <tr>
    <td>250-500 studs</td>
    <td>Medium</td>
    <td><img src="../assets/modeling/meshes/Render-Fidelity-Medium.jpg" alt="A potion mesh object that is rendered in a medium level of detail. Its edges are more jagged than the previous image." width="200" /></td>
  </tr>
  <tr>
    <td>500 or more studs</td>
    <td>Lowest</td>
    <td><img src="../assets/modeling/meshes/Render-Fidelity-Low.jpg" alt="A potion mesh object that is rendered in the lowest level of detail. Its edges are more jagged than the previous image, and the liquid is no longer shiny." width="200" /></td>
  </tr>
</tbody>
</table>

### Collision fidelity

**Collision fidelity** determines how closely the visual representation of a mesh matches its physical bounds. The `Class.MeshPart.CollisionFidelity` property has the following options, in order of fidelity and performance impact from lowest to highest:

- **Box** — Creates a bounding collision box, ideal for small or non‑interactive objects.
- **Hull** — Generates a convex hull, suitable for objects with less pronounced indentations or cavities.
- **Default** — Produces an approximate collision shape that supports concavity, suitable for complex objects with semi-detailed interaction needs.
- **PreciseConvexDecomposition** — Offers the most precise fidelity but still not a 1:1 representation of the visual. This option has the most expensive performance cost and takes longer for the engine to compute.

<Tabs>
  <TabItem label="Original Mesh">
    <img src="../assets/physics/collisions/Collision-Fidelity-MeshPart.jpg" width="600" height="500" alt="Original mesh of castle tower" />
  </TabItem>
	<TabItem label="Default">
    <img src="../assets/physics/collisions/Collision-Fidelity-Default.jpg" width="600" height="500" alt="Collision fidelity of Default shown for mesh" />
  </TabItem>
  <TabItem label="Box">
    <img src="../assets/physics/collisions/Collision-Fidelity-Box.jpg" width="600" height="500" alt="Collision fidelity of Box shown for mesh"/>
  </TabItem>
	<TabItem label="Hull">
    <img src="../assets/physics/collisions/Collision-Fidelity-Hull.jpg" width="600" height="500" alt="Collision fidelity of Hull shown for mesh" />
  </TabItem>
	<TabItem label="Precise">
    <img src="../assets/physics/collisions/Collision-Fidelity-Precise.jpg" width="600" height="500" alt="Collision fidelity of PreciseConvexDecomposition shown for mesh" />
  </TabItem>
</Tabs>

<Alert severity="success">
To view collision fidelity in Studio, toggle on **Collision&nbsp;fidelity** from the [Visualization&nbsp;Options](../studio/ui-overview.md#visualization-options) widget in the upper‑right corner of the 3D viewport.
</Alert>

For more information on the performance impact of collision fidelity options and how to mitigate them, see [Improve performance](../performance-optimization/improve.md#physics-computation). For an in-depth walkthrough on how to choose a collision fidelity option that balances your precision and performance requirements, see [Set physics and rendering parameters](../tutorials/curriculums/environmental-art/optimize-your-experience.md#review-physics-and-rendering-parameters).

## Rigging and skinning

**Rigging** is the process of connecting a mesh with an internal poseable skeleton rig. Rigged meshes allow mesh surfaces to rotate and move using internal bones within a model, such as a character's knee or elbow. **Skinning** a rigged mesh allows the rigged mesh object to deform, stretch, and bend in a more realistic manner.

<GridContainer numColumns="2">
  <figure>
    <video controls src="../assets/modeling/skinned-meshes/Head-Rigid-Example.mp4"></video>
    <figcaption>Without skinning, the entire head mesh rotates on a single axis</figcaption>
  </figure>
  <figure>
    <video controls src="../assets/modeling/skinned-meshes/Head-Skinned-Example.mp4"></video>
    <figcaption>With skinning, the head mesh bends naturally at the neck, and the bottom of the neck stays connected to the torso</figcaption>
  </figure>
</GridContainer>

For more information on rigging and skinning, see [Rigging and skinning](../art/modeling/rigging.md). After rigging a mesh, you can add animation and poses to it using the **Animation Editor**. See [Create an animation](../animation/editor.md#create-an-animation) for more information. Marketplace 3D assets, such as avatar clothing and bodies, also require rigging and skinning. See [Avatar](../avatar/index.md) for more information on requirements for Marketplace assets.
