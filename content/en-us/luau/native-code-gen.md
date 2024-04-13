---
title: Native Code Generation
description: Luau Native Code Generation allows Luau code to be translated directly to CPU machine code.
---

<Alert severity="success">
This feature is currently in beta. To use it, go to **File**&nbsp;&rarr; **Beta&nbsp;Features** and enable **Luau&nbsp;Native&nbsp;Code**.
</Alert>

With Luau support for native code generation, server-side scripts in your experience can be compiled directly into the machine code instructions that CPUs execute, rather than regular bytecode that the Luau VM operates on. This feature can be used to improve execution speed for some scripts on the server, in particular those that have a lot of numerical computation without using too many heavy Luau library or Roblox API calls.

## Enabling Native

To enable native code generation for a `Class.Script`, add the <Typography noWrap>`--!native`</Typography> comment at the top:&sup1;

```lua highlight="1"
--!native

print("Hello from native code!")
```

No additional changes are required; behavior of the natively executing scripts is exactly the same as before and only the performance is different. All features of the Luau language and all Roblox APIs remain supported.

<figcaption><sup>1</sup> In the future, some scripts might automatically start running natively if it is determined to be profitable, but manually placed `--!native` comments are currently required.</figcaption>

## Best Practices

The following tips will help you benefit most from native code generation:

- It's best to enable this feature inside scripts that perform a lot of computation directly inside Luau. If you have a lot of mathematical operations on tables and especially `Library.buffer` types, the script may be a good candidate.

- Only the script's [functions](../luau/functions.md) are compiled natively. The code in the top outer [scope](../luau/scope.md) is often executed only once and doesn't benefit as much as functions that are called many times, especially those that are called every frame.

- It's recommended that you measure the time a script or an operation takes with and without the <Typography noWrap>`--!native`</Typography> comment to judge when it's best to use it. The [Script Profiler](#script-profiler) tool can measure the performance of scripts in order to make informed decisions.

- It may be tempting to place the `--!native` comment in **every** script just in case some of them will execute faster, but native code generation has some drawbacks:

  - Code compilation time is required which can increase the startup time of servers.
  - Extra memory is occupied to store natively compiled code.
  - There's a limit on the total allowed amount of natively compiled code in an experience.

## Code to Avoid

While all features will behave the same with or without native code generation enabled, some of them will not run natively and might cause de‑optimization or a fallback to interpreted execution. These include:

- Use of deprecated `Global.LuaGlobals.getfenv()`/`Global.LuaGlobals.setfenv()` calls.
- Use of various Luau built‑in functions like `Library.math.asin()` with non‑numeric arguments.
- Passing improperly typed parameters to typed functions, for example calling `foo(true)` when `foo` is declared as `function foo(arg: string)`. Remember to always use correct [type annotations](#using-type-annotations).

When using the [Script Profiler](#script-profiler), you can compare time taken by a regular version of the function versus the one compiled natively. If a function marked with <Typography noWrap>`--!native`</Typography> doesn't appear to be natively executing, one or more factors from the list above may be triggering de‑optimization.

## Using Type Annotations

Native code generation attempts to infer the most likely type for a given variable in order to optimize code paths. For example, it's assumed that <Typography noWrap>`a + b`</Typography> is performed on numbers, or that a table is accessed in `t.X`. Given operator overloading, however, `a` and `b` may be tables or `Datatype.Vector3` types, or `t` may be a Roblox datatype.

While native code generation will support any type, mispredictions may trigger unnecessary checks, resulting in slower code execution.

To solve some common issues, Luau type annotations on function arguments are checked, but it's especially recommended to annotate `Datatype.Vector3` arguments:

```lua
--!native

-- "v" is assumed to be a table; function performs slower due to table checks
local function sumComponentsSlow(v)
	return v.X + v.Y + v.Z
end

-- "v" is declared to be a Vector3; code specialized for vectors is generated
local function sumComponentsFast(v: Vector3)
	return v.X + v.Y + v.Z
end
```

## Studio Tooling

The following Studio tooling is supported for scripts with `--!native`.

### Debugging

General [debugging](../studio/debugging.md) of scripts is supported, but the views for locals/upvalues may be incomplete and missing variables from [call stack](../studio/debugging.md#call-stack-window) frames that are executing natively.

Also note that when debugging a script with `--!native`, placing [breakpoints](../studio/debugging.md#inserting-breakpoints) will disable native execution for those functions.

### Script Profiler

In the [Script Profiler](../studio/optimization/scriptprofiler.md), functions executing natively display `<native>` next to them:

<img src="../assets/studio/console/ScriptProfiler-Native-Annotation.png" width="800" alt="Example of native functions flagged in the Script Profiler" />

If the script is using `--!native` but a function doesn't show the `<native>` annotation, that function may not be executing natively due to [breakpoint](../studio/debugging.md#inserting-breakpoints) placement, use of [discouraged code](#code-to-avoid), or mismatched [type annotations](#using-type-annotations).

### Luau Heap

In the [Luau Heap](../studio/optimization/memory-usage.md#luau-heap) profiler, memory taken by native functions displays as `[native]` elements in the graph.

<img src="../assets/studio/console/LuauHeap-Native-Annotation.png" width="840" alt="Example of native memory usage flagged in the Luau Heap profiler" />

## Limits and Troubleshooting

Compiling code into instructions for a particular CPU requires additional storage memory. Additionally, optimizations for complex functions may take too much time to perform. Hitting an internal limit will report an error in Studio's [Output](../studio/output.md) window, including:

<blockquote>
_Function 'f' at line 20 exceeded single code block instruction limit_

This error means that a single block of code inside a function used more than 64K instructions. This can be avoided by simplifying the function or by splitting it into individual smaller functions.
</blockquote>

<blockquote>
_Function 'f' at line 20 exceeded function code block limit_

This error means that a single function contains more than 32K internal blocks of code. Internal blocks of code do not exactly map to the control‑flow blocks in your script, but this error can be avoided by simplifying the control‑flow in the function or by splitting it into individual smaller functions.
</blockquote>

<blockquote>
_Function 'f' at line 200 exceeded total module instruction limit_

This error means that, in total, the function has reached a limit of 1 million instructions for the entire script. In some cases, the reported function itself may have a lot of instructions, or the limit may have been reached by functions earlier in the script. To avoid this issue, it's recommended to move particularly large functions into a separate non‑native script. You can also try marking that separate script with <Typography noWrap>`--!native`</Typography>, but 1 million instructions takes up a lot of memory and you may exceed the memory limit.
</blockquote>

<blockquote>
_Function 'f' at line 20 encountered an internal lowering failure_ **(or)**<br />
_Internal error: Native code generation failed (assembly lowering)_

Sometimes a function contains complex bits of code that the native code compiler cannot currently handle. To avoid this error, inspect complex expressions in the code and split them up or simplify them, but also consider opening a bug report with an example of the code that failed for this reason.
</blockquote>

<blockquote>
_Memory allocation limit reached for native code generation_

This error means that the overall memory limit for native code data has been reached. To avoid this, try removing <Typography noWrap>`--!native`</Typography> from the more memory‑intensive scripts, allowing more smaller scripts to fit under the limit. Alternatively, move large or infrequently called functions to a separate non‑native module.
</blockquote>
