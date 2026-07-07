---
title: Users and domain-scoped user IDs
description: Learn about domain-scoped user IDs and the User type for identifying players in your games.
---

<Alert severity = 'warning'>
Refer to the [DevForum announcement](https://devforum.roblox.com/t/update-on-safety-privacy-introducing-scoped-user-identifiers/4677155/1) for latest information on domain-scoped user ID rollout and timelines.
</Alert>

Roblox assigns each user a unique **domain-scoped user ID** per game or app they interact with. This page explains how domain-scoped identification works and how to use the `Datatype.User` type in your game code.

The following concepts are central to user identification:

<table><thead>
  <tr>
    <th>Concept</th>
    <th>Description</th>
  </tr></thead>
<tbody>
  <tr>
    <td>**User**</td>
    <td>A persistent account on Roblox.</td>
  </tr>
  <tr>
    <td>**Player**</td>
    <td>The representation of a user within a running game's data model (see [Players](./index.md)).</td>
  </tr>
  <tr>
    <td>`Datatype.User` data type</td>
    <td>A data type that represents a user's identity within a specific domain. This is the standard identifier for referencing users in game code.</td>
  </tr>
  <tr>
    <td>**Domain-scoped user ID**</td>
    <td>A numeric identifier that uniquely identifies a user within a specific [domain](#domain-scoped-user-ids). This identifier is different in every game and app.</td>
  </tr>
</tbody>
</table>

## Domain-scoped user IDs

A **domain-scoped user ID** is a unique identifier assigned to a user within a specific **game** or **app**. Unlike a global user ID, a domain-scoped user ID is only meaningful within the domain that issued it, so the same user has a different domain-scoped user ID in each game or app they interact with. Players who joined your game before the scoped ID rollout keep their original global user ID in that game (see [Returning players](#returning-players)).

Domain types are represented by `Enum.DomainType`:

<table><thead>
  <tr>
    <th>Domain type</th>
    <th>Scoped to</th>
    <th>Example</th>
  </tr></thead>
<tbody>
  <tr>
    <td>`Enum.DomainType.EXPERIENCE`</td>
    <td>A specific game (universe)</td>
    <td>A player's ID in your game</td>
  </tr>
  <tr>
    <td>`Enum.DomainType.OAUTH`</td>
    <td>A specific OAuth application</td>
    <td>A user's ID in your external tool</td>
  </tr>
</tbody>
</table>

### How domain-scoped IDs work

When a player joins your game, they receive a domain-scoped user ID that is unique to that game. The same player joining a different game receives a different domain-scoped user ID. This means:

- Domain-scoped user IDs are integers, similar to existing global user IDs.
- A domain-scoped user ID does not collide with any existing global user ID.
- The same numeric value may appear in different domains for different users. The unique key is the combination of domain type, domain ID, and domain-scoped user ID.

### Example scenario

The following example demonstrates how different games reference the same user:

<table><thead>
  <tr>
    <th>Scenario</th>
    <th>User context</th>
    <th>User ID seen by game</th>
  </tr></thead>
<tbody>
  <tr>
    <td>User connects to **Game A**</td>
    <td>Returning player (visited before scoped IDs)</td>
    <td>`123` (global ID, unchanged)</td>
  </tr>
  <tr>
    <td>User connects to **Game B**</td>
    <td>First visit after scoped ID rollout</td>
    <td>`500789` (domain-scoped user ID for Game B)</td>
  </tr>
  <tr>
    <td>User connects to **Game C**</td>
    <td>First visit after scoped ID rollout</td>
    <td>`302441` (domain-scoped user ID for Game C)</td>
  </tr>
</tbody>
</table>

### Returning players

If a player already joined your game before the scoped user ID rollout, they keep their original global user ID in that game. This ensures existing data store keys, leaderboards, and inventories continue to work without any changes.

## Working with the User Type

`Datatype.User` is the standard way to identify users in game code. A `Datatype.User` value carries the domain-scoped user ID alongside the domain type and domain ID, so the identity context always travels with the identifier. For full API details, see the `Datatype.User` reference.

### Get a User from a Player

The primary way to obtain a `Datatype.User` is from a connected `Class.Player` via `Class.Player.User`:

```lua
local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(player)
    local user = player.User
    print("Domain user ID:", user.Id)
    print("Domain type:", user.DomainType)
    print("Domain ID:", user.DomainId)
end)
```

### Construct a User from an ID

To create a `Datatype.User` from a known user ID within the current game, use `Datatype.User.fromId()`:

```lua
local user = User.fromId(knownUserId)
```

## Using User with engine APIs

Engine APIs that accept a user ID parameter also accept `Datatype.User` values directly. Using `Datatype.User` is recommended:

```lua
-- Both forms work:
BadgeService:AwardBadge(player.User, badgeId)    -- Recommended
BadgeService:AwardBadge(player.UserId, badgeId)
```

```lua
-- Both forms work:
local target = Players:GetPlayerByUserId(player.User) -- Recommended
local target = Players:GetPlayerByUserId(someUserId)
```

When a numeric user ID is passed to an engine API that accepts user IDs, it is automatically wrapped into a `Datatype.User` internally.

### Engine APIs that return user IDs

Engine APIs that return numeric user IDs continue to use the same field names and types. Each returned ID is either a global ID or a domain-scoped user ID depending on whether the user joined the game before or after the scoped ID rollout:

- **Returning players** (first joined before scoped ID launch) — the API returns the user's global user ID.
- **New players** (first join after scoped ID launch) — the API returns the user's domain-scoped user ID.

Both global and domain-scoped user IDs are standard integers that do not collide, so existing code that reads these numeric fields continues to work.

## Storing user identity

For data store keys within a single game, use `user.Id` directly:

```lua
local key = ("player_%d"):format(player.User.Id)
PlayerDataStore:SetAsync(key, data)
```

For values that may be read by other systems or need full domain context, serialize the `Datatype.User` with `Datatype.User:ToString()|ToString()`:

```lua
local encoded = player.User:ToString()
SomeDataStore:SetAsync("support_ticket_user", encoded)

-- Later, restore from the string
local user = User.fromString(encoded)
```

For more details on serialization guarantees, see the `Datatype.User` reference.

## Best practices

- Use `Class.Player.User` as the standard identifier in new code.
- Use `Datatype.User:ToString()|ToString()` and `Datatype.User.fromString()|fromString()` when persisting or transmitting a `Datatype.User` value.
- Do not use a numeric user ID from one domain to identify a user in another domain.

### When to use User or Player

- Use `Class.Player` for in-server actions: character movement, GUI, teleport, chat, inventory.
- Use `Datatype.User` for identity that outlives a session: data stores, Open Cloud tools, cross-game references.
