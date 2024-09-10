---
title: Assistant Prompt Guide and Examples
description: Get tips and tricks on how best to prompt Roblox's AI Assistant to get the best results.
---

Assistant in Roblox Studio accelerates content creation by helping you get started, supplementing your skills, and assisting with ongoing development.

Assistant can:

- Explain how to do things and how scripts work
- Prototype and develop content quickly
- Automate tedious tasks
- Add 3D objects to your workspace
- Add scripts to make things happen

## Guidelines and Tips

The following sections describe how to get the most out of the Assistant.

### Be as specific as you can

The more specific you are, the better Assistant can help you. Assistant might fail at fulfilling your request if you're not specific enough.

If Assistant fails, add more details to your prompt and try again.  Use instance names exactly as they're spelled, specify which function you want Assistant to use, and tell Assistant what type it's working with, like a part or a model.

<table>
  <tr>
    <th>**Not Specific**</th>
    <th>**More Specific**</th>
  </tr>
  <tr>
    <td>Place the trees in a circle.</td>
    <td>Place 10 copies of the "pine_tree" model in ReplicatedStorage in a 30 stud radius circle around the SpawnLocation.</td>
  </tr>
  <tr>
    <td>Make the part move.</td>
    <td>Add a script to make "my_part" move up and down 10 studs repeatedly using TweenService.</td>
  </tr>
</table>

### Use your selection

Selection is a great way of specifying an object or set of objects you want to refer to in your prompt. You can select multiple objects and ask Assistant to modify the selected objects, make duplicates and place them somewhere, or continue a position pattern like maintaining placement in a line.

### Edit time vs Run time

Assistant sometimes confuses the difference between edit time and run time. If you ask Assistant to take an action, it will likely bias towards doing it at edit time. If you want the action to happen during run time, ask Assistant to insert a script to the take action. For example, tell Assistant to "add a script to make the time of day 8am" instead of "make the time of day 8am".

### Keep trying (with tweaks) and don't give up

Don't get discouraged if Assistant doesn't work exactly the way you want the first time. Often, making small tweaks and trying again can lead to better results. Many AI tools are non-deterministic, which means they don't create the exact same output each time you ask them to do something. There's natural variance, which you can tap into and control using tweaks to your prompt.

AI in its current state requires work. It takes time to understand how to best speak to Assistant, what it can do, and how to get what you want out of it.

## Examples

These examples demonstrate the vast variety of tasks Assistant can help with today.
Some of these examples might take a few tries for you to reproduce, but give them a try and see what you can come up with yourself.

### Game Mechanics - Shooting Fireballs that Explode

**Prompt:**
Propel a fireball away from the player in the direction the player is facing when the player presses "e".
Make the fireball explode when it hits something.

<video controls width="90%" src="/assets/assistant/prompt16.webm" />

### Game Mechanics - Set Up a Teams System and Assign Players

**Prompt:**
Add a script to make a system of teams (red, blue, green, yellow) and assign each player randomly to a team.

<video controls width="90%" src="/assets/assistant/prompt17.webm" />

### Game Mechanics - Temple Run Style Constant Running

**Prompt:**
Make my character run forward constantly like in a temple run game

<video controls width="90%" src="/assets/assistant/prompt3.webm" />

### Game Mechanics - Fire Power Up

**Prompt:**
Add a script that makes the player light on fire and jump 3 time as high if they press "q". The fire should be attached to the player and move with them. If they press "q" again, turn off the fire and reset the jump power

<video controls width="90%" src="/assets/assistant/prompt4.webm" />

### Game Mechanics - NPC Lasers

**Prompt:**
Add a script that makes this shoot a laser using a long thin part that's blue and neon at the player if they're within 30 studs.

Add a script to make this look towards and slowly move towards the closest player if they're within 50 studs. Only move in the x and z axes, keep the y axis constant.

<video controls width="90%" src="/assets/assistant/prompt9.webm" />

### Game Mechanics - Interactive NPC

**Prompt:**
This is an NPC. Add a prompt that lets the player interact with it. If the player interacts, have the NPC say "hello [player's name]" where player's name is the actual player's name, in a text pop up.

