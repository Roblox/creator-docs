---
title: MicroProfiler
description: The MicroProfiler is a Studio and client tool for optimizing your experience.
---

The **MicroProfiler** is an optimization tool available in Roblox Studio and the Roblox client that provides detailed timing information for [Task Scheduler](../../studio/microprofiler/task-scheduler.md) processes called **tags**.

- For a list of common processes, refer to the [Tag Reference](../../studio/microprofiler/tag-table.md).
- For a step-by-step example of using the MicroProfiler to identify a performance issue, see the [MicroProfiler Walkthrough](../../studio/microprofiler/using-microprofiler.md).

## MicroProfiler Basics

To open the MicroProfiler, press <kbd>Ctrl</kbd><kbd>Alt</kbd><kbd>F6</kbd> (<kbd>⌘</kbd><kbd>⌥</kbd><kbd>F6</kbd>) in Studio or the client. You can also use the settings menu in the client.

When open, a menu bar is visible at the top of the 3D viewport. In the default mode, a moving bar graph shows the time used on each frame of the Task Scheduler.

<img alt="The Microprofiler frame graph, showing blue frames and detailed frame information." src="../../assets/optimization/microprofiler/micro-frame.png" width="440px" />

Bars should generally be around the middle of the graph, but you might see sudden spikes (rapid increases in value). Spikes indicate that more time was taken to perform some process, usually because of an increased workload. For instance, creating a lot of moving parts requires more work from the physics simulation, which then needs more time to process motion and part contacts. The following image shows an example of a spike:

<img alt="The Microprofiler with several bars higher than others." src="../../assets/optimization/microprofiler/micro-spike.png" width="300px" />

To pause the recording of frames, press <kbd>Ctrl</kbd><kbd>P</kbd> (<kbd>⌘</kbd><kbd>P</kbd>) or click **Pause** in the menu bar. While paused, a timeline appears, and you can navigate through frames by clicking or dragging on the graph.

For a full summary of the various views and how to navigate the MicroProfiler interface, see [MicroProfiler Modes](modes.md).

## Threads

