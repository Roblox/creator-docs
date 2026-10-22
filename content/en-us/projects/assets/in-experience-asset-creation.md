---
title: In-game asset creation
description: Explains how to allow users to create and save assets in your game.
---

With the in-game asset creation feature, you can allow your users to save creations they made in your game to their inventories. Your users can use these in-game creations just like any other asset. Additionally, these creations attribute to your game when displayed on the Roblox platform, so any user can use the attribution link to come to your game and create their own.

For example, you can enable users to create custom creatures as pets in your game, and allow them to save their favorite pets to their inventories. You have full control to specify which objects users can modify and save from your game. Users in turn can display their creations on their profiles with attribution to your game, boosting visibility of your game.

## Supported asset types and limits

Just like all assets on the platform, in-game creations are subject to [asset moderation](../../projects/assets/index.md#asset-moderation). Currently, you can allow users to create the following type of in-game content:

- **Images** (`Enum.AssetType.Image`) from a `Class.EditableImage` that your game generates or edits at runtime.

<Alert severity="warning">
Creating packages (`Enum.AssetType.Model`) from an `Class.Instance` is not currently supported.
</Alert>

When you are running or testing your game and the save action fails, Studio prompts error messages to the [Output window](../../studio/output.md) or the [Developer Console](../../studio/developer-console.md).

## Enable in-game platform content creation

To enable in-game creation for your users, use the `Class.AssetService:PromptCreatePlatformContentAsync()` API method in a server-side script, along with other creation logic. Specify which objects in your game you want to enable this functionality for, set a custom trigger (such as a UI icon) for invoking the method, and listen for client remote events for saving assets.

`Class.AssetService:PromptCreatePlatformContentAsync()` takes the following parameters:

- A `Class.Player` object representing the user who submits a creation.
- An `Object`, such as a `Class.EditableImage`, representing the content for creation.
- The `Enum.AssetType`, currently only `Enum.AssetType.Image` for an image.

When the server invokes `Class.AssetService:PromptCreatePlatformContentAsync()`, it prompts a **Submit** dialog on the client, so the user who triggers the save action can enter a name and description for the asset. Roblox provides the dialog UI out of the box, as the save workflow is a platform-level functionality.

Before you use this method, make sure that:

- The script calling `Class.AssetService:PromptCreatePlatformContentAsync()` runs on the server.
- Your place is published. Testing the prompt in Studio on an unpublished place fails.
- **Allow Mesh/Image APIs** is turned on for your experience.

<Alert severity="info">
`Class.AssetService:PromptCreatePlatformContentAsync()` replaces the older `Class.AssetService:PromptCreateAssetAsync()`, which only supports creating packages from an `Class.Instance`. Package creation is not currently supported through the new method.
</Alert>

### Create an image from an EditableImage

You can also let users publish images that your game generates at runtime using `Class.EditableImage`. The following example server-side script procedurally draws a simple logo into an `Class.EditableImage` and prompts each player to publish it as an image asset when they join the game:

```lua title="Example Script for Creating an Image"
local AssetService = game:GetService("AssetService")
local Players = game:GetService("Players")

local BLUE = Color3.fromRGB(49, 86, 255)
local WHITE = Color3.new(1, 1, 1)

local SIZE = 400
local OUTER_SIZE = 200
local INNER_SIZE = 56
local ANGLE = 15 -- degrees, clockwise

local function generateLogo()
	-- Unrotated logo: white square with a blue square in the center.
	local logo = AssetService:CreateEditableImage({
		Size = Vector2.new(OUTER_SIZE, OUTER_SIZE),
	})

	-- Final canvas: solid blue.
	local canvas = AssetService:CreateEditableImage({
		Size = Vector2.new(SIZE, SIZE),
	})

	if not logo or not canvas then
		warn("Could not create EditableImage. Make sure access to the Editable Mesh / Image apis is enabled.")
		return nil
	end

	logo:DrawRectangle(
		Vector2.zero,
		Vector2.new(OUTER_SIZE, OUTER_SIZE),
		WHITE, 0, Enum.ImageCombineType.Overwrite
	)
	logo:DrawRectangle(
		Vector2.new((OUTER_SIZE - INNER_SIZE) / 2, (OUTER_SIZE - INNER_SIZE) / 2),
		Vector2.new(INNER_SIZE, INNER_SIZE),
		BLUE, 0, Enum.ImageCombineType.Overwrite
	)

	canvas:DrawRectangle(
		Vector2.zero,
		Vector2.new(SIZE, SIZE),
		BLUE, 0, Enum.ImageCombineType.Overwrite
	)

	-- Project the logo onto the canvas, rotated about its center.
	canvas:DrawImageTransformed(
		Vector2.new(SIZE / 2, SIZE / 2),
		Vector2.one,
		ANGLE,
		logo,
		{
			CombineType = Enum.ImageCombineType.BlendSourceOver,
			ResamplerMode = Enum.ResamplerMode.Default, -- smooth edges
		}
	)

	logo:Destroy()

	return canvas
end

Players.PlayerAdded:Connect(function(player)
	-- CoreGui needs to be loaded for the Prompt method to work.
	player.CharacterAdded:Wait()

	local logo = generateLogo()
	if not logo then
		return
	end

	local complete, result, assetId = pcall(function()
		return AssetService:PromptCreatePlatformContentAsync(player, logo, Enum.AssetType.Image)
	end)

	if complete then
		if result == Enum.PromptCreateAssetResult.Success then
			print("successfully uploaded, AssetId:", assetId)
		else
			print("Received result", result)
		end
	else
		print("error")
		print(result)
	end
end)
```

[In-Experience Creation Demo Arena](https://www.roblox.com/games/12992503026/In-Experience-Creation-Demo-Arena) showcases an example on how you can use this feature. You can join the demo to walk through the in-game creation workflow as a user, or edit the place in Studio to reference the design.

## Post-creation and attribution

After users create and save an asset from your game, they can find it in the following places:

- Their [My Inventory](https://en.help.roblox.com/hc/en-us/articles/360000463726-How-to-View-or-Hide-Your-Inventory-in-a-Browser) page.
- The **Creations** tab of their [Profile](https://en.help.roblox.com/hc/en-us/articles/203313660-All-About-Profiles-Blurbs-and-Profile-Customization) page.
- The **Development Items** tab under their Creator Dashboard [Creations](https://create.roblox.com/dashboard/creations?activeTab=Model) page.
- The **Inventory** tab of their [Toolbox](../../projects/assets/toolbox.md) in Studio.

When users see in-game creations on their friends' profiles or inventories, they see attribution to the original game in which the asset was created. Users can click on the attribution link to redirect to the game page, so they can join the game and create their own.

<Alert severity="warning">
Attribution is currently tied to a specific version of the created asset. If a user saves a package from a game and further edits in Studio to create a new version, attribution no longer displays for the new version.
</Alert>
