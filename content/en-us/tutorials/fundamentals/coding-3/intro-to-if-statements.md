---
title: Intro to if statements
description: Learn how to code if statements in Luau.
next: /tutorials/fundamentals/coding-3/traps-with-if-statements
prev: /tutorials/fundamentals/coding-3/landing
---

In experiences, there are often many cause-and-effect relationships. For example:

- If a player scores 10 points, then they win the game.
- If a player has a power-up, then they can run super fast.
- If a player says "Happy Birthday" in chat, then confetti rains.

Scripts use conditional statements to handle these types of situations. **Conditional statements** are lines of code that only run if certain conditions are true. One type of conditional statement is an **if/then statement**. In Luau, the syntax pattern for if statements looks like this:

```lua title="if then syntax"
   if "something happens" then
      -- Make something else happen
end
```

Code chunks using conditionals are **control structures.** Control structures are like flow diagrams in code form and can have several conditional statements.

## If statement practice

These steps show how to create a script that changes a part's color if a statement is true.

1. In **ServerScriptService**, create a new script and name it `TruthChecker`. Add an appropriate comment to the script.

   ```lua
   -- Changes the part if a condition is true

   ```

2. Create a new part named LieDetector.

### Format if statements

**Conditions** can come in various forms but are often simple statements like math equations. For example, if 1+1 equals 2, then run some code. Like ordinary math equations, conditional can use **operators** such as plus (`+`) or less than (`<`) to evaluate statements.

One particular operator to be aware of is `==`; it stands for "is equal to." So the statement `2 + 2 == 4` can be read as "two plus two is equal to four". Be very careful not to mix it up with `=`, which assigns new values to objects like variables.

1. Set up the empty conditional. In the script, type `if then`, and press <kbd>Enter</kbd> to autocomplete the conditional. The keyword `then` will be underlined because the code is incomplete.

   ```lua
     if then
     -- empty code
   end

   ```

2. After the keyword `if`, type a true statement such as `3 + 3 == 6`.

   ```lua
   if 3 + 3 == 6 then
   	-- empty code
   end
   ```

3. Within the conditional, reference the part you named LieDetector and change the part's `Color` property to green.

   ```lua
   if 3 + 3 == 6 then
   	workspace.LieDetector.Color = Color3.fromRGB(0, 255, 0)
   end
   ```

    <Alert severity="info">
      Indenting the lines of code within the conditional makes it easier to see where the code chunk starts and stops.
    </Alert>

4. **Test** your code. If three plus three is equal to six, the part will turn green.

## Check a false condition

Now, purposely change the statement to see what happens when the math equation is false.

1. In the if statement, change the equation to something inaccurate, such as `3 + 3 >= 10`.

   ```lua
   if 3 + 3 >= 10 then
   	workspace.LieDetector.Color = Color3.fromRGB(0, 255, 0)
   end
   ```

2. Test your code now. The part shouldn't turn green for a false statement.

### Math operators

The table below lists some common Luau operators. More information about operators can be found on [Luau Operators](../../../luau/operators.md).

<table>
<thead>
   <tr>
    <th>Symbol</th>
    <th>Meaning</th>
   </tr>
</thead>
<tbody>
   <tr>
    <td>`+`</td>
    <td>Addition</td>
   </tr>
   <tr>
    <td>`-`</td>
    <td>Subtraction</td>
   </tr>
   <tr>
    <td>`*`</td>
    <td>Multiplication</td>
   </tr>
   <tr>
    <td>`/`</td>
    <td>Division</td>
   </tr>
</tbody>
</table>

### Comparison operators

- `==` : Is equal to.
- `~=` : Is not equal to.
- `<` or `>` are used for less or greater than, respectively.
- `<=` or `>=` are used for less/greater than or equal to, respectively.

## Variables and properties

Conditional statements are also used to evaluate the status of properties and variables. The following steps check whether a variable was successfully assigned a value.

1. Delete all of the code and copy the following snippet into the script. Test it, and a new error appears in Output.

   ```lua
   local mysteryPart = workspace.MysteryPart

   -- Evaluates as true if MysteryPart was successfully assigned
   if mysteryPart then
   	workspace.LieDetector.Color = Color3.fromRGB(0, 255, 0)
   end
   ```

2. Insert a new part into the workspace named MysteryPart. Test again, and LieDetector should turn green.

3. Explore how properties can be evaluated with conditionals. Keep MysteryPart, but once again, delete your code and copy the code box below.

   ```lua
   local mysteryPart = workspace.MysteryPart

   -- Evaluates as true if MysteryPart is fully opaque
   if mysteryPart.Transparency == 0 then
   	workspace.LieDetector.Color = Color3.fromRGB(0, 255, 0)
   	mysteryPart.Transparency = .2
   end
   ```

4. Test the code, and if MysteryPart has the default transparency of 0, it will become ghostly while LieDetector turns green.

## Summary

Conditional statements check to see if a statement is accurate, and if so, run some code. If statements are a very common type of conditional statement. They use the pattern "If this is true, then do that."

Code chunks using conditional statements are called control structures. Control structures can hold multiple conditional statements.

In addition to evaluating if simple math statements are factual, conditionals are also used to check on the status of variables and properties.
