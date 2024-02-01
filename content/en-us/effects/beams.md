---
title: Beams
description: Beams create a visual, animatable effect between two attachments.
---

A `Class.Beam` is an object that renders a `Class.Texture` between two `Class.Attachment` objects. By setting beam properties, you can:

- Add a [texture](#texture) and [color gradient](#color) to create interesting visuals like waterfalls and force fields.
- Modify a beam's [transparency](#transparency) so that it fades over time.
- Warp its shape by changing the [width](#width) or [curve](#curve) of each attachment point.
- Specify the texture's [length and mode](#texture-lengthmode) to affect how it repeats across the beam's length.

<video src="../assets/lighting-and-effects/beam/Showcase.mp4" controls
width="100%"></video>

## Creating a Beam

Before you begin to create a beam, it's useful to toggle on visibility of attachments so you can see where the beam starts and ends.

1. In the menu bar, navigate to the [Model](../studio/model-tab.md) tab, then the **Constraints** section.
2. If it's not currently enabled, toggle on **Constraint Details**.

   <img src="../assets/studio/general/Model-Tab-Constraint-Details.png" width="740" alt="Constraint Details toggle indicated in Model tab" />

To create a beam:

1. Create two parts and position them a short distance from each other. One will act as the start of the beam and the other as the end of the beam. Group the parts into a `Class.Model`.
2. In the [Explorer](../studio/explorer.md) window, add an `Class.Attachment` to each part:

   1. Hover over one part and click the &CirclePlus; button. A contextual menu displays.
   2. From the contextual menu, insert an **Attachment**.
   3. Repeat for the other part.

3. In the [Explorer](../studio/explorer.md) window, add a `Class.Beam` to the model:

   1. Hover over the model and click the &CirclePlus; button. A contextual menu displays.
   2. From the contextual menu, insert a **Beam**.

      <img src="../assets/studio/explorer/Model-Beam-Setup.png" width="320" />

4. Select the new **Beam** object and assign its attachments. Ensure you assign each attachment property to a different `Class.Attachment`.

   1. In the [Properties](../studio/properties.md) window, select the **Attachment0** property. Your cursor changes.
   2. In the [Explorer](../studio/explorer.md) window, select the attachment of the part you want to be the start of your beam.
   3. Back in the [Properties](../studio/properties.md) window, select the **Attachment1** property. Your cursor changes.
   4. In the [Explorer](../studio/explorer.md) window, select the attachment of the part you want to be the end of your beam.

<figure>
<img src="../assets/lighting-and-effects/beam/Default-Beam.png" width="800" />
<figcaption>Default beam between two attachments</figcaption>
</figure>

## Customizing Beams

### Texture

The `Class.Beam.Texture|Texture` property renders that texture across the length of the beam. You can set a beam's `Class.Beam.Texture|Texture` property to any asset ID. For more information, including how to add or upload your own textures, see [Importing Assets](../projects/assets/manager.md#importing-assets).

<img src="../assets/lighting-and-effects/beam/Texture-Applied.png" width="800" />

A beam renders its texture using two triangles drawn between `Class.Beam.Segments|Segments`, and the segments are laid out between the two attachment points' orientation. When you rotate attachment points in different directions, segments also rotate.

<img src="../assets/lighting-and-effects/beam/Attachments-Rotated.png" width="800" />

### Color

The `Class.Beam.Color|Color` property tints the beam's texture to either a specific hue, or to a gradient `Datatype.ColorSequence` across its entire span.

<Tabs>
<TabItem label="Constant Color">

1. In the [Explorer](../studio/explorer.md) window, select the `Class.Beam`.
2. In the [Properties](../studio/properties.md) window, select the **Color** property. You can either:

   1. Click on the color square to open the **Colors** pop-up window and select a color.
   2. Input three numbers into the RGB color value field.

   <img src="../assets/studio/properties/Color-Input-Options.png" width="320" />

</TabItem>
<TabItem label="Color Gradient">

1. In the [Explorer](../studio/explorer.md) window, select the `Class.Beam`.
1. In the [Properties](../studio/properties.md) window, click inside the **Color** property field and click the **&ctdot;** button.

   <img src="../assets/studio/properties/Color-Open-Sequence.png" width="320" alt="Button to open color sequence popup" />

   In the color sequence popup, each triangle on the bottom axis is a
   **keypoint** that determines the color value of the beam at that
   point along its span.

	 <img src="../assets/studio/general/ColorSequence-White-Keypoints-Labeled.png" width="640" alt="Keypoints labeled in color sequence popup" />

1. Click the keypoint at the start of the color sequence, click the
   small square next to **Color**, and select a color from the popup window.

	 <img src="../assets/studio/general/ColorSequence-Red-White.png" width="640" alt="Color sequence popup from red to white" />

1. If you want the beam to change color near the end of its span, click the keypoint at the end of the color sequence, click the small square next to **Color**, and select a color from the popup window.

   <img src="../assets/studio/general/ColorSequence-Red-Purple.png" width="640" alt="Color sequence popup from red to purple" />

1. If desired, you can:

   - Add another keypoint by clicking anywhere on the graph.
   - Make a color change sooner or later within the gradient by dragging an intermediary keypoint to a new position.
   - Delete an intermediary keypoint by selecting it and clicking the **Delete** button.
   - Reset the entire sequence by clicking the **Reset** button.

   <img src="../assets/studio/general/ColorSequence-Red-Cyan-Purple.png" width="640" alt="Color sequence popup from red to cyan to purple" />

   <img src="../assets/lighting-and-effects/beam/ColorSequence-Applied.png" width="800" />

</TabItem>
</Tabs>

### Transparency

The `Class.Beam.Transparency|Transparency` property sets the transparency of the beam as a consistent value or as a `Datatype.NumberSequence` with ranges from **0** (totally opaque) to **1** (fully clear).

<Tabs>
<TabItem label="Constant Opacity">

1. In the [Explorer](../studio/explorer.md) window, select the `Class.Beam`.
1. In the [Properties](../studio/properties.md) window, select the **Transparency** property.
1. Input the desired opacity for the beam.

</TabItem>
<TabItem label="Number Sequence">

1. In the [Explorer](../studio/explorer.md) window, select the `Class.Beam`.
1. In the [Properties](../studio/properties.md) window, click inside the **Transparency** property field and click the **&ctdot;** button.

   <img src="../assets/studio/properties/Transparency-Open-Sequence.png" width="320" alt="Button to open number sequence popup" />

   In the number sequence popup, each square at the start and end of the graph is a **keypoint** that determines the opacity value of the beam at that
   point along its span. By default, the graph defaults to a straight line and the beam is of consistent opacity.

   <img src="../assets/studio/general/NumberSequence-0.5-0.5-Keypoints-Labeled.png" width="746" alt="Keypoints labeled in number sequence popup" />

1. Perform any of the following actions:

   - To change the opacity at a point, click on a keypoint and either
     drag it up or down, or enter a value in the **Value** field.
   - To insert a new keypoint, click on any point in the graph.
   - To delete a keypoint, select it and click the **Delete** button.
   - Reset the entire sequence by clicking the **Reset** button.

   <img src="../assets/studio/general/NumberSequence-0-1-0.png" width="746" alt="Number sequence popup from 0 to 1 to 0" />

   <img src="../assets/lighting-and-effects/beam/Transparency-Applied.png" width="800" />

</TabItem>
</Tabs>

### Width

You can set the beam's width in studs at each endpoint by configuring the
`Class.Beam.Width0|Width0` and `Class.Beam.Width1|Width1` properties. A higher value equates to a larger width and a lower value equates to a smaller width. If you set either value to smaller than 0, Studio sets it back to **0**.

The beam below has a `Class.Beam.Width0|Width0` value of **0.5** and a
`Class.Beam.Width1|Width1` value of **3**.

<img src="../assets/lighting-and-effects/beam/Width-Adjusted.png" width="800" />

### Texture Length/Mode

A beam's `Class.Beam.TextureLength|TextureLength` and `Class.Beam.TextureMode|TextureMode` determine how its [texture](#texture) repeats across its length.

When `Class.Beam.TextureMode|TextureMode` is set to `Enum.TextureMode.Wrap` or `Enum.TextureMode.Static`, the texture repetitions will equal the beam's overall length (in&nbsp;studs) divided by its `Class.Beam.TextureLength|TextureLength`.

<img src="../assets/engine-api/enums/TextureMode/Wrap-Static.png" width="720" alt="TextureMode diagram with Wrap or Static mode" />

<figure>
When `Class.Beam.TextureMode|TextureMode` is set to `Enum.TextureMode.Stretch`, the texture will repeat `Class.Beam.TextureLength|TextureLength` times across the beam's overall length.

<img src="../assets/engine-api/enums/TextureMode/Stretch.png" width="720" alt="TextureMode diagram with Stretch mode" />
</figure>

### Facing

A beam is a 2D projection existing in 3D space, meaning that it may not be visible from every angle. The `Class.Beam.FaceCamera|FaceCamera` property, when set to `true`, ensures that the beam always faces the `Class.Workspace.CurrentCamera|CurrentCamera`, regardless of its orientation.

<figure>
<video src="../assets/lighting-and-effects/beam/FaceCamera.mp4" controls width="800"></video>
<figcaption>Default vs. FaceCamera</figcaption>
</figure>

### Curve

Beams are configured to use a cubic Bézier curve formed by four control points. This means they are not constrained to straight lines and the curve of the beam can be modified by changing `Class.Beam.CurveSize0|CurveSize0`, `Class.Beam.CurveSize1|CurveSize1`, and the orientation of the beam's `Class.Attachment|Attachments`.

- **P0** — The start of the beam; position of `Class.Beam.Attachment0|Attachment0`.
- **P1** — `Class.Beam.CurveSize0|CurveSize0` studs away from `Class.Beam.Attachment0|Attachment0`, in the positive **X** direction of `Class.Beam.Attachment0|Attachment0`.
- **P2** — `Class.Beam.CurveSize1|CurveSize1` studs away from `Class.Beam.Attachment1|Attachment1`, in the negative **X** direction of `Class.Beam.Attachment1|Attachment1`.
- **P3** — The end of the beam; position of `Class.Beam.Attachment1|Attachment1`.

<img src="../assets/engine-api/classes/Beam/Curvature-Diagram.png" width="800" alt="Beam curvature diagram" />

<img src="../assets/lighting-and-effects/beam/Curves-Applied.png" width="800" />
