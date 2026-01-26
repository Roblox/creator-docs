---
title: Regional Pricing
description: Regional pricing adjusts the price of your items based on a user's region.
---

With Regional Pricing, you can offer region-specific prices for your items and build a more inclusive and accessible global economy. After you determine a default global price for an item, Roblox uses a variety of signals like the region's purchasing power, currency exchange rates, and local spending behavior to set the most appropriate price for that item region by region.

You can choose which of your items you want to price regionally. When you enable Regional Pricing for an item in your experience, Roblox automatically adjusts the price of that item for users based on their economic location.

Economic location is not always the same as account location. To determine a user's economic location, Roblox looks at signals, including VPN usage, billing history, and account history. If their economic location can't be determined, users see the default global price for the item instead.

To prevent price arbitrage when users gift or trade items with different regional prices, you can [manage in-experience transfers with the `GetUsersPriceLevelsAsync` API](#protect-your-trades-and-gifts).

<Alert severity="warning">
  Regional prices will never be discounted by more than 70% of your default price, and they will never exceed the default price you set for your item.

  For example, if your item has a default price of 100 Robux, the lowest the item can be priced at is 30 Robux and the highest is 100 Robux, regardless of a user's region.
</Alert>

## Enable Regional Pricing

<Alert severity="info">
  Regional prices update periodically to reflect changes in global economy trends.
</Alert>

### For passes

To enable Regional Pricing for passes:

1. Go to [Creations](https://create.roblox.com/dashboard/creations) and select an experience.
2. Go to **Monetization** ⟩ **Passes**.
3. Select an existing pass or multiple passes, or create a new pass.
4. Click **Enable Regional Pricing**.
5. <Chip label="OPTIONAL" size="small" variant="outlined" /> To view regional prices by country or region, select a pass and go to its **Sales** page. The **Top Countries/Regions** list updates to show the adjusted regional prices based on the default price of the pass. To view regional prices for all countries and regions, click **View all countries**.

### For developer products

To enable Regional Pricing for developer products:

1. Check that your developer products have [dynamically-scripted prices](#check-for-dynamic-pricing).
2. [Implement the `GetUsersPriceLevelsAsync` method](#protect-your-trades-and-gifts) to regulate item transfers based on users' price levels.
3. Go to [Creations](https://create.roblox.com/dashboard/creations) and select an experience.
4. Go to **Monetization** ⟩ **Developer Products**.
5. Select an existing product or multiple products, or create a new product.
6. Click **Enable Regional Pricing**.
7. <Chip label="OPTIONAL" size="small" variant="outlined" /> To view regional prices by country or region, select a product and go to its **Basic Settings** page. The **Top Countries/Regions** list updates to show the adjusted regional prices based on the default price of the product. To view regional prices for all countries and regions, click **View all countries**.

### For Avatar items

To enable Regional Pricing for an Avatar item, see [Pricing](../../marketplace/publish-to-marketplace.md#pricing) in the Publish to Marketplace page.

## Check for dynamic pricing

<Alert severity="info">
  If you're only applying Regional Pricing to passes for sale on your experience details page, you don't need to check for hard-coded prices.
</Alert>

When you enable Regional Pricing, the price of the item adjusts for users in different regions whether it's for sale inside or outside of your experience. However, if you have hard-coded the price into your experience's UI, that number does not update as it's not dynamic or accessible by Roblox. As a result, users are charged the correct region-specific price but the UI still shows them the hard-coded value.

The **dynamic price check tool** updates all items for sale inside your experience with a fake Robux price or a fake economic location to help you identify which prices are hard-coded in your experience's UI and which are dynamically-scripted with `Class.MarketplaceService|MarketplaceService` and called from a client script. After you have identified the hard-coded passes, you can update them to use `MarketplaceService` functions.

To use the dynamic price check tool:

1. Go to **Monetization**.
    - For passes, go to **Passes**.
    - For develper products, go to **Developer Products**.
2. Click **&hellip;** and select **Dynamic Price Check**.
3. Under **Add test accounts**, enter up to five Roblox users to check for hard-coded prices.
4. Select a testing type.
   - **Price pinned** updates all dynamically-scripted prices with a set fake Robux amount.
   - **Location pinned** updates all dynamically-scripted prices with a region-specific price for a fake economic location.
5. Click **Enable**. After a few minutes, enter your experience to identify the hard-coded prices.

To disable the dynamic price check tool, go to the **Dynamic Price Check** page and click **Disable**.

For more information about hard-coded versus dynamically-scripted product prices, see [Check for dynamic pricing](./price-optimization.md#check-for-dynamic-pricing) in the Price optimization page. For more information about selling passes and developer products with `MarketplaceService` functions, see [Sell a pass inside your experience](./passes.md#inside-your-experience) and [Sell a developer product inside your experience](./developer-products.md#inside-your-experience).

## Protect your trades and gifts

Regional pricing can affect in-experience transfers like trading and gifting. Because of price differences across regions, price arbitrage (exploiting price discrepancies between the same products to generate a profit) can take place. To manage the potential for price arbitrage, you can use the `Class.MarketplaceService.GetUsersPriceLevelsAsync|GetUsersPriceLevelsAsync` API, which lets you determine the relative price levels of users so that you can implement logic to regulate item transfers based on these levels.

`GetUsersPriceLevelsAsync` provides a numerical value between 1 and 1000 that indicates a user's pricing level. This value is designed to represent the percentage of the full price a user is expected to pay. The price level 1000 represents the full global price, while lower price levels indicate that the user typically pays a lower price because of their economic location.

A lower price level difference means that there's a smaller price difference between the full global price and the user's regional price. A higher price level difference means that there's a larger price difference between the two. For example:

- User A has the price level 1000, which represents the full global price. This user pays 100% of the base price for an item.
- User B has the price level 500, which represents 50% of the full global price. This user pays 50% of the base price for an item.
- Once you know each user's price level, you can choose to approve or block gifting or trading between User A and User B based on their price level difference of 500.

### Implement GetUsersPriceLevelsAsync

<Alert severity="warning">
  We recommend that you **do not** cache the results of your `GetUsersPriceLevelsAsync` API calls after a user session. User price levels can change. Relying on cached data can lead to inaccurate transfer logic and potential abuse or exploitation of the system.
  
  To make sure that you have the most up-to-date price information for each user, always make calls to `GetUsersPriceLevelsAsync` at player join.
</Alert>

To get the price levels of users involved in an item transfer, call the `GetUsersPriceLevelsAsync` function in the `MarketplaceService`. This function takes an array of user IDs as its argument, and returns an array of `PriceLevelInfo` objects with the following fields:

```lua
type PriceLevelInfo = {
    UserId: number,
    PriceLevel: number
}
```

After implementing the function, use the returned price levels to choose whether you want to allow an item transfer to take place. For example, you can let users with a higher price level gift items to users with a lower price level, but only allow trading between users that have the same price level as each other. See the [available examples](#examples) for more information.

For more information about the `GetUsersPriceLevelsAsync` API, see `Class.MarketplaceService.GetUsersPriceLevelsAsync|MarketplaceService`.

### Examples

Examples of how you can use `GetUsersPriceLevelsAsync` with Regional Pricing.

<h5 style={{marginTop: '36px'}}>Example 1: Check the price levels for a list of users</h5>

This example shows you how to retrieve price levels for a list of users, which can help you choose whether you want to allow an item transfer to take place.

```lua
-- Get the MarketplaceService
local MarketplaceService = game:GetService("MarketplaceService")

-- Define a function to retrieve price levels for a list of users and creates a lookup table of UserId to PriceLevel
local function getPriceLevelsLookup(userIds)
    local success, result = pcall(function()
        return MarketplaceService:GetUsersPriceLevelsAsync(userIds)
    end)

    if success then
        -- Map each PriceLevelInfo to a UserId -> PriceLevel lookup table
        local lookup = {}
        for _, userData in ipairs(result) do
            lookup[userData.UserId] = userData.PriceLevel
        end
        return lookup
    else
        warn("Error getting price levels:", result)
        return nil
    end
end

-- Example using placeholder IDs
local user1Id = 123456789
local user2Id = 987654321

-- Call the function and store the result
local priceLevels = getPriceLevelsLookup({user1Id, user2Id})
-- If successful, print each user's level
if priceLevels then
    print("Price level for User 1:", priceLevels[user1Id])
    print("Price level for User 2:", priceLevels[user2Id])
else
    print("Failed to retrieve price levels.")
end
```

<h5 style={{marginTop: '36px'}}>Example 2: Compare a sender's price level to a recipient's price level</h5>

This example shows you a **sample implementation** of how to check a sender's price level against the recipient's price level. This can help you manage gifting from users in higher-priced regions to users in lower-priced regions.

```lua
-- Get the MarketplaceService
local MarketplaceService = game:GetService("MarketplaceService")

-- Define a function to retrieve price levels for a list of users and creates a lookup table of UserId to PriceLevel
local function getPriceLevelsLookup(userIds)
    local success, result = pcall(function()
        return MarketplaceService:GetUsersPriceLevelsAsync(userIds)
    end)

    if success then
        -- Map each PriceLevelInfo to a UserId -> PriceLevel lookup table
        local lookup = {}
        for _, userData in ipairs(result) do
            lookup[userData.UserId] = userData.PriceLevel
        end
        return lookup
    else
        warn("Error getting price levels:", result)
        return nil
    end
end

-- Define a function that checks if the sender has a higher or equal price level to the recipient
-- The parameters are the Player sending the item and the Player receiving the item
-- The function returns true if the sender's price level is greater than or equal to the recipient's price level
function isSenderPriceLevelHigherOrEqualforGifting(sender, recipient)
	local priceLevelsLookup = getPriceLevelsLookup({ sender.UserId, recipient.UserId })

	if not priceLevelsLookup then
		error("MarketplaceService:GetUsersPriceLevelsAsync failed. Unable to retrieve user price levels.")
	end

	local senderPriceLevel = priceLevelsLookup[sender.UserId]
	local recipientPriceLevel = priceLevelsLookup[recipient.UserId]

	return senderPriceLevel >= recipientPriceLevel
end
```

<h5 style={{marginTop: '36px'}}>Example 3: Check if two users have the same price level</h5>

This example shows you a **sample implementation** of how to check if two users have the same price level. This can help you manage trading and ensure a fair exchange between users from different regions.

```lua
-- Get the MarketplaceService
local MarketplaceService = game:GetService("MarketplaceService")

-- Define a function to retrieve price levels for a list of users and creates a lookup table of UserId to PriceLevel
local function getPriceLevelsLookup(userIds)
    local success, result = pcall(function()
        return MarketplaceService:GetUsersPriceLevelsAsync(userIds)
    end)

    if success then
        -- Map each PriceLevelInfo to a UserId -> PriceLevel lookup table
        local lookup = {}
        for _, userData in ipairs(result) do
            lookup[userData.UserId] = userData.PriceLevel
        end
        return lookup
    else
        warn("Error getting price levels:", result)
        return nil
    end
end

-- Define a function that checks if two users have the same price level
-- The parameters are the two users whose price levels you want to compare
-- The function returns true if both users have the same price level
function haveSamePriceLevelForTrading(userA, userB)
	local priceLevelsLookup = getPriceLevelsLookup({ userA.UserId, userB.UserId })

	if not priceLevelsLookup then
		error("MarketplaceService:GetUsersPriceLevelsAsync failed. Unable to retrieve user price levels.")
	end

	local userAPriceLevel = priceLevelsLookup[userA.UserId]
	local userBPriceLevel = priceLevelsLookup[userB.UserId]

	return userAPriceLevel == userBPriceLevel
end
```
