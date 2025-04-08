---
title: Operators
description: Operators are symbols for performing an operation or conditional evaluation.
---

An **operator** is a symbol for performing an operation or conditional evaluation.

## Logical

Logical operators return values depending on the boolean values of the given arguments. If an argument isn't `false` or `nil`, then the operator evaluates it as `true`. Unlike many other languages, Luau considers both zero and the empty string as `true`. The following table summarizes how logical operators behave in [conditionals](./control-structures.md#if-statements).

<table>
  <thead>
    <tr>
      <th>Operator</th>
      <th>Descriptions</th>
    </tr>
  </thead>
  <tr>
    <td>`and`</td>
    <td>Evaluates as `true` only if both conditions are true</td>
  </tr>
  <tr>
    <td>`or`</td>
    <td>Evaluates as `true` if either condition is true</td>
  </tr>
  <tr>
    <td>`not`</td>
    <td>Evaluates as the opposite of the condition</td>
  </tr>
</table>

### and

The binary operator `and` returns one of the two arguments. If the first argument evaluates to `true`, then it returns the second argument. Otherwise, it returns the first argument.

```lua
print(4 and 5) -- 5
print(nil and 12) -- nil
print(false and 12) -- false
print(false and true) -- false
print(false and false) -- false
print(true and false) -- false
print(true and true) -- true
```

