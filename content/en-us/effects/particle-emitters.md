---
title: Particle Emitters
description: Particle emitters emit 2D images to simulate special effects like fire, smoke, and sparks.
---

A `Class.ParticleEmitter` is an object that emits customizable 2D images (particles) into the world, useful for simulating special effects like fire, smoke, and sparks.

<video src="../assets/lighting-and-effects/particle-emitter/Showcase.mp4" controls width="100%" alt="Video of particles emitting from a MeshPart in the 3D world"></video>

## Creating a Particle Emitter

You can parent a `Class.ParticleEmitter` to an `Class.Attachment` or an object of the `Class.BasePart` class. When parented to a `Class.BasePart`, particles spawn randomly within the part's bounding box or [shape](#shape); when parented to an `Class.Attachment`, particles spawn from the attachment's position.

Additionally, the `Class.ParticleEmitter.EmissionDirection|EmissionDirection` property determines the face (`Enum.NormalId`) of emission when the emitter is parented to a `Class.BasePart`. When you change this property, you consequently change the particle emission direction as well.

<Alert severity="info">
When you rotate an emitter's parent `Class.BasePart`, the orientation of its
face also changes, altering the direction of particle emission. Alternatively,
if you add an emitter to an `Class.Attachment`, you can rotate the attachment
itself instead of using `Class.ParticleEmitter.EmissionDirection|EmissionDirection`.
</Alert>

<video src="../assets/lighting-and-effects/particle-emitter/Emission-Direction.mp4" controls width="800" alt="Video of the particle emission direction changing faces on a parent MeshPart"></video>

To create a particle emitter on a given `Class.BasePart` or `Class.Attachment`:

1. In the [Explorer](../studio/explorer.md) window, hover over the part or attachment and click the &CirclePlus; button. A contextual menu displays.
2. From the menu, insert a **ParticleEmitter**. The particle emitter immediately emits particles within the part's area or from the attachment's position.

   <img src="../assets/studio/explorer/MeshPart-ParticleEmitter.png" width="320" alt="ParticleEmitter object as child of MeshPart in Explorer hierarchy" />

## Customizing Particles

### Texture

The `Class.ParticleEmitter.Texture|Texture`
property renders the image that each particle displays. By default,
particle emitters have particles with a white sparkle texture, but you
can change it to any texture to achieve interesting effects.

<figure>
  <video src="../assets/lighting-and-effects/particle-emitter/Texture-Examples.mp4" controls width="800" alt="Three similar particle emitters with different Texture assets"></video>
  <figcaption>Three similar particle emitters with different `Class.ParticleEmitter.Texture|Texture` assets</figcaption>
</figure>

If you're creating an image to use as a particle texture, it's best to use `.png` format with a transparent background. If your texture is grayscale with no alpha channel, try setting the particle emitter's `Class.ParticleEmitter.LightEmission|LightEmission` property to **1** to hide the darker regions.

