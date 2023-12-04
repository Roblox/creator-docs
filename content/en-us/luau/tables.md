---
title: Tables
description: Tables can store multiple values of any type that isn't nil, including booleans, numbers, strings, functions, and other tables.
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

### Creating Arrays

To create an array using a Luau table, declare the values in sequential order, separated by commas.

```lua
-- Construct an array with three items
local testArray = {"A string", 3.14159, workspace.Camera}
print(testArray)
```

### Reading from Arrays

To read from an array, add a pair of square brackets after its reference and specify the index number of the element inside (`[pos]`):

```lua
-- Construct an array with three items
local testArray = {"A string", 3.14159, workspace.Camera}

print(testArray[1]) -- A string
print(testArray[2]) -- 3.14159
print(testArray[3]) -- Camera
```

<Alert severity="warning">
Unlike some languages, Luau uses 1-based indexing for arrays, so the first item in the array is <InlineCode>[1]</InlineCode>, not <InlineCode>[0]</InlineCode>.
</Alert>

### Writing to Arrays

To define or rewrite the value of an array at an index, declare the index number in square brackets (`[index]`) followed by `=` and the value:

```lua
local testArray = {"A string", 3.14159, workspace.Camera}

testArray[2] = 12345
testArray[4] = "New string"

print(testArray[2]) --12345
print(testArray[4]) -- New string
```

### Iterating over Arrays

To iterate over an array, you can use a `for` loop. Because the arrays have numerical indices, you can also use a numeric `for` loop from **1** to the length of the array (`#array`).

```lua
local testArray = {"A string", 3.14159, workspace.Camera, "New string"}

-- Loop using general iteration
for index, value in testArray do
	print(index, value)
end

-- Iterate using the array length operator (#)
for index = 1, #testArray do
	print(index, testArray[index])
end

--[[ Resulting output:
1 A string
2 3.14159
3 Camera
4 New string
1 A string
2 3.14159
3 Camera
4 New string
]]
```

### Inserting Items

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

### Removing Items

To remove an item from an array, use `Library.table.remove()`. This removes the item at the specified position and moves any following items back one index position.

```lua
local testArray = {"First item", "Next item", "Last item"}

table.remove(testArray, 2)

print(testArray[1]) -- First item
print(testArray[2]) -- Last item
```

## Dictionaries

Dictionaries are an extension of arrays. Dictionaries store a set of key-value pairs, where the keys can be any number, string, or object.

### Creating Dictionaries

To create a dictionary table, define each **key** followed by `=` and the **value**. Separate each key-value pair with a comma:

```lua
local testDictionary = {
	FruitName = "Lemon",
	FruitColor = "Yellow",
	Sour = true
}
```

The keys for dictionaries can be numbers, strings, and objects. For example, a key may also be an `Class.Instance`. To use objects as keys, declare the key in square brackets (`[key]`):

```lua
local part = Instance.new("Part")

local testDictionary = {
	PartType = "Block",
	[part] = true
}
```

### Reading from Dictionaries

To read from a dictionary, add a pair of brackets after its reference and specify the key name. Directly reference a string key using quotes (`["key"]`) or use a variable value (`[key]`).

```lua
local part = Instance.new("Part")

local testDictionary = {
	PartType = "Block",
	[part] = true
}
-- Include quotes for string keys
print(testDictionary["PartType"]) -- Block
-- Omit quotes for non-string keys
print(testDictionary[part]) -- true
```

### Writing to Dictionaries

To define or rewrite the value of a new or existing dictionary key, declare the key name in brackets (`[key]`) followed by `=` and the value:

```lua
local testDictionary = {
	FruitName = "Lemon",
	Sour = true
}

-- Change value of existing keys
testDictionary["FruitName"] = "Cherry"
testDictionary["Sour"] = false

-- Insert new key-value pair
testDictionary["FruitCount"] = 10

print(testDictionary["FruitName"]) -- Cherry
print(testDictionary["Sour"]) -- false
print(testDictionary["FruitCount"]) -- 10
```

### Iterating over Dictionaries

To iterate over a dictionary, use the global `pairs()` function in a `for` loop:

```lua
local testDictionary = {
	FruitName = "Lemon",
	FruitColor = "Yellow",
	Sour = true
}

for key, value in pairs(testDictionary) do
	print(key, value)
end

--[[ Resulting output:
FruitName Lemon
Sour true
FruitColor Yellow
]]
```

<Alert severity="warning">
Unlike using <InlineCode>ipairs()</InlineCode> on an array, using <InlineCode>pairs()</InlineCode> on a dictionary doesn't necessarily return items in the same order that they're in the dictionary.
</Alert>

### Removing Key-value Pairs

To remove or erase a key-value pair from a dictionary, set its value for a key to `nil`.

```lua
local testDictionary = {
	FruitName = "Lemon",
	FruitColor = "Yellow",
	Sour = true
}

testDictionary["Sour"] = nil

for key, value in pairs(testDictionary) do
	print(key, value)
end
--[[ Resulting output:
FruitName Lemon
FruitColor Yellow
]]
```

## Tables as References

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

## Cloning Tables

### Shallow Clones

To copy a table without any nested tables, Luau offers the `Library.table.clone()` method.

```lua
local original = {
	key = "value",
	engine = "Roblox",
	playerID = 505306092
}

local clone = table.clone(original)
```

### Deep Clones

To copy a more complex table with nested tables inside it, you'll need to use a recursive function similar to the following:

```lua
local function deepCopy(original)
	local copy = {}
	for k, v in pairs(original) do
		if type(v) == "table" then
			v = deepCopy(v)
		end
		copy[k] = v
	end
	return copy
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

local clone = deepCopy(original)
```
