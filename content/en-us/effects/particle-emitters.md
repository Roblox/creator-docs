---
title: Particle emitters
description: Particle emitters emit 2D images to simulate special effects like fire, smoke, and sparks.
---

`Class.ParticleEmitter` is an object that emits customizable 2D images (particles) into the world, useful for simulating special effects like fire, smoke, and sparks.

<video src="../assets/lighting-and-effects/particle-emitter/Showcase.mp4" controls width="100%" alt="Video of particles emitting from a MeshPart in the 3D world"></video>

You can parent a `Class.ParticleEmitter` to an `Class.Attachment` or an object of the `Class.BasePart` class. When parented to a `Class.BasePart`, particles spawn randomly within the part's bounding box or [shape](#shape); when parented to an `Class.Attachment`, particles spawn from the attachment's position.

Additionally, the `Class.ParticleEmitter.EmissionDirection|EmissionDirection` property determines the face (`Enum.NormalId`) of emission when the emitter is parented to a `Class.BasePart`. When you change this property, you consequently change the particle emission direction as well.

<Alert severity="info">
When you rotate an emitter's parent `Class.BasePart`, the orientation of its
face also changes, altering the direction of particle emission. Alternatively,
if you add an emitter to an `Class.Attachment`, you can rotate the attachment
itself instead of using `Class.ParticleEmitter.EmissionDirection|EmissionDirection`.
</Alert>

<video src="../assets/lighting-and-effects/particle-emitter/Emission-Direction.mp4" controls width="800" alt="Video of the particle emission direction changing faces on a parent MeshPart"></video>

## Customize particles

By experimenting with the following properties, you can customize a particle's visual appearance to make unique gameplay elements like bursting volcanos, magical dust, and dust motes.

