---
title: Create an Environment with Terrain
description: Explains how to create the island where players spawn using Studio's terrain tools.
next: /tutorials/core/building/greybox-a-playable-area
prev: /tutorials/core/building/create-a-project
---

<iframe width="800" height="495" src="https://www.youtube-nocookie.com/embed/_ZW5g7er4Zc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<br/>

**Creating an environment with terrain** allows you to generate and customize organic materials within the 3D space that look and behave like natural materials from the real world. Using tools within the [Terrain Editor](../../../studio/terrain-editor.md), this section of the tutorial teaches you how to generate and sculpt terrain for a small island where players spawn and navigate to the first few platforms of your experience.

Before you begin, it's important to note that sculpting terrain is an art form, and it's difficult to exactly recreate brush strokes and subtle material edits. As long as your terrain meets the needs of your own experience, it's normal and expected for your environment to look and feel different from the sample [Island Jump](https://www.roblox.com/games/14239096301/) experience.

## Create the Island

The first step in creating your environment is to create a small island that players will spawn to when they start the experience, and when their health reaches zero after they fall off a platform. Using the Terrain Editor's **Draw** tool, you can click and drag anywhere within the viewport to generate a large sphere of terrain to start the island, which you can later shape and flatten for a wide surface area.

To create the island:

1. In the menu bar, navigate to the **Home** tab, then click the **Terrain Editor** button. The **Terrain Editor** window displays.

   <img src="../../../assets/studio/general/Home-Tab-Terrain-Editor.png"
   width="800" />

1. In the **Terrain Editor** window, click the **Edit** tab, then the **Draw** button.

   <img src="../../../assets/studio/terrain-editor/Edit-Tab-Draw.png" width="360" />

1. In the **Brush Settings** and **Material Settings** sections, keep all default setting except for the following:

   <Grid container spacing={0} alignItems="flex-start">
    <Grid item>
   <img src="../../../assets/tutorials/create-an-environment-with-terrain/Terrain-Editor-Draw-Settings.png" width="360" />
   </Grid>
    <Grid item>
    - Set **Base Size** to **32**.
    - Set **Material** to **Sand**.
   </Grid>
   </Grid>

1. In the viewport, click near the spawn location in the viewport. A sphere of sand material displays.

   <video controls loop muted>
   <source src="../../../assets/tutorials/create-an-environment-with-terrain/Terrain-Adding-First-Sphere.mp4" />
   </video>

<Alert severity="info">
   If you cannot see the sphere, try zooming your camera out until your spawn location is smaller.
</Alert>

## Shape the Island

If you keep the island in its current shape, players would have a difficult time navigating without falling off the island. Using the Terrain Editor's **Flatten** tool, you can click and drag on the sphere to evenly level the terrain on a fixed plane, and provide players a relatively flat surface as they start your experience. While this shape initially looks unnatural, you can also use the Terrain Editor's **Sculpt** tool around the edges of the island to ensure it looks organic and realistic.

To shape the island:

1. In the **Terrain Editor** window, click the **Flatten** button.

   <img src="../../../assets/studio/terrain-editor/Edit-Tab-Flatten.png" width="360" />

1. In the **Brush Settings** section, keep all default setting except for the following:

   <Grid container spacing={0} alignItems="flex-start">
    <Grid item>
   <img src="../../../assets/tutorials/create-an-environment-with-terrain/Terrain-Editor-Flatten-Settings.png" width="360" />
   </Grid>
    <Grid item>
    - Set **Base Size** to **18**.
    - Enable **Fixed Plane**. New settings display.
    - Set **Plane Position** to **0**.
   </Grid>
   </Grid>

1. In the viewport, click and drag your mouse around the sphere until it's completely flat on
   top.

   <video controls loop muted>
   <source src="../../../assets/tutorials/create-an-environment-with-terrain/Terrain-Flattening-Sphere.mp4" />
   </video>

1. Navigate back to the **Terrain Editor** window, then click the **Sculpt** button.

   <img src="../../../assets/studio/terrain-editor/Edit-Tab-Sculpt.png" width="360" />

1. In the **Brush Settings** and **Material Settings** sections, set **Material** to **Sand**, otherwise keep all default settings.

   <img src="../../../assets/tutorials/create-an-environment-with-terrain/Terrain-Editor-Sculpt-Settings.png" width="360" />

1. In the viewport, click and drag your mouse around the island's edges and below the water line to make
   the island look more natural.

   <video controls loop muted>
   <source src="../../../assets/tutorials/create-an-environment-with-terrain/Terrain-Sculpting-Edges.mp4" />
   </video>

<Alert severity="info">
   The **Draw** tool adds or subtracts material based on the brush's position, whereas the **Sculpt** tool only
   grows or erodes existing terrain.
