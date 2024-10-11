---
title: Legacy Overview
description: Lists legacy REST APIs for Open Cloud.
---

Roblox offers [API key](./open-cloud/api-keys.md) and/or [OAuth 2.0](./open-cloud/oauth2-overview.md) support for certain legacy APIs. Instead of sharing cookies, you can grant access to specific permissions and use these more secure authentication methods.

These legacy APIs support do not have the same guarantees as the newer Open Cloud APIs. **Specifically, they might change without notice and break your application.**

This page summarizes the available operations, but you might find the Swagger documentation useful, as well:

- [Badges API](https://badges.roblox.com/docs/)
- [Followings API](https://followings.roblox.com/docs/)
- [Game Internationalization API](https://gameinternationalization.roblox.com/docs/)
- [Localization Tables API](https://localizationtables.roblox.com/docs/)
- [Groups API](https://groups.roblox.com/docs/)
- [Develop API](https://develop.roblox.com/docs/)

## Badges API

- Base URL: `https://apis.roblox.com/legacy-badges`
- Authentication types: OAuth 2.0 and API key

| **API**     | **Path**                    | **Scope**                     |
| :---------- | :-------------------------- | :---------------------------- |
| UpdateBadge | `PATCH v1/badges/{badgeId}` | `legacy-universe.badge:write` |

## Followings API

- Base URL: `https://apis.roblox.com/legacy-followings`
- Authentication types: OAuth 2.0 and API key

| **API**            | **Path**                                              | **Scope**                         |
| :----------------- | :---------------------------------------------------- | :-------------------------------- |
| Follow             | `POST v1/users/{userId}/universes/{universeId}`       | `legacy-universe.following:write` |
| Unfollow           | `DELETE v1/users/{userId}/universes/{universeId}`     | `legacy-universe.following:write` |
| GetFollowingStatus | `GET v1/users/{userId}/universes/{universeId}/status` | `legacy-universe.following:read`  |
| GetFollowings      | `GET v1/users/{userId}/universes`                     | `legacy-universe.following:read`  |
| GetFollowingsV2    | `GET v2/users/{userId}/universes`                     | `legacy-universe.following:read`  |

## Game Internationalization API

- Base URL: `https://apis.roblox.com/legacy-game-internationalization`
- Authentication types: OAuth 2.0 and API key

| **API**                                           | **Path**                                                                                           | **Scope**                         |
| :------------------------------------------------ | :------------------------------------------------------------------------------------------------- | :-------------------------------- |
| GetLocalizedBadgeIcons                            | `GET v1/badges/{badgeId}/icons`                                                                    | `legacy-badge:manage`             |
| DeleteLocalizedBadgeIcon                          | `DELETE v1/badges/{badgeId}/icons/language-codes/{languageCode}`                                   | `legacy-badge:manage`             |
| UpdateLocalizedBadgeIcon                          | `POST v1/badges/{badgeId}/icons/language-codes/{languageCode}`                                     | `legacy-badge:manage`             |
| GetLocalizedBadgeNamesAndDescriptions             | `GET v1/badges/{badgeId}/name-description`                                                         | `legacy-badge:manage`             |
| DeleteLocalizedBadgeNameAndDescription            | `DELETE v1/badges/{badgeId}/name-description/language-codes/{languageCode}`                        | `legacy-badge:manage`             |
| UpdateLocalizedBadgeNameAndDescription            | `PATCH v1/badges/{badgeId}/name-description/language-codes/{languageCode}`                         | `legacy-badge:manage`             |
| UpdateLocalizedBadgeName                          | `PATCH v1/badges/{badgeId}/name/language-codes/{languageCode}`                                     | `legacy-badge:manage`             |
| UpdateLocalizedBadgeDescription                   | `PATCH v1/badges/{badgeId}/description/language-codes/{languageCode}`                              | `legacy-badge:manage`             |
| GetLocalizedDeveloperProductIcons                 | `GET v1/developer-products/{developerProductId}/icons`                                             | `legacy-developer-product:manage` |
| DeleteLocalizedDeveloperProductIcon               | `DELETE v1/developer-products/{developerProductId}/icons/language-codes/{languageCode}`            | `legacy-developer-product:manage` |
| UpdateLocalizedDeveloperProductIcon               | `POST v1/developer-products/{developerProductId}/icons/language-codes/{languageCode}`              | `legacy-developer-product:manage` |
| GetLocalizedDeveloperProductNamesAndDescriptions  | `GET v1/developer-products/{developerProductId}/name-description`                                  | `legacy-developer-product:manage` |
| DeleteLocalizedDeveloperProductNameAndDescription | `DELETE v1/developer-products/{developerProductId}/name-description/language-codes/{languageCode}` | `legacy-developer-product:manage` |
| UpdateLocalizedDeveloperProductNameAndDescription | `PATCH v1/developer-products/{developerProductId}/name-description/language-codes/{languageCode}`  | `legacy-developer-product:manage` |
| UpdateLocalizedDeveloperProductName               | `PATCH v1/developer-products/{developerProductId}/name/language-codes/{languageCode}`              | `legacy-developer-product:manage` |
| UpdateLocalizedDeveloperProductDescription        | `PATCH v1/developer-products/{developerProductId}/description/language-codes/{languageCode}`       | `legacy-developer-product:manage` |
| GetLocalizedPassIcons                             | `GET v1/game-passes/{gamePassId}/icons`                                                            | `legacy-game-pass:manage`         |
| DeleteLocalizedPassIcon                           | `DELETE v1/game-passes/{gamePassId}/icons/language-codes/{languageCode}`                           | `legacy-game-pass:manage`         |
| UpdateLocalizedPassIcon                           | `POST v1/game-passes/{gamePassId}/icons/language-codes/{languageCode}`                             | `legacy-game-pass:manage`         |
| GetLocalizedPassNamesAndDescriptions              | `GET v1/game-passes/{gamePassId}/name-description`                                                 | `legacy-game-pass:manage`         |
| DeleteLocalizedPassNameAndDescription             | `DELETE v1/game-passes/{gamePassId}/name-description/language-codes/{languageCode}`                | `legacy-game-pass:manage`         |
| UpdateLocalizedPassNameAndDescription             | `PATCH v1/game-passes/{gamePassId}/name-description/language-codes/{languageCode}`                 | `legacy-game-pass:manage`         |
| UpdateLocalizedPassName                           | `PATCH v1/game-passes/{gamePassId}/name/language-codes/{languageCode}`                             | `legacy-game-pass:manage`         |
| UpdateLocalizedPassDescription                    | `PATCH v1/game-passes/{gamePassId}/description/language-codes/{languageCode}`                      | `legacy-game-pass:manage`         |
| GetLocalizedGameIcons                             | `GET v1/game-icon/games/{gameId}`                                                                  | `legacy-universe:manage`          |
| UpdateLocalizedGameIcon                           | `POST v1/game-icon/games/{gameId}/language-codes/{languageCode}`                                   | `legacy-universe:manage`          |
| DeleteLocalizedGameIcon                           | `DELETE v1/game-icon/games/{gameId}/language-codes/{languageCode}`                                 | `legacy-universe:manage`          |
| UpdateLocalizedGameThumbnail                      | `POST v1/game-thumbnails/games/{gameId}/language-codes/{languageCode}/image`                       | `legacy-universe:manage`          |
| UpdateLocalizedAltTextForGameThumbnail            | `POST v1/game-thumbnails/games/{gameId}/language-codes/{languageCode}/alt-text`                    | `legacy-universe:manage`          |
| DeleteLocalizedGameThumbnail                      | `DELETE v1/game-thumbnails/games/{gameId}/language-codes/{languageCode}/images/{imageId}`          | `legacy-universe:manage`          |
| OrderLocalizedGameThumbnails                      | `POST v1/game-thumbnails/games/{gameId}/language-codes/{languageCode}/images/order`                | `legacy-universe:manage`          |
| UpdateLocalizedGameNameAndDescription             | `PATCH v1/name-description/games/{gameId}`                                                         | `legacy-universe:manage`          |
| GetLocalizedContentNameAndDescriptionHistory      | `POST /v1/name-description/games/translation-history`                                              | `legacy-universe:manage`          |

## Localization Tables API

- Base URL: `https://apis.roblox.com/legacy-localization-tables`
- Authentication types: OAuth 2.0 and API key

| **API**                                 | **Path**                                                                  | **Scope**                |
| :-------------------------------------- | :------------------------------------------------------------------------ | :----------------------- |
| GetMetadata                             | `GET v1/autolocalization/metadata`                                        | `legacy-universe:manage` |
| GetOrCreateAutolocalizationTableForGame | `POST v1/autolocalization/games/{gameId}/autolocalizationtable`           | `legacy-universe:manage` |
| SetAutolocalizationSettingsForGame      | `PATCH v1/autolocalization/games/{gameId}/settings`                       | `legacy-universe:manage` |
| GetLimits                               | `GET v1/localization-table/limits`                                        | `legacy-universe:manage` |
| GetTableByAssetId                       | `GET v1/localization-table/tables/{assetId}`                              | `legacy-universe:manage` |
| GetTableByTableId                       | `GET v1/localization-table/tables/{tableId}`                              | `legacy-universe:manage` |
| UpdateTableContents                     | `PATCH v1/localization-table/tables/{tableId}`                            | `legacy-universe:manage` |
| GetTableEntriesPaged                    | `GET v1/localization-table/tables/{tableId}/entries`                      | `legacy-universe:manage` |
| GetTableEntryCount                      | `GET v1/localization-table/tables/{tableId}/entry-count`                  | `legacy-universe:manage` |
| GetTableEntriesTranslationHistory       | `POST v1/localization-table/tables/{tableId}/entries/translation-history` | `legacy-universe:manage` |

## Groups API

- Base URL: `https://apis.roblox.com/legacy-groups`
- Authentication types: OAuth 2.0 and API key

| **API**                           | **Path**                                            | **Scope**             |
| :-------------------------------- | :-------------------------------------------------- | :-------------------- |
| GetAuditLog                       | `GET v1/groups/{groupId}/audit-log`                 | `legacy-group:manage` |
| GetGroupPolicies                  | `POST v1/groups/policies`                           | `legacy-group:manage` |
| GetGroupSettings                  | `GET v1/groups/{groupId}/settings`                  | `legacy-group:manage` |
| UpdateGroupSettings               | `PATCH v1/groups/{groupId}/settings`                | `legacy-group:manage` |
| UpdateGroupStatus                 | `PATCH v1/groups/{groupId}/status`                  | `legacy-group:manage` |
| UpdateGroupNotificationPreference | `PATCH v1/groups/{groupId}/notification-preference` | `legacy-user:manage` |
| UpdateGroupDescription            | `PATCH v1/groups/{groupId}/description`             | `legacy-group:manage` |

## Develop API

- Base URL: `https://apis.roblox.com/legacy-develop`
- Authentication types: OAuth 2.0 and API key

| **API**                              | **Path**                                                    | **Scope**                          |
| :----------------------------------- | :---------------------------------------------------------- | :--------------------------------- |
| UpdateTeamCreateSettings             | `PATCH v1/universes/{universeId}/teamcreate`                | `legacy-team-collaboration:manage` |
| GetTeamCreateSettings                | `GET v1/universes/{universeId}/teamcreate`                  | `legacy-team-collaboration:manage` |
| MultiGetTeamCreateSettings           | `GET v1/universes/multiget/teamcreate`                      | `legacy-team-collaboration:manage` |
| DeleteTeamCreateMembership           | `DELETE v1/universes/{universeId}/teamcreate/memberships`   | `legacy-team-collaboration:manage` |
| GetMembersInTeamCreateSessionByPlace | `GET v1/places/{placeId}/teamcreate/active_session/members` | `legacy-team-collaboration:manage` |
| CloseTeamTestGame                    | `DELETE v2/teamtest/{placeId}`                              | `legacy-team-collaboration:manage` |
