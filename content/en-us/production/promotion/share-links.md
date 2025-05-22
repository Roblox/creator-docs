---
title: Share links
description: How to create and use share links to promote your experiences and track acquisition metrics.
---

Share links are unique and trackable links that generate metrics that allow you to track and grow your off-platform user acquisition. You can also use custom `Class.Player:GetJoinData()|LaunchData` to provide in-experience perks to users that join through your share link.

The analytics available for share links include metrics like how many new users have arrived at the experience details page through a share link, and which off-platform channel has brought in the most engaged users. There is no limit to how many share links you can create per experience; creating different links for different channels can help you keep better track of acquisition metrics.

For more information on the analytics for share links, see the [Acquisition](../analytics/acquisition.md) page.

## Create a share link

<Alert severity="warning">
You can only create share links for experiences you own. For group-owned experiences, you must be a member of the group with the **Create and configure share links** permission, and the share link must be created from the group account.
</Alert>

To create a share link:

1. In the [Creator Dashboard](https://create.roblox.com/dashboard/creations), go to **Creations** and select the **Share Links** tab.
2. Click **Create link**.
3. Enter a unique campaign name and select the experience you want to create a share link for.
4. <Chip label="OPTIONAL" size="small" variant="outlined" /> To enable custom `Class.Player:GetJoinData()|LaunchData`, toggle on **Use custom LaunchData** and enter a `LaunchData` parameter.
5. Click **Generate link**.

The new share link generates instantly and is ready to be shared.
