---
title: Create explosions with VFX
description: The process for creating a trap that emits a burst of particles when it kills a player.
---

Previously, you worked with particles that played continuously, like [smoke from a volcano](./custom-particle-effects.md). Particles can also be used in a single burst, such as explosions. This tutorial will show you how to create a trap that emits a burst of particles and kills a player.

<video controls loop muted>
    <source src="../../../assets/tutorials/using-particles-for-explosions/burstParticle_finalInContext.mp4" />
</video>

## Emitter setup

The explosion will use a ParticleEmitter with some changed properties that will create a burst.

1. Design a dangerous looking trap. Then, insert a **ParticleEmitter** named **Explosion** into the part.

   <GridContainer numColumns="2">
     <img src="../../../assets/tutorials/using-particles-for-explosions/burstParticles_partExample.png" width="60%" />
     <img src="../../../assets/tutorials/using-particles-for-explosions/burstParticles_createExplosion.png" />
   </GridContainer>

2. Create an electric spark effect using these properties.

   <table>
   <thead>
   <tr>
      <th>Property</th>
      <th>Value</th>
      <th>Description</th>
   </tr>
   </thead>
   <tr>
   <td><b>Texture</b></td>
   <td>rbxassetid://6101261905</td>
   <td>Electric spark texture.</td>
   </tr>
   <tr>
   <td><b>Drag</b></td>
   <td>10</td>
   <td>How fast particles lose speed.</td>
   </tr>
   <tr>
   <td><b>Lifetime</b></td>
   <td>0.2, 0.6</td>
   <td>Makes explosion particles exist for a short time.</td>
   </tr>
   <tr>
   <td><b>Speed</b></td>
   <td>20, 40</td>
   <td>Compensates for the short lifetime.</td>
   </tr>
   <tr>
   <td><b>SpreadAngle</b></td>
   <td>180, 180</td>
   <td>Fires particles in all directions.</td>
   </tr>
   </table>

3. So the trap doesn't emit particles constantly toggle **Enabled** to **off**.

   ![alt](../../../assets/tutorials/using-particles-for-explosions/burstParticles_toggleEnabled.png)

## Test particle bursts

To test the particle burst, you can use a Studio plugin developed by Roblox.

1. Go to the Marketplace page for the [Emit() Plugin](https://www.roblox.com/library/303835976/ParticleEmitter-Emit-n) Plugin. On that page, click the **Install** button.

   ![alt](../../../assets/tutorials/using-particles-for-explosions/burstParticles_pluginInstall.png)

2. When Studio opens, the plugin should install automatically.

   ![alt](../../../assets/tutorials/using-particles-for-explosions/burstParticles_confirmPluginInstall.png)

3. Select the **Explosion** emitter and notice the plugin UI that appears in the top left of the 3D viewport. In the number box, type **100** (the amount of particles to emit) and press <kbd>Enter</kbd>.

   ![alt](../../../assets/tutorials/using-particles-for-explosions/burstParticles_enterEmitRate.png)

4. Press the **Emit** button to test the emitter.

<video controls loop muted>
    <source src="../../../assets/tutorials/using-particles-for-explosions/burstParticle_testParticleEmit.mp4" />
</video>

## Color and transparency

Some extra steps can make the explosion look more impressive.

1. Open the sequence window for the emitter's **Color** by clicking the three dots next to the property. Then, create keypoints in the window to make a color gradient.

   ![alt](../../../assets/tutorials/using-particles-for-explosions/burstParticles_colorSequence.png)

2. For **Transparency**, use a **number sequence** that increases transparency over a smooth curve to show a gradual fade out.

   ![alt](../../../assets/tutorials/using-particles-for-explosions/burstParticles_transparencyGradient.png)

   A finished particle effect may look like below.

   ![alt](../../../assets/tutorials/using-particles-for-explosions/burstParticles_transparencyGradientExample.jpg)

## Script setup

With the emitter complete, the explosion can now be played through a script. The script works by checking for players touching the trap. Whenever it detects someone, the particles will emit and the player will die.

1. In the trap part, add a new **Script** named **PlayExplosion**.

   ![alt](../../../assets/tutorials/using-particles-for-explosions/burstParticles_explorerCreateScript.png)

2. Set up variables to store the part and emitter. Then, include a variable named `EMIT_AMOUNT` that stores the number of particles emitted per explosion.

   ```lua
   local trapObject = script.Parent
   local particleEmitter = trapObject.Explosion

   local EMIT_AMOUNT = 100
   ```

3. Code an event to check if a `Class.Humanoid` touches the part. If so, set that humanoid's health to 0, forcing them to respawn.

   ```lua
   local trapObject = script.Parent
   local particleEmitter = trapObject.Explosion

   local EMIT_AMOUNT = 100

   local function killPlayer(otherPart)
   	local character = otherPart.Parent
   	local humanoid = character:FindFirstChildWhichIsA("Humanoid")

   	if humanoid then
   		humanoid.Health = 0
   	end
   end

   trapObject.Touched:Connect(killPlayer)
   ```

## Play the explosion

In scripts, particles are emitted using the `Class.ParticleEmitter:Emit()|Emit()` function. This creates a one-time burst of a number of particles.

1. Call the `Emit()` function and pass in `EMIT_AMOUNT`, the variable created earlier.

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

2. Test the script by walking into the trap.

<video controls loop muted>
    <source src="../../../assets/tutorials/using-particles-for-explosions/burstParticle_genericFinal.mp4" />
</video>

With just a few changes to the example in this tutorial, you can create a variety of different effects. Some alternatives include sparkles for gathering collectable objects, or explosions to indicate a projectile's impact.
