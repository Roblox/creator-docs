---
title: Texturing
comments:
description: Use Blender to apply a custom surface appearance on your character model.
next: /art/avatar/creating/caging
prev: /art/avatar/creating/modeling
---

**Texturing** is the process of customizing the color, tone, and shading of your model's surface. Custom meshes and models use a 2D image, known as a texture map, to project various surface appearance elements onto your 3D object.

<GridContainer numColumns="2">
  <figure><img src="../../../assets/art/avatar/basic-creation/Pre-Texturing.png" />  <figcaption>Model after custom sculpting</figcaption></figure>

  <figure><img src="../../../assets/art/avatar/basic-creation/Post-Texturing.png" /><figcaption>Model after texturing</figcaption></figure>
</GridContainer>

Each template comes with a color texture map, which you can alter and modify using Blender's texture editing tools. Since most Roblox avatars can take advantage of custom skin tones, it's important to understand how to [preview custom skin tones](../../../art/avatar/creating/index.md#previewing-skin-tones) in Blender. This allows you to verify how your final asset will look in a Roblox experience.

For the purpose of demonstrating the basic texturing process, this tutorial applies a completely opaque texture over parts of the character eyes and partially opaque details over the face. You can apply these same techniques to other parts of your character geometry.

<Alert severity = 'warning'>
When texturing parts of your character model's body, ensure that your character model includes a modesty layer over sensitive regions. See [Community Standards](../../../art/marketplace/marketplace-policy.md) for more information on Roblox's policies.
</Alert>

## (Optional) PBR Textures

Physically-based rendering (PBR) textures use multiple texture maps to define how a surface reacts under different lighting and environmental conditions. PBR textures can elevate the look and feel of your assets, including your avatar, accessories, and clothing. Typically, PBR textures are created in a texturing tool, such as [Substance 3D](https://www.adobe.com/products/substance3d-painter.html) or [ZBrush](https://www.maxon.net/en/zbrush). Many third-party 3D models available online include PBR textures.

<GridContainer numColumns="2">
  <figure><img src="../../../assets/modeling/surface-appearance/Layered-Clothing-Example.png" />  <figcaption>Characters and accessories can make use of PBR textures to apply visual pop and material realism.</figcaption></figure>

  <figure><img src="../../../assets/modeling/surface-appearance/Layered-Clothing-Example-2.jpg" /><figcaption>PBR textures allow for virtually any type of material surface, such as leather and denim.</figcaption></figure>
</GridContainer>

Although each template includes PBR textures, for the purpose of demonstrating the basic texturing process within Blender, this tutorial doesn't cover the PBR texturing process. For more information and references on advanced texturing, see [PBR Textures](../../../art/modeling/surface-appearance.md).

## Setting Texture Resolution

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

## Texturing Eyes

You can apply a fully opaque texture to the eyes to achieve a more non-human visual effect for your character. Before editing the eye textures, join the two eye objects to texture them both at the same time. Then texture paint the entire eye, starting with the outer eye, moving to the inner eye, and finishing with the pupil.

To texture your eye mesh objects:

1.  Increase the texture image resolution.
2.  In the Outliner, toggle the **Hide in Viewport** option for the **Head_Geo**, **LowerTeeth_Geo**, **Tongue_Geo**, and **UpperTeeth_Geo**. Leave the eye mesh objects visible.
    <video controls src="../../../assets/art/avatar/basic-creation/Texturing_01.mp4" width="100%"></video>
3.  In Object Mode, hold <kbd>Shift</kbd> and click on both the **LeftEye_Geo** and the **RightEye_Geo**. Then right-click and select **Join (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>J</kbd>)** to join the objects. The two objects merge using the name of the last object selected.
    <video controls src="../../../assets/art/avatar/basic-creation/Texturing_02.mp4" width="100%"></video>
4.  Switch to **Texture Paint** mode.
5.  With the Draw tool active, set the following brush settings for the outer eye shadow:

    1. In Brush Settings, set **Radius** to **50px** and **Strength** to **1.0**.
    2. In Color Picker, select **black**.

       <img src="../../../assets/art/avatar/basic-creation/Texturing-Shadow-Settings.png" />

6.  In the Texture Paint **3D view window**, completely paint the eye objects black. This serves as the basis for the outer-eye shadow.
    <video controls src="../../../assets/art/avatar/basic-creation/Texturing_03.mp4" width="100%"></video>
7.  With the Draw tool active, set the following brush settings for the outer eye shadow:

    1. In Brush Settings, set **Radius** to **75px** and **Strength** to **1.0**.
    2. In Color Picker, select a **deep yellow**.

       <img src="../../../assets/art/avatar/basic-creation/Texturing-Outer-Brush-Settings.png" />

8.  In the Texture Paint **2D view window**, line up your cursor to the center of the UV map that corresponds to the eye texture. Click 4-6 times on the center of each eye to create an outer eye color over the base shadow.
    <video controls src="../../../assets/art/avatar/basic-creation/Texturing_04.mp4" width="100%"></video>

9.  For visibility, enable Head_Geo visibility and reorient the camera to a front-facing view.
10. Paint the inner eye color using the following suggestions:

    1.  Click the **X Symmetry** button to enable symmetry. Toggle this off if creating asymmetrical assets.

        <img src="../../../assets/art/avatar/basic-creation/Texturing-X-Symmetry.png" />

    2.  In the Overlay view options, **enable Wireframe geometry view**. You can toggle this overlay off when spot checking your visual elements.
        <video controls src="../../../assets/art/avatar/basic-creation/Texturing_05.mp4" width="100%"></video>

        <img src="../../../assets/art/avatar/basic-creation/Texturing-Wireframe-Toggle.png" />

    3.  Update your brush settings for the inner eye:

        1. In Brush Settings, set **Radius** to **5px**. You can quickly change this radius as you paint by holding <kbd>F</kbd>.
        2. In Color Picker, select a strong **red** shade for the inner eye.

           <img src="../../../assets/art/avatar/basic-creation/Texturing-Inner-Eye.png" />

        <video controls src="../../../assets/art/avatar/basic-creation/Texturing_06.mp4" width="100%"></video>

    4.  Periodically make the head mesh visible to ensure your eye texture works with the rest of the model.

11. Update your brush settings for the pupil:

    1. In Brush Settings, set Radius to **5px**. You can quickly change this radius as you paint by holding <kbd>F</kbd>.
    2. In Color Picker, select a bright **red** shade for the pupils.

       <img src="../../../assets/art/avatar/basic-creation/Texturing-Pupil-Brush-Settings.png" />

12. Using the Brush tool, paint the pupils of your model.
    <video controls src="../../../assets/art/avatar/basic-creation/Texturing_07.mp4" width="100%"></video>
13. After completing your texture painting, switch back to **Edit Mode**.
14. Shift click both of your eye objects, and press <kbd>P</kbd> and select **By Loose Parts** to separate the two meshes.
15. Rename your remaining mesh to the original **RightEye_Geo** or **LeftEye_Geo** name.
    <video controls src="../../../assets/art/avatar/basic-creation/Texturing_08.mp4" width="100%"></video>

## Texturing the Face

After texturing the eyes, you can begin texturing the face. The concepts are similar to texturing the eyes, though you only use an opaque texture to ensure that the custom skin tone can remain visible.

In this tutorial, temporarily [increase the texture resolution](#setting-texture-resolution) to apply detail, and then texture paint the facial features, like the forehead, eyes, nose, chin and cheeks:

1. In the Texture Paint tab, resize your texture resolution to **2048** or **4098**:
   1. In the left Paint window, select **Image** > **Resize**.
   2. Set the texture size to **2048 x 2048**.
2. In the Tool sidebar, update your brush settings for the facial features.

   1. In Brush Settings, start with the following Brush recommendations:

      1. **Radius** to **5px**. You can change this radius as you paint.
      2. **Strength** to .**30**. Modify this value when applicable.
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
