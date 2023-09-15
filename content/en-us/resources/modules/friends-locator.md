---
title: Friends Locator
description: The Friends Locator module lets players easily find and teleport to their friends inside a place.
---

It can be challenging to locate friends in-experience. The **FriendsLocator** [developer module](../../resources/modules/index.md) lets players easily find and teleport to their friends inside a place.

<video src="../../assets/developer-modules/friends-locator/Showcase.mp4" controls
width="100%" />

## Module Usage

### Installation

To use the **FriendsLocator** module in an experience:

1. From the **View** tab, open the [Toolbox](../../projects/assets/toolbox.md) and select the **Marketplace** tab.

   <img src="../../assets/studio/general/View-Tab-Toolbox.png" width="760" alt="Toolbox toggle button in Studio" />

   <img src="../../assets/studio/toolbox/Marketplace-Tab.png" width="360" />

1. Make sure the **Models** sorting is selected, then click the **See&nbsp;All** button for **Categories**.

   <img src="../../assets/studio/toolbox/Marketplace-Categories-See-All.png" width="360" />

1. Locate and click the **DEV MODULES** tile.

   <img src="../../assets/studio/toolbox/Marketplace-Categories-Dev-Modules.png" width="200" />

1. Locate the **Friends Locator** module and click it, or drag-and-drop it into the 3D view.

   <img src="../../assets/developer-modules/friends-locator/Toolbox-Icon.png" width="143" />

1. In the **Explorer** window, move the entire **FriendsLocator** model into **ServerScriptService**. Upon running the experience, the module will distribute itself to various services and begin running.

   <img src="../../assets/developer-modules/friends-locator/Move-Package.png" width="320" />

### Testing in Studio

To test the module in Studio, the **FriendsLocator** module must be run in a multi-client simulation, since no friends will be present in a solo playtest.

1. In **StarterPlayerScripts**, create a new `Class.LocalScript` and rename it **ConfigureFriendsLocator**.

   <img src="../../assets/developer-modules/friends-locator/LocalScript-ConfigureFriendsLocator.png" width="320" />

