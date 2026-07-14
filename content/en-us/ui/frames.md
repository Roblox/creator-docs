---
title: Frames
description: Frames are basic containers for UI objects.
---

import Clipping from '../includes/ui/clipping.md'

Basic `Class.Frame|Frames` act as containers for other `Class.GuiObject|GuiObjects` such as [labels](../ui/labels.md) and [buttons](../ui/buttons.md). You can apply frames to display on a user's [screen](../ui/on-screen-containers.md) or on a [surface](../ui/in-experience-containers.md) within the game.

<img src="../assets/ui/ui-objects/Frame-Example.jpg" width="840" alt="Example Frame on the screen containing a TextLabel, TextBox, and ImageButton." />

Frames are ideal containers for responsive layouts such as [list and flex layouts](../ui/list-flex-layouts.md), allowing you to change the size of the frame and dynamically adjust how layout items fit within it. `Class.Frame|Frames` are also core `Class.GuiObject|GuiObjects`, so you can customize properties such as `Class.GuiObject.BackgroundColor3|BackgroundColor3`, `Class.GuiObject.Transparency|Transparency`, apply a [background gradient](../ui/appearance-modifiers.md#gradient) or [border](../ui/appearance-modifiers.md#stroke), and more.

Aside from their common use as containers, you can also use `Class.Frame|Frames` for UI design. For example, as a visual separator between other UI elements, you can scale a frame to be thin and long until it becomes a line.

<Alert severity="success">
See also [scrolling frames](../ui/scrolling-frames.md), [viewport frames](../ui/viewport-frames.md), and [video frames](../ui/video-frames.md) as specialty frame types with unique built‑in capabilities.
</Alert>

## Clipping

<Clipping components={props.components} />

## Automatic sizing

Frames can be set to [automatically size](../ui/size-modifiers.md#automatic-sizing) depending on their content. To achieve this, set the frame's `Class.Frame.Size|Size` to the **minimum** width and/or height, then set its `Class.Frame.AutomaticSize|AutomaticSize` property to either `Enum.AutomaticSize|X`, `Enum.AutomaticSize|Y`, or `Enum.AutomaticSize|XY` depending on which axes automatic sizing should apply to. Once set, the frame will automatically resize based on the size of `Class.GuiObject|GuiObjects` and layouts within it.
