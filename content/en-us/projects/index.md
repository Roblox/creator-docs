---
title: Projects
description: An overview of projects and games in Roblox.
---

A Roblox project is a collection of [places](#places), [assets](#assets), [settings](#settings), and other resources that together represent a **game**. Roblox stores your projects in the cloud for convenient collaboration, editing, and version control. You create and manage projects with [Roblox Studio](../studio/index.md), an all‑in‑one IDE that provides building, scripting, testing, and publishing tools.

## Places

Games on Roblox are made up of individual **places**, comparable to scenes in Unity or maps in Unreal Engine. Each place contains all components for that portion of the game, including its specific environment, parts, meshes, scripts, and user interface.

See the pages for [creating and publishing](../production/publishing/publish-games-and-places.md), [configuring](./configure-games.md), and [updating](./update-games.md) games and places for details.

<figure>
<img src="../assets/publishing/experiences-places-assets/Experience-Hierarchy.png" alt="A game grouping of three individual places with unique environments." width="800" />
</figure>

Every place is represented by a **data model**, a hierarchy of objects that describe everything about the place. The Roblox Engine uses the data model as a source of truth for a place's state, so it can simulate and render it on client devices. For more information on how the engine interprets the data model, see [Client-server runtime](../projects/client-server.md).

Proper, intentional object organization within the data model is essential for
functionality and maintenance of your project. For more information on what
objects are available and how to organize and use them, see
[Data model](../projects/data-model.md).

## Assets

In Roblox, assets such as images, meshes, and audio are stored as **cloud-based assets**, so you don't need to bundle local copies into a saved Studio game. Each asset in the cloud is assigned a unique **asset&nbsp;ID** from which multiple games can utilize them. You can create assets directly in Studio, such as models, or import assets like images, audio, and meshes from other tools.

<GridContainer numColumns="3">
  <figure>
    `rbxassetid://7229442422`
		<img src="../assets/modeling/textures-decals/Texture-Example-Grafitti04.png" alt="A decal asset of a young woman with a button for an eye." width="90%" />
  </figure>
  <figure>
    `rbxassetid://6768917255`
		<img src="../assets/modeling/meshes/Base-Mesh-In-Marketplace.png" alt="An untextured treasure chest MeshPart asset." width="90%" />
  </figure>
	<figure>
    `rbxassetid://9125402735`
		<audio controls><source src="../assets/studio/general/Boom-Impact.mp3" type="audio/mpeg"></source></audio>
  </figure>
</GridContainer>

By default, assets are private to your game and you can use an asset in any place by referencing its ID. You can also distribute them to the community in the [Creator Store](https://create.roblox.com/store/), so others can use them as well.

For more information on how to import and publish assets, see [Assets](../projects/assets/index.md).

## Packages

[Packages](../projects/assets/packages.md) are reusable object hierarchies that you can define and reuse in multiple places across multiple games. For any large project, packages offer the following benefits:

- Packages can be used as asset kits, allowing you to duplicate a set of objects as needed.
- Packages make it easier to update assets. For instance, a package can include a tree that's duplicated many times in an environment. If you need to make a change, such as swap textures for the tree, it can be updated once in the package instead of for each individual instance.
- A package can start with graybox assets, and eventually be replaced with final art assets. When assets are replaced, they retain all original positions and orientations.

## Settings

Game settings are managed from the [Creator Dashboard](https://create.roblox.com/dashboard/creations) or within Studio, including:

- **Basic Info** &mdash; Basic information about the game, such as its name, description, and genre. Much of the information here is used in your game's listing.
- **Communication** &mdash; Settings which enable eligible users to use [voice chat](../chat/voice-chat.md) or animate their avatar via their camera within your game.
- **Permissions** &mdash; Configures who can access your game. New games begin as **private** and can only be edited and joined by you and members of your [group](../projects/groups.md) with the correct permissions. When appropriate, you can [release](../production/publishing/publish-games-and-places.md#make-game-public) the game to the public.
- **Monetization** &mdash; Options for earning revenue from your game, as outlined in [Monetization](../production/monetization/index.md).
- **Localization** &mdash; Configuration for different [languages and regions](../production/localization/index.md).
- **Avatar** &mdash; Settings related to avatars, such as avatar scaling and
  clothing overrides.

## Collaboration

With Studio's **built-in collaboration tools**, team members can contribute to
games independently on their own time, or alongside others. Key features
include:

- Group admins can manage which members have access to collaborate and which do
  not, effectively maintaining proper roles within a large team.
- Collaborators can build alongside other team members in real time and
  automatically see changes made by others.
- Collaborators can independently edit the same scripts that others may be
  editing, test locally, and commit their changes to the cloud-based project
  when ready.

For more information, see [Collaboration](../projects/collaboration.md).

## Testing

Your [team](../projects/groups.md) can instantly test a game on PC, mobile, VR, and other devices you wish to support through the Roblox app; no need to compile builds, deploy to app stores, or await app store approval.

Studio offers a suite of options for testing a game before releasing it to the public:

- **Rapid playtesting** that provides a close simulation of the game
  running on the Roblox application.
- **Multi-client simulation** for comparing how each client "sees" other clients
  within the game.
- **Device emulation** that provides insight on how controls operate on a mobile
  device or how on-screen UI displays on different screens and aspect ratios.
- **Collaborative playtesting** with members of your team.

For more information on each testing option, see [Studio testing modes](../studio/testing-modes.md).
