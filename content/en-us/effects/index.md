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

A [particle emitter](../effects/particle-emitters.md) is an object that emits customizable 2D images (particles) into the world, useful for simulating special effects like fire, smoke, and sparks.

<video src="../assets/lighting-and-effects/particle-emitter/Showcase.mp4"
controls width="100%"></video>

## Beams

A [beam](../effects/beams.md) is an object that renders a texture between two
`Class.Attachment` objects `Class.Beam.Attachment0` and
`Class.Beam.Attachment1`. By setting beam properties, you can:

- Add a [texture](../effects/beams.md#texture) and [color gradient](../effects/beams.md#color) to create interesting visuals like waterfalls and force fields.
- Modify a beam's [transparency](/effects/beams#transparency) so that it fades over time.
- Warp its shape by changing the [width](../effects/beams.md#width) or [curve](../effects/beams.md#curve) of each attachment point.

<video src="../assets/lighting-and-effects/beam/Showcase.mp4" controls
width="100%"></video>

## Trails

A [trail](../effects/trails.md) is an object that creates a trail between and behind two `Class.Attachment` objects as they move through space. Trails can help players visualize movement, such as a sword slashing through the air, projectiles flying to their target, or footprints walking away.

By setting trail properties, you can:

- Add a [texture](../effects/trails.md#texture) to create interesting visuals.
- Set a constant or gradient [color](../effects/trails.md#color).
- Modify a trail's [lifetime](../effects/trails.md#lifetime).

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
