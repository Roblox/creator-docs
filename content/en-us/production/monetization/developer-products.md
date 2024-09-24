---
title: Developer Products
description: Developer products let you charge users a Robux fee for items or abilities that they can access and use inside your experience.
---

A **developer product** is an item or ability that a user can purchase more than once, such as in-experience currency, ammo, or potions.

<img src="../../assets/monetization/developer-products/Buy-Product-Example.jpg" />

<Alert severity="info">
   For items or abilities that a user should only purchase **once**, such as a special weapon or a permanent power-up, see [Passes](../../production/monetization/game-passes.md).
</Alert>

## Creating Developer Products

<Alert severity="warning">
   Before creating a developer product, make sure your experience has been [published](../../production/publishing/publishing-experiences-and-places.md) and is accessible on Roblox.
</Alert>

To create a developer product:

1. Go to [Creations](https://create.roblox.com/dashboard/creations) and select an experience.
2. Go to **Monetization** > **Developer Products**.
3. Click **Create a Developer Product**.
4. Upload an image to display as the product icon. Make sure the image doesn't exceed 512x512 pixels, doesn't include important details outside of its circular boundaries, and is in `.jpg`, `.png`, or `.bmp` format.
5. Enter a name and a description for the product.
6. Set the product price in Robux.
7. Click **Create Developer Product**.

<Alert severity="info">
   If you want to use the developer product as a randomized reward, review the [Randomized Virtual Item Policy](./randomized-virtual-items-policy.md).
</Alert>

## Getting Developer Product IDs

To use scripting, you need a developer product ID. To get the product ID:

1. Go to **Monetization** > **Developer Products**.
2. Hover over the product and click the **&ctdot;** menu.
3. Click **Copy Asset ID** to copy the ID to your clipboard.

   <img src="../../assets/creator-dashboard/Developer-Product-Copy-Asset-ID.png" width="400" />

## Selling Developer Products

To implement and sell a developer product inside an experience, call `Class.MarketplaceService|MarketplaceService` functions.

Use `Class.MarketplaceService:GetProductInfo()|GetProductInfo()` to retrieve information about a developer product, like name and price, and then to display that product to users. You can sell the product inside your experience's marketplace, for example. For developer products, the second parameter must be `Enum.InfoType.Product`.

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

Use `Class.MarketplaceService:GetDeveloperProductsAsync()|GetDeveloperProductsAsync()` to retrieve all developer products associated with your experience. This function returns a `Class.Pages|Pages` object that you can inspect and filter to build things like an in-experience store or product list GUI.

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

Use `Class.MarketplaceService:PromptProductPurchase()|PromptProductPurchase()` to prompt product purchases inside your experience. You can call this function when a user performs actions like pressing a button or talking to a vendor NPC.

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
local player = game.Players.LocalPlayer
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

## Handling Developer Product Purchases

After a user purchases a developer product, you must handle and record the transaction. To do this, use a `Class.Script` within `Class.ServerScriptService` using the `Class.MarketplaceService.ProcessReceipt()|ProcessReceipt()` function.

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
</Alert>

<Alert severity="warning">
The functions for handling each product ID must return `true` for the transaction to be successful. If they don't, the product will not be awarded to the user who purchased it.
</Alert>

<Alert severity="warning">
Although Roblox itself does **not** record the purchase history of developer products by specific users, you can request to [download sales data](../../production/analytics/analytics-dashboard.md#sales-data). If you want to track user-specific purchase history, it's your responsibility to [store the data](../../cloud-services/data-stores).
</Alert>

## Developer Product Analytics

Use developer product analytics to analyze the success of individual products, identify trends, and forecast potential future earnings.

With analytics, you can:

- View your top developer products over a selected time period.
- Showcase up to eight top-selling items on a time-series graph to analyze overall sales and net revenue.
- Monitor your catalog and sort items by sales and net revenue.

To access developer product analytics:

1. Go to [Creations](https://create.roblox.com/dashboard/creations) and select an experience.
2. Go to **Monetization** > **Developer Products**.
3. Select the **Analytics** tab.

<img src="../../assets/monetization/developer-products/developer-products-analytics-2.png" width="100%" />
