---
title: In-experience HTTP requests
description: Use HttpService to send HTTP requests to third-party web services and Open Cloud.
---

You can use `Class.HttpService` to send generic HTTP requests to third-party web services for use cases like analytics, data storage, or error logging. `Class.HttpService` also supports certain Open Cloud endpoints.

## Enable HTTP requests

The `Class.HttpService:GetAsync()`, `Class.HttpService:PostAsync()`, and `Class.HttpService:RequestAsync()` methods aren't enabled by default. To send requests, you must **Allow HTTP Requests** under [Game Settings](../studio/game-settings.md) for your experience.

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

#### Data stores

Due to current limitations on `Class.HttpService`, the `..` string is not allowed in URL path parameters to Roblox domains. This means data stores and entries containing this string are currently
inaccessible from `Class.HttpService`.

- [ListDataStores](/cloud/reference/DataStore#Cloud_ListDataStores)
- [ListDataStoreEntries](/cloud/reference/DataStoreEntry#Cloud_ListDataStoreEntries__Using_Universes)
- [CreateDataStoreEntry](/cloud/reference/DataStoreEntry#Cloud_CreateDataStoreEntry__Using_Universes)
- [GetDataStoreEntry](/cloud/reference/DataStoreEntry#Cloud_GetDataStoreEntry__Using_Universes_DataStores)
- [DeleteDataStoreEntry](/cloud/reference/DataStoreEntry#Cloud_DeleteDataStoreEntry__Using_Universes_DataStores)
- [UpdateDataStoreEntry](/cloud/reference/DataStoreEntry#Cloud_UpdateDataStoreEntry__Using_Universes_DataStores)
- [IncrementDataStoreEntry](/cloud/reference/DataStoreEntry#Cloud_IncrementDataStoreEntry__Using_Universes_DataStores)

#### Inventory items

- [ListInventoryItems](/cloud/reference/InventoryItem#Cloud_ListInventoryItems)

#### Creator Store

- [CreatorStoreAssetsSearch](/cloud/features/creator-store#toolbox-service)

### Limitations

- Only the `x-api-key` and `content-type` headers are allowed.
- The `x-api-key` header must be a `Datatype.Secret`. See [Secrets stores](./secrets.md).
- The `".."` string is not allowed in URL path parameters.
- Only the HTTPS protocol is supported.
- You cannot use port `1194` or any port below `1024`, except `80` and `443`. If you try to use a blocked port, you receive either a `403 Forbidden` or `ERR_ACCESS_DENIED` error.

### Rate limits

For each Roblox game server, there is a limit of 500 HTTP requests per minute. Exceeding this can cause request-sending methods to stall for around 30 seconds. Your `Global.LuaGlobals.pcall()` may also fail with a message of `Number of requests exceeded limit`.

- Open Cloud requests consume the same overall limit of 500 HTTP requests per minute enforced on all other requests.
- Each Open Cloud endpoint has its own limit per API key owner (can be a user or a group) that is enforced no matter where the calls come from (`Class.HttpService`, the web, etc.). The following headers are returned with every response and allow you to view the limits and your remaining quota:

  - `x-ratelimit-limit` - The total number of requests allowed to be made per API key owner (usually per minute).
  - `x-ratelimit-remaining` - The number of requests the API key used is still allowed to make. If this number is 0 and you receive a HTTP 429 response status code, then you have reached the rate limit for this endpoint.
  - `x-ratelimit-reset` - The number of seconds left before `x-ratelimit-remaining` resets to `x-ratelimit-limit`.

### Additional considerations

- Web requests can fail for many reasons. Use `Global.LuaGlobals.pcall()` and have a plan for when
requests fail.
- Requests should provide a secure form of authentication, such as a pre-shared secret key, so that bad actors cannot pose as one of your Roblox game servers.
- Be aware of the general capacity and rate-limiting policies of the web servers to which requests are being sent.
