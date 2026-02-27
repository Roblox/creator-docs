---
title: Standard PlayerModule
description: Overview of the PlayerModule.
---

<i>The ``PlayerModule`` is initialized by ``PlayerScriptsLoader``.
``PlayerScriptsLoader`` is a script which requires and instantiates the ``PlayerModule`` singleton.</i>

``PlayerModule`` comes with two further modules, [``CameraModule``](./CameraModule.md) and ``ControlModule``.

## PlayerModule

This module requires and instantiates the camera and control modules, and provides getters for developers to access methods on these singletons without having to modify Roblox-supplied scripts.
