---
title: ScriptProfiler
description: ScriptProfiler is a tool within the Developer Console that records snapshots of all running scripts.
---

**ScriptProfiler** is a tool within the Developer Console that records snapshots of all running scripts at approximately one thousand times per second. You can use the profiler to debug performance issues as it can help identify scripts that are taking up the most resources in an experience.

## Using ScriptProfiler

ScriptProfiler can be used to take a snapshot of the running scripts through [Developer Console](../../studio/developer-console.md). On the server side, profiling sessions are shared. The session starts when at least one user starts server-side profiling and ends when all users on the same server stop profiling. This means that if a second user starts while the profiler is already running, the second user may receive profiling data collected before they started their session.

To start a new profiling session:

1. Press <kbd>F9</kbd> to open the **Developer Console**.

   <img  src="../../assets/optimization/script-profiler/scriptprofiler-developer-console.png"/>

2. The default feature is Log. To change it, click the arrow and select **ScriptProfiler** from the dropdown menu.

   <img  src="../../assets/optimization/script-profiler/scriptprofiler-picker-400x480.png" width="400px" />

3. Click **Start** to begin the profiling session. It might not look like anything is happening, but the profiler is sampling all scripts executing at this time.

   <img  src="../../assets/optimization/script-profiler/scriptprofiler-start-600x200.png" width="600px"/>

4. Click **Stop** when finished to display the captured data. <Alert severity='info'> **Server-side**, collected data is cleared once all running sessions have ended.</Alert>

## Reading Captured Data

The captured data is organized into various categories such as how it relates to each frame or by events.

1. Expand **&lt;root&gt;** and then each category in the tree to see captured information within.

   <img  src="../../assets/optimization/script-profiler/scriptprofiler-expand-root-600x200.png" width="600px"/>

2. Hover your cursor over a node in the call-tree to view file and line information.

   <img  src="../../assets/optimization/script-profiler/scriptprofiler-line-information-600x200.png" width="600px"/>

The profiler supports sampling Luau functions, method calls, and property access, but it attributes the time spent in standard library calls or accessing primitive types, such as `Datatype.CFrame`, to the calling function. Profiling data for functions that don't significantly contribute will be noisy. Threads that sleep or wait for results don't contribute to the overall time displayed by the profiler because they don't consume CPU resources.

Manually specified profiler regions via `Library.debug.profilebegin()` and `Library.debug.profileend()` are also supported.

### Changing Display Units

By default, ScriptProfiler represents time spent in each node as milliseconds of CPU time. To toggle displaying the time spent as percentages of the total recording session, click Unit: %.

<img src="../../assets/optimization/script-profiler/scriptprofiler-units-600x200.png" width="600px" />

## Profiling Scripts on the Server

Switching to the **Server** tab enables profiling scripts running on the server. It is possible to profile both client-side and server-side simultaneously by switching between Client and Server. There may be a small delay between stopping the profiling session and updating the displayed profiling data.
