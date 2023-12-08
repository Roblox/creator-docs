---
title: In-Experience Asset Creation
description: Explains how to allow users to create and save assets in your experience.
---

With the in-experience asset creation feature, you can allow your users to save creations they made in your experience to their inventories. Your users can use these in-experience creations just like any other asset. Additionally, these creations attribute to your experience when displayed on the Roblox platform, so any user can use the attribution link to come to your experience and create their own.

For example, you can enable users to create custom creatures as pets in your experience, and allow them to save their favorite pets to their inventories. You have full control to specify which objects users can modify and save from your experience. Users in turn can display their creations on their profiles with attribution to your experience, boosting visibility of your experience.

## Supported Asset Types and Limits

Just like all assets on the platform, in-experience creations are subject to [asset moderation](../../projects/assets/index.md#asset-moderation). Currently, you can only allow users to create [packages](../../projects/assets/packages.md) from your experience. These packages can't contain any scripts or private assets, such as audio, video, and nested packages. If the system detects scripts or private assets in a package that can be saved by users, it blocks the in-experience save action by hiding the save prompt for users.

When you are running or testing your experience and add scripts or private assets as part of an in-experience creation, it fails to save and prompts error messages to the Studio [Output Window](../../studio/output.md) or the [Developer Console](../../studio/developer-console.md).

## Enabling In-Experience Asset Creation

To enable in-experience asset creation for your users, use the `Class.AssetService:PromptCreateAssetAsync()` API method in a server-side script, along with other creation logic. Specify which instances in your experience you want to enable this functionality, set a custom trigger (such as a UI icon) for invoking the method, and listen for client remote events for saving assets.

`Class.AssetService:PromptCreateAssetAsync()` takes the following parameters:

- A `Class.Player` object representing the user who submits an asset creation.
- An `Class.Instance` object representing the asset for creation.
- The `Enum.AssetType`, which is currently limited to `Enum.AssetType.Model`.

When the server invokes `Class.AssetService:PromptCreateAssetAsync()`, it prompts a **Submit Package** dialog on the client, so the user who triggers the save action can enter a name and description for the package. Roblox provides the dialog UI out-of-the-box, as the save workflow is a platform-level functionality.

The following example server-side script prompts users to save a car that they paint in an experience:

```lua title="Example Script for In-Experience Asset Creation"

-- Define the AssetService variable
local AssetService = game:GetService("AssetService")

-- Set up PromptCreateAssetAsync() for prompting the submission dialog
local function CreateAsset(player, instance)
	local complete, result, assetId = pcall(function()
		return AssetService:PromptCreateAssetAsync(player, instance, Enum.AssetType.Model)
	end)

	if complete then
		if result == Enum.PromptCreateAssetResult.Success then
			print("successfully uploaded, AssetId: ", assetId)
		else
			print("Received result", result)
		end
	else
		print("error")
		print(result)
	end
end

-- Car painting logic omitted

-- Add an event handler
local function onUserPublish(player, promptObject)
	-- User saves the car instance with the experience's default color
	if promptObject.Name == "car" then
		CreateAsset(player, car)
	elseif promptObject.Name == "CarPaintYellow" or promptObject.Name == "CarPaintBlue" or promptObject.Name == "CarPaintBlack" or promptObject.Name == "CarPaintRed" then
		PaintCarColor(promptObject.Name)
	end
end

PublishEvent.OnServerEvent:Connect(onUserPublish)
```

[In-Experience Creation Demo Arena](https://www.roblox.com/games/12992503026/In-Experience-Creation-Demo-Arena) showcases an example on how you can use this feature. You can join the demo to walk through the in-experience creation workflow as a user and access the place file using the **Edit&nbsp;in&nbsp;Studio** option to reference the design.

<img src="../../assets/misc/In-Experience-Creation-Place.png" width="780" alt="Edit in Studio option from the demo experience's main page" />

## Post-Creation and Attribution

After users create and save an asset from your experience, they can find it in the following places:

- Their [My Inventory](https://en.help.roblox.com/hc/en-us/articles/360000463726-How-to-View-or-Hide-Your-Inventory-in-a-Browser) page.
- The **Creations** tab of their [Profile](https://en.help.roblox.com/hc/en-us/articles/203313660-All-About-Profiles-Blurbs-and-Profile-Customization) page.
- The **Development Items** tab under their Creator Dashboard [Creations](https://create.roblox.com/dashboard/creations?activeTab=Model) page.
- The **Inventory** tab of their [Toolbox](../../projects/assets/toolbox.md) in Studio.

When users see in-experience creations on their friends' profiles or inventories, they see attribution to the original experience in which the asset was created. Users can click on the attribution link to redirect to the experience page, so they can join the experience and create their own.

<img src="../../assets/creator-dashboard/In-Experience-Creation-Attribution.png" width="24%" alt="A screenshot shows the attribution of an in-experience creation"/>

<Alert severity="warning">
Attribution is currently tied to a specific version of the created asset. If a user saves a package from an experience and further edits in Studio to create a new version, attribution no longer displays for the new version.
</Alert>
