---
title: Texturing setup
description: Set up Blender to optimize your project for texturing the eyes and face of your template.
next: /art/characters/creating/texturing-eyes
prev: /art/characters/creating/sculpting
---

**Texturing** is the process of customizing the color, tone, and shading of your model's surface. Custom meshes and models use a 2D image, known as a texture map, to project various surface appearance elements onto your 3D object.

<GridContainer numColumns="2">
  <figure><img src="../../../assets/art/avatar/basic-creation/Pre-Texturing.png" />  <figcaption>Model after custom sculpting</figcaption></figure>

  <figure><img src="../../../assets/art/avatar/basic-creation/Post-Texturing.png" /><figcaption>Model after texturing</figcaption></figure>
</GridContainer>

Each template comes with a color texture map, which you can alter and modify using Blender's texture editing tools. Since most Roblox avatars can take advantage of custom skin tones, it's important to understand how to [preview custom skin tones](../../../art/characters/creating/index.md#preview-skin-tones) in Blender to verify how your final asset will look in a Roblox experience.

For the purpose of demonstrating the basic texturing process, this tutorial goes over basic texture painting setup, applies a completely opaque texture over parts of the character eyes, and partially opaque details over the face. You can apply these same techniques to other parts of your character geometry.

<Alert severity = 'warning'>
When texturing parts of your character model's body, ensure that your character model includes a modesty layer over sensitive regions. See [Community Standards](../../../marketplace/marketplace-policy.md) for more information on Roblox's policies.
</Alert>

## Set texture resolution

Roblox Studio supports a texture resolution of **1024 x 1024** for albedo texture maps. When using applications like Blender or Maya to texture paint directly on a model, extremely fine details may not paint as expected due to the resolution and level of detail of the painting.

<GridContainer numColumns="2">
  <figure><img src="../../../assets/art/avatar/basic-creation/Texture-Resolution-A.png" />  <figcaption>Texture painting at 1024 x 1024 resolution</figcaption></figure>

  <figure><img src="../../../assets/art/avatar/basic-creation/Texture-Resolution-B.png" /><figcaption>Texture painting at 2048 x 2048 resolution</figcaption></figure>
</GridContainer>

When adding fine details to your texture, increase the image resolution of your texture map temporarily to **2048 x 2048** or **4096 x 4096**. After completing your texturing, change the image resolution back to **1024 x 1024** to bake in the changes.

To change your texture image resolution:

1. Starting from Layout mode, select the **Head_Geo**.
2. Switch to **Texture Paint** mode.
3. In the left Paint window, select **Image** > **Resize**.
4. Set the texture size:
   1. Use **2048** or **4096** for a higher res for detailed texture work.
   2. Use **1024** for the default Roblox-supported resolution.
      <video controls src="../../../assets/art/avatar/basic-creation/Texturing_09.mp4" width="100%"></video>
