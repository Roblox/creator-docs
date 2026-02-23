---
title: Rewarded video ads
description: Immersive ads allow you insert ad units into your experience that programmatically serve ad content.
---

<iframe width="800" height="450" src="https://www.youtube-nocookie.com/embed/-HYByqvW2uc" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

<br /><br />

With rewarded video ads, you can implement a reward mechanism inside your experience to incentivize users to watch click-to-play video ads. A rewarded video is a full-screen ad that lasts anywhere from 6 to 30 seconds and that rewards the user with an item after they have finished watching it.

Rewarded video ads let you:

- Monetize a greater number of your users.
- Increase your ad revenue per user and bring in demand from hundreds of brands.
- Improve user playtime and deliver greater engagement from your experience.

Before implementing rewarded video ads, consider where inside your experience you want to place the ads, and which items you want to reward users with. Keep the following in mind:

- **Take advantage of high-traffic areas**: Your earnings from rewarded videos depend on the number of users in your experience who engage with ads. Place rewarded videos in lobbies or menus as a way to drive high traffic, as these are areas where users are most likely to engage when starting their gameplay.
- **Use natural gameplay breaks**: To avoid gameplay disruption, implement rewarded videos at natural gameplay breaks, like when users completes a level, before they start a challenge, or when they run out of lives or resources.
- **Boost discovery with prompts**: To make sure that users can find the rewarded video ad in your experience, use easy access reward prompts that are easily discoverable and that only require 1-2 clicks. Have a clear call-to-action (for example, "Watch this ad for 2x the coins!") to make the action obvious to users.
- **Offer meaningful rewards**: We recommend rewards that are equivalent to 3 to 10 Robux. Use items like boosters, in-game currency, extra lives, and temporary privileges.
- **Ensure compliance**: Clearly disclose to users that they are engaging with an ad, and explain what users have to do to receive the reward and what the reward is. Rewards for video ads **cannot** be randomized items.

## Implement rewarded video ads

<br /><br />

<iframe width="800" height="450" src="https://www.youtube-nocookie.com/embed/Jpj0VnA-jmI" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

<br /><br />

<Alert severity="warning">
  Rewards must be **developer products**. You can't reward users with Robux.
</Alert>

<Alert severity="warning">
  Video ads shouldn't negatively impact the user's character during gameplay. To make sure their character isn't harmed, you can pause damage while an ad plays or only show ads in safe zones like the experience lobby.
</Alert>

To implement rewarded video ads:

