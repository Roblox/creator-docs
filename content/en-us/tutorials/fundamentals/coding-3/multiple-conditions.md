---
title: Multiple conditions
description: Learn how to use elseif and else to create more complex control structures in Luau.
next: /tutorials/fundamentals/coding-3/give-points
prev: /tutorials/fundamentals/coding-3/powerups-with-if-statements
---

Control structures can have more than one condition. The keywords `else` and `elseif` can create additional scenarios for what should happen under several conditions. The syntax looks like:

```lua title="Shows syntax for elseif and else"
if isGreen then
   print("Go")
elseif isYellow then
   print("Slow")
elseif isPedestrians then
   print("Wait")
else
   print("stop")
end
```

In this project, `else` and `elseif` are used to code a parkour course where runners receive awards depending on their finishing time.
<img src="../../../assets/education/coding-3/coding3Hero_ifElseIf.jpg" width="80%" />

## Code multiple conditions

For this project, you could write a unique if statement for each medal to award players, but that takes a lot of time. Take, for instance, the imaginary code below.

```lua title="All if statements"
if finishTime < 5  then
   -- Get a gold medal
end

if finishTime >= 5 and <= 10 then
   -- Get a silver medal
end

if finishTime > 10 and <= 15 then
   -- Get a bronze medal
end
```

A more readable and efficient way to code this is to use a single if statement and use the keyword `elseif` to provide alternative conditions to test if the previous conditions aren't true.

```lua title="Uses elseif and else"
if finishTime < 5  then
   -- Get a gold medal
elseif finishTime >= 5 and <= 10 then
   -- Get a silver medal
elseif finishTime > 10 and <= 15 then
   -- Get a bronze medal
end
```

When the if/then statement runs, it'll start at the top and only run the code for the **first** true condition it finds.

## Set up the race course

Start by placing the course's starting point and finish line, and then create a script to time the player and award different medals.

1. Create an anchored part named FinishLine. To make testing faster, place the start and end close together. You can move the finish line after finishing the script.

   <GridContainer numColumns="2">
     <figure>
       <img src="../../../assets/education/coding-3/raceCourse_showPartCraeted.jpg" />
       <figcaption>Finish Part</figcaption>
     </figure>
     <figure>
       <img src="../../../assets/education/coding-3/raceCourse_showDistanceBetween.jpg" />
       <figcaption>Entire Course</figcaption>
     </figure>
   </GridContainer>

2. In FinishLine, insert a script named RaceManager. Then, add one variable to store how many seconds have passed since the race started and a second variable to reference FinishLine.

   ```lua
      local finishLine = script.Parent
      local timePassed = 0
   ```

3. Create a function named `finish()`.

   ```lua
   local timePassed = 0
   local finishLine = script.Parent

   local function finish()

   end
   ```

4. On your own:

   - Code a function named `partTouched()` that runs `finish()` when a player touches it.
   - Connect the finish line part to `partTouched()`.
   - Compare your code to the example below.

   ```lua
   local function finish()
      print("touched the finish line")
   end

   local function partTouched(otherPart)
      local character = otherPart.Parent
      local humanoid = character:FindFirstChildWhichIsA("Humanoid")
      if humanoid then
         finish()
      end

   end

   finishLine.Touched:Connect(partTouched)
   ```

5. Playtest and check that `finish()` is called when you touch the finish line.

### Keep finish() from repeating

Right now, whenever a player touches the finish line, `finish()` gets continuously called as long as the player touches the part.

Use a **boolean**, a variable that stores true or false, to ensure that finish() is only called once.

1. Create a new variable named `raceActive` and set it to `true`.

   ```lua
   local timePassed = 0
   local finishLine = script.Parent

   local raceActive = true

   -- Runs whenever the player touches the finish line part
   local function finish()
   ```

2. Add a second condition to the if statement to check if raceActive is true before calling `finish()`.

   ```lua
   local function partTouched(otherPart)
      local character = otherPart.Parent
      local humanoid = character:FindFirstChildWhichIsA("Humanoid")
      if humanoid and raceActive == true then
         finish()
      end

   end
   ```

3. To stop `finish()` from being called again, set `raceActive` to `false`.

   ```lua
   local function finish()
      print("touched the finish line")
      raceActive = false
   end
   ```

4. Playtest your experience to check that you only see your test print statement once.

### Keep track of time

Like an if statement, a while loop can also use a condition to see if it should run. To time the player, create a timer using a while true do loop that only runs when the `raceActive` boolean is true.

1. At the bottom of the script, type `while raceActive == true do`. Press Enter to auto-complete and add the `end`.

   ```lua
   finishLine.Touched:Connect(partTouched)

   while raceActive == true do

   end
   ```

   <Alert severity="info">
   Make sure the loop is at the **bottom** of the script. Even though this while true do loop, eventually stops, it should still stay at the bottom of the script. This ensures that the previous code runs before it reaches the loop.
   </Alert>

