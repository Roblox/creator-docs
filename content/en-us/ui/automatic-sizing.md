---
title: Automatic Sizing
description: Explains how to automatically resize a parent GuiObject to the size of its descendants.
---

The `Class.GuiObject.AutomaticSize|AutomaticSize` property automatically resizes a parent `Class.GuiObject` to the size of its descendants. By applying this property, you can dynamically add text and image content to a `Class.GuiObject`, and its size actively adjusts to fit that content. You can use this property in a variety of use cases, including:

- **Localized text** – Expanding a `Class.GuiObject` to fit text that has been [localized](../production/localization/index.md) in many languages.
- **User input** – Allowing users to [input text](../ui/text-input.md) within a `Class.TextBox`, automatically adjusting its size based on the amount of text entered.
- **Dynamic Layouts** – Utilizing UI [layouts](../ui/layout-and-appearance.md#layouts), such as `Class.UIListLayout|UIListLayouts` that automatically resize according to how many items are in their lists.
- **Scrolling Frames** – Automatically resizing the canvas of a `Class.ScrollingFrame` according to its content.
- **Rich Text** – Automatically adjusting the size of text objects using [rich text markup](../ui/rich-text.md), including font type and size.

<video controls width="90%" src="../assets/ui/automatic-sizing/Intro-Frame.mp4"></video>

## Enabling Automatic Sizing

You can enable the `Class.GuiObject.AutomaticSize|AutomaticSize` property for any `Class.GuiObject`. By default, it is set to `None`, but you can change its value to have specific control over which direction(s) the `Class.GuiObject` resizes to fit its content.

To enable the AutomaticSize property:

1. In the **Explorer** window, click any `Class.GuiObject`, such as a `Class.Frame`, `Class.TextBox`, or `Class.ImageLabel`.
2. In the **Properties** window, navigate to the **AutomaticSize** property and set it to one of the following options:

   - **X** - Resizes content horizontally.
   - **Y** - Resizes content vertically.
   - **XY** - Resizes content both horizontally and vertically.

     <img src="../assets/ui/automatic-sizing/Enabling-AutomaticSize.jpg" width="320" />

<Alert severity="info">
   Note that `Class.ScrollingFrame|ScrollingFrames` use the `Class.ScrollingFrame.AutomaticCanvasSize|AutomaticCanvasSize` property instead of `Class.GuiObject.AutomaticSize|AutomaticSize`. It behaves the same but resizes the `Class.ScrollingFrame.CanvasSize|CanvasSize` of the `Class.ScrollingFrame|ScrollingFrames`, not its base `Class.GuiObject.Size|Size`.
   </Alert>

## Customizing Automatic Sizing

In addition to enabling the `Class.GuiObject.AutomaticSize|AutomaticSize` property, you can customize additional properties of your `Class.GuiObject` that also impact its automatic sizing functionality.

### AnchorPoint

Similar to the typical process of [sizing](../ui/positioning-and-sizing.md#size) a `Class.GuiObject`, automatic sizing takes the `Class.GuiObject.AnchorPoint|AnchorPoint` property into consideration when it's resizing content. For example, the following video displays three `Class.TextLabel|TextLabels` that are automatically sizing their text content:

- The top `Class.TextLabel` has an `Class.GuiObject.AnchorPoint|AnchorPoint` value of (`0`, `0.5`), which anchors it to the middle of the left side of the `Class.TextLabel`.
- The middle `Class.TextLabel` has an `Class.GuiObject.AnchorPoint|AnchorPoint` value of (`0.5`, `0.5`), which anchors it to the center of the `Class.TextLabel`.
- The bottom `Class.TextLabel` has an `Class.GuiObject.AnchorPoint|AnchorPoint` value of (`1.0`, `0.5`), which anchors it to the middle of the right side of the `Class.TextLabel`.

<video controls width="80%" src="../assets/ui/automatic-sizing/customizing-anchorpoint.mp4"></video>

### Size

When you enable the `Class.GuiObject.AutomaticSize|AutomaticSize` property for a `Class.GuiObject`, its `Class.GuiObject.Size|Size` property controls its **minimum size**. This means that the `Class.GuiObject` cannot resize smaller than its starting size along any axis.

For example, the following white `Class.Frame` has an X-axis size of `0`, so it doesn't have a minimum width and can resize to the width of its child object.

<video controls width="80%" src="../assets/ui/automatic-sizing/customizing-size-0.mp4"></video>

In comparison, the following white `Class.Frame` has an X size of `100`, so it cannot resize smaller than 100 pixels.

<video controls width="80%" src="../assets/ui/automatic-sizing/customizing-size-100.mp4"></video>

### TextWrapped

When you enable the `TextWrapped` property for a `Class.TextLabel`, `Class.TextButton`, or `Class.TextBox` and set the `Class.GuiObject.AutomaticSize|AutomaticSize` property to either `Y` or `XY`, the label resizes to accommodate any text that wraps across multiple lines. For example, the following `Class.TextLabel` has `TextWrapped` enabled and a set `Class.GuiObject.AutomaticSize|AutomaticSize` property of `Y`, so when a user types in more content, the `Class.TextLabel` expands vertically.

<video controls width="80%" src="../assets/ui/automatic-sizing/customizing-textwrapping.mp4"></video>

### TextScaled

Instead of enabling the `TextScaled` property for any `Class.TextLabel|TextLabels`, `Class.TextButton|TextButtons`, and `Class.TextBox|TextBoxes`, use the `Class.GuiObject.AutomaticSize|AutomaticSize` property for a `Class.GuiObject` instead. This ensures that the text within your text objects maintains a consistent text size and never scales to a font size that is illegible. For more information, see the API Reference for `Class.TextLabel.TextScaled`, `Class.TextButton.TextScaled`, and `Class.TextBox.TextScaled`.

<Alert severity="warning">
   Don't use both the `TextScaled` property and the `Class.GuiObject.AutomaticSize|AutomaticSize` property for a `Class.GuiObject` at the same time because it can result in significant scaling differences. For example, `Class.GuiObject.AutomaticSize|AutomaticSize` determines the maximum amount of available space that a `Class.GuiObject` can use and `TextScaled` uses this available space to scale the font size to fit the available space. If you don't set any size constraints, your font scales to the maximum font size,  which might result in illegible text that is too large.
   </Alert>
