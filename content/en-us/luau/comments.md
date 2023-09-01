---
title: Comments
description: Comments are text that the Luau parser ignores at runtime.
---

A **comment** is text that the Luau parser ignores at runtime.

## Single-line Comments

You can define single-line comments with a double hyphen (`--`) anywhere outside a string. Single-line comments extend to the end of the line.

Use single line comments for in-line notes. If the comment spans multiple lines, use multiple single-line comments.

You can add and remove single-line comments in the Script Editor with the keyboard shortcut <kbd>Ctrl/Cmd</kbd> + <kbd>/</kbd>.

```lua
-- This condition is really important because the world would blow up if it
-- were missing.
if not foo then
    stopWorldFromBlowingUp()
end
```

## Block Comments

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

If necessary, you can nest multiple brackets inside a block comment using the same quantity of equals sign in both the beginning and the ending bracket.

The example below uses one equals sign (can be more than one)

```lua
--[=[
     In-depth detail about cosmic moon ray: [[[TOP SECRET]]]
]=]
```