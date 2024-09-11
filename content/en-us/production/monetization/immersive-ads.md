---
title: Immersive Ads
description: Immersive Ads allow you insert ad units into your experience that programmatically serve ad content.
---

The **Immersive Ads** system allows you to insert ad units into your experience that permit Roblox to programmatically serve ad content from advertisers to your active users. There are three ad formats that may be served in your experience:

- **Video Ads** — A video up to 30 seconds that users can watch in-experience, which can either be click-to-play or autoplaying.
- **Image Ads** — A static, non-clickable image within the 3D space.
- **Portal Ads** — A static, non-clickable image with a door that teleports users into an advertiser's experience.

<Alert severity="info">
   With Portal Ads, the advertiser's experience includes a button to return users back to your experience.
</Alert>

<GridContainer numColumns="2">
<figure>
    <iframe width="440" height="247" src="https://www.youtube-nocookie.com/embed/4P79zbwU9D8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    <figcaption>Video Ad Format (Autoplaying)</figcaption>
  </figure>
  <figure>
    <iframe width="440" height="247" src="https://www.youtube-nocookie.com/embed/JVjkzGIgoak" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    <figcaption>Video Ad Format (Click-to-play)</figcaption>
  </figure>
  <figure>
    <img src="../../assets/monetization/immersive-ads/Overview-ImageAd.jpg" />
    <figcaption>Image Ad Format</figcaption>
  </figure>
  <figure>
    <video controls src="../../assets/monetization/immersive-ads/Overview-PortalAd.mp4" width="90%"></video>
    <figcaption>Portal Ad Format</figcaption>
  </figure>
</GridContainer>

Ad content is specific to the user, meaning two users might simultaneously see different display ads or teleport to different advertiser experiences from the exact same ad unit. If a user is ineligible to see ads, ad units display either a customizable fallback image or the Roblox logo.

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

## Publisher Earnings From Immersive Ads

If your active users are eligible to see ads and meet the specific criteria from the advertiser, such as their country or device, you may be eligible to earn Robux according to how they interact with the ad content.

How publishers earn:

- For **video ads that are click-to-play**, users must click on the ad to initiate the video to start playing. Advertisers bid on a "15 second view". Therefore, publishers earn when a user watches a video for at least 15 seconds. Publishers can implement a reward mechanism to incentivize a user to watch the view for at least 15 seconds to drive earnings.

- For **video ads that are autoplay**, the video starts playing when a user looks at the ad and pauses when the user looks away. Advertisers bid on a video impression. Therefore, publishers earn for each video impression where an impression is when a user looks at the ad for at least 0.5 seconds, the ad occupies 1.5% of the viewport, the ad is viewed at an angle of up to 55 degrees, and with at least 50% of the video ads pixels visible.

- **Image ads** are static, non-clickable images within the 3D space. Advertisers bid on an image impression. Therefore, publishers earn for each image impression. An image impression is when a user looks at the ad for at least 1 second, the ad occupies 1.5% of the viewport, the ad is viewed at an angle of up to 55 degrees, and with at least 50% of image ad pixels visible.

- **Portal ads** are static, non-clickable images with a door that teleports users into an advertiser's experience. Advertisers bid on a teleport. Publishers earn for each successful teleport. A teleport is when a user enters the portal and arrives at the advertiser's experience.

