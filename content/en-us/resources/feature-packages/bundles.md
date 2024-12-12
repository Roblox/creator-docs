---
title: Bundles Package
description: Learn about the bundles feature package.
---

The **Bundles** feature package offers out-of-the-box functionality to sell collections of items to players at a discount. You can choose whether to allow players to purchase bundles using a custom in-experience currency or Robux, which bundle type you want to use, what set of items you want to sell, and how you want to prompt players during their gameplay.

Using the package's customization options, you can tailor your bundles to meet the design and monetization goals of your experiences.

<img src="../../assets/resources/feature-packages/Bundles/Bundles-Intro.png" width="100%" />

<Alert severity="info">
For information on how to strategically provide purchase opportunities to meet player needs at key stages of your experience, see [Contextual Purchases](../../production/game-design/contextual-purchases.md). For industry best practices on how implement starter pack bundles, see [Starter Pack Design](../../production/game-design/starter-pack-design.md).
</Alert>

## Get Package

The **Creator Store** is a tab of the Toolbox that you can use to find all assets that are made by Roblox and the Roblox community for use within your projects, including model, image, mesh, audio, plugin, video, and font assets. You can use the Creator Store to add one or more assets directly into an open experience, including feature packages!

Every feature package requires the **Core Feature Package** to function properly. Once the **Core Feature Package** and **Bundles Feature Package** assets are within your inventory, you can reuse them in any project on the platform.

To get the packages from your inventory into your experience:

1. Add the **Core Feature Package** and **Bundles Feature Package** to your inventory within Studio by clicking the **Add to Inventory** link in the following set of components.

	<Grid container spacing={2} style={{marginBottom: 48}}>

	<Grid item container xs={12} sm={6} direction='row'>
	<Grid item container direction='column'>
	<BrowseSampleCard href='https://create.roblox.com/store/asset/94918533221001' description='The Core Feature Package offers shared DataStore table logic for all feature packages.' title='Core Feature Package' assetId={94918533221001}  />
	</Grid>
	</Grid>

	<Grid item container xs={12} sm={6} direction='row'>
	<Grid item container direction='column'>
	<BrowseSampleCard href='https://create.roblox.com/store/asset/72975253516300' description='The Bundles Feature Package offers functionality to sell collections of items to players at a discount.' title='Bundles Feature Package' assetId={72975253516300}  />
	</Grid>
	</Grid>

	</Grid>

2. In the menu bar, select the **View** tab.
3. In the **Show** section, click **Toolbox**. The **Toolbox** window displays.

   <img src="../../assets/studio/general/View-Tab-Toolbox.png" alt="Studio's View tab with the Toolbox tool highlighted." width="876" />

4. In the **Toolbox** window, click the **Inventory** tab. The **My Models** sort displays.

   <img src="../../assets/studio/toolbox/Inventory-Tab.png" alt="Studio's Toolbox window with the Inventory tab highlighted." width="360" />

5. Click the **Core Feature Package** tile, then the **Bundle Feature Package** tile. Both package folders display in the **Explorer** window.
6. Drag the package folders into **ReplicatedStorage**.
7. Allow DataStore calls to track player purchases with the packages.
   1. In the **Home** tab of the menu bar, select **Game Settings**.

      <img src="../../assets/studio/general/Home-Tab-Game-Settings.png" width="760" alt="Game Settings button indicated in Home tab" />

   1. Navigate to the **Security** tab, then enable **Enable Studio Access to API Services**.

## Defining Currencies

<Alert severity="info">
If you do not plan on charging in-experience currencies for any bundles, you can skip this section and configure bundles through `devProductId`.
</Alert>

If your experience has its own currency system, you can register those with **Core Feature Package** by defining them in `ReplicatedStorage.CreatorKitCore.Configs.Currencies`. There is a commented out example of a Gems currency already in this file; replace it with your own.

``` lua
	Gems = {
		displayName = "Gems",
		symbol = "💎",
		icon = nil,
	},
```

The `Currencies` script tells **Core Feature Package** some metadata about your currency:

