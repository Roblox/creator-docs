---
title: Apply deformation
description: Deform a caged mesh onto a target shape with a WrapLayer, the basis of layered accessories.
---

Once a target caged mesh and a layered caged mesh are imported into your experience, you can apply a deformation by parenting both `Class.MeshPart|MeshParts` within a `Class.Model` and adding a `Class.WeldConstraint`.

<img src="../../../assets/modeling/cage-meshes/Apply-Deformation-Hero.png" alt="A grey twisted target, a red-and-white checker cube, and the checker cube reshaped to match the twisted target, in Studio." />

## Deform a mesh

Download the reference files to follow along. The Blender project contains every shape, and each `.fbx` imports as a ready-made target or layered mesh with its cages.

<table>
<thead>
  <tr>
    <th><b>File</b></th>
    <th><b>Description</b></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><a href="../../../assets/modeling/meshes/reference-files/Cage-Mesh-Examples.blend" download>Cage-Mesh-Examples.blend</a></td>
    <td>A Blender project containing every target and layered mesh in this guide, with their cages.</td>
  </tr>
  <tr>
    <td><a href="../../../assets/modeling/meshes/reference-files/Cube_Target.fbx" download>Cube_Target.fbx</a></td>
    <td>A cube target, ready to import as a `Class.MeshPart` with a `Class.WrapTarget`.</td>
  </tr>
  <tr>
    <td><a href="../../../assets/modeling/meshes/reference-files/Sphere_Target.fbx" download>Sphere_Target.fbx</a></td>
    <td>A sphere target, ready to import as a `Class.MeshPart` with a `Class.WrapTarget`.</td>
  </tr>
  <tr>
    <td><a href="../../../assets/modeling/meshes/reference-files/Cube-Flattened_Target.fbx" download>Cube-Flattened_Target.fbx</a></td>
    <td>A flattened cube target, ready to import as a `Class.MeshPart` with a `Class.WrapTarget`.</td>
  </tr>
  <tr>
    <td><a href="../../../assets/modeling/meshes/reference-files/Layered-Mesh1.fbx" download>Layered-Mesh1.fbx</a></td>
    <td>A layered mesh with inner and outer cages, ready to import as a `Class.MeshPart` with a `Class.WrapLayer`.</td>
  </tr>
  <tr>
    <td><a href="../../../assets/modeling/meshes/reference-files/Layered-Mesh2.fbx" download>Layered-Mesh2.fbx</a></td>
    <td>A second layered mesh, ready to import as a `Class.MeshPart` with a `Class.WrapLayer`.</td>
  </tr>
</tbody>
</table>

1. Ensure that your workspace includes two 3D objects: a target `Class.MeshPart` and a layered `Class.MeshPart`.
   1. Confirm the target has a `Class.WrapTarget` and the deforming mesh has a `Class.WrapLayer`.

      <GridContainer numColumns="2">
        <figure>
          <img src="../../../assets/modeling/cage-meshes/WrapTarget-Explorer.png" width="90%" alt="The Studio Explorer showing the target MeshPart with a child WrapTarget object." />
          <figcaption>Target: a `Class.WrapTarget`</figcaption>
        </figure>
        <figure>
          <img src="../../../assets/modeling/cage-meshes/WrapLayer-Explorer.png" width="90%" alt="The Studio Explorer showing the layered MeshPart with a child WrapLayer object." />
          <figcaption>Deforming mesh: a `Class.WrapLayer`</figcaption>
        </figure>
      </GridContainer>

   2. (Optional) If testing or applying multiple deformations, make a copy of your layered mesh to ensure you have an original copy later.

2. In the Explorer, parent both target and layered `Class.MeshPart|MeshParts` in one `Class.Model`.

   <img src="../../../assets/modeling/cage-meshes/Group-And-Align.png" width="320" alt="The Studio Explorer showing the target and layered MeshParts grouped in one Model." />

3. Add a `Class.WeldConstraint` to the layered `Class.MeshPart`, then:
   1. Set `Part0` to the layered mesh.
   2. Set `Part1` to the target mesh.

   <img src="../../../assets/modeling/cage-meshes/WeldConstraint-First-Layer.png" width="440" alt="The WeldConstraint properties with Part0 set to the layered mesh and Part1 set to the target." />

4. In the Properties window, change `Class.WrapLayer.Order` from the default value to another number, such as `2` or `5`.
   1. Changing this property triggers the deformation in the 3D workspace so the layered mesh reshapes to match the shape of the target.
   2. If the order is incorrect with other layers, such as a T-shirt wrapping over a sweater, you can change this property at any time.

   <img src="../../../assets/modeling/cage-meshes/WrapLayer-Order-Property.png" width="440" alt="The WrapLayer properties with the Order property set." />

