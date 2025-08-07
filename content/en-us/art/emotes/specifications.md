---
title: Emotes specifications
description: Character specification lists the specific technical requirements for custom characters created outside of Studio.
---

Emotes are made up of an `Class.Animation` object with the `Class.Animation.AnimationId` property set to the asset ID of your animation sequence.

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

Only the `Class.Animation` object is required to upload an emote to the Marketplace. Animations do not require meshes, textures, or other 3D art components.

## Animation requirements

Emotes must also meet the following requirements or may fail validation:

- Emotes must be less than 10 seconds.
- The joint root of the character can not move too far from its starting position.
- Movement speed can't exceed a certain threshold to prevent teleportation abuse (measured from a frame-by-frame basis).
- Animation data must reference an R15 rig.
- Animation must be sourced from a `CurveAnimation`. For information on converting animation data, see [import and configure](./import.md#generate-asset-id).
- Animations must meet [Marketplace](../../marketplace/marketplace-policy.md) and [Community](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards) policies.