- (required) `displayName` - The name of your currency. If you do not specify a symbol or icon, this name is used in purchase buttons (i.e. "100 Gems").
- (optional) `symbol` - If you have a text character to use as the icon for your currency, this is used instead of the `displayName` in purchase buttons (i.e. "💎100").
- (optional) `icon` - If you have an `AssetId` image icon for your currency, this is used instead of the `displayName` in purchase buttons (i.e. image will be placed to the left of the price "🖼️100")

<Alert severity="info">
If you specify both a symbol and an icon for your currency, the package uses the icon instead of the symbol.
</Alert>

Once your currency is set up, you can refer to the example bundle below, but you need to manually specify the bundle's price, currency, and icon for the heads up display instead of that information being fetched from the bundle's associated developer product.

``` lua
    -- If you want to use a dev product, you must provide a unique devProductId, only used by one bundle.
    -- We will fetch bundle price and icon from the developer product
    -- pricing = {
    --     priceType = CurrencyTypes.PriceType.Marketplace,
    --     devProductId = <DEV_PRODUCT_ID>,
    -- },
    

    -- Otherwise, if you want to use in-experience currency instead of a dev product, you can use the following instead:
    -- Price here is in the in-experience currency, not Robux
    pricing = {
    	priceType = CurrencyTypes.PriceType.InExperience,
    	price = 79,
    	currencyId = <CURRENCY_ID>,
    	icon = <IMAGE_ASSET_ID>,
    },
```

You also need to reference the `BundleKitExample` script to call `setInExperiencePurchaseHandler`.

``` lua
local function awardInExperiencePurchase(
	_player: Player,
	_bundleId: Types.BundleId,
	_currencyId: CurrencyTypes.CurrencyId,
	_price: number
)
	-- Check if the player has enough currency to purchase the bundle
	-- Update player data, give items, etc.
	-- Deduct the currency from the player

	task.wait(2)
	return true
end

    local function initializePurchaseHandlers()
        local bundles = BundleKit.getBundles()
        for bundleId, bundle in pairs(bundles) do
            -- Bundle is not associated with a developer product if it does not have marketplace price type
            if not bundle or bundle.pricing.priceType ~= CurrencyTypes.PriceType.Marketplace then
                continue
            end

            BundleKit.setPurchaseHandler(bundleId, awardMarketplacePurchase)
            receiptHandlers[bundle.pricing.devProductId] = receiptHandler
        end

        -- If you have any in-experience currencies that you are using for bundles, set the handler here
        for currencyId, _ in pairs(Currencies) do
            BundleKit.setInExperiencePurchaseHandler(currencyId, awardInExperiencePurchase)
        end
    end
```

Specifically, you need to fill out `awardInExperiencePurchase`, which is called by a loop through `Currencies` inside of the example `initializePurchaseHandlers` (i.e. each currencyId is connected to the handler through `BundleKit.setInExperiencePurchaseHandler(<CURRENCY_ID>, awardInExperiencePurchase)`).

## Defining Bundles

All bundles offerable in your experience can be defined within `ReplicatedStorage.BundleKit.Configs.Bundles`, with types exported from the `Types` script in the same folder.

If you're using a `devProductId`, you need to update the bundle's main `devProductId` to match the one in your experience. This is what will be prompted through `Class.MarketplaceService` to purchase the bundle itself. **It's strongly recommended to use a new developer product for the bundle to make it easier to track separate sales.**

If you want a bundle with multiple items, and if these are already represented by developer products in your experience, you don't need to explicitly set item price/assetId/name, which will be fetched via product info:

``` lua
    {
        itemType = ItemTypes.ItemType.DevProduct,
        devProductId = <DEV_PRODUCT_ID>,
        metadata = {
            caption = {
                text = "x1",
                color = Color3.fromRGB(236, 201, 74),
            } -- Caption is optional! You can also omit this field
        } 
    },
```

Otherwise, you can manually configure those item details:

``` lua
    {
        itemType = ItemTypes.ItemType.Robux,
        priceInRobux = 49,
        icon = <IMAGE_ASSET_ID>,
        metadata = {
            caption = {
                text = "x1",
                color = Color3.fromRGB(236, 201, 74),
            } -- Caption is optional! You can also leave omit this field
        }
    },
```

