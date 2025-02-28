---
title: Legacy overview
description: Lists legacy REST APIs for Open Cloud.
---

This section contains documentation for Roblox's legacy REST APIs.

- Roblox offers API key and/or OAuth 2.0 support **for the select legacy API endpoints listed on this page**. See the tables below for the list of available operations and authentication types.

- All other legacy API endpoints use cookie-based authentication. We do not recommend depending on these APIs, as they rely on sharing cookies with application code.

- All legacy APIs, regardless of authentication type, can change without notice and do not have the stability guarantees of the Open Cloud APIs. See the left navigation for the full list of legacy API endpoints.

## Badges API

- Base URL: `https://apis.roblox.com/legacy-badges`
- Authentication types: OAuth 2.0 and API key
- Additional Badges API endpoints without Open Cloud authentication support can be found [here](/cloud/legacy/badges/v1).
- Robux might be required to create a badge. To identify the number of remaining free badges you can create for the current UTC day in the specified universe, use the `/v1/universes/{universeId}/free-badges-quota` endpoint found [here](/cloud/legacy/badges/v1).

| **API**     | **Path**                    | **Scope**                     |
| :---------- | :-------------------------- | :---------------------------- |
| UpdateBadge | `PATCH v1/badges/{badgeId}` | `legacy-universe.badge:write` or `legacy-universe.badge:manage-and-spend-robux` |
| CreateBadge | `POST v1/universes/{universeId}/badges` | `legacy-universe.badge:manage-and-spend-robux` |

## Develop API

- Base URL: `https://apis.roblox.com/legacy-develop`
- Authentication types: OAuth 2.0 and API key
- Additional Develop API endpoints without Open Cloud authentication support can be found [here](/cloud/legacy/develop/v1).

| **API**                              | **Path**                                                    | **Scope**                          |
| :----------------------------------- | :---------------------------------------------------------- | :--------------------------------- |
| UpdateTeamCreateSettings             | `PATCH v1/universes/{universeId}/teamcreate`                | `legacy-team-collaboration:manage` |
| GetTeamCreateSettings                | `GET v1/universes/{universeId}/teamcreate`                  | `legacy-team-collaboration:manage` |
| MultiGetTeamCreateSettings           | `GET v1/universes/multiget/teamcreate`                      | `legacy-team-collaboration:manage` |
| DeleteTeamCreateMembership           | `DELETE v1/universes/{universeId}/teamcreate/memberships`   | `legacy-team-collaboration:manage` |
| GetMembersInTeamCreateSessionByPlace | `GET v1/places/{placeId}/teamcreate/active_session/members` | `legacy-team-collaboration:manage` |
| CloseTeamTestGame                    | `DELETE v2/teamtest/{placeId}`                              | `legacy-team-collaboration:manage` |
| GetGroupsWithEditGroupGamePermission | `GET v1/user/groups/canmanage`                              | `legacy-group:manage`              |
| ActivateUniverse                     | `POST v1/universes/{universeId}/activate`                   | `legacy-universe:manage`           |
| DeactivateUniverse                   | `POST v1/universes/{universeId}/deactivate`                 | `legacy-universe:manage`           |
| GetUniversePermissions               | `GET v1/universes/{universeId}/permissions`                 | `legacy-universe:manage`           |
| MultiGetUniversePermissions          | `GET v1/universes/multiget/permissions`                     | `legacy-universe:manage`           |

## Followings API

- Base URL: `https://apis.roblox.com/legacy-followings`
- Authentication types: OAuth 2.0 and API key
- Additional Followings API endpoints without Open Cloud authentication support can be found [here](/cloud/legacy/followings/v1).

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
- Additional Game Internationalization API endpoints without Open Cloud authentication support can be found [here](/cloud/legacy/gameinternationalization/v1).

