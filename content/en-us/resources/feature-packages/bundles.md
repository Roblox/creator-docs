---
title: Bundles package
description: Learn about the bundles feature package.
---

The **Bundles** feature package offers out-of-the-box functionality to sell collections of items to players at a discount. You can choose whether to allow players to purchase bundles using a custom in-experience currency or Robux, which bundle type you want to use, what set of items you want to sell, and how you want to prompt players during their gameplay.

Using the package's customization options, you can tailor your bundles to meet the design and monetization goals of your experiences, such as:

- Targetting a low [conversion rate](../../production/game-design/analytics-essentials.md#monetization-metrics) metric by offering discounted [starter packs](../../production/game-design/starter-pack-design.md) that provide value to new players and encourage early spend.
- Increasing [spend depth](../../production/game-design/analytics-essentials.md#monetization-metrics) by bundling items at various price points to appeal to a range of players.
- Monetizing live operations (LiveOps) [events](../../production/game-design/liveops-essentials.md#content-cadence) by offering limited-time bundles of exclusive items.

<img src="../../assets/resources/feature-packages/Bundles/Bundles-Intro.png" width="100%" />

<Alert severity="info">
For information on how to strategically provide purchase opportunities to meet player needs at key stages of your experience, see [Contextual Purchases](../../production/game-design/contextual-purchases.md). For industry best practices on how implement starter pack bundles, see [Starter Pack Design](../../production/game-design/starter-pack-design.md).
</Alert>

## Get package

The **Creator Store** is a tab of the **Toolbox** that you can use to find all assets that are made by Roblox and the Roblox community for use within your projects, including model, image, mesh, audio, plugin, video, and font assets. You can use the Creator Store to add one or more assets directly into an open experience, including feature packages!

Every feature package requires the **Core** feature package to function properly. Once the **Core** and **Bundles** feature package assets are within your inventory, you can reuse them in any project on the platform.

To get the packages from your inventory into your experience:

1. Add the **Core** and **Bundles** feature package to your inventory within Studio by clicking the **Add to Inventory** link in the following set of components.

    <Grid container spacing={2} style={{marginBottom: 48}}>

    <Grid item container xs={12} sm={6} direction='row'>
    <Grid item container direction='column'>
    <BrowseSampleCard href='https://create.roblox.com/store/asset/94918533221001' description='The Core feature package offers shared data store logic for all feature packages.' title='Core Feature Package' assetId={94918533221001}  />
    </Grid>
    </Grid>

    <Grid item container xs={12} sm={6} direction='row'>
    <Grid item container direction='column'>
    <BrowseSampleCard href='https://create.roblox.com/store/asset/72975253516300' description='The Bundles Feature Package offers functionality to sell collections of items to players at a discount.' title='Bundles Feature Package' assetId={72975253516300}  />
    </Grid>
    </Grid>

    </Grid>

2. From Studio's **Window** menu or **Home** tab toolbar, open the [Toolbox](../../projects/assets/toolbox.md).
3. In the **Toolbox** window, click the **Inventory** tab. The **My Models** sort displays.

   <img src="../../assets/studio/toolbox/Inventory-Tab.png" alt="Studio's Toolbox window with the Inventory tab highlighted." width="360" />

4. Click the **Feature Package Core** tile, then the **Bundle Feature Package** tile. Both package folders display in the **Explorer** window.
5. Drag the package folders into `Class.ReplicatedStorage`.
6. Allow data store calls to track player purchases with the packages.
   1. Open Studio's **File** ⟩ **Experience Settings** window.
   1. Navigate to the **Security** tab, then enable **Enable Studio Access to API Services**.

## Define currencies

<Alert severity="info">
If you do not plan on charging in-experience currencies for any bundles, you can skip this section and configure bundles through `devProductId`.
</Alert>

If your experience has its own currency system, you can register those with the **Core** feature package by defining them in `ReplicatedStorage.FeaturePackagesCore.Configs.Currencies`. There is a commented out example of a Gems currency already in this file; replace it with your own.

``` lua title="Currencies"
    Gems = {
        displayName = "Gems",
        symbol = "💎",
        icon = nil,
    },
```

The `Currencies` script tells the **Core** feature package some metadata about your currency:

- (required) `displayName` - The name of your currency. If you do not specify a symbol or icon, this name is used in purchase buttons (i.e. "100 Gems").
- (optional) `symbol` - If you have a text character to use as the icon for your currency, this is used instead of the `displayName` in purchase buttons (i.e. "💎100").
- (optional) `icon` - If you have an `AssetId` image icon for your currency, this is used instead of the `displayName` in purchase buttons (i.e. image will be placed to the left of the price "🖼️100")

<Alert severity="info">
If you specify both a symbol and an icon for your currency, the package uses the icon instead of the symbol.
</Alert>

Once your currency is set up, you need to manually specify the bundle's price, currency, and icon for the heads up display instead of that information being fetched from the bundle's associated developer product.

``` lua title="Bundles"
    -- If you want to use a dev product, you must provide a unique devProductId, only used by one bundle.
    -- We will fetch bundle price and icon from the developer product
    pricing = {
        priceType = CurrencyTypes.PriceType.Marketplace,
        devProductId = 1795621566,
    },

    -- Otherwise, if you want to use in-experience currency instead of a dev product, you can use the following instead:
    -- Price here is in the in-experience currency, not Robux
    pricing = {
        priceType = CurrencyTypes.PriceType.InExperience,
        price = 79,
        currencyId = "Gems",
        icon = 18712203759,
    },
```

You also need to reference the `BundlesExample` script to call `setInExperiencePurchaseHandler`.

``` lua title="BundlesExample"
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
    local bundles = Bundles.getBundles()
    for bundleId, bundle in bundles do
        -- Bundle is not associated with a developer product if it does not have marketplace price type
        if not bundle or bundle.pricing.priceType ~= "Marketplace" then
            continue
        end

        Bundles.setPurchaseHandler(bundleId, awardMarketplacePurchase)
        receiptHandlers[bundle.pricing.devProductId] = receiptHandler
    end

    -- If you have any in-experience currencies that you are using for bundles, set the handler here
    for currencyId, _ in Currencies do
        Bundles.setInExperiencePurchaseHandler(currencyId, awardInExperiencePurchase)
    end
end
```

Specifically, you need to fill out `awardInExperiencePurchase`, which is called by a loop through `Currencies` inside of the example `initializePurchaseHandlers` (i.e. each currencyId is connected to the handler through `Bundles.setInExperiencePurchaseHandler(currencyId, awardInExperiencePurchase)`).

## Define bundles

All bundles offerable in your experience can be defined within `ReplicatedStorage.Bundles.Configs.Bundles`, with types exported from the `Types` script in the same folder.

If you're using a `devProductId`, you need to update the bundle's main `devProductId` to match the one in your experience. This is what will be prompted through `Class.MarketplaceService` to purchase the bundle itself. **It's strongly recommended to use a new developer product for the bundle to make it easier to track separate sales.**

If you want a bundle with multiple items, and if these are already represented by developer products in your experience, you don't need to explicitly set item price/assetId/name, which will be fetched via product info:

``` lua title="README"
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

``` lua title="README"
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

``` lua title="README"
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
        --  priceType = CurrencyTypes.PriceType.InExperience,
        --  price = 79,
        --  currencyId = <CURRENCY_ID>,
        --  icon = <IMAGE_ASSET_ID>,
        -- },

        includedItems = {
            [1] = {
                -- The item itself is not sold via a developer product, so indicate how much it is worth in Robux and give an icon
                -- The priceInRobux helps Bundles show relative value of the bundle price vs. the sum of its contents
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

## Integrate server logic

Take a look at `ReplicatedStorage.Bundles.Server.Examples.BundlesExample`, which shows how your server will interact with the **Bundles** feature package and the above methods on the `Class.ModuleScript`. The snippets below are from that script.

You mainly need to hook up four things once dragging the **Bundles** feature package into your experience:

1. Connect purchase handlers through `Bundles.setPurchaseHandler` to specify the functions to call to award items when a purchase is being processed.

   ``` lua title="BundlesExample"
    local function awardMarketplacePurchase(_player: Player, _bundleId: Types.BundleId, _receiptInfo: { [string]: any })
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
        local bundles = Bundles.getBundles()
        for bundleId, bundle in bundles do
            -- Bundle is not associated with a developer product if it does not have marketplace price type
            if not bundle or bundle.pricing.priceType ~= "Marketplace" then
                continue
            end

            Bundles.setPurchaseHandler(bundleId, awardMarketplacePurchase)
            receiptHandlers[bundle.pricing.devProductId] = receiptHandler
        end

        -- If you have any in-experience currencies that you are using for bundles, set the handler here
        for currencyId, _ in Currencies do
            Bundles.setInExperiencePurchaseHandler(currencyId, awardInExperiencePurchase)
        end
    end
   ```

1. Connect your logic for `Class.MarketplaceService.ProcessReceipt`, but this might be done elsewhere if your experience already has developer products for sale. Essentially, when a developer product receipt is being processed, they will now call `Bundles.getBundleByDevProduct` to check if the product belongs to a bundle. If it does, the script then calls `Bundles.processReceipt`.

   ``` lua title="BundlesExample"
   -- Process receipt from marketplace to determine if player needs to be charged or not
   local function processReceipt(receiptInfo): Enum.ProductPurchaseDecision
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
       local bundleId, _bundle = Bundles.getBundleByProductId(receiptInfo.ProductId)

       if bundleId then
           -- This purchase belongs to a bundle, let Bundles handle it
           local purchaseDecision = Bundles.processReceiptAsync(player, bundleId, receiptInfo)
           return purchaseDecision == Enum.ProductPurchaseDecision.PurchaseGranted
       end

       -- This purchase does not belong to a bundle,
       -- ... Handle all your existing logic here if you have any
       return false
    end
   ```

1. Connect `Players.PlayerAdded:Connect(Bundles.OnPlayerAdded)` so that the **Bundles** feature package re-prompts any active bundles that have not yet expired for a player.

   ``` lua title="README"
   local function onPlayerAdded(player: Player)
       -- Tell Bundles when player joins so it can reload their data
       Bundles.onPlayerAdded(player)

       -- If you had some starter bundle that you wanted to offer to all new users, you could prompt that here
       -- ... Bundles will handle if player already has purchased it or if it's expired since it's not repeatable
       -- Bundles.promptIfValidAsync(player, "StarterBundle")

       -- Calling this here just for example, you can call this whenever or wherever you want
       onPromptBundleXYZEvent(player)
   end
   ```

1. Prompt bundles. While this depends on gameplay, the example prompt players with a StarterBundle `onPlayerAdded`.

   - The **Bundles** feature package logic ensures each player doesn't get a repeat offer if they have already purchased the bundle, or if they let the offer already expire (based on bundle config).

   - Whenever you want to prompt a bundle to a player, call `Bundles.promptIfValidAsync(player, bundleId)`.

   ``` lua title="README"
   local function onPromptBundleXYZEvent(player: Player)
       -- Connect whatever experience event you want to use to determine when a player gets prompted the bundle
       -- ... This will be whenever you've met your elligibility criteria to prompt a player the bundle
       -- ... For example, if you want to prompt a bundle when a player joins, or when a player levels up
       task.spawn(Bundles.promptIfValidAsync, player, <Some_Bundle_Id>)
       -- ... If creating multiple bundles, using task.spawn() to wrap the above function call will minimize discrepancies between countdowns
   end
   ```

<Alert severity="warning">
When awarding purchases, ensure that you also check and record `receiptInfo.PurchaseId` in your data stores.
</Alert>

Consider the following best practice guidance on redundant recordings of ReceiptIds:

- While the **Bundles** feature package does record ReceiptIds to avoid processing the same receipt twice, you should also be recording ReceiptIds inside of your tables so that if the purchase flow fails after their purchase handler has already finished, you know on subsequent retry not to award items again.

- The **Bundles** feature package will not record the ReceiptId if the purchase fails at any step, so you should ensure that you are recording the ReceiptId in your tables before processing the receipt as part of your purchaseHandler.

- This redundancy helps ensure that all purchase logic has been appropriately handled and that your data store and the **Bundles** feature package's data store reach eventual consistency, with your data store being the source of truth.

## Configure constants

Constants for the **Core** feature package live in two spots:

- Shared constants live in `ReplicatedStorage.FeaturePackagesCore.Configs.SharedConstants`.

- Package-specific constants, in this case the **Bundles** feature package, live in `ReplicatedStorage.Bundles.Configs.Constants`.

The main things you might want to adjust to meet the design requirements of your experience:

- Sound asset IDs
- Purchase effect duration and particle colors
- Heads up display collapsibility

Additionally, you can find strings for translation broken out into one location: `ReplicatedStorage.FeaturePackagesCore.Configs.TranslationStrings`.

## Customize UI components

By modifying the package objects, such as colors, font, and transparency, you can adjust the visual presentation of your bundle prompts. However, keep in mind that if you move any of the objects around hierarchically, the code will not be able to find them, and you'll need to make adjustments to your code.

A prompt is made up of two high-level components:

- `PromptItem` – The individual component repeated out for each item within a bundle (item image, caption, name, price).
- `Prompt` – The prompt window itself.

The heads up display is also made up of two components:

- `HudItem` – An individual component that represents each menu option in the heads up display.
- `Hud` – To be filled with programmatically with `HudItems`.

If you want to have greater control over the heads up display, instead of just using the existing HUD UI within `ReplicatedStorage.Bundles.Objects.BundlesGui`, you can move things around to meet your own design requirements. Just be sure to update client script behavior in the `ReplicatedStorage.Bundles.Client.UIController` script.

## API reference

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
   <td>**(Optional)** If not set, the purchase can be reactivated after it's purchased or expired.<br></br><br></br>If set, once purchased or expired the first time, it will not be promptable ever again, even if you call `Bundles.promptIfValidAsync` with the bundleId.</td>
   </tr>
   </tbody>
   </table>

#### FixedTime

Once the `FixedTime` bundle is offered to a player, it remains available until the end of the set coordinated universal time (UTC). This type displays on the player's heads up display, and automatically prompts on future sessions until the bundle expires or the player purchases it.

A common example of this bundle type is a holiday offer that's only available for a given month.

#### OneTime

A `OneTime` bundle is only available in the moment that it's offered to a player. It does not display on the player's heads up display, and once a player closes the prompt, it cannot be reopened until it's prompted by the server again.

A common example of this bundle type is an offer to purchase more in-experience currency the moment a player runs out.
