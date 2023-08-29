---
title: Atmospheric Effects
description: Atmospheric effects simulate realistic environments by scattering sunlight in unique ways.
---

**Atmospheric effects** simulate realistic environments by scattering sunlight
in unique ways based on [properties](#properties) that control air particles.
Using the
`Class.Atmosphere`
object in the
`Class.Lighting`
service, you can:

- Control particle [density](#density).
- Create a silhouette or blend distant objects ([offset](#offset)).
- Simulate a [haze](#haze) or [glare](#glare).
- Set an atmosphere's [color](#color) or [decay](#decay).

<GridContainer numColumns="3">
  <img src="../assets/lighting-and-effects/atmosphere/Sahara-Sunset.jpg" />
  <img src="../assets/lighting-and-effects/atmosphere/Night-Cove.jpg" />
  <img src="../assets/lighting-and-effects/atmosphere/Alien-Seascape.jpg" />
</GridContainer>

## Properties

Every atmospheric effect property works together to support the overall vision,
themes, and mood of your experience.

### Density

The `Class.Atmosphere.Density|Density`
property controls how many particles exist in the air of your experience; the
higher the density, the more particles, which obstruct a player's view of
objects and terrain. This is useful in creating a depth of field.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/lighting-and-effects/atmosphere/Density-A.jpg" />
    <figcaption>Density = 0</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/atmosphere/Density-B.jpg" />
    <figcaption>Density = 0.35</figcaption>
  </figure>
</GridContainer>

Density only **directly** affects objects and terrain; however, since you view a
[skybox](./skybox.md) through those objects and terrain, the visibility of a skybox
is also affected.

### Offset

The `Class.Atmosphere.Offset|Offset`
property controls how light transmits between the camera and the sky
background. When you increase this value, it creates a horizon
silhouette; when you decrease this value, it blends distant objects into
the sky for a seemingly endless and seamless open world.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/lighting-and-effects/atmosphere/Offset-A.jpg" />
    <figcaption>Offset = 0</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/atmosphere/Offset-B.jpg" />
    <figcaption>Offset = 1</figcaption>
  </figure>
</GridContainer>

<Alert severity="warning">
Carefully balance the `Class.Atmosphere.Offset|Offset` property with the `Class.Atmosphere.Density|Density` property. A low offset value may cause the <a href="./skybox.md">skybox</a> to be seen through objects and terrain, and a high offset value may cause distant objects and terrain to have too much detail for your desired lighting effect.
</Alert>

### Haze

The `Class.Atmosphere.Haze|Haze`
property controls the haziness of the atmosphere to create a visible
effect both above the horizon and far into the distance from the camera.

To create environmental moods, like a smoky tint for a polluted alien
planet or a foggy blue tint for a somber experience, combine this
property with the [`Color`](#color) property.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/lighting-and-effects/atmosphere/Haze-A.jpg" />
    <figcaption>Haze = 1</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/atmosphere/Haze-B.jpg" />
    <figcaption>Haze = 2.8</figcaption>
  </figure>
</GridContainer>

### Color

The `Class.Atmosphere.Color|Color`
property sets the hue of the atmosphere for subtle environmental moods
and themes.

To expand this property's visible effect, combine it with a high
[`Haze`](#haze) property value.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/lighting-and-effects/atmosphere/Color-A.jpg" />
    <figcaption>Color = [255, 255, 255]</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/atmosphere/Color-B.jpg" />
    <figcaption>Color = [255, 200, 255]</figcaption>
  </figure>
</GridContainer>

### Glare

The `Class.Atmosphere.Glare|Glare`
property sets an atmospheric glare around the sun. A high value results in an
increased effect of sunlight cast onto the sky and experience.

To see this property's visible effect, you **must** combine a glare with a
[`Haze`](#haze) value higher than **0**.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/lighting-and-effects/atmosphere/Glare-A.jpg" />
    <figcaption>Glare = 0</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/atmosphere/Glare-B.jpg" />
    <figcaption>Glare = 1</figcaption>
  </figure>
</GridContainer>

### Decay

The `Class.Atmosphere.Decay|Decay`
property sets the hue of the atmosphere away from the sun, gradually falling off
from Color toward this value.

To see this property's visible effect, you **must** combine a glare with a
[`Haze`](#haze) and [`Glare`](#glare) value higher than **0**.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/lighting-and-effects/atmosphere/Decay-A.jpg" />
    <figcaption>Decay = [255, 255, 255]</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/atmosphere/Decay-B.jpg" />
    <figcaption>Decay = [255, 90, 80]</figcaption>
  </figure>
</GridContainer>
