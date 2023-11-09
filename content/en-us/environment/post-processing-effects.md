---
title: Post-Processing Effects
description: Post-processing effects are customizable filters that quickly enrich the visuals of an experience.
---

**Post-processing effects** are customizable filters that allow you to
quickly enrich the visuals of your experience. Using the post-processing
effect objects in the
`Class.Lighting`
service or
`Class.Camera`,
you can:

- Simulate a camera viewing a bright light and exaggerate its glow
  ([bloom](#bloom)).
- Apply a Gaussian [blur](#blur) to the entirety of your
  experience, or add a blur to parts of your experience that aren't
  in focus ([depth of field](#depth-of-field)).
- Enhance an environment's appearance to create a specific mood
  through hue ([color correction](#color-correction)).
- Render a halo of light that moves with the sun ([sun
  rays](#sun-rays)).

<img src="../assets/lighting-and-effects/post-processing/DepthOfFieldEffect-With.jpg" width="100%" />

## Adding Post-Processing Effects

When you add post-processing effects to the
`Class.Lighting`
service, they display to a **whole server**. This is useful for effects
that affect the entire environment, such as [sun
rays](#sun-rays).

When you add them to the
`Class.Camera`,
they just display to an **individual player**. This is useful for
effects that should only pertain to a single player based on their
actions, such as player feedback.

To add post-processing effects to either the
`Class.Lighting`
service or
`Class.Camera`:

1. Navigate to the **Explorer** window.
2. Hover over the
   `Class.Lighting`
   service or
   `Class.Camera`,
   then click the &CirclePlus; button. A contextual menu displays.
3. From the menu, insert one of the following post-processing effects:

   - [**BloomEffect**](#bloom)
   - [**BlurEffect**](#blur)
   - [**ColorCorrectionEffect**](#color-correction)
   - [**DepthOfFieldEffect**](#depth-of-field)
   - [**SunRaysEffect**](#sun-rays)

4. Depending on your Studio settings, some effects may not appear. To increase
   your quality level:

   1. In the menu bar, navigate to **File**. A pop-up window displays.
   1. Select **Studio Settings**. The **Roblox Studio** pop-up window displays.
   1. In the vertical navigation, select **Rendering**, then the **Editor&nbsp;Quality&nbsp;Level** dropdown menu.
   1. Set it to the highest level.

## Bloom

The
`Class.BloomEffect`
object exaggerates any lights within your experience by simulating a
camera viewing a bright light. When this effect has a high value, any
parts with light colors glow.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/lighting-and-effects/post-processing/BloomEffect-With.jpg" />
    <figcaption>With Bloom</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/post-processing/BloomEffect-Without.jpg" />
    <figcaption>Without Bloom</figcaption>
  </figure>
</GridContainer>

## Blur

The `Class.BlurEffect`
object applies a gaussian blur to the entirety of your experience.

You can use this effect to blur your experience when a player has a menu
open, allowing them to focus on the most important details.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/lighting-and-effects/post-processing/BlurEffect-With.jpg" />
    <figcaption>With Blur</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/post-processing/BlurEffect-Without.jpg" />
    <figcaption>Without Blur</figcaption>
  </figure>
</GridContainer>

## Color Correction

The `Class.ColorCorrectionEffect` object adjusts color properties to enhance an environment's appearance. You can also use this effect to provide player feedback.

The following list describes all the color correction properties:

- **Brightness** &ndash; Sets the brightness of pixels.
- **Contrast** &ndash; Sets the change in separation between dark and light colors.
- **Enabled** &ndash; Toggles whether or not color correction occurs.
- **Saturation** &ndash; Sets the intensity of colors.
- **TintColor** &ndash; Determines how much the RGB channels of pixels scale.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/lighting-and-effects/post-processing/ColorCorrectionEffect-With.jpg" />
    <figcaption>With Color Correction</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/post-processing/ColorCorrectionEffect-Without.jpg" />
    <figcaption>Without Color Correction</figcaption>
  </figure>
</GridContainer>

## Depth of Field

The
`Class.DepthOfFieldEffect`
object blurs parts of your experience that aren't in focus. You can use
this effect to blur distant objects or to focus a player on specific
parts of your experience, such as an item in a shop.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/lighting-and-effects/post-processing/DepthOfFieldEffect-With.jpg" />
    <figcaption>With Depth of Field</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/post-processing/DepthOfFieldEffect-Without.jpg" />
    <figcaption>Without Depth of Field</figcaption>
  </figure>
</GridContainer>

<img src="../assets/legacy/DepthOfField-Diagram.svg" width="80%" />

## Sun Rays

The
`Class.SunRaysEffect`
object creates a halo of light with rays around the sun that move based
on the `Class.Lighting.ClockTime|ClockTime`
or `Class.Lighting.TimeOfDay|TimeOfDay` property.
Objects between the player's camera and the sun shape this effect,
allowing for realistic visuals of light and shadow.

<video src="../assets/lighting-and-effects/post-processing/Sun-Rays-Effect.mp4" controls width="100%"></video>
