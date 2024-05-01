---
title: Chat with Voice
description: Explains how to use the proximity-based voice chat feature.
---

<Alert severity="success">
<p>Chat with voice is currently available to all 13+ [phone number verified](https://en.help.roblox.com/hc/en-us/articles/203313350) users in the United&nbsp;States, Canada, United&nbsp;Kingdom, Australia, New&nbsp;Zealand, Spain, Mexico, Chile, Costa&nbsp;Rica, and Puerto&nbsp;Rico. Users **not** in these countries should use [ID verification](https://en.help.roblox.com/hc/en-us/articles/4407282410644) to enable chat with voice.</p>
<p>Once verified, users can opt-in to use this feature by visiting their account **Settings** page, enabling them to use chat with voice in any Roblox experience that supports it. Experiences with voice often see an uplift in engagement, DAU, and spending.</p>
</Alert>

**Chat with voice** is a proximity-based voice chat feature that simulates realistic communication based on how close you are to other users who are speaking. The closer you are to another user's avatar, the louder their voice; conversely, the farther away you are, the softer their voice.

Chat with voice is only available for places that support a maximum of 50 users.

<img src="../assets/players/voice-chat/In-Experience-Example.jpg" width="800" alt="Two users chatting with voice inside an experience" />

## Enabling Chat with Voice

Before you can enable chat with voice in an experience, you must first [publish](../production/publishing/publishing-experiences-and-places.md) it to enable the [Game Settings](../studio/game-settings.md) menu within Studio.

1. Open your experience in Studio.
1. Open [Game Settings](../studio/game-settings.md) from the [Home](../studio/home-tab.md) tab.

   <img src="../assets/studio/general/Home-Tab-Game-Settings.png" width="760" alt="Game Settings button indicated in Home tab" />

1. Navigate to the **Communication** tab on the left side of the window.
1. Toggle **Enable Microphone** so the selector turns from gray to green.
1. **(Optional)** For greater communication among users within your experience, toggle on **Enable&nbsp;Camera** to allow eligible users to animate their avatar with their movement.
1. [Publish](../production/publishing/publishing-experiences-and-places.md) the place to save the changes.

Chat with voice will now be available to verified 13+ users who opt‑in to the feature, in every place within the experience that's set to a maximum of 50 users.

<Alert severity="success">
For details on implementing custom voice setups with the **New&nbsp;Audio&nbsp;API** beta, see [here](https://devforum.roblox.com/t/new-audio-api-beta-elevate-sound-and-voice-in-your-experiences/2848873#working-with-voice-input-10).
</Alert>

### Setting Maximum Users

If you previously set the maximum number of users in a place to more than 50, you'll need to reduce it to support chat with voice.

1. In the left-hand navigation of the [Game Settings](../studio/game-settings.md) dialog, select **Places**. Every place within your experience displays.
1. Click the **&ctdot;** button next to the place with more than 50 players, then select **Configure Place**.
1. In the **Max Players** field, enter any number less than or equal to 50.
1. Click the **Save** button and then [publish](../production/publishing/publishing-experiences-and-places.md) to save the changes.

When you update the maximum number of users in a place to fewer than 50, there may be servers already configured to a different, higher number. Since those servers won't support chat with voice, it's recommended to [restart servers](../production/publishing/publishing-experiences-and-places.md#updating-experiences).

### Disabling Per Place

If you don't want to enable chat with voice for every place within your experience, you can disable it within specific places that would otherwise be voice‑eligible through the `Class.VoiceChatService.EnableDefaultVoice|EnableDefaultVoice` property.

<Alert severity="info">
If you're currently setting a place's **Max Players** to a value over 50 in order to disable chat with voice, it's recommended to use this workflow instead.
</Alert>

To disable chat with voice for a specific place within an experience:

1. Open the place in Studio.
1. In the [Model](../studio/model-tab.md) tab, navigate to the **Advanced** section and click the **Service** icon.

   <img src="../assets/studio/general/Model-Tab-Advanced-Options.png" width="754" alt="Advanced options indicated in Model tab" />

1. Select **VoiceChatService** and click **Insert**.
1. In the [Explorer](../studio/explorer.md) window, select **VoiceChatService**.

   <img src="../assets/studio/explorer/VoiceChatService.png" width="320" alt="VoiceChatService in Explorer hierarchy" />

1. In the [Properties](../studio/properties.md) window, disable the **EnableDefaultVoice** property.
1. Publish the place to save the changes and [restart servers](../production/publishing/publishing-experiences-and-places.md#updating-experiences) to ensure the change takes effect for all servers currently running your experience.

## Checking Chat with Voice Status

You can check if a user has enabled chat with voice by calling `Class.VoiceChatService:IsVoiceEnabledForUserIdAsync()|IsVoiceEnabledForUserIdAsync()` in a `Class.LocalScript`. For example, if you want to enable a UI layer for voice‑enabled users, reference the following script:

```lua title="LocalScript - Check Chat with Voice Status"
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
