---
title: Usage Guide for Assets
description: Explains how to use Open Cloud Web APIs for assets to support usage such as uploading and updating.
---

With [Assets API](../../reference/cloud/assets/v1.json) of Open Cloud, you can upload assets with a single HTTP request rather than manually importing them to Studio. This API supports uploading new assets and updating existing ones with version control, making it helpful for automating your asset management workflow.

For example, you can write a script using Assets API to upload and create a new version of your model assets on Roblox automatically whenever you save them in your modeling tool such as Blender or Maya. This way, you can quickly update custom model assets in your inventory without manually importing them every time you make a change.

## Supported Asset Types and Limits

Different from the [Asset Manager](../../projects/assets/manager.md) in Studio, in which you can import assets without specifying types, you must specify your asset's **Asset Type** and the generic **Content Type** when sending an Assets API call. For each call, you can only create or update one asset with the file size up to 20 MB.

Currently, Assets API supports the following types of assets:

<table>
  <thead>
      <tr>
        <th>Asset Type</th>
        <th>Format</th>
        <th>Content Type</th>
        <th>Restrictions</th>
      </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="../../sound/assets.md">Audio</a></td>
      <td>
        <ul>
          <li>`.mp3`</li>
          <li>`.ogg`</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>`audio/mpeg`</li>
          <li>`audio/ogg`</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Up to 7 minutes of duration.</li>
          <li>Up to 100 uploads per month if you're ID-verified.</li>
          <li>Up to 10 total uploads per month if you aren't ID-verified.</li>
          <li>Not available for the updating.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><a href="../../parts/textures-decals.md">Decal</a></td>
      <td>
        <ul>
          <li>`.png`</li>
          <li>`.jpeg`</li>
          <li>`.bmp`</li>
          <li>`.tga`</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>`image/png`</li>
          <li>`image/jpeg`</li>
          <li>`image/bmp`</li>
          <li>`image/tga`</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Not available for updating.</li>
          <li>Must be smaller than 8000x8000 pixels.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><a href="../../parts/models.md">Model</a></td>
      <td>
        <ul>
          <li>`.fbx`</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>`model/fbx`</li>
        </ul>
      </td>
      <td></td>
    </tr>
  </tbody>
</table>

## Uploading an Asset