For example, your entire bundle will likely look like this:

``` lua
    local starterBundle: Types.RelativeTimeBundle = {
        bundleType = Types.BundleType.RelativeTime,

        -- If you want to use a dev product, you must provide a unique devProductId, only used by one bundle.
        -- We will fetch bundle price and icon from the developer product
        pricing = {
            priceType = CurrencyTypes.PriceType.Marketplace,
            devProductId = <DEV_PRODUCT_ID>,
        },
        
        -- Otherwise, if you want to use in-experience currency instead of a dev product, you can use the following instead:
        -- Price here is in the in-experience currency, not Robux
        -- pricing = {
        -- 	priceType = CurrencyTypes.PriceType.InExperience,
        -- 	price = 79,
        -- 	currencyId = <CURRENCY_ID>,
        -- 	icon = <IMAGE_ASSET_ID>,
        -- },

        includedItems = {
            [1] = {
                -- The item itself is not sold via a developer product, so indicate how much it is worth in Robux and give an icon
                -- The priceInRobux helps Bundles Feature Package show relative value of the bundle price vs. the sum of its contents
                itemType = ItemTypes.ItemType.Robux,
                priceInRobux = 49,
                icon = <IMAGE_ASSET_ID>,

                -- Alternatively, if this has a dev product leave off price and icon above and just set the devProductId
                -- The price and icon will be fetched from the developer product
                -- devProductId = <ITEM_DEV_PRODUCT_ID>

			    -- There are more optional metadata fields that are UI-specific if needed
                metadata = {
                    caption = {
                        text = "x1",
                        color = Color3.fromRGB(236, 201, 74),
                    },
                },
            },
            [2] = {
                itemType = ItemTypes.ItemType.Robux,
                priceInRobux = 99,
                icon = <IMAGE_ASSET_ID>,
                metadata = {
                    caption = {
                        text = "x1",
                        color = Color3.fromRGB(236, 201, 74),
                    },
                },
            },
            [3] = {
                itemType = ItemTypes.ItemType.Robux,
                priceInRobux = 149,
                icon = <IMAGE_ASSET_ID>,
                metadata = {
                    caption = {
                        text = "x1",
                        color = Color3.fromRGB(236, 201, 74),
                    },
                },
            },
        },
        singleUse = true, -- Once purchased or expired, no longer valid even if your experience tries to prompt (onPlayerAdded). You can make this false while testing in studio.
        durationInSeconds = 900, -- 15 minutes
        includesOfflineTime = false, -- Only count time elapsed in the experience
        metadata = {
            displayName = "STARTER BUNDLE",
            description = "Save 75% and get a head start!",
        },
    }
```

## Integrating Server Logic

Take a look at `ReplicatedStorage.BundleKit.Server.Examples.BundleKitExample`, which shows how your server will interact with **Bundles Feature Package** and the above methods on the `Class.ModuleScript`. The snippets below are from that script.

You mainly need to hook up four things once dragging **Bundles Feature Package** into your experience:

1. Connect purchase handlers through `BundleKit.setPurchaseHandler` to specify the functions to call to award items when a purchase is being processed.

   ``` lua
    local function awardPurchase(_player: Player, _bundleId: Types.BundleId, _receiptInfo: { [string]: any })
        -- Update player data, give items, etc.
        -- ... AND record receiptInfo.PurchaseId so we can check if user already has this bundle

        task.wait(2)
        return Enum.ProductPurchaseDecision.PurchaseGranted
    end

    local function awardInExperiencePurchase(
        _player: Player,
        _bundleId: Types.BundleId,
        _currencyId: CurrencyTypes.CurrencyId,
        _price: number
    )
        -- Check if the player has enough currency to purchase the bundle
        -- Update player data, give items, etc.
        -- Deduct the currency from the player

        task.wait(2)
        return true
    end

    local function initializePurchaseHandlers()
        local bundles = BundleKit.getBundles()
        for bundleId, bundle in pairs(bundles) do
            -- Bundle is not associated with a developer product if it does not have marketplace price type
            if not bundle or bundle.pricing.priceType ~= CurrencyTypes.PriceType.Marketplace then
                continue
            end

            BundleKit.setPurchaseHandler(bundleId, awardMarketplacePurchase)
            receiptHandlers[bundle.pricing.devProductId] = receiptHandler
        end

        -- If you have any in-experience currencies that you are using for bundles, set the handler here
        for currencyId, _ in pairs(Currencies) do
            BundleKit.setInExperiencePurchaseHandler(currencyId, awardInExperiencePurchase)
        end
    end
   ```

