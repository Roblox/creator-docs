---
title: CameraModule
description: Overview about the CameraModule
---

<i>This ModuleScript implements a singleton class to manage the selection, activation, and deactivation of the current camera controller, character occlusion controller, and transparency controller. This script binds to RenderStepped at Camera priority and calls the Update() methods on the active controller instances.</i>

<i>The camera controller ModuleScripts implement classes which are instantiated and activated as-needed, they are no longer all instantiated up front as they were in the previous generation of PlayerScripts.</i>

## cameraRenderUpdate

``cameraRenderUpdate`` is the RenderStep name used and bound with by the ``CameraModule`` with the priority ``Enum.RenderPriority.Camera.Value``, through Class.RunService:BindToRenderStep()|:BindToRenderStep().

For custom camera or other behavior, it is recommended to keep the **``Enum.RenderPriority``** in mind. The MicroProfiler can be used to debug which render steps are running in which order.

The order is important. For instance, if the ``CameraModule`` changes the ``Datatype.CFrame`` of the camera,
you want to ensure that anything that's meant to change the ``Datatype.CFrame`` again runs first, before reading the ``Datatype.CFrame``, if you're expecting a different your custom modified values.

``Class.RunService:BindToRenderStep()|:BindToRenderStep()`` runs before ``Class.RunService.RenderStep``.

## MouseLockController

### BoundKeys

By default, the ``MouseLockController`` will create a ``Class.StringValue`` named ``BoundKeys``. By default it is set to ``"LeftShift,RightShift"`` with comma-separated values. They're named based off `Enum.KeyCode` and the values can be overwritten to change the bindings that should be used to trigger Mouse Lock <i>(Shift-Lock)</i>.
