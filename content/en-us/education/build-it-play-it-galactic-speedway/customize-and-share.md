---
title: Customize and share
prev: /education/build-it-play-it-galactic-speedway/take-the-challenge-2
next: /education/build-it-play-it-galactic-speedway/going-for-a-race
description: Learn how to modify a Luau script in Roblox Studio to customize how your spaceship handles and flies in the Build It Play It Galactic Speedway challenge.
---

<img
src="../../assets/education/build-it-play-it-galactic-speedway/customize-and-share/hero-group.jpeg"
width="100%" />

This last lesson is all about putting the final touches on the driftspeeder, such as making it faster or quicker to turn. Once finished, take flight and share your work with friends.

## Modify the Engine

To change a driftspeeder's speed or how quickly it can turn, you'll open the **_Settings_** script. In Roblox, code is typed inside of scripts using the coding language [Luau](https://luau.org). Games often have separate scripts for each thing the game needs to do.

1. Click on your speeder.
2. In the **Explorer**, look for the **_Garage_** folder and your driftspeeder.
3. Next to the driftspeeder's name, click the &#9656; arrow to expand it. Then, find **_Body_** and click the &#9656; to see the attached script.
   <img
   src="../../assets/education/build-it-play-it-galactic-speedway/customize-and-share/open-explorer-garage.gif"
   width="50%" />
4. Double-click the **_Settings_** script to open it.
   <Alert severity="info">
   <AlertTitle>Switching Between Script and Game View</AlertTitle>
   The **game world** (A) and **script** (B) are in separate tabs. Switch back and forth as needed.
   <img
   src="../../assets/education/build-it-play-it-galactic-speedway/customize-and-share/script-tab.png"
   width="100%" />
   </Alert>

## The Settings script

In the script, you'll see words like `DefaultSpeed` or `BoostSpeed`. These words are **variables**. Variables are placeholders for information that can be changed as needed.

```lua
-- ================================================================================
-- Settings
-- ================================================================================

local Settings = {}

Settings.DefaultSpeed = 100		-- Speed when not boosted [Studs/second, Range 50-300]
Settings.BoostSpeed = 200		-- Speed when boosted [Studs/second, Maximum: 400]
Settings.BoostAmount = 10		-- Duration of boost in seconds
Settings.Steering = 5			-- How quickly the speeder turns [Range: 1-10]
-- ================================================================================

return Settings
```

Make your speeder the fastest on the track by increasing the default speed setting.

1. Change the number in the line `Settings.DefaultSpeed = 100` to any number between `50` (slower) and `300` (faster).

   ```lua
   Settings.DefaultSpeed = 100		-- Speed when not boosted [Studs/second, Range 50-300]
   Settings.BoostSpeed = 200		-- Speed when boosted [Studs/second, Maximum: 400]
   Settings.BoostAmount = 10		-- Duration of boost in seconds
   Settings.Steering = 5			-- How quickly the speeder turns [Range: 1-10]
   ```

2. Playtest and see how the change feels. Ask yourself if the speed fits the driftspeeder's design and if you'd be excited using it in a race.
   <video controls src="../../assets/education/build-it-play-it-galactic-speedway/customize-and-share/compare-speeder-speeds.mp4" width="100%"></video>

3. Stop the playtest when finished. Remember, because you can't use your mouse while flying, press <kbd>E</kbd> to exit the speeder so you can stop the playtest.
   <Alert severity="info">
   <AlertTitle>Making multiple speeders</AlertTitle>
   If you make multiple speeders, make each one feel unique by giving them different strengths and weaknesses. One speeder might be slower normally, but have a faster boost. Another speeder might be very fast, but slow to turn.
   </Alert>
