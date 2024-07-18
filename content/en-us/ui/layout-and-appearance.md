---
title: UI Layouts and Constraints
description: Explains how to use layouts and constraints to create user interfaces with minimal scripting.
---

When you design a graphical user interface in Roblox, you don't have to arrange everything manually or compromise on appearance across various devices. With the addition of [layouts](#layouts) and [constraints](#constraints), you can create high-quality interfaces with minimal or no scripting.

- UI [layouts](#layouts) allow you to organize `Class.GuiObject|GuiObjects` quickly without having to manually set their size or position. They provide fast and intuitive behavior to structure and sort `Class.GuiObject|GuiObjects` that frequently change.

  <figure>
  <img src="../assets/avatar/avatar-editor-service/Avatar-Editor-Example.jpg" width="80%" />
	<figcaption>Inventory menu designed with a grid layout</figcaption>
	</figure>

- UI [constraints](#constraints) allow you to create minimum and maximum sizing limitations so your `Class.GuiObject|GuiObjects` function properly within different screen sizes without overlapping or having large gaps between one another.

  <figure>
    <video controls src="../assets/ui/layout-appearance/UITextSizeConstraint.mp4" width="80%"></video>
    <figcaption>Label text constrained to a minimum and maximum size</figcaption>
  </figure>

## Layouts

There are four types of layouts you can use within your experiences: [list](#list), [grid](#grid), [table](#table), and [page](#page).

To use a layout, you must insert it as a **sibling** to the applicable `Class.GuiObject|GuiObjects`. If you use multiple layouts in the same parent `Class.GuiObject`, only the first layout you added applies, although you can use `Class.Folder|Folders` in a UI hierarchy to define a distinct layout type per folder. For example, you can set up a `Class.Frame` with multiple `Class.Folder` children, each with a different `Class.UILayout` type. Additionally, `Class.Folder` contents are exempt from the effects of a `Class.UILayout` sibling.

### List

The `Class.UIListLayout` positions sibling `Class.GuiObject|GuiObjects` into a single vertical or horizontal row within their parent `Class.GuiObject` while retaining each object's original size. Whenever you add or remove a sibling object, the `Class.UIListLayout` repositions the list accordingly.

This layout is useful when you only want to order objects within a row or column, such as a dropdown menu.

<GridContainer numColumns="2">
  <img src="../assets/ui/layout-appearance/UIListLayout.jpg" />
  <img src="../assets/ui/layout-appearance/Explorer-UIListLayout.png" />
</GridContainer>

<Alert severity="warning">
  After you add a `Class.UIListLayout`, you cannot edit the `Class.GuiObject.Position|Position` property for any sibling object within the <b>Properties</b> window.
</Alert>

### Grid

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
The `Class.UIGridLayout` respects any [constraints](#constraints) you place on objects within the grid. For example, if an object has a `Class.UISizeConstraint` with a `Class.UISizeConstraint.MinSize|MinSize` property that is higher than the grid's `Class.UIGridLayout.CellSize|CellSize` property, the object will span multiple cells.
</Alert>

### Table

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

<Alert severity="warning">
Once you add a `Class.UITableLayout`, you can edit the `Class.GuiObject.Position|Position` or `Class.GuiObject.Size|Size` property for any sibling object within the [Properties](../studio/properties.md) window, but it will not take effect.
</Alert>

<Alert severity="info">
The `Class.UITableLayout` respects and is responsive to any `Class.UISizeConstraint` you place on objects within the table. For example, if an object has a `Class.UISizeConstraint` with a `Class.UISizeConstraint.MinSize|MinSize` property within a header cell, the rest of the cells within the column will be the same size as the header cell.
  
Note that if the `Class.UISizeConstraint.MaxSize|MaxSize` property restricts a cell's size from filling the allotted space of a row or column that is wider than the cell, the object aligns to the top-left of the cell.
</Alert>

### Page

When you parent a `Class.UIPageLayout` to a `Class.GuiObject`, every sibling `Class.GuiObject` of the `Class.UIPageLayout` becomes a unique page that you can transition to through script. This layout is useful when you want to create menus with multiple pages, such as tutorials or character customization screens.

<img src="../assets/ui/layout-appearance/Explorer-UIPageLayout.png" width="320" />

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

There are three types of **constraints** you can use for a user interface object: [size](#size), [text size](#text-size), and [aspect&nbsp;ratio](#aspect-ratio). To use a constraint, you must set it as a **child** of the `Class.GuiObject` you want to constrain.

### Size

The `Class.UISizeConstraint` specifies a minimum and maximum size for a `Class.GuiObject`. This constraint ensures that the `Class.GuiObject` doesn't become too small or large on different screen sizes.

For example, if you set the `Class.UISizeConstraint.MaxSize|MaxSize` property to **`{400, 400}`** and the `Class.UISizeConstraint.MinSize|MinSize` to **`{200, 200}`**, the `Class.GuiObject` cannot scale larger than 400 pixels wide and 400 pixels tall, or smaller than 200 pixels wide and 200 pixels tall.

<Alert severity="warning">
When you apply both a size-related [layout](#layouts) and a `Class.UISizeConstraint`, the constraint will **override** the layout and control the object's size.
</Alert>

### Text Size

The `Class.UITextSizeConstraint` specifies a minimum and maximum font size for a `Class.GuiObject` with text, such as a `Class.TextLabel`, `Class.TextButton`, or `Class.TextBox`. This constraint ensures that the **text** within a `Class.GuiObject` doesn't become illegible or too large.

If you enable the `Class.TextLabel.TextScaled|TextScaled` property of the parent `Class.GuiObject`, the text size scales with the container's size and respects constraints even if the object becomes smaller or larger than the `Class.UITextSizeConstraint.MinTextSize|MinTextSize` and `Class.UITextSizeConstraint.MaxTextSize|MaxTextSize` values.

For example, the following `Class.TextLabel` object has a `Class.UITextSizeConstraint` with a `Class.UITextSizeConstraint.MinTextSize|MinTextSize` value of `50` and a MaxTextSize value of `80`. Even when the `Class.TextLabel` becomes smaller, the font never becomes smaller than 50 pixels, and when the object becomes large, the font next exceeds 80 pixels.

<video src="../assets/ui/layout-appearance/UITextSizeConstraint.mp4" controls width="80%" ></video>

<Alert severity="warning">
Do not use `Class.UITextSizeConstraint.MinTextSize|MinTextSize` property values lower than **9** or the text will be difficult to read for most users.
</Alert>

### Aspect Ratio

The `Class.UIAspectRatioConstraint` specifies an aspect ratio for a `Class.GuiObject` regardless of its actual size, so that it doesn't warp or distort within different screen sizes. This constraint ensures that the `Class.GuiObject` maintains a specific aspect ratio even if its size is set as a percentage of its parent.

<Alert severity="warning">
When you apply both a size-related [layout](#layouts) and a `Class.UIAspectRatioConstraint`, the constraint will **override** the layout and control the object's size.
</Alert>

## Scale

A `Class.UIScale` object stores a numerical value that multiplies the `Class.GuiBase2d.AbsoluteSize|AbsoluteSize` property of the parent `Class.GuiObject`. For example, if you want an object to be twice as large as it currently is, you can insert a `Class.UIScale` object with a `Class.UIScale.Scale|Scale` property of `2`.

This object is useful when you want to resize `Class.GuiObject|GuiObjects` proportionally for different screen sizes without having to manually change the size and position properties for each individual `Class.GuiObject`. It is also useful to test a range of different sizes without committing to the changes.
