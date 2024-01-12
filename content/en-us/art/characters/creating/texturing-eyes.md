---
title: Texturing Eyes
description: Use Blender's texture painting tools to apply a custom surface appearance on your character's eyes.
next: /art/characters/creating/texturing-face
prev: /art/characters/creating/texturing-setup
---

You can apply a fully opaque texture to the eyes to achieve a more non-human visual effect for your character. Before editing the eye textures, join the two eye objects to texture them both at the same time. Then texture paint the entire eye, starting with the outer eye, moving to the inner eye, and finishing with the pupil.

To texture your eye mesh objects:

1.  Increase the texture image resolution.
2.  In the Outliner, toggle the **Hide in Viewport** option for the **Head_Geo**, **LowerTeeth_Geo**, **Tongue_Geo**, and **UpperTeeth_Geo**. Leave the eye mesh objects visible.
    <video controls src="../../../assets/art/avatar/basic-creation/Texturing_01.mp4" width="100%"></video>
3.  In Object Mode, hold <kbd>Shift</kbd> and click on both the **LeftEye_Geo** and the **RightEye_Geo**. Then right-click and select **Join** (<kbd>Ctrl</kbd><kbd>J</kbd>; <kbd>⌘</kbd><kbd>J</kbd>) to join the objects. The two objects merge using the name of the last object selected.
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
