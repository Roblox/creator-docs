---
title: Using MicroProfiler
description: Explains how using the MicroProfiler can help you optimize portions of your experience.
---

The [MicroProfiler](../../studio/microprofiler/index.md) is an optimization tool available in Roblox Studio that helps developers improve performance by visually representing unoptimized portions of their experience. This tutorial will showcase how to use the MicroProfiler to identify problematic segments of your experience and use it to find the cause of the poor performance.

For a more hands-on look at this process, you can download the [tutorial project file](../../assets/optimization/microprofiler/RaycastSpam.rbxl) and follow along.

## Starting MicroProfiler

MicroProfiler isn't visible by default and is summoned by keystroke. You can summon it any time, but it's most useful when an experience is running.

1. Start by play testing your experience by pressing **Play** in the Home Menu.

   <img src="../../assets/optimization/microprofiler/Tutorial-mpt1.png"
   width="80%" />

2. Summon MicroProfiler by pressing <kbd>Ctrl</kbd><kbd>Alt</kbd><kbd>F6</kbd> (<kbd>⌘</kbd><kbd>⌥</kbd><kbd>F6</kbd>). You can see the render time for each individual frame represented at the top by the individual vertical orange bars. The higher the orange bar, the longer that particular frame takes to render.

   <img src="../../assets/optimization/microprofiler/Tutorial-mpt3.png"
   width="80%" />

## Pausing MicroProfiler

MicroProfiler is constantly running, analyzing the render time for every frame. To see useful data, you need to pause MicroProfiler and analyze render information on a frame-by-frame basis. Press <kbd>Ctrl</kbd><kbd>P</kbd> to pause the MicroProfiler.

<img src="../../assets/optimization/microprofiler/Tutorial-mpt5.png"
   width="80%" />

Each orange bar represents one frame, with the vertical height proportional to how long it takes that frame to render. You can tell something is wrong by how high the bars are. In the top right you'll see a green section that represents the current screen space. If you hover over the orange bars, you can select an individual frame for closer inspection.

## Navigating MicroProfiler

On the left side of MicroProfiler, you'll see individual performance thread names. **Click** and **drag** down to find the largest horizontal category in that frame.

<img src="../../assets/optimization/microprofiler/Tutorial-mpt6.png"
   width="80%" />

The horizontal length signifies the time duration this frame takes to render. A shorter horizontal length typically indicates well-optimized code. The vertical height is a hierarchy that signifies layers of code.

<img src="../../assets/optimization/microprofiler/Tutorial-mpt7.png"
   width="80%" />

## Identifying the Problem

Hovering your mouse over each section reveals information pertaining to that portion of code.

1. Hover over `Class.RunService.Stepped` and notice it takes about 26 milliseconds to render.

   <img src="../../assets/optimization/microprofiler/Tutorial-mpt8.png"
   width="80%" />

2. Hover over `Class.LocalScript` and notice that something is being called thousands of times.

   <img src="../../assets/optimization/microprofiler/Tutorial-mpt9.png"
   width="80%" />

   Continue down the list and notice the `Raycast` label. This indicates that the problem might be related to raycasting.

   <img src="../../assets/optimization/microprofiler/Tutorial-mpt13.png"
   width="80%" />

## Creating Troubleshoot Labels

Now that MicroProfiler has provided a starting point, it's time to troubleshoot and review the code.

1. Stop the play test and look at the `Class.LocalScript` file to search for the problem.

   <img src="../../assets/optimization/microprofiler/Tutorial-mpt10.png"
      width="80%" />

   This portion of code appears to be the culprit for the experience's poor performance:

   ```lua
   local function onStepped()
      debug.profilebegin("RaycastSpam")

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

   Looking in our `Class.LocalScript` in the `RenderStepped` event we see that there are rays being casted 1500 times per second. To make sure that this portion of code is indeed what's causing the rendering delay, give it a label that will highlight this portion of code when MicroProfiler is run.

2. Create a label using the `Library.debug.profilebegin()` tag and call it `Raycast Spam`.
3. Close the tag by using `Library.debug.profileend()`.

   <img src="../../assets/optimization/microprofiler/Tutorial-mpt11.png"
   width="80%" />

## Confirming the Problem

If the large horizontal bars in MicroProfiler are wrapped in this tag you will know that you were successful in identifying the unoptimized code.

1. Playtest your experience.
2. Pause MicroProfiler using <kbd>Ctrl</kbd><kbd>P</kbd>.
3. **Click** and **drag** down to find the largest horizontal category in that frame.
4. Look for the newly created `Raycast Spam` tag.

   <img src="../../assets/optimization/microprofiler/Tutorial-mpt12.png" width="80%" />
