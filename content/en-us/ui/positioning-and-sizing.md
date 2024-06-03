---
title: Positioning and Sizing UI Objects
description: Explains the process of positioning, sizing, and ordering GuiObjects on a user's screen.
---

When designing a user interface, you have complete control over how to [position](#position), [size](#size), and [order](#zindex) `Class.GuiObject|GuiObjects` on a user's screen. By customizing the following properties of a `Class.GuiObject`, you can format your UI to create a positive user experience, and match the aesthetics of your experience:

- `Class.GuiObject.Position|Position` - Shifts objects to a new [location](#position) on the screen.
- `Class.GuiObject.Size|Size` – Scales objects to a new [proportion](#size).
- `Class.GuiObject.AnchorPoint|AnchorPoint` – Sets the object's [origin point](#anchorpoint) for positioning, as well as the direction the object's size scales from.
- `Class.GuiObject.ZIndex|ZIndex` – Controls the [order](#zindex) in which objects overlap on another.

## Position

The `Class.GuiObject.Position|Position` property has
two `Datatype.UDim2` coordinates that position a
`Class.GuiObject` on the X axis and the Y
axis:

- **Scale** - A value from 0 to 1 that represents a **fraction** of the Roblox
  window size. This value keeps the object in the same proportional screen
  region even when the Studio window size changes.
- **Offset** - A value that represents the **number of pixels** to shift the
  object on the screen. You can use this value to position the object from the
  edge of the screen or other objects.

<img src="../assets/ui/layout-appearance/Positioning-With-AnchorPoint.jpg" width="80%" />

To view and edit the position of an object:

1. Go to the **Properties** window and click the dropdown arrow to the left of the **Position** property.
1. Expand the **X** and **Y** branches to see the **Scale** and **Offset** display for both axes.

   <img src="../assets/ui/layout-appearance/Properties-Position-X-Y.png" width="320" />

## Size

Similar to the [`Position`](#position) property, the `Class.GuiObject.Size|Size` property has two `Datatype.UDim2` coordinates that size a `Class.GuiObject` on the X axis and the Y axis through scale and offset.

- **Scale** - A value from 0 to 1 that represents a **fraction** of the Roblox window size. This value scales the object in the same proportional screen region even when the Studio window size changes.

- **Offset** - A value that represents the **number of pixels** the object takes up on the screen, additive to any scale value.

Using the **Scale** value for each axis, you can customize an object's size to be responsive to a user's screen size. For example, if a [`frame`](./frames.md) has a `Class.GuiObject.Size|Size` property value of `{0.75, 0},{0.25, 0}`, the frame scales to 75% of the screen horizontally and 25% vertically.

<img src="../assets/ui/layout-appearance/Sizing-With-Scale.jpg" width="80%" />

To view and edit the size of an object:

1. Go to the **Properties** window and click the dropdown arrow to the left of the **Size** property.
1. Expand the **X** and **Y** branches to see the **Scale** and **Offset** display for both axes.

   <img src="../assets/ui/layout-appearance/Properties-Size-X-Y.png" width="320" />

## AnchorPoint

The `Class.GuiObject.AnchorPoint|AnchorPoint` property defines the **origin point** of a `Class.GuiObject`, and the origin point determines the directions from where the object changes position and size. For example, the default `Class.GuiObject.AnchorPoint|AnchorPoint` property values are `(0, 0)`, meaning that the anchor point is in the top-left corner of the object. Whenever you change the [position](#position) or [size](#size) of the object, it moves and scales out from this point.

<img src="../assets/ui/layout-appearance/AnchorPoint-Diagram-TL.png" width="400" />

The `Class.GuiObject.AnchorPoint|AnchorPoint` property is a **fraction** from 0 to 1, relative to the size of the object. For example, an object with `Class.GuiObject.AnchorPoint|AnchorPoint` property values of `(0.5, 0.5)` shifts the anchor point to halfway (50%) through the object both horizontally and vertically, and any changes to its [position](#position) or [size](#size) both move and scale outward from this point.

<img src="../assets/ui/layout-appearance/AnchorPoint-Diagram-C.png" width="400" />

Adjusting the `Class.GuiObject.AnchorPoint|AnchorPoint` property makes it easier to correctly position an object in different sections of the screen **without additional offset values**.

To view and edit the anchor point of an object:

1. In the **Explorer** window, select a `Class.GuiObject`.
2. In the **Properties** window, click the dropdown arrow to the left of the **AnchorPoint** property. The X and Y axes values display.

   <img src="../assets/ui/layout-appearance/Properties-AnchorPoint.png" width="320" />

## ZIndex

The `Class.GuiObject.ZIndex|ZIndex` property defines the layer order in which `Class.GuiObject|GuiObjects` render and overlap each other. If you want to create new rendering layers, you must set the `Class.GuiObject.ZIndex|ZIndex` property to different positive or negative integer values for each object.

By default, objects render according to their raw **ZIndex** value; the higher the value, the closer an object renders to the top layer. You can change this render order by changing the value of the [`Class.ScreenGui.ZIndexBehavior`](#zindexbehavior).

To edit the **ZIndex** of an object

1. In the **Explorer** window, select a `Class.GuiObject`.
2. In the **Properties** window, enter a new value for the **ZIndex** property.

  <img src="../assets/ui/layout-appearance/Properties-ZIndex.png" width="320" />

### ZIndexBehavior

`Class.ScreenGui` objects have a
`Enum.ZIndexBehavior` that defines how
descendant `Class.GuiObject|GuiObjects` sort according
to their [`ZIndex`](#zindex) values. There are two possible
`Enum.ZIndexBehavior` values:

- **Global** - The default behavior that sorts all descendant objects in a [ScreenGui](../ui/on-screen-containers.md) container by their raw [`ZIndex`](#zindex) value. You should keep this behavior if you want to have full control over the rendering hierarchy, but you have to manually set a different ZIndex value for nearly every object.

- **Sibling** - Sorts all objects that have the same parent. If any objects have the same ZIndex value, they render on top of their parent, then you can manually set their ZIndex values if they are overlapping. You should use this behavior if you want to skip setting ZIndex values for every object.

  <Alert severity="info">
    When two `Class.GuiObject|GuiObjects` have the same parent and ZIndex, the object you most recently created renders on top of the other. If you want to render an object on top of other objects with the same ZIndex value, you can cut and re-paste it so it becomes the most recently created object.
  </Alert>

To view and select another ZIndexBehavior value for a
`Class.ScreenGui` container:

   <img src="../assets/ui/layout-appearance/Properties-ZIndexBehavior.png" width="320" />

   <img src="../assets/ui/layout-appearance/Properties-ZIndexBehavior.png" width="320" />
