---
title: Scavenger Hunt
description: The Scavenger Hunt module gives players an inherently gamified way to explore an experience.
---

The **ScavengerHunt** [developer module](../../resources/modules/index.md) gives players an inherently gamified way to explore your experience, organically introducing them to the entire place. Player progress is persistent, so scavenger hunts can continue across sessions.

<video src="../../assets/developer-modules/scavenger-hunt/Showcase.mp4" controls width="100%"></video>

<Alert severity="warning">
This module utilizes [data stores](../../cloud-services/datastores.md). To test it in Studio, make sure **Enable Studio Access to API Services** is enabled from the **Security** section of the [Game Settings](../../studio/game-settings.md) window.
</Alert>

## Module Usage

### Installation

To use the **ScavengerHunt** module in an experience:

1. From the [View](../../studio/view-tab.md) tab, open the [Toolbox](../../projects/assets/toolbox.md) and select the **Creator Store** tab.

   <img src="../../assets/studio/general/View-Tab-Toolbox.png" width="776" alt="Toolbox toggle button in Studio" />

   <img src="../../assets/studio/toolbox/Creator-Store-Tab.png" width="360" />

1. Make sure the **Models** sorting is selected, then click the **See&nbsp;All** button for **Categories**.

   <img src="../../assets/studio/toolbox/Creator-Store-Categories-See-All.png" width="360" />

1. Locate and click the **Dev Modules** tile.

   <img src="../../assets/studio/toolbox/Creator-Store-Categories-Dev-Modules.png" width="200" />

1. Locate the **Scavenger Hunt** module and click it, or drag-and-drop it into the 3D view.

   <img src="../../assets/developer-modules/scavenger-hunt/Toolbox-Icon.png" width="143" />

1. In the [Explorer](../../studio/explorer.md) window, move the entire **ScavengerHunt** model into **ServerScriptService**. Upon running the experience, the module will distribute itself to various services and begin running.

   <img src="../../assets/developer-modules/scavenger-hunt/Move-Package.png" width="320" />

### Using Tokens

The scavenger hunt module uses **tokens** as the items which players search for and collect. The module comes with one token model that you can position in the 3D world.

1. Locate the **Token1** mesh inside the **Workspace** folder of the module's main folder.

   <img src="../../assets/developer-modules/scavenger-hunt/Token1-Explorer.png" width="320" />

1. Move **Token1** into the top-level **Workspace** hierarchy and position it where desired.
1. Give the token a **unique name**; this name is how the module tracks which tokens each player has collected.
1. To add more tokens, duplicate an existing token and give it a unique name.

If you don't want to use the bundled mesh tokens, any `Class.Model` or `Class.BasePart` will work, as long as it meets the following criteria:

