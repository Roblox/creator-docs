---
title: Share links
description: How to create and use share links to promote your games and avatar items and track acquisition metrics.
---

Share links are unique and trackable links that generate metrics that allow you to track and grow your off-platform user acquisition. You can create share links for your games (experience links) and for your avatar items and bundles (Marketplace links). For experience links, you can also use custom `Class.Player:GetJoinData()|LaunchData` to provide in-game perks to users that join through your share link.

The analytics available for experience links include metrics like how many new users have arrived at the game details page through a share link, and which off-platform channel has brought in the most engaged users. There is no limit to how many experience links you can create per game.

The analytics available for Marketplace links include metrics like how many users have clicked your link and how many purchases were made through it. You can have up to 20 active Marketplace links per item.

For both link types, creating different links for different channels can help you keep better track of acquisition metrics.

For more information on the analytics for experience links, see the [Acquisition](../analytics/acquisition.md) page.

## Create an experience link

<Alert severity="warning">
You can only create share links for games you own. For group-owned games, you must be a member of the group with the **Manage share links** permission, and the share link must be created from the group account.
</Alert>

To create an experience link:

1. In the [Creator Dashboard](https://create.roblox.com/dashboard/creations), go to **Creations**, select the **Share Links** tab, then select **Experience Links**.
2. Click **Create link**.
3. Enter a unique campaign name and select the game you want to create a share link for.
4. <Chip label="OPTIONAL" size="small" variant="outlined" /> To enable custom `Class.Player:GetJoinData()|LaunchData`, toggle on **Use custom LaunchData** and enter a `LaunchData` parameter.
5. Click **Generate link**.

The new share link generates instantly and is ready to be shared.

## Create a Marketplace link

You can only create Marketplace links for avatar items and bundles you or your group published. Both paid and free items are supported. For group-owned items, you must be a member of the group with the **Configure avatar items** permission, and the share link must be created from the group account.

To create a Marketplace link from the Share Links tab:

1. In the [Creator Dashboard](https://create.roblox.com/dashboard/creations), go to **Creations**, select the **Share Links** tab, then select **Marketplace Links**.
2. Click **Create link**.
3. Select the item you want to create a share link for, or enter its asset ID or bundle ID.
4. Click **Generate link**.

You can also create a Marketplace link from your avatar item list. Open an item's menu and select the option to create a share link. The link creation dialog opens with that item already selected.

The new share link generates instantly and is ready to be shared. Marketplace links don't expire. You can delete a link at any time from the **Marketplace Links** list. Deleted links still open your item, but they no longer record clicks or purchases.

### Where Marketplace links take users

- On desktop, the link opens your item's page on the Roblox website.
- On mobile with the Roblox app installed, the link opens your item directly in the app.
- On mobile without the app, the link prompts users to install Roblox and then opens your item.

If your item changes after you share the link:

- **Off-sale or sold out**: the link still opens the item page in its current off-sale state. When the item is back on sale, users can purchase through the link again.
- **Moderated or deleted**: the link opens the Marketplace.

### Marketplace link analytics

Each Marketplace link has an analytics view in the Creator Dashboard that includes:

- **Clicks**: the total number of times the link was opened.
- **Unique clickers**: the number of different users who opened the link.
- **Purchases**: the number of purchases made through the link.
- **Spend**: the total Robux spent on those purchases.
- **Conversion rate**: purchases divided by unique clickers.

Only authenticated users are tracked. You can view up to 90 days of daily data and filter by link. Analytics update once a day, so a new link might take about a day to show results.
