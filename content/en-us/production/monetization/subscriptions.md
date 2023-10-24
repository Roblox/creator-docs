---
title: Subscriptions
description: Subscriptions within experiences let you offer users recurring benefits for a monthly fee.
---

<Alert severity="warning">
Subscription creation tooling is live for eligible creators to develop and test offerings before full functionality is enabled at a later date. Do not attempt to publish your subscriptions at this time. Attempting to purchase published subscriptions will fail.
</Alert>

**Subscriptions** within experiences let you offer users recurring benefits for a monthly fee. Similar to [Passes](./game-passes.md), the major difference between subscriptions and passes is that the benefits of a pass are granted in perpetuity, while the benefits of a subscription are contingent on the user paying a monthly fee. Subscriptions on Roblox have the following characteristics:

- **Auto-renewal:** Subscriptions are auto-renewing, not one-time purchases, and are priced in local currency.
- **Robux Payout:** You receive subscription revenue in Robux. For more details, see [Earning with Subscriptions](#earning-with-subscriptions).
- **Single-Tiered:** All subscriptions within an experience can be owned by users simultaneously. Mutually exclusive subscriptions are not supported.

<Alert severity="info">
To learn how to design subscriptions for your experience, see [Subscription Design](../../production/game-design/subscription-design.md).
</Alert>

## Subscription Guidelines

Before creating your subscriptions, ensure they align with [Roblox's Terms of Use](https://en.help.roblox.com/hc/en-us/articles/115004647846-Roblox-Terms-of-Use) and comply with local laws. Any experience that engages in scams, attempts to mislead users with false offerings, or otherwise violate our [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards) will be taken down. In addition, ensure your subscriptions abide by the following guidelines:

- **Provide clear, distinguishable subscription options:** Use short, succinct, and self-explanatory names that differentiate subscription options from one another. Specify the price and duration for each option when merchandising in-experience.
- **Offer the same benefits across platforms and devices:** Regardless of where the subscription was purchased, ensure the user receives the same benefits for any given subscription plan.
- **Design subscriptions to fit with each other and overall experience offerings:** Tiering of the same suite of benefits, like offering "Bronze," "Silver," and "Gold" tiers that are mutually exclusive, is not currently available. Ensure subscriptions represent distinct sets of benefits.
- **Offer the benefits for the full term of the subscription:** Once a subscription offering is live, honor the benefits described and do not change or revoke benefits behind the scenes.
- **Do not direct users to purchase on another platform (e.g. mobile, web, etc.) in-experience:** While you are free to communicate with users off-platform, using the Roblox app to direct users to purchase elsewhere is prohibited.
- **Do not gate subscription benefits by additional requirements once a user has paid:** Requiring a user to perform additional tasks to get access to benefits they have paid for is prohibited.

## Creating Subscriptions

To create a subscription, you must meet the following prerequisites:

- Be phone or [ID verified](https://en.help.roblox.com/hc/en-us/articles/4407282410644-Age-ID-Verification).
- The experience with the subscription must be created in Studio and available in Creator Hub before September 1, 2023.

To create a subscription:

1. Navigate to your experience in the [Creator Dashboard](https://create.roblox.com/) and select **Associated Items** > **Subscriptions**. Then click **CREATE A SUBSCRIPTION**.

   <img src="../../assets/monetization/subscriptions/subscriptions-1.png" width="80%"/>

2. Upload a cover image for your subscription. The image is visible to others after moderation.

   <img src="../../assets/monetization/subscriptions/subscriptions-2.png" width="80%"/>

3. Create a unique **Subscription Name**. No two subscriptions within an experience can share the same name. This subscription name appears alongside a shortened version of your experience name in billing statements. Allowed characters are a-z, A-Z, 0-9, spaces, and `.,:/!?@#&'`.
4. Write a **Description** of your subscription. This is what users see when deciding to purchase your subscription. Your description must clearly describe what benefits your subscription offers. Descriptions are capped at 1,000 characters and support emojis. Once activated, a subscription's benefits cannot be changed.
5. Select the subscription **Product Type**. There are three product types:

   1. **Durable:** Permanent items that persist after use or acquisition, such as physical items like weapons. **If a subscription has both consumable and durable components, such as a value pack with a sword and a potion, then it should be considered durable.**
   2. **Consumable:** Temporary re-purchasable items that expire after use or acquisition, such as consumable potions that grant temporary boosts that expire over time.
   3. **Currency:** Any medium of exchange that users can use to purchase items within your experience.

6. Select the **Price** of your subscription (in USD). You earn Robux based on the web price. Mobile app subscribers are charged a higher price. Subscribers are charged in their local currency.

   <img src="../../assets/monetization/subscriptions/subscriptions-3.png" width="80%"/>

7. The **Recurring Cadence** is how often the user is charged for subscription. Currently, this value is always monthly. Click **CREATE SUBSCRIPTION**.
8. Double-check the details and click **CREATE**.

   <Alert severity="warning">
   After creating your subscription, you can't make changes to anything but the cover image.
   </Alert>

## Editing Subscriptions

You can have up to 50 subscriptions per experience between active and inactive subscriptions. To edit subscriptions, navigate to your experience in the [Creator Dashboard](https://create.roblox.com/) and select **Associated Items** > **Subscriptions**.

### Changing Subscription Images

After creating a subscription, the only modification you can make is to update the image:

1. With the subscription selected, click the **CHANGE** button.

   <img src="../../assets/monetization/subscriptions/subscriptions-4.png" width="80%"/>

2. Choose the new image and click **SAVE** and then **SAVE CHANGES**. The new image goes live after successfully passing moderation.

To edit more than a subscription's image, delete and re-create the subscriptions with the desired changes.

## Integrating Subscriptions into Experiences

Use the following script to check if a player has an active subscription upon joining your experience:

```lua
local MarketplaceService = game:GetService("MarketplaceService")
local Players = game:GetService("Players")

local subscriptionID = "EXP-11111111" -- replace with your subscription ID

local function checkSubStatus(player)
	local subStatus = {}
	local success, message = pcall(function()
		-- returns IsRenewing and IsSubscribed
		subStatus = MarketplaceService:GetUserSubscriptionStatusAsync(player, subscriptionID)
	end)

	if not success then
		warn("Error while checking if player has subscription: " .. tostring(message))
		return
	end

	if subStatus["IsSubscribed"] then
		print(player.Name .. " is subscribed with " .. subscriptionID)
		-- Give player all items and/or permissions associated with the subscription
	end
end

Players.PlayerAdded:Connect(checkSubStatus)
```

After you determine whether a player has a subscription, you can confer subscription benefits.

Other relevant functions are available in `Class.MarketplaceService`:

- `Class.MarketplaceService:GetSubscriptionProductInfoAsync()`
- `Class.MarketplaceService:GetUserSubscriptionPaymentHistoryAsync()`
- `Class.MarketplaceService:GetUserSubscriptionStatusAsync()`

### Prompting Subscription Purchases

The process for prompting in-experience subscription purchases is nearly identical to [Passes](./game-passes.md). Use the `Class.MarketplaceService:PromptSubscriptionPurchase()` method. For sample code, see [Prompting In-Experience Purchases](./game-passes.md#prompting-in-experience-purchases).

## Earning with Subscriptions

Subscriptions are priced in local currency, but you earn Robux at a rate of US $0.01 to 1 Robux based on the base web price you selected for the subscription after platform fees. The revenue split for subscriptions varies depending on the platform:

- **Desktop (web):** You earn **70%** (30% platform fee) for the first three months and then **85%** (15% platform fee) for subsequent renewals.
- **Apple:** You earn **70%** of the web price (30% platform fee applied to web price).
- **Google:** You earn **70%** of the web price (30% platform fee applied to web price).

For example, if a user subscribes on desktop at the base price of US $9.99:

- **First three months:** The creator of the subscription receives `999 * .7 = 699` Robux per month.
- **Fourth month onward:** The creator of the subscription receives `999 * .85 = 849` Robux per month.

If a different user subscribes to the same plan, but on mobile, the creator receives 699 Robux per month until the user cancels.

Earnings are subject to 30 day holds and are added to your Robux balance after the full term of the subscription has been delivered. If a user requests a refund or does a chargeback for the subscription charge within the month-long hold period, the hold is canceled and you do not receive the payout for that transaction.

Refunds received outside the hold window result in the payout amount for the refunded transaction being deducted from your Robux balance. If your experience is owned by a Group, and the Group's balance is less than the amount to be deducted, the remainder is deducted from the Group owner's Robux balance.

<Alert severity="warning">
Subscriptions are currently ineligible to be cross-sold by other experiences and are ineligible for affiliate fees. This additional opportunity will be supported at a later date.
</Alert>
