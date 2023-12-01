---
title: Automating Right to Erasure Requests
description: Explains how to automate Right to Erasure requests with webhooks and Open Cloud APIs for data stores.
---

The **General Data Protection Regulation (GDPR)** is a European regulation on data protection and privacy. It grants individuals the right to request the deletion of their personal data, known as the [right to erasure](https://gdpr-info.eu/art-17-gdpr/). If you store any **Personally Identifiable Information (PII)** of your users, such as their User IDs, you must comply with GDPR requirements by deleting this information upon receiving a user's request.

Instead of handling requests manually, you can [set up a webhook](../../cloud/webhooks/webhook-notifications.md) and use a bot within a third-party messaging application to automate the process. As [data stores](../../cloud-services/datastores.md) being the most common way for storing PII data, this tutorial provides an example on how to create a bot within Guilded or Discord that uses the [Open Cloud API for data stores](../../cloud/open-cloud/usage-data-stores.md) to delete PII data as an automation solution.

## Workflow

Upon completing this tutorial, you should be able to create a locally-running custom program that automates the handling of right to erasure requests from users. The workflow for this process is as follows:

1. Roblox Support receives a right to erasure request from a user.
1. Roblox webhook is triggered, containing the User ID and a list of Start Place IDs for the experiences they have joined in the payload.
1. Your bot listens for these webhook notifications, verifies their authenticity, and utilizes the [Open Cloud API for data stores](../../cloud/open-cloud/usage-data-stores.md) to delete the PII data stored in data stores.
   <Alert severity="warning">
   To use this solution, make sure your data store keys are identifiable by User IDs, such as containing User IDs as substrings, or you need to modify the scripts to match your own data schema.
   </Alert>
1. The bot responds to the webhook message in Discord or Guilded with the deletion status.

<img src="../../assets/misc/Webhooks-Bot-Workflow.png" width="100%" />

## Configuring a Webhook with Third-Party Integration

Before creating a bot, set up a server with webhook integration on the third-party messaging application. Then use the server to configure a webhook on Creator Dashboard.

### Setting Up a Server

The following steps show how to set up the server using Guilded or Discord.

<Tabs>
<TabItem label="Guilded">
1. Create a new Guilded server. If you are unfamiliar with the process, see [Guilded Support](https://support.guilded.gg/hc/en-us/articles/1500002751582-Create-a-Server).
1. Under the **Privacy** settings, set the server to private. The server automatically creates a private **#general** channel as your default channel.
1. Create a webhook integration with the new server and give it a name that you can easily understand, such as `GDPR Hook`. If you are unfamiliar with the process, see [Guilded Support](https://support.guilded.gg/hc/en-us/articles/360038927934-Incoming-Webhooks).
1. Copy the webhook URL and store it in a secure place. Only allow trusted team members to access it, as leaking the URL can enable bad actors to send fake messages and potentially delete your user data.
</TabItem>
<TabItem label="Discord">
1. Create a new Discord server. If you are unfamiliar with the process, see [Discord Support](https://support.discord.com/hc/en-us/articles/204849977-How-do-I-create-a-server-).
    <Alert severity="info">
    It's recommended to set your server as a private server to protect user security. See [Discord Support](https://support.discord.com/hc/en-us/articles/206143407-How-do-I-set-up-a-private-server-) if you are unfamiliar with the process.
    </Alert>

1. The server automatically creates a **#general** channel as your default channel. Click the **Edit Channel** icon of the **#general** channel.
1. Under **Permissions**, set the channel to private.
1. Create a webhook integration with the new server, name it to `GDPR Hook`. If you are unfamiliar with the process, see [Discord Support](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks).
1. Copy the webhook URL and store it in a secure place. Only allow trusted team members to access it, as leaking the URL can enable bad actors to send fake messages and potentially delete your user data.

</TabItem>
</Tabs>

### Configuring a Webhook on Roblox

After obtaining the third-party server URL, use it to [configure a webhook](../../cloud/webhooks/webhook-notifications.md#configuring-webhooks-on-creator-dashboard) on Creator Dashboard. make sure you perform the following settings:

<Alert severity="info">
Currently, only group owners can receive Right to Erasure requests for group-owned experiences. To implement the automation solution for a group-owned experience, make sure that the group owner configures the webhook.
</Alert>

- Add the Guilded or Discord server URL as the **Webhook URL**.
- Include a custom **Secret**. Though a secret is optional for completing the configuration, you should include one to prevent bad actors from impersonating Roblox and deleting your data. For more information on the usage of a secret, see [Verifying Webhook Security](../../cloud/webhooks/webhook-notifications.md#verifying-webhook-security).
- Select **Right to Erasure Request** under **Triggers**.

You can test the webhook using the **Test Response** button to see if you receive a notification in your server's **#general** channel from Roblox. If you don't receive the notification, try again or check your server settings to troubleshoot the error.

<img src="../../assets/misc/Webhooks-Sample-Notification.png" width="50%" alt="Example notification on Guilded"/>

## Configuring a Bot

After you add the webhook, use it to configure the bot with the following steps:

<Tabs>
<TabItem label="Guilded">

1. Open the **All servers** list by clicking its icon or use the shortcut:

   - <kbd>Control</kbd> + <kbd>S</kbd> on Windows.
   - <kbd>Command ⌘</kbd> + <kbd>S</kbd> on Mac.

1. Select your server for receiving right to erasure notifications.
1. Expand the list under **Server home** and select **Manage Bots**.
1. The server automatically creates a private **#general** channel as your default channel.
1. Click the **Create a bot** button and add a bot name. Guilded redirects you to the bot configuration page.
1. Select the **API** section on the bot configuration page.
1. Under the **Tokens** section, click the **Generate Token** button.
1. Save and store the generated token in a safe place.

</TabItem>

<TabItem label="Discord">
1. Navigate to the [Applications page](https://discord.com/developers/applications).
1. Create a new application and name it to `GDPR Bot`.
1. The system redirects you to the **General Information** settings of the bot. Copy and save its application ID in a secure place.
1. Under the settings menu, select **OAuth2**.
1. Under the **Default Authorization Link** section, expand the **Authorization Method** dropdown and select **In-app Authorization**.
1. Add the **bot** scope and the **Administrator** permission. Save your changes.
1. Under the **OAuth2** settings, select the **URL Generator** subcategory.
1. Select the **bot** scope and the **Administrator** permission.
1. Copy the generated URL. Leave the application settings page unclosed.
1. Navigate to the generated URL. Select the target server. Click the **Continue** button and then the **Authorize** button.
1. Navigate back to application settings page of your bot. Under the settings menu, select **bot**.
1. Under the **Privileged Gateway Intents** section, enable **Message Content Intent**.
1. Under the **Build-A-Bot** section, save the bot token in a secure place for later steps. If you don't see the token, click the **Reset Token** button to generate a new one.

</TabItem>
</Tabs>

## Creating an Open Cloud API Key

To allow your third-party bot to access your data stores for storing PII data of users, [create an Open Cloud API key](https://create.roblox.com/docs/reference/cloud/managing-api-keys) that can access your experiences and add the **Delete Entry** permission of data stores for data deletion. If you use ordered data stores for storing PII, you also need to add the **Write** permission of ordered data stores. After completion, copy and save the API key in a secure location to use it in later steps.

## Obtaining Identifiers of Experiences and Places

For the bot to locate the PII data requested by users for deletion, obtain the following identifiers of all experiences that you intend to use the bot for:

- The **Universe ID**, the unique identifier of your experience.
- The **Start Place ID**, the unique identifier of the start place of an experience.

To obtain these identifiers, open the [Creations](https://create.roblox.com/dashboard/creations?activeTab=Place) page on **Creator Dashboard**. Then select an experience and copy the **Universe&nbsp;ID** and **Start&nbsp;Place&nbsp;ID**.

<img src="../../assets/creator-dashboard/Experience-Menu-Copy-Universe-ID-Start-Place-ID.png" width="420" alt="Interface showing Universe ID and Start Place ID in experience context menu" />

## Adding Scripts

After you finish setting up the webhook, bot, and API key for data stores, add them to the scripts that implement the bot's automation logic. The following example uses Python 3:

1.  Install Python libraries using the following commands:

    ```bash title="Install Libraries"
    pip3 install discord
    pip3 install guilded.py==1.8.0
    pip3 install requests
    pip3 install urllib3==1.26.6
    ```

1.  Copy and save the following scripts corresponding to different parts of the bot logic in the same directory:

    ```python title="bot_config.py"
    DISCORD_BOT_TOKEN = ""
    GUILDED_BOT_TOKEN = ""
    OPEN_CLOUD_API_KEY = ""
    ROBLOX_WEBHOOK_SECRET = ""

    # Dictionary of the Start place ID to
    # (universe ID, list of (data stores name, scope, and entry key)) for
    # Standard Data Stores
    # User data stored under these entries will be deleted

    STANDARD_DATA_STORE_ENTRIES = {
        # Start Place ID
        111111111: (
            # Universe ID
            222222222,
            [
                ("StandardDataStore1", "Scope1", "Key1_{user_id}"),
                ("StandardDataStore1", "Scope1", "Key2_{user_id}"),
                ("StandardDataStore2", "Scope1", "Key3_{user_id}")
            ]
        ),
        33333333: (
            444444444,
            [
                ("StandardDataStore3", "Scope1", "Key1_{user_id}")
            ]
        )
    }

    # Dictionary of the Start place ID to
    # (universe ID, list of (data stores name, scope, and entry key)) for
    # Ordered Data Stores
    # User data stored under these entries will be deleted

    ORDERED_DATA_STORE_ENTRIES = {
        111111111: (
            222222222,
            [
                ("OrderedDataStore1", "Scope2", "Key4_{user_id}")
            ]
        )
    }

    ```

    ```python title="data_stores_api.py"
    import requests
    import bot_config
    from collections import defaultdict

    """
    Calls Data Stores Open Cloud API to delete all entries for a user_id configured in
    STANDARD_DATA_STORE_ENTRIES. Returns a list of successful deletions and failures to delete.
    """
    def delete_standard_data_stores(user_id, start_place_ids):
        successes = defaultdict(list)
        failures = defaultdict(list)
        for owned_start_place_id in bot_config.STANDARD_DATA_STORE_ENTRIES:
            if owned_start_place_id not in start_place_ids:
                continue
            universe_id, universe_entries = bot_config.STANDARD_DATA_STORE_ENTRIES[owned_start_place_id]
            for (data_store_name, scope, entry_key) in universe_entries:
                entry_key = entry_key.replace("{user_id}", user_id)
                response = requests.delete(
                    f"https://apis.roblox.com/datastores/v1/universes/{universe_id}/standard-datastores/datastore/entries/entry",
                    headers={"x-api-key": bot_config.OPEN_CLOUD_API_KEY},
                    params={
                        "datastoreName": data_store_name,
                        "scope": scope,
                        "entryKey": entry_key
                    }
                )
                if response.status_code in [200, 204]:
                    successes[owned_start_place_id].append((data_store_name, scope, entry_key))
                else:
                    failures[owned_start_place_id].append((data_store_name, scope, entry_key))
        return successes, failures

    """
    Calls Ordered Data Stores Open Cloud API to delete all entries for a user_id configured in
    ORDERED_DATA_STORE_ENTRIES. Returns a list of successful deletions and failures to delete.
    """
    def delete_ordered_data_stores(user_id, start_place_ids):
        successes = defaultdict(list)
        failures = defaultdict(list)
        for owned_start_place_id in bot_config.ORDERED_DATA_STORE_ENTRIES:
            if owned_start_place_id not in start_place_ids:
                continue
            universe_id, universe_entries = bot_config.ORDERED_DATA_STORE_ENTRIES[owned_start_place_id]
            for (data_store_name, scope, entry_key) in universe_entries:
                entry_key = entry_key.replace("{user_id}", user_id)
                response = requests.delete(
                    f"https://apis.roblox.com/ordered-data-stores/v1/universes/{universe_id}/orderedDatastores/{data_store_name}/scopes/{scope}/entries/{entry_key}",
                    headers={"x-api-key": bot_config.OPEN_CLOUD_API_KEY}
                )
                if response.status_code in [200, 204, 404]:
                    successes[owned_start_place_id].append((data_store_name, scope, entry_key))
                else:
                    failures[owned_start_place_id].append((data_store_name, scope, entry_key))
        return successes, failures

    ```

    ```python title="message_parser.py"
    import time
    import hmac
    import hashlib
    import re
    import base64

    import bot_config

    """
    Parses received message for Roblox signature and timestamp, the footer is only set if you
    configured webhook secret
    """
    def parse_footer(message):
        if not message.embeds[0].footer or \
            not message.embeds[0].footer.text:
            return "", 0
        footer_match = re.match(
            r"Roblox-Signature: (.*), Timestamp: (.*)",
            message.embeds[0].footer.text
        )
        if not footer_match:
            return "", 0
        else:
            signature = footer_match.group(1)
            timestamp = int(footer_match.group(2))
            return signature, timestamp

    """
    Verifies Roblox signature with configured secret to check for validity
    """
    def validate_signature(message, signature, timestamp):
        if not message or not signature or not timestamp:
            return False

        # Prevents replay attack within 300 seconds window
        request_timestamp_ms = timestamp * 1000
        window_time_ms = 300 * 1000
        oldest_timestamp_allowed = round(time.time() * 1000) - window_time_ms
        if request_timestamp_ms < oldest_timestamp_allowed:
            return False

        # Validates signature
        timestamp_message = "{}.{}".format(timestamp, message.embeds[0].description)
        digest = hmac.new(
            bot_config.ROBLOX_WEBHOOK_SECRET.encode(),
            msg=timestamp_message.encode(),
            digestmod=hashlib.sha256
        ).digest()
        validated_signature = base64.b64encode(digest).decode()
        if signature != validated_signature:
            return False

        # Valid signature
        return True

    """
    Parses a received webhook messaged on Discord or Guilded. Extracts user ID, prevents replay attack
    based on timestamp received, and verifies Roblox signature with configured secret to check for
    validity.
    """
    def parse_message(message):
        # Parses received message for user ID and game ID
        if len(message.embeds) != 1 or \
            not message.embeds[0].description:
            return "", []
        description_match = re.match(
            r"You have received a new notification for Right to Erasure for the User Id: (.*) in " +
            r"the game\(s\) with Ids: (.*)",
            message.embeds[0].description
        )
        if not description_match:
            return "", []
        user_id = description_match.group(1)
        start_place_ids = set(int(item.strip()) for item in description_match.group(2).split(","))

        signature, timestamp = parse_footer(message)
        if validate_signature(message, signature, timestamp):
            return user_id, start_place_ids
        else:
            return "", []
    ```

    <Tabs>
    <TabItem label="Guilded">

    ```python title="guilded_bot.py"
    import guilded
    import json

    import bot_config
    import data_stores_api
    import message_parser

    def run():
        client = guilded.Client()

        @client.event
        async def on_ready():
            print(f"{client.user} is listening to Right to Erasure messages")

        """
        Handler for webhook messages from Roblox
        """
        @client.event
        async def on_message(message):
            # Parses and validates message
            user_id, start_place_ids = message_parser.parse_message(message)
            if not user_id or not start_place_ids:
                return

            # Deletes standard data stores user data
            [successes, failures] = data_stores_api.delete_standard_data_stores(user_id, start_place_ids)
            if successes:
                await message.reply(f"Deleted standard data stores data for " +
                                   f"user ID: {user_id}, data: {dict(successes)}")
            if failures:
                await message.reply(f"Failed to delete standard data stores data for " +
                                   f"user ID: {user_id}, data: {dict(failures)}")

            # Deletes ordered data stores user data
            [successes, failures] = data_stores_api.delete_ordered_data_stores(user_id, start_place_ids)
            if successes:
                await message.reply(f"Deleted ordered data stores data for " +
                                   f"user ID: {user_id}, data: {dict(successes)}")
            if failures:
                await message.reply(f"Failed to delete ordered data stores data for " +
                                   f"user ID: {user_id}, data: {dict(failures)}")

        client.run(bot_config.GUILDED_BOT_TOKEN)

    if __name__ == "__main__":
        run()
    ```

    </TabItem>
    <TabItem label="Discord">

    ```python title="discord_bot.py"
    import discord

    import bot_config
    import data_stores_api
    import message_parser

    def run():
        intents = discord.Intents.default()
        intents.message_content = True
        client = discord.Client(intents=intents)

        @client.event
        async def on_ready():
            print(f"{client.user} is listening to Right to Erasure messages")

        """
        Handler for webhook messages from Roblox
        """
        @client.event
        async def on_message(message):
            # Parses and validates message
            user_id, start_place_ids = message_parser.parse_message(message)
            if not user_id or not start_place_ids:
                return

            # Deletes standard data stores user data
            [successes, failures] = data_stores_api.delete_standard_data_stores(user_id, start_place_ids)
            if successes:
                await message.reply(f"Deleted standard data stores data for " +
                                   f"user ID: {user_id}, data: {dict(successes)}")
            if failures:
                await message.reply(f"Failed to delete standard data stores data for " +
                                   f"user ID: {user_id}, data: {dict(failures)}")

            # Deletes ordered data stores user data
            [successes, failures] = data_stores_api.delete_ordered_data_stores(user_id, start_place_ids)
            if successes:
                await message.reply(f"Deleted ordered data stores data for " +
                                   f"user ID: {user_id}, data: {dict(successes)}")
            if failures:
                await message.reply(f"Failed to delete ordered data stores data for " +
                                   f"user ID: {user_id}, data: {dict(failures)}")

        client.run(bot_config.DISCORD_BOT_TOKEN)

    if __name__ == "__main__":
        run()
    ```

    </TabItem>
    </Tabs>

1.  On the **bot_config.py** file for main configuration of the bot:

    1. Set `DISCORD_BOT_TOKEN` or `GUILDED_BOT_TOKEN` to the token generated by your bot.
    2. Set `OPEN_CLOUD_API_KEY` as the API key you created.
    3. Set `ROBLOX_WEBHOOK_SECRET` as the secret you set when configuring the webhook on Creator Dashboard.
    4. In `STANDARD_DATA_STORE_ENTRIES` and `ORDERED_DATA_STORE_ENTRIES` dictionaries for locating the data store of each record to delete:
       1. Add your copied Start Place IDs as keys.
       1. Add Universe IDs as the first element of the tuple value.
       1. Replace the second element of the tuple with the name, scope, entry key name, and associated User ID of your data stores. If you use a different data schema, modify to match your own data schema accordingly.

1.  Execute the following command to run the bot:
    <Tabs>
    <TabItem label="Guilded">

    ```bash title="Run Guilded Bot"
    python3 guilded_bot.py
    ```

    </TabItem>
    <TabItem label="Discord">

    ```bash title="Run Discord Bot"
    python3 discord_bot.py
    ```

    </TabItem>
    </Tabs>

1.  The bot then starts to listen and verify Roblox webhooks for right to erasure Requests and calls the Open Cloud endpoint for deleting the corresponding data store.

<Alert severity="warning">
To ensure constant and secure execution of the scripts, save and run them locally only. Keep your local device or virtual machine running the scripts turned on at all times. In the event that your device goes offline, you need to manually manage any missed messages during the offline period and handle delivery failures according to the [retry policy](../../cloud/webhooks/webhook-notifications.md#delivery-failure-retry-policy).
</Alert>

## Testing

You can create and run a test message to verify that your custom program can properly handle right to erasure requests and delete PII data:

1. Send an HTTP `POST` request to your Guilded or Discord webhook server with the following request body:

   ```bash title="Example Request"
   curl -X POST {serverUrl}
   -H 'Content-Type: application/json'
   -d '{
      "embeds":[{
         "title":"RightToErasureRequest",
         "description":"You have received a new notification for Right to Erasure for the User Id: {userIds} in the game(s) with Ids: {gameIds}",
         "footer":{
            "icon_url":"https://create.roblox.com/dashboard/assets/webhooks/roblox_logo_metal.png",
            "text":"Roblox-Signature: {robloxSignature}, Timestamp: {timestamp}"
         }
      }]
   }'
   ```

2. If you have a webhook secret:
   1. Generate a `Roblox-Signature` by applying HMAC-SHA256 encoding to your webhook secret key.
   2. Set the current time using UTC timestamp in seconds as `Timestamp`.
3. Put together the `description` in the following format:

   ```plain title="Description Field Format"
   {Timestamp}. You have received a new notification for Right to Erasure for the User Id: {userId} in the game(s) with Ids: {gameIds}`.
   ```

   For example:

   ```plain title="Example Description Field"
   1683927229. You have received a new notification for Right to Erasure for the User Id: 2425654247 in the game(s) with Ids: 10539205763, 13260950955
   ```

Your program should be able to identify that your message is from the official Roblox source since you encoded the message with your secret. It should then delete the PII data associated with your request.

```json title="Example Body"
{
  "embeds": [
    {
      "title": "RightToErasureRequest",
      "description": "You have received a new notification for Right to Erasure for the User Id: 2425654247 in the game(s) with Ids: 10539205763, 13260950955",
      "footer": {
        "icon_url": "https://create.roblox.com/dashboard/assets/webhooks/roblox_logo_metal.png",
        "text": "Roblox-Signature: UIe6GJ78MHCmU/zUKBYP3LV0lAqwWRFR6UEfPt1xBFw=, Timestamp: 1683927229"
      }
    }
  ]
}
```
