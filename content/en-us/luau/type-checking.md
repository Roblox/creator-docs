---
title: Luau Typing
description: Luau uses gradual typing through the use
of type annotations and inference.
---

Luau uses a typing engine which gives every variable an inferred type.

```lua
local foo = "bar" --> string
local x = 5 --> number
```

## Defining a type
A type can be defined using the `type` keyword

```lua
type Vector2 = {x: number, y: number}
```

## Inference Modes
There are three type inference modes that Luau can use in [Script]()s

* `--!nocheck` - Don't check types
* `--!nonstrict` - Default mode for all scripts, only asserts variable types if they are explicitly annotated
* `--!strict` - Asserts all types based off the inferred or explicitly annotated type

## Types

A type annoatation can be defined using the `:` operator after a variable, followed by a type definition, by default, in `nonstrict` mode, all variables are assigned the type `any`.

```lua
local foo: string = "bar"
local x: number = 5
```

There are 4 primitive types that can be used in an annotation:
* `nil` - no value
* `boolean` - `true`/`false` value
* `number` - a numeric value
* `string` - text

Functions and tables are defined differently, and within Roblox, all `Instances` and `Enums` have their own types

```lua
part.Touched:Connect(function(otherPart: BasePart)
	local brickColor: Enum.BrickColor = otherPart.BrickColor
end)
```

An optional type can be defined using `?` at the end of the annotation.

```lua
local foo: string? = nil
```

## Function Typing

Assume the following function
```lua
local function add(x, y)
	return x + y
end
```

This is a fairly simple function where the behavior is well defined. Take the value of `x` and add it to `y`. However, nothing is stopping someone from using a `string` type in the `add` function, which causes an error.

This is because Luau doesn't know that we want to use numbers in this function, lets rework this function such that it does constrain `x` and `y` to be numbers.

```lua
local function add(x: number, y: number)
	return x + y
end
```

By adding type annotations to the parameters of the function, Luau now knows that the function takes two numbers, and throws a warning if you try to put anything into the function that isn't a number

```lua
add(5, 10) -- ok
add(5, "foo") -- TypeError: Type `string` could not be converted into `number`.
```

To define a return type, put a `:` operator at the end of the function definition

```lua
local function add(x: number, y: number): number
```

To return multiple types, place all return types in brackets

```lua
local function FindSource(script: BaseScript, pattern: string): (string, number)
```

### Defining a functional type

A functional type can be defined by using the syntax `(in) -> out`, for example, the type signatures of the functions above is

```lua
type add = (x: number, y: number) -> number
type FindSource = (script: BaseScript, pattern: string) -> (string, number)
```

## Table types

Luau does not have a simple `table` type, instead, table types are defined using `{}` syntax. At the most basic level, a table can be defined with the syntax `{type}`

```lua
local numbers: {number} = {1, 2, 3, 4, 5}
```

Index types can be defined using `{[indexType] = valueType}`

```lua
local messagesFromPeople: {[string]: any} = {
	Dave = "Hello",
	Cat = "meow"
}
```

Tables can also have explicit string indicies defined in a type

```lua
type Car = {
	Speed: number,
	Drive: (Car) -> ()
}
```

## Variadics

Lets assume a function that calculates the sum of a variadic ammount of numbers

```lua
local function addLotsOfNumbers(...)
	local sum = 0

	for _, v in {...} does
		sum += v
	end

	return sum
end
```

As expected, this can take any value and wont complain if you give it an invalid type such as a `string`.

```lua
print(addLotsOfNumbers(1, 2, 3, 4, 5)) -- 15
print(addLotsOfNumbers(1, 2, "3", 4, 5)) -- attempt to add string to number
```

Instead, we can assign a type to the `...` just like how you'd assign any other type

```lua
local function addLotsOfNumbers(...: number)
```

And now, the second line raises a type error

```lua
print(addLotsOfNumbers(1, 2, 3, 4, 5))
print(addLotsOfNumbers(1, 2, "3", 4, 5)) -- TypeError: Type `string` could not be converted into `number`.
```

However, with a type definition, the following statement does not work

```lua
type addLotsOfNumbers = (...: number) -> number -- Expected type, got ':'
```

Instead, use the syntax `...type` to define the variadic type

```lua
type addLotsOfNumbers = (...number) -> number
```

## Generics

TODO (help wanted)

### Type Packs

TODO

## Type Exports

Types can be exported through [ModuleScript]() using the `export` keyword infront of a type definition

```lua
export type Cat = {
	Name: string,
	Meow: (Cat) -> ()
}
```

```lua
local Cat = require(script.Cat)

local newCat: Cat.Cat = {
	Name = "metatablecat",
	Meow = function(self)
		print(`{self.Name} said meow`)
	end
}
```