---
title: Character appearance
description: Customize your in-experience character appearance and properties.
---

Most experiences let players use their own Roblox avatar, although some implement an in-experience customization system like the [UGC Homestore](/resources/templates.md#ugc-homestore) template. Other experiences make limited [modifications](../characters/appearance.md) to player avatars such as helmets, wings, or accessories that match the genre.

To create a unique experience that alters the appearance of your users, you can customize the default character properties through [avatar settings](#global-avatar-settings) or a [manually modify appearance](#manually-modify-appearance).

## Global avatar settings

Studio's **File**&nbsp;⟩ **Avatar Settings** allows you to quickly set several global player character properties in your experience. These settings apply globally to all player character models joining your experience. To modify specific characters, such as non-player character models, see [manually modify appearance](#manually-modify-appearance).

In this window, you can set various presets for clothing, accessories, body parts, collision behavior, animations and more. When editing these settings, a preview of the applied settings displays in the workspace.

For more information, see [Avatar Settings](../studio/avatar-settings.md).

## Manually modify appearance

Character models contain a `Class.Humanoid` object that gives the model special characteristics, such as walking, jumping, equipping items, and interacting with the environment.

You can programmatically modify a `Class.Humanoid` by updating `Class.HumanoidDescription`. This includes player character models or non-player character models in your experience.

You can adjust the following character properties in your experience using `Class.HumanoidDescription`:

<table>
<thead>
  <tr>
    <th>Character property</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Scale</td>
    <td>Number values for physical traits `Class.HumanoidDescription.HeightScale|height`, `Class.HumanoidDescription.WidthScale|width`, `Class.HumanoidDescription.HeadScale|head`, `Class.HumanoidDescription.BodyTypeScale|body type` and `Class.HumanoidDescription.ProportionScale|proportion`. This doesn't affect R6 body types.</td>
  </tr>
  <tr>
    <td>Accessories </td>
    <td>The asset IDs of  `Class.Accessory|accessories` equipped by a character. </td>
  </tr>
  <tr>
    <td>Classic Clothing</td>
    <td>The asset IDs of the `Class.Shirt`, `Class.Pants`, and `Class.ShirtGraphic` image textures that you can apply to the character.</td>
  </tr>
  <tr>
    <td>Body Part</td>
    <td>The asset IDs of the `Class.HumanoidDescription.Face|Face`, `Class.HumanoidDescription.Head|Head`, `Class.HumanoidDescription.Torso|Torso`, `Class.HumanoidDescription.RightArm|RightArm`, `Class.HumanoidDescription.LeftArm|LeftArm`, `Class.HumanoidDescription.RightLeg|RightLeg` and `Class.HumanoidDescription.LeftLeg|LeftLeg` parts of a character.</td>
  </tr>
  <tr>
    <td>Body Colors</td>
    <td>The `Class.BodyColors` of the character's individual parts.</td>
  </tr>
  <tr>
    <td>Animations</td>
    <td>The asset IDs of `Class.Animation|Animations` you can use on a character.</td>
  </tr>
</tbody>
</table>
<br />

Customize a character with `Class.HumanoidDescription` using the following steps:

1. [Create a description](#create-humanoiddescription) from the user's character, a specific Outfit ID, or from a specific User ID.
2. [Modify the description](#modify-humanoiddescription) to customize the properties that you want to apply to the `Class.Humanoid` character.
3. [Apply the description](#apply-humanoiddescription) on either a single character, all player characters, or even on all spawning characters.

<Alert severity="warning">
When updating a character's properties through `Class.HumanoidDescription`, it is important to use an up-to-date `Class.HumanoidDescription` of that specific `Class.Humanoid` with `Class.Humanoid:GetAppliedDescription()|Humanoid:GetAppliedDescription()`.
</Alert>

### Create HumanoidDescription

You can create a new `Class.HumanoidDescription` instance directly within the **Explorer** hierarchy or within a `Class.Script` with the following code:

```lua title="Create new HumanoidDescription instance"
local humanoidDescription = Instance.new("HumanoidDescription")
```

In most cases, you should use an existing `Class.HumanoidDescription` instead of a default new `Class.HumanoidDescription` by referencing an existing player character, avatar outfit, or user ID.

<br />
<h4> From the player character </h4>

Use the following code sample to create a new `Class.HumanoidDescription` based on the player character's current properties:

```lua title="Generate a HumanoidDescription from a player character"
local humanoid = player.Character and player.Character:FindFirstChildWhichIsA("Humanoid")

local humanoidDescription = Instance.new("HumanoidDescription")

if humanoid then
	humanoidDescription = humanoid:GetAppliedDescription()
end
```

<h4> From an existing outfit </h4>

Use the following sample code to create a `Class.HumanoidDescription` from an outfit ID using `Class.Players:GetHumanoidDescriptionFromOutfitId()|Players.GetHumanoidDescriptionFromOutfitID`:

```lua title="Generate a HumanoidDescription from an Outfit ID"
local Players = game:GetService("Players")

local outfitId = 480059254

local humanoidDescriptionFromOutfit = Players:GetHumanoidDescriptionFromOutfitId(outfitId)
```

<h4> From a specific user </h4>

Use the following sample code to create a `Class.HumanoidDescription` from a user ID using `Class.Players:GetHumanoidDescriptionFromUserId()`:

```lua  title="Generate a HumanoidDescription from a user ID"
local Players = game:GetService("Players")

local userId = 491243243

local humanoidDescriptionFromUser = Players:GetHumanoidDescriptionFromUserId(userId)
```

### Modify HumanoidDescription

To customize `Class.HumanoidDescription` properties, set them directly on the `Class.HumanoidDescription` or use a specified method before applying the `Class.HumanoidDescription` to a character.

The following code sample provides examples of setting the different types of `Class.HumanoidDescription` properties:

```lua title="Update various HumanoidDescription properties"
local humanoidDescription = Instance.new("HumanoidDescription")
humanoidDescription.HatAccessory = "2551510151,2535600138"
humanoidDescription.BodyTypeScale = 0.1
humanoidDescription.ClimbAnimation = 619521311
humanoidDescription.Face = 86487700
humanoidDescription.GraphicTShirt = 1711661
humanoidDescription.HeadColor = Color3.new(0, 1, 0)
```

<h4> Set multiple accessories </h4>

For layered or bulk accessory changes, you can use `Class.HumanoidDescription:SetAccessories()` to make accessory related updates. The following code sample adds a layered sweater and jacket in that order to a `Class.HumanoidDescription`:

```lua title="Change multiple accessories at once"
local humanoidDescription = Instance.new("HumanoidDescription")
local accessoryTable = {
	{
		Order = 1,
		AssetId = 6984769289,
		AccessoryType = Enum.AccessoryType.Sweater
	},
	{
		Order = 2,
		AssetId = 6984767443,
		AccessoryType = Enum.AccessoryType.Jacket
	}
}

humanoidDescription:SetAccessories(accessoryTable, false)
```

### Apply HumanoidDescription

Apply `Class.HumanoidDescription` to specific `Class.Humanoid` characters in your experience with `Class.Humanoid:ApplyDescription()` or `Class.Player:LoadCharacterWithHumanoidDescription()|Humanoid.LoadCharacterWithHumanoidDescription`.

<Alert severity="warning">
Changing the assets on a character while also changing `Class.HumanoidDescription` might lead to undefined behavior.
</Alert>

<h4> On a single character </h4>

`Class.Humanoid:ApplyDescription()|ApplyDescription()` can target any `Class.Humanoid`. Use the following code to add a new pair of sunglasses and a new torso to the player character:

```lua title = "Update HumanoidDescription for a specific player character"
local humanoid = player.Character and player.Character:FindFirstChildWhichIsA("Humanoid")
if humanoid then
	local descriptionClone = humanoid:GetAppliedDescription()
	descriptionClone.Torso = 86500008
	-- Multiple face accessory assets are allowed in a comma-separated string
	descriptionClone.FaceAccessory = descriptionClone.FaceAccessory .. ",2535420239"
	-- Apply modified "descriptionClone" to humanoid
	humanoid:ApplyDescription(descriptionClone)
end
```

<h4> On all player characters </h4>

Use the following sample code to apply a `Class.HumanoidDescription` to all current players in the game:

```lua title = "Update HumanoidDescription for all current player characters"
local Players = game:GetService("Players")

for _, player in Players:GetPlayers() do
	local humanoid = player.Character and player.Character:FindFirstChildWhichIsA("Humanoid")
	if humanoid then
		-- Create a HumanoidDescription
		local humanoidDescription = Instance.new("HumanoidDescription")
		humanoidDescription.HatAccessory = "2551510151,2535600138"
		humanoidDescription.BodyTypeScale = 0.1
		humanoidDescription.ClimbAnimation = 619521311
		humanoidDescription.Face = 86487700
		humanoidDescription.GraphicTShirt = 1711661
		humanoidDescription.HeadColor = Color3.new(0, 1, 0)
		humanoid:ApplyDescription(humanoidDescription)
	end
end
```

<h4> On all spawning characters </h4>

Use the following sample code to set a specific `Class.HumanoidDescription` for all spawning player characters:

```lua title = "Update HumanoidDescription for all spawning characters"
local Players = game:GetService("Players")

-- Stop automatic spawning so it can be done in the "PlayerAdded" callback
Players.CharacterAutoLoads = false

local function onPlayerAdded(player)
	-- Create a HumanoidDescription
	local humanoidDescription = Instance.new("HumanoidDescription")
	humanoidDescription.HatAccessory = "2551510151,2535600138"
	humanoidDescription.BodyTypeScale = 0.1
	humanoidDescription.ClimbAnimation = 619521311
	humanoidDescription.Face = 86487700
	humanoidDescription.GraphicTShirt = 1711661
	humanoidDescription.HeadColor = Color3.new(0, 1, 0)

	-- Spawn character with the HumanoidDescription
	player:LoadCharacterWithHumanoidDescription(humanoidDescription)
end

-- Connect "PlayerAdded" event to "onPlayerAdded()" function
Players.PlayerAdded:Connect(onPlayerAdded)
```

If the `Class.HumanoidDescription` instance was created in the **Explorer** and parented to the workspace, use the following sample code in a `Class.Script` to access the workspace instance:

```lua
local Players = game:GetService("Players")

-- Stop automatic spawning so it can be done in the "PlayerAdded" callback
Players.CharacterAutoLoads = false

local function onPlayerAdded(player)
	-- Spawn character with "workspace.StudioHumanoidDescription"
	player:LoadCharacterWithHumanoidDescription(workspace.StudioHumanoidDescription)
end

-- Connect "PlayerAdded" event to "onPlayerAdded()" function
Players.PlayerAdded:Connect(onPlayerAdded)
```

## Layered clothing on non-R15

Caged accessories, like layered clothing, use `Class.WrapTarget` and `Class.WrapLayer` to stretch and wrap over a target `Class.Model`. Layered accessories can work with both standard [R15 Roblox characters](../characters/index.md#avatar-characters) and non-R15 models.

Custom implementation of layered clothing, such as a model using a unique cage UV map, cannot be uploaded and published to the Marketplace. For more information, see [Layered clothing specifications](../art/accessories/clothing-specifications.md).

Whether you are implementing layered accessories on an avatar R15 rig, or using a custom rig, ensure that your accessories and bodies include the following:

- The target model, typically the body, has a `Class.WrapTarget` component on the meshes that additional models are intended to wrap around.
- The layering model, typically the clothing or accessory, has a `Class.WrapLayer` component on the meshes meant to wrap the target model.
- The **outer cage of the target model**, and the **inner and outer cage of the layering model** have matching UV maps.
  - The corresponding vertices on the target cage should have the same UVs as those vertices on the layer cage.
- If your target model is not R15, or doesn't include a `Class.Humanoid`, you must add a `Class.Weld` object to the layering `Class.MeshPart`.
  - The `Class.Weld` must have `Part0` and `Part1` set to link the layering MeshPart to the Part hierarchy of the Model. For example, `Part0` refers to the accessory and `Part1` refers to the parent Part.
- If your target model is both R15 and includes a `Class.Humanoid`, this weld is created automatically.

<Alert severity = 'info'>
See the following resources for additional information on layered clothing and caging:

- [Layered clothing caging overview](../art/accessories/layered-clothing.md#inner-and-outer-cages)
- [Layered clothing caging best practices](../art/accessories/caging-best-practices.md)
- [Layered clothing cage mesh specifications](../art/accessories/clothing-specifications.md#cage-meshes)
- [Avatar body cage specifications](../art/characters/specifications.md#outer-cages)

</Alert>
