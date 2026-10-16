---
title: In-experience creation for makeup
description: Explains how to use AvatarCreationService, WrapTarget, and WrapTextureTransfer APIs to prompt users to create and purchase makeup assets from within your experience.
---

<Alert severity = 'warning'>
The following guide applies to creators who are familiar with scripting and Roblox Studio and intend to develop experiences that allow user-generated makeup assets.
</Alert>

You can publish an experience that allows players to create, customize, and purchase makeup assets in real time, in addition to [in-experience avatar body creation](in-experience-creation.md). When purchased, makeup assets save directly to the player's Roblox inventory.

Experience owners that implement in-experience makeup creation benefit from [Marketplace commissions](../marketplace/marketplace-fees-and-commissions.md#commissions) as the **publisher** of the makeup asset, while the player who creates it is the asset's **creator**.

<Alert severity = 'warning'>
Makeup assets created in-experience aren't listed on the Marketplace and can't be resold or traded.
</Alert>

<Alert severity = 'info'>
Makeup is only supported on R15 characters with `Class.MeshPart` heads. Before implementing in-experience makeup creation, familiarize yourself with [Avatar makeup](makeup/index.md), which covers authoring makeup assets in Studio. You can test in-experience makeup creation in Roblox's [Avatar Creator](https://www.roblox.com/games/124012682058672/Roblox-Avatar-Creator) demo.
</Alert>

## How to implement in-experience makeup creation

Use the following instructions and code references to prompt players to paint, assemble, and purchase makeup assets on their avatar's head.

Before getting started, familiarize yourself with the following:

- [Avatar creation tokens](in-experience-creation.md#generate-an-avatar-creation-token) — Experiences implementing makeup creation require at least one creation token whose creation type matches the makeup asset type you intend to create.
- API classes
  - `Class.AvatarCreationService` — Handles avatar asset creation prompting and validation.
  - `Class.EditableImage` — Handles runtime creation and manipulation of textures.
  - `Class.EditableMesh` — Handles runtime manipulation of mesh geometry.
  - `Class.WrapDeformer` — Handles runtime manipulation of invisible outer cage geometry that lets avatar characters equip [3D clothing and accessories](../avatar/layered-accessories/index.md), including layered eyebrow and eyelash meshes.
  - `Class.WrapTarget` — Represents the binding between a cage mesh and a target mesh, and exposes texture-space conversion between the two.
  - `Class.WrapTextureTransfer` — Facilitates a decal, including a makeup decal, wrapping around a parent mesh based on its `Class.WrapTarget`.

### Choose a single-asset or multi-asset flow

Makeup creation supports two prompts, depending on whether you're creating one makeup asset or compositing several layers into one outfit:

- `Class.AvatarCreationService:PromptCreateAvatarAssetAsync()` — Creates a single, individually-authored makeup asset. Pass one of the five supported `Enum.AvatarAssetType` values: `Enum.AvatarAssetType.FaceMakeup|FaceMakeup`, `Enum.AvatarAssetType.LipMakeup|LipMakeup`, or `Enum.AvatarAssetType.EyeMakeup|EyeMakeup` for a painted texture, or `Enum.AvatarAssetType.EyebrowAccessory|EyebrowAccessory` or `Enum.AvatarAssetType.EyelashAccessory|EyelashAccessory` for a layered mesh accessory. The token's creation type must match the `assetType` you pass in.
- `Class.AvatarCreationService:PromptCreateMakeupAsync()` — Composites **two or more** makeup layers into a single purchasable outfit. Each layer supplies its own creation token and `Enum.AvatarAssetType`, plus a sort order for compositing, and the whole outfit shares one head color. If you only need to create one makeup asset, use `PromptCreateAvatarAssetAsync()` instead — `PromptCreateMakeupAsync()` requires at least two entries.

`PromptCreateMakeupAsync()` takes a list of makeup asset entries, where each entry includes:

- A creation token ID for that layer.
- The instance to create the asset from.
- The layer's `AvatarAssetType` as an `Enum.AvatarAssetType`.
- A sort order controlling compositing when multiple layers overlap.

It returns an `Enum.PromptCreateMakeupResult` for the outfit as a whole (`Success`, `PartialSuccess`, `CreationFailure`, `PermissionDenied`, `Timeout`, `NoUserInput`, or `UnknownFailure`), plus a per-asset result so you can tell which individual layers succeeded when the overall result is `PartialSuccess`.

### Generate an avatar creation token

Each makeup asset type requires its own [avatar creation token](../production/monetization/avatar-creation-token.md) whose creation type matches the `Enum.AvatarAssetType` you pass to `PromptCreateAvatarAssetAsync()`, or matches each layer's asset type when using `PromptCreateMakeupAsync()`. Generate the required tokens before you build the submission entries, then copy each token ID for the server-side prompt.

<img src="../assets/avatar/avatar-iec-makeup/Avatar-Creation-Token-Type-Makeup.png" width="40%" alt="Select Token Type dropdown set to Eye Makeup, with a token's context menu open showing a Copy Token ID option" />

The steps that follow use projected painting on the player's head as the main path. If you instead paint an authoring head or another experience-owned mesh in its native UV space, follow [Move a texture between cage space and target space](#move-a-texture-between-cage-space-and-target-space), then rejoin the main path at [Create the decal and submit for creation](#create-the-decal-and-submit-for-creation).

### Paint a makeup texture on the player's head

Unlike painting on a net-new asset, you generally can't read an `Class.EditableMesh` directly off the local player's head to paint on — the head mesh is subject to the same permission model as other player-owned instances. The exception is when the experience owns the head mesh (for example, an experience-owned NPC or a body the experience itself created); in that case you can use `Class.EditableMesh` directly, the same way you would for [avatar body creation](in-experience-creation.md). Otherwise, prepare a `Class.WrapTextureTransfer` and use it as the projection target when drawing:

1. Call `Class.WrapTextureTransfer:PrepareProjectionMeshDataAsync()` to prepare and cache the projection mesh data for the player's head. This must complete before you make any projected draw or sample calls against that transfer. If the underlying head mesh changes, re-prepare the `Class.WrapTextureTransfer` before continuing to paint.
2. Pass the prepared `Class.WrapTextureTransfer` as the projection source to `Class.EditableImage:DrawImageProjected()|DrawImageProjected()` or `Class.EditableImage:SampleImageProjected()|SampleImageProjected()`. These methods accept a `Class.WrapTextureTransfer` as an alternative to an `Class.EditableMesh`, letting you paint directly against the player's actual head shape instead of a generic mesh.

<img src="../assets/avatar/avatar-iec-makeup/Makeup-Texture-Paint-Projection.png" />

```lua
local AssetService = game:GetService("AssetService")

-- Pass in a WrapTextureTransfer you've already created for the player's head.
local function paintMakeupLayer(textureTransfer: WrapTextureTransfer, brushConfig, projectionParams)
	local success, err = pcall(function()
		textureTransfer:PrepareProjectionMeshDataAsync()
	end)
	if not success then
		warn("Failed to prepare projection mesh data:", err)
		return
	end

	local makeupTexture = AssetService:CreateEditableImage()
	if not makeupTexture then
		warn("Not enough editable memory to create a makeup texture")
		return
	end

	makeupTexture:DrawImageProjected(textureTransfer, projectionParams, brushConfig)
	return makeupTexture
end
```

### Move a texture between cage space and target space

Painting directly on a player-owned head through a prepared `Class.WrapTextureTransfer`, as described in [Paint a makeup texture on the player's head](#paint-a-makeup-texture-on-the-players-head), doesn't start in the head mesh's target UV space — the projection path works in the shared cage UV layout the whole time, so the result is already a cage-space texture ready to submit.

Cage/target conversion instead matters when you're working with an authoring head or an experience-owned mesh that you can paint directly in its own native target UV space:

- `Class.WrapTarget:CreateTextureInTargetSpaceAsync()` — Maps a reusable cage-space texture onto that mesh's target UV layout as an `Class.EditableImage` you can edit.
- `Class.WrapTarget:CreateTextureInCageSpaceAsync()` — Maps the edited target-space texture back onto cage UV space as an `Class.EditableImage` you can upload.

Use `CreateTextureInTargetSpaceAsync()` to bring a reusable cage-space makeup texture into that mesh's target space for editing, then use `CreateTextureInCageSpaceAsync()` to convert the edited result back to cage space before submitting it as a makeup asset.

For makeup, limit the cage-space conversion to the makeup region instead of the entire cage. Call `Class.AvatarCreationService:GetValidationRules()` and read `MakeupRules.WrapTextureTransferUVBounds`, which provides `MinBound` and `MaxBound` as `Datatype.Vector2` values. Pass them to `CreateTextureInCageSpaceAsync()` as `MinUVBounds` and `MaxUVBounds`. Without these options, the method derives bounds from the entire cage instead of using the makeup region. Each bound must be finite, and the maximum must be greater than the minimum on both axes.

```lua
local AvatarCreationService = game:GetService("AvatarCreationService")

local validationRules = AvatarCreationService:GetValidationRules()
local makeupBounds = validationRules.MakeupRules.WrapTextureTransferUVBounds

local cageSpaceTexture = wrapTarget:CreateTextureInCageSpaceAsync(targetSpaceTexture, {
	MinUVBounds = makeupBounds.MinBound,
	MaxUVBounds = makeupBounds.MaxBound,
})
```

### Create the decal and submit for creation

Face, lip, and eye makeup are painted textures, while eyebrows and eyelashes are individually authored layered mesh accessories, the same way as other [3D clothing and accessories](../avatar/layered-accessories/index.md). Build each layer's submission entry accordingly:

- For a finished cage-space makeup texture as an `Class.EditableImage`, wrap it in a `Class.Decal` with `Class.AssetService:CreateDecalAsync()`, then parent the `Class.WrapTextureTransfer` you used to paint it to that `Class.Decal`.
- For an eyebrow or eyelash layer, use the authored `Class.Accessory` instance directly.

Combine the resulting instance with the matching token ID from [Generate an avatar creation token](#generate-an-avatar-creation-token), its asset type, and its layer order. The following sample takes those entries, of either kind, and automatically chooses the right API: `Class.AvatarCreationService:PromptCreateAvatarAssetAsync()` for a single entry, or `Class.AvatarCreationService:PromptCreateMakeupAsync()` when compositing two or more layers into one outfit.

Both prompts show the player a final confirmation screen before submitting the asset for creation and moderation.

<img src="../assets/avatar/avatar-iec-makeup/Makeup-Creation-Publish-Prompt.png" width="40%" />

```lua
local AssetService = game:GetService("AssetService")
local AvatarCreationService = game:GetService("AvatarCreationService")

type MakeupEntry = {
	tokenId: string,
	instance: Instance,
	assetType: Enum.AvatarAssetType,
	sortOrder: number,
}

-- Face, lip, and eye makeup: wrap the finished texture in a Decal and parent the
-- WrapTextureTransfer used to paint it, as the Decal's only child.
local function createMakeupTextureEntry(
	tokenId: string,
	texture: EditableImage,
	textureTransfer: WrapTextureTransfer,
	assetType: Enum.AvatarAssetType,
	sortOrder: number
): MakeupEntry
	local decal = AssetService:CreateDecalAsync({
		TextureContent = Content.fromObject(texture),
	})
	decal.Face = Enum.NormalId.Front
	textureTransfer.Parent = decal

	return {
		tokenId = tokenId,
		instance = decal,
		assetType = assetType,
		sortOrder = sortOrder,
	}
end

-- Eyebrows and eyelashes: pass the authored layered mesh Accessory directly.
local function createMakeupAccessoryEntry(
	tokenId: string,
	accessory: Accessory,
	assetType: Enum.AvatarAssetType,
	sortOrder: number
): MakeupEntry
	return {
		tokenId = tokenId,
		instance = accessory,
		assetType = assetType,
		sortOrder = sortOrder,
	}
end

local function submitMakeupEntries(entries: {MakeupEntry}, player: Player, headColor: Color3?)
	local assetEntries = {}
	for _, entry in entries do
		table.insert(assetEntries, {
			TokenId = entry.tokenId,
			Instance = entry.instance,
			AvatarAssetType = entry.assetType,
			SortOrder = entry.sortOrder,
		})
	end

	if #assetEntries == 1 then
		local entry = assetEntries[1]
		local success, result, assetIdOrErrorMessage = pcall(function()
			return AvatarCreationService:PromptCreateAvatarAssetAsync(
				entry.TokenId,
				player,
				entry.Instance,
				entry.AvatarAssetType
			)
		end)

		if success and result == Enum.PromptCreateAssetResult.Success then
			print("Successfully uploaded with AssetId:", assetIdOrErrorMessage)
		else
			print("Makeup asset creation unsuccessful:", assetIdOrErrorMessage)
		end
	else
		local success, result, perAssetResults = pcall(function()
			return AvatarCreationService:PromptCreateMakeupAsync(player, assetEntries, headColor)
		end)

		if success and result == Enum.PromptCreateMakeupResult.Success then
			print("Successfully created makeup outfit")
		else
			print("Makeup outfit creation result:", result, perAssetResults)
		end
	end
end
```

## Handle moderation

After a makeup asset is created, it goes through moderation before it's safe to use in-experience.

- Listen for `Class.AvatarCreationService.AvatarAssetModerationCompleted|AvatarAssetModerationCompleted` to know when an individual makeup asset created with `PromptCreateAvatarAssetAsync()` finishes moderation.
- For a multi-layer outfit created with `PromptCreateMakeupAsync()`, `AvatarAssetModerationCompleted` still fires once for each individual makeup asset in the outfit, and `Class.AvatarCreationService.AvatarOutfitModerationCompleted|AvatarOutfitModerationCompleted` additionally fires once for the outfit as a whole. Listen for both: use the per-asset event if you need to know the moderation result of a specific layer, and the outfit-level event to know when the entire look is safe to use in-experience.
