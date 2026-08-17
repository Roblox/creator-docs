---
title: Characters
description: Characters are interactive models that players control or interact with in games.
keywords:
  - R15
  - R15+
  - UGC
  - Bodies
---

**Characters** are the figures that players control or interact with, and they help drive the game forward, provide challenges, and make the world feel alive. On Roblox, a character is any `Class.Model`, humanoid or otherwise, that moves, communicates, and interacts with the environment. They can be as simple as a glowing orb that offers key information for a quest or as rich as a fully rigged dragon with facial animations that can attach rigid and layered accessories.

The platform supports a spectrum of character types you can build for your game's specific design requirements, such as lightweight non-player characters for ambient life, standardized avatar characters with built-in functionality to wear cosmetics and play animations, or custom rigs that can access universal animation libraries. Let's explore your options.

## Types

Broadly speaking, there are two main types of characters: **player characters** and **non-player characters**. While both types of characters can look the same visually, their internal configurations can vary significantly according to what each character needs to do in your game.

### Player characters

Player characters are characters that the player controls to play a game. While some game developers create custom player characters from scratch that match their game design aesthetics, many choose to allow players to keep their [platform avatar](../avatar/index.md) as their player character.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/characters/overview/bird-example.png" alt="" />
    <figcaption>In [BIRD](https://www.roblox.com/games/3633505977/BIRD), all players join the game as a custom bird character.</figcaption>
  </figure>
  <figure>
    <img src="../assets/avatar/AvatarSample.png" alt="" width="89%"/>
    <figcaption>In [The Mystery of Duvall Drive](https://www.roblox.com/games/7902470429/The-Mystery-of-Duvall-Drive), all players join the game as their avatar.</figcaption>
  </figure>
</GridContainer>

For players, avatars are deeply personal because they symbolize one's digital identity, uniquely crafted by individual purchases on the [Marketplace](https://www.roblox.com/catalog) and in games, or from giveaways. For game developers, avatars offer a standardized, feature-complete character that unlocks platform compatibility for:

- Body and facial animations.
- Rigid accessories, layered accessories, classic clothing, and makeup assets.
- Core character behavior and properties, like a display name, health bar, and basic movement states.

Avatars are able to offer this functionality because they must include the following system of components in order for creators to upload them to the Marketplace:

<table>
  <thead>
    <tr>
    <th><b>Component</b></th>
    <th><b>Functionality</b></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>15 `Class.MeshPart` body parts with standardized naming conventions</td>
      <td>Consistent amount of limbs for each character with a uniform partition for accessories, cosmetics, and animations.</td>
    </tr>
    <tr>
      <td>Rigging armature with standardized naming conventions and a joint hierarchy</td>
      <td>Consistent amount of poseable joints for animation support. There are 15 required poseable joints, but you can add up to 37 additional joints for [higher-fidelity rigs](../avatar/character-bodies/specifications.md#higher-fidelity-rigs).</td>
    </tr>
    <tr>
      <td>`Class.Humanoid` object</td>
      <td>Consistent character behavior and properties, such as:<br /><ul><li>Displaying the character's name and health above their `Head` body part.</li><li>Equipping items in the 3D space.</li><li>Accessing movement states like walking, jumping, and swimming.</li></ul></td>
    </tr>
    <tr>
      <td>`Class.FaceControls` object with at least 17 standardized facial base poses</td>
      <td>Consistent facial expressions.</td>
    </tr>
    <tr>
      <td>15 `Class.WrapTarget` objects</td>
      <td>Consistent deformation targets for layered accessories that stretch, fit, and layer on the character's body.</td>
    </tr>
    <tr>
      <td>19 `Class.Attachment` points</td>
      <td>Consistent targets for rigid accessories and in-game equipable objects to attach to the character's body.</td>
    </tr>
  </tbody>
</table>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>What are higher-fidelity rigs?</Typography>
</AccordionSummary>
<AccordionDetails>
Standard avatar rigs, often referred to as R15 rigs, require 15 poseable joints to articulate the character's 15 body parts. However, if you want to create higher-fidelity rigs with a greater level of realism, there are up to 37 additional optional joints you can create for articulated hands, shoulders, and spine movements.

These optional joints include:

- **Spine**: `Spine` and `Chest` subdivisions
- **Clavicles**: `LeftClavicle` and `RightClavicle` for shoulder articulation
- **Head**: `HeadBase` parented under the `Head` body part for neck and facial articulation
- **Fingers**: Up to 15 joints per hand (3 phalanges × 5 fingers)
- **Toes**: `LeftToeBase` and `RightToeBase` for foot articulation

For more information, see [Body specifications - Higher-fidelity rigs](../avatar/character-bodies/specifications.md#higher-fidelity-rigs).
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>What is `AvatarJointUpgrade`?</Typography>
</AccordionSummary>
<AccordionDetails>
When you enable `Class.StarterPlayer.AvatarJointUpgrade`, the upgrade automatically introduces force- and torque-limited `Class.AnimationConstraint` objects to every character's joints, replacing `Class.Motor6D` objects. This allows you to create realistic, physics-driven movements and interactions, such as fully simulated limbs and powered ragdolls.
</AccordionDetails>
</BaseAccordion>

### Non-player characters

Non-player characters (NPCs) are characters that systems within the game control to support or challenge the player, such as allies or enemies, or otherwise fill the environment to make it feel immersive. Unlike player characters that require a wide variety of attributes and functionality to complete game objectives, non-player characters often only need to perform one or two simple tasks, such as walking a path, taking damage, or reacting to the player's actions.

<figure>
<center><img src="../assets/characters/overview/npc-example.png" alt="" width="65%"/></center>
<figcaption>In [Mansion of Wonder](https://www.roblox.com/games/6901029464/Mansion-of-Wonder), players can interact with a fox NPC to acquire prizes and a rock creature to teleport to the main gameplay area.</figcaption>
</figure>

Because they don't require the same component set, rigging armature, or feature depth of player characters, the most basic non-player characters only need a `Class.Model` with geometry and some scripts to fulfill their purpose for your game design requirements. In fact, many game developers opt to create their NPCs as a `Class.Model` with only a child mesh or two and a `Class.Humanoid` object to implement and access basic character behavior and properties.

## Creation tools

The tools and process you use to create your characters can look different depending on the type and complexity of each character you're creating, but in general, many game developers get started by creating at least a raw mesh in a third-party modeling tool for the character's body. The following are examples of popular third-party software that creators commonly use to create custom character bodies, as well as textures, rigging armatures, accessories, and animations.

<table>
<tbody>
  <tr>
    <td width="33%"><center><img src="../assets/landing/blender-logo.png" width="100%" alt="" /></center></td>
    <td width="33%"><center><img src="../assets/landing/maya-logo.png" width="55%" alt="" /></center></td>
    <td width="33%"><center><img src="../assets/landing/gimp-logo.png" width="80%" alt="" /></center></td>
  </tr>
  <tr>
    <td width="33%">[Blender](https://www.blender.org/) is a free, open-source 3D creation suite with a broad range of modeling, sculpting, texturing, rigging, and animation tools.</td>
    <td width="33%">[Autodesk Maya](https://www.autodesk.com/products/maya/overview) is a subscription-based industry standard professional toolset that covers the entire 3D production pipeline.</td>
    <td width="33%">[GNU Image Manipulation Program](https://www.gimp.org/) (GIMP) is a free, open-source image editor that supports 2D asset creation.</td>
  </tr>
</tbody>
</table>

Once you have the basis of your character, you can [import](../studio/importer.md) your creations into Studio and access all first-party tooling that Roblox has to offer, including a full pipeline to convert a raw mesh to a character that also meets platform policies and technical standards to be ready for the Marketplace. The following details all major tools you can use to create, configure, and test character assets for game developers of all skill levels.

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>Supporting features</Typography>
</AccordionSummary>
<AccordionDetails>
The following features provide support for different stages of the character creation process:

<table>
  <thead>
    <tr>
    <th><b>Tool</b></th>
    <th><b>Description</b></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>[Avatar Settings](../studio/avatar-settings.md)</td>
      <td>Enable global game-level avatar behavior, collision, animation packs, and Character Controller Library toggles.</td>
    </tr>
    <tr>
      <td>[Importer](../studio/importer.md)</td>
      <td>Import your custom meshes with PBR textures, rigging, skinning, and animation data for your characters.</td>
    </tr>
    <tr>
      <td>[Animation Editor](../animation/editor.md)</td>
      <td>Import, design, and publish animations for your characters, such as gestures and reactions.</td>
    </tr>
    <tr>
      <td>[Accessory Fitting Tool](../avatar/accessory-fitting-tool.md)</td>
      <td>Test your custom models on multiple combinations of character bodies, animations, and accessories.</td>
    </tr>
    <tr>
      <td>[Automatic Skinning Transfer](../avatar/automatic-skinning-transfer.md)</td>
      <td>Transfer or generate skinning data to your layered and facial accessories so that they deform along the character body they're attached to.</td>
    </tr>
  </tbody>
</table>
</AccordionDetails>
</BaseAccordion>

### Avatar Setup

[Avatar Setup](../avatar-setup/index.md) is the fastest path from a raw mesh to a player character as it automatically processes custom models into avatar character assets. If your characters don't have all of the components they need to move, animate, and wear accessories, Avatar Setup can generate all missing components, such as:

- **Partitions** - Separates the character's body into the standard 15 body parts.
- **Rigging data** - Adds a standard or higher-fidelity rigging armature to your character's body to enable movement and animation.
- **Skinning data** - Adds weights and influences to various surfaces of your character's body, ensuring an organic and natural flexibility during movement.
- **Facial animations** - Generates the FACS poses, facial rigging, skinning, and animation data required for facial animations.
- **Cages** - Adds the required inner and outer cages to your character's body parts so that it can wear layered accessories.
- **Attachment points** - Adds the appropriate attachment points to your character's body so that it can wear rigid accessories.

For game developers seeking to upload their characters to the Marketplace, Avatar Setup collapses what used to be a multi-tool, multi-iteration workflow into a single pass:

<img src="../assets/characters/overview/avatar-setup-workflow.png" width="100%" alt="" />

<img src="../assets/characters/overview/Avatar-Setup-Example.png" width="50%" alt="" />

<Alert severity="info">
For information on configuration standards to ensure all Avatar Setup features work as expected, see [Avatar Setup specifications](../avatar-setup/auto-setup-requirements.md).
</Alert>

### Adaptive Animation

[Adaptive Animation](../characters/adaptive-animation.md) solves a difficult problem: how to make one animation library work across significantly different body types. Using `Class.HumanoidRigDescription` and `Class.DigitsRigDescription` objects, Adaptive Animation lets you map your character's joints to Roblox's [standardized rigging armature specifications](../avatar/character-bodies/specifications.md#rigging). This works bidirectionally:

- **Avatar requirements > Custom rig** - Your custom rigs can instantly use the full animation library of emotes and movement states.
- **Custom rig > Avatar requirements** - The animations you create on your custom rigs can instantly retarget to avatars with standard rigging armatures.

This also applies to hands and fingers in higher-fidelity rigs; when you assign your character's hand joints using the Adaptive Animation system, finger animations for one hand's proportions instantly adapt to different hand geometries.

<img src="../assets/avatar/adaptive-animation/Assign-Joints-A.png" width="50%" alt="" />

### Animation Graph Editor

[Animation Graph Editor](../animation/graph-editor.md) is a visual, node-based tool that composes individual animation clips into runtime logic without the need to handwrite animation controller scripts. You can build blend trees, state machines, and parametrized animation behavior for your characters while still being able to access animation graph nodes programmatically for direct control.

<img src="../assets/animation/graph-editor/Connect-To-Add.png" width="50%" alt="" />

## Character optimization

As your games grow with more players, expansive environments, and rich animations, your character systems require architecture to support optimization. There are two systems that address this directly: the Character Controller Library for character movement and behavior, and SLIM for rendering performance.

### Character Controller Library

The default `Class.Humanoid` object inside of player characters offers a state machine that functions, but it is rigid. It contains hard-coded states that you can only trigger one at a time with fixed transition logic, it's difficult to compose, and it's hard to configure at scale.

To address these challenges, the [Character Controller Library](../characters/character-controller-library/index.md) (CCL) offers a replacement with an ability-driven architecture:

- **Abilities** dynamically determine what a character can do, such as run, jump, climb, and swim.
- **Controllers** dynamically handle how that character's movement is simulated, such as ground friction, acceleration curves, and realistic conservation of linear and angular momentum when characters jump.

When you opt in to CCL in [Avatar Settings](../studio/avatar-settings.md), you can experiment with ability configurations as your game is running and modify specific controllers to adjust the physical simulation of the character and its interaction with the environment, such as the character's base movement speed.

<img src="../assets/studio/general/Avatar-Settings-CCL.png" width="50%" alt="Character Controller Library toggle in the Avatar Settings window" />

### SLIM for rendering

Characters can be expensive to render, especially for high-resolution characters with layered accessories and physically based rendering (PBR) textures. For games that include many models and characters, such as a lively town full of NPCs, buildings, props, and vehicles, players can experience low frame rates and poor performance.

To address these challenges for rendering performance, [Scalable Lightweight Interactive Models](../workspace/streaming/slim.md) (SLIM) offers an automatic optimization system to generate lightweight, optimized representations of avatar characters and models using cloud-based transcoding. At runtime, the engine selects the best representation based on distance, device capability, and streaming state.

<GridContainer numColumns="2">
	<figure>
		<img src="../assets/optimization/streaming/SLIM-Disabled.jpg" />
		<figcaption>Without SLIM — streamed-out models are invisible</figcaption>
	</figure>
	<figure>
		<img src="../assets/optimization/streaming/SLIM-Enabled.jpg" />
		<figcaption>With SLIM — optimized stand-ins remain visible</figcaption>
	</figure>
</GridContainer>

SLIM provides three key benefits:

- **Visual quality** - Distant models appear more detailed than the legacy model level‑of‑detail system, maintaining closer fidelity to the original.
- **Consistent transitions** - All parts within a model switch detail levels simultaneously, eliminating jarring per-part transitions.
- **Performance** - Composite meshes dramatically reduce draw calls, triangle counts, and memory usage, enabling richer scenes across all device tiers.

In addition, when you configure SLIM for avatar characters, the engine:

- Renders a SLIM version when an actual avatar model streams out.
- Swaps between SLIM and full-resolution representations based on available resources, even inside the streaming radius.
- Throttles SLIM animations based on scene importance and available bandwidth.

<Tabs>
<TabItem label="Audience in Far Distance">
<GridContainer numColumns="2">
	<figure>
		<img src="../assets/optimization/streaming/SLIM-Avatars-Enabled-Far.jpg" />
		<Alert severity="success" variant="outlined">
		<AlertTitle>SLIM Enabled</AlertTitle>
		<Chip label="~170,000 triangles" size="medium" variant="outlined" color="success" style={{marginTop: '10px'}} /><br />
		<Chip label="~4,000 client instances" size="medium" variant="outlined" color="success" style={{marginTop: '4px'}} />
		</Alert>
	</figure>
	<figure>
		<img src="../assets/optimization/streaming/SLIM-Avatars-Disabled-Far.jpg" />
		<Alert severity="error" variant="outlined">
		<AlertTitle>SLIM Disabled</AlertTitle>
		<Chip label="~2,600,000 triangles" size="medium" variant="outlined" color="error" style={{marginTop: '10px'}} /><br />
		<Chip label="~60,000 client instances" size="medium" variant="outlined" color="error" style={{marginTop: '4px'}} />
		</Alert>
	</figure>
</GridContainer>
</TabItem>
<TabItem label="Audience in Near Proximity">
<GridContainer numColumns="2">
	<figure>
		<img src="../assets/optimization/streaming/SLIM-Avatars-Enabled-Near.jpg" />
		<Alert severity="success" variant="outlined">
		<AlertTitle>SLIM Enabled</AlertTitle>
		<Chip label="~100,000 triangles" size="medium" variant="outlined" color="success" style={{marginTop: '10px'}} /><br />
		<Chip label="~31,000 client instances" size="medium" variant="outlined" color="success" style={{marginTop: '4px'}} />
		</Alert>
	</figure>
	<figure>
		<img src="../assets/optimization/streaming/SLIM-Avatars-Disabled-Near.jpg" />
		<Alert severity="error" variant="outlined">
		<AlertTitle>SLIM Disabled</AlertTitle>
		<Chip label="~670,000 triangles" size="medium" variant="outlined" color="error" style={{marginTop: '10px'}} /><br />
		<Chip label="~60,000 client instances" size="medium" variant="outlined" color="error" style={{marginTop: '4px'}} />
		</Alert>
	</figure>
</GridContainer>
</TabItem>
</Tabs><br />

<Alert severity="info">
SLIM requires you to enable [instance streaming](../workspace/streaming/index.md), which allows the Roblox engine to dynamically load and unload 3D content and related instances in the `Class.Workspace`.
</Alert>
