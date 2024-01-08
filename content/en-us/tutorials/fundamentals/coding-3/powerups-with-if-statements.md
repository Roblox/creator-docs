---
title: Evaluating Multiple Statements
description: How to use the and keyword to evaluate more than one statement at a time in Roblox Luau.
next: /tutorials/fundamentals/coding-3/multiple-conditions
prev: /tutorials/fundamentals/coding-3/traps-with-if-statements
---

If statements can have multiple requirements that need to be true before running code. The keyword `and` allows you to combine statements. The following code evaluates first if two plus two equals six and then if four does not equal six. If both statements are true, the code will run.

```lua
if 2+2 == 6 and 4 ~= 6 then
   print("Both statements are true")
end

-- will run
if 4+2 == 6 and 4~=6 then
   print("Both statements are true")
end
```

## Creating a Powerup

Powerups are in-experience items that give players special abilities like flying, invisibility, or speed. This powerup will boost the player's walking speed every time the powerup is touched. Continuously applying boosts can make the player go way too fast, so `and` will be used to control the upper walking speed limit.

### Setting Up the Powerup

Use this code with a simple part or a model, such as a crystal, coin, or glowing neon orb.

1. Create a new part named **Powerup** and insert a script named **WalkSpeedManager**.

2. Declare a variable named `speedBoost` and assign the script's parent object.

   ```lua
   -- Gives a temporary speed boost when touched
   local speedBoost= script.Parent
   ```

3. Set up a function named `onTouch` and connect it to the parent object's `Touched` event. Then playtest and check your work.

   ```lua
   local speedBoost= script.Parent

   local function onTouch(otherPart)
      print("Something touched speedBoost")
   end

   speedBoost.Touched:Connect(onTouch)

   ```

4. The WalkSpeed property is found on Humanoid objects. Use the same pattern used when creating a trap part and create a conditional that checks for Humanoid objects.

   ```lua title="Looks for Humanoid parts"
   local function onTouch(otherPart)
     local character = otherPart.Parent
     local humanoid = character:FindFirstChildWhichIsA("Humanoid")

     if humanoid then
       print("A Humanoid was found")
     end
   end

   ```

## Speeding Players Up

The speed boost will make avatars walk faster every time the speed boost is touched. That will quickly become very, very fast. The keyword `and` will ensure players can't go too fast by only enabling the speed boost if the player is under a certain speed.

1. If a Humanoid is found, take the current WalkSpeed value and add 10 to it. Playtest, and your avatar will get faster every time it touches the speed boost.

   ```lua title="Increases current WalkSpeed"
   local function onTouch(otherPart)
      local character = otherPart.Parent
      local humanoid = character:FindFirstChildWhichIsA("Humanoid")

      if humanoid then
   	   humanoid.WalkSpeed += 10
      end
   end

   speedBoost.Touched:Connect(onTouch)
   ```

2. In the if statement, use the keyword `and` to add a second condition that the current WalkSpeed value is less than 50. After adding the boost, the fastest WalkSpeed value will be 60.

   ```lua title="Checks if current WalkSpeed is 50 or less"
   if humanoid and humanoid.WalkSpeed <= 50 then
    humanoid.WalkSpeed += 10
   end

   ```

### Fine Tuning the Speed Boost

OnTouch is called every time the speed boost is touched. Every step or slightest bounce triggers the Touched event and calls the connected function. The part's property, `CanTouch` can keep the Touched event from firing. Take advantage of CanTouch and turn off the speed boost for one second every time it's been activated.

1. After applying the boost, set the part's CanTouch property to false. Playtest and make sure the boost only applies once.

   ```lua title="Disables the speed boost"
   local speedBoost= script.Parent

   local function onTouch(otherPart)
     local character = otherPart.Parent
     local humanoid = character:FindFirstChildWhichIsA("Humanoid")

     if humanoid and humanoid.WalkSpeed <= 50 then
       humanoid.WalkSpeed += 10
       speedBoost.CanTouch = false
     end
   end

   speedBoost.Touched:Connect(onTouch)

   ```

2. Use `task.wait(1)` to pause the script for one second, then set CanTouch to true. Playtest and make sure the speed boost can be reapplied after one second.

   ```lua title="Finished script"
   local speedBoost= script.Parent

   local function onTouch(otherPart)
     local character = otherPart.Parent
     local humanoid = character:FindFirstChildWhichIsA("Humanoid")

     if humanoid and humanoid.WalkSpeed <= 50 then
       humanoid.WalkSpeed += 10
       speedBoost.CanTouch = false
       task.wait(1)
       speedBoost.CanTouch = true
      end
   end

   speedBoost.Touched:Connect(onTouch)
   ```

3. Play with the values in the finished script. WalkSpeed can go up to 100. The default WalkSpeed value is 16.

## Summary

The keyword `and` can be used to require multiple conditions before running a code chunk, such as a value being more than 0 and less than 100. Or that there's a Humanoid, and its WalkSpeed is less or equal to 50.
