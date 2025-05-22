---
title: Tables
description: Data type which can store multiple values of any non-nil type, including booleans, numbers, strings, functions, and other tables.
---

The **table** data type can store multiple values of any type that isn't `nil`, including [booleans](./booleans.md), [numbers](./numbers.md), [strings](./strings.md), [functions](./functions.md), and other tables. Construct tables with curly braces (`{}`):

```lua
-- Construct an empty table assigned to variable "t"
local t = {}
print(t) -- {}
```

You can use a table as an [array](#arrays) or [dictionary](#dictionaries). Arrays use an ordered list of numbers as indices, but dictionaries can have numbers, strings, and objects as indices.

For more information on built-in functions for working with tables, see the `Library.table` library.

## Arrays

An **array** is an ordered list of values. Arrays are useful for storing collections of data, such as a group of players with special permissions.

### Create arrays

To create an array using a Luau table, declare the values in sequential order, separated by commas.

```lua
-- Construct an array with three items
local testArray = {"A string", 3.14159, true}
print(testArray)
```

### Read from arrays

To read from an array, add a pair of square brackets after its reference and specify the index number of the element inside (`[pos]`):

```lua
-- Construct an array with three items
local testArray = {"A string", 3.14159, true}

print(testArray[1]) -- A string
print(testArray[2]) -- 3.14159
print(testArray[3]) -- true
```

<Alert severity="warning">
Unlike some languages, Luau uses 1-based indexing for arrays, so the first item in the array is `[1]`, not `[0]`.
</Alert>

### Write to arrays

To define or rewrite the value of an array at an index, declare the index number in square brackets (`[index]`) followed by `=` and the value:

```lua
local testArray = {"A string", 3.14159, true}

testArray[2] = 12345
testArray[4] = "New string"

print(testArray[2]) --12345
print(testArray[4]) -- New string
```

### Iterate over arrays

To iterate over an array, you can use a `for` loop. Because the arrays have numerical indices, you can also use a numeric `for` loop from `1` to the length of the array (`#array`).

```lua
local testArray = {"A string", 3.14159, true, "New string"}

-- Loop using general iteration
for index, value in testArray do
	print(index, value)
end

-- Iterate using the array length operator (#)
for index = 1, #testArray do
	print(index, testArray[index])
end
```

### Insert items

There are two built-in ways to insert an item to the **end** of an array:

- Pass a reference to the array and the item value to Luau's `Library.table.insert()` function.
- Add the new item to the array using the `array[#array+1]` syntax.

```lua
local testArray = {"A string", 3.14159}

table.insert(testArray, "New string")
testArray[#testArray+1] = "Another new string"

print(testArray[3]) -- New string
print(testArray[4]) -- Another new string
```

To insert an item between the start and end of an array, include a position value as the second argument of `Library.table.insert()`. This inserts the new item and pushes the following items up one index position.

```lua
local testArray = {"First item", "Next item"}

table.insert(testArray, 2, "NEW ITEM #2")

print(testArray[1]) -- First item
print(testArray[2]) -- NEW ITEM #2
print(testArray[3]) -- Next item
```

### Remove items

To remove an item from an array, use `Library.table.remove()`. This removes the item at the specified position and moves any following items back one index position.

```lua
local testArray = {"First item", "Next item", "Last item"}

table.remove(testArray, 2)

print(testArray[1]) -- First item
print(testArray[2]) -- Last item
```

## Dictionaries

Dictionaries are an extension of arrays. Dictionaries store a set of key-value pairs, where the keys can be any number, string, or object.

### Create dictionaries

To create a dictionary table, define each **key** followed by `=` and the **value**. Separate each key-value pair with a comma:

```lua
local testDictionary = {
	fruitName = "Lemon",
	fruitColor = "Yellow",
	sour = true
}
```

The keys for dictionaries can be numbers, strings, and objects. For example, a key may also be an `Class.Instance`. To use objects as keys, declare the key in square brackets (`[key]`):

```lua
local part = Instance.new("Part")

local testDictionary = {
	partType = "Block",
	[part] = true
}
```

### Read from dictionaries

To read from a dictionary, add a pair of brackets after its reference and specify the key name. Directly reference a string key using either (`["key"]`) or (`.key`), or instead use a variable value (`[key]`).

```lua
local part = Instance.new("Part")

local testDictionary = {
	partType = "Block",
	[part] = true
}
-- Include quotes for string keys
print(testDictionary["partType"]) -- Block
-- Or use . to index string keys without spaces
print(testDictionary.partType) -- Block
-- Omit quotes for non-string keys
print(testDictionary[part]) -- true
```

### Write to dictionaries

To define or rewrite the value of a new or existing dictionary key, declare the key name in brackets (`[key]`) or, if the key is a string, use (`.key`) followed by `=` and the value:

```lua
local testDictionary = {
	fruitName = "Lemon",
	sour = true
}

-- Change value of existing keys
testDictionary["fruitName"] = "Cherry"
testDictionary.sour = false

-- Insert new key-value pair
testDictionary.fruitCount = 10

print(testDictionary.fruitName) -- Cherry
print(testDictionary.sour) -- false
print(testDictionary.fruitCount) -- 10
```

### Iterate over dictionaries

To iterate over a dictionary, use a `for` loop:

```lua
local testDictionary = {
	fruitName = "Lemon",
	fruitColor = "Yellow",
	sour = true
}

for key, value in testDictionary do
	print(key, value)
end

--[[ Resulting output:
fruitName Lemon
sour true
fruitColor Yellow
]]
```

### Remove key-value pairs

To remove or erase a key-value pair from a dictionary, set its value for a key to `nil`.

```lua
local testDictionary = {
	fruitName = "Lemon",
	fruitColor = "Yellow",
	sour = true
}

testDictionary.sour = nil

for key, value in testDictionary do
	print(key, value)
end
--[[ Resulting output:
fruitName Lemon
fruitColor Yellow
]]
```

## Tables as references

If you store a table in a new variable, Luau doesn't create a copy of that table. Instead, the variable becomes a **reference**, or pointer, to the original table. Any reference to a table reflects any changes to the original table:

```lua
local originalArray = {10, 20}

local arrayReference = originalArray

print("Original:", originalArray[1], originalArray[2])
print("Reference:", arrayReference[1], arrayReference[2])

-- Change values in original array
originalArray[1] = 1000
originalArray[2] = 2000

print("Reference:", arrayReference[1], arrayReference[2])

--[[ Resulting output:
Original: 10 20
Reference: 10 20
Reference: 1000 2000
]]
```

## Clone tables

### Shallow clones

To copy a table without any nested tables, Luau offers the `Library.table.clone()` method.

```lua
local original = {
	key = "value",
	engine = "Roblox",
	playerID = 505306092
}

local clone = table.clone(original)
```

### Deep clones

To copy a more complex table with nested tables inside it, you'll need to use a recursive function similar to the following:

```lua
-- The function used for deep cloning a table
local function deepClone(original)
	-- Define the new table for the copy
	local clone = table.clone(original) 

	-- Loop through the original table to check for table values
	-- If a table is found as a value, deep clone it to the key (index)
	for key, value in original do
		if type(value) == "table" then
			clone[key] = deepClone(value)
		end
	end

	-- Return the finalized copy of the deep cloned table
	return clone
end
```

With the function in place, you can make a deep copy as follows:

```lua
local original = {
	key = "value",
	playerInfo = {
		playerID = 505306092,
		playerName = "PlayerName"
	},
	otherInfo = {
		{
			{1, 3, 5, 7, 9}
		}
	}
}

local clone = deepClone(original)
```

## Freeze tables

Freezing a table makes it read-only, which is useful for creating constant values that you don't want to change. Freezing is permanent; there's no "unfreeze" or "thaw" method. To check if a table is frozen, use `Library.table.isfrozen()`.

### Shallow freezes

To freeze a table without any nested tables, Luau offers the `Library.table.freeze()` method.

```lua
local target = {
	key = "value",
	engine = "Roblox",
	playerID = 505306092
}

table.freeze(target)
target.playerID = 1 --> attempt to modify a readonly table
```

### Deep freezes

To freeze a more complex table with nested tables inside it, use a recursive function similar to the following:

```lua
local function deepFreeze(target)
	-- Shallow freeze the table
	table.freeze(target)

	-- Check each key of the table and freeze it if it's a table
	for _, value in target do
		-- Make sure the value isn't frozen; if it already is, an error will occur
		if type(value) == "table" and table.isfrozen(value) == false then
			deepFreeze(value)
		end
	end
end
```

With the function in place, you can deep freeze a table as follows:

```lua
local target = {
	key = "value",
	playerInfo = {
		playerID = 505306092,
		playerName = "PlayerName"
	},
	otherInfo = {
		{
			{1, 3, 5, 7, 9}
		}
	}
}

deepFreeze(target)
target.playerInfo.playerID = 1 --> attempt to modify a readonly table
```
