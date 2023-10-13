---
title: Input and Camera
description: Explains how Roblox supports various input devices and camera configurations.
---

Every experience needs to receive user input in some way to allow users to
interact and view their environment. Roblox supports nearly all forms of input,
including mouse and keyboard, touch, and gamepad controls.

Inputs also include user camera controls, and you can customize various camera
settings using built-in settings or custom scripts to achieve a certain look and
feel for your users.

## Mouse and Keyboard

The most common mouse and keyboard inputs are already set in an experience as
Roblox default keybinds. You can set up additional inputs or replace existing
inputs to customize how users can interact within your experience.

Once you're comfortable with testing and developing your inputs on mouse and
keyboard, make your experience compatible with multiple platforms by setting up
mobile and gamepad inputs.

See [Mouse and Keyboard Input](../input/mouse-and-keyboard.md) for more
information on setting up your first custom inputs.

## Mobile

Over half of all Roblox sessions are played on mobile devices. To ensure your
experience is accessible to the widest audience, it is important to design
cross-platform accessibility when developing your experience.

You can bind a single action to a traditional PC input and create an on-screen
button for touchscreen devices. You can also dynamically update input behavior
so that inputs trigger certain actions only in certain contexts.

See [Mobile Input](../input/mobile.md) for more information on creating
setting up cross-platform and dynamic inputs.

## Gamepad

Roblox accepts input from USB gamepads such as Xbox and Playstation controllers.
Gamepads require additional steps to detect and verify connected gamepads before
binding controller inputs to actions.

See [Gamepad Input](../input/gamepad.md) for more information on setting up
gamepad inputs for your experience.

## Customizing the Camera

Roblox experiences include a default user-friendly camera configuration. You can
edit the camera settings to create a more immersive and unique experience for
your users.

See [Customizing the Camera](../workspace/camera.md) for more
information on customizing the properties of your camera system.
