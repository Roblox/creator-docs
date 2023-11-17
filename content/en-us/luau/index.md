---
title: Luau
description: Luau is the scripting language creators use in Roblox Studio.
---

[Luau](https://luau-lang.org) is the scripting language creators use in Roblox Studio. It is a fast, small, safe, gradually typed embeddable scripting language derived from [Lua 5.1](https://www.lua.org/manual/5.1/). Use Luau in scripts to make your experience dynamic and interactive. For a comparison of language features in Luau and C#, see [Luau and C# Comparison](../luau/luau-csharp-comparison.md).

<Alert severity="success">
Contribute your Luau scripts for AI training can help enhance Luau-focused AI tools in Studio. For more information, see [Empower Luau creation](https://create.roblox.com/data-collection).
</Alert>

## Support in Studio

The Script Editor in Studio supports Luau with autocompletion, syntax highlighting, static linting, type checking, and script analysis. It also shows documentation and function signatures for members of the [Roblox Engine API](/reference/engine).

## Types

Luau includes the following data types:

- `nil` represents non-existence or nothingness. It's different from any other value or data type.
- [Booleans](../luau/booleans.md), or `bool`, have a value of either `false` or `true`.
- [Numbers](../luau/numbers.md), or `double`, represent double-precision (64-bit) floating-point numbers.
- [Strings](../luau/strings.md) are sequences of characters, such as letters, numbers, and symbols.
- [Tables](../luau/tables.md) are [arrays](../luau/tables.md#arrays) or [dictionaries](../luau/tables.md#dictionaries) of any value except `nil`.
- [Enums](../luau/enums.md) are fixed lists of items.

Luau is dynamically typed by default. Variables, function parameters, and return values can be any data type. This helps you write code faster because you don't need to provide types for each piece of data. You can still declare explicit types for variables in Luau and enable [strict type checking](https://luau-lang.org/typecheck) to make type issues obvious and easy to locate.

## Data Structures

You can also implement the following data structures using primitive data types:

- [Stacks](../luau/stacks.md) are Last-In-First-Out collections of items that you can implement using tables.
- [Queues](../luau/queues.md) are First-In-First-Out collections of items that you can implement using tables.
- [Metatables](../luau/metatables.md) are tables with advanced configurations that can achieve functionalities such as storing pairs of keys and values and calculating arithmetic operations.

## Features

In Luau, [variables](../luau/variables.md) and [functions](../luau/functions.md) can have global and local [scope](../luau/scope.md) within a script. Luau has logical, relational, and compound assignment [operators](../luau/operators.md). You can use [control structures](../luau/control-structures.md) and [functions](../luau/functions.md) to control when Luau executes code. Many operators and variable assignments perform [type coercion](../luau/type-coercion.md) to change values to the types that Luau expects.
