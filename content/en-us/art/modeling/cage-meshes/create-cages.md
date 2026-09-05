---
title: Create cages in Blender
description: Author outer and inner cage meshes for a model in Blender so Studio can reshape and layer it with cage meshes.
---

A **cage mesh** allows you to define an invisible surface for a visible render mesh. In Studio, you can combine cage meshes to wrap, stretch, shrink, or otherwise deform a mesh over a target mesh.

You must create these types of deformable meshes using a third-party modeling tool, such as [Blender](https://www.blender.org) or [Maya](https://www.autodesk.com/products/maya/overview), and import them into Studio. This tutorial uses Blender and provides a [Blender project file](#create-a-cage) as reference.

<img src="../../../assets/modeling/cage-meshes/Blender-Cage-Mesh-Hero.png" alt="A checker-textured cube render mesh in Blender beside a wireframe copy that a cage has reshaped into a twist." />

At a minimum, cage meshes require a `Class.WrapTarget` and a `Class.WrapLayer` to interact. For a breakdown on the two types of cage meshes, see [Cage types](#cage-types).

## Cage types

When working with caged meshes, there are two types of meshes: a **target mesh** and a **layered mesh**.

<GridContainer numColumns="3">
  <figure>
    <img src="../../../assets/modeling/cage-meshes/Target-Mesh-Example.png" alt="A plain grey twisted shape in Studio: the target mesh a layered mesh deforms toward." />
    <figcaption>Target mesh</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/modeling/cage-meshes/Layered-Mesh-Example.png" alt="A red-and-white checker cube in Studio: the layered mesh in its authored shape, before deformation." />
    <figcaption>Layered mesh</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/modeling/cage-meshes/Composed-Mesh-Example.png" alt="The checker cube reshaped into the twisted target shape in Studio: the composed result." />
    <figcaption>Composed result</figcaption>
  </figure>
</GridContainer>

<table>
<thead>
  <tr>
    <th>Caged mesh type</th>
    <th>Configuration in Blender</th>
    <th>Naming requirement</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><b>Target mesh</b><br /><br />The base mesh that a layered mesh deforms to.</td>
    <td>
      <img src="../../../assets/modeling/cage-meshes/Blender-Outliner-Target.png" width="240" alt="The Blender Outliner showing a Cube-Target group with a Cube render mesh and a Cube_OuterCage cage." />
      <ul>
        <li>A rendered mesh object.</li>
        <li>An outer cage mesh object.</li>
        <li>A UV map that matches any layered meshes that will wrap and deform over the target.</li>
      </ul>
    </td>
    <td>Name the cage after the render mesh with the `_OuterCage` suffix, such as `Cube_OuterCage`.<br /><br />An `_OuterCage` on its own imports as a `Class.WrapTarget`.</td>
  </tr>
  <tr>
    <td><b>Layered mesh</b><br /><br />Wraps and fits around a target mesh.</td>
    <td>
      <img src="../../../assets/modeling/cage-meshes/Blender-Outliner-Layer.png" width="240" alt="The Blender Outliner showing a Layered-Mesh group with a Layered-Mesh render mesh and its Layered-Mesh_InnerCage and Layered-Mesh_OuterCage cages." />
      <ul>
        <li>A rendered mesh object.</li>
        <li>An inner cage mesh object.</li>
        <li>An outer cage mesh object.</li>
      </ul>
    </td>
    <td>Name each cage after the render mesh with the `_InnerCage` and `_OuterCage` suffixes, such as `Shirt_InnerCage` and `Shirt_OuterCage`. <br /><br />The two cage meshes together import as a `Class.WrapLayer`.</td>

  </tr>
</tbody>
</table>

## Create a cage

Create your cage meshes after you finalize your render mesh. If you later change the render mesh topology or its UVs, you might need to readjust the cage.

As a reference, download the <a href="../../../assets/modeling/meshes/reference-files/Cage-Mesh-Examples.blend" download>.blend</a> project to see these exact models and other examples. This project contains three target cage mesh configurations and two layered cage mesh configurations.

<img src="../../../assets/modeling/cage-meshes/Blender-Project-Outliner.png" width="360" alt="The Blender Outliner for the reference project, showing three target meshes (cube, flattened, and sphere) and two layered meshes, each with its cages." />

### Cage a target mesh

The following example creates an outer cage on the standard Blender cube. The cube has 10 loop cuts on each axis, adding extra vertices for sculpting later.

To create the outer cage:

1. Duplicate your render mesh to use as the starting point for the cage. In this example, the cube is duplicated.
2. Rename the duplicate with the `_OuterCage` suffix, such as `Cube_OuterCage`.

   <img src="../../../assets/modeling/cage-meshes/Generic-Mesh-Rename.png" width="320" alt="The Blender Outliner showing a Cube render mesh with a Cube_OuterCage cage object beneath it." />

3. (Optional) Depending on the complexity of your rendered model, simplify the duplicate mesh to a low vertex count, since a cage should be a coarse shell rather than a detailed copy. For example, a detailed avatar head is caged with a far simpler mesh:

   <GridContainer numColumns="2">
     <figure><img src="../../../assets/modeling/cage-meshes/Head-Example.png" alt="A dense avatar character head render mesh in the Blender viewport." /><figcaption>An avatar character head mesh can include up to 12,000 vertices.</figcaption></figure>
     <figure><img src="../../../assets/modeling/cage-meshes/Cage-Example.png" width="100%" alt="The same avatar head's low-poly cage mesh in the Blender viewport." /><figcaption>An avatar character head cage only contains 335 vertices.</figcaption></figure>
   </GridContainer>

4. Adjust the cage so it sits just outside the render surface and fully encloses it, staying as close to the surface as possible for accurate layering. Switching to **Wireframe** viewport shading helps you see the render mesh underneath.

   <img src="../../../assets/modeling/cage-meshes/Generic-Mesh-Resize.png" width="540" alt="The outer cage, shown with a yellow selection outline, fully enclosing the cube render mesh in the Blender viewport." />

5. In the UV Editing tab, confirm the cage mesh has UV coordinates — you will need to ensure that any future layered mesh cages share the same UV mapping.

   <figure><img src="../../../assets/modeling/cage-meshes/UV-OuterCage.png" alt="The UV layout of the outer cage, matching the render mesh." /><figcaption>Outer cage UVs must match the UVs of any layered mesh cages that will deform onto it.</figcaption></figure>

6. Confirm your Outliner shows the render mesh with a single `_OuterCage` beneath it, matching the following configuration.

   <img src="../../../assets/modeling/cage-meshes/Blender-Outliner-Target.png" width="320" alt="The Blender Outliner showing a Cube-Target group with a Cube render mesh and a Cube_OuterCage cage." />

You can also cage a target with completely different geometry. As long as the cage mesh shares the same UV map, a layered mesh can deform onto it — this is what lets a single layered mesh fit many differently-shaped targets. The following twisted mesh, for example, uses the same UV layout as the cube, so the same layered mesh can deform onto both targets.

<figure>
  <img src="../../../assets/modeling/cage-meshes/Blender-Different-Target-Mesh-Example.png" alt="A twisted-cube target mesh in the Blender viewport beside its UV layout, which is identical to the cube target's UV layout." />
  <figcaption>A differently-shaped target whose cage shares the same UV layout.</figcaption>
</figure>

<Alert severity='error'>
Don't add or delete cage vertices after setting up a cage, and don't change its UVs. Destructive edits break vertex pairing and cause import errors or incorrect deformation.
</Alert>

### Cage a layered mesh

The layered mesh is the mesh you expect to deform to the shape of the target. A layered mesh requires both an inner and an outer cage: the **inner cage** defines the surface that conforms to the target, and the **outer cage** defines the surface that additional layers wrap over.

<Alert severity='info'>
It may be easiest to duplicate the cage mesh you created for the target mesh to ensure all your cage meshes have identical UVs. Remember you can change the geometry of your cage meshes, but not the UV mapping.
</Alert>

To create the inner and outer cages:

1. Duplicate your render mesh to use as the starting point for the inner cage.
   1. If you've already created your target cage mesh, make sure your layered cage's UVs match it.
2. Rename the duplicate with the `_InnerCage` suffix, such as `Layered-Mesh_InnerCage`.
3. Adjust the inner cage so it sits just inside the render surface.

   <img src="../../../assets/modeling/cage-meshes/Blender-InnerCage-Example.png" width="540" alt="The layered mesh's inner cage, shown as an orange wireframe, sitting against the render surface in the Blender viewport." />

4. Duplicate the `_InnerCage` and rename the copy with the `_OuterCage` suffix, such as `Layered-Mesh_OuterCage`.
5. Adjust the outer cage so it sits just outside the render surface and fully encloses it. The outer cage is the surface that additional layers wrap over.

   <img src="../../../assets/modeling/cage-meshes/Blender-OuterCage-Example.png" width="540" alt="The layered mesh's outer cage, shown as a wireframe, enclosing the render surface in the Blender viewport." />

6. Confirm both cages share the same UV layout as the target mesh, since Roblox pairs the layered mesh with the target by UV.
7. Confirm your Outliner shows the render mesh with both an `_InnerCage` and an `_OuterCage` beneath it, matching the following configuration.

   <img src="../../../assets/modeling/cage-meshes/Blender-Outliner-Layer.png" width="320" alt="The Blender Outliner showing a Layered-Mesh group with a Layered-Mesh render mesh and its Layered-Mesh_InnerCage and Layered-Mesh_OuterCage cages." />

### Layered accessories for avatars

Roblox avatar items, such as character bodies (target meshes) and Marketplace clothing (layered meshes), must all share a common cage to ensure universal compatibility with accessories and clothing. If you are creating avatars or layered accessories, **do not create your own cage meshes** — Roblox provides [downloadable cage templates](../../../avatar/resources.md#project-files) you can modify. Alternatively, you can use Roblox's [Avatar Setup tool](../../../avatar-setup/) to automatically generate a Roblox-supported cage for your accessories.

For more information on creating layered accessories, see the following resources:

- [Layered accessories overview](../../../avatar/layered-accessories/index.md)
- [Layered accessory caging best practices](../../../avatar/layered-accessories/caging-best-practices.md)

## Export and import

Before you export, apply the [correct export settings](../export-requirements.md#blender) for Studio. When exporting `.fbx`, set **Apply Scalings** to **FBX Unit Scale** so your model keeps the same scale in Studio. For more information, see [Adjust scale (FBX)](../../../art/blender.md#adjust-scale-fbx).

1. Export the render mesh and its cages together as a single `.fbx` or `.gltf` file. Studio imports cages from both formats equally, so use whichever your modeling application exports most reliably.
2. Import the file with the [3D Importer](../../../studio/importer.md) and make sure **Uses Cages** is enabled.
   1. If **Uses Cages** is not enabled by default, the 3D Importer may not be detecting your cage meshes. Double check the [naming requirements](#cage-types) and re-export.

   <img src="../../../assets/modeling/cage-meshes/Importer-Cages-Detected.png" width="800" alt="The 3D Importer preview showing the layered mesh with its inner and outer cages detected and Uses Cages enabled." />

3. After importing, confirm that Studio created the expected objects: a `Class.WrapTarget` for an outer-cage-only mesh, or a `Class.WrapLayer` for a mesh with both cages.

   <GridContainer numColumns="2">
     <figure>
       <img src="../../../assets/modeling/cage-meshes/Explorer-TargetMesh.png" alt="The Studio Explorer showing a Cube-Target model with a Cube MeshPart and a child WrapTarget object." />
       <figcaption>An outer-cage-only mesh imports with a `Class.WrapTarget`.</figcaption>
     </figure>
     <figure>
       <img src="../../../assets/modeling/cage-meshes/Explorer-LayerMesh.png" alt="The Studio Explorer showing a Layered-Mesh model with a Layered-Mesh MeshPart and a child WrapLayer object." />
       <figcaption>A mesh with both cages imports with a `Class.WrapLayer`.</figcaption>
     </figure>
   </GridContainer>

4. Once you have both a target (`Class.WrapTarget`) and a deforming mesh (`Class.WrapLayer`), see [Apply deformation](apply-deformation.md) to reshape the mesh onto the target.
