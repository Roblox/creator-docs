---
title: Numbers
description: A double-precision floating-point number.
---

The **number** data type, or `double`, represents a [double-precision (64-bit) floating-point](https://wikipedia.org/wiki/Double-precision_floating-point_format) number. Numbers can range from -1.7 \* 10<sup>308</sup> to 1.7 \* 10<sup>308</sup> (around 15 digits of precision, positive or negative).

## Signed and unsigned

The sign of the number indicates whether it's positive or negative. For example, `1` is positive and `-1` is negative. In Luau, the number `-0` is equivalent to `0`.

```lua
print(0 == -0)  --> true
print(-0 > 1)  --> false
print(-0 < 1)  --> true
print(-0 > -1)  --> true
print(-0 < -1)  --> false
```

## Number classifications

Luau doesn't distinguish between integers and numbers, but the API reference sometimes distinguishes between them to be more specific about how to use each API.

### float

The `float` number type refers to a real number with a decimal place. In computer science terms, they are [single-precision (32-bit) floating-point number](https://wikipedia.org/wiki/Single-precision_floating-point_format), which isn't as precise as double-precision floating-point numbers, but is sufficiently precise for most use cases and requires less memory and storage.

### int

The `integer` number type, or `int`, refers to a 32-bit whole number, which ranges from -2<sup>31</sup> to 2<sup>31</sup> - 1. Properties and functions that expect integers may automatically round or raise errors when you assign or pass non-integers to them.

### int64

The `int64` number type refers to a signed 64-bit integer, which ranges from -2<sup>63</sup> to 2<sup>63</sup> - 1. This type of integer is common for methods that use ID numbers from the Roblox website. For example, `Class.Player.UserId` is an `int64`, and `Class.MarketplaceService:PromptPurchase()` and `Class.TeleportService:Teleport()` each expect `int64` for the ID arguments.

## Notation

Numbers are notated with the most significant digits first (big-endian). There are multiple ways to notate number literals in Luau:

- [Decimal (base-10)](https://wikipedia.org/wiki/Decimal) — Write the digits of the number normally using digits 0–9 with a single optional decimal point, for example `7`, `1.25`, or `-22.5`.
- [Scientific notation](https://wikipedia.org/wiki/Scientific_notation) — Write a decimal number followed by `e` or `e+`, then an integer to raise the decimal number to a power of 10. For instance, `12e3` is 12 × 10^3 (12,000).
- [Hexadecimal (base-16)](https://wikipedia.org/wiki/Hexadecimal) — Begin the number with `0x` followed by digits 0–9 or A–F (capitalization ignored). For example, `0xF` is 15 and `0x3FC` is 1020.
- [Binary (base-2)](https://wikipedia.org/wiki/Binary_number) — Begin the number with `0b` followed by 0s or 1s, for instance `0b1100` (12 in decimal format).

<Alert severity="info">
To aid in the readability of long numbers, you can include underscores anywhere within a number literal without changing the value, <b>except</b> at the beginning where this would make it an identifier. For example, `1_234_567` is the same as `1234567`, both of which are equal to 1,234,567.
</Alert>

## Operations

You can use logical and relational [operators](./operators.md) to manipulate and compare numbers. You can also use mathematical functions such as `Library.math.sqrt()` and `Library.math.exp()` in the `Library.math` library and bitwise operations in the `Library.bit32` library.

## Type introspection

You can determine if a value `x` is a number by using `type(x)` or `typeof(x)`. Both return the string `number` if `x` is a number.

```lua
local testInt = 5
local testDecimal = 9.12761656
local testString = "Hello"

print(type(testInt))  --> number
print(type(testDecimal))  --> number
print(type(testString))  --> string

print(typeof(testInt))  --> number
print(typeof(testDecimal))  --> number
print(typeof(testString))  --> string
```

## Round functions

You can round numbers using `Library.math.floor()`, `Library.math.ceil()`, or `Library.math.modf()`. These functions return an integer result if Luau can represent it as an integer. If the number is too large, Luau returns it as a float.

- To determine if a number `x` is an integer, use `math.floor(x) == x`.
- To round a number down, use `Library.math.floor()`.
- To round a number up, use `Library.math.ceil()`.
- To round a number towards zero, use `Library.math.modf()`. It also returns the fractional difference of the rounded number as a second result.

```lua
print(math.floor(3.3))  --> 3
print(math.floor(-3.3))  --> -4
print(math.ceil(3.3))  --> 4
print(math.ceil(-3.3))  --> -3
print(math.modf(3.3))  --> 3 0.2999999999999998
print(math.modf(-3.3))  --> -3 -0.2999999999999998
```
