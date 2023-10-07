---
title: Patterns
description: Explains considerations and guidelines for making proper requests to Open Cloud endpoints and interpreting responses.
---

Some Open Cloud endpoints utilize special patterns when making requests and
receiving responses.

## Pagination

If you specify `maxPageSize` in your request, some methods return paginated
results—essentially partial responses:

```json
GET /cloud/v2/users/{userId}/inventory-items?maxPageSize=25

{
  "inventoryItems": [
    ...
  ],
  "nextPageToken": "aaaBBB"
}
```

If a response includes a value for `nextPageToken`, use that value in the
`pageToken` parameter of the subsequent request to retrieve the next page. When
`nextPageToken` is empty, you've reached the end of your results:

```json
GET /cloud/v2/users/{userId}/inventory-items?maxPageSize=25&pageToken=aaaBBB

{
  "inventoryItems": [
    ...
  ],
  "nextPageToken": ""
}
```

Aside from the `pageToken`, you must use the same query for pagination to work
properly. Altering any filter parameter results in a 400 error.

## Filtering

Some methods let you filter the response by including a `filter` parameter in
the request. The following sections describe filter syntax and guidelines for
the specified endpoints.

### List Group Memberships

The wildcard character `-` can be used in place of group ID in order to list
memberships across all groups: `groups/-/memberships`.

Filtering conforms to Common Expression Language (CEL). Only two operators
are supported:

- `==`
- `in [...]`

If you specify a group ID in the resource path, you can filter memberships by
either user or role in the following formats:

- **User filter**: `filter="user == 'users/9876543210'"`
- **Role filter**: `filter="role == 'groups/123/roles/7920705'"`

If you specify the wildcard character for the group ID, you must filter
memberships by user (up to 50) in the following format:

- **User filter**: `filter="user in ['users/1', 'users/156', 'users/9876543210', ...]"`

### List Inventory Items

You can filter by collectible status, inventory item type, and inventory
item ID. If you don't provide a filter, the user's entire inventory is returned.

The filter format is a semicolon-separated list:

`filter={field}={value};{field}={value},{value},...;{field}=...`

- `{field}` can be any of the predefined type fields or ID fields in the
  following tables.
- `{value}` can be a string, boolean, or enum. Depending on the field type,
  this can be a single value (boolean fields) or multiple values (list fields).

<Alert severity="info">
You can't combine type and ID fields in the same filter.
</Alert>

#### Type Fields

| Filter                    | Type                                                    | Description                                                                                                                                                                                        |
| :------------------------ | :------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `badges`                  | boolean                                                 | Include badges in the response. Default is false.                                                                                                                                                  |
| `gamePasses`              | boolean                                                 | Include game passes in the response. Default is false.                                                                                                                                             |
| `inventoryItemAssetTypes` | See [assetDetails][1] for the full list of asset types. | Comma-separated list of asset types to include. Default is none. Specify `*` for all asset types. Must have Inventory read scope to filter by purchased places.                                    |
| `onlyCollectibles`        | boolean                                                 | Include **only** collectibles in the response. Default is false. This field must be used with the `inventoryItemAssetTypes` field in order to return items and only returns non-UGC limited items. |
| `privateServers`          | boolean                                                 | Include private servers in the response. Default is false. Must have Inventory read scope to filter by this field.                                                                                 |

#### ID Fields

| Filter             | Type   | Description                                                                                                            |
| :----------------- | :----- | :--------------------------------------------------------------------------------------------------------------------- |
| `assetIds`         | string | Comma-separated list of numeric asset IDs to include.                                                                  |
| `badgeIds`         | string | Comma-separated list of numeric badge IDs to include.                                                                  |
| `gamePassIds`      | string | Comma-separated list of numeric game pass IDs to include.                                                              |
| `privateServerIds` | string | Comma-separated list of numeric private server IDs to include. Must have Inventory read scope to filter by this field. |

#### Examples

- Returns all collectible items that the user owns:

  `filter=onlyCollectibles=true;inventoryItemAssetTypes=*`

- Returns all items of the specified types:

  `filter=inventoryItemAssetTypes=HAT,CLASSIC_PANTS,TSHIRT_ACCESSORY`

- Returns all items of the listed types or any game passes. Excludes badges from
  the results (the same behavior as if `badges` wasn't included in the filter):

  `filter=inventoryItemAssetTypes=HAT,CLASSIC_PANTS,TSHIRT_ACCESSORY;gamePasses=true;badges=false`

- Returns assets that match the specified IDs:

  `filter=assetIds=1,2,3,4`

- Returns assets, badges, game passes, and private servers that match the
  specified IDs:

  `filter=assetIds=1,2,3,4;badgeIds=1,2,3,4;gamePassIds=1,2,3,4;privateServerIds=1,2,3,4`

## Long Running Operations

Some methods return an `Operation` object that represents a long-running request
that returns an asynchronous response later. The object contains the following
fields:

- **path** - The endpoint path to call to poll for the request's completion.
  Append the path to the original base URL of the resource method.
- **status** - The status of the request. Valid values are `pending` and `done`.
- **Response** - The response object. This field is empty until the status is `done.`
- **metadata** - Custom metadata specific to the request being made.

```json title="Example Operation Object"
{
  "path": "v1/assets/12345/operation/xyz",
  "status": "done",
  "response": {
    "value1": "myValue",
    "value2": 1234
  },
  "metadata": {
    "metadata1": "string",
    "metadata2": 5678
  }
}
```

[1]: /cloud/reference/InventoryItem