Like many programs, Roblox uses multiple threads to perform several sequences of tasks at the same time. In the MicroProfiler [detailed mode](modes.md#detailed-mode), you can see labels for these on the left.

<img alt="The lefthand side of the Microprofiler detailed view, with rows for threads." src="../../assets/optimization/microprofiler/micro-panning.png" width="440px" />

There are three types of threads:

- **Main/Render**: Processes input, `Class.Humanoid|Humanoids`, animations/tweening, physics ownership, sound, and waiting script resumes. Also updates Studio interfaces and coordinates the other threads.

- **Worker** ("TSMk2 worker"): Helps the main thread with networking, physics, and pathfinding. Due to the number of CPU cores in modern computers, you likely have many worker threads.

- **Render** ("GPU"): Follows a "prepare, perform, present" logic. Communicates with the graphics processing unit (GPU) of the device.

  - Prepare: Information from the main thread is used to update rendering models.
  - Perform: Issue rendering commands, including 2D interfaces.
  - Present: Synchronizes with the GPU.

## Custom Profiling

If your scripts are running complicated tasks, you can profile critical portions of the code to ensure that they're not taking too long. Wrap code in `Library.debug.profilebegin()` and `Library.debug.profileend()` to time everything done between those function calls and create a label on the MicroProfiler timeline.

```lua title="HardWorkScript"
debug.profilebegin("Hard Work")
-- Here is where the code to be profiled should be
debug.profileend()
```

<img alt="A custom label on the detailed view of the MicroProfiler." src="../../assets/optimization/microprofiler/micro-profiled.png" width="300px" />

There is a limited amount of memory available to MicroProfiler labels. If this memory runs out, custom profiler labels might not appear as a meaningful name in the timeline. Use fewer labels to avoid this issue. If you no longer need to profile a section of your code, comment out or remove calls to these functions.

### Example

The code sample below connects a dummy function to the `Class.RunService.PreSimulation` event, which runs every frame. Anything done this often should run as efficiently as possible, so this function is a good candidate for profiling.

```lua
local RunService = game:GetService("RunService")

local function onPreSimulation()
	debug.profilebegin("Hard Work")
	-- Example hard work: swap two variables 200,000 times
	local a, b = 0, 1
	for _ = 1, 200000 do
		a, b = b, a
	end
	debug.profileend()
end
RunService.PreSimulation:Connect(onPreSimulation)
```

When you run the experience and pause the MicroProfiler (<kbd>Ctrl</kbd><kbd>P</kbd> or <kbd>⌘</kbd><kbd>P</kbd>), the custom label is visible under the **gameStepped** label.

<img alt="Many labels on the MicroProfiler, with a custom label taking up the majority of the processing time." src="../../assets/optimization/microprofiler/micro-contrived.png" width="700px" />

From its duration on the timeline, you can tell that the function is using a lot of processing time compared to other operations.

## Saving Frame Data

If you want to save a set of frame data for later review (or to share with someone else), use the **Dump** menu. The engine saves the frame data to a file named `microprofile-<date>-<time>.html` in the Roblox logs directory.

- On Windows, check `%LOCALAPPDATA%\Roblox\logs`.
- On macOS, check `~/Library/Logs/Roblox`.

These HTML files use the same [web-based UI](#using-the-web-ui) as the [live connection for mobile devices](#profiling-on-mobile-devices) and [server dumps](#profiling-the-server).

## Profiling on Mobile Devices

To access the MicroProfiler from the mobile client, your mobile device must be connected to the **same network** as your development machine.

Enable the MicroProfiler in the **Settings** menu of the mobile device. After you enable it, the menu shows an IP address and a port number.

<img alt="A picture of the Settings menu on mobile, showing how to enable the MicroProfiler." src="../../assets/optimization/microprofiler/6MicroProfiler-Mobile-Enable.jpeg" width="600px" />

For example, in the screenshot above, the address is `192.168.1.166` and the port is `1338`. From a computer on the same network, navigate to `http://192.168.1.166:1338` for a [web-based version](#using-the-web-ui) of the MicroProfiler user interface.

<img alt="The MicroProfiler web view." src="../../assets/optimization/microprofiler/7MicroProfiler-Browser.jpeg" width="600px" />

## Profiling the Server

In addition to the standard client MicroProfiler, you can take brief dumps of server activity using the server MicroProfiler.

1. In an experience that you have edit permissions for, open the Developer Console with <kbd>Ctrl</kbd><kbd>Alt</kbd><kbd>F9</kbd>.
1. In the dropdown menu, select **MicroProfiler**.
1. In the **ServerProfiler** section, specify the number of frames per second (maximum 60) and the number of seconds to profile (maximum 4).
1. Click **Start Recording**.

   <img alt="The Developer Console MicroProfiler screen." src="../../assets/optimization/microprofiler/micro-server.png" width="800px" />

   After a few seconds, the Developer Console provides the path to the file, which is the same path as a [standard dump](#saving-frame-data).

## Using the Web UI

In general, the MicroProfiler web UI works similarly to [detailed mode](./modes.md#detailed-mode), but it has a few additional features:

- In addition to filtering by group, you can filter by thread.
- Use the **X-Ray** menu to enable or disable color coding for memory allocation.

  <img alt="The MicroProfiler web view with x-ray enabled." src="../../assets/optimization/microprofiler/micro-xray.png" width="600px" />

  - Lighter frames within the main bar graph indicate higher memory allocation.
  - Lighter portions of the preview bar and lighter labels on the timeline indicate portions of the frame with higher memory allocation.

- Use the **Export** menu to export a CPU or memory flame graph, a specialized visualization that summarizes all of the call stacks included in the dump.

  <img alt="The MicroProfiler flame graph." src="../../assets/optimization/microprofiler/micro-flame.png" />
