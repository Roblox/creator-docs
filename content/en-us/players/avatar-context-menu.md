---
title: Avatar Context Menu
description: The Avatar Context Menu (ACM) allows users to interact and customize actions with others in their experience.
---

The **Avatar Context Menu** (ACM) makes it easier for users to interact with each other. When the ACM is enabled in your experience, a user can walk up to another user's character and click on them to open a small menu with several default options. The player can send a connection request, begin a private chat, view the user's profile, or wave.

After [enabling](#enable-the-avatar-context-menu) the ACM in your experience, you can customize the ACM in the following ways:

- Programmatically [open and close](#open-and-close-the-acm) the ACM for specific users.
- [Add](#add-menu-options) custom options and [remove](#remove-menu-options) existing options to the ACM.
- [Customize the ACM appearance](#customize-menu-appearance) to create a unique user interface.

## Enable the Avatar Context Menu

The Avatar Context Menu must be enabled using the `Class.StarterGui:SetCore()` option "AvatarContextMenuEnabled" in a `Class.LocalScript`. The ACM is best used in experiences where there is no predefined behavior for clicking on other users.

Use the following code sample to enable the ACM in a `Class.LocalScript`:

```lua
-- Run in a LocalScript, ideally within "StarterPlayerScripts"
local StarterGui = game:GetService("StarterGui")
StarterGui:SetCore("AvatarContextMenuEnabled", true)
```

If you need to detect whether the ACM is enabled, you can use the following code to return a boolean on the current status of the ACM:

```lua
---Returns a boolean indicating if the ACM is currently enabled.
StarterGui:GetCore(AvatarContextMenuEnabled)
```

## Open and close the ACM

Once enabled, you can open and close the ACM programmatically with `Class.StarterGui`.

To programmatically open the ACM, use the following code:

```lua
-- Use StarterGui:SetCore where targetPlayer is a valid Player object
StarterGui:SetCore("AvatarContextMenuTarget", targetPlayer)
```

To programmatically close the ACM, use the following code:

```lua
StarterGui:SetCore("AvatarContextMenuTarget", nil)
```

## Menu options

You can [add](#add-menu-options) and [remove](#remove-menu-options) actions through scripting. By default, the menu has the following options:

<table>
<thead>
  <tr>
    <th>Menu option</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Connection</td>
    <td>Sends a connection request to the selected user.</td>
  </tr>
  <tr>
    <td>Chat</td>
    <td>Opens a private conversation with the selected user in the in-experience chat.</td>
  </tr>
  <tr>
    <td>View</td>
    <td>Opens a window to inspect the selected user's appearance.</td>
  </tr>
  <tr>
    <td>Wave</td>
    <td>Initiates a wave animation to the selected user. </td>
  </tr>
</tbody>
</table>

Once the ACM is open, the user can scroll and select other users on the character selection carousel. Characters are sorted based on distance to the selected character. The menu only updates when opened and the list of available users will repeat when scrolling.

<img src="../assets/avatar/context-menu/ACM-User-Selector.png" width="345" />

### Add menu options

Once enabled, experience-specific actions can be added to the ACM. For example, an experience might allow for trade requests, add-to-party options, or other special interactions.

The following example shows how to add a custom action to the Avatar Context Menu:

```lua
local Players = game:GetService("Players")
local StarterGui = game:GetService("StarterGui")
local player = Players.LocalPlayer

-- Connect a function to a "BindableEvent"
local bindableEvent = Instance.new("BindableEvent")
local function onCustomACMAction(targetPlayer)
	-- At this point, you could call InvokeServer() on a RemoteFunction to alert the server of the selection
	print("ACM event selected by " .. player.Name .. " on " .. targetPlayer.Name)
end
bindableEvent.Event:Connect(onCustomACMAction)

-- Add the ACM option using SetCore() with "AddAvatarContextMenuOption"
local options = {"Custom ACM Action", bindableEvent}
StarterGui:SetCore("AddAvatarContextMenuOption", options)
```

### Remove menu options

You can remove custom and the default Add Friend, Chat, View, and Wave options from the ACM by referencing the custom Action name or the default `Enum.AvatarContextMenuOption` enum.

Use the following code to remove a default and custom menu option:

```lua
-- Remove the "Custom ACM Action" option
StarterGui:SetCore("RemoveAvatarContextMenuOption", "Custom ACM Action")

-- Remove the default "Friend" option by referencing the AvatarContextMenuOption.Friend Enum
StarterGui:SetCore("RemoveAvatarContextMenuOption", Enum.AvatarContextMenuOption.Friend)
```

<Alert severity ='warning'>
You can not make edits to the ACM while it is open. Your code should verify that an action is still relevant in case the action was removed from the menu. For example, if a marketplace area adds an option to send trade requests, you should verify both users are still in the marketplace.
</Alert>

## Customize menu appearance

To change the appearance of the Avatar Context Menu, call `Class.StarterGui:SetCore()` with the option "AvatarContextMenuTheme", providing a table of parameters and values to adjust the menu appearance.

The ACM user interface includes the following sections:

<img src="../assets/avatar/context-menu/ACM-Sections-Labeled.png" width="404" />

A. Name Tag: The user name of the character being interacted with.

B. Button Frame: Contains all of the ACM buttons.

C. Buttons: Individual buttons for the default or custom ACM actions.

### Appearance parameters

These are the customization parameters with the ACM:

#### Background

<table>
<tbody>
  <tr>
    <td>BackgroundColor</td>
    <td>A `Datatype.Color3` for the overall background of the ACM (most useful when not using a background image).</td>
  </tr>
  <tr>
    <td>BackgroundTransparency</td>
    <td>Transparency value (0–1) for the overall background of the ACM (most useful when not using a background image).</td>
  </tr>
  <tr>
    <td>BackgroundImage</td>
    <td>A valid asset ID of an image for the ACM background.</td>
  </tr>
  <tr>
    <td>BackgroundImageTransparency</td>
    <td>Transparency value (0–1) for the background image.</td>
  </tr>
  <tr>
    <td>BackgroundImageScaleType</td>
    <td>A `Enum.ScaleType` enum for background image scaling.</td>
  </tr>
  <tr>
    <td>BackgroundImageSliceCenter</td>
    <td>A `Datatype.Rect` specifying the center of a nine-slice image when BackgroundImageScaleType is set to `Enum.ScaleType.Slice`.</td>
  </tr>
</tbody>
</table>

#### Name tag

<table>
<tbody>
  <tr>
    <td>NameTagColor</td>
    <td>A `Datatype.Color3` for the bar showing which player is being interacted with.</td>
  </tr>
  <tr>
    <td>NameUnderlineColor</td>
    <td>A `Datatype.Color3` for the thin line between the name tag and action buttons.</td>
  </tr>
</tbody>
</table>

#### Button frame

<table>
<tbody>
  <tr>
    <td>ButtonFrameColor</td>
    <td>A `Datatype.Color3` for the section (frame) containing the action buttons.</td>
  </tr>
  <tr>
    <td>ButtonFrameTransparency	</td>
    <td>Transparency value (0–1) for the button frame section.</td>
  </tr>
</tbody>
</table>

#### Button

<table>
<tbody>
  <tr>
    <td>ButtonColor</td>
    <td>A `Datatype.Color3` for the background of the ACM action buttons.</td>
  </tr>
  <tr>
    <td>ButtonTransparency</td>
    <td>Transparency value (0–1) for the background color of the action buttons.</td>
  </tr>
  <tr>
    <td>ButtonHoverColor</td>
    <td>A `Datatype.Color3` for the "hover" state of the action buttons.</td>
  </tr>
  <tr>
    <td>ButtonHoverTransparency</td>
    <td>Transparency value (0–1) for the "hover" color of the action buttons.</td>
  </tr>
  <tr>
    <td>ButtonUnderlineColor</td>
    <td>A `Datatype.Color3` for the thin line which separates each action button.</td>
  </tr>
  <tr>
    <td>ButtonImage</td>
    <td>A valid asset ID of an image for the background of buttons.</td>
  </tr>
  <tr>
    <td>ButtonImageScaleType</td>
    <td>A `Enum.ScaleType` enum for button image scaling.</td>
  </tr>
  <tr>
    <td>ButtonImageSliceCenter</td>
    <td>A `Datatype.Rect` specifying the center of a nine-slice image when ButtonImageScaleType is set to `Enum.ScaleType.Slice`.</td>
  </tr>
</tbody>
</table>

#### Text

<table>
<tbody>
  <tr>
    <td>Font</td>
    <td>A `Enum.Font` enum value for the name tag and button text.</td>
  </tr>
  <tr>
    <td>TextColor</td>
    <td>A `Datatype.Color3` for all text within the ACM.</td>
  </tr>
  <tr>
    <td>TextScale</td>
    <td>A float value to scale the default text sizes of each element.</td>
  </tr>
</tbody>
</table>

#### Various image

<table>
<tbody>
   <tr>
    <td>LeaveMenuImage</td>
    <td>An asset ID of an image for the ACM close button.</td>
  </tr>
  <tr>
    <td>ScrollLeftImage</td>
    <td>An asset ID of an image for the carousel "scroll left" button.</td>
  </tr>
  <tr>
    <td>ScrollRightImage</td>
    <td>A valid asset ID of an image for the carousel "scroll right" button.</td>
  </tr>
</tbody>
</table>

#### Selected character

<table>
<tbody>
  <tr>
    <td>SelectedCharacterIndicator</td>
    <td>The `Class.MeshPart` which floats above a character's head to indicate they are selected.</td>
  </tr>
</tbody>
</table>

#### Size and position

<table>
<tbody>
  <tr>
    <td>Size</td>
    <td>A `Datatype.UDim2` for the overall size of the ACM.</td>
  </tr>
  <tr>
    <td>MinSize</td>
    <td>A `Datatype.Vector2` specifying the minimum size of the ACM.</td>
  </tr>
  <tr>
    <td>MaxSize</td>
    <td>A `Datatype.Vector2` specifying the maximum size of the ACM.</td>
  </tr>
  <tr>
    <td>AspectRatio</td>
    <td>A float value specifying the relative width and height of the ACM.</td>
  </tr>
  <tr>
    <td>AnchorPoint</td>
    <td>The `Class.GuiObject.AnchorPoint|AnchorPoint` of the ACM.</td>
  </tr>
  <tr>
    <td>OnScreenPosition</td>
    <td>A `Datatype.UDim2` specifying the on-screen position of the ACM (the position where it tweens to when opened).</td>
  </tr>
  <tr>
    <td>OffScreenPosition</td>
    <td>A `Datatype.UDim2` specifying the off-screen position of the ACM (the position where it tweens from/to when opened/closed).</td>
  </tr>
</tbody>
</table>

### Example customization

The following code sample customizes the ACM theme using some basic parameters:

```lua
local StarterGui = game:GetService("StarterGui")

StarterGui:SetCore("AvatarContextMenuTheme", {
	BackgroundImage = "",
	BackgroundTransparency = 0.5,
	BackgroundColor = Color3.fromRGB(111, 145, 242),
	NameTagColor = Color3.fromRGB(0, 0, 200),
	NameUnderlineColor = Color3.fromRGB(213, 233, 255),
	ButtonFrameColor = Color3.fromRGB(15, 24, 65),
	ButtonFrameTransparency = 0.2,
	ButtonUnderlineColor = Color3.fromRGB(213, 233, 255),
	Font = Enum.Font.SciFi
})
```

<img src="../assets/avatar/context-menu/Custom-ACM.png" width="345" />
