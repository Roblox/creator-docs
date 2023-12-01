---
title: Loops and Arrays
description: Learn how to iterate, or go through, arrays in Roblox Lua using loops.
next: /tutorials/fundamentals/coding-5/making-changes-to-arrays
prev: /tutorials/fundamentals/coding-5/intro-to-arrays
---

**Arrays** can be combined with loops, such as **while** or **for** loops, to repeat the same code for each indexed value. For example, teleporting each player in an array to a new place or making an array of parts catch fire.

To explore looping through arrays, create a disappearing bridge path where parts are placed into an array and then made to vanish one by one.

<video controls src="../../../assets/education/coding-5/disappearingHero_16_9web.mp4" width="75%"></video>

## Looping through an Array

For the project, find or create a set of three parts to make disappear. The parts must all be anchored.

1. Create three parts. Name the parts in the order they should disappear, Part1, Part2, Part3.

2. In ServerScriptService, insert a new script and create an array to store the parts.

   ```lua
   local pathArray = {
   }
   ```

3. On a single line each, type the name of the parts in the order they should disappear. Using a new line for each value makes it easier to read.

   ```lua
   local pathArray = {
    workspace.Part1,
    workspace.Part2,
    workspace.Part3,
   }
   ```

### Using a for Loop With an Array

Use a for loop to go through the array and control how fast the parts should disappear in the order the parts are indexed within the array.

1. To control how often a part disappears in seconds, create a variable named `VANISH_RATE`. For testing, it's best to keep it to a small number.

   ```lua
   local VANISH_RATE = 1.5

    local pathArray = {
    workspace.Part1,
    workspace.Part2,
    workspace.Part3
   }
   ```

   <Alert severity='info'>
    Constant Variables are variables likely to need adjusting. They're put at the top of the script in ALL_CAPS to make them easy to spot. These variables shouldn't be changed by other code in the script. Another name for ALL_CAPS is SCREAMING_SNAKE_CASE.
   </Alert>

2. Create a for loop with the following: **Start:** `partIndex = 1`, the index of the first value in the array. **End:** `#pathArray`, the size of that array.

   ```lua
    for partIndex = 1, #pathArray  do

    end
   ```

3. So there's a delay before a part disappears, in the loop, add a `Library.task.wait()` using `VANISH_RATE`.

   ```lua
   for partIndex = 1, #pathArray  do
      task.wait(VANISH_RATE)
   end
   ```

4. To get a part to disappear, create a new variable named `whichPart` and set it equal to `partsArray[partIndex]`. Then, to disappear that part, set it's `CanCollide` property to false and `Transparency` to 1.

   ```lua
   for partIndex = 1, #pathArray  do
      task.wait(VANISH_RATE)
      local whichPart = pathArray[partIndex]
      whichPart.CanCollide = false
      whichPart.Transparency = 1
   end
   ```

5. Check that parts of the path disappear over time.

   <video controls src="../../../assets/education/coding-5/showPathDisappearFirst_web.mp4" width="100%"></video>

### Troubleshooting Tips

If the bridge doesn't disappear, check the possible issues below:

**Issue:** Parts disappear too fast or are all gone at the start.

- Depending on how fast your character loads into the experience, the first parts may already be invisible. To address this, add a small wait, such as `task.wait(2)`, at the start of the script.

### Coding the Second Loop

Right now, the parts disappear forever. To make them reappear, create a second for loop that will go through each part and instantly make each piece walkable.

1. After the first loop, add a `Library.task.wait()` to create a short delay before the path reappears.

   ```lua
    for partIndex = 1, #pathArray  do
       task.wait(VANISH_RATE)
       local whichPart = pathArray[partIndex]
       whichPart.CanCollide = false
       whichPart.Transparency = 1
    end

    task.wait(1)
   ```

2. **On your own**, try coding a second for loop that makes the path useable again by changing each part's CanCollide property to true and Transparency to 0. When finished, check your work against the code below.

   ```lua
   -- Reset the path by making all parts walkable again
   for partIndex = 1, #pathArray do
      local whichPart = pathArray[partIndex]
      whichPart.CanCollide = true
      whichPart.Transparency = 0
   end
   ```

   <Alert severity='warning'>
    Unanchored parts will fall through the baseplate when CanCollide is false. If the parts aren't reappearing, and there are no Output errors, anchor the parts and test again.
   </Alert>

3. Test the project to confirm that once all parts disappear, they come back.

   <video controls src="../../../assets/education/coding-5/showPathDisappearIndexed_web.mp4" width="100%"></video>

## Repeating with a While Loop

The parts disappear and reappear, but only once. To make the code keep repeating, nest all of the code within a while loop.

1. At the bottom of the script, create a new while true do loop. Then, **move both** for loops into the while loop.

   ```lua
    while true do
      -- Make a part disappear from the array in order
       for partIndex = 1, #pathArray  do
          task.wait(VANISH_RATE)
          local whichPart = pathArray[partIndex]
          whichPart.CanCollide = false
          whichPart.Transparency = 1
       end

       -- Wait for a second before making the path reappear
       task.wait(1)

       -- Reset the path by making all parts walkable again
       for partIndex = 1, #pathArray do
          local whichPart = pathArray[partIndex]
          whichPart.CanCollide = true
          whichPart.Transparency = 0
       end
    end
   ```

2. Check that once all parts disappear, they reappear.

   <video controls src="../../../assets/education/coding-5/showPathDisappearIndexed_web.mp4" width="80%"></video>

A finished version of the project can be downloaded.

```lua title="Completed script"
 local VANISH_RATE = 1.0

 local pathArray = {
    workspace.Part1,
     workspace.Part2,
    workspace.Part3,
 }

 while true do
    -- Make a part disappear from the array in order
      for partIndex = 1, #pathArray  do
         task.wait(VANISH_RATE)
         local whichPart = pathArray[partIndex]
         whichPart.CanCollide = false
         whichPart.Transparency = 1
      end

    -- Wait for a second before making the path reappear
    task.wait(1.0)

    -- Reset the path by making all parts walkable again
    for partIndex = 1, #pathArray do
       local whichPart = pathArray[partIndex]
       whichPart.CanCollide = true
       whichPart.Transparency = 0
    end
 end
```

## Arrays and ipairs()

`ipairs()` is used with **arrays**. The "i" in `ipairs()` stands for "index." ipairs() can be used to quickly repeat an operation on a lot of objects, like, say, a folder full of parts.

This will be demonstrated by quickly adding particles to a whole folder of parts.

1. In Workspace, create a folder named PartsFolder. Add as many parts as you like.

2. In ServerScriptService, Create a new script and reference the folder.

3. Use GetChildren() to automatically get an array listing all the objects in the folder.

   ```lua
    local partsFolder = workspace.PartsFolder

    -- Gets an array listing the parts in PartsFolder
    local partsArray = partsFolder:GetChildren()
   ```

4. Use `in ipairs(ArrayToUse)` with the for loop to go through partsArray and add particles.

   ```lua title="Completed script"
    -- Gets an array listing the parts in PartsFolder
    local partsArray = partsFolder:GetChildren()

    -- Adds particles to every part in the array
    for index, part in ipairs(partsArray) do
       local particles = Instance.new("ParticleEmitter")
       particles.Parent = part
    end
   ```

Playtest and watch the particles float up from every part in the folder.

## Summary

Loops can be combined with arrays to work with any number of values quickly. If you want to have exact control over what happens to a few parts and in what order, an array must be hard-coded with specific values.

To work with many parts where order doesn't matter, GetChildren() can create an array of an object's children. Utilizing `ipairs()`, the list can be quickly iterated over without knowing the array's size.
