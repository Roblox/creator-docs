---
title: Scrolling frames
description: ScrollingFrames feature built-in scrolling interactivity and are ideal for displaying a lot of information in a confined space.
---

A `Class.ScrollingFrame` consists of a customizable **canvas** and **scroll bars** with built‑in scrolling interactivity and different ways to customize how the scrolling works. `Class.ScrollingFrame` is ideal for displaying a lot of information in a confined space and it works well with [list](../ui/list-flex-layouts.md) and [grid](../ui/grid-table-layouts.md) layouts.

<img src="../assets/ui/ui-objects/ScrollingFrame-Example.jpg" width="840" alt="Example ScrollingFrame on the screen containing a tabbed category bar and a list of magical items for the player to consider purchasing." />

## Canvas

The **canvas** is the primary area of a `Class.ScrollingFrame` that can contain other `Class.GuiObject|GuiObjects`. Scrolling behavior automatically adapts in the following scenarios:

<table>
  <thead>
    <tr>
      <th>Frame Setup</th>
      <th>Result</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>The frame's `Class.ScrollingFrame.CanvasSize|CanvasSize` is taller than its overall height; specifically the total `Class.ScrollingFrame.CanvasSize|CanvasSize.Y` exceeds the total `Class.ScrollingFrame.Size|Size.Y`.</td>
      <td>Vertical scrolling is enabled and a vertical scroll bar appears.</td>
    </tr>
    <tr>
      <td>The frame's `Class.ScrollingFrame.CanvasSize|CanvasSize` is wider than its overall width; specifically the total `Class.ScrollingFrame.CanvasSize|CanvasSize.X` exceeds the total `Class.ScrollingFrame.Size|Size.X`.</td>
      <td>Horizontal scrolling is enabled and a horizontal scroll bar appears.</td>
    </tr>
    <tr>
      <td>The frame's `Class.ScrollingFrame.AutomaticCanvasSize|AutomaticCanvasSize` is set to `Enum.AutomaticSize|Y` or `Enum.AutomaticSize|XY` and the total height of its contents (child `Class.GuiObject|GuiObjects`) exceed its total `Class.ScrollingFrame.Size|Size.Y`.</td>
      <td>Vertical scrolling is enabled and a vertical scroll bar appears.</td>
    </tr>
    <tr>
      <td>The frame's `Class.ScrollingFrame.AutomaticCanvasSize|AutomaticCanvasSize` is set to `Enum.AutomaticSize|X` or `Enum.AutomaticSize|XY` and the total width of its contents (child `Class.GuiObject|GuiObjects`) exceed its total `Class.ScrollingFrame.Size|Size.X`.</td>
      <td>Horizontal scrolling is enabled and a horizontal scroll bar appears.</td>
    </tr>
  </tbody>
</table>

The `Class.ScrollingFrame.CanvasPosition|CanvasPosition` property reflects the **current** positional offset of the canvas within the frame, in pixels, and it sets the position of scroll bars accordingly. Note that this property doesn't do anything if scroll bars aren't visible.

## Insets

A scrolling frame's `Class.ScrollingFrame.CanvasSize|CanvasSize` may be affected by the `Class.ScrollingFrame.VerticalScrollBarInset|VerticalScrollBarInset` and/or `Class.ScrollingFrame.HorizontalScrollBarInset|HorizontalScrollBarInset` properties. In the following example diagram, a vertically scrolling frame uses a canvas width of 100%. With `Class.ScrollingFrame.VerticalScrollBarInset|VerticalScrollBarInset` set to `Enum.ScrollBarInset|None` (default), the canvas extends to the full width of the scrolling frame, obscuring a slight amount of content under the scroll bar. In contrast, a `Class.ScrollingFrame.VerticalScrollBarInset|VerticalScrollBarInset` setting of either `Enum.ScrollBarInset|Always` or `Enum.ScrollBarInset|ScrollBar` insets the canvas by the `Class.ScrollingFrame.ScrollBarThickness|ScrollBarThickness` amount so that the canvas meets edge‑to‑edge with the scroll bar.

<Tabs>
<TabItem label="None (Default)">
<img src="../assets/ui/ui-objects/ScrollingFrame-Canvas-No-Inset.png" width="500" height="310" />
</TabItem>
<TabItem label="Always / ScrollBar">
<img src="../assets/ui/ui-objects/ScrollingFrame-Canvas-Inset.png" width="500" height="310" />
</TabItem>
</Tabs>

## Scroll bars

The frame's **scroll bars** reflect the current canvas position and provide automatic drag‑to‑scroll interactivity. For vertical scroll bars, the `Class.ScrollingFrame.VerticalScrollBarPosition|VerticalScrollBarPosition` property switches the bar's position to either the left or right of the canvas, but horizontal scroll bars can only be positioned below the canvas.

Scroll bar construction consists of three asset properties:

- `Class.ScrollingFrame.TopImage|TopImage` — Displays on the top of a vertical scroll bar, or the left of a horizontal scroll bar (rotated 90&deg; counterclockwise for a horizontal scroll bar).
- `Class.ScrollingFrame.MidImage|MidImage` — Spans the area between `Class.ScrollingFrame.TopImage|TopImage` and `Class.ScrollingFrame.BottomImage|BottomImage` (rotated 90&deg; counterclockwise for a horizontal scroll bar).
- `Class.ScrollingFrame.BottomImage|BottomImage` — Displays on the bottom of a vertical scroll bar, or the right of a horizontal scroll bar (rotated 90&deg; counterclockwise for a horizontal scroll bar).

<img src="../assets/ui/ui-objects/ScrollingFrame-Scroll-Bar-Elements.png" width="600" alt="Diagram showing the three image asset elements which construct a scrolling frame's scroll bar." />

Each image scales based on the `Class.ScrollingFrame.ScrollBarThickness|ScrollBarThickness` property which changes the width of a vertical scroll bar or the height of a horizontal scroll bar.

Additional visual modifications can be made through the `Class.ScrollingFrame.ScrollBarImageColor3|ScrollBarImageColor3` and `Class.ScrollingFrame.ScrollBarImageTransparency|ScrollBarImageTransparency` properties which tint the bar's image assets and modify its opacity, respectively.

## Elasticity

By default, `Class.ScrollingFrame|ScrollingFrames` exhibit elastic scrolling behavior on touch‑enabled devices, meaning that users can drag the canvas slightly further than its bounds and, upon release, the canvas will spring back to its minimum or maximum limit. If you want to remove the elastic behavior completely and ensure the canvas never scrolls past its limits, set the `Class.ScrollingFrame.ElasticBehavior|ElasticBehavior` property to `Enum.ElasticBehavior|Never`.
