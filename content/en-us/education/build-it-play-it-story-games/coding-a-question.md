---
title: Code a question
description: Part of the Story Games series that teaches you to code in Roblox. Code the first question asked to players.
next: /education/build-it-play-it-story-games/test-and-save
prev: /education/build-it-play-it-story-games/start-coding
---

Remember how you wrote a sentence for your story, then swapped a word out for a placeholder? It's time to give players a chance to add something to your experience.

In the script, the placeholder you made will be a **variable**. In coding, variables are placeholders for information, in this case a word.

You'll start by asking players a question. Then, they'll type in an answer that gets **stored** in the variable.

## Create a variable

Variables have names that tell programmers what they store. In this case, you'll create a variable called `name1` for the placeholder.

1. Click below the dashed lines and type `local name1`.

   ```lua
   -- GLOBAL VARIABLES
   local storyMaker = require(script:WaitForChild("StoryMaker"))

   -- Code controlling the game
   local playing = true

   while playing do
     storyMaker:Reset()

     -- Code story between the dashes
     -- =============================================
        local name1

     -- =============================================

     -- Add the story variable between the parenthesis below
     storyMaker:Write()

     -- Play again?
     playing = storyMaker:PlayAgain()
   end
   ```

## Set a variable

Now players need to have a chance to put something inside the placeholder. To change a variable, it needs to be **set** to something using the **=** symbol.

1. After `name1`, make sure to add a space and then type `=`.

   ```lua
   while playing do
     storyMaker:Reset()

     -- Code story between the dashes
     -- =============================================
        local name1 =

     -- =============================================

     -- Add the story variable between the parenthesis below
     storyMaker:Write()
   end
   ```

2. After the equal sign, type `storyMaker:GetInput()`. The code must be typed exactly as is, and capital letters must match.

   ```lua
   while playing do
     storyMaker:Reset()

     -- Code story between the dashes
     -- =============================================
        local name1 = storyMaker:GetInput()

     -- =============================================

     -- Add the story variable between the parenthesis below
     storyMaker:Write()
   end
   ```

## Type a question

Variables can store different types of data including small numbers, true or false values, and strings. **String** type variables are special because they can store whole sentences. It's easy to spot string type variables because they're always in quotation marks "like this".

The question to ask players will be a string variable.

1. In `GetInput()`, click **between** the parentheses. Inside type a question enclosed by quotation marks.

   ```lua
     -- Code story between the dashes
     -- =============================================
        local name1 = storyMaker:GetInput("What is your favorite name?")

     -- =============================================
   end
   ```
