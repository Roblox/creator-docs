---
title: Coding a Function
description: What a function is, and how to code a function in Roblox Lua
next: /tutorials/fundamentals/coding-2/using-parameters-and-events
prev: /tutorials/fundamentals/coding-1/parents-and-children
---

**Functions** are sets of instructions that can be used many times in a script. There are pre-made functions (also called methods) like `print()` and `Library.task.wait()` that are built into most programming languages. Coders can also create their own custom functions for code they want to use more than once, but don't feel like writing over and over. In Lua, this is done by typing:
`local function NameOfTheFunction()`

Functions can be thought of like a recipe. They're both lists of specific instructions. For example, you could use a function to teach a robot how to make spaghetti. First, make a `local function` that lists the steps to prep the meal. Then, whenever you want dinner, just say, "Robot, run makeSpaghetti()".

The steps to make dinner might look like this:

1. Boil water
2. Add pasta
3. Cook 15 minutes
4. Add sauce
5. Serve on a plate

While the code version might look like something like this:

```lua
local function makeDinner()
    -- List of instructions
end

-- Tell the code to run
makeDinner()

```

## Creating a Function

To practice, your first function will print your favorite food in the Output Window. First set up the script you're going to use, if you don't remember how, here's a reminder:

1. Create a new script in **ServerScriptService**.
2. Rename the script _FunctionsPractice_.
3. Delete `"Hello World"`.
4. Add comment at the top. For example: `-- Prints your favorite food`

Next, you create and name the function. All functions should have names that help you remember what their purpose is. Functions names are camelCased, with the first letter lowercase and next words capitalized.

Examples: `addPoints()`, `restartGame()`, `rainFlamingLlamas()`

- Type `local function printFood()`, then press <kbd>Enter</kbd> on your keyboard. It should autocomplete the function to look like:

```lua
local function printFood()

end
```

<Alert severity="warning">
Type end yourself if the code doesn't autocomplete for some reason. If the function doesn't have an end, your code won't run.
</Alert>

### Adding Code to Functions

All of the code for your function has to be typed between the lines `local function printFood()` and `end`. Any code not between those two points won't run when the function does.

```lua
local function printFood()
      -- Code here runs when the function is called
end

-- Code here will not run
```

Information that is inside the function, or can be used by the function, is in **scope**.

- Between `local function printFood()` and `end`, use `print()` to state your favorite food.

```lua
local function printFood()
   print("Curry")
end
```

<Alert severity="success">
As you typed, your code should have indented automatically. This makes it easier for you and others to see the start and end of a function. If it didn't auto indent, you can press <kbd>Tab</kbd> at the beginning of the line to quickly indent it.
</Alert>

### Telling the Function to Run

There's one more thing we need to do before the function will work, and that's to tell it to run, also known as **calling** a function. Functions won't run until they are called. To call a function, type the function's name including the `()` at the end.

1. Under `end`, type `printFood()`.

   ```lua
   local function printFood()
      print("Curry")
   end

   printFood()
   ```

2. Test the code. Your favorite food should appear in the Output window.

   <img src="../../../assets/education/coding-2/output-function-example.png" width="70%" />

### Troubleshooting Tips

If your code doesn't run, check for errors such as the following:

- Check that `print("Your Food Here")` is between `local function printFood()` and `end`.
- Make that your food is a string, with quotations on `"each side"`.
- Check that the function is called after it's been created. `printFood()` should be below `end`.
