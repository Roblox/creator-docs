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
    <img src="../assets/modeling/parts/Basic-Part-Sphere.png" alt="A single gray sphere part" />
    <figcaption>Basic sphere part</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/parts/Part-Example-CSG.jpg"alt="A bright blue hollow bowl that was made with solid modeling operations."/>
    <figcaption>Bowl created with solid modeling</figcaption>
  </figure>
	<figure>
    <img src="../assets/modeling/parts/Mesh-Example.jpg" alt="A high-quality treasure chest mesh with a texture." />
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

<Grid container spacing={1}>
<Grid item xs={4} lg={2}>
	<figure>
	<img src="../assets/modeling/parts/Basic-Part-Block.png" alt="A single Block part." />
	<figcaption><center>Block</center></figcaption>
	</figure>
</Grid>
<Grid item xs={4} lg={2}>
	<figure>
	<img src="../assets/modeling/parts/Basic-Part-Sphere.png" alt="A single Sphere part." />
	<figcaption><center>Sphere</center></figcaption>
	</figure>
</Grid>
<Grid item xs={4} lg={2}>
	<figure>
	<img src="../assets/modeling/parts/Basic-Part-Cylinder.png" alt="A single Cylinder part." />
	<figcaption><center>Cylinder</center></figcaption>
	</figure>
</Grid>
<Grid item xs={4} lg={2}>
	<figure>
	<img src="../assets/modeling/parts/Basic-Part-Wedge.png" alt="A single Wedge part." />
	<figcaption><center>Wedge</center></figcaption>
	</figure>
</Grid>
<Grid item xs={4} lg={2}>
	<figure>
	<img src="../assets/modeling/parts/Basic-Part-Corner-Wedge.png" alt="A single Corner Wedge part." />
	<figcaption><center>Corner Wedge</center></figcaption>
	</figure>
</Grid>
</Grid>

## Part Properties

Each part has a variety of properties that you can customize through the [Properties](../studio/properties.md) window.

<img src="../assets/studio/properties/Sections-Example.png" alt="A close up view of the Properties window with the Appearance and Transform properties highlighted." width="320" />

The following are commonly utilized properties:

