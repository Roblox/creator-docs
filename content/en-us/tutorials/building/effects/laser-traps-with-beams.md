---
title: Laser Traps with Beams
description: The process for creating a laser trap that sets an avatar's health to 0 when touched.
next: /tutorials/building/effects/using-particles-for-explosions
prev: /tutorials/building/effects/laser-traps-with-beams
---

Beams are an effect that can be used to create lasers, force fields, and even waterfalls. This object draws a texture between two points with customizable properties like speed, width, and curve.

<video controls loop muted>
  <source src="../../../assets/tutorials/laser-traps-with-beams/laserTrap_beamExamples.mp4" />
</video>

## Trap Setup

In this tutorial, you'll create a laser trap that uses a beam and insert a script to set a player's health to 0 when the trap is touched.

<video controls loop muted>
  <source src="../../../assets/tutorials/laser-traps-with-beams/laserTrap_testFinalLaser.mp4" />
</video>

### Add Attachments

**Attachments** are where one object can connect to another. In this case, attachments will be used for the start and end points of the beam.

<figure>
    <img src="../../../assets/tutorials/laser-traps-with-beams/lasertrap_showSetup_alt.png" />
    <figcaption>Model with two green attachments</figcaption>
</figure>

1. Attachments aren't normally visible. To view attachments, toggle on **Constraint Details** in the **Model** tab.

   ![alt](../../../assets/tutorials/laser-traps-with-beams/lasertrap_constraintDetails.png)

2. Create an anchored part or model named **LaserTrap**. Then, add two attachments named **StartAttachment** and **EndAttachment**.

   <GridContainer numColumns="2">
     <img src="../../../assets/tutorials/laser-traps-with-beams/lasertrap_showTrapPart.jpg" />
     <img src="../../../assets/tutorials/laser-traps-with-beams/lasertrap_showPartsCreated.png" />
   </GridContainer>

## Move Attachments

New attachments are created in the center of the part. For the beam, the attachments will need to be moved into position.

1. Select **StartAttachment** (1) and use the **Move** tool to position it at the edge of the laser trap.
2. Move **EndAttachment** (2) further away to where the laser should stop.

   ![alt](../../../assets/tutorials/laser-traps-with-beams/lasertrap_showAttachments.jpg)

<Alert severity="info">

Attachments may be hidden inside a part. To display hidden attachments, enable **Draw On Top** from the **Model** tab.

![alt](../../../assets/tutorials/laser-traps-with-beams/lasertrap_drawOnTop.png)

</Alert>

## Create the Beam

With the attachments in place, a beam can now be created.

1. Under **LaserTrap**, add a **Beam** object named **Laser**.

   ![alt](../../../assets/tutorials/laser-traps-with-beams/lasertrap_addBeamObject.jpg)

2. With **Laser** selected, find **Attachment0** in the Properties window. Click the empty box to the right of the property and then, in the Explorer, click **StartAttachment**.

   <video controls loop muted>
   <source src="../../../assets/tutorials/laser-traps-with-beams/laserTrap_setAttachment0.mp4" />
   </video>

3. Set **Attachment1** to **EndAttachment** using the same process. The properties should appear as below.

   ![alt](../../../assets/tutorials/laser-traps-with-beams/lasertrap_showAttachmentsSet.png)

4. By default, a beam doesn't always face the camera. This may lead to situations where players are unable to see a beam from different angles.

   <Grid container spacing={4}>
    <Grid item xs={6}>
      <img src="../../../assets/tutorials/laser-traps-with-beams/lasertrap_beamDifferentAngles_left.jpg" />
      <b>Left View</b>
    </Grid>
    <Grid item xs={6}>
      <img src="../../../assets/tutorials/laser-traps-with-beams/lasertrap_beamDifferentAngles_top.jpg" />
      <b>Top View</b>
    </Grid>
   </Grid>

   So the beam is visible at any position, go into the beam properties and enable `FaceCamera`.

   <img src="../../../assets/tutorials/laser-traps-with-beams/lasertrap_toggleFaceCamera.png" />

## Beam Properties

Beams use 2D images that can be customized with properties to affect the color, size, or curvature.

