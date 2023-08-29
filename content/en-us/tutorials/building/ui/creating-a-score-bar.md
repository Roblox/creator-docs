---
title: Creating a Score Bar
description: The process for creating a score bar UI that displays current player information.
next: /tutorials/building/ui/interactive-buttons
---

Games often need to display information to the player such as their current score, health, or their character's level. A **GUI**, short for **G**raphical **U**ser **I**nterface, is used to display such information.

In this intro tutorial, you'll learn how to build a score bar along the top-center of the screen, similar to the one shown below.

<img src="../../../assets/tutorials/creating-a-score-bar/Finished-Score-Bar-Intro.jpg" width="100%" />

To make the score bar GUI appear on the screen, you'll first need to create a `Class.ScreenGui` object&nbsp;&mdash; this behaves as a 2D canvas to display visual elements on the player's screen. It's usually best to add this to the `Class.StarterGui` service so that it gets copied to each player's local game session when they join.

1. In the Explorer window, hover over the **StarterGui** object and click the **+** button.

   <img src="../../../assets/tutorials/creating-a-score-bar/StarterGui-Insert-Object.png" width="60%" />

2. Select **ScreenGui** from the menu. This will create a new 2D screen space in front of the 3D game world.

   <img src="../../../assets/tutorials/creating-a-score-bar/StarterGui-ScreenGui.png" width="60%" />

<Alert severity="info">

As you continue to build your game, additional `Class.ScreenGui` containers can be added to StarterGui, each containing GUI objects for a specific "scene" or purpose. For example, you could create one `Class.ScreenGui` for your menu screen, another for your in-game GUI elements (initially disabled), then show or hide them through scripting when appropriate.

</Alert>

## Creating a Frame

For organization and scaling/resizing, it's best to group related GUI elements inside a `Class.Frame` container. For instance, a basic score bar may contain both an `Class.ImageLabel` and `Class.TextLabel` inside a `Class.Frame` object.

<img src="../../../assets/tutorials/creating-a-score-bar/Frame-Diagram.png" width="60%" />

To add an empty frame:

1. Hover over the **ScreenGui** object, click the **+** button, and select **Frame**. This will create a blank frame in the upper-left corner of the screen.

   <img src="../../../assets/tutorials/creating-a-score-bar/Empty-Frame.jpg" width="60%" />

2. As a best practice, rename the new frame according to what it will contain, for example **ScoreBarFrame**.

   <img src="../../../assets/tutorials/creating-a-score-bar/Frame-Renamed.png" width="60%" />

<Alert severity="info">
In a final game, a player's GUI may utilize multiple frames such as one to display score, another for in-game abilities, and more.
</Alert>

### Size

To change the size of the score bar, you'll need to set various **Size** properties on the frame.

1. Make sure **ScoreBarFrame** is selected.

   <img src="../../../assets/tutorials/creating-a-score-bar/Frame-Renamed.png" width="60%" />

2. In the **Properties** window, locate the **Size** property and click the arrow to expand its tree.

   <img src="../../../assets/tutorials/creating-a-score-bar/Expand-Size-Tree.png" width="60%" />

3. For the frame to dynamically resize on various devices and screens, it's best to use **Scale** properties. For this GUI, set the following:

   <img alt="**Size** &rarr; **X** = **0.25, 0**, **Size** &rarr; **Y** = **0.08, 0**" src="../../../assets/tutorials/creating-a-score-bar/Frame-Size.png" width="60%" />

This should resize the frame to a thin rectangle:

<img src="../../../assets/tutorials/creating-a-score-bar/Frame-Resized.jpg" width="60%" />

### Scaling

The current size values work nicely on larger screens, but the vertical **Y** scale of **0.08** (8%) may appear a bit small on a phone.

<img src="../../../assets/tutorials/creating-a-score-bar/Phone-Display.png" width="60%" />

To control how a GUI scales across different screen sizes, you can use **constraints**. In this case, a `Class.UISizeConstraint` will prevent the frame from getting too small.

