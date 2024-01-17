---
title: Construct Your World
description: Explains how to utilize your asset library, configure additional elements of the 3D space to bring your world to life.
next: /tutorials/environmental-art/optimize-your-experience
prev: /tutorials/environmental-art/assemble-an-asset-library
---

<iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/hOGh8Aw54ko?si=G64hCpV8SUNvO-Ko" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<br/>

**Constructing your world**, also known as worldbuilding, is the process of decorating the environment with polished assets from your asset library, then adding and configuring additional elements of the 3D space to bring your world to life. This exciting step of the workflow is where you get to see all of your vision and hard work come together into a cohesive environment that is complete and ready for publication.

Using the [Environment Art - Constructing](https://www.roblox.com/games/14447826396/Environment-Art-Constructing) `.rbxl` file as a reference, this section of the environmental art curriculum shows you how to use and apply your high quality assets and custom materials to your greybox geometry in a way that differentiates each distinct area of the team-based first-person laser tag shooter experience, including step-by-step instructions on:

- Applying your asset library to the building's architecture and outdoor space to provide users information about the overall world.
- Sculpting terrain with your custom tileable textures to create the overall island that the building rests on.
- Containing the playable areas to ensure users remain in combat without falling off the island.
- Configuring special effects and lighting sources to enrich the 3D space with movement, warmth, and realism.

After you complete this section, you will learn how to review and configure your content to ensure your experience has optimal performance across devices.

<img src="../../assets/tutorials/environmental-art-curriculum/Section4/Overview.png" width="100%"/>

<Alert severity="info">
    The instructions in this section of the tutorial show you how to **exactly** recreate the sample final environment using the [Environment Art Asset Library](https://www.roblox.com/library/14447738661/Environment-Art-Asset-Library), which takes about 90 minutes or less from start to finish. If you don't want to use the provided coordinates, you can adjust the geometry however you need to meet the specifications of your own experience, or use the sample itself for the rest of the tutorial.
</Alert>

## Apply Your Asset Library

The first step in constructing your environment is to apply your asset library to the 3D space, and this process often falls into one of the following categories of work:

- Applying your asset library directly onto the greybox geometry to exactly match the original design.
- Converting the greybox geometry into something else entirely that still respects the intention behind the original design.
- Converting the greybox geometry into something else while also applying your asset library to the new object to maintain cohesion throughout the environment.

The process between greyboxing and constructing your environment with your asset library hardly ever looks like a straight line from your original design to the final art. Iteration between each step and across steps is normal and almost always necessary in the development process as you find new ways to improve the user's experience in your world. For example, the guidance in the **Floors** section converts the original floor greybox geometry into new divisions in order to better orient users to where they are in the building.

<img src="../../assets/tutorials/environmental-art-curriculum/Section4/ApplyingLibraryDiagram.png" width="100%"/>

As you follow these instructions that exactly recreate the final environment within the sample [Environment Art - Constructing](https://www.roblox.com/games/14447826396/Environment-Art-Constructing) `.rbxl` file, observe how each step works together to add character to the environment, and provide users information about the overall world. **You can adjust any part of the process to meet the specifications of your own experience**, as your environment may have different needs according to the world that you're creating.

### Floors

The original greybox design for floors was to divide the building into two halves, one for each team. This was useful to help visualize each half as its own space for its respective team, and to delineate the center of the map. However, as you begin to construct your environment, you may find that walls can fulfill this purpose more effectively, and that floors are more useful to help orient users to where they are in relation to the exterior of the building.

For example, the final sample laser tag environment uses new floor pieces with unique materials to inform users whether they're navigating somewhere inside the building, or approaching its outdoor space. When a user is inside of the building, they walk on surfaces with the **GlossyTiles** `Class.MaterialVariant`, and when they're walking in the middle courtyard or under the overhang pieces you will make later in this tutorial, they walk on surfaces with the **Concrete_Tiles_A** `Class.MaterialVariant`. You can find both of these materials in the sample [Environment Art Asset Library](https://www.roblox.com/library/14447738661/Environment-Art-Asset-Library).

<img src="../../assets/tutorials/environmental-art-curriculum/Section4/Floors-Intro.jpg" width="60%"/>

While this technique replaces and converts the original greybox geometry, it still respects the intention behind the original design to create peaks and valleys that control sight lines and engagement distances throughout the experience outside of horizontal movement. This means that users retain all physical and emotional senses of ascension and descension while also having the benefit of knowing where they are in the 3D space.

<Tabs>
  <TabItem key = "1" label="Create Your Own">

To apply your own asset library to the floors:

1. Using **block** parts, create symmetrical surfaces for your indoor floors.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/GeneralFloors-1.jpg" width="100%"/>

1. Using **wedge** parts, create a **rise in elevation** between the main and mezzanine floors on the inside of your building.
1. Select these indoor parts, then in the **Properties** window, set **Color**, **Material**, and/or **MaterialVariant** to values that apply a distinct visual treatment from other surfaces in your environment. This allows players to always know they are within the building.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/GeneralFloors-2.jpg" width="100%"/>

1. Using **block** parts, create symmetrical surfaces for your **outdoor floors**.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/GeneralFloors-3.jpg" width="100%"/>

1. Using **wedge** parts, create a **rise in elevation** between the main and mezzanine floors on the outside of your building.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/GeneralFloors-4.jpg" width="100%"/>

1. Using **block** or **wedge** parts, create a drop in elevation between the main and outdoor floors on the outside of your building.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/GeneralFloors-5.jpg" width="100%"/>

1. Select these outdoor parts, then in the **Properties** window, set **Color**, **Material**, and/or **MaterialVariant** to values that apply a distinct visual treatment from other surfaces in your environment. This allows players to always know they are outside of the building.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/GeneralFloors-6.jpg" width="100%"/>

1. Anchor all of these floor parts.

  </TabItem>
  <TabItem key = "2" label="Recreate the Sample">

To exactly recreate the floors within the sample [Environment Art - Constructing](https://www.roblox.com/games/14447826396/Environment-Art-Constructing) place file:

1. Add and configure the following **block** parts for the indoor floors:

   <table>
   <thead>
   <tr>
   <th>Part</th>
   <th>Size</th>
   <th>CFrame.Position</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>Left-side top area</td>
   <td>`57.5, 6, 142`</td>
   <td>`-123.75, 2, 281`</td>
   </tr>
   <tr>
   <td>Left-side bottom area</td>
   <td>`64, 6, 164.5`</td>
   <td>`-63, 2, 269.75`</td>
   </tr>
   <tr>
   <td>Middle top area</td>
   <td>`53, 6, 60`</td>
   <td>`-119.5, 7, 160`</td>
   </tr>
   <tr>
   <td>Right-side top area</td>
   <td>`57.5, 6, 142`</td>
   <td>`-123.75, 2, 48.5`</td>
   </tr>
   <tr>
   <td>Right-side bottom area</td>
   <td>`64, 5, 162.5`</td>
   <td>`-63, 2.5, 51.25`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Floors-1.jpg" width="100%"/>

2. Select these parts, then in the **Properties** window,

   1. Set **Color** to **248, 248, 248**.
   1. Set **Material** to **Concrete**.
   1. Set **MaterialVariant** to **GlossyTiles**.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Floors-2.jpg" width="100%"/>

3. Add and configure the following **block** parts for the outdoor floors:

   <table>
   <thead>
   <tr>
   <th>Part</th>
   <th>Size</th>
   <th>CFrame.Position</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>Middle top area</td>
   <td>`13, 6, 64`</td>
   <td>`-86.5, 7, 158`</td>
   </tr>
   <tr>
   <td>Middle middle area</td>
   <td>`29, 1, 55`</td>
   <td>`-45.5, 4.5, 160`</td>
   </tr>
   <tr>
   <td>Middle bottom area</td>
   <td>`18, 11, 100`</td>
   <td>`-14, -0.5, 160`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Floors-3.jpg" width="100%"/>

4. Select these parts, then in the **Properties** window,

   1. Set **Color** to **233, 218, 218**.
   1. Set **Material** to **Concrete**.
   1. Set **MaterialVariant** to **Concrete_Tiles_A**.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Floors-4.jpg" width="100%"/>

5. Add and configure the following **FloorRamp** modular assets for the elevation between floors:

   <table>
   <thead>
   <tr>
   <th>Size</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   <th>MaterialVariant</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>`14, 6, 20`</td>
   <td>`-102.5, 7, 200`</td>
   <td>`0, 0, 0`</td>
   <td>`GlossyTiles`</td>
   </tr>
   <tr>
   <td>`14, 6, 20`</td>
   <td>`-102.5, 7, 120`</td>
   <td>`0, 180, 0`</td>
   <td>`GlossyTiles`</td>
   </tr>
   <tr>
   <td>`50, 6, 20`</td>
   <td>`-70, 7, 160`</td>
   <td>`0, 90, 0`</td>
   <td>`Concrete_Tiles_A`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Floors-5.jpg" width="100%"/>

6. Add and configure the following **block** parts for the stairs leading down into the outdoor space:

   <table>
   <thead>
   <tr>
   <th>Part</th>
   <th>Size</th>
   <th>CFrame.Position</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>Top step</td>
   <td>`8, 1, 260`</td>
   <td>`-27, 4.5, 160`</td>
   </tr>
   <tr>
   <td>Left-side step one</td>
   <td>`3, 1, 74`</td>
   <td>`-14.5, 0.5, 250.75`</td>
   </tr>
   <tr>
   <td>Left-side step two</td>
   <td>`3, 1, 74`</td>
   <td>`-17, 1.5, 250.75`</td>
   </tr>
   <tr>
   <td>Left-side step three</td>
   <td>`3, 1, 74`</td>
   <td>`-19.5, 2.5, 250.75`</td>
   </tr>
   <tr>
   <td>Left-side step four</td>
   <td>`3, 1, 74`</td>
   <td>`-22, 3.5, 250.75`</td>
   </tr>
   <tr>
   <td>Right-side step one</td>
   <td>`3, 1, 74`</td>
   <td>`-14.5, 0.5, 72`</td>
   </tr>
   <tr>
   <td>Right-side step two</td>
   <td>`3, 1, 74`</td>
   <td>`-17, 1.5, 72`</td>
   </tr>
   <tr>
   <td>Right-side step three</td>
   <td>`3, 1, 74`</td>
   <td>`-19.5, 2.5, 72`</td>
   </tr>
   <tr>
   <td>Right-side step four</td>
   <td>`3, 1, 74`</td>
   <td>`-22, 3.5, 72`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Floors-6.jpg" width="100%"/>

7. Select these parts, then in the **Properties** window,

   1. Set **Color** to **233, 218, 218**.
   1. Set **Material** to **Concrete**.
   1. Set **MaterialVariant** to **Concrete_Tiles_A**.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Floors-7.jpg" width="100%"/>

8. Anchor all of these parts and modular assets.

  </TabItem>
</Tabs>

### Spawn Zones

The original greybox design for spawn zones was to create an area at opposite ends of their map for users to join their respective team when the match starts. The placement of these spawn zones allows users to have a safe location at the start of the match that's far away from enemy fire.

<img src="../../assets/tutorials/environmental-art-curriculum/Section1/ThreeLaneLayout-SpawnZones.jpg" width="100%"/>

The final sample laser tag environment keeps the intent of this design while also adding a color theme: **pastel blue-green** for the team that assembles on the left side of the map, and **carnation pink** for the team that assembles on the right side of the map. You will continue to use this same color scheme throughout this section of the tutorial to differentiate areas of the map near each team's respective spawn zone.

<Tabs>
  <TabItem key = "1" label="Create Your Own">

To apply your own asset library to the spawn zones:

1. Add and configure any applicable **wall**, **corner**, and **door frame** modular assets to the inside of your **left spawn zone**.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/SpawnZones-1.jpg" width="100%"/>

1. Select your wall components, then in the **Properties** window, set **Color** to a **unique** hue. You will continue to use this color throughout the rest of the map to orient players to their location relative to this team's color theme.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/SpawnZones-2.jpg" width="100%"/>

1. Repeat this process for your **right spawn zone**.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/SpawnZones-4.jpg" width="100%"/>

1. Anchor all of these spawn zone assets.

  </TabItem>
  <TabItem key = "2" label="Recreate the Sample">

To exactly recreate the spawn zones within the sample [Environment Art - Constructing](https://www.roblox.com/games/14447826396/Environment-Art-Constructing) place file:

1. Add and configure the following **modular** assets for the left spawn zone:

   <table>
   <thead>
   <tr>
   <th>Asset Name</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>WallCornerInner</td>
   <td>`-110, 5, 335`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-110, 5, 320`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-110, 5, 305`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallCornerInner</td>
   <td>`-105, 5, 300`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>DoorFrame</td>
   <td>`-85, 5, 300`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-70, 5, 300`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>DoorFrame</td>
   <td>`-50, 5, 300`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>WallCornerInner</td>
   <td>`-45, 5, 305`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-45, 5, 320`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-45, 5, 335`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>WallCornerInner</td>
   <td>`-50, 5, 340`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-65, 5, 340`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-80, 5, 340`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-95, 5, 340`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>WallMid</td>
   <td>`-105, 5, 340`</td>
   <td>`0, 90, 0`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/SpawnZones-1.jpg" width="100%"/>

2. Select the wall component of these assets, then in the **Properties** window, set **Color** to **88, 218, 171**.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/SpawnZones-2.jpg" width="100%"/>

3. Add and configure the following **modular** assets for the right spawn zone:

   <table>
   <thead>
   <tr>
   <th>Asset Name</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>WallCornerInner</td>
   <td>`-110, 5, 15`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-110, 5, -0`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-110, 5, -15`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallCornerInner</td>
   <td>`-105, 5, -20`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-90, 5, -20`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-75, 5, -20`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-60, 5, -20`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>WallMid</td>
   <td>`-50, 5, -20`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>WallCornerInner</td>
   <td>`-45, 5, -15`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-45, 5, -0`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-45, 5, 15`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>WallCornerInner</td>
   <td>`-50, 5, 20`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>DoorFrame</td>
   <td>`-70, 5, 20`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-85, 5, 20`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-105, 5, 20`</td>
   <td>`0, 90, 0`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/SpawnZones-3.jpg" width="100%"/>

4. Select the wall component of these assets, then in the **Properties** window, set **Color** to **255, 170, 255**.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/SpawnZones-4.jpg" width="100%"/>

5. Anchor all of these modular assets.

  </TabItem>
</Tabs>

### Combat Pockets

The original greybox design for the combat pockets was to create intentional spaces for combat where the map's primary lanes intersect with the cross lanes. In addition, the original greybox design required that each combat pocket needed to only include three entrance or exit points at most to refrain from giving users choice overload as they're navigating the space.

The final sample laser tag environment applies the sample [Environment Art Asset Library](https://www.roblox.com/library/14447738661/Environment-Art-Asset-Library) directly onto the greybox geometry to exactly match the original design while also using the color theme introduced in the previous section to differentiate areas of the map near each team's respective spawn zone. Using these colors and the floor material, users can quickly orient themselves to where they are no matter where they are around the building, respecting the original intention behind the greybox design for the building's floors.

<img src="../../assets/tutorials/environmental-art-curriculum/Section4/CombatPockets-Intro1.jpg" width="100%"/>

In addition, the technique in this section also applies props from the sample asset library to left and right combat pockets in order to add character to the environment and provide believability that it has life on its own even if users weren't present. This process, also called **set dressing**, provides users both direct and indirect information about the world they're visiting. For example, the signage and foliage props in this section reinforce the sample art style from [Develop Polishing Assets](../environmental-art/develop-polished-assets.md), and inform users that they're in a high-tech environment that still prioritizes organic life.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/tutorials/environmental-art-curriculum/Section4/CombatPockets-Intro2.jpg" width="100%"/>
  </figure>
  <figure>
    <img src="../../assets/tutorials/environmental-art-curriculum/Section4/CombatPockets-Intro3.jpg" width="100%"/>
  </figure>
</GridContainer>

<Tabs>
  <TabItem key = "1" label="Create Your Own">

To apply your own asset library to the combat pockets:

1. Add and configure any applicable props or **wall**, **corner**, **door frame**, and **door** modular assets to the inside and outside of your **left combat pocket**.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/GeneralCombatPockets-1.jpg" width="100%"/>

1. Select your wall components on the outside of your left combat pocket, then in the **Properties** window, set **Color** to the **same** hue as the left spawn zone's color theme. This allows players to orient themselves relative to this team's color theme as they are navigating primary and cross lanes.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/GeneralCombatPockets-2.jpg" width="100%"/>

1. Select your wall components on the inside of your left combat pocket, then in the **Properties** window, set **Color** to a **unique** hue. This allows players to orient themselves when they are within the combat pocket and looking through exit points.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/CombatPockets-6.jpg" width="100%"/>

1. Repeat this process for your **middle combat pocket** and **right combat pocket**.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/CombatPockets-16.jpg" width="100%"/>

1. Anchor all of these combat pocket assets.

  </TabItem>
  <TabItem key = "2" label="Recreate the Sample">

To exactly recreate the combat pockets within the sample [Environment Art - Constructing](https://www.roblox.com/games/14447826396/Environment-Art-Constructing) place file:

To apply your asset library to the combat pockets:

1. Add and configure the following **modular** assets for the left combat pocket's exterior:

   <table>
   <thead>
   <tr>
   <th>Asset Name</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>WallCornerOuter</td>
   <td>`-105, 5, 280`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-105, 5, 280`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>WallCornerOuter</td>
   <td>`-105, 5, 265`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>WallSmall</td>
   <td>`-105, 5, 265`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>WallCornerInner</td>
   <td>`-100, 5, 265`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>Door</td>
   <td>`-95, 5, 260`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>DoorFrame</td>
   <td>`-95, 5, 260`</td>
   <td>`0, -180, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-95, 5, 240`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>WallCornerOuter</td>
   <td>`-95, 5, 225`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-95, 5, 225`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>DoorFrame</td>
   <td>`-80, 5, 225`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-60, 5, 225`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>WallCornerOuter</td>
   <td>`-45, 5, 225`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>WallSmall</td>
   <td>`-45, 5, 225`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-45, 5, 230`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-45, 5, 245`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-45, 5, 260`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallCornerOuter</td>
   <td>`-45, 5, 275`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallMid</td>
   <td>`-45, 5, 275`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>WallSmall</td>
   <td>`-55, 5, 275`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>DoorFrame</td>
   <td>`-60, 5, 275`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>WallMid</td>
   <td>`-80, 5, 275`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>WallCornerInner</td>
   <td>`-90, 5, 275`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallCornerOuter</td>
   <td>`-95, 5, 280`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallMid</td>
   <td>`-95, 5, 280`</td>
   <td>`0, -90, 0`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/CombatPockets-1.jpg" width="100%"/>

2. Select the wall component of these assets, then in the **Properties** window, set **Color** to **88, 218, 171**.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/CombatPockets-2.jpg" width="100%"/>

3. Add and configure the following **prop** assets for the left combat pocket's exterior:

   <table>
   <thead>
   <tr>
   <th>Asset Name</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>Extinguisher</td>
   <td>`-44, 10, 254.5`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallHanging</td>
   <td>`-44, 12.5, 248.5`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallConsoleA</td>
   <td>`-44, 5.5, 233`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>Extinguisher</td>
   <td>`-96, 10, 242`</td>
   <td>`0, 0, 0`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/CombatPockets-3.jpg" width="100%"/>

4. Add and configure the following **modular** assets for the left combat pocket's interior:

   <table>
   <thead>
   <tr>
   <th>Asset Name</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>WallCornerInner</td>
   <td>`-90, 5, 265`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>WallSmall</td>
   <td>`-90, 5, 260`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>DoorFrame</td>
   <td>`-90, 5, 240`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallCornerInner</td>
   <td>`-85, 5, 235`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallSmall</td>
   <td>`-80, 5, 235`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>DoorFrame</td>
   <td>`-60, 5, 235`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>WallCornerInner</td>
   <td>`-55, 5, 240`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-55, 5, 255`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>WallMid</td>
   <td>`-55, 5, 265`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>WallCornerInner</td>
   <td>`-60, 5, 270`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>DoorFrame</td>
   <td>`-80, 5, 270`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>WallSmall</td>
   <td>`-85, 5, 270`</td>
   <td>`0, 90, 0`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/CombatPockets-4.jpg" width="100%"/>

5. Select the wall component of these assets, then in the **Properties** window,

   1. Set **Color** to **211, 190, 150**.
   1. Set **MaterialVariant** to **MetalPanels**.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/CombatPockets-5.jpg" width="100%"/>

6. Add a **PlanterSmall** prop asset for a piece of cover at a **CFrame.Position** of **-67.5, 5, 252.5** and a **CFrame.Orientation** of **0, 90, 0**. You can add foliage assets from the asset library to the top of the planter to add more organic life to the building.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/CombatPockets-6.jpg" width="100%"/>

7. Add and configure the following **modular** assets for the middle combat pocket's exterior:

   <table>
   <thead>
   <tr>
   <th>Asset Name</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>WallSmall</td>
   <td>`-40, 5, 195`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallCornerOuter</td>
   <td>`-40, 5, 200`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>DoorFrame</td>
   <td>`-40, 5, 200`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-60, 5, 200`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>WallCornerInner</td>
   <td>`-75, 5, 200`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallSmall</td>
   <td>`-80, 5, 205`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallCornerOuter</td>
   <td>`-80, 5, 210`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-80, 5, 210`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>WallCornerOuter</td>
   <td>`-95, 5, 210`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>WallRiseA</td>
   <td>`-95, 5, 210`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>WallMid</td>
   <td>`-95, 10, 190`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>WallCornerInner</td>
   <td>`-95, 10, 180`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-100, 10, 175`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>WallCornerOuter</td>
   <td>`-115, 10, 175`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>WallSmall</td>
   <td>`-115, 10, 175`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>DoorFrame</td>
   <td>`-115, 10, 170`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>WallSmall</td>
   <td>`-115, 10, 150`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>WallCornerOuter</td>
   <td>`-115, 10, 145`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-115, 10, 145`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>WallCornerInner</td>
   <td>`-100, 10, 145`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>WallMid</td>
   <td>`-95, 10, 140`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>WallRiseB</td>
   <td>`-95, 5, 110`</td>
   <td>`0, -180, 0`</td>
   </tr>
   <tr>
   <td>WallCornerOuter</td>
   <td>`-95, 5, 110`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-95, 5, 110`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>WallCornerOuter</td>
   <td>`-80, 5, 110`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>WallSmall</td>
   <td>`-80, 5, 110`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallCornerInner</td>
   <td>`-80, 5, 115`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-75, 5, 120`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>DoorFrame</td>
   <td>`-60, 5, 120`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>WallCornerOuter</td>
   <td>`-40, 5, 120`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>WallSmall</td>
   <td>`-40, 5, 120`</td>
   <td>`0, 0, 0`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/CombatPockets-7.jpg" width="100%"/>

8. Select the wall component of these assets, then in the **Properties** window,

   1. Set **Color** to **181, 173, 156**.
   1. Set **MaterialVariant** to **Concrete_Ribbed_A**.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/CombatPockets-8.jpg" width="100%"/>

9. Add and configure the following **modular** assets for the middle combat pocket's interior:

   <table>
   <thead>
   <tr>
   <th>Asset Name</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>DoorFrame</td>
   <td>`-60, 5, 185`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>WallRiseB</td>
   <td>`-60, 5, 185`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>WallSmall</td>
   <td>`-85, 10, 185`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>WallCornerInner</td>
   <td>`-90, 10, 180`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>WallMid</td>
   <td>`-90, 10, 170`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>DoorFrame</td>
   <td>`-90, 10, 150`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallMid</td>
   <td>`-90, 10, 140`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallCornerInner</td>
   <td>`-85, 10, 135`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallSmall</td>
   <td>`-80, 10, 135`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>WallRiseA</td>
   <td>`-60, 5, 135`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>DoorFrame</td>
   <td>`-40, 5, 135`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimAShort</td>
   <td>`-65, 5, 151`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimAShort</td>
   <td>`-75, 5, 169`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimAMid</td>
   <td>`-65, 5, 169`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimAMid</td>
   <td>`-65, 10, 167`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimACorner</td>
   <td>`-65, 5, 169`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimACorner</td>
   <td>`-65, 5, 151`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>DoorFramePlug</td>
   <td>`-40, 5, 200`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>DoorFramePlug</td>
   <td>`-60, 5, 185`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>DoorFramePlug</td>
   <td>`-100, 10, 170`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>DoorFramePlug</td>
   <td>`-105, 10, 170`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>DoorFramePlug</td>
   <td>`-110, 10, 170`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>DoorFramePlug</td>
   <td>`-105, 10, 150`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>DoorFramePlug</td>
   <td>`-60, 5, 120`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>DoorFramePlug</td>
   <td>`-40, 5, 135`</td>
   <td>`0, -90, 0`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/CombatPockets-9.jpg" width="100%"/>

10. Select the wall component of these assets, then in the **Properties** window,

    1. Set **Color** to **181, 173, 156**.
    1. Set **MaterialVariant** to **Concrete_Ribbed_A**.

      <img src="../../assets/tutorials/environmental-art-curriculum/Section4/CombatPockets-10.jpg" width="100%"/>

11. Add and configure the following **modular** assets for the right combat pocket's exterior:

      <table>
      <thead>
      <tr>
      <th>Asset Name</th>
      <th>CFrame.Position</th>
      <th>CFrame.Orientation</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td>WallCornerOuter</td>
      <td>`-95, 5, 95`</td>
      <td>`0, -90, 0`</td>
      </tr>
      <tr>
      <td>WallLarge</td>
      <td>`-95, 5, 95`</td>
      <td>`0, 180, 0`</td>
      </tr>
      <tr>
      <td>DoorFrame</td>
      <td>`-95, 5, 80`</td>
      <td>`0, 180, 0`</td>
      </tr>
      <tr>
      <td>WallCornerInner</td>
      <td>`-95, 5, 60`</td>
      <td>`0, -90, 0`</td>
      </tr>
      <tr>
      <td>WallSmall</td>
      <td>`-100, 5, 55`</td>
      <td>`0, -90, 0`</td>
      </tr>
      <tr>
      <td>WallCornerOuter</td>
      <td>`-105, 5, 55`</td>
      <td>`0, -90, 0`</td>
      </tr>
      <tr>
      <td>WallLarge</td>
      <td>`-105, 5, 55`</td>
      <td>`0, 180, 0`</td>
      </tr>
      <tr>
      <td>WallCornerOuter</td>
      <td>`-105, 5, 40`</td>
      <td>`0, 180, 0`</td>
      </tr>
      <tr>
      <td>WallMid</td>
      <td>`-105, 5, 40`</td>
      <td>`0, 90, 0`</td>
      </tr>
      <tr>
      <td>WallCornerOuter</td>
      <td>`-95, 5, 40`</td>
      <td>`0, 90, 0`</td>
      </tr>
      <tr>
      <td>WallCornerInner</td>
      <td>`-95, 5, 40`</td>
      <td>`0, 90, 0`</td>
      </tr>
      <tr>
      <td>WallMid</td>
      <td>`-90, 5, 45`</td>
      <td>`0, 90, 0`</td>
      </tr>
      <tr>
      <td>DoorFrame</td>
      <td>`-80, 5, 45`</td>
      <td>`0, 90, 0`</td>
      </tr>
      <tr>
      <td>WallLarge</td>
      <td>`-60, 5, 45`</td>
      <td>`0, 90, 0`</td>
      </tr>
      <tr>
      <td>WallCornerOuter</td>
      <td>`-45, 5, 45`</td>
      <td>`0, 90, 0`</td>
      </tr>
      <tr>
      <td>WallSmall</td>
      <td>`-45, 5, 45`</td>
      <td>`0, 0, 0`</td>
      </tr>
      <tr>
      <td>WallLarge</td>
      <td>`-45, 5, 50`</td>
      <td>`0, 0, 0`</td>
      </tr>
      <tr>
      <td>WallLarge</td>
      <td>`-45, 5, 65`</td>
      <td>`0, 0, 0`</td>
      </tr>
      <tr>
      <td>WallLarge</td>
      <td>`-45, 5, 80`</td>
      <td>`0, 0, 0`</td>
      </tr>
      <tr>
      <td>WallCornerOuter</td>
      <td>`-45, 5, 95`</td>
      <td>`0, 0, 0`</td>
      </tr>
      <tr>
      <td>WallMid</td>
      <td>`-45, 5, 95`</td>
      <td>`0, -90, 0`</td>
      </tr>
      <tr>
      <td>WallSmall</td>
      <td>`-55, 5, 95`</td>
      <td>`0, -90, 0`</td>
      </tr>
      <tr>
      <td>DoorFrame</td>
      <td>`-60, 5, 95`</td>
      <td>`0, -90, 0`</td>
      </tr>
      <tr>
      <td>WallLarge</td>
      <td>`-80, 5, 95`</td>
      <td>`0, -90, 0`</td>
      </tr>
      </tbody>
      </table>

      <img src="../../assets/tutorials/environmental-art-curriculum/Section4/CombatPockets-11.jpg" width="100%"/>

12. Select the wall component of these assets, then in the **Properties** window, set **Color** to **255, 170, 255**.

      <img src="../../assets/tutorials/environmental-art-curriculum/Section4/CombatPockets-12.jpg" width="100%"/>

13. Add and configure the following **prop** assets for the right combat pocket's exterior:

      <table>
      <thead>
      <tr>
      <th>Asset Name</th>
      <th>CFrame.Position</th>
      <th>CFrame.Orientation</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td>Extinguisher</td>
      <td>`-44, 10, 75.5`</td>
      <td>`0, 0, 0`</td>
      </tr>
      <tr>
      <td>WallHanging</td>
      <td>`-44, 5.5, 88`</td>
      <td>`0, 0, 0`</td>
      </tr>
      <tr>
      <td>WallConsoleA</td>
      <td>`-44, 12.5, 70.5`</td>
      <td>`0, 0, 0`</td>
      </tr>
      <tr>
      <td>Extinguisher</td>
      <td>`-96, 10, 62`</td>
      <td>`0, 180, 0`</td>
      </tr>
      </tbody>
      </table>

      <img src="../../assets/tutorials/environmental-art-curriculum/Section4/CombatPockets-13.jpg" width="100%"/>

14. Add and configure the following **modular** assets for the right combat pocket's interior:

      <table>
      <thead>
      <tr>
      <th>Asset Name</th>
      <th>CFrame.Position</th>
      <th>CFrame.Orientation</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td>WallCornerInner</td>
      <td>`-90, 5, 80`</td>
      <td>`0, 90, 0`</td>
      </tr>
      <tr>
      <td>DoorFrame</td>
      <td>`-90, 5, 60`</td>
      <td>`0, 0, 0`</td>
      </tr>
      <tr>
      <td>WallSmall</td>
      <td>`-90, 5, 55`</td>
      <td>`0, 0, 0`</td>
      </tr>
      <tr>
      <td>WallCornerInner</td>
      <td>`-85, 5, 50`</td>
      <td>`0, 0, 0`</td>
      </tr>
      <tr>
      <td>WallSmall</td>
      <td>`-80, 5, 50`</td>
      <td>`0, -90, 0`</td>
      </tr>
      <tr>
      <td>DoorFrame</td>
      <td>`-60, 5, 50`</td>
      <td>`0, -90, 0`</td>
      </tr>
      <tr>
      <td>WallCornerInner</td>
      <td>`-55, 5, 55`</td>
      <td>`0, -90, 0`</td>
      </tr>
      <tr>
      <td>WallLarge</td>
      <td>`-55, 5, 70`</td>
      <td>`0, 180, 0`</td>
      </tr>
      <tr>
      <td>WallMid</td>
      <td>`-55, 5, 80`</td>
      <td>`0, 180, 0`</td>
      </tr>
      <tr>
      <td>WallCornerInner</td>
      <td>`-60, 5, 85`</td>
      <td>`0, 180, 0`</td>
      </tr>
      <tr>
      <td>DoorFrame</td>
      <td>`-80, 5, 85`</td>
      <td>`0, 90, 0`</td>
      </tr>
      <tr>
      <td>WallSmall</td>
      <td>`-85, 5, 85`</td>
      <td>`0, 90, 0`</td>
      </tr>
      </tbody>
      </table>

      <img src="../../assets/tutorials/environmental-art-curriculum/Section4/CombatPockets-14.jpg" width="100%"/>

15. Select the wall component of these assets, then in the **Properties** window,

    1. Set **Color** to **255, 170, 255**.
    1. Set **MaterialVariant** to **MetalPanels**.

      <img src="../../assets/tutorials/environmental-art-curriculum/Section4/CombatPockets-15.jpg" width="100%"/>

16. Add a **PlanterSmall** prop asset for a piece of cover at a **CFrame.Position** of **-67.5, 5, 67.5** and a **CFrame.Orientation** of **0, 90, 0**. You can add foliage assets from the asset library to the top of the planter to add more organic life to the building.

      <img src="../../assets/tutorials/environmental-art-curriculum/Section4/CombatPockets-16.jpg" width="100%"/>

17. Anchor all of these prop and modular assets.

  </TabItem>
</Tabs>

### Perimeter Hallways

By applying your asset library to the exterior of the combat pockets in the previous section, most cross lanes now include polished assets aside from the hallways that make up the perimeter of the building. In addition to using the same color scheme from previous sections, the final sample laser tag environment also uses wall assets with their default orange color to inform users where they are in relation to the back of the building.

For example, using the point-of-view in the following image, users immediately have the following information to orient themselves to where they are within the building:

- The **ribbed concrete** informs users that if they move left, then they will enter the middle combat pocket.
- The **yellow wall** informs users that if they move forward, then they will reach the back of the building and the interior primary lane.
- The **pink wall** informs users that if they move right, then they will enter the right combat pocket, and that they are nearest the right side of the map.

<img src="../../assets/tutorials/environmental-art-curriculum/Section4/Perimeter-Intro1.jpg" width="100%"/>

Aside from this technique that applies the sample [Environment Art Asset Library](https://www.roblox.com/library/14447738661/Environment-Art-Asset-Library) directly onto the greybox geometry for the walls to exactly match the original design, it also adds geometry in the form of crate prop assets in order to provide users cover from enemy fire as they navigate the interior primary lane. This design iteration still respects the intention to break up sight lights and engagement distances with protruding hallway spaces and elevation changes.

<img src="../../assets/tutorials/environmental-art-curriculum/Section4/Perimeter-Intro2.jpg" width="100%"/>

<Tabs>
  <TabItem key = "1" label="Create Your Own">

To apply your own asset library to the perimeter hallways:

1. Add and configure any applicable prop or **wall**, **corner**, and **door frame** modular assets to the perimeter hallways on the **left-side** of the building.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Perimeter-1.jpg" width="100%"/>

1. Select your wall components, then in the **Properties** window, set **Color** to the **same** hue as the left spawn zone's color theme.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Perimeter-2.jpg" width="100%"/>

1. Add and configure any applicable prop or **wall**, **corner**, and **door frame** modular assets to the perimeter hallways at the **back** of the building.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Perimeter-4.jpg" width="100%"/>

1. Select your wall components, then in the **Properties** window, set **Color** to a **unique** hue. This allows players to orient themselves relative to where they are in relation to the interior primary lane. The sample experience keeps these assets their default color.
1. Add and configure any applicable prop or **wall**, **corner**, and **door frame** modular assets to the perimeter hallways on the right-side of the building.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Perimeter-5.jpg" width="100%"/>

1. Select your wall components, then in the Properties window, set Color to the same hue as the right spawn zone's color theme.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Perimeter-6.jpg" width="100%"/>

1. Anchor all of these perimeter hallway assets.

  </TabItem>
  <TabItem key = "2" label="Recreate the Sample">

To exactly recreate the perimeter hallways within the sample [Environment Art - Constructing](https://www.roblox.com/games/14447826396/Environment-Art-Constructing) place file:

1. Add and configure the following **modular** assets for the perimeter hallways on the left-side of the building:

   <table>
   <thead>
   <tr>
   <th>Asset Name</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>WallLarge</td>
   <td>`-50, 5, 295`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>DoorFrame</td>
   <td>`-70, 5, 295`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-85, 5, 295`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>DoorFrame</td>
   <td>`-105, 5, 295`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-120, 5, 295`</td>
   <td>`0, 90, 0`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Perimeter-1.jpg" width="100%"/>

2. Select the wall component of these assets, then in the **Properties** window, set **Color** to **255, 170, 255**.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Perimeter-2.jpg" width="100%"/>

3. Add and configure the following **modular** assets for the perimeter hallways at the back of the building:

   <table>
   <thead>
   <tr>
   <th>Asset Name</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>WallCornerInner</td>
   <td>`-125, 5, 290`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-125, 5, 275`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-125, 5, 260`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-125, 5, 245`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallSmall</td>
   <td>`-125, 5, 240`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallCornerInner</td>
   <td>`-120, 5, 235`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallMid</td>
   <td>`-110, 5, 235`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>WallCornerOuter</td>
   <td>`-110, 5, 235`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-110, 5, 220`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallMid</td>
   <td>`-110, 5, 210`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallRiseB</td>
   <td>`-110, 5, 210`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallCornerOuter</td>
   <td>`-110, 10, 190`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-125, 10, 190`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-140, 10, 190`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>WallCornerInner</td>
   <td>`-145, 10, 185`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>WallSmall</td>
   <td>`-145, 10, 180`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-145, 10, 165`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-145, 10, 150`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-145, 10, 135`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallCornerInner</td>
   <td>`-140, 10, 130`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-125, 10, 130`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-110, 10, 130`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>WallCornerOuter</td>
   <td>`-110, 10, 130`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallRiseA</td>
   <td>`-110, 5, 110`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallMid</td>
   <td>`-110, 5, 100`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-110, 5, 85`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallCornerOuter</td>
   <td>`-110, 5, 85`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>WallMid</td>
   <td>`-120, 5, 85`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>WallCornerInner</td>
   <td>`-125, 5, 80`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-125, 5, 65`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-125, 5, 50`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-125, 5, 35`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallSmall</td>
   <td>`-125, 5, 30`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallCornerInner</td>
   <td>`-120, 5, 25`</td>
   <td>`0, 0, 0`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Perimeter-3.jpg" width="100%"/>

4. Add and configure the following **prop** assets for the perimeter hallways at the back of the building:

   <table>
   <thead>
   <tr>
   <th>Asset Name</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>SecurityCamera</td>
   <td>`-120, 20, 290`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallHanging</td>
   <td>`-124, 13, 287.5`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>CrateMedium</td>
   <td>`-120, 5, 260`</td>
   <td>`0, -180, 0`</td>
   </tr>
   <tr>
   <td>CrateSmall</td>
   <td>`-110, 5, 250`</td>
   <td>`0, 135, 0`</td>
   </tr>
   <tr>
   <td>WallHanging</td>
   <td>`-109, 13, 217.5`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>WallHanging</td>
   <td>`-109, 13, 103`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>CrateSmall</td>
   <td>`-110, 5, 70`</td>
   <td>`0, 135, 0`</td>
   </tr>
   <tr>
   <td>CrateMedium</td>
   <td>`-120, 5, 65`</td>
   <td>`0, -180, 0`</td>
   </tr>
   <tr>
   <td>WallHanging</td>
   <td>`-124, 13, 37.5`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>SecurityCamera</td>
   <td>`-120, 20, 30`</td>
   <td>`0, -90, 0`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Perimeter-4.jpg" width="100%"/>

5. Add and configure the following assets for the perimeter hallways on the right-side of the building:

   <table>
   <thead>
   <tr>
   <th>Part</th>
   <th>Size</th>
   <th>CFrame.Position</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>WallLarge</td>
   <td>`-105, 5, 25`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>DoorFrame</td>
   <td>`-85, 5, 25`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-70, 5, 25`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>DoorFrame</td>
   <td>`-50, 5, 25`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>WallLarge</td>
   <td>`-35, 5, 25`</td>
   <td>`0, -90, 0`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Perimeter-5.jpg" width="100%"/>

6. Select the wall component of these assets, then in the **Properties** window, set **Color** to **255, 170, 255**.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Perimeter-6.jpg" width="100%"/>

7. Anchor all of these prop and modular assets.

  </TabItem>
</Tabs>

### Doors

The final sample laser tag environment applies doors directly onto the greybox geometry to exactly match the original design, however, not all entrance or exit points have door assets. You may find that the requirements of your own experience require more or less doors, depending on how you want to control combat within your combat pockets. More doors often leads to longer wait times before users enter or exit a combat pocket, but less doors may open up unwanted lines of sight.

For this reason, it's recommended to playtest with multiple variations to experiment different play styles. In fact, you may experiment with placing door assets into your combat pockets that only open to users from one side of the door, or not at all.

<Tabs>
  <TabItem key = "1" label="Create Your Own">

To apply your own asset library to the doors:

1. Add and configure any **door** modular assets to the doorways of your combat pockets.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Doors-2.jpg" width="100%"/>

1. **(Optional)** Anchor all of these door assets.

  </TabItem>
  <TabItem key = "2" label="Recreate the Sample">

To exactly recreate the doors within the sample [Environment Art - Constructing](https://www.roblox.com/games/14447826396/Environment-Art-Constructing) place file:

1. Add and configure the following **Door** assets for the left combat pocket:

   <table>
   <thead>
   <tr>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>`-60, 5, 275`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>`-95, 5, 260`</td>
   <td>`0, 180, 0`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Doors-1.jpg" width="100%"/>

2. Add and configure the following **Door** assets for the right combat pocket:

<table>
<thead>
<tr>
<th>CFrame.Position</th>
<th>CFrame.Orientation</th>
</tr>
</thead>
<tbody>
<tr>
<td>`-90, 5, 60`</td>
<td>`0, 0, 0`</td>
</tr>
<tr>
<td>`-80, 5, 45`</td>
<td>`0, 90, 0`</td>
</tr>
</tbody>
</table>

<img src="../../assets/tutorials/environmental-art-curriculum/Section4/Doors-2.jpg" width="100%"/>

  </TabItem>
</Tabs>

### Exterior Assets

The original greybox design for exterior assets was to set placeholder positions for objects that provide cover from enemy fire while users navigate the exterior primary lane. This was useful to help visualize what would help users as they ascend or descend stairs, cross the middle combat pocket, or otherwise exist in the outdoor space, but as you construct your environment, you can improve this design by providing different uses for these cover objects.

The following sections provide guidance on how to convert these initial placeholder assets into aesthetically pleasing objects that follow your experience's art style, and keep the intent behind the original design.

#### Towers

The first exterior assets you can convert for the outdoor space are the two towers right outside of the middle combat pocket that intersect with the exterior primary lane. The technique in this section not only creates objects that are aesthetically pleasing to the eye, but it also creates objects that provide users a sense of scale in their environment. Every other object so far is about the size of the user's character **except** for these towers, which can lead to intrigue in the story behind the architecture or overall island that the building rests on.

<Tabs>
  <TabItem key = "1" label="Create Your Own">

To apply your own asset library to the towers:

1. Using **block** parts, create a tower that is much larger than the player to provide a sense of scale in the environment.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/GeneralTowers-1.jpg" width="100%"/>

1. Apply unique colors and materials to different block parts according to the art style of your experience.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Towers-1.jpg" width="100%"/>

1. Duplicate this tower, then position it to a symmetrical location on your map.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Towers-3.jpg" width="100%"/>

1. Anchor all of these parts.

  </TabItem>
  <TabItem key = "2" label="Recreate the Sample">

To exactly recreate the towers within the sample [Environment Art - Constructing](https://www.roblox.com/games/14447826396/Environment-Art-Constructing) place file:

1. Add and configure the following **block** parts for the left tower:

   <table>
   <thead>
   <tr>
   <th>Part</th>
   <th>Size</th>
   <th>CFrame.Position</th>
   <th>Color</th>
   <th>Material</th>
   <th>MaterialVariant</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>Large Spire</td>
   <td>`16, 98, 11`</td>
   <td>`-32, 58, 186.5`</td>
   <td>`248, 248, 248`</td>
   <td>`Concrete`</td>
   <td>`Concrete_Board_Formed_A`</td>
   </tr>
   <tr>
   <td>Middle Spire</td>
   <td>`17.369, 77.734, 3.42`</td>
   <td>`-32, 72, 186.5`</td>
   <td>`181, 173, 156`</td>
   <td>`Concrete`</td>
   <td>`Concrete_Board_Formed_A`</td>
   </tr>
   <tr>
   <td>Bottom wide spire</td>
   <td>`13, 75, 15`</td>
   <td>`-31.5, 42.5, 186.5`</td>
   <td>`181, 173, 156`</td>
   <td>`Concrete`</td>
   <td>`Concrete_Ribbed_A`</td>
   </tr>
   <tr>
   <td>Top Wide Spire</td>
   <td>`17.288, 4, 15`</td>
   <td>`-33.5, 83, 186.5`</td>
   <td>`181, 173, 156`</td>
   <td>`Concrete`</td>
   <td>`Concrete_Ribbed_A`</td>
   </tr>
   <tr>
   <td>Base</td>
   <td>`21, 5, 15`</td>
   <td>`-29.5, 7.5, 186.5`</td>
   <td>`181, 173, 156`</td>
   <td>`Sand`</td>
   <td>`MossStones`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Towers-1.jpg" width="100%"/>

2. Group everything into a model, then duplicate the model.
3. Move the duplicate tower to a **CFrame.Position** of **-30.572, 57.93, 133.5**.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Towers-3.jpg" width="100%"/>

4. Anchor both of these models.

  </TabItem>
</Tabs>

#### Columns

The second exterior assets you can convert for the outdoor space are the two columns that hold up the overhang pieces you will make later in this tutorial. Similar to the towers, the technique in this section not only creates objects that are aesthetically pleasing to the eye, but it also provides further visual cues to users about where they are in the overall environment. For example, each column has either pastel blue-green or carnation pink detailing to inform users if they are closest to either their own or their enemy's spawn zone.

<Tabs>
  <TabItem key = "1" label="Create Your Own">

1. Using **block** and **wedge** parts, create a column that will hold the roof of your building.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/GeneralColumns-1.jpg" width="100%"/>

1. Apply unique colors and materials to different parts according to the art style of your experience.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Columns-2.jpg" width="100%"/>

1. Duplicate this column, then position it to a symmetrical location on your map.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Columns-5.jpg" width="100%"/>

1. **(Optional)** Change the color of one part in each column to match each team's respective color theme.

1. Anchor all of these parts.

  </TabItem>
  <TabItem key = "2" label="Recreate the Sample">

To exactly recreate the columns within the sample [Environment Art - Constructing](https://www.roblox.com/games/14447826396/Environment-Art-Constructing) place file:

1. Add and configure the following **block** parts for the left column:

   <table>
   <thead>
   <tr>
   <th>Part</th>
   <th>Size</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   <th>Color</th>
   <th>Material</th>
   <th>MaterialVariant</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>Top wall</td>
   <td>`15, 20, 5`</td>
   <td>`-22.5, 20, 238.5`</td>
   <td>`0, 0, 0`</td>
   <td>`248, 248, 248`</td>
   <td>`Concrete`</td>
   <td>`Concrete_Ribbed_A`</td>
   </tr>
   <tr>
   <td>Bottom wall</td>
   <td>`15, 9, 5`</td>
   <td>`-22.5, 5.5, 238.5`</td>
   <td>`0, 0, 0`</td>
   <td>`181, 173, 156`</td>
   <td>`Concrete`</td>
   <td>`Concrete_Ribbed_A`</td>
   </tr>
   <tr>
   <td>Base top</td>
   <td>`6.483, 1, 6.583`</td>
   <td>`-27.304, 5.298, 238.498`</td>
   <td>`0, 0, 0`</td>
   <td>`181, 173, 156`</td>
   <td>`Concrete`</td>
   <td>`Concrete_Ribbed_A`</td>
   </tr>
   <tr>
   <td>Base bottom</td>
   <td>`6.483, 1.5, 19.652`</td>
   <td>`-15.154, 1.479, 238.5`</td>
   <td>`-21.622, -90, 0`</td>
   <td>`181, 173, 156`</td>
   <td>`Concrete`</td>
   <td>`Concrete_Tie_Holes_A`</td>
   </tr>
   <tr>
   <td>Color detail</td>
   <td>`1.734, 18.179, 6`</td>
   <td>`-22.547, 23.597, 238.4`</td>
   <td>`0, -180, 62`</td>
   <td>`103, 255, 199`</td>
   <td>`Concrete`</td>
   <td>`<None>`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Columns-1.jpg" width="100%"/>

2. Add and configure the following **wedge** part for the top of the left column:

   <table>
   <thead>
   <tr>
   <th>Size</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   <th>Color</th>
   <th>Material</th>
   <th>MaterialVariant</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>`7, 11, 21`</td>
   <td>`-18.5, 25.5, 238.5`</td>
   <td>`0, -90, 180`</td>
   <td>`248, 248, 248`</td>
   <td>`Concrete`</td>
   <td>`Concrete_Board_Formed_A`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Columns-2.jpg" width="100%"/>

3. Group everything into a model, then duplicate the model.
4. Move the duplicate column to a **CFrame.Position** of **-18.169, 14.081, 81.5** and a **CFrame.Orientation** of **0, -90, 180**.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Columns-4.jpg" width="100%"/>

5. Select the pastel blue-green **block** part, then in the **Properties** window, set the **Color** property to **255, 170, 255** to match the color theme of the team on the right of the map.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Columns-5.jpg" width="100%"/>

6. Anchor both of these models.

  </TabItem>
</Tabs>

#### Planters

The final exterior assets you can convert for the outdoor space are the eight planters that extend along the entirety of the exterior primary lane. Using [solid modeling](../../parts/solid-modeling.md) operations, you can negate and join parts together to form the base of each planter, then apply your asset library using different materials, foliage, and/or trim asset configurations so that each one feels unique in the 3D space.

To apply your asset library to the left-most planter:

1. Add and configure the following **block** parts for the left-most planter:

   <table>
   <thead>
   <tr>
   <th>Part</th>
   <th>Size</th>
   <th>CFrame.Position</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>Planter exterior</td>
   <td>`20, 11, 5`</td>
   <td>`-15, 4.5, 257.5`</td>
   </tr>
   <tr>
   <td>Divot</td>
   <td>`18.5, 1, 4`</td>
   <td>`-15, 9.75, 257.5`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Planters-1.jpg" width="100%"/>

2. Select the divot part.
3. In the menu bar, navigate to the **Model** tab, then click the **Negate** button. The part turns translucent.

   <img src="../../assets/studio/general/Model-Tab-Negate.png" alt="Negate tool indicated in Model tab" width="100%" />
   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Planters-3.jpg" width="100%"/>

4. Select both the negated part and the planter exterior part.
5. In the **Model** tab, click the **Union** button. The negated part is cut out from the overlapping planter exterior part.

   <img src="../../assets/studio/general/Model-Tab-Union-Negated.png" alt="Union tool indicated in Model tab" width="100%" />
   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Planters-5.jpg" width="100%"/>

6. Select the union, then in the **Properties** window,

   1. Set **Color** to **181, 173, 156**.
   1. Set **Material** to **Concrete**.
   1. Set **MaterialVariant** to **Concrete_Board_Formed_A**.
   1. Enable **UsePartColor**.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Planters-6.jpg" width="100%"/>

7. Add and configure the following **block** parts for the dirt and edging of the planter:

   <table>
   <thead>
   <tr>
   <th>Part</th>
   <th>Size</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   <th>Color</th>
   <th>Material</th>
   <th>MaterialVariant</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>Dirt</td>
   <td>`19, 0.5, 4`</td>
   <td>`-15, 9.25, 257.5`</td>
   <td>`0, 0, 0`</td>
   <td>`248, 248, 248`</td>
   <td>`LeafyGrass`</td>
   <td>`Moss_Lumpy_Stones_A`</td>
   </tr>
   <tr>
   <td>Top planter edging</td>
   <td>`1.652, 1, 6.483`</td>
   <td>`-24.838, 5.298, 257.741`</td>
   <td>`0, 0, 0`</td>
   <td>`181, 173, 156`</td>
   <td>`Concrete`</td>
   <td>`Concrete_Tie_Holes_A`</td>
   </tr>
   <tr>
   <td>Bottom planter edging</td>
   <td>`6.483, 1.5, 19.652`</td>
   <td>`-15.154, 1.479, 257.758`</td>
   <td>`0, 0, -21.62`</td>
   <td>`181, 173, 156`</td>
   <td>`Concrete`</td>
   <td>`Concrete_Tie_Holes_A`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Planters-7.jpg" width="100%"/>

8. Add foliage assets to the top of the planter to the top of the planter to add more organic life to the outdoor space.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Planters-8.jpg" width="100%"/>

9. Anchor all of these parts and foliage assets.

Now that you know how to use the solid modeling tools, you can experiment in creating types of planters with different exteriors, materials, plant variety, and trim pieces. For example, the other variations of planters within the final sample laser tag environment either make an 'L' shape, or they layer **block** parts and white trim together to provide higher cover in the middle of the map.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Planters-9.jpg" width="100%"/>
  </figure>
  <figure>
    <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Planters-10.jpg" width="100%"/>
  </figure>
</GridContainer>

<img src="../../assets/tutorials/environmental-art-curriculum/Section4/Planters-11.jpg" width="100%"/>

### Roof

The original greybox design didn't include a roof to the building because it would have prevented you from seeing your progress as you designed and constructed your three lane map layout. However, now that the interior of the building is complete outside of configuring its light sources, you can apply your asset library to new geometry to finish the building and provide users shelter from the outdoor space.

The roof of the building is one of the most complex assets in the final sample laser tag environment because it includes multiple layers that must fit together with each other and with the interior geometry. The following instructions walk you through how to construct each layer, starting with the top-most geometry to the final layer of trim that surrounds the perimeter of the roof.

<img src="../../assets/tutorials/environmental-art-curriculum/Section4/Roof-Intro.jpg" width="100%"/>

#### Skylights

The first, top-most layer of the roof is the skylight geometry. The purpose of this layer is to provide outdoor light into interior combat areas.

<Tabs>
  <TabItem key = "1" label="Create Your Own">

To apply your own asset library to the skylights:

1. Add and configure any **skylight** modular assets to the ceiling of your building. This allows global lighting into combat areas, and provides a richer sense of immersion for players.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Skylight-5.jpg" width="100%"/>

1. Using **block** parts, create glass for some of your skylights.

   1. Add and position a **block** part into a skylight.

      <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Skylight-6.jpg" width="100%"/>

   1. Select the part, then in the **Properties** window,

      1. Set **Color** to **105, 162, 172.**
      1. Set **Material** to **Neon**.
      1. Set **Transparency** to **0.6**.

      <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Skylight-7.jpg" width="100%"/>

1. Anchor all of these skylight assets.

  </TabItem>
  <TabItem key = "2" label="Recreate the Sample">

To exactly recreate the skylights within the sample [Environment Art - Constructing](https://www.roblox.com/games/14447826396/Environment-Art-Constructing) place file:

1. Add and configure the following **modular** assets for the left skylight:

   <table>
   <thead>
   <tr>
   <th>Asset Name</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>SkylightCornerInner</td>
   <td>`-60, 20, 265`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>SkylightCornerInner</td>
   <td>`-85, 20, 240`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>SkylightCornerInner</td>
   <td>`-60, 20, 240`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>SkylightCornerInner</td>
   <td>`-85, 20, 265`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>SkylightSmall</td>
   <td>`-70, 20, 240`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>SkylightSmall</td>
   <td>`-85, 20, 250`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>SkylightSmall</td>
   <td>`-75, 20, 265`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>SkylightSmall</td>
   <td>`-60, 20, 255`</td>
   <td>`0, 180, 0`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Skylight-1.jpg" width="100%"/>

2. Add and configure the following **modular** assets for the top-left skylight:

   <table>
   <thead>
   <tr>
   <th>Asset Name</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>SkylightCornerInner</td>
   <td>`-120, 20, 280`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>SkylightCornerInner</td>
   <td>`-110, 20, 280`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>SkylightCornerInner</td>
   <td>`-120, 20, 240`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>SkylightCornerInner</td>
   <td>`-110, 20, 240`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>SkylightLarge</td>
   <td>`-110, 20, 252.5`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>SkylightLarge</td>
   <td>`-120, 20, 245`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>SkylightLarge</td>
   <td>`-120, 20, 260`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>SkylightLarge</td>
   <td>`-110, 20, 260`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>SkylightLarge</td>
   <td>`-120, 20, 267.5`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>SkylightLarge</td>
   <td>`-120, 20, 252.5`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>SkylightLarge</td>
   <td>`-110, 20, 267.5`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>SkylightLarge</td>
   <td>`-110, 20, 275`</td>
   <td>`0, 180, 0`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Skylight-2.jpg" width="100%"/>

3. Add and configure the following **modular** assets for the middle skylight:

   <table>
   <thead>
   <tr>
   <th>Asset Name</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>SkylightCornerInner</td>
   <td>`-120, 25, 140`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>SkylightCornerInner</td>
   <td>`-140, 25, 140`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>SkylightCornerInner</td>
   <td>`-120, 25, 180`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>SkylightCornerInner</td>
   <td>`-140, 25, 180`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>SkylightLarge</td>
   <td>`-120, 25, 170`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>SkylightLarge</td>
   <td>`-140, 25, 150`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>SkylightSmall</td>
   <td>`-120, 25, 155`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>SkylightSmall</td>
   <td>`-140, 25, 165`</td>
   <td>`0, 0, 0`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Skylight-3.jpg" width="100%"/>

4. Add and configure the following **modular** assets for the top-right skylight:

   <table>
   <thead>
   <tr>
   <th>Asset Name</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>SkylightCornerInner</td>
   <td>`-110, 20, 40`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>SkylightCornerInner</td>
   <td>`-120, 20, 80`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>SkylightCornerInner</td>
   <td>`-110, 20, 80`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>SkylightCornerInner</td>
   <td>`-120, 20, 40`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>SkylightLarge</td>
   <td>`-110, 20, 67.5`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>SkylightLarge</td>
   <td>`-110, 20, 60`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>SkylightLarge</td>
   <td>`-110, 20, 75`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>SkylightLarge</td>
   <td>`-120, 20, 52.5`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>SkylightLarge</td>
   <td>`-110, 20, 52.5`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>SkylightLarge</td>
   <td>`-120, 20, 60`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>SkylightLarge</td>
   <td>`-120, 20, 67.5`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>SkylightLarge</td>
   <td>`-120, 20, 45`</td>
   <td>`0, 0, 0`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Skylight-4.jpg" width="100%"/>

5. Add and configure the following **modular** assets for the right skylight:

   <table>
   <thead>
   <tr>
   <th>Asset Name</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>SkylightCornerInner</td>
   <td>`-85, 20, 80`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>SkylightCornerInner</td>
   <td>`-60, 20, 80`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>SkylightCornerInner</td>
   <td>`-85, 20, 55`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>SkylightCornerInner</td>
   <td>`-60, 20, 55`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>SkylightSmall</td>
   <td>`-70, 20, 55`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>SkylightSmall</td>
   <td>`-85, 20, 65`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>SkylightSmall</td>
   <td>`-75, 20, 80`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>SkylightSmall</td>
   <td>`-60, 20, 70`</td>
   <td>`0, 180, 0`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Skylight-5.jpg" width="100%"/>

6. Add and configure the following **block** parts for the skylight glass for the two skylights near the back of the building:

   <table>
   <thead>
   <tr>
   <th>Part</th>
   <th>Size</th>
   <th>CFrame.Position</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>Left glass</td>
   <td>`10, 1.574, 39`</td>
   <td>`-115, 21.395, 260.5`</td>
   </tr>
   <tr>
   <td>Right glass</td>
   <td>`10, 1.574, 39`</td>
   <td>`-115, 21.395, 60.5`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Skylight-6.jpg" width="100%"/>

7. Select these two parts, then in the **Properties** window:

   1. Set **Color** to **105, 162, 172**.
   1. Set **Material** to **Neon**.
   1. Set **Transparency** to **0.6**.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Skylight-7.jpg" width="100%"/>

8. Anchor all of these parts and modular assets.
9. **(Optional)** You can add foliage assets around the left, middle, and right skylights for more visual variety when users navigate through the building, and to add a pop of color to the ceiling.

<img src="../../assets/tutorials/environmental-art-curriculum/Section4/Skylight-8.jpg" width="100%"/>

  </TabItem>
</Tabs>

#### Ceiling

The second layer of the roof is the ceiling geometry that users see at the top of their view as they navigate the interior of the building. The purpose of this layer is to fill the open areas between the top trim of each wall asset.

<Tabs>
  <TabItem key = "1" label="Create Your Own">

To apply your own asset library to the ceiling of the roof:

1. Using **block** and **wedge** parts, fill in the open space around your skylights.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Ceiling-3.jpg" width="100%"/>

1. Select these parts, then in the **Properties** window, set **Color**, **Material**, and/or **MaterialVariant** to values that apply a distinct visual treatment from other surfaces in your environment. This helps players orient themselves when they are moving their camera quickly.
1. Anchor all of these ceiling assets.

  </TabItem>
  <TabItem key = "2" label="Recreate the Sample">

To exactly recreate the ceiling within the sample [Environment Art - Constructing](https://www.roblox.com/games/14447826396/Environment-Art-Constructing) place file:

1. Add and configure the following **block** parts for the fill:

   <table>
   <thead>
   <tr>
   <th>Size</th>
   <th>CFrame.Position</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>`55, 1, 30`</td>
   <td>`-77.5, 20.5, 320`</td>
   </tr>
   <tr>
   <td>`30, 1, 5`</td>
   <td>`-105, 20.5, 287.5`</td>
   </tr>
   <tr>
   <td>`10, 1, 5`</td>
   <td>`-115, 20.5, 282.5`</td>
   </tr>
   <tr>
   <td>`50, 1, 10`</td>
   <td>`-65, 20.5, 285`</td>
   </tr>
   <tr>
   <td>`10, 1, 85`</td>
   <td>`-35, 20.5, 247.5`</td>
   </tr>
   <tr>
   <td>`10, 1, 20`</td>
   <td>`-105, 20.5, 250`</td>
   </tr>
   <tr>
   <td>`5, 1, 35`</td>
   <td>`-102.5, 20.5, 222.5`</td>
   </tr>
   <tr>
   <td>`25, 1, 5`</td>
   <td>`-87.5, 20.5, 217.5`</td>
   </tr>
   <tr>
   <td>`35, 1, 15`</td>
   <td>`-57.5, 20.5, 212.5`</td>
   </tr>
   <tr>
   <td>`5, 1, 10`</td>
   <td>`-32.5, 20.5, 200`</td>
   </tr>
   <tr>
   <td>`5, 1, 15`</td>
   <td>`-102.5, 25.5, 187.5`</td>
   </tr>
   <tr>
   <td>`35, 1, 5`</td>
   <td>`-122.5, 25.5, 182.5`</td>
   </tr>
   <tr>
   <td>`35, 1, 5`</td>
   <td>`-122.5, 25.5, 137.5`</td>
   </tr>
   <tr>
   <td>`5, 1, 15`</td>
   <td>`-102.5, 25.5, 132.5`</td>
   </tr>
   <tr>
   <td>`5, 1, 35`</td>
   <td>`-102.5, 20.5, 97.5`</td>
   </tr>
   <tr>
   <td>`25, 1, 5`</td>
   <td>`-87.5, 20.5, 102.5`</td>
   </tr>
   <tr>
   <td>`35, 1, 15`</td>
   <td>`-57.5, 20.5, 107.5`</td>
   </tr>
   <tr>
   <td>`10, 1, 85`</td>
   <td>`-35, 20.5, 72.5`</td>
   </tr>
   <tr>
   <td>`5, 1, 10`</td>
   <td>`-32.5, 20.5, 120.5`</td>
   </tr>
   <tr>
   <td>`10, 1, 20`</td>
   <td>`-105, 20.5, 70`</td>
   </tr>
   <tr>
   <td>`10, 1, 5`</td>
   <td>`-115, 20.5, 37.5`</td>
   </tr>
   <tr>
   <td>`30, 1, 5`</td>
   <td>`-105, 20.5, 32.5`</td>
   </tr>
   <tr>
   <td>`50, 1, 10`</td>
   <td>`-65, 20.5, 35`</td>
   </tr>
   <tr>
   <td>`55, 1, 30`</td>
   <td>`-77.5, 20.5, 0`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Ceiling-1.jpg" width="100%"/>

2. Add and configure the following **wedge** parts for the elevated ceiling:

   <table>
   <thead>
   <tr>
   <th>Size</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>`5, 5, 10`</td>
   <td>`-102.5, 22.5, 200`</td>
   <td>`0, 0, 180`</td>
   </tr>
   <tr>
   <td>`5, 5, 10`</td>
   <td>`-102.5, 22.5, 120`</td>
   <td>`0, 180, 180`</td>
   </tr>
   </tbody>
   </table>

3. Select all of these ceiling parts, then in the **Properties** window:

   1. Set **Color** to **248, 248, 248**.
   1. Set **MaterialVariant** to **MetalPanels**.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Ceiling-3.jpg" width="100%"/>

4. Anchor all of these parts.

  </TabItem>
</Tabs>

#### Top Roof

The third layer of the roof is the top roof geometry. The purpose of this layer is to provide bulk to the outermost roof area that users see as they look at the building from the outdoor space. It also adds a sense of depth to the skylights, making the building look more complete from the inside and out.

<Tabs>
  <TabItem key = "1" label="Create Your Own">

To apply your own asset library to the top of the roof:

1. Using **block** and **wedge** parts, add in a thick layer to cover the ceiling without hiding your skylights. This surface is what players can see when they are looking at the building from the outdoor space.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/TopRoof-3.jpg" width="100%"/>

1. Select these parts, then in the **Properties** window, set **Color**, **Material**, and/or **MaterialVariant** to values that apply a visual treatment according to the art style of your experience.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/TopRoof-4.jpg" width="100%"/>

1. Anchor all of these top roof assets.

  </TabItem>
  <TabItem key = "2" label="Recreate the Sample">

To exactly recreate the top of the roof within the sample [Environment Art - Constructing](https://www.roblox.com/games/14447826396/Environment-Art-Constructing) place file:

1. Add and configure the following **block** parts for the top roof on the left of the map:

   <table>
   <thead>
   <tr>
   <th>Size</th>
   <th>CFrame.Position</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>`126, 15, 90`</td>
   <td>`-92, 28.5, 325`</td>
   </tr>
   <tr>
   <td>`35, 15, 40`</td>
   <td>`-137.5, 28.5, 260`</td>
   </tr>
   <tr>
   <td>`25, 15, 40`</td>
   <td>`-97.5, 28.5, 260`</td>
   </tr>
   <tr>
   <td>`35, 15, 15`</td>
   <td>`-72.5, 28.5, 272.5`</td>
   </tr>
   <tr>
   <td>`25, 15, 75`</td>
   <td>`-42.5, 28.5, 242.5`</td>
   </tr>
   <tr>
   <td>`100, 15, 35`</td>
   <td>`-105, 28.5, 222.5`</td>
   </tr>
   <tr>
   <td>`65, 15, 10`</td>
   <td>`-62.5, 28.5, 200`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/TopRoof-1.jpg" width="100%"/>

2. Add and configure the following **block** parts for the top roof on the top middle of the map:

   <table>
   <thead>
   <tr>
   <th>Size</th>
   <th>CFrame.Position</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>`15, 10, 90`</td>
   <td>`-147.5, 31, 160`</td>
   </tr>
   <tr>
   <td>`20, 10, 25`</td>
   <td>`-130, 31, 192.5`</td>
   </tr>
   <tr>
   <td>`20, 10, 25`</td>
   <td>`-130, 31, 127.5`</td>
   </tr>
   <tr>
   <td>`26, 10, 90`</td>
   <td>`-107, 31, 160`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/TopRoof-2.jpg" width="100%"/>

3. Add and configure the following **block** parts for the top roof on the right of the map:

   <table>
   <thead>
   <tr>
   <th>Size</th>
   <th>CFrame.Position</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>`100, 15, 35`</td>
   <td>`-105, 28.5, 97.5`</td>
   </tr>
   <tr>
   <td>`65, 15, 10`</td>
   <td>`-62.5, 28.5, 120`</td>
   </tr>
   <tr>
   <td>`35, 15, 40`</td>
   <td>`-137.5, 28.5, 60`</td>
   </tr>
   <tr>
   <td>`25, 15, 40`</td>
   <td>`-97.5, 28.5, 60`</td>
   </tr>
   <tr>
   <td>`35, 15, 15`</td>
   <td>`-72.5, 28.5, 47.5`</td>
   </tr>
   <tr>
   <td>`25, 15, 75`</td>
   <td>`-42.5, 28.5, 77.5`</td>
   </tr>
   <tr>
   <td>`126, 15, 90`</td>
   <td>`-92, 28.5, -5`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/TopRoof-3.jpg" width="100%"/>

4. Select all of these top roof parts, then in the **Properties** window:

   1. Set **Color** to **181, 173, 156**.
   1. Set **Material** to **Concrete**.
   1. Set **MaterialVariant** to **Concrete_Tie_Holes_A**.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/TopRoof-4.jpg" width="100%"/>

5. Add and configure the following **block** parts for the top roof on the lower middle of the map:

   <table>
   <thead>
   <tr>
   <th>Size</th>
   <th>CFrame.Position</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>`54, 5, 15`</td>
   <td>`-67, 28.5, 187.5`</td>
   </tr>
   <tr>
   <td>`9, 5, 40`</td>
   <td>`-89.5, 28.5, 160`</td>
   </tr>
   <tr>
   <td>`54, 5, 15`</td>
   <td>`-67, 28.5, 132.5`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/TopRoof-5.jpg" width="100%"/>

6. Select all of these top roof parts, then in the **Properties** window, then set **Material** to **Concrete**.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/TopRoof-6.jpg" width="100%"/>

7. Add and configure the following **block** parts for the top roof on the sides of the middle of the map:

   <table>
   <thead>
   <tr>
   <th>Size</th>
   <th>CFrame.Position</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>`25, 5, 15`</td>
   <td>`-52.5, 23.5, 187.5`</td>
   </tr>
   <tr>
   <td>`25, 5, 15`</td>
   <td>`-52.5, 23.5, 132.5`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/TopRoof-7.jpg" width="100%"/>

8. Add and configure the following **wedge** parts for the top roof on the sides of the middle of the map:

   <table>
   <thead>
   <tr>
   <th>Size</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>`15, 5, 10`</td>
   <td>`-70, 23.5, 187.5`</td>
   <td>`0, 90, 180`</td>
   </tr>
   <tr>
   <td>`15, 5, 10`</td>
   <td>`-70, 23.5, 132.5`</td>
   <td>`0, 90, 180`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/TopRoof-8.jpg" width="100%"/>

9. Select all of these top roof parts, then in the **Properties** window:

   1. Set **Color** to **248, 248, 248**.
   1. Set **MaterialVariant** to **MetalPanels**.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/TopRoof-9.jpg" width="100%"/>

10. Anchor all of these parts.

  </TabItem>
</Tabs>

#### Overhang

The fourth layer of the roof is the overhang geometry that the column assets hold up in order for the building to be structurally sound. The purpose of this layer is to provide an aesthetically pleasing awning space for users navigating the exterior primary lane.

<Tabs>
  <TabItem key = "1" label="Create Your Own">

To apply your own asset library to the overhang of the roof:

1. Using **block** and **wedge** parts, add in a thick overhang for your columns to hold up. This surface provides players partial cover from the sun while they are navigating the exterior primary lane.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Overhang-4.jpg" width="100%"/>

1. Select these parts, then in the **Properties** window, set **Color**, **Material**, and/or **MaterialVariant** to values that apply a visual treatment according to the art style of your experience.
1. Anchor all of these overhang parts.

  </TabItem>
  <TabItem key = "2" label="Recreate the Sample">

To exactly recreate the overhang within the sample [Environment Art - Constructing](https://www.roblox.com/games/14447826396/Environment-Art-Constructing) place file:

1. Add and configure the following **block** parts for the overhang on the left of the map:

   <table>
   <thead>
   <tr>
   <th>Size</th>
   <th>CFrame.Position</th>
   <th>Color</th>
   <th>Material</th>
   <th>MaterialVariant</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>`16, 5, 90`</td>
   <td>`-16, 38.5, 240`</td>
   <td>`181, 173, 156`</td>
   <td>`Concrete`</td>
   <td>`Concrete_Board_Formed_A`</td>
   </tr>
   <tr>
   <td>`21, 5, 90`</td>
   <td>`-18.5, 33.5, 240`</td>
   <td>`181, 173, 156`</td>
   <td>`Concrete`</td>
   <td>`Concrete_Tie_Holes_A`</td>
   </tr>
   <tr>
   <td>`1, 16, 91`</td>
   <td>`-29.5, 28, 239.5`</td>
   <td>`181, 173, 156`</td>
   <td>`Concrete`</td>
   <td>`Concrete_Board_Formed_A`</td>
   </tr>
   <tr>
   <td>`0.5, 0.9, 91`</td>
   <td>`-30, 20.4, 239.5`</td>
   <td>`91, 93, 105`</td>
   <td>`Metal`</td>
   <td>`<None>`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Overhang-1.jpg" width="100%"/>

2. Add and configure the following **wedge** parts for the overhang on the left of the map:

   <table>
   <thead>
   <tr>
   <th>Size</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   <th>Color</th>
   <th>Material</th>
   <th>MaterialVariant</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>`2, 11, 21`</td>
   <td>`-18.5, 25.5, 278`</td>
   <td>`0, -90, 180`</td>
   <td>`248, 248, 248`</td>
   <td>`Concrete`</td>
   <td>`Concrete_Board_Formed_A`</td>
   </tr>
   <tr>
   <td>`88, 10, 20`</td>
   <td>`-19, 26, 240`</td>
   <td>`0, -90, 180`</td>
   <td>`181, 173, 156`</td>
   <td>`Concrete`</td>
   <td>`Concrete_Board_Formed_A`</td>
   </tr>
   <tr>
   <td>`2, 11, 21`</td>
   <td>`-18.5, 25.5, 202`</td>
   <td>`0, -90, 180`</td>
   <td>`248, 248, 248`</td>
   <td>`Concrete`</td>
   <td>`Concrete_Board_Formed_A`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Overhang-2.jpg" width="100%"/>

3. Add and configure the following **block** parts for the overhang on the right of the map:

   <table>
   <thead>
   <tr>
   <th>Size</th>
   <th>CFrame.Position</th>
   <th>Color</th>
   <th>Material</th>
   <th>MaterialVariant</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>`12, 5, 90`</td>
   <td>`-14, 38.5, 80`</td>
   <td>`181, 173, 156`</td>
   <td>`Concrete`</td>
   <td>`Concrete_Board_Formed_A`</td>
   </tr>
   <tr>
   <td>`21, 5, 90`</td>
   <td>`-18.5, 33.5, 80`</td>
   <td>`181, 173, 156`</td>
   <td>`Concrete`</td>
   <td>`Concrete_Board_Formed_A`</td>
   </tr>
   <tr>
   <td>`1, 16, 91`</td>
   <td>`-29.5, 28, 80.5`</td>
   <td>`181, 173, 156`</td>
   <td>`Concrete`</td>
   <td>`<None>`</td>
   </tr>
   <tr>
   <td>`0.5, 0.9, 91`</td>
   <td>`-30, 20.4, 80.5`</td>
   <td>`91, 93, 105`</td>
   <td>`Metal`</td>
   <td>`<None>`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Overhang-3.jpg" width="100%"/>

4. Add and configure the following **wedge** parts for the overhang on the right of the map:

   <table>
   <thead>
   <tr>
   <th>Size</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   <th>Color</th>
   <th>Material</th>
   <th>MaterialVariant</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>`2, 11, 21`</td>
   <td>`-18.5, 25.5, 118`</td>
   <td>`0, -90, 180`</td>
   <td>`255, 255, 255`</td>
   <td>`Concrete`</td>
   <td>`Concrete_Board_Formed_A`</td>
   </tr>
   <tr>
   <td>`88, 10, 20`</td>
   <td>`-19, 26, 80`</td>
   <td>`0, -90, 180`</td>
   <td>`181, 173, 156`</td>
   <td>`Concrete`</td>
   <td>`Concrete_Board_Formed_A`</td>
   </tr>
   <tr>
   <td>`2, 11, 21`</td>
   <td>`-18.5, 25.5, 42`</td>
   <td>`0, -90, 180`</td>
   <td>`255, 255, 255`</td>
   <td>`Concrete`</td>
   <td>`Concrete_Board_Formed_A`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Overhang-4.jpg" width="100%"/>

5. Anchor all of these parts.

  </TabItem>
</Tabs>

#### Trim

The final layer of the roof is the trim geometry that surrounds the perimeter of the roof. The purpose of this layer is to provide visual cohesion between each previous layer from users looking at the room from the outdoor space.

<Tabs>
  <TabItem key = "1" label="Create Your Own">

To apply your own asset library to the trim of the roof:

1. Add and configure **trim** modular assets along the overhang of your roof.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Trim-5.jpg" width="100%"/>

1. Select these parts, then in the **Properties** window, set **Color**, **Material**, and/or **MaterialVariant** to values that apply a visual treatment according to the art style of your experience.
1. Anchor all of these overhang parts.

  </TabItem>
  <TabItem key = "2" label="Recreate the Sample">

To exactly recreate the trim of the roof within the sample [Environment Art - Constructing](https://www.roblox.com/games/14447826396/Environment-Art-Constructing) place file:

1. Add and configure the following **modular** assets for the top-most trim:

   <table>
   <thead>
   <tr>
   <th>Asset Name</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>ExtTrimBLong</td>
   <td>`-48, 37, 285`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimBLong</td>
   <td>`-8, 37, 285`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimBLong</td>
   <td>`-8, 37, 240`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimBLong</td>
   <td>`-8, 37, 195`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimBLong</td>
   <td>`-48, 37, 195`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimBLong</td>
   <td>`-89, 37, 195`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimBLong</td>
   <td>`-89, 37, 160`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimBLong</td>
   <td>`-88, 37, 125`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimBLong</td>
   <td>`-48, 37, 125`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimBLong</td>
   <td>`-8, 37, 125`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimBLong</td>
   <td>`-8, 37, 80`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimBLong</td>
   <td>`-8, 37, 35`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimBCorner</td>
   <td>`-8, 37, 285`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimBCorner</td>
   <td>`-8, 37, 195`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimBCorner</td>
   <td>`-8, 37, 125`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimBCorner</td>
   <td>`-8, 37, 35`</td>
   <td>`0, 90, 0`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Trim-1.jpg" width="100%"/>

2. Select these trim assets, then in the **Properties** window, set **Color** to **248, 248, 248**.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Trim-2.jpg" width="100%"/>

3. Add and configure the following **modular** assets for the bottom-most trim:

   <table>
   <thead>
   <tr>
   <th>Asset Name</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>ExtTrimALong</td>
   <td>`-48, 31, 285`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimALong</td>
   <td>`-8, 31, 285`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimAShort</td>
   <td>`-8, 31, 245`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimALong</td>
   <td>`-8, 31, 235`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimALong</td>
   <td>`-8, 31, 195`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimALong</td>
   <td>`-48, 31, 195`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimALong</td>
   <td>`-88, 31, 195`</td>
   <td>`-88, 31, 195`</td>
   </tr>
   <tr>
   <td>ExtTrimALong</td>
   <td>`-88, 31, 125`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimALong</td>
   <td>`-48, 31, 125`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimALong</td>
   <td>`-8, 31, 125`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimAShort</td>
   <td>`-8, 31, 85`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimALong</td>
   <td>`-8, 31, 75`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimALong</td>
   <td>`-8, 31, 35`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimBCorner</td>
   <td>`-8, 31, 285`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimBCorner</td>
   <td>`-8, 31, 195`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimBCorner</td>
   <td>`-8, 31, 125`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimBCorner</td>
   <td>`-8, 31, 35`</td>
   <td>`0, 90, 0`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Trim-3.jpg" width="100%"/>

4. Add and configure the following **modular** assets for the trim in the middle of the roof:

   <table>
   <thead>
   <tr>
   <th>Asset Name</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>ExtTrimAShort</td>
   <td>`-24, 26, 195`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimAMid</td>
   <td>`-24, 26, 194`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimALong</td>
   <td>`-24, 26, 179`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimAMid</td>
   <td>`-64, 26, 179`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimALong</td>
   <td>`-85, 26, 178`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimAMid</td>
   <td>`-84, 26, 141`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimALong</td>
   <td>`-64, 26, 141`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimAMid</td>
   <td>`-24, 26, 141`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimAShort</td>
   <td>`-24, 26, 126`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimACorner</td>
   <td>`-24, 26, 194`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimACorner</td>
   <td>`-24, 26, 179`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimACorner</td>
   <td>`-84, 26, 178`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimACorner</td>
   <td>`-84, 26, 142`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimACorner</td>
   <td>`-24, 26, 141`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>ExtTrimACorner</td>
   <td>`-24, 26, 126`</td>
   <td>`0, 90, 0`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Trim-4.jpg" width="100%"/>

5. Select these trim assets, then in the **Properties** window, set **Color** to **255, 170, 0**.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Trim-5.jpg" width="100%"/>

6. Anchor all of these trim assets.

  </TabItem>
</Tabs>

## Delete Excess Geometry

Now that your building is complete, it's time to delete the underlying greybox geometry and the baseplate. This process removes excess polygons that users will never see nor interact with, which quickly improves memory and performance for devices with memory and graphics processing unit (GPU) limitations. In addition, removing the baseplate also allows the building to float in the sky, which is good preparation for you to sculpt terrain for the outdoor space in the next section.

To delete excess geometry:

1. In the **Explorer** window, delete all greybox geometry from the first section of this tutorial.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/DeletingGeo-1.png" width="100%"/>

2. Delete the baseplate object.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/DeletingGeo-2.png" width="100%"/>

## Sculpt Terrain

Right now your environment is mostly architectural aside from foliage in your planters. However, following the sample art style from [Develop Polished Assets](../environmental-art/develop-polished-assets.md), the 3D space should contain a healthy mix of futuristic technology and lush greenery to inform users that the world values technological advances, but not at the expense of the earth.

Using the [Terrain Editor](../../parts/terrain.md), you can quickly generate and sculpt detailed and realistic terrain to bring organic life to the outdoor space. Because you set material overrides as you created your custom materials in [Assemble an Asset Library](../environmental-art/assemble-an-asset-library.md), you can also utilize your tileable textures through Terrain Editor brushes to add moss, flowers, and stone paths that are cohesive with the rest of your environment.

<Alert severity="info">
    Sculpting terrain is an art form, and it's difficult to exactly recreate brush strokes and subtle material edits. As long as your terrain meets the needs of your own experience, it's normal and expected for your environment to look and feel different from the sample laser tag environment.
</Alert>

<Tabs>
  <TabItem key = "1" label="Create Your Own">

To apply your own terrain to the outdoor area:

1. Open the **Terrain Editor**.

   1. In the menu bar, navigate to the **Model** tab.
   1. Click the **Editor** icon.

   <img src="../../assets/studio/general/Home-Tab-Terrain-Editor.png" width="100%" alt="Terrain Editor indicated in Home tab" />

1. Navigate to the **Edit** tab, then click the **Draw** button.
1. In the **Brush Settings** section, customize your brush according to the material you want to add to your map. For example, the sample starts this process with the settings in the following image.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Terrain-3.jpg" width="40%"/>

1. In the **Materials Settings** section, select a material for the **unplayable area**, such as water or cracked lava, then in the viewport, draw where you want your playable area to end. This material communicates where the map ends for the outdoor space.

   <video controls src="../../assets/tutorials/environmental-art-curriculum/Section4/Terrain-4.mp4" width="100%"></video>

1. Navigate back to the **Materials Settings** section, select a material for the **playable area**, such as grass, pavement, or wood planks, then in the viewport, draw where you want your playable area to start. This material communicates where the map starts for the outdoor space

   <video controls src="../../assets/tutorials/environmental-art-curriculum/Section4/Terrain-6.mp4" width="100%"></video>

1. Navigate back to the **Terrain Editor**, then select the **Paint** tool.
1. In the **Brush Settings** section, customize your brush according to the material you want to add to your map, and select a new material.
1. In the viewport, draw along the exterior lane. This material communicates the primary path players can take as they are navigating the outdoor space.

   <video controls src="../../assets/tutorials/environmental-art-curriculum/Section4/Terrain-9.mp4" width="100%"></video>

1. **(Optiona)** Add and configure any applicable props to the outdoor space for visual variation.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Terrain-10.jpg" width="100%"/>

  </TabItem>
  <TabItem key = "2" label="Recreate the Sample">

To recreate the terrain within the sample [Environment Art - Constructing](https://www.roblox.com/games/14447826396/Environment-Art-Constructing) place file:

1. Open the **Terrain Editor**.

   1. In the menu bar, navigate to the **Model** tab.
   1. Click the **Editor** icon.

   <img src="../../assets/studio/general/Home-Tab-Terrain-Editor.png" width="100%" alt="Terrain Editor indicated in Home tab" />

2. Navigate to the **Edit** tab, then click the **Draw** button.
3. In the **Brush Settings** section,

   1. Set **Brush Mode** to **Add**.
   1. Set the brush shape to the cylinder shape.
   1. Set **Base Size** to **16**.
   1. Set **Height** to **5**.
   1. Set **Pivot Position** to **Top**.
   1. Set **Plane Lock** to **Manual**.
   1. In the **Edit Plane** setting,
      1. Click the **Edit** button.
      1. Set **Position** to **0, -1, 0**.
      1. Click the **Apply** button.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Terrain-3.jpg" width="40%"/>

4. In the **Material Settings** section, select the **Water** material, then in the viewport, draw a crescent shaped pool around the building.

   <video controls src="../../assets/tutorials/environmental-art-curriculum/Section4/Terrain-4.mp4" width="100%"></video>

5. Navigate back to the Terrain Editor's **Brush Settings** section, then

   1. Set **Base Size** to **10**.
   1. Set **Height** to **10**.
   1. Set **Ignore Parts** to **True/Enabled**.
   1. In the **Edit Plane** setting,
      1. Click the **Edit** button.
      1. Set **Position** to **0, 0, 0**.
      1. Click the **Apply** button.

6. In the **Material Settings** section, select the **Slate** material, then in the viewport, draw another crescent shape that separates the pool from the architecture, and then a thin boundary around the outside of the pool.

   <video controls src="../../assets/tutorials/environmental-art-curriculum/Section4/Terrain-6.mp4" width="100%"></video>

7. Navigate back to the **Terrain Editor**, then select the **Paint** tool.
8. In the **Brush Settings** section,
   1. Set the brush shape to the cylinder shape.
   1. Set **Base Size** to **3**.
   1. Set **Pivot Position** to **Top**.
   1. Set **Plane Lock** to **Off**.
9. In the **Material Settings** section, alternate between your **Mud**, **Leafy Grass**, **Ground**, **Sand**, **Salt**, **Slate**, and **Snow** custom materials, then in the viewport, draw on the remaining area.

   <video controls src="../../assets/tutorials/environmental-art-curriculum/Section4/Terrain-9.mp4" width="100%"></video>

10. Using your asset library,

    1. Add a **FloatingIsland** asset with a `Class.CFrame.Position` of **201.726, -14.315, 183.5** for a spawn area users join before they separate into teams.
    1. Intersperse rock assets with varying `Class.MeshPart.Size` and `Class.CFrame.Orientation` values along the border of the playable area.
    1. Intersperse foliage assets around the outdoor space to add more organic life to the outdoor space.

    <img src="../../assets/tutorials/environmental-art-curriculum/Section4/Terrain-10.jpg" width="100%"/>

  </TabItem>
</Tabs>

## Contain the Playable Area

If you playtest your experience and navigate off the island, your character will fall until they reach the project's `Class.Workspace.FallenPartsDestroyHeight` and respawn back in your team's spawn zone. To ensure that users cannot fall off the island, or join the match too early from the floating area spawn zone before they separate into teams, you must contain the playable area with an invisible barrier.

The values in this section are highly dependent on the terrain within the final sample laser tag environment. It's recommended to playtest and verify that there are no gaps in the barrier according to the custom terrain within your own experience.

<Tabs>
  <TabItem key = "1" label="Create Your Own">

To contain the playable area in your experience:

1. Using **block** parts, surround the playable area in your outdoor area. It's important to ensure these parts are tall enough to block players from jumping over your barrier, and that there are no cracks they can slip through and fall off the edge of your map.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/ContainingPlayableArea-1.jpg" width="100%"/>

1. Select these parts, then in the **Properties** window,
   1. Set **Transparency** to **1**.
   1. Disable **CanCollide**.
   1. Enable **Anchored**.

  </TabItem>
  <TabItem key = "2" label="Recreate the Sample">

To exactly recreate the containment of the playable area within the sample [Environment Art - Constructing](https://www.roblox.com/games/14447826396/Environment-Art-Constructing) place file:

1. Add and configure the following **block** parts to surround the playable area. The top containment part in the following image is semi-transparent for visual reference.

   <table>
   <thead>
   <tr>
   <th>Size</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>`69, 71, 17`</td>
   <td>`12.5, 23, -47.5`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>`89, 71, 22`</td>
   <td>`39, 23, -18`</td>
   <td>`0, -45, 0`</td>
   </tr>
   <tr>
   <td>`83, 71, 22`</td>
   <td>`70.5, 23, 46`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>`54, 71, 42`</td>
   <td>`93, 23, 95`</td>
   <td>`0, -50, 0`</td>
   </tr>
   <tr>
   <td>`129, 71, 85`</td>
   <td>`137, 23, 179`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>`155, 71, 22`</td>
   <td>`55, 23, 292`</td>
   <td>`0, -135, 0`</td>
   </tr>
   <tr>
   <td>`29, 71, 22`</td>
   <td>`-7.5, 23, 337`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>`34, 71, 6`</td>
   <td>`182, 23, 165`</td>
   <td>`0, -135, 0`</td>
   </tr>
   <tr>
   <td>`34, 71, 6`</td>
   <td>`196.5, 23, 157`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>`34, 71, 6`</td>
   <td>`212.5, 23, 160`</td>
   <td>`0, 135, 0`</td>
   </tr>
   <tr>
   <td>`34, 71, 6`</td>
   <td>`224, 23, 181`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>`34, 71, 6`</td>
   <td>`216, 23, 198`</td>
   <td>`0, -135, 0`</td>
   </tr>
   <tr>
   <td>`34, 71, 6`</td>
   <td>`195, 23, 203`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>`34, 71, 6`</td>
   <td>`181, 23, 194`</td>
   <td>`0, 135, 0`</td>
   </tr>
   <tr>
   <td>`379, 32, 389`</td>
   <td>`41, 42, 153`</td>
   <td>`0, 180, 0`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/ContainingPlayableArea-1.jpg" width="100%"/>

2. Select these parts, then in the **Properties** window,
   1. Set **Transparency** to **1**.
   1. Disable **CanCollide**.
   1. Enable **Anchored**.

  </TabItem>
</Tabs>

## Configure Special Effects

Your building's architecture and outdoor space are nearly complete with assets from your asset library, but you may have noticed either consciously or unconsciously that the overall environment feels static. This is because realistic environments include movement from many different sources, whether that's from clouds crawling through the sky, wind brushing through greenery, or life forms navigating the space.

You can mimic realistic environments by configuring special effects that add dynamic movement to your environment, and provoke emotion from users. This process often makes worlds feel more alive, supporting a deep sense of immersion while people access your experience.

<video controls src="../../assets/tutorials/environmental-art-curriculum/Section4/SpecialEffects-Intro.mp4" width="100%"></video>

### Background Clouds

The first type of special effect the final sample laser tag environment uses to add movement to the 3D space is an effect called dynamic clouds. [Dynamic clouds](../../environment/clouds.md) are realistic clouds that drift slowly across the sky, and they are useful for creating movement that feels far away from the user while still present in the environment. You can adjust their appearance through the `Class.Clouds` object to create unique atmospheres, and customize their direction and speed through global wind.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/tutorials/environmental-art-curriculum/Section4/BackgroundClouds-Intro1.jpg" width="100%"/>
    <figcaption>Without dynamic clouds</figcaption>
  </figure>
  <figure>
    <img src="../../assets/tutorials/environmental-art-curriculum/Section4/BackgroundClouds-Intro2.jpg" width="100%"/>
    <figcaption>With default dynamic clouds</figcaption>
  </figure>
</GridContainer>

<Tabs>
  <TabItem key = "1" label="Create Your Own">

To add and configure your own dynamic clouds in the background:

1. In the **Explorer** window, add a **Clouds** object to the **Terrain** object.

   1. Hover over the **Terrain** object and click the **⊕** button. A contextual menu displays.
   1. From the contextual menu, insert a **Clouds** object.

      <img src="../../assets/tutorials/environmental-art-curriculum/Section4/BackgroundClouds-1.jpg" width="40%"/>

2. Select the **Clouds** object, then in the **Properties** window,

   1. Set **Cover** to a value between **0** (no clouds) and **1** (full cloud cover).
   1. Set **Density** to a value between **0** (light, translucent clouds) and **1** (heavy, dark clouds).
   1. Set **Color** to a material color of cloud particles according to the art style of your experience.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/BackgroundClouds-2.jpg" width="100%"/>

  </TabItem>
  <TabItem key = "2" label="Recreate the Sample">

To add and configure dynamic clouds in the background:

1. In the **Explorer** window, add a **Clouds object** to the **Terrain** object.

   1. Hover over the **Terrain** object and click the **⊕** button. A contextual menu displays.
   1. From the contextual menu, insert a **Clouds** object.

      <img src="../../assets/tutorials/environmental-art-curriculum/Section4/BackgroundClouds-1.jpg" width="40%"/>

2. Select the **Clouds** object, then in the **Properties** window,

   1. Set **Cover** to **0.625**.
   1. Set **Density** to **0.5**.
   1. Set **Color** to **143, 143, 143**.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/BackgroundClouds-2.jpg" width="100%"/>

  </TabItem>
</Tabs>

### Foreground Clouds

The second type of special effect the final sample laser tag environment uses to add movement to the 3D space is an effect called particle emitters. [Particle emitters](../../effects/particle-emitters.md) emit 2D images, or particles, that look and behave for the duration of their lifetime according to the particle emitter's set properties, and they are useful for creating movement that feels and often is close to the user.

Particle emitters have many properties you can adjust to achieve both subtle and bold effects. The following instructions show you how to exactly recreate the foreground clouds within the sample [Environment Art - Constructing](https://www.roblox.com/games/14447826396/Environment-Art-Constructing) place file, but you can modify any property for the needs of your own experience. It's recommended to keep these clouds large and with a gentle motion between the gameplay space and the static background.

To add and configure foreground clouds:

1. Add a **block** part to a position where you want users to see a floating cloud.
2. Select this **block** part, then in the **Properties** window,
   1. Set **Transparency** to **1**.
   1. Disable **CanCollide**.
   1. Enable **Anchored**.
3. Create a particle emitter within this part.
   1. In the **Explorer** window, hover over the **block** part and click the **⊕** button. A contextual menu displays.
   1. From the contextual menu, insert a **ParticleEmitter**. The particle emitter immediately emits particles within the part's area.
4. Select this particle emitter, then in the **Properties** window,

   1. Set **Color** to a color sequence that looks like the following image.

      <img src="../../assets/tutorials/environmental-art-curriculum/Section4/ForegroundClouds-4a.png" width="100%"/>

   1. Set **LightEmission** to **0.3** to blend the colors of the texture and its environment.
   1. Set **LightInfluence** to **0.2** to allow environment light to have a subtle effect on the color of particles.
   1. Set **Orientation** to **FacingCameraWorldUp** so particles always emit up toward the sky.
   1. Set **Size** to **100** to create large clouds.
   1. Set **Squash** to **-0.25** to shrink particles horizontally.
   1. Set **Texture** to an image of a cloud. The sample uses **rbxassetid://10714362544**.
   1. Set **Transparency** to a number sequence that looks like the following image.

      <img src="../../assets/tutorials/environmental-art-curriculum/Section4/ForegroundClouds-4b.png" width="100%"/>

   1. Set **Lifetime** to **30** to fade out particles at 30 seconds.
   1. Set **Rate** to **0.25** to emit particles slowly.
   1. Set **Acceleration** to **0, -0.8, 0** to impact particle speed over their lifetime.
   1. Set **Drag** to **0.1** to make particles look their speed over time.
   1. Enable **LockedToPart** to keep particles close to the particle emitter.

   <video controls src="../../assets/tutorials/environmental-art-curriculum/Section4/CloudVid1.mp4" width="100%"></video>

5. Repeat this process, moving cloud particle emitters throughout the environment.

In addition, you can layer multiple particle emitters together to give clouds more depth. For example, in the final sample laser tag environment, foreground clouds layer an additional particle emitter with a **Color** property of **248, 248, 248**, **Texture** property of **rbxassetid://10714433747**, and a **Rate** property of **0.1**. You can find both of these particle emitters in the sample [Environment Art Asset Library](https://www.roblox.com/library/14447738661/Environment-Art-Asset-Library).

<video controls src="../../assets/tutorials/environmental-art-curriculum/Section4/CloudVid2.mp4" width="100%"></video>

<img src="../../assets/tutorials/environmental-art-curriculum/Section4/ForegroundClouds-5.jpg" width="100%"/>

### Dust Particles

Particle emitters are such a versatile type of special effect because they offer so many properties you can customize to create interesting visual effects, such as glowing portals, green billowing smoke, or vibrant explosions. The final sample laser tag environment uses particle emitters again in this section to create floating dust particles that surround the user as they navigate the outdoor space.

Similar to the foreground clouds steps, the following instructions show you how to exactly recreate the dust particles within the sample [Environment Art - Constructing](https://www.roblox.com/games/14447826396/Environment-Art-Constructing) place file, but you can modify any property for the needs of your own experience. It's recommended to keep particle speed slow to only provide micro motion within the environment.

To add and configure dust particles for the outdoor space:

1. Add a **block** part to the environment that covers the entire island.
2. Select this **block** part, then in the **Properties** window,
   1. Set **Transparency** to **1**.
   1. Disable **CanCollide**.
   1. Enable **Anchored**.
3. Create a particle emitter within this part.
   1. In the **Explorer** window, hover over the **block** part and click the **⊕** button. A contextual menu displays.
   1. From the contextual menu, insert a **ParticleEmitter**. The particle emitter immediately emits particles within the part's area.
4. Select this particle emitter, then in the **Properties** window,

   1. Set **Color** to **192, 241, 255** to give the particles a light blue hue.
   1. Set **Size** to a number sequence that looks like the following image.

      <img src="../../assets/tutorials/environmental-art-curriculum/Section4/DustParticles-4b.png" width="100%"/>

   1. Set **Texture** to a dust mote image. The sample uses **rbxassetid://14302399641**.
   1. Set **Transparency** to a number sequence that looks like the following image.

      <img src="../../assets/tutorials/environmental-art-curriculum/Section4/DustParticles-4d.png" width="100%"/>

   1. Set **ZOffset** to **-5** to move particles away from the camera.
   1. Set **Lifetime** to **1, 10** to set the minimum and maximum age of a particle to 1 and 10 seconds, respectively.
   1. Set **Rate** to **50000** to create many particles for your environment.
   1. Set **RotSpeed** to **-60** to create a range of speeds for newly emitted particles.
   1. Set **Speed** to **1, 5** to set the minimum and maximum speed of a particle to 1 and 5 studs per second, respectively.
   1. Set **Acceleration** to **1, -1, 1** to impact particle speed over its lifetime.
   1. Enable **LockedToPart** to keep particles close to the particle emitter.

   <video controls src="../../assets/tutorials/environmental-art-curriculum/Section4/DustParticlesVid-1.mp4" width="100%"></video>

## Configure Lighting Sources

Now that your environment has movement, the final step in constructing your environment is to configure lighting sources. Studio offers two high-level types of lighting sources:

- **Global lighting** - Produces lighting for the entire outdoor environment.
- **Local lighting** - Produces lighting around where you place them within your experience.

Both lighting sources are important to consider because your experience has both an indoor and outdoor environment that impact the user's ability to see what is happening around them while they're in combat.

### Global Lighting

Global lighting is the luminescence from either the sun or moon in an experience. By adjusting a couple of key default properties in the `Class.Lighting` service, you can dramatically change how that light appears to users, as well as how it interacts with any other object you place in the experience.

Studio begins every experience with the `Enum.Technology.ShadowMap` lighting system, ensuring that the global lighting has precise shadows and illumination. However, to enhance the environment and equip your local light sources to also produce precise shadows and illumination, such as the lighting in the hallways and above the signage, you must enable the `Enum.Technology.Future` lighting system directly in Studio. This allows both your global and local lighting to work together and provide more realistic and immersive visuals.

For example, the `Enum.Technology.Future` lighting system automatically detects when a user is either in an interior or exterior space, then it responds by enabling the appropriate lighting model. This means that reflections are able to reflect off the floor and ceiling within the building, providing a richer visual experience as users navigate through combat pockets.

<Tabs>
  <TabItem key = "1" label="Create Your Own">

To configure your own global lighting:

1. In the **Explorer** window, select the **Lighting** service, then in the **Properties** window, set its properties to values that reflect the art style of your experience. For more information on these properties, see [Global Lighting](../../environment/lighting.md).

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/GlobalLighting-1.jpg" width="100%"/>

1. In the **Explorer** window, select the **Lighting** service's child **Atmosphere** object, then in the **Properties** window, set its properties to values that reflect the art style of your experience. For more information on these properties, see [Atmospheric Effects](../../environment/atmosphere.md).

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/GlobalLighting-2.jpg" width="100%"/>

1. **(Optional)** Apply one or more customizable filters, such as bloom, depth‑of‑field, or sun rays. For more information on these properties, see [Post-Processing Effects](../../environment/post-processing-effects.md).

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/GlobalLighting-4.jpg" width="100%"/>

  </TabItem>
  <TabItem key = "2" label="Recreate the Sample">

To exactly recreate the global lighting configuration within the sample [Environment Art - Constructing](https://www.roblox.com/games/14447826396/Environment-Art-Constructing) place file:

1. In the **Explorer** window, select the **Lighting** service, then in the **Properties** window,

   1. Set **Ambient** to **26, 34, 36**.
   1. Set **OutdoorAmbient** to **26, 34, 36**.
   1. Set **ShadowSoftness** to **0.15**.
   1. Set **Technology** to **Future**.
   1. Set **GeographicLatitude** to **-18**.
   1. Set **TimeOfDay** to **-15:16:23**.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/GlobalLighting-1.jpg" width="100%"/>

2. In the **Explorer** window, select the **Lighting** service's child **Atmosphere** object, then in the **Properties** window,

   1. Set **Density** to **0.285**.
   1. Set **Offset** to **0.65**.
   1. Set **Decay** to **254, 254, 254**.
   1. Set **Glare** to **0.3**.
   1. Set **Haze** to **2**.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/GlobalLighting-2.jpg" width="100%"/>

3. In the **Explorer** window, select the **Lighting** service's child **Bloom** object, then in the **Properties** window,

   1. Set **Intensity** to **1.5**.
   1. Set **Size** to **56**.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/GlobalLighting-3.jpg" width="100%"/>

4. In the **Explorer** window, select the **Lighting** service's child **DepthOfField** object, then in the **Properties** window, set **FarIntensity** to **0.05**.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/GlobalLighting-4.jpg" width="100%"/>

  </TabItem>
</Tabs>

### Local Lighting

Local lighting is the luminescence from local [light sources](../../effects/light-sources.md) in your experience, such as `Class.SpotLight`, `Class.SurfaceLight`, and `Class.PointLight` objects. It's important to analyze the needs of your experience to know which type of local light source to use. For example, the final sample laser tag environment needs lighting to help users see the different areas inside of the building while they're in combat, as well as lighting to differentiate the different spawn zone areas.

Local light sources create points of reference and directionality for users. For example, the sample uses surface lights to inform users if they are navigating the perimeter or are near the blue-green or pink spawn zone, and spotlights to highlight doorways.

<img src="../../assets/tutorials/environmental-art-curriculum/Section4/LocalLighting-Intro.jpg" width="100%"/>

<Alert severity="info">
    Applying light sources is an art form, and it takes time to figure out what lighting configurations work to meet the needs of your experience. It's normal and expected for your lighting to look and feel different from the final sample laser tag environment.
</Alert>

<Tabs>
  <TabItem key = "1" label="Create Your Own">

To configure your own local lighting:

1. Add and configure glowing lights around the perimeter hallways that provide orientation cues to users navigating around the building.

   1. Add and position a **block** part near the top of one of your perimeter hallways, then in the **Properties** window,
      1. Set **Color** to a bright color.
      1. Set **Material** to **Neon**.
      1. Enable **Anchored**.
   1. In the **Explorer** window, add a **SurfaceLight** object to the part.
      1. Hover over the part and click the **⊕** button. A contextual menu displays.
      1. From the contextual menu, insert a **SurfaceLight** object.
   1. Select the **SurfaceLight** object, then in the **Properties** window,
      1. Set **Color** to a bright color.
      1. Set **Face** to the direction you want the light to shine.
      1. Set **Range** to a value that reflects how far you want your light to reach.
   1. Repeat this process, positioning and orienting parts to complete the glowing perimeter lights.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/LocalLighting-1.jpg" width="100%"/>

1. Add and configure small hallway interior lights that illuminate cross lanes.

   1. Add and position a **block** part near the top of one of your cross lane hallways, then in the **Properties** window,
      1. Set **Color** to a bright color.
      1. Set **Material** to **Neon**.
      1. Enable **Anchored**.
   1. In the **Explorer** window, add a **SpotLight** object to the part.
      1. Hover over the part and click the **⊕** button. A contextual menu displays.
      1. From the contextual menu, insert a **SpotLight** object.
   1. Select the **SpotLight** object, then in the **Properties** window,
      1. Set **Angle** to a value that reflects the angle you want your light to shine.
      1. Set **Face** to the direction you want the light to shine.
      1. Set **Range** to a value that reflects how far you want your light to reach.
   1. Repeat this process, positioning and orienting parts above doors and hallways until you are happy with the interior lighting.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/LocalLighting-2.jpg" width="100%"/>

1. Add and configure the spawn zone lights.

   1. Add a **block** part that is the size of your left spawn zone, and position it above the spawn zone's ceiling.
   1. In the **Properties** window,
      1. Set **Color** to the color theme of the team on the left of the map.
      1. Set **Material** to **Neon**.
      1. Enable **Anchored**.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/LocalLighting-3a.jpg" width="100%"/>

   1. Repeat this process for the right spawn zone.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/LocalLighting-3B.jpg" width="100%"/>

   1. **(Optional)** Add and anchor light fixtures around the interior and exterior of the building from your own asset library.

  </TabItem>
  <TabItem key = "2" label="Recreate the Sample">

To exactly recreate the local lighting configuration within the sample [Environment Art - Constructing](https://www.roblox.com/games/14447826396/Environment-Art-Constructing) place file:

1. Add and configure the glowing perimeter lights.

   1. Add a **block** part for one of the glowing perimeter lights, then in the **Properties** window,
      1. Set **Color** to **199, 166, 147**
      1. Set **Material** to **Neon**.
      1. Set **Size** to **89.254, 1, 1**.
      1. Set **CFrame.Position** to **-78.297, 21, 293.439**.
      1. Enable **Anchored**.
   1. In the **Explorer** window, add a **SurfaceLight** object to the part.
      1. Hover over the **block** part and click the **⊕** button. A contextual menu displays.
      1. From the contextual menu, insert a **SurfaceLight** object.
   1. Select the **SurfaceLight** object, then in the **Properties** window,
      1. Set **Color** to **211, 190, 150**.
      1. Set **Face** to **Bottom**.
      1. Set **Range** to **21**.
   1. Repeat this process, positioning and orienting parts to complete the glowing perimeter lights.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/LocalLighting-1.jpg" width="100%"/>

2. Add and configure the small hallway interior lights.

   1. Add a **block** part for one of the small hallway interior lights, then in the **Properties** window,
      1. Set **Color** to **163, 162, 165**.
      1. Set **Material** to **Neon**.
      1. Set **Size** to **0.25, 0.25, 1**.
      1. Set **CFrame.Position** to **-53.962, 19.936, 291.932**.
      1. Enable **Anchored**.
   1. In the **Explorer** window, add a **SpotLight** object to the part.
      1. Hover over the **block** part and click the **⊕** button. A contextual menu displays.
      1. From the contextual menu, insert a **SpotLight** object.
   1. Select the **SpotLight** object, then in the **Properties** window,
      1. Set **Angle** to **135**.
      1. Set **Face** to **Bottom**.
      1. Set **Range** to **20**.
   1. Repeat this process, positioning and orienting parts above doors and hallways until you are happy with the interior lighting.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/LocalLighting-2.jpg" width="100%"/>

3. Add and configure the spawn zone lights.

   1. Add a **block** part for the left spawn zone, then in the **Properties** window,

      1. Set **Color** to **88, 218, 171**.
      1. Set **Material** to **Neon**.
      1. Set **Size** to **62.5, 1, 37.5**.
      1. Set **CFrame.Position** to **-77, 20.6, 321**.
      1. Enable **Anchored**.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/LocalLighting-3a.jpg" width="100%"/>

   1. Add a **block** part for the right spawn zone, then in the **Properties** window,
      1. Set **Color** to **255, 170, 255**.
      1. Set **Material** to **Neon**.
      1. Set **Size** to **62.5, 1, 37.5**.
      1. Set **CFrame.Position** to **-77, 20.6, 1**.
      1. Enable **Anchored**.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section4/LocalLighting-3B.jpg" width="100%"/>

4. **(Optional)** Using the sample [Environment Art Asset Library](https://www.roblox.com/library/14447738661/Environment-Art-Asset-Library), add and anchor light fixtures around the interior and exterior of the building. For example, the final sample laser tag environment uses **LightFixtureTall**, **LightFixtureShort**, **TouchScreenA**, and **Roblox Sign** lighting fixtures to complete the environment.

  </TabItem>
</Tabs>

<img src="../../assets/tutorials/environmental-art-curriculum/Section4/LocalLighting-4.jpg" width="100%"/>

Once you are happy with the look and feel of your environment, you can move on to configure your assets and Studio settings to keep your frame rate and performance levels high for low-end devices. This process ensures that nearly every user has the same gameplay and visual experience while they're viewing your environment.
