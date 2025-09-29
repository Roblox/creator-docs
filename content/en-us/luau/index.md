---
title: Luau
description: Luau is the scripting language creators use in Roblox Studio.
---

[Luau](https://luau.org) is the scripting language creators use in Roblox Studio. It is a fast, small, safe, gradually typed embeddable scripting language derived from [Lua 5.1](https://www.lua.org/manual/5.1/).

<Alert severity="success">
Contributing your Luau scripts for AI training can help enhance Luau-focused AI tools in Studio. For more information, see [Empower Luau creation](https://create.roblox.com/data-collection).
</Alert>

## Support in Studio

The **Script Editor** in Studio supports Luau with autocompletion, syntax highlighting, static linting, type checking, and script analysis. It also shows documentation and function signatures for members of the [Roblox Engine API](/reference/engine).

## Types

Luau includes the following data types:

- [Nil](nil.md) represents non-existence or nothingness. It's different from any other value or data type.
- [Booleans](booleans.md), or `bool`, have a value of either `false` or `true`.
- [Numbers](numbers.md), or `double`, represent double-precision (64-bit) floating-point numbers.
- [Strings](strings.md) are sequences of characters, such as letters, numbers, and symbols.
- [Tables](tables.md) are [arrays](tables.md#arrays) or [dictionaries](tables.md#dictionaries) of any value except `nil`.
- [Enums](enums.md) are fixed lists of items.

Luau is dynamically typed by default. Variables, function parameters, and return values can be any data type. This helps you write code faster because you don't need to provide types for each piece of data. You can still declare explicit types for variables in Luau and enable [strict type checking](type-checking.md) to make type issues obvious and easy to locate.

## Data structures

You can also implement the following data structures using primitive data types:

- [Stacks](stacks.md) are Last-In-First-Out collections of items that you can implement using tables.
- [Queues](queues.md) are First-In-First-Out collections of items that you can implement using tables.
- [Metatables](metatables.md) are tables with advanced configurations that can achieve functionalities such as storing pairs of keys and values and calculating arithmetic operations.

## Features

In Luau, [variables](variables.md) and [functions](functions.md) can have global and local [scope](scope.md) within a script. Luau has logical, relational, and compound assignment [operators](operators.md). You can use [control structures](control-structures.md) and [functions](functions.md) to control when Luau executes code. Many operators and variable assignments perform [type coercion](type-coercion.md) to change values to the types that Luau expects.
