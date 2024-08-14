---
title: Light Sources
description: Light sources simulate realistic lighting from objects such as torches, spotlights, and screens.
---

**Light sources** locally simulate realistic lighting from objects such as
lamps, torches, spotlights, and TV screens. By using the different types of
light sources instead of just general global lighting through the `Class.Lighting`
service, you can create immersive environments such as cyberpunk cities,
traditional light festivals, and moody detective scenes.

<img src="../assets/lighting-and-effects/light-sources/Showcase.jpg" width="800" />

<Alert severity="info">
The `Class.Lighting.Technology|Technology` property, modifiable only in the [Properties](../studio/properties.md) window for the global `Class.Lighting` object, sets your experience's lighting technology and affects the visual appearance of light sources. For more information, see [Technology](../environment/lighting.md#technology).
</Alert>

<Alert severity="success">
To view **light guides** that indicate the color and field of effect from light sources, such as the angle of light emission from the cone's apex of a `Class.SpotLight`, open **File**&nbsp;&rang; **Studio&nbsp;Settings** and toggle on **Show&nbsp;Light&nbsp;Guides**.
</Alert>

## Light Types

Light types include [Point Light](#point-light), [Spotlight](#spotlight), and [Surface Light](#surface-light). Each shares various properties from the `Class.Light` class, including `Class.Light.Color|Color`, `Class.Light.Brightness|Brightness`, and `Class.Light.Shadows|Shadows`.

### Point Light

A `Class.PointLight` emits light spherically from a single point. This object is ideal for **non-directional** lights like bulbs, torches, and fireballs.

A point light's `Class.PointLight.Range|Range` property defines the radial distance of illumination from the light's position, measured in studs.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/lighting-and-effects/light-sources/PointLight-Range-8.jpg" />
    <figcaption>Range = 8</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/light-sources/PointLight-Range-12.jpg" />
    <figcaption>Range = 12</figcaption>
  </figure>
</GridContainer>

To create a `Class.PointLight` in Studio:

1. In the [Explorer](../studio/explorer.md) window, hover over an `Class.Attachment` or a `Class.BasePart` and click the &CirclePlus; button (`Class.Attachment` is recommended for point‑specific light emission).
1. From the menu, insert a `Class.PointLight`.
1. Adjust the light's `Class.PointLight.Range|Range` as well as [shared properties](#shared-properties) like `Class.PointLight.Brightness|Brightness` and `Class.PointLight.Color|Color`.

### Spotlight

A `Class.SpotLight` emits light in the shape of a cone with a spherical base. This object is ideal for directional lights like street lamps, flashlights, and headlights.

The spotlight's `Class.SpotLight.Face|Face` property determines which face/axis light emits from,
as shown from the following streetlamp's glowing light part:

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/lighting-and-effects/light-sources/SpotLight-Face-Bottom.jpg" />
    <figcaption>Face = Bottom</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/light-sources/SpotLight-Face-Left.jpg" />
    <figcaption>Face = Left</figcaption>
  </figure>
</GridContainer>

A spotlight's `Class.SpotLight.Angle|Angle` property defines the angle of light emission from the cone's apex. The maximum value is **180** which illuminates a full half sphere from the apex.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/lighting-and-effects/light-sources/SpotLight-Angle-30.jpg" />
    <figcaption>Angle = 30</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/light-sources/SpotLight-Angle-75.jpg" />
    <figcaption>Angle = 75</figcaption>
  </figure>
</GridContainer>

To create a `Class.SpotLight` in Studio:

1. In the [Explorer](../studio/explorer.md) window, hover over an `Class.Attachment` or a `Class.BasePart` and click the &CirclePlus; button.
1. From the menu, insert a `Class.SpotLight`.
1. Set the light's `Class.SpotLight.Face|Face` property to specify which direction light emits from.
1. Adjust the light's `Class.SpotLight.Angle|Angle` and `Class.SpotLight.Range|Range`, as well as [shared properties](#shared-properties) like `Class.SpotLight.Brightness|Brightness` and `Class.SpotLight.Color|Color`.

### Surface Light

A `Class.SurfaceLight` emits light from the face of a `Class.BasePart`. This object is ideal for lighting from TV or computer screens, billboards, and fluorescent panels.

A surface light's `Class.SurfaceLight.Face|Face` property determines the face of the `Class.BasePart` from which light emanates. Notice that light emits from the entire surface, not just a point on the surface.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/lighting-and-effects/light-sources/SurfaceLight-Face-Bottom.jpg" />
    <figcaption>Face = Bottom</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/light-sources/SurfaceLight-Face-Right.jpg" />
    <figcaption>Face = Right</figcaption>
  </figure>
</GridContainer>

A surface light's `Class.SurfaceLight.Angle|Angle` property defines the angle of light emission from the part's surface. An angle of **0** means that light travels directly outward from the surface while an angle of **180** means light travels outward perpendicular to the surface.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/lighting-and-effects/light-sources/SurfaceLight-Angle-0.jpg" />
    <figcaption>Angle = 0</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/light-sources/SurfaceLight-Angle-60.jpg" />
    <figcaption>Angle = 60</figcaption>
  </figure>
</GridContainer>

To create a `Class.SurfaceLight` in Studio:

1. In the [Explorer](../studio/explorer.md) window, hover over a `Class.BasePart` and click the &CirclePlus; button.
1. From the menu, insert a `Class.SurfaceLight`.
1. Set the light's `Class.SurfaceLight.Face|Face` property to specify which surface light emits from.
1. Adjust the light's `Class.SurfaceLight.Angle|Angle` and `Class.SurfaceLight.Range|Range`, as well as [shared properties](#shared-properties) like `Class.SurfaceLight.Brightness|Brightness` and `Class.SurfaceLight.Color|Color`.

## Shared Properties

All light sources share various properties from the `Class.Light` class, including [color](#color), [brightness](#brightness), and [shadows](#shadows).

### Color

The `Class.Light.Color|Color` property sets the `Datatype.Color3` value of the emitted light.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/lighting-and-effects/light-sources/Light-Color-255-100-50.jpg" />
    <figcaption>Color = [255, 100, 50]</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/light-sources/Light-Color-0-255-125.jpg" />
    <figcaption>Color = [0, 255, 125]</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/light-sources/Light-Color-75-150-255.jpg" />
    <figcaption>Color = [75, 150, 255]</figcaption>
  </figure>
</GridContainer>

### Brightness

The `Class.Light.Brightness|Brightness` property sets the light's brightness with maximum effect at the center of the light. Note that `Class.Light.Brightness|Brightness` is still limited to the light's defined range, so a higher `Class.Light.Brightness|Brightness` value doesn't light up a larger region around the light.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/lighting-and-effects/light-sources/Light-Brightness-2.jpg" />
    <figcaption>Brightness = 2</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/light-sources/Light-Brightness-10.jpg" />
    <figcaption>Brightness = 10</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/light-sources/Light-Brightness-50.jpg" />
    <figcaption>Brightness = 50</figcaption>
  </figure>
</GridContainer>

### Shadows

The `Class.Light.Shadows|Shadows` property projects shadows where light is blocked by an obstacle.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/lighting-and-effects/light-sources/Light-Shadows-True.jpg" />
    <figcaption>Shadows = Enabled</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/light-sources/Light-Shadows-False.jpg" />
    <figcaption>Shadows = Disabled</figcaption>
  </figure>
</GridContainer>
