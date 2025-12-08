---
title: Webhook notifications
description: Explains how to set up webhooks to automate your notification management workflow.
---

Instead of manually monitoring all events in your experience and requests from users, you can set up webhooks to receive real-time notifications on a third-party messaging tool or your custom endpoint that can receive HTTP requests. This helps you automate your notification management workflow to reduce manual effort handling notifications.

<Alert severity="info">
Currently, Roblox fully supports webhook notifications for Discord, Guilded, and Slack. Using webhooks with other third-party tools carries the risk of not receiving all notifications.
</Alert>

## Webhook workflow

Webhooks send real-time notifications or data between two different applications or services, such as Roblox and a third-party messaging tool. Unlike traditional APIs, which require you to set up a client application to send requests to a server to receive data, webhooks send data to your client endpoint as soon as an event occurs. They're useful for automating workflows between Roblox and third-party applications that you use for collaborating with your team, as they allow for real-time data sharing and processing.

Once you set up a webhook, whenever a target event occurs, Roblox sends a request to the webhook URL you provide. The webhook URL then redirects the request to your receiving application or custom endpoint, which can take action based on the data included in the webhook payload. This could include erasing data for GDPR, sending a confirmation to the user, or triggering another event.

## Supported triggers

Roblox currently supports the following event triggers.

### Subscription

- **Subscription Resubscribed** - When a user resubscribes to a subscription, a message is sent containing the subscription and subscriber.
- **Subscription Renewed** - When a user renews a subscription, a message is sent containing the subscription and subscriber.
- **Subscription Refunded** - When a user receives a refund for their subscription, a message is sent containing the subscription and subscriber.
- **Subscription Purchased** - When a user purchases a subscription, a message is sent containing the subscription and subscriber.
- **Subscription Cancelled** - When a user cancels a [subscription](../../production/monetization/subscriptions.md), a message is sent containing the subscription and subscriber, as well as the reason given for the cancellation.

For more information on subscription events and their fields, see the [Subscription](/cloud/reference/Subscription/) reference.

### Compliance

