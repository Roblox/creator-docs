---
title: Character Appearance
description: Customize your in-experience character appearance and properties with the Avatar Game Settings and HumanoidDescription.
---

Most experiences let players use their own Roblox avatar, although some
implement an in-experience customization system like the [Merch
Booth](/resources/modules/merch-booth) module.
Other experiences make limited
[modifications](../characters/appearance.md)
to player avatars such as helmets, wings, or accessories that match the genre.

To create a unique experience that alters the appearance of your users, you can customize the default character properties with the following:

- Configure the Avatar [Game Settings](#game-settings) to set basic global avatar appearance defaults for all users.
- Use [HumanoidDescription](#humanoiddescription) at any point to apply a wide-range of specific character customizations to one or more users in your experience.

## Game Settings

The **Avatar** section in [Game Settings](../studio/game-settings.md#avatar) menu allows you to quickly set several global character properties in your experience. When editing the Avatar Game Settings, your avatar displays in the workspace as a visual preview.

<img src="../assets/avatar/character-customization/Avatar-In-Editor-Window.jpg"
width="800" />

You can adjust the following character properties in your experience using the Avatar Game Settings:

<table>
<thead>
  <tr>
    <th>Setting</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Presets</td>
    <td>Applies a common set of `Class.HumanoidDescription.BodyTypeScale|BodyTypeScale` and `Class.HumanoidDescription.ProportionScale|ProportionScale` combinations. You can further adjust these properties with `Class.HumanoidDescription` after selecting a preset.</td>
  </tr>
  <tr>
    <td>Avatar Type</td>
    <td>Sets the default <a href = "#avatar-types">avatar type</a> to either **R15** or **R6**.</td>
  </tr>
  <tr>
    <td>Animation</td>
    <td>The set of `Class.Animation|Animations` a user has access to.</td>
  </tr>
  <tr>
    <td>Collision</td>
    <td>Sets the <a href = "#collision-boundaries">collision boundaries</a> for characters in the experience.</td>
  </tr>
  <tr>
    <td>Body Parts</td>
    <td>The Asset IDs of the `Class.HumanoidDescription.Face|Face`, `Class.HumanoidDescription.Head|Head`, `Class.HumanoidDescription.Torso|Torso`, `Class.HumanoidDescription.RightArm|RightArm`, `Class.HumanoidDescription.LeftArm|LeftArm`, `Class.HumanoidDescription.RightLeg|RightLeg` and `Class.HumanoidDescription.LeftLeg|LeftLeg` parts of a character.</td>
  </tr>
  <tr>
    <td>Clothing</td>
    <td>The Asset IDs of the classic `Class.Shirt`, `Class.Pants`, and `Class.ShirtGraphic` image textures that you can apply to the character.</td>
  </tr>
</tbody>
</table>

### Avatar Types

The **Avatar Type** setting sets your experience to only load **R15** or **R6** character models.

- **R15** is the default modern avatar with 15 limbs. This avatar allows for more flexible customization, accessory options, and animations.

- **R6** is a classic simple avatar with 6 limbs. This avatar type provides a retro feel but is limited in animations and additional customization. Changes to the body scale property do not affect <b>R6</b> characters.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/avatar/character-customization/R15-Example.jpg" />
    <figcaption>R15 Character Model.</figcaption>
  </figure>
  <figure>
    <img src="../assets/avatar/character-customization/R6-Example.jpg" />
    <figcaption>R6 Character Model.</figcaption>
  </figure>
</GridContainer>

### Collision Boundaries

The **Collision** setting sets the collision boundaries for characters in the experience. This doesn't impact the physical appearance of the characters in your experience.

Setting this option to **Outer Box** dynamically sizes the collision boxes of characters based on their individual models. This is the default and recommended setting for most experiences.

Setting this option to **Inner Box** provides fixed collision boundaries for all characters in your experience.

## HumanoidDescription

Playable character models contain a `Class.Humanoid` object that allows the model special characteristics, such as walking, jumping, equipping items, and interacting with the environment. To customize a `Class.Humanoid` character's appearance, you can apply a new `Class.HumanoidDescription` to change character properties.

You can adjust the following character properties in your experience using `Class.HumanoidDescription`:

<table>
<thead>
  <tr>
    <th>Character Property</th>
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

1. [Create a description](#creating-humanoiddescription) from the user's character, a specific Outfit ID, or from a specific User ID.
2. [Modify the description](#modifying-humanoiddescription) to customize the properties that you want to apply to the `Class.Humanoid` character.
3. [Apply the description](#applying-humanoiddescription) on either a single character, all player characters, or even on all spawning characters.

<Alert severity="warning">
When updating a character's properties through `Class.HumanoidDescription`, it is important to use an up-to-date `Class.HumanoidDescription` of that specific `Class.Humanoid` with `Class.Humanoid:GetAppliedDescription()|Humanoid:GetAppliedDescription()`.
</Alert>

### Creating HumanoidDescription

You can create a new `Class.HumanoidDescription` instance directly within the Explorer hierarchy or within a `Class.Script` with the following code:

```lua
local humanoidDescription = Instance.new("HumanoidDescription")
```

In most cases, you should use an existing `Class.HumanoidDescription` instead of a default new `Class.HumanoidDescription` by referencing an [existing player character](#from-the-player-character), [avatar outfit](#from-an-existing-outfit), or [user ID](#from-a-specific-user).

#### From the Player Character

Use the following code sample to create a new `Class.HumanoidDescription` based on the player character's current properties:

```lua
local humanoid = player.Character and player.Character:FindFirstChild("Humanoid")

local humanoidDescription = Instance.new("HumanoidDescription")

if humanoid then
  humanoidDescription = humanoid:GetAppliedDescription()
end
```

#### From an Existing Outfit

Use the following sample code to create a `Class.HumanoidDescription` from an outfit ID using `Class.Players:GetHumanoidDescriptionFromOutfitId()|Players.GetHumanoidDescriptionFromOutfitID`:

```lua
local Players = game:GetService("Players")

local outfitId = 480059254

local humanoidDescriptionFromOutfit = Players:GetHumanoidDescriptionFromOutfitId(outfitId)
```

#### From a Specific User

Use the following sample code to create a `Class.HumanoidDescription` from a user ID using `Class.Players:GetHumanoidDescriptionFromUserId()`:

```lua
local Players = game:GetService("Players")

local userId = 491243243

local humanoidDescriptionFromUser = Players:GetHumanoidDescriptionFromUserId(userId)
```

### Modifying HumanoidDescription

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

#### Setting Multiple Accessories

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

### Applying HumanoidDescription

Apply `Class.HumanoidDescription` to specific `Class.Humanoid` characters in your experience with `Class.Humanoid:ApplyDescription()` or `Class.Player:LoadCharacterWithHumanoidDescription()|Humanoid.LoadCharacterWithHumanoidDescription`.

<Alert severity="warning">
Changing the assets on a character while also changing `Class.HumanoidDescription` might lead to undefined behavior.
</Alert>

#### On a Single Character

`Class.Humanoid:ApplyDescription()|ApplyDescription()` can target any `Class.Humanoid`. Use the following code to add a new pair of sunglasses and a new torso to the player character:

```lua
local humanoid = player.Character and player.Character:FindFirstChild("Humanoid")
if humanoid then
  local descriptionClone = humanoid:GetAppliedDescription()
  descriptionClone.Torso = 86500008
  -- Multiple face accessory assets are allowed in a comma-separated string
  descriptionClone.FaceAccessory = descriptionClone.FaceAccessory .. ",2535420239"
  -- Apply modified "descriptionClone" to humanoid
  humanoid:ApplyDescription(descriptionClone)
end
```

#### On All Player Characters

Use the following sample code to apply a `Class.HumanoidDescription` to all current players in the game:

```lua
local Players = game:GetService("Players")

for _, player in Players:GetPlayers() do
  local humanoid = player.Character and player.Character:FindFirstChild("Humanoid")
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

#### On All Spawning Characters

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
