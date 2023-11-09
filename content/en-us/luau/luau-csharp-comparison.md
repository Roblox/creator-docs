---
title: Luau and C# Comparison
description: Explains the similarities and differences between the C# and Luau programming languages.
---

Roblox uses the Luau programming language. The following code samples and tables indicate some of the differences between syntaxes for C# and Luau.

## Line Endings

You don't need semicolons in Luau, but they don't break the syntax.

## Reserved Keywords

The following table has Luau's reserved keywords mapped to their C# equivalent. Note it doesn't show all C# keywords.

<table>
    <thead>
        <tr>
            <th>Lua</th>
            <th>C#</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>`and`</td>
            <td></td>
        </tr>
        <tr>
            <td>`break`</td>
            <td>`break`</td>
        </tr>
        <tr>
            <td>`do`</td>
            <td>`do`</td>
        </tr>
        <tr>
            <td>`if`</td>
            <td>`if`</td>
        </tr>
        <tr>
            <td>`else`</td>
            <td>`else`</td>
        </tr>
        <tr>
            <td>`elseif`</td>
            <td>`else if`</td>
        </tr>
        <tr>
            <td>`then`</td>
            <td></td>
        </tr>
        <tr>
            <td>`end`</td>
            <td></td>
        </tr>
        <tr>
            <td>`true`</td>
            <td>`true`</td>
        </tr>
        <tr>
            <td>`false`</td>
            <td>`false`</td>
        </tr>
        <tr>
            <td>`for`</td>
            <td>`for` or `foreach`</td>
        </tr>
        <tr>
            <td>`function`</td>
            <td></td>
        </tr>
        <tr>
            <td>`in`</td>
            <td>`in`</td>
        </tr>
        <tr>
            <td>`local`</td>
            <td></td>
        </tr>
        <tr>
            <td>`nil`</td>
            <td>`null`</td>
        </tr>
        <tr>
            <td>`not`</td>
            <td></td>
        </tr>
        <tr>
            <td>`or`</td>
            <td></td>
        </tr>
        <tr>
            <td>`repeat`</td>
            <td></td>
        </tr>
        <tr>
            <td>`return`</td>
            <td>`return`</td>
        </tr>
        <tr>
            <td>`until`</td>
            <td></td>
        </tr>
        <tr>
            <td>`while`</td>
            <td>`while`</td>
        </tr>
    </tbody>
</table>

## Comments

```lua title='Comments in Luau'
-- Single line comment

--[[ Resulting output:
	Block comment
--]]
```

```cs title='Comments in C#'
// Single line comment

/*
	Block comment
*/
```

## Strings

```lua title='Strings in Luau'
-- Multi-line string
[[This is a string that,
when printed, appears
on multiple lines]]

-- Concatenation
s1 = "This is a string "
s2 = "made with two parts."
endString = s1 .. s2
```

```cs title='Strings in C#'
// Multi-line string
"This is a string that,\nwhen printed, appears\n on multiple lines."

string multiLineString = @"This is a string that,
when printed, appears
on multiple lines";

// Concatenation
string s1 = "This is a string ";
string s2 = "made with two parts.";
string endString = s1 + s2;
```

## Tables

To learn more about tables in Luau, see [Tables](./tables.md).

### Dictionary Tables

You can use tables in Luau as dictionaries just like in C#.

```lua title='Dictionary tables in Luau'
local dictionary = {
	val1 = "this",
	val2 = "is"
}

print(dictionary.val1)  -- Outputs 'this'
print(dictionary["val1"])  -- Outputs 'this'

dictionary.val1 = nil  -- Removes 'val1' from table
dictionary["val3"] = "a dictionary"  -- Overwrites 'val3' or sets new key-value pair
```

```cs title='Dictionary tables in C#'
Dictionary dictionary = new Dictionary()
{
	{ "val1", "this" },
	{ "val2", "is" }
};

Console.WriteLine(dictionary["val1"]);  // Outputs 'this'
dictionary.Remove("val1");  // Removes 'val1' from dictionary

dictionary["val3"] = "a dictionary";  // Overwrites 'val3' or sets new key-value pair
dictionary.Add("val3", "a dictionary");  // Creates a new key-value pair
```

### Numerically-Indexed Tables