To learn more about how advertisers are billed, you can refer to our overview on [ads billing](../promotion/ads-manager.md#ads-billing).

Roblox pays out earnings on the 25th of the following month from when you inserted ad units into your experience. For example, if you insert ad units during the month of March, your payout date for the viewable impressions and successful teleports from those ad units is April 25th. You can track your collective earnings from ad Immersive Ads either through the **My Transactions** or **Group Transactions** page. You can also analyze their overall performance through metrics graphs on the Creator Dashboard.

<Alert severity="warning">
   Roblox has ad fraud systems in place to create a positive advertiser, publisher, and user experience. Per Roblox's [Advertising Standards](https://en.help.roblox.com/hc/en-us/articles/13722260778260-Advertising-Standards), if you engage in malicious practices to inflate impressions or teleports, Roblox may deduct Robux from your expected payout or reclaim fraudulently earned Robux. In addition, Roblox may suspend your experience and/or account.
</Alert>

## Publisher Eligibility

<Alert severity="warning">
The following requirements take effect from June 1st, 2024.
</Alert>

While anyone can insert ad units into their experiences, Roblox only serves ads into ad units if the experience or group owner and experience is eligible to serve ads. In Creator Hub, you can see and manage your publisher eligibility status in a new "Eligibility" tab on the Immersive Ads page.

<img src="../../assets/creator-dashboard/Immersive-Ads-Eligibility.png" width = "80%"/>
<br />
Experiences must meet the following criteria to be eligible to be an ad publisher:

- Your account must have **2-factor authentication (2FA)** enabled.
  - For group-owned experiences, this requirement applies to the owner of the group.
  - If a publisher disables 2FA, they will lose eligibility.
- You must be **18+ years of age**.
  - For group-owned experiences, this requirement applies to the owner of the group.
- Your account must be **[ID verified](../publishing/account-verification.md)**.
  - For group-owned experiences, this requirement applies to the owner of the group.
  - Requirement is persistent - if a publisher disables identity verification, they will lose eligibility.
- Your experience must be **Public**. If a publisher makes the experience Private, the experience will lose eligibility.
- You must complete the **Experience Guidelines Questionnaire** for your experience.
- Your experience must maintain **2,000 unique visitors per month**.
  - This is calculated and updated monthly, based on visitor data.
  - Bots cannot be included in visitor counts.
- You must comply with the [Roblox Terms of Use](https://en.help.roblox.com/hc/en-us/articles/115004647846-Roblox-Terms-of-Use), the [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards), and the [Advertising Standards](https://en.help.roblox.com/hc/en-us/articles/13722260778260-Advertising-Standards#publisher-integrity).

<Alert severity="warning">

Publishers who do not comply with these requirements may lose their eligibility temporarily or permanently. In some cases, they may lose some or all ad payouts and may have their content or account suspended.

</Alert>

## User Eligibility

Even if your experience is eligible to serve ads, not all users are eligible to see ads, such as those under the age of 13 or users outside of a campaign's audience selection. If a user is ineligible to see ads, ad units display a fallback image of the Roblox logo to those ineligible users, but you can remove the ad units altogether as described in [Removing Ad Units for Ineligible Users](#removing-ad-units-for-ineligible-users).

## Inserting Ad Units

<iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/dlItlMLMDCE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<br /> <br />

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

### Video Ads

Eligible users can see two types of video ads within Roblox experiences, depending on how the advertiser bids:

- A **click-to-play** video ad is served when an advertiser bids on users viewing at least 15 seconds of the ad. Users initiate a video ad by clicking on the ad unit, which prompts the video to play in full-screen with sound on. Publishers are paid each time a video ad is watched for at least 15 seconds.
- An **autoplaying** video is served when an advertiser bids on users seeing their ad, and starts playing with the sound off when a user looks at it. If they look away, the video pauses. The video ad includes controls to unmute and expand to full screen. Publishers are paid based on the number of impressions the ad receives.

To insert a video ad:

1. From the [Home](../../studio/home-tab.md) or [Model](../../studio/model-tab.md) tab, insert a **Block** part into your experience.

   <img src="../../assets/studio/general/Home-Tab-Part-Tools.png" width="716" alt="Part menu indicated in Home tab" />

1. Scale the part to at least 8 studs wide and 4.5 studs tall, but no more than 32 studs wide and 18 studs tall.
1. In the [Explorer](../../studio/explorer.md) window, add an **AdGui** object to the part.
   1. Hover over the part and click the **&CirclePlus;** button. A contextual menu displays.
   1. From the menu, insert an **AdGui**.
1. In the [Properties](../../studio/properties.md) window, with the new **AdGui** selected, navigate to the **Face** property and choose a face, or keep the default face.
1. Ensure that the **EnableVideoAds** checkbox is enabled in order to show video ads. Otherwise, the unit will only show image ads.

To incentivize users to watch a click-to-play video ad for least 15 seconds, you may choose to implement a **reward mechanism** in your experience. A reward can only be given **once per ad rotation**, and ads rotate every 5 minutes. Choose an enticing reward, such as in-game currency or an in-game item, and ensure the reward is visible to users before they watch the ad. This can be through the UI or a sign next to the ad unit.

<Alert severity="info">
Click-to-play video ads are in closed beta with select advertisers and payouts may fluctuate as budgets stabilize. However, publishers that implement rewarded video are likely to earn higher payouts, since advertisers are willing to pay a premium for completed video views.
</Alert>

Implementing a reward for a video ad must be done in a `Class.Script` using `Enum.AdEventType`. The following sample creates a function to reward users who watch an ad to completion:

```lua title="Reward Mechanism for Video Ad"
local function grantReward(PlayerId)
   -- grant an in-game reward
end
local function showRewardPrompt(PlayerId)
   -- show Prompt
end
local function hideRewardPrompt(PlayerId)
   -- hide Prompt
end
local AdGui = script.Parent
AdGui.OnAdEvent = function(eventData)
   local AdEventType = eventData.AdEventType
   local PlayerId = eventData.PlayerId
   if AdEventType == Enum.AdEventType.RewardedAdLoaded then
       showRewardPrompt(PlayerId)
       return true
   elseif AdEventType == Enum.AdEventType.RewardedAdGrant then
       grantReward(PlayerId)
       hideRewardPrompt(PlayerId)
       return true
   elseif AdEventType == Enum.AdEventType.RewardedAdUnloaded then
       hideRewardPrompt(PlayerId)
       return true
   end
   return false
end
```

<Alert severity="warning">

Video ads should not be served when users are idle or away from keyboard (AFK). This may constitute ad fraud and may violate our Publisher Integrity requirements in the Advertising Standards.

</Alert>

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

   <img src="../../assets/studio/general/Home-Tab-Part-Tools.png" width="716" alt="Part menu indicated in Home tab" />

1. In the [Properties](../../studio/properties.md) window, navigate to the **Face** property and choose a face, or keep the default face.
1. Scale the part to at least 8 studs wide and 4.5 studs tall, but no more than 32 studs wide and 18 studs tall.
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

1. Open the Creator Store.
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

Once you insert ad units into your experience, the [Creator Dashboard](https://create.roblox.com/dashboard/creations) generates different types of metrics graphs to help you analyze the overall performance of your Immersive Ads. After about 48 hours of having Immersive Ads run in your experience, you can see how many video views, impressions, and teleports you're generating through your user base, how each ad unit format performs, and how many Robux you're earning from individual ad units.

By tracking these trends over time, you can make strategic decisions on the number of ad units you include per place, which format of ad unit you want to prioritize, and where you can place individual ad units to generate video views, impressions, and teleports.

To view Immersive Ad metrics:

1. Navigate to your [Creations](https://create.roblox.com/dashboard/creations) page on the dashboard and select your experience.
2. Navigate to the **Monetization** tab and select **Immersive Ads**.

   <img src="../../assets/creator-dashboard/Experience-Nav-Monetization-Immersive-Ads.png" width="330" />

<Alert severity="info">
   Metrics graphs that report impressions and teleports per ad unit use each ad unit's name in Studio.
</Alert>

<Alert severity="warning">
   Roblox may make minor "over-delivery" adjustments to impressions or teleports for advertisers to account for potential invalid video views, impressions, or teleports, which may result in occasional changes in **Earnings per Mille** or **Earnings per Teleport** metrics.
</Alert>