You can use `and` to test multiple conditions in [control structures](./control-structures.md) such as [`if` statements](./control-structures.md#if-statements) and [`while` loops](./control-structures.md#while-loops). For example, the following `if`‑`then` statement tests that two conditions are both true:

```lua
local pasta = true
local tomatoSauce = true

if pasta == true and tomatoSauce == true then
	print("We have spaghetti dinner")
else
	print("Something is missing...")
end
-- Output: We have spaghetti dinner
```

### or

The binary operator `or` returns one of the two arguments. If the first argument evaluates to `true`, then it returns the first argument. Otherwise, it returns the second argument.

```lua
local y = x or 1
print(y) -- 1 because x doesn't exist and is therefore nil

local d = false
local e = d or 1
print(e) -- 1 because d is false

print(4 or 5) -- 4
print(nil or 12) -- 12
print(false or 12) -- 12
print(false or true) -- true
print(false or false) -- false
print(true or false) -- true
print(true or true) -- true
```

You can use `or` to perform complex logical tests in [control structures](./control-structures.md). For example, the following `if`‑`then` statement tests whether two conditions are true **or** a third condition is true:

```lua
local pasta = false
local tomatoSauce = true
local garlicBread = true

if (pasta == true and tomatoSauce == true) or garlicBread == true then
	print("We have either spaghetti dinner OR garlic bread")
else
	print("Something is missing...")
end

-- Output: We have either spaghetti dinner OR garlic bread
```

### not

The unary operator `not` returns the opposite boolean value of the argument. If the argument is `false` or `nil`, then it returns `true`. Otherwise, it returns `false`.

```lua
print(not true) -- false
print(not false) -- true
print(not nil) -- true
print(not "text") -- false
print(not 0) -- false
```

You can use the `not` operator to trigger a conditional or loop if a variable is `false` or `nil`.

```lua
local nilVariable  -- Variable is declared but has no value, so it's nil
local falseVariable = false  -- Variable is declared with value of false

if not nilVariable then
	print(nilVariable)  -- Outputs "nil" because nil isn't true
end

if not falseVariable then
	print(falseVariable)  -- Outputs "false" because false isn't true
end
```

You can also use the `not` operator to test for the opposite of an entire multi-condition statement. In the following code sample, the `if`‑`then` conditional tests that it's neither true that three is greater than four nor is it true that five is greater than four.

```lua
local three = 3
local four = 4
local five = 5

if not (three > four or five < four) then
	print("Three is less than 4 and five is greater than 4.")
end

-- Output: Three is less than 4 and five is greater than 4.
```

## Relational

Relational operators compare two parameters and return a [`boolean`](./booleans.md): `true` or `false`.

<table>
  <thead>
    <tr>
      <th>Operator</th>
      <th>Description</th>
      <th>Example</th>
      <th>Associated metamethod</th>
    </tr>
  </thead>
  <tr>
    <td>`==`</td>
    <td>Equal to</td>
    <td>`3 == 5` → `false`</td>
    <td>`__eq`</td>
  </tr>
  <tr>
    <td>`~=`</td>
    <td>Not equal to</td>
    <td>`3 ~= 5` → `true`</td>
    <td></td>
  </tr>
  <tr>
    <td>`>`</td>
    <td>Greater than</td>
    <td>`3 > 5` → `false`</td>
    <td></td>
  </tr>
  <tr>
    <td>`<`</td>
    <td>Less than</td>
    <td>`3 < 5` → `true`</td>
    <td>`__lt`</td>
  </tr>
  <tr>
    <td>`>=`</td>
    <td>Greater than or equal to</td>
    <td>`3 >= 5` → `false`</td>
    <td></td>
  </tr>
  <tr>
    <td>`<=`</td>
    <td>Less than or equal to</td>
    <td>`3 <= 5` → `true`</td>
    <td>`__le`</td>
  </tr>
</table>

## Arithmetic

Luau supports the usual binary operators along with exponentiation, modulus, and unary negation.

<table>
  <thead>
    <tr>
      <th>Operator</th>
      <th>Description</th>
      <th>Example</th>
      <th>Associated metamethod</th>
    </tr>
  </thead>
  <tr>
    <td>`+`</td>
    <td>Addition</td>
    <td>`1 + 1 = 2`</td>
    <td>`__add`</td>
  </tr>
  <tr>
    <td>`-`</td>
    <td>Subtraction</td>
    <td>`1 - 1 = 0`</td>
    <td>`__sub`</td>
  </tr>
  <tr>
    <td>`*`</td>
    <td>Multiplication</td>
    <td>`5 * 5 = 25`</td>
    <td>`__mul`</td>
  </tr>
  <tr>
    <td>`/`</td>
    <td>Division</td>
    <td>`10 / 5 = 2`</td>
    <td>`__div`</td>
  </tr>
  <tr>
    <td>`//`</td>
    <td>Floor Division</td>
    <td>
      `10 // 4 = 2`<br />
      `-10 // 4 = -3`
    </td>
    <td>`__idiv`</td>
  </tr>
  <tr>
    <td>`^`</td>
    <td>Exponentiation</td>
    <td>`2 ^ 4 = 16`</td>
    <td>`__pow`</td>
  </tr>
  <tr>
    <td>`%`</td>
    <td>Modulus</td>
    <td>`13 % 7 = 6`</td>
    <td>`__mod`</td>
  </tr>
  <tr>
    <td>`-`</td>
    <td>Unary negation</td>
    <td>`-2 = 0 - 2`</td>
    <td>`__unm`</td>
  </tr>
</table>

## Compound assignment

You can use compound assignment operators to set a variable equal to the result of an operation where the first parameter is the variable's current value.

The operation in a compound assignment occurs once. For example, if an expression generates a random index in a table, Luau uses the same index for both the operation and the assignment.

In the following examples, suppose `local x = 3`.

<table>
  <thead>
    <tr>
      <th>Operator</th>
      <th>Operation</th>
      <th>Example</th>
      <th>New Value of `x`</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>`+=`</td>
      <td>Addition</td>
      <td>`x += 2`</td>
      <td>`5`</td>
    </tr>
    <tr>
      <td>`-=`</td>
      <td>Subtraction</td>
      <td>`x -= 2`</td>
      <td>`1`</td>
    </tr>
    <tr>
      <td>`*=`</td>
      <td>Multiplication</td>
      <td>`x *= 2`</td>
      <td>`6`</td>
    </tr>
    <tr>
      <td>`/=`</td>
      <td>Division</td>
      <td>`x /= 2`</td>
      <td>`1.5`</td>
    </tr>
    <tr>
      <td>`//=`</td>
      <td>Floor Division</td>
      <td>`x //= 2`</td>
      <td>`1`</td>
    </tr>
    <tr>
      <td>`%=`</td>
      <td>Modulus</td>
      <td>`x %= 2`</td>
      <td>`1`</td>
    </tr>
    <tr>
      <td>`^=`</td>
      <td>Exponentiation</td>
      <td>`x ^= 2`</td>
      <td>`9`</td>
    </tr>
    <tr>
      <td>`..=`</td>
      <td>Concatenation</td>
      <td>`x ..= " World!" `</td>
      <td>`"3 World!"`</td>
    </tr>
  </tbody>
</table>

## Miscellaneous

Miscellaneous operators include **concatenation** and **length**.

<table>
  <thead>
    <tr>
      <th>Operator</th>
      <th>Description</th>
      <th>Example</th>
      <th>Associated metamethod</th>
    </tr>
  </thead>
  <tr>
    <td>`..`</td>
    <td>Concatenates two strings</td>
    <td>`print("Hello " .. "World!")`</td>
    <td>`__concat`</td>
  </tr>
  <tr>
    <td>`#`</td>
    <td>Length of table</td>
    <td>If `tableVar = {1, 2, 3}`, then `#tableVar == 3`.</td>
    <td>`__len`</td>
  </tr>
</table>
