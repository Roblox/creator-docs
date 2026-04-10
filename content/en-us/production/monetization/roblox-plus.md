---
title: Roblox Plus
description: Roblox Plus gives you additional ways to earn from your games by rewarding engagement and purchases from Plus subscribers.
---

<Alert severity="info">
Roblox Plus will become available to users starting on April 30, 2026.
</Alert>

**Roblox Plus** gives you additional ways to earn from your games by rewarding engagement and purchases from Plus subscribers.

Users who subscribe to Plus get a range of benefits to enhance their purchasing power, access, and overall game on the platform:

- **Discounted purchases**: Subscribers get 10% off eligible purchases, including in-game items, avatar items, and more. The discount increases to 20% starting in the third month. Roblox covers this discount for you.
- **Free paid private servers**: Subscribers get unlimited access to paid private servers at no cost. You're still compensated when they spend time in your paid private servers.
- **Free Robux transfers**: Subscribers can transfer Robux at no cost to sender or recipient. Transfers are subject to age restrictions and parental consent.
- [**Marketplace access**](../../marketplace/marketplace-policy.md#creator-requirements): Subscribers can trade and resell limited items, and publish and sell avatar items. Premium subscribers have the same Marketplace access.

For more information about the benefits of Roblox Plus to end-users, see the [help center](https://en.help.roblox.com/hc/en-us/articles/47967913158164-Roblox-Plus).

As a creator, you can earn from Roblox Plus subscribers through:

- [**In-game Robux purchases**](#earn-from-in-experience-purchases): Subscribers receive a 10–20% discount on purchases, which is covered by Roblox so that your earnings per purchase are not reduced. Lower prices can encourage more frequent purchases, helping increase your overall revenue.
- [**Driving Plus sign-ups**](#earn-from-in-experience-plus-subscriptions): Encourage engaged users to subscribe to Roblox Plus directly from your game using `Class.MarketplaceService.PromptRobloxSubscriptionPurchase|PromptRobloxSubscriptionPurchase`. You can earn up to 750 Robux for each new subscriber you bring in.
- [**Time spent in paid private servers**](#earn-from-paid-private-server-time): Earn up to 100 Robux per subscriber when they spend at least 60 minutes in your paid private servers each month.

## Earn from in-experience purchases

With Roblox Plus, users receive a 10–20% discount on eligible Robux purchases. Because Roblox subsidizes these discounts, you earn the same amount per purchase as you would from non-subscribers. At the same time, lower prices for Plus subscribers can encourage more frequent purchases and increase your overall revenue.

Subscribers receive a 10% discount for their first two months, which increases to 20% starting in the third month. If a user cancels their Plus subscription and later resubscribes, their discount resets to 10% and increases again after two months.

Eligible Robux purchases include:

- Developer products
- Game passes
- Developer subscriptions
- Paid access games
- Avatar items

Discounts do not apply to:

- Items priced above 1,000,000 Robux
- Marketplace publishing fees
- Ad credits
- Group fees

The following table shows how Roblox Plus discounts are subsidized by Roblox.

<table>
<thead>
  <tr>
    <td>**User type**</td>
    <td>**Item price in Robux**</td>
    <td>**User spend**</td>
    <td>**Roblox subsidy**</td>
    <td>**Creator earnings**</td>
    <td>**Effective revenue share**</td>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Non-subscriber</td>
    <td>100</td>
    <td>100</td>
    <td>—</td>
    <td>70</td>
    <td>70%</td>
  </tr>
  <tr>
    <td>Plus subscriber (10% discount)</td>
    <td>100</td>
    <td>90</td>
    <td>10</td>
    <td>70</td>
    <td>78%</td>
  </tr>
  <tr>
    <td>Plus subscriber (20% discount)</td>
    <td>100</td>
    <td>80</td>
    <td>20</td>
    <td>70</td>
    <td>88%</td>
  </tr>
</tbody>
</table>

<Alert severity="warning">
**If you hard-code prices, your in-game UI might display incorrect pricing to Plus subscribers.** While subscribers are still charged the discounted price, your game might show them the full price instead. This mismatch can cause confusion.

To display accurate, real-time pricing (including Plus discounts), you should use `Class.MarketplaceService` functions like `Class.MarketplaceService.GetProductInfoAsync|GetProductInfoAsync` and `Class.MarketplaceService.GetDeveloperProductsAsync|GetDeveloperProductsAsync`.

For implementation details, see [Sell a pass](./passes.md#sell-a-pass) and [Sell a developer product](./developer-products.md#sell-a-developer-product).
</Alert>

## Earn from in-experience Plus subscriptions

You can encourage users to subscribe to Roblox Plus directly from your game with `Class.MarketplaceService.PromptRobloxSubscriptionPurchase|PromptRobloxSubscriptionPurchase`. For each user who becomes a subscriber through your game, you earn **250 Robux per month for their first three consecutive months**, with up to **750 Robux for every newly acquired subscriber**.

<img src="../../assets/monetization/roblox-plus/Plus-Signup-Bonus.png" width="80%" />

<Alert severity="info">
Roblox Plus subscription prompts might appear in other places like paid private server pages or purchase modals, but you only earn a Robux payout when a user subscribes through your game using `PromptRobloxSubscriptionPurchase`.
</Alert>

To offer Plus subscriptions within your game and grant rewards to users:

1. Detect when the user reaches the point in your game where you want to offer the Plus subscription.
2. Check whether the user already has an active Plus subscription with `Class.Player.HasRobloxSubscription|HasRobloxSubscription`.
3. If the user is already a subscriber:
    1. Grant them the reward immediately.
4. If the user isn't a subscriber:
    1. Prompt them to purchase Roblox Plus with `Class.MarketplaceService.PromptRobloxSubscriptionPurchase|PromptRobloxSubscriptionPurchase`.
    2. Listen to `Class.MarketplaceService.PromptRobloxSubscriptionPurchaseFinished|PromptRobloxSubscriptionPurchaseFinished` to detect when the purchase prompt UI has closed.
    3. Confirm the Plus subscription on the server with `Class.Player.HasRobloxSubscription|HasRobloxSubscription` through the `Class.Instance.GetPropertyChangedSignal|GetPropertyChangedSignal` before granting any rewards. This event verifies that the user's Plus subscription status has actually changed.

### Examples

The following examples show how to work with Roblox Plus in your game, including retrieving discount information, checking subscription status, prompting users to subscribe, and handling the purchase flow.

<h5 style={{marginTop: '36px'}}>Example 1</h5>

Print Roblox Plus discount information for a game pass.

```lua
local MarketplaceService = game:GetService("MarketplaceService")

local PASS_ID = 12345678

local DiscountTypeDisplay = {
	RobloxPlusSubscription = "Roblox Plus Discount",
}

local productInfo = MarketplaceService:GetProductInfoAsync(PASS_ID, Enum.InfoType.GamePass)
print(string.format("Original Price: %d", productInfo.UserBasePriceInRobux))

for _, discount in ipairs(productInfo.PriceDiscountDetails) do
	local displayName = DiscountTypeDisplay[discount.Type] or "Other Discount"
	print(string.format("%s (%d%%): -%d", displayName, discount.Percent, discount.AmountInRobux))
end

print(string.format("You Pay: %d", productInfo.PriceInRobux))
```

<h5 style={{marginTop: '36px'}}>Example 2</h5>

Check whether a user has an active Roblox Plus subscription and perform actions based on their subscription status.

```lua
local MarketplaceService = game:GetService("MarketplaceService")
local player = game.Players.LocalPlayer

local success, details = pcall(function()
    return MarketplaceService:GetRobloxSubscriptionDetailsAsync(player)
end)

if success and details.IsSubscribed then
    -- Check the length of the user's Plus subscription
    local threeMonths = 60 * 24 * 60 * 60
    if details.StartTime and (os.time() - details.StartTime.UnixTimestamp) > threeMonths then
        print("Awarding the '3-Month Subscription Veteran' skin!")
    end

    -- Check if user subscribed through the game
    if details.IsOriginExperience then
        print("Attribution confirmed: User subscribed via this game.")
    else
        print("User subscribed elsewhere: Website or another game.")
    end
end
```

<h5 style={{marginTop: '36px'}}>Example 3</h5>

Prompt users to subscribe to Plus and handle the purchase flow in your game.

```lua
local MarketplaceService = game:GetService("MarketplaceService")
local Players = game:GetService("Players")

local teleporter = script.Parent
local showModal = true

local EXCLUSIVE_AREA_POSITION = Vector3.new(1200, 200, 60)

-- Grant the reward and teleport the subscribing user to the exclusive area
local function grantRewardAndTeleport(player)
	player:RequestStreamAroundAsync(EXCLUSIVE_AREA_POSITION)

	local character = player.Character
	if character and character.Parent then
		local currentPivot = character:GetPivot()
		character:PivotTo(currentPivot * CFrame.new(EXCLUSIVE_AREA_POSITION))
	end
end

-- Detect when the character touches the teleporter
teleporter.Touched:Connect(function(otherPart)
	local player = Players:GetPlayerFromCharacter(otherPart.Parent)
	if not player then
		return
	end

	if not player:GetAttribute("CharacterPartsTouching") then
		player:SetAttribute("CharacterPartsTouching", 0)
	end
	player:SetAttribute("CharacterPartsTouching", player:GetAttribute("CharacterPartsTouching") + 1)

	if player.HasRobloxSubscription then
		-- User already has Roblox Plus; grant the reward immediately
		grantRewardAndTeleport(player)
	else
		-- Prompt Roblox Plus subscription
		if not showModal then
			return
		end
		showModal = false
		task.delay(5, function()
			showModal = true
		end)
		MarketplaceService:PromptRobloxSubscriptionPurchase(player)
	end
end)

-- Detect when the character exits the teleporter
teleporter.TouchEnded:Connect(function(otherPart)
	local player = Players:GetPlayerFromCharacter(otherPart.Parent)
	if player and player:GetAttribute("CharacterPartsTouching") then
		player:SetAttribute("CharacterPartsTouching", player:GetAttribute("CharacterPartsTouching") - 1)
	end
end)

-- Grant the reward when the server confirms a membership change
-- Connect HasRobloxSubscription change for each player
Players.PlayerAdded:Connect(function(player)
	player:GetPropertyChangedSignal("HasRobloxSubscription"):Connect(function()
		if player.HasRobloxSubscription
			and player:GetAttribute("CharacterPartsTouching")
			and player:GetAttribute("CharacterPartsTouching") > 0
		then
			grantRewardAndTeleport(player)
		end
	end)
end)
```

<h5 style={{marginTop: '36px'}}>Example 4</h5>

Detect when the user closes the purchase prompt UI.

```lua
local MarketplaceService = game:GetService("MarketplaceService")

local function onPromptRobloxSubscriptionPurchaseFinished(player, didTryPurchasing)
	if didTryPurchasing then
		-- User attempted to subscribe; wait for HasRobloxSubscription change to confirm
		print(player.Name, "attempted to subscribe to Roblox Plus")
	else
		print(player.Name, "closed the Roblox Plus subscription prompt without purchasing")
	end
end

MarketplaceService.PromptRobloxSubscriptionPurchaseFinished:Connect(onPromptRobloxSubscriptionPurchaseFinished)
```

## Earn from paid private server time

Roblox Plus subscribers have free access to paid [private servers](./private-servers.md). To make sure that you still earn, Roblox compensates you when Plus subscribers spend time inside your paid private servers.

You can earn up to **100 Robux per user per server** when a Plus subscriber spends **at least 60 cumulative minutes over the last 30 days** in your paid private server.

On each successful Plus subscription renewal, Roblox evaluates that subscriber's paid private server usage over the previous 30 days. It then considers the **top five paid private servers** where the subscriber spent at least 60 minutes during that period. If your server qualifies, you earn based on the server price, up to a maximum of 100 Robux per user per server.

In the following example, Servers A, B, and C qualify because the Plus subscriber spent at least 60 minutes in each server during the last 30 days. Servers D and E don't qualify because they don't meet the 60-minute threshold. If all five servers (A–E) belong to the same game and represent the top five servers the subscriber spent time in, the creator earns a total of 205 Robux across the qualifying servers.

were from their game AND there were the top 5 servers the user was in.

<table>
<thead>
  <tr>
    <td>**game's paid private server**</td>
    <td>**Server price**</td>
    <td>**Cumulative time (30 days prior to renewal)**</td>
    <td>**Creator earnings**</td>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Server A</td>
    <td>100 Robux</td>
    <td>120 minutes</td>
    <td>70 Robux (70% revenue share on a 100 Robux server price)</td>
  </tr>
  <tr>
    <td>Server B</td>
    <td>200 Robux</td>
    <td>80 minutes</td>
    <td>100 Robux (70% revenue share on a 200 Robux server price, capped at 100 Robux)</td>
  </tr>
  <tr>
    <td>Server C</td>
    <td>50 Robux</td>
    <td>70 minutes</td>
    <td>35 Robux (70% revenue share on a 50 Robux server price)</td>
  </tr>
  <tr>
    <td>Server D</td>
    <td>60 Robux</td>
    <td>15 minutes</td>
    <td>Not eligible (less than 60 minutes)</td>
  </tr>
  <tr>
    <td>Server E</td>
    <td>70 Robux</td>
    <td>10 minutes</td>
    <td>Not eligible (less than 60 minutes)</td>
  </tr>
</tbody>
</table>

## Track your Plus earnings

You can track your earnings from users who subscribe to Roblox Plus through your in-game prompts, as well as from Plus subscribers who spend time in your paid private servers, whether they join from within your game or outside of it.

To see a detailed breakdown of your Plus subscription incentives:

1. In Creator Hub, go to **Creations** and select a game.
2. Go to **Monetization** ⟩ **Roblox Plus**.

<img src="../../assets/monetization/roblox-plus/Roblox-Plus-Analytics.png" width="90%" />
