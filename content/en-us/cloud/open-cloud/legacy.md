---
title: Legacy Resources
description: Lists legacy REST APIs for Open Cloud.
---

Roblox offers [API key](api-keys.md) and/or [OAuth 2.0](oauth2-overview.md) support for certain legacy APIs. Instead of sharing cookies, you can grant access to specific permissions and use these more secure authentication methods.

These legacy APIs support do not have the same guarantees as the newer Open Cloud APIs. **Specifically, they might change without notice and break your application.**

This page summarizes the available operations, but you might find the Swagger documentation useful, as well:

- [Badges API](https://badges.roblox.com/docs/)
- [Followings API](https://followings.roblox.com/docs/)
- [Game Internationalization API](https://gameinternationalization.roblox.com/docs/)

## Badges API

- Base URL: `https://apis.roblox.com/legacy-badges`
- Authentication types: OAuth 2.0 and API key

**API** | **Path** | **Scope**
:--- | :--- | :---
UpdateBadge | `PATCH v1/badges/{badgeId}` | `legacy-universe.badge:write`

## Followings API

- Base URL: `https://apis.roblox.com/legacy-followings`
- Authentication types: OAuth 2.0 and API key

**API** | **Path** | **Scope**
:--- | :--- | :---
Follow | `POST v1/users/{userId}/universes/{universeId}` | `legacy-universe.following:write`
Unfollow | `DELETE v1/users/{userId}/universes/{universeId}` | `legacy-universe.following:write`
GetFollowingStatus | `GET v1/users/{userId}/universes/{universeId}/status` | `legacy-universe.following:read`
GetFollowings | `GET v1/users/{userId}/universes` | `legacy-universe.following:read`
GetFollowingsV2 | `GET v2/users/{userId}/universes` | `legacy-universe.following:read`

## Game Internationalization API

- Base URL: `https://apis.roblox.com/legacy-game-internationalization`
- Authentication types: OAuth 2.0 and API key

**API** | **Path** | **Scope**
:--- | :--- | :---
GetLocalizedBadgeIcons | `GET v1/badges/{badgeId}/icons` | `legacy-badge:manage`
DeleteLocalizedBadgeIcon | `DELETE v1/badges/{badgeId}/icons/language-codes/{languageCode}` | `legacy-badge:manage`
GetLocalizedBadgeNamesAndDescriptions | `GET v1/badges/{badgeId}/name-description` | `legacy-badge:manage`
DeleteLocalizedBadgeNameAndDescription | `DELETE v1/badges/{badgeId}/name-description/language-codes/{languageCode}` | `legacy-badge:manage`
UpdateLocalizedBadgeNameAndDescription | `PATCH v1/badges/{badgeId}/name-description/language-codes/{languageCode}` | `legacy-badge:manage`
UpdateLocalizedBadgeName | `PATCH v1/badges/{badgeId}/name/language-codes/{languageCode}` | `legacy-badge:manage`
UpdateLocalizedBadgeDescription | `PATCH v1/badges/{badgeId}/description/language-codes/{languageCode}` | `legacy-badge:manage`
GetLocalizedDeveloperProductIcons | `GET v1/developer-products/{developerProductId}/icons` | `legacy-developer-product:manage`
DeleteLocalizedDeveloperProductIcon | `DELETE v1/developer-products/{developerProductId}/icons/language-codes/{languageCode}` | `legacy-developer-product:manage`
GetLocalizedDeveloperProductNamesAndDescriptions | `GET v1/developer-products/{developerProductId}/name-description` | `legacy-developer-product:manage`
DeleteLocalizedDeveloperProductNameAndDescription | `DELETE v1/developer-products/{developerProductId}/name-description/language-codes/{languageCode}` | `legacy-developer-product:manage`
UpdateLocalizedDeveloperProductNameAndDescription | `PATCH v1/developer-products/{developerProductId}/name-description/language-codes/{languageCode}` | `legacy-developer-product:manage`
UpdateLocalizedDeveloperProductName | `PATCH v1/developer-products/{developerProductId}/name/language-codes/{languageCode}` | `legacy-developer-product:manage`
UpdateLocalizedDeveloperProductDescription | `PATCH v1/developer-products/{developerProductId}/description/language-codes/{languageCode}` | `legacy-developer-product:manage`
GetLocalizedPassIcons | `GET v1/game-passes/{gamePassId}/icons` | `legacy-game-pass:manage`
DeleteLocalizedPassIcon | `DELETE v1/game-passes/{gamePassId}/icons/language-codes/{languageCode}` | `legacy-game-pass:manage`
GetLocalizedPassNamesAndDescriptions | `GET v1/game-passes/{gamePassId}/name-description` | `legacy-game-pass:manage`
DeleteLocalizedPassNameAndDescription | `DELETE v1/game-passes/{gamePassId}/name-description/language-codes/{languageCode}` | `legacy-game-pass:manage`
UpdateLocalizedPassNameAndDescription | `PATCH v1/game-passes/{gamePassId}/name-description/language-codes/{languageCode}` | `legacy-game-pass:manage`
UpdateLocalizedPassName | `PATCH v1/game-passes/{gamePassId}/name/language-codes/{languageCode}` | `legacy-game-pass:manage`
UpdateLocalizedPassDescription | `PATCH v1/game-passes/{gamePassId}/description/language-codes/{languageCode}` | `legacy-game-pass:manage`
