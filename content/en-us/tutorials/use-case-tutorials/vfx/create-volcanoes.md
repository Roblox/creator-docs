---
title: Create volcanic eruptions with VFX
description: The process of creating volcanoes to elevate your visual and gameplay requirements.
---

A **volcano** is a crater within the earth's crust that spews lava and smoke due to internal pressure from magma and dissolved gasses. Experiences often include volcanoes within challenging gameplay areas, such as locations where players must balance the danger of lava and molten rock hazards with the reward of valuable resources, boss battle arenas, or environments that dynamically change as the volcano cyclically erupts.

Using the [Volcano Island - Start](https://create.roblox.com/dashboard/creations/experiences/5825677169/overview) `.rbxl` file as a starting place and [Volcano Island - Complete](https://www.roblox.com/games/17374256579/Volcano-Island-Complete) as a reference, this tutorial shows you how to transform the environment into a volcanic eruption with custom lighting and VFX objects that represent real-world physical behavior, including guidance on:

- Breaking down referential material into individual components with distinct visual and behavioral characteristics.
- Configuring surface ripples to emulate hot fluid rising to the surface and disrupting the surface of the caldera.
- Configuring embers to emulate pieces of molten rock quickly cooling as they rise into the atmosphere.
- Configuring lava that splashes and flows from the caldera to emulate various types of lava viscosity states.
- Configuring a smoke plume to emulate harsh impurities rising into the sky that catch players' attention.

<Alert severity = 'info'>
You can create your own textures in third-party texture creation tools and follow along with your own design. For information on importing textures for use in Studio, see [Asset Manager](../../../projects/assets/manager.md).
</Alert>

<GridContainer numColumns="2">
  <figure>
    <img src="../../../assets/tutorials/creating-volcanoes/Volcano-Start.jpg" alt="The starting volcano terrain you can use to complete this tutorial." width="100%"/>
    <figcaption>Volcano Island - Start</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/tutorials/creating-volcanoes/Volcano-Complete.jpg" alt="The complete volcano with VFX objects you will create by the end of this tutorial." width="100%"/>
    <figcaption>Volcano Island - Complete</figcaption>
  </figure>
</GridContainer>

## Break down reference

To create credible volcanoes, it's important to reference real-world volcanic eruptions in the design process because it allows you to break down the subject matter into individual components with distinct visual and behavioral characteristics. For example, the sample [Volcano Island - Complete](https://www.roblox.com/games/17374256579/Volcano-Island-Complete) experience references the volcanic eruption in Iceland to inform all texture and VFX design decisions relating to the caldera and its surrounding terrain.

<img src="../../../assets/tutorials/creating-volcanoes/Volcano-NoComponents.jpg" alt="A far out view of an Iceland volcanic eruption."  width="80%" />

It's useful to break down a volcano that's erupting into individual components so that you can plan how to utilize different VFX objects to mimic their real-world counterparts. To demonstrate, this tutorial breaks the sample volcano into five unique components:

- **Surface Ripples** – The small waves of lava on the surface of the caldera.
- **Embers** – The small, light pieces of molten rock that rise to the sky from the caldera.
- **Lava Splashes** – The thin molten rock that bursts out from the caldera due to internal pressure within the volcano.
- **Lava Flow** – The viscous molten rock that oozes away from the caldera.
- **Smoke Plume** – The warm, billowing gas that rises into the sky from the caldera.

<GridContainer numColumns="2">
  <figure>
    <img src="../../../assets/tutorials/creating-volcanoes/Volcano-Components.jpg" alt="The volcanic eruption reference with all five components highlighted." width="100%"/>
  </figure>
  <figure>
    <img src="../../../assets/tutorials/creating-volcanoes/Sample-Components.jpg" alt="The sample volcanic eruption with the same five components highlighted to compare the reference image with the final result." width="100%"/>
  </figure>
</GridContainer>

The following sections provide an in-depth analysis of the different design decisions and techniques you can use to recreate each of these components. As you review these decisions and experiment with various lighting, `Class.ParticleEmitter`, and `Class.Beam` properties, you will learn how to utilize lighting and VFX to solve the unique environmental requirements for your own experiences.

## Configure lighting

To make an environmental element a point of interest within your experience, it's important to increase its contrast against the overall environment so that it stands out as something that players should explore. For example, to draw players into the caldera, you can configure your lighting sources so that the volcano's lava appears to glow as the only light source within an otherwise dark environment.

Studio provides two high-level types of lighting sources you can use for this technique:

- **Global lighting** - Produces lighting for the entire outdoor environment.
- **Local lighting** - Produces lighting around where you place them within your experience.

This section of the tutorial teaches you how to utilize both types of lighting sources to make your volcanic eruption the most significant point of interest within your scene, as well as create a dramatic effect for your environmental storytelling. To illustrate, review how the same final volcano without custom lighting feels like an unobtrusive hazard in an otherwise cheerful environment while the volcano with custom lighting feels like a dangerous presence in a dark, melancholic environment.

<GridContainer numColumns="2">
  <figure>
    <img src="../../../assets/tutorials/creating-volcanoes/Default-Lighting.jpg" alt="The complete version of the sample volcanic eruption with default light sources." width="100%"/>
    <figcaption>With default light sources</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/tutorials/creating-volcanoes/Custom-Lighting.jpg" alt="The complete version of the sample volcanic eruption with custom light sources." width="100%"/>
    <figcaption>With custom light sources</figcaption>
  </figure>
</GridContainer>

### Local lighting

Local lighting is the luminescence from local [light sources](../../../effects/light-sources.md) in your experience, such as `Class.SpotLight`, `Class.SurfaceLight`, and `Class.PointLight` objects. Local lighting is important to add to your volcano because while you can apply brightness to your `Class.ParticleEmitter` and `Class.Beam` textures, they cannot fill the canyon with enough light alone to realistically  simulate how the caldera and its flowing lava would illuminate the environment in the real world.

<GridContainer numColumns="2">
  <figure>
    <img src="../../../assets/tutorials/creating-volcanoes/Without-LocalLighting.jpg" alt="The complete version of the sample volcanic eruption without local lighting." width="100%"/>
    <figcaption>Without local lighting</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/tutorials/creating-volcanoes/With-LocalLighting.jpg" alt="The complete version of the sample volcanic eruption with local lighting." width="100%"/>
    <figcaption>With local lighting</figcaption>
  </figure>
</GridContainer>

It's helpful to configure your local lighting before your global lighting for this tutorial because without the local light sources, you cannot see the 3D space to configure your VFX objects. However, common workflows require you to iterate on both local and global lighting concurrently to see the effects of your changes on VFX objects, so it's important to be flexible to design requirements of your own experiences.

To recreate the local lighting for the volcano in the sample [Volcano Island - Complete](https://www.roblox.com/games/17374256579/Volcano-Island-Complete) place file:

1. In the **Explorer** window, create a **Folder** in the **Workspace** to contain all local light source objects, then rename the folder **LocalLighting**.
1. Insert three **block** parts into the **LocalLighting** folder, then rename them **LightCaldera**, **LightMagma**, and **LightOutflow**, respectively.
1. Move the parts to a position where they can light the entirety of the volcano.
   1. Move **LightCaldera** to the center of the space between the caldera and the cliff.
   1. Move **LightMagma** to the center of the crevice between the caldera and the magma outflow.
   1. Move **LightOutflow** to slightly above where the outflow forks into two streams.

   <img src="../../../assets/tutorials/creating-volcanoes/LL-3.jpg" alt="A front view of the volcano with three block parts positioned throughout the volcano's valley." width="80%" />

1. Insert a **Pointlight** into each part.

   <img src="../../../assets/tutorials/creating-volcanoes/LL-4.jpg" alt="A front view of the volcano with three block parts with point light visual aids." width="80%" />

1. Select the **PointLight** child of **LightCaldera**, then in the **Properties** window,
   1. Set **Brightness** to `15` to make the light source much brighter.
   1. Set **Color** to `255, 85, 0` to tint the light to a dark orange hue.
   1. Set **Range** to `60` to illuminate the entire caldera area.

   <img src="../../../assets/tutorials/creating-volcanoes/LL-5.jpg" alt="A front view of the volcano with three block parts. The block part nearest the caldera emits orange light." width="80%" />

1. Select the **PointLight** children of **LightMagma** and **LightOutflow**, then in the **Properties** window,
   1. Set **Brightness** to `2` to make the light source slightly brighter.
   1. Set **Color** to `255, 81, 0` to tint the light to an orange hue.
   1. Set **Range** to `50` to illuminate the crevice and outflow areas.

   <img src="../../../assets/tutorials/creating-volcanoes/LL-6.jpg" alt="A front view of the volcano with three block parts that are all emitting orange light." width="80%" />

1. In the **Explorer** window, select all block parts in the **LocalLighting** folder, then in the **Properties** window, set **Transparency** to `1` to make the blocks invisible.

   <img src="../../../assets/tutorials/creating-volcanoes/LL-7.jpg" alt="A front view of the volcano that has orange lighting throughout the volcano's valley." width="80%" />

### Global lighting

Global lighting is the luminescence from either the sun or moon in an experience. By adjusting a couple of key default properties in the `Class.Lighting` service and its child post-processing effects objects, you can dramatically change how global light appears to players, as well as how it interacts with any other object you place in the experience, including `Class.ParticleEmitter` and `Class.Beam` textures.

For example, to ensure that the `Class.Beam` textures that produce a flowing lava effect later in the tutorial are able to glow, you must configure `Class.BloomEffect` properties to exaggerate the lighting like a camera viewing a bright light. Similarly, to simulate more realistic colors at night, you must also adjust the effect's properties to desaturate the overall environment.

<GridContainer numColumns="2">
  <figure>
    <img src="../../../assets/tutorials/creating-volcanoes/Without-Bloom.jpg" alt="The complete version of the sample volcanic eruption without bloom." width="100%"/>
    <figcaption>Without bloom</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/tutorials/creating-volcanoes/With-Bloom.jpg" alt="The complete version of the sample volcanic eruption with bloom." width="100%"/>
    <figcaption>With bloom</figcaption>
  </figure>
</GridContainer>

To recreate the global lighting in the sample [Volcano Island - Complete](https://www.roblox.com/games/17374256579/Volcano-Island-Complete) place file:

1. In the **Explorer** window, select the **Lighting** service, then in the **Properties** window,
   1. Set **Ambient** to `133, 152, 176` to set a light gray hue over the entire outdoor environment.
   1. Set **Brightness** to `2` to make the global light source slightly dimmer.
   1. Set **ColorShift_Top** to `207, 178, 72` to set a yellow hue to the light that reflects from surfaces facing the global light source.
   1. Set **LightingStyle** to **Realistic** to utilize Roblox's most advanced lighting technology.
   1. Set **ClockTime** to `4.3` to set the time of day about a quarter after 4am.
   1. Set **GeographicLatitude** to `199` to modify the position of the moon.
   1. Set **ExposureCompensation** to `-1` to expose the environment to half of the exposure from the moon.

   <img src="../../../assets/tutorials/creating-volcanoes/GL-1.jpg" alt="A front view of the volcano with darkened outdoor lighting." width="80%" />

1. In the **Explorer** window, select **Bloom** child of the **Lighting** service, then in the **Properties** window,
   1. Set **Intensity** to `0.75` to slightly dim all colors within the environment.
   1. Set **Size** to `80` to create a wider bloom effect.
   1. Set **Threshold** to `0.85` to allow more colors in the environment to glow.

   <img src="../../../assets/tutorials/creating-volcanoes/GL-2.jpg" alt="A front view of the volcano with darkened outdoor lighting and local lighting that glows orange." width="80%" />

1. In the **Explorer** window, insert a **ColorCorrection** object into the **Lighting** service, then in the **Properties** window,
   1. Set **Brightness** to `0.017` to slightly shift the color of your pixels.
   1. Set **Contrast** to `0.25` to make a sharper contrast between light and dark colors in the environment.
   1. Set **Saturation** to `-0.15` to desaturate colors in the environment.
   1. Set **TintColor** to `255, 214, 143` to tint pixels with a light yellow hue.

   <img src="../../../assets/tutorials/creating-volcanoes/GL-3.jpg" alt="A front view of the volcano with pitch black outdoor lighting and local lighting that glows orange." width="80%" />

1. **(Optional)** Provide indirect light with clouds in the sky.
   1. In the **Explorer** window, insert a **Clouds** object into the **Terrain** service.
   1. Select the **Clouds** object, then in the **Properties** window,
      1. Set **Cover** to `1` to provide full cloud cover to the sky.
      1. Set **Density** to `0.08` to make the cloud cover less dense.
      1. Set **Color** to `136, 143, 152` to set a light gray hue to the cloud cover.

   <img src="../../../assets/tutorials/creating-volcanoes/GL-4.jpg" alt="A front view of the volcano with pitch black outdoor lighting, gray clouds, and local lighting that glows orange." width="80%" />

## Configure volcano

Now that your local and global lighting configuration is complete, it's time to configure all of the VFX objects relating to the actual volcano and its surrounding terrain. As you follow these instructions that exactly recreate the final environment within the sample [Volcano Island](https://www.roblox.com/games/17374256579/Volcano-Island-Complete) `.rbxl` file, observe how each step works together to add character, movement, and illuminance to the environment.

### Surface ripples

**Surface ripples** are the small lava waves that flow across the surface of the caldera as a result of internal magma and pressurized gasses moving upward from beneath the earth's crust. This visual phenomenon conveys the real-world physical process of convection, or the movement within a fluid when hotter fluid rises to the surface, and it adds to the realism of your scene.

Surface ripples provide valuable insight for players into the state of the volcanic eruption. For example, if magma and gas are moving upward with enough force to disrupt the state of the lava on top of the caldera and cause it to churn, players can deduce that the volcano is actively erupting with boiling magma, so they should exercise caution around this gameplay area.

<GridContainer numColumns="2">
  <figure>
    <img src="../../../assets/tutorials/creating-volcanoes/Without-SurfaceRipples.jpg" alt="A top-down view of the caldera without surface ripples." width="100%"/>
    <figcaption>Without surface ripples</figcaption>
  </figure>
  <figure>
    <video controls src="../../../assets/tutorials/creating-volcanoes/With-SurfaceRipples.mp4" alt="A top-down view of the caldera with surface ripples." width="100%"></video>
    <figcaption>With surface ripples</figcaption>
  </figure>
</GridContainer>

To demonstrate this process, the sample uses a `Class.ParticleEmitter` object slightly below the base of the caldera to emit flat, bright particles that slowly expand and contract on top of a dark backdrop. This allows the particles to emulate the behavior of lava smoothly and continuously churning in a way that's similar to the realistic way elements move in nature.

<GridContainer numColumns="2">
  <figure>
    <img src="../../../assets/tutorials/creating-waterfalls/Foam-Texture.png" alt="The 2D texture that represents surface ripples that result from churning lava." width="60%"/>
    <figcaption>Foam Ripples Texture = rbxassetid://16811365086</figcaption>
  </figure>
  <figure>
  </figure>
</GridContainer>

To recreate the surface ripples on top of the caldera in the sample [Volcano Island - Complete](https://www.roblox.com/games/17374256579/Volcano-Island-Complete) place file:

1. In the **Explorer** window, create a **Folder** in the **Workspace** to contain all caldera objects, then rename the folder **Caldera**.
1. Create a backdrop to provide a high contrast background for the surface ripples.
   1. Insert a **block** part into the **Caldera** folder, then rename it **Backdrop**.
   1. Position and scale **Backdrop** to slightly beyond the full surface area of the caldera. The part appears as though it's glowing because of its close proximity to the caldera's local light source.

      <img src="../../../assets/tutorials/creating-volcanoes/Ripples-2B.jpg" alt="A top-down view of the caldera with a highlighted block part that's glowing yellow." width="80%" />

1. Select **Backdrop**, the in the **Properties** window,
   1. Set **Color** to `0, 0, 0` to make the block black.
   1. Set **Material** to **Foil** to provide texture to the backdrop.

      <img src="../../../assets/tutorials/creating-volcanoes/Ripples-2C.jpg" alt="A top-down view of the caldera with a block part that's black with some rough texture." width="80%" />

1. Create the ripple effect.
   1. Duplicate **Backdrop**, rename it **MagmaRipples**, then scale it slightly down to the surface area of the caldera.
   1. Select **MagmaRipples**, then in the **Properties** window, set **Transparency** to `1` to make the block invisible.
   1. Insert a **ParticleEmitter** into **MagmaRipples**, then rename the emitter **Ripples**.
   1. Select **Ripples**, then in the **Properties** window,
      1. Set **Texture** to `rbxassetid://16829556885` to render particles that look like foam ripples.
      1. Set **Orientation** to **VelocityPerpendicular** to emit particles perpendicular to the direction of their movement.
      1. Set **Color** to a color sequence in which particles are brown, become bright red, then turn maroon.
         1. Click the **Color** property, then click the **&ctdot;** button. A color sequence pop-up displays.

         <img src="../../../assets/tutorials/creating-waterfalls/Cascades-1G1.png" alt="A close up view of Studio's Properties window with the Color property's ellipsis button highlighted." width="60%" />

         Each triangle on the bottom axis of the color sequence is a **keypoint** that determines the color value of the property at that point of the particle's lifetime.

         1. Set the following time and value properties throughout the color sequence:
         - **Time** = `0`, **RGB Value** = `130, 53, 2`
         - **Time** = `0.5`, **RGB Value** = `224, 37, 0`
         - **Time** = `1`, **RGB Value** = `147, 5, 0`

         <img src="../../../assets/tutorials/creating-volcanoes/Ripples-3DColor.jpg" alt="" width="80%" />

      1. Set **Size** to a number sequence in which particles increase in size toward the middle of their lifetime before returning to their original size with a small window of variation.
         1. Click the **Size** property, then click the **&ctdot;** button. A number sequence pop-up displays. By default, the graph is a straight line and the image remains the same size from left to right.

         <img src="../../../assets/tutorials/creating-waterfalls/Cascades-1H1.png" alt="A close up view of the Size number sequence graph." width="80%" />

         Each square at the start and end of the number sequence is a **keypoint** that determines the size value of the property at that point of the texture from left to right.

         1. Set the following time and value properties throughout the number sequence:

         - **Time** = `0`, **Value** = `4.81`, **Envelope** = `0.438`
         - **Time** = `0.341`, **Value** = `8.75`, **Envelope** = `0.48`
         - **Time** = `0.497`, **Value** = `9.38`, **Envelope** = `0.5`
         - **Time** = `0.644`, **Value** = `8.75`, **Envelope** = `0.48`
         - **Time** = `1`, **Value** = `4.81`, **Envelope** = `0.438`

         <img src="../../../assets/tutorials/creating-volcanoes/Ripples-3DSize.jpg" alt="" width="80%" />

      1. Set **Transparency** to a number sequence in which particles start as transparent, become more opaque toward the middle of their lifetime, then become transparent again at the end of their lifetime.
         1. Click the **Transparency** property, then click the **&ctdot;** button.
         1. Set the following time and value properties throughout the number sequence:

         - **Time** = `0`, **Value** = `1`, **Envelope** = `0`
         - **Time** = `0.3`, **Value** = `0.387`, **Envelope** = `0.0375`
         - **Time** = `0.5`, **Value** = `0.269`, **Envelope** = `0.0812`
         - **Time** = `0.7`, **Value** = `0.381`, **Envelope** = `0.05`
         - **Time** = `0`, **Value** = `1`, **Envelope** = `0`

         <img src="../../../assets/tutorials/creating-volcanoes/Ripples-3DTransparency.jpg" alt="" width="80%" />

      1. Set **ZOffset** to `-2` to offset the texture to be slightly away from the caldera.
      1. Set **Lifetime** to `5, 8` to randomly set each particle's lifetime between 5 and 8 seconds.
      1. Set **Rate** to `12` to emit 12 particles per second.
      1. Set **Rotation** to `-360, 360` to randomly orient each particle in a circle.
      1. Set **Speed** to `0.01` to emit each particle one tenth of a stud per second.
      1. Set **LightEmission** to `1` to significantly brighten the particles.
      1. Set **LightInfluence** to `0` to prevent the environmental light from affecting the color of the particles.
      1. Set **Brightness** to `15` to scale the light emitted from the emitter.

   <video controls src="../../../assets/tutorials/creating-volcanoes/With-SurfaceRipples.mp4" alt="A top-down view of the caldera with surface ripples." width="90%"></video>

### Embers

**Embers** are the small, light pieces of molten rock that burst out of the caldera, rapidly expelling heat as they rise into the atmosphere. Similar to surface ripples, embers reveal that internal pressure below the earth's crust is pressing upwards, causing hot elements to break the lava's surface tension to release pressure.

The sample emulates this process by using a `Class.ParticleEmitter` object to emit particles with motion blur that's baked into the texture. As the particles rise and reach the end of their lifetime, the emitter squashes the particles into a 1:1 ratio to reform the particles into circles. This technique allows the particles to seem as though they are rapidly moving as they exit the caldera, then slow down as they dissipate into the sky.

<GridContainer numColumns="2">
  <figure>
    <img src="../../../assets/tutorials/creating-volcanoes/Embers-Texture.jpg" alt="The 2D texture that represents embers bursting from the caldera." width="60%"/>
    <figcaption>Embers Texture = rbxassetid://17581858560</figcaption>
  </figure>
  <figure>
  </figure>
</GridContainer>

In addition, as particles rise, they change their color, opacity, and size to reflect their changing temperature. For example, they begin their lifetime as large, brown particles, but quickly transform into small orange, then maroon particles. This strategy also has the benefit of subtly reflecting the lighting throughout the canyon, increasing a player's immersion within the environment.

To recreate the glowing embers from the surface of the caldera in the sample [Volcano Island - Complete](https://www.roblox.com/games/17374256579/Volcano-Island-Complete) place file:

1. Insert a **cylinder** part into the **Caldera** folder, then rename it **GlowingEmbers**.
1. Position **GlowingEmbers** so that it is on top of the surface ripples, then scale it until it fills the interior of the caldera. The part appears as though it's glowing because of its close proximity to the caldera's local light source.

   <img src="../../../assets/tutorials/creating-volcanoes/Embers-2.jpg" alt="A close front view of the caldera with a cylinder part that's glowing yellow." width="80%" />

1. Select **GlowingEmbers**, then in the **Properties** window, set **Transparency** to `1` to make the cylinder invisible.
1. Insert a **ParticleEmitter** into **GlowingEmbers**, then rename the emitter **Embers**.
1. Select **Embers**, then in the **Properties** window,
   1. Set **Texture** to `rbxassetid://17581858560` to render particles that look like an elongated oval horizontally and vertically.
   1. Set **Orientation** to **VelocityParallel** to emit particles parallel to their direction of movement.
   1. Set **Color** to a color sequence in which particles are brown, become orange, then turn maroon.
   - **Time** = `0`, **RGB Value** = `130, 53, 2`
   - **Time** = `0.5`, **RGB Value** = `224, 82, 0`
   - **Time** = `1`, **RGB Value** = `147, 5, 0`

   <img src="../../../assets/tutorials/creating-volcanoes/Embers-5Color.jpg" alt="" width="80%" />

   1. Set **Size** to a number sequence in which particles slowly decrease in size across their lifetime.
   - **Time** = `0`, **Value** = `0.313`, **Envelope** = `0.1`
   - **Time** = `1`, **Value** = `0`, **Envelope** = `0`

   <img src="../../../assets/tutorials/creating-volcanoes/Embers-5Size.jpg" alt="" width="80%" />

   1. Set **Squash** to a number sequence in which particles slightly elongate about midway through their lifetime.
   - **Time** = `0`, **Value** = `-3`, **Envelope** = `0`
   - **Time** = `0.323`, **Value** = `-0.188`, **Envelope** = `0`
   - **Time** = `1`, **Value** = `-0.5`, **Envelope** = `0`

   <img src="../../../assets/tutorials/creating-volcanoes/Embers-5Squash.jpg" alt="" width="80%" />

   1. Set **Transparency** to a number sequence in which particles randomly change their opacity to simulate embers glowing as they rise. The actual values are not important, just that they change a lot during the course of their lifetimes.

   <img src="../../../assets/tutorials/creating-volcanoes/Embers-5Transparency.jpg" alt="" width="80%" />

   1. Set **ZOffset** to `1` to offset the texture to be slightly away from the caldera.
   1. Set **Lifetime** to `1, 5` to randomly set each particle's lifetime between 1 and 5 seconds.
   1. Set **Speed** to `5, 8` to randomly emit each particle between 5 and 8 studs per second.
   1. Set **SpreadAngle** to `180, 180` to emit particles in an angle along the X and Z axis.
   1. Set **Acceleration** to `0, 10, 0` to simulate upward force and pull particles to the sky.
   1. Set **Drag** to `0.8` to have particles lose their speed with exponential decay.
   1. Set **LightEmission** to `1` to significantly brighten the particles.
   1. Set **LightInfluence** to `0` to prevent the environmental light from affecting the color of the particles.
   1. Set **Brightness** to `20` to scale the light emitted from the emitter.

   <video controls src="../../../assets/tutorials/creating-volcanoes/Embers-5.mp4" alt="A close front view of the caldera that's rippling and emitting embers." width="90%"></video>

### Lava splashes

**Lava splashes** are bursts of thin molten rock that erupt upward from the volcano as a result of internal magma and pressurized gasses applying enough force to break the surface tension of the lava on top of the caldera. This core component of a volcano is one of the most common signs in determining that a volcano is no longer dormant and is actively erupting.

The sample represents this process with two `Class.ParticleEmitter` objects that utilize [flipbooks](../../../effects/particle-emitters.md#flipbooks) to animate each particle's texture over their lifetime. The first particle emitter emits particles that look like dense, high-viscosity splashes that are heavy and thick, causing them to rise and fall slowly back down into the volcano. Conversely, the second particle emitter emits particles that look like webby, low-viscosity splashes that are light and thin, causing them to rise and fall quickly.

<GridContainer numColumns="2">
  <figure>
    <img src="../../../assets/tutorials/creating-volcanoes/DenseSplash-Texture.jpg" alt="The 2D texture that represents a dense splash texture." width="60%"/>
    <figcaption>Dense Splash Texture = rbxassetid:/17363669906</figcaption>
  </figure>
  <figure>

    <img src="../../../assets/tutorials/creating-volcanoes/WebbySplash-Texture.jpg" alt="The 2D texture that represents a webby splash texture." width="60%"/>
    <figcaption>Webby Splash Texture = rbxassetid://17363668312</figcaption>
  </figure>
</GridContainer>

Each particle emitter animates their texture over 64 frames to emulate smooth, lifelike physical behavior. While you could use only one particle emitter, the repetition of the animation would become apparent and break the immersion for your players because they would see the exact same animation every time. However, when two particles animate flipbooks with slightly different custom properties, it is much more difficult to spot the repetition.

The sample also provides a `Class.ParticleEmitter` object that emits particles that look like aerated splashes to represent even lighter webby splashes. This technique fills the space with dynamic movement and further hides the repetition of the flipbook animations. As an extra bonus, if your experience also includes the waterfall from [Creating Waterfalls](create-waterfalls.md), you're able to reuse the same texture twice for different gameplay areas, saving you memory and improving performance on low-end devices.

<GridContainer numColumns="2">
  <figure>
    <img src="../../../assets/tutorials/creating-waterfalls/Splashes-Droplets.png" alt="The 2D texture that represents aerated splashes." width="60%"/>
    <figcaption>Webby Texture = rbxassetid://17082061238</figcaption>
  </figure>
  <figure>
  </figure>
</GridContainer>

To recreate the splashing lava from the surface of the caldera in the sample [Volcano Island - Complete](https://www.roblox.com/games/17374256579/Volcano-Island-Complete) place file:

1. Insert a **cylinder** part into the **Caldera** folder, then rename it **SplashingLava**.
1. Position **SplashingLava**. so that it is on top of the surface ripples, then scale it until it covers the middle of the caldera where you want the lava to splash. The part appears as though it's glowing because of its close proximity to the caldera's local light source.

   <img src="../../../assets/tutorials/creating-volcanoes/Splashes-2.jpg" alt="A close front view of the caldera with a cylinder part that's glowing yellow." width="80%" />

1. Select **SplashingLava**, then in the **Properties** window, set **Transparency** to `1` to make the cylinder invisible.
1. Insert a **ParticleEmitter** into **SplashingLava**, then rename the emitter **WebbySplashes**.
1. Select **WebbySplashes**, then in the **Properties** window,
   1. Set **Texture** to **rbxassetid://17363668312** to render particles that look like webby splashes.
   1. Set **Orientation** to **FacingCameraWorldUp** to emit particles facing the camera, but rotating only on the vertical upward world Y axis.
   1. Set **Color** to `255, 152, 79` to tint the particles to a light orange hue.
   1. Set **Size** to a number sequence in which particles increase in size across their lifetime with a window of variation.
   - **Time** = `0`, **Value** = `4.31`, **Envelope** = `0.762`
   - **Time** = `1`, **Value** = `6.2`, **Envelope** = `0.875`

   <img src="../../../assets/tutorials/creating-volcanoes/Splashes-5Size.jpg" alt="" width="80%" />

   1. Set **Squash** to a number sequence in which particles slightly elongate throughout their lifetime with a window of variation.
   - **Time** = `0`, **Value** = `-0.075`, **Envelope** = `0.263`
   - **Time** = `1`, **Value** = `-0.413`, **Envelope** = `0.412`

   <img src="../../../assets/tutorials/creating-volcanoes/Splashes-5Squash.jpg" alt="" width="80%" />

   1. Set **ZOffset** to `1` to offset the texture to be slightly away from the caldera.
   1. Set **Lifetime** to `1.5, 2` to randomly set each particle's lifetime between 1.5 and 2 seconds.
   1. Set **Rate** to `0.37` to emit a particle about every 3 seconds.
   1. Set **RotSpeed** to `-20, 20` to randomly emit each particle between -20 and 20 degrees per second.
   1. Set **Speed** to `2` to emit each particle 2 studs per second.
   1. Set **SpreadAngle** to `5, 5` to emit particles in a small angle along the X and Z axis.
   1. Set **FlipbookLayout** to **Grid8x8** to animate the texture over a 64-frame duration.
   1. Set **FlipbookMode** to **Oneshot** to ensure the animation only plays once during its lifetime.
   1. Set **Drag** to `0.5` to have particles lose their speed with exponential decay.
   1. Set **LightEmission** to `0.1` to slightly brighten the particles.
   1. Set **LightInfluence** to `0.25` to significantly reduce how much the environmental light affects the color of particles.

   <video controls src="../../../assets/tutorials/creating-volcanoes/Splashes-5.mp4" alt="A close front view of the caldera that's rippling, emitting embers, and webby splashes." width="90%"></video>

1. Duplicate **DenseSplashes**, then in the **Properties** window, modify the following properties to provide variation to the additional lava splashes.
   1. Set **Name** to **DenseSplashes**.
   1. Set **Texture** to **rbxassetid://17363669906** to render particles that look like dense splashes.
   1. Set **Size** to a number sequence in which particles increase in size across their lifetime with a window of variation.
   - **Time** = `0`, **Value** = `5.75`, **Envelope** = `0.762`
   - **Time** = `1`, **Value** = `7.37`, **Envelope** = `0.875`

   <img src="../../../assets/tutorials/creating-volcanoes/Splashes-6Size.jpg" alt="" width="80%" />

   1. Set **Squash** to a number sequence in which particles slightly elongate throughout their lifetime with a window of variation.
   - **Time** = `0`, **Value** = `0`, **Envelope** = `0.225`
   - **Time** = `1`, **Value** = `-0.262`, **Envelope** = `0.15`

   <img src="../../../assets/tutorials/creating-volcanoes/Splashes-6Squash.jpg" alt="" width="80%" />

   1. Set **Rate** to `0.289` to emit a particle nearly every fourth of a second.

   <video controls src="../../../assets/tutorials/creating-volcanoes/Splashes-6.mp4" alt="A close front view of the caldera that's rippling, emitting embers, webby splashes, and dense splashes." width="90%"></video>

1. Fill the caldera with additional splashes.
   1. Insert a **ParticleEmitter** into **SplashingLava**, then rename the emitter **SplashFill**.
   1. Select **SplashFill**, then in the **Properties** window,
      1. Set **Texture** to **rbxassetid://17082061238** to render particles that look like lighter webby splashes
      1. Set **Orientation** to **FacingCameraWorldUp** to emit particles facing the camera, but rotating only on the vertical upward world Y axis.
      1. Set **Color** to `255, 152, 33` to tint the particles to an orange hue.
      1. Set **Size** to a number sequence in which particles increase in size across their lifetime with a window of variation.
      - **Time** = `0`, **Value** = `1.25`, **Envelope** = `0.388`
      - **Time** = `1`, **Value** = `6.38`, **Envelope** = `0.563`

      <img src="../../../assets/tutorials/creating-volcanoes/Splashes-7Size.jpg" alt="" width="80%" />

      1. Set **Transparency** to a number sequence in which particles start as transparent, become opaque, then become transparent again toward the end of their lifetime.
      - **Time** = `0`, **Value** = `1`, **Envelope** = `0`
      - **Time** = `0.19`, **Value** = `0`, **Envelope** = `0`
      - **Time** = `0.795`, **Value** = `0`, **Envelope** = `0`
      - **Time** = `1`, **Value** = `1`, **Envelope** = `0`

      <img src="../../../assets/tutorials/creating-volcanoes/Splashes-7Transparency.jpg" alt="" width="80%" />

      1. Set **ZOffset** to `1` to offset the texture to be slightly away from the caldera.
      1. Set **Lifetime** to `1.5` to set each particle's lifetime to 1.5 seconds.
      1. Set **Rate** to `8` to emit a particle every 8 seconds.
      1. Set **Rotation** to `0, 360` to randomly orient each particle in a half circle.
      1. Set **RotSpeed** to `-50, 50` to randomly emit each particle between -50 and 50 degrees per second.
      1. Set **Speed** to `12, 20` to randomly emit each particle between 12 and 20 studs per second.
      1. Set **SpreadAngle** to `45, 45` to emit particles in an angle along the X and Z axis.
      1. Set **Acceleration** to `0, -25, 0` to simulate gravity and pull particles back down.
      1. Set **Drag** to `1` to have particles lose their speed with exponential decay.
      1. Set **LightEmission** to `1` to significantly brighten the particles.
      1. Set **LightInfluence** to `0` to prevent the environmental light from affecting the color of the particles.
      1. Set **Brightness** to `8` to scale the light emitted from the emitter.

   <video controls src="../../../assets/tutorials/creating-volcanoes/Splashes-7.mp4" alt="A close front view of the caldera that's rippling, emitting embers, and a wide variation of splashes." width="90%"></video>

<Alert severity = 'warning'>
Features with custom textures such as flipbooks cost memory to render. If you use many flipbooks with other features that use high memory, then clients automatically deactivate flipbooks when they are low on memory, which is likely for older mobile phones. To reduce the memory usage of flipbooks, use fewer unique animated particle effects or choose a texture of smaller resolution.
</Alert>

### Lava flow

A **lava flow** is a mass of lava that erupts and oozes away from the caldera and across the earth's surface during a volcanic eruption. As the lava cools due to its exposure to air, it solidifies and transforms into solid rock, creating new land mass.

To simulate this process, the sample layers multiple `Class.Beam` objects on top of each other with seamless textures and property configurations that emulate the behavioral characteristics of lava cooling as it travels further away from the caldera:

- The **bottom layer** renders a flat color that transforms from a warm to a cool color to communicate that the lava is beginning to drop in temperature, such as bright red to a dark maroon.
- The **middle layer** renders a black texture that looks like dark crust with holes that reveal the glowing lava underneath.
- The **top layer** renders the same texture as the middle layer at a slower rate, flipped attachments, and opposite property configurations. This ensures that the textures never have the opportunity to fully line up with each other while rendering in the same direction, which would allow players to easily detect the unrealistic texture repetition.

<GridContainer numColumns="3">
  <figure>
    <img src="../../../assets/tutorials/creating-volcanoes/Bottom-Layer.jpg" alt="" width="80%"/>
    <figcaption>Bottom layer</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/tutorials/creating-volcanoes/Middle-Layer.jpg" alt="" width="80%"/>
    <figcaption>Middle Layer</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/tutorials/creating-volcanoes/Top-Layer.jpg" alt="" width="80%"/>
    <figcaption>Top Layer</figcaption>
  </figure>
</GridContainer>

Layering three `Class.Beam` objects creates an illusion of parallax to make the lava seem like it has a sense of depth and volume where the lava is flowing at different rates, even though they are only three 2D images. This lets players know that there is a sense of turbulence within the canyon, both on and below the lava's surface.

<GridContainer numColumns="2">
  <figure>
    <img src="../../../assets/tutorials/creating-volcanoes/Crust-Texture.jpg" alt="The 2D texture that represents the crust on top of the flowing lava." width="60%"/>
    <figcaption>Crust Texture = rbxassetid://17023930265</figcaption>
  </figure>
  <figure>
  </figure>
</GridContainer>

To recreate the flowing magma from the caldera in the sample [Volcano Island - Complete](https://www.roblox.com/games/17374256579/Volcano-Island-Complete) place file:

1. In the **Explorer** window, create a **Folder** in the **Workspace** to contain all flowing magma objects, then rename the folder **FlowingMagma**.
1. Insert a **block** part into the **FlowingMagma** folder, then rename it **MagmaRiverBeam**.
1. Move **MagmaRiverBeam** to slightly under the edge of the caldera.

   <img src="../../../assets/tutorials/creating-volcanoes/LavaFlow-3.jpg" alt="An angled top down view of the volcano with a block part highlighted." width="80%" />

1. Configure attachments for all flowing magma beams from the caldera to use to render their textures.
   1. Insert an attachment into **MagmaRiverBeam**, then rotate the attachment until the yellow visual aid points toward the caldera.
   1. Insert another attachment into **MagmaRiverBeam**, position it toward the fork in the crevice, then rotate the attachment until the yellow visual aid points down into the ground.

   <img src="../../../assets/tutorials/creating-volcanoes/LavaFlow-4.jpg" alt="An angled top down view of the volcano with two attachment visual aids highlighted." width="80%" />

1. Insert a **Beam** into **MagmaRiverBeam**, then rename it **Magma**.
1. Assign the part's attachments to **Magma**.
   1. In the **Explorer** window, select **Magma**.
   1. In the **Properties** window,
      1. Set **Attachment0** to the attachment at the edge of the caldera.
      1. Set **Attachment1** to the attachment at the fork in the crevice. The beam renders its default texture between the two attachments.

   <img src="../../../assets/tutorials/creating-volcanoes/LavaFlow-6.jpg" alt="An angled top down view of the volcano with two block parts rendering the default beam texture between the attachments." width="80%" />

1. Customize the beam's visual appearance so it looks like flowing magma.
   1. In the **Explorer** window, verify **Magma** is still selected.
   1. In the **Properties** window,
      1. Set **Width0** to `50` to widen the texture from the axis that it starts to render.
      1. Set **Width1** to `50` to widen the texture as it meets the fork in the crevice.
      1. Set **CurveSize0** to `-50` to curve the texture away from the crevice's floor.
      1. Set **CurveSize1** to `5` to curve the texture into the fork in the crevice.
      1. Set **Color** to a color sequence that starts bright red and becomes dark red over the beam's lifetime to simulate the magma cooling.
      - **Time** = `0`, **RGB Value** = `255, 51, 0`
      - **Time** = `0.5`, **RGB Value** = `211, 39, 0`
      - **Time** = `1`, **RGB Value** = `118, 24, 0`

      <img src="../../../assets/tutorials/creating-volcanoes/LavaFlow-7Color.jpg" alt="" width="80%" />

      1. Set **Transparency** to a number sequence that allows the magma to be more vibrant between the attachment points.
      - **Time** = `0`, **Value** = `1`
      - **Time** = `0.0916`, **Value** = `0`
      - **Time** = `0.867`, **Value** = `0`
      - **Time** = `0.941`, **Value** = `0.725`
      - **Time** = `1`, **Value** = `1`

      <img src="../../../assets/tutorials/creating-volcanoes/LavaFlow-7Transparency.jpg" alt="" width="80%" />

      1. Set **LightEmission** to `1` to significantly brighten the beam.
      1. Set **LightInfluence** to `0` to prevent the environmental light from affecting the color of the beam.
      1. Set **Brightness** to `8` to scale the light emitted from the beam.

   <video controls src="../../../assets/tutorials/creating-volcanoes/LavaFlow-7.mp4" alt="An angled top down view of the volcano with two block parts rendering the bottom layer custom texture." width="90%"></video>

1. Insert another **Beam** into **MagmaRiverBeam**, rename it **Crust1**, then attach the part's attachments to **Crust1** using the same process in step 6.
1. Customize the beam's visual appearance so it looks like crust on top of the magma.
   1. In the **Explorer** window, verify **Crust1** is still selected.
   1. In the **Properties** window,
      1. Set **Texture** to **rbxassetid://17023930265** to render a new texture that looks like flowing crust.
      1. Set **Width0** to `35` to widen the texture from the axis that it starts to render.
      1. Set **Width1** to `25` to widen the texture as it meets the fork in the crevice.
      1. Set **TextureSpeed** to `0.01` to significantly slow down the flow of the texture.
      1. Set **TextureLength** to `3` to slightly stretch the texture's length.
      1. Set **CurveSize0** to `-50` to curve the texture away from the crevice's floor.
      1. Set **CurveSize1** to `5` to curve the texture into the fork in the crevice.
      1. Set Color to `83, 83, 83` to tint the beam gray.
      1. Set **Transparency** to a number sequence that allows the crust to be more vibrant between the attachment points.
      - **Time** = `0`, **Value** = `1`
      - **Time** = `0.22`, **Value** = `0`
      - **Time** = `0.85`, **Value** = `0`
      - **Time** = `1`, **Value** = `1`

      <img src="../../../assets/tutorials/creating-volcanoes/LavaFlow-9Transparency.jpg" alt="" width="80%" />

      1. Set **ZOffset** to `1` to offset the texture to be slightly away from the caldera.

   <video controls src="../../../assets/tutorials/creating-volcanoes/LavaFlow-9.mp4" alt="An angled top down view of the volcano with two block parts rendering the bottom and middle layer custom textures." width="90%"></video>

1. Duplicate **Crust1**, rename it **Crust2**, then in the **Properties** window,
   1. Set **Attachment0** to the attachment at the fork in the crevice.
   1. Set **Attachment1** to the attachment at the edge of the caldera.
   1. Set **Width0** to `25` to widen the texture from the axis that it starts to render.
   1. Set **Width1** to `35` to widen the texture as it meets the fork in the crevice.
   1. Set **TextureSpeed** to `-0.008` to significantly slow down the flow of the texture.
   1. Set **TextureLength** to `2` to slightly unstretch the texture's length.
   1. Set **CurveSize0** to `-5` to curve the texture away from the crevice's floor.
   1. Set **CurveSize1** to `50` to curve the texture into the fork in the crevice.
   1. Set **ZOffset** to `2` to offset the texture from the other crust.

   <video controls src="../../../assets/tutorials/creating-volcanoes/LavaFlow-10.mp4" alt="An angled top down view of the volcano with two block parts rendering the bottom, middle, and top layer custom textures." width="90%"></video>

1. **(Optional)** Using this same process, create more beams around the fork in the crevice to offshoot the magma. Be sure to adjust the properties to slow the textures and simulate magma that's darker in color as it cools in temperature.

   <video controls src="../../../assets/tutorials/creating-volcanoes/LavaFlow-11.mp4" alt="An angled top down view of the volcano with two block parts rendering the bottom, middle, and top layer custom textures with forking beams." width="90%"></video>

### Smoke plume

A **smoke plume** from the caldera emits warm pressurized gas, steam, and volcanic ash into the atmosphere. This mixture of volcanic emission can be seen for miles in the real world, so volcano designs often incorporate large smoke plumes to be a significant point of interest in the 3D space.

Rather than emitting thick, pyroclastic smoke that one would see immediately following an explosive eruption, the sample uses a `Class.ParticleEmitter` object to emit particles that look like thin smoke vapors that change color as they rise upwards. This technique accomplishes two goals:

- It breaks up the silhouette of the background crater, creating more visual interest around the volcanic eruption.
- It allows the smoke to look like it accepts light from the environment while still emitting a dark presence as though the smoke is burning impurities into the air before turning gray like the night sky.

<GridContainer numColumns="2">
  <figure>
    <img src="../../../assets/tutorials/creating-waterfalls/Mist-Texture.png" alt="The 2D texture that represents the smoke rising out of the caldera." width="60%"/>
    <figcaption>Smoke Texture = rbxassetid://16830667309</figcaption>
  </figure>
  <figure>
  </figure>
</GridContainer>

To recreate the smoke plume from the caldera in the sample [Volcano Island - Complete](https://www.roblox.com/games/17374256579/Volcano-Island-Complete) place file:

1. Insert a **block** part into the **Caldera** folder, then rename it **SmokePlume**.
1. Position **SmokePlume** underneath the caldera, then scale it to roughly the size of the caldera's surface area.

   <img src="../../../assets/tutorials/creating-volcanoes/Plume-2.jpg" alt="An angled side view of the volcano with a block part highlighted underneath the caldera." width="80%" />

1. Insert a **ParticleEmitter** into **SmokePlume**, then rename the emitter **Smoke**.
1. Select **Smoke**, then in the **Properties** window,
   1. Set **Texture** to **rbxassetid://16830673704** to render particles that look like thick smoke.
   1. Set **Color** to a color sequence in which particles simulate lighting in the environment from the caldera to the sky by starting black, becoming a light peach, then gray.
   - **Time** = `0`, **RGB Value** = `0, 0, 0`
   - **Time** = `0.374`, **RGB Value** = `195, 104, 76`
   - **Time** = `0.469`, **RGB Value** = `225, 121, 86`
   - **Time** = `0.709`, **RGB Value** = `111, 111, 111`
   - **Time** = `1`, **RGB Value** = `113, 113, 113`

   <img src="../../../assets/tutorials/creating-volcanoes/Plume-4Color.jpg" alt="" width="80%" />

   1. Set **Transparency** to a number sequence in which particles start as transparent, become fully opaque early into their lifetime, then become transparent again near the end of their lifetime.
   - **Time** = `0`, **Value** = `1`
   - **Time** = `0.0622`, **Value** = `0`
   - **Time** = `0.845`, **Value** = `0`
   - **Time** = `0`, **Value** = `1`

   <img src="../../../assets/tutorials/creating-volcanoes/Plume-4Transparency.jpg" alt="" width="80%" />

   1. Set **ZOffset** to `-10` to offset the texture to be closer to the top of the caldera.
   1. Set **Lifetime** to `50, 60` to randomly set each particle's lifetime between 50 and 60 seconds.
   1. Set **Rate** to `0.3` to emit a particle about every 3 seconds.
   1. Set **Rotation** to `-360, 360` to randomly orient each particle in a circle.
   1. Set **RotSpeed** to `-5, 5` to randomly emit each particle between -5 and 5 degrees per second.
   1. Set **SpreadAngle** to `5, 5` to emit particles in a small angle along the X and Z axis.
   1. Set **Acceleration** to `0, 7, 0` to simulate upward force and pull particles to the sky.
   1. Set **Drag** to `1` to have particles lose their speed with exponential decay.
   1. Enable **WindAffectsDrag** to have the wind in the environment push the smoke around.
   1. Set **LightEmission** to `0.1` to slightly brighten the particles.
   1. Set **LightInfluence** to `0.06` to significantly reduce how much the environmental light affects the color of particles.
1. In the **Command Bar**, input the following string to increase each particle's size from 40 to 100 studs across their lifetime with a small window of variation:

   ``` lua
   workspace.Caldera.SmokePlume.Smoke.Size = NumberSequence.new{NumberSequenceKeypoint.new(0,40,5), NumberSequenceKeypoint.new(1,100,15)}
   ```

   <video controls src="../../../assets/tutorials/creating-volcanoes/Plume-5.mp4" alt="An angled side view of the complete volcano." width="90%"></video>
