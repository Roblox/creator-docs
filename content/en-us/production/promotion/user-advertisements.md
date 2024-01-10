---
title: User Advertisements
description: User Advertisements notify users of experiences they can play, items they can purchase, or groups they can join.
---

<Alert severity="warning">
User Advertisements are being deprecated. See [Ads Manager](../../production/promotion/ads-manager.md) as an alternative.
</Alert>

User advertisements allow you to notify users of experiences they can play,
items they can purchase in the [Marketplace](https://www.roblox.com/catalog), or
groups they can join. When a user clicks the ad, it opens the main page of
whatever you are advertising.

<img src="../../assets/promotion/misc/Banner-Ad-Example.png" />

## Bidding System

Advertisement space works on a bidding system where the higher you set your **Daily Budget** amount in relation to other creators' bids, the more likely your sponsored experience will display within the **Sponsored** category on the [Home](https://www.roblox.com/home) and [Discover](https://www.roblox.com/discover) pages. For example, if there are three sponsored experiences in the bidding system, advertising space is split according to how much each user has bid:

<table>
<thead>
  <tr>
    <th>User</th>
    <th>Bid Amount</th>
    <th>Result</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>A</td>
    <td>50 Robux</td>
    <td>&mdash;</td>
  </tr>
  <tr>
    <td>B</td>
    <td>100 Robux</td>
    <td>User B's sponsored experience will display **twice** as often as User A's.</td>
  </tr>
  <tr>
    <td>C</td>
    <td>300 Robux</td>
    <td>User C's sponsored experience will display **six times** as often as User A's, and **three times** as often as User B's.</td>
  </tr>
</tbody>
</table>

## Creating Ads

There are three types of image advertisements you can create:

<table>
  <tr>
    <th>Type</th>
    <th>Size</th>
    <th>Placement</th>
  </tr>
  <tr>
    <td>Placement Banner</td>
    <td>728×90 pixels</td>
    <td>Top or bottom of the Roblox website.</td>
  </tr>
  <tr>
    <td>Skyscraper</td>
    <td>160×600 pixels</td>
    <td>Left or right-side of the Roblox website.</td>
  </tr>
  <tr>
    <td>Rectangle</td>
    <td>300×250 pixels</td>
    <td>Right-side or bottom of the Roblox website.</td>
  </tr>
</table>

All advertisement images must be in either `.png` or `.tga` format, and they
must adhere to the [Community
Rules](https://en.help.roblox.com/hc/articles/203313410) and [Terms of Use](https://en.help.roblox.com/hc/articles/115004647846).

<Alert severity="info">
If you're running an ad blocker, you must temporarily disable it in
order to create an ad.
</Alert>

To create an ad:

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations).
1. Click on the thumbnail of the experience you want to associate with the user advertisement. The experience's **Overview** page displays.
1. In the left-hand navigation, under **Promotion**, click the **Advertise** link.

   <img src="../../assets/creator-dashboard/Experience-Nav-Promotion-Advertise.png" width="330" alt="Advertise button indicated for an experience on the Creator Dashboard" />

1. On the creation page, optionally click one of the three **template** buttons to view/download an ad template upon which you can design your ad.

   <img src="../../assets/promotion/misc/User-Ad-Templates.png" width="700" />

1. In the **Name your Ad** field, enter what you want to display when users
   hover over the ad.
1. In the **Upload an Ad** region, drag in the image you want to use for your ad
   or upload it through the **select an image from your computer** button.
1. Click the **Upload** button.

Your ad is now within the moderation queue and is only visible to you on the
[User Ads](https://www.roblox.com/develop?Page=ads) page. Once approved, you can [run an ad cycle](#running-ad-cycles).

## Running Ad Cycles

Ad cycles run for **24 hours**, and the ad displays to users according to the
advertising space bidding system for that time period. To run an ad cycle:

1. Navigate to the [User Ads](https://www.roblox.com/develop?Page=ads) page.
1. Click the "gear" dropdown menu to the right of the ad you want to run, then select **Run&nbsp;Ad**.
1. In the **Bid in Robux** field that appears, enter how many Robux you want to spend to run your ad.
1. Click the **Run** button. A **Make Ad Bid** dialog displays that confirms
   both the amount of Robux you want to spend, and how many impressions Roblox
   estimates you will receive with that bid.
1. Click the **Place Bid** button to confirm the ad cycle.

Once the ad cycle runs, you'll be able to track the ad's performance on the same
page. Roblox tracks the following performance metrics:

<table>
  <tr>
    <th>Metric</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>Bid</td>
    <td>The amount spent for the current ad cycle.</td>
  </tr>
  <tr>
    <td>Clicks</td>
    <td>Every time a person clicks on your ad for the current ad cycle.</td>
  </tr>
  <tr>
    <td>CTR ("Click Through Rate")</td>
    <td>Clicks divided by impressions.</td>
  </tr>
  <tr>
    <td>Impressions</td>
    <td>Estimate for the number of times the ad was served.</td>
  </tr>
  <tr>
    <td>Total Bid</td>
    <td>The amount spent for every ad cycle the ad has completed.</td>
  </tr>
  <tr>
    <td>Total Clicks</td>
    <td> The sum of all clicks for every ad cycle the ad has completed.</td>
  </tr>
  <tr>
    <td>Total CTR</td>
    <td>The sum of all clicks divided by the sum of all impressions for every ad
    cycle the ad has completed.</td>
  </tr>
</table>
