---
title: Teleport to private servers
description: Explains how to teleport users to reserved servers and VIP servers using TeleportOptions.ReservedServerId and VipServerId.
---

In addition to teleporting players between public servers, `Class.TeleportService` supports teleporting to **private servers**, which are servers restricted to specific players. There are two kinds of private servers you can teleport to:

- **Reserved servers**: Developer-created servers accessed via a developer-supplied ID. Useful for private matches, co-op sessions, or any scenario where you control who joins.
- **VIP servers**: Player-purchased private servers. Use `Class.TeleportOptions.VipServerId` to route players to a VIP server they've purchased.

<Alert severity="info">
Both `Class.TeleportOptions.ReservedServerId|ReservedServerId` and `Class.TeleportOptions.VipServerId|VipServerId` are properties of the `Class.TeleportOptions` class. You can only set one private-server routing field at a time. See [Teleport between places](teleport.md) for an overview of all teleport options.
</Alert>

## Teleport to a reserved server

Reserved servers are created on demand: the first teleport using a new `ReservedServerId` creates the server, and reusing the same ID routes subsequent teleports to that same server. Generate the ID with `Class.HttpService:GenerateGUID(false)`:

```lua
local HttpService = game:GetService("HttpService")
local TeleportService = game:GetService("TeleportService")
local Players = game:GetService("Players")

local TARGET_PLACE_ID = 12345678901234

-- The users to teleport (e.g. from Players:GetPlayers() or a matchmaking group)
local player1, player2 = Players:GetPlayers()[1], Players:GetPlayers()[2]

-- Generate a unique ID for the reserved server
local reservedServerId = HttpService:GenerateGUID(false)

local teleportOptions = Instance.new("TeleportOptions")
teleportOptions.ReservedServerId = reservedServerId

-- First teleport creates the server
TeleportService:TeleportAsync(TARGET_PLACE_ID, {player1, player2}, teleportOptions)
```

### Reuse a reserved server ID

To let other players join the same reserved server later, persist the reserved server ID with a `Class.DataStoreService` data store so it survives across sessions and servers.

On the server that creates the reserved server, generate the ID for the first teleport, then save it keyed by whatever identifies the session (for example a lobby ID or party ID):

```lua
local DataStoreService = game:GetService("DataStoreService")
local HttpService = game:GetService("HttpService")
local TeleportService = game:GetService("TeleportService")

local reservedServersStore = DataStoreService:GetDataStore("ReservedServers")

-- Key that identifies the shared session across servers
local sessionKey = "lobby-123"

-- A new ID creates the reserved server on arrival at the destination
local reservedServerId = HttpService:GenerateGUID(false)
reservedServersStore:SetAsync(sessionKey, reservedServerId)

local teleportOptions = Instance.new("TeleportOptions")
teleportOptions.ReservedServerId = reservedServerId

TeleportService:TeleportAsync(TARGET_PLACE_ID, { player }, teleportOptions)
```

On any other server that needs to send players to that same reserved server, look the ID up by the same session key and set it as the `Class.TeleportOptions.ReservedServerId` of the teleport:

```lua
local DataStoreService = game:GetService("DataStoreService")
local TeleportService = game:GetService("TeleportService")

local reservedServersStore = DataStoreService:GetDataStore("ReservedServers")

local sessionKey = "lobby-123"

local existingId = reservedServersStore:GetAsync(sessionKey)
if existingId then
	local teleportOptions = Instance.new("TeleportOptions")
	teleportOptions.ReservedServerId = existingId

	TeleportService:TeleportAsync(TARGET_PLACE_ID, { player }, teleportOptions)
end
```

On a VIP server, to make the VIP server ID available on the destination server without a data store, attach it to each player with `Class.TeleportOptions:SetTeleportData()`:

```lua
local teleportOptions = Instance.new("TeleportOptions")
teleportOptions.VipServerId = game.PrivateServerId
teleportOptions:SetTeleportData({ vipServerId = game.PrivateServerId })

TeleportService:TeleportAsync(TARGET_PLACE_ID, {player}, teleportOptions)
```

On arrival, read it back from the player's join data. For more information, see [Send user data along with teleports](teleport.md#send-user-data-along-with-teleports).

### Identify a reserved server on arrival

On the destination server, check whether the current server is a reserved server:

```lua
local isReserved = game.PrivateServerId ~= "" and game.PrivateServerOwnerId == 0
```

`Class.DataModel.PrivateServerId` matches the `ReservedServerId` you supplied and remains constant across all server instances for that reserved server. `Class.DataModel.JobId` is unique per running instance and changes when the server restarts.

## Teleport to a VIP server

VIP servers are private servers that players can purchase from the game's page. To teleport a player to a VIP server, set `Class.TeleportOptions.VipServerId` to the `Class.DataModel.PrivateServerId` of the target VIP server.

```lua
local TeleportService = game:GetService("TeleportService")

local TARGET_PLACE_ID = 12345678901234
-- The PrivateServerId of the destination VIP server, for example carried
-- in the player's teleport data or read from a data store
local vipServerId = player:GetJoinData().TeleportData.vipServerId

local teleportOptions = Instance.new("TeleportOptions")
teleportOptions.VipServerId = vipServerId

TeleportService:TeleportAsync(TARGET_PLACE_ID, {player}, teleportOptions)
```

