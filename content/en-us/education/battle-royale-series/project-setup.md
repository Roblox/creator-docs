---
title: Battle Royale
description: Create a battle royale experience in Roblox Studio. Learn coding in Roblox and how to make a game.
next: /education/battle-royale-series/coding-the-game-loop
prev: /education/battle-royale-series/landing
---

**Battle Royales** are a multiplayer game genre where opponents compete until only one player is left. While every battle royale is different, they all include a way to eliminate players such as freezing someone or knocking them off the map. When one player survives, or a timer ends, the match is over and a new round starts.

The genre is popular because rounds are quick, easy to pick-up, and challenging to master. Battle royales can be customized with different game mechanics to appeal to a wide audience, like unique weapons, platforming obstacles, or visual themes.

Some popular battle royale experiences in Roblox include Island Royale and Strucid.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/education/battle-royale-series/islandRoyale_example_2.jpg" />
    <figcaption>Island Royale by LordJurrd</figcaption>
  </figure>
  <figure>
    <img src="../../assets/education/battle-royale-series/Strucid_thumbnail.jpg" />
    <figcaption>Strucid by Frosted Studios</figcaption>
  </figure>
</GridContainer>

Battle royales generally follow a round-based **game loop**, or series of phases. In the project you'll make, players go through the game loop below:

<GridContainer numColumns="3">
  <figure>
    <img src="../../assets/education/battle-royale-series/arena_gamePhase_intermission.jpg" />
    <figcaption>Intermission</figcaption>
  </figure>
  <figure>
    <img src="../../assets/education/battle-royale-series/arena_gamePhase_compete.jpg" />
    <figcaption>Competition</figcaption>
  </figure>
  <figure>
    <img src="../../assets/education/battle-royale-series/arena_gamePhase_cleanup.jpg" />
    <figcaption>Cleanup and Reset</figcaption>
  </figure>
</GridContainer>

During each phase, a different set of tasks happened that you'll code during this series.

- **Intermission** - Players socialize or watch games in the lobby until a new round starts.
- **Match** - Timer starts and players are teleported to an arena where they compete. If a player loses, they're teleported back to the lobby.
- **Cleanup and Reset** - Happens when one player is left or the timer finishes. Players are then teleported back to the lobby where the loop restarts.

## Developing the Experience

Battle royales are made of many elements, like code and art assets. To manage larger projects, developers plan a **workflow**, or a series of steps, to get to completion.

During this series, you'll go through the following workflow:

- **Preproduction** - Create a sketch of the game map.
- **Design a Test Map** - Develop a map using placeholder assets to test out the design, without worrying about visual look and feel.
- **Code and Test** - Begin the process of coding the game loop.
- **Polish and Improve** - Replace placeholder assets with finalized models, and improve code and design through frequent playtesting.

Instead of working on different parts of a project simultaneously, developers break large projects into manageable chunks. Each phase should have its own specific goal before going to the next phase. This makes it easier to catch potential errors and save time down the road. For instance, designing art to polish a map that hasn't been tested may result in wasted time if the map needs to be redesigned to be fun.

### Planning the Project

The first phase is to plan your vision in a process called **preproduction**. Taking the time to make a plan helps you focus on important design choices, such as where to place obstacles and player spawns.

To plan, you'll create a layout map with paper or a drawing software. A layout map is the floor plan for the arena drawn in basic shapes, focusing on how players move through the world rather than visual details. Once the layout map is finished, you'll recreate it in Studio.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/education/battle-royale-series/vectorMap_arenaSteps_finalizedLayoutMap.png" />
    <figcaption>Drawn Layout</figcaption>
  </figure>
  <figure>
    <img src="../../assets/education/battle-royale-series/arenaObstacles_advanced_topDown.jpg" />
    <figcaption>Layout in Studio</figcaption>
  </figure>
</GridContainer>

### Designing a Map Layout

For the sketch, the objective here is to create a design you can then replicate in Studio. The map arena should have enough variety to be fun, but also include balance as to not give users an unfair advantage.

1. Write a brief description of the **setting**, such as a jungle, an abandoned moon base, or a medieval castle. During the polishing phase, you'll add map details using this setting.

2. Identify the shape of the map and then draw it out using a combination of 1-3 **basic shapes** (square, rectangle, octagon). Even if you envision a more complex map, such as an island, try and break it down into basic shapes.

   <Alert severity="info">
   We recommend making a symmetrical map to easily balance the experience. As you gain more experience, you can start working with non-symmetrical map shapes, which can be more complicated to balance fairly for everyone.
   </Alert>

3. Add player spawns. For now, use eight spawns, but you can always add more later. The example here uses a square for the map shape.

   <img src="../../assets/education/battle-royale-series/vectorMap_playerSpawns.png" />