<Alert severity="info">
For steps on how to import an image for use as a particle texture,
see [Importing Assets](../projects/assets/manager.md#importing-assets).
</Alert>

To insert an image into a particle emitter:

1. In the menu bar, navigate to the [Home](../studio/home-tab.md) tab and select **Toolbox**. The [Toolbox](../projects/assets/toolbox.md) window displays.

   <img src="../assets/studio/general/Home-Tab-Toolbox.png" width="800" alt="Toolbox indicated in Home tab" />

2. If you want to insert an image that you have previously imported, click the **Inventory** tab. If you want to insert an image from another creator, click the **Creator Store** tab.

   <img src="../assets/studio/toolbox/Inventory-Tab.png" width="360" alt="Inventory tab indicated in Studio's Toolbox" />

   <img src="../assets/studio/toolbox/Creator-Store-Tab.png" width="360" alt="Creator Store tab indicated in Studio's Toolbox" />

3. Right-click on the image you want to insert into a particle emitter and select **Copy&nbsp;Asset&nbsp;ID**.
4. In the [Explorer](../studio/explorer.md) window, select a `Class.ParticleEmitter`.
5. In the [Properties](../studio/properties.md) window, paste the asset ID into the **Texture** property.

### Color

The `Class.ParticleEmitter.Color|Color` property tints each particle's texture to either a specific hue, or to a gradient `Datatype.ColorSequence` across its [lifetime](#lifetime).

<Tabs>
<TabItem label="Constant Color">

1. In the [Explorer](../studio/explorer.md) window, select the `Class.ParticleEmitter`.
1. In the [Properties](../studio/properties.md) window, select the **Color** property. You can either:

   1. Click on the color square to open the **Colors** pop-up window and select a color.
   2. Input three numbers into the RGB color value field.

   <figure>
   <img src="../assets/studio/properties/Color-Input-Options.png" width="320" />
   <img src="../assets/lighting-and-effects/particle-emitter/Color-Examples.jpg" width="720" alt="Similar particle emitters with different colored particles" />
   <figcaption>Similar particle emitters with different colored particles</figcaption>
   </figure>

</TabItem>
<TabItem label="Color Gradient">

1. In the [Explorer](../studio/explorer.md) window, select the `Class.ParticleEmitter`.
1. In the [Properties](../studio/properties.md) window, click inside the **Color** property field and click the **&ctdot;** button.

   <img src="../assets/studio/properties/Color-Open-Sequence.png" width="320" alt="Button to open color sequence popup" />

   In the color sequence popup, each triangle on the bottom axis is a
   **keypoint** that determines the color value of the property at that point in
   the particle's lifetime.

	 <img src="../assets/studio/general/ColorSequence-White-Keypoints-Labeled.png" width="640" alt="Keypoints labeled in color sequence popup" />

1. Click the keypoint at the start of the color sequence, click the
   small square next to **Color**, and select a color from the popup window.

	 <img src="../assets/studio/general/ColorSequence-Red-White.png" width="640" alt="Color sequence popup from red to white" />

1. If you want particles to change their color near the end of their
   lifetime, click the keypoint at the end of the color sequence, click the small square next to **Color**, and select a color from the popup window.

   <img src="../assets/studio/general/ColorSequence-Red-Purple.png" width="640" alt="Color sequence popup from red to purple" />

1. If desired, you can:

   - Add another keypoint by clicking anywhere on the graph.
   - Make a color change sooner or later within the gradient by dragging an intermediary keypoint to a new position.
   - Delete an intermediary keypoint by selecting it and clicking the **Delete** button.
   - Reset the entire sequence by clicking the **Reset** button.

</TabItem>
</Tabs>

### Size

The `Class.ParticleEmitter.Size|Size` property sets the size of each particle to a consistent size, or to a `Datatype.NumberSequence` across its [lifetime](#lifetime).

<Tabs>
<TabItem label="Constant Size">

1. In the [Explorer](../studio/explorer.md) window, select the `Class.ParticleEmitter`.
1. In the [Properties](../studio/properties.md) window, select the **Size** property.
1. Input the size that you want each particle to be.

</TabItem>
<TabItem label="Number Sequence">

1. In the [Explorer](../studio/explorer.md) window, select the `Class.ParticleEmitter`.
1. In the [Properties](../studio/properties.md) window, click inside the **Size** property field and click the **&ctdot;** button.

   <img src="../assets/studio/properties/Size-Open-Sequence.png" width="320" alt="Button to open number sequence popup" />

   In the number sequence popup, each square at the start and end of the graph is a **keypoint** that determines the size value of the property at that
   point in the particle's lifetime. By default, the graph defaults to a straight line and a particle remains the same size throughout its lifetime.

   <img src="../assets/studio/general/NumberSequence-0.5-0.5-Keypoints-Labeled.png" width="746" alt="Keypoints labeled in number sequence popup" />

1. Perform any of the following actions:

   - To change the size at a point, click on a keypoint and either
     drag it up or down, or enter a value in the **Value** field.
   - To insert a new keypoint, click on any point in the graph.
   - To delete a keypoint, select it and click the **Delete** button.
   - Reset the entire sequence by clicking the **Reset** button.
   - To add a random range for size, click on any keypoint and
     drag the **envelope lines** up or down. At that time, particles
     generate at a random size between the pink envelope.

     <figure>
     <img src="../assets/studio/general/NumberSequence-Envelope.png" width="440" alt="Envelope lines indicated in number sequence popup" />
     <video src="../assets/lighting-and-effects/particle-emitter/Size-Envelope.mp4" controls width="720" alt="Video of emitter with large size envelope toward end of its lifetime"></video>
     <figcaption>Emitter with large size envelope toward end of its lifetime</figcaption>
     </figure>

</TabItem>
</Tabs>

### Transparency

The `Class.ParticleEmitter.Transparency|Transparency` property sets the opacity of each particle as a consistent value, or as a `Datatype.NumberSequence` opacity across its [lifetime](#lifetime). Opacity can range from **0** (totally opaque) to **1** (fully clear). For details on how to set particles to either a specific opacity or to a number sequence, follow the process in customizing [Size](#size) but use the emitter's **Transparency** property field instead.

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
property either as a consistent value, or provide a **Min** and **Max**
range from which a random lifetime will be chosen for each particle.

<Alert severity="info">
Particles have a maximum lifetime of 20 seconds. `Class.ParticleEmitter.Lifetime|Lifetime` values higher than this will be internally capped at 20.
</Alert>

### Speed

The `Class.ParticleEmitter.Speed|Speed` property determines a random range of velocities (minimum to maximum) at which new particles will emit, measured in studs per second. Each particle's velocity is chosen upon emission and it applies in the `Class.ParticleEmitter.EmissionDirection|EmissionDirection`. Negative values cause particles to travel in reverse.

Note that changing `Class.ParticleEmitter.Speed|Speed` does not affect active particles and they retain whatever speed they already have. However, `Class.ParticleEmitter.Acceleration|Acceleration`, `Class.ParticleEmitter.Drag|Drag`, and `Class.ParticleEmitter.VelocityInheritance|VelocityInheritance` can be used to affect the speed of active particles over their lifetime.

<video src="../assets/lighting-and-effects/particle-emitter/Speed.mp4" controls width="800" alt="Video of emission speeds set to 0-1 vs. 2-15"></video>

### Rate

The `Class.ParticleEmitter.Rate|Rate` property sets the number of particles that emit per second. A single particle emitter can create up to 500 particles per second. For best performance, keep the particle rate as low as possible and experiment with [size](#size) and [other properties](#other-properties) to achieve the desired visual effect.

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
<td>**FacingCamera**</td>
<td>Standard camera-facing billboard quad; default behavior.</td>
</tr>
<tr>
<td>**FacingCameraWorldUp**</td>
<td>Facing the camera, but rotating only on the vertical upward world **Y** axis.</td>
</tr>
<tr>
<td>**VelocityParallel**</td>
<td>Aligned parallel to their direction of movement.</td>
</tr>
<tr>
<td>**VelocityPerpendicular**</td>
<td>Aligned perpendicular to their direction movement.</td>
</tr>
</tbody>
</table>

<figure>
  <video src="../assets/lighting-and-effects/particle-emitter/Orientation.mp4" controls width="800" alt="Video of expected outcome of particle emission Orientation property"></video>
  <figcaption>Expected outcome of particle orientation</figcaption>
</figure>

### Light Emission

The `Class.ParticleEmitter.LightEmission|LightEmission` property determines the blending of particle `Class.ParticleEmitter.Texture|Texture` colors with the colors behind them. A value of 0 uses normal blending mode while a value of 1 uses additive blending. Higher values can make particles glow even in environments with low lighting.

<video src="../assets/lighting-and-effects/particle-emitter/LightEmission.mp4" controls width="800" alt="Video showing light emission values of 0 vs. 1"></video>

### Spread Angle

The `Class.ParticleEmitter.SpreadAngle|SpreadAngle` property has an **X** and a **Y** value which determine the range of angles from which a particle can emit. The range is calculated from both sides around the axes; for example, a value of `(45, 0)` emits particles in a range of 0&deg; to 45&deg; away from the `Class.ParticleEmitter.EmissionDirection|EmissionDirection` across the **X** axis.

<video src="../assets/lighting-and-effects/particle-emitter/SpreadAngle.mp4" controls width="800" alt="Video of X axis spread angle 0° vs. 45°"></video>

### Wind Influence

If you've enabled [global&nbsp;wind](../environment/global-wind.md) in an experience, particles will follow the global wind vector as long as the emitter's `Class.ParticleEmitter.WindAffectsDrag|WindAffectsDrag` property is enabled and its `Class.ParticleEmitter.Drag|Drag` property is greater than 0.

<img src="../assets/studio/properties/ParticleEmitter-WindAffectsDrag.png" width="320" alt="Drag and WindAffectsDrag properties shown in Properties window of Studio" />

### Shape

The `Class.ParticleEmitter.Shape|Shape` property sets the shape of the particle emitter to either a **Box**, **Sphere**, **Cylinder**, or **Disc**.

<GridContainer numColumns="4">
  <figure>
    <img src="../assets/lighting-and-effects/particle-emitter/Shape-Box.jpg" alt="Emitter of Box shape" />
    <figcaption>Box</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/particle-emitter/Shape-Sphere.jpg" alt="Emitter of Sphere shape" />
    <figcaption>Sphere</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/particle-emitter/Shape-Cylinder.jpg" alt="Emitter of Cylinder shape" />
    <figcaption>Cylinder</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/particle-emitter/Shape-Disc.jpg" alt="Emitter of Disc shape" />
    <figcaption>Disc</figcaption>
  </figure>
</GridContainer>

After you select a shape for your particle emitter, you can experiment
with the [ShapeStyle](#shapestyle), [ShapeInOut](#shapeinout), and
[ShapePartial](#shapepartial) properties to further customize particle
emission.

<Alert severity="warning">
If you parent a particle emitter to an `Class.Attachment`, the **Sphere** and **Cylinder** shapes will not display correctly. These shapes should only be used if the emitter is parented to a `Class.BasePart`.
</Alert>

#### ShapeStyle

The
`Class.ParticleEmitter.ShapeStyle|ShapeStyle`
property sets the emission type to either:

- **Volume** &mdash; Particles emit anywhere within the shape.
- **Surface** &mdash; Particles only emit from the outside of the shape.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/lighting-and-effects/particle-emitter/Cylinder-Volume.jpg" alt="Emitter of Cylinder shape with Volume shape style" />
    <figcaption>Cylinder + Volume</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/particle-emitter/Cylinder-Surface.jpg" alt="Emitter of Cylinder shape with Surface shape style" />
    <figcaption>Cylinder + Surface</figcaption>
  </figure>
</GridContainer>

#### ShapeInOut

The `Class.ParticleEmitter.ShapeInOut|ShapeInOut` property sets the emission as follows:

- **Inward** &mdash; Particles emit toward the shape.
- **Outward** &mdash; Particles emit away from the shape.
- **InAndOut** &mdash; Particles randomly behave as both **Inward** and **Outward**.

<video src="../assets/lighting-and-effects/particle-emitter/ShapeInOut.mp4" controls width="800" alt="Particles emitting with different ShapeInOut settings"></video>

#### ShapePartial

The `Class.ParticleEmitter.ShapePartial|ShapePartial` property is a factor you can use to further modify **Cylinder**, **Disc**, and **Sphere** shapes.

<Tabs>
<TabItem label="Cylinder">

For cylinders, `Class.ParticleEmitter.ShapePartial|ShapePartial` multiplies the radius of the cylinder on the side of its **EmissionDirection**.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/lighting-and-effects/particle-emitter/Cylinder-ShapePartial-0.5.jpg" alt="Emitter of Cylinder shape with ShapePartial value of 0.5" />
    <figcaption>ShapePartial = 0.5</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/particle-emitter/Cylinder-ShapePartial-0.jpg" alt="Emitter of Cylinder shape with ShapePartial value of 0" />
    <figcaption>ShapePartial = 0</figcaption>
  </figure>
</GridContainer>

</TabItem>
<TabItem label="Disc">

For discs, `Class.ParticleEmitter.ShapePartial|ShapePartial` inversely multiplies the **inner radius** of the disc.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/lighting-and-effects/particle-emitter/Disc-ShapePartial-0.5.jpg" alt="Emitter of Disc shape with ShapePartial value of 0.5" />
    <figcaption>ShapePartial = 0.5</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/particle-emitter/Disc-ShapePartial-0.1.jpg" alt="Emitter of Disc shape with ShapePartial value of 0.1" />
    <figcaption>ShapePartial = 0.1</figcaption>
  </figure>
</GridContainer>

</TabItem>
<TabItem label="Sphere">

For spheres, `Class.ParticleEmitter.ShapePartial|ShapePartial` multiplies the **hemispherical angle**.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/lighting-and-effects/particle-emitter/Shape-Sphere.jpg" alt="Emitter of Sphere shape with ShapePartial value of 1" />
    <figcaption>ShapePartial = 1</figcaption>
  </figure>
  <figure>
    <img src="../assets/lighting-and-effects/particle-emitter/Sphere-ShapePartial-0.5.jpg" alt="Emitter of Sphere shape with ShapePartial value of 0.5" />
    <figcaption>ShapePartial = 0.5</figcaption>
  </figure>
</GridContainer>

</TabItem>
</Tabs>

### Squash

The `Class.ParticleEmitter.Squash|Squash` property allows for non-uniform scaling of particles, curve-controlled over their lifetime. Values greater than 0 cause particles to both shrink horizontally and grow vertically, while values less than 0 cause particles to both grow horizontally and shrink vertically. For details on how to set the squash amount to either a constant or to a `Datatype.NumberSequence`, follow the process in customizing [Size](#size) but use the emitter's **Squash** property field instead.
<video src="../assets/lighting-and-effects/particle-emitter/Squash.mp4" controls width="800" alt="Video of particles being gradually squashed over their lifetime"></video>

### Flipbooks

Particle flipbook textures let you animate a particle's texture over its lifetime.

<video src="../assets/lighting-and-effects/particle-emitter/Flipbook.mp4" controls width="800" alt="Flipbook looping over the four particles in its texture"></video>

To use particle flipbooks, the flipbook texture must be of pixel dimensions 8×8, 16×16, 32×32, 64×64, 128×128, 256×256, 512×512, or 1024×1024. If the texture isn't a square with one of these dimensions, you can't set flipbook's properties in the [Properties](../studio/properties.md) window.

The flipbook texture can have a frame layout of 2×2, 4×4, or 8×8. For example, the following 1024×1024 image has an 8×8 layout, so it's suitable for a 64‑frame animation.

<img src="../assets/lighting-and-effects/particle-emitter/8x8-Explosion.png" width="512" alt="Sample texture for particle flipbooks" />

<Alert severity="error">
When you create a flipbook texture, include spacing between each of the particle frames. In some cases, mip filtering might require even more spacing. The previous image has transparent spacing around each frame for the flipbook texture.
</Alert>

<Alert severity="warning">
Features with custom textures such as flipbooks cost memory to render. If you use many flipbooks with other features that use high memory, then clients automatically deactivate flipbooks when they are low on memory, which is likely for older mobile phones. To reduce the memory usage of flipbooks, use fewer unique animated particle effects or choose a texture of smaller resolution when possible. Reusing textures costs less memory than using unique textures.
</Alert>

Once you've specified a valid flipbook [texture](#texture) for the emitter's `Class.ParticleEmitter.Texture|Texture` property, the `Class.ParticleEmitter.FlipbookLayout|FlipbookLayout` property determines the layout of the texture. It can be any value of the `Enum.ParticleFlipbookLayout` enum:

- **None** &mdash; Disable flipbook features and use the texture as a single static texture over the particle's lifetime.
- **Grid2x2** &mdash; 2&times;2 frames for a 4-frame animation.
- **Grid4x4** &mdash; 4&times;4 frames for a 16-frame animation.
- **Grid8x8** &mdash; 8&times;8 frames for a 64-frame animation.

To further customize the flipbook behavior, you can adjust the following properties:

<Tabs>
<TabItem label="FlipbookFramerate">
The `Class.ParticleEmitter.FlipbookFramerate|FlipbookFramerate` property determines how fast the flipbook texture animates in frames per second. Like `Class.ParticleEmitter.Lifetime|Lifetime`, you can set a minimum and maximum range to randomize the framerate of the flip book, with a maximum of 30 frames per second.
</TabItem>
<TabItem label="FlipbookMode">
The `Class.ParticleEmitter.FlipbookMode|FlipbookMode` property determines the type of the flipbook animation. The property can be any value of the `Enum.ParticleFlipbookMode` enum:

- **Loop** &mdash; Continuously play through all frames, starting back at the first frame after playing the last.
- **OneShot** &mdash; Play through the animation only once across the particle's lifetime. With this setting, the `Class.ParticleEmitter.FlipbookFramerate|FlipbookFramerate` property doesn't apply; instead, the framerate is determined by the particle's `Class.ParticleEmitter.Lifetime|Lifetime` divided evenly by the number of frames in the animation. **OneShot** animations are useful for clear non-repeating animations, such as an explosion that creates a puff of smoke and then fades out.
- **PingPong** &mdash; Play from the first to the last frame, then in reverse from the last to the first, repeating throughout the `Class.ParticleEmitter.Lifetime|Lifetime` of the particle.
- **Random** &mdash; Play the frames in a random order, blending/crossfading from one frame to the next. This can be useful for organic particle textures at low framerates, such as stars slowly twinkling between subtly different shapes.
</TabItem>
<TabItem label="FlipbookStartRandom">
The `Class.ParticleEmitter.FlipbookStartRandom|FlipbookStartRandom` property determines whether each particle begins at a random frame of the animation instead of always starting at the first frame. One use case is to enable this property and also set `Class.ParticleEmitter.FlipbookFramerate|FlipbookFramerate` to zero, causing each emitted particle to be a static frame chosen randomly from the flipbook texture.
</TabItem>
</Tabs>

### Other Properties

To further customize particles, consider the following emitter properties, and click through to the `Class.ParticleEmitter` reference page for more details.

<Tabs>
<TabItem label="Appearance">

The following appearance properties are in addition to [color](#color), [light emission](#light-emission), [orientation](#orientation), [size](#size), [texture](#texture), [transparency](#transparency), [squash](#squash), and [flipbooks](#flipbooks).

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
    <td>Scales the light emitted from the emitter when `Class.ParticleEmitter.LightInfluence|LightInfluence` is 0.</td>
  </tr>
  <tr>
    <td>`Class.ParticleEmitter.ZOffset|ZOffset` </td>
    <td>Determines the forward-backward render position of particles, in studs, without changing their size on the screen. This allows for multiple emitters to be layered, or to render particles in front of or behind the parent object.</td>
  </tr>
</tbody>
</table>

</TabItem>
<TabItem label="Emission">

The following emission properties are in addition to [emission direction](#creating-a-particle-emitter), [lifetime](#lifetime), [speed](#speed), [rate](#rate), [spread angle](#spread-angle), and [shape](#shape).

<table>
<thead>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
	<tr>
    <td>`Class.ParticleEmitter.Enabled|Enabled` </td>
    <td>Determines if particles emit from the emitter. Setting this to `false` stops further particles from spawning, but any existing particles remain active until they expire or the `Class.ParticleEmitter:Clear()|Clear()` method is called.</td>
  </tr>
  <tr>
    <td>`Class.ParticleEmitter.Rotation|Rotation`</td>
    <td>Determines the angle of rotation for newly-emitted particles. Single numbers create particles at that angle, while two numbers (minimum, maximum) set a random rotation for each particle.</td>
  </tr>
  <tr>
    <td>`Class.ParticleEmitter.RotSpeed|RotSpeed`</td>
    <td>Determines the angular speed in degrees per second for particles. This can be a single number or a number range for a randomized speed. Negative values cause particles to rotate counter-clockwise.</td>
  </tr>
</tbody>
</table>

</TabItem>
<TabItem label="Motion">

The following motion properties are in addition to [wind influence](#wind-influence).

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
    <td>A value between 0 and 1 that controls the speed of the particle effect.</td>
  </tr>
	<tr>
    <td>`Class.ParticleEmitter.VelocityInheritance|VelocityInheritance`</td>
    <td>Determines how much of the parent object's velocity is inherited by particles when they are emitted.</td>
  </tr>
</tbody>
</table>

</TabItem>
</Tabs>
