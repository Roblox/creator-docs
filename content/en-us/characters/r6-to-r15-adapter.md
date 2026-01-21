---
title: R6 to R15 Adapter
description: The R6 to R15 adapter enables R15 avatar characters to join your R6 experience.
---

<Alert severity = 'warning'>
This feature is only applicable to developers who manage an active experience with **R6** avatar characters enabled.
</Alert>

The **R6 to R15 Adapter** allows R15 avatars to join your R6 experience. All avatars in the experience will still use the R6-like scale and movement systems. The adapter allows your experience to take advantage of modern R15 components, such as layered clothing and animatable heads, with minimal performance or gameplay impact to your experience.

It's important to understand how the adapter uses [adapter parts](#adapter-parts) and review the feature's [known limitations](#known-limitations) before [enabling](#enable-the-r6-to-r15-adapter) and testing the adapter for your experience.

## Adapter parts

The R6 to R15 Adapter implements a Luau script injection when an avatar spawns that creates adapter parts.

These are invisible `Class.MeshPart|MeshParts` that have the exact same name as R6 body parts and are welded to their corresponding R15 body parts. The scripts allow adapter parts to accept R6-based script interactions and forward them to the appropriate R15 parts.

The adapter parts perform the following:

- Emulates R6 physics using extra invisible collideable parts with the positions and dimensions of R6 hitboxes.
- Sets the visible R15 body parts as non-collideable.
- Scales and positions the visible R15 parts to match the R6 size and joint positions.
- Acts as a shim between R6 and R15 body parts. Property changes applied to the invisible R6 parts are passed along to their corresponding visible R15 parts.
  - For example, a color change in R6 `LeftArm` is passed to the R15 `LeftUpperArm`, `LeftLowerArm` and `LeftHand` parts.

## Enable the R6 to R15 Adapter

You can enable the R6 to R15 Adapter by setting the `Class.Workspace.AvatarUnificationMode|AvatarUnificationMode` property in `Class.Workspace`. You can only access this property if **Avatar Type** is set to `R6` in Studio's **File**&nbsp;⟩ **Experience Settings** window. At this time, the **Default** setting disables unification mode.

To enable the R6 to R15 Adapter:

1. In the **Explorer**, navigate to **Workspace**.
2. In the **Properties** window, set **AvatarUnificationMode** to **Enabled**.

## Known limitations

In a majority of cases, the R6 to R15 Adapter works out-of-the-box with the systems of a R6 experience. In rare cases, there may be conflicts with custom systems that handle security, or character-related behavior. See the following for a list of potential limitations or conflicts that you may encounter when using the R6 to R15 Adapter.

### Security

Some R6 experiences with active cheat detection can interpret the Luau script injection as an attempt to circumvent the security.

Since the default behavior of R6 avatars is to spawn with all their parts already in place, many experiences tend to flag changes in body parts as potential exploits. In experiences with the adapter enabled, the R15 avatars spawn with their default bodies before changing body parts based on their saved avatar body parts and accessories.

### Custom avatar editors

Experiences with custom avatar editors that allow players to swap body parts might break the connection with the adapter parts.

### Pre-existing R15 support

Experiences that check the avatar rig type and include solutions specific for each R15 and R6 case might not work properly with the adapter. `AvatarUnificationMode` uses code paths corresponding to R15 which may require testing in your experience.

### Body part rescaling

Experiences that resize the R6 body parts won't see the scale change propagated to the proxied R15 parts. This is also the case if joint attachments are moved.

### GetChildren API calls

`Class.Instance:GetChildren()|GetChildren()` calls return both the R6 proxy parts and their corresponding R15 parts. You may need to account for this extra information.

### FindFirstChild API calls

Don't immediately use `Class.Instance:FindFirstChild()|FindFirstChild()`, or "dot indexing," in your scripts to find character parts. Instead, use `Class.Instance:WaitForChild()|WaitForChild()` before you call `Class.Instance:FindFirstChild()|FindFirstChild()`. Replication in `Class.Workspace.AvatarUnificationMode|AvatarUnificationMode` is different, and the experience may fail to find a child that doesn't exist yet.

This has always been a best practice for Roblox scripts, even if some cases work without following this practice.

### Head.ClassName conditionals

`Class.Workspace.AvatarUnificationMode|AvatarUnificationMode` sets the Head to a `Class.MeshPart`. Any calls that read or write to the `Class.SpecialMesh.MeshId` property will fail.

### Head collisions

R15 characters joining an R6 experience don't support collisions with their Head part. If your experience detects or depends on collisions with a character's Head, you must also update your scripts to check for `CollisionHead` as well.
