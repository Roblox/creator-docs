---
title: Intro to Arrays
description: Learn how to use arrays in Roblox Lua to store multiple values at a time. This tutorial shows how to create and change arrays while making an interactive NPC in Roblox.
next: /tutorials/fundamentals/coding-5/loops-and-arrays
prev: /tutorials/fundamentals/coding-5/landing
---

**Data structures** are how coders store and organize entire sets of data. In Lua, data structures are created with tables. **Tables** can hold any number of values.

This article covers using **arrays**, a specific table type, to create a talking character.

<img src="../../../assets/education/coding-5/coding4_introToTables.jpg" width="75%" />

## Tables

**Tables** are data types that can hold multiple values. Unlike other data types that store a single value, tables don't have a fixed size and can hold a mix of different value types. With tables, you can store items in a player's inventory or create a list of thousands of player names.

### Arrays

There are different types of tables. One type is an **array**, which stores lists of values in a specific order. To create an array, create a variable and assign it curly brackets `{ }`. Separate values within the brackets with commas like below:

`local myArray = {"item1", "item2", 10, workspace.Part, myVariable}`

### Creating a Talking Character

To explore arrays, you'll work with a non-playable character (NPC) that, when clicked, shows a different line of dialogue.

<video controls src="../../../assets/education/coding-5/introArrays_projectTotal_optimized.mp4" width="80%"></video>

This project will use a pre-made NPC model, which includes a partial script and Prompt Detector but lacks dialogue.

1. Download the template NPC.

   <a href="../../../assets/education/coding-5/TemplateNPC.rbxm">
   <Button variant="contained">Download</Button>
   </a>

2. In Explorer, import the NPC by right-clicking on **Workspace** > **Insert From File** and select the downloaded file.

## Coding a Dialogue Array

These steps use an array to store different phrases for the NPC to say when players interact with it.

1. In the **Explorer**, go to NPC > ProximityPrompt > ChatManager.

2. In ChatManager, where marked in the script, create an **empty array** to store dialogue options.

   ```lua
      -- Cycles through chat dialogue when prompt is used

      local Chat = game:GetService("Chat")

      local prompt = script.Parent

      local npc = prompt.Parent
      local characterParts = npc.CharacterParts
      local head = characterParts.Head

      -- Add array here
      local dialogueArray = {}

      local function speak()
         local dialogue = "I've got one thing to say!"
         Chat:Chat(head, dialogue)
      end

      prompt.Triggered:Connect(speak)
   ```

3. Within the brackets `{}` of the array just created, type at least three strings of dialogue, separated by commas.

   ```lua
   local dialogueArray = {"Hi!",  "Do I know you?",  "Goodbye!"}
   ```

## Using Array Indexes

Each value in the array is assigned an `index` number. Indexes are assigned to values in the order in which the values are stored. The first value is at index 1, the second at index 2, and so forth.

Some coding languages, like Java, start indexes at 0.

In the array just created, `"Hi"` is at index 1, and `"Goodbye!"` is at index 3.

<table>
<thead>
   <tr>
      <th>Index</th>
      <th>Value</th>
   </tr>
</thead>
<tbody>
   <tr>
      <td>1</td>
      <td>Hi</td>
   </tr>
   <tr>
      <td>2</td>
      <td>Today's a great day!</td>
   </tr>
   <tr>
      <td>3</td>
      <td>Good bye!</td>
   </tr>
</tbody>
</table>

## Using Specific Index Values

Use index values to assign specific pieces of dialogue to the NPC. To use a value at a specific index, add the index after the array's name without any spaces, like `dialogueArray[1]`.

1. Replace the `dialogue` variable's default string value with index 2.

   ```lua
    local dialogueArray = {"Hi!", "Do I know you?", "Goodbye!"}

    local function speak()
      local dialogue = dialogueArray[2]
      Chat:Chat(head, dialogue)
    end
   ```

   <Alert severity="warning">
   If an index doesn't exist, a nil error will display in Output. For example, since this array has three values, using index[4] will result in an error.
   </Alert>

2. Playtest and click the NPC. The second array value should appear in the chat bubble. Try changing the code to test out each value in the table.

   <img src="../../../assets/education/coding-5/introArrays_showSpeech.jpg" width="75%" />

## Changing Dialogue Lines

When the player interacts with the NPC, the NPC will always say the same line. That's boring. Instead, use a variable to update which index value to use.

Whenever a player interacts with the NPC, increment the variable value by 1 to display the following line of dialogue.