You can use tables in Luau as arrays just like in C#. Indices start at `1` in Luau and `0` in C#.

```lua title='Numerically-indexed tables in Luau'
local npcAttributes = {"strong", "intelligent"}

print(npcAttributes[1])  -- Outputs 'strong'
print(#npcAttributes)  -- Outputs the size of the list

-- Append to the list
table.insert(npcAttributes, "humble")
-- Another way...
npcAttributes[#npcAttributes+1] = "humble"

-- Insert at the beginning of the list
table.insert(npcAttributes, 1, "brave")

-- Remove item at a given index
table.remove(npcAttributes, 3)
```

```cs title='Numerically-indexed tables in C#'
List npcAttributes = new List{"strong", "intelligent"};

Console.WriteLine(npcAttributes[0]);  // Outputs 'strong'
Console.WriteLine(npcAttributes.Count);  // Outputs the size of the list

// Append to the list
npcAttributes.Add("humble");
// Another way...
npcAttributes.Insert(npcAttributes.Count, "humble");

// Insert at the beginning of the list
npcAttributes.Insert(0, "brave");

// Remove item at a given index
npcAttributes.Remove(2);
```

## Operators

### Conditional Operators

<table>
    <thead>
        <tr>
            <th>Operator</th>
            <th>Lua</th>
            <th>C#</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Equal To</td>
            <td>`==`</td>
            <td>`==`</td>
        </tr>
        <tr>
            <td>Greater Than</td>
            <td>`>`</td>
            <td>`>`</td>
        </tr>
        <tr>
            <td>Less Than</td>
            <td>`<`</td>
            <td>`<`</td>
        </tr>
        <tr>
            <td>Greater Than or Equal To</td>
            <td>`>=`</td>
            <td>`>=`</td>
        </tr>
        <tr>
            <td>Less Than or Equal To</td>
            <td>`<=`</td>
            <td>`<=`</td>
        </tr>
        <tr>
            <td>Not Equal To</td>
            <td>`~=`</td>
            <td>`!=`</td>
        </tr>
        <tr>
            <td>And</td>
            <td>`and`</td>
            <td>`&&`</td>
        </tr>
        <tr>
            <td>Or</td>
            <td>`or`</td>
            <td>`||`</td>
        </tr>
    </tbody>
</table>

### Arithmetic Operators

<table>
    <thead>
        <tr>
            <th></th>
            <th>Lua</th>
            <th>C#</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Addition</td>
            <td>`+`</td>
            <td>`+`</td>
        </tr>
        <tr>
            <td>Subtraction</td>
            <td>`-`</td>
            <td>`-`</td>
        </tr>
        <tr>
            <td>Multiplication</td>
            <td>`*`</td>
            <td>`*`</td>
        </tr>
        <tr>
            <td>Division</td>
            <td>`/`</td>
            <td>`/`</td>
        </tr>
        <tr>
            <td>Modulus</td>
            <td>`%`</td>
            <td>`%`</td>
        </tr>
        <tr>
            <td>Exponentiation</td>
            <td>`^`</td>
            <td>`**`</td>
        </tr>
    </tbody>
</table>

## Variables

In Luau, variables don't specify their type when you declare them. Luau variables don't have access modifiers, although you may prefix "private" variables with an underscore for readability.

```lua title='Variables in Luau'
local stringVariable = "value"

-- "Public" declaration
local variableName

-- "Private" declaration - parsed the same way
local _variableName
```

```cs title='Variables in C#'
string stringVariable = "value";

// Public declaration
public string variableName

// Private declaration
string variableName;
```

## Scope

In Luau, you can write variables and logic in a tighter scope than their function or class by nesting the logic within `do` and `end` keywords, similar to curly brackets `{}` in C#. For more details, see [Scope](./scope.md).

```lua title='Scoping in Luau'
local example = "Example text"

do
	example ..= " changed!"
	print(example)  -- Outputs 'Example text changed!'
end

print(example)  -- Outputs 'Example text'
```

```cs title='Scoping in C#'
string example = "Example text";

{
	example += " changed!";
	Console.WriteLine(example);  // Outputs 'Example text changed!'
}


Console.WriteLine(example);  // Outputs 'Example text'
```

## Conditional Statements

