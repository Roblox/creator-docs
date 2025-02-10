---
title: Facial animation
description: Facial animations enable avatars to create dynamic facial expressions.
---

A head part that supports facial animation is a specialized skinned head `Class.MeshPart`. This type of body part allows you to:

- Set default custom facial expressions.
- Trigger emotes that combine both face and body animations.
- Equip face accessories that deform with your facial expressions. For example, facial hair moves accordingly when the character changes facial expressions.

<video controls width="90%" src="../../../assets/avatar/dynamic-heads/Blocky_And_Goblin_Dynamic_Heads.mp4">
</video>

An animatable head model contains an internal facial [rig](../../../art/modeling/rigging.md), or bone structure, that drives the deformation of the viewable geometry. When creating a dynamic head in a 3D modeling software, modelers save these bone deformations as individual **poses**.

When importing a head that supports facial animation into Studio, Studio creates a `Class.FaceControls` instance you can use to access and combine these individual poses to create expressions and animations. Unlike typical rigged models, you cannot access the facial `Class.Bone|Bones` of a head mesh directly in Studio.

For information on implementing heads in Studio, including information on how to import custom heads and face accessories in addition to a reference experience and example model files, see [Use heads in Studio](../../../art/characters/facial-animation/use-heads-in-studio.md).

<GridContainer numColumns="2">
  <figure>
    <img src="../../../assets/avatar/dynamic-heads/Goblin-Reference.jpg" width="75%" />
    <figcaption>Goblin Reference</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/avatar/dynamic-heads/Blocky-Reference.jpg" width="94%" />
    <figcaption>Blocky Reference</figcaption>
  </figure>
</GridContainer>

## Animate heads

You can [animate any supported head](../../../art/characters/facial-animation/animate-heads.md) through the [Animation Editor](../../../animation/editor.md) by manually setting poses on the animation track, using the **Face Animation Editor** to quickly create complex expressions, or using the [Animation Capture Tool](../../../animation/capture.md) to automatically track facial movements from your webcam.

After you create, save, and publish a head animation to Roblox, you can play the animation from a script or replace a character's default animation with your new animation.

<video controls width="80%" src="../../../assets/avatar/dynamic-heads/animating-dynamic-heads/videos/2-Face-Controls-Example-Goblin.mp4">
</video>

## Create basic heads

Using third-party modeling tools, you can either modify a rigged character model to meet head requirements, or create a head from scratch. For step-by-step instructions on how to add face bones, apply skinning, posing, and mapping poses on a head model in Blender, see [Create basic heads](../../../art/characters/facial-animation/create-basic-heads.md). This guide includes several reference files you can use to compare and track your progress.

## Create face accessories

Similar to creating heads, you can design and model face accessories using a third-party modeling software and import the models as a cosmetic `Class.Accessory` in Studio. When created correctly, equipped accessories stretch and deform as the head animates and emotes.

See [Create face accessories](../../../art/characters/facial-animation/create-face-accessories.md) for step-by-step instructions on setting up a reference model as a face accessory. This guide includes several project files you can use for reference and covers details on time-saving steps, such as auto-skin transfer.

## FACS poses reference

Animatable heads use the Facial Action Coding System (FACS) as a universal system that allows modelers and animators to reference similar facial features and head mesh across different head models.

When creating your head in a third-party modeling software, see [FACS poses reference](../../../art/characters/facial-animation/facs-poses-reference.md) for a list of the base facial poses, their descriptions, and video examples.
