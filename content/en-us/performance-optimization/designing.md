---
title: Designing for Performance
description: Outlines performance best practices to follow as you build a new experience.
---

Designing for performance means following a handful of best practices **as you build** your experience. Compared to finding and fixing performance issues later in the development process, designing for performance early can save you a lot of time and effort.

## Low-End Devices

Lower-end devices, particularly mobile devices, have severe memory limitations and are succeptible to crashes due to out of memory (OOM) errors:

- If you want to support lower-end devices, choose a baseline set of devices with certain performance characteristics, test your experience on them throughout the development process, and pay close attention to frame rate and memory usage. As you find problem areas in your experience, use those areas to identify the limits of your devices.

  For example, you might test an experience with the **Render** (<kbd>Shift</kbd><kbd>F2</kbd>) and **Summary** (<kbd>Shift</kbd><kbd>F2</kbd>) debug stats enabled. If the frame rate starts to drop in a particularly cluttered area, you could examine the **Draw (scene)** numbers and determine that you need to stay below 600 draw calls and 650,000 triangles. Or you could examine the **Developer Console** (<kbd>F9</kbd>) and note that memory usage is a bit high unless you enable [streaming](../workspace/streaming.md). Having a clear understanding of device limits can help you stay under them as you continue to build your experience.

  ![A Roblox experience with three overlays active.](../assets/optimization/perf-hud.png)

- The device emulator in Roblox Studio is useful for checking aspect ratio and controls, but isn't accurate for memory usage; when you test an experience in Studio, it runs the server and the client, so memory usage is significantly higher.

<Alert severity="info">
Roblox does not have access to all of a device's memory. Some amount is required for the operating system and other applications.
</Alert>

For a much more detailed example of how you might think about optimizing your experience for low-end mobile devices, see [Real World Building and Scripting Optimization](https://devforum.roblox.com/t/real-world-building-and-scripting-optimization-for-roblox/3127146).

<a target="_blank" href="https://devforum.roblox.com/t/real-world-building-and-scripting-optimization-for-roblox/3127146"><img src="../assets/optimization/chicken-rocket.jpg" width="400" alt="Header image for Real World Building and Scripting Optimization." /></a>

## Streaming and Teleportation

- [Instance streaming](../workspace/streaming.md) lets Roblox dynamically load and unload 3D content and is a great option for most experiences, especially larger ones. Streaming improves join times, reduces memory footprint, and increases frame rates. For more information, see [Improving Performance](improving.md#instance-streaming).

- Break large places into more manageable ones and use [teleportation](../projects/teleporting.md) to move players between them.

## Materials and Duplication

- Built-in materials use far less memory than custom textures, but might not match your artistic vision. Try to use materials whenever possible in order to conserve memory budget for the textures that are central to your experience.

- As you create assets, convert them into [packages](../projects/assets/packages.md). Making packages part of your workflow helps avoid the common issue of duplicate assets with different IDs, which can hurt performance.

- When you add meshes and textures, use and reuse them rather than importing duplicate copies. By resizing, rotating, and overlapping, you can create rich, varied environments that require very few [draw calls](improving.md#draw-calls). For more information, see [Remove Duplicate Textures](../tutorials/environmental-art/optimize-your-experience.md#remove-duplicate-textures).

## Transparency

- Avoid transparency values other than 0 (visible) and 1 (invisible). When you use partial transparency, be especially careful to avoid [high transparency overdraw](../tutorials/environmental-art/optimize-your-experience.md#delete-layered-transparencies).

## Scripting

- Whenever possible, write event-driven code rather than per-frame calculations. At 60 FPS, the total budget for each frame is 16.67 milliseconds (ms). Even seemingly minor per-frame calculations can use a significant portion of that budget.

- Find ways to break long-running code into manageable chunks. If a piece of code takes 100 ms to execute and you run it every frame, your experience can only run at 10 FPS. If you decide to only run the code once per second in an experience that otherwise runs at 60 FPS, 59 of your frames arrive after 16.67 ms... and then one after 100 ms, which causes a jarring stutter.

  Instead, investigate how you can break up the code. Maybe you can perform 5 ms of work per frame, use `Library.task.wait()`, and have the completed calculation every 20 frames while still maintaining 60 FPS. [Multithreading](../scripting/multithreading.md), sometimes called Parallel Luau, can also help.

- Use the `Datatype.RBXScriptConnection:Disconnect()` method to stop functions from being called unnecessarily the next time an event fires.

- Don't call the same method every time you need a value. Call the method once, store the value, and then overwrite it later as necessary.

- Don't store everything in `Class.ReplicatedStorage`. The client loads everything that is in this container. Instead, use `Class.ServerStorage` for anything that the client does not need access to.
