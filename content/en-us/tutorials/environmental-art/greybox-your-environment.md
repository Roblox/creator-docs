---
title: Greybox Your Environment
description: Explains how to greybox the laser tag environment using basic parts.
next: /tutorials/environmental-art/develop-polished-assets
prev: /tutorials/environmental-art/
---

<iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/mW2IptQVeL0?si=RbvxFyCI1iYVc-hk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<br/>

**Greyboxing your environment**, also known as massing out or blocking your environment, is the process of adding simple shapes to the 3D space to figure out how users will experience gameplay before investing time into polishing assets. This process is crucial for finding issues in the layout of playable areas, such as difficult regions to traverse, unfair advantages from certain vantage points, or assets with disproportionate scale to the user's character.

Using the [Environment Art - Greyboxing](https://www.roblox.com/games/14447721254/Environment-Art-Greyboxing) `.rbxl` file as a reference, this section of the environmental art curriculum shows you how to greybox a standard three lane map layout for a team-based first-person laser tag shooter experience, including step-by-step instructions on:

- Creating playable areas that encourage strategic combat for multiple playstyles.
- Applying placeholder materials that help inform users of their position and orientation.
- Testing the layout to ensure it's fun and doesn't include playability issues.

After you complete this section, you will learn how to develop high-quality assets to replace or convert the greybox environment, and meet your experience's game design requirements.

<img src="../../assets/tutorials/environmental-art-curriculum/Section1/PlaceholderMaterials.jpg" width="100%"/>

## Three Lane Map Layout

The **three lane map layout** is a first-person shooter map layout that includes a spawn zone for each team on opposite sides of the map, three primary lanes that each team can use to travel to either spawn zone, and cross lanes that allow for users to travel from one primary lane to another. This type of map layout is a common layout for first-person shooter experiences because it quickly places users into combat zones as soon as they join a match, and it allows for a variety of playstyles depending on which primary lane users choose to follow.

The following sections explain each component of the three lane map layout, including considerations of how each component works together to create intentional gameplay interactions within first-person shooter experiences.

### Spawn Zones

**Spawn zones** are areas of the map where users either join their team at the start of a match, or rejoin the gameplay after their health reaches zero. At minimum, each team needs to have a central spawn zone when users first join the experience. Many developers place these central spawn zones at opposite ends of their maps to allow users time to navigate the experience at the start of the match before seeing the enemy team.

<img src="../../assets/tutorials/environmental-art-curriculum/Section1/ThreeLaneLayout-SpawnZones.jpg" width="100%"/>

In addition, many team-based first-person shooter experiences also include spawn zones throughout the map that users can randomly respawn at once their health reaches zero. The placement of these decentralized spawn zones can significantly increase the experience's difficulty, especially when you place spawn zones near areas with heavy combat. To keep the gameplay simple, the sample laser tag greybox environment only includes one central spawn zone for each team.

### Primary Lanes

**Primary lanes** are paths that extend the length of the map from one spawn zone to another. The three lane map layout includes three primary lanes, and how developers conceptualize them is often dependent on the overall environmental context of the experience. For example, because the sample laser tag map has both an indoor and outdoor environment, the names of the primary lanes are as follows:

- **Interior** - The innermost lane that's furthest from the entrance of the building.
- **Middle** - The lane that's in-between the interior and exterior primary lanes.
- **Exterior** - The lane closest to the entrance of the building that's partially indoors and outdoors.

For most first-person shooter experiences using the three lane map layout, the middle primary lane intersects with areas of the map that contain the most combat because users traveling the middle primary lane can be attacked from both the interior or exterior primary lanes, while users traveling the interior or exterior primary lanes can only be attacked from the middle primary lane.

<img src="../../assets/tutorials/environmental-art-curriculum/Section1/ThreeLaneLayout-PrimaryLanes.jpg" width="100%"/>

### Cross Lanes

**Cross lanes** are paths that intersect all of the primary lanes, extending from the interior to the exterior primary lane. These are the paths that users can use to travel from one primary lane to another, and they often contain minimal obstructions to help users take cover from enemy fire. This is because coverless zones create transitory spaces that encourage users to not stay in one place for too long without it being dangerous.

<img src="../../assets/tutorials/environmental-art-curriculum/Section1/ThreeLaneLayout-CrossLanes.jpg" width="100%"/>

Similar to the reason why the most combat occurs around the middle primary lane, areas where cross lanes intersect with the middle primary lane, or **combat pockets**, contain the most combat because they allow users traveling from the interior or exterior lanes to access and shoot into the middle lane, and users traveling the middle lane can shoot in the direction of either the interior or exterior lane.

<img src="../../assets/tutorials/environmental-art-curriculum/Section1/ThreeLaneLayout-IntersectingPoints.jpg" width="100%"/>

Building a three lane map layout with these combat pockets in mind allows you to segment the distance from spawn zones, and create intentional spaces where users have to interact with each other. This encourages users to engage in rapid gameplay and quickly become familiar with the map as they jump between primary lanes using cross lanes.

## Create Playable Areas

Now that you are familiar with three lane map layouts, it's time to learn how to create the playable areas for the sample laser tag greybox environment that follows a three lane map layout. As you follow these instructions that exactly recreate the geometry within the sample [Environment Art - Greyboxing](https://www.roblox.com/games/14447721254/Environment-Art-Greyboxing) `.rbxl` file, you will start to see how it all works together to make up two spawn zones, three primary lanes, and five cross lanes that mirror across the middle of the map when you look at it from a top-down view.

<img src="../../assets/tutorials/environmental-art-curriculum/Section1/CreatingPlayableAreas-Intro1.jpg" width="100%"/>

<Alert severity="info">
    The following instructions provide two different instructional paths: you can either insert parts to represent your own unique laser tag environment, or you can insert parts in a way that exactly recreates the greybox environment within the sample [Environment Art - Greyboxing](https://www.roblox.com/games/14447721254/Environment-Art-Greyboxing) place file.
</Alert>

If you adjust the geometry to meet the specifications of your own experience, note that the sample file keeps every doorway and hallway at least 10 studs wide, and every wall at least 10 studs tall. These parameters ensure that two users are able to pass through hallways and doorways concurrently, no one is able to jump over walls with Roblox's default jump height of 5 studs, and that the camera can safely maneuver the map without interfering with geometry.

<img src="../../assets/tutorials/environmental-art-curriculum/Section1/CreatingPlayableAreas-Intro2.png" width="60%"/>

### Floor Geometry

The first step in creating the laser tag greybox environment is to create the geometry for each of the following floors:

- **Main Floor** – Spans the length of one spawn zone to another.
- **Mezzanine Floor** – Spans half of the middle combat pocket, and provides a rise in elevation.
- **Outdoor Floor** – Spans the outdoor space, and provides a drop in elevation.

To help visualize the geometry of each floor you are creating for the experience, reference the following image that marks the main floor in yellow, the mezzanine floor in red, and the outdoor floor in blue.

<img src="../../assets/tutorials/environmental-art-curriculum/Section1/Floor-Intro.jpg" width="100%"/>

It's important to have spaces in the experience with peaks and valleys because it allows you to control sight lines and engagement distances throughout the experience outside of horizontal movement. For example, if the entire playable space was a single floor with no change in elevation, every user would be able to interact with each other as long as there wasn't a wall in the way, meaning there is little ability for the user to develop a strategy outside of not being seen from other users. However, with peaks and valleys, you can decide where users can see each other.

In addition, a rise in elevation creates both a physical and emotional sense of ascension, allowing users with a high ground to have a bird's eye view of the battlefield in order to get a better sense of where to travel next. When they're ready to move on, the drop in elevation creates both a physical and emotional sense of descension, pushing users to make quick decisions to maneuver around enemy lines of sight and achieve their goals.

<Tabs>
  <TabItem key = "1" label="Create Your Own">

To create your own floor geometry:

1. Open Roblox Studio with a **Baseplate** template.
1. In the menu bar, navigate to the **Model** tab, then in the **Snap to Grid** section,

   1. Set **Rotate** to **90**.
   1. Set **Move** to **5 studs**. This allows you to equally position all greybox geometry on or away from each other in 5 stud increments.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section1/SnapToGrid.jpg" width="60%"/>

1. Using **block** parts, create symmetrical left and right surfaces for the **main floor** of your building. This geometry represents the length of your playable interior, and its symmetry denotes the center of the map.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section1/GeneralFloor-1.jpg" width="100%"/>

1. Using **block** parts, create symmetrical left and right surfaces for the **mezzanine floor** of your building. This geometry represents the highest ground on the map.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section1/Floor-3.jpg" width="100%"/>

1. Using **wedge** parts, create a **rise in elevation** between the main and mezzanine floors. This geometry breaks the lines of sight for players traveling the interior primary lane, or the cross lane in the middle of the map.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section1/Floor-4.jpg" width="100%"/>

1. Using **wedge** parts, create a **drop in elevation** between the main and outdoor floor. This geometry is your exterior primary lane, and it descends to the lowest point on the map.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section1/Floor-5.jpg" width="100%"/>

1. Anchor all of your parts.

  </TabItem>
  <TabItem key = "2" label="Recreate the Sample">

To exactly recreate the floor geometry within the sample [Environment Art - Greyboxing](https://www.roblox.com/games/14447721254/Environment-Art-Greyboxing) place file:

1. Open Roblox Studio with a **Baseplate** template.
1. In the menu bar, navigate to the **Model** tab, then in the **Snap to Grid** section,

   1. Set **Rotate** to **90**.
   1. Set **Move** to **5 studs**. This allows you to equally position all greybox geometry on or away from each other in 5 stud increments.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section1/SnapToGrid.jpg" width="60%"/>

1. Add and configure a **block** part for the left-side surface of the **main floor**. You can use this same process for each step as you create all of the playable areas.

   1. In the menu bar, select the **Model** tab.
   1. In the **Parts** section, click the dropdown arrow and select **Block**. A block part displays in the viewport.

      <img src="../../assets/studio/general/Model-Tab-Part-Tools.png" width="100%" alt="Part menu indicated in Model tab" />

   1. In the **Explorer** window, select the block, then in the **Properties** window,
      1. Set **Size** to **105, 1, 185**.
      1. Set **CFrame.Position** to **-77.5, 4.5, 252.5**.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section1/Floor-1.jpg" width="100%"/>

1. Add and configure the following **block** parts for the **main floor**:

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
   <td>Right-side floor</td>
   <td>`105, 1, 185`</td>
   <td>`-77.5, 4.5, 67.5`</td>
   </tr>
   <tr>
   <td>Middle left-side floor</td>
   <td>`20, 10, 50`</td>
   <td>`-15, 0, 185`</td>
   </tr>
   <tr>
   <td>Middle right-side floor</td>
   <td>`20, 10, 50`</td>
   <td>`-15, 0, 135`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section1/Floor-2.jpg" width="100%"/>

1. Add and configure the following **block** parts for the **mezzanine floor**:

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
   <td>Left-side floor</td>
   <td>`70, 5, 35`</td>
   <td>`-110, 7.5, 177.5`</td>
   </tr>
   <tr>
   <td>Right-side floor</td>
   <td>`70, 5, 35`</td>
   <td>`-110, 7.5, 142.5`</td>
   </tr>
   <tr>
   <td>Left-side ledge</td>
   <td>`10, 5, 10`</td>
   <td>`-70, 7.5, 165`</td>
   </tr>
   <tr>
   <td>Right-side ledge</td>
   <td>`10, 5, 10`</td>
   <td>`-70, 7.5, 155`</td>
   </tr>
   <tr>
   <td>Ledge wall</td>
   <td>`1, 3, 20`</td>
   <td>`-65.5, 11.5, 160`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section1/Floor-3.jpg" width="100%"/>

1. Add and configure the following **wedge** parts for the **rise in elevation** between the main and mezzanine floor:

   <table>
   <thead>
   <tr>
   <th>Part</th>
   <th>Size</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>Left-side elevation</td>
   <td>`15, 5, 10`</td>
   <td>`-102.5, 7.5, 200`</td>
   <td>`0, 180, 0`</td>
   </tr>
   <tr>
   <td>Right-side elevation</td>
   <td>`15, 5, 10`</td>
   <td>`-102.5, 7.5, 120`</td>
   <td>`0, 0, 0`</td>
   </tr>
   <tr>
   <td>Middle left-side elevation</td>
   <td>`15, 5, 10`</td>
   <td>`-70, 7.5, 177.5`</td>
   <td>`0, -90, 0`</td>
   </tr>
   <tr>
   <td>Middle right-side elevation</td>
   <td>`15, 5, 10`</td>
   <td>`-70, 7.5, 142.5`</td>
   <td>`0, -90, 0`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section1/Floor-4.jpg" width="100%"/>

1. Add and configure the following **wedge** part for the **drop in elevation** between the main and outdoor floor with a **Size** of `270, 11, 45`, **CFrame.Position** of `-2.5, -0.5, 160`, and a **CFrame.Orientation** of `0, -90, 0`.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section1/Floor-5.jpg" width="100%"/>

1. Anchor all of these floor parts.

  </TabItem>
</Tabs>

### Perimeter Wall Geometry

The second step in creating the laser tag greybox environment is to create the geometry for perimeter walls of the building. This provides boundaries for the interior gameplay of the experience, as well as guidance to users on where they can go to engage with one another.

To help visualize the geometry of the perimeter walls of the building you are creating for the experience, reference the following image that marks them in yellow.

<img src="../../assets/tutorials/environmental-art-curriculum/Section1/Perimeter-Intro.jpg" width="100%"/>

<Tabs>
  <TabItem key = "1" label="Create Your Own">

To create your own perimeter wall geometry:

1. Using **block** parts, create a **perimeter boundary** around your main floor except for the edge that opens to the exterior primary lane. This geometry prevents players from leaving your playable area while allowing them to enter and exit the building.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section1/GeneralPerimeter-1.jpg" width="100%"/>

1. Anchor these parts.

  </TabItem>
  <TabItem key = "2" label="Recreate the Sample">

To exactly recreate the perimeter wall geometry within the sample [Environment Art - Greyboxing](https://www.roblox.com/games/14447721254/Environment-Art-Greyboxing) place file:

1. Add and configure the following **block** parts for the **top** perimeter walls:

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
   <td>Top-left wall</td>
   <td>`30, 30, 185`</td>
   <td>`-140, 20, 282.5`</td>
   </tr>
   <tr>
   <td>Top-middle wall</td>
   <td>`10, 30, 60`</td>
   <td>`-150, 20, 160`</td>
   </tr>
   <tr>
   <td>Top-right wall</td>
   <td>`30, 30, 185`</td>
   <td>`-140, 20, 37.5`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section1/Perimeter-1.jpg" width="100%"/>

1. Add and configure the following **block** parts for the **side** perimeter walls:

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
   <td>Left wall</td>
   <td>`105, 30, 35`</td>
   <td>`-72.5, 20, 357.5`</td>
   </tr>
   <tr>
   <td>Right wall</td>
   <td>`105, 30, 35`</td>
   <td>`-72.5, 20, -37.5`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section1/Perimeter-2.jpg" width="100%"/>

1. Add and configure the following **block** parts for the **bottom left** perimeter walls:

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
   <td>Left wall</td>
   <td>`20, 20, 40`</td>
   <td>`-34, 15, 320`</td>
   </tr>
   <tr>
   <td>Middle wall</td>
   <td>`12, 45, 15`</td>
   <td>`-29, 24.5, 297.5`</td>
   </tr>
   <tr>
   <td>Right wall</td>
   <td>`5, 35, 5`</td>
   <td>`-27.5, 19.5, 287.5`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section1/Perimeter-3.jpg" width="100%"/>

1. Add and configure the following **block** parts for the **bottom right** perimeter walls:

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
   <td>Left wall</td>
   <td>`5, 35, 5`</td>
   <td>`-27.5, 19.5, 32.5`</td>
   </tr>
   <tr>
   <td>Middle wall</td>
   <td>`12, 45, 15`</td>
   <td>`-29, 24.5, 22.5`</td>
   </tr>
   <tr>
   <td>Right wall</td>
   <td>`20, 20, 40`</td>
   <td>`-35, 15, 0`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section1/Perimeter-4.jpg" width="100%"/>

1. Anchor all of these perimeter wall parts.

  </TabItem>
</Tabs>

### Spawn Zone Geometry

The third step in creating the laser tag greybox environment is to create the geometry to contain each team's spawn zone. For experiences that only contain centralized spawn zones, sectioning them off into their own rooms lets users acclimate to the experience when they first join the match, and it provides them cover from enemy fire when they rejoin the match after their health reaches zero.

There are two spawn zones in the [Environment Art - Greyboxing](https://www.roblox.com/games/14447721254/Environment-Art-Greyboxing) `.rbxl` file, one for each team a user can join, and they're located at opposite ends of the map. Each spawn zone has two exit points users can choose to enter the main gameplay area, which allows for quick access to two primary lanes, and provides cover from enemy fire from users within the cross lane near the spawn zone. Having two exit points is important because a single exit point would result in a bottleneck of users trying to enter or exit the spawn zone, and three spawn zones wouldn't provide enough cover from enemy fire after the start of the match.

<img src="../../assets/tutorials/environmental-art-curriculum/Section1/SpawnZone-ExitPoints.jpg" width="60%"/>

To help visualize the geometry of the spawn zone areas you are creating for the experience, reference the following image that marks them in yellow.

<img src="../../assets/tutorials/environmental-art-curriculum/Section1/SpawnZone-Intro.jpg" width="100%"/>

<Tabs>
  <TabItem key = "1" label="Create Your Own">

To create your own spawn zone geometry:

1. Using **block** parts, segment symmetrical sections on the far left and right of the map for each team's **spawn zon**e with two exit points.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section1/GeneralSpawnZone-1.jpg" width="100%"/>

1. Anchor these parts.

  </TabItem>
  <TabItem key = "2" label="Recreate the Sample">

To exactly recreate the spawn zone geometry within the sample [Environment Art - Greyboxing](https://www.roblox.com/games/14447721254/Environment-Art-Greyboxing) place file:

1. Add and configure the following **block** parts for the additional **spawn zone walls**:

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
   <td>Left spawn zone wall</td>
   <td>`15, 15, 45`</td>
   <td>`-117.5, 12.5, 317.5`</td>
   </tr>
   <tr>
   <td>Right spawn zone wall</td>
   <td>`15, 15, 45`</td>
   <td>`-117.5, 12.5, 2.5`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section1/SpawnZone-1.jpg" width="100%"/>

1. Add and configure the following **block** parts for the left spawn zone's **doorways**:

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
   <td>Left spawn, top wall</td>
   <td>`10, 15, 5`</td>
   <td>`-105, 12.5, 297.5`</td>
   </tr>
   <tr>
   <td>Left spawn, top door</td>
   <td>`10, 5, 5`</td>
   <td>`-95, 17.5, 297.5`</td>
   </tr>
   <tr>
   <td>Left spawn, middle wall</td>
   <td>`25, 15, 5`</td>
   <td>`-77.5, 12.5, 297.5`</td>
   </tr>
   <tr>
   <td>Left spawn, bottom door</td>
   <td>`10, 5, 5`</td>
   <td>`-60, 17.5, 297.5`</td>
   </tr>
   <tr>
   <td>Left spawn, bottom wall</td>
   <td>`20, 15, 5`</td>
   <td>`-45, 12.5, 297.5`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section1/SpawnZone-2.jpg" width="100%"/>

1. Add and configure the following **block** parts for the right spawn zone's **doorways**:

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
   <td>Right spawn top wall</td>
   <td>`10, 15, 5`</td>
   <td>`-105, 12.5, 22.5`</td>
   </tr>
   <tr>
   <td>Right spawn, top door</td>
   <td>`10, 5, 5`</td>
   <td>`-95, 17.5, 22.5`</td>
   </tr>
   <tr>
   <td>Right spawn, middle wall</td>
   <td>`25, 15, 5`</td>
   <td>`-77.5, 12.5, 22.5`</td>
   </tr>
   <tr>
   <td>Right spawn, bottom door</td>
   <td>`10, 5, 5`</td>
   <td>`-60, 17.5, 22.5`</td>
   </tr>
   <tr>
   <td>Right spawn, bottom wall</td>
   <td>`20, 15, 5`</td>
   <td>`-45, 12.5, 22.5`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section1/SpawnZone-3.jpg" width="100%"/>

1. Anchor all of these spawn zone parts.

  </TabItem>
</Tabs>

### Combat Pockets Geometry

The fourth step in creating the laser tag greybox environment is to create the geometry for combat pockets in the interior of the building. This geometry makes up the majority of the playable areas in the experience because combat pockets arise from the intersections of primary lane and cross lanes, which span the entirety of the building.

The instructions in this section refer to this geometry as three separate combat pockets according to their location on a top-view of the map: the left combat pocket, the middle combat pocket, and the right combat pocket. Most combat pockets include a maximum of three entrance or exit points to refrain from giving users choice overload as they're navigating the space.

<img src="../../assets/tutorials/environmental-art-curriculum/Section1/CombatPockets-Intro1.jpg" width="100%"/>

To help visualize geometry of the combat pockets you are creating for the experience, reference the following image that marks them in yellow.

<img src="../../assets/tutorials/environmental-art-curriculum/Section1/CombatPockets-Intro2.jpg" width="100%"/>

<Tabs>
  <TabItem key = "1" label="Create Your Own">

To create your own combat pockets geometry:

1. Using **block** parts, create a **left combat pocket** with two exit points that allow players to traverse the middle lane, and one exit point that opens to the interior primary lane. This geometry must have space on either side of the combat pocket to allow for cross lanes, and block player entry from the exterior primary lane.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section1/CombatPockets-1.jpg" width="100%"/>

1. Using **block** parts, create and position a symmetrical copy of this combat pocket near the other team's spawn zone. This geometry represents your **right combat pocket**.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section1/GeneralCombatPockets-2.jpg" width="100%"/>

1. Using **block** parts, create a **middle combat pocket** with two exit points that allow players to traverse the middle lane, one exit point that opens to the interior primary lane, and open space along the edge that flows into the exterior primary lane.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section1/GeneralCombatPockets-3.jpg" width="100%"/>

1. **(Optional)** Using **block** parts, create **hallway additions** to the middle combat pocket to break up sight lines across the interior primary lane.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section1/GeneralCombatPockets-4.jpg" width="100%"/>

1. Anchor these parts.

  </TabItem>
  <TabItem key = "2" label="Recreate the Sample">

To exactly recreate the combat pockets geometry within the sample [Environment Art - Greyboxing](https://www.roblox.com/games/14447721254/Environment-Art-Greyboxing) place file:

1. Add and configure the following **block** parts for the **left combat pocket**.

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
   <td>Top hallway extension</td>
   <td>`10, 15, 15`</td>
   <td>`-100, 12.5, 272.5`</td>
   </tr>
   <tr>
   <td>Top doorway, left wall</td>
   <td>`5, 15, 15`</td>
   <td>`-92.5, 12.5, 262.5`</td>
   </tr>
   <tr>
   <td>Top doorway, overhang</td>
   <td>`5, 5, 10`</td>
   <td>`-92.5, 17.5, 250`</td>
   </tr>
   <tr>
   <td>Top doorway, right wall</td>
   <td>`5, 15, 20`</td>
   <td>`-92.5, 12.5, 235`</td>
   </tr>
   <tr>
   <td>Left doorway, top wall</td>
   <td>`20, 15, 5`</td>
   <td>`-85, 12.5, 272.5`</td>
   </tr>
   <tr>
   <td>Left doorway, overhang</td>
   <td>`10, 5, 5`</td>
   <td>`-70, 17.5, 272.5`</td>
   </tr>
   <tr>
   <td>Left doorway, bottom wall</td>
   <td>`20, 15, 5`</td>
   <td>`-55, 12.5, 272.5`</td>
   </tr>
   <tr>
   <td>Right doorway, top wall</td>
   <td>`15, 15, 10`</td>
   <td>`-82.5, 12.5, 230`</td>
   </tr>
   <tr>
   <td>Right doorway, overhang</td>
   <td>`10, 5, 10`</td>
   <td>`-70, 17.5, 230`</td>
   </tr>
   <tr>
   <td>Right doorway, bottom wall</td>
   <td>`20, 15, 10`</td>
   <td>`-55, 12.5, 230`</td>
   </tr>
   <tr>
   <td>Bottom wall</td>
   <td>`10, 15, 35`</td>
   <td>`-50, 12.5, 252.5`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section1/CombatPockets-1.jpg" width="100%"/>

1. Add and configure the following **block** parts for the **top hallway addition** to the middle combat pocket that breaks up sight lines across the interior primary lane:

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
   <td>Left hallway extension</td>
   <td>`15, 20, 45`</td>
   <td>`-117.5, 15, 212.5`</td>
   </tr>
   <tr>
   <td>Right hallway extension</td>
   <td>`15, 20, 45`</td>
   <td>`-117.5, 15, 107.5`</td>
   </tr>
   <tr>
   <td>Left hallway</td>
   <td>`5, 20, 45`</td>
   <td>`-92.5, 15, 187.5`</td>
   </tr>
   <tr>
   <td>Right hallway</td>
   <td>`5, 20, 45`</td>
   <td>`-92.5, 15, 132.5`</td>
   </tr>
   <tr>
   <td>Top hallway entrance, left wall</td>
   <td>`15, 15, 5`</td>
   <td>`-102.5, 17.5, 172.5`</td>
   </tr>
   <tr>
   <td>Top hallway entrance, left wall on entrance</td>
   <td>`5, 15, 10`</td>
   <td>`-112.5, 17.5, 170`</td>
   </tr>
   <tr>
   <td>Top hallway entrance, right wall</td>
   <td>`15, 15, 5`</td>
   <td>`-102.5, 17.5, 147.5`</td>
   </tr>
   <tr>
   <td>Top hallway entrance, right wall on entrance</td>
   <td>`5, 15, 10`</td>
   <td>`-112.5, 17.5, 150`</td>
   </tr>
   <tr>
   <td>Door overhang</td>
   <td>`5, 5, 10`</td>
   <td>`-92.5, 22.5, 160`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section1/CombatPockets-2.jpg" width="100%"/>

1. Add and configure the following **block** parts for the **middle room** of the middle combat pocket:

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
   <td>Left wall that extends into the hallway</td>
   <td>`10, 20, 25`</td>
   <td>`-85, 15, 197.5`</td>
   </tr>
   <tr>
   <td>Right wall that extends into the hallway</td>
   <td>`10, 20, 25`</td>
   <td>`-85, 15, 122.5`</td>
   </tr>
   <tr>
   <td>Left doorway, top wall</td>
   <td>`25, 20, 15`</td>
   <td>`-67.5, 15, 192.5`</td>
   </tr>
   <tr>
   <td>Left doorway, overhang</td>
   <td>`10, 10, 15`</td>
   <td>`-50, 20, 192.5`</td>
   </tr>
   <tr>
   <td>Left doorway, bottom wall</td>
   <td>`5, 20, 15`</td>
   <td>`-42.5, 15, 192.5`</td>
   </tr>
   <tr>
   <td>Right doorway, top wall</td>
   <td>`25, 20, 15`</td>
   <td>`-67.5, 15, 127.5`</td>
   </tr>
   <tr>
   <td>Right doorway, overhang</td>
   <td>`10, 10, 15`</td>
   <td>`-50, 20, 127.5`</td>
   </tr>
   <tr>
   <td>Right doorway, bottom wall</td>
   <td>`5, 20, 15`</td>
   <td>`-42.5, 15, 127.5`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section1/CombatPockets-3.jpg" width="100%"/>

1. Add and configure the following **block** parts for the **right combat pocket**:

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
   <td>Top hallway extension</td>
   <td>`10, 15, 15`</td>
   <td>`-100, 12.5, 47.5`</td>
   </tr>
   <tr>
   <td>Top doorway, left wall</td>
   <td>`5, 15, 20`</td>
   <td>`-92.5, 12.5, 85`</td>
   </tr>
   <tr>
   <td>Top doorway, overhang</td>
   <td>`5, 5, 10`</td>
   <td>`-92.5, 17.5, 70`</td>
   </tr>
   <tr>
   <td>Top doorway, right wall</td>
   <td>`5, 15, 15`</td>
   <td>`-92.5, 12.5, 57.5`</td>
   </tr>
   <tr>
   <td>Left doorway, top wall</td>
   <td>`15, 15, 10`</td>
   <td>`-82.5, 12.5, 90`</td>
   </tr>
   <tr>
   <td>Left doorway, overhang</td>
   <td>`10, 5, 10`</td>
   <td>`-70, 17.5, 90`</td>
   </tr>
   <tr>
   <td>Left doorway, bottom wall</td>
   <td>`20, 15, 10`</td>
   <td>`-55, 12.5, 90`</td>
   </tr>
   <tr>
   <td>Right doorway, top wall</td>
   <td>`20, 15, 5`</td>
   <td>`-85, 12.5, 47.5`</td>
   </tr>
   <tr>
   <td>Right doorway, overhang</td>
   <td>`10, 5, 5`</td>
   <td>`-70, 17.5, 47.5`</td>
   </tr>
   <tr>
   <td>Right doorway, bottom wall</td>
   <td>`20, 15, 5`</td>
   <td>`-55, 12.5, 47.5`</td>
   </tr>
   <tr>
   <td>Bottom wall</td>
   <td>`10, 15, 35`</td>
   <td>`-50, 12.5, 67.5`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section1/CombatPockets-4.jpg" width="100%"/>

1. Anchor all of these combat pocket parts.

  </TabItem>
</Tabs>

### Exterior Geometry

The final step in creating the laser tag greybox environment is to create the placeholder exterior assets that create interesting composition for the outdoor space, as well as minimal cover for users traveling the exterior primary lane. This area of the experience is important because while it comes with risk due to the minimal cover from enemy fire, it also provides users a quick route to the enemy team's spawn zone.

To help visualize the geometry of the exterior assets you are creating for the experience, reference the following image that marks them in yellow.

<img src="../../assets/tutorials/environmental-art-curriculum/Section1/Exterior-Intro.jpg" width="100%"/>

<Tabs>
  <TabItem key = "1" label="Create Your Own">

To create your own exterior geometry:

1. Using **block** parts, create symmetrical **obstacles** along the exterior primary lane. For example, the sample greybox environment adds parts to block lines of sight that will later become towers, pillars, and planters.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section1/GeneralExterior-1.jpg" width="100%"/>

1. Anchor these parts.

  </TabItem>
  <TabItem key = "2" label="Recreate the Sample">

To exactly recreate the exterior geometry within the sample [Environment Art - Greyboxing](https://www.roblox.com/games/14447721254/Environment-Art-Greyboxing) place file:

1. Add and configure the following **block** parts for the **left tower**:

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
   <td>Left wall</td>
   <td>`15, 25, 5`</td>
   <td>`-32.5, 22.5, 192.5`</td>
   </tr>
   <tr>
   <td>Right wall</td>
   <td>`15, 40, 10`</td>
   <td>`-32.5, 30, 185`</td>
   </tr>
   <tr>
   <td>Bottom ledge</td>
   <td>`20, 5, 15`</td>
   <td>`-30, 7.5, 187.5`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section1/Exterior-1.jpg" width="100%"/>

1. Add and configure the following **block** parts for the **right tower**:

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
   <td>Left wall</td>
   <td>`15, 40, 10`</td>
   <td>`-32.5, 30, 135`</td>
   </tr>
   <tr>
   <td>Right wall</td>
   <td>`15, 25, 5`</td>
   <td>`-32.5, 22.5, 127.5`</td>
   </tr>
   <tr>
   <td>Bottom ledge</td>
   <td>`20, 5, 15`</td>
   <td>`-30, 7.5, 132.5`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section1/Exterior-2.jpg" width="100%"/>

1. Add and configure the following **block** parts for the **obstacles** to the left of the towers:

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
   <td>Left obstacle</td>
   <td>`20, 10, 5`</td>
   <td>`-15, 5, 262.5`</td>
   </tr>
   <tr>
   <td>Middle obstacle</td>
   <td>`15, 30, 5`</td>
   <td>`-22.5, 15, 237.5`</td>
   </tr>
   <tr>
   <td>Right obstacle</td>
   <td>`10, 10, 15`</td>
   <td>`-5, 5, 202.5`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section1/Exterior-3.jpg" width="100%"/>

1. Add and configure the following **block** parts for the **obstacles** to the right of the towers:

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
   <td>Left obstacle</td>
   <td>`10, 10, 15`</td>
   <td>`-5, 5, 117.5`</td>
   </tr>
   <tr>
   <td>Middle obstacle</td>
   <td>`15, 30, 5`</td>
   <td>`-22.5, 15, 82.5`</td>
   </tr>
   <tr>
   <td>Right obstacle</td>
   <td>`20, 10, 5`</td>
   <td>`-15, 5, 57.5`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section1/Exterior-4.jpg" width="100%"/>

1. Add and configure the following **block** parts for the **obstacles** between the towers:

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
   <td>Top obstacle</td>
   <td>`10, 5, 5`</td>
   <td>`-50, 7.5, 160`</td>
   </tr>
   <tr>
   <td>Middle obstacle</td>
   <td>`20, 10, 10`</td>
   <td>`-35, 10, 160`</td>
   </tr>
   <tr>
   <td>Bottom obstacle</td>
   <td>`10, 10, 30`</td>
   <td>`0, 5, 160`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../assets/tutorials/environmental-art-curriculum/Section1/Exterior-5.jpg" width="100%"/>

1. Anchor all of these tower parts.

  </TabItem>
</Tabs>

## Apply Placeholder Materials

Now that you have your placeholder geometry in place, it's time to apply placeholder materials to the map in key areas to help orient users to where they are in the experience. The sample [Environment Art - Greyboxing](https://www.roblox.com/games/14447721254/Environment-Art-Greyboxing) `.rbxl` file uses the following color map, but you can use can use any color to achieve the same purpose:

- **Deep Orange for top perimeter walls** – Informs users where they are in relation to the back of the building.
- **Persimmon for all left-side floors** – Informs users where they are in relation to the right-side of the building.
- **Lapis for all right-side floors** – Informs users where they are in relation to the left-side of the building.
- **Bright Green for the exterior elevation** – Informs users where they are in relation to outside of the building.

Applying materials to these specific key areas is important because no matter where a user is in the experience, as long as they can see at least one of these colors, they can quickly deduce their approximate location within the overall map, as well as where they are in relation to a spawn zone.

For example, if the following user is on the "red" team, when they're walking on the red floor with the yellow wall to their right, they know that they're in the interior primary lane and moving toward their spawn zone. Conversely, if they're walking on the lapis floor with the yellow wall to their left, they know they're in the interior lane and moving toward the enemy team's spawn zone.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/tutorials/environmental-art-curriculum/Section1/Placeholder-Left.jpg" width="100%"/>
  </figure>
  <figure>
    <img src="../../assets/tutorials/environmental-art-curriculum/Section1/Placeholder-Right.jpg" width="100%"/>
  </figure>
</GridContainer>

To apply placeholder materials:

1. Select the top perimeter walls and the top hallway editions, then set their `Class.Part.Color` to **255, 176, 0**.
1. Select the left-side floor parts, then set their `Class.Part.Color` to **255, 89, 89**.
1. Select the right-side floor parts, then set their `Class.Part.Color` to **16, 42, 220**.
1. Select the part for the elevation between the ground and first floor, then set their `Class.Part.Color` to **75, 151, 75**.

<img src="../../assets/tutorials/environmental-art-curriculum/Section1/PlaceholderMaterials.jpg" width="100%"/>

## Playtest Your Layout

It's important to continuously playtest the layout of your environment **at nearly every step of the development process** so you can ensure the experience is both fun and functional, and you can catch small issues before they turn into much larger problems the further you are in the process. As you playtest, ask yourself the following questions:

- Are there advantages or disadvantages to either team?
- Are users able to successfully orient themselves and understand their location at any point on the map?
- Are there any areas on the map that overwhelm users with too many choices?
- What am I enjoying or getting frustrated about the layout or gameplay?
- Will this make users feel the way I want them to when they're in this area?
- Is there any part of the map that I can bypass and still achieve my goals?

To playtest your experience:

1. In the **Test** tab, navigate to the **Play** icon, and click the **Mode Picker**.

   <img src="../../assets/studio/general/Model-Tab-Quick-Access-Play.png" width="770" alt="Play button indicated in Quick Access Toolbar" />

2. Select from one of the following playtest options:

   - **Play** – Starts simulating the experience, inserting your avatar at either a `Class.SpawnLocation` or coordinates of around **0, 100, 0**.
   - **Play Here** – Starts simulating the experience, inserting your avatar in front of the camera's current position.
   - **Run** – Starts simulating the experience without inserting your avatar. Instead, the simulation begins at the current camera position and you can navigate around using the Studio camera controls.

While playtesting, you can use the same controls as a default Roblox experience. Once you are happy with the overall layout of your experience, you can move on to creating polishing assets that will replace the greybox geometry in accordance with your art style.
