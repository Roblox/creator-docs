---
title: Texturing face
description: Use Blender to apply a custom surface appearance on your character's face.
next: /art/characters/creating/texturing-pbr
prev: /art/characters/creating/texturing-eyes
---

After texturing the eyes, you can begin texturing the face. The concepts are similar to texturing the eyes, though you only use an opaque texture to ensure that the custom skin tone can remain visible.

To texture the face:

1. In the Texture Paint tab, resize your texture resolution to **2048** or **4098**:
   1. In the left Paint window, select **Image** > **Resize**.
   2. Set the texture size to **2048 x 2048**.
2. In the Tool sidebar, update your brush settings for the facial features.

   1. In Brush Settings, start with the following Brush recommendations:

      1. **Radius** to **5px**. You can change this radius as you paint.
      2. **Strength** to **0.300**. Modify this value when applicable.
      3. In Symmetry, enable **X Axis Mirroring**.

         <img src="../../../assets/art/avatar/basic-creation/Texture-Symmetry-Tool-Setting.png" />

   2. In Color Picker, select a neutral **dark** shade for the shadows.

3. Apply texture to your character's face features, such as the nostrils, wrinkles, ears, and chin. Keep in mind that the painted textures will look softer and blended with the surface once the texture resolution is resized.
   <video controls src="../../../assets/art/avatar/basic-creation/Texturing_10.mp4" width="100%"></video>

4. When complete, resize your texture resolution back to **1024 x 1024**:
   1. In the left Paint window, select **Image** > **Resize**.
   2. Set the texture size back to **1024 x 1024**.
      <video controls src="../../../assets/art/avatar/basic-creation/Texturing_11.mp4" width="100%"></video>

Your final result should include various facial textures that help accentuate the features of your character and work well with any custom skin tone. Try exploring various amounts of texturing and the types of surfaces you could expect on skin, such as wrinkles, scars, or dirt/grunge. You should also verify your textures between several skin tones to ensure that your texturing looks acceptable with various skin types.

<GridContainer numColumns="3">
  <figure><img src="../../../assets/art/avatar/basic-creation/Post-Texturing-A.png" />  <figcaption>Default Green</figcaption></figure>

  <figure><img src="../../../assets/art/avatar/basic-creation/Post-Texturing-B.png" /><figcaption>Pink</figcaption></figure>

<figure><img src="../../../assets/art/avatar/basic-creation/Post-Texturing-C.png" /><figcaption>Blue</figcaption></figure>

</GridContainer>

<Alert severity = 'success'>
For a comparison reference, you can download [this version of the tutorial project with texturing completed](../../../assets/art/reference-files/checkpoint/2_Goblin-textured.blend).
</Alert>
