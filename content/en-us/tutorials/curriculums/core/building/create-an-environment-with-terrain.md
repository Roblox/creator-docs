---
title: Create an environment with terrain
description: Explains how to create the island where players spawn using Studio's terrain tools.
next: /tutorials/curriculums/core/building/greybox-a-playable-area
prev: /tutorials/curriculums/core/building/create-a-project
---

<iframe width="800" height="495" src="https://www.youtube-nocookie.com/embed/_ZW5g7er4Zc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

<br/>

**Creating an environment with terrain** allows you to generate and customize organic materials within the 3D space that look and behave like natural materials from the real world. Using the tools in the [Terrain Editor](../../../../studio/terrain-editor.md), this section teaches you how to generate and sculpt terrain for a small island where players spawn and begin navigating your game.

<Alert severity="info">
This is the one chapter where you must work directly in Studio instead of relying on Assistant. Terrain creation is a creative process, and it's difficult to exactly reproduce brush strokes, shapes, and material edits with AI.

Don't worry if your environment doesn't match the sample [Island Jump](https://www.roblox.com/games/14239096301/) game perfectly. As long as your terrain supports the gameplay and goals of your game, differences in appearance are both normal and expected.
</Alert>

## Create the island

The first step in creating your environment is to create a small island that players will spawn to when they start the game.

1. In the Terrain Editor, click the **Edit** tab and then click the **Draw** tool.
2. Set **Brush Size** to `32`.
3. Set **Source Material** to **Sand**.
4. Click in the viewport near your spawn location to drop a sphere of sand.

<img src="../../../../assets/studio/terrain-editor/Edit-Tab-Draw.png" alt="Studio's Terrain Editor window with both the Edit tab and Draw button highlighted." width="360" />

<video controls loop muted>
<source src="../../../../assets/tutorials/create-an-environment-with-terrain/Terrain-Adding-First-Sphere.mp4" />
</video>

<Alert severity="info">
If you can't see the sphere, zoom your camera out until your spawn location is smaller.
</Alert>

## Shape the island

If you keep the island in its current spherical shape, players would have a difficult time navigating without falling off the island.

1. Switch to the **Flatten** tool.
2. Set **Brush Size** to `18`.
3. Set **Flatten Plane** to **Fixed**.
4. Set **Fixed Y Plane** to `0`.
5. Click and drag across the top of the sphere until you have a level surface.

<video controls loop muted>
<source src="../../../../assets/tutorials/create-an-environment-with-terrain/Terrain-Flattening-Sphere.mp4" />
</video>

Now switch to the **Sculpt** tool. Set **Source Material** to **Sand**. Click and drag your mouse around the island's edges and below the water line to make the island look more natural.

<video controls loop muted>
<source src="../../../../assets/tutorials/create-an-environment-with-terrain/Terrain-Sculpting-Edges.mp4" />
</video>

<Alert severity="info">
The **Draw** tool adds or subtracts material based on the brush's position, while the **Sculpt** tool only grows or erodes terrain that already exists. Use Draw to create new shapes and Sculpt to refine them.
</Alert>

## Create water

To create a large body of water, this tutorial uses the **Fill** tool, which replaces all material within a selected region with another material.

1. Switch to the **Fill** tool.
2. Under **Selection Settings**, set:
    1. **Size** to `1800, 5, 1800` (so the water reaches the horizon).
    2. **Position** to `0, -15, 0` (so the water sits below the top of the island).
3. Under **Material Settings**, set:
    1. **Fill Mode** to **Replace**.
    2. **Source Material** to **Air**.
    3. **Target Material** to **Water**.
4. Click **Replace** to generate the water around the island.

<video controls loop muted>
<source src="../../../../assets/tutorials/create-an-environment-with-terrain/Terrain-Filling-Water.mp4" />
</video>

## Apply materials

Now that you've created the base shape of your island, use the **Paint** tool to apply grass materials to the terrain and give the island a more natural appearance.

1. Switch to the **Paint** tool.
2. Set **Material Mode** to **Paint**.
3. Set **Source Material** to **Leafy Grass**.
4. Drag across the middle of the island to lay down a grassy field, leaving the edges sandy.

<video controls loop muted>
<source src="../../../../assets/tutorials/create-an-environment-with-terrain/Terrain-Painting-Grass.mp4" />
</video>

Add finishing details.

1. Change **Brush Size** to `3`.
2. Change **Material** to **Grass**.
3. Drag along the edges of the leafy area to add visible blades. Make sure to leave space in the center for the spawn location and the first few platforms you'll build in the next chapter.

Finally, position the spawn point.

1. In the **Explorer**, select **SpawnLocation**.
2. Using the **Move** tool from the toolbar, drag the spawn point towards the edge of the island so there's room for a launch platform. The sample game uses a position of `-127, -3, 9`, but anywhere near the edge works.

<video controls loop muted>
<source src="../../../../assets/tutorials/create-an-environment-with-terrain/create-an-environment-with-terrain-spawn.mp4" />
</video>

<Alert severity="info">
For a more custom look, you can replace default terrain textures with custom texture assets using [Material Overrides](/parts/materials#material-overrides).
</Alert>

## Playtest

Once you are happy with your island's appearance, playtest your game to check the scale of the island.

Click **Test** from the dropdown menu in the toolbar and then click **Play**. Run around the island and see how it feels. When you're done, click **Stop**.

<img src="../../../../assets/studio/general/Mezzanine-Testing-Mode-Test.png" width="800" alt="Test option in the testing modes dropdown of Studio's mezzanine." />

<video controls loop muted>
<source src="../../../../assets/tutorials/create-an-environment-with-terrain/create-an-environment-with-terrain-walking.mp4" />
</video>

<Alert severity="warning">
If your character spawns facing the wrong direction, such as toward the ocean instead of the center of the island, rotate the `Class.SpawnLocation` object and playtest again until they spawn the way you want.
</Alert>

Next up, you'll learn how to create a playable area for players to follow in order to reach the highest platform.
