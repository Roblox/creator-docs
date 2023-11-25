---
title: Global Lighting
description: Explains how to customize the global lighting with the Lighting service.
---

The `Class.Lighting` service contains properties that you can adjust to update
and customize the global lighting in an experience. There are five categories of
lighting properties:

- [Color](#color) - Configures hue within the experience.
- [Intensity](#intensity) - Configures the intensity or amount of light hitting
  the camera.
- [Shadows](#shadows) - Configures how a user experiences shadows within the
  experience.
- [Environment](#environment) - Configures the conditions of the experience's
  world, such as the time of day and geographic latitude.
- [Technology](#technology) - Configures the lighting technology Studio uses to
  render lighting and shadows.

## Color

### Ambient

The `Class.Lighting.Ambient|Ambient`
property sets a hue for the **entirety** of an experience. This property
affects the lighting for both outdoor and indoor environments.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/lighting-and-effects/lighting-properties/Ambient-0-0-0.jpg" />
    <figcaption>Ambient = [0, 0, 0]</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/lighting-properties/Ambient-160-80-0.jpg" />
    <figcaption>Ambient = [160, 80, 0]</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/lighting-properties/Ambient-25-0-125.jpg" />
    <figcaption>Ambient = [25, 0, 125]</figcaption>
  </figure>
</GridContainer>

### OutdoorAmbient

The `Class.Lighting.OutdoorAmbient|OutdoorAmbient`
property sets a hue for **outdoor areas** of an experience. This can
help simulate how the ambient color of real-life lighting changes
throughout the day. For example, sunlight in the early morning or late
afternoon is usually warmer and more pink and orange in tone, while late
evening is usually cooler and more blue and purple in tone.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/lighting-and-effects/lighting-properties/OutdoorAmbient-255-150-50.jpg" />
    <figcaption>OutdoorAmbient = [255, 150, 50]</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/lighting-properties/OutdoorAmbient-200-150-240.jpg" />
    <figcaption>OutdoorAmbient = [200, 150, 240]</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/lighting-properties/OutdoorAmbient-0-175-255.jpg" />
    <figcaption>OutdoorAmbient = [0, 175, 255]</figcaption>
  </figure>
</GridContainer>

Note that the lighting inside the garage and cafe doesn't change like it would if you were
changing the `Class.Lighting.Ambient|Ambient`
property.

### ColorShift_Top

The `Class.Lighting.ColorShift_Top|ColorShift_Top`
property sets a hue that reflects from surfaces facing the sun or moon.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/lighting-and-effects/lighting-properties/ColorShift-Top-0-100-255.jpg" />
    <figcaption>ColorShift_Top = [0, 100, 255]</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/lighting-properties/ColorShift-Top-255-60-0.jpg" />
    <figcaption>ColorShift_Top = [255, 60, 0]</figcaption>
  </figure>
</GridContainer>

### ColorShift_Bottom

The `Class.Lighting.ColorShift_Bottom|ColorShift_Bottom`
property sets a hue that reflects from surfaces that are facing away
from the sun or moon.

In the following images, note the hue change on the sandstone wall facing away from the sun.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/lighting-and-effects/lighting-properties/ColorShift-Bottom-255-0-220.jpg" />
    <figcaption>ColorShift_Bottom = [255, 0, 220]</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/lighting-properties/ColorShift-Bottom-0-255-190.jpg" />
    <figcaption>ColorShift_Bottom = [0, 255, 190]</figcaption>
  </figure>
</GridContainer>

<Alert severity="warning">
This property is particularly subtle. If you cannot see a
change in your experience, change the <a href="#technology">Technology</a> property
to <b>Compatibility</b> and/or increase the <a href="#brightness">Brightness</a> value.
</Alert>

## Intensity

### Brightness

The `Class.Lighting.Brightness|Brightness`
property sets the intensity of illumination. This can help increase the
contrast between brightly illuminated areas and shadows, simulating
bright sunshine and warmer weather.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/lighting-and-effects/lighting-properties/Brightness-0.5.jpg" />
    <figcaption>Brightness = 0.5</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/lighting-properties/Brightness-1.5.jpg" />
    <figcaption>Brightness = 1.5</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/lighting-properties/Brightness-3.75.jpg" />
    <figcaption>Brightness = 3.75</figcaption>
  </figure>
</GridContainer>

### ExposureCompensation

The `Class.Lighting.ExposureCompensation|ExposureCompensation`
property applies exposure to an experience. Exposure is the amount of
light that reaches the camera.

A lower value is similar to under-exposure in photography, while a
higher value is similar to over-exposure.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/lighting-and-effects/lighting-properties/ExposureCompensation--1.jpg" />
    <figcaption>ExposureCompensation = -1</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/lighting-properties/ExposureCompensation-0.jpg" />
    <figcaption>ExposureCompensation = 0</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/lighting-properties/ExposureCompensation-1.25.jpg" />
    <figcaption>ExposureCompensation = 1.25</figcaption>
  </figure>
</GridContainer>

## Shadows

### GlobalShadows

When enabled, the `Class.Lighting.GlobalShadows|GlobalShadows`
property renders shadows.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/lighting-and-effects/lighting-properties/GlobalShadows-True.jpg" />
    <figcaption>GlobalShadows = Enabled</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/lighting-properties/GlobalShadows-False.jpg" />
    <figcaption>GlobalShadows = Disabled</figcaption>
  </figure>
</GridContainer>

### ShadowSoftness

The `Class.Lighting.ShadowSoftness|ShadowSoftness`
property adjusts how blurry shadows are from a value of 0 (hard edges)
to 1 (soft edges).

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/lighting-and-effects/lighting-properties/ShadowSoftness-0.jpg" />
    <figcaption>ShadowSoftness = 0</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/lighting-properties/ShadowSoftness-1.jpg" />
    <figcaption>ShadowSoftness = 1</figcaption>
  </figure>
</GridContainer>

## Environment

### ClockTime and TimeOfDay

The `Class.Lighting.ClockTime|ClockTime`
and `Class.Lighting.TimeOfDay|TimeOfDay`
property both represent the current time of day in hours, and they are
directly related; if you change one property, the other also changes.

The only difference between these properties is their numeric value;
`Class.Lighting.ClockTime|ClockTime`
represents time from hour 0 through 24 while
`Class.Lighting.TimeOfDay|TimeOfDay`
represents time through a 24 hour string.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/lighting-and-effects/lighting-properties/TimeOfDay-0.jpg" />
    <figcaption>ClockTime = 0 ; TimeOfDay = 00:00:00</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/lighting-properties/TimeOfDay-6.3.jpg" />
    <figcaption>ClockTime = 6.3 ; TimeOfDay = 06:18:00</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/lighting-properties/TimeOfDay-17.jpg" />
    <figcaption>ClockTime = 17 ; TimeOfDay = 17:00:00</figcaption>
  </figure>
</GridContainer>

<Alert severity="info">
Note that each property doesn't follow the actual time of day, and they
will not change during an experience unless changed through a
script.
</Alert>

### GeographicLatitude

The `Class.Lighting.GeographicLatitude|GeographicLatitude`
property represents the geographic latitude in degrees. Note that while this
property changes the position of the sun and moon, it does not change
the [`ClockTime`](#clocktime-and-timeofday) and [`TimeOfDay`](#clocktime-and-timeofday)
properties.

<video src="../assets/lighting-and-effects/lighting-properties/Geographic-Latitude.mp4" controls width="100%"></video>

### EnvironmentDiffuseScale

The `Class.Lighting.EnvironmentDiffuseScale|EnvironmentDiffuseScale`
property determines how much ambient light is derived from the
environment.

In the following images, note how the ambient light changes, particularly inside the kitchen of the ramen shop.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/lighting-and-effects/lighting-properties/EnvironmentDiffuseScale-0.jpg" />
    <figcaption>EnvironmentDiffuseScale = 0</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/lighting-properties/EnvironmentDiffuseScale-1.jpg" />
    <figcaption>EnvironmentDiffuseScale = 1</figcaption>
  </figure>
</GridContainer>

### EnvironmentSpecularScale

The `Class.Lighting.EnvironmentSpecularScale|EnvironmentSpecularScale`
property determines how much specular light is derived from the
environment. When set near a value of **1**, smooth objects better reflect
the environment and metal appears more realistic.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/lighting-and-effects/lighting-properties/EnvironmentSpecularScale-0.jpg" />
    <figcaption>EnvironmentSpecularScale = 0</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/lighting-properties/EnvironmentSpecularScale-1.jpg" />
    <figcaption>EnvironmentSpecularScale = 1</figcaption>
  </figure>
</GridContainer>

## Technology

The `Class.Lighting.Technology|Technology`
property determines the lighting system for rendering the 3D
environment. There are four available lighting systems, in order of fidelity and performance impact from highest to lowest:

- **Future**: Features the most advanced technology for high-fidelity lighting and shadows.
  - Extends detailed shadow support to all types of lights, with complex shadow technology for sun shadows and a more realistic lighting and shadow technology for point lights.
  - This is the most realistic lighting mode, but its high fidelity might result in a negative performance impact, especially on low-end devices.

- **ShadowMap**: Features shadow mapping that produces more realistic and sharper shadows from sunlight or directional light sources. For any other types of light, such as point lights, it uses voxel grids with less precision and performance impact.

- **Voxel**: Divides the 3D world into a 4x4x4 voxel grid for light and shadow calculation.
  - Each voxel represents a small cubic volume of space.
  - The grid contains information on light presence in each voxel and helps determine how light interacts with your 3D environment and objects.
  - Voxel provides less precise lighting and softer shadows compared to more advanced shadow mapping techniques.
  - Only recommended for low-end devices.

- (Not Recommended) **Compatibility**: Simulates the deprecated legacy technology using the **Voxel** system.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/lighting-and-effects/lighting-properties/future.png" />
    <figcaption>Future</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/lighting-properties/shadowmaps.png" />
    <figcaption>ShadowMaps</figcaption>
  </figure>
</GridContainer>

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/lighting-and-effects/lighting-properties/voxel.png" />
    <figcaption>Voxel</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/lighting-properties/compatibility.png" />
    <figcaption>Compatibility</figcaption>
  </figure>
</GridContainer>
