---
title: Use particles for actions
prev: /education/build-it-play-it-mansion-of-wonder/connect-the-beam
next: /education/build-it-play-it-mansion-of-wonder/adding-scripts
description: Learn how to use particle effects to give players feedback to their actions, and learn several techniques to further customize your particles in Roblox Studio. Part of the Build It Play It Mansion of Wonder series.
---

With arrows finished, first-time players can follow the path to their goal, making their initial introduction clearer and less likely that they get lost and quit. To further enhance the user experience, let players know they've successfully completed their task with an appealing particle effect.

In the example below, a celebratory burst of ticket-shaped particles emits whenever players interact with the booths.

<video controls src="../../assets/education/build-it-play-it-mansion-of-wonder/using-particles-for-actions/particle-interaction.mp4" width="100%"></video>

<Alert severity="info">
Giving **multiple forms** of feedback is also another way of improving a player's user experience. A player with the sound down or one who is hearing impaired may rely more on visual cues. Other players may be low vision and paying more attention to sound.
</Alert>

## Create particles

When creating a particle, it needs to be inserted into a part or attachment. In this example, you'll place particles in the TestPlayer object used earlier.

1. In **TestPlayer**, create a **ParticleEmitter** named **Burst**. Default particles will start emitting from the TestPlayer object. You'll customize the emitter to create a burst effect.

   <img src="../../assets/education/build-it-play-it-mansion-of-wonder/using-particles-for-actions/create-particle-emitter.png" width="40%" />

   An example is shown below.

   <img src="../../assets/education/build-it-play-it-mansion-of-wonder/using-particles-for-actions/default-particle-stream.jpg" width="50%" />

   <Alert severity="warning">
   Particles must be named exactly since a script will be looking for the name later.
   </Alert>

2. With **Burst** selected, go to the **Properties** window and find the **Texture** property. Copy and paste one of the texture IDs supplied below, or use your own, into the texture field and press <kbd>Enter</kbd>.
   <GridContainer numColumns="3">
     <figure>
       <img src="../../assets/education/build-it-play-it-mansion-of-wonder/using-particles-for-actions/potion.png" />
       <figcaption>6772766862</figcaption>
     </figure>
     <figure>
       <img src="../../assets/education/build-it-play-it-mansion-of-wonder/using-particles-for-actions/energy.png" />
       <figcaption>6772766551</figcaption>
     </figure>
     <figure>
       <img src="../../assets/education/build-it-play-it-mansion-of-wonder/using-particles-for-actions/heart.png" />
       <figcaption>5857851618</figcaption>
     </figure>
     <figure>
       <img src="../../assets/education/build-it-play-it-mansion-of-wonder/using-particles-for-actions/paw.png" />
       <figcaption>6803084085</figcaption>
     </figure>
     <figure>
       <img src="../../assets/education/build-it-play-it-mansion-of-wonder/using-particles-for-actions/star.png" />
       <figcaption>6772783963</figcaption>
     </figure>
     <figure>
       <img src="../../assets/education/build-it-play-it-mansion-of-wonder/using-particles-for-actions/leaf.png" />
       <figcaption>6703369286</figcaption>
     </figure>
     <figure>
       <img src="../../assets/education/build-it-play-it-mansion-of-wonder/using-particles-for-actions/ticket.png" />
       <figcaption>6749057157</figcaption>
     </figure>
     <figure>
       <img src="../../assets/education/build-it-play-it-mansion-of-wonder/using-particles-for-actions/gem.png" />
       <figcaption>6772766413</figcaption>
     </figure>
   </GridContainer>

   If using the ticket texture, it will look like below.

   <img src="../../assets/education/build-it-play-it-mansion-of-wonder/using-particles-for-actions/show-particle-texture.jpg" width="50%" />

    <Alert severity="info">
    Custom textures can be any image that you have. Learn to upload them in the [Asset Manager](../../projects/assets/manager.md) article.
    </Alert>

3. In the **Explorer** window, select **TestPlayer**, then in the **Properties** window, find and change the **Color** and **Size** properties to something appropriate for your experience. For example, the following image includes particles with the following settings:

   - **Color** = `255, 178, 44`
   - **Size** = `0.6`

   <img src="../../assets/education/build-it-play-it-mansion-of-wonder/using-particles-for-actions/show-texture-color-size.jpg" width="50%" />

## Create a burst effect

Different properties can be changed so that the particles look more like a quick burst rather than a gentle stream. After designing the particle, you'll disable the emitter so that it only plays when activated by a script.

## Make particles spread

The ParticleEmitter sends out particles along two planes controlled by the property, **SpreadAngle**.

1. To make the particles fly out in all directions like the example, set the **SpreadAngle X** and **Y** to **360**.
   <video controls src="../../assets/education/build-it-play-it-mansion-of-wonder/using-particles-for-actions/spread-angle.mp4"></video>

## Different burst properties

After adding the recommended values under the video, the particles will look like they are quickly bursting from the player like a firework.

    <video controls src="../../assets/education/build-it-play-it-mansion-of-wonder/using-particles-for-actions/before-after-particle-settings.mp4"></video>

1. To get a burst motion, set the following properties to these values to make the particles explode and then quickly fade out.
   <table>
   <thead>
   <tr>
   <th>Property</th>
   <th>Value</th>
   <th>Rationale</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>**LightEmission**</td>
   <td>0.4</td>
   <td>Adds a faint glow. Note the maximum is 1.</td>
   </tr>
   <tr>
   <td>**Drag**</td>
   <td>8</td>
   <td>More drag causes the particles to quickly lose speed. </td>
   </tr>
   <tr>
   <td>**Lifetime**</td>
   <td>0.6, 1</td>
   <td>Makes particles exist for between .6 and 1 seconds.</td>
   </tr>
   <tr>
   <td>**Rate**</td>
   <td>50</td>
   <td>How many particles are emitted per second. </td>
   </tr>
   <tr>
   <td>**Speed**</td>
   <td>40</td>
   <td>How fast the particles are going when first emitted. </td>
   </tr>
   </tbody>
   </table>

   <Alert severity="info">
    Try adding some randomized numbers to make particles feel less repetitive. Some properties, such as **Lifetime** and **Rotation** add randomization by allowing for a minimum and a maximum value.
    </Alert>

2. Lastly, the particle should only play when the script (which you'll see in the next lesson) tells it to. Find the **Enabled** property and toggle it **off**.

   <img src="../../assets/education/build-it-play-it-mansion-of-wonder/using-particles-for-actions/set-enabled-off.png" width="40%" />

   <Alert severity="info">
   This page only covered a few properties. For more, see the [Particle Emitters](../../effects/particle-emitters.md) reference article.
   </Alert>
