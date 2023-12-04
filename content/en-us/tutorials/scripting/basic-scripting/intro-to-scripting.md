---
title: Introduction to Scripting
description: The process for creating a basic script that makes a platform disappear.
next: /tutorials/scripting/basic-scripting/deadly-lava
---

In [Introduction to Roblox Studio](../../../tutorials/first-experience/index.md), you learned how to create and manipulate parts in Roblox Studio. In this tutorial, you'll learn how to apply a **script** to parts to make a platform appear and disappear. You can use this in a platforming experience to span a gap, challenging users to time their jumps carefully to get to the other side.

<video controls loop muted>
    <source src="../../../assets/tutorials/intro-to-scripting/finishedSinglePlatformShort.mp4" />
</video>

## Setting the Scene

First off, you need a **Part** to act as the platform. Making and moving parts should be familiar to you from [Introduction to Roblox Studio](../../../tutorials/first-experience/index.md). You don't need a complicated world aside from the platform — you just need a gap that your users can't easily jump across.

1. Insert a **Part** and rename it to `DisappearingPlatform`.
2. Resize it to large enough for a user to jump on.
3. Move it to a proper location so that you can reach it and jump on it when testing your experience.

   ![alt](../../../assets/tutorials/intro-to-scripting/partInPlace.jpg)

4. Set the **Anchored** property to **true** in the **Properties** window.

   <img src="../../../assets/tutorials/intro-to-scripting/anchoredProperty.png" width="320" />

<Alert severity="info">
Remember that setting a part's Anchored property to **true** makes it stay in place no matter what. Your platform falls down if it's not anchored.
</Alert>

## Inserting a Script

Code in Roblox is written in a language called [Luau](../../../luau/index.md) which you can put in scripts within various containers in the **Explorer**. If you put a script under a **Part**, Roblox will run the script's code when the part is loaded into the game.

1. Hover over the `DisappearingPlatform` part in the **Explorer** window and click the **+** button to insert a new script into the platform. Rename your new script as **Disappear**.

   <img src="../../../assets/tutorials/intro-to-scripting/scriptInPlace.jpg" width="60%" />

2. Delete the default code inside.

<Alert severity="info">

Remember to **rename** parts and scripts as soon as you create them so you don't lose track of things in the **Explorer**.

</Alert>

## First Variable

It's a good idea to start off your script by making a **variable** for the platform. A variable is a **name** associated with a **value**. Once a variable is created, it can be used again and again. You can change the value as needed.

In Luau, a variable is created as follows: `local variableName = variableValue`.

The term `local` means that the variable is only going to be used in the block of the script where it's declared. The `=` sign is used to set the value of the variable. Names for variables are typically written in **camel case**. This is lowercase with every word following the first being capitalized, `justLikeThis`.

Copy the following code to create a **variable** for the platform called `platform`. where the value is `script.Parent`.

```lua
local platform = script.Parent
```

<Alert severity="info">
`script.Parent` is used to find the object the script is located in.  As you might have guessed, `script` refers to the script you're writing in and the `Parent` of the script is where it's located.
</Alert>

## Disappear Function

Time to make the platform disappear. It's always best to group code for achieving a specific action into a **function**. A function is a named block of code that helps you organize your code and use it in multiple places without writing it again. Create a **function** in the script and call it `disappear`.

```lua
local platform = script.Parent

local function disappear()

end
```

The first new line **declares** the function — it indicates the start of the function and names it as `disappear`. The code for a function goes between the first line and `end`.

The parentheses are for including additional information as needed. You'll learn more about passing information to functions in a later course.

## Part Properties

When the platform disappears, it needs to be invisible and users need to fall through it — but you can't just destroy the platform since it needs to reappear later.

Parts have various **properties** that can be used here. Remember that you can see a part's properties if you select it and look at the **Properties** window.

A part can be made invisible by changing the `Class.BasePart.Transparency|Transparency` property. Transparency can be a value between 0 and 1, where 1 is fully transparent and therefore invisible.

<figure>
<video controls loop muted>
    <source src="../../../assets/tutorials/intro-to-scripting/transparency.mp4" />
