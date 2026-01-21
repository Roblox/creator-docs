---
title: Luau comments
description: Comments are text that the Luau parser ignores at runtime.
---

A **comment** is text that the Luau parser ignores at runtime.

<Alert severity="info">
Roblox Studio has a similarly-named [comments](../projects/collaboration.md#studio-comments) feature that is unrelated to code comments in Luau.
</Alert>

## Single-line comments

You can define single-line comments with a double hyphen (`--`) anywhere outside a string. Single-line comments extend to the end of the line.

Use single line comments for in-line notes. If the comment spans multiple lines, use multiple single-line comments.

You can add and remove single-line comments in the Script Editor with the keyboard shortcut <kbd>Ctrl</kbd><kbd>/</kbd> (<kbd>⌘</kbd><kbd>/</kbd>).

```lua
-- This condition is really important because the world would blow up if it
-- were missing.
if not foo then
	stopWorldFromBlowingUp()
end
```

## Block comments

You can define multiline block comments with double hyphens and double brackets (`--[[]]`). Use block comments for documenting items:

- Use a block comment at the top of files to describe their purpose.
- Use a block comment before functions or objects to describe their intent.

```lua
--[[
    Shuts off the cosmic moon ray immediately.

    Should only be called within 15 minutes of midnight Mountain Standard
    Time, or the cosmic moon ray may be damaged.
]]
local function stopCosmicMoonRay()
end
```

If necessary, you can nest multiple brackets inside a block comment using the same number of equal signs in both the beginning and ending bracket:

```lua
--[=[
    In-depth detail about cosmic moon ray: [[[TOP SECRET]]]
]=]
```

## Comment directives

Luau uses comments that start with `!` to control features like [type checking](type-checking.md), [native code generation](native-code-gen.md), and [linting](https://luau.org/lint).

```lua
--!strict
--!nonstrict
--!nocheck
--!native
--!nolint
--!optimize 0|1|2
```

For linting, Roblox Studio enables the following subset of warning codes from the [Luau linter](https://luau.org/lint): 1, 2, 3, 6, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28.

The `--!optimize` directive controls the optimization level of the Luau compiler for the script:

- 0 disables optimizations.
- 1 enables basic optimizations (default in Studio testing).
- 2 enables further optimizations (default in live experiences).

Exact optimizations aren't published and are subject to change. We recommend using the default values unless you have a specific reason not to.

## To-do comments

Roblox Studio supports special `TODO` comments. Studio bolds any text following `TODO` (until broken by a space):

```lua
-- TODO: Finish the function below so that it actually does what its name implies.
local function stopWorldFromBlowingUp()
end
```

Use `TODO` comments to keep track of and communicate issues within your code.