2. To time the players, in the loop, add 1 to the `timePassed` variable once every second. Include a print statement to test your work.

   ```lua
   finishLine.Touched:Connect(partTouched)

   while raceActive == true do
      task.wait(1)
      timePassed += 1
      print(timePassed)
   end
   ```

3. Playtest the experience and check that you see each second displayed in the **Output** window.

## Award player medals

To finish, use an if statement with multiple conditions to award players a different prize medal based on their performance. Use an if statement and two elseif statements to check the player's finish time and award them the correct medal.

1. To confirm each medal can be awarded, use print statements.

   ```lua
   local function finish()
      raceActive = false
      print("You finished in " .. timePassed)
   end
   ```

2. To award a gold medal, code an if statement that compares `timePassed` to the desired finish time. This example checks if the player's time was less than or equal to 10 seconds.

   ```lua
   local function finish()
      raceActive = false
      print("You finished in " .. timePassed)

      if timePassed <= 10 then
         print("You get a gold medal!")
      end
   end
   ```

3. Playtest and confirm the gold medal can be awarded.

### Add additional conditions

Now that you've tested for the gold medal, code conditions for the other medals using the `elseif` keyword.

1. For the silver medal, use `elseif` and the next desired time range. In this example, the range is greater than 10 seconds but less than or equal to 20 seconds.

   ```lua
   local function finish()
     raceActive = false
     print("You finished in " .. timePassed)

     if timePassed <= 10 then
       print("You get a gold medal!")
     elseif timePassed > 10 and timePassed <= 20 then
       print("You get a silver medal!")
       end
   end
   ```

2. Use the same pattern for the bronze medal. Check your code with the example below.

   ```lua
   local function finish()
      raceActive = false
      print("You finished in " .. timePassed)

      if timePassed <= 10 then
         print("You get a gold medal!")
      elseif timePassed > 10 and timePassed <= 20 then
         print("You get a silver medal!")
      elseif  timePassed > 20 and timePassed <= 30 then
         print("You get a bronze medal!")
      end
   end
   ```

3. Playtest for the silver and bronze medals.

### Troubleshooting tips

If you don't see the silver and bronze metals appear, try one of the below.

- Each `elseif` should have a then after its condition.
- In `partTouched()`, make sure the second condition of the if statement uses `==`, like in `raceActive == true`.
- Check that each `elseif` is in scope. Each `elseif` condition must be between the first line of the if/then statement and it's last `end`.

### Add the else condition

If the player didn't earn any of the medals, you should encourage them to try again. In this case, you can use an `else` statement, which runs if **no other** conditions are true, to show them a message.

<Alert severity="info">
It's recommended that every if statement has an else, just in case the code doesn't find anything true.
</Alert>

1. Below the last `elseif` and above `end`, start a new line and type `else`. **Do not** add then. Beneath else, use a print statement to prompt them to try again.

   ```lua
   local function finish()
     raceActive = false
     print("You finished in " .. timePassed)

     if timePassed <= 10 then
       print("You get a gold medal!")
     elseif timePassed > 10 and timePassed <= 20 then
       print("You get a silver medal!")
     elseif  timePassed > 20 and timePassed <= 30 then
       print("You get a bronze medal!")
     else
       print("Try again!")
     end
   end

   ```

   <Alert severity="info">
    An `else` statement should always be the **last** check in an a control structure.
   </Alert>

2 . Playtest to see the else message.

## Summary

Control structures can have more than one scenario. Use if statements to set up the initial statement to check, and then add as many `elseif` conditions as necessary. Finally, use `else` to state what should happen if all given conditions are false.

Starting at the top, all conditions will be checked, and only the first true condition will run the code. The remaining conditions will not be checked, nor will their code run.

After finishing the project, you can expand upon the script to add new elements in a few extra ways.

- Add code so players can repeat the race by touching the start line when they finish.
- Design a way to display time during a race. You can either display the time on a part using a Surface GUI, like in the
  [Create a Timed Bridge tutorial](../coding-4/create-a-timed-bridge.md).

```lua title ="Completed script"
local timePassed = 0
local finishLine = script.Parent

-- Used to keep finish() and timer from repeating when race is over
local raceActive = true

-- Runs when the player touches the finish line and shows them an award
local function finish()
   raceActive = false
   print("You finished in " .. timePassed)

   if timePassed <= 10 then
      print("You get a gold medal!")
   elseif timePassed > 10 and timePassed <= 20 then
      print("You get a silver medal!")
   elseif  timePassed > 20 and timePassed <= 30 then
      print("You get a bronze medal!")
   else
      print("Try again!")
   end
end


-- Checks if a player touches the part when a race is active
local function partTouched(otherPart)
   local character = otherPart.Parent
   local humanoid = character:FindFirstChildWhichIsA("Humanoid")
   if humanoid and raceActive == true then
      finish()
   end

end

finishLine.Touched:Connect(partTouched)

-- Keeps track of race time while the race is active. Needs to be at script bottom.
while raceActive == true do
   task.wait(1)
   timePassed += 1
   print(timePassed)
end
```
