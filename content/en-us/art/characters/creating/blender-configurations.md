---
title: Blender Configuration
description: Roblox avatar template projects have several helper configurations and settings to help expedite the character creation process.
next: /art/characters/creating/modeling-best-practices
prev: /art/characters/creating/head-objects
---

The Blender project files of each template include additional helper configurations that are not included in the raw `.fbx` template files. If you intend on using Blender for your character creation process, it's important to understand the additions included in the `.blend` versions of the template and what they do.

### Hierarchy

The following is a breakdown of what is included in each Blender template file:

<GridContainer numColumns="2">
  <figure>
- **Cage**: Contains the character's 15 outer body cage meshes.
- **Joints**: The parent armature object that includes the following objects:
  - The **bones** that make up the character's rigging armature.
  - The **_Geo** mesh objects that make up the avatar appearance.
  - The **_Att** attachment objects that define where accessories attach when equipped.
  - The **animation data** for saving facial animation data and poses.
- **Fill** and **Sun**: These objects are used to provide lighting, allowing you to preview your characters in a neutral lighting similar to a Studio baseplate. These are not part of the avatar character.
</figure>

  <figure><img
  alt="Head-Related Meshes"
  src="../../../assets/art/blender-ui/Blender-Project-Objects.png"
  width="800" /><figcaption>Blender Project Hierarchy</figcaption></figure>
</GridContainer>

### Disabled Objects

When using the template project files for Blender, you might notice some objects, like attachment objects, are permanently hidden in the Viewport even when toggling the **Hide In Viewport** icon <img src="../../../assets/art/blender-ui/Visibility-Icon.png" style={{marginBottom:"0px;"}} width="20px"/>. Since attachment objects are often not modified until the end of the character creation process, these objects have **Disable In Viewport** <img src="../../../assets/art/blender-ui/Disabled-Icon.png" style={{marginBottom:"0px;"}} width="20px"/> enabled to make the organization of your project more efficient, especially when bulk toggling object visibility.

If you need access to disabled objects, use the following instructions to access the **Disable In Viewport** toggle:

1. In your Outliner, click the **Filter** dropdown.

   <img src="../../../assets/art/blender-ui/Outliner-Filter.png" />

2. Enable the **Disable In Viewport** filter.

   <img src="../../../assets/art/blender-ui/Outliner-Menu.png" />

3. The **Disable In Viewport** icon <img src="../../../assets/art/blender-ui/Disabled-Icon.png" style={{marginBottom:"0px;"}}/> now appears next to every object in the Outliner. Toggle the icon to change the Disabled status for your objects.
   <img src="../../../assets/art/blender-ui/Outliner-Disabled-Enabled.png" />

### Custom Skin Tones

The Blender project files include a shader configuration that allows you to preview custom skin tones, similar to how they display in Roblox if users customize their skin tones.

Textures with full or partial transparency allow the underlying `Class.Part.Color` to reveal through the applied texture, enabling a user to personalize their avatar character with custom skin tones.

<GridContainer numColumns="2">
  <figure><img src="../../../assets/art/avatar/templates/Texture-Map.png" /> <figcaption>A texture map example that uses low opacity to reveal underlying skin color and full opacity to apply a fully-opaque color to the undergarments, eyebrows, mouth, and eyes.</figcaption></figure>

  <figure><img src="../../../assets/art/avatar/templates/Custom-Skin-Tones.png" /><figcaption>The same avatar character using the same texture map. Each model has different underlying part colors except where the texture map applies a full color. </figcaption></figure>
</GridContainer>

#### Previewing Skin Tones

<Alert severity = 'warning'>
You must use **Blender 3.4+** to ensure that the helper shader configurations render correctly. If you are using a previous version of Blender, textures may not render as expected.
</Alert>

The Blender project file includes shader configurations that allow you to preview custom skin tones similar to how they appear in Studio. These custom colors do not export with the model, but can provide you a quick visual reference for how a custom skin color and texture might look in Roblox.

For this Blender shader configuration, keep in mind the following requirements:

- You must switch to **Viewport Shading** mode for textures to render as expected.
  <img src="../../../assets/art/blender-ui/Viewport-Shading-Setting.png" style={{marginBottom:"0px;"}}/>
- When swapping out textures, the normal map's colorspace reverts to **SRGB** instead of **NonColor**. If this occurs, you might need to change it back in order for the normal map to render correctly.

To preview your character's skin tone in Blender:

1. In **Layout**, select any geometry object, such as **Head_Geo**.
2. Go to the **Shading** tab.
3. In the Node panel, ensure **Object** is selected.
4. Find the **PartColor** node that is attached to the **Mix** node.
5. Pick a color and value on the node to apply a reference custom skin tone.
   <video
   controls
   src="../../../assets/art/avatar/basic-creation/Color_Picker_01.mp4"
   width="100%"></video>

#### Export Setup

While the skin tone preview is a critical element to verifying your templates color and tone compatibility in Roblox, it prevents your color texture map from automatically being packaged with the final `.fbx` file. There are two ways to resolve this before exporting your model:

1. In the Shading tab, disconnect the **Mix** node and replace it with the **ColorMap** node.
2. Export your textures manually as separate image files and add them later in Studio.

For instructions on how to perform either export workflow, see [Exporting Textures](../../../art/characters/creating/exporting-textures.md).

### Scene Scale

<Alert severity = 'warning'>
You can skip this section if you are using the Blender downloadable templates. The `.blend` versions of the templates which already contain many of the project settings required when setting up a Blender project configuration.
</Alert>

When creating Roblox assets in a modeling application, it's important to ensure your `.fbx` exports scale correctly. The `.fbx` file type scales objects by `100`, meaning that you have to modify your working scale by `.01`. The template files already apply this scaling.

There are two ways to perform this scaling. You can modify your scene scale properties in your project with the following steps:

1. In the Properties panel, navigate to the **Scene Properties** tab.
   <img src="../../../assets/art/blender-ui/Scene-Options.png" width = "50%" />
2. In the Units section, change the **Unit Scale** to `0.01` and the **Length** to **Centimeters**.

Alternatively, you can modify your scaling when exporting your files:

1. Navigate to **File** > **Export** > **FBX (.fbx)**.
2. Set **Transform** > **Scale** to `.01`.
   <img src="../../../assets/modeling/skinned-meshes/Blender-Export-Settings-2.png" width="320" />

### Animation Range

<Alert severity = 'warning'>
You can skip this section if you are using the Blender downloadable templates. The `.blend` versions of the templates which already contain many of the project settings required when setting up a Blender project configuration.
</Alert>

For custom characters with facial animation, ensure that the timeline range is set between 0 and 330:

1. In the top right of the Animation Panel, click and set **Start** to `0`.
2. In the top right of the Animation Panel, click and set **End** to `330`.

   <img src="../../../assets/art/blender-ui/Timeline-Frames.png" width = "65%"/>

<Alert severity = 'info'>
After you change your project settings, you can set these as your default Blender project settings by navigating to **File** > **Defaults** > **Save Startup File**.
</Alert>
