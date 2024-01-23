---
title: External Catalog Queries
description: External Catalog Queries let you externally query the Creator Store Catalog and Marketplace Catalog.
---

You can search Roblox's assets outside Studio by accessing the external catalog API. Use the [Creator Store API](#creator-store-api) to query Studio assets, such as meshes, models, and audio, and the [Marketplace API](#marketplace-api) to query avatar assets on the Marketplace.

Each API requires a URL and custom search parameters for that specific catalog. If both URL and parameters are valid, the API returns a JSON format with the results of your search.

## Creator Store API

You can query items from the Creator Store catalog using the following URL:
`https://search.roblox.com/catalog/json?[params]`

You can replace `[params]` with the appropriate [query parameters](#query-parameters) to customize your search.

### Query Parameters

You can specify search parameters by appending a series of parameters and values to the URL, each separated by a `&`.

Use the following parameters to query the Creator Store catalog:

<table>
<thead>
  <tr>
    <th>Parameter</th>
    <th>Type</th>
    <th>Options and Values</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Category</td>
    <td>byte</td>
    <td>`6` = Models <br />`7` = Plugins <br />`8` = Decals <br />`9` = Audio <br />`10` = Meshes</td>
  </tr>
  <tr>
    <td>CreatorID</td>
    <td>long</td>
    <td>Specifies the `Class.Player.UserId|UserID` to filter in the search. If you'd like to find group-created items, enter the group agent's ID, not the group ID.</td>
  </tr>
  <tr>
    <td>CurrencyType</td>
    <td>byte</td>
    <td>`0` = All (Default) <br />`3` = CustomRobux <br />`5` = Free <br /> <br /> Use CustomRobux with custom PxMax and PxMin values. </td>
  </tr>
  <tr>
    <td>Genres</td>
    <td>byte</td>
    <td>Specifies the genre for the search. The recommended approach to filtering on genres is to match the URL of a catalog page. <br />`1` = TownAndCity <br />`2` = Medieval <br />`3` = SciFi <br />`4` = Fighting <br />`5` = Horror <br />`6` = Naval <br />`7` = Adventure <br />`8` = Sports <br />`9` = Comedy <br />`10` = Western <br />`11` = Military <br />`13` = Building <br />`14` = FPS <br />`15` = RPG </td>
  </tr>
  <tr>
    <td>Keyword</td>
    <td>string</td>
    <td>Standard keyword search.</td>
  </tr>
  <tr>
    <td>PageNumber</td>
    <td>int</td>
    <td>Specifies a page number in conjunction with `ResultsPerPage` to page through results.</td>
  </tr>
  <tr>
    <td>PxMax</td>
    <td>int</td>
    <td>The maximum price in Robux of items in the query.</td>
  </tr>
  <tr>
    <td>PxMin</td>
    <td>int</td>
    <td>The minimum price in Robux of items in the query.</td>
  </tr>
  <tr>
    <td>ResultsPerPage</td>
    <td>int</td>
    <td>By default this is the same as what's currently shown on each catalog browse page. You can't specify a value larger than this maximum amount.</td>
  </tr>
  <tr>
    <td>SortAggregation</td>
    <td>byte</td>
    <td>`0` = PastDay <br />`1` = PastWeek <br />`2` = PastMonth <br />`3` = AllTime</td>
  </tr>
  <tr>
    <td>SortType</td>
    <td>byte</td>
    <td>`0` = Relevance (Default)<br />`1` = MostFavorited <br />`2` = Bestselling <br />`3` = RecentlyUpdated <br />`4` = PriceLowToHigh <br />`5` = PriceHighToLow</td>
  </tr>
</tbody>
</table>

The following URL will search for 10 items in the "Models" subcategory, sorted by most recently updated.

`https://search.roblox.com/catalog/json?Category=6&SortType=3&ResultsPerPage=10`

### Response Fields

API responses return in a JSON format. The response provides asset details with the following primary fields:

<table>
<thead>
  <tr>
    <th>Field</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>AssetTypeID</td>
    <td>An asset type value. <br />`3` = Audio<br />`4` = Mesh<br />`5` = Lua<br />`10` = Model<br />`13` = Decal<br />`21` = Badge<br />`24` = Animation<br />`34` = GamePass<br />`38` = Plugin<br />`40` = MeshPart</td>
  </tr>
  <tr>
    <td>BestPrice</td>
    <td>Empty except for limited edition items, in which case it will return the best price for the item.</td>
  </tr>
  <tr>
    <td>ContentRatingTypeID</td>
    <td>`0` = No content rating type<br />`1` = 13+ rated item</td>
  </tr>
  <tr>
    <td>CreatedDate</td>
    <td>Date the item was created in UTC format.</td>
  </tr>
  <tr>
    <td>MinimumMembershipLevel</td>
    <td>`1` = Any membership<br />`4` = <a href="https://www.roblox.com/premium/membership">Roblox Premium</a> only</td>
  </tr>
  <tr>
    <td>Name</td>
    <td>Item name in UTF-8 format.</td>
  </tr>
  <tr>
    <td>PriceView</td>
    <td>This is mostly used by the website to display prices. The options are:<br />`0` = Free<br />`1` = Collectible<br />`2` = HasPrice<br />`3` = NotForSale</td>
  </tr>
  <tr>
    <td>PrivateSales</td>
    <td>Empty except for limited edition items, in which case it will return the number of private sellers.</td>
  </tr>
  <tr>
    <td>UpdatedDate</td>
    <td>Date the item was last updated in UTC format.</td>
  </tr>
</tbody>
</table>

The following is an example of expected return output for a single item:

```lua
{
	"AssetId": 3374795585,
	"Name": "Rat",
	"Description": "",
	"AbsoluteUrl": "https://www.roblox.com/catalog/3374795585/Rat",
	"Price": "",
	"Updated": "8 months ago",
	"Favorited": "80 times",
	"Sales": "1,613",
	"Remaining": "",
	"Creator": "ROBLOX",
	"CreatorAbsoluteUrl": "https://www.roblox.com/users/1/profile",
	"PrivateSales": "",
	"PriceView": 0,
	"BestPrice": "",
	"ContentRatingTypeID": 0,
	"IsServerSideThumbnailLookupInCatalogEnabled": true,
	"AudioUrl": null,
	"IsLargeItem": false,
	"IsThumbnailFinal": true,
	"IsThumbnailUnapproved": false,
	"ThumbnailUrl": "https://t1.rbxcdn.com/745a4be8c2366db2e55d0a67678434dc",
	"BcOverlayUrl": null,
	"LimitedOverlayUrl": null,
	"DeadlineOverlayUrl": null,
	"LimitedAltText": null,
	"NewOverlayUrl": null,
	"SaleOverlayUrl": null,
	"IosOverlayUrl": null,
	"XboxOverlayUrl": null,
	"GooglePlayOverlayUrl": null,
	"AmazonOverlayUrl": null,
	"IsTransparentBackground": false,
	"IsNewRobuxIconEnabled": true,
	"AssetTypeID": 10,
	"CreatorID": 1,
	"CreatedDate": "/Date(1561635090927)/",
	"UpdatedDate": "/Date(1562003916210)/",
	"IsForSale": false,
	"IsPublicDomain": true,
	"IsLimited": false,
	"IsLimitedUnique": false,
	"MinimumMembershipLevel": 0,
	"OffSaleDeadline": null,
	"ProductId": 586905093
}
```

## Marketplace API

You can query avatar items from the Marketplace using the following URL:
`https://catalog.roblox.com/v2/search/items/details?[params]`

You can replace `[params]` with the appropriate [query parameters](#query-parameters) to customize your search.

### Query Parameters

You can specify search parameters by appending a series of parameters and values to the URL, each separated by a `&`.

Use the following parameters to query the Marketplace:

<table>
<thead>
  <tr>
    <th>Parameter</th>
    <th>Type</th>
    <th>Options and Values</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Category</td>
    <td>byte</td>
    <td>`0` = Featured<br />`1` = All<br />`2` = Collectibles<br />`3` = Clothing<br />`4` = BodyParts<br />`5` = Gear<br />`11` = Accessories<br />`12` = AvatarAnimations<br />`13` = CommunityCreations</td>
  </tr>
  <tr>
    <td>CreatorName</td>
    <td>string</td>
    <td>Search by creator name. If `Enum.CreatorType` is not provided, search is for users only.</td>
  </tr>
  <tr>
    <td>CreatorTargetId</td>
    <td>long</td>
    <td>The user or group ID depending on the CreatorType provided.</td>
  </tr>
  <tr>
    <td>CreatorType</td>
    <td>byte</td>
    <td>`1` = User or `2` = Group.</td>
  </tr>
  <tr>
    <td>Cursor</td>
    <td>string</td>
    <td>Each search response contains a `nextPageCursor` if there is a next page and `previousPageCursor` if there is a previous page. Pass either of these values in the Cursor parameter of your next query to get the next or previous page of results. The cursor is valid if the other query parameters remain the same.</td>
  </tr>
  <tr>
    <td>Genres</td>
    <td>byte</td>
    <td>Specifies the genre for the search. The recommended approach to filtering on genres is to match the URL of a catalog page. <br />`1` = TownAndCity<br />`2` = Medieval<br />`3` = SciFi<br />`4` = Fighting<br />`5` = Horror<br />`6` = Naval<br />`7` = Adventure<br />`8` = Sports<br />`9` = Comedy<br />`10` = Western<br />`11` = Military<br />`13` = Building<br />`14` = FPS<br />`15` = RPG</td>
  </tr>
  <tr>
    <td>Keyword</td>
    <td>string</td>
    <td>Standard keyword search.</td>
  </tr>
  <tr>
    <td>Limit</td>
    <td>int</td>
    <td>Number of results to return. Values are currently limited to 10, 28, and 30.</td>
  </tr>
  <tr>
    <td>MaxPrice</td>
    <td>int</td>
    <td>The maximum price in Robux of items in the query.</td>
  </tr>
  <tr>
    <td>MinPrice</td>
    <td>int</td>
    <td>The minimum price in Robux of items in the query.</td>
  </tr>
  <tr>
    <td>SortAggregation</td>
    <td>byte</td>
    <td>`1` = PastDay<br />`3` = PastWeek<br />`4` = PastMonth<br />`5` = AllTime</td>
  </tr>
  <tr>
    <td>SortType</td>
    <td>byte</td>
    <td>`0` = Relevance (Default)<br />`1` = Favorited<br />`2` = Sales<br />`3` = Updated<br />`4` = PriceAsc <br />`5` = PriceDesc </td>
  </tr>
  <tr>
    <td>Subcategory</td>
    <td>byte</td>
    <td>
    `0` = Featured<br />
    `1` = All<br />
    `2` = Collectibles<br />
    `3` = Clothing<br />
    `4` = BodyParts<br />
    `5` = Gear<br />
    `9` = Hats<br />
    `10` = Faces<br />
    `12` = Shirts<br />
    `13` = TShirts<br />
    `14` = Pants<br />
    `15` = Heads<br />
    `19` = Accessories<br />
    `20` = HairAccessories<br />
    `21` = FaceAccessories<br />
    `22` = NeckAccessories<br />
    `23` = ShoulderAccessories<br />
    `24` = FrontAccessories<br />
    `25` = BackAccessories<br />
    `26` = WaistAccessories<br />
    `27` = AvatarAnimations<br />
    `37` = Bundles<br />
    `38` = AnimationBundles <br />
    `39` = EmoteAnimations<br />
    `40` = CommunityCreations<br />
    `41` = Melee<br />
    `42` = Ranged<br />
    `43` = Explosive<br />
    `44` = PowerUp<br />
    `45` = Navigation<br />
    `46` = Musical<br />
    `47` = Social<br />
    `48` = Building<br />
    `49` = Transport<br />
    `54` = HeadAccessories<br />
    `55` = ClassicTShirts<br />
    `56` = ClassicShirts<br />
    `57` = ClassicPants<br />
    `58` = TShirtAccessories<br />
    `59` = ShirtAccessories<br />
    `60` = PantsAccessories<br />
    `61` = JacketAccessories<br />
    `62` = SweaterAccessories<br />
    `63` = ShortsAccessories<br />
    `64` = ShoesBundles<br />
    `65` = DressSkirtAccessories<br />
    `66` = DynamicHeads<br />
    </td>

  </tr>
</tbody>
</table>

The following URL will search for the first 10 "Gear" items sorted by all-time ("SortAggregation") and relevance ("SortType") created by Roblox ("CreatorTargetID"):

`https://catalog.roblox.com/v2/search/items/details?Subcategory=5&CreatorTargetId=1&SortType=0&SortAggregation=5&Limit=10`

### Response Fields

API responses return in a JSON format. The response provides asset details in the `data` key using the following fields:

<table>
<thead>
  <tr>
    <th>Field</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>assetType</td>
    <td>One of the following asset type values (only returned if the item is an asset).<br />`2` = T-Shirt<br />`8` = Hat<br />`11` = Shirt<br />`12` = Pants<br />`17` = Head<br />`18` = Face<br />`19` = Gear<br />`25` = Arms<br />`26` = Legs<br />`27` = Torso<br />`28` = RightArm<br />`29` = LeftArm<br />`30` = LeftLeg<br />`31` = RightLeg<br />`41` = HairAccessory<br />`42` = FaceAccessory<br />`43` = NeckAccessory<br />`44` = ShoulderAccessory<br />`45` = FrontAccessory<br />`46` = BackAccessory<br />`47` = WaistAccessory<br />`48` = ClimbAnimation<br />`49` = DeathAnimation<br />`50` = FallAnimation<br />`51` = IdleAnimation<br />`52` = JumpAnimation<br />`53` = RunAnimation<br />`54` = SwimAnimation<br />`55` = WalkAnimation<br />`56` = PoseAnimation<br />`61` = EmoteAnimation</td>
  </tr>
  <tr>
    <td>bundleType</td>
    <td>The bundle type ID (only returned if the item is a bundle). Possible values are `BodyParts` and `AvatarAnimations`.</td>
  </tr>
  <tr>
    <td>creatorName</td>
    <td>The creator's name.</td>
  </tr>
  <tr>
    <td>creatorTargetId</td>
    <td>The creator's ID.</td>
  </tr>
  <tr>
    <td>creatorType</td>
    <td>The item's creator type.</td>
  </tr>
  <tr>
    <td>description</td>
    <td>The item description.</td>
  </tr>
  <tr>
    <td>favoriteCount</td>
    <td>The favorite count of an item.</td>
  </tr>
  <tr>
    <td>genres</td>
    <td>List of the item's genres. Possible values include `All`, `Tutorial`, `Scary`, `TownAndCity`, `War`, `Funny`, `Fantasy`, `Adventure`, `SciFi`, `Pirate`, `FPS`, `RPG`, `Sports`, `Ninja`, and `WildWest`.</td>
  </tr>
  <tr>
    <td>id</td>
    <td>The ID of the item.</td>
  </tr>
  <tr>
    <td>itemRestrictions</td>
    <td>List of the item's restrictions. Possible values include `ThirteenPlus`, `LimitedUnique`, `Limited`, and `Rthro`.</td>
  </tr>
  <tr>
    <td>itemStatus</td>
    <td>List of the item's status flags. Possible values include `New`, `Sale`, `XboxExclusive`, `AmazonExclusive`, `GooglePlayExclusive`, `IosExclusive`, and `SaleTimer`.</td>
  </tr>
  <tr>
    <td>itemType</td>
    <td>The item type. Possible values are `Asset` or `Bundle`.</td>
  </tr>
  <tr>
    <td>lowestPrice</td>
    <td>The lowest reseller price of the item (only returned if the item is resellable).</td>
  </tr>
  <tr>
    <td>name</td>
    <td>The item name.</td>
  </tr>
  <tr>
    <td>price</td>
    <td>The listing price of the item (current price may differ if the item is resellable).</td>
  </tr>
  <tr>
    <td>priceStatus</td>
    <td>The price status of an item that is not on sale. Possible values are `Free`, `OffSale`, or `NoResellers`.</td>
  </tr>
  <tr>
    <td>purchaseCount</td>
    <td>The purchase count of an item.</td>
  </tr>
  <tr>
    <td>unitsAvailableForConsumption</td>
    <td>The unit available for consumption of a limited unique item.</td>
  </tr>
</tbody>
</table>

The following is an example of expected return output for a single item:

```lua
{
	"keyword": null,
	"previousPageCursor": null,
	"nextPageCursor": "2_1_c541d05046b5c1c78a5d386b5e302243",
	"data": [
    {
        "id":527373900,
        "itemType":
        "Asset",
        "assetType":42,
        "name":"Restless Souls Bandana",
        "description":"This bandana won't help you blend in with ghosts, but at least you'll be stylish.",
        "productId":41270974,
        "genres":[
          "Scary",
          "Adventure"
          ],
        "itemStatus":[],
        "itemRestrictions":[],
        "creatorType":"User",
        "creatorTargetId":1,
        "creatorName":"Roblox",
        "price":300,
        "favoriteCount":15943,
        "offSaleDeadline":null
        }
	]
}
```
