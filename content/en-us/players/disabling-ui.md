---
title: Disabling Default UI Elements
description: Explains the process of disabling Roblox's default user interface elements.
---

Roblox experiences include UI elements that are enabled by default. These include:

- A list of players within the experience.
- The character's health bar.
- The character's backpack.
- A chat window.
- A popup menu of character emotes.

<img src="../assets/ui/disabling-default-ui-elements/CoreGui-Elements.jpg" width="100%" />

If you don't need any of these elements or if you want to replace the default UI elements with your own creations, `Class.StarterGui` has the functionality to let you enable or disable each default UI element.

## Disabling CoreGuiTypes

`Class.StarterGui` has a `Class.StarterGui:SetCoreGuiEnabled()|SetCoreGuiEnabled()` function that you can use to disable default UI elements. This function has `Enum.CoreGuiType` enums you can enable or disable when a user enters your experience, including:

- `Enum.CoreGuiType.PlayerList`
- `Enum.CoreGuiType.Health`
- `Enum.CoreGuiType.Backpack`
- `Enum.CoreGuiType.Chat`
- `Enum.CoreGuiType.EmotesMenu`
- `Enum.CoreGuiType.All`

To disable individual UI elements, you must specify the `Enum.CoreGuiType` and a boolean value of `false` for that `Enum.CoreGuiType`. For example, the following `Class.LocalScript` demonstrates how to disable the health bar while keeping every other default UI element enabled:

```lua highlight='3'
local StarterGui = game:GetService("StarterGui")

StarterGui:SetCoreGuiEnabled(Enum.CoreGuiType.Health, false)
```

However, if you want to disable all default UI elements except for one, you can also use `Class.StarterGui:SetCoreGuiEnabled()|SetCoreGuiEnabled()` to reenable UI elements after you have disabled them. For example, the following `Class.LocalScript` disables all default UI elements, then reenables the chat window:

```lua highlight='3,4'
local StarterGui = game:GetService("StarterGui")

StarterGui:SetCoreGuiEnabled(Enum.CoreGuiType.All, false)
StarterGui:SetCoreGuiEnabled(Enum.CoreGuiType.Chat, true)
```

Note that you can only call `Class.StarterGui:SetCoreGuiEnabled()|SetCoreGuiEnabled()` in a `Class.LocalScript`. This means that any changes you make to the default UI elements only apply to the user who owns that `Class.LocalScript`.

<Alert severity="warning">
For users who access Roblox through the Xbox One, the chat window is always disabled and the player list is always enabled. Any calls to enable `Enum.CoreGuiType.Chat` or disable `Enum.CoreGuiType.PlayerList` are ignored.
</Alert>

## Disabling Touch UI Elements

When users access experiences through a device with touch capabilities, such as a phone or tablet, Roblox adds two additional UI elements to the `Class.PlayerGui`: a control pad and a jump button. You can hide these two elements by setting the `Class.GuiService.TouchControlsEnabled|TouchControlsEnabled` of the `Class.GuiService` to a boolean value of `false` in a `Class.LocalScript`:

```lua highlight='3'
local GuiService = game:GetService("GuiService")

GuiService.TouchControlsEnabled = false
```

<img src="../assets/ui/disabling-default-ui-elements/TouchGui-Elements.jpg" width="800" />
