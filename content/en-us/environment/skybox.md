---
title: Skyboxes
description: Skyboxes are cubes made up of six individual images that create an immersive background.
---

A **skybox** is a cube made up of six individual images that create an
immersive background in an experience. A skybox appears to be panoramic
because the images are made to be perfectly aligned with each other,
allowing you to look in all directions without the impression of being
inside a cube. This makes experiences feel larger than
they really are, and it adds depth to your atmosphere, such as simulating
deep space or underwater environments.

<figure>
<img src="../assets/lighting-and-effects/skybox/Skybox-Unfolded.png" width="722" />
<figcaption>Skybox image faces</figcaption>
</figure>

<figure>
<img src="../assets/lighting-and-effects/skybox/Skybox-Folded.png" width="448" />
<figcaption>Faces "folded" to imply formation of skybox cube</figcaption>
</figure>

## Creating a Skybox

If you've created your own skybox images, you must first [import](../projects/assets/manager.md#importing-assets) them to Roblox before you can use them in a skybox. Each image must be seamless along **all edges** of neighboring images when "folded" into a cube.

To create a skybox:

1. In the [Explorer](../studio/explorer.md) window, insert a **Sky** object into the **Lighting** object.

   <img src="../assets/studio/explorer/Lighting-Sky.png" width="320" />

1. Select the new **Sky** object.
1. In the [Properties](../studio/properties.md) window, assign a texture to each of the following sky properties:

   - **SkyboxBk** — The **back** square of the skybox.
   - **SkyboxDn** — The **down** square of the skybox.
   - **SkyboxFt** — The **front** square of the skybox.
   - **SkyboxLf** — The **left** square of the skybox.
   - **SkyboxRt** — The **right** square of the skybox.
   - **SkyboxUp** — The **up** square of the skybox.

   <img src="../assets/lighting-and-effects/skybox/Skybox-Property-Faces.png" width="722" />

## Celestial Bodies

By default, the `Class.Sky` object includes celestial bodies such as a sun, moon, and stars. These bodies dynamically appear, rise, and set based on the
`Class.Lighting.TimeOfDay|TimeOfDay` or `Class.Lighting.ClockTime|ClockTime` property values.

You can customize celestial bodies through the following properties:

- `Class.Sky.SunTextureId|SunTextureId` — Sets the texture of the sun.
- `Class.Sky.SunAngularSize|SunAngularSize` — Sets the relative size of the sun in degrees.
- `Class.Sky.MoonTextureId|MoonTextureId` — Sets the texture of the moon.
- `Class.Sky.MoonAngularSize|MoonAngularSize` — Sets the relative size of the moon in degrees.
- `Class.Sky.StarCount|StarCount` — Sets the amount of stars in the skybox.

<Alert severity="info">
To disable all celestial bodies, you can toggle off the `Class.Sky.CelestialBodiesShown|CelestialBodiesShown` property. Alternatively, you can disable only the sun and/or moon (while keeping the stars) by setting `Class.Sky.SunAngularSize|SunAngularSize` or `Class.Sky.MoonAngularSize|MoonAngularSize` to **0**.
</Alert>
