---
title: Script Profiler
description: Script Profiler is a tool within the Developer Console that records profiling sessions of all running scripts.
---

**Script Profiler** is a tool within the [Developer Console](../../studio/developer-console.md) that allows you to record profiling sessions of all running scripts and view their CPU time costs with custom recording and display settings. It can record all types of function calls, including Luau functions, method calls, and property accesses. This tool is helpful for identifying scripts that take up the most CPU resources and slow down the performance.

<Alert severity="info">
Script Profiler only records function calls that consume CPU resources, so it doesn't record threads that sleep or wait for results.
</Alert>

## Record profiling sessions

Before recording, you need to select the recording environment from:

- **Client** (Default) — Records client-side scripts, including `Class.LocalScript|LocalScripts` and `Class.Script|Scripts` with `Class.BaseScript.RunContext|RunContext` set to `Enum.RunContext.Client|Client`.
- **Server** — Records server-side scripts, including `Class.Script|Scripts` with `Class.BaseScript.RunContext|RunContext` set to `Enum.RunContext.Server|Server` or `Enum.RunContext.Legacy|Legacy`. Script Profiler clears all collected server-side data at the end of each session.

You can also set the following recording options:

<table>
  <thead>
    <tr>
      <th>Behavior</th>
      <th>Options</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Frequency</td>
      <td>1000 times per second (1 KHz)<br></br>10,000 times per second (10 KHz)</td>
      <td>1 KHz</td>
      <td>The 10 KHz frequency has higher precision, as Script Profiler might not pick up API calls that execute more frequently than your selected frequency, but it also has a higher performance cost.</td>
    </tr>
    <tr>
      <td>Session Length</td>
      <td>1-minute<br></br>5-minute<br></br>10-minute<br></br>Manual</td>
      <td>Manual</td>
      <td>The manual option requires you to stop recording manually.</td>
    </tr>
    <tr>
      <td>Live Polling Behavior</td>
      <td>On<br></br>Off</td>
      <td>Off</td>
      <td>This behavior polls and refreshes profiling data each second during a profiling session.</td>
    </tr>
  </tbody>
</table>

To record a new profiling session:

