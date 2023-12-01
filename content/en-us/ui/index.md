---
title: UI
description: User interfaces are graphical elements in your experience that users interact with.
---

You can quickly create high-quality graphical user interfaces with minimal scripting requirements using built-in UI [objects](#objects). Depending on where you create it, UI renders either [on-screen](#on-screen-ui) or within an [experience's 3D world](#in-experience-ui).

## On-Screen UI

[On-screen containers](../ui/on-screen-containers.md) hold UI [objects](#objects) that you want to display on a user's screen. All on-screen UI objects and code are stored and changed on the client.

<img src="../assets/ui/button-text-input/ImageButton-Examples.jpg" width="800" />

## In-Experience UI

[In-experience containers](../ui/in-experience-containers.md) such as `Class.SurfaceGui|SurfaceGuis` and `Class.BillboardGui|BillboardGuis` hold UI [objects](#objects) that you want to display within your experience's 3D world.

<img src="../assets/ui/in-experience/SurfaceGui-Diagram.jpg" width="800" />

## Objects

Most UI elements are `Class.GuiObject|GuiObjects`, 2D graphical user interface objects that you can parent to containers. The four most common are [frames](#frames), [labels](#labels), [buttons](#buttons-and-text-input), and [text input](#buttons-and-text-input) objects.

Using the `Class.GuiObject.Position|Position`, `Class.GuiObject.Size|Size`, `Class.GuiObject.AnchorPoint|AnchorPoint`, and `Class.GuiObject.ZIndex|ZIndex` properties, you have complete control on how to [position](../ui/positioning-and-sizing.md#position), [size](../ui/positioning-and-sizing.md#size), and [layer](../ui/positioning-and-sizing.md#zindex) `Class.GuiObject|GuiObjects`. You can also use [tweening](../ui/animation.md) to transition a `Class.GuiObject` smoothly from one state to another and provide dynamic visual feedback.

### Frames

[Frames](../ui/frames.md) act as containers for other `Class.GuiObject|GuiObjects` such as [Labels](../ui/labels.md) or [Buttons](../ui/buttons.md). When you manipulate frames, you also manipulate the objects they contain.

<img src="../assets/ui/container-frames/Frame-Example.jpg" width="800" />

### Labels

Labels allow you to display customizable [text](../ui/labels.md) and [images](../ui/labels.md).

<img src="../assets/ui/labels/Labels-Example.jpg" width="800" />

### Buttons and Text Input

[Button](../ui/buttons.md) objects allow users to prompt an action while [Text Input](../ui/text-input.md) objects allow users to input text. You can customize these objects to provide context and prompts for what you want a user to do.

<img src="../assets/ui/button-text-input/TextBox-Example.jpg" width="80%" />

### Proximity Prompts

[Proximity Prompts](../ui/proximity-prompts.md) are unique built-in UI objects which prompt user interaction to trigger an action when they approach in-experience objects such as doors, light switches, and buttons.

<video src="../assets/ui/proximity-prompt/Showcase.mp4" controls width="80%" alt="Proximity prompts used in a variety of implementations in the 3D world"></video>

### Drag Detectors

[Drag Detectors](../ui/drag-detectors.md) encourage physical interaction with objects in an experience, such as opening doors and drawers, sliding a part around, grabbing and tossing a bowling ball, pulling back and firing a slingshot, and much more.

<video src="../assets/ui/drag-detectors/Showcase.mp4" controls width="80%" alt="Drag detectors used in a variety of implementations in the 3D world"></video>

## Layout and Design

Beyond basic properties for [adjusting position and size](../ui/positioning-and-sizing.md), Roblox also provides [layouts](../ui/layout-and-appearance.md#layouts), [constraints](../ui/layout-and-appearance.md#constraints), and [appearance objects](../ui/layout-and-appearance.md#appearance-objects) for further refining your UI. You can also [animate](../ui/animation.md) UI through smoothly transitioning between property values.

### 9-Slice Design

Under the [9-slice design](../ui/9-slice.md) approach, you can divide a single Roblox image asset into nine sub-images, each with different scaling rules. This allows you to create UI elements of varying sizes without distorting the borders or corners.

<figure>
  <img src="../assets/ui/9-slice/9-Slice-Intro-Examples.png" width="70%" />
  <figcaption>Same border design used on UI elements of different sizes</figcaption>
</figure>

### Rich Text Markup

UI [rich text](../ui/rich-text.md) utilizes simple markup tags to style sections of a string in bold, italics, underline, fill color, stroke variations, and more. You can apply styling tags to `Class.TextLabel`, `Class.TextButton`, and `Class.TextBox` objects.

<GridContainer numColumns="2">
  <img src="../assets/ui/rich-text/Example-Color.png" />
  <img src="../assets/ui/rich-text/Example-Stroke.png" />
  <img src="../assets/ui/rich-text/Example-Small-Caps.png" />
  <img src="../assets/ui/rich-text/Example-Underline.png" />
</GridContainer>
