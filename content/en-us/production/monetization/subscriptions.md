---
title: Subscriptions
description: Subscriptions within experiences let you offer users recurring benefits for a monthly fee.
---

**Subscriptions** within experiences let you offer users recurring benefits for a monthly fee. Similar to [passes](./passes.md), the major difference between subscriptions and passes is that the benefits of a pass are granted in perpetuity, while the benefits of a subscription are contingent on the user paying a monthly fee. Subscriptions on Roblox have the following characteristics:

- **Auto-renewal:** Subscriptions are auto-renewing, not one-time purchases, and are priced in local currency.
- **Robux payout:** You receive subscription revenue in Robux. For more details, see [Earn with subscriptions](#earn-with-subscriptions).
- **Single-tiered:** All subscriptions within an experience can be owned by users simultaneously. Mutually exclusive subscriptions are not supported.

Users can purchase subscriptions on the desktop app or website using Roblox gift card credit or a credit or debit card, and through payment methods on the Apple and Google stores in qualifying regions. Users can view and manage their subscription purchases in the **Subscriptions** tab in their Roblox account settings.

Subscriptions will be rolled out to more regions in the future.

**Unavailable regions include:** Argentina, Colombia, India, Indonesia, Japan, Russia, Taiwan, Türkiye (Turkey), UAE, Ukraine, and Vietnam.

<Alert severity="info">
To learn how to design subscriptions for your experience, see [Subscription Design](../../production/game-design/subscription-design.md). For a reference on how to implement subscriptions into your experience's monetization strategy, see this [implementation example](https://devforum.roblox.com/t/subscriptions-within-experiences-livetopia-implementation/2710072).
</Alert>

## Subscription guidelines

Before creating your subscriptions, ensure they align with [Roblox's Terms of Use](https://en.help.roblox.com/hc/articles/19694609252884/) and comply with local laws. Any experience that engages in scams, attempts to mislead users with false offerings, or otherwise violate our [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards) will be taken down. In addition, ensure your subscriptions abide by the following guidelines:

- **Provide clear, distinguishable subscription options:** Use short, succinct, and self-explanatory names that differentiate subscription options from one another. Specify the price and duration for each option when merchandising in-experience.
- **Offer the same benefits across platforms and devices:** Regardless of where the subscription was purchased, ensure the user receives the same benefits for any given subscription plan.
- **Design subscriptions to fit with each other and overall experience offerings:** Tiering of the same suite of benefits, like offering "Bronze," "Silver," and "Gold" tiers that are mutually exclusive, is not currently available. Ensure subscriptions represent distinct sets of benefits.
- **Offer the benefits for the full term of the subscription:** Once a subscription offering is live, honor the benefits described and do not revoke benefits behind the scenes.
- **Do not direct users to purchase on another platform (e.g. mobile, web, etc.) in-experience:** While you are free to communicate with users off-platform, using the Roblox app to direct users to purchase elsewhere is prohibited.
- **Do not gate subscription benefits by additional requirements once a user has paid:** Requiring a user to perform additional tasks, such as posting to social media, to get access to benefits they have paid for is prohibited. This guideline does not impact battle passes, which you are allowed to both create and market as a subscription purchase.

## Create subscriptions

Before you can create a subscription, you must be phone or [ID verified](../publishing/account-verification.md). To create a subscription:

1. Navigate to your experience in the [Creator Dashboard](https://create.roblox.com/) and select **Monetization Products** ⟩ **Subscriptions**. Then click **Create A Subscription**.

   <img src="../../assets/monetization/subscriptions/subscriptions-1.png" width="40%"/>

2. Upload a cover image for your subscription. The image is visible to others after moderation.

   <img src="../../assets/monetization/subscriptions/subscriptions-2.png" width="80%"/>

3. Create a unique **Subscription Name**. No two subscriptions within an experience can share the same name. This subscription name appears alongside a shortened version of your experience name in billing statements. Allowed characters are a-z, A-Z, 0-9, spaces, and `.,:/!?@#&'`.
4. Write a **Description** of your subscription. This is what users see when deciding to purchase your subscription. Your description must clearly describe what benefits your subscription offers. Descriptions are capped at 1,000 characters and support emojis. Once you activate a subscription, you cannot reduce its benefits.
5. Select the subscription **Product Type**. There are three product types:

   1. **Durable:** Permanent items that persist after use or acquisition, such as physical items like weapons. If a subscription includes a bundle of different types of goods, with one or more of them durable, such as a value pack with a sword and a potion, choose **Durable** as its product type.
   2. **Consumable:** Temporary re-purchasable items that expire after use or acquisition, such as consumable potions that grant temporary boosts that expire over time.
   3. **Currency:** Any medium of exchange that users can use to purchase items within your experience.

6. Select the **Price** of your subscription (in USD). You earn Robux based on the web price. Mobile app subscribers are charged a higher price. Subscribers are charged in their local currency.

   <img src="../../assets/monetization/subscriptions/subscriptions-3.png" width="100%"/>

7. The **Recurring Cadence** is how often the user is charged for subscription. Currently, this value is always monthly. Click **Create Subscription**.
8. Double-check the details and click **Create**.

<Alert severity="warning">
   After creating your subscription, you can't make changes to anything but the cover image and description.
</Alert>

### Activate subscriptions

Once a subscription is ready to go on-sale, click **&ctdot;** at the top right corner of the subscription tile and select **Activate**. Activated subscriptions are available for sale in the **Experience Details** page and within the experience itself.

<img src="../../assets/monetization/subscriptions/subscriptions-activate.png" width="60%"/>

Before activating your subscription for the first time, you must confirm a shortened version of your experience name. This shortened experience name is displayed to the user when they subscribe, appearing alongside the subscription name you created in [Create subscriptions](#create-subscriptions). It's also visible managing subscriptions in Roblox and App Store Settings.

 <Alert severity="warning">
   Shortened experience names are permanent and cannot be changed when set. Shortened experience names don't change the name of your experience on Roblox.
</Alert>

## Edit subscriptions

You can have up to 50 subscriptions per experience between active and inactive subscriptions. To edit subscriptions, navigate to your experience in the [Creator Dashboard](https://create.roblox.com/) and select **Monetization Products** ⟩ **Subscriptions**.

You can edit a subscription's image, description, or state. If you want to edit more than these properties, you need to delete and recreate the subscriptions with the desired changes.

### Change image

To update a subscription's image:

1. With the subscription selected, click the **Change** button.

   <img src="../../assets/monetization/subscriptions/subscriptions-4.png" width="80%"/>

2. Choose a new image and click **Save**, then **Save Changes**. The new image goes live after successfully passing moderation.

### Change description

To change a subscription's description:

1. With the subscription selected, click the **Description** field.
2. Edit the description, then click **Save Changes**. Descriptions are capped at 1,000 characters and can support emojis.
3. Confirm changes by clicking **Yes, Confirm** on the confirmation window. Description updates are reflected immediately.

### Change state

Subscriptions have two possible states:

- **Active** — Active subscriptions are available for sale, with subscribers able to renew their subscription at the start of the next period.
- **Inactive** — Inactive subscriptions are unavailable for sale.

To change a subscription's state:

1. On the Subscriptions page, click **&ctdot;** at the top right corner of the subscription's tile. Either **Activate** or **Take Off Sale** displays, depending on the current state of the subscription, alongside some other options.
2. Select either **Activate** or **Take Off Sale** to flip the state of the subscription.
   1. If you select **Take Off Sale**, you will be given the option to allow existing subscribers to renew, or cancel future renewals for current subscribers. In general, it is advisable to allow existing subscribers to renew unless you are planning to permanently remove the associated subscription benefits from your experience.

<Alert severity="warning">
Deleting an active subscription results in full refunds for active subscribers and zero Robux for you. In most situations, if you want to delete a subscription, take it off sale first, select the option to cancel all renewals, and wait for the current period to conclude. Deleting a subscription requires the last four digits of the subscription ID for confirmation.
</Alert>

## Integrate subscriptions into an experience

This code sample is a simple example of how to implement subscription detection in your experience:

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

One option for rolling out subscriptions in your experience is to replace an existing pass with a subscription. This is a great option if you want to quickly implement subscriptions in your experience without adding new features or awards.

There are two important considerations when replacing a pass with a subscription:

- Any existing holders of the pass should continue to receive the benefit they paid for.
- The pass should be taken off sale so that new users can purchase the subscription instead.
- Subscriptions can be revoked, which means if your pass previously persisted its benefits to a data store, you need to "undo" these benefits. This consideration does not apply to all pass implementations, but might apply to more complex ones.

The following code sample shows how to replace a pass with a subscription:

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

Although users can purchase subscriptions directly from an experience's **Game Details** page, you should also add a way to purchase a subscription in-game.

When you prompt a subscription purchase, `Players.UserSubscriptionStatusChanged` fires if the player already owns the subscription, which helps catch scenarios where a player purchases a subscription from the **Game Details** page while they are already in-game.

Although you can prompt a subscription purchase from the client, checking if a user already has a subscription via `MarketplaceService.GetUserSubscriptionStatusAsync` must be done from the server.

<Alert severity="warning">
When adding subscriptions to your experience, make sure to only offer them in supported regions and platforms. If not, users in unsupported regions and platforms can view the offering but will be unable to complete the purchase.
</Alert>

This example creates a `RemoteFunction` that the client can use to request the status of a subscription:

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

Other relevant functions are available in `Class.MarketplaceService`:

- `Class.MarketplaceService:GetSubscriptionProductInfoAsync()`
- `Class.MarketplaceService:GetUserSubscriptionPaymentHistoryAsync()`
- `Class.MarketplaceService:GetUserSubscriptionStatusAsync()`

## Earn with subscriptions

Subscriptions are priced in local currency, but you earn Robux at a rate of US \$0.01 to 1 Robux according to the base platform price you selected for the subscription after platform fees. Roblox takes a 30% platform fee for the first month only, meaning that you receive the full subscription earnings from the second month onward. This revenue split is consistent across all platforms.

For example, if a user subscribes at the base price of US \$9.99 (desktop) or \$12.99 (mobile):

- **First month:** The creator of the subscription receives `999 * .7 = 699` (desktop) or `1299 * .7 = 909` (mobile).
- **Second month onward:** The creator of the subscription receives `999 = 999` (desktop) or `1299 = 1299` (mobile).

Earnings are subject to 30 day holds and will be added to your Robux balance after the full term of the subscription has been delivered. If a user requests a refund for a subscription through their bank or app store within the month-long hold period, the hold will be canceled and you will not receive the payout for that transaction.

Refunds received outside the hold window will result in the payout amount for the refunded transaction being deducted from your Robux balance. If your experience is owned by a Group and the Group's balance is less than the amount to be deducted, the remainder will be deducted from the Group Owner's Robux balance.

Users cancelling an active subscription and failing to renew it does not automatically result in a refund. User have to manually request refunds, which are handled on a case-by-case basis. For more information on the user subscription refund process, check out the [help center](https://en.help.roblox.com/hc/en-us/articles/20292383332500-Subscription-Billing-and-Refunds).

<Alert severity="warning">
Subscriptions are currently ineligible to be cross-sold by other experiences and are ineligible for affiliate fees. This additional opportunity will be supported at a later date.
</Alert>

### Subscription payouts

Payouts are found in **Robux Balance** ⟩ **My Transactions**:

<img src="../../assets/monetization/subscriptions/subscriptions-my-transaction.png" width="30%"/>

**Subscriptions** and **Group Subscription** payouts appear under **Incoming** Robux, while refunds are grouped under **Outgoing** Robux as a **Payout Reversal**. The subscriptions and group subscriptions subpages provide additional information for their respective categories.

<img src="../../assets/monetization/subscriptions/subscriptions-pay-out.png" width="100%"/>

To view refunding information of individual users, use `Class.MarketplaceService:GetUserSubscriptionPaymentHistoryAsync()`.

## Subscription analytics

**Subscription analytics** help you gauge the success of individual subscriptions, identify trends, and forecast potential future earnings. Subscriptions are added to the subscriptions analytics page after the first time they're activated and are not removed when they're deactivated or deleted. You can access ready-made analytics through the Creator Dashboard, or you can capture subscription updates in real time using webhooks.

### Through Creator Dashboard

To access subscription analytics on the Creator Dashboard:

1. Navigate to your [Creations](https://create.roblox.com/dashboard/creations) page on **Creator Dashboard** and select your experience.

2. Navigate to the **Monetization** tab and select **Subscriptions**.
   <img src="../../assets/monetization/subscriptions/subscriptions-analytics-2.png" width="40%"/>

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
