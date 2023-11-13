---
title: Strings
description: Strings are sequence of characters, such as letters, numbers, and symbols.
---

The **string** data type is a sequence of characters, such as letters, numbers, and symbols. It's the data type for storing most text-based information.

## Declaring Strings

To declare a string variable, put quotes around the characters. It's more common to use double quotes (`"`), but single quotes (`'`) also work. If you want to include a single or double quote in your string, wrap your string around the other type of quote, or use an [escaped quote](#escaping-strings).

```lua
local string1 = "Hello world!"
print(string1)  --> Hello world!

local string2 = 'Hello "world"!'
print(string2)  --> Hello "world"!
```

To include both single and double quotes in a string, or to create multi-line strings, declare them using double brackets:

```lua
local string1 = [[Hello
world!
Hello "world"!
Hello 'world'!]]

print(string1)
--> Hello
--> world!
--> Hello "world"!
--> Hello 'world'!
```

If necessary, you can nest multiple brackets inside a string using the same number of equal signs in both the beginning and ending bracket:

```lua
local string1 = [=[Hello
[[world!]]
]=]

print(string1)
--> Hello
--> [[world!]]
```

## Combining Strings

To combine strings, **concatenate** them with two dots (`..`). Concatenating strings doesn't insert a space between them, so you'll need to include space(s) at the end/beginning of a preceding/subsequent string, or concatenate a space between the two strings.

```lua
local hello = "Hello"
local helloWithSpace = "Hello "
local world = "world!"

local string1 = hello .. world
local string2 = helloWithSpace .. world
local string3 = hello .. " " .. world

print(string1)  --> Helloworld!
print(string2)  --> Hello world!
print(string3)  --> Hello world!
```

Note that the `print()` command takes multiple arguments and combines them **with** spaces, so you can use `,` instead of `..` to yield spaces in `print()` outputs.

```lua
local hello = "Hello"
local world = "world"
local exclamationMark = "!"

print(hello .. world .. exclamationMark)  --> Helloworld!
print(hello, world .. exclamationMark)  --> Hello world!
print(hello, world, exclamationMark)  --> Hello world !
```

## Converting Strings

To convert a string to a number, use the `Global.LuaGlobals.tonumber()` function. If the string doesn't have a number representation, `Global.LuaGlobals.tonumber()` returns `nil`.

```lua
local numericString = "123"
print(tonumber(numericString))  --> 123

local alphanumericString = "Hello123"
print(tonumber(alphanumericString))  --> nil
```

## Escaping Strings

To escape a double- or single-quote string declaration and embed almost any character, put a backslash (`\`) before the character. For example:

- To embed a single quote in a single-quote string, use `\'`.
- To embed a double quote in a double-quote string, use `\"`.

```lua
local string1 = 'Hello \'world\'!'
print(string1)  --> Hello 'world'!

local string2 = "Hello \"world\"!"
print(string2)  --> Hello "world"!
```

Certain characters following backslashes produce special characters rather than escaped characters:

- To embed a new line, use `\n`.
- To embed a horizontal tab, use `\t`.

```lua
local string1 = "Hello\nworld!"
print(string1)
--> Hello
--> world!

local string2 = "Hello\tworld!"
print(string2)  --> Hello	world!
```

## String Interpolation

