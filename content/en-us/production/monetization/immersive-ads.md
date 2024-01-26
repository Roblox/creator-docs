---
title: Immersive Ads
description: Immersive Ads allow you insert ad units into your experience that programmatically serve ad content.
---

The **Immersive Ads** system allows you to insert ad units into your experience that permit Roblox to programmatically serve ad content from advertisers to your active users. There are two formats of immersive ad units:

- **Image Ads** — A static, non-clickable image within the 3D space.
- **Portal Ads** — A static, non-clickable image with a door that teleports users into an advertiser's experience.

<Alert severity="info">
   The advertiser's experience includes a button to return users back to your experience.
</Alert>

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/monetization/immersive-ads/Overview-ImageAd.jpg" />
    <figcaption>Image Ad Format</figcaption>
  </figure>
  <figure>
    <video controls src="../../assets/monetization/immersive-ads/Overview-PortalAd.mp4" width="90%"></video>
    <figcaption>Portal Ad Format</figcaption>
  </figure>
</GridContainer>

Ad content is specific to the user, meaning two users might simultaneously see different images or teleport to different advertiser experiences from the exact same ad unit, and if a user is ineligible to see ads, ad units display a fallback image of the Roblox logo.

To illustrate this concept, see the following three images of the same ad unit showing different content depending on the user. User A sees an ad promoting [The Mystery of Duvall Drive](../../resources/the-mystery-of-duvall-drive/index.md) experience while User B sees an ad promoting [Beyond the Dark](../../resources/beyond-the-dark/index.md). User C doesn't see an ad at all from this ad unit because they are ineligible to see ads.

<GridContainer numColumns="3">
  <figure>
    <img src="../../assets/monetization/immersive-ads/Overview-UserA.jpg" />
    <figcaption>User A</figcaption>
  </figure>
  <figure>
    <img src="../../assets/monetization/immersive-ads/Overview-UserB.jpg" />
    <figcaption>User B</figcaption>
  </figure>
  <figure>
    <img src="../../assets/monetization/immersive-ads/Overview-UserC.jpg" />
    <figcaption>User C</figcaption>
  </figure>
</GridContainer>

If your active users are eligible to see ads and meet the specific criteria from the advertiser, such as their gender or device, you may be eligible to earn Robux according to how they interact with the ad content:

- Image ads pay Robux for each viewable impression, which Roblox defines using an internal set of viewability criteria that considers factors such as the size of the ad, the angle between a user and an ad, and any obstruction between the user and the ad.
- Portal ads pay Robux for each successful teleport, which Roblox defines as when a user enters the portal and arrives at the advertiser's experience.

Roblox pays out earnings on the 25th of the following month from when you inserted ad units into your experience. For example, if you insert ad units during the month of March, your payout date for the viewable impressions and successful teleports from those ad units is April 25th. You can track your collective earnings from ad immersive ads either through the **My Transactions** or **Group Transactions** page. You can also analyze their overall performance through metrics graphs on the Creator Dashboard.

<Alert severity="warning">
   Roblox has ad fraud systems in place to create a positive advertiser, publisher, and user experience. Per Roblox's [Advertising Standards](https://en.help.roblox.com/hc/en-us/articles/13722260778260-Advertising-Standards), if you engage in malicious practices to inflate impressions or teleports, Roblox may deduct Robux from your expected payout or reclaim fraudulently earned Robux. In addition, Roblox may suspend your experience and/or account.
</Alert>

## Experience and User Eligibility

