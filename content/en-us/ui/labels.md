---
title: Labels
description: Labels are GuiObjects that let you display customizable text and images.
---

Labels are `Class.GuiObject|GuiObjects` that
allow you to display customizable text and images within a
`Class.ScreenGui` or
`Class.SurfaceGui`. There are two types of labels:

- A `Class.TextLabel` is a rectangle with text that you can style through customizable properties. This is the main way to display text in an experience.

- An `Class.ImageLabel` is a rectangle with an image that you can style through customizable properties. This is the main way to display images in an experience.

<img src="../assets/ui/labels/Labels-Example.jpg" width="80%" />

## Creating Labels on the Screen

Labels on a screen are useful for things like displaying images of characters
with dialog.

To add a label to a screen:

1. In the **Explorer** window, select **StarterGui** and add a **ScreenGui**.

   1. Hover over StarterGui and click the &CirclePlus; button. A contextual menu displays.

   1. From the menu, insert a **ScreenGui**.

2. Select the new **ScreenGui** and add a label.

   1. Hover over **ScreenGui** and click the &CirclePlus; button. A contextual menu displays.

   1. From the menu, insert a **TextLabel** or **ImageLabel**.

   <img src="../assets/ui/button-text-input/ImageButton-Screen-New.jpg" width="80%" />

## Creating Labels on Part Faces

Labels on a part are useful for things like creating billboards, posters, and
wallpaper.

To add a label to the face of a part:

1. In the **Explorer** window, select **StarterGui** and add a **SurfaceGui**.

   1. Hover over StarterGui and click the &CirclePlus; button. A contextual menu displays.

   1. From the menu, insert a **ScreenGui**.

2. Select the new **SurfaceGui** and add a label.

   1. Hover over **SurfaceGui** and click the &CirclePlus; button. A contextual menu displays.

   1. From the menu, insert a **TextLabel** or **ImageLabel**.

   <img src="../assets/ui/button-text-input/ImageButton-SurfaceGui-New.jpg" width="80%" />

   <Alert severity="warning">
   If you don't see the button, try [choosing a different face](../parts/textures-decals.md#choosing-a-face) in the <b>Face</b> property of the <b>SurfaceGui</b>.
   </Alert>

## Adjusting ImageLabel Properties

All images within an `Class.ImageLabel` must be assets that have been [imported](../projects/assets/manager.md#importing-assets) to Studio. While the image automatically scales to fit the area of the rectangle, the image looks best when it displays at its native resolution.

You can customize the visual appearance of an image with the following
properties:

- `Class.ImageLabel.ImageColor3|ImageColor3`

- `Class.ImageLabel.ImageTransparency|ImageTransparency`

- `Class.GuiObject.BackgroundTransparency|BackgroundTransparency`

For example, to display only the image and hide the rectangle, set the `Class.GuiObject.BackgroundTransparency|BackgroundTransparency` property to `1`.
