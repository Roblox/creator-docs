---
title: Create a script
description: Learn how to create a script in Roblox Studio using Luau. Great for beginners interested in coding or computer science on Roblox.
next: /tutorials/fundamentals/coding-1/object-properties
prev: /tutorials/fundamentals/coding-1/landing
---

**Coding** is the process of creating instructions for computers to follow. Just like people use different languages, such as English and Spanish, so do programs. Roblox uses the coding language **Luau**.

This article will cover how to start coding in Roblox, introducing common concepts like scripts, data types, and variables. By the end, you'll be able to type out code that displays messages in Roblox Studio.

## Code with scripts

In Roblox Studio, lines of Luau code are held in **scripts**. These scripts give the experience sets of instructions on how to give players health points, create a rain of fireballs, or anything else imaginable.

### Create a script

Scripts are commonly created in **ServerScriptService**, a special folder made just for holding scripts.

1. In Explorer, hover over **ServerScriptService** to see the **+** button.
   <img src="../../../assets/education/coding-1/hover-over-serverscriptservice_400x400.png" width="40%" />

2. Click the **+** button and select **Script**. A new script will be created and the script editor will open.

3. Right-click Script and select **Rename**. Name the script _PracticeScript_. Naming scripts helps you and any teammates remember what each script does.

### Hello world

New scripts include a print function at the top of the script editor. **Print functions** display text on the screen. It's one of the first functions many people learn, and you'll use it often. This code will make "Hello world!" appear on the screen.

```lua title = 'Default code'
print("Hello world!")
```

To find the script next time you open up Roblox Studio, click on the name of the script above the 3D viewport, or double-click the script's name in Explorer.

### Test output

You can see the result of running the default code with the **Output** window. If you've never used it before, you'll need to enable it.

1. From Studio's Window menu, open the [Output](../../../studio/output.md) window.
2. To test the script, [initiate a playtest](../../../studio/testing-modes.md#playtesting). `Hello world!` will show up in the output.

   <img src="../../../assets/education/coding-1/helloworld-output_800x150.png" width="80%"/>

3. Click **Stop** to end the playtest. You can now return to the **Script** tab.

## Identify data types

Coding languages classify different kinds of values into **data types**. For example, one data type is a **number**. Number data types are self-explanatory as they are made up of only numbers.

Another data type is a **string**. Strings can hold numbers, letters, and characters. Take another look at the default code in the new script; the words and quotations within the parenthesis is an example of a **string** data type.

```lua title = 'Default code'
print("Hello world!")
```

Strings like `"Hello World"` always sit inside quotation marks, `"like this"`. More examples of strings are below. Notice how they hold a mix of letters and numbers.

- `"You just joined the game!"`
- `"There are 50 players left"`
- `"10"`

## Create variables

**Variables** are containers for information the program can use and change, like player names or points.

**Declaring** a variable is what coders call the process of creating a new variable. In Luau, to declare a new variable, type `local`, then type the name for the new variable. A variable that can hold a player name might look like: `local playerName`

<Alert severity="info">
When declaring new variables, some coding languages require that you also state what data type the variable can use. For example, a variable in Java would be `String name = "Pavel"`. Luau only requires a name.
</Alert>

In Luau, variables can be global or local. You'll usually use **local** variables. Local variables can only be used within the script or chunk of code where they were created. Global variables can potentially be used by other scripts, but too many global variables can make your experience slow and unresponsive. It's better to stay in the habit of making variables local unless necessary.

### Use variables and strings together

Time to declare your own variables. These steps will use a string to store the name of your favorite animal.

1. Delete `print("Hello world!")`. It's best practice not to leave unnecessary code in your scripts.

2. Declare a new variable by first typing `local`, then naming the variable `myAnimal`.

   ```lua title = 'Declares a new variable'
   local myAnimal
   ```

<Alert severity='warning'>
  Variable names can't include spaces. Be careful not to include spaces or the code won't work as intended.
</Alert>

### Name variables

Variables can be named anything, but good names will always describe their purpose. Generic names make your code difficult to read and update later. Coders will also use different capitalization styles to remind themselves how the variable is used within the script. A good default style is **camelCase**.

To write in camelCase:

- Begin with a lowercase letter
- Leave out spaces
- Capitalize additional words

Good Variable Names

- `playerPoints`
- `numberStorageArray`

Bad Variable Names

- `myVariable` - Doesn't describe the purpose of the variable
- `player name` - The included space will cause issues

### Assign values to variables

New variables are empty. To **assign** it a value, or put something inside its container, use the `=` symbol. In this case, assign the variable the name of your favorite animal.

1. After the variable name, type `=`.

   ```lua title = 'Equal assigns values'
   local myAnimal =
   ```

2. On the same line, type a string that contains your favorite animal. Remember the quotation marks.

   ```lua title = 'Assigns "Porcupines" to myAnimal'
   local myAnimal = "Porcupines"
   ```

### Use print() for your own messages

Print functions display text on the screen, as you saw earlier. It's one of the first functions many people learn since it's a simple way of giving the script a command. To see your variable, use the `Global.LuaGlobals.print()` function.

1. On a new line, type `print()`.

   ```lua title = 'Adds empty print()'
   local myAnimal = "Porcupines"
   print()
   ```

2. Type the name of your variable within the parenthesis.

   ```lua title = 'Outputs "Porcupines"'
   local myAnimal = "Porcupines"
   print(myAnimal)
   ```

   <Alert severity="info">
   If you see a red error in the output editor, it's like there's an error in the code. Each error has a unique way of describing itself. Try and use the information from the error to fix your code.
   </Alert>

3. Test your code with the play button. You should see the name of your animal in the Output window.

### Combine strings

You can display any string in the Output using `print()`; you can even print multiple strings stored within variables or typed directly within the function. **Concatenation** is combining strings. To concatenate the string assigned to your variable and a second string, use two dots `..` The following example concatenates two variables and two typed strings.

```lua title = 'Uses variables and strings together'

local firstAnimal = "porcupines"
local secondAnimal = "dolphins"

print("I like " .. firstAnimal .. " and " .. secondAnimal)
```

Play around with printing different combinations of strings.

## Summary

New scripts can be created by clicking the + button next to the name of an object. ServerScriptService is a common place to create new scripts. New scripts include the default code `print("Hello world!")`. This code will display `Hello world!` in the Output window, where you can see the results of your code and if any errors have occurred.

"Hello world!" is an example of a string data type. Strings can include any combination of characters that you might type on your keyboard. Concatenation is when multiple strings are combined.

Variables are containers that can be assigned to hold different data types, such as strings and numbers.
