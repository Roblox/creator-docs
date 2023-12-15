---
title: Connect the Beam
prev: /education/build-it-play-it-mansion-of-wonder/creating-engaging-experiences
next: /education/build-it-play-it-mansion-of-wonder/using-particles-for-actions
description: Learn how to connect a beam effect in Roblox Studio, and to configure it's properties to customize it to your game's needs. Part of the Build It Play It Mansion of Wonders series.
---

Now that you've made the attachments, it's time to connect them to the beam so that a texture can be shown.

1. Under TestPlayer, select the **TutorialBeam**. In Properties, find **Attachment0**. Click the empty box to the right of the property. Then, in Explorer, find TestPlayer and click on **PlayerAttachment**.

   <video controls src="../../assets/education/build-it-play-it-mansion-of-wonder/connect-the-beam/attachment0-to-player.mp4" ></video>

2. In the TutorialBeam properties, set **Attachment1** to the attachment you created in GoalPart1, the **GoalAttachment**.

   <img src="../../assets/education/build-it-play-it-mansion-of-wonder/connect-the-beam/set-goal-attachment.png"  />

## Adjusting the Beam

By default, a beam doesn't always face the camera. This may lead to situations where players are unable to see a beam from different angles. This can be fixed by turning on a property called **FaceCamera**.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/education/build-it-play-it-mansion-of-wonder/connect-the-beam/face-camera-off.jpeg" />
    <figcaption>FaceCamera Off</figcaption>
  </figure>
  <figure>
    <img src="../../assets/education/build-it-play-it-mansion-of-wonder/connect-the-beam/face-camera-on.jpeg" />
    <figcaption>FaceCamera On</figcaption>
  </figure>
</GridContainer>

1. Make the beam visible at any position by going into the beam's properties and enabling **FaceCamera**.

   <img src="../../assets/education/build-it-play-it-mansion-of-wonder/connect-the-beam/set-face-camera.png"  />

   Once finished, you should see a white beam between the player and goal, regardless of camera angle.

   <img src="../../assets/education/build-it-play-it-mansion-of-wonder/connect-the-beam/default-beam.jpeg"  />

## Making the Tutorial Arrows

The image displayed along the beam can be customized by changing its 2D texture. In addition, beams have a variety of visual options, such as texture, color, motion that can be modified.

1. To stream arrows along the beam like in the example, copy `5886559421` and paste it into the beam's **Texture** property.

   <video controls src="../../assets/education/build-it-play-it-mansion-of-wonder/connect-the-beam/beam-texture-change.mp4" ></video>

   <Alert severity="info">
   Custom textures can be any image that you have. Learn to upload them in the [Asset Manager](../../projects/assets/manager.md) article.
   </Alert>

2. Right now, the arrow's texture is stretched. Set **TextureMode** to **Static** to make the arrow repeat at its original size.

   <GridContainer numColumns="2">
     <img src="../../assets/education/build-it-play-it-mansion-of-wonder/connect-the-beam/show-static-beam.jpeg" />
     <img src="../../assets/education/build-it-play-it-mansion-of-wonder/connect-the-beam/set-texture-mode.png" />
   </GridContainer>

   <Alert severity="warning">
   If the arrow doesn't point the correct direction, attachments may be swapped. Make sure that Attachment0 connects to PlayerAttachment and Attachment1 to GoalAttachment. Alternatively, if you're using a custom texture, you may need to mirror the image in a photo-editing program.
   </Alert>

3. Modify beam properties like **Color**, **LightEmission**, and **TextureSpeed** to design something that feels eye-catching and appealing. Below is just one example.

   <video controls src="../../assets/education/build-it-play-it-mansion-of-wonder/connect-the-beam/finished-beam-example.mp4"></video>

### Tips for Color Choices

**Color** is one opportunity for improving a first time user experience. For example, contrasting or saturated colors get more attention, making it easier to inform players where to look on their screen.

Additionally, as you design, consider [accessibility](../../production/publishing/accessibility.md) for your players. Some players may struggle to see certain color combinations, making it important that colors appeal to the broadest audience.