4. To make players less predictable and add interest, place obstacles that force them choose different directions. Draw 2-4 shapes (orange) that create choices in moving around the arena. Add secondary obstacles (yellow) that prevent players from fighting right at the start.

   <img src="../../assets/education/battle-royale-series/vectorMap_example_obstacle.png" />

### Tips for Layouts

Keep designs simple, but engaging. Since players make split second decisions in moving through a level, give them enough choices to make a level feel different each time, but not too much that they can't remember how to move through the map or feel overwhelmed.

<GridContainer numColumns="3">
  <figure>
    <img src="../../assets/education/battle-royale-series/roundBased_obstacleExampleComplexity_simple.png" />
    <figcaption>Too simple</figcaption>
  </figure>
  <figure>
    <img src="../../assets/education/battle-royale-series/roundBased_obstacleExampleComplexity_balanced.png" />
    <figcaption>Balanced</figcaption>
  </figure>
  <figure>
    <img src="../../assets/education/battle-royale-series/roundBased_obstacleExampleComplexity_tooComplex.png" />
    <figcaption>Potentially complex</figcaption>
  </figure>
</GridContainer>

## Creating the Map

Recreate the layout map quickly in Roblox Studio using basic parts in a process called grayboxing. Stay focused on designing a fun, playable map. Don't spend time adding textures or small details, like decorative props. After you've created a working map with code, then spend time designing art to fit the map's setting.

<img src="../../assets/education/battle-royale-series/arena_finishedProject_arenaHero.jpg" />

### Building a Lobby

Before creating the arena, build the lobby, where players enter the experience and socialize between matches.

1. Create a new Baseplate project and delete the baseplate.
2. Construct a walled room with a spawn location.

   <img src="../../assets/education/battle-royale-series/arenaIntro_lobby.jpg" />

   <Alert severity="info">
   Enable Snap to Grid to make moving and lining up objects easier. Rotating parts at 90 or 45 degree angles will also help result in cleaner designs.
   </Alert>

3. Place all lobby parts into a folder named Lobby.

### Arena and Spawns

The arena is where players will compete. When building the arena, you'll **graybox** the environment with simple parts and colors. A graybox environment is an approximation of the final design, so a large cylinder may be an equally sized tree in the final version.

This process, common in level design, gives designers a working prototype to test and iterate with. Once the map design feels good in playtesting, graybox assets are replaced with 3D assets and terrain.

1. Create a folder named Arena. Inside, add the floor for the arena. If you're using terrain, leave the folder empty for now.

   Below are sample arenas.

   <GridContainer numColumns="3">
     <img src="../../assets/education/battle-royale-series/arenaExample_square.jpg" />
     <img src="../../assets/education/battle-royale-series/arenaExample_circle.jpg" />
     <img src="../../assets/education/battle-royale-series/arenaExample_terrain.jpg" />
   </GridContainer>

2. Create eight spawn locations on the map. Create a new folder in Arena named SpawnLocations and move the eight spawns there.

   <img src="../../assets/education/battle-royale-series/arena_addedSpawns.jpg" />

   <Alert severity="info">
   As you place spawns, keep in mind that all players will randomly spawn when joining.
   </Alert>

### Graybox the Arena

Remember that grayboxing is an approximation of the final design using simple parts. A grayboxed level should give designers an understanding of how players move through the arena. To create the arena, use an optional building kit or basic parts.

1. Import the Grayboxing Kit from the Toolbox. This includes a variety of common building features such as stairs, ramps, and walls.

   <a href="https://www.roblox.com/library/10202876758/Graybox-Assets" target="_blank" rel="noopener">
   <Button variant="contained">Get Kit</Button>
   </a>

   <img src="../../assets/education/battle-royale-series/roundBased_grayboxExample.jpg" />

   <Alert severity="info">
   Note that Roblox_Educators is the official, trusted account for assets from Roblox Education.
   </Alert>

2. Using a combination of parts and assets from the grayboxing kit, create obstacles and barriers.

   <img src="../../assets/education/battle-royale-series/arenaObstacles_sideBySide.png" />

As you build, some tips for map design are below.

- **Vary Height** - Flat maps can get repetitive for players. Use hills, stairs, and ramps of different heights to add variety to the map.
- **Build Half of the Map and then Duplicate** - This technique allows you to quickly build a symmetrical map. -**Test and Check for Scale** - While building, think about the map in relation to a player. For example, how spacious does an area feel or can a player fit easily through a door. Keep in mind the average avatar is 6.5 studs tall.

### Playtesting the Graybox

With the arena completed, it's important to see if it's fun and interesting to move around.

1. Click **Play Here** in the arena and test the map.

   <img src="../../assets/education/battle-royale-series/arena_playtestGraybox_cropped.jpg" />

While testing, self-evaluate your work with the prompts below and make changes as needed to improve.

- Can players move around without getting confused or stuck?
- Does the size of the map feel right? Are there any areas that feel too empty? Will it take a long time to run into another player?
- Does anything look strange, such as floating or misaligned parts?
