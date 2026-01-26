---
title: Passes
description: Passes let you charge users a one-time Robux fee to access privileges inside your experience.
---

**Passes** let you charge users a one-time Robux fee to access special privileges inside your experience, such as entry to a restricted area, an in-experience avatar item, or a permanent power-up.

<Alert severity="info">
   For items that a player might purchase multiple times, such as potions, temporary power-ups, or in-experience currency, see [Developer products](../../production/monetization/developer-products.md).
</Alert>

## Create a pass

<Alert severity="warning">
   Before creating a pass, make sure your experience has been [published](../../production/publishing/publish-experiences-and-places.md) and is accessible on Roblox.
</Alert>

To create a pass:

1. Go to [Creations](https://create.roblox.com/dashboard/creations) and select an experience.
2. Go to **Monetization** &rang; **Passes**.
3. Click **Create a Pass**.
4. Upload an image to display as the pass icon. Make sure the image doesn't exceed 512x512 pixels, doesn't include important details outside of its circular boundaries, and is in `.jpg`, `.png`, or `.bmp` format.
5. Enter a name and a description for the pass.
6. Click **Create Pass**.

<GridContainer numColumns="2">
  <figure>
    <img alt="Good circular trimming" src="../../assets/monetization/passes/Circular-Trimming-Good.png" />
    <figcaption>
      <Alert severity="success">Includes relevant content</Alert>
    </figcaption>
  </figure>
  <figure>
    <img alt="Bad circular trimming" src="../../assets/monetization/passes/Circular-Trimming-Bad.png" />
    <figcaption>
      <Alert severity="error">Crops important content</Alert>
    </figcaption>
  </figure>
</GridContainer>

<Alert severity="info">
   If you want to use the pass as a randomized reward, review the [Randomized Virtual Item Policy](./virtual-items.md).
</Alert>

## Get the pass ID

To use scripting, you need a pass ID. To get the pass ID:

1. Go to **Monetization** &rang; **Passes**.
1. Hover over a pass' thumbnail, click the **&ctdot;** button, and select **Copy Asset ID** from the context menu.

   <img src="../../assets/creator-dashboard/Options-Button-Pass.png" width="200" />

## Sell a pass

<Alert severity="info">
If you're using [price optimization](./price-optimization.md), make sure to place the script inside a `Class.LocalScript` so that users see personalized pass prices.
</Alert>

You can sell passes in two ways:

- [Inside your experience](#inside-your-experience)
- [Outside your experience](#outside-your-experience)

### Inside your experience

To implement and sell a pass inside an experience, call `Class.MarketplaceService|MarketplaceService` functions.

Use `Class.MarketplaceService:GetProductInfo()|GetProductInfo()` to retrieve information about a pass, like name and price, and then to display that pass to users. You can sell the pass inside your experience's marketplace, for example. For passes, the second parameter must be `Enum.InfoType.GamePass`.

```lua
local MarketplaceService = game:GetService("MarketplaceService")

-- Replace the placeholder ID with your pass ID
local productId = 000000

local success, productInfo = pcall(function()
	return MarketplaceService:GetProductInfo(productId, Enum.InfoType.GamePass)
end)


if success and productInfo then
	-- Check if product is for sale
	if productInfo.IsForSale then
	-- Display product information
	-- Replace the print statements with UI code to display the pass
  	print("Pass Name: " .. productInfo.Name)
  	print("Price in Robux: " .. productInfo.PriceInRobux)
  	print("Description: " .. productInfo.Description)
	else
		print("This product isn't for sale")
	end
end
```

Use `Class.MarketplaceService:PromptGamePassPurchase()|PromptGamePassPurchase()` to prompt a pass purchase if the user doesn't already have the pass in their inventory. You can call this function when a user performs actions like pressing a button or talking to a vendor NPC.

```lua
local MarketplaceService = game:GetService("MarketplaceService")
local Players = game:GetService("Players")

-- Replace the placeholder ID with your pass ID
local passID = 0000000

-- Prompt pass purchase
local function promptPurchase()
	local player = Players.LocalPlayer
	local hasPass = false

	local success, message = pcall(function()
		hasPass = MarketplaceService:UserOwnsGamePassAsync(player.UserId, passID)
	end)

	if not success then
		warn("Error while checking if player has pass: " .. tostring(message))
		return
	end

	if hasPass then
		-- Show a message telling user they already own the pass
	else
		-- Prompt pass purchase
		MarketplaceService:PromptGamePassPurchase(player, passID)
	end
end
```

Use `Class.MarketplaceService.PromptGamePassPurchaseFinished|PromptGamePassPurchaseFinished` to handle a completed pass prompt and purchase and assign the user the privileges associated with the pass.

Place the script inside the `Class.ServerScriptService` so that the server handles the user's pass privileges.

```lua
local MarketplaceService = game:GetService("MarketplaceService")

-- Replace the placeholder ID with your pass ID
local passID = 0000000  -- Change this to your Pass ID

-- Handle a completed prompt and purchase
local function onPromptPurchaseFinished(player, purchasedPassID, purchaseSuccess)
	if purchaseSuccess and purchasedPassID == passID then
		print(player.Name .. " purchased the Pass with ID " .. passID)
		-- Assign the user the ability or bonus related to the pass
	end
end

-- Connect PromptGamePassPurchaseFinished events to the function
MarketplaceService.PromptGamePassPurchaseFinished:Connect(onPromptPurchaseFinished)
```

<Alert severity="warning">
Although Roblox itself does **not** record the purchase history of passes by specific users, you can request to [download sales data](../../production/analytics/analytics-dashboard.md#sales-data). If you want to track user-specific purchase history, it's your responsibility to [store the data](../../cloud-services/data-stores/index.md).
</Alert>

### Outside your experience

To sell a pass on the **Store** tab of the experience details page:

1. Go to **Monetization** ⟩ **Passes**.
2. Hover over the pass and click the **&ctdot;** menu.
3. Select the pass you want to sell.
4. Select **Sales**.
5. Enable to **Item for Sale** toggle.
6. In the **Price in Robux** field, enter the amount of Robux you want to charge users for the pass. The price you enter affects how much Robux you earn per sale. The minimum price is 1 Robux, and the maximum price is 1 billion Robux.
7. Click **Save Changes**. The pass populates in the **Store** tab of the experience details page.

## Assign pass privileges

You must manually assign pass privileges to users that purchase your passes. To do this, use `Class.Players.PlayerAdded|PlayerAdded` when a user joins your experience to check if they already own the pass and to assign them the pass privileges.

Place the script inside the `Class.ServerScriptService` so that the server handles the user's pass privileges.

```lua
local MarketplaceService = game:GetService("MarketplaceService")
local Players = game:GetService("Players")

-- Replace the placeholder ID with your pass ID
local passID = 0000000

local function onPlayerAdded(player)
	local hasPass = false

	-- Check if user already owns the pass
	local success, message = pcall(function()
		hasPass = MarketplaceService:UserOwnsGamePassAsync(player.UserId, passID)
	end)

	if not success then
		-- Issue a warning and exit the function
		warn("Error while checking if player has pass: " .. tostring(message))
		return
	end

	if hasPass then
		-- Assign user the ability or bonus related to the pass
		print(player.Name .. " owns the Pass with ID " .. passID)
	end
end

-- Connect PlayerAdded events to the function
Players.PlayerAdded:Connect(onPlayerAdded)
```

## Personalize your in-experience store

You can use product intelligence APIs to sort and recommend passes to users. Personalizing your in-experience store helps surface the most relevant items to each user, boosting engagement and revenue. By tailoring passes to user preferences, you can improve their discovery, increase conversion rates, and unlock new monetization opportunities.

### Rank passes for sale

`Class.MarketplaceService.RankProductsAsync|RankProductsAsync` takes in a list of product IDs and returns a personalized ordered list of those products. You can use this method to provide your users with personalized item recommendations in your in-experience store.

<Alert severity="warning">
Because `RankProductsAsync` has a strict rate limit, you should load recommendations once at game join instead of calling it repeatedly.
</Alert>

	<figcaption>Example: Three "Power" items ranked for the user</figcaption>
  <img src="../../assets/monetization/developer-products/RankedItems.png" alt="Three items ranked for the user." width="80%" />

```lua
local MarketplaceService = game:GetService("MarketplaceService")

-- Create the array of products you want to rank
local productIdentifiers = {
    {InfoType = Enum.InfoType.GamePass, Id = 123},
    {InfoType = Enum.InfoType.Product, Id = 456},
    {InfoType = Enum.InfoType.Product, Id = 789}
}

-- Optional: Wrap the call in an async task so that if the request is slow,
-- it doesn’t freeze the UI / game
task.spawn(function()
    -- Use a pcall to handle errors gracefully
    local success, result = pcall(function()
        return MarketplaceService:RankProductsAsync(productIdentifiers)
    end)

    if not success then
        -- If failed, 'result' is the error message.
        warn("Failed to rank products:", result)
    end

    -- Load the returned items into the store.
    for i, rankedItem in ipairs(rankedProducts) do
        local productIdentifier = rankedItem.ProductIdentifier
        local productInfo = rankedItem.ProductInfo
        -- ...
        -- Logic to add productInfo into store
    end
end)
```

### Display your top passes

<Alert severity="warning">
If your experience has had no item sales in the past 28 days, `RecommendTopProductsAsync` returns an empty list. At least one purchase within the last 28 days is required for this API to generate recommendations.
</Alert>

`Class.MarketplaceService.RecommendTopProductsAsync|RecommendTopProductsAsync` takes an array of `Enum.InfoType|InfoType` values and returns up to 50 items a user is most likely to engage with and purchase. You can use this method to create a "Top Picks" section in your in-experience store.

If no recommendations can be determined, `RecommendTopProductsAsync` returns 0 items. Any passes that the user already owns are also not returned.

<Alert severity="warning">
In rare cases, calls to the ranking model can be slow. To help prevent added lately for users, we recommend using `task.spawn` to make the call to `RecommendTopProductgs` non-blocking.
</Alert>

	<figcaption>Example: A "Top Picks" tab in an in-experience store</figcaption>
  <img src="../../assets/monetization/developer-products/StoreTopPicks.png" alt="Top Picks tab of an in-experience store." width="90%" />

```lua
local MarketplaceService = game:GetService("MarketplaceService")

-- Create an array of product types to include. In this case both game passes and developer products
local productTypes = {Enum.InfoType.GamePass, Enum.InfoType.Product}

-- Optional: Wrap the call in an async task so that if the request is slow,
-- it doesn’t freeze the UI / game
task.spawn(function()
    -- Use a pcall to handle errors gracefully
    local success, result = pcall(function()
        return MarketplaceService:RecommendTopProductsAsync(productTypes)
    end)

    if not success then
        -- If failed, 'result' is the error message.
        warn("Failed to rank products:", result)
    end

    -- Load the returned items into the store. Make sure to filter out any 
    -- ineligible items from topRankedItems such as developer products the
    -- user can no longer purchase
    for i, rankedItem in ipairs(rankedProducts) do
        local productIdentifier = rankedItem.ProductIdentifier
        local productInfo = rankedItem.ProductInfo
        -- ...
        -- Logic to add productInfo into store
    end
end)
```

## Promote a pass

<Alert severity="info">
Promoted passes are given to users for free.
</Alert>

To help more users discover your experience, you can opt-in to have your passes featured on Roblox's [Buy Robux](https://www.roblox.com/upgrades/robux) page. Opting-in to promote your passes can help increase the time and Robux users spend in your experience. There is no limit to the number of passes you can promote.

Users are shown passes that are relevant to their play history and engagement on the platform. They are not shown passes that they already own.

<img src="../../assets/monetization/passes/PromotedPass.png" width="60%" />

When users purchase an eligible Robux package, they receive the promoted pass and are prompted to claim their pass by joining your experience.

<img src="../../assets/monetization/passes/PromotedPass2.png" width="60%" />

<Alert severity="info">
For best results, we recommend that you create a unique pass specifically for the **Buy Robux** page.
</Alert>

To opt-in to promote one of your passes:

1. Go to **Monetization** ⟩ **Passes**.
2. Select the pass you want to promote.
3. Select **Promotions**.
4. Enable **Include this item in the bonus pool**.
5. Click **Save Changes**. The pass is shown to relevant users in the **Buy Robux** page.

The promoted pass:

- Can be off-sale or on-sale. If they're on-sale, their Robux value must be greater than 49 Robux and less than 801 Robux.
- Must include a thumbnail.
- Cannot grant [paid random items](./virtual-items.md#randomized-virtual-items).
- Must comply with the [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards).

## Pass analytics

Use pass analytics to analyze the success of individual passes, identify trends, and forecast potential future earnings.

With analytics, you can:

- View your top passes over a selected time period.
- Showcase up to eight top-selling items on a time-series graph to analyze overall sales and net revenue.
- Monitor your catalog and sort items by sales and net revenue.
- View how many passes were acquired by users through promotion on the **Buy Robux** page.
- View how many users joined your experience after acquiring the pass through the **Buy Robux** page.

To access pass analytics:

1. Go to [Creations](https://create.roblox.com/dashboard/creations) and select an experience.
2. Go to **Monetization** ⟩ **Passes**.
3. Select the **Analytics** tab.

<img src="../../assets/monetization/passes/passes-analytics-2.png" width="100%" />
