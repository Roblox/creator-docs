---
title: Assistant prompt guide and examples
description: Get tips and tricks on how best to prompt Roblox's AI Assistant to get the best results.
---

<Alert severity="success">
[Share your prompts and experiences](https://devforum.roblox.com/t/check-out-the-generative-ai-stream-and-let-us-know-your-best-prompts/3215844) in the Roblox forum so that we can make Assistant better!
</Alert>

This document gives guidance on prompting Assistant and provides examples and inspiration on what Assistant can do.

## Be specific

If Assistant fails, add more details to your prompt and try again. Use instance names exactly as they're spelled, specify which function you want Assistant to use, and tell Assistant which type it's working with, such as a part or a model.

<table>
  <tr>
    <th>**Not specific**</th>
    <th>**More specific**</th>
  </tr>
  <tr>
    <td>Place the trees in a circle.</td>
    <td>Place 10 copies of the "pine_tree" model in ReplicatedStorage in a 30 stud radius circle around the SpawnLocation.</td>
  </tr>
  <tr>
    <td>Make the part move.</td>
    <td>Add a script to make "my_part" move up and down 10 studs repeatedly using TweenService.</td>
  </tr>
  <tr>
    <td>How can I design a core loop?</td>
    <td>Help me design a fun core loop. I want to build a game where players can hunt treasure as pirates. They can also buy and upgrade pirate ships and battle each other.</td>
  </tr>
</table>

## Use your selection

Selection is a great way of specifying an object or set of objects you want to refer to in your prompt. Select multiple objects and ask Assistant to modify them, make duplicates and place them somewhere, or continue a position pattern like maintaining placement in a line.

## Edit time and run time

Assistant sometimes confuses the difference between edit time and run time. If you ask Assistant to take an action, it will likely bias towards doing it at edit time. If you want the action to happen during run time, ask Assistant to insert a script that takes the action. For example, tell Assistant "add a script to make the time of day 8:00 AM" instead of "make the time of day 8:00 AM."

## Keep trying

Don't get discouraged if Assistant doesn't work exactly the way you want the first time. Often, making small tweaks and trying again can lead to better results. Many AI tools are non-deterministic, meaning they don't create the exact same output each time you ask them to do something. There's some variance, which you can tap into and control using tweaks to your prompt.

AI in its current state requires work. It takes time to understand how to best speak to Assistant, what it can do, and how to get what you want out of it.

## Multi-step prompts

Consider using multi-step prompts to encourage Assistant to think. Instead of asking "Can you explain this script to me?" and pasting in the script, ask it to explain step-by-step by separating the question from the script with `###`. This separation helps Assistant deconstruct and organize the information to provide better answers.

<Tabs>
<TabItem label="Prompt">
<blockquote>

_Can you explain what this script is doing step by step?_

**\###**

_local part = workspace.Part_

_local function onTouched(otherPart)_<br />
&nbsp;&nbsp;&nbsp;&nbsp;_print(part.Name .. " collided with " .. otherPart.Name)_<br />
_end_

_part.Touched:Connect(onTouched)_

**\###**

</blockquote>
</TabItem>
<TabItem label="Assistant response">
<blockquote>

_Certainly! This script is an example of how to handle collisions between two parts in Roblox. Let's break it down step by step:_

1. `local part = workspace.Part`: _This line of code creates a local variable named `part` and assigns it the value of the `Part` object located in the workspace. You can replace `Part` with the name of the specific part you want to detect collisions with._
2. `local function onTouched(otherPart)`: _This line of code defines a function named `onTouched` that takes in a parameter `otherPart`. This function will be called whenever the part collides with another part._
3. `print(part.Name .. " collided with " .. otherPart.Name)`: _This line of code prints a message to the output console, indicating that the `part` has collided with `otherPart`. The `part.Name` and `otherPart.Name` are concatenated using the `..` operator to form the message._
4. `part.Touched:Connect(onTouched)`: _This line of code connects the `onTouched` function to the `Touched` event of `part`. Whenever the part collides with another part, the `onTouched` function will be called._

</blockquote>
</TabItem>
</Tabs>

## Examples

These examples demonstrate the vast variety of tasks that Assistant can help with today. Some of them might take a few tries for you to reproduce, but give them a try and see what you can come up with yourself.

### Game mechanics - Shoot fireballs that explode

**Prompt:**
Propel a fireball away from the player in the direction the player is facing when the player presses "e".
Make the fireball explode when it hits something.

<video controls width="90%" src="/assets/assistant/prompt16.webm" />

### Game mechanics - Set up a teams system and assign players

**Prompt:**
Add a script to make a system of teams (red, blue, green, yellow) and assign each player randomly to a team.

<video controls width="90%" src="/assets/assistant/prompt17.webm" />

### Game mechanics - Temple run style constant running

**Prompt:**
Make my character run forward constantly like in a temple run game.

<video controls width="90%" src="/assets/assistant/prompt3.webm" />

### Game mechanics - Fire power up

**Prompt:**
Add a script that makes the player light on fire and jump 3 time as high if they press "q". The fire should be attached to the player and move with them. If they press "q" again, turn off the fire and reset the jump power.

<video controls width="90%" src="/assets/assistant/prompt4.webm" />

### Game mechanics - NPC lasers

**Prompt:**
Add a script that makes this shoot a laser using a long thin part that's blue and neon at the player if they're within 30 studs.

Add a script to make this look towards and slowly move towards the closest player if they're within 50 studs. Only move in the x and z axes, keep the y axis constant.

<video controls width="90%" src="/assets/assistant/prompt9.webm" />

### Game mechanics - Interactive NPC

**Prompt:**
This is an NPC. Add a prompt that lets the player interact with it. If the player interacts, have the NPC say "hello [player's name]" where player's name is the actual player's name, in a text pop up.

Add a script that makes this npc always look towards the closest player.

<video controls width="90%" src="/assets/assistant/prompt2.webm" />

### Game mechanics - NPC patrolling

**Prompt:**
Add a script to make this NPC move slowly between startpart and endpart repeatedly.
It should face the part and then move to it, then face the other part and move to it.
If the player comes within 10 studs, turn the NPC red and make it chase the player.

<video controls width="90%" src="/assets/assistant/prompt1.webm" />

### Game mechanics - Update scoreboard

**Prompt:**
Add a script that deletes this and adds 100 to the players score.

Add a script to show the player's score on the scoreboard.

<video controls width="90%" src="/assets/assistant/prompt11.webm" />

### Camera - Lock to top down

**Prompt:**
Add a script that locks the camera in a top down view on the player and follow the player, making sure the player remains in the center of the screen.

<video controls width="90%" src="/assets/assistant/prompt13.webm" />

### Camera - Lock to first person

**Prompt:**
Create a script to lock the camera in first person view.

<video controls width="90%" src="/assets/assistant/prompt15.webm" />

### UI - Drop-down menu

**Prompt:**
Create a drop down menu with 5 items.

<video controls width="90%" src="/assets/assistant/prompt18.webm" />

### UI - Health bar

**Prompt:**
Add a part on the ground, when a player touches it, it decreases health by 10%. Put a UI health bar in the upper center of the screen that turns red when the players health is less than 20%.

<video controls width="90%" src="/assets/assistant/prompt5.webm" />

### UI - Simple HUD

**Prompt:**
Create a heads up display in StarterGui. Add a healthbar to the top right, and a text label with the player's name underneath it. In the bottom right, add 4 buttons in a diamond shape, with "Potions" on top, "Weapons" on the left, "Inventory" on the bottom, and "Special" on the right. Make the colors fall color themed.

<img width="90%" src="/assets/assistant/prompt10.png" />

### Building - Scatter objects with randomization

**Prompt:**
Add 0-5 of the selected instance "Mushroom" around each "RedwoodTree-Var01".

<video controls width="90%" src="/assets/assistant/prompt19.webm" />

### Building - Night / day cycle with street lights

**Prompt:**
Add a script that changes the time of day by 1 hour every second. Start at 3pm. At 7pm, turn every spotlight's brightness up to 10. At 8am turn every spotlight's brightness down to 0.

<video controls width="90%" src="/assets/assistant/prompt7.webm" />

### Building - Physics-based suspension bridge

**Prompt:**
Create a rope bridge. Make 10 wood planks that are 5 studs wide and 2 studs long.
Place them in a row. Add rop constraints on each side of the parts, connecting
each one to the part before it and after it. Make all the rope constraints
visible, anchor the 1st and 10th part, and add a drag detector on the 1st and 10th part.

<img width="90%" src="/assets/assistant/prompt12.png" />

### Building - Add smoke to chimneys

**Prompt:**
Insert an invisible brick that is non-collidable into every chimney in every house. The brick should have a particle inside it that makes smoke that flows upwards, and the smoke must be white.

<video controls width="90%" src="/assets/assistant/prompt14.webm" />

### Building - Rename instances

**Prompt:**
Rename all the "emptyscripts" objects to "Script+uniqueID".

<video controls width="90%" src="/assets/assistant/prompt8.webm" />

### Building - Create terrain

**Prompt:**
Create a terrain region with rolling hills.

<img width="90%" src="/assets/assistant/prompt6.png" />

### Building - Add behavior at scale

**Prompt:**
Add a script to make the spotlights in the folder StreetLights flicker on and off randomly.

<video controls width="90%" controls src="/assets/assistant/prompt20.webm" />

### Building - Replace greyboxes with assets

**Prompt:**
Replace each of the selected parts with a model of the same name currently in the data model inside the AssetLibrary Folder under workspace. For example, if the part is called "Suburban House", look for a model called "Suburban House" and replace the part with that model.

<video controls width="90%" src="/assets/assistant/prompt21.webm" />
