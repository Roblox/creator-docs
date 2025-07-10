---
title: Explore Studio UI
description: Explains how to navigate Studio's fundamental UI.
next: /tutorials/curriculums/studio/next-steps
prev: /tutorials/curriculums/studio/install-studio
---

Welcome to your first session in Roblox Studio! Before you jump in and begin building experiences, let's take a moment to walk through Studio's essential UI. While this overview provides a solid foundation to get started, there are many additional windows and tools that you can discover and customize in the [Studio interface](../../../studio/ui-overview.md) guide.

<img src="../../../assets/tutorials/studio-lesson/UI-Overview.png" width="100%" />

<Alert severity="info">
<AlertTitle>Coming to Studio from another game engine?</AlertTitle>
<br> </br>
Check out one of the following guides that explains the key differences between Studio and Unity or Unreal:

- [Roblox for Unity developers](../../../unity.md)
- [Roblox for Unreal developers](../../../unreal.md)

</Alert>

## Mezzanine

<img src="../../../assets/tutorials/studio-lesson/Mezzanine.png" width="100%" />

The **Mezzanine** is the top-most section of Studio, and it includes:

- [Playtest options](../../../studio/test-tab.md#playtest-options) that allow you to simulate what players see on their devices.
- Tabs like [Model](../../../studio/model-tab.md), [Avatar](../../../studio/avatar-tab.md), and [Script](../../../studio/script-tab.md) that filter the Toolbar's tools for their respective tasks.
- [Collaborator](../../../projects/collaboration.md) information for experiences that you work on with others.
- The [Assistant](../../../assistant/guide.md) AI tool that you can use as an aid to supplement your skills and assist with development tasks.

## Toolbar

<img src="../../../assets/tutorials/studio-lesson/Toolbar.png" width="100%" />

The **Toolbar** is the section right below the Mezzanine that displays all tools and insertable objects that relate to your active tab:

- **Home** contains tools for working with 3D objects, such as moving, scaling, rotating, and applying new materials.
- **Model** contains additional tools for working with 3D objects, such as solid modeling, pivot, and align tools, as well as effects and constraints.
- **Avatar** contains tools for configuring avatars, building rigs, creating animations, and fitting accessories.
- **UI** contains UI objects and the Style Editor.
- **Script** contains tools for writing and testing scripts.
- **Plugins** contains plugins that you've installed or created.

When you are more comfortable with Studio, you can also create additional tabs for your own development needs.

## 3D viewport

<img src="../../../assets/tutorials/studio-lesson/3D-viewport.png" width="100%" />

The **3D viewport** is the largest window in Studio that provides you a view into the 3D space. After you click in the 3D viewport, you can move the camera, edit objects with your mouse, and playtest the experience from your players' point-of-view.

For all camera controls, see the following table.

<table>
<thead>
  <tr>
    <th>Keys/shortcuts</th>
    <th>Camera action</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd></td>
    <td>Moves the camera forward, left, back, or right, respectively.</td>
  </tr>
  <tr>
    <td><kbd>Q</kbd> <kbd>E</kbd></td>
    <td>Moves the camera down or up, respectively.</td>
  </tr>
  <tr>
    <td><kbd>Shift</kbd></td>
    <td>In combination with any movement key, changes the camera speed.</td>
  </tr>
  <tr>
    <td><kbd>F</kbd></td>
    <td>Focuses the camera on the selected object in the 3D space.</td>
  </tr>
  <tr>
    <td>**Right Mouse Button**</td>
    <td>While pressed, dragging the mouse moves the camera view around.</td>
  </tr>
  <tr>
    <td>**Mouse Scroll Wheel**</td>
    <td>Zooms the camera in or out.</td>
  </tr>
  <tr>
    <td>**Middle Mouse Button**</td>
    <td>While pressed, dragging the mouse pans the camera.</td>
  </tr>
</tbody>
</table>

<Alert severity="info">
It's **strongly** recommended to use a 2-button mouse with a scroll wheel to make navigating the 3D space easier.
</Alert>

## Toolbox

<img src="../../../assets/tutorials/studio-lesson/Toolbox.png" width="100%" />

The **Toolbox** contains a selection of models, images, meshes, audio, plugins, videos, and fonts from either Roblox or fellow creators on the platform. It offers four tabs:

- **Creator Store** is a marketplace of both free and for sale assets to use within your experiences.
- **Inventory** contains assets that you or your groups have uploaded, or those that you found on the Creator Store.
- **Recent** contains your most recently used assets.
- **Creations** is similar to Inventory, but it excludes assets from the Creator Store.

For more information, see the [Toolbox](../../../projects/assets/toolbox.md) guide.

## Explorer window

<img src="../../../assets/tutorials/studio-lesson/Explorer-Window.png" width="100%" />

The **Explorer** window displays a hierarchical list of every object and service that runs out-of-the-box gameplay logic for the active place of your experience. We haven't talked about places yet, but you can think of them like levels inside of a game.

<Alert severity="info">
Places are comparable to scenes in Unity or maps in Unreal Engine.
</Alert>

Experiences can have one or multiple places that each contain all components for that portion of the experience, including its specific environment, 3D objects, and scripts; these components collectively are called the **data model**. When you switch to a different place, the Explorer window updates accordingly to show that place's data model.

For more information on how the Explorer window organizes objects in the data model, see [Data model](../../../projects/data-model.md).

## Properties window

<img src="../../../assets/tutorials/studio-lesson/Properties-Window.png" width="100%" />

The **Properties** window displays a selection of properties for a selected object that you can customize to change how the object looks and behaves in the 3D environment. Every time you select a different object in the 3D viewport or Explorer window, the Properties window updates accordingly to show that object's properties.

Now that you're familiar with Studio's core UI and what they're responsible for, let's talk about ways you can continue learning about how to create with Studio.