Add a script that makes this npc always look towards the closest player.

<video controls width="90%" src="/assets/assistant/prompt2.webm" />

### Game Mechanics - NPC Patrolling

**Prompt:**
Add a script to make this NPC move slowly between startpart and endpart repeatedly.
It should face the part and then move to it, then face the other part and move to it.
If the player comes within 10 studs, turn the NPC red and make it chase the player.

<video controls width="90%" src="/assets/assistant/prompt1.webm" />

### Game Mechanics - Updating Scoreboard

**Prompt:**
Add a script that deletes this and adds 100 to the players score.

Add a script to show the player's score on the scoreboard.

<video controls width="90%" src="/assets/assistant/prompt11.webm" />

### Camera - Locking to Top Down

**Prompt:**
Add a script that locks the camera in a top down view on the player and follow the player, making sure the player remains in the center of the screen.

<video controls width="90%" src="/assets/assistant/prompt13.webm" />

### Camera - Locking to First Person

**Prompt:**
Create a script to lock the camera in first person view.

<video controls width="90%" src="/assets/assistant/prompt15.webm" />

### UI - Drop-down Menu

**Prompt:**
Create a drop down menu with 5 items.

<video controls width="90%" src="/assets/assistant/prompt18.webm" />

### UI - Health Bar

**Prompt:**
Add a part on the ground, when a player touches it, it decreases health by 10%. Put a UI health bar in the upper center of the screen that turns red when the players health is less than 20%.

<video controls width="90%" src="/assets/assistant/prompt5.webm" />

### UI - Simple HUD

**Prompt:**
Create a heads up display in StarterGui. Add a healthbar to the top right, and a text label with the player's name underneath it. In the bottom right, add 4 buttons in a diamond shape, with "Potions" on top, "Weapons" on the left, "Inventory" on the bottom, and "Special" on the right. Make the colors fall color themed.

<img width="90%" src="/assets/assistant/prompt10.png" />

### Building - Scattering Objects with Randomization

**Prompt:**
Add 0-5 of the selected instance "Mushroom" around each "RedwoodTree-Var01".

<video controls width="90%" src="/assets/assistant/prompt19.webm" />

### Building - Night / Day Cycle with Street Lights

**Prompt:**
Add a script that changes the time of day by 1 hour every second. Start at 3pm. At 7pm, turn every spotlight's brightness up to 10. At 8am turn every spotlight's brightness down to 0.

<video controls width="90%" src="/assets/assistant/prompt7.webm" />

### Building - Physics-based Suspension Bridge

**Prompt:**
Create a rope bridge. Make 10 wood planks that are 5 studs wide and 2 studs long.
Place them in a row. Add rop constraints on each side of the parts, connecting
each one to the part before it and after it. Make all the rope constraints
visible, anchor the 1st and 10th part, and add a drag detector on the 1st and 10th part.

<img width="90%" src="/assets/assistant/prompt12.png" />

### Building - Adding Smoke to Chimneys

**Prompt:**
Insert an invisible brick that is non-collidable into every chimney in every house. The brick should have a particle inside it that makes smoke that flows upwards, and the smoke must be white.

<video controls width="90%" src="/assets/assistant/prompt14.webm" />

### Building - Renaming Instances

**Prompt:**
Rename all the "emptyscripts" objects to "Script+uniqueID".

<video controls width="90%" src="/assets/assistant/prompt8.webm" />

### Building - Creating Terrain

**Prompt:**
Create a terrain region with rolling hills.

<img width="90%" src="/assets/assistant/prompt6.png" />

### Building - Adding Behavior at Scale

**Prompt:**
Add a script to make the spotlights in the folder StreetLights flicker on and off randomly.

<video controls width="90%" controls src="/assets/assistant/prompt20.webm" />

### Building - Replacing Greyboxes with Assets

**Prompt:**
Replace each of the selected parts with a model of the same name currently in the data model inside the AssetLibrary Folder under workspace. For example, if the part is called "Suburban House", look for a model called "Suburban House" and replace the part with that model.

<video controls width="90%" src="/assets/assistant/prompt21.webm" />
