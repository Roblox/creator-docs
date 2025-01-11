---
title: Atmospheric Effects
description: Atmospheric effects simulate realistic environments by scattering sunlight in unique ways.
---

**Atmospheric effects** simulate realistic environments by scattering sunlight
in unique ways based on [properties](#atmosphere-properties) that control air particles. Using the `Class.Atmosphere` object, you can:

- Control particle [density](#density).
- Create a silhouette or blend distant objects ([offset](#offset)).
- Simulate a [haze](#haze) or [glare](#glare).
- Set an atmosphere's [color](#color) or [decay](#decay).

<img src="../assets/lighting-and-effects/atmosphere/Sahara-Sunset.jpg" width="100%" alt="Atmospheric effects used to render a brilliant sunset scene" />

## Atmosphere Properties

Every property of the `Class.Atmosphere` object inside the `Class.Lighting` service works together to support the overall vision, themes, and mood of your experience.

<img src="../assets/studio/explorer/Lighting-Atmosphere.png" width="320" alt="Atmosphere object shown in Explorer window of Studio" />

### Density

The `Class.Atmosphere.Density|Density` property controls how many particles exist in the air of your experience; the higher the density, the more particles, which obstruct a player's view of objects and terrain.

<Tabs>
  <TabItem label="0">
    <img src="../assets/lighting-and-effects/atmosphere/Density-A.jpg" width="800" height="400" alt="Atmosphere with Density value of 0" />
  </TabItem>
  <TabItem label="0.35">
    <img src="../assets/lighting-and-effects/atmosphere/Density-B.jpg" width="800" height="400" alt="Atmosphere with Density value of 0.35" />
  </TabItem>
</Tabs>

<Alert severity="info">
Density only **directly** affects objects and terrain; however, since you view a [skybox](../environment/skybox.md) through those objects and terrain, the visibility of a skybox is also affected.
</Alert>

### Offset

The `Class.Atmosphere.Offset|Offset` property controls how light transmits between the camera and the sky background. When you increase this value, it creates a horizon silhouette; when you decrease this value, it blends distant objects into the sky for a seemingly endless and seamless open world.

<Tabs>
  <TabItem label="0">
    <img src="../assets/lighting-and-effects/atmosphere/Offset-A.jpg" width="800" height="400" alt="Atmosphere with Offset value of 0" />
  </TabItem>
  <TabItem label="1">
    <img src="../assets/lighting-and-effects/atmosphere/Offset-B.jpg" width="800" height="400" alt="Atmosphere with Offset value of 1" />
  </TabItem>
</Tabs>

<Alert severity="warning">
Carefully balance the `Class.Atmosphere.Offset|Offset` property with the `Class.Atmosphere.Density|Density` property. A low offset value may cause the [skybox](../environment/skybox.md) to be seen through objects and terrain, and a high offset value may cause distant objects and terrain to have too much detail for your desired lighting effect.
</Alert>

### Haze

The `Class.Atmosphere.Haze|Haze` property controls the haziness of the atmosphere to create a visible effect both above the horizon and far into the distance from the camera. To create environmental moods, like a smoky tint for a polluted alien planet or a foggy blue tint for a somber experience, combine this property with the [Color](#color) property.

<Tabs>
  <TabItem label="1">
    <img src="../assets/lighting-and-effects/atmosphere/Haze-A.jpg" width="800" height="400" alt="Atmosphere with Haze value of 1" />
  </TabItem>
  <TabItem label="2.8">
    <img src="../assets/lighting-and-effects/atmosphere/Haze-B.jpg" width="800" height="400" alt="Atmosphere with Haze value of 2.8" />
  </TabItem>
</Tabs>

### Color

The `Class.Atmosphere.Color|Color`
property sets the hue of the atmosphere for subtle environmental moods
and themes. To expand this property's visible effect, combine it with a high
[Haze](#haze) property value.

<Tabs>
  <TabItem label="[255, 255, 255]">
    <img src="../assets/lighting-and-effects/atmosphere/Color-A.jpg" width="800" height="400" alt="Atmosphere with Color value of [255, 255, 255]" />
  </TabItem>
  <TabItem label="[255, 200, 255]">
    <img src="../assets/lighting-and-effects/atmosphere/Color-B.jpg" width="800" height="400" alt="Atmosphere with Color value of [255, 200, 255]" />
  </TabItem>
</Tabs>

### Glare

The `Class.Atmosphere.Glare|Glare`
property sets an atmospheric glare around the sun. A high value results in an
increased effect of sunlight cast onto the sky and experience. To see this property's visible effect, you **must** combine a glare with a
[Haze](#haze) value higher than 0.

<Tabs>
  <TabItem label="0">
    <img src="../assets/lighting-and-effects/atmosphere/Glare-A.jpg" width="800" height="400" alt="Atmosphere with Glare value of 0" />
  </TabItem>
  <TabItem label="1">
    <img src="../assets/lighting-and-effects/atmosphere/Glare-B.jpg" width="800" height="400" alt="Atmosphere with Glare value of 1" />
  </TabItem>
</Tabs>

### Decay

The `Class.Atmosphere.Decay|Decay`
property sets the hue of the atmosphere away from the sun, gradually falling off
from [Color](#color) toward this value. To see this property's visible effect, you **must** combine a glare with [Haze](#haze) and [Glare](#glare) values higher than 0.

<Tabs>
  <TabItem label="[255, 255, 255]">
    <img src="../assets/lighting-and-effects/atmosphere/Decay-A.jpg" width="800" height="400" alt="Atmosphere with Decay value of [255, 255, 255]" />
  </TabItem>
  <TabItem label="[255, 90, 80]">
    <img src="../assets/lighting-and-effects/atmosphere/Decay-B.jpg" width="800" height="400" alt="Atmosphere with Decay value of [255, 90, 80]" />
  </TabItem>
</Tabs>
