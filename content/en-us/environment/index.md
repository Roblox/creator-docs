---
title: Lighting and Effects
description: Create more immersive environments through lighting, atmospheres, and special effects.
---

The `Class.Lighting` and `Class.SoundService` container services let you control
and customize environmental effects, such as ligthing, atmosphere, skies and
clouds, and sound.

## Global Lighting

The `Class.Lighting` service contains properties that
you can adjust to update the global lighting in an experience, such as the
`Class.Lighting.Ambient|Ambient` and `Class.Lighting.Brightness|Brightness`.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/lighting-and-effects/lighting-properties/Ambient-0-0-0.jpg" />
    <figcaption>Ambient = [0, 0, 0]</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/lighting-properties/Ambient-25-0-125.jpg" />
    <figcaption>Ambient = [25, 0, 125]</figcaption>
  </figure>
</GridContainer>

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/lighting-and-effects/lighting-properties/Brightness-0.5.jpg" />
    <figcaption>Brightness = 0.5</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/lighting-properties/Brightness-3.75.jpg" />
    <figcaption>Brightness = 3.75</figcaption>
  </figure>
</GridContainer>

<Alert severity="info">
[Light sources](../effects/light-sources.md) let you attach lighting effects to parts
or attachments to simulate things like
such as lamps, torches, spotlights, or TV screens. By using light sources
in addition to global, you can create
even more detailed and immersive environments.
</Alert>

### Atmospheric Effects

[Atmospheric effects](../environment/atmosphere.md) simulate realistic environments by
scattering sunlight in unique ways based on properties that control air
particles. Using the
`Class.Atmosphere` object in the
`Class.Lighting` service, you can:

- Control particle [density](../environment/atmosphere.md#density).
- Create a silhouette or blend distant objects ([offset](../environment/atmosphere.md#offset)).
- Simulate a [haze](../environment/atmosphere.md#haze) or [glare](../environment/atmosphere.md#glare).
- Set an atmosphere's [color](../environment/atmosphere.md#color) or [decay](../environment/atmosphere.md#decay).

<img src="../assets/lighting-and-effects/atmosphere/Showcase.jpg"
width="100%" />

### Post-Processing Effects

Post-processing effects are customizable filters that allow you to quickly
enrich the visuals of your experience. Using the post-processing effect objects
in the `Class.Lighting` service or
`Class.Camera`, you can:

- Simulate a camera viewing a bright light and exaggerate its glow
  ([bloom](../environment/post-processing-effects.md#bloom)).
- Apply a Gaussian [blur](../environment/post-processing-effects.md#blur) to the entirety of your
  experience or add a blur to parts of your experience that aren't in focus
  ([depth of field](../environment/post-processing-effects.md#depth-of-field)).
- Enhance an environment's appearance to create a specific mood through hue
  ([color correction](../environment/post-processing-effects.md#color-correction)).
- Render a halo of light that moves with the sun ([sun
  rays](/environment/post-processing-effects#sun-rays)).

<img
src="../assets/lighting-and-effects/post-processing/DepthOfFieldEffect-With.jpg"
width="100%" />

### Clouds and Skies

By default, the `Class.Sky` object
includes celestial bodies such as a sun, moon, and stars. You can customize these objects, as well as the [skybox](../environment/skybox.md) images. In addition, you can adjust the cloud cover, density, and color properties of the `Class.Clouds` object to render realistic, [dynamic clouds](../environment/clouds.md) that drift slowly across the sky.

<figure>
  <video src="../assets/lighting-and-effects/clouds/Showcase.mp4" controls width="100%" alt="Video of wind blowing dynamic clouds across the sky"></video>
  <figcaption>Wind blowing dynamic clouds across the sky</figcaption>
</figure>

## Sound

`Class.SoundService` lets you manage global sound playback and effects in your
experience. See the [Sound](../sound/index.md) documentation for more information.
