---
title: Parts
description: Parts are Roblox's primary building blocks.
---

`Class.Part|Parts` are descendants of the `Class.BasePart` class and are Roblox's
primitive building blocks with properties like position, size, orientation, and
color. You can use basic parts as is, or you can apply [solid
modeling](/parts/solid-modeling) operations to combine parts into more complex
shapes.

For advanced and intricate 3D models, you can also import third-party model
files as `Class.MeshPart|MeshParts` as outlined in [Meshes](../parts/meshes.md).

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/modeling/parts/Basic-Part-Sphere.png" />
    <figcaption>Basic sphere part</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/parts/Part-Example-CSG.jpg" />
    <figcaption>Bowl created with solid modeling</figcaption>
  </figure>
	<figure>
    <img src="../assets/modeling/parts/Mesh-Example.jpg" />
    <figcaption>Mesh with texture</figcaption>
  </figure>
</GridContainer>

By default, parts are rigid bodies that follow real-world physical mechanics,
including gravity, collision, and momentum. You can connect related parts
together as a single [**assembly**](../physics/assemblies.md) using a
`Class.WeldConstraint`, or a joint like `Class.Motor6D` or `Class.Bone`. As an
assembly, the connected parts act as a single rigid entity, referencing a common
position, orientation, and scale.

You can use a `Class.Model` container to group related parts together and access
the group as a single assembly in the [Explorer](../studio/explorer.md). See
[Models](../parts/models.md) for more information.

## Basic Part Types

`Class.Part` objects can take the shape of blocks, spheres, cylinders, wedges, or corner wedges. In addition, `Class.TrussPart` acts as a truss beam that characters can climb like a ladder.

<table>
<thead>
<tr>
<th><center>Block</center></th>
<th><center>Sphere</center></th>
<th><center>Cylinder</center></th>
<th><center>Wedge</center></th>
<th><center>Corner Wedge</center></th>
</tr>
</thead>
<tbody>
<tr>
<td><img src="../assets/modeling/parts/Basic-Part-Block.png" alt="Block part" /></td>
<td><img src="../assets/modeling/parts/Basic-Part-Sphere.png" alt="Sphere part" /></td>
<td><img src="../assets/modeling/parts/Basic-Part-Cylinder.png" alt="Cylinder part" /></td>
<td><img src="../assets/modeling/parts/Basic-Part-Wedge.png" alt="Wedge part" /></td>
<td><img src="../assets/modeling/parts/Basic-Part-Corner-Wedge.png" alt="Corner Wedge part" /></td>
</tr>
</tbody>
</table>

## Part Properties

Each part has a variety of properties that you can customize through the [Properties](../studio/properties.md) window.

<img src="../assets/studio/properties/Sections-Example.png" width="320" />

The following are commonly utilized properties:

- `Class.BasePart|Anchored` controls if
  physics affects the position of the part. When this property is set to true, the part
  never changes position due to gravity or any other force.
  You should anchor most parts in your experience, otherwise gravity and physics
  affect your parts as soon as the experience begins, and this might lead to
  unwanted changes to your scenery and props.
- `Class.BasePart|CanCollide` controls
  whether or not a part can collide with other parts. When this property is
  set to true, the part is impenetrable and the physics engine accounts for it within your
  experience.
  Conversely, when this property is set to false, the part can pass through anything,
  and the physics engine does **not** account for it.
- `Class.BasePart|Transparency` sets
  a part's visibility to any value between the default value of 0 (fully visible) and 1 (fully transparent).
  If you have many partially transparent parts, they can slow down performance. To
  alleviate this, merge them using <a href="../parts/solid-modeling.md">solid modeling</a>.

## Inserting Parts

The **Part** button inserts a new part into the workspace. Clicking the small dropdown arrow on the button lets you select either **Block**, **Sphere**, **Wedge**, **Corner&nbsp;Wedge**, or **Cylinder**.

<img src="../assets/studio/general/Model-Tab-Part-Tools.png" width="826" alt="Part menu indicated in Model tab" />

