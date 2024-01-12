---
title: MicroProfiler
description: MicroProfiler is a tool for optimizing your experience in Roblox Studio and Client.
---

The MicroProfiler is an optimization tool available in Roblox Studio and the Roblox Client that provides detailed timing information for [Task Scheduler](../../studio/microprofiler/task-scheduler.md) processes called Tags. For a full list of these process Tags, refer to the [Tag Table](../../studio/microprofiler/tag-table.md). For a walkthrough on how to effectively use MicroProfiler to optimize your experience, refer to the [MicroProfiler Tutorial](../../studio/microprofiler/using-microprofiler.md).

## Using The MicroProfiler

To open the MicroProfiler interface, press <kbd>Ctrl</kbd><kbd>Alt</kbd><kbd>F6</kbd> (<kbd>⌘</kbd><kbd>⌥</kbd><kbd>F6</kbd>) in Studio or the client. When open, a menu bar is visible at the top of the game view. Under it, there is a moving bar graph which reflects the time used on each frame of the Task Scheduler as they pass – the most recent frames appear on the right, and flow to the left.

<img src="../../assets/optimization/microprofiler/1MicroProfiler-Frames.jpeg"
   width="50%" />

The orange bars indicate the processing time each frame is taking. They should generally be around the middle of the graph, but while the game is running you may see the bars spike or increase in value. This indicates that more time was taken to perform some Task Scheduler process, usually because of an increased workload. For instance, creating a lot of moving parts puts more work on the physics simulation, and therefore more time is used to process motion and part contacts. The following image shows an example of a spike:

<img src="../../assets/optimization/microprofiler/2MicroProfiler-Frames-Spike.jpeg"
   width="50%" />

To pause the recording of frames, press <kbd>Ctrl</kbd><kbd>P</kbd> (<kbd>⌘</kbd><kbd>P</kbd>) or click **Pause** along the top bar. While paused, a timeline appears over the game view, and you can navigate through frames by clicking or dragging on the graph. Scrolling zooms on the timeline. Colorful labels describe different tasks being performed; labels that appear directly underneath another label indicate that a task is performed during another task.

<img src="../../assets/optimization/microprofiler/3MicroProfiler-Timeline.jpeg"
   width="50%" />

Right-click a label to zoom the timeline to exactly the duration of the label. Left-click it to add the label to a line graph at the bottom right of the game view. The graph will show the time the task is taking each frame. Using this graph, you can test the performance of only certain labels in your game. Multiple labels can be added, and you can hide the graph by right-clicking it.

<img src="../../assets/optimization/microprofiler/4MicroProfiler-Graph.jpeg"
   width="50%" />

## Threads

Like many programs, Roblox uses multiple threads to perform several sequences of tasks at the same time. In the MicroProfiler timeline, you can see labels for these on the left. There are three types of threads:

- **Main**: Processes input, Humanoids, animations/tweening, physics ownership, sound, waiting script resumes, updates Studio interfaces (/studio/explorer, Properties), and coordinates the other threads.

- **Worker** ("TSMk2 worker"): Helps main thread with networking, physics and pathfinding.Multiple are used depending on the number of processor cores.

- **Render** ("GPU"): Follows a prepare, perform, present logic. Communicates with the graphics processing unit (GPU) of the device.
  - Prepare: Information from the main thread is used to update rendering models.
  - Perform: Issue rendering commands, including 2D interfaces.
  - Present: Synchronizes with the GPU.

## Custom Profiling

If your scripts are doing complicated tasks, then you'll want to profile critical points to ensure a reasonable amount of time is being used. You can do this by calling debug.profilebegin followed by debug.profileend, which times everything done between these two function calls. This creates a label on the MicroProfiler timeline.

```lua
debug.profilebegin("Hard Work")
-- Here is where the code to be profiled should be
debug.profileend()
```

Be aware that there is a limited amount of memory available to MicroProfiler labels, so sometimes custom profiler labels may not appear as a meaningful name if this memory runs out. Using less labels will avoid this. If you no longer need to profile a section of your code, you should comment out or remove calls to these functions as they provide no other benefit except during debugging.

### Example

The code sample below connects a dummy function to the `Class.RunService.PreSimulation` event, which runs every frame. Anything done this often should run as efficiently as possible, so calls to debug.profilebegin and debug.profileend have been added around the code to be profiled.

```lua
local RunService = game:GetService("RunService")

local function onPreSimulation()
	debug.profilebegin("Hard work") -- Start profiling here with this label
	-- Example hard work: swap two variables 200,000 times
	local a, b = 0, 1
	for i = 1, 200000 do
		a, b = b, a
	end
	debug.profileend() -- Stop profiling here
end
RunService.PreSimulation:Connect(onPreSimulation)
```

Running the game and pausing the profiler (<kbd>Ctrl</kbd><kbd>P</kbd>; <kbd>⌘</kbd><kbd>P</kbd>), the custom profiler label is visible under the Stepped label:

<img src="../../assets/optimization/microprofiler/5MicroProfiler-Custom.png"
   width="50%" />

It's clear that this function is using a lot of performance needlessly: if this were real code, looking here for optimization opportunities would be a good start. However, this is a contrived example that does meaningless work to emphasize the label.

## Profiling on Mobile Devices

You can enable the MicroProfiler via the Settings menu. Using a mobile device connected to the same network as your development machine, you can access a browser-based MicroProfiler. Once enabled, the network IP address of the device is displayed along with a port number.

<img src="../../assets/optimization/microprofiler/6MicroProfiler-Mobile-Enable.jpeg"
   width="50%" />

For example, in the screenshot above, the address is `192.168.1.166` and the port is `1338`. In the web browser of a computer connected to the **same network**, you would navigate to `http://192.168.1.166:1338`. A similar interface as the one seen on non-mobile devices is shown:

<img src="../../assets/optimization/microprofiler/7MicroProfiler-Browser.jpeg"
   width="50%" />
