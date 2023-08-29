---
title: Beams
description: Beams create a visual, animatable effect between two attachments.
---

A `Class.Beam` is an object that renders a `Class.Texture` between two `Class.Attachment` objects. By setting beam properties, you can:

- [Add textures](#adding-a-texture) with [color
  gradients](#creating-a-color-gradient) to create interesting visuals like
  waterfalls and force fields.
- Modify a beam's transparency so that it [fades over time](#fading-a-beam).
- Warp its shape by changing the [width](#changing-a-beams-width) or
  [curve](#curving-a-beam) of each attachment point.

<video src="../assets/lighting-and-effects/beam/Showcase.mp4" controls
width="100%"></video>

## Creating a Beam

Before you begin to create a beam, you must make sure you are able to
view attachments:

1. In the menu bar, navigate to the **Model** tab, then the
   **Constraints** section.
2. If it is not currently enabled, toggle on **Constraint Details**.

   <img src="../assets/studio/general/Model-Tab-Constraint-Details.png" width="740" alt="Constraint Details toggle indicated in Model tab" />

It is important to be able to view attachments because they determine
where a beam starts and ends. To create a beam:

1. Create two parts. One will be the start of the beam while the other
   will be the end of the beam.
2. Group the parts into a **Model**.
3. In the **Explorer** window, add an attachment to each part:

   1. Hover over one part and click the &CirclePlus; button. A contextual menu displays.
   1. From the contextual menu, insert an **Attachment**.
   1. Repeat for the other part.

4. In the **Explorer** window, add a beam to the model:

   1. Hover over the part and click the &CirclePlus; button. A contextual menu displays.
   1. From the contextual menu, insert a **Beam**.

5. Select the **Beam**.
6. In the **Properties** window, assign the attachments to the
   beam:

   1. Select the **Attachment0** property. Your cursor changes.
   1. In the **Explorer** window, select the attachment of the part you want to
      be the start of your beam.
   1. Select **Attachment1** property. Your cursor
      changes.
   1. In the
      **Explorer** window, select the other attachment of the part you want to be
      the end of your beam. **Ensure you assign each attachment property to a
      different attachment.**

   <GridContainer numColumns="2">
     <img src="../assets/lighting-and-effects/beam/Explorer-Model-With-Beam.png" />
     <img src="../assets/lighting-and-effects/beam/Default-Beam.png" />
   </GridContainer>

## Moving and Scaling a Beam

When you move a part,
the beam moves and scales to its new position because the attachment
points determine the start and end of the beam.

If you want the beam to move and face the player no matter their
direction, set the
`Class.Beam.FaceCamera|FaceCamera`
property to **true**. Note that this property does not move the beam's
position, only its angle.

<figure>
<video src="../assets/lighting-and-effects/beam/FaceCamera.mp4" controls width="80%"></video>
<figcaption>Default vs. **FaceCamera**</figcaption>
</figure>

## Adding a Texture

The
`Class.Beam.Texture|Texture`
property renders a texture across the length of the beam. You can set a
beam's
`Class.Beam.Texture|Texture`
property to any asset ID. For more information, including how to add or
upload your own textures, see
[Textures and Decals](../parts/textures-decals.md#creating-textures-or-decals).

<img src="../assets/lighting-and-effects/beam/Texture-Applied.png" width="800" />

Beams render their [textures](#adding-a-texture) using two
triangles drawn between **segments**, and the segments are laid out
between the two attachment points' orientation. By default, a beam uses
10 segment pairs, but you can modify the
`Class.Beam.Segments|Segments`
property to increase or decrease this amount. It is important to note
that when you rotate attachment points in different directions, segments
also rotate.

<img src="../assets/lighting-and-effects/beam/Attachments-Rotated.png" width="800" />

## Fading a Beam

The `Class.Beam.Transparency|Transparency`
property sets the opacity of a beam either as a consistent opacity or as
a `Datatype.NumberSequence`.
A number sequence changes a beam's opacity across the length of the
beam from one attachment point to another; it can range anywhere from **0**
(totally opaque) to **1** (fully clear).

To set a beam to a specific opacity:

1. In the **Explorer** window, select the **Beam**.
2. In the **Properties** window, select the **Transparency** property.
3. Input a value of transparency that you want the beam to be.

To open a beam's number sequence:

1. In the **Explorer** window, select the **Beam**.
2. In the **Properties** window, select the **Transparency** property.
3. Click the **&hellip;** button. A
   number sequence pop-up displays.

   <img
   src="../assets/lighting-and-effects/beam/Open-Transparency-NumberSequence-Window.png"
   width="320" />

   <img
   src="../assets/studio/general/NumberSequence-0.5-0.5.png"
   width="800" />

The X axis is the position along the beam's length, and the Y axis is
the transparency at that position. Each square at the start and end of
the number sequence is a **keypoint** that determines the opacity value
of the property at that point within the beam

To edit a beam's number sequence, perform any of the following actions:

- To change the opacity at a point along the beam, click on a
  **keypoint** and either drag it up or down, or enter a value in
  the **Value** field.
- To insert new keypoints, click on any point in the graph.
- To delete a keypoint, select the **keypoint**, then the **Delete**
  button.
- To reset the sequence, select the **Reset** button.

  <img
  src="../assets/studio/general/NumberSequence-0-1-0.png"
  width="800" />

  <img
  src="../assets/lighting-and-effects/beam/Transparency-Applied.png"
  width="800" />

## Creating a Color Gradient

The
`Class.Beam.Color|Color`
property tints the beam's texture to either a specific hue or a
`Datatype.ColorSequence`.
A color sequence changes the beam's color across the length of the beam
from one attachment point to another.

To set a beam to a specific hue:

1. In the **Explorer** window, select the **Beam**.
2. In the **Properties** window, select the **Color** property.
3. You can either:

   1. Click on the color square to open the **Colors**
      pop-up window and select a color.

   1. Input three numbers into the RGB color value field.

   <img src="../assets/studio/properties/Color-Input-Options.png" width="320" />

To open a beam's color sequence:

1. In the **Explorer** window, select the **Beam**.
2. In the **Properties** window, select the **Color** property.
3. Click the **&hellip;** button. A color sequence pop-up
   displays. By default, the color sequence is all white.

   <img
   src="../assets/lighting-and-effects/beam/Open-Color-ColorSequence-Window.png"
   width="320" />

   <img src="../assets/studio/general/ColorSequence-White.png" width="626" />

Each triangle on the bottom axis of the color sequence is a **keypoint** that
determines the color value of the property at that point between the beam's
attachments.

To edit a beam's color sequence:

1. Click the **keypoint** at the start of the color sequence, then click the
   small square next to **Color** to open the colors pop-up
   window and select the color you want at the start of the beam.

   <img src="../assets/studio/general/ColorSequence-Red-White.png" width="626"
       />

2. If you want the beam to change color near the end of the beam, click the
   **keypoint** at the end of the color sequence, then click the small square
   next to **Color** to open the colors pop-up
   window and select a color.

   <img src="../assets/studio/general/ColorSequence-Red-Purple.png" width="626"
   />

3. If needed, you can:

   - Add another keypoint by clicking anywhere on the graph.

   - Drag any existing keypoints to a new position. This is useful if you want
     a color to change sooner or later within the gradient.

   - Delete a keypoint by selecting it, then the **Delete** button.

   - Reset the sequence by selecting the **Reset** button.

   <img
   src="../assets/studio/general/ColorSequence-Red-Cyan-Purple.png"
   width="626" />

   <img
   src="../assets/lighting-and-effects/beam/ColorSequence-Applied.png"
   width="800" />

## Changing a Beam's Width

You can set the beam's width in studs at each endpoint by configuring
the
`Class.Beam.Width0|Width0`
and
`Class.Beam.Width1|Width1`
properties. A higher value equates to a larger width, and a lower value
equates to a smaller width. If you set either value to smaller than 0,
Studio sets it back to **0**.

The beam below has a
`Class.Beam.Width0|Width0`
value of **0.5** and a
`Class.Beam.Width1|Width1`
value of **3**.

<img src="../assets/lighting-and-effects/beam/Width-Adjusted.png" width="800" />

## Curving a Beam

Beams use a cubic [Bézier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve).
You can modify this curve to curve up or down relative to the
attachments' orientations using the
`Class.Beam.CurveSize0|CurveSize0`
and
`Class.Beam.CurveSize1|CurveSize1`
properties.

A
`Class.Beam.CurveSize0|CurveSize0`
property with a high value causes the beam to dip low, while a low value
causes the beam to **start off high**; conversely, a
`Class.Beam.CurveSize1|CurveSize1`
property with a high value causes the beam to **end high** while a low
value causes the beam to dip low.

<img src="../assets/lighting-and-effects/beam/Curves-Applied.png" width="800" />
