---
title: Developer Products
description: Developer Products let you charge users a Robux fee for items or abilities that they can access and use inside your experience.
---

A **developer product** is an item or ability that a user can purchase more than once, such as in-experience currency, ammo, or potions.

<img src="../../assets/monetization/developer-products/Buy-Product-Example.jpg" />

<Alert severity="info">
   For items or abilities that a user should only purchase **once**, such as a special weapon or a permanent power-up, see [Passes](../../production/monetization/passes.md).
</Alert>

## Create a developer product

<Alert severity="warning">
   Before creating a developer product, make sure your experience has been [published](../../production/publishing/publish-experiences-and-places.md) and is accessible on Roblox.
</Alert>

To create a developer product:

1. Go to [Creations](https://create.roblox.com/dashboard/creations) and select an experience.
2. Go to **Monetization** ⟩ **Developer Products**.
3. Click **Create a Developer Product**.
4. Upload an image to display as the product icon. Make sure the image doesn't exceed 512x512 pixels, doesn't include important details outside of its circular boundaries, and is in `.jpg`, `.png`, or `.bmp` format.
5. Enter a name and a description for the product.
6. Set the product price in Robux. The minimum price is 1 Robux, and the maximum price is 1 billion Robux.
7. Click **Create Developer Product**.

<Alert severity="info">
   If you want to use the developer product as a randomized reward, review the [randomized virtual item policy](./virtual-items.md).
</Alert>

## Get the developer product ID

To use scripting, you need a developer product ID. To get the product ID:

1. Go to **Monetization** &rang; **Developer Products**.
1. Hover over a product's thumbnail, click the **&ctdot;** button, and select **Copy Asset ID** from the context menu.

   <img src="../../assets/creator-dashboard/Options-Button-Developer-Product.png" width="200" />

## Sell a developer product

<Alert severity="info">
If you're using [price optimization](./price-optimization.md), make sure to place the script inside a `Class.LocalScript` so that users see personalized product prices.
</Alert>

Before selling developer products, make sure you are properly processing sales receipts and granting users their purchased products. To do so, you must:

- Use the `Class.MarketplaceService.ProcessReceipt|ProcessReceipt` API to check purchase receipts. `ProcessReceipt` automatically reads and acknowledges that a user has purchased a product outside of the experience.
- Validate each receipt for `User ID`, `Developer Product ID`, and the receipt status.
- If the receipt has a status of **Open**, grant the user the developer items they have purchased.
- Respond to the `ProcessReceipt` API with a message acknowledging the receipt and validating that the purchased items were granted.

You can sell developer products in two ways:

- [Inside your experience](#inside-your-experience)
- [Outside your experience](#outside-your-experience)

### Inside your experience

To implement and sell a developer product inside an experience, call `Class.MarketplaceService|MarketplaceService` functions.

Use `Class.MarketplaceService:GetProductInfo()|GetProductInfo` to retrieve information about a developer product, like name and price, and then to display that product to users. You can sell the product inside your experience's marketplace, for example. For developer products, the second parameter must be `Enum.InfoType.Product`.

```lua
local MarketplaceService = game:GetService("MarketplaceService")

-- Replace the placeholder ID with your developer product ID
local productId = 000000

local success, productInfo = pcall(function()
	return MarketplaceService:GetProductInfo(productId, Enum.InfoType.Product)
end)

if success and productInfo then
	-- Display product information
	-- Replace the print statements with UI code to display the product
  print("Developer Product Name: " .. productInfo.Name)
  print("Price in Robux: " .. productInfo.PriceInRobux)
  print("Description: " .. productInfo.Description)
end
```

Use `Class.MarketplaceService:GetDeveloperProductsAsync()|GetDeveloperProductsAsync` to retrieve all developer products associated with your experience. This function returns a `Class.Pages|Pages` object that you can inspect and filter to build things like an in-experience store or product list GUI.

```lua
local MarketplaceService = game:GetService("MarketplaceService")

local success, developerProducts = pcall(function()
	return MarketplaceService:GetDeveloperProductsAsync()
end)

if success and developerProducts then
	local firstPage = developerProducts:GetCurrentPage()
	for _, developerProduct in firstPage do
			-- Replace the print statement with UI code to display the product
			print(field .. ": " .. value)
	end
end
```

Use `Class.MarketplaceService:PromptProductPurchase()|PromptProductPurchase` to prompt product purchases inside your experience. You can call this function when a user performs actions like pressing a button or talking to a vendor NPC.

```lua
local MarketplaceService = game:GetService("MarketplaceService")
local Players = game:GetService("Players")
local player = Players.LocalPlayer

-- Replace the placeholder ID with your developer product ID
local productId = 000000

local function promptProductPurchase()
    local success, errorMessage = pcall(function()
      MarketplaceService:PromptProductPurchase(player, productId)
    end)

    if success then
      print("Purchase prompt shown successfully")
		end
end
```

You can also combine functions inside a `Class.LocalScript|LocalScript`. For example, you can create a UI element like a button or a vendor NPC, then use `Class.MarketplaceService:GetProductInfo()|GetProductInfo()` to connect an existing developer product to that element, check if the product is for sale, and use `Class.MarketplaceService:PromptProductPurchase()|PromptProductPurchase()` to prompt a purchase whenever the user clicks on it.

```lua
local MarketplaceService = game:GetService("MarketplaceService")
local Players = game:GetService("Players")

local player = Players.LocalPlayer
local button = script.Parent

-- Replace the placeholder ID with your developer product ID
local productId = 000000

	-- Gets product info when user clicks the UI button
button.MouseButton1Click:Connect(function()
	local success, productInfo = pcall(function()
		return MarketplaceService:GetProductInfo(productId, Enum.InfoType.Product)
	end)

	if success and productInfo then
		-- Checks if product is for sale
		if productInfo.IsForSale then
			print("This is for sale")
			-- Prompts product purchase
			MarketplaceService:PromptProductPurchase(player, productId)
		else
			-- Notifies product isn't for sale
			print("This product is not currently for sale.")
		end
	else
		print("Error retrieving product info: " .. tostring(productInfo))
	end
end)
```

### Outside your experience

To enable developer product purchases outside your experience, you must work with the `Class.MarketplaceService.ProcessReceipt|ProcessReceipt` API. After a user makes a purchase in the **Store** tab of your experience details page, you must use `ProcessReceipt` to confirm their purchase and grant them their items once they enter your experience.

<Alert severity="warning">
Do **not** use the `Class.MarketplaceService:PromptProductPurchaseFinished|PromptProductPurchaseFinished` event to process purchases. You must use the `ProcessReceipt` callback instead.

The firing of `PromptProductPurchaseFinished` does not mean that a user has successfully purchased an item.
</Alert>

#### Test mode

<Alert severity="warning">
Items for sale in test mode cost actual Robux. We recommend testing low-cost developer products.
</Alert>

The **test mode** feature helps you validate your purchase flow by simulating a developer product purchase outside your experience. You should use test mode to make sure that you have implemented `ProcessReceipt` correctly before enabling external developer product sales.

The developer products you put up for sale in test mode can only be seen by you and by members of your group. They are not visible to users.

To test your implementation:

1. In the **Creator Hub**, go to **Monetization** ⟩ **Developer Products**.
2. Click the **&vellip;** menu and select **External Purchase Settings**.
3. In the **External Purchase Settings** page, click **Enable test mode**.
4. Once test mode is active, return to the **Developer Products** page and select a product to test.
5. In the **Basic Settings** page, select the **Allow external purchases** checkbox and save your changes.
6. Go to the **Store** tab of the experience details page and purchase the product you made available for sale.
7. Enter the experience and confirm that you have received the product you purchased. The receipt status of the `ProcessReceipt` API should update to **Closed**.

After you test your implemention, Roblox verifies that the test has been successfully completed and allows you to fully activate the feature to sell developer products outside your experiences.

For more information about the `ProcessReceipt` API and its implementation, see the `Class.MarketplaceService.ProcessReceipt|ProcessReceipt` page.

#### Enable external sales

<Alert severity="info">
You can only enable external sales after you have used test mode to validate your purchase flow.
</Alert>

To enable external sales:

1. Go to the **External Purchase Settings** page.
2. Turn on **External Purchases**.
3. Return to the **Developer Products** page and select the products you want to sell outside of your experience.
4. In the **Basic Settings** page, select the **Allow external purchases** checkbox and save your changes.
5. Confirm that the products are now available for purchase in the **Store** tab of the experience details page.

To disable the external sale of a developer product, select the product on the **Developer Products** page and clear the **Allow external purchases** checkbox.

#### Limitations

- Items for sale in test mode cost actual Robux. We recommend testing low-cost developer products.
- Items for sale in test mode can only be seen by you or by members of your group.
- To be sold externally, your developer products **must** have a thumbnail.
- You should not sell the following outside your experience:
		- Paid random items
		- Items that are limited to specific quantities, time, place, or user settings and roles

## Handle a developer product purchase

After a user purchases a developer product, you must handle and record the transaction. To do this, use a `Class.Script` within `Class.ServerScriptService` using the `ProcessReceipt` function.

For more information about the `ProcessReceipt` API and its implementation, see the `Class.MarketplaceService.ProcessReceipt|ProcessReceipt` page.

```lua
local MarketplaceService = game:GetService("MarketplaceService")
local Players = game:GetService("Players")

local productFunctions = {}

-- Example: product ID 123123 brings the user back to full health
productFunctions[123123] = function(receipt, player)
	local character = player.Character
	local humanoid = character and character:FindFirstChildWhichIsA("Humanoid")

	if humanoid then
		humanoid.Health = humanoid.MaxHealth
		-- Indicates a successful purchase
		return true
	end
end

-- Example: product ID 456456 awards 100 gold coins to the user
productFunctions[456456] = function(receipt, player)
	local leaderstats = player:FindFirstChild("leaderstats")
	local gold = leaderstats and leaderstats:FindFirstChild("Gold")

	if gold then
		gold.Value += 100
		return true
	end
end

local function processReceipt(receiptInfo)
	local userId = receiptInfo.PlayerId
	local productId = receiptInfo.ProductId

	local player = Players:GetPlayerByUserId(userId)
	if player then
		-- Gets the handler function associated with the developer product ID and attempts to run it
		local handler = productFunctions[productId]
		local success, result = pcall(handler, receiptInfo, player)
		if success then
			-- The user has received their items
			-- Returns "PurchaseGranted" to confirm the transaction
			return Enum.ProductPurchaseDecision.PurchaseGranted
		else
			warn("Failed to process receipt:", receiptInfo, result)
		end
	end

	-- The user's items couldn't be awarded
	-- Returns "NotProcessedYet" and tries again next time the user joins the experience
	return Enum.ProductPurchaseDecision.NotProcessedYet
end

-- Sets the callback
-- This can only be done once by one server-side script
MarketplaceService.ProcessReceipt = processReceipt
```

<Alert severity="info">
The `receiptInfo` table passed to the `Class.MarketplaceService.ProcessReceipt()|ProcessReceipt()` callback function contains detailed information about the purchase, like the ID of the purchased product, the user who made the purchase, and the currency they used.

`receiptInfo` also contains the exact Robux amount the user paid for the product, even if you're running a [price optimization test](./price-optimization.md) and showing different users different prices.
</Alert>

<Alert severity="warning">
The functions for handling each product ID must return `true` for the transaction to be successful. If they don't, the product will not be awarded to the user who purchased it.
</Alert>

<Alert severity="warning">
Although Roblox itself does **not** record the purchase history of developer products by specific users, you can request to [download sales data](../../production/analytics/analytics-dashboard.md#sales-data). If you want to track user-specific purchase history, it's your responsibility to [store the data](../../cloud-services/data-stores/index.md).
</Alert>

## Personalize your in-experience store

You can use product intelligence APIs to sort and recommend developer products to users. Personalizing your in-experience store helps surface the most relevant items to each user, boosting engagement and revenue. By tailoring developer products to user preferences, you can improve their discovery, increase conversion rates, and unlock new monetization opportunities.

### Rank developer products for sale

`Class.MarketplaceService.RankProductsAsync|RankProductsAsync` takes in a list of product IDs and returns a personalized ordered list of those products. You can use this method to provide your users with personalized item recommendations in your in-experience store.

<Alert severity="warning">
Because `RankProductsAsync` has a strict rate limit, you should load recommendations once at game join instead of calling it repeatedly.
</Alert>

	<figcaption>Example: Three "Powers" items ranked for the user</figcaption>
  <img src="../../assets/monetization/developer-products/RankedItems.png" alt="Three items ranked for the user." width="80%" />

```lua
local MarketplaceService = game:GetService("MarketplaceService")

-- Create an array of products you want to rank
local productIdentifiers = {
    {InfoType = Enum.InfoType.GamePass, Id = 123},
    {InfoType = Enum.InfoType.Product, Id = 456},
    {InfoType = Enum.InfoType.Product, Id = 789}
}

-- Make a protected call to handle errors
local success, rankedProducts = pcall(function()
    return MarketplaceService:RankProductsAsync(productIdentifiers)
end)

if not success then
    error("Failed to rank products")
end

-- Load the returned items into the store
for i, rankedItem in ipairs(rankedProducts) do
    local productIdentifier = rankedItem.ProductIdentifier
    local productInfo = rankedItem.ProductInfo
    -- ...
    -- Logic to add products into store
end
```

### Display your top developer products

<Alert severity="warning">
If your experience has had no item sales in the past 28 days, `RecommendTopProductsAsync` returns an empty list. At least one purchase within the last 28 days is required for this API to generate recommendations.
</Alert>

`Class.MarketplaceService.RecommendTopProductsAsync|RecommendTopProductsAsync` takes an array of `Enum.InfoType|InfoType` values and returns up to 50 items a user is most likely to engage with and purchase. You can use this method to create a "Top Picks" section in your in-experience store.

If no recommendations can be determined, `RecommendTopProductsAsync` returns 0 items.

<Alert severity="warning">
In rare cases, calls to the ranking model can be slow. To help prevent added lately for users, we recommend using `task.spawn` to make the call to `RecommendTopProductgs` non-blocking.
</Alert>

	<figcaption>Example: A "Top Picks" tab in an in-experience store</figcaption>
  <img src="../../assets/monetization/developer-products/StoreTopPicks.png" alt="Top Picks tab of an in-experience store." width="90%" />

```lua
local MarketplaceService = game:GetService("MarketplaceService")

-- Create an array of product types you want to include in the recommendations -- This example includes both passes and developer products
local productTypes = {Enum.InfoType.GamePass, Enum.InfoType.Product}

-- Make a protected call to handle errors
local success, topRankedItems = pcall(function()
    return MarketplaceService:RecommendTopProductsAsync(productTypes)
end)

if not success then
    error("Failed to rank products")
end

-- Load the returned items into the store
-- Make sure to filter out any ineligible items from topRankedItems such as developer products the user can no longer purchase
for i, rankedItem in ipairs(topRankedItems) do
    local productIdentifier = rankedItem.ProductIdentifier
    local productInfo = rankedItem.ProductInfo
    -- ...
    -- Logic to add products into store
end
```

## Developer product analytics

Use developer product analytics to analyze the success of individual products, identify trends, and forecast potential future earnings.

With analytics, you can:

- View your top developer products over a selected time period.
- Showcase up to eight top-selling items on a time-series graph to analyze overall sales and net revenue.
- Monitor your catalog and sort items by sales and net revenue.

To access developer product analytics:

1. Go to [Creations](https://create.roblox.com/dashboard/creations) and select an experience.
2. Go to **Monetization** ⟩ **Developer Products**.
3. Select the **Analytics** tab.

<img src="../../assets/monetization/developer-products/developer-products-analytics-2.png" width="100%" />
