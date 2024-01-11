---
title: Buttons
description: Buttons allow users to prompt an action.
---

When designing buttons, `Class.TextButton` and
`Class.ImageButton` objects allow a user to perform an action.
You can customize these objects to provide context and prompts for what you
want a user to do. For example, you can provide users visual feedback by
changing the appearance of an ImageButton when a user clicks it.

Because these objects are `Class.GuiObject|GuiObjects`, you can customize properties such as `Class.GuiObject.BackgroundColor3|BackgroundColor3`, `Class.GuiObject.BorderMode|BorderMode`, `Class.GuiObject.Transparency|Transparency`, and `Class.GuiObject.Rotation|Rotation` to fit the aesthetics of your experience.

There are two types of buttons you can use on a screen or surface of a part:

- **TextButton** - A `Class.TextButton`
  is a rectangle with text that performs a set action when clicked.
  This action determines the `Class.GuiButton.Activated` property with [scripting](#scripting-buttons).

- **ImageButton** - An `Class.ImageButton`
  is a rectangle with an image that performs a set action when clicked. This
  object is useful for a character selection screen or intuitive quick-action
  buttons, such as a button with a cart icon that opens a marketplace.

  <img src="../assets/ui/button-text-input/ImageButton-Examples.jpg"
   width="800" />

## Creating Buttons on the Screen

Buttons on a screen are useful to quickly guide users to various menus or pages.

To add a button to the screen:

1. In the **Explorer** window, select **StarterGui** and add a **ScreenGui**.

   1. Hover over **StarterGui** and click the &CirclePlus; button. A contextual menu displays.

   1. Insert a **ScreenGui**.

2. Select the new **ScreenGui** and add a button.

   1. Hover over **ScreenGui** and click the &CirclePlus; button. A contextual menu displays.

   1. Insert either a **TextButton** or **ImageButton**.

   <img src="../assets/ui/button-text-input/ImageButton-Screen-New.jpg" width="800" />

## Creating Buttons on Part Faces

Buttons on a part are useful for allowing users to interact with parts. For
example, you can let users step on a button to complete an action.

To add a button to the face of a part:

1. In the **Explorer** window, select the **part** and add a **SurfaceGui**.

   1. Hover over the **part** and click the &CirclePlus; button. A contextual menu displays.

   1. Insert a **SurfaceGui**.

2. Select the new **SurfaceGui** and add any type of button or input.

   1. Hover over **SurfaceGui** and click the &CirclePlus; button. A contextual menu displays.

   1. Insert either a **TextButton** or
      **ImageButton**.

   <img src="../assets/ui/button-text-input/ImageButton-SurfaceGui-New.jpg"
   width="800" />

   <Alert severity="warning">
   If you don't see the button, try [choosing a different face](../parts/textures-decals.md#choosing-a-face) in the <b>Face</b> property of the <b>SurfaceGui</b>.
   </Alert>

## Changing the Appearance of an ImageButton

Changing the appearance of an `Class.ImageButton` when a user is interacting with it provides useful visual feedback. For example, when an `Class.ImageButton` changes visual appearance when a user hovers over it, it lets the user know that it isn't disabled and that they have the option to click it if they want to perform that `Class.ImageButton` action.

An `Class.ImageButton` has three properties to change its visual appearance:

- `Class.ImageButton.Image|Image` - The image that displays when a user is not interacting with the `Class.ImageButton`.

- `Class.ImageButton.HoverImage|HoverImage` - The image that displays when a user is hovering their cursor over the `Class.ImageButton`.

- `Class.ImageButton.PressedImage|PressedImage` - The image that displays when a user is clicking the `Class.ImageButton`.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/ui/button-text-input/ImageButton-State-Normal.png" />
    <figcaption>Normal</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/button-text-input/ImageButton-State-Hover.png" />
    <figcaption>Hover</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/button-text-input/ImageButton-State-Pressed.png" />
    <figcaption>Pressed</figcaption>
  </figure>
</GridContainer>

To change the appearance of an `Class.ImageButton` with user input:

1. Add an **ImageButton** to a [screen](#creating-buttons-on-the-screen) or a [surface](#creating-buttons-on-the-screen).

2. In the **Explorer** window, click the **ImageButton** object.

3. In the **Properties** window, assign three different respective asset IDs for the **Image**, **HoverImage**, and **PressedImage** properties.

## Scripting Buttons

You can script an action when a user presses a button by connecting the button to a `Class.GuiButton.Activated` event. For example, when you parent the following `Class.LocalScript` to a button, the button changes to a random color every time a user clicks it.

```lua
local button = script.Parent
local RNG = Random.new()
local function onButtonActivated()
	-- randomize the button color
	button.BackgroundColor3 = Color3.fromHSV(RNG:NextNumber(), 1, 1)
end
button.Activated:Connect(onButtonActivated)
```
