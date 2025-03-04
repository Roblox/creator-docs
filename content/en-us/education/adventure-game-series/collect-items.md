---
title: Collect items
description: Part of the Adventure Game Series in Roblox. Code a tool to collect items.
next: /education/adventure-game-series/selling-items
prev: /education/adventure-game-series/code-the-leaderboard
---

With the leaderboard created, players need something to collect. For that, you need to create a 3D item for players to find in the world. Below is a video of the process of players harvesting items.

<video controls src="../../assets/education/adventure-game-series/adventure-harvestItemShort.mp4" width="100%"></video>

## Build an item

Items in the experience are 3D models that players use a tool to harvest. Each item, once harvested, disappears and then reappears after a limited amount of time.

For the item, refer back to your game design document. This series uses crystals as the example.

1. Create an object, either using parts or objects found by trusted users in the Marketplace.

   If desired, download the crystal part with this [link](../../assets/education/adventure-game-series/crystalPart.rbxm). To add it, right-click on the Workspace and select **Insert from File**.

   <img src="../../assets/education/adventure-game-series/adventure-item-example.jpg" />

2. If using your own part, group all the parts into a **Model**. One way of doing this is to select all items, right-click on a part, and select **Group**. This creates a model that organizes your parts.

   <img src="../../assets/education/adventure-game-series/adventure-show-group.png" />

3. Make sure that the parts are all **anchored**.

4. So items cannot be harvested while they disappear, create a **BoolValue** named CanHarvest to track its status.

   <img src="../../assets/education/adventure-game-series/createdBoolValue.png" />

5. In Properties for CanHarvest, check the **Value** box. Checking the value box makes the boolean true, meaning players can harvest the item.

   <img src="../../assets/education/adventure-game-series/adventure-show-boolTrue.png" />

## Create a tool

Players need something like an ax or a shovel to gather items with. In Roblox, items that players can equip and use are called **tools**. This lesson uses a starter tool with all the parts and an animation already made that you can customize later.

<img src="../../assets/education/adventure-game-series/adventure-toolWithPlayer.jpg" />

### Add the tool

For players to use the starter tool, download and place it in the StarterPack.

1. Download the starter tool below.

   <a href="../../assets/education/adventure-game-series/starterTool.rbxm">
   <Button variant="contained">Download Tool</Button>
   </a>

2. In Explorer, under Workspace, right-click on StarterPack. Then, select **Insert from File**.

   <img src="../../assets/education/adventure-game-series/tools_starterPackClick.png" />

3. Select the downloaded file, `starterTool.rbxm`.
4. Playtest your project. Players should be equipped with the tool as soon as they start. In-game, press <kbd>1</kbd> to equip or put away the tool. Left-click to swing it.

   <img src="../../assets/education/adventure-game-series/adventure-toolWithPlayer.jpg" />

    <Alert severity="info">
    If you want to rename the starter tool, just rename the object in StarterPack. That name displays to players.
    </Alert>

## Code the tool

If the tool hits a harvestable object and the player has enough space in their bag, the player's item count goes up by 1 on the leaderboard. Harvesting an item makes it disappear for a few seconds and become unharvestable for a few seconds before reappearing. This encourages players to explore to find more items, instead of just clicking the same item.

### Set up the script

At this point, add a script to the tool. This script handles what happens when the tool touches a harvestable object.

1. In StarterPack, under StarterTool, add a new script named ToolScript.

   <img src="../../assets/education/adventure-game-series/adventure-addToolScript.png" />

2. In the script, write a descriptive comment at top, and then create variables to store the tool part and the tool itself.

   ```lua
   -- Gives players item when they touch a harvestable part
   local tool = script.Parent
   local toolPart = tool.Handle
   ```

### Check for items

Whenever the tool touches an object, it checks if that object has CanHarvest inside and if the boolean is set to True.

1. Create a new function named `onTouch()` with a parameter named `partTouched`.

   ```lua
   local tool = script.Parent
   local toolPart = tool.Handle

   local function onTouch(partTouched)

   end
   ```

2. In that function, create a local variable named `canHarvest`. Then, use the `FindFirstChild()` function to see if there is CanHarvest boolean in the parent of that part.

   ```lua
   local function onTouch(partTouched)
     local canHarvest = partTouched:FindFirstChild("CanHarvest")
   end
   ```

3. Now the script needs to check if there was actually anything found and if so, run the code. To do this, create an if statement where the condition is `canHarvest`. If anything exists in `canHarvest`, this statement evaluates to true.

   ```lua
   local function onTouch(partTouched)
     local canHarvest = partTouched:FindFirstChild("CanHarvest")
     if canHarvest then

     end
   end
   ```

4. In the if statement, add a print statement to see if the script is working. You can code the logic for harvesting items after you're sure it works.

   ```lua
   if canHarvest then
       -- Used for testing if code works
     print("Found an item")
   end
   ```

5. Under the function's `end` statement, add `toolPart.Touched:Connect(onTouch)`. This lets the script check if anything is touching the tool (or in this case, its handle) and if so, calls `onTouch()`.

   ```lua
   local function onTouch(partTouched)
     local canHarvest = partTouched:FindFirstChild("CanHarvest")
     if canHarvest then
       print("Found an item")
     end
   end

   toolPart.Touched:Connect(onTouch)
   ```

6. Play the project and use the tool on a harvestable item (left-click to swing). Make sure you see the message "Found an item" in the Output window.

   <img src="../../assets/education/adventure-game-series/adventure-testedTool.jpg" />

### Troubleshooting tips

If you don't see the message, try the following tips.

- If you're using custom parts and meshes, it's possible to get an error. The script only works if the CanHarvest object is a child of the part the tool is touching.
- Make sure that the tool is in the StarterPack, not in the Workspace.
- Check that the part is anchored.

