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
    <td><InlineCode>and</InlineCode></td>
    <td>Evaluates as <InlineCode>true</InlineCode> only if both conditions are true</td>
  </tr>
  <tr>
    <td><InlineCode>or</InlineCode></td>
    <td>Evaluates as <InlineCode>true</InlineCode> if either condition is true</td>
  </tr>
  <tr>
    <td><InlineCode>not</InlineCode></td>
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

You can use `and` to test multiple conditions in [control structures](./control-structures.md) such as [`if` statements](./control-structures.md#if-statements) and [`while` loops](./control-structures.md#while-loops). For example, the following `if`—`then` statement tests that two conditions are both true:

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

You can use `or` to perform complex logical tests in [control structures](./control-structures.md). For example, the following `if`—`then` statement tests whether two conditions are true **or** a third condition is true:

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

You can also use the `not` operator to test for the opposite of an entire multi-condition statement. In the following code sample, the `if`—`then` conditional tests that it's neither true that three is greater than four nor is it true that five is greater than four.

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
    <td><InlineCode>==</InlineCode></td>
    <td>Equal to</td>
    <td><InlineCode>3 == 5</InlineCode> → <b>false</b></td>
    <td><InlineCode>__eq</InlineCode></td>
  </tr>
  <tr>
    <td><InlineCode>~=</InlineCode></td>
    <td>Not equal to</td>
    <td><InlineCode>3 ~= 5</InlineCode> → <b>true</b></td>
    <td></td>
  </tr>
  <tr>
    <td><InlineCode>&gt;</InlineCode></td>
    <td>Greater than</td>
    <td><InlineCode>3 &gt; 5</InlineCode> → <b>false</b></td>
    <td></td>
  </tr>
  <tr>
    <td><InlineCode>&lt;</InlineCode></td>
    <td>Less than</td>
    <td><InlineCode>3 &lt; 5</InlineCode> → <b>true</b></td>
    <td><InlineCode>__lt</InlineCode></td>
  </tr>
  <tr>
    <td><InlineCode>&gt;=</InlineCode></td>
    <td>Greater than or equal to</td>
    <td><InlineCode>3 &gt;= 5</InlineCode> → <b>false</b></td>
    <td></td>
  </tr>
  <tr>
    <td><InlineCode>&lt;=</InlineCode></td>
    <td>Less than or equal to</td>
    <td><InlineCode>3 &lt;= 5</InlineCode> → <b>true</b></td>
    <td><InlineCode>__le</InlineCode></td>
  </tr>
</table>

## Arithmetic

Lua supports the usual binary operators along with exponentiation, modulus, and unary negation.

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
    <td><InlineCode>+</InlineCode></td>
    <td>Addition</td>
    <td><InlineCode>1 + 1 = 2</InlineCode></td>
    <td><InlineCode>__add</InlineCode></td>
  </tr>
  <tr>
    <td><InlineCode>-</InlineCode></td>
    <td>Subtraction</td>
    <td><InlineCode>1 - 1 = 0</InlineCode></td>
    <td><InlineCode>__sub</InlineCode></td>
  </tr>
  <tr>
    <td><InlineCode>*</InlineCode></td>
    <td>Multiplication</td>
    <td><InlineCode>5 * 5 = 25</InlineCode></td>
    <td><InlineCode>__mul</InlineCode></td>
  </tr>
  <tr>
    <td><InlineCode>/</InlineCode></td>
    <td>Division</td>
    <td><InlineCode>10 / 5 = 2</InlineCode></td>
    <td><InlineCode>__div</InlineCode></td>
  </tr>
  <tr>
    <td><InlineCode>^</InlineCode></td>
    <td>Exponentiation</td>
    <td><InlineCode>2 ^ 4 = 16</InlineCode></td>
    <td><InlineCode>__pow</InlineCode></td>
  </tr>
  <tr>
    <td><InlineCode>%</InlineCode></td>
    <td>Modulus</td>
    <td><InlineCode>13 % 7 = 6</InlineCode></td>
    <td><InlineCode>__mod</InlineCode></td>
  </tr>
  <tr>
    <td><InlineCode>-</InlineCode></td>
    <td>Unary negation</td>
    <td><InlineCode>-2 = 0 - 2</InlineCode></td>
    <td><InlineCode>__unm</InlineCode></td>
  </tr>
</table>

## Compound Assignment

You can use compound assignment operators to set a variable equal to the result of an operation where the first parameter is the variable's current value.

The operation in a compound assignment occurs once. For example, if an expression generates a random index in a table, Luau uses the same index for both the operation and the assignment.

In the following examples, suppose `local x = 3`.

<table>
	<thead>
		<tr>
			<th>Operator</th>
			<th>Operation</th>
			<th>Example</th>
      <th>New Value of <InlineCode>x</InlineCode></th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><InlineCode>+=</InlineCode></td>
			<td>Addition</td>
      <td><InlineCode>x += 2</InlineCode></td>
      <td><InlineCode>5</InlineCode></td>
		</tr>
		<tr>
			<td><InlineCode>-=</InlineCode></td>
			<td>Subtraction</td>
      <td><InlineCode>x -= 2</InlineCode></td>
      <td><InlineCode>1</InlineCode></td>
		</tr>
		<tr>
			<td><InlineCode>*=</InlineCode></td>
			<td>Multiplication</td>
      <td><InlineCode>x *= 2</InlineCode></td>
      <td><InlineCode>6</InlineCode></td>
		</tr>
		<tr>
			<td><InlineCode>/=</InlineCode></td>
			<td>Division</td>
      <td><InlineCode>x /= 2</InlineCode></td>
      <td><InlineCode>1.5</InlineCode></td>
		</tr>
		<tr>
			<td><InlineCode>%=</InlineCode></td>
			<td>Modulus</td>
      <td><InlineCode>x %= 2</InlineCode></td>
      <td><InlineCode>1</InlineCode></td>
		</tr>
		<tr>
			<td><InlineCode>^=</InlineCode></td>
			<td>Exponentiation</td>
      <td><InlineCode>x ^= 2</InlineCode></td>
      <td><InlineCode>9</InlineCode></td>
		</tr>
		<tr>
			<td><InlineCode>..=</InlineCode></td>
			<td>Concatenation</td>
      <td><InlineCode>x ..= " World!" </InlineCode></td>
      <td><InlineCode>"3 World!"</InlineCode></td>
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
    <td><InlineCode>..</InlineCode></td>
    <td>Concatenates two strings</td>
    <td><InlineCode>print("Hello " .. "World!")</InlineCode></td>
    <td><InlineCode>__concat</InlineCode></td>
  </tr>
  <tr>
    <td><InlineCode>#</InlineCode></td>
    <td>Length of table</td>
    <td>If <InlineCode>tableVar = &#123;1, 2, 3}</InlineCode>, then <InlineCode>#tableVar == 3</InlineCode>.</td>
    <td><InlineCode>__len</InlineCode></td>
  </tr>
</table>
