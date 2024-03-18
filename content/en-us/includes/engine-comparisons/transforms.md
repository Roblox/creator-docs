---
title: include
---

{props.engine}'s transforms and Roblox's `Datatype.CFrame|CFrames` serve similar purposes in representing 3D transformations of objects:

- Both transforms and `CFrames` represent the position and rotation of an object in 3D space. Transforms include scale, whereas Roblox uses a `Class.BasePart.Size` property that isn't part of the `CFrame`.
- Both support multiplication (i.e. composition) for complex transformations and have built-in methods for other manipulations.
