---
title: Luau Native Code Generation
description: Luau Native Code Generation allows Luau code to be translated directly to CPU machine code.
---

<Alert severity="info">
This feature is available as a Beta in Roblox Studio.

Enable 'Luau Native Code' in the Beta Features list.
</Alert>

With Luau support for Native Code Generation, server-side scripts in your experience can be compiled directly into the machine code instructions that CPUs execute, rather than regular bytecode that Luau VM operates on.

This feature can be used to improve execution speed for some of the scripts on the server, in particular, those that have a lot of numerical computation without using too many heavy Luau library or Roblox API calls.

## Enabling the feature

To enable the feature, simply add `--!native` comment at the top of your script.

![Native code annotation example](../assets/scripting/scripts/native-hello-world.png)

No additional changes are required, behavior of the natively executing scripts is exactly the same as before, only the performance is different.

All features of the Luau language and all Roblox APIs remain supported.

The annotation is currently required because there isn't a good mechanism for automatically determining if compiling a given function is profitable at this time.
In the future, some scripts might start running natively automatically if it is determined to be profitable, but for now, manually placed `--!native` comments are required.

## Best practices with Native Code Generation

It is best to enable this feature inside scripts that perform a lot of computation directly inside Luau.

If you have a lot of mathematical operations or operations on tables and especially buffer types, the script might be a good candidate.

Note that only the functions are compiled natively, the code in the top outer scope is often executed only once and doesn't benefit as much as functions that are called many times, especially those that are called every frame.

We recommend measuring the time a script or an operation takes with and without the `--!native` comment to judge when it's best to use it.

Don't forget to use the new Luau Script Profiler tool to measure the performance of the scripts in the experience and make informed decisions.

---

There might be a desire to place this comment in each script just in case some of them will start executing faster, but there are downsides that come with this feature.

Main ones are the compilation time required, which can increase the startup time of your server and the other one is the memory that will be used to store natively compiled code.

There is also a limit on the total amount of natively compiled code in the experience. This limit might be increased in the future based on the usage of Native Code Generation.

## Code to avoid when using Native Code Generation

While all features will behave the same with or without Native Code Generation enabled, some of them will not be run natively and might cause de-optimization or a fall back to interpreted execution to complete.

Things to look out for:

- Use of deprecated `getfenv`/`setfenv` calls
- Use of various Luau library built-in functions like `math.abs` with non-numeric arguments
- Passing improperly typed parameters to typed functions (for example, calling `foo(true)` when foo is declared as `function foo(arg: string)`)

When using Luau Script Profiler, it is possible to see when time is taken by a regular version of the function, or the one compiled natively.
If a function in a script marked with `--!native` doesn't appear to be natively executing, it could mean that one or more things from the list above are happening and causing de-optimization.

## Using type annotations to improve code generation

Native code generation attempts to infer what is the most likely type for a given variable to optimize code paths.
For example, in `a + b` it is assumed that operation is performed on numbers since it's the most likely case and in `t.X`, a table access is assumed.
Of course, with operator overloading, `a` and `b` can be tables or a Vector3 and `t` could be a Roblox datatype.

While native code generation will support any type, these type mispredictions might cause unnecessary checks to be performed and slower code paths to execute.

To solve some of the issues, Luau type annotations on function arguments are checked. In the future, type annotations on locals will also be taken into account.
It is especially recommended to annotate Vector3 type arguments.

```lua
--!native

local function sumComponentsSlow(v)
    -- 'v' is assumed to be a table, will perform slower because table checks are performed
    return v.X + v.Y + v.Z
end

local function sumComponentsFast(v: Vector3)
    -- 'v' is assumed to be a Vector3, code specialized on vectors is generated
    return v.X + v.Y + v.Z
end
```

This is an area of code generation that will improve over time for both manual type annotations and types inferred from the way locals are used.

## Tooling

### Debugger

Debugging scripts with `--!native` is supported with certain limitations.

Placing breakpoints will disable native execution for those functions.

The views for locals/upvalues might be incomplete and missing variables from call stack frames that are executing natively.

### Script Profiler

In the script profiler, functions that are executing natively will have `<native>` displayed next to them.

![Example of native functions in Script Profiler](../assets/scripting/scripts/native-profiler-annotations.png)

If the script is using `--!native`, but the function in the profiler doesn't have the annotation present, it could mean that function is not executing natively.

That could be caused by reasons described earlier:

- breakpoints are placed for debugging
- features are used that cause an exit to VM to support
- type annotations do not match the types of the actual variables

### Native code memory tooling

In the Luau Heap profiler, memory taken by native functions is displayed as `[native]` elements in the graph.

![Example of native functions in Luau Heap](../assets/scripting/scripts/native-luau-heap-memory.png)

## Resource limits and troubleshooting

Compiling code into instructions for a particular CPU requires additional memory to store that code.

Additional optimizations that are performed on the code compiled natively can take too much time to perform on complex functions, so those functions might get skipped.

Hitting any of these limits will report an error in Roblox Studio output.

These are some of the errors that you might encounter:

`Function 'f' at line 20 exceeded single code block instruction limit`

This means that a single block of code inside a function used more than 64 K instructions.
This can be avoided by simplifying the function in question or by splitting it into individual, smaller functions.

`Function 'f' at line 20 exceeded function code block limit`

This means that a single function contains more than 32 K internal blocks of code. Internal blocks are code do not exactly map to the control-flow blocks in your code, but the solution is the same - simplifying the control-flow in the function or splitting the function into smaller parts.

`Function 'f' at line 2400 exceeded total module instruction limit`

This means that in total, the function has reached a limit or 1 million instructions for the whole script.
In some cases, the reported function itself can have a lot of instructions, but in other cases, the limit might have been used up by the functions earlier in the script.
To solve the issue it is recommended to move particularly large functions into a separate non-native script.
You can try marking the separate script with `--!native` as well, but keep in mind that 1 million instructions takes up a lot of memory and might hit the memory limit we have in place.

`Function 'f' at line 20 encountered an internal lowering failure`
or
`Internal error: Native code generation failed (assembly lowering)`

Sometimes a function can have complex bits of code that the native code compiler cannot currently handle.
As usual, try looking at complex expressions in the code to split them up or simplify, but also consider opening a bug report with an example of code that failed with this reason.

`Memory allocation limit reached for native code generation`

This error means that an overall memory limit for native code data has been reached.
This limit is not as strict as some of the earlier ones that were mentioned and will likely be increased in the future.
As a work-around, try removing `--!native` from the largest scripts you have to allow more smaller ones to fit into the limit. Alternatively, move large, less  often called functions to a separate non-native module.

Luau Heap memory tools can be used to check which native functions use a lot of memory. Look for the `[native]` items in the Graph to find out to which functions the data belongs to.

If the scripts do not appear particularly large to hit such a limit or if the limit is too small to deliver best performance for your experience, consider opening a bug report.