1. Hover over the **ScoreBarFrame** object, click the **+** button, and insert a **UISizeConstraint**.

   <img src="../../../assets/tutorials/creating-a-score-bar/New-UISizeConstraint.png" width="60%" />

2. Select the new constraint object and set its **MinSize** property to **0, 40**. This prevents the frame from shrinking to less than 40 pixels in vertical size.

   <img alt="" src="../../../assets/tutorials/creating-a-score-bar/UISizeConstraint-MinSize.png" width="60%" />

### Position

In Roblox games, the top-left area of the screen is typically occupied by the chat window. To move the score bar to a clearer region, adjust its **AnchorPoint** and **Position**.

1. Change the frame's **AnchorPoint** property to **0.5, 0** so that its position will be based around its horizontal center.

   <img alt="**AnchorPoint** = **0.5, 0**" src="../../../assets/tutorials/creating-a-score-bar/Frame-AnchorPoint.png" width="60%" />

2. Expand the frame's **Position** tree and change **X** to **0.5, 0**. This should center the frame along the top edge of the game window.

   <img alt="**Position** &rarr; **X** = **0.5, 0**" src="../../../assets/tutorials/creating-a-score-bar/Frame-Position.png" width="60%" />

   <img src="../../../assets/tutorials/creating-a-score-bar/Frame-Centered.jpg" width="100%" />

### Styling

Currently the GUI frame is solid white with a thin border, but it can easily be changed.

1. Make the frame translucent black by changing its background properties.

   <img alt="**BackgroundColor3** = **0, 0, 0**, **BackgroundTransparency** = **0.6**" src="../../../assets/tutorials/creating-a-score-bar/Frame-Background-Values.png" width="60%" />

2. Remove the border completely by setting **BorderSizePixel** to **0**.

   <img alt="**BorderSizePixel** = **0**" src="../../../assets/tutorials/creating-a-score-bar/Frame-BorderSizePixel.png" width="60%" />

   The frame should now look like this:

   <img src="../../../assets/tutorials/creating-a-score-bar/Frame-Finalized.jpg" width="100%" />

### Arrangement

**Layout** objects can be used to arrange GUI elements like images or text inside the frame. Although a score bar doesn't seem like a list, the `Class.UIListLayout` object lets you easily arrange child elements in a vertical or horizontal sequence.

<GridContainer numColumns="2">
  <figure>
    <img src="../../../assets/tutorials/creating-a-score-bar/List-Layout-Vertical.png" />
    <figcaption>Vertical Sequence</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/tutorials/creating-a-score-bar/List-Layout-Horizontal.png" />
    <figcaption>Horizontal Sequence</figcaption>
  </figure>
</GridContainer>

1. Hover over the **ScoreBarFrame** object, click the **+** button, and insert a **UIListLayout**.

   <img src="../../../assets/tutorials/creating-a-score-bar/New-UIListLayout.png" width="60%" />

2. Change the following property values to arrange the image and score text side-by-side, vertically centered within the frame:

   <img alt="**FillDirection** = **Horizontal**, **VerticalAlignment** = **Center**" src="../../../assets/tutorials/creating-a-score-bar/UIListLayout-Values.png" width="60%" />

### Device Emulation

As you configure any GUI, it's highly recommended that you use Studio's **Device Emulation** to preview how it will appear on different screens.

1. Near the upper-right corner of the 3D view, click the emulation button.

   <img src="../../../assets/tutorials/creating-a-score-bar/Device-Emulator-Button.png" width="60%" />

2. Above the 3D view, select any device from the menu. Generally, it's a good idea to test your GUI on at least one device within the **Phone**, **Tablet**, **Desktop**, and **Console** sections.

   <img src="../../../assets/tutorials/creating-a-score-bar/Device-Emulator-Devices.png" width="60%" />

## Adding an Image

Images inside a GUI are typically `Class.ImageLabel` objects, basic 2D images which can be resized as needed.

1. Insert an **ImageLabel** into the **ScoreBarFrame** object and select it.

   <img src="../../../assets/tutorials/creating-a-score-bar/New-ImageLabel.png" width="60%" />

