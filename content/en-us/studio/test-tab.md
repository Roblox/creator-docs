---
title: Test Tab
description: The Test tab contains tools for testing, simulating multiple clients, and other emulations.
---

import PlaytestOptions from '../includes/studio/testing-modes.md'
import DeviceEmulator from '../includes/studio/device-emulator.md'
import PauseResumePhysics from '../includes/studio/pause-resume-physics.md'
import BetaAlert from '../includes/beta-features/beta-alert.md'

The **Test** tab contains tools for testing and debugging an experience, simulating multiple clients, and emulating different devices or users with regional content policies.

<img src="../assets/studio/general/Toolbar-Test-Tab.png" width="800" alt="Test tab indicated in Studio toolbar." />

## Playtest Options

<PlaytestOptions components={props.components} />

## Pausing & Resuming Physics

<PauseResumePhysics components={props.components} />

## Clients and Servers

Using the **Clients and Servers** options, you can launch multiple sessions of Studio, one acting as the server and each other acting as a client. See [Multi-Client Simulation](../studio/testing-modes.md#multi-client-simulation) for details.

<img src="../assets/studio/general/Test-Tab-Clients-Servers.png" width="800" alt="Clients and Servers options indicated in Test tab" />

## Device Emulation

<DeviceEmulator components={props.components} />

## Player Emulator

The **Player** emulator lets you test various [localization](../production/localization/index.md) and content policies. See [Player Emulation](../studio/testing-modes.md#player-emulation) for details.

<img src="../assets/studio/general/Test-Tab-Emulation-Player.png" width="800" alt="Player emulator button indicated in Test tab" />

## Audio Mute

The **Mute** button allows you to mute in-experience [sounds and music](../sound/index.md).

<img src="../assets/studio/general/Test-Tab-Mute.png" width="800" alt="Mute button indicated in Test tab" />
