---
title: Roblox Connect Project
description: Explore Roblox Connect, an experience where you can call a friend and have a conversation as your avatars, together in a shared immersive space.
---

[Roblox Connect][robloxconnecturl] is an experience where you can call a friend and have a conversation as your avatars, together in a shared immersive space. From a developer's perspective, it is a non-copylocked experience that demonstrates one way of consuming the call-related methods and events of `Class.SocialService` and `Class.PlayerViewService`. The possible use cases are limitless and this guide provides examples of how they're used in [Roblox Connect][robloxconnecturl].

<Alert severity="info">
To run [Roblox Connect][robloxconnecturl], you and your friends need to be on client version 602 or higher. Additionally, to implement the current [methods and events](#api-implementation) in one of your own experiences, it must have been published to Roblox for at least one week.
</Alert>

## Project Overview

Developers can introduce synchronous avatar communication into any experience on Roblox utilizing current methods and events. Some of the noteworthy [Roblox Connect][robloxconnecturl] feature highlights and call privacy details are shared below.

### Environment Switcher

To provide a better immersive communicative experience, the project includes an **environment switcher** that allows players to move from environment to environment. When moving among environments in the same place, player characters are repositioned via `Class.PVInstance:PivotTo()|PivotTo()`. When moving to an environment in a different place, players are teleported via `Class.TeleportService` to their desired location.

Additionally, a "handshake" model is implemented to ensure both players in the private space agree to being relocated before actually doing so. If one player declines the request to change environments, the entire transaction is canceled and no players are relocated.

In regards to the call, teleport is to a reserved server and all call participants are teleported together. If this teleport condition is not met, or if the teleport itself fails, the call is ended.

<img src="../assets/resources/roblox-connect/Environment-Switcher.png" width="375" alt="Environment switcher in Roblox Connect" />

### Camera Modes

[Roblox Connect][robloxconnecturl] introduces two unique camera modes in addition to the default camera mode, both of which you can utilize to enhance your own experiences. Furthermore, when switching between various camera modes, a camera transitioner makes switching between modes feel seamless.

<img src="../assets/resources/roblox-connect/Camera-Mode-Switcher.png" width="360" alt="Camera mode switcher in Roblox Connect" />

#### Picture-in-Picture

In **picture-in-picture** mode, camera focus is on your call partner and a small view of your character floats on the screen. This mode also includes head tracking, and the local player's movement is restricted.

<img src="../assets/resources/roblox-connect/Camera-Mode-PiP.jpg" width="720" alt="Picture-in-picture camera mode in Roblox Connect" />

#### Cinematic

The **cinematic** mode attempts to keep both player characters within your camera viewport at all times. Player movement is not restricted and, as characters move around, the camera detects their movement and adjusts accordingly.

<img src="../assets/resources/roblox-connect/Camera-Mode-Cinematic.jpg" width="720" alt="Cinematic camera mode in Roblox Connect" />

#### Freeplay

The **freeplay** mode uses the default Roblox character camera, letting you move around while also talking to your call partner. Your partner's character will not necessarily be in view.

### Emote Bar

The project's **emote bar** is a cloned version of the [EmoteBar](../resources/modules/emote-bar.md) developer module. Out of the box, the module contains a lot of key features, but [Roblox Connect][robloxconnecturl] requires a few specific changes such as returning the character to "idle" state after performing the emote once.

<img src="../assets/resources/roblox-connect/Emote-Bar.jpg" width="720" alt="Emote bar in Roblox Connect" />

### Privacy

If someone who is not in the call is added to the reserved server, or is already in the reserved server, the call is ended.

## API Implementation

[Roblox Connect][robloxconnecturl] takes advantage of new `Class.SocialService` and `Class.PlayerViewService` methods and events to build an immersive communication platform.

- `Class.SocialService:PromptPhoneBook()` is hooked up to the call button in the starting lobby so that players may look at their contact list and initiate a call. In tandem, the `Class.SocialService.PhoneBookPromptClosed` event is connected to a listener that restores the button's visibility and repositions the camera.

  <video src="../assets/resources/roblox-connect/PromptPhoneBook.mp4" controls width="538" alt="Demo video of the PromptPhoneBook method" />

- The `Class.SocialService:CanSendCallingInviteAsync()` method is utilized to check if a player is eligible to send call invites. If a player is ineligible (not 13+ and not [phone or ID verified](../production/publishing/account-verification.md)), a dialog message is displayed. This check should be made before calling `Class.SocialService:PromptPhoneBook()|PromptPhoneBook()`.

  <video src="../assets/resources/roblox-connect/CanSendCallingInviteAsync.mp4" controls width="538" alt="Demo video of the CanSendCallingInviteAsync method" />

- The `Class.SocialService.CallInviteStateChanged` event is connected to a listener that hides the call button, freeing up screen space while the player waits for their friend to answer the call request. This event can be used to show a "connecting" state if desired.

- `Class.SocialService:ShowSelfView()` and `Class.SocialService:HideSelfView()` are hooked up to various camera modes. Specifically, the caller's self view is shown in [Picture‑in‑Picture](#picture-in-picture) or [Cinematic](#cinematic) mode, and hidden in [Freeplay](#freeplay) mode.

  <video src="../assets/resources/roblox-connect/ShowHideSelfView.mp4" controls width="538" alt="Demo video of the ShowSelfView and HideSelfView methods" />

- `Class.PlayerViewService:GetDeviceCameraCFrame()` maps device to workspace camera orientation in [Picture‑in‑Picture](#picture-in-picture) mode, providing a more immersive experience. This method leverages the player's camera device and is only applicable on mobile devices.

  <video src="../assets/resources/roblox-connect/GetDeviceCameraCFrame.mp4" controls width="538" alt="Demo video of the GetDeviceCameraCFrame method" />

[robloxconnecturl]: https://www.roblox.com/games/15308759682/Roblox-Connect
