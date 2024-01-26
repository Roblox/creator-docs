---
title: Photo Booth
description: The Photo Booth module lets players strike a unique pose with a background.
---

Taking a photo is a perfect way to commemorate a great experience. The **PhotoBooth** [developer module](../../resources/modules/index.md) is an easy-to-use photo staging tool which lets the players strike a unique pose with a background that represents their experience.

<video src="../../assets/developer-modules/photo-booth/Showcase.mp4" controls width="100%"></video>

## Module Usage

### Installation

To use the **PhotoBooth** module in an experience:

1. From the [View](../../studio/view-tab.md) tab, open the [Toolbox](../../projects/assets/toolbox.md) and select the **Creator Store** tab.

   <img src="../../assets/studio/general/View-Tab-Toolbox.png" width="776" alt="Toolbox toggle button in Studio" />

   <img src="../../assets/studio/toolbox/Creator-Store-Tab.png" width="360" />

1. Make sure the **Models** sorting is selected, then click the **See&nbsp;All** button for **Categories**.

   <img src="../../assets/studio/toolbox/Creator-Store-Categories-See-All.png" width="360" />

1. Locate and click the **Dev Modules** tile.

   <img src="../../assets/studio/toolbox/Creator-Store-Categories-Dev-Modules.png" width="200" />

1. Locate the **Photo Booth** module and click it, or drag-and-drop it into the 3D view.

   <img src="../../assets/developer-modules/photo-booth/Toolbox-Icon.png" width="143" />

1. In the [Explorer](../../studio/explorer.md) window, move the entire **PhotoBooth** model into **ServerScriptService**. Upon running the experience, the module will distribute itself to various services and begin running.

   <img src="../../assets/developer-modules/photo-booth/Move-Package.png" width="320" />

### Positioning the Booth

The module comes with one **PhotoBooth** model that you can position in the 3D world. This model is what players will interact with to set up a photo.

1. Locate the **PhotoBooth** mesh inside the **Workspace** folder of the module's main folder.

   <img src="../../assets/developer-modules/photo-booth/Bundled-Mesh-Explorer.png" width="320" />

1. Move it into the top-level **Workspace** hierarchy and position it where desired.

   <img src="../../assets/developer-modules/photo-booth/Bundled-Mesh-Workspace.jpg" width="800" />

