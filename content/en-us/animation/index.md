---
title: Animation in Roblox
description: An overview of all animation tools in Roblox Studio.
---

**Animation** is the process of applying motion to your characters, objects, and environments to create an engaging and dynamic experience. While there are many ways to make objects move and interact, animation in Roblox typically refers to customizing an expressive movement of a specific character, or group of parts, using the **Animation Editor** or **animation-related APIs**.

Animation can apply to any Roblox part or group of parts. Different types of objects can utilize various animation features. The following are the general categories of animatable objects:

- **Simple objects**, such as a basic part, can only animate changes across the part's single position or rotation property.
- **Rigs**, or parts connected by joints like `Class.Bone` or `Class.Motor6D`, can articulate positional and rotational movement between their joints, like elbows and wrists. Rigged models can take advantage of animation features like [inverse kinematics](#inverse-kinematics) to quickly and programmatically apply movement in response to environments and events.
- **R15 rigs**, rigs that incorporate the standardized [avatar character model](../characters/index.md#avatar-character-components), can use animations from Roblox's character animation library and other movement features, even if it's a player or non-player character model.

## Animation Editor

The [Animation Editor](../animation/editor.md) allows you to design and publish custom animations on rigs. You can move the joints that connect individual sections of a rig to create poses, and the **Animation Editor** smoothly animates the rig from pose-to-pose. As long as all moving parts are connected with `Class.Motor6D` objects, you can use the editor for both human and non-human rigs.

<video src="../assets/animation/inverse-kinematics/IK-Body-Part.mp4" controls width="80%"></video>

When creating animations, Studio provides the following features to animate effectively:

- Instantly create face and body animations through the [Animation Capture](../animation/capture.md) tool.

- Switch to the [Curve Editor](../animation/curve-editor.md) to access the curve-based animation UI and more control over your animation tracks.

- Make realistic animations by posing and animating `Class.Bone|Bones` of a [rigged mesh](../art/modeling/rigging.md).

## Inverse kinematics

You can use [inverse kinematics](../animation/inverse-kinematics.md) APIs to automatically create animations and poses based on environmental and external events. With inverse kinematics, you can procedurally generate various animation events, such as having a character's head track a bird flying in the sky, or making a character's arm automatically reach for a door knob when nearby.

## Animation events

An [animation event](../animation/events.md) is a specific point in an animation that triggers an action. You can define animation event markers across the **Animation Editor** timeline span, then use `Class.AnimationTrack:GetMarkerReachedSignal()` to detect those markers as the animation runs to perform specific actions, such as playing a sound effect whenever the user's foot touches the ground.
