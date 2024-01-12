---
title: Messaging Usage Guide
description: Explains how to use Open Cloud Messaging Service API to support cross-server messaging.
---

The [Messaging Service API](../../reference/cloud/messaging-service/v1.json) is the Open Cloud equivalent of the Lua `Class.MessagingService`, which enables you to communicate across servers or client instances of your experience. The Lua API only allows you to write and update a script manually in Studio for publishing messages, but the Open Cloud API lets you send messages to live servers from external tools to automate and improve your experience operation workflows.

## Usage

There are several helpful tools that you can build by supporting cross-server communication with Messaging Service API, including:

- **Announcement Portals**: A web portal can be helpful to support sending announcements to all users across servers in your experience, such as announcing an upcoming event, an update, and the winner for a competition. On the portal, you can edit a message and click a button that calls the API to send the message out for all users or selected users.

- **Moderation System**: A moderation system can help keep your experience safe and secure. When detecting a user with inappropriate behavior, you can publish a message to trigger the experience server to warn or ban the specific user. You can also support [data stores](../../reference/cloud/datastores-api/v1.json) in the moderation system to add user accounts to a blocklist that prevents them from rejoining.

- **LiveOps Dashboard**: LiveOps Dashboard is a useful tool for managing live events, such as a Halloween party. On the LiveOps dashboard, you can pre-code an event, update event messages, trigger the event when it's ready, and reward selected users with special items like a virtual crown without updating any of the experience's code.

<Alert severity="info">
Currently, the API can only target live experience servers through HTTP.
</Alert>

## Limits

Limit | Description
--- | ---
**Rate** | Roblox throttles message requests at 50 + 5<em>n</em> per minute, where <em>n</em> is the number of players in the experience. For example, an experience with 20 players begins to throttle at 150 message requests per minute.
**Topic size** | 80 characters
**Message size** | 1,024 characters (1 KB)

## Setting up a Topic for Messaging

Before you can publish a message to all of your experience's live servers, you need to set up a **topic**, which is a customized message channel that is accessible from multiple servers. After defining a **topic**, you need to subscribe users to the **topic** for receiving your incoming messages.

Currently, you can only define a topic in Studio and use Lua `Class.MessagingService:SubscribeAsync()` to subscribe users to it. The following code sample subscribes any user to a topic when they join the experience:

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

## Publishing Messages to Live Servers

After [setting up](#setting-up-a-topic-for-messaging) a **topic**, you can publish a message to all of your experience's live servers with the following steps:

1. [Create an API key](./api-keys.md#creating-an-API-key) on [Creator Dashboard](https://create.roblox.com/credentials). Make sure you perform the following settings:

   1. Add **Messaging Service API** to **Access Permissions**.
   2. Add **Publish** operation to your selected experience.

2. Get the **Universe ID**, the identifier of the experience in which you want to send your messages to.

   1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations).
   1. Find the experience that you want to publish your messages to.
   1. Click the **&ctdot;** button on the target experience's thumbnail to display a list of options, then select **Copy Universe ID**.

      <img src="../../assets/creator-dashboard/Experience-Context-Menu-Copy-Universe-ID.png" width="420" alt="Copy Universe ID option from Creator Dashboard" />

3. Add the API Key in the `x-api-key` header of a `POST` request to the API like the following example:

   ```bash title='Example Request for Publishing a Message'
   curl \
   --location \
   --request POST \
   'https://apis.roblox.com/messaging-service/v1/universes/{universeId}/topics/{topic}' \
   -H 'x-api-key: abc...' \
   -H 'Content-Type: application/json' \
   --data-raw '{"message":"message to publish"}'
   ```

   <Alert severity="info">
   If your request succeeds, it returns an empty response body.
   </Alert>

4. Call the API to send the message out.

## Adding Messaging Service API to OAuth 2.0 Apps

You can create [OAuth 2.0 applications](../../cloud/open-cloud/oauth2-overview.md) supporting Messaging Service API to allow your users to publish messages to live servers through your OAuth 2.0 application.

<Alert severity="warning">
Third-Party app support through OAuth 2.0 is a Beta feature that might be subject to changes for future releases.
</Alert>

To use Messaging Service API for your application and request permissions from your users, perform the following settings:

1. When [registering your application](./oauth2-registration.md#registering-an-app), under **Permissions**, select the **universe-messaging-service:publish** scope.
2. When [implementing the authorization flow](../../cloud/open-cloud/oauth2-overview.md#implementing-authorization-flows), include `universe-messaging-service:publish` in the `scope` parameter of the authorization URL that redirects users back to your application, like the following example:

   ```plain
   https://www.authorize.roblox.com?client_id=816547628409595165403873012&redirect_uri=https://my-app.com/redirect&scope=openid+universe-messaging-service:publish&response_type=Code&prompts=login+consent&nonce=12345&state=6789
   ```

3. Request access to the `universeId` of the experience that the user wants to publish their messages to. Your application can send a `POST` request to the [token resources endpoint](../../reference/cloud/oauth2/tokens.md#post-v1tokenresources) with the access token, client ID and secret or the `code challenge`, depending on your [implementation of your authorization flow](../../cloud/open-cloud/oauth2-overview.md#implementing-authorization-flows), as request parameters to get a list of `universeIds` of experiences that the user granted permission to:

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
   curl --location --request POST 'https://apis.roblox.com/messaging-service/v1/universes/{universeId}/topics/{topic}' \
   --header 'Authorization: Bearer <access_token>' \
   --header 'Content-Type: application/json' \
   --data-raw '{"message":"message to publish"}'
   ```
