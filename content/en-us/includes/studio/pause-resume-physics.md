---
title: include
---

While [playtesting](#playtest-options), the **Pause Physics** and **Resume Physics** buttons are useful for debugging ephemeral scenes and mechanisms, without disabling rendering.

<img src="../assets/studio/general/Test-Tab-Pause-Resume-Physics.png" width="800" alt="Pause Physics and Resume Physics buttons available during playtesting in Studio." />

By default, pausing and resuming physics acts upon both the client **and** server as indicated by the **All** notation. If you wish to pause or resume only the client **or** server physics, click the small arrow on either button and select **Current**. Then, depending on your chosen view through the **Client/Server** toggle, pausing or resuming will act only upon that side of the simulation.

<img src="../assets/studio/general/Test-Tab-Pause-Resume-Physics-All-Current.png" width="800" alt="Selection arrows for Pause Physics and Resume Physics to toggle between All or Current pause/resume action between client and server physics." />

When physics is paused, you can **step forward** 1/60th of a second (60&nbsp;Hz) by clicking the **Step&nbsp;Forward&nbsp;Physics** button. Like the neighboring buttons to its left, clicking the small arrow lets you toggle client and/or server steps between **All** or **Current**.

<img src="../assets/studio/general/Test-Tab-Step-Forward-Physics.png" width="800" alt="Step Forward Physics button available during playtesting in Studio, only active while physics is paused." />

Note the following technical details in relation to physics pause/resume:

- Although `Class.Animation|Animations` are not based on physics, these toolbar buttons also pause/resume animations.
- Pausing or resuming physics has no effect on running scripts.
- Only the `Class.RunService` callbacks `Class.RunService.PreAnimation|PreAnimation`, `Class.RunService.PreSimulation|PreSimulation`, `Class.RunService.PostSimulation|PostSimulation`, and `Class.RunService.Stepped|Stepped` pause or resume through these toolbar buttons. Other callbacks (`Class.RunService.PreRender|PreRender`, `Class.RunService.Heartbeat|Heartbeat`, and `Class.RunService.RenderStepped|RenderStepped`) continue to fire, maintaining normal functionality of camera scripts, rendered visualizations, and plugins.
