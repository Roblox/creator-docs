---
title: Create laser beams with VFX
description: A tutorial on creating a laser beam that sets an avatar's health to 0 on impact.
---

A **laser beam** is a ray of light. While rarely dangerous in real life, sci-fi experiences often use laser beams as a mechanism to damage players on impact. However, because of their versatility and prominence in futuristic media, laser beams are useful for all sorts of gameplay mechanics, such as blaster weapons, puzzles, obstacles, and environment aesthetics.

Using a sample [Laser Beam Blaster](https://create.roblox.com/store/asset/16382650186) model, this tutorial shows you how to create a laser beam special effect with an optional script to set the player's health to zero on collision, including guidance on:

- Setting up an invisible collision box that detects when a player collides with the laser beam.
- Configuring attachments that represent the reach of the laser beam's emission.
- Customizing a beam that emulates the visual characteristics of a futuristic laser beam.
- Scripting behavior for the collision box that damages the player's character.

<Alert severity="info">
You can create your own assets in third-party modeling tools and follow along with your own design. For information on exporting models for use in Studio, see [Exporting Requirements](../../../art/modeling/export-requirements.md).
</Alert>

<video controls src="../../../assets/tutorials/laser-traps-with-beams/Script.mp4" width="90%"></video>

## Get blaster asset

The **Creator Store** is a tab of the **Toolbox** that you can use to find all assets that are made by Roblox and the Roblox community for use within your projects, including model, image, mesh, audio, plugin, video, and font assets. You can use the Creator Store to add an individual asset or asset library directly into an open experience.

This tutorial references a high-quality laser beam blaster model that you can use as you replicate each step within the following sections.

<img src="../../../assets/tutorials/laser-traps-with-beams/LaserBlasterAsset.png" mg width="90%" />

You can add this model to your inventory within Studio by clicking the **Add to Inventory** link in the following component. Once assets are within your inventory, you can reuse them in any project on the platform.

<BrowseSampleCard href='https://create.roblox.com/store/asset/16382650186' description='Create your laser beam with this high-quality laser beam blaster.' title='Laser Beam Blaster' assetId={16382650186}  />

<br> </br>

To get this blaster asset from your inventory into your experience:

1. From Studio's **Window** menu or **Home** tab toolbar, open the [Toolbox](../../../projects/assets/toolbox.md).
2. In the **Toolbox** window, click the **Inventory** tab. The **My Models** sort displays.

   <img src="../../../assets/studio/toolbox/Inventory-Tab.png" width="360" />

3. Click the **Laser Beam Blaster** tile. The model displays in your viewport.

## Set up a collision box

The complete laser beam that sets players health to zero on impact needs to be able to detect when players collide with the laser. Because `Class.Beam` objects don't have default collision detection capabilities, you must set up collision detection with basic parts.

For example, this tutorial uses an invisible block part with a `Class.Beam` object as a collision box that detects when a character's `Class.Humanoid` object touches the laser beam. In the final section of the tutorial, you will create a script that uses this information to trigger damage to the player's health.

To set up the collision box:

1. Insert a **block** part into **LaserBeamBlaster**.

   <img src="../../../assets/tutorials/laser-traps-with-beams/CollisionBox-1.jpg" width="80%" />

1. Select the part, then in the **Properties** window,
   1. Set **Name** to **CollisionBox**. The part's name and its case style are important for the script later in the tutorial.
   1. Enable **Anchored** to ensure that the physics system doesn't move the part when the experience starts.

1. Scale **CollisionBox** to the length you want your laser beam to blast from the blaster. For example, this tutorial scales the it to be the same length as the blaster.

   <img src="../../../assets/tutorials/laser-traps-with-beams/CollisionBox-2.jpg" width="80%" />

1. Move **CollisionBox** to a position where it extends from the blaster's emitter bulb. Your collision box now represents the reach of the laser beam's blast from the blaster.

   <img src="../../../assets/tutorials/laser-traps-with-beams/CollisionBox-3.jpg" width="80%" />

## Configure attachments

Before you add a `Class.Beam` object to your blaster, it's important to configure two `Class.Attachment` objects in the 3D space to represent the reach of the laser's emission from the blaster's emitter bulb. Beams operate by rendering a texture between attachments, so if you don't have attachments for the beam to reference, it cannot function at all.

To configure attachments for the laser beam:

1. To make attachments visible in the viewport, enable **Show Constraint Details** from Studio's **View** menu.
1. Insert two attachments into the collision box.
   1. In the **Explorer** window, hover over **CollisionBox**, then click the ⊕ icon. A contextual menu displays.
   1. From the contextual menu, insert an **Attachment**.
   1. Repeat this process so that **CollisionBox** has two attachment objects.
   1. Rename both attachments **StartAttachment** and **EndAttachment**, respectively.

   <img src="../../../assets/tutorials/laser-traps-with-beams/Attachments-2.jpg" width="80%" />

1. Move **StartAttachment** to the edge of **CollisionBox** that overlaps with the emitter bulb, then move **EndAttachment** to the edge of **CollisionBox** that represents the reach of the laser beam.

   <img src="../../../assets/tutorials/laser-traps-with-beams/Attachments-3.jpg" width="80%" />

1. Make the **CollisionBox** transparent so that you will be able to see the texture the beam renders between the attachments without obstruction.
   1. In the **Explorer** window, select **CollisionBox**.
   1. In the **Properties** window, set **Transparency** to `1` to make the part completely transparent.

   <img src="../../../assets/tutorials/laser-traps-with-beams/Attachments-4.jpg" width="80%" />

## Customize the beam

Now that you have `Class.Attachment` objects in the 3D space, you can add and customize a `Class.Beam` object to emulate the visual characteristics of a laser beam. This tutorial provides guidance on how to create a futuristic, bright pink beam that animates quickly, but by experimenting with the same properties, you can create a variety of different special effects.

To customize the beam:

1. Insert a beam into **CollisionBox**.
   1. In the **Explorer** window, hover over **CollisionBox**, then click the ⊕ icon. A contextual menu displays.
   1. From the contextual menu, insert a **Beam**.
1. Assign the collision box's attachments to the new `Class.Beam` object.
   1. In the **Explorer** window, select the beam.
   1. In the **Properties** window,
      1. Set **Attachment0** to **StartAttachment**.
      1. Set **Attachment1** to **EndAttachment**. The beam renders its default texture between the two attachments.

   <img src="../../../assets/tutorials/laser-traps-with-beams/Beam-2.jpg" width="80%" />

1. Customize the beam's visual appearance so it looks like a futuristic laser beam.
   1. In the **Explorer** window, verify the beam is still selected.
   1. In the **Properties** window,
      1. Set **Texture** to `rbxassetid://6060542021` to render a new texture that looks like a laser beam.
      1. Set **Color** to `255, 47, 137` to tint the laser bright pink.
      1. Set **LightEmission** to `0.5` to add a faint glow to the laser.
      1. Set **Width0** and **Width1** to `4` to widen the laser.
      1. Set **TextureSpeed** to `2` to make the laser animate more quickly.
      1. Enable **FaceCamera** to ensure the laser is visible no matter the angle of the player from the laser.

   <video controls src="../../../assets/tutorials/laser-traps-with-beams/Beam-3.mp4" width="80%"></video>

<Alert severity="info">
For more information on all beam properties you can customize, see [Beams](../../../effects/beams.md).
</Alert>

## Script damage behavior

Your laser beam is currently aesthetically pleasing for its environment, but it's also completely harmless as a blaster weapon. To modify the laser blaster so that it can deal damage to players, you must add in a script to the collision box that triggers this behavior.

The sample script works by waiting to see which objects touch the collision box. If an object that touches the collision box includes a child `Class.Humanoid` object, the script sets its `Class.Humanoid.Health|Health property` to `0`. By default, every player character includes a `Class.Humanoid` object, so every time a player collides with the collision box, the script instantaneously sets their health to zero, and the character falls apart.

To script the behavior that damages the player:

1. Insert a script into **LaserBeamBlaster**.
   1. In the **Explorer** window, hover over **LaserBeamBlaster**, then click the ⊕ icon. A contextual menu displays.
   1. From the contextual menu, insert a **Script**.

2. Replace the default code with the following code:

   ```lua
   local laserTrap = script.Parent
   local collisionBox = laserTrap.CollisionBox

   local function onTouch(otherPart)
   	local character = otherPart.Parent
   	local humanoid = character:FindFirstChildWhichIsA("Humanoid")

   	if humanoid then
   		humanoid.Health = 0
   	end
   end

   collisionBox.Touched:Connect(onTouch)
   ```

3. Test the behavior by walking into the laser beam.

   1. Choose **Test** from the dropdown menu and click the **Play** button to its right to begin the playtest.
	 
      <img src="../../../assets/studio/general/Mezzanine-Testing-Mode-Test.png" width="800" alt="Test option in the testing modes dropdown of Studio's mezzanine." />

   1. Walk into the laser beam to see your character fall apart. When you're done, click the **Stop** button. Studio exits playtest mode.

      <img src="../../../assets/studio/general/Mezzanine-Testing-Stop.png" width="800" alt="Stop button indicated in Studio's mezzanine." />

   <Alert severity="warning">
   If the behavior isn't working correctly, make sure the script is a child of **LaserBeamBlaster**, and that the collision box is named `CollisionBox`.
   </Alert>

You now have a dangerous laser beam blaster! Using the skills in this tutorial, you can customize all sorts of beam special effects, such as glowing force fields, rapid waterfalls, and speed ramps. For example, you can experiment with additional beam properties like `CurveSize0` and `CurveSize1`, [import](../../../production/creator-store.md) your own textures, and pair beams with other special effects, like [Particle Emitters](../../../effects/particle-emitters.md) and [Light Sources](../../../effects/light-sources.md). Happy creating!
