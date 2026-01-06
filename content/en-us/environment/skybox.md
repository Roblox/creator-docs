---
title: Skyboxes
description: Skyboxes are cubes made up of six individual images that create an immersive background.
---

A **skybox** is a cube made up of six individual images that create an immersive sky background in an experience. When the images are designed to be perfectly aligned with each other, the skybox appears to be panoramic without the impression of being inside a cube. This makes experiences feel larger than they really are, and it adds depth to your atmosphere, such as simulating deep space or underwater environments.

Additionally, the `Class.Sky` object includes celestial bodies such as a sun, moon, and stars which dynamically appear, rise, and set based on the
`Class.Lighting.TimeOfDay|TimeOfDay` or `Class.Lighting.ClockTime|ClockTime`.

Finally, the `Class.Sky` object can be used as a cubemap for reflections in `Class.ViewportFrame|ViewportFrames`. For details, see [viewport frames](../ui/viewport-frames.md).

## Skybox construction

If you've created your own skybox images, you must first [import](../projects/assets/manager.md#asset-import) them to Roblox before you can use them in a skybox. Each image must be seamless along **all edges** of neighboring images when "folded" into a cube.

<Tabs>
<TabItem label="Image Faces">
<img src="../assets/lighting-and-effects/skybox/Skybox-Unfolded.png" width="722" />
</TabItem>
<TabItem label='Skybox "Folded"'>
<img src="../assets/lighting-and-effects/skybox/Skybox-Folded.png" width="722" height="542" />
</TabItem>
</Tabs><br />

To create a skybox:

1. In the **Explorer** window, insert a `Class.Sky` object into the `Class.Lighting` service.

   <img src="../assets/studio/explorer/Lighting-Sky.png" width="320" />

1. Select the new `Class.Sky` object, then in the **Properties** window, assign a texture to each of the following sky properties:

   - **SkyboxBk** — The **back** square of the skybox.
   - **SkyboxDn** — The **down** square of the skybox.
   - **SkyboxFt** — The **front** square of the skybox.
   - **SkyboxLf** — The **left** square of the skybox.
   - **SkyboxRt** — The **right** square of the skybox.
   - **SkyboxUp** — The **up** square of the skybox.

   <img src="../assets/lighting-and-effects/skybox/Skybox-Property-Faces.png" width="722" />

## Celestial bodies

By default, the `Class.Sky` object includes celestial bodies such as a sun, moon, and stars. These bodies dynamically appear, rise, and set based on the
`Class.Lighting.TimeOfDay|TimeOfDay` or `Class.Lighting.ClockTime|ClockTime` property values.

You can customize celestial bodies through the following properties:

- `Class.Sky.SunTextureId|SunTextureId` — Sets the texture of the sun.
- `Class.Sky.SunAngularSize|SunAngularSize` — Sets the relative size of the sun in degrees.
- `Class.Sky.MoonTextureId|MoonTextureId` — Sets the texture of the moon.
- `Class.Sky.MoonAngularSize|MoonAngularSize` — Sets the relative size of the moon in degrees.
- `Class.Sky.StarCount|StarCount` — Sets the amount of stars in the skybox.

<Alert severity="info">
To disable all celestial bodies, you can toggle off the `Class.Sky.CelestialBodiesShown|CelestialBodiesShown` property. Alternatively, you can disable only the sun and/or moon (while keeping the stars) by setting `Class.Sky.SunAngularSize|SunAngularSize` or `Class.Sky.MoonAngularSize|MoonAngularSize` to `0`.
</Alert>

## Orientation

The `Class.Sky.SkyboxOrientation|SkyboxOrientation` property changes the orientation of the skybox surfaces. The property takes a `Datatype.Vector3` of degree values in the typical **XYZ** order, but rotation is **applied** first around the **Y** axis, then **X**, and then **Z** to allow for predictable control over complex movements.

<video src="../assets/lighting-and-effects/skybox/Skybox-Orientation.mp4" controls width="800" alt="Video showing how the SkyboxOrientation property changes the tilt and rotation of the skybox."></video>

An easy way to script an orientation animation is to spin around the **Y** axis (keeping the horizon level), then tilt this axis by setting **X** and **Z** to a fixed value. The following script, for example, animates the **Y** axis for spinning while keeping a consistent 30&deg; tilt on the **X** axis.

```lua
local Lighting = game:GetService("Lighting")
local RunService = game:GetService("RunService")

local sky = Lighting:FindFirstChild("Sky")

local ROTATION_SPEED = 5  -- In degrees per second

RunService.Heartbeat:Connect(function(deltaTime)
	sky.SkyboxOrientation = Vector3.new(
		30,
		(sky.SkyboxOrientation.Y + ROTATION_SPEED * deltaTime) % 360,
		0
	)
end)
```

<Alert severity="info">
The modulo operation `%` is optional but recommended. You can use values above `360` or below `0`, but using smaller numbers avoids issues when the animation runs for a very long time (due to limited precision).
</Alert>

Note that skybox orientation is a low-cost feature which works seamlessly across all platforms and visual quality levels. As a result, some intentional exceptions include:

- If the sky is visible in indoor reflections such as a mirror surface through an open window, that specific reflected view will not be rotated. Achieving this would require expensive re‑rendering and convolving of cubemaps which would significantly impact performance and broad availability.
- Only the skybox surfaces rotate; [celestial bodies](#celestial-bodies) are not affected by this property.
- If you utilize a `Class.Sky` within a `Class.ViewportFrame`, it will reflect the global `Class.Sky.SkyboxOrientation|SkyboxOrientation` values. You cannot adjust the angle per `Class.ViewportFrame`.
- The [dynamic clouds](./clouds.md) feature under `Class.Terrain` is not impacted.
