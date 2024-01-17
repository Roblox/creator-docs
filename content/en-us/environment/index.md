---
title: Lighting and Effects
description: Create more immersive environments through lighting, atmospheres, and special effects.
---

The `Class.Lighting` container services let you control and customize an experience's environment such as [ligthing](#global-lighting), [atmosphere](#atmospheric-effects), and [clouds](#clouds-and-skies). You can also apply [post-processing effects](#post-processing-effects) to adjust how the experience appears on the screen.

## Global Lighting

The `Class.Lighting` service contains properties that you can adjust to update the global lighting in an experience, such as the `Class.Lighting.ClockTime|ClockTime` and `Class.Lighting.Brightness|Brightness`.

<Tabs>
<TabItem label="ClockTime = 0">
<img src="../assets/lighting-and-effects/lighting-properties/TimeOfDay-0.jpg" width="800" height="450" alt="Lighting with ClockTime of 0 (TimeOfDay of 00:00:00)" />
</TabItem>
<TabItem label="ClockTime = 6.3">
<img src="../assets/lighting-and-effects/lighting-properties/TimeOfDay-6.3.jpg" width="800" height="450" alt="Lighting with ClockTime of 6.3 (TimeOfDay of 06:18:00)" />
</TabItem>
<TabItem label="Brightness = 0.5">
<img src="../assets/lighting-and-effects/lighting-properties/Brightness-0.5.jpg" width="800" height="450" alt="Lighting with Brightness property of 0.5" />
</TabItem>
<TabItem label="Brightness = 3.75">
<img src="../assets/lighting-and-effects/lighting-properties/Brightness-3.75.jpg" width="800" height="450" alt="Lighting with Brightness property of 3.75" />
</TabItem>
</Tabs>

<Alert severity="info">
In addition to global lighting, you can create and attach [light sources](../effects/light-sources.md) to parts or attachments to simulate objects like lamps, torches, spotlights, or TV screens.
</Alert>

## Atmospheric Effects

[Atmospheric effects](../environment/atmosphere.md) simulate realistic environments by scattering sunlight in unique ways. Using the `Class.Atmosphere` object in the `Class.Lighting` service, you can control air particle [density](../environment/atmosphere.md#density), simulate [haze](../environment/atmosphere.md#haze) or [glare](../environment/atmosphere.md#glare), set an atmosphere's [color](../environment/atmosphere.md#color), and more.

<figure>
<img src="../assets/lighting-and-effects/atmosphere/Showcase.jpg" width="800" alt="Atmospheric effects used to render a brilliant sunset scene" />
<figcaption>Atmospheric effects used to render a brilliant sunset scene</figcaption>
</figure>

## Clouds and Skies

By default, the `Class.Sky` object forms a [skybox](../environment/skybox.md) with celestial bodies such as a sun, moon, and stars. In addition, you can adjust the cloud cover, density, and color properties of the `Class.Clouds` object to render realistic, [dynamic clouds](../environment/clouds.md) that drift slowly across the sky through [global wind](../environment/global-wind.md).

<figure>
<video src="../assets/lighting-and-effects/clouds/Showcase.mp4" controls width="800" alt="Video of wind blowing dynamic clouds across the sky"></video>
<figcaption>Wind blowing dynamic clouds across the sky</figcaption>
</figure>

## Post-Processing Effects

Post-processing effects are customizable filters that allow you to quickly
enrich the visuals of your experience. Using the post-processing effect objects
in the `Class.Lighting` service or
`Class.Camera`, you can:

- Simulate a camera viewing a bright light and exaggerate its glow ([bloom](../environment/post-processing-effects.md#bloom)).
- Apply a Gaussian [blur](../environment/post-processing-effects.md#blur) to the entirety of your experience or add a blur to parts of your experience that aren't in focus ([depth‑of‑field](../environment/post-processing-effects.md#depth-of-field)).
- Enhance an environment's appearance to create a specific mood through hue ([color correction](../environment/post-processing-effects.md#color-correction)).
- Render a halo of light that moves with the sun ([sun rays](/environment/post-processing-effects#sun-rays)).

<figure>
<img src="../assets/lighting-and-effects/post-processing/DepthOfFieldEffect-With.jpg" width="800" alt="Landscape with depth-of-field effect applied, simulating distance blur" />
<figcaption>Landscape with depth-of-field effect applied, simulating distance blur</figcaption>
</figure>
