---
title: Interactive Buttons
description: The process for creating interactive on-screen buttons.
---

This tutorial shows you how to make on-screen buttons for menus, interface actions, and more.

![alt](../../../assets/tutorials/interactive-buttons/Intro-Screenshot.jpg)

## Button Types

There are two types of button objects that you can use in your UI designs:

<table>
    <thead>
        <tr>
            <th>
            TextButton
            </th>
            <th>
            ImageButton
            </th>
        </tr>
    </thead>
    <tbody>
    <tr>
            <td ><img src="../../../assets/tutorials/interactive-buttons/Button-Example-TextButton.png" />
            </td>
            <td><img src="../../../assets/tutorials/interactive-buttons/Button-Example-ImageButton.png" />
            </td>
        </tr>
        <tr>
            <td>
            A `Class.TextButton` is similar to a `Class.TextLabel` except that players can activate it with a click/tap. It also shares many of the same visual properties &mdash; font, background color, stroke color, etc.
            </td>
            <td>
            An `Class.ImageButton` is like an interactive version of the `Class.ImageLabel` object. It also shares most of the same properties as its non-button counterpart.
            </td>
        </tr>
    </tbody>
</table>

## Creating a Button

The following steps show how to add an `Class.ImageButton` to the screen and flip it between three appearances depending on the player's interaction.

1. In the Explorer window, hover over the **StarterGui** object, click the **+** button, and insert a **ScreenGui**.

   <img src="../../../assets/tutorials/shared/interface/StarterGui-ScreenGui.png" width="60%" />

2. Select the new **ScreenGui** object and, in a similar way, insert an **ImageButton**.

   <img src="../../../assets/tutorials/interactive-buttons/New-ImageButton.png" width="60%" />

   This will add an empty image button to the corner of the game view.

   ![alt](../../../assets/tutorials/interactive-buttons/ImageButton-Inserted.jpg)

3. As a best practice, rename the new button according to its purpose, for example **MapButton**.

   <img src="../../../assets/tutorials/interactive-buttons/ImageButton-Renamed.png" width="60%" />

### Size

For the button to dynamically resize on various devices and screens, it's best to use **Scale** properties.

1. In the **Properties** window, locate the **Size** property and click the arrow to expand its tree.

   <img src="../../../assets/tutorials/shared/interface/Expand-Size-Tree.png" width="60%" />

2. Set the following size properties:

   <img src="../../../assets/tutorials/interactive-buttons/ImageButton-Size.png" width="60%" />

3. Constrain the button to a square bounding box by setting **SizeConstraint** to **RelativeYY**.
   <img src="../../../assets/tutorials/interactive-buttons/ImageButton-SizeConstraint.png" width="60%" />

### Scaling

The current size should work nicely on a phone, but the **X/Y** scale of **0.15** (15%) may appear too large on a computer screen. To correct this, you can add a `Class.UISizeConstraint`.

1. Hover over the **MapButton** object and insert a **UISizeConstraint**.

   <img src="../../../assets/tutorials/interactive-buttons/New-UISizeConstraint.png" width="60%" />

2. Select the new size constraint object and set its **MaxSize** property to **90, 90**.

   <img src="../../../assets/tutorials/interactive-buttons/UISizeConstraint-MaxSize.png" width="60%" />

### Position

Buttons should typically be moved within a player's thumb reach on mobile devices, for instance the lower-right area of the screen.

1. Change the button's **AnchorPoint** property to **0.5, 1** so that positioning will be based around its bottom-center point.

   <img src="../../../assets/tutorials/interactive-buttons/ImageButton-AnchorPoint.png" width="60%" />

2. Expand the button's **Position** tree and set the following property values. This will move the button near the default jump button that appears on phones/tablets.

   <img src="../../../assets/tutorials/interactive-buttons/ImageButton-Position.png" width="60%" />

   ![alt](../../../assets/tutorials/interactive-buttons/ImageButton-Moved.jpg)

### Images

This button needs three custom images — its normal appearance on the screen, a hover-over appearance, and a final image for when the player presses it.

<Grid container spacing={4}>
    <Grid item xs={4}>
      <img src="../../../assets/tutorials/interactive-buttons/Map-Icon-Normal.png" />
      <h4>Normal</h4>
    </Grid>
    <Grid item xs={4}>
      <img src="../../../assets/tutorials/interactive-buttons/Map-Icon-Hover.png" />
      <h4>Hover</h4>
    </Grid>
    <Grid item xs={4}>
      <img src="../../../assets/tutorials/interactive-buttons/Map-Icon-Pressed.png" />
      <h4>Pressed</h4>
    </Grid>
</Grid>

Setting these appearances can be done through the **Image**, **HoverImage**, and **PressedImage** properties.

1. Locate the button's **Image** property and paste in `rbxassetid://6025368017`, or [use your own asset](../../../production/creator-store.md).

   <img src="../../../assets/tutorials/interactive-buttons/ImageButton-Image.png" width="60%" />

2. For the **HoverImage** property, paste in `rbxassetid://6025452347`.

   <img src="../../../assets/tutorials/interactive-buttons/ImageButton-HoverImage.png" width="60%" />

3. For the **PressedImage** property, paste in `rbxassetid://6025454897`.

   <img src="../../../assets/tutorials/interactive-buttons/ImageButton-PressedImage.png" width="60%" />

### Styling

To finalize the button's appearance on screen, make the following adjustments:

1. Set **BackgroundTransparency** to a value of **1** to make the background transparent.

   <img src="../../../assets/tutorials/interactive-buttons/Background-Transparency.png" width="60%" />

   ![alt](../../../assets/tutorials/interactive-buttons/ImageButton-Finalized-A.jpg)

2. Rotate the button slightly by setting **Rotation** to **-5**.

   <img src="../../../assets/tutorials/interactive-buttons/ImageButton-Rotation.png" width="60%" />

   ![alt](../../../assets/tutorials/interactive-buttons/ImageButton-Finalized-B.jpg)

## Button Functionality

The final task is hooking up basic button functionality.

1. In the Explorer window, hover over the **MapButton** object and insert a **LocalScript**.

   <img src="../../../assets/tutorials/interactive-buttons/MapButton-LocalScript.png" width="60%" />

2. In the script, copy and paste in these new lines:

   ```lua
   local button = script.Parent

   local function onButtonActivated()
       print("Button activated!")
       -- Perform expected button action(s) here

   end

   button.Activated:Connect(onButtonActivated)
   ```

This simple button script works as follows:

- The first line sets a variable button which tells the script what specific object it's linked to. In this case it's linked to the `Class.ImageButton`, the parent of the script.
- The `onButtonActivated` function handles the button's activation. Inside it, you should perform the intended action like opening the game's main menu.
- The final line **connects** the button to the `onButtonActivated` function with the `Class.GuiButton.Activated|Activated` event. This will cause the function to run every time a player activates the button in game.

<Alert severity="info">
Although there are several different `Class.GuiButton.events|events` which you can connect to buttons, the `Class.GuiButton.Activated|Activated` event is the most reliable for basic buttons, providing standard button behavior on all platforms from PC to phone/tablet to console.
</Alert>

### Troubleshooting

If the button doesn't work as expected, check the following:

- Make sure you used a client-side `Class.LocalScript`, not a server-side `Class.Script`.
- Ensure that the `Class.LocalScript` is a **direct child** of the button object (not a child of the `Class.ScreenGui` container).
- Confirm that your button's **Image**, **HoverImage**, and **PressedImage** properties are set to the appropriate image assets.
