---
title: Intro to for loops
description: Use for loops to repeat code in this lesson for Luau. This lesson explains how for loops work and includes practice scripts.
next: /tutorials/fundamentals/coding-4/glow-lights-with-for-loops
prev: /tutorials/fundamentals/coding-4/repeat-code-with-while-loops
---

There are different ways to make code run over and over. If you want the code to only run a certain amount of times, use a **for loop**. This article will cover the logic behind for loops and demonstrate some practical examples, such as coding a countdown.

## How for loops work

For loops use three values to control how many times they run: a **control** variable, an **end** value, and an **increment** value. Starting from the value of the control variable, the for loops will either count up or down each time it runs code inside the loop until it passes the end value. Positive increment values count up, and negative increment values count down.

<img src="../../../assets/education/coding-4/forLoop_annotatedExample.png" width="50%" />

<Alert severity="info">
Different computer languages might use other terminology with for loops. For instance, in C# or JavaScript, the end value might be called the condition.
</Alert>

## Steps in a for loop

To understand for loops, it helps to see a flow chart diagram showing the logic of how they progress.

First, the for loop compares the control variable with the end value.

<img src="../../../assets/education/coding-4/forLoopDiagram_generic1.png" width="75%" />

After running the code, the increment value is added to the control variable. The loop then checks the control variable and starts over.

<img src="../../../assets/education/coding-4/forLoopDiagram_generic2.png" width="75%" />

Once the control variable passes the end value, the loop will stop. For example, if a loop has an end value of 10, once the control variable has passed 10, the for loop will stop.

<img src="../../../assets/education/coding-4/forLoopDiagram_generic3.png" width="75%" />

## Code a countdown

To see how a for loop works, use these steps to code a for loop that starts at 10 and counts down to 0, one number at a time. Every time the loop runs, it'll print the current value inside the control variable.

1. In **ServerScriptService**, create a new script named PracticeLoop. In the script, start by typing the keyword `for`.

   ```lua
   for
   ```

2. Create a **control variable** named `count` and set a starting value of 10.

   ```lua
   for count = 10
   ```

3. Set the **end value** to 0, by typing `, 0`. Make sure to include a comma to separate the values.

   ```lua
   for count = 10, 0
   ```

4. Create an **increment value** of -1 by typing `, -1`. After the loop has finished its action, it'll add the increment value to the control variable, count. Because the increment is negative, it'll be subtracted when added to the control variable.

   ```lua
   for count = 10, 0, -1
   ```

   <Alert severity="info">
   A for loop doesn't explicitly need an increment. Without one, the loop will, by default, add 1 after each loop.

   `for count = 10, 0`
   </Alert>

5. To finish the for loop, type do and press <kbd>Enter</kbd> to add `end`. Any code typed between `do` and `end` will run each time the loop repeats.

   ```lua
   for count = 10, 0, -1 do

   end
   ```

6. Inside the loop, create a countdown by printing the value of the control variable, `count`, and then delay the script with a wait function.

   ```lua
   for count = 10, 0, -1 do
   	-- Prints the current number the for loop is on
   	print(count)
   	-- Wait 1 second
   	task.wait(1)
   end
   ```

7. Run the project and watch the Output window to see the for loop.

   Notice that the loop will print out the current value of count each time it goes through an **iteration**. An iteration is the complete process of checking the control value, running code, and updating the increment value. Because the control variable starts at 0 and has to go pass 10, the loop will go through 11 iterations before stopping.

### Troubleshooting tips

At this point, if the loop doesn't work as intended, try one of the following below.

- Check that you have **two commas** separating the numbers in your for loop. Having extra or missing commas will make the loop not start.
- If the for loop prints all at once, make sure that there is a wait function that uses at least 1 second.

## Different for loop examples

Changing the three values of a for loop will change how the loop functions. Below are different examples of for loops with different start, end, and increment values. Try putting them into scripts and see what happens.

### Count up by one

```lua
for count = 0, 5, 1 do
	print(count)
	task.wait(1)
end
```

### Count up in even numbers

```lua
for count = 0, 10, 2 do
	print(count)
	task.wait(1)
end
```

### If for loops don't run at all

If the control variable starts out **beyond** the end value, like in the example below, the for loop won't run at all.

```lua
for count = 10, 0, 1 do
	print(count)
	task.wait(1)
end
```

In this case, the for loop is counting up and checking if count is greater than 0. When the for loop does it's first check, it sees that 10 is greater than 0, and so it'll stop the loop without printing anything.

## Summary

A for loop is a common type of loop that's used when a set of instructions should repeat a specific amount of times. To create a for loop, use three variables with the syntax below:

```lua
for count = 0, 10, 1 do
	print(count)
end
```

In the example above, the loop will start at 0. For each loop, it will print the count variable, add 1 to count, and finally finish looping when count is equal to 10.
