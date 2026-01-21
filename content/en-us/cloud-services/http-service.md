---
title: In-experience HTTP requests
description: Use HttpService to send HTTP requests to third-party web services and Open Cloud.
---

You can use `Class.HttpService` to send generic HTTP requests to third-party web services for use cases like analytics, data storage, or error logging. `Class.HttpService` also supports certain Open Cloud endpoints.

## Enable HTTP requests

The `Class.HttpService:GetAsync()`, `Class.HttpService:PostAsync()`, and `Class.HttpService:RequestAsync()` methods aren't enabled by default. To send requests, you must **Allow HTTP Requests** under [Experience Settings](../studio/experience-settings.md) for your experience.

## Use in plugins

You can use `Class.HttpService` in Studio plugins to check for updates, download content, or other business logic. The first time a plugin attempts to use the service, the user might be prompted to give the plugin permission to communicate with the particular web address. Users can accept, deny, and revoke these permissions at any time through the **Plugin Management** window.

Plugins can also communicate with other software running on the same computer through the `localhost` and `127.0.0.1` hosts. By running programs compatible with such plugins, you can extend the functionality of your plugin beyond the normal capabilities of Studio, such as interacting with your computer's file system. Beware that such software must be distributed separately from the plugin itself and can pose security risks.

## Use with Open Cloud

`Class.HttpService` can currently call a subset of the Open Cloud endpoints. You can call these endpoints the same way that you'd call any other endpoint via `HttpService`. The only difference is that you must include an Open Cloud API key in the request:

1. [Create an Open Cloud API key](/cloud/auth/api-keys#create-api-keys).
2. [Save the API key to your secrets store](/cloud-services/secrets#add-secrets).
3. Make the request.

The following code sample demonstrates how to update a user's group membership from within an experience:

```lua
local HttpService = game:GetService("HttpService")

local groupId = "your_group_id"
local membershipId = "your_membership_id"
local roleId = "your_role_id"

local function request()
	local response = HttpService:RequestAsync({
		Url = `https://apis.roblox.com/cloud/v2/groups/{groupId}/memberships/{membershipId}`,
		Method = "PATCH",
		Headers = {
			["Content-Type"] = "application/json", -- When sending JSON, set this!
			["x-api-key"] = HttpService:GetSecret("APIKey"), -- Set in Creator Hub
		},
		Body = HttpService:JSONEncode({ role = `groups/{groupId}/roles/{roleId}` }),
	})

	if response.Success then
		print("The response was successful:", response.StatusCode, response.StatusMessage)
	else
		print("The response returned an error:", response.StatusCode, response.StatusMessage)
	end
	print("Response body:\n", response.Body)
	print("Response headers:\n", HttpService:JSONEncode(response.Headers))
end

-- Wrap the function in pcall() for safety
local success, errorMessage = pcall(request)
if not success then
	print("The HTTP request failed to send:", errorMessage)
