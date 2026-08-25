---
title: Emote specifications
description: Emote specifications list the specific technical requirements necessary for Studio compatibility.
---

Emotes are made up of an `Class.Animation` object with the `Class.Animation.AnimationId` property set to the asset ID of your animation sequence. The `Class.Animation` object is the only component required to upload an emote to the Marketplace because animations do not require meshes, textures, or other 3D art components.

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

## Animation requirements

Emotes must meet the following requirements before you upload them to the Marketplace, otherwise they may fail validation:

- Emotes must be less than 10 seconds.
- The joint root of the character cannot move too far from its starting position.
- Movement speed can't exceed a certain threshold to prevent teleportation abuse (measured from a frame-by-frame basis).
- Animation data must reference a [standard R15 rig](../character-bodies/specifications.md#standard-r15-rigs).

   <Alert severity = 'info'>
   Emotes for [advanced R15 rigs](../character-bodies/specifications.md#advanced-r15-rigs) are currently in a closed beta. For more information, see the [DevForum announcement](https://devforum.roblox.com/t/upload-and-publish-for-emotes-with-additional-joints-is-now-open/4710932).
   </Alert>

- Animation must be sourced from a `CurveAnimation`. For information on converting animation data, see [Import emotes - Generate asset ID](./import.md#generate-asset-id).
- Animations must meet Roblox's [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards) and [Marketplace policies](../../marketplace/marketplace-policy.md).
