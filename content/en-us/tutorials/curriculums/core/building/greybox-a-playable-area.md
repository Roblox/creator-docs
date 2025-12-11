---
title: Greybox a playable area
description: Explains how to use Studio's solid modeling tools to plan out the basic structure of your platforms.
next: /tutorials/curriculums/core/scripting/script-game-behavior
prev: /tutorials/curriculums/core/building/create-an-environment-with-terrain
---

<iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/yQJg1knsbh8?si=rmjdGMyHMFj5BdBM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<br/>

**Greyboxing an environment**, also known as massing out or blocking your environment, is the process
of adding simple shapes to the 3D space to figure out how users will experience gameplay before investing
time into scripting the gameplay or creating complex assets. This process can save you a lot of time in
finding any issues in your layout, and it's much easier to make adjustments to basic parts than it is to
adjust any high-quality meshes that you import into Studio.

Using basic parts and solid modeling operations, this section of the tutorial teaches you how to greybox
the sea stack platforms that make up the playable area of the experience. Once you complete the environment,
you will learn how to create the gameplay for the experience using Luau scripts.

## Plan the playable area

In the final version of the experience, players need to collect coins on the island
and sea stack platforms in order to upgrade their jumping power and reach higher platforms. You will configure
scripts to add this behavior in the next section of the tutorial, but it's important while you're starting to
greybox your environment to plan for the difference in height between platforms. For example, the difference
in height between platforms should slowly increase for each height level in order to encourage players to collect
coins to progress through the level.

