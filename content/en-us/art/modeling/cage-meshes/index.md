---
title: Cage meshes
description: Cage meshes are low-resolution surfaces that let one mesh reshape and layer over another, powering layered accessories.
---

**Cage meshes** are invisible surfaces of a `Class.MeshPart` that allow other supported meshes to stretch and deform over each other. With cage meshes, you can create a set of meshes that can dynamically resize, reshape, and layer over another mesh of any shape or size.

They power **layered accessories** — 3D accessories such as jackets, dresses, and cardigans that stretch to fit a character body and stack naturally on top of one another — and you can also apply them to any `Class.MeshPart`, as long as all the cage meshes [share the same UV mapping](#how-cages-pair).

<Tabs>
<TabItem label="Reshape volume">
<figure>
  <img src="../../../assets/modeling/cage-meshes/Outer-Cage-Hero.png" alt="A mesh's outer cage in Blender beside a plain cube and a checker mesh whose volume the cage has reshaped in Studio." />
  <figcaption>An outer cage is an invisible surface that can reshape a mesh's volume.</figcaption>
</figure>
</TabItem>
<TabItem label="Deform any shape">
<figure>
  <img src="../../../assets/modeling/cage-meshes/Cage-Intro-Hero.png" alt="A single source cube asset deformed onto several different target shapes — a diamond, a sphere, a cube, and twisted shapes — in Studio." />
  <figcaption>A single caged mesh deformed onto many differently-shaped targets.</figcaption>
</figure>
</TabItem>
<TabItem label="Layered accessories">
<figure>
  <img src="../../../assets/modeling/cage-meshes/Layered-Accessory-Hero.png" alt="An avatar wearing a layered red coat over a camo shirt, shown fitting across different body shapes." />
  <figcaption>Layered accessories stretch and stack to fit different avatar body shapes.</figcaption>
</figure>
</TabItem>
</Tabs>

A cage mesh is a simplified copy of a render mesh that defines a wrapping surface. Unlike Roblox's [collision system](../../../workspace/collisions.md), which works universally, cage meshes can only work with other paired cage meshes.

To fit one mesh over another, Roblox pairs the vertices of one cage with those of the other by their UV coordinates, then reshapes the render mesh so that its cage matches the target cage. Cage meshes are typically configured in a modeling tool such as [Blender](https://www.blender.org) or [Maya](https://www.autodesk.com/products/maya/overview).

<Alert severity='info'>
In specific cases, you can also create and reshape cage meshes programmatically at runtime, such as in experiences that let users build and customize avatar items. See [Avatar in-experience creation](../../../avatar/in-experience-creation.md).
</Alert>

## Cage mesh components

In Studio, cage meshes are children of a `Class.MeshPart` and are represented by descendants of the `Class.BaseWrap` class:

<table>
<thead>
  <tr>
    <th width="34%">Cage mesh type</th>
    <th width="33%">In Blender</th>
    <th width="33%">In Studio</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>
      `Class.WrapTarget`<br /><br />
      The initial caged surface that other paired cage meshes can target. <br /><br />Every caging deformation requires a target mesh.
    </td>
    <td>
      <img src="../../../assets/modeling/cage-meshes/Blender-Outliner-Target.png" width="240" alt="The Blender Outliner showing a render mesh with a single _OuterCage." /><br />
      A render mesh with a single `_OuterCage` mesh.
    </td>
    <td>
      <img src="../../../assets/modeling/cage-meshes/WrapTarget-Explorer.png" width="240" alt="The Studio Explorer showing a MeshPart with a child WrapTarget object." /><br />
      A `Class.MeshPart` with a child `Class.WrapTarget`.
    </td>
  </tr>
  <tr>
    <td>
      `Class.WrapLayer`<br /><br />
      Allows its parent `Class.MeshPart` to wrap around a `Class.WrapTarget`, such as a layered clothing accessory wrapping over an avatar body.<br /><br /> All targets and layers must share identical UVs.
    </td>
    <td>
      <img src="../../../assets/modeling/cage-meshes/Blender-Outliner-Layer.png" width="240" alt="The Blender Outliner showing a render mesh with an _InnerCage and an _OuterCage." /><br />
      A render mesh with an `_InnerCage` and an `_OuterCage` mesh.
    </td>
    <td>
      <img src="../../../assets/modeling/cage-meshes/WrapLayer-Explorer.png" width="240" alt="The Studio Explorer showing a MeshPart with a child WrapLayer object." /><br />
      A `Class.MeshPart` with a child `Class.WrapLayer`.
    </td>
  </tr>
</tbody>
</table>

Because a cage behaves like a component of its parent, a `Class.MeshPart` is the only valid parent for these objects. You author cage meshes alongside your render mesh in a modeling application like [Blender](https://www.blender.org) or [Maya](https://www.autodesk.com/products/maya/overview) and import them together.

<Alert severity='info'>
When you import a model that contains cage meshes, make sure **Uses Cages** is enabled in the [3D Importer](../../../studio/importer.md#import-settings) so that Studio detects the cages and creates the cage objects for you.
</Alert>

## How cages pair

Roblox pairs cages by their **UV coordinates** rather than by position, so any two cages that share a UV layout can wrap over each other, even when their shapes differ. This is what lets a single accessory fit bodies of completely different shapes and sizes without remodeling it for each one.

<img src="../../../assets/modeling/cage-meshes/UV-Map.png" width="360" alt="A shared UV layout in the Blender UV editor, laid out as an unwrapped cube cross." />

The following shapes are completely different, but they all share the identical UV map above, so a single layered mesh can deform onto any of them.

<GridContainer numColumns="3">
  <figure>
    <img src="../../../assets/modeling/cage-meshes/Cube-shape.png" alt="A cube in the Blender viewport." />
    <figcaption>Cube</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/modeling/cage-meshes/Sphere-shape.png" alt="A sphere in the Blender viewport." />
    <figcaption>Sphere — shaped from a cube</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/modeling/cage-meshes/Flatten-Shape.png" alt="A flattened, twisted shape in the Blender viewport." />
    <figcaption>Flattened — sculpted from a cube</figcaption>
  </figure>
</GridContainer>

## Create caged assets

Use the following guides to create caged assets. Each guide includes downloadable files and basic implementation steps to follow along.

- [Create cages in Blender](create-cages.md) — author the outer and inner cages for a model and import them into Studio.
- [Apply deformation](apply-deformation.md) — deform a caged mesh onto a target with a `Class.WrapLayer`.
- [Create your own layered accessory](../../../art/accessories/creating/index.md) — create a layered accessory using Roblox's provided reference cages.
