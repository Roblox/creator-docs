---
title: Start coding
description: Part of the Story Games series that teaches you to code in Roblox. Open the script used to manage the experience.
next: /education/build-it-play-it-story-games/coding-a-question
prev: /education/build-it-play-it-story-games/first-challenge
---

In Roblox, code is typed inside of **scripts** using the coding language [Luau](https://luau.org). Games often have separate scripts for each thing the game needs to do. The library template already has a script named **StoryManager** which you'll add more code to for your word game.

## Find the StoryManager

1. In the **Explorer** window, click the arrow next to **StarterGUI** to see everything beneath it.
2. Click the arrow next to **GameGUI** to expand that section.
3. Double-click the **StoryManager** script to open it.

   <img src="../../assets/education/story-games/StoryManager.png" width="40%" />

## Script contents

The script already contains some of the code that's necessary for showing the completed story to the player. All of the code you create will be typed below the dashed lines.

For now, notice how a large portion of the script starts with the `--` symbol. Lines of code starting with `--` are called **comments**. These are used to leave notes for coders and don't change the way a program runs.

```lua
-- GLOBAL VARIABLES
local storyMaker = require(script:WaitForChild("StoryMaker"))

-- Code controlling the game
local playing = true

while playing do
	storyMaker:Reset()

	-- Code story between the dashes
	-- =============================================


	-- =============================================

	-- Add the story variable between the parenthesis below
	storyMaker:Write()

	-- Play again?
	playing = storyMaker:PlayAgain()
end
```