`Class.TeleportOptions.VipServerId` is distinct from `Class.TeleportOptions.ReservedServerId`. Use `ReservedServerId` for developer-created reserved servers and `VipServerId` for player-purchased VIP servers.

A VIP server ID is scoped to the experience that owns the VIP server: you can use it with the place ID of any place in that experience, but not with a place ID from another experience.

When you leave a routing field unset, the engine chooses the destination server. A teleport with no private-server routing fields set can land on a public server or, if the player recently joined a VIP server of that experience, on that VIP server.

A common use case for this pattern is returning a player from a reserved server back to the VIP server of the experience's root place. Since a reserved server's `game.PrivateServerId` is its own reserved ID rather than the origin VIP server's, carry the VIP server's ID into the reserved server, for example by passing it in `teleportData` on the outbound teleport or persisting it in a data store as shown in [Reuse a reserved server ID](#reuse-a-reserved-server-id), then set it as the `Class.TeleportOptions.VipServerId` of the return teleport.

Set the same `Class.TeleportOptions.VipServerId` on every teleport to keep players in the same VIP server across places throughout gameplay.

## Store and share server IDs

The `Class.TeleportAsyncResult` object returned by `Class.TeleportService:TeleportAsync()` contains information about the destination:

- `Class.TeleportAsyncResult.PrivateServerId` - The private server ID of the destination server. Matches `Class.DataModel.PrivateServerId` on the destination.
- `Class.TeleportAsyncResult.ReservedServerAccessCode` - Only populated for legacy access-code teleports. Not populated when using `ReservedServerId` or `VipServerId`.

```lua
local result = TeleportService:TeleportAsync(TARGET_PLACE_ID, {player}, teleportOptions)
if result then
    print("Destination PrivateServerId:", result.PrivateServerId)
end
```

## Migrate from legacy access codes

If your game uses the deprecated `Class.TeleportOptions.ReservedServerAccessCode` or `Class.TeleportOptions.ShouldReserveServer`, migrate to `ReservedServerId` by replacing the access-code flow with a GUID-based flow:

1. **Replace** `ReserveServerAsync()` and `ReservedServerAccessCode` with `Class.HttpService:GenerateGUID(false)` and `ReservedServerId`.
2. **Store** the generated GUID so you can reuse it for subsequent teleports to the same server.
3. **Update** all `TeleportOptions` usages to set `ReservedServerId` instead of `ReservedServerAccessCode` or `ShouldReserveServer`.

### Before (deprecated)

```lua
-- Deprecated: ReserveServerAsync + ReservedServerAccessCode
local accessCode, privateServerId = TeleportService:ReserveServerAsync(TARGET_PLACE_ID)

local teleportOptions = Instance.new("TeleportOptions")
teleportOptions.ReservedServerAccessCode = accessCode
TeleportService:TeleportAsync(TARGET_PLACE_ID, {player}, teleportOptions)
```

### After (current)

```lua
local HttpService = game:GetService("HttpService")
local TeleportService = game:GetService("TeleportService")

-- Current: GenerateGUID + ReservedServerId
local reservedServerId = HttpService:GenerateGUID(false)

local teleportOptions = Instance.new("TeleportOptions")
teleportOptions.ReservedServerId = reservedServerId
TeleportService:TeleportAsync(TARGET_PLACE_ID, {player}, teleportOptions)
```

The legacy `ReserveServerAsync()` and `ReservedServerAccessCode` remain available for backward compatibility, but are not recommended for new work.
`ReserveServerAsync()` does not actually reserve a server in advance, but simply generates a random GUID.
Existing reserved servers created with access codes continue to function.

## Handle failed teleports

Teleports to private servers can fail like any network call. Wrap them in `pcall` and retry as needed. When a teleport is initiated but fails at the last moment, `Class.TeleportService.TeleportInitFailed` fires with the original `Class.TeleportOptions` so you can retry with the same destination.

For a full retry implementation, see [Handle failed teleports](teleport.md#handle-failed-teleports) in the main teleport guide.

When the engine itself routes a plain teleport to a VIP server, VIP-specific join failures such as a full or flooded server fall back to a public join instead of firing `Class.TeleportService.TeleportInitFailed`. Only teleports with an explicit `Class.TeleportOptions.VipServerId` surface these failures to your retry handler.

## Best practices

- **Generate IDs on the server.** Always call `Class.HttpService:GenerateGUID(false)` from a server `Class.Script` to prevent clients from predicting or controlling reserved server IDs.
- **Persist reserved server IDs.** Store the GUID in a data store if players need to rejoin the same reserved server across sessions.
- **Use the right field.** Use `ReservedServerId` for developer-created reserved servers, `VipServerId` for player-purchased VIP servers. Never set both on the same `Class.TeleportOptions` instance.
- **Don't mix routing fields.** You can only set one of `ReservedServerId`, `VipServerId`, or `ServerInstanceId` at a time. Setting more than one causes an error.
