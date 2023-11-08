---
title: Thread
description: Thread is a datatype that represents a controllable chunk of running code
---

`thread` is a datatype that represents a controllable chunk of running code, it can be obtained from a running thread using `Library.coroutine.running()` or obtained from a few `Library.task` methods.

`thread` can then be used in several `Library.coroutine` and `Library.task` library methods, to control the flow of parallel code.

<Alert severity="info">
For more information on how to create and control parallel code, see `Library.coroutine`
</Alert>

```lua title="Using threads"
local runningCoroutine = coroutine.running()

local parallelCoroutine = task.spawn(function()
	print(coroutine.status(runningCoroutine)) --> normal
	print("Hello World!", task.wait(5)) --> prints Hello World!, 1
end)

print(coroutine.status(parallelCoroutine)) --> suspended

coroutine.resume(parallelCoroutine, task.wait(1)) --> this will resume the thread early even though we told it to wait 5 seconds
```