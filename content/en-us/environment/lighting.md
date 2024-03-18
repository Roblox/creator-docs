---
title: Global Lighting
description: Explains how to customize the global lighting with the Lighting service.
---

The `Class.Lighting` service contains properties that you can adjust to update
and customize the global lighting in an experience. There are five categories of
lighting properties:

- [Color](#color) &mdash; Configures hue within the experience.
- [Intensity](#intensity) &mdash; Configures the intensity or amount of light hitting the camera.
- [Shadows](#shadows) &mdash; Configures how a user experiences shadows within the experience.
- [Environment](#environment) &mdash; Configures the conditions of the experience's world, such as the time of day and geographic latitude.
- [Technology](#technology) &mdash; Configures the lighting technology Studio uses to render lighting and shadows.

## Color

### Ambient

The `Class.Lighting.Ambient|Ambient` property sets a hue for the **entirety** of an experience. This property affects the lighting for both outdoor and indoor environments.

<Tabs>
<TabItem label="[0, 0, 0]">
<img src="../assets/lighting-and-effects/lighting-properties/Ambient-0-0-0.jpg" width="800" height="450" alt="Lighting with Ambient property of [0, 0, 0]" />
</TabItem>
<TabItem label="[160, 80, 0]">
<img src="../assets/lighting-and-effects/lighting-properties/Ambient-160-80-0.jpg" width="800" height="450" alt="Lighting with Ambient property of [160, 80, 0]" />
</TabItem>
<TabItem label="[25, 0, 125]">
<img src="../assets/lighting-and-effects/lighting-properties/Ambient-25-0-125.jpg" width="800" height="450" alt="Lighting with Ambient property of [25, 0, 125]" />
</TabItem>
</Tabs>

### OutdoorAmbient

The `Class.Lighting.OutdoorAmbient|OutdoorAmbient`
property sets a hue for **outdoor areas** of an experience. This can
help simulate how the ambient color of real-life lighting changes
throughout the day. For example, sunlight in the early morning or late
afternoon is usually warmer and more pink and orange in tone, while late
evening is usually cooler and more blue and purple in tone.

In the following images, note that the lighting inside the garage and cafe doesn't change like it would if you were changing the [Ambient](#ambient) property.

<Tabs>
<TabItem label="[255, 150, 50]">
<img src="../assets/lighting-and-effects/lighting-properties/OutdoorAmbient-255-150-50.jpg" width="800" height="450" alt="Lighting with OutdoorAmbient property of [255, 150, 50]" />
</TabItem>
<TabItem label="[200, 150, 240]">
<img src="../assets/lighting-and-effects/lighting-properties/OutdoorAmbient-200-150-240.jpg" width="800" height="450" alt="Lighting with OutdoorAmbient property of [200, 150, 240]" />
</TabItem>
<TabItem label="[0, 175, 255]">
<img src="../assets/lighting-and-effects/lighting-properties/OutdoorAmbient-0-175-255.jpg" width="800" height="450" alt="Lighting with OutdoorAmbient property of [0, 175, 255]" />
</TabItem>
</Tabs>

### ColorShift_Top

The `Class.Lighting.ColorShift_Top|ColorShift_Top` property sets a hue that reflects from surfaces facing the sun or moon.

<Tabs>
<TabItem label="[0, 100, 255]">
<img src="../assets/lighting-and-effects/lighting-properties/ColorShift-Top-0-100-255.jpg" width="800" height="450" alt="Lighting with ColorShift_Top property of [0, 100, 255]" />
</TabItem>
<TabItem label="[255, 60, 0]">
<img src="../assets/lighting-and-effects/lighting-properties/ColorShift-Top-255-60-0.jpg" width="800" height="450" alt="Lighting with ColorShift_Top property of [255, 60, 0]" />
</TabItem>
</Tabs>

### ColorShift_Bottom

The `Class.Lighting.ColorShift_Bottom|ColorShift_Bottom` property sets a hue that reflects from surfaces that are facing away from the sun or moon.

In the following images, note the hue change on the sandstone wall facing away from the sun.

<Tabs>
<TabItem label="[255, 0, 220]">
<img src="../assets/lighting-and-effects/lighting-properties/ColorShift-Bottom-255-0-220.jpg" width="800" height="450" alt="Lighting with ColorShift_Bottom property of [255, 0, 220]" />
</TabItem>
<TabItem label="[0, 255, 190]">
<img src="../assets/lighting-and-effects/lighting-properties/ColorShift-Bottom-0-255-190.jpg" width="800" height="450" alt="Lighting with ColorShift_Bottom property of [0, 255, 190]" />
</TabItem>
</Tabs>

<Alert severity="warning">
This property is particularly subtle. If you cannot see a change in your experience, change the [Technology](#technology) property to **Compatibility** and/or increase the [Brightness](#brightness) value.
</Alert>

## Intensity

### Brightness

The `Class.Lighting.Brightness|Brightness` property sets the intensity of illumination. This can help increase the contrast between brightly illuminated areas and shadows, simulating bright sunshine and warmer weather.

<Tabs>
<TabItem label="0.5">
<img src="../assets/lighting-and-effects/lighting-properties/Brightness-0.5.jpg" width="800" height="450" alt="Lighting with Brightness property of 0.5" />
</TabItem>
<TabItem label="1.5">
<img src="../assets/lighting-and-effects/lighting-properties/Brightness-1.5.jpg" width="800" height="450" alt="Lighting with Brightness property of 1.5" />
</TabItem>
<TabItem label="3.75">
<img src="../assets/lighting-and-effects/lighting-properties/Brightness-3.75.jpg" width="800" height="450" alt="Lighting with Brightness property of 3.75" />
</TabItem>
</Tabs>

### ExposureCompensation

The `Class.Lighting.ExposureCompensation|ExposureCompensation` property applies exposure to an experience. Exposure is the amount of light that reaches the camera.

A lower value is similar to under-exposure in photography, while a higher value is similar to over-exposure.

<Tabs>
<TabItem label="0">
<img src="../assets/lighting-and-effects/lighting-properties/ExposureCompensation-0.jpg" width="800" height="450" alt="Lighting with ExposureCompensation property of 0" />
</TabItem>
<TabItem label="-1">
<img src="../assets/lighting-and-effects/lighting-properties/ExposureCompensation--1.jpg" width="800" height="450" alt="Lighting with ExposureCompensation property of -1" />
</TabItem>
<TabItem label="1.25">
<img src="../assets/lighting-and-effects/lighting-properties/ExposureCompensation-1.25.jpg" width="800" height="450" alt="Lighting with ExposureCompensation property of 1.25" />
</TabItem>
</Tabs>

## Shadows

### GlobalShadows

When enabled, the `Class.Lighting.GlobalShadows|GlobalShadows` property renders shadows.

<Tabs>
<TabItem label="Enabled">
<img src="../assets/lighting-and-effects/lighting-properties/GlobalShadows-True.jpg" width="800" height="450" alt="Lighting with GlobalShadows property enabled" />
</TabItem>
<TabItem label="Disabled">
<img src="../assets/lighting-and-effects/lighting-properties/GlobalShadows-False.jpg" width="800" height="450" alt="Lighting with GlobalShadows property disabled" />
</TabItem>
</Tabs>

### ShadowSoftness

The `Class.Lighting.ShadowSoftness|ShadowSoftness` property adjusts how blurry shadows are from a value of 0 (hard edges) to 1 (soft edges).

<Tabs>
<TabItem label="0">
<img src="../assets/lighting-and-effects/lighting-properties/ShadowSoftness-0.jpg" width="800" height="450" alt="Lighting with ShadowSoftness property of 0" />
</TabItem>
<TabItem label="1">
<img src="../assets/lighting-and-effects/lighting-properties/ShadowSoftness-1.jpg" width="800" height="450" alt="Lighting with ShadowSoftness property of 1" />
</TabItem>
</Tabs>

## Environment

### ClockTime and TimeOfDay

The `Class.Lighting.ClockTime|ClockTime` and `Class.Lighting.TimeOfDay|TimeOfDay` property both represent the current time of day in hours, and they are directly related; if you change one property, the other also changes.

The only difference between these properties is their numeric value; `Class.Lighting.ClockTime|ClockTime` represents time from hour 0 through 24 while
`Class.Lighting.TimeOfDay|TimeOfDay` represents time through a 24 hour string.

<Tabs>
<TabItem label="0 = 00:00:00">
<img src="../assets/lighting-and-effects/lighting-properties/TimeOfDay-0.jpg" width="800" height="450" alt="Lighting with ClockTime of 0 (TimeOfDay of 00:00:00)" />
</TabItem>
<TabItem label="6.3 = 06:18:00">
<img src="../assets/lighting-and-effects/lighting-properties/TimeOfDay-6.3.jpg" width="800" height="450" alt="Lighting with ClockTime of 6.3 (TimeOfDay of 06:18:00)" />
</TabItem>
<TabItem label="17 = 17:00:00">
<img src="../assets/lighting-and-effects/lighting-properties/TimeOfDay-17.jpg" width="800" height="450" alt="Lighting with ClockTime of 17 (TimeOfDay of 17:00:00)" />
</TabItem>
</Tabs>

<Alert severity="info">
Note that each property doesn't follow the actual time of day, and they will not change during an experience unless changed through a script.
</Alert>

### GeographicLatitude

The `Class.Lighting.GeographicLatitude|GeographicLatitude` property represents the geographic latitude in degrees. Note that while this property changes the position of the sun and moon, it does not change the [`ClockTime`](#clocktime-and-timeofday) and [`TimeOfDay`](#clocktime-and-timeofday) properties.

<video src="../assets/lighting-and-effects/lighting-properties/Geographic-Latitude.mp4" controls width="800" alt="Video showing GeographicLatitude property changing across 360 degrees"></video>

### EnvironmentDiffuseScale

The `Class.Lighting.EnvironmentDiffuseScale|EnvironmentDiffuseScale` property determines how much ambient light is derived from the environment.

In the following images, note how the ambient light changes, particularly inside the kitchen of the ramen shop.

<Tabs>
<TabItem label="0">
<img src="../assets/lighting-and-effects/lighting-properties/EnvironmentDiffuseScale-0.jpg" width="800" height="450" alt="Lighting with EnvironmentDiffuseScale property of 0" />
</TabItem>
<TabItem label="1">
<img src="../assets/lighting-and-effects/lighting-properties/EnvironmentDiffuseScale-1.jpg" width="800" height="450" alt="Lighting with EnvironmentDiffuseScale property of 1" />
</TabItem>
</Tabs>

### EnvironmentSpecularScale

The `Class.Lighting.EnvironmentSpecularScale|EnvironmentSpecularScale`
property determines how much specular light is derived from the
environment. When set near a value of 1, smooth objects better reflect
the environment and metal appears more realistic.

<Tabs>
<TabItem label="0">
<img src="../assets/lighting-and-effects/lighting-properties/EnvironmentSpecularScale-0.jpg" width="800" height="450" alt="Lighting with EnvironmentSpecularScale property of 0" />
</TabItem>
<TabItem label="1">
<img src="../assets/lighting-and-effects/lighting-properties/EnvironmentSpecularScale-1.jpg" width="800" height="450" alt="Lighting with EnvironmentSpecularScale property of 1" />
</TabItem>
</Tabs>

## Technology

The `Class.Lighting.Technology|Technology`
property determines the lighting system for rendering the 3D
environment. There are four available lighting systems, in order of fidelity and performance impact from highest to lowest:

- **Future** &mdash; Features the most advanced technology for high-fidelity lighting and shadows.
  - Extends detailed shadow support to all types of lights, with complex shadow technology for sun shadows and a more realistic lighting and shadow technology for point lights.
  - This is the most realistic lighting mode, but its high fidelity might result in a negative performance impact, especially on low-end devices.

- **ShadowMap** &mdash; Features shadow mapping that produces more realistic and sharper shadows from sunlight or directional light sources. For any other types of light, such as `Class.PointLight|PointLights`, it uses voxel grids with less precision and performance impact.

- **Voxel** &mdash; Divides the 3D world into a 4&times;4&times;4 voxel grid for light and shadow calculation.
  - Each voxel represents a small cubic volume of space. The grid contains information on light presence in each voxel and helps determine how light interacts with your 3D environment and objects.
  - Provides less precise lighting and softer shadows compared to more advanced shadow mapping techniques like **ShadowMap**.
  - Only recommended for low-end devices.

- **Compatibility** (not recommended) &mdash; Simulates the deprecated legacy technology using the **Voxel** system.

<Tabs>
<TabItem label="Future">
<img src="../assets/lighting-and-effects/lighting-properties/Technology-Future.jpg" width="800" height="450" alt="Lighting with Technology setting of Future" />
</TabItem>
<TabItem label="ShadowMap">
<img src="../assets/lighting-and-effects/lighting-properties/Technology-ShadowMap.jpg" width="800" height="450" alt="Lighting with Technology setting of ShadowMap" />
</TabItem>
<TabItem label="Voxel">
<img src="../assets/lighting-and-effects/lighting-properties/Technology-Voxel.jpg" width="800" height="450" alt="Lighting with Technology setting of Voxel" />
</TabItem>
<TabItem label="Compatibility">
<img src="../assets/lighting-and-effects/lighting-properties/Technology-Compatibility.jpg" width="800" height="450" alt="Lighting with Technology setting of Compatibility" />
</TabItem>
</Tabs>
