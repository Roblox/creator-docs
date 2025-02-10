---
title: Economy events
description: Use economy events to visualize your experience's economy and track user sources, sinks and wallets.
---

**Economy events** let you track your in-experience economy, such as:

- **Top sinks** — What do users spend in-experience resources on?
- **Top sources** — Where do users earn resources?
- **Average wallet balance** — How much resources are users holding?

Once your experience begins tracking Economy events, you'll unlock the Economy page of the Analytics dashboard on the Creator Hub.

## Track economy events

To unlock the Economy dashboard, you need to track some economy events in your experience. Start by identifying where users **source** (i.e. gain) and **sink** (i.e. spend) resources in your experience. These are represented in code by `Enum.AnalyticsEconomyFlowType`, which can be either `Source` or `Sink`.

<Alert severity ='warning'>
Events can only be sent from the server and in published experiences. Events can't be sent from the client or Studio.
</Alert>

### Transaction types

Each source and sink event requires a transaction type, encoded with `Enum.AnalyticsEconomyTransactionType`. By default, the options are:

- `IAP` (source) - In-app purchases exchanging Robux for resources, e.g. starter pack.
- `TimedReward` (source) - Earn resources on a schedule, e.g. daily bonus.
- `Onboarding` (source) - Get resources when getting started, e.g. welcome bonus.
- `Shop` (source or sink) - Trade resources in the shop, e.g. item purchase.
- `Gameplay` (source or sink) - Earn or spend resources from gameplay, e.g. quest completion.
- `ContextualPurchase` (sink) - Spend resources on a context-specific impulse, e.g. extra lives.

These types appear on the dashboard. It's a good idea to start with the default categories, but if you need to you can also provide your own transaction type names when logging an event.

### Track sources

The following sample uses `Class.AnalyticsService.LogEconomyEvent` to log two different economy events when users complete the first and second levels in the experience and earn some coins.

```lua title="Tracking a source Gameplay event"
local AnalyticsService = game:GetService("AnalyticsService")

-- After level 1 completion
AnalyticsService:LogEconomyEvent(
    player,
    Enum.AnalyticsEconomyFlowType.Source,
    "Coins", -- Currency name
    50, -- Amount earned
    50, -- Current balance
    Enum.AnalyticsEconomyTransactionType.Gameplay.Name -- Transaction type
)

-- After level 2 completion
AnalyticsService:LogEconomyEvent(
    player,
    Enum.AnalyticsEconomyFlowType.Source,
    "Coins", -- Currency name
    50, -- Amount earned
    100, -- Balance after transaction
    Enum.AnalyticsEconomyTransactionType.Gameplay.Name -- Transaction type
)
```

The following sample tracks a Robux purchase of a 1000-coin bundle, using the `IAP` (in-app purchase) transaction type. The `itemSKU` field is an optional parameter added here to compare with the previous sample. If you don't specify an `itemSKU`, the Economy dashboards display `N/A` in the sources and sinks table.

```lua title="Tracking an in-app purchase"
local AnalyticsService = game:GetService("AnalyticsService")

AnalyticsService:LogEconomyEvent(
    player,
    Enum.AnalyticsEconomyFlowType.Source,
    "Coins",
    1000, -- How many coins are in the bundle
    1020, -- Balance after transaction
    Enum.AnalyticsEconomyTransactionType.IAP.Name,
    "1000CoinBundle" -- Unique item SKU identifier of the coin bundle
)
```

### Track sinks

The following sample logs an event when users spend coins to buy a `DoubleJumpUpgrade`. Note the `Sink` flow type and the `Shop` transaction type when compared to the source tracking samples.

Keep in mind that the amount (cost) should always be a positive number regardless of whether the event is a source or a sink. The economy dashboard charts will automatically show sinks as negative numbers.

```lua title="Tracking a sink Gameplay event"
local AnalyticsService = game:GetService("AnalyticsService")

-- After level 2 completion
AnalyticsService:LogEconomyEvent(
    player,
    Enum.AnalyticsEconomyFlowType.Sink,
    "Coins", -- Currency name
    80, -- Cost
    20, -- Balance after transaction
    Enum.AnalyticsEconomyTransactionType.Shop.Name,
    "DoubleJumpUpgrade" -- Item SKU
)
```

For information on `Class.AnalyticsService` limitations, see [Event tracking limitations](./event-types.md#event-tracking-limitations).

## Use custom fields

Economy events also allow breaking down on custom fields to support easier comparison between segments. For example, you can provide quest names to each event to see which ones users are making the most money from, or attach store locations to see if users prefer one location over another.

You can breakdown by custom fields by using the breakdown selector.

<img src="../../assets/analytics/event-types/Custom-Event-Breakdown.png" width = "40%" alt="A dropdown indicating the three custom fields you can compare across, along with standard breakdowns like age, gender, operating system and more."/>

For more information, see [Custom fields](./custom-fields.md).

## Use economy to grow your experience

The Economy dashboard includes five charts to help you take action to grow your revenue. You can add up to five currencies of resources, and all charts can be filtered by gender, age group, platform, OS, and up to three custom fields specific to your experience.

- **Total sources and sinks by category** - Use this chart to balance your in-experience economy. Total sources subtract total sinks should be close to zero. You can also see your top sources and sinks by category. If your net total is growing, consider adding more sinks.

  <img src="../../assets/analytics/event-types/Total-Sources-Sinks.png" alt="Total Sources and Sinks by Category chart populated with data."/>

- **Average wallet balance** - Use this chart to see how many resources users, payers, and non-payers hold on average. If average balance is growing, especially for payers, consider adding new sinks.

  <img src="../../assets/analytics/event-types/Average-Wallet.png" alt="Average Wallet Balance chart populated with data."/>

- **Top sources and sinks** - Use this to identify where your users gain and spend their resources. If users are not sourcing resources from in-app purchases, consider reducing prices or offering new options. If users are not spending enough of a given resource, consider adding new sinks for that resource.

  <img src="../../assets/analytics/event-types/Top-Sources-Sinks.png" alt="Top Sources and Sinks chart populated with data, open to the Sources tab."/>

- **All sources and sinks** - Use this to get a combined view by category for the selected date range.

  <img src="../../assets/analytics/event-types/All-Sources-Sinks.png" alt="All Sources and Sinks chart populated with data."/>

For more tips on how to balance your in-experience economy, see [Balance virtual economies](../game-design/balance-virtual-economies.md).
