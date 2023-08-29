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

<img src="../assets/lighting-and-effects/skybox/Skybox-Unfolded.png" width="542" />

<img src="../assets/lighting-and-effects/skybox/Skybox-Folded.png" width="336" />

## Creating a Skybox

If you have created your own skybox images, you must first
[import](../projects/assets/manager.md#importing-assets)
them to Roblox before you can use them in a skybox. Each image must be
seamless along **all edges** of neighboring images when "folded" into a
cube.

To create a skybox:

1. In the **Explorer** window, insert a **Sky** object into the
   **Lighting** object:

   1. Hover over the **Lighting** object and click the &CirclePlus; button. A contextual menu displays.

   1. From the contextual menu, insert a **Sky**.

2. Select the **Sky** object.
3. In the **Properties** window, click on and assign a texture to
   each of the following sky properties:

   - **SkyboxBk** - The **back** square of the skybox.
   - **SkyboxDn** - The **down** square of the skybox.
   - **SkyboxFt** - The **front** square of the skybox.
   - **SkyboxLf** - The **left** square of the skybox.
   - **SkyboxRt** - The **right** square of the skybox.
   - **SkyboxUp** - The **up** square of the skybox.

   <img
   src="../assets/lighting-and-effects/skybox/Skybox-Property-Faces.png"
   width="542" />

## Customizing Properties

In addition to setting the skybox images, you can adjust various
properties to fine-tune its appearance.

### Sun, Moon, and Stars

By default, the Roblox
`Class.Sky` object
includes celestial bodies such as a sun, moon, and stars. These bodies
dynamically appear, rise, and set based on the
`Class.Lighting.TimeOfDay|TimeOfDay`
or
`Class.Lighting.ClockTime|ClockTime` property
values.

You can customize celestial bodies through the following properties:

- `Class.Sky.SunTextureId|SunTextureId` &ndash; Sets the texture of the sun.
- `Class.Sky.SunAngularSize|SunAngularSize` &ndash; Sets the relative size of the sun in degrees.
- `Class.Sky.MoonTextureId|MoonTextureId` &ndash; Sets the texture of the moon.
- `Class.Sky.MoonAngularSize|MoonAngularSize` &ndash; Sets the relative size of the moon in degrees.
- `Class.Sky.StarCount|StarCount` &ndash; Sets the amount of stars in the skybox.

To disable all celestial bodies, you can set the
`Class.Sky.CelestialBodiesShown|CelestialBodiesShown`
property to **false**. Alternatively, you can disable the sun and/or moon by setting
`Class.Sky.SunAngularSize|SunAngularSize` or
`Class.Sky.MoonAngularSize|MoonAngularSize` to **0**.
