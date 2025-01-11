---
title: If/then Practice with Traps
description: Create a trap that sets the player's health to zero with Roblox Lua.
next: /tutorials/fundamentals/coding-3/powerups-with-if-statements
prev: /tutorials/fundamentals/coding-3/intro-to-if-statements
---

Traps that decrease players' health are a fun game-play element that can be coded with conditional statements. Practice using conditionals by creating a part that sets the player's health to zero when touched.

<video controls src="../../../assets/education/coding-3/trap-exampleFinal.mp4" width="80%"></video>

## Setting up the Trap

Traps work exceptionally well in experiences with movement-based challenges, like obbies. These steps will start by setting up the necessary variables and functions. Do as much as you can without looking at the code boxes first.

1. Create and name a trap part. Insert a script into the part.
2. In the script, add a descriptive comment and then use a variable to reference the script's parent.

   ```lua
   -- If a player touches this part, set their health to 0

   local trapPart = script.Parent
   ```

3. Create a function named `onTouch()` with a parameter named `otherPart`.

   ```lua
   -- If a player touches this part, set their health to 0

   local trapPart = script.Parent

   local function onTouch(otherPart)

   end
   ```

4. Connect the function to the trap part's `Touched` event to run whenever something touches the part.

   ```lua
   local trapPart = script.Parent

   local function onTouch(otherPart)

   end

   trapPart.Touched:Connect(onTouch)
   ```

## Checking for Player Touch

Remember, the parameter `otherPart` records whatever touches the trap part, which might be a part of a player or just the baseplate.

To ensure the trap will only destroy players and won't destroy random decor items, use an if/then statement to check if whatever is in `otherPart` contains a Humanoid object.

<Alert severity="info">
Humanoids are present in player avatars and many NPCs. Humanoids have several unique properties. One such property is Health.
</Alert>

### Finding a Specific Object

The function `FindFirstChildWhichIsA()` can be used to look for specific object types, which is handy because we're looking for a Humanoid-type object. Players will likely touch the trap with only a part of their avatar, so a variable must be set up to find the parent of the touching part and search it for a Humanoid.

1. In `onTouch()`, type `local character = otherPart.Parent`.

   ```lua
   local trapPart = script.Parent

   local function onTouch(otherPart)
      -- Finds otherPart's parent object
     local character = otherPart.Parent

   end

   trapPart.Touched:Connect(onTouch)

   ```

2. Check to see if `character` has a `Class.Humanoid` by typing:

   `local humanoid = character:FindFirstChildWhichIsA("Humanoid")`

   ```lua
   local trapPart = script.Parent

   local function onTouch(otherPart)
     local character = otherPart.Parent
     local humanoid = character:FindFirstChildWhichIsA("Humanoid")
   end
   trapPart.Touched:Connect(onTouch)
   ```

### Checking with an if Statement

If a Humanoid is found, then set the Humanoid's Health to zero.

1. Use an if statement to check if a Humanoid was successfully assigned to `local humanoid`.

   ```lua
   local trapPart = script.Parent

   local function onTouch(otherPart)
      local character = otherPart.Parent
      local humanoid = character:FindFirstChildWhichIsA("Humanoid")

      -- Evaluates if a Humanoid was found
      if humanoid then

      end
   end

   trapPart.Touched:Connect(onTouch)
   ```

2. Add a print statement and check the code so far.

   ```lua
   local trapPart = script.Parent

   local function onTouch(otherPart)
      local character = otherPart.Parent
      local humanoid = character:FindFirstChildWhichIsA("Humanoid")

      -- Evaluates if a Humanoid was found
      if humanoid then
         print("Found a Humanoid")
      end
   end

   trapPart.Touched:Connect(onTouch)
   ```

3. **Run** the code and check that you can see the output whenever a player touches the part.

## Changing the Player's Health

If the statement is true, you can use the same humanoid variable to set the player's health to 0.

1. Between `then` and `end`, type `humanoid.Health = 0`.

   ```lua title="Completed script"
   local trapPart = script.Parent

   local function onTouch(otherPart)
      local character = otherPart.Parent
      local humanoid = character:FindFirstChildWhichIsA("Humanoid")

      -- Evaluates if a Humanoid was found
      if humanoid then
         print("Found a Humanoid")
         humanoid.Health = 0
      end
   end

   trapPart.Touched:Connect(onTouch)
   ```

2. Test the trap.

## Summary

This trap part used conditionals to detect Humanoid parts and set the Humanoid's health to zero. This script is an improvement on the previous trap script, which destroyed any touching object no matter what it was.

It does, however, still have a few flaws. Humanoids aren't just in players. Humanoids are also found in non-playable characters. The script is also only good at setting the player's health to zero. You can experiment with subtracting a small amount of health, but it's likely to subtract the health faster than desired. Later lessons provide further improvements to give greater control over how much health is subtracted from players.
