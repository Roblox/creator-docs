---
title: Variables
description: A name that holds a value.
---

A **variable** is a name that holds a value. Variable values can be [numbers](./numbers.md), [strings](./strings.md), [booleans](./booleans.md), [data types](/reference/engine/datatypes), and more.

## Name variables

Variable names can be any non-reserved string of letters, digits, and underscores that don't start with a digit.

```lua
LETTERS   -- valid
a1        -- valid
var_name  -- valid
_test     -- valid

if        -- NOT valid
25th      -- NOT valid
```

Variable names are **case-sensitive**, so `TestVar` and `TESTVAR` are different names. Avoid naming variables with an underscore and all uppercase letters, such as `_VERSION`, because Luau may reserve them for internal global variables.

### Best practices

It's best practice to spell out words fully. Abbreviations generally make code easier to write, but harder to read. Following common naming practices when naming your variables can help you and others understand their meaning or purpose:

- Use `PascalCase` names for class and enum-like objects.
- Use `PascalCase` names for all Roblox APIs. `camelCase` APIs are mostly deprecated.
- Use `camelCase` names for local variables, member values, and [functions](./functions.md).
- Use `LOUD_SNAKE_CASE` names for local constants (variables with values that you don't expect to [change](#change-values)).
- Don't capitalize entire acronyms within names. For example, write `aJsonVariable` or `MakeHttpCall`.

### Reserved names

Luau reserves the following keywords, so you can't use them to name variables or [functions](./functions.md):

- `and`
- `for`
- `or`
- `break`
- `function`
- `repeat`
- `do`
- `if`
- `return`
- `else`
- `in`
- `then`
- `elseif`
- `local`
- `true`
- `end`
- `nil`
- `until`
- `false`
- `not`
- `while`

## Assign values

To create a variable and assign a value to it, use the `=` operator. Put the variable on the left of the `=` and the value on the right. If you don't put a value, the value is `nil`.

Variables can have **global** or **local** [scopes](./scope.md). They have global scope by default, but it's almost always better to create them with local scope because Luau accesses local variables faster than global ones. To give a variable local scope, put the keyword `local` before a variable's name when you assign a value to it. For more information on Scope in Luau, see [Scope](./scope.md).

```lua
local nilVar
local x = 10
local word = "Hello"
local boolean = true

print(nilVar) -- nil
print(x) -- 10
print(word) -- Hello
print(boolean) -- true
```

### Assign values to multiple variables

You can assign values to multiple variables in one line by separating each variable-value pair with a comma. If you have more variables than values, then Luau assigns `nil` to the extra variables. If you have more values than variables, Luau doesn't assign the extra values to any variables.

```lua
local a, b, c = 1, 2, 3
local d, e, f = 4, 5 -- extra variable
local g, h = 7, 8, 9 -- extra value

print(a, b, c) -- 1, 2, 3
print(d, e, f) -- 4, 5, nil
print(g, h) -- 7, 8
```

## Change values

To change a value of a variable, assign another value to it.

```lua
local x, y = 10, 20
print(x) -- 10
print(y) -- 20

local x = 1000
local y = 2000
print(x) -- 1000
print(y) -- 2000
```
