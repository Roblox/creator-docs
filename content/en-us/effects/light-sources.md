---
title: Light sources
description: Light sources simulate realistic lighting from objects such as torches, spotlights, and screens.
---

Local light sources simulate realistic lighting from objects such as
lamps, torches, spotlights, and TV screens. By using the different types of
light sources instead of just general global lighting through the `Class.Lighting`
service, you can create immersive environments such as cyberpunk cities,
traditional light festivals, and moody detective scenes.

<img src="../assets/lighting-and-effects/light-sources/Showcase.jpg" alt="A far out view of a diner bulding in the middle of a nighttime city. The diner is utilizing several local light sources." width="800" />

<Alert severity="info">
The `Class.Lighting.LightingStyle|LightingStyle` property, modifiable only in the [Properties](../studio/properties.md) window for the global `Class.Lighting` object, sets your experience's lighting style. For more information, see [Appearance](../environment/lighting.md#appearance).
</Alert>

<Alert severity="success">
To view **light guides** that indicate the color and field of effect from light sources, such as the angle of light emission from the cone's apex of a `Class.SpotLight`, open [Studio Settings](../studio/setup.md#customization) and toggle on **Show Light Guides**.
</Alert>

## Light types

Local light sources include [PointLight](#pointlight), [SpotLight](#spotlight), and [SurfaceLight](#surfacelight). Each [shares various properties](#shared-properties) from the `Class.Light` class, including `Class.Light.Color|Color`, `Class.Light.Brightness|Brightness`, and `Class.Light.Shadows|Shadows`.

### PointLight

A `Class.PointLight` emits light spherically from a single point. This object is ideal for **non-directional** lights like bulbs, torches, and fireballs.

To create a point light in Studio, insert a `Class.PointLight` into an `Class.Attachment` or a `Class.BasePart` (`Class.Attachment` is recommended for point‑specific light emission). Then adjust the object's `Class.PointLight.Range|Range` as well as [shared properties](#shared-properties) like `Class.PointLight.Brightness|Brightness` and `Class.PointLight.Color|Color`.

#### Range

A point light's `Class.PointLight.Range|Range` property defines the radial distance of illumination from the light's position, measured in studs.

<Tabs>
<TabItem label="8">
<img src="../assets/lighting-and-effects/light-sources/PointLight-Range-8.jpg" alt="A street lamp point light with a small range." width="800" height="450" />
</TabItem>
<TabItem label="12">
<img src="../assets/lighting-and-effects/light-sources/PointLight-Range-12.jpg" alt="The same street lamp point light with a larger range." width="800" height="450" />
</TabItem>
</Tabs>

### SpotLight

A `Class.SpotLight` emits light in the shape of a cone with a spherical base. This object is ideal for directional lights like street lamps, flashlights, and headlights.

To create a spotlight in Studio, insert a `Class.SpotLight` into an `Class.Attachment` or a `Class.BasePart` and set its `Class.SpotLight.Face|Face` property to specify which direction light emits from. Then adjust the `Class.SpotLight.Angle|Angle` and `Class.SpotLight.Range|Range`, as well as [shared properties](#shared-properties) like `Class.SpotLight.Brightness|Brightness` and `Class.SpotLight.Color|Color`.

#### Face

A spotlight's `Class.SpotLight.Face|Face` property determines which face/axis light emits from, as shown from the following streetlamp's glowing light part:

<Tabs>
<TabItem label="Bottom">
<img src="../assets/lighting-and-effects/light-sources/SpotLight-Face-Bottom.jpg" alt="A street lamp spotlight that emits light from its bottom face." width="800" height="450" />
</TabItem>
<TabItem label="Left">
<img src="../assets/lighting-and-effects/light-sources/SpotLight-Face-Left.jpg" alt="A street lamp spotlight that emits light from its left face." width="800" height="450" />
</TabItem>
</Tabs>

#### Angle

A spotlight's `Class.SpotLight.Angle|Angle` property defines the angle of light emission from the cone's apex. The maximum value is `180` which illuminates a full half sphere from the apex.

<Tabs>
<TabItem label="30">
<img src="../assets/lighting-and-effects/light-sources/SpotLight-Angle-30.jpg" alt="A street lamp spotlight with a 30 degree angle of emission." width="800" height="450" />
</TabItem>
<TabItem label="75">
<img src="../assets/lighting-and-effects/light-sources/SpotLight-Angle-75.jpg" alt="The same street lamp spotlight with a 75 degree angle of emission." width="800" height="450" />
</TabItem>
</Tabs>

### SurfaceLight

A `Class.SurfaceLight` emits light from the face of a `Class.BasePart`. This object is ideal for lighting from computer screens, billboards, signs, and fluorescent panels.

To create a surface light in Studio, insert a `Class.SurfaceLight` into a `Class.BasePart` and set its `Class.SurfaceLight.Face|Face` property to specify which surface light emits from. Then adjust the `Class.SurfaceLight.Angle|Angle` and `Class.SurfaceLight.Range|Range`, as well as [shared properties](#shared-properties) like `Class.SurfaceLight.Brightness|Brightness` and `Class.SurfaceLight.Color|Color`.

#### Face

A surface light's `Class.SurfaceLight.Face|Face` property determines the face of the `Class.BasePart` from which light emanates. Notice that light emits from the entire surface, not just a point on the surface.

<Tabs>
<TabItem label="Bottom">
<img src="../assets/lighting-and-effects/light-sources/SurfaceLight-Face-Bottom.jpg" alt="A sign surface light that emits light from its bottom face." width="800" height="450" />
</TabItem>
<TabItem label="Right">
<img src="../assets/lighting-and-effects/light-sources/SurfaceLight-Face-Right.jpg" alt="A sign surface light that emits light from its right face." width="800" height="450" />
</TabItem>
</Tabs>

#### Angle

A surface light's `Class.SurfaceLight.Angle|Angle` property defines the angle of light emission from the part's surface. An angle of `0` means that light travels directly outward from the surface while an angle of `180` means light travels outward perpendicular to the surface.

<Tabs>
<TabItem label="0">
<img src="../assets/lighting-and-effects/light-sources/SurfaceLight-Angle-0.jpg" alt="A sign surface light with a 0 degree angle of emission." width="800" height="450" />
</TabItem>
<TabItem label="60">
<img src="../assets/lighting-and-effects/light-sources/SurfaceLight-Face-Right.jpg" alt="A sign surface light with a 60 degree angle of emission." width="800" height="450" />
</TabItem>
</Tabs>

## Shared properties

All light sources share various properties from the `Class.Light` class, including [color](#color), [brightness](#brightness), and [shadows](#shadows).

### Color

The `Class.Light.Color|Color` property sets the `Datatype.Color3` value of the emitted light.

<Tabs>
<TabItem label="[255, 100, 50]">
<img src="../assets/lighting-and-effects/light-sources/Light-Color-255-100-50.jpg" alt="A torch that emits red light." width="600" height="337" />
</TabItem>
<TabItem label="[0, 255, 125]">
<img src="../assets/lighting-and-effects/light-sources/Light-Color-0-255-125.jpg" alt="A torch that emits green light." width="600" height="337" />
</TabItem>
<TabItem label="[75, 150, 255]">
<img src="../assets/lighting-and-effects/light-sources/Light-Color-75-150-255.jpg" alt="A torch that emits blue light." width="600" height="337" />
</TabItem>
</Tabs>

### Brightness

The `Class.Light.Brightness|Brightness` property sets the light's brightness with maximum effect at the center of the light. Note that `Class.Light.Brightness|Brightness` is still limited to the light's defined range, so a higher `Class.Light.Brightness|Brightness` value doesn't light up a larger region around the light.

<Tabs>
<TabItem label="2">
<img src="../assets/lighting-and-effects/light-sources/Light-Brightness-2.jpg" alt="A torch that emits low light." width="600" height="337" />
</TabItem>
<TabItem label="10">
<img src="../assets/lighting-and-effects/light-sources/Light-Brightness-10.jpg" alt="A torch that emits medium light." width="600" height="337" />
</TabItem>
<TabItem label="50">
<img src="../assets/lighting-and-effects/light-sources/Light-Brightness-50.jpg" alt="A torch that emits bright light." width="600" height="337" />
</TabItem>
</Tabs>

### Shadows

The `Class.Light.Shadows|Shadows` property projects shadows where light is blocked by an obstacle.

<Tabs>
<TabItem label="Enabled">
<img src="../assets/lighting-and-effects/light-sources/Light-Shadows-True.jpg" alt="A corner view of the diner with shadows enabled." width="800" height="450" />
</TabItem>
<TabItem label="Disabled">
<img src="../assets/lighting-and-effects/light-sources/Light-Shadows-False.jpg" alt="A corner view of the diner with shadows disabled." width="800" height="450" />
</TabItem>
</Tabs>
