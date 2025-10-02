---
title: Rewarded video ads
description: Immersive ads allow you insert ad units into your experience that programmatically serve ad content.
---

<iframe width="800" height="450" src="https://www.youtube-nocookie.com/embed/Jpj0VnA-jmI" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br /><br />

With rewarded video ads, you can implement a reward mechanism inside your experience to incentivize users to watch click-to-play video ads.

## Implement rewarded video ads

<Alert severity="warning">
  Rewards must be **developer products**. You can't reward users with Robux.
</Alert>

<Alert severity="warning">
  Video ads shouldn't negatively impact the user's character during gameplay. To make sure their character isn't harmed, you can pause damage while an ad plays or only show ads in safe zones like the experience lobby.
</Alert>

To implement a rewarded video ad, you must set up the video ad inside your experience and then create client-side and server-side scripts. The client-side script checks if a video ad is available to be played to the user, while the server-side script turns a developer product into a reward, shows the user the video ad, and grants the user their reward.

<Alert severity="info">
  Earnings from rewarded video ads come from impressions. Your total earnings are calculated by multiplying EPM (earnings per 1000 impressions) by the total number of impressions.
</Alert>

### Video ad setup

To set up a rewarded video ad inside your experience:

1. In Studio, go to **Game Settings** ⟩ **Monetization**.
2. Check the **Enable Rewarded Video Ads** checkbox.
  <img src="../../assets/promotion/ads-manager/EnableRewardedVideoAdsToggle.png" width="750" alt="The default Roblox matchmaking flow." />
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
3. Click **Create Placement**.
4. Enter a name for the placement and click **Create**.

The new placement populates on the Placement table with a unique **Placement ID**. You can use this Placement ID in the `Class.AdService.ShowRewardedVideoAsync|ShowRewardedVideoAsync` method to differentiate between and track metrics for the individual video ads inside your experience.

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
    <td>This metric shows you: <br /><br /> <ul><li>**Requested**: The number of ads requested in your experience.</li><li>**Filled/Number of fills**: The number of ads received in your experience.</li><li>**Impression**: The number of impressions from the video ads in your experience. The first frame of a video ad shown to a user counts as an impression.</li><li>**Rewarded/Number of rewards**: The number of video ad rewards granted to users.</li></ul> </td>
  </tr>
  <tr>
    <td>**Fill Rate**</td>
    <td>The percentage of requests that had an ad returned as a reponse.</td>
  </tr>
  <tr>
    <td>**EPM (Robux Earnings per Mille)**</td>
    <td>Your effective Robux earnings per thousand impressions. Calculated by total earnings / the number of impressions (in thousands) in your experience. <br /><br /> Different lines show you this metric for different ad placements inside the experience.</td>
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
    <td>**AEPDUV (Average Earnings Per Daily Uniquer Viewers)**</td>
    <td>The earnings generated per daily unique viewer for rewarded video ads. <br /><br /> This data is updated with 1 day delay.</td>
  </tr>
  <tr>
    <td>**Eligible Daily Active Users**</td>
    <td>The number of unique daily visitors to your experience who were eligible to see Rewarded Video ads. <br /><br /> This data is updated with 1 day delay.</td>
  </tr>
  <tr>
    <td>**DUV/eDAU (Daily Unique Viewers/Eligible Daily Active Users)**</td>
    <td>The percent of ads eligible visitors to your experience, known as Eligible Daily Active Users, who saw at least one ad on a day. <br /><br /> This data is updated with 1 day delay.</td>
  </tr>
</tbody>
</table>

## Eligibility requirements

To prevent abuse of the rewarded ad system and to provide the best user experience possible, you must follow the eligibility requirements when you implement rewarded video ads.

<table>
<tbody>
  <tr>
    <th>**Experiences**</th>
    <td>To offer rewarded video ads, your experience must:<br/><br/><ul><li>Have had an average of at least 100 thousand daily active users (DAU) over the past 28 days.</li><li>Have a content maturity label of Minimal or Mild.</li><li>Offer no free-form user creation.</li><li>Meet the [Roblox community standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards).</li><li>Comply with the [publisher integrity requirements](https://en.help.roblox.com/hc/en-us/articles/13722260778260-Advertising-Standards#publisher-integrity) in the Roblox advertising standards.</li></ul></td>
  </tr>
  <tr>
    <th>**Publishers**</th>
    <td>To implement rewarded video ads, you must:<br/><br/><ul><li>Have an account that is in good standing with Roblox.</li><li>Implement a clear action that the user has to take before the video ad is played for them. For example, a button that the user has to click.</li><li>Provide clear and accurate disclosures prior to each trigger of the video, including what the reward is and what the user is required to do to earn it. These disclosures must be unambiguous to the user. For example, you can add text that says “Watch the ad to earn 10 diamonds!” to the video ad play button.</li><li>Issue the reward to the user immediately after the rewarded video ad has finished playing.</li><li>Not force the user to initiate the video ad as a progress gate in the experience.</li><li>Not take over the user's screen visibility or obscure their avatar motion.</li><li>Not promote or implement fraudulent rewards, including free Robux or money, to deceptively incentivize the user to watch the video ad to completion. This also includes using inaccurate reward descriptions or implementing mechanisms that don't fulfill the reward promised to the user.</li></ul></td>
  </tr>
  <tr>
    <th>**Rewards**</th>
    <td>The reward for watching a video ad should:<br/><br/><ul><li>Be relevant to the gameplay and align with core game mechanics. For example, extra lives in a battle game or new customization options in a roleplaying game.</li><li>Motivate the user by offering in-experience progression, collection, customization, or competition.</li><li>Be offered as an alternative to the user paying for the developer product with Robux inside an in-experience shop.</li><li>Be offered at strategic moments, like after the user loses a life or after they complete a difficult level.</li><li>Be offered at appropriate intervals to avoid making the reward so powerful that it trivializes in-experience progression.</li><li>Be a limited-time or rare reward to increase engagement.</li><li>Not inflate currency or unbalance the game economy.</li></ul></td>
  </tr>
</tbody>
</table>

Any violation of the eligilibity requirements can result in account suspension, removal of content, revocation of ad payouts, or loss of eligibility to earn from ads.

## Best practices

To get the most out of your rewarded video ad, make sure to:

- Call `Class.AdService.GetAdAvailabilityNowAsync|GetAdAvailabilityNowAsync` as close as possible to the moment you plan to show the ad. For example, if you have a "Watch video ad to get a reward" button in a shop menu, you should only call `GetAdAvailabilityNowAsync` when the user opens the shop menu. This approach improves performance by preventing ads from unnecessarily being held in memory, and benefits CPM (cost-per-thousand impressions) and earnings by optimizing the ad fill rate.
- Call `Class.AdService.GetAdAvailabilityNowAsync|GetAdAvailabilityNowAsync` when the user finishes watching the ad to determine if another ad is available for the user to watch.
- Scale rewards so that they remain valuable to your users as they advance through the experience.
- Adjust the frequency of rewards based on user engagement and feedback.
- Use analytics to identify the best placement for video ads to encourage user engagement without disrupting gameplay.
