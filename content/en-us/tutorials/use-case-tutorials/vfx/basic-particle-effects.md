---
title: Basic particle effects
description: The process of creating particles to elevate the visual effects in your experience.
---

**Particles** are used to create a wide range of effects in experiences, from smoke and fire to splashing water. They can help bring your experience to life and can provide valuable visual feedback for your players.

In this tutorial, you will use a `Class.ParticleEmitter` object to create a sparkling effect around a part.

<video controls loop muted>
  <source src="../../../assets/tutorials/basic-particle-effects/basicParticleFinished.mp4" />
</video>

## Particle emitters

The `Class.ParticleEmitter` is a special type of object that will **emit** particles from its position when parented to a part or `Class.Attachment`.

The particles themselves are **2D images** that always face the camera. Particles move or change color according to the emitter's properties. By changing just a few of these, you can make an incredible array of different effects.

The example provided below is a model of a gold nugget. A simple particle effect will be used to make it sparkle.

1. Create a `Class.MeshPart` in the `Class.Workspace` and name it **GoldNugget**.
2. Set the **MeshId** property to `rbxassetid://2903918852`.
3. Set the **Material** property to **Neon** and the **Color** property to `255, 180, 0`.

   <img alt="Color, Material and MeshID properties" src="../../../assets/tutorials/basic-particle-effects/meshProperties.jpg" width="60%" />

4. Insert a `Class.ParticleEmitter` object into the part.

   <img alt="GoldNugget and ParticleEmitter in the Explorer" src="../../../assets/tutorials/basic-particle-effects/explorerMeshPart.jpg" width="60%" />

   Once you add the emitter, white stars will immediately start emitting from the part. The star is the default particle image.

   ![Default particles emitting from the GoldNugget part](../../../assets/tutorials/basic-particle-effects/defaultParticles.jpg)

<Alert severity="info">
The pre-made `Class.Fire` and `Class.Smoke` objects can be a convenient way to save time on creating effects, but they are far less customizable than ParticleEmitters.
</Alert>

## Particle emission

Particles are generated randomly throughout the entire volume of a part. They emerge from one **face** of the part according to the **EmissionDirection** property. It defaults to **Top**, meaning the top surface of a part. If you rotate the part, the direction the particles are emitted from will change accordingly.

<video controls loop muted>
  <source src="../../../assets/tutorials/basic-particle-effects/rotatingParticleEffect.mp4" />
</video>

If you resize the part to be bigger, the particles will be emitted over a wider area.

<video controls loop muted>
  <source src="../../../assets/tutorials/basic-particle-effects/scalingParticleEffect.mp4" />
</video>

## Particle properties

### Color

The first thing to change is the emitter color — **gold** would be a much more appropriate color for a sparkle effect.

Change the **Color** property to **255, 200, 50**.

<GridContainer numColumns="2">
  <img src="../../../assets/tutorials/basic-particle-effects/particleColorGame.jpg" />
  <img src="../../../assets/tutorials/basic-particle-effects/particleColor.jpg" />
</GridContainer>

### Lifetime

By default, the particles last for 5 to 10 seconds, which is too long for sparkles. You can change this using the **Lifetime** property.

Lifetime can have either a single value or a **Min** and a **Max** value, with particles lasting for a random amount of time in seconds between the two values.

Change the **Lifetime** property of the emitter to **0.5, 1** to shorten the duration of the particles.

<GridContainer numColumns="2">
  <img src="../../../assets/tutorials/basic-particle-effects/particleLifetimeGame.jpg" />
  <img src="../../../assets/tutorials/basic-particle-effects/particleLifetime.jpg" />
</GridContainer>

### Rate

The **Rate** property specifies how many particles are emitted per second. The default value is 20 which is fairly high for a sparkle effect. Change the **Rate** property of the emitter to **7**.

<GridContainer numColumns="2">
  <img src="../../../assets/tutorials/basic-particle-effects/particleRateGame.jpg" />
  <img src="../../../assets/tutorials/basic-particle-effects/particleRate.jpg" />
</GridContainer>

### Speed

The **Speed** property determines how fast a particle will travel in studs per second. It can be either a single value or a range of values.

A sparkle effect should be nice and slow — a range of 2 to 3 seconds works nicely. Change the **Speed** property to **2, 3**.

<img alt="Particle Speed property" src="../../../assets/tutorials/basic-particle-effects/particleSpeed.jpg" width="60%" />

### SpreadAngle

The particles are currently emitting straight up from the part. To get an even spread of particles in all directions, change the **SpreadAngle** property.

SpreadAngle has an **X** and a **Y** value which determine the range of angles that a particle can be emitted. This is calculated from both sides around the axes. A value of **180, 0** would emit particles in a flat circle across the X-axis; a value of **180, 180** would emit particles in every direction around the part. Change the **SpreadAngle** property of the emitter to **180, 180**.

<GridContainer numColumns="2">
  <img src="../../../assets/tutorials/basic-particle-effects/particleSpreadAngleGame.jpg" />
  <img src="../../../assets/tutorials/basic-particle-effects/particleSpreadAngle.jpg" />
</GridContainer>

### Additional properties

To further improve the sparkle effect, try the following property values.

<table>
  <thead>
  <tr>
   <th>Property</th>
   <th>Value</th>
  </tr>
  </thead>
  <tbody>
  <tr>
   <td>Size</td>
   <td>0.3</td>
  </tr>
  <tr>
   <td>LightEmission</td>
   <td>1</td>
  </tr>
  <tr>
   <td>Transparency</td>
   <td>0.5</td>
  </tr>
  <tr>
   <td>Drag</td>
   <td>1.5</td>
  </tr>
  </tbody>
</table>

<video controls loop muted>
  <source src="../../../assets/tutorials/basic-particle-effects/basicParticleNoLight.mp4" />
</video>

With that, your sparkling part is complete. You can try complementing the sparkling effect with a gentle glow by adding a `Class.PointLight` to the part, as shown at the start of the course — check out the [Lighting with Props](../../../tutorials/use-case-tutorials/lighting/light-with-props.md) course to learn more about light objects.
