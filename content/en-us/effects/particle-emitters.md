---
title: Particle Emitters
description: Particle emitters emit 2D images to simulate special effects like fire, smoke, and sparks.
---

A `Class.ParticleEmitter`
is an instance that emits 2D images (particles) that look and behave for
the duration of their lifetime according to the particle emitter's set
properties. You can customize a particle emitter's properties to
create special effects like fire, smoke, and sparks.

<video src="../assets/lighting-and-effects/particle-emitter/Showcase.mp4" controls width="90%" alt="Video of particles emitting from a MeshPart in the 3D world"></video>

## Particle Emission

You can parent a particle emitter to an `Class.Attachment` or an object of the `Class.BasePart` class. When you parent a particle emitter to a `Class.BasePart`, the particles generate and emit based on that parent's **size**. For example, a part with a small area compacts particles, while a part with a large area spreads particles out.

<figure>
  <video src="../assets/lighting-and-effects/particle-emitter/Resize-Part.mp4" controls width="80%" alt="Video of part size changing to reflect the overall area of particle emission"></video>
  <figcaption>Part size changing to reflect the overall area of particle emission</figcaption>
</figure>

<Alert severity="info">
In correlation with the part's **size**, a particle emitter parented to a `Class.BasePart` uses that parent's **bounding box**, not its
shape. For example, if you attach an emitter to a `Class.WedgePart`, particles emit from the wedge's entire bounding box, not only the area where the wedge visually exists.
</Alert>

Additionally, the
`Class.ParticleEmitter.EmissionDirection|EmissionDirection`
property determines the face (`Enum.NormalId`) of the `Class.BasePart` that emits particles. When
you change this property, you consequently change the particle emission
direction as well.

<figure>
  <video src="../assets/lighting-and-effects/particle-emitter/Emission-Direction.mp4" controls width="80%" alt="Video of the particle emission direction changing faces on a parent MeshPart"></video>
  <figcaption>Particle emission direction changing faces on a parent `Class.MeshPart`</figcaption>
</figure>

<Alert severity="info">
When you rotate an emitter's parent `Class.BasePart`, the orientation of its face also changes, altering the direction
of particle emission. Alternatively, if you add an emitter to an `Class.Attachment`, you can rotate the attachment itself instead of using `Class.ParticleEmitter.EmissionDirection|EmissionDirection`.
</Alert>

## Creating a Particle Emitter

To create a particle emitter on a given `Class.BasePart` or `Class.Attachment`:

1. In the [Explorer](../studio/explorer.md) window, hover over the part or attachment and click the &CirclePlus;
   button. A contextual menu displays.
