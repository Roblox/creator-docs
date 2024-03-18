---
title: Post-Processing Effects
description: Post-processing effects are customizable filters that quickly enrich the visuals of an experience.
---

**Post-processing effects** are customizable filters that allow you to quickly enrich the visuals of your experience. Using the post-processing effect objects in the `Class.Lighting` service or `Class.Camera`, you can:

- Simulate a camera viewing a bright light and exaggerate its glow ([bloom](#bloom)).
- Apply a Gaussian [blur](#blur) to the entirety of your experience, or add a blur to parts of your experience that aren't in focus ([depth‑of‑field](#depth-of-field)).
- Enhance an environment's appearance to create a specific mood through hue ([color correction](#color-correction)).
- Render a halo of light that moves with the sun ([sun rays](#sun-rays)).

<figure>
<img src="../assets/lighting-and-effects/post-processing/DepthOfFieldEffect-With.jpg" width="100%" alt="Landscape with depth-of-field effect applied, simulating distance blur" />
<figcaption>Landscape with depth-of-field effect applied, simulating distance blur</figcaption>
</figure>

## Adding Post-Processing Effects

When you add post-processing effects to the `Class.Lighting` service, they display to **all players** who enter the experience. This is useful for effects
that affect the global environment, such as [sun rays](#sun-rays).

When you add post-processing effects to the `Class.Camera` object, they only display to a **specific player**. This is useful for effects that should only pertain to that player based on their actions, such as blurring the 3D world view when they have a UI menu open.

To add post-processing effects to either the `Class.Lighting` service or `Class.Camera`:

1. Navigate to the [Explorer](../studio/explorer.md) window.
1. Hover over the `Class.Lighting` service or `Class.Camera`,
   then click the &CirclePlus; button. A contextual menu displays.
1. From the menu, insert one of the following post-processing effects:

   - [**BloomEffect**](#bloom)
   - [**BlurEffect**](#blur)
   - [**ColorCorrectionEffect**](#color-correction)
   - [**DepthOfFieldEffect**](#depth-of-field)
   - [**SunRaysEffect**](#sun-rays)

1. Depending on your Studio settings, some effects may not appear. To increase
   your rendering quality level:

   1. Navigate to **File** &rarr; **Studio Settings**. A pop-up window displays.
   2. In the left-side navigation, select **Rendering**, then the **Editor&nbsp;Quality&nbsp;Level** dropdown menu.
   3. Set it to the highest level.

## Bloom

The `Class.BloomEffect` effect exaggerates lights within your experience by simulating a camera viewing a bright light. When this effect has a high value, parts with light colors glow.

<Tabs>
<TabItem label="Default">
<img src="../assets/lighting-and-effects/post-processing/BloomEffect-Without.jpg" width="800" height="450" alt="Experience without any effects applied" />
</TabItem>
<TabItem label="Bloom Effect">
<img src="../assets/lighting-and-effects/post-processing/BloomEffect-With.jpg" width="800" height="450" alt="Experience with BloomEffect applied" />
</TabItem>
</Tabs>

## Blur

The `Class.BlurEffect` effect applies a Gaussian blur to the entirety of the 3D world view. You can use this effect to blur the background when a player has a menu open, allowing them to focus on the most important details.

<Tabs>
<TabItem label="Default">
<img src="../assets/lighting-and-effects/post-processing/BlurEffect-Without.jpg" width="800" height="450" alt="Experience without any effects applied" />
</TabItem>
<TabItem label="Blur Effect">
<img src="../assets/lighting-and-effects/post-processing/BlurEffect-With.jpg" width="800" height="450" alt="Experience with BlurEffect applied" />
</TabItem>
</Tabs>

## Color Correction

The `Class.ColorCorrectionEffect` effect adjusts color properties to enhance an environment's appearance. You can also use this effect to provide player feedback, such as tinting the screen red when their character's health is low.

The following list describes the primary `Class.ColorCorrectionEffect` properties:

- `Class.ColorCorrectionEffect.Brightness|Brightness` — Sets the brightness of pixels.
- `Class.ColorCorrectionEffect.Contrast|Contrast` — Sets the change in separation between dark and light colors.
- `Class.ColorCorrectionEffect.Saturation|Saturation` — Sets the intensity of colors.
- `Class.ColorCorrectionEffect.TintColor|TintColor` — Determines how much the RGB channels of pixels scale.

<Tabs>
<TabItem label="Default">
<img src="../assets/lighting-and-effects/post-processing/ColorCorrectionEffect-Without.jpg" width="800" height="450" alt="Experience without any effects applied" />
</TabItem>
<TabItem label="Color Correction Effect">
<img src="../assets/lighting-and-effects/post-processing/ColorCorrectionEffect-With.jpg" width="800" height="450" alt="Experience with ColorCorrectionEffect applied" />
</TabItem>
</Tabs>

## Depth-of-Field

The `Class.DepthOfFieldEffect` effect blurs parts of your experience that aren't in focus. You can use this effect to blur distant objects or to focus a player on specific parts of your experience, such as an item in a shop.

<Tabs>
<TabItem label="Default">
<img src="../assets/lighting-and-effects/post-processing/DepthOfFieldEffect-Without.jpg" width="800" height="450" alt="Experience without any effects applied" />
</TabItem>
<TabItem label="Depth-of-Field Effect">
<img src="../assets/lighting-and-effects/post-processing/DepthOfFieldEffect-With.jpg" width="800" height="450" alt="Experience with DepthOfFieldEffect applied" />
</TabItem>
</Tabs>

<img src="../assets/legacy/DepthOfField-Diagram.svg" width="80%" />

## Sun Rays

The `Class.SunRaysEffect` effect creates a halo of light with rays around the sun that move based on the `Class.Lighting.ClockTime|ClockTime`
or `Class.Lighting.TimeOfDay|TimeOfDay` property. Objects between the player's camera and the sun shape this effect, allowing for realistic visuals of light and shadow.

<video src="../assets/lighting-and-effects/post-processing/Sun-Rays-Effect.mp4" controls width="800" alt="Video showing sun rays as the sun moves across the sky" ></video>
