---
title: Personalize the game
description: Part of the Roblox Build It, Play It Challenge - Island of Move. Customize the template script.
prev: /education/build-it-play-it-island-of-move/go-beyond-the-challenge
---

Make the Move It Simulator into your own unique vision by changing the rewards a player earns, the name of the game, and settings like player speed. Making these changes can change the mood of your game. In a few minutes, go from just a template to a unique game based off your vision.

## Change the game settings

The words you see in-game like "Move It Simulator", and "Roblox Developer" are all changeable. You can even make players move faster. These changes can be done by opening a script called _GameSettings_. That script includes different **variables**, or placeholders, for names and numbers used.

1. To open the script, find **Explorer** on the right side of Studio. If you cannot see Explorer, go into the View tab and click the Explorer button.

   <img src="../../assets/education/build-it-play-it-island-of-move/personalize-the-game/show-explorer.jpeg" width="100%" />

2. In Explorer **search bar**, type _GameSettings_.

3. Double-click the _GameSettings_ script.

   <img src="../../assets/education/build-it-play-it-island-of-move/personalize-the-game/open-game-settings.png" width="50%" />

### Change words

Inside _GameSettings_, you can change words displayed to players. This can even include the game title or messages shown when players level up.

To start, give the game its own unique name.

1. In the GameSetting script, on the left side are **line numbers**. Find **Line 8**.

   ```lua
   local GameSettings = {}

   -- ================================================================================
   -- Game Information
   -- These settings affect text that you see in game
   -- ================================================================================

   GameSettings.gameName = "Move It Simulator"
   GameSettings.developerName = "RobloxUser"

   GameSettings.levelUpMessage = "Level Up!"
   ```

2. Between the quotation marks, type a new name for your game.

   `GameSettings.gameName = "Wizardry School Simulator"`

3. Run your game. Notice how the billboard at the game start changed.

   <GridContainer numColumns="2">
     <figure>
       <img src="../../assets/education/build-it-play-it-island-of-move/personalize-the-game/show-rename-before.jpeg" />
       <figcaption>Before</figcaption>
     </figure>
     <figure>
       <img src="../../assets/education/build-it-play-it-island-of-move/personalize-the-game/show-rename-after.jpeg" />
       <figcaption>After</figcaption>
     </figure>
   </GridContainer>

### Change numbers

By modifying different numbers in _GameSettings_, you can create a unique experience for your players. For instance, players can start out moving extra fast or gain levels slowly.

1. In the _GameSetting_ script, find line **28**. This line has the number for the player's starting move speed. Replace the number `7` with a higher number, like `30`.

   ```lua
   -- Multiplier determines how much players need to move before a level; 1 = small amount of movement, 3 much more movement
   local growthModifier = 1.2
   -- How fast a player starts with 0 levels
   local startMoveSpeed = 30
   -- The amount of WalkSpeed added per level
   local speedBoostPerLevel = 3
   ```

Run the game and notice that your player begins the game faster than before.

## Challenge checkpoint

You've customized your game, now claim your free prize! Celebrate your new skills by getting the **Kinetic Staff** and **Do-It-Yourself** badge. Copy the code below.

`DIY`

Click the button to open a Roblox game, find the in-game character, and click **REDEEM CODE** to get your prize.

<a href="https://www.roblox.com/games/5306359293/">
<Button variant="contained">Enter World</Button>
</a>

## Continue customizing

You've taken the first steps in making this game your own, now keep going! Below are a few options to change the look and feel of your game.

<table>
<tr>
  <td width="33%">
<img src="../../assets/education/build-it-play-it-island-of-move/personalize-the-game/terrain.jpeg" width="100%" />

**Creating Terrain**

Sculpt mountains, rivers, or even cover the world in snow.

<a href="../../studio/terrain-editor.md">
<Button variant="contained">View</Button>
</a>
  </td>
  <td width="33%">
<img src="../../assets/education/build-it-play-it-island-of-move/personalize-the-game/particle-effects.jpeg" width="100%" />

**Particle Effects**

Add fire, sparks, and other effects to objects in game.

<a href="../../effects/particle-emitters.md">
<Button variant="contained">View</Button>
</a>
  </td>
  <td width="33%">
<img src="../../assets/education/build-it-play-it-island-of-move/personalize-the-game/atmosphere.jpeg" width="100%" />

**Atmosphere**

Change a game's mood by using environment effects.

<a href="../../environment/atmosphere.md">
<Button variant="contained">View</Button>
</a>
  </td>
</tr>
</table>
