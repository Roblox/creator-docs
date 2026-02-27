---
title: Standard PlayerModule
description: Overview of the PlayerModule.
---

The ``PlayerModule`` is initialized by ``PlayerScriptsLoader``.
``PlayerScriptsLoader`` is a script which requires and instantiates the ``PlayerModule`` singleton.

``PlayerModule`` comes with two further modules, ``CameraModule`` and ``ControlModule``.

## PlayerModule

This module requires and instantiates the camera and control modules, and provides getters for developers to access methods on these singletons without having to modify Roblox-supplied scripts.
