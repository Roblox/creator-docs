---
title: include
---

The **Experience Notifications** table displays detailed performance statistics for each notification with at least 100 impressions, ordered by the date of first impression for that notification.

<img src="../../assets/open-cloud/experience-notifications/Analytics-Itemized.png" width="880" />

The **Name** column is the key identifier for the notification. By default, the name matches the identifier name you specified when [creating the notification string](#create-a-notification-string), but you can override it through the `category` field in your API calls, in which case `category` overrides the name. Changing the string name in the [Creator Dashboard](https://create.roblox.com/dashboard/creations) or changing the string your message ID references in the API call will generate a new row in the table.

If you'd like to A/B test the performance of different strings, it's recommended that you create an entirely new notification string with a similar name, for example:

- **EggHatchA** &mdash; "Your gold egg has hatched! Come meet your new pet."
- **EggHatchB** &mdash; "It's hatching time! Come meet your new pet."