While anyone can insert ad units into their experiences, Roblox only serves ads into ad units if the experience is eligible to serve ads, which is based on an internal set of eligibility criteria. You can check your experience's eligibility status to serve ads by visiting your experience's details page on the [Creator Dashboard](https://create.roblox.com/dashboard/creations). If the left-hand navigation's **Monetization** section displays an **Immersive Ads** option, your experience is eligible.

<img src="../../assets/monetization/immersive-ads/immersive-ads-eligibility.png" width="100%" />

Advertisers can choose to limit which experiences their Immersive Ads are shown in to align with their brand. While we expect that all Roblox experiences are appropriate for most advertisers, some advertisers may choose to be more restrictive with where their ads are shown. Therefore, ad demand and publisher earnings could vary based upon an experience's age recommendation. Experiences with content suitable for more audiences should generally expect to earn more through immersive ads than experiences with more mature content. For more information on advertiser controls, see [Define Ad Sets](../promotion/ads-manager.md#define-ad-sets).

Even if your experience is eligible to serve ads, not all users are eligible to see ads, such as those under the age of 13. If a user is ineligible to see ads, ad units display a fallback image of the Roblox logo to those ineligible users, but you can remove the ad units altogether as described in [Removing Ad Units for Ineligible Users](#removing-ad-units-for-ineligible-users).

<Alert severity="warning">
   Intentionally misrepresenting your experience in the experience questionnaire in an attempt to increase traffic is prohibited and may have moderation consequences.
</Alert>

## Inserting Ad Units

When you insert an ad unit into an eligible experience, it's important to check each image ad surface that displays the ad before you publish your experience to confirm whether or not the ad unit is valid and able to serve ads. For example, you can scale ad units to different sizes to match your experience's aesthetics, but they cannot become too small or large, otherwise they become invalid and cannot serve ads.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/monetization/immersive-ads/Inserting-ImageAd.jpg" width="80%" />
    <figcaption>This ad unit is valid and can serve ads</figcaption>
  </figure>
  <figure>
    <img src="../../assets/monetization/immersive-ads/Inserting-PortalAd.jpg" width="80%" />
    <figcaption>This ad unit is invalid because it's too small; it cannot serve ads until you scale it to a valid size</figcaption>
  </figure>
</GridContainer>

### Image Ads

An image ad is a non-clickable static image that serves ads through an `Class.AdGui` instance that you can place on block `Class.Part` instances anywhere within the 3D space of an experience as long as nothing obstructs the view of the ad from users. The aspect ratio of the image scales with the face of the block you choose to display the ad content.

In order for the ad unit to be valid and serve ads once you publish the experience, you must ensure it meets the following criteria:

- The block is within the `Class.Workspace`.
- The block is no smaller than 8 by 4.5 studs, and no larger than 32 by 18 studs.
- The block doesn't include another `Class.AdGui` or `Class.SurfaceGui` object on the same face of the ad.

<figure>
<img src="../../assets/monetization/immersive-ads/ImageAds-Sample.jpg" width="50%" />
</figure>

To insert an image ad:

1. From the [Home](../../studio/home-tab.md) or [Model](../../studio/model-tab.md) tab, insert a **Block** part into your experience.

   <img src="../../assets/studio/general/Home-Tab-Part-Tools.png" width="800" />

1. In the [Properties](../../studio/properties.md) window, navigate to the **Face** property and choose a face, or keep the default face.
1. Scale the part to at least 8 studs wide and 5 studs tall, but no more than 32 studs wide and 18 studs tall.
1. In the [Explorer](../../studio/explorer.md) window, add an **AdGui** object to the part.
   1. Hover over the part and click the **⊕** button. A contextual menu displays.
   1. From the menu, insert an **AdGui**.

<Alert severity="info">
   You can also insert an image ad package from the Creator Store, then customize it to fit your experience as long as the ad unit continues to meet the validation criteria. For instructions on how to insert ad units from the Creator Store, see [Inserting Ad Units - Portal Ads](#portal-ads).
</Alert>

Once you publish the experience, users can see the ad unit in one of the following states:

<table>
<thead>
  <tr>
    <th>State</th>
    <th>Description</th>
    <th>Example</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Active**</td>
    <td>The ad unit is able to serve ads, and is currently serving an ad to a user.</td>
    <td><img src="../../assets/monetization/immersive-ads/ImageAds-Active.jpg" width="80%" /></td>
  </tr>
  <tr>
    <td>**Inactive**</td>
    <td>The ad unit is able to serve ads, but it isn't currently serving an ad to a user because of one of the following reasons:<br></br><ul><li>The user is ineligible to see ads.</li><li>The user has seen too many ads in a short period of time.</li><li>There is low ad demand from advertisers during that time period.</li><li>There aren't any ads that target the user's criteria, such as their gender, device, or country.</li></ul><br></br>Roblox serves a default fallback image instead.</td>
    <td><img src="../../assets/monetization/immersive-ads/ImageAds-Inactive.jpg" width="80%" /></td>
  </tr>
  <tr>
    <td>**Invalid**</td>
    <td>The ad unit isn't able to serve ads because it didn't meet the validation criteria.</td>
    <td><img src="../../assets/monetization/immersive-ads/ImageAds-Invalid.jpg" width="80%" /></td>
  </tr>
</tbody>
</table>

### Portal Ads

A portal ad is made up of two core components:

- A static, non-clickable image.
- A door that teleports users to an advertiser's experience.

The Creator Store includes portal ads that represent these core components through a **BasePortal** package. While this package must remain as-is outside of its scale, position, and rotation in order to remain valid and able to serve ads, portal ads also include a **Decorative** folder of both static and dynamic visual elements that display or hide according to the ad unit's state. You can customize these visual elements as long as the core components stay intact and without obstruction.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/monetization/immersive-ads/Portal-Ads-BasePortal.png" width="320" />
  </figure>
  <figure>
    <img src="../../assets/monetization/immersive-ads/Portal-Ads-Decorative.png" width="320" />
  </figure>
</GridContainer>

For example, the following two portal ad packages have the exact same core components, but they include different visual elements you can customize to change how these ad units look and feel within your experiences.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/monetization/immersive-ads/PortalAds-Sample1.png" width="80%" />
  </figure>
  <figure>
    <img src="../../assets/monetization/immersive-ads/PortalAds-Sample2.jpg" width="80%" />
  </figure>
</GridContainer>

To insert a portal ad:

1. Open the [Creator Store](../../production/publishing/creator-store.md).
   1. In the menu bar, navigate to the **View** tab.
   1. Select **Toolbox**. The [Toolbox](../../projects/assets/toolbox.md) window displays with the **Creator Store** tab open.
1. In the **Categories** section, click the **See&nbsp;All** button. All categories display.

   <img src="../../assets/studio/toolbox/Creator-Store-Categories-See-All.png" width="360" />

1. Click the **Ads** tile.

   <img src="../../assets/studio/toolbox/Creator-Store-Categories-Ads.png" width="200" />

1. Click any of the **Portal** template packages. The ad unit displays in the viewport.
1. **(Optional)** Customize the visual elements that surround the ad unit by modifying elements within the package's **Decorative** folder.

Once you publish the experience, users can see the ad unit in one of the following states:

<table>
<thead>
  <tr>
    <th>State</th>
    <th>Description</th>
    <th>Example</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Active**</td>
    <td>The ad unit is able to serve ads, and is currently serving an ad to a user.</td>
    <td><img src="../../assets/monetization/immersive-ads/PortalAds-Active.jpg" /></td>
  </tr>
  <tr>
    <td>**Inactive**</td>
    <td>The ad unit is able to serve ads, but it isn't currently serving an ad to a user because of one of the following reasons:<br></br><ul><li>The user is ineligible to see ads.</li><li>The user has seen too many ads in a short period of time.</li><li>There is low ad demand from advertisers during that time period.</li><li>There aren't any ads that target the user's criteria, such as their gender, device, or country.</li></ul><br></br>Roblox serves a default fallback image instead.</td>
    <td><img src="../../assets/monetization/immersive-ads/PortalAds-Inactive.png" /></td>
  </tr>
  <tr>
    <td>**Invalid**</td>
    <td>The ad unit isn't able to serve ads because it didn't meet the validation criteria. The block surface that serves ads turns black, and the door becomes a concrete wall.</td>
    <td><img src="../../assets/monetization/immersive-ads/PortalAds-Invalid.png" /></td>
  </tr>
</tbody>
</table>

## Removing Ad Units for Ineligible Users

Per Roblox's [Advertising Standards](https://en.help.roblox.com/hc/en-us/articles/13722260778260-Advertising-Standards), you must either hide, replace, or block ad content from users who are ineligible to see ads. By default, immersive ad units handle this by replacing ads with a fallback image of the Roblox logo for users ineligible to see ads. However, if you want to hide or remove the ad units entirely, you must use `Class.PolicyService:GetPolicyInfoForPlayerAsync()` to return an `AreAdsAllowed` boolean that determines the eligibility of each user who accesses your experience to see ads, then include logic to modify ad visibility to ineligible users.

For example, the following code sample uses `Class.PolicyService:GetPolicyInfoForPlayerAsync()` to check the eligibility of each user to see ads as they enter the experience. If `AreAdsAllowed` is true for a user, portal ads remain visible, but if it's false, the script destroys all of them. While this is a great strategy to remove ad content from users who are ineligible to see ads, it's important to note that destroying ad units may change your experience's gameplay if some users can see ad units while others cannot.

```lua
local Players = game:GetService("Players")
local PolicyService = game:GetService("PolicyService")
local Workspace = game:GetService("Workspace")

local player = Players.LocalPlayer
-- Sample assumes a "Main Portal Template" model exists under Workspace
local mainPortal = Workspace:WaitForChild("Main Portal Template")

-- Get the policy info for the user
	local success, result = pcall(PolicyService.GetPolicyInfoForPlayerAsync, PolicyService, player)
	if success and result then
		if not result.AreAdsAllowed then
			-- Destroy the "Main Portal Template" instance on the user's client if ads are not allowed
			mainPortal:Destroy()
		end
	else
		print("Failed to get policy for player", player.Name, "| Exception:", result)
	end
```

## Viewing Immersive Ad Metrics

Once you insert ad units into your experience, the [Creator Dashboard](https://create.roblox.com/dashboard/creations) generates different types of metrics graphs to help you analyze the overall performance of your immersive ads. After about 48 hours of having immersive ads run in your experience, you can see how many impressions and teleports you're generating through your user base, how each ad unit format performs, and how many Robux you're earning from individual ad units.

By tracking these trends over time, you can make strategic decisions on the number of ad units you include per place, which format of ad unit you want to prioritize, and where you can place individual ad units to generate impressions.

To view immersive ad metrics:

1. Navigate to your [Creations](https://create.roblox.com/dashboard/creations) page on the dashboard and select your experience.
1. Navigate to the **Monetization** tab and select **Immersive Ads**.

   <img src="../../assets/creator-dashboard/Experience-Nav-Monetization-Immersive-Ads.png" width="330" />

For information on each metrics graph, see the following table.

<table>
<thead>
  <tr>
    <th>Metric Graph</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Daily Earnings**</td>
    <td>Daily Robux amount earned from all immersive ads in this experience.</td>
  </tr>
  <tr>
    <td>**Daily Impressions**</td>
    <td>Daily amount of impressions from all image ad units in this experience.</td>
  </tr>
  <tr>
    <td>**Daily Teleports**</td>
    <td>Daily amount of teleports from all portal ad units in this experience.</td>
  </tr>
  <tr>
    <td>**Earnings Per Mille**</td>
    <td>Robux amount earned from every thousand impressions from image ad units in this experience.</td>
  </tr>
  <tr>
    <td>**Earnings Per Teleport**</td>
    <td>Robux amount earned from every teleport generated from portal ad units in this experience.</td>
  </tr>
  <tr>
    <td>**Estimated Earnings Per Ad Unit**</td>
    <td>Estimated Robux amount earned from each image and portal ad unit in this experience. If more than one ad unit has the same name, earnings are aggregated.</td>
  </tr>
  <tr>
    <td>**Impressions Per Ad Unit**</td>
    <td>Number of impressions from each ad unit in this experience. If more than one ad unit has the same name, then impressions are aggregated.</td>
  </tr>
  <tr>
    <td>**Teleports Per Ad Unit**</td>
    <td>Number of teleports from each portal ad unit in this experience. If more than one portal ad unit has the same name, then teleports are aggregated.</td>
  </tr>
</tbody>
</table>

 <img src="../../assets/monetization/immersive-ads/ViewingMetrics-Graph.png" width="100%" />

<Alert severity="info">
   Metrics graphs that report impressions and teleports per ad unit use each ad unit's name in Studio.
</Alert>

<Alert severity="warning">
   Roblox may make minor "over-delivery" adjustments to impressions or teleports for advertisers to account for potential invalid impressions or teleports, which may result in occasional changes in **Earnings per Mille** or **Earnings per Teleport** metrics.
</Alert>
