---
title: Create an environment with terrain
description: Explains how to create the island where players spawn using Studio's terrain tools.
next: /tutorials/curriculums/core/building/greybox-a-playable-area
prev: /tutorials/curriculums/core/building/create-a-project
---

<iframe width="800" height="495" src="https://www.youtube-nocookie.com/embed/_ZW5g7er4Zc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<br/>

**Creating an environment with terrain** allows you to generate and customize organic materials within the 3D space that look and behave like natural materials from the real world. Using tools within the [Terrain Editor](../../../../studio/terrain-editor.md), this section of the tutorial teaches you how to generate and sculpt terrain for a small island where players spawn and navigate to the first few platforms of your experience.

Before you begin, it's important to note that sculpting terrain is an art form, and it's difficult to exactly recreate brush strokes and subtle material edits. As long as your terrain meets the needs of your own experience, it's normal and expected for your environment to look and feel different from the sample [Island Jump](https://www.roblox.com/games/14239096301/) experience.

## Create the island

The first step in creating your environment is to create a small island that players will spawn to when they start the experience, and when their health reaches zero after they fall off a platform. Using the **Draw** tool, you can click and drag anywhere within the viewport to generate a large sphere of terrain to start the island, which you can later shape and flatten for a wide surface area.

To create the island:

1. Navigate to the toolbar's **Home** tab and click the **Terrain** button.
1. In the **Terrain Editor** window, click the **Edit** tab, then the **Draw** button.

   <img src="../../../../assets/studio/terrain-editor/Edit-Tab-Draw.png" alt="Studio's Terrain Editor window with both the Edit tab and Draw button highlighted." width="360" />

1. In the **Brush Settings** and **Material Settings** sections, keep all default setting except for the following:

   <GridContainer numColumns="2">
     <figure>
       <img src="../../../../assets/tutorials/create-an-environment-with-terrain/Terrain-Editor-Draw-Settings.png" alt="Studio's Draw tool settings for this step in the task. The Brush Mode's Add button is highlighted." width="360" />
     </figure>
     <Grid item>
       - Set **Brush Size** to **32**.
       - Set **Source Material** to **Sand**.
     </Grid>
   </GridContainer>

1. In the viewport, click near the spawn location in the viewport. A sphere of sand material displays.

   <video controls loop muted>
   <source src="../../../../assets/tutorials/create-an-environment-with-terrain/Terrain-Adding-First-Sphere.mp4" />
   </video>

<Alert severity="info">
   If you cannot see the sphere, try zooming your camera out until your spawn location is smaller.
</Alert>

## Shape the island

If you keep the island in its current shape, players would have a difficult time navigating without falling off the island. Using the **Flatten** tool, you can click and drag on the sphere to evenly level the terrain on a fixed plane, and provide players a relatively flat surface as they start your experience. While this shape initially looks unnatural, you can also use the **Sculpt** tool around the edges of the island to ensure it looks organic and realistic.

To shape the island:

1. In the **Terrain Editor** window, click the **Flatten** button.

   <img src="../../../../assets/studio/terrain-editor/Edit-Tab-Flatten.png" alt="Studio's Terrain Editor window with both the Edit tab and Flatten button highlighted." width="360" />

1. In the **Brush Settings** section, keep all default setting except for the following:

   <GridContainer numColumns="2">
     <figure>
       <img src="../../../../assets/tutorials/create-an-environment-with-terrain/Terrain-Editor-Flatten-Settings.png" alt="Studio's Flatten tool settings for this step in the task."  width="360" />
     </figure>
     <Grid item>
       - Set **Brush Size** to `18`.
       - Set **Flatten Plane** to **Fixed**. New settings display.
       - Set **Fixed Y Plane** to `0`.
     </Grid>
   </GridContainer>

1. In the viewport, click and drag your mouse around the sphere until it's completely flat on top.

   <video controls loop muted>
   <source src="../../../../assets/tutorials/create-an-environment-with-terrain/Terrain-Flattening-Sphere.mp4" />
   </video>

1. Navigate back to the **Terrain Editor** window, then click the **Sculpt** button.

   <img src="../../../../assets/studio/terrain-editor/Edit-Tab-Sculpt.png" alt="Studio's Terrain Editor window with both the Edit tab and Sculpt button highlighted." width="360" />

1. In the **Brush Settings** and **Material Settings** sections, set **Source Material** to **Sand**, otherwise keep all default settings.

   <img src="../../../../assets/tutorials/create-an-environment-with-terrain/Terrain-Editor-Sculpt-Settings.png" alt="Studio's Sculpt tool settings for this step in the task. The Brush Mode's Add button highlighted." width="360" />

1. In the viewport, click and drag your mouse around the island's edges and below the water line to make the island look more natural.

   <video controls loop muted>
   <source src="../../../../assets/tutorials/create-an-environment-with-terrain/Terrain-Sculpting-Edges.mp4" />
   </video>

<Alert severity="info">
   The **Draw** tool adds or subtracts material based on the brush's position, whereas the **Sculpt** tool only
   grows or erodes existing terrain.
