---
title: Price optimization
description: Price optimization finds the best price points for your passes and developer products, helping you earn more money over time.
---

<Alert severity="info">
Price optimization is part of [Managed pricing](./managed-pricing.md), the unified system that keeps your prices optimized across products and regions.
</Alert>

<iframe width="800" height="450" src="https://www.youtube-nocookie.com/embed/ULr3CZ8egP8" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

<br />

<Alert severity="warning">
To run a successful price optimization test, your game has to have enough transactions to produce significant data. In most cases, this means your game should have had at least 60,000 transactions over the previous 30 days.

To find how many transactions your game has had, add the total number of product sales over a 30-day period. For more information, see [Pass analytics](./passes.md#pass-analytics) and [Developer Product analytics](./developer-products.md#developer-product-analytics).
</Alert>

**Price optimization**, included in Managed Pricing, lets you find the best price points for your passes and developer products, which can help you earn more money over time while keeping your prices competitive. When you run a price test, subsets of your users see different prices for the same product. At the end of the test, you receive recommendations for the prices that performed best with your audience.

Before using price optimization, you should use the [dynamic price check tool](#check-for-dynamic-pricing) to make sure product prices are dynamically scripted inside your game. After using price optimization, you can run a price review period to track the long-term revenue impact of your price changes.

<img src="../../assets/monetization/price-optimization/Price-Optimization-Example.png" />

## How tests work

- Your users are automatically split into several test groups. The system is optimized to choose the smallest cohort of users to run the test.
- Each test group sees a different price while Roblox measures the conversion rate across groups.
- After the test, optimized prices are applied only if it results in positive incremental total revenue.
- You can review the results and impact in reporting.
- Tests run automatically at least every 90 days, or sooner when prices may no longer be optimized.

## Check for dynamic pricing

Price optimization can't collect data from and make changes to prices you have hard-coded into your game. To run a price optimization test on products with hard-coded prices, you must first update them to be dynamically scripted.

Dynamically scripted prices update through `Class.MarketplaceService|MarketplaceService` and use functions like `Class.MarketplaceService:GetProductInfo()|GetProductInfo()` and `Class.MarketplaceService:GetDeveloperProductsAsync()|GetDeveloperProductsAsync()` to retrieve and display product prices you have set through the Creator Hub. For information on how to dynamically script product prices, see [Sell a pass](./passes.md#sell-a-pass) and [Sell a developer product](./developer-products.md#sell-a-developer-product).

The dynamic price check tool updates all products for sale with a fake Robux price or a fake economic location to identify which of your product prices are hard-coded and which are scripted with `Class.MarketplaceService|MarketplaceService` inside your game. If a product price updates to a new price, the price is scripted. If it remains the same, the price is hard-coded.

<Alert severity="info">
  The `InfoType` parameter in `GetProductInfo()` fetches an asset by default. To fetch a developer product, use `Enum.InfoType.Product`. To fetch a pass, use `Enum.InfoType.GamePasses`.
</Alert>

```lua title="Client Script for a Dynamically Scripted Product Price"
local productInfo = MarketplaceService:GetProductInfo(PRODUCT_ID, Enum.InfoType.Product)
local price = productInfo.PriceInRobux
```

```lua title="Client Script for a Hard-Coded Product Price"
local priceInRobux = 500
```

To use the dynamic price check tool:

1. Go to [Creations](https://create.roblox.com/dashboard/creations) and select a game.
2. Go to **Monetization** ⟩ **Managed Pricing**.
3. Click **Dynamic Price Check**.
4. Under **Add test accounts**, enter up to five Roblox users to check for hard-coded prices.
5. Select a testing type.
   - **Price pinned** updates all dynamically-scripted prices with a set fake Robux amount.
   - **Location pinned** updates all dynamically-scripted prices with a region-specific price for a fake economic location.
6. Click **Enable**. After a few minutes, you can enter your game to identify the hard-coded prices.

To disable the dynamic price check tool, go to the **Dynamic Price Check** page and click **Disable**.

## Use price optimization

To use the Managed Pricing price optimization feature:

1. Go to [Creations](https://create.roblox.com/dashboard/creations) and select a game.
2. Go to **Monetization** ⟩ **Managed Pricing**.
3. Select the developer products and passes you want to include in the price test. For best results, include all products.
4. Click **Start Test**. Users will see the test prices when they re-join your game. After approximately 3 weeks, you will receive an email notification that the test is complete. The **Managed Pricing** page will update with the optimized product prices, the recommended price percentage change, and the approximate long-term revenue impact of applying the new product prices.
5. Click **Review & Apply prices** to apply the results of the price optimization test.

You can stop the price optimization test any time by clicking **Stop test** in the **Managed Pricing** page. If you stop the test, your product prices revert to their original prices.

## Limitations

- You can only optimize the prices of developer products and passes. Price optimization isn't available for subscriptions.
- You can't make changes to the prices of products involved in price tests while the tests are in progress.

## Glossary

<table>
<thead>
  <tr>
    <th>**Term**</th>
    <th>**Definition**</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Test period**</td>
    <td>The price optimization test period or the price review period.</td>
  </tr>
  <tr>
    <td>**Price groups**</td>
    <td>The test groups involved in the Managed Pricing tests.</td>
  </tr>
  <tr>
    <td>**Paying users**</td>
    <td>The number of users who purchased at least one tested product during the test period.</td>
  </tr>
  <tr>
    <td>**Sales**</td>
    <td>The number of products sold during the test period.</td>
  </tr>
  <tr>
    <td>**Total playtime**</td>
    <td>The total time users spent inside the game during the test period.</td>
  </tr>
  <tr>
    <td>**Daily active users**</td>
    <td>The number of active users during the test period.</td>
  </tr>
  <tr>
    <td>**Revenue**</td>
    <td>The amount of Robux spent on tested products during the four-week price review period.</td>
  </tr>
  <tr>
    <td>**Approximate revenue impact**</td>
    <td>The projected long-term revenue increase if the optimized prices are applied to the tested products.</td>
  </tr>
  <tr>
    <td>**Tested products revenue increase**</td>
    <td>The revenue of the tested products shown to 98% of users during the price review period.</td>
  </tr>
  <tr>
    <td>**Overall revenue increase**</td>
    <td>The combined revenue of the tested products during the price review period, including the 2% of users shown the original prices.</td>
  </tr>
  <tr>
    <td>**ARPPU**</td>
    <td>The average revenue per paying user during the price review period.</td>
  </tr>
  <tr>
    <td>**Recommended price increase**</td>
    <td>The number of products for which we recommend increasing the price.</td>
  </tr>
  <tr>
    <td>**Recommended price decrease**</td>
    <td>The number of products for which we recommend lowering the price.</td>
  </tr>
  <tr>
    <td>**Recommended no change**</td>
    <td>The number of products for which we recommend keeping the current price.</td>
  </tr>
</tbody>
</table>