</Alert>

## Create Water

While there are multiple ways to generate a large body of water, the following instructions utilize the
Terrain Editor's **Fill** tool. This method allows you to replace any material in a specific region with another
material, including air itself.

To create the water around the island:

1. In the **Terrain Editor** window, click the **Fill** button.

   <img src="../../../assets/studio/terrain-editor/Edit-Tab-Fill.png" width="360" />

1. In the **Selection Settings** section,
   1. Set **Position** to **0, -15, 0** to ensure the water fills below the top of the island.
   1. Set **Size** to **1800, 5, 1800** to ensure the water fills toward the horizon of your experience.
1. In the **Material Settings** section, configure the tool with the following settings:

   <Grid container spacing={0} alignItems="flex-start">
    <Grid item>
   <img src="../../../assets/tutorials/create-an-environment-with-terrain/Terrain-Editor-Fill-Settings.png" width="360" />
   </Grid>
   <Grid item>
    - Set **Material Mode** to **Replace**.
    - Set **Source Material** to **Air**.
    - Set **Target Material** to **Water**.
   </Grid>
   </Grid>

1. Click the **Apply** button. Water generates around the island.

   <video controls loop muted>
   <source src="../../../assets/tutorials/create-an-environment-with-terrain/Terrain-Filling-Water.mp4" />
   </video>

## Apply Materials

Now that you have the basis of your island, you can customize its appearance with different materials. Using the Terrain Editor's **Paint** tool,
you can click and drag on your terrain to apply both a grassy surface and blades of grass to the middle of the island's surface.

To apply materials to the island:

1. In the **Terrain Editor**, click the **Paint** button.

   <img src="../../../assets/studio/terrain-editor/Edit-Tab-Paint.png" width="360" />

1. In the **Brush Settings** and **Material Settings** sections, keep all default setting except for the following:

   <Grid container spacing={0} alignItems="flex-start">
    <Grid item>
   <img src="../../../assets/tutorials/create-an-environment-with-terrain/Terrain-Editor-Paint-Settings.png" width="360" />
   </Grid>
   <Grid item>
    - Set **Material Mode** to **Paint**.
    - Set **Material** to **Leafy Grass**.
   </Grid>
   </Grid>

1. In the viewport, click and drag around the middle of the island to apply the leafy grass material.

   <video controls loop muted>
   <source src="../../../assets/tutorials/create-an-environment-with-terrain/Terrain-Painting-Grass.mp4" />
   </video>

1. Navigate back to the **Terrain Editor** window, then in the **Brush Settings** and **Material Settings** sections,
   1. Set **Base Size** to **3**.
   1. Set **Material** to **Grass**.
1. In the viewport, drag along the edges of the island to apply blades of grass, leaving space in the middle of the island for
   the spawn location and the initial platforms.
1. In the **Explorer** window, select the **SpawnLocation** object.
1. In the **Home** tab, select the **Move** tool.
1. In the viewport, move the spawn location toward the edge of the island to make space for the first platform. The sample [Island Jump - Building](https://www.roblox.com/games/14239096301/Island-Jump-Building) `.rbxl` file uses a position of **-127, -3, 9**.

   <video controls loop muted>
   <source src="../../../assets/tutorials/create-an-environment-with-terrain/create-an-environment-with-terrain-spawn.mp4" />
   </video>

<Alert severity="info">
   You can create completely custom material appearance using [Material
   Overrides](/parts/materials#material-overrides), which allow you to provide
   custom texture assets to replace any default terrain texture.
</Alert>

## Playtest

Once you are happy with your island's appearance, you can playtest your experience to check the scale of the island and how it
feels in the context of your experience's 3D world.

To playtest your experience:

1. In the menu bar, click the **Play** button. Studio enters playtest mode.

   <img src="../../../assets/studio/general/Quick-Access-Toolbar-Play.png"
   width="800" />

1. Walk around the island and check out how it looks while playing. When you're
   done, navigate back to the menu bar and click the **Stop** button. Studio exits playtest mode.

   <img src="../../../assets/studio/general/Quick-Access-Toolbar-Stop.png"
   width="800" />
   <video controls loop muted>
   <source src="../../../assets/tutorials/create-an-environment-with-terrain/create-an-environment-with-terrain-walking.mp4" />
   </video>

   <Alert severity="warning">
   If your character faces a different direction than expected upon spawning, such as out toward the ocean instead of toward the center of the island, rotate the `Class.SpawnLocation` object and playtest again, repeating the process until the character spawns in the appropriate direction.
   </Alert>

In the next section of the tutorial, you will learn how to create a playable area for players to follow in order to reach the highest platform.
