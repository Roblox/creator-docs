---
title: Metatables
description: Metatables attach powerful metamethods to tables, allowing for manipulation like indexing, addition, and concatenation.
---

Metatables allow tables to become more powerful than before. They are attached to data and contain values called metamethods. Metamethods are fired when a certain action is used with the datum that it is attached to.

Consider the following code:

```lua
local list = {1, 2}
print(list[3])
```

You might expect this code to search through the list for the third index in list, find nothing, and return nil. That's not correct, though. What actually happens is the code searches through the list for the third index, finds nothing, and then checks if there's a metatable attached to the table, returning nil if there isn't one.

## Manipulating Metatables

The two primary functions for adding and finding a table's metatable, are `setmetatable` and `getmetatable`

```lua
local x = {}
local metaTable = {} -- metaTables are tables, too!
setmetatable(x, metaTable) -- Give x a metatable called metaTable!
print(getmetatable(x)) --> table: [hexadecimal memory address]
```

The `setmetatable` function also returns the table that you're setting the metatable of, so these two scripts do the same thing:

```lua
local x = {}
setmetatable(x, {})
```

```lua
local x = setmetatable({}, {})
```

### Metamethods

Metamethods are the functions that are stored inside a metatable. They can go
from calling a table, to adding a table, to even dividing tables as well.
Here's the list of available metamethods:

<table>
  <thead>
	  <tr>
		  <th>Method</th>
		  <th>Description</th>
		</tr>
	</thead>
	<tbody>
	  <tr>
		  <td>__index(table, index)</td>
		  <td>Fires when table[index] is indexed, if table[index] is nil. Can also be set to a table, in which case that table will be indexed.</td>
		</tr>
	  <tr>
		  <td>__newindex(table, index, value)</td>
		  <td>Fires when table[index] tries to be set (table[index] = value), if table[index] is nil. Can also be set to a table, in which case that table will be indexed.</td>
		</tr>
	  <tr>
		  <td>__call(table, ...)</td>
		  <td>Fires when the table is called like a function, ... is the arguments that were passed.</td>
		</tr>
	  <tr>
		  <td>__concat(table, value)</td>
		  <td>Fires when the .. concatenation operator is used on the table.</td>
		</tr>
	  <tr>
		  <td>__unm(table)</td>
		  <td>Fires when the unary – operator is used on the table.</td>
		</tr>
	  <tr>
		  <td>__add(table, value)</td>
		  <td>The + addition operator.</td>
		</tr>
	  <tr>
		  <td>__sub(table, value)</td>
		  <td>The – subtraction operator.</td>
		</tr>
	  <tr>
		  <td>__mul(table, value)</td>
		  <td>The * mulitplication operator.</td>
		</tr>
	  <tr>
		  <td>__div(table, value)</td>
		  <td>The / division operator.</td>
		</tr>
	  <tr>
		  <td>__idiv(table, value)</td>
		  <td>The // floor division operator.</td>
	 	</tr>
	  <tr>
		  <td>__mod(table, value)</td>
		  <td>The % modulus operator.</td>
		</tr>
	  <tr>
		  <td>__pow(table, value)</td>
		  <td>The ^ exponentiation operator.</td>
		</tr>
	  <tr>
		  <td>__tostring(table)</td>
		  <td>Fired when tostring is called on the table.</td>
		</tr>
	  <tr>
		  <td>__metatable</td>
		  <td>If present, locks the metatable so getmetatable will return this instead of the metatable and setmetatable will error. Non-function value.</td>
		</tr>
	  <tr>
		  <td>__eq(table, value)</td>
		  <td>The == equal to operator¹</td>
		</tr>
	  <tr>
		  <td>__lt(table, value)</td>
		  <td>The &lt; less than operator¹</td>
		</tr>
	  <tr>
		  <td>__le(table, value)</td>
		  <td>The &lt;= operator¹</td>
		</tr>
	  <tr>
		  <td>__mode</td>
		  <td>Used in weak tables, declaring whether the keys and/or values of a table are weak. **Note:** References to Roblox instances are never weak. Tables that hold such references will never be garbage collected.</td>
		</tr>
	  <tr>
		  <td>__gc(table)</td>
		  <td>Fired when the table is garbage-collected. **Note:** On Roblox, this metamethod is disabled.</td>
		</tr>
	  <tr>
		  <td>__len(table)</td>
		  <td>Fired when the # length operator is used on the Object.</td>
		</tr>
	  <tr>
		  <td>__iter(table)</td>
		  <td>Used to denote a custom iterator when using generalized iteration.</td>
	  </tr>
	</tbody>
</table>

<Alert severity = 'info'>
¹ Requires two values with the _same_ metamethod function and basic type
(table/userdata/etc.); does not work with a table and another random table, or
with a userdata and a table.

If you want to override relational comparison for your type, you must implement `__lt`. By default, all four operators (`<`, `<=`, `>`, `>=`) will call it and interpret the result according to relational identities (`a<b` == `b>a`, `a<=b` == `not(b<a)`)

