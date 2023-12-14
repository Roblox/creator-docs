---
title: Create Basic Visual Effects
description: Explains how to create two different kinds of visual effect using particle emitters.
prev: /tutorials/core/scripting/script-an-upgrade-button
next: /tutorials/core/building/customize-global-lighting
---

<iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/Pk_UX4zMfeg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<br/>

**Creating basic special effects** for your experience adds dynamic movement to your environment,
which results in your world feeling more alive and realistic. In addition, the visual interest
and motion from special effects often catches players' attention, making them a useful device
for leading players where you want them to go in your experience.

This section of the tutorial teaches you how to utilize **particle emitters**, a type of special
effect that emits 2D images, or particles, in unique ways according to their parent object and
how you configure their settings. Using examples from the sample [Island Jump - Final](https://www.roblox.com/games/14238807008/Island-Jump-Completed-Sample) experience, you will learn how to customize particle emitters to create both
powerful and subtle effects, such as the glowing flare that draws players closer, and floating dust
particles that add texture to the atmosphere.

## Create a Flare

The first type of particle emitter the sample [Island Jump - Final](https://www.roblox.com/games/14238807008/Island-Jump-Completed-Sample) uses to add dynamic movement to the
experience is a giant flare at the top of the tallest sea stack platform. As the rest of the environment
is static, this effect becomes a focal point in the 3D space, which incentivizes players to progress through the environment
so that they can reach the final platform of the experience.

To create a flare:

1. In the **Explorer** window, add a new folder into the **World** folder, then rename the new folder to **VFX**.
1. Add a **block** part into the **VFX** folder, then position the part about 10 studs above your tallest sea stack platform. The sample **Island Jump - Final** experience positions this part above the **Level_7** platform with the following values:
   <table>
      <thead>
      <tr>
      <th>Size</th>
      <th>CFrame.Position</th>
      <th>CFrame.Orientation</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td>`20, 20, 20`</td>
      <td>`400, 331, 79`</td>
      <td>`0, 0, 0`</td>
      </tr>
      </tbody>
   </table>
1. Select this block part, then in the **Properties** window,
   1. Set **Name** to **VFX_Flare**.
   1. Set **Transparency** to **1** so the part is invisible.
   1. Enable **Anchored** so the physics system doesn't move the part when the experience starts.
1. Add an attachment to this part.
   1. In the **Explorer** window, hover over the block part and click the **⊕** button. A contextual menu displays.
   1. From the contextual menu, insert an **Attachment**. An attachment displays in the center of the part in the direction of the positive Y axis.
1. Add a particle emitter to this attachment, and rename the particle emitter to **Emitter_Flare**. The particle emitter immediately emits particles in the direction of the attachment.

<video controls src="../../../assets/tutorials/core-building-and-scripting/Flare-1.mp4" width="80%"></video>

### Configure the Flare

Now that you have a particle emitter in your experience, you can customize its properties so that it emits a glowing flare that
faces players when they start the experience. To learn more about how each property affects the resulting visual effect, see `Class.ParticleEmitter|ParticleEmitter` and [Customizing Particles](../../../effects/particle-emitters.md#customizing-particles).

#### Particle Image

Each particle displays an image set by the `Class.ParticleEmitter.Texture|Texture` property. To use your own image, you need to upload the image to Roblox and get an asset ID. See [Assets](../../../projects/assets/index.md) for more on this process and how to do it yourself.

You can use Roblox's pre-made flare image for the `Class.ParticleEmitter.Texture|Texture` of the particle emitter. To use Roblox's pre-made asset:

1. In the **Explorer** window, select **Emitter_Flare**.
1. In the **Properties** window, set **Texture** to `rbxassetid://8983307836`.

#### Basic Properties

`Class.ParticleEmitter.Rate` determines the amount of particles emitted per second. A rate of `5` means that a particle will emit every `1/5 = 0.2` seconds. Higher values of `Class.ParticleEmitter.ZOffset` means the particles render in front of other objects, while negative values mean they render behind other objects.

`Class.ParticleEmitter.LightEmission` determines the blending of the texture's colors with the colors behind them. At `0` the textures blend normally; at `1` they blend additively so that when particles overlap, their color multiplies to be brighter. The texture provided is designed to be used with this property set to 1.

Properties such as `Class.ParticleEmitter.Lifetime` require a minimum and maximum value, where Roblox chooses a random duration in seconds between the minimum and maximum each time a particle. In this case, the particles should all last 10 seconds with no variation, so both values are `10`.

To configure the basic properties of the particle emitter:

1. In the **Explorer** window, select **Emitter_Flare**.
1. In the **Properties** window,

   1. Set **Color** to **127, 84, 59**, or to a color you prefer for the flare.
   1. Set **LightEmission** to **1** to use additive blending.
   1. Set **ZOffset** to **1** to ensure it appears as expected in relation to the camera.
   1. Set **Lifetime** to **10, 10**.
   1. Set **Rate** to **0.45**.
   1. Set **RotSpeed** to **20** to rotate each particle 20 degrees per second.
   1. Set **Speed** to **0** to prevent the particle from moving.

#### Lifetime and NumberSequence Values

Some properties such as `Class.ParticleEmitter.Size` and `Class.ParticleEmitter.Transparency` use a `Datatype.NumberSequence` to automate changes in the value of the property for a particle throughout its `Class.ParticleEmitter.Lifetime|Lifetime`. For example, the sequences for the flare's `Class.ParticleEmitter.Size|Size` and `Class.ParticleEmitter.Transparency|Transparency` create a pulsing effect each time a particle emits.

To configure the sequences for `Class.ParticleEmitter.Size` and `Class.ParticleEmitter.Transparency`:

1. In the **Explorer** window, select **Emitter_Flare**.
1. In the **Properties** window, click the **…** next to the value for **Size** to open its `Datatype.NumberSequence`.
1. Add points to the sequence by clicking on it, and move them until the window resembles the following example:

   <figure>
   <img src="../../../assets/tutorials/core-building-and-scripting/Flare-NumberSequence-Size.png" width="888" />
   <figcaption>The Y axis represents each particle's size and the X axis represents each particle's lifetime. The size starts at 0 and grows slowly in the beginning of its lifetime, then quickly grows to a size of 10 and remains 10 for the duration of the lifetime.</figcaption>
   </figure>

1. Click the **…** next to the value for **Transparency** to open its sequence.
1. Add points to the sequence by clicking on it, and move them until the window resembles the following example:

   <figure>
   <img src="../../../assets/tutorials/core-building-and-scripting/Flare-NumberSequence-Transparency.png" width="888" />
   <figcaption>The particle is visible (equal or close to 0) for the majority of its lifetime. As the particle approaches the end of its lifetime, its transparency value bounces up and down at different values, settling at 1 at the very end.</figcaption>
   </figure>

<img src="../../../assets/tutorials/core-building-and-scripting/Final-Flare.jpg" width="80%" />

### Add a PointLight

To ensure the flare stands out more, you can put a light into it. There are three different light objects you can use:

- `Class.PointLight` emits light spherically from a single point.
- `Class.SpotLight` emits light in the shape of a cone in a given direction.
- `Class.SurfaceLight` emits light from one face of a `Class.BasePart`.

A `Class.PointLight` is best for this to emit light spherically from the part at the position of the particle effect. To create a light source in the part:

1. Add a **PointLight** to **Emitter_Flare**.
1. Select the **PointLight** object, then in the **Properties** window,
   1. Set **Brightness** to **2** to make the light brighter.
   1. Set **Range** to **36** to increase the light's range.

<img src="../../../assets/tutorials/core-building-and-scripting/Flare-With-PointLight.jpg" width="80%" />

## Create the Dust Particles

The second type of particle emitter the sample [Island Jump - Final](https://www.roblox.com/games/14238807008/Island-Jump-Completed-Sample) uses to add dynamic movement to the experience is one that dust particles throughout the atmosphere. These particles surround the player, adding a sense of texture and depth to the air itself.

To create dust particles:

1. Insert a **block** part into the **VFX** folder, then scale it to encompass the entire playable area. The sample **Island Jump - Final** experience positions and scales this part with the following values:

   <table>
   <thead>
   <tr>
   <th>Size</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>`645, 355, 275`</td>
   <td>`198, 168, 26`</td>
   <td>`0, 0, 0`</td>
   </tr>
   </tbody>
   </table>

1. Select this block part, then in the **Properties** window,
   1. Set **Name** to **VFX_DustMotes**.
   1. Set **Transparency** to **1** so the part is invisible.
   1. Disable **CanCollide** so players don't collide with the part as they move through the playable area.
   1. Enable **Anchored** so the physics system doesn't move the part when the experience starts.

1. Add a particle emitter to this part, then rename the particle emitter to **Emitter_DustMotes**. The particle emitter immediately emits particles within the part's area.

<video controls src="../../../assets/tutorials/core-building-and-scripting/DustParticles-1.mp4" width="80%"></video>

### Configure the Dust Particles

The dust particle emitter requires some new properties to change. `Class.ParticleEmitter.Acceleration` determines how a particle's `Class.ParticleEmitter.Speed` changes throughout its lifetime. Acceleration is often used to apply a gravity effect to particles with a negative `Y` value.

`Class.ParticleEmitter.Rotation` defines the range of rotations in degrees for emitted particles, with positive values corresponding with the clockwise direction. To add some randomness to the rotation of each dust mote, you can create a range of angles to choose from.

For each point in a `Datatype.NumberSequence`, you can set an _envelope_ using the number input at the bottom of the window. An envelope sets the range from which Studio picks a random value higher or lower than the point's value each time a particle emits. The size of the envelope determines the range of the random selection. The sequence for `Class.ParticleEmitter.Transparency` includes an envelope so that each particle's visibility is unpredictable.

Here are the values for all other previously explained properties. Refer back to [Configure the Flare](#configure-the-flare) for these explanations.

1. In the **Explorer** window, select **Emitter_DustMotes**.
1. In the **Properties** window,

   1. Set **Color** to **192, 241, 255**.
   1. Set **Size** to the following `Datatype.NumberSequence`:

      <figure>
      <img src="../../../assets/tutorials/core-building-and-scripting/DustMotes-NumberSequence-Size.png" width="888" />
      <figcaption>The size rises to 0.25 shortly after creation, then fades down gradually to 0</figcaption>
      </figure>

   1. Set **Texture** to **rbxassetid://14302399641**.
   1. Set **Transparency** to the following `Datatype.NumberSequence`:

      <figure>
      <img src="../../../assets/tutorials/core-building-and-scripting/DustMotes-NumberSequence-Transparency.png" width="888" />
      <figcaption>Begins fully transparent, becomes randomly more opaque (envelope of 0.1), then slowly fades out</figcaption>
      </figure>

   1. Set **ZOffset** to **-5** so that they appear behind players and other objects.
   1. Set **Lifetime** **1, 10**.
   1. Set **Rate** to **50000**. This is a fast rate, but because the volume of the particle emitter's parent part is so large, it appears sparse.
   1. Set **Rotation** to **-45, 45**.
   1. Set **RotSpeed** to **-60**.
   1. Set **Speed** to **1, 5**.
   1. Set **Acceleration** to **1, -1, 1** to make the particles gently float upwards.

<figure>
<img src="../../../assets/tutorials/core-building-and-scripting/Dust-Motes-Sky.jpg" />
<figcaption>Faint dust particles in the air looking up at the sky from the platforms</figcaption>
</figure>
