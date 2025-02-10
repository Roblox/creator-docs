---
title: Avatar Editor Service
description: The Avatar Editor Service allows access to a user's avatar and inventory and Marketplace.
---

The Avatar Editor Service lets you access and make changes to a user's avatar within an experience. The Avatar Editor Service can also access a user's inventory and the [Marketplace](https://www.roblox.com/catalog) to save outfits and purchase avatar items to the user's account.

We recommend implementing the Avatar Editor Service with an in-game avatar editor for a complete character customization experience. See the [Simple Avatar Editor Demo](https://www.roblox.com/games/9376329300/Simple-Avatar-Editor-Demo) reference place for an example of this feature.

To begin using the Avatar Editor Service, you must first [request access](#request-access) to the user's inventory. After access is successfully granted, you can perform the following actions:

- [Read user's inventory](#read-user-inventory) to get a list of items owned by the user.
- [Search the Marketplace](#search-the-marketplace), using a variety of properties to filter and sort.
- [Equip avatar items and save outfits](#save-avatars-and-outfits) to the user's avatar.
- [Prompt the user to purchase](#purchase-items) an Marketplace item.

## Request access

To begin accessing a user's inventory, you need to prompt the user to allow access through `Class.AvatarEditorService:PromptAllowInventoryReadAccess()|PromptAllowInventoryReadAccess()`. You need to perform this request once per session.

Use the following code sample to initiate the access prompt and listen for the user response:

```lua
local AvatarEditorService = game:GetService("AvatarEditorService")

AvatarEditorService:PromptAllowInventoryReadAccess()

local result = AvatarEditorService.PromptAllowInventoryReadAccessCompleted:Wait()

if result == Enum.AvatarPromptResult.Success then
  -- Access granted!
end
```

The user receives the following prompt:

<img src="../assets/avatar/avatar-editor-service/Avatar-Editor-Access-Items.png" width="400" />

Once the user accepts the prompt, the `Class.AvatarEditorService` can begin accessing the user's inventory.

## Read user inventory

Once access is granted by the user, you can read their inventory with the `Class.AvatarEditorService:GetInventory()|GetInventory()` function, supplying an array of `Enum.AvatarAssetType|AvatarAssetTypes` to filter by. This function returns an `Class.InventoryPages` object containing the user owned items.

Use the following code sample to print a list of specific accessories in a user's inventory:

```lua
local AvatarEditorService = game:GetService("AvatarEditorService")

AvatarEditorService:PromptAllowInventoryReadAccess()

local result = AvatarEditorService.PromptAllowInventoryReadAccessCompleted:Wait()

if result == Enum.AvatarPromptResult.Success then
  -- Access granted!
  local assetTypes = {
    Enum.AvatarAssetType.BackAccessory,
    Enum.AvatarAssetType.ShoulderAccessory,
    Enum.AvatarAssetType.WaistAccessory
  }
  local pagesObject = AvatarEditorService:GetInventory(assetTypes)
  local currentPage = pagesObject:GetCurrentPage()
  for _, item in currentPage do
    print(item)
  end
end
```

## Search the Marketplace

`Class.AvatarEditorService` includes functions and events which let you search the Roblox catalog. To search, supply your query with a `Datatype.CatalogSearchParams` object that includes one or more of the following properties:

<table>
<thead>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>AssetTypes</td>
    <td>An array of `Enum.AvatarAssetType` such as Enum.AvatarAssetType.BackAccessory.</td>
  </tr>
  <tr>
    <td>BundleTypes</td>
    <td>An array of `Enum.BundleType` such as Enum.BundleType.BodyParts.</td>
  </tr>
  <tr>
    <td>CategoryFilter</td>
    <td>A `Enum.CatalogCategoryFilter` describing the various catalog categories like "Featured" or "Community Creations". By default this is set to `Enum.CatalogCategoryFilter.None`</td>
  </tr>
  <tr>
    <td>MaxPrice</td>
    <td>An integer describing the maximum price to filter.</td>
  </tr>
  <tr>
    <td>MinPrice</td>
    <td>An integer describing the minimum price to filter. By default, MinPrice is <b>0</b>.</td>
  </tr>
  <tr>
    <td>SearchKeyword</td>
    <td>A string to query against item descriptions in the catalog.</td>
  </tr>
  <tr>
    <td>SortType</td>
    <td>A `Enum.CatalogSortType` that describes how the results are ordered. By default this is set to `Enum.CatalogSortType.Relevance`.</td>
  </tr>
  <tr>
    <td>IncludeOffSale</td>
    <td>A boolean describing whether the results of the search include off sale items. By default this is set to false.</td>
  </tr>
  <tr>
    <td>CreatorId</td>
    <td>An integer to specify a given creator. You can use either a UserId or a GroupId.</td>
  </tr>
  <tr>
  <td>CreatorName</td>
    <td>A string used to search by items created by a given creator. You can use either a User Name or a Group Name.</td>
  </tr>
</tbody>
</table>

The following code sample constructs a `Datatype.CatalogSearchParams` object for **Back** and **Shoulder** asset types, and passes that through a `Class.AvatarEditorService:SearchCatalog()|SearchCatalog()` call:

```lua
local AvatarEditorService = game:GetService("AvatarEditorService")

local catalogSearchParams = CatalogSearchParams.new()
local assetTypes = {
  Enum.AvatarAssetType.BackAccessory,
  Enum.AvatarAssetType.ShoulderAccessory
}
catalogSearchParams.AssetTypes = assetTypes

local pagesObject =
--This function returns a CatalogPages object containing the results.
AvatarEditorService:SearchCatalog(catalogSearchParams)
local currentPage = pagesObject:GetCurrentPage()
for _, item in currentPage do
  print(item)
end
```

## Save avatars and outfits

When used alongside an in-game avatar editor, `Class.AvatarEditorService` can save and update avatar items and outfits to the Roblox platform. Users don't receive catalog items they don't own when saving an avatar or outfit.

Any `Class.HumanoidDescription` can be saved to the user's current avatar with `Class.AvatarEditorService:PromptSaveAvatar()|PromptSaveAvatar()`. This may include:

- Pre-defined avatar configurations that you've built using existing catalog items.
- Any configuration that the user has chosen through an in-game avatar editor.

<img src="../assets/avatar/avatar-editor-service/Avatar-Editor-Equip-Items.png" width="400" />

Since `Class.AvatarEditorService:PromptSaveAvatar()` does not yield, you can get the result by listening to the `Class.AvatarEditorService.PromptSaveAvatarCompleted` event.

The following code will save a current `Class.HumanoidDescription` using `Class.AvatarEditorService:PromptSaveAvatar()|PromptSaveAvatar()` and checks for a successful `Class.AvatarEditorService.PromptSaveAvatarCompleted` event:

```lua
local AvatarEditorService = game:GetService("AvatarEditorService")
local Players = game:GetService("Players")

local player = Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait()
local humanoid = character:WaitForChild("Humanoid")

local currentDescription = humanoid:GetAppliedDescription()
AvatarEditorService:PromptSaveAvatar(currentDescription, humanoid.RigType)

local result = AvatarEditorService.PromptSaveAvatarCompleted:Wait()
if result == Enum.AvatarPromptResult.Success then
  -- Avatar saved!
end
```

To save any `Class.HumanoidDescription` as an outfit (without overwriting the user's current avatar), use `Class.AvatarEditorService:PromptCreateOutfit()`.

<img src="../assets/avatar/avatar-editor-service/Avatar-Editor-Save-Outfit.png" width="400" />

Once called, you can get the result of `Class.AvatarEditorService:PromptCreateOutfit()` by listening to the `Class.AvatarEditorService.PromptCreateOutfitCompleted` event.

The following code sample creates an outfit with `Class.AvatarEditorService:PromptCreateOutfit()` and listens for a successful `Class.AvatarEditorService.PromptCreateOutfitCompleted` event:

```lua
local AvatarEditorService = game:GetService("AvatarEditorService")
local Players = game:GetService("Players")

local player = Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait()
local humanoid = character:WaitForChild("Humanoid")

local currentDescription = humanoid:GetAppliedDescription()
AvatarEditorService:PromptCreateOutfit(currentDescription, humanoid.RigType)

local result = AvatarEditorService.PromptCreateOutfitCompleted:Wait()
if result == Enum.AvatarPromptResult.Success then
  -- Outfit saved!
end
```

## Purchase items

When saving either an avatar or an outfit that uses catalog items, the user doesn't receive any items that they do not own. Before saving an avatar or outfit, check if the user owns the asset with `Class.MarketplaceService:PlayerOwnsAsset()` and provide them with an option to purchase the item with `Class.MarketplaceService:PromptPurchase()`.

If you don't wish to implement item purchases, you can instead allow users to favorite non-owned items with `Class.AvatarEditorService:PromptSetFavorite()`.

<Alert severity="info">
 Be aware that you can't earn Robux <a href="../marketplace/marketplace-fees-and-commissions.md#commissions">commissions</a> if the user decides to purchase those items outside of your experience.
</Alert>
