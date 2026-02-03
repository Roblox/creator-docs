---
title: Native code generation
description: Luau Native Code Generation allows Luau code to be translated directly to CPU machine code.
---

With Luau support for native code generation, server-side scripts in your experience can be compiled directly into the machine code instructions that CPUs execute, rather than regular bytecode that the Luau VM operates on. This feature can be used to improve execution speed for some scripts on the server, in particular those that have a lot of numerical computation without using too many heavy Luau library or Roblox API calls.

<iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/llR_pNlJDQw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

## Enable native code generation

To enable native code generation for a `Class.Script`, add the <Typography noWrap>`--!native`</Typography> comment at the top:&sup1;

```lua highlight="1"
--!native

print("Hello from native code!")
```

This enables native code generation for all functions in the script, and the top-level scope, if deemed profitable. No additional changes are required; behavior of the natively executing scripts is exactly the same as before and only the performance is different. All features of the Luau language and all Roblox APIs remain supported.

Alternatively, you can enable native code generation for an individual function by adding the `@native` attribute:

```lua highlight="1"
@native
local function f(x)
  return (x + 1)
end
```

<figcaption><sup>1</sup> In the future, some scripts might automatically start running natively if it is determined to be profitable, but manually placed `--!native` comments are currently required.</figcaption>

## Best practices

The following tips will help you benefit most from native code generation:

- It's best to enable this feature inside scripts that perform a lot of computation directly inside Luau. If you have a lot of mathematical operations on tables and especially `Library.buffer` types, the script may be a good candidate.

- Only the script's [functions](../luau/functions.md) are compiled natively. The code in the top outer [scope](../luau/scope.md) is often executed only once and doesn't benefit as much as functions that are called many times, especially those that are called every frame.

- It's recommended that you measure the time a script or a function takes with and without native compilation to judge when it's best to use it. The [Script Profiler](#script-profiler) tool can measure the performance of functions in order to make informed decisions.

- It may be tempting to place the `--!native` comment in **every** script just in case some of them will execute faster, but native code generation has some drawbacks:

  - Code compilation time is required which can increase the startup time of servers.
  - Extra memory is occupied to store natively compiled code.
  - There's a limit on the total allowed amount of natively compiled code in an experience.

These problems can be addressed by a judicious use of the `@native` attribute.

## Code to avoid

While all features will behave the same with or without native code generation enabled, some of them will not run natively and might cause de‑optimization or a fallback to interpreted execution. These include:

- Use of deprecated `Global.LuaGlobals.getfenv()`/`Global.LuaGlobals.setfenv()` calls.
- Use of various Luau built‑in functions like `Library.math.asin()` with non‑numeric arguments.
- Passing improperly typed parameters to typed functions, for example calling `foo(true)` when `foo` is declared as `function foo(arg: string)`. Remember to always use correct [type annotations](#use-type-annotations).

When using the [Script Profiler](#script-profiler), you can compare time taken by a regular version of the function versus the one compiled natively. If a function inside a <Typography noWrap>`--!native`</Typography> script or marked with `@native` doesn't appear to be natively executing, one or more factors from the list above may be triggering de‑optimization.

## Use type annotations

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

## Studio tooling

The following Studio tooling is supported for <Typography noWrap>`--!native`</Typography> scripts and `@native` functions.

### Debugging

General [debugging](../studio/debugging.md) of scripts is supported, but the views for locals/upvalues may be incomplete and missing variables from [call stack](../studio/debugging.md#call-stack-window) frames that are executing natively.

Also note that when debugging code selected for native compilation, placing [breakpoints](../studio/debugging.md#insert-breakpoints) will disable native execution for those functions.

### Script Profiler

In the [Script Profiler](../studio/optimization/scriptprofiler.md), functions executing natively display `<native>` next to them:

<img src="../assets/studio/console/ScriptProfiler-Native-Annotation.png" width="800" alt="Example of native functions flagged in the Script Profiler" />

If a function marked `@native` or inside a <Typography noWrap>`--!native`</Typography> script doesn't show the `<native>` annotation, that function may not be executing natively due to [breakpoint](../studio/debugging.md#insert-breakpoints) placement, use of [discouraged code](#code-to-avoid), or mismatched [type annotations](#use-type-annotations).

### Luau heap

In the [Luau heap](../studio/optimization/memory-usage.md#luau-heap) profiler, memory taken by native functions displays as `[native]` elements in the graph.

<img src="../assets/studio/console/LuauHeap-Native-Annotation.png" width="840" alt="Example of native memory usage flagged in the Luau Heap profiler" />

### Size analysis

Every natively-compiled script consumes memory. When the size of compiled code reaches a predefined limit, native compilation stops and the remaining code is run non‑natively. This makes it essential to choose scripts carefully for native compilation.

To monitor the native code size of individual functions and scripts:

1. Make sure you're in **Server** view through the [client/server toggle](../studio/testing-modes.md#toggle-clientserver) button.
2. Invoke `debug.dumpcodesize()` from the [Command Bar](../studio/ui-overview.md#command-bar).

In the [Output](../studio/output.md) window, you'll see the total number of scripts and functions that have been natively compiled up to the point of invocation, the memory consumed by their native code, and the native code size limit. Following the summary, you'll see a table for every natively‑compiled script in descending order of code size.

<img src="../assets/studio/debugging/Native-Code-Size-Analysis.png" width="850" alt="Example of native code size displayed in the Output window."/>

For each script, the output displays the number of functions compiled and the native code memory consumption. Each function is then listed in descending order of native code size, with anonymous functions shown as `[anonymous]` and entire scripts shown as `[top level]`. In the final column, the percentage is computed with respect to the native code size limit. Note that native code size of functions is reported precisely but the memory consumption for scripts is rounded up to the nearest page size.

## Limits and troubleshooting

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

This error means that, in total, the function has reached a limit of 1 million instructions for the entire script. In some cases, the reported function itself may have a lot of instructions, or the limit may have been reached by functions earlier in the script. To avoid this issue, it's recommended to either move particularly large functions into a separate non‑native script or use `@native` on the other functions. You can also try marking that separate script with <Typography noWrap>`--!native`</Typography>, but 1 million instructions takes up a lot of memory and you may exceed the memory limit.
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