1. Make sure you meet the [eligibility requirements](#eligibility-requirements), including being 13+ years of age, having an ID-verified Roblox account, and have a public experience with at least 2 thousand unique visitors per month.
2. [Enable rewarded video ads in Studio](#video-ad-setup).
3. Choose the item you want to reward users with for watching the ad. You can select an existing developer product or create a brand new one.
4. Create [client-side](#client-side-implementation) and [server-side](#server-side-implementation) scripts. The client-side script checks if a video ad is available to be played to the user, while the server-side script turns a developer product into a reward, shows the user the video ad, and grants the user their reward.

After implementation, you can use [analytics](#analytics) to understand key metrics and optimize your rewarded video ad earnings.

<Alert severity="info">
  Earnings from rewarded video ads come from impressions. Your total earnings are calculated by multiplying EPM (earnings per 1000 impressions) by the total number of impressions.
</Alert>

### Video ad setup

To set up a rewarded video ad inside your experience:

1. In Studio, go to **File** ⟩ **Experience Settings** ⟩ **Monetization**.
2. Check the **Enable Rewarded Video Ads** checkbox.
  <img src="../../assets/promotion/ads-manager/EnableRewardedVideoAdsToggle.png" width="750" />
3. Select the reward you want to grant the user. If the reward doesn't already exist, [create a new developer product in the Creator Hub](../monetization/developer-products.md#create-a-developer-product). This developer product must have been created for the specific universe the place is in.
4. Insert a button that the user must press before the video ad starts playing.

### Client-side implementation

To implement the rewarded video ad on the client-side:

1. Add a new `Class.LocalScript` to the button you just inserted into your experience.
2. Use the `Class.AdService.GetAdAvailabilityNowAsync|GetAdAvailabilityNowAsync` method to make sure the button is only visible to the user if an ad is available.

```lua title="Code example for rewarded video ad (Client)"
-- Services
local AdService = game:GetService("AdService")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- StarterGui ⟩ ScreenGui ⟩ ShopFrame ⟩ RewardedAdButton
local PlayerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local ScreenGui = PlayerGui:WaitForChild("ScreenGui")
local ShopFrame = ScreenGui:WaitForChild("ShopFrame")
local RewardedAdButton = ShopFrame:WaitForChild("RewardedAdButton")

-- StarterGui ⟩ ScreenGui ⟩ OpenShopButton
local OpenShopButton = ScreenGui:WaitForChild("OpenShopButton")

-- Event to communicate between clients & server
local RewardedAdEvent = ReplicatedStorage:WaitForChild("RewardedAdEvent")

local INELIGIBLE_RESULTS = {
	Enum.AdAvailabilityResult.PlayerIneligible,
	Enum.AdAvailabilityResult.DeviceIneligible,
	Enum.AdAvailabilityResult.PublisherIneligible,
	Enum.AdAvailabilityResult.ExperienceIneligible,
}

local function isIneligible(result: Enum.AdAvailabilityResult)
	for _, inEligibleResult in ipairs(INELIGIBLE_RESULTS) do
		if result == inEligibleResult then
			return true
		end
	end

	return false
end

function checkForAds()
	local isSuccess, result = pcall(function()
		return AdService:GetAdAvailabilityNowAsync(Enum.AdFormat.RewardedVideo)
	end)


	if isSuccess and result.AdAvailabilityResult == Enum.AdAvailabilityResult.IsAvailable then
		RewardedAdButton.Visible = true
		return
	end

	if isIneligible(result.AdAvailabilityResult) then
		return
	end
end

RewardedAdEvent.OnClientEvent:Connect(function(isSuccess : boolean, result : Enum.ShowAdResult)
	if result == Enum.ShowAdResult.ShowCompleted then
		checkForAds()	
	end
end)

OpenShopButton.MouseButton1Click:Connect(function()
	if ShopFrame.Visible then
		ShopFrame.Visible = false
		return
	end

	ShopFrame.Visible = true
	checkForAds()
end)

RewardedAdButton.MouseButton1Click:Connect(function()
	RewardedAdButton.Visible = false
	RewardedAdEvent:FireServer()
end)
```

### Server-side implementation

To implement the rewarded video ad on the server-side:

1. Create a new `Class.Script` under **ServerScriptService**.
2. Use the `Class.AdService.CreateAdRewardFromDevProductId|CreateAdRewardFromDevProductId` method to pass the developer product ID of the reward and create an `AdReward` object.
3. Use the `Class.AdService.ShowRewardedVideoAdAsync|ShowRewardedVideoAdAsync` method to play the video ad to the user.
    - (Optional) Add a `placementId` to track individual [video ad placements](#placements) inside your experience.
4. Use the `Class.MarketplaceService.ProcessReceipt|ProcessReceipt` method to grant the user their reward if they have watched the entire video ad.

```lua title="Code example for rewarded video ad (Server)"
-- Services
local AdService = game:GetService("AdService")
local MarketplaceService = game:GetService("MarketplaceService")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local RewardedAdEvent = ReplicatedStorage:WaitForChild("RewardedAdEvent")

-- Provide a developer product ID for the video ad reward
-- This developer product must be created for the specific universe that this place is in
local DEV_PRODUCT_ID = 1919753834

RewardedAdEvent.OnServerEvent:Connect(function(player)
	local isSuccess, result = pcall(function()
		local reward = AdService:CreateAdRewardFromDevProductId(DEV_PRODUCT_ID)
		return AdService:ShowRewardedVideoAdAsync(player, reward)
	end)
	
	RewardedAdEvent:FireClient(player, isSuccess, result)
end)

MarketplaceService.ProcessReceipt = function(receiptInfo)
	local player = Players:GetPlayerByUserId(receiptInfo.PlayerId)
	if not player then
		return Enum.ProductPurchaseDecision.NotProcessedYet
	end

	if receiptInfo.ProductId == DEV_PRODUCT_ID then
		
    -- Include the logic for granting rewards here

		return Enum.ProductPurchaseDecision.PurchaseGranted
	end

	return Enum.ProductPurchaseDecision.NotProcessedYet
end
```

## Placements

Use placements to track the performance of individual rewarded video ads inside your experience.

To create a rewarded video ad placement:

1. In the Creator Dashboard, go to **Creations** and select an experience.
2. Go to **Monetization** ⟩ **Ads** ⟩ **Placements**.
3. Click **Create placement**.
4. Enter a name for the placement and click **Create**.

The new placement populates on the Placement table with a unique **Placement ID**. You can use this Placement ID in the `Class.AdService.ShowRewardedVideoAsync|ShowRewardedVideoAsync` method to differentiate between and track metrics for the individual video ads inside your experience.

## Ad opportunities

Use `Class.AdService.RegisterAdOpportunityAsync|RegisterAdOpportunityAsync` to track how many times a user has the opportunity to watch a rewarded video ad, and the rate at which they actually watch the video ad.

You can provide a Placement ID as an optional parameter to track metrics for individual ad opportunities in your experience.

```lua title="Code example for tracking ad opportunities"
local AdService = game:GetService("AdService")
local playerGui = game:GetService("Players").LocalPlayer:WaitForChild("PlayerGui")

-- Create the ScreenGui and the Button
local screenGui = Instance.new("ScreenGui", playerGui)
local adButton = Instance.new("TextButton", screenGui)

-- Register the button with AdService
local success, err = pcall(function()
	-- The second parameter is an optional Placement ID (Number) parameter generated in the Creator Hub.
	-- If you choose not to provide a Placement ID, the ad opportunity is tracked under the default placement.
	AdService:RegisterAdOpportunityAsync(adButton, 1234567891234567)
end)

if not success then
	warn("Failed to register ad opportunity:", err)
end
```

## Exclude likely spenders

Based on past behavior and purchasing habits, certain users are more likely to make purchases in your experience. To reduce your risk of losing revenue, you can exclude users who are likely to spend in your experience from seeing rewarded video ads.

We recommend that you only enable this setting if you plan to let users choose between watching a video ad and purchasing the reward from that ad. If the reward you're offering through the video ad is unique and isn't available for purchase, we recommend that you do not enable this setting.

To prevent likely spenders from seeing rewarded video ads:

1. In the Creator Dashboard, go to **Creations** and select an experience.
2. Go to **Monetization** ⟩ **Ads** ⟩ **Settings**.
3. Turn on the **Exclude your most likely purchasers from Rewarded Video Ads** toggle.

<img src="../../assets/monetization/rewarded-video-ads/LikelySpenders.png" width="80%" />

## Estimate potential earnings

Use the calculator to estimate your earnings before you implement rewarded videos ad in your experience.

Potential earnings are calculated by multiplying the number of ads-eligible users who have visited your experience in the last 7 days, the number of ads you might show per user, and your projected EPM (earnings per 1000 impressions).

Because the number of daily ad views per user is the main variable you can control when you implement rewarded video ads in your experience, you should design a user experience that naturally encourages users to watch ads. For example, if you want most users to watch at least one ad a day, make your ad placements accessible and easy to find. You can also boost daily views by offering rewards that feel valuable and connect to your core gameplay loop, keeping users engaged and boosting your total ad impressions.

To use the calculator:

1. In the Creator Dashboard, go to **Creations** and select an experience.
2. Go to **Monetization** ⟩ **Ads** ⟩ **Eligibility**.
3. Under **Ad format**, select **Rewarded video**.
4. Adjust the **daily ad views per user** slider. to update the **Weekly potential rewarded video ads earning** number and see potential earnings.

<img src="../../assets/monetization/rewarded-video-ads/OpportunityCalculator.png" width="80%" />

## Analytics

Use analytics metrics to evaluate the effectiveness of your rewarded video ads, test different reward types to identify the ones that best resonate with your audience, and measure how often users watch entire video ads to claim rewards.

To access your rewarded video ad metrics:

1. In the Creator Dashboard, go to **Creations** and select an experience.
2. Go to **Monetization** ⟩ **Ads** ⟩ **Analytics**.
3. Filter by **Rewarded Video** to see all of the available metrics.

<table>
<thead>
  <tr>
    <th>Metric</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Earnings (Robux)**</td>
    <td>Total revenue amount in Robux earned from rewarded video ads in your experience. <br /><br /> Different lines show you this metric for different ad placements inside the experience.</td>
  </tr>
  <tr>
    <td>**Monetization Funnel at Experience level**</td>
    <td>This metric shows you: <br /><br /> <ul><li>**Requested**: The number of ads requested by ads-eligible users in your experience.</li><li>**Filled**: The number of ads received by ads-eligible users in your experience.</li><li>**Ad Opportunities**: The number of opportunities users had to watch a video ad.</li><li>**Impressions**: The number of impressions from the video ads in your experience. The first frame of a video ad shown to a user counts as an impression.</li><li>**Rewarded**: The number of video ad rewards granted to users.</li></ul> </td>
  </tr>
  <tr>
    <td>**Fill Rate**</td>
    <td>The percentage of requests that had an ad returned as a reponse.</td>
  </tr>
  <tr>
    <td>**EPM (Earnings per Mille)**</td>
    <td>Your effective Robux earnings per thousand impressions. Calculated by total earnings / the number of impressions (in thousands) in your experience. <br /><br /> Different lines show you this metric for different ad placements inside the experience.</td>
  </tr>
  <tr>
    <td>**Ad Opportunities**</td>
    <td>The number of opportunities users had to watch a video ad. Use this metric to track how many times a user had the chance to watch a video ad and the rate at which they actually took that chance and watched the ad. <br /><br /> Different lines show you this metric for different ad placements inside the experience.</td>
  </tr>
  <tr>
    <td>**Impressions**</td>
    <td>The number of rewarded video ads shown in your experience. <br /><br /> Different lines show you this metric for different ad placements inside the experience.</td>
  </tr>
  <tr>
    <td>**Rewarded**</td>
    <td>The number of rewards granted for video ad views in your experience. <br /><br /> Different lines show you this metric for different ad placements inside the experience.</td>
  </tr>
  <tr>
    <td>**DUV (Daily Unique Viewers)**</td>
    <td>The number of unique users who have viewed one or more video ads in your experience in a day. A view is defined by an impression. <br /><br /> This data is updated with 1 day delay.</td>
  </tr>
  <tr>
    <td>**AEPDUV (Average Earning Per Daily Unique Viewer)**</td>
    <td>The earnings generated per daily unique viewer for rewarded video ads. <br /><br /> This data is updated with 1 day delay.</td>
  </tr>
  <tr>
    <td>**Eligible Daily Active User**</td>
    <td>The number of unique daily users to your experience who were eligible to view rewarded video ads. <br /><br /> This data is updated with 1 day delay.</td>
  </tr>
  <tr>
    <td>**DUV/eDAU**</td>
    <td>The percentage of ads-eligible users who visited your experience and viewed one or more video ads in a day.</td>
  </tr>
</tbody>
</table>

## Eligibility requirements

To prevent abuse of the rewarded ad system and to provide the best user experience possible, you must follow the eligibility requirements when you implement rewarded video ads.

<table>
<tbody>
  <tr>
    <th>**Experiences**</th>
    <td>Experiences must:<br/><br/><ul><li>Be public and unrestricted.</li><li>Offer no free-form user creation.</li><li>Have a complete **Maturity and Compliance Questionnaire** that has been reviewed and approved by Roblox. If the review status is **Pending**, you can request a re-review from the experience's advertising eligibility page under **Monetization** ⟩ **Ads** ⟩ **Eligiblity**. You'll receive a response within 24 hours.</li><li>Have an average of at least **2,000 unique visitors per month**.</li><li>Comply with the [Roblox terms of use](https://en.help.roblox.com/hc/en-us/articles/115004647846-Roblox-Terms-of-Use), [community standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards), and [publisher integrity requirements](https://en.help.roblox.com/hc/en-us/articles/13722260778260-Advertising-Standards#publisher-integrity).</li></ul></td>
  </tr>
  <tr>
    <th>**Publishers**</th>
    <td>As a publisher, you must:<br/><br/><ul><li>Be 13+ years of age.</li><li>Have an account that is in good standing with Roblox.</li><li>Have enabled two-step verification (2FA) and [verified your ID](../publishing/account-verification.md#verify-through-government-id) on your account.</li><li>Implement a clear action that the user has to take before the video ad is played for them. For example, a button that the user has to click.</li><li>Provide clear and accurate disclosures prior to each trigger of the video, including what the reward is and what the user is required to do to earn it. These disclosures must be unambiguous to the user. For example, you can add text that says “Watch the ad to earn 10 diamonds!” to the video ad play button.</li><li>Issue the reward to the user immediately after the rewarded video ad has finished playing.</li><li>Not force the user to initiate the video ad as a progress gate in the experience.</li><li>Not take over the user's screen visibility or obscure their avatar motion.</li><li>Not promote or implement fraudulent rewards, including free Robux or money, to deceptively incentivize the user to watch the video ad to completion. This also includes using inaccurate reward descriptions or implementing mechanisms that don't fulfill the reward promised to the user.</li></ul></td>
  </tr>
  <tr>
    <th>**Rewards**</th>
    <td>The reward for watching a video ad should:<br/><br/><ul><li>Be granted upon completion of a video ad view.</li><li>Be a developer product which would normally be available to purchase with Robux inside an in-experience shop.</li><li>Not inflate currency or unbalance the experience's economy.</li></ul>The right reward strategy is critical. See [Best practices](#best-practices) for more guidance on choosing the right reward for your video ad.</td>
  </tr>
</tbody>
</table>

<Alert severity="info">
  Resubmitting your **Maturity and Compliance Questionnaire** will temporarily remove your ads eligibility while the questionnaire is under review. To avoid repeated interruptions, only resubmit the questionnaire when you publish an experience update that changes your previous responses.
</Alert>

<Alert severity="warning">
  Any violation of the eligilibity requirements can result in account suspension, removal of content, revocation of ad payouts, or loss of eligibility to earn from ads.
</Alert>

## Best practices

To get the most out of your rewarded video ad, make sure to:

- Call `Class.AdService.GetAdAvailabilityNowAsync|GetAdAvailabilityNowAsync` as close as possible to the moment you plan to show the ad. For example, if you have a "Watch video ad to get a reward" button in a shop menu, you should only call `GetAdAvailabilityNowAsync` when the user opens the shop menu. This approach improves performance by preventing ads from unnecessarily being held in memory, and benefits CPM (cost-per-thousand impressions) and earnings by optimizing the ad fill rate.
- Call `Class.AdService.GetAdAvailabilityNowAsync|GetAdAvailabilityNowAsync` when the user finishes watching the ad to determine if another ad is available for the user to watch.
- Use analytics to identify the best placement for video ads to encourage user engagement without disrupting gameplay.
- Use ad opportunities to track when you offer a user a chance to watch a video ad for a reward. Keep an eye on the ratio between filled requests, ad opportunities, and ad impressions to figure out if you should make your ads easier to find or if your rewards need to be more compelling.

For the best reward strategy, we recommend that your rewards:

- Have prominent reward prompts to ensure all eligible users engage with the video.
- Be relevant to the gameplay and align with core experience mechanics. For example, extra lives in a battle experience or new customization options in a roleplaying game.
- Be scaled so that they remain valuable to users as they advance through the experience.
- Motivate the user by offering in-experience progression, collection, customization, or competition.
- Be offered at strategic moments, like after the user loses a life or after they complete a difficult level.
- Be offered at appropriate intervals to avoid making the reward so powerful that it trivializes in-experience progression.
- Be a limited-time or rare reward to increase engagement.
