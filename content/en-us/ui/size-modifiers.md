---
title: Size modifiers and constraints
description: Explains how use size modifiers and size constraints with user interface objects.
---

Alongside basic [sizing](../ui/position-and-size.md) of UI objects, you can utilize size modifiers to [scale](#scale) an object proportionally or [automatically resize](#automatic-sizing) it. You can also insert [size constraints](#constraints) to control **aspect ratio**, or set a minimum and maximum **size** or **text size**.

## Scale

A `Class.UIScale` object stores a numerical value that multiplies the `Class.GuiBase2d.AbsoluteSize|AbsoluteSize` property of the parent `Class.GuiObject`. For example, if you want an object to be twice as large as it currently is, you can insert a `Class.UIScale` object with a `Class.UIScale.Scale|Scale` property of `2`.

This modifier is useful for "zooming in" while designing a detailed user interface in Studio, since it proportionally scales the object and all of its children, including any applied [appearance modifiers](../ui/appearance-modifiers.md) like `Class.UIStroke` or `Class.UICorner`. It's also useful to [tween](../ui/animation.md) the size of an object, for example to slightly increase the size of a button when a player hovers their mouse over it.

<img src="../assets/ui/ui-objects/UIScale-Example.png" width="800" />

## Automatic sizing

The `Class.GuiObject.AutomaticSize|AutomaticSize` property automatically resizes a parent `Class.GuiObject` to the size of its descendants. You can use this property in a variety of cases, including:

- Expanding a `Class.GuiObject` to fit text that has been [localized](../production/localization/index.md) in many languages.
- Allowing users to [input text](../ui/text-input.md) within a `Class.TextBox`, automatically adjusting its size based on the amount of text entered.
- Automatically adjusting the size of text objects using [rich text markup](../ui/rich-text.md), including font type and size.

<video controls width="90%" src="../assets/ui/automatic-sizing/Intro-Frame.mp4"></video>

You can enable the `Class.GuiObject.AutomaticSize|AutomaticSize` property for any `Class.GuiObject`. By default, it is set to `Enum.AutomaticSize|None`, but you can change its value to have specific control over which direction(s) the `Class.GuiObject` resizes to fit its content.

<Alert severity="info">
`Class.ScrollingFrame` uses the `Class.ScrollingFrame.AutomaticCanvasSize|AutomaticCanvasSize` property instead of `Class.GuiObject.AutomaticSize|AutomaticSize`. It behaves the same but resizes the frame's `Class.ScrollingFrame.CanvasSize|CanvasSize`, not its base `Class.GuiObject.Size|Size`.
</Alert>

To enable automatic sizing:

1. In the [Explorer](../studio/explorer.md) window, click any `Class.GuiObject`, such as a `Class.Frame`, `Class.TextBox`, or `Class.ImageLabel`.
2. In the [Properties](../studio/properties.md) window, navigate to the `Class.GuiObject.AutomaticSize|AutomaticSize` property (`Class.ScrollingFrame.AutomaticCanvasSize|AutomaticCanvasSize` for `Class.ScrollingFrame`) and set it to one of the following options:

   - `Enum.AutomaticSize|X` &mdash; Resizes content horizontally.
   - `Enum.AutomaticSize|Y` &mdash; Resizes content vertically.
   - `Enum.AutomaticSize|XY` &mdash; Resizes content both horizontally and vertically.

   <img src="../assets/studio/properties/GuiObject-AutomaticSize.png" width="320" />

Once automatic sizing is set, note that other object properties behave as follows:

<Tabs>
<TabItem label="AnchorPoint">
Similar to the concept of [sizing](../ui/position-and-size.md#size) an object, `Class.GuiObject.AutomaticSize|AutomaticSize` takes the `Class.GuiObject.AnchorPoint|AnchorPoint` property into consideration when resizing content. For example, the following video displays three `Class.TextLabel|TextLabels` that automatically resize from their anchor point.

<video controls width="80%" src="../assets/ui/automatic-sizing/customizing-anchorpoint.mp4"></video>

- The top label has an `Class.GuiObject.AnchorPoint|AnchorPoint` value of `Datatype.Vector2.new()|(0, 0.5)` which anchors it to the middle of the left side.
- The middle label has an `Class.GuiObject.AnchorPoint|AnchorPoint` value of `Datatype.Vector2.new()|(0.5, 0.5)` which anchors it to the center.
- The bottom label has an `Class.GuiObject.AnchorPoint|AnchorPoint` value of `Datatype.Vector2.new()|(1, 0.5)` which anchors it to the middle of the right side.

</TabItem>
<TabItem label="Size">
When you enable `Class.GuiObject.AutomaticSize|AutomaticSize`, the object's `Class.GuiObject.Size|Size` property controls its **minimum size**. This means that the `Class.GuiObject` cannot resize smaller than its core size along any axis.

For example, the following white `Class.Frame` has a `Class.GuiObject.Size|Size` of `0` for both axes, meaning it doesn't have a minimum width/height and can resize according to its child objects.

<video controls width="80%" src="../assets/ui/automatic-sizing/customizing-size-0.mp4"></video>

In comparison, the following white `Class.Frame` has a `Class.GuiObject.Size|Size.X` of `100`, so it cannot resize to a width less than 100 pixels.

<video controls width="80%" src="../assets/ui/automatic-sizing/customizing-size-100.mp4"></video>

</TabItem>
<TabItem label="TextWrapped">
When you enable **text wrapping** for a UI text object (`Class.TextLabel.TextWrapped|TextLabel`, `Class.TextButton.TextWrapped|TextButton`, or `Class.TextBox.TextWrapped|TextBox`) and set the `Class.GuiObject.AutomaticSize|AutomaticSize` property to either `Enum.AutomaticSize|Y` or `Enum.AutomaticSize|XY`, the label resizes to accommodate any text that wraps across multiple lines. For example, the following `Class.TextLabel` has `Class.TextLabel.TextWrapped|TextWrapped` enabled and an `Class.GuiObject.AutomaticSize|AutomaticSize` of `Enum.AutomaticSize|Y`, so when text overflows the width and wraps, the label expands vertically.

<video controls width="80%" src="../assets/ui/automatic-sizing/customizing-textwrapping.mp4"></video>

</TabItem>
</Tabs>

## Constraints

There are three types of **constraints** you can use for a user interface object: [size](#size), [text size](#text-size), and [aspect&nbsp;ratio](#aspect-ratio). To use a constraint, you must set it as a **child** of the `Class.GuiObject` you want to constrain.

### Size

The `Class.UISizeConstraint` specifies a minimum and maximum size for a `Class.GuiObject`. This constraint ensures that the `Class.GuiObject` doesn't become too small or large on different screen sizes.

For example, if you set the `Class.UISizeConstraint.MinSize|MinSize` property to <Typography noWrap>`(200, 200)`</Typography> and the `Class.UISizeConstraint.MaxSize|MaxSize` property to <Typography noWrap>`(400, 400)`</Typography>, the `Class.GuiObject` cannot scale smaller than 200&times;200 pixels or larger than 400&times;400 pixels.

<Alert severity="warning">
When a UI object is under control of both a layout structure such as `Class.UIListLayout` and a `Class.UISizeConstraint`, the constraint will **override** the layout and control the object's size.
</Alert>

### Text size

The `Class.UITextSizeConstraint` specifies a minimum and maximum font size for a `Class.GuiObject` with text, such as a `Class.TextLabel`, `Class.TextButton`, or `Class.TextBox`. This constraint ensures that the **text** within a `Class.GuiObject` doesn't become illegible or too large.

If you enable the `Class.TextLabel.TextScaled|TextScaled` property of the parent `Class.GuiObject`, the text size scales with the container's size and respects constraints even if the object becomes smaller or larger than the `Class.UITextSizeConstraint.MinTextSize|MinTextSize` and `Class.UITextSizeConstraint.MaxTextSize|MaxTextSize` values.

For example, the following `Class.TextLabel` object has a `Class.UITextSizeConstraint` with a `Class.UITextSizeConstraint.MinTextSize|MinTextSize` value of `50` and a MaxTextSize value of `80`. Even when the `Class.TextLabel` becomes smaller, the font never becomes smaller than 50 pixels, and when the object becomes large, the font next exceeds 80 pixels.

<video src="../assets/ui/ui-objects/UITextSizeConstraint.mp4" controls width="80%" ></video>

<Alert severity="error">
Do not use `Class.UITextSizeConstraint.MinTextSize|MinTextSize` property values lower than `9` or the text will be difficult to read for many viewers.
</Alert>

### Aspect ratio

The `Class.UIAspectRatioConstraint` enforces a **width‑to‑height** aspect ratio on a `Class.GuiObject` regardless of its core size, even if that size is set as a percentage of its parent. For example, inserting this constraint as a child of a `Class.Frame` and setting the constraint's `Class.UIAspectRatioConstraint.AspectRatio|AspectRatio` property to `2` (`2:1`) keeps the frame's width at twice that of its height. Similarly, setting this constraint's `Class.UIAspectRatioConstraint.AspectRatio|AspectRatio` property to `0.5` (`0.5:1`) keeps the frame's width at half that of its height.

Setting this constraint's `Class.UIAspectRatioConstraint.AspectRatio|AspectRatio` to the default of `1` (`1:1`) is a convenient way to prevent non‑proportional scaling/stretching of an `Class.ImageLabel` with a square image asset, such as an [avatar thumbnail](../projects/assets/index.md#rbxthumb).

<Alert severity="warning">
When a UI object is under control of both a layout structure such as `Class.UIListLayout` and a `Class.UIAspectRatioConstraint`, the constraint will **override** the layout and control the object's size.
</Alert>
