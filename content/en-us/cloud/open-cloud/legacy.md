---
title: Legacy Resources
description: Lists legacy REST APIs for Open Cloud.
---

Roblox offers [API key](api-keys.md) and/or [OAuth 2.0](oauth2-overview.md) support for certain legacy APIs. Instead of sharing cookies, you can grant access to specific permissions and use these more secure authentication methods.

These legacy APIs support do not have the same guarantees as the newer Open Cloud APIs. **Specifically, they might change without notice and break your application.**

This page summarizes the available operations, but you might find the Swagger documentation useful, as well:

- [Badges API](https://badges.roblox.com/docs/)
- [Followings API](https://followings.roblox.com/docs/)

## Badges API

- Base URL: `https://apis.roblox.com/legacy-badges`
- Authentication types: OAuth 2.0 and API key

### UpdateBadge

```json
PATCH v1/badges/{badgeId}
```

Scope: `legacy-universe.badge:write`

## Followings API

- Base URL: `https://apis.roblox.com/legacy-followings`
- Authentication types: OAuth 2.0 and API key

### Follow

```json
POST v1/users/{userId}/universes/{universeId}
```

Scope: `legacy-universe.following:write`

### Unfollow

```json
DELETE v1/users/{userId}/universes/{universeId}
```

Scope: `legacy-universe.following:write`

### GetFollowingStatus

```json
GET v1/users/{userId}/universes/{universeId}/status
```

Scope: `legacy-universe.following:read`

### GetFollowings

```json
GET v1/users/{userId}/universes
```

Scope: `legacy-universe.following:read`

### GetFollowingsV2

```json
GET v2/users/{userId}/universes
```

Scope: `legacy-universe.following:read`
