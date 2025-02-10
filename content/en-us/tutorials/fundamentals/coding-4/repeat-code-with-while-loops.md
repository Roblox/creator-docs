---
title: Repeat code with while loops
description: Learn how to use while loops with Roblox's Luau language in this computer science lesson.
next: /tutorials/fundamentals/coding-4/intro-to-for-loops
prev: /tutorials/fundamentals/coding-4/landing
---

Many things in computer science or game development often repeat. For instance, an app might update content in a feed every few seconds, or a game might reward players a prize every day they're logged in. To accomplish this behavior, coders often use **loops**.

In computer science, a **loop** is a coding pattern that repeats a set of instructions, often until a specific condition is met. To practice this, you'll code a part that changes colors indefinitely. Later lessons will show how to stop the looping.

<video controls src="../../../assets/education/coding-4/loops-and-parts-finishedPart.mp4" width="100%"></video>

## Set up the part and script

Use any Roblox project for this exercise. When finished, this part can be used as a way of decorating an environment.

1. Create a new part with a descriptive name. This lesson uses **LoopingPart**.
2. In **ServerScriptService**, add a new script named LoopingScript.
3. In the script, delete `Hello World` and write a **comment** stating the purpose of this script.

   ```lua
   -- Changes the color of LoopingPart every few seconds
   ```

## Use variables to store a part

Variables can also hold references to objects besides strings. For example, when a script knows the reference to a part, the script can change it.

Rather than typing `workspace.NameOfYourPart` over and over, that entire line can be stored inside a local variable. Local variables are created by typing `local` and then the name of the variable.

For example: `local nameOfVariable`.

<Alert severity="info">
A local variable only works in the script where it was created. If a local variable named `part1` is created in Script1, it cannot be used in Script2. Most variables you use will be local variables.
</Alert>

1. Under the comment, create a local variable by typing `local loopingPart`.

   ```lua
   -- Changes the color of LoopingPart every few seconds
   local loopingPart
   ```

2. Set the variable to the looping part by typing `= workspace.LoopingPart` on the same line. Remember that the `=` operator sets the value of a variable to whatever is on the right of it.

   ```lua
   -- Changes the color of LoopingPart every few seconds
   local loopingPart = workspace.LoopingPart
   ```

   <Alert severity="info">
   Remember that the `=` operator sets the value of a variable to whatever is on the right of it.
   </Alert>

## While loops

Before creating the while loop for the color changing part, it's worthwhile to explain its syntax. A while loop has three components:

- The `while` keyword.
- A condition, always after the keyword.
- Instructions, between the `do` and `end` keywords.

In loops, conditions can be a variety of logical statements. Some examples might be if two numbers are the same. A loop will run if its condition is true.

Notice in the sample below, the condition is true, meaning this loop will run forever. In later lessons, you'll code specific conditions that stop.

```lua
while true do
	print("This loop is running")
end
```

## Code a while loop

Next, you'll set up the while loop for the color changing part.

1. On the next line type `while true do`. Then, press <kbd>Enter</kbd> to autocomplete and add the word `end`.

   ```lua
   -- Changes the color of loopingPart every few seconds
   local loopingPart = workspace.LoopingPart

   -- Looping Code
   while true do

   end
   ```

   <Alert severity="info">
   You might have noticed the editor automatically added `end` to the script and indented the next line of code. Indenting makes code easier to read. Instructions in a loop should **always** be indented.
   </Alert>

### Add code in the loop

With the while loop created, instructions can be added to change the part's color over time. Inside the loop, add a line of code for each color. Each color will use RGB values, a way of storing colors as numbers in computer science.

1. Between `while true do` and `end`, set the Color property of the part to `Datatype.Color3.fromRGB()`.

   ```lua
   local loopingPart = workspace.LoopingPart

   while true do
   	loopingPart.Color = Color3.fromRGB()
   end
   ```

2. Setting the color can be done using a color picker in Studio. To do so, left click inside the `()` next to `fromRGB`. Then, click on the color wheel icon. Once you have a desired color, press OK to automatically add the color value in the code.

   ```lua
   local loopingPart = workspace.LoopingPart

   while true do
   	loopingPart.Color = Color3.fromRGB(82, 227, 255)
   end
   ```

   <Alert severity="info">
   If desired, a color can be created manually by assigning a value in each number from 0 to 255.
   </Alert>

### Make the script wait

If you add a second line of color changing code right now, it would change the brick's color so fast you might not even see the first color go by. To make the script wait before running the next line of code, use a `Library.task.wait()` function.

1. On the line after changing the brick color, type `task.wait(3)`. Whatever number placed inside the `()` is how many seconds the script will wait.

   ```lua
   local loopingPart = workspace.LoopingPart

   while true do
   	loopingPart.Color = Color3.fromRGB(82, 227, 255)
   	task.wait(3)
   end
   ```

2. Under the wait function, repeat the same process of adding a new color. Finish it with an additional wait function.

   ```lua
   while true do
   	loopingPart.Color = Color3.fromRGB(82, 227, 255)
   	task.wait(3)
   	loopingPart.Color = Color3.fromRGB(177, 52, 255)
   	task.wait(3)
   end
   ```

   <Alert severity="warning">
   As you add more code in the loop, make sure it's all in **scope**, meaning code is in the right place. In order for code to run in the loop, it has to be between the `while true do` and before `end`.
   </Alert>

3. Test the code and see if the colors change.

   <video controls src="../../../assets/education/coding-4/loops-and-parts-finishedPart.mp4" width="100%"></video>

**Troubleshooting Notes**  
At this point, if the color changing part doesn't work as intended, try one of the following below.

**Issue**: Colors are skipped

- Make sure you have a wait function between each color change, especially at the last line.
- Check that all the color change and wait code is between the `while true do` and `end` sections.

**Issue**: Part is still gray or doesn't change color as intended

- Make sure all RGB values have numbers from 0 to 255, are whole or decimals, and are separated by commas.
- The numbers inside the `()` of a wait function should be greater than 1. It's possible that if a wait is too short, you may not see that color.

## Complete color looping part script

```lua
-- Create a variable to store the part
local loopingPart = workspace.LoopingPart

-- Looping Code
while true do
	-- Changes loopingPart's color
	loopingPart.Color = Color3.fromRGB(82, 227, 255)
	-- Wait 3 seconds before next instruction
	task.wait(3)
	loopingPart.Color = Color3.fromRGB(177, 52, 255)
	task.wait(3)
end
```

## Summary

Loops are a common element in most computer languages. They are used to repeat instructions, sometimes until specific conditions are met. In this article, the while loop is used to repeat instructions forever. To create a while loop that repeats forever, use the syntax below, being sure to include instructions between the `do` and `end` keywords.

```lua
while true do
	-- Instructions
end
```
