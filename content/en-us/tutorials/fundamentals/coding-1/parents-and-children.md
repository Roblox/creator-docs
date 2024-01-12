---
title: Parents and Children
description: Practice navigating object hierarchies instead of using specific names in your code.
next: /tutorials/fundamentals/coding-2/functions-and-events
prev: /tutorials/fundamentals/coding-1/object-properties
---

Instead of running scripts from ServerScriptService, you may want to attach a script to the part. For instance, using a script to turn a part into a trap or make a part give the player points when they touch it. By understanding how scripts and parts are related in the hierarchy, you can create a script that works automatically without naming which part to use.

To do this, you must understand **parent and child relationships**.

Parents and children are ways to describe the hierarchy between different objects. Anytime you've added a new part to Workspace, Workspace has been the parent object, and the part became a child object. When you added a script to ServerScriptService, ServerScriptService was the parent, and the script was a new child.

## Setting Up the Project and Script

To demonstrate parent and child relationships, you'll start with a single part that changes colors and then duplicate the script across multiple parts.

1. Create a new part and rename it. This lesson will use ColorPart.

2. Right-click the **part** and select **Insert Object** > **New Script**. Rename the script ColorChanger.
   <img src="../../../assets/education/coding-1/color-changer_400x216.png" width="40%" />

3. Copy and paste the code below into ColorChanger. This version of the code is the same that you used before. It assigns a specific part to a variable.

   ```lua title='Changes the color of ColorPart'
   local colorPart = workspace.ColorPart
   colorPart.Color = Color3.fromRGB(50, 240, 255)
   ```

4.Test and check that the part changes color as desired.

## Parent and Child Relationships

A **parent** is anything with objects, like scripts or parts, attached below it. Anything under the parent is its **children**. In the example below, ColorPart is the parent, and ColorChanger is the child.

<img src="../../../assets/education/coding-1/color-changer_400x216.png" width="40%" />

With the current script, you can only change the color of a **single part** named ColorPart. To change any part's color, you can design the code to work on the script's parent object, whatever it happens to be named. The code `script.Parent`, will go up the hierarchy and find the object the script is attached to.

### Using script.Parent

`script.Parent` can be assigned to a variable like any other value with the `=` symbol.

1. In the script, replace the named part with `script.Parent`. Check your code below.

   ```lua title='Changes the color of the parent object'
   local colorPart = script.Parent
   colorPart.Color = Color3.fromRGB(50, 240, 255)
   ```

### Testing Reusable Parts

Now that the variable will refer to whatever part the script is attached to, you can make as many copies as you want.

1. Right-click on the color part and select Duplicate, or use the hot-key <kbd>Ctrl</kbd><kbd>D</kbd> (<kbd>⌘</kbd><kbd>D</kbd>). Create at least three total parts.

2. Run the game to check that all parts change color.
   <video controls src="../../../assets/education/coding-1/scriptParent_finalExample_web.mp4" width="80%"></video>

## Summary

Instead of always directly referencing parts by name and location, script.Parent can be used as an alternative. That code will grab the parent, or object, that the script is attached to, thus letting the script make modifications to it. Using code such as `script.Parent` will come in handy to make your code reusable. One drawback to remember is that you now have multiple scripts that require updating if you want to change the code.
