---
title: include
---

All Roblox experiences include several UI elements that are enabled by default. If you don't need any of these elements or if you want to replace them with your own creations, you can use the `Class.StarterGui:SetCoreGuiEnabled()|SetCoreGuiEnabled()` method in a client‑side script with the associated `Enum.CoreGuiType` option.

<table>
<thead>
  <tr>
    <th>Default UI</th>
    <th>Associated enum</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Dynamically updated `Class.Players` list, commonly used as a [leaderboard](../../players/leaderboards.md).</td>
    <td>`Enum.CoreGuiType.PlayerList`</td>
  </tr>
	<tr>
    <td>The character's `Class.Humanoid.Health|Health` bar. Does not appear if the character's `Class.Humanoid` is at full health.</td>
    <td>`Enum.CoreGuiType.Health`</td>
  </tr>
	<tr>
    <td>The character's `Class.Backpack` which contains [in‑experience tools](../../players/tools.md). Does not appear if there are no `Class.Tool|Tools` in the backpack.</td>
    <td>`Enum.CoreGuiType.Backpack`</td>
  </tr>
	<tr>
    <td>The [text chat](../../chat/in-experience-text-chat.md) window.</td>
    <td>`Enum.CoreGuiType.Chat`</td>
  </tr>
	<tr>
    <td>Popup menu of character [emotes](../../characters/emotes.md).</td>
    <td>`Enum.CoreGuiType.EmotesMenu`</td>
  </tr>
	<tr>
    <td>A window displaying a player's perspective or view of their own character. Does not appear unless the player has enabled **Self&nbsp;View** from the Roblox menu.</td>
    <td>`Enum.CoreGuiType.SelfView`</td>
  </tr>
	<tr>
    <td>A **capture screenshot** button along the right side of the screen. Does not appear unless the player has enabled **Captures** from the Roblox menu.</td>
    <td>`Enum.CoreGuiType.Captures`</td>
  </tr>
  <tr>
    <td>The **Avatar Switcher** allows users to change their platform avatar.</td>
    <td>`Enum.CoreGuiType.AvatarSwitcher`</td>
  </tr>
</tbody>
</table>

<img src="../../assets/ui/misc/CoreGui-Elements.jpg" width="840" alt="Core UI elements in every Roblox experience." />

```lua title="Client Script - Disable Default UI Elements"
local StarterGui = game:GetService("StarterGui")

-- Disable default health bar and backpack
StarterGui:SetCoreGuiEnabled(Enum.CoreGuiType.Health, false)
StarterGui:SetCoreGuiEnabled(Enum.CoreGuiType.Backpack, false)
```

Additionally, devices with touch capabilities include a virtual thumbstick and a jump button by default. If desired, you can hide these elements by setting `Class.GuiService.TouchControlsEnabled` to `false` in a client‑side script.

<img src="../../assets/ui/misc/TouchGui-Elements.png" width="840" alt="UI elements for touch-capable devices in every Roblox experience" />

```lua title="Client Script - Disable Touch Controls"
local GuiService = game:GetService("GuiService")

GuiService.TouchControlsEnabled = false
```
