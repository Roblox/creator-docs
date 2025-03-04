---
title: Buy upgrades
description: Part of the Adventure Game Series in Roblox. Code a script to sell items in a Roblox experience.
next: /education/adventure-game-series/finishing-the-project
prev: /education/adventure-game-series/selling-items
---

This brings us to the last stage of the game loop - buying upgrades. By letting players buy upgrades that increase the size of their item bag, they can harvest more items per trip and earn even more gold.

## Create a shop

Each shop will have a button that players click to purchase a larger item bag. The shop itself will be a part with a SurfaceGUI, an item that allows for text to be written on parts.

### Create the sign

1. In the Workspace, create a new model named Shop.
2. In Shop, create a new block part named BuyButton.

   <img src="../../assets/education/adventure-game-series/upgrade_partCreate.jpg" />

3. In BuyButton, add a new Surface GUI by clicking the + and scrolling to GUI.

   <img src="../../assets/education/adventure-game-series/upgrade_addSurfaceGUI.png" />

4. In Surface GUI, add a new TextLabel named BuyText. A small label will appear somewhere on the part.

   <img src="../../assets/education/adventure-game-series/upgrade_showTextLabelAlt.jpg" />

5. Depending on how the part was made, the label can be somewhere else. If you don't see the text on the side you want, go into the SurfaceGUI and find the Face property. Change that property until you see the text label.

   <img src="../../assets/education/adventure-game-series/upgrade_changeGUIFace.jpg" />

   <Alert severity="warning">
   Depending on the part, the Face property might be different than shown above.
   </Alert>

### Change the sign text

Right now, the TextLabel is really small and hard for players to see. It needs to be scaled up.

1. In the BuyText properties, click on the arrow next to **Size**. Change the **Offset** for X (left and right) and Y (up and down) to 0.

   <img src="../../assets/education/adventure-game-series/upgrade_TextLabelCreate_setOffset.png" />

2. Change the **scale** of X and Y to 0.5 to make a square.

   <img src="../../assets/education/adventure-game-series/upgrade_TextLabelCreate_setScale.png" />

3. Scroll up in the TextLabel properties and click the arrow left of **AnchorPoint**. Type in 0.5 for X and Y. This moves part of your label out of view but you'll position it correctly next.

   <img src="../../assets/education/adventure-game-series/upgrade_TextLabelCreate_setAnchorPoint.jpg" />

4. Scroll-down in the properties and open **Position**. Change the scale of X and Y to 0.5 so the box is centered in the middle.

   <img src="../../assets/education/adventure-game-series/upgrade_TextLabelCreate_setPos.png" />

5. In the BuyText properties, scroll-down and change **Text** to something descriptive. For instance: `"Buy Larger Bag: 100 gold"`.
6. Check **TextScaled** to be **on**. This automatically scales your text so it fits the box.

### Add a click detector

Players will buy items by clicking on the shop rather than just touching it. The script will use a click detector to tell if a player has clicked the shop sign. **ClickDetectors** are objects that allow users to interact with something in the environment, such as opening a door.

1. In the BuyButton, add a ClickDetector.

   <img src="../../assets/education/adventure-game-series/upgrade_addClickDetector.png" />

2. In BuyButton, add a new script named BuyScript and give it a descriptive comment.

   <img src="../../assets/education/adventure-game-series/upgrade_addScript.png" />

3. In BuyScript, create variables to store the button part and click detector.

   ```lua
   -- Lets players click a button to buy an upgrade that increases Spaces
   local buyButton = script.Parent
   local clickDetector = buyButton.ClickDetector
   ```

4. Create a new function named `giveUpgrade()` that gets a parameter named `player`. The function will upgrade a player's spaces whenever they click the button.

   ```lua
   local buyButton = script.Parent
   local clickDetector = buyButton.ClickDetector

   local function giveUpgrade(player)

   end
   ```

5. After the function, type connect the click detector's `MouseClick` event to the `giveUpgrade()` function.

   ```lua
   local function giveUpgrade(player)

   end

   clickDetector.MouseClick:Connect(giveUpgrade)
   ```

6. Add a print statement in `giveUpgrade()` to test the function.

   ```lua
   local function giveUpgrade(player)
      print("Someone clicked the button.")
   end
   ```

7. **Play** your project. Click the button and check that you see the text in the Output window.

   <img src="../../assets/education/adventure-game-series/adventure-showClickDetector.jpg" />

   <Alert severity="info">
   Click Detectors have a distance from which players can interact with it. To change this distance, go to the object and modify its MaxActivationDistance.
   </Alert>