2. To place this tutorial's crown image into the label, locate its **Image** property and paste in `rbxassetid://5673786644`.

   <img src="../../../assets/tutorials/creating-a-score-bar/ImageLabel-Image.png" width="60%" />

   <img src="../../../assets/tutorials/creating-a-score-bar/ImageLabel-Inserted.jpg" width="100%" />

3. Expand the image object's **Size** tree and set the following property values:

   <img src="../../../assets/tutorials/creating-a-score-bar/ImageLabel-Size.png" width="60%" />

   <img src="../../../assets/tutorials/creating-a-score-bar/ImageLabel-Resized.jpg" />

4. As you can see, these scaling values stretch the image beyond the full width of the frame. To make sure that only the **height** is considered, change the image's **SizeConstraint** to **RelativeYY**.

   <img alt="**SizeConstraint** = **RelativeYY**" src="../../../assets/tutorials/creating-a-score-bar/ImageLabel-SizeConstraint.png" width="60%" />

   <img src="../../../assets/tutorials/creating-a-score-bar/ImageLabel-Constrained.jpg" />

5. Elements in a `Class.UIListLayout` are ordered by their **LayoutOrder**. Change this property to **1** since the image should be the first element inside the frame. You won't see any change since the image is the only element, but it's a good idea to set the layout order now.

   <img alt="**LayoutOrder** = **1**" src="../../../assets/tutorials/creating-a-score-bar/ImageLabel-LayoutOrder.png" width="60%" />

6. Finally, change the image's background from white to fully transparent by setting **BackgroundTransparency** to **1**.

   <img alt="**BackgroundTransparency** = **1**" src="../../../assets/tutorials/creating-a-score-bar/BackgroundTransparency.png" width="60%" />

   <img src="../../../assets/tutorials/creating-a-score-bar/ImageLabel-Finalized.jpg" />

## Inserting Text

GUI text is often rendered through a `Class.TextLabel` object which lets you choose a font, color, alignment, and more.

1. Insert a **TextLabel** into the **ScoreBarFrame** object and select it.

   <img src="../../../assets/tutorials/creating-a-score-bar/New-TextLabel.png" width="60%" />

2. Change its **LayoutOrder** property to **2**. Because the associated `Class.UIListLayout` is set to horizontal, this will place the label to the right of the image.

   <img alt="**LayoutOrder** = **2**" src="../../../assets/tutorials/creating-a-score-bar/TextLabel-LayoutOrder.png" width="60%" />

   <img src="../../../assets/tutorials/creating-a-score-bar/TextLabel-Inserted.jpg" />

3. Resize the label by setting the following property values:

   <img alt="**Size** &rarr; **X** = **1, 0**, **Size** &rarr; **Y** = **1, 0**, **SizeConstraint** = **RelativeYY**" src="../../../assets/tutorials/creating-a-score-bar/TextLabel-Size.png" width="60%" />

   <img src="../../../assets/tutorials/creating-a-score-bar/TextLabel-Resized.jpg" />

4. Style the text by setting its font, color, and scaling.

   <img alt="**Font** = **GothamBold**, **Text** = **0**, **TextColor3** = **255, 200, 100**, **TextSize** = **30**" src="../../../assets/tutorials/creating-a-score-bar/TextLabel-Values.png" width="60%" />

   <img src="../../../assets/tutorials/creating-a-score-bar/TextLabel-Styled.jpg" />

5. Change **TextXAlignment** to **Left** so that the score text stays left-aligned near the crown image regardless of whether the player's score is 0, 1000, or 1000000.

   <img alt="**TextXAlignment** = **Left**" src="../../../assets/tutorials/creating-a-score-bar/TextLabel-Alignment.png" width="60%" />

6. Finally, make the label's background fully transparent by setting **BackgroundTransparency** to **1**.

   <img alt="**BackgroundTransparency** = **1**" src="../../../assets/tutorials/creating-a-score-bar/BackgroundTransparency.png" width="60%" />

   <img src="../../../assets/tutorials/creating-a-score-bar/TextLabel-Finalized.jpg" />

This covers the basics of GUI objects&nbsp;&mdash; you now have a basic score bar that adapts to both large and small screens.
