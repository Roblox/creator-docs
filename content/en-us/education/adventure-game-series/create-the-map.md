---
title: Create the Map
description: Part of the Adventure Game Series in Roblox. Learn how to use terrain tools in Roblox Studio.
next: /education/adventure-game-series/code-the-leaderboard
prev: /education/adventure-game-series/landing
---

<img src="../../assets/education/adventure-game-series/heroBanner_titlePage.jpg" width="75%" />

Adventure games can come in different forms but often focus on getting a player to explore a world. This experience will be all about exploring, harvesting items, selling them, upgrading bags, and then doing it all over again. This cycle of actions is called a **game loop**.

Each part of the game loop is a different game mechanic, or action, players can do. This game loop has four mechanics:

- **Explore** the experience to find items.
- **Harvest** items. Players can only hold so many at a time.
- **Sell** items for gold.
- **Buy** bag upgrades to holds more items at a time.

## Planning the Project

Before professional developers start a new project, they plan out what things will look like in a process called **pre-production**. They'll often create a game design document that includes how the experience works.

While **game design documents** (GDDs) can often be long, for this series, you'll start with a vision of what players will do and sketches of the world they'll explore. Having a clear vision helps speed up development and also make it easier to communicate your ideas to get feedback from others.

### Creating a Game Design Document

To start, get a piece of paper or open up a word editor to keep track of the document.

### Game Loop Prompts

The following are used to help you figure out the game loop, or what players will be doing.

<table>
<thead>
   <tr>
      <th width="30%">Component</th>
      <th>Examples</th>
   </tr>
</thead>
<tbody>
   <tr>
      <td><b>Setting</b>: A description of the setting, such as a theme or what players will see when exploring. </td>
      <td>
      - A mystical forest covered in trees and rivers.
      - A suburban town where you need to collect lost pets.
      - A future where the most valuable object is a potato.
      </td>
   </tr>
   <tr>
      <td><b>Items</b>: What players gather or harvest. </td>
      <td>
      - Glittering crystals.
      - Lost pets like cats, dogs, and turtles.
      - Different types of potatoes.
      </td>
   </tr>
   <tr>
      <td><b>Tools</b>: The object players use to collect that item.</td>
      <td>
      - Pickaxes.
      - Pet collars.
      - Gloves.
      </td>
   </tr>
   <tr>
      <td><b>Upgrades</b>: What players will buy to hold more items.</td>
      <td>
      - Bags
      - Backpacks
      </td>
   </tr>
</tbody>
</table>

### Map Layouts

The last part of the game design document is to create the map layout. This gives you an idea of what to create later. An example layout is below.

<img src="../../assets/education/adventure-game-series/paintToolOptimized.gif" width="50%" />

In the layout, annotate these key places:

- Where players start the experience.
- Placement of the harvestable items.
- Where players will sell items.
- Where players will buy upgrades.
- Environment details, such as grasslands, hills, and more.

## Creating the Environment

The environment will be created using the **Terrain Editor**. This tool in Roblox Studio is used to create landscapes like mountains, rivers, or deserts. While using the tools, reference the map layout previously created.

You'll use the tools in the Terrain Editor to create the world you drew in your game vision document.

1. Open Studio and create a new **Flat Terrain** project.
2. In the **Home** tab, click the **Editor** button. This opens the **Terrain Editor** on the left of the screen.

   <img src="../../assets/studio/general/Home-Tab-Terrain-Editor.png" width="800" alt="Terrain Editor indicated in Home tab" />

3. In the Terrain Editor, go to the **Edit** tab. Then use the **Paint** tool to change the material of the landscape. Depending on your vision, paint in roads, water, or even lava.

   <img src="../../assets/studio/terrain-editor/Edit-Tab-Paint.png" width="360" alt="Paint tool indicated in Edit tab of Terrain Editor" />

   <img src="../../assets/education/adventure-game-series/paintToolOptimized.gif" width="50%" />

   <Alert severity="info">
   While using the terrain editor, rotate the camera as you build. Terrain might look differently from different angles.
   </Alert>

4. Use the **Draw** tool to draw the setting you created in your vision document. Use the **Brush Mode** toggle to switch between adding and subtracting terrain.

   <img src="../../assets/studio/terrain-editor/Edit-Tab-Draw.png" width="360" alt="Draw tool indicated in Edit tab of Terrain Editor" />

   - Add terrain to create mountains, hills, and break up grasslands.

     <img src="../../assets/education/adventure-game-series/addToolExample.gif" width="80%" />

   - Subtract terrain to sculpt mountains, create sharper features like cliffs, or carve rivers.

     <img src="../../assets/education/adventure-game-series/subtractToolExample.gif" width="50%" />

## Finished Map Sample

Once finished, your map might look like the following.

<img src="../../assets/education/adventure-game-series/adventureGameTerrain02.jpg" width="50%" />
