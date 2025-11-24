---
title: Emotes
description: All Roblox users are represented by an avatar character which can be customized with body parts, accessories, and clothes from the Marketplace or within experiences.
---

**Emotes** are short animations that an avatar performs, making it easier to communicate and celebrate with others, enhancing the experience to feel more social and more lively.

Creators sell their own emotes, such as gestures, reactions, dances, and more, by publishing their animation to sell on the Marketplace or within experiences.

<Alert severity = 'info'>
Developers can access and modify emotes within their own experiences. For more information, see [character emotes](../../characters/emotes.md).
</Alert>

## Components of an emote

Emotes are made up of an `Class.Animation` object with the unique `Class.Animation.AnimationId` property set to the asset ID of your animation sequence.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/avatar/avatar-emotes/Animation-Explorer.png" />
    <figcaption><center>`Animation` object in the Explorer.</center></figcaption>

  </figure>
  <figure>
    <img src="../../assets/avatar/avatar-emotes/Animation-Properties.png" />
    <figcaption><center>`AnimationId` property in the Properties window.</center></figcaption>
  </figure>
</GridContainer>

Emotes must meet [technical specifications](./specifications.md) as well as [Marketplace](../../marketplace/marketplace-policy.md) and [Community](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards) policies.

## Creation process

There are several ways to create an animation both in Studio or using a third-party tool. See the following table for common workflows and various resources to create your own.

<table><thead>
  <tr>
    <th>Animation workflow</th>
    <th>Description</th>
  </tr></thead>
<tbody>
  <tr>
    <td>Animation Capture</td>
    <td>Use the [Animation Capture (Body)](../../animation/capture.md#body) to convert a video of your emote into a keyframe sequence.</td>
  </tr>
  <tr>
    <td>Manual animation with Animation Editor</td>
    <td>Use the [Animation Editor](../../animation/editor.md) to manually animate a character rig. For an in-depth tutorial on creating a character animation, see [Create character animations](../../tutorials/use-case-tutorials/animation/create-an-animation.md).</td>
  </tr>
  <tr>
    <td>Third-party plug-ins</td>
    <td>Use a third-party animation plugin, such as [Moon Animator](https://create.roblox.com/store/asset/4725618216/Moon-Animator-2), to generate your animation.</td>
  </tr>
</tbody>
</table>

To convert your keyframe sequence into an animation and upload to the Marketplace, see [import and configure emotes](../emotes/import.md#configure).
