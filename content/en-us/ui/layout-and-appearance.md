---
title: UI Layout and Appearance
description: Explains how to use layouts, constraints, and appearance modifiers to create user interfaces with minimal scripting.
comments: |
  1. Add back link to Accessibility Best Practices (alert on line 192).
---

When you design a graphical user interface, you don't have to start from scratch. Roblox provides [layouts](#layouts), [constraints](#constraints), and [appearance modifiers](#appearance-modifiers) so you can create high-quality graphical user interfaces with minimal scripting.

[Layouts](#layouts) allow you to organize `Class.GuiObject|GuiObjects` quickly without having to manually set their size or position. They provide fast and intuitive behavior to structure and sort `Class.GuiObject|GuiObjects` that frequently change.

<figure>
  <img src="../assets/avatar/avatar-editor-service/Avatar-Editor-Example.jpg"
  width="80%" />
  <figcaption>Example inventory GUI menu made with a <a href='#uigridlayout'>UIGridLayout</a></figcaption>
</figure>

[Constraints](#constraints) allow you to create minimum and maximum sizing limitations so your `Class.GuiObject|GuiObjects` function properly within different screen sizes without overlapping or having large gaps between one another. You should typically use constraints for any `Class.GuiObject` that you [position and size](../ui/positioning-and-sizing.md) with the scale value because scale causes the `Class.GuiBase2d.AbsoluteSize|AbsoluteSize` and `Class.GuiBase2d.AbsolutePosition|AbsolutePosition` of the object to responsively change to the size of a user's screen.

<figure>
  <video controls src="../assets/ui/layout-appearance/UITextSizeConstraint.mp4" width="80%"></video>
  <figcaption>Label text constrained to a minimum and maximum size</figcaption>
</figure>

[Appearance modifiers](#appearance-modifiers) give you further control over the appearance and aesthetics of your `Class.GuiObject|GuiObjects`. For example, you can:

- [Apply a gradient](#uigradient) to the background of an object.
- [Apply an outline](#uistroke) to text or a border.
- [Round the corners](#uicorner) of an object.
- [Increase padding](#uipadding) between the borders of an object.
- [Scale](#uiscale) an object to three times its size.

## Layouts

There are four types of layouts you can use within your experiences: [UIListLayouts](#uilistlayout), [UIGridLayouts](#uigridlayout), [UITableLayouts](#uitablelayout), and [UIPageLayouts](#uipagelayout).

To use a layout, you must insert it as a sibling to the applicable `Class.GuiObject|GuiObjects`. If you use multiple layouts in the same parent `Class.GuiObject`, only the first layout you added applies.

### UIListLayout

The `Class.UIListLayout` positions sibling `Class.GuiObject|GuiObjects` into a single vertical or horizontal row within their parent `Class.GuiObject` while retaining each object's original size. Whenever you add or remove a sibling object, the `Class.UIListLayout` repositions the list accordingly.

This layout is useful when you only want to order objects within a row or column, such as a dropdown menu.

<GridContainer numColumns="2">
  <img src="../assets/ui/layout-appearance/UIListLayout.jpg" />
  <img src="../assets/ui/layout-appearance/Explorer-UIListLayout.png" />
</GridContainer>

<Alert severity="warning">
  After you add a `Class.UIListLayout`, you cannot edit the `Class.GuiObject.Position|Position` property for any sibling object within the <b>Properties</b> window.
</Alert>

### UIGridLayout

The `Class.UIGridLayout` positions sibling `Class.GuiObject|GuiObjects` into a grid of uniform cells of the same size within their parent `Class.GuiObject`. The `Class.UIGridLayout` adds cells to a row one-by-one until the next cell doesn't fit, then it starts the next row. For further control, you can use the `Class.UIGridLayout.FillDirectionMaxCells|FillDirectionMaxCells` property to set the maximum number of cells per row.

This layout is useful when you want to display objects within a fixed scale, such as a shop inventory.

<GridContainer numColumns="2">
  <img src="../assets/ui/layout-appearance/UIGridLayout.jpg" />
  <img src="../assets/ui/layout-appearance/Explorer-UIGridLayout.png" />
</GridContainer>

<Alert severity="error">
  Once you add a `Class.UIGridLayout`, you cannot edit the `Class.GuiObject.Position|Position` or `Class.GuiObject.Size|Size` property for any sibling object within the <b>Properties</b> window.
</Alert>

By default, this layout positions `Class.GuiObject|GuiObjects` from left-to-right and top-to-bottom in alphabetical order, but when you change the `Class.UIGridStyleLayout.SortOrder|SortOrder` property from **Name** to **LayoutOrder**, `Class.GuiObject|GuiObjects` sort in ascending order where lower `Class.GuiObject.LayoutOrder|LayoutOrder` values have more priority over higher values, and `Class.GuiObject|GuiObjects` with equal values sort depending on the order in which you added them.

<Alert severity="info">
  The `Class.UIGridLayout` respects any <a href='#constraints'>constraints</a> you place on objects within the grid. For example, if an object has a <a href='#uisizeconstraint'>UISizeConstraint</a> with a `Class.UISizeConstraint.MinSize|MinSize` property that is higher than the grid's `Class.UIGridLayout.CellSize|CellSize` property, the object will span multiple cells.
</Alert>

### UITableLayout

The `Class.UITableLayout` positions sibling `Class.GuiObject|GuiObjects` into rows, and any child `Class.GuiObject|GuiObjects` of these sibling `Class.GuiObject|GuiObjects` become columns. Each cell within a row has the same height while each cell within a column has the same width.

Unless you enable the `Class.UITableLayout.FillEmptySpaceColumns|FillEmptySpaceColumns` or `Class.UITableLayout.FillEmptySpaceRows|FillEmptySpaceRows` property, the parent `Class.GuiObject` determines the dimensions of the cells.

<Alert severity="info">
  If you change the `Class.UIGridLayout.FillDirection|FillDirection` property from <b>Vertical</b> to <b>Horizontal</b>, the `Class.UITableLayout` positions sibling `Class.GuiObject|GuiObjects` into columns instead, and any child `Class.GuiObject|GuiObjects` of these sibling GuiObjects become rows.
</Alert>

This layout is useful when you want further control over which items display where within a grid, such as a backpack inventory that separates items into categories like weapons and potions.

<GridContainer numColumns="2">
  <img src="../assets/ui/layout-appearance/UITableLayout.jpg" />
  <img src="../assets/ui/layout-appearance/Explorer-UITableLayout.png" />
</GridContainer>

<Alert severity="error">
  Once you add a `Class.UITableLayout`, you can edit the `Class.GuiObject.Position|Position` or `Class.GuiObject.Size|Size` property for any sibling object within the <b>Properties</b> window, but it will not take effect.
</Alert>

<Alert severity="info">
  The `Class.UITableLayout` respects and is responsive to the <a href='#uisizeconstraint'>UISizeConstraint</a> you place on objects within the table. For example, if an object has a <a href='#uisizeconstraint'>UISizeConstraint</a> with a `Class.UISizeConstraint.MinSize|MinSize` property within a header cell, the rest of the cells within the column will be the same size as the header cell.
  
  Note that if the `Class.UISizeConstraint.MaxSize|MaxSize` property restricts a cell's size from filling the allotted space of a row or column that is wider than the cell, the object aligns to the top-left of the cell.
</Alert>

### UIPageLayout

When you parent a `Class.UIPageLayout` to a `Class.GuiObject`, every sibling `Class.GuiObject` of the `Class.UIPageLayout` becomes a unique page that you can transition to through script. This layout is useful when you want to create menus with multiple pages, such as tutorials or character customization screens.

<img src="../assets/ui/layout-appearance/Explorer-UIPageLayout.png"
width="40%" />

#### Switching Pages

After you create multiple pages within the `Class.UIPageLayout`, you need to use scripting to transition from page to page. For example, the following code creates three separate pages, each with a different color [frame](./frames.md) that takes up the entire screen. Studio then transitions between the pages every two seconds, moving from page&nbsp;1 to page&nbsp;2 to page&nbsp;3, then returning back from page&nbsp;3 to page&nbsp;2 to page&nbsp;1:

```lua
local screenGui = script.Parent
local pageLayout = Instance.new("UIPageLayout")
pageLayout.Parent = screenGui

local page1 = Instance.new("Frame")
page1.Size = UDim2.fromScale(1, 1)
page1.BackgroundColor3 = Color3.fromRGB(25, 100, 100)
page1.Parent = screenGui

local page2 = Instance.new("Frame")
page2.Size = UDim2.fromScale(1, 1)
page2.BackgroundColor3 = Color3.fromRGB(100, 25, 100)
page2.Parent = screenGui

local page3 = Instance.new("Frame")
page3.Size = UDim2.fromScale(1, 1)
page3.BackgroundColor3 = Color3.fromRGB(100, 100, 25)
page3.Parent = screenGui

while true do
    pageLayout:Next()
    task.wait(2)
    pageLayout:Next()
    task.wait(2)
    pageLayout:Previous()
    task.wait(2)
    pageLayout:Previous()
    task.wait(2)
end
```

If you want to view pages while editing in Studio, you can use the **Command&nbsp;Bar** to navigate from one page to another. This allows you to review where you need to make changes without having to play your experience each time.

To navigate to another page while in **Edit** mode:

1. In the **Explorer** window, select the **UIPageLayout** object.
2. From the **View** tab, open the **Command&nbsp;Bar**.

   - To transition to the next page, input <InlineCode>game:GetService("Selection"):Get()[1]:Next()</InlineCode>.

   - To transition to the previous page, input <InlineCode>game:GetService("Selection"):Get()[1]:Previous()</InlineCode>.

3. Press **Enter**.

## Constraints

There are three types of **constraints** you can use within your experiences: [UIAspectRatioConstraint](#uiaspectratioconstraint), [UISizeConstraint](#uisizeconstraint), and [UITextSizeConstraint](#uitextsizeconstraint).

To use a constraint, you must parent it to the `Class.GuiObject` you want to constrain.

### UIAspectRatioConstraint

The `Class.UIAspectRatioConstraint` specifies an aspect ratio for a `Class.GuiObject` regardless of its actual size, so that it doesn't warp or distort within different screen sizes. This constraint ensures that the `Class.GuiObject` maintains a specific aspect ratio even if its size is set as a percentage of its parent.

<Alert severity="warning">
  When you apply both a size-related <a href='#layouts'>layout</a> and a `Class.UIAspectRatioConstraint`, the constraint will <b>override</b> the layout and control the object's size.
</Alert>

### UISizeConstraint

The `Class.UISizeConstraint` specifies a minimum and maximum size for a `Class.GuiObject`. This constraint ensures that the `Class.GuiObject` doesn't become too small or large on different screen sizes.

For example, if you set the `Class.UISizeConstraint.MaxSize|MaxSize` property to **`{400, 400}`** and the `Class.UISizeConstraint.MinSize|MinSize` to **`{200, 200}`**, the `Class.GuiObject` cannot scale larger than 400 pixels wide and 400 pixels tall, or smaller than 200 pixels wide and 200 pixels tall.

<Alert severity="warning">
  When you apply both a size-related <a href='#layouts'>layout</a> and a `Class.UISizeConstraint`, the constraint will <b>override</b> the layout and control the object's size.
</Alert>

### UITextSizeConstraint

The `Class.UITextSizeConstraint` specifies a minimum and maximum font size for a `Class.GuiObject` with text, such as a `Class.TextLabel`, `Class.TextButton`, or `Class.TextBox`. This constraint ensures that the **text** within a `Class.GuiObject` doesn't become illegible or too large.

If you enable the `Class.TextLabel.TextScaled|TextScaled` property of the parent `Class.GuiObject`, the text size scales with the container's size and respects constraints even if the object becomes smaller or larger than the `Class.UITextSizeConstraint.MinTextSize|MinTextSize` and `Class.UITextSizeConstraint.MaxTextSize|MaxTextSize` values.

For example, the following `Class.TextLabel` object has a `Class.UITextSizeConstraint` with a `Class.UITextSizeConstraint.MinTextSize|MinTextSize` value of `50` and a MaxTextSize value of `80`. Even when the `Class.TextLabel` becomes smaller, the font never becomes smaller than 50 pixels, and when the object becomes large, the font next exceeds 80 pixels.

<video src="../assets/ui/layout-appearance/UITextSizeConstraint.mp4" controls width="80%" ></video>

<Alert severity="warning">
  Don't use `Class.UITextSizeConstraint.MinTextSize|MinTextSize` property values lower than 9, otherwise the text will be difficult to read for most users.
</Alert>

## Appearance Modifiers

By utilizing **appearance modifiers**, you can further customize the appearance of your `Class.GuiObject|GuiObjects`.

### UIGradient

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

#### Color Sequence

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

#### Transparency

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

#### Offset and Rotation

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

### UIStroke

The `Class.UIStroke` instance applies an outline to text or a border. Key features include:

- Adjustable [color](#color--gradient) and [thickness](#thickness) of the stroke outline.
- Ability to set the stroke [transparency](#transparency-1) independently of the parent's transparency.
- Three [corner styles](#corner-style) (round, bevel, or miter).
- Stroke [gradient](#color--gradient) support through the [UIGradient](#uigradient) instance.

#### Text Outline / Border

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

#### Thickness

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

#### Color / Gradient

You can set the stroke color through the `Class.UIStroke.Color|Color` property, as well as insert a child [UIGradient](#uigradient) instance to create gradient strokes.

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

#### Transparency

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

#### Corner Style

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

### UICorner

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

### UIPadding

A `Class.UIPadding` object applies top, bottom, left, and/or right padding to the contents of the parent `Class.GuiObject`.

For example, you can move the text inside a text button downward or upward by applying an offset to the bottom of the button.

<video src="../assets/ui/layout-appearance/UIPadding.mp4" controls
width="80%"></video>

### UIScale

A `Class.UIScale` object stores a numerical value that multiplies the `Class.GuiBase2d.AbsoluteSize|AbsoluteSize` property of the parent `Class.GuiObject`. For example, if you want an object to be twice as large as it currently is, you can insert a `Class.UIScale` object with a `Class.UIScale.Scale|Scale` property of `2`.

This object is useful when you want to resize `Class.GuiObject|GuiObjects` proportionally for different screen sizes without having to manually change the size and position properties for each individual `Class.GuiObject`. It is also useful to test a range of different sizes without committing to the changes.
