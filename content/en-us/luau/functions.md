---
title: Functions
description: Functions are blocks of code that can execute multiple times on command.
---

**Functions** are [blocks of code](./scope.md) that you can execute multiple times on command. You can also connect them to [events](#event-handlers) or assign them as [callbacks](#callbacks).

## Basic Functions

A function definition includes:

- The [scope](./scope.md) of the function (global or `local`).
- The `function` keyword.
- The name of the function in `camelCase`.
- The parameters of the function in parentheses (`()`).
- The block of code, or "body", of the function.
- The `end` keyword.

The body of the function executes when you call the function. To call a function, type its name followed by parentheses. You can define a variable to accept the return value or use the return value in place of a variable.

```lua
-- This function has no parameters and returns nil
local function addOneAndTwo()
	local result = 1 + 2
	print(result)
end
-- Calling a function without a return
addOneAndTwo() -- 3
```

### Parameters

Parameters are variables that you make available to the function and are only used in the function's [scope](./scope.md). Functions have no parameters by default. If you call a function with more parameters than it expects, Luau ignores the extra parameters. If you call a function with fewer parameters than it expects, Luau passes `nil` for all missing parameters.

```lua
-- This function has two parameters: num1 and num2
local function addNumbers(num1, num2)
	print(num1 + num2)
end

addNumbers(2, 3) -- 5
addNumbers(5, 6, 7) -- 11
addNumbers(9) -- attempt to perform arithmetic (add) on number and nil
```

### Return

In the body of the function, the `return` keyword returns a result from a computation. You can return multiple values from one function. `return` ends function execution, and Luau expects the `end` keyword to follow the `return` statements, so writing code between the `return` command and the `end` command throws an error.

```lua
-- This function returns one return value
local function addNumbers(num1, num2)
	local result = num1 + num2
	return result
end

print(addNumbers(1, 2)) -- 3
local seven = addNumbers(3, 4)
print(seven) -- 7

-- This function returns multiple values: sum and difference
local function addAndSubtract(num1, num2)
	local sum = num1 + num2
	local difference = num1 - num2
	return sum, difference
end

-- Calling a function and expecting multiple return values
local sum, difference = addAndSubtract(2, 3)
print(sum) -- 5
print(difference) -- -1
```

## Methods

Methods are functions that are members of an object, such as a [class](/reference/engine/classes) or [table](./tables.md). They expect the object itself (`self`) as the first argument. When you call a method, use the colon notation (`:`) instead of dot notation (`.`) to pass `self` as the first argument automatically.

All objects in Roblox descend from `Class.Instance` and have commonly used methods including `Class.Instance:Destroy()`, `Class.Instance:Clone()`, and `Class.Instance:FindFirstChild()`.

```lua
-- Destroying a Part with dot notation (function)
local firstPart = Instance.new("Part")
firstPart.Parent = workspace
print(firstPart.Parent) -- Workspace
firstPart.Destroy(firstPart)
print(firstPart.Parent) -- nil

-- Destroying a Part with colon notation (method)
local secondPart = Instance.new("Part")
secondPart.Parent = workspace
print(secondPart.Parent) -- Workspace
secondPart:Destroy()
print(secondPart.Parent) -- nil
```

### Defining Methods

To create a method in a table, use the name of the method as the key and the method function as the value. In the definition of the method, the `self` parameter refers to the method's parent table. When you call a method using colon notation, you pass the table itself as the first argument. You can define parameters for a method, but you need to list them after the `self` parameter.

In the following example, the `testButton` table has a method as the value of the `changeEnabled` key. You can verify that `self` refers to the method's parent table by printing the value of `self.enabled`.

```lua
local testButton = {
	enabled = true,
	changeEnabled = function(self, isEnabled)
		self.enabled = isEnabled
		print(self.enabled)
	end
}

print(testButton.enabled) -- true
-- Call the method
testButton:changeEnabled(false) -- false
```

## Callbacks

Callbacks are functions that execute in response to another function or process. Some `Global.RobloxGlobals` functions, such as `delay()` and `spawn()`, take callbacks as parameters. In the Roblox Studio API, callbacks are write-only members of some classes. Unlike [event handlers](#event-handlers), callbacks yield until they return. Widely used callbacks include:

- `Class.MarketplaceService.ProcessReceipt`, which handles developer products purchases.
- `Class.BindableFunction.OnInvoke`, which calls the function when a script calls `BindableFunction:Invoke(...)`.
- `Class.RemoteFunction.OnClientInvoke`, which calls the function when the server calls `RemoteFunction:FireClient(player, ...)` or `RemoteFunction:FireAllClients(...)`.
- `Class.RemoteFunction.OnServerInvoke`, which calls the function when a client calls `RemoteFunction:InvokeServer(...)`.

### Setting Callbacks

To set a callback, assign a function to it. For example, `Class.BindableFunction.OnInvoke` is a callback of `Class.BindableFunction`. You can set a named or [anonymous](#anonymous-functions) function to it, and you can call (**invoke**) that function by calling the `:Invoke()` method on the callback. The arguments you pass to `:Invoke()` forward to the callback, and the return value from the callback function returns to the caller of `:Invoke()`.

```lua
local bindableFunction = Instance.new("BindableFunction")

bindableFunction.OnInvoke = function(number)
	return 2 * number
end

print(bindableFunction:Invoke(42)) -- 84
```

## Function Techniques

### Event Handlers

You can assign a function, known as an **event handler**, to execute when an event fires. For example, you can create a function called `onPlayerAdded()` to the `Class.Players.PlayerAdded` event to print the name of whatever player joins. For more information, see [Built-In Events](../scripting/events/built-in.md).

```lua
local Players = game:GetService("Players")

local function onPlayerAdded(player)
	print(player.Name .. " joined the game!")
end

Players.PlayerAdded:Connect(onPlayerAdded)
```

### Anonymous Functions

You can create functions without names, known as **anonymous functions**, to use as [callbacks](#callbacks) and [event handlers](#event-handlers). Like named functions, anonymous functions need to start and end with the `function` and `end` keywords, but you don't need the `local` keyword to indicate local scope because they always have local scope.

In the following example, the callback for the `Library.task.delay()` function and the event handler for the `Class.Players.PlayerAdded` event are both anonymous functions.

```lua
-- Anonymous function in a callback to task.delay()
task.delay(2, function(exactTimeElapsed)
	print(exactTimeElapsed) -- 2.0064592329945
end)

-- Anonymous function in an event handler
local Players = game:GetService("Players")
Players.PlayerAdded:Connect(function(player)
	print(player.Name .. " joined the game!")
end)
```

### Functions in ModuleScripts

You can reuse functions across multiple scripts by storing them in `Class.ModuleScript|ModuleScripts`. Functions are a Luau data type, so you can store them in tables with other data.

### Variadic Functions

A variadic function accepts any number of arguments. For example, `print()` is a variadic function.

```lua
print(2, "+", 2, "=", 2+2) --2 + 2 = 4
print( string.format("The %s is a %s!", "cake", "lie") ) -- The cake is a lie!
print( string.byte(115, 101, 99, 114, 101, 116) ) -- secret
```

#### Defining Variadic Functions

To define a variadic function, you use the `...` token as the last or only parameter (not to be confused with `..`, the concatenation [operator](./operators.md)). You can put the `...` values in a table for ease of use.

```lua
local function variadic(named, ...)
    local arguments = {...} -- pack the extra arguments into a table
    print("Named argument = ", named)
    for i, value in arguments do
        print("Input No. ", i, "=", value)
    end
end

variadic(10, "Hi", 20, "Variadic Function")
--[[ Resulting output:
Named argument = 10
Input No. 1 = Hi
Input No. 2 = 20
Input No. 3 = Variadic Function
]]
```

#### Argument Forwarding

You can define variadic functions as wrappers around other functions to pass, or forward, arguments from the wrapper to the other functions.

```lua
local function printAround(functionToPrintAround, ...)
    print("Before")
    functionToPrintAround(...)
    print("After")
end

local function addNumbers(x, y, z)
    print("x =", x)
    print("y + z =", y + z)
end

printAround(addNumbers, 1, 2, 3)
--[[ Resulting output:
Before
x = 1
y + z = 5
After
]]
```

#### Calling a Variadic Function with Arrays

If you want to pass a table array of values to a global variadic function, such as `print()`, you can use the global `unpack()` function to pass the values of the table instead of the table itself.

```lua
local squares = {1, 4, 9, 16, 25}
print( "The first 5 square numbers are:", unpack(squares) )
-- The first 5 square numbers are 1 4 9 16 25
```
