---
title: Type Checking
description: Luau uses gradual typing through the use of type annotations and inference.
---

Luau supports a gradual type system through the use of type annotations and type inference. These types are used to provide better warnings, errors, and suggestions in the [Script Editor](../studio/script-editor.md).

## Defining a Type

Use the `type` keyword to define your own types:

```lua
type Vector2 = {x: number, y: number}
```

## Inference Modes

There are three Luau type inference modes that can be set on the first line of a `Class.Script`:

- `--!nocheck` - Don't check types
- `--!nonstrict` - Default mode for all scripts, only asserts variable types if they are explicitly annotated
- `--!strict` - Asserts all types based off the inferred or explicitly annotated type

The default mode for the type checker is `--!nonstrict`. The other two modes control how strict the type checker is with inferring and checking types for variables and functions. Any type mismatches in scripts are highlighted in the [Script Editor](../studio/script-editor.md) and surfaced as warnings in the [Script Analysis](../studio/script-editor.md#script-analysis) window.

## Types

A type annotation can be defined using the `:` operator after a local variable, followed by a type definition. By default, in `nonstrict` mode, all variables are assigned the type `any`.

```lua
local foo: string = "bar"
local x: number = 5
```

There are four primitive types that can be used in an annotation:

- `nil` - no value
- `boolean` - `true` or `false`
- `number` - a numeric value
- `string` - text

Within Roblox, all classes, data types, and enums have their own types that you can check against:

```lua
local somePart: Part = Instance.new("Part")
local brickColor: BrickColor = somePart.BrickColor
local material: Enum.Material = somePart.Material
```

To make a type optional, use a `?` at the end of the annotation:

```lua
local foo: string? = nil
```

This will allow the variable to be either the specified type (in this case `string`) or `nil`.

### Literal Types

You can also cast strings and booleans to literal values instead of using `string` and `boolean`:

```lua
local alwaysHelloWorld: "Hello world!" = "Hello world!"
alwaysHelloWorld = "Just hello!"  -- Type error: Type '"Just hello!"' could not be converted into '"Hello world!"'

local alwaysTrue: true = false  -- Type error: Type 'false' could not be converted into 'true'
```

### Type Casts

Sometimes, you might need to assist the typechecker by explicitly casting a value to a different type with the `::` operator:

```lua
local myNumber = 1
local myString: string

myString = myNumber  -- Not OK; type conversion error
myString = myNumber :: any  -- OK; all expressions can be cast to 'any'
local myFlag = myNumber :: boolean  -- Not OK; types are unrelated
```

## Function Typing

Consider the following function:

```lua
local function add(x, y)
	return x + y
end
```

This function adds `x` to `y`, but errors if one or both of them is a string. Luau doesn't know that this function can only use numbers. To prevent this category of problem, add types to the parameters:

```lua
local function add(x: number, y: number)
	return x + y
end
```

Luau now knows that the function takes two numbers and throws a warning if you try to pass anything that isn't a number into the function:

```lua
add(5, 10)
add(5, "foo")  -- Type error: string could not be converted into number
```

To define a return type, put a `:` operator at the end of the function definition:

```lua
local function add(x: number, y: number): number
```

To return multiple types, place the types in parentheses:

```lua
local function FindSource(script: BaseScript, pattern: string): (string, number)
	return 42, true  -- Type errors
end
```

### Defining a Functional Type

A functional type can be defined by using the syntax `(in) -> out`. Using the functions from the previous examples, the types of the functions are:

```lua
type add = (x: number, y: number) -> number
type FindSource = (script: BaseScript, pattern: string) -> (string, number)
```

## Table Types

Luau does not have a `table` type, instead, table types are defined using `{}` syntax. One way of defining tables is using the `{type}` syntax, which defines a list type.

```lua
local numbers: {number} = {1, 2, 3, 4, 5}
local characterParts: {Instance} = LocalPlayer.Character:GetChildren()
```

Define index types using `{[indexType]: valueType}`:

```lua
local numberList: {[string]: number} = {
	Foo = 1,
	Baz = 10
}

numberList["bar"] = true  -- Type error: boolean can't convert to number
```

Tables can also have explicit string indices defined in a type.

```lua
type Car = {
	Speed: number,
	Drive: (Car) -> ()
}

local taxi: Car = {Speed = 30, Drive = drive}

function drive(car)
	-- Always go the speed limit
end
```

## Variadics

Here's a function that calculates the sum of an arbitrary amount of numbers:

```lua
local function addLotsOfNumbers(...)
	local sum = 0

	for _, v in {...} do
		sum += v
	end

	return sum
end
```

As expected, this function can take any value, and the typechecker won't raise a warning if you provide an invalid type, such as a `string`.

```lua
print(addLotsOfNumbers(1, 2, 3, 4, 5))  -- 15
print(addLotsOfNumbers(1, 2, "car", 4, 5))  -- Attempt to add string to number
```

Instead, assign a type to the `...`, just like how you assign any other type:

```lua
local function addLotsOfNumbers(...: number)
```

And now, the second line raises a type error.

```lua
print(addLotsOfNumbers(1, 2, 3, 4, 5))
print(addLotsOfNumbers(1, 2, "car", 4, 5))  -- Type error: string could not be converted into number

```

However, this does not work when writing a functional type definition:

```lua
type addLotsOfNumbers = (...: number) -> number  -- Expected type, got ':'
```

Instead, use the syntax `...type` to define a variadic type.

```lua
type addLotsOfNumbers = (...number) -> number
```

## Unions and Intersections

You can even define a type as two or more types using a union or intersection:

```lua
type numberOrString = number | string
type type1 = {foo: string}
type type2 = {bar: number}
type type1and2 = type1 & type2  -- {foo: string} & {bar: number}

local numString1: numberOrString = true  -- Type error
local numString2: type1and2 = {foo = "hello", bar = 1}
```

## Defining an Inferred Type

You can use the `typeof` function in a type definition for inferred types:

```lua
type Car = typeof({
	Speed = 0,
	Wheels = 4
})  --> Car: {Speed: number, Wheels: number}
```

One way to use `typeof` is to define a metatable type using `setmetatable` inside the `typeof` function:

```lua
type Vector = typeof(setmetatable({}::{
	x: number,
	y: number
}, {}::{
	__add: (Vector, Vector|number) -> Vector
}))

-- Vector + Vector would return a Vector type
```

## Generics

Generics are at a basic level parameters for types. Consider the following `State` object:

```lua
local State = {
	Key = "TimesClicked",
	Value = 0
}
```

Without generics, the type for this object would be as follows:

```lua
type State = {
	Key: string,
	Value: number
}
```

However, you might want the type for `Value` to be based on the incoming value, which is where generics come in:

```lua
type GenericType<T> = T
```

The `<T>` denotes a type that can be set to anything. The best way to visualize this is as a substitution type.

```lua
type List<T> = {T}

local Names: List<string> = {"Bob", "Dan", "Mary"}  -- Type becomes {string}
local Fibonacci: List<number> = {1, 1, 2, 3, 5, 8, 13}  -- Type becomes {number}
```

Generics can also have multiple substitutions inside the brackets.

```lua
type Map<K, V> = {[K]: V}
```

To rework the `State` object from earlier to use a generic type:

```lua
type State<T> = {
	Key: string,
	Value: T
}
```

### Function Generics

Functions can also use generics. The `State` example infers the value of `T` from the function's incoming arguments.

To define a generic function, add a `<>` to the function name:

```lua
local function State<T>(key: string, value: T): State<T>
	return {
		Key = key,
		Value = value
	}
end

local Activated = State("Activated", false)  -- State<boolean>
local TimesClicked = State("TimesClicked", 0)  -- State<number>
```

## Type Exports

To make it so a type can be used outside of a `Class.ModuleScript`, use the `export` keyword:

```lua title="Types Module in ReplicatedStorage"
export type Cat = {
	Name: string,
	Meow: (Cat) -> ()
}
```

```lua title="Script Using the Types Module"
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Types = require(ReplicatedStorage.Types)

local newCat: Types.Cat = {
	Name = "metatablecat",
	Meow = function(self)
		print(`{self.Name} said meow`)
	end
}

newCat:Meow()
```
