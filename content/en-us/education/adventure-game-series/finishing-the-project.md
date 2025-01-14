---
title: Finish the project
description: Part of the Adventure Game Series in Roblox. Finish the project by adjusting scripts.
next:
prev: /education/adventure-game-series/buying-upgrades
---

Your experience is almost ready for others to play! Before sharing, you'll make some small changes to scripts, build out your world a bit more, and then play-test your experience.

## Start player variables

While making the experience, many variables were set to small values, like the player's starting spaces was 2. While this made it easy to test, this might not be the right number for players in their final experience.

Before sharing your experience with others, it's important that the variables feel **challenging**, but **fair**. Getting the right numbers for an experience will give players a more fun experience.

1. In ServerScriptService > PlayerSetup change the value of `Spaces`. Remember this is how many spaces a player has to hold items before they must sell them. A number between 6-10 is a good starting point, but play-testing for the right amount is best.

   ```lua
   local maxSpaces = Instance.new("IntValue")
   maxSpaces.Name = "Spaces"
   -- 6 as a possible value for a player's bag
   maxSpaces.Value = 6
   ```

2. In SellPart > SellScript, change the value of how much players get for each item. This is the number multiplied by `playerItems.Value`. Try a number between 50 and 200.

   ```lua
   local totalSell = playerItems.Value * 200
   ```

3. In Shop > BuyButton > BuyScript, change the starting values in the variables for `newMaxItems` (recommended 10-15) and `upgradeCost` (recommended 500-1000).

   ```lua
   -- Possible values for a game
   local newMaxItems = 15
   local upgradeCost = 500
   ```

## Add more items

Where you place your items will affect how much fun a player has getting them. Different placements and obstacles to getting items are two ways of making item collection more fun.

<img src="../../assets/education/adventure-game-series/map-crystals.jpg" />

## Playtesting and feedback

Each number that a game designer uses for something in their experience is an educated guess based on what might be fun. Each part of your experience should be challenging, but fair.

Giving a player 10 spaces to start with might sound fun, but you don't really know until you test out the project. Always test to see if it feels fun, and ask friends to play-test it as well. As you play-test, think about these questions.

- Does the player have to walk a lot to find an item or are they too easy to find?
- Does the cost of upgrading feel too easy or too hard?
- Are there any bugs that you didn't notice?

## Expand the experience

Although you've finished the course, there are many ways you can continue adding to your experience using the skills you've learned:

- Make more than one item for players to collect
- Create different types of upgrades
