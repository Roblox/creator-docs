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

Studio offers many debugging tools commonly found in Integrated Development Environments (IDEs). These tools help you resolve errors and inspect scripts line-by-line as they run. Debugging info is displayed in the [Watch](#watch), [Call Stack](#call-stack), [Breakpoints](#breakpoints-window), and [Output](#output) windows for you to inspect.

## General workflow

If you notice a problem in your experience or want to verify that it works as you intend, you can debug the code related to it as follows:

1. [Insert breakpoints](#insert-breakpoints) on the lines of codes that you want to examine.
2. From Studio's mezzanine, [initiate a playtest](../studio/testing-modes.md#playtesting) to begin debugging.

   <img src="../assets/studio/general/Mezzanine-Testing-Mode-Test.png" width="800" alt="Test option in the testing modes dropdown of Studio's mezzanine." />

3. When a script hits a breakpoint, the playtest session pauses. Inspect the [Watch](#watch), [Call Stack](#call-stack), and [Output](#output) windows to help you diagnose and understand the problem.
4. Insert additional breakpoints on lines of code that haven't executed yet to inspect additional data. [Disable](#disable-breakpoints) or [delete](#delete-breakpoints) breakpoints that you don't need anymore.
5. In the mezzanine, click **Stop** to end the debugging session.

   <img src="../assets/studio/general/Mezzanine-Debug-Stop.png" width="800" alt="Stop button indicated in Studio's mezzanine." />

Repeat the previous steps until you solve the problem or find its root cause. As you learn the general workflow, you can configure the breakpoints to break only if certain conditions are met, to print a message to the [Output](#output) window, and to run only on the client or server. For more information, see [Breakpoint Configurations](#breakpoint-configurations).

### Insert breakpoints

Breakpoints are checkpoints that pause or "break" the execution of your scripts at specific lines. You can use the pauses to inspect and debug your experience, [watch](#watch) variables, and inspect the [call stack](#call-stack). Breakpoints are one of the most effective ways to debug functions, so they're one of the most important debugging tools. You can insert a breakpoint at any line of executable code.

To insert a standard breakpoint at a line of code, left-click the margin to the right of its line number. You can also right-click the margin and click **Insert Breakpoint**. The breakpoint appears as a red dot. To disable it, click the dot.

<img alt="Breakpoint in gutter is a red dot" src="../assets/studio/debugging/Gutter-Breakpoint.png" width="320" />

### Step through code

If you insert a breakpoint at a line in a script, the script pauses before it executes that line. A yellow arrow called the "debugger" indicates which line of code executes next.

<img alt="Active breakpoint in the debugger shows yellow arrow" src="../assets/studio/debugging/Gutter-Breakpoint-Active.png" width="320" />

When the script pauses, execute the following code one line at a time with the buttons on the left side of Studio's mezzanine (the buttons also appear in the top-left corner of the [Call Stack](#call-stack) window). As you step through the code, monitor how your experience changes as the current line executes.

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

To continue executing your code after you hit a breakpoint, click **Resume Scripts** in the mezzanine.

<img src="../assets/studio/general/Mezzanine-Debug-Resume-Scripts.png" width="800" alt="Resume Scripts button indicated in Studio's mezzanine" />

### Inspect code

When a breakpoint pauses the experience during a playtest, you can inspect the [Watch](#watch) window, [Call Stack](#call-stack) window, [Output](#output) window, and [Script Editor](#script-editor) to find information about variable values and function executions. With this information, you can find the root cause of the problem in your experience.

#### Watch

The **Watch** window has two tabs: **Variables** and **My Watches**. The **Variables** tab shows information about the current variables in scope, and the **My Watches** tab shows the value of variables or expressions that you define. Both tabs show information before the line executes.

The **Variables** tab has the following columns:

- **Name** — The declared name of the variable.
- **Scope** — The scope of the variable: where it can be "seen" and accessed, such as **Local**, **Global**, or **Upvalue**.
- **Value** — The current value of the variable.
- **Data Type** — The data type of the variable.

The **My Watches** tab has the following columns:

- **Expression** — The expression that you want to watch.
- **Value** — The current value of the expression.
- **Data Type** — The data type of the expression.

In the **Variables** tab, you can filter the scope of variables by clicking the filter icon. You can also sort the rows by clicking the name of the column to sort by. The watch window provides both expanded and collapsed views of tables.

<img alt="Watch Window with variable values" src="../assets/studio/debugging/Watch-Window-Variables.png" width="474" />

To inspect code in the **Watch** window:

1. If the window isn't open, click the **Watch** button in Studio's **Script** tab toolbar, or select **Watch** from the **Window**&nbsp;⟩ **Debug** menu.
2. When your playtest session pauses at a breakpoint, think about how you expect the current line to change the values of variables in that script.
3. As you step through code, watch how the value of variables change in the **Variables** tab. If you want to watch an expression not in the **Variables** tab, open the **My&nbsp;Watches** tab, click an empty row in the **Expression** column, then type the expression into it. If you want to watch a variable in the [Script Editor](#script-editor), double-click the name of the variable, right-click, then click **Add&nbsp;Watch**.

   <img src="../assets/studio/debugging/Watch-Window-My-Watches.png" width="474" />

4. Compare the values of variables and expressions from what you expect and what you see in the Watch window. If there's a difference between how you expect the variables to change and how they actually change, then the variables or the functions interacting with them might be causing problems or bugs.

#### Call Stack

The **Call Stack** window shows which line of code is going to execute next when the debugger reaches a breakpoint. It indicates which line you call a function from and, if you call the function in other functions, the order of function calls and which lines you call the other functions. The top function of the call stack is the last called and first to execute. You can use the call stack to check whether the order of function calls in your scripts matches your mental model of the function calls.

<img src="../assets/studio/debugging/Call-Stack.png" width="474" alt="Call Stack in Studio" />

If you have multiple breakpoints in different scripts, they might pause the playtest session at the same time. You can jump to the breakpoints by clicking the arrow next to the name of the script in the window. If you click **Resume**, then you step over all the breakpoints that paused at the same time.

<img src="../assets/studio/debugging/Call-Stack-Multiple-Breakpoints.png" width="474" alt="Call Stack with multiple breakpoints" />

To inspect code in the **Call Stack** window during a debugging session:

1. If the window isn't open, click the **Call Stack** button in Studio's **Script** tab toolbar, or select **Call&nbsp;Stack** from the **Window**&nbsp;⟩ **Debug** menu.
2. When your experience pauses at a breakpoint, think about how you expect the order of function calls to be in that script.

   <img alt="Script Editor with two functions and one breakpoint" src="../assets/studio/debugging/Script-Editor-Breakpoint-Two-Functions.png" width="430" />

3. The call stack shows the order of function calls. If the breakpoint is inside a function, the call stack shows which function calls that function, if any. It also shows the name and line number of each function. Click the row for a function to jump to it.

   <img alt="Click in Call Stack to jump to line" src="../assets/studio/debugging/Call-Stack-Jump.png" width="474" />

4. Compare the order of function calls that you thought of in step 2 and the actual order from step 3. If there are any differences, then there's a difference between how you expect the code to behave and how it actually behaves, thereby causing potential problems and bugs.

#### Output

The [Output](./output.md) panel, accessible from Studio's **Window** menu or **Script** tab toolbar, displays errors captured from running scripts, messages from Roblox Engine, log messages, messages from calls to `print()`, and errors from calls to `warn()`.

#### Script Editor

The debugger is integrated with the [Script Editor](../studio/script-editor.md). When your experience pauses at a breakpoint in a script, you can hover your mouse over the name of a variable to see its value. For example, you can see the value of a table that you pass as an argument in a function call.

<img alt="Mouseover a variable in Script Editor to show value" src="../assets/studio/debugging/Script-Editor-Mouseover-Table.png" width="700" />

## Breakpoint configurations

You can configure breakpoints to break only if certain conditions are met, to print a message to the [Output](#output) window, and to run only on the client or server. You can also mix these configurations together to best suit your debugging needs.

### Edit breakpoints

You can edit the configuration of a breakpoint at any time, including during playtest sessions. If you edit breakpoints during a playtest session, the edits persist even after you finish it. You can also edit a breakpoint that's actively pausing your playtest session, but changes don't apply until the next playtest session.

To edit the configuration of a breakpoint:

1. Right-click the breakpoint, then click **Edit Breakpoint**.

   <img alt="Right click to edit a breakpoint in Studio" src="../assets/studio/debugging/Gutter-Right-Click-Edit-Breakpoint.png" width="320" />

2. In the **Edit Breakpoint** window, configure the breakpoint as you want.

   <img alt="Edit Breakpoint window in Studio" src="../assets/studio/debugging/Edit-Breakpoint-Window.png" width="472" />

For each breakpoint, you can set its **Condition**, **Log Message**, **Continue Execution**, and **Context**.

The **Condition** is the optional expression that determines whether the breakpoint activates. If the condition is empty, the breakpoint always activates. If the condition exists, then the breakpoint activates only if the condition is true. For example, if you want the breakpoint to activate only if the variable `n` equals `42`, then set the condition as `n == 42`. Conditions are useful for debugging how functions execute when certain variables have certain values or if you want to break only on certain executions in a loop.

The **Log Message** is the expression that prints to the [Output](#output) window when the condition is true. The format of the log message is the same as the argument for a `print()` statement. For example, set the log message as `"The value of n:", n` to print the same message as `print("The value of n:", n)`. You can add and remove log messages without having to stop the execution, unlike print statements.

The **Continue Execution** option determines whether the breakpoint pauses the script if it activates. It's useful if you want to log values of variables or expressions without stopping execution. This option is disabled by default.

The **Context** of a breakpoint determines whether the breakpoint should activate on the **Client** (client‑side scripts), **Server** (server‑side scripts), or **Edit** (debugging plugins). If you choose **Custom Context**, the window indicates the current context.

<img alt="Edit Breakpoint Window shows Custom Context" src="../assets/studio/debugging/Edit-Breakpoint-Window-Custom-Context.png" width="472" />

#### Conditional breakpoints and logpoints

Studio offers named variations of breakpoints to make breakpoint insertion faster. To insert a named variation, right-click the margin to the right of its line number, then click the variant you want to insert.

<img alt="Right click to insert a breakpoint" src="../assets/studio/debugging/Gutter-Right-Click-Insert-Breakpoint.png" width="320" />

A **conditional breakpoint** is a breakpoint with a **Condition** and **Continued Execution** disabled. Conditional breakpoints pause your script only if a condition is true, so they're useful for debugging how functions execute when certain variables have certain values. Conditional breakpoints use the values of the variables before the line executes. When you insert a conditional breakpoint, your cursor focuses on the **Condition** option for you to set quickly.

A **Logpoint** is a breakpoint with a **Log Message** and **Continued Execution** enabled. Logpoints log messages to the [Output](#output) window without pausing your scripts, so they're useful for debugging variable values. Logpoints use the values of the variables before the line executes. When you insert a logpoint, your cursor focuses on the **Log&nbsp;Message** for you to set it quickly.

### Disable breakpoints

There are several ways to disable and reenable a breakpoint:

- Click the breakpoint's icon.
- Edit the breakpoint and toggle its **Enabled** checkbox.
- Right-click the breakpoint icon and click **Disable Breakpoint** or **Enable Breakpoint**.

### Delete breakpoints

To delete a breakpoint, middle-click its icon. You can also right-click its icon and click **Delete Breakpoint**.

<Alert severity="error">
Deleting a breakpoint deletes its **Condition** and **Log Message**. If you want to keep this information for future debugging, disable the breakpoint instead.
</Alert>

### Breakpoints window

The **Breakpoints** window shows all the breakpoints in your experience. To open it, access Studio's **Window**&nbsp;⟩ **Debug** menu and toggle on **Breakpoints**.

<img alt="Breakpoints window in Studio" src="../assets/studio/debugging/Breakpoints-Window.png" width="443" />

The **Breakpoints** window has the following columns: **Script**, **Line**, **Source&nbsp;Line**, **Condition**, **Log&nbsp;Message**, and **Continue&nbsp;Execution**. The **Script** and **Line** columns always display, but you can toggle the other columns by clicking the three dots in the top-right corner of the window.

In the furthest left column, the **(x3)** label indicates the number of breakpoints on the same line of code, and the icon indicates the breakpoint configuration. The breakpoints on the same line share the same **Condition**, **Log&nbsp;Message**, and **Continue&nbsp;Execution** but vary in context. You can edit the configuration of a breakpoint in the **Breakpoints** window.

<img alt="Edit the Condition of a Breakpoint in the Breakpoints Window" src="../assets/studio/debugging/Breakpoints-Window-Edit-Condition.png" width="443" />

You can enable and disable breakpoints by clicking its breakpoint icon in the **Enabled** column. You can also click the following buttons to enable, disable, and delete some or all breakpoints.

<table>
  <thead>
    <tr>
      <th>Button</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th><img alt="Button to disable all breakpoints" src="../assets/studio/debugging/Icon-Disable-All-Breakpoints.png" width="16" /></th>
      <td>Disable all breakpoints. If any breakpoints are disabled, enable them all.</td>
    </tr>
        <tr>
      <th><img alt="Button to delete all breakpoints" src="../assets/studio/debugging/Icon-Delete-All-Breakpoints.png" width="16" /></th>
      <td>Delete all breakpoints.</td>
    </tr>
  </tbody>
</table>

### Breakpoint icons

The icon of a breakpoint depends on whether it's enabled, has a condition, and has a log message. If a breakpoint has a log message, then it appears as a logpoint regardless of whether it has a condition.

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Icon</th>
      <th>Enabled</th>
      <th>Condition</th>
      <th>Log Message</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan={2}>Breakpoint</td>
      <td>
        <img src="../assets/studio/debugging/Icon-Breakpoint-Enabled.png" width="16" />
      </td>
      <td>Yes</td>
      <td>No</td>
      <td>No</td>
    </tr>
    <tr>
      <td>
        <img src="../assets/studio/debugging/Icon-Breakpoint-Disabled.png" width="16" />
      </td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
    </tr>
    <tr>
      <td rowspan={2}>Conditional Breakpoint</td>
      <td>
        <img src="../assets/studio/debugging/Icon-Conditional-Breakpoint-Enabled.png" width="16" />
      </td>
      <td>Yes</td>
      <td>Yes</td>
      <td>No</td>
    </tr>
    <tr>
      <td>
        <img src="../assets/studio/debugging/Icon-Conditional-Breakpoint-Disabled.png" width="16" />
      </td>
      <td>No</td>
      <td>Yes</td>
      <td>No</td>
    </tr>
    <tr>
      <td rowspan={2}>Logpoint</td>
      <td>
        <img src="../assets/studio/debugging/Icon-Logpoint-Enabled.png" width="16" />
      </td>
      <td>Yes</td>
      <td>Maybe</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>
      <img src="../assets/studio/debugging/Icon-Logpoint-Disabled.png" width="16" />
      </td>
      <td>No</td>
      <td>Maybe</td>
      <td>Yes</td>
    </tr>
  </tbody>
</table>

## Additional debugging tools

In addition to the debugger, Studio offers additional debugging tools for you to fix problems and bugs in your experience.

### Command Bar

The [Command](../studio/ui-overview.md#command) bar allows you to run Luau commands while the experience is running. It is available in Studio from the **Window**&nbsp;⟩ **Script** menu and in the [Developer Console](../studio/developer-console.md).

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
