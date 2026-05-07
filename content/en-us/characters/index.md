---
title: Characters
description: Characters are interactive models that interact with the world or other users.
---

**Characters** typically refer to any `Class.Model` objects that interact with the world or other users. While a character can be as simple as a glowing sphere that communicates and interacts with players, characters are often human-like models with additional means of expression to encourage immersion and realism.

Characters range between **basic** characters, such as simple non-player characters (NPCs), or **avatar** characters, which are user-controlled models that include advanced features for movement, animation, and cosmetics.

All Roblox users are associated with an account-based avatar character. Along with this avatar character, Roblox represents users as [players](../players/index.md) in the data model, giving creators access to additional character customization properties, social features, and relevant gameplay and account information.

## Basic characters

Basic characters are often used as NPCs, and they typically perform one or two simple tasks. A common component of basic characters include a display name, health, and basic movement.

You can use the following components within your `Class.Model` object to enable these basic features:

- A group of parts, or [assembly](../physics/assemblies.md), that includes the following:
  - A collection with the name `HumanoidRootPart` to indicate the root part of the assembly.
  - A part with the name `Head` to display the character's name over their head geometry.
  - Additional mesh parts that make up the individual body parts, which commonly include the 6 (R6) or 15 (R15) body parts used for human-like models.
  - Joints, such as `Class.Bone` or `Class.Motor6D`, that connects each body part as an assembly.
- A `Class.Humanoid` instance to implement and access common character properties.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/avatar/character-customization/R6-Example.jpg" width = "70%" />
    <figcaption>Basic Character Example (R6)</figcaption>
  </figure>
  <figure>
    <img src="../assets/avatar/character-customization/Basic-Character-Model-Data.png" />
    <figcaption>Data Model</figcaption>
  </figure>
</GridContainer>

With these components, the character model displays a `Class.Humanoid.DisplayName`, has health, and can move with `Class.Humanoid.Move()`. For more information on additional configurations of the display and health elements, see [Name/health display](../characters/name-health-display.md).

<Alert severity = 'info'>
For information on implementing layered clothing on a non-R15 character model, see [Character appearance](./appearance.md#layered-clothing-on-non-r15).
</Alert>

## Avatar characters

Avatar characters use a standardized set of character components that allow you to use body and facial animations, and equip clothing and accessories. By standardizing the components, all avatar character models can access these features, whether they are controlled by a player or an NPC.

By default, all players join experiences as their saved Roblox avatar, which already includes all the components for an avatar character. A complete avatar character has the following components in their `Class.Model`:

- An [assembly](../physics/assemblies.md) of `Class.MeshPart` objects, that includes the following:
  - A part with the name `HumanoidRootPart` to indicate the root part of the assembly.
  - A part with the name `Head` to display the character's [name and health](./name-health-display.md) over their head geometry.
  - 15 meshes that make up the individual body parts, such as the character's arm or leg.
  - Joints, such as `Class.Bone` or `Class.Motor6D` objects, that connect each part and follow a [standardized](../art/characters/specifications.md#rigging) joint hierarchy.
- A `Class.Humanoid` instance to implement and access common character properties.
- `Class.WrapLayer` objects for each of the model's body parts, enabling it to wear clothing and other layerable cosmetics.
- `Class.FaceControls` to enable facial expressions and poses for the character's head.
- `Class.Attachment` objects for each of the standard attachment points on the character body.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/avatar/character-customization/R15-Diagram.jpg" />
    <figcaption>Avatar Character Example (R15)</figcaption>
  </figure>
  <figure>
    <img src="../assets/avatar/character-customization/Avatar-Character-Model-Data.png" />
    <figcaption>Data Model</figcaption>
  </figure>
</GridContainer>

Standard avatar character rigs require 15 poseable joints, and higher-fidelity character rigs support up to 37 additional joints for a greater level of realism with articulated hands, shoulders, and spine movements. For more information on higher-fidelity rigs, their specific bone hierarchy and naming conventions, and how to animate them with `Class.HumanoidRigDescription` and `Class.DigitsRigDescription` objects, see [Character specifications - Higher-fidelity rigs](../art/characters/specifications.md#higher-fidelity-rigs).

<Alert severity="info">
If you are creating your own custom avatar character, you must configure your character model's components in a third-party modeling tool like Blender or Maya before importing the model into Studio. See [Avatars](../art/characters/index.md) for information regarding the creation of avatar components, creation guides, and Marketplace information.
</Alert>

## Character Controller Library

The [Character Controller Library](./character-controller-library/index.md) (CCL) is a modular framework for building out character movement and behaviors through attributes and Luau scripts. This architecture replaces rigid state machines with a flexible, ability‑driven system for character mechanics.
