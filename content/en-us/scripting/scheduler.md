---
title: Scheduling Code
description: Explains how to schedule code so it executes after a specific action or cycle has completed.
---

Scheduling code is useful in many situations, such as ensuring code executes after a specific action or cycle has completed, or delaying code for a specific duration of time. You can use the `Library.task` library to optimize Roblox's [Task Scheduler](../studio/microprofiler/task-scheduler.md) to manage and schedule code. You can also use a similar library called `Library.coroutine` to schedule code which has some additional functionality.

### Common Methods

The following are the most common `Library.task` methods used to schedule code. You should use the task methods over legacy scheduling methods, such as `Global.RobloxGlobals.wait()`, to ensure that your code runs optimally.

<Alert severity="warning">
Certain legacy global methods, such as (`Global.RobloxGlobals.spawn()`, `Global.RobloxGlobals.delay()`, and `Global.RobloxGlobals.wait()`) can provide similar code scheduling results but are less optimized and configurable as their `Library.task` alternatives. If your experience uses these legacy methods, you should use `Library.task` instead to ensure your experience's code remains efficient and up-to-date.
</Alert>

The following table lists the relevant legacy global methods and their preferred, more optimized counterparts:

| Legacy Global Methods                   | Task Methods                                       | Additional Alternatives                            |
| :-------------------------------------- | :------------------------------------------------- | :------------------------------------------------- |
| `wait()`                                | `Library.task.wait()`                              | `Class.RunService.Heartbeat`                       |
| `wait(n)`                               | `Library.task.wait()\|task.wait(n)`                |                                                    |
| `spawn(f)`                              | `Library.task.defer()\|task.defer(f)`              | `Library.task.delay()\|task.delay(0, f)`           |
| `delay(n, f)`                           | `Library.task.delay()\|task.delay(n, f)`           |                                                    |
| `spawn(function () f(uv1, ...) end)`    | `Library.task.defer()\|task.defer(f, uv1, ...)`    | `Library.task.delay()\|task.delay(0, f, uv1, ...)` |
| `delay(n, function () f(uv1, ...) end)` | `Library.task.delay()\|task.delay(n, f, uv1, ...)` |                                                    |

#### task.spawn

`Library.task.spawn()` takes a thread or function and resumes it **immediately** through the engine's scheduler. Additional arguments are passed to the thread or function being resumed.

The following code sample is an example of how you can use `Library.task.spawn()` when calling a function that may yield while iterating over a set of objects:

```lua
local function playerAdded(player)
    ...
    (yield)
end

for _, player in Players:GetPlayers() do
    task.spawn(playerAdded, player)
end
```

#### task.defer

`Library.task.defer()` takes a thread or function and defers it until the next [resumption cycle](https://devforum.roblox.com/t/beta-deferred-lua-event-handling) at which point it is resumed with the engine's scheduler. Additional arguments are passed to the thread or function resuming.

You should typically use this when you want similar behavior to `Library.task.spawn()` but don't care about the thread running immediately. The following code sample illustrates how the `print()` statement for `"A"` will defer until after the `print()` statement for `"B"` executes:

```lua
task.defer(print, "A")
print("B")
--> B
--> A
```

<Alert severity="info">
`Library.task.defer()` is an optimized version of `spawn()` that schedules a thread to resume as soon as possible (but not immediately) without any throttling.
</Alert>

#### task.delay

`Library.task.delay()` takes a thread or function and schedules it for resumption after the given amount of time elapses on the next `Class.RunService.Heartbeat|Heartbeat` step. The thread resumes with built-in error handling and support for other engine features. Any additional arguments are passed to the thread or function resuming.

Since the actual delay time may vary, the following code sample illustrates how you can calculate it by passing the current time as an argument:

```lua
task.delay(2, function (scheduledTime)
    print(os.clock() - scheduledTime) --> 2.038702
end, os.clock())
```

A duration of zero will result in the thread or function resuming on the next step.

<Alert severity="info">
`Library.task.delay()` is an optimized version of `delay()` that schedules a thread to resume after some time elapses without throttling.
</Alert>

#### task.wait

`Library.task.wait()` yields the current thread until the given duration (in seconds) elapses and then resumes the thread on the next `Class.RunService.Heartbeat|Heartbeat` step.

The actual yield time may vary. The following code sample illustrates how this method returns it for convenience:

Since the actual delay time may vary, the following code sample illustrates how you can get the actual time by storing the method's return value:

```lua
local elapsedTime = task.wait(2) -- wait for 2 seconds
print(elapsedTime) --> 2.0792941
```

If no duration is given the duration will default to zero meaning the thread will automatically resume on the next step. This means `Library.task.wait()` is equivalent in behavior to `Class.RunService.Heartbeat`.

<Alert severity="info">
`Library.task.wait()` is an optimized version of `wait()` that schedules the current thread to resume after some time elapses without throttling.
</Alert>
