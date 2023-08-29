---
title: Effects
description: Learn how to add visual effects to your experiences.
---

You can create special effects by parenting special effect objects to other
objects or attachments.

## Light Sources

Light sources let you attach lighting effects to objects or attachments. There
are three types of light sources:

- A `Class.PointLight`
  emits light spherically from a single point. This object is ideal for
  non-directional lights like bulbs, torches, and fireballs.
- A `Class.SpotLight`
  emits light in the shape of a cone with a spherical base. This object is ideal
  for directional lights like street lamps, flashlights, and headlights.
- A `Class.SurfaceLight` emits light from the face of a BasePart. This object is
  ideal for lighting from TV or computer screens, billboards, and fluorescent
  panels.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/lighting-and-effects/light-sources/PointLight-Range-8.jpg" />
    <figcaption>Point Lights</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/light-sources/SpotLight-Face-Bottom.jpg" />
    <figcaption>Spotlights</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/light-sources/SurfaceLight-Angle-0.jpg" />
    <figcaption>Surface Lights</figcaption>
  </figure>
</GridContainer>

## Particle Emitters

A [particle emitter](../effects/particle-emitters.md) is an object that emits 2D
images (particles) that look and behave for the duration of their lifetime
according to the particle emitter's set properties.

<video src="../assets/lighting-and-effects/particle-emitter/Showcase.mp4"
controls width="100%"></video>

Particle [properties](../effects/particle-emitters.md#particle-properties) such as
the size, position, and color can change over time to create special effects
like sparkles, smoke, and explosions.

## Beams

A [Beam](../effects/beams.md) is an object that renders a texture between two
`Class.Attachment` objects `Class.Beam.Attachment0` and
`Class.Beam.Attachment1`. By setting beam properties, you can:

- [Add textures](../effects/beams.md#adding-a-texture) with [color
  gradients](/effects/beams#creating-a-color-gradient) to create interesting
  visuals like waterfalls and force fields.
- Modify a beam's transparency so that it [fades over
  time](/effects/beams#fading-a-beam).
- Warp its shape by changing the [width](../effects/beams.md#changing-a-beams-width)
  or [curve](../effects/beams.md#curving-a-beam) of each attachment point.

<video src="../assets/lighting-and-effects/beam/Showcase.mp4" controls
width="100%"></video>

## Trails

A [Trail](../effects/trails.md) is an object that creates a trail between and behind
two `Class.Attachment` objects `Class.Trail.Attachment0` and
`Class.Trail.Attachment1` that are associated with a part as it moves through a
space. Trails can help players visualize movement, such as a sword slashing
through the air, projectiles flying to their target, or footprints walking away.
By setting trail properties, you can:

- Add textures to create interesting visuals like a [rainbow
  trail](/effects/trails#rainbow-trail) or [rainbow trail
  marks](/effects/trails#car-skid-marks).
- [Customize a color gradient](../effects/trails.md#creating-a-color-gradient).
- [Modify a trail's length](../effects/trails.md#adjusting-a-trails-lifetime) for
  animated movement.

<video src="../assets/lighting-and-effects/trail/Showcase.mp4" controls
width="100%"></video>

## Highlighting

`Class.Highlight` is a visual effect you can use to call attention to a specific
object within your experience.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/ui/highlighting-objects/OutlineTransparency-1.jpg" width="95%" />
    <figcaption>Original Object</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/highlighting-objects/Overview-Yellow-Outline.jpg" width="96%" />
    <figcaption>Object with a yellow outline and black interior</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/highlighting-objects/Overview-Yellow-Interior.jpg" width="91%" />
    <figcaption>Object with a black outline and yellow interior</figcaption>
  </figure>
</GridContainer>
