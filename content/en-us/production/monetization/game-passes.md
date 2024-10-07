---
title: Passes
description: Passes let you charge users a one-time Robux fee to access privileges inside your experience.
---

**Passes** let you charge users a one-time Robux fee to access special privileges inside your experience, such as entry to a restricted area, an in-experience avatar item, or a permanent power-up.

<Alert severity="info">
   For items that a player might purchase multiple times, such as potions, temporary power-ups, or in-experience currency, see [Developer Products](../../production/monetization/developer-products.md).
</Alert>

## Creating Passes

<Alert severity="warning">
   Before creating a pass, make sure your experience has been [published](../../production/publishing/publishing-experiences-and-places.md) and is accessible on Roblox.
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
    <img alt="Good circular trimming" src="../../assets/monetization/game-passes/Circular-Trimming-Good.png" />
    <figcaption>
      <Alert severity="success">Includes relevant content</Alert>
    </figcaption>
  </figure>
  <figure>
    <img alt="Bad circular trimming" src="../../assets/monetization/game-passes/Circular-Trimming-Bad.png" />
    <figcaption>
      <Alert severity="error">Crops important content</Alert>
    </figcaption>
  </figure>
</GridContainer>

<Alert severity="info">
   If you want to use the pass as a randomized reward, review the [Randomized Virtual Item Policy](./randomized-virtual-items-policy.md).
</Alert>

## Getting Pass IDs

To use scripting, you need a pass ID. To get the pass ID:

1. Go to **Monetization** &rang; **Passes**.
2. Hover over the pass and click the **&ctdot;** menu.
3. Click **Copy Asset ID** to copy the ID to your clipboard.

   <img src="../../assets/creator-dashboard/Pass-Copy-Asset-ID.png" width="400" />

## Selling Passes

<Alert severity="info">
If you're using [price optimization](./price-optimization.md), make sure to place the script inside a `Class.LocalScript` so that users see personalized pass prices.
</Alert>

You can sell passes outside or inside an experience.

### Outside an Experience

To sell a pass in an experience's **Store** page:

1. Go to **Monetization** &rang; **Passes**.
2. Hover over the pass and click the **&ctdot;** menu.
3. Select the pass you want to sell.
4. Select **Sales**.
5. Enable to **Item for Sale** toggle.
6. In the **Price in Robux** field, enter the amount of Robux you want to charge users for the pass. The price you enter affects how much Robux you earn per sale.
7. Click **Save Changes**. The pass populates in the experience's **Store** page.

### Inside an Experience

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

Use `Class.MarketplaceService:PromptPurchase()|PromptPurchase()` to prompt a pass purchase if the user doesn't already have the pass in their inventory. You can call this function when a user performs actions like pressing a button or talking to a vendor NPC.

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

Use `Class.MarketplaceService:PromptGamePassPurchaseFinished()|PromptGamePassPurchaseFinished()` to handle a completed pass prompt and purchase and assign the user the privileges associated with the pass.

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
Although Roblox itself does **not** record the purchase history of developer products by specific users, you can request to [download sales data](../../production/analytics/analytics-dashboard.md#sales-data). If you want to track user-specific purchase history, it's your responsibility to [store the data](../../cloud-services/data-stores).
</Alert>

## Assigning Pass Privileges

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

## Pass Analytics

Use pass analytics to analyze the success of individual passes, identify trends, and forecast potential future earnings.

With analytics, you can:

- View your top passes over a selected time period.
- Showcase up to eight top-selling items on a time-series graph to analyze overall sales and net revenue.
- Monitor your catalog and sort items by sales and net revenue.

To access pass analytics:

1. Go to [Creations](https://create.roblox.com/dashboard/creations) and select an experience.
2. Go to **Monetization** &rang; **Passes**.
3. Select the **Analytics** tab.

<img src="../../assets/monetization/game-passes/passes-analytics-2.png" width="100%" />
