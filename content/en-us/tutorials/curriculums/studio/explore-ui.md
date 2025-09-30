---
title: Explore Studio UI
description: Explains how to navigate Studio's fundamental UI.
next: /tutorials/curriculums/studio/next-steps
prev: /tutorials/curriculums/studio/install-studio
---

import StudioCameraControls from '../../../includes/studio/camera-controls.md'

Welcome to your first session in Roblox Studio! Before you jump in and begin building experiences, let's take a moment to walk through Studio's essential UI. While this overview provides a solid foundation to get started, there are many additional windows and tools that you can discover and customize in the [Studio interface](../../../studio/ui-overview.md).

<Alert severity="info">
<AlertTitle style={{marginBottom: 8}}>Coming to Studio from another game engine?</AlertTitle>
Check out one of the following guides that explains the key differences between Studio and Unity or Unreal: [Roblox for Unity developers](../../../unity.md) or [Roblox for Unreal developers](../../../unreal.md).
</Alert>

## Mezzanine

<img src="../../../assets/tutorials/studio-lesson/Mezzanine.jpg" width="960" alt="Mezzanine indicated at the top of Studio's window." />

The **mezzanine** is the top-most section of Studio and it includes:

- [Playtest options](../../../studio/testing-modes.md) that allow you to simulate what players see on their devices.
- Tabs like **Model**, **Avatar**, and **Script** that filter the [toolbar](#toolbar) tools for their respective tasks.
- [Collaborator](../../../projects/collaboration.md) information for experiences that you work on with others.
- The [Assistant](../../../assistant/guide.md) tool that you can use as an aid to supplement your skills and assist with development tasks.

## Toolbar

<img src="../../../assets/tutorials/studio-lesson/Toolbar.jpg" width="960" alt="Toolbar indicated below the mezzanine bar near the top of Studio's window." />

The **toolbar** is the section right below the mezzanine that displays all tools and insertable objects that relate to your active tab:

- **Home** contains the core [transform](../../../parts/index.md#transform-parts) tools, [part inserter](../../../parts/index.md#insert-parts), the [color](../../../parts/index.md#color) and [material](../../../parts/index.md#material) widgets, the [group](../../../parts/index.md#group) and [lock](../../../parts/index.md#lock) tools, and [anchor](../../../parts/index.md#anchor) toggle. Also contains the [Terrain Editor](../../../studio/terrain-editor.md).

- **Model** contains the core [transform](../../../parts/index.md#transform-parts) tools, the [pivot](../../../studio/pivot-tools.md) and [align](../../../studio/align-tool.md) tools, insertion widgets for [effects](../../../effects/index.md) and [constraints](../../../physics/index.md#constraints), and [solid‑modeling](../../../parts/solid-modeling.md) tools.

- **Avatar** contains the core [transform](../../../parts/index.md#transform-parts) tools, as well as specialized tools for building default rigs, configuring [avatars](../../../avatar-setup/index.md), working with [animations](../../../animation/index.md), and [creating/fitting accessories](../../../art/accessories/accessory-fitting-tool.md).

- **UI** contains insertion widgets for [UI objects](../../../ui/index.md#ui-objects) and lets you access the [Style&nbsp;Editor](../../../ui/styling/editor.md), a comprehensive tool that allows you to create, manage, and apply UI styles.

- **Script** contains tools for writing and testing scripts, including [debugging](../../../studio/debugging.md) tools.

- **Plugins** contains [plugins](../../../studio/plugins.md) created by the community or plugins you've created yourself to use across your experiences.

When you are more comfortable with Studio, you can also create [custom tabs](../../../studio/ui-overview.md#custom-tabs) for your own development needs.

## 3D viewport

<img src="../../../assets/tutorials/studio-lesson/3D-Viewport.jpg" width="960" alt="3D viewport indicated in center of Studio's window." />

The **3D viewport** is the largest window in Studio that provides you a view into the 3D space. After you click in the 3D viewport, you can move the camera, edit objects with your mouse, and playtest the experience from your players' point-of-view.

For common camera controls, see the following table.

<StudioCameraControls components={props.components} />

<Alert severity="info">
It's **strongly** recommended to use a 2-button mouse with a scroll wheel to make navigating the 3D space easier.
</Alert>

## Toolbox

<img src="../../../assets/tutorials/studio-lesson/Toolbox.jpg" width="960" alt="Toolbox shown on the left side of Studio's window." />

The [Toolbox](../../../projects/assets/toolbox.md) contains a selection of models, images, meshes, audio, plugins, videos, and fonts from either Roblox or fellow creators on the platform. It offers four tabs:

- **Creator Store** is a marketplace of both free and for sale assets to use within your experiences.
- **Inventory** contains assets that you or your groups have uploaded, or those that you found on the Creator Store.
- **Recent** contains your most recently used assets.
- **Creations** is similar to **Inventory**, but it excludes assets from the Creator Store.

## Explorer

<img src="../../../assets/tutorials/studio-lesson/Explorer.jpg" width="960" alt="Explorer window shown on the right side of Studio's window." />

The [Explorer](../../../studio/explorer.md) window displays a hierarchical list of every object and service that runs out-of-the-box gameplay logic for the active **place** of your experience. You can think of places like levels inside of a game.

<Alert severity="info">
Places are comparable to scenes in Unity or maps in Unreal Engine.
</Alert>

Experiences can have one or multiple places that each contain all components for that portion of the experience, including its specific environment, 3D objects, and scripts; these components collectively are called the **data model**. When you switch to a different place, the **Explorer** window updates accordingly to show that place's data model.

For more information on how the **Explorer** window organizes objects in the data model, see [Data model](../../../projects/data-model.md).

## Properties

<img src="../../../assets/tutorials/studio-lesson/Properties.jpg" width="960" alt="Properties window shown on the right side of Studio's window." />

The [Properties](../../../studio/properties.md) window displays a selection of properties for a selected object that you can customize to change how the object looks and behaves in the 3D environment. Every time you select a different object in the 3D viewport or **Explorer** window, the **Properties** window updates accordingly to show that object's properties.

Now that you're familiar with Studio's core UI and what they're responsible for, you can continue learning about how to create with Studio.
