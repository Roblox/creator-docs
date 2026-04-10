---
title: Character Controller Library
description: The Character Controller Library (CCL) is a modular framework for building character movement and behaviors through attributes and Luau scripts.
---

The **Character Controller Library** (CCL) is a modular framework for building character movement and behaviors through attributes and Luau scripts. This architecture replaces rigid `Class.Humanoid` state machines with a flexible, extensible system for character mechanics built around abilities and controllers.

<Alert severity="success">
The CCL is **opt-in** through the [Avatar Settings](../../studio/avatar-settings.md) window and experiences can continue using the legacy movement system.
</Alert>

## Abilities

[Abilities](./abilities.md) evaluate what a character can do, such as the ability to run, jump, climb, and swim. Instead of relying on a fixed set of engine‑defined character states like those in `Enum.HumanoidStateType`, abilities dynamically determine what a character can do and how it should respond to player input.

<Alert severity="info">
At this time, custom abilities are not supported, although the CCL fully supports the traditional character abilities (run, climb, jump, swim, etc.) and you can customize their behaviors more easily. In the future, custom abilities will allow you to add new character mechanics such as crouching, aiming, wall‑jumping, and more.
</Alert>

## Controllers

[Controllers](./controllers.md) apply the physical simulation of movement, for example movement behavior on ground, in the air, in water, etc. [Abilities](./abilities.md) interact with controllers to change physical behaviors or to switch between controller contexts; for example, an ability might update movement acceleration, change direction, or activate an air controller instead of a ground controller.
