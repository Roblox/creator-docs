---
title: Merch Booth
description: The Merch Booth module lets you sell avatar assets, passes, and products directly in an experience.
---

The **MerchBooth** [developer module](../../resources/modules/index.md) lets you offer [avatar assets](../../art/accessories/index.md), [passes](../../production/monetization/game-passes.md), and [developer products](../../production/monetization/developer-products.md) for sale directly within your experience. Players can browse items, preview assets on their own avatar, purchase items, and instantly use or equip them&nbsp;— all without leaving your experience. This can help you [monetize](../../production/monetization/index.md) your experience and gain revenue through the 40% affiliate fee associated with selling other creators' items.

<video src="../../assets/developer-modules/merch-booth/Showcase.mp4" controls width="100%"></video>

<Alert severity="warning">
To offer assets created by third parties in the merch booth, make sure **Allow Third Party Sales** is enabled from the **Security** section of the [Game Settings](../../studio/game-settings.md) window. If this setting is disabled, you will not be able to sell UGC assets created by other users.
</Alert>

## Module Usage

### Installation

To use the **MerchBooth** module in an experience:

1. From the [View](../../studio/view-tab.md) tab, open the [Toolbox](../../projects/assets/toolbox.md) and select the **Creator Store** tab.

   <img src="../../assets/studio/general/View-Tab-Toolbox.png" width="776" alt="Toolbox toggle button in Studio" />

   <img src="../../assets/studio/toolbox/Creator-Store-Tab.png" width="360" />

1. Make sure the **Models** sorting is selected, then click the **See&nbsp;All** button for **Categories**.

   <img src="../../assets/studio/toolbox/Creator-Store-Categories-See-All.png" width="360" />

1. Locate and click the **Dev Modules** tile.

   <img src="../../assets/studio/toolbox/Creator-Store-Categories-Dev-Modules.png" width="200" />

1. Locate the **Merch Booth** module and click it, or drag-and-drop it into the 3D view.

   <img src="../../assets/developer-modules/merch-booth/Toolbox-Icon.png" width="143" />

1. In the [Explorer](../../studio/explorer.md) window, move the entire **MerchBooth** model into **ServerScriptService**. Upon running the experience, the module will distribute itself to various services and begin running.

   <img src="../../assets/developer-modules/merch-booth/Move-Package.png" width="320" />

### Configuration

