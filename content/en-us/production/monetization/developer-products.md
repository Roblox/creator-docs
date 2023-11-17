---
title: Developer Products
description: Developer Products are items or abilities that users can purchase more than once.
---

A **Developer Product** is an item or ability that a user can purchase more than once, such as in-experience currency, ammo, or potions.

<img src="../../assets/monetization/developer-products/Buy-Product-Example.jpg" width="80%" />

<Alert severity="info">
   For items or abilities that a user should only purchase **once**, such as a special weapon or a permanent power-up, see [Passes](../../production/monetization/game-passes.md).
</Alert>

## Creating Developer Products

When you're creating an image to use for your Developer Product, consider the following requirements:

- Use a template of **512×512 pixels**.
- Save the image in either `.jpg`, `.png`, or `.bmp` format.
- Don't include important details outside of the circular boundaries because the upload process trims and crops the final Developer Product into a circular image.

To create a new Developer Product:

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations) and click on the experience you want to create a Developer Product for. The experience's **Overview** page displays.
1. Click on the experience you want to create a Developer Product for. The experience's **Overview** page displays.
1. In the left-hand navigation, select **Associated Items**. The **Associated Items** page displays.

   <img src="../../assets/monetization/game-passes/Associated-Items.jpg" width="30%" />

1. In the horizontal navigation, select **DEVELOPER PRODUCTS**. All Developer Products for that experience display.
1. Click the **CREATE A DEVELOPER PRODUCT** button. The **Create a Developer Product** page displays.
1. Click the **UPLOAD IMAGE** button. A file browser displays.
1. Select the image you want to display as the icon, then click the **Open** button.
1. Fill in the following fields:

   - **Name**: A title for your Developer Product.
   - **Description**: A description what a user should expect when they purchase the Developer Product.
   - **Price in Robux**: The amount of Robux you want to charge users for the Developer Product.

1. Click the **CREATE DEVELOPER PRODUCT** button. The Developer Product displays within the **Developer Products** section of the **Associated Items** page.

   <img src="../../assets/monetization/developer-products/Create-A-Developer-Product.jpg" width="70%" />

<Alert severity="info">
   If you are creating a randomized Developer Product, review the <a href="./randomized-virtual-items-policy.md">Randomized Virtual Item Policy</a>.
</Alert>

### Locating Developer Product IDs

A Developer Product ID is the unique identifier of a Developer Product. You need this ID when you are [scripting Badges](#scripting-developer-products).

To locate a Developer Product ID:

1. Navigate to the **Developer Product** section of an experience's **Associated Items** page.
1. Hover over a Developer Product thumbnail and click the **&ctdot;** button. A contextual menu displays.
1. Select **Copy Asset ID**. The Developer Product ID copies to your clipboard.

   <img src="../../assets/monetization/developer-products/Copy-AssetID-Developer-Products.jpg" width="50%" />

## Scripting Developer Products

You must use scripting to implement Developer Product effects in your experiences.

Common Developer Product scripting use cases include:

- [Prompting purchases](#prompting-purchases).

- [Handling purchases](#handling-purchases).

- [Getting information](#getting-information).

### Prompting Purchases

You can prompt a user to purchase one of your developer products with
the `Class.MarketplaceService:PromptProductPurchase()|PromptProductPurchase()` method of `Class.MarketplaceService`. Depending on the needs of your experience, you can call the `promptPurchase()` function in situations such as when the user presses a [button](../../ui/buttons.md) or when their character talks to a vendor NPC.

```lua
local MarketplaceService = game:GetService("MarketplaceService")
local Players = game:GetService("Players")

local player = Players.LocalPlayer

local productId = 0000000  -- Change this to your developer product ID

-- Function to prompt purchase of the developer product
local function promptPurchase()
	MarketplaceService:PromptProductPurchase(player, productId)
end
```

### Handling Purchases

After a user purchases a developer product, it's your responsibility to handle and record the transaction. You can do this through a `Class.Script` within `Class.ServerScriptService` using the `Class.MarketplaceService.ProcessReceipt` callback.

```lua
local MarketplaceService = game:GetService("MarketplaceService")
local Players = game:GetService("Players")

local productFunctions = {}

-- Product ID 123123 brings the user back to full health
productFunctions[123123] = function(receipt, player)
	local character = player.Character
	local humanoid = character and character:FindFirstChildWhichIsA("Humanoid")

	if humanoid then
		humanoid.Health = humanoid.MaxHealth
		-- Indicate a successful purchase
		return true
	end
end

-- Product ID 456456 awards 100 gold to the user
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
		-- Get the handler function associated with the developer product ID and attempt to run it
		local handler = productFunctions[productId]
		local success, result = pcall(handler, receiptInfo, player)
		if success then
			-- The user has received their benefits
			-- Return "PurchaseGranted" to confirm the transaction
			return Enum.ProductPurchaseDecision.PurchaseGranted
		else
			warn("Failed to process receipt:", receiptInfo, result)
		end
	end

	-- The user's benefits couldn't be awarded
	-- Return "NotProcessedYet" to try again next time the user joins
	return Enum.ProductPurchaseDecision.NotProcessedYet
end

-- Set the callback; this can only be done once by one server-side script
MarketplaceService.ProcessReceipt = processReceipt
```

<Alert severity="info">
The `receiptInfo` table passed to the `processReceipt()` callback function contains detailed information on the purchase. For a list of keys and descriptions, as well as guarantees related to the callback, see the `Class.MarketplaceService.ProcessReceipt|ProcessReceipt` reference.
</Alert>

<Alert severity="warning">
The functions for handling each product ID **must** return `true` for it to successfully process the transaction. If not, the product will not be awarded.
</Alert>

<Alert severity="warning">
Roblox itself does **not** record the purchase history of Developer Products by specific users, although you can request to [download sales data](../../production/analytics/analytics-dashboard.md#sales-data). If you want to track user-specific purchase history, it's your responsibility to [store the data](../../cloud-services/datastores.md).
</Alert>

### Getting Information

To get information about a specific Developer Product, such as its price, name, or image, use the `Class.MarketplaceService:GetProductInfo()` function with a second argument of `Enum.InfoType.Product`. For example:

```lua
local MarketplaceService = game:GetService("MarketplaceService")

local productId = 000000  -- Change this to your developer product ID

local productInfo = MarketplaceService:GetProductInfo(productId, Enum.InfoType.Product)

local success, productInfo = pcall(function()
	return MarketplaceService:GetProductInfo(productId, Enum.InfoType.Product)
end)

if success then
	-- Use "productInfo" here
end
```

You can also get the data for all of the developer products in an experience by using the `Class.MarketplaceService:GetDeveloperProductsAsync()|GetDeveloperProductsAsync()` method. This returns a `Class.Pages` object that you can inspect and filter to build things like an in-experience store or product list GUI.

For example, the following script prints the name, price, ID, description, and AssetID for all Developer Products in an experience:

```lua
local MarketplaceService = game:GetService("MarketplaceService")

local success, developerProducts = pcall(function()
	return MarketplaceService:GetDeveloperProductsAsync():GetCurrentPage()
end)

if developerProducts then
	for _, developerProduct in developerProducts do
		for field, value in developerProduct do
			print(field .. ": " .. value)
		end
	end
end
```