Luau supports string interpolation, a feature that lets you insert expressions into strings. Use backticks (`` ` ``) to declare an interpolated string. Then add expressions inside of curly brackets:

```lua
local world = "world"
local string1 = `Hello {world}!`
print(string1)  --> Hello world!
```

Although variables are the most common usage, you can use any expression, including math:

```lua
local world = "world"
local number = 1
local string1 = `Hello {world}, {number} time!`
local string2 = `Hello {world}, {number + 1} times!`
local letters = {"w", "o", "r", "l", "d"}
local string3 = `Hello {table.concat(letters)} a third time!`

print(string1)  --> Hello world, 1 time!
print(string2)  --> Hello world, 2 times!
print(string3)  --> Hello world a third time!
```

Standard escape rules apply for backticks, curly brackets, and backslashes:

```lua
local string1 = `Hello \`\{world\}\`!`
print(string1)  --> Hello `{world}`!
```

## Math Conversion

If you perform math operations on a string, Luau automatically converts the string to a number. If the string doesn't have a number representation, it throws an error.

```lua
print("55" + 10)  --> 65
print("55" - 10)  --> 45
print("55" * 10)  --> 550
print("55" / 10)  --> 5.5
print("55" % 10)  --> 5
print("Hello" + 10)	 --> print("Hello" + 10):1: attempt to perform arithmetic (add) on string and number
```

## String Pattern Reference

A **string pattern** is a combination of characters that you can use with
`Library.string.match()`, `Library.string.gmatch()`, and other functions to
find a piece, or substring, of a longer string.

### Direct Matches

You can use direct matches in a Luau function like `Library.string.match()`,
except for [magic characters](#magic-characters). For example, these commands
look for the word **Roblox** within a string:

```lua
local match1 = string.match("Welcome to Roblox!", "Roblox")
local match2 = string.match("Welcome to my awesome game!", "Roblox")
print(match1)  --> Roblox
print(match2)  --> nil
```

### Character Classes

Character classes are essential for more advanced string searches. You can use
them to search for something that isn't necessarily character-specific but
fits within a known category (class), including **letters**, **digits**,
**spaces**, **punctuation**, and more.

The following table shows the official character classes for Luau string
patterns:

<table>
<thead>
	<th>Class</th>
	<th>Represents</th>
	<th>Example Match</th>
</thead>
<tbody>
	<tr>
	<td><code>.</code></td>
	<td>Any character</td>
	<td><code>32kasGJ1%fTlk?@94</code></td>
	</tr>
	<tr>
	<td><code>%a</code></td>
	<td>An uppercase or lowercase letter</td>
	<td><code>aBcDeFgHiJkLmNoPqRsTuVwXyZ</code></td>
	</tr>
	<tr>
	<td><code>%l</code></td>
	<td>A lowercase letter</td>
	<td><code>abcdefghijklmnopqrstuvwxyz</code></td>
	</tr>
	<tr>
	<td><code>%u</code></td>
	<td>An uppercase letter</td>
	<td><code>ABCDEFGHIJKLMNOPQRSTUVWXYZ</code></td>
	</tr>
	<tr>
	<td><code>%d</code></td>
	<td>Any digit (number)</td>
	<td><code>0123456789</code></td>
	</tr>
	<tr>
	<td><code>%p</code></td>
	<td>Any punctuation character</td>
	<td><code>!@#;,.</code></td>
	</tr>
	<tr>
	<td><code>%w</code></td>
	<td>An alphanumeric character (either a letter <b>or</b> a number)</td>
	<td><code>aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789</code></td>
	</tr>
	<tr>
	<td><code>%s</code></td>
	<td>A space or whitespace character</td>
	<td><code>&nbsp;</code>, <code>\n</code>, and <code>\r</code></td>
	</tr>
	<tr>
	<td><code>%c</code></td>
	<td>A special <a href="https://wikipedia.org/wiki/Control_character">control character</a></td>
	<td></td>
	</tr>
	<tr>
	<td><code>%x</code></td>
	<td>A hexadecimal character</td>
	<td><code>0123456789ABCDEF</code></td>
	</tr>
	<tr>
	<td><code>%z</code></td>
	<td>The NULL character (<code>\0</code>)</td>
	<td></td>
	</tr>
</tbody>
</table>

For single-letter character classes such as `%a` and `%s`, the corresponding
uppercase letter represents the "opposite" of the class. For instance, `%p`
represents a punctuation character while `%P` represents all characters except
punctuation.

### Magic Characters

There are 12 "magic characters" which are reserved for special purposes in
patterns:

<table>
<tbody>
	<tr>
	<td><code>$</code></td>
	<td><code>%</code></td>
	<td><code>^</code></td>
	<td><code>*</code></td>
	<td><code>(</code></td>
	<td><code>)</code></td>
	</tr>
	<tr>
	<td><code>.</code></td>
	<td><code>[</code></td>
	<td><code>]</code></td>
	<td><code>+</code></td>
	<td><code>-</code></td>
	<td><code>?</code></td>
	</tr>
</tbody>
</table>

You can escape and search for magic characters using the `%` symbol. For
example, to search for **roblox.com**, escape the `.` (period) symbol by
preceding it with a `%` as in `%.`.

```lua
-- "roblox.com" matches "roblox#com" because the period is interpreted as "any character"
local match1 = string.match("What is roblox#com?", "roblox.com")
print(match1)  --> roblox#com

-- Escape the period with % so it is interpreted as a literal period character
local match2 = string.match("I love roblox.com!", "roblox%.com")
print(match2)  --> roblox.com
```

### Anchors

You can search for a pattern at the beginning or end of a string by using the
`^` and `$` symbols.

```lua
local start1 = string.match("first second third", "^first")  -- Matches because "first" is at the beginning
print(start1)  --> first

local start2 = string.match("third second first", "^first")  -- Doesn't match because "first" isn't at the beginning
print(start2)  --> nil

local end1 = string.match("first second third", "third$")  -- Matches because "third" is at the end
print(end1)  --> third

local end2 = string.match("third second first", "third$")  -- Doesn't match because "third" isn't at the end
print(end2)  --> nil
```

You can also use both `^` and `$` together to ensure a pattern matches only
the full string and not just some portion of it.

```lua
-- Using both ^ and $ to match across a full string
local match1 = string.match("Roblox", "^Roblox$")  -- Matches because "Roblox" is the entire string (equality)
print(match1)  --> Roblox

local match2 = string.match("I play Roblox", "^Roblox$")  -- Doesn't match because "Roblox" isn't at the beginning AND end
print(match2)  --> nil

local match3 = string.match("I play Roblox", "Roblox")  -- Matches because "Roblox" is contained within "I play Roblox"
print(match3)  --> Roblox
```

### Class Modifiers

By itself, a character class only matches **one** character in a string. For
instance, the following pattern (`"%d"`) starts reading the string from left
to right, finds the **first** digit (`2`), and stops.

```lua
local match = string.match("The Cloud Kingdom has 25 power gems", "%d")
print(match)  --> 2
```

You can use **modifiers** with any character class to control the result:

<table>
<thead>
	<th>Quantifier</th>
	<th>Meaning</th>
</thead>
<tbody>
	<tr>
	<td><code>+</code></td>
	<td>Match 1 or more of the preceding character class</td>
	</tr>
	<tr>
	<td><code>-</code></td>
	<td>Match as few of the preceding character class as possible</td>
	</tr>
	<tr>
	<td><code>*</code></td>
	<td>Match 0 or more of the preceding character class</td>
	</tr>
	<tr>
	<td><code>?</code></td>
	<td>Match 1 or less of the preceding character class</td>
	</tr>
	<tr>
	<td><code>%n</code></td>
	<td>For <code>n</code> between <b>1</b> and <b>9</b>, matches a substring equal to the <code>n</code>th captured string.</td>
	</tr>
	<tr>
	<td><code>%bxy</code></td>
	<td>The balanced capture matching <code>x</code>, <code>y</code>, and everything between (for example, <code>%b()</code> matches a pair of parentheses and everything between them)</td>
	</tr>
</tbody>
</table>

Adding a modifier to the same pattern (`"%d+"` instead of `"%d"`), outputs
`25` instead of `2`:

```lua
local match1 = string.match("The Cloud Kingdom has 25 power gems", "%d")
print(match1)  --> 2

local match2 = string.match("The Cloud Kingdom has 25 power gems", "%d+")
print(match2)  --> 25
```

### Class Sets

**Sets** should be used when a single character class can't do the whole job.
For instance, you might want to match both lowercase letters (`%l`) **and**
punctuation characters (`%p`) using a single pattern.

Sets are defined by brackets `[]` around them. In the following example,
notice the difference between using a set (`"[%l%p]+"`) and **not** using a
set (`"%l%p+"`).

```lua
local match1 = string.match("Hello!!! I am another string.", "[%l%p]+")  -- Set
print(match1)  --> ello!!!

local match2 = string.match("Hello!!! I am another string.", "%l%p+")  -- Non-set
print(match2)  --> o!!!
```

The first command (set) tells Luau to find both lowercase characters and
punctuation. With the `+` quantifier added after the entire set, it finds
**all** of those characters (`ello!!!`), stopping when it reaches the space.

In the second command (non-set), the `+` quantifier only applies to the `%p`
class before it, so Luau grabs only the first lowercase character (`o`) before
the series of punctuation (`!!!`).

Like character classes, sets can be "opposites" of themselves. This is done by
adding a `^` character at the beginning of the set, directly after the opening
`[`. For instance, `"[%p%s]+"` represents both punctuation and spaces, while
`"[^%p%s]+"` represents all characters **except** punctuation and spaces.

Sets also support **ranges** which let you find an entire range of matches
between a starting and ending character. This is an advanced feature which is
outlined in more detail on the
[Lua 5.1 Manual](https://www.lua.org/manual/5.1/manual.html#5.4.1).

### String Captures

String **captures** are sub-patterns within a pattern. These are enclosed in
parentheses `()` and are used to get (capture) matching substrings and save
them to variables. For example, the following pattern contains two captures,
`(%a+)` and `(%d+)`, which return two substrings upon a successful match.

```lua
local pattern = "(%a+)%s?=%s?(%d+)"

local key1, val1 = string.match("TwentyOne = 21", pattern)
print(key1, val1)  --> TwentyOne 21

local key2, val2 = string.match("TwoThousand= 2000", pattern)
print(key2, val2)  --> TwoThousand 2000

local key3, val3 = string.match("OneMillion=1000000", pattern)
print(key3, val3)  --> OneMillion 1000000
```

In the previous pattern, the `?` quantifier that follows both of the `%s`
classes is a safe addition because it makes the space on either side of the
`=` sign optional. That means the match succeeds if one (or both) spaces are
missing around the equal sign.

String captures can also be **nested** as the following example:

```lua
local places = "The Cloud Kingdom is heavenly, The Forest Kingdom is peaceful"
local pattern = "(The%s(%a+%sKingdom)[%w%s]+)"

for description, kingdom in string.gmatch(places, pattern) do
	print(description)
	print(kingdom)
end
--> The Cloud Kingdom is heavenly
--> Cloud Kingdom
--> The Forest Kingdom is peaceful
--> Forest Kingdom
```

This pattern search works as follows:

The `Library.string.gmatch()` iterator looks for a match on the entire
"description" pattern defined by the outer pair of parentheses. This stops at
the first comma and captures the following:

<table>
	<thead>
		<tr>
			<th width="8%">#</th>
			<th width="42%">Pattern</th>
			<th>Capture</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><b>1</b></td>
			<td><code>(The%s(%a+%sKingdom)[%w%s]+)</code></td>
			<td>The Cloud Kingdom is heavenly</td>
		</tr>
	</tbody>
</table>

Using its successful first capture, the iterator then looks for a match on the
"kingdom" pattern defined by the inner pair of parentheses. This nested
pattern simply captures the following:

<table>
	<thead>
		<tr>
			<th width="8%">#</th>
			<th width="42%">Pattern</th>
			<th>Capture</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><b>2</b></td>
			<td><code>(%a+%sKingdom)</code></td>
			<td>Cloud Kingdom</td>
		</tr>
	</tbody>
</table>

The iterator then backs out and continues searching the full string, capturing
the following:

<table>
	<thead>
		<tr>
			<th width="8%">#</th>
			<th width="42%">Pattern</th>
			<th>Capture</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><b>3</b></td>
			<td><code>(The%s(%a+%sKingdom)[%w%s]+)</code></td>
			<td>The Forest Kingdom is peaceful</td>
		</tr>
		<tr>
			<td><b>4</b></td>
			<td><code>(%a+%sKingdom)</code></td>
			<td>Forest Kingdom</td>
		</tr>
	</tbody>
</table>
