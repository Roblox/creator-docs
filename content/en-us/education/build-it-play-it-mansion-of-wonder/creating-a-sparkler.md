---
title: Creating a Sparkler
prev: /education/build-it-play-it-mansion-of-wonder/next-steps
description: Learn how to attach a particle emitter to a player-carried tool in Roblox Studio. Once you are finished, Earn the fourth set of rewards in Roblox's Build It Play It Mansion of Wonders -- the Head Slime avatar item and Glimmer and Gumption badge.
---

You've learned the basics of particles, now apply those skills to design a sparkler that can be carried around by people. Just like blasts, the particles can be customized for different effects, like magical stars or raging flames.

In addition to the properties covered in the Build It, Play It challenge, this tutorial will use color gradients which allows particles to change colors over time, like from blue to yellow as seen in the video. The sparklers can be used with the Mansion of Wonder template or any other experience you've created.

<video controls src="../../assets/education/build-it-play-it-mansion-of-wonder/creating-a-sparkler/final-example.mp4"></video>

## Finding a Tool

For this tutorial, sparklers are **tools** with attached particle effects. In Roblox, tools are items players equip; if you've played an experience with a sword or gun, it's likely you've used tools before.

To start, add the pre-made sparkler set into your existing experience. You'll then choose one and customize its particle emitter.