1. To keep track of the current index, add a new variable named `dialogueIndex`. Set the variable to 1 to start at the beginning of the array.

   ```lua
    local dialogueArray = {"Hi!", "Do I know you?", "Goodbye!"}
    local dialogueIndex = 1
   ```

2. In `speak()`, **replace** the index number in `dialogueArray[2]` with the variable you just created.

   ```lua
    local function speak()
      local dialogue = dialogueArray[dialogueIndex]
      Chat:Chat(head, dialogue)
    end
   ```

3. At the bottom of the function, add 1 to `dialogueIndex`. The next time `speak()` is called, the dialogue will display the next string.

   ```lua
    local function speak()
      local dialogue = dialogueArray[dialogueIndex]
      Chat:Chat(head, dialogue)

      dialogueIndex += 1
    end
   ```

4. Playtest and click the NPC to see each dialogue string from the array.

   <video controls src="../../../assets/education/coding-5/introArray_showDialogIndexes_optimized.mp4" width="75%"></video>

Notice there's an **error** in the Output Window once the script reaches the end of the array.

You'll fix this in the next section so the dialogue restarts from the beginning after it shows the last string.

## Array Sizes

You can use the size of the array to know when to reset the desired index to 1. Find the **size** of an array by typing `#`, without spaces, before an array's name.

For example: `#dialogueArray`

Check the array's size against the variable's current value to know when it's time to start back at the beginning.

### Restarting the Dialogue

Use the array size to check when it's time to cycle back to the first piece of dialogue.

1. Add an if statement and check if `dialogueIndex` equals `#dialogueArray`, the total size of this array. If so, then set `dialogueIndex` to 1.

   ```lua
    local function speak()
      local dialogue = dialogueArray[dialogueIndex]
      Chat:Chat(head, dialogue)

      if dialogueIndex == #dialogueArray then
        dialogueIndex = 1
      end

      dialogueIndex += 1
    end
   ```

2. If `dialogueIndex` isn't at the end, it should still add 1 to `dialogueIndex`. Move `dialogueIndex += 1` under an else statement.

   ```lua
    local function speak()
      local dialogue = dialogueArray[dialogueIndex]
      Chat:Chat(head, dialogue)

      if dialogueIndex == #dialogueArray then
        dialogueIndex = 1
      else
        dialogueIndex += 1
      end
    end
   ```

3. Play and confirm you can cycle through and restart the dialogue.

   <video controls src="../../../assets/education/coding-5/introArrays_showFullLoopIndexes_optimized.mp4" width="75%"></video>

## Summary

Data structures are how sets of data are stored. Lua uses tables to create data structures. Arrays are a type of table that can hold ordered lists of information. Each value within the array is assigned an index number, starting with index 1.

This script used an array to create a list of possible dialogue lines for a Non-Playable Character (NPC).

```lua title="Completed script"
   -- Cycles through chat dialogue when prompt is used

   local Chat = game:GetService("Chat")

   local prompt = script.Parent

   local npc = prompt.Parent
   local characterParts = npc.CharacterParts
   local head = characterParts.Head

   -- Add array here
   local dialogueArray = {"Hi!",  "Do I know you?",  "Goodbye!"}
   local dialogueIndex = 1

   local function speak()
      local dialogue = dialogueArray[dialogueIndex]
      Chat:Chat(head, dialogue)

      if dialogueIndex == #dialogueArray then
         dialogueIndex = 1

      else
         dialogueIndex += 1
      end
   end

   prompt.Triggered:Connect(speak)
```

### Troubleshooting Tips

If the character doesn't go through the array of dialogue, try the following troubleshooting tips.

- Check the if statement that `dialogueIndex` is set back to 1. In the else statement, check that `dialogueIndex` has 1 added to itself.
- When getting the array's size, ensure there are no spaces after the # in `#dialogueArray`.

## Optional Challenges

Try one of the optional challenges below.

- Code the script so the NPC's dialogue goes backward through the array. The dialogueIndex should start at the array and subtract each time instead of adding.
- Instead of showing dialogue in order, have the NPC show a random line of dialogue each time using `Datatype.Random.new()`. A sample script is included below to reference

```lua
   local randomGenerator = Random.new()

   -- Shows a new dialogue whenever the NPC is clicked
   local function speak()
      local randomIndex = randomGenerator:NextInteger(1, #dialogueArray)
      local dialogue = dialogueArray[randomIndex]
      Chat:Chat(head, dialogue)
   end
```
