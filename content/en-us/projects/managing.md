---
title: Managing Projects with Roblox Studio
description: An overview of managing projects with Roblox Studio.
---

## Creating Projects

To create a project:

1. Open [Roblox Studio](../studio/setting-up-roblox-studio.md).
2. Click a template from the Studio start screen.
3. After making any change, you can save the project from the **File** menu:
   - **Save to File** - Saves the place you are currently working on to disk as
     an `.rbxl` file.
   - **Save to Roblox** - Saves your place to Roblox servers as the default
     starting place for your project.
     When choosing this option, Roblox prompts you to define project settings,
     so it can properly manage your project in the cloud.
   - **Save to Roblox As...** - Saves your place to an existing project, as an
     additional place in that experience.

## Defining Project Settings

Project settings tell Roblox how to manage components of your project in the
cloud. These settings are only available after saving your project to Roblox. To
define project settings:

1. In the menu bar, select the **Home** tab, then click **Game Settings**. If you haven't saved your project, you are prompted to do so.

   <img src="../assets/studio/general/Home-Tab-Game-Settings.png" width="800" alt="Game Settings button indicated in Home tab" />

2. Fill in the required fields for the **Basic Info** tab and click **Save**.
   This unlocks more tabs to define other project settings as
   described in [Game Settings](../studio/game-settings.md).

## Cloud-Based Assets

In Roblox, assets such as images, meshes, and audio are stored as **cloud-based
assets**, so you don't need to bundle local copies into a saved Studio
experience. Each asset in the cloud is assigned a unique **asset ID** from which
multiple experiences can utilize them.

See [Assets](../projects/assets/index.md) for details on instances, assets,
and their association in Roblox.

## Testing

Your team can instantly test the experience on PC, mobile, and other devices you
wish to support through the Roblox app; no need to compile builds, deploy to
app stores, or await app store approval.

Studio offers a suite of options for testing an experience before releasing it
to the public:

- **Rapid playtesting** that provides a close simulation of the experience
  running on the Roblox application.
- **Multi-client simulation** for comparing how each client "sees" other clients
  within the experience.
- **Device emulation** that provides insight on how controls operate on a mobile
  device or how on-screen UI displays on different screens and aspect ratios.
- **Collaborative playtesting** with members of your
  [team](../projects/setting-up-a-team.md).

For more information on each testing option, see [Studio Testing
Modes](../studio/testing-modes.md).

## Publishing Projects

### Beta

