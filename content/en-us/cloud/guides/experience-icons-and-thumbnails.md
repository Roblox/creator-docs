---
title: Manage experience icons and thumbnails
description: Explains how to update a place icon, experience detail page thumbnails, and homepage thumbnails with Open Cloud.
---

Experiences are associated with various icon/thumbnail media. The [place icon](../../production/publishing/experience-icons.md) is a single square image. [Experience detail page thumbnails](../../production/publishing/thumbnails.md) are an ordered list on the game page. [Homepage thumbnails](../../production/publishing/thumbnails.md#home-page-personalization) are the images Roblox can rotate on the Home page. The terms 'thumbnail' and 'preview' are interchangeable.

<table>
  <thead>
    <tr>
      <th>Image</th>
      <th>Identifier</th>
      <th>Request</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="#update-the-place-icon"><strong>Place icon</strong></a></td>
      <td>Place ID</td>
      <td><a href="/cloud/reference/features/assets#Assets_UpdateAsset">Update Asset</a> with <code>updateMask=icon</code></td>
    </tr>
    <tr>
      <td><a href="#update-a-translated-icon"><strong>Translated icon</strong></a></td>
      <td>Universe ID and language code</td>
      <td><a href="/cloud/reference/features/localization#post_legacy_game_internationalization_v1_game_icon_games__gameId__language_codes__languageCode_">Update a game's icon</a></td>
    </tr>
    <tr>
      <td><a href="#update-experience-detail-page-thumbnails"><strong>Experience detail page thumbnails</strong></a></td>
      <td>Place ID</td>
      <td><a href="/cloud/reference/features/assets#Assets_UpdateAsset">Update Asset</a> with <code>updateMask=previews</code></td>
    </tr>
    <tr>
      <td><a href="#update-homepage-thumbnails"><strong>Homepage thumbnails</strong></a></td>
      <td>Universe ID and homepage thumbnail IDs</td>
      <td><a href="/cloud/reference/features/thumbnail-personalization">Thumbnail Personalization API</a></td>
    </tr>
  </tbody>
</table>

## Before you call the API

[Create an API key](../auth/api-keys.md) and send it in the `x-api-key` header.

- For the place icon and experience detail page thumbnails, add **assets** to **Access Permissions** and grant **Read** and **Write** on the game. These calls use the `asset:read` and `asset:write` scopes.
- Homepage thumbnail calls require the `universe.thumbnail:read` and `universe.thumbnail:write` scopes on that game.
- Translated icon calls require the `legacy-universe:manage` scope.

The icon and detail-page calls take the **Place ID**. Homepage calls take the **Universe ID**. Copy both from the [Creator Dashboard](https://create.roblox.com/dashboard/creations):

1. Hover over the game's thumbnail, click the **&ctdot;** button, and select **Copy Universe ID**.
1. Open the game, then open **Configurations** > **Places**.
1. Open the start place. The **Place ID** is in the URL. For example, in `https://create.roblox.com/dashboard/creations/experiences/0000000/places/111111/configure`, the Place ID is `111111`.

The same icon and preview calls work for a place other than the start place. Pass that place's ID when the image belongs to that place.

## Upload the image

The place icon and experience detail page thumbnails store a path to an existing **Image** asset, such as `assets/2205400862`. Upload the file with [Create Asset](/cloud/reference/features/assets#Assets_CreateAsset), then poll [Get Operation](/cloud/reference/features/assets#Assets_GetOperation) until `done` is `true`. Read `response.assetId` from that operation. For the full upload flow, limits, and group ownership, see the [usage guide for assets](usage-assets.md).

Use `userId` when you own the game. Use `groupId` instead when a group owns it.

```bash title="Example request for uploading an image"
curl --location 'https://apis.roblox.com/assets/v1/assets' \
--header 'x-api-key: ${ApiKey}' \
--form 'request="{
  \"assetType\": \"Image\",
  \"displayName\": \"Experience image\",
  \"description\": \"Image for an experience icon or thumbnail\",
  \"creationContext\": {
    \"creator\": {
      \"userId\": \"${UserId}\"
    }
  }
}";type=application/json' \
--form 'fileContent=@"/filepath/image.png";type=image/png'
```

Prepare the file before uploading. A place icon must be square, and a non-square file is rejected. For the recommended sizes and other image requirements, see [Icons](../../production/publishing/experience-icons.md#best-practices) and [Thumbnails](../../production/publishing/thumbnails.md#best-practices).

Players see the image after moderation approves it. The operation response includes `moderationResult.moderationState`.

## Update the place icon

**Main article:** [Icons](../../production/publishing/experience-icons.md)

Send **Update Asset** on the place. Set `updateMask` to `icon` and set `icon` to the image asset path. Omit `fileContent`. This call replaces the source-language icon.

```bash title="Example request for setting the place icon"
curl --location --request PATCH 'https://apis.roblox.com/assets/v1/assets/${PlaceId}?updateMask=icon' \
--header 'x-api-key: ${ApiKey}' \
--form 'request="{
  \"assetId\": \"${PlaceId}\",
  \"icon\": \"assets/${ImageAssetId}\"
}";type=application/json'
```

To remove the icon, send the same request with `icon` set to an empty string.

## Update a translated icon

**Main article:** [Icons](../../production/publishing/experience-icons.md)

The [localized game-icon endpoint](/cloud/reference/features/localization#post_legacy_game_internationalization_v1_game_icon_games__gameId__language_codes__languageCode_) updates an icon for a language other than the source language. A request for the source language is rejected. Use [Update the place icon](#update-the-place-icon) for the icon players see before any translation.

`gameId` is the **Universe ID**. `Files` is the square icon image.

```bash title="Example request for setting a translated icon"
curl --location --request POST 'https://apis.roblox.com/legacy-game-internationalization/v1/game-icon/games/${UniverseId}/language-codes/${LanguageCode}' \
--header 'x-api-key: ${ApiKey}' \
--form 'Files=@"/filepath/icon.png"'
```

## Update experience detail page thumbnails

**Main article:** [Thumbnails](../../production/publishing/thumbnails.md)

Detail-page thumbnails are the place asset's `previews` list. Each entry is an image asset path plus optional alt text. The array order is the order on the game page.

`updateMask=previews` replaces the whole list. Include every thumbnail that should remain, including thumbnails that only move to a new position. Leave a thumbnail out to remove it. Send one entry to make that image the only detail-page thumbnail.

Read the current list before you change it:

```bash title="Example request for reading detail-page thumbnails"
curl --location 'https://apis.roblox.com/assets/v1/assets/${PlaceId}?readMask=previews' \
--header 'x-api-key: ${ApiKey}'
```

Upload any new files first, then send the full list:

```bash title="Example request for replacing detail-page thumbnails"
curl --location --request PATCH 'https://apis.roblox.com/assets/v1/assets/${PlaceId}?updateMask=previews' \
--header 'x-api-key: ${ApiKey}' \
--form 'request="{
  \"assetId\": \"${PlaceId}\",
  \"previews\": [
    {
      \"asset\": \"assets/${FirstImageAssetId}\",
      \"altText\": \"Players racing through the city\"
    },
    {
      \"asset\": \"assets/${SecondImageAssetId}\",
      \"altText\": \"A close view of the new vehicle\"
    }
  ]
}";type=application/json'
```

This request updates the image list. For how many images or videos a game can show, and for video thumbnails and alt text, see [Thumbnails](../../production/publishing/thumbnails.md).

## Update homepage thumbnails

**Main article:** [Home page personalization](../../production/publishing/thumbnails.md#home-page-personalization)

Homepage thumbnails use the [Thumbnail Personalization API](/cloud/reference/features/thumbnail-personalization), not `previews`. Upload through that API, wait for a **homepage thumbnail ID**, and then save the active set. The ID in `homepageThumbnailIds` is the homepage thumbnail ID, not the image asset ID and not a path such as `assets/2205400862`.

Follow the image requirements and activation rules in [Home page personalization](../../production/publishing/thumbnails.md#home-page-personalization).

### Upload a homepage thumbnail

```bash title="Example request for uploading a homepage thumbnail"
curl --location --request POST 'https://apis.roblox.com/thumbnail-personalization-api/v1/universes/${UniverseId}/thumbnails/uploads' \
--header 'x-api-key: ${ApiKey}' \
--form 'files=@"/filepath/thumbnail.png"'
```

The response maps each file name to an operation ID in `fileToOperationIdDict`. Poll that operation until `uploadThumbnailStatusDict` includes it, then copy `homepageThumbnailId`:

```bash title="Example request for upload status"
curl --location 'https://apis.roblox.com/thumbnail-personalization-api/v1/universes/${UniverseId}/thumbnails/uploads/status?operationIds=${OperationId}' \
--header 'x-api-key: ${ApiKey}'
```

To reuse a thumbnail that is already on the homepage, list them and match `assetId`. An approved video thumbnail is included the same way as an image: the list entry's `assetId` is the video asset, and `homepageThumbnailIds` takes that entry's `homepageThumbnailId`. The upload request on this API accepts image files. For video rules and the monthly quota, see [Thumbnails](../../production/publishing/thumbnails.md#videos).

```bash title="Example request for listing homepage thumbnails"
curl --location 'https://apis.roblox.com/thumbnail-personalization-api/v1/universes/${UniverseId}/thumbnails' \
--header 'x-api-key: ${ApiKey}'
```

### Choose the active homepage thumbnails

[Create a configuration](/cloud/reference/features/thumbnail-personalization#ThumbnailPersonalizationApi.HomepageThumbnail_CreateThumbnailPersonalization) when you want a new active set. This deactivates the previous configuration and starts new statistics. The list can contain up to five homepage thumbnail IDs. This example leaves a single thumbnail active:

```bash title="Example request for a new homepage configuration"
curl --location --request POST 'https://apis.roblox.com/thumbnail-personalization-api/v1/universes/${UniverseId}/personalization/create' \
--header 'x-api-key: ${ApiKey}' \
--header 'Content-Type: application/json' \
--data '{
  "homepageThumbnailIds": ["${HomepageThumbnailId}"]
}'
```

[Update the active configuration](/cloud/reference/features/thumbnail-personalization#ThumbnailPersonalizationApi.HomepageThumbnail_UpdateThumbnailPersonalization) to change the active set without resetting its statistics. Read the active configuration first and send its `id` back:

```bash title="Example request for reading the active configuration"
curl --location 'https://apis.roblox.com/thumbnail-personalization-api/v1/universes/${UniverseId}/personalization?status=Active' \
--header 'x-api-key: ${ApiKey}'
```

```bash title="Example request for replacing thumbnails in the active configuration"
curl --location --request POST 'https://apis.roblox.com/thumbnail-personalization-api/v1/universes/${UniverseId}/personalization/update' \
--header 'x-api-key: ${ApiKey}' \
--header 'Content-Type: application/json' \
--data '{
  "id": "${ConfigurationId}",
  "homepageThumbnailIds": ["${HomepageThumbnailId}"]
}'
```

`homepageThumbnailIds` specifies the active thumbnails. Their order in the list does not matter. Personalization chooses which active thumbnail each player sees.
