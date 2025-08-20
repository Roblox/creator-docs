---
title: Characters
description: Characters are interactive models that interact with the world or other users.
---

**Characters** typically refer to any `Class.Model` objects that interact with the world or other users. While a character can be as simple as a glowing sphere that communicates and interacts with users, characters are often human-like models with additional means of expression to encourage immersion and realism.

Characters can range between **basic** characters, such as a simple non-player character (NPC), or **avatar** characters, which are user-controlled models that include advanced features for movement, animation, and cosmetics.

All Roblox users are associated with an account-based avatar character. Along with this avatar character, Roblox represents users as **players** in the data model, giving developers access to additional character customization properties, social features, and relevant gameplay and account information. For more information on account specific player features, see [Players](../players/index.md).

## Basic characters

Basic characters are often used as NPCs and typically perform one or two simple tasks. A common component of basic characters include a display name, health, and basic movement.

You can use the following components within your `Class.Model` object to enable these basic features:

- A group of parts, or [assembly](../physics/assemblies.md), that includes the following:
  - A collection with the name `HumanoidRootPart` to indicate the root part of the assembly.
  - A part with the name `Head` to display a display name over.
  - Additional parts that make up the cosmetic individual body parts, which commonly include the 6 (R6) or 15 (R15) body parts used for human-like models.
  - Joints, such as `Class.Bone` or `Class.Motor6D`, that connects each body part as an assembly.
- A `Class.Humanoid` instance to quickly add common character properties to a model.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/avatar/character-customization/R6-Example.jpg" />
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

By default, all users join experiences as their saved Roblox avatar, which already includes all the components for an avatar character. A complete avatar character has the following components in their `Class.Model`:

- An [assembly](../physics/assemblies.md) of `Class.MeshPart` objects, that includes the following:
  - A part with the name `HumanoidRootPart` to indicate the root part of the assembly.
  - A part with the name `Head` to display a display name over.
  - Additional parts that make up the cosmetic individual body parts, that must include the standard 15 body parts used for R15 human-like models.
  - Joints, such as `Class.Bone` or `Class.Motor6D`, that connects each part and follows a standard joint hierarchy.
- A `Class.Humanoid` instance to implement and access common character properties.
- `Class.WrapLayer` objects for each of your model's body parts, to enable it to wear clothing and other layerable cosmetics.
- `Class.FaceControls` to enable facial expressions and poses for your character's head.
- `Class.Attachment` objects for each of the standard attachment points on the character body.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/avatar/character-customization/R15-Example.jpg" />
    <figcaption>Avatar Character Example (R15)</figcaption>
  </figure>
  <figure>
    <img src="../assets/avatar/character-customization/Avatar-Character-Model-Data.png" />
    <figcaption>Data Model</figcaption>
  </figure>
</GridContainer>

<Alert severity = 'info'>
If you are creating your own custom avatar character, you must configure your character model's components in a third-party modeling tool like Blender or Maya before importing the model into Studio.

See [Avatars](../art/characters/index.md) for information regarding the creation of avatar components, creation guides, and marketplace information.
</Alert>

For information on modifying and customizing existing characters in your experience, see [Character appearance](../characters/appearance.md).
