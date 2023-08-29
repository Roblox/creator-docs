---
title: UI
description: User Interfaces are graphical elements in your experience that users interact with.
---

You can quickly create high-quality graphical user interfaces with minimal scripting requirements using built-in GUI [elements](#elements) and their [containers](#containers).

## Containers

Container objects such as [frames](#frames) hold and display UI elements. Depending on where you create it, UI renders either [on-screen](#on-screen-ui) or within an [experience's 3D world](#in-experience-ui).

### Frames

Frames act as containers for other `Class.GuiObject|GuiObjects`, such as [TextLabels](../ui/labels.md#textlabels) or [TextButtons](../ui/buttons.md#textbuttons). When you manipulate frames, you also manipulate the objects they contain.

<img src="../assets/ui/container-frames/Frame-Example.jpg" width="80%" />

### On-Screen UI

[On-screen UI container objects](../ui/on-screen-containers.md), such as [StarterGuis](../ui/on-screen-containers.md#startergui), [ScreenGuis](../ui/on-screen-containers.md#screengui), and [PlayerGuis](../ui/on-screen-containers.md#playergui), `Class.GuiObject|GuiObjects` that you want to display on a user's screen.

<img src="../assets/ui/button-text-input/ImageButton-Examples.jpg" width="80%" />

### In-Experience UI

[In-experience UI container objects](../ui/in-experience-containers.md), such as [SurfaceGuis](../ui/in-experience-containers.md#surfacegui) and [BillboardGuis](../ui/in-experience-containers.md#billboardgui), hold `Class.GuiObject|GuiObjects` that you want to display within an experience's 3D world.

<img src="../assets/ui/in-experience/SurfaceGui-Diagram.jpg" width="80%" />

## Elements

Most UI elements are `Class.GuiObject|GuiObjects`, 2D graphical user interface objects that you can parent to containers. The four most common `Class.GuiObject|GuiObjects` are [frames](#frames), [labels](#labels), [buttons](#buttons-and-text-input), and [text input](#buttons-and-text-input) objects.

<img width="80%" src="../assets/ui/container-frames/Frame-Example.jpg" />

Using the `Class.GuiObject.Position|Position`, `Class.GuiObject.Size|Size`, `Class.GuiObject.AnchorPoint|AnchorPoint`, and `Class.GuiObject.ZIndex|ZIndex` properties, you have complete control on how to [position](../ui/positioning-and-sizing.md#position), [size](../ui/positioning-and-sizing.md#size), and [order](../ui/positioning-and-sizing.md#zindex) `Class.GuiObject|GuiObjects`. You can also use [tweening](../ui/animation.md) to transition a `Class.GuiObject` smoothly from one state to another and provide dynamic visual feedback.

### Labels

Labels allow you to display customizable [text](../ui/labels.md#textlabels) and [images](../ui/labels.md#imagelabels).

<img src="../assets/ui/labels/Labels-Example.jpg" width="80%" />

### Buttons and Text Input

Button objects, such as [TextButtons](../ui/buttons.md#textbuttons) or [ImageButtons](../ui/buttons.md#imagebuttons), allow a user to perform an action, while [TextBox](../ui/buttons.md#textboxes) objects allow a user to input text. You can customize these objects to provide context and prompts for what you want a user to do.

<img src="../assets/ui/button-text-input/TextBox-Example.jpg" width="80%" />

### Proximity Prompts

[Proximity Prompts](../ui/proximity-prompts.md) are unique built-in UI objects which prompt user interaction to trigger an action when they approach in-experience objects such as doors, light switches, and buttons.

<video src="../assets/ui/proximity-prompt/Showcase.mp4" controls width="80%"></video>

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

## Chat

### Bubble Chat

The built-in **bubble chat** system enables the display of customizable chat bubbles above avatars and NPCs. Key features include:

- Animated transitions for improved engagement.
- Numerous customization options, including bubble duration, text and background color, the distance in which bubbles minimize or hide, and much more.
- Ability to define unique bubble styles per-user or NPC.

<figure>
  <video src="../assets/ui/in-experience-text-chat/Player-Conversation-Bubbles.mp4" controls width="80%"></video>
  <figcaption>Two players chatting while bubble chat is enabled</figcaption>
</figure>
