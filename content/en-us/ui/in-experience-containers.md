---
title: In-Experience UI Containers
description: In-experience UI containers hold SurfaceGuis, BillboardGuis, and GuiObjects that you want to display in the 3D space.
---

In-experience UI container objects such as `Class.SurfaceGui|SurfaceGuis` and
`Class.BillboardGui|BillboardGuis` hold `Class.GuiObject|GuiObjects` that you want to display within your experience's 3D world.

The following example shows two different types of UI Containers:

- A `Class.SurfaceGui` container holding an `Class.ImageLabel` that is anchored in the 3D world.
- A `Class.BillboardGui` holding a `Class.TextLabel` which is visible from every angle.

<video src="../assets/ui/in-experience/Showcase.mp4" controls width="80%"></video>

## SurfaceGui

A `Class.SurfaceGui` object is a
container for `Class.GuiObject|GuiObjects` that
display on an object's surface in an experience's 3D world.
Similar to decals, the `Class.GuiObject|GuiObjects` face the same direction as the surface they are on, which you can change through the `Class.SurfaceGui.Face|Face` property of the `Class.SurfaceGui`.

<img src="../assets/ui/in-experience/SurfaceGui-Diagram.jpg" width="80%" />

## BillboardGui

A `Class.BillboardGui` object is a
container for `Class.GuiObject|GuiObjects` that
must always face the camera regardless of the viewing angle. This container is
useful for displaying users' names or providing clear map markers.

You can customize the content within a `Class.BillboardGui` to change size depending on how far a player is from the object. If you want the object to remain the same size regardless of a player's distance from the object, remove any offset from the `Class.BillboardGui.Size|Size` property.

<img src="../assets/ui/in-experience/BillboardGui-Diagram.jpg" width="80%" />

## Adornee Property

The `Class.SurfaceGui.Adornee|Adornee` property
specifies which `Class.BasePart` the
`Class.SurfaceGui` or
`Class.BillboardGui` displays on.
When you set this property, it overrides the parent part's behavior.

You must set the `Class.SurfaceGui.Adornee|Adornee` property if you parent a `Class.SurfaceGui` or `Class.BillboardGui` to the [StarterGui](../ui/on-screen-containers.md#startergui) or [PlayerGui](../ui/on-screen-containers.md#playergui) folder.

For example, if you parent a `Class.BillboardGui` to Part A, but set the `Class.SurfaceGui.Adornee|Adornee` property to Part B, the GUI displays on Part B. If you parent the `Class.SurfaceGui` or `Class.BillboardGui` to a part without setting the `Class.SurfaceGui|Adornee`, the GUI displays on the part by default.