### Get player stats

Before increasing the player's items, the tool must find the location of how many items a player has in that player's leaderboard. Once the tool has access to the leaderboard, it can change that player's item count.

1. First, get the player using the tool. In the ToolScript, under `local item = toolitem`, and above the custom function, type:

   ```lua
   local item = toolitem

   local backpack = tool.Parent
   local player = backpack.Parent

   local function onTouch(partTouched)
   ```

2. On the next line, find the player's leaderstats using the `FindFirstChild()` function.

   ```lua
   local backpack = tool.Parent
   local player = backpack.Parent
   local playerStats = player:FindFirstChild("leaderstats")

   local function onTouch(partTouched)
   ```

3. Under `local playerStats`, create variables to store the items and spaces stats.

   ```lua
   local playerStats = player:FindFirstChild("leaderstats")
   local playerItems = playerStats:FindFirstChild("Items")
   local playerSpaces = playerStats:FindFirstChild("Spaces")
   ```

   <Alert severity="warning">
   The strings inside the `()` for `FindFirstChild()` need to be the **same** as the IntValue names in the PlayerSetup script. If you had a different name for the items, make sure it's the same as in the PlayerSetup script.
   </Alert>

### Check for a harvestable object

Now that the tool script has the playerItems and playerSpaces variables created, you can start giving players an item. Use the function created to check if the object touching the tool can be harvested, and if the player has enough space in their bag to increase the items shown on the leaderboard by one.

1. The script will need an if statement with two conditions to be met. Start by creating an if statement, then add in the following conditions, connected with the `and` keyword. .

   - `canHarvest.Value == true`
   - `playerItems.Value < playerSpaces.Value`

   ```lua
   local function onTouch(partTouched)
     local canHarvest = partTouched.Parent:FindFirstChild("CanHarvest")
     if canHarvest then
       if canHarvest.Value == true and playerItems.Value < playerSpaces.Value then

       end
     end
   end
   ```

   <Alert severity="info">
   To access the contents of any value object, type .Value at the end of it. If you just do the object itself, you'll just get it's name.
   </Alert>

2. In the if statement itself, add to the player's items by typing `playerItems.Value += 1`.

   ```lua
   if canHarvest then
     if canHarvest.Value == true and playerItems.Value < playerSpaces.Value then
         playerItems.Value += 1

     end
   end
   ```

3. Play your project; use your tool to harvest an item and check that the item count went up.

   <img src="../../assets/education/adventure-game-series/adventure-leaderboard-withItem.jpg" />

    <Alert severity="warning">
    Right now, the player's Items stat will **instantly** fill up after hitting one item. In the next section, you'll make the item reset so players only get one item from each item.
    </Alert>

### Reset the item

When the item is harvested, it will reset in two ways:

- The item will disappear and not be interactable
- CanHarvest set to false

The item will then go back to normal after a short time. This way, players only get one item for each harvest, and need to look around for more while the original resets.

1. Under where items are added, set `canHarvest` to false. By making the value of `canHarvest` false as soon as players harvest the item, the script won't give more than one item per tool hit.

   ```lua
   if canHarvest then
     if canHarvest.Value == true and playerItems.Value < playerSpaces.Value then
       playerItems.Value += 1
       canHarvest.Value = false
     end
   end
   ```

2. After setting the value to false, set the part's Transparency to 1 (invisible), and CanCollide to false, meaning players can't touch it.

   ```lua
   if canHarvest.Value == true and playerItems.Value < playerSpaces.Value then
     playerItems.Value += 1
     canHarvest.Value = false
     partTouched.Transparency = 1
     partTouched.CanCollide = false
   end
   ```

3. Type `task.wait(5)` to give time for the item to reset. 5 is a suggested number, and maybe differ for how long you'd like for your experience.

   ```lua
   if canHarvest.Value == true and playerItems.Value < playerSpaces.Value then
     playerItems.Value += 1
     canHarvest.Value = false
     partTouched.Transparency = 1
     partTouched.CanCollide = false
     task.wait(5)
   end
   ```

4. After the wait, do the opposite of previous code, by setting the CanHarvest to true, and resetting the Transparency and CanCollide to their original values.

   ```lua
     task.wait(5)
     canHarvest.Value = true
     partTouched.Transparency = 0
     partTouched.CanCollide = true
   end
   ```

5. Play the project and check:

   - The player only gets 1 item for harvesting an item.
   - The item disappears and then reappears after five seconds.

   <video controls src="../../assets/education/adventure-game-series/adventure-harvestItemFull.mp4" width="100%"></video>

### Troubleshooting tips

At this point, if one of the checks didn't pass try one of the following below.

- Check that Transparency and CanCollide are spelled and capitalized exactly.
- Make sure to use canHarvest.Value and not canHarvest = true.

## Complete ToolScript

A finished version of the script can be referenced below.

```lua
local toolPart = script.Parent
local tool = toolPart.Parent

local backpack = tool.Parent
local player = backpack.Parent
local playerStats = player:FindFirstChild("leaderstats")
local playerItems = playerStats:FindFirstChild("Items")
local playerSpaces = playerStats:FindFirstChild("Spaces")

local function onTouch(partTouched)
	local canHarvest = partTouched:FindFirstChild("CanHarvest")
	if canHarvest then
		if canHarvest.Value == true and playerItems.Value < playerSpaces.Value then
			playerItems.Value += 1
			canHarvest.Value = false
			-- Reset partTouched, the harvested item
			partTouched.Transparency = 1
			partTouched.CanCollide = false

			task.wait(5)
			-- Make the harvested item reappear and usable again
			canHarvest.Value = true
			partTouched.Transparency = 0
			partTouched.CanCollide = true
		end
	end
end

toolPart.Touched:Connect(onTouch)
```
