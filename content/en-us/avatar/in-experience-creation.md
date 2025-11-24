---
title: Avatar in-experience creation
description: Explains how to use AvatarCreationService to prompt users to create and purchase avatars from within your experience.
---

<Alert severity = 'warning'>
The following guide applies to creators who are familiar with scripting and Roblox Studio and intend to develop experiences that allow user-generated avatar items.
</Alert>

You can publish an experience that allows players to create, customize, and purchase avatar bodies in real time. When purchased, these custom bodies save directly to the player's Roblox inventory, allowing players to equip and wear the custom avatars in other experiences.

Experience owners that implement in-experience avatar creation benefit from [Marketplace commissions](../marketplace/marketplace-fees-and-commissions.md#commissions) as both **creator** of the avatar item and **experience owner**. If an asset created in-experience is inspected, the item provides a link to the original experience it was created.

You can test in-experience creation in Roblox's [Avatar Creator](https://www.roblox.com/games/124012682058672/Roblox-Avatar-Creator) demo.

<Alert severity = 'warning'>
Avatar assets created in-experience are not listed on the Marketplace, and cannot be resold or traded. At this time, in-experience creation only allows the creation of custom avatar bodies.
</Alert>

## How to implement in-experience creation

Use the following instructions and code references to create your first in-experience avatar creation project. The following instructions uses a base body `Class.Model` that players can modify and customize before publishing.

Before getting started, familiarize yourself with the following:

- Avatar models — The following implementation requires importing a base body that meets Roblox's 15 part specifications. This `Class.Model` serves as a base for additional user customization and modification.
  - The base body must meet Roblox's [Avatar body guidelines](../marketplace/marketplace-policy.md#avatar-body-guidelines), including the minimum number of FACS control for facial rigging.
- [Avatar creation tokens](#generate-an-avatar-creation-token) — Experiences implementing avatar creation require at least one creation token. These tokens require Robux to purchase and allow you to set prices and other sale settings for purchases made in-experience.
- API classes
  - `Class.AvatarCreationService` — Handles avatar creation prompting and validation.
  - `Class.EditableImage` — Handles runtime creation and manipulation of textures.
  - `Class.EditableMesh` — Handles runtime manipulation of mesh geometry.
  - `Class.WrapDeformer` — Handles runtime manipulation of invisible outer cage geometry that allow avatar characters to equip [3D clothing](../art/accessories/layered-clothing.md).

### Import a base body

The base body acts as the initial foundation which users can customize and edit. You can use your own `Class.Model`, or import a custom asset with the [3D Importer](../art/modeling/3d-importer.md) and setup through [Avatar Setup](../avatar-setup/index.md).

Base bodies must adhere to Roblox's avatar specifications, and must include components such as the 15 `Class.MeshPart` instances that make up 6 body parts: head, torso, left arm, left leg, right arm, and right leg, as well as other [avatar components](../art/characters/index.md#components-of-an-avatar).

<Alert severity = 'info'>
If you have a single-mesh body, you can try using the [Avatar Auto Setup](../avatar-setup/index.md#avatar-auto-setup) to automatically add all the necessary avatar components.
</Alert>

For references and samples of properly configured avatar bodies, see [Avatar references](../avatar/resources.md#references).

### Implement editing APIs

To develop a system where users can edit the `Class.MeshPart` instances on an avatar in your experience for creation, use `Class.EditableImage` for texture editing, `Class.EditableMesh` for mesh editing, and `Class.WrapDeformer` for maintaining skinning and FACS data during mesh edits.

1.  After importing your base body, use the following script to set up your `Class.EditableImage|EditableImages`, `Class.EditableMesh|EditableMeshes`, and `Class.WrapDeformer|WrapDeformers`.

        ```lua
        local AssetService = game:GetService("AssetService")

        local function setupBodyPart(meshPart, wrapTarget)
        	-- Create and attach a WrapDeformer to the MeshPart
        	local wrapDeformer = Instance.new("WrapDeformer")
        	wrapDeformer.Parent = meshPart

        	-- Create an editable mesh for the wrap target's cage mesh
        	local cageEditableMesh: EditableMesh =
        		AssetService:CreateEditableMeshAsync(Content.fromUri(wrapTarget.CageMeshId), {
        			FixedSize = true,
        		})

        	-- Assign the cage mesh to the WrapDeformer
        	wrapDeformer:SetCageMeshContent(Content.fromObject(cageEditableMesh))
        end

        local function setupRigidMesh(meshPart)
        	-- Create an editable mesh from the original MeshPart
        	local editableMesh = AssetService:CreateEditableMeshAsync(Content.fromUri(meshPart.MeshId), {
        		FixedSize = true,
        	})

        	-- Generate a new MeshPart from the editable mesh
        	local newMeshPart = AssetService:CreateMeshPartAsync(Content.fromObject(editableMesh))

        	-- Copy size, position, and texture from the original MeshPart
        	newMeshPart.Size = meshPart.Size
        	newMeshPart.CFrame = meshPart.CFrame
        	newMeshPart.TextureContent = meshPart.TextureContent

        	-- Apply the new MeshPart back to the original
        	meshPart:ApplyMesh(newMeshPart)
        end

        local function setupMeshTexture(meshPart, textureIdToEditableImageMap)
        	-- If EditableImage already exists for this TextureID, resuse it rather than making a new one
        	if textureIdToEditableImageMap[meshPart.TextureID] then
        		meshPart.TextureContent =
        			Content.fromObject(textureIdToEditableImageMap[meshPart.TextureID])
        		return
        	end

        	-- Create a new EditableImage and apply it as the texture content
        	local editableImage = AssetService:CreateEditableImageAsync(Content.fromUri(meshPart.TextureID))
        	textureIdToEditableImageMap[meshPart.TextureID] = editableImage
        	meshPart.TextureContent = Content.fromObject(editableImage)
        end

        local function setupModel(model)
        	-- Map for reusing EditableImage instances by texture ID
        	local textureIdToEditableImageMap = {}
        	for _, descendant in model:GetDescendants() do
        		if not descendant:IsA("MeshPart") then
        			continue
        		end

        		-- Configure MeshPart based on WrapTarget presence
        		-- If WrapTarget is present, add a WrapDeformer child with an EditableMesh
        		-- Otherwise, apply EditableMesh to the MeshPart directly
        		local wrapTarget = descendant:FindFirstChildOfClass("WrapTarget")
        		if wrapTarget then
        			setupBodyPart(descendant, wrapTarget)
        		else
        			setupRigidMesh(descendant)
        		end

        		-- Configure the EditableImage for the MeshPart
        		setupMeshTexture(descendant, textureIdToEditableImageMap)
        	end
        end
        ```

2.  Create `Class.EditableImage` tools that allow players to recolor, draw, or add stickers to your base body. You can leverage APIs in like `Class.EditableImage:DrawImage()|DrawImage()`, `Class.EditableImage:DrawRectangle()|DrawRectangle()`, `Class.EditableImage:WritePixelsBuffer()|WritePixelsBuffer()`.

    - For advanced transformations, `Class.EditableImage:DrawImageTransformed()|DrawImageTransformed()` allows you to specify position, rotation, and scale when drawing one EditableImage onto another. Similarly, `Class.EditableImage:DrawImageProjected()|DrawImageProjected()` works much like `Class.EditableImage:DrawImage()|DrawImage()` but projects the drawn image properly if the `Class.EditableImage` instance is used with a `Class.MeshPart`.

            ```lua
            local function recolorTexture(
            	meshPart: MeshPart,
            	color: Color3
            )
            	local bodyPartTexture = AssetService:CreateEditableImageAsync(meshPart.TextureID)
            	meshPart.TextureContent = Content.fromObject(bodyPartTexture)

            	bodyPartTexture:DrawRectangle(
            		Vector2.new(0, 0),
            		bodyPartTexture.Size,
            		color,
            		0,
            		Enum.ImageCombineType.Overwrite
            	)
            end

            local function applySticker(
            	meshPart: MeshPart,
            	textureCoordinate: Vector2,
            	stickerId: TextureId
            )
            	local bodyPartTexture = AssetService:CreateEditableImageAsync(meshPart.TextureID)
            	meshPart.TextureContent = Content.fromObject(bodyPartTexture)

            	local stickerTexture = AssetService:CreateEditableImageAsync(stickerId)
            	bodyPartTexture:DrawImage(textureCoordinate, stickerTexture, Enum.ImageCombineType.BlendSourceOver)
            end

            local function applyStickerProjected(
              meshPart: MeshPart,
              targetMesh: EditableMesh,
              stickerId: TextureId,
              raycastHitPos: Vector3
            )
              local bodyPartTexture = AssetService:CreateEditableImageAsync(meshPart.TextureID)

              local relativePos = meshPart.CFrame:PointToWorldSpace(raycastHitPos)
              local direction = (workspace.CurrentCamera.CFrame.Position - relativePos).Unit

              local projectionParams: ProjectionParams = {
                  Direction = meshPart.CFrame:VectorToObjectSpace(direction),
                  Position = meshPart.CFrame:PointToObjectSpace(relativePos),
                  Size = Vector3.new(1, 1, 1),
                  Up = meshPart.CFrame:VectorToObjectSpace(Vector3.new(0, 1, 0)),
              }

              local stickerTexture = AssetService:CreateEditableImageAsync(stickerId)
              local localBrushConfig: BrushConfig = {
                  Decal = stickerTexture,
                  ColorBlendType = Enum.ImageCombineType.BlendSourceOver,
                  AlphaBlendType = Enum.ImageAlphaType.Default,
                  BlendIntensity = 1,
                  FadeAngle = 90.0
              }

              bodyPartTexture:DrawImageProjected(targetMesh, projectionParams, localBrushConfig)
            end
            ```

3.  Using `Class.WrapDeformer` and `Class.EditableMesh`, create tools for editing mesh deformations on your body.

    1.  `Class.WrapDeformer` handles the live deformations of the rendered `Class.MeshPart` geometry while maintaining the underlying skinning and FACS data.
    2.  `Class.EditableMesh` allows you to modify the cage mesh that the `Class.WrapDeformer` responds to.

        1.  Use `Class.WrapDeformer:SetCageMeshContent()` to apply the `Class.EditableMesh` instance that represents the relevant cage mesh to the `Class.WrapDeformer`.
        2.  Use `Class.EditableMesh`, such as `Class.EditableMesh:SetPosition()|SetPosition()`, to deform vertices and edit the shape of the `Class.MeshPart`.

        ```lua
        local function deformBodyPart(
        	meshPart: MeshPart,
        	controlPointCenter: Vector3,
        	controlPointRadius: number,
        	controlPointDeformation: Vector3
        )
        	local wrapTarget = meshPart:FindFirstChildWhichIsA("WrapTarget")
        	local cageMeshId = wrapTarget.CageMeshId
        	local wrapDeformer = Instance.new("WrapDeformer")
        	wrapDeformer.Parent = meshPart

        	local cageEditableMesh = AssetService:CreateEditableMeshAsync(cageMeshId)
        	local verticesWithinSphere =
        		cageEditableMesh:FindVerticesWithinSphere(controlPointCenter, controlPointRadius)
        	for _, vertexId in verticesWithinSphere do
        		local vertexPosition = cageEditableMesh:GetPosition(vertexId)
        		cageEditableMesh:SetPosition(vertexId, vertexPosition + controlPointDeformation)
        	end

        	wrapDeformer:SetCageMeshContent(Content.fromObject(cageEditableMesh))
        end
        ```

### Create creation prompt

After setting up your base body and editing APIs, create a prompt for users to create and purchase from the experience using `Class.AvatarCreationService:PromptCreateAvatarAsync()`.

```lua
export type BodyPartInfo = {
	bodyPart: Enum.BodyPart,
	instance: Instance --Folder with Created MeshParts
}
export type BodyPartList = {BodyPartInfo}

local function publishAvatar(bodyPartInstances: BodyPartList, player: Player, tokenId: string)
	local humanoidDescription = Instance.new("HumanoidDescription")
	for _, bodyPartInfo in bodyPartInstances do
		local bodyPartDescription = Instance.new("BodyPartDescription")
		bodyPartDescription.Instance = bodyPartInfo.instance
		bodyPartDescription.BodyPart = bodyPartInfo.bodyPart
		bodyPartDescription.Parent = humanoidDescription
	end

	local success, result, bundleIdOrErrorMessage, outfitId = pcall(function()
		return AvatarCreationService:PromptCreateAvatarAsync(tokenId, player, humanoidDescription)
	end)
	if success then
		if result == Enum.PromptCreateAvatarResult.Success then
			print("Successfully uploaded with BundleId: ", bundleIdOrErrorMessage)
      print("Successfully uploaded with OutfitId: ", outfitId)
		else
			print("Unsuccessfully uploaded with error message:", bundleIdOrErrorMessage)
		end
	else
		print("Avatar creation unsuccessful")
	end
end
```

`Class.AvatarCreationService:PromptCreateAvatarAsync()` takes a `Class.HumanoidDescription` parameter to represent the avatar intended for purchase or creation. For avatar creation, the character's `Class.HumanoidDescription` must
include new assets to be created for each of the 6 body parts
(`Enum.BodyPart.Head|Head`,
`Enum.BodyPart.Torso|Torso`,
`Enum.BodyPart.RightLeg|RightLeg`,
`Enum.BodyPart.LeftLeg|LeftLeg`,
`Enum.BodyPart.RightArm|RightArm`,
`Enum.BodyPart.LeftArm|LeftArm`). Optionally, it can also
include a new `Enum.AccessoryType.Hair|Hair` accessory.

To support this, the `Class.HumanoidDescription` should include 6
`Class.BodyPartDescription` children. Each `Class.BodyPartDescription.Instance` property references a `Class.Folder` which includes all of the `Class.MeshPart` instances that make up the body part. For example, the `LeftArm` folder contains
`LeftHand`, `LeftUpperArm`, and `LeftLowerArm` `Class.MeshPart|MeshParts`.
The `Class.BodyPartDescription.BodyPart` property should also be set to
the relevant `Enum.BodyPart`.

Each of the 15 `Class.MeshPart` body parts must include:

- An `Class.EditableImage`.
- A `Class.WrapDeformer` with an `Class.EditableMesh`.

The provided `Class.HumanoidDescription` should not include any pre-existing asset IDs to represent body parts or accessories on the intended creation. On the other hand, the `Class.HumanoidDescription` may include the humanoid scales of `Class.HumanoidDescription.BodyTypeScale|BodyTypeScale`,
`Class.HumanoidDescription.HeadScale|HeadScale`,
`Class.HumanoidDescription.HeightScale|HeightScale`,
`Class.HumanoidDescription.WidthScale|WidthScale`, and
`Class.HumanoidDescription.ProportionScale|ProportionScale`. Be mindful of
the scales that a base body is imported with so that they match the scales
provided to the `Class.HumanoidDescription`.

<img src="../assets/avatar/avatar-iec/Avatar-Creation-Format.png" width="320" />

#### Include accessories

If including an accessory, such as hair, the `Class.HumanoidDescription`
should include a child `Class.AccessoryDescription` where:

- The `Class.AccessoryDescription.Instance` property references
  the `Class.Accessory` instance.
- The `Class.AccessoryDescription.AccessoryType` property is
  set to the relevant `Enum.AccessoryType`.
  - In the case of including `Enum.AccessoryType.Hair` in your creations, the `Class.MeshPart` should include an `Class.EditableImage`. However, it should not include a `Class.WrapDeformer` child but should include an `Class.EditableMesh` set on the `Class.MeshPart` directly.

### Generate an avatar creation token

`Class.AvatarCreationService:PromptCreateAvatarAsync()` takes an **Avatar Creation Token ID** parameter. This token is the key for creations from your universe, and it is what you can use to set the price of avatar creation from your experience. For instructions and additional details on generating tokens, see [Avatar Creation Tokens](../production/monetization/avatar-creation-token.md).

After purchasing and generating your token, you can inspect the token in the Creator Hub to find the ID which you can then use for the `Class.AvatarCreationService:PromptCreateAvatarAsync()` API.

<img src="../assets/avatar/avatar-iec/Avatar-Token-Id.png" width="320" />

## Respond to players joining by attribution

Avatar bundles created in-experience include an attribution link to the original experience the avatar was created. If the avatar is inspected by another player, a prompt displays providing an option to visit the experience where the avatar was created.

<img src="../assets/avatar/avatar-iec/Avatar-Creation-Attribution.png" width="400" />

To handle players joining your experience using this attribution link, use `Class.Player:GetJoinData()` and parse the returned table for `GameJoinContext`.

`GameJoinContext` includes the following table values:

- `JoinSource` — `Enum.JoinSource`
  - A `Class.Player` joining your experience from this attribution link will have `Enum.JoinSource.CreatedItemAttribution` to indicate entry from a created item.
- `ItemType` — optional `Enum.AvatarItemType`
- `AssetId` — optional `string`
- `OutfitId` — optional `string`
- `AssetType` — optional `Enum.AssetType`