</video>

<figcaption>Changing the Transparency property of the cube</figcaption>
</figure>

The `CanCollide` property determines if other parts (and users) can pass right through the part. If you set it to **false**, users will fall through the platform.

<figure>
<video controls loop muted>
    <source src="../../../assets/tutorials/intro-to-scripting/canCollide.mp4" />
</video>

<figcaption>Changing the CanCollide property of the cube</figcaption>
</figure>

Just like `script.Parent`, properties are accessed using a **dot**. Values are assigned using an equals sign.

1. In the `disappear` function, set the `CanCollide` property of the platform to **false**.
2. On the line following, set the `Transparency` property to **1**.

   ```lua
   local platform = script.Parent

   local function disappear()
       platform.CanCollide = false
       platform.Transparency = 1
   end
   ```

<Alert severity="info">
You might notice that Studio automatically **indents** your code inside a function. Always make sure to indent your code like this — it helps indicate where the function begins and ends, which makes your code more readable.
</Alert>

## Calling the Function

Once you've declared a function, you can run it by writing its name with parentheses next to it. For example, `disappear()` will run the `disappear` function. This is known as **calling** a function.

1. **Call** the `disappear` function at the end of the script.

   ```lua
   local platform = script.Parent

   local function disappear()
       platform.CanCollide = false
       platform.Transparency = 1
   end

   disappear()
   ```

2. Test the code by pressing the **Play** button. If your code works, the platform should have disappeared by the time the user spawns into the game.

## Appear Function

You can easily make the platform reappear by writing a function that does the exact opposite of the `disappear` function.

1. Delete the `disappear()` line from the script.
2. Declare a new function called `appear`.
3. In the function body, set the `CanCollide` property to **true** and the `Transparency` property to **0**.

   ```lua
   local platform = script.Parent

   local function disappear()
       platform.CanCollide = false
       platform.Transparency = 1
   end

   local function appear()
       platform.CanCollide = true
       platform.Transparency = 0
   end
   ```

## Looping Code

The platform should be constantly disappearing and reappearing, with a few seconds between each change. It's impossible to write an infinite number of function calls — fortunately, with a **while loop**, you don't have to.

A while loop runs the code inside it for as long as the **statement** after `while` remains true. This particular loop needs to run forever, so the statement should just be `true`. Create a `while true` loop at the end of your script.

```lua
local platform = script.Parent

local function disappear()
    platform.CanCollide = false
    platform.Transparency = 1
end

local function appear()
    platform.CanCollide = true
    platform.Transparency = 0
end

while true do

end
```

## Toggling the Platform

In the while loop, you need to write code to wait a few seconds between the platform disappearing and reappearing.

The built-in function `Library.task.wait()` can be used for this. In the parentheses the number of seconds to wait is needed: for example `task.wait(3)`.

<Alert severity="error">

Whatever you do, never make a `while true` loop without including a `task.wait()` — and don't test your code before you've put one in! If you don't wait, your game will **freeze** because Studio will never have a chance to leave the loop and do anything else.

</Alert>

Three seconds is a sensible starting point for the length of time between each platform state.

1. In the while loop, call the `task.wait()` function with **3** in the parentheses.
2. Call the `disappear` function.
3. Call the `task.wait()` function again with **3** in the parentheses.
4. Call the `appear` function.

```lua
while true do
   task.wait(3)
   disappear()
   task.wait(3)
   appear()
end
```

The code for the platform is now complete! Test your code now and you should find that the platform disappears after three seconds and reappears three seconds later in a loop.

You could duplicate this platform to cover a wider gap, but you need to change the wait times in each script. Otherwise, the platforms will all disappear at the same time and users will never be able to cross.

<video controls loop muted>
    <source src="../../../assets/tutorials/intro-to-scripting/alternatingPlatforms.mp4" />
</video>

## Final Code

```lua
local platform = script.Parent

local function disappear()
    platform.CanCollide = false
    platform.Transparency = 1
end

local function appear()
    platform.CanCollide = true
    platform.Transparency = 0
end

while true do
   task.wait(3)
   disappear()
   task.wait(3)
   appear()
end
```
