---
title: Surface Art
description: The Surface Art module lets players literally leave their mark in an experience.
---

Players often enjoy feeling like they're a part of constructing the space they're in. The **SurfaceArt** [developer module](../../resources/modules/index.md) lets players literally leave their mark in an experience.

<video src="../../assets/developer-modules/surface-art/Showcase.mp4" controls width="100%"></video>

<Alert severity="warning">
By default, a player can place 2 pieces of art across all of the tagged surfaces in the workspace. All of a player's art will be removed when they leave the game.
</Alert>

## Module Usage

### Installation

To use the **SurfaceArt** module in an experience:

1. From the [View](../../studio/view-tab.md) tab, open the [Toolbox](../../projects/assets/toolbox.md) and select the **Creator Store** tab.

   <img src="../../assets/studio/general/View-Tab-Toolbox.png" width="776" alt="Toolbox toggle button in Studio" />

   <img src="../../assets/studio/toolbox/Creator-Store-Tab.png" width="360" />

1. Make sure the **Models** sorting is selected, then click the **See&nbsp;All** button for **Categories**.

   <img src="../../assets/studio/toolbox/Creator-Store-Categories-See-All.png" width="360" />

1. Locate and click the **Dev Modules** tile.

   <img src="../../assets/studio/toolbox/Creator-Store-Categories-Dev-Modules.png" width="200" />

1. Locate the **Surface Art** module and click it, or drag-and-drop it into the 3D view.

   <img src="../../assets/developer-modules/surface-art/Toolbox-Icon.png" width="143" />

1. In the [Explorer](../../studio/explorer.md) window, move the entire **SurfaceArt** model into **ServerScriptService**. Upon running the experience, the module will distribute itself to various services and begin running.

   <img src="../../assets/developer-modules/surface-art/Move-Package.png" width="320" />

### Positioning the Canvas

The module comes with one **SurfaceCanvas** model that you can position in the 3D world. This model is what players will interact with to place art on its surface.

1. Locate the **SurfaceCanvas** mesh inside the **Workspace** folder of the module's main folder.

   <img src="../../assets/developer-modules/surface-art/Bundled-Mesh-Explorer.png" width="320" />

1. Move it into the top-level **Workspace** hierarchy and position it where desired.

   <img src="../../assets/developer-modules/surface-art/Position-Canvas.jpg" width="800" />

1. Upon publishing/running a test session, players will be able to interact with the object via a `Class.ProximityPrompt` and place art on the defined surface.

   <img src="../../assets/developer-modules/surface-art/SurfaceArt-UI.jpg" width="800" />

