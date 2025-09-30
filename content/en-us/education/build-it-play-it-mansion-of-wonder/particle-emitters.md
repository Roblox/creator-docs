---
title: Add particle emitters
prev: /education/build-it-play-it-mansion-of-wonder/test-and-play
next: /education/build-it-play-it-mansion-of-wonder/save-by-publishing
description: Learn Roblox Studio camera controls and the basics of editing particle emitters in the Build It Play It Mansion of Wonders.
---

While testing, you may have noticed that the magic blasts are a bit bland. The white sparks you see right now are just a starting point; you'll make them much cooler by customizing a `Class.ParticleEmitter` object.

Particle emitters make special effects in Roblox Studio. If you've seen effects like smoke, fire, or even magic portals in other Roblox experiences, you've definitely seen `Class.ParticleEmitter|ParticleEmitters`.

<video controls src="../../assets/education/build-it-play-it-mansion-of-wonder/particle-emitters/particle-example.mp4" width="100%"></video>

## Find the blast

The template has two customizable particle emitters: one for the **magic blast** that flies through the air and another for the **explosion** when it hits an enemy. Start first with the blast, and in a later tutorial, you'll work on the explosion.

1. Using the camera controls (see below for instructions), move the camera to get a good view of the magic blast, a ball with white sparkles.

   <img src="../../assets/education/build-it-play-it-mansion-of-wonder/particle-emitters/particle-holder.png"  width="100%" />

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
      <td><kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> or arrow keys</td>
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

2. In the top-right box in Roblox Studio, find the **Explorer** window. This has all of the pieces of the project, such as code, decorations, and the blast you'll personalize.

   <Alert severity="info">
   If you don't see it the **Explorer** window, open it from Studio's **Window** menu.
   </Alert>

3. You'll need to find the magic blast's particles in the **Explorer** window to work with it. In the **Explorer** window's **search bar**, type **BlastParticles**, then select the object found.

   <video controls src="../../assets/education/build-it-play-it-mansion-of-wonder/particle-emitters/select-blaster-shot.mp4" width="40%"></video>

## Change the color

Start personalizing the magical blast by giving it a new color.

1. You can make changes to particle emitters in the **Properties** window. Find it on the bottom right of Studio, under the **Explorer** window.

2. In the **Properties** window, find the **Color** property, then double-click the light grey box to its right. A pop-up **Colors** window displays.

   <img src="../../assets/education/build-it-play-it-mansion-of-wonder/particle-emitters/select-color.png" />

3. In the **Colors** window, select a color and then click the **OK** button. For example, if you set the **Color** property to `202, 210, 20`, you will then have a particle that looks like the example below.

   <img src="../../assets/education/build-it-play-it-mansion-of-wonder/particle-emitters/show-color-change.png" width="40%" />
