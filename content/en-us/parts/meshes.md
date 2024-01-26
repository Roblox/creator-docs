---
title: Meshes in Studio
description: Meshes are a collection of vertices, edges, and faces that make up 3D objects.
---

You can insert [creator-uploaded meshes](#inserting-meshes) or import [custom meshes](#importing-meshes) into Studio. Once added to your experience, you can access meshes in the [Toolbox](../projects/assets/toolbox.md) or [Asset Manager](../projects/assets/manager.md) and configure them in the following ways:

- [Add or update textures](#adding-textures) for the mesh through its `Class.MeshPart.TextureID|TextureID` or through [surface appearance](../art/modeling/surface-appearance.md).
- Configure [collision fidelity](#collision-fidelity) for your mesh object.
- Set the [level of detail](#level-of-detail) for your meshes to optimize for performance and visual quality.
- [Pose and animate](#posing-and-animating) your rigged meshes to add an extra level of visual customization to your models.

## Inserting Meshes

### Creator Store

You can browse thousands of user-uploaded meshes from the **Creator Store** tab of the [Toolbox](../projects/assets/toolbox.md).

1. Navigate to the [View](../studio/view-tab.md) tab and select **Toolbox**.

   <img src="../assets/studio/general/View-Tab-Toolbox.png" width="776" alt="Toolbox toggle button in Studio" />

1. From the **Creator Store** tab, select the category dropdown and choose **Meshes**.

   <img src="../assets/studio/toolbox/Creator-Store-Meshes.png" width="360" />

1. In the **Search** field, type anything you'd like to find.
1. Either click or drag-and-drop a mesh to insert it into the viewport.

### Asset Manager

Meshes that you've personally [imported](#importing-meshes) or those which were imported by [groups](../projects/groups.md) you belong to appear in the [Asset Manager](../projects/assets/manager.md).

1. Navigate to the **View** tab and select **Asset Manager**.

   <img src="../assets/studio/general/View-Tab-Asset-Manager.png" width="776" alt="Asset Manager toggle button in Studio" />

1. Open the **Meshes** folder, then either:

   - Drag-and-drop a mesh into the 3D viewport.
   - Right-click on a mesh and select **Insert**, or select **Insert With Location** if you'd like to preserve mesh location data that was stored during the [import](#importing-meshes) process.

## Importing Meshes

You can import custom meshes created through other applications through Studio's [3D&nbsp;Importer](../art/modeling/3d-importer.md) as `.fbx` or `.obj` files. All imported meshes must adhere to Studio's [mesh requirements](../art/characters/specifications.md).

<img src="../assets/studio/general/Home-Tab-Import-3D.png" width="715" />

<Alert severity='info'>
If you meet certain account requirements, you can sell your custom meshes as accessories on the [Marketplace](https://www.roblox.com/catalog). See [Avatar documentation](../avatar/index.md) for an overview of the avatar creation, uploading, and selling process.
</Alert>

### Bulk Import

You can bulk import custom meshes directly to your Toolbox or Asset Manager inventory. The bulk import feature doesn't support complex meshes such as those with rigging, skinning, or animation data. To import more than one asset through the [Asset Manager](../projects/assets/manager.md):

1. Click the **Bulk Import** button.

   <img src="../assets/studio/asset-manager/Import-Button.png" width="360" />

2. Select the meshes you want to import from your local machine, then click the **Open** button.
3. For each mesh you select, set the applicable options listed below and click **Apply**, or select **Apply&nbsp;All** to apply your choices to every mesh.

   - **Rescale if too large**
   - **Reverse inward-pointing mesh normals**
   - **Import file as single mesh**

   <Alert severity="warning">
   If any child mesh contains more than 10,000 polygons, Studio rejects the parent mesh. If a parent mesh contains more than 50 child meshes, Studio rejects all of its children meshes.
   </Alert>

After a moment, the meshes display with a status icon. Successfully imported meshes enter the moderation queue and are only visible to you within the **Meshes** folder of the [Asset Manager](../projects/assets/manager.md) and in the **Inventory** tab of the [Toolbox](../projects/assets/toolbox.md).

## Adding Textures

### Image Textures

Image textures wrap around a 3D mesh. Most meshes already include textures, although textures can be changed or altered by changing the **TextureID** field to an appropriate image asset ID.

To apply a mesh texture in Studio:

1. Within the [Explorer](../studio/explorer.md) window, select the `Class.MeshPart` object.
2. In the [Properties](../studio/properties.md) window, select the **TextureID** field.

   <img src="../assets/modeling/meshes/Properties-TextureID.png"
   width="320" />

3. Enter a new texture ID or locate a specific texture.

### Surface Appearance

You can use the `Class.SurfaceAppearance` instance to override a mesh's `Class.MeshPart.TextureID|TextureID` with advanced PBR textures, including color, normal, metal, and roughness maps. See [Surface Appearance](../art/modeling/surface-appearance.md) for details.

<GridContainer numColumns="4">
  <figure>
    <img src="../assets/modeling/surface-appearance/SurfaceAppearance-ColorMap-After.jpg" />
    <figcaption>ColorMap</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/surface-appearance/SurfaceAppearance-NormalMap-After.jpg" />
    <figcaption>NormalMap</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/surface-appearance/SurfaceAppearance-MetalnessMap-After.jpg" />
    <figcaption>MetalnessMap</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/surface-appearance/SurfaceAppearance-RoughnessMap-After.jpg" />
    <figcaption>RoughnessMap</figcaption>
  </figure>
</GridContainer>

## Collision Fidelity

The `Class.MeshPart.CollisionFidelity|CollisionFidelity` property determines how closely the visual representation of a mesh matches its physical bounds. It has the following options, in order of fidelity and performance impact from lowest to highest:

- **Box** — Creates a bounding collision box, ideal for small or non-interactive objects.
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

<Alert severity="info">
To visualize collision fidelity in Studio, open **File** > **Studio Settings** > **Studio** > **Visualization**, then enable **Show Decomposition Geometry**.
</Alert>

For more information on the performance impact of collision fidelity options and how to mitigate them, see [Performance Optimization](../projects/performance-optimization/computation.md#physics). For an in-depth walkthrough on how to choose a collision fidelity option that balances your precision and performance requirements, see [Set Physics and Rendering Parameters](../tutorials/environmental-art/assemble-an-asset-library.md#collisionfidelity).

## Level of Detail

By default, meshes will always display in precise fidelity, no matter how far they are from the camera, but you can dynamically control a mesh's level of detail through its `Enum.RenderFidelity` property. Setting less important meshes to a lower render fidelity will improve an experience's performance if you have many detailed meshes. When it is set to **Automatic**, the mesh renders at a different level
of detail depending on its distance from the camera:

<table>
<thead>
  <tr>
    <th>Distance&nbsp;From&nbsp;Camera</th>
    <th>Render Fidelity</th>
    <th>Example</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Less than 250 studs</td>
    <td>Highest</td>
    <td><img src="../assets/modeling/meshes/Render-Fidelity-High.jpg" width="200" /></td>
  </tr>
  <tr>
    <td>250-500 studs</td>
    <td>Medium</td>
    <td><img src="../assets/modeling/meshes/Render-Fidelity-Medium.jpg" width="200" /></td>
  </tr>
  <tr>
    <td>500 or more studs</td>
    <td>Lowest</td>
    <td><img src="../assets/modeling/meshes/Render-Fidelity-Low.jpg" width="200" /></td>
  </tr>
</tbody>
</table>

## Posing and Animating

Rigged meshes contain `Class.Bone` instances that you can rotate and position to articulate your mesh at different points. These bones and their inherited influences are identical to their Blender or Maya counterparts.

To pose a rigged mesh in Studio:

1. In the **Explorer** window, select the imported mesh and expand its child instances to access the bones.
2. Select a bone and rotate it to pose the model along the created bone joints.

   <video controls src="../assets/modeling/skinned-meshes/Transform-Demo-Skinned.mp4" width="100%"></video>

You can animate a rigged mesh using the [Animation Editor](../animation/editor.md), and the mesh object's `Class.Bone|Bones` display as options you can add to the animation track.

To animate a rigged mesh in Studio:

1. Open the [Animation Editor](../animation/editor.md).

   <img controls src="../assets/studio/general/Avatar-Tab-Animation-Editor.png" width="760" />

2. Select the mesh object in the workspace.
3. In the **timeline**, navigate to the &CirclePlus; icon and click **Add&nbsp;All** to add all the created bones to the animation.

   <img controls src="../assets/modeling/skinned-meshes/Animation-Editor-Add-Tracks.png" width="600" />

4. Test and animate your new rig by applying transforms to the specific bones you've created. See [Animation](../animation/index.md) for additional instructions on animating.

   <video controls src="../assets/modeling/skinned-meshes/Transform-Demo-AE.mp4" width="100%"></video>
