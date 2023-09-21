---
title: Ads Manager
description: The Ads Manager is where advertisers can manage ad campaigns, ads reporting, and ads billings and payments in one place.
---

<Alert severity="warning">
   This feature is in beta.
</Alert>

**Ads Manager** offers advertisers valuable control over their [Immersive Ads](../../production/monetization/immersive-ads.md) campaigns, empowering them to create, optimize, and measure ads effectively while reaching their campaign objectives. Advertisers can use this tool to manage their ad campaigns, ads reporting, and ads billings in one place.

## Creating an Ad Account

To access the Ads Manager, you need an ad account. Ad account creation has the following prerequisites:

- A Roblox account registered for users 18 years or older. The age limitation ensures legal compliance for advertiser partnerships.
- A verified email address on file. The verified email enables correspondence about your account.

To create an ad account:

1. Visit [ads.roblox.com](https://ads.roblox.com) while signed in to the age verified account and select the **CREATE AD ACCOUNT** button.
2. Choose between a **Personal** or **Business** ad account. A personal account is for individuals who wish to advertise on Roblox, while a business account manages a company's ad presence on Roblox.
3. Check the box to confirm the provided information and click the **CREATE AD ACCOUNT** button. You'll receive a welcome letter at your verified email address confirming your account creation.

   <img src="../../assets/promotion/ads-manager/Create-Ad-Account.png" width="780" />

## Adding a Payment Method

Before you can create and manage ads on Roblox, you first need to provide a payment method. To add a payment method to your ad account:

1. Navigate to **Payment Settings** in the Ads Manager.

   <img src="../../assets/promotion/ads-manager/Menu-Payment-Settings.png" width="258" />

2. At the right of the screen, click the **ADD CARD** button.
3. Enter a credit or debit card to place on file for billing purposes.
4. Once completed, click the **SAVE AND AUTHENTICATE** button. A temporary $1.00 USD hold will be placed on the card and refunded after verification is complete.

## Creating Ad Campaigns

An _ad campaign_ is a coordinated series of ads designed to achieve a specific goal. To create an ad campaign, you must do the following:

1. [Define the ad campaign](#define-the-campaign): Campaigns are defined by their campaign objectives, budget, and duration.
2. [Define ad sets](#define-ad-sets): An ad set is a group of ads within a campaign that shares the same targeting and bidding parameters.
3. [Create ads](#create-ads): Ads are the individual ads shown to players.

### Define the Campaign

Campaigns are defined by their campaign objective and budgeting and scheduling parameters.

**Campaign Objectives** determine if the campaign focuses on awareness or visits. Campaigns focused on awareness show image ads to increase awareness of your band. Campaigns focused on visits aim to attract people to your experience on Roblox through portal ads.

**Budgeting and Scheduling** parameters control campaign spending and duration. Budgets are organized between Daily and Lifetime Budgets. A Daily Budget is the maximum amount you'll pay for your ads per day, while a Lifetime Budget is the maximum amount you'll pay for your ads for the duration of the campaign.

To set up an ad campaign:

1. Navigate to the **Immersive Ads** tab in the Ads Manager and click the **CREATE** button. The **Campaign** window appears.

   <img src="../../assets/promotion/ads-manager/Campaign-Create.png" width="780" />

2. Determine the **Campaign Objective** by selecting it in the dropdown.

   <img src="../../assets/promotion/ads-manager/Campaign-Objective.png" width="780" />

3. Determine the **Daily Budget** or **Lifetime Budget** for your campaign. You cannot set both a daily and lifetime budget.

   <img src="../../assets/promotion/ads-manager/Campaign-Budget-Schedule.png" width="780" />

4. Determine the length of your campaign by selecting the **SET END DATE** button. End dates are optional when using daily budgets. If an end date is not set, campaigns will run indefinitely using the daily budget.

   <img src="../../assets/promotion/ads-manager/Campaign-Set-End-Date.png" width="780" />

5. Name your campaign and click the **NEXT** button.
   <img src="../../assets/promotion/ads-manager/Campaign-Name-Next.png" width="780" />

### Define Ad Sets

_Ad sets_ are a group of ads within a campaign that share the same targeting and bidding parameters. When defining an ad set, you can customize the audience and bidding settings.

**Audience** settings on Roblox enables you to choose who will see your ad. You're able to determine their geographical location, gender, age, and what device they're playing on.

**Bidding** refers to advertisers competing to show their ads to players through the available ad units placed in experiences. Bids are reflected as CPM (cost-per-thousand impressions). Your **Max&nbsp;Bid** for CPM is the maximum amount you're willing to pay every thousand impressions. For more information about Roblox's bidding system, see [Bidding and Auction](#bidding-and-auction).

To define an ad set:

1. Determine the countries you want your ad to appear in.

   <img src="../../assets/promotion/ads-manager/Ad-Set-Locations.png" width="780" />

2. Determine the gender and age range of the players you wish to see your ads, as well as which devices you'd like your ads to appear on.

   <img src="../../assets/promotion/ads-manager/Ad-Set-Gender-Ages-Devices.png" width="780" />

3. Determine how you want to spend your budget. A higher CPM can increase the chances of winning the [auction](#bidding-and-auction), but it also means you'll pay more.

   <img src="../../assets/promotion/ads-manager/Ad-Set-Bidding.png" width="780" />

4. Lastly, name your ad set and click the **NEXT** button.

   <img src="../../assets/promotion/ads-manager/Ad-Set-Name-Next.png" width="780" />

#### Bidding and Auction

Roblox runs an auction to determine the best ad to show when there is an ad opportunity. Advertisers set the maximum price they are willing to pay as CPM (cost per thousand impressions) or CPT (cost per one teleport). Roblox considers the player and ad information to generate an eCPM (effective cost per thousand impressions) value for each ad in the request. All eligible ads participate in a **first price auction**.

In principle, this looks like:

1. Advertisers submit their bids for ad space.
2. Roblox calculates the eCPM value for each ad based on the player and ad information.
3. The ads are then placed into an auction.
4. The ad with the highest eCPM value wins the auction.
5. The winning ad is then displayed to the player.
6. The advertiser is charged its bid amount price.

### Create Ads

You can create are two different types of ads using the Ads Manager:

- [Image Ads](#image-ads) are static, non-clickable images within the 3D space of an experience.
- [Portal Ads](#portal-ads) are static, non-clickable images within the 3D space of an experience, with a door that teleports a user into an advertiser's experience.

The **Ad Type** is determined by your [campaign objective](#define-the-campaign). Campaign objectives valuing **awareness** are displayed as image ads, while campaign objectives valuing **visits** are displayed as portal ads.

Roblox reviews each submitted ad prior to it being run. Ensure your ad is eligible to run by following the [Roblox Advertising Standards](https://en.help.roblox.com/hc/en-us/articles/13722260778260).

#### Image Ads

<img src="../../assets/monetization/immersive-ads/Overview-ImageAd.jpg" width="640" />

To create an image ad:

1. Click the **UPLOAD FILE** button in the drag and drop window. A navigation window displays.

   <img src="../../assets/promotion/ads-manager/Ad-Upload-Widget.png" width="780" />

2. Navigate to and confirm the image file you'd like to use.
3. With your ad image selected, preview it by clicking the **expanding arrows** over the image thumbnail.

   <img src="../../assets/promotion/ads-manager/Image-Ad-Preview-Arrows.png" width="780" />

4. Name your image ad in the **Ad Name** field and click the **NEXT** button. The [Review](#review-the-campaign) window displays.

#### Portal Ads

<video controls src="../../assets/monetization/immersive-ads/Overview-PortalAd.mp4" width="640"></video>

<Alert severity="info">
   The advertiser's experience includes a button to return players back to the original experience.
</Alert>

To create a portal ad:

1. Select the **Portal Destination Experience** where you want the viewer to land after walking through the portal ad.

   <img src="../../assets/promotion/ads-manager/Portal-Ad-Destination-Experience.png" width="780" />

2. Click the **UPLOAD FILE** button in the drag and drop window. A navigation window displays.

   <img src="../../assets/promotion/ads-manager/Ad-Upload-Widget.png" width="780" />

3. Navigate to and confirm the image file you'd like to use.
4. With your ad image selected, preview it by clicking the **expanding arrows** over the image thumbnail.

   <img src="../../assets/promotion/ads-manager/Image-Ad-Preview-Arrows.png" width="780" />

5. Name your image ad in the **Ad Name** field and click the **NEXT** button. The [Review](#review-the-campaign) window displays.

### Review the Campaign

This final screen enables you to revisit any previous setting of your campaign and is required for review before launch. Once submitted, your ad is reviewed by moderators for approval.

To review your ad campaign:

1. Click the **EDIT CAMPAIGN** button to make changes to the campaign settings.

   <img src="../../assets/promotion/ads-manager/Review-Campaign-Settings.png" width="780" />

2. Click the **EDIT AD SET** button to make changes to the ad set. You can create multiple ad sets after your initial submission.

   <img src="../../assets/promotion/ads-manager/Review-Campaign-Ad-Set.png" width="780" />

3. Click the **EDIT AD** button to make changes to the individual ad. You can create multiple ads after your initial submission.

   <img src="../../assets/promotion/ads-manager/Review-Campaign-Ad.png" width="780" />

4. When you finish reviewing, click the **SUBMIT** button.

<Alert severity="info">
Roblox tries to complete moderation within 24 hours for each ad submitted. Ads that do not pass moderation show the status of rejected. If you're curious why your ad got rejected, please refer to the [most up‑to‑date standards](https://en.help.roblox.com/hc/en-us/articles/13722260778260).
</Alert>

## Ads Reporting

_Ads reporting_ is a tool that provides necessary information to effectively manage campaigns at the campaign, ad set, and individual ad level. Ads reporting helps advertisers evaluate campaign performance, optimize strategies, and reach their campaign objectives.

- [Ad Campaign Reports](#ad-campaign-reports): Ads reporting at the campaign level offers insights into overall campaign effectiveness, enabling advertisers to compare and optimize various campaigns they have running simultaneously. Metrics like total impressions, teleports, teleport rate,and cost per teleport at this level provide a holistic view of performance, guiding budget allocation and strategy adjustments.
- [Ad Set Reports](#ad-set-reports): Ads reporting at the ad set level highlights targeting and budget effectiveness, enabling adjustments for better audience engagement. Metrics such as impressions, teleports, teleport rate, and cost per teleport at this level inform optimization for specific audiences.
- [Ad Reports](#ad-reports): Ads reporting at the individual ad level assesses creative impact, guiding design improvements. Metrics like impressions, teleports, and teleport rate at this level reveal ad resonance and inform creative refinements.

### Ad Campaign Reports

<img src="../../assets/promotion/ads-manager/Reports-Campaigns.png" width="780" />

The information provided at the [campaign](#define-the-campaign) level includes:

| Reporting Column  | Definition                                                                                                             |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Name**          | The name of the ad campaign.                                                                                           |
| **Off/On**        | A toggle indicating if the ad campaign is active, paused, or disabled.                                                 |
| **Status**        | Displays the status of the ad campaign. For a list of all statuses, see [Ad Campaign Statuses](#ad-campaign-statuses). |
| **Spent**         | The amount of money you spent on this campaign.                                                                        |
| **Impressions**   | A count for every time a player sees an Ad according to Roblox's internal criteria.                                    |
| **CPM**           | Cost Per Mille (thousand) impressions.                                                                                 |
| **Teleports**     | A count for every time a player arrives at the advertiser experience from Portal Ads.                                  |
| **Teleport Rate** | Total number of teleports divided by the total number of impressions on Portals.                                       |
| **CPT**           | Cost Per Teleport.                                                                                                     |
| **Budget**        | The amount of money allocated for this ad campaign, on a Daily or Lifetime timeframe.                                  |
| **Objective**     | Displays the campaign objective between awareness or visits.                                                           |
| **Schedule**      | Displays the campaign run time.                                                                                        |

### Ad Set Reports

<img src="../../assets/promotion/ads-manager/Reports-Ad-Sets.png" width="780" />

The information provided at the [ad set](#define-ad-sets) level includes:

| Reporting Column  | Definition                                                                                              |
| ----------------- | ------------------------------------------------------------------------------------------------------- |
| **Name**          | The name of the ad set.                                                                                 |
| **Off/On**        | A toggle indicating if the ad campaign is active, paused, or disabled.                                  |
| **Status**        | Displays the status of the ad set. For a list of all statuses, see [Ad Set Statuses](#ad-set-statuses). |
| **Bid Type**      | Displays the maximum CPM bid allocated in the budget.                                                   |
| **Spent**         | The amount of money you are currently spending on ads.                                                  |
| **Impressions**   | A count for every time a player sees an Ad according to Roblox's internal criteria.                     |
| **CPM**           | Cost Per Mille (thousand) impressions.                                                                  |
| **Teleports**     | A count for every time a player arrives at the advertiser experience from Portal Ads.                   |
| **Teleport Rate** | Total number of teleports divided by the total number of impressions on Portals.                        |
| **CPT**           | Cost Per Teleport.                                                                                      |

### Ad Reports

<img src="../../assets/promotion/ads-manager/Reports-Ads.png" width="780" />

The information provided at the [individual ad](#create-ads) level includes:

| Reporting Column  | Definition                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------ |
| **Name**          | The name of the ad.                                                                                    |
| **Off/On**        | A toggle indicating if the ad campaign is active, paused, or disabled.                                 |
| **Status**        | Displays the status of the individual ad. For a list of all statuses, see [Ad Statuses](#ad-statuses). |
| **Ad Set**        | Displays the ad set the corresponding individual ad belongs to.                                        |
| **Ad Format**     | Displays if the Ad is an Image or Portal Ad.                                                           |
| **Spent**         | The amount of money you are spending on ads.                                                           |
| **Impressions**   | A count for every time a player sees an Ad according to Roblox's internal criteria.                    |
| **CPM**           | Cost Per Mille (thousand) impressions.                                                                 |
| **Teleports**     | A count for every time a player arrives at the advertiser experience from Portal Ads.                  |
| **Teleport Rate** | Total number of teleports divided by the total number of impressions on Portals.                       |
| **CPT**           | Cost Per Teleport.                                                                                     |

### Delivery Columns

The _delivery column_ of the Ads Manager defines the **Status** of your campaign, ad set, or ad.

- [Ad Campaign Statuses](#ad-campaign-statuses) offer a valuable overview of the campaign's overall progress, helping advertisers identify and optimize active, underperforming, or completed campaigns for better results.
- [Ad Set Statuses](#ad-set-statuses) highlight the performance of each ad set in terms of targeting and budget allocation, enabling advertisers to fine-tune their strategies for improved audience engagement and to reach their campaign objectives.
- [Ad Statuses](#ad-statuses) provide insights into the delivery status of each individual ad, allowing advertisers to monitor their effectiveness and note any dependencies on their parent ad sets or Campaigns.

You can use the following status tables to understand what each status means.

#### Ad Campaign Statuses

| Delivery Status | Definition                                                                                                                                                                                                                                                                     |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Active**      | Your campaign contains at least one ad running normally.                                                                                                                                                                                                                       |
| **Paused**      | The campaign is not delivering because it is toggled off (paused by user).                                                                                                                                                                                                     |
| **Scheduled**   | The campaign flight dates are set in the future and will begin delivering when the start date has passed.                                                                                                                                                                      |
| **Inactive**    | There are no delivering ad sets within the campaign. This could mean that no ad sets have been created within the campaign, all Ad sets or ads are paused, or a combination of the two. Looking at the 'Ad Sets' or 'Ads' tab will help determine why they are not delivering. |
| **Error**       | Technical error. Please contact [support](https://www.roblox.com/support).                                                                                                                                                                                                     |
| **Completed**   | The campaign, ad set or ad is no longer running because the scheduled end date has passed.                                                                                                                                                                                     |

#### Ad Set Statuses

| Delivery Status | Definition                                                                                                                                                                                                                                               |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Active**      | The ad is running normally, or your campaign or ad sets contains at least one ad running normally.                                                                                                                                                       |
| **Paused**      | The ad set is not delivering because it is toggled off.                                                                                                                                                                                                  |
| **Inactive**    | There are no delivering ads within the ad set. This could mean one or more of the following: No ads have been created within the ad set. Ads are paused or have been rejected. Looking at the 'Ads' tab will help determine why they are not delivering. |
| **Scheduled**   | The ad set start date is set in the future and will turn on at the scheduled time for the campaign.                                                                                                                                                      |
| **Completed**   | The campaign, ad set or ad is no longer running because the scheduled end date has passed.                                                                                                                                                               |
| **Error**       | Technical error. Please contact [support](https://www.roblox.com/support).                                                                                                                                                                               |

#### Ad Statuses

| Delivery Status | Definition                                                                                                                                                                                                                       |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Active**      | The ad is running normally, or your campaign or ad sets contains at least one ad running normally.                                                                                                                               |
| **Rejected**    | The ad can't run because it doesn't comply with Roblox advertising policy.                                                                                                                                                       |
| **In Review**   | The ad is in review to make sure it complies with [Roblox Advertising Standards](https://en.help.roblox.com/hc/en-us/articles/13722260778260). Following this review, your ad will become active and begin running as scheduled. |
| **Paused**      | Ad is toggled off by the user.                                                                                                                                                                                                   |
| **Completed**   | The campaign, ad set or ad is no longer running because the scheduled end date has passed.                                                                                                                                       |
| **Paused**      | Ad is toggled on but parent campaign is off so ad is not active.                                                                                                                                                                 |
| **Paused**      | Ad is toggled on but parent ad set is off so ad is not active.                                                                                                                                                                   |
| **Error**       | Technical error. Please contact [support](https://www.roblox.com/support).                                                                                                                                                       |

## Ads Billing

**Ads Billing** charges advertisers for ad placements on Roblox using the [payment method on file](#adding-a-payment-method). There are two points at which an advertiser gets charged on Roblox. The first is whenever an advertiser reaches their **Payment Threshold**, and the second is at the first of the month if the payment threshold is not reached.

Roblox advertisers have a payment threshold of $100 USD. Whenever an advertiser account accrues a balance of $100 through advertising on Roblox, their payment method on file is charged. If the payment threshold is not reached by the end of the month, the remaining outstanding balance is paid instead.

For instance, if an advertiser's account reaches the $100 payment threshold on May 7th due to their campaign parameters, their payment method gets charged $100 on May 7th. If they accrue less than $100, their payment method gets charged at the first of the month.

## Ad Fraud Protection

Roblox diligently combats ad fraud using advanced detection methods for bots and other fraudulent activities, ensuring advertisers don't pay for fraudulent traffic and regularly adjust billing and reporting to safeguard their interests.

To avoid fraudulent behavior and maintain advertising integrity, advertisers should follow these best practices:

- Do not attempt to upload malware to the Roblox Ad Manager.
- Do not provide false identification or payment information to Roblox.
- Do not make fraudulent refund requests or dispute payments for services properly rendered.

Also note that Roblox may suspend ad campaigns or advertiser accounts for non-payment of services properly rendered.
