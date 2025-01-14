---
title: Use parameters and events
description: How to pass information into functions using parameters and arguments. Also covers connecting functions to events.
next: /tutorials/fundamentals/coding-2/parameters-practice-buttons
prev: /tutorials/fundamentals/coding-2/code-a-function
---

Normally, functions can only use the information they have coded within them. Sometimes however, you might not know in advance what that information will be, or you want to be able to reuse the same function with multiple pieces of similar information. For example, if you wanted to use a function to display the name of the person who finished an obby course the fastest in giant letters to everyone. You won't know the name of the future winner until the race is finished.

**Parameters** are placeholders for information you want to give to the function at a later time. They're like windows that allow you to **pass** information to the function.

## Use parameters and events to set up a trap

This script will create a trap part that destroys whatever touches the part, including other parts. You'll have to use a parameter to set it up. Be careful to anchor the trap where it doesn't fall and destroy things unintentionally.

### Create a new part

A part needs to be set up that will destroy anything that touches it.

1. Create a new part that's not touching anything. If it's touching something it might go off too soon.
2. In the Explorer, rename the part:TrapPart.
3. **Anchor** the part.

### Set up the script

Use what you know about variables and the experience hierarchy to reference the trap part.

1. Add a new script into the trap part. Rename the script _TrapScript_.
2. Delete Hello World and add a descriptive comment.
3. Under the comment, create a new variable which finds the script's parent.

   ```lua
   -- Destroys whatever touches the parent
   local trap = script.Parent

   ```

### Create a function with a parameter

The trap will use a function to destroy whatever touched the part. To work, the function needs to know what touched the part. And that means using parameters. Parameters are typed inside the `()` that comes after a function's name. They look like this:

```lua
local function functionName(parameterName)

end
```

The actual information that gets passed through the parameter is called an **argument**. You'll create a new function called `onTouch()` with a parameter called `objectTouched` that will track whatever touches the trap and then destroy the touching part.

1. Create a local function. It can be named anything, but this lesson will use `onTouch`

   ```lua
   local trap = script.Parent

   local function onTouch()

   end
   ```

2. Inside the `()`, type a name for the parameter. This lesson will use objectTouched.

   ```lua
   local trap = script.Parent

   local function onTouch(objectTouched)

   end
   ```

3. Between `local function onTouch()` and `end`, create a print statement. You'll use this to check if something is touching the part in the next section.

   ```lua
   local trap = script.Parent

   local function onTouch(objectTouched)
       print("Something touched the trap")
   end
   ```

### Use an event to call the function

We want the function to run whenever something touches the part. To make that happen, connect the function to the `Touched` event. **Events** are things that happen in the experience. Like a player touching a part or losing health. When a function is connected to an event, the function runs whenever the event happens.

The `Touched` event fires whenever one part touches another part and can be used to create buttons, traps, and other objects that players interact with.

1. Beneath the function's `end`, type `trap.Touched:Connect(onTouch)`

   ```lua
   local trap = script.Parent

   local function onTouch(objectTouched)
       print("Something touched the trap")
   end

   -- Connect the function to the Touched event
   trap.Touched:Connect(onTouch)
   ```

2. Click Test and then touch the part. Check for your test print statement: `Something touched the trap`. If you can't see the string in the Output window, check the following:

   - Make sure the string "Something touched the part!" is between local function onTouch() and end.
   - Check that Touched is capitalized.

3. Now that the function is correctly set up, use it to destroy whatever touches the part. Inside the function, after the string, type `objectTouched:Destroy()` The completed code should be:

   ```lua
   local trap = script.Parent

   local function onTouch(objectTouched)
       print("Something touched the trap")
       -- Destroy the touching object
       objectTouched:Destroy()
   end

   trap.Touched:Connect(onTouch)
   ```

4. Test again and see what happens when the part is touched. Your avatar should end up missing feet or arms. If the part touches the avatar's head or neck, it might even be completely destroyed.

   <video controls src="../../../assets/education/coding-2/parameters-and-events_trap.mp4" width="80%"></video>

## Summary

Parameters are used to pass information that would be normally out of scope (where a function can't see it), into a function. Meanwhile, events are special signals that go off inside of the experience when something important happens. Different objects have different events. Functions can be connected to events so that they are called each time the event gets fired. This little script connected a function to the trap's `Class.BasePart.Touched|Touched` event, and passed in what was touching the trap through the parameter.
