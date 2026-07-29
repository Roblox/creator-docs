---
title: Emotes
description: Emotes are full body animations that an avatar character can perform to communicate and celebrate with others in games.
---

**Emotes** are full body animations that an avatar character can perform to communicate and celebrate with others in a game, such as gestures, reactions, and dances. While Roblox provides a set of default emotes for each avatar on the platform, you can create and sell your own emotes on the Marketplace or within games.

<Alert severity = 'info'>
Game developers can access and modify emotes within their games. For more information on this process, see [character emotes](../../characters/emotes.md).
</Alert>

## Components

Emotes are made up of an `Class.Animation` object with the unique `Class.Animation.AnimationId|AnimationId` property set to the asset ID of your animation sequence.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/avatar/avatar-emotes/Animation-Explorer.png" />
    <figcaption><center>`Animation` object in the Explorer window.</center></figcaption>

  </figure>
  <figure>
    <img src="../../assets/avatar/avatar-emotes/Animation-Properties.png" />
    <figcaption><center>`AnimationId` property in the Properties window.</center></figcaption>
  </figure>
</GridContainer>

All emotes must meet Roblox's technical [emote specifications](./specifications.md), [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards), and [Marketplace policies](../../marketplace/marketplace-policy.md).

## Create emotes

There are several ways you can create emotes using either Studio or a third-party animation tool. Review the following table for specific workflows and resources:

<table><thead>
  <tr>
    <th>Animation workflow</th>
    <th>Description</th>
  </tr></thead>
<tbody>
  <tr>
    <td>Animation Capture</td>
    <td>Use Studio's [Animation Capture](../../animation/capture.md#body) tool to convert a full body video into a keyframe sequence for your emote.</td>
  </tr>
  <tr>
    <td>Manual animation with Animation Editor</td>
    <td>Use Studio's [Animation Editor](../../animation/editor.md) to manually animate a character rig. For an in-depth tutorial on creating a character animation, see [Create character animations](../../tutorials/use-case-tutorials/animation/create-an-animation.md).</td>
  </tr>
  <tr>
    <td>Third-party plug-ins</td>
    <td>Use a third-party animation plugin, such as [Moon Animator](https://create.roblox.com/store/asset/4725618216/Moon-Animator-2), to generate your animation.</td>
  </tr>
</tbody>
</table>

To convert your keyframe sequence into an animation that you can upload to the Marketplace, see [Import emotes - Generate asset ID](./import.md#generate-asset-id).