In some cases, such as when preserving unordered semantics exactly, you can have different behavior for `<=`.. For example, for floating-point numbers, `NaN < NaN` is false, and `NaN <= NaN` is also false. For this case, you can override `__le` as well, in which case `<=` and `>=` will use it instead of inverting the result of `__lt`.
</Alert>

It should be noted that when writing functions for either arithmetic or relational metamethods the two function parameters are interchangeable between the table that fired the metamethod and the other value. For example, when doing vector operations with scalars division is not commutative. Therefore if you were writing metamethods for your own vector2 class, you'd want to be careful to account for either scenario.

```lua
local vector2 = {__type = "vector2"}
local mt = {__index = vector2}

function mt.__div(a, b)
    if type(a) == "number" then
    	-- a is a scalar, b is a vector
    	local scalar, vector = a, b
    	return vector2.new(scalar / vector.x, scalar / vector.y)
    elseif type(b) == "number" then
    	-- a is a vector, b is a scalar
   	local vector, scalar = a, b
   	return vector2.new(vector.x / scalar, vector.y / scalar)
   elseif (a.__type and a.__type == "vector2" and b.__type and b.__type == "vector2") then
   	-- both a and b are vectors
   	return vector2.new(a.x / b.x, a.y / b.y)
   end
end

function mt.__tostring(t)
   return t.x .. ", " .. t.y;
end;

function vector2.new(x, y)
   local self = setmetatable({}, mt)
   self.x = x or 0
   self.y = y or 0
   return self
end

local a = vector2.new(10, 5)
local b = vector2.new(-3, 4)

print(a / b) -- -3.3333333333333, 1.25
print(b / a) -- -0.3, 0.8
print(2 / a) -- 0.2, 0.4
print(a / 2) -- 5, 2.5
```

### Using Metatables

There are many ways to use metatables, for example the `__unm` metamethod (to make a table negative):

```lua
local metatable = {
    __unm = function(t) -- __unm is for the unary - operator
    	local negated = {}
    	for key, value in t do
    		negated[key] = -value -- negate all of the values in this table
    	end
    	return negated -- return the table
    end
}

local table1 = setmetatable({10, 11, 12}, metatable)
print(table.concat(-table1, "; ")) --> -10; -11; -12
```

Here's an interesting way to declare things using `__index`:

```lua
local metatable = {
    __index = {x = 1}
}

local t = setmetatable({}, metatable)
print(t.x) --> 1
```

`__index` was fired when x was indexed in the table and not found. Lua then searched through the `__index` table for an index called x, and, finding one, returned that.

Now you can easily do that with a simple function, but there's a lot more where
that came from. Take this for example:

```lua
local t = {10, 20, 30}
print(t(5))
```

Now, obviously you can't call a table. That's just crazy, but (surprise, surprise!) with metatables you can.

```lua
local metatable = {
    __call = function(t, param)
    	local sum = {}
    	for i, value in t do
    		sum[i] = value + param -- Add the argument (5) to the value, then place it in the new table (t).
    	end
    	return unpack(sum) -- Return the individual table values
    end
}

local t = setmetatable({10, 20, 30}, metatable)
print(t(5)) --> 15 25 35
```

You can do a lot more as well, such as adding tables!

```lua
local table1 = {10, 11, 12}
local table2 = {13, 14, 15}

for k, v in table1 + table2 do
    print(k, v)
end
```

This will error saying that you're attempting to perform arithmetic on a table. Let's try this with a metatable.

```lua
local metatable = {
    __add = function(t1, t2)
    	local sum = {}
    	for key, value in t1 do
    		sum[key] = value
    	end

    	for key, value in t2 do
    		if sum[key] then
    			sum[key] += value
   		else
   			sum[key] = value
   		end
   	end
   	return sum
   end
}

local table1 = setmetatable({10, 11, 12}, metatable)
local table2 = setmetatable({13, 14, 15}, metatable)

for k, v in table1 + table2 do
   print(k, v)
end
```

### Use Cases

Now, all of these examples can be implemented as a simple function, but you can do a lot more than that. Let's try a simple program that will memorize a number when a possibly laggy math problem is put into it.

For this one we will be using the `__index` metamethod just to make it simple:

```lua
local function mathProblem(num)
    for i = 1, 20 do
    	num = math.floor(num * 10 + 65)
    end
    for i = 1, 10 do
    	num += i - 1
    end
    return num
end

local metatable = {
   __index = function (object, key)
   	local num = mathProblem(key)
   	object[key] = num
   	return num
   end
}

local t = setmetatable({}, metatable)

print(t[1]) -- Will be slow because it's the first time using this number, so it has to run the math function.
print(t[2]) -- will be slow because it's the first time using this number.
print(t[1]) -- will be fast because it's just grabbing the number from the table.
```

#### Rawset, Rawget, Rawequal

When playing with metatables, you may run into some problems. What happens if you need to use the `__index` metamethod to create new values in a table, but that table's metatable also has a `__newindex` metamethod in it? You'll want to use the Lua built-in function rawset to set the value without invoking any metamethods. Take the following code as an example of what happens if you don't use these functions.

