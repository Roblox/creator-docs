---
title: Usage guide for assets
description: Explains how to use Open Cloud Web APIs for assets to support usage such as uploading and updating.
---

The [Assets API](../../reference/cloud/assets/v1.json) of Open Cloud allows you to upload and update assets with a single HTTP request rather than manually importing them to Studio. This API supports:

- Uploading new assets.
- Updating existing assets with version control.
- Updating asset metadata, including descriptions, display names, icons, and previews.
- Managing asset versions, such as rolling back to a specified previous version.
- Checking existing information of an asset, including metadata, versions, and any in-process updating operations.

<Alert severity="info">
This API contains beta endpoints that might be subject to changes for future releases.
</Alert>

## Supported asset types and limits

For endpoints that don't create a new asset or update the content of existing assets, there are no restrictions and limits. However, the asset content uploading functionality powered by the **Create Asset** and **Update Asset** endpoints only supports limited types of assets with restrictions. For each call, you can only create or update one asset with the file size up to 20 MB with the following limits:

<Alert severity="info">
Updating asset metadata using the **Update Asset** endpoint is not subject to the following limits.
</Alert>

<table>
  <thead>
      <tr>
        <th>Asset type</th>
        <th>Format</th>
        <th>Content type</th>
        <th>Restrictions</th>
      </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="../../animation/index.md">Animation</a></td>
      <td>
        <ul>
          <li>`.rbxm`</li>
          <li>`.rbxmx`</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>`model/x-rbxm`</li>
          <li>`model/x-rbxm`</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>`.rbxm` or `.rbxmx` files edited outside of [Roblox Studio](../../studio/setup.md) might not upload or function.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><a href="../../audio/assets.md">Audio</a></td>
      <td>
        <ul>
          <li>`.mp3`</li>
          <li>`.ogg`</li>
          <li>`.wav`</li>
          <li>`.flac`</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>`audio/mpeg`</li>
          <li>`audio/ogg`</li>
          <li>`audio/wav`</li>
          <li>`audio/flac`</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Up to 7 minutes of duration.</li>
          <li>Up to 100 uploads per month if you're ID-verified.</li>
          <li>Up to 10 total uploads per month if you aren't ID-verified.</li>
          <li>Not available for updating.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><a href="../../parts/textures-decals.md">Decal, Image</a></td>
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
          <li>Must be smaller than 8000x8000 pixels.</li>
          <li>Not available for updating.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><a href="../../parts/meshes.md">Mesh</a></td>
      <td>
        <ul>
          Roblox only
        </ul>
      </td>
      <td>
        <ul>
          <li>`model/x-file-mesh-data`</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Only content downloaded from [Asset delivery API](../api/asset-delivery.md) is accepted. If you are not trying to download and re-upload meshes, then use [3D Importer](../../art/modeling/3d-importer.md) to import meshes instead.</li>
          <li>Not available for updating.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><a href="../../parts/models.md">Model</a></td>
      <td>
        <ul>
          <li>`.fbx`</li>
          <li>`.gltf`</li>
          <li>`.glb`</li>
          <li>`.rbxm`</li>
          <li>`.rbxmx`</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>`model/fbx`</li>
          <li>`model/gltf+json`</li>
          <li>`model/gltf-binary`</li>
          <li>`model/x-rbxm`</li>
          <li>`model/x-rbxm`</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Imports custom 3D models as a `Class.Model` container containing one or more `Class.MeshPart` objects.</li>
          <ul>
            <li>Depending on your use-case, consider uploading custom 3D models manually using the [3D Importer](../../art/modeling/3d-importer.md).</li>
          <li>The 3D Importer provides a 3D preview, various error-checking, and many customizable import settings.</li>
          </ul>
          <li>`.rbxm` or `.rbxmx` files edited outside of [Roblox Studio](../../studio/setup.md) might not upload or function.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><a href="../../ui/video-frames.md">Video</a></td>
      <td>
        <ul>
          <li>`.mp4`</li>
          <li>`.mov`</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>`video/mp4`</li>
          <li>`video/mov`</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Up to 5 minutes of duration.</li>
          <li>Up to 4096x2160 resolution.</li>
          <li>Up to 3.75 GB.</li>
          <li>Up to 20 uploads per day if you're 13+ and ID-verified.</li>
        </ul>
      </td>
    </tr>

  </tbody>
</table>

## Security permissions

The API supports both first-party use with [API key authorization](../auth/api-keys.md) and third-party use in [OAuth 2 applications](../auth/oauth2-overview.md). Each way requires different security permission settings.

### API keys

