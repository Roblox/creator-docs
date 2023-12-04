---
title: Intro to Dictionaries
description: Learn how to use a dictionary table to tag values within data sets.
next: /tutorials/fundamentals/coding-5/pairs-and-ipairs
prev: /tutorials/fundamentals/coding-5/making-changes-to-arrays
---

Dictionaries are tables that associate names or "\*keys\*\*" with a value instead of an index.

Example:

```lua title="Lua dictionary syntax"
 local pet = {
    Name = "Bobbie",
    Type = "Dog",
 }
```

Use dictionaries when you need to label values, not just list them in order as an array does —practice using dictionaries in this tutorial by manipulating values associated with a player.

## Dictionary Syntax

Like arrays, dictionaries are assigned to a variable with curly brackets`{}`. **Key value pairs** are stored on separate lines followed by a comma. Keys and values can be any data type, including strings, numbers, and variable names.

```lua
 local playerNames = {
    player1 = "Zap",
    player2 = "Kel",
 }
 print(playerNames["player1"])
```

To reference parts or other instanced objects as keys, use brackets.

```lua
 local greenPart = workspace.GreenPart
 local redPart = workspace.RedPart

 local partList = {
    [greenPart] = true,
    [redPart] = false,
 }
 print(partList[redPart])
```

 <Alert severity="warning">
 Use consistent data types for dictionary keys. Mixing data types, such as using both strings and variables for keys, can lead to inconsistent results when manipulating the array and confuse other coders.
 </Alert>

## Creating a Dictionary

One everyday use of dictionaries is organizing player or character information. These steps explore how a theoretical enemy character's information can be stored and accessed.

1. In a new script, create a dictionary named `enemy`.

   ```lua
    local enemy = {

    }
   ```

2. The first key in the dictionary will track the enemy's name with a variable called `name`.

   ```lua
    local enemy = {
       Name
    }
   ```

3. Assign an enemy name to the key, followed by a comma.

   ```lua
    local enemy = {
      name = "Spike",
    }
   ```

4. Add a second key-value pair for how much health the enemy should have. Remember, keys should always use the same data type, but values don't have to.

   ```lua
    local enemy = {
       Name = "Spike",
       Health  = 1000,
    }
   ```

### Using Dictionary Values

There are two ways to access dictionary values:
`tableName["keyName"]` -- Note the quotations
`tableName.keyName`

```lua
local enemy = {
   Name = "Spike",
   Health  = 1000,
}

print ("The villain "  ..  enemy["Name"]  ..  " approaches!")
print ("The villain "  ..  enemy.Name  ..  " approaches!")
```

Which style to use usually depends on the purpose of the table. For tables holding a collection of values like a list of players in a server, coders will usually use tableName["keyName"]. For a dictionary used to describe an object, coders are more likely to use tableName.keyName.

## Changing a Dictionary Value

Changing a key's value is the same as any other variable; use the equal `=` operator.

1. Beneath the `enemy` table, set the enemy's name to something else.

   ```lua
      local enemy = {
      Name = "Spike",
      Health = 1000,
      }

      enemy.Name = "Rana"

      print ("The enemy's name is "  ..  enemy.Name)
   ```

2. Playtest and check the Output window.

## Pre-existing Variables as Keys

Dictionaries can interact with pre-existing variables declared in other parts of a script. The following coding example uses a variable to add a player's name as a key when they join the experience and then sets their points value to 0.

1. In **ServerScriptService**, create a new script named PlayerPoints. In the script, get the Players Service and create an empty dictionary named `playerPoints`.

   ```lua
      Players = game:GetService("Players")

      local playerPoints = {

      }
   ```

2. Code a local function for setting player points with a parameter for a new player variable. Connect the function to the `Class.Players.PlayerAdded` event.

   ```lua
      local playerPoints = {

      }

      local function setPoints(newPlayer)

      end

      Players.PlayerAdded:Connect(setPoints)
   ```

3. In the function, add a variable to get the player's `Name`, a property in every **Player** object, and a print statement for testing.

   ```lua
      local function setPoints(newPlayer)
         local name = newPlayer.Name
         print("hello " .. name)
      end
   ```

4. Insert name into the `playerPoints` dictionary as a key, and set the value, the player's points, to 0.

   ```lua
      local function setPoints(newPlayer)
         local name = newPlayer.Name
         print("hello " .. name)
         playerPoints[name] = 0
      end
   ```

    <Alert severity="warning">
     Since `name` was created as a variable, it can be accessed with the actual variable name. If `name` had been simply a key name, it would need to be accessed the same as other strings, playerPoints["name"]

    </Alert>

5. Use `name` to print the name of the player and playerPoints[name] to print the value of the key matching the variable.

   ```lua
      local function setPoints(newPlayer)
      local name = newPlayer.Name
      print("hello "  ..  name)
      playerPoints[name] = 0
      print( name  ..  " has "  ..  playerPoints[name] ..  " points.")
      end
   ```

6. Run the project and look into the output editor.

```lua title="Finished script"
   Players = game:GetService("Players")

   local playerPoints = {

   }

   local function setPoints(newPlayer)
      local name = newPlayer.Name
      print("hello " .. name)
      playerPoints[name] = 0
      print( name .. " has " ..playerPoints[name] .. " points.")
   end

   Players.PlayerAdded:Connect(setPoints)
```

### Optional Challenges

Below are some challenges that apply to using dictionaries in different ways. See if you can build out the code for these.

- Create a trap part that does damage over time to a player. Once a player touches the trap, damage them, wait, then allow them to be damaged again.
- Create a function that checks which of two players has the most points by accessing a dictionary.
- Create a cipher, a system of swapping one word for another to create a "secret" code, for example, how the letter "A" can be swapped with "G", or how the word apple can be swapped for the word orange.

## Dictionaries and pairs()

`pairs()` is a function that's often used to iterate through **dictionaries**. An example is seen below.

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
    Torches  = 2,
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

## Summary

Dictionaries are tables that use key-value pairs instead of indexed values. Dictionaries and arrays start similarly by assigning curly brackets to a variable. Keep entries separated with commas.

All keys within a dictionary should use the same data type, but the values can mix data types without issue.

The style of how a dictionary is accessed can convey the purpose of a dictionary. A dictionary of enemy properties will likely be accessed with the dot operator, while a list of names will likely use tableName[keyName].

When using brackets, be careful; key names created within the table must be treated as strings: `tableName["keyName"]`. However, when referencing objects like parts, the quotations are not needed: `tableName[keyName]`.

Many scripts need to go through dictionaries or arrays, but you may not always know the start and end of these data structures. For example, a dictionary of players may be changing, or players may have an array inventory of varying sizes.

In these situations, you can use `pairs()` and `ipairs()` in a `for` loop to go through each element without known start and end points. You can also use general iteration through the `in` keyword to loop through elements without the need for `pairs()` or `ipairs()`.
