---
title: 2D particle emitters
description: ParticleEmitter2D emits 2D images from a UI object to simulate effects like sparkles, bursts, and glows within your interface.
---

import BetaAlert from '../includes/beta-features/beta-alert.md'

<BetaAlert betaName="UI Particles" leadIn="This feature and its class/enum are currently in beta. Enable them through " leadOut="." components={props.components} />

`Class.ParticleEmitter2D` is an object that emits customizable 2D images (particles) from a UI object, useful for simulating interface effects like sparkles, bursts, and glows.

You can parent a `Class.ParticleEmitter2D` to any `Class.GuiObject`, such as a `Class.Frame`, `Class.ImageLabel`, or `Class.TextButton` inside a `Class.ScreenGui`, `Class.SurfaceGui`, or `Class.BillboardGui`. Particles render above the parent's strokes and inset shadows.

Use the `Class.ParticleEmitter2D.Enabled|Enabled` and `Class.ParticleEmitter2D.Rate|Rate` properties for continuous emission, or call `Class.ParticleEmitter2D:Emit()|Emit()` to create a one-off burst of particles.

## Customize particles

By experimenting with the following properties, you can customize a particle's visual appearance to make unique UI elements like button sparkles, loading effects, and celebratory bursts.

### Texture

The `Class.ParticleEmitter2D.TextureContent|TextureContent` property sets the image that each particle displays. It accepts an asset URI and works together with [color](#color), [transparency](#transparency), and [blending](#lighting--blending) to determine the particle's final appearance.

<Alert severity="info">
For steps on how to import an image for use as a particle texture,
see [here](../projects/assets/manager.md#asset-import).
</Alert>

### Color

The `Class.ParticleEmitter2D.Color|Color` property tints each particle's texture to either a specific hue, or to a gradient `Datatype.ColorSequence` across its [lifetime](#lifetime).

### Size

The `Class.ParticleEmitter2D.Size|Size` property sets each particle's size as a `Datatype.NumberSequence` across its [lifetime](#lifetime), measured in offset units. The sequence value represents half of the particle's rendered size.

### Transparency

The `Class.ParticleEmitter2D.Transparency|Transparency` property sets each particle's opacity as a `Datatype.NumberSequence` across its [lifetime](#lifetime). Fading particles near the start and/or end of their lifetime avoids a popping in/out effect.

### Lifetime

The `Class.ParticleEmitter2D.Lifetime|Lifetime` property sets the lifetime of a particle in seconds. Provide a minimum and maximum range to randomize each particle's lifetime.

### Motion

Particles [emit](#emission) at a set speed (or random range of speeds) and optionally accelerate or slow down over the course of their lifetime.

- `Class.ParticleEmitter2D.Speed|Speed` sets a random range of velocities, in offset units per second, at which new particles emit.
- `Class.ParticleEmitter2D.Acceleration|Acceleration` determines how much a particle's velocity changes per second.
- `Class.ParticleEmitter2D.Drag|Drag` determines the rate at which particles lose speed, slowing them down gradually over their lifetime.

### Rotation

Particles [emit](#emission) at a set rotation (or random range of rotations) and optionally spin either clockwise or counter‑clockwise.

- `Class.ParticleEmitter2D.Rotation|Rotation` determines the angle, in degrees, of newly-emitted particles.
- `Class.ParticleEmitter2D.RotSpeed|RotSpeed` determines the angular speed, in degrees per second, at which particles rotate. Positive values rotate clockwise.

### Emission

Use the following properties to control where and in which direction particles emit:

- `Class.ParticleEmitter2D.EmissionAngle|EmissionAngle` sets the base direction particles travel.
- `Class.ParticleEmitter2D.SpreadAngle|SpreadAngle` sets the range of angles, in degrees, around the emission angle from which a particle can emit.
- `Class.ParticleEmitter2D.EmissionMode|EmissionMode` sets the emission region to either `Enum.ParticleEmitter2DEmissionMode|Point` or `Enum.ParticleEmitter2DEmissionMode|BoundingBox`.
- `Class.ParticleEmitter2D.EmissionOffset|EmissionOffset` and `Class.ParticleEmitter2D.EmissionSpread|EmissionSpread` adjust the position and size of the emission region relative to the parent `Class.GuiObject`.

### Squash

The `Class.ParticleEmitter2D.Squash|Squash` property allows for non-uniform scaling of particles, curve-controlled over their lifetime.

### Lighting & blending

Particles can appear to emit light, take on environmental light from the 3D world, and blend with the colors behind them.

- `Class.ParticleEmitter2D.LightInfluence|LightInfluence` determines how much environmental light affects a particle's color. It only applies when the emitter's parent `Class.GuiObject` renders in the 3D world, meaning a `Class.SurfaceGui`, or a `Class.BillboardGui` that doesn't have `Class.BillboardGui.AlwaysOnTop|AlwaysOnTop` enabled.
- `Class.ParticleEmitter2D.Brightness|Brightness` scales the light emitted from particles when `Class.ParticleEmitter2D.LightInfluence|LightInfluence` is `0`.
- `Class.ParticleEmitter2D.Blend|Blend` determines how a particle's texture colors blend with the colors behind them. A value of `0` uses normal blending, while a value of `1` uses additive blending, which can make particles appear to glow.

### Flipbooks

Particle flipbook textures let you animate a particle's texture over its lifetime:

- `Class.ParticleEmitter2D.FlipbookLayout|FlipbookLayout` sets the texture's frame layout, using the `Enum.ParticleFlipbookLayout` enum.
- `Class.ParticleEmitter2D.FlipbookMode|FlipbookMode` sets the animation type, using the `Enum.ParticleFlipbookMode` enum.
- `Class.ParticleEmitter2D.FlipbookFramerate|FlipbookFramerate` sets how fast the flipbook animates, in frames per second.
- `Class.ParticleEmitter2D.FlipbookSizeX|FlipbookSizeX` and `Class.ParticleEmitter2D.FlipbookSizeY|FlipbookSizeY` set a custom frame grid size when `Class.ParticleEmitter2D.FlipbookLayout|FlipbookLayout` is `Enum.ParticleFlipbookLayout|Custom`.
- `Class.ParticleEmitter2D.FlipbookStartRandom|FlipbookStartRandom` determines whether each particle begins at a random frame instead of always starting at the first frame.
- `Class.ParticleEmitter2D.FlipbookBlendFrames|FlipbookBlendFrames` determines whether frames crossfade into each other during playback.

### Other properties

<table>
<thead>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
	<tr>
    <td>`Class.ParticleEmitter2D.Enabled|Enabled`</td>
    <td>Determines if particles emit from the emitter. Setting this to `false` stops further particles from spawning, but any existing particles remain active until they expire or the `Class.ParticleEmitter2D:Clear()|Clear()` method is called. When disabled, the `Class.ParticleEmitter2D:Emit()|Emit()` method can be called to emit a one-off burst of particles.</td>
  </tr>
  <tr>
    <td>`Class.ParticleEmitter2D.LockedToParent|LockedToParent`</td>
    <td>Determines if particles "stick" to the parent `Class.GuiObject` instead of remaining at their emission position.</td>
  </tr>
  <tr>
    <td>`Class.ParticleEmitter2D.TimeScale|TimeScale`</td>
    <td>A value between `0` and `1` that controls the speed of the particle effect.</td>
  </tr>
  <tr>
    <td>`Class.ParticleEmitter2D.ZIndex|ZIndex`</td>
    <td>Determines the render order of particles relative to other UI objects.</td>
  </tr>
</tbody>
</table>
