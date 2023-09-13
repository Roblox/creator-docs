---
title: Creating with Templates
comments:
description: Use Roblox's supplied template models to create your own unique avatar character in Blender.
next: /art/avatar/creating/modeling
---

You can create your own custom avatar character using Blender and one of Roblox's downloadable template models. Using templates can save you a lot of time by skipping the complex processes of setting up your armature, rigging, skinning, and configuring your character for face animations.

This tutorial is intended for creators of all skill levels with moderate Blender experience to create a unique character by:

1. Modeling using non-destructive sculpting workflows
2. Texturing using Blender's texture paint tools
3. Caging an asset by editing the template's cage mesh objects
4. Cleaning and prepping the project for export
5. Exporting your asset for use or testing in Studio

<GridContainer numColumns="2">
  <figure><img src="../../../assets/art/avatar/basic-creation/Pre-Tutorial.png" />  <figcaption>Starting Template Model</figcaption></figure>

  <figure><img src="../../../assets/art/avatar/basic-creation/Post-Tutorial.png" /><figcaption>Example model after modifications</figcaption></figure>
</GridContainer>

<Alert severity = 'info'>
This guide uses [Blender 3.4+](https://www.blender.org/download/releases/3-4/) as a practical example for customizing a character template. Before you begin, you should have a basic knowledge using Blender's interface, tools, and viewing controls.

If you are using another program, you can still apply the general workflow of this tutorial with your program's similar tools.
</Alert>

## Template Files

Each template comes pre-baked with the [necessary components of an avatar character](../../../art/avatar/index.md#components-of-an-avatar) to save you time and effort in creating a custom avatar character. When creating characters from scratch, these individual components typically take a lot of time and a deep technical background in your modeling application. Templates allow you to skip several steps and work from a variety of base character shapes.

<table>
<thead>
  <tr>
    <th>Template Prototype</th>
    <th></th>
    <th>Sample Customizations</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>
    <img src="../../../assets/art/avatar/templates/Muzzle-Prototype.png" /><br /><center>Muzzle Head Template</center>
    </td>
    <td>
    </td>
    <td>
    <img src="../../../assets/art/avatar/templates/Muzzle-Concepts.png" /><br />
    </td>
  </tr>
  <tr>
    <td>
    <img src="../../../assets/art/avatar/templates/Round-Prototype.png" /><br /><center>Round Head Template</center>
    </td>
   <td>
    </td>
    <td>
    <img src="../../../assets/art/avatar/templates/Round-Concepts.png" /><br />
    </td>
  </tr>
</tbody>
</table>

You can choose from a variety of templates that best match your final design and save time on creating the technical components. The examples in the template tutorials utilize the [Round Blender template](../../../assets/art/reference-files/RoundMale.zip). Experiment with other templates to create your own unique character and final result.

Each `.zip` contains a `.blend`, `.fbx`, and PBR texture `.png` files for that template model. If using Blender or following the [template creation guides](../../../art/avatar/creating/index.md), use the `.blend` project.

<Tabs>
  <TabItem label="Head Shapes">
  <GridContainer numColumns="2">
  <figure><img src="../../../assets/art/avatar/templates/Round-Head-Templates.png"/><figcaption><center>Round</center></figcaption></figure>
  <figure>
  <br /><br />
  Female: <a href="../../../assets/art/reference-files/RoundFemale.zip">RoundFemale.zip</a> <br />
  Male: <a href="../../../assets/art/reference-files/RoundMale.zip">RoundMale.zip</a>
  </figure>
  </GridContainer>
  <GridContainer numColumns="2">
  <figure><img src="../../../assets/art/avatar/templates/Square-Head-Templates.png" /><figcaption><center>Square</center></figcaption></figure>
  <figure>
  <br /><br />
  Female: <a href="../../../assets/art/reference-files/SquareFemale.zip">SquareFemale.zip</a> <br />
  Male: <a href="../../../assets/art/reference-files/SquareMale.zip">SquareMale.zip</a>
  </figure>
  </GridContainer>
  <GridContainer numColumns="2">
  <figure><img src="../../../assets/art/avatar/templates/Muzzle-Head-Templates.png" /><figcaption><center>Muzzle</center></figcaption></figure>
  <figure>
  <br /><br />
  Female: <a href="../../../assets/art/reference-files/MuzzleFemale.zip">MuzzleFemale.zip</a> <br />
  Male: <a href="../../../assets/art/reference-files/MuzzleMale.zip">MuzzleMale.zip</a>
  </figure>
  </GridContainer>
  </TabItem>
  <TabItem label="Realistic">
  <GridContainer numColumns="2">
  <figure><img src="../../../assets/art/avatar/templates/SemiRealistic-Templates.png"/><figcaption><center>Realistic</center></figcaption></figure>
  <figure>
  Female: <a href="../../../assets/art/reference-files/SemiRealisticFemale.zip">SemiRealisticFemale.zip</a> <br />
  Male: <a href="../../../assets/art/reference-files/SemiRealisticMale.zip">SemiRealisticMale.zip</a>
  </figure>
  </GridContainer>
  </TabItem>
  <TabItem label="Anime">
  <GridContainer numColumns="2">
  <figure><img src="../../../assets/art/avatar/templates/Anime-Templates.png"/><figcaption><center>Anime</center></figcaption></figure>
  <figure>
   Female: <a href="../../../assets/art/reference-files/AnimeFemale.zip">AnimeFemale.zip</a> <br />
   Male: <a href="../../../assets/art/reference-files/AnimeMale.zip">AnimeMale.zip</a>  
  </figure>
  </GridContainer>
  </TabItem>
    <TabItem label="Stylized">
  <GridContainer numColumns="2">
  <figure><img src="../../../assets/art/avatar/templates/Stylized-Templates.png"/><figcaption><center>Stylized</center></figcaption></figure>
  <figure>
   Single body: <a href="../../../assets/art/reference-files/StylizedHuman.zip">Stylized.zip</a>  
  </figure>
  </GridContainer>
  </TabItem>
  <TabItem label="Caricature">
  <GridContainer numColumns="2">
  <figure><img src="../../../assets/art/avatar/templates/Caricature-Templates.png"/><figcaption><center>Caricature</center></figcaption></figure>
  <figure>
  Single body: <a href="../../../assets/art/reference-files/Caricature.zip">Caricature.zip</a>
  </figure>
  </GridContainer>
  </TabItem>
</Tabs>

## Head Mesh and Bone Objects

Both the `.blend` and `.fbx` files for each template include extra head objects and bones. Separating these objects within the templates allow you to make easier changes to each of these separate geometries. When [cleaning up](../../../art/avatar/creating/cleanup.md) your project before exporting, you must join the geometries and remove the extra bones.

The extra head mesh objects are the following:
<GridContainer numColumns="2">

  <figure>
   - Head_Geo
   - UpperTeeth_Geo
   - LowerTeeth_Geo
   - Tongue_Geo
   - RightLash_Geo
   - RightEye_Geo
   - LeftLash_Geo
   - LeftEye_Geo
</figure>

  <figure><img
  alt="Head-Related Meshes"
  src="../../../assets/art/blender-ui/Face-Objects.png"
  width="800" /><figcaption>Extra head-related meshes in Blender's Outliner</figcaption></figure>
</GridContainer>

<p />

The extra head bone children are the following and may differ between templates:

<GridContainer numColumns="2">

  <figure>
   - Tongue
   - LowerTeeth
   - UpperTeeth
   - LeftEye
   - RightEye
</figure>

  <figure><img
  alt="Head-Related Meshes"
  src="../../../assets/art/blender-ui/Face-Bones.png"
  width="800" /><figcaption>Extra head-related bones in Blender's Outliner</figcaption></figure>
</GridContainer>

## Additional Blender Configurations

The Blender project files of each template include additional configurations that are not included in the raw `.fbx` template files. If you intend on using Blender for your character creation process, it's important to understand the additions included in the `.blend` versions of the template.

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

When using the template project files for Blender, you might notice some objects, like attachment objects, are permanently hidden in the Viewport even when toggling the **Hide In Viewport** icon <img src="../../../assets/art/blender-ui/Visibility-Icon.png" style={{marginBottom:"0px;"}}/>. Since attachment objects are often not modified until the end of the character creation process, these objects have **Disable In Viewport** <img src="../../../assets/art/blender-ui/Disabled-Icon.png" style={{marginBottom:"0px;"}}/> enabled to make the organization of your project more efficient, especially when bulk toggling object visibility.

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

For instructions on how to perform either export workflow, see [Exporting Textures](../../../art/avatar/creating/exporting.md#exporting-textures).

### Scene Scale

<Alert severity = 'warning'>
You can skip this section if you are using the Blender downloadable templates. The `.blend` versions of the templates already contain many of the project settings required when setting up a Blender project configuration.
</Alert>

When creating Roblox assets in a modeling application, it's important to set your project units and scale to match Studio's.
To set up the unit scale and scene settings:

1. In the Properties panel, navigate to the **Scene Properties** tab.
   <img src="../../../assets/art/blender-ui/Scene-Options.png" width = "50%" />
2. In the Units section, change the **Unit Scale** to `0.01` and the **Length** to **Centimeters**.

### Animation Range

<Alert severity = 'warning'>
You can skip this section if you are using the Blender downloadable templates. The `.blend` versions of the templates which already contain many of the project settings required when setting up a Blender project configuration.
</Alert>

For characters with facial animation, ensure that the timeline range is set between 0 and 330:

1. In the top right of the Animation Panel, click and set **Start** to `0`.
2. In the top right of the Animation Panel, click and set **End** to `330`.

   <img src="../../../assets/art/blender-ui/Timeline-Frames.png" width = "65%"/>

<Alert severity = 'info'>
After you change your project settings, you can set these as your default Blender project settings by navigating to **File** > **Defaults** > **Save Startup File**.
</Alert>