1. Connect your logic for `Class.MarketplaceService.ProcessReceipt`, but this might be done elsewhere if your experience already has developer products for sale. Essentially, when a developer product receipt is being processed, they will now call `BundleKit.getBundleByDevProduct` to check if the product belongs to a bundle. If it does, the script then calls `BundleKit.processReceipt`.

   ``` lua
   -- Process receipt from marketplace to determine if player needs to be charged or not
   local function processReceipt(receiptInfo: { [string]: any }): Enum.ProductPurchaseDecision
       local userId, productId = receiptInfo.PlayerId, receiptInfo.ProductId
       local player = Players:GetPlayerByUserId(userId)

       if not player then
           return Enum.ProductPurchaseDecision.NotProcessedYet
       end

       local handler = receiptHandlers[productId] -- Get the handler for the product
       local success, result = pcall(handler, receiptInfo, player) -- Call the handler to check if purchase logic is successful

       if not success or not result then
           warn("Failed to process receipt:", receiptInfo, result)
           return Enum.ProductPurchaseDecision.NotProcessedYet
       end

       return Enum.ProductPurchaseDecision.PurchaseGranted
   end

   local function receiptHandler(receiptInfo: { [string]: any }, player: Player)
       -- In your existing server script for handling purchases, you will now need to check if
       -- ... a product being purchased belongs to a bundle, and if so, let Bundles Feature Package handle it
       local bundleId, _bundle = BundleKit.getBundleByProductId(receiptInfo.ProductId)

       if bundleId then
           -- This purchase belongs to a bundle, let Bundles Feature Package handle it
           local purchaseDecision = BundleKit.processReceiptAsync(player, bundleId, receiptInfo)
           return purchaseDecision == Enum.ProductPurchaseDecision.PurchaseGranted
       end

       -- This purchase does not belong to a bundle,
       -- ... Handle all your existing logic here if you have any
       return false
    end
   ```

1. Connect `Players.PlayerAdded:Connect(BundleKit.OnPlayerAdded)` so that **Bundles Feature Package** re-prompts any active bundles that have not yet expired for a player.

   ``` lua
   local function onPlayerAdded(player: Player)
       -- Tell Bundles Feature Package when player joins so it can reload their data
       BundleKit.onPlayerAdded(player)

       -- If you had some starter bundle that you wanted to offer to all new players, you could prompt that here
       -- ... Bundles Feature Package will handle if player already has purchased it or if it's expired since it's not repeatable
       -- BundleKit.promptIfValidAsync(player, "StarterBundle")

       -- Calling this here just for example, you can call this whenever or wherever you want
       onPromptBundleXYZEvent(player)
   end
   ```

1. Prompt bundles. While this depends on gameplay, the example prompt players with a StarterBundle `onPlayerAdded`.

   - **Bundles Feature Package** logic ensures each player doesn't get a repeat offer if they have already purchased the bundle, or if they let the offer already expire (based on bundle config).

   - Whenever you want to prompt a bundle to a player, call `BundleKit.promptIfValidAsync(player, bundleId)`.

   ``` lua
   local function onPromptBundleXYZEvent(player: Player)
       -- Connect whatever experience event you want to use to determine when a player gets prompted the bundle
       -- ... This will be whenever you've met your elligibility criteria to prompt a player the bundle
       -- ... For example, if you want to prompt a bundle when a player joins, or when a player levels up
       task.spawn(BundleKit.promptIfValidAsync, player, <Some_Bundle_Id>)
       -- ... If creating multiple bundles, using task.spawn() to wrap the above function call will minimize discrepancies between countdowns
   end
   ```