1. Copy the **asset ID** of an image you uploaded, or copy an ID from the examples below.

   <Grid container spacing={6}>
    <Grid item xs={4}>
      <img src="../../../assets/tutorials/laser-traps-with-beams/beam6060542021.png" />
      `rbxassetid://6060542021`
    </Grid>
    <Grid item xs={4}>
      <img src="../../../assets/tutorials/laser-traps-with-beams/beam6060542158.png" />
      `rbxassetid://6060542158`
    </Grid>
    <Grid item xs={4}>
      <img src="../../../assets/tutorials/laser-traps-with-beams/beam6060542252.png" />
      `rbxassetid://6060542252`
    </Grid>
   </Grid>

2. In the beam's `Texture` property, paste the asset ID.

   <GridContainer numColumns="2">
     <img src="../../../assets/tutorials/laser-traps-with-beams/lasertrap_showBeamWithTexture.jpg" />
     <img src="../../../assets/tutorials/laser-traps-with-beams/lasertrap_pasteTextureID.png" />
   </GridContainer>

3. Make the laser appear brighter by changing a few properties.

   1. Add a faint glow by changing the `LightEmission` property to 0.5.
   2. Change `Transparency` to 0 (fully opaque).

   <GridContainer numColumns="2">
     <img src="../../../assets/tutorials/laser-traps-with-beams/lasertrap_showBeamLightEmission.jpg" />
     <img src="../../../assets/tutorials/laser-traps-with-beams/lasertrap_transparencyLightEmission.png" />
   </GridContainer>

4. Make the beam wider by setting both **Width0** and **Width1** to 4.

   <GridContainer numColumns="2">
     <img src="../../../assets/tutorials/laser-traps-with-beams/lasertrap_beamWidthLarger.jpg" />
     <img src="../../../assets/tutorials/laser-traps-with-beams/lasertrap_setWidth.png" />
   </GridContainer>

5. The `TextureSpeed` property animates the texture over time. For a fast, flickering effect, set it to 3.

6. Make the laser look a bit more dangerous by changing its `Color` property.

   <GridContainer numColumns="2">
     <img src="../../../assets/tutorials/laser-traps-with-beams/lasertrap_beamColor.jpg" />
     <img src="../../../assets/tutorials/laser-traps-with-beams/lasertrap_changeColor.png" />
   </GridContainer>

<Alert severity="info">

Textures have different modes, the default being **Stretch** which stretches the texture between the two attachments. Depending on your beam, you may want an alternative like **Wrap** or **Static**. Learn more on the `Class.Beam.TextureMode|TextureMode` page.

</Alert>

## Trap Mechanic

The script for the trap will check if an invisible part is touches a player. The part is used since beams don't have collision detection by default.

1. In **LaserTrap**, create a new part named **CollisionBox** that overlaps the beam.

   <GridContainer numColumns="2">
     <img src="../../../assets/tutorials/laser-traps-with-beams/lasertrap_collisionBox.jpg" />
     <img src="../../../assets/tutorials/laser-traps-with-beams/lasertrap_createCollisionBox.png" />
   </GridContainer>

2. **Anchor** CollisionBox so it doesn't move.

   ![alt](../../../assets/tutorials/laser-traps-with-beams/lasertrap_anchorPart.png)

3. In the main model or part named **LaserTrap**, add a new script. Copy the code below and paste it into the new script.

   ```lua
   local laserTrap = script.Parent
   local collisionBox = laserTrap.CollisionBox

   -- Hide the collision box
   collisionBox.Transparency = 1

   local function onTouch(otherPart)
     local character = otherPart.Parent
     local humanoid = character:FindFirstChildWhichIsA("Humanoid")

     if humanoid then
       humanoid.Health = 0
     end
   end

   collisionBox.Touched:Connect(onTouch)
   ```

4. Test the trap by walking into the laser beam. If it's not working correctly, make sure the script is in the right place and the collision box is properly named.

<video controls loop muted>
  <source src="../../../assets/tutorials/laser-traps-with-beams/laserTrap_testFinalLaser.mp4" />
</video>

With the beam complete, explore additional beam properties like `CurveSize0` and `CurveSize1`, [import](../../../production/publishing/publishing-assets.md) your own textures, or even make a new object like a force field.
