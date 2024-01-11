---
title: Adaptive Timestepping
description: Adaptive timestepping automatically assigns physical parts to varying simulation timesteps.
---

The Roblox physics engine simulates all parts inside the 3D workspace through Newton's second law of motion. This law of motion is solved over time via **timesteps** and a single timestep is done within a **worldstep** in Roblox.

By default, Roblox simulates physics at 240&nbsp;Hz. Given cycles of approximately 60 frames per second, around 4&nbsp;worldsteps are advanced per frame. With **adaptive timestepping**, the physics engine automatically assigns parts to three "solver&nbsp;islands" by varying their simulation timestep, with an emphasis on 60&nbsp;Hz for best performance. However, parts that are "harder" to solve will use a faster timestep like 240&nbsp;Hz to ensure physical stability.

<img src="../assets/physics/adaptive-timestepping/Diagram-Labels.png" width="100%" />

Assignment criterions are subject to change, but parts assigned to the 240&nbsp;Hz island include [assemblies](../physics/assemblies.md) with high velocity values, high acceleration values, and complex mechanisms that are hard to solve.

## Enabling Adaptive Mode

To enable adaptive timestepping in Studio:

1. In the **Explorer** window, select the **Workspace** object.

   <img src="../assets/studio/explorer/Workspace.png"
   width="320" />

2. In the **Properties** window, locate **PhysicsSteppingMethod** and select **Adaptive**.

   <img
   src="../assets/physics/adaptive-timestepping/PhysicsSteppingMethod-Adaptive.png"
   width="320" />

To observe the timestepping process in action, you can open the Studio **Microprofiler** (<kbd>Ctrl</kbd><kbd>F6</kbd>; <kbd>⌘</kbd><kbd>F6</kbd>). Once the experience is running, press <kbd>Ctrl</kbd><kbd>P</kbd> (<kbd>⌘</kbd><kbd>P</kbd>) to pause at the current frame.

Under the scope named **physicsStepped**, observe that the scope name of **worldStep** now reads **worldStep&nbsp;-&nbsp;Adaptive**.

<img src="../assets/physics/adaptive-timestepping/Adaptive-Timestepping-Microprofiler-A.png" width="80%" />

Hovering your cursor above **LDLPGSSolver::solve** will reveal the status of how many islands belong in each frequency bucket; **1dt&nbsp;Islands**&nbsp;(240&nbsp;Hz), **2dt&nbsp;Islands**&nbsp;(120&nbsp;Hz) and **4dt&nbsp;Islands**&nbsp;(60&nbsp;Hz).

<img src="../assets/physics/adaptive-timestepping/Adaptive-Timestepping-Microprofiler-B.png" width="80%" />

## Debugging Visualization

During testing, it may be useful to visualize frequencies for simulated parts. To enable this option:

1. Open the Studio settings window (**File** &rarr; **Studio Settings**).
2. From the **Physics** tab, enable **Are&nbsp;Timesteps&nbsp;Shown**.

   <img
   src="../assets/physics/adaptive-timestepping/Settings-Are-Timesteps-Shown.png"
   width="500" />

Once enabled, simulated parts will be outlined by their current simulation rate. If a part stops being simulated, either via the [sleep system](https://blog.roblox.com/2020/07/roblox-physics-building-better-sleep-system/) or a network ownership change, the part will no longer be outlined.

<img src="../assets/physics/adaptive-timestepping/Diagram-Labels.png" width="100%" />

<figure>
  <video src="../assets/physics/adaptive-timestepping/Adaptive-Timestepping.mp4" controls width="100%"></video>
  <figcaption>Simulated parts outlined by the color representing their current simulation rate</figcaption>
</figure>

## Fixed-Rate Scenarios

Adaptive timestepping can improve physics performance by up to 2.5 times and it is recommended in most cases. However, some experiences should use **Fixed** mode (240&nbsp;Hz), including:

Experiences that require highly accurate simulations and stability, such as racing games, "destruction" simulations, or games featuring complex mechanisms like tanks.

Simulations where most parts default to the 240&nbsp;Hz solver island (red outlines during [debugging](#debugging-visualization)). When 240&nbsp;Hz islands interact with islands of different frequencies (60&ndash;120&nbsp;Hz), those islands are converted to 240&nbsp;Hz with an overhead that may negate any performance gains resulting from adaptive timestepping.
