---
title: Material Generator
description: The Material Generator is designed to create material variants from text entries.
---

The **Material Generator** is designed to create material variants from text entries. Using it, you can type any phrase and hit **Generate** to see results within a few seconds. Once you find a satisfying result, you can instantly save it as a new custom material.

## Generate materials

To generate materials, open the **Material Generator** from Studio's **Window**&nbsp;⟩ **3D** menu, or click **Generate** from the [Material](../parts/materials.md#material-widget) widget's picker popup.

With the tool's window open:

1. In the text box at the top of the window, enter keywords and then click the **Generate** button. See [Best Practices](#best-practices) for guidelines.

   As follows are some example keyword combos and the approximate results. Note that every click of **Generate** yields different results, even with the exact same keywords.

   <Tabs>
   <TabItem label="Example 1">
      <p>"Stained Glass"</p>
      <GridContainer numColumns="4">
      <img src="../assets/modeling/materials/Material-Generator-Example-2D.jpg" />
      <img src="../assets/modeling/materials/Material-Generator-Example-2C.jpg" />
      <img src="../assets/modeling/materials/Material-Generator-Example-2A.jpg" />
      <img src="../assets/modeling/materials/Material-Generator-Example-2B.jpg" />
      </GridContainer>
   </TabItem>
   <TabItem label="Example 2">
      <p>"Rainbow Pebbles Pile Matte Finish"</p>
      <GridContainer numColumns="4">
      <img src="../assets/modeling/materials/Material-Generator-Example-1A.jpg" />
      <img src="../assets/modeling/materials/Material-Generator-Example-1B.jpg" />
      <img src="../assets/modeling/materials/Material-Generator-Example-1C.jpg" />
      <img src="../assets/modeling/materials/Material-Generator-Example-1D.jpg" />
      </GridContainer>
   </TabItem>
   <TabItem label="Example 3">
      <p>"Rusted Metal Charred"</p>
      <GridContainer numColumns="4">
      <img src="../assets/modeling/materials/Material-Generator-Example-3A.jpg" />
      <img src="../assets/modeling/materials/Material-Generator-Example-3B.jpg" />
      <img src="../assets/modeling/materials/Material-Generator-Example-3C.jpg" />
      <img src="../assets/modeling/materials/Material-Generator-Example-3D.jpg" />
      </GridContainer>
   </TabItem>
   <TabItem label="Example 4">
      <p>"Japanese Cherry Blossom Fabric"</p>
      <GridContainer numColumns="4">
      <img src="../assets/modeling/materials/Material-Generator-Example-4C.jpg" />
      <img src="../assets/modeling/materials/Material-Generator-Example-4B.jpg" />
      <img src="../assets/modeling/materials/Material-Generator-Example-4A.jpg" />
      <img src="../assets/modeling/materials/Material-Generator-Example-4D.jpg" />
      </GridContainer>
   </TabItem>
   </Tabs>

2. Click a generated image tile to view more options, as well as apply the material in "preview" mode to all selected parts.

   <Grid container spacing={2}>
   <Grid item><img src="../assets/modeling/materials/Material-Generator-Expanded-Options.png" width="240" /></Grid>
   <Grid item><img src="../assets/modeling/materials/Material-Generator-Preview-On-Part.jpg" width="540" /></Grid>
   </Grid>

3. Adjust the **Studs Per Tile** slider to interactively preview how the material's texture will appear on the selected parts. Additionally, test out the **Organic** toggle which makes materials appear less "repetitive" by randomizing the output.

   <figure>
   <video src="../assets/modeling/materials/Material-Generator-Preview.mp4" controls width="100%" alt="Adjustment of Studs Per Tile value and Organic toggle" />
   <figcaption>Adjustment of **Studs Per Tile** value and **Organic** toggle</figcaption>
   </figure>

4. When ready, choose a **Base Material** to apply that material's [default physical properties](../parts/materials.md#default-physical-properties) to your custom material. Then click the **Save & Apply Variant** button to save the custom material to the [Material Manager](../parts/materials.md#material-manager).

## Best practices

Generating satisfying materials can be an iterative process requiring a longer list of descriptors to help focus in on the material you want. Here are some tips:

- For close-up patterns, try using terms like "close&nbsp;up," "top down," and "texture."
- For simpler repeating patterns, try using terms like "simple," "pattern," "symmetrical," and "flat."
- For more control, add stylistic terms like "photorealistic," "cartoon," or "hand-drawn."
- For the ability to change colors, try including terms like "grayscale" which will allow you to tint the material afterwards.
