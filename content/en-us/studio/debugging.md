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

Studio offers many debugging tools commonly found in Integrated Development Environments (IDEs). These tools help you resolve errors and inspect scripts line-by-line as they run. Debugging info is displayed in the **Watch**, **Call Stack**, **Breakpoints**, and [Output](../studio/output.md) windows for you to inspect.

## General Workflow

If you notice a problem in your experience or want to verify that it works as you intend, you can debug the code related to it as follows:

1. [Insert breakpoints](#inserting-breakpoints) on the lines of codes that you want to examine.
2. In the [Script](../studio/script-tab.md) tab, click **Play** or **Run** in the test tab to start a playtest session, also known as a debugging session.

   <img alt="Script tab playtest options" src="../assets/studio/general/Script-Tab-Playtest-Options.png" width="772" alt="Playtest options in Script tab" />

3. When a script hits a breakpoint, the playtest session pauses. Step through the code. Inspect the **Watch**, **Call Stack**, and **Output** windows to help you diagnose and understand the problem.
4. Insert additional breakpoints on lines of code that haven't executed yet to inspect additional data. [Disable](#disabling-breakpoints) or [delete](#deleting-breakpoints) breakpoints that you don't need anymore.
5. In the **Script** tab, click **Stop** to end the debugging session.

Repeat the previous steps until you solve the problem or find its root cause. As you learn the general workflow, you can configure the breakpoints to break only if certain conditions are met, to print a message to the **Output** window, and to run only on the client or server. For more information, see [Breakpoint Configurations](#breakpoint-configurations).

### Inserting Breakpoints

Breakpoints are checkpoints that pause or "break" the execution of your scripts at specific lines. You can use the pauses to inspect and debug your experience, [watch](#watch-window) variables, and inspect the [call stack](#call-stack-window). Breakpoints are one of the most effective ways to debug functions, so they're one of the most important debugging tools. You can insert a breakpoint at any line of executable code.

To insert a standard breakpoint at a line of code, left-click the margin to the right of its line number. You can also right-click the margin and click Insert Breakpoint. The breakpoint appears as a red dot. To disable it, click the dot.

<img alt="Breakpoint in gutter is a red dot" src="../assets/studio/debugging/Gutter-Breakpoint.png" width="320px" />

### Stepping Through Code

If you insert a breakpoint at a line in a script, the script pauses before it executes that line. A yellow arrow called the "debugger" indicates which line of code executes next.

<img alt="Active breakpoint in the debugger shows yellow arrow" src="../assets/studio/debugging/Gutter-Breakpoint-Active.png" width="320px" />

When the script pauses, execute the following code one line at a time by stepping through them with the buttons in the [Script](../studio/script-tab.md) tab. The buttons also appear in the top-left corner of the [Call Stack](#call-stack-window) window. As you step through the code, monitor how your experience changes as the current line executes.

<img src="../assets/studio/general/Script-Tab-Debugging-Tools.png" width="888" alt="Debugging tools indicated in Script tab"/>

The following table summarizes the three ways to step through code. To continue executing your code after you hit a breakpoint, click **Resume** in the **Script** tab.

<table>
  <thead>
    <tr>
      <th>Button</th>
      <th>Action</th>
      <th>Shortcut</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th><img alt="Button to step into a line of code" src="../assets/studio/debugging/Debugger-Step-In-Icon.png" width="60%" /></th>
      <td>**Step Into**</td>
      <td><kbd>F11</kbd></td>
      <td>The **Step Into** button moves the debugger into the code of the function on the current line. If there is no function on the current line, the debugger moves to the next line.</td>
    </tr>
    <tr>
      <th><img alt="Button to step over a line of code" src="../assets/studio/debugging/Debugger-Step-Over-Icon.png" width="60%" /></th>
      <td>**Step Over**</td>
      <td><kbd>F10</kbd></td>
      <td>The **Step Over** button moves the debugger to the next line of code, **not** moving into functions.</td>
    </tr>
    <tr>
      <th><img alt="Button to step out of a line of code" src="../assets/studio/debugging/Debugger-Step-Out-Icon.png" /></th>
      <td>**Step Out**</td>
      <td><kbd>Shift</kbd><kbd>F11</kbd></td>
      <td>The **Step Out** button moves the debugger out of the current function and to the next line of code after the function call. If the current line isn't inside a function, the debugger moves to the next line.</td>
    </tr>
  </tbody>
</table>

### Inspecting Code

When a breakpoint pauses the experience during a playtest, you can inspect the [Watch](#watch-window) window, [Call Stack](#call-stack-window) window, [Output](#output-window) window, and [Script Editor](#script-editor) to find information about variable values and function executions. With this information, you can find the root cause of the problem in your experience.

#### Watch Window

The **Watch** window has two tabs: **Variables** and **My Watches**. The **Variables** tab shows information about the current variables in scope, and the **My Watches** tab shows the value of variables or expressions that you define. Both tabs show information before the line executes.

The **Variables** tab has the following columns:

- Name – The declared name of the variable.
- Scope – The scope of the variable: where it can be "seen" and accessed, such as Local, Global, or Upvalue.
- Value – The current value of the variable.
- Data Type – The data type of the variable.

The **My Watches** tab has the following columns:

- Expression – The expression that you want to watch.
- Value – The current value of the expression.
- Data Type – The data type of the expression.

In the **Variables** tab, you can filter the scope of variables by clicking the filter icon. You can also sort the rows by clicking the name of the column to sort by. The watch window provides both expanded and collapsed views of tables.

<img alt="Watch Window with variable values" src="../assets/studio/debugging/Watch-Window-Variables.png" width="474px" />

To inspect code in the Watch window:

1. If the **Watch** window isn't open, then click **Watch** in the [View](../studio/view-tab.md) tab.
2. When your playtest session pauses at a breakpoint, think about how you expect the current line to change the values of variables in that script.
3. As you step through code, watch how the value of variables change in the **Variables** tab. If you want to watch an expression not in the Variables tab, open the **My Watches** tab. Click an empty row in the Expression column, then type the expression into it. If you want to watch a variable in the Script Editor, double-click the name of the variable, right-click, then click **Add Watch**.

   <img src="../assets/studio/debugging/Watch-Window-My-Watches.png" width="474px" />

4. Compare the values of variables and expressions from what you expect and what you see in the Watch window. If there's a difference between how you expect the variables to change and how they actually change, then the variables or the functions interacting with them might be causing problems or bugs.

#### Call Stack Window

The **Call Stack** window shows which line of code is going to execute next when the debugger reaches a breakpoint. The Call Stack indicates which line you call a function from and, if you call the function in other functions, the order of function calls and which lines you call the other functions. The top function of the Call Stack is the last called and first to execute. You can use the Call Stack to check whether the order of function calls in your scripts matches your mental model of the function calls.

<img alt="Call Stack in Studio" src="../assets/studio/debugging/Call-Stack.png" width="474px" />

If you have multiple breakpoints in different scripts, they might pause the playtest session at the same time. You can jump to the breakpoints by clicking the arrow next to the name of the script in the Call Stack window. If you click **Resume**, then you step over all the breakpoints that paused at the same time.

<img alt="Call Stack with multiple breakpoints" src="../assets/studio/debugging/Call-Stack-Multiple-Breakpoints.png" width="474px" />

To inspect code in the Call Stack window during a debugging session:

1. If the **Call Stack** window isn't open, then click **Call Stack** in the [View](../studio/view-tab.md) tab.
2. When your experience pauses at a breakpoint, think about how you expect the order of function calls to be in that script.

   <img alt="Script Editor with two functions and one breakpoint" src="../assets/studio/debugging/Script-Editor-Breakpoint-Two-Functions.png" width="430px" />

3. The Call Stack shows the order of function calls. If the breakpoint is inside a function, the Call Stack shows which function calls that function, if any. The Call Stack also shows the name and line number of each function. Click the row for a function to jump to it.

   <img alt="Click in Call Stack to jump to line" src="../assets/studio/debugging/Call-Stack-Jump.png" width="474px" />

4. Compare the order of function calls that you thought of in step 2 and the actual order from step 3. If there are any differences, then there's a difference between how you expect the code to behave and how it actually behaves, thereby causing potential problems and bugs.

#### Output window

The [Output](./output.md) window, accessible from the [View](./view-tab.md) tab, displays errors captured from running scripts, messages from Roblox Engine, log messages, messages from calls to `print()`, and errors from calls to `warn()`.

#### Script Editor

The Debugger is integrated with the [Script Editor](../studio/script-editor.md). When your experience pauses at a breakpoint in a script, you can hover your mouse over the name of a variable to see its value. For example, you can see the value of a table that you pass as an argument in a function call.

<img alt="Mouseover a variable in Script Editor to show value" src="../assets/studio/debugging/Script-Editor-Mouseover-Table.png" width="700px" />

## Breakpoint Configurations

You can configure breakpoints to break only if certain conditions are met, to print a message to the Output window, and to run only on the client or server. You can also mix these configurations together to best suit your debugging needs.

### Editing Breakpoints

You can edit the configuration of a breakpoint at any time, including during playtest sessions. If you edit breakpoints during a playtest session, the edits persist even after you finish it. You can also edit a breakpoint that's actively pausing your playtest session, but changes don't apply until the next playtest session.

To edit the configuration of a breakpoint:

1. Right-click the breakpoint, then click **Edit Breakpoint**.

   <img alt="Right click to edit a breakpoint in Studio" src="../assets/studio/debugging/Gutter-Right-Click-Edit-Breakpoint.png" width="320px" />

2. In the **Edit Breakpoint** window, configure the breakpoint as you want.

   <img alt="Edit Breakpoint window in Studio" src="../assets/studio/debugging/Edit-Breakpoint-Window.png" width="472px" />

#### Condition, Log Message, and Options

For each breakpoint, you can set its **Condition**, **Log Message**, **Continue Execution**, and **Context**.

The **Condition** is the expression that determines whether the breakpoint activates. The Condition is optional. If the Condition is empty, the breakpoint always activates. If the Condition exists, then the breakpoint activates only if the condition is true. For example, if you want the breakpoint to activate only if the variable `n` equals `42`, then set the Condition as `n == 42`. Conditions are useful for debugging how functions execute when certain variables have certain values or if you want to break only on certain executions in a loop.

The **Log Message** is the expression that prints to the Output window when the condition is true. The format of the Log Message is the same as the argument for a `print()` statement. For example, set the Log Message as `"The value of n:", n` to print the same message as `print("The value of n:", n)`. You can add and remove Log Messages without having to stop the execution, unlike print statements.

The **Continue Execution** option determines whether the breakpoint pauses the script if it activates. It's useful if you want to log values of variables or expressions without stopping execution. This option is disabled by default.

The **Context** of a breakpoint determines whether the breakpoint should activate on the Client, Server, or Edit. If the context is Client, then the breakpoint triggers in client-side scripts. If the context is Server, then the breakpoint triggers in server-side scripts. If the context is Edit, then the breakpoint triggers when you debug plugins. If you click Custom Context, the window indicates the current context.

<img alt="Edit Breakpoint Window shows Custom Context" src="../assets/studio/debugging/Edit-Breakpoint-Window-Custom-Context.png" width="472px" />

#### Conditional Breakpoints and Logpoints

Studio offers named variations of breakpoints to make breakpoint insertion faster. To insert a named variation, right-click the margin to the right of its line number, then click the variant you want to insert.

<img alt="Right click to insert a breakpoint" src="../assets/studio/debugging/Gutter-Right-Click-Insert-Breakpoint.png" width="320px" />

A **Conditional Breakpoint** is a breakpoint with a **Condition** and **Continued Execution** disabled. Conditional Breakpoints pause your script only if a condition is true, so they're useful for debugging how functions execute when certain variables have certain values. Conditional Breakpoints use the values of the variables before the line executes. When you insert a Conditional Breakpoint, your cursor focuses on the **Condition** option for you to set quickly.

A **Logpoint** is a breakpoint with a **Log Message** and **Continued Execution** enabled. Logpoints log messages to the Output window without pausing your scripts, so they're useful for debugging variable values. Logpoints use the values of the variables before the line executes. When you insert a Logpoint, your cursor focuses on the **Log Message** for you to set it quickly.

Logpoints are often more efficient for debugging variables than `print()` statements because they allow you to log messages to the Output window without having to stop or restart the active playtest session. Compared to `print()` statements, they keep your code clean while debugging and are easier to remove after you finish debugging.

### Disabling Breakpoints

There are many ways to disable and reenable a breakpoint:

- Click the breakpoint's icon.
- Edit the breakpoint and toggle its Enabled checkbox.
- Right-click the breakpoint icon and click Disable Breakpoint or Enable Breakpoint.

### Deleting Breakpoints

To delete a breakpoint, middle-click its icon. You can also right-click its icon and click **Delete Breakpoint**.

<Alert severity="error">
Deleting a breakpoint deletes its Condition and Log Message. If you want to keep the Condition or Log Message for future debugging, disable the breakpoint instead.
</Alert>

### Breakpoints Window

The Breakpoints window shows all the breakpoints in your experience. To open the Breakpoints window, click the View tab at the top of Studio, then click Breakpoints.

<img alt="Breakpoints window in Studio" src="../assets/studio/debugging/Breakpoints-Window.png" width="443px" />

The Breakpoints window has the following columns: unlabeled, Script, Line, Source Line, Condition, Log Message, and Continue Execution. The unlabeled, Script, and Line columns always display, but you can toggle the other columns by clicking the three dots in the top-right corner of the window.

In the unlabeled column, the (x3) label indicates the number of breakpoints on the same line of code, and the icon indicates the breakpoint configuration. The breakpoints on the same line share the same Condition, Log Message, and Continue Execution but vary in context. You can edit the configuration of a breakpoint in the Breakpoints window. For example, you can edit the Condition of a breakpoint by editing the textarea in its Condition column.

<img alt="Edit the Condition of a Breakpoint in the Breakpoints Window" src="../assets/studio/debugging/Breakpoints-Window-Edit-Condition.png" width="443px" />

You can enable and disable breakpoints by clicking its breakpoint icon in the Enabled column. You can also click the following buttons to enable, disable, and delete some or all breakpoints.

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

### Breakpoint Icons

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
        <img src="../assets/studio/debugging/Icon-Breakpoint-Enabled.png" />
      </td>
      <td>Yes</td>
      <td>No</td>
      <td>No</td>
    </tr>
    <tr>
      <td>
        <img src="../assets/studio/debugging/Icon-Breakpoint-Disabled.png" />
      </td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
    </tr>
    <tr>
      <td rowspan={2}>Conditional Breakpoint</td>
      <td>
        <img src="../assets/studio/debugging/Icon-Conditional-Breakpoint-Enabled.png" />
      </td>
      <td>Yes</td>
      <td>Yes</td>
      <td>No</td>
    </tr>
    <tr>
      <td>
        <img src="../assets/studio/debugging/Icon-Conditional-Breakpoint-Disabled.png" />
      </td>
      <td>No</td>
      <td>Yes</td>
      <td>No</td>
    </tr>
    <tr>
      <td rowspan={2}>Logpoint</td>
      <td>
        <img src="../assets/studio/debugging/Icon-Logpoint-Enabled.png" />
      </td>
      <td>Yes</td>
      <td>Maybe</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>
      <img src="../assets/studio/debugging/Icon-Logpoint-Disabled.png" />
      </td>
      <td>No</td>
      <td>Maybe</td>
      <td>Yes</td>
    </tr>
  </tbody>
</table>

## Additional Debugging Tools

In addition to the debugger, Studio offers additional debugging tools for you to fix problems and bugs in your experience.

### Command Bar

The **Command Bar** allows you to run Luau commands while the experience is running. It is available in Studio from the **View** tab and in the [Developer Console](../studio/developer-console.md).

### Developer Console

The **Developer Console** provides a wide array of details including client and server output, memory usage, network performance, and more. To open the Developer Console while testing or playing an experience, type `/console` into the chat or press <kbd>F9</kbd>. For more information, see [Developer Console](../studio/developer-console.md).

### Log Files

When a script prints or errors in Studio or the Player app, the app records the message in a log file in the local file system. These files are located in different places depending on the operating system:

- On Windows, logs are in the directory `%LOCALAPPDATA%\Roblox\logs`. Sort the folder by date modified. The names of log files start with the format `log_XXXXX`. Logs with the same `XXXXX` value are from the same Studio session.
- On Mac, logs are in the directory `~/Library/Logs/Roblox`. In the Finder, click the **Go** menu, select **Go to Folder**, type in that directory, and confirm.