As a guide, the sample [Island Jump - Building](https://www.roblox.com/games/14239096301/Island-Jump-Building)
`.rbxl` file includes seven different levels of height, with the first level sunk into the island to expose only
a few studs of height. This allows players to only need to collect a few coins at the beginning of the experience
in order to progress to the next platform. The subsequent height differences between each level then increase to
8, 20, 35, 55, 81, and 110 studs, providing players a sense of progress as they make their way through your experience.

<Alert severity="info">

A stud is Studio's primary unit for length, and it's equivalent to 28cm.

</Alert>

<img src="../../../../assets/tutorials/block-out-a-playable-area/Platform-Levels.jpg" alt="A distant view of the sample island jump experience's greybox geometry. Each level of height difference between sea stacks is highlighted." />

<Alert severity="info">

If you want to expand your world beyond the simple design of the
sample, ensure that each new height level requiring a jumping upgrade is
at least 30 studs higher from the previous level.

</Alert>

## Add the platforms

Now that you have a plan for the difference in height between platforms, it's time to add in placeholder `Class.Part`
objects to represent the sea stack platforms. **Parts** are Roblox's basic building blocks with properties you can modify
to customize their physical appearance, such as their shape, size, and color.

While you can use almost any part shape to represent your sea stack platforms, it's recommended to greybox your environment with **cylinder** parts because they offer a flat surface for you to land on when you playtest jumping from platform to platform, and because they are similar in shape to the sea stack meshes you will use in the final section of the tutorial.

<div><b>A comparison between the sample Island Jump experience's greybox and final geometry</b></div>
<GridContainer numColumns="2">
  <figure>
    <img width="100%" img src="../../../../assets/tutorials/block-out-a-playable-area/Add-Platforms-Greybox.jpg" alt="The sample Island Jump experience's greybox geometry." />
  </figure>
  <figure>
    <img width="100%" img src="../../../../assets/tutorials/block-out-a-playable-area/Add-Platforms-Final.jpg" alt="The sample Island Jump experience's final geometry." />
  </figure>
</GridContainer>

### Create an organization structure

Before you insert placeholder parts into the 3D space, it's important to create an organization structure for your assets in `Class.Workspace`. This process ensures that your workspace remains organized and easy to scan, especially as you venture into creating experiences with a significant amount of assets that you need to manage.

There are two types of containers you can use to group assets together: `Class.Folder` and `Class.Model` objects. **Folders** are useful for storing many objects of different types, and **models** are useful for storing geometric groupings of parts. The following instructions teach you how to use both container objects to store all assets for your 3D world.

To create an organization structure:

1. In the **Explorer** window, hover over the **Workspace** and click the **&CirclePlus;** icon. A contextual menu displays.
1. From the contextual menu, insert a **Folder** object. A folder object displays that you will use to contain all assets for the 3D world.

   <img src="../../../../assets/tutorials/block-out-a-playable-area/Explorer-Add-Folder.png" alt="Studio's Explorer window with both the Workspace's plus icon and Folder object highlighted." width="320" />

1. Rename the new folder `World`.

   1. Right-click the folder object. A contextual menu displays.
   1. From the contextual menu, click **Rename**, and enter `World` for the
      folder's name.

      <Alert severity="info">Ensure that the name is spelled correctly with the
      correct casing. The scripts that you write in Roblox are case-sensitive,
      and you'll write one later in this course to access this folder.</Alert>

1. Hover over the **World** folder and click the **&CirclePlus;** icon.
1. From the contextual menu, insert a **Model**.

   <img src="../../../../assets/tutorials/block-out-a-playable-area/Explorer-Add-Model.png" alt="Studio's Explorer window with both the World folder's plus icon and Model object highlighted." width="320" />

1. **Rename** the model to `Blockout_Parts`.

   <img src="../../../../assets/tutorials/block-out-a-playable-area/Explorer-Model-Renamed.png" alt="Studio's Explorer window with the new Blockout_Parts model highlighted under the World folder." width="320" />

### Insert parts

<Alert severity="info">
    The following instructions provide two different instructional paths: you can either insert parts into your own unique environment, or you can insert parts in a way that exactly recreates the greybox environment within the sample [Island Jump - Building](https://www.roblox.com/games/14239096301/Island-Jump-Building).
</Alert>

Now that you have an organizational structure to contain your assets, you can now begin inserting parts into the 3D space to represent your sea stack platforms.

<Tabs>
  <TabItem key = "1" label="Create your own">

To insert a cylinder part for your first platform:

1. In the **Home** or **Model** tab's toolbar, click the small arrow next to the **Part** inserter tool to reveal the dropdown.

   <img src="../../../../assets/tutorials/block-out-a-playable-area/Part-Picker.png" alt="A close-up view of the part picker." width="800" />

1. From the dropdown menu, select **Cylinder**. A cylinder part displays in the viewport.
1. In the **Explorer** window, click and drag the new **Part** to the **Blockout_Parts** model. The part becomes a child of the model.

   <img src="../../../../assets/tutorials/block-out-a-playable-area/New-Part-As-Child-Of-Model.png" alt="Studio's Explorer window with the new Part highlighted under the Blockout_Parts model object." width="320" />

1. Use the **Move**, **Scale**, and **Rotate** tools to position, scale, and rotate your cylinder until it's a large, flat surface in the middle of your island. For more information on these tools, see [Transform parts](../../../../parts/index.md#transform-parts).

   <Alert severity="success">
   To manipulate individual parts, select them in the Explorer. If you select a part in the viewport, it selects the entire model.
   </Alert>

   <img src="../../../../assets/studio/general/Toolbar-Transform-Tools.png" alt="Transform tools indicated in Studio's toolbar." width="800" />

   <img src="../../../../assets/tutorials/block-out-a-playable-area/First-Platform.jpg" alt="A large cylinder object partially sticking out of an island surrounded by water." width="80%" />

1. Using the same process, add and configure at least seven more sea stack platforms with increasing levels of height into the **Blockout_Parts** model.

   <img src="../../../../assets/tutorials/block-out-a-playable-area/Final-Platforms.jpg" alt="Many large cylinder objects partially sticking out of an island surrounded by water, and the water itself." width="80%" />

1. In the **Explorer** window, select the **Blockout_Parts** model.
1. In the **Home** or **Model** tab, toggle on **Anchor**. This ensures that the physics system doesn't move your parts when the experience starts.

  </TabItem>
  <TabItem key = "2" label="Recreate the sample">

To exactly recreate the sea stack platforms within the sample [Island Jump - Building](https://www.roblox.com/games/14239096301/Island-Jump-Building) experience:

1. Navigate to Studio's **Home** tab toolbar.
1. Click the **Part** dropdown arrow, then select **Cylinder**. A cylinder part displays in the viewport.
1. In the **Explorer** window, click and drag the new **Part** to the **Blockout_Parts** model. The part becomes a child of the model.

   <img src="../../../../assets/tutorials/block-out-a-playable-area/New-Part-As-Child-Of-Model.png" alt="Studio's Explorer window with the new Part highlighted under the Blockout_Parts model object." width="320" />

1. In the **Properties** window,

   1. Set **Name** to **Level_1** for organization purposes.
   1. Set **Size** to `12, 131, 131` to create a large platform.
   1. Set **CFrame.Position** to `-23, -4, 9` so the top of the platform is only a short jump from the surface of the island.
   1. Set **CFrame.Orientation** to `0, 0, 90` so the flat surface of the cylinder faces toward the sky.

   <img src="../../../../assets/tutorials/block-out-a-playable-area/First-Platform.jpg" alt="A large cylinder object partially sticking out of an island surrounded by water." width="80%" />

1. Using this process, add and configure seven more sea stack levels with the following values for the rest of the sea stack platforms:

   <table>
   <thead>
   <tr>
   <th>Name</th>
   <th>Size</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>Level_2</td>
   <td>`20, 81, 81`</td>
   <td>`-8, 0, 24`</td>
   <td>`0, 0, 90`</td>
   </tr>
   <tr>
   <td>Level_3a</td>
   <td>`40, 44, 44`</td>
   <td>`42, 10, 9`</td>
   <td>`0, 0, 90`</td>
   </tr>
   <tr>
   <td>Level_3b</td>
   <td>`40, 34, 34`</td>
   <td>`87, 10, 4`</td>
   <td>`0, 0, 90`</td>
   </tr>
   <tr>
   <td>Level_3c</td>
   <td>`40, 44, 44`</td>
   <td>`97, 10, 49`</td>
   <td>`0, 0, 90`</td>
   </tr>
   <tr>
   <td>Level_4a</td>
   <td>`75, 39, 39`</td>
   <td>`112, 27.5, 46.5`</td>
   <td>`0, 0, 90`</td>
   </tr>
   <tr>
   <td>Level_4b</td>
   <td>`75, 65, 65`</td>
   <td>`137, 27.5, 69`</td>
   <td>`0, 0, 90`</td>
   </tr>
   <tr>
   <td>Level_4c</td>
   <td>`75, 60, 60`</td>
   <td>`159.5, 27.5, 91.5`</td>
   <td>`0, 0, 90`</td>
   </tr>
   <tr>
   <td>Level_4d</td>
   <td>`75, 30, 30`</td>
   <td>`207, 27.5, 106.5`</td>
   <td>`0, 0, 90`</td>
   </tr>
   <tr>
   <td>Level_4e</td>
   <td>`75, 61, 61`</td>
   <td>`250, 27.5, 74`</td>
   <td>`0, 0, 90`</td>
   </tr>
   <tr>
   <td>Level_5a</td>
   <td>`130, 60, 60`</td>
   <td>`268, 55, 50`</td>
   <td>`0, 0, 90`</td>
   </tr>
   <tr>
   <td>Level_5b</td>
   <td>`130, 25, 25`</td>
   <td>`256, 55, 2.5`</td>
   <td>`0, 0, 90`</td>
   </tr>
   <tr>
   <td>Level_5c</td>
   <td>`130, 25, 25`</td>
   <td>`276, 55, -17.5`</td>
   <td>`0, 0, 90`</td>
   </tr>
   <tr>
   <td>Level_5d</td>
   <td>`130, 54, 54`</td>
   <td>`322, 55, -21`</td>
   <td>`0, 0, 90`</td>
   </tr>
   <tr>
   <td>Level_6a</td>
   <td>`211, 79, 79`</td>
   <td>`367, 94.5, -41`</td>
   <td>`0, 0, 90`</td>
   </tr>
   <tr>
   <td>Level_6b</td>
   <td>`211, 24, 24`</td>
   <td>`387, 94.5, 11.5`</td>
   <td>`0, 0, 90`</td>
   </tr>
   <tr>
   <td>Level_6c</td>
   <td>`211, 44, 44`</td>
   <td>`397, 94.5, 51.5`</td>
   <td>`0, 0, 90`</td>
   </tr>
   <tr>
   <td>Level_7</td>
   <td>`321, 61, 61`</td>
   <td>`407, 149.5, 79`</td>
   <td>`0, 0, 90`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../../../assets/tutorials/block-out-a-playable-area/Final-Platforms.jpg" alt="Many large cylinder objects partially sticking out of an island and its surrounding water." width="80%" />

1. In the **Explorer** window, select the **Blockout_Parts** model.
1. In Studio's **Home** tab toolbar, click the **Anchor** icon. This ensures that the physics system doesn't move your parts when the experience starts.

  </TabItem>
</Tabs>

### Align parts

<Alert severity="info">
   If you used the sample **Island Jump - Building** experience values when inserting your sea stack platforms, you can skip this step.
</Alert>

As you add more sea stack placeholder parts off the island, it's easier to manage the height differences between levels if you use varying sizes for these parts instead of different positions. You can achieve this by **aligning** the base of each platform so that all vertical size differences are reflected in differing heights, and parts of the same size are on the same level.

The [Align Tool](../../../../studio/align-tool.md) aligns parts on either the minimum, center, or maximum edge according to a specific axis. For the purposes of this experience, you need to align the **bottom** edge in the **Y** axis so that all of the parts are partially submerged in the water.

To align parts:

1. In the **Explorer** window, select all of your platforms.
1. In the toolbar's **Model** tab, click the **Align** button. The **Align Tool** window displays.

   1. Set **Mode** to **Min**.
   2. Set **Align In** to **World**, **Y**.
   3. Keep **Relative To** on **Selection Bounds**.

1. Click the **Align** button. All parts align on the Y axis according to the part with the lowest Y `Class.Part.Position` value.
   <figure>
     <img src="../../../../assets/tutorials/block-out-a-playable-area/Platforms-Aligned-Underwater.jpg" alt="An underwater view of many cylinders that are aligned along their bottom edge." />
     <figcaption>All platforms align their bottom edge</figcaption>
   </figure>

### Create a hollow tunnel

Aside from using parts as-is to block out your playable areas, you can also apply solid modeling operations to join parts in unique ways to form more complex shapes, such as a hollow tunnel within one of the sea stacks. This technique provides more visual interest and variation in how players interact with your environments.

There are four solid modeling tools:

- **Union** – Joins two or more parts together to form a single solid union.
- **Intersect** – Intersects overlapping parts into a single solid intersection.
- **Negate** – Negates parts, which is useful for making holes and indentations.
- **Separate** – Separates the union or intersection back into its individual parts.

For the purposes of creating a hollow tunnel, you only need to use the **Union** and **Negate** tools. For a full breakdown of all of the tools, see [solid modeling](../../../../parts/solid-modeling.md).

To create a hollow tunnel:

1. Insert and position a **cylinder** part above one of your sea stack platforms. The sample [Island Jump - Building](https://www.roblox.com/games/14239096301/Island-Jump-Building) experience positions this part above the **Level_4b** platform with the following values:

   <table>
   <thead>
   <tr>
   <th>Name</th>
   <th>Size</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>Tunnel</td>
   <td>`24, 65, 69`</td>
   <td>`137, 77, 69`</td>
   <td>`0, 0, 90`</td>
   </tr>
   </tbody>
   </table>

1. Insert and position a **block** part to represent the hollow portion of your tunnel that's at least as tall as the cylinder part, and a suitable width for players to walk through. The sample **Island Jump - Building** experience positions this part within the previous cylinder with the following values:

   <table>
   <thead>
   <tr>
   <th>Name</th>
   <th>Size</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>Hollow_Part</td>
   <td>`24.5, 72, 22`</td>
   <td>`134.5, 77, 71`</td>
   <td>`0, 135, 90`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../../../assets/tutorials/block-out-a-playable-area/HollowTunnel-Start.jpg" alt="A close-up view of a gray block sticking out of a gray cylinder." width="740" />

1. In the **Explorer** window, select the block part.
1. In Studio's **Model** tab toolbar, click the **Negate** button. The part turns translucent.

   <img src="../../../../assets/tutorials/block-out-a-playable-area/HollowTunnel-Negate.jpg" alt="A close-up view of a partially translucent pink block sticking out of a gray cylinder." width="740" />

1. In the **Explorer** window, select both the negated part and the cylinder tunnel part.
1. In Studio's **Model** tab toolbar, click the **Union** button. The negated part is cut out from the overlapping tunnel cylinder.

   <img src="../../../../assets/tutorials/block-out-a-playable-area/HollowTunnel-Union.jpg" alt="A close-up view of a gray cylinder with an open tunnel through itself. The tunnel does not have a roof." width="740" />

1. Rename the new union to something that reflects its height level and position, such as **Level_4b_Union**.
1. Duplicate the sea stack platform underneath your new union, and position it so that it's on top of the tunnel. The sample **Island Jump - Building** experience positions the duplicate **Level_4b** platform above the union with the following values:

   <table>
   <thead>
   <tr>
   <th>Name</th>
   <th>Size</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>Level_4b_Top</td>
   <td>`74, 65, 69`</td>
   <td>`137, 126, 69`</td>
   <td>`0, 0, 90`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../../../assets/tutorials/block-out-a-playable-area/HollowTunnel-Final.jpg" alt="A close-up view of a tunnel through a cylinder." width="740" />

## Playtest the layout

After you finish greyboxing your playable areas, you must playtest the layout of your environment to ensure the experience is both fun and functional, and so that you can catch small issues before they turn into much larger projects the further you are in the development process. For example, your experience's gameplay needs players to steadily upgrade their jumping power according to the amount of coins they collect, so it's important to verify that players are able to jump between platforms in relation to the `Class.Humanoid.JumpPower` you expect players to have at varying platform height levels.

The following step-by-step instructions teach you how to playtest your experience with different `Class.Humanoid.JumpPower` values. As you playtest, ask yourself the following questions:

- Are players able to successfully jump to each platform?
- Does the difference in height between platforms slowly increase for each height level in order to encourage players to progress?
- What am I enjoying or getting frustrated about the layout or gameplay?

To playtest your experience:

1. Choose **Test** from the dropdown menu and click the **Play** button to its right to begin the playtest.

   <img src="../../../../assets/studio/general/Mezzanine-Testing-Mode-Test.png" width="800" alt="Test option in the testing modes dropdown of Studio's mezzanine." />

1. In the **Explorer** window, select the arrow next to your character model that displays your Roblox username. All of your character model's children objects display.
1. Select **Humanoid**.

   <img src="../../../../assets/tutorials/block-out-a-playable-area/Explorer-Character-Humanoid.png" alt="Studio's Explorer window with the Humanoid object highlighted. The hierarchy of the Workspace to CharacterModel to Humanoid is also highlighted." width="320" />

1. In the **Properties** window, navigate to the **Jump Settings** section, then enable **UseJumpPower**. The **JumpPower** property displays with a default value of `50`.
1. Set **JumpPower** to `0`. This ensures your character is unable to jump, emulating the same starting state for players after you script the gameplay.

   <img src="../../../../assets/tutorials/block-out-a-playable-area/Humanoid-Jump-Settings.png" alt="Jump Settings with the JumpPower and UseJumpPower properties highlighted." width="320" />

1. As you reach new levels, set **JumpPower** to multiples of `30` to simulate jumping upgrades.

   <video controls loop muted>
   <source src="../../../../assets/tutorials/block-out-a-playable-area/playable-area-walk.mp4" />
   </video>

In the next section of the tutorial, you will learn how to script the overall gameplay of the experience.
