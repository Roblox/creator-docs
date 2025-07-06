---
title: User interface
description: Explore the wide variety of user interface elements that players can interact with.
---

You can quickly create high-quality graphical user interfaces with minimal scripting requirements using built-in [UI objects](#ui-objects). Depending on where you create it, UI renders either [on-screen](#on-screen-ui) or [within an experience's 3D world](#in-experience-ui).

## On-screen UI

[On-screen containers](../ui/on-screen-containers.md) hold UI objects that you want to display on a player's screen, including [frames](../ui/frames.md), [labels](../ui/labels.md), [buttons](../ui/buttons.md), and more. All on-screen UI objects and code are stored and changed on the client.

<figure>
<img src="../assets/ui/ui-objects/ScreenGui-Example.jpg" width="840" alt="Example ScreenGui with various GuiObject children, including a Frame, TextLabel, TextBox, and ImageButton." />
</figure>

## In-experience UI

[In-experience containers](../ui/in-experience-containers.md) such as `Class.SurfaceGui|SurfaceGuis` and `Class.BillboardGui|BillboardGuis` hold UI objects that you want to display within your experience's 3D world.

<video src="../assets/ui/in-experience/Showcase.mp4" controls width="100%"></video>

## UI objects

Most UI elements are `Class.GuiObject|GuiObjects`, 2D graphical user interface objects that you can parent to containers. The four most common are [frames](../ui/frames.md), [labels](../ui/labels.md), [buttons](../ui/buttons.md), and [text input](../ui/text-input.md) objects.

<img src="../assets/ui/ui-objects/ScreenGui-Example.jpg" width="840" />

<table>
<thead>
  <tr>
    <th>Object</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>[Frame](../ui/frames.md)</td>
    <td>`Class.Frame|Frames` act as containers for other UI objects. When you manipulate frames, you also manipulate the objects they contain.</td>
  </tr>
	<tr>
    <td>[Label](../ui/labels.md)</td>
    <td>`Class.TextLabel` and `Class.ImageLabel` objects allow you to display customizable text and images.</td>
  </tr>
	<tr>
    <td>[Button](../ui/buttons.md)</td>
    <td>`Class.TextButton` and `Class.ImageButton` objects allow users to prompt an action.</td>
  </tr>
	<tr>
    <td>[Text&nbsp;Input](../ui/text-input.md)</td>
    <td>`Class.TextBox` objects allow users to input text.</td>
  </tr>
</tbody>
</table>

Using the `Class.GuiObject.Position|Position`, `Class.GuiObject.Size|Size`, `Class.GuiObject.AnchorPoint|AnchorPoint`, and `Class.GuiObject.ZIndex|ZIndex` properties, you have complete control on how to [position](../ui/position-and-size.md#position), [size](../ui/position-and-size.md#size), and [layer](../ui/position-and-size.md#zindex) `Class.GuiObject|GuiObjects`. You can also use [tweening](../ui/animation.md) to transition a `Class.GuiObject` smoothly from one state to another and provide dynamic visual feedback.

## Layout and design

Beyond basic properties for adjusting position and size, Roblox also provides layout structures like [list/flex](../ui/list-flex-layouts.md) and [grid](../ui/grid-table-layouts.md), as well as [size modifiers](../ui/size-modifiers.md) and [appearance modifiers](../ui/appearance-modifiers.md).

<figure>
	<img src="../assets/ui/ui-objects/UIListLayout-Example.png" width="840" />
	<figcaption>`Class.UIListLayout` for horizontal or vertical item sequences</figcaption>
</figure>

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/ui/ui-objects/UIStroke-Color-Solid.png" />
    <figcaption>`Class.UIStroke` on `Class.TextLabel`</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/ui-objects/UIStroke-Color-Gradient.png" />
    <figcaption>`Class.UIStroke` with `Class.UIGradient`</figcaption>
  </figure>
</GridContainer>

## Universal styling

[Universal styling](./styling/index.md) is a Roblox solution to stylesheets, similar to CSS, that lets you declare and globally apply overrides to UI instance properties. This engine‑level support is the foundation for the [Style&nbsp;Editor](./styling/editor.md) and the end‑to‑end token pipeline.

## Interactive frameworks

In addition to the core [user interface objects](#ui-objects), the following frameworks provide built‑in and customizable interactivity for your experiences.

### Proximity prompts

[Proximity prompts](../ui/proximity-prompts.md) are unique built-in UI objects which prompt user interaction to trigger an action when they approach in-experience objects such as doors, light switches, and buttons.

<video src="../assets/ui/proximity-prompt/Showcase.mp4" controls width="80%" alt="Proximity prompts used in a variety of implementations in the 3D world"></video>

### UI drag detectors

[UI drag detectors](../ui/ui-drag-detectors.md) facilitate and encourage interaction with 2D user interface elements such as sliders, spinners, and more.

<video src="../assets/ui/ui-drag-detectors/Showcase.mp4" controls width="80%" alt="How to add UI Drag Detectors and Drag in Edit Mode"></video>

### 3D drag detectors

[3D drag detectors](../ui/3D-drag-detectors.md) encourage physical interaction with 3D objects in an experience, such as opening doors and drawers, sliding a part around, grabbing and tossing a bowling ball, pulling back and firing a slingshot, and much more.

<video src="../assets/ui/3D-drag-detectors/Showcase.mp4" controls width="80%" alt="Drag detectors used in a variety of implementations in the 3D world"></video>