| **API**                                            | **Path**                                                                                                                     | **Scope**                         |
| :------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- | :-------------------------------- |
| GetLocalizedBadgeIcons                             | `GET v1/badges/{badgeId}/icons`                                                                                              | `legacy-badge:manage`             |
| DeleteLocalizedBadgeIcon                           | `DELETE v1/badges/{badgeId}/icons/language-codes/{languageCode}`                                                             | `legacy-badge:manage`             |
| UpdateLocalizedBadgeIcon                           | `POST v1/badges/{badgeId}/icons/language-codes/{languageCode}`                                                               | `legacy-badge:manage`             |
| GetLocalizedBadgeNamesAndDescriptions              | `GET v1/badges/{badgeId}/name-description`                                                                                   | `legacy-badge:manage`             |
| DeleteLocalizedBadgeNameAndDescription             | `DELETE v1/badges/{badgeId}/name-description/language-codes/{languageCode}`                                                  | `legacy-badge:manage`             |
| UpdateLocalizedBadgeNameAndDescription             | `PATCH v1/badges/{badgeId}/name-description/language-codes/{languageCode}`                                                   | `legacy-badge:manage`             |
| UpdateLocalizedBadgeName                           | `PATCH v1/badges/{badgeId}/name/language-codes/{languageCode}`                                                               | `legacy-badge:manage`             |
| UpdateLocalizedBadgeDescription                    | `PATCH v1/badges/{badgeId}/description/language-codes/{languageCode}`                                                        | `legacy-badge:manage`             |
| GetLocalizedDeveloperProductIcons                  | `GET v1/developer-products/{developerProductId}/icons`                                                                       | `legacy-developer-product:manage` |
| DeleteLocalizedDeveloperProductIcon                | `DELETE v1/developer-products/{developerProductId}/icons/language-codes/{languageCode}`                                      | `legacy-developer-product:manage` |
| UpdateLocalizedDeveloperProductIcon                | `POST v1/developer-products/{developerProductId}/icons/language-codes/{languageCode}`                                        | `legacy-developer-product:manage` |
| GetLocalizedDeveloperProductNamesAndDescriptions   | `GET v1/developer-products/{developerProductId}/name-description`                                                            | `legacy-developer-product:manage` |
| DeleteLocalizedDeveloperProductNameAndDescription  | `DELETE v1/developer-products/{developerProductId}/name-description/language-codes/{languageCode}`                           | `legacy-developer-product:manage` |
| UpdateLocalizedDeveloperProductNameAndDescription  | `PATCH v1/developer-products/{developerProductId}/name-description/language-codes/{languageCode}`                            | `legacy-developer-product:manage` |
| UpdateLocalizedDeveloperProductName                | `PATCH v1/developer-products/{developerProductId}/name/language-codes/{languageCode}`                                        | `legacy-developer-product:manage` |
| UpdateLocalizedDeveloperProductDescription         | `PATCH v1/developer-products/{developerProductId}/description/language-codes/{languageCode}`                                 | `legacy-developer-product:manage` |
| GetLocalizedPassIcons                              | `GET v1/game-passes/{gamePassId}/icons`                                                                                      | `legacy-game-pass:manage`         |
| DeleteLocalizedPassIcon                            | `DELETE v1/game-passes/{gamePassId}/icons/language-codes/{languageCode}`                                                     | `legacy-game-pass:manage`         |
| UpdateLocalizedPassIcon                            | `POST v1/game-passes/{gamePassId}/icons/language-codes/{languageCode}`                                                       | `legacy-game-pass:manage`         |
| GetLocalizedPassNamesAndDescriptions               | `GET v1/game-passes/{gamePassId}/name-description`                                                                           | `legacy-game-pass:manage`         |
| DeleteLocalizedPassNameAndDescription              | `DELETE v1/game-passes/{gamePassId}/name-description/language-codes/{languageCode}`                                          | `legacy-game-pass:manage`         |
| UpdateLocalizedPassNameAndDescription              | `PATCH v1/game-passes/{gamePassId}/name-description/language-codes/{languageCode}`                                           | `legacy-game-pass:manage`         |
| UpdateLocalizedPassName                            | `PATCH v1/game-passes/{gamePassId}/name/language-codes/{languageCode}`                                                       | `legacy-game-pass:manage`         |
| UpdateLocalizedPassDescription                     | `PATCH v1/game-passes/{gamePassId}/description/language-codes/{languageCode}`                                                | `legacy-game-pass:manage`         |
| GetLocalizedGameIcons                              | `GET v1/game-icon/games/{gameId}`                                                                                            | `legacy-universe:manage`          |
| UpdateLocalizedGameIcon                            | `POST v1/game-icon/games/{gameId}/language-codes/{languageCode}`                                                             | `legacy-universe:manage`          |
| DeleteLocalizedGameIcon                            | `DELETE v1/game-icon/games/{gameId}/language-codes/{languageCode}`                                                           | `legacy-universe:manage`          |
| UpdateLocalizedGameThumbnail                       | `POST v1/game-thumbnails/games/{gameId}/language-codes/{languageCode}/image`                                                 | `legacy-universe:manage`          |
| UpdateLocalizedAltTextForGameThumbnail             | `POST v1/game-thumbnails/games/{gameId}/language-codes/{languageCode}/alt-text`                                              | `legacy-universe:manage`          |
| DeleteLocalizedGameThumbnail                       | `DELETE v1/game-thumbnails/games/{gameId}/language-codes/{languageCode}/images/{imageId}`                                    | `legacy-universe:manage`          |
| OrderLocalizedGameThumbnails                       | `POST v1/game-thumbnails/games/{gameId}/language-codes/{languageCode}/images/order`                                          | `legacy-universe:manage`          |
| UpdateLocalizedGameNameAndDescription              | `PATCH v1/name-description/games/{gameId}`                                                                                   | `legacy-universe:manage`          |
| GetLocalizedContentNameAndDescriptionHistory       | `POST /v1/name-description/games/translation-history`                                                                        | `legacy-universe:manage`          |
| SetSourceLanguage                                  | `PATCH /v1/source-language/games/{gameId}`                                                                                   | `legacy-universe:manage`          |
| SetSupportedLanguages                              | `PATCH /v1/supported-languages/games/{gameId}`                                                                               | `legacy-universe:manage`          |
| GetAutomaticTranslationStatus                      | `GET /v1/supported-languages/games/{gameId}/automatic-translation-status`                                                    | `legacy-universe:manage`          |
| SetAutomaticTranslationStatus                      | `PATCH /v1/supported-languages/games/{gameId}/languages/{languageCode}/automatic-translation-status`                         | `legacy-universe:manage`          |
| GetUniverseDisplayInfoAutomaticTranslationSettings | `GET /v1/supported-languages/games/{gameId}/universe-display-info-automatic-translation-settings`                            | `legacy-universe:manage`          |
| SetUniverseDisplayInfoAutomaticTranslationSettings | `PATCH /v1/supported-languages/games/{gameId}/languages/{languageCode}/universe-display-info-automatic-translation-settings` | `legacy-universe:manage`          |