### Troubleshooting tips

**Issue:** You're unable to click the button or a mouse cursor doesn't appear on the button.

- Make sure that the ClickDetector object is a child of the part you're trying to click on.
- Check that your character is close enough to the button. Or, make sure that the tool is not equipped.

## Buy upgrades

With a working button, it's time to add code into giveUpgrade to remove a player's gold in exchange for an upgraded bag.

### Add upgrade variables

Each upgrade will have two variables: the cost of the upgrade and how many spaces it has.

1. In BuyScript, under `local clickDetector`, create two variables:

   - `newSpace`: How many spaces an upgrade adds when purchased.
   - `upgradeCost`: The cost of a single upgrade

   ```lua
   -- Variables for the upgrade
   local newSpaces = 10
   local upgradeCost = 100
   ```

### Grant upgrades

Before selling the player the upgrade, you need to check if they have enough money. If they do, you'll add to their maximum amount of spaces.

1. In `giveUpgrade()`, type the following below to get the player's leaderstats so you can access their gold and spaces variables.

   ```lua
   local function giveUpgrade(player)
      print("Someone clicked the button")
      -- Get's the player's leaderboard to get other IntValues
      local playerStats = player:FindFirstChild("leaderstats")

      if playerStats then
         -- Gets the player's money and spaces to make changes
         local playerGold = playerStats:FindFirstChild("Gold")
         local playerSpaces = playerStats:FindFirstChild("Spaces")
      end
   end
   ```

     <Alert severity="warning">
     Make sure the variable names are the same as the ones in the PlayerSetup script.
     </Alert>

2. After writing the variables for spaces, create an if statement to if the value of `playerGold` is more or equal to the upgrade cost.

   ```lua
   local function giveUpgrade(player)
      local playerStats = player:FindFirstChild("leaderstats")

      if playerStats then
         local playerGold = playerStats:FindFirstChild("Gold")
         local playerSpaces = playerStats:FindFirstChild("Spaces")

         -- Checks if player has enough money to afford the upgrade
         if playerGold and playerSpaces and playerGold.Value >= upgradeCost then

         end
      end
   end
   ```

3. In the if statement, subtract the upgrade's cost from the player's gold.

   ```lua
   if playerGold and playerSpaces and playerGold.Value >= upgradeCost then
      -- Subtract the item's cost from the player's money
      playerGold.Value -= upgradeCost
   end
   ```

4. On the next line, add the number of the player's current spaces along with the new spaces granted per upgrade.

   ```lua
   if playerGold and playerSpaces and playerGold.Value >= upgradeCost then
      playerGold.Value -= upgradeCost
      playerSpaces.Value += newSpaces
   end
   ```

5. Play your project and check the leaderboard to check if the spaces upgrade worked.

   <video controls src="../../assets/education/adventure-game-series/adventure-showUpgradePurchase.mp4" width="100%"></video>

### Troubleshooting tips

At this point, the upgrades don't work as intended, try one of the following below.

- Make sure anything in the `()` of `FindFirstChild()` has quotations on **both** sides, like `"leaderstats"`.
- Check that each string in FindFirstChild is the exact same as that IntValue's name in the PlayerSetup script. For example, if your code uses Rubies as money, you should have `FindFirstChild("Rubies")`.
- Make sure that `giveUpgrade()` is above `clickDetector.MouseClick`.

## Complete BuyScript script

A finished version of the script can be referenced below.

```lua
-- Lets players click a button to buy an upgrade that increases MaxSpaces
local buyButton = script.Parent
local clickDetector = buyButton.ClickDetector

-- Variables for the upgrade
local newSpaces = 10
local upgradeCost = 100

local function giveUpgrade(player)
	print("Someone clicked the button")
	-- Get's the player's leaderboard to get other IntValues
	local playerStats = player:FindFirstChild("leaderstats")

   if playerStats then
      -- Gets the player's money and spaces to make changes
      local playerGold = playerStats:FindFirstChild("Gold")
      local playerSpaces = playerStats:FindFirstChild("Spaces")

	   -- Checks if player has enough money to afford the upgrade
      if playerGold and playerSpaces and playerGold.Value >= upgradeCost then
      	print("Player can buy item")
      	-- Subtract the item's cost from the player's money
         playerGold.Value -= upgradeCost
         playerSpaces.Value += newSpaces
      end
   end
end

clickDetector.MouseClick:Connect(giveUpgrade)
```
