---
title: Engagement-Based Payouts
description: Engagement-based payouts allow you to earn Robux based on the share of time Roblox Premium members engage in your experience.
---

Automatic **engagement-based payouts** let you earn Robux based on the share of time that [Premium](https://www.roblox.com/premium/membership) members engage in an experience, regardless of the experience's size. These payouts are in addition to earnings from other [monetization](../../production/monetization/index.md) methods such as [Passes](../../production/monetization/game-passes.md).

To encourage Premium subscriber growth and increase your potential to earn engagement-based payouts, you can add the [Premium Purchase Modal](#premium-purchase-modal) directly into an experience.

<Alert severity="warning">
[Paid Access](../../production/monetization/paid-access.md) experiences are not eligible for engagement-based payouts.
</Alert>

## Accessing Payout Data

Payout data can provide vital feedback to help you understand what factors drive Premium subscribers to your experiences.

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations) and click the desired experience to view its details page.
1. In the left column, under **Analytics**, select **Developer&nbsp;Stats**.
1. In the top navigation, click the **ENGAGEMENT-BASED PAYOUTS** tab.

   <img src="../../assets/creator-dashboard/Developer-Stats-Tabs-Premium.png" width="780" alt="Engagement-based payouts tab on Developer Stats page of Creator Dashboard" />

### Premium Payout

The **Engagement-Based Payouts** chart tracks payout data based on the following metrics:

<Grid container spacing={0}>
	<Grid item xs={3} lg={2}>
		<img src="../../assets/monetization/engagement-based-payouts/Chart-Line-Orange.png" width="80%" />
	</Grid>
	<Grid item xs={9} lg={10}>
		**Premium Playtime Score** is the amount of time Premium subscribers engage with the experience per day. This metric can provide immediate feedback on the impact of new features you release.
	</Grid>
	<Grid item xs={3} lg={2}>
		<img src="../../assets/monetization/engagement-based-payouts/Chart-Line-Blue.png" width="80%" />
	</Grid>
	<Grid item xs={9} lg={10}>
		**Premium Playtime Robux Earned** is the amount you can expect to earn for Premium subscriber engagement. This is not based on the daily time Premium subscribers spend engaging with the experience; instead, this metric aggregates each user's behavior over the past 28 days. As such, even though they have similar trends, this metric has no direct mathematical relationship with the **Premium Playtime Score**.
	</Grid>
</Grid>

<img src="../../assets/monetization/engagement-based-payouts/Chart-Premium-Payout.png" width="800" alt="Example chart tracking engagement-based payout data" />

<Alert severity="info">
Note that the dotted "projected earnings" line becomes solid after the payout amount is final, at which point Roblox adds the payout to your **Pending Robux** amount [here](https://www.roblox.com/transactions).
</Alert><br />

### Premium Visits

The **Premium Visits** chart tracks how many visits are from Premium members. Using the dropdown menu, choose **Premium Visit Percentage**, **Premium Visits**, or **Total Visits**.

<img src="../../assets/monetization/engagement-based-payouts/Chart-Premium-Visits.png" width="800" alt="Example chart tracking how many visits are from Premium members" />

## Premium Purchase Modal

One strategy to increase engagement-based payouts is to encourage [Premium](https://www.roblox.com/premium/membership) upgrade through the **purchase modal**. Players can complete the purchase entirely within the experience and immediately receive both Premium status and their initial stipend of Robux.

<figure>
<img src="../../assets/monetization/engagement-based-payouts/Modal-Example.jpg" alt="Premium purchase modal within an experience" />
<figcaption>Premium purchase modal within an experience</figcaption>
</figure>

Remember that Premium membership should not be a "requirement" to enjoy an experience. When implementing incentives for Premium members, it's highly recommended that you follow these best practices:

- Honestly and accurately describe the benefits of upgrading within the experience's [description](../../production/publishing/publishing-experiences-and-places.md#experience-description).
- Do not promise Robux or other out-of-experience rewards that you don't control.
- Do not show the modal as a "paywall" when non-Premium members enter the experience.
- Consider offering exclusive [merch](../../resources/modules/merch-booth.md) to Premium members, but do not give them a tactical gameplay advantage over others, such as an array of ultra-powerful weapons that non-Premium members can't compete against.

### Checking Membership

Before scripting any logic related to Premium membership or [triggering the modal](#triggering-the-modal), check a user's `Class.Player.MembershipType|MembershipType` property to determine if they're already subscribed.

```lua
local Players = game:GetService("Players")

local player = Players.LocalPlayer

if player.MembershipType == Enum.MembershipType.Premium then
	-- Take some action specifically for Premium members
end
```

### Triggering the Modal

You can trigger the purchase modal with the `Class.MarketplaceService:PromptPremiumPurchase()|PromptPremiumPurchase()` method. For example, the following code prompts users to purchase Premium when their character touches the part that its containing `Class.Script` is attached to, such as a teleporter that allows access to an exclusive area.

```lua
local MarketplaceService = game:GetService("MarketplaceService")
local Players = game:GetService("Players")

local teleporter = script.Parent
local showModal = true

local TELEPORT_POSITION = Vector3.new(1200, 200, 60)

-- Teleport character to exclusive area
local function teleportPlayer(player)
	-- Request streaming around target location
	player:RequestStreamAroundAsync(TELEPORT_POSITION)

	-- Teleport character
	local character = player.Character
	if character and character.Parent then
		local currentPivot = character:GetPivot()
		character:PivotTo(currentPivot * CFrame.new(TELEPORT_POSITION))
	end
end

-- Detect character parts touching teleporter
teleporter.Touched:Connect(function(otherPart)
	local player = Players:GetPlayerFromCharacter(otherPart.Parent)
	if not player then return end

	if not player:GetAttribute("CharacterPartsTouching") then
		player:SetAttribute("CharacterPartsTouching", 0)
	end
	player:SetAttribute("CharacterPartsTouching", player:GetAttribute("CharacterPartsTouching") + 1)

	if player.MembershipType == Enum.MembershipType.Premium then
		-- User has Premium; teleport character to exclusive area within experience
		teleportPlayer(player)
	else
		-- Show purchase modal, using debounce to show once every few seconds at most
		if not showModal then return end
		showModal = false
		task.delay(5, function()
			showModal = true
		end)
		MarketplaceService:PromptPremiumPurchase(player)
	end
end)

-- Detect character parts exiting teleporter
teleporter.TouchEnded:Connect(function(otherPart)
	local player = Players:GetPlayerFromCharacter(otherPart.Parent)
	if player and player:GetAttribute("CharacterPartsTouching") then
		player:SetAttribute("CharacterPartsTouching", player:GetAttribute("CharacterPartsTouching") - 1)
	end
end)

-- Handle membership changed event
Players.PlayerMembershipChanged:Connect(function(player)
	warn("User membership changed; new membership is " .. tostring(player.MembershipType))

	-- Teleport character if membership type is Premium and character is on teleporter
	if player.MembershipType == Enum.MembershipType.Premium and player:GetAttribute("CharacterPartsTouching") > 0 then
		teleportPlayer(player)
	end
end)
```
