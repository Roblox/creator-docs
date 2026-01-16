---
title: Messaging usage guide
description: Explains how to use Open Cloud Messaging Service API to support cross-server messaging.
---

The [Messaging Service API](/cloud/reference/Universe#Cloud_PublishUniverseMessage) is the Open Cloud equivalent of the Engine `Class.MessagingService`, which lets you communicate across your experience's servers and clients. The Engine API only allows you to write and update scripts manually in Studio for publishing messages, but the Open Cloud API lets you send messages to live servers from external tools to automate and improve your operations workflows.

## Usage

There are several helpful tools that you can build by supporting cross-server communication with the Messaging Service API, including:

- **Announcement Portals**: A web portal can be helpful to support sending announcements to all users across servers in your experience, such as announcing an upcoming event, an update, and the winner for a competition. On the portal, you can edit a message and click a button that calls the API to send the message out for all users or selected users.

- **Moderation System**: A moderation system can help keep your experience safe and secure. When detecting a user with inappropriate behavior, you can publish a message to trigger the experience server to warn or ban the specific user. You can also use [data stores](/cloud/reference/DataStore) in the moderation system to add user accounts to a blocklist that prevents them from rejoining.

- **LiveOps Dashboard**: LiveOps dashboards are useful tools for managing live events, such as a Halloween party. On the dashboard, you can pre-code an event, update event messages, trigger the event when it's ready, and reward selected users with special items like a virtual crown without updating any of the experience's code.

<Alert severity="info">
Currently, the API can only target live experience servers through HTTP.
</Alert>

## Limits

| Limit            | Description                                                                                                                                                                          |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Rate**         | Roblox throttles message requests at `50 + (5 * number_of_players_in_experience)`. For example, an experience with 20 players begins to throttle at 150 message requests per minute. |
| **Topic size**   | 80 characters                                                                                                                                                                        |
| **Message size** | 1,024 characters (1 KiB)                                                                                                                                                              |

## Set up a topic for messaging

Before you can publish a message to your experience's live servers, you must set up a **topic**, which is a customized message channel that is accessible from multiple servers. After defining a topic, you subscribe users to the topic in order to receive your incoming messages.

Currently, you can only define a topic in Studio and use the Luau API `Class.MessagingService:SubscribeAsync()` to subscribe users to it. The following code sample subscribes any user to a topic when they join the experience:

```lua title= 'Set up and Subscribe Users to a Topic'
local MessagingService = game:GetService("MessagingService")
local Players = game:GetService("Players")

local function onPlayerAdded(player)
	-- Define and subscribe to the topic
	local topic = "YourTopic"
	local connection = MessagingService:SubscribeAsync(topic, function(message)
		print(message.Data)
	end)

	player.AncestryChanged:Connect(function()
		-- Unsubscribe from the topic upon player ancestry change
		connection:Disconnect()
	end)
end

Players.PlayerAdded:Connect(onPlayerAdded)
```

## Publish messages to live servers

After [setting up](#set-up-a-topic-for-messaging) a topic, publish a message to your experience's live servers:

1. [Create an API key](../auth/api-keys.md#create-api-keys) on [Creator Dashboard](https://create.roblox.com/dashboard/credentials?activeTab=ApiKeysTab) and copy it somewhere safe. Make sure you perform the following settings:

   1. Add **messaging-service** to **Access Permissions**.
   2. Select an experience, and add the **universe-messaging-service:publish** operation.

2. Get the **Universe ID** for your experience:

   1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations).
   1. Find the experience that you want to publish your messages to.
   1. Hover over an experience's thumbnail, click the **&ctdot;** button, and select **Copy Universe ID**.

      <img src="../../assets/creator-dashboard/Options-Button-Experience-Public.png" width="200" />

3. Add the API key and universe to a `POST` request, as in this example:

   ```bash title="Example Request for Publishing a Message"
   curl -L -X POST 'https://apis.roblox.com/cloud/v2/universes/{universe}:publishMessage' \
   -H 'x-api-key: {api-key}' \
   -H 'Content-Type: application/json' \
   --data '{
    "topic": "your-topic",
    "message": "Hello, everyone!"
   }'
   ```

4. Send the HTTP request to publish the message.

   <Alert severity="info">
   If your request succeeds, it returns HTTP 200 with an empty response body.
   </Alert>

## Add the Messaging Service API to OAuth 2.0 apps

You can create [OAuth 2.0 applications](../../cloud/auth/oauth2-overview.md) that allow your users to publish messages to their own live servers.

<Alert severity="warning">
Third-party app support through OAuth 2.0 is a beta feature that might be subject to changes for future releases.
</Alert>

To use Messaging Service API for your application and request permissions from your users, perform the following settings:

1. When [registering your application](../auth/oauth2-registration.md#register-your-app), under **Permissions**, select the **universe-messaging-service:publish** scope.
2. When [implementing the authorization flow](../../cloud/auth/oauth2-overview.md), include `universe-messaging-service:publish` in the `scope` parameter of the authorization URL that redirects users back to your application, like the following example:

   ```plain
   https://authorize.roblox.com?client_id=816547628409595165403873012&redirect_uri=https://my-app.com/redirect&scope=openid+universe-messaging-service:publish&response_type=Code&prompts=login+consent&nonce=12345&state=6789
   ```

3. Request access to the `universeId` of the experience that the user wants to publish their messages to. Your application can send a `POST` request to the [token resources endpoint](../auth/oauth2-reference.md#token-exchange) with the access token, client ID and secret or the `code challenge`, depending on your [implementation of your authorization flow](../../cloud/auth/oauth2-overview.md#implementing-authorization-flows), as request parameters to get a list of `universeIds` of experiences that the user granted permission to:

   ```bash title="Example Request"
   curl --location --request POST 'https://apis.roblox.com/oauth/v1/token/resources' \
   --header 'Content-Type: application/x-www-form-urlencoded' \
   --data-urlencode 'token=<access_token>' \
   --data-urlencode 'client_id=<client_id>' \
   --data-urlencode 'client_secret=<client_secret>'
   ```

   This endpoint returns a list of `universeIds` like the following example response:

   ```json title="Example Response"
   {
     "resource_infos": [
       {
         "owner": {
           "id": "1516563360",
           "type": "User"
         },
         "resources": {
           "universe": {
             "ids": ["3828411582"]
           }
         }
       }
     ]
   }
   ```

4. Your application can now send messages to any experience that a user has granted permission. When sending the request, include the access token in the authorization header and the `universeId` and topic in the request URI in the following format:

   ```bash title="Example Request"
   curl --location --request POST 'https://apis.roblox.com/cloud/v2/universes/{universe}:publishMessage' \
   --header 'Authorization: Bearer <access_token>' \
   --header 'Content-Type: application/json' \
   --data-raw '{"topic": "some-topic","message":"message to publish"}'
   ```

## Use with HTTPService

This API is one of the [Open Cloud endpoints supported](../../cloud-services/http-service.md#supported-open-cloud-endpoints) by `Class.HttpService`. You can use it to publish messages across different experiences from within an experience.
