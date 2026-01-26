---
title: MicroProfiler walkthrough
description: Explains how using the MicroProfiler can help you optimize portions of your experience.
---

This walkthrough shows how to use the MicroProfiler to find a problematic aspect of an experience and identify the root cause. Download the experience, **Open from File** in Studio, and follow along.

<a href="../../assets/optimization/microprofiler/RaycastSpam.rbxl">
  <Button variant="contained">Download the Experience</Button>
</a>

<br />

## Identify the issue

1. After you open the experience in Studio, start testing it with <kbd>F5</kbd> or the **Play** button.

1. The frame rate feels decent, but not as smooth as it should be for an experience of this size and scope. Press <kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>F5</kbd> (<kbd>⌘</kbd><kbd>Shift</kbd><kbd>F5</kbd>) to show the **Performance Summary** overlay.

   <img alt="Performance summary showing 45 FPS." src="../../assets/optimization/microprofiler/micro-tut-framerate.png" width="500px" />

   Note that the frame rate is below 60 frames per second (FPS).

1. Open the MicroProfiler by pressing <kbd>Ctrl</kbd><kbd>Alt</kbd><kbd>F6</kbd> (<kbd>⌘</kbd><kbd>⌥</kbd><kbd>F6</kbd>).

   <img alt="The MicroProfiler after opening it." src="../../assets/optimization/microprofiler/micro-tut-bar-graph.png" width="500px" />

   Note that the frame times are **consistent**—the bars are roughly the same height—so whatever is causing the low frame rate is running every single frame as opposed to running occasionally and causing frame time spikes.

1. Pause the MicroProfiler by pressing <kbd>Ctrl</kbd><kbd>P</kbd> (<kbd>⌘</kbd><kbd>P</kbd>). Pausing with the keyboard shortcut opens [detailed mode](./modes.md#detailed-mode).

1. Click and drag to pan the graph. Note how one particular task in the worker threads seems to be using a lot of processing time compared to the main thread. Hover over `Class.RunService.Stepped` and note how long it's taking to render.

   <img alt="Detailed mode with long labels for processes." src="../../assets/optimization/microprofiler/micro-tut-stepped.png" width="600px" />

1. Stacked bars in the timeline indicate a hierarchy of code, so keep hovering on lower and lower layers to try and identify the issue.

   <img alt="On-hover details for various processes, with LocalScript highlighted." src="../../assets/optimization/microprofiler/micro-tut-localscript.png" width="600px" />

   <img alt="On-hover details for various processes, with Raycast highlighted." src="../../assets/optimization/microprofiler/micro-tut-raycast-label.png" width="600px" />

   Note the `LocalScript` label, which indicates the name of the script, and the `Raycast` label, which indicates that the problem might be related to raycasting.

## Create troubleshooting labels

Now that the MicroProfiler has provided a starting point, you can troubleshoot the problematic code.

1. Stop the play test and filter the Explorer window for `localscript` to find the file.

   <img alt="A view of filtering in the Explorer window." src="../../assets/optimization/microprofiler/micro-tut-explorer-filter.png" width="400px" />

   A search for `raycast` indicates that this portion of code is probably the culprit for the experience's poor performance:

   ```lua
   local RAYS_PER_SECOND = 1500

   local function onStepped()

   	for _ = 1, RAYS_PER_SECOND do
   		local startPosition = getRandomPosition()
   		local endPosition = getRandomPosition()
   		local direction = endPosition - startPosition

   		Workspace:Raycast(
            startPosition,
            endPosition
         )
   	end

   end

   RunService.Stepped:Connect(onStepped)
   ```

   Specifically, you can see that the code is casting 1,500 rays per second in random directions.

1. To verify that this portion of code is causing the rendering delay, wrap the contents of the function with `Library.debug.profilebegin()` and `Library.debug.profileend()`:

   ```lua
   local function onStepped()

      debug.profilebegin("Raycast Spam")

      for _ = 1, RAYS_PER_SECOND do
         local startPosition = getRandomPosition()
         local endPosition = getRandomPosition()
         local direction = endPosition - startPosition

         Workspace:Raycast(
            startPosition,
            endPosition
         )
      end

      debug.profileend()

   end
   ```

## Confirm and fix the issue

1. Start testing the experience, and open the MicroProfiler again.

1. Note how the MicroProfiler now shows the custom label, indicating that this function was indeed the root cause.

   <img alt="MicroProfiler detailed view with 'Raycast Spam' visible." src="../../assets/optimization/microprofiler/micro-tut-spam.png" width="500px" />

1. Stop the play test.

1. Delete or comment out the `onStepped()` function and the `RunService.Stepped:Connect(onStepped)` connection.

1. Start testing the experience again, and check the **Performance Summary** again.

   <img alt="Performance summary showing 60 FPS." src="../../assets/optimization/microprofiler/micro-tut-framerate2.png" width="500px" />

   Note the huge improvement to frame rate and corresponding drop in frame times on the MicroProfiler graph.
