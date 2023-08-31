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

## Defining a Type

A type can be defined using the `type` keyword.

```lua
type Vector2 = {x: number, y: number}
```

## Inference Modes

There are three type inference modes that Luau can use in `Class.Script|Scripts`:

* `--!nocheck` - Don't check types
* `--!nonstrict` - Default mode for all scripts, only asserts variable types if they are explicitly annotated
* `--!strict` - Asserts all types based off the inferred or explicitly annotated type

## Types

A type annotation can be defined using the `:` operator after a variable, followed by a type definition. By default, in `nonstrict` mode, all variables are assigned the type `any`.

```lua
local foo: string = "bar"
local x: number = 5
```

There are 4 primitive types that can be used in an annotation:
* `nil` - no value
* `boolean` - `true`/`false` value
* `number` - a numeric value
* `string` - text

Functions and tables are defined differently, and within Roblox, all `Class.Instance|Instances` and `DataType.Enums` have their own types.

```lua
part.Touched:Connect(function(otherPart: BasePart)
	local brickColor: Enum.BrickColor = otherPart.BrickColor
end)
```

An optional type can be defined using `?` at the end of the annotation.

```lua
local foo: string? = nil
```

### Literal Types

Strings and booleans can also be casted to literal values, instead of using `string` and `boolean` respectively.

```lua
local alwaysHelloWorld: "Hello World!" = "Hello World!"
local alwaysTrue: true = false -- TypeError: Type 'false' could not be converted into 'true'

alwaysHelloWorld = "Goodbye World!" -- TypeError: Type '"Goodbyte World"' could not be into '"Hello World!"'
```

### Type Casts

Sometimes, you may need to assist the typechecker by changing the type of a value using type casts, this can be done with the `::` keyword.

```lua
local numericValue  = 1

local value = numericValue :: any -- ok, all expressions may be cast to 'any'
local flag = numericValue :: boolean -- not ok, invalid 'number' to 'boolean' conversion
```

## Function Typing

Assume the following function:

```lua
local function add(x, y)
	return x + y
end
```

This function will add x to y, however it might error if a string is given to this function, Luau doesn't know that we want to only use numbers in this function. Lets rework this function such that it does constrain `x` and `y` to be numbers.

```lua
local function add(x: number, y: number)
	return x + y
end
```

By adding type annotations to the parameters of the function, Luau now knows that the function takes two numbers and throws a warning if you try to pass anything that isn't a number into the function.

```lua
add(5, 10) -- ok
add(5, "foo") -- TypeError: Type `string` could not be converted into `number`.
```

To define a return type, put a `:` operator at the end of the function definition.

```lua
local function add(x: number, y: number): number
```

To return multiple types, place all return types in brackets.

```lua
local function FindSource(script: BaseScript, pattern: string): (string, number)
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

Index types can be defined using `{[indexType] = valueType}`.

```lua
local frobulator: {[string]: any} = {
	Foo = "bar",
	Baz = 10
}
```

Tables can also have explicit string indices defined in a type.

```lua
type Car = {
	Speed: number,
	Drive: (Car) -> ()
}
```

## Variadics

Here's a function that calculates the sum of a variadic amount of numbers.

```lua
local function addLotsOfNumbers(...)
	local sum = 0

	for _, v in {...} do
		sum += v
	end

	return sum
end
```

As expected, this can take any value, and the typechecker wont raise a warning if you give it an invalid type, such as a `string`.

```lua
print(addLotsOfNumbers(1, 2, 3, 4, 5)) -- 15
print(addLotsOfNumbers(1, 2, "3", 4, 5)) -- attempt to add string to number
```

Instead, it is possible to assign a type to the `...`, just like how other types are assigned.

```lua
local function addLotsOfNumbers(...: number)
```

And now, the second line raises a type error.

```lua
print(addLotsOfNumbers(1, 2, 3, 4, 5))
print(addLotsOfNumbers(1, 2, "3", 4, 5)) -- TypeError: Type `string` could not be converted into `number`.
```

However, with a type definition, the following statement does not work.

```lua
type addLotsOfNumbers = (...: number) -> number -- Expected type, got ':'
```

Instead, use the syntax `...type` to define the variadic type.

```lua
type addLotsOfNumbers = (...number) -> number
```

## Unions and Intersections

It is possible to define a type to be two or more types, using a union or intersection.

```lua
type NumberOrString = number | string
type Object1 = {foo: string}
type Object2 = {bar: number}
type Object1and2 = Object1 & Object2 -- {foo: string} & {bar: number}
```

## Defining an Inferred Type

The `typeof` function can be used in a type definition to define an inferred type.

```lua
type Car = typeof {
	Speed = 0,
	Wheels = 4
} --> Car: {Speed: number, Wheels: number}
```

One way to use `typeof`, is to define a metatable type using `setmetatable` inside the `typeof` function.

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

Generics allow you to define at a most basic level, substitution types. Lets assume a basic object that creates a State object.

```lua
local State = {
	Key = "TimesClicked",
	Value = 0
}
```

The type for this state object without generics would be.

```lua
type State = {
	Key: string,
	Value: number
}
```

However, you may want to `Value` to be a type based on the incoming value, this can be done with generics. Generic types use the following basic shape:

```lua
type GenericType<T> = T
```

The `<T>` denotes a type that can be set to anything. The best way to visualize this is as a substitution type. 

```lua
type List<T> = {T}

local Names: List<string> = {"Bob", "Dan", "Mary"}
local Fibbonacci: List<number> = {1, 1, 2, 3, 5, 8, 13}
```

Generics can also have multiple substitutions inside the brackets.

```lua
type Map<K, V> = {[K]: V}
```

Using the state object above, it can be reworked to use a generic type.

```lua
type State<T> = {
	Key: string,
	Value: T
}
```

### Function Generics

Functions can also use generics, however, they behave a little differently when inference is introduced into it, using the State example again, it can be designed to infer the value of `T` from the function's incoming arguments

```lua
local function State<T>(key: string, value: T): State<T>
	return {
		Key = key,
		Value = value
	}
end

local Activated = State("Activated", false) -- State<boolean>
local TimesClicked = State("TimesClicked", 0) -- State<number>
```

### Type Packs

Type packs are an extension to variadics that allow the definition of generic variadics inside functions.

```lua
type Event<A...> = {
	Fire: (Event<A...>, A...)
	Connect: (Event<A...>, func: (A...) -> ())
}

-- the event can be defined with as many types as you want
local ChangedSignal: Event<string, any>

ChangedSignal:Connect(function(changedName, changedValue)
	-- changedName will be defined as a string
	-- changedValue will be defined as any
end)

ChangedSignal:Fire("Size", Vector2.new(100, 50)) --> ok
ChangedSignal:Fire(20, 100) --> not ok, number cannot be converted to string
```

Type packs are defined in functions using `...` on the right-hand side of a generic.

```lua
local function Signal<A...>(f: (A...) -> (), ...: A...)
```

## Type Exports

Types can be exported through `Class.ModuleScript` using the `export` keyword infront of a type definition.

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