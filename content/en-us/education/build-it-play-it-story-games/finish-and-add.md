---
title: Finish and add more
description: Part of the Story Games series that teaches you to code in Roblox. Continue adding more to the story script.
next: /education/build-it-play-it-story-games/third-challenge
prev: /education/build-it-play-it-story-games/code-the-story
---

<img src="../../assets/education/story-games/wcc_heroUsing.jpg" width="100%" />

You're **almost** done with the project!

What's left is to complete the first sentence, then add in another question to give players some more choice.

## Finish the sentence

To add more words or punctuation to the sentence, add another string using concatenation.

1. On the same line as the story variable, type `..`
2. Add another string containing the rest of the sentence, or just punctuation. Don't forget to add an extra space at the end of the sentence.

   ```lua
     -- Code story between the dashes
     -- =============================================
        local name1 = storyMaker:GetInput("What is your favorite name?")

        local story = "In a tree on a hill lives the great wizard " .. name1 .. ". "
     -- =============================================
   ```

## Add a second question

To ask a second question, create a new question and keep adding to the same variable holding the story.

1. Decide what word to delete from the second sentence in your story.

   **Original Placeholder:** _Every morning, the wizard loves eating a giant bowl of honey roasted_ **food1**.

2. Beneath the first variable, create a new variable to act as a placeholder.

   ```lua
      local name1 = storyMaker:GetInput("What is your favorite name?")
      local food1

      local story = "In a tree on a hill lives the great wizard " .. name1 .. ". "
   ```

3. Use `storyMaker:GetInput("")` to ask the player a question and store their answer.

   ```lua
      local name1 = storyMaker:GetInput("What is your favorite name?")
      local food1

      local story = "In a tree on a hill lives the great wizard " .. name1 .. ". "
   ```

4. In the story variable, concatenate the next story string using `..` Be sure to include a space after the end of the sentence.

   ```lua
   local name1 = storyMaker:GetInput("What is your favorite name?")
   local food1 = storyMaker:GetInput("What is your favorite food?")

   local story = "In a tree on a hill lives the great wizard " .. name1 .. ". " .. "Every morning, the wizard loves eating a giant bowl of honey roasted "
   ```

   <Alert severity="info">
   You may need to scroll in the code editor window to the right for longer sentences.
   </Alert>

5. After the new story string, concatenate the answer for the second question and finish with punctuation.

   ```lua
   local name1 = storyMaker:GetInput("What is your favorite name?")
   local food1 = storyMaker:GetInput("What is your favorite food?")

   local story = "In a tree on a hill lives the great wizard " .. name1 .. ". " .. "Every morning, the wizard loves eating a giant bowl of honey roasted " .. food1 .. ". "
   ```

## Optional additions

If you're interested in developing the story more, we've included some ideas. For example, some ways of improving the story include:

- Add more lines to your story
- Playtest the game every time you add a new set of variables and strings
- Ask a peer or friend on what other words they would like to customize.

Also, below are some **tips and tricks** to make stories for fun for players.

### Use variables more than once

Variables can be used more than once — just use concatenation between strings where you want to include the word(s).

**Example Code**:
`"I am " .. name1 .. " and you are in the palace of " .. name1 .. "!"`

**Result**:
I am Sameth and you are in the palace of Sameth!

### Add line breaks

Line breaks can be added by typing `\n` in a string. Also, more than one line break can be combined like `\n\n`.

**Example Code**:
`"One \n Two \n\n Three"`

**Result**:

One

Two
<br />
<br />
Three
