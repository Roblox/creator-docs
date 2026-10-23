---
title: Users and scoped user IDs
description: Learn how Roblox exposes one effective user ID per domain.
---

<Alert severity="warning">
Scoped user IDs have not rolled out broadly yet. `Class.Player.User` and the `Datatype.User` data type are available now, and a user's effective user ID currently remains their global user ID.
</Alert>

Roblox exposes one **effective user ID** for each user in each game, group, or app. Depending on the user's history with that domain, their effective user ID is either their global user ID or a **scoped user ID**. This page explains how effective user IDs work and how to use the `Datatype.User` type in your game code.

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
    <td>A data type that carries a user's effective user ID and its domain context. This is the standard identifier for referencing users in game code.</td>
  </tr>
  <tr>
    <td>**Global user ID**</td>
    <td>The platform-level user ID that Roblox assigns to each account. It's globally unique across Roblox.</td>
  </tr>
  <tr>
    <td>**Scoped user ID**</td>
    <td>A user ID assigned within a specific domain. A user's scoped user IDs are different in each game, group, or app.</td>
  </tr>
  <tr>
    <td>**Effective user ID**</td>
    <td>The single user ID that Roblox exposes for a user within a [domain](#effective-user-ids-and-domains).</td>
  </tr>
  <tr>
    <td>**Pre-rollout user**</td>
    <td>A user who first engaged with a domain before the scoped user ID rollout. In that domain, their effective user ID remains their global user ID.</td>
  </tr>
  <tr>
    <td>**Post-rollout user**</td>
    <td>A user who first engaged with a domain after the scoped user ID rollout. In that domain, their effective user ID is a scoped user ID.</td>
  </tr>
</tbody>
</table>

## Effective user IDs and domains

Each user has one effective user ID within a specific **game**, **group**, or **app**. Roblox doesn't expose separate global and scoped user IDs for the same user in that domain:

- A **pre-rollout user** has their global user ID as their effective user ID.
- A **post-rollout user** has a scoped user ID as their effective user ID. That ID is only meaningful within that domain.

In game code, `Class.Player.UserId` and `Datatype.User.Id|Player.User.Id` both return this effective user ID and always have the same numeric value (`Class.Player.User|Player.User.Id` equals `Class.Player.UserId`), so your code doesn't need branching logic to choose between them.

Roblox scopes user identity across three types of domains:

<table><thead>
  <tr>
    <th>Domain</th>
    <th>Scoped to</th>
    <th>Example</th>
  </tr></thead>
<tbody>
  <tr>
    <td>**Experience** (`Enum.DomainType.EXPERIENCE`)</td>
    <td>A specific experience</td>
    <td>A player's ID in your experience</td>
  </tr>
  <tr>
    <td>**Group**</td>
    <td>A specific Roblox group (community)</td>
    <td>A member's ID in your group</td>
  </tr>
  <tr>
    <td>**OAuth app** (`Enum.DomainType.OAUTH`)</td>
    <td>A specific OAuth application</td>
    <td>A user's ID in your external tool</td>
  </tr>
</tbody>
</table>

### How effective user IDs work

When a player joins your game, they have one effective user ID for that game. A post-rollout user's effective user ID is a scoped user ID unique to that game. They receive a different scoped user ID in any other game, group, or app where they are also a post-rollout user. This means:

- Effective user IDs are integers, whether they are global or scoped.
- Effective user IDs are stable across sessions within the same domain.
- A scoped user ID does not collide with any existing global user ID.
- The same numeric value can appear in different domains for different users. The unique key is the combination of the domain (domain type and domain ID) and the effective user ID.

### Example scenario

The following example demonstrates how different games reference the same user:

<table><thead>
  <tr>
    <th>Scenario</th>
    <th>User context</th>
    <th>Effective user ID seen by game</th>
  </tr></thead>
<tbody>
  <tr>
    <td>User connects to **Game A**</td>
    <td>Pre-rollout user</td>
    <td>`123` (global user ID, unchanged)</td>
  </tr>
  <tr>
    <td>User connects to **Game B**</td>
    <td>Post-rollout user</td>
    <td>`500789` (scoped user ID for Game B)</td>
  </tr>
  <tr>
    <td>User connects to **Game C**</td>
    <td>Post-rollout user</td>
    <td>`302441` (scoped user ID for Game C)</td>
  </tr>
</tbody>
</table>

### Pre-rollout users

If a player is a pre-rollout user in your game, their effective user ID remains their global user ID in that game. Both `Class.Player.UserId` and `Datatype.User.Id|Player.User.Id` return that global user ID. Roblox doesn't expose a second user ID for the player in that game. This ensures existing data store keys, leaderboards, and inventories continue to work without any changes.

### Group domain

Each Roblox group is its own domain. A user has one effective user ID within a group, separate from their effective user ID in any game or OAuth application:

- **In-game group checks don't change** — Engine methods on `Class.Player` such as `Class.Player:IsInGroupAsync()`, `Class.Player:GetRankInGroupAsync()`, and `Class.Player:GetRoleInGroupAsync()`, as well as `Class.GroupService:PromptJoinAsync()`, resolve identity internally without exposing a user ID.
- **Open Cloud group APIs use the group's domain** — This applies to endpoints that list or manage group memberships and join requests.

## Working with the User Type

`Datatype.User` is the standard way to identify users in game code. A `Datatype.User` value carries the effective user ID alongside the domain type and domain ID, so the identity context always travels with the identifier. For full API details, see the `Datatype.User` reference.

### Get a User from a Player

The primary way to obtain a `Datatype.User` is from a connected `Class.Player` via `Class.Player.User`:

```lua
local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(player)
    local user = player.User
    print("Effective user ID:", user.Id) -- Always matches player.UserId
    print("Domain type:", user.DomainType)
    print("Domain ID:", user.DomainId)
end)
```

### Construct a User from an ID

To create a `Datatype.User` from a known effective user ID within the current game, use `Datatype.User.fromId()`:

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

Engine APIs that return numeric user IDs return the user's effective user ID:

- **Pre-rollout users** — the API returns the user's global user ID.
- **Post-rollout users** — the API returns the user's scoped user ID.

`Class.Player.UserId`, `Datatype.User.Id|Player.User.Id`, and other engine APIs all return this same effective user ID for a user in your game, so existing code that reads numeric user ID fields continues to work without branching logic.

Open Cloud requests and responses use the same effective user ID for the target domain. They don't expose a second user ID for the same user in that domain.

## Storing user identity

Use a numeric effective user ID only to identify a user within a single domain. A data store key in one game can use `user.Id` directly:

```lua
local key = ("player_%d"):format(player.User.Id)
PlayerDataStore:SetAsync(key, data)
```

When another domain reads the stored identity, such as an OAuth app that moderates users, store the string from `Datatype.User:ToString()|ToString()`. The string encodes the domain context together with the effective user ID. Using the integer alone can apply an action to the wrong user when the same number identifies a different user in another domain.

```lua
local encoded = player.User:ToString()
SomeDataStore:SetAsync("support_ticket_user", encoded)

-- Later, restore from the string
local user = User.fromString(encoded)
```

For more details on serialization guarantees, see the `Datatype.User` reference.

## Best practices

- Use `Class.Player.User` as the standard identifier in new code.
- Use the numeric effective user ID only within a single domain, such as data store keys for one game.
- Use `Datatype.User:ToString()|ToString()` and `Datatype.User.fromString()|fromString()` when another domain reads the stored identity.

### When to use User or Player

- Use `Class.Player` for in-server actions: character movement, GUI, teleport, chat, inventory.
- Use `Datatype.User` for identity that outlives a session: data stores, Open Cloud tools, cross-game references.