1. Start by going to the [Sparkler Set](https://www.roblox.com/library/6971223240/) webpage. On the page, click the **Get** button and follow the prompts. This adds the set into your Inventory, which is accessed in the Toolbox.

   <img src="../../assets/education/build-it-play-it-mansion-of-wonder/creating-a-sparkler/get-sparklers.png" />

2. In Roblox Studio, find the **Toolbox**. If it's not open, go to the View tab and click the Toolbox button.

   <img src="../../assets/education/build-it-play-it-mansion-of-wonder/creating-a-sparkler/open-toolbox.png" />

3. In the **Toolbox** window, click the icon for **Inventory**.

   <img src="../../assets/education/build-it-play-it-mansion-of-wonder/creating-a-sparkler/set-to-inventory.png" />

4. Make sure the left dropdown is set to **My Models**. Then, find and click on **Sparkler Set**. This will add the parts into your experience.

   <img src="../../assets/education/build-it-play-it-mansion-of-wonder/creating-a-sparkler/show-sparklers.jpeg" />

## Creating the Particle

Each sparkler comes with a customizable particle emitter. Follow the steps to find the particle, change its texture, and then create the color gradient.

1. Select one of the pre-made tools. In the **Explorer**, find the highlighted part. Then, click the **>** arrows to expand until you find **Attachment** and select **SparklerParticle**.

   <img src="../../assets/education/build-it-play-it-mansion-of-wonder/creating-a-sparkler/click-sparkler-particles.gif" />

2. Change the Texture property. Some texture ID's are included below.

   <GridContainer numColumns="3">
     <figure>
       <img src="../../assets/education/build-it-play-it-mansion-of-wonder/using-textures/star-1.png" />
       <figcaption>5860841663</figcaption>
     </figure>
     <figure>
       <img src="../../assets/education/build-it-play-it-mansion-of-wonder/using-textures/swirl.png" />
       <figcaption>5857851812</figcaption>
     </figure>
     <figure>
       <img src="../../assets/education/build-it-play-it-mansion-of-wonder/using-textures/heart.png" />
       <figcaption>5857851618</figcaption>
     </figure>
     <figure>
       <img src="../../assets/education/build-it-play-it-mansion-of-wonder/using-textures/circle.png" />
       <figcaption>6711256324</figcaption>
     </figure>
     <figure>
       <img src="../../assets/education/build-it-play-it-mansion-of-wonder/using-textures/smoke.png" />
       <figcaption>5833235272</figcaption>
     </figure>
     <figure>
       <img src="../../assets/education/build-it-play-it-mansion-of-wonder/using-textures/star-2.png" />
       <figcaption>6772783963</figcaption>
     </figure>
     <figure>
       <img src="../../assets/education/build-it-play-it-mansion-of-wonder/using-textures/spark.png" />
       <figcaption>5833323391</figcaption>
     </figure>
     <figure>
       <img src="../../assets/education/build-it-play-it-mansion-of-wonder/using-textures/circle-2.png" />
       <figcaption>5857892330</figcaption>
     </figure>
     <figure>
       <img src="../../assets/education/build-it-play-it-mansion-of-wonder/using-textures/scratch.png" />
       <figcaption>5857892405</figcaption>
     </figure>
     <figure>
       <img src="../../assets/education/build-it-play-it-mansion-of-wonder/using-textures/trace.png" />
       <figcaption>5857931724</figcaption>
     </figure>
     <figure>
       <img src="../../assets/education/build-it-play-it-mansion-of-wonder/using-textures/triangle.png" />
       <figcaption>5857851618</figcaption>
     </figure>
     <figure>
       <img src="../../assets/education/build-it-play-it-mansion-of-wonder/using-textures/star-3.png" />
       <figcaption>5860841737</figcaption>
     </figure>
   </GridContainer>

   When finished, a tool may look like the example below.

   <img src="../../assets/education/build-it-play-it-mansion-of-wonder/creating-a-sparkler/show-texture.jpeg" />

3. Find the **Color** property and click anywhere in the row next to its name. Then, press the **...** to open the Color Sequence editor. You'll learn how to edit the color in the next section.

   <img src="../../assets/education/build-it-play-it-mansion-of-wonder/creating-a-sparkler/select-color-property.png" />

## Creating a Color Gradient

Each **arrow** on the color sequence represents a different color. Colors can be changed, added, removed, or moved around. Use a combination of techniques to create a color gradient, like the example below.

<img src="../../assets/education/build-it-play-it-mansion-of-wonder/creating-a-sparkler/final-example.jpeg" />

### Changing a Color

Under the color sequence, select an **arrow** <img src="../../assets/education/build-it-play-it-mansion-of-wonder/creating-a-sparkler/non-selected-arrow.png" width="14px" />. Then, click the **Color** button to open the color picker and set a new color. Note that arrows are yellow when selected.

<img src="../../assets/education/build-it-play-it-mansion-of-wonder/creating-a-sparkler/select-color.png" />

### Adding or Removing Colors

To add a color, click on the color sequence. This adds a new arrow that can be clicked. To remove a color, click on an arrow and click the **Delete** button on the screen.

<video controls src="../../assets/education/build-it-play-it-mansion-of-wonder/creating-a-sparkler/add-delete-colors.mp4"></video>

### Moving Colors

To move a color, click on any arrow other than the start or end arrows and drag it to a new area.

<video controls src="../../assets/education/build-it-play-it-mansion-of-wonder/creating-a-sparkler/move-colors.mp4"></video>

### Improving the Particle

After creating a color gradient, use your knowledge from the previous lessons to change properties like **Size** and **Speed** to get the particular effect you want.

## Finishing the Sparkler

So players can have the sparkler when the experience starts, you'll need to move it to the StarterPack. This folder holds all items a player receives when they join.

1. In the **Explorer**, find the **tool** of your choice, such as Staff Sparkler or Torch Sparkler. Right click on that tool and select **Cut**. This copies the staff to your clipboard, but also deletes.

   <img src="../../assets/education/build-it-play-it-mansion-of-wonder/creating-a-sparkler/cut-staff.gif" />

2. Scroll down in the Explorer until you find the StarterPack. Right click on it and select Paste Into to add the tool.

   <img src="../../assets/education/build-it-play-it-mansion-of-wonder/creating-a-sparkler/paste-staff.gif" />

3. Playtest project, and select the sparkler from your backpack by pressing `1` on your keyboard. Note that you can repeat this process to make more sparklers.

   <video controls src="../../assets/education/build-it-play-it-mansion-of-wonder/creating-a-sparkler/final-staff.mp4"></video>

   <Alert severity="info">
   Each sparkler has a name that's shown to players in the experience. To rename a sparkler, in the Explorer, right click on it the tool and select **Rename**.
    </Alert>

## Challenge Checkpoint

You got your animation ready! Celebrate your new skills by getting the **Head Slime** avatar item and **Glimmer and Gumption** badge.

<img src="../../assets/education/build-it-play-it-mansion-of-wonder/creating-a-sparkler/avatar-items.jpeg" />

1. Copy the code below to start.

   `Glimmer`

2. Click **Enter World** below to open a Roblox experience. In the experience, interact the in-game character and click **REDEEM CODE**. Use the code on this page to get your item.

   <a href="https://www.roblox.com/games/6901029464/">
   <Button variant="contained">Enter World</Button>
   </a>
