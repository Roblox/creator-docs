---
title: Price Optimization
description: Price optimization finds the best price points for your passes and developer products, helping you earn more money over time.
---

<iframe width="800" height="450" src="https://www.youtube-nocookie.com/embed/ULr3CZ8egP8" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br />

<Alert severity="warning">
To run a successful price optimization test, your experience has to have enough transactions to produce significant data. In most cases, this means your experience should have had at least 100,000 transactions over the previous 30 days.

To find how many transactions your experience has had, add the total number of product sales over a two-week period. For more information, see [Pass Analytics](./game-passes.md#pass-analytics) and [Developer Product Analytics](./developer-products.md#developer-product-analytics).
</Alert>

**Price optimization** lets you find the best price points for your passes and developer products, which can help you earn more money over time while keeping your prices competitive. When you run a price test, subsets of your users see different prices for the same product. At the end of the test, you receive recommendations for the prices that performed best with your audience.

Before using price optimization, you should use the [dynamic price check tool](#using-the-dynamic-price-check-tool) to make sure product prices are dynamically scripted inside your experience. After using price optimization, you can run a [price review period](#running-a-price-review-period) to track the long-term revenue impact of your price changes.

<img src="../../assets/monetization/price-optimization/Price-Optimization-Example.png" />

## Using the Dynamic Price Check Tool

Price optimization can't collect data from and make changes to prices you have hard-coded into your experience. To run a price optimization test on products with hard-coded prices, you must first update them to be dynamically scripted.

Dynamically scripted prices update through `Class.MarketplaceService|MarketplaceService` and use functions like `Class.MarketplaceService:GetProductInfo()|GetProductInfo()` and `Class.MarketplaceService:GetDeveloperProductsAsync()|GetDeveloperProductsAsync()` to retrieve and display product prices you have set through the Creator Hub. For information on how to dynamically script product prices, see [Selling Passes](./game-passes.md#selling-passes) and [Selling Developer Products](./developer-products.md#selling-developer-products).

The dynamic price check tool updates all products for sale with a fake Robux price to identify which of your product prices are hard-coded and which are scripted with `Class.MarketplaceService|MarketplaceService` inside your experience. If a product price updates to the fake Robux price, the price is scripted. If it remains the same, the price is hard-coded.

```lua title="Client Script for a Dynamically Scripted Product Price"
local productInfo = MarketplaceService:GetProductInfo(PRODUCT_ID)
local price = productInfo.PriceInRobux
```

```lua title="Client Script for a Hard-Coded Product Price"
local priceInRobux = 500
```

To use the dynamic price check tool:

1. Go to [Creations](https://create.roblox.com/dashboard/creations) and select an experience.
2. Go to **Monetization products** &rang; **Price Optimization**.
3. Click **Dynamic Price Check**.
4. In **Add test accounts**, enter up to five Roblox users to test the fake Robux prices inside your experience.
5. Select a fake Robux price. All of the scripted product prices update to reflect this fake price.
6. Click **Enable**. After a few minutes, you're able to enter your experience to identify which prices are hard-coded.

<Alert severity="info">
To disable the dynamic price check tool, go to the **Dynamic Price Check** page and click **Disable**.
</Alert>

## Using Price Optimization

To use price optimization:

1. Go to [Creations](https://create.roblox.com/dashboard/creations) and select an experience.
2. Go to **Monetization products** &rang; **Price Optimization**.
3. Select the developer products and passes you want to include in the price test. For best results, include all products.
4. Click **Start Test**. After approximately two weeks, you receive an e-mail notification that the test is complete. The **Price Optimization** page updates with the optimized product prices, the recommended price percentage change, and the approximate long-term revenue impact of applying the new product prices.
5. Click **Review & Apply prices** to apply the results of the price optimization test.
6. **(Optional)** Click **Start price review** to [run a price review period](#running-a-price-review-period).

You can stop the price optimization test any time by clicking **Stop test** in the **Price Optimization** page. If you stop the test, your product prices revert to their original prices.

<Alert severity="info">
To make sure your product prices stay optimal, run a price optimization test every three months. You should also consider running a new price test whenever you create new products that account for a significant part of your revenue, or when you make substantial changes to your experience mechanics.
</Alert>

## Running a Price Review Period

After you receive the results from a price test, you can start an optional price review period to track the long-term revenue impact of the price recommendations.

The price review period is approximately four weeks long and includes all products that were part of the price optimization test. If you choose to participate in the review period, 98% of your users see the suggested optimized prices while 2% continue to see the original product prices. This makes sure that the optimized prices are performing as expected with your audience.

If the price review period results are favorable, the optimized prices are applied to 100% of your users. If the results aren't favorable, Roblox stops the review process and restores all products back to their original prices. You can also manually stop the review process any time, and either apply the optimized prices to all of your users or revert all products back to their original prices.

To run a price review period:

1. After [running a price optimization test](#using-price-optimization), click **Start price review** in the **Price Optimization** page. After four weeks, you receive an e-mail notification that the review is complete. The **Price Optimization** page updates with the reviewed prices, the overall revenue increase, and the approximate long-term revenue impact of applying the new product prices.
2. Click **Finish** to complete the review.

## Limitations

- You can only optimize the prices of developer products and passes. Price optimization isn't available for subscriptions.
- If you start a price optimization test while the dynamic price check tool is running, the dynamic price check tool is automatically disabled.
- You can't make changes to the prices of products involved in price tests while the tests are in progress.
- After running a price test, apply the optimized prices to either all of the involved products or to none of them. The price optimization tool doesn't let you apply the optimized prices to just a selection of the products.

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
    <td>The test groups involved in the price optimization tests.</td>
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
    <td>The total time users spent inside the experience during the test period.</td>
  </tr>
  <tr>
    <td>**Daily active users**</td>
    <td>The number of active users during the test period.</td>
  </tr>
  <tr>
    <td>**Short-term revenue**</td>
    <td>The amount of Robux spent on tested products during the two-week price optimization test period.</td>
  </tr>
  <tr>
    <td>**Long-term revenue**</td>
    <td>The amount of Robux spent on tested products during the four-week price review period.</td>
  </tr>
  <tr>
    <td>**Approximate long-term revenue impact**</td>
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
</tbody>
</table>