- `Class.BasePart|Anchored` controls if physics affects the position of the part. When this property is set to true, the part never changes position due to gravity or any other force. You should anchor most parts in your experience or gravity and physics will affect your parts as soon as the experience runs.

  <Alert severity="success">
  To view lighted outlines around the base of anchored parts in order to visualize which parts cannot move under gravity or physics, toggle on **Anchored&nbsp;parts** from the [Visualization&nbsp;Options](../studio/ui-overview.md#visualization-options) widget in the upper‑right corner of the 3D viewport.
  </Alert>

- `Class.BasePart|CanCollide` controls whether or not a part can collide with other parts. When this property is set to true, the part is impenetrable and the physics engine accounts for it within your experience. Conversely, when this property is set to false, the part can pass through anything, and the physics engine does **not** account for it.
- `Class.BasePart|Transparency` sets a part's visibility to any value between the default value of 0 (fully visible) and 1 (fully transparent). If you have many partially transparent parts, they can slow down performance. To alleviate this, merge them using [solid modeling](../parts/solid-modeling.md).

## Inserting Parts

The **Part** button inserts a new part into the workspace. Clicking the small dropdown arrow on the button lets you select either **Block**, **Sphere**, **Wedge**, **Corner&nbsp;Wedge**, or **Cylinder**.

<img src="../assets/studio/general/Model-Tab-Part-Tools.png" width="660" alt="Studio's Model tab with the Insert Part tool and its Part Type Picker highlighted." />

<Alert severity="info">
To insert a `Class.TrussPart` (not available on the insertion menu), use the [Explorer](../studio/explorer.md) as outlined [here](../studio/explorer.md#inserting-and-parenting).
</Alert>

## Selecting Parts

As you hover over parts in the viewport, they are outlined to indicate their potential selection. You can select an outlined part by clicking it, or you can select multiple parts by holding <kbd>Shift</kbd>, <kbd>Ctrl</kbd>, or <kbd>⌘</kbd> as you hover over and click them. See [here](../studio/ui-overview.md#selecting-objects) for advanced methods of selecting parts in the 3D viewport.

<img src="../assets/studio/general/Editor-Window-Object-Selection.jpg" width="800" alt="Multiple models selected in 3D viewport"/>

## Transforming Parts

You can move, scale, and rotate selected parts either through modeling tools or by setting a new position, size, or orientation in the [Properties](#part-properties) window.

When using the tools, you can move, scale, or rotate parts in either **world** orientation or **local** orientation by pressing <kbd>Ctrl</kbd><kbd>L</kbd> on Windows or <kbd>⌘</kbd><kbd>L</kbd> on Mac. When you enable local orientation,
the arrow axis indicators change to a part's local orientation, and an **L** indicator displays.

<Tabs>
  <TabItem label="World">
    <img src="../assets/modeling/parts/Move-World-Orientation.png" width="720" height="405" alt="An angled block part with draggers in World orientation mode." />
  </TabItem>
  <TabItem label="Local">
    <img src="../assets/modeling/parts/Move-Local-Orientation.png" width="720" height="405" alt="An angled block part with draggers in Local orientation mode." />
  </TabItem>
</Tabs>

### Moving

You can move a selected part to a new position using the **Move** tool (default shortcut <kbd>2</kbd>) or by **cursor&nbsp;dragging**. While moving a part, you can temporarily toggle [snapping](../studio/model-tab.md#transform-snapping) by holding <kbd>Shift</kbd>.

<Tabs>
<TabItem label="Move Tool">
<figure>
<img src="../assets/studio/general/Model-Tab-Move.png" width="830" alt="Studio's Model tab with the Move tool highlighted." />
</figure>

To move a part by an axis dragger along the **X**, **Y**, or **Z** axis, click/drag an arrow pointing along the desired axis of movement.

<img src="../assets/modeling/parts/Transform-Move.png" width="720" alt="A block part with the Move tool's visual aids." />

After releasing the drag, the numerical **distance indicator** remains visible. If desired, fine‑tune the distance that was moved by clicking inside the indicator and entering any number.

<img src="../assets/modeling/parts/Transform-Move-Indicator.png" width="720" alt="A moved part showing the distance moved in an indicator/input field" />

If you drag a part by its [pivot](../studio/pivot-tools.md) point while the **Move** tool is selected, the pivot will "soft&nbsp;snap" to surfaces and edges of nearby parts.

<img src="../assets/modeling/parts/Transform-Move-Pivot-Snap.png" width="720" alt="A block part with an offset pivot soft-snapping to the surface of a nearby part." />

</TabItem>
<TabItem label="Cursor Drag">
<figure>
To move a part by cursor dragging, click anywhere on the part to grab it. If [transform snapping](../studio/model-tab.md#transform-snapping) is **enabled**, a ruler will appear as you hover, showing what point you'll grab the part by. As you drag the part around, another ruler will appear on the surface/edge of nearby parts, indicating alignment of the grab point.

<img src="../assets/modeling/parts/Transform-Move-Ruler-Snap.png" width="720" alt="A block part showing the grab point and snapping ruler on a neighboring part." />

If [transform snapping](../studio/model-tab.md#transform-snapping) is **disabled**, the part will "soft&nbsp;snap" to surfaces and edges of nearby parts.

<img src="../assets/modeling/parts/Transform-Move-Cursor-Drag-Snap.png" width="720" alt="A block part soft-snapping to the corner edges of a neighboring part." />

While cursor dragging, <kbd>T</kbd> and <kbd>R</kbd> can be used to quickly rotate the part in 90&deg; increments around the point you picked it up by. <kbd>T</kbd> tilts the part 90&deg; towards the camera, while <kbd>R</kbd> rotates the part 90&deg; around the normal of the hovered surface.

<img src="../assets/modeling/parts/Transform-Move-Cursor-Drag-T-R.png" width="720" alt="Diagram showing how parts can be tilted and rotated with the T and R keys respectively." />
</figure>
</TabItem>
</Tabs>

### Scaling

To scale (resize) a selected part along the **X**, **Y**, or **Z** axis, use the **Scale** tool (default shortcut <kbd>3</kbd>) and click/drag a handle. While dragging, you can temporarily toggle [snapping](../studio/model-tab.md#transform-snapping) by holding <kbd>Shift</kbd>.

<img src="../assets/studio/general/Model-Tab-Scale.png" width="830" alt="Studio's Model tab with the Scale tool highlighted." />

<img src="../assets/modeling/parts/Transform-Scale.png" width="720" alt="A block part with the Scale tool's visual aids." />

### Rotating

To rotate a selected part around the **X**, **Y**, or **Z** axis, use the **Rotate** tool (default shortcut <kbd>4</kbd>) and click/drag a rotation ring. While dragging, you can temporarily toggle [snapping](../studio/model-tab.md#transform-snapping) by holding <kbd>Shift</kbd>.

<img src="../assets/studio/general/Model-Tab-Rotate.png" width="830" alt="Studio's Model tab with the Rotate tool highlighted." />

<img src="../assets/modeling/parts/Transform-Rotate.png" width="720" alt="A block part with the Rotate tool's visual aids." />

## Coloring Parts

While a part is gray by default, you can change it to any color through the following methods.

### Hexagon Map

Clicking the small dropdown arrow on the **Color** widget reveals a hexagonal color picker.

<img src="../assets/studio/general/Model-Tab-Color-Picker.png" width="704" alt="Studio's Model tab with the Color widget's hexagonal picker." />

By default, clicking the overall **Color** button applies the chosen color to any **selected** parts. If you prefer a fill/paint workflow instead, toggle on **Color&nbsp;Action&nbsp;as&nbsp;Tool** and then click parts in the 3D viewport to apply the chosen color.

<img src="../assets/studio/general/Model-Tab-Color-Action-As-Tool.png" width="704" alt="Studio's Model tab with the Color Action as Tool selector indicated." />

### Colors Popup

The **Colors** popup allows you to set a color through your operating system's color picker widget. To access it, navigate to the [Properties](../studio/properties.md) window and click the small box to the left of the `Class.BasePart.Color|Color` property.

<img src="../assets/studio/properties/Color-Picker.png" alt="A close up view of the Properties window with the Color property's color box highlighted." width="320" />

### RGB Value

To define a specific RGB color value for a part, enter an RGB value into the
`Class.BasePart.Color|Color` property field.

<img src="../assets/studio/properties/Color-RGB-Entry.png" alt="A close up view of the Properties window with the Color property's RGB color value highlighted." width="320" />

## Applying Materials

Similar to [color](#coloring-parts), you can customize a part's **material** to simulate real-world materials such as wood, glass, or fabric. When selecting a material, consider the following:

- **Material affects the physical traits of a part, not just its appearance**. For example, the **Concrete** material is heavier than the **Plastic** material, so a concrete brick will have higher density than a plastic brick and sink in water faster.

- Some materials have special physical effects. For example, parts will appear to glow if they are set to the **Neon** material.

  <GridContainer numColumns="2">
    <figure>
      <img src="../assets/modeling/parts/Material-SmoothPlastic.png" alt="An angled red block part with a smooth plastic material." />
      <figcaption>SmoothPlastic</figcaption>
    </figure>
    <figure>
      <img src="../assets/modeling/parts/Material-Neon.png" alt="An angled red block part with a glowing neon material."/>
      <figcaption>Neon</figcaption>
    </figure>
  </GridContainer>

See [Materials](../parts/materials.md) for more information on how to apply both
default and custom materials to parts.
