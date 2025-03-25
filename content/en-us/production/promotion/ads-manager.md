---
title: Ad campaigns
description: The Ads Manager is where you can manage ad campaigns, ads reporting, and ads billings and payments in one place.
---

<Alert severity="warning">
The Ads Manager feature is in beta.
</Alert>

The **Ads Manager** offers you control over your ad campaigns, empowering you to create, optimize, and measure ads effectively while reaching your campaign objectives. You can use this tool to manage your ad campaigns, ads reporting, and ads billings in one place.

With the Ads Manager, you can create campaigns for immersive ads for ad units within experiences (like [image ads](#image-ads), [video ads](#video-ads), and [portal ads](#portal-ads)), [sponsored experiences](#sponsored-experiences) that appear on the Home page, and [search ads](./search-ads.md) that appear on Search results.

## Create an ad account

To access the Ads Manager, you must create an ad account with a verified email on a Roblox account registered for users aged 13 years or older.

When creating an account, you can choose between creating a personal or a business ads account. A personal account is for individuals who want to advertise on Roblox, while a business account manages a company's ad presence on Roblox.

To create an ad account:

1. Go to the [Ads Manager](https://ads.roblox.com) portal while signed into your Roblox account and **Create ad account**.
2. Choose a personal account or a business account.
3. Check the box to confirm the provided information and click **Create ad account**.

## Add a payment method

Before you can create and manage ads on Roblox, you must first add a payment method to your ad account:

1. Go to **Payment Settings** in the Ads Manager.

   <img src="../../assets/promotion/ads-manager/Menu-Payment-Settings.png" width="258" />

2. Choose one of the two available payment methods.
   1. **Credit or Debit Card**: Credit or debit cards are available for users 18 and above. A temporary $1.00 USD hold will be placed on the card and refunded after verification is complete within 7 business days.
   2. **Robux Ad Credit**: Converting Robux into ad credits to fund your campaigns is available for all users 13 and up.

### Convert Robux to ad credits

Any Roblox user aged 13 and above can convert Robux to ad credit and use it for running ads. This accessibility ensures that a wide range of creators can participate in the advertising ecosystem.

You can specify the amount of ad credit you want to purchase. When converting Robux to ad credits, consider the following:

- 1 ad credit is equivalent to 285 Robux.
- 10 ad credits is the minimum conversion requirement.

This minimum conversation requirement streamlines the conversion process, prevents inaccuracies, and makes sure that you have enough ad credits to support meaningful advertising campaigns.

<img src="../../assets/promotion/ads-manager/Ad-Credits.png" width="780" />

<Alert severity="warning">
   Converting Robux to ad credit is a permanent and irreversible action. After you convert Robux to ad credits, you can only spend your ad credits on ad campaigns within the Ads Manager.
</Alert>

## Create an ad campaign

An **ad campaign** is a coordinated series of ads designed to achieve a specific goal. To create an ad campaign:

1. [Define the campaign](#define-the-campaign).
2. [Define an ad set](#define-an-ad-set).
3. [Create ads](#create-ads).

Before launching your campaign and submitting it to Roblox for moderation and approval, you'll be able to [review the campaign details](#review-the-campaign).

<Alert severity="warning">
   Advertising paid experiences and restricted (17+) experiences is only available with sponsored and search ads.
</Alert>

### Define the campaign

Campaigns are defined by their **campaign objective** and **budgeting and scheduling** parameters. Campaign objectives are divided into three categories:

- **Awareness**: Campaigns focused on awareness show image or autoplaying video ads to increase awareness of your brand within an experience.
- **Visits**: Campaigns focused on visits aim to attract people to your experience on Roblox. These can take the form of either **sponsored experiences** on the Home page or **immersive ads** placed within portal ad units in experiences. You can't promote 17+ experiences using the **Visits** objective.
- **Video Views**: Campaigns focused on 15-second click-to-play video views to engage audiences in-experience.

Budgeting and scheduling parameters control campaign spending and duration. There are two different types of budgets:

- **Daily budgets:** A daily budget is the maximum amount you pay for your ads per day.
- **Lifetime budgets:** A lifetime budget is the maximum amount you pay for your ads for the entire duration of the campaign.

You can't set both a daily and lifetime budget. Budgets are paid for by either your credit card on file or with existing ad credit balance.

To set up an ad campaign:

1. Go to **Manage Ads** and click **Create**.
2. Select your **Payment Method**. If you're using ad credits, make sure the campaign budget does not exceed the available ad credits in your account. Ad credits are debited after campaign submission based on your set budget.
3. Select a **Campaign Objective** from the dropdown.

   <img src="../../assets/promotion/ads-manager/Campaign-Objective.png" width="780" />

4. Choose a **Daily Budget** or **Lifetime Budget** for your campaign.
5. Choose the length of your campaign.

   - End dates are required for any campaign funded by ad credits.
   - End dates are optional for daily budgets with debit and credit cards. If you don't set an end date, the campaign runs indefinitely using the daily budget.

6. Enter a name for your campaign.
7. Click **Next**.

### Define an ad set

Ad sets are a group of ads within a campaign that share the same targeting and bidding parameters. When defining an ad set, you can customize the following three categories to meet the needs of your respective campaign goals:

- **Audience settings**: Choose who sees your ad based on their geographical location, gender, age, and what device they're playing on.
- **Ad placement**: Determine where your ads are discoverable on the platform, such as in search results or within experiences.
- **Brand suitability**: Filter what kinds of experiences your ads are served in based on the content of those experiences.

To define an ad set:

1. Choose up to 10 regions or countries you want your ad to appear in. When you target a region, you automatically target every country within that region.

   <img src="../../assets/promotion/ads-manager/Ad-Set-Locations.png" width="780" />

2. Determine the gender and age range of the players you want to see your ads, as well as which devices you want your ads to appear on. Certain options might not be available in some locations.
3. Select where you want to place your ads according to your campaign objective.

   - For a **visits campaign objective**, choose between a sponsored experience on the Home page or an in-experience portal within an experience.
   - For an **awareness campaign objective**, choose between an in-experience video or image.

4. Select an inventory tier according to the kinds of experiences you want to serve your ads. Inventory tiers only affect which experiences ads can appear in, **not** who can see ads. For example, if you select Standard Inventory, your ads might be shown in an experience with a 9+ age recommendation to audiences who are 13+.

   <table>
   <thead>
     <tr>
       <th>Brand suitability tier</th>
       <th>Experiences with content maturity labels eligible to serve ads</th>
       <th>Age of users eligible to see ads</th>
     </tr>
   </thead>
   <tbody>
     <tr>
       <td>**Full Inventory**</td>
       <td>Minimal, mild, moderate, restricted</td>
       <td>13+, except in 17+ experiences where users must be 17+ and ID-verified</td>
     </tr>
     <tr>
       <td>**Standard Inventory**</td>
       <td>Minimal, mild</td>
       <td>Users aged 13+</td>
     </tr>
      <tr>
       <td>**Limited Inventory**</td>
       <td>Minimal</td>
       <td>Users aged 13+</td>
     </tr>
   </tbody>
   </table>

   <Alert severity="warning">
      Selecting **Standard Inventory** and **Limited Inventory** exclude experiences with more mature content and can limit your reach. Regardless of what option you select, your ads aren't shown to users under the age of 13 or in experiences that don't comply with the Roblox community standards. For more information, see the [advertising standards](./comply-with-advertising-standards.md) and the [brand suitability tables](#brand-suitability-tables).
   </Alert>

   See the following for a breakdown of what types of content you can expect for each [content maturity](content-maturity.md) label:

   <table>
   <thead>
     <tr>
       <th>Maturity label</th>
       <th>Description</th>
     </tr>
   </thead>
   <tbody>
     <tr>
       <td>**Minimal**</td>
       <td>Might contain occasional mild violence and/or light unrealistic blood.</td>
     </tr>
     <tr>
       <td>**Mild**</td>
       <td>Might contain repeated mild violence, heavy unrealistic blood, mild fear-based content, and/or mild crude humor.</td>
     </tr>
     <tr>
       <td>**Moderate**</td>
       <td>Might contain moderate violence, light realistic blood, moderate fear-based content, moderate crude humor, and/or unplayable gambling content.</td>
     </tr>
     <tr>
       <td>**Restricted**</td>
       <td>Might contain strong violence, heavy realistic blood, moderate crude humor, romantic themes, unplayable gambling content, the presence of alcohol, and/or strong language.</td>
     </tr>
   </tbody>
   </table>

5. Choose which [genres](#genre-targeting) you want to target with your ads.

   - For sponsored experiences, this represents the genre interests of your audience.
   - For immersive ads, this represents the genre of the experiences your ads are displayed in.

6. Determine a max bid price to show your ads to players through the available ad units placed in experiences. Bids are reflected as CPM (cost-per-thousand impressions), meaning that your max bid for CPM is the maximum amount you're willing to pay for every thousand impressions. For more information about Roblox's bidding system, see [Bidding and auction](#bidding-and-auction).
7. Enter a name for your ad set.
8. Click **Next**.

To maximize your advertising reach and use both in-experience portals and sponsored experiences within the same campaign, consider creating an additional ad set. This flexibility enables you to experiment with different ad strategies and optimize your campaign's performance.

<Alert severity="info">
   When you define your ad set, an audience estimation displays that indicates how many Roblox user accounts your ads can reach over a month when applying your targeting parameters and placements. It estimates a maximum number of users on the platform who might be exposed to your ads, but does not take into consideration your budget limits or bidding parameters.
</Alert>

#### Brand suitability tables

Brand suitability tables show what types of content you can expect to appear alongside your immersive ads depending on your brand suitability inventory selection.

<Alert severity="info">

While context exclusions are done as effectively as possible, complete accuracy is not guaranteed. Brand suitability controls only affect which experiences ads are shown in and not the age of who sees an ad.

Regardless of what brand suitability options you choose, your ads are only shown to 13+ users. Content types listed within the brand suitability guidelines are thematic examples and aren't guaranteed to appear within each inventory tier.

For more information on content exclusions associated with content maturity, see [Content maturity](content-maturity.md) and [Content maturity labels](https://en.help.roblox.com/hc/en-us/articles/8862768451604-Experience-Guidelines-and-Age-Recommendations).
</Alert>

<table>
<thead>
  <tr>
    <th>**Violent content and gore**</th>
    <th>Full</th>
    <th>Standard</th>
    <th>Limited</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>No violence, occasional mild violence or light unrealistic blood.</td>
    <td>Included</td>
    <td>Included</td>
    <td>Included</td>
  </tr>
  <tr>
     <td>Repeated mild violence or heavy unrealistic blood.</td>
    <td>Included</td>
    <td>Included</td>
    <td>Excluded</td>
  </tr>
  <tr>
     <td>Moderate/strong violence or realistic blood.</td>
    <td>Included</td>
    <td>Excluded</td>
    <td>Excluded</td>
  </tr>
</tbody>
<br />
<br />
<thead>
  <tr>
    <th>**Crude humor and language**</th>
    <th></th>
    <th></th>
    <th></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Mild crude humor.</td>
    <td>Included</td>
    <td>Included</td>
    <td>Excluded</td>
  </tr>
  <tr>
     <td>Moderate crude humor.</td>
    <td>Included</td>
    <td>Excluded</td>
    <td>Excluded</td>
  </tr>
  <tr>
     <td>Presence of strong language.</td>
    <td>Included</td>
    <td>Excluded</td>
    <td>Excluded</td>
  </tr>
</tbody>
<br />
<br />
<thead>
  <tr>
    <th>**Illegal or regulated goods and activities**</th>
    <th></th>
    <th></th>
    <th></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Presence of alcohol.</td>
    <td>Included</td>
    <td>Excluded</td>
    <td>Excluded</td>
  </tr>
  <tr>
     <td>Unplayable gambling content.</td>
    <td>Included</td>
    <td>Excluded</td>
    <td>Excluded</td>
  </tr>
</tbody>
<br />
<br />
<thead>
  <tr>
    <th>**Romantic and sexual content**</th>
    <th></th>
    <th></th>
    <th></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Non-sexual romantic themes.</td>
    <td>Included</td>
    <td>Excluded</td>
    <td>Excluded</td>
  </tr>
</tbody>
</table>

<br />
<h5>Always excluded content</h5>

To support brand safety, all content on Roblox must continue to follow the Roblox [community standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards). The community standards set a high bar for content that is safe and civil for the platform.

For example, the following content is not allowed on the platform in any context:

- Extreme violence including real-world depictions of graphic violence, war crimes, or terrorism
- Depiction of real-world sensitive events
- Depiction of sexual acts or nudity
- Hate speech or promotion of hate groups
- Discussion or depiction of use of illegal drugs or regulated substances including tobacco, vaping, and steroids
- Discussion or depiction of political content including political parties, political candidates, and elected officials

#### Bidding and auction

Ads on Roblox work in a bidding system, where you bid to have your ads shown to users through the available ad units placed in an experience. When determining your bidding settings, bids are reflected as CPM (cost-per-thousand impressions). Your max bid for CPM is the maximum amount you're willing to pay every thousand times your ad is seen by the user. A higher CPM can increase the chances of winning the auction, but it also means you pay more.

At the same time, Roblox runs an auction to determine the best ad to show when there's an ad opportunity. You set the maximum price you're willing to pay as CPM or CPP (cost-per-play), then Roblox considers the player and ad information to generate an eCPM (effective cost-per-thousand impressions) value for each ad in the request.

All eligible ads participate in a **second price auction**. The ad with the highest bid wins the ad slot, but only charges the price of the second highest price plus one cent. This process looks like this:

1. You submit your bids for ad space.
2. Roblox calculates the eCPM value for each ad based on the player and ad information.
3. The ads are placed into an auction.
4. The ad with the highest eCPM value wins the auction.
5. The winning ad is displayed to the player.
6. You are charged the bid amount of the second highest price, plus one cent ($0.01).

For example, you want to display your ad on a website so you submit a bid of $10. Another advertiser submits a bid of $12 for their own ad and wins the auction because their bid is higher. They're then charged $10.01, which is the price of the second highest bid (in this case, your bid) plus one cent.

#### Genre targeting

Genre targeting helps you target your ads to reach people who are more likely to engage with your experience. You can use your ad sets to target particular genres.

<br />
<h5>Experience genre</h5>

Experience genres are based on the genre of the experiences your [immersive ads](../../production/monetization/immersive-ads.md) are served in. For example,selecting only "Roleplaying" means your ads only appear in experiences classified as "Roleplaying."<br />

<br />
<h5>Audience genre</h5>

For **sponsored experiences**, audience genre targeting is based on user preferences. Ads are only served to users who like to play experiences in the selected genres.

There are nine genres available for targeting:

- **Action**: Complete physical challenges that require motor skills like jumping, shooting, and climbing.
- **Adventure**: Use clues and interact with people or the environment to progress gameplay.
- **Obby**: Navigate a series of challenging obstacles to reach a goal or complete a task.
- **Roleplaying**: Assume the roles of characters in a fictional setting and have freedom to influence the story.
- **Simulation**: Experiences that closely simulate real world or fictional realities.
- **Social**: An environment where characters can meet friends, hangout, and socialize.
- **Sports**: Play traditional or fictional physical sports.
- **Strategy**: Focus on skillful thinking and planning to achieve success.
- **Tycoon**: Take on the role of a business owner and manage various aspects of the business to achieve success and profitability.

<Alert severity="warning">
   Audience genre targeting isn't available when buying sponsored experiences to reach audiences in the EU.
</Alert>

### Create ads

You can create three different types of ads using the Ads Manager:

- [Sponsored experiences](#sponsored-experiences), which appear as sponsored experience tiles on the Home page.
- Immersive ads, which include:
  - [Portal ads](#portal-ads), which are static, non-clickable images within the 3D space of an experience, with a door that teleports a player into an advertiser's experience.
  - [Image ads](#image-ads), which are static, non-clickable images within the 3D space of an experience.
  - [Video ads](#video-ads), which are either auto-playing (non-rewarded) or click-to-play (can be rewarded) videos within the 3D space of an experience.
- [Search ads](#search-ads), which allow you to promote your experience to users ages 13+ who are actively searching for experiences or genres of experiences using specific keywords.

The ad type is determined by your [campaign objective](#define-the-campaign). For example, campaign objectives valuing awareness are displayed as image ads, while campaign objectives valuing visits are displayed as tile and portal ads.

Roblox reviews each submitted ad prior to it being run. Make sure your ad is eligible to run by following the [advertising standards](./comply-with-advertising-standards.md).

#### Sponsored experiences

You can create a sponsored experience for All Ages, 9+ and 13+ experiences by choosing the Visits campaign objective. Currently, you can't run sponsored ads for 17+ experiences.

To create a sponsored experience ad:

1. Select the **Destination Experience** that you want the player to join.
2. Click **Upload file** and select the image you want to use for the ad.
3. Preview the image by clicking the expanding arrows over the image thumbnail.
4. Enter a name for your ad.
5. Click **Next**.

#### Portal ads

<video controls src="../../assets/monetization/immersive-ads/Overview-PortalAd.mp4" width="640"></video>

<Alert severity="info">
   The experience must include a button that lets players return to the original experience.
</Alert>

To create a portal ad:

1. Select the **Destination Experience** that you want the player to land in after walking through the portal ad.
2. Click **Upload file** and select the image you want to use for the ad.
3. Preview the image by clicking the expanding arrows over the image thumbnail. You can also click **Live Preview** to see and interact with the portal ad like a player would.
4. Enter a name for your ad.
5. Click **Next**.

#### Image ads

<img src="../../assets/monetization/immersive-ads/Overview-ImageAd.jpg" width="640" />

To create an image ad:

1. Click **Upload file** and select the image you want to use for the ad.
2. Preview the image by clicking the expanding arrows over the image thumbnail. You can also click **Live Preview** to see the image ad like a player would.
3. Enter a name for your ad.
4. Click **Next**.

#### Video ads

To create a video ad:

1. Click **Upload media** and select the video you want to use for the ad.
2. Preview a static image of the video by clicking the expanding arrows over the image thumbnail. You can also click **Live Preview** to see the video ad like a player would.
3. Enter a name for your ad.
4. Click **Next**.

#### Search ads

Search ads have unique audience targeting, and a specific bidding and auction process for keywords. For more information, see [Search ads](./search-ads.md).

#### Live preview of ads

You can use live preview to see what your immersive ad looks like to the players inside an experience. Live preview is available for immersive ads in [portal](#portal-ads), [image](#image-ads), and [video](#video-ads) formats.

After selecting and uploading an image or video file, click **Live Preview** next to the image or video thumbnail. This takes you to a demo experience created by Roblox to teach users how to build and advertise on the Roblox platform. Inside the experience, you can see and interact with the ad format you selected in Ads Manager.

<img src="../../assets/promotion/ads-manager/Live-Preview-Experience.png" width="780" />

<Alert severity="info">
   After you upload an image or video file, that file is submitted to Roblox for moderator approval. If approval is pending, a watermark displays on top of the live preview of your ad inside the demo experience. If Roblox rejects your file, the live preview of your ad doesn't show up inside the demo experience.
</Alert>

### Review the campaign

With your campaign, ad set, and individual ad created, it's time to review your selections. This final screen lets you revisit and edit any previous setting of your campaign before launch.

Review your ad campaign and click **Submit**. After you submission, moderators review it for approval.

<Alert severity="info">
   Roblox tries to complete moderation within 24 hours for each ad submitted. Ads that do not pass moderation show the status of rejected.
</Alert>

## Edit a campaign

After a campaign, ad set, or ad is submitted, you can still make adjustments to certain parameters. See the following for the parameters you can and can't change:

<table>
<thead>
  <tr>
    <th>Changeable</th>
    <th>Fixed</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Campaign name</td>
    <td>Campaign objective</td>
  </tr>
  <tr>
    <td>Campaign end and start dates</td>
    <td>Campaign budget type</td>
  </tr>
  <tr>
    <td>Campaign budget amount</td>
    <td>Ad set bid type</td>
  </tr>
  <tr>
    <td>Ad set bid amount</td>
    <td>Ad set targeting parameters</td>
  </tr>
  <tr>
    <td>Ad set name</td>
    <td></td>
  </tr>
  <tr>
    <td>Ad name</td>
    <td></td>
  </tr>
  <tr>
    <td>Ad type</td>
    <td></td>
  </tr>
</tbody>
</table>

## Cancel a campaign

You can cancel a campaign up to 6 hours before the campaign's scheduled start time. Cancelling a campaign automatically cancels any associated ad sets and ads, returns any ad credits you spent back to your account, and prevents your credit or debit card from being charged.
