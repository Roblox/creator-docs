---
title: Create basic visual effects
description: Explains how to create two different kinds of visual effect using particle emitters.
prev: /tutorials/curriculums/core/scripting/script-an-upgrade-button
next: /tutorials/curriculums/core/building/customize-global-lighting
---

<iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/Pk_UX4zMfeg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

<br/>

A static world can feel lifeless. **Visual effects** add motion, make the environment feel more dynamic, and help draw players' attention to important areas.

In this section, you'll use **particle emitters** to create two effects. The first is a glowing flare on top of the tallest sea stack that draws players' eyes upward, and the second is a layer of drifting dust motes that adds atmosphere and depth to the environment.

<Alert severity="info">
Particle emitters are primarily configured through numeric properties, making them a good fit for Assistant. Use the **Build with Assistant** tabs to generate a set of working starting values, then adjust the colors and `NumberSequence` curves yourself until the effect looks the way you want.
</Alert>

## Create a flare

The sample [Island Jump - Final](https://www.roblox.com/games/14238807008/Island-Jump-Completed-Sample) game puts a giant flare on top of its tallest platform. Because the rest of the world is still, the flare becomes a focal point, making players naturally want to climb toward it.

<Tabs>
<TabItem key = "1" label="Build with Assistant">

```text title="Create the flare"
In Workspace > World, create a new folder named VFX if it doesn't exist.
Inside the VFX folder, create a block Part named VFX_Flare with Size 20, 20, 20, CFrame.Position 400, 331, 79, and CFrame.Orientation 0, 0, 0. Set Transparency to 1 so the part is invisible, and enable Anchored.

Inside VFX_Flare, create an Attachment.

Inside that Attachment, create a ParticleEmitter named Emitter_Flare with these properties:
- Texture: rbxassetid://8983307836
- Color: Color3.fromRGB(127, 84, 59)
- LightEmission: 1
- ZOffset: 1
- Lifetime: NumberRange.new(10, 10)
- Rate: 0.45
- RotSpeed: NumberRange.new(20, 20)
- Speed: NumberRange.new(0, 0)
- Size: a NumberSequence that starts at 0, grows slowly early in the lifetime, then quickly rises to 10 and stays at 10 for the rest of the lifetime.
- Transparency: a NumberSequence that stays near 0 (visible) for most of the lifetime, then bounces between values toward the end and settles at 1.

Also inside VFX_Flare (a sibling of the Attachment), create a PointLight with Brightness 2 and Range 36.
```

After running the prompt, open the **Size** and **Transparency** sequences in the Properties window and tweak the curves yourself until the pulsing feels right.
</TabItem>

<TabItem key = "2" label="Build it Yourself">

1. In the **Explorer**, hover over **World**, click **&CirclePlus;**, and insert a new folder. Rename it **VFX**. This is where you'll keep all visual effect parts.
2. Insert a **block** part into the **VFX** folder. The sample places it above `Level_7` with the following properties:

   1. Set **Name** to `VFX_Flare`.
   2. Set **Size** to `20, 20, 20`.
   3. Set **CFrame.Position** to `400, 331, 79`.
   4. Set **CFrame.Orientation** to `0, 0, 0`.
   5. Set **Transparency** to `1` so the part itself is invisible and only the particles will show.
   6. Enable **Anchored** so physics doesn't move it.

3. Hover over **VFX_Flare**, click **&CirclePlus;**, and insert an attachment. It appears in the center of the part, and particles will emit from this point.
4. Insert a **ParticleEmitter** into the attachment and rename it **Emitter_Flare**. Particles start emitting immediately.

   <video controls src="../../../../assets/tutorials/core-building-and-scripting/Flare-1.mp4" width="80%"></video>

### Configure the flare

Now shape the emitter to actually look like a flare. Each property below has a purpose. To learn more about how each property affects the resulting visual effect, see `Class.ParticleEmitter|ParticleEmitter` and [Customizing particles](../../../../effects/particle-emitters.md#customize-particles).

1. Select `Emitter_Flare`. In the **Properties** window, set **Texture** to `rbxassetid://8983307836`. You can also upload your own [asset](../../../../projects/assets/index.md) if you want.
2. Set the rest of the basic properties:

   1. Set **Color** to `127, 84, 59` (or pick your own).
   2. Set **LightEmission** to `1` so colors blend additively — overlapping particles brighten, which is what the flare texture is designed for.
   3. Set **ZOffset** to `1`.
   4. Set **Lifetime** to `10, 10` (`Lifetime` takes a min/max range so each particle picks a random duration; equal values mean no variation).
   5. Set **Rate** to `0.45`. Rate is particles per second, so this is roughly one every two seconds.
   6. Set **RotSpeed** to `20`.
   7. Set **Speed** to `0`.

3. Some properties use a `Datatype.NumberSequence` so the value can change across a particle's lifetime, which is what gives the flare its pulse. Click the **…** next to **Size** and shape the curve so it starts at `0`, grows slowly, then jumps to `10` and holds for the rest of the lifetime.

   <figure>
   <img src="../../../../assets/tutorials/core-building-and-scripting/Flare-NumberSequence-Size.png" alt="A number sequence window where the size starts at 0 and grows slowly in the beginning of its lifetime, then quickly grows to a size of 10 and remains 10 for the duration of the lifetime." width="888" />
   <figcaption>The Y axis represents each particle's size and the X axis represents each particle's lifetime. The size starts at 0 and grows slowly in the beginning of its lifetime, then quickly grows to a size of 10 and remains 10 for the duration of the lifetime.</figcaption>
   </figure>

4. Click the **…** next to **Transparency** to shape that curve. Stay near `0` (visible) for most of the lifetime, then bounce around as the particle fades out and settle at `1`.

   <figure>
   <img src="../../../../assets/tutorials/core-building-and-scripting/Flare-NumberSequence-Transparency.png" alt="A number sequence window where the particle is visible (equal or close to 0) for the majority of its lifetime. As the particle approaches the end of its lifetime, its transparency value bounces up and down at different values, settling at 1 at the very end." width="888" />
   <figcaption>The particle is visible (equal or close to 0) for the majority of its lifetime. As the particle approaches the end of its lifetime, its transparency value bounces up and down at different values, settling at 1 at the very end.</figcaption>
   </figure>

   <img src="../../../../assets/tutorials/core-building-and-scripting/Final-Flare.jpg" alt="The final version of the flare against a bright blue sky." width="80%" />

### Add a PointLight

To make the flare cast actual light on its surroundings, use a **PointLight**. Roblox has three light types: `Class.PointLight` (light from a single point in all directions), `Class.SpotLight` (a cone in a chosen direction), and `Class.SurfaceLight` (light from one face of a part). For a flare, use `PointLight`.

1. Hover over **VFX_Flare**, click **&CirclePlus;**, and insert a **PointLight**.
2. With the **PointLight** selected, in the **Properties** window:

   1. Set **Brightness** to `2`.
   2. Set **Range** to `36`.

   <img src="../../../../assets/tutorials/core-building-and-scripting/Flare-With-PointLight.jpg" alt="The final version of the flare hovering over a gray cylinder sea stack. The flare emits a gentle glow over the sea stack." width="80%" />

</TabItem>
</Tabs>

## Create the dust particles

The second type of particle emitter the sample game uses to add dynamic movement to the game is one that dust particles throughout the atmosphere. These particles surround the player, adding a sense of texture and depth to the air itself.

<Tabs>
<TabItem key = "1" label="Build with Assistant">

```text title="Create the dust motes"
In Workspace > World > VFX, create a block Part named VFX_DustMotes with Size 645, 355, 275, CFrame.Position 198, 168, 26, and CFrame.Orientation 0, 0, 0. Set Transparency to 1 so the part is invisible. Disable CanCollide. Enable Anchored.

Inside VFX_DustMotes, create a ParticleEmitter named Emitter_DustMotes with these properties:
- Texture: rbxassetid://14302399641
- Color: Color3.fromRGB(192, 241, 255)
- ZOffset: -5
- Lifetime: NumberRange.new(1, 10)
- Rate: 50000
- Rotation: NumberRange.new(-45, 45)
- RotSpeed: NumberRange.new(-60, -60)
- Speed: NumberRange.new(1, 5)
- Acceleration: Vector3.new(1, -1, 1)
- Size: a NumberSequence that rises to about 0.25 shortly after creation, then fades gradually to 0.
- Transparency: a NumberSequence that begins fully transparent, becomes more opaque (with an envelope of about 0.1) in the middle of the lifetime, then slowly fades out to 1.
```

After running, open the Size and Transparency sequences and tune the curves by eye until the dust feels right.
</TabItem>

<TabItem key = "2" label="Build it Yourself">

1. Insert a **block** part into the **VFX** folder and scale it to cover your entire playable area. The sample uses:

   1. Set **Name** to `VFX_DustMotes`.
   2. Set **Size** to `645, 355, 275`.
   3. Set **CFrame.Position** to `198, 168, 26`.
   4. Set **CFrame.Orientation** to `0, 0, 0`.
   5. Set **Transparency** to `1` so the volume itself is invisible.
   6. Disable **CanCollide** so players walk through it freely.
   7. Enable **Anchored**.

2. Insert a **ParticleEmitter** into the part and rename it **Emitter_DustMotes**. Particles fill the volume immediately.

   <video controls src="../../../../assets/tutorials/core-building-and-scripting/DustParticles-1.mp4" width="80%"></video>

### Configure the dust particles

The dust particle emitter requires some new properties to change. `Class.ParticleEmitter.Acceleration` determines how a particle's `Class.ParticleEmitter.Speed` changes throughout its lifetime. Acceleration is often used to apply a gravity effect to particles with a negative Y value.

`Class.ParticleEmitter.Rotation` defines the range of rotations in degrees for emitted particles, with positive values corresponding with the clockwise direction. To add some randomness to the rotation of each dust mote, you can create a range of angles to choose from.

For each point in a `Class.NumberSequence`, you can set an envelope using the number input at the bottom of the window. An envelope sets the range from which Studio picks a random value higher or lower than the point's value each time a particle emits. The size of the envelope determines the range of the random selection. The sequence for `Class.ParticleEmitter.Transparency` includes an envelope so that each particle's visibility is unpredictable.

1. Select **Emitter_DustMotes** and in the **Properties** window:

   1. Set **Color** to `192, 241, 255`.
   2. Set **Texture** to `rbxassetid://14302399641`.
   3. Set **ZOffset** to `-5` so dust renders behind players and objects.
   4. Set **Lifetime** to `1, 10`.
   5. Set **Rate** to `50000`. This sounds enormous, but the part is huge so the dust still appears sparse.
   6. Set **Rotation** to `-45, 45`.
   7. Set **RotSpeed** to `-60`.
   8. Set **Speed** to `1, 5`.
   9. Set **Acceleration** to `1, -1, 1`.

2. Click the **…** next to **Size** and shape the `NumberSequence` so it rises to about `0.25` shortly after creation, then fades gradually to `0`.

   <figure>
   <img src="../../../../assets/tutorials/core-building-and-scripting/DustMotes-NumberSequence-Size.png" alt="A number sequence window where the size rises to 0.25 shortly after creation, then fades down gradually to 0." width="888" />
   </figure>

3. Click the **…** next to **Transparency** and shape that curve so it starts fully transparent, becomes more opaque in the middle (with an envelope of about `0.1`), then slowly fades out.

   <figure>
   <img src="../../../../assets/tutorials/core-building-and-scripting/DustMotes-NumberSequence-Transparency.png" alt="A number sequence window where the particle begins fully transparent, becomes randomly more opaque with an envelope of 0.1, then slowly fades out." width="888" />
   </figure>

</TabItem>
</Tabs>

<figure>
<img src="../../../../assets/tutorials/core-building-and-scripting/Dust-Motes-Sky.jpg" alt="The final version of the dust particles against a bright blue sky." />
<figcaption>Faint dust particles in the air looking up at the sky from the platforms</figcaption>
</figure>