For both creating a new asset and updating an existing asset to a new version using Assets API, you need to [Create an API key](./api-keys.md#creating-api-keys) on [Creator Dashboard](https://create.roblox.com/credentials). If you want to use the API key to manage your individually-owned assets, create the API key under your account. If you want to use the API key to manage group-owned assets, create the API key under the target group. For more information on group-owned API keys, see [Group-Owned API Key Permissions](./api-keys.md#group-owned-api-key-permissions).

Once you create an API key, you can't switch its ownership between individuals or groups. If you create an API key under your own account, you can't use it for managing group assets.

<Alert severity="warning">
To create an API key for a group or create a group asset, you must have the corresponding permissions. For more information on granting group permissions, see [Group Roles and Permissions](../../projects/groups.md#roles-and-permissions).
</Alert>

Regardless of whether you are creating the API key for yourself or your group, make sure to add the following permissions:

1. Add **Assets API** to **Access Permissions**.
1. Add both **Read** and **Write** operation permissions to your selected experience.

### Creating an New Asset

To upload a new asset:

1. Copy the API key to the `x-api-key` request header of the [Create Asset](../../reference/cloud/assets/v1.json#POST-v1-assets) method.
1. In your request:

   1. Specify the target [asset type](#supported-asset-types-and-limits).
   1. Add your asset name and description.
   1. Add the creator information.
      - If you want to create the asset **on your own behalf**, add your user ID. You can find your user ID on the URL of your Roblox profile. For example, for `https://www.roblox.com/users/1234567/profile`, your user ID is `1234567`.
      - If you want to create the asset **as a group asset**, add the group ID of your group. You can find the group ID on the URL of your group's page. For example, for `https://www.roblox.com/groups/7654321/example-group#!/`, the group ID is `7654321`.
   1. Add the file path and content type of your asset.

   ```bash title ="Example Request for Create Asset"
   curl --location 'https://apis.roblox.com/assets/v1/assets' \
   --header 'x-api-key: ${ApiKey}' \
   --form 'request="{
     \"assetType\": \"Model\",
     \"displayName\": \"Name\",
     \"description\": \"This is a description\",
     \"creationContext\": {
       \"creator\": {
         \"userId\": \"${userId}\" # Use groupId for creating a group asset
       }
     }
   }"' \
   --form 'fileContent=@"/filepath/model.fbx";type=model/fbx'

   ```

### Updating an Existing Asset

To update an existing asset to a new version:

<Alert severity="warning">
Currently, you can only update models. Audio and decals don't have version control and can't be updated.
</Alert>

1. Copy the API key to the `x-api-key` request header of the [Update Asset](../../reference/cloud/assets/v1.json#PATCH-v1-assets-_asset_) method.
1. Add the asset ID in your request. To copy your asset ID:
   1. Navigate to the [Creation](https://create.roblox.com/creations) page of **Creator Dashboard**.
   1. Select the **DEVELOPMENT ITEMS** category.
   1. Select the category of your asset and find the target asset.
   1. Hover over the thumbnail of the target asset and click the **&ctdot;** button to display a list of options, then select **Copy Asset ID** from the list.
      <img src="../../assets/open-cloud/copy-asset-id.png" width="50%" />
1. Add the file path and content type of your asset in your request.

```bash title ="Example Request for Update Asset"
curl --location --request PATCH 'https://apis.roblox.com/assets/v1/assets/{assetId}' \
--header 'x-api-key: ${ApiKey}' \
--form 'request="{
  \"assetId\": ${assetId},
}"' \
--form 'fileContent=@"/filepath/model.fbx";type=model/fbx'

```

### Checking an Uploaded Asset

If your request for creating a new asset or updating an existing asset succeeds, it returns an **Operation ID** in the format of `{ "path": "operations/${operationId}" }`. You can use it to check the status and result of your upload with the following steps:

1. Copy the API key to the `x-api-key` request header of the [Get Operation](../../reference/cloud/assets/v1.json#GET-v1-operations-_operationId_) method and send the request, like the following code sample:

   ```bash title ="Example Request for Get Operation"
   curl --location 'https://apis.roblox.com/assets/v1/operations/{operationId}' \
   --header 'x-api-key: {$ApiKey}'

   ```

2. If your request succeeds, it returns an `Operation` object, either including a `response` representing the uploaded asset information or a `status` explaining why the asset upload fails as the following code sample shows:

   ```json title ="Example Response for Get Operation"
   {
     "path": "operations/{operationId}",
     "done": true,
     "response": {
       "@type": "type.googleapis.com/roblox.open_cloud.assets.v1.Asset",
       "path": "assets/2205400862",
       "revisionId": "1",
       "revisionCreateTime": "2023-03-02T22:27:04.062164400Z",
       "assetId": "2205400862",
       "displayName": "Name",
       "description": "This is a description",
       "assetType": "ASSET_TYPE_DECAL",
       "creationContext": {
         "creator": {
           "userId": "11112938575"
         }
       },
       "moderationResult": {
         "moderationState": "MODERATION_STATE_APPROVED"
       }
     }
   }
   ```

3. (Optional) Check the created asset on your Roblox account.
   1. Navigate to the **Inventory** page of your [Roblox account](https://www.roblox.com/home).
   2. Select the **Category** of the asset that you want to check.
   3. Find the target asset and click its thumbnail to view the asset.

## Adding Assets API to OAuth 2.0 Apps

You can create [OAuth 2.0 applications](../../cloud/open-cloud/oauth2-overview.md) supporting Assets API to allow your users to upload and update assets to Roblox.

<Alert severity="warning">
Third-Party app support through OAuth 2.0 is a Beta feature that might be subject to changes for future releases.
</Alert>

To use Assets API for your application and request permissions from your users, perform the following settings:

1. When [registering your application](./oauth2-registration.md#registering-an-app), under **Permissions**, select **asset:read** and **asset:write** scopes.

1. When [implementing the authorization flow](../../cloud/open-cloud/oauth2-overview.md#implementing-authorization-flows), include `asset:read` and `asset:write` as the scope parameters of the authorization URL that redirects users back to your application, like the following example:

   ```plain
   https://www.authorize.roblox.com?client_id=819547628404595165403873012&redirect_uri=https://my-app.com/redirect&scope=asset:read+asset:write&response_type=Code&prompts=login+consent&nonce=12345&state=6789
   ```

1. When sending the request, include the access token in the authorization header and the form data of the asset content to create or update in the request URI in. The following example shows a sample request for uploading a new asset:

   ```bash title="Example Request"
   curl --location --request POST 'https://apis.roblox.com/assets/v1/assets' \

   --header 'Authorization: Bearer <access_token>' \

   --header 'Content-Type: application/json' \

   --form 'request="{

     \"assetType\": \"Decal\",

     \"displayName\": \"DecalDemo123\",

     \"description\": \"This is a description\",

     \"creationContext\": {

       \"creator\": {

       \"userId\": \"<user_id>\"

       }
     }

   }"' \

   --form 'fileContent=@"/filepath/p1.png"'

   ```
