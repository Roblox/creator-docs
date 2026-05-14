---
title: UI appearance modifiers
description: Explains how to use appearance modifiers to customize basic user interface objects.
---

import BetaAlert from '../includes/beta-features/beta-alert.md'

By utilizing **appearance modifiers**, you can further customize the appearance of your `Class.GuiObject|GuiObjects`.

- Apply a [gradient](#gradient) to the background of an object.
- Apply a [stroke](#stroke) to text or a border.
- Set [rounded corners](#corners) for an object.
- Increase [padding](#padding) between the borders of an object.
- Add a [drop shadow](#shadow) behind an object.

## Gradient

The `Class.UIGradient` object applies a color and transparency gradient to its parent `Class.GuiObject`.

<Grid container spacing={3}>
  <Grid item>
		<img src="../assets/ui/ui-objects/UIGradient-Example.png" width="480" />
	</Grid>
	<Grid item>
		<img src="../assets/studio/explorer/UIGradient.png" width="320" />
	</Grid>
</Grid>

You can configure the gradient by:

- Setting its [colors](#color-sequence) through a `Datatype.ColorSequence` in the gradient's `Class.UIGradient.Color|Color` property.
- Setting its [transparency](#transparency) through a `Datatype.NumberSequence` in the gradient's `Class.UIGradient.Transparency|Transparency` property.
- Choosing the gradient's starting point (inside or outside the parent's bounds) through the `Class.UIGradient.Offset|Offset` property.
- Choosing the gradient's angle through the `Class.UIGradient.Rotation|Rotation` property.

### Color sequence

To set a gradient's color sequence:

1. In the [Explorer](../studio/explorer.md) window, select the `Class.UIGradient`.
1. In the [Properties](../studio/properties.md) window, click inside the `Class.UIGradient.Color|Color` property field, then click the **&ctdot;** button to the right of the input box. A color sequence pop-up displays.

   <img src="../assets/studio/properties/UIGradient-Open-ColorSequence-Window.png" width="320" />

   Each triangle on the bottom axis of the color sequence is a **keypoint** that determines the color value at that point.

   <img src="../assets/studio/general/ColorSequence-White-Keypoints-Labeled.png" width="628" alt="Color sequence popup from white to white" />

1. Click a keypoint in the color sequence, then click the small square next to **Color** to open the **Colors** pop-up window.
1. Select the desired color for the keypoint.

   <img src="../assets/studio/general/ColorSequence-Red-White.png" width="628" alt="Color sequence popup from red to white" />

1. If needed, you can:

   - Add another keypoint by clicking anywhere on the graph.
   - Drag an existing keypoint to a new position, or select a keypoint and enter a specific time value through the **Time** input.
   - Delete a keypoint by selecting it and clicking the **Delete** button.
   - Reset the sequence by clicking the **Reset** button.

### Transparency

To adjust a gradient's transparency across its range:

1. In the [Explorer](../studio/explorer.md) window, select the `Class.UIGradient`.
1. In the [Properties](../studio/properties.md) window, click inside the `Class.UIGradient.Transparency|Transparency` property field, then click the **&ctdot;** button to the right of the input box. A number sequence pop-up displays.

   <img src="../assets/studio/properties/UIGradient-Open-NumberSequence-Window.png"
   width="320" />

   Each square across the number sequence graph is a
   **keypoint** that determines the transparency value at that point.

   <img src="../assets/studio/general/NumberSequence-0-0-Keypoints-Labeled.png" width="828" alt="Keypoints labeled in number sequence popup" />

1. Click and drag any keypoint around, or select a keypoint and enter a specific time/value combination through the **Time** and **Value** inputs.

	 <img src="../assets/studio/general/NumberSequence-0-1.png" width="828" alt="Number sequence popup from 0 to 1" />

1. If needed, you can:

   - Add another keypoint by clicking anywhere on the graph.
   - Delete a keypoint by selecting it and clicking the **Delete** button.
   - Reset the sequence by clicking the **Reset** button.

### Offset and rotation

The `Class.UIGradient.Offset|Offset` and `Class.UIGradient.Rotation|Rotation` properties let you adjust the gradient's control points and its angle. As illustrated in the following diagrams, `Class.UIGradient.Offset|Offset` is based on a **percentage** of the parent's width or height, and both positive or negative values are valid.

<Grid container spacing={3}>
<Grid item container XSmall={12} Small={12} Medium={4} Large={4} XLarge={4}>
	<figure>
    <img src="../assets/ui/ui-objects/UIGradient-Offset-X-0.png" width="376" />
    <figcaption>`Class.UIGradient.Offset|Offset.X` = `0`</figcaption>
  </figure>
</Grid>
<Grid item container XSmall={12} Small={12} Medium={4} Large={4} XLarge={4}>
	<figure>
    <img src="../assets/ui/ui-objects/UIGradient-Offset-X-Pos-0.25.png" width="376" />
    <figcaption>`Class.UIGradient.Offset|Offset.X` = `0.25`</figcaption>
  </figure>
</Grid>
<Grid item container XSmall={12} Small={12} Medium={4} Large={4} XLarge={4}>
	<figure>
    <img src="../assets/ui/ui-objects/UIGradient-Offset-X-Neg-0.25.png" width="376" />
    <figcaption>`Class.UIGradient.Offset|Offset.X` = `-0.25`</figcaption>
  </figure>
</Grid>
</Grid>

Similarly, when you rotate the gradient, the control points also rotate:

<Grid container spacing={3}>
<Grid item container XSmall={12} Small={12} Medium={4} Large={4} XLarge={4}>
  <figure>
    <img src="../assets/ui/ui-objects/UIGradient-Rotation-0.png" width="376" />
    <figcaption>`Class.UIGradient.Rotation|Rotation` = `0`</figcaption>
  </figure>
</Grid>
<Grid item container XSmall={12} Small={12} Medium={4} Large={4} XLarge={4}>
  <figure>
    <img src="../assets/ui/ui-objects/UIGradient-Rotation-Pos-45.png" width="376" />
    <figcaption>`Class.UIGradient.Rotation|Rotation` = `45`</figcaption>
  </figure>
</Grid>
<Grid item container XSmall={12} Small={12} Medium={4} Large={4} XLarge={4}>
  <figure>
    <img src="../assets/ui/ui-objects/UIGradient-Rotation-Neg-90.png" width="376" />
    <figcaption>`Class.UIGradient.Rotation|Rotation` = `-90`</figcaption>
  </figure>
</Grid>
</Grid>

## Stroke

The `Class.UIStroke` instance applies an outline to text or a border. Key features include:

- Adjustable [color](#color-or-gradient) and [thickness](#thickness) of the stroke outline.
- Ability to set the stroke [transparency](#transparency-1) independently of the parent's transparency.
- Customizable [position and/or offset](#border-positionoffset) relative to the parent's border.
- Three [corner styles](#corner-style) (round, bevel, or miter).
- Stroke [gradient](#color-or-gradient) support through the `Class.UIGradient` instance.

### Thickness

You can set the stroke width through the `Class.UIStroke.Thickness|Thickness` property which is measured in pixels (default) or scaled relative to the parent, depending on the modifier's `Class.UIStroke.StrokeSizingMode|StrokeSizingMode`. If stroke is on text and `Class.UIStroke.StrokeSizingMode|StrokeSizingMode` is set to `Enum.StrokeSizingMode.ScaledSize|ScaledSize`, thickness is relative to the font size.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/ui/ui-objects/UIStroke-Thickness-4.png" />
    <figcaption>`Class.UIStroke.Thickness` = `4`</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/ui-objects/UIStroke-Thickness-12.png" />
    <figcaption>`Class.UIStroke.Thickness` = `12`</figcaption>
  </figure>
</GridContainer>

<Alert severity="warning">
Avoid [tweening](../ui/animation.md) the `Class.UIStroke.Thickness|Thickness` property of a `Class.UIStroke` instance applied to **text** objects. This renders and stores many glyph sizes each frame, potentially causing performance issues or text flickering.
</Alert>

### Color or gradient

You can set the stroke color through the `Class.UIStroke.Color|Color` property, as well as insert a child `Class.UIGradient` instance to create gradient strokes.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/ui/ui-objects/UIStroke-Color-Solid.png" />
    <figcaption>`Class.UIStroke.Color` = `(0, 95, 225)`</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/ui-objects/UIStroke-Color-Gradient.png" />
    <figcaption>`Class.UIStroke` with `Class.UIGradient` child</figcaption>
  </figure>
</GridContainer>

<Alert severity="info">
Both the parent object and `Class.UIStroke` can have child `Class.UIGradient` instances, letting you set gradients on the **stroke** and **fill** independently.
</Alert>

### Text outline or border

Depending on its parent type, `Class.UIStroke` operates as either a **text outline** or as a **border**. When you parent `Class.UIStroke` to a text object like `Class.TextLabel`, it applies to the text's outline; when you parent `Class.UIStroke` to other `Class.GuiObject|GuiObjects`, it applies to the border.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/ui/ui-objects/UIStroke-As-Text-Outline.png" />
    <figcaption>`Class.TextLabel` with `Class.UIStroke` child</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/ui-objects/UIStroke-As-Border.png" />
    <figcaption>`Class.Frame` with `Class.UIStroke` and `Class.UICorner` children</figcaption>
  </figure>
</GridContainer>

When applied to a text object, you can override the default stroke behavior by the `Class.UIStroke.ApplyStrokeMode|ApplyStrokeMode` property, letting you apply the stroke to the object's bounds instead of the text itself. You can even control the text outline and border independently by parenting two `Class.UIStroke` instances to a text object, one set to **Contextual** and the other to **Border**.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/ui/ui-objects/UIStroke-As-Text-Outline.png" />
    <figcaption>`Class.UIStroke.ApplyStrokeMode` = `Enum.ApplyStrokeMode.Contextual|Contextual`</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/ui-objects/UIStroke-Stroke-Mode-Border.png" />
    <figcaption>`Class.UIStroke.ApplyStrokeMode` = `Enum.ApplyStrokeMode.Border|Border`</figcaption>
  </figure>
</GridContainer>

### Border position/offset

`Class.UIStroke.BorderStrokePosition|BorderStrokePosition` sets the stroke's position relative to its parent's border and `Class.UIStroke.BorderOffset|BorderOffset` lets you specify an additional offset to the stroke's position.

<GridContainer numColumns="3">
	<figure>
	<img src="../assets/ui/ui-objects/UIStroke-BorderStrokePosition-Center.png" width="312" />
	<figcaption>`Class.UIStroke.BorderStrokePosition|BorderStrokePosition` = `Enum.BorderStrokePosition.Center|Center`</figcaption>
	</figure>
	<figure>
	<img src="../assets/ui/ui-objects/UIStroke-BorderStrokePosition-Inner.png" width="312" />
	<figcaption>`Class.UIStroke.BorderStrokePosition|BorderStrokePosition` = `Enum.BorderStrokePosition.Inner|Inner`</figcaption>
	</figure>
	<figure>
	<img src="../assets/ui/ui-objects/UIStroke-BorderStrokePosition-Outer.png" width="312" />
	<figcaption>`Class.UIStroke.BorderStrokePosition|BorderStrokePosition` = `Enum.BorderStrokePosition.Outer|Outer`</figcaption>
	</figure>
</GridContainer>

<GridContainer numColumns="3">
	<figure>
	<img src="../assets/ui/ui-objects/UIStroke-BorderOffset-Out.png" width="312" />
	<figcaption>`Class.UIStroke.BorderOffset|BorderOffset` = `(0.15, 0)`</figcaption>
	</figure>
	<figure>
	<img src="../assets/ui/ui-objects/UIStroke-BorderOffset-In.png" width="312" />
	<figcaption>`Class.UIStroke.BorderOffset|BorderOffset` = `(0, -16)`</figcaption>
	</figure>
</GridContainer>

### Transparency

The `Class.UIStroke.Transparency|Transparency` property sets the stroke transparency independently of the parent object's `Class.GuiObject.BackgroundTransparency|BackgroundTransparency` or `Class.TextLabel.TextTransparency|TextTransparency`. This allows you to render text and borders that are "hollow" (consisting of only an outline).

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/ui/ui-objects/UIStroke-Transparency-A.png" />
    <figcaption>`Class.TextLabel.TextTransparency` = `0`<br />`Class.UIStroke.Transparency` = `0.5`</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/ui-objects/UIStroke-Transparency-B.png" />
    <figcaption>`Class.TextLabel.TextTransparency` = `1`<br />`Class.UIStroke.Transparency` = `0`</figcaption>
  </figure>
</GridContainer>

### Corner style

The `Class.UIStroke.LineJoinMode|LineJoinMode` property lets you control how corners are interpreted. It accepts a value of either `Enum.LineJoinMode.Round|Round`, `Enum.LineJoinMode.Bevel|Bevel`, or `Enum.LineJoinMode.Miter|Miter`.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/ui/ui-objects/UIStroke-LineJoinMode-Round.png" />
    <figcaption>`Class.UIStroke.LineJoinMode|LineJoinMode` = `Enum.LineJoinMode.Round|Round`</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/ui-objects/UIStroke-LineJoinMode-Bevel.png" />
    <figcaption>`Class.UIStroke.LineJoinMode|LineJoinMode` = `Enum.LineJoinMode.Bevel|Bevel`</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/ui-objects/UIStroke-LineJoinMode-Miter.png" />
    <figcaption>`Class.UIStroke.LineJoinMode|LineJoinMode` = `Enum.LineJoinMode.Miter|Miter`</figcaption>
  </figure>
</GridContainer>

### Layering

To layer multiple sibling `Class.UIStroke` instances on a `Class.GuiObject` from front to back, you can utilize the `Class.UIStroke.ZIndex|ZIndex` property. Those with a lower `Class.UIStroke.ZIndex|ZIndex` render under (behind) those with a higher `Class.UIStroke.ZIndex|ZIndex`.

Note that the rendering order for `Class.UIStroke` instances with the same `Class.UIStroke.ZIndex|ZIndex` is undefined. Do not apply multiple `Class.UIStroke` instances with the same index if their rendering order matters.

## Corners

The `Class.UICorner` instance applies deformation to all four corners of its parent `Class.GuiObject`. You can control the applied radius through the `Class.UICorner.CornerRadius|CornerRadius` property using either `Datatype.UDim.Scale|Scale` or `Datatype.UDim.Offset|Offset`.

`Datatype.UDim.Scale|Scale` rounds the corners to a **percentage** based on the total length of the **shortest** edge of the parent, meaning that a scale of `0.5` or higher deforms the parent into a "pill" shape, regardless of its width or height. `Datatype.UDim.Offset|Offset` rounds the corners to a specific number of **pixels**, regardless of the width/height of the parent.

<Grid container spacing={4}>
<Grid item>
	<figure>
    <img src="../assets/ui/ui-objects/UICorner-Scale-0.25.png" width="392" />
    <figcaption>`Datatype.UDim.Scale|Scale` = `0.25` &nbsp;&middot;&nbsp; `Datatype.UDim.Offset|Offset` = `0`</figcaption>
  </figure>
</Grid>
<Grid item>
	<figure>
    <img src="../assets/ui/ui-objects/UICorner-Scale-0.5.png" width="392" />
    <figcaption>`Datatype.UDim.Scale|Scale` = `0.5` &nbsp;&middot;&nbsp; `Datatype.UDim.Offset|Offset` = `0`</figcaption>
  </figure>
</Grid>
<Grid item>
	<figure>
    <img src="../assets/ui/ui-objects/UICorner-Offset-32.png" width="392" />
    <center><figcaption>`Datatype.UDim.Scale|Scale` = `0` &nbsp;&middot;&nbsp; `Datatype.UDim.Offset|Offset` = `32`</figcaption></center>
  </figure>
</Grid>
<Grid item>
	<figure>
    <img src="../assets/ui/ui-objects/UICorner-Offset-64.png" width="392" />
    <center><figcaption>`Datatype.UDim.Scale|Scale` = `0` &nbsp;&middot;&nbsp; `Datatype.UDim.Offset|Offset` = `64`</figcaption></center>
  </figure>
</Grid>
</Grid>

You can also control **individual corners** through the `Class.UICorner.TopLeftRadius|TopLeftRadius`, `Class.UICorner.TopRightRadius|TopRightRadius`, `Class.UICorner.BottomRightRadius|BottomRightRadius`, and `Class.UICorner.BottomLeftRadius|BottomLeftRadius` properties.

<BetaAlert betaName="New UI Capabilities" leadIn="The ability to set individual corners is currently in beta. Enable the capability through " leadOut="." components={props.components} />

<figure>
	<img src="../assets/ui/ui-objects/UICorner-Mixed-1.png" width="392" />
	<figcaption>`Class.UICorner.TopLeftRadius|TopLeftRadius` = `(0, 0)`<br />`Class.UICorner.TopRightRadius|TopRightRadius` = `(0, 48)`<br />`Class.UICorner.BottomRightRadius|BottomRightRadius` = `(0, 48)`<br />`Class.UICorner.BottomLeftRadius|BottomLeftRadius` = `(0, 0)`</figcaption>
</figure>

## Padding

A `Class.UIPadding` object applies top, bottom, left, and/or right padding to the contents of the parent `Class.GuiObject`. For example, you can move the text inside a text label downward or upward by applying an offset to the modifier's `Class.UIPadding.PaddingBottom|PaddingBottom` property.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/ui/ui-objects/UIPadding-PaddingBottom-Default.png" width="300" />
    <figcaption>`Class.TextLabel` without `Class.UIPadding`</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/ui-objects/UIPadding-PaddingBottom-Offset-Negative.png" width="300" />
    <figcaption>`Class.UIPadding.PaddingBottom|PaddingBottom` = `(0, -20)`</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/ui-objects/UIPadding-PaddingBottom-Offset-Positive.png" width="300" />
    <figcaption>`Class.UIPadding.PaddingBottom|PaddingBottom` = `(0, 30)`</figcaption>
  </figure>
</GridContainer>

## Shadow

<BetaAlert betaName="New UI Capabilities" leadIn="This feature is currently in beta. Enable it through " leadOut="." components={props.components} />

A `Class.UIShadow` object renders a drop shadow behind its parent UI instance. Key features include:

- Adjust the shadow's [bluriness](#bluriness).
- Adjust the shadow's [color and transparency](#color-and-transparency).
- Adjust the shadow's [offset and spread](#offset-and-spread).
- If the parent is rotated by `Class.GuiObject.Rotation`, the shadow will also be rotated.
- If the parent has [round corners](#corners), the shadow will also have round corners.

<Alert severity="info">
`Class.UIShadow` does not support text. If you add this modifier to a `Class.TextLabel` or `Class.TextButton`, it renders a shadow of the object's rectangular bounding area, not of the text.
</Alert>

### Bluriness

The `Class.UIShadow.BlurRadius|BlurRadius` property determines the shadow's blurriness. A larger value makes the shadow's edges appear softer. Note that the **scale** factor of this `Datatype.UDim` property is relative to the parent's width or height, whichever is shorter.

<GridContainer numColumns="2">
	<figure>
    <img src="../assets/ui/ui-objects/UIShadow-BlurRadius-Scale-0.png" width="424" />
    <figcaption>`Class.UIShadow.BlurRadius|BlurRadius` = `(0, 0)`</figcaption>
  </figure>
	<figure>
    <img src="../assets/ui/ui-objects/UIShadow-BlurRadius-Scale-0.75.png" width="424" />
    <figcaption>`Class.UIShadow.BlurRadius|BlurRadius` = `(0.75, 0)`</figcaption>
  </figure>
</GridContainer>

### Color and transparency

The `Class.UIShadow.Color|Color` property determines the shadow's color, while `Class.UIShadow.Transparency|Transparency` sets the shadow's transparency with `0` being fully opaque and `1` being fully transparent.

<GridContainer numColumns="2">
	<figure>
    <img src="../assets/ui/ui-objects/UIShadow-Color-White-Transparency-0.6.png" width="424" />
    <figcaption>`Class.UIShadow.Color|Color` = `(255, 255, 255)` &nbsp;&middot;&nbsp; `Class.UIShadow.Transparency|Transparency`&nbsp;=&nbsp;`0.6`</figcaption>
  </figure>
	<figure>
    <img src="../assets/ui/ui-objects/UIShadow-Color-Maroon-Transparency-0.png" width="424" />
    <figcaption>`Class.UIShadow.Color|Color` = `(50, 0, 35)` &nbsp;&middot;&nbsp; `Class.UIShadow.Transparency|Transparency`&nbsp;=&nbsp;`0`</figcaption>
  </figure>
</GridContainer>

### Offset and spread

The `Class.UIShadow.Offset|Offset` property moves the shadow relative to the parent's position, while `Class.UIShadow.Spread|Spread` expands or shrinks the shadow relative to the parent's size.

<GridContainer numColumns="2">
	<figure>
    <img src="../assets/ui/ui-objects/UIShadow-Offset-Offset.png" width="424" />
    <figcaption>`Class.UIShadow.Offset|Offset` = `{0, -14}, {0, 6}`</figcaption>
  </figure>
	<figure>
    <img src="../assets/ui/ui-objects/UIShadow-Offset-Scale.png" width="424" />
    <figcaption>`Class.UIShadow.Offset|Offset` = `{0.1, 0}, {-0.15, 0}`</figcaption>
  </figure>
	<figure>
    <img src="../assets/ui/ui-objects/UIShadow-Spread-Offset.png" width="424" />
    <figcaption>`Class.UIShadow.Spread|Spread` = `{0, 10}, {0, 10}`</figcaption>
  </figure>
	<figure>
    <img src="../assets/ui/ui-objects/UIShadow-Spread-Scale.png" width="424" />
    <figcaption>`Class.UIShadow.Spread|Spread` = `{0.3, 0}, {0.3, 0}`</figcaption>
  </figure>
</GridContainer>
