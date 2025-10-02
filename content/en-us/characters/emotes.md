---
title: Emotes
description: Emotes are character animations used through chat commands, or accessing the emotes menu.
---

Emotes are expressive character [animations](../animation/index.md) that are accessible by using chat commands ("/e cheer") or by accessing the **emotes menu** on the top right of any experience. All users have access to default emotes, such as **dance**, **point**, and **cheer**. Additional avatar emotes can be purchased and equipped from the [Marketplace](https://www.roblox.com/catalog).

<video src="../assets/avatar/avatar-emotes/Avatar-Emotes.mp4" controls width="100%"></video>

In your experience, you can perform the following emote customizations:

- [Open and close](#open-and-close) a user's emotes menu programmatically.
- [Add or remove](#add-and-remove-emotes) emotes options from a user's menu.
- [Disable](#disable) access to the menu.
- [Play](#play-emotes) an emote, targeting a specific user character.

## Emotes menu

You can open and close a user's emote menu manually, customize the menu to display specific emotes, or disable the menu completely.

### Open and close

To manually open or close a player's emote menu, call `Class.GuiService:SetEmotesMenuOpen()` with a boolean value of true or false.

The following code sample will open the emotes menu for the user:

```lua
-- Open the emote Menu
local GuiService = game:GetService("GuiService")
GuiService:SetEmotesMenuOpen(true)
```

If you need to detect whether the emotes menu is open, call `Class.GuiService:GetEmotesMenuOpen()`. This returns a boolean indicating the menu's current state.

### Add and remove emotes

Customize the emote menu by setting emotes from the catalog and then equipping emotes to a `Class.Humanoid`. Set emotes with the `Class.HumanoidDescription:SetEmotes()` method and equip up to 8 emotes to the emotes menu using `Class.HumanoidDescription:SetEquippedEmotes()`.

Use the following code sample in a `Class.LocalScript` within the `Class.StarterCharacterScripts` folder to set and equip emotes in your experience:

```lua
local Players = game:GetService("Players")
local humanoid = Players.LocalPlayer.Character.Humanoid
local humanoidDescription = humanoid.HumanoidDescription

-- Set custom emotes within a table
local emoteTable = {
  ["Hello"] = {3576686446},
  ["Stadium"] = {3360686498},
  ["Tilt"] = {3360692915},
  ["Shrug"] = {3576968026},
  ["Salute"] = {3360689775},
  ["Point"] = {3576823880}
}
humanoidDescription:SetEmotes(emoteTable)

-- Equip emotes in a specific order
local equippedEmotes = {"Hello", "Stadium", "Tilt", "Shrug", "Salute", "Point"}
humanoidDescription:SetEquippedEmotes(equippedEmotes)
```

<Alert severity="info">
Key names, such as "Shrug" or "Salute" are customizable and will appear to the player as written. Emotes will also show up in the order they were set, starting at the top of the wheel and continuing clockwise.
</Alert>

### Disable

Disable the emotes menu with `Class.StarterGui:SetCoreGuiEnabled()`. Disabling the emotes menu will not prevent emotes from being performed with a chat command.

The following sample code will disable the emotes menu:

```lua
local StarterGui = game:GetService("StarterGui")
StarterGui:SetCoreGuiEnabled(Enum.CoreGuiType.EmotesMenu, false)
```

In addition to disabling the menu, you can disable loading of user-owned emotes by setting the `Class.StarterPlayer.UserEmotesEnabled` property within **StarterPlayer** ⟩ **Character** to **false**. This specific property can only be set in Studio and cannot be set by scripts.

## Play emotes

To manually play an emote that a character has in its `Class.HumanoidDescription`, call `Class.Humanoid:PlayEmote()`, passing the string name of the emote. This call will return true to indicate that the emote was played successfully, or false otherwise.

Use the following code sample to play the Shrug emote:

```lua
local Players = game:GetService("Players")
local humanoid = Players.LocalPlayer.Character.Humanoid

humanoid:PlayEmote("Shrug")
```