When you're ready to release an experience to a wider audience for testing, you
can [release it to the
public](/production/publishing/publishing-experiences-and-places#releasing-to-the-public),
although beta testing should still be an essential part of your development
cycle. Because you're not able to determine which countries have access to an
experience, which limits the ability to run beta tests in smaller markets, consider these alternate strategies:

<Tabs>
  <TabItem label="Paid-Access Beta">
    Under the [paid access](../production/monetization/paid-access.md) model, users
    must pay an upfront fee in **Robux**, the platform's currency. This limits
    your user base, allowing you to test and iterate with smaller server fills,
    although the test results you gather may not reflect performance among a
    wider audience.
  </TabItem>
  <TabItem label="Ghost Release">
    Under the "ghost release" model, you release an experience under a temporary
    name and icon. This doesn't necessarily gauge marketing appeal, but it can help
    you test the experience without impacting its rating. When testing is
    complete, you can remove the ghost version and conduct a
    [full&nbsp;release](#full-release).
  </TabItem>
</Tabs>

### Full

When you're ready to release an experience to the world, you can [release it to the public](../production/publishing/publishing-experiences-and-places.md#releasing-to-the-public)
under its final name with a complete description, icon, and other promotional
imagery. For guidance on release names, descriptions, and promotional materials,
review [metadata best
practices](/production/publishing/publishing-experiences-and-places#metadata-best-practices),
experience [icons](../production/publishing/experience-icons.md), and [promotional
thumbnails](/production/promotion/promotional-thumbnails).

<img src="../assets/misc/Experience-Page-Default.jpg" width="100%" />

## World Building Practices

The following tips will help you build your world in a more efficient and
polished way, ranging from how you create your project to how you can approach
level design in Studio.

### Understanding Scale

A representation of the user can help designers understand the scale of their world and accommodate size-sensitive areas like hallways or doors. To insert a character model for this purpose:

1. In the menu bar, select the **Avatar** tab, then click **[Rig
   Builder](/studio/rig-builder)**.
2. Select one of the rigs to insert it into your experience. While building,
   position the rig near key areas to better understand the scale of a
   construction.

<img
src="../assets/resources/mystery-of-duvall-drive/constructing-the-house/scale-outside.png"
/>

### Grayboxing

Grayboxing is a level design process where environments are built with
**placeholder** art. Once a level is created, it can be playtested and evaluated
for gameplay, scale, and visuals. Final art assets can then be produced to
replace the graybox assets.

Studio's [Toolbox](../projects/assets/toolbox.md) and [solid modeling
tools](/parts/solid-modeling) are perfect for
grayboxing when designing and building your experience. Notice the usage of
grayboxing in the Roblox showcase [The Mystery Of Duvall
Drive](/resources/the-mystery-of-duvall-drive).

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/resources/mystery-of-duvall-drive/constructing-the-house/scale-inside.png" />
    <figcaption>Grayboxed map</figcaption>
  </figure>
  <figure>
    <img src="../assets/resources/mystery-of-duvall-drive/constructing-the-house/scale-final.png" />
    <figcaption>Finished map</figcaption>
  </figure>
</GridContainer>

<Alert severity='info'>
Roblox provides a variety of free high quality [art
kits](https://devforum.roblox.com/t/free-synty-asset-packs-released-in-the-marketplace/1283755)
on the Marketplace which can be used in your experience, inclusive of a range of
different environments.
</Alert>

### Parts and Meshes

Objects in an environment typically consist of parts or MeshParts. Before
building a section of an environment, consider whether that component should be
a part or MeshPart.

- **Parts** are built-in shapes such as blocks, spheres, and cylinders that can
  be used as-is or combined using [solid
  modeling](/parts/solid-modeling). Use parts for
  grayboxing or simple architectural elements like walls and floors.

- **MeshParts** are imported 3D assets used for complex architectural objects
  and props. They also support `Class.SurfaceAppearance`, which permits advanced
  graphic options such as normal maps.

In the following image, parts were used to construct the walls, floors, and
railings. All other objects like candles and bookshelves are `Class.MeshPart`
objects. For more information, see [Meshes](../parts/meshes.md) and [External
Modeling](/art/modeling).

<img src="../assets/misc/Building-Best-Practices-Example-Parts.jpg" />

### Applying Materials

For greater visual polish, it's recommended to change the default **Plastic**
material of parts. Even a simple switch to **Concrete** adds a minor level of visual
noise and detail without impacting the color. See [Materials](../parts/materials.md) for information on setting alternate materials and creating your own custom materials.

### Snapping and Alignment

Always make sure that objects are **aligned to the grid** at the start. Position
and size values should also be set at common increments of 1 or 0.25. If objects
are not aligned, or if sizes are inconsistent, small irregularities such as gaps
in walls are likely to appear.

### Packages and Assets

[Packages](../projects/assets/packages.md) are sets of reusable objects defined by a developer
that can be easily modified and updated across multiple places. For any large
project, packages are highly useful. They offer the following benefits when
building:

- Packages can be used as **asset kits**, allowing developers to duplicate a set
  of objects as needed. If an experience also has multiple places, asset kits
  can be reused between places to provide consistency.
- Packages make it easier to **update assets**. For instance, a package can
  include a tree that's duplicated many times in an environment. If a developer
  needs to make a change, such as swap textures for the tree, it can be updated
  once in the package instead of for each individual instance.
- Packages make **grayboxing** quicker. A package can start with graybox assets,
  and eventually be replaced with final art assets. When assets are replaced,
  they retain all original positions and orientations.

<Alert severity='info'>

If you decide to create an asset kit with a package, it's a good idea to store
all of your asset kits in a single Roblox
[place](../production/publishing/publishing-experiences-and-places.md) built just for
that purpose.

</Alert>

### Graphical Features

Roblox is consistently adding new features to the engine. You can find news of the latest features in the [DevForum Announcements](https://devforum.roblox.com/c/updates/announcements/36) section.

Additionally, Roblox showcase experiences have documentation on how the latest features are
implemented. For instance, [Beyond the Dark
Showcase](/resources/beyond-the-dark) and [The Mystery of Duvall Drive](../resources/the-mystery-of-duvall-drive/index.md) outline best practices such as asset packages, modular building, and more.

<img src="../assets/resources/beyond-the-dark/building-architecture/Architecture-Overview.jpeg" />

## Using Plugins

Many developers use plugins or third-party integrations to assist in building
processes and managing their projects, some examples of which are outlined here.

<Alert severity='info'>

Please note that these third-party plugins are developed by the community and
not by Roblox, and their inclusion below should not be considered as an
endorsement or recommendation by Roblox. Roblox does not control these plugins
and cannot and does not guarantee that they are secure or free of errors or
other issues (including harmful components), and Roblox is not to be liable for,
and disclaims all warranties related to, your use of the plugins which is at
your own risk.

</Alert>

### Building Plugins

The following tools are commonly used to create geometry more easily or to help you build environments faster.

- [Brush Tool](https://www.roblox.com/library/2268520847/Brushtool-2-1) &mdash; Allows developers to "paint" sets of objects to create relative elements like forests or ground cover.

- [Resize Align by Stravant](https://www.roblox.com/library/165534573/Stravant-ResizeAlign) &mdash; Resizes objects so they align with another object. Great for structural and architectural work, such as making walls, hallways, and ceiling.

- [Reflect by Stravant](https://www.roblox.com/library/217792838/Stravant-Model-Reflect) &mdash; Reflects models over a chosen plane.

- [Archimedes by Scriptos](https://www.roblox.com/library/144938633/Archimedes-v3-1-7) &mdash; Creates arches or circular structures using parts.

- [Sun Position Plugin](https://www.roblox.com/library/979015838/Sun-Position-Plugin) &mdash; Sets the sun position by clicking on the skybox.

- [Terrain Save and Load](https://www.roblox.com/library/148042198/Terrain-Save-and-Load) &mdash; Copies and pastes terrain from one place to another.

### Efficiency Plugins

These tools are commonly used to facilitate managing larger environments through speeding up some frequent processes, such as finding and selecting parts.

- [Selection Plugin](https://www.roblox.com/library/143326409/Selection-Plugin) &mdash; Allows for the selection of multiple objects with the same name in the Explorer or Game Editor view.

- [Part Picker](https://www.roblox.com/library/2666837095/PartPicker) &mdash; Picks all parts that meet a search criteria. For example, all models with a specific mesh ID, or all parts with the concrete material.

- [Power Selectors](https://www.roblox.com/library/7707654204/Power-Selectors) &mdash; Makes selecting parts much quicker and easier. Select parts using circles or rectangles. Parts can be selected even if they're in models or folders.

- [Particle Emitter Emit()](https://www.roblox.com/library/303835976/ParticleEmitter-Emit-n-V2) &mdash; When a particle emitter is selected, this displays a button that emits particles. Useful for testing particle bursts.

### Performance Tools

The following tools are used by some builders to test and manage performance considerations.

- [Mesh Optimization Tools](https://www.roblox.com/library/414923656/Mesh-Optimization-Tools) &mdash; A plugin that provides some helpful tools for optimizing the geometry and physics of TriangleMeshPart objects (MeshPart/UnionOperation). It also visualizes collision volumes.

- [Render Settings Plugin](https://www.roblox.com/library/393398335/Render-Settings-Plugin) &mdash; Makes it quicker to edit Studio and Client quality levels to simulate different settings seen as an end-user on different devices.

### Project Management

[Rojo](https://rojo.space/) is beneficial if your team wishes to use external version control systems like Git and code editors like Visual Studio Code or Sublime Text.