<Alert severity="info">
The visual quality of your particles can change depending on the graphic settings on the player's device. To review your particles across quality levels, it's recommended to open [Studio Settings](../studio/setup.md#customization), search for **Editor Quality Level**, and set it to the both the lowest and highest level after you finish customizing your particles.
</Alert>

### Texture

The `Class.ParticleEmitter.Texture|Texture`
property renders the image that each particle displays. By default,
particle emitters have particles with a white sparkle texture, but you
can change it to any texture to achieve interesting effects.

<figure>
  <video src="../assets/lighting-and-effects/particle-emitter/Texture-Examples.mp4" controls width="800" alt="Three similar particle emitters with different Texture assets"></video>
  <figcaption>Three similar particle emitters with different `Class.ParticleEmitter.Texture|Texture` assets</figcaption>
</figure>

If you're creating an image to use as a particle texture, it's best to use `.png` format with a transparent background. If your texture is grayscale with no alpha channel, try setting the particle emitter's `Class.ParticleEmitter.LightEmission|LightEmission` property to `1` to hide the darker regions.

<Alert severity="info">
For steps on how to import an image for use as a particle texture,
see [here](../projects/assets/manager.md#asset-import).
</Alert>

### Color

The `Class.ParticleEmitter.Color|Color` property tints each particle's texture to either a specific hue, or to a color gradient across its [lifetime](#lifetime).

<Tabs>
<TabItem label="Scripting">
In a script, set a `Datatype.ColorSequence` for the emitter's `Class.ParticleEmitter.Color|Color` property:

```lua
local emitter = Instance.new("ParticleEmitter")

-- Constant color
emitter.Color = ColorSequence.new(Color3.fromRGB(255, 0, 40))
-- Gradient sequence
emitter.Color = ColorSequence.new{
	ColorSequenceKeypoint.new(0, Color3.fromRGB(255, 0, 0)),
	ColorSequenceKeypoint.new(0.5, Color3.fromRGB(255, 125, 0)),
	ColorSequenceKeypoint.new(1, Color3.fromRGB(255, 200, 0))
}
```

</TabItem>
<TabItem label="Studio">
In Studio, select the `Class.ParticleEmitter` in the [Explorer](../studio/explorer.md) hierarchy and, in the [Properties](../studio//properties.md) window:

**🄐** — Click on the color square to open the **Colors** pop-up window and select a color.

**🄑** – Input three numbers into the RGB color value field.

**🄒** – Click the **&ctdot;** button to define a **color gradient**.

<img src="../assets/studio/properties/All-Color-Input-Options.png" width="330" />

</TabItem>
</Tabs>

### Size

The `Class.ParticleEmitter.Size|Size` property sets the size of each particle to a consistent size, or to a numerical sequence across its [lifetime](#lifetime).

<Tabs>
<TabItem label="Scripting">
In a script, set a `Datatype.NumberSequence` for the emitter's `Class.ParticleEmitter.Size|Size` property:

```lua
local emitter = Instance.new("ParticleEmitter")

-- Constant size
emitter.Size = NumberSequence.new(3)
-- Numerical sequence
emitter.Size = NumberSequence.new{
	NumberSequenceKeypoint.new(0, 1),
	NumberSequenceKeypoint.new(0.2, 4),
	NumberSequenceKeypoint.new(1, 0)
}
```

</TabItem>
<TabItem label="Studio">
In Studio, select the `Class.ParticleEmitter` in the [Explorer](../studio/explorer.md) hierarchy and, in the [Properties](../studio//properties.md) window:

**🄐** — Input a number into the value field.

**🄑** – Click the **&ctdot;** button to define a **size sequence**.

<img src="../assets/studio/properties/All-Size-Input-Options.png" width="330" />

</TabItem>
</Tabs>

<Alert severity="warning">
Particle size can impact performance due to fill-rate. The more pixels particles occupy on a player's screen, the more costly it is on the GPU.
</Alert>

### Transparency

The `Class.ParticleEmitter.Transparency|Transparency` property sets the opacity of each particle as a consistent value, or as an opacity sequence across its [lifetime](#lifetime). Opacity can range from `0` (totally opaque) to `1` (fully clear). For details on how to set particles to either a specific opacity or to a number sequence, follow the process in customizing [Size](#size) but use the emitter's `Class.ParticleEmitter.Transparency|Transparency` property field instead.

<Alert severity="success">
The `Class.ParticleEmitter.Transparency|Transparency` property is one of the most vital properties of a particle emitter. Fading particles near the start and/or end of their lifetime avoids a popping in/out effect and provides a more realistic effect.
</Alert>

<figure>
  <video src="../assets/lighting-and-effects/particle-emitter/Transparency.mp4" controls width="800" alt="Video of static transparency vs. fading in/out"></video>
  <figcaption>Static transparency vs. fading in/out</figcaption>
</figure>

### Lifetime

The `Class.ParticleEmitter.Lifetime|Lifetime`
property sets the lifetime of a particle in seconds. You can set this
property either as a consistent value, or provide a `Datatype.NumberRange.Min|Min` and `Datatype.NumberRange.Max|Max` range from which a random lifetime will be chosen for each particle.

<Alert severity="info">
Particles have a maximum lifetime of 20 seconds. `Class.ParticleEmitter.Lifetime|Lifetime` values higher than this will be internally capped at `20`.
</Alert>

### Speed

The `Class.ParticleEmitter.Speed|Speed` property determines a random range of velocities (minimum to maximum) at which new particles will emit, measured in studs per second. Each particle's velocity is chosen upon emission and it applies in the `Class.ParticleEmitter.EmissionDirection|EmissionDirection`. Negative values cause particles to travel in reverse.

Note that changing `Class.ParticleEmitter.Speed|Speed` does not affect active particles and they retain whatever speed they already have. However, `Class.ParticleEmitter.Acceleration|Acceleration`, `Class.ParticleEmitter.Drag|Drag`, and `Class.ParticleEmitter.VelocityInheritance|VelocityInheritance` can be used to affect the speed of active particles over their lifetime.

<video src="../assets/lighting-and-effects/particle-emitter/Speed.mp4" controls width="800" alt="Video of emission speeds set to 0-1 vs. 2-15"></video>

### Rate

The `Class.ParticleEmitter.Rate|Rate` property sets the number of particles that emit per second. A single particle emitter can create up to 400 particles per second (100 per second on mobile). For best performance, keep the particle rate as low as possible and experiment with [size](#size) and [other properties](#other-properties) to achieve the desired visual effect.

<Alert severity="warning">
Particle count can impact performance due to overdraw, especially when particles are overlapping. The more layers of transparent effects on screen, the more costly it is on the GPU.
</Alert>

### Orientation

The `Class.ParticleEmitter.Orientation|Orientation` property determines which
orientation mode to use for an emitter's particle geometry.

<table>
<thead>
<tr>
<td>Orientation</td>
<td>Particle behavior</td>
</tr>
</thead>
<tbody>
<tr>
<td>`Enum.ParticleOrientation|FacingCamera`</td>
<td>Standard camera-facing billboard quad; default behavior.</td>
</tr>
<tr>
<td>`Enum.ParticleOrientation|FacingCameraWorldUp`</td>
<td>Facing the camera, but rotating only on the vertical upward world **Y** axis.</td>
</tr>
<tr>
<td>`Enum.ParticleOrientation|VelocityParallel`</td>
<td>Aligned parallel to their direction of movement.</td>
</tr>
<tr>
<td>`Enum.ParticleOrientation|VelocityPerpendicular`</td>
<td>Aligned perpendicular to their direction movement.</td>
</tr>
</tbody>
</table>

<figure>
  <video src="../assets/lighting-and-effects/particle-emitter/Orientation.mp4" controls width="800" alt="Video of expected outcome of particle emission Orientation property"></video>
  <figcaption>Expected outcome of particle orientation</figcaption>
</figure>

### LightEmission

The `Class.ParticleEmitter.LightEmission|LightEmission` property determines the blending of particle `Class.ParticleEmitter.Texture|Texture` colors with the colors behind them. A value of `0` uses normal blending mode while a value of `1` uses additive blending. Higher values can make particles glow even in environments with low lighting.

<video src="../assets/lighting-and-effects/particle-emitter/LightEmission.mp4" controls width="800" alt="Video showing light emission values of 0 vs. 1"></video>

### SpreadAngle

The `Class.ParticleEmitter.SpreadAngle|SpreadAngle` property has an **X** and a **Y** value which determine the range of angles from which a particle can emit. The range is calculated from both sides around the axes; for example, a value of `(45, 0)` emits particles in a range of 0&deg; to 45&deg; away from the `Class.ParticleEmitter.EmissionDirection|EmissionDirection` across the **X** axis.

<video src="../assets/lighting-and-effects/particle-emitter/SpreadAngle.mp4" controls width="800" alt="Video of X axis spread angle 0° vs. 45°"></video>

### WindAffectsDrag

If you've enabled [global wind](../environment/global-wind.md) in a game, particles will follow the global wind vector as long as the emitter's `Class.ParticleEmitter.WindAffectsDrag|WindAffectsDrag` property is enabled and its `Class.ParticleEmitter.Drag|Drag` property is greater than `0`.

### Shape

The `Class.ParticleEmitter.Shape|Shape` property sets the shape of the particle emitter to either a `Enum.ParticleEmitterShape|Box`, `Enum.ParticleEmitterShape|Sphere`, `Enum.ParticleEmitterShape|Cylinder`, or `Enum.ParticleEmitterShape|Disc`.

<GridContainer numColumns="4">
  <figure>
    <img src="../assets/lighting-and-effects/particle-emitter/Shape-Box.jpg" alt="Emitter of Box shape" />
    <figcaption>`Enum.ParticleEmitterShape|Box`</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/particle-emitter/Shape-Sphere.jpg" alt="Emitter of Sphere shape" />
    <figcaption>`Enum.ParticleEmitterShape|Sphere`</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/particle-emitter/Shape-Cylinder.jpg" alt="Emitter of Cylinder shape" />
    <figcaption>`Enum.ParticleEmitterShape|Cylinder`</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/particle-emitter/Shape-Disc.jpg" alt="Emitter of Disc shape" />
    <figcaption>`Enum.ParticleEmitterShape|Disc`</figcaption>
  </figure>
</GridContainer>

After you select a shape for your particle emitter, you can experiment
with the [ShapeStyle](#shapestyle), [ShapeInOut](#shapeinout), and
[ShapePartial](#shapepartial) properties to further customize particle
emission.

<Alert severity="warning">
If you parent a particle emitter to an `Class.Attachment`, the `Enum.ParticleEmitterShape|Sphere` and `Enum.ParticleEmitterShape|Cylinder` shapes will not display correctly. These shapes should only be used if the emitter is parented to a `Class.BasePart`.
</Alert>

#### ShapeStyle

The `Class.ParticleEmitter.ShapeStyle|ShapeStyle` property sets the emission type to either:

- `Enum.ParticleEmitterShapeStyle|Volume` &mdash; Particles emit anywhere within the shape.
- `Enum.ParticleEmitterShapeStyle|Surface` &mdash; Particles only emit from the outside of the shape.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/lighting-and-effects/particle-emitter/Cylinder-Volume.jpg" alt="Emitter of Cylinder shape with Volume shape style" />
    <figcaption>`Enum.ParticleEmitterShape|Cylinder` + `Enum.ParticleEmitterShapeStyle|Volume`</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/particle-emitter/Cylinder-Surface.jpg" alt="Emitter of Cylinder shape with Surface shape style" />
    <figcaption>`Enum.ParticleEmitterShape|Cylinder` + `Enum.ParticleEmitterShapeStyle|Surface`</figcaption>
  </figure>
</GridContainer>

#### ShapeInOut

The `Class.ParticleEmitter.ShapeInOut|ShapeInOut` property sets the emission as follows:

- `Enum.ParticleEmitterShapeInOut|Inward` &mdash; Particles emit toward the shape.
- `Enum.ParticleEmitterShapeInOut|Outward` &mdash; Particles emit away from the shape.
- `Enum.ParticleEmitterShapeInOut|InAndOut` &mdash; Particles randomly behave as both `Enum.ParticleEmitterShapeInOut|Inward` and `Enum.ParticleEmitterShapeInOut|Outward`.

<video src="../assets/lighting-and-effects/particle-emitter/ShapeInOut.mp4" controls width="800" alt="Particles emitting with different ShapeInOut settings"></video>

#### ShapePartial

The `Class.ParticleEmitter.ShapePartial|ShapePartial` property is a factor you can use to further modify `Enum.ParticleEmitterShape|Cylinder`, `Enum.ParticleEmitterShape|Disc`, and `Enum.ParticleEmitterShape|Sphere` shapes.

<Tabs>
<TabItem label="Cylinder">

For cylinders, `Class.ParticleEmitter.ShapePartial|ShapePartial` multiplies the radius of the cylinder on the side of its `Class.ParticleEmitter.EmissionDirection|EmissionDirection`.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/lighting-and-effects/particle-emitter/Cylinder-ShapePartial-0.5.jpg" alt="Emitter of Cylinder shape with ShapePartial value of 0.5" />
    <figcaption>`Class.ParticleEmitter.ShapePartial|ShapePartial` = `0.5`</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/particle-emitter/Cylinder-ShapePartial-0.jpg" alt="Emitter of Cylinder shape with ShapePartial value of 0" />
    <figcaption>`Class.ParticleEmitter.ShapePartial|ShapePartial` = `0`</figcaption>
  </figure>
</GridContainer>

</TabItem>
<TabItem label="Disc">

For discs, `Class.ParticleEmitter.ShapePartial|ShapePartial` inversely multiplies the inner radius of the disc.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/lighting-and-effects/particle-emitter/Disc-ShapePartial-0.5.jpg" alt="Emitter of Disc shape with ShapePartial value of 0.5" />
    <figcaption>`Class.ParticleEmitter.ShapePartial|ShapePartial` = `0.5`</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/particle-emitter/Disc-ShapePartial-0.1.jpg" alt="Emitter of Disc shape with ShapePartial value of 0.1" />
    <figcaption>`Class.ParticleEmitter.ShapePartial|ShapePartial` = `0.1`</figcaption>
  </figure>
</GridContainer>

</TabItem>
<TabItem label="Sphere">

For spheres, `Class.ParticleEmitter.ShapePartial|ShapePartial` multiplies the hemispherical angle.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/lighting-and-effects/particle-emitter/Shape-Sphere.jpg" alt="Emitter of Sphere shape with ShapePartial value of 1" />
    <figcaption>`Class.ParticleEmitter.ShapePartial|ShapePartial` = `1`</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/particle-emitter/Sphere-ShapePartial-0.5.jpg" alt="Emitter of Sphere shape with ShapePartial value of 0.5" />
    <figcaption>`Class.ParticleEmitter.ShapePartial|ShapePartial` = `0.5`</figcaption>
  </figure>
</GridContainer>

</TabItem>
</Tabs>

### Squash

The `Class.ParticleEmitter.Squash|Squash` property allows for non-uniform scaling of particles, curve-controlled over their lifetime. Values greater than `0` cause particles to both shrink horizontally and grow vertically, while values less than `0` cause particles to both grow horizontally and shrink vertically. For details on how to set the squash amount to either a constant or to a `Datatype.NumberSequence`, follow the process in customizing [Size](#size) but use the emitter's `Class.ParticleEmitter.Squash|Squash` property field instead.

<video src="../assets/lighting-and-effects/particle-emitter/Squash.mp4" controls width="800" alt="Video of particles being gradually squashed over their lifetime"></video>

Squash is especially useful for rain. Stretching a particle makes its texture much less recognizable, so even the default sparkle texture can pass as a falling raindrop. For details, see [simulate rain](#simulate-rain).

### Flipbooks

Particle flipbook textures let you animate a particle's texture over its lifetime.

<video src="../assets/lighting-and-effects/particle-emitter/Flipbook.mp4" controls width="800" alt="Flipbook looping over the four particles in its texture"></video>

The flipbook texture can have a frame layout of 2×2, 4×4, 8×8, or custom. For example, the following 1024×1024 image has an 8×8 layout, so it's suitable for a 64‑frame animation.

<img src="../assets/lighting-and-effects/particle-emitter/8x8-Explosion.png" width="512" alt="Sample texture for particle flipbooks" />

<Alert severity="error">
When you create a flipbook texture, include spacing between each of the particle frames. In some cases, mip filtering might require even more spacing. The previous image has transparent spacing around each frame for the flipbook texture.
</Alert>

<Alert severity="warning">
Features with custom textures such as flipbooks cost memory to render. If you use many flipbooks with other features that use high memory, then clients automatically deactivate flipbooks when they are low on memory, which is likely for older mobile phones. To reduce the memory usage of flipbooks, use fewer unique animated particle effects or choose a texture of smaller resolution when possible. Reusing textures costs less memory than using unique textures.
</Alert>

Once you've specified a valid flipbook [texture](#texture) for the emitter's `Class.ParticleEmitter.Texture|Texture` property, the `Class.ParticleEmitter.FlipbookLayout|FlipbookLayout` property determines the layout of the texture. It can be any value of the `Enum.ParticleFlipbookLayout` enum:

- `Enum.ParticleFlipbookLayout|None` &mdash; Disable flipbook features and use the texture as a single static texture over the particle's lifetime.
- `Enum.ParticleFlipbookLayout|Grid2x2` &mdash; 2&times;2 frames for a 4-frame animation.
- `Enum.ParticleFlipbookLayout|Grid4x4` &mdash; 4&times;4 frames for a 16-frame animation.
- `Enum.ParticleFlipbookLayout|Grid8x8` &mdash; 8&times;8 frames for a 64-frame animation.
- `Enum.ParticleFlipbookLayout|Custom` &mdash; A custom grid size defined by `Class.ParticleEmitter.FlipbookSizeX|FlipbookSizeX` and `Class.ParticleEmitter.FlipbookSizeY|FlipbookSizeY`.

To further customize the flipbook behavior, you can adjust the following properties:

<Tabs>
<TabItem label="FlipbookFramerate">
The `Class.ParticleEmitter.FlipbookFramerate|FlipbookFramerate` property determines how fast the flipbook texture animates in frames per second. Like `Class.ParticleEmitter.Lifetime|Lifetime`, you can set a minimum and maximum range to randomize the framerate of the flip book, with a maximum of 30 frames per second.
</TabItem>
<TabItem label="FlipbookMode">
The `Class.ParticleEmitter.FlipbookMode|FlipbookMode` property determines the type of the flipbook animation. The property can be any value of the `Enum.ParticleFlipbookMode` enum:

- `Enum.ParticleFlipbookMode|Loop` &mdash; Continuously play through all frames, starting back at the first frame after playing the last.
- `Enum.ParticleFlipbookMode|OneShot` &mdash; Play through the animation only once across the particle's lifetime. With this setting, the `Class.ParticleEmitter.FlipbookFramerate|FlipbookFramerate` property doesn't apply; instead, the framerate is determined by the particle's `Class.ParticleEmitter.Lifetime|Lifetime` divided evenly by the number of frames in the animation. `Enum.ParticleFlipbookMode|OneShot` animations are useful for clear non-repeating animations, such as an explosion that creates a puff of smoke and then fades out.
- `Enum.ParticleFlipbookMode|PingPong` &mdash; Play from the first to the last frame, then in reverse from the last to the first, repeating throughout the `Class.ParticleEmitter.Lifetime|Lifetime` of the particle.
- `Enum.ParticleFlipbookMode|Random` &mdash; Play the frames in a random order, blending/crossfading from one frame to the next. This can be useful for organic particle textures at low framerates, such as stars slowly twinkling between subtly different shapes.

</TabItem>

<TabItem label="FlipbookStartRandom">
The `Class.ParticleEmitter.FlipbookStartRandom|FlipbookStartRandom` property determines whether each particle begins at a random frame of the animation instead of always starting at the first frame. One use case is to enable this property and also set `Class.ParticleEmitter.FlipbookFramerate|FlipbookFramerate` to zero, causing each emitted particle to be a static frame chosen randomly from the flipbook texture.
</TabItem>
</Tabs>

### Other properties

To further customize particles, consider the following emitter properties, and click through to the `Class.ParticleEmitter` reference page for more details.

<Tabs>
<TabItem label="Appearance">

The following appearance properties are in addition to [color](#color), [light emission](#lightemission), [orientation](#orientation), [size](#size), [texture](#texture), [transparency](#transparency), [squash](#squash), and [flipbooks](#flipbooks).

<table>
<thead>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
	<tr>
    <td>`Class.ParticleEmitter.LightInfluence|LightInfluence`</td>
    <td>Determines how much environmental light affects the color of individual particles.</td>
  </tr>
	<tr>
    <td>`Class.ParticleEmitter.Brightness|Brightness`</td>
    <td>Scales the light emitted from the emitter when `Class.ParticleEmitter.LightInfluence|LightInfluence` is `0`.</td>
  </tr>
  <tr>
    <td>`Class.ParticleEmitter.ZOffset|ZOffset` </td>
    <td>Determines the forward-backward render position of particles, in studs, without changing their size on the screen. This allows for multiple emitters to be layered, or to render particles in front of or behind the parent object.</td>
  </tr>
</tbody>
</table>

</TabItem>
<TabItem label="Emission">

The following emission properties are in addition to `Class.ParticleEmitter.EmissionDirection|EmissionDirection`, [lifetime](#lifetime), [speed](#speed), [rate](#rate), [spread angle](#spreadangle), and [shape](#shape).

<table>
<thead>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
	<tr>
    <td>`Class.ParticleEmitter.Enabled|Enabled`</td>
    <td>Determines if particles emit from the emitter. Setting this to `false` stops further particles from spawning, but any existing particles remain active until they expire or the `Class.ParticleEmitter:Clear()|Clear()` method is called. When disabled, the `Class.ParticleEmitter:Emit()|Emit()` method can be called to emit a one-off burst of particles.</td>
  </tr>
  <tr>
    <td>`Class.ParticleEmitter.Rotation|Rotation`</td>
    <td>Determines the angle of rotation for newly-emitted particles. Single numbers create particles at that angle, while two numbers (minimum, maximum) set a random rotation for each particle.</td>
  </tr>
  <tr>
    <td>`Class.ParticleEmitter.RotSpeed|RotSpeed`</td>
    <td>Determines the angular speed in degrees per second for particles. This can be a single number or a number range for a randomized speed. Negative values cause particles to rotate counter‑clockwise.</td>
  </tr>
</tbody>
</table>

</TabItem>
<TabItem label="Motion">

The following motion properties are in addition to [wind influence](#windaffectsdrag).

<table>
<thead>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.ParticleEmitter.Acceleration|Acceleration`</td>
    <td>Determines by how much the velocity of particles changes per second. You can use this property to create effects such as particles being affected by gravity.</td>
  </tr>
  <tr>
    <td>`Class.ParticleEmitter.Drag|Drag`</td>
    <td>Determines the rate in seconds that particles lose half their speed.</td>
  </tr>
	<tr>
    <td>`Class.ParticleEmitter.LockedToPart|LockedToPart`</td>
    <td>Determines if particles will "stick" to the emission source to which the emitter is parented.</td>
  </tr>
  <tr>
    <td>`Class.ParticleEmitter.TimeScale|TimeScale`</td>
    <td>A value between `0` and `1` that controls the speed of the particle effect.</td>
  </tr>
	<tr>
    <td>`Class.ParticleEmitter.VelocityInheritance|VelocityInheritance`</td>
    <td>Determines how much of the parent object's velocity is inherited by particles when they are emitted.</td>
  </tr>
</tbody>
</table>

</TabItem>
</Tabs>

## Simulate rain

Simulating every raindrop isn't practical, but particle emitters can create a convincing illusion of rain in a 3D world:

1. Insert a `Class.Part` above the area where you want rain to fall. Anchor it, set its `Class.BasePart.Transparency|Transparency` to `1`, and disable `Class.BasePart.CanCollide|CanCollide`.
1. Insert a `Class.ParticleEmitter` into the part and set its `Class.ParticleEmitter.EmissionDirection|EmissionDirection` to `Enum.NormalId.Bottom|Bottom`. A single emitter can create a limited number of particles per second (see [Rate](#rate)), so heavier rain or a larger area requires many parts with emitters arranged in a grid over the desired area.
1. Set `Class.ParticleEmitter.Squash|Squash` to a positive value, such as `3`, to stretch each particle into a streak. Higher values make particles thinner, so you might need to increase [size](#size) as well.

   <Alert severity="success">
   If you set `Class.ParticleEmitter.Orientation|Orientation` to `Enum.ParticleOrientation.VelocityParallel|VelocityParallel` so that streaks align with their direction of travel, use a negative `Class.ParticleEmitter.Squash|Squash` value instead.
   </Alert>

1. Darken `Class.ParticleEmitter.Color|Color`, increase `Class.ParticleEmitter.LightInfluence|LightInfluence` so that the rain reacts to the lighting around it, increase `Class.ParticleEmitter.Speed|Speed`, and decrease `Class.ParticleEmitter.Lifetime|Lifetime` so that particles disappear near the ground.
1. To angle the rain, set a small `Class.ParticleEmitter.Rotation|Rotation` or enable `Class.ParticleEmitter.WindAffectsDrag|WindAffectsDrag` so that particles follow [global wind](../environment/global-wind.md). `Class.ParticleEmitter.Drag|Drag` slows the fall in addition to applying the wind, so you might need to increase the downward `Class.ParticleEmitter.Acceleration|Acceleration` to keep the rain falling quickly.

To show rain landing, place transparent parts on the ground with emitters whose `Class.ParticleEmitter.EmissionDirection|EmissionDirection` is `Enum.NormalId.Top|Top`. Splash particles aren't stretched like falling rain, so they usually need a custom [texture](#texture) and a [transparency](#transparency) sequence that makes each splash appear to dissipate. Splashes only look right on surfaces where you've placed them carefully. If you can't place them by hand, low-lying mist is much more forgiving.

### Manage particle limits

Rain that covers a large area reaches particle limits quickly, and mobile devices have much lower limits than desktops. If particles flicker in the distance, reduce how many are on screen at once:

- Place the emitter parts lower in the air and shorten `Class.ParticleEmitter.Lifetime|Lifetime` to match.
- Decrease `Class.ParticleEmitter.Rate|Rate` to turn a downpour into a lighter shower.
- Cover a smaller area with fewer emitter parts.

### Rain examples

- For a hand-built example, see [The Mystery of Duvall Drive](../resources/the-mystery-of-duvall-drive/index.md). It uses emitters for [rain, mist, splashes, and water dripping from awnings](../resources/the-mystery-of-duvall-drive/develop-a-moving-world.md#make-storm-debris).
- For a scripted example, see the [weather-island](https://github.com/Roblox/resources/tree/main/experiences/weather-island) project. It schedules storms, transitions [clouds](../environment/clouds.md) and wind, spawns rain and mist emitters, and performs roof detection.
