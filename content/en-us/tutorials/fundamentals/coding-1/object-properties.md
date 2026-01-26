---
title: Object properties
description: Learn how to use Luau to change the appearance properties of different objects, such as color and shape.
next: /tutorials/fundamentals/coding-1/parents-and-children
prev: /tutorials/fundamentals/coding-1/create-a-script
---

**Properties** control how objects look and function. Each object in Roblox Studio has its own set of properties. For example, a part object has color, size, and shape properties. Properties can be changed in the Properties window or through code.

To learn about properties, you'll explore common properties found in parts and then write a script to change part colors.

## The Properties window

The **Properties** window can be used to learn about an object's properties. Use it to take a look at a part's properties.

1. Select a part.

2. In the **Properties** Window on the bottom-right, look at the different properties that can be changed, like color, size, material and transparency. You can also change most properties in this window from within a script.

   <img src="../../../assets/education/coding-1/part-properties_400.png" width="40%" />

## Add comments to scripts

Comments are special lines starting with `--` that help coders remember what parts of scripts do. Unlike other code, comments don't run; they're just there so you can leave notes to yourself and other programmers. This script will change a part's `Class.BasePart.Color|Color` property at the start of the experience.

1. Select an existing part or create a new one. Rename the part PracticePart.

2. In **ServerScriptService**, create a new script named ChangeColor.

3. In the script, delete the default code. Then, write a **comment** by typing `--` and a brief description of what the script will do.

   ```lua title = 'Describes what the script does'
   -- Changes the color of a part
   ```

### Locate the part

To make changes to a part, you must be able to describe the part's location. The Explorer is an excellent tool for **referencing** locations. In this case, **PracticePart** is under **Workspace**.

<img src="../../../assets/education/coding-1/practice-part_400.png" width="40%" />

Now that you know where the part is, the part's location needs to be translated into something a script can understand.

1. Under the comment, type `workspace.PracticePart`.

   ```lua title = 'References PracticePart in Workspace'
   -- Changes the color of a part
   workspace.PracticePart
   ```

### Change a property with code

You'll use an RGB value to change the part's color. Computers use **RGB values**, the combination of red, green, and blue, to create all the colors on your screen.

RGB values use three numbers from 0 to 255, separated by commas. For example, black is `(0, 0, 0)` while white is `(255, 255, 255)`.

For the part, the script will change its Color property to a new Color3, a data type that stores colors.

1. After `PracticePart`, type `.Color` to access the Color property.

   ```lua title = 'Accesses the Color property'
   -- Changes the color of a part
   workspace.PracticePart.Color
   ```

   <Alert severity="info">
    Roblox will autocomplete words as you type to help speed up the coding process. You can use the arrow keys to move down the list when the words appear. Pick an option by pressing <kbd>Enter</kbd>.
   </Alert>

2. Next, type `= Color3.fromRGB()` This code will allow you to assign a new color.

   ```lua title = 'Uses Color3.fromRGB()'
   -- Changes the color of a part
   workspace.PracticePart.Color = Color3.fromRGB()
   ```

3. RGB color values can be manually typed inside the parentheses, but using the color picker is easier. Click **inside** the parentheses, and then click the color wheel. Follow the popup to create a color.

   <img src="../../../assets/education/coding-1/color-picker_800x140.png" width="80%" />

   Your code should look similar to the code below.

   ```lua title="Updates the color of PracticePart"
   -- Changes the color of a part
   workspace.PracticePart.Color = Color3.fromRGB(255, 230, 50)
   ```

   <Alert severity="info">
   If you want to type an RGB value manually, make sure each number is between 0 to 255 and separated by commas, such as (10, 50, 10).
   </Alert>

4. [Initiate a playtest](../../../studio/testing-modes.md#playtesting) to test that your part changes color.

## Summary

All objects have properties. Parts have properties like color and transparency. At the same time, other object types have their unique properties.

To change the color of a part, you need to be able to describe where to find it. If the part is in Workspace, use the keyword `workspace`. Then use dot operators to state the desired part and access its properties.
