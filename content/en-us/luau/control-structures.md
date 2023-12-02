---
title: Control Structures
description: Control structures are statements that manage the flow of Luau code execution.
---

Control structures are statements that manage the flow of Luau code execution. There are four main types of control structures:

- An [if then else](#if-statements) statement executes code only if a specified condition is `true`. The code execution doesn't repeat.
- A [while loop](#while-loops) executes code only if a specified condition is `true`, and repeats execution while the condition remains `true`.
- A [repeat loop](#repeat-loops) executes code, and repeats execution if the condition is `true`.
- A [for loop](#for-loops) executes code a set number of times depending on specified inputs.

The condition for `if` statements, `while` loops, and `repeat` loops can be any Luau expression or value. If a value isn't `false` or `nil`, then Luau evaluates it as `true` in conditional statements. Unlike other scripting languages, Luau considers both zero and the empty string as `true`.

## If Statements

The basic `if` statement tests its condition. If the condition is true, then Luau executes the code between `then` and `end`.

You can use an `elseif` statement to test for additional conditions if the `if` condition is false. You can use an `else` statement to execute code if all `if` and `elseif` conditions fail. The `elseif` and `else` parts are both optional, but you can't use either without an initial `if` statement.

In a chain of `if`, `elseif`, and `else` conditions, Luau tests conditions from top to bottom, stops at the first `true` condition, and executes the code that follows it.

```lua
if 2 + 2 == 5 then
	print("Two plus two is five") -- Doesn't print because the condition is false
elseif 2 + 3 == 5 then
	print("Two plus three is five") -- Two plus three is five
else
	print("All conditions failed") -- Doesn't print because the previous condition is true
end
```

## While Loops

A `while`—`do` loop evaluates if a specified condition is true or false. If the condition is `false` or `nil`, then the loop ends, and Luau skips the code in the loop. If the condition is `true`, then Luau executes the code in the loop and repeats the process.

```lua
local timeRemaining = 10

while timeRemaining > 0 do
	print("Seconds remaining: " .. timeRemaining)
	task.wait(1)
	timeRemaining -= 1
end

print("Timer reached zero!")
--[[ Resulting output:
Seconds remaining: 10
Seconds remaining: 9
Seconds remaining: 8
Seconds remaining: 7
Seconds remaining: 6
Seconds remaining: 5
Seconds remaining: 4
Seconds remaining: 3
Seconds remaining: 2
Seconds remaining: 1
Timer reached zero!
]]
```

### Infinite Loops

You can use a `while`—`do` loop to write infinite game loops by setting `true` as the condition.

```lua
while true do
	print("Looping...")
	task.wait(0.5)
end

--[[ Resulting output:
Looping...
Looping...
Looping...
Looping...
...
]]
```

<Alert severity="error">
Always include a delay such as <InlineCode>task.wait()</InlineCode> in an infinite loop. Omitting it freezes the experience and crashes Studio.
</Alert>

## Repeat Loops

The `repeat`—`until` loop repeats until a condition is true. The conditional test evaluates **after** the code block runs, so the code block always runs at least once. Unlike other languages, the Luau scope of a local variable declared inside a `repeat`—`until` loop includes the condition.

```lua
local currentGoblinCount = 18

-- Spawn goblins up to a maximum of 25 in the game
repeat
	spawnGoblin()
	currentGoblinCount += 1
	print("Current goblin count: " .. currentGoblinCount)
until currentGoblinCount == 25

print("Goblins repopulated!")

--[[ Resulting output:
Current goblin count: 19
Current goblin count: 20
Current goblin count: 21
Current goblin count: 22
Current goblin count: 23
Current goblin count: 24
Current goblin count: 25
Goblins repopulated!
]]
```

## For Loops

A for loop executes code a set number of times, either based on a [numerical counter](#numeric-for-loops) or the number of [items in a collection](#generic-for-loops).

### Numeric For Loops

A `for`—`do` loop determines the number of times to execute the loop using a counter. The loop is declared with a start value, end value, and optional increment.

Luau sets the counter equal to the start value, executes the code block in the `for` loop, then adds the increment to the counter. If the increment is positive, then the process repeats until the counter is equal to or greater than the end value. If the increment is negative, then the process repeats until the counter is equal to or less than the end value.

The optional increment defaults to `1`. It doesn't need to be a whole number.

```lua
for counter = 1, 3 do
	print(counter)
end

--[[ Resulting output:
1
2
3
]]

for counter = 1, 6, 2 do
	print(counter)
end

--[[ Resulting output:
1
3
5
]]

for counter = 2, 0, -0.5 do
	print(counter)
end

--[[ Resulting output:
2
1.5
1
0.5
0
]]
```

### Generic For Loops

The generic `for` loop iterates over items in a collection rather than a sequence of numbers. With generic `for` loops, you can execute code for each item in the collection, and can easily use each item in the code.

For loops need a function, or iterator, to iterate over different types of collections. The global `ipairs()` returns an iterator for arrays, and the global `pairs()` returns an iterator for dictionaries. The `Library.string` library provides `Library.string.gmatch()` to iterate over strings.

### Generalized Iteration

In Luau, you can iterate over a table using the `in` keyword directly on the table, instead of using an iterator function such as `ipairs()`:

```lua
for i, v in {1, 2, 3, 4, 5} do
	print(i, v)
end
```

Generalized iteration also lets you use the `__iter` metamethod to create a custom iterator function. This contrived example iterates over an array in reverse order, from its last element to its first:

```lua
local myTable = {1, 2, 3, 4, 5}

myMetatable = {
	__iter = function(self)
		local i = #self
		local firstRun = true
		return function()
			if firstRun then
				firstRun = false
				return i, self[i]
			else
				i -= 1
				if i > 0 then
					return i, self[i]
				end
			end
		end
	end
}

setmetatable(myTable, myMetatable)

for i, v in myTable do
	print(i, v)
end
```

#### Arrays

The `ipairs()` function returns an iterator that iterates through numerical indices in a table and returns an `index` and `value` for each element. This makes it appropriate for arrays, where all indices are numeric.

```lua
local array = {"a", "b", "c", "d", "e"}
for index, value in ipairs(array) do
    print(index, value)
end

--[[ Resulting output:
1 a
2 b
3 c
4 d
5 e
]]
```

#### Dictionaries

The `pairs()` function returns an iterator that iterates through all indices (including numerical indices) in a table and returns a `key` and `value` for each entry in the dictionary. The order of traversing elements in a dictionary table is arbitrary. This makes it appropriate for iterating over dictionaries, where items are stored out of order with non-numeric indices.

```lua
local dictionary = {
	[1] = "a";
	["Hello"]="b";
	[5] = "c";
[true] = "d";
	["World"] = "f";
[false] = "e";
}
for key, value in pairs(dictionary) do
    print(key, value)
end

--[[ Resulting output:
Hello b
true d
false e
World f
5 c
1 a
]]
```

### Breaking Loops

To force a loop to end, use the `break` command. The following code sample shows how to break an infinite `while`—`do` loop.

```lua
local secondsElapsed = 0
local timeout = 5

while true do
	task.wait(1)
	secondsElapsed += 1
	print("Seconds elapsed:", secondsElapsed)

	if secondsElapsed == timeout then
		break
	end
end

print("Five seconds elapsed. Time to move on!")

--[[ Resulting output:
1
2
3
4
5
Five seconds elapsed. Time to move on!
]]
```