2. From the menu, insert a
   **ParticleEmitter**. The particle emitter immediately [emits particles](#particle-emission) within
   the part's area or from the attachment's position.

## Customizing Particles

You can change the properties of particle emitters to create interesting
visual effects such as glowing portals, green billowing smoke, or vibrant
explosions.

### Texture

The `Class.ParticleEmitter.Texture|Texture`
property renders the image that each particle displays. By default,
particle emitters have particles with a white sparkle texture, but you
can change it to any texture to achieve interesting effects.

<figure>
  <video src="../assets/lighting-and-effects/particle-emitter/Texture-Examples.mp4" controls width="80%" alt="Three similar particle emitters with different Texture assets"></video>
  <figcaption>Three similar particle emitters with different `Class.ParticleEmitter.Texture|Texture` assets</figcaption>
</figure>

When you are creating a texture to use as a particle, consider
these best practices:

- Use images in `.png` format with a background that is transparent. If your texture is grayscale with no alpha channel, try setting the particle emitter's `Class.ParticleEmitter.LightEmission|LightEmission` property to **1** to hide the darker regions.
- Make your image grayscale to give yourself full control over the final color of particles with the `Class.ParticleEmitter.Color|Color` property.

<Alert severity="info">
For steps on how to import an image for use as a particle texture,
see [Importing Assets](../projects/assets/manager.md#importing-assets).
</Alert>

To insert an image into a particle emitter:

1. In the menu bar, navigate to the [Home](../studio/home-tab.md) tab and select **Toolbox**. The [Toolbox](../projects/assets/toolbox.md) window displays.

   <img src="../assets/studio/general/Home-Tab-Toolbox.png" width="800" alt="Toolbox indicated in Home tab" />

1. If you want to insert an image that you have previously imported, click the **Inventory** tab. If you want to insert an image from another creator, click the **Marketplace** tab.
1. Right-click on the image you want to insert into a particle emitter. A pop-up menu displays.
1. Select **Copy Asset ID**.
1. In the [Explorer](../studio/explorer.md) window, select a `Class.ParticleEmitter`.
1. In the [Properties](../studio/properties.md) window, paste the asset ID into the **Texture** property.

### Lifetime

The `Class.ParticleEmitter.Lifetime|Lifetime`
property sets the lifetime of a particle in seconds. You can set this
property either as a consistent value, or provide a **Min** and **Max**
range from which a random lifetime will be chosen for each particle.

<Alert severity="info">
Particles have a maximum lifetime of 20 seconds. `Class.ParticleEmitter.Lifetime|Lifetime` values higher than this will be internally capped at 20.
</Alert>

### Color

The `Class.ParticleEmitter.Color|Color`
property tints the particle's texture to either a specific hue or a
`Datatype.ColorSequence` data type.
A color sequence changes a particle's color across its
[lifetime](#lifetime).

#### Constant Color

To set particles to a specific hue:

1. In the **Explorer** window, select the **ParticleEmitter**.
2. In the **Properties** window, select the **Color** property. You can either:

   1. Click on the color square to open the **Colors** pop-up window
      and select a color.
   2. Input three numbers into the RGB color value field.

   <figure>
   <img src="../assets/studio/properties/Color-Input-Options.png" width="320" />
   <img
   src="../assets/lighting-and-effects/particle-emitter/Color-Examples.jpg"
   width="80%" alt="Similar particle emitters with different colored particles" />
   <figcaption>Similar particle emitters with different colored particles</figcaption>
   </figure>

#### Color Sequence

To set a particle emitter's color sequence:

1. In the **Explorer** window, select the **ParticleEmitter**.

2. In the **Properties** window, select the **Color** property.

3. Click the **&ctdot;** button. A color sequence pop-up displays.
   By default, the color sequence is all white.

   <img
   src="../assets/lighting-and-effects/particle-emitter/Open-Color-ColorSequence-Window.png"
   width="320" />

   Each triangle on the bottom axis of the color sequence is a **keypoint**
   that determines the color value of the property at that point of the
   particle's lifetime.

4. Click the **keypoint** at the start of the color sequence, then click the
   small square next to **Color** to open the **Colors** pop-up
   window.
5. Select the color that you want particles to be at the start of
   their lifetime.

   <img src="../assets/studio/general/ColorSequence-Red-White.png"
   width="80%" />

6. If you want particles to change their color near the end of their
   lifetime, click the
   **keypoint** at the end of the color sequence, then click the small square
   next to **Color** to open the **Colors** pop-up
   window to select a color.

   <img src="../assets/studio/general/ColorSequence-Red-Purple.png" width="80%"
    />

7. If applicable, you can:

   - Add another keypoint by clicking anywhere on the graph.
   - Make a color change sooner or later within the gradient by dragging an existing keypoint to a new position.
     color to change sooner or later within the gradient.
   - Delete a keypoint by selecting it and clicking the **Delete** button.
   - Reset the sequence by clicking the **Reset** button.

### Size

The `Class.ParticleEmitter.Size|Size` property sets the stud size of each particle either as a consistent size or a `Datatype.NumberSequence`. A number sequence changes a particle's size across its [lifetime](#lifetime); it starts at **0**, the start of emitting, and ends at **1**, the lifetime of a particle.

#### Constant Size

To set particles to a specific size:

1. In the **Explorer** window, select the **ParticleEmitter**.
2. In the **Properties** window, select the **Size** property.
3. Input the stud size that you want each particle to be.

#### Size Sequence

To set a particle emitter's number sequence:

1. In the **Explorer** window, select the **ParticleEmitter**.
2. In the **Properties** window, select the **Size** property.
3. Click the **&hellip;** button. A number sequence pop-up
   displays. By default, the graph is a straight line and a particle
   remains the same size throughout its lifetime.

   <img
   src="../assets/studio/general/NumberSequence-0.5-0.5.png"
   width="80%" />

   Each square at the start and end of the number sequence is a
   **keypoint** that determines the size value of the property at that
   point of the particle's lifetime.

4. Perform one of the following actions:

   - To change the size at a point, click on a **keypoint** and either
     drag it up or down, or enter a value in the **Value** field.
   - To insert new keypoints, click on any point in the graph.
   - To delete a keypoint, select the **keypoint**, then the **Delete**
     button.
   - To add a random range for size, click on any **keypoint** and
     drag the **envelope lines** up or down. At that time, particles
     generate at a random size between the pink envelope.

   <figure>
   <img
     src="../assets/studio/general/NumberSequence-Envelope.png"
     width="80%" />
   <video src="../assets/lighting-and-effects/particle-emitter/Size-Envelope.mp4" controls width="80%" alt="Video of emitter with size increase 50% through its lifetime"></video>
   <figcaption>Emitter with size increase 50% through its lifetime</figcaption>
   </figure>

### Transparency

The `Class.ParticleEmitter.Transparency|Transparency`
property sets the opacity of each particle either as a consistent opacity or a
`Datatype.NumberSequence`.
A number sequence changes a particle's opacity across its [lifetime](#lifetime);
it can range anywhere from **0** (totally opaque) to **1** (fully clear). For details on
how to set particles to either a specific opacity or to a number sequence,
follow the instructions in customizing [Size](#size).

The `Class.ParticleEmitter.Transparency|Transparency`
property is one of the most vital properties of a particle emitter. Fading
particles near the start and/or end of their lifetime avoids a popping in/out effect and provides a more realistic effect.

<figure>
  <video src="../assets/lighting-and-effects/particle-emitter/Transparency.mp4" controls width="80%" alt="Video of static transparency vs. fading in/out"></video>
  <figcaption>Static transparency vs. fading in/out</figcaption>
</figure>

### Rate

The `Class.ParticleEmitter.Rate|Rate`
property sets the number of particles that emit per second. A single particle
emitter can create up to 500 particles per second. For best performance, keep the
particle rate as low as possible. Experiment with the size of the particle
[texture](#texture), the [size](#size) of particles, and [other properties](#other-properties) to minimize the number of particles while still
achieving the desired visual effect.

### Orientation

The `Class.ParticleEmitter.Orientation|Orientation` property determines which
orientation mode to use for an emitter's particle geometry.

<table>
<thead>
<tr>
<td>Orientation</td>
<td>Particle Behavior</td>
</tr>
</thead>
<tbody>
<tr>
<td><b>FacingCamera</b></td>
<td>Standard camera-facing billboard quad; default behavior.</td>
</tr>
<tr>
<td><b>FacingCameraWorldUp</b></td>
<td>Facing the camera, but rotating only on the vertical upward world Y axis.</td>
</tr>
<tr>
<td><b>VelocityParallel</b></td>
<td>Aligned parallel to their direction of movement.</td>
</tr>
<tr>
<td><b>VelocityPerpendicular</b></td>
<td>Aligned perpendicular to their direction movement.</td>
</tr>
</tbody>
</table>

<figure>
  <video src="../assets/lighting-and-effects/particle-emitter/Orientation.mp4" controls width="80%" alt="Video of expected outcome of particle emission Orientation property"></video>
  <figcaption>Expected outcome of particle emission `Class.ParticleEmitter.Orientation|Orientation` property</figcaption>
</figure>

### SpreadAngle

The `Class.ParticleEmitter.SpreadAngle|SpreadAngle`
property has an X and a Y value which determine the range of angles from
which a particle can emit. The range is calculated from both sides
around the axes; for example, a value of **(45, 0)** emits particles from **0&deg;** to **45&deg;** away from the `Class.ParticleEmitter.EmissionDirection|EmissionDirection` across the X axis.

<figure>
  <video src="../assets/lighting-and-effects/particle-emitter/SpreadAngle.mp4" controls width="80%" alt="Video of X axis spread angle 0° vs. 45°"></video>
  <figcaption>X axis spread angle 0° vs. 45°</figcaption>
</figure>

### Shape

The `Class.ParticleEmitter.Shape|Shape`
property sets the shape of the particle emitter to either a **Box**, **Sphere**,
**Cylinder**, or **Disc**.

<GridContainer numColumns="4">
  <figure>
    <img src="../assets/lighting-and-effects/particle-emitter/Shape-Box.jpg" />
    <figcaption>Box</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/particle-emitter/Shape-Sphere.jpg" />
    <figcaption>Sphere</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/particle-emitter/Shape-Cylinder.jpg" />
    <figcaption>Cylinder</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/particle-emitter/Shape-Disc.jpg" />
    <figcaption>Disc</figcaption>
  </figure>
</GridContainer>

After you select a shape for your particle emitter, you can experiment
with the [`ShapeStyle`](#shapestyle), [`ShapeInOut`](#shapeinout), and
[`ShapePartial`](#shapepartial) properties to further customize particle
emission.

<Alert severity="warning">
If you add a particle emitter to an
`Class.Attachment`, the sphere and cylinder shapes will not display correctly.
</Alert>

#### ShapeStyle

The
`Class.ParticleEmitter.ShapeStyle|ShapeStyle`
property sets the emission type to either:

- **Volume** &mdash; Particles emit anywhere within the shape.
- **Surface** &mdash; Particles only emit from the outside of the shape.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/lighting-and-effects/particle-emitter/Cylinder-Volume.jpg" width="300" />
    <figcaption>Cylinder + Volume</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/particle-emitter/Cylinder-Surface.jpg" width="300" />
    <figcaption>Cylinder + Surface</figcaption>
  </figure>
</GridContainer>

#### ShapeInOut

The
`Class.ParticleEmitter.ShapeInOut|ShapeInOut`
property sets the emission as follows:

- **Outward** &mdash; Particles emit away from the shape.
- **Inward** &mdash; Particles emit toward the shape.
- **InAndOut** &mdash; Particles randomly behave as both **Inward** and **Outward**.

<figure>
  <video src="../assets/lighting-and-effects/particle-emitter/ShapeInOut.mp4" controls width="80%" alt="Particles emitting with different ShapeInOut settings"></video>
  <figcaption>Particles emitting with different `Class.ParticleEmitter.ShapeInOut|ShapeInOut` settings</figcaption>
</figure>

#### ShapePartial

The
`Class.ParticleEmitter.ShapePartial|ShapePartial`
property is a factor you can use to determine **cylinder**, **disc**,
and **sphere** shapes.

For cylinders, `Class.ParticleEmitter.ShapePartial|ShapePartial` multiplies the radius of the
cylinder on the side of its **EmissionDirection**.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/lighting-and-effects/particle-emitter/Cylinder-ShapePartial-0.5.jpg" width="300" />
    <figcaption>ShapePartial = 0.5</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/particle-emitter/Cylinder-ShapePartial-0.jpg" width="300" />
    <figcaption>ShapePartial = 0</figcaption>
  </figure>
</GridContainer>

For discs, `Class.ParticleEmitter.ShapePartial|ShapePartial` inversely multiplies the **inner radius** of
the disc.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/lighting-and-effects/particle-emitter/Disc-ShapePartial-0.5.jpg" width="300" />
    <figcaption>ShapePartial = 0.5</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/particle-emitter/Disc-ShapePartial-0.1.jpg" width="300" />
    <figcaption>ShapePartial = 0.1</figcaption>
  </figure>
</GridContainer>

For spheres, `Class.ParticleEmitter.ShapePartial|ShapePartial` multiplies the **hemispherical angle**.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/lighting-and-effects/particle-emitter/Shape-Sphere.jpg" width="300" />
    <figcaption>ShapePartial = 1</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/particle-emitter/Sphere-ShapePartial-0.5.jpg" width="300" />
    <figcaption>ShapePartial = 0.5</figcaption>
  </figure>
</GridContainer>

### Wind Influence

If you've enabled
[global&nbsp;wind](../environment/global-wind.md) in an experience, particles will follow the global wind vector as long as the emitter's `Class.ParticleEmitter.WindAffectsDrag|WindAffectsDrag` property is enabled and its `Class.ParticleEmitter.Drag|Drag` property is greater than&nbsp;0.

<img src="../assets/studio/properties/ParticleEmitter-WindAffectsDrag.png" width="320" alt="Drag and WindAffectsDrag properties shown in Properties window of Studio" />

### Flipbook

Particle flipbook textures let you animate a particle's texture over its lifetime.

<figure>
  <video src="../assets/lighting-and-effects/particle-emitter/Flipbook.mp4" controls width="80%" alt="Flipbook looping over the four particles in its texture"></video>
  <figcaption>Flipbook looping over the four particles in its texture</figcaption>
</figure>

To use particle flipbooks, the texture must be a square with dimensions of 8×8, 16×16, 32×32, 64×64, 128×128, 256×256, 512×512, or 1024×1024. If the texture isn't a square with one of these dimensions, then you can't set flipbook's properties in the **Properties** window. The flipbook texture can have a frame layout of 2×2, 4×4, or 8×8. For example, the following 1024×1024 image has an 8×8 layout, so it's suitable for a 64-frame animation.

<img
   alt="Sample texture for particle flipbooks"
   src="../assets/lighting-and-effects/particle-emitter/8x8-Explosion.png"
   width="512" />

When you create a flipbook texture, include spacing between each of the particle frames. Mip filtering issues might lead to needing larger spacing. The previous image has transparent spacing around each particle frame in the flipbook particle texture.

<Alert severity="warning">
Features with custom textures such as flipbooks cost memory to render. If you use many flipbooks with other features that use high memory, then clients automatically deactivate flipbooks when they are low on memory, which is likely for older mobile phones. To reduce the memory usage of flipbooks, use fewer unique animated particle effects or choose a texture of smaller resolution when possible. Reusing textures costs less memory than using unique textures.
</Alert>

#### FlipbookFramerate

The `Class.ParticleEmitter.FlipbookFramerate|FlipbookFramerate` property determines how fast the flipbook texture animates in frames per second. Like `Class.ParticleEmitter.Lifetime|Lifetime`, you can set a minimum and maximum range to randomize the framerate of the flip book, with a maximum of 30 frames per second.

#### FlipbookLayout

The `Class.ParticleEmitter.FlipbookLayout|FlipbookLayout` property determines the layout of the texture. It can be any value of the `Enum.ParticleFlipbookLayout` enum:

- **None** &mdash; Disable flipbook features and use the texture as a single static texture over the particle's lifetime.
- **Grid2x2** &mdash; 2&times;2 frames for a 4-frame animation.
- **Grid4x4** &mdash; 4&times;4 frames for a 16-frame animation.
- **Grid8x8** &mdash; 8&times;8 frames for a 64-frame animation.

#### FlipbookMode

The `Class.ParticleEmitter.FlipbookMode|FlipbookMode` property determines the type of the flipbook animation. The property can be any value of the `Enum.ParticleFlipbookMode` enum:

- **Loop** &mdash; Continuously play through all frames, starting back at the first frame after playing the last.
- **OneShot** &mdash; Play through the animation only once across the particle's lifetime. With this setting, the [FlipbookFramerate](#flipbookframerate) property doesn't apply; instead, the framerate is determined by the particle's `Class.ParticleEmitter.Lifetime|Lifetime` divided evenly by the number of frames in the animation. **OneShot** animations are useful for clear non-repeating animations, such as an explosion that creates a puff of smoke and then fades out.
- **PingPong** &mdash; Play from the first to the last frame, then in reverse from the last to the first, repeating throughout the `Class.ParticleEmitter.Lifetime|Lifetime` of the particle.
- **Random** &mdash; Play the frames in a random order, blending/crossfading from one frame to the next. This can be useful for organic particle textures at low framerates, such as stars slowly twinkling between subtly different shapes.

#### FlipbookStartRandom

The `Class.ParticleEmitter.FlipbookStartRandom|FlipbookStartRandom` property determines whether each particle begins at a random frame of the animation instead of always starting at the first frame. One use case is to enable this property and also set `Class.ParticleEmitter.FlipbookFramerate|FlipbookFramerate` to zero, causing each emitted particle to be a static frame chosen randomly from the flipbook texture.

### Other Properties

To further customize particles, consider the following additional emitter properties, and see the `Class.ParticleEmitter` reference page for a comprehensive list.

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
    <td>Determines by how much the velocity of particles
changes per second. You can use this property to create
effects such as particles being affected by gravity or
wind.</td>
  </tr>
  <tr>
    <td>`Class.ParticleEmitter.Drag|Drag`</td>
    <td>Determines the rate in seconds that particles lose half
their speed.</td>
  </tr>
  <tr>
    <td>`Class.ParticleEmitter.Rotation|Rotation`</td>
    <td>Determines the angle of rotation for newly-emitted
particles. Single numbers create particles at that
angle, while two numbers (minimum, maximum) set a
random rotation for each particle.</td>
  </tr>
  <tr>
    <td>`Class.ParticleEmitter.RotSpeed|RotSpeed`</td>
    <td>Determines the angular speed in degrees per second for
particles. This can be a single number or a number
range for a randomized speed. Negative values cause
particles to rotate counter-clockwise.</td>
  </tr>
  <tr>
    <td>`Class.ParticleEmitter.Speed|Speed` </td>
    <td>Determines the initial speed of particle movement,
measured in studs per second. This can be a single
number or a number range for a randomized speed.
Negative values cause particles to move in reverse.</td>
  </tr>
  <tr>
    <td>`Class.ParticleEmitter.ZOffset|ZOffset` </td>
    <td>Determines how many studs toward the camera that
particles are rendered, allowing for multiple particle
emitters to layer properly. The apparent size of the
particles isn't changed.</td>
  </tr>
</tbody>
</table>

## Creating Explosions

You can create explosions by pairing a particle emitter with a
`Class.LocalScript`
that triggers a burst of particles when a user steps on an object.

<video src="../assets/lighting-and-effects/particle-emitter/Explosion-Trap.mp4" controls width="80%"></video>

To create an explosion:

1. [Create a particle emitter](#creating-a-particle-emitter) and rename it
   to **Explosion**.

2. [Customize the particles](#customizing-particles) to
   the following listed properties:

   - **Texture** - `rbxassetid://6101261905`
   - **Drag** - `10`
   - **Lifetime** - `0.2, 0.6`
   - **Speed** - `20, 40`
   - **SpreadAngle** - `180, 180`

3. Under the parent object of the particle emitter, insert a
   **LocalScript** object:

   1. Hover over the part and click the &CirclePlus; button. A
      contextual menu displays.
   1. From the menu, insert a **LocalScript**.

4. Copy and paste the following code sample which checks if a user has touched the parent object of the
   particle emitter. When it detects the user, 100 particles emit and the
   user's health drops to 0.

   ```lua
   local trapObject = script.Parent
   local particleEmitter = trapObject.Explosion

   local EMIT_AMOUNT = 100

   local function killPlayer(otherPart)
      local character = otherPart.Parent
      local humanoid = character:FindFirstChildWhichIsA("Humanoid")

      if humanoid then
         humanoid.Health = 0
         particleEmitter:Emit(EMIT_AMOUNT)
      end
   end

   trapObject.Touched:Connect(killPlayer)
   ```
