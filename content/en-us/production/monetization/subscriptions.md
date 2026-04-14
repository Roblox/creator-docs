---
title: Subscriptions
description: Subscriptions within experiences let you offer users recurring benefits for a monthly fee.
---

**Subscriptions** within experiences let you offer users recurring benefits for a monthly fee. Subscriptions are similar to [passes](./passes.md), but while the benefits of a pass are granted indefinitely, the benefits of a subscription are contingent on the user paying a monthly fee.

Subscriptions on Roblox have the following characteristics:

- **Auto-renewal:** Subscriptions are auto-renewing, not one-time purchases, and can be priced in local currency or Robux.
- **Robux payout:** Whether a subscription is purchased in local currency or Robux, you receive the subscription revenue in Robux. For more details, see [Earn with subscriptions](#earn-with-subscriptions).
- **Single-tiered:** All subscriptions within an experience can be owned by users simultaneously. Mutually exclusive subscriptions are not supported.
- **Regional Pricing:** [Regional Pricing](./regional-pricing.md) is enabled by default for subscriptions sold in Robux and cannot be turned off. Regional Pricing is not available for subscriptions sold in local currency.

## Subscription guidelines

Before creating your subscriptions, make sure they align with [Roblox's Terms of Use](https://en.help.roblox.com/hc/articles/19694609252884/) and comply with local laws. Any experience that engages in scams, attempts to mislead users with false offerings, or otherwise violate our [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards) will be taken down.

You must also make sure your subscriptions follow these guidelines:

- **Provide clear, distinguishable subscription options:** Use short, succinct, and self-explanatory names that differentiate subscription options from one another. Specify the price and duration for each option when merchandising in-experience.
- **Offer the same benefits across platforms and devices:** Regardless of where the subscription was purchased, ensure the user receives the same benefits for any given subscription plan.
- **Design subscriptions to fit with each other and overall experience offerings:** Tiering of the same suite of benefits, like offering "Bronze," "Silver," and "Gold" tiers that are mutually exclusive, is not currently available. Ensure subscriptions represent distinct sets of benefits.
- **Offer the benefits for the full term of the subscription:** Once a subscription offering is live, honor the benefits described and do not revoke benefits behind the scenes.
- **Do not direct users to purchase on another platform (like mobile, web, etc.) in-experience:** While you are free to communicate with users off-platform, using the Roblox app to direct users to purchase elsewhere is prohibited.
- **Do not gate subscription benefits by additional requirements once a user has paid:** Requiring a user to perform additional tasks, such as posting to social media, to get access to benefits they have paid for is prohibited. This guideline does not impact battle passes, which you are allowed to both create and market as a subscription purchase.

## Robux vs local currency

Subscriptions can be priced in Robux or local currency. The following table compares the two payment options.

<table>
<thead>
  <tr>
    <th></th>
    <th>**Robux**</th>
    <th>**Local currency**</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Eligibility**</td>
    <td>All creators</td>
    <td>Requires an account [verified by ID or phone number](../publishing/account-verification.md)</td>
  </tr>
  <tr>
    <td>**Platforms**</td>
    <td>Available on all platforms</td>
    <td>Available on Web, App Store, and Google Play</td>
  </tr>
  <tr>
    <td>**Countries**</td>
    <td>Available in all countries that support Roblox</td>
    <td>Unavailable in Argentina, China, Colombia, India, Indonesia,<br/> Japan, Russia, Taiwan, T&uuml;rkiye (Turkey), UAE, Ukraine, and Vietnam</td>
  </tr>
  <tr>
    <td>**Price**</td>
    <td>Any amount equal to or greater than 49 Robux</td>
    <td>\$2.99, \$4.99, \$7.99, \$9.99, or \$14.99</td>
  </tr>
  <tr>
    <td>**Regional Pricing**</td>
    <td>Enabled by default</td>
    <td>Unavailable</td>
  </tr>
  <tr>
    <td>**Payouts**</td>
    <td>70% of subscription earnings each month</td>
    <td>70% in the first month, then 100% in subsequent months</td>
  </tr>
</tbody>
</table>

## Create subscriptions

To create a subscription:

1. Go to your experience in the [Creator Dashboard](https://create.roblox.com/) and select **Monetization** ⟩ **Subscriptions**.
2. Click **Create Subscription**.
3. Upload a cover image.
4. Enter a name that is unique. You cannot have two subscriptions with the same name in the same experience.
5. Enter a description that clearly describes the benefits you're offering.
6. Select one of the following payment options:
	- **Subscribers pay Robux:** Charge users the recurring subscription fee in Robux. If you select this option, you must enter a custom price greater than or equal to 49 Robux. [Regional Pricing](./regional-pricing.md) is enabled by default for the subscription and cannot be turned off.
	- **Subscribers pay local currency:** Charge users the recurring subscription fee in their local currency. If you select this option, you must choose a subscription price from the 5 available price tiers.
7. Select one of the following product types:
	- **Durable:** Permanent items that persist after use or acquisition, such as physical items like weapons. If a subscription includes a bundle of different types of goods, with one or more of them durable, such as a value pack with a sword and a potion, choose **Durable** as the product type.
	- **Consumable:** Temporary re-purchasable items that expire after use or acquisition, such as consumable potions that grant temporary boosts that expire over time.
	- **Currency:** Any medium of exchange that users can use to purchase items within your experience.
8. Click **Create Subscription**.

<Alert severity="info">
After creating a subscription, you can switch the payment type between Robux and local currency. This change does not affect users with existing subscriptions. New subscriptions will use the selected payment method at the time of purchase.
</Alert>

## Activate subscriptions

You can have up to **50 subscriptions** per experience between active and inactive subscriptions.

To put a subscription up for sale, click **&vellip;** next to the subscription you want to activate and select **Activate**. Active subscriptions are automatically available for sale in the **Store** tab of the experience details page, and can be added to your experience through `Class.MarketplaceService` functions.

Before activating your subscription for the first time, you must confirm a shortened version of your experience name. This shortened experience name is displayed to the user when they subscribe, and appears alongside the subscription name you created in [Create subscriptions](#create-subscriptions).

<Alert severity="warning">
Shortened experience names are permanent and cannot be changed when set. They do not change the name of your experience on Roblox.
</Alert>

### Subscription states

Subscriptions have two possible states:

- **Active:** Active subscriptions are available for sale, with subscribers able to renew their subscription at the start of the next period.
- **Inactive:** Inactive subscriptions are unavailable for sale.

To change a subscription's state, click **&ctdot;** at the top right corner of the subscription tile and select **Activate** (if the subscription is currently inactive) or **Take Off Sale** (if the subscription is currently active).

If you select **Take Off Sale**, you'll be given the option to either let existing subscribers renew their subscription, or to cancel future renewals for current subscribers. If you're not planning to permanently remove the associated subscription benefits from your experience, we recommend that you let existing subscribers renew their subscription.

## Edit subscriptions

The fields you can edit depend on the payment method.

<table>
  <thead>
    <tr>
      <th>Editable field</th>
      <th>Subscriptions sold in Robux</th>
      <th>Subscriptions sold in local currency</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Cover image</td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Name</td>
      <td>No</td>
      <td>No</td>
    </tr>
    <tr>
      <td>Description</td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Payment method</td>
      <td>Yes (can switch to local currency)</td>
      <td>Yes (can switch to Robux)</td>
    </tr>
    <tr>
      <td>Price</td>
      <td>Yes (once every 60 days)</td>
      <td>No</td>
    </tr>
    <tr>
      <td>Product type</td>
      <td>No</td>
      <td>No</td>
    </tr>
    <tr>
      <td>Active state</td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>
  </tbody>
</table>

Changing the payment method only affects new subscriptions. Existing subscribers remain on their original payment method and must cancel and resubscribe to switch.

You can update the price of a subscription sold in Robux at most once every 60 days. For price increases, the new price only takes effect after users receive at least 30 days' notice from Roblox.

You **cannot** change the price of subscriptions sold in local currency. To update the price, you must delete and recreate the subscription.

## Delete subscriptions

<Alert severity="warning">
If you delete a subscription in local currency, you must refund all currently subscribed users. Refunds are not available for subscriptions in Robux.
</Alert>

To delete a subscription, click **&vellip;** next to the subscription you want to delete and select **Delete**.

Deleting an active subscription results in full refunds for active subscribers and zero Robux for you. In most situations, if you want to delete a subscription, we recommend that you take it off sale first, select the option to cancel all renewals, and wait for the current period to conclude.

Deleting a subscription requires the last four digits of the subscription ID for confirmation.

## Integrate subscriptions into an experience

### Check a user's subscription status

The following code sample implements subscription detection in your experience:

```lua
-- Run this code on the server
local MarketplaceService = game:GetService("MarketplaceService")
local Players = game:GetService("Players")

local SUBSCRIPTION_ID = "EXP-11111111" -- Replace with your subscription ID

local function grantAward(player: Player)
	-- You should grant the award associated with the subscription here
end

local function revokeAwardIfGranted(player: Player)
	-- This method is called for every player who does _not_ have the subscription
    -- If your code saves subscriptions to Data Stores or provides some benefit that needs to be 'revoked'
    -- you should use this method to handle the revocation
end

local function checkSubStatus(player)
	local success, response = pcall(function()
		return MarketplaceService:GetUserSubscriptionStatusAsync(player, SUBSCRIPTION_ID)
	end)

	if not success then
		warn(`Error while checking if player has subscription: {response}`)
		return
	end

	if response.IsSubscribed then
		grantAward(player)
	else
		revokeAwardIfGranted(player)
	end
end

local function onUserSubscriptionStatusChanged(player: Player, subscriptionId: string)
	if subscriptionId == SUBSCRIPTION_ID then
		checkSubStatus(player)
	end
end

Players.PlayerAdded:Connect(checkSubStatus)
Players.UserSubscriptionStatusChanged:Connect(onUserSubscriptionStatusChanged)
```

### Replace a pass with a subscription

One option for rolling out subscriptions in your experience is to replace an existing pass with a subscription. This is a great option if you want to quickly implement subscriptions without adding new features or awards.

When replacing a pass with a subscription, keep the following in mind:

- Any existing holders of the pass should continue to receive the benefit they paid for.
- The pass should be taken off sale so that new users can purchase the subscription instead.
- Subscriptions can be revoked, which means if your pass previously persisted its benefits to a data store, you need to "undo" these benefits. This consideration does not apply to all pass implementations, but might apply to more complex ones.

The following code sample replaces a pass with a subscription:

```lua
-- Run this code on the server
local MarketplaceService = game:GetService("MarketplaceService")
local Players = game:GetService("Players")

local LEGACY_GAME_PASS_ID = 1234 -- Replace with the ID of the pass being replaced by a subscription
local SUBSCRIPTION_ID = "EXP-11111111" -- Replace with your subscription ID

local function awardBenefit(player: Player)
	-- You should award the subscription here
end

local function revokeBenefitIfGranted(player: Player)
	-- This method is called for every player who does _not_ have the subscription
    -- If your code saves subscriptions to Data Stores or provides some benefit that needs to be 'revoked'
    -- you should use this method to handle the revocation
end

local function checkSubscriptionStatus(player: Player)
	local success, result = pcall(function()
		return MarketplaceService:GetUserSubscriptionStatusAsync(player, SUBSCRIPTION_ID)
	end)

	if not success then
		print(`Error fetching subscription status: {result}`)
		return
	end

	if result.IsSubscribed then
		awardBenefit(player)
	else
		revokeBenefitIfGranted(player)
	end
end

local function onPlayerAdded(player: Player)
	local success, result = pcall(function()
		return MarketplaceService:UserOwnsGamePassAsync(player.UserId, LEGACY_GAME_PASS_ID)
	end)

	if not success then
		print(`Error fetching pass status: {result}`)
		return
	end

	if result then
		-- If the player has purchased the legacy pass, we do not need to look up their subscription status
		-- as they have the benefit granted for life
		awardBenefit(player)
		return
	end

	checkSubscriptionStatus(player)
end

local function onUserSubscriptionStatusChanged(player: Player, subscriptionId: string)
	if subscriptionId == SUBSCRIPTION_ID then
		checkSubscriptionStatus(player)
	end
end


local function onPromptGamePassPurchaseFinished(player: Player, purchasedPassID: number, purchaseSuccess: boolean)
	if purchaseSuccess and purchasedPassID == LEGACY_GAME_PASS_ID then
		awardBenefit(player)
	end
end

Players.PlayerAdded:Connect(onPlayerAdded)
Players.UserSubscriptionStatusChanged:Connect(onUserSubscriptionStatusChanged)
-- We will continue to listen for pass purchases in case the pass is still on sale
MarketplaceService.PromptGamePassPurchaseFinished:Connect(onPromptGamePassPurchaseFinished)
```

### Prompt subscription purchases

Users can purchase subscriptions directly from the **Store** tab of your experience details page, but you should also add a way for them to purchase subscriptions in-game.

When you prompt a subscription purchase, `Class.Players.UserSubscriptionStatusChanged|UserSubscriptionStatusChanged` fires if the player already owns the subscription, which helps catch scenarios where a player purchases a subscription from the **Store** tab of your experience details page while they are already in-game.

Although you can prompt a subscription purchase from the client, checking if a user already has a subscription with `Class.MarketplaceService.GetUserSubscriptionStatusAsync|GetUserSubscriptionStatusAsync` must be done from the server.

<Alert severity="warning">
When adding subscriptions to your experience, make sure to only offer them in supported regions and platforms. If not, users in unsupported regions and platforms will be able to see the offering but will be unable to complete the purchase.
</Alert>

The following code sample creates a `RemoteFunction` that the client can use to request the status of a subscription:

```lua
--This code should run on the server
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- Create a RemoteFunction that the client can use to request the subscription status
local getSubscriptionStatusRemote = Instance.new("RemoteFunction")
getSubscriptionStatusRemote.Name = "GetSubscriptionStatus"
getSubscriptionStatusRemote.Parent = ReplicatedStorage

getSubscriptionStatusRemote.OnServerInvoke = function(player: Player, subscriptionId: string)
	assert(typeof(subscriptionId) == "string")

	return MarketplaceService:GetUserSubscriptionStatusAsync(player, subscriptionId)
end
```

```lua
-- This code should run on the client
local MarketplaceService = game:GetService("MarketplaceService")
local Players = game:GetService("Players")

local SUBSCRIPTION_ID = "EXP-11111111" -- Replace with your subscription ID

local getSubscriptionStatusRemote = ReplicatedStorage:WaitForChild("GetSubscriptionStatus")
local purchaseSubscriptionButton = script.Parent.PromptPurchaseSubscription -- Replace with your button


local function playerHasSubscription()
    -- Note if your subscription is replacing a pass, you will need to check if the pass is owned here too

	local success, result = pcall(function()
		return getSubscriptionStatusRemote:InvokeServer(SUBSCRIPTION_ID)
	end)

	if not success then
		print(`Error fetching subscription status: {result}`)
		return
	end

    return result.IsSubscribed
end

-- Hides the button if the player already has the subscription
local function hideButtonIfPlayerHasSubscription()
    if playerHasSubscription() then
        purchaseSubscriptionButton.Visible = false
    end
end

local function onPromptSubscriptionPurchaseFinished(player: Player, subscriptionId: string, didTryPurchasing: boolean)
    if didTryPurchasing then
        -- It can take a while for the subscription to be registered, so we will check to see if the purchase went through in 10 seconds
        -- and hide the button if it has
        task.delay(10, hideButtonIfPlayerHasSubscription)
    end
end

-- If the player already has the subscription, we don't want to show the button at all
hideButtonIfPlayerHasSubscription()

purchaseSubscriptionButton.Activated:Connect(function()
    MarketplaceService:PromptSubscriptionPurchase(Players.LocalPlayer, SUBSCRIPTION_ID)

    -- If the player already has the subscription, hide the button
    hideButtonIfPlayerHasSubscription()
end)

MarketplaceService.PromptSubscriptionPurchaseFinished:Connect(onPromptSubscriptionPurchaseFinished)
```

### Other relevant functions

Other relevant functions available in `Class.MarketplaceService` are:

- `Class.MarketplaceService:GetSubscriptionProductInfoAsync()|GetSubscriptionProductInfoAsync`, which returns the product information of a subscription. Includes whether the subscription is priced in Robux or local currency.
- `Class.MarketplaceService:GetUserSubscriptionPaymentHistoryAsync()|GetUserSubscriptionPaymentHistoryAsync`, which returns a user's subscription payment history.
- `Class.MarketplaceService:GetUserSubscriptionStatusAsync()|GetUserSubscriptionStatusAsync`, which returns a user's subscription status.

## Earn with subscriptions

For **subscriptions priced in local currency**, you earn Robux at a rate of US \$0.01 to 1 Robux according to the base platform price you selected, after platform fees. You earn **70% of the subscription value in the first month**, and **100% from the second month onward**. This revenue split is consistent across all platforms.

For example, if your monthly subscription is priced at USD \$5:

- **First month:** You earn 350 Robux (`500 * 0.7 = 350`)
- **Second month onward:** You earn the full amount of 500 Robux (`500 * 1.0 = 500`)

For **subscriptions priced in Robux**, you earn **70% of the subscription value every month**. This revenue split is consistent across all platforms.

For example, if your monthly subscription is priced at 500 Robux:

- **First month:** You earn 350 Robux (`500 * 0.7 = 350`)
- **Second month onward:** You continue to earn 350 Robux (`500 * 0.7 = 350`)

Earnings from subscriptions in local currency are subject to a 30-day hold period and will be added to your Robux balance after the full term of the subscription has been delivered.

Earnings from subscriptions in Robux follow the same hold period as passes and developer products, which is approximately 5 days.

<Alert severity="warning">
Subscriptions are currently ineligible to be cross-sold by other experiences and are ineligible for affiliate fees.
</Alert>

### Refunds

<Alert severity="info">
Subscriptions purchased with Robux are not eligible for refunds.
</Alert>

For subscriptions in local currency, if a user requests a refund through their bank or app store within the 30-day hold period, the hold will be canceled and you will not receive the payout for that transaction.

Refunds received outside the hold window will result in the payout amount for the refunded transaction being deducted from your Robux balance. If your experience is owned by a Group and the Group's balance is less than the amount to be deducted, the remainder will be deducted from the Group Owner's Robux balance.

When users cancel or fail to renew their active subscriptions, they do not automatically receive refunds. They must manually request refunds, which are handled on a case-by-case basis. For more information on the user subscription refund process, check out the [help center](https://en.help.roblox.com/hc/en-us/articles/20292312961556-Getting-Started-How-To-Subscribe).

### Payouts

You can find your subscription payouts in **Robux Balance** ⟩ **My Transactions**.

**Subscription** and **Group Subscription** payouts appear under **Incoming** Robux, while refunds are grouped under **Outgoing** Robux as a **Payout Reversal**. The subscriptions and group subscriptions subpages provide additional information for their respective categories.

<img src="../../assets/monetization/subscriptions/subscriptions-pay-out.png" width="80%"/>

To view refunding information for individual users, use `Class.MarketplaceService:GetUserSubscriptionPaymentHistoryAsync()|GetUserSubscriptionPaymentHistoryAsync`.

## Subscription analytics

**Subscription analytics** help you gauge the success of individual subscriptions, identify trends, and forecast potential future earnings. Subscriptions are added to the subscriptions analytics page after the first time they're activated and are not removed when they're deactivated or deleted. You can access ready-made analytics through the Creator Dashboard, or you can capture subscription updates in real time using webhooks.

### Through the Creator Dashboard

To access subscription analytics on the Creator Dashboard:

1. Go to your [Creations](https://create.roblox.com/dashboard/creations) page on **Creator Dashboard** and select your experience.
2. Go to **Monetization** ⟩ **Subscriptions**.
3. Select the **Analytics** tab.

Subscription analytics track the following metrics:

- **Subscriptions:** The total amount of active subscriptions in your experience.
- **Estimated revenue:** The net revenue earned by experiences after fees. Does not include refund information.
- **Subscriber breakdown:** The different types of subscribers.
  - **New**: The number of subscription purchases by first-time subscribers.
  - **Renewed**: The number of renewing subscriptions purchased in a prior period.
  - **Resurrected**: The number of new subscriptions purchased by users who had previously canceled.
- **Cancellations**: The number of subscriptions that were not renewed. This includes all cancellations regardless of trigger, be it user cancellation, subscription deactivation by the creator, or by other means.
  - Cancellations are different from refunds. Cancelled subscriptions are subscriptions that will no longer renew but are paid in full for the remainder of the billing cycle, whereas refunds return the paid subscription amount to the user.
- **Subscriptions by platform**: The number of subscriptions purchased on each platform.
- **Platform earnings**: The net revenue earned through subscriptions purchased on each platform.

This information is visible in the form of charts based on a date range under the **Trends** tab, and as a comprehensive list of total subscriptions offered under the **History** tab.

<img src="../../assets/monetization/subscriptions/subscriptions-analytics.png" width="100%"/>

### Through webhooks

The Cloud API Webhook feature includes triggers for four subscription events: cancelled, purchased, refunded and renewed. These notifications fire immediately, so you can respond in real time or create your own custom analytics. For more information on how to set up a webhook, see [Webhook notifications](../../cloud/webhooks/webhook-notifications.md).
