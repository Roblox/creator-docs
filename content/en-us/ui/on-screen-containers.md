---
title: On-screen UI containers
description: Learn how to display UI objects on a user's screen.
---

import DefaultUI from '../includes/ui/default-ui.md'
import ScreenInsets from '../includes/ui/screen-insets.md'

The `Class.ScreenGui` container holds `Class.GuiObject|GuiObjects` to display on a player's screen, including [frames](../ui/frames.md), [labels](../ui/labels.md), [buttons](../ui/buttons.md), and more. All on‑screen UI objects and code are stored and changed on the client.

<figure>
<img src="../assets/ui/ui-objects/ScreenGui-Example.jpg" width="840" alt="Example ScreenGui with various GuiObject children, including a Frame, TextLabel, TextBox, and ImageButton." />
<Alert severity="info">
For UI containers that hold `Class.GuiObject|GuiObjects` that you want to display **within** the 3D world, such as on the face of a part, see [In-Experience UI Containers](../ui/in-experience-containers.md).
</Alert>
</figure>

To display a `Class.ScreenGui` and its child `Class.GuiObject|GuiObjects` to every player who joins the experience, place it inside the `Class.StarterGui` container. When a player joins an experience and their character first spawns, the `Class.ScreenGui` and its contents clone into the `Class.PlayerGui` container for that player, located within the `Class.Players` container.

<img src="../assets/ui/ui-objects/StarterGui-To-PlayerGui.png" width="840" alt="Diagram of how a ScreenGui clones from StarterGui to a player's PlayerGui" />

<Alert severity="success">
By default, `Class.GuiObject|GuiObjects` inside a `Class.ScreenGui` within `Class.StarterGui` appear as an overlay of the [3D&nbsp;viewport](../studio/ui-overview.md#3d-viewport), simulating their appearance and position in a running experience. To hide all such screen overlays, toggle off **GUI&nbsp;overlay** from the [Visualization&nbsp;Options](../studio/ui-overview.md#visualization-options) widget in the upper‑right corner of the 3D viewport.
</Alert>

<Alert severity="info">
If `Class.Players.CharacterAutoLoads` is disabled, the contents of `Class.StarterGui` will not be cloned until `Class.Player:LoadCharacter()` is called.
</Alert>

As an experience grows in scope, you may require multiple screen interfaces such as a title screen, settings menu, shop interface, and more. In such cases, you can place multiple unique `Class.ScreenGui` containers inside `Class.StarterGui` and toggle each container's `Class.ScreenGui.Enabled|Enabled` property depending on whether it should be visible and active (while `false`, contents will not render, process user input, or update in response to changes).

<img src="../assets/ui/ui-objects/ScreenGuis-Enabled.png" width="760" alt="Explorer hierarchy showing multiple ScreenGui containers, one enabled and the others disabled, in order to control which are visible at a given time." />

The `Class.ScreenGui.Enabled|Enabled` property can be initially toggled through the [Properties](../studio/properties.md) window and/or you can set it during playtime from a client‑side script by [accessing](#access-player-ui) the player's `Class.PlayerGui` and setting it to `true` or `false` for the desired container(s).

<Alert severity="info">
When using multiple `Class.ScreenGui` interfaces, you can layer them by Z‑index through their `Class.ScreenGui.DisplayOrder|DisplayOrder` property. See [Display Order](#display-order) for more information.
</Alert>

## Container properties

The following properties let you customize the [screen insets](#screen-insets) across multiple devices, the [display order](#display-order) when using multiple screen containers, and more.

### Screen insets

<ScreenInsets components={props.components} />

### Display order

When using multiple `Class.ScreenGui` interfaces, you can layer them by Z‑index through their `Class.ScreenGui.DisplayOrder|DisplayOrder` property. For example, to display a modal settings menu on one `Class.ScreenGui` in front of the experience's main user interface on another `Class.ScreenGui`, assign a higher `Class.ScreenGui.DisplayOrder|DisplayOrder` to the modal's than the underlying interface's.

### Reset on spawn

The `Class.ScreenGui.ResetOnSpawn|ResetOnSpawn` boolean property determines if the `Class.ScreenGui` resets (deletes itself and re‑clones into the player's `Class.PlayerGui`) every time the player's character respawns.

<table>
<thead>
  <tr>
    <th>Condition</th>
    <th>Resets</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.ScreenGui.ResetOnSpawn|ResetOnSpawn` is `true` (default).</td>
    <td><Chip label="YES" size="small" variant="outlined" color="success" /></td>
  </tr>
	<tr>
    <td>The `Class.ScreenGui` is an **indirect** descendant of `Class.StarterGui`; for example it's placed inside a `Class.Folder` located within `Class.StarterGui`.</td>
    <td><Chip label="YES" size="small" variant="outlined" color="success" /></td>
  </tr>
	<tr>
    <td>`Class.ScreenGui.ResetOnSpawn|ResetOnSpawn` is `false` **and** the `Class.ScreenGui` is a **direct** descendant of `Class.StarterGui`.</td>
    <td><Chip label="NO" size="small" variant="outlined" color="warning" /></td>
  </tr>
</tbody>
</table>

## Access player UI

As noted, parenting a `Class.ScreenGui` to `Class.StarterGui` clones it and its child `Class.GuiObject|GuiObjects` into a player's `Class.PlayerGui` container when they join the experience and their character first spawns.

If you need to control a player's UI container during playtime, for example to show/hide a specific `Class.ScreenGui` or any of its children, access it as follows from a `Class.LocalScript`:

```lua title="LocalScript - Accessing a Player's UI"
local Players = game:GetService("Players")

local player = Players.LocalPlayer
local playerGui = player.PlayerGui

local titleScreen = playerGui:WaitForChild("TitleScreen")
local settingsMenu = playerGui:WaitForChild("SettingsMenu")

titleScreen.Enabled = false  -- Hide title screen
settingsMenu.Enabled = true  -- Show settings menu
```

## Disable default UI

<DefaultUI components={props.components} />
