---
title: Scope
description: The scope of a variable or function is the block of code that can access it.
---

In scripting, a block of code is the body of a [control structure](./control-structures.md) or [function](./functions.md). The **scope** of a variable or function is the block of code that can access it, and it can be **global** or **local**. All blocks can access global variables and functions. A block can access local variables and functions in its parent block, but not in any of its child blocks.

Variables and functions have global scope by default, but it's almost always better to declare them with local scope because Luau accesses local variables and functions faster than global ones. To give a variable or function local scope, put the keyword `local` before its name when you declare it.

Scripts cannot access global and local variables or functions in other scripts. If you want to share values and functions between scripts, use `Class.ModuleScript|ModuleScripts`.

```lua
local helloWorld = 'Hello World!'
local function printHelloWorld ()
	print(helloWorld)
end
printHelloWorld() -- Hello World!
```

<img src="../assets/scripting/scripts/Scope-Diagram.png" width="500" />

- Block B **can** access the local variable in block A.
- Block C **can** access the local variables and functions in blocks A and B.
- Block A **cannot** access the local variables and functions in blocks B or C.
- Block B **cannot** access the local variable in block C.

## Global Scope

After you declare a global variable or function, any block of code in the same [script](../scripting/scripts.md) can access it. Variables and functions have global scope unless you declare them with the `local` keyword.

In the following code, `testVar` has global scope within the local `testFunc()` function. When Luau calls the `testFunc()`, it assigns `testVar` the value `64`. The `testVar` has global scope, so the `print()` function outside `testFunc()` can access it and print `64`.

```lua title = 'Example of global functions and variables'
local function testFunc()  -- local scope
	testVar = 64  -- global scope
end

testFunc()

print(testVar) -- 64
```

In the following code, the global variable `x` starts at `0`, increments by `1` with each iteration of the [`for` loop](./control-structures.md#for-loops), and prints again afterward with a final value of 4.

```lua
x = 0  -- Global variable "x"

for i = 1, 4 do
	x += 1
	print("Global 'x' = " .. x)
end

print("Global 'x' = " .. x)

--[[ Resulting output:
Global 'x' = 1
Global 'x' = 2
Global 'x' = 3
Global 'x' = 4
Global 'x' = 4
]]
```

It's easier to declare global variables and functions because you don't need to type as much, but global variables and functions have the following disadvantages compared to local ones:

- Luau accesses global variables and functions with a hash lookup, so it's expensive to use in terms of performance. Using a global variable in a time-critical loop can make it perform more than 10% slower than using a local variable in the same loop.
- Luau disposes of local variables after their scope ends, reducing memory usage.
- You can access global variables and functions within the same script, but not between multiple scripts. Therefore, a global variable or function doesn't provide any benefit over an in-scope local equivalent, an [upvalue](#capturing), or a [shadow](#shadowing).

## Local Scope

Luau can only access a local variable or function in the block of code where you declare it. Creating a variable with local scope gives you tighter control over when and where its value changes.

In the following code, the `testFunc()` function and `testVar` variable have local scope. Only the code within `testFunc()` can access the `testVar` variable. The `testVar` variable doesn't have a value outside `testFunc()`, so calling `print(testVar)` within `testFunc()` prints the value of `testVar`, but calling `print(testVar)` outside `testFunc()` prints `nil`.

```lua
local function testFunc()  -- local scope
	local testVar = 64  -- local scope
	print(testVar) -- 64
end

testFunc()

print(testVar) -- nil
```

In the following code, the local variable `x` has value `0` at line 1. As Luau iterates through the [`for` loop](./control-structures.md#for-loops), a different local variable `x` has value `1`. Then, Luau prints the initial variable `x` with an unchanged value `0`.

```lua
local x = 0  -- Local variable "x"

for i = 1, 4 do
	local x = 1  -- Different variable "x", local to this "for" loop
	print("Loop 'x' = " .. x)
end

print("Initial 'x' = " .. x)

--[[ Resulting output:
Loop 'x' = 1
Loop 'x' = 1
Loop 'x' = 1
Loop 'x' = 1
Initial 'x' = 0
]]
```

### Capturing

After you declare and assign a local variable, you can read it in its scope level and functions whose scopes is enclosed by the same scope containing the local variable. This technique is known as **capturing**.

In the following code, the function `f` captures the local variable `x`. The variable `x` in `f()` is an **upvalue**.

```lua
local x = 5

local function f()
	print(x)
end

f() -- 5
print(x) -- 5
```

### Shadowing

After you declare and assign a local variable, you can read it in its scope level and descendent scope levels. If you redeclare and reassign the variable in a descendent scope level, then you create a new local variable with the same name but different value from the most previous assignment. The new local variable doesn't affect the local variable from the previous assignment. This technique, known as **shadowing**, helps you reuse the name of a variable without reusing its value.

In the following code, Luau shadows the variable `x`. The variable `x` in `f()` is a **shadow** variable.

```lua
local x = 5

local function f()
	local x = 7
	print(x)
end

f() -- 7
print(x) -- 5
```

You can also redeclare a local variable without assigning a value to it so you can reassign the variable in both its scope level and descendant scope levels. Redeclaring a local variable without assigning a value to it sets its value to `nil`.

In the following code, Luau shadows the local variable `fruitName` in the function `getFruitByColor()`. The function redeclares `fruitName` as a new shadow variable and sets its value to `nil`. The function has a descendant scope level, a [`for` loop](./control-structures.md#for-loops), that assigns a value to `fruitName`. After the for loop, the function returns the `fruitName` shadow variable. Throughout the entire function, `fruitName` is the same local variable that doesn't overwrite the initial `fruitName` local variable.

```lua
local fruitName = "Chocolate"
local fruitTable = {
	Lemon = "Yellow",
	Apple = "Red",
	Orange = "Orange"
}

local function getFruitByColor(color)
	local fruitName
	for key, value in fruitTable do
		if value == color then
			fruitName = key
		end
	end
	return fruitName
end

local fruit = getFruitByColor("Yellow")
print(fruit) -- Lemon
print(fruit .. ", not " .. fruitName) -- Lemon, not Chocolate
```
