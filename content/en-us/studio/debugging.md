---
title: Debugging
description: |
  Debugging tools help you resolve errors and inspect scripts line-by-line as they run.
tags:
  - Roblox Studio
  - Debugger
  - Call Stack
  - Watch
  - Breakpoints
---

Studio offers many debugging tools and workflows commonly found in Integrated Development Environments (IDEs). These help you inspect and resolve errors in scripts as they run.

## Breakpoint debugging

Breakpoints are checkpoints that pause or "break" the execution of your scripts at specific lines. You can use the pauses to inspect and debug your experience, [watch](#watch) variables, and inspect the [call stack](#call-stack). Breakpoints are one of the most effective ways to debug functions, so they're one of the most important debugging tools.

### Management

In the [Script Editor](./script-editor.md), you can [insert](#insert) several types of breakpoints and edit the configuration of a breakpoint at any time, including during playtest sessions. If you edit breakpoints during a playtest session, the edits persist even after you finish it. You can also edit a breakpoint that's actively pausing your playtest session, but changes don't apply until the next playtest session.

#### Insert

Breakpoints take multiple variations and can be inserted at any line of executable code as follows:

<Tabs>
<TabItem label="Standard">
To insert a standard breakpoint at a line of code, click in the gutter directly to the right of its line number. Alternatively, right‑click in the gutter and select **Insert&nbsp;Breakpoint**. The breakpoint icon appears as a red circle.

<img alt="Standard breakpoint shown in the script gutter" src="../assets/studio/debugging/Gutter-Breakpoint.png" width="400" />
</TabItem>
<TabItem label="Conditional">
A conditional breakpoint pauses your script only if a specified condition is true, so it's useful for debugging how functions execute when certain variables have certain values or if you want to break only on certain executions in a loop.

To insert a conditional breakpoint, right‑click in the gutter and select **Insert&nbsp;Conditional&nbsp;Breakpoint**. In the popup window that appears, enter the desired condition, such as <Typography noWrap>`var == 10`</Typography>, then click **Save**. The conditional breakpoint icon appears as a circled **=** sign.

<img alt="Conditional breakpoint shown in the script gutter" src="../assets/studio/debugging/Gutter-Breakpoint-Conditional.png" width="400" />
</TabItem>
<TabItem label="Logpoint">
A logpoint is a special breakpoint that logs messages to the [Output](./output.md) window without pausing the script, making it useful for debugging the values of the variables before the line executes.

To insert a logpoint, right‑click in the gutter and select **Insert&nbsp;Logpoint**. In the popup window that appears, enter the desired log message, such as <Typography noWrap>`"The value of var:", var`</Typography>, then click **Save**. The logpoint icon appears as a red diamond.

<img alt="Logpoint shown in the script gutter" src="../assets/studio/debugging/Gutter-Breakpoint-Logpoint.png" width="400" />
</TabItem>
<TabItem label="Temporary">
A temporary breakpoint offers the same [options](#edit) as other breakpoint types, except that it automatically removes itself after the first [playtest session](#workflow). This makes it ideal for quickly testing variable values or functionality without needing to disable or delete the breakpoint afterward.

To insert a temporary breakpoint, right‑click in the gutter and select **Insert&nbsp;Temporary&nbsp;Breakpoint**. It initially appears as red circle and then you can [edit](#edit) its options to specify the behavior.

<img alt="Standard breakpoint shown in the script gutter" src="../assets/studio/debugging/Gutter-Breakpoint.png" width="400" />
</TabItem>
</Tabs>

#### Disable

To temporarily disable a breakpoint without [deleting](#delete) it, use any of the following workflows:

- Click the breakpoint's icon.
- Right-click the breakpoint's icon and select **Disable Breakpoint**.
- [Edit](#edit) the breakpoint and toggle its **Enabled** checkbox.

A disabled breakpoint appears as a hollow version of its enabled icon, for example a hollow circle for a disabled standard breakpoint, or a hollow diamond for a disabled logpoint.

<Grid container spacing={3}>
	<Grid item>
		<figure>
		<img alt="Disabled standard breakpoint shown in the script gutter" src="../assets/studio/debugging/Gutter-Breakpoint-Disabled.png" width="400" />
		<figcaption>Disabled standard breakpoint</figcaption>
		</figure>
	</Grid>
	<Grid item>
		<figure>
		<img alt="Disabled logpoint shown in the script gutter" src="../assets/studio/debugging/Gutter-Breakpoint-Logpoint-Disabled.png" width="400" />
		<figcaption>Disabled logpoint</figcaption>
		</figure>
	</Grid>
</Grid>

#### Delete

To delete a breakpoint, middle-click its icon or right‑click its icon and select **Delete Breakpoint**.

<Alert severity="warning">
Deleting a breakpoint deletes its **Condition** and **Log Message**. If you want to keep this information for future debugging, [disable](#disable) the breakpoint instead.
</Alert>

#### Edit

You can edit the configuration of a breakpoint at any time, including during playtest sessions. If you edit breakpoints during a playtest session, the edits persist even after you finish it. You can also edit a breakpoint that's actively pausing your playtest session, but changes don't apply until the next playtest session.

To edit a breakpoint:

1. Right-click the breakpoint icon and select **Edit Breakpoint**.
2. In the **Edit Breakpoint** window, configure the breakpoint as desired. You can mix these configurations together to best suit your debugging needs.

	 <table>
	 <thead>
	   <tr>
       <th>Option</th>
       <th>Description</th>
	   </tr>
	 </thead>
	 <tbody>
     <tr>
       <td>**Condition**</td>
       <td>An optional expression that determines whether the breakpoint activates. If the condition is empty, the breakpoint always activates. If the condition exists, the breakpoint becomes a [conditional breakpoint](#insert) and activates only if the condition is true. For example, if you want the breakpoint to activate only if the variable `var` equals `10`, set the condition to <Typography noWrap>`var == 10`</Typography>.</td>
     </tr>
     <tr>
       <td>**Log&nbsp;Message**</td>
       <td>An expression that prints to the [Output](./output.md) window when the breakpoint is hit. The format of the log message is the same as that of a `Global.LuaGlobals.print()` statement. For example, set the log message as <Typography noWrap>`"The value of var:", var`</Typography> to output the same message as <Typography noWrap>`print("The value of var:", var)`</Typography>.</td>
     </tr>
     <tr>
       <td>**Continue&nbsp;Execution**</td>
       <td>Determines whether the breakpoint pauses the script if it activates. This option is disabled by default unless the inserted breakpoint is a [logpoint](#insert).</td>
     </tr>
     <tr>
       <td>**Remove Breakpoint on Hit**</td>
       <td>If checked, the breakpoint automatically removes itself after the first playtest session, effectively making it a [temporary](#insert) breakpoint.</td>
     </tr>
     <tr>
       <td>**Trigger At**</td>
       <td>The **context** of a breakpoint determines whether it should activate on the **Client** (client‑side scripts), **Server** (server‑side scripts), or **Edit** (debugging [plugin](./plugins.md) scripts). If you choose **Custom Context**, the window indicates the current trigger contexts.</td>
     </tr>
   </tbody>
   </table>

### Workflow

The typical workflow for breakpoint debugging is as follows:

1. Open the script you'd like to debug and [insert breakpoints](#insert) on the lines of codes that you want to examine.
1. From Studio's mezzanine, [initiate a playtest](../studio/testing-modes.md#playtesting) to begin debugging.

   <img src="../assets/studio/general/Mezzanine-Testing-Mode-Test.png" width="800" alt="Test option in the testing modes dropdown of Studio's mezzanine." />

1. When the script hits a breakpoint, the playtest session **pauses** unless that breakpoint is [configured](#edit) to continue execution. A yellow arrow over the breakpoint indicates which line of code executes next.

   <img alt="Active breakpoint in the debugger showing yellow arrow" src="../assets/studio/debugging/Gutter-Breakpoint-Active.png" width="400" />

1. As the script pauses, inspect the [Breakpoints](#breakpoints) window, [Watch](#watch) window, [Call Stack](#call-stack) window, [Output](./output.md) window, and [Script Editor](#script-editor) to find information about variable values and function executions.

1. To continue executing code after hitting a breakpoint, click **Resume Scripts** in the mezzanine.

   <img src="../assets/studio/general/Mezzanine-Debug-Resume-Scripts.png" width="800" alt="Resume Scripts button indicated in Studio's mezzanine" />

   You can also execute code one line at a time with the stepping buttons in the mezzanine:

   <img src="../assets/studio/general/Mezzanine-Debug-Tools.png" width="800" alt="Breakpoint stepping buttons indicated in Studio's mezzanine" />

   <table>
   <thead>
    <tr>
      <th>Action</th>
      <th>Shortcut</th>
      <th>Description</th>
    </tr>
   </thead>
   <tbody>
    <tr>
      <td>**Step&nbsp;Into**</td>
      <td><kbd>F11</kbd></td>
      <td>The **Step Into** button moves the debugger into the code of the function on the current line. If there is no function on the current line, the debugger moves to the next line.</td>
    </tr>
    <tr>
      <td>**Step&nbsp;Over**</td>
      <td><kbd>F10</kbd></td>
      <td>The **Step Over** button moves the debugger to the next line of code, **not** moving into functions.</td>
    </tr>
    <tr>
      <td>**Step Out**</td>
      <td><kbd>Shift</kbd><kbd>F11</kbd></td>
      <td>The **Step Out** button moves the debugger out of the current function and to the next line of code after the function call. If the current line isn't inside a function, the debugger moves to the next line.</td>
    </tr>
   </tbody>
   </table>

1. When you're finished debugging the current session, click the **Stop** button.

   <img src="../assets/studio/general/Mezzanine-Debug-Stop.png" width="800" alt="Stop button indicated in Studio's mezzanine." />

### Monitoring

Studio includes multiple windows and tools to monitor variable values and function executions while debugging. With this information, you can find the root cause of most problems in your scripts.

<img src="../assets/studio/general/Toolbar-Debugging-Tools.png" width="800" alt="Breakpoints button indicated in Studio's toolbar" />

#### Breakpoints

The **Breakpoints** window is a unified view that shows all breakpoints within all scripts. To open it, click **Breakpoints** from Studio's **Script** tab toolbar, or navigate to the **Window**&nbsp;⟩ **Debug** menu and toggle on **Breakpoints**.

In the window, the **Script** and **Line** columns always display, and you can toggle on/off other [configuration](#edit) columns through the **&#8942;** menu in the upper‑right corner. Within the **Script** column, right‑click any breakpoint to reveal an options menu to [edit](#edit), [disable/enable](#disable), [delete](#delete), or jump to the breakpoint's line within the script.

<img alt="Breakpoints window in Studio" src="../assets/studio/debugging/Breakpoints-Window.png" width="720" />

While in a debugging session, the furthest left column shows **(x3)** which indicates the multiple contexts (**Client**, **Server**, **Edit**) for the breakpoint. By expanding any breakpoint's branch, you can then click the icon next to a specific context to [disable/enable](#disable) it for that context, such as disabling a breakpoint only in the **Client** context while keeping it enabled in the **Server** context.

<img alt="Breakpoint expanded to show contexts" src="../assets/studio/debugging/Breakpoints-Window-Contexts.png" width="720" />

#### Call Stack

The **Call Stack** window, accessible from Studio's **Script** tab toolbar or the **Window**&nbsp;⟩ **Debug** menu, shows which line of code is going to execute next when the debugger reaches a breakpoint. If you call functions from inside other functions, it indicates which lines those functions were called from, letting you confirm whether the actual call flow matches the expected flow.

<img src="../assets/studio/debugging/Call-Stack-Flow-Script.png" width="640" alt="Call stack flow in a script" />

<img src="../assets/studio/debugging/Call-Stack-Flow-Window.png" width="720" alt="Call stack flow in the Call Stack window" />

As the script pauses at breakpoints, use the stepping buttons in the mezzanine to step into, over, or out of a function/line as outlined in [workflow](#workflow).

<img src="../assets/studio/general/Mezzanine-Debug-Tools.png" width="800" alt="Breakpoint stepping buttons indicated in Studio's mezzanine" />

#### Watch

The **Watch** window, accessible from Studio's **Script** tab toolbar or the **Window**&nbsp;⟩ **Debug** menu, lets you actively watch variable and expression values as you step through breakpoints.

<Tabs>
<TabItem label="Variables">
The **Variables** tab shows information about the current variables in [scope](../luau/scope.md), filterable by clicking the **All&nbsp;Scopes** button in the window's upper bar. Expanding a branch shows the members of that variable or instance and their values. You can also watch any variable by double‑click highlighting it in the [Script&nbsp;Editor](./script-editor.md), right‑clicking, and selecting **Add&nbsp;Watch** from the popup menu.

<img alt="Variables to watch inside a script" src="../assets/studio/debugging/Watch-Variables-Script.png" width="760" />

<img src="../assets/studio/debugging/Watch-Variables-Window.png" width="720" alt="Variables information in the Watch window" />

</TabItem>
<TabItem label="My Watches">
The **My Watches** tab shows the value of variables or expressions that you define. To watch a specific expression, click an empty row in the **Expression** column and type the expression into it. This allows you to check any expression value without monitoring individual variables in the **Variables** tab or adding `Global.LuaGlobals.print()` statements in the script to check expression values.

<img alt="Variables to watch inside a script" src="../assets/studio/debugging/Watch-Expressions-Script.png" width="760" />

<img src="../assets/studio/debugging/Watch-Expressions-Window.png" width="720" alt="Expression entered into Watch window for analysis" />

</TabItem>
</Tabs>

#### Script Editor

The debugger is integrated with the [Script Editor](../studio/script-editor.md). When your experience pauses at a breakpoint in a script, you can hover your mouse over the name of a variable to see its value. For example, you can see the composition of a table and its contained keys/values.

<img alt="Mouseover a variable in Script Editor to show value" src="../assets/studio/debugging/Script-Editor-Mouseover-Table.png" width="640" />

## Additional debugging tools

In addition to the debugger, Studio offers additional debugging tools for you to fix problems and bugs in your experience.

### Command Bar

The [Command Bar](../studio/ui-overview.md#command-bar) allows you to run Luau commands while the experience is running. It is available in Studio from the **Window**&nbsp;⟩ **Script** menu and in the [Developer Console](../studio/developer-console.md).

### Developer Console

The [Developer Console](../studio/developer-console.md) provides a wide array of details including client and server output, memory usage, network performance, and more. To open console while testing or playing an experience, type `/console` into the chat or press <kbd>F9</kbd>.

### Log files

When a script prints or errors in Studio or the player app, the app records the message in a log file in the local file system. These files are located in different places depending on the operating system.

#### Windows

To access log files on Windows:

1. Open **File Explorer**.
2. Navigate to the `%LOCALAPPDATA%\Roblox\logs` directory.
3. Double-click a log to open it. Logs with the same `XXXXX` value are from the same Studio session.

#### Mac

To access log files on Mac:

1. Open **Finder**.
2. In the menu bar, select **Go** &rang; **Go to Folder...**.
3. In the dialog, enter `~/Library/Logs/Roblox`.
4. Double-click the result to navigate to the Roblox logs directory.
5. Inside the directory, double-click a log to open it.

#### iOS

You can collect iOS logs using a Mac or using an iOS device.

<Tabs>
  <TabItem key = "1" label="Mac">

To access iOS log files on a Mac:

1. Connect the iOS device to a Mac.
2. Open **Finder**.
3. Navigate to **Utilities** and open the **Console** application.
4. To populate real-time logs in the Console application, select the iOS device from the sidebar, click the **Start** button, and reproduce the issue on the iOS device.
5. To populate archived logs in the Console application, run `sudo log collect --device-name "[iOS Device Name]"` in the **Terminal**. Make sure there are no apostrophes in the device's name or you might get an error when running the command.

  </TabItem>
  <TabItem key = "2" label="Device">

To access iOS log files on an iOS device:

1. Press and hold both volume buttons and the top or side button on the iOS device for 1 to 1.5 seconds to start the `sysdiagnose` program. This process might take up to 10 minutes to finish.
2. Navigate to **Settings** &rang; **Privacy & Security** &rang; **Analytics & Improvements** &rang; **Analytics Data** to access the log files.
3. Tap on the a log file to open it.

  </TabItem>
</Tabs>

#### Android

To access log files on Android:

1. Navigate to **Settings** &rang; **System** &rang; **Developer options**.
2. Toggle **Developer options** on.
3. On a computer, download and install [Android Studio](https://developer.android.com/studio).
4. In Android Studio, click **Logcat**.
5. Connect the Android device to the computer to automatically populate **Logcat** with logs.
