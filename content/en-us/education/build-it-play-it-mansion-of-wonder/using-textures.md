---
title: Use textures
prev: /education/build-it-play-it-mansion-of-wonder/challenge-checkpoint
next: /education/build-it-play-it-mansion-of-wonder/finish-the-blast
description: Learn how to customize and change the texture of particle emitters in Roblox Studio as part of the Build It Play It Mansion of Wonder.
---

Every particle created by a particle emitter, such as white sparks or fire, is actually a picture. In Roblox Studio, these pictures are called **textures**, which can be any 2D visual, like a symbol or even something you've drawn.

For example, notice in the video below how a single texture is changed and repeated to create an effect.

<video controls src="../../assets/education/build-it-play-it-mansion-of-wonder/using-textures/particle-texture-example.mp4" width="100%"></video>

## Change the blast texture

1. A starter pack of textures has been provided. Pick one you want to use for your blast and **copy** the **number** beneath its image below.

   <Alert severity="info">
   These textures are used for both your blast and explosion. Before moving on, take a moment to think of you want different textures or the same.
   </Alert>

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

2. Make sure the emitter is selected, then in the **Properties** window, find the **Texture** property.

   <img src="../../assets/education/build-it-play-it-mansion-of-wonder/using-textures/show-texture-property.png" />

   <Alert severity="warning">

   If you can't see the properties shown in the picture above, you may need to reselect the emitter. To do so, in the Explorer search bar, type BlastParticles and then select the BlastParticles emitter.

   </Alert>

3. Click in the **Texture** row to highlight the text. Press <kbd>Ctrl</kbd><kbd>V</kbd> (<kbd>⌘</kbd><kbd>V</kbd>) to paste in the previously copied ID and then press Enter. Your particle emitter now emits particles that look like your texture.

   <img src="../../assets/education/build-it-play-it-mansion-of-wonder/using-textures/paste-texture.png" width="38%" />

   For example, if you use the `5833323391` texture, your particles will look like the example below.

   <img src="../../assets/education/build-it-play-it-mansion-of-wonder/using-textures/texture-changed.png" width="40%" />