- Object has a `Class.CollectionService` tag of `ScavengerHuntPart`. If desired, the `Class.CollectionService` tag name which the module utilizes can be changed by setting a different value for `tokenTag` in a [configureServer](#configureserver) call.
- Object contains a child `Class.StringValue` instance set to the "flavor&nbsp;text" to display when the token is collected.

  <Grid container spacing={3}>
	<Grid item>
	<figure>
   <img src="../../assets/developer-modules/scavenger-hunt/Token-Model-Structure.png" width="320" />
   <figcaption>Model</figcaption>
   </figure>
	</Grid>
	<Grid item>
	<figure>
   <img src="../../assets/developer-modules/scavenger-hunt/Token-BasePart-Structure.png" width="320" />
   <figcaption>MeshPart</figcaption>
   </figure>
	</Grid>
	</Grid>

<Alert severity="error">
Remember that each token must have a unique name as a means of tracking player progress.
</Alert>

<Alert severity="info">
The module will automatically disable the `Class.BasePart.CanCollide|CanCollide` property of tokens at runtime so that players do not physically collide with them. As such, all tokens should be **anchored** so they do not fall through the world geometry.
</Alert>

### Using Regions

Regions differ slightly from tokens, as large areas that are marked as "collected" once the player enters them. Additionally, when a player leaves the region, the flavor text modal automatically dismisses and the region itself is removed from the workspace.

1. Create an anchored part around the region, such as a block or sphere. The module will automatically disable the `Class.BasePart.CanCollide|CanCollide` property on runtime so players do not physically collide with the region.
1. Give it a **unique name**. This name is how the module tracks which regions each player has entered.
1. Using the [Tags](../../studio/properties.md#instance-tags) section of the part's properties, or Studio's [Tag&nbsp;Editor](../../studio/view-tab.md#windows-and-tools), apply the tag `ScavengerHuntPart` to the part so that `Class.CollectionService` detects it. If desired, the tag name which the module utilizes can be changed by setting a different value for `tokenTag` in a [configureServer](#configureserver) call.
1. Include a child `Class.StringValue` instance set to the "flavor&nbsp;text" to display when the region is entered.

   <img src="../../assets/developer-modules/scavenger-hunt/Region-Structure.png" width="320" />

<Alert severity="error">
Remember that each region must have a unique name as a means of tracking player progress.
</Alert>

### Configuration

The module is preconfigured to work for most use cases, but it can be easily customized. For example, to change the token rotation speed and customize the modal info message:

1. In **StarterPlayerScripts**, create a new `Class.LocalScript` and rename it to **ConfigureScavengerHunt**.
1. Paste the following code into the new script.

   ```lua title='LocalScript - ConfigureScavengerHunt' highlight='5-9'
   local ReplicatedStorage = game:GetService("ReplicatedStorage")

   local ScavengerHunt = require(ReplicatedStorage:WaitForChild("ScavengerHunt"))

   ScavengerHunt.configureClient({
   	infoModalText = "Welcome to my Scavenger Hunt!",
   	completeModalText = "Thanks for playing my Scavenger Hunt!",
   	tokenRotationSpeed = 60,
   })
   ```

### Collection Events

Every time a player collects a token or enters a region, the [collected](#collected) event fires. You can listen to this event from a server-side `Class.Script` and respond accordingly. The connected function receives the `Class.Player` that collided with the token or entered the region and that token or region's name.

Similarly, when a player collects **all** tokens or enters **all** tagged regions, the [allCollected](#allcollected) event fires and the connected function receives the associated `Class.Player`. This function is only fired once per player and it can be used to reward that player with a [badge](../../production/publishing/badges.md), access to a new area, [in-experience currency](../../production/monetization/developer-products.md), etc.

```lua title='Script' highlight='5-7, 9-11'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local ScavengerHunt = require(ReplicatedStorage:WaitForChild("ScavengerHunt"))

ScavengerHunt.collected:Connect(function(player, itemName)
	print(player.DisplayName, itemName)
end)

ScavengerHunt.allCollected:Connect(function(player)
	print(player.DisplayName .. " completed the hunt!")
end)
```

### Custom GUI

This module exposes several options to customize its default GUI, but you can opt to display custom GUI elements instead.

When `useCustomModals` is set to `true` in the [configureClient](#configureclient) function, the [showInfoModal](#showinfomodal) event fires every time the player activates the token tracker. Similarly, the [showCompleteModal](#showcompletemodal) event fires when the player has collected everything in the scavenger hunt. Both of these events can be listened to in a `Class.LocalScript`.

```lua title='LocalScript' highlight='6-10, 12-16'
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local ScavengerHunt = require(ReplicatedStorage:WaitForChild("ScavengerHunt"))

ScavengerHunt.showInfoModal:Connect(function()
	-- Show a custom info modal
	local infoModal = Players.LocalPlayer.PlayerGui.ScavengerInfoModal
	infoModal.Enabled = true
end)

ScavengerHunt.showCompleteModal:Connect(function()
	-- Show a custom complete modal
	local completeModal = Players.LocalPlayer.PlayerGui.ScavengerCompleteModal
	completeModal.Enabled = true
end)
```

<Alert severity="warning">
When using custom modals, be sure to provide a way for players to close/hide them, or an automatic dismissal after a delay.
</Alert>

### GUI Visibility

By default, the scavenger hunt hides all `Class.ScreenGui|ScreenGuis` and `Class.CoreGui|CoreGuis` (except for the player list) when the info modal or completion modal appears. If you want to override this auto-hiding behavior and programmatically decide which GUIs should remain visible, include the [hideOtherGuis](#hideotherguis) and [showOtherGuis](#showotherguis) callbacks and respond with your own custom logic.

```lua title='LocalScript' highlight='24, 37'
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local StarterGui = game:GetService("StarterGui")

local ScavengerHunt = require(ReplicatedStorage:WaitForChild("ScavengerHunt"))

local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")
local hiddenInstances = {}

-- Create a screen GUI that will not be hidden
local specialGuiInstance = Instance.new("ScreenGui")
-- Draw the screen GUI above the scavenger hunt GUI
specialGuiInstance.DisplayOrder = 1
specialGuiInstance.Parent = playerGui
-- Add text label to the GUI
local specialLabel = Instance.new("TextLabel")
specialLabel.Size = UDim2.fromScale(1, 0.1)
specialLabel.Text = "Remains visible when displaying modals"
specialLabel.Font = Enum.Font.GothamMedium
specialLabel.TextSize = 24
specialLabel.Parent = specialGuiInstance

ScavengerHunt.hideOtherGuis(function()
	-- Hide all developer-defined screen GUIs
	local instances = playerGui:GetChildren()
	for _, instance in instances do
		if instance:IsA("ScreenGui") and not instance.Name == "ScavengerHunt" and instance.Enabled then
			instance.Enabled = false
			table.insert(hiddenInstances, instance)
		end
	end
	-- Hide specific core GUIs
	StarterGui:SetCoreGuiEnabled(Enum.CoreGuiType.PlayerList, false)
end)

ScavengerHunt.showOtherGuis(function()
	-- Show all developer-defined screen GUIs that were hidden
	for _, instance in hiddenInstances do
		instance.Enabled = true
	end
	hiddenInstances = {}
	-- Show specific core GUIs that were hidden
	StarterGui:SetCoreGuiEnabled(Enum.CoreGuiType.PlayerList, true)
end)
```

## API Reference

### Functions

#### configureClient

<figcaption>
configureClient(config: `Library.table`)
</figcaption>

Overrides default client-side configuration options through the following keys/values in the `config` table. This function can only be called from a `Class.LocalScript`.

<Tabs>
<TabItem label="General">

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
		<td>`autoDismissTime`</td>
		<td>Time in seconds before the modal automatically dismisses itself or navigates to the next page if there is one. Set to 0 to disable.</td>
		<td>20</td>
	</tr>
	<tr>
		<td>`closeModalGamepad`</td>
		<td>Gamepad button used to close modals (`Enum.KeyCode`).</td>
		<td>`Enum.KeyCode|ButtonA`</td>
	</tr>
	<tr>
		<td>`closeModalKeyboard`</td>
		<td>Keyboard key used to close modals (`Enum.KeyCode`).</td>
		<td>`Enum.KeyCode|E`</td>
	</tr>
	<tr>
		<td>`completeModalText`</td>
		<td>Text to show on the modal that appears after clicking the token tracker when the scavenger hunt is complete.</td>
		<td>"Thanks for participating!"</td>
	</tr>
	<tr>
		<td>`infoModalText`</td>
		<td>Text to show on the modal that appears after clicking the token tracker.</td>
		<td>"Find all the tokens to complete the hunt"</td>
	</tr>
	<tr>
		<td>`tokenRotationSpeed`</td>
		<td>Speed at which the tokens rotate, in degrees per second. Set to 0 to prevent rotation.</td>
		<td>20</td>
	</tr>
	<tr>
		<td>`nextArrowImage`</td>
		<td>Image used to indicate there are more modal pages to show after the current modal page.</td>
		<td>"rbxassetid://8167172095"</td>
	</tr>
	<tr>
		<td>`openTokenTrackerGamepad`</td>
		<td>Gamepad button used to show the modals that appear after activating the token tracker (`Enum.KeyCode`).</td>
		<td>`Enum.KeyCode|ButtonY`</td>
	</tr>
	<tr>
		<td>`openTokenTrackerKeyboard`</td>
		<td>Keyboard key used to show the modals that appear after activating the token tracker (`Enum.KeyCode`).</td>
		<td>`Enum.KeyCode|Y`</td>
	</tr>
	<tr>
		<td>`openTokenTrackerGamepadButtonImage`</td>
		<td>Image for the gamepad button that is used to activate the token tracker.</td>
		<td>"rbxassetid://8025860488"</td>
	</tr>
	<tr>
		<td>`regionIcon`</td>
		<td>Icon to display next to the token tracker when entering regions.</td>
		<td>"rbxassetid://8073794624"</td>
	</tr>
	<tr>
		<td>`tokenIcon`</td>
		<td>Icon to display next to the token tracker when collecting tokens.</td>
		<td>"rbxassetid://8073794477"</td>
	</tr>
	<tr>
		<td>`tokenTrackerPositionSmallDevice`</td>
		<td>Position of the token tracker UI on small devices such as phones (`Datatype.UDim2`).</td>
		<td>(1, 0, 0, 84)</td>
	</tr>
	<tr>
		<td>`tokenTrackerPositionLargeDevice`</td>
		<td>Position of the token tracker UI on larger devices like tablets and PC (`Datatype.UDim2`).</td>
		<td>(1, 0, 1, -16)</td>
	</tr>
	<tr>
		<td>`useRegions`</td>
		<td>Instead of [tokens](#using-tokens), use [regions](#using-regions).</td>
		<td>false</td>
	</tr>
</tbody>
</table>

</TabItem>
<TabItem label="Modals">

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
		<td>`modal.backgroundColor`</td>
		<td>Background color of the modals (`Datatype.Color3`).</td>
		<td>[0, 0, 0]</td>
	</tr>
	<tr>
		<td>`modal.font`</td>
		<td>Font of the text that appears in a modal (`Enum.Font`).</td>
		<td>`Enum.Font|GothamMedium`</td>
	</tr>
	<tr>
		<td>`modal.textColor`</td>
		<td>Color of the text that appears in a modal (`Datatype.Color3`).</td>
		<td>[255, 255, 255]</td>
	</tr>
	<tr>
		<td>`modal.textSize`</td>
		<td>Size of the text that appears in a modal.</td>
		<td>16</td>
	</tr>
	<tr>
		<td>`useCustomModals`</td>
		<td>If true, default modals are not displayed. This lets you show custom modals as outlined in [Custom GUI](#custom-gui).</td>
		<td>false</td>
	</tr>
	<tr>
		<td>`useCustomTokenTracker`</td>
		<td>If true, the default token tracker is not displayed. This lets you show a custom token tracker GUI instead.</td>
		<td>false</td>
	</tr>
</tbody>
</table>

</TabItem>
<TabItem label="Navigation Beam">

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
		<td>`showNavigationBeam`</td>
		<td>If true, a `Class.Beam` from the player to the nearest token will be shown.</td>
		<td>true</td>
	</tr>
	<tr>
		<td>`navigationBeam.color`</td>
		<td>`Datatype.ColorSequence` defining the beam's color across its segments. See `Class.Beam.Color` for details.</td>
		<td>[255, 255, 255] &rarr; [255,&nbsp;255,&nbsp;255]</td>
	</tr>
	<tr>
		<td>`navigationBeam.curveSize0`</td>
		<td>Position of the first control point in the beam's Bézier curve. See `Class.Beam.CurveSize0` for more info.</td>
		<td>0</td>
	</tr>
	<tr>
		<td>`navigationBeam.curveSize1`</td>
		<td>Position of the second control point in the beam's Bézier curve. See `Class.Beam.CurveSize1` for more info.</td>
		<td>0</td>
	</tr>
	<tr>
		<td>`navigationBeam.faceCamera`</td>
		<td>Whether the beam's segments will always face the camera regardless of its orientation. See `Class.Beam.FaceCamera` for details.</td>
		<td>true</td>
	</tr>
	<tr>
		<td>`navigationBeam.lightEmission`</td>
		<td>Degree to which the colors of the beam are blended with the colors behind it. See `Class.Beam.LightEmission` for details.</td>
		<td>0</td>
	</tr>
	<tr>
		<td>`navigationBeam.lightInfluence`</td>
		<td>Degree to which the beam is influenced by the environment's lighting. See `Class.Beam.LightInfluence` for details.</td>
		<td>0</td>
	</tr>
	<tr>
		<td>`navigationBeam.segments`</td>
		<td>How many straight segments the beam is made up of.</td>
		<td>10</td>
	</tr>
	<tr>
		<td>`navigationBeam.texture`</td>
		<td>Asset ID of the texture to be displayed on the beam.</td>
		<td>"rbxassetid://8081777495"</td>
	</tr>
	<tr>
		<td>`navigationBeam.textureLength`</td>
		<td>Length of the beam's texture, depending on the setting for `navigationBeam.textureMode`. See `Class.Beam.TextureLength` for details.</td>
		<td>1</td>
	</tr>
	<tr>
		<td>`navigationBeam.textureMode`</td>
		<td>Manner in which the beam texture scales and repeats (`Enum.TextureMode`).</td>
		<td>`Enum.TextureMode|Wrap`</td>
	</tr>
	<tr>
		<td>`navigationBeam.textureSpeed`</td>
		<td>Speed at which the texture image moves along the beam.</td>
		<td>1</td>
	</tr>
	<tr>
		<td>`navigationBeam.transparency`</td>
		<td>`Datatype.NumberSequence` defining the beam's transparency across its segments. See `Class.Beam.Transparency` for details.</td>
		<td>(0, 0) &rarr; (0.15, 1) &rarr; (1, 1)</td>
	</tr>
	<tr>
		<td>`navigationBeam.width0`</td>
		<td>Width of the beam at its base, in studs.</td>
		<td>1</td>
	</tr>
	<tr>
		<td>`navigationBeam.width1`</td>
		<td>Width of the beam at its end, in studs.</td>
		<td>1</td>
	</tr>
	<tr>
		<td>`navigationBeam.zOffset`</td>
		<td>Distance, in studs, by which the beam's display is offset, relative to the camera.</td>
		<td>0</td>
	</tr>
</tbody>
</table>

</TabItem>
</Tabs>

```lua title='LocalScript'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local ScavengerHunt = require(ReplicatedStorage:WaitForChild("ScavengerHunt"))

ScavengerHunt.configureClient({
	infoModalText = "Welcome to my Scavenger Hunt!",
	completeModalText = "Thanks for playing my Scavenger Hunt!",
	tokenRotationSpeed = 60,
	navigationBeam = {
		lightEmission = 1
	},
	modal = {
		textSize = 14
	},
})
```

#### configureServer

<figcaption>
configureServer(config: `Library.table`)
</figcaption>

Overrides default server-side configuration options through the following keys/values in the `config` table. This function can only be called from a `Class.Script`.

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
		<td>`tokenTag`</td>
		<td>Tag used by `Class.CollectionService` to find all the tokens or regions used in the scavenger hunt.</td>
		<td>"ScavengerHuntPart"</td>
	</tr>
	<tr>
		<td>`datastoreName`</td>
		<td>Name of the `Class.DataStore` used by the scavenger hunt to store each player's collection progress.</td>
		<td>"ScavengerHuntTokens"</td>
	</tr>
	<tr>
		<td>`resetOnPlayerRemoving`</td>
		<td>If true, resets the user's progress when they leave the experience; convenient for not saving progress while testing the scavenger hunt.</td>
		<td>false</td>
	</tr>
</tbody>
</table>

```lua title='Script' highlight='5-7'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local ScavengerHunt = require(ReplicatedStorage:WaitForChild("ScavengerHunt"))

ScavengerHunt.configureServer({
	tokenTag = "GreenGem",
})
```

#### disable

<figcaption>
disable()
</figcaption>

Hides all UI for the scavenger hunt, disconnects all input event listeners, and prevents players from collecting tokens or interacting with regions. This function can only be called from a `Class.Script`.

```lua title='Script' highlight='5'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local ScavengerHunt = require(ReplicatedStorage:WaitForChild("ScavengerHunt"))

ScavengerHunt.disable()
```

#### enable

<figcaption>
enable()
</figcaption>

Shows all UI for the scavenger hunt, connects all input event listeners, and allows players to collect tokens and interact with regions. This function can only be called from a `Class.Script`.

```lua title='Script' highlight='5'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local ScavengerHunt = require(ReplicatedStorage:WaitForChild("ScavengerHunt"))

ScavengerHunt.enable()
```

### Events

#### collected

Fires when a player collides with a token or enters a region. The connected function will receive the `Class.Player` that collided with the token or entered the region and the name of the token that was collided into or the region that was entered. This event can only be connected in a `Class.Script`.

<table size="small">
<thead>
	<tr>
		<th colspan='2'>Parameters</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>player: `Class.Player`</td>
		<td>User who collided with a token or entered a region.</td>
	</tr>
	<tr>
		<td>itemName: `Library.string` </td>
		<td>Name of the token that was collided into or the region that was entered.</td>
	</tr>
	<tr>
		<td>totalCollected: `number`</td>
		<td>Total number of tokens collected by the user represented by `player`.</td>
	</tr>
</tbody>
</table>

```lua title='Script' highlight='5-7'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local ScavengerHunt = require(ReplicatedStorage:WaitForChild("ScavengerHunt"))

ScavengerHunt.collected:Connect(function(player, itemName, totalCollected)
	print(player.DisplayName, itemName, totalCollected)
end)
```

#### allCollected

Fires when a player collects all tokens or enters all regions in the scavenger hunt. The connected function will receive the `Class.Player` that collected all tokens, and it is only ever fired once per player. This event can only be connected in a `Class.Script`.

<table size="small">
<thead>
	<tr>
		<th colspan='2'>Parameters</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>player: `Class.Player`</td>
		<td>Player who collected all tokens or entered all regions.</td>
	</tr>
</tbody>
</table>

```lua title='Script' highlight='5-7'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local ScavengerHunt = require(ReplicatedStorage:WaitForChild("ScavengerHunt"))

ScavengerHunt.allCollected:Connect(function(player)
	print(player.DisplayName .. " completed the hunt!")
end)
```

#### showInfoModal

Fires when the player clicks on the token tracker when the `useCustomModals` [configuration](#configureclient) option is set to true. This event can only be connected in a `Class.LocalScript`.

```lua title='LocalScript' highlight='6-9'
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local ScavengerHunt = require(ReplicatedStorage:WaitForChild("ScavengerHunt"))

ScavengerHunt.showInfoModal:Connect(function()
	local infoModal = Players.LocalPlayer.PlayerGui.InfoModal
	infoModal.Enabled = true
end)
```

#### showCompleteModal

Fires when the player clicks on the token tracker when the `useCustomModals` [configuration](#configureclient) option is set to `true` and the player has collected all tokens in the scavenger hunt. This event can only be connected in a `Class.LocalScript`.

```lua title='LocalScript' highlight='6-9'
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local ScavengerHunt = require(ReplicatedStorage:WaitForChild("ScavengerHunt"))

ScavengerHunt.showCompleteModal:Connect(function()
	local completeModal = Players.LocalPlayer.PlayerGui.CompleteModal
	completeModal.Enabled = true
end)
```

### Callbacks

#### hideOtherGuis

<figcaption>
hideOtherGuis(callback: `function`)
</figcaption>

This callback runs immediately before a modal is displayed, letting you disable entire `Class.ScreenGui|ScreenGuis` or elements within them before the modal is shown. See [GUI Visibility](#gui-visibility) for details and sample code.

#### showOtherGuis

<figcaption>
showOtherGuis(callback: `function`)
</figcaption>

This callback runs immediately after a modal has been dismissed, letting you enable entire `Class.ScreenGui|ScreenGuis` or elements within them. See [GUI Visibility](#gui-visibility) for details and sample code.
