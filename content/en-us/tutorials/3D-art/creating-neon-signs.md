---
title: Creating Neon Signs
description: Explains how to create neon signage to draw attention to something in an experience.
---

**Neon signs** are bright and colorful electric signage that draws attention to something within an experience, such as where users can enter a building or purchase an item. By combining modeling and lighting techniques, you can create and use neon signs to elevate the immersion within your environments.

<img width="80%" img src="../../assets/tutorials/creating-neon-signs/Overview.jpg" />

As with all 3D creation, there are many ways to achieve any particular goal. In this guide, you can quickly create your own neon sign using tools and methods available only within Studio with only a few basic assets, including a [`.obj`](../../assets/tutorials/creating-neon-signs/open-text.obj) file for the 3D text of the sign model.

In the following method to create a neon sign, follow each section to learn how to:

- Create the signage's backboard and border with basic parts.
- Shape the sign using Studio's solid modeling tools.
- Incorporate 3D text with your sign and save the sign as a model.

<Alert severity="info">
   You can create your own assets in third-party modeling tools and follow along with your own design. For information on exporting models for use in Studio, see [Exporting Requirements](../../art/modeling/export-requirements.md).
</Alert>

## Creating the Backboard and Border

A `Class.Part` is Roblox's primary building block that you can move, resize, rotate, and customize to change their appearance, such as their color and material. Using [basic parts](../../parts/index.md) to create the foundation of neon signs is useful because the signage's backboard and border only require basic shapes.

To create the backboard and border:

1. In the menu bar, select the **Model** tab.
1. In the **Parts** section, click the dropdown arrow and select **Block**. A block part displays in the workspace that's about to become the backboard of your neon sign.

   <img width="50%" img src="../../assets/tutorials/creating-neon-signs/Add-Block.jpg" />

1. In the **Explorer** window, select the block, then in the **Properties** window,

   1. Set **BrickColor** to **Black**.
   1. Set **Size** to **[8,4,1]**.
   1. Set **Name** to **Backboard**.
   1. Enable the **Anchored** property.

      <img width="50%" img src="../../assets/tutorials/creating-neon-signs/Backboard.jpg" />

1. In the **Explorer** window, select **Backboard**, then press <kbd>Ctrl</kbd><kbd>D</kbd> (<kbd>⌘</kbd><kbd>D</kbd>) to duplicate the part.
1. In the menu bar, select the **Move** tool and use one of the axis arrows to pull the duplicate backboard part away from the original position so you can see each object.
1. In the **Explorer** window, select the duplicate backboard part that's about to become the border of your neon sign, then in the **Properties** window,

   1. Set **BrickColor** to **Lime Green**.
   2. Set **Size** to **[7.75, 3.75, 0.25]**.
   3. Set **Name** to **Border**.

      <img width="50%" img src="../../assets/tutorials/creating-neon-signs/Border.jpg" />

1. In the **Explorer** window, select **Border**, then press <kbd>Ctrl</kbd><kbd>D</kbd> (<kbd>⌘</kbd><kbd>D</kbd>) to duplicate the part. **Do not move this new part** because it needs to be in its current position for the next sculpting step.

Now that you have three parts that make up the basic shapes of your neon sign, you can sculpt the border's shape.

## Shaping the Neon Border

Using [solid modeling](../../parts/solid-modeling.md), you can join and separate parts in unique ways to form more complex shapes known as **unions**. This process enables you to resize and modify the duplicate border part to become the neon border.

To create the neon border shape:

1. In the **Explorer** window, select the duplicate border part, then in the **Properties** window, set the **Size** to **[7.5, 3.5, 1.0]**.

   <img width="50%" img src="../../assets/tutorials/creating-neon-signs/Duplicate-Border.jpg" />

1. With the duplicate border part still selected, in the menu bar, navigate to the **Solid Modeling** section and select **Negate**. The border part turns translucent and its **Name** property automatically changes to **NegativePart**.

   <img width="50%" img src="../../assets/tutorials/creating-neon-signs/Negate-Tool.jpg" />

1. With **NegativePart** still selected, hold <kbd>Ctrl</kbd>/<kbd>⌘</kbd> and click on the original border part to select both parts at the same time.

   <img width="50%" img src="../../assets/tutorials/creating-neon-signs/NegativePart.jpg" />

1. In the menu bar, select **Union** to fuse both parts together. A border-shaped part displays, and the **Name** property automatically changes to **Union**.

   <img width="50%" img src="../../assets/tutorials/creating-neon-signs/Union-Tool.jpg" />

1. In the **Explorer** window, select the union, then in the **Properties** window,

   1. Set **Name** to **Border**. This helps organize all objects within the workspace.
   1. Set **Material** to **Neon**. This allows the part to glow.

1. In the menu bar, select the **Move** tool and use one of the axis arrows to pull **Border** in front of **Backboard**.

   <GridContainer numColumns="2">
     <img src="../../assets/tutorials/creating-neon-signs/Moving-Border.jpg" />
     <img src="../../assets/tutorials/creating-neon-signs/Border-Moved.jpg" />
   </GridContainer>

Now that you have a complete backboard and a glowing neon border, you can create extruding neon 3D text for the words of the sign.

## Incorporating Neon 3D Text

Since Studio doesn't natively support 3D text, this guide provides an open-text.obj file for you to import into your scene that contains a 3D model of text that spells the word "OPEN". You can also use other methods to create 3D texts or custom designs for this process, such as using your own models from third-part modeling software, working with community plugins, or creating your own text manually in Studio through solid modeling.

To incorporate neon 3D text from the [open-text](../../assets/tutorials/creating-neon-signs/open-text.obj) `.obj` file:

1. Import the **open-text** `.obj` file.

   1. In the menu bar, navigate to the **Home** tab, then click **Import 3D**. A file browser displays.

      <img src="../../assets/studio/general/Home-Tab-Import-3D.png" width="780" alt="Import 3D button indicated in Home tab" />

   1. Select the **open-text** `.obj` file, then click the **Open** button. The **Import Preview** window displays.
   1. Keep the default import settings, then click the **Import** button. The open text models display within the viewport.

1. In the menu bar, select the Move tool and use one of the axis arrows to center the text on the sign.

   <img width="50%" img src="../../assets/tutorials/creating-neon-signs/Final-Sign.jpg" />

1. In the **Properties** window,

   1. Set **Color** to **[170,0,0]**.
   1. Set **Material** to **Neon**.

1. In the **Explorer** window, select the text models, **Border**, and **Backboard**, then press <kbd>Ctrl</kbd><kbd>G</kbd> (<kbd>⌘</kbd><kbd>G</kbd>) to group them into a single `Class.Model` object.

   <Alert severity="info">
      For a reference of what this neon sign looks like within Studio, you can download the [base project file](../../assets/tutorials/creating-neon-signs/neon-sign-baseplate.rbxl) and compare it to your model.
   </Alert>

1. Rename the new model to **NeonSign**.
1. In the **Explorer** window, right-click **NeonSign**. A contextual menu displays.
1. Select **Save to Roblox**.

After you save the asset in your [Toolbox](../../projects/assets/toolbox.md), you can use it within any of your experiences. In addition, you can [publish your asset](../../production/publishing/publishing-assets.md) to the [Creator Store](../../production/publishing/creator-store.md) to make it publicly available to all creators to use within their experiences too.