```lua
local t = setmetatable({}, {
    __index = function(self, i)
    	self[i] = i * 10 -- just as an example
    	return self[i]
    end,
    __newindex = function(self, i, v)
    	--don't do anything because we don't want you to set values to the table the normal way
    end
})
print(t[1]) -- Causes a C-Stack overflow
```

Now why would that cause a stack overflow? Stack overflows happen when you try to call a function from itself too many times, but what would cause that to happen? In the `__index` function, we set `self[i]` to a value, so when it gets to the next line, `self[i]` should exist, so it won't call the `__index` metamethod, right?

The problem is that `__newindex` doesn't let us set the value. Its presence stops values from being added to the table with the standard `t[i] = v` method. In order to get past this, you use the `rawset` function.

```lua
local t = setmetatable({}, {
    __index = function(self, i)
    	rawset(self, i, i * 10)
    	return self[i]
    end,
    __newindex = function(self, i, v)
    	--don't do anything because we don't want you to set values to the table the normal way
    end
})
print(t[1]) -- prints 10
```

## Using the Set Datatype

A **set** is a collection of items with no order and no duplicate elements. An item either **is** or **is not** contained within a set. Using metatables, you can construct and manipulate sets within Lua scripts.

### Basic Methods

The following code includes basic set functionality, letting you construct new
sets, add and remove an item, check if a set contains an item, and output the
contents of a set.

```lua
local Set = {}
Set.__index = Set

-- Function to construct a set from an optional list of items
function Set.new(items)
	local newSet = {}
	for key, value in items or {} do
		newSet[value] = true
	end
	return setmetatable(newSet, Set)
end

-- Function to add an item to a set
function Set:add(item)
	self[item] = true
end

-- Function to remove an item from a set
function Set:remove(item)
	self[item] = nil
end

-- Function to check if a set contains an item
function Set:contains(item)
	return self[item] == true
end

-- Function to output set as a comma-delimited list for debugging
function Set:output()
	local elems = {}
	for key, value in self do
		table.insert(elems, tostring(key))
	end
	print(table.concat(elems, ", "))
end
```

#### Create Set

A new set can be constructed by calling `Set.new()` with an optional array of items to add.

```lua
local fruits = Set.new({"Apple", "Lemon", "Orange", "Cherry", "Lime", "Peach"})
```

Note that by definition, a set has no concept of ordering.

#### Add Item

Adding an item to an existing set can be done via the `Set:add()` method.

```lua
local fruits = Set.new({"Apple", "Lemon", "Orange", "Cherry", "Lime", "Peach"})
fruits:add("Mango")
```

#### Remove Item

To remove an item from a set, call `Set:remove()` with the item name.

```lua
local fruits = Set.new({"Apple", "Lemon", "Orange", "Cherry", "Lime", "Peach"})
fruits:remove("Orange")
```

#### Check for Item

To check if a set contains a specific item, use `Set:contains()`.

```lua
local fruits = Set.new({"Apple", "Lemon", "Orange", "Cherry", "Lime", "Peach"})

local result1 = fruits:contains("Cherry")
print(result1) -- true

local result2 = fruits:contains("Watermelon")
print(result2) -- false
```

### Additional Methods

Other useful operations can be implemented for sets, letting you compare items between sets, combine sets, or subtract one set from another.

#### Intersection

When considering sets as Venn diagrams, you can get the **intersection** of two sets as follows, meaning the items that appear in **both** sets.

```lua
local function getIntersection(set1, set2)
	local result = Set.new()
	for key, value in set1 do
		if set2:contains(key) then
			result:add(key)
		end
	end
	return result
end

local freshFruits = Set.new({"Mango", "Lemon", "Orange", "Cherry", "Lime", "Peach"})
local frozenFruits = Set.new({"Mango", "Peach", "Pineapple"})

local commonFruits = getIntersection(freshFruits, frozenFruits)
commonFruits:output() -- Mango, Peach
```

#### Union

You can get the **union** of two sets with the following function, meaning a collection of the items in both sets with no duplicates. Note that this function uses the metatable `__add` method to provide an addition shortcut of `set1 + set2`.

```lua
function Set:__add(otherSet)
	local result = Set.new()
	for entry in self do
		result[entry] = true
	end
	for entry in otherSet do
		result[entry] = true
	end
	return result
end

local sweetFruits = Set.new({"Apple", "Mango", "Cherry", "Peach"})
local sourFruits = Set.new({"Lemon", "Lime"})

local allFruits = sweetFruits + sourFruits
allFruits:output() -- Peach, Lime, Apple, Cherry, Lemon, Mango

```

#### Subtraction

You can remove all items in one set from the items in another set via the following function. Similar to the function above, this uses the metatable `__sub` method to provide a subtraction shortcut of `set1 - set2`.

```lua
function Set:__sub(otherSet)
	local result = Set.new()
	for entry in self do
		result[entry] = true
	end
	for entry in otherSet do
		result[entry] = nil
	end
	return result
end

local allFruits = Set.new({"Apple", "Lemon", "Mango", "Cherry", "Lime", "Peach"})
local sourFruits = Set.new({"Lemon", "Lime"})

local sweetFruits = allFruits - sourFruits
sweetFruits:output() -- Mango, Apple, Cherry, Peach
```
