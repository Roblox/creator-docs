---
title: UI Appearance Modifiers
description: Explains how to use appearance modifiers to customize basic user interface objects.
---

By utilizing **appearance modifiers**, you can further customize the appearance of your `Class.GuiObject|GuiObjects`.

- Apply a [gradient](#gradient) to the background of an object.
- Apply a [stroke](#stroke) to text or a border.
- Set [rounded corners](#corners) for an object.
- Increase [padding](#padding) between the borders of an object.

## Gradient

The `Class.UIGradient` object applies a color and transparency gradient to its parent `Class.GuiObject`.

<GridContainer numColumns="2">
  <img src="../assets/ui/layout-appearance/UIGradient.jpg" />
  <img src="../assets/ui/layout-appearance/Explorer-UIGradient.png" />
</GridContainer>

You can configure the gradient by:

- Setting its [colors](#color-sequence) through a `Datatype.ColorSequence` in the gradient's `Class.UIGradient.Color|Color` property.
- Setting its [transparency](#transparency) through a `Datatype.NumberSequence` in the gradient's `Class.UIGradient.Transparency|Transparency` property.
- Choosing the gradient's starting point (inside or outside the parent's bounds) through the `Class.UIGradient.Offset|Offset` property.
- Choosing the gradient's angle through the `Class.UIGradient.Rotation|Rotation` property.

### Color Sequence

To set a gradient's color sequence:

1. In the **Explorer** window, select the `Class.UIGradient`.
1. In the **Properties** window, click inside the **Color** property field, then click the **&hellip;** button to the right of the input box. A color sequence pop-up displays.

   <img src="../assets/ui/layout-appearance/UIGradient-Open-ColorSequence-Window.png"
   width="320" />

   Each triangle on the bottom axis of the color sequence is a **keypoint** that determines the color value at that point.

   <img src="../assets/studio/general/ColorSequence-White.png" width="640" alt="Color sequence popup from white to white" />

1. Click a keypoint in the color sequence, then click the small square next to **Color** to open the **Colors** pop-up window.
1. Select the desired color for the keypoint.

   <img src="../assets/studio/general/ColorSequence-Red-White.png" width="640" alt="Color sequence popup from red to white" />

1. If needed, you can:

   - Add another keypoint by clicking anywhere on the graph.
   - Drag an existing keypoint to a new position, or select a keypoint and enter a specific time value through the **Time** input.
   - Delete a keypoint by selecting it and clicking the **Delete** button.
   - Reset the sequence by clicking the **Reset** button.

### Transparency

To adjust a gradient's transparency across its range:

1. In the **Explorer** window, select the `Class.UIGradient`.
1. In the **Properties** window, click inside the **Transparency** property field, then click the **&hellip;** button to the right of the input box. A number sequence pop-up displays.

   <img src="../assets/ui/layout-appearance/UIGradient-Open-NumberSequence-Window.png"
   width="320" />

   Each square across the number sequence graph is a
   **keypoint** that determines the transparency value at that point.

   <img src="../assets/studio/general/NumberSequence-0.5-0.5.png" width="746" alt="Number sequence popup from 0.5 to 0.5" />

1. Click and drag any keypoint around, or select a keypoint and enter a specific time/value combination through the **Time** and **Value** inputs.

	 <img src="../assets/studio/general/NumberSequence-0-1.png" width="746" alt="Number sequence popup from 0 to 1" />

1. If needed, you can:

   - Add another keypoint by clicking anywhere on the graph.
   - Delete a keypoint by selecting it and clicking the **Delete** button.
   - Reset the sequence by clicking the **Reset** button.

### Offset and Rotation

The `Class.UIGradient.Offset|Offset` and `Class.UIGradient.Rotation|Rotation` properties let you adjust the gradient's control points and its angle. As illustrated in the following diagrams, `Class.UIGradient.Offset|Offset` is based on a **percentage** of the parent's width or height, and both positive or negative values are valid.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/ui/layout-appearance/UIGradient-Offset-X-0.png" />
    <figcaption>Offset (X) = 0</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/layout-appearance/UIGradient-Offset-X-Pos-0.25.png" />
    <figcaption>Offset (X) = 0.25</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/layout-appearance/UIGradient-Offset-X-Neg-0.25.png" />
    <figcaption>Offset (X) = -0.25</figcaption>
  </figure>
</GridContainer>

Similarly, when you rotate the gradient, the control points also rotate.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/ui/layout-appearance/UIGradient-Rotation-0.png" />
    <figcaption>Rotation = 0</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/layout-appearance/UIGradient-Rotation-Pos-45.png" />
    <figcaption>Rotation = 45</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/layout-appearance/UIGradient-Rotation-Neg-90.png" />
    <figcaption>Rotation = -90</figcaption>
  </figure>
</GridContainer>

## Stroke

The `Class.UIStroke` instance applies an outline to text or a border. Key features include:

- Adjustable [color](#color--gradient) and [thickness](#thickness) of the stroke outline.
- Ability to set the stroke [transparency](#transparency-1) independently of the parent's transparency.
- Three [corner styles](#corner-style) (round, bevel, or miter).
- Stroke [gradient](#color--gradient) support through the `Class.UIGradient` instance.

### Text Outline / Border

Depending on its parent, `Class.UIStroke` operates as either a **text outline** or as a **border**. When you parent `Class.UIStroke` to a text object, it applies to the text's outline; when you parent `Class.UIStroke` to other `Class.GuiObject|GuiObjects`, it applies to the border.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/ui/layout-appearance/UIStroke-As-Text-Outline.png" />
    <figcaption>TextLabel with UIStroke child</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/layout-appearance/UIStroke-As-Border.png" />
    <figcaption>Frame with UIStroke and UICorner children</figcaption>
  </figure>
</GridContainer>

When applied to a text object, you can override the default stroke behavior by the `Class.UIStroke.ApplyStrokeMode|ApplyStrokeMode` property, letting you apply the stroke to the object's bounds instead of the text itself. You can even control the text outline and border independently by parenting two `Class.UIStroke` instances to a text object, one set to **Contextual** and the other to **Border**.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/ui/layout-appearance/UIStroke-As-Text-Outline.png" />
    <figcaption>UIStroke.ApplyStrokeMode = Contextual</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/layout-appearance/UIStroke-Stroke-Mode-Border.png" />
    <figcaption>UIStroke.ApplyStrokeMode = Border</figcaption>
  </figure>
</GridContainer>

### Thickness

You can set the stroke width through the `Class.UIStroke.Thickness|Thickness` property which is measured in pixels from the parent's outer edges.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/ui/layout-appearance/UIStroke-Thickness-4.png" />
    <figcaption>UIStroke.Thickness = 4</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/layout-appearance/UIStroke-Thickness-12.png" />
    <figcaption>UIStroke.Thickness = 12</figcaption>
  </figure>
</GridContainer>

<Alert severity="warning">
Avoid [tweening](../ui/animation.md) the `Class.UIStroke.Thickness|Thickness` property of a `Class.UIStroke` instance applied to **text** objects. This renders and stores many glyph sizes each frame, potentially causing performance issues or text flickering.
</Alert>

### Color / Gradient

You can set the stroke color through the `Class.UIStroke.Color|Color` property, as well as insert a child `Class.UIGradient` instance to create gradient strokes.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/ui/layout-appearance/UIStroke-Color-Solid.png" />
    <figcaption>UIStroke.Color = (0, 95, 225)</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/layout-appearance/UIStroke-Color-Gradient.png" />
    <figcaption>UIStroke with UIGradient child</figcaption>
  </figure>
</GridContainer>

<Alert severity="info">
Both the parent object and `Class.UIStroke` can have child `Class.UIGradient` instances, letting you set gradients on the **stroke** and **fill** independently.
</Alert>

### Transparency

The `Class.UIStroke.Transparency|Transparency` property sets the stroke transparency independently of the parent object's `Class.GuiObject.BackgroundTransparency|BackgroundTransparency` or `Class.TextLabel.TextTransparency|TextTransparency`. This allows you to render text and borders that are "hollow" (consisting of only an outline).

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/ui/layout-appearance/UIStroke-Transparency-A.png" />
    <figcaption>TextLabel.TextTransparency = 0 &nbsp;/&nbsp; UIStroke.Transparency = 0.5</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/layout-appearance/UIStroke-Transparency-B.png" />
    <figcaption>TextLabel.TextTransparency = 1 &nbsp;/&nbsp; UIStroke.Transparency = 0</figcaption>
  </figure>
</GridContainer>

### Corner Style

The `Class.UIStroke.LineJoinMode|LineJoinMode` property lets you control how corners are interpreted. It accepts a value of either **Round**, **Bevel**, or **Miter**.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/ui/layout-appearance/UIStroke-LineJoinMode-Round.png" />
    <figcaption>UIStroke.LineJoinMode = Round</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/layout-appearance/UIStroke-LineJoinMode-Bevel.png" />
    <figcaption>UIStroke.LineJoinMode = Bevel</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/layout-appearance/UIStroke-LineJoinMode-Miter.png" />
    <figcaption>UIStroke.LineJoinMode = Miter</figcaption>
  </figure>
</GridContainer>

## Corners

The `Class.UICorner` instance applies deformation to all four corners of its parent `Class.GuiObject`. You can control the applied radius through the `Class.UICorner.CornerRadius|CornerRadius` property using either **Scale** or **Offset**.

<img src="../assets/ui/layout-appearance/UICorner-CornerRadius-Properties.png"
width="320" />

**Scale** rounds the corners to a percentage based on the total length of the **shortest** edge of the parent, meaning that a scale of 0.5 or higher deforms the parent into a "pill" shape, regardless of its width or height.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/ui/layout-appearance/UICorner-Scale-0.25.png" />
    <figcaption>Scale = 0.25 &nbsp;/&nbsp; Offset = 0</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/layout-appearance/UICorner-Scale-0.5.png" />
    <figcaption>Scale = 0.5 &nbsp;/&nbsp; Offset = 0</figcaption>
  </figure>
</GridContainer>

**Offset** rounds the corners to a specific number of pixels, regardless of the width/height of the parent.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/ui/layout-appearance/UICorner-Offset-25.png" />
    <figcaption>Scale = 0 &nbsp;/&nbsp; Offset = 25</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/layout-appearance/UICorner-Offset-50.png" />
    <figcaption>Scale = 0 &nbsp;/&nbsp; Offset = 50</figcaption>
  </figure>
</GridContainer>

## Padding

A `Class.UIPadding` object applies top, bottom, left, and/or right padding to the contents of the parent `Class.GuiObject`.

For example, you can move the text inside a text button downward or upward by applying an offset to the bottom of the button.

<video src="../assets/ui/layout-appearance/UIPadding.mp4" controls
width="80%"></video>
