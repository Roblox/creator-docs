---
title: Chat with Spatial Voice
description: Explains how to use Spatial Voice, a proximity-based voice chat feature.
comments: Integrate as "Avatar Chat" or under the larger umbrella "Chat".
---

<Alert severity="warning">
  <b>Any 13+ user who would like to chat with their voice can [verify their age](../production/publishing/account-verification.md) and opt-in to the <a href="https://en.help.roblox.com/hc/en-us/articles/4405807645972-Spatial-Voice-Beta-">Chat with Spatial Voice Beta</a></b>.
</Alert>

**Chat with Spatial Voice** is a proximity-based voice chat feature that simulates realistic communication based on how close you are to other users who are speaking. The closer you are to another user, the louder their voice; conversely, the farther away you are from another user, the softer their voice.

Chat with spatial voice is only available for places up to 50 users, and that load an avatar.

<img src="../assets/audio/spatial-voice/SpatialVoiceOverview.png"
   width="80%" />

## Enabling Chat with Spatial Voice

Before you begin to enable chat with spatial voice, you must first [publish your experience](../production/publishing/publishing-experiences-and-places.md#publishing-a-starting-place) to enable the [Game Settings](../studio/game-settings.md) menu within Studio.

To enable chat with spatial voice within an experience:

1. In the menu bar, navigate to the **Home** tab.
2. In the **Settings** section, click on **Game Settings**. A **Game Settings** dialog displays.
3. In the left-hand navigation, select **Options**.
4. Enable the **Spatial Voice** toggle.

Chat with spatial voice is now available in every place in the experience that has their maximum number of users set to 50 or less.

### Setting Maximum Users

If you previously set the maximum number of users in a place to more than 50, you can always modify it to a lesser number.

To set the maximum number of users:

1. In the left-hand navigation of the **Game Settings** dialog, select **Places**. Every place within your experience displays.
2. Click the **&ctdot;** button next to the place with more than 50 players, then select **Edit**.
3. In the **Max Players** field, type in any number **equal to or less than 50**.
4. Click the **Save** button.

When you update the maximum number of users in a place to fewer than 50, there may be servers already configured to a different, higher number. As those servers won't support chat with spatial voice, it is recommended to [restart your servers](../production/publishing/publishing-experiences-and-places.md#restarting-servers).

## Disabling Chat with Spatial Voice Per Place

If you don't want to enable chat with spatial voice for every place within your experience, you can disable it within specific places that would otherwise be voice-eligible through the `Class.VoiceChatService.EnableDefaultVoice|EnableDefaultVoice` property.

<Alert severity="info">
  If you are currently setting Max Players to a value over 50 to disable voice in a place, it is recommended to use this property instead. This ensures that chat with spatial voice remains disabled when max user limit changes.
</Alert>

To disable chat with spatial voice for a place:

1. In the **Model** tab of the menu bar, navigate to the **Advanced** section, then click the **Service** icon. The **Insert Service** dialog displays.
2. Select **VoiceChatService**.
3. In the **Explorer** window, select **VoiceChatService**.
4. In the **Properties** window, disable the **EnableDefaultVoice** property.
5. [Restart your servers](../production/publishing/publishing-experiences-and-places.md#restarting-servers) to ensure the change takes effect for all servers currently running your experience.

## Changing Listener Perspective

You can adjust how a user perceives voice and all other sounds within your experience by calling `Class.SoundService:SetListener()|SetListener()`. The `Class.SoundService` listener determines the point from which users hear audio within the experience.

When you use an **ObjectPosition** `Enum.ListenerType`, users perceive sound through the **position of the object** while using the **orientation of the camera**. The sound comes through their device's left and/or right speaker depending on the orientation of the camera while the volume depends on the object's distance from the source of the sound.

```lua
local SoundService = game:GetService("SoundService")
local Players = game:GetService("Players")

local me = Players.LocalPlayer
local myCharacter = me.Character or me.CharacterAdded:Wait()
local myHead = myCharacter:WaitForChild("Head")

SoundService:SetListener(Enum.ListenerType.ObjectPosition, myHead)
```

When you use an **ObjectCFrame** `Enum.ListenerType`, users perceive sound through the **position and orientation of the object**. For example, if their character's head is the object and they face to the right, sound will come through their device's left speaker since the character's left ear is now facing the source of the sound, and the volume depends on how close their character is to the source of the sound.

```lua
local SoundService = game:GetService("SoundService")
local Players = game:GetService("Players")

local me = Players.LocalPlayer
local myCharacter = me.Character or me.CharacterAdded:Wait()
local myHead = myCharacter:WaitForChild("Head")

SoundService:SetListener(Enum.ListenerType.ObjectCFrame, myHead)
```

## Checking Chat with Spatial Voice Status

You can check if a user has enabled chat with spatial voice by calling `Class.VoiceChatService:IsVoiceEnabledForUserIdAsync()|IsVoiceEnabledForUserIdAsync()` in a `Class.LocalScript`.

For example, if you want to enable a UI-layer for voice-enabled users, reference the following script:

```lua
local Players = game:GetService("Players")
local VoiceChatService = game:GetService("VoiceChatService")

local localPlayer = Players.LocalPlayer
local success, enabled = pcall(function()
    return VoiceChatService:IsVoiceEnabledForUserIdAsync(localPlayer.UserId)
end)
if success and enabled then
    localPlayer.PlayerGui.MyVoiceGui.Enabled = true
end
```

## Warnings

A warning message displays if a user or place isn't eligible for chat with spatial voice. Reference the following table for possible solutions:

<table>
<thead>
  <tr>
    <th>Warning Message</th>
    <th>Resolution</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Current place is not eligible for Spatial Voice. Spatial Voice is available for places with Max Players &lt;= 50.</td>
    <td><a href="#setting-maximum-users">Reduce</a> the <b>Max Player</b> value for the place to 50 or less in the <b>Game Settings</b> dialog.</td>
  </tr>
  <tr>
    <td>Current Player is not eligible to use Spatial Voice.</td>
    <td>Users who are a part of the <a href="https://en.help.roblox.com/hc/en-us/articles/4405807645972-Spatial-Voice-Beta-">Chat with Spatial Voice Beta</a> are eligible to chat in experiences using spatial voice.</td>
  </tr>
</tbody>
</table>
