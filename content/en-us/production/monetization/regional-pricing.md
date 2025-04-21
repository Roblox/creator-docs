---
title: Regional Pricing
description: Regional pricing adjusts the price of your passes based on a user's region.
---

With Regional Pricing, you can offer region-specific prices for your passes and build a more inclusive and accessible global economy. After you determine a default global price for a pass, Roblox uses a variety of signals like the region's purchasing power, currency exchange rates, and local spending behavior to set the most appropriate price for that pass region by region.

You can choose which of your passes you want to price regionally. When you enable Regional Pricing for a pass in your experience, Roblox automatically adjusts the price of that pass for users based on their economic location. Economic location is not always the same as account location. To determine a user's economic location, Roblox looks at signals, including VPN usage, billing history, and account history. If their economic location can't be determined, users see the default global price for the pass instead.

## Enable Regional Pricing

<Alert severity="warning">
  Regional prices never exceed or go below 30% of the default price of your pass.
</Alert>

To enable Regional Pricing:

1. Go to [Creations](https://create.roblox.com/dashboard/creations) and select an experience.
2. Go to **Monetization** > **Passes**.
3. Select an existing pass or create a new pass.
4. Click **Sales**.
5. Turn on **Enable Regional Pricing**. The **Top Countries/Regions** list updates to show the adjusted regional price per country or region based on the default price of the pass. To view regional prices for all countries and regions, click **View all**.
6. Click **Save Changes**.

Regional prices update periodically to reflect changes in global economy trends.

## Check for dynamic pricing

<Alert severity="info">
  You don't need to check for hard-coded prices if you only have passes for sale on your experience details page.
</Alert>

When you enable Regional Pricing for a pass, the price of the pass adjusts for users in different regions whether it's for sale inside or outside of your experience. However, if you have hard-coded the price into your experience's UI, that number does not update as it's not dynamic or accessible by Roblox. As a result, users are charged the correct region-specific price but the UI still shows them the hard-coded value.

The **dynamic price check** tool updates all products for sale inside your experience with a fake Robux price or a fake economic location to help you identify which prices are hard-coded in your experience's UI and which are dynamically-scripted with `Class.MarketplaceService|MarketplaceService` and called from a client script. After you have identified the hard-coded passes, you can update them to use `MarketplaceService` functions.

To use the dynamic price check tool:

1. Go to **Monetization** > **Passes**.
2. Click **&hellip;** and select **Dynamic Price Check**.
3. Under **Add test accounts**, enter up to five Roblox users to check for hard-coded prices.
4. Select a testing type.
    - **Price pinned** updates all dynamically-scripted prices with a set fake Robux amount.
    - **Location pinned** updates all dynamically-scripted prices with a region-specific price for a fake economic location.
5. Click **Enable**. After a few minutes, you can enter your experience to identify the hard-coded prices.

To disable the dynamic price check tool, go to the **Dynamic Price Check** page and click **Disable**.

For more information about hard-coded versus dynamically-scripted product prices, see [Check for dynamic pricing](./price-optimization.md#check-for-dynamic-pricing) in the Price optimization page. For more information about selling passes with `MarketplaceService` functions, see [Sell a pass inside your experience](./game-passes.md#inside-your-experience).
