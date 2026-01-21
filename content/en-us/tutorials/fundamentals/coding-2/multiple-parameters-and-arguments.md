---
title: Multiple parameters and arguments
description: Pass multiple pieces of information into a function in Luau using arguments and parameters.
next: /tutorials/fundamentals/coding-3/landing
prev: /tutorials/fundamentals/coding-2/parameters-practice-buttons
---

Functions can actually have more than one parameter, allowing for multiple arguments (pieces of information), to be passed into the function. An example might be assigning a player to a team. Here you would need a parameter to pass in the player, and a parameter to pass in which team to assign them to.

To set up multiple parameters, separate the parameter names with a comma.

```lua
local function assignTeam(playerName, whichTeam)

end
```

## Practice with multiple parameters

To practice working with multiple parameters, create a function that sorts objects into trash or recycling.

- The **first** parameter will be trash, which will be destroyed.
- The **second** parameter will be for recycling, which will be made shiny and new again.

### Set up the function

First set up the function with multiple parameters and then test your work.

1. Create a new script in **ServerScriptService**.
2. Code a new function named `sortGarbage()` with two parameters, `trash` and `recyclable`.
3. At the bottom of the script, call the function.
4. Quickly check the code so far using a print statement inside the function.

```lua
local function sortGarbage(trash, recyclable)
   print("garbage test")
end

sortGarbage()
```

### Use multiple parameters

Inside the function, parameters can be used similar to variables. In this example, `trash` is destroyed and then `recyclable` is given sparkles using a Particle Emitter.

1. Delete the print statement, and use Instance.new() to create a new Particle Emitter as shown. This will be used to give recyclables their sparkle.

   ```lua
   local function sortGarbage(trash,recyclable)
       -- Create a new Particle Emitter
       local sparkle = Instance.new("ParticleEmitter")

   end

   sortGarbage()
   ```

   <Alert severity="success">

   `Datatype.Instance.new()` can also be used to create objects such as Fire, folders, and parts.

   </Alert>

2. Destroy whatever is passed in through the trash parameter the same as if trash were any other variable.

   ```lua
   local function sortGarbage(trash,recyclable)
       local sparkle = Instance.new("ParticleEmitter")

       -- Destroy the trash
       trash:Destroy()
   end

   sortGarbage()
   ```

3. Parent the Particle Emitter to the recyclable.

   ```lua
   local function sortGarbage(trash,recyclable)
       local sparkle = Instance.new("ParticleEmitter")

       -- Destroy the trash and make recyclables shiny
       trash:Destroy()
       sparkle.Parent = recyclable
   end

   sortGarbage()
   ```

## Pass values through parameters

Time to take out the trash! With the parameters set up, the functions are ready to take in information.

1. Create two objects using basic parts to represent things you might throw away. One should be trash and one recyclable. Make sure they have unique names.

2. At the top of the script, add variables for the objects you created. These will be your arguments.

   ```lua
   local Workspace = game:GetService("Workspace")

   local cementBlock = Workspace.Cement
   local glassBottle = Workspace.GlassBottle
   ```

3. At the bottom of the script, where `sortGarbage()` is called, pass in each argument.

   ```lua
   local Workspace = game:GetService("Workspace")

   -- Objects to use as arguments
   local cementBlock = Workspace.CementBlock
   local glassBottle = Workspace.GlassBottle

   --Destroys trash and cleans up recyclables
   local function sortGarbage(trash,recyclable)
       local sparkle = Instance.new("ParticleEmitter")

       trash:Destroy()
       sparkle.Parent = recyclable
   end

   -- Pass in the arguments
   sortGarbage(cementBlock, glassBottle)

   ```

4. Test your code. The object passed in first will be destroyed. The second object will sparkle.

## Order of parameters

Typically, arguments are matched to parameters based on the order they're passed in. For instance, the first argument is used for the first parameter. The second argument is used for the second.

In our example, there are two parameters. Whatever gets passed in first will always be trash, and the second will always be recyclable.

```lua

--Destroys trash and cleans up recyclables
local function sortGarbage(trash,recyclable)
     local sparkle = Instance.new("ParticleEmitter")

    trash:Destroy()
    sparkle.Parent = recyclable
end

--Goes in order. Cement is destroyed and the glass bottle is recycled
sortGarbage(cementBlock, glassBottle)

--GlassBottle is destroyed and cementBlock is recycled
sortGarbage(glassBottle, cementBlock)
```

If you were to only pass in only one argument, that argument would be treated as trash. If you were to pass in three arguments, nothing would happen to the third argument because there is no third parameter.

## Summary

Parameters are placeholders through which values can be passed into functions. Arguments are the values that get passed through the placeholder. You can create multiple parameters by separating their names with commas. When calling functions, the order that values get passed into the receiving function determines which parameter they're used.