```lua title='Conditional Statements in Luau'
-- One condition
if boolExpression then
	doSomething()
end

-- Multiple conditions
if not boolExpression then
	doSomething()
elseif otherBoolExpression then
	doSomething()
else
	doSomething()
end
```

```cs title='Conditional Statements in C#'
// One condition
if (boolExpression) {
	doSomething();
}


// Multiple conditions
if (!boolExpression) {
	doSomething();
}
else if (otherBoolExpression) {
	doSomething();
}
else {
	doSomething();
}
```

### Conditional Operator

Luau doesn't offer a direct equivalent to the C# conditional operator, `a ? b : c`. However, the Luau idiom `a and b or c` offers a close approximation, provided `b` isn't `false` or `nil`.

```lua title='Approximate of the conditional operator in Luau'
local max = x > y and x or y
```

```cs title='Conditional operator in C#'
int max = (x > y) ? x : y;
```

## Loops

To learn more about loops in Luau, see [Control Structures](./control-structures.md).

### While and Repeat Loops

```lua title='While and Repeat loops in Luau'
while boolExpression do
	doSomething()
end

repeat
	doSomething()
until not boolExpression
```

```cs title='While and Repeat loops in C#'
while (boolExpression) {
	doSomething();
}

do {
	doSomething();
} while (boolExpression)
```

### For Loops

```lua title='Generic For loops in Luau'
-- Forward loop
for i = 1, 10 do
	doSomething()
end

-- Reverse loop
for i = 10, 1, -1 do
	doSomething()
end
```

```cs title='Generic For loops in C#'
// Forward loop
for (int i = 1; i <= 10; i++) {
	doSomething();
}

// Reverse loop
for (int i = 10; i >= 1; i--) {
	doSomething();
}
```

```lua title='For loops over tables in Luau'
local abcList = {"a", "b", "c"}

for i, v in ipairs(abcList) do
	print(v)
end

local abcDictionary = { a=1, b=2, c=3 }

for k, v in pairs(abcDictionary) do
	print(k, v)
end
```

```cs title='For loops over lists in C#'
List<string> abcList = new List<string>{"a", "b", "c"};

foreach (string v in abcList) {
	Console.WriteLine(v);
}

Dictionary<string, int> abcDictionary = new Dictionary<string, int>
{ {"a", 1}, {"b", 2}, {"c", 3} };


foreach (KeyValuePair<string, int> entry in abcDictionary) {
	Console.WriteLine(entry.Key + " " + entry.Value);
}
```

Luau also supports [generalized iteration](./control-structures.md#generalized-iteration), which further simplifies working with tables.

## Functions

To learn more about functions in Luau, see [Functions](./functions.md).

### Generic Functions

```lua title='Generic functions in Luau'
-- Generic function
local function increment(number)
	return number + 1
end
```

```cs title='Generic functions in C#'
// Generic function
int increment(int number) {
	return number + 1;
}
```

### Variable Argument Number

```lua title='Variable Argument Number in Luau'
-- Variable argument number
local function variableArguments(...)
	print(...)
end
```

```cs title='Variable Argument Number in C#'
// Variable argument number
void variableArguments(params string[] inventoryItems) {
	for (item in inventoryItems) {
		Console.WriteLine(item);
	}
}
```

### Named Arguments

```lua title='Named Arguments in Luau'
-- Named arguments
local function namedArguments(args)
	return args.name .. "'s birthday: " .. args.dob
end

namedArguments{name="Bob", dob="4/1/2000"}
```

```cs title='Named Arguments in C#'
// Named arguments
string namedArguments(string name, string dob) {
	return name + "'s birthday: " + dob;
}

namedArguments(name: "Bob", dob: "4/1/2000");
```

## Try-Catch Structures

```lua title='Try/Catch Structures in Luau'
local function fireWeapon()
	if not weaponEquipped then
		error("No weapon equipped!")
	end
	-- Proceed...
end

local success, errorMessage = pcall(fireWeapon)
if not success then
	print(errorMessage)
end
```

```cs title='Try/Catch Structures in C#'
void fireWeapon() {
	if (!weaponEquipped) {
		// Use a user-defined exception
		throw new InvalidWeaponException("No weapon equipped!");
	}
	// Proceed...
}

try {
	fireWeapon();
} catch (InvalidWeaponException ex) {
	// An error was raised
}
```
