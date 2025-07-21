---
title: Patterns
description: Explains considerations and guidelines for making proper requests to Open Cloud endpoints and interpreting responses.
---

This page covers common patterns with the Open Cloud APIs, particularly around making requests and handling responses.

## Paths

To make a request to the Open Cloud APIs, you must first form a URL. This URL is a combination of the base URL (e.g. `https://apis.roblox.com`), the Open Cloud API path (for example, `/cloud/v2/universes/{universe_id}/places/{place_id}/user-restrictions`), and any query parameters (for example, `?maxPageSize=25`). A full request URL might look like this:

```json
https://apis.roblox.com/cloud/v2/users/4687549151/inventory-items?maxPageSize=100
```

Many paths, including the example above, have **path parameters**, designated by curly brackets in the API reference. Path parameters are just variables that you insert before making the request and are almost always IDs: user IDs, group IDs, place IDs, etc. IDs are often numeric, but not necessarily; for example, data store and memory store IDs support a wider character set.

## Content length and type

Many API calls, particularly those that create or update, require a JSON request body. If your request has a body, be sure to include the `Content-Length` and `Content-Type` headers. Most HTTP clients add these headers automatically.

## Pagination

If you specify `maxPageSize` in your request, some methods return paginated
results—essentially partial responses:

```json
GET /cloud/v2/users/{user_id}/inventory-items?maxPageSize=25

{
  "inventoryItems": [
    ...
  ],
  "nextPageToken": "aaaBBB"
}
```

```json
GET /cloud/v2/universes/{universe_id}/data-stores?maxPageSize=25

{
  "dataStores": [
    ...
  ],
  "nextPageToken": "datastore1"
}
```

If a response includes a value for `nextPageToken`, use that value in the
`pageToken` parameter of the subsequent request to retrieve the next page. When
`nextPageToken` is empty or omitted entirely, you've reached the end of your results:

```json
GET /cloud/v2/users/{user_id}/inventory-items?maxPageSize=25&pageToken=aaaBBB

{
  "inventoryItems": [
    ...
  ],
  "nextPageToken": ""
}
```

```json
GET /cloud/v2/universes/{universe_id}/data-stores?maxPageSize=25&pageToken=datastore1

{
  "dataStores": [
    ...
  ]
}
```

Aside from the `pageToken`, you must use the same query for pagination to work
properly. Altering any filter parameter results in a 400 error.

## Open Cloud v2

### Multiple paths

Some resources have multiple path patterns, visible under the **Resource Paths** header in the API reference. For example, the URL for [List User Restrictions](/cloud/reference/UserRestriction#Cloud_ListUserRestrictions__Using_Universes) can be either of the following:

- `https://apis.roblox.com/cloud/cloud/v2/universes/{universe_id}/user-restrictions`
- `https://apis.roblox.com/cloud/cloud/v2/universes/{universe_id}/places/{place_id}/user-restrictions`

You can probably infer the difference between the two: some user restrictions apply to an entire universe (experience), whereas others apply to specific places within a universe. Aside from the small addition to the path and extra path parameter, the calls are identical.

Many endpoints return a path as part of their response, which you can use to make further requests. If an API needs more than a few seconds to fulfill a request, it often returns an [operation](#long-running-operations) rather than the resource or response itself.

### Long running operations

Some methods return an `Operation` object that represents a long-running request
that returns an asynchronous response later. The object contains the following
fields:

- **path** - The endpoint path to call to poll for the request's completion.
  Append the path to the original base URL of the resource method.
- **done** - A boolean value that represents whether or not the operation has completed.
- **response** - The response object. This field is empty until the `done` field has a value of `true`.
- **metadata** - Custom metadata specific to the request being made.

```json title="Example Operation Object"
{
  "path": "v1/assets/12345/operation/xyz",
  "done": true,
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

Use the `Operation` object's path to poll for when the resource is ready. A good strategy is to use exponential backoff. For example, you might poll immediately, then after one second, two seconds, four seconds, etc.

```python
def PollForResults(operationPath):
    currentRetries = 0
    maxRetries = 10
    retryPollingDelay = 1
    retryPollingMultiplier = 2
    while (currentRetries < maxRetries):
        # No delay on the first check
        if (currentRetries == 0):
            results = GetOperation(operationPath)
        # Retry logic for subsequent checks
        else:
            time.sleep(retryPollingDelay)
            results = GetOperation(operationPath)
            # Exponential backoff
            retryPollingDelay *= retryPollingMultiplier
        # Check for results and return if they exist
        if (results.status_code != 200 or results.json()[doneJSONKey]):
            return results
        # Otherwise, increment the retry count
        else:
           currentRetries += 1
```

For a more complete code sample that uses a fixed retry interval rather than exponential backoff, see [Poll for results](../guides/instance.md#poll-for-results).

### Filtering

Some methods let you filter the response by including a `filter` parameter in
the request. The following sections describe filter syntax and guidelines for
the specified endpoints.

#### List group memberships

The wildcard character `-` can be used in place of group ID in order to list
memberships across all groups: `groups/-/memberships`.

Filtering conforms to Common Expression Language (CEL). Only two operators
are supported:

- `==`
- `in [...]`

If you specify a group ID in the resource path, you can filter memberships by
either user or role in the following formats:

- **User filter**: `filter=user == 'users/9876543210'`
- **Role filter**: `filter=role == 'groups/123/roles/7920705'`

If you specify the wildcard character for the group ID, you must filter
memberships by user (up to 50) in the following format:

- **User filter**: `filter=user in ['users/1', 'users/156', 'users/9876543210', ...]`

#### List inventory items

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

**Type fields**

| Filter                    | Type                                                    | Description                                                                                                                                                                                        |
| :------------------------ | :------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `badges`                  | boolean                                                 | Include badges in the response. Default is false.                                                                                                                                                  |
| `gamePasses`              | boolean                                                 | Include game passes in the response. Default is false.                                                                                                                                             |
| `inventoryItemAssetTypes` | See [assetDetails][1] for the full list of asset types. | Comma-separated list of asset types to include. Default is none. Specify `*` for all asset types. Must have Inventory read scope to filter by purchased places.                                    |
| `onlyCollectibles`        | boolean                                                 | Include **only** collectibles in the response. Default is false. This field must be used with the `inventoryItemAssetTypes` field in order to return items and only returns non-UGC limited items. |
| `privateServers`          | boolean                                                 | Include private servers in the response. Default is false. Must have Inventory read scope to filter by this field.                                                                                 |

**ID Fields**

| Filter             | Type   | Description                                                                                                            |
| :----------------- | :----- | :--------------------------------------------------------------------------------------------------------------------- |
| `assetIds`         | string | Comma-separated list of numeric asset IDs to include.                                                                  |
| `badgeIds`         | string | Comma-separated list of numeric badge IDs to include.                                                                  |
| `gamePassIds`      | string | Comma-separated list of numeric game pass IDs to include.                                                              |
| `privateServerIds` | string | Comma-separated list of numeric private server IDs to include. Must have Inventory read scope to filter by this field. |

**Examples**

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

[1]: /cloud/reference/InventoryItem
