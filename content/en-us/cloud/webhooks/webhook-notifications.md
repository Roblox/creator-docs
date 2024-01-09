---
title: Webhook Notifications
description: Explains how to set up webhooks to automate your notification management workflow.
---

Instead of manually monitoring all events in your experience and requests from users, you can set up webhooks to receive real-time notifications on a third-party messaging tool or your custom endpoint that can receive HTTP requests. This helps you automate your notification management workflow to reduce manual effort handling notifications.

<Alert severity="info">
Currently, Roblox fully supports webhook notifications for Discord, Guilded, and Slack for the event of user requesting to erase their ["Right to be forgotten"](https://gdpr.eu/right-to-be-forgotten/) data. Using webhooks with other third-party tools carries the risk of not receiving all notifications.
</Alert>

## Webhook Workflow

A webhook is a mechanism for sending real-time notifications or data between two different applications or services over the internet, such as Roblox and a third-party messaging tool. Webhooks are useful for automating workflows between Roblox and third-party applications that you use for collaborating with your team, as they allow for real-time data sharing and processing

Once you set up a webhook, whenever a target event occurs, Roblox sends a request to the webhook URL that you configured. Currently, the only supported event is when a user submits a request to erase their ["Right to be forgotten"](https://gdpr.eu/right-to-be-forgotten/) data.

The webhook URL then redirects the request to your receiving application or custom endpoint, which can take action based on the data included in the webhook payload, such as erasing the data, sending a confirmation to the user, or triggering another event.

Unlike traditional APIs, which require you to set up a client application to send requests to a server to receive data, webhooks initiate the sending of data to a client application as soon as an event occurs, allowing the Roblox server to send data without the need for a request. This results in faster data transfer and processing times, making webhooks ideal for real-time or high-volume data processing scenarios.

## Configuring Webhooks on Creator Dashboard

To receive notifications through webhooks, you need to configure a webhook that subscribes to certain events for triggering notifications. For group-owned experiences, only group owners can configure and receive webhook notifications.

<Alert severity="info">
If you're setting up webhooks and handling personal data, ensure they comply with the [General Data Protection Regulation (GDPR)](https://gdpr-info.eu/).
</Alert>

To set up a webhook:

1. Navigate to the [Webhooks](https://create.roblox.com/settings/webhooks) section of the [Creator Dashboard](https://create.roblox.com/settings/webhooks).
1. Click the **Add Webhook** button.
1. Complete the configuration fields:
   1. **Webhook URL** — Specify the URL where you want to receive notifications and accept incoming webhook URLs from third-party entities. For more information on the requirements, see [Setting up Webhook URLs](#setting-up-webhook-urls).
   2. **Name** — Use a custom name to differentiate your configuration from others. By default the value is the same as the Webhook URL.
   3. **Secret** (optional) — Supply a secret if you want to verify that notifications you receive are coming from Roblox. For more information, see [Verifying Webhook Security](#verifying-webhook-security).
   4. **Triggers** — Choose one or more options from the list of supported triggers of events for which you want to receive notifications. Currently, the only supported event is **Right To Erasure Request** that occurs when a user submits a request to erase their ["Right to be forgotten"](https://gdpr.eu/right-to-be-forgotten/) data.
1. Click the **Save Changes** button.

<Alert severity="info">
 Currently, you can configure up to 5 webhooks in total.
</Alert>

## Setting up Webhook URLs

You can set up a custom HTTP service endpoint as your webhook URL with the following requirements:

- It must be publicly accessible for handling requests.
- It can handle POST requests.
- It can respond to the request with a 2XX response within 5 seconds.
- It can handle HTTPS requests.

When your endpoint receives a POST request, it must be able to:

- Extract the details required about the notification from the body of the POST message.
- Read the body of the POST message with the generic details on the notification and specific details related to the event type on the notification.

For more information of the schema of POST requests to handle, see the [Payload Schema](#payload-schema).

### Delivery Failure Retry Policy

When a webhook notification fails to reach your specified URL due to errors such as endpoint unavailability, Roblox retries sending the message to the configured URL 5 times using a fixed window size. If the notification still fails to be delivered after 5 attempts, Roblox stops trying to send the notification and assumes that the URL is no longer valid. In this situation, you need to update your webhook configuration with a new URL that is reachable and able to receive notifications. To troubleshoot and validate your webhook URL can successfully receive notifications, see [Testing Webhooks](#testing-webhooks).

### Third-Party Requirements

Third-party tools usually have their own requirements for webhooks that you need to follow when setting up your webhook URL. You can find these requirements by searching for the keyword "webhook" on the support or documentation site of the target tool.

For the three verified tools, you can find this information by searching in the following sources:

- [Discord Help Center](https://support.discord.com/hc/en-us)
- [Guilded Support](https://support.guilded.gg/hc/en-us)
- [Slack API Reference](https://api.slack.com/)

## Testing Webhooks

You can test whether the webhook you've configured can successfully receive notifications on the [Creator Dashboard](https://create.roblox.com/dashboard/creations):

1. Navigate to the [Webhooks](https://create.roblox.com/dashboard/settings/webhooks) configuration page.
2. Select the webhook you want to test from the list of configured webhooks.
3. Click the pencil icon next to the target webhook.

   <img src="../../assets/creator-dashboard/Configure-Webhook.png" width="780" alt="The pencil icon next to an example webhook" />

4. Click the **TEST RESPONSE** button.

The system then sends a notification in the `SampleNotification` type, which includes the **User ID** of the user who triggers the notification, as the following example schema shows:

```json title="SampleNotification Schema"
Body: {
  "NotificationId": "string",
  "EventType": "SampleNotification",
  "EventTime": "2023-12-30T16:24:24.2118874Z", // Type: ISO 8601 Timestamp
  "EventPayload": {
    "UserId": 1 // Type: Long
  }
}
```

If you are integrating your webhook with a third-party service, you can test it using the third-party URL to confirm that the service can successfully receive notifications from your webhook. If you provide a secret when configuring the webhook, it also generates a `roblox-signature` that you can use to test the `roblox-signature` logic.

## Verifying Webhook Security

Once you configure your server to receive payloads, it starts to listen for any payload sent to the endpoint. If you set a secret when configuring your webhook, Roblox sends a `roblox-signature` along with every webhook notification to help protect your data security. This way, you can use the it to verify that the notification is from Roblox and limit your server to only receive requests originating from Roblox. The signature is in the payload header for custom endpoints and in the footer for third-party servers.

```csv title='Signature Format with Secret for Custom Endpoints'

"roblox-signature": "t=<timestamp>,v1=<signature>"

```

If you don't have a secret for your webhook, the signature you receive only contains the timestamp value on when the notification is sent:

```csv title='Signature Format without Secret for Custom Endpoints'

"roblox-signature": "t=<timestamp>"

```

To verify a signature:

<Tabs>
<TabItem label="Custom Endpoints">

1. Extract the timestamp and signature values. All signatures for webhooks with secrets share the same format as a CSV string with these two values following by the prefixes:

   - `t`: The timestamp value on when the notification is sent.
   - `v1`: The signature value generated using the secret provided by the Creator Dashboard configuration.
     You can extract these two values using the `split()` function, which separates the string based on a delimiter, in this case, the `,` character.

1. Re-create the base string of `roblox-signature` by concatenating:

   1. The timestamp as a string.
   1. The period character `.`.
   1. The JSON string of the request body.

1. Compute a Hash-based message authentication code (HMAC) with the SHA256 hash function using the secret you defined during the configuration as the key and the base string you generated through step 2 as the message. Convert the result to Base64 format to get the expected signature.
1. Compare the extracted signature value to the expected signature. If you generated the signature correctly, the value should be the same.

1. (Optional) To prevent replay attacks, a type of cyber attack where attackers intercept and resend data to gain unauthorized access or perform malicious actions, it's helpful to compare the extracted timestamp value with the current timestamp and ensure it falls within a reasonable time limit. For example, a 10-minute window is usually a good reasonable time limit.

</TabItem>

<TabItem label="Third-Party Servers">

1. Extract the timestamp value from the `Timestamp` footer of the notification.

1. Extract the message body from the notification. For the following example notification, the message body is:

   <figcaption>
   You have received a new notification for Right to Erasure for the User Id: XXXXXXXX in the game(s) with Ids: YYYYYYY, ZZZZZZZZZ
	 </figcaption>

   <img src="../../assets/misc/Webhooks-Example-Message-Body.png" width="50%" alt="Example message body on Guilded"/>

1. Concatenate the timestamp value and the message with a period character in the format as:

   <figcaption>
   168487229.You have received a new notification for Right to Erasure for the User Id: XXXXXXXX in the game(s) with Ids: YYYYYYY, ZZZZZZZZZ
	 </figcaption>

1. Compute a Hash-based message authentication code (HMAC) with the SHA256 hash function using the secret you defined during the configuration as the key and the base string you generated through step 2 as the message. Convert the result to Base64 format to get the expected signature.

1. Compare the extracted signature value to the expected signature. If you generated the signature correctly, the value should be the same.

1. **(Optional)** To prevent replay attacks, a type of cyber attack where attackers intercept and resend data to gain unauthorized access or perform malicious actions, it's helpful to compare the extracted timestamp value with the current timestamp and ensure it falls within a reasonable time limit. For example, a 10-minute window is usually a good reasonable time limit.

</TabItem>
</Tabs>

## Payload Schema

When the target event of your webhook is triggered, it sends a request to your webhook URL, including information about the event in the payload. All payloads of requests share the same schema that consists of fixed and variable fields. This ensures that the data transmitted in the payload is structured and consistent, making it easier for the receiving application to process and use the data.

The **fixed payload schema fields** can help maintain consistency across all webhook requests, with the following fields available:

1. `NotificationId`, `string`: A unique identifier for each notification sent. If the same `NotificationId` is received twice, it is considered a duplicate.
2. `EventType`, `string`: A string represents the type of event for which the notification was triggered.
3. `EventTime`, `timestamp`: An approximate timestamp indicating when the event was triggered.

The **variable payload schema fields** provides flexibility for webhooks to accommodate various types of events, which include:

1. `EventPayload`, `object`: Contains information specific to the `EventType` that triggered the webhook. The structure of the `EventPayload` schema varies based on the type of event.

The following example shows the payload schema of the **Right To Erasure Request** event:

```json title='Example Schema for Right to Erasure Request'

Body:{

   "NotificationId": "string",

   "EventType": "RightToErasureRequest",

   "EventTime": "2023-12-30T16:24:24.2118874Z",

   "EventPayload": {

      "UserId": 1, // Type: Long

      "GameIds": [ // Type: An array of Longs

         1234, 2345

      ]

   }

}
```

## Handling Data Deletion

If you store any **Personally Identifiable Information (PII)** of your users, such as their User IDs, you must delete this information when a user submits such a request to comply with the GDPR [right to erasure](https://gdpr-info.eu/art-17-gdpr/) compliance requirements.

If you use a Guilded or Discord server for receiving webhook notifications and use data stores for storing PII data of your users, you can create a bot to handle webhook notifications and help automate data deletion. [Automating Right to Erasure Requests Deletion](../../cloud/webhooks/automate-right-to-erasure.md) provides an example on how to create a bot within Guilded or Discord that uses the [Open Cloud API for data stores](../../cloud/open-cloud/usage-data-stores.md) to delete PII data as an automation solution.

If you use a custom endpoint as your webhook server instead of a third-party tool, you can extract the data subject to deletion from the webhook payload and build your own automation solution. The following code sample provides an example solution and adds prevention to replay attacks by verifying that the request is coming from Roblox:

```php title='Extracting PII from Payload'
const crypto = require('crypto')
const express = require('express');
let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// This is a sample only code
app.all('/*', function (req, res) {
   console.log('-------- New Request Seen -------');
   // 1. Extract the timestamp and signature
   const shared_secret = '<Your secret>' // This can be set as an environment variable
   const hmac = crypto.createHmac('sha256', shared_secret)
   const roblox_signature_header = req.headers['roblox-signature'].split(',')
   // 'roblox-signature' is present in all requests:
   // Timestamp(t) is present in all requests, however signature value(v1) is not set unless a secret is shared during the webhook configuration.
   // Fetch header component at Index 0 -> 't=' and Index 1 -> 'v1='
   const timestamp = roblox_signature_header.find(e => e.startsWith('t=')).substring(2);
   const extracted_signature = roblox_signature_header.find(e => e.startsWith('v1='));
   // 2. Prevent Replay attack: 300 seconds window
   const request_timestamp_ms = timestamp * 1000;
   const window_time_ms = 300 * 1000
   const oldest_timestamp_allowed = Date.now() - window_time_ms;
   if (request_timestamp_ms < oldest_timestamp_allowed) {
      res.status(403).send('Expired Request')
   }
   // 3. Validate Signature
   if (extracted_signature !== undefined) {
      const signature_v1 = extracted_signature.substring(3);
      const message = `${timestamp}.${JSON.stringify(req.body)}`
      const base64_signature = hmac.update(message).digest('base64')
      if (signature_v1 !== base64_signature) {
         res.status(401).send('Unauthorized Request')
      }
   }
   // 4. Your logic to handle payload
   const payloadBody = req.body
   const eventType = payloadBody['EventType']
   if (eventType === 'RightToErasureRequest'){
      const userId = payloadBody['EventPayload']['UserId']
      const gameIds = payloadBody['EventPayload']['GameIds']
      const gameIdString = gameIds.toString()
      console.log(`The payload: UserId=${userId} and GameIds=${gameIdString}`)
      // If you store PII in data stores, use the UserId and GameIds to make a data store call to delete the information.
   }
   // 5. Return Response
   res.json({ message: 'Processed the message Successfully' });
})
app.listen(8080, function () {
   console.log('This is a Sample application')
})
```
