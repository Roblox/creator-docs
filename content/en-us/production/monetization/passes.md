---
title: Passes
description: Passes let you charge users a one-time Robux fee to access privileges inside your game.
---

**Passes** let you charge users a one-time Robux fee to access special privileges inside your game, such as entry to a restricted area, an in-game avatar item, or a permanent power-up.

<Alert severity="info">
   For items that a player might purchase multiple times, such as potions, temporary power-ups, or in-game currency, see [Developer products](../../production/monetization/developer-products.md).
</Alert>

## Create a pass

<Alert severity="warning">
   Before creating a pass, make sure your game has been [published](../../production/publishing/publish-games-and-places.md) and is accessible on Roblox.
</Alert>

To create a pass:

1. Go to [Creations](https://create.roblox.com/dashboard/creations) and select a game.
2. Go to **Monetization** &rang; **Passes**.
3. Click **Create pass**.
4. Upload an image to display as the pass icon. Make sure the image doesn't exceed 512x512 pixels, doesn't include important details outside of its circular boundaries, and is in `.jpg`, `.png`, or `.bmp` format.
5. Enter a name and a description for the pass.
6. Select a category for the pass. The category is used to organize items in your in-game Shop.
7. Click **Create pass**.

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
   If you want to use the pass as a randomized reward, review the [Randomized Virtual Item Policy](./paid-random-items.md).
</Alert>

## Get the pass ID

To use scripting, you need a pass ID. To get the pass ID:

1. Go to **Monetization** &rang; **Passes**.
1. Hover over a pass' thumbnail, click the **&ctdot;** button, and select **Copy Asset ID** from the context menu.

   <img src="../../assets/creator-dashboard/Options-Button-Pass.png" width="200" />

## Sell a pass

<Alert severity="warning">
Starting May 30, 2026, cross-game pass sales will be disabled. If your game relies on cross-game sales mechanics, we recommend integrating [Robux transfers](./robux-transfers.md) before this date to avoid service interruptions.
</Alert>

<Alert severity="info">
If you're using [price optimization](./price-optimization.md), make sure the script runs on the client so that users see personalized pass prices.
</Alert>

You can sell passes in two ways:

- [Inside your game](#inside-your-game)
- [Outside your game](#outside-your-game)

### Inside your game

To implement and sell a pass inside a game, call `Class.MarketplaceService|MarketplaceService` functions.

Use `Class.MarketplaceService:GetProductInfo()|GetProductInfo()` to retrieve information about a pass, like name and price, and then to display that pass to users. You can sell the pass inside your game's marketplace, for example. For passes, the second parameter must be `Enum.InfoType.GamePass`.

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
When a player starts a [free trial](#free-trials), `Class.MarketplaceService.PromptGamePassPurchaseFinished|PromptGamePassPurchaseFinished` also fires with `purchaseSuccess` set to `true`. Before you grant permanent items, currency, or saved data, confirm the purchase with `Class.MarketplaceService:GetPassOwnershipAsync()|GetPassOwnershipAsync`.
</Alert>

<Alert severity="warning">
Although Roblox itself does **not** record the purchase history of passes by specific users, you can request to [download sales data](../../production/analytics/analytics-dashboard.md#sales-data). If you want to track user-specific purchase history, it's your responsibility to [store the data](../../cloud-services/data-stores/index.md).
</Alert>

### Outside your game

Roblox surfaces your **Listed** passes outside your game, including on the Roblox homepage, in search results, and on the post-purchase page after a player buys Robux. A player can buy your pass and then join your game with it already granted.

To make a pass eligible for external sales:

1. In the **Creator Hub**, go to **Monetization** ⟩ **Shop**.
2. Mark the pass **Listed**.

Passes don't require a `Class.MarketplaceService.ProcessReceipt|ProcessReceipt` fix, but they must be **Listed** to appear outside your game. We recommend adding a custom icon to each pass so players can recognize it on external surfaces; if you don't add one, Roblox shows a default icon.

## Assign pass privileges

You must manually assign pass privileges to users that purchase your passes. To do this, use `Class.Players.PlayerAdded|PlayerAdded` when a user joins your game to check if they already own the pass and to assign them the pass privileges.

<Alert severity="info">
During a [free trial](#free-trials), `Class.MarketplaceService:UserOwnsGamePassAsync()|UserOwnsGamePassAsync` returns `true`. Use that method for temporary access checks. For permanent grants, call `Class.MarketplaceService:GetPassOwnershipAsync()|GetPassOwnershipAsync` and check the `Owned` field.
</Alert>

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

## Free trials

**Free trials** give players the full benefits of a pass for one game session before they purchase it. Each player can start one free trial per pass, and only one free trial can be active at a time.

Starting December 2, 2026, free trials are available to players for any pass that has them enabled. New passes have free trials disabled by default.

You can also configure free trials with the [Open Cloud game passes API](../../cloud/api/game-passes.md).

### Enable free trials

To enable free trials for one or more passes:

1. Go to [Creations](https://create.roblox.com/dashboard/creations) and select a game.
2. Go to **Monetization** ⟩ **Shop** ⟩ **Free Trials**.
3. Enable free trials for each pass you want players to try.

You can also select a pass from **Monetization** ⟩ **Passes**, open its sales settings, and enable free trials there. To disable free trials, turn the setting off for each pass on the same pages.

### How free trials work

When free trials are enabled for a pass, players who don't already own it see a **Try** button in Shop. After a player starts a trial:

1. The trial lasts for one game session.
2. A button in the top right of the screen indicates that the trial is active. Before the session ends, the button changes to **Buy** so the player can purchase the pass during the trial.
3. If the player purchases the pass during the trial, they keep it. If the session ends without a purchase, access is revoked.

If a session ends unexpectedly because of a system error and the player rejoins within one hour, the free trial continues.

Players who already own a pass aren't eligible for its free trial and don't see a trial offer.

### Update your code for free trials

Access checks continue to work during a trial, but you must update any code that grants permanent items, currency, or saved data when ownership becomes `true`.

<table>
  <thead>
    <tr>
      <th>Event</th>
      <th>Behavior</th>
      <th>Recommended action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Player starts a trial</td>
      <td>`Class.MarketplaceService.PromptGamePassPurchaseFinished|PromptGamePassPurchaseFinished` fires on the client and server with `purchaseSuccess` set to `true`</td>
      <td>Call `Class.MarketplaceService:GetPassOwnershipAsync()|GetPassOwnershipAsync` and confirm `Owned` is `true` before granting permanent rewards</td>
    </tr>
    <tr>
      <td>Trial is active</td>
      <td>`Class.MarketplaceService:UserOwnsGamePassAsync()|UserOwnsGamePassAsync` returns `true`</td>
      <td>Use existing temporary access checks as usual</td>
    </tr>
    <tr>
      <td>Trial ends</td>
      <td>No event fires. Ownership checks return `false`</td>
      <td>Re-check ownership when access matters instead of caching ownership for the session</td>
    </tr>
  </tbody>
</table>

Use `Class.MarketplaceService:GetPassOwnershipAsync()|GetPassOwnershipAsync` to distinguish a purchased pass from an active trial. On the client, the method can only query the local player. On the server, it can query any player.

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>`Owned`</td>
      <td>Whether the player purchased the pass.</td>
    </tr>
    <tr>
      <td>`Active`</td>
      <td>Whether the player currently has access through a purchase or an active trial. Matches `Class.MarketplaceService:UserOwnsGamePassAsync()|UserOwnsGamePassAsync`.</td>
    </tr>
    <tr>
      <td>`StartTime` and `EndTime`</td>
      <td>Included while a trial is active.</td>
    </tr>
  </tbody>
</table>

```lua
local MarketplaceService = game:GetService("MarketplaceService")

-- Replace the placeholder ID with your pass ID
local passID = 0000000

local function grantPermanentRewardIfOwned(player)
	local success, ownership = pcall(function()
		return MarketplaceService:GetPassOwnershipAsync(player, passID)
	end)

	if not success then
		warn("Error while checking pass ownership: " .. tostring(ownership))
		return
	end

	-- Only grant permanent rewards for purchased passes, not free trials
	if ownership.Owned then
		-- Grant permanent items, currency, or saved data here
	elseif ownership.Active then
		-- Player is in a free trial; grant temporary access only
	end
end

MarketplaceService.PromptGamePassPurchaseFinished:Connect(function(player, purchasedPassID, purchaseSuccess)
	if purchaseSuccess and purchasedPassID == passID then
		grantPermanentRewardIfOwned(player)
	end
end)
```

<Alert severity="warning">
Don't grant one-time purchase bonuses, permanent currency, or data store unlocks when a trial starts. If you cache pass ownership for an entire session, players might keep trial benefits after the trial ends, or lose access to content that depended on a stale ownership check.
</Alert>

In Studio playtests, free trials last one hour so you can test the start, active, and expiry flow before you publish.

### Common patterns to update

Most pass code assumes that once a player owns a pass, they own it forever. A free trial gives the pass for a limited time, so the following common patterns can let players keep its benefits after the trial ends. A player in a trial should get exactly what a buyer gets, and ownership can also end for buyers, for example after a refund. The fix for all of them is the same: apply pass benefits from a live ownership check, and don't save them.

#### Saving or caching ownership

The most common pattern stores "owns pass" the first time `Class.MarketplaceService:UserOwnsGamePassAsync()|UserOwnsGamePassAsync` returns `true`, in saved data or in a table for the session, and reads that value instead of calling the API again. After the trial ends, the stored value is still `true`.

```lua title="Avoid: stored value skips the check"
if data.Passes[passID] or MarketplaceService:UserOwnsGamePassAsync(player.UserId, passID) then
	data.Passes[passID] = true
	grantPassBenefits(player)
end
```

Call `UserOwnsGamePassAsync` every time access matters, such as on join, on spawn, and when the benefit is used. Roblox caches the result internally, so repeated calls are inexpensive, and the result changes to `false` when the trial ends. If a call fails, deny access and try again on the next check.

```lua title="Instead: check ownership when access matters"
local function ownsPass(player)
	local success, hasPass = pcall(function()
		return MarketplaceService:UserOwnsGamePassAsync(player.UserId, passID)
	end)
	return success and hasPass
end

local function onCharacterAdded(player)
	if ownsPass(player) then
		giveTool(player, "Dark Blade")
		setSpeed(player, MAX_SPEED)
	end
end
```

#### Saving what the pass grants

Some passes write their benefit into saved data, such as an item in the inventory, a maxed upgrade, an unlock, or currency. Even with a live check on every join, the saved benefit stays after the trial ends. Clearing an ownership flag doesn't help if the benefit itself was saved somewhere else.

```lua title="Avoid: benefit written to saved data"
if ownsPass(player) then
	data.Inventory["Dark Blade"] = true
	data.Upgrades.Speed = MAX_SPEED
	data.Coins += BONUS_COINS
end
```

Apply the benefit at runtime from `ownsPass`, as in the previous example, so it's rebuilt every session and ends when ownership ends. If the pass grants something players keep and use up, such as currency, sell it as a [developer product](./developer-products.md) instead.

If your game already saved pass benefits, stop saving new ones and remove only items you recorded as granted by the pass, such as items tagged with the pass ID. Don't remove an item from every player who doesn't own the pass, because they might have earned or traded for it.

#### Granting from the purchase signal

`Class.MarketplaceService.PromptGamePassPurchaseFinished|PromptGamePassPurchaseFinished` also fires with `purchaseSuccess` set to `true` when a trial starts. From this signal, apply the same runtime benefits you apply on join, and don't save anything.

#### Gifting and trading

<Alert severity="warning">
Gifting and trading behavior for free trials is still being confirmed.
</Alert>

- **Gifting.** A player in a trial looks like an owner, because `UserOwnsGamePassAsync` returns `true`. If your gift flow refuses a gift when the recipient already has the pass, check the recipient's `Owned` from `Class.MarketplaceService:GetPassOwnershipAsync()|GetPassOwnershipAsync` instead, so a player in a trial can still receive the pass as a gift.
- **Trading.** A trade usually saves the item to the other player's inventory, where it no longer depends on the pass. Pass ownership can end at any time, such as when a trial ends, a purchase is refunded, or a player deletes the pass from their inventory, and the traded item stays with the other account. If you want players to trade an item, sell it as a [developer product](./developer-products.md) instead of granting it through a pass.

#### Checklist

Before you enable free trials for a pass, check that:

- Ownership comes from a `UserOwnsGamePassAsync` call each time access matters, never from a saved or cached value.
- Pass benefits are applied at runtime and never saved, so they end when ownership ends.
- `PromptGamePassPurchaseFinished` applies the same benefits as joining.
- Gift flows check the recipient's `Owned`, and you sell items that players can trade as developer products, not through a pass.

### Free trial metrics

To view free trial metrics:

1. Go to [Creations](https://create.roblox.com/dashboard/creations) and select a game.
2. Go to **Monetization** ⟩ **Shop** ⟩ **Free Trials**.

The page shows free trial revenue, how often trials are shown and started, and how often they convert to a purchase, both overall and per pass. Purchases during or after a trial use your usual pass earnings.

## Personalize your in-game store

You can use product intelligence APIs to sort and recommend passes to users. Personalizing your in-game store helps surface the most relevant items to each user, boosting engagement and revenue. By tailoring passes to user preferences, you can improve their discovery, increase conversion rates, and unlock new monetization opportunities.

### Rank passes for sale

`Class.MarketplaceService.RankProductsAsync|RankProductsAsync` takes in a list of product IDs and returns a personalized ordered list of those products. You can use this method to provide your users with personalized item recommendations in your in-game store.

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
If your game has had no item sales in the past 28 days, `RecommendTopProductsAsync` returns an empty list. At least one purchase within the last 28 days is required for this API to generate recommendations.
</Alert>

`Class.MarketplaceService.RecommendTopProductsAsync|RecommendTopProductsAsync` takes an array of `Enum.InfoType|InfoType` values and returns up to 50 items a user is most likely to engage with and purchase. You can use this method to create a "Top Picks" section in your in-game store.

If no recommendations can be determined, `RecommendTopProductsAsync` returns 0 items. Any passes that the user already owns are also not returned.

In rare cases, calls to the ranking model can be slow. To help prevent added lately for users, we recommend using `task.spawn` to make the call to `RecommendTopProducts` non-blocking.

    <figcaption>Example: A "Top Picks" tab in an in-game store</figcaption>

  <img src="../../assets/monetization/developer-products/StoreTopPicks.png" alt="Top Picks tab of an in-game store." width="90%" />

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

To help more users discover your game, you can opt-in to have your passes featured on Roblox's [Buy Robux](https://www.roblox.com/upgrades/robux) page. Opting-in to promote your passes can help increase the time and Robux users spend in your game. There is no limit to the number of passes you can promote.

Users are shown passes that are relevant to their play history and engagement on the platform. They are not shown passes that they already own.

<img src="../../assets/monetization/passes/PromotedPass.png" width="60%" />

When users purchase an eligible Robux package, they receive the promoted pass and are prompted to claim their pass by joining your game.

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
- Cannot grant [paid random items](./paid-random-items.md).
- Must comply with the [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards).

## Pass analytics

Use pass analytics to analyze the success of individual passes, identify trends, and forecast potential future earnings.

With analytics, you can:

- View your top passes over a selected time period.
- Showcase up to eight top-selling items on a time-series graph to analyze overall sales and net revenue.
- Monitor your catalog and sort items by sales and net revenue.
- View how many passes were acquired by users through promotion on the **Buy Robux** page.
- View how many users joined your game after acquiring the pass through the **Buy Robux** page.

To access pass analytics:

1. Go to [Creations](https://create.roblox.com/dashboard/creations) and select a game.
2. Go to **Monetization** ⟩ **Passes**.
3. Select the **Analytics** tab.

<img src="../../assets/monetization/passes/passes-analytics-2.png" width="100%" />
