---
title: Code the story
description: Part of the Story Games series that teaches you to code in Roblox. Use string variables and concatenation to code the story script.
next: /education/build-it-play-it-story-games/finish-and-add
prev: /education/build-it-play-it-story-games/second-challenge
---

After the player answers all of the questions, they'll get to see their answers combined with the story. The story will also be stored in a variable using strings and then be combined with the strings holding the player's answers.

## Code the first string

Remember the first sentence you wrote for the story? Time to add that into the code.

1. Make sure the playtest is stopped.
2. Go back to the script by clicking on the StoryManager script tab above the game editor. If you don't see the script, look at the Explorer, find StoryManager, and double click it.
3. Under where you typed the question, create a new variable named `story`. Make sure the variable name is **lowercase**.

   ```lua
     -- Code story between the dashes
     -- =============================================
        local name1 = storyMaker:GetInput("What is your favorite name?")

        local story
     -- =============================================
   end
   ```

4. To find the first string, go back to the original story. Circle or highlight everything **before** the first placeholder. If your variable happens to be in the middle of a sentence, the rest can be added later.

   **Original Placeholder**: _In a tree on a hill, lives the great wizard_ name1.

5. Have the story variable store the string like below. Make sure to add a space after the last word but before the quotation mark.

   ```lua
     -- Code story between the dashes
     -- =============================================
        local name1 = storyMaker:GetInput("What is your favorite name?")

        local story = "In a tree on a hill lives the great wizard "
     -- =============================================
   ```

## Add the name

Next, the first string of the story needs to be combined with the player's answer. Combining things together is called **concatenation**. To combine the two strings together, use `..`

1. On the same line as the story variable, type ..

   ```lua
     -- Code story between the dashes
     -- =============================================
        local name1 = storyMaker:GetInput("What is your favorite name?")

        local story = "In a tree on a hill lives the great wizard " ..
     -- =============================================
   ```

2. Still on the same line, type the name of the variable holding the player's answer.

   ```lua
       -- Code story between the dashes
       -- =============================================
           local name1 = storyMaker:GetInput("What is your favorite name?")

           local story = "In a tree on a hill lives the great wizard " .. name1
       -- =============================================
   ```

## Show the story

Now that the story is typed, it needs to be shown to players. T

1. Under the second dashed line, find `storyMaker:Write()`. Between the `()`, type the variable `story`. This tells the program to write the story in the game.

   ```lua
     -- Code story between the dashes
     -- =============================================
         local name1 = storyMaker:GetInput("What is your favorite name?")

         local story = "In a tree on a hill lives the great wizard " .. name1
     -- =============================================


       -- Add the story variable between the parenthesis below
       storyMaker:Write(story)
   ```

2. Playtest the game. You should see the two strings (show by different colors in the picture below) combined together.

   <img src="../../assets/education/story-games/wcc2018_annotatedStory.png" />

### Troubleshooting tips

If the sentence didn't show up, try one of the following.

**If the question is not being asked**:

- Check that the question is inside of quotation marks.

**If the story is combined**:

- The first part of the story is inside of quotation marks.
- The name of the variable holding the player answers matches exactly. Capitalization counts!
- The name of the variable holding the player's answer is not inside of quotation marks.
- The two strings are separated by `..`

**If the story doesn't appear**:

- Look at `storyMaker:Write()`. Check that in between the `()` is the `story` variable.