- **Right to Erasure Request** - When a user submits a data deletion request under the [General Data Protection Regulation](https://gdpr.eu/right-to-be-forgotten/) (GDPR).

### Commerce

- **Commerce Product Order Refunded** - When a user has received a refund for their commerce product order, or the order was cancelled.
- **Commerce Product Order Paid** - When a user has paid for their commerce product order. Please note that duplicate webhook events are possible, so you should deduplicate events using the unique commerce order ID.

## Configure webhooks on Creator Dashboard

To receive notifications through webhooks, you need to configure a webhook that subscribes to certain events for triggering notifications. For group-owned experiences, only group owners can configure and receive webhook notifications.

<Alert severity="info">
If you're setting up webhooks and handling personal data, ensure they comply with the [General Data Protection Regulation (GDPR)](https://gdpr-info.eu/).
</Alert>

To set up a webhook:

1. On the [Creator Dashboard](https://create.roblox.com/dashboard/creations), access the [Webhooks](https://create.roblox.com/settings/webhooks) page.
1. Click the **Add Webhook** button.
1. Complete the configuration fields:
   1. **Webhook URL** - Specify the URL where you want to receive notifications. For more information on the requirements, see [Set up webhook URLs](#set-up-webhook-urls).
   2. **Name** - Use a custom name to differentiate your configuration from others. By default the value is the same as the Webhook URL.
   3. **Secret** (optional) - Supply a secret if you want to verify that notifications you receive are coming from Roblox. For more information, see [Verify webhook security](#verify-webhook-security).
   4. **Triggers** - Choose one or more options from the list of [supported triggers](#supported-triggers) of events for which you want to receive notifications.
1. Click the **Save Changes** button.

<Alert severity="info">
 Currently, you can configure up to 5 webhooks in total.
</Alert>

## Set up webhook URLs

You can set up a custom HTTP service endpoint as your webhook URL, provided it fulfills the following requirements:

- It must be publicly accessible for handling requests.
- It can handle POST requests.
- It can respond to the request with a 2XX response within 5 seconds.
- It can handle HTTPS requests.

When your endpoint receives a POST request, it must be able to:

- Extract the details required about the notification from the body of the POST message.
- Read the body of the POST message with the generic details on the notification and specific details related to the event type on the notification.

For more information of the schema of POST requests to handle, see the [Payload Schema](#payload-schema).

### Delivery failure retry policy

When a webhook notification fails to reach your specified URL due to errors such as endpoint unavailability, Roblox retries sending the message to the configured URL 5 times using a fixed window size. If the notification still fails to be delivered after 5 attempts, Roblox stops trying to send the notification and assumes that the URL is no longer valid. In this situation, you need to update your webhook configuration with a new URL that is reachable and able to receive notifications. To troubleshoot and confirm that your webhook URL can successfully receive notifications, see [Test webhooks](#test-webhooks).

### Third-party requirements

Third-party tools usually have their own requirements for webhooks that you need to follow when setting up your webhook URL. You can find these requirements by searching for the keyword "webhook" on the support or documentation site of the target tool. For the three supported third-party tools, see the following:

- [Discord Help Center](https://support.discord.com/hc/en-us)
- [Guilded Support](https://support.guilded.gg/hc/en-us)
- [Slack API Reference](https://api.slack.com/)

## Test webhooks

You can test whether the webhook you've configured can successfully receive notifications on the [Creator Dashboard](https://create.roblox.com/dashboard/creations):

1. Navigate to the [Webhooks](https://create.roblox.com/settings/webhooks) configuration page.
2. Select the webhook you want to test from the list of configured webhooks.
3. Click the pencil icon next to the target webhook.
4. Click the **Test Response** button.

The system then sends a `SampleNotification` event, which includes the **User ID** of the user who triggered the notification, as shown here:

```json title="SampleNotification schema"
{
  "NotificationId": "string",
  "EventType": "SampleNotification",
  "EventTime": "2023-12-30T16:24:24.2118874Z",
  "EventPayload": {
    "UserId": 1
  }
}
```

If you are integrating your webhook with a third-party service, you can test it using the third-party URL to confirm that the service can successfully receive notifications from your webhook. If you provide a secret when configuring the webhook, it also generates a `roblox-signature` that you can use to test the `roblox-signature` logic.

## Verify webhook security

After you configure your server to receive payloads, it starts to listen for any payload sent to the endpoint. If you set a secret when configuring your webhook, Roblox sends a `roblox-signature` in each webhook notification to ensure that the request actually came from Roblox. The signature is in the payload header for custom endpoints and in the footer for third-party servers.

```csv title="Signature format with a secret for custom endpoints"
t=<timestamp>,v1=<signature>
```

If you did not set a secret for your webhook, the signature only contains the timestamp of when the notification was sent:

```csv title="Signature format without a secret for custom endpoints"
t=<timestamp>
```

To verify a signature:

<Tabs>
<TabItem label="Custom endpoints">

1. Extract the timestamp and signature values. All signatures for webhooks with secrets share the same format as a CSV string with these two values following by the prefixes:

   - `t`: The timestamp of when the notification was sent.
   - `v1`: The signature value generated using the secret provided by the Creator Dashboard configuration.

1. Re-create the base string of `roblox-signature` by concatenating:

   1. The timestamp as a string.
   1. The period character `.`.
   1. The JSON string of the request body.

1. Compute a hash-based message authentication code (HMAC) with the SHA256 hash function using the secret you defined during the configuration as the key and the base string you generated through step 2 as the message. Convert the result to Base64 format to get the expected signature.
1. Compare the extracted signature value to the expected signature. If you generated the signature correctly, the value should be the same.

1. (Optional) To prevent replay attacks, a type of cyber attack where attackers intercept and resend data to gain unauthorized access or perform malicious actions, it's helpful to compare the extracted timestamp value with the current timestamp and ensure it falls within a reasonable time limit. For example, a 10-minute window is usually a good reasonable time limit.

</TabItem>

<TabItem label="Third-party servers">

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

## Payload schema

When the target event of your webhook is triggered, it sends a request to your webhook URL, including information about the event in the payload. All payloads of requests share the same schema that consists of fixed and variable fields. This ensures that the data transmitted in the payload is structured and consistent, making it easier for the receiving application to process and use the data.

The **fixed payload schema fields** can help maintain consistency across all webhook requests, with the following fields available:

1. `NotificationId` (string): A unique identifier for each notification sent. If the same `NotificationId` is received twice, it is considered a duplicate.
2. `EventType` (string): Indicates the type of event for which the notification was triggered.
3. `EventTime` (string): The timestamp of when the event was triggered.

The **variable payload schema fields** provides flexibility for webhooks to accommodate various types of events, which include:

1. `EventPayload` (object): Contains information specific to the `EventType` that triggered the webhook. The structure of the `EventPayload` schema varies based on the type of event.

The following example shows the payload schema of the **Right To Erasure request** event:

```json title="Example schema for a Right to Erasure request"
{
   "NotificationId": "string",
   "EventType": "RightToErasureRequest",
   "EventTime": "2023-12-30T16:24:24.2118874Z",
   "EventPayload": {
      "UserId": 1,
      "GameIds": [
         1234, 2345
      ]
   }
}
```

## Handle notifications

If you store any **Personally Identifiable Information (PII)** of your users, such as their User IDs, you must delete this information when a user submits such a request to comply with the GDPR [right to erasure](https://gdpr-info.eu/art-17-gdpr/) compliance requirements. You can create a bot to handle webhook notifications and help automate data deletion, provided you're storing PII in a data store. See [Automating Right to Erasure Requests Deletion](../../cloud/webhooks/automate-right-to-erasure.md) for an example on how to create a bot within Guilded or Discord that uses the [Open Cloud API for data stores](../../cloud/guides/data-stores/index.md) to delete PII data as an automation solution. This example can be adapted for handling other notifications, such as subscription events.

If you use a custom endpoint as your webhook server instead of a third-party tool, you can extract the data subject to deletion from the webhook payload and build your own automation solution. The following code sample is an example of a server that has prevention against replay attacks by verifying the timestamp and that the request is coming from Roblox:

```javascript title="Extracting PII from Payload"
const crypto = require('crypto');
const express = require('express');

const secret = '<your_secret>' // This can be set as an environment variable

let app = express();
app.use(express.json());

app.all('/*', function (req, res) {
   console.log('New request recieved');

   // Extract the timestamp and signature from header
   const signatureHeader = req.headers['roblox-signature'].split(',');
   const timestamp = signatureHeader.find(e => e.startsWith('t=')).substring(2);
   const signature = signatureHeader.find(e => e.startsWith('v1=')).substring(3);

   // Ensure the request came within a 300 second window to prevent replay attacks
   const requestTimestampMs = timestamp * 1000;
   const windowTimeMs = 300 * 1000;
   const oldestTimestampAllowed = Date.now() - windowTimeMs;

   if (requestTimestampMs < oldestTimestampAllowed) {
      return res.status(403).send('Expired Request');
   }

   // Validate signature
   const message = `${timestamp}.${JSON.stringify(req.body)}`;
   const hmac = crypto.createHmac('sha256', secret);
   const calculatedSignature = hmac.update(message).digest('base64');

   if (signature !== calculatedSignature) {
      return res.status(401).send('Unauthorized Request');
   }

   // Your logic to handle payload
   const payloadBody = req.body;
   const eventType = payloadBody['EventType'];

   if (eventType === 'RightToErasureRequest'){
      const userId = payloadBody['EventPayload']['UserId'];
      const gameIds = payloadBody['EventPayload']['GameIds'];

      console.log(`Payload data: UserId=${userId} and GameIds=${gameIds}`);
      // If you store PII in data stores, use the UserId and GameIds to delete the information from data stores.
   }

   return res.json({ message: 'Processed the message successfully' });
});

app.listen(8080, function () {
   console.log('Server started');
});
```