end
```

### Supported Open Cloud endpoints

The following endpoints are supported. Due to current limitations on `Class.HttpService`, the `..` string is not allowed in URL path parameters to Roblox domains. This means, for example, that data stores and entries containing this string are currently inaccessible from `Class.HttpService`.

#### Assets

- [GetAsset](/cloud/features/assets#/default/Assets_GetAsset)
- [ListAssetVersions](/cloud/features/assets#/default/listAssetVersions)
- [GetAssetVersion](/cloud/features/assets#/default/Assets_GetAssetVersion)

#### Bans and blocks

- [ListUserRestrictions (Place)](/cloud/features/bans-and-blocks#/UserRestriction/Cloud_ListUserRestrictions__Using_Universes)
- [GetUserRestriction (Place)](/cloud/features/bans-and-blocks#/UserRestriction/Cloud_GetUserRestriction__Using_Universes_Places)
- [UpdateUserRestriction (Place)](/cloud/features/bans-and-blocks#/UserRestriction/Cloud_UpdateUserRestriction__Using_Universes_Places)
- [ListUserRestrictions (Universe)](/cloud/features/bans-and-blocks#/UserRestriction/Cloud_ListUserRestrictions)
- [GetUserRestriction (Universe)](/docs/cloud/features/bans-and-blocks#/UserRestriction/Cloud_GetUserRestriction__Using_Universes)
- [UpdateUserRestriction (Universe)](/cloud/features/bans-and-blocks#/UserRestriction/Cloud_UpdateUserRestriction__Using_Universes)
- [ListUserRestrictionLogs (Universe)](https://create.roblox.com/docs/cloud/features/bans-and-blocks#/UserRestriction/Cloud_ListUserRestrictionLogs)

#### Creator Store

- [CreateCreatorStoreProduct](/cloud/features/creator-store#/CreatorStoreProduct/Cloud_CreateCreatorStoreProduct)
- [GetCreatorStoreProduct](/cloud/features/creator-store#/CreatorStoreProduct/Cloud_GetCreatorStoreProduct)
- [UpdateCreatorStoreProduct](/cloud/features/creator-store#/CreatorStoreProduct/Cloud_UpdateCreatorStoreProduct)
- [CreatorStoreAssetsSearch](/cloud/features/creator-store#toolbox-service)

#### Data and memory stores

Data stores:

- [ListDataStores](/cloud/reference/DataStore#Cloud_ListDataStores)
- [SnapshotDataStores](/cloud/features/storage#/DataStore/Cloud_SnapshotDataStores)
- [ListDataStoreEntries](/cloud/reference/DataStoreEntry#Cloud_ListDataStoreEntries__Using_Universes)
- [CreateDataStoreEntry](/cloud/reference/DataStoreEntry#Cloud_CreateDataStoreEntry__Using_Universes)
- [GetDataStoreEntry](/cloud/reference/DataStoreEntry#Cloud_GetDataStoreEntry__Using_Universes_DataStores)
- [DeleteDataStoreEntry](/cloud/reference/DataStoreEntry#Cloud_DeleteDataStoreEntry__Using_Universes_DataStores)
- [UpdateDataStoreEntry](/cloud/reference/DataStoreEntry#Cloud_UpdateDataStoreEntry__Using_Universes_DataStores)
- [IncrementDataStoreEntry](/cloud/reference/DataStoreEntry#Cloud_IncrementDataStoreEntry__Using_Universes_DataStores)
- [ListDataStoreEntryRevisions](/cloud/features/storage#/DataStoreEntry/Cloud_ListDataStoreEntryRevisions__Using_Universes_DataStores)
- [ListDataStoreEntries (With Scope)](/cloud/features/storage#/DataStoreEntry/Cloud_ListDataStoreEntries__Using_Universes_DataStores)
- [CreateDataStoreEntry (With Scope)](/cloud/features/storage#/DataStoreEntry/Cloud_CreateDataStoreEntry__Using_Universes_DataStores)
- [GetDataStoreEntry (With Scope)](/cloud/features/storage#/DataStoreEntry/Cloud_GetDataStoreEntry__Using_Universes_DataStores_Scopes)
- [DeleteDataStoreEntry (With Scope)](/cloud/features/storage#/DataStoreEntry/Cloud_DeleteDataStoreEntry__Using_Universes_DataStores_Scopes)
- [UpdateDataStoreEntry (With Scope)](/cloud/features/storage#/DataStoreEntry/Cloud_UpdateDataStoreEntry__Using_Universes_DataStores_Scopes)
- [IncrementDataStoreEntry (With Scope)](/cloud/features/storage#/DataStoreEntry/Cloud_IncrementDataStoreEntry__Using_Universes_DataStores_Scopes)
- [ListDataStoreEntryRevisions (With Scope)](/cloud/features/storage#/DataStoreEntry/Cloud_ListDataStoreEntryRevisions__Using_Universes_DataStores_Scopes)

Memory stores:

- [CreateMemoryStoreQueueItem](/cloud/features/storage#/MemoryStoreQueueItem/Cloud_CreateMemoryStoreQueueItem)
- [DiscardMemoryStoreQueueItems](/cloud/features/storage#/MemoryStoreQueueItem/Cloud_DiscardMemoryStoreQueueItems)
- [ReadMemoryStoreQueueItems](/cloud/features/storage#/MemoryStoreQueueItem/Cloud_ReadMemoryStoreQueueItems)
- [ListMemoryStoreSortedMapItems](/cloud/features/storage#/MemoryStoreSortedMapItem/Cloud_ListMemoryStoreSortedMapItems)
- [CreateMemoryStoreSortedMapItem](/cloud/features/storage#/MemoryStoreSortedMapItem/Cloud_CreateMemoryStoreSortedMapItem)
- [GetMemoryStoreSortedMapItem](/cloud/features/storage#/MemoryStoreSortedMapItem/Cloud_GetMemoryStoreSortedMapItem)
- [DeleteMemoryStoreSortedMapItem](/cloud/features/storage#/MemoryStoreSortedMapItem/Cloud_DeleteMemoryStoreSortedMapItem)
- [UpdateMemoryStoreSortedMapItem](/cloud/features/storage#/MemoryStoreSortedMapItem/Cloud_UpdateMemoryStoreSortedMapItem)
- [FlushMemoryStore](/cloud/features/storage#/MemoryStore/Cloud_FlushMemoryStore)

Ordered data stores:

- [ListOrderedDataStoreEntries](/cloud/features/storage#/OrderedDataStoreEntry/Cloud_ListOrderedDataStoreEntries)
- [CreateOrderedDataStoreEntry](/cloud/features/storage#/OrderedDataStoreEntry/Cloud_CreateOrderedDataStoreEntry)
- [GetOrderedDataStoreEntry](/cloud/features/storage#/OrderedDataStoreEntry/Cloud_GetOrderedDataStoreEntry)
- [DeleteOrderedDataStoreEntry](/cloud/features/storage#/OrderedDataStoreEntry/Cloud_DeleteOrderedDataStoreEntry)
- [UpdateOrderedDataStoreEntry](/cloud/features/storage#/OrderedDataStoreEntry/Cloud_UpdateOrderedDataStoreEntry)
- [IncrementOrderedDataStoreEntry](/cloud/features/storage#/OrderedDataStoreEntry/Cloud_IncrementOrderedDataStoreEntry)

#### Groups

- [GetGroup](/cloud/reference/Group#Cloud_GetGroup)
- [ListGroupJoinRequests](/cloud/reference/GroupJoinRequest#Cloud_ListGroupJoinRequests)
- [AcceptGroupJoinRequest](/cloud/reference/GroupJoinRequest#Cloud_AcceptGroupJoinRequest)
- [DeclineGroupJoinRequest](/cloud/reference/GroupJoinRequest#Cloud_DeclineGroupJoinRequest)
- [ListGroupMemberships](/cloud/reference/GroupMembership#Cloud_ListGroupMemberships)
- [UpdateGroupMembership](/cloud/reference/GroupMembership#Cloud_UpdateGroupMembership)
- [ListGroupRoles](/cloud/reference/GroupRole#Cloud_ListGroupRoles)
- [GetGroupRole](/cloud/reference/GroupRole#Cloud_GetGroupRole)
- [GetGroupShout](/cloud/reference/GroupShout#Cloud_GetGroupShout)

#### Inventories

- [ListInventoryItems](/cloud/reference/InventoryItem#Cloud_ListInventoryItems)

#### Luau execution

- [CreateLuauExecutionSessionTaskBinaryInput](/cloud/features/luau-execution#/LuauExecutionSessionTaskBinaryInput/Cloud_CreateLuauExecutionSessionTaskBinaryInput)
- [CreateLuauExecutionSessionTask](/cloud/features/luau-execution#/LuauExecutionSessionTask/Cloud_CreateLuauExecutionSessionTask__Using_Universes)
- [CreateLuauExecutionSessionTask (with version)](/cloud/features/luau-execution#/LuauExecutionSessionTask/Cloud_CreateLuauExecutionSessionTask__Using_Universes_Places)
- [GetLuauExecutionSessionTask](/cloud/features/luau-execution#/LuauExecutionSessionTask/Cloud_GetLuauExecutionSessionTask)
- [ListLuauExecutionSessionTaskLogs](/cloud/features/luau-execution#/LuauExecutionSessionTaskLog/Cloud_ListLuauExecutionSessionTaskLogs)

#### Notifications

- [CreateUserNotification](/cloud/features/notifications#/UserNotification/Cloud_CreateUserNotification)

#### Places

- [GetPlace](/cloud/features/places#/Place/Cloud_GetPlace)
- [UpdatePlace](/cloud/features/places#/Place/Cloud_UpdatePlace)
- [GetInstance](/cloud/features/places#/Instance/Cloud_GetInstance)
- [UpdateInstance](/cloud/features/places#/Instance/Cloud_UpdateInstance)

#### Universes

- [UpdateUniverse](/cloud/features/universes#/Universe/Cloud_UpdateUniverse)
- [GetUniverse](/cloud/features/universes#/Universe/Cloud_GetUniverse)
- [PublishUniverseMessage](/cloud/features/universes#/Universe/Cloud_PublishUniverseMessage)
- [RestartUniverseServers](/cloud/features/universes#/Universe/Cloud_RestartUniverseServers)

#### Users

- [GetUser](/cloud/features/users#/User/Cloud_GetUser)
- [GenerateUserThumbnail](/cloud/features/users#/User/Cloud_GenerateUserThumbnail)

## Limitations

- Only the `x-api-key` and `content-type` headers are allowed.
- The `x-api-key` header must be a `Datatype.Secret`. See [Secrets stores](./secrets.md).
- The `".."` string is not allowed in URL path parameters.
- Only the HTTPS protocol is supported.
- You cannot use port `1194` or any port below `1024`, except `80` and `443`. If you try to use a blocked port, you receive either a `403 Forbidden` or `ERR_ACCESS_DENIED` error.

## Rate limits

For each Roblox experience server, there is a limit of 2500 Open Cloud requests per minute. Exceeding this can cause request-sending methods to stall for around 30 seconds. Your `Global.LuaGlobals.pcall()` may also fail with a message of `Number of Open Cloud requests exceeded limit`.

- Open Cloud requests **do not** consume the same overall limit of 500 HTTP requests per minute enforced on all other requests.
- Each endpoint has its own limit per API key owner (can be a user or a group) that is enforced no matter where the calls come from (`Class.HttpService`, the web, etc.).

For detailed information about Open Cloud rate limits, authentication-based rate limiting, and best practices, see [Rate Limits](/cloud/reference/rate-limits).

## Best practices

To optimize your `Class.HttpService` usage and avoid exceeding the limits, apply the following best practices:

- **Handle errors gracefully**. Web requests can fail for many reasons. Use `Global.LuaGlobals.pcall()` and have a plan for when requests fail. Furthermore, strictly validate and sanitize all received data from external APIs, ensuring correct data where you can.

- Use [exponential backoff](https://en.wikipedia.org/wiki/Exponential_backoff) to stay below limits.

  If a request returns a recoverable error, instead of immediately retrying, wait for two seconds, then four, eights, etc. between attempts. This helps limit congestion and improves the chance of a successful request by giving the endpoint time to "cool off."

- Aggregate and send data in bulk.

  When possible, it's recommended to let your server collect all necessary data in order to send one HTTP request, rather than multiple small requests. For example, if you are sending an HTTP request for every player in your server, check if the API has a bulk/batch endpoint and, if so, collect the information from all players and send it all in one request.
  
  In some cases you may have to use `Class.HttpService:RequestAsync()` to include data in the body of the request.

- **Use HTTP/2 endpoints**. HTTP/2 provides significant performance benefits through features such as header compression and request/response multiplexing over a single connection. `Class.HttpService` automatically uses HTTP/2 when available. Note that the HTTP/2 specification requires all header names to be sent in lowercase.

## Observability

The **Observability Dashboard** provides insights and analytics for monitoring and troubleshooting your `Class.HttpService` usage. The dashboard features two primary charts: **Request Count** which tracks the volume of `Class.HttpService` requests from your experience, and **Response Time** which measures the latency for endpoints to respond.

The available dimensions for filtering and breakdown are defined as follows:

<h3>Request Type</h3>

- `GET`
- `POST`
- `PUT`
- `PATCH`
- `DELETE`
- `Other` (for non-specified request types)

<h3>Status</h3>

- Success (HTTP 1xx and 2xx status codes)
- Redirect (HTTP 3xx status codes)
- 400 (Bad Request)
- 401 (Unauthorized)
- 403 (Forbidden)
- 404 (Not Found)
- 429 (Too Many Requests)
- 500 (Internal Server Error)
- 503 (Service Unavailable)
- ExternalError (any other non-specified error codes returned from the external service)
- InternalError (an issue returned from `Class.HttpService` within Roblox)

The **Response Time** chart is not correlated with status data. If you select "Status" as a breakdown or filter, this chart will not display data.

## Additional considerations

- Requests should provide a secure form of authentication, such as a pre-shared secret key, so that bad actors cannot pose as one of your Roblox servers.
- Be aware of the general capacity and rate-limiting policies of the web servers to which requests are being sent.
