---
title: Characters
description: Characters are interactive models that interact with the world or other users.
---

**Characters** typically refer to any `Class.Model` objects that interact with the world or other users. While a character can be as simple as a glowing sphere that communicates and interacts with users, characters are often human-like models with additional means of expression to encourage immersion and realism.

All Roblox users are associated with an account-based avatar character. Along with this avatar character, Roblox represents users as [players](../players/index.md) in the data model, giving developers access to additional character customization properties, social features, and relevant gameplay and account information.

<Grid container spacing={0}>
	<Grid item XSmall={12} Small={12} Medium={12} Large={4} XLarge={4}>
	  <figure>
		<img src="../assets/avatar/character-customization/Platform-Avatar.png" />
		<figcaption>Platform avatar</figcaption>
		</figure>
	</Grid>
	<Grid item XSmall={12} Small={12} Medium={12} Large={8} XLarge={8}>
	  <figure>
		<img src="../assets/avatar/character-customization/In-Experience-Avatar.jpg" />
		<figcaption>Avatar in an experience</figcaption>
		</figure>
	</Grid>
</Grid>

## Avatar characters

Avatar characters use a standardized set of character components that allow you to use body and facial animations, and equip clothing and accessories. By standardizing the components, all avatar character models can access these features, whether they are controlled by a player or an NPC.

By default, all users join experiences as their saved Roblox avatar, which already includes all the components for an avatar character. A complete avatar character has the following components in their `Class.Model`:

- An [assembly](../physics/assemblies.md) of `Class.MeshPart` objects, that includes the following:
  - A part with the name `HumanoidRootPart` to indicate the root part of the assembly.
  - A part with the name `Head` to display [name/health](./name-health-display.md) over.
  - Additional parts that make up the cosmetic individual body parts, including the standard 15 body parts used for R15 human-like models.
  - Joints and constraints such as `Class.Bone|Bones` and `Class.AnimationConstraint|AnimationConstraints` that connect each part and follow a standard joint hierarchy.
- A `Class.Humanoid` instance to implement and access common character properties.
- `Class.WrapLayer` objects for each of the model's body parts, enabling it to wear clothing and other layerable cosmetics.
- `Class.FaceControls` to enable facial expressions and poses for the character's head.
- `Class.Attachment` objects for each of the standard attachment points on the character body.

<Grid container spacing={3}>
	<Grid item>
	  <figure>
		<img src="../assets/avatar/character-customization/R15-Diagram.jpg" width="520" />
		<figcaption>R15 avatar character</figcaption>
		</figure>
	</Grid>
	<Grid item>
	  <figure>
		<img src="../assets/avatar/character-customization/R15-DataModel.png" width="320" />
		<figcaption>Character `Class.DataModel`</figcaption>
		</figure>
	</Grid>
</Grid>

<Alert severity="success">
For information on modifying and customizing existing characters in your experience, see [character appearance](../characters/appearance.md). Also see [Character Controller Library](./character-controller-library/index.md), a modular framework for building out character movement and behaviors.
</Alert>

<Alert severity="info">
If you are creating your own custom avatar character, you must configure your character model's components in a third-party modeling tool like Blender or Maya before importing the model into Studio. See [avatar characters](../art/characters/index.md) for information regarding the creation of avatar components, creation guides, and marketplace information.
</Alert>

## Character Controller Library

The [Character Controller Library](./character-controller-library/index.md) (CCL) is a modular framework for building out character movement and behaviors through attributes and Luau scripts. This architecture replaces rigid state machines with a flexible, ability‑driven system for character mechanics.