1. Paste the following code into the new **ConfigureFriendsLocator** script. The `showAllPlayers` setting within the [configure](#configure) function ensures that locators are shown for all users while testing in Studio, but not in a published place.

   ```lua title='LocalScript - ConfigureFriendsLocator'
   local RunService = game:GetService("RunService")
   local ReplicatedStorage = game:GetService("ReplicatedStorage")

   local FriendsLocator = require(ReplicatedStorage:WaitForChild("FriendsLocator"))

   FriendsLocator.configure({
   	showAllPlayers = RunService:IsStudio(),  -- Allows for debugging in Studio
   })
   ```

1. From the [Test](../../studio/test-tab.md) tab, select the following combination for **Clients&nbsp;and&nbsp;Servers**, then click the **Start** button. Three new instances of Studio will open; one simulated server and two simulated clients.

   <img src="../../assets/developer-modules/friends-locator/Clients-Servers-Start.png" width="800" />

1. Go into either of the **client** Studio instances, move a distance of 100 studs away from the other character, and you should see a **locator&nbsp;icon** appear over its head.

   <img src="../../assets/developer-modules/friends-locator/Testing-On-Client.jpg" width="800" />

   <Alert severity="info">
   Due to the way user IDs are handled in Studio, avatar images will not appear on the locator icons during testing.
   </Alert>

   <Alert severity="warning">
   By default, interacting with an icon will teleport your character to that friend's location. Currently, experiences using `Class.Workspace.StreamingEnabled|StreamingEnabled` should implement custom content pre-streaming around the teleport location, although this behavior will be built into future versions of the module.
   </Alert>

### Connecting to Events

The **FriendsLocator** module exposes [events](#events) so that you can introduce custom behaviors when users interact with a locator icon.

1. Make sure that you've created the **ConfigureFriendsLocator** script outlined in [Testing&nbsp;in&nbsp;Studio](#testing-in-studio).
2. Add lines 8 and 11-13 to the script:

   ```lua title='LocalScript - ConfigureFriendsLocator' highlight='8,11-13'
   local RunService = game:GetService("RunService")
   local ReplicatedStorage = game:GetService("ReplicatedStorage")

   local FriendsLocator = require(ReplicatedStorage:WaitForChild("FriendsLocator"))

   FriendsLocator.configure({
   	showAllPlayers = RunService:IsStudio(),  -- Allows for debugging in Studio
   	teleportToFriend = false,  -- Prevent teleport on icon click/tap
   })

   FriendsLocator.clicked:Connect(function(player, playerCFrame)
   	print("You clicked on locator icon for", player.DisplayName)
   end)
   ```

3. Conduct a [multi-client test](#testing-in-studio) and click on another character's locator icon. Notice that your character does not teleport to that location, and the event triggers to allow for custom handling of icon clicks.

### Custom Locator UI

If the default style does not fit your experience, you can replace the default avatar portrait UI with your own UI.

<img src="../../assets/developer-modules/friends-locator/Custom-UI-Example.jpg" width="80%" />

To replace the default UI:

1. Create a new `Class.ScreenGui` instance inside the **StarterGui** container.

   <img src="../../assets/studio/explorer/StarterGui-ScreenGui.png" width="320" />

1. Create a `Class.Frame` instance named **FriendLocator** as a child of the new `Class.ScreenGui`, then add elements like `Class.ImageLabel|ImageLabels`, `Class.TextLabel|TextLabels` to design your custom UI.

   <img src="../../assets/developer-modules/friends-locator/Custom-UI-Objects-In-Frame.png" width="320" />

1. When finished, **disable** the parent `Class.ScreenGui` so that the module doesn't show the custom locator UI until needed.

   <img src="../../assets/developer-modules/friends-locator/Custom-UI-ScreenGui-Disabled.png" width="320" />

1. **(Optional)** If you want the friend's avatar portrait and `Class.Player.DisplayName|DisplayName` to show up somewhere in the custom UI, you can place the following instances inside the **FriendLocator** frame.

   - An `Class.ImageLabel` of the name **Portrait**.
   - A `Class.TextLabel` of the name **DisplayName**.

   <img src="../../assets/developer-modules/friends-locator/Custom-UI-Portrait-DisplayName.png" width="320" />

   The module will look for these items and display the friend's avatar portrait and/or display name respectively.

## API Reference

### Functions

#### configure

<p style={{borderRadius:"4px;",backgroundColor:"#3b3b3b;"}}><InlineCode>configure(config:</InlineCode>`Library.table`<InlineCode>):</InlineCode>`nil`</p>

Overrides default configuration options through the following keys/values in the `config` table.

<table>
<thead>
	<tr>
		<th>Key</th>
		<th>Description</th>
		<th>Default</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>`alwaysOnTop`</td>
		<td>If `true`, shows locator icons on top of everything, preventing them from being blocked by 3D world objects.</td>
		<td>true</td>
	</tr>
	<tr>
		<td>`showAllPlayers`</td>
		<td>If `true`, shows locations for all players, not just friends; this can help verify the module's functionality in Studio.</td>
		<td>false</td>
	</tr>
	<tr>
		<td>`teleportToFriend`</td>
		<td>Teleports player character to the friend's location when their locator icon is clicked or tapped.</td>
		<td>true</td>
	</tr>
	<tr>
		<td>`thresholdDistance`</td>
		<td>Camera distance threshold at which locator icons appear; friends closer than this distance will not display icons.</td>
		<td>100</td>
	</tr>
	<tr>
		<td>`maxLocators`</td>
		<td>Maximum number of locator icons shown at any given time.</td>
		<td>10</td>
	</tr>
</tbody>
</table>

```lua title='LocalScript - ConfigureFriendsLocator' highlight='5-11'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local FriendsLocator = require(ReplicatedStorage:WaitForChild("FriendsLocator"))

FriendsLocator.configure({
	alwaysOnTop = true,
	showAllPlayers = false,
	teleportToFriend = true,
	thresholdDistance = 100,
	maxLocators = 10
})
```

### Events

#### clicked

<p style={{borderRadius:"4px;",backgroundColor:"#3b3b3b;"}}><InlineCode>clicked(player:</InlineCode>`Class.Player`<InlineCode>, playerCFrame:</InlineCode>`Datatype.CFrame`<InlineCode>):</InlineCode> `Datatype.RBXScriptSignal`</p>

Fires when a locator icon is clicked/activated by the local player. This event can only be connected in a `Class.LocalScript`.

<table>
<thead>
	<tr>
		<th colspan='2'>**Parameters**</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>player: `Class.Player`</td>
		<td>Player that the locator icon belongs to.</td>
	</tr>
	<tr>
		<td>playerCFrame: `Datatype.CFrame`</td>
		<td>`Datatype.CFrame` of the player's `Class.Humanoid.RootPart` that the locator icon belongs to.</td>
	</tr>
</tbody>
</table>

```lua title='LocalScript' highlight='5-7'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local FriendsLocator = require(ReplicatedStorage:WaitForChild("FriendsLocator"))

FriendsLocator.clicked:Connect(function(player, playerCFrame)
	print("You clicked on locator icon for", player.DisplayName, "at position", playerCFrame.Position)
end)
```

#### visibilityChanged

<p style={{borderRadius:"4px;",backgroundColor:"#3b3b3b;"}}><InlineCode>visibilityChanged(player:</InlineCode>`Class.Player`<InlineCode>, playerCFrame:</InlineCode>`Datatype.CFrame`<InlineCode>, isVisible:</InlineCode>`boolean`<InlineCode>):</InlineCode> `Datatype.RBXScriptSignal`</p>

Fires when a locator icon is shown/hidden on the local player's screen. This event can only be connected in a `Class.LocalScript`.

<table>
<thead>
	<tr>
		<th colspan='2'>**Parameters**</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>player: `Class.Player`</td>
		<td>`Class.Player` object that the locator icon belongs to.</td>
	</tr>
	<tr>
		<td>playerCFrame:&nbsp;`Datatype.CFrame`</td>
		<td>`Datatype.CFrame` of the player's `Class.Humanoid.RootPart` that the locator icon belongs to.</td>
	</tr>
	<tr>
		<td>isVisible: `boolean`</td>
		<td>Whether the locator icon is currently visible on the local player's screen. Note that this will still be `true` if [`alwaysOnTop`](#configure) is `false` and the locator renders behind an object in the 3D world.</td>
	</tr>
</tbody>
</table>

```lua title='LocalScript' highlight='5-7'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local FriendsLocator = require(ReplicatedStorage:WaitForChild("FriendsLocator"))

FriendsLocator.visibilityChanged:Connect(function(player, playerCFrame, isVisible)
	print("Visibility of locator icon for", player.DisplayName, ":", isVisible)
end)
```