To use the API in your own scripts or tools, you need to [create an API key](../auth/api-keys.md#create-api-keys) for authorization and security.

<Alert severity="warning">
To create an API key for managing group assets, you must have the corresponding permissions. For more information on granting group permissions, see [Group roles and permissions](../../projects/groups.md#roles-and-permissions).
</Alert>

When creating an API key, make sure to add the following permissions:

1. Add **assets** to **Access Permissions**.
1. Add **Read** and **Write** operation permissions to your selected experience, depending on the required scopes of the endpoints you plan to call.

Once you have the API key, copy it to the `x-api-key` request header. All endpoints require the `x-api-key` request header.

```bash title ="Example API Request Header"
--header 'x-api-key: ${ApiKey}' \
```

### OAuth 2.0 apps

To use the API for a third-party OAuth 2.0 application, add the `asset:read` and `asset:write` permission scopes when [registering your app](../auth/oauth2-registration.md#add-permissions). Choose these scopes based on the requirements of the endpoints you plan to use.

## Create a new asset

To upload a new asset by an HTTP request:

1. Copy the API key to the `x-api-key` request header of the [Create Asset](../../reference/cloud/assets/v1.json#POST-v1-assets) endpoint.
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

## Update an existing asset

<Alert severity="info">
Asset updating is powered by beta endpoints that might be subject to changes for future releases.
</Alert>

To update an existing asset by an HTTP request:

1. Copy the API key to the `x-api-key` request header of the [Update Asset](../../reference/cloud/assets/v1.json#PATCH-v1-assets-_asset_) endpoint.
1. Add the asset type and asset ID in your request. To copy your asset ID:
   1. Navigate to the [Creation](https://create.roblox.com/dashboard/creations) page of the **Creator Dashboard**.
   1. Select the **Development Items** category.
   1. Select the category of your asset and find the target asset.
   1. Hover over the thumbnail of the target asset and click the **&ctdot;** button to display a list of options, then select **Copy Asset ID** from the list.

<Tabs>
<TabItem label="Asset Content">

<Alert severity="warning">
Currently, you can only update the asset content for `.fbx` files. The update creates a new version.
</Alert>

```bash title ="Example Request for Updating Asset Content"
curl --location --request PATCH 'https://apis.roblox.com/assets/v1/assets/{assetId}' \
--header 'x-api-key: {apiKey}' \
--form 'request={
    \"assetType\": \"{assetType}\",
    \"assetId\": \"{assetId}\",
    \"creationContext\": {
        \"creator\": {
            \"userId\": {userId}
        },
        \"expectedPrice\":{expectedPrice}
    },
}' \
--form 'fileContent=@"{file-path}"'

```

</TabItem>
<TabItem label="Metadata">

```bash title ="Example Request for Updating Asset Metadata"
curl --location --request PATCH 'https://apis.roblox.com/assets/v1/assets/{assetId}?updateMask=description%2CdisplayName' \
--header 'x-api-key;' \
--form 'request={
    \"assetType\": \"{assetType}\",
    \"assetId\": \"{assetId}\",
    \"displayName\": \"{new display name}\",
    \"description\": \"{new description}\"
}'

```

</TabItem>
<TabItem label="Content and Metadata">

```bash title ="Example Request for Updating Both Asset Content and Metadata"
curl --location --request PATCH 'https://apis.roblox.com/assets/v1/assets/{assetId}?updateMask=description%2CdisplayName' \
--header 'x-api-key: {apiKey}' \
--form 'request={
    \"assetType\": \"{assetType}\",
    \"assetId\": \"{assetId}\",
    \"displayName\": \"{new display name}\",
    \"description\": \"{new description}\",
    \"creationContext\": {
        \"creator\": {
            \"userId\": {userId}
        },
        \"expectedPrice\":{expectedPrice}
    },
}' \
--form 'fileContent=@\"{file-path}\"'

```

</TabItem>
</Tabs>

## Retrieve asset operation status

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

## Add assets API to OAuth 2.0 apps

You can create [OAuth 2.0 applications](../../cloud/auth/oauth2-overview.md) supporting Assets API to allow your users to upload and update assets to Roblox.

<Alert severity="warning">
Third-Party app support through OAuth 2.0 is a Beta feature that might be subject to changes for future releases.
</Alert>

To use Assets API for your application and request permissions from your users, perform the following settings:

1. When [registering your application](../auth/oauth2-registration.md#register-your-app), under **Permissions**, select **asset:read** and **asset:write** scopes.

1. When [implementing the authorization flow](../../cloud/auth/oauth2-overview.md#implement-authorization-flows), include `asset:read` and `asset:write` as the scope parameters of the authorization URL that redirects users back to your application, like the following example:

   ```plain
   https://authorize.roblox.com?client_id=819547628404595165403873012&redirect_uri=https://my-app.com/redirect&scope=asset:read+asset:write&response_type=Code&prompts=login+consent&nonce=12345&state=6789
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
