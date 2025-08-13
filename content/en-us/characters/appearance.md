---
title: Character appearance
description: Customize your in-experience character appearance and properties.
---

Most experiences let players use their own Roblox avatar, although some implement an in-experience customization system like the [UGC Homestore](/resources/templates.md#ugc-homestore) template. Other experiences make limited [modifications](../characters/appearance.md) to player avatars such as helmets, wings, or accessories that match the genre.

To create a unique experience that alters the appearance of your users, you can customize the default character properties through [avatar settings](#avatar-settings) or a [HumanoidDescription](#humanoiddescription).

## Avatar settings

Studio's **File**&nbsp;⟩ **Avatar Settings** allows you to quickly set several global player character properties in your experience. These settings apply globally to all player character models joining your experience. To modify specific characters, such as non-player character models, see [HumanoidDescription](#humanoiddescription).

In this window, you can set various presets for clothing, accessories, body parts, collision behavior, animations and more. When editing these settings, a preview of the applied settings displays in the workspace.

For more information, see [Avatar Settings](../studio/avatar-settings.md).

## HumanoidDescription

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
    <td>The Asset IDs of  `Class.Accessory|accessories` equipped by a character. </td>
  </tr>
  <tr>
    <td>Classic Clothing</td>
    <td>The Asset IDs of the `Class.Shirt`, `Class.Pants`, and `Class.ShirtGraphic` image textures that you can apply to the character.</td>
  </tr>
  <tr>
    <td>Body Part</td>
    <td>The Asset IDs of the `Class.HumanoidDescription.Face|Face`, `Class.HumanoidDescription.Head|Head`, `Class.HumanoidDescription.Torso|Torso`, `Class.HumanoidDescription.RightArm|RightArm`, `Class.HumanoidDescription.LeftArm|LeftArm`, `Class.HumanoidDescription.RightLeg|RightLeg` and `Class.HumanoidDescription.LeftLeg|LeftLeg` parts of a character.</td>
  </tr>
  <tr>
    <td>Body Colors</td>
    <td>The `Class.BodyColors` of the character's individual parts.</td>
  </tr>
  <tr>
    <td>Animations</td>
    <td>The Asset IDs of `Class.Animation|Animations` you can use on a character.</td>
  </tr>
</tbody>
</table>

You can customize a character with `Class.HumanoidDescription` using the following steps:

1. [Create a description](#create-humanoiddescription) from the user's character, a specific Outfit ID, or from a specific User ID.
2. [Modify the description](#modify-humanoiddescription) to customize the properties that you want to apply to the `Class.Humanoid` character.
3. [Apply the description](#apply-humanoiddescription) on either a single character, all player characters, or even on all spawning characters.

<Alert severity="warning">
When updating a character's properties through `Class.HumanoidDescription`, it is important to use an up-to-date `Class.HumanoidDescription` of that specific `Class.Humanoid` with `Class.Humanoid:GetAppliedDescription()|Humanoid:GetAppliedDescription()`.
</Alert>

### Create HumanoidDescription

You can create a new `Class.HumanoidDescription` instance directly within the Explorer hierarchy or within a `Class.Script` with the following code:

```lua
local humanoidDescription = Instance.new("HumanoidDescription")
```

In most cases, you should use an existing `Class.HumanoidDescription` instead of a default new `Class.HumanoidDescription` by referencing an [existing player character](#from-the-player-character), [avatar outfit](#from-an-existing-outfit), or [user ID](#from-a-specific-user).

#### From the player character

Use the following code sample to create a new `Class.HumanoidDescription` based on the player character's current properties:

```lua
local humanoid = player.Character and player.Character:FindFirstChildWhichIsA("Humanoid")

local humanoidDescription = Instance.new("HumanoidDescription")

if humanoid then
	humanoidDescription = humanoid:GetAppliedDescription()
end
```

#### From an existing outfit

Use the following sample code to create a `Class.HumanoidDescription` from an outfit ID using `Class.Players:GetHumanoidDescriptionFromOutfitId()|Players.GetHumanoidDescriptionFromOutfitID`:

```lua
local Players = game:GetService("Players")

local outfitId = 480059254

local humanoidDescriptionFromOutfit = Players:GetHumanoidDescriptionFromOutfitId(outfitId)
```

#### From a specific user

Use the following sample code to create a `Class.HumanoidDescription` from a user ID using `Class.Players:GetHumanoidDescriptionFromUserId()`:

```lua
local Players = game:GetService("Players")

local userId = 491243243

local humanoidDescriptionFromUser = Players:GetHumanoidDescriptionFromUserId(userId)
```

### Modify HumanoidDescription

To customize `Class.HumanoidDescription` properties, set them directly on the `Class.HumanoidDescription` or use a specified method before applying the `Class.HumanoidDescription` to a character.

The following code sample provides examples of setting the different types of `Class.HumanoidDescription` properties:

```lua
local humanoidDescription = Instance.new("HumanoidDescription")
humanoidDescription.HatAccessory = "2551510151,2535600138"
humanoidDescription.BodyTypeScale = 0.1
humanoidDescription.ClimbAnimation = 619521311
humanoidDescription.Face = 86487700
humanoidDescription.GraphicTShirt = 1711661
humanoidDescription.HeadColor = Color3.new(0, 1, 0)
```

#### Set multiple accessories

For layered or bulk accessory changes, you can use `Class.HumanoidDescription:SetAccessories()` to make accessory related updates. The following code sample adds a layered sweater and jacket in that order to a `Class.HumanoidDescription`:

```lua
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

#### On a single character

`Class.Humanoid:ApplyDescription()|ApplyDescription()` can target any `Class.Humanoid`. Use the following code to add a new pair of sunglasses and a new torso to the player character:

```lua
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

#### On all player characters

Use the following sample code to apply a `Class.HumanoidDescription` to all current players in the game:

```lua
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

#### On all spawning characters

Use the following sample code to set a specific `Class.HumanoidDescription` for all spawning player characters:

```lua
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

If the `Class.HumanoidDescription` instance was created in the Explorer and parented to the workspace, use the following sample code in a `Class.Script` to access the workspace instance:

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