## Groups API

- Base URL: `https://apis.roblox.com/legacy-groups`
- Authentication types: OAuth 2.0 and API key
- Additional Groups API endpoints without Open Cloud authentication support can be found [here](/cloud/legacy/groups/v1).

| **API**                           | **Path**                                            | **Scope**             |
| :-------------------------------- | :-------------------------------------------------- | :-------------------- |
| GetAuditLog                       | `GET v1/groups/{groupId}/audit-log`                 | `legacy-group:manage` |
| GetGroupPolicies                  | `POST v1/groups/policies`                           | `legacy-group:manage` |
| GetGroupSettings                  | `GET v1/groups/{groupId}/settings`                  | `legacy-group:manage` |
| UpdateGroupSettings               | `PATCH v1/groups/{groupId}/settings`                | `legacy-group:manage` |
| UpdateGroupStatus                 | `PATCH v1/groups/{groupId}/status`                  | `legacy-group:manage` |
| UpdateGroupNotificationPreference | `PATCH v1/groups/{groupId}/notification-preference` | `legacy-user:manage`  |
| UpdateGroupDescription            | `PATCH v1/groups/{groupId}/description`             | `legacy-group:manage` |
| GetPendingGroupJoins              | `GET v1/user/groups/pending`                        | `legacy-group:manage` |

## Localization Tables API

- Base URL: `https://apis.roblox.com/legacy-localization-tables`
- Authentication types: OAuth 2.0 and API key
- Additional Localization Tables API endpoints without Open Cloud authentication support can be found [here](/cloud/legacy/localizationtables/v1).

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

## Publish API

- Base URL: `https://apis.roblox.com/legacy-publish`
- Authentication types: OAuth 2.0 and API key
- Additional Publish API endpoints without Open Cloud authentication support can be found [here](/cloud/legacy/publish/v1).

| **API**                                 | **Path**                                                                  | **Scope**                |
| :-------------------------------------- | :------------------------------------------------------------------------ | :----------------------- |
| UpdateBadgeIcon                         | `POST /v1/badges/{badgeId}/icon`                                          | `legacy-badge:manage`    |
