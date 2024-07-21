---
title: 3D Art and Studio
description: An overview of fundamental 3D art tools, concepts, workflows, and resources for Roblox Studio.
hideBreadcrumbs: true
---

Roblox Studio includes free powerful 3D creation tools that enable you to effectively contribute to asset creation, world building, and more. Whether you are just getting started, or are looking for a refresher on Studio tools, this guide provides an overview on using Studio for 3D art creation.

Each of the following sections include a brief description as well as additional links for further learning:

- [Basic layout of Roblox Studio's interface](#basic-layout) - Familiarize yourself with the various panels and tools available in Roblox Studio to navigate effectively.
- [Common Shortcuts](#common-shortcuts) - Increase efficiency by mastering essential keyboard shortcuts for faster workflows in Roblox Studio.
- [How to use assets and packages](#assets-and-packages) - Learn to import, edit, and share assets and packages to enhance your workflow and collaboration.
- [3D modeling within Studio](#3d-modeling) - Explore the fundamentals of creating and importing 3D models within Roblox Studio.
- [Materials and Textures](#materials-and-textures) - Discover how Roblox uses materials and textures with your models to enhance the surface appearance of your objects.
- [Environments](#environments) - Craft immersive environments using terrain tools, lighting effects, and atmospheric elements.

## Basic Layout

After [installing Studio](../studio/setting-up-roblox-studio.md), familiarize yourself with Studio's many 3D art tools and interfaces. While you can customize Studio to show various layouts and tools, Studio opens with the most commonly used windows by default:

<img src="../assets/art/Studio-Overview.png" width = "100%" alt=""/>

- **3D viewport** &mdash; this window represents the workspace of a place. The items here are rendered similarly to how a user may view the environment they were to play your experience.

- **Explorer** &mdash; This window shows a hierarchical list of all objects and services in a place. This includes visible objects, like parts and lights, and non-rendered objects like scripts, sounds, and folders.

- **Properties** &mdash; This window populates all the properties of a selected object, such as size, position, material, and much more.

  - Many properties can be set through this window, or programmatically through a script.

- **Output** &mdash; This window displays all error, warning, or manually returned messages from the Roblox Engine. This window is useful for troubleshooting behavior in your experience.

For more information on the Studio interface and individual tools, see [Studio Overview](../studio/index.md).

## Common Shortcuts

Like all creation tools, keyboard shortcuts allow you to work efficiently and quickly. While Studio has many built-in keyboard shortcuts and offers various customizations, the following shortcuts and settings can be very useful for 3D artists:

<table>
<thead>
  <tr>
    <th>Shortcut</th>
    <th>Action</th>
    <th>Use case</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> and <kbd>Q</kbd><kbd>E</kbd> in (Studio mode)</td>
    <td>Basic camera movement</td>
    <td>Use these hotkeys to navigate through your 3D viewport.</td>
  </tr>
  <tr>
    <td><kbd>Shift</kbd> + camera movement</td>
    <td>Precise camera movement</td>
    <td>Hold <kbd>Shift</kbd> with your camera movement to move at a slower and more precise speed.</td>
  </tr>
  <tr>
    <td><kbd>Shift</kbd> + <kbd>P</kbd> (in Test mode)</td>
    <td>Free camera</td>
    <td>Untethers camera from your avatar, allowing you to freely navigate through the environment in test mode.</td>
  </tr>
  <tr>
    <td>Mouse wheel up/down</td>
    <td>Changes camera speed</td>
    <td>Modify how fast the camera moves for more precise controls.</td>
  </tr>
  <tr>
    <td><kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>L</kbd> (with Move tool)</td>
    <td>Toggle local space or world space coordinates.</td>
    <td>Adjust objects based off their local or world orientation.</td>
  </tr>
  <tr>
    <td><kbd>Alt</kbd> + <kbd>D</kbd></td>
    <td>Toggles constraints visibility</td>
    <td>See constraints, such as attachments, through objects. </td>
  </tr>
  <tr>
    <td><kbd>Alt</kbd> + <kbd>A</kbd></td>
    <td>Anchors all selected parts</td>
    <td>Anchoring a part locks it in place, even when other objects collide with it. </td>
  </tr>
  <tr>
    <td>In [Studio Settings](../studio/setting-up-roblox-studio.md#customization)</td>
    <td>Change highlight and selection colors</td>
    <td>Changing highlight and selection colors can help with accessibility.</td>
  </tr>
  <tr>
    <td>In [Studio Settings](../studio/setting-up-roblox-studio.md#customization)</td>
    <td>Change camera speed</td>
    <td>Modify how fast the camera moves by default. </td>
  </tr>
</tbody>
</table>

For additional keyboard shortcuts, see [Studio Shortcuts](../studio/shortcuts.md).

## Assets and Packages

Before you begin creating, it's important to understand how Roblox handles **assets** and **packages**, the most basic object or group of objects that you can save, use, and share.

- **Assets** are a cloud-based version of an object that you can access any time to use, share, and modify. You can make nearly any object into an asset, such as a prop, building, character, sound, image, script, and more. For more information, see [Assets](../projects/assets/index.md).

- **Packages** are the Roblox equivalent of Unity prefabs, or a group of assets bundled together to reuse in one or more experiences. Packages can update and propagate their changes to any of their copies across one or more experiences.

  Packages allows you to take advantage of powerful versioning and asset management controls. Roblox recommends that most game developers work with packages whenever possible. For more information, see [Packages](../projects/assets/packages.md).

All assets and packages save to your account's [Toolbox](#toolbox) for you or any associated groups to access. You can also manage your saved assets and packages in the Creations section of your [Creator Dashboard](https://create.roblox.com/dashboard/creations).

You can also upload your assets to share on the [Creator Store](#creator-store), and sell certain Avatar assets to Roblox's [Marketplace](#marketplace) for users to purchase and equip.

### Toolbox

<img src="../assets/studio/general/View-Tab-Toolbox.png" width="776" alt="Studio's View tab with the Toolbox button highlighted." />

The **Toolbox** is a Studio window that contains all the assets and packages created or saved by you or your group. Using the Toolbox, you can also search for community-made assets from the Creator Store, allowing you to add pre-made assets directly into your workspace and implement them in your experiences. For more information, see [Toolbox](../projects/assets/toolbox.md).

<Alert severity = 'warning'>
While Roblox promotes an open and democratic platform to build and share assets, some of these community assets may come with malicious scripts attached to them.

As a best practice, first try loading community assets in a blank place, remove any unnecessary scripts, and then resave the asset to use in your original experience.
</Alert>

### Creator Store

The **Creator Store** is where you can find many assets created and shared by Roblox and the Roblox community for use in Studio and your experiences. Anyone can contribute their assets to the Creator Store, including models, images, meshes, audio, plugins, and more.

Access the Creator Store through Studio's Toolbox or the [Creator Hub](https://create.roblox.com/store/models). For more information, see [Creator Store](../production/creator-store.md).

#### Roblox Created Models

Roblox also provides free model packs that you can use within your experiences. These are high quality assets used in many of Roblox's showcase experiences. You can add these to your toolbox in various ways by directly adding them from the Creator Dashboard, or searching for them in the Toolbox.

You can see a complete list of the many [Roblox-created assets on the Creator Store](https://create.roblox.com/store/models?creatorName=Roblox). Many of these assets were used in the following showcases:

- [Mystery of Duvall Drive](https://www.roblox.com/games/7902470429/The-Mystery-of-Duvall-Drive)
  - [Behind-the-scenes documentation](../resources/the-mystery-of-duvall-drive/index.md)
  - [Official model packs](https://create.roblox.com/store/models?creatorName=Roblox&includeOnlyVerifiedCreators=true&keyword=duvall+drive&pageNumber=1&querySource=0)
- [Beyond the Dark](https://www.roblox.com/games/7208091524/Beyond-the-Dark-Vistech-Showcase)
  - [Behind-the-scenes documentation](../resources/beyond-the-dark/index.md)
  - [Official model packs](https://create.roblox.com/store/models?creatorName=Roblox&includeOnlyVerifiedCreators=true&keyword=beyond+the+dark&pageNumber=1&querySource=0)
- [Realistic Forest Demo](https://www.roblox.com/games/5326950832/Roblox-Realistic-Forest-Demo)

### Marketplace

The **Marketplace** is where all Roblox users can purchase virtual cosmetics, such as accessories and clothing, and various character bodies that they can save to their Roblox account and set as their Roblox avatar character.

To sell assets on the Marketplace, your creation must follow specific avatar specifications and meet certain policies and guidelines. For more information, see [Avatar](../avatar/index.md) and [Marketplace](./marketplace/index.md).

## 3D Modeling

3D modeling is the process of creating three-dimensional digital representations of objects or environments. Roblox supports [basic 3D modeling](#basic-parts) in Studio, using primitive parts and allowing you to combine, subtract, and intersect the basic parts into more complex models.

Roblox also supports [custom 3D models](#mesh-parts) created from 3D modeling software such as Maya and Blender. This includes advanced support for custom models and meshes that include modern textures, animation, and avatar-related features.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/modeling/parts/Basic-Part-Sphere.png" alt="A single gray sphere part" />
    <figcaption>Basic sphere part</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/parts/Part-Example-CSG.jpg"alt="A bright blue hollow bowl that was made with solid modeling operations."/>
    <figcaption>Bowl created with solid modeling</figcaption>
  </figure>
	<figure>
    <img src="../assets/modeling/parts/Mesh-Example.jpg" alt="A high-quality treasure chest mesh with a texture." />
    <figcaption>[Mesh](#mesh-parts) with texture</figcaption>
  </figure>
</GridContainer>

### Basic Parts

Studio natively supports basic parts that allow you to quickly add simple geometry to your experience. This is ideal for creating simple environments or even greyboxing or prototyping a more complex 3D space.

Basic parts include the following benefits:

- You can quickly add and modify parts directly in Studio.
- Parts are performant and work well with Roblox's native physics behavior.
- You can quicly modify the surface appearance of parts using materials and textures.
- In many cases, a mix of basic parts and advanced custom mesh and models can work together to quickly create an immersive and performant environment.

For more information on using basic parts, as well as solid modeling operations, see [Parts](../parts/index.md).

### Mesh Parts

Meshes are collections of vertices, edges, and faces that make up a 3D object. Unlike parts, which you can directly create in Studio, you first create meshes in a third-party modeling application like Blender or Maya before importing the model file into Studio. After importing a mesh, Studio represents the mesh object as a `Class.MeshPart`.

<GridContainer numColumns="3">

  <figure>
    <img src="../assets/modeling/surface-appearance/Layered-Clothing-Example.png" alt="A Roblox avatar wearing a glossy puffy jacket and jeans"/>
    <figcaption>Create custom accessories, clothing, and characters that anyone can wear and use.</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/meshes/Beyond-The-Dark-Example.png" alt="A floating alien creature in space, from the Beyond The Dark experience"/>
    <figcaption>Design a custom character unique to your experience.</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/meshes/Mystery-of-Duvall-Example.png" alt="A cluttered interior room with a candle in the forefront and spooky interior lighting from the Mystery of Duvall Drive experience"/>
    <figcaption>Use custom meshes and models to give your environments ambiance and depth.</figcaption>
  </figure>
</GridContainer>

For more information on creating custom meshes, see [3D Art Modeling](../art/modeling/index.md).

## Materials and Textures

It's always important to consider the surface appearance of your objects, as this empowers you to create cohesive and engaging assets and environments. Studio includes many tools to manage the look and feel of your assets, primarily by customizing your objects with [materials](#materials) and [textures](#textures).

### Materials

Materials allow you to quickly set the visual and physical properties of objects. While Roblox provides dozens of preset materials that you can set your parts to, you can also use the [Material Generator](../parts/materials.md#material-generator) to create your own custom materials using a prompt.

<figure>
<GridContainer numColumns="4">
<img src="../assets/modeling/materials/Material-Generator-Example-1A.jpg" />
<img src="../assets/modeling/materials/Material-Generator-Example-1B.jpg" />
<img src="../assets/modeling/materials/Material-Generator-Example-1C.jpg" />
<img src="../assets/modeling/materials/Material-Generator-Example-1D.jpg" />
</GridContainer>
<figcaption><center>Materials generated by [Material Generator](../parts/materials.md#material-generator) using a natural language prompt</center></figcaption>
</figure>

Materials also affect physical properties beyond appearance. The following are various default materials and their unique properties:

- **Glass** - When a part's material is set to glass and its transparency is greater than `0`, it distorts and slightly blurs the image behind it, and becomes less transparent when viewed from an angle.
- **Forcefield** - Any texture object placed on a mesh using the `ForceField` material will shimmer and shine at random intervals depending on the R channel of the texture's RGB color.
- **Neon** - Adds a glowing effect on parts. This is useful for decorating places, especially sci-fi or night city environments. This behavior might change at lower render settings when playing on less performant devices. For more information on performance behavior, see [Performance Optimization](../performance-optimization/improving.md).

For additional information, see [Materials](../parts/materials.md).

### Textures

Textures are 2D images that you can apply to the surface of an object to change its appearance. Unlike materials, textures are purely visual and never affect the physical properties of the object. In general, you create texture images with third-party software and import them into Studio directly as image files, or baked-in with an imported custom 3D object. You can also use Studio's [Texture Generator](../studio/texture-generator.md) to create brand new textures for your mesh using a natural language prompt.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/art/Basic-Mesh-Example.png" />
    <figcaption>A mesh object sets the shape and geometry of the 3D object</figcaption>
  </figure>
  <figure>
    <img src="../assets/art/Basic-Texture-Example.png" />
    <figcaption>A texture image map applies a surface appearance and color</figcaption>
  </figure>
  <figure>
    <img src="../assets/art/Basic-Mesh-Combined-Example.png" />
    <figcaption>The mesh and texture combine to make a unique custom 3D object</figcaption>
  </figure>
</GridContainer>

<Alert severity="info">
Textures are different from user interface objects which can apply customizable text or an image to the [surface](../ui/in-experience-containers.md) of a part, like a billboard or computer screen.
</Alert>

There are two types of textures in Roblox, single image **basic textures** and **advanced PBR textures** that dynamically react to different lighting and environment scenarios. Whether creating assets directly for the [Creator Store](#creator-store) or [Marketplace](#marketplace) or designing content for an experience, you should incorporate PBR textures whenever you need realistic and impressive surface textures.

<Alert severity = 'warning'>
Loading many unique PBR textures at once can affect performance in your experience. When working with many similar meshes, you can save processing power and memory by using a single set of PBR textures and [modifying alpha channels in combination with your mesh object base colors](https://devforum.roblox.com/t/using-alpha-masks-in-color-maps-to-customizetint-base-colors).

For additional tips on improving performance with your assets, see [Performance Optimization](../performance-optimization/improving.md#rendering).
</Alert>

<GridContainer numColumns="2">
<figure><img src="../assets/modeling/surface-appearance/Layered-Clothing-Example.png" alt="A humanoid avatar with dreadlocks, a glossy jacket, jeans with decals, and boots."/>
<figcaption>A character model wearing cosmetic assets with PBR textures.</figcaption>
</figure>
<figure><img src="../assets/modeling/surface-appearance/SurfaceAppearance-Example-1.jpg" alt="A realistic leafy bush"/>
<figcaption>An environmental prop with PBR textures.</figcaption>
</figure>
</GridContainer>

For more information see [Textures and Decals](../parts/textures-decals.md) and [PBR Textures](../art/modeling/surface-appearance.md).

## Environments

Environments refer to the visual and spatial world within your experience. Environments are a combination of elements, such as [terrain](#terrain), [lighting](#lighting), architecture, effects, and more. Roblox provides many tools and services to quickly create high definition environments to elevate your experiences.

### Terrain

<video src="../assets/lighting-and-effects/aero-fluid-dynamics/Global-Wind-Showcase.mp4" controls width="800" alt="Video of wind blowing clouds and grass across rolling hills in the 3D world"></video>

**Terrain** refers to the landscape or outdoor environment of a Roblox experience. Features such as mountains, valleys, hills, bodies of water, and vegetation all make up terrain. To quickly generate terrain, Studio provides a [Terrain Editor](../studio/terrain-editor.md) that allows you to quickly create various types of environments, such as mountains, grass-colored hills, deserts and more.

While many experiences are include interior spaces, such as a city building or spaceship, it's important to use terrain for outdoor environments whenever possible to ensure performance and expected lighting and environmental behavior.

For more information, see [Terrain](../parts/terrain.md).

### Lighting

<img src="../assets/tutorials/enhancing-outdoor-environments/Intro-After.png" alt="A campfire in a glade with a setting sun in the background illuminating the campsite."/>

**Lighting** refers to the illumination and visual effect applied to the environment and objects in your experience. It plays a crucial role in setting the mood, atmosphere, and general visual quality of your creations.

Lighting can be categorized into the following:

- **Global lighting** - Refers to the luminescence from either the sun or moon in an outdoor environment. You can set the properties of your global lighting by adjusting the Lighting service. For additional hands-on instructions on adjusting global lighting, see the [Customize Global Lighting](../tutorials/core/building/customize-global-lighting.md) lesson of our Core Curriculum.
- **Local lighting** - Refers to light sources placed within your experiences, such as pointlights, spotlights, and surface lights. You can modify lighting scenarios based on different interior rooms or sections of your experience by using one or more light sources.

For additional information on modifying your environment's lighting, see [Lighting](../environment/lighting.md).
