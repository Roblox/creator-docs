---
title: Scripting
description: An introduction to scripting in Roblox with the Luau programming language.
---

Scripts are plain text files that let you add custom, dynamic behavior to your experiences. You can use scripts to trigger in-game events, respond to player input, save player data, create leaderboards, spawn enemies, control NPC behavior, and much, much more.

<Alert severity="success">
This section is for creators with some coding experience who want to know the specifics of scripting in Roblox.

If you've never written code before and want an introduction to programming, see [Coding fundamentals](../tutorials/fundamentals/coding-1/coding-fundamentals.md), which covers concepts like variables, functions, conditionals, loops, and arrays. For a more guided, step-by-step approach, see the [Basic gameplay](../tutorials/use-case-tutorials/scripting/basic-scripting/intro-to-scripting.md) tutorial.
</Alert>

## Luau

Roblox scripts use the [Luau](https://luau.org) programming language, which is derived from [Lua 5.1](https://www.lua.org/manual/5.1/).

- Compared to Lua 5.1, Luau adds performance enhancements and many useful features, including an optional typing system, string interpolation, and generalized iteration for tables.
- All valid Lua 5.1 code is valid Luau code, but the opposite is not true.

Most books and online resources for Lua are still broadly applicable to Luau. For a detailed summary of differences, see [Compatibility](https://luau.org/compatibility) in the Luau documentation. For language syntax, see the [Luau reference](../luau/index.md).

### Luau basics

Luau is gradually typed, so you don't need to specify a type when you create a variable. You can use `Global.LuaGlobals.type()` to check object type:

```lua
logMessage = "User has more than 10 items!"
print(logMessage) --> User has more than 10 items!
print(type(logMessage)) --> string
```

Luau has global and local [scopes](../luau/scope.md), but it's almost always better to declare variables and functions locally with the `local` keyword:

```lua
local logMessage = "User has more than 10 items!"
local function printMessage()
	print(logMessage)
end
printMessage() --> User has more than 10 items!
```

Luau uses `nil` to represent nonexistence or nothingness, which evaluates as `false` in conditional statements:

```lua
local messageToUser
print(messageToUser) --> nil
print(type(message)) --> nil
if messageToUser then
	-- statement evaluates to false
end
```

As you might have noticed, `--` starts a one-line comment. `--[[]]` creates a block comment:

```lua
--[[
    Shuts off the cosmic moon ray immediately.

    Should only be called within 15 minutes of midnight Mountain Standard
    Time to avoid damage to the cosmic moon ray.
]]
local function stopCosmicMoonRay()
	-- add this later, it might prove important
end
```

[Tables](../luau/tables.md) are the generic term for arrays and dictionaries. Arrays are one-based rather than zero-based, so the first item is `[1]`. You declare arrays and dictionaries with a single set of curly braces:

```lua
local myArray = {"chips", "sparkling water", "salsa"}
local myDictionary = {
	snack = "chips",
	drink = "sparkling water",
	dip = "salsa"
}
print(myArray[1]) --> chips
print(myDictionary.dip) --> salsa
```

You can iterate over tables using `for` loops with the `Global.LuaGlobals.ipairs()` function for arrays and the `Global.LuaGlobals.pairs()` function for dictionaries, but Luau also lets you omit these functions for cleaner syntax:

```lua
for index, value in ipairs(myArray) do -- standard Lua
	print(index, value)
end
for key, value in pairs(myDictionary) do -- standard Lua
	print(key, value)
end
for key, value in myDictionary do -- Luau generalized iteration
	print(key, value)
end
```

## Your first script

1. In Roblox Studio, hover over **ServerScriptService** in the [Explorer](../studio/explorer.md) window and click **+**.
1. Select **Script** to add a new script.
1. Right-click the script and rename it to `HelloScript`.
1. Double-click the script to open it in the [Script Editor](../studio/script-editor.md).
1. Add the following code to the file:

   ```lua
   local helloArray = {"h", "e", "l", "l", "o"}
   local worldArray = {"w", "o", "r", "l", "d"}

   for index, value in helloArray do
   	print(value)
   end

   print(table.concat(worldArray))
   ```

1. Ensure that the [Output](../studio/output.md) window is open.
1. [Initiate a playtest](../studio/testing-modes.md#playtesting) to run your experience and note the output:

   ```text
   h
   e
   l (x2)
   o
   world
   ```

## Get comfortable

A big part of adapting to a new development environment is configuring it to meet your needs and understanding the tools at your disposal:

- The **Script Editor** section of [Studio Settings](../studio/setup.md#customization) lets you adjust quality of life features like font, colors, indentation, autocomplete, brackets, and tooltips. You might also want to enable dark mode in the **Studio** section.
- Holding <kbd>Ctrl</kbd> or <kbd>Command</kbd> and clicking on a function or variable takes you to its declaration in your codebase (or its online documentation). Using [Find and Find All](../studio/script-editor.md#find-and-replace) can help you navigate larger projects.
- The [Output](../studio/output.md) window is the most basic tool for understanding the behavior of your scripts. Use the **&#x22EF;** menu to enable **Show Context** and **Show Source**.
- The [Script Analysis](../studio/script-editor.md#script-analysis) window shows a summary of errors and warnings, but you might find its utility limited; the Script Editor already highlights these issues as you type.
- Logging capabilities are minimal, with no concept of log levels like `DEBUG` or `FATAL`. Use `Global.LuaGlobals.print()` and `Global.RobloxGlobals.warn()`.

For more information about configuring Studio for scripting, see [Script Editor](../studio/script-editor.md).

<Alert severity="success">
To use your favorite text editor and version control system rather than the built-in editor, see [Script Sync](./sync.md).
</Alert>

## Your second script

1. In Roblox Studio, add a script to **ReplicatedStorage** in the [Explorer](../studio/explorer.md) window and rename it to `OhNo`.
1. Add the following code to the file:

   ```lua
   print("Hello script types and locations!")
   ```

1. [Initiate a playtest](../studio/testing-modes.md#playtesting) to run your experience.
1. Note how the output is no different than when you ran [your first script](#your-first-script).

To understand why the script didn't run, see [Script Types and Locations](./locations.md).