The module is preconfigured to work for most use cases, but it can be easily customized through the [configure](#configure) function. For example, to create a lighter theme and disable the default **Filter** button in the upper-left area of the catalog view:

1. In **StarterPlayerScripts**, create a new `Class.LocalScript` and rename it to **ConfigureMerchBooth**.

   <img src="../../assets/developer-modules/merch-booth/LocalScript-ConfigureMerchBooth.png" width="320" />

1. Paste the following code into the new script.

   ```lua title='LocalScript - ConfigureMerchBooth' highlight='6-10'
   local ReplicatedStorage = game:GetService("ReplicatedStorage")

   local MerchBooth = require(ReplicatedStorage:WaitForChild("MerchBooth"))

   MerchBooth.configure({
   	backgroundColor = Color3.fromRGB(220, 210, 200),
   	textSize = 17,
   	textFont = Enum.Font.Fondamento,
   	textColor = Color3.fromRGB(20, 20, 20),
   	useFilters = false
   })
   ```

   <img src="../../assets/developer-modules/merch-booth/UI-Visual-Customization.jpg" width="800" />

### Adding Items

What's a merch booth without merch? The following sections outline how to add [avatar assets](#avatar-assets), [passes](#passes), and [developer products](#developer-products) to your merch booth.

#### Avatar Assets

Items such as [clothing and accessories](../../art/accessories/index.md) must be added through their **asset&nbsp;ID** located on the item's detail page in the [Avatar Shop](https://www.roblox.com/catalog).

1. Create a `Class.Script` within **ServerScriptService** and paste in the following code.

   ```lua title='Script - Add Avatar Assets'
   local ReplicatedStorage = game:GetService("ReplicatedStorage")

   local MerchBooth = require(ReplicatedStorage:WaitForChild("MerchBooth"))

   local items = {

   }

   for _, assetId in items do
   	local success, errorMessage = pcall(function()
   		MerchBooth.addItemAsync(assetId)
   	end)
   	if not success then
   		warn(errorMessage)
   	end
   end
   ```

1. Copy item asset IDs from their [Avatar Shop](https://www.roblox.com/catalog) website URL. For example, the ID of [Roblox Baseball Cap](https://www.roblox.com/catalog/607702162/Roblox-Baseball-Cap) is **607702162**.

   <img src="../../assets/developer-modules/merch-booth/Item-URL-Asset-ID.png" width="700" />

1. Paste each copied ID into a comma-delimited list within the `items` table. By default, items appear in the catalog view in alphabetical order, but you can customize sorting using [setCatalogSort](#setcatalogsort).

   ```lua title='Script - Add Avatar Assets' highlight='6-10'
   local ReplicatedStorage = game:GetService("ReplicatedStorage")

   local MerchBooth = require(ReplicatedStorage:WaitForChild("MerchBooth"))

   local items = {
   	607702162,  -- Roblox Baseball Cap
   	4819740796,  -- Robox
   	1374269,  -- Kitty Ears
   	11884330,  -- Nerd Glasses
   	10476359,  -- Paper Hat
   }

   for _, assetId in items do
   	local success, errorMessage = pcall(function()
   		MerchBooth.addItemAsync(assetId)
   	end)
   	if not success then
   		warn(errorMessage)
   	end
   end
   ```

   <Alert severity="info">
   This example uses assets owned by the Roblox account, but a thriving marketplace of incredible community-made assets is available [here](https://www.roblox.com/catalog?Category=13&Subcategory=40).
   </Alert>

#### Passes

Adding [passes](../../production/monetization/game-passes.md) requires pass IDs which can be located in the [Creator Dashboard](https://create.roblox.com/dashboard/creations).

1. Create a `Class.Script` within **ServerScriptService** and paste in the following code.

   ```lua title='Script - Add Passes'
   local ReplicatedStorage = game:GetService("ReplicatedStorage")

   local MerchBooth = require(ReplicatedStorage:WaitForChild("MerchBooth"))

   local items = {

   }

   for _, assetId in items do
   	local success, errorMessage = pcall(function()
   		MerchBooth.addItemAsync(assetId)
   	end)
   	if not success then
   		warn(errorMessage)
   	end
   end
   ```

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations) and select the experience.
1. In the left column, under **Monetization**, select **Passes**.

   <img src="../../assets/creator-dashboard/Experience-Nav-Monetization-Passes.png" width="330" />

1. Click the **&ctdot;** button for a pass and select **Copy Asset ID**.

   <img src="../../assets/creator-dashboard/Pass-Copy-Asset-ID.png" width="400" />

1. Paste each copied ID into a comma-delimited list within the `items` table **and** include `Enum.InfoType.GamePass` as the second parameter for [addItemAsync](#additemasync) to indicate that the items are passes. By default, items will appear in the catalog view in alphabetical order, but sorting can be customized via [setCatalogSort](#setcatalogsort).

   ```lua title='Script - Add Passes' highlight='6-7, 12'
   local ReplicatedStorage = game:GetService("ReplicatedStorage")

   local MerchBooth = require(ReplicatedStorage:WaitForChild("MerchBooth"))

   local items = {
   	4343758,  -- ColdFyre Armor
   	28521575,  -- Slime Shield
   }

   for _, assetId in items do
   	local success, errorMessage = pcall(function()
   		MerchBooth.addItemAsync(assetId, Enum.InfoType.GamePass)
   	end)
   	if not success then
   		warn(errorMessage)
   	end
   end
   ```

#### Developer Products

Adding [developer products](../../production/monetization/developer-products.md) requires product IDs which can be located in the [Creator Dashboard](https://create.roblox.com/dashboard/creations).

1. Create a `Class.Script` within **ServerScriptService** and paste in the following code.

   ```lua title='Script - Add Developer Products'
   local ReplicatedStorage = game:GetService("ReplicatedStorage")

   local MerchBooth = require(ReplicatedStorage:WaitForChild("MerchBooth"))

   local items = {

   }

   for _, assetId in items do
   	local success, errorMessage = pcall(function()
   		MerchBooth.addItemAsync(assetId)
   	end)
   	if not success then
   		warn(errorMessage)
   	end
   end
   ```

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations) and select the experience.
1. In the left column, under **Monetization**, select **Developer Products**.

   <img src="../../assets/creator-dashboard/Experience-Nav-Monetization-Developer-Products.png" width="330" />

1. Click the **&ctdot;** button for a product and select **Copy Asset ID**.

   <img src="../../assets/creator-dashboard/Developer-Product-Copy-Asset-ID.png" width="400" />

1. Paste each copied ID into a comma-delimited list within the `items` table **and** include `Enum.InfoType.Product` as the second parameter for [addItemAsync](#additemasync) to indicate that the items are developer products. By default, items appear in the catalog view in alphabetical order, but you can customize sorting using [setCatalogSort](#setcatalogsort).

   ```lua title='Script - Add Developer Products' highlight='6-7, 12'
   local ReplicatedStorage = game:GetService("ReplicatedStorage")

   local MerchBooth = require(ReplicatedStorage:WaitForChild("MerchBooth"))

   local items = {
   	1236602053,  -- Mana Refill
   	1257880672,  -- Healing Potion
   }

   for _, assetId in items do
   	local success, errorMessage = pcall(function()
   		MerchBooth.addItemAsync(assetId, Enum.InfoType.Product)
   	end)
   	if not success then
   		warn(errorMessage)
   	end
   end
   ```

### Custom Catalog Button

By default, a right-side **catalog button** lets players open the booth at any time.

<img src="../../assets/developer-modules/merch-booth/UI-Catalog-Button.jpg" width="800" />

In some cases, it may be useful to [remove](#togglecatalogbutton) this button and connect your own:

1. Create a new button as outlined in [Buttons](../../ui/buttons.md).
1. Create a `Class.LocalScript` as a child of the button object.

   <img src="../../assets/studio/explorer/LocalScript-In-TextButton.png" width="320" />

1. Paste the following code into the new script.

   ```lua title='LocalScript - Custom Catalog Button' highlight='6, 9-11'
   local ReplicatedStorage = game:GetService("ReplicatedStorage")

   local MerchBooth = require(ReplicatedStorage:WaitForChild("MerchBooth"))

   -- Remove the default catalog button
   MerchBooth.toggleCatalogButton(false)

   -- Connect the custom button
   script.Parent.Activated:Connect(function()
   	MerchBooth.openMerchBooth()
   end)
   ```

### Shoppable Regions

A helpful way to drive purchases in your experience is to automatically show the merch booth when a player enters an area.

<video src="../../assets/developer-modules/merch-booth/Shoppable-Regions.mp4" controls width="800"></video>

To create a shoppable region:

1. Create an `Class.BasePart.Anchored|Anchored` block that encompasses the detection region. Make sure the block is tall enough to collide with the `Class.Model.PrimaryPart|PrimaryPart` of character models (**HumanoidRootPart** by default).

   <img src="../../assets/developer-modules/merch-booth/Shoppable-Region-Part.jpg" width="80%" />
   <figcaption>Block to detect when players approach the front of the shop counter</figcaption>

1. Using the [Tags](../../studio/properties.md#instance-tags) section of the block's properties, or Studio's [Tag&nbsp;Editor](../../studio/view-tab.md#windows-and-tools), apply the tag `ShopRegion` to the block so that `Class.CollectionService` detects it.

1. Set the part's `Class.BasePart.Transparency|Transparency` to the maximum to hide it from players in the experience. Also disable its `Class.BasePart.CanCollide|CanCollide` and `Class.BasePart.CanQuery|CanQuery` properties so that objects do not physically collide with it and raycasts do not detect it.

   <Grid container spacing={3}>
   <Grid item>
   <img src="../../assets/developer-modules/merch-booth/Shoppable-Region-Transparency.png" width="320" />
   </Grid>
   <Grid item>
   <img src="../../assets/developer-modules/merch-booth/Shoppable-Region-Collision.png" width="320" />
   </Grid>
   </Grid>

1. Insert a new `Class.LocalScript` under **StarterPlayerScripts**.

   <img src="../../assets/developer-modules/merch-booth/LocalScript-In-StarterPlayerScripts.png" width="320" />

1. In the new script, paste the following code which uses the `Class.BasePart.Touched|Touched` and `Class.BasePart.TouchEnded|TouchEnded` events to detect when characters enter/leave the region and calls [openMerchBooth](#openmerchbooth) and [closeMerchBooth](#closemerchbooth) to open/close the booth GUI.

	```lua title='LocalScript' highlight='14, 21'
	local Players = game:GetService("Players")
	local ReplicatedStorage = game:GetService("ReplicatedStorage")
	local CollectionService = game:GetService("CollectionService")

	local MerchBooth = require(ReplicatedStorage:WaitForChild("MerchBooth"))

	-- Remove the default catalog button
	MerchBooth.toggleCatalogButton(false)

	local function setupRegion(region: BasePart)
		region.Touched:Connect(function(otherPart)
			local character = Players.LocalPlayer.Character
			if character and otherPart == character.PrimaryPart then
				MerchBooth.openMerchBooth()
			end
		end)

		region.TouchEnded:Connect(function(otherPart)
			local character = Players.LocalPlayer.Character
			if character and otherPart == character.PrimaryPart then
				MerchBooth.closeMerchBooth()
			end
		end)
	end

	-- Iterate through existing tagged shop regions
	for _, region in CollectionService:GetTagged("ShopRegion") do
		setupRegion(region)
	end
	-- Detect when non-streamed shop regions stream in
	CollectionService:GetInstanceAddedSignal("ShopRegion"):Connect(setupRegion)
	```

### Proximity Prompts

As an alternative to the 2D catalog view, you can add **proximity prompts** over in-experience objects. This encourages players to discover items in the 3D environment, preview them on their own avatar, purchase them, and instantly equip them. See [addProximityButton](#addproximitybutton) for details.

<video src="../../assets/developer-modules/merch-booth/Proximity-Prompts.mp4" controls width="800"></video>

<Alert severity="info">
If a player has opened an item view through a proximity prompt, it automatically closes when the player moves further away from the prompt object than its activation distance. If you want to keep the booth open regardless of the player's distance from the prompt, set `closeWhenFarFromPrompt` to `false` in a [configure](#configure) call.
</Alert>

### Changing the Equip Effect

By default, the merch booth shows a generic sparkle effect when a player equips an item from it. To change the effect, set `particleEmitterTemplate` to your own instance of a `Class.ParticleEmitter` in a [configure](#configure) call.

```lua title='LocalScript - ConfigureMerchBooth' highlight='5-10, 13'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local MerchBooth = require(ReplicatedStorage:WaitForChild("MerchBooth"))

local myParticleEmitter = Instance.new("ParticleEmitter")
myParticleEmitter.SpreadAngle = Vector2.new(22, 22)
myParticleEmitter.Lifetime = NumberRange.new(0.5, 1.5)
myParticleEmitter.Shape = Enum.ParticleEmitterShape.Sphere
myParticleEmitter.Transparency = NumberSequence.new(0, 1)
myParticleEmitter.RotSpeed = NumberRange.new(200, 200)

MerchBooth.configure({
	particleEmitterTemplate = myParticleEmitter
})
```

### GUI Visibility

By default, the merch booth hides all `Class.ScreenGui|ScreenGuis` and `Class.CoreGui|CoreGuis` when its UI appears, including the chat, leaderboard, and others included by Roblox. If you want to disable this behavior, set `hideOtherUis` to `false` in a [configure](#configure) call.

```lua title='LocalScript - ConfigureMerchBooth' highlight='5-7'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local MerchBooth = require(ReplicatedStorage:WaitForChild("MerchBooth"))

MerchBooth.configure({
	hideOtherUis = false
})
```

### Character Movement

It can be advantageous to prevent a character from moving while they are in the merch booth. This can be done by setting `disableCharacterMovement` to `true` in a [configure](#configure) call.

```lua title='LocalScript - ConfigureMerchBooth' highlight='5-7'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local MerchBooth = require(ReplicatedStorage:WaitForChild("MerchBooth"))

MerchBooth.configure({
	disableCharacterMovement = true
})
```

## API Reference

### Types

#### Item

Items in the merch booth are represented by a dictionary with the following key-value pairs. Items can be gathered through the [getItems](#getitems) function or the [itemAdded](#itemadded) event.

<table>
<thead>
	<tr>
		<th>Key</th>
		<th>Type</th>
		<th>Description</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>`assetId`</td>
		<td>number</td>
		<td>Catalog ID of the item, as passed to [addItemAsync](#additemasync).</td>
	</tr>
	<tr>
		<td>`title`</td>
		<td>string</td>
		<td>Item title as it appears in the catalog.</td>
	</tr>
	<tr>
		<td>`price`</td>
		<td>number</td>
		<td>Item price in Robux.</td>
	</tr>
	<tr>
		<td>`description`</td>
		<td>string</td>
		<td>Item description as it appears in the catalog.</td>
	</tr>
	<tr>
		<td>`assetType`</td>
		<td>string</td>
		<td>String representing the item's accessory type.</td>
	</tr>
	<tr>
		<td>`isOwned`</td>
		<td>bool</td>
		<td>Whether the current player owns the item.</td>
	</tr>
	<tr>
		<td>`creatorName`</td>
		<td>string</td>
		<td>Item creator as shown in the catalog.</td>
	</tr>
	<tr>
		<td>`creatorType`</td>
		<td>`Enum.CreatorType`</td>
		<td>Creator type for the item.</td>
	</tr>
</tbody>
</table>

### Enums

#### MerchBooth.Controls

Used along with [setControlKeyCodes](#setcontrolkeycodes) to customize the keys and gamepad buttons for interacting with the merch booth.

<table>
<thead>
	<tr>
		<th>Name</th>
		<th>Summary</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>`ProximityPrompts`</td>
		<td>Key and/or gamepad button to open the item view when [proximity prompts](#proximity-prompts) are configured.</td>
	</tr>
	<tr>
		<td>`OpenMerchBooth`</td>
		<td>Key and/or gamepad button to open the merch booth.</td>
	</tr>
	<tr>
		<td>`CloseMerchBooth`</td>
		<td>Key and/or gamepad button to close the merch booth.</td>
	</tr>
	<tr>
		<td>`Filter`</td>
		<td>Key and/or gamepad button to use the default **Filter** pulldown in the upper-left area of the catalog view.</td>
	</tr>
	<tr>
		<td>`ViewItem`</td>
		<td>Key and/or gamepad button to open a specific merch booth item view.</td>
	</tr>
</tbody>
</table>

```lua title='LocalScript' highlight='5-8'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local MerchBooth = require(ReplicatedStorage:WaitForChild("MerchBooth"))

MerchBooth.setControlKeyCodes(MerchBooth.Controls.ProximityPrompts, {
	keyboard = Enum.KeyCode.Q,
	gamepad = Enum.KeyCode.ButtonL1
})
```

### Functions

#### configure

<figcaption>
configure(config: `Library.table`)
</figcaption>

Overrides default client-side configuration options through the following keys/values in the `config` table. This function can only be called from a `Class.LocalScript`.

<Tabs>
<TabItem label="Appearance">

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
		<td>`backgroundColor`</td>
		<td>Main background color of the window (`Datatype.Color3`).</td>
		<td>[0, 0, 0]</td>
	</tr>
	<tr>
		<td>`cornerRadius`</td>
		<td>Corner radius for the main window (`Datatype.UDim`).</td>
		<td>(0, 16)</td>
	</tr>
	<tr>
		<td>`cornerRadiusSmall`</td>
		<td>Corner radius for elements inside the window (`Datatype.UDim`).</td>
		<td>(0, 8)</td>
	</tr>
	<tr>
		<td>`textFont`</td>
		<td>Font of "main text" such as prices, descriptions, and other general info (`Enum.Font`).</td>
		<td>`Enum.Font|Gotham`</td>
	</tr>
	<tr>
		<td>`textSize`</td>
		<td>Size of the main text.</td>
		<td>14</td>
	</tr>
	<tr>
		<td>`textColor`</td>
		<td>Color of the main text (`Datatype.Color3`).</td>
		<td>[255,&nbsp;255,&nbsp;255]</td>
	</tr>
	<tr>
		<td>`secondaryTextColor`</td>
		<td>Color used for some variations of the main text (`Datatype.Color3`).</td>
		<td>[153, 153, 158]</td>
	</tr>
	<tr>
		<td>`headerFont`</td>
		<td>Font of the header text used for the window title (`Enum.Font`).</td>
		<td>`Enum.Font|GothamMedium`</td>
	</tr>
	<tr>
		<td>`headerTextSize`</td>
		<td>Size of the header text used for the window title.</td>
		<td>18</td>
	</tr>
	<tr>
		<td>`titleFont`</td>
		<td>Font of the title text used for item names on the item detail page (`Enum.Font`).</td>
		<td>`Enum.Font|GothamBold`</td>
	</tr>
	<tr>
		<td>`titleTextSize`</td>
		<td>Size of the title text used for item names on the item detail page.</td>
		<td>28</td>
	</tr>
	<tr>
		<td>`buttonColor`</td>
		<td>Background color for larger buttons in a clickable state, such as the main purchase button in item view (`Datatype.Color3`).</td>
		<td>[255, 255, 255]</td>
	</tr>
	<tr>
		<td>`buttonTextColor`</td>
		<td>Text color for larger buttons in a clickable state, such as the main purchase button in item view (`Datatype.Color3`).</td>
		<td>[0, 0, 0]</td>
	</tr>
	<tr>
		<td>`secondaryButtonColor`</td>
		<td>Background color for smaller buttons such as the price buttons in catalog view or the **Try&nbsp;On** button (`Datatype.Color3`).</td>
		<td>[34, 34, 34]</td>
	</tr>
	<tr>
		<td>`secondaryButtonTextColor`</td>
		<td>Text color for smaller buttons such as the price buttons in catalog view or the **Try&nbsp;On** button (`Datatype.Color3`).</td>
		<td>[255, 255, 255]</td>
	</tr>
	<tr>
		<td>`inactiveButtonColor`</td>
		<td>Background color for all buttons in an un-clickable state (`Datatype.Color3`).</td>
		<td>[153, 153, 158]</td>
	</tr>
	<tr>
		<td>`inactiveButtonTextColor`</td>
		<td>Text color for all buttons in an un-clickable state (`Datatype.Color3`).</td>
		<td>[255, 255, 255]</td>
	</tr>
	<tr>
		<td>`particleEmitterTemplate`</td>
		<td>Optional custom `Class.ParticleEmitter` instance that appears and plays on equip.</td>
		<td></td>
	</tr>
</tbody>
</table>

</TabItem>
<TabItem label="Proximity Prompts">

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
		<td>`proximityButtonActivationDistance`</td>
		<td>Maximum distance a player's character can be from the [prompt](#proximity-prompts) adornee for the prompt to appear.</td>
		<td>10</td>
	</tr>
	<tr>
		<td>`proximityButtonExclusivity`</td>
		<td>`Enum.ProximityPromptExclusivity` specifying which prompts can be shown at the same time.</td>
		<td>`Enum.ProximityPromptExclusivity|OnePerButton`</td>
	</tr>
	<tr>
		<td>`proximityButtonOffset`</td>
		<td>Pixel offset applied to the prompt's UI (`Datatype.Vector2`).</td>
		<td>(0, 0)</td>
	</tr>
	<tr>
		<td>`proximityButtonPulseCount`</td>
		<td>How many "pulses" occur around proximity buttons before stopping.</td>
		<td>3</td>
	</tr>
</tbody>
</table>

</TabItem>
<TabItem label="Behavior">

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
		<td>`useFilters`</td>
		<td>Toggles on/off the **Filter** button shown in the catalog.</td>
		<td>true</td>
	</tr>
	<tr>
		<td>`disableCharacterMovement`</td>
		<td>If `true`, prevents character from moving while the merch booth is open.</td>
		<td>false</td>
	</tr>
	<tr>
		<td>`hideOtherUis`</td>
		<td>If `true`, the merch booth hides all `Class.ScreenGui|ScreenGuis` and `Class.CoreGui|CoreGuis` when its UI appears.</td>
		<td>true</td>
	</tr>
	<tr>
		<td>`closeWhenFarFromPrompt`</td>
		<td>If `true` **and** if the player has opened an item view through a proximity prompt, the merch booth will automatically close when the player moves further away from the prompt object than its activation distance.</td>
		<td>true</td>
	</tr>
</tbody>
</table>

</TabItem>
</Tabs>

```lua title='LocalScript'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local MerchBooth = require(ReplicatedStorage:WaitForChild("MerchBooth"))

MerchBooth.configure({
	backgroundColor = Color3.fromRGB(255, 255, 255),
	textSize = 16,
	textFont = Enum.Font.Roboto,
	textColor = Color3.fromRGB(20, 20, 20),
	hideOtherUis = false,
})
```

#### addItemAsync

<figcaption>
addItemAsync(assetId: `number`, productType: `Enum.InfoType`, hideFromCatalog: `boolean`)
</figcaption>

Asynchronously adds an item to the merch booth so that it's eligible for purchase in the experience. `assetId` is the item's asset ID, `productType` is the item's `Enum.InfoType` enum, and `hideFromCatalog` can be used to hide the item in the catalog view.

See [Adding Items](#adding-items) for details, as usage varies slightly for **assets** versus **game passes** or **developer products**.

<Alert severity="warning">
  This function can only be called from a `Class.Script` and it performs an asynchronous network call that may occasionally fail. As shown below, it's recommended that it be wrapped in `Global.LuaGlobals.pcall()` to catch and handle errors.
</Alert>

```lua title='Script - Add Avatar Assets' highlight='6-10, 15'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local MerchBooth = require(ReplicatedStorage:WaitForChild("MerchBooth"))

local items = {
	607702162,  -- Roblox Baseball Cap
	4819740796,  -- Robox
	1374269,  -- Kitty Ears
	11884330,  -- Nerd Glasses
	10476359,  -- Paper Hat
}

for _, assetId in items do
	local success, errorMessage = pcall(function()
		MerchBooth.addItemAsync(assetId)
	end)
	if not success then
		warn(errorMessage)
	end
end
```

```lua title='Script - Add Passes' highlight='6-7, 12'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local MerchBooth = require(ReplicatedStorage:WaitForChild("MerchBooth"))

local items = {
	4343758,  -- ColdFyre Armor
	28521575,  -- Slime Shield
}

for _, assetId in items do
	local success, errorMessage = pcall(function()
		MerchBooth.addItemAsync(assetId, Enum.InfoType.GamePass)
	end)
	if not success then
		warn(errorMessage)
	end
end
```

```lua title='Script - Add Developer Products' highlight='6-7, 12'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local MerchBooth = require(ReplicatedStorage:WaitForChild("MerchBooth"))

local items = {
	1236602053,  -- Mana Refill
	1257880672,  -- Healing Potion
}

for _, assetId in items do
	local success, errorMessage = pcall(function()
		MerchBooth.addItemAsync(assetId, Enum.InfoType.Product)
	end)
	if not success then
		warn(errorMessage)
	end
end
```

#### getItems

<figcaption>
getItems(): `Library.table`
</figcaption>

Returns a dictionary representing all of the currently registered items. Each key is an item's asset ID as a string, and each key's value is an [Item](#item). This function can only be called from a `Class.Script`.

```lua title='Script' highlight='9-10'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local MerchBooth = require(ReplicatedStorage:WaitForChild("MerchBooth"))

local success, errorMessage = pcall(function()
	MerchBooth.addItemAsync(4819740796)
end)
if success then
	local items = MerchBooth.getItems()
	print(items)
end
```

#### removeItem

<figcaption>
removeItem(assetId: `number`)
</figcaption>

Unregisters an item previously added with [addItemAsync](#additemasync), removing its tile in the catalog view and any [proximity prompts](#proximity-prompts) assigned to it. This function can only be called from a `Class.Script`.

```lua title='Script' highlight='6, 11'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local MerchBooth = require(ReplicatedStorage:WaitForChild("MerchBooth"))

local success, errorMessage = pcall(function()
	MerchBooth.addItemAsync(4819740796)
end)
if success then
	-- After some time, remove the item
	task.wait(5)
	MerchBooth.removeItem(4819740796)
end
```

#### addProximityButton

<figcaption>
addProximityButton(adornee: `Class.BasePart`|`Class.Model`|`Class.Attachment|Attachment`, assetId: `number`)
</figcaption>

Adds a [proximity prompt](#proximity-prompts) over the given `adornee` that will trigger the display of an item's purchase view, given its asset ID. This can be used as an alternative to the 2D catalog view, encouraging players to discover items in the 3D environment.

Note that an item must be added via [addItemAsync](#additemasync) before a proximity button can be assigned to it. See also [removeProximityButton](#removeproximitybutton) to remove the proximity prompt from an object.

<Alert severity="info">
When implementing proximity prompts, you may want to [remove the catalog button](#togglecatalogbutton) to eliminate its usage in opening the booth.
</Alert>

```lua title='Script' highlight='6, 11'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local MerchBooth = require(ReplicatedStorage:WaitForChild("MerchBooth"))

local success, errorMessage = pcall(function()
	MerchBooth.addItemAsync(4819740796)
end)
if success then
	local item = workspace:FindFirstChild("Robox")
	if item then
		MerchBooth.addProximityButton(item, 4819740796)
	end
end
```

#### removeProximityButton

<figcaption>
removeProximityButton(adornee: `Class.BasePart`|`Class.Model`|`Class.Attachment|Attachment`)
</figcaption>

Removes a [proximity prompt](#proximity-prompts) generated through [addProximityButton](#addproximitybutton). This function can only be called from a `Class.Script`.

```lua title='Script' highlight='11, 16'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local MerchBooth = require(ReplicatedStorage:WaitForChild("MerchBooth"))

local success, errorMessage = pcall(function()
	MerchBooth.addItemAsync(4819740796)
end)
if success then
	local item = workspace:FindFirstChild("Robox")
	if item then
		MerchBooth.addProximityButton(item, 4819740796)
	end

	-- After some time, remove the prompt
	task.wait(5)
	MerchBooth.removeProximityButton(item)
end
```

#### setCatalogSort

<figcaption>
setCatalogSort(sortFunction: `function`): `boolean`
</figcaption>

Sets the sorting function `sortFunction` to be used in the catalog view. The provided sorting function can use logic based on [Item](#item) info such as `price` or `title`. This function can only be called from a `Class.LocalScript`.

Here are some examples for sorting the catalog:

```lua title='Price Low-to-High' highlight='5-7'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local MerchBooth = require(ReplicatedStorage:WaitForChild("MerchBooth"))

MerchBooth.setCatalogSort(function(a, b)
	return a.price < b.price
end)
```

```lua title='Price High-to-Low' highlight='5-7'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local MerchBooth = require(ReplicatedStorage:WaitForChild("MerchBooth"))

MerchBooth.setCatalogSort(function(a, b)
	return a.price > b.price
end)
```

```lua title='Price Low-to-High & Alphabetical' highlight='5-7'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local MerchBooth = require(ReplicatedStorage:WaitForChild("MerchBooth"))

MerchBooth.setCatalogSort(function(a, b)
	return if a.price == b.price then a.title < b.title else a.price < b.price
end)
```

#### setControlKeyCodes

<figcaption>
setControlKeyCodes(control: [MerchBooth.Controls](#merchboothcontrols), keyCodes: `Library.table`)
</figcaption>

Configures the key and button values for interactions with the merch booth. The first parameter must be a [MerchBooth.Controls](#merchboothcontrols) enum and the second parameter a table containing the keys `keyboard` and/or `gamepad` with corresponding `Enum.KeyCode` enums.

<table>
<thead>
	<tr>
		<th>Enum (`control`)</th>
		<th>Default `keyCodes` Keys/Values</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>`MerchBooth.Controls.ProximityPrompts`</td>
<td>`keyboard = Enum.KeyCode.E`<br />`gamepad = Enum.KeyCode.ButtonY`</td>
	</tr>
	<tr>
		<td>`MerchBooth.Controls.OpenMerchBooth`</td>
		<td>`gamepad = Enum.KeyCode.ButtonY`</td>
	</tr>
	<tr>
		<td>`MerchBooth.Controls.CloseMerchBooth`</td>
		<td>`gamepad = Enum.KeyCode.ButtonB`</td>
	</tr>
	<tr>
		<td>`MerchBooth.Controls.Filter`</td>
		<td>`gamepad = Enum.KeyCode.ButtonX`</td>
	</tr>
	<tr>
		<td>`MerchBooth.Controls.ViewItem`</td>
		<td>`gamepad = Enum.KeyCode.ButtonA`</td>
	</tr>
</tbody>
</table>

```lua title='LocalScript' highlight='5-8'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local MerchBooth = require(ReplicatedStorage:WaitForChild("MerchBooth"))

MerchBooth.setControlKeyCodes(MerchBooth.Controls.ProximityPrompts, {
	keyboard = Enum.KeyCode.Q,
	gamepad = Enum.KeyCode.ButtonL1,
})
```

#### openMerchBooth

<figcaption>
openMerchBooth()
</figcaption>

Opens the merch booth window (if closed) and navigates to the catalog view. This function can only be called from a `Class.LocalScript`.

```lua title='LocalScript' highlight='12'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local MerchBooth = require(ReplicatedStorage:WaitForChild("MerchBooth"))

local success, errorMessage = pcall(function()
	MerchBooth.addItemAsync(assetId)
end)
if not success then
	warn(errorMessage)
end

MerchBooth.openMerchBooth()
```

#### openItemView

<figcaption>
openItemView(itemId: `number`)
</figcaption>

Navigates to the single item view of the given `itemId`, opening the merch booth window if it is currently closed. This function can only be called from a `Class.LocalScript`.

```lua title='LocalScript' highlight='6, 9'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local MerchBooth = require(ReplicatedStorage:WaitForChild("MerchBooth"))

local success, errorMessage = pcall(function()
	MerchBooth.addItemAsync(4819740796)
end)
if success then
	MerchBooth.openItemView(4819740796)
end
```

#### toggleCatalogButton

<figcaption>
toggleCatalogButton(enabled: `boolean`)
</figcaption>

Toggles on/off the catalog button on the right side of the screen. This is useful when implementing a [custom button](#custom-catalog-button) or limiting the merch booth's appearance to [regions](#shoppable-regions) or [proximity prompts](#proximity-prompts). Can only be called from a `Class.LocalScript`.

```lua title='LocalScript' highlight='5'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local MerchBooth = require(ReplicatedStorage:WaitForChild("MerchBooth"))

MerchBooth.toggleCatalogButton(false)
```

#### isMerchBoothOpen

<figcaption>
isMerchBoothOpen(): `Tuple`
</figcaption>

Returns `true` if either the catalog or the item view is open. If the item view is open, the item's asset ID is returned as the second value. This function can only be called from a `Class.LocalScript`.

```lua title='LocalScript' highlight='11-12'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local MerchBooth = require(ReplicatedStorage:WaitForChild("MerchBooth"))

local success, errorMessage = pcall(function()
	MerchBooth.addItemAsync(4819740796)
end)
if success then
	MerchBooth.openItemView(4819740796)

	local isOpen, itemId = MerchBooth.isMerchBoothOpen()
	print(isOpen, itemId)
end
```

#### closeMerchBooth

<figcaption>
closeMerchBooth()
</figcaption>

Closes the merch booth window. This function can only be called from a `Class.LocalScript`.

```lua title='LocalScript' highlight='5'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local MerchBooth = require(ReplicatedStorage:WaitForChild("MerchBooth"))

MerchBooth.closeMerchBooth()
```

#### isMerchBoothEnabled

<figcaption>
isMerchBoothEnabled(): `boolean`
</figcaption>

This function may be used in tandem with [setEnabled](#setenabled) to check whether the merch booth is currently enabled or not. Can only be called from a `Class.LocalScript`.

#### setEnabled

<figcaption>
setEnabled(enabled: `boolean`)
</figcaption>

Sets whether the entire merch booth is enabled or not. When disabled, this function removes the entire UI, including [proximity prompts](#proximity-prompts), and disconnects all [events](#events). This function can only be called from a `Class.LocalScript`.

```lua title='LocalScript' highlight='7'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local MerchBooth = require(ReplicatedStorage:WaitForChild("MerchBooth"))

local isEnabled = MerchBooth.isMerchBoothEnabled()
if isEnabled then
	MerchBooth.setEnabled(false)
end
```

### Events

#### itemAdded

Fires when an item is added through [addItemAsync](#additemasync). This event can only be connected in a `Class.Script`.

<table size="small">
<thead>
	<tr>
		<th colspan='2'>Parameters</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>assetId: `number`</td>
		<td>Item asset ID.</td>
	</tr>
	<tr>
		<td>itemInfo: `Library.table`</td>
		<td>Dictionary of [Item](#item) info such as `price` or `title`.</td>
	</tr>
</tbody>
</table>

```lua title='Script' highlight='5-8'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local MerchBooth = require(ReplicatedStorage:WaitForChild("MerchBooth"))

MerchBooth.itemAdded:Connect(function(assetId, itemInfo)
	print("Item added with asset ID of", assetId)
	print(itemInfo)
end)
```

#### itemRemoved

Fires when an item is removed through [removeItem](#removeitem). This event can only be connected in a `Class.Script`.

<table size="small">
<thead>
	<tr>
		<th colspan='2'>Parameters</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>assetId: `number`</td>
		<td>Item asset ID.</td>
	</tr>
</tbody>
</table>

```lua title='Script' highlight='5-7'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local MerchBooth = require(ReplicatedStorage:WaitForChild("MerchBooth"))

MerchBooth.itemRemoved:Connect(function(assetId)
	print("Item removed with asset ID of", assetId)
end)
```

#### merchBoothOpened

Fires when either the catalog **or** item detail view are opened.

```lua title='LocalScript' highlight='5-7'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local MerchBooth = require(ReplicatedStorage:WaitForChild("MerchBooth"))

MerchBooth.merchBoothOpened:Connect(function()
	print("Booth view opened")
end)
```

#### merchBoothClosed

Fires when either the catalog **or** item detail view are closed.

```lua title='LocalScript' highlight='5-7'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local MerchBooth = require(ReplicatedStorage:WaitForChild("MerchBooth"))

MerchBooth.merchBoothClosed:Connect(function()
	print("Booth view closed")
end)
```

#### catalogViewOpened

Fires when the catalog view is opened.

```lua title='LocalScript' highlight='5-7'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local MerchBooth = require(ReplicatedStorage:WaitForChild("MerchBooth"))

MerchBooth.catalogViewOpened:Connect(function()
	print("Catalog view opened")
end)
```

#### catalogViewClosed

Fires when the catalog view is closed.

```lua title='LocalScript' highlight='5-7'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local MerchBooth = require(ReplicatedStorage:WaitForChild("MerchBooth"))

MerchBooth.catalogViewClosed:Connect(function()
	print("Catalog view closed")
end)
```

#### itemViewOpened

Fires when the item detail view is opened.

```lua title='LocalScript' highlight='5-7'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local MerchBooth = require(ReplicatedStorage:WaitForChild("MerchBooth"))

MerchBooth.itemViewOpened:Connect(function()
	print("Item view opened")
end)
```

#### itemViewClosed

Fires when the item detail view is closed.

```lua title='LocalScript' highlight='5-7'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local MerchBooth = require(ReplicatedStorage:WaitForChild("MerchBooth"))

MerchBooth.itemViewClosed:Connect(function()
	print("Item view closed")
end)
```
