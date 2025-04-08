---
title: Deadly lava
description: The process for creating a lava floor that kills players on contact.
next: /tutorials/use-case-tutorials/scripting/basic-scripting/fading-trap
prev: /tutorials/use-case-tutorials/scripting/basic-scripting/intro-to-scripting
---

In [Introduction to scripting](./intro-to-scripting.md), you learned how to make changes in an experience in a loop over time. What if you want to make changes based on user behavior? In this tutorial, you'll learn how to make a deadly lava floor which kills users when they step on it.

<video controls loop muted>
  <source src="../../../../assets/tutorials/deadly-lava/lavaFloorGameplay.mp4" />
</video>

## Set up

You need a place in your world to put the deadly lava. If you followed the [Introduction to scripting](./intro-to-scripting.md) course, the lava floor would fit nicely in the gap covered by the disappearing platforms.

1. Insert a `Part` and move it into place in your world. Name it **LavaFloor**.
2. Resize it so it covers the floor of the enclosing space.

   ![](../../../../assets/tutorials/deadly-lava/partInserted.jpg)

3. Make the floor look more like lava by setting the `Material` property to `Neon` and the `Color` to an orange shade.

   <GridContainer numColumns="2">
     <img src="../../../../assets/tutorials/deadly-lava/propertiesSet.jpg" />
     <img src="../../../../assets/tutorials/deadly-lava/lavaProperties.jpg" />
   </GridContainer>

4. Insert a **Script** into the `LavaFloor` part and rename it to `Kill`.

   <img src="../../../../assets/tutorials/deadly-lava/scriptExplorer.png" width="60%" />

5. Remove the default code and create a variable for the lava.

   ```lua
   local lava = script.Parent
   ```

## Connect to an event

Use an **event** to detect when a user touches the lava. Every part has a `Touched` event that fires when something touches it. You can **connect** to this event to run a function when it fires.

1. Declare a new function called `kill`.
2. Access the `Touched` event on the lava object using a dot, just like a property: `lava.Touched`.
3. Call the `Connect` function on the `Touched` event, passing `kill()` as the function to call when the part is touched.

   ```lua
   local lava = script.Parent

   local function kill()

   end

   lava.Touched:Connect(kill)
   ```

Any code you write in the `kill` function will now run whenever something touches the lava. Note that a **colon** is used for the `Connect` function, **not** a dot - don't worry about why at this point, just remember the difference.

## Get the touching part

To kill the user, the function will need an object associated with that user. A part's `Touched` event can provide the "other part" that touched it — but only if you request it by making it a **parameter** of the function.

Parameters are definitions of what a function expects to receive when it's called. A parameter can be used in a function just like any other variable. You can pass information to a parameter by including it in the parentheses when a function is called. Parameters are defined in the parentheses on the first line of a function. Create a **parameter** called `otherPart` for the `kill` function.

```lua
local lava = script.Parent

local function kill(otherPart)

end

lava.Touched:Connect(kill)
```

When the `kill` function is called, the `otherPart` parameter will represent the part that touched the lava floor, and the code you'll write in the function will be able to use it.

## Character and humanoid

When a user touches the lava, Roblox can detect the specific body part of the user that touched it, such as the left leg or right foot. This part is in the user's **Character** model, which contains all of the objects that make up the user's avatar in the experience, including:

- The individual body parts of the user such as the head, limbs, and torso.
- Any clothing and accessories worn by the user.
- The `Class.Humanoid`, a special object which contains many properties related to the user, including the user's health.
- The HumanoidRootPart which controls the user's movement.

As previously noted, any body part that touches the lava is part of the Character model, so you can get a reference to that character with `otherPart.Parent`. Create a variable to store the parent of the part that touched the lava floor.

```lua
local lava = script.Parent

local function kill(otherPart)
  local partParent = otherPart.Parent
end

lava.Touched:Connect(kill)
```

From the character model, you'll need to get the Humanoid object in order to kill the user. You can do this with the `FindFirstChild()` function—just pass it the name of the thing you're looking for and it provides the first matching child it finds in that object. Call `FindFirstChild()` on the `partParent` variable with `"Humanoid"` as the child to find, and store the result in a new variable called `humanoid`.

```lua
local lava = script.Parent

local function kill(otherPart)
  local partParent = otherPart.Parent
  local humanoid = partParent:FindFirstChild("Humanoid")
end

lava.Touched:Connect(kill)
```

## Check the humanoid

You can easily check if the Humanoid was found using an **if** statement. The code in an if statement will only run if the condition defined in the first line is true.

There are a variety of [operators](../../../../luau/operators.md) that can be used to build more complex conditions which you'll encounter in future courses - for now, just put the `humanoid` variable there. Create an **if** statement with `humanoid` as the condition.

```lua
local lava = script.Parent

local function kill(otherPart)
  local partParent = otherPart.Parent
  local humanoid = partParent:FindFirstChild("Humanoid")
  if humanoid then

  end
end

lava.Touched:Connect(kill)
```

<Alert severity="info">
In Luau, any value other than false or `nil` (an empty value) is evaluated as true in a conditional statement, so in this case you can use `humanoid` directly as the condition.
</Alert>

## Set character health

Now that the `Class.Humanoid` has been checked, its properties can be changed. If you set its `Health` property to **0**, the associated Character dies. In the body of the if statement, set the `Health` property of humanoid to 0.

```lua
local function kill(otherPart)
    local partParent = otherPart.Parent
    local humanoid = partParent:FindFirstChild("Humanoid")
    if humanoid then
        humanoid.Health = 0
    end
end

lava.Touched:Connect(kill)
```

With that, your lava floor is complete! Test your experience and you should find that your deadly lava successfully kills users on contact. Try using your lava as an extra challenge in an obby, or as a boundary for a world.

## Final code

```lua
local lava = script.Parent

local function kill(otherPart)
    local partParent = otherPart.Parent
    local humanoid = partParent:FindFirstChild("Humanoid")
    if humanoid then
        humanoid.Health = 0
    end
end

lava.Touched:Connect(kill)
```