1. Open [Developer Console](../../studio/developer-console.md#opening-the-developer-console).
2. Expand the tools dropdown to select **ScriptProfiler**.

   <img src="../../assets/studio/console/ScriptProfiler-Open.png" width="200" alt="Dropdown menu of all Developer Console tools with the ScriptProfiler option highlighted for selection." />

3. Expand the client-server dropdown to select **Client** or **Server**.

   <img src="../../assets/studio/console/Client-Server-Dropdown.png" width="600" alt="Dropdown menu with Client and Server options for selection." />
4. (Optional) Check the **Live** checkbox to enable the live polling behavior.
5. (Optional) Select **Freq** and **Time** to choose the recording frequency and session time length if you don't want to use the default values.
6. Click **Start** to begin the profiling session. If you set a duration, Script Profiler displays a countdown timer with the remaining time in the session.
7. Click **Stop** or wait until the recording finishes to display the profiling data.

## Read profiling data

After a session stops, Script Profiler generates a table showing how much time each function call costs in CPU time. The table sorts function calls from the most-time-spent to least-time-spent, and allows you to search for specific functions by their name. It provides the following two views:

- **Callgraph** (Default): Categorizes and displays function calls into a tree structure based on frame tasks. This view displays each task category as nodes under the same root and allows you to expand them to view functions. You can also hover over any node in the tree to view file and line information. For example, **Stepped/CameraInput/&#60;anonymous&#62;** might reveal `Players.[LocalPlayer].PlayerScripts.PlayerModule.CameraModule.CameraInput:125`.
   <img src="../../assets/studio/console/Callgraph.jpeg" width="800" alt="Example callgraph view of a profiling session." />
- **Functions**: Lists all functions without categorizing them by tasks.
   <img src="../../assets/studio/console/Functions.jpeg" width="800" alt="Example functions view of a profiling session." />

You can also select from the following display options to tailor your debugging needs:

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Options</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Unit</td>
      <td>Milliseconds (ms)<br></br>Percentage (%)</td>
      <td>ms</td>
      <td>Displays time spent on each API call in milliseconds or percentages of the total recording session.</td>
    </tr>
    <tr>
      <td>Average</td>
      <td>Off<br></br>1-second<br></br>1-minute<br></br>5-minute<br></br>10-minute</td>
      <td>Off</td>
      <td>Calculates the average time spent on each API call by the selected value. If you select an option that is longer than the session length, Script profiler extrapolates the session length to calculate the average. For example, you can select the 5-minute option for a 1-minute session to see the expected average value if you run the code for 5 minutes.</td>
    </tr>
  </tbody>
</table>

## Export profiling data

Script Profiler allows you to export recorded profiling data as a JSON file. To export recorded data after a profiling session:

1. On the Script Profiler window, click **Export**.
2. On the export window, select the profiling session that you want to export. Rename the default file name if you want to set a custom name.
3. Click **Export** to save the JSON file.

   <img src="../../assets/studio/console/Export-Window.jpeg" width="600" alt="Example export window." />

The exported JSON file includes the following fields:

- **Version**: The version number.
- **SessionStartTime**: A timestamp in milliseconds that records the session start time.
- **SessionEndTime**: A timestamp in milliseconds that records the session end time.
- **Categories**: An array of frame task categories recorded in the profiling session. Each entry includes:
  - **Name**: The name of each frame task category.
  - **NodeId**: The unique identifier of a task category (node). It's a 1-based index into the `Nodes` array. For example, you can look up the node with the `NodeId` of `123` by retrieving the 123rd element in `Nodes`.
- **Nodes**: An array of nodes recorded in the profiling session. Each entry includes:
  - **TotalDuration**: The amount of time that the node costs in CPU time in microseconds.
  - **FunctionIds**: An array of unique identifiers of functions.
  - **NodeIds**: An array of Node IDs.
- **Functions**: An array of functions recorded in the profiling session.
  - **TotalDuration**: The amount of time that the function costs in CPU time in microseconds.
  - **Name**: The name of the function, if available.
  - **Source**: The source of the function, if available.
  - **Line**: The line number of the function, if available.
  - **Flags**: A bit field that indicates any specific function execution environment. Currently can have the following values:
    - `0`: The 0th bit represents `IsNative` for execution under Native CodeGen.
    - `1`: The 1 th bit represents `IsPlugin` for execution as part of a plugin.

```json title="Example Exported Profiling Data"
  {
  "Version":2,
  "SessionStartTime":1704850750514,
  "SessionEndTime":1704850751198,
  "Categories":
  [
    {"Name":"Parallel Luau","NodeId":4},
    {"Name":"Heartbeat","NodeId":1}
  ],
  "Nodes":
  [
      {"TotalDuration":2530,"FunctionIds":[1],"NodeIds":[2]},
      {"TotalDuration":2530,"FunctionIds":[2,5],"NodeIds":[3,7]},
      {"TotalDuration":1267},
      {"TotalDuration":7746,"FunctionIds":[3],"NodeIds":[5]},
      {"TotalDuration":7746,"FunctionIds":[4],"NodeIds":[6]},
      {"TotalDuration":7746},
      {"TotalDuration":1263,"FunctionIds":[6],"NodeIds":[8]},
      {"TotalDuration":1263,"FunctionIds":[7],"NodeIds":[9]},
      {"TotalDuration":1263,"FunctionIds":[8],"NodeIds":[10]},
      {"TotalDuration":1263}
  ],
  "Functions":
  [
    {"Name":"main","TotalDuration":2530},
    {"Source":"builtin_ManageCollaborators.rbxm.ManageCollaborators.Packages._Index.roblox_rodux-3.0.0.rodux.Store","Line":81,"TotalDuration":1267},
    {"Name":"Script","TotalDuration":7746},
    {"Source":"Workspace.Actor.Script","Line":1,"TotalDuration":7746},
    {"Source":"builtin_DeveloperInspector.rbxm.DeveloperInspector.Packages._Index.DeveloperFramework.DeveloperFramework.UI.Components.Grid","Line":221,"TotalDuration":1263},
    {"Source":"builtin_DeveloperInspector.rbxm.DeveloperInspector.Packages._Index.DeveloperFramework.DeveloperFramework.UI.Components.Grid","Name":"_update","Line":236,"TotalDuration":1263},
    {"Source":"builtin_DeveloperInspector.rbxm.DeveloperInspector.Packages._Index.DeveloperFramework.DeveloperFramework.UI.Components.Grid","Name":"_getRange","Line":277,"TotalDuration":1263},
    {"Source":"[C]","Name":"ScrollingFrame.CanvasPosition","TotalDuration":1263}
  ]
}
```