<Alert severity="warning">
When awarding purchases, ensure that you also check and record `receiptInfo.PurchaseId` in your DataStores.
</Alert>

Consider the following best practice guidance on redundant recordings of ReceiptIds:

- While **Bundles Feature Package** does record ReceiptIds to avoid processing the same receipt twice, you should also be recording ReceiptIds inside of your tables so that if the purchase flow fails after their purchase handler has already finished, you know on subsequent retry not to award items again.

- **Bundles Feature Package** will not record the ReceiptId if the purchase fails at any step, so you should ensure that you are recording the ReceiptId in your tables before processing the receipt as part of your purchaseHandler.

- This redundancy helps ensure that all purchase logic has been appropriately handled and that your DataStore+Bundles Feature Package's DataStore reaches eventual consistency, with the your data store being the source of truth.

## Configuring Constants

Constants for **Core Feature Package** packages live in two spots:

- Shared constants live in `ReplicatedStorage.CreatorKitCore.Configs.SharedConstants`.

- Package-specific constants, in this case **Bundles Feature Package**, live in `ReplicatedStorage.BundleKit.Configs.Constants`.

The main things you might want to adjust to meet the design requirements of your experience:

- Sound assetIDs
- Purchase effect duration and particle colors
- Heads up display collapsibility

Additionally, you can find strings for translation broken out into one location: `ReplicatedStorage.CreatorKitCore.Configs.TranslationStrings`.

## Customizing UI Components

By modifying the package objects, such as colors, font, and transparency, you can adjust the visual presentation of your bundle prompts. However, keep in mind that if you move any of the objects around hierarchically, the code will not be able to find them, and you'll need to make adjustments to your code.

A prompt is made up of two high-level components:

- `PromptItem` – The individual component repeated out for each item within a bundle (item image, caption, name, price).
- `Prompt` – The prompt window itself.

The heads up display is also made up of two components:

- `HudItem` – An individual component that represents each menu option in the heads up display.
- `Hud` – To be filled with programmatically with `HudItems`.

If you want to have greater control over the heads up display, instead of just using the existing HUD UI within `ReplicatedStorage.BundleKit.Objects.BundleKitGui`, you can move things around to meet your own design requirements. Just be sure to update client script behavior in the `ReplicatedStorage.BundleKit.Client.BundleKit` script.

## API Reference

### Types

#### RelativeTime

Once the `RelativeTime` bundle is offered to a player, it remains available until the time duration runs out. This type displays on the player's heads up display, and automatically prompts on future sessions until the bundle expires or the player purchases it.

A common example of this bundle type is a single-use starter pack offer that displays to all new players for 24 hours. For industry best practices on how implement starter pack bundles, see [Starter Pack Design](../../production/game-design/starter-pack-design.md).

   <table>
   <thead>
   <tr>
   <th>Name</th>
   <th>Type</th>
   <th>Description</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>`includeOfflineTime`</td>
   <td>`bool`</td>
   <td>**(Optional)** If not set, only time spent in experience will count towards the remaining offer duration.</td>
   </tr>
   <tr>
   <td>`singleUse`</td>
   <td>`bool`</td>
   <td>**(Optional)** If not set, the purchase can be reactivated after it's purchased or expired.<br></br><br></br>If set, once purchased or expired the first time, it will not be promptable ever again, even if you call `BundleKit.promptIfValidAsync` with the bundleId.</td>
   </tr>
   </tbody>
   </table>

#### FixedTime

Once the `FixedTime` bundle is offered to a player, it remains available until the end of the set coordinated universal time (UTC). This type displays on the player's heads up display, and automatically prompts on future sessions until the bundle expires or the player purchases it.

A common example of this bundle type is a holiday offer that's only available for a given month.

#### OneTime

A `OneTime` bundle is only available in the moment that it's offered to a player. It does not display on the player's heads up display, and once a player closes the prompt, it cannot be reopened until it's prompted by the server again.

A common example of this bundle type is an offer to purchase more in-experience currency the moment a player runs out.
