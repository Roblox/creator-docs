---
title: Sculpting Terrain
description: The process for creating realistic landscapes.
prev: /tutorials/building/modeling/applying-surface-images
---

Studio's **terrain tools** let you create realistic landscapes like oceans, mountains, rivers, and canyons. In this tutorial, you'll sculpt a small island in the middle of an open ocean.

<img src="../../../assets/tutorials/sculpting-terrain/introToTerrain-finalExample.jpg" width="1200px" />

## Opening the Terrain Tools

The terrain tools can be opened from the Home tab.

<img src="../../../assets/tutorials/sculpting-terrain/Toggle-Terrain-Editor.png" width="580px" />

## Creating an Ocean

Vast areas of open water can be created with the **Sea Level** tool.

1. In the **Terrain Editor** window, click the **Edit** tab.

   <img src="../../../assets/tutorials/sculpting-terrain/Terrain-Editor-Edit-Tab.png" width="348px" />

2. Select the **Sea Level** tool.

   <img src="../../../assets/tutorials/sculpting-terrain/Terrain-Editor-Sea-Level.png" width="348px" />

3. In the **Size** inputs, change the values to **2000, 100, 2000** and click **Create**.

   <img src="../../../assets/tutorials/sculpting-terrain/Sea-Level-Values.png" width="348px" />

   The blue region will fill with water.

   <img src="../../../assets/tutorials/sculpting-terrain/introToTerrain-oceanBlank.jpg" width="100%" />

<Alert severity="info">
The **Sea Level** tool is just one way to generate large regions of terrain. See the [Generate](../../../parts/terrain.md#generate-tool) tool as an alternative to filling vast areas with land or water.
</Alert>

## Sculpting an Island

### Basic Formation

The **Add** and **Smooth** tools can be used to block out terrain formations, before you start fine-tuning details.

1. Select the **Add** tool.

   <img src="../../../assets/tutorials/sculpting-terrain/Terrain-Editor-Add.png" width="348px" />

2. When adding terrain, you'll see a **grid** appear around your mouse pointer. As you click and drag to create terrain, it will align to the grid. To sculpt the island, aim the camera downward so that the grid is aligned with the water surface.

   <video controls muted>
   <source src="../../../assets/tutorials/sculpting-terrain/introToTerrain_showAddTool_opt.mp4" />
   </video>

3. While rotating the camera to different angles, create a rough island mass by layering terrain on top of the water.

   <video controls muted>
   <source src="../../../assets/tutorials/sculpting-terrain/introToTerrain_addToolIsland_opt.mp4" />
   </video>

4. Select the **Smooth** tool.

   <img src="../../../assets/tutorials/sculpting-terrain/Terrain-Editor-Smooth.png" width="348px" />

5. Drag the brush around the surface of the island to smooth out rough areas.

   <GridContainer numColumns="2">
     <figure>
       <img src="../../../assets/tutorials/sculpting-terrain/introToTerrain-smoothTerrain-smooth.jpg" />
       <figcaption>Smooth</figcaption>
     </figure>
     <figure>
       <img src="../../../assets/tutorials/sculpting-terrain/introToTerrain-smoothTerrain-rough.jpg" />
       <figcaption>Original</figcaption>
     </figure>
   </GridContainer>

### Painting Terrain

To create a more natural looking island, you can use the **Paint** tool to form a sandy beach.

1. Select the **Paint** tool and click on the **Sand** material.

   <img src="../../../assets/tutorials/sculpting-terrain/Terrain-Editor-Paint.png" width="348px" />
   <img src="../../../assets/tutorials/sculpting-terrain/Terrain-Materials-Sand.png" width="348px" />

2. Drag the brush around the edges of the island where the land meets the water.

   <img src="../../../assets/tutorials/sculpting-terrain/introToTerrain-paintSand.jpg" width="100%" />

## Customizing Appearance

Each terrain **material** has a default color, but these can be customized to fit a specific theme like an arctic wasteland or desert. You can also enable **decorations** such as moving grass.

1. In the Explorer window, select the **Terrain** object within **Workspace**.

   <img src="../../../assets/tutorials/sculpting-terrain/Explorer-Terrain-Object.png" width="320px" />

2. In the Properties window, expand the **MaterialColors** branch.

   <img src="../../../assets/tutorials/sculpting-terrain/Properties-Terrain-Materials.png" width="320px" />

3. Enter or select a new RGB value for **Grass** and **Sand** (or any other materials you used) to change the appearance of the island.

   <Grid container spacing={3}>
       <Grid item xs={6}>
            <img src="../../../assets/tutorials/sculpting-terrain/introToTerrain-materialColorChange.jpg" />
       </Grid>
       <Grid item xs={6}>
            <img src="../../../assets/tutorials/sculpting-terrain/Terrain-Colors-Grass.png" />
            <img src="../../../assets/tutorials/sculpting-terrain/Terrain-Colors-Sand.png" />
       </Grid>
   </Grid>

4. Finally, all terrain of the **Grass** material can be decorated with animated blades of grass by toggling on **Decoration**.

   <GridContainer numColumns="2">
     <img src="../../../assets/tutorials/sculpting-terrain/introToTerrain-decoration.jpg" />
     <img src="../../../assets/tutorials/sculpting-terrain/Properties-Terrain-Decoration.png" />
   </GridContainer>
