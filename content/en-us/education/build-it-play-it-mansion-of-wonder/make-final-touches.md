---
title: Make final touches
prev: /education/build-it-play-it-mansion-of-wonder/challenge-checkpoint-2
next: /education/build-it-play-it-mansion-of-wonder/invite-friends
description: Learn how to fine tune your particle emitters in Roblox Studio by adjusting their size, speed, light emission, rotational speed, and lifetime. Part of the Build It Play It Mansion of Wonder series.
---

Make your explosion feel more unique by customizing more properties.

## Size and speed

Start by changing these two properties to achieve your vision.

1. In the explosion properties, change **Size** to a number between `1` and `10` for best results. Different particle textures may work better with different sizes.

   <img src="../../assets/education/build-it-play-it-mansion-of-wonder/make-final-touches/change-explode-size.png" width="40%" />

   Some example sizes can be seen in the video below.

   <video controls src="../../assets/education/build-it-play-it-mansion-of-wonder/make-final-touches/size-comparison.mp4"></video>

2. Particles can burst out quickly, or creep out slowly. To experiment with this speed, scroll down to the **Emission** section and find **Speed**. We recommend trying a number between `10` (slow) and `100` (fast).

   <img src="../../assets/education/build-it-play-it-mansion-of-wonder/make-final-touches/change-speed.png" width="40%" />

3. When finished, run the project to test the particle. Make changes to the design until it looks right to you.

   <video controls src="../../assets/education/build-it-play-it-mansion-of-wonder/make-final-touches/explosion-final.mp4"></video>

## Additional properties

You've experimented with basic properties of the magic blast and the explosion from your blaster, but there are a few more properties to personalize your work. Try changing the properties below, or experiment with one that isn't listed.

### LightEmission

Makes particles glow and can be a range from `0` (opaque) to `1` (glowing).

<GridContainer numColumns="3">
  <figure>
    <img src="../../assets/education/build-it-play-it-mansion-of-wonder/make-final-touches/light-emission-0.jpeg" />
    <figcaption>0</figcaption>
  </figure>
  <figure>
    <img src="../../assets/education/build-it-play-it-mansion-of-wonder/make-final-touches/light-emission-0.5.jpeg" />
    <figcaption>0.5</figcaption>
  </figure>
  <figure>
    <img src="../../assets/education/build-it-play-it-mansion-of-wonder/make-final-touches/light-emission-1.0.jpeg" />
    <figcaption>1.0</figcaption>
  </figure>
</GridContainer>

### RotSpeed

Makes particles rotate over time. Notice how the rotation of the texture below (straight lines) changes as the RotSpeed changes.

<video controls src="../../assets/education/build-it-play-it-mansion-of-wonder/make-final-touches/rotation-speed.mp4"></video>

### Lifetime

This property is how long particles exist in seconds. Depending on your explosion, you may want a short lifetime (e.g. 0.5 seconds) for a quick, snappy blast, or a longer number (e.g. 2 seconds) for something that lingers.

<video controls src="../../assets/education/build-it-play-it-mansion-of-wonder/make-final-touches/lifetime.mp4"></video>

### Randomized numbers

Randomizing properties can make particles feel less repetitive. You can add randomization to some particles properties, such as **Lifetime** and **Rotation**, by inputting a minimum and maximum value.

1. To use a randomized property, click the small arrow next to the property name. Once the property expands, you can enter a min and max value.

   <img src="../../assets/education/build-it-play-it-mansion-of-wonder/make-final-touches/show-random-options.png" width="40%" />

   <Alert severity="info">
   Using your new knowledge with explosions, take some time to also **improve the blast particle**. Experiment with properties like Lifetime. Remember, the blast emitter can be found by searching for `BlastParticles` in the **Explorer** window.
   </Alert>
