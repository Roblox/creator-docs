---
title: Voice Chat
description: Explains how to use the Voice Chat feature.
---

<Alert severity="success">
Voice Chat is currently available to all 13+ phone number verified users in a specific set of countries. Review the [Voice Chat FAQ](https://en.help.roblox.com/hc/en-us/articles/4405807645972-Voice-Chat-FAQs) to learn more. Users **not** in these countries should use [ID verification](https://en.help.roblox.com/hc/en-us/articles/4407282410644) to enable chat with voice. Once verified, eligible 13+ phone verified users can opt‑in to use this feature by visiting their account **Settings** page or from within a voice enabled experience, allowing them to chat with voice in any Roblox experience that supports it. Experiences with voice often see an uplift in engagement, DAU, and spending.
</Alert>

**Voice Chat** is a feature enabling real-time, spoken communication between yourself and other players. It is only available for places that support a maximum of 50 players.

<img src="../assets/players/voice-chat/In-Experience-Example.jpg" width="800" alt="Two users chatting with voice inside an experience" />

## Enable Voice Chat

Before you can enable Voice Chat in an experience, you must first [publish](../production/publishing/publish-experiences-and-places.md) it, then:

1. Open your experience in Studio.
1. Open **File**&nbsp;⟩ **Experience Settings**.
1. Navigate to the **Communication** tab on the left side of the window.
1. Toggle **Enable Microphone** so the selector turns from gray to green.
1. <Chip label="OPTIONAL" size="small" variant="outlined" /> For greater communication among players within your experience, toggle on **Enable&nbsp;Camera** to allow eligible players to animate their avatar with their movement.
1. [Publish](../production/publishing/publish-experiences-and-places.md) the place to save the changes.

Voice Chat will now be available to verified 13+ users who opt‑in to the feature, in every place within the experience that's set to a maximum of 50 players.

### Set maximum players

If you previously set the maximum number of players in a place to more than 50, you'll need to reduce it to support Voice Chat.

1. In the left-hand navigation of the **Experience Settings** window, select **Places**. Every place within your experience displays.
1. Click the **&ctdot;** button next to the place with more than 50 players, then select **Configure Place**.
1. In the **Max Players** field, enter any number less than or equal to 50.
1. Click the **Save** button and then [publish](../production/publishing/publish-experiences-and-places.md) to save the changes.

When you update the maximum number of players in a place to fewer than 50, there may be servers already configured to a different, higher number. Since those servers won't support Voice Chat, it's recommended to [restart servers](../projects/update-experiences.md#restart-servers).

### Customize voice behavior

Voice Chat is **proximity-based** by default, adjusting the volume of participants based on how close they are to each other. However, you can set `Class.VoiceChatService.UseAudioApi|UseAudioApi` to `Enum.AudioApiRollout|Enabled` to take control over how voices are set up and used in your experience.

If `Class.VoiceChatService` does not appear already:

1. Right‑click in the **Explorer** window and select **Show&nbsp;Services…** from the context menu.
2. Select `Class.VoiceChatService` in the popup window and click **Insert**. The service appears in the **Explorer** hierarchy.

   <img src="../assets/studio/explorer/VoiceChatService.png" width="320" alt="VoiceChatService in Explorer hierarchy" />

3. With `Class.VoiceChatService` selected, ensure that `Class.VoiceChatService.UseAudioApi|UseAudioApi` to `Enum.AudioApiRollout|Enabled` in the **Properties** window. This may already be done for you.

#### Team-based

To implement `Class.Team`-based chat where only teammates can hear one another, you can use the following `Class.Script` within `Class.ServerScriptService`:

```lua title="Team Chat"
local Teams = game:GetService("Teams")

local function findAudioInput(forPlayer : Player) : AudioDeviceInput?
	-- Assumes there is only one AudioDeviceInput per player, parented to the Player object
	-- This is provided for you if VoiceChatService.EnableDefaultVoice is true
	-- May need to be reworked for generality if your place puts AudioDeviceInput objects elsewhere
	return forPlayer:FindFirstChildWhichIsA("AudioDeviceInput")
end

local function onTeamChanged(player : Player)
	local team = player.Team
	if not team then return end

	local device = findAudioInput(player)
	if not device then return end
	
	-- Only permit teammates to hear each other
	device.AccessType = Enum.AccessModifierType.Allow
	local allowed = {}
	for _, player : Player in team:GetPlayers() do
		table.insert(allowed, player.UserId)
	end

	device:SetUserIdAccessList(allowed)
end

local function onTeamAdded(team : Team)
	team.PlayerAdded:Connect(onTeamChanged)
	team.PlayerRemoved:Connect(onTeamChanged)
end

for _, team : Team in Teams:GetTeams() do
	onTeamAdded(team)
end

Teams.ChildAdded:Connect(function(child : Instance)
	if child:IsA("Team") then
		onTeamAdded(child)
	end
end)
```

#### Non-spatial

Depending on your experience's needs, it might make more sense to hear others with equal volume, regardless of their geographic location. If you [disable default Voice Chat](#disable-per-place), you can then implement non‑spatial Voice Chat through the following `Class.Script` within `Class.ServerScriptService`:

```lua title="Non-Proximity Chat"
local Players = game:GetService("Players")
local Workspace = game:GetService("Workspace")

local function wireUp(source : Instance, target : Instance)
	local wire = Instance.new("Wire")
	wire.SourceInstance = source
	wire.TargetInstance = target
	wire.Parent = source
end

-- Set up a global volume slider for everybody's voice
local volumeSlider = Instance.new("AudioFader", Workspace)
local output = Instance.new("AudioDeviceOutput", Workspace)
wireUp(volumeSlider, output)

local function onPlayerAdded(player : Player)
	local device = Instance.new("AudioDeviceInput", player)
	device.Player = player
	-- Route each new player's microphone input to the global volume slider
	wireUp(device, volumeSlider)
end

for _, player in Players:GetPlayers() do
	onPlayerAdded(player)
end
Players.PlayerAdded:Connect(onPlayerAdded)
```

<Alert severity="warning">
The above script runs on the server, creating an `Class.AudioDeviceInput` per‑player and connecting them all to a shared `Class.AudioFader`. Taking this behavior as‑is allows players to hear all other players **and** themselves. Since hearing yourself can be quite distracting, you can place the following `Class.LocalScript` in `Class.StarterPlayerScripts` to remove the `Class.Wire|Wires` that would otherwise ferry your own voice back to your own speakers.
</Alert>

```lua title="LocalScript"
local Players = game:GetService("Players")

local player = Players.LocalPlayer

local function onDescendantAdded(descendant : Instance)
	if descendant:IsA("Wire") then
		descendant:Destroy()
	end
end

for _, descendant in player:GetDescendants() do
	onDescendantAdded(descendant)
end
player.DescendantAdded:Connect(onDescendantAdded)
```

### Disable per place

If you don't want to enable Voice Chat for every place within your experience, you can disable it within specific places that would otherwise be voice‑eligible.

<Alert severity="info">
If you're currently setting a place's **Max Players** to a value over 50 in order to disable Voice Chat, it's recommended to use this workflow instead.
</Alert>

To disable Voice Chat for a specific place within an experience:

1. Right‑click in the **Explorer** window and select **Show&nbsp;Services…** from the context menu.
2. Select `Class.VoiceChatService` in the popup window and click **Insert**. The service appears in the **Explorer** hierarchy.

   <img src="../assets/studio/explorer/VoiceChatService.png" width="320" alt="VoiceChatService in Explorer hierarchy" />

3. With `Class.VoiceChatService` selected, disable `Class.VoiceChatService.EnableDefaultVoice|EnableDefaultVoice` in the **Properties** window.
4. Publish the place to save the changes and [restart servers](../projects/update-experiences.md#restart-servers) to ensure the change takes effect for all servers currently running your experience.

## Check status

You can check if a player has enabled Voice Chat by calling `Class.VoiceChatService:IsVoiceEnabledForUserIdAsync()|IsVoiceEnabledForUserIdAsync()` in a `Class.LocalScript`, or in a `Class.Script` with `Class.BaseScript.RunContext|RunContext` set to `Enum.RunContext.Client`.

```lua title="Client Script - Check Voice Chat Status"
local Players = game:GetService("Players")
local VoiceChatService = game:GetService("VoiceChatService")

local localPlayer = Players.LocalPlayer

local success, enabled = pcall(function()
	return VoiceChatService:IsVoiceEnabledForUserIdAsync(localPlayer.UserId)
end)
if success and enabled then
	print("Voice Chat enabled!")
end
```
