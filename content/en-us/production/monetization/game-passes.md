---
title: Passes
description: Passes allow you to charge a one-time Robux fee in order for users to access special privileges in your experience.
---

**Passes** allow you to charge a **one-time Robux fee** in order for players to access special privileges within an experience, such as entry to a restricted area, an in-experience avatar item, or a permanent power-up.

<Alert severity="info">
   For items that a player might purchase multiple times, such as potions, temporary power-ups, or in-experience currency, see [Developer Products](../../production/monetization/developer-products.md).
</Alert>

## Creating Passes

<Alert severity="warning">
   Before you can create a Pass, you must first [publish your experience](../../production/publishing/publishing-experiences-and-places.md) so it's accessible on the Roblox site.
</Alert>

When you're creating an image to use for your Pass, consider the following requirements:

- Use a template of **512×512 pixels**.
- Save the image in either `.jpg`, `.png`, or `.bmp` format.
- Don't include important details outside of the circular boundaries because the upload process trims and crops the final badge into a circular image.

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

To create a new Pass:

1. Navigate to your [Creations](https://create.roblox.com/dashboard/creations) page on **Creator Dashboard** and select your experience.
2. In the **Monetization** menu, select **Passes**. All passes for that experience display.
    <img src="../../assets/monetization/game-passes/Passes.png" width="50%" />
3. Click the **CREATE A PASS** button. The **Create a Pass** page displays.
4. Uploading an image for your pass is optional. If desired, press the **CHANGE** button to change the default image and upload your own.
5. Fill in the following fields:

   - **Name**: A title for your Pass.
   - **Description**: A description what a player should expect when they purchase the Pass.
  	<img src="../../assets/monetization/game-passes/create-a-pass.png" width="100%" />

6. Click the **CREATE PASS** button. The Pass displays within the **Passes** section of the **Creations** page.

<Alert severity="info">
   If the pass will be used as a "randomized" reward, remember to review the <a href="./randomized-virtual-items-policy.md">Randomized Virtual Item Policy</a>.
</Alert>

### Locating Pass IDs

A Pass ID is the unique identifier of a Pass. You need this ID to [assign the Pass a special privilege](#assigning-pass-privileges).

To locate a Pass ID:

1. Navigate to the **Passes** section of an experience's **Monetization** menu.

1. Hover over a Pass thumbnail and click the **&ctdot;** button. A contextual menu displays.

1. Select **Copy Asset ID**. The Pass ID copies to your clipboard.

   <img src="../../assets/monetization/game-passes/Copy-AssetID.png" width="50%" />

## Monetizing Passes

After you [create a Pass](#creating-passes), you can configure its settings to monetize it.

To monetize a Pass:

1. Navigate to the **Passes** section of an experience's **Monetization** menu.

1. Hover over a Pass thumbnail and click the **&ctdot;** button. A contextual menu displays.

1. Select **Open in New Tab**. The **Configure Pass** page displays.

   <img src="../../assets/monetization/game-passes/Open-In-New-Tab.png" width="50%" />

1. In the left-hand navigation, select **Sales**.

   <img src="../../assets/monetization/game-passes/Configure-Sales-Button.png" width="50%" />

1. Enable the **Item for Sale** toggle.

   <img src="../../assets/monetization/game-passes/Configure-For-Sale-Toggle.png" width="50%" />

1. In the **Price** field, enter the amount of Robux you want to charge players for the Pass. The price you enter affects the amount of Robux you earn per sale.

   <img src="../../assets/monetization/game-passes/Configure-Set-Price.png" width="60%" />

1. Click the **SAVE CHANGES** button.

## Assigning Pass Privileges

Once a player purchases a Pass, they'll expect to receive the associated special privilege when they play your experience. This does **not** happen automatically, so you must check which players own the Pass and assign the special privilege to them.

The following script checks when any player enters the experience, then verifies if that player owns the Pass with the matching ID set in the variable `passID`. Place this code in a `Class.Script` within `Class.ServerScriptService` so the server can handle the special privilege given to the player.

```lua
local MarketplaceService = game:GetService("MarketplaceService")
local Players = game:GetService("Players")

local passID = 0000000  -- Change this to your Pass ID

local function onPlayerAdded(player)
	local hasPass = false

	-- Check if the player already owns the Pass
	local success, message = pcall(function()
		hasPass = MarketplaceService:UserOwnsGamePassAsync(player.UserId, passID)
	end)

	-- If there's an error, issue a warning and exit the function
	if not success then
		warn("Error while checking if player has pass: " .. tostring(message))
		return
	end

	if hasPass then
		print(player.Name .. " owns the Pass with ID " .. passID)
		-- Assign this player the ability or bonus related to the Pass
	end
end

-- Connect "PlayerAdded" events to the function
Players.PlayerAdded:Connect(onPlayerAdded)
```

## Prompting In-Experience Purchases

While players can purchase Passes directly from your experience's main page, you can also offer **in-experience purchases** to players through a shop or vendor NPC within the experience. Reference the example [server-side](#example-server-side-script) and [client-side](#example-client-side-script) scripts for a basic model to prompt players to purchase Passes.

<Alert severity="warning">
   Roblox itself does **not** record the purchase history of Passes by specific players, although you can [view overall daily and monthly stats](../../production/analytics/index.md). If you want to track player-specific purchase history, it's your responsibility to [store the data](../../cloud-services/datastores.md).
</Alert>

### Example Server-Side Script

Place this code in a `Class.Script` object within `Class.ServerScriptService` so the server can handle the special privilege given to the player.

```lua
local MarketplaceService = game:GetService("MarketplaceService")

local passID = 0000000  -- Change this to your Pass ID

-- Function to handle a completed prompt and purchase
local function onPromptPurchaseFinished(player, purchasedPassID, purchaseSuccess)
	if purchaseSuccess and purchasedPassID == passID then
		print(player.Name .. " purchased the Pass with ID " .. passID)
		-- Assign this player the ability or bonus related to the Pass
	end
end

-- Connect "PromptGamePassPurchaseFinished" events to the function
MarketplaceService.PromptGamePassPurchaseFinished:Connect(onPromptPurchaseFinished)
```

### Example Client-Side Script

The following code implements a `promptPurchase()` function which safely checks if a player has a Pass and prompts them to purchase it if they don't already have it. Place this code in a `Class.LocalScript` and call `promptPurchase()` in situations such as when the player clicks a [button](../../ui/buttons.md) or when their character touches a part.

```lua
local MarketplaceService = game:GetService("MarketplaceService")
local Players = game:GetService("Players")

local passID = 0000000  -- Change this to your Pass ID

-- Function to prompt purchase of the Pass
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
		-- Player already owns the Pass; tell them somehow
	else
		-- Player does NOT own the Pass; prompt them to purchase
		MarketplaceService:PromptGamePassPurchase(player, passID)
	end
end
```

## Passes Analytics

Passes Analytics help you gauge the success of individual Passes, identify trends, and forecast potential future earnings.  

To access Passes analytics:

1. Navigate to your [Creations](https://create.roblox.com/dashboard/creations) page on **Creator Dashboard** and select your experience.

2. Navigate to **Monetization > Passes** and select the **Analytics** tab.

<img src="../../assets/monetization/game-passes/passes-analytics.png" width="100%" />

The analytics tab enables you to:

- **View top performing items:** See your top selling and top grossing Passes over a selected time period.
- **Analyze overall sales and net revenue:** Showcase up to eight top items on a time-series graph.
- **Monitor your catalog:** Examine a table with up to 400 items, sortable by sales and net revenue.

<img src="../../assets/monetization/game-passes/passes-analytics-2.png" width="100%" />