</Alert>

## Create water

While there are multiple ways to generate a large body of water, the following instructions utilize the
Terrain Editor's **Fill** tool. This method allows you to replace any material in a specific region with another
material, including air itself.

To create the water around the island:

1. In the **Terrain Editor** window, click the **Fill** button.

   <img src="../../../../assets/studio/terrain-editor/Edit-Tab-Fill.png" alt="Studio's Terrain Editor window with both the Edit tab and Fill button highlighted." width="360" />

1. In the **Selection Settings** section:
   1. Set **Size** to `1800, 5, 1800` to ensure the water fills toward the horizon of your experience.
   1. Set **Position** to `0, -15, 0` to ensure the water fills below the top of the island.
1. In the **Material Settings** section, configure the tool with the following settings:

   <GridContainer numColumns="2">
     <figure>
       <img src="../../../../assets/tutorials/create-an-environment-with-terrain/Terrain-Editor-Fill-Settings.png" alt="Studio's Fill tool material settings for this step in the task. The Material Mode's Replace button, source material, and target material are highlighted." width="360" />
     </figure>
     <Grid item>
       - Set **Fill Mode** to **Replace**.
       - Set **Source Material** to **Air**.
       - Set **Target Material** to **Water**.
     </Grid>
   </GridContainer>

1. Click the **Replace** button. Water generates around the island.

   <video controls loop muted>
   <source src="../../../../assets/tutorials/create-an-environment-with-terrain/Terrain-Filling-Water.mp4" />
   </video>

## Apply materials

Now that you have the basis of your island, you can customize its appearance with different materials. Using the **Paint** tool,
you can click and drag on your terrain to apply both a grassy surface and blades of grass to the middle of the island's surface.

To apply materials to the island:

1. In the **Terrain Editor**, click the **Paint** button.

   <img src="../../../../assets/studio/terrain-editor/Edit-Tab-Paint.png" alt="Studio's Terrain Editor window with both the Edit tab and Paint button highlighted." width="360" />

1. In the **Brush Settings** and **Material Settings** sections, keep all default setting except for the following:

   <GridContainer numColumns="2">
     <figure>
       <img src="../../../../assets/tutorials/create-an-environment-with-terrain/Terrain-Editor-Paint-Settings.png" alt="Studio's Paint tool settings for this step in the task. The material is highlighted." width="360" />
     </figure>
     <Grid item>
       - Set **Material Mode** to **Paint**.
       - Set **Source Material** to **Leafy Grass**.
     </Grid>
   </GridContainer>

1. In the viewport, click and drag around the middle of the island to apply the leafy grass material.

   <video controls loop muted>
   <source src="../../../../assets/tutorials/create-an-environment-with-terrain/Terrain-Painting-Grass.mp4" />
   </video>

1. Navigate back to the **Terrain Editor** window, then in the **Brush Settings** and **Material Settings** sections,
   1. Set **Brush Size** to `3`.
   1. Set **Material** to **Grass**.
1. In the viewport, drag along the edges of the island to apply blades of grass, leaving space in the middle of the island for
   the spawn location and the initial platforms.
1. In the **Explorer** window, select the **SpawnLocation** object.
1. From the toolbar, select the **Move** tool.
1. In the viewport, move the spawn location toward the edge of the island to make space for the first platform. The sample [Island Jump - Building](https://www.roblox.com/games/14239096301/Island-Jump-Building) `.rbxl` file uses a position of `-127, -3, 9`.

   <video controls loop muted>
   <source src="../../../../assets/tutorials/create-an-environment-with-terrain/create-an-environment-with-terrain-spawn.mp4" />
   </video>

<Alert severity="info">
   You can create completely custom material appearance using [Material
   Overrides](/parts/materials#material-overrides), which allow you to provide
   custom texture assets to replace any default terrain texture.
</Alert>

## Playtest

Once you are happy with your island's appearance, you can playtest your experience to check the scale of the island and how it feels in the context of your experience's 3D world.

To playtest your experience:

1. Choose **Test** from the dropdown menu and click the **Play** button to its right to begin the playtest.

   <img src="../../../../assets/studio/general/Mezzanine-Testing-Mode-Test.png" width="800" alt="Test option in the testing modes dropdown of Studio's mezzanine." />

1. Walk around the island and check out how it looks while playing.

   <video controls loop muted>
   <source src="../../../../assets/tutorials/create-an-environment-with-terrain/create-an-environment-with-terrain-walking.mp4" />
   </video>

   <Alert severity="warning">
   If your character faces a different direction than expected upon spawning, such as out toward the ocean instead of toward the center of the island, rotate the `Class.SpawnLocation` object and playtest again, repeating the process until the character spawns in the appropriate direction.
   </Alert>

1. When you're done, click the **Stop** button. Studio exits playtest mode.

   <img src="../../../../assets/studio/general/Mezzanine-Testing-Stop.png" width="800" alt="Stop button indicated in Studio's mezzanine." />

In the next section of the tutorial, you will learn how to create a playable area for players to follow in order to reach the highest platform.