<Alert severity="info">
	It is not required that you use the packaged mesh for triggering photo printouts. The module uses `Class.CollectionService` to locate parts tagged as `PhotoBooth` and make them operate as photo booths. If desired, the `Class.CollectionService` tag name to search for can be changed by setting a different value for `photoboothTag` in a [configure](#configure) call.
</Alert>

### Configuration

The module is preconfigured to work for most use cases, but it can be easily customized through the [configure](#configure) function. For example, to change the default message at the bottom of the photo:

1. In **StarterPlayerScripts**, create a new `Class.LocalScript` and rename it to **ConfigurePhotoBooth**.

   <img src="../../assets/developer-modules/photo-booth/LocalScript-ConfigurePhotoBooth.png" width="320" />

1. Paste the following code into the new script.

   ```lua title='LocalScript - ConfigurePhotoBooth' highlight='5-7'
   local ReplicatedStorage = game:GetService("ReplicatedStorage")

   local PhotoBooth = require(ReplicatedStorage:WaitForChild("PhotoBooth"))

   PhotoBooth.configure({
   	frameMessage = "First Photo Booth Capture!",
   })
   ```

   <img src="../../assets/developer-modules/photo-booth/Changed-Message.jpg" width="800" />

### Connecting to Events

Every time the photo booth displays a new screen to a local client, a corresponding event is fired. These events can be connected in a `Class.LocalScript` so that you can respond with your own custom logic.

```lua title='LocalScript' highlight='5-7, 9-11, 13-15'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local PhotoBooth = require(ReplicatedStorage:WaitForChild("PhotoBooth"))

PhotoBooth.countdownStarted:Connect(function()
	print("The countdown has started")
end)

PhotoBooth.printoutShown:Connect(function()
	print("The printout is showing")
end)

PhotoBooth.promptShown:Connect(function()
	print("The camera prompt is showing")
end)
```

### GUI Visibility

By default, the photo booth hides all `Class.ScreenGui|ScreenGuis` and `Class.CoreGui|CoreGuis` when a photo is staged. If you want to override this auto-hiding behavior and programmatically decide which GUIs should remain visible, include the [hideOtherGuis](#hideotherguis) and [showOtherGuis](#showotherguis) callbacks and respond with your own custom logic.

```lua title='LocalScript' highlight='17, 26, 39'
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local StarterGui = game:GetService("StarterGui")

local PhotoBooth = require(ReplicatedStorage:WaitForChild("PhotoBooth"))

local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")
local hiddenInstances = {}

-- Create a screen GUI that will not be hidden
local specialGuiInstance = Instance.new("ScreenGui")
-- Draw the screen GUI above the photo booth GUI
specialGuiInstance.DisplayOrder = 1
specialGuiInstance.Parent = playerGui
-- Set attribute on screen GUI to prevent hiding
specialGuiInstance:SetAttribute("ShowInPhotoBooth", true)
-- Add text label to the GUI
local specialLabel = Instance.new("TextLabel")
specialLabel.Size = UDim2.fromScale(1, 0.1)
specialLabel.Text = "Remains visible when taking a photo"
specialLabel.Font = Enum.Font.GothamMedium
specialLabel.TextSize = 24
specialLabel.Parent = specialGuiInstance

PhotoBooth.hideOtherGuis(function()
	-- Hide all developer-defined screen GUIs except those marked with attribute
	local instances = playerGui:GetChildren()
	for _, instance in instances do
		if instance:IsA("ScreenGui") and not instance:GetAttribute("ShowInPhotoBooth") and instance.Enabled then
			instance.Enabled = false
			table.insert(hiddenInstances, instance)
		end
	end
	-- Hide specific core GUIs
	StarterGui:SetCoreGuiEnabled(Enum.CoreGuiType.PlayerList, false)
end)

PhotoBooth.showOtherGuis(function()
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

#### configure

<figcaption>
configure(config: `Library.table`)
</figcaption>

Overrides default configuration options through the following keys/values in the `config` table. This function can only be called from a `Class.LocalScript`.

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
		<td>`frameMessage`</td>
		<td>Message that is shown at the bottom of the photo. Its duration can be controlled via the `fadeUiDelay` property.</td>
		<td>"Use your device to take a screenshot and share!"</td>
	</tr>
	<tr>
		<td>`fadeUiDelay`</td>
		<td>Time to show the frame message before it fades out, in seconds. Set to a negative number to never fade.</td>
		<td>3</td>
	</tr>
	<tr>
		<td>`closeButtonImage`</td>
		<td>Image to use for the close photo button, placed overtop the `closeButtonBackgroundImage` image.</td>
		<td>"rbxassetid://7027440823"</td>
	</tr>
	<tr>
		<td>`closeButtonBackgroundImage`</td>
		<td>Background image to use for the close photo button.</td>
		<td>"rbxassetid://7027440891"</td>
	</tr>
	<tr>
		<td>`cameraLandscapePosition`</td>
		<td>Distance of the photo booth's camera, in front and upward from the character, when taking a photo in landscape mode (`Datatype.Vector2`).</td>
		<td>(5, 2)</td>
	</tr>
	<tr>
		<td>`cameraPortraitPosition`</td>
		<td>Distance of the photo booth's camera, in front and upward from the character,  when taking a photo in portrait mode (`Datatype.Vector2`).</td>
		<td>(10, 1)</td>
	</tr>
	<tr>
		<td>`countdownFont`</td>
		<td>Font to use for the numbers in the countdown (`Enum.Font`).</td>
		<td>`Enum.Font|GothamBlack`</td>
	</tr>
	<tr>
		<td>`countdownTextColor`</td>
		<td>Color of the numbers in the countdown (`Datatype.Color3`).</td>
		<td>[255, 255, 255]</td>
	</tr>
	<tr>
		<td>`printoutCharacterPosition`</td>
		<td>Position of the character on the screen when the printout is showing (`Datatype.UDim2`).</td>
		<td>(0.5, 0, 0.5, 0)</td>
	</tr>
	<tr>
		<td>`printoutCharacterSize`</td>
		<td>Amount of screen space the character takes up in the printout (`Datatype.UDim2`).</td>
		<td>(1, 0, 1, 0)</td>
	</tr>
	<tr>
		<td>`characterAnimation`</td>
		<td>Asset ID of the animation the character takes in the photo, paused at its starting frame.</td>
		<td>"rbxassetid://6899663224"</td>
	</tr>
	<tr>
		<td>`filterImage`</td>
		<td>Image to apply over the photo as a filter. If `nil`, a default filter that darkens the image edges will be used.</td>
		<td>`nil`</td>
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
		<td>`maxActivationDistance`</td>
		<td>Maximum distance, in studs, a player's character can be from the photo booth for the prompt to appear.</td>
		<td>10</td>
	</tr>
	<tr>
		<td>`countdownBeepSound`</td>
		<td>Asset ID of the `Class.Sound` to play for each number shown in the countdown.</td>
		<td>"rbxassetid://7743999789"</td>
	</tr>
	<tr>
		<td>`countdownFlashSound`</td>
		<td>Asset ID for the `Class.Sound` to play when the flash effect is shown.</td>
		<td>"rbxassetid://7744000850"</td>
	</tr>
	<tr>
		<td>`countdownSeconds`</td>
		<td>Number of seconds to count down for.</td>
		<td>3</td>
	</tr>
	<tr>
		<td>`photoboothTag`</td>
		<td>Tag used by `Class.CollectionService` to find all "booths" in the place.</td>
		<td>"PhotoBooth"</td>
	</tr>
</tbody>
</table>

</TabItem>
</Tabs>

```lua title='LocalScript - ConfigurePhotoBooth'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local PhotoBooth = require(ReplicatedStorage:WaitForChild("PhotoBooth"))

PhotoBooth.configure({
	frameMessage = "What a cool pose!",
	fadeUiDelay = 5,
	maxActivationDistance = 5,
	printoutCharacterSize = UDim2.fromScale(1.5, 1.5),
})
```

#### setBackgrounds

<figcaption>
setBackgrounds(backgrounds: `Library.table`)
</figcaption>

Overrides the default backgrounds provided by the photo booth. Background images should be at 16:9 aspect ratio (1024&times;768) for an optimal experience and their asset IDs should be included in the backgrounds array. 1–4&nbsp;(inclusive) backgrounds can be provided.

```lua title='LocalScript' highlight='5-8'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local PhotoBooth = require(ReplicatedStorage:WaitForChild("PhotoBooth"))

PhotoBooth.setBackgrounds({
    "rbxassetid://7018713114",
    "rbxassetid://950538356",
})
```

### Events

#### countdownStarted

Fires when the countdown starts. This event can only be connected in a `Class.LocalScript`.

```lua title='LocalScript' hightlight='5-7'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local PhotoBooth = require(ReplicatedStorage:WaitForChild("PhotoBooth"))

PhotoBooth.countdownStarted:Connect(function()
	print("The countdown has started")
end)
```

#### printoutShown

Fires when the printout is shown to the user. This event can only be connected in a `Class.LocalScript`.

```lua title='LocalScript' hightlight='5-7'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local PhotoBooth = require(ReplicatedStorage:WaitForChild("PhotoBooth"))

PhotoBooth.printoutShown:Connect(function()
	print("The printout is showing")
end)
```

#### promptShown

Fires when the printout is closed and the camera button is showing again. This event can only be connected in a `Class.LocalScript`.

```lua title='LocalScript' hightlight='5-7'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local PhotoBooth = require(ReplicatedStorage:WaitForChild("PhotoBooth"))

PhotoBooth.promptShown:Connect(function()
	print("The camera prompt is showing")
end)
```

### Callbacks

#### hideOtherGuis

<figcaption>
hideOtherGuis(callback: `function`)
</figcaption>

This callback runs immediately before the printout is displayed, letting you disable entire `Class.ScreenGui|ScreenGuis` or elements within them before the printout is shown. GUIs used by the photo booth have the attribute **ShowInPhotoBooth** set to **true**. See [GUI Visibility](#gui-visibility) for details and sample code.

#### showOtherGuis

<figcaption>
showOtherGuis(callback: `function`)
</figcaption>

This callback runs after the printout has been closed, letting you reenable entire `Class.ScreenGui|ScreenGuis` or elements within them. GUIs used by the photo booth have the attribute **ShowInPhotoBooth** set to **true**. See [GUI Visibility](#gui-visibility) for details and sample code.
