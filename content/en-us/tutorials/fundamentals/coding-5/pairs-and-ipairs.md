---
title: pairs and ipairs
description: pairs() and ipairs() are used to go through Luau tables. This lesson covers how to code them for a script and when to use them.
next: /tutorials/fundamentals/coding-5/return-values-from-tables
prev: /tutorials/fundamentals/coding-5/intro-to-dictionaries
---

Many scripts will often need to go through dictionaries or arrays. But sometimes, you may not know the start and end of these data structures. For example, a dictionary of players may be changing, or players may have an array inventory of varying sizes.

In these situations, you can use `pairs()` and `ipairs()`. These can be used with a for loop to go through each element without known start and end points.

This article will cover using them, and have a practical script example where you track restaurant orders in a cooking game.

## Dictionaries and pairs()

`pairs()` is used with **dictionaries**. An example is seen below.

```lua
local myDictionary = {
	["Blue Player"] = "Ana",
	["Gold Player"] = "Binh",
	["Red Player"] = "Cate",
}

for key, value in pairs(myDictionary) do
	print(key .. " is " .. value)
end
```

`pairs()` can be used to work with a dictionary element's key, value, or both. In the for loop below, the first variable is the key. The second variable is the value. The dictionary that you want to work with is passed in to `pairs()`.

```lua
local inventory = {
	["Gold Bricks"] = 43,
	Carrots = 3,
	Torches = 2,
}

print("You have:")

for itemName, itemValue in pairs(inventory) do
	print(itemValue, itemName)
end
```

When executed, the code will print the following:

```lua
You have:
43 Gold Bricks
3 Carrots
2 Torches
```

## Arrays and ipairs()

`ipairs()` is used with **arrays**. The "i" in `ipairs()` stands for "index." Use ipairs() and arrays in combination with a for loop to work with ordered values like leaderboards. An example is below.

```lua
local players = {"Ali", "Ben", "Cammy"}

for playerRank, playerName in ipairs(players) do
	print("Winner #" .. playerRank .. " is " .. playerName)
end
```

When executed, the code will print the following:

```lua
Winner #1 is Ali
Winner #2 is Ben
Winner #3 is Cammy
```

## Practice - Restaurant Soup Simulator

Let's make some soup for a restaurant simulator where players pick from a list of possible soup ingredients. The ingredients will be stored as keys, and the values will start off as false so the players only get what they select.

Use `pairs()` to see what was picked, and then `ipairs()` to print the list of ingredients.

1. Create a new **dictionary** named `menu`. Add 3 - 5 key-value pairs where the key is the ingredient and the value is false.

   ```lua
   local menu = {
   	cabbage = false,
   	beef = false,
   	tomato = false,
   	noodles = false,
   }
   ```

2. Beneath the menu dictionary, add an **empty array** which will be filled with the customer's choices later.

   ```lua
   -- Customer's soup
   local selectedIngredients = {}
   ```

3. Use `pairs()` to check if each ingredient in the dictionary is marked true or false. If true, add the ingredient to soup.

   ```lua
   -- Customer's soup
   local selectedIngredients = {}

   -- Adds customer's choices to their soup
   for menuChoice, value in pairs(menu) do
   	if value then
   		table.insert(selectedIngredients, menuChoice)
   	end
   end
   ```

4. Repeat the order back to the customer. In the script, code the following below.

   - Check if there is a menu item in `selectedIngredients`. If so, print `"You ordered soup with: "`.
   - Use `ipairs()` to go through the `selectedIngredients` array and print each ingredient.
   - Test by changing at least one menu item to true.

   ```lua
   -- Prints soup order from "selectedIngredients"
   if #selectedIngredients > 0 then
   	print("You ordered soup with: ")
   	for index, soupIngredient in ipairs(selectedIngredients) do
   		print(soupIngredient)
   	end
   end
   ```

5. In the if statement that checks if there is a menu item, add an else condition which tells customers if no ingredients were selected.

   ```lua
   if #selectedIngredients > 0 then
   	print("You ordered soup with: ")
   	for index, soupIngredient in ipairs(selectedIngredients) do
   		print(soupIngredient)
   	end
   else
   	print("Nothing was selected. Are you not hungry?")
   end
   ```

   <Alert severity="info">
   The above step is an example of error checking in computer science. It's always a good practice to code what happens if there's a missing value possible in your code. If not, it's possible there might be an error during run time.
   </Alert>

## Optional challenges

Below are some challenges that apply using pairs and ipairs in different ways. Try seeing if you can build out the code for these.

**Challenge**: Create a Waiter NPC
Instead of using the Output window, use the NPC from [Intro To Arrays](../coding-5/intro-to-arrays.md) to create a waiter to take customer orders.

**Challenge**: Allow Players to Place Orders
Allow players to select an ingredient by touching a physical part such as a proximity prompt. For more information, see [Proximity Prompts](../../../ui/proximity-prompts.md).

**Advanced Challenge**: Make Me Some Soup Simulator
Create a restaurant simulator where players are the chefs! Players will have to put together ingredients to match the order given to them by the waiter.

1. Create in-game props for 3 - 5 different ingredients.
2. Create 3 - 5 recipes using dictionaries similar to the one in this lesson.
3. Create an array that holds all of the recipes.
4. Randomly select a recipe and use an NPC to tell players what the ingredients are.
5. Create a new dictionary to make a recipe based off which prop ingredients the player touches.
6. Compare the player's recipe to the recipe chosen by the NPC.
7. Increase the challenge by adding an extra condition, such as a timer.