<Alert severity="info">
	It is not required that you use the packaged mesh for placing art. The module uses `Class.CollectionService` to locate parts tagged as `SurfaceCanvas` and make them operate as canvases. Any tagged canvas must be a `Class.BasePart` and it should have an [attribute](../../studio/properties.md#instance-attributes) defining the surface face as outlined in [Changing the Canvas Face](#changing-the-canvas-face).
</Alert>

### Changing the Canvas Face

Under the hood, the module uses a `Class.SurfaceGui` to display art items. To configure which surface the art appears on:

1. Select the **SurfaceCanvas** mesh.
1. At the bottom of the **Properties** window, locate the **SurfaceCanvasFace** attribute with a default value of **Right**.

   <img src="../../assets/developer-modules/surface-art/Canvas-Attribute.png" width="320" />

1. Click the attribute and enter one of six values that describe a `Enum.NormalId`.

<table>
<thead>
	<tr>
		<th>Attribute Value</th>
		<th>Corresponding Normal ID</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>**Front**</td>
		<td>`Enum.NormalId.Front`</td>
	</tr>
	<tr>
		<td>**Back**</td>
		<td>`Enum.NormalId.Back`</td>
	</tr>
	<tr>
		<td>**Right**</td>
		<td>`Enum.NormalId.Right`</td>
	</tr>
	<tr>
		<td>**Left**</td>
		<td>`Enum.NormalId.Left`</td>
	</tr>
	<tr>
		<td>**Top**</td>
		<td>`Enum.NormalId.Top`</td>
	</tr>
	<tr>
		<td>**Bottom**</td>
		<td>`Enum.NormalId.Bottom`</td>
	</tr>
</tbody>
</table>

### Using Custom Art Assets

<Alert severity="info">
Currently, the surface art module only supports using the same set of assets for all tagged canvases.
</Alert>

To better fit the theme of your experience, you may use your own set of custom assets instead of the defaults. This can be done via the [configure](#configure) function, called from a `Class.Script` in **ServerScriptService**.

```lua title='Script' highlight='5-14, 16-18'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local SurfaceArt = require(ReplicatedStorage:WaitForChild("SurfaceArt"))

local customAssets = {
	CustomAsset1 = {
		name = "Custom Asset 1",
		assetId = "rbxassetid://7322508294",
	},
	CustomAsset2 = {
		name = "Custom Asset 2",
		assetId = "rbxassetid://7322547665",
	},
}

SurfaceArt.configure({
	assets = customAssets,
})
```

### Clearing All Canvases

To remove all existing art from all canvases in the world, call the [removeAllArt](#removeallart) function from a `Class.Script`.

```lua title='Script' highlight='5'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local SurfaceArt = require(ReplicatedStorage:WaitForChild("SurfaceArt"))

SurfaceArt.removeAllArt()
```

### Showing Custom Effects

There may be cases where you'd like to include additional visual effects when an artwork is placed. This module exposes an event called [artChanged](#artchanged) on the client that you can connect to and add your own logic.

```lua title='LocalScript' highlight='22'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local SurfaceArt = require(ReplicatedStorage:WaitForChild("SurfaceArt"))

local function createParticleEmitter(canvas, position)
	local attachment = Instance.new("Attachment")
	attachment.Position = canvas.CFrame:PointToObjectSpace(position)
	attachment.Axis = Vector3.new(0, 0, 1)
	attachment.SecondaryAxis = Vector3.new(1, 0, 0)
	attachment.Parent = canvas

	local particleEmitter = Instance.new("ParticleEmitter")
	particleEmitter.Speed = NumberRange.new(50)
	particleEmitter.Rate = 50
	particleEmitter.Color = ColorSequence.new(Color3.fromRGB(128, 254, 7))
	particleEmitter.SpreadAngle = Vector2.new(35, 35)
	particleEmitter.Parent = attachment

	return attachment
end

SurfaceArt.artChanged:Connect(function(canvas, spot, spotPosition, artId, ownerId)
	if artId then
		-- Show some sparkles for 3 seconds
		task.spawn(function()
			local emitterAttachment = createParticleEmitter(canvas, spotPosition)
			task.wait(3)
			emitterAttachment:Destroy()
		end)
	end
end)
```

## API Reference

### Types

#### SurfaceArtAsset

Images to be used as art for the canvas are represented by a table with two values.

<table>
<thead>
	<tr>
		<th>Key</th>
		<th>Description</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>`name`</td>
		<td>Metadata display name.</td>
	</tr>
	<tr>
		<td>`assetId`</td>
		<td>Asset ID of the image to include.</td>
	</tr>
</tbody>
</table>

### Functions

#### configure

<figcaption>
configure(config: `Library.table`)
</figcaption>

Overrides default configuration options through the following keys/values in the `config` table. This function can only be called from a `Class.Script`.

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
		<td>`enabled`</td>
		<td>Toggles the module's functionality on or off.</td>
		<td>true</td>
	</tr>
	<tr>
		<td>`assets`</td>
		<td>List of [SurfaceArtAsset](#surfaceartasset) types.</td>
		<td>(see&nbsp;code&nbsp;below)</td>
	</tr>
	<tr>
		<td>`quotaPerPlayer`</td>
		<td>Maximum number of art pieces that can be placed by each player.</td>
		<td>2</td>
	</tr>
</tbody>
</table>

</TabItem>
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
		<td>`rowsPerCanvas`</td>
		<td>Number of rows in the canvas grid.</td>
		<td>2</td>
	</tr>
	<tr>
		<td>`colsPerCanvas`</td>
		<td>Number of columns in the canvas grid.</td>
		<td>5</td>
	</tr>
	<tr>
		<td>`itemsPerPage`</td>
		<td>Number of items to skip when paging left and right.</td>
		<td>3</td>
	</tr>
	<tr>
		<td>`canvasPaddingLeft`</td>
		<td>Left padding for the surface canvas (`Datatype.UDim`).</td>
		<td>(0, 8)</td>
	</tr>
	<tr>
		<td>`canvasPaddingRight`</td>
		<td>Right padding for the surface canvas (`Datatype.UDim`).</td>
		<td>(0, 8)</td>
	</tr>
	<tr>
		<td>`canvasPaddingTop`</td>
		<td>Top padding for the surface canvas (`Datatype.UDim`).</td>
		<td>(0, 8)</td>
	</tr>
	<tr>
		<td>`canvasPaddingBottom`</td>
		<td>Bottom padding for the surface canvas (`Datatype.UDim`).</td>
		<td>(0, 8)</td>
	</tr>
	<tr>
		<td>`promptImage`</td>
		<td>Icon shown in the proximity prompt to enter art selection view.</td>
		<td>"rbxassetid://8076723774"</td>
	</tr>
	<tr>
		<td>`leftArrowPageImage`</td>
		<td>Image for the left arrow to flip to the previous page.</td>
		<td>"rbxassetid://6998633654"</td>
	</tr>
	<tr>
		<td>`leftArrowItemImage`</td>
		<td>Image for the left arrow to select the previous art item.</td>
		<td>"rbxassetid://8072765021"</td>
	</tr>
	<tr>
		<td>`rightArrowPageImage`</td>
		<td>Image for the right arrow to flip to the next page.</td>
		<td>"rbxassetid://6998635824"</td>
	</tr>
	<tr>
		<td>`rightArrowItemImage`</td>
		<td>Image for the right arrow to select the next art item.</td>
		<td>"rbxassetid://8072764852"</td>
	</tr>
</tbody>
</table>

</TabItem>
<TabItem label="Interaction">

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
		<td>`promptKeyCode`</td>
		<td>Keyboard shortcut used to activate the prompt to enter art selection (`Enum.KeyCode`).</td>
		<td>`Enum.KeyCode|E`</td>
	</tr>
	<tr>
		<td>`promptRequiresLineOfSight`</td>
		<td>Boolean value that determines if the proximity prompt has to be in line of sight between user and canvas.</td>
		<td>true</td>
	</tr>
	<tr>
		<td>`promptMaxActivationDistance`</td>
		<td>Maximum distance a player's character can be from the canvas for the prompt to appear.</td>
		<td>10</td>
	</tr>
	<tr>
		<td>`promptExclusivity`</td>
		<td>`Enum.ProximityPromptExclusivity` specifying which prompts can be shown at the same time.</td>
		<td>`Enum.ProximityPromptExclusivity|OnePerButton`</td>
	</tr>
	<tr>
		<td>`usePageHotkeys`</td>
		<td>Whether page hotkeys are used. If true, `nextPageKey` and `prevPageKey` are used to cycle between pages.</td>
		<td>true</td>
	</tr>
	<tr>
		<td>`nextPageKey`</td>
		<td>Key used to cycle to the next page of artwork (`Enum.KeyCode`).</td>
		<td>`Enum.KeyCode|E`</td>
	</tr>
	<tr>
		<td>`nextItemKey`</td>
		<td>Key used to cycle to the next item of artwork (`Enum.KeyCode`).</td>
		<td>`Enum.KeyCode|Right`</td>
	</tr>
	<tr>
		<td>`prevPageKey`</td>
		<td>Key used to cycle to the previous page of artwork (`Enum.KeyCode`).</td>
		<td>`Enum.KeyCode|Q`</td>
	</tr>
	<tr>
		<td>`prevItemKey`</td>
		<td>Key used to cycle to the previous item of artwork (`Enum.KeyCode`).</td>
		<td>`Enum.KeyCode|Left`</td>
	</tr>
</tbody>
</table>

</TabItem>
</Tabs>

```lua title='Script' highlight='5-9'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local SurfaceArt = require(ReplicatedStorage:WaitForChild("SurfaceArt"))

SurfaceArt.configure({
	quotaPerPlayer = 4,
	promptKeyCode = Enum.KeyCode.T,
	promptMaxActivationDistance = 8,
})
```

#### getCanvases

<figcaption>
getCanvases(): `Library.table`
</figcaption>

Returns all of the canvases tagged with the `SurfaceCanvas` tag.

```lua title='Script' highlight='5'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local SurfaceArt = require(ReplicatedStorage:WaitForChild("SurfaceArt"))

local canvases = SurfaceArt.getCanvases()
```

#### placeArt

<figcaption>
placeArt(player: `Class.Player`, canvas: `Class.BasePart`)
</figcaption>

Places an art piece programmatically on behalf of a player. Note that the `canvas` object must be tagged with the `SurfaceCanvas` tag when the server is initialized. It is recommended to use this only with a canvas returned from [getCanvases](#getcanvases).

```lua title='Script' highlight='9-10'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local SurfaceArt = require(ReplicatedStorage:WaitForChild("SurfaceArt"))

local remoteEvent = ReplicatedStorage:WaitForChild("SurfaceArtRemoteEvent")

remoteEvent.OnServerEvent:Connect(function(player)
	-- Place the Bloxy Award from default art assets into the first canvas
	local canvases = SurfaceArt.getCanvases()
	SurfaceArt.placeArt(player, canvases[1], "BloxyAward")
end)
```

#### removeAllArt

<figcaption>
removeAllArt()
</figcaption>

Removes all artwork from all surfaces.

```lua title='Script' highlight='5'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local SurfaceArt = require(ReplicatedStorage:WaitForChild("SurfaceArt"))

SurfaceArt.removeAllArt()
```

### Events

#### artChanged

Fires when an artwork is changed at a particular location on a canvas. When an artwork is removed, `artId` will be `nil`. Note that a `Datatype.Vector3` value is passed as the third parameter to the event handler so that you can position a [custom effect](#showing-custom-effects) at the exact position where the artwork is placed. This event can only be connected in a `Class.LocalScript`.

<table size="small">
<thead>
	<tr>
		<th colspan='2'>Parameters</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>canvas: `Class.BasePart`</td>
		<td>Canvas upon which the artwork was changed.</td>
	</tr>
	<tr>
		<td>spot: `Class.Frame`</td>
		<td>Internal `Class.Frame` that contains the artwork `Class.ImageLabel`.</td>
	</tr>
	<tr>
		<td>spotPosition: `Datatype.Vector3`</td>
		<td>Exact position where the artwork was placed.</td>
	</tr>
	<tr>
		<td>artId: `Library.string`</td>
		<td>Asset ID of the new artwork.</td>
	</tr>
	<tr>
		<td>ownerUserId: `number`</td>
		<td>`Class.Player.UserId|UserId` of the player who placed the art.</td>
	</tr>
</tbody>
</table>

```lua title='LocalScript' highlight='5-9'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local SurfaceArt = require(ReplicatedStorage:WaitForChild("SurfaceArt"))

SurfaceArt.artChanged:Connect(function(canvas, spot, spotPosition, artId, ownerId)
	print("Art placed at:", spotPosition)
	print("Art asset ID:", artId)
	print("Art placed by:", ownerId)
end)
```

#### promptShown

Fires when a canvas interaction prompt is shown to a player. The connected function receives the canvas upon which the prompt is showing. This event can only be connected in a `Class.LocalScript`.

<table size="small">
<thead>
	<tr>
		<th colspan='2'>Parameters</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>canvas: `Class.BasePart`</td>
		<td>Canvas upon which the prompt is showing.</td>
	</tr>
</tbody>
</table>

```lua title='LocalScript' highlight='6-8'
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")

local SurfaceArt = require(ReplicatedStorage:WaitForChild("SurfaceArt"))

SurfaceArt.promptShown:Connect(function(canvas)
	print(Players.LocalPlayer, canvas)
end)
```

#### promptHidden

Fires when a canvas interaction prompt is hidden. The connected function receives the canvas upon which the prompt was showing. This event can only be connected in a `Class.LocalScript`.

<table size="small">
<thead>
	<tr>
		<th colspan='2'>Parameters</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>canvas: `Class.BasePart`</td>
		<td>Canvas upon which the prompt was showing.</td>
	</tr>
</tbody>
</table>

```lua title='LocalScript' highlight='6-8'
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")

local SurfaceArt = require(ReplicatedStorage:WaitForChild("SurfaceArt"))

SurfaceArt.promptClosed:Connect(function(canvas)
	print(Players.LocalPlayer, canvas)
end)
```

#### selectorShown

Fires when the surface art selector UI is shown to a player. This event can only be connected in a `Class.LocalScript`.

```lua title='LocalScript' highlight='6-8'
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")

local SurfaceArt = require(ReplicatedStorage:WaitForChild("SurfaceArt"))

SurfaceArt.selectorShown:Connect(function()
	print(Players.LocalPlayer, "opened surface art selector")
end)
```

#### selectorHidden

Fires when the surface art selector UI is hidden for a player. This event can only be connected in a `Class.LocalScript`.

```lua title='LocalScript' highlight='6-8'
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")

local SurfaceArt = require(ReplicatedStorage:WaitForChild("SurfaceArt"))

SurfaceArt.selectorHidden:Connect(function()
	print(Players.LocalPlayer, "closed surface art selector")
end)
```