<Alert severity="info">
To insert a `Class.TrussPart` (not available on the insertion menu), use the [Explorer](../studio/explorer.md) as outlined [here](../studio/explorer.md#inserting-and-parenting).
</Alert>

## Selecting Parts

As you hover over parts in the viewport, they are outlined to indicate their potential selection. You can select an outlined part by clicking it, or you can select multiple parts by holding <kbd>Shift</kbd>, <kbd>Ctrl</kbd>, or <kbd>⌘</kbd> as you hover over and click them.

See [here](../studio/ui-overview.md#selecting-objects) for advanced methods of selecting parts in the 3D viewport.

## Manipulating Parts

You can move, scale, and rotate selected parts either through modeling tools or by setting a new position, size, or orientation in the [Properties](#part-properties) window.

When using the tools, you can move, scale, or rotate parts in either **world** orientation or **local** orientation by pressing <kbd>Ctrl</kbd><kbd>L</kbd> on Windows or <kbd>⌘</kbd><kbd>L</kbd> on Mac. When you enable local orientation,
the arrow axis indicators change to a part's local orientation, and an **L** indicator displays. For more information, see [Object and World Space](../workspace/index.md).

<Tabs>
  <TabItem label="World">
    <img src="../assets/modeling/parts/Manipulate-World-Orientation.png" width="480" alt="Part draggers in World orientation mode" />
  </TabItem>
  <TabItem label="Local">
    <img src="../assets/modeling/parts/Manipulate-Local-Orientation.png" width="480" alt="Part draggers in Local orientation mode" />
  </TabItem>
</Tabs>

### Moving Parts

Parts move on the **X** (red), **Y** (green), and **Z** (blue) axes. You can move a part to a new position using the **Move** tool.

1. In the **Tools** section, select the **Move** tool, then select the part you want to move.

   <img src="../assets/studio/general/Model-Tab-Move.png" width="830" alt="Move tool indicated in Model tab" />

2. Click and drag the arrow that is pointing in the direction you want to move the part.

   <img src="../assets/modeling/parts/Manipulate-Move.png" width="600" />

### Scaling Parts

Parts scale on the **X** (red), **Y** (green), and **Z** (blue) axes. You can make a part larger or smaller by using the **Scale** tool.

1. In the **Tools** section, select the **Scale** tool, then select the part you want to scale.

   <img src="../assets/studio/general/Model-Tab-Scale.png" width="830" alt="Scale tool indicated in Model tab" />

2. Click and drag a ball to scale the part in that direction.

   <img src="../assets/modeling/parts/Manipulate-Scale.png" width="600"
   />

### Rotating Parts

Parts rotate on the **X** (red), **Y** (green), and **Z** (blue) axes. You can rotate a part to a new angle using the **Rotate** tool.

1. In the **Tools** section, select the **Rotate** tool, then select the part you want to rotate.

   <img src="../assets/studio/general/Model-Tab-Rotate.png" width="830" alt="Rotate tool indicated in Model tab" />

2. Click and drag a circle to rotate the part in that direction.

   <img src="../assets/modeling/parts/Manipulate-Rotate.png" width="600" />

## Coloring Parts

While a part is gray by default, you can change it to any color through the following methods.

### Hexagon Map

Clicking the small dropdown arrow on the **Color** button reveals a hexagonal color picker and, by default, applies the chosen color to all selected parts. You can also apply a chosen color as a painting tool by toggling on **Color Action as Tool** and clicking specific parts in the 3D viewport.

<img src="../assets/studio/general/Model-Tab-Color-Tools.png" width="770" alt="Color button indicated in Model tab" />

<img src="../assets/studio/general/Hexagon-Color-Picker.png"
	width="380" />

### Colors Popup

The **Colors** popup allows you to set a color through your operating system's color picker widget. To access it, navigate to the [Properties](../studio/properties.md) window and click the small box to the left of the `Class.BasePart.Color|Color` property.

<img src="../assets/studio/properties/Color-Picker.png"
width="320" />

### RGB Value

To define a specific RGB color value for a part, enter an RGB value into the
`Class.BasePart.Color|Color` property field.

<img src="../assets/studio/properties/Color-RGB-Entry.png"
	width="320" />

## Applying Materials

Similar to [color](#coloring-parts), you can customize a part's **material** to simulate real-world materials such as wood, glass, or fabric. When selecting a material, consider the following:

- **Material affects the physical traits of a part, not just its appearance**. For example, the **Concrete** material is heavier than the **Plastic** material, so a concrete brick will have higher density than a plastic brick and sink in water faster.

- Some materials have special physical effects. For example, parts will appear to glow if they are set to the **Neon** material.

  <GridContainer numColumns="2">
    <figure>
      <img src="../assets/modeling/parts/Material-SmoothPlastic.png" />
      <figcaption>SmoothPlastic</figcaption>
    </figure>
    <figure>
      <img src="../assets/modeling/parts/Material-Neon.jpg" />
      <figcaption>Neon</figcaption>
    </figure>
  </GridContainer>

See [Materials](../parts/materials.md) for more information on how to apply both
default and custom materials to parts.
