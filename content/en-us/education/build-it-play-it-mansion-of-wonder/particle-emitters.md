---
title: Adding Particle Emitters
prev: /education/build-it-play-it-mansion-of-wonder/test-and-play
next: /education/build-it-play-it-mansion-of-wonder/save-by-publishing
description: Learn Roblox Studio camera controls and the basics of editing particle emitters in the Build It Play It Mansion of Wonders.
---

While testing, you may have noticed that the magic blasts are a bit bland. The white sparks you see right now are just a starting point; you'll make them much cooler by changing a `Class.ParticleEmitter`.

These objects are used to make special effects in Roblox Studio. If you've seen effects like smoke, fire, or even magic portals in other Roblox experiences, you've seen `Class.ParticleEmitter|ParticleEmitters`.

<video controls src="../../assets/education/build-it-play-it-mansion-of-wonder/particle-emitters/particle-example.mp4" width="100%"></video>

## Finding the Blast

The template has two customizable ParticleEmitters: one for the **magic blast** that flies through the air and another for the **explosion** when it hits an enemy. Start first with the blast, and in a later tutorial, you'll work on the explosion.

1. Using the camera controls (see below for instructions), move the camera to get a good view of the magic blast, a ball with white sparkles.

   <img src="../../assets/education/build-it-play-it-mansion-of-wonder/particle-emitters/particle-holder.jpeg"  width="100%" />

   Below are **controls** on using the camera in Studio.

   <table>
    <thead>
    <tr>
      <th>Action</th>
      <th>Control</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td><b>Move</b></td>
      <td><kbd>W A S D</kbd> or arrow keys</td>
    </tr>
    <tr>
      <td><b>Rotate</b></td>
      <td>
      **Computer Mouse:** Hold the right mouse button and move the mouse to look around.  
      **Laptop Trackpad:** Hold down two fingers and click with another.
      </td>
    </tr>
    <tr>
      <td><b>Zoom</b></td>
      <td>
      **Computer Mouse:** Use the mouse scroll wheel.  
      **Laptop Trackpad:** Slide two fingers up or down.
      </td>
    </tr>
   </tbody>
   </table>

2. In the top right box in Roblox Studio, find the **Explorer** window. This has all of the pieces of the project, such as code, decorations, and the blast you'll personalize.

   <img src="../../assets/education/build-it-play-it-mansion-of-wonder/particle-emitters/highlight-explorer.jpeg" />

   <Alert severity="info">
   If you closed the Explorer, or don't see it, enable it by going to the **View** tab and clicking **Explorer**.

   <img src="../../assets/education/build-it-play-it-mansion-of-wonder/particle-emitters/reopen-explorer.png" />
   </Alert>

3. You'll need to find the magic blast's particles in the Explorer to work with it. In the Explorer **search bar**, type **BlastParticles**, then select the object found.

   <img src="../../assets/education/build-it-play-it-mansion-of-wonder/particle-emitters/select-blaster-shot.gif" />

## Changing the Color

Start personalizing the magical blast by giving it a new color.

1. Changes to ParticleEmitters are made in the **Properties** window. Find it on the bottom right of Studio, under the Explorer window.

   <img src="../../assets/education/build-it-play-it-mansion-of-wonder/particle-emitters/highlight-properties.jpeg" />

   <Alert severity="info">
   If you don't see the Properties window, click the **View** tab and then click the **Properties** button.
   </Alert>

2. In the Properties, find the Color property and double click the light grey box to its right.

   <img src="../../assets/education/build-it-play-it-mansion-of-wonder/particle-emitters/select-color.png" />

3. In the popup window, select a color and then click **OK**.

   <img src="../../assets/education/build-it-play-it-mansion-of-wonder/particle-emitters/set-color.png" />

   You will then have a particle that looks like the example below.

   <img src="../../assets/education/build-it-play-it-mansion-of-wonder/particle-emitters/show-color-change.jpeg" width="50%" />