5. (Optional) The deformation is retained after it computes, so you can delete the duplicated layered mesh and the `Class.WeldConstraint` and reset `Class.WrapLayer.Order`, leaving a single deformed mesh. This is useful to simplify your workspace when applying multiple deformations.

   <img src="../../../assets/modeling/cage-meshes/Basic-Deformation.png" width="540" alt="A grey cube target beside the checker layered mesh deformed onto it, in Studio." />

6. Experiment further. Try deforming the reference layered meshes onto the other target shapes, or [deform multiple meshes onto a single target](#deform-multiple-meshes-to-a-single-target).

## Deform multiple meshes to a single target

You can continue to add layered meshes to a target by repeating the process of adding a layered mesh and a weld. Every time a layered mesh is added to a target, Roblox recalculates the surface of the mesh, allowing you to continually add to your target mesh.

<Alert severity='warning'>
Every mesh you layer onto a target must share the same UV layout as the target. Roblox pairs each layer to the target by UV, so mismatched UVs won't deform correctly.
</Alert>

1. With your existing deformed mesh in the workspace, add a new layered `Class.MeshPart` into your `Class.Model`.

   <img src="../../../assets/modeling/cage-meshes/Add-Second-WrapLayer.png" width="320" alt="The Studio Explorer showing a second layered MeshPart added to the Model alongside the first." />

2. Add a `Class.WeldConstraint` to the new layered `Class.MeshPart`, then:
   1. Set `Part0` to the original layered mesh.
   2. Set `Part1` to the new layered mesh.

   <img src="../../../assets/modeling/cage-meshes/WeldConstraint-Second-Layer.png" width="440" alt="The WeldConstraint properties with Part0 set to the first layered mesh and Part1 set to the second." />

3. Change `Class.WrapLayer.Order` in the Properties window. Changing this property triggers the deformation, and the mesh reshapes to match the target. Each layer's `Class.WrapLayer.Order` determines which one renders on top.

   <GridContainer numColumns="2">
     <figure>
       <img src="../../../assets/modeling/cage-meshes/Ordering-Example-1.png" alt="The second layer rendering on top of the first in Studio." />
       <figcaption>The first layer's `Class.WrapLayer.Order` is `1` and the second layer's is `2`, so the second layer renders on top.</figcaption>
     </figure>
     <figure>
       <img src="../../../assets/modeling/cage-meshes/Ordering-Example-2.png" alt="The first layer rendering on top of the second in Studio." />
       <figcaption>Updating the first layer's `Class.WrapLayer.Order` to `2`, and setting the second layer to `1`, brings the first layer on top.</figcaption>
     </figure>
   </GridContainer>

## Deform an accessory on an avatar

All Roblox avatars share the same standard body cage. Because cages pair by UV, an accessory caged to that shared layout fits every avatar body. Note that the example meshes in this guide use their own cages, so they aren't compatible with Roblox's standard body cage.

<GridContainer numColumns="2">
  <figure><img src="../../../assets/art/avatar/Cage-Mesh-Visual.png" alt="Head and upper-torso cage meshes shown as wireframes on an avatar." />  <figcaption>Head and Upper Torso cage mesh objects (wireframe)</figcaption></figure>

  <figure><img src="../../../assets/art/avatar/Cage-Mesh-Data-Model.png" width="100%" alt="The Explorer showing cage objects on each of the 15 avatar body parts." /><figcaption>Cage objects must exist for each of the 15 body parts</figcaption></figure>
</GridContainer>

When creating avatar characters and avatar accessories, a similar process of layering applies to a `Class.Humanoid` character's body cages, and the layered accessory pipeline composes the layered mesh automatically. This allows fitting across body types and transferring skinning data through `Class.WrapLayer.AutoSkin`.

<Alert severity="warning">
If you are creating your own custom non-Marketplace characters that utilize a unique cage / UV solution, see [Layered accessories on non-R15](../../../characters/appearance.md#layered-accessories-on-non-r15).
</Alert>

For an overview of creating your first layered accessory, see the following video:

<iframe width="800" height="450" src="https://www.youtube-nocookie.com/embed/C-DwGRBHvmE" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

<br /> For the full avatar workflow, see [Layered accessories](../../../avatar/layered-accessories/index.md), the [Accessory Fitting Tool](../../../avatar/accessory-fitting-tool.md), and [Automatic Skinning Transfer](../../../avatar/automatic-skinning-transfer.md).
