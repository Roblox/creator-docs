---
title: Economy Events
description: Use economy events to visualize your experience's economy and track user sources, sinks and wallets.
---

Economy events let you track your in-experience economy, such as:

- **Top sinks** — What do users spend in-experience resources on?
- **Top sources** — Where do users earn resources?
- **Average wallet balance** — How much resources are users holding?

Once your experience begins tracking Economy events, you'll unlock the Economy page of the Analytics dashboard on the Creator Hub.

## Tracking Economy Events

To unlock the Economy dashboard, you need to track some economy events in your experience. Start by identifying where users **source** (i.e. gain) and **sink** (i.e. spend) resources in your experience. These are represented in code by `Enum.AnalyticsEconomyFlowType`, which can be either `Source` or `Sink`.

### Transaction Types

Each source and sink event requires a transaction type, encoded with `Enum.AnalyticsEconomyTransactionType`. By default, the options are:

- `IAP` (source) - In-app purchases exchanging Robux for resources, e.g. starter pack.
- `TimedReward` (source) - Earn resources on a schedule, e.g. daily bonus.
- `Onboarding` (source) - Get resources when getting started, e.g. welcome bonus.
- `Shop` (source or sink) - Trade resources in the shop, e.g. item purchase.
- `Gameplay` (source or sink) - Earn or spend resources from gameplay, e.g. quest completion.
- `ContextualPurchase` (sink) - Spend resources on a context-specific impulse, e.g. extra lives.

These types appear on the dashboard. It's a good idea to start with the default categories, but if you need to you can also provide your own transaction type names when logging an event.

### Tracking Sources

The following sample uses `Class.AnalyticsService.LogEconomyEvent` to log two different economy events when users complete the first and second levels in the experience and earn some coins.

```lua title="Tracking a source Gameplay event"
local AnalyticsService = game:GetService("AnalyticsService")
local Players = game:GetService("Players")
local currentPlayer = Players.LocalPlayer

-- After level 1 completion
AnalyticsService:LogEconomyEvent(
    currentPlayer,
    Enum.AnalyticsEconomyFlowType.Source,
    "Coins", -- currency name
    50, -- current balance
    50, -- amount earned
    Enum.AnalyticsEconomyTransactionType.Gameplay.Name -- transaction type
)

-- After level 2 completion
AnalyticsService:LogEconomyEvent(
    currentPlayer,
    Enum.AnalyticsEconomyFlowType.Source,
    "Coins", -- currency name
    50, -- amount earned
    100, -- balance after transaction
    Enum.AnalyticsEconomyTransactionType.Gameplay.Name -- transaction type
)
```

The following sample tracks a Robux purchase of a 1000-coin bundle, using the `IAP` (in-app purchase) transaction type. Note the item name provided as an optional parameter when compared to the previous sample.

```lua title="Tracking an in-app purchase"
local AnalyticsService = game:GetService("AnalyticsService")
local Players = game:GetService("Players")
local currentPlayer = Players.LocalPlayer

AnalyticsService:LogEconomyEvent(
    currentPlayer,
    Enum.AnalyticsEconomyFlowType.Source,
    "Coins",
    1000, -- How many coins are in the bundle
    1020, -- balance after transaction
    Enum.AnalyticsEconomyTransactionType.IAP.Name,
    "1000CoinBundle" -- Unique identifier of the coin bundle
)
```

### Tracking Sinks

The following sample logs an event when users spend coins to buy a `DoubleJumpUpgrade`. Note the `Sink` flow type and the `Shop` transaction type when compared to the source tracking samples.

```lua title="Tracking a sink Gameplay event"
local AnalyticsService = game:GetService("AnalyticsService")
local Players = game:GetService("Players")
local currentPlayer = Players.LocalPlayer

-- After level 2 completion
AnalyticsService:LogEconomyEvent(
    currentPlayer,
    Enum.AnalyticsEconomyFlowType.Sink,
    "Coins", -- currency name
    80, -- cost
    20, -- balance after transaction
    Enum.AnalyticsEconomyTransactionType.Shop.Name,
    "DoubleJumpUpgrade" -- item sku
)
```

## Analyzing Data

The Economy dashboard includes five charts to help you take action to grow your revenue. You can add up to five currencies of resources, and all charts can be filtered by gender, age group, platform, OS, and up to three custom fields specific to your experience.

- **Total sources and sinks by category** - Use this chart to balance your in-experience economy. Total sources subtract total sinks should be close to zero. You can also see your top sources and sinks by category. If your net total is growing, consider adding more sinks.

  <img src="../../assets/analytics/event-types/Total-Sources-Sinks.png" alt="Total Sources and Sinks by Category chart populated with data."/>

- **Average wallet balance** - Use this chart to see how many resources users, payers, and non-payers hold on average. If average balance is growing, especially for payers, consider adding new sinks.

  <img src="../../assets/analytics/event-types/Average-Wallet.png" alt="Average Wallet Balance chart populated with data."/>

- **Top sources and sinks** - Use this to identify where your users gain and spend their resources. If users are not sourcing resources from in-app purchases, consider reducing prices or offering new options. If users are not spending enough of a given resource, consider adding new sinks for that resource.

  <img src="../../assets/analytics/event-types/Top-Sources-Sinks.png" alt="Top Sources and Sinks chart populated with data, open to the Sources tab."/>

- **All sources and sinks** - Use this to get a combined view by category for the selected date range.

  <img src="../../assets/analytics/event-types/All-Sources-Sinks.png" alt="All Sources and Sinks chart populated with data."/>
