---
title: Creator Store Queries
description: Creator Store Queries let you externally query the Creator Store and Marketplace Catalog.
---

You can search Roblox's assets outside Studio by accessing the Creator Store API. Use the [Creator Store API](#creator-store-api) to query Studio assets, such as meshes, models, and audio, and the [Marketplace API](#marketplace-api) to query avatar assets on the Marketplace.

Each API requires a URL and custom search parameters for that specific catalog. If both URL and parameters are valid, the API returns a JSON format with the results of your search.

## Creator Store API

<Alert severity="info">
The `toolbox-service` API described below is not currently covered on the official [Cloud API](../../cloud/reference/index.md) documentation. Better support for Creator Store search with a cleaner API is underway.
</Alert>

You can query items from the Creator Store catalog using the following URL:
`https://apis.roblox.com/toolbox-service/v1/marketplace/{categoryId}[params]`

You can replace `[categoryId]` and `[params]` with the appropriate [query parameters](#query-parameters) to customize your search.

Valid category IDs are:

- Audio = `3`
- Model = `10`
- Decal = `13`
- Animation = `24`
- Plugin = `38`
- MeshPart = `40`
- Video = `62`
- FontFamily = `73`
- Music = `300`

### Query Parameters

You can specify search parameters by appending a series of parameters and values to the URL, each separated by a `&`.

Use the following parameters to query the Creator Store:

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
      <td>categoryId (path)</td>
      <td>int</td>
      <td>`3` = Audio<br />`10` = Model<br />`13` = Decal<br />`24` = Animation<br />`38` = Plugin<br />`40` = MeshPart<br />`62` = Video<br />`73` = FontFamily<br />`300` = Music<br />`301` = SoundEffect<br />`302` = UnknownAudio<br />`1001` = Package<br />`1002` = SharedPackage</td>
    </tr>
    <tr>
      <td>sortOrder</td>
      <td>int</td>
      <td>`1` = Asc<br />`2` = Desc</td>
    </tr>
    <tr>
      <td>limit</td>
      <td>int</td>
      <td>Number of results to return, maximum 100.</td>
    </tr>
    <tr>
      <td>cursor</td>
      <td>string</td>
      <td>Pagination cursor</td>
    </tr>
    <tr>
      <td>pageNumber</td>
      <td>int</td>
      <td>Page number to request for</td>
    </tr>
    <tr>
      <td>keyword</td>
      <td>string</td>
      <td>Search keyword</td>
    </tr>
    <tr>
      <td>assetSubTypes</td>
      <td>array[string]</td>
      <td>Ad, MaterialPack, Package</td>
    </tr>
    <tr>
      <td>excludeAssetSubTypes</td>
      <td>array[string]</td>
      <td>Ad, MaterialPack, Package</td>
    </tr>
    <tr>
      <td>creatorType</td>
      <td>int</td>
      <td>`1` = User<br />`2` = Group</td>
    </tr>
    <tr>
      <td>creatorTargetId</td>
      <td>int64</td>
      <td>User or Group Id to search for</td>
    </tr>
    <tr>
      <td>minDuration</td>
      <td>int64</td>
      <td>Minimum value of the duration range for audio assets in seconds</td>
    </tr>
    <tr>
      <td>maxDuration</td>
      <td>int64</td>
      <td>Maximum value of the duration range for audio assets in seconds</td>
    </tr>
    <tr>
      <td>sortDirection</td>
      <td>int</td>
      <td>`0` = None<br />`1` = Ascending<br />`2` = Descending</td>
    </tr>
    <tr>
      <td>artist</td>
      <td>string</td>
      <td>The name of the artist</td>
    </tr>
    <tr>
      <td>album</td>
      <td>string</td>
      <td>The album you are looking for</td>
    </tr>
    <tr>
      <td>audioTypes</td>
      <td>array[int]</td>
      <td>`0` = Music<br />`1` = SoundEffect</td>
    </tr>
    <tr>
      <td>uiSortIntent</td>
      <td>int</td>
      <td>What sort order to rank the results by<br /><br />`1` = Relevance<br />`6` = Trending<br />`7` = AllTime<br />`8` = Top<br />`9` = Duration<br />`10` = DateCreated<br />`11` = DateModified<br />`12` = Creator<br />`13` = Name</td>
    </tr>
    <tr>
      <td>includeOnlyVerifiedCreators</td>
      <td>bool</td>
      <td>A flag to include only results from verified creators. Verified creators are those that are ID or phone verified.</td>
    </tr>
    <tr>
      <td>minPriceInCents</td>
      <td>int64</td>
      <td>Minimum cost in cents (only applicable to plugins)</td>
    </tr>
    <tr>
      <td>maxPriceInCents</td>
      <td>int64</td>
      <td>Maximum cost in cents (only applicable to plugins)</td>
    </tr>
  </tbody>
</table>

For more detailed documentation regarding the toolbox-service, please refer to the updated documentation at creator store API.

This is a sample response from the endpoint:

```json
{
  "totalResults": int,
  "filteredKeyword": string,
  "spellCheckerResult": {
    "correctionState": int,
    "correctedQuery": string,
    "userQuery": string
  },
  "queryFacets": {
    "appliedFacets": Array[string],
    "availableFacets": Array[string]
  },
  "imageSearchStatus": int,
  "previousPageCursor": string,
  "nextPageCursor": string,
  "data": [
    {
      "id": int,
      "name": string,
      "searchResultSource": string
    }
  ]
}
```

To get back the asset metadata, you can go over the data array and extract the IDs with the `GetItemDetails` endpoint on `toolbox-service` like this:

```bash
GET https://apis.roblox.com/toolbox-service/v1/items/details?assetIds={assetId1}%2C{assetId2}
```

### Response Fields

This is the response you should expect to get back from that endpoint:

```json
{
  "data": [
    {
      "asset": {
        "audioDetails": {
           "audioType": Array[int],
           "artist": string,
           "title": string,
           "musicAlbum": string,
           "musicGenre": string,
           "soundEffectCategory": string,
           "soundEffectSubcategory": string,
           "tags": Array[string] 
        },
        "id": int64,
        "name": string,
        "typeId": int,
        "assetSubTypes": Array[string],
        "assetGenres": Array[string],
        "ageGuidelines":{
          "ageGuideline: int,
          "blood": {
             "realism": int,
             "level": int
           },
          "violence": {
            "intensity": int
           },
          "profanity": {
            "presence": int
           },
          "alcohol": {
            "presence": int
           },
          "romance": {
            "type": int
           }
        },
        "isEndorsed": bool,
        "description": string,
        "duration": int,
        "hasScripts": bool?,
        "createdUtc": string($date-time),
        "updatedUtc": string($date-time),
        "creatingUniverseId": int64?,
        "isAssetHashApproved": bool,
        "visibilityStatus": int?,
        "socialLinks": [{
           "linkType": int,
           "url": string,
           "title": string
        }]
      },
      "creator": {
        "id": int64,
        "name": string,
        "type": int,
        "isVerifiedCreator": bool,
        "latestGroupUpdaterUserId": int64?,
        "latestGroupUpdaterUserName": string
      },
      "voting": {
        "showVotes": bool,
        "upVotes": int64,
        "downVotes": int64,
        "canVote": bool,
        "userVote": bool?,
        "hasVoted": bool,
        "voteCount": int64,
        "upVotePercent": int
      },
      "product": {
        "productId": int64,
        "price": int64?,
        "isForSaleOrIsPublicDomain": bool
      },
      "fiatProduct": {
        "purchasePrice": {
          "currencyCode": string,
          "quantity": {
            "significand": int64,
            "exponent": int
          }
        },
        "published": bool,
        "purchasable": bool
      }
    }
  ]
}
```

## Marketplace API

You can query avatar items from the Marketplace using the following URL:
`https://catalog.roblox.com/v1/search/items/details?[params]`

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
    <td>CreatorType</td>
    <td>byte</td>
    <td>`1` = User<br />`2` = Group</td>
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
    <td>Cursor</td>
    <td>string</td>
    <td>Each search response contains a `nextPageCursor` if there is a next page and `previousPageCursor` if there is a previous page. Pass either of these values in the Cursor parameter of your next query to get the next or previous page of results. The cursor is valid if the other query parameters remain the same.</td>
  </tr>
  <tr>
    <td>Genres</td>
    <td>byte</td>
    <td>Specifies the genre for the search. The recommended approach to filtering on genres is to match the URL of a catalog page.<br /><br />`1` = TownAndCity<br />`2` = Medieval<br />`3` = SciFi<br />`4` = Fighting<br />`5` = Horror<br />`6` = Naval<br />`7` = Adventure<br />`8` = Sports<br />`9` = Comedy<br />`10` = Western<br />`11` = Military<br />`13` = Building<br />`14` = FPS<br />`15` = RPG</td>
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
    <td>`0` = Featured<br />`1` = All<br />`2` = Collectibles<br />`3` = Clothing<br />`4` = BodyParts<br />`5` = Gear<br />`9` = Hats<br />`10` = Faces<br />`12` = Shirts<br />`13` = TShirts<br />`14` = Pants<br />`15` = Heads<br />`19` = Accessories<br />`20` = HairAccessories<br />`21` = FaceAccessories<br />`22` = NeckAccessories<br />`23` = ShoulderAccessories<br />`24` = FrontAccessories<br />`25` = BackAccessories<br />`26` = WaistAccessories<br />`27` = AvatarAnimations<br />`37` = Bundles<br />`38` = AnimationBundles <br />`39` = EmoteAnimations<br />`40` = CommunityCreations<br />`41` = Melee<br />`42` = Ranged<br />`43` = Explosive<br />`44` = PowerUp<br />`45` = Navigation<br />`46` = Musical<br />`47` = Social<br />`48` = Building<br />`49` = Transport<br />`54` = HeadAccessories<br />`55` = ClassicTShirts<br />`56` = ClassicShirts<br />`57` = ClassicPants<br />`58` = TShirtAccessories<br />`59` = ShirtAccessories<br />`60` = PantsAccessories<br />`61` = JacketAccessories<br />`62` = SweaterAccessories<br />`63` = ShortsAccessories<br />`64` = ShoesBundles<br />`65` = DressSkirtAccessories<br />`66` = DynamicHeads</td>
  </tr>
</tbody>
</table>

The following URL will search for the first 10 "Gear" items in "Accessories" sorted by all-time ("SortAggregation") and relevance ("SortType") created by Roblox ("CreatorTargetId"):

`https://catalog.roblox.com/v1/search/items/details?Category=11&Subcategory=5&CreatorTargetId=1&SortType=0&SortAggregation=5&Limit=10`

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
    <td>One of the following asset type values (only returned if the item is an asset).<br /><br />`2` = T-Shirt<br />`8` = Hat<br />`11` = Shirt<br />`12` = Pants<br />`17` = Head<br />`18` = Face<br />`19` = Gear<br />`25` = Arms<br />`26` = Legs<br />`27` = Torso<br />`28` = RightArm<br />`29` = LeftArm<br />`30` = LeftLeg<br />`31` = RightLeg<br />`41` = HairAccessory<br />`42` = FaceAccessory<br />`43` = NeckAccessory<br />`44` = ShoulderAccessory<br />`45` = FrontAccessory<br />`46` = BackAccessory<br />`47` = WaistAccessory<br />`48` = ClimbAnimation<br />`49` = DeathAnimation<br />`50` = FallAnimation<br />`51` = IdleAnimation<br />`52` = JumpAnimation<br />`53` = RunAnimation<br />`54` = SwimAnimation<br />`55` = WalkAnimation<br />`56` = PoseAnimation<br />`61` = EmoteAnimation</td>
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

```json
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
